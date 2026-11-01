import { useEffect } from "react";
import HeroSlider from "../components/Home/HeroSlider";
import CategoryGrid from "../components/Home/CategoryGrid";
import TrustSection from "../components/Home/TrustSection";
import ClinicTeamSection from "../components/Home/ClinicTeamSection";
import ProductSlider from "../components/Home/ProductSlider";
import FeatureSection from "../components/Home/FeatureSection";
import NewsletterSection from "../components/Home/NewsletterSection";
import FeaturesSectionWay from "../components/Layout/FeaturesSectionWay";
import { useSelector } from "react-redux";
import { MapPin, Sparkles } from "lucide-react";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { topRatedProducts, newProducts } = useSelector(
    (state) => state.product
  );

  return (
    <div className="min-h-screen pt-32 sm:pt-36 bg-background text-foreground overflow-hidden">
      {/* 1. HERO SLIDER */}
      <div className="px-4">
        <HeroSlider />
      </div>

      <div className="space-y-4">
        {/* 2. CATEGORY DISCOVERY */}
        <CategoryGrid />

        {/* 3. BEST SELLER PRODUCTS SLIDER */}
        {topRatedProducts && topRatedProducts.length > 0 && (
          <ProductSlider
            title="Best Selling Products"
            products={topRatedProducts}
          />
        )}

        {/* 4. NEW ARRIVALS SLIDER */}
        {newProducts && newProducts.length > 0 && (
          <ProductSlider title="New Arrivals" products={newProducts} />
        )}

        {/* 5. BRAND TRUST & QUALITY */}
        <TrustSection
          dimg="/new/hero/trust/trust.png"
          dname="sKay Home Essentials"
          title="Curated Household Products Designed for Modern Living"
          dexperience="Crafted with thoughtful care, premium materials, and timeless aesthetic to bring warmth, organization, and everyday comfort to your home."
        />

        {/* 6. OUR COMMITMENT */}
        <ClinicTeamSection />

        {/* 7. PHILOSOPHY & PILLARS */}
        <FeaturesSectionWay />

        {/* 8. SHOPPING GUARANTEES */}
        <FeatureSection />

        {/* 9. NEWSLETTER */}
        <NewsletterSection />

        {/* 10. STORE LOCATION & MAP PIN */}
        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="glass-panel p-6 sm:p-10 border border-border/70 shadow-xl overflow-hidden rounded-3xl bg-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/40">
              <div>
                <span className="luxury-pill mb-1.5">
                  <Sparkles className="w-3 h-3 text-champagne" />
                  <span>Our Showroom</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
                  Visit Us
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-4 h-4 text-champagne" />
                <span>Open Monday to Saturday</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-inner">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2762.8412882432917!2d73.44479607450093!3d29.659018975119974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393d873845407ca7%3A0xa6310eab46f2e97!2sCortex%20web%20solutions!5e1!3m2!1sen!2sin!4v1777008464268!5m2!1sen!2sin"
                width="100%"
                height="340"
                style={{ border: 0, filter: "contrast(1.05)" }}
                allowFullScreen=""
                loading="lazy"
                title="Atelier Location"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
