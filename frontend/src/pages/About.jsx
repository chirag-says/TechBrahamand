import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  Shield,
  Layers,
  Code2,
  Palette,
  BarChart3,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ================= ANIMATION HELPERS ================= */

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
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ================= TRINITY DATA ================= */

const trinityData = [
  {
    title: "Tech Brahma",
    subtitle: "The Creator",
    image: "/brahma.png",
    desc: "We build stunning websites, web apps, SaaS platforms, and complete branding packages — everything your business needs to conquer digital.",
    icon: Code2,
    accent: "from-amber-500 to-orange-600",
    accentLight: "bg-amber-50",
    accentBorder: "border-amber-200/60",
    accentText: "text-amber-600",
    accentGlow: "bg-amber-400/10",
  },
  {
    title: "Tech Vishnu",
    subtitle: "The Preserver",
    image: "/vishnu.png",
    desc: "We maintain your digital presence with bug fixes, hosting, SEO, performance monitoring, and security patches — so it never skips a beat.",
    icon: Shield,
    accent: "from-cyan-500 to-blue-600",
    accentLight: "bg-cyan-50",
    accentBorder: "border-cyan-200/60",
    accentText: "text-cyan-600",
    accentGlow: "bg-cyan-400/10",
  },
  {
    title: "Tech Mahesh",
    subtitle: "The Transformer",
    image: "/mahesh.png",
    desc: "We analyze your competitors and arm you with SEO audits, UI/UX teardowns, market positioning, and ad strategies for a decisive edge.",
    icon: BarChart3,
    accent: "from-purple-500 to-indigo-600",
    accentLight: "bg-purple-50",
    accentBorder: "border-purple-200/60",
    accentText: "text-purple-600",
    accentGlow: "bg-purple-400/10",
  },
];

const capabilities = [
  { icon: Code2, label: "Custom Development" },
  { icon: Palette, label: "Brand Design" },
  { icon: Shield, label: "Maintenance & AMC" },
  { icon: BarChart3, label: "Competitor Analysis" },
  { icon: Globe, label: "SEO & Growth" },
  { icon: Layers, label: "SaaS Platforms" },
];

const principles = [
  "No templates — every project is custom-built",
  "Transparent pricing with flexible plans",
  "24/7 dedicated support & monitoring",
  "Your growth is our success metric",
];

