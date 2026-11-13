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
    toast.success("Welcome to the Skay Products Gazette. You will receive private previews.");
    setEmail("");
  };

  const footerLinks = {
    brand: [
      { name: "About Us", path: "/about" },
      { name: "All Products", path: "/products" },
      { name: "Best Sellers", path: "/products?filter=best-sellers" },
    ],
    concierge: [
      { name: "Contact Us", path: "/contact" },
      { name: "Frequently Asked Questions", path: "/faq" },
      { name: "Returns & Exchanges", path: "/ReturnsPolicy" },
      { name: "Shipping Information", path: "/faq" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms of Service", path: "/TermsOfService" },
      { name: "Security", path: "/Security" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-background border-t border-border/70 relative overflow-hidden text-foreground">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-champagne/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 py-16 lg:py-20 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Brand & Atelier Coordinates (Col 1 to 5) */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-flex flex-col group self-start" aria-label="sKay Products">
              <img
                src="/img/logo/skay-logo.png"
                alt="sKay Products"
                className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
              />
              <span className="text-xs tracking-[0.2em] uppercase text-amber-800 dark:text-amber-300 font-extrabold mt-2">
                Household & Living Essentials
              </span>
            </Link>

            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed max-w-md">
              Thoughtfully curated household products and daily living essentials designed to bring comfort, quality, and timeless warmth into your home.
            </p>

            <div className="space-y-3 text-sm font-semibold text-slate-800 dark:text-slate-200 pt-2">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0" />
                <span>contact@skayproducts.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0" />
                <span>+91 (0) 11 4982 0000 / Concierge Line</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0" />
                <span>Atelier Pavillon, Heritage Boulevard, New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Links: Skay Products (Col 6 to 7) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-extrabold tracking-widest uppercase text-slate-900 dark:text-amber-300">
              Skay Products
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.brand.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-700 dark:text-slate-300 font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Concierge (Col 8 to 9) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-extrabold tracking-widest uppercase text-slate-900 dark:text-amber-300">
              Concierge
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.concierge.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-700 dark:text-slate-300 font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Protocol / Legal (Col 10 to 12) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-extrabold tracking-widest uppercase text-slate-900 dark:text-amber-300">
              Protocol & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-700 dark:text-slate-300 font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Gazette Subscription */}
        <div className="glass-panel p-8 sm:p-10 mb-12 border-2 border-amber-500/25 bg-white/90 dark:bg-card">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-6">
            <span className="luxury-pill mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Private Gazette</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 dark:text-white">
              Subscribe to Private Previews
            </h3>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
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
              className="flex-1 px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 gradient-primary text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Join Gazette</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>

        {/* Socials & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border/60 gap-4 text-xs">
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-full bg-white dark:bg-secondary border border-slate-300 dark:border-border flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-amber-700 hover:border-amber-500 shadow-xs transition-all"
              >
                <social.icon className="w-4.5 h-4.5" />
              </a>
            ))}
          </div>

          <div className="text-center sm:text-right text-slate-700 dark:text-slate-300 text-xs font-semibold space-y-1">
            <p>© {new Date().getFullYear()} SKAY PRODUCTS. All Rights Reserved.</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Secured with 256-Bit SSL Encryption • Razorpay & COD Certified
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
