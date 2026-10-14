# T03 · Sincronizar

Baixar o pacote da unidade e dizer se dá pra trabalhar com ele.

| | |
|---|---|
| **Elemento-assinatura** | a barra de idade do pacote com o limite de 7 dias marcado — o pacote velho bloqueia pela régua, não por texto |
| **Chrome** | sem faixa |
| **Semente no protótipo** | unidade Várzea · pacote pac-uo-01 |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 3 — ver `estados.md` |

## O que se toca

- a sincronização corre sozinha → concluído → `Ir para o menu` → T04
- na falha de rede: `Tentar de novo`
  - no protótipo · a nossa versão desta linha, antes desta entrega: na falha de rede: `Reconectar` (segue de onde parou) ou `Voltar ao contexto` → T02
- pacote vencido: `Sincronizar agora` ou `Trocar de unidade`
  - no protótipo · a nossa versão desta linha, antes desta entrega: pacote vencido: `Sincronizar agora` ou `Trocar de unidade` → T02
- pacote de 4 dias: `Sincronizar agora` ou `Continuar com este pacote`
  - no protótipo · a nossa versão desta linha, antes desta entrega: pacote de 4 dias: `Sincronizar agora` ou `Continuar com este pacote` → T04, o menu antes de conectar, com o pacote de Ibura
- no protótipo · a nossa linha, que saiu do pacote desta entrega (o protótipo segue com ela): o voltar do sistema (no computador, o Esc) faz o mesmo que o link do rodapé — `Voltar ao contexto`, `Trocar de unidade`, `Continuar com este pacote` —, e no concluído o `Ir para o menu`, a saída que ele tem. Baixando, a tela diz *não saia da tela* e não tem saída: ele não faz nada (`06-prototipo/logica.md` · O voltar do Android)

No protótipo, a sincronização corre um item por vez, nos cinco grupos do pacote — Ativos, Conexões, Modelos de ativo, Eventos e Cercas, 31 itens no herói (decisão 45) —, em 4 s no total, e o poço acompanha os ativos (T03·1, T03·5). Os ativos baixam primeiro, como a 00 e a 01 desenham (*6 de 10*, e o resto em *—*); depois, os outros quatro, na ordem da lista (padrão, pro arquiteto: nenhuma referência desenha a ordem deles). O *faltam ~N s* é o que falta baixar vezes a estimativa do servidor por item, 1,6 s (`segPorItem`), na dezena: na 00, os 25 que faltam dão 40, o *faltam ~40 s* da referência (a resposta do arquiteto ao gate, 02/10). A primeira baixa do Pátio Caruaru cai no quarto item (o caso `sync-falha-rede`), uma vez por sessão. Ao terminar, o pacote novo fica no estado único (T03·7).
  - no protótipo (o pacote 1, construído, 02/10): cada grupo diz em que pé está pelo lugar dele na ordem — os de antes do que baixa já baixaram, os de depois esperam, em *—*. O grupo que o pacote traz vazio (as cercas de Ibura e de Caruaru: o `contem` conta as regiões de cada unidade, e só a Várzea tem) espera até a baixa passar por ele, e no concluído diz *0*: sem isso, ele nasceria pronto, com o check, antes de a baixa começar. O passo é 4 s dividido pelos itens do pacote: ~129 ms na Várzea (31), 160 em Ibura (25), ~174 em Caruaru (23)
  - no protótipo · desvio nomeado (G9, o de antes, com os números novos): a falha de rede (01) é a do caso `sync-falha-rede`, a primeira baixa do Pátio Caruaru, que cai no 4º item — *PÁTIO CARUARU*, *Ativos 3 de 6* e *pacote pct-uo03-2026-03-04 · 04/03 07:30* —, e a referência desenha a Várzea em *6 de 10*. A forma agora coincide: os ativos baixando e os outros quatro em *—*. Pôr o caso na Várzea derrubaria a primeira baixa do herói no caminho feliz
  - no protótipo · desvio nomeado (pacote 1): as divisórias da lista ficam entre as linhas, sem a da última, em todo quadro — como a peça *lista com contagem* e as referências de antes. As três referências novas se contradizem: na 00 e na 01, só a linha dos Ativos tem a divisória, e as quatro que esperam não; na 02, as cinco têm, também a última, rente à borda do cartão. Seguir as duas faria a divisória nascer embaixo de cada grupo que começa a baixar, e o grupo andaria meio pixel no meio da baixa — o estado muda o conteúdo, nunca o desenho. A diferença é esse meio pixel nas linhas de baixo: 0,06% na 00, 0,04% na 02 (com os glifos do Lucide, G5). Pro arquiteto: o gerador tira a divisória das linhas em espera e põe a da última

