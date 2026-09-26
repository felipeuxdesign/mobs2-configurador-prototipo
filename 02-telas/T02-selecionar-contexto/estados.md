# T02 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | Viação Atlântico Sul · três unidades · Várzea com pacote de ontem |
| `01-momento-escolhida` | momento | tocar numa unidade | `ucs · uos` |
| `02-estado-lista-longa-com-busca` | estado | a empresa tem mais de 6 unidades — a busca aparece, e a lista rola por baixo do rodapé | `lista-longa-garagens` |
| `03-momento-busca-sem-resultado` | momento | digitar na busca um nome que não existe | `lista-longa-garagens` |
| `04-momento-busca-esconde-a-escolha` | momento | com uma unidade escolhida, digitar uma busca que esconde ela | `lista-longa-garagens` |
| `05-estado-escolher-a-empresa` | estado | o técnico tem mais de uma empresa — a lista delas vem antes das unidades | `varias-empresas` |
| `06-estado-unidades-com-trocar-empresa` | estado | as unidades de um técnico com mais de uma empresa | `varias-empresas` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

No protótipo (a otimização do design, construída): o `05` e o `06` abrem pela coluna do palco e pelo endereço, montados pelo caso `varias-empresas` — a receita deles em `app/src/estado/receitas.js` —, parados e sem toque, como todo estado. O `05` com as três empresas do caso e nada escolhido; o `06` com as unidades da Viação Atlântico Sul, a empresa do herói, e nada escolhido — as duas referências. Nada no mock dá ao herói mais de uma empresa no fluxo, então o toque de cada um (escolher a empresa, `Ver as unidades`, escolher a unidade, `Sincronizar`, `Trocar de empresa`, o voltar) se prova no node, nas funções que a tela usa (`app/src/telas/T02/empresas.js`, `node app/scripts/testar-empresa.mjs`), e o roteiro `empresa.mjs` confere os dois quadros parados, com a URL de cada um. Os padrões, onde o design não diz, estão no `tela.md` · O que se toca.

No protótipo (a otimização do design): a linha do `04` com *garagem*, que ficou repetida no fim da tabela quando a entrega foi juntada, saiu — a do `04` com *unidade* é a mesma referência (a lei 18).
