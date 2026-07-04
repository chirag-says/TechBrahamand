import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, PenTool, IndianRupee, Code2, Rocket, TrendingUp } from 'lucide-react';
import './ProcessTimeline.css';

const STEPS = [
  { icon: Lightbulb,   label: 'Idea',         accent: '#EAB308' },
  { icon: PenTool,     label: 'Architecture',  accent: '#8B5CF6' },
  { icon: IndianRupee, label: 'Quotation',     accent: '#3B82F6' },
  { icon: Code2,       label: 'Development',   accent: '#10B981' },
  { icon: Rocket,      label: 'Deployment',    accent: '#F97316' },
  { icon: TrendingUp,  label: 'Growth',        accent: '#EC4899' },
];

const ProcessTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="timeline-section" aria-label="Our process" ref={ref}>
      <motion.p
        className="timeline-section__label"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        How We Build
      </motion.p>

      <div className="timeline">
        {/* Connecting line */}
        <div className="timeline__track">
          <motion.div
            className="timeline__track-fill"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </div>

        {/* Steps */}
        <div className="timeline__steps">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const delay = 0.3 + i * 0.2;
            return (
              <motion.div
                key={step.label}
                className="timeline-step"
                style={{ '--step-accent': step.accent }}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Icon circle */}
                <motion.div
                  className="timeline-step__icon"
                  initial={{ boxShadow: '0 0 0 0px transparent' }}
                  animate={isInView ? {
                    boxShadow: [
                      `0 0 0 0px ${step.accent}00`,
                      `0 0 0 8px ${step.accent}25`,
                      `0 0 0 0px ${step.accent}00`,
                    ],
                  } : {}}
                  transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeOut' }}
                >
                  <Icon size={18} strokeWidth={2} />
                </motion.div>

                {/* Step number */}
                <span className="timeline-step__number">0{i + 1}</span>

                {/* Label */}
                <span className="timeline-step__label">{step.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
