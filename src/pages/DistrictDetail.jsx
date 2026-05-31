import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getDistrictById } from "../data/districts";
import Navbar from "../components/bengal/Navbar";
import Footer from "../components/bengal/Footer";
import DistrictHero from "../components/bengal/DistrictHero";
import CulturalSection from "../components/bengal/CulturalSection";
import FunFactCard from "../components/bengal/FunFactCard";
import SimilarDistricts from "../components/bengal/SimilarDistricts";
import HeritageSitesSection from "../components/bengal/HeritageSitesSection";
import LocalCuisineSection from "../components/bengal/LocalCuisineSection";
import TraditionalCraftsSection from "../components/bengal/TraditionalCraftsSection";
import { Music, Shirt, PartyPopper, TreePine, BookOpen } from "lucide-react";

export default function DistrictDetail() {
  const { id } = useParams();
  const district = getDistrictById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!district) return <Navigate to="/" replace />;

  const culturalSections = [
    { icon: BookOpen, title: "Cultural Narrative", items: district.description, delay: 0 },
    { icon: Music, title: "Folk Music & Songs", items: district.folkMusic, delay: 0.05 },
    { icon: Shirt, title: "Traditional Clothing", items: district.clothing, delay: 0.1 },
    { icon: PartyPopper, title: "Festivals & Fairs", items: [...(district.festivals || []), ...(district.fairs || [])], delay: 0.15 },
    { icon: BookOpen, title: "Literary & Artistic Heritage", items: district.literary, delay: 0.2 },
    { icon: TreePine, title: "Nature & Landscape", items: district.nature, delay: 0.25 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <DistrictHero district={district} />

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">

          <FunFactCard fact={district.funFact} accentColor={district.accentColor} />

          <div className="flex items-center gap-4 my-10">
            <div className="h-px flex-1 bg-border/30" />
            <span className="text-[10px] tracking-[0.35em] uppercase font-body text-muted-foreground/40">
              Cultural Heritage
            </span>
            <div className="h-px flex-1 bg-border/30" />
          </div>

          <HeritageSitesSection places={district.historicalPlaces} accentColor={district.accentColor} districtName={district.name} />
          <LocalCuisineSection food={district.food} accentColor={district.accentColor} />
          <TraditionalCraftsSection crafts={district.crafts} accentColor={district.accentColor} />

          <div className="flex items-center gap-4 my-10">
            <div className="h-px flex-1 bg-border/30" />
            <span className="text-[10px] tracking-[0.35em] uppercase font-body text-muted-foreground/40">
              More Culture
            </span>
            <div className="h-px flex-1 bg-border/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {culturalSections.map((section, i) => (
              <CulturalSection
                key={i}
                icon={section.icon}
                title={section.title}
                items={section.items}
                accentColor={district.accentColor}
                delay={section.delay}
              />
            ))}
          </div>
        </div>
      </section>

      <SimilarDistricts currentId={district.id} moodTags={district.moodTags} />
      <Footer />
    </div>
  );
}
