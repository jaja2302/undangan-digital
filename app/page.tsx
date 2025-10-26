"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { MusicPlayer } from "@/components/ui/music-player";
import { GiftRegistry } from "@/components/ui/gift-registry";
import { HeroSection } from "@/components/sections/HeroSection";
import { CoupleSection } from "@/components/sections/CoupleSection";
import { EventDetails } from "@/components/sections/EventDetails";
import { PhotoGallery } from "@/components/sections/PhotoGallery";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { RSVPSection } from "@/components/sections/RSVPSection";
import { Heart, Calendar, Camera, Users, Gift } from "lucide-react";

export default function WeddingInvitation() {
  const navItems = [
    {
      title: "Home",
      href: "#home",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      title: "Couple",
      href: "#couple",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Events",
      href: "#events",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Gallery",
      href: "#gallery",
      icon: <Camera className="h-4 w-4" />,
    },
    {
      title: "Gifts",
      href: "#gifts",
      icon: <Gift className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingDock items={navItems} />
      <HeroSection />
      <CoupleSection />
      <EventDetails />
      <PhotoGallery />
      <TestimonialsSection />
      <GiftRegistry />
      <RSVPSection />
      <MusicPlayer />
    </div>
  );
}
