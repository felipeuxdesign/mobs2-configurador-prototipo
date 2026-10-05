# Gate do pacote 23

Medido em 05/10, com o pacote 23 aplicado e construído, por cima do pacote 22.

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 180 | 180 ✓ (15 telas, 78 estados, 87 momentos) |
| peças | 106 | 106 ✓ |
| leis | 24 | 24 ✓ |
| decisões | 54 | 54 ✓ |
| casos no mock | — | 60 (nenhum novo: os quatro da C trocaram a `releitura` pelas `releituras`) |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`. A conferência do pacote 13 virou a do 23: os quatro casos têm duas releituras, e a 1ª ainda reprova e a 2ª passa.

**O que vinha de cópia antiga e o que entrou:**
- **De cópia antiga, como sempre:** o `indice.json`, a `logica.md`, a `palco.md`, o `componentes.md` e o `tela.md` da T13. O índice vinha sem os nossos campos: sem os rótulos da coluna, sem os grupos da T07.
- **Inteiros:** as quatro referências novas, as cenas 02 e 05 do palco, e o `textos.md` da T13.
- **Linha a linha:**
  - **o índice:** as quatro entradas novas, a ordem das famílias (os relidos com `depoisDe` o não resolvido), e a T02 na coluna;
  - **o `estados.md` e o `tela.md` da T13:** as linhas novas, o *25 · 12* e a regra do reler;
  - **o `componentes.md`:** a regra *reler no lugar*, completa;
  - **a `palco.md`:** o recuo, a ordem, os nomes curtos e as famílias;
  - **o mock:** as `releituras`;
  - **a `logica.md`:** as quatro linhas de *como se chega*.
- **Os nomes curtos são o nosso `rotulo`:** *Seção C · alimentação*, *· GPS*, *· entradas*, *· modem*, *Seção E · correção pedida*, *Alimentação reprovada*, e os oito novos, como a cena 05.
- **A T02 não tem nome na cena.** Os quatro momentos ganharam um proposto: *Busca sem resultado*, *Busca esconde a escolha*, *Empresa escolhida* e *Unidade escolhida*.
- **Os títulos do índice já estavam no padrão *T13 · …*** desde o pacote 22: nenhum mudou.

## 2 · A conferência

As folhas lado a lado estão em `pacote23/`:

| o quê | contra |
|---|---|
| T13 `34` · a alimentação não resolvida | 0,05% contra o HTML (a hora, o desvio 1) |
| T13 `35` · o GPS não resolvido | 0,06% (a hora) |
| T13 `36` · as entradas não resolvidas | 0,02% (a hora) |
| T13 `37` · o modem não resolvido | 0,02% (a hora) |
| a coluna da T13 contra a cena 05 (`palco-05-coluna-com-familias-coluna.png`) | 0,98%: o marcador de sempre (o vazado de 11 por dentro) |
| a cena 05 inteira (`palco-05-coluna-com-familias-inteira.png`) | os textos conferem · a moldura bate |
| a coluna da cena 02, com o firmware recuado (`palco-02-num-estado-coluna.png`) | 2,17%: o marcador, o ícone do Voltar ao fluxo e a *Alimentação abaixo da faixa*, que o quadro ainda não desenha |
| a coluna da T02 com os quatro recuados (`palco-T02-coluna.png`) | sem referência: nenhuma cena desenha a T02 |

- **As 180:** sem erro, e 38 em 0% contra o HTML. As 176 de antes ficaram exatamente como na base do pacote 22. A nova base é `prints/linha-de-base-pacote23.json`.
- **A coluna da T13** tem 20 linhas, na ordem da cena 05, com o 29 fora. Cada família vem no mesmo recuo: o detalhe, o não resolvido, o relido.
- **Os quatro momentos da T02, abertos pela coluna,** dão 0% contra o mesmo momento aberto pelo endereço.
- **A sequência no fluxo:** o roteiro `reler.mjs` toca duas vezes. O 1º toque é o endereço do 29 (o desvio 2): *Relendo o módulo…*, o 34 com o xis e *ainda 0,6 V abaixo do mínimo*, o 2º toque, *Relendo* com o xis ainda na tela, e o 30. Depois o GPS: do 35, um toque, e o 31.
- **Os roteiros:** os 45 aprovados na corrida inteira, de primeira. São os 43 de antes, o `reler.mjs` com os dois toques e o novo `familias.mjs`. O `mov-t13` mudou só o nome do toque na coluna.
- **O palco:**
  - a cena 05 entrou na régua (`palco.mjs`);
  - 25 peças, sem erro;
  - 6 textos: o da cena 05 confere, e os outros 5 com a diferença já explicada;
  - a moldura bate em 47 de 47;
  - as provas batem.
- **Os espécimes:** os 114, iguais aos do pacote 22.
- **checar, build e o gate:** aprovados.

**O que o protótipo faz:**
- **O mundo conta as releituras,** e os casos da C devolvem a N-ésima das `releituras`.
  - **A 1ª ainda reprova:** o detalhe com o valor novo, ainda vermelho, e no lugar da frase o xis pequeno com *relido às 14:30 ·* e o que ainda falta. É a variante `naoResolvido` do instrumento da T13, o *não confere* da T10/10. O *O que conferir* fica, e o `Reler o módulo` volta.
  - **Relendo de novo,** o xis fica na tela até o resultado.
  - **A 2ª passa:** o relido. O 29 é só a primeira releitura da Alimentação; na segunda, a URL sai do momento.
- **A coluna** recua um nível tudo o que tem `depoisDe`, 24 + 10 = 34, sem linhas.
- **A coluna longa:** com mais de 18 linhas, o que cabe com 32 na altura do celular, as linhas têm 30, como a cena 05. Hoje, só a T13.
- **O endereço aceita no `estado` o momento da família.** O link copiado de um deles reabre o mesmo quadro, parado. Antes, a T07/06 e a T14/06 abriam a tela sem o estado, e o link copiado deles não reabria.
- **A T02 monta o momento aberto pela coluna** com o quadro e o termo da busca dele.
- **Dois roteiros:**
  - o novo `familias.mjs`: a coluna da T13 e da T02, e o endereço;
  - o `mov-t13`: toca no nome curto, *Alimentação reprovada*.

## 3 · As divergências

Nenhuma bloqueia. Três vão nomeadas:

1. **O relido e o não resolvido dizem 14:30, e não 14:42 e 14:41.**
   - É o relógio parado da lei 6, como no pacote 22.
   - Com as duas releituras, a referência põe 14:41 na 1ª e 14:42 na 2ª, e o protótipo diz 14:30 nas duas.
   - **Pra você:** se a hora importa, o mock declara a hora de cada releitura (um `as` em cada uma das `releituras`), e o protótipo a lê.
2. **A demo pelo fluxo não chega no detalhe.**
   - Nenhum módulo que a busca da T05 acha é de um caso da Seção C:
     - o M2C-0301, o da bateria, não está entre os que ela acha (o mesmo do pacote 10);
     - os casos do GPS, das entradas e do modem são do M2C-0417, o do herói, e só valem no estado da coluna, pra o herói passar no fluxo (a decisão do pacote 12).
   - Pra chegar pelo fluxo, uma tela de fora da T13 mudaria, e o escopo não deixa.
   - **O que dá pra mostrar hoje:** o endereço do 29 é o 1º toque e corre sozinho até o 34; dali, o `Reler o módulo` leva ao 30. Do 35 ao 37, o mesmo, com um toque.
   - **Pra você:** ou a busca da T05 acha o M2C-0301 (e a sessão segue nele até o checklist), ou a demo usa o endereço.
3. **As linhas de 30 na coluna longa.**
   - A `palco.md` diz *linhas de 32*, e a cena 05 desenha 30. Com 32, a 20ª linha da T13 passa uns 20 px do pé do celular.
   - Segui a cena só onde não cabe, com mais de 18 linhas; as outras telas ficam com 32.
   - **Pra você:** escrever a regra na `palco.md`, ou dizer outro número.

**Também, pra você:**
- **A regra dos seis** perdeu o sentido na T13: com o recuo, as 20 linhas se leem como cinco famílias e dois estados soltos, e a cena 05 não as agrupa. Segui a cena.
- **As cenas 01, 03 e 04** ainda desenham a coluna de antes (sem a *Fila parada*, sem o firmware recuado, sem a *Alimentação abaixo da faixa*). As diferenças estão explicadas na régua do palco.

## 4 · As respostas pendentes do pacote 10

Já foram, no `gate-pacote10.md`, §4. Em resumo:
- **o `pronto-para-fechar`** monta a T13/10, no KNB-5H39;
- **o `modulo-com-pendencias`** só muda a fila da T14 no M2C-0362, e pode sair;
- **nenhum dos cinco textos candidatos** o protótipo lê do mock.
