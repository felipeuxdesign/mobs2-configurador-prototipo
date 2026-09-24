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
- na falha de rede: `Tentar de novo`
- pacote vencido: `Sincronizar agora` ou `Trocar de garagem`
- pacote de 4 dias: `Sincronizar agora` ou `Continuar com este pacote`

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema sem sessão
- duas ações
- uma ação
- processo correndo
- com legenda
- falha
- aviso
- processo parado
- linha do histórico
- a lista de garagens
- cadeia concluída
- cadeia recusada
- encerrando
- pede o corte
- sem homologar
- a marca no login
- campo
- campo focado
- linha de opção
- lista com contagem

## Histórias de usuário

- **HU-T03-1** — Vejo progresso, volume e tempo estimado; sincronização é incremental por versão
- **HU-T03-2** — Falha de rede mostra erro com Reconectar, sem perder progresso parcial
- **HU-T03-3** — A versão do manifesto é gravada em toda evidência
- **HU-T03-4** — Pacote > 7 dias bloqueia; a partir de 3 avisa sem bloquear. Idade conta do carimbo do servidor

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
