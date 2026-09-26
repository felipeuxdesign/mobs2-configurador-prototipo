# T03 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | unidade Várzea · pacote pac-uo-01 |
| `01-estado-falha-de-rede` | estado | a rede cai no meio do download | `sync-falha-rede` |
| `02-momento-concluido` | momento | o download termina | `pacotes` |
| `03-estado-pacote-de-4-dias` | estado | o pacote tem entre 3 e 7 dias | `pacotes · pac-uo-02` |
| `04-estado-pacote-vencido` | estado | o pacote passou de 7 dias | `pacotes · pac-uo-03` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
