import { Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.auth);

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

  const freeShippingThreshold = 75;
  const progressToFreeShipping = Math.min(
    100,
    (total / freeShippingThreshold) * 100
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4">
        <div className="glass-panel text-center p-10 max-w-lg w-full border border-champagne/30 shadow-2xl animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne">
            <ShoppingBag className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-3">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Explore our curated collections of artisanal formulations and lifestyle designs.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-lg gradient-primary text-black font-semibold text-sm tracking-wide uppercase hover:glow-on-hover animate-smooth"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-border/40 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="luxury-pill mb-2">Curated Bag</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Shopping Bag
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {cartItemsCount} item{cartItemsCount !== 1 ? "s" : ""} selected for acquisition
            </p>
          </div>

          <Link
            to="/products"
            className="text-xs text-champagne hover:underline flex items-center gap-1 uppercase tracking-wider font-semibold"
          >
            <span>Continue Discovering</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="glass-card p-4 mb-8 border border-champagne/20 bg-champagne/5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              {remainingForFreeShipping === 0
                ? "You have unlocked Complimentary Concierge Delivery!"
                : `Add $${remainingForFreeShipping.toFixed(
                    2
                  )} more for Complimentary Concierge Delivery.`}
            </span>
            <span className="text-champagne font-bold">
              {progressToFreeShipping.toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* CART ITEMS LIST (Col 1 to 8) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product?.id}
                className="glass-card p-5 sm:p-6 border border-border/60 hover:border-champagne/40 transition-all flex flex-col sm:flex-row sm:items-center gap-5"
              >
                <Link
                  to={`/product/${item.product?.id}`}
                  className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-secondary border border-border/40 group"
                >
                  <img
                    src={
                      item.product?.images?.[0]?.url || "/avatar-holder.avif"
                    }
                    alt={item.product?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/product/${item.product?.id}`}
                        className="hover:text-champagne transition-colors"
                      >
                        <h3 className="text-base sm:text-lg font-serif font-bold text-foreground">
                          {item.product?.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground capitalize mt-0.5">
                        Category: {item.product?.category}
                      </p>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item.product?.id))}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Stepper */}
                    <div className="flex items-center space-x-2 border border-border/60 rounded-lg p-1 bg-secondary/50">
                      <button
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(item.product?.id, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-champagne/20 text-muted-foreground disabled:opacity-30 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product?.id, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-champagne/20 text-muted-foreground transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Pricing */}
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        ${Number(item.product?.price).toFixed(2)} each
                      </p>
                      <p className="text-base font-bold text-champagne">
                        ${(Number(item.product?.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY (Col 9 to 12) */}
          <div className="lg:col-span-4">
            <div className="glass-panel sticky top-28 p-6 sm:p-8 border border-border/60 shadow-xl space-y-6">
              <h2 className="text-xl font-serif font-bold text-foreground pb-4 border-b border-border/40">
                Bag Summary
              </h2>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({cartItemsCount} items)</span>
                  <span className="text-foreground font-semibold">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Concierge Delivery</span>
                  <span
                    className={
                      remainingForFreeShipping === 0
                        ? "text-green-400 font-bold uppercase tracking-wider text-[11px]"
                        : "text-foreground font-semibold"
                    }
                  >
                    {remainingForFreeShipping === 0 ? "Complimentary" : "$5.00"}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Tax (GST/HST)</span>
                  <span className="text-foreground font-semibold">
                    ${(total * 0.05).toFixed(2)}
                  </span>
                </div>

                <div className="pt-4 border-t border-champagne/30 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-serif font-bold text-foreground block">
                      Estimated Total
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Final taxes calculated at checkout
                    </span>
                  </div>
                  <span className="text-2xl font-serif font-bold text-champagne">
                    ${(total + total * 0.05 + (remainingForFreeShipping === 0 ? 0 : 5)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/payment"
                className="w-full block py-4 text-center gradient-primary text-black font-bold text-xs tracking-wider uppercase rounded-xl hover:glow-on-hover animate-smooth shadow-lg"
              >
                {authUser ? "Proceed to Checkout" : "Proceed to Luxury Checkout"}
              </Link>

              {/* Security & Client Assurance */}
              <div className="pt-4 border-t border-border/40 space-y-2 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <ShieldCheck className="w-4 h-4 text-champagne" />
                  <span>Guaranteed Safe Checkout</span>
                </div>
                <p className="leading-relaxed">
                  Support for Cash on Delivery, Credit/Debit Cards, and Secure Canadian Checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
