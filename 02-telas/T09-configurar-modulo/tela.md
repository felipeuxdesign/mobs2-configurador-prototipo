# T09 · Configurar módulo

Gravar no módulo o que ele precisa: todos os blocos, na instalação nova; um bloco por vez, na manutenção — cada um relido antes do próximo.

| | |
|---|---|
| **Elemento-assinatura** | a cadeia: o trilho que liga os blocos e só avança com o read-back confirmado |
| **Chrome** | faixa de sessão · a linha dos pinos embaixo do título |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · os blocos do mock |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 6 · 6 — ver `estados.md` |

## O que se toca

- nas travas do envio, **o aviso diz o número e quem fica de fora** — *São 128 registros, e o módulo guarda 96*, *O Terminal Cosme e Damião ficaria de fora* —, e a linha da pré-condição que repetiria o aviso não aparece · no bloco recusado, a linha dos pinos vem logo depois do aviso, antes da cadeia
- `Procurar outro módulo` → com a sessão aberta, primeiro *Encerrar antes de terminar?*
- a entrada, na instalação nova: *o que vai ser gravado* — os blocos, a limpeza dizendo o que apaga e o que preserva, e o espaço calculado sobre o que vai ser gravado
- `Gravar no módulo` → a cadeia
- não cabe, ou cercas demais: a gravação não começa · `Procurar outro módulo`
  - no protótipo (a resposta do arquiteto ao gate do pacote 1, 02/10): com a sessão aberta, o módulo não troca — o `Procurar outro módulo` abre o diálogo *Encerrar antes de terminar?* por cima da tela, como o ENCERRAR (decisão 36): o `Continuar a instalação` deixa o técnico nela, e o `Encerrar mesmo assim` roda os 4 passos da T16
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

## A configuração (retorno do PM, 06/10)

- **cada bloco termina em *confere***: aguardando, gravando, conferindo, confere, não confere · sem *feita*
- **a limpeza com duas redações**: na nova instalação, *Apaga a configuração anterior, inclusive a rede do módulo. A rede será gravada de novo no último passo.* · na manutenção, *Apaga só esta parte. A rede do módulo continua.* · o técnico não escolhe escopo, e não existe limpeza de fábrica
- **dentro da Conexão, *O módulo falou com o servidor***: conferindo (a 11), sim (a 04), *ainda não* com o que conferir: chip, antena e endereço (a 12) · a prova vem do próprio módulo, não depende do servidor
- **não se sai do meio**: no bloco recusado e na queda, depois da limpeza total, só *Tentar de novo* e *Reconectar* · o *Voltar ao menu* volta quando a Conexão estiver gravada e conferida
- **o *não cabe* nomeia o que estourou**: *São 131 contadores. Este módulo guarda 127.* (a 06) · *As cercas têm 6.410 pontos. Este módulo guarda 6.143.* (a 07) · o VL06 guarda 127 contadores e 6.143 pontos
- a prova da cadeia conta *6 passos*
- **no protótipo · a rodada 1 do retorno do PM:** a Conexão mostra *o servidor da Mobs2* na T09 (`conteudoNaTela`; o `conteudoDo` continua com a APN pra conferência da T11, que é da rodada 2) · o envio lê o caso do par quando há: *131 de 127 contadores* (`conteudo-nao-cabe`) e *6.410 de 6.143 pontos* (`pool-esgotado`) · depois do último bloco, a fase *servidor* (a 11) dura um bloco e fecha a cadeia (a 04, *sim*); o *ainda não* (a 12) só pela coluna, pelo caso `servidor-ainda-nao`, que é do módulo do herói · a linha *O módulo falou com o servidor* é o `extra` do elo da Conexão (a peça da cadeia) · depois da recusa, os que nem começaram levam o traço · no recusado e na queda, o rodapé só com o primário, que fecha em 32 (a regra da peça; as referências 01 e 02 deixaram o pé de 24, pro arquiteto) · aberta pela URL, a 04 e a 12 vêm roladas até o fim, como a referência

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

## No protótipo · o pacote 1, construído (02/10)

A construção das dez referências, com as decisões aprovadas no gate do pacote 1 e na errata. O que é padrão do protótipo ou desvio vai nomeado, pro arquiteto.

