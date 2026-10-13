import { Star, ShoppingBag, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
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
    <div className="group glass-card border border-border/50 hover:border-champagne/50 rounded-2xl p-4 sm:p-5 transition-all duration-500 flex flex-col justify-between hover:shadow-2xl">
      <div>
        <Link to={`/product/${product.id}`} className="block">
          {/* PRODUCT IMAGE CONTAINER */}
          <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-secondary/60 flex items-center justify-center">
            <img
              src={product.images?.[0]?.url || "/avatar-holder.avif"}
              alt={product.name}
              className="w-full h-full object-contain p-4 group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* LUXURY BADGES */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {isNew && (
                <span className="px-2.5 py-0.5 rounded-full bg-champagne text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                  New Reserve
                </span>
              )}
              {Number(product.ratings) >= 4.5 && (
                <span className="px-2.5 py-0.5 rounded-full bg-black/85 text-champagne border border-champagne/40 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                  Haute Rated
                </span>
              )}
            </div>

            {/* QUICK ADD TO CART ICON BUTTON */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              title="Add to Luxury Bag"
              aria-label="Add to Luxury Bag"
              className="absolute bottom-3 right-3 p-3 rounded-full bg-black/80 backdrop-blur-md border border-champagne/40 text-champagne hover:bg-champagne hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 disabled:opacity-0 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>

          {/* PRODUCT INFO */}
          <div className="space-y-1.5">
            {product.category && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne/80 block">
                {product.category}
              </span>
            )}

            <h3 className="text-base font-serif font-bold text-foreground line-clamp-1 group-hover:text-champagne transition-colors">
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
              <span className="text-lg font-serif font-bold text-champagne">
                ₹{Number(product.price).toFixed(2)}
              </span>

              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  product.stock > 5
                    ? "text-green-400 bg-green-500/10 border border-green-500/20"
                    : product.stock > 0
                    ? "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                    : "text-rose-400 bg-rose-500/10 border border-rose-500/20"
                }`}
              >
                {product.stock > 5
                  ? "In Stock"
                  : product.stock > 0
                  ? "Limited"
                  : "Reserved Out"}
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* ACTION BUTTON */}
      <div className="pt-4 mt-2 border-t border-border/30">
        <button
          disabled={product.stock === 0}
          onClick={handleBuyNow}
          className="w-full py-2.5 rounded-xl gradient-primary text-black font-bold text-xs uppercase tracking-wider hover:glow-on-hover transition-all flex items-center justify-center space-x-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
        >
          <span>{product.stock === 0 ? "Out of Reserve" : "Acquire Now"}</span>
          {product.stock > 0 && <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
