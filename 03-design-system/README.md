# O design system

**A identidade em três linhas:** um painel de instrumentos de ônibus, no escuro. Lima sobre roxo, e o lima **só** quando algo foi julgado ou escolhido. Os números leem como mostrador: tabulares, grandes, com a unidade pequena ao lado.

| Arquivo | O que tem |
|---|---|
| `tokens.css` · `tokens.json` | os 295 valores — cor, tipo, espaço, medida, movimento, e as medidas das peças (o bloco C2). O `tokens.css` é a norma; o JSON é gerado dele (`npm run tokens`, na `app/`), em formato neutro, pra qualquer stack · o `tokens.json` do design conta 96: os outros são as medidas das peças do protótipo |
| `leis.md` | as leis visuais e de produto, cada uma com o porquê |
| `movimento.md` | as regras de animação que valem pro app inteiro |
| `componentes.md` | as 120 peças do design, com a folha onde estão desenhadas e as telas que usam cada uma · e, numa seção separada, o que o protótipo mediu: **132 peças**, os espécimes das folhas e os quatro grupos de átomos da folha 3 |
| `referencias/` | as oito folhas, em HTML e PNG |

**Medido na versão 2:** todo desenho que se repete nas 147 telas está numa folha · as 25 cores estão na paleta · as 6 transparências têm nome · os 17 tamanhos de letra estão na escala · **toda medida é por dentro**: o poço de 24 tem 24, o botão de 56 tem 56, a linha de 38 tem 38.
