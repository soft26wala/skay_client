import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Star,
  ShoppingBag,
  Heart,
  Share2,
  Plus,
  Minus,
  Loader,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
  Clock,
  RotateCcw,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ReviewsContainer from "../components/Products/ReviewsContainer";
import HowToUseSection from "../components/Products/HowToUseSection";
import { addToCart } from "../store/slices/cartSlice";
import { toggleCart } from "../store/slices/popupSlice";
import { fetchProductDetails } from "../store/slices/productSlice";
import { useCurrency } from "../contexts/CurrencyContext";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { formatPrice } = useCurrency();

  const product = useSelector((state) => state.product?.productDetails);
  const { loading, productReviews } = useSelector((state) => state.product);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ product, quantity }));
    dispatch(toggleCart());
    toast.success(`Added ${quantity} × "${product.name}" to your bag.`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    dispatch(addToCart({ product, quantity }));
    navigateTo("/payment");
  };

  const handleCopyURL = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("Bespoke product link copied to clipboard.");
      })
      .catch(() => {
        toast.info("Could not access clipboard.");
      });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted
        ? "Removed from your private wishlist."
        : "Added to your private wishlist."
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="w-8 h-8 text-champagne animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Retrieving Atelier Formulation...
          </p>
        </div>
      </div>
    );
  }

  if (!product || !product.id) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4">
        <div className="glass-panel text-center p-10 max-w-lg w-full border border-border/60 shadow-2xl">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-3">
            Formulation Not Found
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
            The bespoke creation you are inquiring about may have been retired or reserved.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl gradient-primary text-black font-bold text-xs uppercase tracking-wider hover:glow-on-hover transition-all"
          >
            <span>Return to Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const isNew =
    product.created_at &&
    new Date() - new Date(product.created_at) < 30 * 24 * 60 * 60 * 1000;

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-8">
          <Link to="/" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link to="/products" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
            Collections
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-950 dark:text-white font-bold truncate max-w-xs">
            {product.name}
          </span>
        </div>

        {/* Product Overview: Grid 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* LEFT: BESPOKE IMAGE GALLERY (Col 1 to 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-champagne/25 shadow-2xl relative overflow-hidden bg-secondary/30 flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
              <img
                src={
                  product.images?.[selectedImage]?.url ||
                  product.images?.[0]?.url ||
                  "/avatar-holder.avif"
                }
                alt={product.name}
                className="w-full h-auto max-h-[440px] object-contain transition-all duration-700 hover:scale-105"
              />

              {/* Badges on image */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {isNew && (
                  <span className="px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                    New Arrival
                  </span>
                )}
                {Number(product.ratings) >= 4.5 && (
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-amber-950 border border-amber-300 text-xs font-black uppercase tracking-wider shadow-md">
                    Top Rated
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden p-1.5 transition-all flex-shrink-0 ${
                      selectedImage === index
                        ? "border-2 border-champagne shadow-lg scale-105"
                        : "border border-border/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image?.url}
                      alt={`${product.name} angle ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: BESPOKE DETAILS & ACQUISITION (Col 8 to 12) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              {product.category && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-amber-100 text-amber-950 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-700 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  <span>{product.category}</span>
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 dark:text-white leading-tight tracking-tight capitalize">
                {product.name}
              </h1>

              {/* Rating stars & review link */}
              <div className="flex items-center space-x-3 pt-1.5">
                <div className="flex items-center space-x-1" aria-label={`Rating: ${Number(product.ratings || 0).toFixed(1)} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => {
                    const ratingVal = Number(product.ratings) || 0;
                    const isFilled = i < Math.floor(ratingVal);
                    return (
                      <Star
                        key={i}
                        className={`w-5 h-5 transition-transform ${
                          isFilled
                            ? "text-amber-500 fill-amber-400 drop-shadow-xs"
                            : "text-amber-400 fill-amber-100/70 stroke-[1.8] dark:fill-amber-950/40"
                        }`}
                      />
                    );
                  })}
                </div>
                <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  {Number(product.ratings || 0).toFixed(1)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("reviews");
                    const revEl = document.getElementById("product-tabs");
                    if (revEl) revEl.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 underline underline-offset-4 hover:text-amber-700 dark:hover:text-amber-400 cursor-pointer"
                >
                  ({productReviews?.length || product.review_count || 0} customer reviews)
                </button>
              </div>
            </div>

            {/* Price & Stock Status */}
            <div className="flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-secondary/60 border-2 border-amber-500/25 shadow-sm">
              <div>
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                  Price
                </span>
                <span className="text-3xl sm:text-4xl font-serif font-black text-slate-900 dark:text-amber-300 tracking-tight">
                  {formatPrice(product.price)}
                </span>
              </div>

              <span
                className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider px-4 py-2 rounded-xl shadow-xs border ${
                  product.stock > 5
                    ? "text-emerald-950 bg-emerald-100 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-700"
                    : product.stock > 0
                    ? "text-amber-950 bg-amber-100 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700"
                    : "text-rose-950 bg-rose-100 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200 dark:border-rose-700"
                }`}
              >
                {product.stock > 5
                  ? "● In Stock"
                  : product.stock > 0
                  ? "● Low Stock"
                  : "● Out of Stock"}
              </span>
            </div>

            {/* Quantity Stepper & Buttons */}
            <div className="space-y-5">
              <div className="flex items-center space-x-4">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
                  Quantity
                </span>
                <div className="flex items-center space-x-3 border-2 border-slate-300 dark:border-border/60 rounded-xl p-1 bg-white dark:bg-secondary/40 shadow-xs">
                  <button
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-champagne/20 text-slate-900 dark:text-foreground disabled:opacity-30 transition-colors font-bold"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <span className="w-10 text-center text-base font-black text-slate-900 dark:text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-champagne/20 text-slate-900 dark:text-foreground transition-colors font-bold"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <button
                  disabled={product.stock === 0}
                  onClick={handleAddToCart}
                  className="py-4 px-6 rounded-xl border-2 border-slate-800/30 hover:border-slate-900 bg-white hover:bg-slate-50 dark:bg-secondary dark:border-border text-slate-950 dark:text-white font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2.5 disabled:opacity-40 shadow-sm"
                >
                  <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400 stroke-[2.2]" />
                  <span>Add to Cart</span>
                </button>

                <button
                  disabled={product.stock === 0}
                  onClick={handleBuyNow}
                  className="py-4 px-6 rounded-xl gradient-primary text-slate-950 font-black text-sm uppercase tracking-wider hover:glow-on-hover transition-all flex items-center justify-center space-x-2.5 disabled:opacity-40 shadow-lg"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Wishlist & Share actions */}
              <div className="flex items-center space-x-8 pt-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                <button
                  onClick={toggleWishlist}
                  className="flex items-center space-x-2 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? "text-rose-500 fill-current" : "stroke-[2]"
                    }`}
                  />
                  <span>
                    {isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
                  </span>
                </button>

                <button
                  onClick={handleCopyURL}
                  className="flex items-center space-x-2 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                >
                  <Share2 className="w-5 h-5 stroke-[2]" />
                  <span>Share Product</span>
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="pt-6 border-t-2 border-slate-200 dark:border-border/50 space-y-3.5 text-sm font-bold text-slate-900 dark:text-slate-100">
              <div className="flex items-center space-x-3.5 bg-white/70 dark:bg-secondary/30 p-2.5 rounded-xl border border-slate-200/80 dark:border-border/30">
                <Truck className="w-5 h-5 text-amber-700 dark:text-amber-400 flex-shrink-0 stroke-[2.2]" />
                <span>Free Express Shipping on Orders Above $75</span>
              </div>
              <div className="flex items-center space-x-3.5 bg-white/70 dark:bg-secondary/30 p-2.5 rounded-xl border border-slate-200/80 dark:border-border/30">
                <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0 stroke-[2.2]" />
                <span>100% Quality Guaranteed Household Essentials</span>
              </div>
              <div className="flex items-center space-x-3.5 bg-white/70 dark:bg-secondary/30 p-2.5 rounded-xl border border-slate-200/80 dark:border-border/30">
                <Clock className="w-5 h-5 text-blue-700 dark:text-blue-400 flex-shrink-0 stroke-[2.2]" />
                <span>Fast 2-4 Business Days Nationwide Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* TABS: Description, Ritual (How to Use), Reviews */}
        <div id="product-tabs" className="glass-panel rounded-3xl border-2 border-amber-500/20 shadow-xl overflow-hidden mt-12">
          <div className="flex border-b-2 border-slate-200 dark:border-border/50 bg-secondary/40 overflow-x-auto scrollbar-hide">
            {[
              { id: "description", label: "Product Details" },
              { id: "how-to-use", label: "Care & Instructions" },
              {
                id: "reviews",
                label: `Customer Reviews (${productReviews?.length || 0})`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-5 text-sm font-extrabold uppercase tracking-wider transition-all border-b-4 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-amber-600 text-amber-950 bg-white/90 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-400 font-black shadow-xs"
                    : "border-transparent text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 sm:p-12">
            {activeTab === "description" && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-2xl font-serif font-black text-slate-900 dark:text-white">
                  Product Overview
                </h3>
                <div
                  className="text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line"
                >
                  {product.description?.replace(/\\n/g, "\n")}
                </div>
              </div>
            )}

            {activeTab === "how-to-use" && (
              <div className="max-w-3xl">
                <HowToUseSection steps={product.how_to_use} />
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-3xl">
                <ReviewsContainer
                  product={product}
                  productReviews={productReviews}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
