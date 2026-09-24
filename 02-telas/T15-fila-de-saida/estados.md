# T15 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | fila com dois itens · um com erro |
| `01-estado-sem-erro` | estado | a fila sem erros | `filaSaida` |
| `02-estado-dois-erros` | estado | dois itens recusados | `filaSaida` |
| `03-estado-fila-vazia` | estado | nada esperando envio | `filaSaida` |
| `04-estado-secao-f-em-re-checagem` | estado | a Seção F esperando o servidor | `secaoF · RVM-1E54` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
