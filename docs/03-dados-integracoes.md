# Dados e integrações

## Dados atuais
- `app/studio-views.tsx` contém `initialClients` e oportunidades de exemplo; os formulários alimentam estados locais.
- `app/page.tsx` contém clientes, agenda e indicadores ilustrativos da visão geral.
- `db/schema.ts` está intencionalmente vazio, sem tabelas do domínio Aboveframe.
- Não há base confiável para afirmar que dados cadastrados na UI sobrevivem a recarga.

## Integrações
- Infraestrutura de D1/Drizzle presente como opção técnica, sem domínio implementado.
- Helpers de autenticação ChatGPT em `app/chatgpt-auth.ts`; uso deve ser explicitamente ativado/validado.
- **Não identificado no código:** integração real com Google Drive, Meta/Instagram, WhatsApp Business, gateway de pagamento, automação de aprovação ou métricas de campanhas.

## Modelo de dados proposto (não implementado)
`clients`, `contacts`, `leads`, `proposals`, `projects`, `tasks`, `content_assets`, `approvals`, `invoices`, `audit_events`. O esquema é apenas referência para modelagem futura, não nomes de tabelas existentes.

Não armazenar dados reais em arrays versionados ou segredos no repositório.
