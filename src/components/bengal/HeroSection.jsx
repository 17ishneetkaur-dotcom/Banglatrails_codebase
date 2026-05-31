import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";

const HERO_VIDEO = "https://videos.pexels.com/video-files/3327808/3327808-uhd_2560_1440_25fps.mp4";
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1591702386139-a2e0b4d83c84?w=1920&q=80";

export default function HeroSection({ onExplore }) {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.55;
    }
  }, [videoLoaded]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Fallback background image (shown while video loads or on error) ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ zIndex: 0, backgroundImage: `url("${FALLBACK_IMAGE}")` }}
      />

      {/* ── Video background ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={FALLBACK_IMAGE}
        onCanPlay={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* ── Gradient scrim — cinematic dark vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(10,12,18,0.55) 0%, rgba(10,12,18,0.35) 40%, rgba(10,12,18,0.75) 80%, hsl(var(--background)) 100%)",
        }}
      />

      {/* ── Subtle noise grain for cinematic texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          zIndex: 2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* ── Corner labels ── */}
      <div className="absolute top-[72px] left-8 right-8 pointer-events-none flex justify-between items-center" style={{ zIndex: 3 }}>
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-body">
          West Bengal • India
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-body">
          Cultural Atlas
        </span>
      </div>

      {/* ── Thin border frame ── */}
      <div
        className="absolute top-8 left-8 right-8 bottom-8 rounded-2xl pointer-events-none"
        style={{ zIndex: 3, border: "1px solid rgba(255,255,255,0.06)" }}
      />

      {/* ── Main content ── */}
      <div className="relative text-center px-6 max-w-4xl mx-auto" style={{ zIndex: 4 }}>

        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/60" />
          <MapPin className="w-3.5 h-3.5 text-primary/80" />
          <span className="text-[11px] tracking-[0.4em] uppercase text-primary/80 font-body font-medium">
            An Immersive Journey
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/60" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="font-heading font-bold tracking-tight mb-5 leading-none"
          style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="bg-gradient-to-r from-white via-primary/90 to-accent bg-clip-text text-transparent drop-shadow-[0_2px_30px_rgba(224,100,50,0.25)]">
            BanglaTrails
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-heading text-xl sm:text-2xl md:text-3xl text-white/60 italic mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          Walk Through the Living Stories of Bengal
        </motion.p>

        {/* Body copy */}
        <motion.p
          className="font-body text-sm sm:text-base text-white/45 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
        >
          From the misty peaks of Darjeeling to the terracotta temples of Bishnupur,
          from Nawabi grandeur in Murshidabad to the masked dances of Purulia —
          discover Bengal's living heritage through an interactive cultural atlas.
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={onExplore}
          className="group relative px-10 py-4 rounded-full font-body text-sm tracking-widest uppercase overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.04)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          whileHover={{ scale: 1.03, borderColor: "rgba(224,100,50,0.6)", backgroundColor: "rgba(224,100,50,0.08)" }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative text-white/85 group-hover:text-white transition-colors duration-300">
            Explore Bengal
          </span>
        </motion.button>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 4 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
