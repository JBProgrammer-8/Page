import { useState, useId } from 'react';
import {
  MessageSquare,
  Mail,
  Send,
  Github,
  Linkedin,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function ContactSection() {
  const [protocol, setProtocol] = useState<'whatsapp' | 'email'>('whatsapp');
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [projectType, setProjectType] = useState('Backend API & .NET');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const nameId = useId();
  const contactInfoId = useId();
  const projectTypeId = useId();
  const messageId = useId();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.whatsappFormatted);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSending(true);
    setSubmittedStatus(null);
    setStatusType(null);

    const formattedMessage = `Olá Josué Barros!\n\nMeu nome é ${name} (${contactInfo || 'Sem contato adicional'}).\nInteresse: ${projectType}.\n\nMensagem:\n${message}`;

    if (protocol === 'whatsapp') {
      const encoded = encodeURIComponent(formattedMessage);
      const waUrl = `https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encoded}`;

      setTimeout(() => {
        setIsSending(false);
        setStatusType('success');
        setSubmittedStatus(`Mensagem formatada com sucesso! Abrindo conversa no WhatsApp (+55 62 98505-4112)...`);
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }, 400);
    } else {
      // Envio de e-mail via FormData (sem await e sem bloqueio de CORS em localhost)
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', contactInfo);
      formData.append('_replyto', contactInfo);
      formData.append('subject', `[Contato Portfólio] ${projectType} - ${name}`);
      formData.append('foco_projeto', projectType);
      formData.append('message', message);
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');

      fetch(PERSONAL_INFO.emailEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Falha no envio HTTP: ${response.status}`);
          }
          return response.json().catch(() => ({}));
        })
        .then((data) => {
          if (data && data.success === 'false') {
            throw new Error('Retorno sem sucesso da API');
          }
          setIsSending(false);
          setStatusType('success');
          setSubmittedStatus(
            'Mensagem enviada com sucesso! O e-mail foi entregue diretamente na caixa postal de Josué (jbprogrammer.8@gmail.com).'
          );
          setName('');
          setContactInfo('');
          setMessage('');
        })
        .catch(() => {
          setIsSending(false);
          setStatusType('error');
          setSubmittedStatus(
            'O provedor de envio direto encontrou uma instabilidade. Você pode enviar pelo Gmail Web ou abrir seu cliente de e-mail abaixo.'
          );
        });
    }
  };

  return (
    <section id="contato" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>CANAL DIRETO DE COMUNICAÇÃO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Vamos Conversar?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Deixo à disposição minhas redes e os canais diretos abaixo para troca de ideias técnicas, novos projetos ou oportunidades na área de backend e dados.
          </p>
        </div>

        {/* 2-Column Split: Direct Channels & Interactive Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Response Times */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Canais Diretos de Acesso:
            </div>

            {/* WhatsApp Direct Card */}
            <div className="p-5 rounded-2xl bg-[#0c121e] border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center justify-between group bg-gradient-to-r from-emerald-950/20 to-transparent">
              <a
                href={`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encodeURIComponent('Olá Josué! Vi seu portfólio de engenharia backend e gostaria de conversar.')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 flex-1"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    <span>WhatsApp Direto</span>
                  </div>
                  <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors select-all">
                    {PERSONAL_INFO.whatsappFormatted}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs font-mono flex items-center gap-1"
                  title="Copiar número do WhatsApp"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encodeURIComponent('Olá Josué! Vi seu portfólio de engenharia backend e gostaria de conversar.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-400 hover:text-emerald-300 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Abrir WhatsApp agora"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Email Card with 1-click copy */}
            <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">E-mail Profissional</div>
                  <div className="text-sm font-semibold text-white select-all">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs font-mono flex items-center gap-1"
                title="Copiar endereço de e-mail"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* GitHub Profile Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800/80 hover:border-sky-500/40 hover:bg-[#0e1628] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-slate-700">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">GitHub Repositórios</div>
                  <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                    JBProgrammer-8
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
            </a>

            {/* LinkedIn Profile Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800/80 hover:border-sky-500/40 hover:bg-[#0e1628] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">LinkedIn Conexão</div>
                  <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                    Josué Barros
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
            </a>

            {/* SLA / Availability indicator */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Tempo médio de retorno: normalmente em menos de 24 horas em dias úteis.</span>
            </div>
          </div>

          {/* Right Column: Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c121e] border border-slate-800/90 shadow-2xl">
              {/* Protocol Selector Tabs */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
                <div className="text-xs font-mono text-slate-400">
                  Modo de Envio:
                </div>

                <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setProtocol('whatsapp');
                      setSubmittedStatus(null);
                      setStatusType(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      protocol === 'whatsapp'
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Direto</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProtocol('email');
                      setSubmittedStatus(null);
                      setStatusType(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      protocol === 'email'
                        ? 'bg-sky-500/20 text-sky-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>E-mail Direto (API)</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor={nameId} className="block text-xs font-mono text-slate-300 mb-1.5">
                    Seu Nome ou Empresa *
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Carlos Mendes ou Tech Corp"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080d16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/70 transition-colors"
                  />
                </div>

                {/* Contact Email or WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={contactInfoId} className="block text-xs font-mono text-slate-300 mb-1.5">
                      {protocol === 'email' ? 'Seu E-mail para Retorno *' : 'Seu WhatsApp ou Telefone'}
                    </label>
                    <input
                      id={contactInfoId}
                      type={protocol === 'email' ? 'email' : 'text'}
                      required={protocol === 'email'}
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder={
                        protocol === 'email'
                          ? 'Ex: seu.nome@empresa.com'
                          : 'Ex: (62) 98765-4321'
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080d16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/70 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor={projectTypeId} className="block text-xs font-mono text-slate-300 mb-1.5">
                      Foco do Projeto / Interesse
                    </label>
                    <select
                      id={projectTypeId}
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080d16] border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/70 transition-colors"
                    >
                      <option value="Backend API & .NET">Backend API & .NET 8</option>
                      <option value="Arquitetura & Clean Architecture">Clean Architecture & Refatoração</option>
                      <option value="GraphQL & Otimização de Dados">GraphQL & Schemas de Alta Performance</option>
                      <option value="Bancos de Dados & PostgreSQL">Modelagem Relacional PostgreSQL / SQL</option>
                      <option value="Oportunidade de Trabalho">Vaga / Oportunidade Profissional</option>
                      <option value="Outro assunto">Outro assunto</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor={messageId} className="block text-xs font-mono text-slate-300">
                      Mensagem *
                    </label>
                    <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                      {message.length} / 500 caracteres
                    </span>
                  </div>
                  <textarea
                    id={messageId}
                    rows={4}
                    required
                    maxLength={500}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva brevemente sua necessidade ou o contexto da conversa..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080d16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/70 transition-colors resize-none"
                  />
                </div>

                {/* Feedback Toast */}
                {submittedStatus && (
                  <div
                    className={`p-4 rounded-xl border flex flex-col gap-2.5 text-xs animate-in fade-in ${
                      statusType === 'success'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {statusType === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{submittedStatus}</span>
                    </div>

                    {statusType === 'error' && (
                      <div className="pt-2 border-t border-rose-500/20 flex flex-wrap items-center gap-2">
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=${encodeURIComponent(
                            `[Portfólio] ${projectType} - ${name}`
                          )}&body=${encodeURIComponent(
                            `Olá Josué,\n\n${message}\n\nContato: ${contactInfo}`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-white font-medium transition-colors flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Abrir no Gmail Web</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `Para: ${PERSONAL_INFO.email}\nAssunto: [Portfólio] ${projectType} - ${name}\n\n${message}\n\nContato: ${contactInfo}`
                            );
                            alert('Rascunho copiado para a área de transferência!');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Rascunho</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSending || !name.trim() || !message.trim()}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-300 text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 shadow-lg shadow-sky-500/15"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Despachando mensagem diretamente...</span>
                    </>
                  ) : protocol === 'whatsapp' ? (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Abrir Conversa no WhatsApp</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>Enviar E-mail Diretamente da Página</span>
                    </>
                  )}
                </button>
                {protocol === 'email' && (
                  <p className="text-[11px] font-mono text-center text-slate-500">
                    Envio seguro via API direta para jbprogrammer.8@gmail.com
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
