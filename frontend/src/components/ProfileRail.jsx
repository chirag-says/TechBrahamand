import React from "react";
import { motion } from "framer-motion";
import "./ProfileRail.css";

const smoothEase = [0.22, 1, 0.36, 1];

export default function ProfileRail() {
  return (
    <motion.div 
      className="profile-rail"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
    >
      {/* Center Rotated Text */}
      <div className="pr-center-text-wrap">
        <span className="pr-vertical-text">WHERE IDEAS EVOLVE</span>
      </div>
    </motion.div>
  );
}
