# Gate da rodada 3 do retorno do PM · o acabamento

Medido em 07/10, por cima do complemento da rodada 2 (`2c09bab`). É a última rodada: no fim, o push das três rodadas e do complemento, cada um no seu commit.

## 1 · O censo

**191 referências** (15 telas, 79 estados, 97 momentos) · 106 peças · 24 leis · 54 decisões · 62 casos no mock · 109 histórias.

Do pacote: 56 arquivos mudaram e 6 entraram (as três referências novas da T01, em HTML e PNG); nenhum saiu.

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

**Como entrou:**
- **As 18 referências novas e mudadas, inteiras:** T01/02 a 07, 11, 12, 13, 17, 20, 21 e 22 · T04/09 e 13 · T12/01, 04 e 05.
- **Os três `textos.md`** (T01, T04, T12): como norma, inteiros.
- **O `indice.json`:** fundido por id e por campo. Entraram as três da T01, e a T16/02 e a 07 apontam pra `autotesteEncerramento`.
- **O mock:** o merge de três vias com o do complemento da rodada 2, sem conflito. Saíram a velocidade dos catálogos de CAN e o endereço da conexão do herói; o `can-fora-esperado` agora é a temperatura; o `autoteste-falhando` ficou nos três contadores; entraram os 12 resumos com 28 itens e os seis países.
- **O `gate-cobertura.js`:** o nosso, com as duas conferências que o arquiteto mudou (o herói com 28 itens e os três contadores; as sete assertivas do encerramento). As nossas acertadas ao mock novo são quatro: os resumos com 28 itens, os seis países, as três frases e o que vem digitado.
- **As fichas e a lógica:** merge de três vias com a última cópia de cada uma, guardando as nossas notas "no protótipo". As notas que diziam o contato mascarado, o *Encerrar sem homologar?*, o *Ciclo 6 de 6*, os 29 itens e a velocidade na CAN foram reescritas pelo que o protótipo faz agora.
- **O `08-produto-real/pendencias.md`:** é o nosso `08-para-o-dev/o-que-o-produto-ainda-decide.md`. A pergunta das pistas foi pro PM, o mascarado ficou decidido, e entraram as duas leituras nossas.
- **O `o-que-o-prototipo-simula.md` e o `stack-a-definir.md`:** são cópias antigas de arquivos que saíram em 03/10, juntados ao `08-para-o-dev/`. Não trazem nada da rodada 3, e não entraram.

## 2 · A conferência

As folhas lado a lado estão em `rodada3/` (18).

| tela | referência | contra o HTML | o que sobra |
|---|---|---|---|
| T01 | `02-momento-recuperar-escolher-canal` | 0,15% | o texto rasterizado |
| T01 | `03-momento-recuperar-digitar-codigo` | 0,52% | o relógio: 10:00 e 60 s, contra a foto de 9:41 e 44 s (o combinado) |
| T01 | `04-momento-nao-recebi-o-codigo` | 2,25% (estrutural 0%) | o véu: a referência o desenha sobre o vazio, e o app, sobre a tela de onde a folha nasceu · o relógio |
| T01 | `05-momento-codigo-errado` | 0,35% | o relógio |
| T01 | `06-estado-codigo-expirado` | 0% | — |
| T01 | `07-estado-tentativas-esgotadas` | 0,27% | o texto rasterizado |
| T01 | `11-momento-nao-recebi-reenvio-liberado` | 2,11% (estrutural 0,01%) | o véu, como a 04 |
| T01 | `12-momento-codigo-reenviado` | 0% | — |
| T01 | `13-momento-codigo-no-e-mail` | 0% | — |
| T01 | `17-estado-teto-de-envios` | 0,51% | o relógio |
| T01 | `20-momento-telefone-no-formato-certo` | 0,19% | o texto rasterizado |
| T01 | `21-momento-o-e-mail-como-canal` | 0,22% | o texto rasterizado |
| T01 | `22-momento-o-seletor-de-pais` | 2,18% (estrutural 0%) | o véu, como a 04 |
| T04 | `09-estado-folha-trocar-de-garagem-com-modulo-conectado` | 1,1% (estrutural 0%) | o véu, igual à rodada 2 |
| T04 | `13-momento-encerrar-antes-de-homologar` | 0,03% | — |
| T12 | `01-momento-detalhe-da-instalacao` | 0,23% | o texto rasterizado (era 0,26%) |
| T12 | `04-estado-criterio-indisponivel` | 1,49% | as três linhas da i-02 (§3) |
| T12 | `05-estado-criterio-pendente` | 1,49% | idem |

