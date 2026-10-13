import { useEffect } from "react";
import { FileText, Sparkles, ShieldCheck, Scale, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const sections = [
    {
      icon: Scale,
      title: "Agreement of Client Engagement",
      desc: "By accessing Maison Luxe, exploring our catalog, and placing orders, you agree to be bound by these Terms of Acquisition and all associated atelier policies.",
    },
    {
      icon: AlertCircle,
      title: "Botanical Formulation & Wellness Notice",
      desc: "Our artisanal herbal preparations are formulated for general holistic wellness and lifestyle enhancement. They do not constitute a substitute for diagnosis, treatment, or advice from licensed medical practitioners.",
    },
    {
      icon: ShieldCheck,
      title: "Order Acceptance & Inventory Allocation",
      desc: "All acquisitions remain subject to small-batch availability. In rare instances where an item cannot be fulfilled due to seasonal harvest limitations, a full refund will be promptly issued.",
    },
    {
      icon: FileText,
      title: "Pricing, Currency & Taxes",
      desc: "All monetary values are denominated in Indian Rupees (INR) and are inclusive of standard applicable GST and statutory levies as calculated at checkout.",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="luxury-pill mx-auto">
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>Legal Agreement</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
            Terms of Service & Acquisition
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The legal framework governing acquisitions, usage, and client responsibilities at Maison Luxe.
          </p>
        </div>

        {/* Content Box */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-champagne/25 shadow-xl space-y-8">
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Welcome to Maison Luxe. These terms govern your rights and obligations when interacting with our online boutique, communicating with our concierge, or commissioning artisanal formulations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((item, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl border border-border/50 hover:border-champagne/40 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-border/40 text-center space-y-3">
            <p className="text-xs text-muted-foreground">
              For legal inquiries or contractual clarifications, please reach our legal advisory desk:
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-primary text-black font-bold text-xs uppercase tracking-wider hover:glow-on-hover transition-all"
            >
              <span>Contact Legal Advisory</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
