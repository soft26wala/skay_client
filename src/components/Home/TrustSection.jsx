import { Sparkles, ShieldCheck, Award, HeartHandshake } from "lucide-react";

const TrustSection = ({ dimg, dname, title, dexperience, reverse }) => {
  const defaultTitle = "The Maison Heritage & Formulation Oath";
  const defaultExperience =
    "Under the guidance of master herbal alchemists, each batch is formulated with reverence to ancient Ayurvedic canons and modern bio-availability standards. Every element is harvested with sustainable stewardship.";

  const pillars = [
    {
      icon: Award,
      title: "Sacred Single-Origin Botanicals",
      desc: "Pure herbal extracts harvested at peak astronomical potency from native fertile soils.",
    },
    {
      icon: ShieldCheck,
      title: "Triple-Verified Lab Precision",
      desc: "Every formulation undergoes rigorous spectral testing to certify zero heavy metals or synthetic fillers.",
    },
    {
      icon: HeartHandshake,
      title: "Ethical Fair-Trade Atelier",
      desc: "Direct sustainable partnerships with generational grower families, honoring cultural heritage.",
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="glass-panel p-8 sm:p-12 md:p-16 border border-champagne/30 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-champagne/10 rounded-full blur-3xl pointer-events-none" />

        <div
          className={`flex flex-col md:flex-row items-center gap-10 md:gap-14 ${
            reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Visual Showcase */}
          <div className="flex-shrink-0 w-full md:w-5/12 text-center">
            <div className="relative inline-block max-w-xs md:max-w-none">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-champagne/40 to-champagne/10 blur-xl opacity-60" />
              <img
                src={dimg || "/new/hero/trust/trust.png"}
                alt={dname || "Master Formulator"}
                className="relative rounded-2xl shadow-2xl w-full max-h-[380px] object-cover border border-champagne/30"
                onError={(e) => {
                  e.target.src = "/demo/trust-default.jpg";
                }}
              />
              <div className="absolute -bottom-4 -right-4 px-4 py-2.5 rounded-xl bg-background/95 border border-champagne/40 shadow-xl backdrop-blur-md">
                <span className="text-xs font-serif font-bold text-champagne block">
                  100% Certified
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Pure Alchemy
                </span>
              </div>
            </div>
          </div>

          {/* Text & Commitments */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <span className="luxury-pill">
                <Sparkles className="w-3 h-3 text-champagne" />
                <span>Master Atelier Stewardship</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight">
                {title || defaultTitle}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {dexperience || defaultExperience}
            </p>

            <div className="grid grid-cols-1 gap-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-secondary/40 border border-border/50 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-champagne/15 border border-champagne/30 flex items-center justify-center text-champagne flex-shrink-0 mt-0.5">
                    <pillar.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;