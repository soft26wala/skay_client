import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { axiosInstance } from "../../lib/axios";

const defaultCategories = [
  { id: "1", name: "Skincare & Serums", image: "/new/hero/img1.png" },
  { id: "2", name: "Hair Care & Oils", image: "/new/hero/img2.png" },
  { id: "3", name: "Body & Bath Luxury", image: "/new/hero/img3.png" },
  { id: "4", name: "Wellness & Daily Vitality", image: "/new/hero/downside/des.png" },
  { id: "5", name: "Organic Teas & Infusions", image: "/new/hero/downside/code.jfif" },
  { id: "6", name: "Aromatherapy & Essential Oils", image: "/new/hero/downside/deploy.jfif" },
  { id: "7", name: "Men's Grooming", image: "/new/hero/client/lab.png" },
  { id: "8", name: "Sleep & Relaxation", image: "/new/hero/client/met.png" },
];

const CategoryGrid = () => {
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axiosInstance.get("/web/categories");
        if (res.data?.categories && res.data.categories.length > 0) {
          setCategories(res.data.categories);
        }
      } catch (err) {
        console.warn("Using default categories fallback:", err.message);
      }
    };
    fetchCats();
  }, []);
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="luxury-pill">
          <Sparkles className="w-3 h-3 text-champagne" />
          <span>Curated Disciplines</span>
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
          Explore by Category
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Traverse our refined classifications of artisanal products, meticulously curated for discernment and longevity.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="group glass-card p-4 sm:p-5 text-center border border-border/50 hover:border-champagne/40 transition-all rounded-2xl flex flex-col justify-between"
          >
            <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-secondary">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-champagne/30 flex items-center justify-center text-champagne opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-2">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="pt-1">
              <h3 className="text-sm sm:text-base font-serif font-bold text-foreground group-hover:text-champagne transition-colors">
                {category.name}
              </h3>
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground block mt-1">
                View Collection
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
