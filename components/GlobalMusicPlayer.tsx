"use client";

import React from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useMusic } from "@/hooks/useMusic";

export const GlobalMusicPlayer = () => {
  const { data } = useWeddingData();

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

  if (!music.enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative bg-black/80 backdrop-blur-sm border border-white/20 rounded-full p-3 shadow-lg">
        {/* Error Message - di atas player */}
        {music.error && (
          <div className="absolute -top-14 right-0 bg-red-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg max-w-[160px] md:max-w-none whitespace-normal break-words">
            {music.error}
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Music Info */}
          <div className="text-white text-sm max-w-32 truncate">
            {music.songTitle}bu
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
      </div>
    </div>
  );
};
