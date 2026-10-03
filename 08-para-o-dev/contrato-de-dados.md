# O contrato de dados

O `04-dados/mocks.js` é a obra que toda tela lê — e, por isso, **o formato que o servidor, o pacote de sincronização e o módulo vão ter de entregar**. Os valores são de mentira; os nomes, as formas e as relações entre as coleções, não. O `04-dados/gate-cobertura.js` confere essas relações (`node 04-dados/gate-cobertura.js` → *GATE APROVADO*), e o `04-dados/casos.md` diz que caso monta que estado.

## O que cada tela lê

Medido no código do protótipo (`06-prototipo/app/src/telas/<tela>/`), em 03/10. Um **caso** é uma condição do mundo (o módulo que não responde, a rede que cai) que monta um estado da tela.

| Tela | Lê do mock | Os casos que montam os estados dela |
|---|---|---|
| T01 · Login | `credenciais`, `ddis`, `tecnico` | `outro-usuario`, `primeiro-acesso`, `sem-conexao-no-login`, `teto-de-envios`, `usuario-lembrado` |
| T02 · Selecionar contexto | `empresa`, `empresas`, `ucs`, `uos`, `pacotes`, `contextoAtivo` | `lista-longa-garagens`, `uma-empresa` |
| T03 · Sincronizar | `pacotes`, `uos`, `contextoAtivo` | `sync-falha-rede` |
| T04 · Menu | `ativos`, `checklist`, `empresa`, `empresas`, `modelos`, `modulos`, `pacotes`, `situacao`, `uos`, `contextoAtivo` | `link-perdido`, `sem-conexao-no-menu` |
| T05 · Conectar módulo | `modelos`, `modulos`, `naBuscaForaCadastro`, `situacao` | `bluetooth-desligado`, `bluetooth-sem-permissao`, `busca-vazia`, `conexao-falha` |
| T07 · Diagnóstico do módulo | `diagnostico`, `ativos`, `cadeia`, `matrizCapacidades`, `modelos`, `modelosAtivo`, `modulos`, `situacao` | `serial-nao-cadastrado`, `modelo-sem-driver`, `firmware-fora-matriz`, `firmware-sem-rede-no-modulo`, `modem-sem-sinal`, `can-estatico-ausente`, `can-estatico-isolado` |
| T06 · Selecionar ativo | `ativos`, `empresa`, `matrizCapacidades`, `modelosAtivo`, `modulos`, `pacotes`, `uos`, `contextoAtivo` | `ativo-fora-pacote`, `conflito-pinos-resolvivel`, `conflito-pinos-sem-saida`, `modulo-em-outro-ativo`, `modulo-ja-deste-ativo` |
| T09 · Configurar módulo | `cadeia`, `ativos`, `conexoes`, `matrizCapacidades`, `modelosAtivo`, `modulos`, `presetsEvento` | `bloco-recusado`, `queda-na-cadeia`, `conteudo-nao-cabe`, `pool-esgotado` |
| T10 · Calibração | `calibracao`, `ativos`, `matrizCapacidades`, `modulos` | `grandeza-indisponivel`, `releitura-nao-confere` |
| T14 · Ciclo de testes | `ciclo`, `checklist`, `identificadores`, `ativos`, `modelosAtivo` | `evento-sem-resposta`, `identificador-divergente`, `motor-desligado-no-ciclo` |
| T13 · Checklist | `checklist`, `cadeia`, `calibracao`, `autotesteEncerramento`, `filaSaida`, `leituraNominalModulo`, `ativos`, `modelosAtivo`, `modulos` | `can-estatico-bateria`, `diff-divergente`, `localizacao-negada`, `pronto-para-fechar` |
| T16 · Sessão | `cadeia`, `autotesteEncerramento`, `calibracao`, `identificadores`, `ativos`, `modelos`, `modulos`, `contextoAtivo` | `autoteste-falhando`, `sessao-interrompida` |
| T15 · Fila de saída | `filaSaida`, `tiposFila`, `secaoF`, `criteriosRegra`, `ativos` | `fila-vazia` |
| T11 · Conferir configuração | `cadeia`, `conexoes`, `modelosAtivo`, `modulos`, `pacotes`, `presetsEvento`, `situacao`, `ativos` | `cercas-reenviadas`, `indice-nao-classificado` |
| T12 · Últimas instalações | `instalacoes`, `criteriosRegra`, `diagnostico`, `calibracao`, `tecnico`, `ativos`, `contextoAtivo` | `criterio-indisponivel`, `criterio-pendente`, `instalacoes-sem-rede` |

## De onde cada coleção viria no produto

| Coleção do mock | No produto |
|---|---|
| `tecnico`, `credenciais`, `ddis` | o login e a recuperação de acesso (o servidor) |
| `empresa`, `empresas`, `ucs`, `uos`, `contextoAtivo` | quem o técnico atende, e onde está hoje |
| `pacotes` (com o `contem` contado das coleções) | o pacote de sincronização da unidade — ativos, conexões, modelos, eventos e cercas, **sem cartões** (decisão 45) |
| `ativos`, `modelosAtivo`, `presetsEvento`, `conexoes`, `cercas`, `identificadores` | o cadastro da plataforma, que viaja no pacote |
| `modulos`, `modelos`, `matrizCapacidades`, `seriaisForaCadastro`, `naBuscaForaCadastro` | o cadastro dos módulos e o que cada modelo suporta — e o que o módulo informa na busca |
| `diagnostico`, `leituraNominalModulo`, `dominiosCan` | o que o módulo e a CAN respondem na leitura |
| `cadeia` (a ordem dos 6 blocos, o `conteudo`, os escopos da limpeza) | o que se grava no módulo, e como se confere (read-back) |
| `calibracao`, `ciclo`, `checklist`, `autotesteEncerramento` | as regras da calibração, do ciclo de testes, do checklist de 31 itens e do autoteste |
| `instalacoes`, `criteriosRegra`, `filaSaida`, `tiposFila`, `secaoF` | o histórico de instalações, o que o servidor recebeu, e a fila de envio do aparelho |
| `situacao` | o mundo do aparelho: a rede, o Bluetooth, os módulos por perto |
| `casos` | não existe no produto: são as condições do mundo que o protótipo encena (veja `testes-prontos.md`) |
