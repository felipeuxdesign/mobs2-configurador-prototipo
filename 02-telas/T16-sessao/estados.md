# T16 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 homologada |
| `01-momento-pede-o-corte-de-alimentacao` | momento | o passo do corte | `autotesteEncerramento` |
| `02-momento-sessao-encerrada` | momento | o autoteste passa | `autotesteAssertivas` |
| `03-momento-encerrando-sem-homologar` | momento | ENCERRAR antes de homologar | derivado do fluxo |
| `04-momento-encerrada-sem-homologar` | momento | os 4 passos terminam | derivado do fluxo |
| `05-estado-assertiva-falhando` | estado | uma assertiva falha | `autoteste-falhando` |
| `06-estado-sessao-interrompida` | estado | a sessão caiu e volta oferecida | `sessao-interrompida` |
| `07-momento-autoteste-correndo` | momento | as assertivas acendem em ordem · 400ms cada | `autotesteAssertivas` |

- no protótipo · a nossa versão da linha *01-momento-pede-o-corte-de-alimentacao*, antes desta entrega: | `01-momento-pede-o-corte-de-alimentacao` | momento | o passo do corte, na sessão do KNB-5H39 · M2C-0371, pelo endereço (T16·1) | `modelos · vl08 · reinicioPorComando: false` |

- no protótipo · a nossa versão da linha *02-momento-sessao-encerrada*, antes desta entrega: | `02-momento-sessao-encerrada` | momento | o autoteste passa | `autotesteEncerramento` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

**Os contadores do cabeçalho** seguem duas regras, como as referências desenham (G11, T16-A4): com a sessão homologada, o contador é o passo que corre (`3 de 8` na 00, `2 de 8` na 01); sem homologar, é quantos dos 4 já fecharam (`1 de 4` na 03). Na sessão encerrada, só quando uma assertiva falha: o total de `autotesteEncerramento` menos as reprovadas (`7 de 8` na 05, T16·3).

**A assertiva Contadores** mostra o que o painel do ônibus tem no mock (`calibracao.painel`: `482.317 km · 9.640 h` no herói). No ônibus que não tem contador no mock, ela fica *ainda não*, com o traço — nunca o check sem o valor lido (HU-T16-4).
