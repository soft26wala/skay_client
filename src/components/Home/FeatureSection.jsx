import { Truck, ShieldCheck, Headphones, Award } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: Truck,
      title: "Complimentary Concierge Delivery",
      description:
        "Complimentary insured shipping on all orders over ₹400 across India with real-time tracking.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Encrypted Transactions",
      description:
        "256-bit bank-grade encryption with seamless Razorpay, UPI, Cards, and Cash on Delivery.",
    },
    {
      icon: Headphones,
      title: "Private Client Advisory",
      description:
        "Dedicated wellness concierge ready to assist with formulation guidance and bespoke queries.",
    },
    {
      icon: Award,
      title: "Uncompromising Provenance",
      description:
        "100% verified authentic formulations with rigorous quality assurance from certified master compounders.",
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-card p-8 text-center border border-border/50 hover:border-champagne/40 transition-all rounded-2xl group flex flex-col items-center justify-start space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne group-hover:scale-110 transition-transform duration-300">
              <feature.icon className="w-7 h-7" />
            </div>
            <h3 className="text-base font-serif font-bold text-foreground tracking-tight group-hover:text-champagne transition-colors">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;