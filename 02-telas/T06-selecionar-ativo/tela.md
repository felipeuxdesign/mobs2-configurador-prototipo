# T06 · Selecionar ativo

Escolher o ônibus que está na frente do técnico e provar que é ele.

| | |
|---|---|
| **Elemento-assinatura** | o par chassi lido × chassi do cadastro — dois números que batem, ou não |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 · dez ônibus no pacote |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 2 · 5 — ver `estados.md` |

## O que se toca

- a lista são os ônibus do pacote da garagem do contexto, na ordem do mock — na Várzea, os 10 (G9); o conteúdo rola entre a faixa e o rodapé (G16)
- tocar num ônibus → ele fica **marcado** (o quadrado lima no poço) e o `Usar este ativo` acende; o `Usar este ativo` → confirmar o veículo. Tocar em outro ônibus troca a marca (decisão do diretor, 24/09: a T06·1 passa pra (b), o T06-N3). A lista com um ônibus marcado não tem referência: monta-se com as peças que existem (G25)
- a confirmação checa nesta ordem: o pacote, os pinos e o chassi (T06·3). O ônibus que não é caso abre com o chassi lido igual ao do cadastro (T06·2)
- `Usar este ativo` → o ativo entra na sessão, com o vínculo anotado (o chassi lido ou a confirmação do técnico, às 14:30), e segue pra T07
- `Escolher outro` e `Escolher outro veículo` → a lista, com a busca como estava · `Voltar ao menu` → T04 · `ENCERRAR` → a sessão abortada (T16/03, G23)
- a busca filtra ao digitar por placa, frota, módulo esperado e chassi, sem caixa, sem acento e sem o hífen da placa; a placa de um ônibus de outro pacote abre a trava de fora do pacote; sem resultado, o cartão fica vazio e sem texto (T06·5)
- sem chassi na CAN: marcar a confirmação libera o `Usar este ativo`; a legenda fica onde está, porque nenhuma referência desenha o quadro marcado e tirá-la moveria o rodapé (G25)
- chassi divergente: `Solicitar correção de cadastro` → o cartão vira o registro, *Correção solicitada às 14:30*, e deixa de ser tocável — é o momento `07`, no mesmo lugar e do mesmo tamanho: o relógio no poço de 24 e, embaixo do feito, *o gestor recebe os dois chassis*; a hora é a do protótipo (`M.HORA_NOMINAL`), e o conteúdo novo esmaece em 150ms (`animacao.md`). O `07` é do caso `divergencia-chassi`, como o `02`: abre pelo endereço com o RDF-3R14, e no fluxo pela porta natural do `02` — o ônibus do caso no pacote da garagem (na Ibura, R-11). Enquanto a T06 está aberta, o pedido fica feito: escolher o mesmo ônibus de novo abre o `07`, e não o pedido outra vez. Pro leitor de tela, o registro é um aviso de status, não um botão
- conflito de pinos com saída: `Usar leitor sem fio` resolve no lugar — a sessão passa a sem fio e o mesmo ônibus segue pra confirmação (T06·4). O conflito vale quando o módulo da faixa, o ônibus e o meio da sessão são os do caso (G28)
- o voltar do sistema (no computador, o Esc) faz o mesmo que o link de saída do rodapé: na lista, no chassi divergente e na correção pedida, o `Voltar ao menu`; na confirmação, o `Escolher outro`, que volta à lista. Nas travas sem link (04, 06), o `Escolher outro` do primário, a saída que elas têm (`06-prototipo/logica.md` · O voltar do Android)

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sem ação
- duas ações
- uma ação
- processo correndo
- com legenda
- seção aberta do checklist
- seção recolhida
- nota com rótulo
- o par comparado
- linha do histórico
- a lista de garagens
- com contador neutro
- com contador de falha
- checkbox
- checkbox marcado
- campo de busca
- justificativa
- linha de opção
- linha de ônibus
- escolhido com trava · T06
- cartão que pede ação
- lista com contagem
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

Medido nas 7 referências e construído no C8 (T06-A6, G1): as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- linha tocável · normal e pressionada
- barra do sistema
- faixa · sessão aberta
- duas ações
- uma ação
- com legenda
- os glifos de estado
- os poços
- os marcadores
- nota com rótulo
- o par comparado
- com contador neutro
- checkbox
- checkbox marcado
- campo de busca
- linha de ônibus
- bloco escolhido
- escolhido com trava · T06

No acerto do design system pelo medido (G10), a lista ficou só com os nomes das linhas do `componentes.md`, e as anotações viraram variante nomeada da peça (G11), declarada lá: a faixa sem ativo, a linha de ônibus com o fim da lista e como escolha, o bloco escolhido justo e apagado, o par comparado com o veredito, a linha tocável de ação ('Solicitar correção de cadastro') — e ela registrada, o pedido feito, na `07` (`registrado`) — e o escolhido com trava neutro, o do conflito com saída. Entraram as de toque da folha 1 (o primário nos três estados, o link e a linha tocável), os poços e os marcadores da folha 3 e o checkbox marcado, que aparece ao marcar. Com a `07`, entrou o glifo da folha 3: o relógio no poço de 24 do registro. Saiu a lista em cartão, que não tem linha: é o recipiente de todas as linhas (`linhas/Lista.jsx`). Na coluna do `componentes.md`, a T06 saiu de 16 linhas que nenhuma das sete desenha (faixa · sem ação, processo correndo, linha do histórico, a lista de garagens, as duas da cadeia, as três do encerramento, com contador de falha, a marca no login, campo e campo focado, linha de opção, cartão que pede ação e lista com contagem) e entrou na faixa · sessão aberta e no bloco escolhido.

## Histórias de usuário

- **HU-T06-1** — Busco por placa, frota ou identificador; vejo modelo do ativo e módulo esperado
- **HU-T06-2** — Quando o ativo trafega chassi pela CAN, o app lê e compara — divergência bloqueia
- **HU-T06-3** — Sem chassi na CAN, o vínculo é confirmação explícita minha, registrada na evidência
- **HU-T06-4** — Ativo fora do pacote trava, sem oferecer solicitar cadastro
- **HU-T06-5** — A matriz de ocupação de pinos roda aqui; conflito resolvível oferece reconectar sem fio no lugar
- **HU-T06-6** — Conflito sem saída é nomeado como incompatibilidade e escalonado — não há reordenação que resolva
- **HU-T06-7** — Cada linha do arnês é nomeada por cor e função

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
