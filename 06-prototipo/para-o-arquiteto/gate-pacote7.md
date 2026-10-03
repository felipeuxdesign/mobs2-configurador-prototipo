# Gate do pacote 7

Medido em 04/10, com o pacote 7 aplicado e construído.

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 153 | 153 ✓ (15 telas, 65 estados, 73 momentos) |
| peças | 104 | 104 ✓ pelas linhas das folhas no `componentes.md` (era 106) |
| leis | 24 | 24 ✓ |
| decisões | 54 | 54 ✓ |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

## 2 · A conferência

Cada referência ao lado do print do protótipo, em `pacote7/` nesta pasta:

| referência | contra o HTML |
|---|---|
| T05 `00` · a lista com o M2C-0417 marcado | 0% |
| T05 `01` · a lista sem nada marcado | 0% |
| T05 `02` · o único módulo marcado, com o nenhum outro | 0% |
| T05 `04` · o M2C-0301 com *não respondeu* e o que conferir | 0% |
| T05 `06` · *Conectando ao M2C-0417…* | 0,1% (o link apagado, já nomeado no pacote 6) |
| folha 6 | os espécimes ao lado da folha, em `folha-6.png`: o bloco escolhido e o escolhido com trava da T05 saíram da vitrine. O *escolhido com trava · T06* fica em 0%. |

- **As 153:** sem erro, e nenhuma mudou contra a base do pacote 6. A 03, a 05 e as duas do Bluetooth seguem em 0%. A nova base é `prints/linha-de-base-pacote7.json`.
- **Os 43 roteiros:** aprovados. Três foram atualizados pela T05 nova:
  - o `portas`: a marca leva a URL à 00, *o que vem de tocar num módulo*;
  - o `busca`: a 00 sem o bloco *ESCOLHIDO*;
  - o `mov-t07`: o *Conectando…* não troca mais o desenho da tela.
- **O GIF do README foi regravado:** a lista da T05 sem o firmware.
- **checar e build:** aprovados.

**O aceite:**
- tocar num módulo só marca a linha, e quem avança é o `Conectar` ✓;
- o *Conectando…* troca só o texto do botão ✓;
- a falha aparece na linha do módulo, com as causas embaixo ✓;
- nenhuma linha mostra o firmware ✓;
- a folha 6 sem as duas peças da T05 ✓;
- o gate APROVADO ✓.

## 3 · As divergências

Nenhuma bloqueia. Três vão nomeadas:

1. **O bloco escolhido ainda vive na T06.**
   - A folha 6 nova e o `componentes.md` tiram o *bloco escolhido* como peça só da T05. Mas três referências da T06 ainda o desenham: a `01` (*Confirmar o vínculo*), a `10` e a `11`, com o *ESCOLHIDO* e a placa.
   - **Padrão:** a T05 deixou de usar a peça; a T06 continua construída pelas referências dela, com o mesmo componente (`BlocoEscolhido`). O censo pelo `componentes.md` dá 104, mas o desenho usa 105.
   - Fica a pergunta: a T06 também passa pra lista marcada, ou o bloco volta à folha como peça da T06?
2. **As pendências.** O pacote cria `08-produto-real/pendencias.md`, mas essa pasta virou `08-para-o-dev/`, e as pendências do PM moram em `o-que-o-produto-ainda-decide.md`.
   - **Padrão:** a linha nova, o tempo-limite da conexão (15 s; o protótipo simula 1,2 s), entrou ali, ao lado do tempo-limite do `Entrar`.
   - O `logica.md` do pacote também vinha de uma cópia antiga: entrou só a frase nova da porta natural da T05.
3. **A lista de peças da `tela.md` da T05.** O `tela.md` do pacote ainda lista o *bloco escolhido* e o *escolhido com trava* entre as peças da T05. Tirei as duas, pela mudança 6 do próprio pacote.

**No protótipo:**
- a falha da 04 é uma propriedade nova da linha de módulo (`falha`);
- o *O QUE CONFERIR* é uma peça da tela (`CausasDaFalha`), sobre a caixa de poço com o traço vermelho;
- marcar outro módulo depois da falha tira o *não respondeu* da linha.
