import { Star, ShoppingBag, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { toggleCart } from "../../store/slices/popupSlice";
import { useCurrency } from "../../contexts/CurrencyContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { formatPrice } = useCurrency();

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(toggleCart());
    toast.success(`"${product.name}" added to your bag.`);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    navigateTo("/payment");
  };

  const isNew =
    product.created_at &&
    new Date() - new Date(product.created_at) < 30 * 24 * 60 * 60 * 1000;

  return (
    <div
      className="group glass-card border rounded-2xl p-4 sm:p-5 transition-all duration-500 flex flex-col justify-between hover:shadow-xl"
      style={{
        backgroundColor: "var(--card-custom-bg, #ffffff)",
        borderColor: "var(--card-custom-border, rgba(220, 210, 190, 0.7))",
        color: "var(--card-custom-text, #1f2937)",
      }}
    >
      <div>
        <Link to={`/product/${product.id}`} className="block">
          {/* PRODUCT IMAGE CONTAINER */}
          <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-secondary/50 flex items-center justify-center">
            <img
              src={product.images?.[0]?.url || "/avatar-holder.avif"}
              alt={product.name}
              className="w-full h-full object-contain p-4 group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* BADGES */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {isNew && (
                <span className="px-2.5 py-0.5 rounded-full bg-champagne text-black text-[10px] font-black uppercase tracking-wider shadow-sm">
                  New
                </span>
              )}
              {Number(product.ratings) >= 4.5 && (
                <span className="px-2.5 py-0.5 rounded-full bg-secondary/95 text-champagne border border-border text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Top Rated
                </span>
              )}
            </div>

            {/* QUICK ADD TO CART ICON BUTTON */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              title="Add to Cart"
              aria-label="Add to Cart"
              className="absolute bottom-3 right-3 p-3 rounded-full backdrop-blur-md border border-border transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 disabled:opacity-0 shadow-lg"
              style={{
                backgroundColor: "var(--card-custom-btn-bg, #b98822)",
                color: "var(--card-custom-btn-text, #ffffff)",
              }}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>

          {/* PRODUCT INFO */}
          <div className="space-y-2">
            {product.category && (
              <span
                className="text-xs font-extrabold uppercase tracking-wider block transition-colors text-amber-800 dark:text-amber-300"
              >
                {product.category}
              </span>
            )}

            <h3
              className="text-base sm:text-lg font-serif font-black line-clamp-1 transition-colors text-slate-900 dark:text-white"
            >
              {product.name}
            </h3>

            {/* RATINGS & REVIEWS */}
            <div className="flex items-center space-x-2 pt-0.5">
              <div className="flex items-center space-x-0.5">
                {[...Array(5)].map((_, i) => {
                  const isFilled = i < Math.floor(Number(product.ratings) || 0);
                  return (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        isFilled
                          ? "text-amber-500 fill-amber-400 drop-shadow-xs"
                          : "text-amber-400 fill-amber-100/70 stroke-[1.8] dark:fill-amber-950/40"
                      }`}
                    />
                  );
                })}
              </div>
              <span className="text-xs font-black text-slate-900 dark:text-white">
                {Number(product.ratings || 0).toFixed(1)}
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                ({product.review_count || product.reviews?.length || 0})
              </span>
            </div>

            {/* PRICE & STOCK */}
            <div className="flex items-baseline justify-between pt-2">
              <span
                className="text-lg sm:text-xl font-serif font-black text-slate-950 dark:text-amber-300 tracking-tight"
              >
                {formatPrice(product.price)}
              </span>

              <span
                className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                  product.stock > 5
                    ? "text-emerald-950 bg-emerald-100 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-700"
                    : product.stock > 0
                    ? "text-amber-950 bg-amber-100 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700"
                    : "text-rose-950 bg-rose-100 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200 dark:border-rose-700"
                }`}
              >
                {product.stock > 5
                  ? "In Stock"
                  : product.stock > 0
                  ? "Limited"
                  : "Out of Stock"}
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* ACTION BUTTON */}
      <div className="pt-4 mt-2 border-t border-border/60">
        <button
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white transition-all flex items-center justify-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
        >
          <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
          <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
