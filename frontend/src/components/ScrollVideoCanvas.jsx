import React, { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';

const ScrollVideoCanvas = ({ progress }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const frameCount = 192; 
  
  useEffect(() => {
    const preloadImages = () => {
      let loadedCounter = 0;
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(4, '0');
        img.src = `/video-frames/frames_${frameIndex}.jpg`;
        
        img.onload = () => {
          loadedCounter++;
          if (loadedCounter === frameCount) {
            setImagesLoaded(true);
          }
        };
        imagesRef.current.push(img);
      }
    };

    preloadImages();
  }, []);

  // Sync canvas drawing with Framer Motion's progress
  useMotionValueEvent(progress, "change", (latest) => {
    if (!imagesLoaded) return;
    
    // We want the video to finish playing at the 30% mark of the total scroll.
    // This allows the final frame (the idols) to "freeze" and stay on screen for the remaining 70% of scrolling.
    const stopProgressAt = 0.30;
    const adjustedLatest = Math.min(1, latest / stopProgressAt);

    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(adjustedLatest * frameCount)
    );

    const canvas = canvasRef.current;
    if (canvas && imagesRef.current[frameIndex]) {
      const context = canvas.getContext('2d');
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      context.drawImage(imagesRef.current[frameIndex], 0, 0, canvas.width, canvas.height);
    }
  });

  // Initial draw and handle resize
  useEffect(() => {
    const drawInitial = () => {
      if (imagesLoaded && canvasRef.current) {
          const canvas = canvasRef.current;
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          const context = canvas.getContext('2d');
          
          // Draw the current frame based on progress, or frame 0
          // Draw the current frame based on progress
          const currentProgress = progress.get() || 0;
          const stopProgressAt = 0.30;
          const adjustedLatest = Math.min(1, currentProgress / stopProgressAt);
          const frameIndex = Math.min(frameCount - 1, Math.floor(adjustedLatest * frameCount));
          
          context.drawImage(imagesRef.current[frameIndex], 0, 0, canvas.width, canvas.height);
      }
    };
    
    drawInitial();

    window.addEventListener('resize', drawInitial);
    return () => window.removeEventListener('resize', drawInitial);
  }, [imagesLoaded, progress]);

  return (
    <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
    />
  );
};

export default ScrollVideoCanvas;
