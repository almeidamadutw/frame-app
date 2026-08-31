"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MoreHorizontal,
  PanelLeftClose,
  PenLine,
  Plus,
  Search,
  Settings2,
  Sparkles,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ClientsView, ModuleRoadmapView, PipelineView } from "./studio-views";

type NavItem = {
  label: string;
  icon: typeof LayoutDashboard;
  count?: string;
  soon?: boolean;
};

type Client = {
  initials: string;
  name: string;
  brand: string;
  service: string;
  progress: number;
  status: string;
  tone: "coral" | "sage" | "blue" | "gold";
  next: string;
};

const mainNavigation: NavItem[] = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Clientes", icon: UsersRound, count: "04" },
  { label: "Pipeline", icon: BarChart3, count: "07" },
  { label: "Produção", icon: PenLine, count: "12" },
  { label: "Calendário", icon: CalendarDays },
];

const workspaceNavigation: NavItem[] = [
  { label: "Arquivos", icon: FolderOpen, soon: true },
  { label: "Financeiro", icon: WalletCards, soon: true },
  { label: "Relatórios", icon: BarChart3, soon: true },
];

const clients: Client[] = [
  {
    initials: "CO",
    name: "Casal Odonto",
    brand: "Saúde & odontologia",
    service: "Social media mensal",
    progress: 82,
    status: "Em produção",
    tone: "coral",
    next: "Carrossel para revisar hoje",
  },
  {
    initials: "PA",
    name: "Petra Eternum",
    brand: "Memória & afeto",
    service: "Branding + conteúdo",
    progress: 58,
    status: "Aguardando briefing",
    tone: "sage",
    next: "Briefing vence amanhã",
  },
  {
    initials: "MM",
    name: "MMU App",
    brand: "Tecnologia",
    service: "Posicionamento digital",
    progress: 34,
    status: "Onboarding",
    tone: "blue",
    next: "Reunião de alinhamento · 02 set",
  },
  {
    initials: "DR",
    name: "Dra. Luciana Rocha",
    brand: "Educação & liderança",
    service: "Conteúdo estratégico",
    progress: 71,
    status: "Aprovando",
    tone: "gold",
    next: "3 peças aguardam retorno",
  },
];

const attentionItems = [
  {
    icon: CheckCircle2,
    tag: "Aprovação",
    title: "Carrossel: 5 erros que afastam pacientes",
    client: "Casal Odonto",
    deadline: "vence hoje, 14:00",
    tone: "coral",
  },
  {
    icon: FileText,
    tag: "Proposta",
    title: "Enviar proposta de branding",
    client: "Marina Alves · novo lead",
    deadline: "follow-up hoje",
    tone: "blue",
  },
  {
    icon: CircleAlert,
    tag: "Briefing",
    title: "Aguardando referências visuais",
    client: "Petra Eternum",
    deadline: "há 2 dias",
    tone: "gold",
  },
];

const pipelineStages = [
  { label: "Novos leads", value: 4, color: "bg-[#b9c8d8]", width: "w-[48%]" },
  { label: "Reuniões", value: 2, color: "bg-[#9cab9a]", width: "w-[34%]" },
  { label: "Propostas", value: 3, color: "bg-[#d9b36c]", width: "w-[56%]" },
  { label: "Negociação", value: 1, color: "bg-[#e28b69]", width: "w-[22%]" },
];

const agenda = [
  { time: "10:00", title: "Alinhamento de conteúdo", client: "Dra. Luciana Rocha", tone: "gold" },
  { time: "14:00", title: "Revisão de carrossel", client: "Casal Odonto", tone: "coral" },
  { time: "16:30", title: "Apresentação de proposta", client: "Marina Alves", tone: "blue" },
];

const toneClasses = {
  coral: {
    avatar: "bg-[#f5c8b6] text-[#84452f]",
    dot: "bg-[#e28b69]",
    soft: "bg-[#fff1eb] text-[#9b4f35]",
  },
  sage: {
    avatar: "bg-[#c9d4c6] text-[#425641]",
    dot: "bg-[#8fa48c]",
    soft: "bg-[#eef4ec] text-[#557053]",
  },
  blue: {
    avatar: "bg-[#c5d5e4] text-[#3e5d79]",
    dot: "bg-[#8ca8c1]",
    soft: "bg-[#edf3f8] text-[#52718d]",
  },
  gold: {
    avatar: "bg-[#ebd7a4] text-[#796029]",
    dot: "bg-[#d9b36c]",
    soft: "bg-[#fbf5e5] text-[#8a6d2e]",
  },
};

