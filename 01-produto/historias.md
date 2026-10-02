# As 109 histórias de usuário

Cada uma aponta pra pasta da tela que a atende — lá, a ficha, os estados e a referência. **É daqui que as fichas das telas tiram as histórias**; o `dominio.md` §5 espelha esta lista.


## T01 · Login · `02-telas/T01-login/`

- **HU-T01-1** — Entro com usuário e senha; erro não distingue usuário inexistente de senha errada
- **HU-T01-2** — Com sessão válida e sem rede, o app abre direto na home
- **HU-T01-3** — Lembrar meu usuário desmarcado por padrão, guarda só o identificador, limpável no campo
- **HU-T01-4** — Outro usuário descarta a sessão anterior; a fila do anterior é preservada e continua subindo
- **HU-T01-5** — Recupero senha escolhendo canal (e-mail/telefone), com validação local antes de gastar rede
- **HU-T01-6** — Máscara de telefone derivada do DDI, não fixa; trocar DDI reaplica e avisa
- **HU-T01-7** — Digito código de 6 dígitos · 10 min · 3 tentativas · reenvio após 60 s · teto 3/hora
- **HU-T01-8** — Não recebi o código com 3 saídas: conferir e reenviar · trocar canal · acionar gestor · **mudou em 2026-09-24: o PM retirou o *acionar gestor* — ficam duas saídas, conferir e reenviar e trocar de canal · decisão 32**
- **HU-T01-9** — Eu crio a senha nova; os 6 requisitos ficam visíveis desde o início e marcam sozinhos
- **HU-T01-10** — Modal diz "senha alterada", sem botão fechar; a troca encerra sessões em outros aparelhos
- **HU-T01-11** — A sessão de acesso não expira por inatividade; só por Sair ou pelos 7 dias, com aviso no 5º
- **HU-T01-12** — Sair tem tela própria: mostra sessão de configuração aberta, itens na fila e o que sobrevive

## T02 · Selecionar contexto · `02-telas/T02-selecionar-contexto/`

- **HU-T02-1** — Vejo empresas/UC/UO que tenho permissão, com busca quando a lista for longa
- **HU-T02-2** — Troco de contexto a qualquer momento pelo cabeçalho; o contexto ativo fica sempre visível
- **HU-T02-3** — Trocar com módulo conectado avisa que a sessão de configuração encerra, e pede confirmação
- **HU-T02-4** — Trocar com envio em andamento é bloqueado até concluir ou abortar

## T03 · Sincronizar · `02-telas/T03-sincronizar/`

- **HU-T03-1** — Vejo progresso, volume e tempo estimado; sincronização é incremental por versão
- **HU-T03-2** — Falha de rede mostra erro com Reconectar, sem perder progresso parcial
- **HU-T03-3** — A versão do manifesto é gravada em toda evidência
- **HU-T03-4** — Pacote > 7 dias bloqueia; a partir de 3 avisa sem bloquear. Idade conta do carimbo do servidor

## T04 · Menu · `02-telas/T04-menu/`

- **HU-T04-1** — Vejo o semáforo do módulo no topo e a faixa de sessão acima dele
- **HU-T04-2** — Vejo as ferramentas; as que dependem de módulo ou ativo ficam desabilitadas com o motivo
- **HU-T04-3** — A fila mostra o contador de pendentes no próprio cartão, sem abrir
- **HU-T04-4** — Checklist pendente aparece como aviso persistente
- **HU-T04-5** — Não existe console de log. Cada ferramenta reporta estado em linguagem de campo
- **HU-T04-6** — Sem rede, o menu continua de pé; só as últimas instalações esperam a conexão

## T05 · Conectar módulo · `02-telas/T05-conectar-modulo/`

- **HU-T05-1** — Busco dispositivos (sem fio ou cabo, conforme a variante); vazio explica alimentação, cabo, distância
- **HU-T05-2** — Conectar só conecta: a sessão abre, a faixa desce, e o diagnóstico vem em seguida
- **HU-T05-3** — Falha de comunicação mostra uma causa única com 3 coisas a checar: cabo, alimentação, cadastro
- **HU-T05-4** — Perda de link mostra Reconectar e preserva o estado da etapa
- **HU-T05-5** — Bluetooth desligado ou sem permissão: o app diz o que fazer antes de procurar

No protótipo (decisão 44), a HU-T05-2: a sessão nasce na conexão, mas **a faixa desce na T07**, quando as sete linhas do módulo passam sem trava — é o que as referências desenham. Numa trava, o módulo fica em cima do título, sem faixa.

## T06 · Selecionar ativo · `02-telas/T06-selecionar-ativo/`

