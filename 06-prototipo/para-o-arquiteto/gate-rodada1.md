# Gate da rodada 1 do retorno do PM

Medido em 07/10, com a rodada 1 aplicada e construída por cima do pacote 23. **Sem push:** commit local, e o push vem no fim da rodada 3.

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 185 | 185 ✓ (15 telas, 76 estados, 94 momentos) |
| peças | 106 | 106 ✓ (nenhuma nova no design system · cinco variantes e uma peça das telas, no desvio 6) |
| leis | 24 | 24 ✓ (`leis.md` intacto) |
| decisões | 54 | 54 ✓ |
| tokens | — | 295, `tokens.css` intacto |
| casos no mock | — | 61: entraram o `sem-leitor` (T14/12) e o `servidor-ainda-nao` (T09/12), saiu o `identificador-divergente` |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

**Os 26 do `APAGAR.txt`:** os 13 PNG e os 13 HTML saíram antes da cópia. Nenhum dos 26 existe na pasta. Busquei cada nome no repositório inteiro: nada no app, nos roteiros, no índice, nos `tela.md`, `estados.md` e `textos.md`, no palco e na pasta do dev aponta pra eles. Os nomes só ficam nos gates antigos (C0, C13 e os dos pacotes), que são registro do que foi medido na época, e no CHANGELOG. Três pontos ainda apontavam e foram consertados:
- `provas-palco.mjs`: a medida da T16 usava o 01, o 02 e o 05 antigos;
- os `estados.md` da T13 e da T16 tinham a nossa nota da linha antiga do 11 e do 02.

**O que vinha de cópia antiga e o que entrou:**
- **Inteiros:** as 36 referências novas, as 48 que mudaram, a folha 5 e os `textos.md` da rodada.
- **Linha a linha:** o `indice.json` (os nossos `rotulo`, `grupo`, `depoisDe` e `coluna` ficaram), os `tela.md` e `estados.md` (as nossas notas *no protótipo* ficaram), a `logica.md`, a `palco.md`, o `componentes.md`, os três de `01-produto` e o mock (o mock do PM por cima do nosso, com as âncoras recomputadas).
- **Os nomes curtos da coluna** que entraram: *Pontos de cerca demais* (T09/07), *Ainda não falou com o servidor* (T09/12), *Registrado sem localização* (T13/14), *Ativo sem leitor* (T14/12) e *Homologação bloqueada* (T16/05).

**O escopo negativo, conferido:**
- **tokens, peças e leis:** nada mudou nos três.
- **T07:** só o valor da alimentação, 24,3 V.
- **rodada 2 (T11, T10, T05, T15, T06) e rodada 3 (T01, T02, T03, T04, T12):** nenhum código de tela mudou. A T15 perdeu o item de correção da fila, porque o caminho da correção saiu (o 05 está no `APAGAR.txt`). A T12 mostra o que o mock novo diz (o desvio 2).

## 2 · A conferência

As folhas lado a lado estão em `rodada1/`, uma por referência nova ou mudada (66), e mais a coluna da T13 contra a cena 05.

