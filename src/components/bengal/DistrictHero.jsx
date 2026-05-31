import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AmbientParticles from "./AmbientParticles";

export default function DistrictHero({ district }) {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${district.accentColor}15, transparent 60%),
                       radial-gradient(ellipse at 70% 80%, ${district.accentColor}08, transparent 50%),
                       linear-gradient(to bottom, hsl(var(--background)), hsl(var(--card)))`,
        }}
      />
      <AmbientParticles count={30} color={`${district.accentColor}40`} />

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, ${district.accentColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-12 pt-32">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-body text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Atlas
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8" style={{ backgroundColor: district.accentColor }} />
            <span className="text-xs font-body tracking-[0.3em] uppercase" style={{ color: district.accentColor }}>
              {district.subtitle}
            </span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-4">
            {district.name}
          </h1>

          <p className="font-heading text-lg italic text-muted-foreground max-w-xl">
            {district.tagline}
          </p>

          {/* Mood tags */}
          <div className="flex gap-2 mt-6">
            {district.moodTags.map(tag => (
              <span
                key={tag}
                className="text-[10px] px-3 py-1 rounded-full font-body capitalize border"
                style={{
                  borderColor: `${district.accentColor}30`,
                  color: district.accentColor,
                  backgroundColor: `${district.accentColor}08`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
