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
            <span className="luxury-pill">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Private Gazette</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 dark:text-white tracking-tight">
              Invitation to the Private Circle
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-lg mx-auto">
            Receive confidential dispatches regarding seasonal harvest reserves, atelier exhibitions, and personalized botanical consultations.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700" />
              <input
                type="email"
                placeholder="Enter your confidential email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-white border-2 border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 gradient-primary text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover animate-smooth flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Join Circle</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wide">
            We honor your privacy. Unsubscribe whenever you wish.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
