# Gate C13 · A auditoria de fidelidade

**Data:** 2026-09-27 · **Estado: fechado (27/09).** A auditoria rodou a régua inteira, uma de cada vez, contra as bases do C12 e da empresa antes da unidade: as 147 referências, os textos das 16 telas, os 127 espécimes das 8 folhas e os 5 quadros do palco, com o palco em sete janelas. Cada diferença tem um desvio nomeado, e o *Está pronto quando*, no fim, está marcado. O commit e o push ficam com o diretor. · **Antes:** a execução foi pedida direto pelo diretor, com o formato do gate do C12; nenhuma decisão nova foi preciso tomar — o que a auditoria achou são nomes que faltavam e uma nota velha da régua do palco.

## O censo

- **as referências:** 147 — 16 telas, 63 momentos e 68 estados, 147 HTML e 147 PNG (`02-telas/indice.json`)
- **as folhas:** 8, com 127 espécimes registrados na bancada (`scripts/especime.mjs`)
- **os quadros do palco:** 5 (`06-prototipo/palco/referencias`), medidos em 21 peças, 5 textos e 38 números da moldura
- **os textos:** os 16 `textos.md`, 147 blocos
- **os tokens:** 295 no `tokens.css` · **o gate do mock:** 196 checagens
- **as bases de comparação:**
  - as telas: `app/prints/linha-de-base-400.json` (147, 41 em 0% do HTML)
  - os espécimes: `app/prints/tmp/c12/especimes-depois.json` (127)
  - o palco: `app/prints/linha-de-base-palco.json` (21 peças)
  - os textos: os logs do fechamento do C12, `app/prints/tmp/c12/fecho/textos-T*.log`
- **os documentos onde um desvio mora:** o `CHANGELOG.md`, o `para-o-arquiteto/diferencas.md`, a `tela.md` e a `estados.md` de cada tela (as anotações *no protótipo*), os gates (as G do C0, as C12·n do C12) e a `decisoes-do-diretor.md`

## Como foi medido

Uma régua pesada de cada vez, com o dev server em :5173 e os dois fotógrafos no ar (nenhum travou). Os logs estão em `app/prints/tmp/c13/`.

1. `node scripts/tela.mjs todas prints/linha-de-base-400.json` → `telas.log` e `telas-relatorio.json`
2. **onde está cada diferença:** um leitor das imagens de diferença que o `tela.mjs` grava (`caixas.mjs`) agrupa os pixels que a régua conta em caixas, em px do celular (`caixas.txt`); e um lado a lado do HTML, do app e da diferença, num recorte (`lado.mjs`, as `lado-T*.png`). Onde o nome não era óbvio, olhei a imagem: 25 recortes, da T01 à T16
3. `node scripts/textos.mjs <T>` nas 16 telas → `textos-T*.log`, comparados um por um com os do C12
4. `node scripts/especime.mjs todos` → `especimes.log` e `especimes-relatorio.json`, contra a base do C12; e o mesmo leitor de caixas pros espécimes (`caixas-esp.mjs`)
5. `node scripts/palco.mjs prints/linha-de-base-palco.json` → `palco.log`; `node scripts/provas-palco.mjs medidas` (1440 × 900 e 1920 × 1080) → `provas-palco.log`; e o palco em mais cinco janelas pelo `?medir=1` (`larguras.mjs`) → `larguras.log`
6. `npm run checar`, `npm run build` e `node ../../04-dados/gate-cobertura.js` → `checar.log`, `build.log`, `gate.log`, no começo e de novo no fim

## O resultado

### As 147 referências

- **147 referências, 41 em 0% do HTML, 0 com erro, nenhuma foto preta.** As 147 são **iguais à base nos três números** — o fino e o estrutural contra o HTML, e o fino contra o PNG. A soma contra o HTML é a mesma de antes, 46,74 pontos
- **106 com diferença contra o HTML, e as 106 com o desvio nomeado.** Nenhuma ficou sem nome, e nenhuma é erro do protótipo:
  - **60 só com os glifos do Lucide** contra os desenhados à mão (G5): a diferença cai só nas caixas de 18 ou 24 px dos glifos, e em nenhum outro pixel. São as 11 da T05, as 5 da T09, a T03/00, 02 e 03, e quase toda a T11, a T12, a T13, a T14 e a T16
  - **46 com mais um desvio** além do glifo, ou no lugar dele: o valor do mock (G9, 28 referências), o fundo das folhas e dos diálogos (G25, 13), o traço de 2 por cima da borda (C12·22 e C12·45, 10), o relógio parado da T01 (T01·1, 5), a tinta da escolhida (2), o marcador da T14/05 (1) e a T07/03 que não se constrói (1)
