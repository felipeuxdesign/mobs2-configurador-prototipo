# T05 · Conectar módulo

Achar o módulo, conectar e conferir, antes de qualquer gravação, se ele pode ser instalado.

| | |
|---|---|
| **Elemento-assinatura** | a pré-checagem acendendo as onze linhas em ordem — é aqui que a sessão nasce, e a faixa desce |
| **Chrome** | sem faixa até a pré-checagem aprovar |
| **Semente no protótipo** | cinco módulos por perto (`situacao.porPerto` do mock: o do herói e outros quatro) · M2C-0417, o do herói, vem escolhido |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 4 · 13 — ver `estados.md` |

## O que se toca

- `Ligar o Bluetooth` → o Android pergunta · ligado, a busca começa sozinha
- `Permitir` → o Android pergunta de novo · se o técnico marcou *não perguntar de novo*, o botão vira `Abrir as configurações`
- no protótipo, a resposta do Android vem do caso (a entrega do mundo real): o `bluetooth-desligado` não traz recusa, e o `Ligar o Bluetooth` leva à busca, que acha na hora — a lista sem nada escolhido (01), como o `Procurar de novo`. No `bluetooth-sem-permissao`, a resposta é *negada*: negada de novo, o Android não deixa o app perguntar mais, e o primário vira `Abrir as configurações`, no mesmo bloco (a letra é a da T10/11; nenhuma referência da T05 desenha o botão virado). `Abrir as configurações` leva às configurações do Android, que o protótipo não desenha: o técnico volta com a permissão dada, e a busca começa (01) · nunca um botão que não faz nada (a lei de construir, 12)
- a 16 e a 17 abrem pela coluna, paradas e sem toque: nenhum gatilho do mock desliga o Bluetooth ou nega a permissão no fluxo (pendência). O toque do primário de cada uma é o de `06-prototipo/app/src/telas/T05/celular.js`, provado no node por `app/scripts/testar-login-e-bluetooth.mjs` · o bloco é o do nenhum encontrado (03), com o poço de 44 e o Bluetooth cortado no lugar da marca tracejada, e sem a legenda embaixo: ele desce até o rodapé
- a busca corre sozinha → a lista de módulos por perto. No protótipo ela acha na hora: o ritmo da busca não está em `movimento.md`
- pelo menu, a tela abre na lista sem nada escolhido (01), com o primário apagado · `Procurar de novo` → a busca de novo, sem nada escolhido (01) · a 00, com o do herói escolhido, abre pelo endereço, como o quadro da referência
- tocar num módulo da lista **só o marca** (o quadrado lima surge no poço) e acende `Conectar ao M2C-0417`, com o serial do marcado; tocar em outro troca a marca · é o primário que conecta (R-14, decisão do diretor, 24/09) · o não cadastrado não se toca · na 00, o ESCOLHIDO é a marca: tocar num dos outros por perto troca o escolhido no lugar, e o primário passa a dizer o serial dele — também não conecta
- conectado → a pré-checagem corre sozinha, uma linha a cada 600ms. O cadastro decide o que reprova: o serial fora do cadastro, o modelo sem driver, o firmware fora da matriz, a variante sem CAN, o conteúdo que não cabe
- pré-checagem aprovada → a sessão nasce, com o meio em que a busca achou o módulo, e a faixa de sessão desce → `Selecionar ativo` (T06) · `Voltar ao menu` (T04)
- numa falha: a ação do aviso (C7)
  - `Procurar outro módulo` (06, 07, 08, 09, 11, 12, 14, 15) → a busca de novo, sem nada escolhido (01)
  - `Atualizar firmware` (08) → a atualização (10)
  - `Gravar a conexão` (09) → com a conexão gravada, o módulo tem rede, e a saída passa a ser a da 08, `Atualizar firmware`. O quadro de gravando não tem referência: a troca é direta
  - `Reconectar` (14) e `Acordar módulo` (15) → a pré-checagem segue da checagem em que parou, com as de antes preservadas (HU-T05-9)
  - `Tentar de novo` (04) → conecta de novo, e a pré-checagem corre · `Procurar de novo` (03, 04) → a busca de novo (01) · `Voltar ao menu` (03) → T04
