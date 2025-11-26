const About = () => {
  return (
    <section id="about" className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 animate-fade-in">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg leading-relaxed animate-slide-up">
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
            
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 
                            border-2 border-accent/20 flex items-center justify-center
                            hover-lift">
                <div className="text-center space-y-4 p-8">
                  <div className="text-6xl font-bold text-gradient">5+</div>
                  <p className="text-xl font-medium">Years Experience</p>
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-sm">50+ Projects</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-sm">Happy Clients</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
