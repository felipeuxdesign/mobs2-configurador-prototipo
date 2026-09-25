# As telas

Uma pasta por tela. Dentro de cada uma, sempre os mesmos cinco itens:

| Arquivo | O que tem |
|---|---|
| `tela.md` | a função, o elemento-assinatura, o chrome, os toques, as peças do design system e as histórias |
| `estados.md` | cada momento e estado: como se chega, o que causa, e o caso do mock que produz |
| `animacao.md` | cada elemento que se move: quando, o quê, quanto tempo, que curva, e o que faz com reduzir movimento |
| `textos.md` | os textos exatos de cada referência, na ordem |
| `referencias/` | `html/` e `png/` com o mesmo nome · **o número diz a ordem, a palavra diz o tipo** |

**Tela** é a entrada. **Momento** é aonde se chega tocando. **Estado** depende do mundo — módulo, ônibus, rede — e no palco abre pela coluna.

| Tela | Pasta | Momentos | Estados |
|---|---|---|---|
| T01 · Login | `T01-login/` | 10 | 4 |
| T02 · Selecionar contexto | `T02-selecionar-contexto/` | 2 | 1 |
| T03 · Sincronizar | `T03-sincronizar/` | 1 | 3 |
| T04 · Menu | `T04-menu/` | 7 | 5 |
| T05 · Conectar módulo | `T05-conectar-modulo/` | 4 | 13 |
| T06 · Selecionar ativo | `T06-selecionar-ativo/` | 3 | 5 |
| T07 · Dados da CAN | `T07-dados-da-can/` | 0 | 3 |
| T08 · Refazer leitura da CAN | `T08-refazer-leitura/` | 2 | 0 |
| T09 · Configurar módulo | `T09-configurar-modulo/` | 1 | 3 |
| T10 · Calibração | `T10-calibracao/` | 6 | 5 |
| T11 · Conferir configuração | `T11-conferir-configuracao/` | 1 | 1 |
| T12 · Últimas instalações | `T12-ultimas-instalacoes/` | 1 | 2 |
| T13 · Checklist | `T13-checklist/` | 9 | 2 |
| T14 · Ciclo dinâmico | `T14-ciclo-dinamico/` | 3 | 3 |
| T15 · Fila de saída | `T15-fila-de-saida/` | 0 | 4 |
| T16 · Sessão | `T16-sessao/` | 4 | 2 |

`indice.json` lista as 126 referências com tela, tipo, nome, título, como se chega, caso do mock e os caminhos do HTML e do PNG. **É o que o palco lê pra montar a coluna.**

**As referências são gabarito, nunca peça do app.** O HTML existe pra você ler um valor exato e pra comparar o seu print com o PNG. O app se constrói com os componentes do design system.
