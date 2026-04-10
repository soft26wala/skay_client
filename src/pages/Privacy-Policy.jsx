import React from "react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[url('/about/bg.png')] bg-cover bg-center relative ">

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-12">

                {/* Header with Icon */}
                <div className="flex flex-col items-center mb-10">
                    <div className="relative mb-4">
                        <img src="/privacpolicy/lock.png" className="w-38 h-38 relative top-56 z-10 right-96" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 tracking-wide">
                        Privacy Policy
                    </h1>
                </div>

                {/* Glass Container */}
                <div className="backdrop-blur-0 bg-blue/30 border border-yellow-200/20 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(255,215,0,0.2)]">

                    {/* Description */}
                    <p className="text-yellow-500 text-center max-w-4xl mx-auto mb-10 leading-relaxed mt-20 ">
                        <b>
                            At Anant Ayurveda, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.
                        </b>
                    </p>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-6">

                        {/* Card */}
                        {[
                            {
                                title: "Information We Collect",
                                desc: "Details on what data we gather and how we use it.",
                                icon: "/privacpolicy/fol.png",
                            },
                            {
                                title: "How We Use Your Information",
                                desc: "Explanation of the purposes for collecting your data.",
                                icon: "/privacpolicy/seting.png",
                            },
                            {
                                title: "Data Sharing & Disclosure",
                                desc: "How we handle and protect your information securely.",
                                icon: "/privacpolicy/smw.png",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="backdrop-blur-xl bg-blue/50 border border-yellow-200/20 rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition"
                            >
                                <img src={item.icon} className="w-12 mx-auto mb-3" />

                                <h2 className="text-yellow-300 text-lg font-semibold mb-2">
                                    {item.title}
                                </h2>

                                <p className="text-white/80 text-sm mb-4">{item.desc}</p>

                                <button className="px-5 py-2 rounded-full border border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black transition backdrop-blur-0 bg-white/10">
                                    Learn More
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-10 text-center">


                        <p className="text-white/80">
                            If you have any questions or need further information, please
                            contact us at email@example.com
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
