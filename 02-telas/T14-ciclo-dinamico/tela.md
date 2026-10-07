# T14 · Ciclo de testes

Com a ignição ligada e o ônibus parado, deixar o app provar o que o módulo lê: a rotação, as entradas, o cartão e o evento de teste.

| | |
|---|---|
| **Elemento-assinatura** | o prazo do evento drenando enquanto o evento viaja até o servidor |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 5 · 4 — ver `estados.md` |

## O que se toca

- **no protótipo · o pacote 12:** a 09 monta pelo `evento-nao-chega-de-novo`, só pela coluna, com a 2ª tentativa estourada; a frase da segunda falha é a linha em falha do `Prazo` (`detalhe` com `tom: 'falha'`) · o `Solicitar correção de cadastro` põe o pedido na fila de saída (`estado/fila.js` · `itemDeCorrecao`)
- `Disparar evento de teste` desliga o primário, que diz *Aguardando o evento* · **o `Encerrar o ciclo` só acende quando o evento chega ou o prazo estoura** — o toque duplo não encerra o ciclo
- **no máximo quatro passos, com o ônibus parado** (decisão 54, revista no retorno do PM de 06/10): ignição ligada, rotação (só se o ativo lê rotação), cartão do motorista (só se há leitor) e ignição desligada · **a ré e a porta saíram**: não dizem nada sobre a instalação · sem leitor, são 3 passos (a 12) · a velocidade só entra com tacógrafo digital — o herói não tem
- **o cartão em três momentos**: *passe o cartão* → *o módulo leu 9412857* → `Confere com o cartão` ou `Não confere` (a 08) · o app **não compara com cadastro nenhum**: quem confere é o técnico, com o número impresso no cartão · `Não confere` vira não conforme, com a justificativa no checklist (a 10)
- **a ignição desligada explica a espera**: *O módulo leva alguns segundos para perceber que a ignição foi desligada.* (a 11) · sem isso o técnico acha que travou
- **no protótipo · a rodada 1 do retorno do PM:** os passos saem da Seção E do mock com a condição de cada um (`condicao`: a rotação pela CAN do modelo, o cartão pelo leitor; o caso `sem-leitor` tira o leitor, a 12) · o cartão é a vez desde o disparo (*passe o cartão*, a 00); o módulo lê 3 s depois (`ciclo.js` · `tiqueDe`: o tique do passo seguinte, o 60% da 00 e da 08) e espera a resposta — o lido é o número do primeiro cartão do mock sem os zeros à esquerda, *9412857* (`CARTAO_LIDO`: o mock não declara o lido, pro arquiteto) · `Confere com o cartão` e `Não confere` são o botão de dentro da linha (`telas/comum/BotaoDaLinha.jsx`, peça das telas, pro arquiteto pôr na folha 6) · a resposta leva a ignição desligada à vez, com a espera explicada embaixo, e ela confirma 3 s depois · o cartão respondido conta como passo feito (*3 de 4* na 10) · a URL segue: 08, 10, 11 e 05 · o `etapas.ciclo.cartao` grava o lido e a resposta, e a T13 lê o não confere como não conforme, com o campo do que aconteceu
- a fila do módulo drena → `Disparar evento de teste` acende
  - no protótipo · a nossa versão desta linha, antes desta entrega: a tela entra no quadro `01`: a fila do módulo drenando, o prazo cheio e o disparo indisponível com o motivo (G27). A fila drena em 3 s (`movimento.md`), e o `Disparar evento de teste` acende; esse quadro não tem referência e junta as peças que existem (G25)
- disparado → o prazo de 2:00 começa: 1 s real vale 4 s de prazo
- os passos do veículo acendem sozinhos: a semente traz 2 feitos, e os passos 3 a 5 acendem a +9, +12 e +15 s do disparo (T14·1). A `00` é o instante antes de o evento chegar (1:36)
  - no protótipo (o pacote 6): o passo da vez tem o quadrado de agora, o título aceso e a ação à direita (*engate a ré*, *abra a porta*, *passe o cartão*, *desligue a ignição*); antes do disparo e na falha da rotação, sem quadrado. O evento chega aos 6,6 s, antes da vez da porta: a `07`, a `08`, a `04` e a `06` mostram o evento chegado e o `Encerrar o ciclo` aceso
