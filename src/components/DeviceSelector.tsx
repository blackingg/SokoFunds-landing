"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Smartphone, Apple, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { useTransition } from '@/context/TransitionContext';

const devices = [
  { id: 'ios', name: 'iOS App', icon: Apple, color: '#007AFF', tagline: 'Coming Soon' },
  { id: 'android', name: 'Android', icon: Smartphone, color: '#007AFF', tagline: 'Available Now' },
];

export default function DeviceSelector() {
  const router = useRouter();
  const { setTransition } = useTransition();

  const handleSelect = (device: any, e: React.MouseEvent) => {
    // Navigate immediately passing exact mouse coordinates via Context
    setTransition(e.clientX, e.clientY, device.id);
    router.push('/download');
  };

  return (
    <div className="flex flex-col items-center gap-16 py-12 px-4 relative">
      <div className="text-center">
        <h2 className="text-5xl md:text-7xl font-black text-black uppercase italic tracking-tighter mb-4">Get Started</h2>
        <p className="text-black/40 text-xl font-semibold">Experience banking like never before.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-12 max-w-4xl w-full">
        {devices.map((device) => (
          <motion.button
            key={device.id}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => handleSelect(device, e)}
            className={`glass group relative p-12 rounded-[4rem] flex-1 min-w-75 border-black/5 hover:border-[#007AFF]/20 transition-all cursor-pointer bg-white/50`}
          >
            <div className="flex flex-col items-center gap-8">
              <div 
                className="p-10 rounded-[2.5rem] transition-all duration-500 group-hover:scale-110 shadow-xl shadow-transparent group-hover:shadow-[#007AFF]/10"
                style={{ 
                  backgroundColor: `${device.color}10`, 
                  color: device.color 
                }}
              >
                <device.icon size={64} />
              </div>
              
              <div className="text-center">
                <span className="block font-black text-4xl text-black italic uppercase tracking-tighter mb-2">{device.name}</span>
                <div className="flex items-center justify-center gap-2 text-black/30 text-sm font-bold uppercase tracking-[0.2em] group-hover:text-[#007AFF] transition-colors">
                  {device.tagline} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 rounded-[4rem] bg-linear-to-br from-[#007AFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