**As 191 rodando:** 0 com erro, 38 em 0% contra o HTML. Contra a linha de base da rodada 2, só se mexeram referências que esta rodada redesenhou: a T01/02, 04 e 11 e a T12/04 e 05 subiram, pelo desenho novo, e a T12/01 desceu. Nenhuma outra tela piorou.

**O resto:**
- `checar`, `build` e o gate do mock aprovados.
- Os espécimes: os 114, iguais aos da rodada 2.
- O palco: 25 peças e 47 conferências da moldura, todas as provas batem.
- **Os roteiros:** os 45 aprovados (§5).

**O que o protótipo faz agora:**
- **A T01:** a primeira etapa abre no telefone, com o Brasil e o número incompleto da referência: *Faltam 2 números.* e o botão desligado.
  - Os números que faltam ligam o botão (a 20). O e-mail tira o seletor (a 21).
  - O país abre a folha da 22, com a busca. Ele troca a máscara, e o número que não cabe no país novo perde o que sobra.
  - Depois do envio, a resposta é sempre a mesma.
  - O errado, o vencido e as tentativas esgotadas dizem *Código inválido / ou vencido*.
  - A folha tem *Reenviar o código* e *Usar outro dado*. O envio depois do *Usar outro dado* é um reenvio: gasta um envio da hora e chega na 12, ou na 13 no e-mail.
  - Nenhuma máscara de contato sobrou no código.
- **O diálogo de encerrar:** *Encerrar antes de terminar?* e *Encerrar mesmo assim*. A peça é uma só (`estado/encerrar.jsx`), e vale em toda tela com a faixa.
- **A T12:** *6 passos* e *nada a calibrar*; o autoteste com os três contadores embaixo do nome, sem valor à direita.


## 3 · As divergências

Nenhuma bloqueia.

1. **O véu da T01/04, 11 e 22:** as referências desenham a folha sobre o vazio, e o app, sobre a tela de onde ela nasceu, como em toda folha do app desde o C4. Estrutural 0%.
2. **A T12/04 e a 05:** a referência desenha as seis linhas na PCX-9A17, mas a i-02 do mock só tem o resumo (configuração, checklist e autoteste). O app mostra as três que ele sustenta, sem inventar o diagnóstico, a calibração e o ciclo, como desde o pacote 1. Agora com *6 passos*, *28 de 28* e os três contadores.
3. **O motivo fora da referência:** o singular *Falta 1 número.* e o e-mail fora do formato (o botão desligado, sem motivo escrito) não têm texto no `textos.md`. Pro arquiteto, se quiser dar o texto.
4. **O que vem digitado e a sigla do país:** a referência desenha *(81) 98765-43*, *(81) 98765-4321*, *rafael.vieira@atlsul.com.br* e *BR*, e o mock não tinha nenhum dos quatro. Entraram no mock como `recuperacao.digitado` e `ddis[].sigla` (D-21: o campo nasce preenchido com dado do mock). Não são o contato do cadastro.
5. **Os tokens:** nenhum novo. As medidas da primeira etapa caem nos que existem, pelo valor: o 52 do `--botao-secundario`, o 56 do `--alvo-primario`, o 48 do `--alvo-min` e o 17 do `--t-botao`. Pro arquiteto, se quiser nomear os papéis.
6. **O ícone:** a seta do *Usar outro dado* entrou no `Icone` como `voltar-etapa`, com o desenho da referência. É a única coisa no design system; nenhuma peça e nenhuma variante.

## 4 · A lista final do PM, nas 191 telas

Lida no texto de cada uma das 191, montada pelo app.

