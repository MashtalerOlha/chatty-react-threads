
import React, { useState, useCallback } from 'react';
import { ChatThread, Message, AIChatConfig } from '../../types/chat';
import { ChatList } from './ChatList';
import { ChatArea } from './ChatArea';
import { toast } from 'sonner';

interface AIChatWidgetProps {
  config?: AIChatConfig;
  className?: string;
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({
  config = {},
  className = ''
}) => {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Функція для отримання відповіді від AI
  const getAIResponse = useCallback(async (message: string, threadId: string): Promise<string> => {
    if (config.onSendMessage) {
      return await config.onSendMessage(message, threadId);
    }

    // Заглушка для демонстрації - замініть на реальний API виклик
    if (config.apiEndpoint) {
      try {
        const response = await fetch(config.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
          },
          body: JSON.stringify({
            message,
            threadId
          })
        });

        if (!response.ok) {
          throw new Error('Failed to get AI response');
        }

        const data = await response.json();
        return data.response || data.message || 'Вибачте, сталася помилка.';
      } catch (error) {
        console.error('Error calling AI API:', error);
        throw error;
      }
    }

    // Демо відповідь
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
      "Це цікаве питання! Дайте мені подумати...",
      "Я можу допомогти вам з цим. Ось що я думаю:",
      "Розумію вашу проблему. Пропоную таке рішення:",
      "Це важлива тема. Давайте розглянемо детальніше:",
      "Гарне питання! Ось моя думка з цього приводу:"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + 
           " " + message.split(' ').reverse().join(' ');
  }, [config]);

  // Створення нового чату
  const createNewThread = useCallback(() => {
    const newThread: ChatThread = {
      id: Date.now().toString(),
      title: `Новий чат ${threads.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newThread.id);
    toast.success('Створено новий чат');
  }, [threads.length]);

  // Видалення чату
  const deleteThread = useCallback((threadId: string) => {
    setThreads(prev => prev.filter(thread => thread.id !== threadId));
    
    if (activeThreadId === threadId) {
      const remainingThreads = threads.filter(thread => thread.id !== threadId);
      setActiveThreadId(remainingThreads.length > 0 ? remainingThreads[0].id : null);
    }
    
    toast.success('Чат видалено');
  }, [activeThreadId, threads]);

  // Відправка повідомлення
  const sendMessage = useCallback(async (content: string) => {
    if (!activeThreadId) {
      toast.error('Спочатку оберіть або створіть чат');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    // Додаємо повідомлення користувача
    setThreads(prev => prev.map(thread => 
      thread.id === activeThreadId
        ? {
            ...thread,
            messages: [...thread.messages, userMessage],
            title: thread.messages.length === 0 ? content.slice(0, 30) + (content.length > 30 ? '...' : '') : thread.title,
            updatedAt: new Date()
          }
        : thread
    ));

    // Додаємо тимчасове повідомлення "завантаження"
    const loadingMessage: Message = {
      id: 'loading-' + Date.now(),
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isLoading: true
    };

    setThreads(prev => prev.map(thread => 
      thread.id === activeThreadId
        ? { ...thread, messages: [...thread.messages, loadingMessage] }
        : thread
    ));

    setIsLoading(true);

    try {
      // Отримуємо відповідь від AI
      const aiResponse = await getAIResponse(content, activeThreadId);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      // Замінюємо повідомлення завантаження на реальну відповідь
      setThreads(prev => prev.map(thread => 
        thread.id === activeThreadId
          ? {
              ...thread,
              messages: thread.messages.map(msg => 
                msg.id === loadingMessage.id ? aiMessage : msg
              ),
              updatedAt: new Date()
            }
          : thread
      ));

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Видаляємо повідомлення завантаження при помилці
      setThreads(prev => prev.map(thread => 
        thread.id === activeThreadId
          ? {
              ...thread,
              messages: thread.messages.filter(msg => msg.id !== loadingMessage.id)
            }
          : thread
      ));
      
      toast.error('Помилка отримання відповіді від AI');
    } finally {
      setIsLoading(false);
    }
  }, [activeThreadId, getAIResponse]);

  const activeThread = threads.find(thread => thread.id === activeThreadId) || null;

  return (
    <div className={`flex h-[600px] border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white ${className}`}>
      <ChatList
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={setActiveThreadId}
        onCreateThread={createNewThread}
        onDeleteThread={deleteThread}
      />
      
      <ChatArea
        thread={activeThread}
        onSendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};
