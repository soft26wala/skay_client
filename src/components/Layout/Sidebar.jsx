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

const Sidebar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const menuItems = [
    { name: "Home Gallery", icon: Home, path: "/" },
    { name: "Curated Collections", icon: Package, path: "/products" },
    { name: "Artisanal Heritage", icon: Info, path: "/about" },
    { name: "Concierge & FAQ", icon: HelpCircle, path: "/faq" },
    { name: "Atelier Contact", icon: Phone, path: "/contact" },
    { name: "Shopping Bag", icon: ShoppingBag, path: "/cart" },
    authUser && { name: "Client Orders", icon: List, path: "/orders" },
  ];

  const { isSidebarOpen } = useSelector((state) => state.popup);
  if (!isSidebarOpen) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => dispatch(toggleSidebar())}
      />

      {/* LUXURY MOBILE SIDEBAR */}
      <div className="fixed left-0 top-0 h-full w-full max-w-xs z-50 bg-background/95 backdrop-blur-2xl border-r border-champagne/30 shadow-2xl animate-slide-in-left flex flex-col">
        {/* BRAND HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <img
              src="/img/logo/logo3.png"
              alt="Skay Products Logo"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <span className="text-lg font-serif font-bold text-foreground block">
                SKAY PRODUCTS
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-champagne block">
                skayproducts.com
              </span>
            </div>
          </div>

          <button
            onClick={() => dispatch(toggleSidebar())}
            aria-label="Close menu drawer"
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {menuItems.filter(Boolean).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => dispatch(toggleSidebar())}
                className={`flex items-center space-x-3.5 px-4 py-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                  isActive
                    ? "gradient-primary text-black font-bold shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.name}</span>
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
