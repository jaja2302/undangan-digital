"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { SectionBackground } from "@/components/ui/section-background";
import { useWeddingData } from "@/hooks/useWeddingData";
import { ClientOnly } from "@/components/ui/client-only";

export const TestimonialsSection = () => {
  const { data, loading, error } = useWeddingData();

  if (loading) {
    return (
      <SectionBackground>
        <div className="container mx-auto px-4 text-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </SectionBackground>
    );
  }

  if (error || !data) {
    return (
      <SectionBackground>
        <div className="container mx-auto px-4 text-center">
          <div className="text-white text-xl">Error loading data</div>
        </div>
      </SectionBackground>
    );
  }

  const testimonials = data.testimonials;

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
