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

- `Refazer a leitura` → relendo → concluída. Um sinal responde a cada 600ms, na ordem da grade (`movimento.md`)
- `Ver os dados da CAN` → T07 com a leitura nova, que abre já lida (G27)
- `Voltar ao menu` → T04
- `ENCERRAR`, antes de homologar → a sessão abortada, e a releitura para (G23)

A grade monta os sinais do modelo do ativo da sessão, na ordem dos domínios e, dentro do domínio, o estático antes do dinâmico (T08·1). "doze" e "de 12" são o número de sinais, por extenso no texto (T08·2). O valor que volta é o do mock, o mesmo que a T07 mostra depois: o caso do ônibus, quando ele tem um, com a falha dando lugar ao nominal, porque a releitura é leitura nova (G21). Ao terminar, a leitura refeita fica gravada no estado único (T08·3). As regras estão no `06-prototipo/logica.md`.

## Peças do design system que esta tela usa

Medido nas referências no C8 (a lista do C0 trazia seis peças que não aparecem, T08-A4). Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta — sem a linha de baixo nas três referências; a peça fica com ela (G13)
- duas ações
- processo correndo — o primário desabilitado sozinho, sem a explicação embaixo, com o pé de 32 (T08-V1)
- cartões de valor — a grade de três colunas
- mostrador · apagado
- mostrador · relendo — com a unidade junto do valor
- mostrador · aceso — com a unidade junto do valor

E duas caixas desta tela, sem linha no `componentes.md`, na caixa de poço: a garantia do que fica (NADA SE PERDE) e o placar da releitura (5 de 12).

## Histórias de usuário

- **HU-T08-1** — Apago só os valores lidos da CAN, para reconferir do zero
- **HU-T08-2** — A tela declara o que apaga e o que preserva, em linguagem de campo, antes de executar
- **HU-T08-3** — Após o reset, o app relê e me devolve a T07 com a leitura em branco
- **HU-T08-4** — Sem mapa declarado, a ferramenta fica indisponível com motivo — o app não chuta índice

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
