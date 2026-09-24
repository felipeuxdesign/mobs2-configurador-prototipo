# Domínio — App Configurador

> **Passo 1 do Dia Zero.** Extraído de `Requisitos-App-Configurador-v1.md` (1600 linhas, rev 4 de 21/08/2026).
> Este documento existe para uma coisa: **impedir que o executor preencha lacuna com clichê.**
> Ele responde *como o produto fala*, *o que trava o quê* e *o que cada tela promete* — antes de qualquer pixel.
>
> Não existe skill de produto para este app. **Este arquivo é a fonte de domínio**, e vira a base da RAG (passo 5).
>
> Status: `[PROPOSTO]` marca o que eu derivei e precisa de OK do diretor. `[ABERTO]` marca o que os requisitos deixam sem decisão.

---

## 0. A tese do produto em cinco linhas

Aplicativo mobile de **instalação, configuração e homologação** de módulos de telemetria embarcados.

O público é **técnico de campo terceirizado, sem conhecimento de lógica `.xvm`**. Ele trabalha embaixo de um ônibus, no pátio, na obra, muitas vezes sem rede. O produto inteiro é uma resposta a essa pessoa: o técnico responde perguntas de negócio, o app fala protocolo.

O que o app entrega ao gestor não é "configuração enviada". É **prova de que este módulo, neste ativo, ficou funcionando** — read-back, foto, autoteste e confirmação de recebimento no servidor.

---

## 1. Os 6 princípios — usar para desempatar decisão de tela

| # | Princípio | O que ele decide na prática |
|---|---|---|
| 1 | O técnico responde perguntas de negócio; o app fala protocolo | Nenhuma tela expõe comando, sintaxe ou variável. Ver §2. |
| 2 | O sistema decide, o técnico executa | Todo conteúdo vem do cadastro. Não há seletor de script, parâmetro, índice ou faixa. |
| 3 | Sucesso de comando ≠ sucesso de configuração | **Todo envio tem read-back.** Nenhuma tela declara sucesso sem releitura. |
| 4 | Nenhuma etapa deixa o módulo em estado inválido | Operação destrutiva é transacional. Se não termina, o app retoma ou reverte — não volta pra home. |
| 5 | Sem cadastro prévio, o app trava | Não existe caminho de improviso em campo. Trava é trava, com escalonamento fora do app. |
| 6 | A evidência é gerada pelo app, não digitada | O que o app comprova, o técnico não marca à mão. Mata o "marcar todos". |

**Uso no prompt de cycle:** quando o executor tiver dúvida de comportamento, o princípio decide. Quando os princípios se contradisserem, é decisão de diretor — sinaliza, não resolve.

---

## 2. Vocabulário

### 2.1 Termos oficiais — o app fala assim

**Sessões (dois objetos distintos, nunca "sessão" sozinho)**

| Termo | O que é |
|---|---|
| **Sessão de acesso** | Abre no login, encerra por **Sair** ou pelos 7 dias. Governa quem está usando o app. |
| **Sessão de configuração** | Abre ao conectar o módulo, encerra por tela própria (T16). Governa módulo, ativo, canal e progresso da cadeia. |

**Objetos de domínio**

| Termo | Definição curta |
|---|---|
| **Módulo** | O equipamento de telemetria. Identificado por serial, contra o cadastro do core M2. |
| **Ativo** | O veículo ou máquina. Vem do pacote, nunca cadastrado em campo. |
| **Variante** | Dimensão própria, no mesmo nível do modelo. Decide CAN, sem fio, pulsos e ocupação de pinos. |
| **Pacote de sincronização** | O offline do cliente. Vale 7 dias; avisa a partir de 3. |
| **Manifesto** | A versão do pacote. Gravada em toda evidência. |
| **Os 5 blocos** | Ativo · Cercas · Leitor · Eventos · Conexão. A cadeia tem 6 passos (limpeza é o 1). |
| **Cadeia** | A sequência ordenada de T09. Ordem canônica única. |
| **Read-back** | Releitura que confirma o que foi escrito. Sem ele nada é sucesso. |
| **Arraste** | Blocos que um reenvio obriga a reenviar junto. |
| **Autoteste de instalação** | Reinício + releitura no encerramento. Prova 8 assertivas. |
| **Assertiva** | Cada item do autoteste, com o valor lido em tela. |
| **Ciclo dinâmico** | Um deslocamento só, alimentando 4 destinos (T14). |
| **Fila de saída** | Evidências aguardando envio. Feedback **por item**. |
| **Reset de leitura do ativo** | Única ferramenta destrutiva autônoma. Não descarta dado do cliente. |
| **Limpeza de configuração** / **Limpeza total de configuração** | Os dois escopos, derivados do cenário. Vivem como bloco 1 de T09. |

