# T13 · Checklist

Fechar a homologação: o que o app já provou sozinho, e o que o técnico ainda precisa provar.

| | |
|---|---|
| **Elemento-assinatura** | o placar por seção — automático e manual separados — enchendo até o veredito |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · 31 itens |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 9 · 2 — ver `estados.md` |

## O que se toca

- tocar numa seção → ela aberta
- item automático reprovado → a tela que corrige
- item manual → responder: foto, ou não conforme com justificativa
- `Finalizar instalação` → homologado; com a Seção F falhando, pede a ciência

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- processo correndo
- com legenda
- diálogo
- diálogo sem saída
- diálogo com ciência
- seção aberta do checklist
- seção recolhida
- linha do histórico
- a lista de garagens
- leitura pequena
- leitura com mínimo
- cadeia concluída
- cadeia recusada
- segmentado
- encerrando
- pede o corte
- sem homologar
- placar da homologação
- com contador neutro
- com contador de falha
- a marca no login
- campo
- campo focado
- checkbox
- checkbox marcado
- justificativa
- linha de opção
- lista com contagem
- linha de seção do mapa
- cartões de valor
- cartão com barra
- cartão de configuração
- cartões de foto
- a seção aberta inteira
- cartões que esperam o ciclo

## Histórias de usuário

- **HU-T13-1** — Itens automáticos não são marcáveis à mão; "marcar todos" só nos manuais sem foto
- **HU-T13-2** — Item automático reprovado mostra o motivo e leva direto à tela que corrige
- **HU-T13-3** — Vejo progresso separado por seção e por tipo
- **HU-T13-4** — Posso responder manual como não conforme com justificativa → marca ressalvada, não bloqueia
- **HU-T13-5** — Finalizar exige 100% dos automáticos de A, C, D e 100% dos manuais com foto
- **HU-T13-6** — A Seção F não bloqueia; finalizar com ela falhando exige ciência marcada, com nome e hora
- **HU-T13-7** — Finalizado gera o relatório com seriais, versões, resultados, fotos, geolocalização e técnico
- **HU-T13-8** — A Seção E não é respondida aqui — item faltante me devolve ao ciclo dinâmico

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
