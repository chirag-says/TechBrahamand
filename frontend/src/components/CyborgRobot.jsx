import React, { useEffect, useRef } from 'react';
import './CyborgRobot.css';

/**
 * CyborgRobot — Premium robot visual with:
 *   1. CSS breathing animation (float + micro-scale)
 *   2. Mouse-tracking rotation & parallax (desktop only, via RAF)
 *   3. Soft ambient glow pulse
 *   4. Floating shadow that contracts on float-up
 *   5. Subtle tilt toward cursor
 *
 * Zero React re-renders for mouse tracking — all DOM-direct via refs.
 */
const CyborgRobot = ({ isMobile = false, className = '' }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const shadowRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.current = {
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.5))),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.5))),
      };
    };

    const tick = () => {
      const LERP = 0.045; // low = buttery smooth
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * LERP;
      c.y += (t.y - c.y) * LERP;

      // Subtle rotation toward cursor
      const rotY = c.x * 3;       // max ±3°
      const rotX = c.y * -2;      // max ±2°
      const tx = c.x * 5;         // max ±5px
      const ty = c.y * 3;         // max ±3px
      const shadowTx = c.x * -8;  // shadow drifts opposite

      if (imgRef.current) {
        imgRef.current.style.transform =
          `perspective(800px) rotateY(${rotY}deg) rotateX(${rotX}deg) translate(${tx}px, ${ty}px)`;
      }
      if (shadowRef.current) {
        shadowRef.current.style.transform =
          `translateX(calc(-50% + ${shadowTx}px))`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className={`cyborg-wrap ${isMobile ? 'cyborg-wrap--mobile' : 'cyborg-wrap--desktop'} ${className}`}
    >
      {/* Ambient glow behind robot */}
      <div className="cyborg-glow" />

      {/* Breathing wrapper — CSS animation */}
      <div className="cyborg-breather">
        <img
          ref={imgRef}
          src="/ChatGPT-upscaled.png"
          alt="AI Cyborg — TechBrahmand"
          className="cyborg-img"
          draggable={false}
        />
      </div>

      {/* Floating shadow beneath */}
      <div ref={shadowRef} className="cyborg-shadow" />
    </div>
  );
};

export default CyborgRobot;
