# T07 · Dados da CAN

Ver os sinais que o ônibus manda parado — e saber o que só fecha andando.

| | |
|---|---|
| **Elemento-assinatura** | o tambor do hodômetro e as barras com a faixa esperada: o painel do ônibus, lido pela CAN |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · doze sinais do mock |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 0 · 3 — ver `estados.md` |

## O que se toca

- `Configurar módulo` → T09
- no fora da faixa: `Ler novamente`

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- processo correndo
- com legenda
- leitura na faixa
- fora da faixa
- leitura pequena
- leitura com mínimo
- tambor
- sinais liga-desliga
- instrumentos apagados
- com contador neutro
- com contador de falha
- a marca no login
- campo
- campo focado
- cartão com barra
- cartão de configuração

## Histórias de usuário

- **HU-T07-1** — Vejo sinais por domínio, cada um com valor lido · esperado · semáforo
- **HU-T07-2** — Sinal fora do esperado traz causa provável: ligação, barramento, modelo incorreto
- **HU-T07-3** — Sinais dinâmicos aparecem como *aguardando o ciclo dinâmico* — não aprováveis aqui

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
