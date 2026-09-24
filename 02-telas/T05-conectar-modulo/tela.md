# T05 · Conectar módulo

Achar o módulo, conectar e conferir, antes de qualquer gravação, se ele pode ser instalado.

| | |
|---|---|
| **Elemento-assinatura** | a pré-checagem acendendo as onze linhas em ordem — é aqui que a sessão nasce, e a faixa desce |
| **Chrome** | sem faixa até a pré-checagem aprovar |
| **Semente no protótipo** | cinco módulos por perto (`situacao.porPerto` do mock: o do herói e outros quatro) · M2C-0417, o do herói, vem escolhido |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 4 · 11 — ver `estados.md` |

## O que se toca

- a busca corre sozinha → a lista de módulos por perto. No protótipo ela acha na hora: o ritmo da busca não está em `movimento.md`
- pelo menu, a tela abre na lista sem nada escolhido (01), com o primário apagado · `Procurar de novo` → a busca de novo, sem nada escolhido (01) · a 00, com o do herói escolhido, abre pelo endereço, como o quadro da referência
- tocar num módulo da lista **só o marca** (o quadrado lima surge no poço) e acende `Conectar ao M2C-0417`, com o serial do marcado; tocar em outro troca a marca · é o primário que conecta (R-14, decisão do diretor, 24/09) · o não cadastrado não se toca
- conectado → a pré-checagem corre sozinha, uma linha a cada 600ms. O cadastro decide o que reprova: o serial fora do cadastro, o modelo sem driver, o firmware fora da matriz, a variante sem CAN, o conteúdo que não cabe
- pré-checagem aprovada → a sessão nasce, com o meio em que a busca achou o módulo, e a faixa de sessão desce → `Selecionar ativo` (T06) · `Voltar ao menu` (T04)
- numa falha: a ação do aviso (`Procurar outro módulo`, `Atualizar firmware`, `Reconectar`...)
- `Atualizar firmware` → a linha do firmware corre com a porcentagem gravada, e as seguintes esperam; ao terminar, a pré-checagem recomeça. No protótipo, a atualização fica no quadro da referência (62%) até o ritmo dela ser declarado

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

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

Corrigida no C6 pelo medido (G10, T05-A14). A T05 se constrói em dois ciclos: a lista conta o que o código usa hoje (o caminho feliz, C6) e o que as 16 referências desenham (os estados, C7). Saíram as 16 peças que nenhuma das 16 desenha (faixa · sem ação, processo parado, linha do histórico, a lista de garagens, as duas da cadeia, as três do encerramento, com contador de falha, a marca no login, campo, campo focado, linha de opção, linha de ônibus e lista com contagem): a faixa da T05 sempre tem o ENCERRAR, e as falhas da pré-checagem contam em cinza o que passou. Entraram as de toque da folha 1 (o primário nos três estados, o link e a linha tocável), a faixa · sessão aberta da pré-checagem aprovada (05 e 13) e os glifos, os poços e os marcadores da folha 3. Desenhadas e ainda sem código até o C7: o escolhido com trava (04), a parou aqui (14), a falha (14) e o aviso (15). O que só a T05 desenha virou variante nomeada (G11): a linha de módulo com o fim da lista e como escolha, a checagem no estado agora, a última de 43 da pré-checagem aprovada, o relógio apagado do ainda não, o processo correndo com o pé de 32, o contador do veredito e a faixa sem ativo. O rótulo de topo com o serial e a placa, o rótulo dos outros por perto e o bloco do nenhum encontrado (03) não têm linha no `componentes.md`: são peças desta tela, em `06-prototipo/app/src/telas/T05/`.

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
