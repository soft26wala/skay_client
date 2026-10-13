import { Search, Sparkles, Star, Filter, RotateCcw } from "lucide-react";
import { categories } from "../data/products";
import ProductCard from "../components/Products/ProductCard";
import Pagination from "../components/Products/Pagination";
import AISearchModal from "../components/Products/AISearchModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../store/slices/productSlice";
import { toggleAIModal } from "../store/slices/popupSlice";

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const { products, totalProducts, loading } = useSelector(
    (state) => state.product
  );

  const query = useQuery();
  const searchTerm = query.get("search");
  const searchedCategory = query.get("category");

  const [searchQuery, setSearchQuery] = useState(searchTerm || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchedCategory || ""
  );
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [availability, setAvailability] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm !== null && searchTerm !== undefined) {
      setSearchQuery(searchTerm);
    }
    if (searchedCategory !== null && searchedCategory !== undefined) {
      setSelectedCategory(searchedCategory);
    }
  }, [searchTerm, searchedCategory]);

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        category: selectedCategory,
        price: `${priceRange[0]}-${priceRange[1]}`,
        search: searchQuery,
        ratings: selectedRating,
        availability: availability,
        page: currentPage,
      })
    );
  }, [
    dispatch,
    selectedCategory,
    priceRange,
    searchQuery,
    selectedRating,
    availability,
    currentPage,
  ]);

  const resetFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 10000]);
    setSelectedRating(0);
    setAvailability("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil((totalProducts || 1) / 10);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Title & Breadcrumb */}
        <div className="mb-10 pb-6 border-b border-border/40 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="luxury-pill mb-2">
              <Sparkles className="w-3 h-3 text-champagne" />
              <span>The Atelier Catalog</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
              Curated Collections
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
              Displaying {totalProducts || products.length} formulations crafted with artisanal precision.
            </p>
          </div>

          {/* Controls toolbar */}
          <div className="flex items-center space-x-3">
            <button
              onClick={resetFilters}
              className="px-3.5 py-2 rounded-xl border border-border/60 hover:border-champagne/60 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>

            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-4 py-2 rounded-xl gradient-primary text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* SIDEBAR FILTERS (Left) */}
          <aside
            className={`lg:block ${
              isMobileFilterOpen ? "block" : "hidden"
            } w-full lg:w-72 flex-shrink-0 space-y-6`}
          >
            <div className="glass-panel p-6 border border-border/60 shadow-xl space-y-8 sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-border/40">
                <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-foreground">
                  Refine Selection
                </h2>
                <span className="text-[10px] text-champagne uppercase font-bold tracking-wider">
                  Maison Filters
                </span>
              </div>

              {/* 1. PRICE RANGE */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground uppercase tracking-wider">
                    Price Range
                  </span>
                  <span className="text-champagne font-bold">
                    Up to ₹{priceRange[1]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-champagne cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>₹0</span>
                  <span>₹10,000+</span>
                </div>
              </div>

              {/* 2. CATEGORY PILLS */}
              <div className="space-y-3">
                <span className="block text-xs font-semibold text-foreground uppercase tracking-wider">
                  Categories
                </span>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`w-full px-3 py-2 text-left rounded-lg text-xs font-medium transition-all ${
                      !selectedCategory
                        ? "gradient-primary text-black font-bold shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full px-3 py-2 text-left rounded-lg text-xs font-medium transition-all ${
                        selectedCategory === category.name
                          ? "gradient-primary text-black font-bold shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. AVAILABILITY */}
              <div className="space-y-3">
                <span className="block text-xs font-semibold text-foreground uppercase tracking-wider">
                  Availability
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "", label: "All Items" },
                    { id: "in-stock", label: "In Stock" },
                    { id: "limited", label: "Limited Reserve" },
                  ].map((status) => (
                    <button
                      key={status.id}
                      onClick={() => setAvailability(status.id)}
                      className={`w-full px-3 py-2 text-left rounded-lg text-xs font-medium transition-all ${
                        availability === status.id
                          ? "gradient-primary text-black font-bold shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. RATING */}
              <div className="space-y-3">
                <span className="block text-xs font-semibold text-foreground uppercase tracking-wider">
                  Minimum Rating
                </span>
                <div className="space-y-1">
                  {[4, 3, 2].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        setSelectedRating(selectedRating === rating ? 0 : rating)
                      }
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs transition-all ${
                        selectedRating === rating
                          ? "bg-secondary border border-champagne/40"
                          : "hover:bg-secondary/50 text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rating
                                ? "text-champagne fill-current"
                                : "text-border"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold">
                        {rating}★ & above
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 min-w-0 space-y-8">
            {/* SEARCH TOOLBAR & AI TRIGGER */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne" />
                <input
                  type="text"
                  placeholder="Search products by name, ritual, or ingredient..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-secondary/80 border border-border rounded-xl text-xs sm:text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-champagne transition-colors shadow-inner"
                />
              </div>

              <button
                onClick={() => dispatch(toggleAIModal())}
                className="px-5 py-3.5 rounded-xl border border-champagne/40 bg-champagne/10 hover:bg-champagne/20 text-champagne font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 flex-shrink-0"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>AI Concierge Search</span>
              </button>
            </div>

            {/* PRODUCTS GRID */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="glass-card p-6 rounded-2xl border border-border/40 animate-pulse space-y-4"
                  >
                    <div className="aspect-square bg-secondary/80 rounded-xl" />
                    <div className="h-4 bg-secondary rounded w-3/4" />
                    <div className="h-4 bg-secondary rounded w-1/2" />
                    <div className="h-10 bg-secondary rounded-xl" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* EMPTY RESULTS */
              <div className="text-center py-24 glass-panel p-10 rounded-2xl border border-border/40">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                  No Formulations Match Your Criteria
                </h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto mb-6">
                  Try adjusting your price range, clearing your active search query, or resetting filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 gradient-primary text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover transition-all"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="pt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </main>
        </div>

        {/* AI SEARCH MODAL */}
        <AISearchModal />
      </div>
    </div>
  );
};

export default Products;
