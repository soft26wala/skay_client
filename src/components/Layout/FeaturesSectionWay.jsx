import React from 'react';
import { ShieldCheck, Leaf, Activity } from "lucide-react";

const FeaturesSectionWay = () => {
 const features = [
  {
    id: "01",
    title: "COMPLETE READY-MADE SYSTEM – NO DEVELOPMENT NEEDED",
    subtitle: "FULL STACK SETUP INCLUDED",
    description: "This template comes with a fully developed React.js frontend (including dashboard) and Node.js backend. All core features like authentication, API structure, and business logic are already implemented. You don’t need to build anything from scratch — just connect, customize, and launch.",
    icon: <Activity className="w-8 h-8 text-primary" />,
    image: "/new/hero/downside/des.png",
    isReverse: false
  },
  {
    id: "02",
    title: "BUILT-IN PAYMENTS, DATABASE & MEDIA HANDLING",
    subtitle: "RAZORPAY, COD & CLOUDINARY READY",
    description: "Integrated with Razorpay and Cash on Delivery (COD) system. PostgreSQL database schema is fully written and optimized — just plug and use. Cloudinary integration is already set up for image uploads and management. Everything is production-ready.",
    icon: <Leaf className="w-8 h-8 text-primary" />,
    image: "/new/hero/downside/code.jfif",
    isReverse: true
  },
  {
    id: "03",
    title: "SUPER EASY SETUP – LAUNCH IN MINUTES",
    subtitle: "JUST CONFIGURE & GO LIVE",
    description: "No complex setup required. All you need to do is configure environment variables and you're ready to go. For favicon, simply replace your SVG file with 'vite.svg' and remove the default one. Clean structure, beginner-friendly, and easy to scale.",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    image: "/new/hero/downside/deploy.jfif",
    isReverse: false
  }
];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-32">
        <p className='text-6xl'>Why Cortex Ecom?</p>
<div className="flex justify-center items-center">
  <p className="text-xl font-semibold text-[#8B6E5D] tracking-[0.2em] uppercase text-center animate-glow-soft">
    (easily customizable and ready to launch)
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
               <span className="font-semibold text-foreground">Premium Glass Design</span>
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