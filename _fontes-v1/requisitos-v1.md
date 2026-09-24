# App Configurador — Requisitos v1

**Produto:** aplicativo mobile de instalação, configuração e homologação de módulos de telemetria embarcados.
**Público:** técnico de campo terceirizado, **sem conhecimento prévio de lógica `.xvm`**.
**Data:** 19/08/2026 · revisões 20/08/2026 (time), 20/08/2026 (protótipo), 20/08/2026 (equipamento), 20/08/2026 (fechamento das lacunas) e 21/08/2026 (protótipo rev 4)
**Status:** requisitos fechados. As 9 pendências `[CONFIRMAR]` foram decididas em 20/08/2026 e aparecem marcadas `[DECIDIDO 20/08]` no corpo do texto. As 14 questões do protótipo aparecem marcadas `[DECIDIDO PROTÓTIPO]`. As 10 decisões da avaliação contra o equipamento aparecem marcadas `[DECIDIDO EQUIPAMENTO]`. As 12 lacunas que restavam abertas (A1–A12) foram decididas em 20/08/2026 e aparecem marcadas `[DECIDIDO FECHAMENTO]`, junto com as duas correções de nomenclatura e quatro riscos convertidos em requisito.

**Três lacunas em aberto, todas expostas pela rev 4 do protótipo em 21/08** — `R1`, `R2` e `R3` em §10. As duas primeiras decidem *quando uma instalação é homologada* e são critério de entrada em campo: a assertiva 8 do autoteste promete não prender o técnico, mas o critério de finalização de T13 a prende; e "as oito assertivas" da Seção D inclui uma que só existe em algumas sessões. A terceira é a lista de vocabulário proibido do princípio 1, que está incompleta e que o próprio documento viola em T06. Fora dessas, **nenhuma das 45 pendências das quatro rodadas anteriores restou aberta.**

A validação foi revisada em 20/08: a bancada saiu do caminho crítico e virou o **autoteste de instalação** — um reinício e uma releitura no encerramento da sessão, que prova em toda instalação o que dez itens de bancada iam confirmar uma vez em dois equipamentos (**Anexo A**). Sobrou **um** item de bancada obrigatório, destrutivo por definição, e uma confirmação de meia hora: por qual via cada driver reinicia o módulo. Riscos recalculados e sob monitoramento em §10.

**Revisão do protótipo — 20/08/2026.** O wireframe navegável do fluxo completo expôs **14 pontos** em que o documento não decidia o suficiente para a tela existir, ou em que duas seções se contradiziam. Todos foram fechados e aparecem marcados `[DECIDIDO PROTÓTIPO]` no corpo do texto. As mudanças estruturais que saíram daí:

- A **limpeza deixou de ser ferramenta de escopo livre**: os dois escopos destrutivos são o bloco 1 da cadeia de T09. O que sobrou autônomo é o **reset de leitura do ativo** (T08), que não descarta dado do cliente.
- Três telas novas: **T14 Ciclo dinâmico** (unifica a fase dinâmica de T07, a Seção E e a viagem da Seção F), **T15 Fila de saída** e **T16 Sessão de configuração**.
- A **Seção F deixou de bloquear a finalização**, passando a exigir ciência registrada do técnico.
- **Duas sessões com nomes distintos**: *sessão de acesso* (login) e *sessão de configuração* (módulo). A ambiguidade entre as duas inviabilizava a tela de encerramento.
- Novo item de bancada **B6**, derivado do reset de leitura.

Índice das 14 decisões em §10.

**Revisão contra o equipamento — 20/08/2026.** A leitura do documento e do protótipo contra o comportamento documentado dos VL06 e VL08 encontrou **22 lacunas**. Dez foram decididas na hora, como `[DECIDIDO EQUIPAMENTO]`; as outras doze (A1–A12) foram decididas no fechamento do mesmo dia, como `[DECIDIDO FECHAMENTO]`. As decisões da primeira rodada que mudam estrutura:

- **A limpeza não descarta dado do cliente.** Nenhum dos dois escopos toca buffer ou LOG — só o escopo de fábrica, já proibido, e a reescrita de ID. A exigência de drenagem com rede antes de operação destrutiva **foi removida**: nasceu de uma premissa errada de protocolo e era o único ponto do fluxo sem saída em campo.
- **Fluxo padrão para todos os usuários.** A flag de limpeza total e o papel de permissão estendida saem de §3. O escopo passa a ser derivado só do cenário: **nova instalação usa limpeza total, manutenção usa limpeza de configuração**.
- **Modelo, variante, ID e senha vêm do cadastro de módulos do core M2**, indexados pelo serial. A letra do serial deixa de ser a fonte e passa a ser reserva, para nomear o equipamento quando o serial não está cadastrado.
- **Ordem canônica única, com Cercas antes de Leitor.** Isso transforma a regra 7 de §6 num invariante da ordem e elimina o reenvio duplicado do bloco *Leitor*.
- **Firmware antes de conectividade:** T05 ganha o caminho de gravar a conectividade como transação isolada antes da atualização, e de reler capacidades depois.

**Fechamento das 12 lacunas restantes — 20/08/2026.** As lacunas A1–A12 foram decididas uma a uma, com duas correções de nomenclatura e quatro riscos convertidos em requisito. As que mudam estrutura: a **versão dos 5 blocos** passa a viver no módulo como string composta e sua leitura é o primeiro passo do diff (A2); a **matriz de capacidades** ganha as dimensões que os blocos *Eventos* e *Ativo* consomem, com validação de faixa de contadores **bloqueante na publicação** (A4 · risco 7); o **repouso do módulo** é inibido durante a sessão de configuração, que ganha um passo de restauração no encerramento (A7); o **prazo dos 120 s** passa a contar de pendências em zero, e o evento de teste ganha índice reservado e marcado (A5); e a **consulta de auditoria de operações destrutivas** entra na v1 como escopo de backoffice (risco 10).

Índice completo das 10 decisões de equipamento e das 12 do fechamento em §10. Detalhamento numérico em `Avaliacao-Gaps-VL06-VL08.html`.

**Rev 4 do protótipo — 21/08/2026.** O wireframe foi reconstruído para refletir as três rodadas que ele ainda não conhecia (equipamento, fechamento e validação): **52 telas** em 5 fluxos, cadeia de 6 blocos, encerramento de 8 passos com o autoteste em tela própria, quatro travas novas de pré-checagem e a trava por dado pendente removida. Nenhuma decisão de produto nova saiu do alinhamento — mas escrever as telas do autoteste **expôs três lacunas** (`R1`–`R3`), e quatro decisões de rastreabilidade foram tomadas sobre o inventário de decisões do protótipo. Tudo em §10, subseção *Revisão do protótipo rev 4*. Protótipo em `Wireframe-App-Configurador.html`.

---

## 1. Princípios de produto

Estes princípios resolvem empates de decisão em todo o documento.

1. **O técnico responde perguntas de negócio; o app fala protocolo.** Nenhuma tela expõe comando, sintaxe ou nome de variável XVM.
   - `[DECIDIDO FECHAMENTO]` **regra dura, verificável em revisão de tela.** Não aparecem em tela: baudrate, código de entrada ou saída física (IN3, OUT1), índice de memória, nome de contador, nem a palavra *script*. Hardware é nomeado por **cor e função** — "fio branco, leitor". O valor técnico continua existindo no log de sessão e na evidência, onde o suporte e o gestor o encontram; nunca na tela do técnico.
   - O rótulo de navegação de T09 é **Configurar módulo** em toda a interface, protótipo incluído. "Envio de scripts" não sobrevive em nenhum lugar do produto.
2. **O sistema decide, o técnico executa.** Todo conteúdo de configuração vem do cadastro do M2. O técnico não escolhe script, parâmetro, índice ou faixa.
3. **Sucesso de comando não é sucesso de configuração.** Todo envio é confirmado por releitura do módulo (*read-back*).
4. **Nenhuma etapa deixa o módulo em estado inválido.** Operações destrutivas são transacionais: se a sequência não termina, o app retoma ou reverte.
5. **Sem cadastro prévio, o app trava.** Na v1 não existe caminho de improviso em campo.
6. **A evidência é gerada pelo app, não digitada pelo técnico.** O que o app pode comprovar, o técnico não marca à mão.

---

## 2. Escopo

### Dentro da v1

- Autenticação e seleção de contexto (empresa / UC / UO).
- Recuperação de senha por código, com criação da nova senha pelo próprio usuário.
- Sincronização de pacote offline por cliente.
- Descoberta, pareamento e identificação do módulo **contra o cadastro de módulos do core M2** — serial, modelo, variante, ID de plataforma e credenciais.
- **Sessão de configuração como objeto de primeira classe**: abertura, estado visível, retomada e encerramento explícito.
- Seleção do ativo e vínculo módulo ↔ ativo.
- Leitura e conferência de dados da CAN em fase estática.
- **Ciclo dinâmico único**, que alimenta a fase dinâmica da CAN, a Seção E do checklist e a viagem exigida pela Seção F.
- Limpeza com **escopo derivado do cenário**, executada como bloco 1 da cadeia — sem escolha do técnico e sem permissão especial.
- **Reset de leitura do ativo** como ferramenta autônoma.
- Envio dos **5 blocos do core M2** (Conexão, Ativo, Leitor, Eventos, Cercas) em cadeia de dependência.
- Calibração de RPM, velocidade, hodômetro e horímetro para ativos que não trafegam esses dados por CAN.
- Checklist de homologação com evidência fotográfica.
- Validação de recebimento no servidor (últimas instalações/manutenções).
- Fluxo de manutenção: leitura da configuração instalada, diff contra o esperado, reconfiguração.
- **Fila de saída visível**, com estado por item e feedback de carregamento, erro e sucesso.

### Fora da v1

| Item | Motivo |
|---|---|
| Configuração de câmeras e DSM | Fase seguinte, no modelo do app WiFi Kit. Nenhum equipamento Virloc/Vircom/Vircone faz DSM — é recurso da linha JC. |
| Console de logs no app | Logs passam a ser geridos no M2. |
| Cadastro de ativo/script em campo | Sem cadastro no M2, o fluxo trava. |
| Modo listagem de PGN para ativo desconhecido | Consequência do item acima. Reavaliar na v2. |
| Histórico de intervenções para o técnico | Vai para a tela web do gestor Mobs. |

### Modelos de equipamento suportados

Declarado: **toda a linha Virloc, Vircom e Vircone.**

> **Risco de escopo.** As famílias não são intercambiáveis: senha de 8 dígitos (VL06) vs 4 dígitos (VL08/VL12/VC07); baudrate 19.200 (VL06) vs 115.200 (demais); sintaxe de limpeza distinta; quantidade de contadores e de regiões de cerca distinta; e a leitura de pulsos existe apenas nas variantes VL06 FULL e ECO.
>
> **Requisito derivado:** a comunicação com o módulo deve ser implementada como **driver por modelo**, com a matriz de capacidades vinda do pacote de sincronização — não codificada no app. Incluir um modelo novo deve ser cadastro, não release.
>
> `[DECIDIDO 20/08]` **a v1 entrega dois drivers: VL06 e VL08.** Os dois cobrem os extremos da matriz de diferenças — senha de 8 vs 4 dígitos, baudrate 19.200 vs 115.200, sintaxe de limpeza distinta e leitura de pulsos presente só no VL06 (FULL e ECO). É o menor escopo que prova a arquitetura de driver por modelo.
>
> VL12, VC07 e a linha Vircone entram **por cadastro**, sem release do app, à medida que a paridade de comandos for validada. Critério de aceite da arquitetura: incluir o VL12 na matriz de capacidades do pacote de sincronização deve habilitar o modelo em campo **sem publicar versão nova do aplicativo**.
>
> `[BANCADA]` paridade de comandos para VC03, VC05 e VCONE — bloqueia a habilitação desses modelos por cadastro, não a entrega da v1.

#### Origem da identificação do módulo — `[DECIDIDO EQUIPAMENTO]`

**Modelo, variante, ID de plataforma e credenciais vêm do cadastro de módulos do core M2, indexados pelo serial.** A letra do número de série deixa de ser a fonte da identificação e passa a ser **reserva**, usada apenas para nomear o equipamento quando o serial não está cadastrado.

O motivo é que a letra não é suficiente. Ela identifica a família, não a variante — e no VL06 a letra `F` cobre **quatro variantes** que divergem justamente no que decide o fluxo:

| Variante VL06 | CAN | Bluetooth | Leitura de pulsos | IN1 / IN2 |
|---|---|---|---|---|
| FULL | por indução (gateway serial) | sim | sim | livres para pulso |
| ECO | por indução (gateway serial) | **não** | sim | livres para pulso |
| CAN-BT | barramento físico | sim | não | ocupadas pela CAN |
| CAN | barramento físico | **não** | não | ocupadas pela CAN |

Consequências que entram no requisito:

- A **variante é dimensão própria da matriz de capacidades**, no mesmo nível do modelo. É ela que decide se a calibração por pulso existe (só FULL e ECO), se o meio de conexão BLE está disponível, e se a leitura da CAN ocupa a porta serial.
- **Sem Bluetooth não há saída para o conflito cabo × leitor serial.** Nas variantes ECO e CAN, um ativo com leitor RFID serial é fisicamente inconfigurável pelo app — a ação *reconectar por BLE* de T06 não existe ali. Essa combinação é **barrada no cadastro do M2**, na vinculação do módulo ao ativo, não em campo.
- O app **nunca deduz a variante**. Se o cadastro não a declara, o módulo é tratado como não cadastrado.

**Dois estados de bloqueio, com mensagens diferentes:**

| Estado | Quando | O que o app faz |
|---|---|---|
| **Serial não cadastrado** | o serial lido não existe no cadastro de módulos da empresa | bloqueia, nomeia o equipamento pela letra do serial ("este parece ser um VL06; ele não está cadastrado nesta empresa") e registra a tentativa no M2 |
| **Modelo ou variante sem driver na v1** | cadastrado, mas fora dos dois drivers da v1 | bloqueia, nomeia o modelo e a variante pelo cadastro, e registra a tentativa |

**Modelo fora da v1 encontrado em campo** — `[DECIDIDO 20/08]`: o app **identifica, bloqueia e registra**.

A tabela abaixo passa a ser a **reserva de nomeação** para serial não cadastrado:

| Letra | Modelo | Situação na v1 |
|---|---|---|
| F | VL06 | Driver na v1 |
| L | VL08 | Driver na v1 |
| I | VL12 | Por cadastro |
| K | VC07 | Por cadastro |
| A | VCONE | Depende de `[BANCADA]` |
| D | VC03 | Depende de `[BANCADA]` |
| G | VC05 | Depende de `[BANCADA]` |
| E / C / P | VL11 / VL10 / VL15 | Fora de escopo |
| N | Gateway CAN | Fora de escopo |

- O app **reconhece o modelo pelo nome**, não devolve erro genérico: "este módulo é um VC07; ele ainda não está habilitado para configuração pelo aplicativo".
- **Registra a tentativa no M2** — serial, modelo, variante, empresa, ativo pretendido, técnico, data. É o único sinal objetivo de qual driver priorizar em seguida; sem isso a decisão volta a ser anedota do suporte. O mesmo registro vale para **serial não cadastrado**, e nesse caso ele também é o sinal de que falta cadastro de módulo.
- **Nunca tenta configurar por aproximação.** Tratar VL12 ou VC07 como VL08 porque compartilham senha e baudrate é o caminho mais curto para um módulo mal configurado sem sintoma imediato. Vale igual para variante: tratar um VL06 CAN como FULL quebra a calibração por pulso sem erro visível.
- Serial com letra desconhecida cai na mesma regra, informando o código lido.

---

## 3. Papéis e permissões

| Papel | Onde | Pode |
|---|---|---|
| Técnico de campo | App | Navegar livremente pelas empresas/UC/UO que tem permissão. Configurar, calibrar, preencher checklist. **Executa a cadeia completa, incluindo o escopo de limpeza que o cenário exigir.** |
| Gestor Mobs | M2 web | Ver logs, checklists preenchidos, histórico por módulo/ativo, validar instalações. |
| Engenharia | M2 web | Cadastrar e versionar blocos, matriz de compatibilidade, presets de evento. |

Na v1 o técnico **navega livre** dentro do seu escopo de permissão — não há vínculo obrigatório a ordem de serviço.

~~`[DECIDIDO 20/08]` a limpeza total é controlada por flag de permissão no perfil do usuário no M2.~~ **Revogado em 20/08 pela avaliação de equipamento.**

`[DECIDIDO EQUIPAMENTO]` **fluxo padrão para todos os usuários. Não existe permissão diferenciada por escopo de limpeza na v1.**

O que sustentava a flag era a suposição de que a limpeza descartava dados do cliente. Ela não descarta: nenhum dos dois escopos toca buffer ou LOG (ver T08). O que a limpeza total faz é derrubar a conectividade — e isso é **transacional**, não perigoso, porque o bloco *Conexão* é reescrito na mesma cadeia. Um risco transacional se resolve com transação, não com permissão.

- A flag `pode_executar_limpeza_total` **sai do cadastro de perfil e do pacote de sincronização**.
- O papel *técnico com permissão estendida* **deixa de existir**.
- **O escopo continua não sendo escolhido pelo técnico** — ele é derivado do cenário (T08). O que mudou é que nenhum cenário fica bloqueado por perfil.
- Toda execução continua registrando usuário, módulo, ativo, escopo e horário no log imutável (§9). O controle passa a ser **auditoria posterior**, não autorização prévia.

---

## 4. Dependência: backoffice no M2

O app não tem valor sem estes cadastros. São escopo web paralelo e **bloqueiam a v1**.

1. **Cadastro de módulos** — `[DECIDIDO EQUIPAMENTO]`: por serial, com **modelo, variante, ID de plataforma (4 dígitos hexadecimais) e credenciais**. É a fonte da identificação em campo (§2), e sem ele o módulo é tratado como não cadastrado. Valida na vinculação as combinações inviáveis: leitor serial em variante sem Bluetooth, cercas acima do limite de regiões do modelo, bloco que não cabe no firmware.
2. **Catálogo de modelos de ativo** com o bloco *Ativo* (tradução dos sinais CAN) versionado por modelo, e o **mapa de contadores** por versão de script (T10). `[DECIDIDO FECHAMENTO]` declara também o **método válido de calibração de velocidade** — pulso ou GPS — por modelo de ativo (T10).
3. **Blocos de script versionados** nas 5 camadas, com publicação e rollback.
4. **Matriz de compatibilidade e capacidades** versão do bloco × modelo × variante × versão de firmware. Inclui os **índices proibidos para limpeza por faixa** (T08) e os limites por modelo usados na pré-checagem.

   `[DECIDIDO FECHAMENTO]` **a matriz fecha as dimensões de capacidade que os blocos *Eventos* e *Ativo* consomem** — não só cercas e cartões. Sem elas um pacote pode não caber no módulo, e o sintoma aparece como bloco aceito que não funciona:

   | Dimensão | Limite declarado por modelo × variante × firmware |
   |---|---|
   | Eventos | quantidade de eventos e faixa de índices utilizável |
   | Condições por evento | quantas condições cada evento aceita |
   | Caracteres de ação | tamanho total disponível para as ações dos eventos |
   | Filtros e capturas de CAN | quantos filtros e quantas capturas simultâneas |
   | Contadores | quantidade, numeração com as lacunas do modelo, e faixa persistida em flash |
   | Flags | quantidade disponível |
   | Buffer de texto | quantas posições e o tamanho de cada uma |
   | Cercas e cartões | **dois limites separados**: número de regiões e número de posições do pool (§6.4) |
   | Pontos por cerca | teto de pontos que uma região aceita |
   | Índices reservados pelo firmware | os que o firmware ocupa por conta própria (T11) |

   Daí nasce um item único de pré-checagem — **"o conteúdo previsto cabe neste módulo e firmware"** (T05) — avaliado com o mesmo cálculo que roda na publicação do bloco no M2. O erro raramente chega ao campo, e quando chega tem causa nomeada.

   `[DECIDIDO FECHAMENTO]` **a validação da faixa de contadores é bloqueante na publicação**, não aviso. O M2 recusa publicar bloco *Ativo* cuja faixa declarada inclua índice de efeito colateral, contador semeado ou lacuna de numeração do modelo. O motivo está no risco 7 de §10: faixa mal declarada não falha, ela apaga em silêncio, e o sintoma aparece dias depois como script que parou de reagir. Aviso não protege contra um modo de falha que ninguém vê acontecer.
5. **Presets de evento** por tipo de ativo × modelo de módulo × tipo de operação, com o **intervalo de rastreamento previsto** exposto no pacote — é dele que T12 deriva a janela de posicionamento. `[DECIDIDO FECHAMENTO]` o bloco *Eventos* declara também **modo de fila e tamanho de buffer** do módulo, e o **índice reservado ao evento de teste**, marcado como teste (T12 · T14).
6. **Cadastro de cercas**: 2 áreas por ativo, até 2 cercas por área.
7. **Cadastro de identificadores** (cartões RFID KNOV/SGBRAS, iButton) e o mapa de alocação de índices por módulo.
8. **Tela de logs** de interação por sessão de configuração.
9. **Tela de validação do gestor**: instalações recentes, checklists preenchidos com fotos, status de recebimento de dados.
10. **Consulta de auditoria de operações destrutivas** — `[DECIDIDO FECHAMENTO]`, **dentro da v1**. Sem flag de permissão e sem bloqueio por buffer, o log imutável de §9 deixou de ser rede de segurança e passou a ser o único mecanismo de controle. A consulta responde exatamente cinco perguntas: **quem** executou, **o quê** (escopo), **quando**, em **qual módulo e ativo**, e **quantas mensagens pendentes foram descartadas** quando houve reescrita de ID. Filtros por empresa/UC/UO, técnico e período. Sem tela, o log existe e ninguém audita.

---

## 5. Fluxo de telas

### T01 — Login

- Usuário e senha.
- **Lembrar meu usuário neste aparelho.**
- Recuperação de senha no próprio fluxo, com código enviado por **e-mail ou telefone**, à escolha do usuário.
- Sessão válida offline por **7 dias** sem revalidação — período configurável no servidor.

**Critérios de aceite**
- Credencial inválida não distingue "usuário inexistente" de "senha errada".
- Com sessão de acesso válida e sem rede, o app abre direto em T04 sem exigir login.
- Sessão de acesso vencida bloqueia configuração e exige rede.

`[DECIDIDO 20/08]` **7 dias.** Cobre uma semana de campo sem rede — o cenário real de instalação em pátio, obra e zona rural — e limita a janela em que um aparelho perdido ou um técnico desligado continua conseguindo configurar módulos.

- O app avisa a partir do **5º dia** que a sessão está próxima do vencimento.
- Sessão vencida mantém a fila de saída e as evidências já capturadas; bloqueia apenas novas configurações.

#### Duas sessões, nomes distintos — `[DECIDIDO PROTÓTIPO]`

O documento usava "sessão" para duas coisas diferentes, e isso inviabilizava escrever a tela de encerramento. Ficam nomeadas:

| Nome | Abre | Encerra | Governa |
|---|---|---|---|
| **Sessão de acesso** | no login | por ação **Sair** do usuário, ou pelo vencimento de 7 dias | quem está usando o app |
| **Sessão de configuração** | ao conectar o módulo em T05 | por tela própria (T16) | módulo, ativo, canal de programação e progresso da cadeia |

- A sessão de acesso **não expira por inatividade.** O app fica logado até o técnico escolher **Sair**. Um técnico em campo não pode perder o acesso no meio do pátio por ter ficado vinte minutos embaixo do ônibus.
- **Sair** tem tela própria: mostra se há sessão de configuração aberta, quantos itens restam na fila e o que sobrevive à saída. Com fila pendente, avisa antes — os itens continuam na fila e sobem no próximo login, mas o gestor só os verá depois disso.
- Encerrar a sessão de configuração **não desloga ninguém**.

#### Lembrar usuário — `[DECIDIDO PROTÓTIPO]`

O aparelho circula entre técnicos, então a opção não pode ser inócua nem invisível:

- **Desmarcada por padrão.**
- Guarda **só o identificador**, nunca a senha. Marcada, o campo abre preenchido e o foco vai para a senha.
- **Limpável no próprio campo**, sem entrar em configurações.
- Entrar com **outro usuário descarta a sessão de acesso anterior** em vez de conviver com ela. A fila de saída do usuário anterior é preservada e continua subindo.

#### Recuperação de senha — fluxo completo `[DECIDIDO PROTÓTIPO]`

Quatro telas mais um modal. O que estava escrito antes parava na escolha do canal e não dizia quem define a senha nova.

**1 · Escolha do canal e do dado.** Segmento e-mail / telefone. O campo muda com a escolha, e a validação é local, antes de gastar rede:

| Canal | Campo | Validação |
|---|---|---|
| E-mail | um campo, teclado de e-mail, sem autocorreção | parte local sem espaço; domínio com ponto e extensão de 2+ caracteres |
| Telefone | **seletor de DDI** com busca, +55 pré-selecionado, mais o número | máscara **derivada do DDI** — `+55` → `(00) 00000-0000` — e completude conferida contra ela |

- **A máscara vem do DDI, não é fixa.** Trocar o DDI reaplica a máscara e descarta os dígitos que não couberem, avisando antes. Nenhuma máscara fica codificada para um país só.
- O botão de envio fica desabilitado enquanto o formato é inválido, com o motivo no campo.
- A tela declara que **o dado precisa ser o mesmo do cadastro**.
- A resposta ao envio é **sempre a mesma** — "se houver conta com este dado, o código foi enviado". Mesma regra do login: não confirma existência de conta.

**2 · Digitação do código.** Regras fechadas, e todas visíveis na tela como contador ou mensagem:

| Parâmetro | Valor |
|---|---|
| Dígitos | **6**, com colar do teclado preenchendo os seis |
| Validade do código | **10 minutos** |
| Tentativas por código | **3** |
| Reenvio liberado após | **60 segundos** |
| Teto de envios por conta | **3 por hora** |

- Com os 6 dígitos preenchidos o app **valida sozinho**; o botão permanece como alternativa acessível.
- **Alterar tipo de envio** volta à escolha de canal e **invalida o código já enviado** — nunca dois códigos válidos ao mesmo tempo.
- Esgotar as tentativas **invalida o código e não bloqueia a conta**. Bloquear a conta de um terceirizado em campo transforma erro de digitação em chamado de suporte; quem protege contra abuso é o teto de envios por hora.
- Mensagem de erro **não distingue** "código errado" de "código expirado" — as duas levam à mesma ação.

**3 · Não recebi o código.** Saída obrigatória do beco sem saída criado pela regra de não revelar existência de conta. Três caminhos, nesta ordem: conferir o dado e reenviar; tentar pelo outro canal; acionar o gestor, o que abre solicitação de verificação de cadastro no M2 registrando **usuário informado, canal tentado, data e hora** — sem o dado digitado, que não é confirmado como existente. Offline, a tela mostra o telefone do suporte da operação.

**4 · Criar nova senha.** A senha é definida **pelo próprio usuário e nunca enviada por nenhum canal**. O código autoriza a troca; ele não é a senha nem gera senha temporária.

- Campos de senha e repetição, com alternância ver/ocultar e medidor de força.
- Os requisitos ficam **visíveis desde o início** e marcam sozinhos conforme a digitação — o técnico nunca descobre a regra ao errar:

| # | Requisito |
|---|---|
| 1 | Mínimo de 10 caracteres |
| 2 | Uma letra maiúscula e uma minúscula |
| 3 | Um número |
| 4 | Um caractere especial (`! @ # $ % & * ?`) |
| 5 | Sem o próprio usuário e sem sequência repetida (`aaa`, `123`) |
| 6 | Diferente das 3 últimas senhas usadas |

- Salvar só habilita com os 6 requisitos atendidos **e** as duas senhas idênticas. Divergência é sinalizada no campo de repetição, não no botão.
- **5 · Modal de confirmação.** Diz **"senha alterada"**, não "código confirmado". Sem botão fechar: a única saída é o login. O código é consumido e não serve para uma segunda troca.
- A troca **encerra as sessões de acesso em outros aparelhos**. Se a senha foi trocada porque alguém perdeu o aparelho, deixar a sessão antiga viva anularia a troca.

---

### T02 — Seleção de contexto

- Lista as empresas / UC / UO que o usuário tem permissão de acessar.
- Busca por nome quando a lista for longa.
- **Troca de contexto disponível a qualquer momento** pelo cabeçalho.

**Critérios de aceite**
- Trocar de empresa com módulo conectado: o app avisa que a sessão de configuração será encerrada e pede confirmação.
- Trocar de empresa com envio de script em andamento: bloqueado até concluir ou abortar.
- Contexto ativo sempre visível no cabeçalho.

---

### T03 — Sincronizar dados

Baixa o pacote offline do cliente selecionado.

**Conteúdo do pacote (manifesto)**
- Lista de ativos da empresa, com modelo e módulo vinculado.
- **Cadastro de módulos da empresa** — `[DECIDIDO EQUIPAMENTO]`: serial, modelo, **variante**, ID de plataforma e credenciais. É o que permite identificar o equipamento offline, sem depender da letra do serial.
- Blocos de script aplicáveis aos modelos de ativo da empresa, nas 5 camadas.
- Presets de evento por tipo de ativo × módulo × operação, **com o intervalo de rastreamento previsto**.
- Coordenadas das áreas de cerca cadastradas, **com a quantidade de pontos por cerca**.
- Lista de identificadores e o mapa de índices alocados.
- Matriz de capacidades e compatibilidade por **modelo × variante × versão de firmware**.
- Credenciais operacionais do módulo em formato opaco (ver §10).

**Critérios de aceite**
- O app mostra progresso, volume e tempo estimado.
- Sincronização incremental por versão de manifesto.
- Falha de rede exibe erro com ação **Reconectar**, sem perder o progresso parcial.
- A **versão do manifesto é gravada em toda evidência de instalação**. Sem isso não há auditoria de "com qual script este módulo foi configurado".
- Pacote com mais de **7 dias** bloqueia configuração e força ressincronização; a partir de **3 dias** o app exibe aviso não bloqueante de ressincronização recomendada.
- Publicação de nova versão no M2 gera notificação de ressincronização pendente.

`[DECIDIDO 20/08]` **N = 7 dias, com aviso a partir de 3.** Blocos de script, presets de evento e cercas mudam no M2 com frequência; uma semana é o limite tolerável para configurar um módulo com conteúdo potencialmente desatualizado. O aviso em 3 dias dá ao técnico tempo de ressincronizar antes de travar em campo.

- Prazo configurável por cliente no M2, com 7 dias como padrão.
- A idade do pacote conta a partir do **carimbo de geração do manifesto no servidor**, não da data do download.
- A validade do pacote é independente da validade da sessão (T01), embora ambas usem 7 dias: sessão vencida exige login, pacote vencido exige sincronização.

---

### T04 — Menu de ferramentas (home)

Estado do módulo no topo, como semáforo:

| Estado | Significado |
|---|---|
| Sem módulo | Nenhum dispositivo pareado |
| Conectado, saudável | Identificado e pré-checagem aprovada |
| Conectado, com falha | Identificado com falha de hardware ou incompatibilidade |

Acima do semáforo, a **faixa de sessão de configuração** (T16): presente em toda tela enquanto a sessão vive, e único lugar de onde se encerra. Sem sessão, a faixa mostra "sem sessão de configuração" e oferece **Sair**.

**Ferramentas** — `[DECIDIDO PROTÓTIPO]` a lista mudou de 9 para 10 itens, com dois renomeados:

| # | Ferramenta | Tela | Observação |
|---|---|---|---|
| 1 | Conectar módulo | T05 | abre a sessão de configuração |
| 2 | Ativo selecionado | T06 | |
| 3 | Dados da CAN | T07 | fase estática |
| 4 | **Configurar módulo** | T09 | era "Envio de scripts". A limpeza acontece aqui dentro, como bloco 1 |
| 5 | **Reset de leitura do ativo** | T08 | era "Limpeza do módulo", agora com escopo restrito |
| 6 | Calibração | T10 | |
| 7 | Manutenção / diff | T11 | |
| 8 | Últimas instalações | T12 | exige rede |
| 9 | Finalizar com checklist | T13 | |
| 10 | **Fila de saída** | T15 | *(nova)* contador de itens no próprio cartão |

O **ciclo dinâmico** (T14) não é ferramenta de home: ele é alcançado pela calibração e pelo checklist, porque só faz sentido com configuração já enviada.

**Critérios de aceite**
- Ferramentas que dependem de módulo ficam desabilitadas sem conexão, com o motivo explícito.
- Ferramentas que dependem de ativo ficam desabilitadas sem ativo selecionado.
- **Não há console de log.** Cada ferramenta reporta estado em linguagem de campo. O log técnico é transmitido ao M2, não exibido.
- Checklist pendente aparece como aviso persistente na home.
- A ferramenta de fila exibe o contador de itens pendentes **no próprio cartão**, sem exigir abertura.

**Por que a fila virou ferramenta** — `[DECIDIDO PROTÓTIPO]`: §7 já exigia fila visível ao técnico e §8 já previa notificação de fila parada, mas nenhuma das 9 ferramentas dava acesso a ela. O técnico saía do pátio sem saber que cinco fotos não subiram.

---

### T05 — Conectar módulo

- Busca de dispositivos (BLE nas variantes com Bluetooth; serial via cabo MA-USB nas demais).
- Lista com identificação e ação **Conectar**; conectado exibe **Desconectar**.
- Estado vazio explica o que fazer: alimentação, cabo, distância.

**Identificação e pré-checagem — automática logo após conectar**

| Checagem | Trava quando |
|---|---|
| **Serial no cadastro de módulos** | Serial não cadastrado na empresa, ou modelo/variante sem driver na v1 — dois estados com mensagens distintas (§2) |
| Firmware | Fora da matriz de compatibilidade do bloco a enviar |
| Alimentação e bateria interna | Tensão fora de faixa |
| GPS e antena | Antena em curto ou desconectada |
| Entradas digitais | Estado incoerente com a **ocupação de pinos prevista** — leitor, buzzer, caminho da CAN e meio de conexão (T06) |
| Modem, SIM, sinal | Sem SIM lido, sem attach, ou sinal insuficiente |
| CAN | Contadores de erro crescendo |
| **Conteúdo cabe neste módulo e firmware** | `[DECIDIDO FECHAMENTO]` o pacote previsto excede alguma dimensão de capacidade do modelo × variante × firmware — eventos, condições por evento, caracteres de ação, filtros, capturas, contadores, flags ou buffer de texto (§4.4) |
| Pool de índices | `[DECIDIDO FECHAMENTO]` **dois limites, não um**: `cartões alocados + pontos de cerca alocados` acima do pool de **posições** do modelo, **ou** número de regiões acima do limite de regiões. Uma cerca ocupa tantas posições quantos pontos tiver — a conta antiga somava regiões contra um pool de posições e aprovava o que não cabia (§6.4) |
| **ID reconhecido na plataforma de destino** | `[DECIDIDO FECHAMENTO]` o ID do cadastro não está registrado na plataforma que vai receber os dados. Exige rede no aparelho do técnico; sem rede o item vira aviso e a causa fica herdada pela Seção F |
| Canal de programação | Aberto por sessão anterior mal encerrada — anomalia, o app fecha antes de começar |

**Leituras que informam e não travam** — `[DECIDIDO EQUIPAMENTO]`:

| Leitura | Para que serve |
|---|---|
| Mensagens pendentes no módulo (buffer e LOG) | Contexto de quantos dados ainda estão no equipamento. **Não bloqueia nenhuma ferramenta.** A contagem entra na evidência quando a cadeia executa reescrita de ID, que é a única operação da v1 que descarta pendência (T08). |
| Estado do modem do módulo | Separar a rede do aparelho da rede do módulo. É o modem do módulo que entrega dados ao servidor; sem attach aqui, a Seção F vai falhar depois, e essa leitura é o que permite dizer por quê. |

**Sem reconhecimento na plataforma de destino a Seção F reprova sem causa** — `[DECIDIDO FECHAMENTO]`

Um módulo cujo ID não está registrado no destino não entra em fluxo normal de reportes: ele transmite e o servidor descarta. A Seção F então reprova nos **três** critérios ao mesmo tempo — posicionamento, eventos e viagem — e nenhum deles nomeia a causa. O técnico refaz a instalação inteira sem chance de acertar.

- A pré-checagem consulta o backend e confirma que o ID do cadastro existe na plataforma de destino, **antes** de gravar o bloco *Conexão*.
- Não confirmado: trava com orientação de acionar o cadastro, e registra a ocorrência no M2 no mesmo formato de *serial não cadastrado*.
- **Sem rede no aparelho do técnico** o item não trava: vira aviso registrado na evidência, e se a Seção F reprovar nos três critérios essa é a primeira causa provável apresentada.
- Quando o destino **não é o M2** — plataforma de terceiro — a verificação não existe na v1. Fica declarado como limitação conhecida, e o aviso da Seção F é o único caminho.

**Falha de comunicação: causa única em tela, nomeada no M2** — `[DECIDIDO FECHAMENTO]`

Módulo com senha divergente do cadastro devolve recusa ou silêncio, e caía em "módulo não responde" — indistinguível de cabo ruim ou falta de alimentação. O técnico troca cabo e antena sem chance de acertar, e o cadastro errado nunca é corrigido.

- **Em tela, um único estado de falha**, com as três causas possíveis e o que checar em cada: cabo e conector, alimentação, e cadastro do módulo. A tela não expõe "senha" como parâmetro (princípio 1) e não pede nada que o técnico possa digitar.
- **No M2, a causa é nomeada.** Quando o protocolo permite distinguir a recusa de credencial do silêncio — o que a bancada **B9** vai confirmar por família —, o registro grava *senha divergente do cadastro* com serial, empresa, ativo pretendido, técnico e horário. É o mesmo formato de registro de modelo fora da v1.
- Esse registro é o que fecha o laço com o risco 9 de §10: o cadastro de módulos é caminho crítico, e sem sinal objetivo o gestor só descobre o erro pelo relato do técnico.
- **O app nunca tenta outra senha.** Tentar a de fábrica destravaria alguns casos, mas é tentativa e erro contra um equipamento de cliente, e apareceria na auditoria como acesso indevido.
- Se B9 mostrar que a recusa **não** é distinguível do silêncio, o registro sobe como "pré-checagem falhou, causa não distinguível" — o gestor ainda vê qual serial trava repetidamente.

**Critérios de aceite**
- O baudrate é definido pelo **modelo e variante do cadastro**, não fixo no app e não deduzido da letra do serial. `[DECIDIDO FECHAMENTO]` e **não aparece em tela** — vive no log de sessão e na evidência (princípio 1).
- Falha de identificação impede qualquer envio de configuração.
- Perda de link exibe erro com **Reconectar** e preserva o estado da etapa. `[DECIDIDO FECHAMENTO]` **queda por repouso do módulo não é falha** e não usa a linguagem de erro — ver T16.
- Resultado da pré-checagem alimenta itens automáticos do checklist.
- **A conexão bem-sucedida abre a sessão de configuração** (T16), que passa a aparecer no topo de toda tela.

#### Firmware incompatível — ordem corrigida `[DECIDIDO EQUIPAMENTO]`

O critério anterior — "oferece FOTA quando o módulo tiver conectividade" — não se realizava no cenário em que o bloqueio mais acontece. A atualização remota exige APN e destino gravados, que são o **bloco 6** da cadeia, e a checagem de firmware é a **segunda linha** da pré-checagem. Num módulo de estoque a oferta nunca era alcançável.

O fluxo passa a ter três saídas, nesta ordem de preferência:

| Situação | Caminho |
|---|---|
| Módulo com conectividade válida | oferece a atualização direto |
| Módulo sem conectividade, cadastro completo | **grava a conectividade como transação isolada** — só o bloco *Conexão*, sem limpeza e sem o resto da cadeia — e então oferece a atualização |
| Atualização indisponível ou recusada | bloqueia com orientação e registra no M2, como em modelo fora da v1 |

- A gravação isolada de conectividade é a **única** operação de escrita permitida antes da pré-checagem passar, e existe só para viabilizar a atualização. Ela não conta como configuração e não abre progresso de cadeia.
- **Depois de atualizar, o app relê as capacidades e reinicia a pré-checagem.** Faixas de evento, quantidade de flags e suporte à proteção de canal dependem da versão: o equipamento na frente do técnico deixou de ser o que a sessão conhecia.
- A versão anterior e a nova entram na evidência da intervenção.

#### Contador de pendências — informativo `[DECIDIDO EQUIPAMENTO]`

~~O contador de mensagens não transmitidas passa a ser item da pré-checagem, e com pendência e sem rede as operações destrutivas ficam bloqueadas.~~ **Revogado.** A premissa era que a limpeza descartava essas mensagens; ela não descarta (T08).

- O contador continua sendo lido na conexão, agora **como informação**: quantos dados do equipamento ainda não chegaram ao servidor.
- **Nenhuma ferramenta é bloqueada por ele.** Não há tela de bloqueio por buffer pendente.
- A contagem é gravada na evidência quando a cadeia executa **reescrita de ID**, única operação da v1 que descarta pendência.

---

### T06 — Seleção do ativo *(nova)*

- Lista os ativos da empresa/UC/UO do pacote, com busca por placa, frota ou identificador.
- Mostra modelo do ativo e módulo esperado.
- **Troca de ativo disponível a qualquer momento** pelo cabeçalho.

**Vínculo módulo ↔ ativo — regra crítica**
- Quando o modelo do ativo trafega identificador do chassi pela CAN, o app **lê e compara** com o cadastro.
- Divergência bloqueia o fluxo e exige resolução: ativo errado selecionado, ou cadastro errado no M2.
- Quando o ativo não trafega identificador, o vínculo é por confirmação explícita do técnico, registrada na evidência.
- Módulo já vinculado a outro ativo exige desvínculo consciente, registrado.

**Critérios de aceite**
- Ativo fora do pacote: o fluxo trava, com orientação de acionar o cadastro no M2. Não existe caminho alternativo na v1. `[DECIDIDO FECHAMENTO]` **a tela não oferece "solicitar cadastro"** — abrir pedido de cadastro pelo app criaria um caminho de improviso em campo, contra o princípio 5, e um objeto novo no M2 para sustentar. O escalonamento é processo de operação, dimensionado fora do produto; permanece como risco 3 de §10.
- Trocar de ativo com envio em andamento é bloqueado.
- `[DECIDIDO FECHAMENTO]` a tela nomeia cada linha física do arnês por **cor e função**, nunca pelo código da entrada ou saída. O código técnico existe na evidência e no log de sessão, não em tela (princípio 1).

#### Ocupação de pinos × meio de conexão — `[DECIDIDO PROTÓTIPO]`, ampliado em `[DECIDIDO EQUIPAMENTO]`

A checagem "cabo ocupa as linhas do leitor serial" estava em T09, no momento do envio. Mas o bloco *Leitor* já está no pacote **desde a seleção do ativo** — avisar só no envio desperdiçava a limpeza e o bloco *Ativo* já gravados no módulo. A comparação passa a acontecer **aqui**, na tela de vínculo, e é **repetida como pré-condição** ao iniciar T09.

`[DECIDIDO EQUIPAMENTO]` **a checagem não é um par, é uma matriz de ocupação de pinos.** Ela se orienta pelo bloco *Leitor* do core M2, somado a duas fontes que o *Leitor* não conhece:

| Fonte | O que declara |
|---|---|
| Bloco *Leitor* | tipo de identificador (RFID serial, iButton) e onde fica o buzzer |
| Bloco *Ativo* | **caminho da leitura da CAN** — barramento físico ou gateway indutivo, que é periférico serial |
| Meio de conexão atual | cabo, que ocupa a serial, ou BLE, que não ocupa |

O mesmo par de linhas — entrada do leitor e saída de transmissão — é disputado por **cinco** consumidores: leitor serial, iButton, buzzer, cabo de programação e gateway de CAN. Uma lista de pares aprova combinações que o hardware recusa.

- A declaração de ocupação é **montada das três fontes** e resolvida na pré-checagem, antes de qualquer escrita.
- Havendo conflito resolvível, a tela oferece **Reconectar por BLE** no próprio lugar.
- **Conflito não resolvível por BLE** — variante sem Bluetooth (§2), ou gateway indutivo que ocupa a porta em operação e não apenas na programação — é **erro de projeto de instalação**: barrado no cadastro do M2 na vinculação, e em campo a tela nomeia a incompatibilidade e escalona ao gestor. Não existe reordenação que resolva.
- T09 deixa de listar esse conflito como causa provável de falha de bloco.
- `[BANCADA]` **B10** — confirmar por qual via o gateway indutivo ocupa a porta nas variantes sem CAN física, e se ele conflita com o leitor em operação.

---

### T07 — Dados da CAN

Leitura agrupada por domínio, com os grupos vindo do bloco *Ativo* do modelo:
Geral · Sistema elétrico · Velocidade · GPS · Motor/Rotação · Combustível

**Requisitos**
- Cada sinal exibe **valor lido**, **valor ou faixa esperada** e **semáforo**. Ler sem comparar não prova nada.
- Cada sinal é marcado como **estático** (chave ligada, motor desligado) ou **dinâmico** (motor ligado / veículo em movimento).
- A tela separa visualmente as duas fases e indica o que ainda falta validar em movimento.
- Sinais dinâmicos não podem ser aprovados na fase estática.

**Critérios de aceite**
- Sinal fora do esperado é sinalizado com orientação de causa provável (ligação, barramento, modelo incorreto).
- Resultado por fase alimenta itens automáticos do checklist.
- Grupo DSM removido da tela.

`[DECIDIDO PROTÓTIPO]` **a fase dinâmica sai desta tela e vai para T14.** T07 passa a ser a conferência estática — chave ligada, motor desligado — e lista os sinais dinâmicos como *aguardando o ciclo dinâmico*, com a indicação de que a validação acontece lá. O motivo está em T14: rodar o ativo é caro e era pedido três vezes.

---

### T08 — Reset de leitura do ativo, e onde vivem os escopos de limpeza

`[DECIDIDO PROTÓTIPO]` **a limpeza deixou de ser ferramenta de escopo livre.**

O documento se contradizia: T04 listava "Limpeza do módulo" como ferramenta 4 e T09 declarava a limpeza como **bloco 1** da cadeia obrigatória. As duas leituras produziam telas diferentes, e com ambas existindo era possível limpar duas vezes na mesma sessão.

| Operação | Onde vive | Quando roda |
|---|---|---|
| Limpeza de configuração | **bloco 1 de T09** | manutenção, e reconfiguração de módulo já em operação no mesmo ativo |
| Limpeza total de configuração | **bloco 1 de T09** | **nova instalação**, em transação com o resto da cadeia |
| **Reset de leitura do ativo** | **ferramenta autônoma de T04** | quando o técnico quer reconferir a leitura do zero |

A limpeza continua necessária — é ela que garante estado conhecido antes de escrever, e é por isso que é bloco 1. O que mudou é que o técnico **não a dispara isoladamente**: ele dispara a configuração, e a limpeza acontece dentro, no escopo que o cenário exige.

#### Reset de leitura do ativo *(nova ferramenta)*

Apaga **somente os valores que o módulo guardou da leitura do ativo**, para o técnico refazer a conferência de T07 do zero.

| | |
|---|---|
| **Apaga** | valores lidos e armazenados da CAN — a leitura recomeça vazia |
| **Preserva** | buffer e LOG de dados não transmitidos · contadores semeados de hodômetro e horímetro · configuração embarcada (os 5 blocos, eventos e cercas) · conexão com o sistema (APN, IP/DNS, ID e senha) |

- **Uso:** a leitura ficou suja e é preciso conferir de novo — ligação corrigida, modelo trocado no cadastro, filtro reaplicado. Não serve para reconfigurar.
- Continua exigindo módulo identificado, ativo selecionado e cabo ou BLE.
- Após o reset, o app relê o estado e devolve o técnico a T07 com a leitura em branco.

**Mecanismo — `[DECIDIDO EQUIPAMENTO]`: limpeza da faixa de contadores declarada, nunca um escopo de limpeza.**

O escopo isolado existe, e não é um comando de limpeza: é a **limpeza dos contadores que o bloco *Ativo* declara como destino da leitura de CAN** — o mesmo mapa de contadores que T10 usa para a semeadura, lido do pacote por versão de script. Isso preserva por construção tudo o que a tabela acima promete preservar: contadores semeados ficam fora da faixa, e buffer, configuração e conexão não são contadores.

O que a decisão exige de cuidado é a **faixa**, não o comando:

| Regra | Motivo |
|---|---|
| A faixa vem declarada no bloco *Ativo*, por versão de script. O app **nunca** calcula índice. | Mesma regra do mapa de semeadura (T10). Script próprio da Mobs2 pode usar mapa diferente do padrão Newtec. |
| A limpeza é aplicada **índice a índice ou em sub-faixas que param antes de qualquer índice proibido** — nunca como um intervalo único que atravessa a faixa declarada. | A numeração de contadores tem **lacunas** e **índices de efeito colateral** que variam por modelo. No VL08, quatro índices no meio da numeração não existem, e limpar um deles **zera todas as flags do script** — o estado inteiro, sem mensagem de erro. |
| A faixa é validada **no cadastro**, na publicação da versão do bloco: contígua, sem lacuna do modelo, sem contador semeado, sem índice de efeito colateral. | O sintoma de uma faixa errada não é falha, é apagamento silencioso — aparece dias depois como script que parou de reagir. Falhar na publicação é muito mais barato. |
| Sem mapa declarado para a combinação ativo × módulo × versão, a ferramenta fica **indisponível com motivo explícito**. | Mesma regra da calibração em T10. O app não chuta índice. |

A **lista de índices proibidos por modelo e variante** entra na matriz de capacidades (§4.4).

`[BANCADA]` **B6** — reformulado: não é mais "existe o comando?", e sim "a faixa declarada é segura?". Roteiro no Anexo A.

#### Os dois escopos destrutivos, agora como bloco 1 de T09

#### Limpeza de configuração (antes: "Simples")

Apaga **eventos, filtros CAN e pontos de cerca**.
Preserva **ID, APN, IP/DNS do servidor, senha, contadores e buffer de dados não transmitidos**.

Uso: reconfigurar um módulo já instalado e comunicando, sem derrubá-lo.

#### Limpeza total de configuração (antes: "Completa")

Apaga também **variáveis de sistema, disparadores, condicionais, strings de conectividade e IPs de destino**.
Preserva **senha, contadores e buffer de dados não transmitidos** — `[DECIDIDO EQUIPAMENTO]`, ver abaixo.

> **Consequência que precisa estar no requisito:** este escopo **apaga a APN e o IP do servidor**. O módulo perde a conexão com o sistema.
>
> **Regra obrigatória:** esta operação e o reenvio do bloco *Conexão* formam **uma única transação**. O app não pode retornar à home com o módulo limpo e sem conectividade. Se o reenvio falhar, o app permanece na tela de recuperação até resolver.
>
> `[DECIDIDO EQUIPAMENTO]` como este escopo é o de **nova instalação**, e o bloco *Conexão* é o último da cadeia, **a transação é a cadeia inteira** (T09). Abortar no meio mantém o app na tela de recuperação até o bloco *Conexão* ser gravado. Enquanto a cadeia corre, o módulo fica sem conectividade — o que é inócuo, porque a programação é por cabo ou BLE e o buffer é preservado.

#### Proibido na v1

| Operação | Motivo |
|---|---|
| Limpeza de fábrica (escopo total incluindo senha, contadores e buffer) | Apaga a senha do canal de programação e **descarta dados não transmitidos**. Só atrás de perfil de fábrica, fora do app. |
| Apagar buffer/LOG isoladamente | Descarta posições e eventos que ainda não chegaram ao servidor, sem nenhum ganho de configuração. |
| Alterar o ID do módulo por escolha em campo | O ID vem do cadastro de módulos do M2 (§4.1) e não é editável no app. Exceção única: **reescrita de restauração**, quando o ID lido diverge do cadastrado — descrita abaixo. É a única operação da v1 que descarta pendência. |

#### Derivação do escopo — `[DECIDIDO EQUIPAMENTO]`

**O escopo não é escolhido pelo técnico e não depende de permissão.** Ele é derivado do cenário, em três linhas:

| Cenário | Escopo | Por quê |
|---|---|---|
| **Nova instalação** — módulo entrando em operação neste ativo | **Limpeza total** | É o único escopo que higieniza a conectividade herdada. Um módulo de estoque ou devolvido chega com APN e IP de outro contrato, e a limpeza de configuração os **preserva** — o bloco *Conexão* sobrescreve só o que o cadastro conhece, deixando resíduo do script anterior. |
| **Manutenção** (T11) | **Limpeza de configuração** | Módulo instalado e comunicando não se derruba para corrigir um parâmetro. Fixo, não escolhível — ver T11. |
| **Reconfiguração completa de módulo já em operação no mesmo ativo** | **Limpeza de configuração** | Mesma razão: a conectividade já está correta e conferida. |

A redação anterior — "nova instalação usa limpeza de configuração; limpeza total só quando a cadeia inteira é refeita e o bloco *Conexão* será reenviado na mesma transação" — se contradizia, porque o gatilho descrito para o escopo total **é** a nova instalação de T09. A tabela acima resolve.

Consequência assumida: na nova instalação, a limpeza total pode zerar o ID, e a reescrita de restauração descarta o que estava pendente. **Isso é intencional** — o módulo está trocando de contrato, e sanear conectividade, identidade e dados residuais do contrato anterior é exatamente o efeito desejado. A contagem descartada entra na evidência.

**Critérios de aceite**
- O bloco 1 de T09 **declara o escopo e o que será apagado e preservado**, em linguagem de campo, antes de executar.
- **Não há confirmação em dois passos.** Ela existia quando a limpeza total era exceção com permissão especial; hoje é o caminho padrão da nova instalação, o técnico não a escolheu, e a cadeia é transacional. Confirmação extra num passo que não tem alternativa é atrito sem decisão.
- Nenhuma limpeza é disparada sem ativo selecionado e módulo identificado.
- Após qualquer limpeza, o app **relê** a configuração e comprova o estado esperado.
- Ao final da configuração, o app **grava contadores e estado do script** — uma vez, não a cada comando (a operação tem limite de ciclos de escrita), no **encerramento da sessão de configuração** (T16). `[DECIDIDO FECHAMENTO]` a operação preserva **estado de execução**, não configuração: o que ela protege é a semente de hodômetro e horímetro e as flags do script. A configuração embarcada é provada pelo read-back de T09, não por ela.
- **Nenhum escopo de limpeza funciona pelo servidor.** A operação exige cabo ou BLE, e o app deve deixar isso explícito.

#### Dado pendente no módulo — `[DECIDIDO EQUIPAMENTO]`

~~`[DECIDIDO 20/08]` Antes de qualquer operação destrutiva, havendo pendência, exige drenagem com rede; sem rede a operação é bloqueada.~~ **Revogado.** A regra partia de uma premissa incorreta: nenhum dos dois escopos de limpeza descarta buffer ou LOG. Quem descarta é o escopo de fábrica — já proibido nesta seção — e a reescrita de ID.

Três problemas concretos que a regra criava, e que a revogação elimina:

1. **Contradizia §7**, que lista o envio dos cinco blocos entre as funções que operam offline: a limpeza é o bloco 1 da cadeia.
2. **Não tinha como ser satisfeita.** Quem drena o buffer é o **modem do módulo**, contra a APN e o IP gravados **nele** — não o aparelho do técnico. Num módulo de estoque ou devolvido, esse destino é de outro contrato ou não existe. E como o bloco *Conexão* é o último da cadeia, o fluxo exigia a rede do módulo antes de ter escrito a rede do módulo.
3. **Não tinha saída declarada.** O texto dizia explicitamente que não havia confirmação que liberasse, o que tornava permanentemente inconfigurável qualquer módulo que voltasse de outro contrato com pendência.

O que fica no lugar:

- **Nenhuma operação é bloqueada por buffer pendente.** A contagem é lida na conexão e mostrada como informação (T05).
- **Registro no lugar de bloqueio:** quando a cadeia executa reescrita de ID, a contagem de pendências no momento da reescrita e o horário entram na evidência da intervenção. É o que preserva a auditoria sem travar o técnico.
- A drenagem sai de §7 da lista de funções que exigem rede.

#### Verificação do ID de plataforma — `[DECIDIDO EQUIPAMENTO]`

Todo frame de resposta do módulo carrega o campo `ID=` do equipamento. **Não é preciso comando dedicado de leitura**: qualquer consulta de identificação já devolve o ID vigente. E o **valor esperado é conhecido**: o ID de 4 dígitos hexadecimais é definido no cadastro de módulos do M2 (§4.1) e chega no pacote.

A verificação passa a ser contra o cadastro, não contra si mesma:

- O app lê o ID **antes** da limpeza e compara com o **valor do cadastro**.
- Executa a limpeza.
- Relê o ID em qualquer consulta de resposta.
- **Reescreve quando o ID lido diverge do cadastrado** — inclusive quando divergia já na leitura inicial, que é o caso do módulo vindo de outro contrato. Conferindo, não toca: a reescrita descarta pendência e não se faz sem motivo.
- A limpeza, a verificação e a eventual reescrita formam **uma única transação** com o resto da cadeia.

Resíduo declarado: estar cadastrado no M2 garante o reconhecimento **quando o M2 é a plataforma de destino**. Onde o destino é outra plataforma, o cadastro do ID lá continua sendo pré-requisito, e ele não é verificado por este fluxo — ver a lacuna correspondente em §10.

`[BANCADA]` continua valendo como confirmação, não como investigação: registrar, por família, quais escopos preservam o ID e o que acontece com a contagem de buffer em cada escopo. Roteiro no Anexo A.

---

### T09 — Configurar módulo

`[DECIDIDO PROTÓTIPO]` a ferramenta passa a se chamar **Configurar módulo**, não "Envio de scripts": o nome antigo descrevia a mecânica interna, não o que o técnico está fazendo — e "script" é justamente a palavra que o princípio 1 manda não expor.

Envio em **cadeia de dependência**, um bloco após o outro. O técnico não escolhe conteúdo.

**Pré-condição reconferida antes do primeiro comando**, visível como a primeira linha da tela:

| Pré-condição | Origem | Bloqueia quando |
|---|---|---|
| Ocupação de pinos compatível com o meio de conexão | checada em T06, repetida aqui | o cabo, o leitor, o buzzer e o caminho da CAN disputam as mesmas linhas (T06) |

~~Mensagens pendentes no módulo em zero.~~ **Removida em 20/08** — `[DECIDIDO EQUIPAMENTO]`: o bloco 1 não descarta buffer nem LOG. Ver T08.

**Ordem obrigatória** — `[DECIDIDO EQUIPAMENTO]`: ordem canônica única, com **Cercas antes de Leitor**.

| # | Bloco | Conteúdo | Por que nesta posição |
|---|---|---|---|
| 1 | Limpeza | Escopo derivado do cenário (T08) | Estado conhecido antes de escrever |
| 2 | Ativo | Filtros e traduções de leitura da CAN | Alimenta os contadores que os eventos consomem |
| 3 | **Cercas** | Coordenadas e pontos das áreas cadastradas | **Antes de *Leitor*:** a limpeza de pontos de cerca é global e a memória é compartilhada com os identificadores. Escrever os identificadores depois das cercas garante que nenhuma operação de cerca os apague. |
| 4 | **Leitor** | Um script por tipo de identificador: KNOV, SGBRAS, iButton | Depois de *Cercas*, para nunca ser apagado por elas. Define a ocupação de entradas e saídas. |
| 5 | **Eventos** | Eventos habilitados e parâmetros, considerando as 2 áreas de cerca | Último dos cinco: depende dos contadores de *Ativo*, das regiões de *Cercas* e dos disparadores de *Leitor* |
| 6 | Conexão | APN, IP/porta ou DNS | Fecha a comunicação com o sistema |

A ordem anterior colocava *Leitor* em 3 e *Cercas* em 5, o que obrigava a regra 7 de §6 a exigir **um segundo envio do bloco *Leitor*** depois de *Cercas* em qualquer reconfiguração que tocasse cerca. Com a inversão, essa exigência vira um **invariante da ordem** e o envio duplicado desaparece — da cadeia completa e do reenvio cirúrgico.

**Conflitos de hardware — o app resolve, o técnico não escolhe**

| Conflito | Regra |
|---|---|
| Leitor RFID (serial) × iButton (OneWire) | Disputam as mesmas entrada e saída. Mutuamente exclusivos. O bloco *Leitor* do cadastro define qual, e o outro fica indisponível. |
| Buzzer em saída × transmissão da serial | Colidem. Se o leitor é serial, o buzzer tem de ser integrado ao identificador. |
| Gateway de CAN indutivo × leitor serial × cabo de programação | `[DECIDIDO EQUIPAMENTO]` cinco consumidores para o mesmo par de linhas. Resolvido pela **matriz de ocupação de pinos**, montada de *Leitor* + *Ativo* + meio de conexão, em T06 e reconferida aqui. Combinação sem saída por BLE é barrada no cadastro. |
| Índices de cercas × índices de cartões | Compartilham o mesmo pool de posições de memória. Resolvido pela ordem acima e pela alocação do cadastro. Ver §6. |

**Critérios de aceite**
- A lista de blocos e seu conteúdo vêm do pacote: modelo do ativo × modelo do módulo × tipo de operação. O técnico não edita.
- Cada bloco só inicia com o anterior confirmado por *read-back*.
- Falha em um bloco interrompe a cadeia, informa qual etapa falhou em linguagem de campo, e oferece **repetir a etapa** — não recomeçar tudo.
- Queda de link no meio: o app persiste em qual bloco parou e **retoma do mesmo ponto** na reconexão, de forma idempotente.
- Progresso por bloco visível, com bloco corrente destacado.
- Ao final, *read-back* consolidado dos parâmetros críticos: APN, IP/DNS, filtros de CAN, eventos habilitados, pontos de cerca.
- `[DECIDIDO FECHAMENTO]` **a versão dos 5 blocos é gravada como string composta.** O módulo guarda **uma** string de versão de script, e agora são cinco blocos versionados de forma independente — sem âncora, o diff de T11 não enxerga uma mudança de tradução da CAN que não produz efeito visível na configuração.
  - Formato fixo e posicional: uma sigla e uma versão por bloco, **na ordem canônica** — exemplo, `A12.G07.L02.E05.C03` para *Ativo*, *Cercas* (geo), *Leitor*, *Eventos* e *Conexão*. Tamanho declarado na matriz por modelo.
  - Gravada como **último comando de cada envio, depois do read-back do bloco** — na cadeia completa e no reenvio cirúrgico de T11. Bloco confirmado e string não atualizada é falha de bloco.
  - Usar cinco posições de buffer de texto foi descartado: são recurso escasso, variam por modelo e criariam mais um item de bancada. Guardar a versão só no M2 também: um módulo mexido por outra ferramenta divergiria em silêncio, e é justamente esse caso que o diff existe para pegar.
- Nenhum trecho de script ou comando é exibido ou exportável pelo técnico.

`[DECIDIDO 20/08]` **em T09 não existe seleção de blocos.** Nova instalação é sempre a cadeia completa e ordenada: o técnico dispara e acompanha. Como o escopo de limpeza da nova instalação é o total (T08), **a cadeia inteira é uma transação** — abortar no meio mantém o app na tela de recuperação até o bloco *Conexão* ser gravado.

O reenvio individual existe, mas **é função de T11 (Manutenção)**.

**Regras de arraste** — `[DECIDIDO EQUIPAMENTO]`, derivadas da ordem canônica:

| Bloco reenviado | Arrasta | Por quê |
|---|---|---|
| *Ativo* | *Eventos* | os eventos consomem os contadores que este bloco alimenta |
| *Cercas* | *Leitor*, e por consequência *Eventos* | a limpeza de pontos é global e apaga os identificadores; reescrito o *Leitor*, os disparadores dos eventos precisam acompanhar |
| *Leitor* | *Eventos* | os disparadores dos eventos referenciam o tipo de identificador |
| *Eventos* | — | nada depende dele |
| *Conexão* | — | nada depende dele |

A redação anterior dizia que *Ativo* arrastava *Eventos* **e *Cercas***, e que *Cercas* **não arrastava nada** — as duas afirmações estavam invertidas em relação a §6.7. As coordenadas de cerca não dependem da tradução da CAN; os identificadores, sim, dependem de quando as cercas são escritas.

Ganho prático: na tela de correção do protótipo, divergências em *Ativo* e *Eventos* arrastavam quatro blocos. Pela tabela acima arrastam **dois**. A regra antiga encarecia toda reconfiguração sem necessidade.

- O técnico continua sem escolher conteúdo: ele escolhe **corrigir uma divergência apontada pelo sistema**, e o app decide o conjunto de blocos que isso implica.
- O conjunto arrastado é sempre enviado **na ordem canônica**, não na ordem em que as divergências foram apontadas.
- Reenvio parcial que deixaria o módulo em estado inconsistente é bloqueado, não apenas avisado.

---

### T10 — Calibração

Aplica-se **somente quando o modelo do ativo não trafega a grandeza pela CAN**. O app decide isso pelo bloco *Ativo*; a calibração de uma grandeza que já vem da CAN fica indisponível.

Quatro grandezas, **duas naturezas diferentes** — e isso muda a tela:

#### Natureza A — fator de conversão: RPM e velocidade

Lidas como frequência de pulsos numa entrada digital. A calibração determina o fator entre a frequência lida e a grandeza real.

**Procedimento guiado (calibração automática):**
1. O app instrui: "ligue o motor e mantenha a rotação estável em **X**".
2. O técnico informa que está estável.
3. O app envia o valor de referência e o módulo calcula o fator sozinho.
4. O app relê e confirma que a grandeza passou a exibir o valor correto.

Este modo é o adequado ao público: o técnico informa um número que ele lê no painel, não um fator.

**Restrições**
- Depende de entrada com leitura de pulsos — **disponível apenas nas variantes VL06 FULL e ECO**. Nos demais modelos e variantes a calibração por pulso não existe e a tela deve dizer isso, não falhar.
- O sinal de rotação deve ir na entrada de maior tolerância de tensão; a de menor tolerância não suporta sinais de alternador.
- Velocidade exige veículo em movimento a velocidade constante conhecida, o que muitos pátios não permitem. A alternativa é velocidade por GPS, que **não requer calibração**.
- `[DECIDIDO FECHAMENTO]` **quem escolhe entre pulso e GPS é o cadastro do modelo de ativo (§4.2), não o técnico.** O catálogo declara o método válido por modelo, e T10 só oferece o declarado — quando é GPS, a tela informa que não há calibração de velocidade a fazer e por quê. O técnico não decide entre dois métodos cuja diferença de precisão ele não tem como avaliar (princípio 2), e o pátio que não permite rodar deixa de ser decisão de campo: passa a ser dado de cadastro, resolvido uma vez por modelo de frota.
- Existe reset de calibração para voltar ao padrão.

#### Natureza B — semente / offset: hodômetro e horímetro

Não têm fator: têm valor inicial. O módulo acumula a partir do que foi semeado.

**Procedimento guiado:**
1. O app pede o valor **lido no painel do ativo** (km, horas).
2. O técnico digita e **fotografa o painel** — a foto é a evidência do valor semeado.
3. O app semeia o acumulador e relê para confirmar.

**A foto do painel é evidência compartilhada** — `[DECIDIDO PROTÓTIPO]`: esta foto **satisfaz também** o item "painel do ativo com hodômetro e horímetro legíveis" da Seção B do checklist. O vínculo é gravado na evidência — uma foto, dois itens — e a Seção B abre com o item já marcado como *herdado da calibração*, mostrando a origem na própria linha para o gestor saber de onde veio a imagem. Sem essa declaração o mesmo painel era fotografado duas vezes e o relatório carregava evidência duplicada.

**Mecanismo — `[RESOLVIDO 20/08, confirmar em bancada]`: semeadura via contador, não escrita direta no acumulador.**

O acumulador estatístico de odômetro do módulo **só aceita zerar**, não receber valor. A semeadura acontece em contadores, e o bloco *Ativo* soma o contador ao acumulado na hora de reportar. No script padrão Newtec do VL06 esses contadores já existem:

| Grandeza | Contador | Unidade no módulo | Unidade no painel | Conversão do app |
|---|---|---|---|---|
| Horímetro | contador de tempo de horímetro | segundos | horas | `× 3600` |
| Hodômetro | contador de **offset** de hodômetro | metros | quilômetros | `× 1000` |

Consequências que entram no requisito:

- **O técnico digita o que lê no painel; o app converte.** Nenhuma tela pede segundo ou metro.
- O relatório de instalação reporta horímetro em **minutos** e hodômetro em **metros** — outra conversão, e outro ponto de divergência possível no read-back. A tolerância de conferência tem de considerar o arredondamento da unidade reportada, não comparar bit a bit.
- `[DECIDIDO FECHAMENTO]` **tolerância do read-back = granularidade do contador + tempo decorrido.** A comparação acontece **na unidade do reporte** — minutos para horímetro, metros para hodômetro — e aceita a granularidade daquele contador **mais** o que a grandeza andou entre gravar e reler: com o motor ligado, o horímetro não fica parado esperando a conferência. Exigir igualdade exata transformaria latência de comunicação em reprovação, e o técnico repetiria a calibração sem motivo. Tolerância fixa por modelo também foi descartada — erra nos dois sentidos, apertada em contador grosso e frouxa em contador fino.
- `[DECIDIDO FECHAMENTO]` **releitura obrigatória antes do ciclo dinâmico (T14)**, para que a viagem da Seção F comece de um valor conhecido e já conferido.
- **Semeadura só sobrevive à queda de alimentação se o contador estiver na faixa persistida em flash.** No VL06 a persistência cobre os contadores 00–99; um contador fora dessa faixa perde a semente no primeiro desligamento. A escolha do índice não é livre.
- A fonte do horímetro é selecionável entre **CAN, rotação e ignição**. A escolha vem do cadastro, não do técnico, e determina se a calibração de semente sequer aparece. `[DECIDIDO FECHAMENTO]` **o domínio é o mesmo nos dois lados**: o cadastro declarava três valores e a evidência registrava dois. Valem os três, e a evidência passa a registrar qual deles foi usado — a fonte muda o que a semente significa, então omiti-la torna o registro incompleto para quem for auditar o hodômetro meses depois.
- **Recalibração em manutenção (T11) recalcula o offset**, não acumula: o app lê o valor atual do módulo, compara com o painel e reescreve a diferença. Semear duas vezes somando seria o erro clássico aqui.

**Origem do mapa de contadores — `[DECIDIDO 20/08]`: declarado no bloco *Ativo*, por versão de script.**

O app **não** traz CT000/CT005 codificados. O pacote de sincronização declara, por versão de script, qual contador recebe cada grandeza, em que unidade e com que fator. Motivos:

- Scripts próprios da Mobs2 podem usar mapa diferente do padrão Newtec; um mapa fixo no app quebraria a calibração em campo **sem erro visível** — o comando é aceito, o valor vai para o contador errado, e a divergência só aparece dias depois no relatório.
- Mantém coerente a promessa de §2: incluir modelo ou versão de script é cadastro, não release.
- Se o pacote não declarar o mapa para aquela combinação de ativo × módulo × versão, a calibração fica **indisponível com motivo explícito** — o app não chuta índice.
- `[DECIDIDO EQUIPAMENTO]` o mapa é **validado no cadastro** contra a lista de índices proibidos do modelo e da variante (§4.4): índices que não existem, índices de efeito colateral e a faixa que não sobrevive ao desligamento. É a mesma validação que protege o reset de leitura do ativo (T08) — os dois usam o mesmo mapa.

**Critérios de aceite (T10)**
- A tela lista apenas as grandezas calibráveis para aquele ativo × módulo, com justificativa quando indisponível.
- Cada grandeza mostra estado: não calibrada, calibrada, ou divergente na releitura.
- Toda calibração registra na evidência: grandeza, valor de referência informado, valor confirmado na releitura, e foto do painel nos casos de semente.
- Recalibrar é permitido; o histórico de calibrações fica no M2.

`[BANCADA]` confirmar em equipamento: persistência da semente após corte de alimentação, unidade efetivamente reportada em cada RUV, e comportamento do offset quando o acumulador é zerado depois da semeadura. Roteiro no Anexo A.

---

### T11 — Manutenção e diff *(nova)*

Para módulo já instalado.

1. Conecta e identifica o módulo (T05).
2. Confirma o ativo vinculado (T06).
3. **Lê a versão embarcada dos 5 blocos** — a string composta gravada em T09 — e em seguida a **configuração real do módulo**. `[DECIDIDO FECHAMENTO]` a leitura da string é o **primeiro passo do diff**: é a única âncora que revela mudança de tradução da CAN sem efeito visível na configuração. String ausente, truncada ou em formato desconhecido é tratada como *versão desconhecida*, e o diff roda completo por conteúdo em vez de confiar na comparação de versões.
4. **Compara com a configuração esperada** pelo cadastro do M2.
5. Exibe as **divergências**, agrupadas por bloco, em linguagem de negócio: "o limite de velocidade embarcado é 80, o cadastro prevê 90".
6. O técnico decide entre três ações nomeadas pelo efeito:

| Ação | O que faz |
|---|---|
| **Corrigir as N divergências** | reenvia os blocos divergentes mais as dependências que eles arrastam, **na ordem canônica de T09** |
| **Reenviar os 5 blocos preservando a conectividade** | cadeia completa com escopo de limpeza fixo |
| **Apenas registrar o diagnóstico** | nada é escrito; o diff sobe para o M2 |

As dependências arrastadas seguem a tabela de arraste de T09 — `[DECIDIDO EQUIPAMENTO]`: *Ativo* arrasta *Eventos*; *Cercas* arrasta *Leitor* e *Eventos*; *Leitor* arrasta *Eventos*; *Eventos* e *Conexão* não arrastam nada.

**Índice que o firmware cria sozinho não é divergência** — `[DECIDIDO FECHAMENTO]`

Configurar APN e executar limpeza fazem o firmware criar eventos por conta própria. Sem tratamento, eles apareceriam como *presente e não previsto* em **toda** manutenção — e ruído permanente ensina o técnico a ignorar a lista, que é o oposto do que o diff existe para fazer.

- A matriz (§4.4) declara, **por modelo e por versão de firmware**, a lista de índices que o firmware ocupa por conta própria.
- *Presente e não previsto* só é divergência **fora** dessa lista.
- Firmware novo, ainda sem lista declarada: esses itens aparecem em seção separada como **não classificados**, nunca misturados às divergências reais. É também o sinal para o backoffice completar a matriz.
- Reservar uma faixa fixa de índices foi descartado: subtrai posições do pool útil e falha em silêncio no dia em que um firmware usar índice fora da faixa. Ignorar a classe inteira, também: perderia a detecção de sobra de configuração de outro contrato, que é justamente o que a limpeza total existe para resolver.

**Escopo de limpeza em manutenção: fixo** — `[DECIDIDO PROTÓTIPO]`. O antigo "reenviar tudo" incluía o bloco 1 da cadeia, e o escopo dele muda o resultado: limpeza de configuração preserva a conectividade, limpeza total a derruba e exige transação. A tela não dizia qual aconteceria.

- Em manutenção o escopo é **fixo em limpeza de configuração** e não é escolhível.
- A ação é nomeada pela consequência — **"preservando a conectividade"** — e não pela mecânica.
- **A limpeza total não é oferecida em T11.** Módulo instalado e comunicando não se derruba para corrigir um parâmetro.

**Critérios de aceite**
- Reenvio às cegas não é a primeira opção — apaga a informação de diagnóstico.
- Configuração idêntica ao esperado é declarada explicitamente como conforme.
- O resultado do diff sobe para o M2 mesmo que nada seja reenviado.
- Cobre também troca de módulo (desvincular / vincular) e retirada, ambas registradas.

---

### T12 — Últimas instalações e manutenções *(nova)*

Seção de conferência de recebimento de dados. Relação de ativos da empresa com o resultado da checagem do próprio sistema.

**Por ativo, exibir**
- Data e responsável da última intervenção.
- Chegada de **posicionamento**: conforme / atrasado / ausente.
- Chegada de **eventos**: conforme / fora do parâmetro / ausente.
- Chegada de **viagens**: completa / incompleta / ausente.
- Status geral: aprovado, pendente, com erro.

**Critérios de aceite** — `[DECIDIDO 20/08]` com o time de plataforma:

| Item | Critério | Racional |
|---|---|---|
| Posicionamento | **≥ 3 posições em ≤ 3 intervalos de rastreamento previstos + 2 min de margem**, com ignição ligada, GPS válido, e coordenada coerente com a posição do app no momento da instalação (**tolerância 500 m**) | `[DECIDIDO EQUIPAMENTO]` — ver abaixo. Três posições provam envio periódico, não um pacote órfão. 500 m absorve deriva urbana e pátio coberto sem aceitar coordenada de outro veículo. |
| Eventos | **evento de teste disparado pelo app recebido em ≤ 120 s**, com todos os campos obrigatórios preenchidos. `[DECIDIDO FECHAMENTO]` o cronômetro só começa com o contador de pendências do módulo em **zero** — ver abaixo | Dois minutos cobrem buffer do módulo, latência de rede e processamento no M2 em 3G. A checagem de campos pega o caso pior: o evento chega, mas sem serial, sem GPS ou sem contador — sinal de bloco *Ativo* mal aplicado. |
| Viagem | **1 viagem aberta e fechada**, com hodômetro inicial e final, duração > 0 e snapshot completo | É o único teste que exercita ignição, acumuladores e snapshot de uma vez — exatamente o que a calibração de semente e o bloco *Ativo* precisam provar. Depende do teste dinâmico da Seção E, já previsto. |

**Janela de posicionamento derivada, não fixa** — `[DECIDIDO EQUIPAMENTO]`

Os 10 minutos fixos mediam o preset, não a instalação. O intervalo de rastreamento é parâmetro e tem **dois valores**, um com ignição ligada e outro com ignição desligada. Nos valores de referência, ignição ligada entrega três posições em pouco mais de um minuto; ignição desligada entrega três em **exatamente dez** — o critério batia no limite justo. E T14 encerra o ciclo dinâmico **desligando a ignição** para fechar a viagem, o que jogava a medição na condição mais lenta. Um preset com intervalo mais folgado reprovava sem que nada estivesse errado.

- A janela é **calculada do intervalo previsto no pacote** (§4.5): `3 × intervalo com ignição ligada + 2 min`.
- A medição exige **ignição ligada** durante a janela, e a tela declara isso ao técnico — é a única condição que ele controla.
- Os 10 minutos continuam na tela como **teto de espera**, para o técnico saber quando parar de aguardar. Não são critério de conformidade.
- Preset sem intervalo declarado no pacote: o critério fica **indisponível com motivo explícito**, na mesma regra do mapa de contadores de T10. O app não assume valor de fábrica.

**Os 120 s contam de pendências em zero, e o evento de teste é nomeado** — `[DECIDIDO FECHAMENTO]`

O prazo media a fila, não a instalação. O tempo até a chegada depende do **modo de fila** do módulo, que não estava declarado em nenhum bloco: com buffer carregado e entrega em ordem de chegada, o evento de teste entra atrás de tudo o que o equipamento acumulou, e o critério reprovava uma instalação correta. E o evento de teste **nunca havia sido nomeado** — do jeito que estava, ele entraria na operação do cliente como ocorrência real.

- O bloco *Eventos* declara **modo de fila e tamanho de buffer** do módulo (§4.5). Sem declaração, o critério fica **indisponível com motivo explícito** — mesma regra do mapa de contadores de T10. O app não assume valor de fábrica.
- O **cronômetro dos 120 s só começa quando o contador de pendências chega a zero**. Enquanto houver pendência, a tela mostra a fila do módulo drenando, não um prazo correndo — o técnico entende que está esperando o equipamento, não sendo reprovado.
- O evento de teste tem **índice próprio reservado na matriz**, marcado como evento de teste. A plataforma o distingue de ocorrência de operação e **não o entrega ao cliente**: não entra em relatório, BI, ranking nem notificação.
- Comutar a fila para ordem inversa durante a sessão foi descartado: mexeria em parâmetro de operação para ganhar um critério de teste, e depender de restaurá-lo corretamente ao final é risco maior do que esperar a fila drenar.
- Consequência para o campo: em módulo com buffer grande e rede ruim, a Seção F pode demorar. É a re-checagem em background de 24 h que absorve isso — o técnico não fica preso ao veículo.

**Requisitos**
- Exige rede. Offline, a seção mostra o último resultado conhecido com a data da consulta.
- ~~Falha em qualquer critério **impede a conclusão do checklist**.~~ **Revogado em 20/08 pelo protótipo** — a Seção F não bloqueia a finalização. Ver T13.
- O **evento de teste é disparado pelo app em T14**, com o cronômetro dos 120 s visível ao técnico.
- Depende de endpoint novo no M2: última telemetria, últimos eventos e últimas viagens por serial/IMEI.

**Falha por indisponibilidade de rede ou servidor** — `[DECIDIDO 20/08]`: o critério **reprova, mas com re-checagem automática em background**.

- A Seção F fica **pendente**, não reprovada em definitivo. O app reconsulta sozinho enquanto houver rede e conclui o checklist quando os três critérios passarem — sem exigir que o técnico volte ao local.
- Vale tanto para a finalização offline já prevista em T13 quanto para falha ocorrida **com** rede disponível: o app não distingue as duas na tela, só o log distingue.
- Política de re-checagem: tentativas com espaçamento crescente por até **24 h** a partir da finalização. Esgotado o prazo sem aprovação, a instalação vira **reprovada** e notifica o gestor e o técnico.
- Enquanto pendente, o ativo aparece com status **aguardando validação** em T12, e não como aprovado.

