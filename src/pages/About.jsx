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
      title: "Wild-Harvested Integrity",
      desc: "Our botanicals are gathered according to traditional lunar cycles from fertile Himalayan and Western Ghat sanctuaries.",
    },
    {
      icon: Award,
      title: "Bio-Chromatographic Potency",
      desc: "Every tincture and oil is tested for peak active constituent density, certifying maximum rejuvenating potency.",
    },
    {
      icon: ShieldCheck,
      title: "Zero Synthetic Adulterants",
      desc: "We formulate strictly without parabens, sulfates, synthetic fragrances, micro-plastics, or artificial preservatives.",
    },
    {
      icon: Heart,
      title: "Generational Stewardship",
      desc: "Reinvesting directly into the indigenous farming guilds who have safeguarded sacred seed banks for centuries.",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-5xl space-y-20">
        {/* HERO / STORY INTRO */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <span className="luxury-pill mx-auto">
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>The Maison Heritage</span>
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight leading-tight">
            The Ancient Art of Living Well
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Founded on the conviction that sacred self-care is a profound ritual,
            Maison Luxe unites the purity of traditional Ayurvedic wisdom with the exacting
            refinement of modern luxury.
          </p>
        </div>

        {/* EDITORIAL STORY BANNER */}
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-champagne/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-secondary/50 via-background to-secondary/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
                Atelier Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground leading-snug">
                Alchemy Born of Patience & Purity
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In an era dominated by rapid synthetic production, we remain unapologetically deliberate. Our elixirs steep in copper vats for weeks; our cold-pressed extractions take days of gentle mechanical friction.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The result is a sensory experience of rare distinction: formulations that honor the skin's natural intelligence while uplifting spirit and mind.
              </p>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-champagne/30 shadow-xl aspect-square bg-secondary">
                <img
                  src="/new/hero/img1.png"
                  alt="Maison Story Formulation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOUR PILLARS */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="luxury-pill mb-2">Our Commitments</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Core Tenets of Our Atelier
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-border/50 hover:border-champagne/40 transition-all flex items-start space-x-4"
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
        <div className="text-center py-12 glass-panel rounded-3xl border border-champagne/30 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            Experience the Formulation
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Discover our seasonal reserves crafted to enrich your daily well-being.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-primary text-black font-bold text-xs uppercase tracking-wider hover:glow-on-hover transition-all shadow-xl"
            >
              <span>Explore Collections</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
