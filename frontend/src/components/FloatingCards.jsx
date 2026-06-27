import React from 'react';
import './FloatingCards.css';

/**
 * Floating AI status cards around the robot.
 * Pure CSS animation — no JS overhead.
 * Positions are absolute, tuned for the hero robot area.
 */
const CARDS = [
  { text: 'React',                pos: 'fc--top-left',    delay: 0 },
  { text: 'Online',              pos: 'fc--top-right',   delay: -2 },
  { text: 'AI Proposal Ready',   pos: 'fc--mid-left',    delay: -4 },
  { text: 'Architecture Complete', pos: 'fc--mid-right', delay: -6 },
  { text: 'Budget Generated',    pos: 'fc--bot-left',    delay: -8 },
  { text: 'Deployment Ready',    pos: 'fc--bot-right',   delay: -10 },
];

const FloatingCards = () => (
  <div className="floating-cards" aria-hidden="true">
    {CARDS.map((c) => (
      <div
        key={c.text}
        className={`fc ${c.pos}`}
        style={{ animationDelay: `${c.delay}s` }}
      >
        <span className="fc__dot" />
        <span className="fc__text">{c.text}</span>
      </div>
    ))}
  </div>
);

export default FloatingCards;
