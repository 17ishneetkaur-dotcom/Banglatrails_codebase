import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { districts } from "../../data/districts";
import { ArrowUpRight } from "lucide-react";

export default function SimilarDistricts({ currentId, moodTags }) {
  const navigate = useNavigate();

  const similar = districts
    .filter(d => d.id !== currentId)
    .map(d => ({
      ...d,
      matchScore: d.moodTags.filter(t => moodTags.includes(t)).length,
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-primary/60 font-body mb-2 block">
            Continue Exploring
          </span>
          <h3 className="font-heading text-2xl font-bold text-foreground">
            Similar Cultural Destinations
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {similar.map((d, i) => (
            <motion.div
              key={d.id}
              className="group glass rounded-xl p-5 cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              onClick={() => navigate(`/district/${d.id}`)}
            >
              <div
                className="h-0.5 w-8 rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: d.accentColor }}
              />
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {d.name}
                  </h4>
                  <p className="text-xs font-heading italic text-muted-foreground mt-0.5">{d.subtitle}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all duration-300" />
              </div>
              <div className="flex gap-1 mt-3">
                {d.moodTags.map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground font-body capitalize">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
