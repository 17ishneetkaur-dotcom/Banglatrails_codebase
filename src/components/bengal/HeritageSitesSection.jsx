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
  "Bandel Church": "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/01/31163431/267.jpg?fm=webp&w=750&h=500&dpr=2",
  "Hooghly Imambara": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGR8Q5i0EGekMn8wHuAebSuFvgRi5vEYS1qLlxEeShO81JInVuiCuSukpJEZyVu4zGCXBMozuSvNcTN0bW1px9cmE1vJq1rX2AhHeNeiCekJd3pvfSsCBaBj-nITLBwYfv8qJdj8_xV67ln=w270-h312-n-k-no",
  "Chandannagar": "https://kinjalbose.com/wp-content/uploads/2020/04/5ee5b-img_5645.jpg?w=1440&h=890&crop=1",
  "Serampore": "https://upload.wikimedia.org/wikipedia/commons/2/22/Serampore_College_-_Hooghly_2017-07-06_0578.JPG?utm_source=en.wikivoyage.org&utm_campaign=index&utm_content=original",
  // Bankura
  "Bishnupur Temples": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Jod_Bangla_Terracotta_Temple%2C_Bishnupur%2C_West_Bengal.jpg",
  "Susunia Hills": "https://bankuratourism.com/wp-content/uploads/2023/07/Susunia-Hill6-1024x603.jpg.webp",
  // Murshidabad
  "Hazarduari Palace": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Hazarduari01_debaditya_chatterjee.jpg",
  "Katra Masjid": "https://d34vm3j4h7f97z.cloudfront.net/original/4X/0/d/c/0dc4819f4d56dc5b29442aa15937da034fb4d119.jpeg",
  "Imambara": "https://kevinstandagephotography.wordpress.com/wp-content/uploads/2024/01/cover3.jpg",
  "Khushbagh": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Khushbagh_-_Murshidabad_-_West_Bengal.jpg",
  // Purulia
  "Garpanchkot": "https://www.nomadicweekends.com/wp-content/uploads/2018/02/Dreamy-Garpanchkot-Tent-House.jpg",
  "Deulghata": "https://upload.wikimedia.org/wikipedia/commons/1/18/Deuls_of_Deulghata_in_Purulia._04.jpg",
  "Pakbirra": "https://upload.wikimedia.org/wikipedia/commons/5/56/Pakbirra_Jain_Shrine_of_Purulia_03_%28cropped%29.jpg",
  // Malda
  "Gour": "https://upload.wikimedia.org/wikipedia/commons/5/57/Dakhil_Darwaza_2%2C_Malda.jpg?utm_source=en.wikivoyage.org&utm_campaign=index&utm_content=original",
  "Pandua": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Adina_Mosque_at_Malda_district_of_West_Bengal_04.jpg",
  "Adina Mosque": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Adina_Mosque_at_Malda_district_of_West_Bengal_04.jpg",
  "Eklakhi Mausoleum": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Eklakhi_Mausoleum.jpg",
  // Howrah
  "Belur Math": "https://advaitaashrama.org/wp-content/uploads/belur-math-universal-temple.jpg",
  "Botanical Garden": "https://static.toiimg.com/thumb/msid-29663450,width-550,height-433/29663450.jpg",
  // Paschim Bardhaman
  "Churulia": "https://res.cloudinary.com/dxxs0mkei/image/upload/f_auto,q_auto,w_800,h_800,c_fill,g_auto/v1776946997/my-state-guide/states/west-bengal/districts/paschim-bardhaman-dist.webp",
  "Ichhai Ghosher Deul": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Temple_of_Ichai_Ghosh.jpg",
  "Garh Jungle": "https://holaciti.com/assets/place/1764505046place.webp",
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
