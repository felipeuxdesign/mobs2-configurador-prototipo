# As entregas do design, organizadas · o que o protótipo manteve e as cópias do design ainda não têm

As quatro pastas (`atualizacao/`, `atualizacao2/`, `atualizacao33/` e `atualizacao98/`) entraram no lugar, sem perder o que o protótipo e o diretor mudaram. Onde o design e o protótipo mudaram o mesmo arquivo, os dois foram juntados, e o que era só do protótipo ficou. **Pra próxima entrega não apagar nada, parta destes arquivos, e não da cópia antiga.**

As listas de peças e as referências são do design, como o pacote pede. A anotação de construção foi pra uma seção separada.

## Os números

| | o design diz | o protótipo mede | por quê |
|---|---|---|---|
| referências | 147 | 147 | igual · 16 telas, 63 momentos, 68 estados — a otimização 400, 27/09 (eram 113: 47 momentos, 50 estados) |
| tokens | 95 | **275** | o `tokens.css` tem também os tokens das peças, que o C2 e os ciclos de tela pediram (G3) |
| peças | 116 | **126** | as 116 do design, e mais 10 linhas que as folhas desenham e o design ainda não lista: o primário nos três estados, o link, a linha tocável, os glifos, os ícones de ferramenta, os poços, os marcadores e os botões só de ícone |
| cores | 23 | **25** | medido no C1 |
| casos no mock | 34 | **41** | os 7 acréscimos dos ciclos, só aditivos: `conferencia-confere`, `firmware-fora-sem-rede`, `can-estatico-hodometro-a22`, `instalacoes-vazia`, `fila-sem-erro`, `fila-dois-erros` e `fila-vazia` |

A linha das referências segue a última entrega (a otimização 400, 27/09); as outras são as da organização das quatro pastas. Os números de hoje estão no `CLAUDE.md` (295 tokens, 131 peças, 55 casos no mock) e no censo de cada entrega, abaixo.

## Arquivo por arquivo

- **as listas de peças, da T03 à T10:** a seção *Peças do design system que esta tela usa* é a do design. A lista que o código usa, medida em cada ciclo, foi pra *No protótipo · as peças que o código usa*, logo embaixo. **Pra olhar:** várias listas do design têm peças que nenhuma referência da tela desenha. Na T01 e na T02, por exemplo, aparecem a justificativa, a linha da fila, a linha da re-checagem e as seções do checklist. Parece o gerador reconhecendo um bloco genérico
- **o `componentes.md`:** a tabela é a do design, com a *senha visível* nova. Embaixo, *No protótipo · o que o código mediu* tem as 91 linhas em que o protótipo mede diferente:
  - as 10 peças novas;
  - a *falha*, o *ainda não* e o *espera*, que estão desenhados na folha 4, e não na 1 e na 3;
  - as variantes nomeadas (G11) na regra;
  - as telas que usam cada peça, corrigidas pelo medido (G10)
- **as `leis.md`:** entraram a exceção do olho da senha na lei 14 e a área de toque na *nada encosta*. Ficaram as marcas ◆ do C1, a regra do traço por classe de ícone, e as leis do diretor R-14 (escolher marca, o botão avança) e R-15 (sem barra de rolagem do navegador)
- **o `logica.md`:** entraram as quatro linhas dos momentos novos da T01. Ficaram as seções que os ciclos escreveram (os contadores do menu, a escolha do ativo, a releitura, a cadeia, a conferência, o ciclo dinâmico e o checklist), o que se consome uma vez por sessão na T05, o encerramento, e o voltar do Android na T16. A linha do estado da lista longa da T02 foi pro caso novo `lista-longa-garagens`, como o `estados.md`
- **o `ciclos.md`:** fica o plano revisado no C0 e no C1, com os números novos (113 referências, 47 momentos)
- **o `pendencias.md`:** entraram as duas perguntas novas da T01. Ficaram as respostas que os ciclos deram (T06, T13, T14 e T16)
- **o `mocks.js` e o `casos.md`:** o caso novo entrou por cima dos 7 acréscimos, e o gate aprova, com 191 checagens
- **o `indice.json`:** as 113 referências do design, com os campos que o palco lê (`rotulo`, `rotuloOrigem` e `grupo`)
- **o `CLAUDE.md` da raiz, o `LEIA-PRIMEIRO.md`, os `README.md` e o `PROMPT-DE-ABERTURA.md`:** os números do design, com os do protótipo onde ele mede diferente (a tabela de cima)
- **entraram como vieram:** as referências novas e refeitas da T01 e da T02, as folhas 2 e 6, o `estados.md`, o `textos.md` e a `animacao.md` da T01, o `estados.md` e o `textos.md` da T02, as `historias.md`, e as decisões 31 e 32

## O que o pacote repetia

O `_changelog-para-colar.md` da `atualizacao33/` traz, embaixo da senha visível, as linhas da primeira entrega (a logo no lima, o *Lembrar meu usuário*, o checkbox marcado), que já estavam no registro. Entraram uma vez só. A `atualizacao98/` repete os itens 1 a 4 e o 7 da quarta entrega, que o protótipo já estava construindo.

## O C13, a auditoria

A régua inteira rodou contra as bases de hoje (27/09): as 147 referências, os textos das 16 telas, os 127 espécimes das 8 folhas e os 5 quadros do palco. **Nenhuma diferença ficou sem nome, e nenhuma é erro do protótipo**: as 147 saíram iguais à base, 41 em 0% do HTML, e as 106 com diferença levam o desvio nomeado, com o lugar onde ele mora — a tabela das 147 está no `06-prototipo/gate-C13.md`. O que vai pra você:

### Pra ver · o que ganhou nome agora

- **os `textos.md` que trazem a tela atrás do diálogo** (a T01/18, a T04/12 e a T04/13): a régua dos textos não lê o que fica inerte atrás do véu (G25), e esses três `textos.md` listam também o fundo — as unidades da T02 na 18, o menu na 12 e na 13. O diálogo confere nas três, e o quadro está a 0%, 0,34% e 0,32% do HTML: o que se vê é igual. Os outros diálogos (o de sair e o de trocar do menu, a T04/06 e a 09) trazem só a tira de cima, o *Menu* e o diálogo, e conferem · **pergunta:** os três `textos.md` no mesmo jeito dos outros diálogos, ou a régua passar a ler o fundo quando o `textos.md` o traz · anotado na `tela.md` da T01 e na da T04
- **a pausa** (T16/04, T16/06, e o espécime *parou aqui* da folha 4): o protótipo usa o `Pause` do Lucide, dois retângulos de cantos redondos; as referências desenham dois traços finos, feitos à mão (`M9.5 7.5v9 M14.5 7.5v9`), que o Lucide não tem · é a regra dos ícones (G5, lei 14), e é quase tudo o que sobra na 04 (0,05%) e na 06 (0,06%) · **pergunta:** aceitar a pausa do Lucide, ou a folha 3 nomear o ícone do Lucide da pausa · anotado na `tela.md` da T16

### Pra ver · o que já estava com você, e a auditoria mediu igual

Nada mudou nessas; ficam aqui juntas, com o número de hoje, pra fechar de uma vez:

- **a tinta da escolhida** (T02/07 e 08, 0,17% cada): o nome sobe pra `--tinta`, como em toda escolha numa lista, e as duas o desenham em `--tinta-forte`
- **o fundo das folhas e dos diálogos** (G25): as referências desenham o véu sobre o vazio, e o app, sobre a tela de onde nasceu — a T01/04 (2,18%), a 09 (2,35%) e a 11 (2,05%), as oito folhas e diálogos do menu (de 0,71% a 1,24%), a T11/03 (2,14%) e a T13/10 (1,73%) · **proposta:** as referências com a tela atrás, escurecida
- **o menu com rede** (G9, com o diretor): o Últimas instalações sai liberado, e as referências da T04 o desenham *sem conexão* — está em todas as 15 da T04 · e a fila com os 2 que faltam na 01 e na 02
- **o valor do mock contra o da referência** (G9): a T03/01 (0,18%), a T06/00, 08 e 09 (*10 no pacote*), a T06/04 (0,57%), a T08/02 (0,15%), a T10/02 (os três segmentos, 0,16%), a T12/04 e 05 (a i-02 sem as etapas, 1,27% e 1,28%), a T13/09 (*2 de 4*, 0,45%) e a T15/01 e 02 (o recorte, 4,83%, e o *ontem 10:05*)
- **o marcador da T14/05** (0,09%): a referência nova o deixou em 60%, e a barra está em 80%
- **o texto que sobe meio pixel no quadro aceso** (C12·22 e C12·45): 10 referências, de 0,01% a 0,35%, e o *valor alvo* da folha 8 (1,5%)
- **o relógio parado da T01** (T01·1): a 03, a 04, a 05, a 11 e a 17, com 10:00 e 60 s — você confirmou que vale o relógio; as referências seguem com o instante
- **a T07/03**, que não se constrói até a referência do ma-02 (11,41%)
- **as folhas:** a *faixa · sem ação* (6,64%, a peça é a casca inteira, e a folha desenha o miolo) e *a marca no login* (11,97%, o espécime sem a logo que a legenda pede)

### O censo

| | agora |
|---|---|
| a régua das telas | 147 referências, 41 em 0% do HTML, 0 com erro, as 147 iguais à base · 106 com diferença, 106 com o desvio nomeado (60 só G5) |
| os textos | as mesmas 31 do C12, cada uma com o nome · 3 ganharam nome agora |
| as folhas | 127 espécimes, iguais à base um por um, 75 em 0% |
| o palco | 21 peças, nenhuma pior · 38 de 38 na moldura · 5 textos sem falha · sete janelas, de 390 a 1920 de largura |
| o checar, o build e o gate | 13 de 13 · aprova · 196 checagens |

## A espera do Entrar (decisão do diretor, 27/09), construída sem referência

- **o que falta desenhar:** nenhuma referência da T01 mostra o login esperando a resposta do servidor. O diretor pediu o quadro, e o protótipo o constrói no padrão que o app já tem: o primário diz *Entrando…*, desabilitado de verdade e em tinta apagada, como o *Gravando no módulo…* e o *Relendo…* da T10, e o `Esqueci a senha` também se desabilita. Nada gira: o diretor escolheu o texto no lugar da rodinha, pra seguir o padrão, e a lei do loop fica sem exceção
- **o tempo:** no protótipo, 1,2 s fixos (`ritmos.js` · `entrarEsperaMs`), o mesmo da busca de novo da T05: abaixo de 1 s o texto só pisca. A senha errada (a 01) chega depois da espera; sem internet (a 14), o aviso vem na hora, porque o aparelho já sabe
- **a troca entre telas:** a T02 chega 1,2 s depois do toque e entra com a troca entre telas, como resposta do toque (`Troca.jsx` · `respostaDoToque`)
- **pra você:** se quiser, desenhe o quadro (html + png, um momento novo da T01) e o texto em `textos.md`; o protótipo já tem o lugar. A mesma espera caberia no `Confirmar` do código (03) e no `Salvar e entrar` (08), que o diretor deixou de fora: só o login

## A empresa sempre antes (`otimizacao400000000/`), juntada e construída

A entrega entrou inteira — as duas referências novas da T02 (o `08` e o `09`, html e png), a decisão 37 revista, os cinco documentos gerados, os trechos do `MUDANCAS.md` (o mock, a `logica.md`, o `casos.md` e as contagens) e a entrada no topo do `CHANGELOG.md` — e o gate aprova, com o censo de **147 referências**, 63 momentos e 68 estados. Está construída, medida, revisada e fechada (27/09): o herói entra pelas três empresas dele (o `05`) e anda por toque até a T03 e o menu; quem tem uma empresa só a encontra já marcada (o `08`); o `08` saiu a 0,17% do HTML e o `09` a 0%; nenhuma das 145 de antes mudou em nenhum dos quatro números.

### O que a junção achou

- **nos cinco documentos gerados** (a `tela.md`, a `estados.md` e o `textos.md` da T02, a `estados.md` da T04 e o `indice.json`), entrou tudo o que é seu: 20 linhas novas suas (7 na `tela.md` da T02, 7 na `estados.md` dela, 4 no `textos.md` e 2 na `estados.md` da T04), **0 linhas do pacote faltando**, e saíram as 14 linhas antigas do design que você trocou (7 na `tela.md` da T02, 5 na `estados.md` dela e 2 na `estados.md` da T04) · as nossas anotações ficaram, e as 8 que falavam do caso que saiu (`varias-empresas`) foram reescritas na construção, pra dizer o que o código faz agora · o relatório: `06-prototipo/app/prints/tmp/relatorios/juncao-otimizacao400000000.json`
- **no `indice.json`**, os 147 itens com os campos seus e os três nossos que o palco lê (`rotulo`, `rotuloOrigem` e `grupo`) · o `MUDANCAS.md` pede um rótulo pras duas entradas novas: o `T02/08`, estado, ganhou o da coluna, *Uma empresa só, já marcada* (`rotuloOrigem: proposto`, como os outros que propusemos); o `T02/09`, momento, ficou sem, como os outros 63 momentos — só os estados têm rótulo, porque a coluna do palco lista só os estados · **confira o rótulo**, e se o `09` precisa de um
- **no seu índice, o caso do `T02/00` vem entre crases** (`` `uma-empresa` ``), e o de todos os outros itens vem sem · ficou como você mandou · **confira** se é de propósito
- **o `CLAUDE.md` ficou com 295 tokens**, e não 294: o C12 somou o `--mov-fator` (o `tokens.css` tem 295 hoje) · o seu trecho das contagens tinha *95 tokens* como antes e *96* como depois, e o nosso já dizia 294, a conta da 300 · entraram os 63 momentos e os 68 estados, e o número dos tokens ficou o do `tokens.css`
- **a checagem do gate que conferia o caso `varias-empresas`** agora confere as três empresas de `M.empresas` (a do herói entre elas, com a contagem das unidades do mundo dele) e o caso `uma-empresa` (uma empresa só, a do herói), e confere que o `varias-empresas` saiu · **196 checagens**, e o gate aprova

### O que a construção achou

