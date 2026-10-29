import { useEffect, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  MapPin,
  CreditCard,
  Phone,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyOrders } from "../store/slices/orderSlice";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { myOrders, fetchingOrders } = useSelector((state) => state.order);
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, authUser]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!authUser) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4">
        <div className="glass-panel text-center p-10 max-w-lg w-full border border-champagne/30 shadow-2xl">
          <Package className="w-12 h-12 text-champagne mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
            Authentication Required
          </h2>
          <p className="text-xs text-muted-foreground mb-6">
            Please identify yourself to view your confidential order history.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-black font-bold text-xs uppercase tracking-wider hover:glow-on-hover transition-all"
          >
            <span>Browse Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const filterOrders = (myOrders || []).filter(
    (order) => statusFilter === "All" || order.order_status === statusFilter
  );

  // Distinct color palettes and styling for each order status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Processing":
        return {
          icon: <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />,
          style:
            "bg-amber-500/15 text-amber-300 border-amber-400/50 shadow-[0_0_14px_rgba(245,158,11,0.25)]",
          cardBorder:
            "hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]",
          dotColor: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
          accentText: "text-amber-400",
          label: "Preparing Order",
          stepIndex: 1, // 0: Placed, 1: Processing, 2: Shipped, 3: Delivered
        };
      case "Shipped":
        return {
          icon: <Truck className="w-3.5 h-3.5 text-sky-300 animate-bounce" />,
          style:
            "bg-sky-500/15 text-sky-300 border-sky-400/50 shadow-[0_0_14px_rgba(14,165,233,0.25)]",
          cardBorder:
            "hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.12)]",
          dotColor: "bg-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.6)]",
          accentText: "text-sky-400",
          label: "On The Way (Shipped)",
          stepIndex: 2,
        };
      case "Delivered":
        return {
          icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />,
          style:
            "bg-emerald-500/15 text-emerald-300 border-emerald-400/50 shadow-[0_0_14px_rgba(16,185,129,0.25)]",
          cardBorder:
            "hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]",
          dotColor: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
          accentText: "text-emerald-400",
          label: "Delivered",
          stepIndex: 3,
        };
      case "Cancelled":
        return {
          icon: <XCircle className="w-3.5 h-3.5 text-rose-300" />,
          style:
            "bg-rose-500/15 text-rose-300 border-rose-400/50 shadow-[0_0_14px_rgba(244,63,94,0.25)]",
          cardBorder:
            "hover:border-rose-400/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]",
          dotColor: "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]",
          accentText: "text-rose-400",
          label: "Cancelled",
          stepIndex: -1,
        };
      default:
        return {
          icon: <Package className="w-3.5 h-3.5 text-champagne" />,
          style:
            "bg-champagne/15 text-champagne border-champagne/40 shadow-[0_0_12px_rgba(212,175,55,0.2)]",
          cardBorder: "hover:border-champagne/50",
          dotColor: "bg-champagne",
          accentText: "text-champagne",
          label: status || "Processing",
          stepIndex: 1,
        };
    }
  };

  const statusFilters = [
    {
      id: "All",
      label: "All Orders",
      activeStyle: "gradient-primary text-black font-bold shadow-md",
      dot: "bg-champagne",
    },
    {
      id: "Processing",
      label: "Preparing",
      activeStyle:
        "bg-amber-400 text-black font-bold shadow-[0_0_14px_rgba(245,158,11,0.4)]",
      dot: "bg-amber-400",
    },
    {
      id: "Shipped",
      label: "On The Way",
      activeStyle:
        "bg-sky-400 text-black font-bold shadow-[0_0_14px_rgba(14,165,233,0.4)]",
      dot: "bg-sky-400",
    },
    {
      id: "Delivered",
      label: "Delivered",
      activeStyle:
        "bg-emerald-400 text-black font-bold shadow-[0_0_14px_rgba(16,185,129,0.4)]",
      dot: "bg-emerald-400",
    },
    {
      id: "Cancelled",
      label: "Cancelled",
      activeStyle:
        "bg-rose-500 text-white font-bold shadow-[0_0_14px_rgba(244,63,94,0.4)]",
      dot: "bg-rose-400",
    },
  ];

  const trackingSteps = [
    { key: "placed", title: "Order Placed", desc: "Order Confirmed" },
    { key: "processing", title: "Preparing Order", desc: "Packing & Quality Check" },
    { key: "shipped", title: "On The Way", desc: "Dispatched with Courier" },
    { key: "delivered", title: "Delivered", desc: "Delivered to Customer" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-border/40 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="luxury-pill mb-2">
              <Sparkles className="w-3 h-3 text-champagne" />
              <span>Private Dossier</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground tracking-tight">
              Order History & Tracking
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Confidential log of your acquisitions and delivery milestones. Click any order to inspect full tracking dossier.
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs text-muted-foreground">Account Client:</span>
            <p className="text-sm font-serif font-bold text-champagne">
              {authUser?.name || authUser?.email}
            </p>
          </div>
        </div>

        {/* Status Filters with Dedicated Colors */}
        <div className="glass-card p-4 mb-8 border border-border/60 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Filter by Milestone:
          </span>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
                  statusFilter === st.id
                    ? st.activeStyle
                    : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/50"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${st.dot}`} />
                <span>{st.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders Content */}
        {fetchingOrders ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="glass-panel p-6 border border-border/40 animate-pulse space-y-4 rounded-3xl"
              >
                <div className="h-6 bg-secondary w-1/3 rounded" />
                <div className="h-16 bg-secondary w-full rounded-2xl" />
              </div>
            ))}
          </div>
        ) : filterOrders.length === 0 ? (
          /* Empty State */
          <div className="text-center py-24 glass-panel p-10 rounded-3xl border border-border/60">
            <Package className="w-14 h-14 text-champagne/60 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-foreground mb-2">
              No Orders on Record
            </h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
              {statusFilter === "All"
                ? "You have not placed any orders yet. Discover our curated collections to begin your acquisition."
                : `No orders matching milestone "${statusFilter}" were found.`}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-black font-bold text-xs uppercase tracking-wider hover:glow-on-hover transition-all"
            >
              <span>Explore Formulations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {filterOrders.map((order) => {
              const badge = getStatusBadge(order.order_status);
              const isExpanded = expandedOrderId === order.id;

              return (
                <div
                  key={order.id}
                  onClick={() =>
                    setExpandedOrderId((prev) => (prev === order.id ? null : order.id))
                  }
                  className={`glass-card p-6 sm:p-8 rounded-3xl border border-border/60 ${
                    badge.cardBorder
                  } transition-all duration-300 space-y-6 cursor-pointer group relative overflow-hidden select-none ${
                    isExpanded
                      ? "ring-1 ring-champagne/40 shadow-2xl bg-secondary/20"
                      : "hover:bg-secondary/15"
                  }`}
                >
                  {/* Subtle Status Edge Accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      order.order_status === "Processing"
                        ? "bg-amber-400/80"
                        : order.order_status === "Shipped"
                        ? "bg-sky-400/80"
                        : order.order_status === "Delivered"
                        ? "bg-emerald-400/80"
                        : order.order_status === "Cancelled"
                        ? "bg-rose-500/80"
                        : "bg-champagne/60"
                    }`}
                  />

                  {/* Order Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base sm:text-lg font-serif font-bold text-foreground flex items-center gap-2 group-hover:text-champagne transition-colors">
                          <span>Order #{order.id}</span>
                        </h3>

                        {/* Distinct Colored Status Badge */}
                        <span
                          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${badge.style}`}
                        >
                          <span className={`w-2 h-2 rounded-full ${badge.dotColor}`} />
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-champagne/70" />
                        <span>
                          Ordered on{" "}
                          {new Date(order.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center sm:items-end justify-between sm:justify-end gap-6">
                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-muted-foreground uppercase tracking-wider block">
                          Total Amount
                        </span>
                        <span className="text-xl font-serif font-bold text-champagne">
                          ${Number(order.total_price).toFixed(2)}
                        </span>
                      </div>

                      {/* Expand / Collapse Indicator */}
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/50 border border-border/60 text-xs text-champagne font-semibold group-hover:border-champagne/50 group-hover:bg-champagne/10 transition-all">
                        <span className="hidden sm:inline">
                          {isExpanded ? "Collapse" : "Full Dossier"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isExpanded ? "rotate-180 text-champagne" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Items List Preview */}
                  <div className="space-y-3">
                    {order.order_items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-4 p-3.5 rounded-2xl bg-secondary/40 border border-border/40 hover:border-border transition-colors"
                      >
                        <img
                          src={item.image || "/avatar-holder.avif"}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-xl border border-border/40 flex-shrink-0"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/avatar-holder.avif";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate">
                            {item.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-foreground">
                            ${Number(item.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ======================================================== */}
                  {/* EXPANDABLE FULL DOSSIER DETAILS (Triggered by Full Card Click) */}
                  {/* ======================================================== */}
                  {isExpanded && (
                    <div
                      className="pt-6 border-t border-border/50 space-y-6 animate-fade-in"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* 1. Visual Tracking Milestone Steps */}
                      {order.order_status !== "Cancelled" && (
                        <div className="p-5 rounded-2xl bg-secondary/30 border border-border/50 space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-champagne flex items-center gap-2">
                            <Truck className="w-4 h-4 text-champagne" />
                            <span>Order Tracking Timeline</span>
                          </h4>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                            {trackingSteps.map((step, sIdx) => {
                              const isCompleted = sIdx <= badge.stepIndex;
                              const isCurrent = sIdx === badge.stepIndex;

                              return (
                                <div
                                  key={step.key}
                                  className={`p-3 rounded-xl border transition-all ${
                                    isCurrent
                                      ? "bg-champagne/10 border-champagne text-foreground shadow-sm"
                                      : isCompleted
                                      ? "bg-secondary/40 border-border/70 text-foreground"
                                      : "bg-secondary/15 border-border/30 text-muted-foreground opacity-60"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <div
                                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                        isCompleted
                                          ? "bg-champagne text-black"
                                          : "bg-secondary text-muted-foreground border border-border"
                                      }`}
                                    >
                                      {isCompleted ? "✓" : sIdx + 1}
                                    </div>
                                    <span className="text-xs font-bold tracking-tight">
                                      {step.title}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-muted-foreground leading-snug">
                                    {step.desc}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 2. Grid: Shipping Address & Payment Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Shipping Destination */}
                        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50 space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-champagne" />
                            <span>Delivery Address</span>
                          </span>

                          <div className="text-xs space-y-1 text-foreground/90">
                            <p className="font-bold text-sm text-foreground">
                              {order.shipping_info?.full_name || authUser?.name || "Client"}
                            </p>
                            <p className="text-muted-foreground">
                              {order.shipping_info?.address || "Address on file"}
                            </p>
                            <p className="text-muted-foreground">
                              {[
                                order.shipping_info?.city,
                                order.shipping_info?.state,
                                order.shipping_info?.pincode,
                                order.shipping_info?.country,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                            {order.shipping_info?.phone && (
                              <p className="text-muted-foreground flex items-center gap-1 pt-1">
                                <Phone className="w-3 h-3 text-champagne/80" />
                                <span>{order.shipping_info.phone}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Payment & Settlement */}
                        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50 space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5 text-champagne" />
                            <span>Payment Details</span>
                          </span>

                          <div className="text-xs space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Payment Method:</span>
                              <span className="font-semibold text-foreground uppercase tracking-wider">
                                {order.payment_type === "COD" ||
                                order.payment_type === "Cash on Delivery"
                                  ? "Cash on Delivery (COD)"
                                  : "Prepaid Online Transaction"}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Settlement Status:</span>
                              <span
                                className={`font-bold px-2 py-0.5 rounded text-[11px] uppercase ${
                                  order.payment_status === "Paid"
                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                    : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                }`}
                              >
                                {order.payment_status || "Pending Verification"}
                              </span>
                            </div>

                            <div className="pt-2 border-t border-border/40 space-y-1">
                              <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                                <span>Concierge Shipping:</span>
                                <span>
                                  {Number(order.shipping_price || 0) === 0
                                    ? "Complimentary"
                                    : `$${Number(order.shipping_price).toFixed(2)}`}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                                <span>Applicable Taxes (GST/PST):</span>
                                <span>${Number(order.tax_price || 0).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Footer & Reassurance */}
                  <div className="pt-4 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-champagne" />
                      <span>100% Genuine Product • Safe Delivery</span>
                    </span>

                    <div className="flex items-center gap-4">
                      <span className="text-[11px] text-champagne/80 font-medium">
                        {isExpanded ? "Click to collapse" : "Click to view details"}
                      </span>

                      <Link
                        to="/contact"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-champagne hover:underline font-semibold flex items-center gap-1"
                      >
                        <span>Inquire About Order</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
