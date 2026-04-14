import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Brain, Cpu, ShieldCheck, Settings } from 'lucide-react';
import RobotModel from './RobotModel';

const InnovationSection = () => {
  return (
    <div className="w-full bg-[#F3F5F9] font-sans tracking-tight">

      {/* ===== SECTION 1: Unlock the Power of Innovation ===== */}
      <div className="px-8 md:px-16 lg:px-24 pt-16 pb-20">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#333]">Home</span>
          <ArrowUpRight size={12} className="text-[#888]" />
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#888]">Where Ideas Evolve</span>
        </div>

        {/* Top Content Row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column — Text + Cards */}
          <div className="flex-1 max-w-[560px]">
            <h2 className="text-[38px] lg:text-[46px] font-bold text-[#111] leading-[1.08] tracking-[-0.02em]">
              Unlock the Power of Innovation
            </h2>
            <p className="mt-4 text-[15px] text-[#555] font-medium leading-relaxed max-w-[440px]">
              Delivering transformative tech solutions that redefine the future of industries
            </p>

            {/* Feature Cards Row */}
            <div className="mt-10 flex gap-5">
              
              {/* Card 1: AI Strategies */}
              <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-[24px] p-6 border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-400 group cursor-pointer">
                <div className="w-[44px] h-[44px] rounded-xl bg-[#F0F2F6] flex items-center justify-center mb-4 group-hover:bg-[#111] transition-colors duration-400">
                  <Brain size={22} className="text-[#333] group-hover:text-white transition-colors duration-400" strokeWidth={1.5} />
                </div>
                <h4 className="text-[16px] font-bold text-[#111] tracking-tight">AI Strategies</h4>
                <p className="mt-2 text-[12px] text-[#666] leading-relaxed font-medium">
                  Harness the full potential of artificial intelligence
                </p>
              </div>

              {/* Card 2: Technology Enablement */}
              <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-[24px] p-6 border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-400 group cursor-pointer">
                <div className="w-[44px] h-[44px] rounded-xl bg-[#F0F2F6] flex items-center justify-center mb-4 group-hover:bg-[#111] transition-colors duration-400">
                  <Cpu size={22} className="text-[#333] group-hover:text-white transition-colors duration-400" strokeWidth={1.5} />
                </div>
                <h4 className="text-[16px] font-bold text-[#111] tracking-tight">Technology Enablement</h4>
                <p className="mt-2 text-[12px] text-[#666] leading-relaxed font-medium">
                  Leverage advanced tools to transform your business
                </p>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="mt-8 flex gap-4">
              <Link to="/services" className="flex items-center justify-between bg-[#111] rounded-full pl-6 pr-[4px] py-[4px] hover:scale-105 transition-transform group/btn shadow-md">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white mr-3">
                  See All Services
                </span>
                <span className="bg-white text-[#111] rounded-full w-[28px] h-[28px] flex items-center justify-center">
                  <ArrowRight size={14} strokeWidth={3} />
                </span>
              </Link>
              <Link to="/products" className="flex items-center justify-between bg-[#111] rounded-full pl-6 pr-[4px] py-[4px] hover:scale-105 transition-transform group/btn shadow-md">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white mr-3">
                  See All Products
                </span>
                <span className="bg-white text-[#111] rounded-full w-[28px] h-[28px] flex items-center justify-center">
                  <ArrowRight size={14} strokeWidth={3} />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column — AI Brain Image */}
          <div className="flex-1 flex justify-end">
            <div className="w-full max-w-[480px] aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-black/[0.06]">
              <img 
                src="/ai-brain-visual.png" 
                alt="AI Brain Visualization" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="mx-8 md:mx-16 lg:mx-24 h-[1px] bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />

      {/* ===== SECTION 2: Our Philosophy ===== */}
      <div className="relative w-full bg-gradient-to-br from-[#F0ECFA] via-[#E8E4F8] to-[#F3F5F9] overflow-hidden">
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="flex-1 max-w-[560px]">
            
            {/* Tag */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-[6px] h-[6px] rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600">Our Philosophy</span>
            </div>

            {/* Big Quote */}
            <h2 className="text-[34px] lg:text-[44px] font-bold text-[#1A1030] leading-[1.1] tracking-[-0.02em]">
              "Dare to build what <br/>
              <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">no one else</span> can imagine."
            </h2>
            
            <p className="mt-6 text-[14px] text-[#555] font-medium leading-relaxed max-w-[420px]">
              At TechBrahmand, we architect ecosystems that evolve, adapt, and redefine what's possible — pushing the boundaries of AI, design, and engineering.
            </p>

            {/* Two Feature Pills */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              
              {/* Pill 1 */}
              <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-[20px] px-6 py-5 border border-purple-200/40 shadow-[0_4px_20px_rgba(100,50,200,0.06)] hover:shadow-[0_8px_30px_rgba(100,50,200,0.12)] transition-all duration-400 group cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-[8px] h-[8px] rounded-full bg-gradient-to-br from-purple-500 to-violet-600 group-hover:scale-125 transition-transform" />
                  <h4 className="text-[14px] font-bold text-[#1A1030] tracking-tight">Resilient Systems</h4>
                </div>
                <p className="text-[11px] text-[#666] leading-relaxed font-medium pl-5">
                  Infrastructure that adapts and thrives under any condition
                </p>
              </div>

              {/* Pill 2 */}
              <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-[20px] px-6 py-5 border border-purple-200/40 shadow-[0_4px_20px_rgba(100,50,200,0.06)] hover:shadow-[0_8px_30px_rgba(100,50,200,0.12)] transition-all duration-400 group cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-[8px] h-[8px] rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 group-hover:scale-125 transition-transform" />
                  <h4 className="text-[14px] font-bold text-[#1A1030] tracking-tight">Creative Evolution</h4>
                </div>
                <p className="text-[11px] text-[#666] leading-relaxed font-medium pl-5">
                  Designs that push creative boundaries and challenge norms
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link to="/chatbot" className="mt-8 flex items-center justify-between bg-[#1A1030] rounded-full pl-6 pr-[4px] py-[4px] hover:scale-105 transition-transform group/btn shadow-lg max-w-[max-content]">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white mr-3">
                Start Your Journey
              </span>
              <span className="bg-white text-[#1A1030] rounded-full w-[28px] h-[28px] flex items-center justify-center shrink-0">
                <ArrowRight size={14} strokeWidth={3} />
              </span>
            </Link>
          </div>

          {/* Right — Robot Image + Floating Quote */}
          <div className="flex-1 flex justify-center lg:justify-end relative min-h-[480px]">
            {/* Glow backdrop */}
            <div className="absolute w-[440px] h-[440px] rounded-full bg-gradient-to-br from-purple-400/15 via-gray-400/10 to-transparent blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <img 
              src="/image3-nobg.png" 
              alt="Smart with Technology" 
              className="relative z-10 w-[420px] lg:w-[480px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
            
            {/* Floating Quote Card */}
            <div className="absolute bottom-8 right-0 z-20 bg-[#1A1030]/90 backdrop-blur-md rounded-[20px] px-6 py-5 max-w-[260px] shadow-[0_12px_40px_rgba(40,10,80,0.3)] border border-purple-500/20">
              <p className="text-[13px] text-purple-100 font-medium leading-[1.5] italic">
                "We don't follow trends — we architect the future of technology."
              </p>
              <span className="block mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-purple-400">— TechBrahmand</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default InnovationSection;
