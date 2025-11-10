export interface CitedReference {
  id: string;
  name?: string;
  url?: string;
  type?: string;
  // Add other properties as needed
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: "user" | "bot";
  type?: string;
  feedbackId?: string;
  isContentSafe?: boolean;
  message?: string;
  metrics?: Record<string, unknown>;
  planId?: string;
  result?: unknown[];
  citedReferences?: CitedReference[];
  properties?: Record<string, unknown>;
  htmlContent?: string;
}

export interface ChatWidgetProps {
  messages: Message[];
  onMessageClick: (message: Message) => void;
  onSendMessage: (content: string) => void;
  onDeleteSession: () => void;
  onStartNewSession: () => void;
  sessionInitialized: boolean;
  isLoading: boolean;
  isOpen: boolean;
  onToggle: () => void;
}
