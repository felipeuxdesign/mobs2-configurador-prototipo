# App Configurador — Kickoff do projeto · Protótipo app v1
## Documento de passagem de bastão — leia por inteiro antes de qualquer ação

**Para:** quem assumir o papel de ARQUITETO/AUDITOR — agente ou pessoa
**De:** Felipe (diretor) + o arquiteto do Dia Zero
**Data:** 2026-08 · **Status:** kickoff — **nenhum cycle executado ainda**

> Este documento é o **teste de que o Dia Zero acabou**. Se ele não flui sozinho, alguma coisa ainda mora numa conversa — e conversa não viaja.

---

## 0. O que é este documento

Você está assumindo o papel de **arquiteto/auditor** do App Configurador. Este documento transfere contexto, papéis, o método, as lições já pagas, e a sua primeira missão.

O projeto **Vídeo Telemetria** é a **fonte da verdade** de craft, arquitetura e design system. O ZIP dele está disponível e você vai estudá-lo por inteiro.

**Objetivo declarado do diretor:** o App Configurador tem que sair irmão do VT, com a mesma qualidade de craft — sabendo que ele é o **primeiro mobile maduro da casa** e vai definir o vocabulário de componente mobile da família.

**Regra de uso:** quando algo aqui conflitar com o que você descobrir nos artefatos, **pergunte antes de decidir**. Nunca resolva ambiguidade de requisito em silêncio.

---

## 1. Papéis

| Papel | Quem | O que faz |
|---|---|---|
| **Diretor** | **Felipe** | Decide produto e prioridade. Valida visualmente. Roda os prompts no executor. Sobe a RAG e o pacote. Martelo final. |
| **Aprovador de requisito** | **Thacyo (PM)** | Dono do requisito. Decide o que os requisitos não decidem. **R1, R2 e R3 estão com ele.** |
| **Arquiteto/Auditor** | **você** (este chat) | Escreve os prompts de cycle (`.md`, nunca inline). Audita **todo** ZIP rodando código de verdade. Mantém doc mestre, domínio, RAG e `CLAUDE.md`. Escala decisão de produto. |
| **Executor** | **Claude Design** | Recebe os prompts e gera o protótipo. **Não é confiável no caption** — só o código vale. Zero memória entre sessões. |

**Circuito de decisão:**

```
executor sinaliza  →  arquiteto faz triagem
                        ├─ craft/arquitetura → arquiteto resolve
                        └─ regra de negócio  → Felipe → Thacyo
```

A triagem importa: a maioria dos empates é craft e **não deve chegar no PM**.

**Preferências do diretor:** PT-BR, tom direto. Quer análise honesta em vez de concordância automática — se a decisão dele tiver furo, diga. Ele delega craft e arquitetura; retém regra de produto e prioridade.

---

## 2. O produto — leia o domínio ANTES de tudo

**Não existe skill de produto.** A fonte foi criada no Dia Zero:

| Artefato | Papel |
|---|---|
| `Requisitos-App-Configurador-v1.md` (1600 linhas, rev 4) | **fonte da verdade** — tem o *porquê* de cada decisão |
| `dominio-app-configurador.md` | **índice** — glossário, entidades, 108 HUs, máquinas de estado |
| `doc-mestre-app-configurador.md` | **gestão** — abertura, inventário, plano de 33 cycles, riscos |

Os três estão na memória do projeto. **Atualizar é movimento único:** requisito → domínio → doc mestre, na mesma sessão. Um sem os outros dois passa a mentir.

### O mínimo

**O usuário é técnico de campo terceirizado, sem conhecimento de lógica `.xvm`.** Embaixo de um ônibus, no pátio, muitas vezes sem rede, uma mão no módulo e outra no aparelho. Toda decisão de tela responde a essa pessoa.

**Hierarquia:** Sessão de acesso → contexto (empresa/UC/UO) → pacote de sincronização → sessão de configuração → módulo + ativo.

**Duas sessões distintas**, nunca "sessão" sozinho: a **de acesso** (login, 7 dias) e a **de configuração** (módulo, tela própria).

