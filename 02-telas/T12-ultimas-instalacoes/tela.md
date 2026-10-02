# T12 · Últimas instalações

Ver o que foi instalado nesta unidade e o que cada instalação provou.

| | |
|---|---|
| **Elemento-assinatura** | a trilha de evidência de cada instalação, etapa por etapa |
| **Chrome** | faixa quando há sessão |
| **Semente no protótipo** | unidade Várzea · cinco instalações |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 4 — ver `estados.md` |

- no protótipo · a nossa versão da linha *Semente no protótipo*, antes desta entrega: | **Semente no protótipo** | unidade Várzea · cinco instalações · sessão M2C-0417 + RKT-8H42 (a 00 desenha a sessão aberta, G21) |

## O que se toca

- o detalhe mostra **o que o servidor recebeu**: posicionamento, eventos e viagens, cada um com o veredito e o porquê numa linha · o traço é *indisponível*, com o motivo · o relógio é *pendente*, e o app confere de novo por 24 h — nunca reprova por rede · com um critério indisponível ou pendente, o status geral é *aguardando validação*
- os números vêm de `instalacoes[].recebimento`: o evento em 24 s e a viagem de 3 km são os do ciclo dinâmico
  - **no protótipo** (a última entrega, construída): a seção *O QUE O SERVIDOR RECEBEU* entra antes de *A INSTALAÇÃO*, as duas com o rótulo a 6 do cartão, e cada critério é a assertiva da sessão na variante *recebimento* (58, o porquê embaixo, o veredito à direita). O porquê sai do dado: `3 posições em 1 min 12 s` (posições e `emSeg`), `o teste chegou em 24 s` (`recebidoAosSeg`), `1 viagem fechada · 3 km` (os km; o *1* é do texto, porque o mock não conta as viagens — é a do ciclo), e no indisponível e no pendente o `motivo` do caso, com *· confere por 24 h* no pendente. O recebimento deixou de ser a sétima etapa: *A INSTALAÇÃO* tem as seis da i-01, ou as três que o resumo sustenta nas outras (Configuração, Checklist, Autoteste)
  - **o status geral sai dos critérios**: com um indisponível ou pendente, o cabeçalho diz *aguardando validação*, em `--tinta-secundaria`; sem eles, o estado da instalação
  - **a instalação sem `recebimento`** — as outras doze do mock, que o técnico abre tocando na lista — leva o veredito da regra dos três critérios do mock (`criteriosRegra.porEstado`, com a exceção da i-09) e fica sem o porquê, porque o mock não tem o número dela: a PCX-9A17 no fluxo tem os três conformes; a RVM-1E54, da falha reconhecida, os três *ausente*, com o xis. Os vereditos sem referência (*ausente*, *fora do parâmetro*, *incompleta*, *atrasado*) são o valor do mock, como vem; *atrasado* leva o relógio. Padrão do protótipo, pro arquiteto
  - **o quando de ontem** ganhou texto (T12/04 e 05): embaixo da placa, *M2C-0312 · ontem, 16:05*. As de mais de um dia seguem com a linha de baixo da lista (G25)
  - **desvio nomeado, T12/04 e 05:** as duas desenham a PCX-9A17 com as seis etapas e *Rafael Vieira*, mas a i-02 do mock só tem o resumo. O protótipo mostra o que o mock sustenta — as três linhas do resumo e, embaixo da placa, sem o nome (T12-V5) — e fica a 1,27% e 1,28% do HTML (medido antes do pacote 1: a 04 e a 05 mudaram no resumo, e se medem de novo). A correção é de dado: a i-02 ganhar as `etapas` no mock, e o detalhe passa a mostrar as seis e o nome sem mudar uma linha de código