---

### T13 — Checklist de homologação

Substitui a lista de 30 itens marcáveis. Duas mudanças estruturais:

1. **Itens automáticos não são marcáveis à mão.** O app os marca a partir de leitura real. Isso elimina o "marcar todos" como atalho para homologar sem verificar.
2. **Itens manuais cobrem só o que o olho vê**, e os relevantes exigem foto.

`[DECISÃO]` a função "marcar todos" fica **restrita aos itens manuais sem foto**. Nos demais, não existe.

#### Seção A — Identificação · automático

| Item | Fonte |
|---|---|
| Módulo identificado (serial, modelo e variante, pelo cadastro) | T05 |
| Firmware compatível com a configuração | T05 |
| Ativo selecionado e vinculado ao módulo | T06 |
| Pacote de sincronização válido (versão registrada) | T03 |

#### Seção B — Instalação física · manual, com foto

| Item | Foto |
|---|---|
| Módulo fixado e posicionado | Obrigatória |
| Antena GPS posicionada e livre | Obrigatória |
| Chicote e emendas protegidos | Obrigatória |
| Leitor / identificador posicionado | Obrigatória se houver leitor |
| Painel do ativo com hodômetro e horímetro legíveis | Obrigatória se houver calibração de semente — **herdada da foto de T10**, com a origem visível na linha |

#### Seção C — Saúde do hardware · automático

| Item |
|---|
| Alimentação e bateria interna em faixa |
| GPS com satélites e antena sem falha |
| Modem online, SIM lido, sinal suficiente |
| Barramento CAN sem erros acumulados (quando aplicável) |

#### Seção D — Configuração embarcada · automático, por read-back

| Item |
|---|
| Limpeza executada no escopo previsto |
| Os 5 blocos enviados e confirmados |
| APN e servidor conferidos |
| Filtros de leitura da CAN conferidos |
| Cercas embarcadas conferidas (§7) |
| Calibrações aplicadas e confirmadas |
| Contadores e estado do script gravados, conferidos por releitura (T16) — `[DECIDIDO FECHAMENTO]`, no lugar de "configuração persistida em memória não volátil" |
| **Autoteste de instalação íntegro** — as oito assertivas de §A.1, provadas por um reinício e uma releitura no encerramento da sessão. `[REVISADO FECHAMENTO]` · `[ABERTO R1 · R2]` quantas assertivas entram na conta de bloqueio, e o que fazer com a que não se aplica — ver §10, rev 4 |
| ID de plataforma conferido **contra o cadastro de módulos** após a limpeza (§T08) |
| Canal de programação protegido, ou indisponibilidade registrada (§9) |
| Contagem de pendências registrada, quando houve reescrita de ID (§T08) |

#### Seção E — Teste dinâmico · misto

**Toda esta seção é preenchida pelo T14 — Ciclo dinâmico.** Ela não é respondida aqui; o checklist apenas exibe o resultado e, faltando item, devolve o técnico ao ciclo.

| Item | Tipo |
|---|---|
| Ignição reconhecida ao ligar e ao desligar | Automático |
| Rotação coerente com motor em funcionamento | Automático |
| Velocidade coerente com o ativo em deslocamento | Automático |
| Leitura de identificador testada com cartão/chave real | Manual |
| Sinalização sonora do leitor conferida | Manual |

#### Seção F — Recebimento no servidor · automático

| Item |
|---|
| Posicionamento recebido no critério |
| Evento de teste recebido no critério |
| Viagem recebida completa |

**Critérios de aceite (T13)**
- Progresso separado por seção, e por tipo (automático vs manual).
- Item automático reprovado exibe o motivo e a ferramenta que o resolve — a linha da seção leva direto à tela que corrige.
- **Finalizar exige 100% dos automáticos das seções A, C e D aprovados e 100% dos manuais respondidos com as fotos obrigatórias.**
- Item manual pode ser respondido como **não conforme com justificativa** — isso não bloqueia a finalização, mas marca a instalação como **ressalvada** e notifica o gestor.
- Finalizado gera o relatório de homologação: seriais, ativo, versão do manifesto e dos blocos, resultados, fotos, calibrações, data/hora e geolocalização, identificação do técnico.
- Checklist pendente aparece como aviso persistente na home e em notificação.

#### A Seção F não bloqueia a finalização — `[DECIDIDO PROTÓTIPO]`

Havia três regras para o mesmo momento: T12 dizia que a falha *impede a conclusão do checklist*; T13 dizia que sem rede a finalização é permitida *exceto* a Seção F; a decisão de 20/08 acrescentava re-checagem por 24 h. Fica uma:

- **A Seção F não entra na conta de bloqueio.** Nem com rede, nem sem.
- Finalizar **com a Seção F falhando ou pendente** exige uma **confirmação de ciência** marcada pelo técnico — "estou ciente de que o recebimento no servidor falhou". Sem marcar, o botão não habilita. É isso que torna o *sabendo* comprovável, e não uma suposição do gestor.
- A ciência entra na evidência com **nome do técnico, data e hora**.
- **Registro na plataforma web do gestor:** a instalação aparece como **encerrada com falha de recebimento reconhecida** — com o nome do técnico, o horário da ciência e quais dos três critérios falharam. Não é "aprovada", não é "pendente por rede": é um terceiro estado, e a distinção é o que permite cobrar o retorno ao ativo.
- A **re-checagem automática continua** rodando por até 24 h. Passando nesse prazo, o registro muda para **aprovada após reprocessamento** e a ciência fica no histórico. Esgotado o prazo, vira **reprovada** e notifica gestor e técnico.

Máquina de estados resultante, e o que o gestor vê:

| Estado | Como se chega | Visível ao gestor como |
|---|---|---|
| Aprovada | tudo passou, incluindo Seção F | aprovada |
| Aguardando validação | finalizada sem rede, Seção F ainda não avaliada | aguardando validação · até 24 h |
| Encerrada com falha reconhecida | Seção F falhou e o técnico marcou ciência | **encerrada com falha de recebimento reconhecida** |
| Aprovada após reprocessamento | re-checagem passou dentro das 24 h | aprovada, com histórico da ciência |
| Reprovada | 24 h esgotadas sem aprovação | reprovada |
| Ressalvada | item manual não conforme com justificativa | ressalvada · combina com qualquer estado acima |
`[DECIDIDO 20/08]` **a assinatura do responsável no local fica fora da v1.** A evidência probatória já é forte sem ela: fotos obrigatórias, read-back da configuração, geolocalização, data/hora, identificação do técnico e validação de recebimento no servidor. Assinatura em tela agrega campo jurídico, guarda de imagem, fluxo de recusa e termo de aceite — custo alto para ganho probatório baixo. Reavaliar na v2 como flag por cliente no cadastro do M2.

---

### T14 — Ciclo dinâmico *(nova)* — `[DECIDIDO PROTÓTIPO]`

A fase dinâmica de T07, a Seção E do checklist e a viagem exigida pela Seção F pediam **o mesmo esforço de campo** — motor ligado, veículo em movimento — em três telas e momentos diferentes. O técnico rodaria o ativo duas ou três vezes.

Uma tela, um deslocamento, quatro blocos alimentados pelo mesmo ciclo:

| # | Bloco | Alimenta |
|---|---|---|
| 1 | Sinais dinâmicos da CAN — velocidade, hodômetro acumulado | T07 fase dinâmica |
| 2 | Ignição, rotação, velocidade coerentes · leitura de identificador · sinalização sonora | Seção E, os 3 automáticos e os 2 manuais |
| 3 | **Evento de teste**, com cronômetro | Seção F, critério de eventos |
| 4 | **Viagem** aberta e fechada, com hodômetro inicial e final | Seção F, critério de viagem |

**Evento de teste — ação explícita**

O critério da Seção F falava de "evento de teste disparado pelo app", mas nenhuma tela oferecia a ação.

- Botão de disparo no bloco 3, com o **cronômetro dos 120 s em destaque** — o prazo é o critério, então ele fica visível.
- Três linhas de estado: disparado pelo app (com horário), recebido no M2, campos obrigatórios conferidos (serial, GPS e contador).
- **Disparar novamente** se o prazo estourar. O técnico ainda está no veículo e resolve na hora, em vez de descobrir a falha no relatório dias depois.
- `[DECIDIDO FECHAMENTO]` antes do cronômetro, a tela mostra a **fila do módulo drenando** e só libera a contagem com as pendências em zero (T12). O botão de disparo fica indisponível, com o motivo declarado, enquanto houver pendência.

**O identificador lido aparece em tela** — `[DECIDIDO FECHAMENTO]`

O módulo só reconhece um identificador se a string cadastrada for **idêntica ao recorte que o modo do leitor extrai** do cartão. Cadastro e leitura divergindo por um prefixo ou por zeros à esquerda, a falha aparecia no último item manual do ciclo — "passe o cartão" — sem nenhum diagnóstico, e o técnico não tem como saber que o problema é de cadastro.

- O bloco *Leitor* declara o **modo de extração** usado pelo leitor daquele ativo. Ele não aparece em tela; governa a comparação.
- O item manual mostra **o código que o módulo leu** ao lado do **código esperado**, os dois em formato de negócio (o número impresso no cartão, não o quadro bruto).
- Divergindo, a tela oferece **solicitar correção de cadastro**, já anexando os dois valores, o ativo e o identificador. O técnico não corrige nada em campo (princípio 5), mas sai da visita com o pedido aberto e o diagnóstico pronto.
- Comparação normalizada — ignorando prefixo, zeros à esquerda e caixa — foi descartada: destravaria o teste e mascararia o cadastro errado, e o cartão aprovado aqui falharia na operação do cliente.

**Critérios de aceite**
- O ciclo é alcançado pela calibração e pelo checklist, não pela home — só faz sentido com configuração já enviada.
- A tela indica o tempo decorrido de ciclo e o que ainda falta capturar.
- Encerrar o ciclo leva direto ao checklist.
- Item faltante nas seções B ou E do checklist **devolve o técnico a esta tela**, não a uma tela intermediária.
- Sinal dinâmico continua não podendo ser aprovado na fase estática de T07.

---

### T15 — Fila de saída *(nova)* — `[DECIDIDO PROTÓTIPO]`

Décima ferramenta da home, com contador de itens no próprio cartão. Três estados, e o feedback é **por item**, não um indicador único de "sincronizando": o técnico precisa saber *qual* evidência ainda não chegou.

**Enviando**
- Barra de progresso geral e contadores: enviados · na fila · com erro.
- Cada item mostra tipo, ativo, item de checklist a que pertence, tamanho e — no item corrente — barra de progresso própria.
- Sair da tela **não interrompe** o envio; a home mantém o contador.

**Com erro**
- Tempo parado em destaque, e o reconhecimento de que nada foi perdido — mas que o gestor ainda não tem aquelas evidências.
- **Cada erro nomeia a causa e a ação que resolve**, porque os dois tipos não são iguais:

| Causa | Resolução | Tratamento |
|---|---|---|
| Falha de rede | esperar | reenvio automático com espaçamento crescente |
| Recusa do servidor | ressincronizar e reenviar | **manual** — insistir em silêncio deixaria o item parado para sempre |

- Item que só o técnico pode destravar **nunca fica em retentativa silenciosa**.
- `[DECIDIDO FECHAMENTO]` **evidência gerada sob manifesto vencido é aceita**, sinalizando a idade. O manifesto tem validade de 7 dias e a evidência pode nascer em campo sem rede e só subir depois — recusá-la deixaria o item preso na fila para sempre, porque ressincronizar o pacote não muda o manifesto sob o qual aquela evidência foi gerada. O servidor aceita e grava a **idade do pacote no momento da geração**; o gestor vê que a evidência veio de pacote antigo e julga. Sem isso, T15 precisaria de um estado terminal e de um processo de reconciliação para um caso que a operação normal produz sozinha.
- Notificação local quando a fila fica parada além do limite — gerada no dispositivo, não depende de rede.

**Concluída**
- Declara explicitamente que tudo chegou, com o horário do último envio. **Fila vazia é informação, não ausência de informação**: sem esta tela o técnico não sabe se pode devolver o aparelho.
- A Seção F em re-checagem aparece em seção separada — ela não é item de fila, é pendência no servidor.
- Avisos de estado do dispositivo: validade da sessão de acesso e idade do pacote.

---

### T16 — Sessão de configuração *(nova)* — `[DECIDIDO PROTÓTIPO]`

§9.3 mandava abrir o canal de programação "no início da sessão" e fechá-lo "sempre, ao final", mas **nenhuma tela definia onde a sessão começava ou terminava**. Sem esse objeto não havia onde ancorar o fechamento do canal, a retomada de envio interrompido nem o bloqueio de troca de contexto.

**A faixa de sessão.** Presente no topo de toda tela enquanto a sessão vive: horário de abertura, módulo, tempo decorrido, e a **única saída para encerrar**.

**Abre** na conexão bem-sucedida do módulo (T05). **Encerra** por tela própria.

**O que a sessão aberta governa**

| Item | Efeito |
|---|---|
| Canal de programação | aberto e reaberto automaticamente enquanto a sessão vive |
| Módulo e ativo | travados na sessão |
| Troca de contexto | encerra a sessão, com confirmação |
| Troca de contexto durante envio | **bloqueada** até concluir ou abortar |
| Progresso da cadeia | persistido, para retomada |
| **Repouso do módulo** | `[DECIDIDO FECHAMENTO]` inibido enquanto a sessão viver, restaurado no encerramento |

**O repouso do módulo é inibido durante a sessão** — `[DECIDIDO FECHAMENTO]`

Com ignição desligada e veículo parado o módulo entra em repouso e derruba o link — e o app reportava isso como falha de conexão. Acontece justamente no começo e no fim da sessão: pré-checagem com o veículo ainda desligado, checklist com fotos, encerramento. O técnico via erro onde havia comportamento normal do equipamento.

- O app **inibe o repouso ao abrir a sessão** de configuração e **restaura o parâmetro original no encerramento**, no mesmo passo já garantido que fecha o canal de programação — inclusive em sessão abortada, troca de contexto e encerramento do app com módulo conectado.
- A restauração é **verificada por releitura**, como qualquer escrita (princípio 3). Não confirmada, a sessão não é declarada encerrada e o app insiste na reconexão.
- **Risco assumido:** sessão que morre sem executar o encerramento deixa o módulo acordado consumindo bateria do ativo. A mitigação é a mesma do canal de programação — sessão anterior mal encerrada é detectada na pré-checagem seguinte e o app restaura antes de qualquer coisa, registrando a ocorrência. Sessão aberta com o app fechado à força é o caso a acompanhar em produção.
- Enquanto a inibição não estiver ativa — firmware sem suporte, ou o intervalo entre conectar e abrir a sessão — **queda por repouso é evento esperado, não erro**: a tela diz "módulo em repouso" e reconecta, sem a linguagem de falha de T05.
- Inibir só durante o envio da cadeia foi considerado e descartado: a janela menor reduziria a exposição de bateria, mas deixaria a leitura da CAN, a calibração e o checklist sujeitos à queda — que é onde a sessão passa mais tempo com o veículo parado.

**Encerramento** executa, nesta ordem, e mostra cada passo. `[REVISADO FECHAMENTO]` os passos 2 e 3 são o **autoteste de instalação** (§A.1), e os passos 4 e 5 produzem duas das suas assertivas:

1. `[DECIDIDO FECHAMENTO]` **Gravar contadores e estado do script** — uma vez, respeitando o limite de ciclos de escrita. O passo antes se chamava "persistir as variáveis em memória não volátil", o que descrevia errado o que acontece: a operação grava **estado de execução** (contadores semeados, flags), não configuração — e não tinha nenhuma consulta que comprovasse o resultado. A verificação vem no passo 3; a configuração continua provada pelo read-back de T09, onde sempre esteve.
2. `[REVISADO FECHAMENTO]` **Reiniciar o módulo.** Por comando quando o driver suportar; senão, o app pede um corte de alimentação, uma vez. O canal de programação é reaberto na volta, como em qualquer reconexão durante a sessão.
3. `[REVISADO FECHAMENTO]` **Releitura completa depois do reinício** — configuração dos 5 blocos, contadores semeados, índices de identificador e ID de plataforma. É o coração do autoteste: um reinício prova de uma vez que a semente, a configuração e os identificadores sobreviveram. As três coisas que falham em silêncio deixam de depender de bancada.
4. `[DECIDIDO FECHAMENTO]` **Restaurar o parâmetro de repouso** do módulo, com releitura de confirmação — assertiva 7.
5. **Fechar o canal de programação** — sempre, inclusive em sessão abortada, em troca de contexto e no encerramento do app com módulo conectado. Com releitura do estado, que é a assertiva 6.
6. Enfileirar o log da sessão (comandos, respostas e horários).
7. Desconectar do módulo.
8. `[REVISADO FECHAMENTO]` **Apresentar o resultado do autoteste**, assertiva por assertiva, com o valor lido em cada uma. Falha bloqueia a homologação, não o encerramento — a sessão fecha de todo modo, porque o canal de programação tem de fechar.

**Sessão abortada não executa o autoteste**, mas executa os passos 4 a 7. O reinício e a releitura pressupõem configuração completa; num aborto não há o que releer contra o esperado, e a instalação já não vai ser homologada.

Pendências que **sobrevivem** ao encerramento: checklist não finalizado (vira aviso persistente na home) e itens na fila de saída.

**Retomada ao reabrir o app**
- Sessão interrompida é **oferecida de volta**, não perdida em silêncio: módulo, ativo, último bloco confirmado por read-back e o ponto de retomada.
- Retomar reconecta e continua **do bloco seguinte**, de forma idempotente.
- **Descartar** não desfaz o que já foi gravado no módulo — os blocos confirmados continuam lá. Descarta-se a intenção de continuar, e isso é registrado no log.
- Canal aberto por sessão anterior mal encerrada é **anomalia**: o app fecha antes de qualquer coisa e registra a ocorrência.

---

## 6. Regras de cercas embarcadas

Cercas embarcadas não são geofences de plataforma: elas **alteram o parâmetro do evento** dentro da área. Cada ponto embarcado carrega sua própria velocidade máxima e orientação, e o módulo dispara evento distinto quando o ativo está dentro da área com o limite excedido.

**Estrutura**
- Cada ativo tem **2 áreas**.
- Cada área tem **até 2 cercas**.
- Máximo por ativo: **4 regiões embarcadas**.

**Regras**
1. As coordenadas vêm exclusivamente do cadastro do M2. O técnico não marca cerca em campo na v1.
2. Ativo **sem cerca cadastrada**: o bloco *Cercas* é ignorado e o item correspondente do checklist não se aplica. Não é falha.
3. Ativo **com cerca cadastrada**: envia tudo e valida que o módulo embarcou **todos** os pontos. Divergência parcial é falha.
4. **Alocação de índices é do sistema, nunca do técnico.** Os índices de cercas e de cartões de identificação compartilham o mesmo pool de memória; usar o mesmo índice nos dois corrompe ambos. `[DECIDIDO 20/08]` **convenção confirmada: cartões crescem a partir do início do pool, cercas decrescem a partir do fim**, com o mapa de alocação por módulo registrado no M2.
   - As duas populações crescem em direções opostas: só colidem com o pool praticamente esgotado, e essa condição é **detectada na pré-checagem**, antes de qualquer escrita.
   - Não há faixa reservada a manter: um cliente com muitos cartões e poucas cercas usa o pool inteiro sem desperdício.
   - O app **nunca calcula índice**. Recebe do pacote o índice já alocado por cartão e por região; se o pacote não trouxer alocação para algum item, o envio é bloqueado — o app não improvisa.
   - Pré-checagem de esgotamento — `[DECIDIDO FECHAMENTO]` **a conta é `cartões alocados + pontos de cerca alocados`, não `cartões + regiões`.** O pool é de **posições** de memória, e uma cerca ocupa tantas posições quantos pontos ela tiver: somar 4 regiões contra um pool de 6.143 posições aprovava configuração que não cabe. São **dois limites independentes**, os dois declarados na matriz (§4.4) e os dois verificados em T05:
     - **regiões** — quantas áreas o modelo e o firmware suportam (referência: 8 no VL06);
     - **posições** — o pool compartilhado com os cartões, consumido ponto a ponto (referência: 6.143 no VL06).
   - A matriz declara também o **teto de pontos por cerca**, e o cadastro de cercas o valida na publicação — cerca acima do teto é recusada ali, não em campo.
   - Estourar qualquer um dos dois limites bloqueia a configuração com mensagem em linguagem de campo e escalona para o gestor.
