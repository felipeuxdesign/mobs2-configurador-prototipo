# T10 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · hodômetro 184.320 no módulo, 482.317 no painel |
| `01-momento-hodometro-semeado` | momento | `Semear o hodômetro` | `calibracao` |
| `02-estado-rotacao-caminhao-coletor` | estado | o modelo calibra rotação e velocidade | `calibracao.porModelo · ma-02 · KNB-5H39` |
| `03-estado-ja-semeado` | estado | o hodômetro já foi semeado antes | `calibracao` |
| `04-estado-modulo-sem-pulsos` | estado | o módulo não recebe pulsos | `grandeza-indisponivel` |
| `05-momento-hodometro-digitado` | momento | digitar o valor do painel | `calibracao.painel · a-01` |
| `06-momento-camera-do-painel` | momento | tocar em `Fotografar o painel` | derivado do fluxo |
| `07-momento-painel-fotografado` | momento | `Tirar foto` | derivado do fluxo |
| `08-momento-horimetro` | momento | `Calibrar o horímetro` | `calibracao.painel · a-01 · horimetro` |
| `09-momento-calibracao-completa` | momento | `Semear o horímetro`, com a releitura conferindo | derivado do fluxo |
| `10-estado-releitura-nao-confere` | estado | a releitura passa da tolerância: 500 m a menos, e o limite é 120 m | `releitura-nao-confere` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

**O rótulo da caixa do que não se aplica** (T10·5, C9): `NÃO SE APLICAM NESTE MODELO` quando todo motivo vem do cadastro do modelo; `NÃO SE APLICAM` quando pelo menos um vem do módulo — o módulo que não lê pulsos derruba a rotação e a velocidade (a 04, que mistura dois motivos do módulo com um do cadastro).
