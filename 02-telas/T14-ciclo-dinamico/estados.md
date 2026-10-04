# T14 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
| `01-momento-antes-do-disparo` | momento | a fila do módulo ainda drenando | `ciclo.mensagensGuardadas` |
| `02-estado-prazo-estourado` | estado | o evento não chega em 2:00 | `evento-sem-resposta` |
| `03-estado-dinamico-fora-do-esperado` | estado | a rotação não aparece: o motor está desligado | `motor-desligado-no-ciclo` |
| `04-estado-identificador-divergente` | estado | o cartão lido não bate | `identificador-divergente` |
| `05-momento-ciclo-concluido` | momento | os seis passos e o evento | `ciclo` |
| `06-momento-correcao-solicitada` | momento | tocar em `Solicitar correção de cadastro` no identificador divergente | `identificador-divergente` |
| `07-momento-vez-da-porta` | momento | depois da ré · abra a porta · o evento já chegou | `ciclo` |
| `08-momento-vez-do-cartao` | momento | depois da porta · passe o cartão | `ciclo` |
| `09-estado-segunda-falha-do-evento` | estado | o evento não chega pela segunda vez: confira a conexão do módulo · *padrão até o PM decidir* | `evento-nao-chega-de-novo` |

- no protótipo · a nossa versão da linha *01-momento-antes-do-disparo*, antes desta entrega: | `01-momento-antes-do-disparo` | momento | a entrada da tela: a fila do módulo ainda drenando (G27) | `ciclo.mensagensGuardadas` |

- no protótipo · a nossa versão da linha *00-tela*, antes desta entrega: | `00-tela` | tela | 6 s depois do disparo: o prazo em 1:36, o instante antes de o evento chegar (C10 · G27: a entrada é a `01`) | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
