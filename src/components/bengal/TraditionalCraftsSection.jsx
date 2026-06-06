import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";

const CRAFT_IMAGES = {
  // Clay / Terracotta
  "Terracotta": "https://theheritageartifacts.com/cdn/shop/files/DSC_2668_3240x4320.jpg?v=1696179943",
  "Bankura Horse": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Bishnupur_Terracotta_Horse_2.JPG",
  "Kumartuli idols": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Idol_of_Maa_Durga_at_Kumortuli.jpg",

  // Embroidery / Textile / Weaving
  "Kantha embroidery": "https://cdn.sanity.io/images/vk5tclvq/production/7f918afc808c71432211f6edbfbe11d4e0a37c78-2620x824.png?auto=format&q=40",
  "Baluchari saree": "https://onlinenaksha.com/wp-content/uploads/2021/03/IMG_20230702_131113.jpg",
  "Dhaniakhali sarees": "https://cpimg.tistatic.com/04718983/b/4/Dhaniakhali-Tant-Sarees.jpg",
  "Begampur weaving": "https://cdn.shopify.com/s/files/1/0387/7463/6683/files/aevum-the-revival-of-begampuri-sarees_2_600x600.jpg?v=1628539002",
  "Wool textiles": "https://textilesdirectorate.wb.gov.in/assets/THEME/default/images/about.jpg",
  "Carpets": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD8wF90yGGqbxr_XWW82ndurMdbWPmkyEZRMkmrXybq717UqSbzd--wk0&s",

  // Paintings / Scrolls
  "Patachitra": "https://collection.qagoma.qld.gov.au/index.php/system/files/styles/wide/private/object-images/PATACHITRA_CHITRAKAR.jpg?itok=joV6rmNe",
  "Thangka paintings": "https://india.norbulingka.org/cdn/shop/files/THPNBB018-1.webp?v=1724755158&width=1000",
  "Gambhira masks": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pvo47a3qRSMgx28-ttFi0JhnTmOFOHjh8Rajpl6tg39vk9Wo52Lc7B4&s",
  "Chhau masks": "https://www.zineart.in/images/c3.webp",

  // Metal / Brass
  "Dokra": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT5q7a0u8Beib5m3ViFshiiFnnFflU-q7FJMDFdrdI1NsmRklCly5TyDwjTnlWM",
  "Dokra metal craft": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT5q7a0u8Beib5m3ViFshiiFnnFflU-q7FJMDFdrdI1NsmRklCly5TyDwjTnlWM",
  "Brassware": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR3HfeYy-tJ1otdfVbXq1r7wxvXEuy0nZkcrRS4-qIwwM9NXyBm6un6xlC2YOvo",
  "Conch bangles": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSN4iHuVT2JvB5x5u4eOx9cMS6YgbdFwGO279dfItUeyLfyJW1h1qNdeXTsaoIu",

  // Wood
  "Wood carvings": "https://mashindia.com/wp-content/uploads/images/woodcraft-main-1-ss.jpg",
  "Wood carving": "https://mashindia.com/wp-content/uploads/images/woodcraft-main-1-ss.jpg",
  "Wooden dolls": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSHNPPvvw_8K4HbYAq9qrotCIR1vqNJkuSJ7wPamDy_6hEUaVwjdTM1jXOhznvE",
  "Sandalwood work": "https://www.ragaarts.com/cdn/shop/articles/sandal-elephant-blog.jpg?crop=center&height=900&v=1724132793&width=2400",

  // Plant-based / Fibre
  "Sholapith": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTTWvRSUbmECYQzcSuTnz2gsyeg60d-y0daV8wo9miyefBFrE2mU8ku9yCZgLeO",
  "Sholapith carving": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGIZa-HhNBYSiszCElTGLx9Ef7RQuL8k74LXdDjux5HQ&s",
  "Bamboo crafts": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR-WiPWdRvRps4fjWaZ1sBSKFFaiGUpD04Hoz7Gqe8uBNOm6SdNL_xXMdacfS-w",
  "Cane work": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7aQP51NwwYsJY6dXILBsknQjTJpXXsV2rMVyao9pmA&s",
  "Jute crafts": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSPNMQlsBFZCR0K9VScOzpm-3tlTk0Iqgc1CwOYxllJMiM5LLhkJTXcm2Uvmxwx",

  // Tribal / Mixed
  "Tribal crafts": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSWEKC4526pHQaJ0nPVOq7ah1dfUGUri1edP2Vrsr8bz_pYLxtNPakutHGibf9o",
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
