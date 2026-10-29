import { useEffect } from "react";
import { ShieldCheck, Lock, KeyRound, Server, FileCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function SecurityPolicy() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const sections = [
    {
      icon: Lock,
      title: "256-Bit SSL Transport Security",
      desc: "All client browsing sessions and checkout transmissions are protected with industry-standard 256-bit encryption.",
    },
    {
      icon: Server,
      title: "PCI-DSS Level 1 Gateway Integration",
      desc: "Cardholder data is tokenized and processed through certified PCI-DSS payment gateways. Sensitive card numbers never touch our servers.",
    },
    {
      icon: KeyRound,
      title: "Cryptographic Credential Storage",
      desc: "Client passwords and access tokens are hashed using salted cryptographic algorithms, safeguarding accounts against unauthorized access.",
    },
    {
      icon: FileCheck,
      title: "Continuous Threat Auditing",
      desc: "Our server environments and API endpoints undergo continuous dependency and vulnerability assessments to neutralize emerging threats.",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="luxury-pill mx-auto">
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>Digital Infrastructure</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
            Security & Encryption Standards
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Rigorous protocols deployed to safeguard your confidential transactions and personal data.
          </p>
        </div>

        {/* Security Box */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-champagne/25 shadow-xl space-y-8">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-champagne/10 border border-champagne/30 text-xs text-foreground">
            <ShieldCheck className="w-6 h-6 text-champagne flex-shrink-0" />
            <p className="leading-relaxed">
              At Skay Products, security is engineered into every interaction. From the moment you browse our formulations to final transaction settlement, your data is fortified by institutional-grade defenses.
            </p>
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
              To report a security concern or verify system integrity, contact our technical security desk:
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-primary text-black font-bold text-xs uppercase tracking-wider hover:glow-on-hover transition-all"
            >
              <span>Security Concierge</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
