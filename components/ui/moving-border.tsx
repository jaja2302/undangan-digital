"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
}

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
}: MovingBorderProps) => {
  return (
    <div
      className={cn(
        "relative flex rounded-lg border-slate-800/50 p-px",
        containerClassName
      )}
    >
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className={cn("relative bg-black rounded-lg", className)}>
        {children}
      </div>
    </div>
  );
};