- **a lista com a única empresa já marcada** (`T02/08`) a **0,17%** do HTML: o nome da Viação já marcada sai na tinta da escolha (`--tinta`), como em toda escolha numa lista (a peça da folha 3, e a `T02/01`), e o `08` o desenha na tinta das outras (`--tinta-forte`) · é o mesmo desvio do `07`, também 0,17% · **proposta:** o `07` e o `08` subirem o nome da escolhida, ou a peça ganhar a variante que não sobe
- **a semente da T02:** a linha da `tela.md` e a da `logica.md` dizem *três empresas — a do herói…*, e o protótipo abre, no pulo do palco e no endereço da tela (`?tela=T02`), a `00`, as unidades de quem tem uma empresa só — porque a `00` é do caso `uma-empresa` (a sua `estados.md`), e o endereço dela é o da tela, que é o que se fotografa. O herói chega às três empresas dele pelo `Entrar` da T01 · **padrão:** a `00` · **alternativa:** a semente ser o herói (o `05`), e a `00` ter um endereço do mundo `uma-empresa` · anotado junto da linha, na `tela.md` da T02 e na `logica.md` · As sementes
- **o diálogo de outro usuário no aparelho** (`T01/18`): com a empresa antes, no fluxo ele nasce por cima das empresas do herói (o `05`); a `18` desenha as unidades atrás dele, e é o que a coluna mostra · **pergunta:** a `18` passa a ter as empresas atrás, ou o diálogo fica sobre as unidades? · anotado na `tela.md` da T02, na `animacao.md` da T01 e na `logica.md`
- **três quadros do caminho do herói sem endereço próprio:** as empresas depois do `Entrar` (o `05`) e as unidades da Viação com o `Trocar de empresa` (o `06`) ficam em `?tela=T02`, sem momento, porque são estados e estado parado não anda; e a folha de trocar de unidade do herói (o quadro do `T04/14`) fica no endereço da `T04/07`. O endereço copiado neles reabre o mundo de uma empresa só: a `T02/00` e a folha sem o `Trocar de empresa` · **pergunta:** dar endereço a esses três quadros no fluxo, ou aceitar · anotado no `palco.md` · O link publicado, e nas `estados.md` da T02 e da T04
- **o `Voltar ao fluxo` devolve o quadro, mas não a escolha tocada nele:** o `Ver as unidades` e o `Trocar de empresa` guardam o quadro (as empresas ou as unidades, e a empresa), e o `Voltar ao fluxo` do palco devolve as unidades da Viação, ou a lista com a atual marcada, no mesmo mundo; a empresa ou a unidade tocada dentro do quadro não se guarda, e volta a do endereço — a Viação no `07`, a Várzea no `09` e no `01` · é a pergunta de 24/09, que está com o diretor (guardar a escolha no toque) · anotado no `palco.md` · A coluna
- **a lista longa** é de uma empresa só (a sua `logica.md` e a `tela.md`): o mundo dela vai junto com a unidade até o menu, e a folha de trocar de unidade fica sem o `Trocar de empresa` · o `Voltar ao contexto` da T03 volta às nove unidades (antes, às três do herói)
- **o m.souza** (o caso `outro-usuario`) entra no mundo do herói, com as três empresas: o padrão que já valia, de que outro identificador entra com o do herói
- **o `09` pelo endereço** vem com a Várzea escolhida, a unidade do contexto do mock, como o `01` vinha
- **o `08` só abre parado**, pela coluna e pelo endereço: o `Entrar` é o do herói, e nada no mock leva um técnico de uma empresa só ao fluxo · o `Ver as unidades` dele, até a `00`, se prova no node (`testar-empresa.mjs`)

### O que a revisão achou e o fechamento consertou

- **a troca entre as empresas e as unidades** esmaecia de novo, por dentro dela, o texto do botão principal (*Ver as unidades* → *Escolha uma unidade*, e de volta), contra o `movimento.md` (*o que nasce com o quadro não esmaece de novo por dentro dele*): os dois quadros ganharam a chave, e o botão nasce com o quadro, como na T05 · o `mov-t02` confere agora que o texto não esmaece no `Ver as unidades`, no `Trocar de empresa` e no voltar
- **o `Voltar ao fluxo` a partir das unidades do herói** voltava às empresas (o `05` ou o `07`), ou, do `07` aberto pelo endereço, às unidades de uma empresa só — contra o `palco.md` (*devolve o instante de antes*): agora o `Ver as unidades` e o `Trocar de empresa` guardam o quadro no que o app lembra, e o `Voltar ao fluxo` o devolve, no mesmo mundo · o `empresa.mjs` prova os quatro caminhos, e o `testar-empresa.mjs` ganhou 7 conferências (69 → 76)
- **a etiqueta do palco** dizia *C11 · 2026-09-26*: agora *C12 · 2026-09-27*
- **duas anotações** ainda punham o diálogo de outro usuário por cima das unidades, no fluxo (a `animacao.md` da T01 e a `logica.md`): agora dizem as empresas do herói
- **os desvios** ficaram nomeados onde a linha mora (a `tela.md` e a `estados.md` da T02, a `estados.md` da T04, a `logica.md` e o `palco.md`), no `CHANGELOG.md` e aqui

### Pra ver · linhas suas que ficaram velhas

- **o caminho do herói, na `logica.md`:** o bloco diz *login → unidade Várzea → sincroniza o pacote…*, sem a empresa · a nossa anotação logo embaixo diz que agora o `Entrar` abre as três empresas e o roteiro escolhe a Viação, `Ver as unidades` e a Várzea · **proposta:** *login → a empresa, Viação Atlântico Sul → a unidade, Várzea → …*
- **o C3, na `ciclos.md`:** *a coluna com os 67 estados* e *os 67 estados e os 62 momentos abrem pela URL* · o `CLAUDE.md` e o `LEIA-PRIMEIRO.md` dizem 68 e 63, e o `checar` confere 68 estados · o `MUDANCAS.md` trocou o 145 → 147 da `ciclos.md` (C0 e C13), e não essas duas · **proposta:** 68 e 63, ou marcar as duas como o histórico do C3

### O censo

| | agora |
|---|---|
| referências | **147** · 16 telas, 63 momentos e 68 estados · 147 HTML e 147 PNG · 68 rótulos na coluna |
| tokens | **295** no `tokens.css` e no `CLAUDE.md` |
| o gate | **196** checagens |
| a régua | 147 referências, 41 em 0% do HTML, 0 com erro, as 145 de antes iguais à base do C12 · textos: a T02 inteira, e a T04 com as 13 de antes · 127 espécimes iguais · 42 roteiros, 6.706 passos, nenhum ⚠ · 84 lugares no aceso, 78 medidos, nenhum botão aceso que não faz nada · 38 números da moldura, 21 peças do palco, nenhuma pior |

## O C12, o movimento

O movimento das 16 telas está construído e fechado (27/09), com a direção de movimento que o diretor delegou (26/09). As referências, os `textos.md` e o mock não mudaram, e os quadros parados são os mesmos. O que vai pra você está aqui; o detalhe de cada decisão está no `06-prototipo/gate-C12.md`, e as regras, no `03-design-system/movimento.md`.

### As linhas das `animacao.md` que mudaram por decisão

**71 linhas nas 16 tabelas:** 38 reescritas, 30 novas e 3 que saíram, cada uma marcada *(C12·n)*. As 3 que saíram deixaram a nota com o porquê: os valores lidos da T08 (C12·11), a foto do painel da T10 (C12·42) e o placar da T13 (C12·36).

- **o que elas dizem agora:** a coluna Curva, que dizia *esmaece* ou *acelera*, diz *desacelera*, a curva de tudo (C12·5, em 15 linhas) · o check que *se desenha* é a marca que ganha o check, esmaecendo (C12·7: os requisitos da T01, o check da T03) · a faixa e o cartão liberado da T04 dizem que nada se move no menu (C12·24, C12·26) · a linha que falha da T05 se parte na reprova e na parada (C12·29) · os valores novos da T08 são o mostrador que acende (C12·11) · o tambor da T10 em 500ms (C12·33) e a régua da diferença em sequência, depois dele (C12·34) · o veredito e o conferindo da T11 (C12·35) · o placar da T13 saiu, com a nota, e a barra do checklist e a miniatura dizem o que acontece na volta do item (C12·36, C12·37) · a barra do prazo da T14 contínua (C12·40) · as assertivas da T16 em ordem com reduzir (C12·38) · a troca de quadro em 8 telas (T05, T06, T08, T10, T12, T13, T14 e T16 · C12·4) · o botão primário em 9 (T02, T05, T06, T07, T09, T10, T13, T14 e T16 · C12·8, C12·23) · o marcador de escolha e o placar (T05, T06 e T08 · C12·20) · a folha que vira diálogo (T04 · C12·27, C12·43) · o aviso e a prova da cadeia (T09 · C12·9) · a caixa do não conforme e o registro do problema (T13 · C12·47, C12·42) · o cartão que pede ação (T15 · C12·10) · a legenda do passo que corre e a prova com o bloqueio (T16 · C12·9, C12·44)
- **onde, por tela** (reescritas · novas): T01 3 · 0 · T02 2 · 0 · T03 2 · 0 · T04 2 · 1 · T05 3 · 4 · T06 3 · 4 · T07 3 · 3 · T08 1 · 2, e 1 que saiu · T09 1 · 3 · T10 4 · 2, e 1 que saiu · T11 2 · 0 · T12 1 · 0 · T13 5 · 4, e 1 que saiu · T14 3 · 2 · T15 0 · 1 · T16 3 · 4

### O que faltou de desenho · quadros que não existem

- **o quadro de espera do veredito** (C12·35, C12·44): a caixa neutra, com o traço cinza, o poço vazio e a contagem (*1 de 5* … na T11; *1 de 8* … na prova e no bloqueio da T16). O diretor escolheu a (a) e ele está construído com as peças que existem; **confirme o desenho** (G25)
- **o botão da T11 enquanto a leitura corre:** o *Corrigir as 5 divergências* está aceso e diz o número desde o começo, enquanto a caixa ainda conta. Em toda outra tela, o botão que espera a prova fica apagado com o mesmo texto e acende no fim · **padrão que eu adotaria:** apagado até a quinta linha, e acende por uma camada · falta o quadro
- **o quadro de começo da leitura da T07** (C12·31): o traço no lugar do valor, o marcador no começo da escala, as rodinhas em zero, e o cabeçalho e o rodapé dizendo só o que já chegou
- **o quadro aceso com o traço de 2 por cima da borda de 1** (C12·22, C12·45): o campo em foco (T01), a busca em foco (T02/03 e 04, T06/08 e 09), a célula do código em foco e errada e o cartão em falha (T01/03, 05, 06, 07, 12, 13), o canal escolhido (T01/02), o campo do painel (T10/05) e o espécime do valor alvo da folha 8. As referências desenham o texto subindo meio pixel quando acende; a lei proíbe, e o protótipo não sobe
- **o visor com a foto tirada da T13** (C12·37): o `Tirar foto` segue pro próximo item sem mostrar a foto
- **o *Procurando…* da T05** (C12·41): a linha pede um texto que nem a referência nem o `textos.md` têm; fica o quadro da T05/00 por 1,2 s
- **o pressionado do checkbox** (C12·17): a folha 6 desenha o normal e o marcado; o pressionado é a camada da linha tocável (G14) · confira

### Pares pra ver · onde a linha e a lei não batem

- **T11 · linhas de conferência · com reduzir movimento:** a sua linha diz *aparecem juntas*; o `movimento.md` manda o processo seguir no mesmo ritmo (G26), e o app acende em ordem · fica a nossa versão
- **T13 · o veredito · o quando:** a sua linha diz *o último item passa*; o homologado é o toque em `Finalizar instalação` (T13·3) · fica a nossa versão
- **a barra do sistema quando a faixa nasce** (C12·24): a decisão pedia a cor da barra entrando por uma camada de 200ms; a barra é do aparelho (decisão 43, lei 22) e troca a cor direto · confirme
- **o quadrado do passo que começa** (T05·3, T09·1, T16·1): ele também esmaece em 150ms, e as linhas não dão tempo a ele

### Pra ver · produto

- **T13:** o último `Tirar foto` volta às seções com o `Finalizar instalação` aceso no mesmo lugar do dedo, e dois toques rápidos homologam

### O censo

| | agora |
|---|---|
| tokens | **295** no `tokens.css` e no `tokens.json` (entrou o `--mov-fator`) · 96 no seu `tokens.json` |
| a régua | 145 referências, 40 em 0% do HTML, 132 iguais à base e 13 no quadro aceso · 127 espécimes, 126 iguais · 42 roteiros, 6.350 passos · 83 lugares no aceso · 38 números da moldura |

## A moldura e a barra (`otimizacao300000000/`), juntada e construída

A entrega entrou inteira — as 145 referências refeitas com a barra nova, os 5 quadros do palco, as 8 folhas, a fonte da hora com a licença, a decisão 43, a lei 22, os trechos do `MUDANCAS.md` e os 66 documentos gerados das telas —, com as suas decisões da junção (26/09). Está construída, medida, revisada e fechada: a barra sai igual ao seu HTML, byte a byte, em 144 das 145 (a T07/03 não se constrói), e nada abaixo de y = 30 mudou; a T16 foi a 0,02–0,06% do HTML novo; a moldura bate nos 38 números da régua do palco; e nenhuma referência piorou contra a base. Os quatro modos do palco, lado a lado com os seus quadros, estão em `para-o-arquiteto-palco/`, com um `LEIA-ME.md` pra você.

### O que a comparação achou

Antes de copiar, cada arquivo do pacote foi comparado com o nosso de antes da junção (o `3599e22`):

- **os 66 documentos gerados:** 26 iguais e 40 diferentes. Nos 40: em 32 o nosso tinha as anotações do protótipo · 6 `textos.md` (T01, T02, T11, T12, T13 e T15) só diferiam em linha em branco, e ficou o seu · o `textos.md` da T16 trazia a sua frase nova do NÃO RODARAM, e entrou · o `indice.json` tinha os três campos nossos (abaixo). Pelas suas decisões: entrou tudo o seu, exatamente, e as nossas anotações ficaram no lugar
- **o `indice.json`:** os mesmos 145 itens, sem nenhuma diferença nos seus campos · ficaram o `rotulo` (67) e o `rotuloOrigem` (67), como você decidiu, e também o `grupo` (13), que é nosso — o agrupamento dos estados da T05 na coluna (*achar*, *conectar*, *conferir*) —, pelo mesmo motivo: o palco lê os três. Sem o `rotulo`, a linha da coluna fica em branco; sem o `grupo`, a coluna da T05 fica sem os seus 13 estados
- **as 8 folhas:** a 1 e a 2 diferiam, como você disse · da 3 à 8, idênticas byte a byte, html e png
- **as referências:** dos 316 arquivos de referência (as 145 telas, os 5 quadros e as 8 folhas, html e png), 304 mudaram e 12 eram idênticos — as folhas 3 a 8 · depois de juntados, os 319 arquivos do pacote que não são documento gerado (as referências, a fonte, a licença e a decisão 43) estão iguais aos seus, byte a byte · o gate aprova, com **145 referências** no índice, 145 HTML e 145 PNG
- **o `palco.md`:** a linha *num estado* é a sua, exata · **o README do design system:** *os 287 valores*, e que o seu `tokens.json` conta 96, como você decidiu
- **o `tokens.json`:** o nosso é gerado do `tokens.css` (`npm run tokens`) e não leva `$description`, e o `checar` reprova qualquer diferença do gerado. O `--fonte-sistema` entrou com o `$type` `fontFamily` — o gerador passou a dar esse tipo a ele, como à `--fonte`. **Padrão:** a sua descrição fica no comentário do `--fonte-sistema` no `tokens.css`, palavra por palavra · **alternativa:** o gerador levar o comentário de cada token como `$description` — muda os 294 de uma vez, e é decisão do diretor
- **o censo dos tokens:** 287 na junção (os 286 e o `--fonte-sistema`) e **294** depois da barra, com sete tokens dela: `--barra-sistema-recuo-direita`, `--barra-sistema-desce`, `--barra-sistema-espaco-wifi`, `--barra-sistema-espaco-bateria`, `--barra-sinal-altura`, `--barra-wifi` e `--barra-wifi-traco`. Dos cinco da barra velha, três voltaram a ser usados, com valor novo, e dois ficaram sem uso (`--ls-barra` e `--barra-bateria-casca`). O README do design system e o `CLAUDE.md` seguem com 287 até o diretor escolher: 294, ou 292 sem os dois
- **na junção, e já consertado:** 19 linhas suas tinham ficado em dobro, em 9 documentos, a nova e a velha (ficou uma) · na lista de peças do design da T11 e da T13, a sua linha nova tinha levado a nossa emenda (voltou exata, e a emenda fica na nossa lista) · as linhas suas que voltaram ao lado das nossas reescritas, e três linhas de tabela que tinham saído sem nota, ganharam a nota e entraram no *pra ver*
- **as perguntas da T16 da entrega anterior** (o *não se aplica* no passo que não roda, o subtítulo, o NÃO RODARAM e as referências a 1,93–3,68%, na seção *T16 · o padrão da T16/02*, mais abaixo) estão respondidas por esta entrega: a seção fica como histórico

### Pra ver · onde a nossa anotação contradiz ou reescreve uma linha nova sua

São **55 pares**, cada um com as duas versões lado a lado. Como ficou no arquivo: **a sua exata** — na tabela, ou na lista — e **a nossa numa nota logo embaixo**, marcada *no protótipo · a nossa versão desta linha, antes desta entrega*. Nada foi resolvido: **a decisão é sua**, par a par. Em 19 a nossa contradiz a sua, 1 é uma linha sua que saiu do pacote, e em 35 a nossa só diz mais. Onde a nossa contradiz, ela é o que o protótipo faz hoje, e o que ele faz está do lado de cada uma. A lista inteira também está em `06-prototipo/app/prints/tmp/relatorios/palco-juncao.json` (o campo `pra_ver`), e a classe de cada par em `palco-fechamento.json`, na mesma pasta.

**Onde a nossa contradiz a sua** — decida qual vale (19)

- **T03 · `tela.md`** (par 1) — o seu `textos.md` (linha 11) e a referência 01 dizem `Reconectar` e `Voltar ao contexto`; nenhum HTML da T03 tem *Tentar de novo*
  - a sua: na falha de rede: `Tentar de novo`
  - a nossa: na falha de rede: `Reconectar` (segue de onde parou) ou `Voltar ao contexto` → T02
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T04 · `tela.md`** (par 3) — a T04/01 desenha a faixa sem sessão, *Sem sessão de configuração* — toda referência tem faixa
  - a sua: | **Chrome** | tira de contexto (unidade) + faixa de sessão quando há sessão |
  - a nossa: | **Chrome** | tira de contexto (unidade) + faixa de sessão · sem sessão, a faixa diz só o fato (01) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T05 · `estados.md`** (par 6) — a contagem: o seu `textos.md` e a referência 00 dizem *5 encontrados* — o do herói e *OUTROS QUATRO POR PERTO*; se o *quatro* é dos outros, as duas dizem o mesmo
  - a sua: | `00-tela` | tela | a entrada da tela | quatro módulos por perto · M2C-0417 é o do herói |
  - a nossa: | `00-tela` | tela | a entrada da tela | cinco módulos por perto (`situacao.porPerto`: o do herói e outros quatro) · M2C-0417 é o do herói |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T05 · `tela.md`** (par 13) — a contagem, como a linha 00 do `estados.md`: a 00 diz *5 encontrados*
  - a sua: | **Semente no protótipo** | quatro módulos por perto · M2C-0417 é o do herói |
  - a nossa: | **Semente no protótipo** | cinco módulos por perto (`situacao.porPerto` do mock: o do herói e outros quatro) · M2C-0417, o do herói, vem escolhido |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T05 · `tela.md`** (par 14) — a R-14 e a decisão do diretor de 24/09 — o toque só marca, e é o primário que conecta
  - a sua: tocar num módulo → escolhido → `Conectar ao M2C-0417`
  - a nossa: tocar num módulo da lista **só o marca** (o quadrado lima surge no poço) e acende `Conectar ao M2C-0417`, com o serial do marcado; tocar em outro troca a marca · é o primário que conecta (R-14, decisão do diretor, 24/09) · o não cadastrado não se toca · na 00, o ESCOLHIDO é a marca: tocar num dos outros por perto troca o escolhido no lugar, e o primário passa a dizer o serial dele — também não conecta
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T06 · `tela.md`** (par 17) — a decisão do diretor de 24/09 (a T06·1 em b, a R-14) — o toque só marca, e o `Usar este ativo` leva à confirmação
  - a sua: tocar num ônibus → confirmar o veículo
  - a nossa: tocar num ônibus → ele fica **marcado** (o quadrado lima no poço) e o `Usar este ativo` acende; o `Usar este ativo` → confirmar o veículo. Tocar em outro ônibus troca a marca (decisão do diretor, 24/09: a T06·1 passa pra (b), o T06-N3). A lista com um ônibus marcado não tem referência: monta-se com as peças que existem (G25)
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T09 · `tela.md`** (par 24) — nenhum dos cinco HTML da T09 tem *Calibrar* — a 04 desenha `Voltar ao menu` (C9 · T09-A3)
  - a sua: cadeia concluída: `Calibrar` → T10
  - a nossa: cadeia concluída: `Voltar ao menu` → T04, de onde a Calibração segue. A 04 não desenha um `Calibrar`, e texto novo não entra (C9 · T09-A3, G1, G25)
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T11 · `animacao.md`** (par 30) — o `movimento.md` diz, em *Reduzir movimento*, que os processos continuam no mesmo ritmo e a prova nasce em ordem; a sua diz *aparecem juntas*
  - a sua: | linhas de conferência | a leitura corre | acendem em ordem, 400ms cada | 150ms | desacelera | aparecem juntas |
  - a nossa: | linhas de conferência | a leitura corre | acendem em ordem, 400ms cada | 150ms | desacelera | acendem em ordem, no mesmo ritmo, sem o esmaecer (movimento.md · G26) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T11 · `tela.md`** (par 31) — as linhas 15 e 16 do mesmo `tela.md`, o seu `textos.md` e a decisão 40 dizem `Reenviar os 5 blocos`; nenhum HTML nem o `textos.md` tem *Regravar*
  - a sua: `Regravar os cinco blocos` → T09
  - a nossa: `Corrigir as N divergências` e `Reenviar os 5 blocos` → T09 (a última entrega; antes, `Regravar os cinco blocos`)
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T11 · `tela.md`** (par 32) — a decisão 40 e o seu `textos.md` dizem `Apenas registrar o diagnóstico`; nenhum HTML nem o `textos.md` tem *Só registrar*
  - a sua: `Só registrar o diagnóstico` → registra e volta ao menu
  - a nossa: `Apenas registrar o diagnóstico` (antes, `Só registrar o diagnóstico`) → registra o diagnóstico na sessão e volta ao menu; nenhum item entra na fila, porque o mock não tem onde (C11 · G25)
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T13 · `animacao.md`** (par 36) — pela T13·3, o veredito vem do toque em `Finalizar instalação`, com o que bloqueia resolvido — a sua diz que vem quando o último item passa
  - a sua: | veredito | o último item passa | o placar completa e o veredito aparece | 150ms | esmaece | aparece |
  - a nossa: | veredito | o toque em `Finalizar instalação`, com o que bloqueia resolvido (T13·3) | o placar completa e o veredito aparece | 150ms | esmaece | aparece |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T13 · `estados.md`** (par 37) — o caso: a 09 desenha a bateria de 10,9 V (a sua resposta de 26/09), que é o `can-estatico-isolado`; o `can-fora-esperado` é a velocidade 0 km/h, sinal dinâmico, que o mock reserva à T14 (`mocks.js`:724) · o seu `casos.md` também liga o `can-fora-esperado` à T13/09
  - a sua: | `09-estado-item-reprovado` | estado | um item automático reprova | `can-fora-esperado` |
  - a nossa: | `09-estado-item-reprovado` | estado | um item automático reprova — a bateria abaixo do mínimo, na CAN | `can-estatico-isolado` (C10, T13-A1) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T13 · `estados.md`** (par 39) — pela T13·3, como o veredito da `animacao.md`, o homologado vem do toque em `Finalizar instalação`, e não de tudo passar
  - a sua: | `11-momento-homologado` | momento | tudo passa | `checklist` |
  - a nossa: | `11-momento-homologado` | momento | tocar em `Finalizar instalação`, com o que bloqueia resolvido (T13·3) | `checklist` |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T14 · `estados.md`** (par 40) — qual é a entrada: pela G27 (C10), a T14 entra no 01, com a fila drenando, e o 00 é 6 s depois do disparo — a sua diz que o 00 é a entrada
  - a sua: | `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
  - a nossa: | `00-tela` | tela | 6 s depois do disparo: o prazo em 1:36, o instante antes de o evento chegar (C10 · G27: a entrada é a `01`) | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T14 · `estados.md`** (par 41) — o par da linha 00: a nossa diz que o 01 é a entrada da tela
  - a sua: | `01-momento-antes-do-disparo` | momento | a fila do módulo ainda drenando | `ciclo.mensagensGuardadas` |
  - a nossa: | `01-momento-antes-do-disparo` | momento | a entrada da tela: a fila do módulo ainda drenando (G27) | `ciclo.mensagensGuardadas` |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T15 · `tela.md`** (par 50) — como o chrome da T04: a T15/03 e a 04 desenham a faixa *Sem sessão de configuração*
  - a sua: | **Chrome** | sem faixa ou com, conforme a sessão |
  - a nossa: | **Chrome** | a faixa da sessão aberta ou a faixa sem sessão, conforme a sessão — toda referência tem faixa (T15-A16) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T16 · `estados.md`** (par 53) — o caso: o 01 é o passo do corte, pedido porque o driver vl08 não reinicia por comando (T16·1) — a sua diz `autotesteEncerramento`, que é a lista que a 02 desenha; com a 02 dizendo `autotesteAssertivas`, parece a coluna do caso deslocada uma linha
  - a sua: | `01-momento-pede-o-corte-de-alimentacao` | momento | o passo do corte | `autotesteEncerramento` |
  - a nossa: | `01-momento-pede-o-corte-de-alimentacao` | momento | o passo do corte, na sessão do KNB-5H39 · M2C-0371, pelo endereço (T16·1) | `modelos · vl08 · reinicioPorComando: false` |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T16 · `estados.md`** (par 54) — a 02 desenha as 8 assertivas do `autotesteEncerramento`; o `autotesteAssertivas` é a lista da bancada (o mock mantém as duas)
  - a sua: | `02-momento-sessao-encerrada` | momento | o autoteste passa | `autotesteAssertivas` |
  - a nossa: | `02-momento-sessao-encerrada` | momento | o autoteste passa | `autotesteEncerramento` |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T16 · `tela.md`** (par 55) — em parte: pela T16·1, o corte só é pedido quando o driver não reinicia por comando — no herói, o passo corre sem pedir o corte
  - a sua: no passo do corte: o técnico desliga e religa a alimentação
  - a nossa: no passo do corte, só quando o driver não reinicia por comando (T16·1): o técnico desliga e religa a alimentação; no protótipo, o módulo volta sozinho no ritmo do passo
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo

**Uma linha sua que saiu do pacote** (1)

- **T10 · `tela.md`** (par 27) — a sua linha *passo seguinte: o horímetro, ou a rotação e a velocidade no caminhão coletor* saiu do `tela.md` desta entrega, e a nossa emenda dela ficou numa nota — confirme se saiu de propósito
  - a sua: passo seguinte: o horímetro, ou a rotação e a velocidade no caminhão coletor
  - a nossa: passo seguinte: o horímetro, ou a rotação e a velocidade no caminhão coletor. As grandezas e a ordem são as do cadastro do modelo do ativo, menos as que o módulo não mede (T10·1); o `Depois:` mostra só a próxima (T10·2)
  - ficou: a sua saiu do pacote; a nossa emenda ficou numa sub-nota, na lista de toques

**Onde a nossa só diz mais** — a sua vale; confira se a nossa pode subir pro seu documento (35)

- **T04 · `animacao.md`** (par 2) — a nossa diz também que as folhas abrem no cartão do módulo ou do ativo, com a sessão aberta
  - a sua: | folhas | tocar na unidade ou nas iniciais | o painel sobe de baixo e o véu esmaece; fechar desce | 200ms · fecha em 150ms | desacelera | aparece |
  - a nossa: | folhas | tocar na unidade ou nas iniciais · com a sessão aberta, no cartão do módulo ou do ativo | o painel sobe de baixo e o véu esmaece; fechar desce | 200ms · fecha em 150ms | desacelera | aparece |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T04 · `tela.md`** (par 4) — a nossa dá os momentos (10, 11) e o HU-T16-2
  - a sua: com a sessão aberta, o cartão do módulo → folha Módulo conectado · o do ativo → folha Ativo da sessão · os dois ficam travados: a folha diz isso e oferece `Encerrar a sessão`
  - a nossa: com a sessão aberta, o cartão do módulo → folha Módulo conectado (10) · o do ativo → folha Ativo da sessão (11) · os dois ficam travados (HU-T16-2): a folha diz isso e oferece `Encerrar a sessão`, que leva ao mesmo destino do `ENCERRAR` da faixa. Com o módulo sem ativo (02), o cartão do módulo já abre a folha dele. Substitui a T04·7 do C0, em que os dois cartões não se tocavam
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T04 · `tela.md`** (par 5) — a nossa diz que o leitor de tela ouve desabilitado
  - a sua: cartão de ferramenta em espera é desabilitado de verdade: o toque não faz nada, e o motivo já está escrito nele
  - a nossa: cartão de ferramenta em espera é desabilitado de verdade: o toque não faz nada, o motivo já está escrito nele, e pro leitor de tela ele é desabilitado (`logica.md` · Os cartões em espera)
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T05 · `estados.md`** (par 7) — a nossa diz que o 02 só abre pelo endereço, e a fonte da lista (`situacao.porPerto`)
  - a sua: | `02-momento-um-encontrado` | momento | só um módulo por perto | `modulos` |
  - a nossa: | `02-momento-um-encontrado` | momento | só um módulo por perto · no protótipo, só pelo endereço | `situacao.porPerto` (só o do herói) · `modulos` |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T05 · `estados.md`** (par 8) — a nossa dá a duração da busca (AC-18)
  - a sua: | `03-estado-nenhum-encontrado` | estado | nenhum módulo responde | `busca-vazia` |
  - a nossa: | `03-estado-nenhum-encontrado` | estado | nenhum módulo responde | `busca-vazia` (com a duração, AC-18) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T05 · `estados.md`** (par 9) — a nossa dá o quadro de 62% (`.atualizacao`)
  - a sua: | `10-momento-atualizando-o-firmware` | momento | `Atualizar firmware` | `firmware-fora-matriz` |
  - a nossa: | `10-momento-atualizando-o-firmware` | momento | `Atualizar firmware` | `firmware-fora-matriz` (`.atualizacao`, o quadro de 62%) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T05 · `estados.md`** (par 10) — a nossa soma o `modulo-com-pendencias`, as mensagens da tira
  - a sua: | `13-estado-pre-checagem-canal-aberto-e-pendencias` | estado | o módulo tem canal de sessão anterior — o app fecha antes de começar | `canal-aberto` |
  - a nossa: | `13-estado-pre-checagem-canal-aberto-e-pendencias` | estado | o módulo tem canal de sessão anterior — o app fecha antes de começar | `canal-aberto` + `modulo-com-pendencias` (as mensagens da tira) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T05 · `estados.md`** (par 11) — a nossa dá a fonte da lista, `situacao.porPerto` (C6)
  - a sua: | `01-momento-nenhum-escolhido` | momento | a busca achou, nada tocado ainda | `modulos` |
  - a nossa: | `01-momento-nenhum-escolhido` | momento | a busca achou, nada tocado ainda | `situacao.porPerto` · `modulos` |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T05 · `estados.md`** (par 12) — a nossa dá o caso que existe no mock, `firmware-fora-sem-rede` (mocks.js:713, AC-20, C7); o *modem sem rede* dele não é um caso
  - a sua: | `09-estado-firmware-fora-sem-rede-no-modulo` | estado | firmware fora e o módulo sem rede | `firmware-fora-matriz + modem sem rede` |
  - a nossa: | `09-estado-firmware-fora-sem-rede-no-modulo` | estado | firmware fora e o módulo sem rede | `firmware-fora-matriz` + `firmware-fora-sem-rede` (o modem sem rede, AC-20) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T05 · `tela.md`** (par 15) — a nossa dá as duas saídas (`Selecionar ativo` → T06, `Voltar ao menu` → T04)
  - a sua: pré-checagem aprovada → a faixa de sessão desce → T06
  - a nossa: pré-checagem aprovada → a sessão nasce, com o meio em que a busca achou o módulo, e a faixa de sessão desce → `Selecionar ativo` (T06) · `Voltar ao menu` (T04)
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T05 · `tela.md`** (par 16) — a nossa dá cada ação e aonde ela leva, em sub-itens
  - a sua: numa falha: a ação do aviso (`Procurar outro módulo`, `Atualizar firmware`, `Reconectar`...)
  - a nossa: numa falha: a ação do aviso (C7)
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T06 · `tela.md`** (par 18) — a nossa diz o que o toque grava (o vínculo anotado)
  - a sua: `Usar este ativo` → T07
  - a nossa: `Usar este ativo` → o ativo entra na sessão, com o vínculo anotado (o chassi lido ou a confirmação do técnico, às 14:30), e segue pra T07
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T06 · `tela.md`** (par 19) — a nossa junta as duas saídas e o ENCERRAR
  - a sua: `Escolher outro` → a lista
  - a nossa: `Escolher outro` e `Escolher outro veículo` → a lista, com a busca como estava · `Voltar ao menu` → T04 · `ENCERRAR` → a sessão abortada (T16/03, G23)
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T06 · `tela.md`** (par 20) — a nossa filtra também pelo chassi, sem caixa, acento e hífen, e diz a trava de fora do pacote
  - a sua: a busca filtra por placa, frota ou módulo
  - a nossa: a busca filtra ao digitar por placa, frota, módulo esperado e chassi, sem caixa, sem acento e sem o hífen da placa; a placa de um ônibus de outro pacote abre a trava de fora do pacote; sem resultado, o cartão diz *Nada com “ABC-1234”* e sugere buscar pela frota — o momento `08` (a entrega do design de 25/09, que muda a T06·5)
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T07 · `tela.md`** (par 21) — a nossa dá também o `Voltar ao menu` da 00
  - a sua: `Configurar módulo` → T09
  - a nossa: com tudo aprovado (00): `Configurar módulo` → T09 · `Voltar ao menu` → T04
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T07 · `tela.md`** (par 22) — o `Ler novamente` também no sem leitura (02), corrigido no C8 pelas referências (T07-A13)
  - a sua: no fora da faixa: `Ler novamente`
  - a nossa: com um sinal reprovado (fora da faixa ou sem leitura, 01 e 02): `Ler novamente` relê no lugar (T07·5 a) · `Configurar módulo` → T09
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T08 · `tela.md`** (par 23) — a nossa dá a sessão do herói, M2C-0417 + RKT-8H42
  - a sua: | **Semente no protótipo** | sessão com leitura feita |
  - a nossa: | **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 com a leitura feita |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T09 · `tela.md`** (par 25) — a nossa diz o que é tentar sair e o ENCERRAR apagado na recuperação
  - a sua: tentar sair no meio → a recuperação, até a Conexão gravar
  - a nossa: tentar sair no meio — o `ENCERRAR`, ou o `Voltar ao menu` com a cadeia parada — → a recuperação, até a Conexão gravar; nela, o `ENCERRAR` fica **desabilitado e em tinta apagada**, como o voltar do Android, que ali não faz nada (a lei 17, decisão do diretor de 25/09 — no lugar do aceso que não fazia nada, G23), e `Continuar a gravação` retoma do mesmo bloco. Depois da Conexão, o `ENCERRAR` é o de toda tela com sessão
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T10 · `tela.md`** (par 26) — a nossa cita a lei 17
  - a sua: durante o semear, o ENCERRAR da faixa fica desabilitado e em tinta apagada
  - a nossa: durante o semear, o ENCERRAR da faixa fica desabilitado e em tinta apagada (a lei 17)
  - ficou: a sua exata na lista, a nossa emenda numa sub-nota logo embaixo
- **T10 · `tela.md`** (par 28) — a nossa dá o *Gravando no módulo…* e o *Relendo…* e o semear que não para
  - a sua: `Semear o hodômetro` → grava e relê → semeado · se a releitura passar da tolerância, *não confere* e `Semear de novo` — a foto continua valendo
  - a nossa: `Semear o hodômetro` → grava e relê → semeado · o botão diz *Gravando no módulo…* e depois *Relendo…* (1 s cada, `animacao.md`), e aí o módulo mostra o relido · se a releitura passar da tolerância, *não confere* e `Semear de novo` — a foto continua valendo · semeado o passo, o número não se digita mais
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T10 · `tela.md`** (par 29) — a nossa dá o texto da câmera e a calibração completa (decisão 35)
  - a sua: `Calibrar o horímetro` → o 2 de 2, no mesmo fluxo do hodômetro — o digitado e o fotografado do horímetro são iguais aos do hodômetro, só muda o número → `Fazer o ciclo dinâmico` → T14, com `Voltar ao menu` embaixo
  - a nossa: `Calibrar o horímetro` → o 2 de 2, no mesmo fluxo do hodômetro — o digitado e o fotografado do horímetro são iguais aos do hodômetro, só muda o número; a câmera diz *Enquadre o horímetro do painel* → `Semear o horímetro` → a calibração completa: `Fazer o ciclo dinâmico` → T14, com `Voltar ao menu` embaixo (a entrega de 25/09, decisão 35: o caminho feliz anda em linha — calibra, ciclo, checklist)
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T12 · `estados.md`** (par 33) — a nossa dá a sessão aberta que a 00 desenha (G21)
  - a sua: | `00-tela` | tela | a entrada da tela | unidade Várzea · cinco instalações |
  - a nossa: | `00-tela` | tela | a entrada da tela | unidade Várzea · cinco instalações · sessão M2C-0417 + RKT-8H42 (G21) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T12 · `estados.md`** (par 34) — a nossa soma o `instalacoes-vazia` e diz que é sem sessão (AC-21)
  - a sua: | `02-estado-nenhuma-instalacao` | estado | a unidade não tem instalações | `instalacoes` |
  - a nossa: | `02-estado-nenhuma-instalacao` | estado | a unidade não tem instalações — a consulta volta vazia, e sem sessão | `instalacoes` + `instalacoes-vazia` (AC-21, C11) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T12 · `tela.md`** (par 35) — a nossa dá a sessão aberta que a 00 desenha (G21)
  - a sua: | **Semente no protótipo** | unidade Várzea · cinco instalações |
  - a nossa: | **Semente no protótipo** | unidade Várzea · cinco instalações · sessão M2C-0417 + RKT-8H42 (a 00 desenha a sessão aberta, G21) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T13 · `estados.md`** (par 38) — a nossa dá o caso que monta a 10, `pronto-para-fechar`, e o servidor que não respondeu
  - a sua: | `10-estado-finalizar-com-a-secao-f-falhando` | estado | `Finalizar` com a Seção F falhando | `secaoF` |
  - a nossa: | `10-estado-finalizar-com-a-secao-f-falhando` | estado | `Finalizar` com a Seção F falhando — o servidor não respondeu | `pronto-para-fechar` (C10, T13-A2) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T14 · `tela.md`** (par 42) — a nossa diz que o registro fica no mesmo lugar e tamanho do link, e o que o leitor de tela lê
  - a sua: identificador divergente: `Solicitar correção de cadastro` → o link vira o registro, *Correção solicitada às 14:30*, e deixa de ser tocável
  - a nossa: identificador divergente: `Solicitar correção de cadastro` → o link vira o registro no mesmo lugar e do mesmo tamanho, com o relógio, *Correção solicitada às 14:30* (a hora do protótipo), e deixa de ser tocável — é o momento `06`, do caso `identificador-divergente`. Pro leitor de tela, o registro é um aviso de status, não um botão
  - ficou: a sua exata na lista, a nossa emenda numa sub-nota logo embaixo
- **T14 · `tela.md`** (par 43) — a nossa dá a entrada no quadro 01 e os 3 s da fila (G27)
  - a sua: a fila do módulo drena → `Disparar evento de teste` acende
  - a nossa: a tela entra no quadro `01`: a fila do módulo drenando, o prazo cheio e o disparo indisponível com o motivo (G27). A fila drena em 3 s (`movimento.md`), e o `Disparar evento de teste` acende; esse quadro não tem referência e junta as peças que existem (G25)
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T14 · `tela.md`** (par 44) — a nossa dá o caso e a segunda tentativa que confirma
  - a sua: prazo estourado: `Disparar outro evento` — os passos continuam valendo
  - a nossa: prazo estourado (`evento-sem-resposta`, uma vez por sessão): `Disparar outro evento` — os passos continuam valendo, e a segunda tentativa confirma
  - ficou: a sua exata na lista, a nossa numa sub-nota logo embaixo
- **T15 · `estados.md`** (par 45) — a nossa dá a seleção da semente, f-10, f-02 e f-08 (G21)
  - a sua: | `00-tela` | tela | a entrada da tela | fila com dois itens · um com erro |
  - a nossa: | `00-tela` | tela | a entrada da tela | a seleção f-10, f-02, f-08 da semente (G21): dois itens esperando, um com erro, e uma recebida |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T15 · `estados.md`** (par 46) — a nossa dá o recorte `fila-sem-erro`
  - a sua: | `01-estado-sem-erro` | estado | a fila sem erros | `filaSaida` |
  - a nossa: | `01-estado-sem-erro` | estado | a fila sem erros | `filaSaida` · o recorte `fila-sem-erro`: a fila inteira da Várzea (f-04 subindo, f-01 na fila, f-05, f-06 e f-07 recebidas) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T15 · `estados.md`** (par 47) — a nossa dá o recorte `fila-dois-erros`
  - a sua: | `02-estado-dois-erros` | estado | dois itens recusados | `filaSaida` |
  - a nossa: | `02-estado-dois-erros` | estado | dois itens recusados | `filaSaida` · o recorte `fila-dois-erros`: f-10, f-09, f-02, f-08 |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T15 · `estados.md`** (par 48) — a nossa dá o caso `fila-vazia`, com o 14:02
  - a sua: | `03-estado-fila-vazia` | estado | nada esperando envio | `filaSaida` |
  - a nossa: | `03-estado-fila-vazia` | estado | nada esperando envio | `filaSaida` · o caso `fila-vazia`: nenhum item, o último envio às 14:02, sem sessão |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T15 · `estados.md`** (par 49) — a nossa dá a janela `criteriosRegra.recheckHoras`, sobre a fila vazia do 03
  - a sua: | `04-estado-secao-f-em-re-checagem` | estado | a Seção F esperando o servidor | `secaoF · RVM-1E54` |
  - a nossa: | `04-estado-secao-f-em-re-checagem` | estado | a Seção F esperando o servidor | `secaoF · RVM-1E54`, sobre a fila vazia do `03` · a janela `criteriosRegra.recheckHoras` |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T15 · `tela.md`** (par 51) — a nossa dá a seleção da semente (G21) e a faixa do herói (T15-A2)
  - a sua: | **Semente no protótipo** | fila com dois itens · um com erro |
  - a nossa: | **Semente no protótipo** | a seleção f-10, f-02 e f-08 (G21): dois itens esperando envio, um deles com erro, e uma recebida — a fila inteira da Ibura, com a faixa da sessão do herói (T15-A2) |
  - ficou: a sua na tabela, a nossa numa nota logo depois dela
- **T15 · `tela.md`** (par 52) — o pacote diz o Ressincronizar duas vezes, uma com o efeito e outra com o lugar (no item com erro)
  - a sua: `Ressincronizar e reenviar` → os itens com erro voltam pra fila, e o envio recomeça
  - a nossa: `Ressincronizar e reenviar` no item com erro → os itens com erro voltam pra fila, e o envio recomeça (a entrega do design de 25/09; antes era só o pressionado, G25)
  - ficou: as duas linhas são suas; a nossa é a emenda da segunda, no lugar

### O que a construção e a revisão acharam · as perguntas

Cada uma com o padrão que o protótipo adotou e a alternativa.

**A barra de status**

- **o tamanho dos ícones.** **Padrão:** a geometria de dentro (as cápsulas, os arcos, o corpo e o pininho) fica no SVG, na medida da ficha; o tamanho de cada ícone, o do próprio desenho, e o traço de 2,3 do Wi-Fi são token (`--barra-sinal`, `--barra-sinal-altura`, `--barra-wifi`, `--barra-bateria`, `--barra-icone` e `--barra-wifi-traco`) · os espaços de 5 e 5,5 são margem do Wi-Fi e da bateria, no lugar dos `span` vazios do seu HTML — o mesmo x, medido byte a byte · **alternativa:** os números no SVG, e menos seis tokens
- **os dois tokens sem uso.** **Padrão:** ficam, marcados *sem uso desde a decisão 43*, como os outros 13 sem uso do `tokens.css` · **alternativa:** tirá-los, e o censo fica em 292
- **a T07/03** não tem a barra: não se constrói (T07·1 a), e é a única das 145 em que a barra não bate com o HTML · **pedido de antes:** uma referência nova do 03 pro ma-02

**O palco**

- **o painel aberto empurra o conjunto?** O quadro 04 desenha o celular e a coluna 90 à direita (636 contra 546), e o `MUDANCAS.md` diz *anda junto, como hoje*; o quadro 00 diz *não se mexe quando o painel abre*, e o `palco.md`, *por cima de tudo*. **Padrão:** o painel passa por cima, e o celular e a coluna não se mexem — a régua confere · **alternativa:** o conjunto anda os 90 com o painel aberto
- **o fio de dentro.** **Padrão:** entra, `rgba(255,255,255,0.04)` por dentro do metal, como o `MUDANCAS.md` e os quadros desenham · a linha do celular no `palco.md` só diz o de fora · **pra corrigir na fonte**
- **as cores da moldura** ficam em `rgb()` no `palco-tokens.css`, com o hex no comentário, porque o `checar` reprova hex em `app/src` · **alternativa:** isentar o `palco-tokens.css` dessa regra, e as três em hex, como no `palco.md`
- **o quadro 00** ainda traz, na tabela das medidas, a linha velha do CELULAR (*moldura de 8px, 376 × 816 por fora · raio 34 por fora, 26 por dentro*) e a do ESTADO (*moldura #3A3350*), que a decisão 43 e o espécime O CELULAR da mesma folha desmentem · **pra corrigir na fonte** · o espécime O CELULAR (150 × 321) tem metal 1,5, aro 4 e fio 0,5, que não são o celular em escala (1,2 · 3,9 · 0,4): fica em 1,6%
- **a piscada do app parado.** Com uma moldura só, ela é o único aviso de que o app está parado. **Padrão:** só o toque pisca — abrir, trocar ou fechar um estado e mudar a largura da janela não piscam, e a peça que nasce, nasce quieta · **alternativa:** a peça que nasce depois de um toque já nascer piscando, como fazia até o conserto
- **o quadrado pressionado e com foco** (folha 00). A folha acende o ícone (`#C9C3DA`) e, no pressionado, a borda (`#3A3350`); o palco sobe o fundo pra `--elevado` no pressionado e põe só o anel no foco, com o ícone apagado nos dois — medido nas fotos `app/prints/provas-palco/00-quadrado-*.png`. **Padrão:** o do palco, como está · **alternativa:** o ícone acender, como a folha
- **a linha do painel pressionada** (folha 00). A folha desenha o fundo `--fundo-cartao` (`#1A1726`); o palco usa o `--elevado` (`#1E1A29`), o degrau do pressionado do `movimento.md` — o C0 já tinha apontado o `--fundo-cartao` como pressionado · **Padrão:** o `--elevado`
- **as telas sem coluna** (folha 00). A folha diz *T01, T02 e T08 não mostram coluna*; a T01 tem 8 estados e a T02, 3, e o palco mostra a coluna das duas — o `palco.md` diz que só a tela sem estados fica sem coluna. Só a T08 fica sem · **pra corrigir na fonte**

