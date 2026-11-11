# Regras de negócio e permissões

## Regras observadas na interface
- Clientes têm estados como Ativo, Onboarding, Aguardando e Pausado.
- O pipeline trabalha com Novo lead → Reunião → Proposta → Negociação → Contrato.
- A navegação diferencia módulos disponíveis em UI de módulos marcados como futuros.

## Permissões
Não foi identificada uma implementação efetiva de papéis (admin, equipe, cliente) com autorização em backend para os registros de negócios; portanto **não considerar a interface apropriada a dados operacionais sensíveis** apenas pela existência de componentes de login opcionais.

## Regras a especificar antes de produção
- Quem cria e edita clientes, preços, materiais e propostas.
- Responsável por cada entrega; prazos, revisão e aprovação.
- Separação por cliente/conta e acesso a arquivos.
- Política de exclusão, consentimento, auditoria e retenção.
- Versionamento de peças e aprovação explícita.

Estas regras futuras estão pendentes de implementação e validação, não são comportamento atual.
