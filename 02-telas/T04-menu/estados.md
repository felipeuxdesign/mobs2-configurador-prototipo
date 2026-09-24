# T04 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · fila com 2 itens |
| `01-momento-sem-modulo` | momento | o menu antes de conectar | derivado do fluxo |
| `02-momento-modulo-sem-ativo` | momento | módulo conectado, ônibus ainda não escolhido | derivado do fluxo |
| `03-estado-faixa-modulo-com-falha` | estado | o módulo da sessão perde o link | `link-perdido` |
| `04-estado-checklist-pendente` | estado | o checklist tem itens abertos | `checklist` |
| `05-momento-folha-conta` | momento | tocar nas iniciais | `tecnico` |
| `06-momento-folha-conta-sair-com-sessao-aberta` | momento | `Sair da conta` com sessão ou fila | `filaSaida` |
| `07-momento-folha-trocar-de-garagem` | momento | tocar no nome da garagem | `uos · pacotes` |
| `08-estado-folha-trocar-de-garagem-envio-em-andamento` | estado | trocar com evidência subindo | `filaSaida` |
| `09-estado-folha-trocar-de-garagem-com-modulo-conectado` | estado | trocar com a sessão aberta | derivado do fluxo |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
