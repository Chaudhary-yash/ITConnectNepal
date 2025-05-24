import { User, Post, Project, Conversation, Message } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    username: 'aarav_dev',
    email: 'aarav@example.com',
    bio: 'Full-stack developer specializing in React & Node.js. Building digital solutions for Nepal.',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Kathmandu',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    following: ['2', '3'],
    followers: ['2', '4', '5'],
    createdAt: '2023-01-15T10:00:00Z',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Priya Adhikari',
    username: 'priya_code',
    email: 'priya@example.com',
    bio: 'Mobile app developer with focus on Flutter & Firebase. Tech enthusiast.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Pokhara',
    skills: ['Flutter', 'Dart', 'Firebase', 'UI/UX'],
    following: ['1', '4'],
    followers: ['1', '3'],
    createdAt: '2023-02-20T15:30:00Z',
    isOnline: false,
  },
  {
    id: '3',
    name: 'Rohan Thapa',
    username: 'rohan_js',
    email: 'rohan@example.com',
    bio: 'Frontend developer & UI/UX designer. Creating beautiful user experiences.',
    avatar: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Kathmandu',
    skills: ['JavaScript', 'React', 'TailwindCSS', 'Figma'],
    following: ['1', '2', '5'],
    followers: ['5'],
    createdAt: '2023-03-10T09:15:00Z',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Sita Poudel',
    username: 'sita_dev',
    email: 'sita@example.com',
    bio: 'Backend developer focused on Python & Django. Machine learning enthusiast.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Biratnagar',
    skills: ['Python', 'Django', 'Machine Learning', 'PostgreSQL'],
    following: ['1', '5'],
    followers: ['2'],
    createdAt: '2023-02-05T13:45:00Z',
    isOnline: false,
  },
  {
    id: '5',
    name: 'Anish Maharjan',
    username: 'anish_tech',
    email: 'anish@example.com',
    bio: 'DevOps engineer & AWS specialist. Helping startups scale infrastructure.',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Lalitpur',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    following: ['3'],
    followers: ['3', '4'],
    createdAt: '2023-01-25T11:20:00Z',
    isOnline: true,
  },
];

// Mock Posts
export const posts: Post[] = [
  {
    id: '1',
    content: 'Just launched my new portfolio website using React and Tailwind CSS! Check it out and let me know what you think. #WebDev #Portfolio',
    images: ['https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg?auto=compress&cs=tinysrgb&w=600'],
    author: users[0],
    likes: ['2', '3', '4'],
    comments: [
      {
        id: '101',
        content: 'Looks amazing! Love the design and smooth animations.',
        author: users[1],
        createdAt: '2023-06-15T10:30:00Z',
      },
      {
        id: '102',
        content: 'Great work! What hosting provider are you using?',
        author: users[2],
        createdAt: '2023-06-15T11:15:00Z',
      },
    ],
    createdAt: '2023-06-15T10:00:00Z',
  },
  {
    id: '2',
    content: 'Flutter 3.0 is amazing! Building cross-platform apps has never been easier. Currently working on a delivery app for local businesses in Pokhara. #Flutter #MobileApp',
    author: users[1],
    likes: ['1', '3'],
    comments: [
      {
        id: '201',
        content: 'Excited to see the final product! Flutter has been a game-changer.',
        author: users[0],
        createdAt: '2023-06-14T16:45:00Z',
      },
    ],
    createdAt: '2023-06-14T16:30:00Z',
  },
  {
    id: '3',
    content: 'Working on a new UI component library specifically designed for Nepali tech startups. Open-source and free to use! #OpenSource #UI',
    images: ['https://images.pexels.com/photos/96381/pexels-photo-96381.jpeg?auto=compress&cs=tinysrgb&w=600'],
    author: users[2],
    likes: ['1', '2', '4', '5'],
    comments: [
      {
        id: '301',
        content: 'This is exactly what our community needs! Looking forward to contributing.',
        author: users[0],
        createdAt: '2023-06-13T14:20:00Z',
      },
      {
        id: '302',
        content: 'Will it include RTL support for Nepali language?',
        author: users[3],
        createdAt: '2023-06-13T15:10:00Z',
      },
    ],
    createdAt: '2023-06-13T14:00:00Z',
  },
  {
    id: '4',
    content: 'Just completed my machine learning course on Coursera! Now working on a project to predict crop yields for Nepali farmers using weather data. #MachineLearning #AgriTech',
    author: users[3],
    likes: ['2', '5'],
    comments: [],
    createdAt: '2023-06-12T09:30:00Z',
  },
  {
    id: '5',
    content: 'Deployed my first Kubernetes cluster today! Scalable infrastructure is key for growing tech products. Happy to help anyone getting started with K8s. #DevOps #Kubernetes',
    videoUrl: 'https://www.youtube.com/watch?v=PziYflu8cB8',
    author: users[4],
    likes: ['1', '3'],
    comments: [
      {
        id: '501',
        content: 'Would love to learn more about your setup. Can we connect over DM?',
        author: users[2],
        createdAt: '2023-06-11T13:40:00Z',
      },
    ],
    createdAt: '2023-06-11T13:15:00Z',
  },
];

