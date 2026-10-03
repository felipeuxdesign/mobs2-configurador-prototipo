# Gate do pacote 4 e a conferência final

Medido em 03/10, com o pacote 4 aplicado e construído, e publicado.

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 142 | 142 ✓ (15 telas, 62 momentos, 65 estados) |
| peças | 106 | 106 ✓ |
| leis | 23 | 23 ✓ |
| decisões | 54 | 54 ✓ |
| casos no mock | os seus e os nossos | 56 (os seus 49 e 7 nossos) |
| telas com a navegação por gestos | 142 | 142 ✓ (as provas do palco conferem em cada uma: 360 × 20,97 no pé, por cima de tudo, sem toque) |
| `bluetooth` e `semRede` na barra | 0 | 0 ✓ (saíram as propriedades, o contexto `MundoDaBarra` e quem passava o estado) |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

## 2 · O que mudou no código

- **A barra de cima** (`app/src/ds/chrome/BarraDoSistema.jsx` e `.css`): o desenho oficial, `05-recursos/sistema/barra-de-status-android.svg`, importado pelo componente (D1), no viewBox `0 12.90 412 34.33` (360 × 30), sobre o fundo de cada contexto. O leitor de tela lê *9:30 · Wi-Fi, sinal e bateria*.
  - Saíram as propriedades `bluetooth`, `semRede` e `hora`, e o `@font-face` da Google Sans. O recorte `GoogleSans-hora.woff` fica em `05-recursos`, sem uso.
- **A navegação por gestos** (`app/src/ds/chrome/NavegacaoPorGestos.jsx` e `.css`, nova): o desenho oficial, montado uma vez no `app/src/App.jsx`, por cima de tudo, inclusive das folhas e dos véus (D2), sem toque e muda pro leitor.
- **O palco** (`app/src/palco/palco-tokens.css`, `palco.css`, `Palco.jsx`): a silhueta — borda de 8, cantos de 36 e 28 concêntricos, `#050407` com o fio de luz por dentro e o contorno por fora, e a sombra —, e o fundo em `--fundo-faixa`. A moldura escala junto com a tela, nunca maior que o real (D3).
- **As telas:** saíram só a linha `semRede` da T03 e o `bluetooth` da T13. O conteúdo não mudou.
- **A vitrine, a régua e os documentos:** os 4 espécimes da barra da folha 2 e as provas do palco acompanham. Os três roteiros que viam o `14:30` agora leem o nome da barra. A etiqueta do palco diz *pacote 4*.
- **Os documentos que eram nossos e falavam da barra:** a nota dos dois estados no `componentes.md` e a linha da Google Sans no `06-prototipo/CLAUDE.md`.

## 3 · A conferência final

- **As 142 referências, a tela inteira:** sem erro, 35 em 0% contra o HTML, e nenhuma pior que a base do pacote 3.
  - **Nas barras:** nos 30 px de cima e nos 21 px de baixo, nenhuma das 142 tem diferença contra a referência.
  - **Lado a lado:** cada referência ao lado do print do protótipo, uma folha por tela, em `conferencia-final/` nesta pasta, com o % de cada uma.
  - **O que passa de 1%** tem nome desde antes: os três textos da T01, as folhas da T04 (G25), o véu da T11/03, os dois critérios da T12, a T13/10 e o recorte da T15/01.
- **As cenas do palco:** lado a lado em `palco/`, nesta pasta. As provas batem todas, e a moldura bate 38 de 38 conferências.
- **O caminho do herói:** com o horímetro, 243 passos, e sem ele, 231. O GIF do README foi regravado.

## 4 · As divergências

Nenhuma bloqueia. Três vão nomeadas:
1. **O grep de `bluetooth` e `semRede` no código não dá 0 inteiro.** O que sobra é do negócio, não da barra: os casos `bluetooth-desligado` e `bluetooth-sem-permissao` da T05 e os `semRede` da T07, da T12 e da T15. Na barra, deu 0.
2. **A miniatura *O CELULAR* da cena 00 ainda desenha a moldura antiga** (o metal e o aro). O pacote trocou só os textos da cena. Por isso, a moldura da cena 00 passa de 1,6% pra 9,48%.
3. **No celular de verdade** (o link aberto no aparelho), a navegação some junto com a barra de cima, porque o aparelho já tem as dele (diretor, 25/09). No palco e no print, ela aparece nas 142.
