# As entregas do design, organizadas · o que o protótipo manteve e as cópias do design ainda não têm

As quatro pastas (`atualizacao/`, `atualizacao2/`, `atualizacao33/` e `atualizacao98/`) entraram no lugar, sem perder o que o protótipo e o diretor mudaram. Onde o design e o protótipo mudaram o mesmo arquivo, os dois foram juntados, e o que era só do protótipo ficou. **Pra próxima entrega não apagar nada, parta destes arquivos, e não da cópia antiga.**

As listas de peças e as referências são do design, como o pacote pede. A anotação de construção foi pra uma seção separada.

## Os números

| | o design diz | o protótipo mede | por quê |
|---|---|---|---|
| referências | 113 | 113 | igual · 16 telas, 47 momentos, 50 estados |
| tokens | 95 | **275** | o `tokens.css` tem também os tokens das peças, que o C2 e os ciclos de tela pediram (G3) |
| peças | 116 | **126** | as 116 do design, e mais 10 linhas que as folhas desenham e o design ainda não lista: o primário nos três estados, o link, a linha tocável, os glifos, os ícones de ferramenta, os poços, os marcadores e os botões só de ícone |
| cores | 23 | **25** | medido no C1 |
| casos no mock | 34 | **41** | os 7 acréscimos dos ciclos, só aditivos: `conferencia-confere`, `firmware-fora-sem-rede`, `can-estatico-hodometro-a22`, `instalacoes-vazia`, `fila-sem-erro`, `fila-dois-erros` e `fila-vazia` |

## Arquivo por arquivo

- **as listas de peças, da T03 à T10:** a seção *Peças do design system que esta tela usa* é a do design. A lista que o código usa, medida em cada ciclo, foi pra *No protótipo · as peças que o código usa*, logo embaixo. **Pra olhar:** várias listas do design têm peças que nenhuma referência da tela desenha. Na T01 e na T02, por exemplo, aparecem a justificativa, a linha da fila, a linha da re-checagem e as seções do checklist. Parece o gerador reconhecendo um bloco genérico
- **o `componentes.md`:** a tabela é a do design, com a *senha visível* nova. Embaixo, *No protótipo · o que o código mediu* tem as 91 linhas em que o protótipo mede diferente:
  - as 10 peças novas;
  - a *falha*, o *ainda não* e o *espera*, que estão desenhados na folha 4, e não na 1 e na 3;
  - as variantes nomeadas (G11) na regra;
  - as telas que usam cada peça, corrigidas pelo medido (G10)
- **as `leis.md`:** entraram a exceção do olho da senha na lei 14 e a área de toque na *nada encosta*. Ficaram as marcas ◆ do C1, a regra do traço por classe de ícone, e as leis do diretor R-14 (escolher marca, o botão avança) e R-15 (sem barra de rolagem do navegador)
- **o `logica.md`:** entraram as quatro linhas dos momentos novos da T01. Ficaram as seções que os ciclos escreveram (os contadores do menu, a escolha do ativo, a releitura, a cadeia, a conferência, o ciclo dinâmico e o checklist), o que se consome uma vez por sessão na T05, o encerramento, e o voltar do Android na T16. A linha do estado da lista longa da T02 foi pro caso novo `lista-longa-garagens`, como o `estados.md`
- **o `ciclos.md`:** fica o plano revisado no C0 e no C1, com os números novos (113 referências, 47 momentos)
- **o `pendencias.md`:** entraram as duas perguntas novas da T01. Ficaram as respostas que os ciclos deram (T06, T13, T14 e T16)
- **o `mocks.js` e o `casos.md`:** o caso novo entrou por cima dos 7 acréscimos, e o gate aprova, com 191 checagens
- **o `indice.json`:** as 113 referências do design, com os campos que o palco lê (`rotulo`, `rotuloOrigem` e `grupo`)
- **o `CLAUDE.md` da raiz, o `LEIA-PRIMEIRO.md`, os `README.md` e o `PROMPT-DE-ABERTURA.md`:** os números do design, com os do protótipo onde ele mede diferente (a tabela de cima)
- **entraram como vieram:** as referências novas e refeitas da T01 e da T02, as folhas 2 e 6, o `estados.md`, o `textos.md` e a `animacao.md` da T01, o `estados.md` e o `textos.md` da T02, as `historias.md`, e as decisões 31 e 32

## O que o pacote repetia

O `_changelog-para-colar.md` da `atualizacao33/` traz, embaixo da senha visível, as linhas da primeira entrega (a logo no lima, o *Lembrar meu usuário*, o checkbox marcado), que já estavam no registro. Entraram uma vez só. A `atualizacao98/` repete os itens 1 a 4 e o 7 da quarta entrega, que o protótipo já estava construindo.

## A entrega de 25/09 · a calibração com prova (`atualizacao180/`)

Os 67 arquivos entraram. O gate aprova, e o censo confere: **122 referências no `indice.json`** — 16 telas, 54 momentos e 52 estados. O que mudou em cada arquivo:

- **entraram como vieram** (o nosso era igual à sua cópia anterior): o `02-telas/README.md`, o `textos.md` da T01, o `estados.md` e o `textos.md` da T02, da T04 e da T06, a `animacao.md`, o `textos.md` e o `estados.md` da T10, o `PROMPT-DE-ABERTURA.md`, o `LEIA-PRIMEIRO.md`, o README das decisões e a decisão 33
  - no `estados.md` da T10 ficou, embaixo, a nota do C9 sobre o rótulo da caixa do que não se aplica (T10·5)
- **as 36 referências:** as 14 que substituem (a T01/01, as cinco da T10, as folhas 7 e 8, e o painel do palco) e as 22 novas
- **os `tela.md`, juntados** (a lista de peças é a sua; a medida fica na seção do protótipo):
  - **T01:** entrou o `Entrar` apagado dizendo *Digite a senha*;
  - **T02 e T06:** a busca sem resultado. Na T06, a nossa linha dizia *sem resultado, o cartão fica vazio e sem texto* (a T06·5), e agora diz o seu texto;
  - **T04:** o aviso do acesso e os números (7 momentos, 5 estados). O resto do *O que se toca* é o nosso, que já tinha o seu;
  - **T10:** o fluxo novo da decisão 33 vale. Saíram as linhas do C9 que ele desmente: a foto e o semear independentes (T10·3), o cartão da foto tocável e o horímetro sem referência. Ficaram a ordem das grandezas pelo cadastro (T10·1, T10·2), a volta de onde parou e o voltar;
  - **T15:** o `Ressincronizar e reenviar` passa a fazer o que você escreveu (os itens voltam pra fila e o envio recomeça), no lugar do *só o pressionado* do C11, e entrou a notificação da fila parada;
  - **T16:** as 8 legendas do encerramento, em cima das nossas linhas
- **o `componentes.md`:** a sua tabela inteira, com as 117 peças. Na seção do protótipo saiu a variante *tocável* da foto, que agora é o seu desenho · **127 peças no protótipo** (as suas 117 e as 10 que as folhas desenham e a tabela ainda não lista)
- **o `indice.json`:** as 122, com os campos do palco. Os dois estados novos ganharam o rótulo da coluna, proposto: *Acesso vencendo* e *Releitura não confere*
- **o `mocks.js`:** o caso `releitura-nao-confere` entrou por cima dos nossos 7 acréscimos · **42 casos** (os seus 35 e os 7)
- **o `logica.md`:** entraram as duas seções novas (a calibração com prova, o aviso do acesso), as linhas das referências novas nas duas tabelas, e o caminho do herói com o aviso e a calibração com a prova. Ficaram as nossas seções e o voltar do Android do C11, que é mais completo que o da sua cópia
- **o `palco.md`:** entrou só o grupo do caminho sem a T08. O resto da sua cópia desfazia três decisões do diretor (a coluna centralizada, o painel que não fecha ao escolher, a moldura igual no estado), e fica o nosso
- **os números:** o `CLAUDE.md`, os READMEs, o `ciclos.md` e o `pendencias.md` (a notificação de 30 min) · os tokens continuam **274**

