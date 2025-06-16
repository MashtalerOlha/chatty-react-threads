
import React from 'react';
import { ChatList } from './ChatList';
import { ChatArea } from './ChatArea';
import { useAIChat } from '../../hooks/useAIChat';

export const AIChatWidget = ({
  config = {},
  className = ''
}) => {
  const {
    threads,
    activeThreadId,
    activeThread,
    isLoading,
    setActiveThreadId,
    createNewThread,
    deleteThread,
    sendMessage
  } = useAIChat(config);

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
