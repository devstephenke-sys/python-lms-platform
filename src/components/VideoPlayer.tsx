'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, Maximize, Pause } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title?: string;
  autoplay?: boolean;
}

export default function VideoPlayer({ url, title, autoplay = false }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);

  // Check if it's a YouTube URL
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  
  // Check if it's a Vimeo URL
  const isVimeo = url.includes('vimeo.com');

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Extract Vimeo video ID
  const getVimeoId = (url: string) => {
    const regExp = /vimeo\.com\/(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const renderYouTube = () => {
    const videoId = getYouTubeId(url);
    if (!videoId) return null;

    return (
      <div className="relative w-full pt-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0`}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  const renderVimeo = () => {
    const videoId = getVimeoId(url);
    if (!videoId) return null;

    return (
      <div className="relative w-full pt-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}`}
          title={title || 'Video'}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  const renderNative = () => {
    return (
      <div className="relative w-full">
        <video
          className="w-full rounded-lg"
          controls
          autoPlay={autoplay}
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {title && (
        <h3 className="text-lg font-semibold">{title}</h3>
      )}
      
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden">
        {isYouTube && renderYouTube()}
        {isVimeo && renderVimeo()}
        {!isYouTube && !isVimeo && renderNative()}
      </div>

      {/* Video Controls Hint */}
      {!isYouTube && !isVimeo && (
        <div className="flex items-center justify-between text-sm text-[var(--foreground)]/60">
          <div className="flex items-center gap-2">
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            <span>{isPlaying ? 'Playing' : 'Paused'}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors"
            >
              <Volume2 className="h-4 w-4" />
              <span>{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>
            <div className="flex items-center gap-2">
              <Maximize className="h-4 w-4" />
              <span>Fullscreen</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
