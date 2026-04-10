import React from "react";

export default function TermsOfService() {
  const sections = [
    {
      title: "100% Natural Products",
      desc: "All products are made using natural and traditional Ayurvedic ingredients. We ensure chemical-free and authentic formulations. Results may vary based on individual conditions.",
    },
    {
      title: "Product Usage",
      desc: "Our products are for general wellness and not a substitute for professional medical advice. Please consult a doctor if needed.",
    },
    {
      title: "Orders & Payments",
      desc: "All orders must be prepaid. We reserve the right to cancel orders due to availability or pricing issues.",
    },
    {
      title: "Shipping Policy",
      desc: "Delivery times may vary depending on location and external factors. We aim for timely delivery.",
    },
    {
      title: "Returns & Refunds",
      desc: "Returns are accepted only for damaged or incorrect items. Refunds will be processed after verification.",
    },
    {
      title: "Privacy & Data",
      desc: "We respect your privacy and ensure your data is secure. No information is shared without consent.",
    },
  ];

  return (
    <div className="min-h-screen bg-[url('/about/bg.png')] bg-cover bg-center relative mt-16">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">

        {/* Title */}
        <h1 className="text-center text-4xl md:text-5xl font-bold text-yellow-300 mb-10">
          Terms of Service
        </h1>

        {/* Glass Container */}
        <div className="backdrop-blur-0 bg-blue/10 border border-yellow-200/20 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(255,215,0,0.2)]">

          {/* Intro */}
          <p className="text-white/80 text-center max-w-4xl mx-auto mb-10 leading-relaxed">
            Welcome to Anant Ayurveda. By using our website, you agree to our terms. We provide 100% natural Ayurvedic products with trust, transparency, and quality.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((item, index) => (
              <div
                key={index}
                className="backdrop-blur-0 bg-white/10 border border-yellow-200/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
              >
                <h2 className="text-yellow-300 text-lg font-semibold mb-2">
                  {item.title}
                </h2>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Image */}
          <div className="mt-10 text-center">
         

            <p className="text-white/80">
              For more details, contact us at email@example.com
            </p>
          </div>

        </div>
      </div>
         <img
                src="/privacpolicy/cb.png"
                className="rounded-xl object-cover right-20 relative top-10 z-10"
              />
    </div>
  );
}