**Regras âncora:**
- **Read-back sempre.** Sucesso de comando ≠ sucesso de configuração.
- **Ordem canônica invariante:** Limpeza → Ativo → Cercas → Leitor → Eventos → Conexão. Nem no reenvio cirúrgico.
- **O sistema decide, o técnico executa.** Nenhum seletor de conteúdo, escopo ou índice.
- **Evidência é gerada, não digitada.** Item automático não é marcável à mão.
- **Sem cadastro prévio, trava** — e não oferece "solicitar cadastro".

**Vocabulário proibido em tela:** `baudrate` · `IN3`/`OUT1` · índice · contador · a palavra *script* · `APN` · `BLE` · `iButton`. Hardware por **cor e função**.

**Navegação:** frame único 360×800. Faixa de sessão no topo de toda tela. **Sem tela-meta** — T04 é a primeira tela real.

---

## 3. A fonte da verdade de craft — o ZIP do VT

Produto final do Vídeo Telemetria, lockado. **Estude a estrutura inteira antes de planejar.**

O que **reaproveitar**, não reinventar:

- **`_ds/`** — os dois bundles. **Nunca editar o bundle**; overrides escopados no produto.
- **`app/controls.jsx`** e **`app/components.jsx`** — o que for mobile-compatível.
- **`SystemStateScreen.jsx`** e **`notifStore`** — portam direto (C2).
- **`ds-video-telemetria/`** — a RAG modelo, 11 arquivos na estrutura canônica.
- **O `CLAUDE.md` do VT** — precedente jurídico. Muita regra porta.

### ⚠ D-08 — o bundle traz o produto Waste inteiro

Auditoria encontrou 653 menções a *setores*, 346 a *coleta*, 321 a *BDO*. É produto empacotado, não DS limpo. Usar como está — o VT shippou assim — mas **nunca**:

- o **SystemState/404 nativo** — o botão dele faz `PROTOTYPE_PATH = "planejamento/setores"` e recarrega
- `window.mockApontamentos` e `window.mockNotificacoes`
- qualquer coisa do bundle que **escreva** em `PROTOTYPE_PATH`

O motor de i18n **tem self-mount**: instala `MutationObserver` na raiz no load. Não é bug; conte com ele.

### Identidade

**Tokens auditados no fonte:** roxo `#402070` (primary direto, AA forte sobre branco) · dark `#A78BFA` · lima `#AAEF00`.

**D-07:** lima **só sobre roxo ou escuro**. Nunca ação sobre fundo claro.
**D-06:** light e dark seguindo o sistema, **sem toggle no app**.

Construa 100% sobre **tokens semânticos**.

---

## 4. O método

Siga a skill **`craftmobs2`** à risca.

```
1. BACKUP   → ZIP anterior salvo antes de qualquer edição
2. PROMPT   → você escreve um .md (nunca inline)
3. EXECUÇÃO → o diretor roda no Claude Design e devolve o ZIP
4. AUDIT    → você audita RODANDO o código (Node nos mocks, grep no fonte)
5. DECISÃO  → avança · craft .N · hotfix · reprova (reverte pro backup)
```

**Anatomia do prompt:** alvo → **⛔ escopo negativo no topo** → **complexidade e modelo** → contexto em 1 linha → mudanças atômicas numeradas → referências literais → **decisões sinalizadas D1/D2/D3** → "edição cirúrgica, não reescreve o arquivo" → checklist de aceite.

**Modelo:** cada cycle leva `PADRÃO` ou `MÁX`. Este projeto é **22 MÁX contra 11 PADRÃO** — porque não há canon mobile pra herdar, então a maioria dos cycles faz nascer gramática. É estrutural.

**Gate transversal:** 3+ arquivos ou mock compartilhado → o executor lista o que entendeu e **espera OK**.

**Auditoria:** pill primeiro → perímetro por md5 → greps de higiene → recomputo no Node → checklist do gênero → visual dirigido → veredito.

**Manutenção da RAG:** ela é **substituída inteira** a cada auditoria, não fatiada. Quem escreve é você; quem sobe é o diretor. Versione junto com a pill — "RAG @ C9" — pra saber qual versão o executor lia quando algo não bateu.

---

## 5. As lições pagas — não repita

