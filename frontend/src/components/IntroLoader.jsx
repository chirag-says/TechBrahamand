import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import './IntroLoader.css';

/**
 * IntroLoader — "Shakti Particle Flow" cinematic intro
 *
 * Two cosmic energy streams (cyan Prana + purple Shakti) flow from
 * opposite edges of the screen and spiral toward the center.
 * They collide in a bright flash + expanding shockwave ring,
 * and "TECH BRAHMAND" emerges from the burst with a mystical glow
 * that settles into the clean modern font.
 *
 * Total duration: ~1.6s
 *
 * Layers (bottom → top):
 *   1. Nebula gradients         z:0
 *   2. Twinkling stars          z:1
 *   3. Sanskrit particles       z:1
 *   4. Energy canvas (streams)  z:2
 *   5. Collision flash + ring   z:3
 *   6. Text glow aura           z:4
 *   7. Title text               z:5
 */

const TITLE = 'TECH BRAHMAND';
const CHARS = TITLE.split('');
const CENTER_IDX = (CHARS.length - 1) / 2;
const MAX_DIST = CENTER_IDX;

/* ── Timing constants (ms) ── */
const COLLISION_MS = 2000;
const TEXT_REVEAL_MS = 2400;
const EXIT_MS = 4000;

/* ──────────────────────────────
   STAR GENERATOR
   ────────────────────────────── */
function generateStars(count) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      delay: `${Math.random() * 3}s`,
      duration: `${1.2 + Math.random() * 2.5}s`,
      opacity: 0.2 + Math.random() * 0.8,
      isBlue: Math.random() > 0.75,
    });
  }
  return stars;
}

/* ──────────────────────────────
   SANSKRIT PARTICLE GENERATOR
   ────────────────────────────── */
const SANSKRIT_CHARS = ['ॐ', 'ब्रह्मांड', 'ॐ', 'ब्रह्मांड', 'ॐ'];

function generateSanskritParticles(count) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const left = 2 + Math.random() * 96;
    const top = 2 + Math.random() * 96;

    particles.push({
      id: i,
      char: SANSKRIT_CHARS[i % SANSKRIT_CHARS.length],
      left: `${left}%`,
      top: `${top}%`,
      size: `${12 + Math.random() * 26}px`,
      opacity: 0.03 + Math.random() * 0.06,
      blur: `${1.5 + Math.random() * 3}px`,
      delay: `${Math.random() * 4}s`,
      duration: `${6 + Math.random() * 10}s`,
    });
  }
  return particles;
}

/* ──────────────────────────────────────────────────
   ENERGY CANVAS — cosmic Prana / Shakti streams
   Canvas-based particle system for performance.
   Cyan particles from left, purple from right,
   spiral toward center, explode on collision.
   ────────────────────────────────────────────────── */
const CYAN_PALETTE = [[0, 220, 255], [80, 200, 255], [140, 230, 255], [220, 245, 255]];
const PURPLE_PALETTE = [[160, 130, 255], [130, 100, 255], [180, 160, 255], [210, 200, 255]];

