# T05 · Conectar módulo

Achar o módulo e conectar. O que ele informa vem logo depois, no diagnóstico.

| | |
|---|---|
| **Elemento-assinatura** | a lista dos módulos por perto — conectar é o único passo aqui |
| **Chrome** | sem faixa — a sessão nasce na conexão; a faixa aparece na T07 depois da leitura sem trava |
| **Semente no protótipo** | cinco módulos por perto · M2C-0417 é o do herói |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 5 · 6 — ver `estados.md` |

- no protótipo · a linha *Chrome*, pelo padrão aprovado: a sessão nasce na conexão, aqui, mas a faixa não desce nesta tela — desce na T07, quando as nove linhas foram lidas sem trava (veja *conectado → T07*, embaixo). Nenhuma das sete referências da T05 tem a faixa

- no protótipo · a nossa versão da linha *Semente no protótipo*, antes desta entrega: | **Semente no protótipo** | cinco módulos por perto (`situacao.porPerto` do mock: o do herói e outros quatro) · M2C-0417, o do herói, vem escolhido |

## O que se toca

- `Procurar de novo` → a busca corre de novo, o *Procurando…* (a 05), e a lista volta
  - no protótipo (o pacote 5): a busca de novo é o *Procurando…* (05) — a lista some, o poço com o quadrado branco de agora, a tentativa embaixo e o primário desligado —, com a URL dizendo a 05, e a lista volta sem nada escolhido (01) depois de 1,2 s (`app/src/estado/ritmos.js` · `buscaMs`). É a busca de novo em todo lugar da T05 que a chama: o `Procurar de novo` e o Bluetooth que liga. A tentativa conta as buscas desde que a tela abriu — a da abertura é a primeira, e a busca de novo, a *segunda tentativa*; da terceira em diante, a legenda fica sem texto, porque o `textos.md` só escreve as duas (G25). O voltar, no *Procurando…*, é o `Voltar ao menu` do rodapé. O `Procurar outro módulo` nasce fora daqui: na T07, ele leva à T05/01, a lista sem nada escolhido; na T09, com a sessão aberta, abre o diálogo *Encerrar antes de terminar?* (a resposta do arquiteto ao gate, 02/10)
- `Ligar o Bluetooth` → o Android pergunta · ligado, a busca começa sozinha
- `Permitir` → o Android pergunta de novo · se o técnico marcou *não perguntar de novo*, o botão vira `Abrir as configurações`
- no protótipo, a resposta do Android vem do caso (a entrega do mundo real): o `bluetooth-desligado` não traz recusa, e o `Ligar o Bluetooth` leva à busca de novo — o quadro da 00 e a lista sem nada escolhido (01), como o `Procurar de novo`. No `bluetooth-sem-permissao`, a resposta é *negada*: negada de novo, o Android não deixa o app perguntar mais, e o primário vira `Abrir as configurações`, no mesmo bloco (a letra era a da T10/11, que saiu no pacote 2, e fica a da regra 12 do `06-prototipo/CLAUDE.md`; nenhuma referência da T05 desenha o botão virado). `Abrir as configurações` leva às configurações do Android, que o protótipo não desenha: o técnico volta com a permissão dada, e a busca começa (01) · nunca um botão que não faz nada (a lei de construir, 12)
- a 16 e a 17 abrem pela coluna, paradas e sem toque: nenhum gatilho do mock desliga o Bluetooth ou nega a permissão no fluxo (pendência). O toque do primário de cada uma é o de `06-prototipo/app/src/telas/T05/celular.js`, provado no node por `app/scripts/testar-login-e-bluetooth.mjs` · o bloco é o do nenhum encontrado (03), com o poço de 44 e o Bluetooth riscado — o ícone inteiro, com o risco por cima e o fio escuro (lei 21, a última entrega) — no lugar da marca tracejada, e sem a legenda embaixo: ele desce até o rodapé
- a busca corre sozinha → a lista de módulos por perto
  - no protótipo · a nossa versão desta linha, antes desta entrega: a busca corre sozinha → a lista de módulos por perto. No protótipo, ao abrir, ela acha na hora; a busca de novo mostra o quadro da 00 por 1,2 s, o ritmo do arquiteto (acima)