- **Doc não é fonte da verdade; código é.** A pasta "design system" do VT estava desatualizada frente às telas.
- **Contrato de mock precisa de gate.** No Infra o contrato prometia 30 dias, o mock tinha 1, e passou **20 cycles** sem ninguém ver — todas as telas eram do "hoje". A primeira tela mensal abriu calendário vazio. **Conte dias distintos no Node antes do C1.**
- **Traduza contextos, não hexes.** Cada contexto de cor recebe decisão própria.
- **Sem tela-meta no app.** Tela-índice duplicando a controladora já teve de ser desfeita.
- **Prompt de paridade envelhece** — censo do código atual sempre.
- **Audite antes de acusar** — o autor de um diff estranho pode ser o próprio diretor.
- **Revogar decisão não é trocar a linha do registro** — é caçar as menções espalhadas. Aconteceu neste projeto: a identidade mudou de Bus para VT e uma menção a "tokens Bus" sobreviveu no plano de cycles.
- **Editar infra herdada exige grep, não leitura.** A controladora do VT tinha um `ROUTE_TO_FILE` escondido além da nav visível; trocar só a nav teria deixado o "abrir em tela cheia" apontando pra telas de vídeo telemetria.

---

## 6. O estado atual — Dia Zero completo

| Passo | Status |
|---|---|
| 0 · abertura | ✅ fonte, aprovador, executor, herança, form factor, critério de pronto |
| 1 · domínio | ✅ `dominio-app-configurador.md` |
| 2 · identidade | ✅ tokens auditados no fonte do VT |
| 3 · bundle `_ds` | ✅ montado + ritual de carga isolada (achou o D-08) |
| 4 · dado | ✅ contrato em `dados-mock.md` — **o gate ainda precisa RODAR** |
| 5 · RAG | ✅ `ds-app-configurador/`, 11 arquivos |
| 6 · CLAUDE.md | ✅ |
| 7 · infraestrutura | ✅ controladora enxuta (1 device) + 21 cascas |
| 8 · kickoff | ✅ este documento |
| 9 · prompt do C1 | ← **próximo** |

---

## 7. A primeira missão

1. **Rodar o gate de cobertura temporal** — script Node contando dias distintos. Mínimo: 45 dias corridos, 12 dias com intervenção, e **uma instalação em cada um dos 6 estados**. Sem isso T12 não é construível. **Antes do C1.**
2. **Escrever o prompt do C1** — shell de fábrica: chrome do app (faixa de status por id de tela, faixa de sessão, header com contexto), as 16 rotas com "Em breve", pill viva, light e dark. **Nenhuma tela real.**
3. **Auditar o C1 rodando código.** É o cycle que decide se o resto assenta.
4. **C2 e C3** — mocks + i18n + estados portados; depois T04, o primeiro pattern-setter.

---

## 8. Pendências abertas

| # | O quê | Dono | Trava |
|---|---|---|---|
| P1 | **R3** — enumeração fechada do vocabulário proibido | **Thacyo** | craft de tela em todo o produto |
| P2 | **R1 e R2** — critério de finalização e o que *autoteste íntegro* significa | **Thacyo** | **C23 e C24** |
| P4 | `Wireframe-App-Configurador.html` rev 4 | Felipe | contagem dos 52 sub-estados |
| P5 | NS `m2cf-` — confirmar | Felipe | — |
| P6 | Linha do portfólio | Felipe | nome do produto |
| P7 | Navegação: barra inferior existe? | arquiteto propõe | C1 |

---

## 9. Critério de sucesso

**Ao fim do C1:** as 16 rotas navegam pela controladora, chrome coerente em light e dark, faixa de status correta por id de tela, pill viva, zero tela real, zero hex fora dos tokens.

**Ao fim do v1:** os 5 fluxos navegáveis ponta a ponta em 360×800, light e dark, com o fluxo-herói de nova instalação demonstrável do login ao autoteste, vocabulário de campo auditado tela por tela, e **auditoria reprodutível por quem nunca viu este chat**.

> O critério do v1 é proposta do arquiteto. **Confirmar com Thacyo** — sem isso a fase 7 fica sem régua.
