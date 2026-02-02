import ScrollReveal from "./ScrollReveal";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-bold mb-12">
              About <span className="text-gradient">Me</span>
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0.2}>
              <GlassCard className="p-8" hover3D={false}>
                <div className="space-y-6 text-lg leading-relaxed">
                  <p>
                    I'm a passionate designer and developer who loves creating digital experiences 
                    that are both beautiful and functional. With a keen eye for detail and a commitment 
                    to clean code, I bring ideas to life.
                  </p>
                  <p>
                    My work sits at the intersection of design and technology, where I combine 
                    aesthetic sensibility with technical expertise to build products that users love.
                  </p>
                  <p>
                    When I'm not crafting pixel-perfect interfaces, you'll find me exploring new 
                    technologies, contributing to open source, or sharing knowledge with the community.
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <GlassCard className="p-8">
                <div className="text-center space-y-6">
                  <motion.div 
                    className="text-7xl font-bold text-gradient"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    whileHover={{ scale: 1.1, rotateZ: 5 }}
                  >
                    5+
                  </motion.div>
                  <p className="text-xl font-medium">Years Experience</p>
                  <div className="pt-4 space-y-4">
                    {[
                      { label: "50+ Projects", delay: 0.3 },
                      { label: "Happy Clients", delay: 0.4 },
                      { label: "Awards Won", delay: 0.5 }
                    ].map((item) => (
                      <motion.div 
                        key={item.label}
                        className="flex items-center gap-3 justify-center"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: item.delay }}
                      >
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-accent"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: item.delay }}
                        />
                        <span>{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
