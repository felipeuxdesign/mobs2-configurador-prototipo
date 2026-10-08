# Domínio — App Configurador

> **Passo 1 do Dia Zero.** Extraído de `Requisitos-App-Configurador-v1.md` (1600 linhas, rev 4 de 21/08/2026), atualizado pelas decisões posteriores e pelo retorno do PM de 06/10/2026.
> Este documento existe para uma coisa: **impedir que o executor preencha lacuna com clichê.**
> Ele responde *como o produto fala*, *o que trava o quê* e *o que cada tela promete* — antes de qualquer pixel.
>
> Não existe skill de produto para este app. **Este arquivo é a fonte de domínio**, e vira a base da RAG (passo 5).
>
> Status: `[PROPOSTO]` marca uma derivação ainda sem aprovação. As perguntas vigentes ficam em [`08-para-o-dev/o-que-o-produto-ainda-decide.md`](../08-para-o-dev/o-que-o-produto-ainda-decide.md). Trechos históricos nomeados não substituem a regra vigente de `02-telas/` e do mock.

**Censo da entrega (08/10/2026):** 15 telas, 97 momentos e 79 estados — 191 referências HTML e 191 PNG —, 109 identificadores de histórias de usuário e 62 casos no mock. T08 saiu com a decisão 44; a numeração das demais telas foi preservada. O cadastro do checklist tem 30 itens possíveis, com condições por sessão; o herói apresenta 28, porque não calibra e não reescreve o ID. Fonte: `02-telas/indice.json`, `historias.md` e `04-dados/mocks.js`.

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
| **Autoteste de instalação** | Reinício + releitura no encerramento. Prova 7 assertivas, contadas em aprovadas, não se aplicam e pendentes (retorno do PM, 06/10). |
| **Assertiva** | Cada item do autoteste, com o valor lido em tela. |
| **Ciclo de testes** | Com o veículo parado: ignição ligada, rotação quando aplicável, cartão quando há leitor e ignição desligada, mais o evento de teste (T14). O bip do leitor é respondido na T13. |
| **Fila de saída** | Evidências aguardando envio. Feedback **por item**. |
| **Diagnóstico do módulo** | O que o módulo é e como ele está, logo depois de conectar. Três linhas travam; o resto só informa. |
| **Limpeza de configuração** / **Limpeza total de configuração** | Os dois escopos, derivados do cenário. Vivem como bloco 1 de T09. |

**Nomes de ferramenta na home** (9 itens, ordem fixa)
Conectar módulo · Ativo selecionado · Diagnóstico do módulo · **Configurar módulo** · Calibração · Conferir configuração · Últimas instalações · Finalizar com checklist · **Fila de saída**

> "Envio de scripts" e "Limpeza do módulo" **não sobrevivem em lugar nenhum do produto.**

**Nomeação de hardware:** por **cor e função**. "Fio branco, leitor". Nunca pelo código da entrada ou saída.

### 2.2 Vocabulário proibido — não aparece em tela, nunca

Enumerado em §1.1 dos requisitos:

`baudrate` · código de entrada ou saída física (`IN3`, `OUT1`) · índice de memória · nome de contador · a palavra **script**

**Regra vigente:** comando, protocolo e código de hardware não orientam a ação do técnico. A APN é a exceção autorizada pelo PM na decisão 51; servidor, IP e DNS continuam fora da tela. Na conferência atual, a linha é *Rede do módulo*, com o conteúdo aprovado em `02-telas/T11-conferir-configuracao/textos.md`; a autorização da APN não permite inventar outros detalhes técnicos.

Os termos anteriores foram substituídos na interface:

| Proibido | Em tela |
|---|---|
| BLE | **sem fio** |
| iButton | **chave de contato** |

`[ABERTO R3]` O fechamento da lista de vocabulário como enumeração exaustiva continua pendente; as substituições aprovadas e a exceção da APN já são regra. Não é autorização para reabrir o desenho.

O valor técnico **continua existindo** no log de sessão e na evidência; só aparece na interface quando a especificação atual o prevê.

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
         ├── Cercas ──────────── regiões e pontos, com os limites da capacidade do módulo
         └── Matriz de capacidades ─ modelo × variante × firmware
```

**O pacote não baixa cartões nem chaves de contato** (decisão 45). Os identificadores já existentes no módulo são preservados; a v1 não os cadastra nem os grava. No teste do cartão, o técnico compara o código lido com o número impresso, sem consulta ao cadastro de cartões. As coleções de identificadores do mock são exemplos para o protótipo, não conteúdo de sincronização.

### 3.2 A ordem canônica (invariante — nunca reordenar)

| # | Bloco | Por que nesta posição |
|---|---|---|
| 1 | **Limpeza** | estado conhecido antes de escrever |
| 2 | **Ativo** | alimenta os contadores que os eventos consomem |
| 3 | **Cercas** | a limpeza de pontos é global; o bloco vem antes do Leitor |
| 4 | **Leitor** | depois de Cercas, para nunca ser apagado por elas |
| 5 | **Eventos** | depende de Ativo, Cercas e Leitor |
| 6 | **Conexão** | fecha a comunicação com o sistema |

Os blocos são versionados no cadastro; **o módulo não guarda a versão**. A T09 mostra o conteúdo que grava, e a T11 compara o conteúdo lido com o cadastro. As cercas aparecem em regiões; na trava de capacidade da T09, o limite vigente é o total de pontos, porque o cadastro já impede regiões demais.

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
| Serial não cadastrado | T07 | nomeia pela letra, bloqueia, **registra no M2** |
| Modelo/variante sem suporte v1 | T07 | nomeia pelo cadastro, bloqueia, registra |
| Firmware fora da lista | T07 | atualiza, se o módulo tem rede, e relê o diagnóstico; sem rede, grava só a conexão → atualiza → relê |
| Conteúdo não cabe no módulo | T09 | no envio, sobre o que vai ser gravado — bloqueia (mesmo cálculo da publicação no M2) |
| Pontos de cerca demais pro módulo | T09 | no envio, sobre o que vai ser gravado; nomeia a quantidade de pontos e a capacidade do módulo |
| Ocupação de pinos em conflito | T06, reconferido em T09 | erro de projeto de instalação; bloqueia e escalona, sem resolver trocando o leitor em campo |
| Ativo fora do pacote | T06 | trava. **Não oferece "solicitar cadastro"** (princípio 5) |
| Sessão de acesso vencida | T01 | bloqueia configuração; **preserva fila e evidências** |
| Pacote > 7 dias | T03 | bloqueia; aviso não bloqueante a partir de 3 |
| Envio em andamento | T02, T06 | bloqueia troca de contexto e de ativo |

**Nunca trava:** buffer/LOG pendente no módulo, o modem sem sinal, o módulo que está em outro ativo — este avisa, e vincular aqui registra o desvínculo. É informação, não bloqueio.

**ID e recebimento têm provas separadas:** a Seção D e o autoteste da T16 conferem o ID com o cadastro; as pendências registradas aparecem quando houve reescrita do ID. A Seção F atual confere Posição e Evento de teste e não bloqueia o registro do checklist; uma falha exige ciência do técnico. A antiga atribuição da trava do ID à Seção F não é a regra desta entrega.

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
4. Restaurar o parâmetro de repouso          → assertiva 6
5. Fechar o canal de programação             → assertiva 5
6. Enfileirar o log da sessão
7. Desconectar
8. Apresentar o autoteste, assertiva por assertiva, com o valor lido
```

**Sessão abortada:** pula 1–3, executa 4–7.
**Falha do autoteste:** bloqueia a homologação, **não** o encerramento — o canal tem de fechar sempre.

**A T13 registra o checklist e aguarda o autoteste. A homologação só aparece na T16**, depois de reinício automático e releitura sem falha. As sete assertivas são Configuração, Contadores, Reset de leitura, ID no cadastro, Canal de programação, Repouso do módulo e Evento do cartão. A tela separa aprovadas, não se aplicam e pendentes. O reset não usado mostra o motivo; o evento do cartão pode ficar pendente por até 24 h sem impedir a homologação.

### 4.3 Semáforo do módulo (T04)

Sem módulo · Conectado saudável · Conectado com falha

