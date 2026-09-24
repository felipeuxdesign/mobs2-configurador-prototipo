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
- a tela abre com o do herói escolhido (00) · `Procurar de novo` → a busca de novo, sem nada escolhido (01)
- tocar num módulo → escolhido → `Conectar ao M2C-0417`, com o serial do escolhido · o não cadastrado não se toca
- conectado → a pré-checagem corre sozinha, uma linha a cada 600ms. O cadastro decide o que reprova: o serial fora do cadastro, o modelo sem driver, o firmware fora da matriz, a variante sem CAN, o conteúdo que não cabe
- pré-checagem aprovada → a sessão nasce, com o meio em que a busca achou o módulo, e a faixa de sessão desce → `Selecionar ativo` (T06) · `Voltar ao menu` (T04)
- numa falha: a ação do aviso (`Procurar outro módulo`, `Atualizar firmware`, `Reconectar`...)
- `Atualizar firmware` → a linha do firmware corre com a porcentagem gravada, e as seguintes esperam; ao terminar, a pré-checagem recomeça. No protótipo, a atualização fica no quadro da referência (62%) até o ritmo dela ser declarado

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
- falha
- aviso
- processo parado
- nota tracejada
- linha do histórico
- a lista de garagens
- cadeia concluída
- cadeia recusada
- encerrando
- pede o corte
- sem homologar
- com contador neutro
- com contador de falha
- a marca no login
- campo
- campo focado
- linha de opção
- linha de módulo
- linha de ônibus
- bloco escolhido
- escolhido com trava
- tira de leituras
- lista com contagem

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