- **a entrada, pelo modo** (D1, decisão 46): a tela abre parada, e nada grava antes do toque. Sem nada gravado, abre no `05` (instalação nova, o padrão) ou no `08` — o modo é o que o vínculo gravou (`etapas.ativo.modo`, a T06; a manutenção só pelo caso `modulo-ja-deste-ativo`, aberto pela coluna da T06). Com a cadeia em curso (o `Retomar` da T16), segue dela; concluída, abre na `04`. O endereço acompanha o quadro: a T09 aberta pelo fluxo, sem momento, passa a dizer o `05` ou o `08`
- **a `00` pelo endereço:** no print (a régua), `?tela=T09` é o quadro da cadeia correndo, parado — três relidos, o Leitor gravando. Fora do print, o mesmo endereço é o app vivo na semente da `logica.md` (*abre no que vai ser gravado*): o `05`. A `00` se alcança no fluxo, no `Gravar no módulo` · padrão do protótipo
- **`Gravar no módulo`** liga a cadeia pela Limpeza, um bloco por segundo (`RITMOS.cadeiaBlocoMs`), 6 s ao todo; o quadro troca inteiro, o conteúdo esmaece como entre telas, e a Limpeza relê a 1 s do fim do esmaecer (G27, C12·4). O endereço passa à `00`, a tela
- **o conteúdo de cada elo é o do par da faixa** (decisão 49 e a errata: o do caso, nunca o do herói), lido do cadastro dele: o ativo é o modelo do modelo de ativo (*OF-1621*); as cercas, as regiões do ativo em `CERCAS.regioes` (*4 regiões* no herói, *nenhuma* nos outros; decisão 50); o leitor segue a variante do módulo (*sem fio*, ou *no fio branco* na variante sem o sem fio, como o ECO da `06`); os eventos, o intervalo do preset do modelo (*intervalo 30 s*); a conexão, a APN da conexão da empresa (*m2m.mobs2.br*, decisão 51). No herói, a conta dá o `CADEIA.conteudo` do mock, campo a campo
- **desvio nomeado · a `02` e a `03`:** as duas desenham *Cercas · 4 regiões*, e o par delas é o do `queda-na-cadeia`, o PCX-9A17 (a-03), que não tem região em `CERCAS.regioes` — o elo diz *nenhuma*. O mock ganha no dado; a referência desenha o número do herói. Pro arquiteto: a referência passar a *nenhuma*, ou o a-03 ganhar regiões no mock
- **as travas do envio** (decisão 47) são a regra do cadastro, e valem toda vez que o par aparece, no fluxo como na coluna: os registros que o modelo do ativo pede (`conteudoRegistros`) contra os que a variante guarda (`capacidadeRegistros`) — a `06`, o ma-01 (128) num ECO (96) — e as regiões contra o `regioesMax` da variante — a `07`. As cinco regiões da `07` saem do caso `pool-esgotado`, que fala a língua da pré-checagem de antes: as `regioesUsadas` (4) e a `regiaoSolicitada` (o *Terminal Cosme e Damião*, que fica de fora); o caso não traz o módulo, e o par é o do cadastro do a-05, o M2C-0348 (um FULL, 4 regiões). Pro arquiteto: o caso dizer as regiões do ativo com o vocabulário novo
- **a limpeza** diz o texto do `textos.md`, *apaga a configuração anterior · preserva o serial e os contadores*; o `CADEIA.escopos` diz que mantém os identificadores, as leituras e o firmware (e, no escopo de configuração, as cercas): o texto não lê o escopo · pro arquiteto alinhar os dois
- **`Procurar outro módulo`** (06, 07) abre o *Encerrar antes de terminar?* por cima da tela, como o ENCERRAR (a peça é a mesma, `useEncerrar`): o `Continuar a instalação` deixa o técnico nela, e o `Encerrar mesmo assim` roda os 4 passos da T16 e termina na *Sessão encerrada* sem homologar — sem seguir pra T05 (padrão do protótipo; a busca de outro módulo começa no `Voltar ao menu` dela)
- **antes de gravar** (05 a 08) o ENCERRAR é o de toda tela com sessão, e o voltar faz o `Voltar ao menu` (decisão 36)
- **a manutenção · o `08`:** as cercas abrem escolhidas, e só elas se escolhem: o `Reenviar`, a frase da cadeia curta e a limpeza só têm texto pras cercas (*Reenviar as cercas*, *Reenviando só as cercas.*, *apaga só as cercas · o resto fica como está*). As outras quatro linhas ficam no lugar, iguais no desenho, inertes e desabilitadas pro leitor, até haver texto aprovado (G25) · pro arquiteto: os textos dos outros quatro blocos, ou o caso declarar o bloco
- **a manutenção · o `09`:** a cadeia curta grava a limpeza só das cercas e as cercas, um bloco por segundo, e a frase embaixo diz o que fica como está, montada dos rótulos (*Ativo, Leitor, Eventos e Conexão ficam como estão.*). Enquanto ela corre, o ENCERRAR fica apagado e o voltar não faz nada (a lei 17): a recuperação não se aplica, porque a Conexão não está na cadeia · **desvio nomeado:** a `09` desenha o ENCERRAR aceso. Relidas as cercas, o primário acende com o `Voltar ao menu`, sem a prova dos 6 blocos — o fim da cadeia curta não tem referência (padrão do protótipo, pro arquiteto); o aviso continua dizendo *Reenviando só as cercas.*, o único texto dele. A curta grava no estado único o bloco que reenviou (`etapas.cadeia.reenviado`), sem contar os confirmados da cadeia inteira
- **a manutenção · o `10`** (o pacote 5): a cadeia curta fechada — *As cercas foram reenviadas.*, as cercas com o check e *relidas*, aceso, e o `Voltar ao menu` · a URL passa a dizer a 10 quando o último bloco é relido, e pela URL ela abre parada · os outros três blocos, que nenhuma referência desenha, seguem a gramática dela: *O leitor foi reenviado.*, *Os eventos foram reenviados.*, *A conexão foi reenviada.* (relido, relidos, relida)
- **desvio nomeado · só as cercas:** o mock diz que as cercas arrastam o Leitor e os Eventos (`CADEIA.arraste`, a memória compartilhada), e a `09` diz que eles ficam como estão. O protótipo segue a referência · pro arquiteto: a manutenção ignora o arraste?
- **o que fica gravado:** a cada bloco relido, `etapas.cadeia` fica com quantos confirmaram — sem a versão, que saiu (decisão 49). Com o bloco do ativo gravado (2 confirmados), a T07 abre com a CAN lida (D2)
- **a conferência que corrige** (a T11, intocável): o `Corrigir as N divergências` e o `Reenviar os 5 blocos` levam à T09, que agora abre no `05`: o técnico toca `Gravar no módulo` e a cadeia corre
- **a cadeia que fecha o miolo** (05 a 07): o último elo fica sem o fecho de baixo (`semFecho`, na peça) — com o aviso das travas, o fecho e o recheio do miolo passavam 7 da altura que a referência corta, e o quadro rolaria à toa (G16). No desenho, nada muda
- **quanto afasta** (02/10, contra o HTML · contra o PNG): `00` 0,06% · 2,29% · `01` 0,04% · 1,94% · `02` 0,08% · 2,11% · `03` 0,09% · 2,19% · `04` 0,07% · 2,69% · `05` 0,08% · 2,67% · `06` 0,08% · 2,61% · `07` 0,08% · 2,81% · `08` 0% · 1,82% · `09` 0,10% · 1,21%. O que sobra é o contorno dos glifos do Lucide no poço (o relógio, o check, o xis, o i), e, com nome: na `02` e na `03`, o *nenhuma* no lugar do *4 regiões*; na `09`, o ENCERRAR apagado. Contra o PNG, a rasterização do gerador do design. Os textos conferem nas dez, menos a `02` e a `03` (o *nenhuma*)

