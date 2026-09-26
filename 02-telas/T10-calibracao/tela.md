# T10 · Calibração

Fazer o módulo contar igual ao painel do ônibus — com a foto do painel como prova.

| | |
|---|---|
| **Elemento-assinatura** | o tambor que rola do número do módulo até o número do painel |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · hodômetro 184.320 no módulo, 482.317 no painel |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 6 · 5 — ver `estados.md` |

## O que se toca

- o semear não para: durante o *Gravando no módulo…* e o *Relendo…*, o `Voltar ao menu` e o voltar do Android não fazem nada — parar no meio deixaria o valor pela metade
- durante o semear, o ENCERRAR da faixa fica desabilitado e em tinta apagada (a lei 17)

- sem a permissão da câmera, o quadro diz *O app precisa da câmera pra fotografar o painel* e o botão vira `Abrir as configurações` · vale pra câmera do checklist também
  - `Abrir as configurações` → o Android abre a página do app nas configurações; permitida lá, na volta o app confere de novo e a câmera abre, com o quadro de enquadrar e o `Tirar foto` (a 06) · `Voltar à calibração`, e o voltar do sistema, continuam saindo da câmera sem foto
  - no protótipo, só a coluna do palco chega aqui (o estado 11, parado e sem toque, na sessão da semente): ele não tem o pedido do Android. O que o botão faz está em `app/src/estado/camera.js`, provado no node (`app/scripts/testar-camera.mjs`); como não há o Android pra abrir, a volta das configurações é com a câmera permitida
- o campo do painel → tocar e digitar o que o painel mostra, com o teclado numérico
- `Fotografar o painel` → a câmera do próprio app, com o quadro e *Enquadre o hodômetro do painel* → `Tirar foto` → volta com o registro no lugar do cartão · sem galeria, e foto tirada fica tirada · `Voltar à calibração` sai da câmera sem foto · a foto pode vir antes do número: o botão segue dizendo o que falta
- o botão só acende com o número digitado **e** a foto tirada, e sempre diz o que falta: *Digite o que o painel mostra* → *Fotografe o painel* → *Semear o hodômetro*
- `Semear o hodômetro` → grava e relê → semeado · o botão diz *Gravando no módulo…* e depois *Relendo…* (1 s cada, `animacao.md`), e aí o módulo mostra o relido · se a releitura passar da tolerância, *não confere* e `Semear de novo` — a foto continua valendo · semeado o passo, o número não se digita mais
  - **o semear não para** (a decisão do diretor de 25/09): ele grava no módulo, e parar no meio deixaria o valor pela metade. Nos 2 s de *Gravando no módulo…* e *Relendo…*, o `Voltar ao menu` e o voltar do sistema não fazem nada, como a releitura da T08 · o `Voltar ao menu` fica no lugar, desabilitado de verdade e em `--tinta-apagada`: o toque não faz nada, e o leitor ouve desabilitado (a regra 12 e a lei 17, *desabilitado é tinta apagada*) · o `ENCERRAR` faz o mesmo que o voltar: apagado, e não faz nada, como na releitura da T08 (a lei 17) · terminado o semear, os dois voltam a valer
- `Calibrar o horímetro` → o 2 de 2, no mesmo fluxo do hodômetro — o digitado e o fotografado do horímetro são iguais aos do hodômetro, só muda o número; a câmera diz *Enquadre o horímetro do painel* → `Semear o horímetro` → a calibração completa: `Fazer o ciclo dinâmico` → T14, com `Voltar ao menu` embaixo (a entrega de 25/09, decisão 35: o caminho feliz anda em linha — calibra, ciclo, checklist)
- na rotação, o botão diz *Ligue o motor* até o módulo ler; depois, *Digite o que o conta-giros mostra*
- passo seguinte: o horímetro, ou a rotação e a velocidade no caminhão coletor. As grandezas e a ordem são as do cadastro do modelo do ativo, menos as que o módulo não mede (T10·1); o `Depois:` mostra só a próxima (T10·2)
- `Voltar ao menu` → T04, em todo passo, também embaixo do `Fazer o ciclo dinâmico` na calibração completa, e a calibração volta de onde parou: o número digitado, a foto e o semeado de cada grandeza ficam na etapa (o endereço volta a ser o da referência do passo: 05, 07, 01, 08 ou 09) · `ENCERRAR`, antes de homologar: a sessão abortada da T16 (G23); depois, o encerramento; no semear, apagado (a lei 17)
- o voltar do sistema (no computador, o Esc) faz o `Voltar ao menu`, em todo passo, e na calibração completa também; na câmera, o `Voltar à calibração`; no semear, nada (`06-prototipo/logica.md` · O voltar do Android)

