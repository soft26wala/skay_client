import { useState } from "react";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "react-toastify";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to the Skay Products Gazette. You will receive private previews.");
    setEmail("");
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="glass-panel p-10 sm:p-16 text-center border border-champagne/30 shadow-2xl relative overflow-hidden bg-gradient-to-b from-secondary/40 to-background/90">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-champagne/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="luxury-pill">Private Gazette</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
              Invitation to the Private Circle
            </h2>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Receive confidential dispatches regarding seasonal harvest reserves, atelier exhibitions, and personalized botanical consultations.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne" />
              <input
                type="email"
                placeholder="Enter your confidential email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-secondary/80 border border-border rounded-xl text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-champagne transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 gradient-primary text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover animate-smooth flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Join Circle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[11px] text-muted-foreground tracking-wide">
            We honor your privacy. Unsubscribe whenever you wish.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
