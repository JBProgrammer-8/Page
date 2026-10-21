import { Github, ExternalLink, GitFork, Star, Code, ArrowUpRight } from 'lucide-react';
import { FEATURED_PROJECTS, PERSONAL_INFO } from '../data/portfolioData';

export default function ProjectsSection() {
  return (
    <section id="projetos" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>REPOSITÓRIOS & IMPLEMENTAÇÕES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Projetos & Repositórios
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Projetos práticos demonstrando separação de camadas, integração com serviços terceiros e código orientado a escalabilidade.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors self-start md:self-auto shrink-0"
          >
            <Github className="w-4 h-4 text-sky-400" />
            <span>Ver perfil no GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0c121e] border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 group hover:shadow-xl hover:shadow-sky-500/5"
            >
              <div>
                {/* Project Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Code className="w-4 h-4 text-sky-400" />
                    <span>{project.role}</span>
                  </div>
                  {project.featured && (
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
                      Destaque
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mt-2.5 mb-4">
                  {project.description}
                </p>

                {/* Architecture Highlights */}
                <div className="space-y-1.5 pt-3 pb-4 border-t border-slate-800/70">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Pontos de Arquitetura:
                  </span>
                  {project.architectureDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-sky-400 select-none">▸</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techs.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 mt-4 border-t border-slate-800/70 flex items-center justify-between">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Código no GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    <span>Deploy Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
