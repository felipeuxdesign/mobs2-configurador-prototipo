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

- a A tem três itens — o chassi saiu (decisão 46) · a D confere as cercas em regiões, a APN, o Extended ID, os eventos e o leitor, sem a versão
  - **no protótipo · o pacote 2** (decisões 52 a 54, D1, D3 e D4 do prompt): a D lê o conteúdo de cada bloco pela mesma conta da T09 (`conteudoDo`: *4 regiões*, *intervalo 30 s*, *m2m.mobs2.br*, *sem fio*), e a Tradução da CAN diz *gravada* · o Extended ID é leitura, sem seta, e conta como resolvido quando o módulo conectou: *3 cartões · 1 iButton*; sem nenhum, *nenhum cartão no módulo* (D5) — **o mock não declara o Extended ID do herói** (só o do `diff-divergente`, o a-16): o protótipo lê o do módulo, se o mock declarar, e senão o do `diff-divergente`, o mesmo que a T11/02 desenha no herói (pro arquiteto) · **o horímetro pulado** (D1) diz *não calibrado*, conta como resolvido e não bloqueia: pulado é o que a T10 marca em `etapas.calibracao.puladas`, ou o opcional do modelo (`calibracao.porModelo.opcionais`) que a calibração concluída não semeou · **o Painel sem calibração** (D4): o item não aparece, a B tem 4 e o total, 30 (*N de 30*); houve calibração quando a T10 semeou ao menos uma grandeza do ativo da sessão · **a E é a do mock, com 6 passos, também com tacógrafo digital** (D3): a velocidade é passo da T14, e não item do checklist — nenhuma referência desenha a E com 7, e o mock tem 6 (pro arquiteto) · **o nome da E**: as referências e o `textos.md` dizem *E · Ciclo de testes*, e o mock ainda diz *Teste dinâmico* (`checklist.secoes`, rótulo e título) — vale o da referência (`T.rotuloDaSecao`), até o mock trocar · a barra do sistema leva o Bluetooth (lei 22): na T13, o módulo está sempre conectado
- o não conforme exige **a foto do problema** (decisão 39): marcou *Não está conforme*, o quadro diz *Enquadre o problema*, e o botão é o disparador, `Fotografar o problema` · fotografado, o quadro vira o registro, e o botão vira `Salvar com ressalva` · sem o texto, o botão diz *Conte o que aconteceu*, apagado · a ordem entre escrever e fotografar é livre
  - **no protótipo · o não conforme com a foto do problema** (decisão 39, T13/07, 08 e 15): a caixa é a `Justificativa` nas duas telas do item — desmarcada, *marque e conte o que aconteceu*, a 16 do fim do miolo (07); marcada, *conte embaixo o que aconteceu* e o campo *O QUE ACONTECEU*, em foco (08, 15) · o registro do problema é a foto que prova, tirada (`FotoProva`, a peça que nasceu na T10 e, com a decisão 52, é só do checklist), no lugar do visor: *Problema fotografado às 14:30* e *vai junto com a ressalva, pro gestor*, sem toque · a URL: marcar → 08; `Fotografar o problema` → 15; desmarcar → 07 · desmarcar guarda o que aconteceu e a foto do problema enquanto o técnico está no item, e marcar de novo os devolve (15, se já fotografou); sair do item pelo `Voltar ao checklist` os descarta · sem a foto, o disparador acende com ou sem o texto; fotografado e sem o texto, *Conte o que aconteceu*, apagado e desabilitado (lei 17); `Salvar com ressalva` grava a ressalva com o que aconteceu, a hora e a hora da foto do problema, e segue pro próximo por fazer, como antes · o 08 pela URL abre com o texto de exemplo (`checklist.exemploJustificativa`), e o 15, com ele e o problema fotografado às 14:30 · o 12 pela URL grava a ressalva de exemplo com a foto do problema · as fotos tiradas da B (*N fotos tiradas*) contam o item salvo com a ressalva, que tem a foto do problema · o registro entra com a troca de quadro, sem esmaecer de novo por dentro (C12·42) · `Faltam N itens` com 1 diz *Falta 1 item* (o singular com o verbo junto, proposta pro arquiteto)
- no singular: *1 item*, *1 foto tirada*
  - **no protótipo · o pacote 3:** *você fotografa N itens* conta os itens da seção, não os que faltam — na `12`, com o Módulo salvo com ressalva, *você fotografa 5 itens* (`quemAgeDa`, em `app/src/telas/T13/checklist.js`); sem a calibração, a B tem 4, e a linha diz *4 itens* · a barra do checklist pinta o número do título, e a barra da Seção B, no nível do item, deixa o Painel pendente (07, 08, 15): o protótipo já pintava assim, e as referências do pacote 3 passaram a desenhar igual
