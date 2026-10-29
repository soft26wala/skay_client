import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { axiosInstance } from "../../lib/axios";

const defaultSpaces = [
  { src: "/new/hero/client/ofc.png", label: "Consultation Sanctum" },
  { src: "/new/hero/client/met.png", label: "Artisanal Dispensing Suite" },
  { src: "/new/hero/client/lab.png", label: "Botanical Extraction Lab" },
  { src: "/new/hero/client/office.png", label: "Therapeutic Chamber" },
  { src: "/new/hero/client/sms.png", label: "Herbal Reserve Vault" },
  { src: "/new/hero/client/des.png", label: "Master Formulators" },
  { src: "/new/hero/client/ana.png", label: "Diagnostic Wellness Desk" },
  { src: "/new/hero/client/storage.png", label: "Climate-Controlled Cellar" },
];

const ClinicTeamSection = () => {
  const [spaces, setSpaces] = useState(defaultSpaces);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await axiosInstance.get("/web/sanctum");
        if (res.data?.spaces && res.data.spaces.length > 0) {
          setSpaces(res.data.spaces);
        }
      } catch (err) {
        console.warn("Using default sanctum spaces fallback:", err.message);
      }
    };
    fetchSpaces();
  }, []);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="luxury-pill">
          <Sparkles className="w-3 h-3 text-champagne" />
          <span>The Atelier Spaces</span>
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
          Inside Our Wellness Sanctum
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Step into our tranquil compounding suites and consultation chambers, where generational wisdom meets modern clinical precision.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {spaces.map((space, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl glass-card border border-border/60 hover:border-champagne/50 transition-all aspect-video sm:aspect-square"
          >
            <img
              src={space.src}
              alt={space.label}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-4">
              <span className="text-champagne text-[10px] uppercase tracking-[0.2em] font-semibold block mb-0.5">
                Atelier Sanctum
              </span>
              <span className="text-white text-xs sm:text-sm font-serif font-bold tracking-tight">
                {space.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClinicTeamSection;