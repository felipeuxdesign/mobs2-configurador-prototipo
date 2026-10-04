# Conferir contra o design

As 154 referências — cada tela, momento e estado — estão em `02-telas/<tela>/referencias/`, em **HTML** e **PNG**, em 360 × 800. Elas valem pra qualquer tecnologia: são o gabarito da aparência.

## Como o protótipo foi medido

O protótipo foi comparado com as referências pixel a pixel, e é assim que o produto pode ser também:

1. **Renderize a sua tela e o HTML da referência no mesmo navegador**, na mesma escala (360 × 800, a 2×). Assim a diferença de fonte entre geradores some, e o que sobra é desenho.
2. **Compare pixel a pixel**, com uma tolerância fina (o protótipo usa o `pixelmatch`, limiar 0,1). A meta é 0%; toda diferença que sobra precisa de um nome, com o porquê.
3. **O PNG é o gabarito final**, mas compare com ele só depois: ele carrega a rasterização do gerador do design (por isso o protótipo dá ~1–2% contra o PNG e ~0% contra o HTML).

O jeito do protótipo está em `06-prototipo/app/scripts/tela.mjs` (o cabeçalho explica), e o resultado da última rodada está em `06-prototipo/para-o-arquiteto/conferencia-final/` — cada referência ao lado do print, com o % de cada uma.

## O que já tem nome

As diferenças que sobraram no protótipo, cada uma com o porquê, estão no `CHANGELOG.md` e nas notas *no protótipo* de cada `tela.md`. As mais comuns:

- **G5** · os glifos do Lucide desenham o círculo com outro raio que o gerador do design
- **G9** · onde o mock e a referência discordam num número, vale o mock
- **G25** · o que a referência não desenha (o menu atrás de uma folha, por exemplo), o protótipo desenha como o app de verdade faria

## Os textos e o design system

- os textos de cada tela: o `textos.md` dela — o que está entre crases é o texto exato, na ordem em que aparece
- as peças: as oito folhas em `03-design-system/referencias/`, e o `03-design-system/componentes.md` diz que tela usa cada uma
- os valores: `03-design-system/tokens.css` — nunca um número solto
