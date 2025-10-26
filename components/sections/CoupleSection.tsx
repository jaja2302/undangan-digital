"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionBackground } from "@/components/ui/section-background";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { useWeddingData } from "@/hooks/useWeddingData";
import { Heart, Instagram, Camera, Sparkles } from "lucide-react";

// Fixed values to avoid hydration mismatch
const heartAnimations = [
  { x: 43.8, scale: 0.29, duration: 15.2, delay: 2.1 },
  { x: 38.2, scale: 0.41, duration: 18.7, delay: 0.8 },
  { x: 77.9, scale: 0.27, duration: 16.3, delay: 3.4 },
  { x: 79.4, scale: 0.37, duration: 14.9, delay: 1.7 },
  { x: 76.5, scale: 0.48, duration: 17.1, delay: 4.2 },
  { x: 30.3, scale: 0.38, duration: 13.6, delay: 0.3 },
  { x: 85.0, scale: 0.41, duration: 19.4, delay: 2.8 },
  { x: 77.1, scale: 0.44, duration: 16.7, delay: 1.2 },
  { x: 31.5, scale: 0.47, duration: 18.2, delay: 3.7 },
  { x: 35.3, scale: 0.43, duration: 15.8, delay: 0.9 },
  { x: 4.3, scale: 0.41, duration: 17.5, delay: 2.5 },
  { x: 37.7, scale: 0.45, duration: 14.3, delay: 1.6 },
];

const groomHeartAnimations = [
  { x: 81.6, scale: 0.35, duration: 11.2 },
  { x: 14.5, scale: 0.54, duration: 9.8 },
  { x: 31.9, scale: 0.54, duration: 12.4 },
  { x: 17.1, scale: 0.52, duration: 10.6 },
];

const brideHeartAnimations = [
  { x: 53.4, scale: 0.31, duration: 11.7 },
  { x: 12.9, scale: 0.36, duration: 9.3 },
  { x: 38.7, scale: 0.64, duration: 13.1 },
  { x: 45.5, scale: 0.31, duration: 10.9 },
];

