
export const createMessage = (id, content, role, timestamp, isLoading = false) => ({
  id,
  content,
  role,
  timestamp,
  isLoading
});

export const createChatThread = (id, title, messages, createdAt, updatedAt) => ({
  id,
  title,
  messages,
  createdAt,
  updatedAt
});

export const createAIChatConfig = (config = {}) => ({
  apiEndpoint: config.apiEndpoint,
  apiKey: config.apiKey,
  onSendMessage: config.onSendMessage,
  placeholder: config.placeholder,
  theme: config.theme,
  maxMessages: config.maxMessages
});
