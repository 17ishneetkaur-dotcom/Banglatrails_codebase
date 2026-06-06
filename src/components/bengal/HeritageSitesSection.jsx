import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, ChevronDown, Sparkles, Loader2, BookOpen } from "lucide-react";
import { base44 } from "@/api/base44Client";

const SITE_IMAGES = {
  // Kolkata
  "Victoria Memorial": "https://plus.unsplash.com/premium_photo-1697730414399-3d4d9ada98bd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Howrah Bridge": "https://plus.unsplash.com/premium_photo-1697729933655-7429371661de?q=80&w=1243&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Indian Museum": "https://indianmuseumkolkata.org/im_cont/uploads/2021/11/b1_1_1-1200x544.png",
  "Marble Palace": "https://www.cbnme.com/wp-content/uploads/2023/06/THE-MARBLE-PALACE-1.jpg",
  "St. Paul's Cathedral": "https://choosewhere.com/public/images/g1RlaKv/crop_and_zoom_1696x1120_0x7_2000x1320/shutterstock_2495913789.webp",
  // Darjeeling
  "Toy Train (UNESCO)": "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201907/toy_train.jpeg?VersionId=R04LetTvtTlShk4l4ZCdawU0ycqkOVDV&size=690:388",
  "Himalayan Mountaineering Institute": "https://content.jdmagicbox.com/comp/darjeeling/w3/9999px354.x354.111010102904.t1w3/catalogue/himalayan-mountaineering-institute-darjeeling-ho-darjeeling-tourist-attraction-vlsampu.jpg",
  "Chowrasta": "https://www.darjeeling-tourism.com/darj_i000929.jpg",
  // Birbhum
  "Santiniketan (Visva Bharati)": "https://pragmaticpersona.com/wp-content/uploads/2025/04/wp-17457305751074238630723698766921.jpg?w=1440",
  "Tarapith": "https://upload.wikimedia.org/wikipedia/commons/3/36/Maa_Tara_Temple.jpg",
  "Bakreshwar": "https://www.pilgrimaide.com/image/cache/catalog/Blogs/Bakreshwar%20Devi%20Temple-2120x800w.jpg",
  "Amkhoi Fossil Park": "https://static2.tripoto.com/media/filter/nl/img/45595/TripDocument/1519756209_dsc08664.jpg",
  // Hooghly
  "Bandel Church": "https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?w=600&q=80",
  "Hooghly Imambara": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
  "Chandannagar": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
  "Serampore": "https://images.unsplash.com/photo-1612722432474-b971cdcea546?w=600&q=80",
  // Bankura
  "Bishnupur Temples": "https://images.unsplash.com/photo-1548013146-72c4f3e24e5f?w=600&q=80",
  "Susunia Hills": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
  // Murshidabad
  "Hazarduari Palace": "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600&q=80",
  "Katra Masjid": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
  "Imambara": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&q=80",
  "Khushbagh": "https://images.unsplash.com/photo-1600585152915-d92de998cccb?w=600&q=80",
  // Purulia
  "Garpanchkot": "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=600&q=80",
  "Deulghata": "https://images.unsplash.com/photo-1548013146-72c4f3e24e5f?w=600&q=80",
  "Pakbirra": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&q=80",
  // Malda
  "Gour": "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&q=80",
  "Pandua": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
  "Adina Mosque": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
  "Eklakhi Mausoleum": "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600&q=80",
  // Howrah
  "Belur Math": "https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=600&q=80",
  "Botanical Garden": "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
  // Paschim Bardhaman
  "Churulia": "https://images.unsplash.com/photo-1591702386139-a2e0b4d83c84?w=600&q=80",
  "Ichhai Ghosher Deul": "https://images.unsplash.com/photo-1548013146-72c4f3e24e5f?w=600&q=80",
  "Garh Jungle": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
};

const DEFAULT_IMGS = [
  "https://images.unsplash.com/photo-1548013146-72c4f3e24e5f?w=600&q=80",
  "https://images.unsplash.com/photo-1591559424919-c86999049189?w=600&q=80",
  "https://images.unsplash.com/photo-1597685054322-a1ad3f4d80c9?w=600&q=80",
  "https://images.unsplash.com/photo-1565814636919-753ea631b429?w=600&q=80",
  "https://images.unsplash.com/photo-1600585152915-d92de998cccb?w=600&q=80",
];

