"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
}

export const TextGenerateEffect = ({ words, className }: TextGenerateEffectProps) => {
  const wordsArray = words.split(" ");
  
  return (
    <div className={cn("", className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="dark:text-white text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: idx * 0.1,
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </div>
  );
};
