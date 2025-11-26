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
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:max-w-none pointer-events-none">
      {isOpen ? (
        <div className="pointer-events-auto">
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
        </div>
      ) : (
        <div className="pointer-events-auto">
          <ChatToggle onClick={onToggle} />
        </div>
      )}
    </div>
  );
};