**Nomes de ferramenta na home** (10 itens, ordem fixa)
Conectar módulo · Ativo selecionado · Dados da CAN · **Configurar módulo** · **Reset de leitura do ativo** · Calibração · Manutenção / diff · Últimas instalações · Finalizar com checklist · **Fila de saída**

> "Envio de scripts" e "Limpeza do módulo" **não sobrevivem em lugar nenhum do produto.**

**Nomeação de hardware:** por **cor e função**. "Fio branco, leitor". Nunca pelo código da entrada ou saída.

### 2.2 Vocabulário proibido — não aparece em tela, nunca

Enumerado em §1.1 dos requisitos:

`baudrate` · código de entrada ou saída física (`IN3`, `OUT1`) · índice de memória · nome de contador · a palavra **script**

`[ABERTO R3]` **A lista está incompleta e o próprio documento a viola.** Ela não nomeia `APN`, `BLE` nem `iButton` — e T06 usa "Reconectar por BLE" como rótulo de ação em tela.

Fecho proposto pelos requisitos, **ainda não aplicado**: fechar como enumeração explícita, acrescentando protocolo de rádio, nome de serviço de rede e marca de componente. A rev 4 do protótipo já trocou em tela:

| Proibido | Em tela |
|---|---|
| BLE | **sem fio** |
| APN | **rede do módulo** |
| iButton | **chave de contato** |

> **Isto é decisão de diretor e trava craft de tela.** Sem enumeração fechada, "verificável em revisão de tela" não é verificável — e o executor não tem contra o que conferir. Barato de fechar, e eu recomendo fechar antes do C1.

O valor técnico **continua existindo** no log de sessão e na evidência. Ele some da tela do técnico, não do produto.

---

## 3. Entidades e vínculos — o que trava o quê

### 3.1 A cadeia de dependência

```
Empresa / UC / UO
   └── Pacote de sincronização (manifesto, validade 7d)
         ├── Ativos ──────────── modelo de ativo → bloco Ativo (tradução CAN)
         │                                        → mapa de contadores (por versão)
         │                                        → método de calibração de velocidade
         ├── Módulos ─────────── serial → modelo · variante · ID · credenciais
         ├── Blocos (5 camadas, versionados)
         ├── Presets de evento ─ intervalo de rastreamento · modo de fila · índice de teste
         ├── Cercas ──────────── 2 áreas × até 2 cercas = 4 regiões
         ├── Identificadores ─── cartões + mapa de índices alocados
         └── Matriz de capacidades ─ modelo × variante × firmware
```

### 3.2 A ordem canônica (invariante — nunca reordenar)

| # | Bloco | Por que nesta posição |
|---|---|---|
| 1 | **Limpeza** | estado conhecido antes de escrever |
| 2 | **Ativo** | alimenta os contadores que os eventos consomem |
| 3 | **Cercas** | limpeza de pontos é global e apaga identificadores |
| 4 | **Leitor** | depois de Cercas, para nunca ser apagado por elas |
| 5 | **Eventos** | depende de Ativo, Cercas e Leitor |
| 6 | **Conexão** | fecha a comunicação com o sistema |

**Arraste no reenvio cirúrgico (T11):**

| Reenviado | Arrasta |
|---|---|
| Ativo | Eventos |
| Cercas | Leitor → Eventos |
| Leitor | Eventos |
| Eventos | — |
| Conexão | — |

