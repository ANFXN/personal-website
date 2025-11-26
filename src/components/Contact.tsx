import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import ParallaxSection from "./ParallaxSection";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com" }
];

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <ParallaxSection speed={-0.2}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-bold">
                  Let's Create Something{" "}
                  <span className="text-gradient">Amazing</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  I'm always excited to collaborate on new projects and ideas. 
                  Let's connect and bring your vision to life.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-4 justify-center">
                {socialLinks.map((social, index) => (
                  <ScrollReveal key={social.label} delay={0.3 + index * 0.1}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 hover:border-accent hover:text-accent transition-colors"
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <social.icon className="w-5 h-5" />
                        {social.label}
                      </a>
                    </Button>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <div className="pt-8">
                <Button 
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium text-lg px-8"
                >
                  Download Resume
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ParallaxSection>
      
      <footer className="mt-32 pt-8 border-t text-center text-muted-foreground">
        <p>© 2024 All rights reserved. Built with passion and precision.</p>
      </footer>
    </section>
  );
};

export default Contact;
