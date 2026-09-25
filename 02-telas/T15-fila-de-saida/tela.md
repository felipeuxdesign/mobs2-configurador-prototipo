# T15 · Fila de saída

Ver o que ainda vai subir pro servidor, e o que precisa do técnico.

| | |
|---|---|
| **Elemento-assinatura** | cada item com causa e ação — nada fica tentando sozinho em silêncio |
| **Chrome** | a faixa da sessão aberta ou a faixa sem sessão, conforme a sessão — toda referência tem faixa (T15-A16) |
| **Semente no protótipo** | a seleção f-10, f-02 e f-08 (G21): dois itens esperando envio, um deles com erro, e uma recebida — a fila inteira da Ibura, com a faixa da sessão do herói (T15-A2) |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 0 · 4 — ver `estados.md` |

## O que se toca

- `Ressincronizar e reenviar` no item com erro → os itens com erro voltam pra fila, e o envio recomeça (a entrega do design de 25/09; antes era só o pressionado, G25)
- a notificação local da fila parada diz *Envio parado · 3 itens esperando há 30 min* — os 30 min são padrão até o PM definir o limite
- `Voltar ao menu` → T04. O voltar do Android (o Esc, no computador) faz o mesmo (`logica.md`)
- `ENCERRAR` → antes de homologar, a sessão abortada (T16/03, G23); depois, os passos do encerramento (T16)
- nada anda sozinho: o envio da fila não tem ritmo declarado (G4), e o `01` é estado, parado. A barra que enche e o item que esmaece são do C12

## A fila que a tela mostra

- **no fluxo**, a seleção da semente (f-10, f-02, f-08) mais os itens que a sessão criou (`fila`, no estado único) na garagem ativa; **nos estados**, o recorte do caso de cada um (`estados.md`)
- **o cartão do topo** cresce até o espaço livre e leva o que precisa do técnico: com erro, o cartão que pede ação, pela recusa do servidor — com um erro, o desenho da folha 6 (`00`); com mais, o compacto, com o erro de rede embaixo e a legenda (`02`). Sem erro, o item que sobe agora (`01`)
- **embaixo, a lista**: o que está na fila, e depois o que foi recebido, do mais novo pro mais velho. A altura é da posição (T15-V2): 50 com a divisória no meio, 62 a última
- **o contador** conta todos os itens mostrados, pendentes e recebidos (T15·2 a). O do menu conta só os pendentes da garagem ativa (T04·1): a diferença está com o diretor
- **o título do item** é o rótulo curto do tipo (`tiposFila`, AC-14) e a placa; **o quando** é, na fila, há quanto tempo o item espera (de `criadoAs` às 14:30); recebido, a hora de hoje, `ontem` com a hora, ou há quantos dias (G9: o f-08 é de 2 dias atrás, e a referência diz ontem)

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- faixa · sem ação
- uma ação
- seção aberta do checklist
- seção recolhida
- vazio declarado
- o par comparado
- linha do histórico
- linha da fila · esperando
- a lista de garagens
- cadeia concluída
- cadeia recusada
- com contador neutro
- com contador de falha
- linha de opção
- cartão que pede ação
- botão secundário
- lista com contagem
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

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
- com contador neutro
- cartão que pede ação
- botão secundário
- vazio declarado
- linha da fila · esperando
- linha da fila
- linha da re-checagem

As variantes nomeadas (G11), declaradas na peça: o cartão que pede ação **compacto**, com mais de um erro (`02`: o título de 17, a causa de 13, o botão compacto de 46 com o toque de 48, a divisória e o que vem depois); a linha da fila com a altura pela **posição** (`01`: a recebida do meio com 50); a escala do **envio** (a barra de 16 do `01`); e a seta do SUBINDO AGORA no dicionário de ícones (`subindo`, com o traço 2,2 do glifo). Peças só da tela, sem linha no `componentes.md` (`app/src/telas/T15/pecas.jsx`): o cartão SUBINDO AGORA, o erro que reenvia sozinho e a legenda dentro do cartão; os rótulos das seções são só tipografia. Na coluna do `componentes.md`, a T15 saiu de 15 linhas que nenhuma das cinco desenha: faixa · sem ação, o par comparado, linha do histórico, a lista de garagens, as duas da cadeia, as três do encerramento, com contador de falha, a marca no login, campo e campo focado, linha de opção e lista com contagem. Da lista do design saíram também a seção aberta do checklist e a seção recolhida, que a coluna não dava à T15. No fechamento do C11 (G10), entraram os marcadores da folha 3 (o LED da faixa) e o dicionário de ícones, pela seta do SUBINDO AGORA, que mora na linha dos ícones de ferramenta.

## Histórias de usuário

- **HU-T15-1** — Vejo por item: tipo, ativo, item de checklist, tamanho e progresso do corrente
- **HU-T15-2** — Sair da tela não interrompe o envio; a home mantém o contador
- **HU-T15-3** — Cada erro nomeia causa e ação; recusa do servidor nunca fica em retentativa silenciosa
- **HU-T15-4** — Fila vazia é declarada, com o horário do último envio
- **HU-T15-5** — A Seção F em re-checagem aparece em seção separada — não é item de fila
- **HU-T15-6** — Recebo notificação local quando a fila fica parada além do limite

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
