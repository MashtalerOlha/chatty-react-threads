
import React, { useEffect, useRef } from 'react';
import { ChatThread } from '../../types/chat';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Bot } from 'lucide-react';

interface ChatAreaProps {
  thread: ChatThread | null;
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  thread,
  onSendMessage,
  isLoading = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [thread?.messages]);

  if (!thread) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <Bot size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">Вітаємо в AI Chat!</h3>
          <p className="text-sm">Оберіть чат або створіть новий щоб почати розмову</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="border-b bg-white p-4 shadow-sm">
        <h2 className="font-semibold text-gray-900 truncate">{thread.title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {thread.messages.length} повідомлень • Оновлено {thread.updatedAt.toLocaleString('uk-UA')}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {thread.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Bot size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-sm">Почніть розмову з AI асистентом</p>
            </div>
          </div>
        ) : (
          <div>
            {thread.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={onSendMessage}
        disabled={isLoading}
        placeholder="Напишіть повідомлення AI асистенту..."
      />
    </div>
  );
};
