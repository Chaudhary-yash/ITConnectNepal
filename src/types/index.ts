export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  location: string;
  skills: string[];
  following: string[];
  followers: string[];
  createdAt: string;
  isOnline?: boolean;
}

export interface Post {
  id: string;
  content: string;
  images?: string[];
  videoUrl?: string;
  author: User;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  previewImages: string[];
  repoUrl?: string;
  demoUrl?: string;
  downloadUrl?: string;
  author: User;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  attachments?: {
    type: 'image' | 'code' | 'file';
    url: string;
    name?: string;
  }[];
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
}

export type FeedType = 'following' | 'trending';
export type FeedContentType = 'all' | 'posts' | 'projects';