# T02 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | Viação Atlântico Sul · três garagens · Várzea com pacote de ontem |
| `01-momento-escolhida` | momento | tocar numa garagem | `ucs · uos` |
| `02-estado-lista-longa-com-busca` | estado | a empresa tem mais de 6 garagens — a busca aparece, e a lista rola por baixo do rodapé | `lista-longa-garagens` |
| `03-momento-busca-sem-resultado` | momento | digitar na busca um nome que não existe | `lista-longa-garagens` |
| `04-momento-busca-esconde-a-escolha` | momento | com uma garagem escolhida, digitar uma busca que esconde ela | `lista-longa-garagens` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
