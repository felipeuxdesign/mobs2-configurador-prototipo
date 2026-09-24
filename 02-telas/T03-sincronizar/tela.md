# T03 · Sincronizar

Baixar o pacote da garagem e dizer se dá pra trabalhar com ele.

| | |
|---|---|
| **Elemento-assinatura** | a barra de idade do pacote com o limite de 7 dias marcado — o pacote velho bloqueia pela régua, não por texto |
| **Chrome** | sem faixa |
| **Semente no protótipo** | garagem Várzea · pacote pac-uo-01 |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 3 — ver `estados.md` |

## O que se toca

- a sincronização corre sozinha → concluído → `Ir para o menu` → T04
- na falha de rede: `Reconectar` (segue de onde parou) ou `Voltar ao contexto` → T02
- pacote vencido: `Sincronizar agora` ou `Trocar de garagem` → T02
- pacote de 4 dias: `Sincronizar agora` ou `Continuar com este pacote` → T04, o menu antes de conectar, com o pacote de Ibura

No protótipo, a sincronização corre um item por vez — Modelos, Ativos, Cartões —, em 4 s no total, e o poço acompanha os ativos (T03·1, T03·5). A primeira baixa do Pátio Caruaru cai no quarto item (o caso `sync-falha-rede`), uma vez por sessão. Ao terminar, o pacote novo fica no estado único (T03·7).

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

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

Corrigida no C4 pelas referências (G1, T03-A3): saíram as 13 peças que nenhuma das cinco desenha e entrou a nota tracejada da 04. Os três instrumentos no poço (o download, o concluído e a idade do pacote), o cabeçalho com a garagem em cima e a linha do pacote não têm linha no `componentes.md` (T03-A11): são peças desta tela, em `06-prototipo/app/src/telas/T03/`. A barra do download é o desenho do placar sem as bordas dos lados. No acerto do design system pelo medido (G10), entraram as peças de toque da folha 1 (o primário nos três estados e o link) e os glifos e os poços da folha 3, que a tela usa.

## Histórias de usuário

- **HU-T03-1** — Vejo progresso, volume e tempo estimado; sincronização é incremental por versão
- **HU-T03-2** — Falha de rede mostra erro com Reconectar, sem perder progresso parcial
- **HU-T03-3** — A versão do manifesto é gravada em toda evidência
- **HU-T03-4** — Pacote > 7 dias bloqueia; a partir de 3 avisa sem bloquear. Idade conta do carimbo do servidor

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
