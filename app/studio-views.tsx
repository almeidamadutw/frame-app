"use client";

import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  Filter,
  FolderOpen,
  Grid2X2,
  History,
  LayoutList,
  Mail,
  MessageCircle,
  MoreHorizontal,
  MoveRight,
  Phone,
  Plus,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Notify = (message: string) => void;
type Tone = "coral" | "sage" | "blue" | "gold" | "ink";

const tones: Record<
  Tone,
  { avatar: string; dot: string; soft: string; border: string; progress: string }
> = {
  coral: {
    avatar: "bg-[#f5c8b6] text-[#84452f]",
    dot: "bg-[#e28b69]",
    soft: "bg-[#fff1eb] text-[#9b4f35]",
    border: "border-[#f0d0c2]",
    progress: "[&>div]:bg-[#e28b69]",
  },
  sage: {
    avatar: "bg-[#c9d4c6] text-[#425641]",
    dot: "bg-[#8fa48c]",
    soft: "bg-[#eef4ec] text-[#557053]",
    border: "border-[#d5dfd2]",
    progress: "[&>div]:bg-[#8fa48c]",
  },
  blue: {
    avatar: "bg-[#c5d5e4] text-[#3e5d79]",
    dot: "bg-[#8ca8c1]",
    soft: "bg-[#edf3f8] text-[#52718d]",
    border: "border-[#d3e0e9]",
    progress: "[&>div]:bg-[#8ca8c1]",
  },
  gold: {
    avatar: "bg-[#ebd7a4] text-[#796029]",
    dot: "bg-[#d9b36c]",
    soft: "bg-[#fbf5e5] text-[#8a6d2e]",
    border: "border-[#eadcb8]",
    progress: "[&>div]:bg-[#d9b36c]",
  },
  ink: {
    avatar: "bg-[#303137] text-[#f8f5ed]",
    dot: "bg-[#303137]",
    soft: "bg-[#eeece8] text-[#55565b]",
    border: "border-[#dedbd5]",
    progress: "[&>div]:bg-[#303137]",
  },
};

type ClientStatus = "Ativo" | "Onboarding" | "Aguardando" | "Pausado";

type ClientRecord = {
  id: number;
  initials: string;
  name: string;
  segment: string;
  service: string;
  status: ClientStatus;
  tone: Tone;
  progress: number;
  monthly: string;
  next: string;
  contact: string;
  email: string;
  phone: string;
  instagram: string;
  since: string;
  health: number;
  contents: number;
  approvals: number;
};

const initialClients: ClientRecord[] = [
  {
    id: 1,
    initials: "CO",
    name: "Casal Odonto",
    segment: "Saúde & odontologia",
    service: "Social media mensal",
    status: "Ativo",
    tone: "coral",
    progress: 82,
    monthly: "R$ 3.200",
    next: "Revisar carrossel hoje, 14h",
    contact: "Dra. Luciana Rocha",
    email: "contato@casalodonto.com.br",
    phone: "(15) 99712-2048",
    instagram: "@casalodonto",
    since: "Abril de 2026",
    health: 94,
    contents: 12,
    approvals: 2,
  },
  {
    id: 2,
    initials: "PA",
    name: "Petra Eternum",
    segment: "Memória & afeto",
    service: "Branding + conteúdo",
    status: "Aguardando",
    tone: "sage",
    progress: 58,
    monthly: "R$ 1.850",
    next: "Receber referências visuais",
    contact: "Enrico Alves",
    email: "contato@petraeternum.com",
    phone: "(15) 99841-7022",
    instagram: "@petraaeternum",
    since: "Agosto de 2026",
    health: 76,
    contents: 4,
    approvals: 0,
  },
  {
    id: 3,
    initials: "MM",
    name: "MMU App",
    segment: "Tecnologia",
    service: "Posicionamento digital",
    status: "Onboarding",
    tone: "blue",
    progress: 34,
    monthly: "R$ 2.100",
    next: "Reunião de alinhamento · 02 set",
    contact: "Lucas Martins",
    email: "lucas@mmu.app",
    phone: "(11) 98814-5301",
    instagram: "@mmu.app",
    since: "Agosto de 2026",
    health: 82,
    contents: 0,
    approvals: 0,
  },
  {
    id: 4,
    initials: "DL",
    name: "Dra. Luciana Rocha",
    segment: "Educação & liderança",
    service: "Conteúdo estratégico",
    status: "Ativo",
    tone: "gold",
    progress: 71,
    monthly: "R$ 2.750",
    next: "3 peças aguardam retorno",
    contact: "Luciana Rocha",
    email: "luciana@ceoclubmentoria.com.br",
    phone: "(15) 99108-4420",
    instagram: "@lucianarocha.dra",
    since: "Maio de 2026",
    health: 90,
    contents: 9,
    approvals: 3,
  },
  {
    id: 5,
    initials: "DM",
    name: "De Mendonza Odonto",
    segment: "Saúde & odontologia",
    service: "Vídeos de relacionamento",
    status: "Pausado",
    tone: "ink",
    progress: 100,
    monthly: "Projeto avulso",
    next: "Aguardar próxima campanha",
    contact: "Jemima Mendonza",
    email: "contato@demendonza.com.br",
    phone: "(15) 99603-8821",
    instagram: "@demendonzaodonto",
    since: "Julho de 2026",
    health: 88,
    contents: 3,
    approvals: 0,
  },
];

