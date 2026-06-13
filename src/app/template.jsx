"use client";

import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 18,
    filter: 'blur(4px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1], // custom spring-like ease
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(2px)',
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Template({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="w-full flex-grow"
    >
      {children}
    </motion.div>
  );
}
