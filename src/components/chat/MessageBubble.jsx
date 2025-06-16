
import React from 'react';
import { Bot, User, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex gap-3 p-4 group hover:bg-gray-50/50 transition-colors",
      isUser && "bg-gray-50/30"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
      )}>
        {isUser ? (
          <User size={16} />
        ) : (
          <Bot size={16} />
        )}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="prose prose-sm max-w-none">
          {message.isLoading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 size={16} className="animate-spin" />
              <span>AI думає...</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          {message.timestamp.toLocaleTimeString('uk-UA', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};
