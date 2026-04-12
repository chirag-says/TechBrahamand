import React from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Code2,
  ShieldCheck,
  TrendingUp,
  ChevronRight
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Services() {
  const serviceCategories = [
    {
      category: "AI Solutions",
      description: "Integrating advanced AI capabilities to optimize workflows, automate tasks, and build truly intelligent digital experiences for your brand.",
      videoUrl: "/431d8fdae126384f744056a7e616896f_720w.mp4",
      linkText: "EXPLORE AI SERVICES",
      services: [
        "GENERATIVE AI & LLMs",
        "INTELLIGENT CHATBOTS",
        "AI CAPABILITY INTEGRATION",
        "AI STRATEGY CONSULTING",
      ],
      themeColor: "from-amber-200 to-amber-100",
    },
    {
      category: "Machine Learning Solutions",
      description: "Leverage data-driven forecasting, computer vision, and deep analytics to anticipate trends and dominate your market.",
      videoUrl: "/c780455026110284ea07a4e793fff651.mp4",
      linkText: "EXPLORE ML SERVICES",
      services: [
        "PREDICTIVE ANALYTICS",
        "COMPUTER VISION",
        "NATURAL LANGUAGE PROCESSING",
        "RECOMMENDATION ENGINES",
      ],
      themeColor: "from-cyan-200 to-cyan-100",
    },
    {
      category: "App Development",
      description: "Custom app development with strategic insights to generate greater brand engagement, higher conversions & measurable results.",
      videoUrl: "/2478bf3628d5f9ae72c8e0a3cbbb549c.mp4",
      linkText: "EXPLORE APP SERVICES",
      services: [
        "IOS NATIVE DEVELOPMENT",
        "ANDROID NATIVE DEVELOPMENT",
        "CROSS-PLATFORM (REACT NATIVE)",
        "APP UI/UX DESIGN",
      ],
      themeColor: "from-purple-200 to-purple-100",
    },
    {
      category: "Custom Software (ERP)",
      description: "Bespoke Enterprise Resource Planning solutions to unify your business operations, supply chains, and customer relationship workflows.",
      videoUrl: "/c24dcfc9f7c5d0463893f71a972aab76.mp4",
      linkText: "EXPLORE ERP SERVICES",
      services: [
        "ENTERPRISE ERP DEVELOPMENT",
        "SUPPLY CHAIN MANAGEMENT",
        "CRM SYSTEMS INTEGRATION",
        "CORE WORKFLOW AUTOMATION",
      ],
      themeColor: "from-emerald-200 to-emerald-100",
    },
    {
      category: "Cloud Computing",
      description: "Secure, highly available cloud infrastructures designed on AWS, Azure, and GCP for limitless scalability.",
      videoUrl: "/b9121259b70d9b0185da316e475b1f5e.mp4",
      linkText: "EXPLORE CLOUD SERVICES",
      services: [
        "SEAMLESS CLOUD MIGRATION",
        "DEVOPS & CI/CD PIPELINES",
        "SCALABLE ARCHITECTURE",
        "ADVANCED CLOUD SECURITY",
      ],
      themeColor: "from-blue-200 to-blue-100",
    },
  ];

  return (
    <div className="pt-22 sm:pt-24 lg:pt-32 pb-32 sm:pb-40 bg-white h-full relative overflow-y-auto font-sans">
      
      {/* Original Light Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* HEADER */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-16 sm:mb-24 lg:mb-32 max-w-4xl mx-auto"
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

          <h1 className="font-bold tracking-tight text-slate-900 mb-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-tight">
            Every Service Your{" "}
            <span className="bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 bg-clip-text text-transparent">
              Business Needs
            </span>
          </h1>

          <p className="text-slate-500 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
             From building your digital foundation to automating success with Artificial Intelligence. Here's everything we offer to give you the competitive edge.
          </p>
        </motion.div>

        {/* SERVICE CATEGORIES ALTERNATING */}
        {serviceCategories.map((cat, catIdx) => {
          const isEven = catIdx % 2 !== 0;

          return (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-24 lg:mb-36 ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text Side */}
              <div className="flex-1 w-full order-2 lg:order-none">
                <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {cat.category}
                </h2>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                  {cat.description}
                </p>
                
                <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 transition-colors text-white font-semibold px-6 py-3.5 rounded-lg text-sm mb-10 shadow-lg shadow-slate-900/10 tracking-wider">
                  {cat.linkText}
                  <ChevronRight size={18} strokeWidth={2.5} />
                </button>

                <ul className="space-y-4">
                  {cat.services.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm tracking-wide">
                      {/* Triangle indicator matching original design idea but styled for light mode */}
                      <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400 mt-0.5">
                        <path d="M8 5L0 10V0L8 5Z" fill="currentColor"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video/Image Side */}
              <div className="flex-1 w-full order-1 lg:order-none relative group">
                {/* A subtle colored glowing blur behind the video box for light mode */}
                <div className={`absolute -inset-4 bg-gradient-to-r ${cat.themeColor} rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition duration-700 -z-10`}></div>
                
                {/* The offset corner styling behind video */}
                <div className={`absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br ${cat.themeColor} rounded-2xl transform translate-x-2 translate-y-2 opacity-50 -z-10`}></div>
                
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] shadow-2xl shadow-slate-200/50 border border-slate-200/60 bg-white">
                  <video 
                    src={cat.videoUrl} 
                    className="w-full h-full object-cover scale-[1.02] group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                  />
                  {/* subtle overlay */}
                  <div className="absolute inset-0 bg-slate-900/5 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* PRICING NOTE - Restored to Light Theme */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mt-32 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 text-center">
            {[
              { label: "One-Time Projects", icon: <Code2 size={24} />, desc: "Fixed cost for complete deliverables" },
              { label: "AMC Plans", icon: <ShieldCheck size={24} />, desc: "Annual maintenance contracts for ongoing care" },
              { label: "Flexible Retainers", icon: <TrendingUp size={24} />, desc: "Ongoing support tailored to your needs" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white border border-slate-200 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 text-slate-700 shadow-sm">
                  {item.icon}
                </div>
                <div className="text-sm sm:text-base font-bold tracking-wide text-slate-800 mb-1">
                  {item.label}
                </div>
                <div className="text-xs sm:text-sm text-slate-500">
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