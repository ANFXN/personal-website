import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
};

export default Index;
