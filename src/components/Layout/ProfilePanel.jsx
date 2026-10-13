import { useEffect, useState } from "react";
import { X, LogOut, Upload, Eye, EyeOff, User, Package, Shield, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  logout,
  updatePassword,
  updateProfile,
} from "../../store/slices/authSlice";
import { toggleAuthPopup } from "../../store/slices/popupSlice";

const ProfilePanel = () => {
  const dispatch = useDispatch();

  const { isAuthPopupOpen } = useSelector((state) => state.popup);
  const { authUser, isUpdatingProfile, isUpdatingPassword } = useSelector(
    (state) => state.auth
  );

  const [name, setName] = useState(authUser?.name || "");
  const [email, setEmail] = useState(authUser?.email || "");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (authUser) {
      setName(authUser.name || "");
      setEmail(authUser.email || "");
    }
  }, [authUser]);

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (avatar) formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  const handleUpdatePassword = () => {
    const formData = new FormData();
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmNewPassword", confirmNewPassword);
    dispatch(updatePassword(formData));
  };

  if (!isAuthPopupOpen || !authUser) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => dispatch(toggleAuthPopup())}
      />

      {/* LUXURY PROFILE DRAWER */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-background/95 backdrop-blur-2xl border-l border-champagne/30 shadow-2xl animate-slide-in-right flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-foreground">
                Client Profile
              </h2>
              <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold">
                Haute Privileges Active
              </span>
            </div>
          </div>

          <button
            onClick={() => dispatch(toggleAuthPopup())}
            aria-label="Close profile drawer"
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* AVATAR + CLIENT OVERVIEW */}
          <div className="text-center p-6 rounded-2xl bg-secondary/40 border border-border/50 relative overflow-hidden">
            <div className="relative inline-block mb-3">
              <img
                src={authUser?.avatar?.url || "/avatar-holder.avif"}
                alt={authUser?.name}
                className="w-20 h-20 rounded-full mx-auto border-2 border-champagne object-cover shadow-xl"
              />
              <label className="absolute bottom-0 right-0 p-1.5 bg-champagne text-black rounded-full cursor-pointer hover:scale-105 transition-transform shadow-md">
                <Upload className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground">
              {authUser?.name || "Distinguished Client"}
            </h3>
            <p className="text-xs text-muted-foreground">{authUser?.email}</p>
            <p className="text-xs text-champagne/80 font-mono mt-0.5">
              ID: {authUser?.number || authUser?.id}
            </p>

            {/* Quick Link to My Orders */}
            <div className="mt-4 pt-4 border-t border-border/40">
              <Link
                to="/orders"
                onClick={() => dispatch(toggleAuthPopup())}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-champagne/20 text-xs font-semibold text-foreground tracking-wider uppercase transition-colors"
              >
                <Package className="w-3.5 h-3.5 text-champagne" />
                <span>Track My Orders</span>
              </Link>
            </div>
          </div>

          {/* EDIT PROFILE FORM */}
          <div className="space-y-4 p-5 rounded-2xl bg-secondary/30 border border-border/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-champagne flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Update Profile Details</span>
            </h4>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border/60 bg-secondary/80 text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border/60 bg-secondary/80 text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
              />
            </div>

            <button
              onClick={handleUpdateProfile}
              disabled={isUpdatingProfile}
              className="w-full py-3 gradient-primary text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:glow-on-hover transition-all disabled:opacity-50"
            >
              {isUpdatingProfile ? "Saving Profile..." : "Save Profile Changes"}
            </button>
          </div>

          {/* UPDATE PASSWORD FORM */}
          <div className="space-y-4 p-5 rounded-2xl bg-secondary/30 border border-border/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-champagne flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Security & Password</span>
            </h4>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-border/60 bg-secondary/80 text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-border/60 bg-secondary/80 text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-border/60 bg-secondary/80 text-sm text-foreground focus:outline-none focus:border-champagne transition-colors"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-muted-foreground flex items-center gap-1.5 hover:text-champagne transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-3.5 h-3.5 text-champagne" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-champagne" />
              )}
              <span>{showPassword ? "Hide" : "Reveal"} Passwords</span>
            </button>

            <button
              onClick={handleUpdatePassword}
              disabled={isUpdatingPassword}
              className="w-full py-3 border border-champagne/40 hover:border-champagne text-champagne font-bold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50"
            >
              {isUpdatingPassword ? "Updating Password..." : "Update Password"}
            </button>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full py-3.5 rounded-xl border border-destructive/30 hover:bg-destructive/10 text-destructive text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Maison</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePanel;
