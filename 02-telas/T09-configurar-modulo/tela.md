# T09 · Configurar módulo

Gravar os blocos no módulo, um de cada vez, cada um relido antes do próximo.

| | |
|---|---|
| **Elemento-assinatura** | a cadeia: o trilho que liga os blocos e só avança com o read-back confirmado |
| **Chrome** | faixa de sessão · a linha dos pinos embaixo do título |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · os blocos do mock |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 3 — ver `estados.md` |

## O que se toca

- a cadeia corre sozinha
- bloco recusado: `Tentar de novo`, do bloco recusado
- queda: `Reconectar e seguir`, do mesmo bloco
- cadeia concluída: `Calibrar` → T10
- tentar sair no meio → a recuperação, até a Conexão gravar

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- uma ação
- processo correndo
- com legenda
- falha
- aviso
- processo parado
- cadeia concluída
- cadeia recusada
- a pré-condição dos pinos
- encerrando
- pede o corte
- sem homologar
- com contador neutro
- com contador de falha
- a marca no login
- campo
- campo focado
- prova da cadeia

## Histórias de usuário

- **HU-T09-1** — Disparo e acompanho; não escolho conteúdo nem bloco
- **HU-T09-2** — A pré-condição de ocupação de pinos é a primeira linha da tela
- **HU-T09-3** — O bloco 1 declara o escopo e o que apaga/preserva. Sem confirmação em dois passos
- **HU-T09-4** — Cada bloco só inicia com o anterior confirmado por read-back
- **HU-T09-5** — Falha interrompe, nomeia a etapa em linguagem de campo e oferece repetir a etapa
- **HU-T09-6** — Queda no meio: retomo do mesmo bloco, de forma idempotente
- **HU-T09-7** — Ao final, read-back consolidado dos parâmetros críticos
- **HU-T09-8** — A versão dos 5 blocos é gravada como string composta após o read-back de cada bloco
- **HU-T09-9** — Nova instalação é transação inteira — abortar mantém na tela de recuperação até Conexão gravar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
