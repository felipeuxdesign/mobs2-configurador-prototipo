# Os casos do mock

Cada caso de `mocks.js` → a tela e o estado que ele produz. **O estado se monta pelo caso — nunca desenhando o estado na mão.**

| Caso | Onde aparece |
|---|---|
| `ativo-fora-pacote` | `T06/04-estado-fora-do-pacote` |
| `autoteste-falhando` | `T16/05-estado-assertiva-falhando` |
| `bloco-recusado` | `T09/01-estado-bloco-recusado` |
| `busca-vazia` | `T05/03-estado-nenhum-encontrado` |
| `can-estatico-ausente` | `T07/02-estado-sem-leitura` |
| `can-estatico-dominio` | `T07/03-estado-dominio-mudo` |
| `can-estatico-isolado` | `T07/01-estado-fora-da-faixa` |
| `can-fora-esperado` | `T13/09-estado-item-reprovado` · `T14/03-estado-dinamico-fora-do-esperado` |
| `canal-aberto` | `T05/13-estado-pre-checagem-canal-aberto-e-pendencias` |
| `conexao-falha` | `T05/04-estado-conexao-falhou` |
| `conflito-pinos-resolvivel` | `T06/05-estado-conflito-de-pinos-resolvivel` |
| `conflito-pinos-sem-saida` | `T06/06-estado-conflito-de-pinos-sem-saida` |
| `conteudo-nao-cabe` | `T05/11-estado-pre-checagem-conteudo-nao-cabe` |
| `diff-divergente` | `T11/02-momento-tudo-confere` |
| `divergencia-chassi` | `T06/02-estado-chassi-divergente` |
| `evento-sem-resposta` | `T14/02-estado-prazo-estourado` |
| `firmware-fora-matriz` | `T05/08-estado-pre-checagem-firmware-fora-da-matriz` · `T05/09-estado-firmware-fora-sem-rede-no-modulo` · `T05/10-momento-atualizando-o-firmware` |
| `grandeza-indisponivel` | `T10/04-estado-modulo-sem-pulsos` |
| `i-01` | `T12/01-momento-detalhe-da-instalacao` |
| `identificador-divergente` | `T14/04-estado-identificador-divergente` |
| `indice-nao-classificado` | `T11/01-estado-conteudo-que-o-app-nao-reconhece` |
| `instalacoes-sem-rede` | `T12/03-estado-sem-rede` |
| `link-perdido` | `T04/03-estado-faixa-modulo-com-falha` · `T05/14-estado-pre-checagem-link-perdido-na-6a` |
| `ma-02` | `T06/03-estado-sem-chassi-na-can` · `T10/02-estado-rotacao-caminhao-coletor` |
| `modelo-sem-driver` | `T05/07-estado-pre-checagem-modelo-sem-driver` |
| `modulo-em-repouso` | `T05/15-estado-pre-checagem-modulo-em-repouso-na-9a` |
| `pac-uo-02` | `T03/03-estado-pacote-de-4-dias` |
| `pac-uo-03` | `T03/04-estado-pacote-vencido` |
| `pool-esgotado` | `T05/12-estado-pre-checagem-pool-de-cercas-esgotado` |
| `queda-na-cadeia` | `T09/02-estado-queda-na-cadeia` |
| `serial-nao-cadastrado` | `T05/06-estado-pre-checagem-serial-nao-cadastrado` |
| `sessao-interrompida` | `T16/06-estado-sessao-interrompida` |
| `sync-falha-rede` | `T03/01-estado-falha-de-rede` |

Os estados sem caso próprio nascem de um dado do mock — por exemplo, o caminhão KNB-5H39 sem chassi vem de `modelosAtivo` ma-02 com `chassiPelaCan: false`. O `estados.md` de cada tela diz de onde vem cada um.
