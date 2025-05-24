import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Post } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(user ? post.likes.includes(user.id) : false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    if (!user) return;
    
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    
    // In a real app, we would submit the comment to the server
    // For now, just reset the input
    setNewComment('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
        <Link to={`/profile/${post.author.username}`} className="flex items-center">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {post.author.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt))}
            </p>
          </div>
        </Link>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
          {post.content}
        </p>
      </div>

      {/* Post Media */}
      {post.images && post.images.length > 0 && (
        <div className="px-4 pb-4">
          <div className={`grid ${post.images.length > 1 ? 'grid-cols-2 gap-2' : 'grid-cols-1'}`}>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post by ${post.author.name}`}
                className="rounded-lg w-full h-auto object-cover max-h-96"
              />
            ))}
          </div>
        </div>
      )}

      {post.videoUrl && (
        <div className="px-4 pb-4">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <iframe
              src={post.videoUrl.replace('watch?v=', 'embed/')}
              title="Video"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            className={`flex items-center space-x-1 ${liked ? 'text-secondary' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
            <span>{likeCount}</span>
          </button>
          <button
            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments.length}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          {/* Comment Input */}
          <form onSubmit={handleSubmitComment} className="mb-4 flex">
            <input
              type="text"
              placeholder="Write a comment..."
              className="input flex-grow"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-primary text-white rounded-md"
              disabled={!newComment.trim()}
            >
              Post
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="ml-3 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 flex-grow">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-900 dark:text-white">
                      {comment.author.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(comment.createdAt))}
                    </p>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;