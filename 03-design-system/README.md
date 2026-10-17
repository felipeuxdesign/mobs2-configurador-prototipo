# O design system

**A identidade em três linhas:** um painel de instrumentos de ônibus, no escuro. Lima sobre roxo, reservado ao veredito, ao escolhido e ao texto do botão primário (no claro, o lima vira roxo e o texto do primário fica branco). Os números leem como mostrador: tabulares, com a unidade ao lado.

| Arquivo | O que tem |
|---|---|
| [tokens.css](tokens.css) · [tokens.json](tokens.json) | 316 tokens de cor, tipo, espaço, medida e movimento, e o tema claro: as 50 cores que mudam no claro, cada uma com o par dela no bloco `[data-tema="claro"]` do CSS e na extensão `mobs2.tema.claro` no JSON. O CSS é a norma; o JSON é gerado dele por `npm run tokens`, na pasta `06-prototipo/app`. |
| [leis.md](leis.md) | As leis visuais, as de medida (com *O texto de apoio tem 16 de altura de linha*) e as regras de produto R-01 a R-24 (as do modo claro, R-16 a R-24: o rebaixado e o poço, o botão no rebaixado, o andamento e a barra de status, no pacote 37), com as revisões declaradas. |
| [movimento.md](movimento.md) | Movimento das peças e cadência de apresentação dos processos. No produto, as leituras dependem do equipamento e dos serviços. |
| [componentes.md](componentes.md) | 115 peças normativas nas dez folhas (o interruptor e o avatar da conta entraram no pacote 30; o logo, no 31; o tracinho vazio, no 32; o tracejado do vazio, no 33); em seção própria, as variantes medidas na construção do protótipo. |
| [referencias/](referencias/) | Dez folhas do design system, em HTML e PNG · a nona, *A manutenção e o rodapé*, com as peças do reenvio sem arraste e as regras do rodapé · a décima, *O modo claro*, com a paleta do claro neutro frio e o interruptor, refeita no pacote 37 com a seção *As superfícies do claro*: o poço e o rebaixado, o botão no rebaixado, o andamento, o andamento no alerta e o interruptor desligado. |
| [icones/](icones/) | **os 41 ícones do app**, um SVG por desenho, com a cor do token · o `README` diz onde cada um aparece · o ícone é este desenho, nunca o parecido de uma biblioteca (lei 14) |
| [claro-amostras/](claro-amostras/) | **26 telas no claro, pra conferir** · não são referências oficiais: são o gabarito das regras do claro que dependem do lugar · o `README` diz o que conferir em cada uma |

**Censo atual:** 15 telas e 201 referências de tela, separadas das folhas de componentes. O catálogo normativo tem 115 peças; a vitrine do protótipo possui 114 espécimes comparáveis, incluindo estados e grupos de átomos. Peça, variante e espécime são contagens diferentes.

**Dois temas.** O escuro é o padrão; o claro, neutro frio, no espírito da Linear, é escolha do técnico na folha da Conta (a linha *Modo claro*, T04/05) ou no pé da sidebar do palco, lembrada no aparelho, inclusive no login. O logo segue o token `--logo`: lima no escuro, o roxo institucional no claro. As cores dos dois estão no `tokens.css`, o claro no bloco `[data-tema="claro"]`, e no `tokens.json`, como extensão de cada cor. A folha 10 mostra a paleta do claro, no formato da folha 1 · as telas do claro não são desenhadas: nascem das do escuro, trocando os tokens. No protótipo, ligar o claro é pôr `data-tema="claro"` na raiz do app.

As 25 cores nomeadas vêm do CSS: 6 fundos, 7 bordas, 4 tintas, 4 cores fora de texto e 4 de ação. **Toda medida é por dentro:** o poço de 24 tem 24, o botão de 56 tem 56, e a linha de 38 tem 38.

Para implementar, leia a referência da tela, o componente e sua variante medida. O [mapa das peças](../06-prototipo/app/src/ds/MAPA.md) indica o componente usado no protótipo; o [guia de comparação](../08-para-o-dev/conferir-contra-o-design.md) explica como conferir o resultado. Contagens e medições de versões anteriores permanecem no [CHANGELOG](../CHANGELOG.md).
