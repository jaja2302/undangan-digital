"use client";

import React from "react";
import { motion } from "framer-motion";
import { WobbleCard } from "@/components/ui/wobble-card";
import { useWeddingData } from "@/hooks/useWeddingData";
import { SectionBackground } from "@/components/ui/section-background";

export const RSVPSection = () => {
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
  return (
    <SectionBackground>
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {data.rsvp.title}
          </h2>
          <p className="text-xl text-gray-300 mb-8">{data.rsvp.subtitle}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <WobbleCard className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Hadir</h3>
                <p className="text-gray-300">Saya akan hadir</p>
              </div>
            </WobbleCard>

            <WobbleCard className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  Tidak Hadir
                </h3>
                <p className="text-gray-300">Maaf tidak bisa hadir</p>
              </div>
            </WobbleCard>
          </div>

          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-6 border border-pink-500/20">
            <div className="text-white font-semibold text-lg">
              {data.rsvp.thankYouMessage}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionBackground>
  );
};