const EnergyCanvas = React.memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const CX = W / 2;
    const CY = H / 2;
    const STREAM_N = 40;

    // ── Build stream particles ──
    const streams = [];
    const buildStream = (side, palette) => {
      for (let i = 0; i < STREAM_N; i++) {
        streams.push({
          sx: side === 'L' ? -20 - Math.random() * W * 0.35 : W + 20 + Math.random() * W * 0.35,
          sy: CY + (Math.random() - 0.5) * H * 0.35,
          r: 0.5 + Math.random() * 2.5,
          spd: 0.7 + Math.random() * 0.5,
          del: Math.random() * 0.2,
          col: palette[Math.floor(Math.random() * palette.length)],
          amp: 15 + Math.random() * 40,
          frq: 1.5 + Math.random() * 2.5,
          a: 0.3 + Math.random() * 0.7,
          trail: [],
        });
      }
    };
    buildStream('L', CYAN_PALETTE);
    buildStream('R', PURPLE_PALETTE);

    // ── Explosion particles (created at collision) ──
    const explode = [];
    let exploded = false;

    const T0 = performance.now();
    let raf;

    // ── Easing: easeInOutCubic ──
    const ease = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const draw = (now) => {
      const dt = now - T0;
      const tN = dt / COLLISION_MS; // 0→1 during stream phase

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      // ── Center convergence glow ──
      if (tN > 0.3 && dt < COLLISION_MS + 300) {
        const intensity =
          tN > 1
            ? Math.max(0, 1 - (dt - COLLISION_MS) / 300)
            : Math.min(1, (tN - 0.3) / 0.5);
        const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, 70);
        g.addColorStop(0, `rgba(180,220,255,${intensity * 0.15})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(CX, CY, 70, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // ── Stream particles ──
      streams.forEach((p) => {
        const t = Math.max(0, (tN - p.del) * p.spd);
        if (t <= 0 || t > 1.8) return;

        const pr = Math.min(1, t);
        const e = ease(pr);

        const x = p.sx + (CX - p.sx) * e;
        const dy = Math.sin(pr * Math.PI * p.frq) * p.amp * (1 - pr * pr);
        const y = p.sy + (CY - p.sy) * e + dy;

        const fade = pr > 0.85 ? Math.max(0, (1 - pr) / 0.15) : 1;
        const alpha = p.a * fade;
        if (alpha < 0.01) return;

        // Trail
        p.trail.push({ x, y });
        if (p.trail.length > 5) p.trail.shift();
        p.trail.forEach((tp, ti) => {
          const ta = alpha * 0.25 * (ti / p.trail.length);
          if (ta < 0.01) return;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, p.r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.col[0]},${p.col[1]},${p.col[2]},${ta})`;
          ctx.fill();
        });

        // Glow halo
        const gl = ctx.createRadialGradient(x, y, 0, x, y, p.r * 3.5);
        gl.addColorStop(0, `rgba(${p.col[0]},${p.col[1]},${p.col[2]},${alpha * 0.4})`);
        gl.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(x, y, p.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = gl;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(x, y, p.r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.85})`;
        ctx.fill();
      });

      // ── Explosion at collision ──
      if (dt >= COLLISION_MS && !exploded) {
        const allColors = [...CYAN_PALETTE, ...PURPLE_PALETTE];
        for (let i = 0; i < 35; i++) {
          const ang = (i / 35) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
          const spd = 2 + Math.random() * 5;
          explode.push({
            x: CX + (Math.random() - 0.5) * 8,
            y: CY + (Math.random() - 0.5) * 8,
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd,
            r: 0.3 + Math.random() * 1.5,
            life: 1,
            dec: 0.02 + Math.random() * 0.025,
            col: allColors[Math.floor(Math.random() * allColors.length)],
          });
        }
        exploded = true;
      }

      explode.forEach((p) => {
        if (p.life <= 0) return;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= p.dec;

        const a = Math.max(0, p.life) * 0.6;
        const gl = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        gl.addColorStop(0, `rgba(${p.col[0]},${p.col[1]},${p.col[2]},${a * 0.35})`);
        gl.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = gl;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });

      if (dt < COLLISION_MS + 1000) {
        raf = requestAnimationFrame(draw);
      }
    };

    raf = requestAnimationFrame(draw);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="intro-energy-canvas" />;
});

/* ──────────────────────────────────────────────────
   INTRO LOADER — main component
   ────────────────────────────────────────────────── */
const IntroLoader = ({ onComplete }) => {
  const [showCollision, setShowCollision] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const stars = useMemo(() => generateStars(70), []);
  const sanskritParticles = useMemo(() => generateSanskritParticles(55), []);

  // Lock scroll
  useEffect(() => {
    document.body.classList.add('intro-active');
    return () => document.body.classList.remove('intro-active');
  }, []);

  // Phase timeline
  useEffect(() => {
    const t1 = setTimeout(() => setShowCollision(true), COLLISION_MS);
    const t2 = setTimeout(() => setShowText(true), TEXT_REVEAL_MS);
    const t3 = setTimeout(() => setIsExiting(true), EXIT_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (isDone) return null;

  return (
    <motion.div
      className="intro-loader"
      animate={
        isExiting
          ? { opacity: 0, filter: 'blur(5px)' }
          : { opacity: 1, filter: 'blur(0px)' }
      }
      transition={
        isExiting
          ? { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
          : { duration: 0 }
      }
      onAnimationComplete={() => {
        if (isExiting) {
          setIsDone(true);
          onComplete?.();
        }
      }}
    >
      {/* ── Layer 1: Nebula ── */}
      <div className="intro-nebula" />

      {/* ── Layer 2: Stars ── */}
      <div className="intro-stars">
        {stars.map((s) => (
          <div
            key={s.id}
            className={`star${s.isBlue ? ' blue' : ''}`}
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              '--star-del': s.delay,
              '--star-dur': s.duration,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* ── Layer 3: Sanskrit particles ── */}
      <div className="intro-sanskrit-layer">
        {sanskritParticles.map((p) => (
          <span
            key={p.id}
            className="intro-sanskrit-char"
            style={{
              left: p.left,
              top: p.top,
              '--char-size': p.size,
              '--char-opacity': p.opacity,
              '--char-blur': p.blur,
              '--float-del': p.delay,
              '--float-dur': p.duration,
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* ── Layer 4: Energy stream canvas ── */}
      <EnergyCanvas />

      {/* ── Layer 5: Collision flash + shockwave ── */}
      {showCollision && (
        <>
          <motion.div
            className="intro-collision-flash"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 2.8], opacity: [0, 0.85, 0] }}
            transition={{
              duration: 0.45,
              times: [0, 0.25, 1],
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="intro-shockwave"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 5, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </>
      )}

      {/* ── Layer 6: Text glow aura ── */}
      {showText && (
        <motion.div
          className="intro-text-glow"
          initial={{ opacity: 0.8, scale: 0.8 }}
          animate={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}

      {/* ── Layer 7: Title text ── */}
      {showText && (
        <motion.div
          className="intro-title-container"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {CHARS.map((char, i) => {
            const isSpace = char === ' ';
            // Center-outward stagger: center letters appear first
            const revealDelay = (Math.abs(i - CENTER_IDX) / MAX_DIST) * 0.12;

            return (
              <motion.span
                key={i}
                className={isSpace ? 'intro-space' : 'intro-letter'}
                initial={{
                  opacity: 0,
                  filter: 'blur(10px)',
                  scale: 1.15,
                }}
                animate={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  scale: 1,
                }}
                transition={{
                  opacity: { duration: 0.18, delay: revealDelay, ease: 'easeOut' },
                  filter: { duration: 0.22, delay: revealDelay, ease: 'easeOut' },
                  scale: { duration: 0.3, delay: revealDelay, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                {isSpace ? null : char}
              </motion.span>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};

export default IntroLoader;
