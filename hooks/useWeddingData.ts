"use client";

import { useState, useEffect } from "react";

interface WeddingData {
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    groomName: string;
    brideName: string;
    groomFullName: string;
    brideFullName: string;
    weddingDate: string;
    weddingTime: string;
    venue: string;
    location: string;
    targetDate: string;
    quote: string;
    quoteSource: string;
  };
  couple: {
    groom: {
      name: string;
      nickname: string;
      fullName: string;
      parents: {
        father: string;
        mother: string;
      };
      instagram: string;
      image: string;
      description: string;
    };
    bride: {
      name: string;
      nickname: string;
      fullName: string;
      parents: {
        father: string;
        mother: string;
      };
      instagram: string;
      image: string;
      description: string;
    };
  };
  events: {
    journey: Array<{
      year: string;
      title: string;
      description: string;
      icon: string;
      image: string;
    }>;
    ceremonies: Array<{
      title: string;
      time: string;
      date: string;
      location: string;
      address: string;
      color: string;
      lat: number;
      lng: number;
      mapUrl: string;
    }>;
  };
  gallery: {
    photos: Array<{
      id: string;
      src: string;
      alt: string;
      liked: boolean;
    }>;
  };
  testimonials: Array<{
    id: string;
    quote: string;
    name: string;
    designation: string;
    src: string;
  }>;
  rsvp: {
    title: string;
    subtitle: string;
    thankYouMessage: string;
  };
  music: {
    enabled: boolean;
    songPath: string;
    songTitle: string;
    autoplay: boolean;
    loop: boolean;
    volume: number;
  };
}

export const useWeddingData = () => {
  const [data, setData] = useState<WeddingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
