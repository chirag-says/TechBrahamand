import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";

/* ================= ANIMATION ================= */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    contactEmail: "",
    target: "TechCreator",
    budget: "",
    timeline: "",
    description: "",
  });

  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'
  const [isPreFilled, setIsPreFilled] = useState(false);
  const location = useLocation();

  // Pre-fill form from chatbot navigation state
  useEffect(() => {
    if (location.state?.prefill) {
      const { target, budget, description, timeline } = location.state.prefill;
      setFormData(prev => ({
        ...prev,
        ...(target && { target }),
        ...(budget && { budget }),
        ...(description && { description }),
        ...(timeline && { timeline }),
      }));
      setIsPreFilled(true);
      // Clear the navigation state so refresh doesn't re-apply
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Send email directly from the browser via EmailJS
      // No backend needed — configure these IDs at https://www.emailjs.com
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.contactEmail,
          phone: formData.phone,
          service: formData.target,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.description,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setIsPreFilled(false);
      setFormData({
        name: "",
        phone: "",
        contactEmail: "",
        target: "TechCreator",
        budget: "",
        timeline: "",
        description: "",
      });
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
    }
  };

  const contactCards = [
    {
      icon: Mail,
      title: "Email us",
      detail: "contact@techbrahmand.com",
      href: "mailto:contact@techbrahmand.com",
    },
    {
      icon: Phone,
      title: "Call us",
      detail: "Available on inquiry",
      href: "#",
    },
    {
      icon: MapPin,
      title: "Our location",
      detail: "India",
      href: "#",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#F3F5F9] text-[#111] overflow-y-auto font-sans">

      {/* ===== BACKGROUND EFFECTS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Giant "CONTACT" watermark text */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 select-none pointer-events-none">
          <span
            className="text-[clamp(80px,14vw,220px)] font-black uppercase tracking-[0.05em] leading-none"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(0,0,0,0.12)',
            }}
          >
            CONTACT
          </span>
        </div>

        {/* Subtle glow accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/15 blur-[120px] rounded-full" />

        {/* Decorative corner dots */}
        <svg className="absolute top-[18%] right-[8%] w-3 h-3 text-black/10" viewBox="0 0 12 12">
          <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute top-[45%] right-[5%] w-2 h-2 text-black/8" viewBox="0 0 12 12">
          <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Decorative diagonal lines */}
        <svg className="absolute top-[14%] right-[6%] w-[200px] h-[300px] opacity-[0.03]" viewBox="0 0 200 300">
          <line x1="0" y1="0" x2="200" y2="300" stroke="black" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-[10%] right-[4%] w-[150px] h-[200px] opacity-[0.03]" viewBox="0 0 150 200">
          <line x1="150" y1="0" x2="0" y2="200" stroke="black" strokeWidth="1" />
        </svg>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ==============================
              LEFT COLUMN — Info & Contact Cards
              ============================== */}
          <div className="pt-10">


            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em] leading-[1.1] text-[#111] mb-5"
            >
              Get in touch
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-[15px] text-[#666] leading-relaxed max-w-[400px] mb-12"
            >
              Have questions or ready to transform your business with cutting-edge technology? Let's talk.
            </motion.p>

            {/* Contact Info Cards */}
            <div className="flex flex-col gap-4">
              {contactCards.map((card, i) => (
                <motion.a
                  key={card.title}
                  href={card.href}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={3 + i}
                  className="group flex items-center gap-4 px-5 py-4 rounded-2xl border border-black/[0.06] bg-white/70 backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:bg-white transition-all duration-400 cursor-pointer"
                >
                  <div className="w-[48px] h-[48px] rounded-xl bg-[#F0F2F6] border border-black/[0.04] flex items-center justify-center shrink-0 group-hover:bg-[#111] transition-colors duration-400">
                    <card.icon size={20} className="text-[#444] group-hover:text-white transition-colors duration-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#111] tracking-tight">{card.title}</p>
                    <p className="text-[13px] text-[#888] group-hover:text-[#555] transition-colors truncate">{card.detail}</p>
                  </div>
                  <ArrowUpRight size={18} className="text-[#ccc] group-hover:text-[#111] shrink-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ==============================
              RIGHT COLUMN — Contact Form
              ============================== */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <div className="rounded-3xl border border-black/[0.06] bg-white/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-6 sm:p-8">

              {/* SUCCESS MESSAGE */}
              {status === "success" && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <p className="text-emerald-700 font-semibold text-sm">
                    Thank you! We've received your inquiry and will get back to you within 24 hours.
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
                  <p className="text-red-700 font-semibold text-sm">
                    Something went wrong. Please try again or reach out via email.
                  </p>
                </div>
              )}

              {/* PRE-FILLED FROM CHATBOT BANNER */}
              {isPreFilled && status !== "success" && (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200/60 rounded-xl flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-purple-800 font-semibold text-sm">Auto-filled from your AI chat</p>
                    <p className="text-purple-600/80 text-xs mt-0.5">We've pre-filled your project details. Just add your name, email, and phone to connect!</p>
                  </div>
                </motion.div>
              )}

              {/* FORM */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Name */}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Name"
                  className="w-full bg-transparent border border-black/[0.08] rounded-xl px-5 py-4 text-[14px] text-[#111] placeholder-[#aaa] outline-none focus:border-black/[0.2] focus:ring-2 focus:ring-black/[0.03] transition-all"
                />

                {/* Email */}
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="w-full bg-transparent border border-black/[0.08] rounded-xl px-5 py-4 text-[14px] text-[#111] placeholder-[#aaa] outline-none focus:border-black/[0.2] focus:ring-2 focus:ring-black/[0.03] transition-all"
                />

                {/* Phone */}
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                  className="w-full bg-transparent border border-black/[0.08] rounded-xl px-5 py-4 text-[14px] text-[#111] placeholder-[#aaa] outline-none focus:border-black/[0.2] focus:ring-2 focus:ring-black/[0.03] transition-all"
                />

                {/* Service Selection */}
                <select
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/[0.08] rounded-xl px-5 py-4 text-[14px] text-[#111] outline-none focus:border-black/[0.2] focus:ring-2 focus:ring-black/[0.03] transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 16px center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <option value="TechCreator">TechCreator — Build infrastructure</option>
                  <option value="TechPreserver">TechPreserver — Enhance systems</option>
                  <option value="TechTransformer">TechTransformer — Legacy modernization</option>
                  <option value="Multiple Services">Multiple Services</option>
                </select>

                {/* Budget & Timeline Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-black/[0.08] rounded-xl px-5 py-4 text-[14px] text-[#111] outline-none focus:border-black/[0.2] focus:ring-2 focus:ring-black/[0.03] transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 16px center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <option value="">Budget range</option>
                    <option value="Under ₹25,000">Under ₹25,000</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                    <option value="₹1,00,000 - ₹5,00,000">₹1,00,000 - ₹5,00,000</option>
                    <option value="₹5,00,000+">₹5,00,000+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>

                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-black/[0.08] rounded-xl px-5 py-4 text-[14px] text-[#111] outline-none focus:border-black/[0.2] focus:ring-2 focus:ring-black/[0.03] transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 16px center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <option value="">Timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="2-3 months">2-3 months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                {/* Message */}
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Message"
                  className="w-full bg-transparent border border-black/[0.08] rounded-xl px-5 py-4 text-[14px] text-[#111] placeholder-[#aaa] outline-none resize-none focus:border-black/[0.2] focus:ring-2 focus:ring-black/[0.03] transition-all"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`
                    w-full bg-[#111] text-white font-bold text-[15px] tracking-tight
                    py-4 rounded-xl
                    hover:bg-[#222] active:scale-[0.99]
                    transition-all duration-300
                    shadow-[0_4px_16px_rgba(0,0,0,0.12)]
                    hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]
                    flex items-center justify-center gap-2
                    ${status === "loading" ? "opacity-60 cursor-not-allowed" : ""}
                  `}
                >
                  {status === "loading" ? "Sending..." : "Submit"}
                  {status !== "loading" && <Send size={16} />}
                </button>

                <p className="text-[12px] text-[#999] text-center mt-1">
                  We'll respond within 24 hours via email or WhatsApp.
                </p>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}