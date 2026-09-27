# Pro arquiteto · a moldura e a barra, construídas

Oi, é o Claude que constrói o protótipo. A `otimizacao300000000` entrou inteira e está construída, medida e revisada. Aqui vai o que você pediu no fim: o que diferia na comparação, o que o protótipo mede, os quatro modos do palco em print ao lado dos seus quadros, a lista *pra ver* e o que ficou pendente.

## 1. A comparação, antes de copiar

Comparei cada arquivo do pacote com o nosso de antes da junção.

- **os 66 documentos gerados:** 26 iguais e 40 diferentes.
  - em 32, o nosso tinha as anotações do protótipo;
  - 6 `textos.md` (T01, T02, T11, T12, T13 e T15) só diferiam em linha em branco, e ficou o seu;
  - o `textos.md` da T16 trazia a sua frase nova do NÃO RODARAM, e entrou;
  - o `indice.json` tinha três campos nossos.
  - Como você decidiu: entrou tudo o seu, exatamente, e as nossas anotações ficaram no lugar. Onde uma anotação nossa contradiz uma linha nova sua, ela está na seção 5, sem resolver.
- **o `indice.json`:** os mesmos 145 itens, sem nenhuma diferença nos seus campos. Ficaram o `rotulo` e o `rotuloOrigem`, como você decidiu. **Achei também o `grupo`**, que é nosso: é o agrupamento dos estados da T05 na coluna (*achar*, *conectar*, *conferir*), nos 13 estados dela. Ficou pelo mesmo motivo: o palco lê. Sem ele, a coluna da T05 fica sem os seus 13 estados.
- **as 8 folhas:** a 1 e a 2 diferiam, como você disse. Da 3 à 8, idênticas byte a byte, html e png.
- **as referências:** dos 316 arquivos (as 145 telas, os 5 quadros do palco e as 8 folhas, html e png), 304 mudaram e 12 eram idênticos — as folhas 3 a 8. Depois de copiados, os 319 arquivos que não são documento gerado estão iguais aos seus, byte a byte.
- **o `palco.md`:** a linha *num estado* é a sua. **O README do design system:** diz os valores medidos, e que o seu `tokens.json` conta 96. Na junção eram 287; com a barra, **294** (a seção 7 diz por quê).
- **o `tokens.json`:** o nosso é gerado do `tokens.css` e não leva `$description`. A sua descrição do `--fonte-sistema` ficou no comentário da linha dele no `tokens.css`, palavra por palavra. O gerador passou a dar o tipo `fontFamily` ao `--fonte-sistema`, como já dava à `--fonte`.
- **o gate:** aprova, com 194 checagens. **O censo: 145 referências no índice, 145 HTML e 145 PNG** — 16 telas, 62 momentos e 67 estados.

## 2. No protótipo, medido

Medido com o protótipo rodando (`app/scripts/provas-palco.mjs`), depois de todos os consertos. O relatório inteiro está em `06-prototipo/app/prints/tmp/relatorios/palco-provas.txt`.

| O quê | O que se mediu |
|---|---|
| **a barra** | 30px de altura, no topo da tela, e o que vem embaixo começa em **y = 30**: **144 de 144** telas construídas. A 145ª, a T07/03, não se constrói — ela desenha o ma-01 com a placa de um ônibus que é ma-02, e espera a referência nova |
| **a barra contra o seu HTML** | igual, byte a byte, em 144 das 145 (a T07/03 é a que não bate) · nada abaixo de y = 30 mudou em nenhuma |
| **a hora** | na **Google Sans**, 144 de 144: a fonte carregada, a família calculada igual ao `--fonte-sistema`, e a fonte que o Chrome usou pra desenhar o *14:30* é a Google Sans · 13px, peso 500, na `--tinta` · **nenhum pedido pra fora da máquina**: a fonte vem de `05-recursos/fontes/GoogleSans-hora.woff`, e o build a empacota no próprio CSS |
| **a moldura** | **386 × 826** por fora, a tela de 360 × 800 a 13 da borda · **metal de 3** (`#3C3C43`) e **aro de 10** (`#050507`) nos quatro lados · **canto de 57** por fora **e 44** na tela · os dois fios: `#17171B` por fora do metal e `rgba(255,255,255,0.04)` por dentro · igual nos quatro modos, a 1440 × 900 e a 1920 × 1080, sempre em tamanho real |
| **o celular no centro** | a 1440 × 900: em x 527 e y 37 — **527 de cada lado, 37 em cima e embaixo** · a 1920 × 1080: 767 de cada lado e 127 em cima e embaixo |
| **a coluna** | **a 40 do celular**, com **826 de altura**, no mesmo topo dele, e o conteúdo no meio da altura |
| **o painel aberto** | o celular e a coluna ficam no lugar (veja a pergunta 1 da seção 6) |

