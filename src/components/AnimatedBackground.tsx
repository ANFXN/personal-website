import { motion } from "framer-motion";

interface FloatingShapeProps {
  delay?: number;
  duration?: number;
  size?: number;
  left?: string;
  top?: string;
  color?: string;
}

const FloatingShape = ({ 
  delay = 0, 
  duration = 20, 
  size = 100, 
  left = "10%", 
  top = "10%",
  color = "accent"
}: FloatingShapeProps) => {
  return (
    <motion.div
      className={`absolute w-${size} h-${size} rounded-full blur-3xl opacity-20`}
      style={{
        left,
        top,
        background: color === "accent" 
          ? "hsl(var(--accent))" 
          : "hsl(var(--primary))",
      }}
      animate={{
        y: [0, -50, 0],
        x: [0, 30, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <FloatingShape delay={0} duration={25} size={300} left="5%" top="10%" color="accent" />
      <FloatingShape delay={3} duration={30} size={400} left="70%" top="20%" color="primary" />
      <FloatingShape delay={6} duration={28} size={250} left="40%" top="60%" color="accent" />
      <FloatingShape delay={2} duration={35} size={350} left="80%" top="70%" color="primary" />
      <FloatingShape delay={8} duration={32} size={200} left="15%" top="80%" color="accent" />
      
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.1), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
