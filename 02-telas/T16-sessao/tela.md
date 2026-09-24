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

- `ENCERRAR` na faixa → o encerramento corre: com a sessão homologada, os passos 1 a 7, um a cada 600 ms; ao fechar o 7, a faixa fica sem sessão e a tela passa pra *Sessão encerrada*, onde as 8 assertivas acendem a 400 ms, e a prova e o `Voltar ao menu` entram com a última (T16·4)
- no passo do corte, só quando o driver não reinicia por comando (T16·1): o técnico desliga e religa a alimentação; no protótipo, o módulo volta sozinho no ritmo do passo
- encerrada: `Voltar ao menu` → o menu sem sessão; o voltar faz o mesmo
- ENCERRAR antes de homologar → os 4 passos da sessão abortada, sem confirmação, e a *Sessão encerrada* sem homologar. Pelos diálogos do menu (`Encerrar a sessão e sair`, `Encerrar a sessão e trocar`), os 4 passos seguem pro destino deles (G23)
- sessão interrompida: `Retomar` → a cadeia da T09, no bloco que parou; `Descartar` → o menu sem sessão, sem item de fila (T16·5); o voltar não faz nada (T16·6)
- no encerramento e no autoteste, o voltar não faz nada

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
- encerrando
- pede o corte
- sem homologar
- com contador neutro
- com contador de falha
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