- o evento chega aos 24 s do prazo e os campos conferem aos 33 (o mock): o número passa a ser o tempo que ele levou, e a barra para no que restava. Os cinco passos e o evento → `05` (C10 · G9: 0:24 e 14:30:24, o valor do mock)
  - no protótipo, conferido na última entrega: a referência `05` agora segue o mock — *0:24*, *14:30:24* e a barra em 80% —, e o app bate (os textos conferem; 0,87% → 0,09% contra o HTML). O que sobra é o marcador branco da escala: a `05` nova deixou o marcador em 60%, onde a barra parava com os 0:48 de antes, e a peça põe o marcador no fim do preenchido, no que restava (80%), como toda escala do app (`Prazo`, `Escala`) — vai ao arquiteto, pra o marcador da `05` ir pros 80%
- `Encerrar o ciclo` → T13, e fecha a captura: os pendentes ficam pendentes na Seção E · `Ir para o checklist` → T13, com o ciclo aberto (T14·2). Voltar à T14 com o ciclo aberto retoma os passos que já valem, e o evento se dispara de novo
- prazo estourado: `Disparar outro evento` — os passos continuam valendo
  - no protótipo · a nossa versão desta linha, antes desta entrega: prazo estourado (`evento-sem-resposta`, uma vez por sessão): `Disparar outro evento` — os passos continuam valendo, e a segunda tentativa confirma
- ciclo concluído: `Ir para o checklist` → T13 · `Voltar ao menu` → T04 (T14·4) · o complemento do pacote 6: *Ir*, e não *Voltar*, serve pras duas portas de entrada, a calibração e o checklist
- `ENCERRAR` → a sessão abortada antes de homologar (G23)
  - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar antes de terminar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela — a resposta do arquiteto de 26/09 · o `Encerrar mesmo assim` roda os 4 passos da T16 · o ciclo continua correndo embaixo do diálogo, porque o técnico ainda não decidiu nada (padrão do protótipo, pro arquiteto; a alternativa é pausar)
- o voltar do Android (no computador, o Esc) faz o mesmo que o link de saída do rodapé (`logica.md`): `Ir para o checklist`, com o ciclo aberto, e no ciclo concluído `Voltar ao menu`. Com o caso de identificador, o link do rodapé é o pedido de correção, que não sai, e o voltar não faz nada
- sinal fora do esperado (`can-fora-esperado`): o passo que o sinal prova reprova, com a causa embaixo, e os outros seguem acendendo
  - **no protótipo · o pacote 2** (decisão 54, construído em 02/10): a `03` é a rotação zerada, pelo caso `motor-desligado-no-ciclo` (a-02, M2C-0301 · QJF-2C61): o passo do caso (`passo: rotacao`, a chave do título sem acento) reprova com *0 rpm · ligue o motor* — o lido é do caso, e o *ligue o motor* é do `textos.md` —, e os outros seguem acendendo; o ciclo fica aberto. O `can-fora-esperado` saiu da T14 (a velocidade em 0 é do ônibus parado, e o ma-01 não tem tacógrafo); o mock ainda o traz, com o `CICLO.passoDoSinal` apontando o *Movimento detectado*, que não existe mais — os dois sem leitor no app (pro arquiteto). A linha reprovada leva o recheio justo (4), como a `03` desenha agora
- a linha do teste do cartão só entra com o caso de identificador (T14·3), e conta nos passos (*de 6*)
  - **no protótipo · o pacote 2:** o *Cartão do motorista* é o quinto dos seis passos, sempre na lista; com o caso de identificador ele reprova no lugar, com o lido e o esperado embaixo. Padrão do protótipo, pela `04`: ele já entra reprovado (a 1:36, o cartão reprova enquanto a ré e a porta esperam), como a linha do cartão de antes; sem o caso, acende no tempo dele (+15 s)
