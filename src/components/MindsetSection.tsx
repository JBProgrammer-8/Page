import { Compass, MessageSquareShare, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, MINDSET_PILLARS } from '../data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  MessageSquareShare,
  ShieldCheck,
};

export default function MindsetSection() {
  return (
    <section id="perfil" className="py-14 sm:py-20 relative bg-[#070b14]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>BEHAVIORAL PROFILE & CULTURA DE ENGENHARIA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Perfil, Postura & Mentalidade
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Em times de engenharia, a excelência técnica precisa andar lado a lado com comunicação empática, senso de dono e clareza de propósito.
          </p>
        </div>

        {/* Editorial Quote Card */}
        <div className="relative mb-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0e1626] to-[#090e18] border border-slate-800 shadow-2xl overflow-hidden">
          <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-sky-500/5 pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Quote className="w-5 h-5" />
            </div>

            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-100 leading-relaxed italic" style={{ textWrap: 'balance' }}>
              “Tudo o que você faz agora emana para fora e afeta todo mundo. Sua postura pode fazer seu coração brilhar ou transmitir uma doença sombria aos outros. Seu fôlego pode irradiar amor ou enlamear a atmosfera ao seu redor.”
            </blockquote>

            <div className="pt-2 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center text-xs font-bold text-sky-300">
                JB
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {PERSONAL_INFO.name}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {PERSONAL_INFO.alias} · Filosofia de Trabalho
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Behavioral Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MINDSET_PILLARS.map((pillar, idx) => {
            const IconComp = iconMap[pillar.icon] || Compass;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0c121e] border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-mono text-sky-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Princípio Ativo</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
