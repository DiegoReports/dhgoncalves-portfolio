import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArticlesSection from "@/components/ArticlesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutSection />
      <WorkExperienceSection />
      <ProjectsSection />
      <ArticlesSection />
      <Footer />
    </div>
  );
};

export default Index;