### 4.4 Item de fila (T15)

na fila · enviando (com progresso próprio) · recebida · com erro

Erro nomeia **causa e ação**: falha de rede → reenvio automático · recusa do servidor → **manual**, nunca retentativa silenciosa.

---

## 5. HUs mapeadas por tela

> Numeração criada aqui (`HU-T<nn>-<n>`) — os requisitos têm critérios de aceite, não HUs numeradas.
> O v1 citado como origem contava 52 quadros em 5 fluxos. A entrega atual tem 15 telas-mãe e 191 referências; o índice atual é `02-telas/indice.json`. A seção 6 preserva o agrupamento histórico, sem criar percursos alternativos no palco.

### T01 — Login

| HU | Promessa |
|---|---|
| HU-T01-1 | Entro com usuário e senha; erro não distingue usuário inexistente de senha errada |
| HU-T01-2 | Com sessão válida e sem rede, o app abre direto na home |
| HU-T01-3 | **Lembrar meu usuário** desmarcado por padrão, guarda só o identificador, limpável no campo |
| HU-T01-4 | Outro usuário descarta a sessão anterior; a fila do anterior é preservada e continua subindo |
| HU-T01-5 | Recupero senha informando celular ou e-mail, com validação local e conferência pelo servidor; nenhum contato do cadastro aparece antes do login |
| HU-T01-6 | Máscara de telefone **derivada do DDI**, não fixa; trocar DDI reaplica e avisa |
| HU-T01-7 | Digito código de 6 dígitos · 10 min · 3 tentativas · reenvio após 60 s · teto 3/hora |
| HU-T01-8 | Não recebi o código com duas saídas: reenviar o código ou usar outro dado; ambas respeitam a espera de 60 s, sem acionar o gestor · decisões 32 e retorno do PM de 06/10, rodada 3 |
| HU-T01-9 | **Eu** crio a senha nova; os 6 requisitos ficam visíveis desde o início e marcam sozinhos |
| HU-T01-10 | Modal diz "senha alterada", sem botão fechar; a troca encerra sessões em outros aparelhos |
| HU-T01-11 | A sessão de acesso **não expira por inatividade**; só por Sair ou pelos 7 dias, com aviso no 5º |
| HU-T01-12 | **Sair** tem tela própria: mostra sessão de configuração aberta, itens na fila e o que sobrevive |

### T02 — Seleção de contexto

| HU | Promessa |
|---|---|
| HU-T02-1 | Escolho primeiro a empresa, depois a unidade que tenho permissão, com busca quando a lista for longa; o herói começa com três empresas |
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
| HU-T04-1 | Vejo o semáforo do módulo no topo e a faixa de sessão acima dele |
| HU-T04-2 | Vejo as ferramentas; as que dependem de módulo ou ativo ficam desabilitadas com o motivo |
| HU-T04-3 | A fila mostra o contador de pendentes no próprio cartão, sem abrir |
| HU-T04-4 | Checklist pendente aparece como aviso persistente |
| HU-T04-5 | Não existe console de log. Cada ferramenta reporta estado em linguagem de campo |
| HU-T04-6 | Sem rede, o menu continua de pé; só as últimas instalações esperam a conexão |

### T05 — Conectar módulo

| HU | Promessa |
|---|---|
| HU-T05-1 | Busco dispositivos sem fio; vazio explica alimentação e distância |
| HU-T05-2 | Conectar abre a sessão e leva ao diagnóstico; a faixa desce na T07 quando a leitura termina sem trava |
| HU-T05-3 | Falha de comunicação nomeia o módulo que não respondeu e mostra as causas aprovadas para conferir |
| HU-T05-4 | Perda de link mostra Reconectar e preserva o estado da etapa |
| HU-T05-5 | Bluetooth desligado ou sem permissão: o app diz o que fazer antes de procurar |

No protótipo (decisão 44), a sessão nasce na conexão, mas **a faixa desce na T07**, quando a leitura do módulo passa sem trava. Numa trava, o módulo fica em cima do título, sem faixa. A revisão de 06/10 acrescentou leituras: o diagnóstico tem nove linhas, das quais oito entram no contador; as mensagens pendentes só informam.

