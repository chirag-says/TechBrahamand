import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Shield,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Zap,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ================= ANIMATION ================= */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ================= PRODUCTS DATA ================= */

const products = [
  {
    title: "Tech Brahma",
    subtitle: "The Creator",
    image: "/brahma.png",
    desc: "We build complete digital products from scratch — websites, web apps, SaaS platforms, e-commerce stores, and full branding packages tailored to your vision.",
    icon: Code2,
    accent: "from-amber-500 to-orange-600",
    accentText: "text-amber-600",
    accentBorder: "border-amber-200/60",
    accentGlow: "bg-amber-400/10",
    accentDot: "bg-amber-500",
    features: [
      "Custom website & web app development",
      "SaaS product engineering",
      "UI/UX design & branding",
      "E-commerce solutions",
    ],
    ideal: "Startups, new businesses, and entrepreneurs going digital",
    cta: "Build With Us",
  },
  {
    title: "Tech Vishnu",
    subtitle: "The Preserver",
    image: "/vishnu.png",
    desc: "We keep your digital presence alive and thriving. From routine maintenance to emergency fixes, we ensure your platform runs at peak performance 24/7.",
    icon: Shield,
    accent: "from-cyan-500 to-blue-600",
    accentText: "text-cyan-600",
    accentBorder: "border-cyan-200/60",
    accentGlow: "bg-cyan-400/10",
    accentDot: "bg-cyan-500",
    features: [
      "Bug fixes & security patches",
      "Hosting & server management",
      "SEO optimization & content updates",
      "Performance monitoring",
    ],
    ideal: "Businesses with existing websites or apps needing ongoing care",
    cta: "Get Maintenance",
  },
  {
    title: "Tech Mahesh",
    subtitle: "The Transformer",
    image: "/mahesh.png",
    desc: "We analyze your competitors and arm you with strategic intelligence. Through deep audits and market insights, we give you the edge to dominate your space.",
    icon: BarChart3,
    accent: "from-purple-500 to-indigo-600",
    accentText: "text-purple-600",
    accentBorder: "border-purple-200/60",
    accentGlow: "bg-purple-400/10",
    accentDot: "bg-purple-500",
    features: [
      "SEO audits & competitive analysis",
      "UI/UX teardowns & recommendations",
      "Market positioning reports",
      "Ad strategy & growth planning",
    ],
    ideal: "Businesses wanting to outperform their competition",
    cta: "Get Your Edge",
  },
];

const pricingHighlights = [
  { icon: Zap, label: "Flexible Plans", desc: "One-time or ongoing — your call" },
  { icon: Shield, label: "AMC Available", desc: "Annual maintenance contracts" },
  { icon: Globe, label: "Pan-India", desc: "Currently serving clients across India" },
  { icon: Sparkles, label: "Custom Pricing", desc: "Tailored quotes for every project" },
];

