# T09 · Configurar módulo

Gravar no módulo o que ele precisa: todos os blocos, na instalação nova; um bloco por vez, na manutenção — cada um relido antes do próximo.

| | |
|---|---|
| **Elemento-assinatura** | a cadeia: o trilho que liga os blocos e só avança com o read-back confirmado |
| **Chrome** | faixa de sessão · a linha dos pinos embaixo do título |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · os blocos do mock |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 4 · 5 — ver `estados.md` |

## O que se toca

- a entrada, na instalação nova: *o que vai ser gravado* — os blocos, a limpeza dizendo o que apaga e o que preserva, e o espaço calculado sobre o que vai ser gravado
- `Gravar no módulo` → a cadeia
- não cabe, ou cercas demais: a gravação não começa · `Procurar outro módulo`
  - no protótipo (a resposta do arquiteto ao gate do pacote 1, 02/10): com a sessão aberta, o módulo não troca — o `Procurar outro módulo` abre o diálogo *Encerrar sem homologar?* por cima da tela, como o ENCERRAR (decisão 36): o `Continuar a instalação` deixa o técnico nela, e o `Encerrar sem homologar` roda os 4 passos da T16
- a limpeza apaga só a parte dos blocos que vão ser gravados
- na manutenção: escolher um bloco → `Reenviar` → a cadeia curta, com a limpeza só daquele bloco
- durante a cadeia, antes de a Conexão gravar, o ENCERRAR da faixa abre a recuperação — o mesmo que o voltar do Android
- na recuperação, o ENCERRAR da faixa fica desabilitado de verdade e em tinta apagada — não se encerra antes de a Conexão gravar
- a cadeia corre sozinha
  - no protótipo · a nossa versão desta linha, antes desta entrega: a cadeia corre sozinha, um bloco por segundo: o próximo começa no instante em que o anterior confirma (T09·1) · nada conta de zero ao abrir (C9 · G27). Com esta entrega, a tela abre parada — no `05`, na instalação nova, ou no `08`, na manutenção — e a cadeia começa no toque em `Gravar no módulo` (ou em `Reenviar`), pela Limpeza: correr desde o primeiro bloco é o que o toque pede, não um contar de zero ao abrir. O quadro da `00` — três relidos, o Leitor gravando — é o meio dela
- bloco recusado: `Tentar de novo`, do bloco recusado
- queda: `Reconectar e seguir`, do mesmo bloco
- cadeia concluída: `Calibrar` → T10
  - no protótipo · a nossa versão desta linha, antes desta entrega: cadeia concluída: `Voltar ao menu` → T04, de onde a Calibração segue. A 04 não desenha um `Calibrar`, e texto novo não entra (C9 · T09-A3, G1, G25) · com o pacote 1, a 04 continua só com o `Voltar ao menu`, e do menu o Diagnóstico do módulo mostra a CAN lida (T07/01, D2) antes da Calibração
- tentar sair no meio → a recuperação, até a Conexão gravar
  - no protótipo · a nossa versão desta linha, antes desta entrega: tentar sair no meio — o `ENCERRAR`, ou o `Voltar ao menu` com a cadeia parada — → a recuperação, até a Conexão gravar; nela, o `ENCERRAR` fica **desabilitado e em tinta apagada**, como o voltar do Android, que ali não faz nada (a lei 17, decisão do diretor de 25/09 — no lugar do aceso que não fazia nada, G23), e `Continuar a gravação` retoma do mesmo bloco. Depois da Conexão, o `ENCERRAR` é o de toda tela com sessão
- o voltar do sistema (no computador, o Esc) é o mesmo tentar sair: antes de a Conexão gravar, abre a recuperação; na recuperação, não faz nada; na cadeia concluída, faz o `Voltar ao menu` (`06-prototipo/logica.md` · O voltar do Android) · com o pacote 1, antes de a cadeia começar — no que vai ser gravado, nas travas do envio e na escolha do bloco (05 a 08) —, ele faz o `Voltar ao menu` do rodapé, e o ENCERRAR é o de toda tela com sessão (decisão 36)

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- uma ação
- processo correndo
- com legenda
- escolha numa lista
- aviso
- processo parado
- linha do histórico
- a lista de garagens
- cadeia concluída
- cadeia recusada
- cadeia antes de gravar
- a pré-condição dos pinos
- com contador
- linha de opção
- lista com contagem
- linha da fila
- linha da re-checagem
- prova da cadeia

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