- **contra o PNG**, as 147 ficam de 0,27% a 11,24%: é a rasterização do gerador do design somada ao que está acima; o HTML é a régua, e o PNG, o gabarito de olhar (G17)
- **o que ganhou nome agora:** a pausa do Lucide na T16/04 e na T16/06 — dois retângulos, contra os dois traços feitos à mão das referências — já estava dentro da G5, e agora tem a linha dela, na `tela.md` da T16. Nenhuma das outras 104 precisou de nome novo

**Os desvios, e onde cada um está escrito** (a última coluna é quantas referências o levam):

| código | o desvio | onde está escrito | refs |
|---|---|---|---|
| G5 | os glifos do Lucide contra os desenhados à mão (G5) | gate-C0 · G5; CHANGELOG, a bancada de cada ciclo de tela | 77 |
| G5 · lupa | a lupa do Lucide na busca (G5) | gate-C0 · G5; CHANGELOG 25/09, a otimização fechada | 5 |
| G5 · câmera | a câmera do Lucide no visor (G5) | gate-C0 · G5; CHANGELOG 25/09, a entrega do checklist | 3 |
| G5 · pausa | a pausa do Lucide no poço (G5) | T16 tela.md · a pausa (C13) | 2 |
| C12·22 | o traço de 2 por cima da borda: o texto não sobe meio pixel (C12·22) | gate-C12 · C12·22; diferencas · O C12 | 9 |
| C12·45 | o campo do painel com o traço por cima (C12·45) | gate-C12 · C12·45; diferencas · O C12 | 1 |
| T01·1 | o prazo e o reenvio cheios, 10:00 e 60 s, contra o instante da referência (T01·1) | T01 tela.md; CHANGELOG C4 | 4 |
| T01·1 · teto | o teto: o prazo em 10:00, contra o 9:41 da referência (T01·1) | T01 tela.md · o teto | 1 |
| G25 · o fundo | a folha ou o aviso por cima da tela de onde nasceu, e não do vazio (G25) | CHANGELOG C4 | 3 |
| a tinta da escolhida | o nome da escolhida na tinta da escolha, e a referência na das outras | T02 tela.md; CHANGELOG 27/09; diferencas · A empresa sempre antes | 2 |
| G9 · Caruaru | o caso é a baixa do Pátio Caruaru, e a referência desenha a Várzea (G9) · o sem sinal com o fio escuro | CHANGELOG C4; CHANGELOG 26/09, a última entrega | 1 |
| G9 · Últimas instalações | o Últimas instalações liberado, porque o mock dá rede (G9) | CHANGELOG C5 | 15 |
| G9 · a fila | a fila com os 2 que faltam, que a referência não desenha (G9) | CHANGELOG C5 | 2 |
| G25 · o menu atrás | o menu atrás do véu, e a referência desenha o vazio (G25) | CHANGELOG C5 | 8 |
| G9 · 10 no pacote | 10 no pacote, a Várzea do mock, e a referência desenha 5 (G9) | CHANGELOG C8; CHANGELOG 25/09 | 3 |
| G9 · KUD-4Y21 | o KUD-4Y21 do caso, e a referência desenha o ONK-8Q90 (G9) | CHANGELOG C8 | 1 |
| T07·1 a | não se constrói: a referência é de outro modelo (T07·1 a) | CHANGELOG C8; diferencas | 1 |
| G9 · a releitura | 1.180 rpm e 9,4 L/h do mock, e a referência 980 e 24,8 (G9) | CHANGELOG C8 | 1 |
| G9 · três grandezas | três segmentos, as três grandezas do modelo, e a referência desenha dois (G9) | CHANGELOG C9 | 1 |
| G25 · a conferência atrás | o véu sobre a conferência, e a referência o desenha sobre o vazio (G25) | CHANGELOG 26/09, a última entrega | 1 |
| G9 · a i-02 | a i-02 do mock só tem o resumo: três etapas e sem o nome (G9) | T12 tela.md e estados.md; diferencas | 2 |
| G9 · 1 de 4 | 1 de 4, a ordem do mock, e a referência 2 de 4 (G9) | CHANGELOG 26/09, a última entrega; diferencas | 1 |
| G25 + G9 · o checklist atrás | o checklist atrás do véu (G25) e o par do caso, M2C-0371 e KNB-5H39 (G9) | CHANGELOG 25/09, a entrega do checklist | 1 |
| o marcador da T14/05 | o marcador da escala em 80%, no fim do preenchido, e a referência em 60% | T14 tela.md; CHANGELOG 26/09, a última entrega | 1 |
| G9 · o recorte | o recorte inteiro da fila, e a referência o topo (G9) | CHANGELOG C11; CHANGELOG 26/09, a última entrega | 1 |
| G9 · 10/03 | 10/03, 10:05, do mock, e a referência ontem 10:05 (G9) | CHANGELOG C11; CHANGELOG 26/09, a última entrega | 1 |

