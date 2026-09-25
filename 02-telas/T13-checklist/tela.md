# T13 · Checklist

Fechar a homologação: o que o app já provou sozinho, e o que o técnico ainda precisa provar.

| | |
|---|---|
| **Elemento-assinatura** | o placar por seção — automático e manual separados — enchendo até o veredito |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · 31 itens |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 9 · 2 — ver `estados.md` |

## O que se toca

- tocar numa seção → ela aberta
- item automático reprovado → a tela que corrige
- item manual → responder: foto, ou não conforme com justificativa
- item manual sem a permissão da câmera → igual à câmera da T10 (T10/11): o visor com a câmera riscada e o `Tirar foto` vira `Abrir as configurações` — permitida lá, a câmera abre na volta · o `Não conforme` continua, porque a ressalva não precisa da câmera · nenhuma referência desenha este quadro e o `textos.md` não tem a frase do que falta pro item, então o visor fica só com a câmera riscada (G25), e a URL sai do momento (sem a referência, o 07 e o 08 não o desenham); no protótipo, nenhum estado da coluna chega nele, e ele se vê na vitrine (`f7-visor-sem-permissao-item`). O primário, nos três casos (o `Tirar foto`, o `Abrir as configurações` e o `Salvar com ressalva`), sai de uma função só, provada no node (`app/src/estado/camera.js` · `primarioDaCamera`, `app/scripts/testar-camera.mjs`)
- `Finalizar instalação` → homologado; com a Seção F falhando, pede a ciência

## As regras (C10, decididas no C0 e escritas aqui — G1)

- **o acordeão:** uma seção aberta por vez; tocar em outra troca a aberta, e tocar na aberta fecha e volta ao mapa. Abrir tira o placar e o cabeçalho das colunas, como as referências 01 a 06 desenham. Abrir não anima altura
- **o que é um item resolvido:** o automático cuja fonte passa, o manual com foto (tirada aqui, ou herdada da calibração) ou com ressalva, e o que não se aplica. O placar e a contagem de cada seção contam os resolvidos; o `Faltam N itens` conta só os das seções que bloqueiam (A a E) — com 1, o texto não existe e a legenda some (G25)
- **de onde cada seção lê:** A, da sessão, da pré-checagem e do vínculo do ativo · B, das fotos e ressalvas desta tela e da foto da calibração (o Painel) · C, da leitura da CAN e da leitura nominal do módulo (as entradas e o modem) · D, da cadeia gravada e da calibração (o valor de partida é o do painel) · E, do ciclo da T14 · F, da fila desta sessão (G22)
- **a semente:** pular pro checklist pelo palco é o herói depois da calibração e antes do ciclo — A, C e D resolvidas, o Painel herdado, B e E por fazer, F esperando: 19 de 31, `Faltam 9 itens`
- **a Seção F:** conta só o que entrou na fila depois da abertura da sessão (G22). Antes do Finalizar, nada desta sessão está na fila, e ela espera (o relógio, `não bloqueia`). O `Finalizar instalação` gera o relatório da instalação — as evidências e o checklist — na fila (HU-T13-7), e a Seção F passa a contar ele: `12 subiram`, `31 de 31`, e o ID na plataforma `na fila`. Ela **falha** quando o servidor diz que não: o evento de teste que não chegou no prazo (T14/02), um item desta sessão recusado, ou o caso do ativo sem resposta (pronto-para-fechar)
- **o Finalizar (T13·3):** acende quando o que bloqueia fecha; o homologado aparece depois do toque. Com a Seção F falhando, o toque abre o diálogo da ciência (10), e o `Finalizar instalação` do diálogo espera o `Estou ciente` marcado
- **o item manual:** tocar num cartão de foto por fazer abre o nível do item (07). `Tirar foto` ou `Salvar com ressalva` resolvem o item e seguem pro próximo por fazer da seção; sem próximo, voltam à Seção B aberta. A foto tirada fica tirada, e o Painel herdado não se fotografa de novo: o cartão já resolvido não se toca (pendencias.md)
- **o item reprovado (T13·2):** o cartão reprovado se toca e abre o nível do item (09), com o motivo; `Refazer a leitura da CAN` leva à T08. Nada automático se marca à mão
- **a Seção E (T13·4):** o cartão do passo que falta (ou que reprovou) abre a T14. Nada de E se responde aqui. O passo que a T14 aprovou mostra `confere` — nenhuma referência desenha a Seção E feita, e a palavra é a aprovada pro chassi (G25). Sair da T14 por `Encerrar o ciclo` ou por `Ir para o checklist` (T14·2) dá a mesma Seção E: os pendentes ficam pendentes, e o cartão deles abre a T14
- **a versão gravada (T13·1):** inteira, num cartão das duas colunas; a grade preenche o lugar que ele deixa com o cartão seguinte
- **a escala do cartão com barra (T13·5):** a bateria com a faixa esperada entre 1/3 e 5/6 da barra (10 a 16 V no herói, a mesma do nível do item reprovado), os satélites de 0 a 12, e o sinal do modem com a faixa entre 1/6 e 5/6 (−110 a −50 dBm). As posições saem da conta
- **o voltar (T13·6):** no mapa e numa seção aberta, faz o `Voltar ao menu`; no nível do item, o `Voltar ao checklist`, que volta à seção do item aberta; no diálogo, o `Cancelar`

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- processo correndo
- com legenda
- diálogo
- diálogo sem saída
- diálogo com ciência
- seção aberta do checklist
- seção recolhida
- linha do histórico
- a lista de garagens
- leitura pequena
- leitura com mínimo
- segmentado
- encerrando
- pede o corte
- sem homologar
- placar da homologação
- com contador neutro
- com contador de falha
- checkbox
- checkbox marcado
- justificativa
- linha de opção
- lista com contagem
- linha de seção do mapa
- cartões de valor
- cartão com barra
- cartão de configuração
- cartões de foto
- a seção aberta inteira
- cartões que esperam o ciclo
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

