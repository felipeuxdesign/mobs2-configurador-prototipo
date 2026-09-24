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

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