- **HU-T06-1** — Busco por placa, frota ou módulo; vejo o modelo do ativo
- **HU-T06-2** — Confirmo o vínculo vendo placa, frota, fabricante e modelo — sem chassi
- **HU-T06-3** — Se o módulo já está em outro ativo, o app avisa; vincular aqui desfaz o vínculo antigo e registra o desvínculo
- **HU-T06-4** — Se o módulo já é deste ativo, é manutenção: o vínculo decide o modo, e eu não preciso escolher
- **HU-T06-5** — Ativo fora do pacote trava, sem oferecer solicitar cadastro
- **HU-T06-6** — A matriz de ocupação de pinos roda aqui; conflito resolvível oferece o leitor sem fio no lugar
- **HU-T06-7** — Conflito sem saída é nomeado como incompatibilidade e escalonado — não há reordenação que resolva
- **HU-T06-8** — Cada linha do arnês é nomeada por cor e função

## T07 · Diagnóstico do módulo · `02-telas/T07-diagnostico-do-modulo/`

- **HU-T07-1** — Logo depois de conectar, vejo o módulo: serial, firmware, alimentação, GPS, entradas, modem e SIM
- **HU-T07-2** — Serial fora do cadastro, modelo sem suporte e firmware não homologado travam — cada um com a sua mensagem
- **HU-T07-3** — Firmware não homologado oferece atualizar quando o módulo tem rede; sem rede, o app grava só a conexão, e então atualiza
- **HU-T07-4** — O resto só informa, com o ícone de informação: eu sigo, e o checklist registra
- **HU-T07-5** — A CAN aparece depois que o bloco do ativo é gravado, com a lista do modelo; sinal sem leitura ou fora do esperado aparece na própria linha
- **HU-T07-6** — Ler de novo relê a CAN inteira

## T09 · Configurar módulo · `02-telas/T09-configurar-modulo/`

- **HU-T09-1** — Na instalação nova, vejo o que vai ser gravado antes de gravar: todos os blocos, obrigatórios
- **HU-T09-2** — A pré-condição de ocupação de pinos é a primeira linha; o espaço no módulo, calculado sobre o que vai ser gravado, é a segunda
- **HU-T09-3** — A limpeza vem primeiro e diz o que apaga e o que preserva — e apaga só a parte dos blocos que vão ser gravados
- **HU-T09-4** — Se a configuração não cabe, ou as cercas passam do limite do módulo, a gravação não começa, e o app me manda procurar outro módulo
- **HU-T09-5** — Na manutenção, escolho um bloco e reenvio só ele
- **HU-T09-6** — Cada bloco só inicia com o anterior confirmado por read-back
- **HU-T09-7** — Falha interrompe, nomeia a etapa em linguagem de campo e oferece repetir a etapa
- **HU-T09-8** — Queda no meio: retomo do mesmo bloco, de forma idempotente
- **HU-T09-9** — Ao final, read-back consolidado dos parâmetros críticos
- **HU-T09-10** — Nova instalação é transação inteira — abortar mantém na tela de recuperação até Conexão gravar

## T10 · Calibração · `02-telas/T10-calibracao/`

- **HU-T10-1** — Vejo só as grandezas calibráveis para este ativo × módulo, com justificativa quando indisponível
- **HU-T10-2** — RPM/velocidade: informo o valor que leio no painel; o módulo calcula o fator
- **HU-T10-3** — Hodômetro/horímetro: digito o valor do painel; o app converte a unidade
- **HU-T10-4** — O horímetro só aparece quando o modelo tem, e é opcional: posso pular
- **HU-T10-5** — O read-back tolera granularidade + tempo decorrido, na unidade do reporte
- **HU-T10-6** — Releitura obrigatória antes do ciclo de testes
- **HU-T10-7** — Recalibrar em manutenção recalcula o offset, não acumula
- **HU-T10-8** — Quem escolhe pulso ou GPS é o cadastro do modelo de ativo, não eu

## T11 · Conferir configuração · `02-telas/T11-conferir-configuracao/`

- **HU-T11-1** — A conferência compara o conteúdo de cada bloco — o módulo não guarda versão
- **HU-T11-2** — Vejo as cercas, em regiões, a APN, os eventos e o leitor, cada um com o que está no módulo e no cadastro
- **HU-T11-3** — O Extended ID — os cartões e iButtons gravados no módulo — aparece só pra leitura
- **HU-T11-4** — Corrigir reenvia um bloco por vez: o primeiro que diverge, na ordem da cadeia
- **HU-T11-5** — Depois de reenviar um bloco, os que dependem dele ficam marcados *revisar em seguida*
- **HU-T11-6** — As outras ações dizem o efeito: reenviar os 5 blocos ou apenas registrar o diagnóstico
- **HU-T11-7** — Índice que o firmware cria sozinho não é divergência; sem lista, vai para *não classificados*
- **HU-T11-8** — Escopo fixo em limpeza de configuração — limpeza total não é oferecida aqui
- **HU-T11-9** — Configuração conforme é declarada explicitamente; o diff sobe mesmo sem reenvio