**As 147, uma por uma** (o fino contra o HTML e contra o PNG, e o código do desvio na tabela acima):

| referência | HTML | PNG | desvio |
|---|---|---|---|
| T01/00-tela | 0% | 0,28% | — |
| T01/01-estado-usuario-ou-senha-incorretos | 0,01% | 0,51% | G5 |
| T01/02-momento-recuperar-escolher-canal | 0,11% | 1,26% | C12·22 |
| T01/03-momento-recuperar-digitar-codigo | 0,52% | 1,27% | T01·1 |
| T01/04-momento-nao-recebi-o-codigo | 2,18% | 2,53% | G25 · o fundo + T01·1 |
| T01/05-momento-codigo-errado | 0,35% | 1,34% | C12·22 + T01·1 |
| T01/06-estado-codigo-expirado | 0% | 0,83% | — |
| T01/07-estado-tentativas-esgotadas | 0,28% | 1,35% | C12·22 |
| T01/08-momento-recuperar-nova-senha | 0,03% | 1,43% | C12·22 + G5 |
| T01/09-momento-senha-alterada | 2,35% | 3,19% | G25 · o fundo |
| T01/10-momento-senha-visivel | 0,01% | 0,27% | C12·22 + G5 |
| T01/11-momento-nao-recebi-reenvio-liberado | 2,05% | 2,41% | G25 · o fundo + T01·1 |
| T01/12-momento-codigo-reenviado | 0% | 0,88% | — |
| T01/13-momento-codigo-no-e-mail | 0% | 0,94% | — |
| T01/14-estado-login-sem-conexao | 0% | 0,43% | — |
| T01/15-estado-primeiro-acesso | 0% | 0,28% | — |
| T01/16-estado-usuario-lembrado | 0% | 0,28% | — |
| T01/17-estado-teto-de-envios | 0,51% | 1,31% | T01·1 · teto |
| T01/18-estado-outro-usuario-no-aparelho | 0% | 1,42% | — |
| T02/00-tela | 0% | 1,09% | — |
| T02/01-momento-escolhida | 0% | 1,08% | — |
| T02/02-estado-lista-longa-com-busca | 0,01% | 1,74% | G5 · lupa |
| T02/03-momento-busca-sem-resultado | 0,02% | 0,66% | G5 · lupa + C12·22 |
| T02/04-momento-busca-esconde-a-escolha | 0,02% | 0,71% | G5 · lupa + C12·22 |
| T02/05-estado-escolher-a-empresa | 0% | 0,84% | — |
| T02/06-estado-unidades-com-trocar-empresa | 0% | 1,13% | — |
| T02/07-momento-empresa-escolhida | 0,17% | 0,9% | a tinta da escolhida |
| T02/08-estado-uma-empresa-ja-marcada | 0,17% | 0,68% | a tinta da escolhida |
| T02/09-momento-unidade-escolhida-com-trocar-empresa | 0% | 1,11% | — |
| T03/00-tela | 0,01% | 0,89% | G5 |
| T03/01-estado-falha-de-rede | 0,18% | 1,87% | G9 · Caruaru + G5 |
| T03/02-momento-concluido | 0,02% | 1,37% | G5 |
| T03/03-estado-pacote-de-4-dias | 0,01% | 1,05% | G5 |
| T03/04-estado-pacote-vencido | 0% | 1,1% | — |
| T04/00-tela | 0,37% | 1,03% | G5 + G9 · Últimas instalações |
| T04/01-momento-sem-modulo | 0,5% | 1,6% | G5 + G9 · Últimas instalações + G9 · a fila |
| T04/02-momento-modulo-sem-ativo | 0,44% | 1,43% | G5 + G9 · Últimas instalações + G9 · a fila |
| T04/03-estado-faixa-modulo-com-falha | 0,37% | 0,94% | G5 + G9 · Últimas instalações |
| T04/04-estado-checklist-pendente | 0,37% | 1,05% | G5 + G9 · Últimas instalações |
| T04/05-momento-folha-conta | 0,75% | 1,42% | G25 · o menu atrás + G5 + G9 · Últimas instalações |
| T04/06-momento-folha-conta-sair-com-sessao-aberta | 1,24% | 2,16% | G25 · o menu atrás + G5 + G9 · Últimas instalações |
| T04/07-momento-folha-trocar-de-garagem | 0,97% | 1,77% | G25 · o menu atrás + G5 + G9 · Últimas instalações |
| T04/08-estado-folha-trocar-de-garagem-envio-em-andamento | 0,97% | 1,73% | G25 · o menu atrás + G5 + G9 · Últimas instalações |
| T04/09-estado-folha-trocar-de-garagem-com-modulo-conectado | 1,24% | 2,51% | G25 · o menu atrás + G5 + G9 · Últimas instalações |
| T04/10-momento-folha-modulo-conectado | 0,71% | 1,91% | G25 · o menu atrás + G5 + G9 · Últimas instalações |
| T04/11-momento-folha-ativo-da-sessao | 0,71% | 2,49% | G25 · o menu atrás + G5 + G9 · Últimas instalações |
| T04/12-estado-acesso-vencendo | 0,34% | 1,47% | G5 + G9 · Últimas instalações |
| T04/13-momento-encerrar-antes-de-homologar | 0,32% | 1,66% | G5 + G9 · Últimas instalações |
| T04/14-estado-folha-trocar-de-unidade-com-empresa | 0,75% | 1,59% | G25 · o menu atrás + G5 + G9 · Últimas instalações |
| T05/00-tela | 0% | 0,91% | — |
| T05/01-momento-nenhum-escolhido | 0% | 1,26% | — |
| T05/02-momento-um-encontrado | 0% | 0,85% | — |
| T05/03-estado-nenhum-encontrado | 0% | 0,9% | — |
| T05/04-estado-conexao-falhou | 0% | 1,47% | — |
| T05/05-momento-pre-checagem | 0,09% | 1,77% | G5 |
| T05/06-estado-pre-checagem-serial-nao-cadastrado | 0,05% | 2,43% | G5 |
| T05/07-estado-pre-checagem-modelo-sem-driver | 0,05% | 1,76% | G5 |
| T05/08-estado-pre-checagem-firmware-fora-da-matriz | 0,07% | 1,92% | G5 |
| T05/09-estado-firmware-fora-sem-rede-no-modulo | 0,07% | 2,13% | G5 |
| T05/10-momento-atualizando-o-firmware | 0,07% | 1,7% | G5 |
| T05/11-estado-pre-checagem-conteudo-nao-cabe | 0,08% | 1,75% | G5 |
| T05/12-estado-pre-checagem-pool-de-cercas-esgotado | 0,09% | 1,85% | G5 |
| T05/13-estado-pre-checagem-canal-aberto-e-pendencias | 0,09% | 1,98% | G5 |
| T05/14-estado-pre-checagem-link-perdido-na-6a | 0,09% | 1,35% | G5 |
| T05/15-estado-pre-checagem-modulo-em-repouso-na-9a | 0,1% | 1,36% | G5 |
| T05/16-estado-bluetooth-desligado | 0% | 0,76% | — |
| T05/17-estado-bluetooth-sem-permissao | 0% | 0,77% | — |
| T06/00-tela | 0,43% | 1,93% | G9 · 10 no pacote + G5 |
| T06/01-momento-confirmar-o-veiculo | 0% | 0,91% | — |
| T06/02-estado-chassi-divergente | 0% | 1,48% | — |
| T06/03-estado-sem-chassi-na-can | 0% | 1,63% | — |
| T06/04-estado-fora-do-pacote | 0,57% | 1,19% | G9 · KUD-4Y21 |
| T06/05-estado-conflito-de-pinos-resolvivel | 0% | 0,96% | — |
| T06/06-estado-conflito-de-pinos-sem-saida | 0% | 0,97% | — |
| T06/07-momento-correcao-solicitada | 0,01% | 1,53% | G5 |
| T06/08-momento-busca-sem-resultado | 0,03% | 0,66% | G5 · lupa + G9 · 10 no pacote + C12·22 |
| T06/09-momento-busca-esconde-a-escolha | 0,02% | 0,65% | G5 · lupa + G9 · 10 no pacote + C12·22 |
| T07/00-tela | 0% | 2,14% | — |
| T07/01-estado-fora-da-faixa | 0% | 3,12% | — |
| T07/02-estado-sem-leitura | 0% | 2,29% | — |
| T07/03-estado-dominio-mudo | 11,41% | 11,24% | T07·1 a |
| T08/00-tela | 0% | 1,88% | — |
| T08/01-momento-relendo | 0% | 1,93% | — |
| T08/02-momento-concluida | 0,15% | 2,44% | G9 · a releitura |
| T09/00-tela | 0,06% | 2% | G5 |
| T09/01-estado-bloco-recusado | 0,04% | 1,77% | G5 |
| T09/02-estado-queda-na-cadeia | 0,04% | 1,83% | G5 |
| T09/03-estado-recuperacao-ate-a-conexao-gravar | 0,06% | 1,91% | G5 |
| T09/04-momento-cadeia-concluida | 0,07% | 2,47% | G5 |
| T10/00-tela | 0% | 1,52% | — |
| T10/01-momento-hodometro-semeado | 0,01% | 1,51% | G5 |
| T10/02-estado-rotacao-caminhao-coletor | 0,16% | 1,22% | G9 · três grandezas |
| T10/03-estado-ja-semeado | 0% | 1,49% | — |
| T10/04-estado-modulo-sem-pulsos | 0% | 1,23% | — |
| T10/05-momento-hodometro-digitado | 0,04% | 1,53% | C12·45 |
| T10/06-momento-camera-do-painel | 0,14% | 1,06% | G5 · câmera |
| T10/07-momento-painel-fotografado | 0% | 1,43% | — |
| T10/08-momento-horimetro | 0% | 1,5% | — |
| T10/09-momento-calibracao-completa | 0,01% | 1,59% | G5 |
| T10/10-estado-releitura-nao-confere | 0% | 1,5% | — |
| T10/11-estado-camera-sem-permissao | 0% | 1,02% | — |
| T11/00-tela | 0,03% | 2,81% | G5 |
| T11/01-estado-conteudo-que-o-app-nao-reconhece | 0,03% | 1,68% | G5 |
| T11/02-momento-tudo-confere | 0,03% | 1,42% | G5 |
| T11/03-momento-outras-acoes | 2,14% | 2,72% | G25 · a conferência atrás |
| T11/04-estado-versao-ilegivel | 0,04% | 2,64% | G5 |
| T12/00-tela | 0,04% | 1,52% | G5 |
| T12/01-momento-detalhe-da-instalacao | 0,07% | 1,57% | G5 |
| T12/02-estado-nenhuma-instalacao | 0% | 0,8% | — |
| T12/03-estado-sem-rede | 0,04% | 1,17% | G5 |
| T12/04-estado-criterio-indisponivel | 1,27% | 2,16% | G9 · a i-02 |
| T12/05-estado-criterio-pendente | 1,28% | 2,22% | G9 · a i-02 |
| T13/00-tela | 0,04% | 2,2% | G5 |
| T13/01-momento-a-identificacao-aberta | 0,05% | 2,06% | G5 |
| T13/02-momento-b-montagem-aberta | 0,03% | 1,78% | G5 |
| T13/03-momento-c-hardware-aberta | 0,05% | 1,98% | G5 |
| T13/04-momento-d-configuracao-aberta | 0,05% | 1,85% | G5 |
| T13/05-momento-e-teste-dinamico-aberta | 0,04% | 2,22% | G5 |
| T13/06-momento-f-servidor-aberta | 0,05% | 2,36% | G5 |
| T13/07-momento-responder-item | 0,14% | 1,32% | G5 · câmera |
| T13/08-momento-nao-conforme-com-justificativa | 0,14% | 1,6% | G5 · câmera |
| T13/09-estado-item-reprovado | 0,45% | 1,88% | G9 · 1 de 4 |
| T13/10-estado-finalizar-com-a-secao-f-falhando | 1,73% | 2,43% | G25 + G9 · o checklist atrás |
| T13/11-momento-homologado | 0,04% | 2,8% | G5 |
| T13/12-momento-b-com-ressalva | 0,03% | 1,87% | G5 |
| T13/13-momento-e-resolvida | 0,05% | 2,02% | G5 |
| T13/14-estado-homologado-sem-localizacao | 0,04% | 2,24% | G5 |
| T13/15-momento-problema-fotografado | 0% | 1,46% | — |
| T14/00-tela | 0,05% | 2,14% | G5 |
| T14/01-momento-antes-do-disparo | 0,05% | 2,62% | G5 |
| T14/02-estado-prazo-estourado | 0,04% | 2,11% | G5 |
| T14/03-estado-dinamico-fora-do-esperado | 0,05% | 2,4% | G5 |
| T14/04-estado-identificador-divergente | 0,06% | 2,63% | G5 |
| T14/05-momento-ciclo-concluido | 0,09% | 2,35% | o marcador da T14/05 + G5 |
| T14/06-momento-correcao-solicitada | 0,06% | 2,57% | G5 |
| T15/00-tela | 0,02% | 1,06% | G5 |
| T15/01-estado-sem-erro | 4,83% | 5,2% | G9 · o recorte |
| T15/02-estado-dois-erros | 0,06% | 2,46% | G9 · 10/03 + G5 |
| T15/03-estado-fila-vazia | 0% | 0,49% | — |
| T15/04-estado-secao-f-em-re-checagem | 0,01% | 0,71% | G5 |
| T16/00-tela | 0,05% | 1,68% | G5 |
| T16/01-momento-pede-o-corte-de-alimentacao | 0,06% | 1,63% | G5 |
| T16/02-momento-sessao-encerrada | 0,06% | 3,2% | G5 |
| T16/03-momento-encerrando-sem-homologar | 0,02% | 2,8% | G5 |
| T16/04-momento-encerrada-sem-homologar | 0,05% | 1,57% | G5 · pausa + G5 |
| T16/05-estado-assertiva-falhando | 0,06% | 2,33% | G5 |
| T16/06-estado-sessao-interrompida | 0,06% | 1,2% | G5 · pausa + G5 |

