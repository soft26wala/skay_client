import { useState, useEffect } from "react";
import { ShieldCheck, Leaf, Activity, Sparkles } from "lucide-react";
import { axiosInstance } from "../../lib/axios";

const defaultFeatures = [
  {
    id: "01",
    title: "Certified Organic Canadian Ingredients",
    subtitle: "100% Pure Botanical Purity",
    description:
      "Skay Products is good because we never compromise on ingredient integrity. Every formulation is made with 100% certified organic, ethically harvested Canadian and global botanicals. Free from harsh chemicals, synthetic fillers, parabens, and sulfates, our products deliver deep, gentle, and trustworthy nourishment for all skin types.",
    icon_name: "Leaf",
    image:
      "https://res.cloudinary.com/deuihz0dq/image/upload/v1793279789/SkayProducts_Web/skay_purity_1793279788398.jpg",
    isReverse: false,
  },
  {
    id: "02",
    title: "Clinical Precision & Cold-Pressed Potency",
    subtitle: "Scientifically Proven Efficacy",
    description:
      "Skay Products is good because of our advanced, scientifically backed extraction methods. While conventional heat processing destroys sensitive nutrients and enzymes, our signature cold-press extraction retains 100% active cellular vitamins and antioxidants, ensuring visible, long-lasting rejuvenation and vitality.",
    icon_name: "Activity",
    image:
      "https://res.cloudinary.com/deuihz0dq/image/upload/v1793279791/SkayProducts_Web/skay_science_1793279793366.jpg",
    isReverse: true,
  },
  {
    id: "03",
    title: "Handcrafted Small Batches in Protective Miron Glass",
    subtitle: "Artisanal Integrity & Freshness",
    description:
      "Skay Products is good because every single item is blended in small, handcrafted batches right here in Canada under strict quality standards. To guarantee maximum freshness and longevity, we house our formulations in biophotonic UV-filtering dark glass that shields delicate energetic botanical compounds from photodegradation.",
    icon_name: "ShieldCheck",
    image:
      "https://res.cloudinary.com/deuihz0dq/image/upload/v1793279793/SkayProducts_Web/skay_packaging_1793279795120.jpg",
    isReverse: false,
  },
];

const renderIcon = (name) => {
  switch (name) {
    case "Leaf":
      return <Leaf className="w-6 h-6 text-champagne" />;
    case "ShieldCheck":
      return <ShieldCheck className="w-6 h-6 text-champagne" />;
    case "Sparkles":
      return <Sparkles className="w-6 h-6 text-champagne" />;
    case "Activity":
    default:
      return <Activity className="w-6 h-6 text-champagne" />;
  }
};

const FeaturesSectionWay = () => {
  const [features, setFeatures] = useState(defaultFeatures);

  useEffect(() => {
    const fetchWhyChoose = async () => {
      try {
        const res = await axiosInstance.get("/web/why-choose");
        if (res.data?.features && res.data.features.length > 0) {
          const formatted = res.data.features.map((f, idx) => ({
            id: f.feature_number || `0${idx + 1}`,
            title: f.title,
            subtitle: f.subtitle || "Philosophy",
            description: f.description,
            icon_name: f.icon_name || "Activity",
            image: f.image || `/new/hero/downside/why_choose_${(idx % 3) + 1}.jpg`,
            isReverse: f.is_reverse === true || f.is_reverse === "true",
          }));
          setFeatures(formatted);
        }
      } catch (err) {
        console.warn("Using default why-choose fallback:", err.message);
      }
    };
    fetchWhyChoose();
  }, []);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto space-y-28">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="luxury-pill">
          <Sparkles className="w-3 h-3 text-champagne" />
          <span>The Skay Products Philosophy</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
          Why Choose Skay Products?
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
                {feature.icon || renderIcon(feature.icon_name)}
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
                  e.target.onerror = null;
                  e.target.src = `/new/hero/downside/why_choose_${parseInt(feature.id, 10) || 1}.jpg`;
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