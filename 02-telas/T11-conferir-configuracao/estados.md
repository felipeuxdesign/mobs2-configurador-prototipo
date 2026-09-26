# T11 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | M2C-0438 + ONK-8Q90 · caso diff-divergente |
| `01-estado-conteudo-que-o-app-nao-reconhece` | estado | índice que o app não classifica | `indice-nao-classificado` |
| `02-momento-tudo-confere` | momento | nada diverge | `diff-divergente, invertido` |
| `03-momento-outras-acoes` | momento | tocar em Outras ações, no rodapé da conferência | derivado do fluxo |
| `04-estado-versao-ilegivel` | estado | a versão do módulo está ausente, truncada ou num formato desconhecido | `versao-ilegivel` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

No protótipo (a última entrega): o `03` é o app vivo — no fluxo, o `Outras ações` do rodapé da `00` o abre, e a URL diz o `03` enquanto a folha está aberta; pelo endereço, ele abre com a semente (o par do `diff-divergente`), a folha aberta e a leitura feita, e fecha dos quatro jeitos da lei 20 de volta à `00`. O `04` abre só pela coluna, parado e sem toque, montado pelo caso `versao-ilegivel` (a receita) no par da semente: nada no fluxo faz a versão do módulo ficar ilegível.

No protótipo (a resposta do arquiteto de 26/09, *a T11/02 com urbano v3*): o `02` é o par do herói — o caso `conferencia-confere`, o RKT-8H42 com o M2C-0417 —, que confere e diz *urbano v3*, a tradução do modelo dele, como a referência nova desenha. O endereço do `02` monta esse par (`06-prototipo/logica.md` · o que diverge). O *diff-divergente, invertido* da tabela é a letra do design e fica como está: ele não produz esse quadro (pro arquiteto).
