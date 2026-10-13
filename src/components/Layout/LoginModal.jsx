import { useState, useEffect } from "react";
import { X, Mail, Lock, User, Phone, Sparkles, ArrowRight, KeyRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleAuthPopup } from "../../store/slices/popupSlice";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../../store/slices/authSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { authUser, isSigningUp, isLoggingIn, isRequestingForToken } =
    useSelector((state) => state.auth);
  const { isAuthPopupOpen } = useSelector((state) => state.popup);

  const [mode, setMode] = useState("signin"); // "signin" | "signup" | "forgot" | "reset"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  // Detect reset password URL and open popup with reset mode
  useEffect(() => {
    if (location.pathname.startsWith("/password/reset/")) {
      setMode("reset");
      if (!isAuthPopupOpen) {
        dispatch(toggleAuthPopup());
      }
    }
  }, [location.pathname, dispatch, isAuthPopupOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("number", formData.number);
    data.append("password", formData.password);

    if (mode === "signup") {
      data.append("name", formData.name);
      data.append("email", formData.email);
    }

    if (mode === "forgot") {
      dispatch(forgotPassword({ number: formData.number })).then(() => {
        dispatch(toggleAuthPopup());
        setMode("signin");
      });
      return;
    }

    if (mode === "reset") {
      const token = location.pathname.split("/").pop();
      dispatch(
        resetPassword({
          token,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
      );
      return;
    }

    if (mode === "signup") {
      dispatch(register(data));
    } else {
      dispatch(login(data));
    }

    if (authUser) {
      setFormData({
        name: "",
        email: "",
        number: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  if (!isAuthPopupOpen || authUser) return null;

  const isLoading = isSigningUp || isLoggingIn || isRequestingForToken;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-md transition-opacity"
        onClick={() => dispatch(toggleAuthPopup())}
      />

      {/* LUXURY AUTH MODAL */}
      <div className="relative z-10 glass-panel w-full max-w-md border border-champagne/30 shadow-2xl animate-fade-in-up p-8 sm:p-10">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-champagne/15 rounded-full blur-2xl pointer-events-none" />

        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="luxury-pill mb-2">
              <Sparkles className="w-3 h-3 text-champagne" />
              <span>Maison Client Portal</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-1">
              {mode === "reset"
                ? "Reset Credentials"
                : mode === "signup"
                ? "Join the Atelier"
                : mode === "forgot"
                ? "Recover Account"
                : "Client Sign In"}
            </h2>
          </div>
          <button
            onClick={() => dispatch(toggleAuthPopup())}
            aria-label="Close modal"
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TABS (For signin and signup) */}
        {["signin", "signup"].includes(mode) && (
          <div className="flex rounded-xl bg-secondary/80 p-1 mb-6 border border-border/50">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                mode === "signin"
                  ? "gradient-primary text-black shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                mode === "signup"
                  ? "gradient-primary text-black shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              New Client
            </button>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FULL NAME & EMAIL - SIGNUP ONLY */}
          {mode === "signup" && (
            <>
              <div>
                <label className="block text-xs font-medium tracking-wide uppercase text-muted-foreground mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne/70" />
                  <input
                    type="text"
                    placeholder="Lady / Lord Harrington"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-secondary/70 border border-border/60 rounded-lg text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium tracking-wide uppercase text-muted-foreground mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne/70" />
                  <input
                    type="email"
                    placeholder="client@luxury-domain.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-secondary/70 border border-border/60 rounded-lg text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* NUMBER - ALWAYS VISIBLE EXCEPT RESET */}
          {mode !== "reset" && (
            <div>
              <label className="block text-xs font-medium tracking-wide uppercase text-muted-foreground mb-1">
                Phone Number * (Primary ID)
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne/70" />
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-secondary/70 border border-border/60 rounded-lg text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
                  required
                />
              </div>
            </div>
          )}

          {/* PASSWORD - VISIBLE EXCEPT FORGOT */}
          {mode !== "forgot" && (
            <div>
              <label className="block text-xs font-medium tracking-wide uppercase text-muted-foreground mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne/70" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-secondary/70 border border-border/60 rounded-lg text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
                  required
                />
              </div>
            </div>
          )}

          {/* CONFIRM PASSWORD - RESET ONLY */}
          {mode === "reset" && (
            <div>
              <label className="block text-xs font-medium tracking-wide uppercase text-muted-foreground mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne/70" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-secondary/70 border border-border/60 rounded-lg text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
                  required
                />
              </div>
            </div>
          )}

          {/* FORGOT PASSWORD LINK */}
          {mode === "signin" && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-xs text-champagne hover:underline transition-all"
              >
                Forgot your password?
              </button>
            </div>
          )}

          {mode === "forgot" && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-xs text-champagne hover:underline transition-all"
              >
                Return to Sign In
              </button>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-2 gradient-primary text-black font-bold text-xs tracking-wider uppercase rounded-xl hover:glow-on-hover animate-smooth flex items-center justify-center space-x-2 disabled:opacity-60 shadow-lg"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Authenticating with Atelier...</span>
              </>
            ) : mode === "reset" ? (
              <span>Reset Credentials</span>
            ) : mode === "signup" ? (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            ) : mode === "forgot" ? (
              <span>Send Recovery Request</span>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
