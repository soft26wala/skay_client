import { useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import ProductCard from "../Products/ProductCard";

const ProductSlider = ({ title, products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      {/* Header and Controls */}
      <div className="flex items-end justify-between mb-10 pb-4 border-b border-border/40">
        <div>
          <span className="luxury-pill mb-2">
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>Curated Showcase</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight mt-1">
            {title}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="p-3 rounded-full glass-card border border-border/60 hover:border-champagne/60 text-foreground hover:text-champagne transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="p-3 rounded-full glass-card border border-border/60 hover:border-champagne/60 text-foreground hover:text-champagne transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slider Track */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-6 pt-2 snap-x snap-mandatory"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-72 sm:w-80 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSlider;
