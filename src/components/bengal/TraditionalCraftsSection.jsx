import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";

const CRAFT_IMAGES = {
  "Bankura Horse": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
  "Kantha embroidery": "https://images.unsplash.com/photo-1545885361-d87beead8e0d?w=400&q=80",
  "Patachitra": "https://images.unsplash.com/photo-1578926314433-b3027ba26eed?w=400&q=80",
  "Thangka paintings": "https://images.unsplash.com/photo-1578926314433-b3027ba26eed?w=400&q=80",
  "Terracotta": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
  "Baluchari saree": "https://images.unsplash.com/photo-1545885361-d87beead8e0d?w=400&q=80",
  "Dokra": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  "Sholapith": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  "Chhau masks": "https://images.unsplash.com/photo-1578926314433-b3027ba26eed?w=400&q=80",
};

const DEFAULT_CRAFT_IMGS = [
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
  "https://images.unsplash.com/photo-1545885361-d87beead8e0d?w=400&q=80",
  "https://images.unsplash.com/photo-1578926314433-b3027ba26eed?w=400&q=80",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
];

const CRAFT_DESCRIPTIONS = {
  "Bankura Horse": "A terracotta horse with a distinctive elongated neck — Bengal's most iconic folk art symbol.",
  "Kantha embroidery": "Running-stitch embroidery on layered saris, depicting nature and mythology in vivid thread.",
  "Patachitra": "Scroll paintings in bold lines narrating folklore, executed by Chitrakar artists.",
  "Thangka paintings": "Buddhist scroll paintings on cotton, depicting deities with intricate gold detailing.",
  "Baluchari saree": "Silk sarees with Mughal-era court scenes woven directly into the pallu.",
  "Dokra": "Lost-wax cast metal figurines using a 4,000-year-old tribal technique.",
  "Terracotta": "Sun-baked clay art featuring intricate motifs on temple panels and household objects.",
  "Sholapith": "Lightweight pith-plant carvings of exquisite delicacy, used in ceremonial decor.",
};

export default function TraditionalCraftsSection({ crafts, accentColor }) {
  const [hoveredCraft, setHoveredCraft] = useState(null);

  if (!crafts || crafts.length === 0) return null;

  return (
    <motion.section
      className="mb-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
          <ShoppingBag className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Traditional Crafts</h2>
          <p className="text-xs font-body text-muted-foreground">Living art traditions passed through generations</p>
        </div>
        <div className="ml-auto h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, ${accentColor}40, transparent)` }} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {crafts.map((craft, i) => {
          const isHovered = hoveredCraft === craft;
          const desc = CRAFT_DESCRIPTIONS[craft];
          return (
            <motion.div
              key={craft}
              className="relative rounded-2xl overflow-hidden cursor-default group"
              style={{ aspectRatio: "3/4" }}
              onMouseEnter={() => setHoveredCraft(craft)}
              onMouseLeave={() => setHoveredCraft(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <img
                src={CRAFT_IMAGES[craft] || DEFAULT_CRAFT_IMGS[i % DEFAULT_CRAFT_IMGS.length]}
                alt={craft}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => { e.target.src = DEFAULT_CRAFT_IMGS[i % DEFAULT_CRAFT_IMGS.length]; }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Accent top strip */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
                style={{ backgroundColor: accentColor }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="font-heading text-sm font-semibold text-white leading-tight mb-1">{craft}</h4>
                <motion.p
                  className="font-body text-[10px] text-white/70 leading-relaxed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: isHovered && desc ? 1 : 0, height: isHovered && desc ? "auto" : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {desc}
                </motion.p>
              </div>

              {/* Sparkle badge */}
              {i === 0 && (
                <div
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${accentColor}90` }}
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
