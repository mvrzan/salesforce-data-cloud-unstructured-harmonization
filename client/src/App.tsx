import { useState } from "react";
import type { Message } from "./types/message";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { WelcomeContent } from "./components/content/WelcomeContent";
import { MessageDisplay } from "./components/content/MessageDisplay";
import { ChatWidget } from "./components/chat/ChatWidget";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageSequence, setMessageSequence] = useState(1);
  const [sessionInitialized, setSessionInitialized] = useState(false);
  const [agentforceSessionId, setAgentforceSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Manage external session key (used to create the session)
  const [externalSessionKey] = useState<string>(() => {
    // Check if we have an existing session in sessionStorage
    const existingSession = sessionStorage.getItem("agentforce-session-key");
    if (existingSession) {
      console.log("Using existing external session key:", existingSession);
      return existingSession;
    }

    // Generate new UUID if none exists
    const newSessionKey = crypto.randomUUID();
    sessionStorage.setItem("agentforce-session-key", newSessionKey);
    console.log("Generated new external session key:", newSessionKey);
    return newSessionKey;
  });

  // Handle new message from user
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
      // Send message to Agentforce with sessionId and sequenceId
      const response = await fetch(`http://localhost:3000/api/v1/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

      // Increment sequence for next message
      setMessageSequence((prev) => prev + 1);

      // Extract the first message from the messages array
      const agentResponse = data.messages?.[0];

      if (!agentResponse) {
        throw new Error("No message received from agent");
      }

      // Create bot message from the response
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

      // Show error message to user
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

  // Handle message click
  const handleMessageClick = (message: Message) => {
    // Show details for bot messages (they have the Agentforce data)
    if (message.sender === "bot") {
      setSelectedMessage(message);
    }
  };

  // Handle back to welcome
  const handleBackToWelcome = () => {
    setSelectedMessage(null);
  };

  // Handle delete session
  const handleDeleteSession = async () => {
    if (!agentforceSessionId) {
      console.log("No active session to delete");
      return;
    }

    try {
      console.log("Deleting Agentforce session...");
      const response = await fetch(`http://localhost:3000/api/v1/delete-session`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: agentforceSessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete session: ${response.statusText}`);
      }

      console.log("Session deleted successfully");

      // Reset the chat state
      setMessages([]);
      setSessionInitialized(false);
      setAgentforceSessionId(null);
      setMessageSequence(1);

      // Generate new external session key for next session
      const newSessionKey = crypto.randomUUID();
      sessionStorage.setItem("agentforce-session-key", newSessionKey);
      console.log("Generated new external session key:", newSessionKey);
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  // Handle chat toggle - initialize session when opened
  const handleChatToggle = async () => {
    const newIsOpen = !isChatOpen;

    // Initialize session when chat is opened for the first time
    if (newIsOpen && !sessionInitialized) {
      setIsLoading(true);
      setIsChatOpen(newIsOpen); // Open chat and show loading

      try {
        console.log("Initializing Agentforce session...");
        const response = await fetch(`http://localhost:3000/api/v1/start-session?sessionId=${externalSessionKey}`);

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
      // Just toggle if session already initialized
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
        isLoading={isLoading}
        isOpen={isChatOpen}
        onToggle={handleChatToggle}
      />
    </div>
  );
}

export default App;
