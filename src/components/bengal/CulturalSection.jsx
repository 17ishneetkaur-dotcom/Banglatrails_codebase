import React from "react";
import { motion } from "framer-motion";

export default function CulturalSection({ icon: Icon, title, items, accentColor, delay = 0 }) {
  return (
    <motion.div
      className="glass rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}18` }}
        >
          <Icon className="w-4 h-4" style={{ color: accentColor }} />
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
      </div>

      {Array.isArray(items) ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <motion.span
              key={i}
              className="text-xs font-body px-3 py-1.5 rounded-full bg-muted/60 text-foreground/70 hover:bg-muted transition-colors duration-300 cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + i * 0.05 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      ) : (
        <p className="text-sm font-body text-foreground/70 leading-relaxed">{items}</p>
      )}
    </motion.div>
  );
}
