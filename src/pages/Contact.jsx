import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success(
        "Your dispatch has been received. Our concierge will attend to your request within 4 business hours."
      );
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-6xl space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="luxury-pill mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>sKay Customer Care</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 dark:text-foreground tracking-tight">
            Customer Support & Inquiries
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-muted-foreground leading-relaxed">
            Connect directly with our sKay Products support team for order inquiries, delivery assistance, or product questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Coordinates (Col 1 to 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel p-8 rounded-3xl border border-slate-300 dark:border-champagne/30 shadow-xl space-y-6">
              <h3 className="text-xl font-serif font-black text-slate-900 dark:text-foreground pb-4 border-b border-border/40">
                sKay Products Headquarters
              </h3>

              <div className="space-y-5 text-sm text-slate-700 dark:text-muted-foreground">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-foreground uppercase tracking-wider mb-0.5">
                      Support Email
                    </h4>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">contact@skayproducts.com</p>
                    <p className="text-xs font-semibold text-slate-500">
                      Inquiries reviewed daily
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-foreground uppercase tracking-wider mb-0.5">
                      Customer Line
                    </h4>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">+91 (0) 11 4982 0000</p>
                    <p className="text-xs font-semibold text-slate-500">
                      Mon – Sat: 9:00 AM – 7:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-foreground uppercase tracking-wider mb-0.5">
                      Office Address
                    </h4>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Heritage Boulevard, Diplomatic Enclave</p>
                    <p className="text-xs font-semibold text-slate-500">
                      New Delhi, India - 110021
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/40 space-y-2 text-xs text-slate-700 dark:text-muted-foreground">
                <div className="flex items-center gap-1.5 text-amber-800 font-black">
                  <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  <span>Quality & Satisfaction Guaranteed</span>
                </div>
                <p className="font-semibold">
                  We are committed to providing premium quality household essentials and dedicated client care.
                </p>
              </div>
            </div>
          </div>

          {/* Form (Col 6 to 12) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-border/60 shadow-xl">
              <h3 className="text-2xl font-serif font-black text-slate-900 dark:text-foreground mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white dark:bg-secondary/80 border-2 border-slate-300 dark:border-border/60 rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white dark:bg-secondary/80 border-2 border-slate-300 dark:border-border/60 rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white dark:bg-secondary/80 border-2 border-slate-300 dark:border-border/60 rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                      Subject / Nature of Inquiry *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Order Tracking or Product Info"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white dark:bg-secondary/80 border-2 border-slate-300 dark:border-border/60 rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your inquiry, order questions, or assistance required..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white dark:bg-secondary/80 border-2 border-slate-300 dark:border-border/60 rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 gradient-primary text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:glow-on-hover transition-all flex items-center justify-center space-x-2 disabled:opacity-60 shadow-lg"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
