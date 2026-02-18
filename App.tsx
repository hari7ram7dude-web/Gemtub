
import React, { useState, useEffect, useCallback } from 'react';
import { Page, Video } from './types';
import { MOCK_VIDEOS, CATEGORIES } from './constants';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import { summarizeVideo, generateAIComments, generateVideoWithVeo } from './services/geminiService';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.HOME);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Video page states
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiComments, setAiComments] = useState<any[]>([]);

  // Create page states
  const [veoPrompt, setVeoPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [veoStatus, setVeoStatus] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [hasVeoAccess, setHasVeoAccess] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (typeof window.aistudio !== 'undefined') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasVeoAccess(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setActivePage(Page.WATCH);
    setSummary(null);
    setAiComments([]);
    window.scrollTo(0, 0);
  };

  const handleSummarize = async () => {
    if (!selectedVideo) return;
    setIsSummarizing(true);
    try {
      const result = await summarizeVideo(selectedVideo.title, selectedVideo.description);
      setSummary(result || "Could not summarize video.");
    } catch (error) {
      console.error(error);
      setSummary("Error generating summary.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleLoadAIComments = async () => {
    if (!selectedVideo) return;
    try {
      const comments = await generateAIComments(selectedVideo.title);
      setAiComments(comments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVeoGenerate = async () => {
    if (!veoPrompt) return;
    setIsGenerating(true);
    setGeneratedVideoUrl(null);
    try {
      const url = await generateVideoWithVeo(veoPrompt, (status) => setVeoStatus(status));
      setGeneratedVideoUrl(url);
    } catch (error) {
      alert("Error generating video. Please check your API key permissions.");
      console.error(error);
    } finally {
      setIsGenerating(false);
      setVeoStatus('');
    }
  };

  const handleSelectKey = async () => {
    if (typeof window.aistudio !== 'undefined') {
      await window.aistudio.openSelectKey();
      setHasVeoAccess(true);
    }
  };

  const filteredVideos = MOCK_VIDEOS.filter(v => 
    (activeCategory === 'All' || v.category === activeCategory) &&
    (v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.channelName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <header className="h-14 bg-[#0f0f0f] flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[#272727] rounded-full transition-colors"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
          <div 
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setActivePage(Page.HOME)}
          >
            <div className="bg-red-600 rounded-lg p-1.5 px-2 flex items-center justify-center">
              <i className="fa-solid fa-play text-white text-xs"></i>
            </div>
            <span className="font-bold text-xl tracking-tighter">GemTube</span>
          </div>
        </div>

        <div className="flex-1 max-w-2xl hidden md:flex items-center px-10">
          <div className="flex w-full">
            <input 
              type="text"
              placeholder="Search"
              className="w-full bg-[#121212] border border-[#303030] rounded-l-full py-2 px-4 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-5 hover:bg-[#2c2c2c]">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <button className="ml-4 p-2.5 bg-[#181818] hover:bg-[#272727] rounded-full transition-colors">
            <i className="fa-solid fa-microphone"></i>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActivePage(Page.CREATE)}
            className="p-2.5 hover:bg-[#272727] rounded-full transition-colors"
          >
            <i className="fa-solid fa-video"></i>
          </button>
          <button className="p-2.5 hover:bg-[#272727] rounded-full transition-colors">
            <i className="fa-solid fa-bell"></i>
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-500 ml-2 flex items-center justify-center font-bold">
            U
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          isOpen={sidebarOpen} 
        />

        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-200 ${activePage === Page.WATCH ? 'w-full' : (sidebarOpen ? 'md:ml-60' : 'md:ml-20')}`}>
          
          {/* Page Routing */}
          {activePage === Page.HOME && (
            <div className="p-4">
              {/* Categories */}
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-white text-black' : 'bg-[#272727] hover:bg-[#3f3f3f]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 pt-2">
                {filteredVideos.map(video => (
                  <VideoCard key={video.id} video={video} onClick={handleVideoSelect} />
                ))}
              </div>
            </div>
          )}

          {activePage === Page.WATCH && selectedVideo && (
            <div className="p-4 lg:p-6 lg:flex gap-6 max-w-[1700px] mx-auto">
              <div className="flex-1">
                {/* Video Player */}
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                  <video 
                    src={selectedVideo.videoUrl} 
                    className="w-full h-full"
                    controls
                    autoPlay
                  ></video>
                </div>

                <h1 className="text-xl font-bold mt-4 leading-tight">
                  {selectedVideo.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between mt-3 gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedVideo.channelAvatar} 
                      className="w-10 h-10 rounded-full object-cover" 
                      alt=""
                    />
                    <div>
                      <h3 className="font-bold text-base">{selectedVideo.channelName}</h3>
                      <p className="text-gray-400 text-xs">124K subscribers</p>
                    </div>
                    <button className="ml-4 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                      Subscribe
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex bg-[#272727] rounded-full">
                      <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#3f3f3f] rounded-l-full border-r border-[#3f3f3f]">
                        <i className="fa-solid fa-thumbs-up"></i>
                        <span className="text-sm font-medium">45K</span>
                      </button>
                      <button className="px-4 py-2 hover:bg-[#3f3f3f] rounded-r-full">
                        <i className="fa-solid fa-thumbs-down"></i>
                      </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#272727] hover:bg-[#3f3f3f] rounded-full transition-colors">
                      <i className="fa-solid fa-share"></i>
                      <span className="text-sm font-medium">Share</span>
                    </button>
                    <button className="p-2 px-3 bg-[#272727] hover:bg-[#3f3f3f] rounded-full">
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                  </div>
                </div>

                {/* AI Features Panel */}
                <div className="mt-4 bg-[#272727] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-blue-400 font-bold">
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                      <span>AI Insights</span>
                    </div>
                    {!summary && (
                      <button 
                        onClick={handleSummarize}
                        disabled={isSummarizing}
                        className="text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        {isSummarizing ? 'Summarizing...' : 'Summarize Video'}
                      </button>
                    )}
                  </div>
                  
                  {isSummarizing && (
                    <div className="animate-pulse flex space-y-2 flex-col">
                      <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                    </div>
                  )}

                  {summary && (
                    <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {summary}
                    </div>
                  )}
                  
                  <div className="mt-3 text-sm text-gray-300">
                    <p className="font-bold">{selectedVideo.views} views • {selectedVideo.postedAt}</p>
                    <p className="mt-2">{selectedVideo.description}</p>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-6">
                  <div className="flex items-center gap-6 mb-6">
                    <h2 className="text-xl font-bold">Comments</h2>
                    <button 
                      onClick={handleLoadAIComments}
                      className="text-sm text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <i className="fa-solid fa-robot text-xs"></i>
                      Generate AI Reaction Comments
                    </button>
                  </div>

                  <div className="space-y-6">
                    {aiComments.length > 0 ? (
                      aiComments.map((comment, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold">
                            {comment.author[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">{comment.author}</span>
                              <span className="text-xs text-gray-400">{comment.time}</span>
                            </div>
                            <p className="text-sm">{comment.text}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <button className="hover:bg-[#272727] p-1 rounded"><i className="fa-regular fa-thumbs-up"></i></button>
                              <button className="hover:bg-[#272727] p-1 rounded"><i className="fa-regular fa-thumbs-down"></i></button>
                              <button className="text-xs font-medium hover:bg-[#272727] px-2 py-1 rounded">Reply</button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400 italic text-sm">No comments yet. Be the first to start the conversation!</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar Recommendation Column */}
              <div className="w-full lg:w-[400px] mt-6 lg:mt-0 space-y-4">
                <h3 className="font-bold mb-4">Up next</h3>
                {MOCK_VIDEOS.filter(v => v.id !== selectedVideo.id).map(video => (
                  <div 
                    key={video.id} 
                    className="flex gap-3 cursor-pointer group"
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="relative w-40 h-24 flex-shrink-0 bg-[#272727] rounded-lg overflow-hidden">
                      <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1 rounded">{video.duration}</span>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-sm font-medium line-clamp-2 leading-tight">{video.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{video.channelName}</p>
                      <p className="text-xs text-gray-400">{video.views} views • {video.postedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePage === Page.CREATE && (
            <div className="max-w-4xl mx-auto p-8">
              <div className="bg-[#1e1e1e] rounded-3xl p-8 border border-[#333]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Veo Video Generator</h1>
                    <p className="text-gray-400">Bring your imagination to life with Gemini 3 Video intelligence</p>
                  </div>
                </div>

                {!hasVeoAccess ? (
                  <div className="bg-[#2a2a2a] p-6 rounded-2xl border border-yellow-600/30 flex flex-col items-center text-center">
                    <i className="fa-solid fa-key text-3xl text-yellow-500 mb-4"></i>
                    <h2 className="text-xl font-bold mb-2">API Key Required</h2>
                    <p className="text-gray-300 mb-6">
                      Veo video generation requires a paid Google Cloud project API key. 
                      Please select your key to proceed. Visit <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-blue-400 underline">billing documentation</a> for details.
                    </p>
                    <button 
                      onClick={handleSelectKey}
                      className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-all"
                    >
                      Select API Key
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Prompt your video into existence</label>
                      <textarea
                        className="w-full bg-[#121212] border border-[#444] rounded-2xl p-4 min-h-[120px] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        placeholder="A cinematic drone shot of a futuristic neon city submerged underwater..."
                        value={veoPrompt}
                        onChange={(e) => setVeoPrompt(e.target.value)}
                      />
                    </div>

                    <button 
                      onClick={handleVeoGenerate}
                      disabled={isGenerating || !veoPrompt}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-2xl font-bold text-lg shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-3"
                    >
                      {isGenerating ? (
                        <>
                          <i className="fa-solid fa-circle-notch animate-spin"></i>
                          <span>{veoStatus || 'Creating Magic...'}</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-clapperboard"></i>
                          <span>Generate AI Video</span>
                        </>
                      )}
                    </button>

                    {generatedVideoUrl && (
                      <div className="mt-8">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <i className="fa-solid fa-circle-check text-green-500"></i>
                          Your Masterpiece is Ready
                        </h3>
                        <div className="rounded-2xl overflow-hidden border border-[#444] shadow-2xl">
                          <video src={generatedVideoUrl} controls className="w-full" />
                        </div>
                        <div className="flex gap-4 mt-4">
                          <a 
                            href={generatedVideoUrl} 
                            download="gemtube_ai_video.mp4"
                            className="flex-1 bg-[#272727] hover:bg-[#3f3f3f] py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                          >
                            <i className="fa-solid fa-download"></i>
                            Download
                          </a>
                          <button className="flex-1 bg-[#272727] hover:bg-[#3f3f3f] py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                            <i className="fa-solid fa-share"></i>
                            Publish to Feed
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-8 border-t border-[#333] pt-6">
                  <h4 className="font-bold text-gray-400 mb-4 text-sm uppercase tracking-wider">Example Prompts</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "A futuristic robot cooking breakfast in a sunny kitchen",
                      "Abstract digital waves of color flowing like silk",
                      "Macro shot of a butterfly emerging from its cocoon in bioluminescent forest",
                      "A neon hologram of a cat driving at top speed in cyber city"
                    ].map(p => (
                      <button 
                        key={p} 
                        onClick={() => setVeoPrompt(p)}
                        className="text-xs bg-[#272727] hover:bg-[#3f3f3f] px-3 py-2 rounded-full transition-colors border border-[#333]"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0f0f0f] border-t border-[#303030] flex items-center justify-around px-4 z-50">
        <button 
          onClick={() => setActivePage(Page.HOME)}
          className={`flex flex-col items-center gap-1 ${activePage === Page.HOME ? 'text-white' : 'text-gray-400'}`}
        >
          <i className="fa-solid fa-house text-lg"></i>
          <span className="text-[10px]">Home</span>
        </button>
        <button 
          onClick={() => setActivePage(Page.CREATE)}
          className={`flex flex-col items-center gap-1 ${activePage === Page.CREATE ? 'text-white' : 'text-gray-400'}`}
        >
          <i className="fa-solid fa-circle-plus text-2xl"></i>
          <span className="text-[10px]">Create</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <i className="fa-solid fa-layer-group text-lg"></i>
          <span className="text-[10px]">Subs</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <i className="fa-solid fa-user text-lg"></i>
          <span className="text-[10px]">You</span>
        </button>
      </div>
    </div>
  );
};

export default App;
