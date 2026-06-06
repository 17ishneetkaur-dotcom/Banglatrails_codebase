import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";

const CRAFT_IMAGES = {
  // Clay / Terracotta
  "Terracotta": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
  "Bankura Horse": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
  "Kumartuli idols": "https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=400&q=80",

  // Embroidery / Textile / Weaving
  "Kantha embroidery": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80",
  "Baluchari saree": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
  "Dhaniakhali sarees": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
  "Begampur weaving": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80",
  "Wool textiles": "https://images.unsplash.com/photo-1576185850227-1f72b7f8d189?w=400&q=80",
  "Carpets": "https://images.unsplash.com/photo-1584893832960-f3c1be73b6f4?w=400&q=80",

  // Paintings / Scrolls
  "Patachitra": "https://images.unsplash.com/photo-1575223970966-76ae61ee7838?w=400&q=80",
  "Thangka paintings": "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&q=80",
  "Gambhira masks": "https://images.unsplash.com/photo-1547481887-a26e2cacb5b2?w=400&q=80",
  "Chhau masks": "https://images.unsplash.com/photo-1547481887-a26e2cacb5b2?w=400&q=80",

  // Metal / Brass
  "Dokra": "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&q=80",
  "Dokra metal craft": "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&q=80",
  "Brassware": "https://images.unsplash.com/photo-1583842761844-5f0f5b5e30bc?w=400&q=80",
  "Conch bangles": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",

  // Wood
  "Wood carvings": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80",
  "Wood carving": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80",
  "Wooden dolls": "https://images.unsplash.com/photo-1567942712661-82b9b407abbf?w=400&q=80",
  "Sandalwood work": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80",

  // Plant-based / Fibre
  "Sholapith": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80",
  "Sholapith carving": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80",
  "Bamboo crafts": "https://images.unsplash.com/photo-1545579645-aab15c3fef67?w=400&q=80",
  "Cane work": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80",
  "Jute crafts": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80",

  // Tribal / Mixed
  "Tribal crafts": "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&q=80",
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
  "Dokra metal craft": "Ancient lost-wax casting producing haunting metal forms used in tribal rituals.",
  "Terracotta": "Sun-baked clay art featuring intricate motifs on temple panels and household objects.",
  "Sholapith": "Lightweight pith-plant carvings of exquisite delicacy, used in ceremonial decor.",
  "Sholapith carving": "Intricate carvings from the spongy shola plant, adorning bridal headwear and deity displays.",
  "Kumartuli idols": "Handcrafted clay goddess idols made by master artisans in Kolkata's potter quarter.",
  "Carpets": "Hand-knotted Tibetan-style rugs with bold geometric and floral patterns.",
  "Wool textiles": "Handwoven hill fabrics using local wool in earthy tones for warmth and beauty.",
  "Wood carvings": "Intricate carved decorations on prayer items, furniture, and household objects.",
  "Bamboo crafts": "Durable everyday items — baskets, mats, furniture — woven from locally harvested bamboo.",
  "Dhaniakhali sarees": "Fine cotton sarees with delicate borders, woven in the villages of Hooghly.",
  "Begampur weaving": "Lightweight cotton weaves with distinctive checks and stripes from the Hooghly belt.",
  "Brassware": "Ornamental and functional brass vessels crafted with repoussé and engraving techniques.",
  "Sandalwood work": "Delicately carved sandalwood figurines and prayer items with a lingering fragrance.",
  "Chhau masks": "Dramatically painted papier-mâché masks for the Chhau dance, each face a mythic character.",
  "Tribal crafts": "Indigenous handmade art using natural materials — beads, grass, clay, and bark.",
  "Cane work": "Flexible cane woven into baskets, trays, and decorative panels by tribal artisans.",
  "Wood carving": "Temple-inspired carved wooden panels and figurines, a tradition from Bengal's medieval past.",
  "Gambhira masks": "Large papier-mâché masks used in the Gambhira folk theatre of Malda.",
  "Conch bangles": "White conch-shell bangles (shankha) — a sacred symbol worn by Bengali brides.",
  "Jute crafts": "Eco-friendly bags, wall hangings, and art made from Bengal's golden fibre.",
  "Wooden dolls": "Brightly painted wooden toys and deity dolls, a cottage industry of the Bardhaman belt.",
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
