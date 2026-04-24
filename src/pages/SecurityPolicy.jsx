import React, {useEffect} from "react";

export default function SecurityPolicy() {

   useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);

  const sections = [
    {
      title: "Data Protection",
      desc: "We use advanced security measures to protect your personal and payment information from unauthorized access.",
    },
    {
      title: "Secure Payments",
      desc: "All transactions are processed through secure and encrypted payment gateways to ensure safe payments.",
    },
    {
      title: "User Privacy",
      desc: "Your personal information is never sold or shared with third parties without your consent.",
    },
    {
      title: "Website Security",
      desc: "Our website is protected with SSL encryption and regular security updates to prevent vulnerabilities.",
    },
    {
      title: "Account Safety",
      desc: "Users are responsible for maintaining the confidentiality of their account credentials.",
    },
    {
      title: "Fraud Prevention",
      desc: "We actively monitor suspicious activities and take action to prevent fraud and misuse.",
    },
  ];

  return (
    <div className="min-h-screen bg-[url('/about/bg.png')] bg-cover bg-center relative mt-10">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">

        {/* Title */}
        <h1 className="text-center text-4xl md:text-5xl font-bold text-yellow-300 mb-10">
          Security Policy
        </h1>

        {/* Glass Container */}
        <div className="backdrop-blur-0 bg-blue/10 border border-yellow-200/20 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(255,215,0,0.2)]">

          {/* Intro */}
          <p className="text-white/80 text-center max-w-4xl mx-auto mb-10 leading-relaxed">
            At Cortex Ecom demo, we prioritize your security. We implement strong security practices to protect your data, transactions, and privacy.
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
            <img
              src="/herbs.png"
              className="mx-auto rounded-xl border border-yellow-200/20 mb-6 shadow-lg"
            />

            <p className="text-white/80">
              Your security is our priority. For any concerns, contact us at email@example.com
            </p>
          </div>

        </div>
      </div>
      <img
                src="/privacpolicy/cb.png"
                className="rounded-xl object-cover right-20 relative top-10  z-10"
            />
    </div>
  );
}
