# T14 · Ciclo dinâmico

Andar com o ônibus e deixar o app provar o que só fecha em movimento.

| | |
|---|---|
| **Elemento-assinatura** | o prazo do evento drenando enquanto o evento viaja até o servidor |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 3 · 3 — ver `estados.md` |

## O que se toca

- a tela entra no quadro `01`: a fila do módulo drenando, o prazo cheio e o disparo indisponível com o motivo (G27). A fila drena em 3 s (`movimento.md`), e o `Disparar evento de teste` acende; esse quadro não tem referência e junta as peças que existem (G25)
- disparado → o prazo de 2:00 começa: 1 s real vale 4 s de prazo
- os passos do veículo acendem sozinhos: a semente traz 2 feitos, e os passos 3 a 5 acendem a +9, +12 e +15 s do disparo (T14·1). A `00` é o instante antes de o evento chegar (1:36)
- o evento chega aos 24 s do prazo e os campos conferem aos 33 (o mock): o número passa a ser o tempo que ele levou, e a barra para no que restava. Os cinco passos e o evento → `05` (C10 · G9: 0:24 e 14:30:24, o valor do mock)
- `Encerrar o ciclo` → T13, e fecha a captura: os pendentes ficam pendentes na Seção E · `Ir para o checklist` → T13, com o ciclo aberto (T14·2). Voltar à T14 com o ciclo aberto retoma os passos que já valem, e o evento se dispara de novo
- ciclo concluído: `Voltar ao checklist` → T13 · `Voltar ao menu` → T04 (T14·4)
- `ENCERRAR` → a sessão abortada antes de homologar (G23)
- o voltar do Android (no computador, o Esc) faz o mesmo que o link de saída do rodapé (`logica.md`): `Ir para o checklist`, com o ciclo aberto, e no ciclo concluído `Voltar ao menu`. Com o caso de identificador, o link do rodapé é o pedido de correção, que não sai, e o voltar não faz nada
- prazo estourado (`evento-sem-resposta`, uma vez por sessão): `Disparar outro evento` — os passos continuam valendo, e a segunda tentativa confirma
- sinal fora do esperado (`can-fora-esperado`): o passo que o sinal prova reprova, com a causa embaixo, e os outros seguem acendendo
- a linha do teste do cartão só entra com o caso de identificador (T14·3), e conta nos passos (*de 6*)
- identificador divergente: `Solicitar correção de cadastro` → o link vira o registro no mesmo lugar e do mesmo tamanho, com o relógio, *Correção solicitada às 14:30* (a hora do protótipo), e deixa de ser tocável — é o momento `06`, do caso `identificador-divergente`. Pro leitor de tela, o registro é um aviso de status, não um botão
- o ciclo fica gravado em `etapas.ciclo` (`logica.md`)

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
- cronômetro
- prazo cheio
- com contador neutro
- com contador de falha
- checkbox
- checkbox marcado
- justificativa
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