### O que a construção da entrega de 25/09 achou

- **a tolerância do hodômetro:** o comentário do caso `releitura-nao-confere` e o `estados.md` da T10 dizem 120 m; o modelo do mock e a HU-T10-5 dão 140 m (a granularidade mais o decorrido). Os dois dão *não confere* pros 500 m, e a tela é a mesma
- **a folha 8** escreve *tinta apagada* no painel vazio e desenha `--marca-limite`: o código segue o desenho
- **a T06/08** desenha 5 no pacote; o mock da Várzea tem 10
- **o `Entrar` apagado** fica só no erro (a T01/01). Com a senha vazia fora do erro, a 00 desenha ele aceso
- **o singular:** com 1 dia, o título seria *vence em 1 dias*. Falta a forma do singular
- **o login com rede** devia renovar o acesso, e o mock mantém `abertaDiasAtras` 5
- **a câmera do app** é a mesma na T10 e na T13, e o DS não a lista. Proposta: uma peça na folha 7
- **a T16 e o número digitado:** a assertiva dos contadores mostra o painel do mock (482.317 km · 9.640 h), como o `estados.md` dela manda. Com a decisão 33, o número é o que o técnico digita; se ele digitar outro, a T16 diria que voltou um número que não foi semeado. Proposta: a T16 ler o que foi semeado

## A entrega do mundo real (`atualizacao000002/`)

Aplicada depois de a da calibração terminar, sem misturar as duas. Os 28 arquivos entraram. O gate aprova, e o censo confere: **126 referências no `indice.json`** — 16 telas, 54 momentos e 56 estados. A base de cada junção foi a sua cópia anterior, então o que entrou é exatamente o que você mudou agora:

- **entraram como vieram:** o `02-telas/README.md`, o `estados.md` e o `textos.md` da T01, o `textos.md` da T10, o `PROMPT-DE-ABERTURA.md` e o `LEIA-PRIMEIRO.md`
- **as 8 referências novas:** a T01/14, a T05/16 e 17, e a T10/11, em HTML e PNG
- **juntados, sem conflito:** o `tela.md` da T01 (o login sem conexão), o `estados.md` e o `textos.md` da T05, o `estados.md` e o `tela.md` da T10 (a câmera sem permissão), o `casos.md`, o `mocks.js` (os 4 casos novos, por cima dos nossos 7) e o `06-prototipo/CLAUDE.md` (as regras 10, 11 e 12)
- **juntados, com o que o protótipo já tinha:**
  - **o `tela.md` da T05:** entraram as duas linhas do Bluetooth, em cima das nossas. As suas outras 5 linhas eram a versão curta das nossas, que ficam;
  - **o `logica.md`:** entrou a seção *O mundo real* e a linha da T10/11. Ficaram as regras do aviso do acesso que a construção escreveu, e a nossa linha da T10/10, que explica a tolerância de 140 m (a sua diz 120);
  - **os números:** o `ciclos.md` e o README do design system com as 126 · as cores continuam 25, medidas no C1
- **o `indice.json`:** as 126, com os campos do palco. Os 4 estados novos ganharam o rótulo da coluna, proposto: *Login sem conexão*, *Bluetooth desligado*, *Bluetooth sem permissão* e *Câmera sem permissão*
- **os números do protótipo:** 56 estados, 274 tokens, 127 peças e **46 casos** (os seus 39 e os nossos 7)

### O que a construção do mundo real achou

As 4 referências novas dão 0% contra o HTML. O que falta no design pra elas ficarem inteiras:

- **o `indice.json`** trouxe a T05/16 e 17 sem o `grupo`, que a coluna da T05 exige: sem ele, os dois não apareciam no palco. O protótipo pôs os dois no *achar* (é a busca que não começa). Nas próximas entregas, todo estado novo da T05 precisa vir com o grupo
- **T05/17 com o botão virado:** o `Permitir`, negado de novo, vira `Abrir as configurações`, como a regra 12 manda. Nenhuma referência da T05 desenha esse quadro, e o texto não está no `textos.md` da T05 (o protótipo usa o da T10/11). Falta também dizer o que o app mostra na volta das configurações: o protótipo começa a busca
- **a câmera do checklist sem permissão:** falta a frase do que falta pro item (o análogo de *O app precisa da câmera pra fotografar o painel*) e o quadro inteiro da T13 nesse caso. O protótipo mostra só a câmera riscada
- **a localização negada:** nenhuma referência desenha o relatório do checklist (HU-T13-7), nenhum `textos.md` tem o *sem localização*, e o mock não tem a localização do celular nem um caso que a negue (o GPS do mock é o do módulo)
- **o aviso com o traço:** a T01/14 desenha o traço cinza embaixo do aviso neutro, e o `componentes.md` diz que o aviso não tem traço. O protótipo construiu uma variante nomeada
- **as peças sem linha no `componentes.md`:** a câmera do app (a mesma na T10 e na T13, com a variante sem permissão), a câmera riscada e o Bluetooth cortado
- **o `Esqueci a senha` sem internet:** a T01/14 não diz o que ele faz. No protótipo, segue como antes
- **os números:** um token entrou, a largura da explicação da câmera sem permissão (274 → **275**)

## A entrega do checklist numa estrutura só (`atualizacao56565/`)

Aplicada depois da do mundo real, sem misturar. Os 178 arquivos entraram. O gate aprova, e o censo confere: **129 referências no `indice.json`** — 16 telas, 56 momentos e 57 estados. A base de cada junção foi a sua cópia anterior. O que mudou em cada arquivo:

- **entraram como vieram:** o `02-telas/README.md`, o `textos.md` da T04 e da T10, o `PROMPT-DE-ABERTURA.md`, o `LEIA-PRIMEIRO.md`, o README das decisões e as decisões 34 e 35
- **as referências:** 135 substituídas e as 3 novas da T13 (12, 13 e 14), em HTML e PNG
- **os 15 `tela.md`:** a lista de peças é a sua; o *O que se toca* juntou sem perder o do protótipo. Dois pediram mão:
  - **T10:** fica o nosso *Semear* (mais completo, com o *Gravando* e o *Relendo*), e o horímetro termina no seu *Fazer o ciclo dinâmico* → T14 (decisão 35);
  - **T13:** entraram as suas 8 linhas da estrutura nova, e ficou a nossa da câmera sem permissão, que você confirmou. As regras do C10 ganharam um aviso: as que falam do placar, do mapa e dos cartões antigos são reescritas na construção da T13 nova
- **o `estados.md` e a `animacao.md` da T13 e da T11** (sem cópia anterior sua; juntei contra o C0): entraram os seus, e ficaram três correções medidas no C10 e no C11 — os casos certos da T13/09 (`can-estatico-isolado`) e da T13/10 (`pronto-para-fechar`), o homologado que chega pelo toque no *Finalizar*, e o reduzir da conferência da T11 no mesmo ritmo (G26). **Pra olhar:** a sua `animacao.md` da T13 ainda diz *o placar completa*, e o placar saiu
- **as `leis.md`:** entraram a lei 16 (*tem seta, toca*), *a faixa da sessão é uma peça só* e o *poço na linha* sem as exceções da T11 e da T15, e com o aviso fora dela. Ficaram as marcas ◆ e o *toque de 48*
- **o `componentes.md`:** a sua tabela inteira, com as 118 peças. Na seção do protótipo, as 9 linhas das peças que saíram (o placar, o mapa, os cartões de valor e de foto, as seções antigas) foram pra uma subseção, porque o código ainda as usa até a T13 ser refeita · **128 peças no protótipo**
- **o `mocks.js` e o `casos.md`:** o caso `localizacao-negada` · **47 casos** (os seus 40 e os nossos 7)
- **o `logica.md`:** entraram as suas seções *O checklist* e *O próximo passo depois da calibração*, e as linhas novas das tabelas. Ficaram as nossas do mundo real, do teclado, do retrato e da regra 12
- **o `indice.json`:** as 129, com os campos do palco; o estado novo ganhou o rótulo *Homologado sem localização*
- **os números:** o `CLAUDE.md`, o README do design system e o `ciclos.md` · 275 tokens, 25 cores

### O que a construção da T13 achou

A T13 nova está em 0,03 a 0,05% contra o HTML nas 11 referências das seções e do homologado, e o resto é o glifo do Lucide (G5). O que a entrega não desenha, ou desenha de dois jeitos, o protótipo resolveu com as peças dela, e espera o seu desenho:

- **o automático que falta** (no caminho do herói, nada falta em A, C e D): o item de tocar com o ícone da ferramenta da tela que resolve e *a fazer*, e a seta pro `origem` do mock
- **o automático que reprovou** fora do nível do item: o item de tocar com o X no poço, a leitura embaixo e a seta pro 09
- **a foto tirada no checklist:** o item feito só com o nome — nenhum texto diz de onde ela veio (o Painel diz *fotografado na calibração, às 14:30*). **Proposta:** *fotografado às 14:30*
- **quem age com 1:** *você fotografa 1 itens* e *1 fotos tiradas* não existem; o cartão fica sem a linha, como o `Faltam`. **Proposta:** o singular, *você fotografa 1 item* e *1 foto tirada*
- **a F aberta depois de homologar:** *o servidor confirmou* no cartão, e os itens sem desenho; ficam os valores do C10 (`12 subiram`, `31 de 31`, `na fila`). O `na fila` do ID na plataforma não combina com *o servidor confirmou*
- **a F falhando:** o X na seção e nos itens, com o traço no valor; nenhuma referência desenha a F aberta assim
- **a seção aberta no homologado:** sem referência, e a URL fica sem momento
- **o rótulo do nível do item:** a 07 e a 08 dizem *B · INSTALAÇÃO FÍSICA* (o `titulo` do mock) e a 09 diz *C · HARDWARE* (o `rotulo`, e não *SAÚDE DO HARDWARE*). O protótipo segue as duas: o título longo na seção que o técnico faz, o nome curto na que o app confere. **Proposta:** uma regra só
- **a 09** continua com o herói (M2C-0417, RKT-8H42), *2 de 4*, 10,2 V e *1,8 V abaixo do mínimo*; o caso do mock é o QJF-2C61 do `can-estatico-isolado`, com 10,9 V, e a bateria é o primeiro item da C (G9)
- **a 10** desenha o véu sobre a página vazia; no app, atrás do véu fica o checklist do `pronto-para-fechar`, com 28 de 31 (G25, como o menu atrás do véu da T04)
- **a `animacao.md` da T13** ainda tem a linha do placar e *o placar completa* no veredito; o protótipo anima a barra (scaleX, 300 ms) e o veredito esmaece (150 ms) · e a linha da *miniatura da foto* (*surge no lugar do visor*) ficou sem peça: na estrutura nova, o `Tirar foto` segue pro próximo item por fazer, e a foto tirada é o item feito, sem miniatura — nada no protótipo a desenha
- **o `tela.md` da T13:** o elemento-assinatura ainda diz *o placar por seção*, e a lista de peças do design tem 12 que nenhuma referência desenha (faixa · sem ação, processo correndo, diálogo, diálogo sem saída, assertiva da sessão, linha de conferência, encerrando, pede o corte, sem homologar, com contador de falha, linha da fila e linha da re-checagem)
- **o `componentes.md`:** a subseção *Saíram do design* pode sair — o código não usa mais nenhuma daquelas peças; a grade dos cartões, que a T08 usa pros mostradores, virou peça interna (`GradeCartoes`) · mas duas linhas dela, *seção aberta do checklist* e *seção recolhida*, a folha 4 nova ainda desenha, no desenho novo (o cartão de 58 aberto e o fechado), e a tabela da folha 4 não tem as duas: o protótipo as monta com a peça nova (`SecaoDoChecklist`, espécimes `f4-secao-aberta` e `f4-secao-recolhida`), e o `tela.md` da T13 ainda as lista · **pra decidir:** saem da folha 4, ou voltam pra tabela dela
- **os tokens das peças que saíram:** 8 ficaram sem uso no código — `--linha-secao-mapa`, `--linha-secao-mapa-legenda`, `--n-cartao-secao`, `--n-unidade-cartao`, `--barra-cartao`, `--visor-foto`, `--traco-visor` e `--ls-colunas-mapa` — e o `tokens.css` diz isso no papel de cada um (*sem uso desde a entrega do checklist*), como o `--linha-conferencia-fim`; saem na próxima entrega, se você quiser · e o lima da barra do checklist (`rgba(170, 239, 0, 0.55)`, o que as 15 referências e a folha 5 desenham) é uma transparência nova, `--lima-barra-checklist`: o README do design system conta 6, e agora são 7

