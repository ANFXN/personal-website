import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover3D?: boolean;
}

const GlassCard = ({ children, className = "", hover3D = true }: GlassCardProps) => {
  return (
    <motion.div
      className={`relative backdrop-blur-xl bg-card/40 border border-white/10 rounded-2xl shadow-2xl overflow-hidden ${className}`}
      whileHover={hover3D ? { 
        rotateY: 5,
        rotateX: -5,
        scale: 1.02,
        z: 50,
      } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-transparent to-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      {children}
    </motion.div>
  );
};

export default GlassCard;
