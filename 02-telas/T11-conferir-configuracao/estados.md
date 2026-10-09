# T11 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | referência da divergência · consulta parada *Não bate com o cadastro* na coluna | M2C-0438 + ONK-8Q90 · caso diff-divergente |
| `01-estado-conteudo-que-o-app-nao-reconhece` | estado | índice que o app não classifica | `indice-nao-classificado` |
| `02-momento-tudo-confere` | momento | a leitura do herói termina sem divergência | `conferencia-confere` |
| `03-momento-outras-acoes` | momento | tocar em Outras ações, no rodapé da conferência | derivado do fluxo |
| `04-momento-conferindo` | momento | a conferência correndo · 400ms por linha | `conferencia-confere` |
| `05-estado-revisar-em-seguida` | estado | reenviou as cercas numa manutenção — o leitor e os eventos dependem delas | `cercas-reenviadas` |
| `06-momento-folha-de-confirmacao` | momento | *Corrigir este bloco* nas cercas: a mesma folha da T09 | `diff-divergente` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

No protótipo, **a entrada normal pelo painel é a sessão do herói**, M2C-0417 + RKT-8H42 (`conferencia-confere`): a leitura chega ao `02`, *Tudo confere*, como a entrada pelo menu nessa sessão. A coluna mantém os estados `01` e `05` e acrescenta, abaixo deles, **Não bate com o cadastro**, usando a referência `00-tela` montada pelo `diff-divergente`, já lida, parada e sem toque. Esse acesso de consulta não transforma a referência em estado nem cria um fluxo alternativo. O `Voltar ao fluxo` restaura a sessão, o quadro e o avanço guardados antes da consulta; aberto diretamente pelo endereço parado, ele volta à semente normal da T11. As referências e as contagens permanecem as mesmas.

Histórico (a entrega do pacote 1; o acesso direto foi substituído pela consulta parada): o `03` era o app vivo — no fluxo, o `Outras ações` do rodapé da `00` o abre, e a URL diz o `03` enquanto a folha está aberta; pelo endereço, ele abre com a semente (o par do `diff-divergente`), a folha aberta e a leitura feita, e fecha dos quatro jeitos da lei 20 de volta à `00`. O `04` de antes, a versão ilegível, saiu com a decisão 53.

No protótipo (a resposta do arquiteto de 26/09): o `02` é o par do herói — o caso `conferencia-confere`, o RKT-8H42 com o M2C-0417 —, que confere, como a referência desenha. O endereço do `02` monta esse par (`06-prototipo/logica.md` · o que diverge). A descrição antiga da tabela, *diff-divergente, invertido*, não produzia esse quadro; a tabela agora nomeia o caso efetivamente usado, `conferencia-confere`.

No protótipo (o pacote 2, decisão 53): o `05` abre só pela coluna, parado e sem toque, montado pelo caso `cercas-reenviadas` (a receita) no par que o caso declara, o do herói (RKT-8H42 + M2C-0417): o bloco que o caso diz reenviado (`reenviado: cercas`) confere, e o arraste do mock (`M.cadeia.arraste`) marca o leitor e os eventos pra revisar em seguida. No fluxo de uma sessão divergente real, o mesmo quadro nasce do `Corrigir este bloco` nas Cercas (a T09 na manutenção, a cadeia curta, o menu e a conferência reaberta) — no par da semente, com a APN ainda divergindo, então o cabeçalho é o vermelho (`tela.md`).

A folha `03`, *Divergência · outras ações*, também está na coluna, parada sobre o exemplo divergente. O link antigo desse momento abre a mesma consulta. O endereço simples da T11 abre a conferência normal; o print conserva a referência.
