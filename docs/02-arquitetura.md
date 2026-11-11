# Arquitetura

## Stack
- React 19 e Next/Vinext com Vite;
- TypeScript, Tailwind e componentes UI;
- Cloudflare Workers/Sites como caminho de build previsto nos scripts;
- Drizzle e D1 como infraestrutura opcional: **schema do projeto vazio** (`db/schema.ts`).

## Mapa
```text
app/page.tsx          # navegação e dashboard local
app/studio-views.tsx  # views de clientes, pipeline e módulos futuros
app/layout.tsx        # layout
app/globals.css       # estilo visual
components/ui/        # biblioteca de componentes
db/index.ts           # acesso opcional ao D1
db/schema.ts          # sem tabelas de negócio
drizzle/              # suporte a migrações
tests/                # verificações básicas de interface
docs/                 # documentação
```

## Estado
`useState` controla a maioria dos registros e escolhas mostrados. **Alterações locais de UI podem se perder ao recarregar a página**. Há utilitários de login ChatGPT opcionais em `app/chatgpt-auth.ts`, mas isso não comprova que o Aboveframe exija autenticação.

## Princípio de evolução
Ao introduzir persistência: definir esquema, migrações, autenticação/autorização, trilha de auditoria e testes. Documentar a fonte de verdade de cada módulo.
