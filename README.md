# Aboveframe Studio | Workspace de operação criativa

Aplicação web do Aboveframe Studio para visualizar carteira de clientes, oportunidades comerciais e planejamento de produção. **Estado atual identificado no código: interface/protótipo funcional local, não operação persistida em banco.**

## Documentação viva
Leia [docs/README.md](docs/README.md). Descreve o que está disponível, o que é apenas prévia e o que falta implementar. Todo incremento deve atualizar estes arquivos e o changelog no mesmo commit.

## Funcionalidades presentes no código
- Visão geral com indicadores, agenda e atalhos de demonstração;
- Clientes com busca, filtros, alternância entre grade/lista e formulário local;
- Pipeline de oportunidades com estágios e criação local;
- Módulos Produção, Calendário, Arquivos, Financeiro e Relatórios apresentados como prévias ou indisponíveis.

Dados pré-preenchidos são **exemplos de interface**; não representam clientes ou agenda confirmados.

## Desenvolvimento
Requer Node.js >= 22.13.0. A aplicação usa Vite/Vinext, React e TypeScript; scripts oficiais em `package.json`.

```bash
npm run dev
npm run lint
npm test
```

Para o ambiente de Sites, siga [operação e testes](docs/07-operacao-testes.md). Não presumir que uma migração inicializou o banco: `db/schema.ts` está vazio.

## Referências
- `app/page.tsx`: visão geral e navegação;
- `app/studio-views.tsx`: clientes, pipeline e prévias dos demais módulos;
- `db/schema.ts`: esquema atualmente vazio;
- `docs/`: especificações e trilha de evolução.
