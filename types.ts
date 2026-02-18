
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  postedAt: string;
  description: string;
  duration: string;
  category: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
}

export enum Page {
  HOME = 'home',
  WATCH = 'watch',
  CREATE = 'create',
  SEARCH = 'search'
}
