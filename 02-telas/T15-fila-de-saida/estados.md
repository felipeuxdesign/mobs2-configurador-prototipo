# T15 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | a seleção f-10, f-02, f-08 da semente (G21): dois itens esperando, um com erro, e uma recebida |
| `01-estado-sem-erro` | estado | a fila sem erros | `filaSaida` · o recorte `fila-sem-erro`: a fila inteira da Várzea (f-04 subindo, f-01 na fila, f-05, f-06 e f-07 recebidas) |
| `02-estado-dois-erros` | estado | dois itens recusados | `filaSaida` · o recorte `fila-dois-erros`: f-10, f-09, f-02, f-08 |
| `03-estado-fila-vazia` | estado | nada esperando envio | `filaSaida` · o caso `fila-vazia`: nenhum item, o último envio às 14:02, sem sessão |
| `04-estado-secao-f-em-re-checagem` | estado | a Seção F esperando o servidor | `secaoF · RVM-1E54`, sobre a fila vazia do `03` · a janela `criteriosRegra.recheckHoras` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

## As regras dos estados (C11)

- **o prefixo da recusa (T15·1 a):** `o servidor recusou ·` só aparece quando o cartão tem mais de um erro, como no `02`. Com um erro só, o cartão diz só a causa, como no `00`
- **o rótulo do cartão** vem da contagem de erros: um, `UM PRECISA DE VOCÊ`; dois, `DUAS COM ERRO`. A legenda `Só a primeira precisa de você. A segunda reenvia sozinha.` só aparece com a recusa e o erro de rede juntos
- **o contador** conta todos os itens mostrados, pendentes e recebidos (T15·2 a): 3 no `00`, 5 no `01`, 4 no `02`, 0 no `03` e no `04`. A Seção F não entra na conta: não é item de fila (HU-T15-5)
- **a sessão:** no `01` e no `02`, a sessão que o fluxo tem aberta, com ativo; sem ela, a do herói, como as referências desenham; no `03` e no `04`, nenhuma — a faixa sem sessão (T15-V1)
- **a Seção F** aparece só no `04`, em seção à parte, com a janela da re-checagem (`confere em 24 h`). No fluxo e nos outros estados, nenhuma referência a desenha. A i-06, há 9 dias em re-checagem, contra a janela de 24 h, está com o PM (T15-A5)

