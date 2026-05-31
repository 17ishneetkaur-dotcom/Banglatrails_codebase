import React from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Flame } from "lucide-react";

const DISH_EMOJIS = {
  "Phuchka": "🫧", "Kathi Roll": "🌯", "Mughlai Paratha": "🫓",
  "Mishti Doi": "🍮", "Momos": "🥟", "Thukpa": "🍜",
  "Darjeeling Tea": "🍵", "Sitabhog": "🍬", "Mihidana": "🟡",
  "Aloo Posto": "🥔", "Rezala": "🍖", "Sandesh": "🧁",
};

const PALETTE = [
  "from-orange-900/30 to-amber-900/20",
  "from-red-900/30 to-orange-900/20",
  "from-amber-900/30 to-yellow-900/20",
  "from-yellow-900/30 to-lime-900/20",
  "from-rose-900/30 to-pink-900/20",
];

export default function LocalCuisineSection({ food, accentColor }) {
  if (!food || food.length === 0) return null;

  const featured = food.slice(0, 3);
  const rest = food.slice(3);

  return (
    <motion.section
      className="mb-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
          <UtensilsCrossed className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Local Cuisine</h2>
          <p className="text-xs font-body text-muted-foreground">Flavours that define this land</p>
        </div>
        <div className="ml-auto h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, ${accentColor}40, transparent)` }} />
      </div>

      {/* Featured dish cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {featured.map((dish, i) => (
          <motion.div
            key={dish}
            className={`relative rounded-2xl p-5 bg-gradient-to-br ${PALETTE[i % PALETTE.length]} border border-border/40 overflow-hidden group`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -3 }}
          >
            <div className="text-4xl mb-3">{DISH_EMOJIS[dish] || "🍽️"}</div>
            <h4 className="font-heading text-base font-semibold text-foreground mb-1">{dish}</h4>
            <div className="flex items-center gap-1 mt-2">
              {i === 0 && (
                <span className="flex items-center gap-1 text-[10px] font-body px-2 py-0.5 rounded-full" style={{ backgroundColor: `${accentColor}25`, color: accentColor }}>
                  <Flame className="w-2.5 h-2.5" /> Must Try
                </span>
              )}
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: accentColor }}
            />
          </motion.div>
        ))}
      </div>

      {/* Remaining dishes as tags */}
      {rest.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {rest.map((dish, i) => (
            <motion.span
              key={dish}
              className="text-xs font-body px-3 py-1.5 rounded-full bg-muted/50 text-foreground/70 hover:bg-muted transition-colors duration-300 flex items-center gap-1.5 cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <span>{DISH_EMOJIS[dish] || "🍽️"}</span>
              {dish}
            </motion.span>
          ))}
        </div>
      )}
    </motion.section>
  );
}