export default function Home() {
  const [activeItem, setActiveItem] = useState("Visão geral");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const filteredClients = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return clients;
    return clients.filter((client) =>
      [client.name, client.brand, client.service].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [searchQuery]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  }

  function selectNavigation(label: string, soon?: boolean) {
    setActiveItem(label);
    setMobileNavOpen(false);
    if (soon) showToast(`${label} entra na próxima etapa do MVP.`);
    else if (label !== "Visão geral") showToast(`${label} selecionado para acompanhamento.`);
  }

  return (
    <div className="studio-shell min-h-screen bg-[#f5f3ee] text-[#24252a]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col border-r border-[#e5e1d9] bg-[#fbfaf7] px-5 py-5 transition-transform duration-300 lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navegação principal"
      >
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="brand-mark flex size-10 items-center justify-center rounded-[14px] bg-[#24252a] text-lg font-bold text-[#f8f5ed]">A</div>
            <div>
              <p className="text-[12px] font-black tracking-[0.23em] text-[#24252a]">ABOVEFRAME</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a19d95]">Studio · 01</p>
            </div>
          </div>
          <button type="button" className="rounded-lg p-2 text-[#8c8881] transition hover:bg-[#f0ede6] hover:text-[#24252a] lg:hidden" aria-label="Fechar menu" onClick={() => setMobileNavOpen(false)}><X className="size-5" /></button>
        </div>

        <button type="button" className="mt-10 flex w-full items-center gap-3 rounded-2xl border border-[#e7e2d9] bg-white px-3 py-3 text-left shadow-[0_4px_14px_rgba(48,42,32,0.03)] transition hover:border-[#d8d0c4]" onClick={() => showToast("Workspace Aboveframe ativo.")}>
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#f3e9df] text-xs font-black text-[#9b5c43]">AF</div>
          <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-[#24252a]">Aboveframe Comunicação</p><p className="mt-0.5 text-[11px] text-[#9b978f]">Workspace principal</p></div>
          <ChevronDown className="size-4 text-[#9b978f]" />
        </button>

        <nav className="mt-9 flex-1 overflow-y-auto">
          <NavGroup title="Operação" items={mainNavigation} activeItem={activeItem} onSelect={selectNavigation} />
          <NavGroup title="Workspace" items={workspaceNavigation} activeItem={activeItem} onSelect={selectNavigation} />
        </nav>

        <div className="rounded-2xl border border-[#e9d8c9] bg-[#fff4ec] p-4">
          <div className="flex items-start justify-between gap-3"><div className="flex size-8 items-center justify-center rounded-xl bg-[#f1d2c2] text-[#9b4f35]"><Sparkles className="size-4" /></div><Badge className="border-0 bg-[#f4dfd2] px-2 py-1 text-[10px] font-bold text-[#9b4f35]">MVP 01</Badge></div>
          <p className="mt-4 text-sm font-bold text-[#5f382d]">A operação está tomando forma.</p>
          <p className="mt-1 text-xs leading-5 text-[#9a6a55]">A base comercial está pronta para receber clientes reais.</p>
          <div className="mt-4 flex items-center gap-2"><Progress value={36} className="h-1.5 bg-[#f1d2c2] [&>div]:bg-[#df8865]" /><span className="text-[11px] font-black text-[#9b4f35]">36%</span></div>
        </div>

        <div className="mt-5 flex items-center justify-between px-2 text-xs text-[#98938b]">
          <button type="button" className="flex items-center gap-2 transition hover:text-[#24252a]" onClick={() => showToast("Configurações em breve.")}><Settings2 className="size-4" />Configurações</button>
          <button type="button" className="rounded-lg p-1 transition hover:bg-[#f0ede6] hover:text-[#24252a]" aria-label="Recolher menu" onClick={() => showToast("No desktop, o menu permanece aberto para agilizar a operação.")}><PanelLeftClose className="size-4" /></button>
        </div>
      </aside>

      {mobileNavOpen && <button type="button" className="fixed inset-0 z-30 bg-[#24252a]/20 backdrop-blur-sm lg:hidden" aria-label="Fechar menu" onClick={() => setMobileNavOpen(false)} />}

      <main className="min-h-screen lg:pl-[270px]">
        <header className="sticky top-0 z-20 border-b border-[#e8e4dc]/80 bg-[#f5f3ee]/90 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
            <div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="text-[#65635e] hover:bg-[#ebe7df] lg:hidden" aria-label="Abrir menu" onClick={() => setMobileNavOpen(true)}><Menu /></Button><div className="hidden h-8 w-px bg-[#ded9d0] sm:block" /><p className="hidden text-xs font-bold uppercase tracking-[0.2em] text-[#9b978f] sm:block">Workspace / {activeItem}</p><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b978f] sm:hidden">Above Studio</p></div>

            <div className="flex items-center gap-2 sm:gap-3">
              <label className="hidden items-center gap-2 rounded-xl border border-[#e4dfd6] bg-white/70 px-3 py-2.5 text-[#9b978f] transition focus-within:border-[#c6b9a8] focus-within:bg-white md:flex"><Search className="size-4" /><span className="sr-only">Buscar clientes</span><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="w-40 bg-transparent text-xs font-medium text-[#24252a] outline-none placeholder:text-[#aaa49a]" placeholder="Buscar no Studio" /><kbd className="rounded-md border border-[#e7e1d8] bg-[#f9f7f2] px-1.5 py-0.5 text-[10px] font-bold text-[#aaa49a]">⌘ K</kbd></label>
              <button type="button" className="relative flex size-10 items-center justify-center rounded-xl border border-[#e4dfd6] bg-white/70 text-[#77736b] transition hover:border-[#cfc6b9] hover:bg-white" aria-label="Notificações" aria-expanded={notificationOpen} onClick={() => setNotificationOpen((open) => !open)}><Bell className="size-[18px]" /><span className="absolute right-2.5 top-2 size-1.5 rounded-full bg-[#e28b69] ring-2 ring-[#f5f3ee]" /></button>
              <Avatar size="default" className="size-10 border-2 border-white bg-[#24252a] shadow-sm"><AvatarFallback className="bg-[#24252a] text-xs font-black text-[#f8f5ed]">MT</AvatarFallback></Avatar>
            </div>

            {notificationOpen && <div className="absolute right-5 top-[68px] w-[min(330px,calc(100vw-40px))] rounded-2xl border border-[#e5e0d7] bg-white p-4 shadow-[0_20px_60px_rgba(43,36,27,0.14)] sm:right-8 lg:right-10"><div className="flex items-center justify-between"><p className="text-sm font-black text-[#24252a]">Notificações</p><button type="button" className="text-[11px] font-bold text-[#a09a91] hover:text-[#24252a]" onClick={() => setNotificationOpen(false)}>Fechar</button></div><div className="mt-4 flex gap-3 rounded-xl bg-[#fff4ec] p-3"><div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#f1d2c2] text-[#9b4f35]"><Check className="size-4" /></div><div><p className="text-xs font-bold text-[#5f382d]">Uma aprovação vence hoje</p><p className="mt-1 text-[11px] leading-4 text-[#9a6a55]">Casal Odonto · carrossel de conteúdo</p></div></div></div>}
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] space-y-6 px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          {activeItem === "Visão geral" ? (
            <>
          <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#b06b50]">Segunda-feira, 31 de agosto de 2026</p><h1 className="display-serif mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.045em] text-[#24252a]">Bom dia, Matteo.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#77736b] sm:text-[15px]">Aqui está o que está em movimento na Aboveframe — e o que merece sua atenção primeiro.</p></div><div className="flex flex-wrap gap-2"><Button variant="outline" className="h-10 rounded-xl border-[#ded8cf] bg-transparent px-4 text-xs font-bold text-[#5f5d58] shadow-none hover:bg-white" onClick={() => showToast("Filtro de período: este mês.")}>Este mês <ChevronDown className="size-3.5" /></Button><Button className="h-10 rounded-xl bg-[#24252a] px-4 text-xs font-bold text-[#f8f5ed] shadow-[0_8px_16px_rgba(36,37,42,0.16)] hover:bg-[#3a3b40]" onClick={() => showToast("Nova proposta iniciada. O próximo passo é escolher o cliente.")}><Plus className="size-4" />Nova proposta</Button></div></section>

          <section className="overflow-hidden rounded-[28px] bg-[#24252a] text-[#f8f5ed] shadow-[0_20px_50px_rgba(42,37,29,0.12)]"><div className="relative grid gap-8 px-6 py-7 sm:px-8 sm:py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-9"><div className="relative z-10"><div className="flex items-center gap-2 text-[#dba98e]"><Sparkles className="size-4" /><span className="text-[10px] font-black uppercase tracking-[0.22em]">Ritmo do Studio</span></div><h2 className="display-serif mt-5 max-w-xl text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.06] tracking-[-0.04em]">Sua operação está em movimento.</h2><p className="mt-4 max-w-lg text-sm leading-6 text-[#b9b7b0]">Quatro clientes ativos, três propostas em negociação e uma fila de conteúdos pedindo seu olhar.</p><div className="mt-7 flex flex-wrap gap-3"><Button className="h-10 rounded-xl bg-[#f8f5ed] px-4 text-xs font-black text-[#24252a] hover:bg-white" onClick={() => selectNavigation("Produção")}>Ver produção <ArrowRight className="size-4" /></Button><button type="button" className="flex h-10 items-center gap-2 rounded-xl px-3 text-xs font-bold text-[#d2d0ca] transition hover:bg-white/10 hover:text-white" onClick={() => showToast("Resumo mensal preparado para revisão.")}>Resumo mensal <ArrowUpRight className="size-3.5" /></button></div></div><div className="relative z-10 grid grid-cols-2 gap-3 self-end sm:grid-cols-4 lg:grid-cols-2"><HeroStat label="Projetos ativos" value="04" detail="todos com próximo passo" /><HeroStat label="Aprovações" value="03" detail="aguardando cliente" /><HeroStat label="Receita recorrente" value="R$ 18,4k" detail="prevista no mês" /><HeroStat label="Entregas no prazo" value="96%" detail="últimos 30 dias" /></div><div className="pointer-events-none absolute -right-28 -top-32 size-[360px] rounded-full border border-white/10 sm:-right-10 sm:-top-48 sm:size-[520px]" /><div className="pointer-events-none absolute bottom-[-220px] left-1/3 size-[420px] rounded-full border border-[#e28b69]/20" /></div></section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Clientes ativos" value="04" trend="+1 este mês" icon={UsersRound} tone="coral" /><MetricCard label="Em produção" value="12" trend="08 para esta semana" icon={PenLine} tone="sage" /><MetricCard label="Propostas abertas" value="07" trend="R$ 9.850 em potencial" icon={FileText} tone="blue" /><MetricCard label="Aguardando você" value="05" trend="02 vencem hoje" icon={Clock3} tone="gold" /></section>

          <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]"><div className="rounded-[24px] border border-[#e6e1d9] bg-white p-5 shadow-[0_8px_30px_rgba(65,56,42,0.04)] sm:p-6"><SectionHeader eyebrow="Fila de trabalho" title="O que pede sua atenção" action="Ver tudo" onAction={() => selectNavigation("Produção")} /><div className="mt-5 divide-y divide-[#efebe4]">{attentionItems.map((item) => { const Icon = item.icon; const tone = toneClasses[item.tone as keyof typeof toneClasses]; return <button key={item.title} type="button" className="group flex w-full items-center gap-3 py-4 text-left first:pt-0 last:pb-0" onClick={() => showToast(`${item.title} aberto para revisão.`)}><div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${tone.soft}`}><Icon className="size-[18px]" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#9a958b]">{item.tag}</span><span className={`size-1.5 rounded-full ${tone.dot}`} /><span className="text-[11px] font-semibold text-[#9a958b]">{item.deadline}</span></div><p className="mt-1 truncate text-sm font-bold text-[#313136] transition group-hover:text-[#a85e42]">{item.title}</p><p className="mt-1 truncate text-xs text-[#928e86]">{item.client}</p></div><ArrowUpRight className="size-4 shrink-0 text-[#c2bdb4] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#a85e42]" /></button>; })}</div></div><div className="rounded-[24px] border border-[#e6e1d9] bg-white p-5 shadow-[0_8px_30px_rgba(65,56,42,0.04)] sm:p-6"><SectionHeader eyebrow="Comercial" title="Funil em movimento" action="Abrir pipeline" onAction={() => selectNavigation("Pipeline")} /><div className="mt-6 space-y-4">{pipelineStages.map((stage) => <div key={stage.label}><div className="flex items-center justify-between gap-3 text-xs"><span className="font-semibold text-[#77736b]">{stage.label}</span><span className="font-black text-[#313136]">{stage.value}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[#f1eee8]"><div className={`h-full rounded-full ${stage.color} ${stage.width}`} /></div></div>)}</div><div className="mt-6 flex items-center justify-between rounded-2xl bg-[#f8f6f1] p-4"><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a19c93]">Conversão atual</p><p className="mt-1 text-xl font-black text-[#313136]">28,6%</p></div><div className="flex items-center gap-1.5 rounded-full bg-[#eef4ec] px-2.5 py-1.5 text-[11px] font-black text-[#557053]"><ArrowUpRight className="size-3" />8,4%</div></div></div></section>

          <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]"><div className="rounded-[24px] border border-[#e6e1d9] bg-white p-5 shadow-[0_8px_30px_rgba(65,56,42,0.04)] sm:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><SectionHeader eyebrow="Carteira" title="Clientes em movimento" /><button type="button" className="flex items-center gap-2 self-start rounded-lg px-2 py-1 text-xs font-bold text-[#a85e42] transition hover:bg-[#fff1eb]" onClick={() => selectNavigation("Clientes")}>Ver clientes <ArrowRight className="size-3.5" /></button></div><div className="mt-5 overflow-x-auto"><div className="min-w-[620px]"><div className="grid grid-cols-[1.25fr_1fr_0.7fr_0.95fr] gap-4 border-b border-[#efebe4] px-2 pb-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#aaa59c]"><span>Cliente</span><span>Serviço atual</span><span>Progresso</span><span>Próximo passo</span></div><div className="divide-y divide-[#efebe4]">{filteredClients.map((client) => { const tone = toneClasses[client.tone]; return <button key={client.name} type="button" className="grid w-full grid-cols-[1.25fr_1fr_0.7fr_0.95fr] items-center gap-4 px-2 py-4 text-left transition hover:bg-[#fcfaf6]" onClick={() => showToast(`${client.name} selecionado.`)}><div className="flex min-w-0 items-center gap-3"><Avatar className={`size-9 shrink-0 ${tone.avatar}`}><AvatarFallback className={`text-[10px] font-black ${tone.avatar}`}>{client.initials}</AvatarFallback></Avatar><div className="min-w-0"><p className="truncate text-xs font-black text-[#313136]">{client.name}</p><p className="mt-0.5 truncate text-[11px] text-[#98938b]">{client.brand}</p></div></div><span className="truncate text-xs font-semibold text-[#77736b]">{client.service}</span><div className="flex items-center gap-2"><Progress value={client.progress} className="h-1.5 bg-[#eeeae3] [&>div]:bg-[#9cab9a]" /><span className="text-[10px] font-black text-[#77736b]">{client.progress}%</span></div><div className="min-w-0"><Badge className={`max-w-full truncate border-0 px-2 py-1 text-[10px] font-bold ${tone.soft}`}>{client.status}</Badge><p className="mt-1 truncate text-[10px] text-[#a19c93]">{client.next}</p></div></button>; })}</div>{filteredClients.length === 0 && <div className="py-10 text-center text-sm text-[#9a958b]">Nenhum cliente encontrado para “{searchQuery}”.</div>}</div></div></div><div className="rounded-[24px] border border-[#e6e1d9] bg-white p-5 shadow-[0_8px_30px_rgba(65,56,42,0.04)] sm:p-6"><SectionHeader eyebrow="Agenda" title="Hoje no Studio" action="Abrir agenda" onAction={() => selectNavigation("Calendário")} /><div className="mt-5 space-y-1">{agenda.map((item) => { const tone = toneClasses[item.tone as keyof typeof toneClasses]; return <div key={`${item.time}-${item.title}`} className="flex gap-3 rounded-2xl p-3 transition hover:bg-[#fcfaf6]"><div className="w-11 shrink-0 pt-0.5 text-[11px] font-black text-[#77736b]">{item.time}</div><div className={`mt-1.5 size-2 shrink-0 rounded-full ${tone.dot}`} /><div className="min-w-0"><p className="truncate text-xs font-black text-[#313136]">{item.title}</p><p className="mt-1 truncate text-[11px] text-[#9a958b]">{item.client}</p></div></div>; })}</div><div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#f8f6f1] p-3.5"><div className="flex size-8 items-center justify-center rounded-xl bg-[#e7e1d8] text-[#77736b]"><MessageCircle className="size-4" /></div><p className="text-[11px] leading-4 text-[#77736b]">Você tem <strong className="text-[#313136]">2 conversas</strong> esperando resposta.</p><ArrowRight className="ml-auto size-3.5 text-[#aaa59c]" /></div></div></section>
            </>
          ) : activeItem === "Clientes" ? (
            <ClientsView onNotify={showToast} />
          ) : activeItem === "Pipeline" ? (
            <PipelineView onNotify={showToast} />
          ) : (
            <ModuleRoadmapView module={activeItem} onNotify={showToast} />
          )}

          <footer className="flex flex-col justify-between gap-2 border-t border-[#e5e1d9] pt-5 text-[11px] text-[#aaa59c] sm:flex-row sm:items-center"><p>Above Studio · operação Aboveframe</p><p className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[#9cab9a]" />Sistema em fase de fundação</p></footer>
        </div>
      </main>

      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-[#24252a] px-4 py-3 text-xs font-bold text-[#f8f5ed] shadow-[0_16px_40px_rgba(36,37,42,0.24)]"><span className="flex size-5 items-center justify-center rounded-full bg-[#9cab9a] text-[#24252a]"><Check className="size-3.5" /></span>{toast}</div>}
    </div>
  );
}

function NavGroup({ title, items, activeItem, onSelect }: { title: string; items: NavItem[]; activeItem: string; onSelect: (label: string, soon?: boolean) => void }) {
  return <div className="mb-8"><p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#aaa59c]">{title}</p><div className="mt-2 space-y-1">{items.map((item) => { const Icon = item.icon; const active = activeItem === item.label; return <button key={item.label} type="button" className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${active ? "bg-[#24252a] text-[#f8f5ed] shadow-[0_8px_16px_rgba(36,37,42,0.12)]" : "text-[#807b73] hover:bg-[#f1eee7] hover:text-[#34343a]"}`} onClick={() => onSelect(item.label, item.soon)}><Icon className={`size-[17px] shrink-0 ${active ? "text-[#f1bda6]" : "text-[#aaa59c] group-hover:text-[#77736b]"}`} /><span className="flex-1 text-xs font-bold">{item.label}</span>{item.count && <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-black ${active ? "bg-white/10 text-[#d0cec7]" : "bg-[#eeebe4] text-[#aaa59c]"}`}>{item.count}</span>}{item.soon && <span className="text-[9px] font-black uppercase tracking-[0.08em] text-[#b8b2a8]">breve</span>}</button>; })}</div></div>;
}

function HeroStat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#aaa9a3]">{label}</p><p className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">{value}</p><p className="mt-1 text-[10px] font-medium text-[#8f8e89]">{detail}</p></div>;
}

