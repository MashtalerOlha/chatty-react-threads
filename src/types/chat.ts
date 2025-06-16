
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
}

export interface ChatThread {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIChatConfig {
  apiEndpoint?: string;
  apiKey?: string;
  onSendMessage?: (message: string, threadId: string) => Promise<string>;
  placeholder?: string;
  theme?: 'light' | 'dark';
  maxMessages?: number;
}
