import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management",
    tags: ["React", "Node.js", "PostgreSQL"],
    gradient: "from-accent/30 via-orange-500/20 to-rose-500/30"
  },
  {
    title: "AI Dashboard",
    description: "Analytics dashboard with machine learning insights and predictions",
    tags: ["TypeScript", "Python", "TensorFlow"],
    gradient: "from-blue-500/30 via-purple-500/20 to-accent/30"
  },
  {
    title: "Social Platform",
    description: "Real-time social networking app with live messaging and stories",
    tags: ["Next.js", "GraphQL", "Redis"],
    gradient: "from-emerald-500/30 via-teal-500/20 to-cyan-500/30"
  },
  {
    title: "Design System",
    description: "Comprehensive component library with accessibility built-in",
    tags: ["React", "Storybook", "Figma"],
    gradient: "from-pink-500/30 via-accent/20 to-yellow-500/30"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              A selection of my recent work that showcases my skills and passion
            </p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.15}>
                <GlassCard className="overflow-hidden h-full group">
                  <div className="relative">
                    {/* Dynamic gradient background */}
                    <motion.div 
                      className={`aspect-video bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Animated mesh pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <defs>
                            <pattern id={`grid-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                            </pattern>
                          </defs>
                          <rect width="100" height="100" fill={`url(#grid-${index})`}/>
                        </svg>
                      </div>
                      
                      {/* Floating elements */}
                      <motion.div
                        className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                        animate={{ 
                          rotateZ: [0, 10, -10, 0],
                          y: [0, -10, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent/30 backdrop-blur-sm"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute bottom-4 left-4 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                      
                      {/* Hover overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="flex gap-4">
                          <Button size="sm" variant="secondary" className="gap-2 backdrop-blur-sm">
                            <Github className="w-4 h-4" />
                            Code
                          </Button>
                          <Button size="sm" className="gap-2 bg-accent hover:bg-accent/90">
                            <ExternalLink className="w-4 h-4" />
                            Live
                          </Button>
                        </div>
                      </motion.div>
                    </motion.div>
                    
                    <div className="p-6 space-y-4">
                      <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 rounded-full bg-secondary/50 backdrop-blur-sm text-sm font-medium border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
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

export default Projects;
