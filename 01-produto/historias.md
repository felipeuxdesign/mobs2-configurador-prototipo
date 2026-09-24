# As 107 histórias de usuário

Tiradas do `dominio.md` §5. Cada uma aponta pra pasta da tela que a atende — lá, a ficha, os estados e a referência.


## T01 · Login · `02-telas/T01-login/`

- **HU-T01-1** — Entro com usuário e senha; erro não distingue usuário inexistente de senha errada
- **HU-T01-2** — Com sessão válida e sem rede, o app abre direto na home
- **HU-T01-3** — Lembrar meu usuário desmarcado por padrão, guarda só o identificador, limpável no campo
- **HU-T01-4** — Outro usuário descarta a sessão anterior; a fila do anterior é preservada e continua subindo
- **HU-T01-5** — Recupero senha escolhendo canal (e-mail/telefone), com validação local antes de gastar rede
- **HU-T01-6** — Máscara de telefone derivada do DDI, não fixa; trocar DDI reaplica e avisa
- **HU-T01-7** — Digito código de 6 dígitos · 10 min · 3 tentativas · reenvio após 60 s · teto 3/hora
- **HU-T01-8** — Não recebi o código com 3 saídas: conferir e reenviar · trocar canal · acionar gestor
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
- **HU-T04-2** — Vejo 10 ferramentas; as que dependem de módulo ou ativo ficam desabilitadas com o motivo
- **HU-T04-3** — A fila mostra o contador de pendentes no próprio cartão, sem abrir
- **HU-T04-4** — Checklist pendente aparece como aviso persistente
- **HU-T04-5** — Não existe console de log. Cada ferramenta reporta estado em linguagem de campo

## T05 · Conectar módulo · `02-telas/T05-conectar-modulo/`

- **HU-T05-1** — Busco dispositivos (sem fio ou cabo, conforme a variante); vazio explica alimentação, cabo, distância
- **HU-T05-2** — Ao conectar, a pré-checagem roda sozinha e mostra cada item com resultado
- **HU-T05-3** — Serial não cadastrado e modelo sem driver são dois estados com mensagens distintas
- **HU-T05-4** — Falha de comunicação mostra uma causa única com 3 coisas a checar: cabo, alimentação, cadastro
- **HU-T05-5** — Firmware incompatível: com conectividade oferece atualizar; sem, grava Conexão isolado e então oferece
- **HU-T05-6** — Após atualizar, o app relê capacidades e reinicia a pré-checagem
- **HU-T05-7** — Vejo pendências do módulo e estado do modem como informação — não bloqueiam nada
- **HU-T05-8** — Conexão bem-sucedida abre a sessão de configuração
- **HU-T05-9** — Perda de link mostra Reconectar e preserva o estado da etapa. Queda por repouso não é erro

## T06 · Selecionar ativo · `02-telas/T06-selecionar-ativo/`

- **HU-T06-1** — Busco por placa, frota ou identificador; vejo modelo do ativo e módulo esperado
- **HU-T06-2** — Quando o ativo trafega chassi pela CAN, o app lê e compara — divergência bloqueia
- **HU-T06-3** — Sem chassi na CAN, o vínculo é confirmação explícita minha, registrada na evidência
- **HU-T06-4** — Ativo fora do pacote trava, sem oferecer solicitar cadastro
- **HU-T06-5** — A matriz de ocupação de pinos roda aqui; conflito resolvível oferece reconectar sem fio no lugar
- **HU-T06-6** — Conflito sem saída é nomeado como incompatibilidade e escalonado — não há reordenação que resolva
- **HU-T06-7** — Cada linha do arnês é nomeada por cor e função

## T07 · Dados da CAN · `02-telas/T07-dados-da-can/`

- **HU-T07-1** — Vejo sinais por domínio, cada um com valor lido · esperado · semáforo
- **HU-T07-2** — Sinal fora do esperado traz causa provável: ligação, barramento, modelo incorreto
- **HU-T07-3** — Sinais dinâmicos aparecem como *aguardando o ciclo dinâmico* — não aprováveis aqui

## T08 · Refazer leitura da CAN · `02-telas/T08-refazer-leitura/`

