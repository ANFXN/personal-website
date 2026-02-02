import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com" }
];

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <ScrollReveal>
            <div className="space-y-6">
              <motion.h2 
                className="text-5xl md:text-7xl font-bold"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Let's Create Something{" "}
                <motion.span 
                  className="text-gradient inline-block"
                  whileHover={{ scale: 1.1, rotateZ: -3 }}
                >
                  Amazing
                </motion.span>
              </motion.h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                I'm always excited to collaborate on new projects and ideas. 
                Let's connect and bring your vision to life.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-4 justify-center">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 backdrop-blur-sm bg-background/30 border-white/20 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all"
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="w-5 h-5" />
                      {social.label}
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <GlassCard className="p-8 max-w-lg mx-auto" hover3D={false}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button 
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-medium text-lg py-6 shadow-lg shadow-accent/30"
                >
                  Download Resume
                </Button>
              </motion.div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
      
      <footer className="mt-32 pt-8 border-t border-white/10 text-center text-muted-foreground">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          © 2024 All rights reserved. Built with passion and precision.
        </motion.p>
      </footer>
    </section>
  );
};

export default Contact;
