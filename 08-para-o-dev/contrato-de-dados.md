# O contrato de dados

O [mock](../04-dados/mocks.js) define os dados consumidos pelo protótipo: nomes, formas, relações, critérios e condições de exemplo. Ele orienta o que os adaptadores de servidor, sincronização e módulo devem entregar às telas. Não é uma API de produção pronta: endpoints, transporte, autenticação e armazenamento pertencem às [integrações](integracoes.md).

Os valores são exemplos. O [gate de cobertura](../04-dados/gate-cobertura.js) recomputa as relações e âncoras desses exemplos, e [casos.md](../04-dados/casos.md) relaciona as condições do mundo aos estados desenhados. São **62 casos**, conferidos em 08/10/2026.

## O que cada tela lê

Principais coleções lidas diretamente pelas telas e seus auxiliares em [app/src/telas](../06-prototipo/app/src/telas/), conferidas em 08/10/2026. Todas também podem ler `casos`; horários e formatação usam as funções comuns do mock. A lista de casos abaixo destaca cenários relevantes, sem substituir o catálogo completo.

| Tela | Coleções | Exemplos de casos |
|---|---|---|
| T01 · Login | `credenciais`, `ddis`, `tecnico` | `outro-usuario`, `primeiro-acesso`, `sem-conexao-no-login`, `teto-de-envios`, `usuario-lembrado` |
| T02 · Selecionar contexto | `empresa`, `empresas`, `ucs`, `uos`, `pacotes`, `contextoAtivo` | `lista-longa-garagens`, `uma-empresa` |
| T03 · Sincronizar | `pacotes`, `uos`, `contextoAtivo` | `sync-falha-rede` |
| T04 · Menu | `ativos`, `checklist`, `empresa`, `empresas`, `modelos`, `modulos`, `pacotes`, `situacao`, `uos`, `contextoAtivo` | `link-perdido`, `sem-conexao-no-menu`, `fila-parada` |
| T05 · Conectar módulo | `modelos`, `modulos`, `naBuscaForaCadastro`, `situacao` | `bluetooth-desligado`, `bluetooth-sem-permissao`, `busca-vazia`, `conexao-falha`, `pareando`, `reconectando` |
| T07 · Diagnóstico do módulo | `diagnostico`, `ativos`, `cadeia`, `matrizCapacidades`, `modelos`, `modelosAtivo`, `modulos`, `situacao` | `serial-nao-cadastrado`, `modelo-sem-driver`, `firmware-fora-matriz`, `firmware-sem-rede-no-modulo`, `modem-sem-sinal`, `can-estatico-ausente`, `can-estatico-isolado`, `can-estatico-bateria`, `modulo-com-pendencias` |
| T06 · Selecionar ativo | `ativos`, `empresa`, `modelosAtivo`, `modulos`, `pacotes`, `uos`, `contextoAtivo` | `ativo-fora-pacote`, `conflito-pinos-sem-saida`, `modulo-em-outro-ativo`, `modulo-ja-deste-ativo` |
| T09 · Configurar módulo | `cadeia`, `ativos`, `conexoes`, `matrizCapacidades`, `modelosAtivo`, `modulos`, `presetsEvento` | `bloco-recusado`, `queda-na-cadeia`, `conteudo-nao-cabe`, `pool-esgotado`, `servidor-ainda-nao` |
| T10 · Calibração | `calibracao`, `ativos`, `matrizCapacidades`, `modulos` | `grandeza-indisponivel`, `releitura-nao-confere` |
| T14 · Ciclo de testes | `ciclo`, `checklist`, `identificadores`, `ativos`, `modelosAtivo` | `evento-sem-resposta`, `sem-leitor`, `motor-desligado-no-ciclo`, `evento-nao-chega-de-novo` |
| T13 · Checklist | `checklist`, `cadeia`, `calibracao`, `diagnostico`, `filaSaida`, `tiposFila`, `leituraNominalModulo`, `ativos`, `modelos`, `modelosAtivo`, `modulos`, `pacotes`, `contextoAtivo` | `can-estatico-bateria`, `diff-divergente`, `localizacao-negada`, `pronto-para-fechar`, `gps-fraco`, `entrada-ignicao`, `modem-sem-sinal` |
| T16 · Sessão | `cadeia`, `autotesteEncerramento`, `calibracao`, `ativos`, `modelos`, `modulos`, `contextoAtivo` | `autoteste-falhando`, `sessao-interrompida` |
| T15 · Fila de saída | `filaSaida`, `tiposFila`, `secaoF`, `criteriosRegra`, `ativos` | `fila-vazia` |
| T11 · Conferir configuração | `cadeia`, `conexoes`, `modelosAtivo`, `pacotes`, `presetsEvento`, `situacao`, `ativos` | `diff-divergente`, `cercas-reenviadas`, `indice-nao-classificado` |
| T12 · Últimas instalações | `instalacoes`, `criteriosRegra`, `diagnostico`, `calibracao`, `tecnico`, `ativos`, `contextoAtivo` | `criterio-indisponivel`, `criterio-pendente`, `instalacoes-sem-rede`, `instalacoes-vazia` |