export const CoupleSection = () => {
  const [groomHovered, setGroomHovered] = useState(false);
  const [brideHovered, setBrideHovered] = useState(false);
  const { data, loading, error } = useWeddingData();

  if (loading) {
    return (
      <SectionBackground id="couple">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </SectionBackground>
    );
  }

  if (error || !data) {
    return (
      <SectionBackground id="couple">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white text-xl">Error loading data</div>
        </div>
      </SectionBackground>
    );
  }

  const groom = data.couple.groom;
  const bride = data.couple.bride;

  return (
    <SectionBackground id="couple" className="relative overflow-hidden">
      {/* Floating hearts animation - Full screen coverage */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        suppressHydrationWarning
      >
        {heartAnimations.map((animation, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-500/15"
            initial={{
              y: "120%",
              x: `${animation.x}%`,
              scale: animation.scale,
              opacity: 0,
            }}
            animate={{
              y: "-20%",
              rotate: 360,
              opacity: [0, 0.3, 0.1, 0],
            }}
            transition={{
              duration: animation.duration,
              repeat: Infinity,
              delay: animation.delay,
              ease: "linear",
            }}
          >
            <Heart className="w-6 h-6" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-yellow-400" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
            Mempelai
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Dua hati yang bersatu dalam ikatan suci
          </p>

          {/* Decorative divider */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-xs mx-auto mt-6"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative"
            onHoverStart={() => setGroomHovered(true)}
            onHoverEnd={() => setGroomHovered(false)}
          >
            {/* Card-specific floating hearts */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
              suppressHydrationWarning
            >
              {groomHeartAnimations.map((animation, i) => (
                <motion.div
                  key={`groom-heart-${i}`}
                  className="absolute text-blue-400/20"
                  initial={{
                    y: "100%",
                    x: `${animation.x}%`,
                    scale: animation.scale,
                    opacity: 0,
                  }}
                  animate={{
                    y: "-20%",
                    rotate: 180,
                    opacity: [0, 0.4, 0.2, 0],
                  }}
                  transition={{
                    duration: animation.duration,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: "linear",
                  }}
                >
                  <Heart className="w-4 h-4" fill="currentColor" />
                </motion.div>
              ))}
            </div>
            <CardContainer className="inter-var">
              <CardBody className="bg-gradient-to-br from-gray-900 to-black relative group/card dark:hover:shadow-2xl dark:hover:shadow-blue-500/[0.3] border-white/[0.1] w-full h-auto rounded-2xl p-8 border backdrop-blur-sm">
                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/50 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-400/50 rounded-br-2xl" />

                {/* Groom Icon */}
                <motion.div
                  animate={{ rotate: groomHovered ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-6 right-6 text-3xl"
                >
                  🤵
                </motion.div>

                {/* Name */}
                <CardItem
                  translateZ="50"
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                >
                  {groom.name}
                </CardItem>

                {/* Full Name */}
                <CardItem
                  translateZ="40"
                  className="text-sm text-blue-400 mb-4"
                >
                  {groom.fullName}
                </CardItem>

                {/* Photo */}
                <CardItem translateZ="100" className="w-full my-6">
                  <motion.div
                    className="relative w-56 h-56 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full border-4 border-dashed border-blue-400/30"
                    />

                    <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-blue-400/50 shadow-xl shadow-blue-500/20">
                      <img
                        src={groom.image}
                        alt={groom.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end justify-center pb-4"
                      >
                        <Camera className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                </CardItem>

                {/* Parents Info */}
                <CardItem
                  translateZ="60"
                  className="text-gray-300 text-sm mb-2"
                >
                  {groom.description}
                </CardItem>
                <CardItem translateZ="50" className="space-y-1 mb-6">
                  <p className="text-gray-400 text-sm">
                    {groom.parents.father}
                  </p>
                  <p className="text-gray-400 text-sm">
                    & {groom.parents.mother}
                  </p>
                </CardItem>

                {/* Social Buttons */}
                <div className="flex gap-4 justify-center">
                  <CardItem
                    translateZ={20}
                    as="a"
                    href={`https://instagram.com/${groom.instagram.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-pink-500/50"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>

          {/* Heart Divider (visible on desktop) */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute inset-0 bg-pink-500/30 blur-xl rounded-full" />
              <Heart
                className="w-16 h-16 text-pink-500 relative z-10"
                fill="currentColor"
              />
            </motion.div>
          </motion.div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative"
            onHoverStart={() => setBrideHovered(true)}
            onHoverEnd={() => setBrideHovered(false)}
          >
            {/* Card-specific floating hearts */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
              suppressHydrationWarning
            >
              {brideHeartAnimations.map((animation, i) => (
                <motion.div
                  key={`bride-heart-${i}`}
                  className="absolute text-pink-400/20"
                  initial={{
                    y: "100%",
                    x: `${animation.x}%`,
                    scale: animation.scale,
                    opacity: 0,
                  }}
                  animate={{
                    y: "-20%",
                    rotate: -180,
                    opacity: [0, 0.4, 0.2, 0],
                  }}
                  transition={{
                    duration: animation.duration,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: "linear",
                  }}
                >
                  <Heart className="w-4 h-4" fill="currentColor" />
                </motion.div>
              ))}
            </div>
            <CardContainer className="inter-var">
              <CardBody className="bg-gradient-to-br from-gray-900 to-black relative group/card dark:hover:shadow-2xl dark:hover:shadow-pink-500/[0.3] border-white/[0.1] w-full h-auto rounded-2xl p-8 border backdrop-blur-sm">
                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-pink-400/50 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-pink-400/50 rounded-br-2xl" />

                {/* Bride Icon */}
                <motion.div
                  animate={{ rotate: brideHovered ? -360 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-6 right-6 text-3xl"
                >
                  👰
                </motion.div>

                {/* Name */}
                <CardItem
                  translateZ="50"
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                >
                  {bride.name}
                </CardItem>

                {/* Full Name */}
                <CardItem
                  translateZ="40"
                  className="text-sm text-pink-400 mb-4"
                >
                  {bride.fullName}
                </CardItem>

                {/* Photo */}
                <CardItem translateZ="100" className="w-full my-6">
                  <motion.div
                    className="relative w-56 h-56 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated ring */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full border-4 border-dashed border-pink-400/30"
                    />

                    <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-pink-400/50 shadow-xl shadow-pink-500/20">
                      <img
                        src={bride.image}
                        alt={bride.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-pink-900/80 to-transparent flex items-end justify-center pb-4"
                      >
                        <Camera className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                </CardItem>

                {/* Parents Info */}
                <CardItem
                  translateZ="60"
                  className="text-gray-300 text-sm mb-2"
                >
                  {bride.description}
                </CardItem>
                <CardItem translateZ="50" className="space-y-1 mb-6">
                  <p className="text-gray-400 text-sm">
                    {bride.parents.father}
                  </p>
                  <p className="text-gray-400 text-sm">
                    & {bride.parents.mother}
                  </p>
                </CardItem>

                {/* Social Buttons */}
                <div className="flex gap-4 justify-center">
                  <CardItem
                    translateZ={20}
                    as="a"
                    href={`https://instagram.com/${bride.instagram.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-sm font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-pink-500/50"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        </div>

        {/* Love Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 max-w-3xl mx-auto"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl text-pink-500/20 absolute -top-4 left-0"
            >
              &ldquo;
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="text-6xl text-pink-500/20 absolute -bottom-8 right-0"
            >
              &rdquo;
            </motion.div>

            <p className="text-lg md:text-xl text-gray-300 italic font-light leading-relaxed px-12">
              Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
              pasangan-pasangan untukmu dari jenismu sendiri, agar kamu
              cenderung dan merasa tenteram kepadanya
            </p>
            <p className="text-sm text-pink-400 mt-4 font-semibold">
              — QS. Ar-Rum: 21
            </p>
          </div>
        </motion.div>
      </div>
    </SectionBackground>
  );
};
