import { useState, useEffect } from "react";
import { Menu, User, ShoppingBag, Search, Sparkles } from "lucide-react";
import { useCurrency } from "../../contexts/CurrencyContext";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAuthPopup,
  toggleCart,
  toggleSearchBar,
  toggleSidebar,
} from "../../store/slices/popupSlice";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

const Navbar = () => {
  const { currency, toggleCurrency } = useCurrency();
  const dispatch = useDispatch();
  const location = useLocation();

  const { cart } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.auth);

  const [announcement, setAnnouncement] = useState(
    "Free Express Shipping on Orders Above $75"
  );

  useEffect(() => {
    let isMounted = true;
    axiosInstance
      .get("/web/announcement")
      .then((res) => {
        if (isMounted && res.data?.announcement) {
          setAnnouncement(res.data.announcement);
        }
      })
      .catch(() => { });

    return () => {
      isMounted = false;
    };
  }, []);

  let cartItemsCount = 0;
  if (cart) {
    cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  }

  const navLinks = [
    { name: "Shop All", path: "/products" },
    { name: "Best Sellers", path: "/products?filter=best-sellers" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav className="fixed left-0 w-full top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/60 transition-all duration-300">
      {/* Top Friendly Announcement Bar */}
      <div className="bg-secondary/70 py-1.5 px-4 text-center border-b border-border/50">
        <p className="text-[11px] tracking-[0.18em] uppercase text-foreground/80 font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-champagne animate-pulse" />
          <span>{announcement}</span>
          <Sparkles className="w-3 h-3 text-champagne animate-pulse" />
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 items-center h-20">
          {/* LEFT: HAMBURGER & DESKTOP NAVIGATION (5 Columns) */}
          <div className="col-span-5 flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => dispatch(toggleSidebar())}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl hover:bg-secondary border border-transparent hover:border-border/80 transition-all text-foreground flex-shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden lg:flex items-center space-x-4 xl:space-x-5">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path.includes("?") &&
                    location.pathname === link.path.split("?")[0] &&
                    location.search.includes(link.path.split("?")[1]));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-[11px] xl:text-xs font-semibold tracking-[0.08em] uppercase transition-all relative py-1 whitespace-nowrap flex items-center gap-1 ${
                      isActive
                        ? "text-champagne font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-champagne rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CENTER: BRAND LOGO (2 Columns, Centered) */}
          <div className="col-span-2 flex items-center justify-center">
            <Link to="/" className="flex items-center justify-center group py-1 select-none" aria-label="sKay Products">
              <img
                src="/img/logo/skay-logo.png"
                alt="sKay Products"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105 duration-300 drop-shadow-xs"
              />
            </Link>
          </div>

          {/* RIGHT: ACTIONS & CONTROLS (5 Columns, Right-aligned) */}
          <div className="col-span-5 flex items-center justify-end space-x-1.5 sm:space-x-2.5">
            {/* CAD / USD CURRENCY TOGGLE */}
            <button
              onClick={toggleCurrency}
              aria-label="Toggle currency between CAD and USD"
              className="px-2.5 py-1.5 rounded-xl border border-border/80 hover:border-champagne/60 bg-secondary/70 hover:bg-secondary text-xs font-bold transition-all flex items-center space-x-1 text-foreground"
              title="Click to toggle currency (CAD / USD)"
            >
              <span className={currency === "CAD" ? "text-champagne font-black" : "text-muted-foreground font-medium"}>
                CAD
              </span>
              <span className="text-muted-foreground/40 text-[10px]">/</span>
              <span className={currency === "USD" ? "text-champagne font-black" : "text-muted-foreground font-medium"}>
                USD
              </span>
            </button>

            {/* SEARCH */}
            <button
              onClick={() => dispatch(toggleSearchBar())}
              aria-label="Search products"
              className="p-2.5 rounded-xl hover:bg-secondary border border-transparent hover:border-border/80 transition-all text-foreground"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* CLIENT PROFILE / AUTH */}
            <button
              onClick={() => dispatch(toggleAuthPopup())}
              aria-label="My Account"
              className="p-2.5 rounded-xl hover:bg-secondary border border-transparent hover:border-border/80 transition-all text-foreground flex items-center space-x-1.5"
            >
              {authUser?.avatar?.url ? (
                <img
                  src={authUser.avatar.url}
                  alt={authUser.name}
                  className="w-5 h-5 rounded-full object-cover border border-champagne"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
              {authUser && (
                <span className="hidden md:inline-block text-xs font-semibold text-champagne max-w-[100px] truncate">
                  {authUser.name?.split(" ")[0] || "Account"}
                </span>
              )}
            </button>

            {/* SHOPPING BAG */}
            <button
              onClick={() => dispatch(toggleCart())}
              aria-label="Shopping Bag"
              className="relative p-2.5 rounded-xl gradient-primary text-black font-semibold hover:glow-on-hover transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline-block text-xs font-bold tracking-wider uppercase">
                Bag
              </span>
              {cartItemsCount > 0 && (
                <span className="px-1.5 py-0.2 bg-black text-champagne text-[10px] font-black rounded-full min-w-[18px] text-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
