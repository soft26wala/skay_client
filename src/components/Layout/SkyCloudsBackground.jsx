import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";

export const DEFAULT_BACKGROUND_SETTINGS = {
  theme: "sky-day", // "sky-day", "sky-sunset", "custom"
  enableClouds: true,
  cloudSpeed: "normal", // "slow", "normal", "fast"
  cloudDensity: "high", // "low", "medium", "high"
  cloudOpacity: 90,
  applyToAdmin: false,
  preset1: {
    id: "sky-day",
    name: "Day Azure Sky",
    subtitle: "Crisp Blue & Horizon Morning Azure",
    color1: "#1d8cf8",
    color2: "#bae6fd",
    angle: "180deg",
    cloudColor: "#ffffff",
  },
  preset2: {
    id: "sky-sunset",
    name: "Sunset Horizon Sky",
    subtitle: "Warm Sunset Orange & Twilight Lavender",
    color1: "#ea580c",
    color2: "#6366f1",
    angle: "160deg",
    cloudColor: "#fff7ed",
  },
  custom: {
    id: "custom",
    name: "Custom Sky Colors",
    subtitle: "Personalized Dual Color Sky",
    color1: "#0284c7",
    color2: "#7dd3fc",
    angle: "180deg",
    cloudColor: "#ffffff",
  },
  cardStyle: {
    bg: "#ffffff",
    bgOpacity: 95,
    textColor: "#1f2937",
    categoryColor: "#b98822",
    priceColor: "#b98822",
    btnBg: "#b98822",
    btnTextColor: "#ffffff",
    borderColor: "rgba(220, 210, 190, 0.7)",
  },
};

