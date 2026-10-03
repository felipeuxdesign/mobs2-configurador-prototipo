# T10 · Calibração

Fazer o módulo contar igual ao painel do ônibus.

| | |
|---|---|
| **Elemento-assinatura** | o tambor que rola do número do módulo até o número do painel |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · hodômetro 184.320 no módulo, 482.317 no painel |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 6 · 4 — ver `estados.md` |

## O que se toca

- durante o semear, o ENCERRAR da faixa fica desabilitado e em tinta apagada
  - no protótipo · a nossa emenda desta linha, antes da entrega do pacote 1 — pra o arquiteto ver: *(a lei 17)*, o desabilitado que é tinta apagada
- o semear não para: durante o *Gravando no módulo…* e o *Relendo…*, o `Voltar ao menu` e o voltar do Android não fazem nada
  - no protótipo · a nossa versão desta linha: parar no meio deixaria o valor pela metade (a decisão do diretor de 25/09) · nos 2 s de *Gravando no módulo…* e *Relendo…*, o `Voltar ao menu` e o voltar do sistema não fazem nada, como no firmware atualizando da T07 (a D4 do pacote 1) · o `Voltar ao menu` fica no lugar, desabilitado de verdade e em `--tinta-apagada`: o toque não faz nada, e o leitor ouve desabilitado (a regra 12 e a lei 17, *desabilitado é tinta apagada*) · o `ENCERRAR` faz o mesmo que o voltar: apagado, e não faz nada · terminado o semear, os dois voltam a valer
  - no protótipo (o pacote 5): o *Gravando no módulo…* e o *Relendo…* são a 06 e a 07, que abrem pela URL paradas, e no fluxo a URL as diz enquanto duram · o botão desligado bate com elas; o `Voltar ao menu` e o `ENCERRAR` seguem apagados (a lei 17 e a decisão de 25/09), e o campo perde o foco quando o semear começa, onde a 06 e a 07 os desenham acesos e o campo com foco — o desvio está no gate do pacote 5
- o campo do painel → tocar e digitar o que o painel mostra, com o teclado numérico
- o botão acende com o número digitado, e sempre diz o que falta: *Digite o que o painel mostra* → `Semear o hodômetro`
- `Semear o hodômetro` → grava e relê → semeado · se a releitura passar da tolerância, *não confere* e `Semear de novo`
  - no protótipo · a nossa versão desta linha: o botão diz *Gravando no módulo…* e depois *Relendo…* (1 s cada, `animacao.md`), e aí o módulo mostra o relido · semeado o passo, o número não se digita mais
- o horímetro só aparece quando o modelo tem, e é **opcional**: depois do hodômetro, `Calibrar o horímetro` e o link `Pular o horímetro` · no passo do horímetro, *Opcional · o último passo*
  - no protótipo · a nossa versão da linha antiga, que esta entrega reescreve (decisão 52): o horímetro era o 2 de 2, obrigatório, com a câmera do painel — sai · continua a decisão 35: o caminho feliz anda em linha — calibra, ciclo, checklist
  - no protótipo (pacote 2, construído): o opcional é o do cadastro, `calibracao.porModelo.opcionais` — no herói, o horímetro · o `Depois:` diz *, opcional* depois do nome (00, 01, 05, 10) · `Pular o horímetro` → **segue pro ciclo** (D1): a calibração fica concluída, vai direto pra T14, e a etapa grava o horímetro em `puladas` — a T13 lê dali o item dele na Seção D, *não calibrado*, sem bloquear · tocado do 01 ou do 08, o mesmo · de volta pelo menu, a calibração abre onde parou, e o horímetro ainda se calibra; semeado, ele sai das `puladas`
  - no protótipo · o voltar do sistema continua o `Voltar ao menu` também onde o link do rodapé é o `Pular o horímetro` (01 e 08): o voltar nunca pula um passo (a linha do voltar, embaixo)
  - no protótipo · desvio nomeado: no semear do horímetro, o link que fica no lugar, apagado, é o `Pular o horímetro` — o do passo —, e não o `Voltar ao menu`: o semear muda o conteúdo, não o desenho. Nenhuma referência desenha esse quadro
  - no protótipo · desvio nomeado: o *Último passo* saiu dos textos (a 08 virou *Opcional · o último passo*), e nenhuma referência desenha o último passo que não é opcional (o 3 de 3 do ma-02, o hodômetro): ele fica sem legenda, como o 1 de 1 da 04 (G25), e o contador já diz o passo
- na rotação, o botão diz *Ligue o motor* até o módulo ler; depois, *Digite o que o conta-giros mostra*
  - no protótipo · a nossa emenda da linha antiga do design *passo seguinte: o horímetro, ou a rotação e a velocidade no caminhão coletor*, que saiu do pacote da entrega de 25/09 — pra o arquiteto ver: as grandezas e a ordem são as do cadastro do modelo do ativo, menos as que o módulo não mede (T10·1); o `Depois:` mostra só a próxima (T10·2)
- **a foto do painel não é mais daqui** (decisão 52): ela é um item da Seção B do checklist, obrigatória quando houve calibração
- calibração completa → `Fazer o ciclo de testes` → T14
  - no protótipo · `etapas.calibracao` guarda o digitado (`painel`), o semeado com o relido (`semeadas`), os pulados (`puladas`) e `concluida`; a foto e o `fotos` saíram com a decisão 52
