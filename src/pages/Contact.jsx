import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>Client Concierge</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
            Atelier Consultations & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Connect directly with our master herbalists and private client service representatives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Coordinates (Col 1 to 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel p-8 rounded-3xl border border-champagne/30 shadow-xl space-y-6">
              <h3 className="text-lg font-serif font-bold text-foreground pb-4 border-b border-border/40">
                Atelier Headquarters
              </h3>

              <div className="space-y-5 text-xs text-muted-foreground">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground uppercase tracking-wider mb-0.5">
                      Concierge Email
                    </h4>
                    <p>contact@skayproducts.com</p>
                    <p className="text-[11px] text-muted-foreground/70">
                      Dispatches reviewed daily
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground uppercase tracking-wider mb-0.5">
                      Private Telephone
                    </h4>
                    <p>+91 (0) 11 4982 0000</p>
                    <p className="text-[11px] text-muted-foreground/70">
                      Mon – Sat: 9:00 AM – 7:00 PM IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground uppercase tracking-wider mb-0.5">
                      Atelier Pavillon
                    </h4>
                    <p>Heritage Boulevard, Diplomatic Enclave</p>
                    <p className="text-[11px] text-muted-foreground/70">
                      New Delhi, India - 110021
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/40 space-y-2 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1.5 text-champagne font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Confidentiality Assured</span>
                </div>
                <p>
                  All patient inquiries and prescription records are kept strictly confidential under medical-grade privacy standards.
                </p>
              </div>
            </div>
          </div>

          {/* Form (Col 6 to 12) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-border/60 shadow-xl">
              <h3 className="text-xl font-serif font-bold text-foreground mb-6">
                Transmit a Private Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Lady / Lord Harrington"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-secondary/80 border border-border/60 rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@luxury-domain.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-secondary/80 border border-border/60 rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-secondary/80 border border-border/60 rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Subject / Nature of Inquiry *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bespoke Formulation Guidance"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-secondary/80 border border-border/60 rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Message / Formulation Inquiry *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your inquiry, dosage request, or acquisition queries..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-secondary/80 border border-border/60 rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-champagne transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 gradient-primary text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover transition-all flex items-center justify-center space-x-2 disabled:opacity-60 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Transmitting..." : "Send to Concierge"}</span>
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
