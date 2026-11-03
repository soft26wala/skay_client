import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop ensures every page opens instantly from the very top (0, 0),
 * preventing any page from opening scrolled down or jumping from bottom to top.
 */
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  // Disable browser's native automatic scroll restoration so it never restores a scrolled-down position
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Synchronous execution before DOM paint
  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    } else {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, search, hash]);

  // Secondary verification to guarantee that even after hydration/render, the page is at top
  useEffect(() => {
    if (!hash) {
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;

