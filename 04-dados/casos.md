# Os casos do mock

Cada caso de `mocks.js` → a tela e o estado que ele produz. **O estado se monta pelo caso — nunca desenhando o estado na mão.**

| Caso | Onde aparece |
|---|---|
| `a-01` | `T04/11-momento-folha-ativo-da-sessao` · `T10/05-momento-hodometro-digitado` · `T10/08-momento-horimetro` |
| `ativo-fora-pacote` | `T06/04-estado-fora-do-pacote` |
| `autoteste-falhando` | `T16/05-estado-assertiva-falhando` |
| `bloco-recusado` | `T09/01-estado-bloco-recusado` |
| `bluetooth-desligado` | `T05/16-estado-bluetooth-desligado` |
| `bluetooth-sem-permissao` | `T05/17-estado-bluetooth-sem-permissao` |
| `busca-vazia` | `T05/03-estado-nenhum-encontrado` |
| `camera-sem-permissao` | `T10/11-estado-camera-sem-permissao` |
| `can-estatico-ausente` | `T07/02-estado-sem-leitura` |
| `can-estatico-dominio` | `T07/03-estado-dominio-mudo` |
| `can-estatico-isolado` | `T07/01-estado-fora-da-faixa` |
| `can-fora-esperado` | `T13/09-estado-item-reprovado` · `T14/03-estado-dinamico-fora-do-esperado` |
| `canal-aberto` | `T05/13-estado-pre-checagem-canal-aberto-e-pendencias` |
| `conexao-falha` | `T05/04-estado-conexao-falhou` |
| `conflito-pinos-resolvivel` | `T06/05-estado-conflito-de-pinos-resolvivel` |
| `conflito-pinos-sem-saida` | `T06/06-estado-conflito-de-pinos-sem-saida` |
| `conteudo-nao-cabe` | `T05/11-estado-pre-checagem-conteudo-nao-cabe` |
| `criterio-indisponivel` | `T12/04-estado-criterio-indisponivel` |
| `criterio-pendente` | `T12/05-estado-criterio-pendente` |
| `diff-divergente` | `T11/02-momento-tudo-confere` |
| `divergencia-chassi` | `T06/02-estado-chassi-divergente` · `T06/07-momento-correcao-solicitada` |
| `evento-sem-resposta` | `T14/02-estado-prazo-estourado` |
| `firmware-fora-matriz` | `T05/08-estado-pre-checagem-firmware-fora-da-matriz` · `T05/09-estado-firmware-fora-sem-rede-no-modulo` · `T05/10-momento-atualizando-o-firmware` |
| `firmware-fora-sem-rede` | `T05/09-estado-firmware-fora-sem-rede-no-modulo` (por cima do `firmware-fora-matriz`, o mesmo par) |
| `grandeza-indisponivel` | `T10/04-estado-modulo-sem-pulsos` |
| `i-01` | `T12/01-momento-detalhe-da-instalacao` |
| `identificador-divergente` | `T14/04-estado-identificador-divergente` · `T14/06-momento-correcao-solicitada` |
| `indice-nao-classificado` | `T11/01-estado-conteudo-que-o-app-nao-reconhece` |
| `instalacoes-sem-rede` | `T12/03-estado-sem-rede` |
| `link-perdido` | `T04/03-estado-faixa-modulo-com-falha` · `T05/14-estado-pre-checagem-link-perdido-na-6a` |
| `lista-longa-garagens` | `T02/02-estado-lista-longa-com-busca` · `T02/03-momento-busca-sem-resultado` · `T02/04-momento-busca-esconde-a-escolha` |
| `localizacao-negada` | `T13/14-estado-homologado-sem-localizacao` |
| `ma-02` | `T06/03-estado-sem-chassi-na-can` · `T10/02-estado-rotacao-caminhao-coletor` |
| `modelo-sem-driver` | `T05/07-estado-pre-checagem-modelo-sem-driver` |
| `modulo-com-pendencias` | `T05/13-estado-pre-checagem-canal-aberto-e-pendencias` (por cima do `canal-aberto`, o mesmo módulo) |
| `modulo-em-repouso` | `T05/15-estado-pre-checagem-modulo-em-repouso-na-9a` |
| `outro-usuario` | `T01/18-estado-outro-usuario-no-aparelho` |
| `pac-uo-02` | `T03/03-estado-pacote-de-4-dias` |
| `pac-uo-03` | `T03/04-estado-pacote-vencido` |
| `pool-esgotado` | `T05/12-estado-pre-checagem-pool-de-cercas-esgotado` |
| `primeiro-acesso` | `T01/15-estado-primeiro-acesso` |
| `queda-na-cadeia` | `T09/02-estado-queda-na-cadeia` |
| `releitura-nao-confere` | `T10/10-estado-releitura-nao-confere` |
| `sem-conexao-no-login` | `T01/14-estado-login-sem-conexao` |
| `serial-nao-cadastrado` | `T05/06-estado-pre-checagem-serial-nao-cadastrado` |
| `sessao-interrompida` | `T16/06-estado-sessao-interrompida` |
| `sync-falha-rede` | `T03/01-estado-falha-de-rede` |
| `teto-de-envios` | `T01/17-estado-teto-de-envios` |
| `usuario-lembrado` | `T01/16-estado-usuario-lembrado` |
| `varias-empresas` | `T02/05-estado-escolher-a-empresa` · `T02/06-estado-unidades-com-trocar-empresa` · `T04/14-estado-folha-trocar-de-unidade-com-empresa` |
| `versao-ilegivel` | `T11/04-estado-versao-ilegivel` |

Os estados sem caso próprio nascem de um dado do mock — por exemplo, o caminhão KNB-5H39 sem chassi vem de `modelosAtivo` ma-02 com `chassiPelaCan: false`. O `estados.md` de cada tela diz de onde vem cada um. O caso `fila-vazia` dá a hora do último envio da fila vazia (T15/03 e T15/04).
