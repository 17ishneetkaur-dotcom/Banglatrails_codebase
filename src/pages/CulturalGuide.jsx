import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, MapPin, Loader2 } from "lucide-react";
import { districts } from "../data/districts";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/bengal/Navbar";
import Footer from "../components/bengal/Footer";

const MOOD_FILTERS = [
  "all",
  "spiritual",
  "historical",
  "artistic",
  "festive",
  "nature",
];

export default function CulturalGuide() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeMood, setActiveMood] = useState("all");

  const navigate = useNavigate();

  const filteredDistricts =
    activeMood === "all"
      ? districts
      : districts.filter((d) => d.moodTags.includes(activeMood));

  const handleAsk = async () => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setResponse("");

    try {
      const districtSummaries = districts
        .map(
          (d) =>
            `${d.name}: ${d.subtitle}. Food: ${d.food.join(
              ", "
            )}. Festivals: ${d.festivals.join(
              ", "
            )}. Landmarks: ${d.historicalPlaces.join(
              ", "
            )}. Nature: ${d.nature.join(
              ", "
            )}. Crafts: ${d.crafts.join(", ")}.`
        )
        .join("\n");

      const res = await fetch("/api/cultural-guide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
You are BanglaTrails Cultural Guide — an expert on West Bengal's heritage, culture, food, festivals, and travel.

Here is information about 10 districts of West Bengal:

${districtSummaries}

User Question:
${query}

Provide a warm, informative, and culturally rich answer in 3-5 sentences.
Recommend specific districts when relevant.
Be poetic but factual.
Use a storytelling tone.
`,
        }),
      });

      const data = await res.json();

      setResponse(data.text || "No response received.");
    } catch (error) {
      console.error(error);
      setResponse("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-body">
                AI-Powered
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-3">
              Cultural Guide
            </h1>

            <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
              Ask anything about Bengal's heritage, food, festivals, or travel
              — get personalized cultural insights.
            </p>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                placeholder="e.g. Where can I experience tribal dance in Bengal?"
                className="flex-1 bg-muted/40 border border-border/50 rounded-xl px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors"
              />

              <button
                onClick={handleAsk}
                disabled={isLoading || !query.trim()}
                className="px-5 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>

            <AnimatePresence>
              {response && (
                <motion.div
                  className="mt-5 p-5 rounded-xl bg-muted/30 border border-border/30"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-body font-medium text-accent">
                      Cultural Guide
                    </span>
                  </div>

                  <p className="text-sm font-body text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {response}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
              Browse by Mood
            </h3>

            <div className="flex flex-wrap gap-2">
              {MOOD_FILTERS.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setActiveMood(mood)}
                  className={`text-xs font-body px-4 py-2 rounded-full border capitalize transition-all duration-300 ${
                    activeMood === mood
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredDistricts.map((d, i) => (
              <motion.div
                key={d.id}
                className="group glass rounded-xl p-5 cursor-pointer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                onClick={() => navigate(`/district/${d.id}`)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${d.accentColor}15`,
                    }}
                  >
                    <MapPin
                      className="w-3.5 h-3.5"
                      style={{ color: d.accentColor }}
                    />
                  </div>

                  <div>
                    <h4 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {d.name}
                    </h4>

                    <p className="text-xs font-body text-muted-foreground mt-0.5 line-clamp-2">
                      {d.tagline}
                    </p>

                    <div className="flex gap-1 mt-2">
                      {d.moodTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground font-body capitalize"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
