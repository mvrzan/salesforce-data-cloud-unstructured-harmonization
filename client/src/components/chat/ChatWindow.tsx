import { useRef, useEffect } from "react";
import type { Message } from "../../types/message";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface ChatWindowProps {
  messages: Message[];
  onMessageClick: (message: Message) => void;
  onSendMessage: (content: string) => void;
  onDeleteSession: () => void;
  onStartNewSession: () => void;
  sessionInitialized: boolean;
  isLoading: boolean;
  onClose: () => void;
}

export const ChatWindow = ({
  messages,
  onMessageClick,
  onSendMessage,
  onDeleteSession,
  onStartNewSession,
  sessionInitialized,
  isLoading,
  onClose,
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full sm:w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <h3 className="font-semibold text-sm sm:text-base">Agentforce Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onDeleteSession}
            className="hover:bg-black hover:bg-opacity-20 rounded-full p-1 transition-colors"
            title="End Session"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="hover:bg-black hover:bg-opacity-20 rounded-full p-1 transition-colors"
            title="Close Chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
        {messages.length === 0 && !isLoading && !sessionInitialized ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3 sm:gap-4 px-4">
            <p className="text-center text-sm sm:text-base">
              Session ended
              <br />
              <span className="text-xs sm:text-sm">Ready to start a new conversation?</span>
            </p>
            <button
              onClick={onStartNewSession}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Start Another Agentforce Session
            </button>
          </div>
        ) : messages.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-500 px-4">
            <p className="text-center text-sm sm:text-base">
              Start a conversation with Agentforce!
              <br />
              <span className="text-xs sm:text-sm">Ask about data harmonization, analysis, or insights.</span>
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} onClick={onMessageClick} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="max-w-[80%] px-4 py-3 rounded-lg bg-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">
                      {messages.length === 0 ? "Starting Agentforce chat..." : "Agentforce is thinking..."}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={onSendMessage} />
    </div>
  );
};