- as portas naturais (G28, R-11): marcar na lista um módulo que é caso do mock e tocar em `Conectar ao …` leva a pré-checagem ao estado dele. O M2C-0362 fecha o canal da sessão anterior e mostra as pendências (13), o M2C-0394 não comporta o conteúdo (11), e o M2C-0335 dorme na nona (15). O M2C-0999 não se toca, como a referência desenha. Os estados sem linha tocável na lista (03, 04, 06, 07, 08, 09, 12, 14) abrem pela coluna do palco
- o que acontece uma vez vale uma vez por sessão (G21): a falha ao conectar, o link que cai, o módulo que dorme, o canal antigo que o app fecha e o módulo sem rede até a conexão gravar. O que é fato do cadastro vale toda vez
- `Atualizar firmware` → a linha do firmware corre com a porcentagem gravada, e as seguintes esperam; ao terminar, a pré-checagem recomeça. No protótipo, a atualização fica no quadro da referência (62%) até o ritmo dela ser declarado
- o voltar do sistema (no computador, o Esc) faz o mesmo que o link de saída do rodapé: com a pré-checagem aprovada, no nenhum encontrado (03) e sem Bluetooth ou sem a permissão (16, 17), o `Voltar ao menu`; reprovada ou parada no caso, o `Procurar outro módulo`, que volta à lista (01). Na pré-checagem correndo e na atualização do firmware, não faz nada — o processo termina sozinho. Na busca (00, 01, 02, 04), o link é o `Procurar de novo`, que não sai da tela, e ele não faz nada (`06-prototipo/logica.md` · O voltar do Android; a pergunta está em `08-produto-real/pendencias.md`)

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- barra do sistema sem sessão
- faixa · sem ação
- duas ações
- uma ação
- processo correndo
- com legenda
- aprovada
- reprovada, com causa
- não se aplica
- parou aqui
- ainda não
- pré-checagem
- pré-checagem com sessão
- seção aberta do checklist
- seção recolhida
- falha
- aviso
- processo parado
- nota tracejada
- linha do histórico
- a lista de garagens
- com contador neutro
- com contador de falha
- checkbox
- checkbox marcado
- justificativa
- linha de opção
- linha de módulo
- linha de ônibus
- bloco escolhido
- escolhido com trava
- tira de leituras
- lista com contagem
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- linha tocável · normal e pressionada
- barra do sistema
- barra do sistema sem sessão
- faixa · sessão aberta
- duas ações
- uma ação
- processo correndo
- com legenda
- os glifos de estado
- os poços
- os marcadores
- aprovada
- reprovada, com causa
- não se aplica
- parou aqui
- ainda não
- pré-checagem
- pré-checagem com sessão
- falha
- aviso
- nota tracejada
- com contador neutro
- linha de módulo
- bloco escolhido
- escolhido com trava
- tira de leituras

Corrigida no C6 pelo medido (G10, T05-A14). A T05 se constrói em dois ciclos: a lista conta o que o código usa hoje (o caminho feliz, C6) e o que as 16 referências desenham (os estados, C7). Saíram as 16 peças que nenhuma das 16 desenha (faixa · sem ação, processo parado, linha do histórico, a lista de garagens, as duas da cadeia, as três do encerramento, com contador de falha, a marca no login, campo, campo focado, linha de opção, linha de ônibus e lista com contagem): a faixa da T05 sempre tem o ENCERRAR, e as falhas da pré-checagem contam em cinza o que passou. Entraram as de toque da folha 1 (o primário nos três estados, o link e a linha tocável), a faixa · sessão aberta da pré-checagem aprovada (05 e 13) e os glifos, os poços e os marcadores da folha 3. O escolhido com trava (04), a parou aqui (14), a falha (14) e o aviso (15) ganharam código no C7. O que só a T05 desenha virou variante nomeada (G11): a linha de módulo com o fim da lista e como escolha, a checagem no estado agora, a última de 43 da pré-checagem aprovada, o relógio apagado do ainda não, o processo correndo com o pé de 32, o contador do veredito e a faixa sem ativo (C6); a checagem com a nota embaixo (13), a parou aqui neutra do repouso (15), a última de 45 da pré-checagem que reprovou ou parou, o contador só com a palavra (03) e a leitura com o número em destaque (13) (C7). O rótulo de topo com o serial e a placa, o rótulo dos outros por perto e o bloco do nenhum encontrado (03) não têm linha no `componentes.md`: são peças desta tela, em `06-prototipo/app/src/telas/T05/` (o bloco do nenhum encontrado em `pecas.jsx`, que no 16 e no 17 leva o poço de 44 com o Bluetooth cortado, o ícone `bluetooth-desligado` — a entrega do mundo real).

## Histórias de usuário

- **HU-T05-1** — Busco dispositivos (sem fio ou cabo, conforme a variante); vazio explica alimentação, cabo, distância
- **HU-T05-2** — Ao conectar, a pré-checagem roda sozinha e mostra cada item com resultado
- **HU-T05-3** — Serial não cadastrado e modelo sem driver são dois estados com mensagens distintas
- **HU-T05-4** — Falha de comunicação mostra uma causa única com 3 coisas a checar: cabo, alimentação, cadastro
- **HU-T05-5** — Firmware incompatível: com conectividade oferece atualizar; sem, grava Conexão isolado e então oferece
- **HU-T05-6** — Após atualizar, o app relê capacidades e reinicia a pré-checagem
- **HU-T05-7** — Vejo pendências do módulo e estado do modem como informação — não bloqueiam nada
- **HU-T05-8** — Conexão bem-sucedida abre a sessão de configuração
- **HU-T05-9** — Perda de link mostra Reconectar e preserva o estado da etapa. Queda por repouso não é erro

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
