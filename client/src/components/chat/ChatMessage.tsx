import type { Message } from "../../types/message";

interface ChatMessageProps {
  message: Message;
  onClick: (message: Message) => void;
}

export const ChatMessage = ({ message, onClick }: ChatMessageProps) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        onClick={() => onClick(message)}
        className={`
          max-w-[80%] px-4 py-2 rounded-lg cursor-pointer transition-all text-left
          ${isUser ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-900 hover:bg-gray-300"}
          ${message.properties || message.htmlContent ? "ring-2 ring-offset-2 ring-purple-500" : ""}
        `}
      >
        <p className="text-sm text-left">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block text-left">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        {(message.properties || message.htmlContent) && (
          <div className="mt-2 pt-2 border-t border-current border-opacity-20">
            <span className="text-xs font-semibold">✨ Click to view details</span>
          </div>
        )}
      </div>
    </div>
  );
};