export default function About() {
  return (
    <div className="bg-[#F3F5F9] text-[#111] min-h-screen overflow-y-auto font-sans tracking-tight">

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO — Big Statement with Watermark
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          <span
            className="text-[clamp(100px,18vw,280px)] font-black uppercase tracking-[0.04em] leading-none whitespace-nowrap"
            style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(0,0,0,0.04)' }}
          >
            ABOUT US
          </span>
        </div>

        {/* Soft glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/15 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-200/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-28">

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[2px] bg-[#111]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888]">
                About TechBrahmand
              </span>
            </div>

            <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Your Complete{" "}
              <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                Digital Partner
              </span>
            </h1>

            <p className="text-[16px] sm:text-[18px] text-[#555] font-medium leading-relaxed max-w-[540px] mb-10">
              We build, maintain, and strategize for businesses of all sizes. One team. Full-stack digital excellence. Currently serving clients across India with aspirations to go global.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="flex items-center gap-3 bg-[#111] text-white rounded-full pl-6 pr-[5px] py-[5px] hover:scale-105 transition-transform shadow-md group"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-widest">
                  Our Services
                </span>
                <span className="bg-white text-[#111] rounded-full w-[32px] h-[32px] flex items-center justify-center">
                  <ArrowRight size={15} strokeWidth={3} />
                </span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-black/[0.1] text-[11px] font-extrabold uppercase tracking-widest text-[#555] hover:bg-white hover:text-[#111] hover:border-black/[0.15] transition-all"
              >
                Get In Touch
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="mx-6 sm:mx-8 lg:mx-12 max-w-6xl lg:mx-auto h-[1px] bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

      {/* ═══════════════════════════════════════════
          SECTION 2: WHO WE ARE / WHY WE EXIST — Bento Cards
          ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Who We Are — Large Card */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-7 bg-white/80 backdrop-blur-xl rounded-[28px] p-8 sm:p-10 border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group"
          >
            <div className="w-[48px] h-[48px] rounded-xl bg-[#F0F2F6] flex items-center justify-center mb-6 group-hover:bg-[#111] transition-colors duration-400">
              <Layers size={22} className="text-[#333] group-hover:text-white transition-colors duration-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-[28px] sm:text-[34px] font-bold tracking-[-0.02em] leading-[1.1] mb-4">
              Who We Are
            </h2>
            <p className="text-[15px] text-[#555] leading-relaxed mb-8 max-w-[480px]">
              A passionate team of developers, designers, and strategists who believe your digital presence should work as hard as you do. We handle everything from building your first website to outmaneuvering your competitors.
            </p>

            {/* Capability Pills */}
            <div className="flex flex-wrap gap-2.5">
              {capabilities.map((cap) => (
                <div
                  key={cap.label}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#F3F5F9] rounded-full border border-black/[0.04] hover:bg-[#111] hover:text-white transition-all duration-300 cursor-default group/pill"
                >
                  <cap.icon size={14} className="text-[#888] group-hover/pill:text-white transition-colors" strokeWidth={2} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em]">{cap.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Why We Exist — Dark Card */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-5 bg-[#0F1115] text-white rounded-[28px] p-8 sm:p-10 relative overflow-hidden group"
          >
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-[200px] h-[200px] bg-purple-500/10 blur-[80px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-[48px] h-[48px] rounded-xl bg-white/10 border border-white/[0.08] flex items-center justify-center mb-6">
                <Zap size={22} className="text-purple-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-bold tracking-[-0.02em] leading-[1.1] mb-4">
                Why We Exist
              </h2>
              <p className="text-[15px] text-gray-400 leading-relaxed">
                Too many businesses struggle with unreliable agencies, scattered freelancers, and digital platforms that don't grow with them. We exist to be the <span className="text-white font-semibold">one partner</span> you need for everything digital.
              </p>
            </div>

            {/* Decorative globe */}
            <Globe className="absolute -bottom-6 -right-6 w-[120px] h-[120px] text-white/[0.03]" strokeWidth={0.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: THE TRINITY METHODOLOGY
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Subtle purple gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0ECFA] via-[#E8E4F8] to-[#F3F5F9]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">

          {/* Section Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[6px] h-[6px] rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600">
                The Trinity Methodology
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-bold tracking-[-0.02em] leading-[1.1] text-[#1A1030] max-w-[500px]">
              Three pillars. One complete ecosystem.
            </h2>
          </motion.div>

          {/* Trinity Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {trinityData.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className={`group relative bg-white/80 backdrop-blur-xl rounded-[24px] p-7 border ${item.accentBorder} shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden cursor-pointer`}
              >
                {/* Background glow on hover */}
                <div className={`absolute -top-20 -right-20 w-[180px] h-[180px] ${item.accentGlow} blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Image + Phase */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-[56px] h-[56px] rounded-2xl overflow-hidden border-2 ${item.accentBorder} shadow-md shrink-0`}>
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase tracking-[0.15em] font-bold ${item.accentText}`}>
                        Phase 0{i + 1}
                      </span>
                      <h3 className="text-[18px] font-bold text-[#111] tracking-tight leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.12em] font-bold text-[#999] mb-3">
                    {item.subtitle}
                  </p>

                  <p className="text-[13px] text-[#555] leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Bottom arrow */}
                  <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${item.accentText}`}>Learn more</span>
                    <ArrowRight size={12} className={item.accentText} strokeWidth={3} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: PRINCIPLES & WHO WE SERVE
          ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Our Principles */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#111]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">
                Our Principles
              </span>
            </div>
            <div className="space-y-3">
              {principles.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 bg-white/70 backdrop-blur-xl rounded-2xl px-5 py-4 border border-black/[0.04] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-400 group cursor-default"
                >
                  <div className="w-[36px] h-[36px] rounded-xl bg-emerald-50 border border-emerald-200/50 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors duration-400">
                    <CheckCircle2 size={16} className="text-emerald-500 group-hover:text-white transition-colors duration-400" strokeWidth={2} />
                  </div>
                  <span className="text-[13px] font-semibold text-[#333]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Who We Serve */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#111]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">
                Who We Serve
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Startups", desc: "From MVP to market fit", icon: Zap },
                { label: "SMBs", desc: "Scale without the chaos", icon: BarChart3 },
                { label: "Enterprises", desc: "Enterprise-grade digital", icon: Shield },
                { label: "Entrepreneurs", desc: "Your idea, our execution", icon: Code2 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl px-5 py-5 border border-black/[0.04] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] transition-all duration-400 group cursor-default"
                >
                  <div className="w-[40px] h-[40px] rounded-xl bg-[#F0F2F6] flex items-center justify-center mb-3 group-hover:bg-[#111] transition-colors duration-400">
                    <item.icon size={18} className="text-[#444] group-hover:text-white transition-colors duration-400" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[15px] font-bold text-[#111] tracking-tight mb-1">{item.label}</h4>
                  <p className="text-[12px] text-[#888] font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: CTA BANNER
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
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

          <div className="relative z-10 px-8 sm:px-12 lg:px-20 py-16 sm:py-20 text-center">
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white tracking-[-0.02em] leading-[1.1] mb-5">
              Ready to build something{" "}
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-purple-400 bg-clip-text text-transparent">
                extraordinary
              </span>
              ?
            </h2>
            <p className="text-[15px] text-gray-400 max-w-[460px] mx-auto mb-10 leading-relaxed">
              Tell us about your project and we'll get back to you within 24 hours. Let's create something the world remembers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="flex items-center gap-3 bg-white text-[#111] rounded-full pl-7 pr-[5px] py-[5px] hover:scale-105 transition-transform shadow-[0_8px_30px_rgba(255,255,255,0.1)] group"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-widest">
                  Get In Touch
                </span>
                <span className="bg-[#111] text-white rounded-full w-[34px] h-[34px] flex items-center justify-center">
                  <ArrowRight size={16} strokeWidth={3} />
                </span>
              </Link>
              <Link
                to="/chatbot"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/[0.15] text-[11px] font-extrabold uppercase tracking-widest text-gray-300 hover:bg-white/10 hover:text-white transition-all"
              >
                Try Our AI
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}