| o item | resultado |
|---|---|
| nada de *feita* ou *gravado* como resultado | passa · sobram *A rede será gravada de novo no último passo.* e *A CONEXÃO AINDA NÃO FOI GRAVADA* (T09: o que vai acontecer e o que ainda não aconteceu) e *3 tentativas feitas* (T15/02) — nenhum é resultado |
| nenhuma palavra da tabela de vocabulário | passa · nenhum *BLE*, *APN*, *iButton*, *script*, *baudrate*, *IN/OUT* · o *Bluetooth* só nos dois estados do sistema (T05/16 e 17), e o *CAN* no nome do modelo |
| nada de ré, porta ou viagem | passa · a *Garagem Boa Viagem* é o nome da unidade (T02/02) |
| a velocidade só como opcional da T10 | passa · nenhuma fora da T10 |
| nenhum cabo | passa · o *Cabo e conector*, o *Cabo de alimentação* e o *Cabo da antena* são o que conferir na falha (T05/04, T13/09, 22, 29, 34, 35), não a conexão |
| o bip com *Testar bip*, *Ouvi* e *Não ouvi* | passa (T13/05, 40) |
| *homologada* só na T16 | **um resíduo:** a T04/06 (a folha de sair da conta) ainda diz *é encerrada antes, sem homologar.* — é o `textos.md` dela, que o pacote não mudou, e o app segue a norma · pro arquiteto: a mesma troca da 09 (*sem terminar a instalação*) |
| nenhuma comparação do cartão com o cadastro | passa · nenhum *cadastro* na T14 |
| a Seção F com dois itens | passa · o checklist de 28, conferido no gate |
| nenhuma saída pro menu antes da Conexão | passa · a cadeia em andamento (T09/01, 02, 03) não tem *Voltar ao menu* |
| o autoteste em três contadores | passa · T16/02, 05 e 07, e a T12 |
| os limites do VL06 e a tensão do veículo | passa · *faixa 9,0 a 32,0 V* na T07 |
| nenhum contato mascarado | passa · nenhum *•* em tela nenhuma |

**Sobras nos documentos, que não são tela:**
- A `leis.md` (R-03) ainda cita *Código não confere* como a exceção do título. As leis estão fora do escopo da rodada: pro arquiteto.
- A HU-T14-8 (`historias.md`, `dominio.md`) ainda diz *a velocidade só entra no ciclo quando o ônibus tem tacógrafo digital*.
- Os espécimes da folha 2 na vitrine do palco ainda mostram as duas linhas antigas do *Não recebi o código*, com o contato mascarado. São a folha do design system, fora do app e fora do escopo.

## 5 · Os roteiros

**Os 45 aprovados.** Na corrida inteira, 43 passaram de primeira e dois pararam:
- **O `mov-t13`:** parou por tempo, no indicador de rolagem que esmaece. Passou na volta, sem mudança.
- **O `mov-t14`:** parou de verdade, e o achado foi do mock da rodada 3. A velocidade saiu dos catálogos de CAN, e o caminhão com tacógrafo (o KNB-5H39) deixou de ter o passo da velocidade no ciclo: são 4 passos, como a ficha da T14 já diz (*no máximo quatro passos*, revista no retorno do PM).
  - O roteiro ainda esperava os 5 da D3 do pacote 2. Ele agora confere os 4 e que a velocidade não aparece, e passou.
  - A nota da D3 na ficha da T14 foi reescrita.

Mudaram nesta rodada:
- **O `recuperar`:** refeito pela primeira etapa nova, o seletor de país, o *Usar outro dado* e a mensagem única.
- **O `mov-t01`:** digita o telefone antes do `Enviar o código`.
- **O `folhas`, o `voltar` e o `mov-porcima`:** as linhas novas da folha. A aba que troca o conteúdo da primeira etapa não é mais conferida como *nada sai do lugar*, porque o e-mail tira o seletor, como a 21 desenha.
- **O `recebido`:** o resumo novo da T12.
- **O `mov-t14`:** o ciclo de 4 do caminhão.
- **Os que passam pelo diálogo de encerrar ou pela troca de unidade:** os textos novos.
