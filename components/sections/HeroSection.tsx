"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card-hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { MovingBorder } from "@/components/ui/moving-border";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { ClientOnly } from "@/components/ui/client-only";
import { Heart } from "lucide-react";

export const HeroSection = () => {
  return (
    <div
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <BackgroundBeams />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <TextGenerateEffect
            words="Kami Mengundang Anda Untuk Menyaksikan Pernikahan Kami"
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <Card className="p-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ahmad & Siti
              </h2>
              <p className="text-lg text-gray-300">Sabtu, 15 Juni 2024</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <ClientOnly>
            <CountdownTimer targetDate="2024-06-15T08:00:00" />
          </ClientOnly>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center"
        >
          <MovingBorder duration={3000} className="p-4">
            <div className="flex items-center space-x-2 text-white">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-lg font-semibold">
                Konfirmasi Kehadiran
              </span>
            </div>
          </MovingBorder>
        </motion.div>
      </div>
    </div>
  );
};
