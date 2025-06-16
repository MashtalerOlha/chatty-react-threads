
import React from 'react';
import { ChatThread } from '../../types/chat';
import { MessageCircle, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface ChatListProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  onCreateThread: () => void;
  onDeleteThread: (threadId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  threads,
  activeThreadId,
  onSelectThread,
  onCreateThread,
  onDeleteThread
}) => {
  const getTruncatedTitle = (title: string, maxLength: number = 30) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <Button
          onClick={onCreateThread}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 justify-start gap-2"
        >
          <Plus size={16} />
          Новий чат
        </Button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {threads.length === 0 ? (
          <div className="p-4 text-gray-400 text-center">
            <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Немає чатів</p>
            <p className="text-xs mt-1">Створіть новий чат щоб почати</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className={cn(
                  "group relative flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                  activeThreadId === thread.id
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                )}
                onClick={() => onSelectThread(thread.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {getTruncatedTitle(thread.title)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {thread.messages.length} повідомлень
                  </div>
                </div>
                
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteThread(thread.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto bg-transparent hover:bg-red-600 text-gray-400 hover:text-white"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
        AI Chat Widget v1.0
      </div>
    </div>
  );
};
