import React from 'react';
import './FloatingParticles.css';

/**
 * Deterministic slow-moving particles.
 * No Math.random() — positions derived from index for hydration safety.
 * Pure CSS animation — zero JS overhead at runtime.
 */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${((i * 47 + 13) % 97)}%`,
  top: `${((i * 31 + 7) % 93)}%`,
  size: 1.2 + (i % 4) * 0.6,
  duration: 14 + (i % 6) * 4,
  delay: -(i % 8) * 2.5,
  opacity: 0.12 + (i % 5) * 0.04,
}));

const FloatingParticles = () => (
  <div className="particles-field" aria-hidden="true">
    {PARTICLES.map((p) => (
      <div
        key={p.id}
        className="particle"
        style={{
          left: p.left,
          top: p.top,
          width: `${p.size}px`,
          height: `${p.size}px`,
          opacity: p.opacity,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
        }}
      />
    ))}
  </div>
);

export default FloatingParticles;
