import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  // Consistent floating pill style across all pages
  const headerBgClassName = "bg-black py-3";

  const logoTextColor = "text-white";
  const logoIconBg = "bg-white";
  const logoIconInner = "bg-black";
  
  const mobileMenuBg = "bg-black/95 border-b border-white/10 backdrop-blur-xl";

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive ? "text-white" : "text-gray-400 hover:text-white";
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 pt-3">
      <nav className={`max-w-5xl mx-auto px-5 lg:px-8 flex justify-between items-center rounded-full transition-all duration-500 ${headerBgClassName}`}>
        
        {/* LOGO */}
        <Link to="/" className={`flex items-center gap-3 font-bold text-xl tracking-wide ${logoTextColor}`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${logoIconBg}`}>
            <div className={`w-2.5 h-2.5 rotate-45 ${logoIconInner}`}></div>
          </div>
          Techbrahmand
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`text-sm tracking-wider uppercase font-semibold transition-colors duration-300 ${getLinkClass(link.path)}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* DESKTOP BUTTON */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/contact">
            <button className="px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all bg-white text-black hover:bg-gray-200">
              Get Started
            </button>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className={`md:hidden ${logoTextColor}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`px-8 py-6 flex flex-col gap-6 ${mobileMenuBg}`}>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`text-lg font-semibold uppercase tracking-wider ${getLinkClass(link.path)}`}
            >
              {link.name}
            </Link>
          ))}

          <Link to="/contact" className="mt-2">
            <button className="w-full py-4 rounded-full font-bold uppercase tracking-wider bg-white text-black">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;