## No protótipo · o pacote 3, construído (02/10)

- **as travas do envio dizem o número no aviso** (06, 07): *São 128 registros, e o módulo guarda 96.* sai dos registros do modelo do ativo e da capacidade da variante (`envioDo`, a mesma conta de antes), e *O Terminal Cosme e Damião ficaria de fora.* sai da região que o caso `pool-esgotado` pede (`regiaoSolicitada`). Na `06`, a linha do espaço não aparece; na `05` e na `07`, que cabem, ela segue. O elo das cercas da `07` fica numa linha, *5 regiões, cabem 4* · **desvio nomeado:** o artigo *O* é o do Terminal; uma região de outro gênero pediria *A*, e nenhuma referência desenha — fica fixo até haver texto (G25)
- **a `01`:** a linha dos pinos vem logo depois do aviso, dentro do miolo, como na `06` — sai o lugar no pé (o T09-D2 de antes) · a causa da recusa diz *os pontos das regiões não voltaram*
- **as regiões do ativo** (D1): as do `ativoId` mais as em que ele está no `tambemAtivos`, num lugar só (`app/src/dados/regioes.js` · `regioesDoAtivo`), que a T09, a T11, a T13 (pelo conteúdo da T09) e a T16 leem. O PCX-9A17 da `02` e da `03` passa a dizer *4 regiões*, pelo dado — sai o desvio nomeado da `02` e da `03`
- **quanto afasta** (02/10, contra o HTML · contra o PNG): `01` 0,04% · 1,62% · `02` 0,04% · 2,09% · `03` 0,06% · 2,17% · `05` 0,08% · 2,67% · `06` 0,07% · 2,06% · `07` 0,08% · 2,63%. O que sobra é o contorno dos glifos do Lucide no poço, como no pacote 1

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
