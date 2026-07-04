import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import "./HoloMenu.css";

const navLinks = [
  { name: "Home", path: "/", num: "01" },
  { name: "About", path: "/about", num: "02" },
  { name: "Services", path: "/services", num: "03" },
  { name: "Products", path: "/products", num: "04" },
  { name: "Contact", path: "/contact", num: "05" },
];

const ease = [0.22, 1, 0.36, 1];

export default function HoloMenu({ visible = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const toggle = () => setIsOpen((v) => !v);
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ── Full-screen Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-fullscreen"
            initial={{ clipPath: "circle(0% at 36px 36px)" }}
            animate={{ clipPath: "circle(150% at 36px 36px)" }}
            exit={{ clipPath: "circle(0% at 36px 36px)" }}
            transition={{ duration: 0.65, ease }}
          >
            {/* Top bar: brand + close */}
            <div className="nav-fs-header">
              <span className="nav-fs-brand-text">TECH BRAHMAND</span>
            </div>

            {/* Navigation links */}
            <nav className="nav-fs-links">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease }}
                  className="nav-fs-link-row"
                >
                  <span className="nav-fs-num">{link.num}</span>
                  <Link
                    to={link.path}
                    className={`nav-fs-link ${isActive(link.path) ? "active" : ""}`}
                    onClick={toggle}
                  >
                    {link.name}
                    {isActive(link.path) && <span className="nav-fs-dot" />}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              className="nav-fs-bottom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5, ease }}
            >
              <Link to="/contact" className="nav-fs-cta" onClick={toggle}>
                <span>Get Started</span>
                <span className="nav-fs-cta-icon">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </Link>

              <div className="nav-fs-footer">
                <span>© 2026 Tech Brahmand</span>
                <span className="nav-fs-footer-dot">·</span>
                <span>All rights reserved</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hamburger Trigger ── */}
      {visible && (
        <button
          className={`nav-trigger ${isOpen ? "is-open" : ""}`}
          onClick={toggle}
          aria-label="Toggle navigation menu"
        >
          <motion.span
            className="nav-trigger-line"
            animate={isOpen
              ? { rotate: 45, y: 0, width: 20 }
              : { rotate: 0, y: -4, width: 22 }}
            transition={{ duration: 0.35, ease }}
          />
          <motion.span
            className="nav-trigger-line"
            animate={isOpen
              ? { rotate: -45, y: 0, width: 20 }
              : { rotate: 0, y: 4, width: 16 }}
            transition={{ duration: 0.35, ease }}
          />
        </button>
      )}
    </>
  );
}
