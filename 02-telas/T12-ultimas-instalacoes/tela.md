# T12 · Últimas instalações

Ver o que foi instalado nesta garagem e o que cada instalação provou.

| | |
|---|---|
| **Elemento-assinatura** | a trilha de evidência de cada instalação, etapa por etapa |
| **Chrome** | faixa quando há sessão |
| **Semente no protótipo** | garagem Várzea · cinco instalações · sessão M2C-0417 + RKT-8H42 (a 00 desenha a sessão aberta, G21) |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 2 — ver `estados.md` |

## O que se toca

- tocar numa instalação → o detalhe (a 01). A i-01, a do herói, mostra as sete etapas; as outras abrem o mesmo detalhe só com as linhas que o resumo delas sustenta — Configuração, Checklist, Autoteste e Recebimento (T12·2). O nome do técnico só aparece na instalação que tem a história inteira no aparelho, a de hoje: o resumo das outras não diz quem instalou. Embaixo da placa, as outras repetem a linha de baixo da lista (`M2C-0312 · 16:05`, `M2C-0362 · há 9 dias`): o *quando* do detalhe só tem texto pra hoje (G25). O 01 aberto pelo endereço mostra a mais nova da garagem
- `Voltar às instalações` → a lista (a 00)
- `Voltar ao menu` → T04 · `ENCERRAR`, antes de homologar: a sessão abortada da T16 (G23); depois, o encerramento
- o voltar do Android (no computador, o Esc) faz o mesmo que a saída do rodapé: no detalhe, volta às instalações; na lista, ao menu

**A lista.** As instalações dos ativos da garagem do contexto, das mais novas às mais velhas, em quatro grupos pela idade: até `hoje` dias é HOJE, até `ontem` é ONTEM, até `esteMesAte` é ESTE MÊS, e acima é MAIS DE UM MÊS — o corte nomeado do mock (`criteriosRegra.gruposIdade`, T12·1), e não o calendário. Grupo sem instalação não aparece. Em HOJE e ONTEM a linha de baixo diz o módulo e a hora; nos outros, o módulo e há quantos dias. O veredito é o estado da instalação: os três desenhados (aprovada, aguardando validação, falha reconhecida) e, de outra garagem, *aprovada após reprocessamento* e *reprovada*, com o nome da máquina de estado e o glifo pela natureza (T12·3). A ressalva, que combina com qualquer estado, não aparece: o veredito é o estado, e nenhuma referência nem texto desenha a ressalva (G25). A garagem sem instalação mostra o vazio declarado no lugar dos grupos (a 02); sem rede, o aviso da consulta anterior entra em cima da lista (a 03).

Corrigido no C11 pelas referências e pelas decisões do C0 (G1): a semente com a sessão aberta, o corte dos grupos, o detalhe das instalações sem as etapas, o autor da instalação e o voltar do Android.

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sem sessão
- faixa · sem ação
- uma ação
- assertiva da sessão
- linha de conferência
- aviso
- vazio declarado
- linha do histórico
- a lista de garagens
- encerrando
- pede o corte
- sem homologar
- com contador neutro
- com contador de falha
- linha de opção
- linha de ônibus
- lista com contagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

Medido nas 4 referências e construído no C11 (T12-A1, G1): as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- linha tocável · normal e pressionada (o toque da linha do histórico)
- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- uma ação
- com contador neutro
- linha do histórico
- assertiva da sessão
- aviso
- vazio declarado
- os glifos de estado
- os poços
- os marcadores

Saíram as que nenhuma das quatro referências desenha (faixa · sem ação, linha de conferência, a lista de garagens, encerrando, pede o corte, sem homologar, com contador de falha, linha de opção, linha de ônibus, lista com contagem), e entrou a faixa · sessão aberta, que a 00, a 01 e a 03 desenham. As variantes nomeadas (G11) ficam declaradas na peça: a linha do histórico com o veredito pela natureza do estado (o que espera em `--tinta`, a falha em `--vermelho`) e com a linha de baixo em 12 quando diz há quantos dias (G12, T12-V2); o contador neutro forte, em 700, no veredito do detalhe; a assertiva da sessão com o valor longo em duas linhas. Peça só da tela: o grupo por idade, o rótulo em cima do cartão (`app/src/telas/T12/pecas.jsx`), e a linha módulo · quando · técnico embaixo do cabeçalho do detalhe.

## Histórias de usuário

- **HU-T12-1** — Vejo por ativo: última intervenção, posicionamento, eventos, viagens e status geral
- **HU-T12-2** — A janela de posicionamento é derivada do pacote (`3 × intervalo + 2 min`), não fixa
- **HU-T12-3** — Os 10 min aparecem como teto de espera, não como critério
- **HU-T12-4** — Critério sem parâmetro declarado fica indisponível com motivo
- **HU-T12-5** — Offline mostro o último resultado conhecido com a data da consulta
- **HU-T12-6** — Falha por rede vira pendente com re-checagem por 24 h, não reprovação imediata

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
