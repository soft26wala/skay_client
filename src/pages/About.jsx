import React, {useEffect} from "react";

export default function AboutPage() {

  useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);


  return (
    <div className="min-h-screen bg-[url('/about/bg.png')] bg-cover bg-center relative mt-16 z-10">
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">

        {/* Title */}
        <h1 className="text-center text-4xl md:text-5xl font-bold text-yellow-300 mb-10">
          About Us
        </h1>

        {/* Main Glass Container */}
        <div className="backdrop-blur-0 bg-blue-20 border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl">

          <div className="grid md:grid-cols-3 gap-6">

            {/* LEFT SECTION */}
            <div className="space-y-6">

              {/* LOGO + PERSON (OVERLAY STYLE) */}
              <div className="relative w-full h-48 flex items-center justify-center">
                {/* 3D Logo Background */}
                <img
                  src="/img/logo/logo3.png"
                  className="absolute w-40 h-40 object-contain opacity-90 lg:right-64 lg:mr-5 lg:mb-10 right-48 md:right-24 md:top-14 sm:right-16"
                />

                {/* Person Image on top */}
                <img
                  src="/about/jas2.png"
                  className="relative w-33 h-35 object-cover z-50 md:top-14 lg:top-0"
                />
              </div>

              {/* Story Card */}
              <div className="backdrop-blur bg-white/10 border border-white/20 rounded-2xl p-5">
                <h2 className="text-xl font-semibold text-yellow-300">
                  Our Story
                </h2>
                <p className="text-white/80 mt-2 text-sm">
                  Anant Ayurveda was founded with a mission to bring holistic
                  healing through ancient Ayurvedic practices.
                </p>
              </div>

              {/* Herbs Image */}
              <img
                src="/privacpolicy/cb.png"
                className="rounded-xl object-cover right-20 relative top-48"
              />
            </div>

            {/* CENTER SECTION */}
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-5 flex flex-col justify-between">
              <img
                src="/ayurveda-work.png"
                className="rounded-xl mb-4 object-cover"
              />

              <div>
                <h2 className="text-xl font-semibold text-yellow-300">
                  Meet Jaswinder Singh
                </h2>
                <p className="text-white/80 text-sm mt-2">
                  An expert Ayurvedic practitioner dedicated to preserving and
                  sharing the wisdom of Ayurveda.
                </p>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-5 flex flex-col justify-between">
              <img
                src="/jaswinder.jpg"
                className="rounded-xl mb-4 object-cover"
              />

              <div>
                <h2 className="text-xl font-semibold text-yellow-300">
                  Our Approach
                </h2>
                <p className="text-white/80 text-sm mt-2">
                  We focus on personalized treatments using natural remedies for
                  balanced health.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-yellow-300 mt-10 text-lg">
          Natural Ayurvedic Healing for Body & Mind
        </p>

      </div>
    </div>
  );
}