As telas também consomem o [estado da sessão](../06-prototipo/app/src/estado/): vínculo, blocos confirmados, calibração, ciclo, fotos, respostas e registros. No produto, esses resultados precisam vir das operações reais e ser preservados conforme a regra de retomada; copiar só o mock não reproduz o percurso.

## De onde cada coleção viria no produto

| Coleção | Origem ou responsabilidade |
|---|---|
| `tecnico`, `credenciais`, `ddis` | acesso e recuperação de conta; o contato do cadastro nunca aparece em tela, nem mascarado |
| `empresa`, `empresas`, `ucs`, `uos`, `contextoAtivo` | empresas atendidas, unidades disponíveis e contexto escolhido |
| `pacotes` | sincronização da unidade: ativos, conexões, modelos, eventos e cercas; **sem cartões** ([decisão 45](../07-decisoes/45-o-pacote-sem-cartoes.md)) |
| `ativos`, `modelosAtivo`, `presetsEvento`, `conexoes`, `cercas` | cadastro da plataforma e conteúdo do pacote |
| `identificadores` | dados de exemplo dos identificadores; não integram o pacote nem são critério de comparação do cartão na T14 |
| `modulos`, `modelos`, `matrizCapacidades`, `seriaisForaCadastro`, `naBuscaForaCadastro` | cadastro, suporte dos modelos e informações anunciadas pelo módulo |
| `diagnostico`, `leituraNominalModulo`, `dominiosCan` | leituras do módulo e sinais do veículo, com a tradução do modelo |
| `cadeia` | limpeza e cinco blocos de configuração, sua ordem, conteúdo e escopos; cada gravação precisa de read-back |
| `calibracao` | grandezas aplicáveis por modelo, opcionais, fatores, tolerâncias e releitura |
| `ciclo` | prazo e conferência do evento; os passos aplicáveis derivam do modelo e dos itens da Seção E |
| `checklist` | catálogo de itens, fontes e condições de aplicação; o total da tela é calculado |
| `autotesteEncerramento` | sete assertivas do encerramento, com resultados contados em aprovadas, não se aplicam e pendentes |
| `instalacoes`, `criteriosRegra` | histórico e o que o servidor recebeu: posicionamento e eventos, sem viagem |
| `filaSaida`, `tiposFila`, `secaoF` | envios do aparelho, estados de cada envio e confirmação pendente |
| `situacao` | condições simuladas de rede, acesso e conexão; no produto, respostas do aparelho e das integrações |
| `casos` | ferramenta de demonstração e teste; não é coleção do produto |

## Contagens que dependem da sessão

O catálogo tem **30 itens**: A=4, B=5, C=4, D=10, E=5 e F=2. Isso não significa que toda instalação tenha 30. No herói atual são **28**: a foto do Painel não se aplica porque o ônibus não calibra, e `Pendências registradas` só aparece quando o ID foi reescrito. Leitor, rotação e bip também respeitam suas condições. Veja [T13](../02-telas/T13-checklist/tela.md) e a montagem em [checklist.js](../06-prototipo/app/src/telas/T13/checklist.js).

O pacote do herói tem **31 itens de sincronização**; esse total é outro conjunto e não deve ser usado para o checklist. A T14 do herói tem **quatro passos**, e a Seção E da T13 tem **cinco**, porque acrescenta o teste do bip. O cartão é conferido pelo técnico com o número impresso, sem comparar com o cadastro.

## Usar o gate na integração

Na raiz do repositório:

```bash
node 04-dados/gate-cobertura.js
```

O gate atual valida o mock e suas âncoras específicas. Para validar um pacote ou resposta de produção, adapte a entrada e conserve as verificações pertinentes ao contrato; não espere que dados reais repitam placas, quantidades e condições do exemplo.