**A T16, a T06 e a T12:**

- **a T16 com o vão de 14 nas sete** — 00, 01, 02, 03, 04, 05 e 06, no app e na sua referência. As sete ficaram de 0,02% a 0,06% do seu HTML novo, e os textos das sete conferem.
- **o *não se aplica*, o *pulado* e o traço**, como você disse: o *não se aplica* só nas assertivas do autoteste (02 e 05), o *pulado* nos passos que o encerrar sem homologar pula (03), e o traço no passo que ainda não chegou (00 e 01).
- **a T06 e a T12 com 16 de folga antes do rodapé**, o último grupo sem margem:
  - T06/00: 16 no fim da rolagem;
  - T06/02 e 07: 16;
  - T12/00 e 03: a folga é 16, e as duas não rolam — sobram 71 e 5, que somam 87 e 21, os mesmos da sua referência.

## 3. Os quatro modos do palco, em print

Nesta pasta, cada PNG é a sua referência à esquerda e o protótipo à direita, na mesma janela de 1440 × 900, a 1×. O seu quadro desenha o celular a 90%. O protótipo põe o celular em tamanho real, rodando.

| Arquivo | O quê |
|---|---|
| `01-no-fluxo.png` | a T04 no fluxo. Fotografei depois do *Entendi*: na chegada ao menu, o fluxo mostra o aviso do acesso, e o seu quadro desenha o menu sem nada por cima. O seu quadro traz a T04 sem rede; o fluxo do palco tem rede |
| `02-num-estado.png` | a T07 no estado *Fora da faixa*: a mesma moldura do fluxo, e o `Voltar ao fluxo` no topo da coluna |
| `03-tela-com-muitos-estados.png` | a T05 com os 13 estados em três grupos. O seu quadro põe o momento *Um encontrado* no ACHAR; a coluna lista só os estados, com o Bluetooth desligado e sem permissão no ACHAR |
| `04-painel-aberto.png` | o painel aberto na T07. O seu quadro anda o celular e a coluna 90 à direita; no protótipo, o painel passa por cima, e nada se mexe |
| `00-componentes.png` | a folha das peças: cada peça do palco fotografada rodando, no lugar do espécime, com o que se mediu nas tabelas |

## 4. O que a construção e a revisão acharam

- **a revisão achou dois defeitos nossos, e já estão consertados:**
  - o passo pulado da T16/03 dizia *não se aplica* pro leitor de tela. Agora o traço fica mudo, e a palavra ao lado diz *pulado*;
  - o aviso do app parado piscava sozinho: depois da primeira piscada, todo estado aberto já nascia piscando. Agora só o toque pisca.
- **na junção, 19 linhas suas tinham ficado em dobro**, a nova e a velha, em 9 documentos. Ficou uma.
- **a régua inteira aprova:** as 145 referências (44 em 0% do seu HTML, nenhuma pior), os textos, os 127 espécimes, 19 roteiros com 2.610 passos, e nenhum botão aceso que não faz nada.

## 5. Pra ver · onde a nossa anotação contradiz uma linha nova sua

Nos documentos gerados, onde uma linha sua voltou ao lado de uma anotação nossa, **a sua ficou exata** — na tabela, ou na lista — e **a nossa numa nota logo embaixo**, marcada *no protótipo · a nossa versão desta linha, antes desta entrega*. Não resolvi nenhuma. São 55 pares:

- em **19**, a nossa contradiz a sua. Estão aqui embaixo;
- em **1**, uma linha sua saiu do pacote: na T10, *passo seguinte: o horímetro, ou a rotação e a velocidade no caminhão coletor*. A nossa emenda dela ficou numa nota. Saiu de propósito?
- em **35**, a nossa só diz mais — o caso do mock, a semente, o que o leitor de tela ouve. A sua vale.

Os 55, com as duas versões lado a lado, estão no `06-prototipo/para-o-arquiteto/diferencas.md`, na seção *A moldura e a barra*.

Nas 19, a nossa é o que o protótipo faz hoje. **Preciso da sua decisão em cada uma: vale a sua, e o protótipo muda; ou vale a nossa, e o seu documento muda.**

- **T03 · `tela.md`** — o seu `textos.md` (linha 11) e a referência 01 dizem `Reconectar` e `Voltar ao contexto`; nenhum HTML da T03 tem *Tentar de novo*
  - a sua: na falha de rede: `Tentar de novo`
  - a nossa: na falha de rede: `Reconectar` (segue de onde parou) ou `Voltar ao contexto` → T02
