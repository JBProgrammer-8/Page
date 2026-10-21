import { useState } from 'react';
import {
  Cpu,
  Database,
  Network,
  Layers,
  FileCode2,
  Gamepad2,
  Code2,
  X,
  CheckCircle2,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import { TECH_STACK } from '../data/portfolioData';
import { TechItem } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Database,
  Network,
  Layers,
  FileCode2,
  Gamepad2,
};

export default function TechStack() {
  const [filter, setFilter] = useState<'all' | 'backend' | 'database' | 'tools'>('all');
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredTechs = TECH_STACK.filter((tech) => {
    if (filter === 'all') return true;
    return tech.category === filter;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tecnologias" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>STACK TÉCNICA // CORE KNOWLEDGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Conhecimento & Tecnologias
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Tecnologias que venho dando enfoque em meus estudos e projetos em busca de me tornar um profissional capacitado, com código limpo e padrões arquiteturais sólidos.
            </p>
          </div>

          {/* Interactive Filter Tabs (Single-line controls) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shrink-0 self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === 'all'
                  ? 'bg-sky-500/20 text-sky-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Todos ({TECH_STACK.length})
            </button>
            <button
              onClick={() => setFilter('backend')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === 'backend'
                  ? 'bg-sky-500/20 text-sky-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Backend & APIs
            </button>
            <button
              onClick={() => setFilter('database')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === 'database'
                  ? 'bg-sky-500/20 text-sky-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Bancos de Dados
            </button>
            <button
              onClick={() => setFilter('tools')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === 'tools'
                  ? 'bg-sky-500/20 text-sky-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Engines & Tooling
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechs.map((tech) => {
            const IconComponent = iconMap[tech.icon] || Code2;
            const hasCode = Boolean(tech.codeSnippet);

            return (
              <div
                key={tech.id}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0c121e] border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 group-hover:scale-105 group-hover:bg-sky-500/10 group-hover:border-sky-500/30 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                      {tech.categoryLabel}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-sky-400/90 font-mono mt-1 mb-3">
                    {tech.summary}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                    {tech.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                    {tech.highlights.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-5 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                  {hasCode ? (
                    <button
                      onClick={() => setSelectedTech(tech)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      <span>Ver Código & Práticas</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono">
                      Arquitetura & Configuração
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-slate-600">
                    #{tech.id}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Code Details Modal */}
      {selectedTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#0d1424] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#090e18] border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {selectedTech.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Snippet & Padrão de Implementação
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedTech.codeSnippet && (
                  <button
                    onClick={() => handleCopyCode(selectedTech.codeSnippet!)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono"
                    title="Copiar código"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={() => setSelectedTech(null)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Fechar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-1">
                  Visão Geral & Aplicação
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedTech.description}
                </p>
              </div>

              {/* All Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Destaques & Competências Práticas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTech.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet Box */}
              {selectedTech.codeSnippet && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                    <span>Exemplo de Código ({selectedTech.codeLanguage})</span>
                    <span className="text-[11px] text-slate-500">Prática Recomendada</span>
                  </h4>
                  <div className="rounded-xl bg-[#080d16] border border-slate-800 p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 overflow-x-auto">
                    <pre>
                      <code>{selectedTech.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-[#090e18] border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedTech(null)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Fechar Visualização
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
