import { useState } from 'react';
import { ArrowRight, Check, Copy, Terminal, Database, Server, Layers, ExternalLink, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO, METRICS } from '../data/portfolioData';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

const CODE_TABS = [
  {
    id: 'program',
    filename: 'Program.cs',
    language: 'csharp',
    code: `// .NET 8 Minimal API com Injeção de Dependência
var builder = WebApplication.CreateBuilder(args);

// Registro de Serviços da Camada de Aplicação
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();

// Conexão com Banco de Dados Relacional PostgreSQL
builder.Services.AddDbContext<AppDbContext>(opts =>
    opts.UseNpgsql(builder.Configuration.GetConnectionString("PostgresDb")));

// Configuração do Engine de GraphQL
builder.Services
    .AddGraphQLServer()
    .AddQueryType<OrderQueries>()
    .AddMutationType<OrderMutations>();

var app = builder.Build();

app.MapGet("/api/v1/health", () => Results.Ok(new { status = "Healthy", timestamp = DateTime.UtcNow }));
app.MapGraphQL("/graphql");

app.Run();`,
  },
  {
    id: 'domain',
    filename: 'Order.cs',
    language: 'csharp',
    code: `namespace Domain.Entities;

// Entidade central com encapsulamento de regras de negócio
public class Order : AggregateRoot
{
    public Guid Id { get; private set; }
    public Guid CustomerId { get; private set; }
    public decimal TotalAmount { get; private set; }
    public OrderStatus Status { get; private set; }
    
    private readonly List<OrderItem> _items = new();
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();

    public Order(Guid customerId, IEnumerable<OrderItem> items)
    {
        if (customerId == Guid.Empty)
            throw new DomainRuleException("Identificador de cliente inválido.");

        Id = Guid.NewGuid();
        CustomerId = customerId;
        _items.AddRange(items);
        Status = OrderStatus.Pending;
        CalculateTotal();
    }

    public void ConfirmPayment()
    {
        if (Status != OrderStatus.Pending)
            throw new DomainRuleException("Apenas pedidos pendentes podem ser confirmados.");
        
        Status = OrderStatus.Confirmed;
    }
}`,
  },
  {
    id: 'graphql',
    filename: 'schema.graphql',
    language: 'graphql',
    code: `"""
Schema declarativo para consultas tipadas de pedidos e inventário
"""
type Query {
  order(id: ID!): Order
  listOrders(status: OrderStatus, page: Int = 1, pageSize: Int = 20): OrderConnection!
}

type Mutation {
  createOrder(input: CreateOrderInput!): OrderPayload!
  confirmOrderPayment(orderId: ID!): Order!
}

type Order {
  id: ID!
  customerId: ID!
  totalAmount: Float!
  status: OrderStatus!
  createdAt: String!
  items: [OrderItem!]!
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  CANCELLED
}`,
  },
];

export default function Hero({ onNavigate }: HeroProps) {
  const [activeTab, setActiveTab] = useState(CODE_TABS[0].id);
  const [copied, setCopied] = useState(false);

  const currentTab = CODE_TABS.find((t) => t.id === activeTab) || CODE_TABS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero: 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy & Actions */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Status Unboxed Text */}
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>{PERSONAL_INFO.status}</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-400">{PERSONAL_INFO.location}</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-400 block">
                {PERSONAL_INFO.alias} // Engenharia de Software
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
                Olá! Eu sou{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-300">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
            </div>

            {/* Subtitle / Lead Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Desenvolvedor Backend focado na construção de APIs de alta performance, integrações distribuídas, modelagem relacional sólida e soluções de alta concorrência com o ecossistema{' '}
              <strong className="text-sky-300 font-semibold">.NET 8</strong>,{' '}
              <strong className="text-sky-300 font-semibold">C#</strong>,{' '}
              <strong className="text-sky-300 font-semibold">GraphQL</strong> e bancos de dados modernos.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href={`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encodeURIComponent('Olá Josué! Vi seu portfólio de engenharia backend e gostaria de conversar.')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-98 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>

              <button
                onClick={() => onNavigate('arquitetura')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all active:scale-98 whitespace-nowrap"
              >
                <Layers className="w-4 h-4 text-sky-400" />
                <span>Ver Arquitetura</span>
              </button>

              <button
                onClick={() => onNavigate('contato')}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 rounded-xl transition-all whitespace-nowrap"
              >
                <span>Formulário</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors whitespace-nowrap"
              >
                <span>GitHub Repos</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Tech Badges */}
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-slate-400 flex-wrap">
              <span className="text-slate-500">Stack:</span>
              <span className="text-slate-300">C# .NET 8</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">GraphQL</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">PostgreSQL</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">Clean Architecture</span>
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-[#0c121e] border border-slate-800/90 shadow-2xl shadow-black/60 overflow-hidden">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#080d16] border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                    backend-architecture ~ /src
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
                  {CODE_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-2.5 py-1 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-sky-500/20 text-sky-300 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tab.filename}
                    </button>
                  ))}
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                  title="Copiar código"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Code Editor Body */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 overflow-x-auto max-h-[360px] sm:max-h-[400px]">
                <pre className="text-slate-300 font-mono">
                  <code>
                    {currentTab.code.split('\n').map((line, idx) => {
                      const isComment = line.trim().startsWith('//') || line.trim().startsWith('"""');
                      const isKeyword =
                        line.includes('var ') ||
                        line.includes('public ') ||
                        line.includes('class ') ||
                        line.includes('type ') ||
                        line.includes('namespace ') ||
                        line.includes('enum ');

                      return (
                        <div key={idx} className="table-row">
                          <span className="table-cell pr-4 select-none text-slate-600 text-right w-8">
                            {idx + 1}
                          </span>
                          <span
                            className={`table-cell ${
                              isComment
                                ? 'text-slate-500 italic'
                                : isKeyword
                                ? 'text-sky-300'
                                : 'text-slate-200'
                            }`}
                          >
                            {line}
                          </span>
                        </div>
                      );
                    })}
                  </code>
                </pre>
              </div>

              {/* Terminal Footer Bar */}
              <div className="px-4 py-2 bg-[#080d16] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="text-sky-400">UTF-8</span>
                  <span>·</span>
                  <span>{currentTab.language.toUpperCase()}</span>
                  <span>·</span>
                  <span>.NET 8.0 SDK</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  <span className="text-slate-400">Compilação OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Metrics & Highlights Row (Below the Hero Split) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-slate-900/40 border border-slate-800/70 hover:border-slate-700 transition-colors"
              >
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-sky-300 mt-1">
                  {metric.label}
                </div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
