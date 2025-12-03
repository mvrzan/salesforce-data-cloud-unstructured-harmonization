import type { Message } from "../../types/message";
import { Card } from "@/components/ui/card";

interface ChatMessageProps {
  message: Message;
  onClick: (message: Message) => void;
}

const extractUrlParams = (url: string): { dccid: string | null; hudmo: string | null } => {
  try {
    const cleanUrl = url.replace(/[).,;!?]+$/, "");
    const urlObj = new URL(cleanUrl);

    let dccid = urlObj.searchParams.get("c__dccid");
    let hudmo = urlObj.searchParams.get("c__hudmo");

    if (!dccid && !hudmo) {
      dccid = urlObj.searchParams.get("c__contentId");
      hudmo = urlObj.searchParams.get("c__objectApiName");
    }

    return { dccid, hudmo };
  } catch {
    return { dccid: null, hudmo: null };
  }
};

const extractUrlsFromContent = (content: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const matches = content.match(urlRegex) || [];

  return matches.map((url) => url.replace(/[).,;!?]+$/, ""));
};

const handleUrlClick = (url: string, e: React.MouseEvent) => {
  e.stopPropagation();

  window.open(url, "_blank", "noopener,noreferrer");
};

const parseMessageContent = (content: string) => {
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const parts = content.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      const cleanUrl = part.replace(/[).,;!?]+$/, "");
      const trailingPunct = part.slice(cleanUrl.length);

      return (
        <span key={index}>
          <a
            href={cleanUrl}
            className="text-blue-500 hover:text-blue-700 underline break-all"
            onClick={(e) => handleUrlClick(cleanUrl, e)}
          >
            {cleanUrl}
          </a>
          {trailingPunct}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export const ChatMessage = ({ message, onClick }: ChatMessageProps) => {
  const isUser = message.sender === "user";
  const isBot = message.sender === "bot";

  const handleMessageClick = () => {
    const urls = extractUrlsFromContent(message.content);

    let updatedMessage = message;

    if (urls.length > 0) {
      const { dccid, hudmo } = extractUrlParams(urls[0]);

      if (dccid && hudmo) {
        console.log("Extracted URL parameters from message:", { dccid, hudmo });
        updatedMessage = {
          ...message,
          dccid,
          hudmo,
        };
      }
    }

    onClick(updatedMessage);
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <Card
        onClick={handleMessageClick}
        className={`
          max-w-[80%] p-0 transition-all text-left
          ${
            isUser
              ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300 hover:shadow-md border-gray-200"
          }
          ${isBot ? "cursor-pointer" : ""}
        `}
      >
        <div className="px-4 py-2">
          <p className="text-sm text-left wrap-break-word">{parseMessageContent(message.content)}</p>
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
      </Card>
    </div>
  );
};
