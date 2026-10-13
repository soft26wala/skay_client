import { ShieldCheck, Leaf, Activity, Sparkles } from "lucide-react";

const FeaturesSectionWay = () => {
  const features = [
    {
      id: "01",
      title: "Generational Botanical Wisdom & Modern Alchemy",
      subtitle: "Vedic Formulations Reimagined",
      description:
        "Every preparation originates from century-old classical texts, harmoniously refined using state-of-the-art chromatographic extraction for unmatched cellular bioavailability.",
      icon: <Activity className="w-6 h-6 text-champagne" />,
      image: "/new/hero/downside/des.png",
      isReverse: false,
    },
    {
      id: "02",
      title: "Single-Origin Sacred Harvests & Cold-Pressed Purity",
      subtitle: "Peak Astronomical Potency",
      description:
        "Our botanicals are hand-harvested at peak seasonal potency from certified sustainable estates. We never subject our herbs to aggressive heat or chemical solvents.",
      icon: <Leaf className="w-6 h-6 text-champagne" />,
      image: "/new/hero/downside/code.jfif",
      isReverse: true,
    },
    {
      id: "03",
      title: "Protective Miron Glass & Concierge Atelier Care",
      subtitle: "Uncompromising Preservation",
      description:
        "Encased in dark biophotonic glass containers to shield delicate energetic compounds from photodegradation. Hand-checked and sealed with our signature gold seal.",
      icon: <ShieldCheck className="w-6 h-6 text-champagne" />,
      image: "/new/hero/downside/deploy.jfif",
      isReverse: false,
    },
  ];

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto space-y-28">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="luxury-pill">
          <Sparkles className="w-3 h-3 text-champagne" />
          <span>The Maison Philosophy</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
          Why Choose Maison Luxe?
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-champagne tracking-[0.2em] uppercase">
          Artisanal Mastery • Clinical Precision • Sacred Purity
        </p>
      </div>

      {features.map((feature) => (
        <div
          key={feature.id}
          className={`flex flex-col ${
            feature.isReverse ? "md:flex-row-reverse" : "md:flex-row"
          } items-center gap-12 lg:gap-16`}
        >
          {/* TEXT CONTENT */}
          <div className="flex-1 space-y-6">
            <span className="text-7xl sm:text-8xl font-serif font-bold text-champagne/15 block leading-none">
              {feature.id}
            </span>

            <div className="space-y-2">
              <h4 className="text-champagne font-bold tracking-[0.2em] text-xs uppercase">
                {feature.subtitle}
              </h4>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight">
                {feature.title}
              </h3>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
              {feature.description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="p-3 rounded-xl bg-champagne/10 border border-champagne/30">
                {feature.icon}
              </div>
              <span className="text-xs font-bold tracking-wider uppercase text-foreground">
                Verified Atelier Standard
              </span>
            </div>
          </div>

          {/* VISUAL / IMAGE */}
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-champagne/15 blur-[90px] rounded-full pointer-events-none" />
            <div className="relative z-10 glass-card p-4 sm:p-6 rounded-3xl border border-champagne/30 shadow-2xl overflow-hidden">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-auto max-h-[420px] object-cover rounded-2xl animate-float drop-shadow-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeaturesSectionWay;