# Gate · o retorno do PM de 09/10 — a ordem do script

Gate sem espera. Por cima do pacote 28 (o véu, ec6cab6) e do complemento 28b (o palco, 7491bb8).

## Censo

**199 referências** — 15 telas, **81 estados, 103 momentos** · 109 histórias · 295 tokens (nenhum novo) · 106 peças · **63 casos** no mock (entrou o `falta-reenviar`) · gate do mock com 217 checagens. O pacote trouxe 97 arquivos (81 mudam, 16 entram): os 78 de referência (39 pares HTML/PNG, 8 novos) entraram inteiros; as 19 fichas, textos, mock, gate, índice, `logica.md` e CHANGELOG vieram de cópias antigas e entraram só nas linhas deste retorno (o CHANGELOG tem a entrada).

## O que foi construído

- **A ordem e a pendência** ([reenvio.js](../app/src/estado/reenvio.js)): `BLOCOS_DO_SCRIPT`, quem depende de quem (`M.dependentes`), o motivo (`M.motivosDependente`) e uma lista só do que ficou para depois, `etapas.manutencao.faltaReenviar` (`{ bloco, por }`), lida pela T09, pela T11 e pela T13.
- **T09**: a lista com os cinco blocos; a folha de confirmação (13, 17, 18) antes do bloco com dependente; o enviando com quem precisa ser reenviado depois (09); a pergunta pelos dependentes, um por vez (10, 14, 15); o *falta reenviar* (16).
- **T11**: Ativo, Cercas, Leitor, Eventos e Conexão; o Ativo traduz a CAN; *Reenviar tudo, menos a conexão*; o *revisar em seguida* com o Reenviar e o motivo; o Corrigir este bloco com a folha (06).
- **T13**: o Autoteste *roda ao encerrar*, fora da contagem (D com 8, herói com 27); a D com o *revisar em seguida* (43) e o Finalizar desligado com a causa; o veredito do registrado com 12 de respiro (da tela, não da peça). **T12**: 27 de 27, pelo mock.

## A conferência

**As referências das quatro telas**, contra o HTML novo (a bancada `tela.mjs`), comparadas com a linha de base anterior (`linha-de-base-comp3.json`): **nenhuma piorou** (a única marcada, a T13/10, é o desvio do ciclo do véu: a referência ainda sem a tela de origem).

| novas e mudadas | HTML | nota |
|---|---|---|
| T09/08, 10, 14, 15 | 0% · 0,02% | |
| T09/09 | 0,10% | |
| T09/13, 17, 18 (as folhas) | 0,52 a 0,56% | |
| T09/16 | 0,11% | |
| T11/00, 01, 03, 05 | 0,02 a 0,03% | |
| T11/02, 04 | 0,58% · 0,49% | o rodapé a 2–3px, igual no app do HEAD anterior (resíduo antigo) |
| T11/06 (a folha) | 0,54% | |
| T12/01, 04, 05 | 0,23% · 1,49% | iguais à base (o desvio nomeado da T12/04 e 05) |
| T13/00, 01, 02, 03, 12, 16, 21, 23, 25 | 0,04 a 0,12% | |
| T13/11, 14 | 0,04% | o respiro de 12 do veredito |
| T13/04, 05, 06, 13, 38 a 42 | 1,61 a 5,24% | todas iguais ou melhores que a base (resíduos antigos) |
| T13/43 | 2,51% | os 2px de deslocamento que a 04 já tinha, e o vão de 2 entre as linhas do item (a referência desenha 1, sem token) |

**O fluxo das cercas inteiro** (o roteiro novo [reenvio](../app/scripts/caminhos/reenvio.mjs), **64 passos, aprovado**): a lista → *Reenviar as cercas* abre a folha (sobe em 200) com *Reenviar as cercas apaga os cartões gravados no módulo.* → Cancelar fecha (150) → de novo, e confirma → o enviando, *Leitor e Eventos precisam ser reenviados depois. Você confirma em seguida.*, sem *ficam como estão* → conferiu: *Cercas conferem. Dois blocos dependem delas.*, a pergunta surge (150), *Reenviar os eventos* desligado → *Deixar para depois* no leitor: ele fica *falta reenviar* e o Reenviar dos eventos acende no lugar (150) → os eventos para depois → o checklist com *Falta reenviar o leitor e os eventos.* e o Finalizar desligado, a D com *revisar em seguida* e *roda ao encerrar* → o Reenviar do leitor pela D: a lista com o que falta (16), a folha do leitor (18), a curta, *Leitor confere. Um bloco depende dele.* (15) → *Reenviar os eventos* direto → *Eventos conferem.* → o checklist sem pendência.