5. Os dois campos numéricos que apareciam como "controle de cercas" no protótipo representam **quantidade de cercas por área** e são **somente leitura**, vindos do cadastro.
6. A quantidade de regiões disponíveis varia por modelo e firmware. A matriz de capacidades define o limite; ativo cadastrado com mais cercas do que o módulo suporta é bloqueado na pré-checagem, não no envio. Referência: o VL06 oferece 8 regiões sobre um pool de 6.143 pontos; o VL08 amplia a faixa de regiões a partir de determinada versão de firmware. Nenhum desses números fica no app — todos vêm da matriz.
7. **Limpeza de pontos é global — resolvido pela ordem** `[DECIDIDO EQUIPAMENTO]`. O comando de limpeza de pontos de cerca apaga **todos** os pontos, e a memória é compartilhada com a lista de identificadores. Enquanto o item B5 do Anexo A não for validado, o requisito assume o pior caso: **limpar cercas invalida os cartões**.
   - A mitigação deixou de ser um reenvio extra e passou a ser a **ordem canônica**: *Cercas* é o bloco 3 e *Leitor* é o bloco 4 (T09). Escrever os identificadores **depois** das cercas garante que nenhuma operação de cerca os apague — na cadeia completa e no reenvio cirúrgico.
   - No reenvio cirúrgico a garantia vem da **regra de arraste**: *Cercas* arrasta *Leitor*, e o conjunto é enviado na ordem canônica.
   - A redação anterior exigia um **segundo envio do bloco *Leitor*** depois de *Cercas*, o que criava um sétimo passo na cadeia e contradizia a tabela de arraste de T09. Fechado o B5 favoravelmente, nada muda na ordem: ela deixa de ser mitigação e continua correta por dependência.

**Validação (read-back)**
- Consultar o estado de cada região e conferir quantidade de pontos, coordenadas, raio/desvio e velocidade associada.
- Aprovação é binária: todos os pontos conferem, ou o item falha.

---

## 7. Offline e sincronização

**Funciona offline:** login com sessão de acesso válida, seleção de contexto e ativo, conexão e pré-checagem, leitura da CAN, **limpeza em qualquer escopo**, reset de leitura do ativo, envio dos 5 blocos, calibração, ciclo dinâmico exceto a confirmação de recebimento, checklist inteiro, captura de fotos.

`[DECIDIDO EQUIPAMENTO]` **a contradição foi resolvida removendo o requisito, não acrescentando ressalva.** A revisão do protótipo havia escrito "limpeza, desde que o buffer esteja drenado", para conciliar §7 com o bloqueio de T08. Mas o bloqueio partia de premissa incorreta — nenhum escopo de limpeza descarta buffer ou LOG —, e a ressalva tornava a operação offline dependente de rede, que é a definição do problema que ela pretendia resolver. **A limpeza opera offline em qualquer escopo, sem ressalva.** Ver T08.

**Exige rede:** sincronização do pacote, validação de recebimento (T12 e Seção F), envio de logs e evidências, recuperação de senha, e — quando aplicável — a atualização de firmware de T05.

**Fila de saída** — tela própria em T15
- Evidências, fotos, logs e resultados de diff entram numa fila persistente com reenvio automático.
- Fila visível ao técnico como **ferramenta da home**, com contador no cartão: quantos itens pendentes e desde quando.
- **Feedback por item, não agregado:** na fila · enviando com progresso · recebida · com erro. Nenhum item desaparece sem dizer para onde foi.
- Erro nomeia **causa e ação que resolve**. Falha de rede reenvia sozinha; recusa do servidor exige ressincronizar e nunca fica em retentativa silenciosa.
- Estado de sucesso é **declarado explicitamente**, com horário do último envio.
- Foto é o item mais pesado: comprimir no dispositivo. `[DECIDIDO 20/08]` **padrão: 1600 px no lado maior, JPEG qualidade 80, alvo de 300–500 KB por foto.**
  - Resolução suficiente para conferir fixação do módulo, posicionamento de antena, proteção de emendas e os dígitos de hodômetro/horímetro no painel.
  - Um checklist completo (cinco fotos obrigatórias) fica em torno de 2 MB — viável de enviar em 3G degradado.
  - A compressão acontece **na captura**, não no envio: o original em resolução plena não é retido no dispositivo.
  - Metadados gravados na evidência: data/hora, geolocalização, módulo, ativo e item do checklist a que a foto pertence.
- **Conflito:** mesmo ativo configurado por dois técnicos, ou duas vezes pelo mesmo. O servidor aceita ambos os registros e sinaliza o conflito ao gestor — não descarta silenciosamente.

---

## 8. Notificações

| Gatilho | Ação |
|---|---|
| Nova versão de manifesto publicada | Sincronizar dados |
| Pacote vencido | Sincronizar dados (bloqueante) |
| Checklist pendente de validação | Abrir checklist |
| Validação de recebimento reprovada | Abrir T12 |
| Falha de diagnóstico na pré-checagem | Abrir T05 |
| Fila de saída parada há mais de X horas | Abrir T15 |
| Item da fila recusado pelo servidor | Abrir T15 — exige ressincronizar, não resolve sozinho |
| Sessão de configuração interrompida por encerramento do app | Abrir T16 — retomar ou descartar |
| Sessão de acesso a 2 dias do vencimento | Fazer login com rede |

Notificações que dependem do servidor só chegam com rede; as locais (checklist pendente, pacote vencido, fila parada) são geradas no dispositivo.

---

## 9. Segurança e auditoria

1. **O técnico não vê nem exporta script.** Sem console, sem "copiar logs", sem exibição de comando. Os blocos chegam no pacote em formato opaco e assinado.
2. **Senhas do módulo nunca aparecem** em tela, log local ou mensagem de erro. Vêm no pacote em formato opaco.
3. **Proteção do canal de programação** — `[DECIDIDO 20/08]`: **ativada por padrão em toda instalação da v1.** A âncora de abertura e fechamento é a **sessão de configuração** (T16), que passou a existir como objeto de interface justamente para isso.

   O firmware suporta ativar a proteção, abrir o canal temporariamente por um número de segundos mediante senha, consultar o estado e desativar a proteção. O app usa isso assim:

   - **Abre** o canal no início da sessão de configuração, por tempo limitado, com a senha vinda do pacote em formato opaco.
   - **Fecha** ao final da sessão, sempre — inclusive quando a sessão é abortada, quando o técnico troca de contexto e quando o app é encerrado com módulo conectado.
   - **Consulta o estado** na pré-checagem: canal aberto por sessão anterior mal encerrada é anomalia, e o app fecha antes de começar.
   - O item "canal de programação protegido" entra na **Seção D do checklist**, por read-back do estado.

   Isso é o que efetivamente protege a propriedade da configuração — não a ausência de console no app. Sem ele, qualquer pessoa com um cabo e um terminal reconfigura o módulo.

   **Limites conhecidos:** a proteção depende de versão mínima de firmware (documentada para o VL06 a partir da 7.05) e a paridade no VL08 é `[BANCADA]`. Onde o firmware não suportar, o app **não falha a instalação**: registra "proteção indisponível nesta versão de firmware" na evidência, sinaliza ao gestor e segue. A tela nunca oferece ao técnico a opção de desligar a proteção.
4. **Log de sessão imutável no M2**: todo comando enviado, resposta recebida, timestamp, técnico, ativo, módulo. Transmitido, não exibido.
5. **Escopo de acesso** limitado às empresas/UC/UO de permissão, aplicado no servidor e no conteúdo do pacote — não só na UI.
6. **Operações destrutivas** (limpeza total, reescrita de ID, desvínculo de módulo) sempre com registro de quem, quando e por quê. `[DECIDIDO EQUIPAMENTO]` na reescrita de ID o registro inclui a **contagem de mensagens pendentes descartadas** — é o que substitui o bloqueio que existia antes, e a única perda de dado do cliente que a v1 admite.
7. **O log tem consulta, não só gravação** — `[DECIDIDO FECHAMENTO]`, na v1. Com a flag de permissão e o bloqueio por buffer revogados, este log passou de rede de segurança a **único** mecanismo de controle das operações destrutivas. Um log sem tela não é auditoria: a consulta do gestor (§4.10) responde quem executou, o quê, quando, em qual módulo e ativo, e quantas pendências foram descartadas na reescrita de ID. Conferir que ela responde essas cinco perguntas é **critério de entrada em campo** da v1, não melhoria posterior.
8. **Falha de pré-checagem por credencial** — `[DECIDIDO FECHAMENTO]`: registrada no M2 com serial, empresa, ativo pretendido, técnico e horário, nomeando a causa quando o protocolo permitir distinguí-la (T05 · bancada B9). A senha em si continua não aparecendo em nenhum lugar — nem em tela, nem no log, nem na mensagem de erro (item 2).

---

## 10. Pendências

### Decidido com o time — 20/08/2026

Nenhuma pendência `[CONFIRMAR]` em aberto. Registro das nove decisões:

| # | Pendência | Seção | Decisão |
|---|---|---|---|
| 1 | Modelos para priorizar os drivers da v1 | §2 | **VL06 e VL08** na v1. VL12, VC07 e Vircone entram por cadastro, sem release. |
| 2 | Limpeza total exige autorização de supervisor? | §3 | ~~Flag `pode_executar_limpeza_total` por perfil no M2.~~ **Superada em 20/08 pela avaliação de equipamento:** não há permissão diferenciada. A limpeza não descarta dado do cliente, então não havia o que proteger por perfil. |
| 3 | Validade da sessão offline | T01 | **7 dias**, com aviso no 5º dia. |
| 4 | Validade do pacote de sincronização | T03 | **N = 7 dias** para bloqueio, **aviso a partir de 3**. Idade contada do carimbo do manifesto. |
| 5 | "Usuário seleciona o que quer enviar" | T09 | **Sem seleção em T09.** Reenvio individual é função de T11, com arraste automático das dependências. |
| 6 | Critérios numéricos de recebimento | T12 | Posição **≥3 em ≤10 min / 500 m** · evento **≤120 s** com campos obrigatórios · viagem **aberta e fechada** com snapshot. Falha por rede vira **pendente com re-checagem automática por até 24 h**. |
| 7 | Assinatura do responsável no local | T13 | **Fora da v1.** Reavaliar na v2 como flag por cliente. |
| 8 | Alocação de índices cercas × cartões | §6 | **Cartões crescentes do início, cercas decrescentes do fim**, mapa no M2, esgotamento barrado na pré-checagem. |
| 9 | Resolução e compressão de foto | §7 | **1600 px no lado maior, JPEG q80, 300–500 KB**, comprimido na captura. |

**Impactos derivados que entram no backlog do backoffice (§4):**
- ~~Flag de permissão de limpeza total no cadastro de perfil, exposta no pacote de sincronização.~~ **Cancelada em 20/08** (decisão E3): não há permissão diferenciada por escopo.
- Carimbo de geração do manifesto e prazo de validade configurável por cliente.
- Endpoint de re-checagem da Seção F, com política de tentativas de 24 h e transição pendente → aprovado/reprovado.
- Mapa de alocação de índices por módulo, com contagem de pool ocupado por modelo.

### Decidido a partir do protótipo em wireframe — 20/08/2026

O wireframe navegável do fluxo completo — 47 telas em cinco fluxos — expôs 14 pontos em que o documento não decidia o suficiente para a tela existir, ou em que duas seções se contradiziam. Todos fechados.

| # | Ponto | Seção | Decisão |
|---|---|---|---|
| P1 | Quem define a senha nova na recuperação? | T01 | **Tela de criação de senha** entre o código e o modal, com 6 requisitos visíveis e marcação automática. A senha nunca é enviada por canal; o código autoriza a troca. Modal diz "senha alterada". |
| P2 | A fila de saída não tinha porta de entrada | T04 · §7 · T15 | **Décima ferramenta da home**, com contador no cartão e três telas de estado: enviando, com erro (causa + ação), concluída. |
| P3 | Limpeza é ferramenta ou bloco 1 da cadeia? | T04 · T08 · T09 | **É bloco 1 de T09.** Ferramenta autônoma passa a ser o **reset de leitura do ativo**, que não descarta dado do cliente e não exige buffer drenado. |
| P4 | A Seção F impede ou não impede finalizar? | T12 · T13 | **Não impede.** Finalizar com ela falhando exige **ciência marcada pelo técnico**, que vira registro nomeado no M2: *encerrada com falha de recebimento reconhecida*. Máquina de estados de 6 valores em T13. |
| P5 | A sessão de configuração não existia na interface | T16 · §9 | **Objeto de primeira classe**: faixa no topo de toda tela, abertura em T05, encerramento por tela própria com 4 passos, retomada ao reabrir o app. Nomes separados de *sessão de acesso*. |
| P6 | O ativo era rodado duas ou três vezes | T07 · T13 · T14 | **T14 Ciclo dinâmico**: uma tela, um deslocamento, alimentando a fase dinâmica da CAN, a Seção E e a viagem da Seção F. |
| P7 | Ninguém disparava o evento de teste | T12 · T14 | **Ação explícita** no bloco 3 do ciclo dinâmico, com o cronômetro dos 120 s em destaque e *disparar novamente*. |
| P8 | §7 contradizia T08 sobre limpeza offline | §7 · T05 | ~~§7 corrigido para "limpeza, desde que o buffer esteja drenado".~~ **Superado em 20/08 pela decisão E1:** a contradição foi resolvida **removendo o bloqueio**, não acrescentando ressalva. O contador de pendências continua na pré-checagem de T05, agora como informação. |
| P9 | A foto do painel era pedida duas vezes | T10 · T13 | A foto de T10 **satisfaz o item da Seção B**, com o vínculo gravado na evidência: uma foto, dois itens. |
| P10 | As regras do código não estavam escritas | T01 | **6 dígitos · 10 min · 3 tentativas · reenvio após 60 s · teto de 3 envios/hora.** Esgotar tentativas invalida o código, não bloqueia a conta. |
| P11 | Canal fora do cadastro deixava o técnico esperando | T01 | **"Não recebi o código"** com três saídas: conferir e reenviar, trocar de canal, acionar o gestor (registra usuário, canal, data e hora). |
| P12 | "Reenviar tudo" em manutenção sem escopo definido | T11 | Escopo **fixo em limpeza de configuração**, ação nomeada pelo efeito: *reenviar os 5 blocos preservando a conectividade*. Limpeza total não é oferecida em T11. |
| P13 | Conflito cabo × leitor serial detectado tarde | T06 · T09 | Checagem movida para a **seleção do ativo**, com *reconectar por BLE* ali mesmo, e repetida como pré-condição de T09. |
| P14 | Lembrar usuário em aparelho compartilhado | T01 | **Desmarcado por padrão**, guarda só o identificador, limpável no campo. Outro usuário descarta a sessão anterior. E a sessão de acesso **só termina por Sair explícito** — não expira por inatividade. |

**Impactos derivados que entram no backlog do backoffice (§4):**
- Política de senha (os 6 requisitos, histórico das 3 últimas) e invalidação de sessões em outros aparelhos na troca.
- Parâmetros do código de recuperação configuráveis: dígitos, validade, tentativas, intervalo de reenvio, teto por hora.
- Solicitação de verificação de cadastro aberta pelo app, com usuário informado, canal tentado, data e hora.
- Estado **encerrada com falha de recebimento reconhecida** na tela de validação do gestor, distinto de aprovada e de pendente, com nome do técnico, horário da ciência e critérios que falharam.
- Vínculo de uma mesma foto a dois itens de evidência (calibração e Seção B).
- Registro do descarte de sessão de configuração interrompida.

### Decidido contra o comportamento do equipamento — 20/08/2026

A leitura do documento e do protótipo contra a documentação de protocolo e de hardware dos VL06 e VL08 encontrou 22 lacunas. Dez foram decididas e estão aplicadas no corpo do texto, marcadas `[DECIDIDO EQUIPAMENTO]`.

| # | Lacuna | Seção | Decisão |
|---|---|---|---|
| E1 | T08 afirmava que a limpeza total apaga o buffer, e daí derivava drenagem obrigatória com rede — contradizendo a própria definição dos escopos e §7 | T08 · §7 | **A limpeza não descarta buffer nem LOG em nenhum escopo.** A exigência de drenagem **foi removida**. Registro da contagem quando houver reescrita de ID, no lugar do bloqueio. |
| E2 | A drenagem exigia rede que o fluxo não podia fornecer: quem drena é o modem do módulo, contra a APN gravada nele, e o bloco *Conexão* é o último da cadeia | T05 · T08 | **Condição removida.** O contador de pendências passa a ser informativo. A pré-checagem lê o estado do modem do módulo, separado da rede do aparelho. |
| E3 | O gatilho declarado da limpeza total descrevia exatamente a nova instalação, que o perfil padrão não podia executar | T08 · T09 · §3 | **Fluxo padrão para todos.** Flag e papel estendido saem. Escopo derivado em três linhas: nova instalação → **limpeza total**; manutenção e reconfiguração no mesmo ativo → **limpeza de configuração**. |
| E4 | A letra do serial identifica a família, não a variante — e no VL06 as quatro variantes divergem em CAN, Bluetooth e pulsos | §2 · T05 · T10 | **Modelo, variante, ID e credenciais vêm do cadastro de módulos do core M2**, indexados pelo serial. A letra vira reserva de nomeação. Variante é dimensão da matriz. Dois estados de bloqueio: serial não cadastrado e modelo/variante sem driver. |
| E5 | Três lugares declaravam três ordens de bloco, e a regra de arraste de T09 era o oposto de §6.7 | T09 · §6.7 · T11 | **Ordem canônica única com *Cercas* antes de *Leitor*.** O reenvio duplicado do *Leitor* desaparece. Arraste corrigido: *Ativo* → *Eventos*; *Cercas* → *Leitor* e *Eventos*; *Leitor* → *Eventos*. |
| E6 | A verificação de ID comparava o valor consigo mesmo, por falta de valor esperado | T08 | **O ID de 4 dígitos hexadecimais é definido no M2.** A comparação é contra o cadastro, e a reescrita acontece quando o lido diverge do cadastrado — inclusive na leitura inicial. |
| E7 | O reset de leitura do ativo podia apagar o script inteiro: a numeração de contadores tem lacunas e índices de efeito colateral | T08 · T10 | **Limpeza índice a índice ou em sub-faixas que param antes de índice proibido**, com a faixa declarada no bloco *Ativo* e validada no cadastro. Lista de índices proibidos na matriz. |
| E8 | O critério de posicionamento media o preset, não a instalação | T12 | **Janela derivada do intervalo de rastreamento previsto** — `3 × intervalo + 2 min` — com ignição ligada declarada. Os 10 min viram teto de espera. |
| E9 | A matriz de conflitos listava pares, e cinco consumidores disputam o mesmo par de linhas | T06 · T09 | **Matriz de ocupação de pinos**, montada de *Leitor* + *Ativo* + meio de conexão. Combinação sem saída por BLE é barrada no cadastro. |
| E10 | A atualização de firmware era oferecida "quando houver conectividade", que é o bloco 6 da cadeia | T05 | **Gravação isolada do bloco *Conexão* antes da atualização**, e releitura de capacidades com reinício da pré-checagem depois. |

### Fechadas no fechamento de lacunas — 20/08/2026

As doze lacunas que a avaliação de equipamento deixou explicadas e não decididas foram **decididas**, uma a uma, e aplicadas no corpo do texto como `[DECIDIDO FECHAMENTO]`. Detalhamento e exemplo numérico de cada uma em `Avaliacao-Gaps-VL06-VL08.html`. Nenhuma das doze restou em aberto — mas a **rev 4 do protótipo, em 21/08, expôs três lacunas novas** (R1–R3), abaixo.

