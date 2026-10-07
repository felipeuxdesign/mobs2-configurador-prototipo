# T15 · Fila de saída

Ver o que ainda vai subir pro servidor, e o que precisa do técnico.

| | |
|---|---|
| **Elemento-assinatura** | cada item com causa e ação — nada fica tentando sozinho em silêncio |
| **Chrome** | sem faixa ou com, conforme a sessão |
| **Semente no protótipo** | fila com dois itens · um com erro |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 0 · 4 — ver `estados.md` |

- no protótipo · a nossa versão da linha *Semente no protótipo*, antes desta entrega: | **Semente no protótipo** | a seleção f-10, f-02 e f-08 (G21): dois itens esperando envio, um deles com erro, e uma recebida — a fila inteira da Ibura, com a faixa da sessão do herói (T15-A2) |

- no protótipo · a nossa versão da linha *Chrome*, antes desta entrega: | **Chrome** | a faixa da sessão aberta ou a faixa sem sessão, conforme a sessão — toda referência tem faixa (T15-A16) |

## O que se toca

- **no protótipo · o pacote 12:** a 05 é a fila do 01 com o pedido de correção do caso, criado na hora do pedido — *agora*, no topo da lista · o recorte aparece inteiro, como no 01 (decisão 42), e o cartão de cima fica mais baixo que na referência
- a fila é **do aparelho**, não da unidade — a HU-T01-4 diz que a fila de outro usuário continua subindo: o rótulo é *neste aparelho* · as referências mostram o topo da lista; o protótipo mostra a fila do mock inteira
  - **no protótipo** (a última entrega, decisão 42): o rótulo é *neste aparelho* nas cinco. No fluxo, a fila é a seleção da semente mais **tudo** o que a sessão criou, de qualquer unidade — o filtro pela unidade ativa saiu. Em cada estado, o recorte do caso aparece inteiro: no `01`, os cinco itens de `fila-sem-erro`, com a *Checklist · PCX-9A17 · recebida · ontem 16:40* (a *Calibração* até o pacote 2) embaixo da *Evidências · RKT-8H42*, onde a referência corta; o cartão do topo continua crescendo até o espaço livre, e fica 50 mais baixo que o da referência (desvio nomeado, 4,83% do HTML; 4,84% depois do pacote 2)
  - **a fila do mock inteira no fluxo** — os dez de `filaSaida` no lugar da seleção da semente — não se constrói: com o f-09 e o f-10 juntos, o cartão do topo vira o das *DUAS COM ERRO*, e nenhuma referência desenha onde fica o f-04, que sobe enquanto os dois erros esperam; a `00` deixaria de valer inteira (o contador 10 contra 3). Padrão do protótipo, pro arquiteto: *a fila do mock inteira* é o recorte inteiro de cada quadro
  - **a data do RSW-9L02** (a resposta do arquiteto de 26/09): o recebido de mais de um dia diz o dia e a hora, do `data` do mock — *10/03, 10:05*, o f-08, de 2 dias. A `02` ainda diz *ontem 10:05* pro mesmo f-08, no `textos.md` e no desenho: desvio nomeado (0,06% do HTML), até a referência seguir a `00`
- `Ressincronizar e reenviar` → os itens com erro voltam pra fila, e o envio recomeça
- a notificação local da fila parada diz *Envio parado · 3 itens esperando há 30 min* — os 30 min são padrão até o PM definir o limite
  - **no protótipo, não se constrói:** nenhuma referência desenha a notificação (é do sistema, fora da tela), e o texto não está no `textos.md` (G25). Fica com o arquiteto: onde ela aparece e como se desenha
