import React from "react";
import { ArrowUpRight, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {

  const links = {
    Services: [
      { name: "Software as a Service (SaaS)", path: "/services" },
      { name: "Platform as a Service (PaaS)", path: "/services" },
      { name: "Infrastructure as a Service (IaaS)", path: "/services" },
    ],
    Company: [
      { name: "About Us", path: "/about" },
      { name: "Our Services", path: "/services" },
      { name: "Contact", path: "/contact" },
    ],
  };

  return (
    <footer className="relative overflow-hidden">

      {/* ═══════════════════════════════════════════ */}
      {/* MOBILE FOOTER — Light premium theme        */}
      {/* ═══════════════════════════════════════════ */}
      <div className="md:hidden bg-[#F3F5F9] relative">

        {/* Top separator */}
        <div className="mx-6 h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <div className="px-6 pt-10 pb-6">

          {/* Brand section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src="/techbrahmand-logo.png" alt="Tech Brahmand" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-[12.5px] text-[#666] font-medium leading-[1.7] max-w-[300px] mx-auto">
              An AI-first engineering house bridging operations with execution, enabling enterprises to scale and evolve.
            </p>
          </div>

          {/* CTA card */}
          <Link
            to="/chatbot"
            className="block w-full bg-[#0A0A0A] rounded-[20px] p-5 mb-8 group active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400 block mb-1">Let's Build Together</span>
                <span className="text-[14px] font-semibold text-white">Start a conversation</span>
              </div>
              <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight size={16} strokeWidth={2.5} className="text-[#111]" />
              </div>
            </div>
          </Link>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {Object.entries(links).map(([title, items]) => (
              <div key={title}>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#111] mb-4">
                  {title}
                </div>
                <ul className="space-y-3">
                  {items.map(item => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="text-[12.5px] text-[#666] font-medium hover:text-[#111] transition-colors flex items-center gap-1.5 group"
                      >
                        {item.name}
                        <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-500" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex justify-center gap-3 mb-8">
            {[
              { Icon: Twitter, label: "Twitter" },
              { Icon: Linkedin, label: "LinkedIn" },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="w-[42px] h-[42px] rounded-[12px] border border-black/8 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#555] hover:text-[#111] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:scale-95 transition-all"
              >
                <Icon size={16} strokeWidth={2} />
              </button>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-black/8 to-transparent mb-5" />
          <div className="flex items-center justify-between text-[10px] text-[#999] font-medium">
            <span>© {new Date().getFullYear()} TechBrahmand</span>
            <span className="flex items-center gap-1">
              India <span className="text-[12px]">🇮🇳</span>
            </span>
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* DESKTOP FOOTER — Original dark theme        */}
      {/* ═══════════════════════════════════════════ */}
      <div className="hidden md:block bg-black text-white">

        {/* top line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* MAIN */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">

            {/* BRAND */}
            <div className="col-span-2 lg:col-span-5 text-left">
              <div className="text-xl sm:text-2xl font-bold tracking-tight mb-3 sm:mb-4">
                TECHBRAHMAND
              </div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-sm">
                An AI-first engineering house bridging operations with execution, enabling enterprises to scale and evolve.
              </p>

              {/* SOCIAL */}
              <div className="flex justify-start gap-3 sm:gap-4">
                {[Twitter, Linkedin].map((Icon, i) => (
                  <button
                    key={i}
                    className="p-2.5 sm:p-3 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white hover:bg-white/5 transition"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* LINKS */}
            <div className="col-span-2 lg:col-span-7 grid grid-cols-2 gap-8 sm:gap-10 lg:gap-12 text-left">
              {Object.entries(links).map(([title, items]) => (
                <div key={title}>
                  <div className="font-semibold text-white text-sm sm:text-base mb-4 sm:mb-5">
                    {title}
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {items.map(item => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className="group flex items-center justify-start gap-2 text-gray-400 text-sm sm:text-base hover:text-white transition"
                        >
                          {item.name}
                          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-row justify-between items-center gap-3 sm:gap-4 text-left">
            <div className="text-xs sm:text-sm text-gray-500 md:pl-[380px] lg:pl-[420px]">
              © {new Date().getFullYear()} TechBrahmand. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-end gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <span className="text-gray-600">India 🇮🇳</span>
            </div>
          </div>
        </div>

        {/* glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] lg:w-[500px] h-[160px] lg:h-[200px] bg-white/5 blur-[100px] lg:blur-[120px]" />

      </div>

    </footer>
  );
}