- **T04 · `tela.md`** — a T04/01 desenha a faixa sem sessão, *Sem sessão de configuração* — toda referência tem faixa
  - a sua: | **Chrome** | tira de contexto (unidade) + faixa de sessão quando há sessão |
  - a nossa: | **Chrome** | tira de contexto (unidade) + faixa de sessão · sem sessão, a faixa diz só o fato (01) |
- **T05 · `estados.md`** — a contagem: o seu `textos.md` e a referência 00 dizem *5 encontrados* — o do herói e *OUTROS QUATRO POR PERTO*; se o *quatro* é dos outros, as duas dizem o mesmo
  - a sua: | `00-tela` | tela | a entrada da tela | quatro módulos por perto · M2C-0417 é o do herói |
  - a nossa: | `00-tela` | tela | a entrada da tela | cinco módulos por perto (`situacao.porPerto`: o do herói e outros quatro) · M2C-0417 é o do herói |
- **T05 · `tela.md`** — a contagem, como a linha 00 do `estados.md`: a 00 diz *5 encontrados*
  - a sua: | **Semente no protótipo** | quatro módulos por perto · M2C-0417 é o do herói |
  - a nossa: | **Semente no protótipo** | cinco módulos por perto (`situacao.porPerto` do mock: o do herói e outros quatro) · M2C-0417, o do herói, vem escolhido |
- **T05 · `tela.md`** — a R-14 e a decisão do diretor de 24/09 — o toque só marca, e é o primário que conecta
  - a sua: tocar num módulo → escolhido → `Conectar ao M2C-0417`
  - a nossa: tocar num módulo da lista **só o marca** (o quadrado lima surge no poço) e acende `Conectar ao M2C-0417`, com o serial do marcado; tocar em outro troca a marca · é o primário que conecta (R-14, decisão do diretor, 24/09) · o não cadastrado não se toca · na 00, o ESCOLHIDO é a marca: tocar num dos outros por perto troca o escolhido no lugar, e o primário passa a dizer o serial dele — também não conecta
- **T06 · `tela.md`** — a decisão do diretor de 24/09 (a T06·1 em b, a R-14) — o toque só marca, e o `Usar este ativo` leva à confirmação
  - a sua: tocar num ônibus → confirmar o veículo
  - a nossa: tocar num ônibus → ele fica **marcado** (o quadrado lima no poço) e o `Usar este ativo` acende; o `Usar este ativo` → confirmar o veículo. Tocar em outro ônibus troca a marca (decisão do diretor, 24/09: a T06·1 passa pra (b), o T06-N3). A lista com um ônibus marcado não tem referência: monta-se com as peças que existem (G25)
- **T09 · `tela.md`** — nenhum dos cinco HTML da T09 tem *Calibrar* — a 04 desenha `Voltar ao menu` (C9 · T09-A3)
  - a sua: cadeia concluída: `Calibrar` → T10
  - a nossa: cadeia concluída: `Voltar ao menu` → T04, de onde a Calibração segue. A 04 não desenha um `Calibrar`, e texto novo não entra (C9 · T09-A3, G1, G25)
- **T11 · `animacao.md`** — o `movimento.md` diz, em *Reduzir movimento*, que os processos continuam no mesmo ritmo e a prova nasce em ordem; a sua diz *aparecem juntas*
  - a sua: | linhas de conferência | a leitura corre | acendem em ordem, 400ms cada | 150ms | desacelera | aparecem juntas |
  - a nossa: | linhas de conferência | a leitura corre | acendem em ordem, 400ms cada | 150ms | desacelera | acendem em ordem, no mesmo ritmo, sem o esmaecer (movimento.md · G26) |
- **T11 · `tela.md`** — as linhas 15 e 16 do mesmo `tela.md`, o seu `textos.md` e a decisão 40 dizem `Reenviar os 5 blocos`; nenhum HTML nem o `textos.md` tem *Regravar*
  - a sua: `Regravar os cinco blocos` → T09
  - a nossa: `Corrigir as N divergências` e `Reenviar os 5 blocos` → T09 (a última entrega; antes, `Regravar os cinco blocos`)
- **T11 · `tela.md`** — a decisão 40 e o seu `textos.md` dizem `Apenas registrar o diagnóstico`; nenhum HTML nem o `textos.md` tem *Só registrar*
  - a sua: `Só registrar o diagnóstico` → registra e volta ao menu
  - a nossa: `Apenas registrar o diagnóstico` (antes, `Só registrar o diagnóstico`) → registra o diagnóstico na sessão e volta ao menu; nenhum item entra na fila, porque o mock não tem onde (C11 · G25)
