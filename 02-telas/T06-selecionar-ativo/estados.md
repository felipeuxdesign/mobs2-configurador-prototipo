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

- **no protótipo** (o pacote 1, construído e medido em 02/10, `node scripts/tela.mjs compara T06 <ref>`): o `01`, o `05`, o `06`, o `10` e o `11` saem em **0% contra o HTML**. Ficam, com nome, as diferenças de antes: o `00` (0,43%), a `08` (0,03%) e a `09` (0,02%), os 10 ônibus e o *10 no pacote* contra os 5 que as referências desenham (G9), e a lupa do Lucide (G5); o `04` (0,57%), o KUD-4Y21 do Pátio Caruaru, do caso, contra o ONK-8Q90 da Ibura que a referência desenha (G9) — a referência do pacote 1 mudou só o título. Contra o PNG, o `11` dá 4,16%: no PNG, o *vez.* da frase do aviso desce pra segunda linha; no HTML, no mesmo Chrome do app, a frase cabe numa linha (261 px de texto numa caixa de 264) — é a rasterização do gerador, e o desenho segue o HTML. O `10` e o `11` são quadros da confirmação, como o `04` a `06`: o aviso fica entre o título e o escolhido, e o escolhido desce em relação ao `01` (`animacao.md`)