### Os textos

- **as 16 telas: as mesmas 31 referências com diferença do C12, e nenhuma nova.** Os logs são iguais aos do fechamento do C12 em 15 telas; a T02 ganhou as duas da empresa antes da unidade (a 08 e a 09), e as duas conferem. Conferem inteiras a T02, a T05, a T09, a T10, a T11, a T14 e a T16
- **as 31, com o desvio de cada uma:**

| tela | referências | o que a régua acusa | o desvio | onde está escrito |
|---|---|---|---|---|
| T01 | 03, 04, 05 | o prazo e o reenvio: 10:00 e 60 s, contra 9:41, 0:44, 9:28 e 44 s | T01·1 | T01 `tela.md`; CHANGELOG C4 |
| T01 | 17 | o prazo do teto: 10:00, contra 9:41 | T01·1 | T01 `tela.md` · o teto |
| T01 | 18 | *falta* as unidades da T02 atrás do diálogo (14 textos) | a régua não lê o que fica inerte atrás do véu, e o `textos.md` da 18 lista o fundo · **nome novo (C13)** | T01 `tela.md` · a régua dos textos na 18 |
| T03 | 01 | Pátio Caruaru, 0 de 6, o pacote de 04/03, contra a Várzea | G9 | CHANGELOG C4 |
| T04 | 00, 03, 04 | *falta* `sem conexão` | G9 · Últimas instalações | CHANGELOG C5 |
| T04 | 01, 02 | *falta* `espera conexão`, *sobra* o `2` da fila | G9 · Últimas instalações e a fila | CHANGELOG C5 |
| T04 | 05, 07, 08, 10, 11, 14 | *sobra* `Menu`, o h1 escondido | o h1 *Menu* em todas as telas do menu (a resposta de 26/09) | T04 `tela.md`; CHANGELOG 26/09, a última entrega |
| T04 | 12, 13 | *falta* o menu atrás do diálogo (19 textos) | a régua não lê o que fica inerte atrás do véu, e o `textos.md` das duas lista o fundo · **nome novo (C13)** | T04 `tela.md` · a régua dos textos na 12 e na 13 |
| T06 | 00, 08, 09 | `10` no pacote, contra `5`, e na 00 os cinco ônibus a mais | G9 · 10 no pacote | CHANGELOG C8; CHANGELOG 25/09 |
| T06 | 04 | KUD-4Y21, do Pátio Caruaru, contra o ONK-8Q90 | G9 | CHANGELOG C8 |
| T07 | 03 | só o nome e o rótulo do estado | T07·1 a, não se constrói | CHANGELOG C8 |
| T08 | 02 | 1.180 e 9,4, contra 980 e 24,8 | G9 | CHANGELOG C8 |
| T12 | 04, 05 | sem as seis etapas e sem *Rafael Vieira* | G9 · a i-02 | T12 `tela.md` e `estados.md` |
| T13 | 09 | `1` de 4, contra `2` | G9 · a ordem do mock | CHANGELOG 26/09, a última entrega |
| T13 | 10 | M2C-0371 e KNB-5H39, o par do caso | G9 | CHANGELOG 25/09, a entrega do checklist |
| T15 | 01 | o recorte inteiro, com a quinta linha | G9 · o recorte | CHANGELOG C11; CHANGELOG 26/09 |
| T15 | 02 | `10/03, 10:05`, contra `ontem 10:05` | G9 | CHANGELOG C11; CHANGELOG 26/09 |

