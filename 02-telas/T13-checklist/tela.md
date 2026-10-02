# T13 · Checklist

Fechar a homologação: o que o app já provou sozinho, e o que o técnico ainda precisa provar.

| | |
|---|---|
| **Elemento-assinatura** | o placar por seção — automático e manual separados — enchendo até o veredito |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · 31 itens |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 12 · 3 — ver `estados.md` |

## O que se toca

- o não conforme exige **a foto do problema** (decisão 39): marcou *Não está conforme*, o quadro diz *Enquadre o problema*, e o botão é o disparador, `Fotografar o problema` · fotografado, o quadro vira o registro, e o botão vira `Salvar com ressalva` · sem o texto, o botão diz *Conte o que aconteceu*, apagado · a ordem entre escrever e fotografar é livre
- no singular: *1 item*, *1 foto tirada*
- **no protótipo · o não conforme com a foto do problema** (decisão 39, T13/07, 08 e 15): a caixa é a `Justificativa` nas duas telas do item — desmarcada, *marque e conte o que aconteceu*, a 16 do fim do miolo (07); marcada, *conte embaixo o que aconteceu* e o campo *O QUE ACONTECEU*, em foco (08, 15) · o registro do problema é a foto que prova, tirada, a peça da T10 (`FotoProva`), no lugar do visor: *Problema fotografado às 14:30* e *vai junto com a ressalva, pro gestor*, sem toque · a URL: marcar → 08; `Fotografar o problema` → 15; desmarcar → 07 · desmarcar guarda o que aconteceu e a foto do problema enquanto o técnico está no item, e marcar de novo os devolve (15, se já fotografou); sair do item pelo `Voltar ao checklist` os descarta · sem a foto, o disparador acende com ou sem o texto; fotografado e sem o texto, *Conte o que aconteceu*, apagado e desabilitado (lei 17); `Salvar com ressalva` grava a ressalva com o que aconteceu, a hora e a hora da foto do problema, e segue pro próximo por fazer, como antes · o 08 pela URL abre com o texto de exemplo (`checklist.exemploJustificativa`), e o 15, com ele e o problema fotografado às 14:30 · o 12 pela URL grava a ressalva de exemplo com a foto do problema · as fotos tiradas da B (*N fotos tiradas*) contam o item salvo com a ressalva, que tem a foto do problema · o registro entra sem esmaecer, como o da T10: a linha da *miniatura da foto* do `animacao.md` fica pro C12 · `Faltam N itens` com 1 diz *Falta 1 item* (o singular com o verbo junto, proposta pro arquiteto)
- **cada seção é um cartão**, com quem age na segunda linha — *o app confere sozinho*, *você fotografa 4 itens*, *você faz o ciclo em movimento*, *espera o servidor · não bloqueia* · tocar num cartão faz ele crescer no lugar, com a seta pra cima; as outras seções descem, e nada mais se mexe
- **tem seta, toca; não tem seta, é leitura** · as leituras da A, da C e da D, os itens feitos e os passos da E não têm seta
- na B, cada foto a tirar tem a câmera e a seta → a câmera do app · o Painel vem feito da calibração, e diz *fotografado na calibração, às 14:30*
- item pendente leva à tela que resolve, pelo campo *origem* do mock: conectar → T05 · ativo → T06 · can → T08 · configurar → T09 · calibração → T10
  - no protótipo · a T08 saiu com o pacote 1 (decisão 44): a origem `can` leva à T07, o Diagnóstico do módulo, que lê o módulo e a CAN (`Ler de novo`) · o `Refazer a leitura da CAN` do 09 também · o texto do botão fica até o pacote 2 (desvio nomeado)
- na E, uma ação só: *Fazer o ciclo dinâmico* → T14 · os cinco passos são leitura, e depois do ciclo dizem *confere*
- o item não conforme salvo com justificativa aparece com o check e *com ressalva · a causa*
- homologado: o veredito no topo — *Instalação homologada às 14:30* — e o relatório embaixo · com a localização negada, *o relatório vai sem localização*
- `Finalizar instalação` só acende com 100% de A, C, D, E e das fotos da B · a F não bloqueia
- item manual sem a permissão da câmera → igual à câmera da T10 (T10/11): o visor com a câmera riscada e o `Tirar foto` vira `Abrir as configurações` — permitida lá, a câmera abre na volta · com o *Não está conforme* marcado, também: desde a decisão 39, a ressalva exige a foto do problema, e a foto do problema precisa da câmera (antes, o `Não conforme` continuava, porque a ressalva não precisava dela) · nenhuma referência desenha este quadro e o `textos.md` não tem a frase do que falta pro item, então o visor fica só com a câmera riscada (G25), e a URL sai do momento (sem a referência, o 07 e o 08 não o desenham); no protótipo, nenhum estado da coluna chega nele, e ele se vê na vitrine (`f7-visor-sem-permissao-item`). O primário, em todos os casos (o `Tirar foto`, o `Abrir as configurações`, o `Fotografar o problema`, o *Conte o que aconteceu* apagado e o `Salvar com ressalva`), sai de uma função só, provada no node (`app/src/estado/camera.js` · `primarioDaCamera`, `app/scripts/testar-camera.mjs`)
- **no protótipo, o que a entrega não desenha** (G25, pro arquiteto): o automático que falta tem o ícone da ferramenta da tela que resolve e *a fazer*, com a seta · o que reprovou tem o X no poço, a leitura embaixo e a seta, e abre o nível do item (09) · a foto tirada no checklist fica só com o nome, sem dizer de onde veio · com 1 foto por fazer, ou 1 tirada, o singular (a resposta do arquiteto de 26/09): *você fotografa 1 item*, *1 foto tirada* (até ela, o cartão ficava sem quem age) · a F aberta depois de homologar mostra os valores do C10 (`12 subiram`, `31 de 31`, `na fila`) · o rótulo do nível do item é o título longo da seção que o técnico faz (*B · INSTALAÇÃO FÍSICA*) e o nome curto da que o app confere (*C · HARDWARE*), como as referências desenham

