import React, { useState, useEffect } from "react";
import { User, LogIn, LogOut, Settings, X, Mail, Calendar, FolderHeart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./ProfileRail.css";

const springEase = { type: "spring", stiffness: 300, damping: 25 };
const smoothEase = [0.22, 1, 0.36, 1];

export default function ProfileRail({ user, setUser }) {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);

  // Toggle body class to hide nav trigger when profile is open
  useEffect(() => {
    if (showProfilePage) {
      document.body.classList.add('profile-open');
    } else {
      document.body.classList.remove('profile-open');
    }
    return () => document.body.classList.remove('profile-open');
  }, [showProfilePage]);

  // Close menus when scrolling or clicking outside on mobile (simplification for this task)
  
  const handleLogin = () => {
    setUser({
      name: "Abhitha",
      email: "abhitha@techbrahmand.com",
      image: "", // Use initial if no image
      joinedDate: "April 2026",
      savedItems: 12
    });
    setShowAccountMenu(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowAccountMenu(false);
    setShowProfilePage(false);
  };

  return (
    <>
      {/* --- THE LEFT RAIL --- */}
      <motion.div 
        className="profile-rail"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: smoothEase }}
      >
        {/* Top Avatar */}
        <button 
          className="pr-avatar-btn" 
          onClick={() => {
            if(user) setShowProfilePage(true);
            else setShowAccountMenu(!showAccountMenu);
          }}
        >
          {user ? (
            user.image ? (
              <img src={user.image} alt={user.name} className="pr-avatar-img" />
            ) : (
              <div className="pr-avatar-initial">{user.name.charAt(0)}</div>
            )
          ) : (
            <div className="pr-avatar-generic">
              <img src="/techbrahmand-badge.png" alt="Guest" className="pr-avatar-img" />
            </div>
          )}
        </button>

        {/* Center Rotated Text */}
        <div className="pr-center-text-wrap">
          <span className="pr-vertical-text">WHERE IDEAS EVOLVE</span>
        </div>

        {/* Bottom Profile Button */}
        <button 
          className="pr-trigger-btn group"
          onClick={() => setShowAccountMenu(!showAccountMenu)}
        >
          <div className="pr-trigger-glow group-hover:opacity-100" />
          <User size={20} strokeWidth={2} className="relative z-10 opacity-90" />
        </button>

        {/* Floating Account Menu (Popup) */}
        <AnimatePresence>
          {showAccountMenu && (
            <motion.div 
              className="pr-account-menu"
              initial={{ opacity: 0, scale: 0.9, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -10 }}
              transition={{ duration: 0.3, ease: smoothEase }}
            >
              {!user ? (
                <div className="pr-menu-list">
                  <button className="pr-menu-item login-btn" onClick={handleLogin}>
                    <LogIn size={16} />
                    <span>Log In</span>
                  </button>
                  <button className="pr-menu-item" onClick={handleLogin}>
                    <User size={16} />
                    <span>Sign Up</span>
                  </button>
                </div>
              ) : (
                <div className="pr-menu-list">
                  <button className="pr-menu-item logout-btn" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- SLIDE-OUT FULL PROFILE PAGE --- */}
      <AnimatePresence>
        {showProfilePage && user && (
          <>
            <motion.div 
              className="pr-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfilePage(false)}
            />
            <motion.div 
              className="pr-slide-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: smoothEase }}
            >
              <div className="pr-header">
                <h2>User Profile</h2>
                <button className="pr-close-btn" onClick={() => setShowProfilePage(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="pr-content">
                <div className="pr-large-avatar-wrap">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="pr-large-avatar" />
                  ) : (
                    <div className="pr-large-initial">{user.name.charAt(0)}</div>
                  )}
                  <h3 className="pr-welcome-text">Welcome back,<br/><span>{user.name}</span></h3>
                </div>

                <div className="pr-info-card">
                  <div className="pr-info-row">
                    <Mail size={18} className="pr-info-icon" />
                    <span>{user.email}</span>
                  </div>
                  <div className="pr-info-row">
                    <Calendar size={18} className="pr-info-icon" />
                    <span>Joined {user.joinedDate}</span>
                  </div>
                  <div className="pr-info-row">
                    <FolderHeart size={18} className="pr-info-icon" />
                    <span>{user.savedItems} Saved Items</span>
                  </div>
                </div>

                <div className="pr-actions">
                  <button className="pr-btn-outline"><Settings size={18} /> Settings</button>
                  <button className="pr-btn-danger" onClick={handleLogout}><LogOut size={18} /> Logout</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
