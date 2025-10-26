"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
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
      name: "Home",
      link: "#home",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      name: "Couple",
      link: "#couple",
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: "Events",
      link: "#events",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "Gallery",
      link: "#gallery",
      icon: <Camera className="h-4 w-4" />,
    },
    {
      name: "Gifts",
      link: "#gifts",
      icon: <Gift className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNav navItems={navItems} />
      <HeroSection />
      <CoupleSection />
      <EventDetails />
      <PhotoGallery />
      <TestimonialsSection />
      <GiftRegistry />
      <RSVPSection />
    </div>
  );
}
