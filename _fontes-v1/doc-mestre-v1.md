# Doc mestre — App Configurador

> A espinha de gestão. Diretor e arquiteto releem toda semana.
> Fonte de domínio: `Requisitos-App-Configurador-v1.md` (fonte da verdade) + `dominio-app-configurador.md` (índice).
> Método: skill `craftmobs2`. Executor: **Claude Design**.
>
> `[PROPOSTO]` = derivado pelo arquiteto, aguarda OK do diretor. `[ABERTO]` = sem decisão.
> **Números de cycle são provisórios** até o inventário do bundle existir (passo 4 do Dia Zero).

---

## 0. Abertura — as decisões de partida

*Respondidas em 26/08/2026. Se algo mudar, **acrescentar com data e motivo** — nunca sobrescrever.*

| | Resposta |
|---|---|
| **Fonte de requisitos** | **Não existia skill de produto.** Criada no Dia Zero a partir de `Requisitos-App-Configurador-v1.md` (1600 linhas, rev 4 de 21/08/2026) → `dominio-app-configurador.md` |
| **Aprovador** | **Thacyo (PM)** — dono do requisito, decide ambiguidade que os requisitos não resolvem |
| **Executor / substrato** | **Claude Design.** Selo: pill · Memória: caption + CHANGELOG · Reversibilidade: backup do ZIP anterior · Vê o que constrói: **sim** |
| **Herança — craft** | **Vídeo Telemetria.** Referência máxima da casa, lockado, código auditado no fonte |
| **Herança — bundle** | `mobs2-ds-9387d652...` (tokens) + `waste-ds-web-270e1d04...` (componentes `.mb-*`), ambos do ZIP do VT |
| **Form factor** | **App mobile, frame único 360×800.** Sem varredura de viewport |
| **Critério de pronto** | `[PROPOSTO]` os 5 fluxos navegáveis ponta a ponta em 360×800, light e dark, com o fluxo-herói de nova instalação demonstrável do login ao autoteste — **e o vocabulário de campo auditado tela por tela** |

### Circuito de decisão

```
executor sinaliza empate  →  arquiteto (Claude)  →  triagem
                                                     ├─ craft/arquitetura → arquiteto resolve
                                                     └─ regra de negócio  → diretor → Thacyo
```

**Três decisões já esperando endereço** desde a rev 4: R1, R2 e R3. Agora têm dono.

- **R1 e R2** travam o C23. Antes de chegar lá, precisam voltar do Thacyo.
- **R3** é barato e destrava craft de tela em todo o produto — vale levar junto.

Quando o executor sinalizar no meio de um cycle, a resposta precisa vir em **horas, não semanas** — cycle parado esperando decisão é o custo que a sinalização existe pra evitar.

### ⚠ Uma lacuna de abertura

**Critério de pronto é proposta minha,** não acordo. Ele decide o que é polish necessário e o que vai pra prateleira; sem o Thacyo confirmar, a fase 7 fica sem régua.

> Um substrato foi considerado e descartado: **IDE / Claude Code**. A conversa de arquitetura levantou os ganhos reais (git no lugar do backup, gates como script, grep nativo antes de editar) e o custo decisivo — o executor não vê o que constrói, o que obrigaria screenshot por cycle. **Decidido por velocidade e domínio da ferramenta**, com a IDE explicitamente adiada para o próximo projeto. Registrado aqui para não ser rediscutido.

---

## 1. Visão do produto e o usuário

Aplicativo mobile de **instalação, configuração e homologação** de módulos de telemetria embarcados.

**O usuário é técnico de campo terceirizado, sem conhecimento de lógica `.xvm`.** Ele trabalha embaixo de um ônibus, no pátio, na obra, frequentemente sem rede, com uma mão no módulo e outra no aparelho. Cada decisão de tela responde a essa pessoa.

**O que o produto entrega ao gestor** não é "configuração enviada" — é **prova de que este módulo, neste ativo, ficou funcionando**: read-back, foto, autoteste de instalação e confirmação de recebimento no servidor.

**O tom:** ferramenta de trabalho, não painel. Nenhuma tela celebra. Nenhuma tela esconde falha.

---

## 2. Identidade, stack e arquitetura

Tokens **auditados no fonte** em `_ds/mobs2-ds-9387d652.../tokens/tokens.css` (não na pasta de DS — passo 2 do Dia Zero cumprido).

| Item | Decisão |
|---|---|---|
| **Cor de marca** | **Mobs2 mãe / VT** — roxo `#402070` + lima `#AAEF00` |
| **Primary** | `#402070` (`--brand-700`) **direto** — o próprio arquivo declara AA forte sobre branco |
| **Primary dark** | `#A78BFA` (lavanda). **Não é proposta: está no código**, via `[data-theme="dark"]` |
| **Acento** | `--brand-accent` `#AAEF00`. ⚠ **Lima é acento sobre roxo/escuro, nunca sobre branco** |
| **Bundles** | `_ds/mobs2-ds-9387d652...` (tokens da mãe) + `_ds/waste-ds-web-270e1d04...` (componentes `.mb-*`). Os dois já validados em produção no VT |
| **Form factor** | **app mobile, frame único 360×800.** Sem varredura de viewport, sem tablet, sem desktop |
| **Tema** | **light e dark, seguindo o sistema do aparelho. Sem toggle no app** — ver D-06 |
| **NS de storage** | `[PROPOSTO]` **`m2cf-`** (configurador), seguindo `m2vt-` / `m2if-` |
| **Stack** | sem build · React via Babel inline · vanilla CSS + custom properties · manifesto único |
| **Idioma v1** | PT-BR. Motor de i18n desde o C2, tradução na fase final |

### ✅ O que o ZIP do VT entrega de graça

O pacote não trouxe só tokens. Encurta três passos do Dia Zero:

| Peça | Efeito |
|---|---|---|
| `ds-video-telemetria/` completa (11 arquivos na estrutura canônica) | **modelo da RAG** — o passo 5 vira adaptação, não criação. Inclui um `handoff-dev.md`, que a skill lista como pendência aberta do DS de família |
| `templates/NN-exemplo.html` + `ExemploScreen.jsx` | o rito de tela nova nasce pronto |
| `SystemStateScreen.jsx` + `notifStore` | os 5 estados de sistema portam direto — **C2 fica mais barato** |
| `controladora-kit/` + os handoffs de chrome | controladora com a Onda 1 já aplicada |

Ainda vale o ritual: **carregar cada bundle isolado** e confirmar que só publica namespace. Bundle com self-mount quebra dentro do manifesto único — lição paga.

### ⚠ Port de form factor, não rebrand

O VT é **web denso, desktop-primário**. Este produto é 360×800. Grep no bundle confirmou: **não existe precedente mobile** — os únicos `@media` são breakpoints de web.

| Atravessa | Não atravessa |
|---|---|---|
| tokens (cor, tipo, espaço, raio, sombra, dark) | `.mb-table` e densidades B2B |
| dicionário de ícones | contrato de filtros de toolbar |
| motor de i18n | layout de relatório |
| regras de voz PT-BR | 3 viewports |
| cascata de vazios, modais, guarda de form | tabela que permanece tabela |

**Este produto vai definir o vocabulário de componente mobile da família.** MyMobs é a única outra linha app e está com primary e NS *a definir*. Consequência de gestão: componente que nascer aqui é candidato a DS de família — registrar na sessão de portabilidade (fase final), não durante.

---

## 3. Hierarquia e modelo de navegação

```
Sessão de acesso (login · 7 dias · só encerra por Sair)
   └── Contexto: empresa / UC / UO          ← filtro-raiz, sempre visível no cabeçalho
         └── Pacote de sincronização         ← trava tudo se > 7 dias
               └── Sessão de configuração    ← abre ao conectar, faixa no topo de TODA tela
                     ├── Módulo   ─┐ travados na sessão
                     └── Ativo    ─┘
```

**As duas sessões são objetos distintos e nunca se chamam "sessão" sozinhas.** Encerrar a de configuração não desloga ninguém.

**Gating — o que desabilita o quê:**

| Depende de | Ferramentas desabilitadas sem ele |
|---|---|---|
| módulo conectado | Dados da CAN · Configurar módulo · Reset de leitura · Calibração · Manutenção |
| ativo selecionado | Configurar módulo · Reset de leitura · Calibração · Checklist |
| rede | Últimas instalações |

Ferramenta desabilitada **sempre mostra o motivo**. Nunca cinza mudo.

**Sem tela-meta.** A home é a primeira tela real (T04). Não existe índice de telas dentro do produto.

---

## 4. Escopo v1 — 16 telas-mãe, 5 fluxos

| Fluxo | Telas-mãe |
|---|---|---|
| 1 · Acesso e preparo | T01 · T02 · T03 |
| 2 · Conexão e vínculo | T05 · T06 |
| 3 · Configuração | T07 · T08 · T09 |
| 4 · Calibração e ciclo dinâmico | T10 · T14 |
| 5 · Homologação, manutenção e conferência | T11 · T12 · T13 · T15 · T16 |

Transversal a todos: **T04 (home)** e a **faixa de sessão (T16)**.

A rev 4 do protótipo em wireframe conta **52 telas** — as 16 mães mais sub-estados. A enumeração dos 52 sai do `Wireframe-App-Configurador.html`, que **ainda não está no projeto**.

### Fora da v1 — com nome

| Item | Motivo |
|---|---|---|
| Configuração de câmeras e DSM | fase seguinte; nenhum equipamento Virloc/Vircom/Vircone faz DSM |
| Console de logs no app | logs são geridos no M2 |
| Cadastro de ativo ou script em campo | sem cadastro, o fluxo trava (princípio 5) |
| Modo listagem de PGN para ativo desconhecido | consequência do acima |
| Histórico de intervenções para o técnico | é tela web do gestor |
| Assinatura do responsável no local | custo alto, ganho probatório baixo; reavaliar v2 |

---

## 5. Inventário de telas

Complexidade pela regra de dimensionamento: **assembly = 1 cycle · componente novo ou lógica assíncrona = 2–3 · transversal = fatiar com gate.**

| Tela | Sub-estados | Complexidade | Componentes que nascem |
|---|---|---|---|
| **T04** Home | 1 | ★★ **pattern-setter** | cartão de ferramenta · semáforo de status · gating com motivo · badge contador · aviso persistente |
| **T01** Login | 6 | ★★★ | campo de form · seletor de DDI com busca + máscara derivada · input de 6 dígitos · medidor de força · checklist auto-marcando |
| **T02** Contexto | 2 | ★ | lista com busca · modal de confirmação |
| **T03** Sync | 2 | ★★ | barra de progresso com volume e ETA |
| **T05** Conectar | 4 | ★★★ **pattern-setter** | lista de dispositivos · **item de checagem (lido · esperado · semáforo)** · estado de falha com causas |
| **T06** Ativo | 3 | ★★ | lista com busca multi-campo · comparação de vínculo · ação inline de recuperação |
| **T07** CAN estática | 1 | ★★ | grupo por domínio · sinal com faixa esperada (herda de T05) |
| **T08** Reset de leitura | 2 | ★ | declaração apaga/preserva |
| **T09** Configurar | 3 | ★★★ ▲ | progresso por bloco em cadeia · tela de recuperação transacional |
| **T10** Calibração | 3 | ★★★ | procedimento guiado · captura de foto · conversão de unidade |
| **T11** Manutenção/diff | 3 | ★★★ | lista de divergência por bloco · seletor de ação por efeito |
| **T12** Últimas instalações | 1 | ★★ | linha de ativo com 4 status |
| **T13** Checklist | 5 | ★★★ ▲ | seção com progresso duplo · item automático não marcável · item manual com foto |
| **T14** Ciclo dinâmico | 4 | ★★★ ▲ | cronômetro · fila drenando · comparação lido vs esperado |
| **T15** Fila de saída | 3 | ★★ | item de fila com progresso próprio · erro com causa e ação |
| **T16** Sessão | 4 | ★★★ ▲ | **faixa de sessão (transversal)** · encerramento de 8 passos · autoteste assertiva por assertiva |

**Os dois pattern-setters:** T04 define o vocabulário de cartão, status e gating. T05 define o **item de checagem** — lido, esperado, semáforo — que T07, T13 e o autoteste todos reusam. Errar esses dois custa caro em cascata; acertá-los paga as outras catorze.

---

## 6. Setup canônico / mock — o que toda auditoria confere

O mock é **obra canônica**, não enchimento. Contrato completo vai para `dados-mock.md` no passo 8; aqui ficam as âncoras que a auditoria recomputa.

### Números-âncora `[PROPOSTO]`

| Âncora | Valor | Por que existe |
|---|---|---|---|
| Empresas / UC / UO | 1 empresa · 2 UC · 3 UO | T02 precisa de lista com hierarquia real, não um item |
| Ativos | **24** | T06 precisa de busca que valha a pena; T12 precisa de lista com scroll |
| Módulos cadastrados | **20** | 4 ativos sem módulo vinculado exercitam a trava |
| Módulos **fora** do cadastro | 2 seriais | exercita *serial não cadastrado* (letra como reserva de nomeação) |
| Modelos | VL06 (FULL, ECO, CAN-BT, CAN) + VL08 | as 4 variantes divergem em CAN, sem fio e pulsos — a matriz precisa das quatro |
| Modelo sem driver v1 | 1 VC07 | exercita *modelo sem driver*, que é bloqueio com mensagem distinta |

### Gate de cobertura temporal — **rodar ANTES do C1**

Este produto tem três telas que morrem com mock de um dia só:

| Tela | Precisa de |
|---|---|---|
| **T03** | pacote com idade variável: fresco · 3 dias (aviso) · 7 dias (bloqueio) |
| **T12** | intervenções espalhadas em semanas, não todas de "hoje" |
| **T15** | itens de fila com "tempo parado" diferente entre si |

> **Lição paga — C26.5 do Infra:** o contrato prometia 30 dias, o mock nasceu com um dia só, e isso passou **20 cycles** sem ninguém notar, porque todas as telas eram do "hoje". A primeira tela mensal abriu um calendário vazio.
>
> Gate: script Node conta dias distintos e recomputa as âncoras. Reprovar o Dia Zero se não passar.

### A âncora que decide T12 e T13

**O mock precisa conter pelo menos uma instalação em cada um dos 6 estados** da máquina: aprovada · aguardando validação · encerrada com falha reconhecida · aprovada após reprocessamento · reprovada · ressalvada.

Sem isso T12 não é construível e T13 não tem contra o que ser conferido. É a âncora mais importante do contrato.

---

## 7. Plano de cycles — 8 fases, ~33 cycles

▲ = crítico (auditoria obrigatória aqui). Contagem provisória até o inventário do bundle.

**Coluna Modelo** — dois níveis, e o nível nunca é nome de modelo, porque nome envelhece e o plano de cycles não. Quem mapeia nível → modelo é o diretor, no momento de rodar.

- **MÁX** — craft visual de verdade · julgamento de composição · toca várias telas · gramática ou componente que nasce agora · motor ou gerador que precisa fechar número · **todo cycle com gate**
- **PADRÃO** — aplicar texto ou valor já decidido · remoção com escopo fechado · sincronizar documentação · craft de uma coisa só, com diagnóstico pronto

Na dúvida, MÁX: modelo forte em cycle simples custa desprezível; modelo fraco em cycle de julgamento custa uma rodada inteira de craft.

> **A conta deste projeto: 22 MÁX contra 11 PADRÃO.** O desequilíbrio não é excesso de zelo — é diagnóstico. Não existe canon mobile na família para herdar, então a maioria dos cycles **faz nascer gramática** em vez de aplicar gramática existente. Os 11 PADRÃO são as exceções: telas que remontam padrão já estabelecido em cycle anterior.
>
> Consequência de orçamento: este projeto consome mais MÁX que um irmão web, e isso é estrutural, não corrigível por planejamento.

### Fase 0 — Fundação (C1–C3)

| Cycle | Entrega | HUs | Modelo |
|---|---|---|---|
| **C1** ▲ | **Shell de fábrica**: chrome do app (faixa de status por id de tela · faixa de sessão · header com contexto), todas as 16 rotas com "Em breve", pill viva, light/dark, tokens do VT aplicados (roxo `#402070` / dark `#A78BFA`). **Nenhuma tela real.** | — | **MÁX** |
| **C2** | Mocks núcleo + motor de i18n + os 5 estados de sistema (**portados** do `SystemStateScreen` do VT, não construídos) + `notifStore` | — | **MÁX** |
| **C3** ▲ | **T04 Home — pattern-setter**: cartão de ferramenta, semáforo, gating com motivo, badge de fila, aviso persistente | T04-1..5 | **MÁX** |

### Fase 1 — Acesso e preparo (C4–C7)

| Cycle | Entrega | HUs | Modelo |
|---|---|---|---|
| **C4** ▲ | **T01 login — pattern-setter de formulário**: campo, botão, erro de campo, lembrar usuário | T01-1..4, 11 | **MÁX** |
| **C5** | T01 recuperação: escolha de canal, seletor de DDI com máscara derivada, código de 6 dígitos | T01-5..7 | **MÁX** |
| **C6** | T01 criar senha (medidor + checklist auto-marcando), modal, "não recebi o código" | T01-8..10 | **MÁX** |
| **C7** | T02 contexto + T03 sync, com as três idades de pacote | T02-1..4, T03-1..4 | PADRÃO |

### Fase 2 — Conexão e vínculo (C8–C11)

| Cycle | Entrega | HUs | Modelo |
|---|---|---|---|
| **C8** | T05 busca e conexão, com estado vazio instrutivo (alimentação, cabo, distância) | T05-1, 8 | PADRÃO |
| **C9** ▲ | **T05 pré-checagem — pattern-setter do item de checagem.** 12 itens com resultado. É o modelo que T07, T13 e o autoteste reusam | T05-2, 7 | **MÁX** |
| **C10** | T05 estados de falha: causa única com 3 checagens · dois bloqueios distintos · caminho de firmware | T05-3..6, 9 | PADRÃO |
| **C11** | T06 ativo: busca multi-campo, vínculo, divergência de chassi, ocupação de pinos com *reconectar sem fio* | T06-1..7 | **MÁX** |

### Fase 3 — Configuração (C12–C16)

| Cycle | Entrega | HUs | Modelo |
|---|---|---|---|
| **C12** | T07 CAN estática: grupos por domínio, sinal com faixa e semáforo, dinâmicos como *aguardando* | T07-1..3 | PADRÃO |
| **C13** ▲ | T09 cadeia de 6 blocos: progresso, bloco corrente, read-back por bloco, string de versão | T09-1..4, 7, 8 | **MÁX** |
| **C14** ▲ | T09 falha e **recuperação transacional**: repetir a etapa, retomada idempotente, tela que não deixa sair | T09-5, 6, 9 | **MÁX** |
| **C15** | T08 reset de leitura: declaração apaga/preserva, indisponível com motivo | T08-1..4 | PADRÃO |
| **C16** | T16 faixa de sessão (transversal) + retomada ao reabrir o app | T16-1, 2, 6..8 | **MÁX** |

> **C16 é transversal** — toca todas as telas construídas. Gate obrigatório: inventário antes de tocar.

### Fase 4 — Calibração e ciclo dinâmico (C17–C20)

| Cycle | Entrega | HUs | Modelo |
|---|---|---|---|
| **C17** | T10 lista de grandezas, com justificativa quando indisponível | T10-1, 8 | PADRÃO |
| **C18** | T10 fator guiado + semente com foto do painel e conversão de unidade | T10-2..7 | **MÁX** |
| **C19** ▲ | T14 ciclo dinâmico: 4 blocos, cronômetro dos 120 s, fila drenando | T14-1..4, 7 | **MÁX** |
| **C20** | T14 identificador: lido ao lado do esperado, solicitar correção de cadastro | T14-5, 6 | PADRÃO |

### Fase 5 — Homologação (C21–C24) ▲ fase crítica

| Cycle | Entrega | HUs | Modelo |
|---|---|---|---|
| **C21** | T13 seções A, C, D: automáticos não marcáveis, item que leva à tela que corrige | T13-1..3 | **MÁX** |
| **C22** | T13 seções B e E: manuais com foto, herança da foto de T10, devolução ao ciclo | T13-4, 8 | PADRÃO |
| **C23** ▲ | T13 finalizar: máquina de 6 estados, ciência da Seção F, relatório de homologação | T13-5..7 | **MÁX** |
| **C24** ▲ | **T16 encerramento de 8 passos + autoteste assertiva por assertiva com o valor lido** | T16-3..5 | **MÁX** |

> **R1 e R2 precisam estar fechados antes do C23.** As duas decidem o critério de finalização e o que *autoteste íntegro* significa. Sem elas, C23 e C24 não têm contra o que ser construídos — e são as duas telas que definem se uma instalação é homologada.

### Fase 6 — Manutenção e conferência (C25–C28)

| Cycle | Entrega | HUs | Modelo |
|---|---|---|---|
| **C25** | T11 leitura da string de versão + divergências agrupadas por bloco | T11-1, 2, 5 | **MÁX** |
| **C26** | T11 três ações nomeadas pelo efeito + arraste + *não classificados* | T11-3, 4, 6, 7 | PADRÃO |
| **C27** | T12 últimas instalações, com os 6 estados e janela derivada | T12-1..6 | PADRÃO |
| **C28** | T15 fila de saída: 3 estados, feedback por item, erro com causa e ação | T15-1..6 | **MÁX** |

### Fase 7 — Sistema, sweep & lock (C29–C33)

| Cycle | Entrega | Modelo |
|---|---|---|
| **C29** | Sweep dirigido pela auditoria acumulada: dark, densidade, faixa de status por id de tela | **MÁX** |
| **C30** | Polish + microcopy + **auditoria de vocabulário proibido** (o fecho do R3, tela por tela) | **MÁX** |
| **C31** | i18n — tradução (motor já existe desde o C2) | PADRÃO |
| **C32** | Lock: checklist por tela + demo ensaiada dos fluxos-herói | **MÁX** |
| **C33** | Sessão de portabilidade — o que deste produto sobe pro DS de família (é o primeiro mobile maduro da casa) | **MÁX** |

**Contingência:** +3 a +5 cycles. Nenhum projeto da casa fechou na conta inicial.

---

## 8. Decisões cravadas (reversíveis — vetar é uma linha)

| # | Decisão | Data |
|---|---|---|---|
| D-01 | Executor: **Claude Design**. Artefato sem build | 26/08 |
| ~~D-02~~ | ~~Identidade: Bus `#412B7B`~~ | **revogada 26/08** |
| ~~D-03~~ | ~~Estrutura: bundle do Waste Web, tokens Bus por cima~~ | **revogada 26/08** |
| **D-02b** | Identidade: **Mobs2 mãe / VT** — roxo `#402070`, dark `#A78BFA`, acento lima `#AAEF00` | 26/08 |
| **D-03b** | Bundles: `mobs2-ds-9387d652...` + `waste-ds-web-270e1d04...`, ambos do ZIP do VT | 26/08 |
| ~~D-04~~ | ~~Um form factor só — **393×852**~~ | **revogada 28/08** — 393×852 é resolução de iPhone, e a distribuição planejada é APK Android |
| **D-04b** | **Um form factor só — 360×800**, frame único. Baseline Android mais estreito (Galaxy S23/S24): desenhar na restrição garante que funciona em 393 e 412 também. Sem viewport sweep, sem tablet | 28/08 |
| D-05 | Fonte da verdade é o `.md` de requisitos; o `dominio-*.md` é índice derivado | 26/08 |
| **D-06** | **Light e dark, seguindo o sistema do aparelho. Sem toggle de tema no app.** O técnico trabalha nas duas condições (sol de pátio e embaixo do veículo); dark já existe no bundle; e seletor de tema é escolha que o princípio 2 manda não oferecer. O atalho light/dark da controladora é para revisão, não para o técnico | 26/08 |
| **D-07** | **Lima (`--brand-accent`) só sobre roxo ou escuro.** Nunca como cor de ação sobre fundo claro — o próprio `tokens.css` declara a restrição | 26/08 |

---

## 9. Pendências abertas — com dono

| # | Pendência | Dono | Trava |
|---|---|---|---|
| P1 | **R3** — enumeração fechada do vocabulário proibido (`APN`, `BLE`, `iButton`) | **Thacyo** | craft de tela em todo o produto; audita no C30 mas orienta desde o C1 |
| P2 | **R1 e R2** — critério de finalização e o que *autoteste íntegro* significa | **Thacyo** | **C23 e C24** |
| ~~P3~~ | ~~Pacote de DS não anexado~~ | — | **resolvida 26/08** — ZIP do VT recebido e auditado no fonte |
| P4 | `Wireframe-App-Configurador.html` (rev 4, 52 telas) não está no projeto | **diretor** | fecha a contagem de sub-estados e o mapa de navegação |
| P5 | NS de storage `m2cf-` — confirmar | diretor | CLAUDE.md |
| P6 | Linha do portfólio: produto próprio herdando a paleta da mãe, ou variante do VT? | diretor | nome do produto e a linha da tabela do portfólio |
| P7 | Navegação: só faixa + header, ou existe barra inferior? | arquiteto propõe, diretor decide | C1 |

---

## 10. Quality bar de lock — binário, por tela

Uma tela só lockou quando **todas** respondem sim:

- [ ] Renderiza em 360×800 sem corte e sem scroll horizontal
- [ ] Light **e** dark conferidos
- [ ] Faixa de status com o id de tela correto (faixa branca em tela `--background` é bug conhecido)
- [ ] Cascata de vazios completa, cada degrau com ação de recuperação
- [ ] Loading e erro existem, não são "depois"
- [ ] 5 estados dos interativos (default · hover · focus-visible · active · disabled)
- [ ] Faixa de sessão presente e coerente com o estado
- [ ] Zero hex fora dos tokens (grep)
- [ ] Zero `Math.random`, zero `Date.now` (grep)
- [ ] Todo número deriva do mock, nenhum literal em tela
- [ ] **Nenhum termo do vocabulário proibido** (grep da lista do R3)
- [ ] Strings em nós próprios, i18n-ready
- [ ] Voz: sentence case, sem `!`, sem emoji, verbo no infinitivo
- [ ] Pill bumpada, caption confessando o que ficou de fora

---

## 11. Riscos do protótipo

Distintos dos riscos do produto (§10 dos requisitos, 15 itens).

| # | Risco | Mitigação |
|---|---|---|---|
| ~~1~~ | ~~Sem código pra auditar~~ | **morto 26/08** — VT auditado no fonte, tokens confirmados |
| **1b** | *(novo, criado pela decisão)* **O bundle traz componentes web-densos que existem mas não podem ser usados.** `.mb-table`, densidades B2B, toolbar de filtros — tudo carregado, tudo à mão. O executor vai alcançar o `.mb-table` porque ele está ali | **Entra no anti-slop do CLAUDE.md por nome**: componente do bundle disponível e proibido neste form factor. Grep de auditoria por uso |
| 2 | **Port de form factor** — o VT é web denso e o grep confirmou **zero precedente mobile** no bundle | Só tokens atravessam. A camada de componente mobile nasce aqui — é escopo, não acidente |
| 3 | **R1/R2 abertos** travam a fase mais crítica | Fechar antes do C23. Se não fechar, reordenar: fase 6 antes da 5 |
| 4 | **Mock de um dia só** mata T03, T12 e T15 | Gate de cobertura temporal **antes do C1**, não depois |
| 5 | **T05 e T04 são pattern-setters** — errar propaga em cascata | ▲ nos dois; auditoria obrigatória antes de seguir |
| 6 | **C16 é transversal** e toca tudo construído | Gate: pedir inventário antes de trocar |
| 7 | **Wireframe rev 4 ausente** — a contagem de 52 telas não é verificável | Pedir o arquivo; até lá, os sub-estados do §5 são estimativa |
| 8 | **Primeiro mobile maduro da casa** — não há canon pra herdar | Assumido. C33 promove o que amadurecer |

---

## 12. Glossário oficial

Vive em `dominio-app-configurador.md` §2 — este doc aponta, não duplica. Regra do cartório: termo descrito em dois lugares diverge no primeiro ajuste.

O essencial para leitura deste documento:

**Sessão de acesso** (login, 7 dias) ≠ **sessão de configuração** (módulo, tela própria) · **cadeia** = os 6 passos de T09 na ordem canônica · **read-back** = releitura que confirma · **arraste** = blocos que um reenvio obriga · **autoteste** = reinício + releitura no encerramento, 8 assertivas · **ciclo dinâmico** = um deslocamento, quatro destinos.