| tela | referência | contra o HTML | o que sobra |
|---|---|---|---|
| T07 | `00-tela` (mudou) | 0,04% | o texto rasterizado |
| T07 | `02-estado-serial-nao-cadastrado` (mudou) | 0,04% | o texto rasterizado |
| T07 | `03-estado-modelo-sem-suporte` (mudou) | 0,04% | o texto rasterizado |
| T07 | `04-estado-firmware-nao-homologado` (mudou) | 0,04% | o texto rasterizado |
| T07 | `05-estado-firmware-sem-rede-no-modulo` (mudou) | 0,04% | o texto rasterizado |
| T07 | `07-estado-modem-sem-sinal` (mudou) | 0,04% | o texto rasterizado |
| T07 | `11-momento-lendo` (mudou) | 0,06% | o texto rasterizado |
| T07 | `12-estado-alimentacao-abaixo-da-faixa` (mudou) | 0,04% | o texto rasterizado |
| T09 | `00-tela` (mudou) | 0,06% | o texto rasterizado |
| T09 | `01-estado-bloco-recusado` (mudou) | 2,15% | o pé de 32 (desvio 5) |
| T09 | `02-estado-queda-na-cadeia` (mudou) | 2,15% | o pé de 32 (desvio 5) |
| T09 | `03-estado-recuperacao-ate-a-conexao-gravar` (mudou) | 0,11% | o texto rasterizado |
| T09 | `04-momento-cadeia-concluida` (mudou) | 2,9% | a rolagem (desvio 7) |
| T09 | `05-momento-o-que-vai-ser-gravado` (mudou) | 0,08% | o texto rasterizado |
| T09 | `06-estado-a-configuracao-nao-cabe` (mudou) | 0,07% | o texto rasterizado |
| T09 | `07-estado-pontos-de-cerca-demais` (nova) | 0,16% | o texto rasterizado |
| T09 | `08-momento-manutencao-escolher-o-bloco` (mudou) | 0% | o texto rasterizado |
| T09 | `09-momento-manutencao-reenviando` (mudou) | 0,1% | o texto rasterizado |
| T09 | `10-momento-manutencao-concluida` (mudou) | 0,02% | o texto rasterizado |
| T09 | `11-momento-conferindo-o-servidor` (nova) | 0,09% | o texto rasterizado |
| T09 | `12-estado-o-modulo-ainda-nao-falou-com-o-servidor` (nova) | 3,5% | a rolagem (desvio 7) |
| T13 | `00-tela` (mudou) | 0,04% | o texto rasterizado |
| T13 | `01-momento-a-identificacao-aberta` (mudou) | 0,1% | a data do pacote (desvio 3) |
| T13 | `02-momento-b-montagem-aberta` (mudou) | 0,05% | o texto rasterizado |
| T13 | `03-momento-c-hardware-aberta` (mudou) | 0,05% | o texto rasterizado |
| T13 | `04-momento-d-configuracao-aberta` (mudou) | 2,11% | a rolagem (desvio 7) |
| T13 | `05-momento-e-teste-dinamico-aberta` (mudou) | 4,74% | a rolagem (desvio 7) |
| T13 | `06-momento-f-servidor-aberta` (mudou) | 0,22% | o texto rasterizado |
| T13 | `09-estado-item-reprovado` (mudou) | 0,02% | o texto rasterizado |
| T13 | `11-momento-aguardando-autoteste` (nova) | 0,04% | o texto rasterizado |
| T13 | `12-momento-b-com-ressalva` (mudou) | 0,05% | o texto rasterizado |
| T13 | `13-momento-e-resolvida` (mudou) | 4,41% | a rolagem (desvio 7) |
| T13 | `14-estado-aguardando-autoteste-sem-localizacao` (nova) | 0,04% | o texto rasterizado |
| T13 | `16-estado-secao-c-com-item-reprovado` (mudou) | 0,09% | o texto rasterizado |
| T13 | `21-estado-secao-c-com-gps-reprovado` (mudou) | 0,05% | o texto rasterizado |
| T13 | `22-estado-gps-reprovado` (mudou) | 0% | o texto rasterizado |
| T13 | `23-estado-secao-c-com-entradas-reprovadas` (mudou) | 0,05% | o texto rasterizado |
| T13 | `25-estado-secao-c-com-modem-reprovado` (mudou) | 0,05% | o texto rasterizado |
| T13 | `29-momento-relendo-o-modulo` (mudou) | 0,21% | o link apagado da 29 (pacote 22) |
| T13 | `30-momento-alimentacao-relida` (mudou) | 3,99% | a hora e o pé de 32 (desvios 1 e 5) |
| T13 | `31-momento-gps-relido` (mudou) | 3,5% | a hora e o pé de 32 (desvios 1 e 5) |
| T13 | `34-momento-alimentacao-nao-resolvida` (mudou) | 0,03% | a hora |
| T13 | `35-momento-gps-nao-resolvido` (mudou) | 0,02% | a hora |
| T13 | `38-momento-secao-d-sendo-lida` (nova) | 1,93% | a rolagem (desvio 7) |
| T13 | `39-momento-bip-tocando` (nova) | 4,73% | a rolagem (desvio 7) |
| T13 | `40-momento-bip-esperando-resposta` (nova) | 2,54% | a rolagem (desvio 7) |
| T13 | `41-momento-bip-ouvido` (nova) | 4,67% | a rolagem (desvio 7) |
| T13 | `42-momento-bip-nao-ouvido` (nova) | 2,57% | a rolagem (desvio 7) |
| T14 | `00-tela` (mudou) | 0,03% | o texto rasterizado |
| T14 | `01-momento-antes-do-disparo` (mudou) | 0,04% | o texto rasterizado |
| T14 | `02-estado-prazo-estourado` (mudou) | 0,03% | o texto rasterizado |
| T14 | `03-estado-dinamico-fora-do-esperado` (mudou) | 0,04% | o texto rasterizado |
| T14 | `05-momento-ciclo-concluido` (mudou) | 0,03% | o texto rasterizado |
| T14 | `08-momento-o-modulo-leu-o-cartao` (nova) | 0,03% | o texto rasterizado |
| T14 | `09-estado-segunda-falha-do-evento` (mudou) | 0,03% | o texto rasterizado |
| T14 | `10-momento-cartao-nao-confere` (nova) | 0,25% | a espera explicada e o fim do cartão, 1 px abaixo |
| T14 | `11-momento-vez-da-ignicao-desligada` (nova) | 0,25% | a espera explicada e o fim do cartão, 1 px abaixo |
| T14 | `12-estado-ativo-sem-leitor` (nova) | 0,07% | o texto rasterizado |
| T16 | `00-tela` (mudou) | 0,05% | o texto rasterizado |
| T16 | `01-momento-reiniciando-o-modulo` (nova) | 0,06% | o texto rasterizado |
| T16 | `02-momento-instalacao-homologada` (nova) | 0,33% | a hora (desvio 1) |
| T16 | `04-momento-encerrada-sem-homologar` (mudou) | 0,05% | o texto rasterizado |
| T16 | `05-estado-homologacao-bloqueada` (nova) | 0,3% | a hora (desvio 1) |
| T16 | `06-estado-sessao-interrompida` (mudou) | 0,06% | o texto rasterizado |
| T16 | `07-momento-autoteste-correndo` (mudou) | 0,16% | o texto rasterizado |
| T16 | `08-momento-reconectando-no-reinicio` (nova) | 0,06% | o texto rasterizado |