## As regras (C10, decididas no C0 e escritas aqui — G1; reescritas na construção da entrega de 25/09)

**A entrega de 25/09 (decisão 34) trouxe a estrutura nova do checklist**, e as regras do placar, do mapa, do acordeão que tirava o placar, dos cartões de valor e de foto, da versão em duas colunas e da escala do cartão com barra saíram com ela. Continuam valendo o que é um item resolvido, de onde cada seção lê, a semente, a Seção F, o Finalizar com a ciência, o item manual, o item reprovado e o voltar.

- **as seções:** uma aberta por vez; tocar num cartão abre ele no lugar, tocar em outro troca a aberta, e tocar na aberta fecha. O título, a barra e o rodapé ficam; as seções de baixo descem por transform, e a lista rola (a rolagem fica onde está). Abrir não anima altura
- **o que é um item resolvido:** o automático cuja fonte passa, o manual com foto (tirada aqui, ou herdada da calibração) ou com ressalva, e o que não se aplica. O título e a contagem de cada seção contam os resolvidos; o `Faltam N itens` conta só os das seções que bloqueiam (A a E) — com 1, o texto não existia e a legenda sumia (G25); no protótipo, desde a resposta do arquiteto de 26/09 (*o singular vale*), *Falta 1 item*
- **de onde cada seção lê:** A, da sessão, do diagnóstico do módulo (a T07; até o pacote 1, da pré-checagem) e do vínculo do ativo · B, das fotos e ressalvas desta tela e da foto da calibração (o Painel) · C, da leitura da CAN e da leitura nominal do módulo (as entradas e o modem) · D, da cadeia gravada e da calibração (o valor de partida é o do painel) · E, do ciclo da T14 · F, da fila desta sessão (G22)
- **a semente:** pular pro checklist pelo palco é o herói depois da calibração e antes do ciclo — A, C e D resolvidas, o Painel herdado, B e E por fazer, F esperando: 19 de 31, `Faltam 9 itens`, como as referências desenham
- **a Seção F:** conta só o que entrou na fila depois da abertura da sessão (G22). Antes do Finalizar, nada desta sessão está na fila, e ela espera (o relógio, *espera o servidor · não bloqueia*). O `Finalizar instalação` gera o relatório da instalação — as evidências e o checklist — na fila (HU-T13-7), e a Seção F passa a contar ele: 3 de 3, *o servidor confirmou*. Ela **falha** quando o servidor diz que não: o evento de teste que não chegou no prazo (T14/02), um item desta sessão recusado, ou o caso do ativo sem resposta (pronto-para-fechar)
- **o Finalizar (T13·3):** acende quando o que bloqueia fecha; o homologado aparece depois do toque, com o veredito e o relatório no topo. Com a Seção F falhando, o toque abre o diálogo da ciência (10), e o `Finalizar instalação` do diálogo espera o `Estou ciente` marcado
- **o item manual:** tocar numa foto por fazer abre o nível do item (07). `Tirar foto` ou `Salvar com ressalva` resolvem o item e seguem pro próximo por fazer da seção; sem próximo, voltam à Seção B aberta. No protótipo, desde a decisão 39, o `Salvar com ressalva` só aparece com a foto do problema e o que aconteceu (08 → 15). A foto tirada fica tirada, e o Painel herdado não se fotografa de novo: o item feito não tem seta e não se toca (pendencias.md)
- **o item reprovado (T13·2):** o item reprovado tem a seta e abre o nível do item (09), com o motivo; `Refazer a leitura da CAN` leva à T07, o Diagnóstico do módulo (até o pacote 1, à T08, que saiu; o texto fica até o pacote 2). Nada automático se marca à mão
- **a Seção E (T13·4):** uma ação só, `Fazer o ciclo dinâmico`, abre a T14 enquanto falta passo. Nada de E se responde aqui. O passo que a T14 aprovou diz `confere`, e o que falta, `a fazer`. Sair da T14 por `Encerrar o ciclo` ou por `Ir para o checklist` (T14·2) dá a mesma Seção E: os pendentes ficam pendentes, e a ação continua
- **o item reprovado (T13·5), a escala:** a bateria com a faixa esperada entre 1/3 e 5/6 da barra (10 a 16 V no herói), no nível do item reprovado. As posições saem da conta
- **o voltar (T13·6):** nas seções e no homologado, faz o `Voltar ao menu`; no nível do item, o `Voltar ao checklist`, que volta à seção do item aberta; no diálogo, o `Cancelar`

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- com legenda
- diálogo
- diálogo sem saída
- diálogo com ciência
- assertiva da sessão
- linha de conferência
- seção aberta do checklist
- seção recolhida
- segmentado
- encerrando
- pede o corte
- sem homologar
- a barra do checklist
- com contador
- checkbox
- checkbox marcado
- justificativa
- seção fechada
- seção aberta · de leitura
- seção aberta · de tocar
- item de leitura
- item de tocar
- item feito
- item com ressalva
- o veredito
- foto · tirada
- a ação da seção
- a câmera do app
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

