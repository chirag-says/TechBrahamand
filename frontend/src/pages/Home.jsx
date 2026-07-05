import React from "react";
import NewHero from "../components/NewHero";
import InnovationSection from "../components/InnovationSection";
import MarqueeBanner from "../components/MarqueeBanner";
import TechStackStrip from "../components/TechStackStrip";
import IndustryStack from "../components/IndustryStack";
import DivisionCards from "../components/DivisionCards";
import HowWeBuild from "../components/HowWeBuild";
import SocialProof from "../components/SocialProof";

const Home = () => {
  return (
    <div className="w-full" style={{ zoom: 1.12 }}>
      <NewHero />
      <MarqueeBanner containerBg="bg-[#F3F5F9]" skewClass="skew-y-0" marginTop="mt-0" />
      {/* ── Cosmic Background Section ── */}
      <div className="relative w-full">

        {/* Background image — desaturated, blurred, reduced brightness */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[0]"
          style={{
            backgroundImage: "url('/imagecopy7.png')",
            filter: 'blur(2.5px) brightness(0.65) contrast(0.75) saturate(0.45)',
            opacity: 0.32,
            transform: 'scale(1.02)',
          }}
        />

        {/* White atmospheric overlay — opacity 0.55 */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          background: 'linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55))',
        }} />

        {/* Outer vignette — slightly increased */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 45%, transparent 25%, rgba(230,228,238,0.25) 65%, rgba(243,245,249,0.5) 100%)',
        }} />

        {/* Warm center glow — reduced 40% */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          background: 'radial-gradient(ellipse 45% 35% at 50% 35%, rgba(255,220,150,0.05) 0%, transparent 70%)',
        }} />

        {/* Bottom fog — opacity 30% */}
        <div className="absolute inset-0 pointer-events-none z-[2]" style={{
          background: 'linear-gradient(to bottom, transparent 55%, rgba(243,245,249,0.12) 75%, rgba(243,245,249,0.25) 90%, rgba(243,245,249,0.65) 100%)',
        }} />

        {/* Top edge blend */}
        <div className="absolute inset-0 pointer-events-none z-[2]" style={{
          background: 'linear-gradient(to bottom, rgba(243,245,249,0.4) 0%, transparent 10%)',
        }} />

        {/* Sacred geometry — opacity 1.2% (was 4%) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-[0.012]" viewBox="0 0 1200 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <circle cx="600" cy="350" r="280" stroke="rgba(160,150,130,1)" strokeWidth="0.5" />
          <circle cx="600" cy="350" r="200" stroke="rgba(160,150,130,1)" strokeWidth="0.4" />
          <circle cx="600" cy="350" r="120" stroke="rgba(160,150,130,1)" strokeWidth="0.3" />
          {[0,30,60,90,120,150].map(a => <line key={a} x1="600" y1="70" x2="600" y2="630" stroke="rgba(160,150,130,0.5)" strokeWidth="0.3" transform={`rotate(${a} 600 350)`} />)}
          {[[180,200],[350,150],[800,180],[1000,250],[250,500],[900,550],[500,700],[700,680],[150,350],[1050,400]].map(([cx,cy],i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="2" fill="rgba(160,150,130,0.3)" />
              <circle cx={cx} cy={cy} r="6" fill="none" stroke="rgba(160,150,130,0.1)" strokeWidth="0.5" />
            </g>
          ))}
          <line x1="180" y1="200" x2="350" y2="150" stroke="rgba(160,150,130,0.15)" strokeWidth="0.4" />
          <line x1="350" y1="150" x2="500" y2="700" stroke="rgba(160,150,130,0.08)" strokeWidth="0.3" />
          <line x1="800" y1="180" x2="1000" y2="250" stroke="rgba(160,150,130,0.12)" strokeWidth="0.4" />
          <line x1="900" y1="550" x2="700" y2="680" stroke="rgba(160,150,130,0.1)" strokeWidth="0.3" />
          <line x1="150" y1="350" x2="250" y2="500" stroke="rgba(160,150,130,0.1)" strokeWidth="0.3" />
          <line x1="1050" y1="400" x2="900" y2="550" stroke="rgba(160,150,130,0.08)" strokeWidth="0.3" />
        </svg>

        {/* Star particles — opacity 15% (was 40%) */}
        <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.15]" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 12% 18%, rgba(180,175,165,0.6), transparent),
            radial-gradient(1.2px 1.2px at 28% 8%, rgba(180,170,150,0.5), transparent),
            radial-gradient(0.8px 0.8px at 45% 22%, rgba(180,175,165,0.4), transparent),
            radial-gradient(1px 1px at 65% 12%, rgba(180,170,150,0.5), transparent),
            radial-gradient(1.5px 1.5px at 78% 25%, rgba(180,175,165,0.35), transparent),
            radial-gradient(1px 1px at 88% 15%, rgba(180,170,150,0.4), transparent),
            radial-gradient(0.8px 0.8px at 8% 55%, rgba(180,175,165,0.25), transparent),
            radial-gradient(1px 1px at 35% 65%, rgba(180,175,165,0.3), transparent),
            radial-gradient(1.2px 1.2px at 55% 48%, rgba(180,170,150,0.25), transparent),
            radial-gradient(1px 1px at 72% 58%, rgba(180,175,165,0.3), transparent),
            radial-gradient(0.8px 0.8px at 92% 42%, rgba(180,170,150,0.3), transparent),
            radial-gradient(1px 1px at 18% 82%, rgba(180,175,165,0.2), transparent),
            radial-gradient(1.3px 1.3px at 42% 88%, rgba(180,170,150,0.2), transparent),
            radial-gradient(1px 1px at 68% 78%, rgba(180,175,165,0.2), transparent),
            radial-gradient(0.8px 0.8px at 85% 72%, rgba(180,170,150,0.25), transparent),
            radial-gradient(1px 1px at 95% 88%, rgba(180,175,165,0.15), transparent)
          `,
        }} />

        {/* Radial spotlight — focuses light behind the cards, opacity 0.40 */}
        <div className="absolute inset-0 pointer-events-none z-[3]" style={{
          background: 'radial-gradient(circle at 50% 48%, rgba(255,255,255,0.40) 0%, transparent 70%)',
        }} />

        {/* Layer — Very subtle noise texture, opacity 0.02 */}
        <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }} />

        {/* Content */}
        <div className="relative z-10">
          <TechStackStrip />
          <IndustryStack />
          {/* This div gets a solid background so it slides over the last pinned industry card */}
          <div style={{ position: 'relative', zIndex: 20, background: 'rgba(243,245,249,0.98)', backdropFilter: 'blur(8px)' }}>
            <DivisionCards />
            <HowWeBuild />
          </div>
        </div>
      </div>
      <SocialProof />

      {/* ── Marquee Divider — between dark TrustBar and light InnovationSection ── */}
      <MarqueeBanner
        direction="right"
        skewClass="skew-y-0"
        containerBg="bg-transparent"
        marginTop="mt-0"
        marginBottom="mb-0"
      />

      <InnovationSection />
    </div>
  );
};

export default Home;