- tocar num módulo → **a linha marca**, com o lima, e o `Conectar ao M2C-0417` acende · quem avança é o botão, não o toque na linha · com um módulo só, ele já vem marcado (a 02)
  - no protótipo · a nossa versão desta linha, antes desta entrega: tocar num módulo da lista **só o marca** (o quadrado lima surge no poço) e acende `Conectar ao M2C-0417`, com o serial do marcado; tocar em outro troca a marca · é o primário que conecta (R-14, decisão do diretor, 24/09) · na 01, todos se tocam — o M2C-0999, fora do cadastro, também, com o que ele mesmo informa (a errata do pacote 1, `naBuscaForaCadastro` no mock: *VL06 · CAN-BT · FIRMWARE 2.3.5*) · na 00 e na 04 também, desde o complemento do pacote 2, que refez as duas referências (antes, só a 01 tinha mudado na errata; a diferença vai ao arquiteto) · na 00, o ESCOLHIDO é a marca: tocar num dos outros por perto troca o escolhido no lugar, e o primário passa a dizer o serial dele — também não conecta · a R-14 do diretor vence a R-11 do pacote, que era da cópia velha dele (a resposta do arquiteto ao gate, 02/10)
  - no protótipo · a nossa linha, que saiu do pacote desta entrega (o protótipo segue com ela): pelo menu, a tela abre na lista sem nada escolhido (01), com o primário apagado · `Procurar de novo` → a busca de novo: o quadro da 00, e a lista sem nada escolhido (01) · a 00, com o do herói escolhido, abre pelo endereço, como o quadro da referência
- conectado → T07, o diagnóstico do módulo
  - no protótipo (o pacote 6): o `Conectar ao …` passa pelo *Conectando ao …* (06) — o primário desligado, o `Procurar de novo` apagado, a lista inerte — por 1,2 s (`ritmos.js` · `buscaMs`, o mesmo número da busca e do Entrar), com a URL dizendo a 06; aí a T07, ou o *não respondeu* da 04. O `Tentar de novo` da 04 passa pelo mesmo momento, sobre o quadro dela. Pela URL, a 06 abre parada · o `Procurar de novo` apagado fica em `--tinta-apagada` (a lei 17), e a 06 o desenha em `--marca` — o desvio está no gate do pacote 6
  - no protótipo · conectado, a sessão nasce, com o meio em que a busca achou o módulo, e a tela vai pra T07; a faixa ainda não desce: ela desce na T07, quando as nove linhas foram lidas sem trava (o padrão aprovado, a resposta do arquiteto ao gate, 02/10, que a errata do pacote 1 levou à `logica.md` e à decisão 44). A sessão nasce sem nenhuma etapa: a pré-checagem não grava mais nada aqui, e o diagnóstico grava a dele (`etapas.preChecagem`, o nome de hoje, que a T13 e a T12 leem). Construída (o pacote 1): `app/src/telas/T05/index.jsx` · `abrirSessao`. A nossa versão desta linha, antes desta entrega, era a da pré-checagem, que saiu com a decisão 44
- `Conectar ao …` → o botão desliga e diz *Conectando ao M2C-0417…* (a 06), sem mudar mais nada na tela
  - no protótipo (o pacote 9): o módulo responde → o *Conectado ao …* (07): o primário desligado com o texto novo, o `Procurar de novo` apagado, e o traço lima se desenha embaixo da linha marcada (`LinhaModulo` · `confirmada`, uma vez, só no fluxo; pela URL, já desenhado); depois de 1,2 s (`buscaMs`, sem número novo), a T07. Na falha, sem traço. O `Tentar de novo` da 04 também termina no 07