Medido nas referências e no código do C10 (G10): toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe. O instrumento do item reprovado é peça só desta tela (`app/src/telas/T13/pecas.jsx`), montada com os primitivos. O visor da câmera do item manual é o mesmo desenho da câmera da T10, e as duas são uma peça só, `VisorCamera`, em `app/src/ds/checklist/` (a entrega do mundo real), que o design system ainda não lista.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- linha tocável · normal e pressionada (a linha de ação: `Não conforme · pede justificativa`)
- barra do sistema
- faixa · sessão aberta
- os glifos de estado
- os poços
- os marcadores
- com contador neutro
- placar da homologação
- linha de seção do mapa
- seção aberta do checklist
- seção recolhida
- a seção aberta inteira
- cartões de valor
- cartão com barra
- cartão de configuração
- cartões de foto
- cartões que esperam o ciclo
- segmentado
- justificativa
- campo focado
- checkbox
- checkbox marcado
- nota tracejada
- diálogo com ciência
- duas ações
- com legenda

No fechamento do C10 e do C11, a lista ficou só com os nomes das linhas do `componentes.md` (G10): entraram as de toque da folha 1 (o primário nos três estados, desabilitado enquanto faltam itens ou falta a justificativa, e o link do rodapé e do diálogo) e os átomos da folha 3 (os glifos e os poços do mapa e das seções, e os marcadores: o LED da faixa e o quadrado do checkbox). As diferenças da tela contra a folha viraram variante nomeada da peça (G11), declarada lá: a seção que aguarda outra tela e a legenda F · não bloqueia, na cabeça do acordeão; a última seção sem divisória; o nome do glifo pelo dado e a linha recolhida, no mapa; a palavra junto do valor, o cartão largo e o cartão tocável, nos cartões de valor; o cartão de foto desabilitado; o placar que fechou, com o veredito e a meta; o segmento atual com falha (`09`); a nota do item que não se marca à mão (`09`); e a legenda junta, a 6 do botão. A barra de 22 do instrumento do item reprovado é o tamanho `item` da escala, peça interna (`06-prototipo/app/src/ds/MAPA.md`). Da lista do design saíram as 16 que o código não usa (faixa · sem ação, processo correndo, diálogo, diálogo sem saída, linha do histórico, a lista de garagens, leitura pequena, leitura com mínimo, encerrando, pede o corte, sem homologar, com contador de falha, linha de opção, lista com contagem, linha da fila e linha da re-checagem). Na coluna do `componentes.md`, a T13 saiu de 18 linhas: dessas 16, menos a linha da fila e a linha da re-checagem, que a coluna do design não dava à T13, e mais a cadeia concluída, a cadeia recusada, a marca no login e o campo.

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