### T06 — Seleção do ativo

| HU | Promessa |
|---|---|
| HU-T06-1 | Busco por placa, frota ou módulo; vejo o modelo do ativo |
| HU-T06-2 | Confirmo o vínculo vendo placa, frota, fabricante e modelo — sem chassi |
| HU-T06-3 | Se o módulo já está em outro ativo, o app avisa; vincular aqui desfaz o vínculo antigo e registra o desvínculo |
| HU-T06-4 | Se o módulo já é deste ativo, é manutenção: o vínculo decide o modo, e eu não preciso escolher |
| HU-T06-5 | Ativo fora do pacote trava, sem oferecer solicitar cadastro |
| HU-T06-6 | A matriz de ocupação de pinos roda aqui; conflito é erro de projeto de instalação e bloqueia, sem saída trocando o leitor |
| HU-T06-7 | Conflito sem saída é nomeado como incompatibilidade e escalonado — não há reordenação que resolva |
| HU-T06-8 | Cada linha do arnês é nomeada por cor e função |

### T07 — Diagnóstico do módulo

| HU | Promessa |
|---|---|
| HU-T07-1 | Logo depois de conectar, vejo o módulo: serial, firmware, alimentação, GPS, entradas, modem e SIM |
| HU-T07-2 | Serial fora do cadastro, modelo sem suporte e firmware fora da lista travam — cada um com a sua mensagem |
| HU-T07-3 | Firmware fora da lista oferece atualizar quando o módulo tem rede; sem rede, o app grava só a conexão, e então atualiza |
| HU-T07-4 | As demais leituras não bloqueiam o diagnóstico; o checklist registra o resultado. No GPS, o critério é a antena conectada, em curto ou desconectada; satélites só informam |
| HU-T07-5 | A CAN aparece depois que o bloco do ativo é gravado, com a lista do modelo; sinal sem leitura ou fora do esperado aparece na própria linha. A CAN do herói não lista velocidade |
| HU-T07-6 | Ler de novo relê a CAN inteira |

### T09 — Configurar módulo

| HU | Promessa |
|---|---|
| HU-T09-1 | Na instalação nova, vejo o que vai ser gravado antes de gravar: todos os blocos, obrigatórios |
| HU-T09-2 | Antes da gravação, confiro a ocupação de pinos e o espaço calculado sobre o que vai ser gravado; a capacidade atual conta contadores e pontos de cerca |
| HU-T09-3 | A limpeza vem primeiro e diz o que apaga e o que preserva — e apaga só a parte dos blocos que vão ser gravados |
| HU-T09-4 | Se os contadores ou os pontos de cerca excedem a capacidade do módulo, a gravação não começa; o aviso mostra a quantidade e o limite e orienta procurar outro módulo |
| HU-T09-5 | Na manutenção, escolho um bloco e reenvio só ele |
| HU-T09-6 | Cada bloco só inicia com o anterior confirmado por read-back |
| HU-T09-7 | Falha interrompe, nomeia a etapa em linguagem de campo e oferece repetir a etapa |
| HU-T09-8 | Queda no meio: retomo do mesmo bloco, de forma idempotente |
| HU-T09-9 | Ao final, read-back consolidado dos parâmetros críticos |
| HU-T09-10 | Nova instalação é transação inteira — abortar mantém na tela de recuperação até Conexão gravar |

### T10 — Calibração

| HU | Promessa |
|---|---|
| HU-T10-1 | Vejo só as grandezas calibráveis para este ativo × módulo, com justificativa quando indisponível; o ônibus do herói mostra Nada a calibrar neste ativo |
| HU-T10-2 | Rotação: informo o valor que leio no painel; o módulo calcula o fator. Velocidade só aparece com tacógrafo digital, como opcional fora da contagem obrigatória |
| HU-T10-3 | Hodômetro/horímetro: digito o valor do painel; o app converte a unidade |
| HU-T10-4 | O horímetro só aparece quando o modelo tem, e é opcional: posso pular |
| HU-T10-5 | O read-back tolera granularidade + tempo decorrido, na unidade do reporte |
| HU-T10-6 | Releitura obrigatória antes do ciclo de testes |
| HU-T10-7 | Recalibrar em manutenção recalcula o offset, não acumula |
| HU-T10-8 | Quem escolhe pulso ou GPS é o cadastro do modelo de ativo, não eu |