- **o que ganhou nome agora:** três das 31 — a T01/18, a T04/12 e a T04/13. O C12 as contava como nomeadas, mas nenhum documento dizia por quê: o `textos.md` delas lista também a tela atrás do diálogo, e a régua dos textos pula o que fica inerte atrás do véu (G25, desde o C4). O diálogo confere nas três, e o quadro inteiro está a 0%, 0,34% e 0,32% do HTML. É a régua, e não o app. Os outros diálogos do menu (a T04/06 e a 09) têm o `textos.md` sem o fundo, e conferem

### As 8 folhas

- **127 espécimes, os mesmos do C12, e os 127 iguais à base um por um.** 75 em 0% e 52 acima
- **os três acima de 0,5%, cada um com o nome de antes:**
  - a *faixa · sem ação* (folha 2), **6,64%**: a peça é a casca da T16 inteira, 52 de altura, e a folha desenha só o miolo, 21 (G13, DS-D5 · CHANGELOG C2)
  - *a marca no login* (folha 6), **11,97%**: a peça segue a T01/00, com a logo, e o espécime da folha não tem a logo que a legenda dele pede (CHANGELOG C2 · o pedido ao arquiteto)
  - *o valor alvo* (folha 8), **1,5%**: o campo do painel com o traço de 2 por cima da borda, 360 × 160 contra 161 (C12·45)
