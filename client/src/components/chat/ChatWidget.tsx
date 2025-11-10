import type { ChatWidgetProps } from "../../types/message";
import { ChatWindow } from "./ChatWindow";
import { ChatToggle } from "./ChatToggle";

export const ChatWidget = ({
  messages,
  onMessageClick,
  onSendMessage,
  onDeleteSession,
  isLoading,
  isOpen,
  onToggle,
}: ChatWidgetProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <ChatWindow
          messages={messages}
          onMessageClick={onMessageClick}
          onSendMessage={onSendMessage}
          onDeleteSession={onDeleteSession}
          isLoading={isLoading}
          onClose={onToggle}
        />
      ) : (
        <ChatToggle onClick={onToggle} />
      )}
    </div>
  );
};