O conjunto arrastado vai **sempre na ordem canônica**, nunca na ordem em que as divergências apareceram.

### 3.3 Derivação de escopo de limpeza — o técnico nunca escolhe

| Cenário | Escopo |
|---|---|
| Nova instalação | **Limpeza total** (higieniza conectividade herdada) |
| Manutenção (T11) | **Limpeza de configuração** (não derruba módulo em operação) |
| Reconfiguração no mesmo ativo | **Limpeza de configuração** |

Não há flag de permissão. Não há confirmação em dois passos. Não há escolha.

### 3.4 O que trava — matriz de bloqueio

| Trava | Onde | Saída |
|---|---|---|
| Serial não cadastrado | T05 | nomeia pela letra, bloqueia, **registra no M2** |
| Modelo/variante sem driver v1 | T05 | nomeia pelo cadastro, bloqueia, registra |
| Firmware fora da matriz | T05 | grava Conexão isolado → atualiza → relê capacidades → reinicia pré-checagem |
| Conteúdo não cabe no módulo | T05 | bloqueia (mesmo cálculo da publicação no M2) |
| Pool de índices esgotado | T05 | **dois limites**: regiões E posições (`cartões + pontos`) |
| ID não reconhecido no destino | T05 | trava com rede; **sem rede vira aviso**, causa herdada pela Seção F |
| Ocupação de pinos em conflito | T06, reconferido em T09 | oferece **reconectar sem fio**; sem saída = erro de projeto, escalona |
| Ativo fora do pacote | T06 | trava. **Não oferece "solicitar cadastro"** (princípio 5) |
| Divergência de chassi | T06 | bloqueia até resolver |
| Sessão de acesso vencida | T01 | bloqueia configuração; **preserva fila e evidências** |
| Pacote > 7 dias | T03 | bloqueia; aviso não bloqueante a partir de 3 |
| Envio em andamento | T02, T06 | bloqueia troca de contexto e de ativo |

**Nunca trava:** buffer/LOG pendente no módulo. É informação, não bloqueio.

---

## 4. As máquinas de estado que decidem tela

### 4.1 Estado da instalação (6 valores — governa T12 e T13)

| Estado | Como se chega |
|---|---|
| **Aprovada** | tudo passou, incluindo Seção F |
| **Aguardando validação** | finalizada sem rede, Seção F não avaliada · até 24 h |
| **Encerrada com falha de recebimento reconhecida** | Seção F falhou e o técnico marcou ciência |
| **Aprovada após reprocessamento** | re-checagem passou dentro das 24 h |
| **Reprovada** | 24 h esgotadas |
| **Ressalvada** | item manual não conforme com justificativa · **combina com qualquer estado acima** |

### 4.2 Encerramento da sessão de configuração (8 passos, T16)

```
1. Gravar contadores e estado do script      (uma vez — limite de ciclos de escrita)
2. Reiniciar o módulo                        ┐ o autoteste
3. Releitura completa após o reinício        ┘
4. Restaurar o parâmetro de repouso          → assertiva 7
5. Fechar o canal de programação             → assertiva 6
6. Enfileirar o log da sessão
7. Desconectar
8. Apresentar o autoteste, assertiva por assertiva, com o valor lido
```

**Sessão abortada:** pula 1–3, executa 4–7.
**Falha do autoteste:** bloqueia a homologação, **não** o encerramento — o canal tem de fechar sempre.

### 4.3 Semáforo do módulo (T04)

Sem módulo · Conectado saudável · Conectado com falha

### 4.4 Item de fila (T15)

na fila · enviando (com progresso próprio) · recebida · com erro

Erro nomeia **causa e ação**: falha de rede → reenvio automático · recusa do servidor → **manual**, nunca retentativa silenciosa.

---

## 5. HUs mapeadas por tela

> Numeração criada aqui (`HU-T<nn>-<n>`) — os requisitos têm critérios de aceite, não HUs numeradas.
> A rev 4 conta **52 telas em 5 fluxos**; T01–T16 são as telas-mãe. A enumeração dos sub-estados está em §6.

