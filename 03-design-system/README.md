# O design system

**A identidade em três linhas:** um painel de instrumentos de ônibus, no escuro. Lima sobre roxo, reservado ao veredito, ao escolhido e ao texto do botão primário. Os números leem como mostrador: tabulares, com a unidade ao lado.

| Arquivo | O que tem |
|---|---|
| [tokens.css](tokens.css) · [tokens.json](tokens.json) | 295 tokens de cor, tipo, espaço, medida e movimento. O CSS é a norma; o JSON é gerado dele por `npm run tokens`, na pasta `06-prototipo/app`. Os dois contêm os mesmos 295 valores. |
| [leis.md](leis.md) | 24 leis visuais, leis de medida e regras de produto, com as revisões declaradas. |
| [movimento.md](movimento.md) | Movimento das peças e cadência de apresentação dos processos. No produto, as leituras dependem do equipamento e dos serviços. |
| [componentes.md](componentes.md) | 106 peças normativas nas oito folhas; em seção própria, as variantes medidas na construção do protótipo. |
| [referencias/](referencias/) | Oito folhas do design system, em HTML e PNG. |

**Censo atual:** 15 telas e 191 referências de tela, separadas das folhas de componentes. O catálogo normativo tem 106 peças; a vitrine do protótipo possui 114 espécimes comparáveis, incluindo estados e grupos de átomos. Peça, variante e espécime são contagens diferentes.

As 25 cores nomeadas vêm do CSS: 6 fundos, 7 bordas, 4 tintas, 4 cores fora de texto e 4 de ação. **Toda medida é por dentro:** o poço de 24 tem 24, o botão de 56 tem 56, e a linha de 38 tem 38.

Para implementar, leia a referência da tela, o componente e sua variante medida. O [mapa das peças](../06-prototipo/app/src/ds/MAPA.md) indica o componente usado no protótipo; o [guia de comparação](../08-para-o-dev/conferir-contra-o-design.md) explica como conferir o resultado. Contagens e medições de versões anteriores permanecem nos gates e no [CHANGELOG](../CHANGELOG.md).