### O que o fechamento da entrega achou

As três frentes (a T13, a T10 e a T11, e os consertos) fecharam juntas, e a régua inteira aprova: os 13 roteiros; das 133 referências, a única que piorou contra a base do C11 é a T13/10, pelo checklist novo atrás do véu (embaixo); nenhuma peça do palco piorou; e os espécimes só mudaram nas folhas 2, 4, 5 e 7 e nos que a otimização trocou. O que fica pra você:

- **o `componentes.md`, a seção do protótipo:** a subseção *Saíram do design* saiu. As duas linhas que a folha 4 nova ainda desenha, *seção aberta do checklist* e *seção recolhida*, ficam na folha 4 como peça nova no protótipo, com a T13, até você decidir se saem da folha ou voltam pra tabela: **131 peças no protótipo** (as 119 do design, as 10 de antes e essas duas)
- **o poço na linha:** a lei mede 38, 44 e 50. A última linha da fila, de 62 (T15/00 a 02), leva o poço de 30, como as referências desenham · **pra decidir:** acrescentar 62 → 30 à lei
- **a faixa é uma peça só:** a lei diz *52 com a linha de baixo, em toda tela*. A faixa sem sessão fora do menu (T12/02, T15/03 e 04, T16) segue sem a linha de baixo, como as referências dela desenham, e bate em 0% · **pra decidir:** a lei vale pra faixa sem sessão? · e a T04/01, que não mudou, desenha a faixa sem sessão do menu com as duas linhas em cima; o protótipo põe a linha embaixo, como nas outras telas (0,08% dos 0,5%)
- **o semear da calibração** (T10, *Gravando no módulo…* e *Relendo…*): o `Voltar ao menu` e o `ENCERRAR` ficam apagados, pela lei 17, e nenhuma referência desenha esse quadro (o `para-o-arquiteto-alinhamento.md`, item 6)
- **o `mocks.js`:** o comentário do caso `diff-divergente` diz que o `noModulo` *fica declarado, sem leitor*, e a T11/00 agora o lê, no par *no módulo · no cadastro*
- **os tokens sem uso:** além dos 8 do checklist antigo e do `--linha-conferencia-fim`, mais três ficaram sem leitor — `--linha-onibus-fim` (a última linha de ônibus de 78, que saiu), `--miniatura-foto` e `--icone-foto` (a foto da prova usa o poço de 44 e o ícone de 20) — e o `tokens.css` diz isso no papel de cada um · o protótipo tem **280 tokens**
- **a T13/10** continua desenhando a página vazia atrás do véu; no protótipo, atrás dele fica o checklist do `pronto-para-fechar`, com 28 de 31, na estrutura nova (1,74% contra o HTML; era 1,12% com o checklist antigo)

## A otimização (`otimizacao100000000/`), do jeito que pedimos

Obrigado pelo formato: as referências por cima e os textos como trechos. Entrou sem conflito nenhum. O gate aprova, e o censo confere: **133 referências** — 16 telas, 58 momentos e 59 estados —, 119 peças no design (129 no protótipo), e **49 casos no mock** (os seus 42 e os nossos 7).