**A T16, a T06 e a T12**

- **o nome do passo pulado pro leitor de tela.** A referência 03 não dá nome ao traço, e nenhuma legenda da folha 3 o nomeia. **Padrão:** o traço fica mudo, e a situação ao lado diz *pulado* · **alternativa:** o traço com o nome *pulado*
- **a nota do que não rodou.** **Padrão:** reproduz a montagem do seu HTML — a caixa em bloco e a frase em linha —, e o `text-wrap: balance` mora na variante *pulado* da peça, que só a T16/04 usa · **alternativa:** um token de entrelinha pra frase (20,2, número sem nome no design), e uma propriedade *equilibrada* na nota, pra qualquer tela
- **a folga dupla da T06.** **Padrão:** sai só a margem da linha da correção de cadastro (02 e 07); o par que bate (01) e a trava (04 a 06), que também são os últimos antes do rodapé, ficam com os 16, porque as suas referências novas das quatro ainda os desenham · **confira** se os quatro também perdem a margem

**O que a revisão achou, e já está consertado**

- **o passo pulado da T16/03 dizia *não se aplica* pro leitor de tela** — o nome do traço de outro estado. O traço ficou mudo, e a situação ao lado diz *pulado*; o `abortada.mjs` confere (325 passos)
- **o contador da piscada nunca voltava a 0:** depois da primeira piscada, todo estado aberto a partir do fluxo já nascia piscando, sem toque — um aviso falso, agora que a moldura é uma só —, e um toque na janela larga, com a janela estreita e larga de novo, também fazia piscar. Zera agora ao abrir ou fechar um estado e ao mudar a largura; o `pisca.mjs`, novo, prova (62 passos)

**O que o fechamento achou**

- **o *pra ver* contava 8 pares em que a nossa contradiz a sua; são 19.** Dos 30 pares que a junção listou, 11 também contradizem — o chrome da T04 e da T15, a contagem da T05 (duas linhas), o reduzir movimento da T11, o veredito e o homologado da T13, o caso da T13/09, a entrada da T14 (duas linhas) e o caso da T16/01 — e uma é uma linha sua que saiu do pacote (T10). Estão na lista acima, com as duas versões
- **a régua inteira, depois de todos os consertos, aprova** — as 145 referências, os textos, os 127 espécimes, os 19 roteiros, o aceso e o palco (os números estão no `CHANGELOG.md`) · no `tela.mjs todas`, três fotos paralelas saíram pretas (T01/04, T04/06 e T05/04, de 97 a 99%): refeitas sozinhas, deram a base, e o relatório leva a nota
- **as bases novas:** `app/prints/linha-de-base-palco-e-barra.json` (as 145, contra as referências desta entrega) e a do palco, `app/prints/linha-de-base-palco.json`, regravada com a moldura nova

### O censo

| | agora |
|---|---|
| referências | **145** — 16 telas, 62 momentos e 67 estados · 145 HTML e 145 PNG · o palco com 5 quadros · o design system com 8 folhas |
| peças | 119 no design · **131** no protótipo |
| tokens | **294** no `tokens.css` e no `tokens.json` · 96 no seu `tokens.json` · o README e o `CLAUDE.md` com 287, até o diretor |
| fontes | a Barlow do app e a Google Sans só da hora (o recorte de 3,7KB, com a licença OFL ao lado) |
| casos no mock | **55** — os seus 49 e os nossos 6 |
| decisões · leis | 43 · 22 |
| histórias de usuário | 107 |
| o gate do mock | 194 checagens |
| a régua | 145 referências, 44 em 0% do HTML · 127 espécimes · 19 roteiros, 2.610 passos · 83 lugares no aceso · 38 números da moldura |

## A empresa e a unidade (`otimizacao100000000/`), juntada e construída

A entrega entrou inteira — as 120 referências, os 112 trechos e o gate aprovando, com 137 referências, 59 momentos e 62 estados — e foi construída e publicada no `70f97e1`. A medição completa e a revisão vieram junto com a última entrega: nenhuma referência desta piorou (T02/05 e 06 em 0%, T04/13 em 0,32%, T04/14 em 0,75%, e as outras da T01 à T04 na base). As suas respostas de 26/09 estão marcadas em cada item.

### O que a junção achou

- **o *como se chega* da T04/07, 08 e 09 veio como "—"**, no `estados.md` da T04, nas tabelas do `logica.md` e no `indice.json`, que veio também com o caso vazio. Ficou o nosso, com a palavra unidade · **você respondeu (26/09):** foi a troca do termo, que renomeou a chave interna — voltou na última entrega
- **o trecho do `leis.md` acrescentava a lei 17 de novo**, e a nossa já existia, mais longa: ficou a nossa, com a 18 logo depois · **respondido:** fica a nossa
- **vários *depois* repetiam linhas que o nosso já tinha** — os casos do login no `mocks.js`, a T05, a T10, o 04 no `textos.md` da T02, o `casos.md`, a seção da busca e as linhas T01/15 e 16 no `logica.md` —: entraram sem duplicar
- **o trecho 5 do ENCERRAR, no `logica.md`, tinha como *antes* só o começo da nossa linha**, e o resto dela sobraria depois do *depois*: a linha foi conferida à mão e ficou inteira. A última entrega já veio com a linha inteira em cada trecho
- **14 HTML vieram sem o PNG novo** (T04/00, 02, 03, 04, 10, 11 e 12 · T09/00 e 04 · T14/06 · T11/02 · T06/04 e 06 · T12/01) · **respondido:** o desenho delas não tinha mudado, e a última entrega trouxe o PNG de toda referência que mudou
- **o gate não conferia o caso `varias-empresas`**: entraram duas checagens (191 → 193) · **respondido:** a nossa checagem continua valendo
- **a ferramenta:** `app/scripts/entrega.mjs trechos <pasta>/MUDANCAS.md [--aplica]` aplica cada trecho no nosso arquivo, mantendo as nossas anotações, e separa o que já estava (JA), o que é nosso e diz outra coisa (CONFERIR) e o que não bate (FALHOU), pra juntar à mão

### O que a construção achou

- **as outras duas empresas** (T02/05): a Transportes Capibaribe e a Expresso Caruaruense trazem só a contagem. Escolhida uma delas, o `Ver as unidades` espera, apagado · **respondido (26/09):** só a do herói anda, como o protótipo propôs
- **trocar de empresa com o módulo conectado**: *Trocar de empresa*, *…é encerrada antes da troca, sem homologar.* e *Encerrar a sessão e trocar* · **respondido:** os textos valem; depois dos 4 passos, a T02/07 — construído
- **o *Ver as unidades* sem quadro** · **respondido:** o quadro é a T02/07, nova — construída, e o mundo do caso anda a partir dela, até o menu e de volta
- **o *Encerrar sem homologar?* fora do menu**: sobre a própria tela, e o *Continuar a instalação* deixa o técnico nela · **respondido:** isso; o das folhas do módulo e do ativo, sobre o menu, como o protótipo fez
- **o *Trocar de empresa* da T02/06**: o protótipo voltava à T02/05 sem nada escolhido, como a referência · **respondido, e mudou:** volta com a atual marcada, a T02/07 — construído, também o do menu, com e sem sessão
- **o voltar do Android na T02**: no 06, o mesmo que o *Trocar de empresa*; no 05, nada · **respondido:** o que o protótipo propôs · a T02/07 faz o mesmo que o 05
- **a T02/05, a 06 e a T04/14 são estados**, e o palco congela todo estado: o toque só se provava no node · **resolvido pela T02/07**, que é um momento: o quadro da 14 agora se alcança por toque, vindo dela
- **a unidade escolhida de quem tem mais de uma empresa** (T02/06): nenhuma referência desenha. **Padrão:** o rodapé mantém o `Trocar de empresa`, e o primário diz `Sincronizar` com o nome da unidade, como no 01 · **alternativa:** o rodapé de uma ação do 01 · sem resposta
- **o singular *1 unidade*** não existe no `textos.md` nem no mock. **Padrão:** não foi escrito; nenhum caso chega nele · sem resposta
- **o link registrado da T14/06** ficou com o rodapé de antes (14 em cima, o vão de 6 e os 48), porque o registro é um `span` e a troca da decisão 38 pegou só os links. No toque do *Solicitar correção de cadastro*, o primário desce 1 e o texto sobe 3 — contra a lei 3. **Padrão:** como a referência · **proposta:** o registro seguir o rodapé com link (13 · 8 · 44 −5), e nada se mexe no toque · sem resposta
- **o link *Trocar de empresa* da folha** (T04/14) tem o desenho de 48 com −4, depois de 6, como a referência, e não o de 44 da decisão 38: o toque fica a 14 do cartão das unidades. **Padrão:** como a referência · **alternativa:** o desenho do rodapé com link · sem resposta
- **o ENCERRAR de 44**: a decisão 38 fala do desenho, e a lei do toque de 48 manda crescer pro lado livre. **Padrão:** o toque cresce só pra baixo, dentro da faixa, a 8 da conta no menu; no menu com falha, a caixa desce 1 e fica no lugar da faixa sem falha · sem resposta
- **a tabela do design no `componentes.md` e a folha 2** dizem *link com 48 de toque* e *a 12px do botão*; medido, o link tem o desenho de 44 com o toque de 48, e a legenda fica a 14. Está anotado na seção do protótipo · pra corrigir na fonte
- **o que corre embaixo do diálogo** (a conferência da T11, o ciclo da T14). **Padrão:** continua correndo, porque o técnico ainda não decidiu nada · **alternativa:** pausar enquanto o diálogo está aberto · sem resposta
- **o nome da tira de contexto pro leitor de tela.** **Padrão:** *Trocar de unidade — Garagem Várzea*, no molde de *Conta — Rafael Vieira* · **alternativa:** só *Trocar de unidade*, ou o nome visível *GARAGEM VÁRZEA* · sem resposta
- **a senha nova do mock** (T01/08): a nossa troca de termo tinha levado *Garagem!Ibura27* a *Unidade!Ibura27*. Voltou, porque *Garagem Ibura* é nome, e a lei 18 guarda o nome · a T01/08 voltou a 0,02%, a base
- **o *sem confirmação* da decisão 26**: a T16 e o `fluxos.md` ainda dizem *a sessão abortada, sem confirmação*. Ganharam a anotação da decisão 36 embaixo, sem apagar · **proposta:** marcar a 26 como substituída pela 36. A 15 e a 29 também dizem *linha de garagem* e *folha de garagem*