Medido nas 5 referências e construído no C9 (G1), e medido de novo nas 10 do pacote 1 (02/10), antes de construir: as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- uma ação
- processo correndo
- os glifos de estado
- os poços
- os marcadores
- aviso
- processo parado
- escolha numa lista
- cadeia concluída
- cadeia recusada
- cadeia antes de gravar
- a pré-condição dos pinos
- com contador
- prova da cadeia

No acerto do design system pelo medido (G10), a lista ficou só com os nomes das linhas do `componentes.md`, e as anotações viraram variante nomeada da peça (G11), declarada lá, na linha da cadeia recusada: a cadeia correndo, gravando com o elo de 86 (00), e a pausada, parada com o contador e o aviso, com o elo de 68 (02 e 03). Entraram as de toque da folha 1 (o primário nos três estados e o link) e os átomos da folha 3 (os glifos da cadeia, do aviso e dos pinos, os poços deles e o LED da faixa). A linha dos pinos no pé do 01 é o lugar que a referência dá a ela na tela, não variante da peça (T09-D2). Na coluna do `componentes.md`, a T09 saiu das dez linhas que nenhuma das cinco desenha (faixa · sem ação, com legenda, falha, encerrando, pede o corte, sem homologar, com contador de falha, a marca no login, campo e campo focado): o aviso vermelho do 01 é o processo parado, e o 00 explica embaixo do primário, sem legenda em cima. **Com o pacote 1 (decisões 47 e 49):** entraram a cadeia antes de gravar (05 a 07: o relógio em cada elo, e a Limpeza com *primeiro*; na 07, o elo das Cercas em falha), a segunda linha da pré-condição, o espaço (05 a 07; na 06, em falha, a linha inteira em vermelho), o processo parado das travas do envio — o aviso vermelho com o traço (06 e 07) —, o aviso neutro da manutenção (08 e 09) e a escolha numa lista (08: o quadrado lima no poço de 30, a linha de 72; o valor à direita vem em `--tinta-secundaria`, e na T02 em `--tinta-apagada` — a pergunta vai pro arquiteto); o com contador neutro passou a se chamar com contador, como no `componentes.md` do pacote. A 08 e a 09 não desenham a linha dos pinos, contra o Chrome e a HU-T09-2: vai pro arquiteto. A lista do design desta entrega traz linhas que nenhuma das 10 desenha — faixa · sem ação, o topo do menu inteiro, com legenda, linha do histórico, a lista de garagens, linha de opção, lista com contagem, linha da fila e linha da re-checagem: a diferença vai pro arquiteto.

## Histórias de usuário

- **HU-T09-1** — Na instalação nova, vejo o que vai ser gravado antes de gravar: todos os blocos, obrigatórios
- **HU-T09-2** — A pré-condição de ocupação de pinos é a primeira linha; o espaço no módulo, calculado sobre o que vai ser gravado, é a segunda
- **HU-T09-3** — A limpeza vem primeiro e diz o que apaga e o que preserva — e apaga só a parte dos blocos que vão ser gravados
- **HU-T09-4** — Se a configuração não cabe, ou as cercas passam do limite do módulo, a gravação não começa, e o app me manda procurar outro módulo
- **HU-T09-5** — Na manutenção, escolho um bloco e reenvio só ele
- **HU-T09-6** — Cada bloco só inicia com o anterior confirmado por read-back
- **HU-T09-7** — Falha interrompe, nomeia a etapa em linguagem de campo e oferece repetir a etapa
- **HU-T09-8** — Queda no meio: retomo do mesmo bloco, de forma idempotente
- **HU-T09-9** — Ao final, read-back consolidado dos parâmetros críticos
- **HU-T09-10** — Nova instalação é transação inteira — abortar mantém na tela de recuperação até Conexão gravar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
