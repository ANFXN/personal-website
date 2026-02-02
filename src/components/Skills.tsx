import { Code2, Palette, Sparkles, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

const skills = [
  {
    icon: Code2,
    title: "Development",
    description: "Modern frameworks & clean, maintainable code",
    skills: ["React", "TypeScript", "Node.js", "Next.js"]
  },
  {
    icon: Palette,
    title: "Design",
    description: "Beautiful interfaces with attention to detail",
    skills: ["UI/UX", "Figma", "Design Systems", "Branding"]
  },
  {
    icon: Sparkles,
    title: "Animation",
    description: "Smooth interactions that delight users",
    skills: ["Framer Motion", "GSAP", "CSS Animations", "WebGL"]
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Fast, optimized & accessible experiences",
    skills: ["Optimization", "SEO", "Accessibility", "Testing"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">
              What I <span className="text-gradient">Do</span>
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <ScrollReveal key={skill.title} delay={index * 0.15}>
                <GlassCard className="p-8 h-full group">
                  <div className="space-y-4">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30"
                      whileHover={{ 
                        rotate: 360, 
                        scale: 1.1,
                        boxShadow: "0 0 30px hsl(28 85% 58% / 0.5)"
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <skill.icon className="w-8 h-8 text-accent" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">{skill.title}</h3>
                    <p className="text-muted-foreground">{skill.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {skill.skills.map((s, i) => (
                        <motion.span 
                          key={s}
                          className="px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm text-sm font-medium border border-white/10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: "hsl(var(--accent) / 0.2)",
                            borderColor: "hsl(var(--accent) / 0.5)"
                          }}
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
