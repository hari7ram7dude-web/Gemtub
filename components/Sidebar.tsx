
import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen }) => {
  const navItems = [
    { id: Page.HOME, label: 'Home', icon: 'fa-house' },
    { id: Page.CREATE, label: 'Create with AI', icon: 'fa-wand-magic-sparkles' },
    { id: 'shorts', label: 'Shorts', icon: 'fa-bolt-lightning' },
    { id: 'subs', label: 'Subscriptions', icon: 'fa-layer-group' },
  ];

  const libraryItems = [
    { id: 'history', label: 'History', icon: 'fa-clock-rotate-left' },
    { id: 'playlists', label: 'Playlists', icon: 'fa-list-ul' },
    { id: 'your_videos', label: 'Your videos', icon: 'fa-video' },
    { id: 'watch_later', label: 'Watch later', icon: 'fa-clock' },
    { id: 'liked', label: 'Liked videos', icon: 'fa-thumbs-up' },
  ];

  if (!isOpen) {
    return (
      <aside className="w-20 hidden md:flex flex-col items-center py-4 bg-[#0f0f0f] fixed top-14 bottom-0 z-40">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => typeof item.id === 'string' && item.id.includes('home') ? setActivePage(Page.HOME) : setActivePage(item.id as Page)}
            className={`flex flex-col items-center justify-center w-full py-4 hover:bg-[#272727] rounded-lg transition-colors ${activePage === item.id ? 'text-white' : 'text-gray-400'}`}
          >
            <i className={`fa-solid ${item.icon} text-lg mb-1`}></i>
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </aside>
    );
  }

  return (
    <aside className="w-60 hidden md:block bg-[#0f0f0f] fixed top-14 bottom-0 left-0 overflow-y-auto px-3 py-4 z-40">
      <div className="space-y-1">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id as Page)}
            className={`flex items-center w-full px-3 py-2.5 hover:bg-[#272727] rounded-xl transition-colors ${activePage === item.id ? 'bg-[#272727] font-medium' : ''}`}
          >
            <i className={`fa-solid ${item.icon} w-8 text-lg`}></i>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>
      
      <hr className="my-4 border-[#3f3f3f]" />
      
      <div className="space-y-1">
        <h3 className="px-3 mb-2 font-medium text-base">Library</h3>
        {libraryItems.map(item => (
          <button
            key={item.id}
            className="flex items-center w-full px-3 py-2.5 hover:bg-[#272727] rounded-xl transition-colors"
          >
            <i className={`fa-solid ${item.icon} w-8 text-lg`}></i>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