## A última entrega (`otimizacao200000000/`), juntada e construída

Obrigado pelo formato por seção, com a linha inteira em cada trecho: entrou limpo pelo script de junção — as 27 referências com o PNG de todas, as folhas 2, 4, 6 e 7, as decisões 39 a 42 e as 18 seções do `MUDANCAS.md`, cada linha aplicada uma vez só. Está construída, medida e revisada: 145 referências, 44 em 0% contra o HTML, nenhuma regressão, e todas as suas respostas de 26/09 estão no código.

### O que a junção achou

- **o caso `fila-vazia`** tem o mesmo nome de um dos nossos sete. O nosso virou extensão do seu: a fila vazia e a sessão, por cima do seu `ultimoEnvioAs: "14:02"`. Agora são **6 nossos e 55 casos no total**
- **os três campos das unidades da lista longa saíram**, como você mandou, e duas checagens do gate liam esses campos: as duas passaram a ler do pacote de cada unidade, e entrou uma terceira, *toda unidade do caso tem um pacote, com ativos, modelos e cartões*. O gate foi de 193 a **194** · **confira**
- **o *Procurando…*** que o `animacao.md` da T05 põe na tela não está em referência nem em `textos.md` nenhum. O protótipo mantém o quadro da T05/00 por 1,2 s, sem texto novo. **Pergunta:** na própria T05/00, o técnico não vê nada mudar por 1,2 s, até a lista voltar sem escolha. Manda o texto e o quadro do *Procurando…*, ou fica o quadro da 00?
- **a faixa, conferida nos HTML** (a sua resposta: *todas as 145 estão com 52px e a linha*): as 145 têm 91 faixas, e 83 delas têm 52 com a linha — uma com a linha vermelha de 2, a T04/03. **Fora disso:** a T04/01, o menu sem sessão, ainda tem 50 e nenhuma linha embaixo (o protótipo desenha 52 com a linha, G13); e as 7 sem sessão fora do menu (T12/02, T15/03 e 04, T16/02, 04, 05 e 06) têm 52 sem a linha, que é o que o protótipo faz. **Pra decidir:** a T04/01 com os 52 e a linha, e as sem sessão com ou sem ela

### O que a construção e a revisão acharam · as perguntas

Cada uma com o padrão que o protótipo adotou e a alternativa.

**As peças e as leis**

- **o *sem sinal* dos doze glifos leva o fio escuro?** O protótipo usava o `WifiOff` do Lucide, a versão *-off* que a lei 21 proíbe. **Padrão:** o Wi-Fi riscado do login, com o fio escuro, a lei 21 inteira. As referências dele (T03/01, T05/14, T09/02 e 03, T12/03, folhas 3 e 4) desenham o risco sem o fio · **alternativa:** o risco sem o fio, como elas desenham hoje. Nos dois casos, a versão *-off* não volta
- **quanto a folha anda antes de fechar no arraste?** A lei 20 não dá o número. **Padrão:** 8 de folga antes de o toque virar arraste e 56 de limite pra fechar, só pela posição, nunca pela velocidade (mesma entrada, mesma saída), arrastando de qualquer ponto da folha · **alternativa:** o limite como fração da altura da folha, ou arrastar só pelo puxador
- **o diálogo de confirmação fecha no toque do véu?** **Padrão:** não — a lei 20 fala de folha, e a confirmação fecha no `Cancelar` e no voltar · **alternativa:** o véu faz o mesmo que o `Cancelar`, como o diálogo do Material
- **a folha *Outras ações* ganha o puxador?** A T11/03 é a única das dez folhas das referências sem ele. **Padrão:** sem, como ela desenha; o painel arrasta igual · **alternativa:** com o puxador, como as outras nove e a folha 2
- **as variantes novas entram nas folhas?** A caixa do não conforme desmarcada, as linhas do recebimento, a linha de opção com o efeito, a folha *Outras ações* e os riscados não estão desenhados em nenhuma folha. **Padrão:** ficam fora da bancada, medidas contra o recorte da referência de tela (de 0 a 0,23%) · **alternativa:** as folhas 2, 3, 4 e 6 ganham os espécimes
- **as variantes que ficaram sem uso saem?** O valor que quebra da assertiva, o corpo *pulado* da nota e a folga 6 do subtítulo não aparecem mais em tela nenhuma desde a T12 e a T16 desta entrega. **Padrão:** ficam nas peças, marcadas *sem uso nas telas* · **alternativa:** tirá-las
- **pra corrigir na fonte, sem pergunta:** a legenda da tira na folha 2 ainda diz *a garagem e a conta*; a folha 4 rotula *linha de garagem*, *linha de garagem · a atual* e *a lista de garagens*; e a seção de peças do design em 10 `tela.md` (T01, T02, T03, T04, T05, T06, T11, T12, T15 e T16) também. Pela sua resposta, vale a nossa lista, que já diz unidade

**T01 · o teto e outro usuário**

- **a que horas o teto libera, no fluxo?** O relógio está parado em 14:30, e o fluxo não sabe a hora do primeiro envio da hora. **Padrão:** o *15:12* do caso `teto-de-envios` vale também no fluxo, e o *3* é o `limites.tetoPorHora` · **alternativa:** a linha sem a hora, *Os 3 envios desta hora acabaram*, que pede um texto novo
- **pedir o código no teto faz o quê?** **Padrão:** nada é enviado: volta o código que já foi, que segue valendo, com o prazo de onde estava e *Mandamos para* o contato a que ele foi · **alternativa:** o `Enviar o código` apagado no canal, com o teto escrito na legenda — um texto que não cabe ao lado do *Vale por 10 minutos*
- **o código expirado e as tentativas esgotadas, no teto?** Nenhuma referência desenha os dois. **Padrão:** a mesma linha do teto, com o `Enviar outro código` apagado · **alternativa:** a linha vazia, como antes
- **a folha do *Não recebi* no teto?** **Padrão:** não muda — a contagem para em 0:00 e as saídas não liberam · **alternativa:** o texto do teto no lugar da contagem
- **a segunda linha da folha do e-mail.** Você respondeu que ela troca pro celular, mas o título dela não está em `textos.md` nenhum. **Padrão:** o cartão fica só com o *Conferir e reenviar* · **preciso de:** o título, o par do *Mandar para o e-mail*
- **o login confere o usuário?** O mock conhece só dois técnicos. **Padrão:** entra com qualquer senha de 8 ou mais, como o `tela.md` manda; o m.souza vira *Marcos Souza*, e outro identificador entra com o nome do herói · **alternativa:** recusar o usuário que o mock não conhece, com a mesma mensagem da T01/01
- **quem é a sessão anterior, na T01/18?** **Padrão:** a do último Entrar neste aparelho, desde o começo do palco; o palco começa sem nenhuma, e o primeiro Entrar nunca abre o diálogo · **alternativa:** o palco começar com a sessão do r.vieira, e o m.souza já ver o diálogo no primeiro Entrar

**T02, T03 e T04 · a empresa e o menu**

- **o nome da empresa escolhida sobe de tinta?** **Padrão:** sim, pra `--tinta`, como a peça faz em toda escolha (a T02/01 e a folha 3); a T02/07 o desenha em `--tinta-forte` e sobram 0,17% · **alternativa:** a peça ganha uma variante que não sobe, e a 07 vai a 0%
- **a URL no mundo das empresas.** **Padrão:** o 07 nas empresas, nada nas unidades sem escolha (o 06 é estado) e o 01 com a unidade escolhida; o mundo mora no estado único, do *Sincronizar* até sair da conta · **alternativa:** a escolha fora da URL, como na lista longa, ou o índice ganhar um momento das unidades com o *Trocar de empresa*
- **a estimativa por item da lista longa.** Os modelos e os cartões agora vêm do pacote do caso, e o *faltam ~N s* ainda não. **Padrão:** os 6 s saem dos três pacotes do herói, que os declaram iguais · **alternativa:** o caso declarar o `segPorItem` nos seis pacotes
- **a folha de trocar de unidade, numa unidade da lista longa**, lista as três do herói, sem nenhuma atual: nenhuma referência desenha a folha com as nove, que passaria da altura da tela. **Padrão:** como está · **alternativa:** a folha da lista longa, com busca, desenhada
- **o h1 *Menu*** existe em toda tela do menu, como você respondeu, mas não está no HTML nem no `textos.md` das seis folhas (T04/05, 07, 08, 10, 11 e 14): a régua dos textos acusa a sobra · **preciso de:** o *Menu* nas seis
- **o que conta o cartão *Fila de saída* do menu, agora que a fila é do aparelho?** O `logica.md` diz *os pendentes da unidade ativa* (2 na Várzea, como as referências da T04). **Padrão:** como está, 2 · **alternativa:** (a) os pendentes da fila do mock inteira, 6; (b) os pendentes da mesma fila que a T15 mostra, que também dá 2

**T05 · a pré-checagem**

- **a linha do ENCERRAR apagado na pré-checagem**, que você disse que foi escrita errada, ficou no `tela.md` da T05 com a anotação embaixo · **pra tirar na fonte**

**T11 · a conferência**

- **o `Corrigir` corrige só o que diverge?** A T09 não tem desenho de uma cadeia só dos divergentes. **Padrão:** o `Corrigir` e o `Reenviar` levam à mesma cadeia da T09, que regrava os seis, e depois a conferência confere · **alternativa:** a T09 ganha a cadeia parcial — os divergentes e o que eles arrastam, na ordem —, com referência
- **o *Apenas registrar o diagnóstico* sobe como?** O efeito diz *só o diagnóstico sobe*. **Padrão:** grava na etapa da conferência e volta ao menu, sem item na fila · **alternativa:** um item *Diagnóstico* na fila, que o mock já tem como tipo, e o contador do menu sobe 1
- **o voltar na 00 e na 04.** **Padrão:** não faz nada — o link do rodapé é o `Outras ações`, que não sai da tela · **alternativa:** faz o *Apenas registrar o diagnóstico*, a saída que era do rodapé
- **o que fica atrás do véu da T11/03?** **Padrão:** a conferência da 00, e a referência desenha o véu sobre o vazio (2,14%, como a T13/10) · **alternativa:** a 03 redesenhada com a 00 atrás
- **a faixa com a folha aberta.** **Padrão:** acesa e desabilitada, como a T04/10: o ENCERRAR não responde · **alternativa:** o ENCERRAR responde, e o diálogo abre por cima da folha
- **a linha *Ativo*:** a 02 diz *urbano v3*, sem *tradução*, e as outras dizem *tradução frota v2*, a frase do caso. **Pra decidir:** a 02 volta a *tradução urbano v3*, ou o caso perde o *tradução*
- **o singular do *Corrigir*:** com uma divergência, seria *Corrigir as 1 divergências*. Nenhum caso chega nele · **preciso de:** o texto, se algum dia houver o caso
- **o caso da T11/02:** a tabela do `estados.md` e o `casos.md` ainda ligam a 02 ao *diff-divergente, invertido*, e a referência nova é o par do herói, o caso `conferencia-confere` · **pra trocar na fonte**

**T12 · o que o servidor recebeu**

- **a instalação sem `recebimento`** — as outras doze do mock, abertas pela lista. **Padrão:** a seção aparece com o veredito da regra dos três critérios do mock e sem o porquê, que o mock não tem; *ausente*, *fora do parâmetro* e *incompleta* levam o xis vermelho, que nenhuma referência desenha · **alternativa:** (a) sem `recebimento`, a seção não aparece; (b) o mock dá `recebimento` às treze
- **o status geral.** **Padrão:** *aguardando validação* com um critério indisponível ou pendente; senão, o estado da instalação · **alternativa:** o critério reprovado também mandar no status, que o design não diz
- **a linha *Recebimento* do resumo saiu** de toda instalação, porque o status e a seção de cima dizem o mesmo · **alternativa:** mantê-la nas que não têm `recebimento`
- ***1 viagem fechada*:** o *1* está no texto, porque o mock dá os km e não a contagem · **alternativa:** o mock ganha `viagens.fechadas`
- **quem instalou.** Antes, com o m.souza no aparelho, o detalhe da i-01 dizia *Marcos Souza*. **Padrão:** o autor sai do dado, o herói do mock, *Rafael Vieira*, com qualquer usuário no aparelho · **alternativa:** o mock ganha quem instalou em cada instalação, com a checagem no gate
- **a T12/04 e a 05 desenham a PCX-9A17 com as seis etapas e *Rafael Vieira***, e a i-02 do mock só tem o resumo. O protótipo mostra o que o mock sustenta: as três linhas e *M2C-0312 · ontem, 16:05* (1,27% e 1,28%) · **a correção é de dado:** a i-02 ganhar as `etapas`, e as seis e o nome aparecem sem mudar código

**T13 · o não conforme com a foto**

- **sem a câmera, com a caixa marcada?** Nenhuma referência desenha o quadro. **Padrão:** o primário é `Abrir as configurações`, porque a foto do problema precisa da câmera · **alternativa:** a ressalva sem foto, só com o texto — que a decisão 39 descarta
- **desmarcar a caixa descarta a foto do problema?** **Padrão:** não — ela e o que aconteceu ficam guardados enquanto o técnico está no item, e voltam se ele marcar de novo; sair do item ou salvar os descarta · **alternativa:** desmarcar descarta a foto
- **o singular do *Faltam N itens*.** **Padrão:** *Falta 1 item*, com o verbo junto · **alternativa:** com 1, a legenda some, como antes
- **as fotos tiradas da Seção B contam a foto do problema?** **Padrão:** contam — com uma ressalva, o homologado diz *5 fotos tiradas*; por isso *1 foto tirada* não se alcança no fluxo do mock · **alternativa:** contar só as fotos do item
- **a posição do item reprovado** (T13/09): a referência diz *2 de 4*, com o segundo segmento vermelho, e o mock (e a T13/03) põem a Alimentação em primeiro na Seção C. **Padrão:** *1 de 4*, a ordem do mock (0,45%) · **proposta:** a referência com *1 de 4* e o primeiro segmento vermelho
- **o registro do problema entra esmaecendo?** O `animacao.md` diz *150ms*. **Padrão:** entra sem esmaecer, como a foto da T10, até o ciclo do movimento

**T14/05 · o ciclo concluído**

- **o marcador da escala.** A peça o põe no fim do preenchido, em 80%, e a referência nova o deixa em 60%, o lugar dos 0:48 · **proposta:** o marcador da 05 em 80%

**T15 · a fila do aparelho**

