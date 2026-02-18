
import { Video } from './types';

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Exploring the Future of AI with Gemini 3 Pro',
    thumbnail: 'https://picsum.photos/seed/ai1/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    channelName: 'Future Tech',
    channelAvatar: 'https://picsum.photos/seed/avatar1/100/100',
    views: '1.2M',
    postedAt: '2 days ago',
    description: 'In this video, we dive deep into the capabilities of the latest Gemini 3 models and how they are changing the landscape of software engineering and content creation.',
    duration: '10:05',
    category: 'Technology'
  },
  {
    id: '2',
    title: '10 Minute Morning Yoga for Beginners',
    thumbnail: 'https://picsum.photos/seed/yoga/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    channelName: 'Zen Flow',
    channelAvatar: 'https://picsum.photos/seed/avatar2/100/100',
    views: '850K',
    postedAt: '1 week ago',
    description: 'Start your day with this easy 10-minute yoga routine designed for beginners to improve flexibility and mindfulness.',
    duration: '10:12',
    category: 'Health'
  },
  {
    id: '3',
    title: 'Top 5 Hidden Gems in Kyoto, Japan',
    thumbnail: 'https://picsum.photos/seed/travel/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    channelName: 'Wanderlust',
    channelAvatar: 'https://picsum.photos/seed/avatar3/100/100',
    views: '430K',
    postedAt: '3 days ago',
    description: 'Beyond the golden temple, Kyoto has many secret spots that tourists often miss. Join us as we explore the quiet corners of this historic city.',
    duration: '15:45',
    category: 'Travel'
  },
  {
    id: '4',
    title: 'Delicious 15-Minute Pasta Recipes',
    thumbnail: 'https://picsum.photos/seed/food/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    channelName: 'Chef Quick',
    channelAvatar: 'https://picsum.photos/seed/avatar4/100/100',
    views: '2.1M',
    postedAt: '5 hours ago',
    description: 'Hungry but short on time? These three pasta recipes are packed with flavor and ready in just 15 minutes.',
    duration: '08:20',
    category: 'Cooking'
  },
  {
    id: '5',
    title: 'Introduction to Quantum Computing',
    thumbnail: 'https://picsum.photos/seed/quantum/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    channelName: 'Science Simplified',
    channelAvatar: 'https://picsum.photos/seed/avatar5/100/100',
    views: '300K',
    postedAt: '1 month ago',
    description: 'What is a qubit? How does entanglement work? We explain the fundamentals of quantum computing in plain English.',
    duration: '12:30',
    category: 'Science'
  },
  {
    id: '6',
    title: 'Street Photography: Mastering Light and Shadow',
    thumbnail: 'https://picsum.photos/seed/photo/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    channelName: 'Visual Storyteller',
    channelAvatar: 'https://picsum.photos/seed/avatar6/100/100',
    views: '120K',
    postedAt: '4 days ago',
    description: 'Learn how to use high contrast lighting to create dramatic and compelling street photographs in any city.',
    duration: '09:45',
    category: 'Art'
  },
    {
    id: '7',
    title: 'Gaming Setup Tour 2024 - Minimalist Edition',
    thumbnail: 'https://picsum.photos/seed/gaming/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    channelName: 'TechVibe',
    channelAvatar: 'https://picsum.photos/seed/avatar7/100/100',
    views: '560K',
    postedAt: '6 days ago',
    description: 'A walkthrough of my clean, white-themed gaming setup for 2024. No RGB, just performance and aesthetics.',
    duration: '11:20',
    category: 'Gaming'
  },
  {
    id: '8',
    title: 'Building a Tiny House in the Woods',
    thumbnail: 'https://picsum.photos/seed/house/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    channelName: 'Living Off Grid',
    channelAvatar: 'https://picsum.photos/seed/avatar8/100/100',
    views: '4.5M',
    postedAt: '2 weeks ago',
    description: 'The complete timelapse journey of building a sustainable 200 sq ft cabin from scratch in the Pacific Northwest.',
    duration: '22:05',
    category: 'Lifestyle'
  }
];

export const CATEGORIES = ['All', 'Technology', 'Health', 'Travel', 'Cooking', 'Science', 'Art', 'Gaming', 'Lifestyle', 'Music', 'Education'];