## T12 · Últimas instalações · `02-telas/T12-ultimas-instalacoes/`

- **HU-T12-1** — Vejo por ativo: última intervenção, posicionamento, eventos e status geral
- **HU-T12-2** — A janela de posicionamento é derivada do pacote (`3 × intervalo + 2 min`), não fixa
- **HU-T12-3** — Os 10 min aparecem como teto de espera, não como critério
- **HU-T12-4** — Critério sem parâmetro declarado fica indisponível com motivo
- **HU-T12-5** — Offline mostro o último resultado conhecido com a data da consulta
- **HU-T12-6** — Falha por rede vira pendente com re-checagem por 24 h, não reprovação imediata

## T13 · Checklist · `02-telas/T13-checklist/`

- **HU-T13-1** — Itens automáticos não são marcáveis à mão; "marcar todos" só nos manuais sem foto
- **HU-T13-2** — Item automático reprovado mostra o motivo e leva direto à tela que corrige
- **HU-T13-3** — Vejo progresso separado por seção e por tipo
- **HU-T13-4** — Posso responder manual como não conforme com justificativa → marca ressalvada, não bloqueia
- **HU-T13-5** — Finalizar exige 100% dos automáticos de A, C, D e 100% dos manuais com foto
- **HU-T13-6** — A Seção F não bloqueia; finalizar com ela falhando exige ciência marcada, com nome e hora
- **HU-T13-7** — Finalizado gera o relatório com seriais, resultados, fotos, geolocalização e técnico
- **HU-T13-8** — A Seção E não é respondida aqui — item faltante me devolve ao ciclo de testes
- **HU-T13-9** — A foto do painel é tirada aqui, na Seção B — obrigatória quando houve calibração

## T14 · Ciclo de testes · `02-telas/T14-ciclo-dinamico/`

- **HU-T14-1** — Com a ignição ligada e o ônibus parado, o ciclo prova a rotação, as entradas, o cartão e o evento de teste
- **HU-T14-2** — Disparo o evento de teste por botão, com o cronômetro dos 120 s em destaque
- **HU-T14-3** — Antes do cronômetro vejo a fila do módulo drenando; o botão fica indisponível com motivo
- **HU-T14-4** — Vejo 3 linhas de estado: disparado · recebido · campos conferidos. E posso disparar novamente
- **HU-T14-5** — No teste do identificador vejo o código lido ao lado do esperado, em formato de negócio
- **HU-T14-6** — Divergindo, a tela oferece solicitar correção de cadastro já com os dois valores anexados
- **HU-T14-7** — Vejo o tempo decorrido e o que ainda falta capturar; encerrar leva direto ao checklist
- **HU-T14-8** — A velocidade só entra no ciclo quando o ônibus tem tacógrafo digital

## T15 · Fila de saída · `02-telas/T15-fila-de-saida/`

- **HU-T15-1** — Vejo por item: tipo, ativo, item de checklist, tamanho e progresso do corrente
- **HU-T15-2** — Sair da tela não interrompe o envio; a home mantém o contador
- **HU-T15-3** — Cada erro nomeia causa e ação; recusa do servidor nunca fica em retentativa silenciosa
- **HU-T15-4** — Fila vazia é declarada, com o horário do último envio
- **HU-T15-5** — A Seção F em re-checagem aparece em seção separada — não é item de fila
- **HU-T15-6** — Recebo notificação local quando a fila fica parada além do limite

## T16 · Sessão · `02-telas/T16-sessao/`

- **HU-T16-1** — A faixa fica no topo de toda tela: abertura, módulo, tempo decorrido e a única saída
- **HU-T16-2** — Enquanto a sessão vive: canal reaberto sozinho, módulo e ativo travados, repouso inibido
- **HU-T16-3** — O encerramento executa 8 passos e mostra cada um
- **HU-T16-4** — Vejo o autoteste assertiva por assertiva, com o valor lido — nunca um "OK" agregado
- **HU-T16-5** — Falha do autoteste bloqueia a homologação, não o encerramento
- **HU-T16-6** — Sessão interrompida é oferecida de volta, com o ponto de retomada
- **HU-T16-7** — Descartar não desfaz o que foi gravado — descarta a intenção, e isso é registrado
- **HU-T16-8** — Canal aberto por sessão anterior é anomalia: o app fecha antes de começar
