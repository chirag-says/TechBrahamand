import React, { useRef, useEffect, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import img from "../../public/ai-hero-nobg.png";

const HomeScene = React.lazy(() => import("../components/HomeScene"));

/* ============================
   SMOOTH SCROLL
   ============================ */
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}


/* ============================
   TRINITY SECTION
   ============================ */
function TrinitySection({ phase, title, name, image, description, features, accentColor, glowColor, reverse = false }) {
  const c = {
    amber: { text: "text-amber-400", border: "border-amber-500/30", dot: "bg-amber-400" },
    cyan: { text: "text-cyan-400", border: "border-cyan-500/30", dot: "bg-cyan-400" },
    purple: { text: "text-purple-400", border: "border-purple-500/30", dot: "bg-purple-400" },
  }[accentColor];

  return (
    <section className="min-h-screen flex items-center py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>

          {/* TEXT */}
          <motion.div
            className={reverse ? "lg:order-2" : ""}
            initial={{ opacity: 0, x: reverse ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <p className={`text-xs sm:text-sm uppercase tracking-[0.35em] font-bold mb-3 ${c.text}`}>
              Phase {phase}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-2 leading-none">
              {title}
            </h2>
            <h3 className="text-lg sm:text-xl font-semibold text-white/30 mb-6 sm:mb-8">
              {name}
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-white/45 leading-relaxed mb-8 sm:mb-10 max-w-lg">
              {description}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className={`flex items-center gap-2 sm:gap-3 bg-white/[0.04] border ${c.border} px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl`}
                >
                  <div className={`w-1 sm:w-1.5 h-4 sm:h-5 rounded-full ${c.dot}`} />
                  <span className="text-[11px] sm:text-sm text-white/60">{feat}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            className={`flex justify-center ${reverse ? "lg:order-1" : ""}`}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative">
              <div className="absolute -inset-8 sm:-inset-12 rounded-full blur-3xl opacity-25" style={{ background: glowColor }} />
              <div className={`w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-2xl sm:rounded-3xl overflow-hidden border ${c.border} shadow-2xl relative z-10`}>
                <img src={image} alt={name} className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


/* ============================
   HOME
   ============================ */
const Home = () => {
  useSmoothScroll();

  const scrollRef = useRef(0);
  const immersiveRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: immersiveRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => { scrollRef.current = v; });
  }, [scrollYProgress]);

  // Overlay color shifts for the 3D sections
  const sectionGradient = useTransform(
    scrollYProgress,
    [0, 0.05, 0.25, 0.5, 0.75, 0.95, 1],
    [
      "rgba(0,0,0,0)",
      "rgba(40,20,0,0.65)",     // amber tint
      "rgba(0,25,35,0.65)",     // cyan tint
      "rgba(25,10,40,0.65)",    // purple tint
      "rgba(0,0,0,0.7)",
      "rgba(250,250,250,0.95)",
      "rgba(250,250,250,1)",
    ]
  );

  return (
    <div className="font-sans selection:bg-black selection:text-white">

      {/* ========================================
          HERO — Classic light section
          ======================================== */}
      <section className="relative bg-[#fafafa] px-4 sm:px-0 flex items-center pt-20 sm:pt-32 pb-10 sm:pb-16 overflow-hidden">

        {/* Grid texture */}
        <div className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="grid grid-cols-12 max-w-7xl mx-auto w-full sm:py-10 py-4 gap-x-4 sm:gap-x-2 items-center relative z-10">

          {/* LEFT TEXT */}
          <div className="col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl sm:max-w-2xl"
            >
              <h1 className="font-bold tracking-tight leading-[1.05] text-[clamp(1.4rem,6vw,5.5rem)] text-slate-900 mb-4 sm:mb-6">
                We Build, <br />
                <span className="bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 bg-clip-text text-transparent">
                  Maintain &
                </span>
                <br />
                <span className="bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 bg-clip-text text-transparent">
                  Dominate.
                </span>
              </h1>

              <p className="text-[8px] sm:text-base lg:text-lg text-slate-500 leading-relaxed mb-5 sm:mb-8 max-w-md">
                TechBrahmand is a full-service digital agency. We create stunning websites,
                maintain your digital presence, and help you outperform your competition.
              </p>

              <div className="flex gap-2 sm:gap-4">
                <Link to="/contact">
                  <button className="group bg-black text-white px-2 sm:px-6 py-1 sm:py-3 rounded-full text-[10px] sm:text-sm font-semibold flex items-center gap-2 hover:scale-105 transition">
                    Get Started <ArrowRight size={16} />
                  </button>
                </Link>
                <Link to="/products">
                  <button className="px-2 sm:px-6 py-1 sm:py-3 rounded-full text-[10px] sm:text-sm font-semibold border border-slate-300 hover:bg-slate-900 hover:text-white transition">
                    Our Services
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="col-span-5 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-[160px] sm:max-w-xs lg:max-w-lg">
              <img src={img} alt="TechBrahmand AI" className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover object-top drop-shadow-2xl" />
            </div>
          </motion.div>
        </div>
      </section>


      {/* ========================================
          IMMERSIVE 3D SCROLL SECTION
          ======================================== */}
      <div ref={immersiveRef} className="relative bg-[#0a0a0a]">

        {/* 3D Canvas — stuck as background */}
        <div className="sticky top-0 left-0 w-full h-screen" style={{ zIndex: 1 }}>
          <Suspense fallback={<div className="w-full h-full bg-[#0a0a0a]" />}>
            <HomeScene scrollRef={scrollRef} />
          </Suspense>
          {/* Color overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: sectionGradient }}
          />
        </div>

        {/* Content scrolling OVER the canvas */}
        <div className="relative" style={{ zIndex: 2, marginTop: "-100vh" }}>

          {/* ---- NARRATIVE BRIDGE ---- */}
          <section className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="text-center max-w-3xl mx-auto">
              <motion.p
                className="text-base sm:text-xl lg:text-3xl text-white/25 font-light mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                In a world of templates & shortcuts,
              </motion.p>
              <motion.p
                className="text-xl sm:text-3xl lg:text-5xl text-white font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                we chose to build{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                  with purpose.
                </span>
              </motion.p>
            </div>
          </section>

          {/* ---- BRAHMA ---- */}
          <TrinitySection
            phase="01" title="We Create." name="Tech Brahma" image="/brahma.png"
            description="Your idea deserves to exist. We take it from concept to a full digital product — websites, web apps, SaaS platforms, and complete branding."
            features={["Custom Websites & Apps", "SaaS Engineering", "Branding & UI/UX", "E-Commerce"]}
            accentColor="amber" glowColor="rgba(245,158,11,0.2)"
          />

          {/* ---- VISHNU ---- */}
          <TrinitySection
            phase="02" title="We Protect." name="Tech Vishnu" image="/vishnu.png"
            description="Your creation deserves to thrive. We handle maintenance, security, hosting, SEO, and performance — so you never lose sleep over your platform."
            features={["Bug Fixes & Security", "Hosting Management", "SEO & Content", "Performance 24/7"]}
            accentColor="cyan" glowColor="rgba(6,182,212,0.2)" reverse
          />

          {/* ---- MAHESH ---- */}
          <TrinitySection
            phase="03" title="We Conquer." name="Tech Mahesh" image="/mahesh.png"
            description="Your rivals don't stand a chance. We dissect their strategy and arm you with intelligence to dominate — SEO audits, market reports, and ad strategy."
            features={["SEO Audits", "UI/UX Teardowns", "Market Strategy", "Ad Campaigns"]}
            accentColor="purple" glowColor="rgba(168,85,247,0.2)"
          />

          {/* ---- CTA ---- */}
          <section className="min-h-screen flex items-center justify-center px-4 bg-[#fafafa] relative z-10">
            <div className="text-center max-w-3xl mx-auto">

              <motion.div
                className="flex items-center justify-center gap-2 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
                <div className="w-6 h-[2px] bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" />
                <div className="w-6 h-[2px] bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
              </motion.div>

              <motion.h2
                className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Three forces.<br />
                <span className="text-slate-400 italic font-serif">One mission.</span>
              </motion.h2>

              <motion.p
                className="text-sm sm:text-base lg:text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Whether you're starting from zero or dominating a market —
                we're one conversation away.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/contact">
                  <button className="px-8 sm:px-12 py-4 sm:py-5 text-sm sm:text-base bg-black text-white rounded-full font-bold shadow-xl shadow-black/20 hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 group">
                    Let's Talk
                    <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>

            </div>
          </section>

        </div>
      </div>

    </div>
  );
};

export default Home;