- tocar numa instalação → o detalhe (a 01). A i-01, a do herói, mostra as sete etapas; as outras abrem o mesmo detalhe só com as linhas que o resumo delas sustenta — Configuração, Checklist, Autoteste e Recebimento (T12·2). O nome do técnico só aparece na instalação que tem a história inteira no aparelho, a de hoje: o resumo das outras não diz quem instalou. Embaixo da placa, as outras repetem a linha de baixo da lista (`M2C-0312 · 16:05`, `M2C-0362 · há 9 dias`): o *quando* do detalhe só tem texto pra hoje (G25). O 01 aberto pelo endereço mostra a mais nova da unidade
  - **no protótipo · quem instalou** (a revisão de 26/09): o nome é o do dado — a i-01 é do herói do mock (`tecnico`, *Rafael Vieira*) —, nunca o de quem está logado: com outro usuário no aparelho (T01/18) o detalhe da RKT-8H42 segue dizendo *M2C-0417 · hoje, 11:47 · Rafael Vieira*. O roteiro `outro-usuario.mjs` prova com o m.souza. Padrão do protótipo; a alternativa é o mock ganhar quem instalou em cada instalação, com a checagem no gate (pro arquiteto)
  - **no protótipo · o resumo, pelo pacote 1** (decisão 49, e a resposta do arquiteto ao gate): na `01`, na `04` e na `05`, só duas linhas de *A INSTALAÇÃO* mudam — *Diagnóstico · 7 de 7* no lugar de *Pré-checagem · 12 de 12*, e *Checklist · 31 de 31* no lugar de *10 de 10*. O resto da T12 fica como está, como os HTML do pacote desenham: *Viagens*, *hodômetro · com foto* e *Ciclo dinâmico · 5 de 5* ficam até o pacote 2 · o 31 de 31 sai do mock (`etapas.checklist` da i-01, e os resumos das outras); o 7 de 7 não tem campo na i-01, que guarda a pré-checagem (12 de 12): a fonte vai pro arquiteto
    - **construído (02/10), desvio nomeado:** a linha se chama *Diagnóstico*, e o 7 de 7 é derivado — as linhas são as do diagnóstico do módulo do mock (`M.diagnostico.modulo`, 7), e as que conferiram são as que o herói lê sem trava (as 7: a i-01 é a instalação dele, e a pré-checagem dela passou inteira, 12 de 12). Quando a i-01 ganhar o `diagnostico` dela nas etapas, no lugar da `preChecagem`, a linha lê dele sem mudar o código (`app/src/telas/T12/dados.js` · `diagnosticoDe`) · a `04` e a `05` continuam com as três linhas que o resumo da i-02 sustenta (o desvio de cima), agora com o *Checklist · 31 de 31* do mock · quanto afasta (contra o HTML · contra o PNG): `01` 0,07% · 1,59% · `04` 1,26% · 2,14% · `05` 1,27% · 2,20% · a `00` segue em 0,04% · o roteiro `app/scripts/caminhos/recebido.mjs` confere o *Diagnóstico · 7 de 7* e o *Checklist · 31 de 31*
- `Voltar às instalações` → a lista (a 00)
- `Voltar ao menu` → T04 · `ENCERRAR`, antes de homologar: a sessão abortada da T16 (G23); depois, o encerramento
  - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar sem homologar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela — a resposta do arquiteto de 26/09 · o `Encerrar sem homologar` roda os 4 passos da T16
- o voltar do Android (no computador, o Esc) faz o mesmo que a saída do rodapé: no detalhe, volta às instalações; na lista, ao menu

