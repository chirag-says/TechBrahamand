import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Products() {

  const products = [
    {
      title: "Tech Brahma",
      subtitle: "The Creator",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      btnBg: "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20",
      image: "/brahma.png",
      desc: "We build complete digital products from scratch — websites, web apps, SaaS platforms, e-commerce stores, and full branding packages tailored to your vision.",
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
      color: "text-cyan-700",
      bg: "bg-cyan-50",
      border: "border-cyan-100",
      btnBg: "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-600/20",
      image: "/vishnu.png",
      desc: "We keep your digital presence alive and thriving. From routine maintenance to emergency fixes, we ensure your platform runs at peak performance 24/7.",
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
      color: "text-purple-700",
      bg: "bg-purple-50",
      border: "border-purple-100",
      btnBg: "bg-purple-600 hover:bg-purple-700 shadow-purple-600/20",
      image: "/mahesh.png",
      desc: "We analyze your competitors and arm you with strategic intelligence. Through deep audits and market insights, we give you the edge to dominate your space.",
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

  return (
  <div className="
    pt-28 sm:pt-24 lg:pt-32
    pb-32 sm:pb-32 lg:pb-40
    bg-white h-full relative overflow-y-auto
  ">

    {/* background */}
    <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white -z-10" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 sm:mb-20 lg:mb-32 max-w-4xl mx-auto"
      >

        {/* Badge */}
        <div className="
          inline-flex items-center gap-2 sm:gap-3
          px-4 sm:px-5 py-2
          rounded-full
          bg-gradient-to-b from-white to-slate-50
          border border-slate-200
          shadow-sm
          mb-2 sm:mb-8
        ">
          <Shield size={14} className="text-slate-500" />

          <span className="
            text-[10px] sm:text-[11px]
            font-semibold tracking-[0.18em]
            text-slate-600 uppercase
          ">
            Our Services
          </span>
        </div>


        {/* Heading */}
        <h1 className="
          font-bold tracking-tight leading-tight text-slate-900 mb-6 sm:mb-8
          text-[clamp(1.5rem,6vw,4.5rem)]
        ">

          Three Pillars.{" "}

          <span className="
            bg-gradient-to-r
            from-slate-900 via-slate-600 to-slate-400
            bg-clip-text text-transparent
          ">
            One Mission.
          </span>

        </h1>


        {/* Subtext */}
        <p className="
          text-slate-500
          text-[12px] sm:text-base lg:text-lg
          leading-relaxed
          max-w-2xl mx-auto
        ">
          Whether you're starting from zero, need ongoing support, or want
          to crush your competition — we've got the right solution for you.
        </p>


        {/* Divider */}
        <div className="mt-6 sm:mt-12 flex items-center justify-center gap-3 sm:gap-4">

          <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-slate-300" />

          <div className="
            text-[8px] sm:text-xs
            tracking-[0.2em]
            text-slate-400 font-semibold uppercase
          ">
            Create · Preserve · Transform
          </div>

          <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-slate-300" />

        </div>

      </motion.div>


      {/* PRODUCTS GRID */}
      <motion.div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4 sm:gap-6 lg:gap-8
        "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {products.map((item, i) => (

          <motion.div
            key={i}
            variants={fadeInUp}
            className={`
              group relative
              p-5 sm:p-6 lg:p-8
              rounded-xl sm:rounded-2xl lg:rounded-3xl
              border ${item.border}
              bg-white hover:shadow-xl
              transition duration-500
              flex flex-col
            `}
          >

            {/* image */}
            <div className={`
              w-16 h-16 sm:w-20 sm:h-20
              rounded-xl sm:rounded-2xl
              overflow-hidden shadow-md
              mb-4 sm:mb-6
              border-2 ${item.border}
            `}>
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>


            {/* title */}
            <h2 className="
              text-2xl sm:text-xl lg:text-2xl
              font-bold text-slate-900 mb-1
            ">
              {item.title}
            </h2>


            <p className={`
              text-[10px] sm:text-xs
              uppercase tracking-widest
              font-semibold mb-3 sm:mb-4
              ${item.color}
            `}>
              {item.subtitle}
            </p>


            {/* desc */}
            <p className="
              text-sm sm:text-base
              text-slate-500 mb-4 sm:mb-6
              leading-relaxed
            ">
              {item.desc}
            </p>


            {/* features */}
            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 lg:mb-8">

              {item.features.map((f, idx) => (

                <li key={idx} className="
                  flex items-center gap-3
                  text-xs sm:text-sm
                  text-slate-600
                ">

                  <div className={`w-2 h-2 rounded-full ${item.bg}`} />

                  {f}

                </li>

              ))}

            </ul>


            {/* ideal */}
            <div className={`
              border
              p-3 sm:p-4
              rounded-lg sm:rounded-xl
              mb-4 sm:mb-6
              ${item.bg} ${item.border}
            `}>

              <div className={`
                text-[10px] sm:text-xs
                uppercase mb-1 font-semibold
                ${item.color}
              `}>
                Ideal For
              </div>

              <div className="
                text-xs sm:text-sm
                text-slate-700
              ">
                {item.ideal}
              </div>

            </div>


            {/* CTA */}
            <Link to="/contact">
              <button className={`
                mt-auto w-full
                text-white
                py-2.5 sm:py-3
                text-sm sm:text-base
                rounded-lg sm:rounded-xl
                font-semibold shadow-lg
                transition-all duration-300
                flex items-center justify-center gap-2
                ${item.btnBg}
              `}>

                {item.cta}

                <ArrowUpRight size={16} />

              </button>
            </Link>

          </motion.div>

        ))}

      </motion.div>


      {/* FOOTER NOTE */}
      <div className="
        text-center mt-12 sm:mt-16 lg:mt-20
        text-[10px] sm:text-xs
        uppercase tracking-widest
        text-slate-400 font-semibold
      ">
        AMC Plans Available · One-time & Ongoing · Flexible Pricing
      </div>

    </div>
  </div>
);
}