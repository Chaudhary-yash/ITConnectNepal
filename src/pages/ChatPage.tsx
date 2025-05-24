import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Send, ArrowLeft, Paperclip, Image, Code } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { conversations, messages as mockMessages, users } from '../data/mockData';
import { Message, User } from '../types';
import { formatDistanceToNow } from '../utils/dateUtils';

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const [conversation, setConversation] = useState(conversations.find(c => c.id === id));
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const otherUser = conversation?.participants.find(p => p.id !== currentUser?.id);

  useEffect(() => {
    // Simulate marking messages as read
    if (conversation) {
      conversation.unreadCount = 0;
    }
  }, [conversation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || !otherUser) return;

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const newMsg: Message = {
        id: Date.now().toString(),
        content: newMessage,
        senderId: currentUser.id,
        receiverId: otherUser.id,
        read: false,
        createdAt: new Date().toISOString(),
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!conversation || !otherUser) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Conversation not found
          </h2>
          <Link to="/messages" className="text-primary hover:text-primary/90">
            Return to Messages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center">
          <Link to="/messages" className="mr-4 text-gray-600 dark:text-gray-300 hover:text-primary">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <img
            src={otherUser.avatar}
            alt={otherUser.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {otherUser.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {otherUser.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === currentUser?.id;
          const sender = users.find(u => u.id === message.senderId);

          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[70%]`}>
                {!isCurrentUser && (
                  <img
                    src={sender?.avatar}
                    alt={sender?.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                )}
                <div
                  className={`flex flex-col space-y-1 ${
                    isCurrentUser ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      isCurrentUser
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    {message.content}
                    {message.attachments?.map((attachment, index) => (
                      <div key={index} className="mt-2">
                        {attachment.type === 'image' && (
                          <img
                            src={attachment.url}
                            alt={attachment.name || 'Attachment'}
                            className="rounded-lg max-w-sm"
                          />
                        )}
                        {attachment.type === 'code' && (
                          <pre className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-sm overflow-x-auto">
                            <code>{attachment.name}</code>
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(message.createdAt))}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <Image className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <Code className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 input"
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!newMessage.trim() || isSubmitting}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;