function MetricCard({ label, value, trend, icon: Icon, tone }: { label: string; value: string; trend: string; icon: typeof UsersRound; tone: keyof typeof toneClasses }) {
  const toneStyles = toneClasses[tone];
  return <article className="rounded-[22px] border border-[#e6e1d9] bg-white p-5 shadow-[0_8px_30px_rgba(65,56,42,0.04)]"><div className="flex items-start justify-between gap-3"><div className={`flex size-9 items-center justify-center rounded-xl ${toneStyles.soft}`}><Icon className="size-[17px]" /></div><MoreHorizontal className="size-4 text-[#c3beb5]" /></div><p className="mt-5 text-xs font-bold text-[#89847c]">{label}</p><div className="mt-1 flex items-end justify-between gap-2"><p className="text-3xl font-black tracking-[-0.05em] text-[#313136]">{value}</p><p className="mb-1 text-[10px] font-bold text-[#9a958b]">{trend}</p></div></article>;
}

function SectionHeader({ eyebrow, title, action, onAction }: { eyebrow: string; title: string; action?: string; onAction?: () => void }) {
  return <div className="flex items-end justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b06b50]">{eyebrow}</p><h2 className="mt-2 text-lg font-black tracking-[-0.025em] text-[#313136]">{title}</h2></div>{action && <button type="button" className="flex shrink-0 items-center gap-1.5 text-[11px] font-black text-[#a85e42] transition hover:text-[#743d2d]" onClick={onAction}>{action}<ArrowRight className="size-3.5" /></button>}</div>;
}