### T01 — Login

| HU | Promessa |
|---|---|
| HU-T01-1 | Entro com usuário e senha; erro não distingue usuário inexistente de senha errada |
| HU-T01-2 | Com sessão válida e sem rede, o app abre direto na home |
| HU-T01-3 | **Lembrar meu usuário** desmarcado por padrão, guarda só o identificador, limpável no campo |
| HU-T01-4 | Outro usuário descarta a sessão anterior; a fila do anterior é preservada e continua subindo |
| HU-T01-5 | Recupero senha escolhendo canal (e-mail/telefone), com validação local antes de gastar rede |
| HU-T01-6 | Máscara de telefone **derivada do DDI**, não fixa; trocar DDI reaplica e avisa |
| HU-T01-7 | Digito código de 6 dígitos · 10 min · 3 tentativas · reenvio após 60 s · teto 3/hora |
| HU-T01-8 | **Não recebi o código** com 3 saídas: conferir e reenviar · trocar canal · acionar gestor |
| HU-T01-9 | **Eu** crio a senha nova; os 6 requisitos ficam visíveis desde o início e marcam sozinhos |
| HU-T01-10 | Modal diz "senha alterada", sem botão fechar; a troca encerra sessões em outros aparelhos |
| HU-T01-11 | A sessão de acesso **não expira por inatividade**; só por Sair ou pelos 7 dias, com aviso no 5º |
| HU-T01-12 | **Sair** tem tela própria: mostra sessão de configuração aberta, itens na fila e o que sobrevive |

### T02 — Seleção de contexto

| HU | Promessa |
|---|---|
| HU-T02-1 | Vejo empresas/UC/UO que tenho permissão, com busca quando a lista for longa |
| HU-T02-2 | Troco de contexto a qualquer momento pelo cabeçalho; o contexto ativo fica sempre visível |
| HU-T02-3 | Trocar com módulo conectado avisa que a sessão de configuração encerra, e pede confirmação |
| HU-T02-4 | Trocar com envio em andamento é **bloqueado** até concluir ou abortar |

### T03 — Sincronizar dados

| HU | Promessa |
|---|---|
| HU-T03-1 | Vejo progresso, volume e tempo estimado; sincronização é incremental por versão |
| HU-T03-2 | Falha de rede mostra erro com **Reconectar**, sem perder progresso parcial |
| HU-T03-3 | A versão do manifesto é gravada em toda evidência |
| HU-T03-4 | Pacote > 7 dias bloqueia; a partir de 3 avisa sem bloquear. Idade conta do carimbo do servidor |

### T04 — Menu de ferramentas (home)

| HU | Promessa |
|---|---|
| HU-T04-1 | Vejo o semáforo do módulo no topo e a **faixa de sessão** acima dele |
| HU-T04-2 | Vejo 10 ferramentas; as que dependem de módulo ou ativo ficam desabilitadas **com o motivo** |
| HU-T04-3 | A fila mostra o contador de pendentes **no próprio cartão**, sem abrir |
| HU-T04-4 | Checklist pendente aparece como aviso persistente |
| HU-T04-5 | **Não existe console de log.** Cada ferramenta reporta estado em linguagem de campo |

### T05 — Conectar módulo

| HU | Promessa |
|---|---|
| HU-T05-1 | Busco dispositivos (sem fio ou cabo, conforme a variante); vazio explica alimentação, cabo, distância |
| HU-T05-2 | Ao conectar, a pré-checagem roda sozinha e mostra cada item com resultado |
| HU-T05-3 | Serial não cadastrado e modelo sem driver são **dois estados com mensagens distintas** |
| HU-T05-4 | Falha de comunicação mostra **uma causa única** com 3 coisas a checar: cabo, alimentação, cadastro |
| HU-T05-5 | Firmware incompatível: com conectividade oferece atualizar; sem, grava Conexão isolado e então oferece |
| HU-T05-6 | Após atualizar, o app **relê capacidades e reinicia a pré-checagem** |
| HU-T05-7 | Vejo pendências do módulo e estado do modem **como informação** — não bloqueiam nada |
| HU-T05-8 | Conexão bem-sucedida **abre a sessão de configuração** |
| HU-T05-9 | Perda de link mostra Reconectar e preserva o estado da etapa. **Queda por repouso não é erro** |

