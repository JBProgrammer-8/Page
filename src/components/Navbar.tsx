import { useState } from 'react';
import { Menu, X, ArrowUpRight, Terminal, Github, Linkedin, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="group flex items-center gap-2.5 text-slate-100 hover:text-white transition-colors shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:border-sky-400 group-hover:bg-sky-500/20 transition-all">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-white group-hover:text-sky-300 transition-colors whitespace-nowrap">
                Josué Barros
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase -mt-0.5">
                JB Programmer
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 Concise Single-line Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Início
            </button>
            <button
              onClick={() => handleNavClick('tecnologias')}
              className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Tecnologias
            </button>
            <button
              onClick={() => handleNavClick('arquitetura')}
              className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Arquitetura
            </button>
            <button
              onClick={() => handleNavClick('projetos')}
              className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Projetos
            </button>
            <button
              onClick={() => handleNavClick('perfil')}
              className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Perfil
            </button>
            <button
              onClick={() => handleNavClick('contato')}
              className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Contato
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action + Social Quick Links */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={() => handleNavClick('contato')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-all shadow-sm active:scale-98 whitespace-nowrap"
            >
              <span>Falar Comigo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0c121e] px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNavClick('hero')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-sky-300 hover:bg-slate-800/60 transition-colors flex items-center justify-between"
          >
            <span>Início</span>
            <span className="text-xs font-mono text-slate-500">01</span>
          </button>
          <button
            onClick={() => handleNavClick('tecnologias')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-sky-300 hover:bg-slate-800/60 transition-colors flex items-center justify-between"
          >
            <span>Tecnologias</span>
            <span className="text-xs font-mono text-slate-500">02</span>
          </button>
          <button
            onClick={() => handleNavClick('arquitetura')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-sky-300 hover:bg-slate-800/60 transition-colors flex items-center justify-between"
          >
            <span>Arquitetura</span>
            <span className="text-xs font-mono text-slate-500">03</span>
          </button>
          <button
            onClick={() => handleNavClick('projetos')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-sky-300 hover:bg-slate-800/60 transition-colors flex items-center justify-between"
          >
            <span>Projetos</span>
            <span className="text-xs font-mono text-slate-500">04</span>
          </button>
          <button
            onClick={() => handleNavClick('perfil')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-sky-300 hover:bg-slate-800/60 transition-colors flex items-center justify-between"
          >
            <span>Perfil & Mentalidade</span>
            <span className="text-xs font-mono text-slate-500">05</span>
          </button>
          <button
            onClick={() => handleNavClick('contato')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-sky-300 hover:bg-slate-800/60 transition-colors flex items-center justify-between"
          >
            <span>Contato Direto</span>
            <span className="text-xs font-mono text-slate-500">06</span>
          </button>

          <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encodeURIComponent('Olá Josué! Vi seu portfólio de backend e gostaria de conversar.')}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-400 text-xs font-semibold text-slate-950 hover:bg-emerald-300 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
