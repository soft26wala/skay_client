import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to the Maison Gazette. You will receive private previews.");
    setEmail("");
  };

  const footerLinks = {
    maison: [
      { name: "Artisanal Heritage", path: "/about" },
      { name: "Haute Formulations", path: "/products" },
      { name: "Client Testimonials", path: "/about" },
    ],
    concierge: [
      { name: "Atelier Contact", path: "/contact" },
      { name: "Frequently Asked Questions", path: "/faq" },
      { name: "Returns & Replacements", path: "/ReturnsPolicy" },
      { name: "Delivery Standards", path: "/faq" },
    ],
    legal: [
      { name: "Privacy Protocol", path: "/privacy-policy" },
      { name: "Terms of Acquisition", path: "/TermsOfService" },
      { name: "Security & Encryption", path: "/Security" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-background border-t border-champagne/20 relative overflow-hidden text-foreground">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-champagne/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 py-16 lg:py-20 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Brand & Atelier Coordinates (Col 1 to 5) */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center space-x-3 group inline-block">
              <img
                src="/img/logo/logo3.png"
                alt="Maison Luxe"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <span className="text-2xl font-serif font-bold tracking-tight text-foreground block">
                  MAISON LUXE
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-champagne font-medium block">
                  Haute E-Commerce & Curated Living
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Purveyors of exquisite botanical alchemy and high-end lifestyle formulations.
              Crafted in collaboration with master artisans to elevate modern self-care rituals.
            </p>

            <div className="space-y-3 text-xs text-muted-foreground pt-2">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-champagne flex-shrink-0" />
                <span>concierge@maisonluxe.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-champagne flex-shrink-0" />
                <span>+91 (0) 11 4982 0000 / Concierge Line</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-champagne flex-shrink-0" />
                <span>Atelier Pavillon, Heritage Boulevard, New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Links: Maison (Col 6 to 7) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-champagne">
              Maison
            </h3>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.maison.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-champagne transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Concierge (Col 8 to 9) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-champagne">
              Concierge
            </h3>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.concierge.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-champagne transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Protocol / Legal (Col 10 to 12) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-champagne">
              Protocol & Legal
            </h3>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-champagne transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Gazette Subscription */}
        <div className="glass-panel p-8 sm:p-10 mb-12 border border-champagne/30 bg-gradient-to-r from-secondary/50 via-champagne/5 to-secondary/50">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-6">
            <span className="luxury-pill mx-auto">
              <Sparkles className="w-3 h-3 text-champagne" />
              <span>Private Gazette</span>
            </span>
            <h3 className="text-2xl font-serif font-bold text-foreground">
              Subscribe to Private Previews
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Receive confidential dispatches regarding seasonal reserve formulations,
              exclusive atelier invitations, and private client privileges.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your confidential email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-secondary/80 border border-border rounded-xl text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-champagne transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 gradient-primary text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover transition-all flex items-center justify-center gap-2"
            >
              <span>Join Gazette</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Socials & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border/40 gap-4 text-xs">
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-champagne hover:border hover:border-champagne/40 transition-all"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="text-center sm:text-right text-muted-foreground text-[11px] space-y-1">
            <p>© {new Date().getFullYear()} MAISON LUXE. All Rights Reserved.</p>
            <p className="text-[10px] text-muted-foreground/70">
              Secured with 256-Bit SSL Encryption • Razorpay & COD Certified
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
