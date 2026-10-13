import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Package, Clock, ShieldCheck, ArrowRight, Truck } from "lucide-react";

const PaymentResultClient = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status") ?? "unknown";
  const tid = searchParams.get("tid") ?? "";
  const type = searchParams.get("type") ?? "ONLINE";

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-xl w-full glass-panel p-8 sm:p-12 rounded-3xl border border-champagne/30 shadow-2xl text-center space-y-6 animate-fade-in-up">
        {/* SUCCESS (ONLINE / PREPAID) */}
        {status === "SUCCESS" && type === "ONLINE" && (
          <>
            <div className="w-20 h-20 bg-champagne/15 text-champagne border border-champagne/40 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="luxury-pill mx-auto">
                Payment Authorized & Verified
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                Acquisition Confirmed
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              Your transaction has been securely authorized. Our master compounders have received your dossier and are preparing your bespoke formulation for dispatch.
            </p>
          </>
        )}

        {/* SUCCESS (COD) */}
        {status === "SUCCESS" && type === "COD" && (
          <>
            <div className="w-20 h-20 bg-champagne/15 text-champagne border border-champagne/40 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Package className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="luxury-pill mx-auto">
                Cash on Delivery Registered
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                Order Placed Successfully
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              Your order is being packaged with atelier care. Please have the required cash amount ready upon verified concierge delivery to your residence.
            </p>
          </>
        )}

        {/* PENDING */}
        {status === "PENDING" && (
          <>
            <div className="w-20 h-20 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto shadow-xl animate-pulse">
              <Clock className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="luxury-pill mx-auto">
                Awaiting Gateway Settlement
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                Payment Processing
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              We are confirming the transaction with your financial institution. Your order status will update automatically once settled.
            </p>
          </>
        )}

        {/* UNKNOWN / FALLBACK */}
        {status !== "SUCCESS" && status !== "PENDING" && (
          <>
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto text-muted-foreground">
              <ShieldCheck className="w-10 h-10" />
            </div>

            <h1 className="text-2xl font-serif font-bold text-foreground">
              Transaction Logged
            </h1>
            <p className="text-xs text-muted-foreground">
              Your transaction details have been registered with the concierge desk.
            </p>
          </>
        )}

        {/* Transaction ID Pill */}
        <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 text-left text-xs flex items-center justify-between">
          <span className="text-muted-foreground font-medium">Transaction Reference:</span>
          <span className="font-mono font-bold text-champagne select-all">
            {tid || "TXN-" + Date.now().toString(36).toUpperCase()}
          </span>
        </div>

        {/* Concierge Delivery Timeline Step Preview */}
        <div className="p-4 rounded-xl bg-champagne/5 border border-champagne/20 text-left space-y-2 text-xs">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <Truck className="w-4 h-4 text-champagne" />
            <span>Next Steps in the Concierge Pipeline</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            You will receive dispatches with delivery tracking numbers once the package departs the atelier cellar.
          </p>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Link
            to="/orders"
            className="flex-1 py-3.5 gradient-primary text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>View Order Dossier</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/"
            className="flex-1 py-3.5 border border-border/70 hover:border-champagne text-foreground font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center"
          >
            Return to Gallery
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentResultClient;