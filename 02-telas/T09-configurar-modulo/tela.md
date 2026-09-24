# T09 · Configurar módulo

Gravar os blocos no módulo, um de cada vez, cada um relido antes do próximo.

| | |
|---|---|
| **Elemento-assinatura** | a cadeia: o trilho que liga os blocos e só avança com o read-back confirmado |
| **Chrome** | faixa de sessão · a linha dos pinos embaixo do título |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · os blocos do mock |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 3 — ver `estados.md` |

## O que se toca

- a cadeia corre sozinha, um bloco por segundo: o próximo começa no instante em que o anterior confirma (T09·1). A tela entra no quadro da `00` — três relidos, o Leitor gravando — e anda Leitor → Eventos → Conexão; nada conta de zero ao abrir (C9 · G27)
- bloco recusado: `Tentar de novo`, do bloco recusado
- queda: `Reconectar e seguir`, do mesmo bloco
- cadeia concluída: `Voltar ao menu` → T04, de onde a Calibração segue. A 04 não desenha um `Calibrar`, e texto novo não entra (C9 · T09-A3, G1, G25)
- tentar sair no meio — o `ENCERRAR`, ou o `Voltar ao menu` com a cadeia parada — → a recuperação, até a Conexão gravar; nela, o `ENCERRAR` não faz nada, e `Continuar a gravação` retoma do mesmo bloco (G23). Depois da Conexão, o `ENCERRAR` é o de toda tela com sessão

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe. (C9, G10: a lista segue o medido no gate C0; saíram as dez que nenhuma referência da T09 desenha — faixa · sem ação, com legenda, falha, encerrando, pede o corte, sem homologar, com contador de falha, a marca no login, campo, campo focado.)

- barra do sistema
- faixa · sessão aberta
- duas ações
- uma ação
- processo correndo
- aviso
- processo parado
- cadeia concluída
- cadeia recusada — e, com a mesma peça, a cadeia correndo (00, elo de 86) e a pausada (02 e 03, elo de 68), variantes de altura (G11)
- a pré-condição dos pinos
- com contador neutro
- prova da cadeia

## Histórias de usuário

- **HU-T09-1** — Disparo e acompanho; não escolho conteúdo nem bloco
- **HU-T09-2** — A pré-condição de ocupação de pinos é a primeira linha da tela
- **HU-T09-3** — O bloco 1 declara o escopo e o que apaga/preserva. Sem confirmação em dois passos
- **HU-T09-4** — Cada bloco só inicia com o anterior confirmado por read-back
- **HU-T09-5** — Falha interrompe, nomeia a etapa em linguagem de campo e oferece repetir a etapa
- **HU-T09-6** — Queda no meio: retomo do mesmo bloco, de forma idempotente
- **HU-T09-7** — Ao final, read-back consolidado dos parâmetros críticos
- **HU-T09-8** — A versão dos 5 blocos é gravada como string composta após o read-back de cada bloco
- **HU-T09-9** — Nova instalação é transação inteira — abortar mantém na tela de recuperação até Conexão gravar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
