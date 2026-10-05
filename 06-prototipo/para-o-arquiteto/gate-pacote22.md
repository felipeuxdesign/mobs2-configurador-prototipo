# Gate do pacote 22

Medido em 05/10, com o pacote 22 aplicado e construído, por cima do pacote 12.

O pacote 12 já estava aplicado e no ar (`802f9f9`). Por isso, da Parte 1, só as referências 09, 22, 24 e 26 mudaram: o botão. O resto da Parte 1 bateu byte a byte com o que já estava no projeto. **O que entrou de novo é o pacote 13** (a Parte 2) e as duas regras do design system (a Parte 3).

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 176 | 176 ✓ (15 telas, 78 estados, 83 momentos) |
| peças | 106 | 106 ✓ |
| leis | 24 | 24 ✓ |
| decisões | 54 | 54 ✓ |
| casos no mock | — | 60 (nenhum caso novo: quatro ganharam a `releitura`) |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`. O gate do mock ganhou uma conferência do pacote 13: as quatro releituras passam (13,8 V dentro da faixa da bateria do a-02, 9 satélites contra o mínimo 6 do caso, a ignição igual ao esperado, e o modem *na rede*, o que a T07 lê no módulo que está bem).

**O que vinha de cópia antiga e o que entrou:**
- **De cópia antiga, como sempre:** a `logica.md`, a `pendencias.md`, o `CHANGELOG.md`, o `componentes.md` e as fichas da T04, T13, T14 e T15. Nenhum deles tinha linha nova além das do pacote 13.
- **Inteiros:** as cinco referências novas, as quatro corrigidas e o `textos.md` da T13.
- **Linha a linha:**
  - o `estados.md` da T13: as cinco linhas novas;
  - o `tela.md` da T13: o *21 · 12* e a regra do reler;
  - o `componentes.md`: as duas regras;
  - o `mocks.js`: o bloco das quatro `releitura`;
  - o `CHANGELOG.md`: a entrada do pacote 13.
- **No índice,** as cinco entradas ganharam os nossos campos. Os quatro positivos têm rótulo na coluna (*Alimentação relida*, *GPS relido*, *Entradas relidas*, *Modem relido*, `rotuloOrigem: proposto`), e os títulos estão no formato das outras (*T13 · …*).
- **As pendências** do pacote não traziam linha nova, e a nossa (`08-para-o-dev/o-que-o-produto-ainda-decide.md`) ficou como estava.

## 2 · A conferência

As folhas lado a lado estão em `pacote22/`:

| referência | contra o HTML |
|---|---|
| T13 `09` · a Alimentação reprovada, com `Reler o módulo` | **0%** |
| T13 `22` · o GPS reprovado | 0,05% (o serrilhado dos ícones, como antes) |
| T13 `24` · as entradas reprovadas | **0%** |
| T13 `26` · o modem reprovado | **0%** |
| T13 `29` · relendo o módulo | 0,2% (os desvios 3 e 4) |
| T13 `30` · a alimentação relida | 3,77% (os desvios 1 e 2) |
| T13 `31` · o GPS relido | 3,66% (os desvios 1 e 2) |
| T13 `32` · as entradas relidas | 3,69% (os desvios 1 e 2) |
| T13 `33` · o modem relido | 3,21% (os desvios 1 e 2) |

- **As 176:** sem erro, e 38 em 0% contra o HTML. As 171 de antes ficaram exatamente como na base do pacote 12. A nova base é `prints/linha-de-base-pacote22.json`.
- **A coluna da T13:** cada positivo vem logo depois do seu detalhe, e o 29 não entra. A ordem é:
  1. *Seção C com item reprovado*, *Item reprovado*, *Alimentação relida*;
  2. *Seção C com GPS reprovado*, *GPS reprovado*, *GPS relido*;
  3. o mesmo par e o relido das entradas e do modem.
- **Os roteiros:** os 44 aprovados, com o novo `reler.mjs`, sem mudar nenhum dos 43 de antes. Na corrida inteira, o `mov-listas` parou no passo 8: a T02 ainda animava quando o passo conferiu, com a máquina carregada. Rodado de novo, sozinho, passou. A T02 não mudou.
- **O pé do palco** diz *pacote 22*.
- **O palco:**
  - as provas batem;
  - a moldura bate em 38 de 38;
  - os textos das cenas ficam com a diferença explicada, como no pacote 12.
- **Os espécimes:** os 114, iguais aos do pacote 12. Nenhuma peça do design system mudou.
- **checar, build e o gate:** aprovados.

**O que o protótipo faz:**
- **O `Reler o módulo`** liga o *Relendo o módulo…* por 1 s, o tempo do *Relendo…* da T10 (`RITMOS.relerModuloMs`, novo).
  - Enquanto relê, o primário fica desligado, o link e o ENCERRAR apagados, e o voltar do Android não faz nada, como na releitura da CAN.
  - O *O que conferir* continua na tela, como a 29 desenha.
- **Aí o mundo fica relido:** os casos da C devolvem a `releitura` do mock, e todo item da C volta atualizado.
  - **Deu certo:** a mesma tela fica positiva, sem troca de quadro. É o instrumento sem a falha, com o check e *relido às · o veredito*, e um botão só, o `Voltar ao checklist`.
  - **Não deu:** o detalhe com o valor novo, ainda vermelho, e o `Reler o módulo` de novo. Nenhum caso do mock chega aí.
- **O ônibus do caso fica enquanto a tela vive.** O `Voltar ao checklist` volta à C do mesmo ônibus, 4 de 4, com a faixa do caso.
- **O 29 é da Alimentação**, a que a referência desenha. Nos outros três, a URL sai do momento, como o não conforme das fotos.
- **Nos estados da coluna o app está parado** (decisão 43). O reler se vê pelo endereço do 29, que corre sozinho até o 30. O roteiro novo, `reler.mjs`, prova isso e o GPS relido.
- **Nada muda de tela sozinho e não tem toast:** quem volta é o técnico.

**As peças:** nenhuma nova. O instrumento do item, que é peça da tela (`T13/pecas.jsx`), ganhou a variante `relido`:
- o poço sem o traço vermelho;
- o rótulo em `--tinta-secundaria`;
- a marca branca da `Escala`;
- o check de `--glifo-confere` com o texto de 13 em 700, como o confere da T10.

O `Rodape` e o `Link` já tinham o texto que troca no lugar e o link desabilitado. As duas regras e essa anotação estão no `componentes.md`.

## 3 · As divergências

Nenhuma bloqueia. Quatro vão nomeadas:

1. **O relido diz 14:30, e não 14:42.**
   - O relógio do produto é 14:30, congelado (a lei 6 do `CLAUDE.md`), e o relido da T10 diz 14:30 pela mesma regra.
   - O 14:42 não está no mock.
   - **Pra você:** ou as referências 30 a 33 e a regra *reler no lugar* dizem 14:30, ou o mock ganha a hora da releitura (um `relidoAs` no caso).
2. **O rodapé de um botão só fecha em 32, e as referências 30 a 33 o fecham em 24.**
   - É a regra da peça: o rodapé fecha em 24 quando termina em link, e em 32 quando termina em botão (`Rodape`, `--rodape-pe-com-botao`).
   - As referências tiraram o link do rodapé da 09 e deixaram o pé dele.
   - **É quase toda a diferença.** Com o pé de 24, o 30 cairia de 3,77% pra 0,41%, e o 32 de 3,69% pra 0,27%. O resto é a hora (o desvio 1).
   - **Pra você:** o pé de 32 nas quatro, como os outros rodapés que terminam no botão.
3. **O link apagado da 29 sai em `--tinta-apagada`, e não em `--marca`.**
   - A referência desenha o *Voltar ao checklist* em #4E475E, a `--marca`, que é de traço e ícone, abaixo do piso de 4,5:1 do texto.
   - O protótipo usa o link desabilitado da lei 17, em `--tinta-apagada`, o mesmo do `Voltar ao menu` enquanto o semear da T10 corre.
4. **O ENCERRAR da 29 fica apagado, e a referência o desenha aceso.**
   - Relendo, o voltar não faz nada, e o ENCERRAR faz o mesmo que o voltar (a `logica.md`, a lei 17).
   - É o mesmo desvio já nomeado na T07/10, a releitura da CAN.

**Também, pra você:**
- **A regra dos seis do palco.** A coluna da T13 tem agora 16 linhas soltas. A proposta do pacote 12 continua de pé: cada trio (lista, detalhe e relido) pode virar um grupo.
- **O *não deu* não tem referência.** Fiz como a ficha diz: o detalhe com o valor novo, ainda vermelho. Nenhum caso do mock devolve uma releitura que reprova.

## 4 · As respostas pendentes do pacote 10

Já foram, no `gate-pacote10.md`, §4. Em resumo:
- **o `pronto-para-fechar`** monta a T13/10, no KNB-5H39;
- **o `modulo-com-pendencias`** só muda a fila da T14 no M2C-0362, e pode sair;
- **nenhum dos cinco textos candidatos** o protótipo lê do mock.
