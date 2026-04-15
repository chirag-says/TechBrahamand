import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, Aperture, Shield, Brain } from 'lucide-react';

const MarqueeBanner = ({ 
  direction = 'left', 
  skewClass = '-skew-y-1', 
  containerBg = '',
  marginTop = 'mt-[-20px]',
  marginBottom = 'mb-0'
}) => {
  const items = [
    { text: "AUTONOMOUS AI", icon: Brain },
    { text: "INTELLIGENT INFRASTRUCTURE", icon: Cpu },
    { text: "LEGACY MODERNIZATION", icon: Zap },
    { text: "AI AGENTS", icon: Activity },
    { text: "ENTERPRISE SCALE", icon: Shield },
    { text: "TECHBRAHMAND", icon: Aperture },
  ];

  // Repeat items to ensure seamless infinite scroll
  const duplicatedItems = [...items, ...items, ...items, ...items];

  // If left, moves from 0 to -1035. If right, moves from -1035 to 0.
  const animateX = direction === 'left' ? [0, -1035] : [-1035, 0];

  return (
    <div className={`relative w-full z-40 ${containerBg} ${marginBottom}`}>
      <div className={`relative w-full overflow-hidden bg-[#111] border-y border-purple-500/30 py-3 md:py-4 transform origin-left ${skewClass} ${marginTop} pb-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}>
        
        {/* Red/Purple cinematic tint overlay like the reference */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-purple-900/40 to-black/80 pointer-events-none mix-blend-multiply" />
        
        <div className="flex whitespace-nowrap">
          <motion.div
            className="flex items-center gap-8 md:gap-16"
            animate={{ x: animateX }} // Adjust based on content width to loop seamlessly
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {duplicatedItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <Icon size={18} className="text-red-500" strokeWidth={2.5} />
                  <span className="text-white font-heading font-black tracking-[0.2em] uppercase text-sm md:text-base opacity-90">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
