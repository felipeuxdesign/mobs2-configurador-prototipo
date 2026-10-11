# Gate · pacote 29c — ajustes de leitura, o "Deixar para depois" e a folha 9

Gate sem espera. Por cima do 29 (0a4481b) e do 29b (9baf566).

## Censo

**201 referências** — 15 telas, **82 estados, 104 momentos** · **9 folhas** no design system · **110 peças** no catálogo (as quatro da folha 9 entraram na tabela da folha 6, como no catálogo do arquiteto: o pacote não citou o número, e os censos foram atualizados) · 109 histórias · 295 tokens (nenhum novo) · 63 casos (nenhum novo).

O pacote trouxe 72 arquivos (66 mudam, 6 entram). Os 58 de referência (29 pares) entraram inteiros. As fichas, o catálogo, as leis, o README do design system, o índice, o `logica.md` e o CHANGELOG vieram de cópias antigas: entraram só as linhas deste pacote (o CHANGELOG tem a lista).

## A conferência

**A cadeia concluída (T09/04)** a 0,07% do HTML: a caixa dos 6 passos logo abaixo do título e dos pinos, a tela no topo, *O módulo falou com o servidor* dentro da Conexão. A subida até o topo (300, desacelerando, por quadro) e a caixa esmaecendo (200) estão no código, pra quando a Conexão confere com a tela rolada; no protótipo a cadeia cabe inteira enquanto corre (577 de 577 no 360 × 800), e a concluída nasce no topo, com a caixa à vista — o `mov-t09` mede a caixa visível e a rolagem em 0, e a animação de 200 da caixa. A 12 continua abrindo embaixo (R-14).

**O fluxo das cercas com o Deixar para depois** (o roteiro `reenvio`, 73 passos, aprovado): a folha → o envio → a pergunta (10) → *Deixar para depois* no leitor: *fica para depois* no lugar do link, o Reenviar ao lado, e o *Reenviar os eventos* acende (150) → o técnico muda de ideia, *Reenviar o leitor*: só o leitor (09), e a pergunta volta com ele *confere · reenviado* (20) → os eventos para depois → o checklist com *Falta reenviar os eventos.* e o Finalizar desligado → o Reenviar dos eventos pela Seção D, a folha do leitor (18) que ainda abre na lista, os eventos sem folha → nada falta.

**A Limpeza em duas linhas**, **o cartão da T06 do tamanho do conteúdo**, **a caixa da T05 a 16 do rodapé**:

| referência | HTML | |
|---|---|---|
| T09/00, 01, 02, 03, 05, 06, 07, 11 | 0,06 a 2,15% | as que têm resíduo (01, 02 a 2,15%) são iguais à base |
| T09/04 | 0,07% | era 2,9% na base |
| T09/12 | 4,8% | a rolagem: a referência para 28px antes do fim, e o app vai até o fim (era 3,5% na base, o mesmo resíduo) |
| T09/19, 20 | 0,02% · 0,03% | novas |
| T05/16, 17 | 0% · 0% | |
| T06/01, 06, 10, 11 | 0% | |
| T06/04 | 0,57% | igual à base |
| T11/02 | 0,03% | o rodapé do app já tinha os 8: a referência é que mudou |

**As 201 contra a linha de base** (`linha-de-base-comp3.json`): 25 melhoraram, 3 marcadas — a T13/10 (sem a tela de origem, desde o véu), a T11/04 (o rodapé, igual no HEAD) e a T09/12 (a rolagem, acima) —, todas resíduos já nomeados. A medida nova é a base deste pacote (`linha-de-base-29c.json`).

**A área de toque de 48**, medida na vitrine: o Reenviar e o Deixar para depois, 36 de desenho e 48 de toque; o Reenviar de 30 e os botões do bip, idem (a mesma camada); o link do rodapé, 44 e 48, crescendo pra baixo, no app e no login. A camada não tem desenho, e a referência não muda.

**Os ícones riscados por máscara:** o olho da senha, o Bluetooth, o Wi-Fi e a câmera — o vão em volta do risco é uma máscara, não uma linha na cor do poço. T05/16 e 17, T01/14 em 0%, T01/10 em 0,01%; a vitrine inteira (114 espécimes) sem nenhum pior.

**O rodapé do login** continua sem traço.

**Roteiros:** os 46 (`todos`): 36 aprovados — `reenvio` 73 passos, `mov-t09` 240, `mov-t05` 164, `mov-t06` 189, `checklist` 155, `heroi` 239, `readme` 65, `mov-t01` 311, entre outros — e os mesmos 10 parados nos mesmos passos de antes do pacote 29 (T02, T10, T13/29: as entradas que viraram consultas paradas em 07/10). A rodada do 29 tinha escrito *37 aprovados*: erro de conta (36 + 10 = 46), corrigido no README, no gate dela, no guia de testes e no CHANGELOG. `npm run checar` aprovado (217 checagens do mock, os 82 estados com receita) · build aprovado.

## O que entrou além do prompt, e por quê

1. **A folha 9 na vitrine do protótipo** (`src/vitrine/especimes/f9-manutencao.jsx`): a vitrine espelha as folhas, e a 9 precisava estar nela pra o protótipo ficar coerente com o design system. As peças são as em uso (a folha de confirmação, a pergunta nos três momentos, a linha revisar em seguida, o botão secundário, os dois rodapés). Ficam fora da bancada de espécimes: a régua lê o rótulo de 1,4 com a moldura tracejada, e a folha 9 desenha 1,5 com a sólida.
2. **O passo `executa` do `caminho.mjs` falha quando o código devolve um texto**, pra medir a rolagem e a caixa à vista na T09/04.
3. **O roteiro `reenvio`** mudou pro comportamento novo da pergunta (19 e 20), e o `mov-t09` mede a concluída.
4. **Os censos** (README, LEIA-PRIMEIRO, CLAUDE.md, os guias do dev, o domínio, a lógica, o índice das telas) com 201 referências, 9 folhas e 110 peças.
5. **O GIF do README** foi regravado com o mesmo percurso (o caminho feliz, do login à cadeia concluída, e a CAN ao vivo e a homologada pelo endereço): ele passa pela cadeia concluída, que mudou de desenho — 157 quadros, 36,3 s, 330 × 672 · e **o `gif.py` passou a calcular o recorte pelo tamanho de cada quadro**: o primeiro quadro da gravação saiu com 1280 × 794 (a janela ainda se ajustando), e a escala dele cortava o pé do celular em todos os outros (a primeira conversão, 330 × 594, foi descartada).

## Desvios nomeados

1. A subida da 04 não acontece no fluxo do protótipo (a cadeia cabe na tela): o código existe, e o roteiro mede o resultado à vista.
2. O comentário do `--risco-corte` no `tokens.css` ainda fala da cor do poço: o pacote proíbe mexer nos tokens, e o valor (4,6) não mudou — agora ele é a largura do vão da máscara.
3. A T09/12 a 4,8% e a T11/04 a 0,49%: resíduos já nomeados (a rolagem e o rodapé).
