import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { staticProjects, staticSkills } from "@/data/portfolio";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Smartphone, Code2, Database, Globe, Terminal, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Thank You!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    // Reset form
    const form = e.currentTarget;
    form.reset();
  };

  const skillIcons: Record<string, any> = {
    "Languages": Code2,
    "Mobile Platforms": Smartphone,
    "Frameworks": Globe,
    "Tools": Terminal,
    "Architecture": Layers
  };

  // Helper function to get icon for category safely
  const getCategoryIcon = (category: string) => {
    // Basic fuzzy matching or default
    if (category.includes("Language")) return Code2;
    if (category.includes("Mobile")) return Smartphone;
    if (category.includes("Framework")) return Globe;
    if (category.includes("Tool")) return Terminal;
    return Database;
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Featured Projects" subtitle="Scalable applications impacting millions of users" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staticProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="Technical Expertise" subtitle="A comprehensive toolkit for modern application development" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticSkills.map((skillGroup, index) => {
                const Icon = getCategoryIcon(skillGroup.category);
                return (
                  <motion.div
                    key={skillGroup.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-card hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold font-display">{skillGroup.category}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item) => (
                        <div key={item} className="px-3 py-1.5 rounded-md bg-white/5 text-sm font-mono text-muted-foreground border border-white/5 hover:border-primary/30 hover:text-primary transition-colors">
                          {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Get in Touch" subtitle="Interested in collaboration? Let's discuss your next project." />

          <div className="grid md:grid-cols-5 gap-8 bg-card/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
             <div className="md:col-span-2 bg-gradient-to-br from-primary to-blue-600 p-8 text-white flex flex-col justify-between">
                <div>
                   <h3 className="text-2xl font-bold font-display mb-4">Contact Info</h3>
                   <p className="text-blue-100 mb-8">
                      I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                   </p>
                   
                   <div className="space-y-6">
                      <a href="mailto:abdullahbinnofal19@gmail.com" className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors">
                         <Mail className="w-5 h-5" />
                         <span>Abdullah Bin Nofal</span>
                      </a>
                      {/* <a href="https://github.com/Fareed-ud-Din-Munawwar" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors">
                         <Github className="w-5 h-5" />
                         <span>@fareedmunawwar</span>
                      </a>
                      <a href="https://www.linkedin.com/in/fareed-ud-din-munawwar-ab693a23a/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors">
                         <Linkedin className="w-5 h-5" />
                         <span>Fareed-ud-Din Munawwar</span>
                      </a> */}
                   </div>
                </div>
                
                <div className="mt-12 md:mt-0">
                   <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Mail className="w-8 h-8 text-white" />
                   </div>
                </div>
             </div>

             <div className="md:col-span-3 p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium mb-2 block">Name</label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="John Doe" 
                      className="bg-background/50 border-white/10 focus:border-primary" 
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium mb-2 block">Email</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email" 
                      placeholder="john@example.com" 
                      className="bg-background/50 border-white/10 focus:border-primary" 
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea 
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..." 
                      className="bg-background/50 border-white/10 focus:border-primary min-h-[120px] resize-none" 
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 shadow-lg shadow-primary/25"
                  >
                    Send Message
                  </Button>
                </form>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
