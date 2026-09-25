# T11 · Conferir configuração

Comparar o que o módulo tem gravado com o que o cadastro manda — em linguagem de negócio.

| | |
|---|---|
| **Elemento-assinatura** | as linhas de conferência: cada bloco dizendo se bate com o cadastro |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | M2C-0438 + ONK-8Q90 · caso diff-divergente |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 1 — ver `estados.md` |

## O que se toca

- a leitura corre ao abrir, sobre o desenho do quadro a que ela chega — a `00` quando diverge, o `02` quando confere: os glifos das cinco linhas acendem em ordem, um a cada 400 ms, e o resto da tela já está no lugar — o quadro de começo não tem referência nem texto (C11 · G27, G25). Com reduzir movimento, a leitura segue no mesmo ritmo (G26). Num estado da coluna, ela nasce lida
- o que diverge: aberta pelo painel, com a semente M2C-0438 + ONK-8Q90, os cinco blocos não batem (`00`). Aberta pelo menu com a sessão do herói, nada diverge, e ela vai pro `02` (T11·1). Depois de regravar pela T09, a mesma sessão confere (T11·2)
- o valor de cada linha é o que o cadastro manda: o do caso, no par do diff-divergente; o cadastro do próprio par, nos outros — por isso o `02` do herói diz `tradução urbano v3`, a tradução do modelo dele (C11 · G9). O Leitor sai do meio da sessão: sem fio é `leitor sem fio`, como na T06; por cabo, a linha fica sem valor, porque não há texto aprovado (G25)
- `Regravar os cinco blocos` → T09
- `Só registrar o diagnóstico` → registra o diagnóstico na sessão e volta ao menu; nenhum item entra na fila, porque o mock não tem onde (C11 · G25)
- tudo confere: `Voltar ao menu`
- o `ENCERRAR` é o de toda tela com sessão: antes de homologar, a sessão abortada da T16 (G23); depois, o encerramento
- o voltar do Android faz o mesmo que a saída do rodapé (`logica.md`): na `00` e na `01`, o `Só registrar o diagnóstico`; no `02`, o `Voltar ao menu`

Corrigido no C11 pelas referências e pelas decisões do C0 (G1): a leitura ao abrir, o que diverge e o valor de cada linha, o que o `Só registrar` grava e o voltar.

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
- assertiva da sessão
- linha de conferência
- com contagem
- linha do histórico
- a lista de garagens
- encerrando
- pede o corte
- sem homologar
- linha de opção
- lista com contagem
- item feito
- item com ressalva

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

Medido nas 3 referências e construído no C11 (G1): as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- uma ação
- os glifos de estado
- os poços
- os marcadores
- com contagem
- linha de conferência
- nota com rótulo
- com contador neutro
- prova da cadeia

As diferenças da tela contra a folha viraram variante nomeada da peça (G11): o com contagem que confere, em lima e sem poço, 12 · 14 (`02`); a linha de conferência que diverge, com o traço no poço e o valor em `--tinta`, a última de 72, e a que a leitura ainda não alcançou (`00` a `02`); e a nota com rótulo do que a leitura achou, com a borda do poço, 10 · 12 (`01`). A legenda embaixo da lista é texto do conteúdo, não a *com legenda* do rodapé (T11-A14). A faixa é a *sessão aberta*, com a linha de baixo (G13). Na coluna do `componentes.md`, a T11 sai das linhas que nenhuma das três desenha.

## Histórias de usuário

- **HU-T11-1** — O app lê a string de versão como primeiro passo; ausente ou ilegível roda diff completo por conteúdo
- **HU-T11-2** — Vejo divergências agrupadas por bloco, em linguagem de negócio
- **HU-T11-3** — Escolho entre 3 ações nomeadas pelo efeito, incluindo *apenas registrar o diagnóstico*
- **HU-T11-4** — Corrigir arrasta as dependências automaticamente, na ordem canônica
- **HU-T11-5** — Índice que o firmware cria sozinho não é divergência; sem lista, vai para *não classificados*
- **HU-T11-6** — Escopo fixo em limpeza de configuração — limpeza total não é oferecida aqui
- **HU-T11-7** — Configuração conforme é declarada explicitamente; o diff sobe mesmo sem reenvio

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
