# T08 · Refazer leitura da CAN

Apagar só os valores lidos e ler de novo, do zero.

| | |
|---|---|
| **Elemento-assinatura** | a lista do que apaga ao lado do que fica — o técnico sabe o que perde antes de tocar |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 com a leitura feita |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 2 · 0 — ver `estados.md` |

## O que se toca

- enquanto a releitura corre, o ENCERRAR da faixa fica desabilitado e em tinta apagada
- `Refazer a leitura` → relendo → concluída. Um sinal responde a cada 600ms, na ordem da grade (`movimento.md`)
- `Ver os dados da CAN` → T07 com a leitura nova, que abre já lida (G27)
- `Voltar ao menu` → T04
- `ENCERRAR`, antes de homologar → a sessão abortada (G23) · **relendo, ele fica apagado e não faz nada**, como o voltar do Android (a lei 17, decisão do diretor de 25/09): a releitura não para no meio
  - **no protótipo** (decisão 36): fora da releitura, antes de homologar, o ENCERRAR abre o diálogo *Encerrar sem homologar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela — a resposta do arquiteto de 26/09 · o `Encerrar sem homologar` roda os 4 passos da T16 · relendo, ele segue apagado, e o diálogo não abre
- o voltar do sistema (no computador, o Esc) faz o `Voltar ao menu` antes e depois da releitura; relendo, a tela diz *não saia da tela* e não tem saída, e ele não faz nada (`06-prototipo/logica.md` · O voltar do Android)

A grade monta os sinais do modelo do ativo da sessão, na ordem dos domínios e, dentro do domínio, o estático antes do dinâmico (T08·1). "doze" e "de 12" são o número de sinais, por extenso no texto (T08·2). O valor que volta é o do mock, o mesmo que a T07 mostra depois: o caso do ônibus, quando ele tem um, com a falha dando lugar ao nominal, porque a releitura é leitura nova (G21). Ao terminar, a leitura refeita fica gravada no estado único (T08·3). As regras estão no `06-prototipo/logica.md`.

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- uma ação
- com legenda
- mostrador · apagado
- mostrador · relendo
- mostrador · aceso

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

Medido nas referências no C8 (a lista do C0 trazia seis peças que não aparecem, T08-A4). Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- processo correndo
- os marcadores
- mostrador · apagado
- mostrador · relendo
- mostrador · aceso

No acerto do design system pelo medido (G10), a lista ficou só com os nomes das linhas do `componentes.md`: entraram as de toque da folha 1 (o primário nos três estados e o link) e o marcador da folha 3, o LED da faixa. As anotações viraram variante nomeada da peça (G11), declarada lá: o processo correndo sem a explicação, o primário sozinho fechando em 32 (T08-V1), e a unidade junto do valor no mostrador relendo e aceso. A faixa sem a linha de baixo nas três referências é desvio, não variante: a peça fica com ela (G13). Saiu 'cartões de valor': nenhuma das três desenha o cartão de valor da folha 7, e os doze mostradores ficam na grade de cartões em três colunas, peça interna sem linha própria (`checklist/CartaoValor.jsx · GradeCartoes`). Na coluna do `componentes.md`, a T08 saiu de 7 linhas que nenhuma das três desenha (faixa · sem ação, uma ação, com legenda, a marca no login, campo, campo focado e cartões de foto) e entrou na faixa · sessão aberta e nos marcadores.

E duas caixas desta tela, sem linha no `componentes.md`, na caixa de poço: a garantia do que fica (NADA SE PERDE) e o placar da releitura (5 de 12).

## Histórias de usuário

- **HU-T08-1** — Apago só os valores lidos da CAN, para reconferir do zero
- **HU-T08-2** — A tela declara o que apaga e o que preserva, em linguagem de campo, antes de executar
- **HU-T08-3** — Após o reset, o app relê e me devolve a T07 com a leitura em branco
- **HU-T08-4** — Sem mapa declarado, a ferramenta fica indisponível com motivo — o app não chuta índice

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
