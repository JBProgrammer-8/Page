import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import ArchitectureExplorer from './components/ArchitectureExplorer';
import ProjectsSection from './components/ProjectsSection';
import MindsetSection from './components/MindsetSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-[#e2e8f0] flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-300">
      <Navbar onNavigate={handleNavigate} />
      <main className="flex-1">
        <Hero onNavigate={handleNavigate} />
        <TechStack />
        <ArchitectureExplorer />
        <ProjectsSection />
        <MindsetSection />
        <ContactSection />
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