- **a câmera do app** (folha 7), 0,5%: a câmera do Lucide (G5 · CHANGELOG 25/09, a entrega do checklist)
- **os outros 48, de 0,01% a 0,27%:** a diferença cai só na caixa do glifo — o leitor de caixas acha, em cada um, uma a oito caixas de 6 a 24 px, todas no lugar do glifo do Lucide, e nenhum pixel fora delas (G5 · CHANGELOG C2: *0 pixel fora da caixa do svg*). O *parou aqui* da folha 4 (0,11%) é a mesma pausa da T16

### Os 5 quadros do palco

- **21 peças, 4 em 0%, 0 com erro, e nenhuma pior que a base.** Cada peça acima de 0 leva a nota da régua, com o desvio nomeado: o quadro inteiro, que só informa (o celular a 90% com o PNG dentro, G19, PALCO-A11, PALCO-A14); o quadrado com o `LayoutGrid` do Lucide (G5); a coluna com o quadrado vazado de 11 (a lei do marcador, decisão 15), com todos os estados da tela (PALCO-A4, PALCO-D3) e com os 13 estados da T05 (PALCO-A7); o painel com o X e o `RotateCcw` do Lucide (G5); e a miniatura da moldura na escala da folha 00
- **5 textos: 3 conferem, e os 2 que não conferem têm a nota** (a coluna da T04 com todos os estados, e a da T05 sem o momento *Um encontrado* e com os dois do Bluetooth)
- **a moldura: 38 de 38 números batem** — os 386 × 826, o metal de 3, o aro de 10, os cantos de 57 e 44, os dois fios, o centro da janela e a coluna a 40, com a altura do celular
- **o palco em sete janelas**, contra o `palco.md`:

