# Gate do pacote 12

Medido em 04/10, com o pacote 12 aplicado e construído, por cima do pacote 11 e do complemento.

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 171 | 171 ✓ (15 telas, 78 estados, 78 momentos) |
| peças | 106 | 106 ✓ |
| leis | 24 | 24 ✓ |
| decisões | 54 | 54 ✓ |
| casos no mock | — | 60 (eram 56: entram `gps-fraco`, `entrada-ignicao`, `evento-nao-chega-de-novo` e `fila-parada`) |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`. O gate do mock ganhou cinco conferências dos casos novos, todas OK.

**O que vinha de cópia antiga e o que entrou:**
- **De cópia antiga:** o `mocks.js`, os `tela.md`, a `pendencias.md` e o `CHANGELOG.md`.
- **Inteiros, porque só ganhavam o novo:** o `indice.json` e os quatro `textos.md`.
- **No índice**, as 11 entradas novas ganharam os nossos campos (o rótulo da coluna, `rotuloOrigem: proposto`), e o título no formato das outras (*T13 · …*).
- **O `08-produto-real/pendencias.md`** é, aqui, o `08-para-o-dev/o-que-o-produto-ainda-decide.md`. Entraram as sete linhas novas, e as duas que já existiam (a segunda falha e a fila parada) dizem onde estão desenhadas.

## 2 · A conferência

As folhas lado a lado estão em `pacote12/`:

| referência | contra o HTML |
|---|---|
| T13 `21` · a lista com o GPS reprovado | 0,05% |
| T13 `22` · o detalhe do GPS, a régua dos satélites | 0,05% |
| T13 `23` · a lista com as entradas reprovadas | 0,05% |
| T13 `24` · o detalhe das entradas, sem régua | **0%** |
| T13 `25` · a lista com o modem reprovado | 0,05% |
| T13 `26` · o detalhe do modem, sem régua | **0%** |
| T13 `27` · a Seção E com a correção pedida | 5,05% (os desvios 1, 2 e 3) |
| T13 `28` · o finalizar com a Seção E falhando | 1,63% (o diálogo bate; o fundo, desvio 4) |
| T14 `09` · a segunda falha do evento | 0,05% |
| T15 `05` · a correção na fila | 5,07% (o mesmo da T15/01, que dá 4,84%: o recorte aparece inteiro, decisão 42) |
| T04 `16` · a fila parada | 0,55% (desvio 5) |
| a coluna da T13 no palco | `palco-coluna-T13.png`: cada detalhe logo depois da sua lista, 12 linhas |

Os 0,05% das listas da C são o serrilhado dos ícones, como nas outras da T13.

- **As 171:** sem erro, e 38 em 0% contra o HTML. Nenhuma das 160 de antes ficou pior que a base do pacote 11. A nova base é `prints/linha-de-base-pacote12.json`.
- **Os roteiros:** os 43 aprovados, sem mudar nenhum. Na corrida inteira, o Chrome sem tela caiu no `mov-t13`. Antes disso, o `mov-t03` e o `mov-t10` pararam pela máquina carregada (no `mov-t10`, um ritmo de 458 ms onde ele pede de 520 a 900). Rodados de novo, sozinhos, os dois passaram, e os 17 que faltavam também.
- **O palco:**
  - as provas batem;
  - a moldura bate em 38 de 38;
  - os textos das cenas ficam com a diferença explicada: a coluna da T04 ganhou a *Fila parada*, que o quadro 01 não desenha.
- **Os espécimes:** os 114, nenhum pior que antes. Mexi em duas peças: a linha de leitura e o prazo.
- **checar, build e o gate:** aprovados.

**O que o protótipo faz:**
- **As três falhas da C só valem no estado da coluna.** São o `gps-fraco`, o `entrada-ignicao` e o `modem-sem-sinal`. O herói, no fluxo, passa, e o caminho principal não muda.
- **O GPS usa a régua com o mínimo do caso:** *6 ou mais* e *2 abaixo do mínimo*, sem a unidade.
- **As entradas e o modem** usam uma variante do instrumento do detalhe, só com o valor escrito, centrado.
- **O cartão com a correção pedida** é a linha de leitura com as linhas do porquê: o que leu, em vermelho, e a hora do pedido. A seta leva à T14, onde o técnico refaz só o cartão.
  - A E diz *o cartão não passou*, e a ação *Fazer o ciclo de testes* sai, porque a seta do cartão a substitui.
- **O cartão conta no *Faltam*, mas não segura o `Finalizar`:** o toque abre *A Seção E não passou*, com a ciência.
  - O `Finalizar` do diálogo registra com a E falhando e o nome, sem homologar, e volta ao menu. Nenhuma referência desenha o depois (pra você).
- **O `Solicitar correção de cadastro` da T14 põe o pedido na fila de saída** (*Correção de cadastro*), e a T15 o mostra *agora*, no topo da lista.
- **A T14/09 é o `evento-nao-chega-de-novo`, só pela coluna.** No fluxo, o mesmo ônibus segue o `evento-sem-resposta`, e a 2ª tentativa confirma.
- **A T04/16 é o diálogo da fila parada**, no lugar do aviso do acesso. *Dois* sai do `esperando` do caso, por extenso. Só aparece pela coluna, porque no protótipo o relógio não anda.

**As peças:** nenhuma nova. Três variantes, escritas no `componentes.md` e no `MAPA.md`:
- **a linha de leitura com as linhas do porquê** (o cartão da 27);
- **a frase em falha do prazo** (a 09 da T14);
- **o instrumento só com o texto**, que é peça da tela, em `T13/pecas.jsx`.

## 3 · As divergências

Nenhuma bloqueia. Cinco vão nomeadas:

1. **Os números do PCX-9A17 (T13/27 e 28), que você pediu pra conferir.**
   - Pelo mock, o a-03 não tem painel calibrado (o `calibracao.painel` só tem o a-01, o a-09 e o a-22), e por isso não houve calibração.
   - **Na 27, o protótipo dá:**
     - *20 de 30*;
     - a B com 4 fotos, *0 de 4*;
     - a C *4 de 4*;
     - a D *8 de 10*;
     - a E *5 de 6*;
     - *Faltam 7 itens* (4 fotos, os 2 da calibração e o cartão).
   - A referência estimou 22 de 31, a B *0 de 5*, a D *10 de 10* e *Faltam 6*. **Pra você acertar a referência**, ou dar ao mock o painel do a-03.
   - **Na 28,** pela mesma conta, a D continua em 8 de 10, e o `Finalizar` atrás do diálogo ficaria apagado. O quadro aberto pela coluna mostra o diálogo, como a referência desenha.
2. **A T13/27 rola até onde a lista deixa.** A referência desenha a D no topo do miolo e um vazio embaixo da F. A lista acaba antes, e a F fica no fundo. Aparece também o indicador de rolagem do app, que toda lista rolada mostra (o diretor, 24/09).
3. **O *confere* da E na T13/27 sai em `--tinta`, como na T13/13.** A 27 o desenha em `--tinta-apagada`, e a 13 desenha o mesmo passo aprovado em `--tinta`. Segui a 13.
4. **O fundo da T13/28.** A referência não desenha nada atrás do véu. O protótipo mostra o checklist apagado, como na T13/10.
5. **O *Agora não* da T04/16 fica a 8 do primário**, a regra da decisão 38 e da T04/06. A referência o põe a 6 e com 4 de margem. São os 0,55%.

**Também, pra você:**
- **A regra dos seis do palco.** Com mais de seis estados, a coluna agrupa (o `palco.md` dá o exemplo da T07), e só a T07 tem `grupo` no índice. A T13 tem agora 12 estados soltos: cabem, mas a regra pede grupos. Se quiser, o par lista e detalhe pode virar o grupo.
- **O que vem depois do `Finalizar` com a E falhando** (registrar sem homologar) não tem referência.

## 4 · As respostas pendentes do pacote 10

Já foram, no `gate-pacote10.md`, §4. Em resumo:
- **o `pronto-para-fechar`** monta a T13/10, no KNB-5H39;
- **o `modulo-com-pendencias`** só muda a fila da T14 no M2C-0362, e pode sair;
- **nenhum dos cinco textos candidatos** o protótipo lê do mock.