- **cada seção é um cartão**, com quem age na segunda linha — *o app confere sozinho*, *você fotografa 4 itens*, *você faz o ciclo parado*, *espera o servidor · não bloqueia* · tocar num cartão faz ele crescer no lugar, com a seta pra cima; as outras seções descem, e nada mais se mexe
- **tem seta, toca; não tem seta, é leitura** · as leituras da A, da C e da D, os itens feitos e os passos da E não têm seta
- na B, cada foto a tirar tem a câmera e a seta → a câmera do app · **o Painel é foto a tirar**, obrigatória quando houve calibração (decisão 52)
- item pendente leva à tela que resolve, pelo campo *origem* do mock: conectar → T05 · ativo → T06 · can → T07 · configurar → T09 · calibração → T10
  - no protótipo · a T08 saiu com o pacote 1 (decisão 44): a origem `can` leva à T07, o Diagnóstico do módulo, que lê o módulo e a CAN (`Ler de novo`) · o botão do item reprovado (09) leva à T07 também, e com o pacote 2 diz `Refazer o diagnóstico` — sai o desvio nomeado do `Refazer a leitura da CAN`
- na E, uma ação só: *Fazer o ciclo de testes* → T14 · os seis passos são leitura, e depois do ciclo dizem *confere*
- o item não conforme salvo com justificativa aparece com o check e *com ressalva · a causa*
- homologado: o veredito no topo — *Instalação homologada às 14:30* — e o relatório embaixo · com a localização negada, *o relatório vai sem localização*
- `Finalizar instalação` só acende com 100% de A, C, D, E e das fotos da B · a F não bloqueia
- item manual sem a permissão da câmera → o visor com a câmera riscada (a variante que a T10/11 desenhava até a decisão 52; a T10/11 saiu, e a variante fica só do checklist), e o `Tirar foto` vira `Abrir as configurações` — permitida lá, a câmera abre na volta · com o *Não está conforme* marcado, também: desde a decisão 39, a ressalva exige a foto do problema, e a foto do problema precisa da câmera (antes, o `Não conforme` continuava, porque a ressalva não precisava dela) · nenhuma referência desenha este quadro e o `textos.md` não tem a frase do que falta pro item, então o visor fica só com a câmera riscada (G25), e a URL sai do momento (sem a referência, o 07 e o 08 não o desenham); no protótipo, nenhum estado da coluna chega nele, e ele se vê na vitrine (`f7-visor-sem-permissao-item`). O primário, em todos os casos (o `Tirar foto`, o `Abrir as configurações`, o `Fotografar o problema`, o *Conte o que aconteceu* apagado e o `Salvar com ressalva`), sai de uma função só, provada no node (`app/src/estado/camera.js` · `primarioDaCamera`, `app/scripts/testar-camera.mjs`)
- **no protótipo, o que a entrega não desenha** (G25, pro arquiteto): o automático que falta tem o ícone da ferramenta da tela que resolve e *a fazer*, com a seta · o que reprovou tem o X no poço, a leitura embaixo e a seta, e abre o nível do item (09) · a foto tirada no checklist fica só com o nome, sem dizer de onde veio · com 1 foto por fazer, ou 1 tirada, o singular (a resposta do arquiteto de 26/09): *você fotografa 1 item*, *1 foto tirada* (até ela, o cartão ficava sem quem age) · a F aberta depois de homologar mostra os valores do C10 (`12 subiram`, `31 de 31`, `na fila`) · o rótulo do nível do item é o título longo da seção que o técnico faz (*B · INSTALAÇÃO FÍSICA*) e o nome curto da que o app confere (*C · HARDWARE*), como as referências desenham

## As regras (C10, decididas no C0 e escritas aqui — G1; reescritas na construção da entrega de 25/09)

**A entrega de 25/09 (decisão 34) trouxe a estrutura nova do checklist**, e as regras do placar, do mapa, do acordeão que tirava o placar, dos cartões de valor e de foto, da versão em duas colunas e da escala do cartão com barra saíram com ela. Continuam valendo o que é um item resolvido, de onde cada seção lê, a semente, a Seção F, o Finalizar com a ciência, o item manual, o item reprovado e o voltar.