- **no protótipo · D3, a velocidade com tacógrafo** (o pacote 2; **saiu na rodada 3 do retorno do PM**): a velocidade saiu da CAN do mock e só aparece como opcional da T10 — o caminhão com tacógrafo (o ma-02: o KNB-5H39 e o RJP-1W48) faz os mesmos quatro passos de todo ônibus, sem o passo da velocidade. O código do passo ficou, sem dado que o acenda (o modelo não traz mais a velocidade na CAN). O roteiro `mov-t14.mjs` passa pela sessão do KNB-5H39 e confere que ela não aparece
- **no protótipo · o 01 e o 02** (o pacote 2): no `01`, o rodapé fica só com o primário apagado e o link — a legenda *Espera a fila do módulo drenar* saiu, e quem explica é a frase da fila no prazo; no `02`, a frase é uma só, *A Seção F reprova · os passos continuam valendo.*, numa linha
- o ciclo fica gravado em `etapas.ciclo` (`logica.md`)
  - **no protótipo · o formato, depois do pacote 2** (o que a T13 lê; os nomes de antes ficaram): `{ ativoId, moduloSerial, passos: { 'e-1'…'e-6' (e 'e-velocidade' com tacógrafo): 'aprovada' | 'reprovada' | 'pendente' }, feitos, total (6, ou 7), evento: 'antes' | 'disparado' | 'recebido' | 'conferido' | 'nao-chegou', tentativa, cartao: { cartaoId, estado, lido, esperado } | null, correcao: { solicitadaAs, lido, esperado } | null, motor: { passo, lido } | null, concluido, fechado }` — o `motor` é novo (o caso da `03`); o resto é o de antes

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- processo correndo
- com legenda
- passo do ciclo
- passos com o prazo estourado
- cronômetro
- prazo cheio
- com contador
- checkbox
- checkbox marcado
- justificativa
- bloco do evento

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- com legenda
- os glifos de estado
- os poços
- os marcadores
- passo do ciclo
- passos com o prazo estourado
- cronômetro
- prazo cheio
- com contador
- bloco do evento

Medido no código do C10, no fechamento do C10 e do C11 (G10), com os nomes das linhas do `componentes.md`. Saíram as seis que o código não usa: a faixa · sem ação (a faixa da T14 sempre tem o ENCERRAR), o processo correndo (no `01`, o primário apagado diz a ação, e quem explica é a legenda em cima), o com contador de falha (o contador conta os passos que passaram, neutro), o checkbox, o checkbox marcado e a justificativa. Entraram as de toque da folha 1 (o primário nos três estados, apagado enquanto a fila drena, e o link de saída do rodapé) e os átomos da folha 3 (os glifos e os poços dos passos, o relógio do evento e do registro, e o LED da faixa). As diferenças da tela contra a folha viraram variante nomeada da peça (G11), declarada lá: o passo do ciclo reprovado com a causa (`03` e `04`); o cronômetro estourado, com o número em vermelho e as frases do estado uma por linha (`02`); o nome do relógio do bloco do evento pelo dado; e o link registrado, o pedido de correção feito no lugar do link, nas duas ações (`06`). Com o pacote 1 (a folha 6), o *com contador neutro* e o *com contador de falha* viraram uma peça só, o *com contador*: as listas dizem o nome novo, e o *de falha* desta nota é ele em falha.

## Histórias de usuário

- **HU-T14-1** — Com a ignição ligada e o ônibus parado, o ciclo prova a rotação, as entradas, o cartão e o evento de teste
- **HU-T14-2** — Disparo o evento de teste por botão, com o cronômetro dos 120 s em destaque
- **HU-T14-3** — Antes do cronômetro vejo a fila do módulo drenando; o botão fica indisponível com motivo
- **HU-T14-4** — Vejo 3 linhas de estado: disparado · recebido · campos conferidos. E posso disparar novamente
- **HU-T14-5** — No teste do cartão vejo o código que o módulo leu, e confiro com o número do cartão
- **HU-T14-6** — Não conferindo, o item vira não conforme e pede justificativa no checklist
- **HU-T14-7** — Vejo o tempo decorrido e o que ainda falta capturar; encerrar leva direto ao checklist
- **HU-T14-8** — A velocidade só entra no ciclo quando o ônibus tem tacógrafo digital

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
