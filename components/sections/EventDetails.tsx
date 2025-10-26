"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card-hover-effect";
import { Calendar, Clock, MapPin } from "lucide-react";

export const EventDetails = () => {
  const events = [
    {
      title: "Akad Nikah",
      time: "08:00 WIB",
      date: "15 Juni 2024",
      location: "Masjid Al-Ikhlas",
      address: "Jl. Merdeka No. 123, Jakarta",
    },
    {
      title: "Resepsi Pernikahan",
      time: "19:00 WIB",
      date: "15 Juni 2024",
      location: "Gedung Serbaguna",
      address: "Jl. Sudirman No. 456, Jakarta",
    },
  ];

  return (
    <div id="events" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Detail Acara
          </h2>
          <p className="text-xl text-gray-300">
            Mari bergabung dalam momen bahagia kami
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="p-8 h-full">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {event.title}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center space-x-2">
                      <Calendar className="w-5 h-5 text-pink-400" />
                      <span className="text-gray-300">{event.date}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">{event.time}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <MapPin className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-4">{event.address}</p>

                  <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-3 inline-block">
                    <div className="text-white font-semibold">Lihat Lokasi</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
