import { useState, useRef } from 'react';
import { Image, Video, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const NewPostForm = () => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && images.length === 0 && !videoUrl) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would submit the post to the server
      toast.success('Post created successfully!');
      
      // Reset form
      setContent('');
      setImages([]);
      setVideoUrl('');
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // In a real app, we would upload these files to a server
    // For demo, we'll use URL.createObjectURL to create temporary URLs
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (!user) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full object-cover mr-4"
          />
          <div className="flex-grow">
            <textarea
              className="textarea w-full"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              maxLength={280}
            ></textarea>
            
            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="rounded-lg w-full h-24 object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 p-1 bg-gray-800 bg-opacity-70 rounded-full text-white"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Video URL Input */}
            {videoUrl && (
              <div className="mt-2">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="input flex-grow"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="YouTube URL"
                  />
                  <button
                    type="button"
                    className="ml-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
                    onClick={() => setVideoUrl('')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-3">
              <div className="flex space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageSelection}
                />
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="h-5 w-5" />
                </button>
                {!videoUrl && (
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => setVideoUrl('https://www.youtube.com/watch?v=')}
                  >
                    <Video className="h-5 w-5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={(!content.trim() && images.length === 0 && !videoUrl) || isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;