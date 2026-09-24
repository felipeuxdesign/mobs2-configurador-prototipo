# T14 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
| `01-momento-antes-do-disparo` | momento | a fila do módulo ainda drenando | `ciclo.mensagensGuardadas` |
| `02-estado-prazo-estourado` | estado | o evento não chega em 2:00 | `evento-sem-resposta` |
| `03-estado-dinamico-fora-do-esperado` | estado | um sinal andando fora do esperado | `can-fora-esperado` |
| `04-estado-identificador-divergente` | estado | o cartão lido não bate | `identificador-divergente` |
| `05-momento-ciclo-concluido` | momento | os cinco passos e o evento | `ciclo` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
