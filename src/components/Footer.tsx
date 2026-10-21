import { Terminal, Github, Linkedin, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#070b14] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-sm text-white">
              {PERSONAL_INFO.name}
            </span>
          </div>

          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} {PERSONAL_INFO.alias}. Todos os direitos reservados.
          </p>
        </div>

        {/* Middle: Stack Summary */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400 flex-wrap justify-center">
          <span>.NET 8</span>
          <span className="text-slate-700">·</span>
          <span>C#</span>
          <span className="text-slate-700">·</span>
          <span>GraphQL</span>
          <span className="text-slate-700">·</span>
          <span>PostgreSQL</span>
          <span className="text-slate-700">·</span>
          <span>Clean Architecture</span>
        </div>

        {/* Right: Quick Links & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1 text-xs font-mono ml-2"
            title="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="hidden sm:inline">Topo</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
