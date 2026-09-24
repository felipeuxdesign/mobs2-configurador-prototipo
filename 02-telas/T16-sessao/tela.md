# T16 · Sessão

Encerrar a sessão de configuração provando que a configuração sobreviveu ao desligar.

| | |
|---|---|
| **Elemento-assinatura** | a cadeia do encerramento e o autoteste assertiva por assertiva, com o valor lido |
| **Chrome** | faixa de sessão, até ela subir no fim |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 homologada |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 4 · 2 — ver `estados.md` |

## O que se toca

- `ENCERRAR` na faixa → o encerramento corre
- no passo do corte: o técnico desliga e religa a alimentação
- encerrada: `Voltar ao menu`
- ENCERRAR antes de homologar → os 4 passos da sessão abortada, sem confirmação

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- faixa · sem ação
- duas ações
- uma ação
- processo correndo
- com legenda
- assertiva da sessão
- linha de conferência
- aviso
- nota com rótulo
- linha do histórico
- a lista de garagens
- cadeia concluída
- cadeia recusada
- segmentado
- encerrando
- pede o corte
- sem homologar
- com contador neutro
- com contador de falha
- a marca no login
- campo
- campo focado
- linha de opção
- lista com contagem
- prova da sessão

## Histórias de usuário

- **HU-T16-1** — A faixa fica no topo de toda tela: abertura, módulo, tempo decorrido e a única saída
- **HU-T16-2** — Enquanto a sessão vive: canal reaberto sozinho, módulo e ativo travados, repouso inibido
- **HU-T16-3** — O encerramento executa 8 passos e mostra cada um
- **HU-T16-4** — Vejo o autoteste assertiva por assertiva, com o valor lido — nunca um "OK" agregado
- **HU-T16-5** — Falha do autoteste bloqueia a homologação, não o encerramento
- **HU-T16-6** — Sessão interrompida é oferecida de volta, com o ponto de retomada
- **HU-T16-7** — Descartar não desfaz o que foi gravado — descarta a intenção, e isso é registrado
- **HU-T16-8** — Canal aberto por sessão anterior é anomalia: o app fecha antes de começar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
