import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

const defaultSlides = [
  {
    id: 1,
    subtitle: "Haute Botanicals & Pure Alchemy",
    title: "The Royal Skay Reserve",
    description:
      "Sacred high-altitude herbal harvests blended with artisan precision to cultivate inner vitality and timeless radiance.",
    image: "/new/hero/img1.png",
    cta: "Discover the Reserve",
    url: "/products",
    tag: "Seasonal Private Reserve",
  },
  {
    id: 2,
    subtitle: "Atelier Formulation",
    title: "Radiance & Longevity Alchemy",
    description:
      "Ancient restorative wisdom harmonized with contemporary purity standards for extraordinary holistic wellness.",
    image: "/new/hero/img2.png",
    cta: "Explore Formulations",
    url: "/products",
    tag: "Master Artisan Crafted",
  },
  {
    id: 3,
    subtitle: "Sacred Wellness Rituals",
    title: "Restorative Botanical Elixirs",
    description:
      "Hand-extracted golden oils and pure therapeutic essences created for meditative calm and physical rejuvenation.",
    image: "/new/hero/img3.png",
    cta: "Acquire The Ritual",
    url: "/products",
    tag: "Limited Concierge Release",
  },
];

const HeroSlider = () => {
  const [slides, setSlides] = useState(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const res = await axiosInstance.get("/web/hero");
        if (res.data?.slides && res.data.slides.length > 0) {
          const formatted = res.data.slides.map((s, idx) => ({
            id: s.id || idx + 1,
            subtitle: s.subtitle || "Atelier Formulation",
            title: s.title || "Sacred Wellness Rituals",
            description: s.description || s.subtitle || "Hand-extracted golden botanicals and pure therapeutic formulations.",
            image: s.image,
            cta: s.cta_text || "Explore Collection",
            url: s.link || "/products",
            tag: s.badge || "Artisanal Harvest",
          }));
          setSlides(formatted);
        }
      } catch (err) {
        console.warn("Using default hero slides fallback:", err.message);
      }
    };
    fetchHeroSlides();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative h-[550px] sm:h-[620px] md:h-[75vh] min-h-[520px] overflow-hidden rounded-3xl mt-2 sm:mt-4 border border-champagne/20 shadow-2xl mx-auto max-w-7xl">
      {/* Background slide image with subtle zoom */}
      <div className="absolute inset-0 bg-noir">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        {/* Editorial gradient overlays for high contrast and luxury mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      </div>

      {/* Slide Content */}
      <div className="relative h-full flex items-center px-6 sm:px-12 md:px-16 z-10">
        <div className="max-w-2xl animate-fade-in-up space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne/15 border border-champagne/30 text-champagne text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{slide.tag}</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-semibold tracking-[0.25em] uppercase text-champagne/90">
              {slide.subtitle}
            </h3>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground leading-[1.1] tracking-tight">
              {slide.title}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
            {slide.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to={slide.url}
              className="inline-flex items-center space-x-3 px-8 py-4 gradient-primary text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover animate-smooth shadow-xl group"
            >
              <span>{slide.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/about"
              className="px-6 py-3.5 rounded-xl border border-border/80 hover:border-champagne text-xs font-semibold uppercase tracking-wider text-foreground hover:text-champagne transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full glass-card border border-champagne/30 hover:border-champagne text-foreground hover:text-champagne transition-all z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full glass-card border border-champagne/30 hover:border-champagne text-foreground hover:text-champagne transition-all z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 h-2 bg-champagne shadow-md"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