| o quê | contra |
|---|---|
| a coluna da T13 contra a cena 05 (`palco-05-coluna.png`) | 7,55%: a cena desenha a coluna de antes, com 20 linhas de 30 · a de agora tem 18, de 32 (desvio 14) |
| a cena 05 inteira (`palco-05-inteira.png`) | só informa: a cena ainda desenha o GPS por satélites |

- **As 185:** sem erro, e 38 em 0% contra o HTML. As 119 que a rodada não tocou: 116 ficaram exatamente como na base do pacote 23, e 3 mudaram em 0,01 ou 0,02 ponto (a T04/04, a T12/01 com o *4 de 4* do desvio 2, e a T13/10 com o rodapé novo). A nova base é `prints/linha-de-base-rodada1.json`.
- **Os roteiros:** os 45 aprovados na corrida final, de uma vez. Catorze foram refeitos pro fluxo novo:
  - `mov-t14`: o cartão em três quadros, o Confere, a ignição desligada e o ativo sem leitor;
  - `mov-t13`: a D lida bloco a bloco ao entrar, e o Finalizar que registra;
  - `mov-t09`: o servidor depois da Conexão e o 12 pela coluna;
  - `mov-t16` e `sessao`: o reinício automático, o 01 e o 08 parados, e os contadores;
  - `checklist`, `heroi`, `heroi-sem-horimetro`, `abortada`, `familias`, `reler`, `recebido`, `readme` e `mov-porcima`.
- **O palco:** 25 peças sem erro · 6 textos, os 6 com a diferença explicada (o da cena 05 diz que ela ainda desenha a coluna de antes) · a moldura bate em 47 de 47 · as provas batem.
- **Os espécimes:** os 114, com os dois do pedido de correção fora (o desvio 16).
- **checar, build e o gate:** aprovados.

