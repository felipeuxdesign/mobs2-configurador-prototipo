# T14 · Ciclo dinâmico

Andar com o ônibus e deixar o app provar o que só fecha em movimento.

| | |
|---|---|
| **Elemento-assinatura** | o prazo do evento drenando enquanto o evento viaja até o servidor |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 2 · 3 — ver `estados.md` |

## O que se toca

- a fila do módulo drena → `Disparar evento de teste` acende
- disparado → o prazo de 2:00 começa
- os passos do veículo acendem sozinhos
- `Encerrar o ciclo` → T13
- prazo estourado: `Disparar outro evento` — os passos continuam valendo
- identificador divergente: `Solicitar correção de cadastro`

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- processo correndo
- com legenda
- passo do ciclo
- passos com o prazo estourado
- cadeia concluída
- cadeia recusada
- segmentado
- encerrando
- pede o corte
- sem homologar
- cronômetro
- prazo cheio
- com contador neutro
- com contador de falha
- a marca no login
- campo
- campo focado
- bloco do evento

## Histórias de usuário

- **HU-T14-1** — Um deslocamento alimenta 4 blocos: CAN dinâmica · Seção E · evento de teste · viagem
- **HU-T14-2** — Disparo o evento de teste por botão, com o cronômetro dos 120 s em destaque
- **HU-T14-3** — Antes do cronômetro vejo a fila do módulo drenando; o botão fica indisponível com motivo
- **HU-T14-4** — Vejo 3 linhas de estado: disparado · recebido · campos conferidos. E posso disparar novamente
- **HU-T14-5** — No teste do identificador vejo o código lido ao lado do esperado, em formato de negócio
- **HU-T14-6** — Divergindo, a tela oferece solicitar correção de cadastro já com os dois valores anexados
- **HU-T14-7** — Vejo o tempo decorrido e o que ainda falta capturar; encerrar leva direto ao checklist

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
