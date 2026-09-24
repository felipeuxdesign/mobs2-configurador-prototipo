# T11 · Conferir configuração

Comparar o que o módulo tem gravado com o que o cadastro manda — em linguagem de negócio.

| | |
|---|---|
| **Elemento-assinatura** | as linhas de conferência: cada bloco dizendo se bate com o cadastro |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | M2C-0438 + ONK-8Q90 · caso diff-divergente |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 1 — ver `estados.md` |

## O que se toca

- `Regravar os cinco blocos` → T09
- `Só registrar o diagnóstico` → registra e volta ao menu
- tudo confere: `Voltar ao menu`

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sem ação
- duas ações
- uma ação
- processo correndo
- com legenda
- assertiva da sessão
- linha de conferência
- com contagem
- linha do histórico
- a lista de garagens
- linha de opção
- lista com contagem

## Histórias de usuário

- **HU-T11-1** — O app lê a string de versão como primeiro passo; ausente ou ilegível roda diff completo por conteúdo
- **HU-T11-2** — Vejo divergências agrupadas por bloco, em linguagem de negócio
- **HU-T11-3** — Escolho entre 3 ações nomeadas pelo efeito, incluindo *apenas registrar o diagnóstico*
- **HU-T11-4** — Corrigir arrasta as dependências automaticamente, na ordem canônica
- **HU-T11-5** — Índice que o firmware cria sozinho não é divergência; sem lista, vai para *não classificados*
- **HU-T11-6** — Escopo fixo em limpeza de configuração — limpeza total não é oferecida aqui
- **HU-T11-7** — Configuração conforme é declarada explicitamente; o diff sobe mesmo sem reenvio

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
