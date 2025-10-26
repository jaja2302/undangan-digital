"use client";

import { useState, useRef, useEffect } from "react";

interface MusicConfig {
  enabled: boolean;
  songPath: string;
  songTitle: string;
  autoplay: boolean;
  loop: boolean;
  volume: number;
}

export const useMusic = (config: MusicConfig) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!config.enabled || !config.songPath) return;

    // Create audio element
    const audio = new Audio(config.songPath);
    audio.loop = config.loop;
    audio.volume = config.volume;
    audioRef.current = audio;

    // Event listeners
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => {
      setIsLoading(false);
      console.log("Music loaded successfully");
    };
    const handleError = (e: any) => {
      console.error("Music error:", e);
      setError(`Failed to load music: ${config.songPath}`);
      setIsLoading(false);
    };
    const handleEnded = () => {
      if (!config.loop) {
        setIsPlaying(false);
      }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Try autoplay if enabled (may fail due to browser policy)
    if (config.autoplay) {
      audio.play().catch((err) => {
        console.log("Autoplay blocked by browser:", err);
        setError("Autoplay blocked. Click play button.");
      });
    }

    // Cleanup
    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audio.src = "";
    };
  }, [config]);

  const togglePlay = async () => {
    if (!audioRef.current || !config.enabled) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      setError("Failed to play music");
      console.error("Music play error:", err);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    isLoading,
    error,
    togglePlay,
    stop,
    songTitle: config.songTitle,
    enabled: config.enabled,
  };
};