| janela | o celular | a escala | a coluna | o que o `palco.md` pede |
|---|---|---|---|---|
| 1920 × 1080 | 767, 127 · 386 × 826 | 1 | a 40, 826 de altura | tamanho real, no centro · confere (`provas-palco.mjs`) |
| 1440 × 900 | 527, 37 · 386 × 826 | 1 | a 40, 826 de altura | tamanho real, no centro · confere (`provas-palco.mjs`); o painel aberto não mexe o celular nem a coluna |
| 1366 × 768 | 515, 24 · 336 × 720 | 0,872 | a 40, 720 de altura | em escala pra caber, com 24 em cima e embaixo, no centro · confere |
| 1280 × 720 | 483, 24 · 314 × 672 | 0,814 | a 40, 672 de altura | o mesmo · confere |
| 1024 × 768 | 344, 24 · 336 × 720 | 0,872 | a 40, 720 de altura | o mesmo; a largura ainda sobra (a escala sai da altura) · confere |
| 860 × 900 | a janela inteira | — | nenhuma | abaixo de 900, o app em tela cheia, sem moldura e sem coluna, e o quadrado no canto, a 16 · confere |
| 390 × 844 | a janela inteira | — | nenhuma | o mesmo · confere |

  Nas cinco janelas novas, o celular fica com a mesma folga dos dois lados, e o quadrado a 16 do canto, 44 × 44. Medido com a T04 e com a T07 num estado, que abre a coluna com o *Voltar ao fluxo*
- **`provas-palco.mjs medidas`: todas as provas batem** — a barra de 30 e o primeiro elemento em y = 30 nas 146 que se constroem (a T07/03 fica fora, T07·1 a), a hora na Google Sans sem pedido pra fora, a moldura, o centro e a coluna nas duas janelas largas, e as folgas da T16, da T06 e da T12

### O checar, o build e o gate

- `npm run checar`: **13 de 13**, no começo e no fim
- `npm run build`: aprova, no começo e no fim
- `node ../../04-dados/gate-cobertura.js`: **196 checagens**, aprova — zero `Math.random`, `Date.now` ou `new Date` no mock

## Os consertos

