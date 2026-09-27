# T02 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | Ver as unidades, com uma empresa só — o nome dela fica em cima das unidades | `uma-empresa` |
| `01-momento-escolhida` | momento | tocar numa unidade, com uma empresa só | `uma-empresa` |
| `02-estado-lista-longa-com-busca` | estado | a empresa tem mais de 6 unidades — a busca aparece, e a lista rola por baixo do rodapé | `lista-longa-garagens` |
| `03-momento-busca-sem-resultado` | momento | digitar na busca um nome que não existe | `lista-longa-garagens` |
| `04-momento-busca-esconde-a-escolha` | momento | com uma unidade escolhida, digitar uma busca que esconde ela | `lista-longa-garagens` |
| `05-estado-escolher-a-empresa` | estado | a entrada da tela, pra quem tem várias empresas — o herói | `empresas` |
| `06-estado-unidades-com-trocar-empresa` | estado | Ver as unidades, pra quem tem várias empresas | `empresas · ucs · uos` |
| `07-momento-empresa-escolhida` | momento | tocar numa empresa da lista — ou voltar pelo Trocar de empresa, com a atual marcada | `empresas` |
| `08-estado-uma-empresa-ja-marcada` | estado | a entrada da tela, pra quem tem uma empresa só — ela já vem marcada | `uma-empresa` |
| `09-momento-unidade-escolhida-com-trocar-empresa` | momento | tocar numa unidade, pra quem tem várias empresas | `empresas · ucs · uos` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

No protótipo (a otimização do design, construída; o mundo do herói desde a otimização 400): o `05`, o `06` e o `08` abrem pela coluna do palco e pelo endereço, parados e sem toque, como todo estado — a receita deles em `app/src/estado/receitas.js`. O `05` e o `06` são o mundo do herói, `M.empresas`: o `05` com as três empresas e nada escolhido, o `06` com as unidades da Viação Atlântico Sul e nada escolhido. O `08` é o caso `uma-empresa`: a lista com ela já marcada, *1 EMPRESA* e o `Ver as unidades` aceso. As três referências.

No protótipo (a otimização 400, construída): **o Entrar da T01 leva o herói ao `05`**, e ele anda por toque — `05` → `07` → o quadro do `06` → `09` → `Sincronizar` → T03 → o menu. A URL diz o momento de cada quadro: o `07` e o `09`; o quadro do `05` e o do `06`, que são estados, ficam sem momento. O `07` e o `09` abertos pelo endereço são o app vivo no mundo do herói; o `Trocar de empresa`, da tela e da folha do menu, volta ao `07` com a atual marcada (MUDA o padrão b da última entrega, que voltava ao `05` sem nada escolhido). Com as outras duas empresas escolhidas, o `Ver as unidades` espera (confirmado pelo arquiteto em 26/09). De uma empresa só, a tela pelo endereço, e pelo pulo do palco, é a `00` — o app vivo no mundo do caso `uma-empresa`, a semente da T02 —, e o `01` pelo endereço também; o `08`, a entrada desse mundo, só abre parado. O mundo vai junto no estado único, com a unidade (`contexto.empresas`), e o `Ver as unidades` e o `Trocar de empresa` gravam o quadro ali também: o `Voltar ao fluxo` do palco devolve o quadro de antes, no mesmo mundo. O endereço copiado no quadro do `05` ou do `06` reabre a `00`, de uma empresa só (desvio nomeado, `06-prototipo/palco.md` · O link publicado). O detalhe está no `tela.md` · O que se toca.

No protótipo (a otimização do design): a linha do `04` com *garagem*, que ficou repetida no fim da tabela quando a entrega foi juntada, saiu — a do `04` com *unidade* é a mesma referência (a lei 18).
