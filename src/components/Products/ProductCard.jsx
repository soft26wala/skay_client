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
          <div className="space-y-1.5">
            {product.category && (
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.15em] block transition-colors"
                style={{ color: "var(--card-custom-category, #b98822)" }}
              >
                {product.category}
              </span>
            )}

            <h3
              className="text-base font-serif font-bold line-clamp-1 transition-colors"
              style={{ color: "var(--card-custom-text, inherit)" }}
            >
              {product.name}
            </h3>

            {/* RATINGS & REVIEWS */}
            <div className="flex items-center space-x-2 pt-0.5">
              <div className="flex items-center space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(Number(product.ratings) || 0)
                        ? "text-champagne fill-current"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-muted-foreground">
                ({product.review_count || product.reviews?.length || 0})
              </span>
            </div>

            {/* PRICE & STOCK */}
            <div className="flex items-baseline justify-between pt-2">
              <span
                className="text-base sm:text-lg font-serif font-bold"
                style={{ color: "var(--card-custom-price, #b98822)" }}
              >
                {formatPrice(product.price)}
              </span>

              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  product.stock > 5
                    ? "text-green-600 bg-green-500/10 border border-green-500/20"
                    : product.stock > 0
                    ? "text-amber-600 bg-amber-500/10 border border-amber-500/20"
                    : "text-rose-600 bg-rose-500/10 border border-rose-500/20"
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
      <div className="pt-4 mt-2 border-t border-border/40">
        <button
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:brightness-105 hover:shadow-md transition-all flex items-center justify-center space-x-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          style={{
            backgroundColor: "var(--card-custom-btn-bg, #b98822)",
            color: "var(--card-custom-btn-text, #ffffff)",
          }}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
