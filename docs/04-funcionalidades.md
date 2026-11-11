# Funcionalidades e disponibilidade

| Módulo | Estado no código | Detalhes |
| --- | --- | --- |
| Visão geral | UI com dados de exemplo | Indicadores, agenda, avisos e atalhos em `app/page.tsx` |
| Clientes | UI interativa local | Busca, filtros, visualização, ficha e inclusão via formulário; sem persistência confirmada |
| Pipeline | UI interativa local | Novo lead, Reunião, Proposta, Negociação, Contrato; estados locais |
| Produção | Prévia | Roadmap de fila editorial e aprovação; não é fluxo operacional persistido |
| Calendário | Prévia | Planejamento de períodos, filtros e entregas futuras |
| Arquivos | Não disponível / prévia | Pastas por cliente, arquivos aprovados e busca ainda projetados |
| Financeiro | Não disponível / prévia | Previsão de mensalidades, contratos e receita recorrente |
| Relatórios | Não disponível / prévia | Resumo de entregas e desempenho |
| Configurações e notificações | UI demonstrativa | Ações exibem feedback, sem rotina de backend confirmada |

**Não confundir interface com produção.** Referências: `app/page.tsx` e `app/studio-views.tsx`.
