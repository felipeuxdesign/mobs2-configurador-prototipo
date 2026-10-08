# Conferir contra o design

São **191 pares HTML/PNG** em [02-telas](../02-telas/), listados no [índice](../02-telas/indice.json): 15 entradas, 97 momentos e 79 estados. Cada referência desenha o app em **360 × 800**; o PNG a 2× tem 720 × 1600. Esse gabarito vale para a stack escolhida pelo time.

## Como medir

1. Renderize o app e o HTML da referência no mesmo navegador, na mesma escala. Isso permite separar diferenças de desenho da rasterização da fonte.
2. Compare pixel a pixel. O protótipo usa `pixelmatch`, limiar 0,1; a meta contra o HTML é 0%. Toda diferença precisa de um nome e uma causa comprovada.
3. Confira também o PNG aprovado. Ele carrega a rasterização do gerador do design; diferenças de fonte não autorizam mudar medidas, cores ou componentes.

[tela.mjs](../06-prototipo/app/scripts/tela.mjs) reúne fotografia, comparação e textos; o cabeçalho documenta os argumentos. O fotógrafo atende à renderização, e os arquivos gerados ficam em `app/prints/`.

## Qual evidência ler

[conferencia-final](../06-prototipo/para-o-arquiteto/conferencia-final/) preserva uma rodada histórica; não é a comparação mais recente de todas as referências atuais. Consulte os gates por alteração:

- [Folha da T11](../06-prototipo/para-o-arquiteto/gate-padronizacao-folha-t11.md): espaçamento e referência aprovados.
- [Consultas paradas](../06-prototipo/para-o-arquiteto/gate-consultas-paradas.md): 15 referências comparadas contra a base, sem piora; resultados e prints em [consultas-paradas](../06-prototipo/para-o-arquiteto/consultas-paradas/).
- [Documentação e login após recuperação](../06-prototipo/para-o-arquiteto/gate-documentacao-atual.md): escopo e verificações deste ciclo.
- [Véu integral das folhas](../06-prototipo/para-o-arquiteto/gate-veu-integral.md): cobertura do fundo inteiro, incluindo tira, faixa e fundo da barra de status, nas folhas da T01, T04 e T11; os diálogos da T04 compartilham a cobertura. Hora e ícones oficiais ficam legíveis; caixas e painéis conservam suas posições.

A rodada de consultas paradas não executou a comparação completa das 191 referências nem a suíte completa de 45 roteiros. Veja o estado de cobertura em [testes-prontos.md](testes-prontos.md).

## Diferenças com nome

O [CHANGELOG](../CHANGELOG.md), os gates e as notas *no protótipo* de cada ficha registram desvios. Entre os históricos recorrentes: **G5**, rasterização dos glifos; **G9**, dado do mock que diverge da estimativa da referência; **G25**, conteúdo ou comportamento sem desenho correspondente. Esses registros explicam situações medidas, sem dispensar a verificação de uma nova implementação.

## Textos, peças e valores

- Textos exatos: `textos.md` de cada tela.
- Peças e variantes: [componentes.md](../03-design-system/componentes.md) e as [oito folhas](../03-design-system/referencias/). São 106 peças normativas; a vitrine do protótipo tem 114 espécimes comparáveis.
- Medidas, cores e tamanhos: [tokens.css](../03-design-system/tokens.css), com 295 tokens distintos; [tokens.json](../03-design-system/tokens.json) é gerado do CSS.
- Movimento: [movimento.md](../03-design-system/movimento.md) e cada `animacao.md`.
