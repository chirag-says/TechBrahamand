import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import axios from "axios";

/* ================= ANIMATION ================= */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    contactEmail: "",
    target: "Tech Brahma",
    budget: "",
    timeline: "",
    description: "",
  });

  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:2000/api";
      await axios.post(`${apiUrl}/projects/start-project`, formData);
      setStatus("success");
      setFormData({
        name: "",
        phone: "",
        contactEmail: "",
        target: "Tech Brahma",
        budget: "",
        timeline: "",
        description: "",
      });
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white text-slate-900 h-full relative overflow-y-auto">

      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[300px] sm:w-[500px] lg:w-[800px] h-[300px] sm:h-[500px] lg:h-[800px] bg-slate-200/40 blur-[120px] sm:blur-[160px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[300px] sm:w-[500px] lg:w-[800px] h-[300px] sm:h-[500px] lg:h-[800px] bg-slate-200/40 blur-[120px] sm:blur-[160px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-22 sm:pt-28 lg:pt-32 pb-32 sm:pb-40 lg:pb-40">

        {/* ================= HEADER ================= */}

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-4 sm:mb-16 lg:mb-20"
        >

          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm mb-4 sm:mb-6">
            <Mail size={14} className="text-slate-500" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Get In Touch
            </span>
          </div>

          <h1 className="
            font-bold tracking-tight leading-tight mb-4 sm:mb-6
            text-[clamp(1.5rem,6vw,4rem)]
          ">
            Let's Build Something <br />

            <span className="bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 bg-clip-text text-transparent">
              Great Together
            </span>

          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-500 leading-relaxed">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>

        </motion.div>



        {/* ================= FORM CARD ================= */}

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >

          <div className="
            bg-white
            border border-slate-300
            rounded-2xl sm:rounded-3xl
            p-5 sm:p-8 lg:p-14
            shadow-lg hover:shadow-xl
            transition
            max-w-5xl
            mx-auto
          ">

            {/* Form Header */}
            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 lg:mb-10">
              <Sparkles size={16} className="text-slate-400" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
                Project Inquiry
              </span>
            </div>

            {/* SUCCESS MESSAGE */}
            {status === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                <p className="text-green-700 font-semibold text-sm sm:text-base">
                  ✅ Thank you! We've received your inquiry and will get back to you soon.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
                <p className="text-red-700 font-semibold text-sm sm:text-base">
                  ❌ Something went wrong. Please try again or reach out via email.
                </p>
              </div>
            )}


            {/* FORM */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

              {/* Name */}
              <div className="relative">
                <label className="text-xs text-slate-400 mb-1 block font-semibold">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="
                    w-full border border-slate-200 rounded-xl
                    px-4 py-3 sm:py-4 text-sm sm:text-base
                    outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition
                  "
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <label className="text-xs text-slate-400 mb-1 block font-semibold">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98765 43210"
                  className="
                    w-full border border-slate-200 rounded-xl
                    px-4 py-3 sm:py-4 text-sm sm:text-base
                    outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition
                  "
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label className="text-xs text-slate-400 mb-1 block font-semibold">Email Address *</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="
                    w-full border border-slate-200 rounded-xl
                    px-4 py-3 sm:py-4 text-sm sm:text-base
                    outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition
                  "
                />
              </div>

              {/* Service Selection */}
              <div className="relative">
                <label className="text-xs text-slate-400 mb-1 block font-semibold">Service Needed *</label>
                <select
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  className="
                    w-full border border-slate-200 rounded-xl
                    px-4 py-3 sm:py-4 text-sm sm:text-base
                    outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition
                  "
                >
                  <option value="Tech Brahma">Tech Brahma — Build something new</option>
                  <option value="Tech Vishnu">Tech Vishnu — Maintain my platform</option>
                  <option value="Tech Mahesh">Tech Mahesh — Competitor analysis</option>
                  <option value="Multiple Services">Multiple Services</option>
                </select>
              </div>

              {/* Budget */}
              <div className="relative">
                <label className="text-xs text-slate-400 mb-1 block font-semibold">Budget Range *</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="
                    w-full border border-slate-200 rounded-xl
                    px-4 py-3 sm:py-4 text-sm sm:text-base
                    outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition
                  "
                >
                  <option value="">Select budget range</option>
                  <option value="Under ₹25,000">Under ₹25,000</option>
                  <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                  <option value="₹1,00,000 - ₹5,00,000">₹1,00,000 - ₹5,00,000</option>
                  <option value="₹5,00,000+">₹5,00,000+</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>

              {/* Timeline */}
              <div className="relative">
                <label className="text-xs text-slate-400 mb-1 block font-semibold">Timeline *</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  className="
                    w-full border border-slate-200 rounded-xl
                    px-4 py-3 sm:py-4 text-sm sm:text-base
                    outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition
                  "
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2-3 months">2-3 months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              {/* Description */}
              <div className="sm:col-span-2 relative">
                <label className="text-xs text-slate-400 mb-1 block font-semibold">Project Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  className="
                    w-full border border-slate-200 rounded-xl
                    px-4 py-3 sm:py-4 text-sm sm:text-base
                    outline-none resize-none
                    focus:border-black focus:ring-2 focus:ring-black/5 transition
                  "
                />
              </div>

              <div className="
                sm:col-span-2
                flex flex-col sm:flex-row
                items-center justify-between
                gap-4 sm:gap-6
                mt-4 sm:mt-6
              ">

                <p className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
                  We'll respond within 24 hours via email or WhatsApp.
                </p>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`
                    bg-black text-white
                    px-6 sm:px-8 lg:px-10
                    py-3 sm:py-4
                    rounded-xl
                    text-sm sm:text-base
                    font-semibold
                    hover:scale-[1.03]
                    hover:bg-slate-800
                    transition
                    flex items-center gap-2
                    ${status === "loading" ? "opacity-60 cursor-not-allowed" : ""}
                  `}
                >
                  {status === "loading" ? "Sending..." : "Send Inquiry"}
                  <Send size={16} />
                </button>

              </div>

            </form>

          </div>

        </motion.div>


        {/* ================= CONTACT INFO ================= */}

        <div className="
          mt-12 sm:mt-16 lg:mt-20
          grid grid-cols-1 sm:grid-cols-2 gap-4
          max-w-2xl mx-auto
        ">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <Mail size={18} className="text-slate-500" />
            <div>
              <p className="text-xs text-slate-400 font-semibold">Email</p>
              <p className="text-sm font-bold text-slate-700">contact@techbrahmand.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <Phone size={18} className="text-slate-500" />
            <div>
              <p className="text-xs text-slate-400 font-semibold">WhatsApp</p>
              <p className="text-sm font-bold text-slate-700">Available on inquiry</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}