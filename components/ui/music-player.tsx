"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  className?: string;
}

export const MusicPlayer = ({ className }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("fixed bottom-6 right-6 z-50", className)}
    >
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
          >
            <Music className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
