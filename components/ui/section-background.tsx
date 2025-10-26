"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface SectionBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const SectionBackground = ({
  className,
  children,
  ...props
}: SectionBackgroundProps) => {
  return (
    <div className={cn("relative py-20", className)} {...props}>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