Medido nas 15 referências e no código da entrega do checklist (decisão 34, G10): toda peça abaixo está desenhada nas folhas de `03-design-system/`. A seção é uma peça só, fechada e aberta (`SecaoDoChecklist`, dentro da `SecoesDoChecklist`, que faz as de baixo descerem), os itens são uma peça com quatro tipos (`ItemDoChecklist`: leitura, tocar, feito e ressalva — a ação da seção é o de tocar com o ícone do ciclo), e o veredito e a barra, uma peça cada (`VereditoDoChecklist`, `BarraDoChecklist`). O instrumento do item reprovado é peça só desta tela (`app/src/telas/T13/pecas.jsx`), montada com os primitivos. A câmera do app é a mesma da T10 (`VisorCamera`).

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- os glifos de estado
- os ícones de ferramenta
- os poços
- os marcadores
- duas ações
- com legenda
- diálogo com ciência
- seção aberta do checklist
- seção recolhida
- nota tracejada
- segmentado
- a barra do checklist
- com contador
- campo focado
- checkbox
- checkbox marcado
- justificativa
- foto · tirada (o registro do problema, 15)
- seção fechada
- seção aberta · de leitura
- seção aberta · de tocar
- item de leitura
- item de tocar
- item feito
- item com ressalva
- o veredito
- a ação da seção
- a câmera do app

Contra a lista do design, entraram as de toque da folha 1 (o primário nos três estados e o link), os átomos da folha 3 (os glifos e os poços das seções e dos itens, os ícones da câmera, do ciclo e das ferramentas que resolvem o que falta, e o LED da faixa e o quadrado do checkbox), a nota tracejada do item reprovado (09), o campo focado da justificativa (08, 15) e a foto tirada da T10, que é o registro do problema (15). Com a decisão 39, a linha tocável do `Não conforme` saiu: a caixa *Não está conforme* é a justificativa nas duas telas do item (a variante do checkbox com a linha de baixo). Saíram as 12 que o código não usa: faixa · sem ação, processo correndo, diálogo, diálogo sem saída, assertiva da sessão, linha de conferência, encerrando, pede o corte, sem homologar, com contador de falha, linha da fila e linha da re-checagem. As variantes nomeadas desta tela (G11): o segmento atual com falha (09), a nota do item que não se marca à mão (09), a legenda junta, a 6 do botão, e, sem desenho na entrega, o item que falta com o ícone da ferramenta e *a fazer*, e o item reprovado com o X, a leitura e a seta. A barra de 22 do instrumento do item reprovado é o tamanho `item` da escala, peça interna (`06-prototipo/app/src/ds/MAPA.md`). Com o pacote 1 (a folha 6), o *com contador neutro* e o *com contador de falha* viraram uma peça só, o *com contador*: as listas dizem o nome novo, e o *de falha* desta nota é ele em falha.

## Histórias de usuário

- **HU-T13-1** — Itens automáticos não são marcáveis à mão; "marcar todos" só nos manuais sem foto
- **HU-T13-2** — Item automático reprovado mostra o motivo e leva direto à tela que corrige
- **HU-T13-3** — Vejo progresso separado por seção e por tipo
- **HU-T13-4** — Posso responder manual como não conforme com justificativa → marca ressalvada, não bloqueia
- **HU-T13-5** — Finalizar exige 100% dos automáticos de A, C, D e 100% dos manuais com foto
- **HU-T13-6** — A Seção F não bloqueia; finalizar com ela falhando exige ciência marcada, com nome e hora
- **HU-T13-7** — Finalizado gera o relatório com seriais, versões, resultados, fotos, geolocalização e técnico
- **HU-T13-8** — A Seção E não é respondida aqui — item faltante me devolve ao ciclo dinâmico

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