### T11 — Conferir configuração

| HU | Promessa |
|---|---|
| HU-T11-1 | A conferência compara o conteúdo de cada bloco — o módulo não guarda versão |
| HU-T11-2 | Vejo as cercas, em regiões, a rede do módulo, os eventos e o leitor, cada um com o que está no módulo e no cadastro |
| HU-T11-3 | ~~O Extended ID aparece só pra leitura~~ · saiu no retorno do PM (06/10): cartão é assunto da plataforma web |
| HU-T11-4 | Corrigir este bloco permite escolher qualquer linha divergente e reenviar aquele bloco por vez; os dependentes ficam para revisar conforme a cadeia |
| HU-T11-5 | Depois de reenviar um bloco, os que dependem dele ficam marcados *revisar em seguida* |
| HU-T11-6 | As outras ações dizem o efeito: reenviar os 5 blocos ou apenas registrar o diagnóstico |
| HU-T11-7 | Índice que o firmware cria sozinho não é divergência; sem lista, vai para *não classificados* |
| HU-T11-8 | Escopo fixo em limpeza de configuração — limpeza total não é oferecida aqui |
| HU-T11-9 | Configuração conforme é declarada explicitamente; o diff sobe mesmo sem reenvio |

### T12 — Últimas instalações

| HU | Promessa |
|---|---|
| HU-T12-1 | Vejo por ativo: última intervenção, posicionamento, eventos e status geral |
| HU-T12-2 | A janela de posicionamento é derivada do pacote (`3 × intervalo + 2 min`), não fixa |
| HU-T12-3 | Os 10 min aparecem como teto de espera, não como critério |
| HU-T12-4 | Critério sem parâmetro declarado fica indisponível com motivo |
| HU-T12-5 | Offline mostro o último resultado conhecido com a data da consulta |
| HU-T12-6 | Falha por rede vira pendente com re-checagem por 24 h, não reprovação imediata |

### T13 — Checklist

| HU | Promessa |
|---|---|
| HU-T13-1 | Itens automáticos não são marcáveis à mão; "marcar todos" só nos manuais sem foto |
| HU-T13-2 | Item automático reprovado mostra o motivo e leva direto à tela que corrige |
| HU-T13-3 | Vejo progresso separado por seção e por tipo |
| HU-T13-4 | Posso responder manual como não conforme com justificativa e foto do problema → marca ressalvada, não bloqueia |
| HU-T13-5 | Finalizar exige A, C, D e E resolvidas e todas as fotos obrigatórias da B; o motivo da pendência aparece embaixo do botão |
| HU-T13-6 | A Seção F não bloqueia; finalizar com ela falhando exige ciência marcada, com nome e hora |
| HU-T13-7 | Finalizar registra o checklist e gera o relatório com seriais, resultados, fotos, localização quando permitida e técnico; aguarda o autoteste da T16 |
| HU-T13-8 | Os passos da Seção E são preenchidos pelo ciclo da T14; o bip do leitor é testado e respondido aqui quando há buzzer |
| HU-T13-9 | A foto do painel é tirada aqui, na Seção B — obrigatória quando houve calibração |

### T14 — Ciclo de testes