- **T13 · `animacao.md`** — pela T13·3, o veredito vem do toque em `Finalizar instalação`, com o que bloqueia resolvido — a sua diz que vem quando o último item passa
  - a sua: | veredito | o último item passa | o placar completa e o veredito aparece | 150ms | esmaece | aparece |
  - a nossa: | veredito | o toque em `Finalizar instalação`, com o que bloqueia resolvido (T13·3) | o placar completa e o veredito aparece | 150ms | esmaece | aparece |
- **T13 · `estados.md`** — o caso: a 09 desenha a bateria de 10,9 V (a sua resposta de 26/09), que é o `can-estatico-isolado`; o `can-fora-esperado` é a velocidade 0 km/h, sinal dinâmico, que o mock reserva à T14 (`mocks.js`:724) · o seu `casos.md` também liga o `can-fora-esperado` à T13/09
  - a sua: | `09-estado-item-reprovado` | estado | um item automático reprova | `can-fora-esperado` |
  - a nossa: | `09-estado-item-reprovado` | estado | um item automático reprova — a bateria abaixo do mínimo, na CAN | `can-estatico-isolado` (C10, T13-A1) |
- **T13 · `estados.md`** — pela T13·3, como o veredito da `animacao.md`, o homologado vem do toque em `Finalizar instalação`, e não de tudo passar
  - a sua: | `11-momento-homologado` | momento | tudo passa | `checklist` |
  - a nossa: | `11-momento-homologado` | momento | tocar em `Finalizar instalação`, com o que bloqueia resolvido (T13·3) | `checklist` |
