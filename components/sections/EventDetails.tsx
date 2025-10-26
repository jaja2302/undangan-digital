"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card-hover-effect";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Sparkles,
  Navigation,
} from "lucide-react";
import Image from "next/image";

export const EventDetails = () => {
  // Timeline perjalanan cinta dengan foto
  const journey = [
    {
      year: "2020",
      title: "Pertemuan Pertama",
      description: "Takdir mempertemukan kami di kampus",
      icon: "✨",
      image: "https://picsum.photos/seed/first-meet/400/300",
    },
    {
      year: "2021",
      title: "Jadian",
      description: "Dimulainya komitmen untuk saling melengkapi",
      icon: "💕",
      image: "https://picsum.photos/seed/dating/400/300",
    },
    {
      year: "2023",
      title: "Lamaran",
      description: "Momen sakral penyatuan dua keluarga",
      icon: "💍",
      image: "https://picsum.photos/seed/engagement/400/300",
    },
    {
      year: "2024",
      title: "Pernikahan",
      description: "Hari yang kami nantikan bersama",
      icon: "👰",
      image: "https://picsum.photos/seed/wedding/400/300",
    },
  ];

  const events = [
    {
      title: "Akad Nikah",
      time: "08:00 WIB",
      date: "15 Juni 2024",
      location: "Masjid Al-Ikhlas",
      address: "Jl. Merdeka No. 123, Jakarta",
      color: "from-pink-500 to-rose-500",
      lat: -6.2088,
      lng: 106.8456,
      mapUrl: "https://www.google.com/maps?q=-6.2088,106.8456",
    },
    {
      title: "Resepsi Pernikahan",
      time: "19:00 WIB",
      date: "15 Juni 2024",
      location: "Gedung Serbaguna",
      address: "Jl. Sudirman No. 456, Jakarta",
      color: "from-purple-500 to-indigo-500",
      lat: -6.2215,
      lng: 106.8145,
      mapUrl: "https://www.google.com/maps?q=-6.2215,106.8145",
    },
  ];

  const openGoogleMaps = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      id="events"
      className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      <div className="container mx-auto px-4">
        {/* Journey Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="inline-block mb-4"
          >
            <Heart className="w-12 h-12 text-pink-500" fill="currentColor" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Perjalanan Cinta Kami
          </h2>
          <p className="text-xl text-gray-300">
            Setiap langkah membawa kami ke momen ini
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto mb-20 relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 hidden md:block" />

          {journey.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row items-center mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0
                    ? "md:text-right md:pr-8"
                    : "md:text-left md:pl-8"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 shadow-xl overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative h-48 w-full overflow-hidden group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

                    {/* Year badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg"
                    >
                      {item.year}
                    </motion.div>

                    {/* Icon overlay */}
                    <div className="absolute bottom-4 left-4 text-5xl drop-shadow-lg">
                      {item.icon}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              </div>

              {/* Center dot with pulse animation */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(236, 72, 153, 0.7)",
                      "0 0 0 15px rgba(236, 72, 153, 0)",
                      "0 0 0 0 rgba(236, 72, 153, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full border-4 border-gray-900 shadow-lg"
                />
              </motion.div>

              {/* Empty space for opposite side */}
              <div className="hidden md:block w-5/12" />
            </motion.div>
          ))}
        </div>

        {/* Event Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 left-1/4 text-4xl"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute top-0 right-1/4 text-4xl"
          >
            💫
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Detail Acara
          </h2>
          <p className="text-xl text-gray-300">
            Mari bergabung dalam momen bahagia kami
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <Card className="p-8 h-full relative overflow-hidden group">
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Floating particles effect */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="absolute top-4 right-4"
                >
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>

                <div className="text-center relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center`}
                  >
                    <Heart className="w-8 h-8 text-white" fill="currentColor" />
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    {event.title}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center justify-center space-x-3 bg-gray-800/50 rounded-lg p-3"
                    >
                      <Calendar className="w-5 h-5 text-pink-400" />
                      <span className="text-gray-300 font-medium">
                        {event.date}
                      </span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center justify-center space-x-3 bg-gray-800/50 rounded-lg p-3"
                    >
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300 font-medium">
                        {event.time}
                      </span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center justify-center space-x-3 bg-gray-800/50 rounded-lg p-3"
                    >
                      <MapPin className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300 font-medium">
                        {event.location}
                      </span>
                    </motion.div>
                  </div>

                  <p className="text-sm text-gray-400 mb-6">{event.address}</p>

                  <motion.button
                    onClick={() => openGoogleMaps(event.mapUrl)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r ${event.color} rounded-lg px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto group`}
                  >
                    <Navigation className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                    Buka Google Maps
                  </motion.button>

                  {/* Coordinates info (optional) */}
                  <p className="text-xs text-gray-500 mt-3">
                    📍 {event.lat}, {event.lng}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
