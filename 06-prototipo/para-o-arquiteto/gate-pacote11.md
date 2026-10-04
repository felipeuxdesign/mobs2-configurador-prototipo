# Gate do pacote 11

Medido em 04/10, com o pacote 11 aplicado e construído, por cima do pacote 10.

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 160 | 160 ✓ (15 telas, 67 estados, 78 momentos) |
| peças | 105 | 105 ✓ |
| leis | 24 | 24 ✓ |
| decisões | 54 | 54 ✓ |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

**Os documentos de novo vinham de cópias antigas**: o `tela.md` e o `estados.md` da T13, a `palco.md` e o `CHANGELOG.md`. Entrou só o que era novo:
- **as referências e o texto:** as duas referências e o `textos.md`, inteiros;
- **o índice:** o `depoisDe` e o *como* da T13/09;
- **as fichas da T13:** a linha da 09, a regra do item reprovado e a da barrinha;
- **a `palco.md`:** a regra do detalhe que vem logo depois do estado.

## 2 · A conferência

As folhas lado a lado estão em `pacote11/`:

| referência | contra o HTML |
|---|---|
| T13 `09` · a tela que ajuda a consertar | **0%** |
| T13 `16` · os números do ônibus da bateria | 0,05% (era 0,12%; sobra o serrilhado dos ícones, como nas outras da T13) |
| a coluna da T13 no palco | `palco-coluna-T13.png`: *Finalizar com a Seção F falhando*, *Homologado sem localização*, *Seção C com item reprovado*, *Item reprovado* |

- **As 160:** sem erro. Nenhuma ficou pior que a base do pacote 10, e a nova base é `prints/linha-de-base-pacote11.json`.
- **Os roteiros:** os 43 aprovados, sem mudar nenhum. Na corrida inteira, o Chrome sem tela caiu ao abrir o `recuperar`, e os seis que faltavam rodaram um a um.
- **checar, build e o gate:** aprovados.

**A T13/16 bate porque o protótipo já calculava assim.** Ela dá 14 de 30, a Montagem com 4 fotos e a Configuração em 8 de 10. O desvio que eu tinha nomeado no pacote 10 saiu.

**O que mudou no protótipo:**
- **o detalhe do item automático** diz só a seção. O `Segmentado` sem `segmentos` mostra só o cabeçalho com o rótulo, e as fotos da Montagem continuam com a barrinha;
- **o *O que conferir* da 09** é a peça da T05/04 (`CausasDaFalha`), com uma opção nova pra sair sem o traço vermelho (`falha={false}`). A T05 não muda. Os textos estão no `textos.js` da T13;
- **a coluna do palco** põe, depois de cada linha, o que diz o `depoisDe` dela, seja estado ou momento (`telas.js` · `estadosDa`);
- **o pé do palco** diz *pacote 11*.

## 3 · As divergências

Nenhuma. **Duas variantes ficaram sem uso**, e nenhuma folha as desenha. Elas continuam no código, porque o pacote não mexe nas peças, e o `componentes.md` diz que estão sem uso:
- **a nota do item que não se marca à mão** (`Nota`, corpo `item`);
- **o segmento atual com falha** (`atual-falha`).

**Pra você:** se elas podem sair.

## 4 · As duas respostas do pacote 10

Já foram, no `gate-pacote10.md`, §4. Em resumo:
- **o `pronto-para-fechar`** monta a T13/10, no KNB-5H39;
- **o `modulo-com-pendencias`** só muda a fila da T14 no M2C-0362, e pode sair;
- **nenhum dos cinco textos candidatos** o protótipo lê do mock.
