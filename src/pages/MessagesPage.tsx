import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { conversations } from '../data/mockData';
import { formatDistanceToNow } from '../utils/dateUtils';

const MessagesPage = () => {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Please log in to view your messages
        </p>
      </div>
    );
  }

  const userConversations = conversations.filter(
    conversation => conversation.participants.some(p => p.id === user.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Conversations List */}
          <div className="border-r border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {userConversations.map(conversation => {
                const otherParticipant = conversation.participants.find(p => p.id !== user.id)!;
                
                return (
                  <Link
                    key={conversation.id}
                    to={`/messages/${conversation.id}`}
                    className={`block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      activeConversation === conversation.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                    }`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={otherParticipant.avatar}
                          alt={otherParticipant.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        {otherParticipant.isOnline && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {otherParticipant.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDistanceToNow(new Date(conversation.lastMessage.createdAt))}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {conversation.lastMessage.content}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-xs text-white">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Empty State */}
          <div className="hidden md:flex md:col-span-2 items-center justify-center p-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;