import { useEffect } from "react";
import { ShieldCheck, Lock, Eye, KeyRound, Sparkles } from "lucide-react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const sections = [
    {
      icon: ShieldCheck,
      title: "Confidential Data Stewardship",
      desc: "We collect only essential details required to process your bespoke orders and provide concierge assistance. Your private dossier is never shared or sold to commercial third parties.",
    },
    {
      icon: Lock,
      title: "Bank-Grade Encryption Protocols",
      desc: "All transmissions are encrypted via 256-bit Secure Socket Layer (SSL) certificates. Financial credentials are handled directly through certified, PCI-DSS compliant gateways like Razorpay.",
    },
    {
      icon: KeyRound,
      title: "Client Authentication & Privacy",
      desc: "Your account credentials and authentication tokens are securely encrypted. We utilize telephone-based primary identification for streamlined, verified access.",
    },
    {
      icon: Eye,
      title: "Cookie & Preference Standards",
      desc: "We employ strictly functional and aesthetic preference cookies (such as your shopping bag persistence and color theme) to ensure a bespoke browsing encounter.",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="luxury-pill mx-auto">
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>Skay Products Protocol</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
            Privacy & Data Protocol
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Our commitment to honoring the discretion and digital security of our distinguished clientele.
          </p>
        </div>

        {/* Content Panel */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-champagne/25 shadow-xl space-y-8">
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            At Skay Products, trust is the bedrock of our atelier. When you commission a formulation or register your profile, you entrust us with personal information. We treat this data with the highest discretion and protective protocols.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-border/50 hover:border-champagne/40 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne">
                  <section.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-foreground">
                  {section.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {section.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-border/40 text-xs text-muted-foreground leading-relaxed space-y-2">
            <p className="font-semibold text-foreground">
              Questions Regarding Your Confidential Data:
            </p>
            <p>
              For data requests, profile deletion, or privacy inquiries, contact our Data Privacy Officer at{" "}
              <span className="text-champagne font-mono">privacy@skayproducts.com</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