| # | Lacuna | Decisão | Onde ficou |
|---|---|---|---|
| A1 | Ninguém verifica se o ID existe na plataforma de destino | **Pré-checagem contra o backend**, antes de gravar o bloco *Conexão*; sem rede vira aviso e a causa é herdada pela Seção F. Destino que não é o M2 fica sem verificação na v1 | T05 |
| A2 | O módulo guarda **uma** string de versão contra 5 blocos versionados | **String composta** no slot único, formato posicional na ordem canônica, reescrita após o read-back de cada bloco. Ler a string é o primeiro passo do diff | T09 · T11 |
| A3 | Pré-checagem soma `cartões + regiões` contra um pool de **posições** | Conta passa a ser `cartões + pontos`, com **dois limites independentes** — regiões e posições — mais o teto de pontos por cerca | §6.4 · T05 · §4.4 |
| A4 | A matriz não cobre o que os blocos *Eventos* e *Ativo* consomem | **Dimensões fechadas na matriz** e item único de pré-checagem "o conteúdo cabe neste módulo e firmware", com o mesmo cálculo rodando na publicação do bloco | §4.4 · T05 |
| A5 | O prazo de 120 s depende do modo de fila, e o evento de teste não tinha nome | **Modo de fila e buffer declarados no bloco *Eventos***; cronômetro só começa com pendências em zero; evento de teste com índice reservado e marcado, nunca entregue à operação do cliente | T12 · T14 · §4.5 |
| A6 | Eventos que o firmware cria sozinho viram divergência em toda manutenção | **Índices reservados declarados por modelo e firmware** na matriz; presente e não previsto só é divergência fora da lista; firmware sem lista gera seção *não classificados* | T11 · §4.4 |
| A7 | O repouso do módulo derruba o link e o app reporta como falha | **Repouso inibido enquanto a sessão viver**, restaurado no encerramento com releitura de confirmação; fora disso, queda por repouso é evento esperado, não erro | T16 · T05 |
| A8 | Senha divergente cai em "módulo não responde", indistinguível de cabo ruim | **Uma causa em tela** (cabo, alimentação, cadastro) e **causa nomeada no M2** quando o protocolo permitir distinguir. O app nunca tenta outra senha | T05 · §9.8 |
| A9 | "Persistir em memória não volátil" descreve errado o que a operação faz | Passo renomeado para **gravar contadores e estado do script**, verificado pela releitura dos contadores semeados; a configuração continua provada no read-back de T09 | T16 |
| A10 | Identificador só é reconhecido se a string cadastrada bater com o recorte do modo do leitor | **Modo declarado no bloco *Leitor***; a tela mostra o código lido ao lado do esperado e oferece solicitar correção de cadastro com os dois valores | T14 · §4.7 |
| A11 | Tolerância do read-back da semente não fechada; domínio da fonte do horímetro divergente | **Tolerância = granularidade do contador + tempo decorrido**, comparada na unidade do reporte; releitura antes do ciclo dinâmico; domínio alinhado em três valores nos dois lados | T10 |
| A12 | Evidência sob manifesto vencido fica presa na fila para sempre | **O servidor aceita**, gravando a idade do pacote no momento da geração. T15 não precisa de estado terminal nem de reconciliação | T15 · §7 |

**Correções de nomenclatura — fechadas.** O protótipo expunha baudrate e o código da entrada física em tela, contra o princípio 1, e o rótulo de navegação de T09 ainda dizia "Envio de scripts". Fechado como **regra dura, verificável em revisão de tela**: nenhuma tela mostra baudrate, código de entrada ou saída, índice de memória, nome de contador ou a palavra *script*; hardware é nomeado por **cor e função**; o valor técnico vive no log e na evidência. Ver §1.

**Quatro riscos convertidos em requisito.** Eles escondiam decisão de produto, e foram fechados junto: a **validação de faixa de contadores é bloqueante na publicação** (risco 7 → §4.4), a **consulta de auditoria entra na v1** (risco 10 → §4.10 e §9.7), o **método de calibração de velocidade é declarado por modelo de ativo** (risco 4 → §4.2 e T10) e a **trava de ativo não cadastrado não oferece caminho dentro do app** (risco 3 → T06).

### Validação — revisada em 20/08/2026

`[REVISADO FECHAMENTO]` **a bancada saiu do caminho crítico e virou o autoteste de instalação.** O que dez itens iam confirmar uma vez em dois equipamentos, o app confirma em toda instalação em todo equipamento — com um **reinício e uma releitura** no encerramento da sessão (§A.1). Uma bancada prova que o modelo se comporta; o autoteste prova que este módulo se comportou, e é o segundo que serve ao gestor.

| Antes | Agora |
|---|---|
| B1 ID × escopo de limpeza | **Assertiva 5** do autoteste, em toda instalação |
| B2 semeadura de hodômetro e horímetro | **Assertiva 2** (sobrevivência ao reinício) + granularidade medida pela frota (§A.3) |
| B3 paridade VC03, VC05, VCONE | Fora do caminho crítico, como já estava. Fecha pelo **primeiro autoteste íntegro** do modelo (§A.4) |
| B4 proteção do canal de programação | **Assertiva 6**, em todo encerramento |
| B5 cercas × identificadores | **Assertiva 3**, em toda instalação com cerca e cartão |
| B6 faixa do reset de leitura | **Assertiva 4** em campo, e o **único item que continua exigindo bancada** — o teste destrutivo de propósito que produz a lista de índices proibidos (§A.2) |
| B7 repouso do módulo | **Assertiva 7**, em todo encerramento |
| B8 ordem de entrega × prazo do evento de teste | Parâmetro medido pela frota (§A.3) |
| B9 senha divergente do cadastro | Assinatura de recusa acumulada pela frota (§A.3) |
| B10 gateway indutivo × leitor serial | **Assertiva 8** — o cartão é lido na condição de operação, e o evento chega ao servidor |

O que sobrou de bancada obrigatória: **um item** (§A.2), que bloqueia a publicação de bloco *Ativo* com faixa declarada, não o desenvolvimento do app. E **uma confirmação de meia hora**: por qual via cada driver reinicia o módulo — sem reinício, o autoteste perde as três assertivas que justificam sua existência.

O roteiro completo dos dez itens continua no **Anexo A.5**, como referência de investigação para quando um autoteste falhar e ninguém entender por quê.

<details>
<summary>Status anterior dos dez itens de bancada — histórico</summary>

| # | Pendência | Seção | Situação após 20/08 |
|---|---|---|---|
| B1 | O ID de plataforma sobrevive a cada escopo de limpeza? **E o buffer?** | T08 | **Neutralizada quanto ao ID** — todo frame de resposta o carrega, e agora há valor esperado no cadastro. `[EQUIPAMENTO]` **acrescentada a medição de buffer e LOG antes e depois de cada escopo**, como confirmação de que a decisão E1 está correta. |
| B2 | Mecanismo de semeadura de hodômetro e horímetro | T10 | **Resolvida na documentação:** via contador, com offset somado pelo bloco *Ativo* — o acumulador estatístico só aceita zerar. Bancada confirma persistência em flash e unidade reportada. `[FECHAMENTO]` a tolerância de conferência já está decidida (granularidade + tempo decorrido, A11); a bancada mede a **granularidade real** de cada contador, que é o parâmetro que a decisão consome. |
| B3 | Paridade de comandos para VC03, VC05 e VCONE | §2 | **Fora do caminho crítico.** Modelos não entram na v1; o app os identifica pelo serial, bloqueia e registra a ocorrência. |
| B4 | Canal de programação protegido em cada família | §9 | **Comandos documentados** para o VL06 a partir da FW 7.05. Bancada confirma paridade no VL08 e o piso de firmware. Sem suporte, o app registra e segue. |
| B5 | *(novo)* Limpar pontos de cerca invalida a lista de identificadores? | §6 | **Aberta.** A limpeza de pontos é global e a memória é compartilhada com os cartões. Assumido o pior caso: *Leitor* sempre reenviado após *Cercas*. |
| B6 | *(reformulado)* A faixa de contadores declarada para o reset de leitura é segura? | T08 | **Muda de natureza.** O escopo isolado existe: é a limpeza da faixa de contadores declarada no bloco *Ativo*. O que se testa agora é a **faixa** — contígua, sem lacuna do modelo, sem contador semeado, sem índice de efeito colateral. Virou regra de validação de cadastro. `[FECHAMENTO]` a validação é **bloqueante** na publicação (§4.4), e o passo 5 do roteiro — repetir de propósito com faixa mal declarada — é o que produz a lista de índices proibidos que ela consome. |
| B7 | *(novo, equipamento)* Repouso do módulo durante a sessão de configuração | T16 | **Arquitetura decidida (A7): inibir durante a sessão, restaurar no encerramento.** A bancada mede em quanto tempo o módulo dorme, se o rádio de programação cai com ele, e — o ponto crítico — se a **restauração é confirmável por releitura**. Não sendo, o app cai no comportamento alternativo: queda por repouso tratada como evento esperado, sem inibição. |
| B8 | *(novo, equipamento)* Ordem de entrega × prazo do evento de teste | T12 | **Arquitetura decidida (A5): o cronômetro só começa com pendências em zero.** A bancada não decide mais o critério; ela mede **quanto tempo a fila leva a drenar** por tamanho de buffer e modo — número que vai para a matriz e define a expectativa de tempo em campo — e confirma que o evento marcado como teste é distinguível de ocorrência de operação na plataforma. |
| B9 | *(novo, equipamento)* Módulo com senha divergente do cadastro | T05 | **Arquitetura decidida (A8): uma causa em tela, causa nomeada no M2.** A bancada decide apenas o **conteúdo do registro**: recusa distinguível do silêncio grava "senha divergente do cadastro"; indistinguível grava "causa não distinguível". A tela do técnico não muda em nenhum dos dois casos. |
| B10 | *(novo, equipamento)* Ocupação da serial pelo gateway de CAN indutivo | T06 · §2 | **Aberta.** Por qual via o gateway ocupa a porta nas variantes sem CAN física, e se conflita com o leitor **em operação**, não só na programação. |

</details>

### Decisões derivadas das pendências de bancada — 20/08/2026

| # | Decisão | Seção |
|---|---|---|
| B1 | ~~**Pré-checagem de buffer com drenagem obrigatória** antes de qualquer operação destrutiva.~~ **Revogada em 20/08 pela decisão E1** — a limpeza não descarta buffer. Fica de pé a segunda metade: verificação do ID como invariante de execução, agora **contra o valor do cadastro** (decisão E6). | T08 |
| B2 | **Mapa de contadores declarado no bloco *Ativo*, por versão de script** — nunca codificado no app. Sem declaração para a combinação ativo × módulo × versão, a calibração fica indisponível com motivo explícito. | T10 |
| B3 | **Identifica pela letra do serial, bloqueia e registra no M2.** Nunca configura por aproximação de driver. | §2 |
| B4 | **Proteção do canal ativada por padrão**, aberta pelo app no início da sessão e fechada sempre ao final, inclusive em aborto. Firmware sem suporte registra a indisponibilidade; a tela nunca oferece desligar. | §9 |

### Revisão do protótipo rev 4 — 21/08/2026

O wireframe navegável foi reconstruído para refletir as três rodadas que ele ainda não conhecia: equipamento, fechamento e validação. Passou de **47 para 52 telas** em 5 fluxos, e o inventário de decisões passou a ser etiquetado pela rodada que produziu cada uma. As mudanças estruturais no protótipo — todas espelhando decisões já tomadas, nenhuma nova: cadeia de **6 blocos** na ordem canônica (o sétimo passo desapareceu), arraste corrigido, quatro travas novas de pré-checagem, encerramento de **8 passos** com autoteste em tela própria, e a trava por dado pendente no módulo **removida**.

**Quatro decisões de rastreabilidade, tomadas em 21/08.** Ao alinhar o protótipo, quatro cartões de decisão do protótipo ficaram sem tela apontando para eles. A causa não era obsolescência: cada tela carregava **uma** decisão, e as rodadas seguintes empurraram a anterior para fora. Corrigido na estrutura — uma tela passa a poder carregar mais de uma decisão — e resolvido item a item:

| Cartão | Decisão | Razão |
|---|---|---|
| *Limpeza é bloco; o autônomo é o reset de leitura* | **mantido**, apontado da tela do reset | Continua valendo inteiro. O que mudou depois foi só o mecanismo do reset (faixa declarada), que é outra decisão. A tela mostra as duas. |
| *O evento de teste tem ação e cronômetro* | **fundido** no cartão do prazo × fila | O cartão novo contém o antigo. Fundidos, contam uma narrativa: a ação não existia em nenhuma tela; depois o prazo media a fila, não a instalação. |
| *Conflito de ocupação detectado na seleção do ativo* | **fundido** no cartão da matriz de ocupação | Alinha o protótipo com o documento, que já apresentava isso como uma coisa só — "`[DECIDIDO PROTÓTIPO]`, ampliado em `[DECIDIDO EQUIPAMENTO]`" (T06). Mudou de lugar, depois mudou de forma. |
| *Em manutenção, o reenvio é nomeado pelo efeito* | **mantido**, apontado da tela de divergências | Decisão vigente, nunca tocada pelas rodadas seguintes. É ela que impede a tela de dizer "reenviar tudo" sem declarar a consequência. |

**Chamada de julgamento aplicada, e reversível:** o protótipo trocou em tela *BLE* por **sem fio**, *APN* por **rede do módulo** e *iButton* por **chave de contato**. O princípio 1 pede isso, mas a lista de §1 não nomeia esses três — ver R3 abaixo.

#### Três lacunas expostas pela rev 4 — `[ABERTO]`

Escrever as telas do autoteste expôs pontos em que duas seções já decididas não podem valer as duas ao mesmo tempo. **Nenhuma está decidida** — cada uma traz o fecho que parece certo, não um fecho aplicado.

| # | Lacuna | Onde as duas regras se batem | Fecho proposto |
|---|---|---|---|
| R1 | **A assertiva 8 pendente prende o técnico, que é exatamente o que ela promete não fazer** | §A.1 diz que a assertiva 8 "fica pendente com re-checagem por 24 h e **não prende o técnico ao veículo**". Mas ela é item da **Seção D** (T13), e o critério de finalização exige **100% dos automáticos de A, C e D aprovados**. Assertiva 8 pendente ⇒ Seção D incompleta ⇒ não finaliza ⇒ o técnico espera. | Tirar a assertiva 8 da conta de bloqueio, como já se fez com a Seção F inteira — ela depende de servidor, não do módulo na frente do técnico. As outras sete continuam bloqueantes, e a distinção do risco 8 se mantém: bloqueia o que o técnico controla. |
| R2 | **"As oito assertivas" contra uma assertiva condicional** | A Seção D exige "as **oito** assertivas de §A.1" (T13). Mas a assertiva 4 é medida "antes e depois do reset de leitura, **quando a ferramenta é usada na sessão**" (§A.1) — e na instalação típica ela não é usada. Ou a Seção D não pode exigir oito, ou a assertiva 4 passa por omissão, e as duas leituras mudam o que *autoteste íntegro* significa. | Trocar "as oito" por **"as assertivas aplicáveis, declaradas na evidência"**, com a lista de aplicáveis derivada do que a sessão fez. Assertiva não aplicável aparece como *não se aplica*, com o motivo — nunca como aprovada. É o mesmo tratamento que a regra 2 de §6 dá ao ativo sem cerca cadastrada. |
| R3 | **A lista de vocabulário proibido está incompleta, e o próprio documento a viola** | §1.1 nomeia baudrate, código de entrada ou saída, índice de memória, nome de contador e a palavra *script*. Não nomeia **APN**, **BLE** nem **iButton** — e T06 põe **"Reconectar por BLE"** como rótulo de ação em tela, protocolo exposto ao técnico que o princípio manda esconder. | Fechar a lista como **enumeração explícita**, acrescentando protocolo de rádio, nome de serviço de rede e marca de componente; e renomear a ação de T06 para **"Reconectar sem fio"**. Sem enumeração fechada, "verificável em revisão de tela" não é verificável. |

R1 e R2 são **critério de entrada em campo**: as duas decidem quando uma instalação é homologada, e hoje o app não tem como responder. R3 é barato e não bloqueia nada, mas é o que torna o princípio 1 auditável.

### Riscos — revisados em 20/08/2026

`[REVISADO FECHAMENTO]` a lista foi recalculada contra as 17 decisões do fechamento e contra o autoteste de instalação. Quatro riscos foram mitigados por decisão, três encolheram porque o autoteste passou a detectá-los na mesma visita, e três nasceram das próprias decisões. **Estado** diz o que sobrou, não o que se temia.

| # | Risco | Estado | O que sobrou, e como acompanhar |
|---|---|---|---|
| 1 | **O backoffice do M2 é o caminho crítico** | **Agravado** | O fechamento acrescentou trabalho de backoffice em quase toda decisão: dimensões de capacidade na matriz, índices reservados por firmware, lista de índices proibidos, método de calibração por modelo de ativo, modo de fila e buffer no bloco *Eventos*, modo de extração no bloco *Leitor*, consulta de auditoria, matriz de cobertura e quarentena de faixa. **Nenhuma linha de app compensa a ausência desses cadastros.** É o risco que domina o cronograma: sequenciar o backoffice antes do app, não em paralelo. |
| 2 | ~~"Todos os modelos" na v1~~ | **Mitigado, com critério numérico** | Arquitetura para todos, drivers de VL06 e VL08. A promessa agora tem teste: o **primeiro autoteste íntegro de um VL12 habilitado só por cadastro**, sem release do app (§A.4). Antes do fim da v1. |
| 3 | **Ativo não cadastrado trava sem caminho no app** | **Aberto, por decisão** | A tela não oferece nada além da mensagem — abrir pedido de cadastro criaria improviso em campo (princípio 5). O canal de escalonamento é processo de operação e **precisa existir antes da v1 entrar em campo**: sem ele, cada ativo não cadastrado é uma visita perdida. Acompanhar a contagem de travas por *ativo fora do pacote*. |
| 4 | ~~Calibração por pulso exige veículo em movimento~~ | **Mitigado** | Método declarado por modelo de ativo (§4.2); o pátio fechado saiu da decisão de campo. Residual: catálogo que declara pulso para frota que não pode rodar bloqueia a calibração sem alternativa em tela. Precisa de **caminho rápido de correção de catálogo**, não de exceção no app. |
| 5 | **A semente depende da faixa persistida em flash** | **Encolhido** | O autoteste (assertiva 2) detecta na **mesma visita** o que antes aparecia dias depois como hodômetro errado. Residual honesto: se o reinício for **por comando** e o comando não limpar a RAM, a assertiva prova sobrevivência a reinício mas **não a corte de alimentação**. Enquanto isso não estiver confirmado, o corte de alimentação é o caminho preferido nas instalações que semearam. |
| 6 | **Memória compartilhada entre cercas e identificadores** | **Encolhido** | A ordem canônica (§6.7) evita o problema e a assertiva 3 confirma em toda instalação com cerca e cartão. Residual: o arraste *Cercas* → *Leitor* encarece toda reconfiguração que toca geofence — é custo aceito, não falha. |
| 7 | **Faixa de contadores mal declarada apaga em silêncio** | **Encolhido, com barreira dupla** | Validação **bloqueante na publicação** (§4.4) antes, assertiva 4 e **quarentena da faixa** depois: a primeira falha em campo bloqueia aquela declaração para novas publicações. Residual: a validação depende da lista de índices proibidos, que só sai do **único item de bancada** (§A.2). Modelo ou firmware sem lista declarada deve **bloquear a publicação**, nunca liberar por omissão. |
| 8 | **A ciência da falha da Seção F pode virar hábito** | **Aberto** | Nada impede que a marcação seja feita por reflexo em toda instalação. Acompanhar a taxa de *encerrada com falha reconhecida* por técnico: se não for baixa, o critério volta a bloquear. Nota de coerência: o **autoteste não tem ciência** — ele bloqueia a homologação. A diferença é deliberada: a Seção F depende de rede e servidor, fora do controle do técnico; o autoteste depende do módulo que está na frente dele. |
| 9 | **O cadastro de módulos é caminho crítico** | **Aberto, com sinal novo** | Sem cadastro o módulo não é configurável — o app não deduz modelo nem variante. O que mudou: a falha de credencial agora **registra no M2** (A8 · §9.8), então o gestor tem sinal objetivo de qual serial está com cadastro velho, em vez de depender do relato. Residual: manter serial, variante, ID e senha a cada movimentação de equipamento entre clientes continua sendo processo que não existe. |
| 10 | **A auditoria da limpeza é posterior, não prévia** | **Mitigado** | A consulta de auditoria entra na v1 (§4.10 · §9.7) e conferi-la é critério de entrada em campo. Residual: é escopo de backoffice, e entra na fila do risco 1. |
| 11 | **Módulo acordado por sessão que morreu** | **Encolhido** | A assertiva 7 confirma a restauração do repouso em todo encerramento normal. Sobra só a sessão que morre de forma anormal — app fechado à força, bateria do aparelho —, e aí a restauração espera a próxima visita. Acompanhar em produção; se aparecer, a alternativa é encurtar a inibição para a janela de envio da cadeia. |
| 12 | **Destino que não é o M2 fica sem verificação de ID** | **Aberto, declarado** | A pré-checagem de A1 consulta o backend do M2; para plataforma de terceiro a verificação não existe na v1 e o sintoma volta a ser a Seção F reprovando nos três critérios. Reavaliar quando houver contrato com destino externo. |
| 13 | *(novo)* **A validação por campo só cobre a combinação que alguém instalou** | **Aberto, com mitigação** | É o preço de trocar bancada por autoteste. A matriz de cobertura (§A.4) conta autotestes íntegros por modelo × variante × firmware, e a **primeira instalação de uma combinação nova** vai para revisão do gestor mesmo passando. Combinação rara pode ficar meses sem prova nenhuma. |
| 14 | *(novo)* **Todo o método de validação depende de um reinício** | **Aberto, e é o mais barato de fechar** | Sem caminho de reinício — comando ou corte de alimentação — o autoteste perde as assertivas 1, 2 e 3, que são as que justificam sua existência, e a bancada volta ao caminho crítico. **Confirmar em VL06 e VL08 antes de escrever a tela de encerramento.** Meia hora de equipamento decide a estratégia de validação inteira. |
| 15 | *(novo)* **O reinício é um ponto de falha novo no fim de toda instalação** | **Aberto** | Módulo que não volta transforma uma instalação boa em ocorrência. É o momento certo para descobrir — o técnico está na frente do equipamento —, mas se a taxa não for desprezível o reinício precisa virar condicional, só nas instalações que semearam. Acompanhar desde a primeira leva de campo. |