- `Ressincronizar e reenviar` no item com erro → os itens com erro voltam pra fila, e o envio recomeça (a entrega do design de 25/09; antes era só o pressionado, G25)
  - **no protótipo**, só o que as referências e o mock sustentam (G25): o cartão que pede ação sai, porque nada mais precisa do técnico, e os itens entram na lista como *na fila*, com a espera de `criadoAs` às 14:30 — na semente, *Evidências · KJC-7N23 · na fila · há 145 min*, embaixo de *NA FILA E RECEBIDAS*, com a lista logo abaixo do cabeçalho. Nenhum vira o *SUBINDO AGORA*: o progresso e o tamanho só existem no f-04 do mock. O contador não muda (conta os mostrados). No menu, o diálogo *Sair da conta* passa a contar o item na fila, de 3 pra 4; o cartão da Fila de saída não muda, porque o erro já contava como pendente (T04·1, `estado/fila.js`). Sair da tela não desfaz (HU-T15-2); o C12 dá o movimento
- `Voltar ao menu` → T04. O voltar do Android (o Esc, no computador) faz o mesmo (`logica.md`)
- `ENCERRAR` → antes de homologar, a sessão abortada (T16/03, G23); depois, os passos do encerramento (T16)
  - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar sem homologar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela — a resposta do arquiteto de 26/09 · o `Encerrar sem homologar` roda os 4 passos da T16
- **no protótipo · o pacote 2** (decisão 54): o item do RSW-9L02 (o f-02) é o *Checklist* na `00` e na `02` — o tipo vem do mock (`Checklist de homologação`, rótulo curto *Checklist*, em `tiposFila`), e o código não mudou. O mock ainda declara o tipo *Foto de calibração* em `tiposFila`, sem item nenhum e sem leitor: pro arquiteto, tirar do mock
- nada anda sozinho: o envio da fila não tem ritmo declarado (G4), e o `01` é estado, parado. A barra que enche e o item que esmaece são do C12

## A fila que a tela mostra

- **no fluxo**, a seleção da semente (f-10, f-02, f-08) mais os itens que a sessão criou (`fila`, no estado único) na unidade ativa; **nos estados**, o recorte do caso de cada um (`estados.md`)
  - **no protótipo** (decisão 42): o *na unidade ativa* saiu — a fila é do aparelho, e o que a sessão criou entra de qualquer unidade, como a anotação de cima diz (`app/src/telas/T15/dados.js`)
- **o cartão do topo** cresce até o espaço livre e leva o que precisa do técnico: com erro, o cartão que pede ação, pela recusa do servidor — com um erro, o desenho da folha 6 (`00`); com mais, o compacto, com o erro de rede embaixo e a legenda (`02`). Sem erro, o item que sobe agora (`01`); sem erro e sem nada subindo (a semente depois do `Ressincronizar e reenviar`), nenhum cartão, e a lista sobe pra baixo do cabeçalho (G25)
- **embaixo, a lista**: o que está na fila, e depois o que foi recebido, do mais novo pro mais velho. A altura é da posição (T15-V2): 50 com a divisória no meio, com o poço de 32 (o poço na linha), e 62 a última, com o de 30
- **o contador** conta todos os itens mostrados, pendentes e recebidos (T15·2 a). O do menu conta só os pendentes da unidade ativa (T04·1): a diferença está com o diretor
  - **no protótipo**, com a fila do aparelho (decisão 42), o *da unidade ativa* do menu ficou sem razão; a regra do menu é da T04 (`logica.md`, Os contadores do menu) e não mudou nesta tela
- **o título do item** é o rótulo curto do tipo (`tiposFila`, AC-14) e a placa; **o quando** é, na fila, há quanto tempo o item espera (de `criadoAs` às 14:30); recebido, a hora de hoje, `ontem` com a hora, ou há quantos dias (G9: o f-08 é de 2 dias atrás, e a referência diz ontem)
  - **no protótipo** (a resposta de 26/09, a G9 respondida): o recebido de mais de um dia diz o dia e a hora do `data` do mock, *10/03, 10:05*, como diz a anotação *a data do RSW-9L02*; o *há N dias* só sai sem `data`, e nenhum item do mock cai nisso (o roteiro `fila.mjs` prova)

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- faixa · sem ação
- uma ação
- vazio declarado
- linha do histórico
- linha da fila · esperando
- a lista de garagens
- cadeia concluída
- cadeia recusada
- encerrando
- reiniciando
- sem homologar
- com contador
- linha de opção
- cartão que pede ação
- botão secundário
- lista com contagem
- item feito
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

