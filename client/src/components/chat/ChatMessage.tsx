import type { Message } from "../../types/message";

interface ChatMessageProps {
  message: Message;
  onClick: (message: Message) => void;
}

export const ChatMessage = ({ message, onClick }: ChatMessageProps) => {
  const isUser = message.sender === "user";
  const isBot = message.sender === "bot";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        onClick={() => onClick(message)}
        className={`
          max-w-[80%] px-4 py-2 rounded-lg transition-all text-left
          ${
            isUser
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300 hover:shadow-md"
          }
          ${isBot ? "cursor-pointer" : ""}
        `}
      >
        <p className="text-sm text-left">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block text-left">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        {isBot && (
          <div className="mt-2 pt-2 border-t border-gray-400 border-opacity-30">
            <div className="flex items-center gap-1.5 text-purple-700">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-xs font-semibold">Click to view details</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
