# Registro de mudanças

## 2026-09-24 · C3 · palco

- **o palco** em `app/src/palco`, separado do app: o quadrado, o celular nos dois jeitos, a coluna, o painel em duas partes, a etiqueta `C3 · 2026-09-24` e o Recomeçar do login
- **a URL** leva a tela, o estado, o momento e o painel (`?tela=T07&estado=01-estado-fora-da-faixa`), com `replaceState`
- **as sementes** (`estado/sementes.js`): pular de tela pelo painel ou pela URL monta o estado mínimo do `logica.md`. **O Voltar ao fluxo** devolve o instante de antes do primeiro estado aberto. Se o estado veio pela URL, ele monta a semente
- **as receitas** (`estado/receitas.js`) dos 50 estados, cada uma com o caso ou o dado do mock de que o estado nasce. 5 esperam um caso aditivo no ciclo da tela: T05/09, T12/02, T15/01, T15/02 e T15/03 · o `npm run checar` ganhou o teste delas
- **o `indice.json`** ganhou `rotulo`, `rotuloOrigem` e, na T05, `grupo` em cada estado. 16 rótulos vêm dos quadros e 34 são propostos. O resto do índice não mudou
- **desvio nomeado (G19):** os quadros desenham o celular a 90% e o quadrado a 24; o palco segue o `palco.md`: tamanho real a 1440 × 900, centrado, e o quadrado a 16
- **desvio nomeado (G19):** a coluna da T05 não lista "Um encontrado", que o quadro 03 põe lá, porque é momento
- **desvio nomeado:** no modo estreito, tocar no app parado pisca o quadrado, porque a coluna não existe e o Voltar ao fluxo fica no topo do painel. O `palco.md` não fala disso
- prints em `06-prototipo/prints/C3/`

## 2026-09-24 · C1 · fundação

- **o repositório git** na raiz, com o `.gitignore`; o primeiro commit guarda a pasta como o C0 a deixou
- **o projeto** em `06-prototipo/app`: Vite 8.3.0, React e React DOM 18.3.1, lucide-react 1.47.0; pngjs e pixelmatch pra comparar prints · a estrutura `src/ds`, `src/telas`, `src/estado`, `src/palco`, `src/dados`
- **os tokens**: o `tokens.css` é a norma; saíram os 3 duplicados (`--poco-24`, `--poco-32`, `--poco-44`); entrou um bloco de 24 tokens que as referências usavam sem nome (a barra do sistema, o campo, os traços, a marca no login, 15 espaçamentos de letra e 3 tempos que zeram no reduzir) — **95 → 119 tokens**; o `tokens.json` passou a ser gerado do CSS e voltou a ter 150, 200 e 300ms (guardava 0ms)
- **a fonte** vem dos woff2 de `05-recursos/fontes`, os mesmos das referências — desvio nomeado contra o `@fontsource/barlow` que a stack pedia; `06-prototipo/CLAUDE.md`, `publicar.md` e `05-recursos/README.md` passaram a dizer isso
- **o mock** entra na app por import, sem cópia, e congelado · o gate ganhou 22 checagens do que as telas leem (credenciais, calibração, checklist, ciclo, autoteste, os 12 casos que ninguém conferia) — **68 → 90** · os comentários do mock e do gate apontam os caminhos certos, e o dado não mudou (o hash de `JSON.stringify(M)` é o mesmo)
- **o estado único** nasce com a forma completa que as 16 telas pedem · `formato.js` sem `Intl` · `ritmos.js` espelhando o `movimento.md`
- **o celular** de 360 × 800 no centro do palco, e o modo `?print=1`, que mostra só a tela — o print sai em 720 × 1600, o tamanho dos PNG
- **o `npm run checar`**: gate do mock, `tokens.json` = `tokens.css`, zero relógio, acaso, locale, hex e px solto em `app/src`
- **as leis** reescritas pelas telas, por decisão do diretor (15 linhas marcadas com ◆, **para revisão do arquiteto**): a Lei 3 descreve o que os estados fazem; as Leis 1, 4, 5, 6, 7, 10, 11, 14, R-03 e o poço na linha ganharam as exceções nomeadas; entrou a lei do toque de 48; o "nada encosta" vale pra todo tocável
- **os números da versão**: 119 tokens e 115 peças no `CLAUDE.md` e no README do design system; 25 cores (o README dizia 23)
- **o `ciclos.md`** segue o plano revisado no C0
- prints em `06-prototipo/prints/C1/`

## 2026-09-24 · a marca, o login e o checkbox

- a logo passou de `#B8F23D` pro `--lima` `#AAEF00` · **lei 15** e **decisão 28** — em `logo-mobs2.svg` só o `fill` mudou; o manifesto de procedência embutido no arquivo não confere mais, porque o conteúdo mudou
- saiu do login e do erro a frase "O acesso vale por 7 dias sem sincronizar" — ninguém age sobre ela no login
- o checkbox do login ganhou 8px em cima e embaixo: o toque encostava no campo de senha, e o formulário estava a 26px do Entrar
- o design system ganhou o checkbox marcado na folha 6 · o movimento de marcar entrou na animação da T01 e da T13
- vieram do design e foram conferidos antes de entrar: os PNG `T01/00-tela` e `T01/01-estado-usuario-ou-senha-incorretos` (a logo no lugar, a 207px; o Entrar no lugar; o HTML editado desenha a mesma geometria) e a folha 6 em HTML e PNG — que, além do checkbox marcado, zerou o padding da moldura do espécime *linha de opção*
- nenhuma contagem de referência muda: continuam 105 · o `componentes.md` passa a ter 115 linhas (os números da versão foram atualizados no C1)

## 2026-09-23 · design fechado · versão 2

- **105 referências** de tela: 16 telas, 39 momentos e 50 estados, em 360 × 800, cada uma em HTML puro e PNG
- **design system** com 8 folhas, 114 peças e 95 tokens; cobre todo desenho que se repete nas telas
- toda medida é **por dentro** — a borda e o recheio cabem no número
- o **cruzamento das 107 histórias de usuário** com as telas: toda história que pede tela tem tela
- a **lógica do protótipo navegável** e do palco, prontas pra construir
- as referências abrem **sozinhas e sem internet**: a fonte e a logo moram em `05-recursos/`
- o protótipo ainda **não foi construído** — o próximo registro é do primeiro ciclo dele