- `Voltar ao menu` → T04, em todo passo, também embaixo do `Fazer o ciclo de testes` na calibração completa, e a calibração volta de onde parou: o número digitado e o semeado de cada grandeza ficam na etapa (o endereço volta a ser o da referência do passo: 05, 01, 08 ou 09) · `ENCERRAR`, antes de homologar: a sessão abortada da T16 (G23); depois, o encerramento; no semear, apagado (a lei 17)
  - **no protótipo** (decisão 36): fora do semear, antes de homologar, o ENCERRAR abre o diálogo *Encerrar sem homologar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela — a resposta do arquiteto de 26/09 · o `Encerrar sem homologar` roda os 4 passos da T16 · no semear, ele segue apagado, e o diálogo não abre
- o voltar do sistema (no computador, o Esc) faz o `Voltar ao menu`, em todo passo, e na calibração completa também; no semear, nada (`06-prototipo/logica.md` · O voltar do Android)

Na entrega do design de 25/09 (decisão 33), a calibração passou a semear só com a prova: o número digitado e a foto tirada. Na rodada 3 (decisão 52), a foto sai daqui: o botão acende só com o número, e o Painel vira foto a tirar na Seção B do checklist. Saem com ela a câmera do painel (06), o painel fotografado (07) e a câmera sem permissão (11), e o `VisorCamera` deixa de ser da T10. Continuam a ordem das grandezas pelo cadastro (T10·1 e T10·2), a volta de onde parou e o voltar.

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- com legenda
- nota com rótulo
- segmentado
- valor em poço
- régua da diferença
- o valor alvo
- o painel · vazio
- o que não se aplica

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

Medido nas referências da entrega do checklist (as da entrega de 25/09, decisão 33, com as horas no relógio parado, 14:30, e a 09 apontando o ciclo, decisão 35) e no código: as peças que a tela usa de fato. Revista pelo pacote 2 (decisão 52), com as 9 referências de hoje: saem as peças da foto e da câmera; o que o pacote acrescenta (o `Pular o horímetro`, o *Opcional · o último passo* e a *nota com rótulo* da lista de cima) se mede no ciclo que constrói o pacote. Construa com o componente — nunca redesenhe.

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
- valor em poço
- régua da diferença
- o valor alvo
- o painel · vazio
- o que não se aplica

Com a decisão 33, a lista do C9 saiu: a *foto · aguarda*, a linha tocável e o primário inerte no semear. Com a decisão 35, saiu a *uma ação*: a calibração completa tem as duas ações de todo passo. Com a decisão 52, saem a *foto · a tirar*, a *foto · tirada* e a câmera do app. O que só a T10 desenha é variante nomeada da peça (G11): o primário desabilitado diz o que falta (*Digite o que o painel mostra*) e, no semear, o que acontece (*Gravando no módulo…*, *Relendo…*: o processo correndo com o link ao lado); a calibração completa (09) tem as duas ações de todo passo, com `Fazer o ciclo de testes` no primário; no semear, o link fica no lugar, desabilitado de verdade e em `--tinta-apagada` (`Rodape`, `linkDesabilitado`, a decisão do diretor de 25/09 e a lei 17), e o `ENCERRAR` da faixa também (`Faixa`, `acaoDesabilitada`); o segmentado com o passo gravado alto e lima apagado (01, 08 a 10); o valor em poço aceso depois de semear (01) e em vermelho quando a releitura não confere (10); a régua que confere, com o check solto (01, Lei 4 · exceção), e a que não confere, com o xis solto de 14 e a frase em vermelho (10); o valor alvo vazio, com o traço em --marca-limite (00, 08), em foco, com o lima (05), e cumprido, fora do foco (01, 09, 10), com o campo numérico por cima do poço, sem desenho; e o que não se aplica com a divisória na última linha (02). Os átomos da folha 3 são o check da régua, a seta e o xis-mini, o poço de 44 e o LED da faixa. A câmera do app (`VisorCamera`, em `app/src/ds/checklist/`) fica só com o checklist. O número que rola no valor em poço é interno dele (`instrumentos/Tambor.jsx`), não a linha do tambor dos Dados da CAN, a T07 antiga, que saiu com ela (decisão 44).

## Histórias de usuário

- **HU-T10-1** — Vejo só as grandezas calibráveis para este ativo × módulo, com justificativa quando indisponível
- **HU-T10-2** — RPM/velocidade: informo o valor que leio no painel; o módulo calcula o fator
- **HU-T10-3** — Hodômetro/horímetro: digito o valor do painel; o app converte a unidade
- **HU-T10-4** — O horímetro só aparece quando o modelo tem, e é opcional: posso pular
- **HU-T10-5** — O read-back tolera granularidade + tempo decorrido, na unidade do reporte
- **HU-T10-6** — Releitura obrigatória antes do ciclo de testes
- **HU-T10-7** — Recalibrar em manutenção recalcula o offset, não acumula
- **HU-T10-8** — Quem escolhe pulso ou GPS é o cadastro do modelo de ativo, não eu

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
