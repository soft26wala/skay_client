import { useEffect } from "react";
import { Sparkles, Award, ShieldCheck, Heart, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const values = [
    {
      icon: Leaf,
      title: "Thoughtful Materials",
      desc: "We prioritize durable, safe, and quality materials designed to last and perform reliably in everyday home life.",
    },
    {
      icon: Award,
      title: "Quality & Durability",
      desc: "Every household product is tested for practical everyday use, durability, and reliable comfort.",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Family-Friendly",
      desc: "We curate essentials with non-toxic, clean, and family-safe standards so you can shop with complete peace of mind.",
    },
    {
      icon: Heart,
      title: "Customer Satisfaction",
      desc: "Your home happiness is our top priority. We offer dedicated customer care and prompt support for every order.",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-5xl space-y-20">
        {/* HERO / STORY INTRO */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <span className="luxury-pill mx-auto">
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>About sKay Products</span>
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight leading-tight">
            Everyday Comfort & Modern Living
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Founded on the belief that home should be a welcoming sanctuary, sKay Products
            curates timeless household essentials crafted to bring beauty, order, and everyday warmth into your living spaces.
          </p>
        </div>

        {/* EDITORIAL STORY BANNER */}
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-border/70 shadow-xl relative overflow-hidden bg-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
                Our Story & Vision
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground leading-snug">
                Designed for Comfort, Built for Daily Life
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe that the little things in your home make the biggest difference. From kitchen essentials to cozy living accents, each product is selected for its thoughtful functionality and warm, understated elegance.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our mission is to help you create spaces that feel calm, organized, and effortlessly stylish—every single day.
              </p>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-border/70 shadow-xl aspect-square bg-secondary">
                <img
                  src="/new/hero/img1.png"
                  alt="sKay Products Living"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOUR PILLARS */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="luxury-pill mb-2">Our Values</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-border/60 hover:border-champagne/40 transition-all flex items-start space-x-4 bg-card"
              >
                <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne flex-shrink-0">
                  <v.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-foreground mb-1">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 glass-panel rounded-3xl border border-border/70 space-y-4 bg-card">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            Explore Our Collection
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Discover quality household essentials crafted to enrich your daily home routine.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-primary text-black font-bold text-xs uppercase tracking-wider hover:glow-on-hover transition-all shadow-md"
            >
              <span>Shop All Products</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
