import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ArticlesSection from "@/components/ArticlesSection";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutSection />
      <WorkExperienceSection />
      <ProjectsSection />
      <ActivitiesSection />
      <ArticlesSection />
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Index;