| HU | Promessa |
|---|---|
| HU-T14-1 | Com o veículo parado, o ciclo prova até quatro passos: ignição ligada, rotação quando aplicável, cartão quando há leitor e ignição desligada, mais o evento de teste; ré e porta saíram |
| HU-T14-2 | Disparo o evento de teste por botão, com o cronômetro dos 120 s em destaque |
| HU-T14-3 | Antes do cronômetro vejo a fila do módulo drenando; o botão fica indisponível com motivo |
| HU-T14-4 | Vejo 3 linhas de estado: disparado · recebido · campos conferidos. E posso disparar novamente |
| HU-T14-5 | No teste do cartão vejo o código que o módulo leu, e confiro com o número do cartão |
| HU-T14-6 | Não conferindo, o item vira não conforme e pede justificativa no checklist |
| HU-T14-7 | Vejo o tempo decorrido e o que ainda falta capturar; encerrar leva direto ao checklist |
| HU-T14-8 | ~~A velocidade só entra no ciclo quando o ônibus tem tacógrafo digital~~ · retirada do ciclo na rodada 3 de 06/10; segue como calibração opcional da T10 para o modelo com tacógrafo |

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
| HU-T16-4 | Vejo as sete assertivas do autoteste, cada uma com o valor lido, e os contadores separados de aprovadas, não se aplicam e pendentes; a homologação só aparece na T16 após esse resultado |
| HU-T16-5 | Falha do autoteste bloqueia a homologação, **não o encerramento** |
| HU-T16-6 | Sessão interrompida é **oferecida de volta**, com o ponto de retomada |
| HU-T16-7 | Descartar não desfaz o que foi gravado — descarta a intenção, e isso é registrado |
| HU-T16-8 | Canal aberto por sessão anterior é **anomalia**: o app fecha antes de começar |

---

## 6. O agrupamento histórico em 5 fluxos — `[PROPOSTO]`

Os requisitos v1 citavam "52 telas em 5 fluxos" sem enumerá-los. A tabela preserva a derivação original por atividade do produto; não é a navegação vigente do painel e não autoriza acrescentar cenários de demonstração interativos. O percurso atual está em `fluxos.md` e no protótipo.

| # | Fluxo | Telas-mãe |
|---|---|---|
| 1 | **Acesso e preparo** | T01 · T02 · T03 |
| 2 | **Nova instalação** | T05 · T07 · T06 · T09 · T10 · T14 · T13 · T16 |
| 3 | **Manutenção** | T05 · T07 · T06 · T09 (um bloco) · T11 · T16 |
| 4 | **Conferência e diagnóstico** | T07 · T11 · T12 · T15 |
| 5 | **Encerramento e homologação** | T13 · T16 (autoteste) |

**A contagem antiga de 52 não é o censo desta entrega.** Para desenvolver, use as 191 referências do índice atual: 15 telas, 97 momentos e 79 estados. Exemplos especiais de contexto, manutenção, calibração e divergência ficam parados em *Estados desta tela*, com retorno ao fluxo anterior.

---

## 7. As lacunas originais e o que foi resolvido

| # | Lacuna | Bloqueia | Quem decide |
|---|---|---|---|
| **R1** | **Resolvida:** o Evento do cartão pode ficar pendente por até 24 h e não bloqueia a homologação | T16, retorno do PM de 06/10; `autotesteEncerramento` no mock | **PM** |
| **R2** | **Resolvida:** são sete assertivas; o reset não usado aparece como não se aplica, com o motivo; três contadores separados | T16, retorno do PM de 06/10 | **PM** |
| **R3** | A enumeração exaustiva do vocabulário segue aberta; as substituições e a exceção da APN já foram aprovadas | revisão de linguagem, sem alterar textos aprovados por conta própria | **Produto** |

As demais perguntas que realmente continuam abertas estão em `08-para-o-dev/o-que-o-produto-ainda-decide.md`. Não reabrir R1 e R2 a partir das notas do v1.

---

## 8. Anti-slop — o que este produto **não** é

Lista para o escopo negativo dos prompts de cycle:

- **Não é dashboard.** Não tem KPI de topo, não tem gráfico de tendência, não tem "visão geral".
- **Não tem console.** Nenhuma tela mostra comando, resposta bruta ou log.
- **Não tem configuração de usuário.** O técnico não ajusta nada além de *lembrar usuário*.
- **Não tem seletor de conteúdo técnico.** Nem de script, escopo, índice ou faixa. Na manutenção, o técnico pode escolher o bloco de negócio que reenvia; o conteúdo continua vindo do cadastro.
- **Não tem cadastro em campo.** Nem ativo, nem módulo, nem cerca, nem identificador.
- **Não tem assinatura em tela** (fora da v1).
- **Não tem histórico de intervenções para o técnico** (é tela web do gestor).
- **Não tem console de logs, DSM, nem listagem de PGN** (fora da v1).