export default function HeritageSitesSection({ places, accentColor, districtName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [story, setStory] = useState("");
  const [loadingStory, setLoadingStory] = useState(false);
  const [storyFor, setStoryFor] = useState(null);

  const handleDiscoverStory = async () => {
    const site = places[activeIndex];
    if (loadingStory) return;
    setLoadingStory(true);
    setStory("");
    setStoryFor(site);
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a cinematic storyteller specializing in Bengal's history and folklore.
Write a vivid, immersive 3-4 sentence narrative about "${site}" in ${districtName || "West Bengal"}.
Weave together its historical significance, local legends, and the atmosphere of the place.
Use poetic, evocative language — like a passage from a literary travel memoir. No bullet points, just pure storytelling prose.`,
    });
    setStory(result);
    setLoadingStory(false);
  };

  // Reset story when site changes
  const handleSetIndex = (i) => {
    setActiveIndex(i);
    if (storyFor !== places[i]) setStory("");
  };

  if (!places || places.length === 0) return null;

  return (
    <motion.section
      className="mb-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
          <Landmark className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Heritage Sites</h2>
          <p className="text-xs font-body text-muted-foreground">Landmarks that shaped this region's history</p>
        </div>
        <div className="ml-auto h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, ${accentColor}40, transparent)` }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Featured large card */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="relative rounded-2xl overflow-hidden h-64 md:h-80 cursor-pointer group"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={SITE_IMAGES[places[activeIndex]] || DEFAULT_IMGS[activeIndex % DEFAULT_IMGS.length]}
                alt={places[activeIndex]}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.target.src = DEFAULT_IMGS[activeIndex % DEFAULT_IMGS.length]; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span
                  className="text-[10px] tracking-widest uppercase font-body mb-1 block"
                  style={{ color: accentColor }}
                >
                  Featured Heritage Site
                </span>
                <h3 className="font-heading text-xl font-bold text-white">{places[activeIndex]}</h3>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Discover Story button */}
          <button
            onClick={handleDiscoverStory}
            disabled={loadingStory}
            className="mt-3 w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-body text-sm tracking-wide transition-all duration-300 disabled:opacity-50"
            style={{
              border: `1px solid ${accentColor}35`,
              backgroundColor: `${accentColor}10`,
              color: accentColor,
            }}
          >
            {loadingStory ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Weaving the story…</>
            ) : (
              <><Sparkles className="w-3.5 h-3.5" /> Discover Story</>
            )}
          </button>

          {/* AI Story panel */}
          <AnimatePresence>
            {story && (
              <motion.div
                className="mt-3 rounded-xl p-5 relative overflow-hidden"
                style={{ backgroundColor: `${accentColor}08`, border: `1px solid ${accentColor}25` }}
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Decorative quote mark */}
                <div className="absolute top-3 right-4 font-heading text-5xl leading-none opacity-10 select-none" style={{ color: accentColor }}>"</div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-3.5 h-3.5" style={{ color: accentColor }} />
                  <span className="text-[10px] tracking-[0.3em] uppercase font-body font-medium" style={{ color: accentColor }}>
                    The Story of {storyFor}
                  </span>
                </div>
                <p className="font-heading text-sm italic text-foreground/80 leading-relaxed">
                  {story}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Vertical list */}
        <div className="flex flex-col gap-2">
          {places.map((place, i) => (
            <motion.button
              key={place}
              onClick={() => handleSetIndex(i)}
              className="w-full text-left px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 flex items-center gap-3"
              style={{
                backgroundColor: i === activeIndex ? `${accentColor}18` : "transparent",
                border: `1px solid ${i === activeIndex ? accentColor + "50" : "hsl(var(--border))"}`,
                color: i === activeIndex ? accentColor : "hsl(var(--foreground) / 0.7)",
              }}
              whileHover={{ x: 2 }}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            >
              <Landmark className="w-3.5 h-3.5 shrink-0 opacity-60" />
              <span className="truncate">{place}</span>
              {i === activeIndex && <ChevronDown className="w-3 h-3 ml-auto rotate-[-90deg]" />}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