// Mock Projects
export const projects: Project[] = [
  {
    id: '1',
    title: 'NepalRide - Ride-sharing App',
    description: 'A ride-sharing platform designed specifically for Nepali cities, addressing local transportation challenges. Built with Flutter and Firebase.',
    tags: ['Flutter', 'Firebase', 'Mobile App', 'Transportation'],
    previewImages: [
      'https://images.pexels.com/photos/35177/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    repoUrl: 'https://github.com/priya_code/nepalride',
    demoUrl: 'https://nepalride.example.com',
    author: users[1],
    likes: ['1', '3', '4'],
    comments: [
      {
        id: '1001',
        content: 'This solves a real problem in our cities. Great work!',
        author: users[0],
        createdAt: '2023-05-20T11:30:00Z',
      },
    ],
    createdAt: '2023-05-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Hamro Health - Telemedicine Portal',
    description: 'A telemedicine platform connecting patients in remote areas of Nepal with doctors. Features video consultations, prescription management, and health records.',
    tags: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'Healthcare'],
    previewImages: [
      'https://images.pexels.com/photos/48566/pexels-photo-48566.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    repoUrl: 'https://github.com/aarav_dev/hamro-health',
    demoUrl: 'https://hamro-health.example.com',
    author: users[0],
    likes: ['2', '3', '5'],
    comments: [
      {
        id: '2001',
        content: 'This has huge potential for rural communities. Have you considered partnering with NGOs?',
        author: users[3],
        createdAt: '2023-04-15T14:45:00Z',
      },
      {
        id: '2002',
        content: 'The UI is very intuitive. Great job making it accessible for all users.',
        author: users[2],
        createdAt: '2023-04-16T09:20:00Z',
      },
    ],
    createdAt: '2023-04-15T13:30:00Z',
  },
  {
    id: '3',
    title: 'NepalUI - Component Library',
    description: 'An open-source UI component library with Nepali cultural aesthetics. Built with React and styled using Tailwind CSS.',
    tags: ['React', 'TailwindCSS', 'UI Library', 'Open Source'],
    previewImages: [
      'https://images.pexels.com/photos/326520/pexels-photo-326520.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    repoUrl: 'https://github.com/rohan_js/nepalui',
    demoUrl: 'https://nepalui.example.com',
    author: users[2],
    likes: ['1', '2', '4'],
    comments: [],
    createdAt: '2023-03-10T16:00:00Z',
  },
  {
    id: '4',
    title: 'KrishaK - Agricultural ML Platform',
    description: 'Machine learning platform to help Nepali farmers predict crop yields, disease outbreaks, and optimal planting times based on weather data.',
    tags: ['Python', 'Django', 'Machine Learning', 'Agriculture'],
    previewImages: [
      'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/11719062/pexels-photo-11719062.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    repoUrl: 'https://github.com/sita_dev/krishak',
    demoUrl: 'https://krishak.example.com',
    author: users[3],
    likes: ['5'],
    comments: [
      {
        id: '4001',
        content: 'This could revolutionize farming in Nepal. Have you tested it in different regions?',
        author: users[4],
        createdAt: '2023-02-28T10:15:00Z',
      },
    ],
    createdAt: '2023-02-28T09:00:00Z',
  },
  {
    id: '5',
    title: 'NepalCloud - Serverless Platform',
    description: 'Serverless computing platform optimized for Nepali developers, with lower latency for South Asian users and integrated local payment methods.',
    tags: ['AWS', 'Kubernetes', 'DevOps', 'Cloud'],
    previewImages: [
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    repoUrl: 'https://github.com/anish_tech/nepalcloud',
    demoUrl: 'https://nepalcloud.example.com',
    author: users[4],
    likes: ['1', '2'],
    comments: [
      {
        id: '5001',
        content: 'This addresses a real pain point for local developers. Great initiative!',
        author: users[0],
        createdAt: '2023-01-20T13:45:00Z',
      },
    ],
    createdAt: '2023-01-20T12:30:00Z',
  },
];

// Mock Conversations and Messages
export const conversations: Conversation[] = [
  {
    id: '1',
    participants: [users[0], users[1]],
    lastMessage: {
      id: '1001',
      content: 'That sounds like a great approach! Let me know if you need any help with the implementation.',
      senderId: '1',
      receiverId: '2',
      read: true,
      createdAt: '2023-06-15T15:45:00Z',
    },
    unreadCount: 0,
  },
  {
    id: '2',
    participants: [users[0], users[2]],
    lastMessage: {
      id: '2001',
      content: 'I just pushed the latest changes to the repository. Can you review the PR?',
      senderId: '3',
      receiverId: '1',
      read: false,
      createdAt: '2023-06-15T16:30:00Z',
    },
    unreadCount: 1,
  },
  {
    id: '3',
    participants: [users[0], users[4]],
    lastMessage: {
      id: '3001',
      content: 'The AWS architecture looks good! I have a few suggestions for optimizing costs.',
      senderId: '5',
      receiverId: '1',
      read: false,
      createdAt: '2023-06-14T09:15:00Z',
    },
    unreadCount: 2,
  },
];

// Mock Messages (for conversation 1)
export const messages: Message[] = [
  {
    id: '1001',
    content: 'Hi Priya! I saw your Flutter project and was really impressed. How did you handle state management?',
    senderId: '1',
    receiverId: '2',
    read: true,
    createdAt: '2023-06-15T14:30:00Z',
  },
  {
    id: '1002',
    content: 'Thanks Aarav! I used Riverpod for state management. It\'s really clean and efficient.',
    senderId: '2',
    receiverId: '1',
    read: true,
    createdAt: '2023-06-15T14:35:00Z',
  },
  {
    id: '1003',
    content: 'I\'ve been considering Riverpod for my next project. Would you recommend it over Provider?',
    senderId: '1',
    receiverId: '2',
    read: true,
    createdAt: '2023-06-15T14:40:00Z',
  },
  {
    id: '1004',
    content: 'Definitely! Riverpod solves many of Provider\'s limitations. Here\'s a code snippet showing how I set it up:',
    senderId: '2',
    receiverId: '1',
    attachments: [
      {
        type: 'code',
        url: '#',
        name: 'riverpod_setup.dart',
      },
    ],
    read: true,
    createdAt: '2023-06-15T14:43:00Z',
  },
  {
    id: '1005',
    content: 'That makes sense! I\'ll try implementing it this way. By the way, I\'m working on a healthcare app and could use your insights on the UX.',
    senderId: '1',
    receiverId: '2',
    read: true,
    createdAt: '2023-06-15T15:40:00Z',
  },
  {
    id: '1006',
    content: 'That sounds like a great approach! Let me know if you need any help with the implementation.',
    senderId: '1',
    receiverId: '2',
    read: true,
    createdAt: '2023-06-15T15:45:00Z',
  },
];

// Current user (for demo purposes)
export const currentUser = users[0];