### T06 — Seleção do ativo

| HU | Promessa |
|---|---|
| HU-T06-1 | Busco por placa, frota ou identificador; vejo modelo do ativo e módulo esperado |
| HU-T06-2 | Quando o ativo trafega chassi pela CAN, o app **lê e compara** — divergência bloqueia |
| HU-T06-3 | Sem chassi na CAN, o vínculo é confirmação explícita minha, registrada na evidência |
| HU-T06-4 | Ativo fora do pacote trava, **sem oferecer solicitar cadastro** |
| HU-T06-5 | A matriz de ocupação de pinos roda aqui; conflito resolvível oferece **reconectar sem fio** no lugar |
| HU-T06-6 | Conflito sem saída é nomeado como incompatibilidade e escalonado — não há reordenação que resolva |
| HU-T06-7 | Cada linha do arnês é nomeada por **cor e função** |

### T07 — Dados da CAN (fase estática)

| HU | Promessa |
|---|---|
| HU-T07-1 | Vejo sinais por domínio, cada um com **valor lido · esperado · semáforo** |
| HU-T07-2 | Sinal fora do esperado traz causa provável: ligação, barramento, modelo incorreto |
| HU-T07-3 | Sinais dinâmicos aparecem como *aguardando o ciclo dinâmico* — **não aprováveis aqui** |

### T08 — Reset de leitura do ativo

| HU | Promessa |
|---|---|
| HU-T08-1 | Apago **só** os valores lidos da CAN, para reconferir do zero |
| HU-T08-2 | A tela declara o que apaga e o que preserva, em linguagem de campo, antes de executar |
| HU-T08-3 | Após o reset, o app relê e me devolve a T07 com a leitura em branco |
| HU-T08-4 | Sem mapa declarado, a ferramenta fica **indisponível com motivo** — o app não chuta índice |

### T09 — Configurar módulo

| HU | Promessa |
|---|---|
| HU-T09-1 | Disparo e acompanho; **não escolho conteúdo nem bloco** |
| HU-T09-2 | A pré-condição de ocupação de pinos é a primeira linha da tela |
| HU-T09-3 | O bloco 1 declara o escopo e o que apaga/preserva. **Sem confirmação em dois passos** |
| HU-T09-4 | Cada bloco só inicia com o anterior confirmado por read-back |
| HU-T09-5 | Falha interrompe, nomeia a etapa em linguagem de campo e oferece **repetir a etapa** |
| HU-T09-6 | Queda no meio: retomo **do mesmo bloco**, de forma idempotente |
| HU-T09-7 | Ao final, read-back consolidado dos parâmetros críticos |
| HU-T09-8 | A versão dos 5 blocos é gravada como **string composta** após o read-back de cada bloco |
| HU-T09-9 | Nova instalação é **transação inteira** — abortar mantém na tela de recuperação até Conexão gravar |

### T10 — Calibração

| HU | Promessa |
|---|---|
| HU-T10-1 | Vejo só as grandezas calibráveis para este ativo × módulo, **com justificativa quando indisponível** |
| HU-T10-2 | RPM/velocidade: informo o valor **que leio no painel**; o módulo calcula o fator |
| HU-T10-3 | Hodômetro/horímetro: digito o valor do painel e **fotografo**; o app converte a unidade |
| HU-T10-4 | A foto do painel **satisfaz também** a Seção B, com a origem visível na linha |
| HU-T10-5 | O read-back tolera **granularidade + tempo decorrido**, na unidade do reporte |
| HU-T10-6 | Releitura obrigatória **antes** do ciclo dinâmico |
| HU-T10-7 | Recalibrar em manutenção **recalcula o offset**, não acumula |
| HU-T10-8 | Quem escolhe pulso ou GPS é o cadastro do modelo de ativo, não eu |

