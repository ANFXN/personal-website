import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "1000px" }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold tracking-tight"
              initial={{ opacity: 0, z: -100 }}
              animate={{ opacity: 1, z: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              Creative{" "}
              <motion.span 
                className="text-gradient inline-block"
                initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10,
                  textShadow: "0 0 40px hsl(28 85% 58% / 0.5)"
                }}
              >
                Designer
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                & Developer
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Crafting beautiful digital experiences with bold design and clean code
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateZ: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium shadow-lg shadow-accent/30"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                className="backdrop-blur-sm bg-background/30 border-white/20"
                onClick={() => scrollToSection("contact")}
              >
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <motion.button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full backdrop-blur-sm bg-background/20 border border-white/10"
        aria-label="Scroll to about section"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--accent) / 0.2)" }}
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </motion.button>
    </section>
  );
};

export default Hero;
