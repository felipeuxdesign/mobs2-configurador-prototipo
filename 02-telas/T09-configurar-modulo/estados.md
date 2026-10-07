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
| `08-momento-manutencao-escolher-o-bloco` | momento | `Configurar módulo`, numa manutenção | `modulo-ja-deste-ativo` |
| `09-momento-manutencao-reenviando` | momento | `Reenviar`, com um bloco escolhido | `modulo-ja-deste-ativo` |
| `10-momento-manutencao-concluida` | momento | a cadeia curta da manutenção fecha · as cercas relidas | derivado do fluxo |
| `07-estado-pontos-de-cerca-demais` | estado | as cercas têm mais pontos do que o módulo guarda | `pool-esgotado` |
| `11-momento-conferindo-o-servidor` | momento | o módulo falou com o servidor? conferindo | `heroi` |
| `12-estado-o-modulo-ainda-nao-falou-com-o-servidor` | estado | ainda não, com o que conferir | `servidor-ainda-nao` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

- no protótipo · o pacote 1 (02/10): a `00` é a tela da régua — no print, `?tela=T09` fica no quadro da cadeia correndo; fora do print, o mesmo endereço é o app vivo na semente (*abre no que vai ser gravado*), e a URL passa a dizer o `05`. A `00` se alcança no fluxo, no `Gravar no módulo` · o `08` e o `09` pelo endereço são a sessão da semente, o par do caso `modulo-ja-deste-ativo` (o herói); no fluxo, o `08` vem do modo que a T06 grava · o `06` e o `07` abrem pela coluna, montados pelo caso; no fluxo, valem toda vez que o par da faixa é o do caso, porque são a regra do cadastro (`tela.md` · No protótipo · o pacote 1)
