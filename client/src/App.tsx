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

  // Manage Agentforce session ID
  const [sessionId] = useState<string>(() => {
    // Check if we have an existing session in sessionStorage
    const existingSession = sessionStorage.getItem("agentforce-session-id");
    if (existingSession) {
      console.log("Using existing session ID:", existingSession);
      return existingSession;
    }

    // Generate new UUID if none exists
    const newSessionId = crypto.randomUUID();
    sessionStorage.setItem("agentforce-session-id", newSessionId);
    console.log("Generated new session ID:", newSessionId);
    return newSessionId;
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

    try {
      // Call the start-session endpoint with the sessionId
      const response = await fetch(`http://localhost:3000/api/v1/start-session?sessionId=${sessionId}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

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
    }
  };

  // Handle message click
  const handleMessageClick = (message: Message) => {
    if (message.properties || message.htmlContent) {
      setSelectedMessage(message);
      setIsChatOpen(false); // Optionally close chat when viewing message details
    }
  };

  // Handle back to welcome
  const handleBackToWelcome = () => {
    setSelectedMessage(null);
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
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}

export default App;
