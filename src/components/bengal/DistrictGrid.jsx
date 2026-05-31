import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { districts } from "../../data/districts";
import { ArrowUpRight } from "lucide-react";

export default function DistrictGrid() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-primary/60 font-body mb-3 block">
            Ten Districts
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Cultural Destinations
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
            Each district carries a unique cultural fingerprint — its own music, cuisine, art, and stories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {districts.map((district, index) => (
            <motion.div
              key={district.id}
              className="group relative glass rounded-xl p-6 cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/district/${district.id}`)}
            >
              {/* Accent bar */}
              <div
                className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: district.accentColor }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${district.accentColor}08, transparent 70%)`,
                }}
              />

              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {district.name}
                    </h3>
                    <p className="font-heading text-xs italic text-muted-foreground">
                      {district.subtitle}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>

                <p className="font-body text-xs text-muted-foreground/70 leading-relaxed mb-4 line-clamp-2">
                  {district.tagline}
                </p>

                {/* Quick facts */}
                <div className="flex flex-wrap gap-1.5">
                  {district.moodTags.map(tag => (
                    <span
                      key={tag}
                      className="text-[9px] px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground font-body capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