- **nenhum no app.** Nenhuma das 106 diferenças é erro do protótipo: nenhuma pede que o código faça diferente do que faz. Nenhum arquivo de `src/` mudou, e por isso nenhuma tela foi medida de novo
- **a nota da régua do palco** (`app/scripts/palco.mjs`, a nota do `01-no-fluxo/coluna`): dizia que o quadro lista *2 dos 5 estados da T04*, e a T04 tem 6 desde o `T04/14` (a empresa e a unidade). Agora diz *2 dos 6*. Só o texto da nota: o número medido é o mesmo, e o relatório do palco (`OS ACHADOS`, G) já dizia 6
- **o rótulo da régua das provas do palco** (`app/scripts/provas-palco.mjs`, o cabeçalho, o título da seção e a linha de progresso): dizia *nas 145*, de antes da empresa antes da unidade; a régua lê o índice e mede as 147. Agora diz 147 no cabeçalho e *nas referências do índice* no progresso. Só o texto

## Os desvios que ganharam nome agora

1. **a régua dos textos na T01/18, na T04/12 e na T04/13:** o `textos.md` lista a tela atrás do diálogo, e a régua não lê o que fica inerte atrás do véu · escrito na `tela.md` da T01 (junto do diálogo de outra sessão) e na da T04 (junto do h1 *Menu*) · pro arquiteto: os três `textos.md` no jeito dos outros diálogos, ou a régua ler o fundo nesses três
2. **a pausa do Lucide** (T16/04, T16/06 e o espécime *parou aqui* da folha 4): o `Pause` são dois retângulos, e as referências desenham dois traços à mão · escrito na `tela.md` da T16 · pro arquiteto: aceitar a pausa do Lucide, ou a folha 3 nomear o ícone

Os dois estão também no `CHANGELOG.md` (*2026-09-27 · C13, a auditoria de fidelidade*) e no `para-o-arquiteto/diferencas.md` (*O C13, a auditoria*).

## O que não faz sentido

- **contar como nomeado o que nenhum documento explica.** O fecho do C12 deu as 31 dos textos como *todas nomeadas*, e três delas não tinham a linha que dissesse por quê. A partir do C13, cada diferença leva o lugar onde o nome mora — é a tabela acima
- **a régua dos textos e o `textos.md` discordam sobre o que é o quadro:** a régua pula o que fica atrás do véu (o comentário dela diz que não é o quadro da referência), e três `textos.md` o trazem. Um dos dois muda; a pergunta está com o arquiteto

## O que fica sem resolver

- **as respostas que já estavam com o arquiteto e com o diretor**, e que a auditoria mediu iguais: a tinta da escolhida (T02/07 e 08), o fundo das folhas e dos diálogos (G25), o menu com ou sem rede (G9, o diretor), a referência nova da T07/03, o marcador da T14/05, os dois segmentos da T10/02, as etapas da i-02 (T12/04 e 05), o *2 de 4* da T13/09, o recorte da T15/01, e o quadro aceso com o texto subindo meio pixel (C12·22)
- **o `CLAUDE.md` da raiz diz 294 tokens**, e o `tokens.css` tem 295 desde o `--mov-fator` do C12: a linha é do diretor (anotado no `para-o-arquiteto/diferencas.md` · *A empresa sempre antes*)

## Está pronto quando

**Conferido no fechamento (27/09), item por item, com a régua inteira rodada uma de cada vez.**

- [x] **As 147 referências fotografadas, com o relatório de diferenças.** **Feito:** 147, 41 em 0% do HTML, 0 com erro, iguais à base nos três números; o relatório está em `app/prints/tmp/c13/telas-relatorio.json`, e a tabela, acima
- [x] **As 8 folhas fotografadas, com o relatório.** **Feito:** 127 espécimes, iguais à base do C12 um por um, 75 em 0%; `app/prints/tmp/c13/especimes-relatorio.json`
- [x] **Os 5 quadros fotografados, com o relatório.** **Feito:** 21 peças, nenhuma pior que a base, 38 de 38 na moldura, 5 textos sem falha, e o palco em sete janelas; `app/prints/tmp/c13/palco.log`, `provas-palco.log` e `larguras.log`
- [x] **Os textos das 16 telas.** **Feito:** as mesmas 31 do C12, cada uma com o desvio e o lugar onde ele mora
- [x] **Zero diferença sem desvio nomeado.** **Feito:** as 106 referências com diferença, as 31 dos textos, os 52 espécimes acima de 0 e as 17 peças do palco acima de 0 — cada uma com o nome e onde ele está escrito. Ganharam nome agora: as três dos textos atrás do diálogo e a pausa do Lucide
- [x] **A documentação segue o código:** a `tela.md` da T01, da T04 e da T16, o `CHANGELOG.md`, o `para-o-arquiteto/diferencas.md` e este gate
- [x] **`npm run checar`, `npm run build` e o gate do mock aprovam**, no fim. O commit fica com o diretor (nenhum `git` nesta tarefa)
