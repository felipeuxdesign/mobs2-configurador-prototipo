# T07 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · doze sinais do mock |
| `01-estado-fora-da-faixa` | estado | um sinal fora do esperado | `can-estatico-isolado` |
| `02-estado-sem-leitura` | estado | um sinal não chega | `can-estatico-ausente` |
| `03-estado-dominio-mudo` | estado | um domínio inteiro calado | `can-estatico-dominio` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
