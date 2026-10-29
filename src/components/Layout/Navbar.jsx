import { useState, useEffect } from "react";
import { Menu, User, ShoppingBag, Sun, Moon, Search, Sparkles } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
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
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const { cart } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.auth);

  const [announcement, setAnnouncement] = useState(
    "Haute Formulation & Complimentary Concierge Delivery on Orders Above $75 CAD"
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
      .catch(() => {
        // keep fallback
      });
    return () => {
      isMounted = false;
    };
  }, []);

  let cartItemsCount = 0;
  if (cart) {
    cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  }

  const navLinks = [
    { name: "Collections", path: "/products" },
    { name: "Artisanal Story", path: "/about" },
    { name: "Concierge", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav className="fixed left-0 w-full top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-champagne/20 transition-all duration-300">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-gradient-to-r from-noir via-secondary to-noir py-1.5 px-4 text-center border-b border-champagne/10">
        <p className="text-[11px] tracking-[0.2em] uppercase text-champagne/90 font-medium flex items-center justify-center gap-2">
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
              className="p-2 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-champagne/20 transition-all text-foreground flex-shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden lg:flex items-center space-x-5 xl:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[11px] xl:text-xs font-semibold tracking-[0.12em] uppercase transition-all relative py-1 whitespace-nowrap ${
                    location.pathname === link.path
                      ? "text-champagne font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-champagne rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* CENTER: BRAND LOGO (2 Columns, Centered with generous gaps on both sides) */}
          <div className="col-span-2 flex items-center justify-center">
            <Link to="/" className="flex items-center justify-center group py-1" aria-label="SKAY PRODUCTS">
              <img
                src="/img/logo/logo3.png"
                alt="SKAY PRODUCTS"
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Link>
          </div>

          {/* RIGHT: ACTIONS & CONTROLS (5 Columns, Right-aligned) */}
          <div className="col-span-5 flex items-center justify-end space-x-2 sm:space-x-3">
            {/* SEARCH */}
            <button
              onClick={() => dispatch(toggleSearchBar())}
              aria-label="Search collection"
              className="p-2.5 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-champagne/20 transition-all text-foreground"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="p-2.5 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-champagne/20 transition-all text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-champagne" />
              ) : (
                <Moon className="w-4 h-4 text-foreground" />
              )}
            </button>

            {/* CLIENT PROFILE / AUTH */}
            <button
              onClick={() => dispatch(toggleAuthPopup())}
              aria-label="Client Account"
              className="p-2.5 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-champagne/20 transition-all text-foreground flex items-center space-x-1.5"
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
                  {authUser.name?.split(" ")[0] || "Client"}
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
