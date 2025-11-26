import { Code2, Palette, Sparkles, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <section id="skills" className="py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">
            What I Do
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <Card 
                key={skill.title}
                className="hover-lift border-2 hover:border-accent/50 transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                    <skill.icon className="w-7 h-7 text-accent" />
                  </div>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