### T11 — Manutenção e diff

| HU | Promessa |
|---|---|
| HU-T11-1 | O app lê a **string de versão** como primeiro passo; ausente ou ilegível roda diff completo por conteúdo |
| HU-T11-2 | Vejo divergências agrupadas por bloco, **em linguagem de negócio** |
| HU-T11-3 | Escolho entre 3 ações nomeadas pelo efeito, incluindo *apenas registrar o diagnóstico* |
| HU-T11-4 | Corrigir arrasta as dependências automaticamente, na ordem canônica |
| HU-T11-5 | Índice que o firmware cria sozinho **não é divergência**; sem lista, vai para *não classificados* |
| HU-T11-6 | Escopo fixo em limpeza de configuração — **limpeza total não é oferecida aqui** |
| HU-T11-7 | Configuração conforme é **declarada explicitamente**; o diff sobe mesmo sem reenvio |

### T12 — Últimas instalações e manutenções

| HU | Promessa |
|---|---|
| HU-T12-1 | Vejo por ativo: última intervenção, posicionamento, eventos, viagens e status geral |
| HU-T12-2 | A janela de posicionamento é **derivada do pacote** (`3 × intervalo + 2 min`), não fixa |
| HU-T12-3 | Os 10 min aparecem como **teto de espera**, não como critério |
| HU-T12-4 | Critério sem parâmetro declarado fica **indisponível com motivo** |
| HU-T12-5 | Offline mostro o último resultado conhecido **com a data da consulta** |
| HU-T12-6 | Falha por rede vira **pendente com re-checagem por 24 h**, não reprovação imediata |

### T13 — Checklist de homologação

| HU | Promessa |
|---|---|
| HU-T13-1 | Itens automáticos **não são marcáveis à mão**; "marcar todos" só nos manuais sem foto |
| HU-T13-2 | Item automático reprovado mostra o motivo e **leva direto à tela que corrige** |
| HU-T13-3 | Vejo progresso separado por seção e por tipo |
| HU-T13-4 | Posso responder manual como **não conforme com justificativa** → marca ressalvada, não bloqueia |
| HU-T13-5 | Finalizar exige 100% dos automáticos de A, C, D e 100% dos manuais com foto |
| HU-T13-6 | A **Seção F não bloqueia**; finalizar com ela falhando exige **ciência marcada**, com nome e hora |
| HU-T13-7 | Finalizado gera o relatório com seriais, versões, resultados, fotos, geolocalização e técnico |
| HU-T13-8 | A Seção E não é respondida aqui — item faltante **me devolve ao ciclo dinâmico** |

### T14 — Ciclo dinâmico

| HU | Promessa |
|---|---|
| HU-T14-1 | **Um deslocamento** alimenta 4 blocos: CAN dinâmica · Seção E · evento de teste · viagem |
| HU-T14-2 | Disparo o evento de teste por botão, com o **cronômetro dos 120 s em destaque** |
| HU-T14-3 | Antes do cronômetro vejo a **fila do módulo drenando**; o botão fica indisponível com motivo |
| HU-T14-4 | Vejo 3 linhas de estado: disparado · recebido · campos conferidos. E posso **disparar novamente** |
| HU-T14-5 | No teste do identificador vejo **o código lido ao lado do esperado**, em formato de negócio |
| HU-T14-6 | Divergindo, a tela oferece **solicitar correção de cadastro** já com os dois valores anexados |
| HU-T14-7 | Vejo o tempo decorrido e o que ainda falta capturar; encerrar leva direto ao checklist |

### T15 — Fila de saída

| HU | Promessa |
|---|---|
| HU-T15-1 | Vejo **por item**: tipo, ativo, item de checklist, tamanho e progresso do corrente |
| HU-T15-2 | Sair da tela **não interrompe** o envio; a home mantém o contador |
| HU-T15-3 | Cada erro **nomeia causa e ação**; recusa do servidor nunca fica em retentativa silenciosa |
| HU-T15-4 | Fila vazia é **declarada**, com o horário do último envio |
| HU-T15-5 | A Seção F em re-checagem aparece em **seção separada** — não é item de fila |
| HU-T15-6 | Recebo notificação local quando a fila fica parada além do limite |