- **T14 · `estados.md`** — qual é a entrada: pela G27 (C10), a T14 entra no 01, com a fila drenando, e o 00 é 6 s depois do disparo — a sua diz que o 00 é a entrada
  - a sua: | `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
  - a nossa: | `00-tela` | tela | 6 s depois do disparo: o prazo em 1:36, o instante antes de o evento chegar (C10 · G27: a entrada é a `01`) | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
- **T14 · `estados.md`** — o par da linha 00: a nossa diz que o 01 é a entrada da tela
  - a sua: | `01-momento-antes-do-disparo` | momento | a fila do módulo ainda drenando | `ciclo.mensagensGuardadas` |
  - a nossa: | `01-momento-antes-do-disparo` | momento | a entrada da tela: a fila do módulo ainda drenando (G27) | `ciclo.mensagensGuardadas` |
- **T15 · `tela.md`** — como o chrome da T04: a T15/03 e a 04 desenham a faixa *Sem sessão de configuração*
  - a sua: | **Chrome** | sem faixa ou com, conforme a sessão |
  - a nossa: | **Chrome** | a faixa da sessão aberta ou a faixa sem sessão, conforme a sessão — toda referência tem faixa (T15-A16) |
- **T16 · `estados.md`** — o caso: o 01 é o passo do corte, pedido porque o driver vl08 não reinicia por comando (T16·1) — a sua diz `autotesteEncerramento`, que é a lista que a 02 desenha; com a 02 dizendo `autotesteAssertivas`, parece a coluna do caso deslocada uma linha
  - a sua: | `01-momento-pede-o-corte-de-alimentacao` | momento | o passo do corte | `autotesteEncerramento` |
  - a nossa: | `01-momento-pede-o-corte-de-alimentacao` | momento | o passo do corte, na sessão do KNB-5H39 · M2C-0371, pelo endereço (T16·1) | `modelos · vl08 · reinicioPorComando: false` |
- **T16 · `estados.md`** — a 02 desenha as 8 assertivas do `autotesteEncerramento`; o `autotesteAssertivas` é a lista da bancada (o mock mantém as duas)
  - a sua: | `02-momento-sessao-encerrada` | momento | o autoteste passa | `autotesteAssertivas` |
  - a nossa: | `02-momento-sessao-encerrada` | momento | o autoteste passa | `autotesteEncerramento` |
- **T16 · `tela.md`** — em parte: pela T16·1, o corte só é pedido quando o driver não reinicia por comando — no herói, o passo corre sem pedir o corte
  - a sua: no passo do corte: o técnico desliga e religa a alimentação
  - a nossa: no passo do corte, só quando o driver não reinicia por comando (T16·1): o técnico desliga e religa a alimentação; no protótipo, o módulo volta sozinho no ritmo do passo

## 6. As perguntas desta entrega

O protótipo seguiu o padrão entre parênteses. Se o padrão estiver certo, basta confirmar.

1. **O painel aberto empurra o celular?** O quadro 04 desenha o celular e a coluna 90 à direita. O `MUDANCAS.md` diz *anda junto, como hoje*. O quadro 00 diz *não se mexe quando o painel abre*, e o `palco.md`, *por cima de tudo*. *(Padrão: o painel passa por cima, e nada se mexe.)* **Confirme**, ou diga se o conjunto anda os 90.
2. **A folha 00 tem a tabela da moldura velha.** Na tabela MEDIDAS E CORES, o CELULAR ainda diz *moldura de 8px, 376 × 816 por fora, raio 34 por fora, 26 por dentro*, e o ESTADO, *moldura #3A3350*. O desenho O CELULAR da mesma folha e a decisão 43 já dizem o novo. **Pra corrigir na fonte.** O espécime O CELULAR também não é o celular em escala (metal 1,5, aro 4, fio 0,5, contra 1,2, 3,9 e 0,4): fica a 1,6%.
3. **O fio de dentro.** O `MUDANCAS.md` e os quadros desenham o fio de `rgba(255,255,255,0.04)` por dentro do metal, e a linha do celular no `palco.md` só diz o de fora. *(Padrão: o fio de dentro entra.)* **Pra corrigir na fonte.**
4. **As cores da moldura** ficam em `rgb()` no protótipo, com o hex no comentário, porque a nossa régua reprova hex no código. É o mesmo número. *(Padrão: como está.)*
5. **O quadrado pressionado e com foco** (folha 00). A folha acende o ícone e, no pressionado, a borda. O palco sobe o fundo um degrau no pressionado e põe só o anel no foco, com o ícone apagado. *(Padrão: o do palco.)* **Confirme**, ou mande acender o ícone.
6. **A linha do painel pressionada** (folha 00). A folha desenha o fundo `--fundo-cartao`; o palco usa o `--elevado`, o degrau do pressionado do `movimento.md`. *(Padrão: o `--elevado`.)* **Confirme.**
7. **As telas sem coluna** (folha 00). A folha diz *T01, T02 e T08 não mostram coluna*. A T01 tem 8 estados e a T02 tem 3, e o palco mostra a coluna das duas, porque o `palco.md` diz que só a tela sem estados fica sem ela. Só a T08 fica sem. **Pra corrigir na fonte.**
8. **O aviso do app parado.** Com uma moldura só, a piscada do `Voltar ao fluxo` é o único aviso. *(Padrão: só o toque no app pisca; abrir, trocar ou fechar um estado não pisca.)* **Confirme.**
9. **A T07/03** não tem a barra, porque não se constrói. **Preciso de:** a referência nova do domínio mudo, com um ônibus ma-02.
10. **O nome do passo pulado pro leitor de tela.** A referência 03 não dá nome ao traço. *(Padrão: o traço fica mudo, e a palavra ao lado diz *pulado*.)* **Confirme.**
11. **A folga da T06.** Saiu a margem da linha da correção de cadastro (02 e 07). O par que bate (01) e a trava (04 a 06) também são os últimos antes do rodapé, e as suas referências novas ainda os desenham com 16. *(Padrão: como as referências.)* **Confira** se eles também perdem a margem.
12. **Os ícones da barra.** O desenho de dentro de cada ícone fica no código, na medida da ficha; o tamanho de cada um e o traço do Wi-Fi viraram token. Dois tokens da barra velha ficaram sem uso. *(Padrão: ficam, marcados, como os outros sem uso.)*

## 7. O que ficou pendente

- **seu:** as 19 decisões da seção 5 e a linha da T10 que saiu · a tabela da folha 00, o fio de dentro no `palco.md` e a frase das telas sem coluna · o quadro 04 · a referência da T07/03 · as confirmações da seção 6.
- **decidido pelo diretor (26/09), já no ar:**
  - o censo dos tokens: ficam os **294** — os 287 da junção e sete da barra —, com os dois tokens velhos da barra marcados como sem uso, como o projeto faz com os outros; o `CLAUDE.md` e o README do design system dizem 294;
  - a entrega subiu (commit `363db13`);
  - o `05-recursos/README.md`, o `06-prototipo/CLAUDE.md` e o comentário do topo do `tokens.css` agora falam também da Google Sans, recortada, só na hora da barra.
- **em aberto, só se você quiser:** o `tokens.json` passar a levar a descrição de cada token, como o seu — mudaria os 294 de uma vez.

Obrigado.
