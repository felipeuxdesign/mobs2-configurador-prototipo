# Conferir contra o design

São **201 pares HTML/PNG** em [02-telas](../02-telas/), listados no [índice](../02-telas/indice.json): 15 entradas, 104 momentos e 82 estados. Cada referência desenha o app em **360 × 800**; o PNG a 2× tem 720 × 1600. Esse gabarito vale para a stack escolhida pelo time.

## Como medir

1. Renderize o app e o HTML da referência no mesmo navegador, na mesma escala. Isso permite separar diferenças de desenho da rasterização da fonte.
2. Compare pixel a pixel. O protótipo usa `pixelmatch`, limiar 0,1; a meta contra o HTML é 0%. Toda diferença precisa de um nome e uma causa comprovada.
3. Confira também o PNG aprovado. Ele carrega a rasterização do gerador do design; diferenças de fonte não autorizam mudar medidas, cores ou componentes.

[tela.mjs](../06-prototipo/app/scripts/tela.mjs) reúne fotografia, comparação e textos; o cabeçalho documenta os argumentos. O fotógrafo atende à renderização, e os arquivos gerados ficam em `app/prints/`.

## Qual evidência ler

Cada rodada registra o que comparou, o que mudou e o que piorou na entrada dela do [registro de mudanças](../CHANGELOG.md). Pra conferir o estado de agora, rode a bancada inteira (`node scripts/tela.mjs todas`) e a vitrine (`node scripts/especime.mjs todos`).

A rodada de consultas paradas não executou a comparação completa das 201 referências nem a suíte completa de 45 roteiros. Veja o estado de cobertura em [testes-prontos.md](testes-prontos.md).

## Diferenças com nome

O [CHANGELOG](../CHANGELOG.md), os gates e as notas *no protótipo* de cada ficha registram desvios. Entre os históricos recorrentes: **G5**, rasterização dos glifos; **G9**, dado do mock que diverge da estimativa da referência; **G25**, conteúdo ou comportamento sem desenho correspondente. Esses registros explicam situações medidas, sem dispensar a verificação de uma nova implementação.

## Textos, peças e valores

- Textos exatos: `textos.md` de cada tela.
- Peças e variantes: [componentes.md](../03-design-system/componentes.md) e as [dez folhas](../03-design-system/referencias/). São 115 peças normativas; a vitrine do protótipo tem 114 espécimes comparáveis.
- Medidas, cores e tamanhos: [tokens.css](../03-design-system/tokens.css), com 301 tokens distintos e o tema claro no bloco `[data-tema="claro"]`; [tokens.json](../03-design-system/tokens.json) é gerado do CSS, com o valor do claro na extensão `mobs2.tema.claro` de cada cor. O claro não tem referência própria: confira a tela no escuro contra a referência, e o claro contra a paleta da folha 10 (o roteiro `claro` varre as cores de todas as telas).
- Movimento: [movimento.md](../03-design-system/movimento.md) e cada `animacao.md`.
