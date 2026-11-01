import {
  X,
  Home,
  Package,
  Info,
  HelpCircle,
  ShoppingBag,
  List,
  Phone,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slices/popupSlice";
import { useCurrency } from "../../contexts/CurrencyContext";

const Sidebar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { currency, toggleCurrency } = useCurrency();
  const dispatch = useDispatch();
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Shop All", icon: Package, path: "/products" },
    { name: "Best Sellers", icon: Sparkles, path: "/products?filter=best-sellers", badge: "Hot" },
    { name: "About Us", icon: Info, path: "/about" },
    { name: "Contact", icon: Phone, path: "/contact" },
    { name: "FAQ", icon: HelpCircle, path: "/faq" },
    { name: "Shopping Bag", icon: ShoppingBag, path: "/cart" },
    authUser && { name: "My Orders", icon: List, path: "/orders" },
  ].filter(Boolean);

  const { isSidebarOpen } = useSelector((state) => state.popup);
  if (!isSidebarOpen) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => dispatch(toggleSidebar())}
      />

      {/* MOBILE SIDEBAR */}
      <div className="fixed left-0 top-0 h-full w-full max-w-xs z-50 bg-background/95 backdrop-blur-2xl border-r border-border/60 shadow-2xl animate-slide-in-left flex flex-col">
        {/* BRAND HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex flex-col">
            <div className="flex items-baseline font-serif">
              <span className="text-2xl font-normal lowercase italic text-champagne leading-none">s</span>
              <span className="text-2xl font-bold uppercase text-foreground leading-none">K</span>
              <span className="text-2xl text-foreground leading-none">ay</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground font-sans font-medium">
              Household & Living
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleCurrency}
              aria-label="Toggle currency"
              className="px-2 py-1 rounded-lg border border-border/70 text-xs font-bold text-foreground bg-secondary/80"
            >
              {currency}
            </button>
            <button
              onClick={() => dispatch(toggleSidebar())}
              aria-label="Close menu drawer"
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path.includes("?") &&
                location.pathname === item.path.split("?")[0] &&
                location.search.includes(item.path.split("?")[1]));
            return (
              <Link
                key={item.path + item.name}
                to={item.path}
                onClick={() => dispatch(toggleSidebar())}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                  isActive
                    ? "gradient-primary text-black font-bold shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-black/20 text-black" : "bg-champagne/20 text-champagne"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER BADGE */}
        <div className="p-6 border-t border-border/50 bg-secondary/30">
          <div className="flex items-center gap-2 text-xs text-champagne font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Atelier Excellence</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Curated Formulations & Worldwide Concierge
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