- se a conexão falha: a linha do módulo diz *não respondeu*, as três causas aparecem embaixo da lista, e o primário vira `Tentar de novo` (a 04)
  - no protótipo (C7): `Tentar de novo` (04) → conecta de novo, e a tela vai pra T07 · `Procurar de novo` (03, 04) → a busca de novo (01) · `Voltar ao menu` (03) → T04
- **as linhas mostram só o número e o modelo** — o firmware é do diagnóstico, não da conexão (o retorno do PM: *na conexão do módulo não é necessário checar nada*)
- no protótipo · a nossa linha das portas naturais (G28), que saiu do pacote desta entrega, reescrita sem a pré-checagem: a R-14 do diretor vence a R-11 do pacote, que era da cópia velha dele (a resposta do arquiteto ao gate, 02/10) — tocar na linha só marca, e o estado do caso aparece quando o técnico toca em `Conectar ao …`. Os três estados que o M2C-0362, o M2C-0394 e o M2C-0335 abriam aqui (13, 11 e 15) saíram com a pré-checagem. O M2C-0999 é a porta que fica (a errata do pacote 1, construída): marcado na lista da T05/01, o `Conectar ao M2C-0999` conecta como os outros — a sessão nasce com ele, sem faixa —, e a T07 trava pelo serial fora do cadastro, lido da sessão (T07/02). Na 00 e na 04 também, como o complemento do pacote 2 desenha. Os estados da T05 (03, 04, 16 e 17) abrem pela coluna do palco
- no protótipo · a nossa linha, que saiu do pacote desta entrega, reescrita sem a pré-checagem: o que acontece uma vez vale uma vez por sessão (G21) — aqui, a falha ao conectar (04). O que é fato do cadastro vale toda vez. O módulo que dorme e o canal antigo saíram com a pré-checagem; o link que cai e o módulo sem rede passaram pra T07
- no protótipo · a nossa linha, que saiu do pacote desta entrega, reescrita sem a pré-checagem (o protótipo segue com ela): o voltar do sistema (no computador, o Esc) faz o mesmo que o link de saída do rodapé: no nenhum encontrado (03) e sem Bluetooth ou sem a permissão (16, 17), o `Voltar ao menu`. Na busca (00, 01, 02, 04), o link é o `Procurar de novo`, que não sai da tela, e ele não faz nada (`06-prototipo/logica.md` · O voltar do Android; a pergunta está em `08-para-o-dev/o-que-o-produto-ainda-decide.md`)

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- duas ações
- com legenda
- nota tracejada
- linha do histórico
- a lista de garagens
- com contador
- linha de opção
- linha de módulo
- escolha numa lista
- linha de ônibus
- lista com contagem
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- linha tocável · normal e pressionada
- barra do sistema sem sessão
- duas ações
- com legenda
- os glifos de estado
- os poços
- os marcadores
- nota tracejada
- com contador neutro
- linha de módulo · a escolha numa lista, com a falha à direita (o pacote 7)
- o que conferir da 04 (o pacote 7) · desde o complemento do pacote 11, peça do design system, na folha 6 (`ds/entrada/OQueConferir.jsx`), com o traço vermelho (`falha`) · a T13/09 usa a mesma, sem ele

