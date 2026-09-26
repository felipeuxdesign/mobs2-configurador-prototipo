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
  - no protótipo, conferido na última entrega: a referência `05` agora segue o mock — *0:24*, *14:30:24* e a barra em 80% —, e o app bate (os textos conferem; 0,87% → 0,09% contra o HTML). O que sobra é o marcador branco da escala: a `05` nova deixou o marcador em 60%, onde a barra parava com os 0:48 de antes, e a peça põe o marcador no fim do preenchido, no que restava (80%), como toda escala do app (`Prazo`, `Escala`) — vai ao arquiteto, pra o marcador da `05` ir pros 80%
- `Encerrar o ciclo` → T13, e fecha a captura: os pendentes ficam pendentes na Seção E · `Ir para o checklist` → T13, com o ciclo aberto (T14·2). Voltar à T14 com o ciclo aberto retoma os passos que já valem, e o evento se dispara de novo
- ciclo concluído: `Voltar ao checklist` → T13 · `Voltar ao menu` → T04 (T14·4)
- `ENCERRAR` → a sessão abortada antes de homologar (G23)
  - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar sem homologar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela — a resposta do arquiteto de 26/09 · o `Encerrar sem homologar` roda os 4 passos da T16 · o ciclo continua correndo embaixo do diálogo, porque o técnico ainda não decidiu nada (padrão do protótipo, pro arquiteto; a alternativa é pausar)
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

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- com legenda
- os glifos de estado
- os poços
- os marcadores
- passo do ciclo
- passos com o prazo estourado
- cronômetro
- prazo cheio
- com contador neutro
- bloco do evento

Medido no código do C10, no fechamento do C10 e do C11 (G10), com os nomes das linhas do `componentes.md`. Saíram as seis que o código não usa: a faixa · sem ação (a faixa da T14 sempre tem o ENCERRAR), o processo correndo (no `01`, o primário apagado diz a ação, e quem explica é a legenda em cima), o com contador de falha (o contador conta os passos que passaram, neutro), o checkbox, o checkbox marcado e a justificativa. Entraram as de toque da folha 1 (o primário nos três estados, apagado enquanto a fila drena, e o link de saída do rodapé) e os átomos da folha 3 (os glifos e os poços dos passos, o relógio do evento e do registro, e o LED da faixa). As diferenças da tela contra a folha viraram variante nomeada da peça (G11), declarada lá: o passo do ciclo reprovado com a causa (`03` e `04`); o cronômetro estourado, com o número em vermelho e as frases do estado uma por linha (`02`); o nome do relógio do bloco do evento pelo dado; e o link registrado, o pedido de correção feito no lugar do link, nas duas ações (`06`).

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
