# Manutenção da documentação viva

**Uma feature não está pronta sem documentação sincronizada.**

Checklist por alteração:
1. Identificar o comportamento anterior e o novo, com seus arquivos de código.
2. Atualizar `04-funcionalidades.md` (estado de implementação) e `05-fluxos.md` (uso passo a passo).
3. Atualizar arquitetura, dados/integrações e permissão quando houver impacto.
4. Registrar deploy, teste, validação e limitações em `07-operacao-testes.md`.
5. Atualizar `08-pendencias.md` e datar a mudança em `CHANGELOG.md`.
6. Garantir que `README.md` e `docs/README.md` apontem para documentos corretos.

Não declarar persistência, integrações ou segurança sem código e evidência. Não versionar segredos nem dados reais de clientes. Usar Markdown no GitHub em vez de PDFs recorrentes.
