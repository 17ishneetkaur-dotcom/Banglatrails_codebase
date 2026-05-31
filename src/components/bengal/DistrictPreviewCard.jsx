import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, UtensilsCrossed, Sparkles, MapPin } from "lucide-react";

export default function DistrictPreviewCard({ district, position, isVisible }) {
  if (!district) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute z-50 pointer-events-none"
          style={{
            left: position?.x || 0,
            top: position?.y || 0,
            transform: 'translate(-50%, -110%)',
          }}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass rounded-xl p-5 w-72 shadow-2xl shadow-black/30">
            {/* Color accent bar */}
            <div
              className="h-1 w-12 rounded-full mb-4"
              style={{ backgroundColor: district.accentColor }}
            />

            <h3 className="font-heading text-xl font-bold text-foreground mb-1">
              {district.name}
            </h3>
            <p className="font-heading text-xs italic text-muted-foreground mb-4">
              {district.subtitle}
            </p>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <Music className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-foreground/70 font-body leading-relaxed">
                  {district.folkMusic.slice(0, 2).join(", ")}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <UtensilsCrossed className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                <p className="text-xs text-foreground/70 font-body leading-relaxed">
                  {district.food.slice(0, 3).join(", ")}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-secondary mt-0.5 shrink-0" />
                <p className="text-xs text-foreground/70 font-body leading-relaxed">
                  {district.festivals.slice(0, 2).join(", ")}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-forest mt-0.5 shrink-0" />
                <p className="text-xs text-foreground/70 font-body leading-relaxed">
                  {district.historicalPlaces[0]}
                </p>
              </div>
            </div>

            {/* Mood tags */}
            <div className="flex gap-1.5 mt-4">
              {district.moodTags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground font-body capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[10px] text-muted-foreground/50 mt-3 font-body">
              Click to explore →
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
