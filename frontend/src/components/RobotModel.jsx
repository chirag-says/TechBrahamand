import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

const RobotModel = ({ className = '' }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#888]">Loading Robot</span>
          </div>
        </div>
      }>
        <Spline scene="https://prod.spline.design/oMM6MFtNvNipcxK8/scene.splinecode" />
      </Suspense>
    </div>
  );
};

export default RobotModel;
