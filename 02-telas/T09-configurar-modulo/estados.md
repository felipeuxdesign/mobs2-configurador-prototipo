# T09 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · os blocos do mock |
| `01-estado-bloco-recusado` | estado | o módulo recusa um bloco | `bloco-recusado` |
| `02-estado-queda-na-cadeia` | estado | o link cai no meio da cadeia | `queda-na-cadeia` |
| `03-estado-recuperacao-ate-a-conexao-gravar` | estado | tentar sair antes da Conexão gravar | derivado do fluxo |
| `04-momento-cadeia-concluida` | momento | o último bloco relido | `cadeia` |
| `05-momento-o-que-vai-ser-gravado` | momento | `Configurar módulo`, numa instalação nova | derivado do fluxo |
| `06-estado-a-configuracao-nao-cabe` | estado | o que vai ser gravado passa do espaço do módulo | `conteudo-nao-cabe` |
| `07-estado-cercas-demais-pro-modulo` | estado | o cadastro tem mais cercas do que o módulo guarda | `pool-esgotado` |
| `08-momento-manutencao-escolher-o-bloco` | momento | `Configurar módulo`, numa manutenção | `modulo-ja-deste-ativo` |
| `09-momento-manutencao-reenviando` | momento | `Reenviar`, com um bloco escolhido | `modulo-ja-deste-ativo` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
