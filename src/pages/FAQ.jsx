import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Sparkles, Headphones, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [openItems, setOpenItems] = useState({ 0: true });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  const faqs = [
    {
      category: "Orders & Payment",
      question: "Which payment methods are accepted at sKay Products?",
      answer:
        "We accept Cash on Delivery (COD) alongside secure online payments (supporting UPI, Credit/Debit cards, Net Banking, and major cards via Razorpay).",
    },
    {
      category: "Shipping & Delivery",
      question: "What are your delivery timeframes and shipping fees?",
      answer:
        "All orders exceeding $75 CAD qualify for Complimentary Express Delivery. Orders below $75 CAD incur a standard flat shipping fee of $5.00 CAD. Delivery typically takes 2 to 4 business days nationwide.",
    },
    {
      category: "Product Quality",
      question: "Are your household products genuine and guaranteed?",
      answer:
        "Yes, every item at sKay Products is carefully manufactured, quality-tested for durable daily use, and 100% verified authentic with high manufacturing standards.",
    },
    {
      category: "Care & Instructions",
      question: "How do I ensure the best lifespan for my products?",
      answer:
        "Detailed care and usage instructions are provided with every product package and can also be found directly on each product details page under the 'Care & Instructions' tab.",
    },
    {
      category: "Returns & Replacements",
      question: "What is your policy regarding returns and damages?",
      answer:
        "We offer an easy 7-day return and replacement policy for items that arrive damaged or incorrect. Contact our customer support with your order ID and photos for swift resolution.",
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
                className="glass-card border-2 border-slate-200 dark:border-border/60 hover:border-amber-400 rounded-2xl overflow-hidden transition-all shadow-sm bg-white dark:bg-card"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-colors"
                >
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-800 dark:text-amber-400 block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-serif font-black text-base sm:text-lg text-slate-900 dark:text-foreground">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-secondary flex items-center justify-center text-amber-800 dark:text-champagne flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-200 dark:border-border/30 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed animate-fade-in-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Concierge Banner */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-amber-300 dark:border-champagne/30 text-center space-y-4 bg-white/90 dark:bg-card shadow-lg">
          <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 mx-auto flex items-center justify-center text-amber-800">
            <Headphones className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h3 className="text-2xl font-serif font-black text-slate-900 dark:text-foreground">
            Still Have Questions?
          </h3>
          <p className="text-sm font-semibold text-slate-700 dark:text-muted-foreground max-w-md mx-auto">
            Our customer care team is available to help with order tracking, product recommendations, or questions.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-primary text-black font-extrabold text-sm uppercase tracking-wider hover:glow-on-hover transition-all shadow-md"
            >
              <span>Contact Customer Support</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;