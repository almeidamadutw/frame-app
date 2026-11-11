# Operação e testes

## Requisitos e scripts
Node.js >= 22.13.0. O projeto utiliza scripts específicos da infraestrutura Sites/Vinext.

```bash
npm run dev
npm run lint
npm test
```

`npm test` executa build seguido de testes `tests/*.test.mjs`. `npm run build` utiliza `scripts/build-verified.sh`, e `npm run install:ci` usa `scripts/install-ci.sh`. O fluxo de instalação no ambiente de Sites deve respeitar a preparação própria do checkout.

## Verificações manuais
1. Abrir visão geral, navegar para Clientes e Pipeline.
2. Usar busca, filtros, modal de cadastro e ficha.
3. Atualizar a página e confirmar que estados de UI **não** são equivalentes a dados persistidos.
4. Revisar responsive, alertas, rótulos de módulos futuros e erros no console.
5. Validar build e testes antes da publicação.

## Segurança
Não fazer upload de dados reais a um protótipo sem validação de persistência, autorização, privacidade e backup. Não commitar credenciais nem conteúdo de clientes.
