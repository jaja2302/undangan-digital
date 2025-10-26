"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeddingData } from "@/hooks/useWeddingData";
import { SectionBackground } from "@/components/ui/section-background";
import {
  Heart,
  User,
  Users,
  MessageSquare,
  Check,
  X,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

interface Attendee {
  id: string;
  name: string;
  attendance: string;
  guestCount: string;
  message: string;
  submittedAt: string;
}

export const RSVPSection = () => {
  const { data, loading, error } = useWeddingData();
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    guestCount: "1",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [submitError, setSubmitError] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Fetch attendees on mount
  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await fetch("/api/rsvp");
      const data = await response.json();
      setAttendees(data.attendees || []);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setIsRateLimited(false);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // Refresh attendees list
        await fetchAttendees();

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            attendance: "",
            guestCount: "1",
            message: "",
          });
        }, 3000);
      } else {
        if (result.code === "RATE_LIMIT") {
          setIsRateLimited(true);
        }
        setSubmitError(result.error || "Failed to submit RSVP");
      }
    } catch (error) {
      setSubmitError("Network error. Please try again.");
      console.error("Error submitting RSVP:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate statistics
  const stats = {
    total: attendees.length,
    attending: attendees.filter((a) => a.attendance === "hadir").length,
    notAttending: attendees.filter((a) => a.attendance === "tidak-hadir")
      .length,
    totalGuests: attendees
      .filter((a) => a.attendance === "hadir")
      .reduce((sum, a) => sum + parseInt(a.guestCount || "1"), 0),
  };

  if (loading) {
    return (
      <SectionBackground>
        <div className="container mx-auto px-4 text-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Heart className="w-12 h-12 text-pink-500" />
          </motion.div>
          <div className="text-white text-xl mt-4">Loading...</div>
        </div>
      </SectionBackground>
    );
  }

  if (error || !data) {
    return (
      <SectionBackground>
        <div className="container mx-auto px-4 text-center py-20">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <div className="text-white text-xl">Error loading data</div>
        </div>
      </SectionBackground>
    );
  }

  return (
    <SectionBackground id="rsvp">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-yellow-400" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
            {data.rsvp.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {data.rsvp.subtitle}
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-pink-400">
              {stats.total}
            </div>
            <div className="text-gray-400 text-sm mt-1">Total RSVP</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-400">
              {stats.attending}
            </div>
            <div className="text-gray-400 text-sm mt-1">Hadir</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-red-400">
              {stats.notAttending}
            </div>
            <div className="text-gray-400 text-sm mt-1">Tidak Hadir</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">
              {stats.totalGuests}
            </div>
            <div className="text-gray-400 text-sm mt-1">Total Tamu</div>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              // Success State
              <motion.div
                key="success"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2,
                  }}
                >
                  <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Terima Kasih! 💕
                </h3>
                <p className="text-gray-300 text-lg">
                  Konfirmasi kehadiran Anda telah diterima
                </p>
              </motion.div>
            ) : isRateLimited ? (
              // Rate Limited State
              <motion.div
                key="rate-limited"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="text-center py-20"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <Clock className="w-24 h-24 text-orange-500 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Sabar ya! ⏰
                </h3>
                <p className="text-gray-300 text-lg mb-6">{submitError}</p>
                <p className="text-gray-400 text-sm">
                  Kami membatasi 1 RSVP per 24 jam untuk mencegah spam
                </p>
              </motion.div>
            ) : (
              // Form State
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Error Message */}
                {submitError && !isRateLimited && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-red-300">{submitError}</span>
                  </motion.div>
                )}

                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl"
                >
                  <label className="block text-white font-semibold mb-3 flex items-center gap-2 text-lg">
                    <User className="w-5 h-5 text-pink-400" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Contoh: Ahmad Rizki"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-lg"
                  />
                </motion.div>

                {/* Attendance Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-white font-semibold mb-4 text-center text-lg">
                    Konfirmasi Kehadiran
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Hadir Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setFormData({ ...formData, attendance: "hadir" })
                      }
                      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                        formData.attendance === "hadir"
                          ? "ring-2 ring-green-500 shadow-lg shadow-green-500/30"
                          : "hover:shadow-lg"
                      }`}
                    >
                      <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-white/10 p-8">
                        <div className="text-center relative z-10">
                          <motion.div
                            animate={
                              formData.attendance === "hadir"
                                ? {
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0],
                                  }
                                : {}
                            }
                            transition={{ duration: 0.5 }}
                            className="mb-4"
                          >
                            <div
                              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                                formData.attendance === "hadir"
                                  ? "bg-green-500"
                                  : "bg-green-500/20"
                              }`}
                            >
                              <Check className="w-8 h-8 text-white" />
                            </div>
                          </motion.div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            Hadir
                          </h3>
                          <p className="text-gray-400">Saya akan hadir</p>
                        </div>
                        {formData.attendance === "hadir" && (
                          <motion.div
                            layoutId="selected"
                            className="absolute inset-0 bg-green-500/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                    </motion.button>

                    {/* Tidak Hadir Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setFormData({ ...formData, attendance: "tidak-hadir" })
                      }
                      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                        formData.attendance === "tidak-hadir"
                          ? "ring-2 ring-red-500 shadow-lg shadow-red-500/30"
                          : "hover:shadow-lg"
                      }`}
                    >
                      <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-white/10 p-8">
                        <div className="text-center relative z-10">
                          <motion.div
                            animate={
                              formData.attendance === "tidak-hadir"
                                ? {
                                    scale: [1, 1.2, 1],
                                    rotate: [0, -10, 10, 0],
                                  }
                                : {}
                            }
                            transition={{ duration: 0.5 }}
                            className="mb-4"
                          >
                            <div
                              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                                formData.attendance === "tidak-hadir"
                                  ? "bg-red-500"
                                  : "bg-red-500/20"
                              }`}
                            >
                              <X className="w-8 h-8 text-white" />
                            </div>
                          </motion.div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            Tidak Hadir
                          </h3>
                          <p className="text-gray-400">Maaf tidak bisa hadir</p>
                        </div>
                        {formData.attendance === "tidak-hadir" && (
                          <motion.div
                            layoutId="selected"
                            className="absolute inset-0 bg-red-500/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Guest Count (only if attending) */}
                <AnimatePresence>
                  {formData.attendance === "hadir" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl">
                        <label className="block text-white font-semibold mb-3 flex items-center gap-2 text-lg">
                          <Users className="w-5 h-5 text-blue-400" />
                          Jumlah Tamu
                        </label>
                        <select
                          value={formData.guestCount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              guestCount: e.target.value,
                            })
                          }
                          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-lg cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option
                              key={num}
                              value={num}
                              className="bg-gray-900"
                            >
                              {num} {num === 1 ? "Orang" : "Orang"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl"
                >
                  <label className="block text-white font-semibold mb-3 flex items-center gap-2 text-lg">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                    Ucapan & Doa (Opsional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tulis ucapan atau doa untuk kami..."
                    rows={4}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none text-lg"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center pt-4"
                >
                  <motion.button
                    type="submit"
                    disabled={
                      !formData.name || !formData.attendance || isSubmitting
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-12 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full text-white font-bold text-xl shadow-2xl shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group transition-all"
                  >
                    <span className="relative flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Heart className="w-6 h-6" fill="currentColor" />
                          </motion.div>
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          Kirim Konfirmasi
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.div>

                {/* Thank You Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-8"
                >
                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/30 backdrop-blur-sm">
                    <Heart
                      className="w-10 h-10 text-pink-400 mx-auto mb-3"
                      fill="currentColor"
                    />
                    <p className="text-white font-semibold text-lg">
                      {data.rsvp.thankYouMessage}
                    </p>
                  </div>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Recent Attendees List */}
        {attendees.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Ucapan & Doa Terbaru
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-500/50 scrollbar-track-gray-900/50">
              {attendees
                .filter((a) => a.message)
                .slice()
                .reverse()
                .slice(0, 10)
                .map((attendee, index) => (
                  <motion.div
                    key={attendee.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          attendee.attendance === "hadir"
                            ? "bg-green-500/20"
                            : "bg-red-500/20"
                        }`}
                      >
                        {attendee.attendance === "hadir" ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <X className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-semibold">
                            {attendee.name}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(attendee.submittedAt).toLocaleDateString(
                              "id-ID"
                            )}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm italic">
                          &ldquo;{attendee.message}&rdquo;
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </SectionBackground>
  );
};
