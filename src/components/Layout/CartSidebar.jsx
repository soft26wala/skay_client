import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
} from "../../store/slices/cartSlice";
import { toggleCart } from "../../store/slices/popupSlice";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state) => state.popup);
  const { cart } = useSelector((state) => state.cart);

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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => dispatch(toggleCart())}
      />

      {/* LUXURY CART DRAWER */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-background/95 backdrop-blur-2xl border-l border-champagne/30 shadow-2xl animate-slide-in-right flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-foreground">
                Your Luxury Bag
              </h2>
              <p className="text-xs text-muted-foreground">
                {cartItemsCount} bespoke acquisition{cartItemsCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <button
            onClick={() => dispatch(toggleCart())}
            aria-label="Close cart drawer"
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FREE SHIPPING PROGRESS NOTICE */}
        {cart.length > 0 && (
          <div className="px-6 py-3 bg-champagne/5 border-b border-champagne/10 flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              {total >= 400
                ? "Complimentary Concierge Shipping unlocked!"
                : `Add ₹${(400 - total).toFixed(0)} more for Complimentary Shipping`}
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
              <p className="text-base font-serif font-semibold text-foreground mb-1">
                Your Bag is Currently Empty
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                Discover exceptional luxury formulations from our collections.
              </p>
              <Link
                to="/products"
                onClick={() => dispatch(toggleCart())}
                className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-black font-semibold text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover transition-all"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product?.id}
                className="p-4 rounded-xl bg-secondary/40 border border-border/50 hover:border-champagne/30 transition-all flex items-start space-x-4"
              >
                <img
                  src={
                    item.product?.images?.[0]?.url || "/avatar-holder.avif"
                  }
                  alt={item.product?.name}
                  className="w-16 h-16 object-cover rounded-lg border border-border/40 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-xs font-semibold text-foreground truncate">
                      {item.product?.name}
                    </h3>
                    <button
                      onClick={() => dispatch(removeFromCart(item.product?.id))}
                      className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs font-bold text-champagne mt-1">
                    ₹{Number(item.product?.price).toFixed(2)}
                  </p>

                  <div className="flex items-center space-x-2 mt-3">
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(item.product?.id, item.quantity - 1)
                      }
                      className="w-6 h-6 rounded bg-secondary flex items-center justify-center text-muted-foreground hover:bg-champagne/20 disabled:opacity-30"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product?.id, item.quantity + 1)
                      }
                      className="w-6 h-6 rounded bg-secondary flex items-center justify-center text-muted-foreground hover:bg-champagne/20"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER ACTIONS */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-border/50 bg-secondary/30 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Subtotal Amount
              </span>
              <span className="text-xl font-serif font-bold text-champagne">
                ₹{total.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/cart"
                onClick={() => dispatch(toggleCart())}
                className="py-3 text-center border border-border/70 hover:border-champagne text-foreground font-semibold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                View Full Bag
              </Link>
              <Link
                to="/payment"
                onClick={() => dispatch(toggleCart())}
                className="py-3 text-center gradient-primary text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover transition-all"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
