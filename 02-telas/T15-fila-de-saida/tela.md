# T15 · Fila de saída

Ver o que ainda vai subir pro servidor, e o que precisa do técnico.

| | |
|---|---|
| **Elemento-assinatura** | cada item com causa e ação — nada fica tentando sozinho em silêncio |
| **Chrome** | sem faixa ou com, conforme a sessão |
| **Semente no protótipo** | fila com dois itens · um com erro |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 0 · 4 — ver `estados.md` |

## O que se toca

- `Ressincronizar e reenviar` no item com erro
- `Voltar ao menu`

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- faixa · sem ação
- uma ação
- seção aberta do checklist
- seção recolhida
- vazio declarado
- o par comparado
- linha do histórico
- linha da fila · esperando
- a lista de garagens
- cadeia concluída
- cadeia recusada
- com contador neutro
- com contador de falha
- linha de opção
- cartão que pede ação
- botão secundário
- lista com contagem
- linha da fila
- linha da re-checagem

## Histórias de usuário

- **HU-T15-1** — Vejo por item: tipo, ativo, item de checklist, tamanho e progresso do corrente
- **HU-T15-2** — Sair da tela não interrompe o envio; a home mantém o contador
- **HU-T15-3** — Cada erro nomeia causa e ação; recusa do servidor nunca fica em retentativa silenciosa
- **HU-T15-4** — Fila vazia é declarada, com o horário do último envio
- **HU-T15-5** — A Seção F em re-checagem aparece em seção separada — não é item de fila
- **HU-T15-6** — Recebo notificação local quando a fila fica parada além do limite

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
