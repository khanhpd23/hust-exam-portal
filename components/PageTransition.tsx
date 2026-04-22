import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  delay?: number;
}

export default function PageTransition({ children, skeleton, delay = 400 }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="w-full h-full"
    >
      {isLoading && skeleton ? skeleton : children}
    </motion.div>
  );
}
