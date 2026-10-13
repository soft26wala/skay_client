import { useEffect } from "react";
import { RotateCcw, ShieldCheck, AlertCircle, PackageCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function NoReturnPolicy() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const sections = [
    {
      icon: ShieldCheck,
      title: "Hygiene & Botanical Integrity Standard",
      desc: "Due to the intimate, botanical, and therapeutic nature of our formulations, we maintain a strict No Return Policy once a package has been accepted at the recipient address.",
    },
    {
      icon: AlertCircle,
      title: "Transit Damage or Discrepancy",
      desc: "If your delivery arrives compromised, unsealed, or inconsistent with your order dossier, notify our concierge desk within 24 hours of delivery with photographic evidence.",
    },
    {
      icon: PackageCheck,
      title: "Complimentary Replacement Guarantee",
      desc: "Following verification by our atelier quality team, damaged or erroneous items will be replaced immediately with expedited complimentary dispatch.",
    },
    {
      icon: RotateCcw,
      title: "Order Cancellation Windows",
      desc: "Orders may be amended or canceled prior to departure from our atelier. Once handed over to courier dispatch, cancellations cannot be processed.",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="luxury-pill mx-auto">
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>Atelier Guarantee</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
            Returns & Replacements Protocol
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Our strict standards regarding formulation safety, product hygiene, and client satisfaction.
          </p>
        </div>

        {/* Policy Box */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-champagne/25 shadow-xl space-y-8">
          <div className="p-4 rounded-xl bg-champagne/10 border border-champagne/30 text-xs text-foreground leading-relaxed">
            <span className="font-serif font-bold text-champagne block text-sm mb-1">
              Important Client Advisory:
            </span>
            To preserve the unadulterated purity of our small-batch botanical infusions, products that have departed our climate-controlled cellars cannot be reintroduced into inventory.
          </div>

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
              For replacement claims or order assistance, contact our dedicated concierge:
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-primary text-black font-bold text-xs uppercase tracking-wider hover:glow-on-hover transition-all"
            >
              <span>Contact Concierge Desk</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