- **o que é *a fila do mock inteira*?** **Padrão:** o recorte inteiro de cada quadro — no 01, os cinco, onde a referência mostra o topo (4,83%) —, e no fluxo a seleção da semente mais o que a sessão criou, de qualquer unidade. Os dez de `filaSaida` no fluxo não se constroem sem inventar desenho: dois erros viram o cartão *DUAS COM ERRO*, e nenhuma referência diz onde fica o que sobe junto com eles · **alternativa:** (a) o cartão do topo com a altura da referência, e a lista passando por baixo do rodapé; (b) a 01 redesenhada com o recorte inteiro
- **a T15/02** ainda diz *ontem 10:05* pro f-08, que é de 2 dias e na 00 já diz *10/03, 10:05*, como você respondeu (0,06%) · **pra trocar na fonte**

**T16 · o padrão da T16/02**

- **o *não se aplica* no passo que não roda** vai pelo estado do passo, o círculo com o traço, sem mexer na peça; a folha 5 desenha o *pulado* com o traço solto · **alternativa:** o *pulado* da peça vira o círculo com o traço, e a folha 5 é redesenhada
- **o subtítulo de um jeito só** é o da 06, a 4 do título, a folga padrão da peça · **alternativa:** o da 03, a 6, que desceria a 06 em 2
- **o NÃO RODARAM numa peça só** é a nota tracejada, a do rótulo e da frase de 12 em `--tinta-apagada` · **alternativa:** a nota com rótulo, a frase de 13 em `--tinta-forte`
- **as referências da T16/02 a 05** ficam de 1,93% a 3,68% até serem redesenhadas — quase tudo deslocamento de 2 a 6 px, medido fator por fator

**O palco**

- **os nomes da coluna.** Oito estados novos vieram sem nome na coluna e apareciam como linhas em branco, sem nome pro leitor de tela. **Padrão:** o nome da referência, como proposta — *Teto de envios*, *Outro usuário no aparelho*, *Escolher a empresa*, *Unidades, com trocar de empresa*, *Trocar com mais de uma empresa*, *Versão ilegível*, *Critério indisponível* e *Critério pendente* —, e a régua agora reprova estado sem nome · **alternativa:** os nomes que você der. Se o pacote trouxer o `indice.json`, que traga os `rotulo`, `rotuloOrigem` e `grupo`: sem eles, a coluna fica em branco

### O censo

| | agora |
|---|---|
| referências | **145** — 16 telas, 62 momentos e 67 estados · 145 PNG |
| peças | 119 no design · **131** no protótipo (as 119, as 10 que só o protótipo tem e as duas seções do checklist da folha 4) |
| tokens | **286** no `tokens.css` e no `tokens.json` |
| casos no mock | **55** — os seus 49 e os nossos 6 |
| decisões · leis | 42 · 21 |
| histórias de usuário | 107 |
| o gate do mock | 194 checagens |

## A entrega de 25/09 · a calibração com prova (`atualizacao180/`)

Os 67 arquivos entraram. O gate aprova, e o censo confere: **122 referências no `indice.json`** — 16 telas, 54 momentos e 52 estados. O que mudou em cada arquivo:

- **entraram como vieram** (o nosso era igual à sua cópia anterior): o `02-telas/README.md`, o `textos.md` da T01, o `estados.md` e o `textos.md` da T02, da T04 e da T06, a `animacao.md`, o `textos.md` e o `estados.md` da T10, o `PROMPT-DE-ABERTURA.md`, o `LEIA-PRIMEIRO.md`, o README das decisões e a decisão 33
  - no `estados.md` da T10 ficou, embaixo, a nota do C9 sobre o rótulo da caixa do que não se aplica (T10·5)
- **as 36 referências:** as 14 que substituem (a T01/01, as cinco da T10, as folhas 7 e 8, e o painel do palco) e as 22 novas
- **os `tela.md`, juntados** (a lista de peças é a sua; a medida fica na seção do protótipo):
  - **T01:** entrou o `Entrar` apagado dizendo *Digite a senha*;
  - **T02 e T06:** a busca sem resultado. Na T06, a nossa linha dizia *sem resultado, o cartão fica vazio e sem texto* (a T06·5), e agora diz o seu texto;
  - **T04:** o aviso do acesso e os números (7 momentos, 5 estados). O resto do *O que se toca* é o nosso, que já tinha o seu;
  - **T10:** o fluxo novo da decisão 33 vale. Saíram as linhas do C9 que ele desmente: a foto e o semear independentes (T10·3), o cartão da foto tocável e o horímetro sem referência. Ficaram a ordem das grandezas pelo cadastro (T10·1, T10·2), a volta de onde parou e o voltar;
  - **T15:** o `Ressincronizar e reenviar` passa a fazer o que você escreveu (os itens voltam pra fila e o envio recomeça), no lugar do *só o pressionado* do C11, e entrou a notificação da fila parada;
  - **T16:** as 8 legendas do encerramento, em cima das nossas linhas
- **o `componentes.md`:** a sua tabela inteira, com as 117 peças. Na seção do protótipo saiu a variante *tocável* da foto, que agora é o seu desenho · **127 peças no protótipo** (as suas 117 e as 10 que as folhas desenham e a tabela ainda não lista)
- **o `indice.json`:** as 122, com os campos do palco. Os dois estados novos ganharam o rótulo da coluna, proposto: *Acesso vencendo* e *Releitura não confere*
- **o `mocks.js`:** o caso `releitura-nao-confere` entrou por cima dos nossos 7 acréscimos · **42 casos** (os seus 35 e os 7)
- **o `logica.md`:** entraram as duas seções novas (a calibração com prova, o aviso do acesso), as linhas das referências novas nas duas tabelas, e o caminho do herói com o aviso e a calibração com a prova. Ficaram as nossas seções e o voltar do Android do C11, que é mais completo que o da sua cópia
- **o `palco.md`:** entrou só o grupo do caminho sem a T08. O resto da sua cópia desfazia três decisões do diretor (a coluna centralizada, o painel que não fecha ao escolher, a moldura igual no estado), e fica o nosso
- **os números:** o `CLAUDE.md`, os READMEs, o `ciclos.md` e o `pendencias.md` (a notificação de 30 min) · os tokens continuam **274**

### O que a construção da entrega de 25/09 achou

- **a tolerância do hodômetro:** o comentário do caso `releitura-nao-confere` e o `estados.md` da T10 dizem 120 m; o modelo do mock e a HU-T10-5 dão 140 m (a granularidade mais o decorrido). Os dois dão *não confere* pros 500 m, e a tela é a mesma
- **a folha 8** escreve *tinta apagada* no painel vazio e desenha `--marca-limite`: o código segue o desenho
- **a T06/08** desenha 5 no pacote; o mock da Várzea tem 10
- **o `Entrar` apagado** fica só no erro (a T01/01). Com a senha vazia fora do erro, a 00 desenha ele aceso
- **o singular:** com 1 dia, o título seria *vence em 1 dias*. Falta a forma do singular
- **o login com rede** devia renovar o acesso, e o mock mantém `abertaDiasAtras` 5
- **a câmera do app** é a mesma na T10 e na T13, e o DS não a lista. Proposta: uma peça na folha 7
- **a T16 e o número digitado:** a assertiva dos contadores mostra o painel do mock (482.317 km · 9.640 h), como o `estados.md` dela manda. Com a decisão 33, o número é o que o técnico digita; se ele digitar outro, a T16 diria que voltou um número que não foi semeado. Proposta: a T16 ler o que foi semeado

## A entrega do mundo real (`atualizacao000002/`)

Aplicada depois de a da calibração terminar, sem misturar as duas. Os 28 arquivos entraram. O gate aprova, e o censo confere: **126 referências no `indice.json`** — 16 telas, 54 momentos e 56 estados. A base de cada junção foi a sua cópia anterior, então o que entrou é exatamente o que você mudou agora:

- **entraram como vieram:** o `02-telas/README.md`, o `estados.md` e o `textos.md` da T01, o `textos.md` da T10, o `PROMPT-DE-ABERTURA.md` e o `LEIA-PRIMEIRO.md`
- **as 8 referências novas:** a T01/14, a T05/16 e 17, e a T10/11, em HTML e PNG
- **juntados, sem conflito:** o `tela.md` da T01 (o login sem conexão), o `estados.md` e o `textos.md` da T05, o `estados.md` e o `tela.md` da T10 (a câmera sem permissão), o `casos.md`, o `mocks.js` (os 4 casos novos, por cima dos nossos 7) e o `06-prototipo/CLAUDE.md` (as regras 10, 11 e 12)
- **juntados, com o que o protótipo já tinha:**
  - **o `tela.md` da T05:** entraram as duas linhas do Bluetooth, em cima das nossas. As suas outras 5 linhas eram a versão curta das nossas, que ficam;
  - **o `logica.md`:** entrou a seção *O mundo real* e a linha da T10/11. Ficaram as regras do aviso do acesso que a construção escreveu, e a nossa linha da T10/10, que explica a tolerância de 140 m (a sua diz 120);
  - **os números:** o `ciclos.md` e o README do design system com as 126 · as cores continuam 25, medidas no C1
- **o `indice.json`:** as 126, com os campos do palco. Os 4 estados novos ganharam o rótulo da coluna, proposto: *Login sem conexão*, *Bluetooth desligado*, *Bluetooth sem permissão* e *Câmera sem permissão*
- **os números do protótipo:** 56 estados, 274 tokens, 127 peças e **46 casos** (os seus 39 e os nossos 7)

### O que a construção do mundo real achou

As 4 referências novas dão 0% contra o HTML. O que falta no design pra elas ficarem inteiras:

- **o `indice.json`** trouxe a T05/16 e 17 sem o `grupo`, que a coluna da T05 exige: sem ele, os dois não apareciam no palco. O protótipo pôs os dois no *achar* (é a busca que não começa). Nas próximas entregas, todo estado novo da T05 precisa vir com o grupo
- **T05/17 com o botão virado:** o `Permitir`, negado de novo, vira `Abrir as configurações`, como a regra 12 manda. Nenhuma referência da T05 desenha esse quadro, e o texto não está no `textos.md` da T05 (o protótipo usa o da T10/11). Falta também dizer o que o app mostra na volta das configurações: o protótipo começa a busca
- **a câmera do checklist sem permissão:** falta a frase do que falta pro item (o análogo de *O app precisa da câmera pra fotografar o painel*) e o quadro inteiro da T13 nesse caso. O protótipo mostra só a câmera riscada
- **a localização negada:** nenhuma referência desenha o relatório do checklist (HU-T13-7), nenhum `textos.md` tem o *sem localização*, e o mock não tem a localização do celular nem um caso que a negue (o GPS do mock é o do módulo)
- **o aviso com o traço:** a T01/14 desenha o traço cinza embaixo do aviso neutro, e o `componentes.md` diz que o aviso não tem traço. O protótipo construiu uma variante nomeada
- **as peças sem linha no `componentes.md`:** a câmera do app (a mesma na T10 e na T13, com a variante sem permissão), a câmera riscada e o Bluetooth cortado
- **o `Esqueci a senha` sem internet:** a T01/14 não diz o que ele faz. No protótipo, segue como antes
- **os números:** um token entrou, a largura da explicação da câmera sem permissão (274 → **275**)

## A entrega do checklist numa estrutura só (`atualizacao56565/`)

Aplicada depois da do mundo real, sem misturar. Os 178 arquivos entraram. O gate aprova, e o censo confere: **129 referências no `indice.json`** — 16 telas, 56 momentos e 57 estados. A base de cada junção foi a sua cópia anterior. O que mudou em cada arquivo:

- **entraram como vieram:** o `02-telas/README.md`, o `textos.md` da T04 e da T10, o `PROMPT-DE-ABERTURA.md`, o `LEIA-PRIMEIRO.md`, o README das decisões e as decisões 34 e 35
- **as referências:** 135 substituídas e as 3 novas da T13 (12, 13 e 14), em HTML e PNG
- **os 15 `tela.md`:** a lista de peças é a sua; o *O que se toca* juntou sem perder o do protótipo. Dois pediram mão:
  - **T10:** fica o nosso *Semear* (mais completo, com o *Gravando* e o *Relendo*), e o horímetro termina no seu *Fazer o ciclo dinâmico* → T14 (decisão 35);
  - **T13:** entraram as suas 8 linhas da estrutura nova, e ficou a nossa da câmera sem permissão, que você confirmou. As regras do C10 ganharam um aviso: as que falam do placar, do mapa e dos cartões antigos são reescritas na construção da T13 nova
- **o `estados.md` e a `animacao.md` da T13 e da T11** (sem cópia anterior sua; juntei contra o C0): entraram os seus, e ficaram três correções medidas no C10 e no C11 — os casos certos da T13/09 (`can-estatico-isolado`) e da T13/10 (`pronto-para-fechar`), o homologado que chega pelo toque no *Finalizar*, e o reduzir da conferência da T11 no mesmo ritmo (G26). **Pra olhar:** a sua `animacao.md` da T13 ainda diz *o placar completa*, e o placar saiu
- **as `leis.md`:** entraram a lei 16 (*tem seta, toca*), *a faixa da sessão é uma peça só* e o *poço na linha* sem as exceções da T11 e da T15, e com o aviso fora dela. Ficaram as marcas ◆ e o *toque de 48*
- **o `componentes.md`:** a sua tabela inteira, com as 118 peças. Na seção do protótipo, as 9 linhas das peças que saíram (o placar, o mapa, os cartões de valor e de foto, as seções antigas) foram pra uma subseção, porque o código ainda as usa até a T13 ser refeita · **128 peças no protótipo**
- **o `mocks.js` e o `casos.md`:** o caso `localizacao-negada` · **47 casos** (os seus 40 e os nossos 7)
- **o `logica.md`:** entraram as suas seções *O checklist* e *O próximo passo depois da calibração*, e as linhas novas das tabelas. Ficaram as nossas do mundo real, do teclado, do retrato e da regra 12
- **o `indice.json`:** as 129, com os campos do palco; o estado novo ganhou o rótulo *Homologado sem localização*
- **os números:** o `CLAUDE.md`, o README do design system e o `ciclos.md` · 275 tokens, 25 cores

### O que a construção da T13 achou

A T13 nova está em 0,03 a 0,05% contra o HTML nas 11 referências das seções e do homologado, e o resto é o glifo do Lucide (G5). O que a entrega não desenha, ou desenha de dois jeitos, o protótipo resolveu com as peças dela, e espera o seu desenho:

