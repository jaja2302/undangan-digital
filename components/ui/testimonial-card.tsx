"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  name: string;
  designation: string;
  className?: string;
}

export const TestimonialCard = ({
  quote,
  name,
  designation,
  className,
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6",
        className
      )}
    >
      <div className="absolute top-4 left-4 text-4xl text-white/20">"</div>
      <p className="text-white/90 text-lg leading-relaxed mb-4 mt-2">
        {quote}
      </p>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-white font-semibold">{name}</p>
          <p className="text-white/60 text-sm">{designation}</p>
        </div>
      </div>
    </motion.div>
  );
};
