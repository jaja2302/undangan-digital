"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionBackground } from "@/components/ui/section-background";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { ClientOnly } from "@/components/ui/client-only";
import { X, ChevronLeft, ChevronRight, Heart, ZoomIn } from "lucide-react";

export const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState<{ [key: number]: boolean }>({});

  const photos = [
    {
      id: "pertemuan-pertama",
      quote: "Momen pertama kami bertemu di kampus",
      name: "Foto Pertama",
      title: "Pertemuan Pertama",
      src: "https://picsum.photos/seed/first/800/600",
      date: "Januari 2020",
    },
    {
      id: "liburan-pantai",
      quote: "Liburan bersama di pantai Bali",
      name: "Liburan Pantai",
      title: "Momen Bahagia",
      src: "https://picsum.photos/seed/beach/800/600",
      date: "Juni 2021",
    },
    {
      id: "keluarga-besar",
      quote: "Acara keluarga besar kami",
      name: "Keluarga Besar",
      title: "Bersama Keluarga",
      src: "https://picsum.photos/seed/family/800/600",
      date: "Desember 2021",
    },
    {
      id: "malam-romantis",
      quote: "Malam romantis di restoran favorit",
      name: "Malam Romantis",
      title: "Date Night",
      src: "https://picsum.photos/seed/dinner/800/600",
      date: "Februari 2022",
    },
    {
      id: "petualangan-gunung",
      quote: "Perjalanan seru ke puncak gunung",
      name: "Petualangan Gunung",
      title: "Adventure Time",
      src: "https://picsum.photos/seed/mountain/800/600",
      date: "Agustus 2022",
    },
    {
      id: "sebelum-lamaran",
      quote: "Momen sebelum lamaran yang berkesan",
      name: "Sebelum Lamaran",
      title: "Pre-Proposal",
      src: "https://picsum.photos/seed/proposal/800/600",
      date: "Maret 2023",
    },
    {
      id: "prewedding",
      quote: "Sesi pemotretan prewedding kami",
      name: "Prewedding",
      title: "Prewedding Shoot",
      src: "https://picsum.photos/seed/prewed/800/600",
      date: "Oktober 2023",
    },
    {
      id: "engagement",
      quote: "Hari lamaran yang membahagiakan",
      name: "Hari Lamaran",
      title: "Engagement Day",
      src: "https://picsum.photos/seed/engage/800/600",
      date: "November 2023",
    },
  ];

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length);
    }
  };

  const toggleLike = (index: number) => {
    setIsLiked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <SectionBackground id="gallery" className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20">📸</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-20">💕</div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Heart className="w-12 h-12 text-pink-500" fill="currentColor" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
            Galeri Kenangan
          </h2>
          <p className="text-xl text-gray-300">
            Setiap foto menyimpan cerita indah perjalanan cinta kami
          </p>
        </motion.div>

        {/* Infinite Carousel */}
        <div className="relative w-full overflow-hidden mb-12 -mx-4">
          <ClientOnly>
            <InfiniteMovingCards
              items={photos}
              direction="right"
              speed="slow"
              className="w-full"
            />
          </ClientOnly>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative group cursor-pointer aspect-square rounded-xl overflow-hidden"
              onClick={() => setSelectedPhoto(index)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-gray-300 text-xs">{photo.date}</p>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <ZoomIn className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Like button */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(index);
                }}
                className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isLiked[index] ? "text-red-500" : "text-white"
                  }`}
                  fill={isLiked[index] ? "currentColor" : "none"}
                />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Navigation buttons */}
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 z-50 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </motion.button>

            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 z-50 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </motion.button>

            {/* Image container */}
            <motion.div
              key={selectedPhoto}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] mx-auto"
            >
              <img
                src={photos[selectedPhoto].src}
                alt={photos[selectedPhoto].title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Photo info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-lg"
              >
                <h3 className="text-white text-2xl font-bold mb-2">
                  {photos[selectedPhoto].title}
                </h3>
                <p className="text-gray-300 mb-2">
                  {photos[selectedPhoto].quote}
                </p>
                <p className="text-pink-400 text-sm">
                  {photos[selectedPhoto].date}
                </p>
              </motion.div>

              {/* Counter */}
              <div className="absolute top-4 left-4 bg-black/60 px-4 py-2 rounded-full text-white text-sm">
                {selectedPhoto + 1} / {photos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionBackground>
  );
};
