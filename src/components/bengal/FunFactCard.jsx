import React from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function FunFactCard({ fact, accentColor }) {
  return (
    <motion.div
      className="glass rounded-xl p-6 border-l-2"
      style={{ borderLeftColor: accentColor }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <Lightbulb className="w-4 h-4" style={{ color: accentColor }} />
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-2">Did You Know?</h4>
          <p className="text-sm font-body text-foreground/70 leading-relaxed">{fact}</p>
        </div>
      </div>
    </motion.div>
  );
}
