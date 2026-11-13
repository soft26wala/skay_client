import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
} from "../../store/slices/cartSlice";
import { toggleCart } from "../../store/slices/popupSlice";
import { useCurrency } from "../../contexts/CurrencyContext";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state) => state.popup);
  const { cart } = useSelector((state) => state.cart);
  const { formatPrice } = useCurrency();

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateCartQuantity({ id, quantity }));
    }
  };

  const total = cart
    ? cart.reduce(
        (sum, item) => sum + (Number(item.product?.price) || 0) * item.quantity,
        0
      )
    : 0;

  const cartItemsCount = cart
    ? cart.reduce((count, item) => count + item.quantity, 0)
    : 0;

  if (!isCartOpen) return null;

  return (
    <>
      {/* BACKDROP OVERLAY */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => dispatch(toggleCart())}
      />

      {/* CART DRAWER */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-background/95 backdrop-blur-2xl border-l border-border/60 shadow-2xl animate-slide-in-right flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shadow-xs">
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-black text-slate-900 dark:text-white">
                Your Shopping Bag
              </h2>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {cartItemsCount} item{cartItemsCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <button
            onClick={() => dispatch(toggleCart())}
            aria-label="Close cart drawer"
            className="p-2 rounded-xl hover:bg-secondary text-slate-700 dark:text-slate-300 hover:text-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FREE SHIPPING PROGRESS NOTICE */}
        {cart.length > 0 && (
          <div className="px-6 py-3 bg-amber-50/90 dark:bg-amber-950/40 border-b border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-800 dark:text-slate-200 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              {total >= 75
                ? "Free Express Shipping unlocked!"
                : `Add $${(75 - total).toFixed(0)} more for Free Shipping`}
            </span>
          </div>
        )}

        {/* ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart && cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-lg font-serif font-bold text-slate-900 dark:text-white mb-1">
                Your Bag is Currently Empty
              </p>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">
                Explore our household & living essentials.
              </p>
              <Link
                to="/products"
                onClick={() => dispatch(toggleCart())}
                className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover transition-all shadow-md"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product?.id}
                className="p-4 rounded-2xl bg-white dark:bg-card border-2 border-slate-200/80 dark:border-border/60 hover:border-amber-400 transition-all flex items-start space-x-4 shadow-xs"
              >
                <img
                  src={
                    item.product?.images?.[0]?.url || "/avatar-holder.avif"
                  }
                  alt={item.product?.name}
                  className="w-18 h-18 sm:w-20 sm:h-20 object-contain rounded-xl border border-slate-200 dark:border-border flex-shrink-0 p-1 bg-slate-50"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.product?.name}
                    </h3>
                    <button
                      onClick={() => dispatch(removeFromCart(item.product?.id))}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm font-black text-slate-950 dark:text-amber-300 mt-1">
                    {formatPrice(item.product?.price)}
                  </p>

                  <div className="flex items-center space-x-2 mt-3">
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(item.product?.id, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-secondary flex items-center justify-center text-slate-900 font-bold disabled:opacity-30 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                    <span className="w-8 text-center text-sm font-black text-slate-900 dark:text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product?.id, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-secondary flex items-center justify-center text-slate-900 font-bold transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER ACTIONS */}
        {cart.length > 0 && (
          <div className="p-6 border-t-2 border-slate-200 dark:border-border/50 bg-white/95 dark:bg-secondary/30 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider font-extrabold">
                Subtotal
              </span>
              <span className="text-2xl font-serif font-black text-slate-950 dark:text-amber-300">
                {formatPrice(total)}
              </span>
            </div>

            {/* CONTINUE SHOPPING / KEEP BROWSING BUTTON */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="w-full py-3.5 text-center bg-slate-100 hover:bg-slate-200 dark:bg-secondary/90 border border-slate-300 dark:border-border text-slate-900 dark:text-foreground font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/cart"
                onClick={() => dispatch(toggleCart())}
                className="py-3.5 text-center border-2 border-slate-300 hover:border-slate-800 text-slate-900 dark:text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all bg-white hover:bg-slate-50"
              >
                View Bag
              </Link>
              <Link
                to="/payment"
                onClick={() => dispatch(toggleCart())}
                className="py-3.5 text-center gradient-primary text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover transition-all shadow-md"
              >
                Checkout
              </Link>
            </div>

            <Link
              to="/products"
              onClick={() => dispatch(toggleCart())}
              className="block text-center text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-700 transition-colors"
            >
              Browse more household items →
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