- **HU-T08-1** — Apago só os valores lidos da CAN, para reconferir do zero
- **HU-T08-2** — A tela declara o que apaga e o que preserva, em linguagem de campo, antes de executar
- **HU-T08-3** — Após o reset, o app relê e me devolve a T07 com a leitura em branco
- **HU-T08-4** — Sem mapa declarado, a ferramenta fica indisponível com motivo — o app não chuta índice

## T09 · Configurar módulo · `02-telas/T09-configurar-modulo/`

- **HU-T09-1** — Disparo e acompanho; não escolho conteúdo nem bloco
- **HU-T09-2** — A pré-condição de ocupação de pinos é a primeira linha da tela
- **HU-T09-3** — O bloco 1 declara o escopo e o que apaga/preserva. Sem confirmação em dois passos
- **HU-T09-4** — Cada bloco só inicia com o anterior confirmado por read-back
- **HU-T09-5** — Falha interrompe, nomeia a etapa em linguagem de campo e oferece repetir a etapa
- **HU-T09-6** — Queda no meio: retomo do mesmo bloco, de forma idempotente
- **HU-T09-7** — Ao final, read-back consolidado dos parâmetros críticos
- **HU-T09-8** — A versão dos 5 blocos é gravada como string composta após o read-back de cada bloco
- **HU-T09-9** — Nova instalação é transação inteira — abortar mantém na tela de recuperação até Conexão gravar

## T10 · Calibração · `02-telas/T10-calibracao/`

- **HU-T10-1** — Vejo só as grandezas calibráveis para este ativo × módulo, com justificativa quando indisponível
- **HU-T10-2** — RPM/velocidade: informo o valor que leio no painel; o módulo calcula o fator
- **HU-T10-3** — Hodômetro/horímetro: digito o valor do painel e fotografo; o app converte a unidade
- **HU-T10-4** — A foto do painel satisfaz também a Seção B, com a origem visível na linha
- **HU-T10-5** — O read-back tolera granularidade + tempo decorrido, na unidade do reporte
- **HU-T10-6** — Releitura obrigatória antes do ciclo dinâmico
- **HU-T10-7** — Recalibrar em manutenção recalcula o offset, não acumula
- **HU-T10-8** — Quem escolhe pulso ou GPS é o cadastro do modelo de ativo, não eu

## T11 · Conferir configuração · `02-telas/T11-conferir-configuracao/`

- **HU-T11-1** — O app lê a string de versão como primeiro passo; ausente ou ilegível roda diff completo por conteúdo
- **HU-T11-2** — Vejo divergências agrupadas por bloco, em linguagem de negócio
- **HU-T11-3** — Escolho entre 3 ações nomeadas pelo efeito, incluindo *apenas registrar o diagnóstico*
- **HU-T11-4** — Corrigir arrasta as dependências automaticamente, na ordem canônica
- **HU-T11-5** — Índice que o firmware cria sozinho não é divergência; sem lista, vai para *não classificados*
- **HU-T11-6** — Escopo fixo em limpeza de configuração — limpeza total não é oferecida aqui
- **HU-T11-7** — Configuração conforme é declarada explicitamente; o diff sobe mesmo sem reenvio

## T12 · Últimas instalações · `02-telas/T12-ultimas-instalacoes/`

- **HU-T12-1** — Vejo por ativo: última intervenção, posicionamento, eventos, viagens e status geral
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
- **HU-T13-7** — Finalizado gera o relatório com seriais, versões, resultados, fotos, geolocalização e técnico
- **HU-T13-8** — A Seção E não é respondida aqui — item faltante me devolve ao ciclo dinâmico

## T14 · Ciclo dinâmico · `02-telas/T14-ciclo-dinamico/`

- **HU-T14-1** — Um deslocamento alimenta 4 blocos: CAN dinâmica · Seção E · evento de teste · viagem
- **HU-T14-2** — Disparo o evento de teste por botão, com o cronômetro dos 120 s em destaque
- **HU-T14-3** — Antes do cronômetro vejo a fila do módulo drenando; o botão fica indisponível com motivo
- **HU-T14-4** — Vejo 3 linhas de estado: disparado · recebido · campos conferidos. E posso disparar novamente
- **HU-T14-5** — No teste do identificador vejo o código lido ao lado do esperado, em formato de negócio
- **HU-T14-6** — Divergindo, a tela oferece solicitar correção de cadastro já com os dois valores anexados
- **HU-T14-7** — Vejo o tempo decorrido e o que ainda falta capturar; encerrar leva direto ao checklist

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
