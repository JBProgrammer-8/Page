import { TechItem, ProjectItem, ArchitectureLayer } from '../types';

export const PERSONAL_INFO = {
  name: 'Josué Barros',
  alias: 'JB Programmer',
  role: 'Desenvolvedor Backend & Arquitetura',
  tagline: 'Construindo APIs de alta performance, microsserviços distribuídos e modelagem de dados resiliente.',
  summary:
    'Desenvolvedor Backend focado na construção de APIs de alta performance, integrações distribuídas, modelagem relacional sólida e soluções de alta concorrência com o ecossistema .NET 8, C#, GraphQL e bancos de dados modernos.',
  email: 'jbprogrammer.8@gmail.com',
  github: 'https://github.com/JBProgrammer-8',
  linkedin: 'https://www.linkedin.com/in/josue-barros-jb/',
  whatsappNumber: '5562985054112',
  whatsappFormatted: '+55 (62) 98505-4112',
  location: 'Brasil',
  status: 'Disponível para Projetos & Oportunidades',
};

export const METRICS = [
  { value: '.NET 8', label: 'C# Moderno & ASP.NET Core', detail: 'Minimal APIs, CIL & Injeção de Dependência' },
  { value: 'Clean Arch', label: 'Arquitetura em Camadas', detail: 'Domain, Application & Infrastructure' },
  { value: 'GraphQL & REST', label: 'APIs Escaláveis', detail: 'Schemas declarativos, Queries & Mutations' },
  { value: 'PostgreSQL', label: 'Modelagem Relacional', detail: 'Transações ACID, Índices & Otimização' },
];