- **as 11 referências:** as 4 novas (T01/15 e 16, T02/04, T06/09) e as 7 que trocam (T01/00, 01, 10 e 14, T08/01, T09/03 e a folha 6)
- **os trechos:** todos aplicados, mantendo as nossas anotações. Os marcados com ✓ **não estavam escritos** na nossa documentação ainda (as regras estavam decididas, o texto não) — entraram também. O pacote das seis garagens (o trecho 2 do mock) **não estava construído**: entrou agora e é construído com o resto
- **onde o nosso texto já dizia o mesmo**, ficou o nosso: a lei 17 nas leis (com a regra do ENCERRAR), o ENCERRAR na T08 e na T09, e a lista dos processos que não podem parar no `logica.md`
- **o que corrigi no nosso texto:** a T01 dizia que o botão sem o usuário ficava *Entrar* por falta de texto; agora diz *Digite o usuário*
- **pra olhar:** o trecho da T05 diz que o ENCERRAR fica apagado *enquanto a pré-checagem corre*, mas a faixa só desce quando a pré-checagem aprova — é aí que a sessão nasce. Construí a regra na faixa, e ela vale se a faixa aparecer; no caminho do herói, ela ainda não existe ali

## O que as referências pedem ao design · medido no C10, no C11 e nas entregas 4 e 5

Nenhuma referência foi mexida: o protótipo mede e propõe, e a correção é na fonte. Cada item diz o que muda e, quando medido, quanto a diferença cai.

- **a faixa da sessão, em toda tela com sessão:** várias referências desenham a faixa sem a linha de baixo da folha 2 (T11, T12 00/01/03, T13 no item reprovado) ou deixam ela encolher quando o conteúdo passa de 800 (T13 D e E, T14 01/04/06). O protótipo trava a faixa em 52, com a linha (G13). **Proposta:** a faixa com a linha e sem encolher em todos os HTML. Medido na T14: a 01 cai de 1,77% pra 0,05%, a 04 de 0,72% pra 0,06% e a 06 de 0,73% pra 0,06%
- **T01:**
  - a 03, a 04 e a 05 desenham 9:41, 0:44 e 9:28, que não saem do mock e não batem entre si. **Proposta:** o quadro da chegada, com 10:00, 60 s e 1:00 (T01·1);
  - a 12 e a 13 desenham o Confirmar aceso com as células vazias; no protótipo ele fica apagado até o sexto dígito (T01·6). É 5,9%, só no botão;
  - o teto da hora (o último reenvio usado) não tem desenho nem texto;
  - no canal e-mail, as duas linhas da folha mostram o mesmo destino, e não há texto pra *mandar pro telefone*
- **T13:** a entrega do checklist trouxe os números do mock (19 de 31, *Faltam 9*, o firmware 2.3.5, a cerca G07); fica o item reprovado (09), que desenha o herói com 10,2 V no segundo item, e o caso é o QJF-2C61 com 10,9 V no primeiro
- **T14/05:** o evento chega aos 24 s do mock. **Proposta:** 0:24, a barra em 80% e 14:30:24. A 05 cai de 0,87% pra 0,04%, e os textos passam a conferir
- **T15:** a evidência do RSW-9L02 é de 2 dias, e não *ontem 10:05*. A 01 desenha outro recorte da fila, com 4 itens e o contador 5. A 02 cruza garagens pra dar o 4. O *14:02* da 03 e da 04 não existe no mock
- **T16:** o círculo com traço do *não se aplica* só aparece na 02 e na 05; o subtítulo é montado de dois jeitos (2 px entre a 03 e a 06); o miolo tem vão de 14 numa metade e 12 na outra; a nota NÃO RODARAM mistura duas peças; os glifos são desenhados à mão
- **T11/02:** junta a faixa do herói com a *tradução frota v2* do a-16. **Proposta:** *tradução urbano v3*, a do RKT-8H42
- **T12 e T06:** a margem do último grupo mais o recheio do miolo somam folga dupla antes do rodapé. **Proposta:** tirar a margem. Não muda nenhum pixel na rolagem 0
- **T04:** o h1 escondido *Menu* só existe nas referências dos diálogos, e não nas das folhas
- **as listas de peças do design:** a T01, a T02, a T12, a T13 e a T15 listam peças que nenhuma referência delas desenha. A lista medida de cada uma está na seção do protótipo