- **o automático que falta** (no caminho do herói, nada falta em A, C e D): o item de tocar com o ícone da ferramenta da tela que resolve e *a fazer*, e a seta pro `origem` do mock
- **o automático que reprovou** fora do nível do item: o item de tocar com o X no poço, a leitura embaixo e a seta pro 09
- **a foto tirada no checklist:** o item feito só com o nome — nenhum texto diz de onde ela veio (o Painel diz *fotografado na calibração, às 14:30*). **Proposta:** *fotografado às 14:30*
- **quem age com 1:** *você fotografa 1 itens* e *1 fotos tiradas* não existem; o cartão fica sem a linha, como o `Faltam`. **Proposta:** o singular, *você fotografa 1 item* e *1 foto tirada*
- **a F aberta depois de homologar:** *o servidor confirmou* no cartão, e os itens sem desenho; ficam os valores do C10 (`12 subiram`, `31 de 31`, `na fila`). O `na fila` do ID na plataforma não combina com *o servidor confirmou*
- **a F falhando:** o X na seção e nos itens, com o traço no valor; nenhuma referência desenha a F aberta assim
- **a seção aberta no homologado:** sem referência, e a URL fica sem momento
- **o rótulo do nível do item:** a 07 e a 08 dizem *B · INSTALAÇÃO FÍSICA* (o `titulo` do mock) e a 09 diz *C · HARDWARE* (o `rotulo`, e não *SAÚDE DO HARDWARE*). O protótipo segue as duas: o título longo na seção que o técnico faz, o nome curto na que o app confere. **Proposta:** uma regra só
- **a 09** continua com o herói (M2C-0417, RKT-8H42), *2 de 4*, 10,2 V e *1,8 V abaixo do mínimo*; o caso do mock é o QJF-2C61 do `can-estatico-isolado`, com 10,9 V, e a bateria é o primeiro item da C (G9)
- **a 10** desenha o véu sobre a página vazia; no app, atrás do véu fica o checklist do `pronto-para-fechar`, com 28 de 31 (G25, como o menu atrás do véu da T04)
- **a `animacao.md` da T13** ainda tem a linha do placar e *o placar completa* no veredito; o protótipo anima a barra (scaleX, 300 ms) e o veredito esmaece (150 ms) · e a linha da *miniatura da foto* (*surge no lugar do visor*) ficou sem peça: na estrutura nova, o `Tirar foto` segue pro próximo item por fazer, e a foto tirada é o item feito, sem miniatura — nada no protótipo a desenha
- **o `tela.md` da T13:** o elemento-assinatura ainda diz *o placar por seção*, e a lista de peças do design tem 12 que nenhuma referência desenha (faixa · sem ação, processo correndo, diálogo, diálogo sem saída, assertiva da sessão, linha de conferência, encerrando, pede o corte, sem homologar, com contador de falha, linha da fila e linha da re-checagem)
- **o `componentes.md`:** a subseção *Saíram do design* pode sair — o código não usa mais nenhuma daquelas peças; a grade dos cartões, que a T08 usa pros mostradores, virou peça interna (`GradeCartoes`) · mas duas linhas dela, *seção aberta do checklist* e *seção recolhida*, a folha 4 nova ainda desenha, no desenho novo (o cartão de 58 aberto e o fechado), e a tabela da folha 4 não tem as duas: o protótipo as monta com a peça nova (`SecaoDoChecklist`, espécimes `f4-secao-aberta` e `f4-secao-recolhida`), e o `tela.md` da T13 ainda as lista · **pra decidir:** saem da folha 4, ou voltam pra tabela dela
- **os tokens das peças que saíram:** 8 ficaram sem uso no código — `--linha-secao-mapa`, `--linha-secao-mapa-legenda`, `--n-cartao-secao`, `--n-unidade-cartao`, `--barra-cartao`, `--visor-foto`, `--traco-visor` e `--ls-colunas-mapa` — e o `tokens.css` diz isso no papel de cada um (*sem uso desde a entrega do checklist*), como o `--linha-conferencia-fim`; saem na próxima entrega, se você quiser · e o lima da barra do checklist (`rgba(170, 239, 0, 0.55)`, o que as 15 referências e a folha 5 desenham) é uma transparência nova, `--lima-barra-checklist`: o README do design system conta 6, e agora são 7

### O que o fechamento da entrega achou

As três frentes (a T13, a T10 e a T11, e os consertos) fecharam juntas, e a régua inteira aprova: os 13 roteiros; das 133 referências, a única que piorou contra a base do C11 é a T13/10, pelo checklist novo atrás do véu (embaixo); nenhuma peça do palco piorou; e os espécimes só mudaram nas folhas 2, 4, 5 e 7 e nos que a otimização trocou. O que fica pra você:

- **o `componentes.md`, a seção do protótipo:** a subseção *Saíram do design* saiu. As duas linhas que a folha 4 nova ainda desenha, *seção aberta do checklist* e *seção recolhida*, ficam na folha 4 como peça nova no protótipo, com a T13, até você decidir se saem da folha ou voltam pra tabela: **131 peças no protótipo** (as 119 do design, as 10 de antes e essas duas)
- **o poço na linha:** a lei mede 38, 44 e 50. A última linha da fila, de 62 (T15/00 a 02), leva o poço de 30, como as referências desenham · **pra decidir:** acrescentar 62 → 30 à lei
- **a faixa é uma peça só:** a lei diz *52 com a linha de baixo, em toda tela*. A faixa sem sessão fora do menu (T12/02, T15/03 e 04, T16) segue sem a linha de baixo, como as referências dela desenham, e bate em 0% · **pra decidir:** a lei vale pra faixa sem sessão? · e a T04/01, que não mudou, desenha a faixa sem sessão do menu com as duas linhas em cima; o protótipo põe a linha embaixo, como nas outras telas (0,08% dos 0,5%)
- **o semear da calibração** (T10, *Gravando no módulo…* e *Relendo…*): o `Voltar ao menu` e o `ENCERRAR` ficam apagados, pela lei 17, e nenhuma referência desenha esse quadro (o `para-o-arquiteto-alinhamento.md`, item 6)
- **o `mocks.js`:** o comentário do caso `diff-divergente` diz que o `noModulo` *fica declarado, sem leitor*, e a T11/00 agora o lê, no par *no módulo · no cadastro*
- **os tokens sem uso:** além dos 8 do checklist antigo e do `--linha-conferencia-fim`, mais três ficaram sem leitor — `--linha-onibus-fim` (a última linha de ônibus de 78, que saiu), `--miniatura-foto` e `--icone-foto` (a foto da prova usa o poço de 44 e o ícone de 20) — e o `tokens.css` diz isso no papel de cada um · o protótipo tem **280 tokens**
- **a T13/10** continua desenhando a página vazia atrás do véu; no protótipo, atrás dele fica o checklist do `pronto-para-fechar`, com 28 de 31, na estrutura nova (1,74% contra o HTML; era 1,12% com o checklist antigo)

## A otimização (`otimizacao100000000/`), do jeito que pedimos

Obrigado pelo formato: as referências por cima e os textos como trechos. Entrou sem conflito nenhum. O gate aprova, e o censo confere: **133 referências** — 16 telas, 58 momentos e 59 estados —, 119 peças no design (129 no protótipo), e **49 casos no mock** (os seus 42 e os nossos 7).

- **as 11 referências:** as 4 novas (T01/15 e 16, T02/04, T06/09) e as 7 que trocam (T01/00, 01, 10 e 14, T08/01, T09/03 e a folha 6)
- **os trechos:** todos aplicados, mantendo as nossas anotações. Os marcados com ✓ **não estavam escritos** na nossa documentação ainda (as regras estavam decididas, o texto não) — entraram também. O pacote das seis garagens (o trecho 2 do mock) **não estava construído**: entrou agora e é construído com o resto
- **onde o nosso texto já dizia o mesmo**, ficou o nosso: a lei 17 nas leis (com a regra do ENCERRAR), o ENCERRAR na T08 e na T09, e a lista dos processos que não podem parar no `logica.md`
- **o que corrigi no nosso texto:** a T01 dizia que o botão sem o usuário ficava *Entrar* por falta de texto; agora diz *Digite o usuário*
- **pra olhar:** o trecho da T05 diz que o ENCERRAR fica apagado *enquanto a pré-checagem corre*, mas a faixa só desce quando a pré-checagem aprova — é aí que a sessão nasce. Construí a regra na faixa, e ela vale se a faixa aparecer; no caminho do herói, ela ainda não existe ali

### A otimização, construída · o que fica pra você

As três peças que faltavam estão construídas: o *Sincronizar* das seis garagens, o *Procurar de novo* da T05 e o endereço das duas buscas que escondem a escolha. A T02/04 dá **0,01%** contra o HTML (era 2%) e a T06/09, **0,02%** (era 3,38%); nenhuma referência da T02, da T03, da T05 e da T06 piorou. O que sobra nas duas é a lupa do Lucide (G5), como na T02/03 e na T06/08, e, na 09, o *5 no pacote*: o mock tem 10 ônibus na Várzea (G9, como a 00 e a 08). O que fica pra você:

- **o pacote do caso `lista-longa-garagens`** declara os ativos, a idade, a hora e os limiares, e a T03 mostra também os modelos de ativo, os cartões e o *faltam ~N s*, que sai da estimativa do servidor por item. O protótipo lê esses três do que os três pacotes de `pacotes` declaram iguais (3, 3 e 6 s): na Garagem Olinda, 18 itens no total. **Proposta:** o caso declarar os três, ou dizer que valem os da empresa
- **duas fontes pro mesmo fato:** as garagens do caso guardam `pacoteIdadeDias`, `pacoteHora` e `ativos`, que agora repetem o pacote de cada uma (os seis do caso e os três de `pacotes`). A linha da T02 lê o pacote, e os campos das garagens ficam sem leitor no protótipo — os nove batem, medido. O gate confere as três do herói, e não as seis. **Proposta:** tirar os três campos das garagens do caso, ou o gate conferir as seis
- **o mundo das seis garagens vai até o menu:** o mock não tem os ônibus delas (os 12 ativos da Olinda não estão em `ativos`). Sincronizada a Olinda, o menu diz *GARAGEM OLINDA*, e a T06 aberta dali mostra *12 no pacote* — o que o pacote do caso declara — com a lista vazia embaixo. A folha *Trocar de garagem* do menu lista as três garagens do herói, e nenhuma é a atual. **Pra decidir:** o caso ganhar os ônibus, ou o mundo do caso parar no menu
- **o *Procurar de novo* da T05:** construí com a sua resposta, *a busca da T05/00*: o quadro da 00 — os cinco por perto, o M2C-0417 escolhido — fica na tela, com a URL dizendo a 00, e a lista volta sem nada escolhido (a 01). Vale pra toda busca de novo: o *Procurar de novo*, o *Procurar outro módulo* e o Bluetooth que liga. O tempo do quadro não está no `movimento.md` (G4): usei **400 ms**, o menor passo que a tabela dos processos já dá pra alguém acompanhar, e ele entrou lá como proposta; o número é do diretor e seu. Se quiser um quadro da busca correndo, com texto, ele entra no lugar da 00
- **a T06/09 sem a instrução:** a referência não tem a *Escolha o veículo que está na sua frente.* embaixo da busca, e a 08 também não. O protótipo lê como uma regra: **com um termo na busca, a instrução sai**, e embaixo do campo fica o que a busca achou. A busca que acha sem esconder nada não tem referência, e segue a regra · **pra decidir:** é essa a regra, ou a instrução sai só quando a busca esconde o marcado
- **o campo aceso:** na T02/04 e na T06/09 o campo tem o traço lima do campo focado, como na 03 e na 08. O protótipo o deixa aceso enquanto a busca esconde a escolha (e, como antes, enquanto ela não acha nada); fora disso, ele acende só no foco

## O que as referências pedem ao design · medido no C10, no C11 e nas entregas 4 e 5

Nenhuma referência foi mexida: o protótipo mede e propõe, e a correção é na fonte. Cada item diz o que muda e, quando medido, quanto a diferença cai.

- **a faixa da sessão, em toda tela com sessão:** várias referências desenham a faixa sem a linha de baixo da folha 2 (T11, T12 00/01/03, T13 no item reprovado) ou deixam ela encolher quando o conteúdo passa de 800 (T13 D e E, T14 01/04/06). O protótipo trava a faixa em 52, com a linha (G13). **Proposta:** a faixa com a linha e sem encolher em todos os HTML. Medido na T14: a 01 cai de 1,77% pra 0,05%, a 04 de 0,72% pra 0,06% e a 06 de 0,73% pra 0,06%
- **T01:**
  - a 03, a 04 e a 05 desenham 9:41, 0:44 e 9:28, que não saem do mock e não batem entre si. **Proposta:** o quadro da chegada, com 10:00, 60 s e 1:00 (T01·1);
  - a 12 e a 13 desenham o Confirmar aceso com as células vazias; no protótipo ele fica apagado até o sexto dígito (T01·6). É 5,9%, só no botão;
  - o teto da hora (o último reenvio usado) não tem desenho nem texto;
  - no canal e-mail, as duas linhas da folha mostram o mesmo destino, e não há texto pra *mandar pro telefone*
- **T13:** a entrega do checklist trouxe os números do mock (19 de 31, *Faltam 9*, o firmware 2.3.5, a cerca G07); fica o item reprovado (09), que desenha o herói com 10,2 V no segundo item, e o caso é o QJF-2C61 com 10,9 V no primeiro
- **T14/05:** o evento chega aos 24 s do mock. **Proposta:** 0:24, a barra em 80% e 14:30:24. A 05 cai de 0,87% pra 0,04%, e os textos passam a conferir
- **T15:** a evidência do RSW-9L02 é de 2 dias, e não *ontem 10:05*. A 01 desenha outro recorte da fila, com 4 itens e o contador 5. A 02 cruza garagens pra dar o 4. O *14:02* da 03 e da 04 não existe no mock
- **T16:** o círculo com traço do *não se aplica* só aparece na 02 e na 05; o subtítulo é montado de dois jeitos (2 px entre a 03 e a 06); o miolo tem vão de 14 numa metade e 12 na outra; a nota NÃO RODARAM mistura duas peças; os glifos são desenhados à mão
- **T11/02:** junta a faixa do herói com a *tradução frota v2* do a-16. **Proposta:** *tradução urbano v3*, a do RKT-8H42
- **T12 e T06:** a margem do último grupo mais o recheio do miolo somam folga dupla antes do rodapé. **Proposta:** tirar a margem. Não muda nenhum pixel na rolagem 0
- **T04:** o h1 escondido *Menu* só existe nas referências dos diálogos, e não nas das folhas
- **as listas de peças do design:** a T01, a T02, a T12, a T13 e a T15 listam peças que nenhuma referência delas desenha. A lista medida de cada uma está na seção do protótipo
