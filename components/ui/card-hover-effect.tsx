"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardHoverEffectProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHoverEffect = ({ children, className }: CardHoverEffectProps) => {
  return (
    <div className={cn("group relative", className)}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative px-7 py-6 bg-black rounded-lg leading-none flex items-center justify-center space-x-4">
        {children}
      </div>
    </div>
  );
};
