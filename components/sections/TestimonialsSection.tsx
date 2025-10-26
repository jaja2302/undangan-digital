"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { SectionBackground } from "@/components/ui/section-background";
import { ClientOnly } from "@/components/ui/client-only";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: "budi-santoso",
      quote:
        "Semoga pernikahan kalian berjalan lancar dan penuh berkah. Selamat menempuh hidup baru!",
      name: "Budi Santoso",
      designation: "Saudara Ahmad",
      src: "https://picsum.photos/300/300?random=9",
    },
    {
      id: "dewi-kartika",
      quote:
        "Kalian adalah pasangan yang sangat cocok. Semoga selalu bahagia dan harmonis selamanya.",
      name: "Dewi Kartika",
      designation: "Saudari Siti",
      src: "https://picsum.photos/300/300?random=10",
    },
    {
      id: "ustadz-ahmad",
      quote:
        "Doa terbaik untuk pernikahan kalian. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
      name: "Ustadz Ahmad",
      designation: "Guru Mengaji",
      src: "https://picsum.photos/300/300?random=11",
    },
    {
      id: "ibu-sari",
      quote:
        "Kalian adalah contoh pasangan yang ideal. Semoga cinta kalian abadi selamanya.",
      name: "Ibu Sari",
      designation: "Ibu Ahmad",
      src: "https://picsum.photos/300/300?random=12",
    },
    {
      id: "bapak-agus",
      quote:
        "Selamat untuk pernikahan kalian. Semoga menjadi keluarga yang bahagia dan harmonis.",
      name: "Bapak Agus",
      designation: "Ayah Siti",
      src: "https://picsum.photos/300/300?random=13",
    },
  ];

  return (
    <SectionBackground>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ucapan & Doa
          </h2>
          <p className="text-xl text-gray-300">
            Doa dan harapan dari keluarga dan sahabat
          </p>
        </motion.div>

        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md">
          <ClientOnly>
            <AnimatedTestimonials testimonials={testimonials} />
          </ClientOnly>
        </div>
      </div>
    </SectionBackground>
  );
};
