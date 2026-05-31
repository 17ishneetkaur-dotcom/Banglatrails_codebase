import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { districts } from "../../data/districts";

const WB_OUTLINE = "M 50 2 C 42 3, 38 8, 35 15 C 32 22, 28 25, 25 30 C 22 35, 20 40, 18 48 C 16 55, 18 60, 22 65 C 25 68, 28 72, 32 76 C 36 80, 40 84, 45 88 C 48 90, 52 92, 58 93 C 62 94, 68 92, 72 88 C 76 84, 78 80, 80 76 C 82 72, 83 68, 82 64 C 81 60, 78 56, 76 52 C 74 48, 72 44, 70 40 C 68 36, 66 32, 64 28 C 62 24, 60 20, 58 16 C 56 12, 54 8, 52 5 Z";

const RIVERS = [
  "M 55 28 C 58 35, 62 42, 65 50 C 68 58, 70 65, 72 72 C 73 76, 72 80, 70 85",
  "M 48 30 C 50 36, 53 42, 55 48 C 57 54, 60 60, 63 66",
  "M 40 50 C 44 54, 48 58, 52 62 C 56 66, 60 68, 64 70",
];

const DISTRICT_SHAPES = {
  kolkata: "M 72 74 L 76 72 L 79 75 L 80 79 L 77 82 L 73 81 L 71 78 Z",
  darjeeling: "M 44 2 L 56 2 L 58 6 L 55 12 L 48 14 L 42 10 L 40 6 Z",
  birbhum: "M 46 38 L 56 36 L 60 40 L 58 46 L 52 48 L 46 46 L 44 42 Z",
  hooghly: "M 58 60 L 66 58 L 70 62 L 68 68 L 62 70 L 56 66 L 56 62 Z",
  bankura: "M 38 56 L 50 54 L 54 60 L 52 66 L 44 68 L 36 64 L 36 60 Z",
  murshidabad: "M 50 26 L 62 24 L 66 30 L 62 36 L 54 38 L 48 34 L 48 30 Z",
  purulia: "M 22 54 L 34 52 L 38 58 L 36 64 L 28 66 L 20 62 L 20 58 Z",
  malda: "M 38 16 L 52 14 L 56 20 L 52 26 L 44 28 L 36 24 L 36 20 Z",
  howrah: "M 64 66 L 72 64 L 76 68 L 74 74 L 68 76 L 62 72 L 62 68 Z",
  "paschim-bardhaman": "M 34 46 L 48 44 L 52 50 L 50 56 L 42 58 L 32 54 L 32 50 Z",
};

// Override map positions for Kolkata to be clearly separated from Howrah
const MAP_POSITION_OVERRIDES = {
  kolkata: { x: 75, y: 78 },
};

export default function BengalMap() {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = useCallback((district) => setHoveredDistrict(district), []);
  const handleMouseLeave = useCallback(() => setHoveredDistrict(null), []);
  const handleClick = useCallback((district) => {
    navigate(`/district/${district.id}`);
  }, [navigate]);

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-primary/60 font-body mb-3 block">
            Interactive Atlas
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Discover Hidden Bengal
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
            Click any district to explore its cultural heritage.
          </p>
        </motion.div>

        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="w-full" style={{ maxWidth: "560px" }}>
            <svg
              viewBox="0 0 100 96"
              className="w-full h-auto"
              style={{ filter: "drop-shadow(0 0 40px rgba(197, 160, 63, 0.08))" }}
            >
              <defs>
                <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(var(--card))" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {[0.92, 0.85, 0.78].map((scale, i) => (
                <path
                  key={i}
                  d={WB_OUTLINE}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.15"
                  opacity={0.12 - i * 0.03}
                  transform={`scale(${scale}) translate(${(1 - scale) * 52}, ${(1 - scale) * 48})`}
                />
              ))}

              <path d={WB_OUTLINE} fill="url(#mapGrad)" stroke="hsl(var(--border))" strokeWidth="0.4" opacity="0.8" />

              {RIVERS.map((path, i) => (
                <path
                  key={i}
                  d={path}
                  fill="none"
                  stroke="hsl(var(--indigo))"
                  strokeWidth="0.3"
                  opacity="0.25"
                  strokeLinecap="round"
                  strokeDasharray={i === 0 ? "none" : "2 1"}
                />
              ))}

              {districts.map((district) => {
                const shape = DISTRICT_SHAPES[district.id];
                const isHovered = hoveredDistrict?.id === district.id;
                const pos = MAP_POSITION_OVERRIDES[district.id] || district.mapPosition;

                return (
                  <g key={district.id} className="cursor-pointer" onClick={() => handleClick(district)}>
                    {shape && (
                      <path
                        d={shape}
                        fill={isHovered ? district.accentColor : "transparent"}
                        fillOpacity={isHovered ? 0.2 : 0}
                        stroke={isHovered ? district.accentColor : "hsl(var(--border))"}
                        strokeWidth={isHovered ? "0.5" : "0.2"}
                        strokeOpacity={isHovered ? 0.8 : 0.3}
                        className="transition-all duration-300"
                        style={{ filter: isHovered ? `drop-shadow(0 0 5px ${district.accentColor}50)` : "none" }}
                        onMouseEnter={() => handleMouseEnter(district)}
                        onMouseLeave={handleMouseLeave}
                      />
                    )}

                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isHovered ? "2" : "1.4"}
                      fill={isHovered ? district.accentColor : "hsl(var(--foreground))"}
                      opacity={isHovered ? 1 : 0.6}
                      className="transition-all duration-300"
                      onMouseEnter={() => handleMouseEnter(district)}
                      onMouseLeave={handleMouseLeave}
                    />

                    {isHovered && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="3.2"
                        fill="none"
                        stroke={district.accentColor}
                        strokeWidth="0.3"
                        opacity="0.4"
                        className="animate-glow-pulse"
                      />
                    )}

                    <text
                      x={pos.x}
                      y={pos.y - 3}
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                      fill={isHovered ? district.accentColor : "hsl(var(--foreground))"}
                      opacity={isHovered ? 1 : 0.4}
                      fontSize="2.2"
                      fontWeight={isHovered ? "600" : "400"}
                      style={{ transition: "all 0.3s ease" }}
                    >
                      {district.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            <AnimatePresence>
              <motion.p
                className="text-center text-[10px] tracking-widest uppercase text-muted-foreground/40 font-body mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Click a district to explore its culture
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