export default function Products() {
  return (
    <div className="bg-[#F3F5F9] text-[#111] min-h-screen overflow-y-auto font-sans tracking-tight">

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          <span
            className="text-[clamp(80px,16vw,260px)] font-black uppercase tracking-[0.04em] leading-none whitespace-nowrap"
            style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(0,0,0,0.04)' }}
          >
            PRODUCTS
          </span>
        </div>

        {/* Soft glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-200/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-20">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#111]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888]">
                Our Products
              </span>
              <div className="w-8 h-[2px] bg-[#111]" />
            </div>

            <h1 className="text-[clamp(2rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Three Pillars.{" "}
              <span className="bg-gradient-to-r from-amber-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                One Mission.
              </span>
            </h1>

            <p className="text-[15px] sm:text-[17px] text-[#555] font-medium leading-relaxed max-w-[520px] mx-auto mb-6">
              Whether you're starting from zero, need ongoing support, or want to crush your competition — we've got the right solution for you.
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-black/10" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#aaa]">
                Create · Preserve · Transform
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-black/10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: PRODUCT CARDS — Expanded Layout
          ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 sm:pb-28">
        <div className="flex flex-col gap-8">
          {products.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={0}
              className={`group relative bg-white/80 backdrop-blur-xl rounded-[28px] border ${item.accentBorder} shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.1)] transition-all duration-600 overflow-hidden`}
            >
              {/* Hover glow */}
              <div className={`absolute -top-32 -right-32 w-[300px] h-[300px] ${item.accentGlow} blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

              <div className="relative z-10 p-8 sm:p-10 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                  {/* Left — Info */}
                  <div className="lg:col-span-7">
                    {/* Header with image */}
                    <div className="flex items-center gap-5 mb-6">
                      <div className={`w-[64px] h-[64px] rounded-2xl overflow-hidden border-2 ${item.accentBorder} shadow-lg shrink-0`}>
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div>
                        <span className={`text-[10px] uppercase tracking-[0.15em] font-bold ${item.accentText}`}>
                          Phase 0{i + 1} · {item.subtitle}
                        </span>
                        <h2 className="text-[26px] sm:text-[32px] font-bold text-[#111] tracking-[-0.02em] leading-tight">
                          {item.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-[15px] text-[#555] leading-relaxed mb-8 max-w-[500px]">
                      {item.desc}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {item.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-[7px] h-[7px] rounded-full ${item.accentDot} shrink-0`} />
                          <span className="text-[13px] font-medium text-[#444]">{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-3 bg-[#111] text-white rounded-full pl-6 pr-[5px] py-[5px] hover:scale-105 transition-transform shadow-md group/cta"
                    >
                      <span className="text-[11px] font-extrabold uppercase tracking-widest">
                        {item.cta}
                      </span>
                      <span className="bg-white text-[#111] rounded-full w-[32px] h-[32px] flex items-center justify-center">
                        <ArrowRight size={15} strokeWidth={3} />
                      </span>
                    </Link>
                  </div>

                  {/* Right — Ideal For Card */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div className={`bg-[#F8F9FC] rounded-2xl p-6 border border-black/[0.04]`}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-[36px] h-[36px] rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center`}>
                          <item.icon size={18} className="text-white" strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#888]">
                          Ideal For
                        </span>
                      </div>
                      <p className="text-[14px] font-semibold text-[#333] leading-relaxed">
                        {item.ideal}
                      </p>
                    </div>

                    {/* Service highlights mini-grid */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {item.features.slice(0, 2).map((f, idx) => (
                        <div
                          key={idx}
                          className="bg-[#F8F9FC] rounded-xl px-4 py-3 border border-black/[0.03]"
                        >
                          <CheckCircle2 size={14} className={`${item.accentText} mb-1.5`} strokeWidth={2.5} />
                          <span className="text-[11px] font-semibold text-[#555] leading-tight block">{f.split("&")[0].trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: PRICING HIGHLIGHTS
          ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 sm:pb-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {pricingHighlights.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white/70 backdrop-blur-xl rounded-2xl px-5 py-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)] transition-all duration-400 group cursor-default text-center"
            >
              <div className="w-[44px] h-[44px] rounded-xl bg-[#F0F2F6] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#111] transition-colors duration-400">
                <item.icon size={20} className="text-[#444] group-hover:text-white transition-colors duration-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-[14px] font-bold text-[#111] tracking-tight mb-1">{item.label}</h4>
              <p className="text-[12px] text-[#888] font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: CTA BANNER
          ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 sm:pb-28">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative bg-[#0F1115] rounded-[32px] overflow-hidden"
        >
          {/* Glows */}
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

          <div className="relative z-10 px-8 sm:px-12 lg:px-20 py-16 sm:py-20 text-center">
            <h2 className="text-[clamp(1.6rem,4vw,3rem)] font-bold text-white tracking-[-0.02em] leading-[1.1] mb-5">
              Not sure which{" "}
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-purple-400 bg-clip-text text-transparent">
                solution
              </span>
              {" "}fits you?
            </h2>
            <p className="text-[15px] text-gray-400 max-w-[440px] mx-auto mb-10 leading-relaxed">
              Talk to us — we'll understand your needs and recommend the perfect plan. No commitment needed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="flex items-center gap-3 bg-white text-[#111] rounded-full pl-7 pr-[5px] py-[5px] hover:scale-105 transition-transform shadow-[0_8px_30px_rgba(255,255,255,0.1)] group"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-widest">
                  Get a Quote
                </span>
                <span className="bg-[#111] text-white rounded-full w-[34px] h-[34px] flex items-center justify-center">
                  <ArrowRight size={16} strokeWidth={3} />
                </span>
              </Link>
              <Link
                to="/chatbot"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/[0.15] text-[11px] font-extrabold uppercase tracking-widest text-gray-300 hover:bg-white/10 hover:text-white transition-all"
              >
                Ask Our AI
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}