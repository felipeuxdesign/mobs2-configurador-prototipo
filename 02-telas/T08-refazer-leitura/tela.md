# T08 · Refazer leitura da CAN

Apagar só os valores lidos e ler de novo, do zero.

| | |
|---|---|
| **Elemento-assinatura** | a lista do que apaga ao lado do que fica — o técnico sabe o que perde antes de tocar |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão com leitura feita |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 2 · 0 — ver `estados.md` |

## O que se toca

- `Refazer a leitura` → relendo → concluída
- `Ver os dados da CAN` → T07 com a leitura nova

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sem ação
- duas ações
- uma ação
- processo correndo
- com legenda
- a marca no login
- campo
- campo focado
- cartões de foto
- mostrador · apagado
- mostrador · relendo
- mostrador · aceso

## Histórias de usuário

- **HU-T08-1** — Apago só os valores lidos da CAN, para reconferir do zero
- **HU-T08-2** — A tela declara o que apaga e o que preserva, em linguagem de campo, antes de executar
- **HU-T08-3** — Após o reset, o app relê e me devolve a T07 com a leitura em branco
- **HU-T08-4** — Sem mapa declarado, a ferramenta fica indisponível com motivo — o app não chuta índice

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