**A lista.** As instalações dos ativos da unidade do contexto, das mais novas às mais velhas, em quatro grupos pela idade: até `hoje` dias é HOJE, até `ontem` é ONTEM, até `esteMesAte` é ESTE MÊS, e acima é MAIS DE UM MÊS — o corte nomeado do mock (`criteriosRegra.gruposIdade`, T12·1), e não o calendário. Grupo sem instalação não aparece. Em HOJE e ONTEM a linha de baixo diz o módulo e a hora; nos outros, o módulo e há quantos dias. O veredito é o estado da instalação: os três desenhados (aprovada, aguardando validação, falha reconhecida) e, de outra unidade, *aprovada após reprocessamento* e *reprovada*, com o nome da máquina de estado e o glifo pela natureza (T12·3). A ressalva, que combina com qualquer estado, não aparece: o veredito é o estado, e nenhuma referência nem texto desenha a ressalva (G25). A unidade sem instalação mostra o vazio declarado no lugar dos grupos (a 02); sem rede, o aviso da consulta anterior entra em cima da lista (a 03).

Corrigido no C11 pelas referências e pelas decisões do C0 (G1): a semente com a sessão aberta, o corte dos grupos, o detalhe das instalações sem as etapas, o autor da instalação e o voltar do Android.

**No protótipo · a folga antes do rodapé** (a resposta do arquiteto de 26/09): o último grupo da lista não guarda mais os 16 que o `00-tela.html` desenha — somados ao recheio do miolo, eram folga dupla. Na rolagem 0 nada muda; na 03, que rola, o fim da lista fica a 16 do rodapé. As referências da otimizacao300000000 (MUDANCAS §4) desenham assim a 00 e a 03, e o código não mudou: a 00 e a 03 ficam em 0,04% do HTML novo.

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- faixa · sem ação
- o topo do menu inteiro
- uma ação
- assertiva da sessão
- linha de conferência
- aviso
- vazio declarado
- linha do histórico
- a lista de garagens
- encerrando
- pede o corte
- sem homologar
- com contador
- linha de opção
- linha de ônibus
- lista com contagem
- item feito
- item com ressalva

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

Medido nas 4 referências e construído no C11 (T12-A1, G1): as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- linha tocável · normal e pressionada (o toque da linha do histórico)
- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- uma ação
- com contador
- linha do histórico
- assertiva da sessão
- aviso
- vazio declarado
- os glifos de estado
- os poços
- os marcadores

Saíram as que nenhuma das quatro referências desenha e o código não usa (faixa · sem ação, linha de conferência, a lista de unidades, encerrando, pede o corte, sem homologar, linha de opção, linha de ônibus, lista com contagem), e entrou a faixa · sessão aberta, que a 00, a 01 e a 03 desenham. O com contador de falha nenhuma das quatro desenha, mas o código usa (G10, no fechamento do C11): é o cabeçalho do detalhe de uma instalação reprovada ou com a falha reconhecida, o veredito em vermelho, em 700 — a i-06 da unidade do herói abre nele. As variantes nomeadas (G11) ficam declaradas na peça: a linha do histórico com o veredito pela natureza do estado (o que espera em `--tinta`, a falha em `--vermelho`) e com a linha de baixo em 12 quando diz há quantos dias (G12, T12-V2); o contador neutro forte, em 700, no veredito do detalhe; a assertiva da sessão com o valor longo em duas linhas. Peça só da tela: o grupo por idade, o rótulo em cima do cartão (`app/src/telas/T12/pecas.jsx`), e a linha módulo · quando · técnico embaixo do cabeçalho do detalhe. Com o pacote 1 (a folha 6), o *com contador neutro* e o *com contador de falha* viraram uma peça só, o *com contador*: as listas dizem o nome novo, e o *de falha* desta nota é ele em falha.

## Histórias de usuário

- **HU-T12-1** — Vejo por ativo: última intervenção, posicionamento, eventos, viagens e status geral
- **HU-T12-2** — A janela de posicionamento é derivada do pacote (`3 × intervalo + 2 min`), não fixa
- **HU-T12-3** — Os 10 min aparecem como teto de espera, não como critério
- **HU-T12-4** — Critério sem parâmetro declarado fica indisponível com motivo
- **HU-T12-5** — Offline mostro o último resultado conhecido com a data da consulta
- **HU-T12-6** — Falha por rede vira pendente com re-checagem por 24 h, não reprovação imediata

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