No protótipo (a otimização do design, construída): a unidade que só o caso `lista-longa-garagens` tem baixa o pacote que o caso declara pra ela (pac-uo-11 a pac-uo-16) — o nome da unidade, os ativos, a idade, a hora e a versão são os dele: na Garagem Olinda, *de 12* e *pacote pct-uo12-2026-03-12 · 12/03 06:15*, e no concluído *pacote pct-uo12-2026-03-12 · 12/03 14:30*. O que o pacote do caso não declara — a estimativa do servidor por item, que dá o *faltam ~N s* — sai do que os três pacotes de `pacotes` declaram igual (1,6 s): desvio nomeado, pro arquiteto (`app/src/dados/garagens.js`). O `Ir para o menu` leva ao menu dessa unidade.
  - no protótipo (a última entrega, a resposta do arquiteto de 26/09): a fonte da idade, da hora e dos ativos de cada unidade é o pacote — os três campos saíram das unidades do caso —, e os seis pacotes declaram os cinco grupos no `contem` — os ativos de cada unidade, e as conexões 2, os modelos 3, os eventos 12 e as cercas 0 (a errata do pacote 1: as regiões de cada unidade, e só a Várzea tem) —, como o do herói: a T03 lê dali, e a inferência dos modelos saiu. Os cartões saíram de todos os pacotes (decisão 45). Só a estimativa por item (1,6 s) segue saindo dos três pacotes de `pacotes`, porque o pacote do caso ainda não a declara — desvio nomeado, pro arquiteto. O mundo das seis unidades vai até o menu, sem os ônibus (a T06 não tem ativo delas), e as medidas não mudam: os números do caso são os que a inferência dava

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema sem sessão
- o topo do menu inteiro
- duas ações
- uma ação
- com legenda
- aviso
- processo parado
- linha do histórico
- a lista de garagens
- linha de opção
- lista com contagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema sem sessão
- duas ações
- uma ação
- processo correndo
- os glifos de estado
- os poços
- falha
- aviso
- nota tracejada
- lista com contagem

Corrigida no C4 pelas referências (G1, T03-A3): saíram as 13 peças que nenhuma das cinco desenha e entrou a nota tracejada da 04. Os três instrumentos no poço (o download, o concluído e a idade do pacote), o cabeçalho com a unidade em cima e a linha do pacote não têm linha no `componentes.md` (T03-A11): são peças desta tela, em `06-prototipo/app/src/telas/T03/`. A barra do download é o desenho do placar sem as bordas dos lados. No acerto do design system pelo medido (G10), entraram as peças de toque da folha 1 (o primário nos três estados e o link) e os glifos e os poços da folha 3, que a tela usa. Com o pacote 1, a lista de cima perde a *falha*, que a 01 desenha — o traço vermelho de 2 embaixo da baixa que parou: ela fica nesta lista, e a diferença vai pro arquiteto.

## Histórias de usuário

- **HU-T03-1** — Vejo progresso, volume e tempo estimado; sincronização é incremental por versão
- **HU-T03-2** — Falha de rede mostra erro com Reconectar, sem perder progresso parcial
- **HU-T03-3** — A versão do manifesto é gravada em toda evidência
- **HU-T03-4** — Pacote > 7 dias bloqueia; a partir de 3 avisa sem bloquear. Idade conta do carimbo do servidor

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