Na entrega do design de 25/09 (decisão 33), a calibração passou a semear só com a prova: o número digitado e a foto tirada. Sai o que o C9 construiu antes dela — a foto e o semear independentes (T10·3), o cartão da foto tocável e o horímetro sem referência. Continuam a ordem das grandezas pelo cadastro (T10·1 e T10·2), a volta de onde parou e o voltar.

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- com legenda
- segmentado
- foto · a tirar
- foto · tirada
- a câmera do app
- valor em poço
- régua da diferença
- o valor alvo
- o painel · vazio
- o que não se aplica

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

Medido nas 12 referências da entrega do checklist (as da entrega de 25/09, decisão 33, com as horas no relógio parado, 14:30, e a 09 apontando o ciclo, decisão 35) e no código: as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- processo correndo
- os glifos de estado
- os ícones de ferramenta
- os poços
- os marcadores
- segmentado
- foto · a tirar
- foto · tirada
- valor em poço
- régua da diferença
- o valor alvo
- o painel · vazio
- o que não se aplica

Com a decisão 33, a lista do C9 saiu: a *foto · aguarda*, a linha tocável e o primário inerte no semear. Com a decisão 35, saiu a *uma ação*: a calibração completa tem as duas ações de todo passo. O que só a T10 desenha é variante nomeada da peça (G11): o primário desabilitado diz o que falta (*Digite o que o painel mostra*, *Fotografe o painel*) e, no semear, o que acontece (*Gravando no módulo…*, *Relendo…*: o processo correndo com o link ao lado); a câmera troca o rodapé (`Tirar foto` e `Voltar à calibração`), e a calibração completa (09) tem as duas ações de todo passo, com `Fazer o ciclo dinâmico` no primário (a entrega do checklist, decisão 35); no semear, o link fica no lugar, desabilitado de verdade e em `--tinta-apagada` (`Rodape`, `linkDesabilitado`, a decisão do diretor de 25/09 e a lei 17), e o `ENCERRAR` da faixa também (`Faixa`, `acaoDesabilitada`); o segmentado com o passo gravado alto e lima apagado (01, 08 a 10); o valor em poço aceso depois de semear (01) e em vermelho quando a releitura não confere (10); a régua que confere, com o check solto (01, Lei 4 · exceção), e a que não confere, com o xis solto de 14 e a frase em vermelho (10); o valor alvo vazio, com o traço em --marca-limite (00, 08), em foco, com o lima (05), e cumprido, fora do foco (01, 07, 09, 10), com o campo numérico por cima do poço, sem desenho; a foto a tirar, o cartão tocável inteiro com a câmera no poço de 44 e a seta, e a tirada, o registro no lugar, com o check lima e sem toque; e o que não se aplica com a divisória na última linha (02). Os átomos da folha 3 são o check da régua e da foto, a câmera, a seta e o xis-mini, o poço de 44 e o LED da faixa. A câmera do app (06 e 11) é o mesmo desenho do visor do item manual da T13, e as duas são uma peça só, `VisorCamera`, em `app/src/ds/checklist/` (a entrega do mundo real): a sem permissão (11) é a variante dela, com a câmera riscada, a frase do que falta e a explicação apagada. O design system ainda não a lista. O número que rola no valor em poço é interno dele (`instrumentos/Tambor.jsx`), não a linha do tambor da T07.

## Histórias de usuário

- **HU-T10-1** — Vejo só as grandezas calibráveis para este ativo × módulo, com justificativa quando indisponível
- **HU-T10-2** — RPM/velocidade: informo o valor que leio no painel; o módulo calcula o fator
- **HU-T10-3** — Hodômetro/horímetro: digito o valor do painel e fotografo; o app converte a unidade
- **HU-T10-4** — A foto do painel satisfaz também a Seção B, com a origem visível na linha
- **HU-T10-5** — O read-back tolera granularidade + tempo decorrido, na unidade do reporte
- **HU-T10-6** — Releitura obrigatória antes do ciclo dinâmico
- **HU-T10-7** — Recalibrar em manutenção recalcula o offset, não acumula
- **HU-T10-8** — Quem escolhe pulso ou GPS é o cadastro do modelo de ativo, não eu

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
