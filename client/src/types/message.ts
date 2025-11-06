export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: "user" | "bot";
  properties?: Record<string, unknown>;
  htmlContent?: string;
}

export interface ChatWidgetProps {
  messages: Message[];
  onMessageClick: (message: Message) => void;
  onSendMessage: (content: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}
