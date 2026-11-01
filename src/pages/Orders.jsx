import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Package,
  Truck,
  Check,
  MapPin,
  Phone,
  PhoneCall,
  MessageSquare,
  Sparkles,
  Star,
  ShieldCheck,
  X,
  AlertCircle,
  Clock,
  ShoppingBag,
  Info,
  Calendar,
  CreditCard,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../store/slices/orderSlice";
import { useCurrency } from "../contexts/CurrencyContext";
import { toast } from "react-toastify";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myOrders, fetchingOrders } = useSelector((state) => state.order);
  const { authUser } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);
  const { formatPrice } = useCurrency();

  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showAddressInfoModal, setShowAddressInfoModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (authUser) {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, authUser]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Demo fallback order if user has not placed an order yet or is browsing
  const sampleOrder = {
    id: "348031073731062945",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    order_status: "Processing",
    total_price: 21.0,
    shipping_price: 0,
    tax_price: 1.05,
    payment_type: "Prepaid",
    payment_status: "Paid",
    shipping_info: {
      full_name: authUser?.name || "Anmol Singh",
      address: "word no. 8 , Village 26ff Gajsinghpur",
      city: "Gajsinghpur",
      state: "Rajasthan",
      pincode: "335024",
      country: "India",
      phone: authUser?.phone || "6376930459",
    },
    order_items: [
      {
        order_item_id: "demo-item-1",
        title: "Glycerine Soap Base for Soap Making - Pure & Natural",
        price: 21.0,
        quantity: 1,
        image:
          products?.[0]?.images?.[0]?.url ||
          "https://res.cloudinary.com/deuihz0dq/image/upload/v1793279452/Ecommerce_Product_Images/ynxc59w1tadnoruq3yaj.png",
        variant: "Free Size • Prepaid",
        returnPolicy: "Only wrong/defect item returns",
      },
    ],
  };

  const ordersList =
    myOrders && myOrders.length > 0 ? myOrders : [sampleOrder];
  const activeOrder = ordersList[selectedOrderIndex] || ordersList[0];

  // Calculate timeline milestone dates based on order creation
  const orderDate = new Date(activeOrder.created_at || Date.now());
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  const formatDeliveryDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const orderedDateStr = formatDate(orderDate);
  const shippedDate = new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000);
  const shippedDateStr = formatDate(shippedDate);
  const outForDeliveryDate = new Date(
    orderDate.getTime() + 6 * 24 * 60 * 60 * 1000
  );
  const outForDeliveryDateStr = formatDate(outForDeliveryDate);
  const deliveryDate = new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const deliveryDateStr = formatDate(deliveryDate);
  const fullEstimatedDelivery = formatDeliveryDate(deliveryDate);

  // Status mapping
  const currentStatus = isCancelled
    ? "Cancelled"
    : activeOrder.order_status || "Processing";

  const getStepProgress = () => {
    switch (currentStatus) {
      case "Processing":
      case "Order Placed":
        return { step: 1, percent: 18, label: "Order Packed" };
      case "Shipped":
        return { step: 2, percent: 45, label: "Shipped & In Transit" };
      case "Out for Delivery":
        return { step: 3, percent: 75, label: "Out for Delivery" };
      case "Delivered":
        return { step: 4, percent: 100, label: "Delivered" };
      case "Cancelled":
        return { step: -1, percent: 0, label: "Order Cancelled" };
      default:
        return { step: 1, percent: 18, label: "Order Packed" };
    }
  };

  const progress = getStepProgress();

  const handleCancelOrder = () => {
    if (!cancelReason) {
      toast.error("Please select a reason for cancellation.");
      return;
    }
    setIsCancelled(true);
    setShowCancelModal(false);
    toast.success("Order cancellation requested successfully.");
  };

  const mainItem =
    activeOrder.order_items?.[0] || sampleOrder.order_items[0];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#F7F8FA] dark:bg-background text-foreground transition-colors">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 space-y-3.5">
        
        {/* ======================================================== */}
        {/* 1. TOP APP BAR / HEADER */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl px-4 py-3.5 shadow-sm flex items-center justify-between sticky top-20 z-20 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 -ml-1 rounded-full hover:bg-slate-100 dark:hover:bg-secondary text-slate-700 dark:text-foreground transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-bold tracking-wide uppercase text-slate-800 dark:text-foreground">
              Order Details
            </h1>
          </div>

          <button
            onClick={() => setShowHelpModal(true)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold text-[#800080] dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 transition-all shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>HELP</span>
          </button>
        </div>

        {/* MULTIPLE ORDERS SELECTOR TAB (If user has multiple orders) */}
        {ordersList.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-hide">
            <span className="text-[11px] font-bold text-slate-500 uppercase shrink-0 pl-1">
              Your Orders:
            </span>
            {ordersList.map((ord, idx) => (
              <button
                key={ord.id}
                onClick={() => setSelectedOrderIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedOrderIndex === idx
                    ? "bg-[#800080] text-white shadow-sm"
                    : "bg-white dark:bg-card border border-slate-200 dark:border-border text-slate-600 dark:text-muted-foreground hover:border-purple-300"
                }`}
              >
                #{ord.id.slice(0, 8)}...
              </button>
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. PRODUCT / ITEM CARD */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-3.5">
            {/* Product Thumbnail */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 dark:bg-secondary/60 border border-slate-200 dark:border-border overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
              <img
                src={mainItem.image || "/avatar-holder.avif"}
                alt={mainItem.title}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/avatar-holder.avif";
                }}
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 space-y-1">
              {/* Order Number Row with Chevron */}
              <div className="flex items-center justify-between text-slate-800 dark:text-foreground">
                <span className="text-xs sm:text-sm font-bold truncate pr-2">
                  Order #{activeOrder.id}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </div>

              {/* Title */}
              <h2 className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium line-clamp-2 leading-snug">
                {mainItem.title}
              </h2>

              {/* Variant / Prepaid Tag */}
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {mainItem.variant ||
                  `Qty: ${mainItem.quantity} • ${activeOrder.payment_type || "Prepaid"}`}
              </p>

              {/* Return Policy Notice */}
              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                <RotateCcw className="w-3 h-3 text-slate-400 shrink-0" />
                <span>
                  {mainItem.returnPolicy || "7 Days Easy Returns & Replacement"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. ORDER STATUS & HORIZONTAL TRACKING SECTION */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 sm:p-5 shadow-sm space-y-5">
          {/* Status Header */}
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center text-orange-600 dark:text-orange-400 flex-shrink-0">
              {currentStatus === "Delivered" ? (
                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
              ) : currentStatus === "Cancelled" ? (
                <X className="w-5 h-5 text-rose-600 stroke-[3]" />
              ) : (
                <Package className="w-5 h-5 text-orange-500" />
              )}
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-foreground">
                {currentStatus === "Cancelled"
                  ? "Order Cancelled"
                  : currentStatus === "Delivered"
                  ? "Order Delivered"
                  : "Order Placed"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentStatus === "Delivered"
                  ? `Delivered on ${deliveryDateStr}`
                  : currentStatus === "Cancelled"
                  ? "Order was cancelled upon customer request"
                  : `Delivery by ${fullEstimatedDelivery}`}
              </p>
            </div>
          </div>

          {/* ==================================================== */}
          {/* HORIZONTAL TIMELINE TRACKER WITH ACTIVE TOOLTIP BADGE */}
          {/* ==================================================== */}
          {currentStatus !== "Cancelled" && (
            <div className="pt-8 pb-2 px-2 sm:px-4">
              <div className="relative">
                {/* FLOATING ACTIVE STATUS TOOLTIP BUBBLE */}
                <div
                  className="absolute -top-10 transition-all duration-700 ease-out z-10"
                  style={{
                    left: `${progress.percent}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="relative bg-[#2B2E3D] text-white text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg flex items-center space-x-1.5 whitespace-nowrap">
                    <span className="text-orange-400 text-xs">📦</span>
                    <span>{progress.label}</span>
                    {/* Tooltip Downward Arrow Triangle */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#2B2E3D]" />
                  </div>
                </div>

                {/* BACKGROUND PROGRESS LINE */}
                <div className="absolute top-3 left-0 right-0 h-1 bg-slate-200 dark:bg-secondary rounded-full" />

                {/* ACTIVE GREEN PROGRESS LINE */}
                <div
                  className="absolute top-3 left-0 h-1 bg-emerald-600 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress.percent}%` }}
                />

                {/* MOVING TRUCK ICON ON LINE */}
                <div
                  className="absolute top-1 transition-all duration-700 ease-out -translate-y-1.5 z-10"
                  style={{
                    left: `${progress.percent}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                    <Truck className="w-3 h-3" />
                  </div>
                </div>

                {/* 4 MILESTONE NODES */}
                <div className="relative flex justify-between items-start text-center">
                  {/* Step 1: Ordered */}
                  <div className="flex flex-col items-center w-20">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors z-10 ${
                        progress.step >= 1
                          ? "bg-emerald-600 text-white shadow"
                          : "bg-slate-200 dark:bg-secondary text-slate-400 border border-slate-300"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-foreground mt-2">
                      Ordered
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {orderedDateStr}
                    </span>
                  </div>

                  {/* Step 2: Shipped */}
                  <div className="flex flex-col items-center w-20">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors z-10 ${
                        progress.step >= 2
                          ? "bg-emerald-600 text-white shadow"
                          : "bg-purple-100 dark:bg-purple-950/60 text-[#800080] dark:text-purple-400 border border-purple-300 dark:border-purple-800"
                      }`}
                    >
                      {progress.step >= 2 ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <Check className="w-3.5 h-3.5 opacity-60" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-foreground mt-2">
                      Shipped
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {shippedDateStr}
                    </span>
                  </div>

                  {/* Step 3: Out for Delivery */}
                  <div className="flex flex-col items-center w-24">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors z-10 ${
                        progress.step >= 3
                          ? "bg-emerald-600 text-white shadow"
                          : "bg-purple-100 dark:bg-purple-950/60 text-[#800080] dark:text-purple-400 border border-purple-300 dark:border-purple-800"
                      }`}
                    >
                      {progress.step >= 3 ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <Check className="w-3.5 h-3.5 opacity-60" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-foreground mt-2">
                      Out for Delivery
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {outForDeliveryDateStr}
                    </span>
                  </div>

                  {/* Step 4: Delivery */}
                  <div className="flex flex-col items-center w-20">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors z-10 ${
                        progress.step >= 4
                          ? "bg-emerald-600 text-white shadow"
                          : "bg-purple-100 dark:bg-purple-950/60 text-[#800080] dark:text-purple-400 border border-purple-300 dark:border-purple-800"
                      }`}
                    >
                      {progress.step >= 4 ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <Check className="w-3.5 h-3.5 opacity-60" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-foreground mt-2">
                      Delivery
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {deliveryDateStr}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SOCIAL PROOF BANNER */}
          <div className="bg-[#EEF4FF] dark:bg-blue-950/30 border border-[#D3E2FF] dark:border-blue-900/40 rounded-xl px-4 py-2.5 flex items-center space-x-2 text-xs text-blue-900 dark:text-blue-300 font-medium">
            <span className="w-5 h-5 rounded-full bg-blue-200 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-200 text-xs shrink-0">
              ★
            </span>
            <span>17000+ Users rated 4 star for this product</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. CANCELLATION BAR & ACTIONS */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl px-4 py-3.5 shadow-sm flex items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            {isCancelled
              ? "This order has been cancelled"
              : "Cancellation available till shipping!"}
          </p>

          {!isCancelled && currentStatus !== "Delivered" && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="px-4 py-2 rounded-xl border-2 border-[#800080] text-[#800080] dark:text-purple-300 dark:border-purple-400 font-bold text-xs uppercase tracking-wider hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all shrink-0 active:scale-95"
            >
              Cancel Order
            </button>
          )}
        </div>

        {/* ======================================================== */}
        {/* 5. DELIVERY ADDRESS CARD */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <MapPin className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-foreground">
              Delivery Address
            </h3>
          </div>

          {/* Details */}
          <div className="pl-9 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <p className="font-bold text-slate-800 dark:text-foreground text-sm">
              {activeOrder.shipping_info?.full_name || "Anmol Singh"}
            </p>
            <p className="leading-relaxed">
              {activeOrder.shipping_info?.address ||
                "word no. 8 , Village 26ff Gajsinghpur"}
              {activeOrder.shipping_info?.city
                ? ` , ${activeOrder.shipping_info.city}`
                : " , Gajsinghpur"}
              {activeOrder.shipping_info?.state
                ? ` , ${activeOrder.shipping_info.state}`
                : " , Rajasthan"}
              {activeOrder.shipping_info?.pincode
                ? ` , ${activeOrder.shipping_info.pincode}`
                : " , 335024"}
            </p>
            <p className="font-medium text-slate-800 dark:text-foreground pt-1">
              {activeOrder.shipping_info?.phone || "6376930459"}
            </p>
          </div>

          {/* Address Lock Notice & Know More Link */}
          <div className="pt-3 border-t border-slate-100 dark:border-border/60 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Address change unavailable!
            </span>
            <button
              onClick={() => setShowAddressInfoModal(true)}
              className="font-bold text-[#800080] dark:text-purple-400 hover:underline tracking-wider uppercase text-[11px]"
            >
              KNOW MORE
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. PRICE DETAILS & ORDER SUMMARY */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-foreground flex items-center justify-between">
            <span>Price Details</span>
            <span className="text-[11px] font-normal text-slate-500">
              {activeOrder.payment_type || "Prepaid"}
            </span>
          </h3>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex justify-between">
              <span>List Price</span>
              <span>{formatPrice(activeOrder.total_price)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-emerald-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (GST/PST)</span>
              <span>
                {formatPrice(activeOrder.tax_price || 0)}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-border flex justify-between items-baseline font-bold text-sm text-slate-900 dark:text-foreground">
              <span>Total Amount</span>
              <span className="text-base text-emerald-700 dark:text-emerald-400">
                {formatPrice(activeOrder.total_price)}
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 7. MAHA SAVER / RECOMMENDED PRODUCTS SECTION */}
        {/* ======================================================== */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-slate-900 dark:text-foreground">
              Meesho Maha Saver
            </h2>
            <Link
              to="/products"
              className="text-xs font-bold text-[#800080] dark:text-purple-400 hover:underline uppercase tracking-wider"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(products && products.length > 0
              ? products.slice(0, 3)
              : [
                  {
                    id: "rec-1",
                    name: "Herbal Extract Hair Oil",
                    price: "18.00",
                    image: "/new/hero/img2.png",
                  },
                  {
                    id: "rec-2",
                    name: "Artisanal Body Polish",
                    price: "24.00",
                    image: "/new/hero/img3.png",
                  },
                  {
                    id: "rec-3",
                    name: "Botanical Restorative Drops",
                    price: "19.50",
                    image: "/new/hero/img1.png",
                  },
                ]
            ).map((prod) => (
              <Link
                key={prod.id}
                to={`/product/${prod.id}`}
                className="group bg-white dark:bg-card border border-slate-200 dark:border-border hover:border-purple-400 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square rounded-xl bg-slate-50 dark:bg-secondary/40 overflow-hidden mb-2 p-2 flex items-center justify-center">
                  <img
                    src={prod.images?.[0]?.url || prod.image || "/avatar-holder.avif"}
                    alt={prod.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-black uppercase">
                    Sale
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800 dark:text-foreground line-clamp-1 group-hover:text-purple-700">
                    {prod.name}
                  </h4>
                  <p className="text-xs font-bold text-emerald-600 mt-1">
                    {formatPrice(prod.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* HELP MODAL */}
      {/* ======================================================== */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-border">
              <div className="flex items-center space-x-2 text-[#800080] dark:text-purple-400">
                <PhoneCall className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-800 dark:text-foreground">
                  Need Help With Order?
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-secondary text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Our concierge support team is available 24/7 to resolve order, shipping, or cancellation inquiries.
            </p>

            <div className="space-y-2.5">
              <a
                href="tel:+916376930459"
                className="flex items-center space-x-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-[#800080] dark:text-purple-300 text-xs font-bold hover:bg-purple-100 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Support (+91 6376930459)</span>
              </a>

              <a
                href="https://wa.me/916376930459?text=Hi%2C%20I%20need%20help%20with%20my%20order"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                to="/contact"
                onClick={() => setShowHelpModal(false)}
                className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-secondary border border-slate-200 dark:border-border text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>Contact Page & FAQs</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CANCEL ORDER CONFIRMATION MODAL */}
      {/* ======================================================== */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-border">
              <h3 className="font-bold text-base text-slate-800 dark:text-foreground">
                Cancel Order #{activeOrder.id.slice(0, 8)}?
              </h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-secondary text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Please select the reason for cancelling this order:
            </p>

            <div className="space-y-2">
              {[
                "Ordered by mistake",
                "Expected delivery date is too long",
                "Need to change delivery address",
                "Found better price elsewhere",
                "Item no longer needed",
              ].map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center space-x-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    cancelReason === reason
                      ? "border-[#800080] bg-purple-50/70 dark:bg-purple-950/40 text-[#800080] dark:text-purple-300 font-semibold"
                      : "border-slate-200 dark:border-border hover:bg-slate-50 dark:hover:bg-secondary text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="cancel_reason"
                    value={reason}
                    checked={cancelReason === reason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="accent-[#800080]"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-border text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                Don't Cancel
              </button>
              <button
                onClick={handleCancelOrder}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ADDRESS POLICY "KNOW MORE" MODAL */}
      {/* ======================================================== */}
      {showAddressInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-border">
              <h3 className="font-bold text-base text-slate-800 dark:text-foreground">
                Address Modification Policy
              </h3>
              <button
                onClick={() => setShowAddressInfoModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-secondary text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
              <p>
                Once an order has been verified and processed by our fulfillment center, direct address edits are locked to prevent shipping delays or courier misrouting.
              </p>
              <p>
                If you need to change your address urgently, you can cancel this order before dispatch and place a new one with your updated address, or contact support directly.
              </p>
            </div>

            <button
              onClick={() => setShowAddressInfoModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#800080] text-white text-xs font-bold hover:bg-purple-900 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Orders;
