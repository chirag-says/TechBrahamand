import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
  Globe,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ================= DATA ================= */

const trinityData = [
  {
    title: "Tech Brahma",
    subtitle: "The Creator",
    image: "/brahma.png",
    desc: "We build stunning websites, web apps, SaaS platforms, and complete branding packages — everything your business needs to go digital.",
    gradient: "from-amber-50 to-orange-50",
    border: "border-amber-100",
    text: "text-amber-700",
  },
  {
    title: "Tech Vishnu",
    subtitle: "The Preserver",
    image: "/vishnu.png",
    desc: "We maintain your digital presence with bug fixes, hosting management, SEO, performance monitoring, and security patches — so it never skips a beat.",
    gradient: "from-cyan-50 to-blue-50",
    border: "border-cyan-100",
    text: "text-cyan-700",
  },
  {
    title: "Tech Mahesh",
    subtitle: "The Transformer",
    image: "/mahesh.png",
    desc: "We analyze your competitors and arm you with SEO audits, UI/UX teardowns, market positioning, and ad strategies to give you a decisive edge.",
    gradient: "from-purple-50 to-indigo-50",
    border: "border-purple-100",
    text: "text-purple-700",
  },
];

export default function About() {
  return (
    <div className="bg-[#FAFAFA] text-slate-900 min-h-screen overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-20%] w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-blue-50/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-purple-50/50 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-22 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">

        {/* ================= HERO ================= */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-12 sm:mb-24 lg:mb-32"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <Globe size={14} className="text-slate-500" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-slate-600">
              About TechBrahmand
            </span>
          </div>

          <h1 className="font-semibold tracking-tight leading-tight mb-6 text-[clamp(1.5rem,6vw,4.5rem)]">
            Your Complete Digital Partner
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            TechBrahmand is a full-service digital agency that builds, maintains, and
            strategizes for businesses of all sizes. Currently serving clients across India
            with aspirations to go global.
          </p>
        </motion.header>

        {/* ================= WHO / WHY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 sm:mb-24">

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-[2.5rem] border border-slate-100 shadow-sm">
            <Users className="mb-4 text-slate-900" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
              Who We Are
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mb-6">
              A passionate team of developers, designers, and strategists who believe
              your digital presence should work as hard as you do. We handle everything
              from building your first website to outmaneuvering your competitors.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {["Web Development", "Maintenance & AMC", "Competitive Strategy", "Branding"].map((item) => (
                <span key={item} className="px-3 py-1.5 text-xs font-bold bg-slate-50 border border-slate-100 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-[2.5rem] relative overflow-hidden">
            <Target className="mb-4" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
              Why We Exist
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Too many businesses struggle with unreliable agencies, scattered freelancers,
              and digital platforms that don't grow with them. We exist to be the one
              partner you need for everything digital.
            </p>
            <Globe className="absolute -bottom-10 -right-10 opacity-10 w-32 h-32 sm:w-48 sm:h-48" />
          </div>
        </div>

        {/* ================= TRINITY ================= */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center mb-10">
            <h2 className="text-xs uppercase tracking-[0.3em] font-black text-slate-400">
              The Trinity Methodology
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trinityData.map((item, i) => (
              <div
                key={i}
                className={`p-6 sm:p-8 rounded-2xl border ${item.border} bg-gradient-to-b ${item.gradient}`}
              >
                {/* Image */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 ${item.border} mb-4 shadow-md`}>
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <span className={`text-[10px] uppercase tracking-widest font-bold ${item.text}`}>
                  Phase 0{i + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-black mt-3 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs uppercase text-slate-400 mb-4">
                  {item.subtitle}
                </p>
                <p className="text-sm text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= WHO WE SERVE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-black text-slate-400 mb-6">
              Who We Serve
            </h2>
            <div className="flex flex-wrap gap-3">
              {["Startups", "Small & Medium Businesses", "Enterprises", "Entrepreneurs"].map((ind) => (
                <div key={ind} className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold shadow-sm">
                  {ind}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-widest font-black text-slate-400 mb-6">
              Our Principles
            </h2>
            <div className="space-y-3">
              {[
                "No templates — every project is custom-built",
                "Transparent pricing with flexible plans",
                "Your growth is our success metric",
              ].map((guard) => (
                <div key={guard} className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs sm:text-sm font-bold">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  {guard}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-[3rem] p-8 sm:p-12 lg:p-20 text-center">
          <Sparkles className="mx-auto mb-6 text-blue-400" size={36} />
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-6">
            Ready to get started?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mb-8 max-w-xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
          <Link to="/contact">
            <button className="bg-white text-black px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 mx-auto hover:scale-105 transition">
              Get In Touch
              <ArrowRight />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}