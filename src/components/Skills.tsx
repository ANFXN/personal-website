import { Code2, Palette, Sparkles, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "./ScrollReveal";
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
              What I Do
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <ScrollReveal key={skill.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="hover-lift border-2 hover:border-accent/50 transition-colors h-full">
                    <CardContent className="p-8 space-y-4">
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <skill.icon className="w-7 h-7 text-accent" />
                      </motion.div>
                      <h3 className="text-2xl font-bold">{skill.title}</h3>
                      <p className="text-muted-foreground">{skill.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {skill.skills.map((s) => (
                          <span 
                            key={s}
                            className="px-3 py-1 rounded-full bg-secondary text-sm font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
