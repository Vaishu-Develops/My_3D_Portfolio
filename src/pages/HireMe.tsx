import React from 'react';
import LightRays from '../components/ui/LightRays';
import { SneakText } from '../components/ui/sneak';
import Lanyard from '../components/ui/Lanyard';

export default function HireMe() {
  return (
    <>
      {/* 3D Lanyard Card Overlay */}
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />

      {/* Isolated LightRays background for Hire Me Page */}
      <div className="fixed inset-0 -z-10 bg-slate-950">
        <LightRays
          raysOrigin="top-center"
          raysColor="#4fd1c5" // Teal tint to match portfolio theme
          raysSpeed={1.5}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.02}
          distortion={0}
          className="custom-rays"
          pulsating={true}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div className="min-h-screen pt-20 flex flex-col items-center justify-end relative z-10 w-full overflow-hidden">
        {/* Sneak text taking up the primary view space, acting as the 'floor' */}
        <div className="w-full h-[80vh] cursor-none relative pointer-events-none">
          <SneakText text="HIRE ME" />
        </div>
      </div>
    </>
  );
}
