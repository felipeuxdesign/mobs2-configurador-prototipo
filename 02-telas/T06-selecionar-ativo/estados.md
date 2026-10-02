# T06 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 · dez ônibus no pacote |
| `01-momento-confirmar-o-veiculo` | momento | tocar num ônibus | `ativos` |
| `04-estado-fora-do-pacote` | estado | o ônibus não está no pacote | `ativo-fora-pacote` |
| `05-estado-conflito-de-pinos-resolvivel` | estado | pinos ocupados, com saída | `conflito-pinos-resolvivel` |
| `06-estado-conflito-de-pinos-sem-saida` | estado | pinos ocupados, sem saída | `conflito-pinos-sem-saida` |
| `08-momento-busca-sem-resultado` | momento | digitar na busca uma placa que não existe | derivado do fluxo |
| `09-momento-busca-esconde-a-escolha` | momento | com um ativo escolhido, digitar uma busca que esconde ele | derivado do fluxo |
| `10-estado-modulo-em-outro-ativo` | estado | o módulo já está vinculado a outro ativo | `modulo-em-outro-ativo` |
| `11-estado-modulo-ja-deste-ativo` | estado | o módulo já é deste ativo — manutenção | `modulo-ja-deste-ativo` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
