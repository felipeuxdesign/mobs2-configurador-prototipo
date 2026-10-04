# T05 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | tocar num módulo da lista: a linha marca e o `Conectar ao …` acende | cinco módulos por perto · o M2C-0417 marcado, o do herói |
| `01-momento-nenhum-escolhido` | momento | a busca achou, nada tocado ainda | `modulos` |
| `02-momento-um-encontrado` | momento | só um módulo por perto | `modulos` |
| `03-estado-nenhum-encontrado` | estado | nenhum módulo responde | `busca-vazia` |
| `04-estado-conexao-falhou` | estado | o módulo não responde ao conectar | `conexao-falha` |
| `05-momento-procurando` | momento | `Procurar de novo` · 1,2s antes da lista voltar | `modulos` |
| `06-momento-conectando` | momento | tocar em `Conectar ao M2C-0417` · 1,2s antes da T07, ou do não respondeu da 04 | `modulos` |
| `07-momento-conectado` | momento | o módulo responde: o traço lima se desenha embaixo da linha, e o botão diz *Conectado ao M2C-0417*, antes da T07 | `modulos` |
| `16-estado-bluetooth-desligado` | estado | o Bluetooth do celular está desligado | `bluetooth-desligado` |
| `17-estado-bluetooth-sem-permissao` | estado | o técnico negou a permissão do Bluetooth | `bluetooth-sem-permissao` |

- no protótipo · a nossa versão da linha *03-estado-nenhum-encontrado*, antes desta entrega: | `03-estado-nenhum-encontrado` | estado | nenhum módulo responde | `busca-vazia` (com a duração, AC-18) |

- no protótipo · a nossa versão da linha *02-momento-um-encontrado*, antes desta entrega: | `02-momento-um-encontrado` | momento | só um módulo por perto · no protótipo, só pelo endereço | `situacao.porPerto` (só o do herói) · `modulos` |

- no protótipo · a nossa versão da linha *01-momento-nenhum-escolhido*, antes desta entrega: | `01-momento-nenhum-escolhido` | momento | a busca achou, nada tocado ainda | `situacao.porPerto` · `modulos` |

- no protótipo · a nossa versão da linha *00-tela*, antes desta entrega: | `00-tela` | tela | a entrada da tela | cinco módulos por perto (`situacao.porPerto`: o do herói e outros quatro) · M2C-0417 é o do herói |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