- **as seções:** uma aberta por vez; tocar num cartão abre ele no lugar, tocar em outro troca a aberta, e tocar na aberta fecha. O título, a barra e o rodapé ficam; as seções de baixo descem por transform, e a lista rola (a rolagem fica onde está). Abrir não anima altura
- **o que é um item resolvido:** o automático cuja fonte passa, o manual com foto (tirada aqui; desde a decisão 52, o Painel também) ou com ressalva, e o que não se aplica. O título e a contagem de cada seção contam os resolvidos; o `Faltam N itens` conta só os das seções que bloqueiam (A a E) — com 1, o texto não existia e a legenda sumia (G25); no protótipo, desde a resposta do arquiteto de 26/09 (*o singular vale*), *Falta 1 item*
- **de onde cada seção lê:** A, da sessão, do diagnóstico do módulo (a T07; até o pacote 1, da pré-checagem) e do vínculo do ativo · B, das fotos e ressalvas desta tela — o Painel só existe quando houve calibração (decisão 52) · C, da leitura da CAN e da leitura nominal do módulo (as entradas e o modem) · D, da cadeia gravada e da calibração (o valor de partida é o do painel) · E, do ciclo da T14 · F, da fila desta sessão (G22)
- **a semente:** pular pro checklist pelo palco é o herói depois da calibração e antes do ciclo — A, C e D resolvidas, B (com o Painel a tirar) e E por fazer, F esperando: 17 de 31, `Faltam 11 itens`, como as referências do pacote 2 desenham
- **a Seção F:** conta só o que entrou na fila depois da abertura da sessão (G22). Antes do Finalizar, nada desta sessão está na fila, e ela espera (o relógio, *espera o servidor · não bloqueia*). O `Finalizar instalação` gera o relatório da instalação — as evidências e o checklist — na fila (HU-T13-7), e a Seção F passa a contar ele: 3 de 3, *o servidor confirmou*. Ela **falha** quando o servidor diz que não: o evento de teste que não chegou no prazo (T14/02), um item desta sessão recusado, ou o caso do ativo sem resposta (pronto-para-fechar)
- **o Finalizar (T13·3):** acende quando o que bloqueia fecha; o homologado aparece depois do toque, com o veredito e o relatório no topo. Com a Seção F falhando, o toque abre o diálogo da ciência (10), e o `Finalizar instalação` do diálogo espera o `Estou ciente` marcado
- **o item manual:** tocar numa foto por fazer abre o nível do item (07). `Tirar foto` ou `Salvar com ressalva` resolvem o item e seguem pro próximo por fazer da seção; sem próximo, voltam à Seção B aberta. No protótipo, desde a decisão 39, o `Salvar com ressalva` só aparece com a foto do problema e o que aconteceu (08 → 15). A foto tirada fica tirada: o item feito não tem seta e não se toca (pendencias.md)
- **o item reprovado (T13·2):** o item reprovado tem a seta e abre o nível do item (09), com o motivo; `Refazer o diagnóstico` leva à T07, o Diagnóstico do módulo (até o pacote 1, à T08, que saiu, com o `Refazer a leitura da CAN`). Nada automático se marca à mão
- **a Seção E (T13·4):** uma ação só, `Fazer o ciclo de testes`, abre a T14 enquanto falta passo. Nada de E se responde aqui. O passo que a T14 aprovou diz `confere`, e o que falta, `a fazer`. Sair da T14 por `Encerrar o ciclo` ou por `Ir para o checklist` (T14·2) dá a mesma Seção E: os pendentes ficam pendentes, e a ação continua
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
- não se aplica
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

Contra a lista do design, entraram as de toque da folha 1 (o primário nos três estados e o link), os átomos da folha 3 (os glifos e os poços das seções e dos itens, os ícones da câmera, do ciclo e das ferramentas que resolvem o que falta, e o LED da faixa e o quadrado do checkbox), a nota tracejada do item reprovado (09), o campo focado da justificativa (08, 15) e a foto tirada que nasceu na T10, que é o registro do problema (15) — com a decisão 52, a foto e a câmera do app são só do checklist, e o Painel entra na B como as outras fotos a tirar. Com a decisão 39, a linha tocável do `Não conforme` saiu: a caixa *Não está conforme* é a justificativa nas duas telas do item (a variante do checkbox com a linha de baixo). Saíram as 12 que o código não usa: faixa · sem ação, processo correndo, diálogo, diálogo sem saída, assertiva da sessão, linha de conferência, encerrando, pede o corte, sem homologar, com contador de falha, linha da fila e linha da re-checagem. As variantes nomeadas desta tela (G11): o segmento atual com falha (09), a nota do item que não se marca à mão (09), a legenda junta, a 6 do botão, e, sem desenho na entrega, o item que falta com o ícone da ferramenta e *a fazer*, e o item reprovado com o X, a leitura e a seta. A barra de 22 do instrumento do item reprovado é o tamanho `item` da escala, peça interna (`06-prototipo/app/src/ds/MAPA.md`). Com o pacote 1 (a folha 6), o *com contador neutro* e o *com contador de falha* viraram uma peça só, o *com contador*: as listas dizem o nome novo, e o *de falha* desta nota é ele em falha.

## Histórias de usuário

- **HU-T13-1** — Itens automáticos não são marcáveis à mão; "marcar todos" só nos manuais sem foto
- **HU-T13-2** — Item automático reprovado mostra o motivo e leva direto à tela que corrige
- **HU-T13-3** — Vejo progresso separado por seção e por tipo
- **HU-T13-4** — Posso responder manual como não conforme com justificativa → marca ressalvada, não bloqueia
- **HU-T13-5** — Finalizar exige 100% dos automáticos de A, C, D e 100% dos manuais com foto
- **HU-T13-6** — A Seção F não bloqueia; finalizar com ela falhando exige ciência marcada, com nome e hora
- **HU-T13-7** — Finalizado gera o relatório com seriais, resultados, fotos, geolocalização e técnico
- **HU-T13-8** — A Seção E não é respondida aqui — item faltante me devolve ao ciclo de testes
- **HU-T13-9** — A foto do painel é tirada aqui, na Seção B — obrigatória quando houve calibração

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
