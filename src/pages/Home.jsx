import React, { useRef } from "react";
import HeroSection from "../components/bengal/HeroSection";
import BengalMap from "../components/bengal/BengalMap";
import DistrictGrid from "../components/bengal/DistrictGrid";
import Navbar from "../components/bengal/Navbar";
import Footer from "../components/bengal/Footer";

export default function Home() {
  const mapRef = useRef(null);

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection onExplore={scrollToMap} />
      <div ref={mapRef}>
        <BengalMap />
      </div>
      <DistrictGrid />
      <Footer />
    </div>
  );
}
