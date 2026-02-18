
import React from 'react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div 
      className="flex flex-col cursor-pointer group"
      onClick={() => onClick(video)}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-[#272727]">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-medium">
          {video.duration}
        </div>
      </div>
      
      <div className="flex mt-3 gap-3">
        <img 
          src={video.channelAvatar} 
          alt={video.channelName}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold line-clamp-2 leading-tight">
            {video.title}
          </h3>
          <p className="text-gray-400 text-xs mt-1 hover:text-white transition-colors">
            {video.channelName}
          </p>
          <p className="text-gray-400 text-xs">
            {video.views} views • {video.postedAt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
