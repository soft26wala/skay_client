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
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyOrders } from "../store/slices/orderSlice";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All");
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "Processing":
        return {
          icon: <Clock className="w-3.5 h-3.5 text-amber-400" />,
          style: "bg-amber-400/10 text-amber-300 border-amber-400/30",
          label: "In Atelier Preparation",
        };
      case "Shipped":
        return {
          icon: <Truck className="w-3.5 h-3.5 text-blue-400" />,
          style: "bg-blue-400/10 text-blue-300 border-blue-400/30",
          label: "En Route with Concierge",
        };
      case "Delivered":
        return {
          icon: <CheckCircle className="w-3.5 h-3.5 text-green-400" />,
          style: "bg-green-400/10 text-green-300 border-green-400/30",
          label: "Delivered to Residence",
        };
      case "Cancelled":
        return {
          icon: <XCircle className="w-3.5 h-3.5 text-rose-400" />,
          style: "bg-rose-400/10 text-rose-300 border-rose-400/30",
          label: "Order Cancelled",
        };
      default:
        return {
          icon: <Package className="w-3.5 h-3.5 text-champagne" />,
          style: "bg-champagne/10 text-champagne border-champagne/30",
          label: status || "Processing",
        };
    }
  };

  const statusArray = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

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
              Confidential log of your acquisitions and delivery milestones.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-muted-foreground">Account Client:</span>
            <p className="text-sm font-serif font-bold text-champagne">
              {authUser?.name || authUser?.email}
            </p>
          </div>
        </div>

        {/* Status Filters */}
        <div className="glass-card p-4 mb-8 border border-border/60 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Filter by Milestone:
          </span>
          <div className="flex flex-wrap gap-2">
            {statusArray.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                  statusFilter === st
                    ? "gradient-primary text-black font-bold shadow-md"
                    : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/50"
                }`}
              >
                {st}
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
                className="glass-panel p-6 border border-border/40 animate-pulse space-y-4 rounded-2xl"
              >
                <div className="h-6 bg-secondary w-1/3 rounded" />
                <div className="h-16 bg-secondary w-full rounded-xl" />
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
              return (
                <div
                  key={order.id}
                  className="glass-card p-6 sm:p-8 rounded-3xl border border-border/60 hover:border-champagne/40 transition-all space-y-6"
                >
                  {/* Order Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-base sm:text-lg font-serif font-bold text-foreground">
                          Acquisition #{order.id}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${badge.style}`}
                        >
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Commissioned on{" "}
                        {new Date(order.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                        Total Amount
                      </span>
                      <span className="text-xl font-serif font-bold text-champagne">
                        ₹{Number(order.total_price).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    {order.order_items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-4 p-3.5 rounded-2xl bg-secondary/40 border border-border/40"
                      >
                        <img
                          src={item.image || "/avatar-holder.avif"}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-xl border border-border/40 flex-shrink-0"
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
                            ₹{Number(item.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer & Reassurance */}
                  <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-champagne" />
                      <span>Insured Concierge Delivery Tracking</span>
                    </span>

                    <Link
                      to="/contact"
                      className="text-xs text-champagne hover:underline font-semibold"
                    >
                      Inquire About This Order →
                    </Link>
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
