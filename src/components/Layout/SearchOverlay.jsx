import { useState } from "react";
import { X, Search, Sparkles, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSearchBar, toggleAIModal } from "../../store/slices/popupSlice";

const SearchOverlay = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSearchBarOpen } = useSelector((state) => state.popup);

  if (!isSearchBarOpen) return null;

  const handleSearch = (queryToUse) => {
    const q = queryToUse || searchQuery;
    if (q.trim() !== "") {
      dispatch(toggleSearchBar());
      navigate(`/products?search=${encodeURIComponent(q)}`);
    }
  };

  const curatedSearches = [
    "Ayurvedic Formulations",
    "Luxury Serums",
    "Restorative Oils",
    "Artisanal Wellness",
    "Limited Edition",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-xl transition-opacity"
        onClick={() => dispatch(toggleSearchBar())}
      />

      {/* SEARCH CONTAINER */}
      <div className="relative z-10 w-full max-w-2xl glass-panel p-8 sm:p-10 border border-champagne/30 shadow-2xl animate-slide-in-top">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
          <div>
            <span className="luxury-pill mb-1.5">Artisanal Search</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              Discover the Collection
            </h2>
          </div>
          <button
            onClick={() => dispatch(toggleSearchBar())}
            aria-label="Close search overlay"
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* INPUT BOX */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-champagne" />
          <input
            type="text"
            placeholder="Search by ingredient, formulation, or bespoke title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            autoFocus
            className="w-full pl-12 pr-28 py-4 bg-secondary/80 border border-border rounded-xl text-base text-foreground focus:outline-none focus:border-champagne transition-all shadow-inner"
          />
          <button
            onClick={() => handleSearch()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 gradient-primary text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:glow-on-hover transition-all"
          >
            Search
          </button>
        </div>

        {/* CURATED SUGGESTIONS & AI SEARCH LINK */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Curated Searches
            </span>
            <button
              onClick={() => {
                dispatch(toggleSearchBar());
                dispatch(toggleAIModal());
              }}
              className="text-xs text-champagne hover:underline flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Try AI Concierge Search</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {curatedSearches.map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="px-3.5 py-1.5 rounded-full bg-secondary/60 hover:bg-champagne/20 border border-border/50 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <span>{term}</span>
                <ArrowRight className="w-3 h-3 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
