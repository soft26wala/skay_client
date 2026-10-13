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
import { fetchProductDetails } from "../store/slices/productSlice";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

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
      behavior: "smooth",
    });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ product, quantity }));
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
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-champagne transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-champagne transition-colors">
            Collections
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs">
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
                  <span className="px-3 py-1 rounded-full bg-champagne text-black text-[10px] font-black uppercase tracking-wider shadow-lg">
                    New Harvest Reserve
                  </span>
                )}
                {Number(product.ratings) >= 4.5 && (
                  <span className="px-3 py-1 rounded-full bg-black/85 text-champagne border border-champagne/40 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
                    Haute Rated
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
                <span className="luxury-pill">
                  <Sparkles className="w-3 h-3 text-champagne" />
                  <span>{product.category}</span>
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Rating stars & review link */}
              <div className="flex items-center space-x-3 pt-1">
                <div className="flex items-center space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(Number(product.ratings) || 0)
                          ? "text-champagne fill-current"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-foreground">
                  {Number(product.ratings || 0).toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({productReviews?.length || product.review_count || 0} reviews)
                </span>
              </div>
            </div>

            {/* Price & Stock Status */}
            <div className="flex items-baseline justify-between p-5 rounded-2xl bg-secondary/40 border border-border/50">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                  Bespoke Acquisition Price
                </span>
                <span className="text-3xl font-serif font-bold text-champagne">
                  ₹{Number(product.price).toFixed(2)}
                </span>
              </div>

              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
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
                  ? "Limited Reserve"
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity Stepper & Acquisition Buttons */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Quantity
                </span>
                <div className="flex items-center space-x-3 border border-border/60 rounded-xl p-1 bg-secondary/40">
                  <button
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-champagne/20 text-muted-foreground disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-champagne/20 text-muted-foreground transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <button
                  disabled={product.stock === 0}
                  onClick={handleAddToCart}
                  className="py-4 rounded-xl border border-champagne/40 bg-secondary/80 hover:bg-secondary text-foreground font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 disabled:opacity-40"
                >
                  <ShoppingBag className="w-4 h-4 text-champagne" />
                  <span>Add to Bag</span>
                </button>

                <button
                  disabled={product.stock === 0}
                  onClick={handleBuyNow}
                  className="py-4 rounded-xl gradient-primary text-black font-bold text-xs uppercase tracking-wider hover:glow-on-hover transition-all flex items-center justify-center space-x-2 disabled:opacity-40 shadow-xl"
                >
                  <span>Acquire Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Wishlist & Share actions */}
              <div className="flex items-center space-x-6 pt-3 text-xs text-muted-foreground">
                <button
                  onClick={toggleWishlist}
                  className="flex items-center space-x-1.5 hover:text-champagne transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? "text-rose-500 fill-current" : ""
                    }`}
                  />
                  <span>
                    {isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
                  </span>
                </button>

                <button
                  onClick={handleCopyURL}
                  className="flex items-center space-x-1.5 hover:text-champagne transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Formulation</span>
                </button>
              </div>
            </div>

            {/* Atelier Concierge Guarantees */}
            <div className="pt-6 border-t border-border/40 space-y-3 text-xs text-muted-foreground">
              <div className="flex items-center space-x-3">
                <Truck className="w-4 h-4 text-champagne flex-shrink-0" />
                <span>Complimentary Concierge Shipping on Orders Above ₹400</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-4 h-4 text-champagne flex-shrink-0" />
                <span>100% Certified Authentic Botanical Alchemy</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-champagne flex-shrink-0" />
                <span>Hand-Packaged & Sealed in Dark Violet Glass</span>
              </div>
            </div>
          </div>
        </div>

        {/* TABS: Description, Ritual (How to Use), Reviews */}
        <div className="glass-panel rounded-3xl border border-champagne/20 shadow-xl overflow-hidden">
          <div className="flex border-b border-border/50 bg-secondary/20 overflow-x-auto scrollbar-hide">
            {[
              { id: "description", label: "Artisanal Formulation" },
              { id: "how-to-use", label: "Application Ritual" },
              {
                id: "reviews",
                label: `Client Testimonials (${productReviews?.length || 0})`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-champagne text-champagne bg-secondary/50 font-bold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 sm:p-12">
            {activeTab === "description" && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-xl font-serif font-bold text-foreground">
                  The Botanical Formula & Lineage
                </h3>
                <div
                  className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line"
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
