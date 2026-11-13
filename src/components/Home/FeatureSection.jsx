import { Truck, ShieldCheck, Headphones, Award } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Express Shipping",
      description:
        "Free fast shipping on all orders over $75 with comprehensive door-to-door tracking.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Checkout",
      description:
        "Bank-grade security supporting major credit & debit cards in both CAD & USD.",
    },
    {
      icon: Headphones,
      title: "Friendly Customer Support",
      description:
        "Dedicated support team ready to help with product questions and order assistance.",
    },
    {
      icon: Award,
      title: "100% Quality Guaranteed",
      description:
        "Every household item is crafted and tested for everyday durability and home comfort.",
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
            <div className="w-14 h-14 rounded-2xl bg-amber-100/90 border border-amber-300 flex items-center justify-center text-amber-800 dark:text-amber-300 group-hover:scale-110 transition-transform duration-300 shadow-xs">
              <feature.icon className="w-7 h-7 stroke-[2]" />
            </div>
            <h3 className="text-lg font-serif font-black text-slate-900 dark:text-white tracking-tight group-hover:text-amber-700 transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;