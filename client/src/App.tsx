import { useState } from "react";
import type { Message } from "./types/message";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { WelcomeContent } from "./components/content/WelcomeContent";
import { MessageDisplay } from "./components/content/MessageDisplay";
import { ChatWidget } from "./components/chat/ChatWidget";
import { generateSignature } from "./utils/requestSigner";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageSequence, setMessageSequence] = useState(1);
  const [sessionInitialized, setSessionInitialized] = useState(false);
  const [agentforceSessionId, setAgentforceSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [externalSessionKey] = useState<string>(() => {
    const existingSession = sessionStorage.getItem("agentforce-session-key");

    if (existingSession) {
      console.log("Using existing external session key:", existingSession);

      return existingSession;
    }

    const newSessionKey = crypto.randomUUID();
    sessionStorage.setItem("agentforce-session-key", newSessionKey);
    console.log("Generated new external session key:", newSessionKey);

    return newSessionKey;
  });

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { timestamp, signature } = await generateSignature("POST", "/api/v1/send-message");

      const response = await fetch(`${API_URL}/api/v1/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Timestamp": timestamp,
          "X-Signature": signature,
        },
        body: JSON.stringify({
          sessionId: agentforceSessionId,
          message: content,
          sequenceId: messageSequence,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      setMessageSequence((prev) => prev + 1);

      const agentResponse = data.messages?.[0];

      if (!agentResponse) {
        throw new Error("No message received from agent");
      }

      const botMessage: Message = {
        id: agentResponse.id || `msg-${Date.now()}-bot`,
        content: agentResponse.message || "Response received",
        timestamp: new Date(),
        sender: "bot",
        type: agentResponse.type,
        feedbackId: agentResponse.feedbackId,
        isContentSafe: agentResponse.isContentSafe,
        message: agentResponse.message,
        metrics: agentResponse.metrics,
        planId: agentResponse.planId,
        result: agentResponse.result,
        citedReferences: agentResponse.citedReferences,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        content: "Sorry, there was an error processing your request.",
        timestamp: new Date(),
        sender: "bot",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageClick = (message: Message) => {
    if (message.sender === "bot") {
      setSelectedMessage(message);
    }
  };

  const handleBackToWelcome = () => {
    setSelectedMessage(null);
  };

  const handleDeleteSession = async () => {
    if (!agentforceSessionId) {
      console.log("No active session to delete");
      return;
    }

    try {
      console.log("Deleting Agentforce session...");

      const { timestamp, signature } = await generateSignature("DELETE", "/api/v1/delete-session");

      const response = await fetch(`${API_URL}/api/v1/delete-session`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Timestamp": timestamp,
          "X-Signature": signature,
        },
        body: JSON.stringify({
          sessionId: agentforceSessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete session: ${response.statusText}`);
      }

      console.log("Session deleted successfully");

      setMessages([]);
      setSessionInitialized(false);
      setAgentforceSessionId(null);
      setMessageSequence(1);

      const newSessionKey = crypto.randomUUID();
      sessionStorage.setItem("agentforce-session-key", newSessionKey);
      console.log("Generated new external session key:", newSessionKey);
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const handleStartNewSession = async () => {
    setIsLoading(true);

    try {
      const newSessionKey = sessionStorage.getItem("agentforce-session-key") || crypto.randomUUID();

      console.log("Initializing new Agentforce session...");

      const { timestamp, signature } = await generateSignature(
        "GET",
        `/api/v1/start-session?sessionId=${newSessionKey}`
      );

      const response = await fetch(`${API_URL}/api/v1/start-session?sessionId=${newSessionKey}`, {
        headers: {
          "X-Timestamp": timestamp,
          "X-Signature": signature,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to start new session: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("New session initialized:", data);

      setAgentforceSessionId(data.sessionId);
      setSessionInitialized(true);

      if (data.messages?.[0]) {
        const welcomeMessage: Message = {
          id: data.messages[0].id || `msg-${Date.now()}-welcome`,
          content: data.messages[0].message || "Hi, I'm an AI service assistant. How can I help you?",
          timestamp: new Date(),
          sender: "bot",
          type: data.messages[0].type,
          feedbackId: data.messages[0].feedbackId,
          isContentSafe: data.messages[0].isContentSafe,
          message: data.messages[0].message,
          metrics: data.messages[0].metrics,
          planId: data.messages[0].planId,
          result: data.messages[0].result,
          citedReferences: data.messages[0].citedReferences,
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error("Error starting new session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatToggle = async () => {
    const newIsOpen = !isChatOpen;

    if (newIsOpen && !sessionInitialized) {
      setIsLoading(true);
      setIsChatOpen(newIsOpen);

      try {
        console.log("Initializing Agentforce session...");

        const { timestamp, signature } = await generateSignature(
          "GET",
          `/api/v1/start-session?sessionId=${externalSessionKey}`
        );

        const response = await fetch(`${API_URL}/api/v1/start-session?sessionId=${externalSessionKey}`, {
          headers: {
            "X-Timestamp": timestamp,
            "X-Signature": signature,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to start session: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Session initialized:", data);

        // Store the actual session ID returned by Agentforce
        setAgentforceSessionId(data.sessionId);
        setSessionInitialized(true);

        // Optionally add the welcome message from Agentforce
        if (data.messages?.[0]) {
          const welcomeMessage: Message = {
            id: data.messages[0].id || `msg-${Date.now()}-welcome`,
            content: data.messages[0].message || "Hi, I'm an AI service assistant. How can I help you?",
            timestamp: new Date(),
            sender: "bot",
            type: data.messages[0].type,
            feedbackId: data.messages[0].feedbackId,
            isContentSafe: data.messages[0].isContentSafe,
            message: data.messages[0].message,
            metrics: data.messages[0].metrics,
            planId: data.messages[0].planId,
            result: data.messages[0].result,
            citedReferences: data.messages[0].citedReferences,
          };
          setMessages([welcomeMessage]);
        }
      } catch (error) {
        console.error("Error initializing session:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsChatOpen(newIsOpen);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {selectedMessage ? (
          <MessageDisplay message={selectedMessage} onBack={handleBackToWelcome} />
        ) : (
          <WelcomeContent />
        )}
      </main>

      <Footer />

      <ChatWidget
        messages={messages}
        onMessageClick={handleMessageClick}
        onSendMessage={handleSendMessage}
        onDeleteSession={handleDeleteSession}
        onStartNewSession={handleStartNewSession}
        sessionInitialized={sessionInitialized}
        isLoading={isLoading}
        isOpen={isChatOpen}
        onToggle={handleChatToggle}
      />
    </div>
  );
}

export default App;