**O que o protótipo faz, tela por tela:**
- **T14:**
  - o cartão é a vez desde o disparo (*passe o cartão*). O módulo o lê na vez dele (12 s do disparo), e a linha diz *leu 9412857*, com *Confere com o cartão* e *Não confere* embaixo, na própria linha (08).
  - **o Confere:** o check esmaece no poço, e a ignição desligada é a vez, com a espera explicada embaixo (11). Ela confirma 3 s depois da resposta, nunca antes da vez dela no ciclo.
  - **o Não confere:** o xis, *não confere* e *justifique no checklist* (10). No checklist, o item do cartão vira não conforme, com o campo do que aconteceu.
  - **o `sem-leitor`:** o ciclo em 3 passos, sem o cartão (12).
  - **o tacógrafo** (KNB-5H39): 5 passos, com a velocidade.
- **T13:**
  - **a D lida bloco a bloco ao entrar no checklist:** começa vazia e enche um a cada 600 ms, o ritmo do diagnóstico. O 38 pela URL abre com três lidos, parado.
  - **o bip:** *Testar bip* toca por 1 s (`RITMOS.bipMs`, *Tocando…*) e pergunta *Você ouviu o bip?*. *Ouvi* confere; *Não ouvi* vira não conforme, com o campo, que pede *Conte o que aconteceu*.
  - **a alimentação contra a faixa do modelo** (VL06, 9,0 a 32,0 V), e a régua arredondada pra fora em múltiplos de 5. **O GPS** é a antena, e os satélites são informação.
  - **o Finalizar registra:** *Checklist registrado · aguardando autoteste* (11). A ciência (10) só abre com a Seção F reprovada (*não chegou*); esperando o servidor, o Finalizar registra direto.
  - **o rodapé diz por que o Finalizar não acende:** *Faltam N itens obrigatórios*, *seção sendo lida* ou *seção com reprovado*.
- **T09:**
  - **cada bloco relido termina em *confere*.** A Conexão relida leva ao *O módulo falou com o servidor · conferindo* (11), um bloco depois, e à cadeia concluída, com *sim* (04).
  - **o `servidor-ainda-nao` monta o 12:** *ainda não*, com o *O que conferir*.
  - **o não cabe nomeia o que estourou:** *São 131 contadores. Este módulo guarda 127.* (06) e *As cercas têm 6.410 pontos. Este módulo guarda 6.143.* (07).
- **T16:**
  - **o reinício corre sozinho:** *reiniciando*, com a legenda dele e *Reiniciando o módulo…* no primário; depois, *de volta*.
  - **o 01 e o 08 abrem parados pelo endereço,** no par que a referência desenha.
  - **o autoteste correndo (07)** mostra os contadores embaixo do título, e as assertivas que ainda não chegaram ficam apagadas (o título em `--tinta-apagada`, o relógio e o traço em `--marca`). O *não se aplica* fica em `--tinta-apagada`, na 07 e na 02. As duas regras estão na própria tela, não na peça. O fim é a *INSTALAÇÃO HOMOLOGADA*, *às* a hora, com *5 aprovadas · 1 não se aplica · 1 pendente* e a nota do cartão (02).

## 3 · As divergências

Nenhuma bloqueia.

1. **A hora:** o protótipo diz 14:30, o relógio parado da lei 6.
   - As referências dizem 14:41 e 14:42 nos relidos da T13, e 14:42 na T16/02 e 05.
   - Na T16/02 e 05, as duas linhas de 58 (o reset e o cartão) ficam 1 a 2 px fora do desenho.
2. **A T12/01 diz *Ciclo de testes 4 de 4*:** o mock do PM deu à i-01 os 4 passos novos, e a referência, que é da rodada 3, ainda diz *6 de 6*.
   - No mesmo resumo, o mock manteve *Checklist 31 de 31* e *Autoteste 8 de 8*, onde o herói agora tem 29 itens e 7 assertivas.
   - **Pra você:** a rodada 3 acerta o resumo da i-01 no mock e na referência.
