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
| `can-estatico-ausente` | `T07/08-estado-sinal-da-can-sem-leitura` |
| `can-estatico-isolado` | `T07/09-estado-sinal-da-can-fora-do-esperado` |
| `can-fora-esperado` | `T13/09-estado-item-reprovado` · `T14/03-estado-dinamico-fora-do-esperado` |
| `conexao-falha` | `T05/04-estado-conexao-falhou` |
| `conflito-pinos-resolvivel` | `T06/05-estado-conflito-de-pinos-resolvivel` |
| `conflito-pinos-sem-saida` | `T06/06-estado-conflito-de-pinos-sem-saida` |
| `conteudo-nao-cabe` | `T09/06-estado-a-configuracao-nao-cabe` |
| `criterio-indisponivel` | `T12/04-estado-criterio-indisponivel` |
| `criterio-pendente` | `T12/05-estado-criterio-pendente` |
| `diff-divergente` | `T11/02-momento-tudo-confere` |
| `evento-sem-resposta` | `T14/02-estado-prazo-estourado` |
| `firmware-fora-matriz` | `T07/04-estado-firmware-nao-homologado` · `T07/06-momento-atualizando-o-firmware` |
| `firmware-sem-rede-no-modulo` | `T07/05-estado-firmware-sem-rede-no-modulo` |
| `grandeza-indisponivel` | `T10/04-estado-modulo-sem-pulsos` |
| `i-01` | `T12/01-momento-detalhe-da-instalacao` |
| `identificador-divergente` | `T14/04-estado-identificador-divergente` · `T14/06-momento-correcao-solicitada` |
| `indice-nao-classificado` | `T11/01-estado-conteudo-que-o-app-nao-reconhece` |
| `instalacoes-sem-rede` | `T12/03-estado-sem-rede` |
| `link-perdido` | `T04/03-estado-faixa-modulo-com-falha` |
| `lista-longa-garagens` | `T02/02-estado-lista-longa-com-busca` · `T02/03-momento-busca-sem-resultado` · `T02/04-momento-busca-esconde-a-escolha` |
| `localizacao-negada` | `T13/14-estado-homologado-sem-localizacao` |
| `ma-02` | `T10/02-estado-rotacao-caminhao-coletor` |
| `modelo-sem-driver` | `T07/03-estado-modelo-sem-suporte` |
| `modem-sem-sinal` | `T07/07-estado-modem-sem-sinal` |
| `modulo-em-outro-ativo` | `T06/10-estado-modulo-em-outro-ativo` |
| `modulo-ja-deste-ativo` | `T06/11-estado-modulo-ja-deste-ativo` · `T09/08-momento-manutencao-escolher-o-bloco` · `T09/09-momento-manutencao-reenviando` |
| `outro-usuario` | `T01/18-estado-outro-usuario-no-aparelho` |
| `pac-uo-02` | `T03/03-estado-pacote-de-4-dias` |
| `pac-uo-03` | `T03/04-estado-pacote-vencido` |
| `pool-esgotado` | `T09/07-estado-cercas-demais-pro-modulo` |
| `primeiro-acesso` | `T01/15-estado-primeiro-acesso` |
| `queda-na-cadeia` | `T09/02-estado-queda-na-cadeia` |
| `releitura-nao-confere` | `T10/10-estado-releitura-nao-confere` |
| `sem-conexao-no-login` | `T01/14-estado-login-sem-conexao` |
| `sem-conexao-no-menu` | `T04/15-estado-sem-conexao` |
| `serial-nao-cadastrado` | `T07/02-estado-serial-nao-cadastrado` |
| `sessao-interrompida` | `T16/06-estado-sessao-interrompida` |
| `sync-falha-rede` | `T03/01-estado-falha-de-rede` |
| `teto-de-envios` | `T01/17-estado-teto-de-envios` |
| `uma-empresa` | `T02/00-tela` · `T02/01-momento-escolhida` · `T02/08-estado-uma-empresa-ja-marcada` · `T04/07-momento-folha-trocar-de-garagem` |
| `usuario-lembrado` | `T01/16-estado-usuario-lembrado` |
| `versao-ilegivel` | `T11/04-estado-versao-ilegivel` |

O caso `fila-vazia` dá a hora do último envio da fila vazia (T15/03 e T15/04). Os estados sem caso próprio nascem de um dado do mock — por exemplo, a rotação e a velocidade do caminhão KNB-5H39 na calibração vêm de `calibracao.porModelo`, sem caso nenhum. O `estados.md` de cada tela diz de onde vem cada um.