**Os três que dominam.** O risco 1 governa o cronograma: o backoffice ficou maior a cada decisão e o app não anda sem ele. O risco 14 governa a estratégia de validação e custa meia hora para resolver — deve ser a primeira coisa a fazer com equipamento na mão. O risco 3 governa a percepção do técnico no campo: é a única trava do fluxo sem saída dentro do app, e ela foi deliberadamente mantida.

---

## Anexo A — Validação: o que a instalação prova e o que exige bancada

`[REVISADO FECHAMENTO]` O roteiro original tratava a bancada como pré-requisito: dez itens a confirmar num VL06 e num VL08 antes de confiar no fluxo. A revisão **inverte a ordem**. Quase tudo que a bancada ia confirmar *uma vez, em dois equipamentos*, o app confirma *em toda instalação, em todo equipamento* — com leituras que ele já faz. Uma bancada prova que o modelo se comporta; o autoteste prova que **este módulo** se comportou, e é isso que o gestor precisa saber quando o hodômetro sair errado três semanas depois.

Consequências:

- A bancada **deixa de bloquear qualquer coisa**. Sobra **um** item que não pode rodar em campo, porque é destrutivo de propósito (§A.2).
- Os parâmetros que a bancada ia medir — granularidade de contador, tempo de drenagem da fila, assinatura de recusa de senha — passam a ser **medidos pela frota** e acumulados no M2 (§A.3).
- Aparece um limite novo, que a bancada não tinha: campo só valida a combinação que encontrou (§A.4).

### A.1 Autoteste de instalação — o mínimo que toda instalação prova

**O autoteste é um reinício e uma releitura.** No encerramento da sessão de configuração (T16), com o módulo já configurado e calibrado, o app **reinicia o módulo e relê tudo o que gravou**. Um único reinício prova, de uma vez, as três coisas que falham em silêncio: a semente sobrevive, a configuração sobrevive, os identificadores sobrevivem.

Custo para o técnico: o tempo de reinício e reconexão, uma vez por instalação, sem nenhuma ação manual. E é o momento certo para descobrir que o módulo não volta — o técnico ainda está na frente dele.

| # | Assertiva | Como o app prova | Custo | Substitui |
|---|---|---|---|---|
| 1 | **A configuração sobrevive ao reinício** — os 5 blocos conferem *depois* de reiniciar, não só cada um na sua vez | read-back consolidado após o reinício, incluindo o bloco *Ativo*, que é o mais distante do fim da cadeia | zero — o read-back consolidado já existe em T09; muda o **momento** | escopo excessivo de limpeza (B6) |
| 2 | **A semente sobrevive ao reinício** | releitura dos contadores semeados após o reinício, comparada na unidade do reporte com a tolerância de A11 | zero | **B2 passo 4** · risco 5 |
| 3 | **Os identificadores sobreviveram às cercas** | leitura dos índices de cartão após o bloco *Conexão* e após o reinício, contra a alocação do pacote | zero | **B5** · risco 6 |
| 4 | **As flags do script estão íntegras** | snapshot das flags declaradas pelo bloco *Ativo* antes e depois do reset de leitura, quando a ferramenta é usada na sessão | zero | **B6** · risco 7 |
| 5 | **O ID confere com o cadastro, e a contagem de pendências está registrada** | ID e contagem de buffer/LOG lidos antes do bloco 1 e depois do bloco 6; os quatro valores vão para a evidência | zero — dois comandos de leitura | **B1** |
| 6 | **O canal de programação ficou fechado** | releitura do estado depois do fechamento | zero — a releitura já é exigida por §9.3 | **B4** |
| 7 | **O repouso voltou ao valor original** | releitura do parâmetro depois da restauração | zero — já decidido em A7 | **B7** |
| 8 | **O leitor funciona na condição de operação** | o evento de identificação gerado no ciclo dinâmico **chega ao servidor com o código esperado** — cartão lido com a CAN em operação, pelo caminho que o cliente vai usar | zero | **B10**, e dá a A10 o código lido sem leitura ao vivo |

**Regras do autoteste**

- **Falha bloqueia a homologação, não o encerramento.** A sessão fecha do mesmo jeito — o canal de programação tem de fechar sempre —, mas a instalação não é declarada homologada. Entra na máquina de 6 estados de T13, no mesmo lugar da Seção F pendente.
- **Assertiva 4 falhando põe a faixa em quarentena no M2.** A primeira falha de faixa em campo bloqueia aquela declaração de bloco *Ativo* para novas publicações, até revisão da engenharia. É o que impede o mesmo apagamento silencioso de se espalhar pela frota antes de alguém notar.
- **Assertiva 8 segue a regra da Seção F**: fica pendente com re-checagem em background por 24 h, e não prende o técnico ao veículo. `[ABERTO R1]` isso só se realiza se ela sair da conta de bloqueio da Seção D — hoje o critério de finalização de T13 exige 100% dos automáticos de D, o que a prende. Ver §10, rev 4.
- O resultado é gravado com **modelo, variante, versão de firmware e a string composta de versão dos blocos** (A2). É esse carimbo que constrói a matriz de cobertura de §A.4.
- A tela mostra as oito assertivas **com o valor lido em cada uma**, não um "OK" agregado — mesma regra do princípio 3 e do feedback por item de T15.

**A única coisa a confirmar antes:** por qual via o app reinicia o módulo em cada driver. Comando de reinício, quando existir; senão, o app pede **um corte de alimentação** no encerramento, que em instalação é ação de segundos — o técnico está com o arnês na mão. Se nenhum dos dois for viável em algum modelo, o autoteste daquele modelo perde as assertivas 1, 2 e 3, e **aí sim** ele precisa de bancada. Confirmar isso é meia hora de VL06 e VL08, não um roteiro de dez itens.

### A.2 O único item que exige bancada

**Faixa de contadores mal declarada, de propósito** — o passo 5 do antigo B6. Atravessar uma lacuna de numeração e um índice de efeito colateral, e documentar o sintoma: quais índices zeram as flags do script, por modelo e variante.

Não pode rodar em campo por dois motivos: é destrutivo por definição, e rodaria contra um ativo de cliente. É o que produz a **lista de índices proibidos** que a validação bloqueante de §4.4 consome — sem ela, a validação não tem contra o que validar.

- Escopo: um VL06 e um VL08, sem ativo, XVM Terminal.
- Entrega: uma linha de matriz por modelo e firmware, não código.
- **Bloqueia a publicação de bloco *Ativo* com faixa declarada**, não o desenvolvimento do app. Enquanto não existir, a ferramenta de reset de leitura do ativo fica indisponível em campo com motivo explícito, e o resto do fluxo anda.

### A.3 Parâmetros que a frota mede sozinha

Três itens do roteiro original mediam **parâmetro**, não comportamento. E parâmetro medido em duas amostras de bancada é pior do que parâmetro medido em mil instalações.

| Parâmetro | Antes | Agora |
|---|---|---|
| Granularidade real de cada contador e erro de arredondamento no reporte | B2, passos 1–3 | O autoteste compara semente gravada × valor relido × valor reportado em toda instalação com calibração. A distribuição acumulada no M2 **é** a granularidade, por modelo e firmware. |
| Tempo de drenagem da fila por tamanho de buffer e modo | B8 | Toda instalação já mede: pendências no início, pendências em zero, chegada do evento de teste. O M2 acumula e a matriz aprende o valor real por modelo, firmware e operadora. |
| Assinatura da recusa por credencial | B9 | Toda pré-checagem que falha registra a **resposta bruta** do módulo (nunca a senha, §9.2). Módulo com cadastro desatualizado aparece naturalmente em campo; quando o padrão se repetir, o M2 passa a nomear a causa (A8). |

Nenhum dos três bloqueia nada. Os dois primeiros começam com a tolerância e o teto conservadores já decididos; o terceiro começa gravando "causa não distinguível" e melhora sozinho.

### A.4 O limite do método

Campo só valida a combinação que encontrou. Uma bancada cobre dois equipamentos de propósito; a frota cobre milhares, mas só os que alguém instalou — e a **primeira** instalação de um modelo × variante × firmware novo não tem prova anterior nenhuma.

- O M2 mantém uma **matriz de cobertura**: quantos autotestes íntegros existem para cada combinação de modelo, variante e firmware.
- Combinação com **zero autotestes** é sinalizada ao técnico e ao gestor como *primeira instalação desta combinação*, e o resultado vai para revisão do gestor mesmo passando — no lugar da bancada que não vai acontecer.
- É também o critério que valida a promessa de §2: habilitar o VL12 por cadastro só é crível quando o primeiro autoteste de VL12 fecha íntegro **sem release do app**. Esse é o teste da arquitetura de driver, e agora ele tem número.

### A.5 Roteiro de bancada — referência, não pré-requisito

Os itens abaixo continuam válidos como **roteiro de investigação**: para quando houver equipamento e tempo, ou quando um autoteste falhar em campo e ninguém entender por quê. Nenhum deles bloqueia a v1, e o que cada um cobria está indicado nas seções acima.

Escopo, quando executado: um VL06 e um VL08, cabo e BLE, XVM Terminal. Registrar modelo, versão de firmware e versão de placa em toda medição — os resultados valem por família **e por firmware**.

#### B1 · ID de plataforma × escopo de limpeza

Para cada escopo de limpeza, na ordem: ler o ID **e a contagem de buffer e LOG** → executar → reler os dois → registrar. A contagem é a metade nova do teste, e é ela que confirma a decisão E1.

| Escopo | ID esperado | Buffer e LOG esperados | Se divergir |
|---|---|---|---|
| Limpeza básica | preservado | **contagem intacta** | ID: documentar, o app já reescreve. Buffer: **achado grave** — a decisão E1 cai e a drenagem volta ao requisito |
| Limpeza de eventos | preservado | contagem intacta | idem |
| Limpeza de filtros CAN | preservado | contagem intacta | idem |
| Limpeza total | **provavelmente perdido** | **contagem intacta** | ID: confirma a suposição, nada muda. Buffer: idem acima |
| Reescrita do ID | novo valor gravado | **contagem zerada** | Confirma a única perda de dado admitida na v1 (§9.6) |

Registrar também: a resposta de consulta de identificação traz o campo `ID=` em **todos** os escopos, inclusive com o módulo recém-limpo? Se em algum estado o módulo responder sem o campo, o app precisa de um caminho alternativo de leitura — e isso vira requisito novo.

Complementar: confirmar que a limpeza **não funciona pelo servidor** em nenhum escopo, e registrar o valor lido do ID **contra o cadastro de módulos** — é essa comparação que o app executa agora, não a comparação do ID consigo mesmo.

#### B2 · Semeadura de hodômetro e horímetro

1. Semear horímetro com valor conhecido, em segundos, e conferir o valor relido.
2. Semear o offset de hodômetro em metros e conferir o relido.
3. Forçar geração de reporte e conferir a unidade: horímetro em **minutos**, hodômetro em **metros**. Medir o erro de arredondamento — é ele que define a tolerância do read-back.
4. **Cortar a alimentação**, religar e reler os dois valores. Este é o teste que importa: confirma se o contador escolhido está na faixa persistida em flash.
5. Repetir com um contador **fora** da faixa persistida, para documentar o modo de falha e alimentar a validação do cadastro.
6. Zerar o acumulador de odômetro **depois** de semeado o offset e observar o efeito no valor reportado — define se o app pode zerar acumulador em manutenção sem estragar a semente.
7. Repetir 1–4 no VL08, cujos contadores e comandos de estatística são diferentes.

#### B3 · Paridade de comandos — VC03, VC05, VCONE

Só quando houver equipamento disponível; não bloqueia a v1. Verificar, contra o driver do VL08: senha e formato, baudrate, sintaxe de limpeza por escopo, quantidade de contadores e de flags, quantidade de regiões de cerca, comandos de estatística, suporte à proteção de canal. O resultado é uma linha na matriz de capacidades, não código novo — se exigir código, a promessa de "modelo é cadastro, não release" falhou e isso é o achado mais importante do teste.

#### B4 · Proteção do canal de programação

1. Consultar o estado inicial da proteção.
2. Ativar, e confirmar que um comando de escrita passa a ser recusado.
3. Abrir temporariamente por N segundos; confirmar escrita liberada.
4. **Aguardar o tempo expirar** e confirmar que o canal fecha sozinho — é isso que protege a sessão abortada.
5. Desativar a proteção e confirmar o estado.
6. Repetir tudo por BLE, não só por cabo.
7. Repetir no VL08 e registrar o **piso de firmware** em que cada passo funciona.
8. Testar o caso ruim: proteção ativa e senha do pacote desatualizada. O módulo deve recusar; o app precisa distinguir "senha errada" de "módulo não responde", porque a mensagem de campo é diferente.

#### B5 · Cercas × identificadores na memória compartilhada

1. Gravar cartões e pontos de cerca segundo a convenção decidida — cartões crescendo do início, cercas decrescendo do fim.
2. Executar a limpeza de pontos de cerca.
3. **Conferir se os cartões sobreviveram.**
4. Se não sobreviveram, confirmar que reenviar o bloco *Leitor* depois do bloco *Cercas* restaura tudo — é a mitigação já assumida no requisito.
5. Testar o caso de colisão proposital, gravando cartão e ponto no mesmo índice, para documentar o sintoma. Precisamos saber como a corrupção se manifesta em campo para escrever a mensagem de diagnóstico certa.
6. Medir o limite real do pool no VL08, cuja faixa de regiões difere do VL06.

#### B6 · Reset de leitura do ativo — segurança da faixa declarada

Reformulado pela decisão E7. Não se testa mais **se existe** o escopo: ele é a limpeza da faixa de contadores que o bloco *Ativo* declara. Testa-se **se a faixa é segura**, e o que acontece quando não é — porque o modo de falha aqui não é erro, é apagamento silencioso.

Estado inicial: módulo configurado, ativo lido com valores estabilizados, hodômetro e horímetro **semeados**, buffer com pendência conhecida e conexão ativa.

1. Registrar, antes: valores lidos da CAN, valor dos contadores semeados, quantidade de mensagens pendentes, APN/IP, ID, **e o estado das flags do script**.
2. Executar a limpeza da faixa declarada, **índice a índice**, como o app fará.
3. **Conferir os cinco itens que devem sobreviver**, um a um:

| Item | Esperado | Se não sobreviver |
|---|---|---|
| Contadores semeados | valor intacto | A faixa declarada invade a semeadura. Erro de cadastro, não de protocolo — alimenta a validação de publicação. |
| **Flags do script** | estado intacto | A faixa atravessou um índice de efeito colateral. **É o achado mais importante deste item**: documentar exatamente quais índices produzem esse efeito, por modelo e variante, porque é essa lista que vai para a matriz. |
| Buffer e LOG | contagem intacta | Documentar; deixa de ser inócuo e passa a exigir registro na evidência. |
| Configuração embarcada | 5 blocos, eventos e cercas conferem por read-back | O escopo é maior do que o requisito assume; a ferramenta volta para dentro de T09. |
| Conexão | APN, IP/DNS, ID e senha conferem | idem, com o agravante de derrubar o módulo. |

4. Confirmar que a **leitura recomeça vazia** e que uma nova leitura de T07 repopula os valores corretamente.
5. **Repetir de propósito com uma faixa mal declarada** — atravessando lacuna e índice de efeito colateral — e documentar o sintoma. Precisamos saber como o apagamento silencioso se manifesta para escrever a validação de cadastro e a mensagem de diagnóstico certas.
6. **Cortar a alimentação**, religar e reler contadores semeados — o reset não pode ter deslocado o contador para fora da faixa persistida em flash.
7. Repetir no VL08, cuja numeração de contadores tem lacunas e cujos comandos de estatística diferem do VL06.

#### B7 · Repouso do módulo durante a sessão de configuração

Deriva da lacuna **A7** de §10, já decidida: inibir o repouso enquanto a sessão viver e restaurar no encerramento. O que se mede é se a inibição e a **restauração** são confiáveis, e o que fazer quando não são.

1. Com ignição desligada e veículo parado, conectar e **parar de enviar comandos**. Cronometrar até o link cair.
2. Confirmar se o rádio de programação — cabo e BLE, separadamente — cai junto com o repouso.
3. Verificar se o aviso que o firmware emite antes de dormir é observável pelo app, e com quanta antecedência.
4. Elevar o parâmetro de ociosidade, repetir 1, e confirmar que a sessão sobrevive ao tempo típico de um checklist com fotos.
5. **Restaurar o parâmetro** e confirmar que o módulo volta ao comportamento de repouso original — a inibição não pode vazar da sessão para a operação.
6. Repetir no VL08.

#### B8 · Ordem de entrega × prazo do evento de teste

Deriva da lacuna A5 de §10, já decidida: o cronômetro dos 120 s só começa com o contador de pendências em zero. O que se mede não é mais o critério, é **quanto tempo a fila leva a drenar** — o número que vai para a matriz e define a expectativa de tempo em campo.

1. Carregar o buffer com uma quantidade conhecida de mensagens pendentes, sem rede.
2. Restabelecer a rede e, imediatamente, disparar o evento de teste.
3. Medir o tempo até a chegada no servidor, **nos dois modos de fila**.
4. Repetir com buffer vazio, para ter a linha de base.
5. Registrar o tamanho de buffer configurado e o modo em cada medição — os dois viram linha na matriz de capacidades.
6. Confirmar que o evento de apresentação de instalação chega com **todos** os campos que a Seção F confere, e que a plataforma consegue distinguí-lo de ocorrência de operação.

#### B9 · Módulo com senha divergente do cadastro

Deriva da lacuna A8 de §10, já decidida: uma causa em tela, causa nomeada no M2. O objetivo é decidir o **conteúdo do registro no M2** — a mensagem de campo não muda, e recuperar o módulo não está em escopo.

1. Trocar a senha do módulo para um valor que o cadastro não conhece.
2. Tentar cada operação de escrita pelo app: limpeza, envio de bloco, semeadura, reescrita de ID.
3. Registrar **exatamente** o que o módulo devolve — recusa explícita, silêncio, ou resposta ambígua. É isso que decide se o app pode distinguir "senha não confere" de "módulo não responde".
4. Repetir por cabo e por BLE, e no VL08 (senha de 4 dígitos contra 8).
5. Confirmar se existe **qualquer** caminho de recuperação fora do escopo de fábrica. Se não existir, o requisito fica como está: identifica, bloqueia, registra.

#### B10 · Ocupação da serial pelo gateway de CAN indutivo

Deriva da decisão E9 e da E4. É o item que fecha a matriz de ocupação de pinos.

1. Nas variantes VL06 **sem CAN física**, identificar por qual via o gateway indutivo entrega os dados — e se ela é a porta serial.
2. Com o gateway ligado, tentar operar um leitor RFID serial. Registrar o sintoma do conflito.
3. Com o gateway ligado, tentar programar por cabo. Registrar o sintoma.
4. Confirmar se o conflito existe **em operação** ou apenas durante a programação — é essa distinção que decide se a combinação é inviável ou só exige BLE.
5. Repetir com iButton no lugar do leitor serial, e com buzzer em saída.
6. Consolidar o resultado como **matriz de ocupação por variante**: quem pode coexistir com quem, em operação e em programação.
