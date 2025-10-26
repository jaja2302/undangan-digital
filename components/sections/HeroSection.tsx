"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card-hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Spotlight } from "@/components/ui/spotlight";
import { useWeddingData } from "@/hooks/useWeddingData";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { ClientOnly } from "@/components/ui/client-only";
import { Heart, Calendar, MapPin, ChevronDown, Sparkles } from "lucide-react";

// Generate particles outside component to avoid impure function calls during render
const generateParticles = () => {
  return Array.from({ length: 15 }, () => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const yEnd = Math.random() * -100;
    const scale = Math.random() * 0.5 + 0.5;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    const type = Math.floor(Math.random() * 3);

    return { x, y, yEnd, scale, duration, delay, type };
  });
};

const particles = generateParticles();

export const HeroSection = () => {
  const { data, loading, error } = useWeddingData();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Error loading data</div>
      </div>
    );
  }

  return (
    <div
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black pt-20"
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* Floating particles */}
      <ClientOnly>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${particle.x}vw`,
                top: `${particle.y}vh`,
              }}
              initial={{
                scale: particle.scale,
                opacity: 0,
              }}
              animate={{
                y: [`0vh`, `${particle.yEnd - particle.y}vh`],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            >
              {particle.type === 0 ? (
                <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
              ) : particle.type === 1 ? (
                <Sparkles className="w-4 h-4 text-yellow-400" />
              ) : (
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
              )}
            </motion.div>
          ))}
        </div>
      </ClientOnly>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Opening text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <div className="text-5xl">💍</div>
          </motion.div>
          <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest">
            The Wedding of
          </p>
        </motion.div>

        {/* Names with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Decorative lines */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -top-4 left-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-4 left-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            />

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                {data.hero.groomName}
              </span>
              <motion.span
                animate={{ scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mx-4 text-pink-500"
              >
                &
              </motion.span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                {data.hero.brideName}
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Main invitation text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <TextGenerateEffect
            words="Mengundang Anda Untuk Menyaksikan & Memberkati Pernikahan Kami"
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          />
        </motion.div>

        {/* Date & Location Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mb-8"
        >
          <Card className="p-6 md:p-8 backdrop-blur-sm bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Calendar className="w-6 h-6 text-pink-400" />
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {data.hero.weddingDate}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {data.hero.weddingTime}
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

              <div className="flex items-center justify-center gap-3">
                <MapPin className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-lg text-white font-semibold">
                    {data.hero.venue}
                  </p>
                  <p className="text-gray-400 text-sm">{data.hero.location}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-6"
        >
          <p className="text-gray-400 text-sm mb-4 uppercase tracking-wider">
            Counting Down To Our Special Day
          </p>
          <ClientOnly>
            <CountdownTimer targetDate={data.hero.targetDate} />
          </ClientOnly>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mb-6"
        >
          <p className="text-gray-500 text-xs italic max-w-xl mx-auto leading-relaxed">
            &ldquo;{data.hero.quote}&rdquo;
          </p>
          <p className="text-pink-400 text-xs mt-1">{data.hero.quoteSource}</p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          {/* RSVP Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("rsvp")}
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full overflow-hidden shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 transition-all duration-300"
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 0.5 }}
            />
            <div className="relative flex items-center gap-3 text-white font-semibold text-lg">
              <Heart className="w-6 h-6" fill="currentColor" />
              <span>Konfirmasi Kehadiran</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => scrollToSection("couple")}
          >
            <ChevronDown className="w-8 h-8 text-gray-400 hover:text-white transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
