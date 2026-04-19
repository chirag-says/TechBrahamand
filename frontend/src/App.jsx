import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X as XIcon, Linkedin, ArrowUpRight, Search, User } from "lucide-react";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contactus from "./pages/Contactus";
import About from "./pages/About";
import Chatbot from "./pages/Chatbot";
import { AnimatePresence } from "framer-motion";
import IntroLoader from "./components/IntroLoader";
import HoloMenu from "./components/HoloMenu";
import "./App.css";

/* ════════════════════════════════════════
   PILL-STYLE NAVBAR (reference layout)
   ════════════════════════════════════════ */
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/products" },
  { name: "Contact", path: "/contact" },
];

function PillNavbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bezel-nav">
      <nav className="bezel-nav-inner">
        {/* Logo removed as requested */}

        {/* Mobile toggle */}
        <button className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <XIcon size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`nav-mobile-menu ${mobileOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} className={`nav-mobile-link ${isActive(link.path) ? "active" : ""}`}>
            {link.name}
          </Link>
        ))}
        <Link to="/contact" className="nav-mobile-cta">Get Started</Link>
      </div>
    </header>
  );
}

/* ════════════════════════════════════════
   CORNER WIDGETS — fixed overlays on frame
   ════════════════════════════════════════ */
function CornerWidgets() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const widgetTexts = [
    "Thinking of building an app or website?",
    "Ready to scale your digital presence?",
    "Looking for cutting-edge security?",
    "Let's build your next digital universe."
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % widgetTexts.length);
        setFade(true);
      }, 300); // Wait for fade-out before changing text
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const isChatbotPage = location.pathname === '/chatbot';

  return (
    <>
      {/* Bottom-left widget: visible on all pages EXCEPT chatbot */}
      {!isChatbotPage && (
        <div className="corner-input">
          <p
            className="corner-input-text"
            style={{
              fontSize: '11px',
              paddingLeft: '8px',
              transition: 'opacity 0.3s ease-in-out',
              opacity: fade ? 1 : 0
            }}
          >
            {widgetTexts[textIndex]}
          </p>
          <Link to="/chatbot" className="corner-input-btn" style={{ textDecoration: 'none' }}>
            <ArrowUpRight size={16} strokeWidth={2.5} color="black" />
          </Link>
        </div>
      )}

      {/* Top-right folder tab navbar */}
      <div className="top-right-nav">
        {navLinks.map((link) => {
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`top-right-nav-link ${active ? "active" : ""}`}
            >
              {link.name}
            </Link>
          )
        })}
      </div>
    </>
  );
}

/* ════════════════════════════════════════
   SVG BEZEL BORDER — viewport outline + notch
   ════════════════════════════════════════ */
function BezelBorderOverlay() {
  const location = useLocation();
  const isChatbotPage = location.pathname === '/chatbot';

  const [dims, setDims] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { w, h } = dims;
  const mobile = w <= 768;
  const p = mobile ? 8 : 16;
  const R = mobile ? 20 : 36;

  // Cutouts applied globally on desktop
  const applyCuts = !mobile && w >= 900;

  let vp;
  if (!applyCuts) {
    /* Simple rounded rectangle for non-home pages or small screens */
    vp = [
      `M ${p + R},${p}`,
      `H ${w - p - R}`,
      `A ${R} ${R} 0 0 1 ${w - p} ${p + R}`,
      `V ${h - p - R}`,
      `A ${R} ${R} 0 0 1 ${w - p - R} ${h - p}`,
      `H ${p + R}`,
      `A ${R} ${R} 0 0 1 ${p} ${h - p - R}`,
      `V ${p + R}`,
      `A ${R} ${R} 0 0 1 ${p + R} ${p}`,
      `Z`,
    ].join(" ");
  } else {
    const cr = 30;           /* concave curve radius */
    const stepH = 60;        /* step depth */
    const stepFromRight = 500; /* top-right: distance from right edge */
    const notchX = w - p - stepFromRight;
    const stepFromLeft = 410;  /* bottom-left: distance from left edge (wider) */
    const notchBL = p + stepFromLeft;

    vp = [
      `M ${p + R},${p}`,
      `H ${notchX}`,
      /* Concave S-curve: top level → step level */
      `Q ${notchX + cr},${p} ${notchX + cr},${p + cr}`,
      ...(stepH > 2 * cr ? [`V ${p + stepH - cr}`] : []),
      `Q ${notchX + cr},${p + stepH} ${notchX + 2 * cr},${p + stepH}`,
      /* Step level continues to the right corner */
      `H ${w - p - R}`,
      `A ${R} ${R} 0 0 1 ${w - p} ${p + stepH + R}`,
      /* Right edge → bottom-right */
      `V ${h - p - R}`,
      `A ${R} ${R} 0 0 1 ${w - p - R} ${h - p}`,
      /* Bottom handle conditional for chatbot page */
      ...(isChatbotPage ? [
        `H ${p + R}`,
        `A ${R} ${R} 0 0 1 ${p} ${h - p - R}`,
        `V ${p + R}`
      ] : [
        `H ${notchBL}`,
        /* Concave S-curve: bottom level → stepped up */
        `Q ${notchBL - cr},${h - p} ${notchBL - cr},${h - p - cr}`,
        ...(stepH > 2 * cr ? [`V ${h - p - stepH + cr}`] : []),
        `Q ${notchBL - cr},${h - p - stepH} ${notchBL - 2 * cr},${h - p - stepH}`,
        /* Stepped level continues to the left corner */
        `H ${p + R}`,
        `A ${R} ${R} 0 0 1 ${p} ${h - p - stepH - R}`,
        /* Left → top-left */
        `V ${p + R}`
      ]),
      `A ${R} ${R} 0 0 1 ${p + R} ${p}`,
      `Z`,
    ].join(" ");
  }

  const outer = `M 0,0 H ${w} V ${h} H 0 Z`;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      <defs>
        <filter id="edge-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      {/* Dark mask outside viewport shape */}
      <path
        d={`${outer} ${vp}`}
        fillRule="evenodd"
        fill="rgb(10, 12, 20)"
      />
      {/* Depth shadow for premium floating feel */}
      <path
        d={vp}
        fill="none"
        stroke="rgba(0, 0, 0, 0.5)"
        strokeWidth="6"
        filter="url(#edge-glow)"
      />
      {/* Glowing border line */}
      <path
        d={vp}
        fill="none"
        stroke="rgba(150, 180, 255, 0.15)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* ════════════════════════════════════════
   APP LAYOUT — wrapped in bezel frame
   ════════════════════════════════════════ */
function AppLayout({ showIntro }) {
  const { pathname } = useLocation();
  const isChatbot = pathname === '/chatbot';

  useEffect(() => {
    const viewport = document.querySelector('.bezel-viewport');
    if (viewport) {
      viewport.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <>
      <HoloMenu visible={!showIntro} />
      <div className="bezel-frame">
        <div className="bezel-viewport">
          {/* <PillNavbar /> replaced by HoloMenu */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/about" element={<About />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
          {!isChatbot && <Footer />}
        </div>
      </div>
      {/* Corner widgets — float above the SVG border overlay */}
      <CornerWidgets />
      {/* SVG border overlay — renders the frame shape with notch */}
      <BezelBorderOverlay />
    </>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      {/* Full-screen cinematic intro — plays once on load */}
      <AnimatePresence>
        {showIntro && (
          <IntroLoader onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Main site — always mounted, just hidden behind the intro */}
      <AppLayout showIntro={showIntro} />
    </Router>
  );
}