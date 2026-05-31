import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Compass, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2.5 group">
          <MapPin className="w-4 h-4 text-primary group-hover:text-accent transition-colors duration-300" />
          <span className="font-heading text-lg font-bold text-foreground/90">BanglaTrails</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-xs font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 hidden sm:block"
          >
            Home
          </Link>
          <Link
            to="/guide"
            className="flex items-center gap-1.5 text-xs font-body tracking-wide px-4 py-1.5 rounded-full border border-primary/20 text-primary/80 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
          >
            <Sparkles className="w-3 h-3" />
            Cultural Guide
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
