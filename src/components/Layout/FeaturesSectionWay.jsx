import React from 'react';
import { ShieldCheck, Leaf, Activity } from "lucide-react";

const FeaturesSectionWay = () => {
  const features = [
    {
      id: "01",
      title: "ANANT SCIENCE: FROM ORGAN REPAIR TO VITALITY",
      subtitle: "TARGETED CARE BY ANANT RESEARCH CELL",
      description: "Humari expertise Liver aur Kidney regeneration ke pioneers hone mein hai. Wahi deep research humne apne Sugar control, Weight loss aur Shilajit extracts mein dali hai. Har product organ-level repair ke liye clinically design kiya gaya hai.",
      icon: <Activity className="w-8 h-8 text-primary" />,
      image: "/points/image1.png", // Yahan apni kidney/liver wali image ka path dalo
      isReverse: false
    },
    {
      id: "02",
      title: "VIRGIN INGREDIENTS, UNCOMPROMISED PURITY",
      subtitle: "ETHICALLY SOURCED, POTENT EXTRACTS",
      description: "Chahe wo Kala Piliya ke liye 'Kutki' ho ya premium Shilajit, hum herbs ko unke natural habitat se manually pick karte hain. Humara 'Cold-Extraction' process ensure karta hai ki herbs ki healing power 100% barkarar rahe.",
      icon: <Leaf className="w-8 h-8 text-primary" />,
      image: "/points/image2.png", // Shilajit ya herbs ki image
      isReverse: true
    },
    {
      id: "03",
      title: "INFINITE SOLUTIONS FOR EVERY LIFESTYLE NEED",
      subtitle: "HOLISTIC CARE & EXPERT VAIDYA SUPPORT",
      description: "Sugar management ho ya internal strength badhani ho—hum root cause par kaam karte hain. Anant Ayurveda ke saath aapko milta hai personalized diet guidance aur expert Vaidya support, jo aapki health journey ko safal banata hai.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      image: "/points/image3.png", // Healthy lifestyle icon/image
      isReverse: false
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-32">
        <p className='text-6xl'>Why Anant Ayurveda?</p>
<div className="flex justify-center items-center">
  <p className="text-xl font-semibold text-[#8B6E5D] tracking-[0.2em] uppercase text-center animate-glow-soft">
    HEALTHY INSIDE, HAPPY OUTSIDE
  </p>
</div>
      {features.map((feature) => (

        <div 
          key={feature.id} 
          className={`flex flex-col ${feature.isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
        >
          {/* TEXT CONTENT */}
          <div className="flex-1 space-y-6">
            
            <span className="text-8xl font-bold text-primary/10 block leading-none">
              {feature.id}
            </span>
            
            <div className="space-y-2">
              <h4 className="text-primary font-bold tracking-widest text-sm uppercase">
                {feature.subtitle}
              </h4>
              <h2 className="text-4xl font-bold text-foreground leading-tight">
                {feature.title}
              </h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              {feature.description}
            </p>
            <div className="flex items-center gap-4 pt-4">
               <div className="p-3 glass-card rounded-xl">
                 {feature.icon}
               </div>
               <span className="font-semibold text-foreground">Premium Ayurvedic Standards</span>
            </div>
          </div>

          {/* IMAGE / VISUAL */}
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <img 
              src={feature.image} 
              alt={feature.title}
              className="relative z-10 w-full h-auto object-contain animate-float drop-shadow-2xl"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/500x400?text=Anant+Ayurveda+3D' }}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeaturesSectionWay;