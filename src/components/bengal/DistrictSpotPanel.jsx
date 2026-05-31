import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Compass, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { hiddenSpots } from "../../data/hiddenSpots";

const TYPE_COLORS = {
  craft: "text-amber-400 bg-amber-400/10",
  heritage: "text-blue-400 bg-blue-400/10",
  nature: "text-emerald-400 bg-emerald-400/10",
  spiritual: "text-purple-400 bg-purple-400/10",
  festival: "text-rose-400 bg-rose-400/10",
  music: "text-cyan-400 bg-cyan-400/10",
  culture: "text-orange-400 bg-orange-400/10",
};

export default function DistrictSpotPanel({ district, onClose }) {
  const [activeSpot, setActiveSpot] = useState(null);
  const navigate = useNavigate();
  const spots = district ? hiddenSpots[district.id] || [] : [];

  return (
    <AnimatePresence>
      {district && (
        <motion.div
          className="absolute top-0 right-0 h-full w-full sm:w-80 glass rounded-2xl overflow-hidden flex flex-col z-30"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderColor: `${district.accentColor}30` }}
        >
          {/* Panel header */}
          <div
            className="p-5 border-b border-border/30 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${district.accentColor}12, transparent)` }}
          >
            <div
              className="absolute top-0 left-0 w-full h-0.5"
              style={{ backgroundColor: district.accentColor }}
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3.5 h-3.5" style={{ color: district.accentColor }} />
              <span className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: district.accentColor }}>
                Hidden Gems
              </span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground">{district.name}</h3>
            <p className="text-xs font-heading italic text-muted-foreground mt-0.5">{district.subtitle}</p>
          </div>

          {/* Spot list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/50 font-body mb-3 px-1">
              {spots.length} hidden spots discovered
            </p>

            {spots.map((spot, i) => (
              <motion.button
                key={spot.id}
                className="w-full text-left rounded-xl p-3 transition-all duration-300 group"
                style={{
                  background: activeSpot?.id === spot.id
                    ? `${district.accentColor}12`
                    : "hsl(var(--muted)/0.4)",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: activeSpot?.id === spot.id
                    ? `${district.accentColor}40`
                    : "hsl(var(--border)/0.3)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setActiveSpot(activeSpot?.id === spot.id ? null : spot)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">{spot.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-body font-medium text-foreground truncate">
                        {spot.name}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-body capitalize shrink-0 ${TYPE_COLORS[spot.type] || "text-muted-foreground bg-muted"}`}>
                        {spot.type}
                      </span>
                    </div>

                    <AnimatePresence>
                      {activeSpot?.id === spot.id && (
                        <motion.p
                          className="text-xs text-muted-foreground leading-relaxed mt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {spot.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <Compass
                    className="w-3.5 h-3.5 shrink-0 mt-0.5 transition-all duration-300"
                    style={{ color: activeSpot?.id === spot.id ? district.accentColor : "hsl(var(--muted-foreground)/0.4)" }}
                  />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="p-4 border-t border-border/20">
            <button
              onClick={() => navigate(`/district/${district.id}`)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-body font-medium tracking-widest uppercase transition-all duration-300 hover:opacity-90"
              style={{
                background: `linear-gradient(135deg, ${district.accentColor}20, ${district.accentColor}10)`,
                border: `1px solid ${district.accentColor}30`,
                color: district.accentColor,
              }}
            >
              <span>Explore {district.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
