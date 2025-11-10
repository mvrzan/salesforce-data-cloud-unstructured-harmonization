import type { ChatWidgetProps } from "../../types/message";
import { ChatWindow } from "./ChatWindow";
import { ChatToggle } from "./ChatToggle";

export const ChatWidget = ({
  messages,
  onMessageClick,
  onSendMessage,
  onDeleteSession,
  onStartNewSession,
  sessionInitialized,
  isLoading,
  isOpen,
  onToggle,
}: ChatWidgetProps) => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-[calc(100vw-2rem)] sm:max-w-none">
      {isOpen ? (
        <ChatWindow
          messages={messages}
          onMessageClick={onMessageClick}
          onSendMessage={onSendMessage}
          onDeleteSession={onDeleteSession}
          onStartNewSession={onStartNewSession}
          sessionInitialized={sessionInitialized}
          isLoading={isLoading}
          onClose={onToggle}
        />
      ) : (
        <ChatToggle onClick={onToggle} />
      )}
    </div>
  );
};