// Realistic Cloud SVG Component with soft gradients and volumetric shading
const CloudShape = ({ type = 1, fill = "#ffffff", opacity = 0.9, className = "" }) => {
  if (type === 1) {
    // Large cumulus fluffy cloud
    return (
      <svg
        viewBox="0 0 420 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ filter: "drop-shadow(0 14px 22px rgba(15, 23, 42, 0.12))" }}
      >
        <defs>
          <linearGradient id={`cloudGrad1-${fill}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fill} stopOpacity="1" />
            <stop offset="100%" stopColor={fill} stopOpacity="0.78" />
          </linearGradient>
          <radialGradient id={`cloudHighlight-${fill}`} cx="45%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Soft volumetric base */}
        <path
          d="M75 140 C50 140 30 120 30 95 C30 72 48 53 71 50 C80 25 106 8 135 8 C158 8 178 19 190 36 C202 24 219 16 238 16 C268 16 293 38 297 68 C308 62 321 58 335 58 C365 58 390 83 390 113 C390 115 390 117 389 119 C402 124 410 137 410 150 C410 167 396 180 380 180 L75 180 C40 180 15 155 15 125 C15 102 31 83 52 77"
          fill={`url(#cloudGrad1-${fill})`}
          opacity={opacity}
        />
        {/* Sunlit top highlight */}
        <path
          d="M80 70 C95 40 125 25 155 25 C185 25 210 40 220 60 C240 35 275 35 305 55 C335 55 365 75 370 105"
          fill={`url(#cloudHighlight-${fill})`}
        />
      </svg>
    );
  }

  if (type === 2) {
    // Elegant elongated drifting cloud
    return (
      <svg
        viewBox="0 0 360 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ filter: "drop-shadow(0 12px 18px rgba(15, 23, 42, 0.10))" }}
      >
        <defs>
          <linearGradient id={`cloudGrad2-${fill}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fill} stopOpacity="0.95" />
            <stop offset="100%" stopColor={fill} stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path
          d="M50 110 C30 110 15 95 15 75 C15 58 28 43 45 40 C55 20 78 6 105 6 C128 6 148 16 160 32 C172 20 190 12 210 12 C240 12 265 32 270 60 C280 55 292 52 305 52 C330 52 350 72 350 97 C350 122 330 140 305 140 L50 140 Z"
          fill={`url(#cloudGrad2-${fill})`}
          opacity={opacity}
        />
      </svg>
    );
  }

  // Wispy high-altitude cirrus cloud
  return (
    <svg
      viewBox="0 0 500 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 8px 14px rgba(15, 23, 42, 0.08))" }}
    >
      <defs>
        <linearGradient id={`cloudGrad3-${fill}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={fill} stopOpacity="0" />
          <stop offset="25%" stopColor={fill} stopOpacity="0.8" />
          <stop offset="75%" stopColor={fill} stopOpacity="0.9" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M20 70 Q120 40 220 60 T420 50 Q480 60 500 80 Q380 95 260 85 T20 70 Z"
        fill={`url(#cloudGrad3-${fill})`}
        opacity={opacity * 0.75}
      />
    </svg>
  );
};

const SkyCloudsBackground = ({ previewSettings = null, isPreview = false }) => {
  const [settings, setSettings] = useState(() => {
    if (previewSettings) return previewSettings;
    try {
      const saved = localStorage.getItem("site_background_settings");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return DEFAULT_BACKGROUND_SETTINGS;
  });

  // Sync when previewSettings prop updates
  useEffect(() => {
    if (previewSettings) {
      setSettings(previewSettings);
    }
  }, [previewSettings]);

  // Fetch from server if not preview mode
  useEffect(() => {
    if (isPreview) return;

    let isMounted = true;
    const fetchSettings = async () => {
      try {
        const res = await axiosInstance.get("/web/background");
        if (isMounted && res.data?.background) {
          setSettings(res.data.background);
          localStorage.setItem("site_background_settings", JSON.stringify(res.data.background));
        }
      } catch (err) {
        // Fallback already loaded
      }
    };

    fetchSettings();

    // Listen for cross-tab or local background change events
    const handleStorageChange = (e) => {
      if (e.key === "site_background_settings" && e.newValue) {
        try {
          setSettings(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };

    const handleCustomEvent = (e) => {
      if (e.detail) {
        setSettings(e.detail);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("site-background-change", handleCustomEvent);

    return () => {
      isMounted = false;
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("site-background-change", handleCustomEvent);
    };
  }, [isPreview]);

  // Inject Card CSS Custom Properties for live storefront styling
  useEffect(() => {
    if (isPreview) return;
    const card = settings.cardStyle || DEFAULT_BACKGROUND_SETTINGS.cardStyle;
    const root = document.documentElement;
    if (card) {
      let bgVal = card.bg || "#ffffff";
      if (card.bgOpacity !== undefined && card.bgOpacity < 100) {
        if (bgVal.startsWith("#")) {
          const hex = bgVal.replace("#", "");
          const r = parseInt(hex.substring(0, 2), 16) || 255;
          const g = parseInt(hex.substring(2, 4), 16) || 255;
          const b = parseInt(hex.substring(4, 6), 16) || 255;
          const a = (card.bgOpacity / 100).toFixed(2);
          bgVal = `rgba(${r}, ${g}, ${b}, ${a})`;
        }
      }
      root.style.setProperty("--card-custom-bg", bgVal);
      root.style.setProperty("--card-custom-text", card.textColor || "#1f2937");
      root.style.setProperty("--card-custom-category", card.categoryColor || "#b98822");
      root.style.setProperty("--card-custom-price", card.priceColor || "#b98822");
      root.style.setProperty("--card-custom-btn-bg", card.btnBg || "#b98822");
      root.style.setProperty("--card-custom-btn-text", card.btnTextColor || "#ffffff");
      root.style.setProperty("--card-custom-border", card.borderColor || "rgba(220, 210, 190, 0.7)");
    }
  }, [settings, isPreview]);

  // Active theme calculation
  const activeTheme = settings.theme || "sky-day";
  let activeGradient = "";
  let activeCloudColor = "#ffffff";
  let isSunset = false;

  if (activeTheme === "sky-day") {
    const p = settings.preset1 || DEFAULT_BACKGROUND_SETTINGS.preset1;
    activeGradient = `linear-gradient(${p.angle || "180deg"}, ${p.color1 || "#1d8cf8"} 0%, #38bdf8 45%, ${p.color2 || "#bae6fd"} 100%)`;
    activeCloudColor = p.cloudColor || "#ffffff";
  } else if (activeTheme === "sky-sunset") {
    const p = settings.preset2 || DEFAULT_BACKGROUND_SETTINGS.preset2;
    activeGradient = `linear-gradient(${p.angle || "160deg"}, ${p.color1 || "#ea580c"} 0%, #f43f5e 40%, ${p.color2 || "#6366f1"} 100%)`;
    activeCloudColor = p.cloudColor || "#fff7ed";
    isSunset = true;
  } else {
    // Custom dual colors
    const c = settings.custom || DEFAULT_BACKGROUND_SETTINGS.custom;
    activeGradient = `linear-gradient(${c.angle || "180deg"}, ${c.color1 || "#0284c7"} 0%, ${c.color2 || "#7dd3fc"} 100%)`;
    activeCloudColor = c.cloudColor || "#ffffff";
  }

  // Speed multiplier
  const speedMultiplier =
    settings.cloudSpeed === "slow" ? 1.6 : settings.cloudSpeed === "fast" ? 0.6 : 1.0;

  // Cloud Density (number of clouds)
  const density = settings.cloudDensity || "high";
  const opacityVal = (settings.cloudOpacity !== undefined ? settings.cloudOpacity : 90) / 100;

  // Multi-layer clouds configuration (with negative delays so they are immediately visible on screen)
  const cloudsList = [
    // Layer 1 - High wispy clouds
    { id: 1, type: 3, top: "6%", width: "480px", duration: 80 * speedMultiplier, delay: -12, opacity: 0.55 * opacityVal },
    { id: 2, type: 3, top: "18%", width: "520px", duration: 95 * speedMultiplier, delay: -55, opacity: 0.45 * opacityVal },
    
    // Layer 2 - Mid-altitude fluffy cumulus clouds
    { id: 3, type: 1, top: "10%", width: "380px", duration: 52 * speedMultiplier, delay: -5, opacity: 0.88 * opacityVal },
    { id: 4, type: 2, top: "24%", width: "320px", duration: 62 * speedMultiplier, delay: -30, opacity: 0.82 * opacityVal },
    { id: 5, type: 1, top: "42%", width: "420px", duration: 58 * speedMultiplier, delay: -18, opacity: 0.85 * opacityVal },
    
    // Layer 3 - Lower drift & foreground clouds (based on density)
    ...(density !== "low"
      ? [
          { id: 6, type: 2, top: "58%", width: "340px", duration: 48 * speedMultiplier, delay: -40, opacity: 0.78 * opacityVal },
          { id: 7, type: 1, top: "72%", width: "460px", duration: 65 * speedMultiplier, delay: -22, opacity: 0.72 * opacityVal },
        ]
      : []),
    ...(density === "high"
      ? [
          { id: 8, type: 3, top: "35%", width: "450px", duration: 88 * speedMultiplier, delay: -70, opacity: 0.50 * opacityVal },
          { id: 9, type: 2, top: "82%", width: "380px", duration: 54 * speedMultiplier, delay: -8, opacity: 0.65 * opacityVal },
        ]
      : []),
  ];

  return (
    <div
      className={`${
        isPreview ? "absolute inset-0" : "fixed inset-0"
      } pointer-events-none overflow-hidden transition-all duration-700 ease-in-out`}
      style={{
        background: activeGradient,
        zIndex: isPreview ? 0 : -1,
      }}
      aria-hidden="true"
    >
      {/* 1. Atmospheric Sky Glow / Celestial Sunlight Aura */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[90px] pointer-events-none transition-all duration-1000"
        style={{
          top: isSunset ? "35%" : "-120px",
          right: isSunset ? "15%" : "8%",
          background: isSunset
            ? "radial-gradient(circle, rgba(251, 146, 60, 0.45) 0%, rgba(244, 63, 94, 0.25) 45%, transparent 75%)"
            : "radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, rgba(254, 240, 138, 0.28) 35%, transparent 70%)",
        }}
      />

      {/* 2. Horizon Light Haze (blends ground and sky smoothly) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: isSunset
            ? "linear-gradient(to top, rgba(99, 102, 241, 0.35) 0%, transparent 100%)"
            : "linear-gradient(to top, rgba(255, 255, 255, 0.4) 0%, transparent 100%)",
        }}
      />

      {/* 3. Animated Badal (Clouds) */}
      {settings.enableClouds && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {cloudsList.map((cloud) => (
            <div
              key={cloud.id}
              className="absolute pointer-events-none"
              style={{
                top: cloud.top,
                width: cloud.width,
                animation: `floatCloudHorizontal ${cloud.duration}s linear infinite ${cloud.delay}s, cloudVerticalBob ${
                  7 + (cloud.id % 4)
                }s ease-in-out infinite ${cloud.id * 0.8}s`,
                willChange: "transform",
              }}
            >
              <CloudShape
                type={cloud.type}
                fill={activeCloudColor}
                opacity={cloud.opacity}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      )}

      {/* Embedded CSS for smooth cloud keyframes */}
      <style>{`
        @keyframes floatCloudHorizontal {
          0% {
            transform: translateX(-130%);
          }
          100% {
            transform: translateX(110vw);
          }
        }

        @keyframes cloudVerticalBob {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-9px);
          }
        }
      `}</style>
    </div>
  );
};

export default SkyCloudsBackground;