### T16 — Sessão de configuração

| HU | Promessa |
|---|---|
| HU-T16-1 | A faixa fica no topo de **toda tela**: abertura, módulo, tempo decorrido e a única saída |
| HU-T16-2 | Enquanto a sessão vive: canal reaberto sozinho, módulo e ativo travados, repouso inibido |
| HU-T16-3 | O encerramento executa **8 passos e mostra cada um** |
| HU-T16-4 | Vejo o autoteste **assertiva por assertiva, com o valor lido** — nunca um "OK" agregado |
| HU-T16-5 | Falha do autoteste bloqueia a homologação, **não o encerramento** |
| HU-T16-6 | Sessão interrompida é **oferecida de volta**, com o ponto de retomada |
| HU-T16-7 | Descartar não desfaz o que foi gravado — descarta a intenção, e isso é registrado |
| HU-T16-8 | Canal aberto por sessão anterior é **anomalia**: o app fecha antes de começar |

---

## 6. Os 5 fluxos — `[PROPOSTO]`

Os requisitos citam "52 telas em 5 fluxos" mas **não os enumeram**. Derivação para o diretor confirmar:

| # | Fluxo | Telas-mãe |
|---|---|---|
| 1 | **Acesso e preparo** | T01 · T02 · T03 |
| 2 | **Nova instalação** | T05 · T06 · T07 · T09 · T10 · T14 · T13 · T16 |
| 3 | **Manutenção** | T05 · T06 · T11 · T16 |
| 4 | **Conferência e diagnóstico** | T08 · T12 · T15 |
| 5 | **Encerramento e homologação** | T13 · T16 (autoteste) |

**A enumeração dos 52 sub-estados sai do wireframe rev 4**, não deste documento. Se o `Wireframe-App-Configurador.html` estiver disponível, ele fecha a contagem e o mapa de navegação.

---

## 7. Lacunas abertas — bloqueiam craft de tela

| # | Lacuna | Bloqueia | Quem decide |
|---|---|---|---|
| **R1** | Assertiva 8 pendente prende o técnico — mas é item da Seção D, que exige 100% | O critério de finalização de T13 e a tela do autoteste | **Diretor + time** |
| **R2** | "As oito assertivas" vs. assertiva 4 condicional | O que *autoteste íntegro* significa; a tela do passo 8 de T16 | **Diretor + time** |
| **R3** | Lista de vocabulário proibido incompleta, e violada em T06 | Revisão de tela de **todo o produto** | **Diretor** (barato) |

> R1 e R2 são **critério de entrada em campo**: decidem quando uma instalação é homologada.
> R3 não bloqueia funcionalidade, mas é o que torna o princípio 1 auditável — e sem ele o executor não tem lista contra a qual conferir cada tela.

**Recomendação:** R3 fecha em cinco minutos e destrava o craft de todas as telas. R1 e R2 podem esperar até o cycle que desenhar T13/T16 — mas não além dele.

---

## 8. Anti-slop — o que este produto **não** é

Lista para o escopo negativo dos prompts de cycle:

- **Não é dashboard.** Não tem KPI de topo, não tem gráfico de tendência, não tem "visão geral".
- **Não tem console.** Nenhuma tela mostra comando, resposta bruta ou log.
- **Não tem configuração de usuário.** O técnico não ajusta nada além de *lembrar usuário*.
- **Não tem seletor de conteúdo.** Nem de script, nem de bloco, nem de escopo, nem de índice, nem de faixa.
- **Não tem cadastro em campo.** Nem ativo, nem módulo, nem cerca, nem identificador.
- **Não tem assinatura em tela** (fora da v1).
- **Não tem histórico de intervenções para o técnico** (é tela web do gestor).
- **Não tem console de logs, DSM, nem listagem de PGN** (fora da v1).
