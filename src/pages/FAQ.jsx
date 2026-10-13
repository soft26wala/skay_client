import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Sparkles, Headphones, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [openItems, setOpenItems] = useState({ 0: true });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const faqs = [
    {
      category: "Acquisitions & Payment",
      question: "Which payment methods are accepted at Maison Luxe?",
      answer:
        "We accept Cash on Delivery (COD) across India, alongside end-to-end encrypted online payments via Razorpay (supporting UPI apps like GPay & PhonePe, all major Credit/Debit cards, and Net Banking).",
    },
    {
      category: "Concierge Delivery",
      question: "What are your delivery timeframes and shipping fees?",
      answer:
        "All acquisitions exceeding ₹400 qualify for Complimentary Concierge Delivery. Orders below ₹400 incur a standard flat dispatch fee of ₹40. Standard transit requires 2 to 4 business days in major metros, and 3 to 5 days nationwide.",
    },
    {
      category: "Formulation Purity",
      question: "Are your botanicals certified authentic and single-origin?",
      answer:
        "Every batch is formulated exclusively from organically wild-harvested herbs harvested at peak lunar potency. Each batch undergoes multi-spectral chromatography to certify absolute purity, potency, and zero synthetic adulterants.",
    },
    {
      category: "Care & Packaging",
      question: "How should I store these formulations?",
      answer:
        "Our formulations are housed in biophotonic violet glass bottles engineered to block destructive visible light frequencies while allowing energizing ultraviolet rays. Store in a cool, shaded sanctuary away from direct sunlight.",
    },
    {
      category: "Returns & Exchanges",
      question: "What is your policy regarding returns and damages?",
      answer:
        "Due to the sacred and personal care nature of our botanical formulations, delivered items are non-returnable. However, if your package arrives compromised or incorrect, our concierge team will dispatch a replacement within 24 hours of receiving photo confirmation.",
    },
  ];

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="luxury-pill mx-auto">
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>Concierge Advisory</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Everything you need to know regarding acquisitions, formulations, and concierge delivery.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItems[index];
            return (
              <div
                key={index}
                className="glass-card border border-border/60 hover:border-champagne/40 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-champagne block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-foreground">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-champagne flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-border/30 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-fade-in-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Concierge Banner */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-champagne/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-champagne/10 border border-champagne/30 mx-auto flex items-center justify-center text-champagne">
            <Headphones className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-foreground">
            Still Have Inquiries?
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Our private client concierge is on standby to assist with custom formulations, order queries, or dosage advice.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-black font-bold text-xs uppercase tracking-wider hover:glow-on-hover transition-all"
            >
              <span>Speak to Concierge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;