export const TECH_STACK: TechItem[] = [
  {
    id: 'csharp-dotnet',
    name: 'C# & .NET Platform',
    category: 'backend',
    categoryLabel: 'Backend Principal',
    summary: 'Linguagem multiparadigma de tipagem forte compilada para Common Intermediate Language (CIL).',
    description:
      'Desenvolvimento de aplicações e APIs de alta vazão utilizando .NET 8 e C# 12. Foco em arquitetura limpa (Clean Architecture), injeção de dependência nativa, Entity Framework Core com migrations automáticas, LINQ de alta performance e microsserviços desacoplados.',
    highlights: ['ASP.NET Core & Minimal APIs', 'Entity Framework Core (EF Core)', 'Injeção de Dependência (DI)', 'LINQ & Async/Await Pattern', 'Compilação CIL & CLR Runtime'],
    icon: 'Cpu',
    badge: 'Core Backend',
    codeSnippet: `// .NET 8 Minimal API com Injeção de Dependência
var builder = WebApplication.CreateBuilder(args);

// Registro de Serviços de Domínio e Repositórios
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddDbContext<AppDbContext>(opts =>
    opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.MapGet("/api/orders/{id:guid}", async (Guid id, IOrderService service) => {
    var order = await service.GetOrderByIdAsync(id);
    return order is not null ? Results.Ok(order) : Results.NotFound();
});

app.Run();`,
    codeLanguage: 'csharp',
  },
  {
    id: 'graphql-api',
    name: 'GraphQL API',
    category: 'backend',
    categoryLabel: 'APIs & Schemas',
    summary: 'Linguagem declarativa de consulta a APIs substituindo endpoints REST fixos por schemas estritos.',
    description:
      'Construção de APIs eficientes onde o cliente requisita exatamente os campos necessários, eliminando problemas de over-fetching e under-fetching. Implementação de resolvers assíncronos, queries, mutations, subscriptions e tipagem forte em tempo de compilação.',
    highlights: ['Schemas Tipados & Resolvers', 'Prevenção de Over/Under-fetching', 'Queries e Mutations Complexas', 'Sub-queries Aninhadas Eficientes', 'Hot Chocolate / GraphQL .NET'],
    icon: 'Network',
    badge: 'API Standard',
    codeSnippet: `// Schema Declarativo GraphQL
type Query {
  order(id: ID!): Order
  customerOrders(customerId: ID!, limit: Int = 10): [Order!]!
}

type Mutation {
  createOrder(input: CreateOrderInput!): OrderPayload!
  cancelOrder(id: ID!, reason: String): Boolean!
}

type Order {
  id: ID!
  createdAt: DateTime!
  totalAmount: Decimal!
  status: OrderStatus!
  items: [OrderItem!]!
}`,
    codeLanguage: 'graphql',
  },
  {
    id: 'sql-relational',
    name: 'PostgreSQL & SQL Relacional',
    category: 'database',
    categoryLabel: 'Bancos de Dados',
    summary: 'Base de dados relacional com integridade referencial rígida, transações ACID e consultas otimizadas.',
    description:
      'Estruturação de esquemas relacionais normalizados, garantia de conformidade ACID, chaves primárias e estrangeiras, índices B-Tree e GIN, particionamento de tabelas e análise de planos de execução com EXPLAIN ANALYZE para eliminar table scans desnecessários.',
    highlights: ['Integridade Referencial & Chaves', 'Transações Concorrentes ACID', 'Índices B-Tree, Hash e Parciais', 'Otimização com EXPLAIN ANALYZE', 'Procedures, Views & Triggers'],
    icon: 'Database',
    badge: 'Data Core',
    codeSnippet: `-- Consulta Otimizada com Índices e Agregação
SELECT 
    c.id AS customer_id,
    c.name AS customer_name,
    COUNT(o.id) AS total_orders,
    COALESCE(SUM(o.amount), 0.00) AS total_revenue
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id 
    AND o.status = 'COMPLETED'
    AND o.created_at >= NOW() - INTERVAL '30 days'
WHERE c.is_active = TRUE
GROUP BY c.id, c.name
ORDER BY total_revenue DESC
LIMIT 50;`,
    codeLanguage: 'sql',
  },
  {
    id: 'dbeaver-tooling',
    name: 'DBeaver & Database Ecosystem',
    category: 'tools',
    categoryLabel: 'Ferramentas de Dados',
    summary: 'Administração multi-engine para PostgreSQL, SQL Server, MySQL, SQLite e Oracle.',
    description:
      'Utilização avançada de ferramentas como DBeaver para gerenciamento de instâncias de banco de dados, inspeção de catálogos de metadados, visualização gráfica de diagramas ER (Entity-Relationship), execução de scripts de migração e monitoramento de sessões ativas.',
    highlights: ['Diagramas Entidade-Relacionamento (ER)', 'Visualização de Planos de Execução', 'Migração e Carga de Dados', 'Gestão de Múltiplos Motores SQL', 'Monitoramento de Conexões'],
    icon: 'Layers',
    badge: 'Database Admin',
  },
  {
    id: 'js-node',
    name: 'JavaScript / Node.js & TypeScript',
    category: 'backend',
    categoryLabel: 'Backend & Integração',
    summary: 'Linguagem interpretada com event-loop assíncrono e tipagem estática moderna via TypeScript.',
    description:
      'Desenvolvimento de automações, microsserviços utilitários e integração entre backend e frontend. Utilização de programação assíncrona baseada em Promises e async/await, tipagem rígida com interfaces e integração com ecossistema npm.',
    highlights: ['TypeScript Estrito & Tipagem', 'Event Loop Assíncrono', 'APIs com Express & Node.js', 'Manipulação de Streams & Buffers', 'Integração de Webhooks'],
    icon: 'FileCode2',
    badge: 'Full Runtime',
  },
  {
    id: 'unity-engine',
    name: 'Unity Engine & C# Scripting',
    category: 'tools',
    categoryLabel: 'Engines & Game Dev',
    summary: 'Motor multiplataforma para experiências 2D e 3D ricas com arquitetura baseada em componentes.',
    description:
      'Criação de lógicas interativas, sistemas de estados e simulações utilizando C# no ambiente Unity. Aplicação de padrões como Game Loop, State Machine, Observer pattern e otimização de garbage collection para manter 60+ FPS estáveis.',
    highlights: ['Arquitetura Orientada a Componentes', 'C# Scripting Avançado', 'State Machines & Game Loop', 'Física 2D/3D & Colisões', 'Otimização de Memória & GC'],
    icon: 'Gamepad2',
    badge: 'Interactive & 3D',
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'presentation',
    name: 'Camada de Apresentação',
    englishName: 'Presentation Layer',
    color: '#38bdf8',
    folders: ['Controllers/', 'Endpoints/', 'ViewModels/', 'Middlewares/'],
    responsibilities: [
      'Receber requisições HTTP e validar contratos de entrada (DTOs)',
      'Configurar roteamento de endpoints e políticas de CORS',
      'Interceptação global de erros com ProblemDetails RFC 7807',
      'Traduzir exceções de domínio em status codes apropriados (400, 404, 422)',
    ],
    description:
      'Ponto de entrada da aplicação. Não contém regras de negócio; apenas orquestra o fluxo delegando chamadas para a Application Layer e retornando respostas estruturadas ao cliente.',
    sampleFilename: 'OrdersController.cs',
    sampleCode: `[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOrderRequest request, CancellationToken ct)
    {
        var result = await _orderService.CreateOrderAsync(request.ToDto(), ct);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }
}`,
  },
  {
    id: 'application',
    name: 'Camada de Aplicação',
    englishName: 'Application Layer',
    color: '#818cf8',
    folders: ['Interfaces/', 'Services/', 'DTOs/', 'UseCases/', 'Validators/'],
    responsibilities: [
      'Orquestrar o fluxo de casos de uso do sistema',
      'Mapeamento entre DTOs e entidades de domínio',
      'Validação de fluxo de regras de aplicação (FluentValidation)',
      'Definição de interfaces de repositórios e serviços externos',
    ],
    description:
      'Coordena as tarefas e delega o trabalho às entidades de domínio. É independente de bibliotecas de terceiros ou tecnologia de banco de dados.',
    sampleFilename: 'OrderService.cs',
    sampleCode: `public class OrderService : IOrderService
{
    private readonly IOrderRepository _repository;
    private readonly IPaymentGateway _paymentGateway;

    public OrderService(IOrderRepository repository, IPaymentGateway paymentGateway)
    {
        _repository = repository;
        _paymentGateway = paymentGateway;
    }

    public async Task<OrderResponseDto> CreateOrderAsync(OrderCreateDto dto, CancellationToken ct)
    {
        var order = new Order(dto.CustomerId, dto.Items);
        order.CalculateTotals();

        await _repository.AddAsync(order, ct);
        await _paymentGateway.ProcessPaymentAsync(order.Id, order.Total, ct);
        
        return order.ToResponseDto();
    }
}`,
  },
  {
    id: 'domain',
    name: 'Camada de Domínio',
    englishName: 'Domain Layer',
    color: '#c084fc',
    folders: ['Entities/', 'ValueObjects/', 'Enums/', 'DomainEvents/', 'Exceptions/'],
    responsibilities: [
      'Encapsular as regras de negócio essenciais e invariantes',
      'Entidades com identificador único e métodos comportamentais',
      'Value Objects imutáveis para garantir consistência lógica',
      'Total desacoplamento de frameworks e tecnologia externa',
    ],
    description:
      'O coração do sistema. Contém a lógica de negócio pura, sem dependência de bancos, APIs ou UI. Se a infraestrutura mudar, o domínio permanece 100% intacto.',
    sampleFilename: 'Order.cs',
    sampleCode: `public class Order : Entity
{
    public Guid CustomerId { get; private set; }
    public OrderStatus Status { get; private set; }
    public decimal TotalAmount { get; private set; }
    private readonly List<OrderItem> _items = new();
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();

    public Order(Guid customerId, IEnumerable<OrderItem> items)
    {
        if (customerId == Guid.Empty)
            throw new DomainException("Cliente inválido.");

        CustomerId = customerId;
        _items.AddRange(items);
        Status = OrderStatus.Created;
    }

    public void MarkAsPaid()
    {
        if (Status != OrderStatus.Created)
            throw new DomainException("Pedido não pode ser pago no estado atual.");
        Status = OrderStatus.Paid;
    }
}`,
  },
  {
    id: 'infrastructure',
    name: 'Camada de Infraestrutura',
    englishName: 'Infrastructure Layer',
    color: '#34d399',
    folders: ['Data/', 'Context/', 'Repositories/', 'Mappings/', 'Migrations/'],
    responsibilities: [
      'Implementar as interfaces de repositório definidas em Application',
      'Configurar o Entity Framework Core DbContext e Fluent API mappings',
      'Comunicação real com o banco de dados (PostgreSQL, SQL Server)',
      'Integrações com serviços em nuvem, filas e gateways de pagamento',
    ],
    description:
      'Lida com detalhes técnicos e operacionais de I/O. Implementa o padrão Repository e Unit of Work para isolar o resto da aplicação dos detalhes do banco de dados.',
    sampleFilename: 'OrderRepository.cs',
    sampleCode: `public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _context;

    public OrderRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Order?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        return await _context.Orders
            .Include(o => o.Items)
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == id, ct);
    }

    public async Task AddAsync(Order order, CancellationToken ct = default)
    {
        await _context.Orders.AddAsync(order, ct);
        await _context.SaveChangesAsync(ct);
    }
}`,
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'clean-arch-starter',
    title: 'Clean Architecture .NET Starter',
    description:
      'Template base estruturado para desenvolvimento de APIs empresariais em .NET 8 com Clean Architecture, Entity Framework Core, PostgreSQL e injeção de dependência nativa.',
    role: 'Arquiteto & Desenvolvedor',
    techs: ['C#', '.NET 8', 'PostgreSQL', 'EF Core', 'Docker', 'Clean Architecture'],
    githubUrl: 'https://github.com/JBProgrammer-8',
    featured: true,
    architectureDetails: [
      'Separação estrita em 4 camadas (Presentation, Application, Domain, Infrastructure)',
      'Configuração pronta para migrations automáticas com PostgreSQL',
      'Padrão Repository & Unit of Work desacoplados',
      'Suporte a Docker Compose para ambiente local de desenvolvimento',
    ],
  },
  {
    id: 'mercadolivre-integration',
    title: 'MercadoLivre Integration Service',
    description:
      'Módulo de integração com APIs do ecossistema de marketplace, com autenticação OAuth2, paginação de catálogos, sincronização assíncrona de pedidos e tratamento resiliente de erros.',
    role: 'Engenheiro de Integração',
    techs: ['C#', 'ASP.NET Core', 'REST API', 'JSON Serialization', 'Polly (Resilience)'],
    githubUrl: 'https://github.com/JBProgrammer-8/MercadoLivre',
    featured: true,
    architectureDetails: [
      'Tratamento automático de rate limiting e políticas de retry com Polly',
      'Mapeamento de payloads complexos em DTOs fortemente tipados',
      'Logs estruturados para auditoria de requisições de ponta a ponta',
    ],
  },
  {
    id: 'tasks-wall',
    title: 'Tasks Wall — Gestor de Fluxo',
    description:
      'Sistema para gestão visual de tarefas e quadros de produtividade com controle de prioridades, persistência de dados e histórico de modificações.',
    role: 'Desenvolvedor Full Stack',
    techs: ['JavaScript', 'HTML5', 'CSS3', 'Local Persistence', 'Responsive UI'],
    githubUrl: 'https://github.com/JBProgrammer-8',
    featured: false,
    architectureDetails: [
      'Arquitetura reativa baseada em eventos no frontend',
      'Estrutura modular para inclusão de novos provedores de persistência',
      'Interface adaptativa para mobile e desktop',
    ],
  },
  {
    id: 'portfolio-modern',
    title: 'JB Programmer Modern Portfolio',
    description:
      'Portfólio interativo construído para demonstrar arquitetura de software, stack técnica e mentalidade profissional com interface de alta responsividade.',
    role: 'Autor & Desenvolvedor',
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite'],
    githubUrl: 'https://github.com/JBProgrammer-8/Page',
    demoUrl: 'https://jbprogrammer-8.github.io/Page/',
    featured: true,
    architectureDetails: [
      'Design System baseado em Tailwind CSS v4 e paleta slate/sky de alto contraste',
      'Terminal interativo com inspeção de código e alternância de arquivos',
      'Formulário inteligente com geração dinâmica de links para WhatsApp e cópia de e-mail',
    ],
  },
];

export const MINDSET_PILLARS = [
  {
    title: 'Protagonismo & Proatividade',
    description:
      'Profissionais protagonistas não esperam instruções óbvias: antecipam riscos de gargalo em banco de dados, propõem melhorias na arquitetura e lideram pelo exemplo e entrega consistente.',
    icon: 'Compass',
  },
  {
    title: 'Comunicação Clara & Alinhamento',
    description:
      'Em engenharia de software, código excelente com comunicação falha gera retrabalho. Clareza em documentação de APIs, clareza com o cliente e transparência de status são pilares inegociáveis.',
    icon: 'MessageSquareShare',
  },
  {
    title: 'Resiliência & Evolução Técnica',
    description:
      'Sistemas complexos inevitavelmente enfrentam falhas e picos imprevistos. A resiliência está em desenhar fallbacks seguros, tratar exceções com elegância e aprender continuamente.',
    icon: 'ShieldCheck',
  },
];