Nenhuma entrada viva do palco leva à manutenção (os exemplos são consultas paradas desde 07/10): o roteiro semeia o vínculo de manutenção que a T06 gravaria (`etapas.ativo.modo`) e segue só com toques. O passo `executa` entrou no `caminho.mjs` pra isso.

**Roteiros:** a suíte inteira (`todos`): **37 aprovados**, entre eles `reenvio`, `mov-t09` (com a manutenção reescrita, viva), `mov-t11`, `conferencia`, `checklist`, `mov-t13`, `mov-t12`, `mov-check`, `recebido`, `heroi`, `heroi-sem-horimetro` e `readme`. **10 param — `empresa`, `mov-faixa`, `mov-listas`, `mov-porcima`, `mov-t02`, `mov-t03`, `recarregar`, `reler`, `teclado` e `voltar` — e todos param no mesmo passo no commit anterior (7491bb8)**: são entradas da T02, da T10 e da T13/29 que viraram consultas paradas em 07/10, fora deste pacote.

`npm run checar` aprovado (217 checagens do mock, tokens, estados com rótulo, higiene) · build aprovado · a vitrine contra a base de espécimes (abaixo).

## A lista do PM, "Antes de devolver"

| | |
|---|---|
| toda lista de blocos segue Ativo, Cercas, Leitor, Eventos, Conexão | ✔ a lista da T09 (08, 16), a T11 (as cinco linhas), a Seção D da T13 (depois da Limpeza) |
| a T11 tem cinco linhas, e a do Ativo existe nos três estados | ✔ Conferindo (04), Tudo confere (02), Não bate (00) |
| o bloco de conexão se chama Conexão em T09, T11 e T13 | ✔ |
| nenhum reenvio de bloco dispara outro sem um toque do técnico | ✔ a curta reenvia um bloco; o dependente só com o Reenviar da pergunta |
| a folha de confirmação nomeia a consequência | ✔ 13, 17, 18 e a T11/06 |
| o botão dos eventos só liga depois do leitor conferir ou ser deixado para depois | ✔ (o roteiro confere o desligado e o acender) |
| Deixar para depois deixa o bloco como revisar em seguida e desliga o Finalizar | ✔ T11/05, T13/43 |
| ficam como estão não aparece com leitor ou eventos pendentes | ✔ (o roteiro confere; sem dependente, a frase tira o que falta) |
| a Seção D não mostra Autoteste · confere antes do encerramento | ✔ *roda ao encerrar* |

## Desvios nomeados

1. *Reenviar tudo, menos a conexão* leva à cadeia inteira da T09, que regrava também a Conexão: a cadeia sem ela não tem referência nem regra de limpeza desenhada.
2. Padrões, pro arquiteto: o Reenviar da pergunta corre o dependente direto, sem folha (a pergunta é a confirmação); o deixado para depois diz *falta reenviar* no lugar dos botões; sair com dependente por decidir grava ele como *falta reenviar*; os textos sem referência (*Reenviando só o ativo.*, *Eventos conferem.*, *Conexão confere.*, *Reenviar a conexão*) seguem a gramática dos desenhados.
3. Variantes aditivas de peça, só com tokens existentes, nenhuma peça existente muda: o item do checklist `espera` e `revisar`, o valor `forte` da linha de escolha. A pergunta pelos dependentes é peça da tela (T09/Pergunta.jsx), e o `BotaoDaLinha` ganhou o tamanho de 36. Pro arquiteto pôr nas folhas 3 e 7.
4. O Reenviar da pergunta e o Deixar para depois têm 36 de desenho, como a referência; o toque não cresce a 48.