Corrigida no C6 pelo medido (G10, T05-A14). A T05 se constrói em dois ciclos: a lista conta o que o código usa hoje (o caminho feliz, C6) e o que as 16 referências desenham (os estados, C7). Saíram as 16 peças que nenhuma das 16 desenha (faixa · sem ação, processo parado, linha do histórico, a lista de unidades, as duas da cadeia, as três do encerramento, com contador de falha, a marca no login, campo, campo focado, linha de opção, linha de ônibus e lista com contagem): a faixa da T05 sempre tem o ENCERRAR, e as falhas da pré-checagem contam em cinza o que passou. Entraram as de toque da folha 1 (o primário nos três estados, o link e a linha tocável), a faixa · sessão aberta da pré-checagem aprovada (05 e 13) e os glifos, os poços e os marcadores da folha 3. O escolhido com trava (04), a parou aqui (14), a falha (14) e o aviso (15) ganharam código no C7. O que só a T05 desenha virou variante nomeada (G11): a linha de módulo com o fim da lista e como escolha, a checagem no estado agora, a última de 43 da pré-checagem aprovada, o relógio apagado do ainda não, o processo correndo com o pé de 32, o contador do veredito e a faixa sem ativo (C6); a checagem com a nota embaixo (13), a parou aqui neutra do repouso (15), a última de 45 da pré-checagem que reprovou ou parou, o contador só com a palavra (03) e a leitura com o número em destaque (13) (C7). O rótulo de topo com o serial e a placa, o rótulo dos outros por perto e o bloco do nenhum encontrado (03) não têm linha no `componentes.md`: são peças desta tela, em `06-prototipo/app/src/telas/T05/` (o bloco do nenhum encontrado em `pecas.jsx`, que no 16 e no 17 leva o poço de 44 com o Bluetooth cortado, o ícone `bluetooth-desligado` — a entrega do mundo real). Com o pacote 1 (decisão 44): a pré-checagem saiu, e com ela as peças que só os onze estados dela desenhavam — a barra do sistema com a faixa, a faixa · sessão aberta, uma ação, o processo correndo, aprovada, reprovada com causa, não se aplica, parou aqui, ainda não, pré-checagem, pré-checagem com sessão, a falha, o aviso e a tira de leituras. Medido nas sete que ficam (00 a 04, 16 e 17): nenhuma tem a faixa, e todas têm duas ações, o primário e o link. O *com contador neutro* é o que a lista de cima chama de *com contador*. Com a errata, a *linha de módulo* da 01 perdeu a folga do fim: as cinco linhas têm 72 e a divisória embaixo, a última também, como a referência nova desenha (o `fim` de 76 do C6 ficou só na vitrine); na 00 e na 04, a última dos outros por perto segue com a folga de 56. A lista de cima traz as peças que o C6 mediu fora de toda referência da T05 (linha do histórico, a lista de garagens, linha de opção, linha de ônibus e lista com contagem), e também a linha da fila e a linha da re-checagem, que esta lista não usa: vale esta lista, e a diferença vai pro arquiteto.

## Histórias de usuário

- **HU-T05-1** — Busco dispositivos sem fio; vazio explica alimentação e distância
- **HU-T05-2** — Conectar só conecta: a sessão abre, a faixa desce, e o diagnóstico vem em seguida
  - no protótipo · pelo padrão aprovado, a sessão abre na conexão, e a faixa desce na T07, quando as nove linhas foram lidas sem trava (a resposta do arquiteto ao gate, 02/10)
- **HU-T05-3** — Falha de comunicação mostra uma causa única com 3 coisas a checar: cabo, alimentação, cadastro
- **HU-T05-4** — Perda de link mostra Reconectar e preserva o estado da etapa
- **HU-T05-5** — Bluetooth desligado ou sem permissão: o app diz o que fazer antes de procurar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## A conexão (retorno do PM, 06/10)

- **só sem fio**: nenhuma tela oferece cabo nem *reconectar por cabo*
- **pareando** (a 18): só na primeira conexão com um VL06 · *Confirme no celular. É só na primeira vez com este módulo.* · o VL08 não precisa
- **reconectando** (a 19): a conexão sem fio cai depois de cerca de 30 segundos parada · *A conexão caiu por ficar parada. O app reconecta sozinho.* · texto neutro, nunca falha
- **no protótipo · a rodada 2:** a 18 e a 19 abrem pela coluna, paradas (os casos `pareando` e `reconectando`, no herói): o quadro do *Conectando*, com a frase da espera embaixo da lista, neutra (12/500 em `--tinta-secundaria`, a 4 + 8 do botão), e o primário que diz *Pareando com o …* ou *Reconectando ao …* · no fluxo, a conexão do herói não pareia nem cai · a T05/04 ainda diz *1 · Cabo e conector* no *O que conferir*: é o cabo de alimentação do módulo, e não o de programação — fica, e vai ao arquiteto
