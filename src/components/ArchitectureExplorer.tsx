import { useState } from 'react';
import {
  Layers,
  FolderTree,
  FileCode,
  ShieldAlert,
  GitCommit,
  Check,
  Copy,
  ChevronRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { ARCHITECTURE_LAYERS } from '../data/portfolioData';

export default function ArchitectureExplorer() {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('domain');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showDiagramFullscreen, setShowDiagramFullscreen] = useState(false);

  const activeLayer =
    ARCHITECTURE_LAYERS.find((l) => l.id === selectedLayerId) || ARCHITECTURE_LAYERS[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="arquitetura" className="py-14 sm:py-20 relative bg-[#070b14]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>DESIGN PATTERNS & PRINCÍPIOS PILARES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Clean Architecture & Engenharia
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Estrutura baseada na separação estrita de responsabilidades em camadas concêntricas (Presentation, Application, Domain e Infrastructure), isolando regras de negócio centrais de frameworks e banco de dados.
          </p>
        </div>

        {/* 2-Column Split: Interactive Layer Explorer & Visual Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Layer Navigation & Responsibilities */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Selecione uma Camada Arquitetural:
            </div>

            <div className="space-y-2">
              {ARCHITECTURE_LAYERS.map((layer) => {
                const isSelected = layer.id === selectedLayerId;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-sky-500/50 shadow-md shadow-sky-500/10'
                        : 'bg-[#0c121e]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#0c121e]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: layer.color }}
                      />
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{layer.name}</span>
                        </div>
                        <div className="text-xs font-mono text-slate-400">
                          {layer.englishName}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-sky-400 translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Git Conventional Commits Note (From Josué's personal doc) */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
              <div className="flex items-center gap-2 font-mono text-sky-400 font-semibold mb-1.5">
                <GitCommit className="w-4 h-4" />
                <span>Padrão de Versionamento & Commits</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-2">
                Padronização rigorosa de mensagens para rastreabilidade de novas features e patches:
              </p>
              <div className="space-y-1 font-mono text-[11px] text-slate-300 bg-[#080d16] p-2.5 rounded-lg border border-slate-800/80">
                <div>&lt;feat&gt;(New Project): inicialização estrutural</div>
                <div className="text-sky-300">&lt;feat&gt;[v1.0](Descrição do commit): versionamento contínuo</div>
              </div>
            </div>
          </div>

          {/* Right Column: Layer Inspection & Code Sample */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0c121e] border border-slate-800/90 shadow-xl overflow-hidden flex flex-col">
              {/* Layer Inspector Header */}
              <div className="px-5 py-4 bg-[#090e18] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: activeLayer.color }}
                  />
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{activeLayer.name}</span>
                      <span className="text-xs font-mono text-slate-400 font-normal">
                        ({activeLayer.englishName})
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(activeLayer.sampleCode)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors text-xs font-mono flex items-center gap-1"
                    title="Copiar código da camada"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Layer Description & Folders */}
              <div className="p-5 border-b border-slate-800/80 space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeLayer.description}
                </p>

                {/* Folders in this layer */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <FolderTree className="w-3.5 h-3.5 text-sky-400" />
                    <span>Estrutura de Pastas // Diretórios</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeLayer.folders.map((folder, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#080d16] border border-slate-800 font-mono text-xs text-sky-300"
                      >
                        {folder}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Responsibilities list */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Responsabilidades da Camada:
                  </div>
                  <ul className="space-y-1.5">
                    {activeLayer.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-sky-400 select-none">▸</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Code Preview Box */}
              <div className="bg-[#080d16] p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 overflow-x-auto max-h-[300px]">
                <div className="text-[11px] text-slate-500 mb-2 pb-1 border-b border-slate-800 flex items-center justify-between">
                  <span>Arquivo: {activeLayer.sampleFilename}</span>
                  <span className="text-sky-400">C# / Clean Pattern</span>
                </div>
                <pre>
                  <code>{activeLayer.sampleCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Architecture Blueprint Showcase */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0c121e] border border-slate-800/80 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden border border-slate-800 bg-[#080d16] relative group">
            <img
              src="/src/assets/images/clean_architecture_blueprint_1792584500297.jpg"
              alt="Diagrama de Clean Architecture"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => setShowDiagramFullscreen(true)}
              className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
              title="Expandir diagrama"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full md:w-2/3 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
              <Layers className="w-4 h-4" />
              <span>ARQUITETURA EM CÍRCULOS CONCÊNTRICOS</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Regra de Dependência Unidirecional
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              O princípio fundamental da Clean Architecture determina que o código de camadas internas nunca sabe nada sobre as camadas externas. O <strong>Domain</strong> não referencia bibliotecas de banco de dados nem serializadores. A <strong>Application</strong> define as interfaces que a <strong>Infrastructure</strong> implementa via inversão de dependência (IoC/DI).
            </p>
            <div className="pt-1 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>Domain → Core</span>
              <span>·</span>
              <span>Application → Use Cases</span>
              <span>·</span>
              <span>Infrastructure → I/O & DB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Blueprint Lightbox */}
      {showDiagramFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setShowDiagramFullscreen(false)}
              className="self-end mb-2 p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Fechar</span>
            </button>
            <img
              src="/src/assets/images/clean_architecture_blueprint_1792584500297.jpg"
              alt="Diagrama de Clean Architecture Expandido"
              className="w-full max-h-[80vh] object-contain rounded-xl border border-slate-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </section>
  );
}
