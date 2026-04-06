import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Wrench,
  TrendingUp,
  Palette,
  ShieldCheck,
  Search,
  BarChart3,
  Activity,
  Globe,
  Server,
  Megaphone,
  FileText,
} from "lucide-react";


const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};


export default function Services() {

  const serviceCategories = [
    {
      category: "Tech Brahma — Creation",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      services: [
        {
          title: "Website Development",
          icon: <Code2 size={22} />,
          desc: "Custom-built responsive websites from landing pages to complex multi-page platforms.",
        },
        {
          title: "Web App & SaaS Development",
          icon: <Globe size={22} />,
          desc: "Full-stack web applications and SaaS products engineered for scale and performance.",
        },
        {
          title: "UI/UX Design & Branding",
          icon: <Palette size={22} />,
          desc: "Complete branding packages — logos, design systems, and user experiences that convert.",
        },
        {
          title: "E-Commerce Solutions",
          icon: <Server size={22} />,
          desc: "Online stores with secure payment processing, inventory management, and seamless checkout.",
        },
      ],
    },
    {
      category: "Tech Vishnu — Preservation",
      color: "text-cyan-700",
      bg: "bg-cyan-50",
      border: "border-cyan-100",
      services: [
        {
          title: "Bug Fixes & Security Patches",
          icon: <ShieldCheck size={22} />,
          desc: "Quick turnaround fixes and critical security updates to keep your platform safe.",
        },
        {
          title: "Hosting & Server Management",
          icon: <Server size={22} />,
          desc: "Reliable hosting setup, monitoring, and server optimization for uptime you can count on.",
        },
        {
          title: "SEO & Content Updates",
          icon: <Search size={22} />,
          desc: "On-page SEO optimization, keyword strategy, and fresh content to keep rankings climbing.",
        },
        {
          title: "Performance Monitoring",
          icon: <Activity size={22} />,
          desc: "Continuous performance tracking and optimization to ensure fast load times globally.",
        },
      ],
    },
    {
      category: "Tech Mahesh — Transformation",
      color: "text-purple-700",
      bg: "bg-purple-50",
      border: "border-purple-100",
      services: [
        {
          title: "Competitor SEO Audit",
          icon: <Search size={22} />,
          desc: "Deep-dive analysis of your competitor's SEO strategy with actionable recommendations.",
        },
        {
          title: "UI/UX Teardown",
          icon: <FileText size={22} />,
          desc: "Detailed breakdown of competitor interfaces with improvement suggestions for your platform.",
        },
        {
          title: "Market Positioning Report",
          icon: <BarChart3 size={22} />,
          desc: "Comprehensive market research to identify your unique positioning and growth opportunities.",
        },
        {
          title: "Ad Strategy & Growth",
          icon: <Megaphone size={22} />,
          desc: "Data-driven advertising strategies to maximize ROI and outperform competitors.",
        },
      ],
    },
  ];

  return (
  <div className="
    pt-22 sm:pt-24 lg:pt-32
    pb-16 sm:pb-20 lg:pb-24
    bg-white min-h-screen relative overflow-hidden
  ">

    {/* background */}
    <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white -z-10" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* HEADER */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center mb-10 sm:mb-20 lg:mb-24 max-w-4xl mx-auto"
      >

        {/* badge */}
        <div className="
          inline-flex items-center gap-2
          px-3 sm:px-4 py-2
          bg-white border border-slate-200
          shadow-sm rounded-full mb-4 sm:mb-6
        ">

          <Wrench size={14} className="text-slate-500" />

          <span className="
            text-[10px] sm:text-xs
            font-semibold tracking-wider
            text-slate-600 uppercase
          ">
            What We Do
          </span>

        </div>


        {/* heading */}
        <h1 className="
          font-bold tracking-tight text-slate-900 mb-4 sm:mb-6
          text-[clamp(1.5rem,6vw,4.5rem)]
        ">

          Every Service Your{" "}

          <span className="
            bg-gradient-to-r
            from-slate-900 via-slate-600 to-slate-400
            bg-clip-text text-transparent
          ">
            Business Needs
          </span>

        </h1>


        {/* text */}
        <p className="
          text-slate-500
          text-sm sm:text-base lg:text-lg
          max-w-2xl mx-auto
          leading-relaxed
        ">
          From building your digital foundation to maintaining it and helping you
          dominate the competition — here's everything we offer.
        </p>

      </motion.div>



      {/* SERVICE CATEGORIES */}
      {serviceCategories.map((cat, catIdx) => (

        <div key={catIdx} className="mb-14 sm:mb-20 lg:mb-24">

          {/* Category Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className={`
              text-lg sm:text-xl lg:text-2xl
              font-bold ${cat.color}
            `}>
              {cat.category}
            </h2>
            <div className={`mt-2 h-1 w-16 rounded-full ${cat.bg}`} />
          </div>

          {/* Services Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-4 sm:gap-6
            "
          >

            {cat.services.map((service, i) => (

              <motion.div
                key={i}
                variants={fadeInUp}
                className={`
                  group bg-white
                  border ${cat.border}
                  rounded-xl sm:rounded-2xl
                  p-5 sm:p-6
                  hover:shadow-xl
                  transition duration-500
                  flex flex-col
                `}
              >

                {/* icon */}
                <div className={`
                  w-12 h-12
                  rounded-lg sm:rounded-xl
                  flex items-center justify-center
                  mb-4
                  ${cat.bg} ${cat.color}
                `}>
                  {service.icon}
                </div>

                {/* title */}
                <h3 className="
                  text-base sm:text-lg
                  font-bold text-slate-900
                  mb-2
                ">
                  {service.title}
                </h3>

                {/* desc */}
                <p className="
                  text-sm
                  text-slate-500
                  leading-relaxed
                ">
                  {service.desc}
                </p>

              </motion.div>

            ))}

          </motion.div>

        </div>

      ))}


      {/* PRICING NOTE */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="
          bg-slate-50 border border-slate-200
          rounded-xl sm:rounded-2xl lg:rounded-3xl
          p-5 sm:p-8 lg:p-10
        "
      >

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-6 sm:gap-8 lg:gap-10
          text-center
        ">

          {[
            { label: "One-Time Projects", icon: <Code2 size={24} />, desc: "Fixed cost for complete deliverables" },
            { label: "AMC Plans", icon: <ShieldCheck size={24} />, desc: "Annual maintenance contracts for ongoing care" },
            { label: "Flexible Retainers", icon: <TrendingUp size={24} />, desc: "Ongoing support tailored to your needs" },
          ].map((item, i) => (

            <div key={i} className="flex flex-col items-center">

              <div className="
                w-12 h-12 sm:w-14 sm:h-14
                bg-white border border-slate-200
                rounded-lg sm:rounded-xl
                flex items-center justify-center
                mb-3 sm:mb-4
                text-slate-700
              ">
                {item.icon}
              </div>

              <div className="
                text-sm sm:text-base
                font-bold tracking-wide
                text-slate-800 mb-1
              ">
                {item.label}
              </div>

              <div className="
                text-xs sm:text-sm
                text-slate-500
              ">
                {item.desc}
              </div>

            </div>

          ))}

        </div>

      </motion.div>


    </div>
  </div>
);
}