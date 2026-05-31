import React from "react";
import { MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-primary/60" />
            <span className="font-heading text-lg font-semibold text-foreground/80">BanglaTrails</span>
          </div>
          <p className="text-xs text-muted-foreground/50 font-body text-center">
            A cultural atlas celebrating the heritage and diversity of West Bengal, India
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/40 font-body">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-primary/50 fill-primary/50" />
            <span>for Bengal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
