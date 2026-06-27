import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cloud, Lock, Layers, Sparkles, Code2 } from 'lucide-react';
import './TrustBar.css';

const BADGES = [
  { icon: ShieldCheck, label: 'Enterprise Ready' },
  { icon: Cloud,       label: 'Cloud Native' },
  { icon: Lock,        label: 'GDPR Friendly' },
  { icon: Layers,      label: 'Scalable Architecture' },
  { icon: Sparkles,    label: 'AI Powered' },
  { icon: Code2,       label: 'Modern Stack' },
];

const TrustBar = () => (
  <section className="trust-bar" aria-label="Trust badges">
    <div className="trust-bar__row">
      {BADGES.map((b, i) => {
        const Icon = b.icon;
        return (
          <motion.div
            key={b.label}
            className="trust-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{
              duration: 0.4,
              delay: 0.06 * i,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Icon size={13} strokeWidth={2} className="trust-badge__icon" />
            <span className="trust-badge__label">{b.label}</span>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default TrustBar;
