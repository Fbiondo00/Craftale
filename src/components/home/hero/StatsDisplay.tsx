'use client';

import { motion } from 'framer-motion';
import { Monitor, Star, Users, Zap } from 'lucide-react';
import { Stat } from '@/types/home-page';

export default function StatsDisplay() {
  const stats: Stat[] = [
    { number: '150+', label: 'Websites Built', icon: Monitor, color: 'text-apty-info' },
    { number: '98%', label: 'Client Satisfaction', icon: Star, color: 'text-apty-warning' },
    { number: '50+', label: 'Happy Clients', icon: Users, color: 'text-apty-success' },
    { number: '24/7', label: 'Support', icon: Zap, color: 'text-apty-tertiary' },
  ];

  return (
    <motion.div
      className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl lg:max-w-none'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            className='text-center lg:text-left group cursor-pointer'
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className='relative'
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
            >
              <div className='flex items-center justify-center lg:justify-start mb-2'>
                <motion.div
                  whileHover={{
                    rotate: 360,
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className='w-5 h-5 text-apty-primary mr-2' />
                </motion.div>
                <div className='text-2xl md:text-3xl font-bold text-apty-text-primary'>{stat.number}</div>
              </div>
              <div className='text-sm text-apty-text-secondary'>{stat.label}</div>

              {/* Hover effect sparkles */}
              <motion.div
                className='absolute -inset-4 pointer-events-none'
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className='absolute w-1 h-1 bg-apty-warning rounded-full'
                    style={{
                      top: `${25 + i * 25}%`,
                      left: `${25 + i * 25}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
