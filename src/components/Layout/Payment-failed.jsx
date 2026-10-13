import { XCircle, ArrowLeft, RefreshCw, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl border border-destructive/30 shadow-2xl text-center space-y-6 animate-fade-in-up">
        <div className="w-20 h-20 bg-destructive/10 text-destructive border border-destructive/30 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <XCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-destructive bg-destructive/10 px-3 py-1 rounded-full border border-destructive/20 inline-block">
            Transaction Interrupted
          </span>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Payment Unsuccessful
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          The transaction could not be authorized by your financial institution. Your shopping bag remains intact, and no funds were deducted.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            to="/payment"
            className="flex-1 py-3.5 gradient-primary text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Checkout</span>
          </Link>

          <Link
            to="/contact"
            className="flex-1 py-3.5 border border-border/70 hover:border-champagne text-foreground font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Headphones className="w-4 h-4 text-champagne" />
            <span>Concierge Help</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;