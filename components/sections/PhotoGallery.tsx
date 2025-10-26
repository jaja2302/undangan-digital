"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { ClientOnly } from "@/components/ui/client-only";

export const PhotoGallery = () => {
  const photos = [
    {
      id: "pertemuan-pertama",
      quote: "Momen pertama kami bertemu",
      name: "Foto Pertama",
      title: "Pertemuan Pertama",
      src: "https://picsum.photos/400/400?random=1",
    },
    {
      id: "liburan-pantai",
      quote: "Liburan bersama di pantai",
      name: "Liburan Pantai",
      title: "Momen Bahagia",
      src: "https://picsum.photos/400/400?random=2",
    },
    {
      id: "keluarga-besar",
      quote: "Acara keluarga besar",
      name: "Keluarga Besar",
      title: "Bersama Keluarga",
      src: "https://picsum.photos/400/400?random=3",
    },
    {
      id: "malam-romantis",
      quote: "Malam romantis di restoran",
      name: "Malam Romantis",
      title: "Date Night",
      src: "https://picsum.photos/400/400?random=4",
    },
    {
      id: "petualangan-gunung",
      quote: "Perjalanan ke gunung",
      name: "Petualangan Gunung",
      title: "Adventure Time",
      src: "https://picsum.photos/400/400?random=5",
    },
    {
      id: "sebelum-lamaran",
      quote: "Momen sebelum lamaran",
      name: "Sebelum Lamaran",
      title: "Pre-Proposal",
      src: "https://picsum.photos/400/400?random=6",
    },
  ];

  return (
    <AuroraBackground id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Galeri Foto
          </h2>
          <p className="text-xl text-gray-300">
            Kenangan indah perjalanan cinta kami
          </p>
        </motion.div>

        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md">
          <ClientOnly>
            <InfiniteMovingCards
              items={photos}
              direction="right"
              speed="slow"
              className="w-full"
            />
          </ClientOnly>
        </div>
      </div>
    </AuroraBackground>
  );
};
