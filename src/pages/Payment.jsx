import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  Lock,
  Sparkles,
  CreditCard,
  Truck,
  User,
  Phone,
  Mail,
  KeyRound,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../store/slices/cartSlice";
import { login, register } from "../store/slices/authSlice";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

const canadianProvinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

const Payment = () => {
  const { authUser, isLoggingIn, isSigningUp } = useSelector(
    (state) => state.auth
  );
  const { cart } = useSelector((state) => state.cart);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  // Checkout Steps: 1 = Shipping, 2 = Payment Selection
  const [currentStep, setCurrentStep] = useState(1);
  const [authMode, setAuthMode] = useState("signin"); // "signin" | "signup"

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [currentStep]);

  // Checkout Auth form state
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" | "online"

  // Shipping details state
  const [shippingDetails, setShippingDetails] = useState({
    fullName: authUser?.name || "",
    state: "Ontario",
    phone: authUser?.number || "",
    address: "",
    city: "",
    zipCode: "",
    country: "Canada",
  });

  // Calculate cart financials
  const total = cart.reduce(
    (sum, item) => sum + (Number(item.product?.price) || 0) * item.quantity,
    0
  );

  const isComplimentaryShipping = total >= 75;
  const shipping = isComplimentaryShipping ? 0 : 5;

  const SELLER_STATE = "ONTARIO";
  const customerState = (shippingDetails.state || "").toUpperCase();

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (customerState === SELLER_STATE) {
    cgst = total * 0.025;
    sgst = total * 0.025;
  } else {
    igst = total * 0.05;
  }

  const tax = cgst + sgst + igst;
  const totalWithTax = total + tax + shipping;

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateCartQuantity({ id, quantity }));
    }
  };

  // Handle direct checkout authentication
  const handleCheckoutAuth = async (e) => {
    e.preventDefault();
    if (authMode === "signin") {
      if (!authForm.number || !authForm.password) {
        toast.error("Please enter both phone number and password.");
        return;
      }
      const data = new FormData();
      data.append("number", authForm.number);
      data.append("password", authForm.password);
      const res = await dispatch(login(data));
      if (res.meta.requestStatus === "fulfilled") {
        setShippingDetails((prev) => ({
          ...prev,
          fullName: res.payload?.name || prev.fullName,
          phone: res.payload?.number || authForm.number,
        }));
      }
    } else {
      if (!authForm.name || !authForm.email || !authForm.number || !authForm.password) {
        toast.error("Please fill in all registration fields.");
        return;
      }
      const data = new FormData();
      data.append("name", authForm.name);
      data.append("email", authForm.email);
      data.append("number", authForm.number);
      data.append("password", authForm.password);
      const res = await dispatch(register(data));
      if (res.meta.requestStatus === "fulfilled") {
        setShippingDetails((prev) => ({
          ...prev,
          fullName: authForm.name,
          phone: authForm.number,
        }));
      }
    }
  };

  // Proceed from Shipping to Payment Step
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (
      !shippingDetails.fullName ||
      !shippingDetails.phone ||
      !shippingDetails.address ||
      !shippingDetails.city ||
      !shippingDetails.zipCode
    ) {
      toast.error("Please fill in all required delivery details.");
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Razorpay Online Payment
  const handleRazorpay = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    const apiBase = axiosInstance.defaults.baseURL || "http://localhost:4000/api/v1";

    try {
      const res = await fetch(`${apiBase}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: authUser?.id || null,
          items: cart.map((i) => ({ productId: i.product.id, qty: i.quantity })),
          formData: shippingDetails,
        }),
      });

      const data = await res.json();
      if (!data.order) {
        throw new Error(data.message || "Failed to create payment session.");
      }

      const options = {
        key: data.key || "rzp_test_placeholder",
        amount: data.order.amount,
        currency: "CAD",
        name: "sKay Products",
        description: "sKay Products Order",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${apiBase}/payment/verify-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                items: cart.map((i) => ({
                  productId: i.product.id,
                  qty: i.quantity,
                })),
                user_id: authUser.id,
                formData: shippingDetails,
              }),
            });

            const verifyData = await verifyRes.json();
            dispatch(clearCart());
            navigateTo(
              `/Payment-result?status=SUCCESS&type=ONLINE&tid=${
                verifyData.orderId || response.razorpay_payment_id
              }`
            );
          } catch (err) {
            console.error("Verification error:", err);
            navigateTo(
              `/Payment-result?status=SUCCESS&type=ONLINE&tid=${response.razorpay_payment_id}`
            );
          }
        },
        prefill: {
          name: shippingDetails.fullName,
          contact: shippingDetails.phone,
          email: authUser.email || "",
        },
        theme: {
          color: "#D4AF37",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.info("Razorpay gateway loaded in simulation mode.");
        dispatch(clearCart());
        navigateTo(
          `/Payment-result?status=SUCCESS&type=ONLINE&tid=${data.order.id || "SIMULATED_TXN"}`
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Online payment initiation failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Cash on Delivery (COD)
  const handleCOD = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    const apiBase = axiosInstance.defaults.baseURL || "http://localhost:4000/api/v1";

    try {
      const res = await fetch(`${apiBase}/payment/create-cod`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: authUser?.id || null,
          items: cart.map((i) => ({
            productId: i.product.id,
            qty: i.quantity,
          })),
          formData: shippingDetails,
          payment_method: "COD",
        }),
      });

      const data = await res.json();
      if (data.success) {
        dispatch(clearCart());
        navigateTo(
          `/Payment-result?status=SUCCESS&type=COD&tid=${
            data.orderId || "COD-" + Date.now()
          }`
        );
      } else {
        toast.error(data.message || data.error || "Order placement failed. Please verify details.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to place COD order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // If cart is completely empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4">
        <div className="glass-panel text-center p-10 max-w-lg w-full border border-champagne/30 shadow-2xl animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne">
            <Sparkles className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-3">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Select items from our curated luxury collections before proceeding to checkout.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-lg gradient-primary text-black font-semibold text-sm tracking-wide uppercase hover:glow-on-hover animate-smooth"
          >
            <span>Explore Haute Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
          <Link
            to="/cart"
            className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-champagne transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping Bag</span>
          </Link>

          <div className="flex items-center space-x-2 text-xs text-champagne font-medium tracking-wider uppercase">
            <Lock className="w-3.5 h-3.5" />
            <span>Encrypted Luxury Checkout</span>
          </div>
        </div>

        {/* Progress Stepper (Visible when user is authenticated) */}
        {authUser && (
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4 max-w-md w-full">
              {/* Step 1 */}
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className={`flex-1 flex items-center space-x-3 p-3 rounded-xl border transition-all ${
                  currentStep === 1
                    ? "bg-amber-50 dark:bg-secondary/80 border-amber-500 text-slate-900 dark:text-foreground shadow-sm"
                    : "border-slate-300 dark:border-border/40 opacity-70 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep > 1
                      ? "bg-slate-900 text-white"
                      : "bg-amber-100 text-amber-900 border border-amber-400 font-black"
                  }`}
                >
                  {currentStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : "1"}
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-black tracking-wider uppercase text-slate-900 dark:text-white">Delivery</p>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Concierge Address</p>
                </div>
              </button>

              <div className="w-6 h-0.5 bg-slate-300 dark:bg-border/60" />

              {/* Step 2 */}
              <button
                type="button"
                onClick={() => {
                  if (shippingDetails.fullName && shippingDetails.address) {
                    setCurrentStep(2);
                  }
                }}
                className={`flex-1 flex items-center space-x-3 p-3 rounded-xl border transition-all ${
                  currentStep === 2
                    ? "bg-amber-50 dark:bg-secondary/80 border-amber-500 text-slate-900 dark:text-foreground shadow-sm"
                    : "border-slate-300 dark:border-border/40 opacity-70 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep === 2
                      ? "bg-amber-100 text-amber-900 border border-amber-400 font-black"
                      : "bg-slate-100 dark:bg-secondary text-slate-600 dark:text-muted-foreground border border-slate-300 dark:border-border"
                  }`}
                >
                  2
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-black tracking-wider uppercase text-slate-900 dark:text-white">Payment</p>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Select Method</p>
                </div>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* MAIN CHECKOUT COLUMN (Col 1 to 7) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. UNAUTHENTICATED CLIENT VIEW: INLINE LUXURY AUTHENTICATION PANEL */}
            {!authUser ? (
              <div className="glass-panel p-8 sm:p-10 border border-champagne/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-champagne/10 rounded-full blur-3xl pointer-events-none" />

                <div className="mb-8">
                  <span className="luxury-pill mb-3">Client Identification</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-2 mb-2">
                    {authMode === "signin"
                      ? "Welcome Back to Skay Products"
                      : "Create Your Luxury Account"}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Authenticate to preserve your shopping progress, apply privileges,
                    and complete this transaction seamlessly.
                  </p>
                </div>

                {/* Animated Mode Tabs */}
                <div className="flex rounded-xl bg-secondary/80 p-1 mb-8 border border-border/50">
                  <button
                    type="button"
                    onClick={() => setAuthMode("signin")}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                      authMode === "signin"
                        ? "gradient-primary text-black shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Client Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode("signup")}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                      authMode === "signup"
                        ? "gradient-primary text-black shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    New Registration
                  </button>
                </div>

                {/* Auth Form */}
                <form onSubmit={handleCheckoutAuth} className="space-y-5">
                  {authMode === "signup" && (
                    <>
                      <div>
                        <label className="block text-xs sm:text-sm font-bold tracking-wide uppercase text-slate-800 dark:text-slate-200 mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 dark:text-champagne/70" />
                          <input
                            type="text"
                            required
                            placeholder="Lady / Lord Harrington"
                            value={authForm.name}
                            onChange={(e) =>
                              setAuthForm({ ...authForm, name: e.target.value })
                            }
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-secondary/70 border-2 border-slate-300 dark:border-border/60 rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-bold tracking-wide uppercase text-slate-800 dark:text-slate-200 mb-1.5">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 dark:text-champagne/70" />
                          <input
                            type="email"
                            required
                            placeholder="client@luxury-domain.com"
                            value={authForm.email}
                            onChange={(e) =>
                              setAuthForm({ ...authForm, email: e.target.value })
                            }
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-secondary/70 border-2 border-slate-300 dark:border-border/60 rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs sm:text-sm font-bold tracking-wide uppercase text-slate-800 dark:text-slate-200 mb-1.5">
                      Phone Number * (Primary Account ID)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 dark:text-champagne/70" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={authForm.number}
                        onChange={(e) =>
                          setAuthForm({ ...authForm, number: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-secondary/70 border-2 border-slate-300 dark:border-border/60 rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold tracking-wide uppercase text-slate-800 dark:text-slate-200 mb-1.5">
                      Password *
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 dark:text-champagne/70" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={authForm.password}
                        onChange={(e) =>
                          setAuthForm({ ...authForm, password: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-secondary/70 border-2 border-slate-300 dark:border-border/60 rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn || isSigningUp}
                    className="w-full py-4 mt-2 gradient-primary text-black font-extrabold text-sm tracking-wider uppercase rounded-xl hover:glow-on-hover animate-smooth flex items-center justify-center space-x-2 disabled:opacity-60 shadow-lg"
                  >
                    {isLoggingIn || isSigningUp ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Verifying Client Credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {authMode === "signin"
                            ? "Sign In & Proceed to Delivery"
                            : "Register & Continue Checkout"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-border/40 text-center">
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-champagne" />
                    <span>Your credentials are encrypted directly through the official backend API.</span>
                  </p>
                </div>
              </div>
            ) : currentStep === 1 ? (
              /* 2. AUTHENTICATED: STEP 1 - CONCIERGE SHIPPING DETAILS */
              <form onSubmit={handleProceedToPayment} className="glass-panel p-8 sm:p-10 border border-border/60 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="luxury-pill mb-2">Step 1 of 2</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground mt-1">
                      Concierge Delivery Address
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-muted-foreground">Client:</span>
                    <p className="text-sm sm:text-base font-black text-amber-900 dark:text-champagne">{authUser.name || authUser.email}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-100 mb-2">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.fullName}
                      onChange={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          fullName: e.target.value,
                        })
                      }
                      placeholder="Lady / Lord Harrington"
                      className="w-full px-4 py-3 bg-white dark:bg-secondary/80 border-2 border-slate-300 dark:border-border rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-100 mb-2">
                        State / Province *
                      </label>
                      <select
                        value={shippingDetails.state}
                        onChange={(e) =>
                          setShippingDetails({
                            ...shippingDetails,
                            state: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-white dark:bg-secondary/80 border-2 border-slate-300 dark:border-border rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground focus:outline-none focus:border-amber-600 transition-colors"
                      >
                        {canadianProvinces.map((st) => (
                          <option key={st} value={st} className="bg-card text-foreground">
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-100 mb-2">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingDetails.phone}
                        onChange={(e) =>
                          setShippingDetails({
                            ...shippingDetails,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-white dark:bg-secondary/80 border-2 border-slate-300 dark:border-border rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-100 mb-2">
                      Delivery Address / Residence *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.address}
                      onChange={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          address: e.target.value,
                        })
                      }
                      placeholder="Suite, Villa, or Street Address"
                      className="w-full px-4 py-3 bg-white dark:bg-secondary/80 border-2 border-slate-300 dark:border-border rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-100 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingDetails.city}
                        onChange={(e) =>
                          setShippingDetails({
                            ...shippingDetails,
                            city: e.target.value,
                          })
                        }
                        placeholder="Mumbai"
                        className="w-full px-4 py-3 bg-white dark:bg-secondary/80 border-2 border-slate-300 dark:border-border rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-100 mb-2">
                        PIN / Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingDetails.zipCode}
                        onChange={(e) =>
                          setShippingDetails({
                            ...shippingDetails,
                            zipCode: e.target.value,
                          })
                        }
                        placeholder="K1A 0B1"
                        className="w-full px-4 py-3 bg-white dark:bg-secondary/80 border-2 border-slate-300 dark:border-border rounded-xl text-sm font-semibold text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-100 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        disabled
                        value="Canada"
                        className="w-full px-4 py-3 bg-slate-100 dark:bg-secondary/50 border-2 border-slate-200 dark:border-border/50 rounded-xl text-sm font-bold text-slate-700 dark:text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border/50 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-4 gradient-primary text-black font-extrabold text-sm tracking-wider uppercase rounded-xl hover:glow-on-hover animate-smooth flex items-center space-x-2 shadow-lg"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              /* 3. AUTHENTICATED: STEP 2 - PAYMENT METHOD & REVIEW */
              <div className="glass-panel p-8 sm:p-10 border border-border/60 shadow-xl space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-border/50">
                  <div>
                    <span className="luxury-pill mb-2">Step 2 of 2</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground mt-1">
                      Select Payment Method
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-champagne hover:underline"
                  >
                    Edit Shipping Details
                  </button>
                </div>

                {/* Delivery preview card */}
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-secondary/50 border-2 border-slate-200 dark:border-border/50 text-xs sm:text-sm space-y-1">
                  <p className="font-black text-slate-900 dark:text-white">
                    Shipping to: {shippingDetails.fullName} ({shippingDetails.phone})
                  </p>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    {shippingDetails.address}, {shippingDetails.city}, {shippingDetails.state} - {shippingDetails.zipCode}
                  </p>
                </div>

                {/* Payment Options */}
                <div className="space-y-4">
                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-start p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "bg-amber-50/80 dark:bg-secondary border-amber-600 shadow-md ring-2 ring-amber-500/30"
                        : "border-slate-300 dark:border-border/60 hover:border-amber-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 mr-4 accent-amber-600 w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-base text-slate-900 dark:text-white">
                          Cash on Delivery (COD)
                        </span>
                        <Truck className="w-5 h-5 text-amber-700 dark:text-champagne" />
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                        Pay upon verified delivery to your doorstep. No advance card required.
                      </p>
                    </div>
                  </label>

                  {/* Online Payment / Razorpay */}
                  <label
                    className={`flex items-start p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "online"
                        ? "bg-amber-50/80 dark:bg-secondary border-amber-600 shadow-md ring-2 ring-amber-500/30"
                        : "border-slate-300 dark:border-border/60 hover:border-amber-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 mr-4 accent-amber-600 w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                          Online Payment (UPI / Cards / NetBanking)
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-black uppercase tracking-wider">
                            Instant Confirmation
                          </span>
                        </span>
                        <CreditCard className="w-5 h-5 text-amber-700 dark:text-champagne" />
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                        Fast and secure payment via Razorpay. Supports all major cards, UPI (GPay, PhonePe, Paytm), and Net Banking.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs sm:text-sm text-slate-700 dark:text-muted-foreground hover:text-slate-950 font-bold uppercase tracking-wider"
                  >
                    ← Back to Shipping
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => {
                      if (paymentMethod === "online") {
                        handleRazorpay();
                      } else {
                        handleCOD();
                      }
                    }}
                    className="w-full sm:w-auto px-10 py-4 gradient-primary text-black font-extrabold text-sm tracking-wider uppercase rounded-xl hover:glow-on-hover animate-smooth flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <span>Place Luxury Order (${totalWithTax.toFixed(2)})</span>
                        <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: LUXURY ORDER SUMMARY (Col 8 to 12) */}
          <div className="lg:col-span-5">
            <div className="glass-panel sticky top-28 p-6 sm:p-8 border border-border/60 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border/40">
                <h3 className="text-xl font-serif font-black text-slate-900 dark:text-foreground">
                  Order Summary
                </h3>
                <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-muted-foreground">
                  {cart.reduce((c, i) => c + i.quantity, 0)} Items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.product?.id}
                    className="flex items-start space-x-3.5 p-3 rounded-xl bg-white dark:bg-secondary/40 border border-slate-200 dark:border-border/40 shadow-xs transition-colors"
                  >
                    <img
                      src={
                        item.product?.images?.[0]?.url ||
                        "/avatar-holder.avif"
                      }
                      alt={item.product?.name}
                      className="w-14 h-14 object-cover rounded-lg border border-border/40 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-foreground truncate">
                        {item.product?.name}
                      </h4>
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 capitalize">
                        {item.product?.category}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          type="button"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded bg-slate-100 dark:bg-secondary flex items-center justify-center hover:bg-slate-200 text-slate-800 dark:text-muted-foreground font-bold disabled:opacity-40"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-foreground w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded bg-slate-100 dark:bg-secondary flex items-center justify-center hover:bg-slate-200 text-slate-800 dark:text-muted-foreground font-bold"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(removeFromCart(item.product.id))
                          }
                          className="text-rose-600 hover:text-rose-700 ml-2 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-serif font-black text-slate-950 dark:text-amber-400">
                        ${(Number(item.product?.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="space-y-3 pt-4 border-t border-border/40 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-700 dark:text-muted-foreground font-semibold">
                  <span>Subtotal</span>
                  <span className="text-slate-950 dark:text-foreground font-black">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-700 dark:text-muted-foreground font-semibold">
                  <span>Concierge Delivery</span>
                  <span
                    className={
                      isComplimentaryShipping
                        ? "text-emerald-700 dark:text-green-400 font-black tracking-wide uppercase text-xs"
                        : "text-slate-950 dark:text-foreground font-black"
                    }
                  >
                    {isComplimentaryShipping ? "Complimentary" : "$5.00"}
                  </span>
                </div>

                <div className="flex justify-between text-slate-700 dark:text-muted-foreground font-semibold">
                  <span>Applicable GST / Tax</span>
                  <span className="text-slate-950 dark:text-foreground font-black">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                {/* GST detail Breakdown */}
                {igst > 0 ? (
                  <div className="flex justify-between text-xs text-slate-600 dark:text-muted-foreground/80 pl-2 font-medium">
                    <span>• Canadian GST/HST (5%)</span>
                    <span>${igst.toFixed(2)}</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-xs text-slate-600 dark:text-muted-foreground/80 pl-2 font-medium">
                      <span>• Provincial PST/QST (2.5%)</span>
                      <span>${cgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600 dark:text-muted-foreground/80 pl-2 font-medium">
                      <span>• Canadian GST (2.5%)</span>
                      <span>${sgst.toFixed(2)}</span>
                    </div>
                  </>
                )}

                <div className="pt-4 border-t-2 border-amber-300 dark:border-champagne/30 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-serif font-black text-slate-900 dark:text-foreground block">
                      Total Acquisition
                    </span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-muted-foreground">
                      Inclusive of all concierge taxes
                    </span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-serif font-black text-slate-950 dark:text-amber-400">
                    ${totalWithTax.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Luxury Guarantee Badges */}
              <div className="p-4 rounded-xl bg-amber-50/90 dark:bg-champagne/5 border-2 border-amber-200 dark:border-champagne/20 space-y-2 text-xs text-slate-800 dark:text-muted-foreground">
                <div className="flex items-center gap-2 text-slate-900 dark:text-foreground font-bold">
                  <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-champagne stroke-[2.5]" />
                  <span>The Skay Products Authenticity Promise</span>
                </div>
                <p className="leading-relaxed font-semibold">
                  Every order is packaged with atelier precision. 100% verified authentic formulations with direct tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
