import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Modern shopping experience with seamless checkout and inventory management",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Design System",
    description: "Comprehensive component library with documentation and theming support",
    tags: ["React", "TypeScript", "Storybook", "Tailwind"],
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time data visualization with interactive charts and insights",
    tags: ["Next.js", "D3.js", "WebSockets", "Redis"],
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "Social Media App",
    description: "Feature-rich platform with real-time messaging and content sharing",
    tags: ["React Native", "Firebase", "GraphQL", "AWS"],
    gradient: "from-green-500/20 to-emerald-500/20"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A selection of recent work that showcases my approach to design and development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.title}
                className="group hover-lift overflow-hidden border-2 hover:border-accent/50 transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-48 bg-gradient-to-br ${project.gradient} 
                              flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/50" />
                  <div className="text-6xl font-bold opacity-10 group-hover:scale-110 transition-transform">
                    0{index + 1}
                  </div>
                </div>
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 rounded-full bg-secondary text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Github className="w-4 h-4" />
                      Code
                    </Button>
                    <Button size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </Button>
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

export default Projects;
