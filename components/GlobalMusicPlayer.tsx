"use client";

import React, { useState, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useMusic } from "@/hooks/useMusic";

export const GlobalMusicPlayer = () => {
  const { data } = useWeddingData();
  const [isVisible, setIsVisible] = useState(false);
  
  const music = useMusic(
    data?.music || {
      enabled: false,
      songPath: "",
      songTitle: "",
      autoplay: false,
      loop: true,
      volume: 0.5,
    }
  );

  // Show player after data loads
  useEffect(() => {
    if (data?.music?.enabled) {
      setIsVisible(true);
    }
  }, [data]);

  if (!isVisible || !music.enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-full p-3 shadow-lg">
        <div className="flex items-center gap-3">
          {/* Music Info */}
          <div className="text-white text-sm max-w-32 truncate">
            {music.songTitle}
          </div>
          
          {/* Play/Pause Button */}
          <button
            onClick={music.togglePlay}
            disabled={music.isLoading}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
          >
            <Music 
              className={`w-4 h-4 text-white ${
                music.isPlaying ? "animate-pulse" : ""
              }`} 
            />
          </button>
          
          {/* Volume Button */}
          <button
            onClick={() => {
              // Toggle mute functionality
              console.log("Volume toggle");
            }}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <Volume2 className="w-4 h-4 text-white" />
          </button>
        </div>
        
        {/* Error Message */}
        {music.error && (
          <div className="absolute -top-12 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {music.error}
          </div>
        )}
      </div>
    </div>
  );
};