3. **A data do pacote na Seção A:** o protótipo lê o pacote da unidade em `M.pacotes` (11/03 07:10), e a referência desenha 06/10 06:55.
   - **Pra você:** se a data tem de ser a da referência, o pacote da Várzea muda no mock.
4. **O número do cartão lido** (*9412857*) é o esperado do primeiro cartão do mock, sem os zeros à esquerda. O mock não tem um *lido*.
   - **Pra você:** um `lido` no cartão do herói, se o número tiver que ser outro.
5. **O rodapé de um botão só fecha em 32,** a regra da peça (T09/01 e 02, T13/30 a 33). As referências deixaram o pé de 24 do rodapé com link.
6. **Cinco variantes e uma peça das telas,** sem peça nova no design system nem token:
   - o `lendo`, a `acao` e o `embaixo` do item do checklist;
   - o `lendo` da seção;
   - o `placeholder` do campo de texto;
   - o `extra` do elo da cadeia;
   - o `BotaoDaLinha` (`app/src/telas/comum/`), a resposta do técnico na própria linha.
   - Vão ao arquiteto pra entrarem nas folhas (`componentes.md`, *No protótipo · as variantes da rodada 1*). A folha 5 ainda desenha a cadeia de antes: os espécimes da cadeia dão 6,48% (a concluída), 6,27% (a recusada) e 6,43% (a de antes).
7. **A rolagem dos quadros que abrem rolados** (T13/04, 05, 13 e 38 a 42; T09/04 e 12): o protótipo abre com a seção de antes no topo, ou no fim da cadeia, e o quadro fica de 2 a 5 px do da referência.
   - Nas 04, 05, 13, 39 e 41, a referência rola além do fim da lista, e o protótipo para no fim.
   - A rolagem ao abrir acende o indicador de rolagem, e ele aparece no print.
8. **O 01 e o 08 da T16 são do par KNB-5H39 · M2C-0371,** como a referência. No fluxo, o reinício corre no par da sessão, sem parar. *Reconectando* só se vê pelo endereço: nenhum caso do mock derruba a conexão no reinício.
9. **A T09/12 só pela coluna:** o caso `servidor-ainda-nao` é do módulo do herói, e no fluxo o módulo fala com o servidor.
10. **A T13/16 lê os números do mock:** o `a-02` do caso tem leitor.
11. **As duas leituras do autoteste:** a *Configuração* e os *Contadores* são o que o módulo devolve no reinício. O *ID no cadastro* aparece sempre, conferido no fim.
12. **A Seção F confere só depois do Finalizar,** como a 11 desenha (*o servidor confirmou*). Antes, *esperando*, mesmo com o ciclo feito (a 13). Com o prazo estourado, *não chegou*, e o Finalizar pede a ciência.
13. **HU-T14-5** ficou alinhada em `dominio.md` e `historias.md` com o cartão conferido pelo técnico.
14. **A coluna da T13 tem 18 linhas,** e cabe com as linhas de 32. A cena 05 desenha 30, da coluna de 20 do pacote 23.
15. **O campo de texto embaixo do item tem 64 de alto** (o alvo mínimo + 16), como a T13/42.
16. **O pedido de correção saiu inteiro:** os dois espécimes da vitrine (`mov-registro-linha` e `mov-registro-link`) saíram com os textos dele. A variante *registro* segue na `LinhaTocavel` e no `Link`, sem uso.
17. **O `dominio.md` ainda diz *Prova 8 assertivas*** na linha do autoteste, e a T16 tem 7. É texto do arquiteto, e fica pra você.
18. **O GIF do README** ainda é o da rota antiga: a rota do README já anda no fluxo novo e passa. O GIF se regrava no fim da rodada 3, com o push.

## 4 · O que não faz sentido

- **O *Não confere* e o *Não ouvi* resolvem o item na hora, como não conforme.** A justificativa é pedida, mas não segura o Finalizar: nenhuma referência desenha o Finalizar parado por ela.
  - **Pra você:** se a justificativa tem de vir antes de finalizar, o rodapé precisa de uma frase pra isso.
- **O resumo da i-01 no mock** (o desvio 2) mistura o ciclo novo com o checklist e o autoteste antigos.
