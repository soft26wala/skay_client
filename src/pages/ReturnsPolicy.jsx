import React from "react";

export default function NoReturnPolicy() {
  const sections = [
    {
      title: "No Return Policy",
      desc: "Due to the nature of Ayurvedic and personal care products, we do not accept returns once the product has been delivered.",
    },
    {
      title: "Damaged or Wrong Product",
      desc: "If you receive a damaged or incorrect product, you must contact us within 24 hours with proper proof (images/video).",
    },
    {
      title: "Replacement Policy",
      desc: "We offer replacement only for damaged or wrong items after verification. No refunds will be issued.",
    },
    {
      title: "100% Natural Products",
      desc: "All products are made using natural Ayurvedic ingredients. Results may vary depending on individual body type.",
    },
    {
      title: "Cancellation Policy",
      desc: "Orders can only be canceled before dispatch. Once shipped, cancellation is not allowed.",
    },
    {
      title: "Contact Support",
      desc: "For any issues, contact us at email@example.com or call our support team.",
    },
  ];

  return (
    <div className="min-h-screen bg-[url('/public/about/bg.png')] bg-cover bg-center relative mt-10">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">

        {/* Title */}
        <h1 className="text-center text-4xl md:text-5xl font-bold text-yellow-300 mb-10">
          No Return Policy
        </h1>

        {/* Glass Container */}
        <div className="backdrop-blur-0 bg-blue/10 border border-yellow-200/20 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(255,215,0,0.2)]">

          {/* Intro */}
          <p className="text-white/80 text-center max-w-4xl mx-auto mb-10 leading-relaxed">
            At Anant Ayurveda, we maintain strict quality standards. Due to hygiene and product safety reasons, we follow a No Return Policy on all delivered products.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((item, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/10 border border-yellow-200/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
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
              For support, contact us anytime at email@example.com
            </p>
          </div>

        </div>
      </div>
      <img
                src="/public/privacpolicy/cb.png"
                className="rounded-xl object-cover right-4 top-5 relative  z-10"
            />
    </div>
  );
}