export function ClientsView({ onNotify }: { onNotify: Notify }) {
  const [clientRecords, setClientRecords] = useState(initialClients);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"Todos" | ClientStatus>("Todos");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);
  const [newClientOpen, setNewClientOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newService, setNewService] = useState("Social media mensal");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return clientRecords.filter((client) => {
      const matchesStatus = status === "Todos" || client.status === status;
      const matchesSearch =
        !query ||
        [client.name, client.segment, client.service, client.contact].some((value) =>
          value.toLowerCase().includes(query),
        );
      return matchesStatus && matchesSearch;
    });
  }, [clientRecords, search, status]);

  function createClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = newName.trim();
    if (!name) return;
    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
    const created: ClientRecord = {
      id: Date.now(),
      initials,
      name,
      segment: "Segmento a definir",
      service: newService,
      status: "Onboarding",
      tone: "blue",
      progress: 12,
      monthly: "A definir",
      next: "Enviar formulário de onboarding",
      contact: "Contato principal a definir",
      email: "E-mail pendente",
      phone: "Telefone pendente",
      instagram: "Instagram pendente",
      since: "Agosto de 2026",
      health: 70,
      contents: 0,
      approvals: 0,
    };
    setClientRecords((current) => [created, ...current]);
    setNewName("");
    setNewClientOpen(false);
    onNotify(`${name} foi adicionado ao onboarding.`);
  }

  const activeCount = clientRecords.filter((client) => client.status === "Ativo").length;
  const onboardingCount = clientRecords.filter((client) => client.status === "Onboarding").length;
  const approvals = clientRecords.reduce((total, client) => total + client.approvals, 0);

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Relacionamento"
        title="Clientes"
        description="Uma visão limpa de cada marca, contrato, entrega e próximo passo."
        actions={
          <>
            <Button
              variant="outline"
              className="h-10 rounded-xl border-[#ddd7ce] bg-transparent px-4 text-xs font-bold text-[#66625c] shadow-none hover:bg-white"
              onClick={() => onNotify("Importação de clientes preparada para a etapa de dados reais.")}
            >
              <Upload className="size-4" /> Importar
            </Button>
            <Button
              className="h-10 rounded-xl bg-[#24252a] px-4 text-xs font-bold text-[#f8f5ed] hover:bg-[#393a40]"
              onClick={() => setNewClientOpen(true)}
            >
              <Plus className="size-4" /> Novo cliente
            </Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={UsersRound} label="Clientes ativos" value={String(activeCount).padStart(2, "0")} detail="carteira em andamento" tone="coral" />
        <StatCard icon={Sparkles} label="Em onboarding" value={String(onboardingCount).padStart(2, "0")} detail="coleta inicial da marca" tone="blue" />
        <StatCard icon={CheckCircle2} label="Aprovações abertas" value={String(approvals).padStart(2, "0")} detail="aguardando retorno" tone="gold" />
        <StatCard icon={WalletCards} label="Receita da carteira" value="R$ 9,9k" detail="mensal + projetos" tone="sage" />
      </section>

      <section className="rounded-[24px] border border-[#e6e1d9] bg-white p-4 shadow-[0_8px_30px_rgba(65,56,42,0.04)] sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row">
            <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#e5e0d8] bg-[#faf8f4] px-3 text-[#98938b] sm:max-w-sm">
              <Search className="size-4 shrink-0" />
              <span className="sr-only">Buscar cliente</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-[#313136] outline-none placeholder:text-[#aaa59c]"
                placeholder="Buscar cliente, contato ou serviço"
              />
            </label>
            <Select value={status} onValueChange={(value) => setStatus(value as typeof status)}>
              <SelectTrigger className="h-10 w-full rounded-xl border-[#e5e0d8] bg-[#faf8f4] text-xs font-bold shadow-none sm:w-44">
                <Filter className="size-3.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#e5e0d8]">
                {(["Todos", "Ativo", "Onboarding", "Aguardando", "Pausado"] as const).map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between gap-3 lg:justify-end">
            <p className="text-[11px] font-semibold text-[#9a958d]">{filtered.length} de {clientRecords.length} clientes</p>
            <div className="flex rounded-xl border border-[#e5e0d8] bg-[#faf8f4] p-1">
              <button
                type="button"
                aria-label="Visualização em grade"
                className={`flex size-8 items-center justify-center rounded-lg transition ${view === "grid" ? "bg-white text-[#313136] shadow-sm" : "text-[#aaa59c]"}`}
                onClick={() => setView("grid")}
              >
                <Grid2X2 className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Visualização em lista"
                className={`flex size-8 items-center justify-center rounded-lg transition ${view === "list" ? "bg-white text-[#313136] shadow-sm" : "text-[#aaa59c]"}`}
                onClick={() => setView("list")}
              >
                <LayoutList className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {filtered.length > 0 ? (
        <section className={view === "grid" ? "grid gap-4 md:grid-cols-2 2xl:grid-cols-3" : "space-y-3"}>
          {filtered.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              compact={view === "list"}
              onOpen={() => setSelectedClient(client)}
            />
          ))}
        </section>
      ) : (
        <EmptyState icon={UsersRound} title="Nenhum cliente encontrado" description="Tente trocar o filtro ou buscar por outro termo." />
      )}

      <Dialog open={newClientOpen} onOpenChange={setNewClientOpen}>
        <DialogContent className="rounded-[24px] border-[#e2dcd3] bg-[#fbfaf7] p-0 sm:max-w-xl">
          <form onSubmit={createClient}>
            <DialogHeader className="border-b border-[#e9e4dc] px-6 py-5">
              <DialogTitle className="display-serif text-2xl font-medium tracking-[-0.03em] text-[#292a2f]">Adicionar cliente</DialogTitle>
              <DialogDescription className="text-xs leading-5 text-[#88837b]">Crie a base do workspace. Os detalhes de marca entram no onboarding.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-5 px-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="client-name" className="text-xs font-black text-[#55525c]">Nome da marca</Label>
                <Input id="client-name" value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Ex.: Clínica Aurora" className="h-11 rounded-xl border-[#ddd7ce] bg-white shadow-none" autoFocus />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black text-[#55525c]">Serviço principal</Label>
                <Select value={newService} onValueChange={setNewService}>
                  <SelectTrigger className="h-11 w-full rounded-xl border-[#ddd7ce] bg-white shadow-none"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Social media mensal">Social media mensal</SelectItem>
                    <SelectItem value="Branding completo">Branding completo</SelectItem>
                    <SelectItem value="Captação audiovisual">Captação audiovisual</SelectItem>
                    <SelectItem value="Posicionamento digital">Posicionamento digital</SelectItem>
                    <SelectItem value="Projeto personalizado">Projeto personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="client-contact" className="text-xs font-black text-[#55525c]">Contato principal</Label><Input id="client-contact" placeholder="Nome do responsável" className="h-11 rounded-xl border-[#ddd7ce] bg-white shadow-none" /></div>
                <div className="space-y-2"><Label htmlFor="client-email" className="text-xs font-black text-[#55525c]">E-mail</Label><Input id="client-email" type="email" placeholder="contato@marca.com" className="h-11 rounded-xl border-[#ddd7ce] bg-white shadow-none" /></div>
              </div>
            </div>
            <DialogFooter className="border-t border-[#e9e4dc] px-6 py-4">
              <Button type="button" variant="ghost" className="rounded-xl text-xs font-bold" onClick={() => setNewClientOpen(false)}>Cancelar</Button>
              <Button type="submit" className="rounded-xl bg-[#24252a] px-5 text-xs font-bold text-[#f8f5ed]">Criar workspace <ArrowRight className="size-4" /></Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(selectedClient)} onOpenChange={(open) => !open && setSelectedClient(null)}>
        <DialogContent showCloseButton={false} className="bottom-0 left-auto right-0 top-0 h-dvh w-full max-w-[540px] translate-x-0 translate-y-0 overflow-y-auto rounded-none border-y-0 border-r-0 border-[#ddd7ce] bg-[#fbfaf7] p-0 sm:max-w-[540px]">
          {selectedClient && <ClientDrawer client={selectedClient} onClose={() => setSelectedClient(null)} onNotify={onNotify} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ClientCard({ client, compact, onOpen }: { client: ClientRecord; compact: boolean; onOpen: () => void }) {
  const tone = tones[client.tone];

  if (compact) {
    return (
      <button type="button" onClick={onOpen} className="group grid w-full gap-4 rounded-[20px] border border-[#e6e1d9] bg-white p-4 text-left shadow-[0_8px_25px_rgba(65,56,42,0.035)] transition hover:-translate-y-0.5 hover:border-[#d7cfc4] sm:grid-cols-[1.3fr_1fr_0.8fr_1fr_auto] sm:items-center">
        <div className="flex min-w-0 items-center gap-3"><Avatar className={`size-10 ${tone.avatar}`}><AvatarFallback className={`text-[11px] font-black ${tone.avatar}`}>{client.initials}</AvatarFallback></Avatar><div className="min-w-0"><p className="truncate text-sm font-black text-[#303136]">{client.name}</p><p className="mt-0.5 truncate text-[11px] text-[#98938b]">{client.segment}</p></div></div>
        <p className="truncate text-xs font-semibold text-[#716e68]">{client.service}</p>
        <Badge className={`border-0 px-2 py-1 text-[10px] font-bold ${tone.soft}`}>{client.status}</Badge>
        <div className="flex items-center gap-2"><Progress value={client.progress} className={`h-1.5 bg-[#ede9e2] ${tone.progress}`} /><span className="text-[10px] font-black text-[#77736b]">{client.progress}%</span></div>
        <ChevronRight className="size-4 text-[#bbb5ac] transition group-hover:translate-x-0.5 group-hover:text-[#a85e42]" />
      </button>
    );
  }

  return (
    <button type="button" onClick={onOpen} className="group rounded-[24px] border border-[#e6e1d9] bg-white p-5 text-left shadow-[0_8px_30px_rgba(65,56,42,0.04)] transition hover:-translate-y-1 hover:border-[#d7cfc4] hover:shadow-[0_16px_38px_rgba(65,56,42,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3"><Avatar className={`size-11 ${tone.avatar}`}><AvatarFallback className={`text-xs font-black ${tone.avatar}`}>{client.initials}</AvatarFallback></Avatar><div className="min-w-0"><p className="truncate text-sm font-black text-[#303136]">{client.name}</p><p className="mt-1 truncate text-[11px] text-[#98938b]">{client.segment}</p></div></div>
        <MoreHorizontal className="size-4 text-[#bbb5ac]" />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3"><Badge className={`border-0 px-2.5 py-1 text-[10px] font-black ${tone.soft}`}>{client.status}</Badge><span className="text-[11px] font-black text-[#55555a]">{client.monthly}</span></div>
      <div className="mt-5"><div className="flex items-center justify-between text-[10px]"><span className="font-bold uppercase tracking-[0.12em] text-[#aaa59c]">Ciclo atual</span><span className="font-black text-[#77736b]">{client.progress}%</span></div><Progress value={client.progress} className={`mt-2 h-1.5 bg-[#ede9e2] ${tone.progress}`} /></div>
      <div className="mt-5 rounded-2xl bg-[#f8f6f1] p-3.5"><p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#aaa59c]">Próximo passo</p><p className="mt-1.5 truncate text-xs font-bold text-[#5e5c57]">{client.next}</p></div>
      <div className="mt-4 flex items-center justify-between"><p className="text-[11px] text-[#98938b]">{client.service}</p><ArrowUpRight className="size-4 text-[#bbb5ac] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#a85e42]" /></div>
    </button>
  );
}

function ClientDrawer({ client, onClose, onNotify }: { client: ClientRecord; onClose: () => void; onNotify: Notify }) {
  const tone = tones[client.tone];
  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e7e2da] bg-[#fbfaf7]/95 px-5 py-4 backdrop-blur-xl">
        <div><DialogTitle className="text-xs font-black uppercase tracking-[0.18em] text-[#8e8981]">Ficha do cliente</DialogTitle><DialogDescription className="sr-only">Detalhes operacionais de {client.name}</DialogDescription></div>
        <button type="button" onClick={onClose} className="flex size-9 items-center justify-center rounded-xl border border-[#e4ded5] bg-white text-[#817d76] transition hover:text-[#24252a]" aria-label="Fechar ficha"><X className="size-4" /></button>
      </div>
      <div className="p-5 sm:p-7">
        <div className="flex items-start gap-4"><Avatar className={`size-14 ${tone.avatar}`}><AvatarFallback className={`text-sm font-black ${tone.avatar}`}>{client.initials}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="display-serif text-2xl tracking-[-0.035em] text-[#2c2d32]">{client.name}</h2><Badge className={`border-0 px-2 py-1 text-[9px] font-black ${tone.soft}`}>{client.status}</Badge></div><p className="mt-1 text-xs text-[#8e8981]">{client.segment} · cliente desde {client.since}</p></div></div>

        <div className="mt-7 grid grid-cols-3 gap-3"><MiniMetric label="Saúde" value={`${client.health}%`} /><MiniMetric label="Conteúdos" value={String(client.contents)} /><MiniMetric label="Aprovações" value={String(client.approvals).padStart(2, "0")} /></div>

        <section className="mt-7 rounded-[22px] border border-[#e6e1d9] bg-white p-5"><div className="flex items-center justify-between"><div><p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#aaa59c]">Contrato atual</p><p className="mt-2 text-sm font-black text-[#34353a]">{client.service}</p></div><span className="text-sm font-black text-[#34353a]">{client.monthly}</span></div><div className="mt-5 flex items-center justify-between text-[10px]"><span className="font-bold text-[#918c84]">Progresso do ciclo</span><span className="font-black text-[#5f5c56]">{client.progress}%</span></div><Progress value={client.progress} className={`mt-2 h-2 bg-[#ede9e2] ${tone.progress}`} /></section>

        <section className="mt-5 rounded-[22px] border border-[#e6e1d9] bg-white p-5"><p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#aaa59c]">Contato principal</p><div className="mt-4 space-y-3"><ContactLine icon={UserRound} value={client.contact} /><ContactLine icon={Mail} value={client.email} /><ContactLine icon={Phone} value={client.phone} /><ContactLine icon={AtSign} value={client.instagram} /></div></section>

        <section className="mt-5 rounded-[22px] border border-[#e6e1d9] bg-white p-5"><div className="flex items-center gap-2"><History className="size-4 text-[#a85e42]" /><p className="text-xs font-black text-[#34353a]">Próximos movimentos</p></div><div className="mt-4 space-y-3"><TimelineItem tone={tone.dot} title={client.next} detail="Próxima ação da operação" /><TimelineItem tone="bg-[#8ca8c1]" title="Atualizar Brand Hub" detail="Revisão estratégica do mês" /><TimelineItem tone="bg-[#d9b36c]" title="Preparar relatório mensal" detail="Fechamento do ciclo" /></div></section>

        <div className="mt-6 grid gap-2 sm:grid-cols-2"><Button variant="outline" className="h-11 rounded-xl border-[#ddd7ce] bg-white text-xs font-bold shadow-none" onClick={() => onNotify(`Mensagem para ${client.name} preparada.`)}><MessageCircle className="size-4" /> Conversar</Button><Button className="h-11 rounded-xl bg-[#24252a] text-xs font-bold text-[#f8f5ed]" onClick={() => onNotify(`Workspace de ${client.name} aberto.`)}>Abrir workspace <ArrowRight className="size-4" /></Button></div>
      </div>
    </div>
  );
}

type Stage = "Novo lead" | "Reunião" | "Proposta" | "Negociação" | "Contrato";

type Opportunity = {
  id: number;
  company: string;
  contact: string;
  service: string;
  value: number;
  stage: Stage;
  next: string;
  origin: string;
  tone: Tone;
};

const stages: Array<{ name: Stage; label: string; helper: string; tone: Tone }> = [
  { name: "Novo lead", label: "Novo lead", helper: "Primeiro contato", tone: "blue" },
  { name: "Reunião", label: "Reunião", helper: "Diagnóstico", tone: "sage" },
  { name: "Proposta", label: "Proposta", helper: "Escopo enviado", tone: "gold" },
  { name: "Negociação", label: "Negociação", helper: "Ajustes finais", tone: "coral" },
  { name: "Contrato", label: "Contrato", helper: "Fechado", tone: "ink" },
];

const initialOpportunities: Opportunity[] = [
  { id: 1, company: "Clínica Aurora", contact: "Marina Alves", service: "Branding completo", value: 3200, stage: "Novo lead", next: "Hoje, 15:30", origin: "Indicação", tone: "coral" },
  { id: 2, company: "Casa Orbe", contact: "Rafael Nunes", service: "Social media", value: 2100, stage: "Novo lead", next: "Amanhã, 10:00", origin: "Instagram", tone: "sage" },
  { id: 3, company: "Lumi Estética", contact: "Ana Luiza", service: "Captação mensal", value: 1800, stage: "Reunião", next: "02 set, 14:00", origin: "Site", tone: "gold" },
  { id: 4, company: "BEM Odonto", contact: "Dr. Vinícius", service: "Posicionamento", value: 2800, stage: "Reunião", next: "03 set, 09:30", origin: "Networking", tone: "blue" },
  { id: 5, company: "Ateliê Manacá", contact: "Paula Mendes", service: "Branding + conteúdo", value: 4600, stage: "Proposta", next: "Follow-up hoje", origin: "Indicação", tone: "sage" },
  { id: 6, company: "Nexum Tech", contact: "Bruno Leal", service: "Conteúdo B2B", value: 2500, stage: "Proposta", next: "Visualizou há 1 dia", origin: "LinkedIn", tone: "blue" },
  { id: 7, company: "Dra. Camila Reis", contact: "Camila Reis", service: "Marca pessoal", value: 2400, stage: "Proposta", next: "Responder dúvida", origin: "Instagram", tone: "coral" },
  { id: 8, company: "Fio Arquitetura", contact: "Caio Moraes", service: "Social media", value: 1950, stage: "Negociação", next: "Ajustar escopo", origin: "Site", tone: "gold" },
  { id: 9, company: "Studio Noma", contact: "Nathalia Lima", service: "Conteúdo mensal", value: 2200, stage: "Contrato", next: "Iniciar onboarding", origin: "Indicação", tone: "ink" },
];

export function PipelineView({ onNotify }: { onNotify: Notify }) {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [search, setSearch] = useState("");
  const [newLeadOpen, setNewLeadOpen] = useState(false);
  const [leadCompany, setLeadCompany] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadService, setLeadService] = useState("Social media");
  const [leadValue, setLeadValue] = useState("1800");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return opportunities;
    return opportunities.filter((item) => [item.company, item.contact, item.service, item.origin].some((value) => value.toLowerCase().includes(query)));
  }, [opportunities, search]);

  const openValue = opportunities.filter((item) => item.stage !== "Contrato").reduce((sum, item) => sum + item.value, 0);
  const proposalValue = opportunities.filter((item) => item.stage === "Proposta" || item.stage === "Negociação").reduce((sum, item) => sum + item.value, 0);

  function advanceOpportunity(opportunity: Opportunity) {
    const index = stages.findIndex((stage) => stage.name === opportunity.stage);
    if (index >= stages.length - 1) {
      onNotify(`${opportunity.company} já está em contrato.`);
      return;
    }
    const nextStage = stages[index + 1].name;
    setOpportunities((current) => current.map((item) => item.id === opportunity.id ? { ...item, stage: nextStage, next: nextStage === "Contrato" ? "Iniciar onboarding" : "Definir próximo contato" } : item));
    onNotify(`${opportunity.company} avançou para ${nextStage}.`);
  }

  function createLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const company = leadCompany.trim();
    if (!company) return;
    setOpportunities((current) => [{
      id: Date.now(),
      company,
      contact: leadContact.trim() || "Contato a definir",
      service: leadService,
      value: Number(leadValue.replace(/\D/g, "")) || 0,
      stage: "Novo lead",
      next: "Fazer primeiro contato",
      origin: "Cadastro manual",
      tone: "blue",
    }, ...current]);
    setLeadCompany("");
    setLeadContact("");
    setNewLeadOpen(false);
    onNotify(`${company} entrou no pipeline.`);
  }

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Comercial"
        title="Pipeline"
        description="Do primeiro contato ao contrato, sem perder contexto no meio do caminho."
        actions={
          <>
            <Button variant="outline" className="h-10 rounded-xl border-[#ddd7ce] bg-transparent px-4 text-xs font-bold text-[#66625c] shadow-none hover:bg-white" onClick={() => onNotify("Filtro comercial atualizado para este mês.")}><CalendarDays className="size-4" /> Este mês</Button>
            <Button className="h-10 rounded-xl bg-[#24252a] px-4 text-xs font-bold text-[#f8f5ed] hover:bg-[#393a40]" onClick={() => setNewLeadOpen(true)}><Plus className="size-4" /> Novo lead</Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Target} label="Oportunidades abertas" value={String(opportunities.filter((item) => item.stage !== "Contrato").length).padStart(2, "0")} detail="em acompanhamento" tone="blue" />
        <StatCard icon={CircleDollarSign} label="Valor em aberto" value={currency(openValue)} detail="potencial do funil" tone="sage" />
        <StatCard icon={Send} label="Propostas ativas" value={currency(proposalValue)} detail="proposta + negociação" tone="gold" />
        <StatCard icon={TrendingUp} label="Conversão" value="28,6%" detail="+8,4% neste ciclo" tone="coral" />
      </section>

      <section className="rounded-[24px] border border-[#e6e1d9] bg-white p-4 shadow-[0_8px_30px_rgba(65,56,42,0.04)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#e5e0d8] bg-[#faf8f4] px-3 text-[#98938b] sm:max-w-sm"><Search className="size-4" /><span className="sr-only">Buscar oportunidade</span><input value={search} onChange={(event) => setSearch(event.target.value)} className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-[#313136] outline-none placeholder:text-[#aaa59c]" placeholder="Buscar oportunidade" /></label>
          <div className="flex items-center gap-2"><Button variant="ghost" className="h-9 rounded-xl px-3 text-xs font-bold text-[#77736b]" onClick={() => onNotify("Filtros avançados entram com a base de dados.")}><Filter className="size-3.5" /> Filtros</Button><p className="text-[11px] font-semibold text-[#9a958d]">{filtered.length} oportunidades</p></div>
        </div>
      </section>

      <section className="overflow-x-auto pb-3 scrollbar-thin scrollbar-gutter-stable">
        <div className="grid min-w-[1320px] grid-cols-5 gap-4">
          {stages.map((stage) => {
            const cards = filtered.filter((item) => item.stage === stage.name);
            const tone = tones[stage.tone];
            const total = cards.reduce((sum, item) => sum + item.value, 0);
            return (
              <div key={stage.name} className="rounded-[22px] border border-[#e6e1d9] bg-[#efede7]/60 p-3">
                <div className="px-1 pb-3">
                  <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2"><span className={`size-2 rounded-full ${tone.dot}`} /><p className="text-xs font-black text-[#393a3f]">{stage.label}</p><span className="rounded-md bg-white px-1.5 py-0.5 text-[9px] font-black text-[#918c84]">{cards.length}</span></div><MoreHorizontal className="size-4 text-[#b5afa6]" /></div>
                  <div className="mt-2 flex items-center justify-between text-[9px]"><span className="font-semibold uppercase tracking-[0.12em] text-[#aaa59c]">{stage.helper}</span><span className="font-black text-[#77736b]">{currency(total)}</span></div>
                </div>
                <div className="space-y-3">
                  {cards.map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} onAdvance={() => advanceOpportunity(opportunity)} onNotify={onNotify} />)}
                  {cards.length === 0 && <div className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8d2c9] bg-white/40 px-4 text-center"><MoveRight className="size-5 text-[#bbb5ac]" /><p className="mt-2 text-[10px] font-bold text-[#aaa59c]">Nenhuma oportunidade</p></div>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Dialog open={newLeadOpen} onOpenChange={setNewLeadOpen}>
        <DialogContent className="rounded-[24px] border-[#e2dcd3] bg-[#fbfaf7] p-0 sm:max-w-xl">
          <form onSubmit={createLead}>
            <DialogHeader className="border-b border-[#e9e4dc] px-6 py-5"><DialogTitle className="display-serif text-2xl font-medium tracking-[-0.03em] text-[#292a2f]">Novo lead</DialogTitle><DialogDescription className="text-xs leading-5 text-[#88837b]">Registre o essencial agora. O histórico começa no primeiro contato.</DialogDescription></DialogHeader>
            <div className="grid gap-5 px-6 py-6">
              <div className="space-y-2"><Label htmlFor="lead-company" className="text-xs font-black text-[#55525c]">Empresa ou marca</Label><Input id="lead-company" value={leadCompany} onChange={(event) => setLeadCompany(event.target.value)} placeholder="Ex.: Clínica Aurora" className="h-11 rounded-xl border-[#ddd7ce] bg-white shadow-none" autoFocus /></div>
              <div className="space-y-2"><Label htmlFor="lead-contact" className="text-xs font-black text-[#55525c]">Pessoa de contato</Label><Input id="lead-contact" value={leadContact} onChange={(event) => setLeadContact(event.target.value)} placeholder="Nome do responsável" className="h-11 rounded-xl border-[#ddd7ce] bg-white shadow-none" /></div>
              <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label className="text-xs font-black text-[#55525c]">Serviço de interesse</Label><Select value={leadService} onValueChange={setLeadService}><SelectTrigger className="h-11 w-full rounded-xl border-[#ddd7ce] bg-white shadow-none"><SelectValue /></SelectTrigger><SelectContent className="rounded-xl"><SelectItem value="Social media">Social media</SelectItem><SelectItem value="Branding completo">Branding completo</SelectItem><SelectItem value="Captação mensal">Captação mensal</SelectItem><SelectItem value="Posicionamento">Posicionamento</SelectItem><SelectItem value="Projeto personalizado">Projeto personalizado</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label htmlFor="lead-value" className="text-xs font-black text-[#55525c]">Valor estimado</Label><Input id="lead-value" inputMode="numeric" value={leadValue} onChange={(event) => setLeadValue(event.target.value)} className="h-11 rounded-xl border-[#ddd7ce] bg-white shadow-none" /></div></div>
            </div>
            <DialogFooter className="border-t border-[#e9e4dc] px-6 py-4"><Button type="button" variant="ghost" className="rounded-xl text-xs font-bold" onClick={() => setNewLeadOpen(false)}>Cancelar</Button><Button type="submit" className="rounded-xl bg-[#24252a] px-5 text-xs font-bold text-[#f8f5ed]">Adicionar ao pipeline <ArrowRight className="size-4" /></Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OpportunityCard({ opportunity, onAdvance, onNotify }: { opportunity: Opportunity; onAdvance: () => void; onNotify: Notify }) {
  const tone = tones[opportunity.tone];
  const finalStage = opportunity.stage === "Contrato";
  return (
    <article className="rounded-[18px] border border-[#e5e0d8] bg-white p-4 shadow-[0_6px_18px_rgba(62,53,40,0.045)]">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-xs font-black text-[#34353a]">{opportunity.company}</p><p className="mt-1 truncate text-[10px] text-[#9a958d]">{opportunity.contact}</p></div><button type="button" className="text-[#bbb5ac] hover:text-[#66625c]" aria-label={`Opções de ${opportunity.company}`} onClick={() => onNotify(`Detalhes comerciais de ${opportunity.company}.`)}><MoreHorizontal className="size-4" /></button></div>
      <div className="mt-4 flex items-center justify-between gap-2"><Badge className={`max-w-[150px] truncate border-0 px-2 py-1 text-[9px] font-black ${tone.soft}`}>{opportunity.service}</Badge><span className="text-xs font-black text-[#3b3c41]">{currency(opportunity.value)}</span></div>
      <div className="mt-4 rounded-xl bg-[#f8f6f1] p-3"><div className="flex items-center gap-2 text-[9px] font-bold text-[#8e8981]"><Clock3 className="size-3" /><span className="truncate">{opportunity.next}</span></div><div className="mt-2 flex items-center gap-2 text-[9px] font-bold text-[#aaa59c]"><Target className="size-3" /><span>{opportunity.origin}</span></div></div>
      <button type="button" onClick={onAdvance} className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-[10px] font-black transition ${finalStage ? "bg-[#eef4ec] text-[#557053]" : "bg-[#f1eee7] text-[#66625c] hover:bg-[#24252a] hover:text-[#f8f5ed]"}`}>{finalStage ? <><Check className="size-3" /> Fechado</> : <>Avançar etapa <ArrowRight className="size-3" /></>}</button>
    </article>
  );
}

const roadmapData: Record<string, { eyebrow: string; description: string; icon: LucideIcon; tone: Tone; features: Array<{ title: string; description: string; icon: LucideIcon }> }> = {
  Produção: {
    eyebrow: "Operação de conteúdo",
    description: "Calendário, copy, arte, versões e aprovações em um único fluxo.",
    icon: FileText,
    tone: "coral",
    features: [
      { title: "Fila editorial", description: "Conteúdos organizados por status e responsável.", icon: LayoutList },
      { title: "Aprovação por link", description: "Aprovar ou solicitar alteração em poucos segundos.", icon: CheckCircle2 },
      { title: "Histórico de versões", description: "Decisões e ajustes registrados no conteúdo.", icon: History },
    ],
  },
  Calendário: {
    eyebrow: "Planejamento",
    description: "A visão mensal de tudo que será produzido, aprovado e publicado.",
    icon: CalendarDays,
    tone: "blue",
    features: [
      { title: "Mês, semana e lista", description: "Três formas de enxergar a operação.", icon: CalendarDays },
      { title: "Filtros por cliente", description: "Encontre cada entrega sem caça ao tesouro.", icon: Filter },
      { title: "Datas de entrega", description: "Prazos e responsáveis visíveis para todo o ciclo.", icon: Clock3 },
    ],
  },
  Arquivos: {
    eyebrow: "Biblioteca",
    description: "Ativos, contratos e entregáveis separados por cliente e versão.",
    icon: FolderOpen,
    tone: "gold",
    features: [
      { title: "Pastas por cliente", description: "Logos, fotos, vídeos e documentos organizados.", icon: FolderOpen },
      { title: "Arquivos aprovados", description: "A versão certa sempre identificada.", icon: CheckCircle2 },
      { title: "Busca rápida", description: "Encontre ativos sem abrir pasta por pasta.", icon: Search },
    ],
  },
  Financeiro: {
    eyebrow: "Gestão comercial",
    description: "Mensalidades, vencimentos e receita recorrente sem virar um sistema contábil pesado.",
    icon: WalletCards,
    tone: "sage",
    features: [
      { title: "Receita recorrente", description: "Visão mensal da carteira ativa.", icon: CircleDollarSign },
      { title: "Status dos contratos", description: "Recebido, pendente e vencido.", icon: FileText },
      { title: "Histórico por cliente", description: "Movimentações comerciais no mesmo workspace.", icon: History },
    ],
  },
  Relatórios: {
    eyebrow: "Resultados",
    description: "Métricas traduzidas em leitura estratégica e próximos movimentos.",
    icon: BarChart3,
    tone: "ink",
    features: [
      { title: "Resumo do período", description: "O que foi entregue e como performou.", icon: BarChart3 },
      { title: "Melhores conteúdos", description: "Destaques de alcance, engajamento e conversão.", icon: TrendingUp },
      { title: "Próximo ciclo", description: "Recomendações práticas da Aboveframe.", icon: Sparkles },
    ],
  },
};

export function ModuleRoadmapView({ module, onNotify }: { module: string; onNotify: Notify }) {
  const data = roadmapData[module] ?? roadmapData.Produção;
  const tone = tones[data.tone];
  const Icon = data.icon;
  return (
    <div className="space-y-6">
      <PageHeading eyebrow={data.eyebrow} title={module} description={data.description} actions={<Button className="h-10 rounded-xl bg-[#24252a] px-4 text-xs font-bold text-[#f8f5ed]" onClick={() => onNotify(`${module} entrou na fila da próxima construção.`)}><Sparkles className="size-4" /> Próxima etapa</Button>} />
      <section className="overflow-hidden rounded-[28px] bg-[#24252a] text-[#f8f5ed]"><div className="relative grid gap-8 px-6 py-8 sm:px-9 lg:grid-cols-[0.9fr_1.1fr] lg:p-10"><div className="relative z-10"><div className={`flex size-11 items-center justify-center rounded-2xl ${tone.soft}`}><Icon className="size-5" /></div><p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#d2a389]">Em construção · MVP</p><h2 className="display-serif mt-3 max-w-lg text-3xl leading-tight tracking-[-0.04em] sm:text-4xl">Essa área já tem um fluxo definido.</h2><p className="mt-4 max-w-lg text-sm leading-6 text-[#b7b5af]">Clientes e Pipeline entram primeiro porque alimentam todas as telas seguintes. {module} será conectado a essa mesma base.</p></div><div className="relative z-10 grid gap-3 sm:grid-cols-3 lg:self-end">{data.features.map((feature) => { const FeatureIcon = feature.icon; return <article key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4"><FeatureIcon className="size-4 text-[#e5a98e]" /><h3 className="mt-4 text-xs font-black text-white">{feature.title}</h3><p className="mt-2 text-[10px] leading-4 text-[#9e9d98]">{feature.description}</p></article>; })}</div><div className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full border border-white/10" /></div></section>
      <section className="grid gap-4 md:grid-cols-3">{data.features.map((feature, index) => { const FeatureIcon = feature.icon; return <article key={feature.title} className="rounded-[22px] border border-[#e6e1d9] bg-white p-5 shadow-[0_8px_30px_rgba(65,56,42,0.04)]"><div className="flex items-start justify-between"><div className={`flex size-9 items-center justify-center rounded-xl ${tone.soft}`}><FeatureIcon className="size-4" /></div><span className="text-[10px] font-black text-[#c0bbb2]">0{index + 1}</span></div><h3 className="mt-5 text-sm font-black text-[#34353a]">{feature.title}</h3><p className="mt-2 text-xs leading-5 text-[#8e8981]">{feature.description}</p></article>; })}</section>
    </div>
  );
}

function PageHeading({ eyebrow, title, description, actions }: { eyebrow: string; title: string; description: string; actions?: ReactNode }) {
  return <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-black uppercase tracking-[0.23em] text-[#b06b50]">{eyebrow}</p><h1 className="display-serif mt-3 text-[clamp(2.15rem,4vw,3.2rem)] leading-[1.02] tracking-[-0.045em] text-[#24252a]">{title}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#77736b]">{description}</p></div>{actions && <div className="flex flex-wrap gap-2">{actions}</div>}</section>;
}

function StatCard({ icon: Icon, label, value, detail, tone }: { icon: LucideIcon; label: string; value: string; detail: string; tone: Tone }) {
  const colors = tones[tone];
  return <article className="rounded-[22px] border border-[#e6e1d9] bg-white p-5 shadow-[0_8px_30px_rgba(65,56,42,0.04)]"><div className="flex items-start justify-between"><div className={`flex size-9 items-center justify-center rounded-xl ${colors.soft}`}><Icon className="size-4" /></div><ArrowUpRight className="size-4 text-[#c2bdb4]" /></div><p className="mt-5 text-xs font-bold text-[#89847c]">{label}</p><p className="mt-1 text-2xl font-black tracking-[-0.045em] text-[#313136]">{value}</p><p className="mt-1 text-[10px] font-semibold text-[#aaa59c]">{detail}</p></article>;
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-[#e7e2da] bg-white p-3 text-center"><p className="text-[9px] font-black uppercase tracking-[0.13em] text-[#aaa59c]">{label}</p><p className="mt-2 text-lg font-black text-[#34353a]">{value}</p></div>;
}

function ContactLine({ icon: Icon, value }: { icon: LucideIcon; value: string }) {
  return <div className="flex items-center gap-3"><div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#f1eee7] text-[#8e8981]"><Icon className="size-3.5" /></div><p className="min-w-0 truncate text-xs font-semibold text-[#696661]">{value}</p></div>;
}

function TimelineItem({ tone, title, detail }: { tone: string; title: string; detail: string }) {
  return <div className="flex gap-3"><span className={`mt-1.5 size-2 shrink-0 rounded-full ${tone}`} /><div><p className="text-xs font-bold text-[#5b5954]">{title}</p><p className="mt-1 text-[10px] text-[#aaa59c]">{detail}</p></div></div>;
}

function EmptyState({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return <section className="flex min-h-72 flex-col items-center justify-center rounded-[24px] border border-dashed border-[#d9d3ca] bg-white/50 px-6 text-center"><div className="flex size-12 items-center justify-center rounded-2xl bg-[#ece8e0] text-[#8e8981]"><Icon className="size-5" /></div><h2 className="mt-4 text-sm font-black text-[#3b3c41]">{title}</h2><p className="mt-2 text-xs text-[#98938b]">{description}</p></section>;
}

function currency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
}