Medido nas 5 referências e construído no C11 (T15-A13, G1): as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- uma ação
- os glifos de estado
- os ícones de ferramenta (a seta `subindo`)
- os poços
- os marcadores
- com contador
- cartão que pede ação
- botão secundário
- vazio declarado
- linha da fila · esperando
- linha da fila
- linha da re-checagem

As variantes nomeadas (G11), declaradas na peça: o cartão que pede ação **compacto**, com mais de um erro (`02`: o título de 17, a causa de 13, o botão compacto de 46 com o toque de 48, a divisória e o que vem depois); a linha da fila com a altura pela **posição** (`01`: a recebida do meio com 50), e o poço pela altura (a entrega do checklist, o poço na linha: 32 na linha de 50, 30 na última, de 62, como as três que têm a lista desenham — 00, 01 e 02); a escala do **envio** (a barra de 16 do `01`); e a seta do SUBINDO AGORA no dicionário de ícones (`subindo`, com o traço 2,2 do glifo). Peças só da tela, sem linha no `componentes.md` (`app/src/telas/T15/pecas.jsx`): o cartão SUBINDO AGORA, o erro que reenvia sozinho e a legenda dentro do cartão; os rótulos das seções são só tipografia. Na coluna do `componentes.md`, a T15 saiu de 15 linhas que nenhuma das cinco desenha: faixa · sem ação, o par comparado, linha do histórico, a lista de unidades, as duas da cadeia, as três do encerramento, com contador de falha, a marca no login, campo e campo focado, linha de opção e lista com contagem. Da lista do design saíram também a seção aberta do checklist e a seção recolhida, que a coluna não dava à T15. No fechamento do C11 (G10), entraram os marcadores da folha 3 (o LED da faixa) e o dicionário de ícones, pela seta do SUBINDO AGORA, que mora na linha dos ícones de ferramenta. Com o pacote 1, o *par comparado* saiu do design system junto com o chassi da T06 (decisão 46), e sai da lista do design; e o *com contador neutro* e o *com contador de falha* viraram uma peça só, o *com contador* (a folha 6): as listas dizem o nome novo, e o *de falha* desta nota é ele em falha.

## Histórias de usuário

- **HU-T15-1** — Vejo por item: tipo, ativo, item de checklist, tamanho e progresso do corrente
- **HU-T15-2** — Sair da tela não interrompe o envio; a home mantém o contador
- **HU-T15-3** — Cada erro nomeia causa e ação; recusa do servidor nunca fica em retentativa silenciosa
- **HU-T15-4** — Fila vazia é declarada, com o horário do último envio
- **HU-T15-5** — A Seção F em re-checagem aparece em seção separada — não é item de fila
- **HU-T15-6** — Recebo notificação local quando a fila fica parada além do limite

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## A fila (retorno do PM, 06/10)

- **o conflito não é recusa**: o servidor aceita os dois registros e avisa o gestor · o item aparece como *recebida · em conflito, o gestor foi avisado*, sem botão de reenvio (a 00)
- **o *servidor recusou* tem uma causa que o técnico resolve**: *o pacote de sincronização venceu*, e o *Ressincronizar e reenviar* baixa um pacote novo · a causa é leitura nossa: o PM pediu pra combinar com o produto
- **no protótipo · a rodada 2:** a semente da 00 ganhou o f-11, o recebido em conflito: vai depois dos recebidos, com o aviso do mock embaixo, em duas linhas, e não conta como *não chegou* (nem no menu da T04) · sozinha, a recusa é uma frase: *O servidor recusou: …* · o f-11 do mock é do a-06 (RVM-1E54), e a 00 desenha QAH-1M67 — segue o mock
