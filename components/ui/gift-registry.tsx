"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift, Heart, Home, Car, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

interface GiftRegistryProps {
  className?: string;
}

export const GiftRegistry = ({ className }: GiftRegistryProps) => {
  const gifts = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Rumah Impian",
      description: "Bantuan untuk membeli rumah pertama",
      amount: "Rp 50.000.000",
      progress: 75,
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Mobil Keluarga",
      description: "Untuk transportasi keluarga baru",
      amount: "Rp 25.000.000",
      progress: 45,
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Honeymoon",
      description: "Perjalanan bulan madu ke Bali",
      amount: "Rp 15.000.000",
      progress: 90,
    },
  ];

  return (
    <div
      id="gifts"
      className={cn("py-20 bg-gradient-to-b from-black to-gray-900", className)}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Gift Registry
          </h2>
          <p className="text-xl text-gray-300">
            Bantuan Anda sangat berarti untuk memulai kehidupan baru kami
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {gifts.map((gift, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">{gift.icon}</div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {gift.title}
                </h3>
                <p className="text-gray-300 mb-4">{gift.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Target</span>
                    <span>{gift.amount}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${gift.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {gift.progress}% terkumpul
                  </p>
                </div>

                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:scale-105 transition-transform duration-200">
                  <Gift className="w-4 h-4 inline mr-2" />
                  Berikan Hadiah
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-2xl mx-auto">
            <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Terima Kasih</h3>
            <p className="text-gray-300">
              Kehadiran dan doa Anda adalah hadiah terindah untuk kami. Tidak
              ada yang lebih berharga dari dukungan dan kasih sayang keluarga
              dan sahabat.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
