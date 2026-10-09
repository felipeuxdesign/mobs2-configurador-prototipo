# Os casos do mock

O mock tem **63 casos**, contados nas chaves de `mocks.js.casos`. O índice contém 199 referências: algumas usam um caso, outras uma coleção, uma semente ou o resultado de um toque. IDs de ativo, modelo e pacote são dados, não casos adicionais.

## Casos e referências declaradas

A tabela reúne declarações do [índice](../02-telas/indice.json) e das [receitas do protótipo](../06-prototipo/app/src/estado/receitas.js), incluindo os casos aditivos já presentes no mock. As condições reais de entrada e os quadros de cada família estão nos `estados.md` das telas; a coluna do palco abre os exemplos parados.

| Caso em `mocks.js.casos` | Referências que o declaram |
|---|---|
| `ativo-fora-pacote` | [T06/04-estado-fora-do-pacote](../02-telas/T06-selecionar-ativo/referencias/html/04-estado-fora-do-pacote.html) |
| `autoteste-falhando` | [T16/05-estado-homologacao-bloqueada](../02-telas/T16-sessao/referencias/html/05-estado-homologacao-bloqueada.html) |
| `bloco-recusado` | [T09/01-estado-bloco-recusado](../02-telas/T09-configurar-modulo/referencias/html/01-estado-bloco-recusado.html) |
| `bluetooth-desligado` | [T05/16-estado-bluetooth-desligado](../02-telas/T05-conectar-modulo/referencias/html/16-estado-bluetooth-desligado.html) |
| `bluetooth-sem-permissao` | [T05/17-estado-bluetooth-sem-permissao](../02-telas/T05-conectar-modulo/referencias/html/17-estado-bluetooth-sem-permissao.html) |
| `busca-vazia` | [T05/03-estado-nenhum-encontrado](../02-telas/T05-conectar-modulo/referencias/html/03-estado-nenhum-encontrado.html) |
| `can-estatico-ausente` | [T07/08-estado-sinal-da-can-sem-leitura](../02-telas/T07-diagnostico-do-modulo/referencias/html/08-estado-sinal-da-can-sem-leitura.html) |
| `can-estatico-bateria` | [T07/12-estado-alimentacao-abaixo-da-faixa](../02-telas/T07-diagnostico-do-modulo/referencias/html/12-estado-alimentacao-abaixo-da-faixa.html) · [T13/09-estado-item-reprovado](../02-telas/T13-checklist/referencias/html/09-estado-item-reprovado.html) · [T13/16-estado-secao-c-com-item-reprovado](../02-telas/T13-checklist/referencias/html/16-estado-secao-c-com-item-reprovado.html) · [T13/29-momento-relendo-o-modulo](../02-telas/T13-checklist/referencias/html/29-momento-relendo-o-modulo.html) · [T13/30-momento-alimentacao-relida](../02-telas/T13-checklist/referencias/html/30-momento-alimentacao-relida.html) · [T13/34-momento-alimentacao-nao-resolvida](../02-telas/T13-checklist/referencias/html/34-momento-alimentacao-nao-resolvida.html) |
| `can-estatico-hodometro` | Sem referência própria declarada no índice/receitas; não implica ausência de uso no fluxo. |
| `can-estatico-hodometro-a22` | Sem referência própria declarada no índice/receitas; não implica ausência de uso no fluxo. |
| `can-estatico-isolado` | [T07/09-estado-sinal-da-can-fora-do-esperado](../02-telas/T07-diagnostico-do-modulo/referencias/html/09-estado-sinal-da-can-fora-do-esperado.html) |
| `can-fora-esperado` | Sem referência própria declarada no índice/receitas; não implica ausência de uso no fluxo. |
| `cercas-reenviadas` | [T11/05-estado-revisar-em-seguida](../02-telas/T11-conferir-configuracao/referencias/html/05-estado-revisar-em-seguida.html) |
| `conexao-falha` | [T05/04-estado-conexao-falhou](../02-telas/T05-conectar-modulo/referencias/html/04-estado-conexao-falhou.html) |
| `conferencia-confere` | [T11/02-momento-tudo-confere](../02-telas/T11-conferir-configuracao/referencias/html/02-momento-tudo-confere.html) · [T11/04-momento-conferindo](../02-telas/T11-conferir-configuracao/referencias/html/04-momento-conferindo.html) |
| `conflito-pinos-sem-saida` | [T06/06-estado-conflito-de-pinos-sem-saida](../02-telas/T06-selecionar-ativo/referencias/html/06-estado-conflito-de-pinos-sem-saida.html) |
| `conteudo-nao-cabe` | [T09/06-estado-a-configuracao-nao-cabe](../02-telas/T09-configurar-modulo/referencias/html/06-estado-a-configuracao-nao-cabe.html) |
| `criterio-indisponivel` | [T12/04-estado-criterio-indisponivel](../02-telas/T12-ultimas-instalacoes/referencias/html/04-estado-criterio-indisponivel.html) |
| `criterio-pendente` | [T12/05-estado-criterio-pendente](../02-telas/T12-ultimas-instalacoes/referencias/html/05-estado-criterio-pendente.html) |
| `diff-divergente` | [T11/00-tela](../02-telas/T11-conferir-configuracao/referencias/html/00-tela.html) · [T11/03-momento-outras-acoes](../02-telas/T11-conferir-configuracao/referencias/html/03-momento-outras-acoes.html) |
| `entrada-ignicao` | [T13/23-estado-secao-c-com-entradas-reprovadas](../02-telas/T13-checklist/referencias/html/23-estado-secao-c-com-entradas-reprovadas.html) · [T13/24-estado-entradas-reprovadas](../02-telas/T13-checklist/referencias/html/24-estado-entradas-reprovadas.html) · [T13/32-momento-entradas-relidas](../02-telas/T13-checklist/referencias/html/32-momento-entradas-relidas.html) · [T13/36-momento-entradas-nao-resolvidas](../02-telas/T13-checklist/referencias/html/36-momento-entradas-nao-resolvidas.html) |
| `evento-nao-chega-de-novo` | [T14/09-estado-segunda-falha-do-evento](../02-telas/T14-ciclo-dinamico/referencias/html/09-estado-segunda-falha-do-evento.html) |
| `evento-sem-resposta` | [T14/02-estado-prazo-estourado](../02-telas/T14-ciclo-dinamico/referencias/html/02-estado-prazo-estourado.html) |
| `falta-reenviar` | [T09/16-estado-manutencao-falta-reenviar](../02-telas/T09-configurar-modulo/referencias/html/16-estado-manutencao-falta-reenviar.html) · [T13/43-estado-secao-d-com-revisar-em-seguida](../02-telas/T13-checklist/referencias/html/43-estado-secao-d-com-revisar-em-seguida.html) |
| `fila-dois-erros` | [T15/02-estado-dois-erros](../02-telas/T15-fila-de-saida/referencias/html/02-estado-dois-erros.html) |
| `fila-parada` | [T04/16-estado-fila-parada](../02-telas/T04-menu/referencias/html/16-estado-fila-parada.html) |
| `fila-sem-erro` | [T15/01-estado-sem-erro](../02-telas/T15-fila-de-saida/referencias/html/01-estado-sem-erro.html) |
| `fila-vazia` | [T15/03-estado-fila-vazia](../02-telas/T15-fila-de-saida/referencias/html/03-estado-fila-vazia.html) · [T15/04-estado-secao-f-em-re-checagem](../02-telas/T15-fila-de-saida/referencias/html/04-estado-secao-f-em-re-checagem.html) |
| `firmware-fora-matriz` | [T07/04-estado-firmware-fora-da-lista](../02-telas/T07-diagnostico-do-modulo/referencias/html/04-estado-firmware-fora-da-lista.html) · [T07/06-momento-atualizando-o-firmware](../02-telas/T07-diagnostico-do-modulo/referencias/html/06-momento-atualizando-o-firmware.html) |
| `firmware-fora-sem-rede` | Sem referência própria declarada no índice/receitas; não implica ausência de uso no fluxo. |
| `firmware-sem-rede-no-modulo` | [T07/05-estado-firmware-sem-rede-no-modulo](../02-telas/T07-diagnostico-do-modulo/referencias/html/05-estado-firmware-sem-rede-no-modulo.html) |
| `gps-fraco` | [T13/21-estado-secao-c-com-gps-reprovado](../02-telas/T13-checklist/referencias/html/21-estado-secao-c-com-gps-reprovado.html) · [T13/22-estado-gps-reprovado](../02-telas/T13-checklist/referencias/html/22-estado-gps-reprovado.html) · [T13/31-momento-gps-relido](../02-telas/T13-checklist/referencias/html/31-momento-gps-relido.html) · [T13/35-momento-gps-nao-resolvido](../02-telas/T13-checklist/referencias/html/35-momento-gps-nao-resolvido.html) |
| `grandeza-indisponivel` | [T10/04-estado-modulo-sem-pulsos](../02-telas/T10-calibracao/referencias/html/04-estado-modulo-sem-pulsos.html) |
| `indice-nao-classificado` | [T11/01-estado-conteudo-que-o-app-nao-reconhece](../02-telas/T11-conferir-configuracao/referencias/html/01-estado-conteudo-que-o-app-nao-reconhece.html) |
| `instalacoes-sem-rede` | [T12/03-estado-sem-rede](../02-telas/T12-ultimas-instalacoes/referencias/html/03-estado-sem-rede.html) |
| `instalacoes-vazia` | [T12/02-estado-nenhuma-instalacao](../02-telas/T12-ultimas-instalacoes/referencias/html/02-estado-nenhuma-instalacao.html) |
| `link-perdido` | [T04/03-estado-faixa-modulo-com-falha](../02-telas/T04-menu/referencias/html/03-estado-faixa-modulo-com-falha.html) |
| `lista-longa-garagens` | [T02/02-estado-lista-longa-com-busca](../02-telas/T02-selecionar-contexto/referencias/html/02-estado-lista-longa-com-busca.html) · [T02/03-momento-busca-sem-resultado](../02-telas/T02-selecionar-contexto/referencias/html/03-momento-busca-sem-resultado.html) · [T02/04-momento-busca-esconde-a-escolha](../02-telas/T02-selecionar-contexto/referencias/html/04-momento-busca-esconde-a-escolha.html) |
| `localizacao-negada` | [T13/14-estado-aguardando-autoteste-sem-localizacao](../02-telas/T13-checklist/referencias/html/14-estado-aguardando-autoteste-sem-localizacao.html) |
| `modelo-sem-driver` | [T07/03-estado-modelo-sem-suporte](../02-telas/T07-diagnostico-do-modulo/referencias/html/03-estado-modelo-sem-suporte.html) |
| `modem-sem-sinal` | [T07/07-estado-modem-sem-sinal](../02-telas/T07-diagnostico-do-modulo/referencias/html/07-estado-modem-sem-sinal.html) · [T13/25-estado-secao-c-com-modem-reprovado](../02-telas/T13-checklist/referencias/html/25-estado-secao-c-com-modem-reprovado.html) · [T13/26-estado-modem-reprovado](../02-telas/T13-checklist/referencias/html/26-estado-modem-reprovado.html) · [T13/33-momento-modem-relido](../02-telas/T13-checklist/referencias/html/33-momento-modem-relido.html) · [T13/37-momento-modem-nao-resolvido](../02-telas/T13-checklist/referencias/html/37-momento-modem-nao-resolvido.html) |
| `modulo-com-pendencias` | [T07/13-estado-sessao-anterior-mal-encerrada](../02-telas/T07-diagnostico-do-modulo/referencias/html/13-estado-sessao-anterior-mal-encerrada.html) |
| `modulo-em-outro-ativo` | [T06/10-estado-modulo-em-outro-ativo](../02-telas/T06-selecionar-ativo/referencias/html/10-estado-modulo-em-outro-ativo.html) |
| `modulo-ja-deste-ativo` | [T06/11-estado-modulo-ja-deste-ativo](../02-telas/T06-selecionar-ativo/referencias/html/11-estado-modulo-ja-deste-ativo.html) · [T09/08-momento-manutencao-escolher-o-bloco](../02-telas/T09-configurar-modulo/referencias/html/08-momento-manutencao-escolher-o-bloco.html) · [T09/09-momento-manutencao-reenviando](../02-telas/T09-configurar-modulo/referencias/html/09-momento-manutencao-reenviando.html) · [T09/10-momento-manutencao-concluida](../02-telas/T09-configurar-modulo/referencias/html/10-momento-manutencao-concluida.html) |
| `motor-desligado-no-ciclo` | [T14/03-estado-dinamico-fora-do-esperado](../02-telas/T14-ciclo-dinamico/referencias/html/03-estado-dinamico-fora-do-esperado.html) |
| `outro-usuario` | [T01/18-estado-outro-usuario-no-aparelho](../02-telas/T01-login/referencias/html/18-estado-outro-usuario-no-aparelho.html) |
| `pareando` | [T05/18-estado-pareando](../02-telas/T05-conectar-modulo/referencias/html/18-estado-pareando.html) |
| `pool-esgotado` | [T09/07-estado-pontos-de-cerca-demais](../02-telas/T09-configurar-modulo/referencias/html/07-estado-pontos-de-cerca-demais.html) |
| `primeiro-acesso` | [T01/15-estado-primeiro-acesso](../02-telas/T01-login/referencias/html/15-estado-primeiro-acesso.html) |
| `pronto-para-fechar` | [T13/10-estado-finalizar-com-a-secao-f-falhando](../02-telas/T13-checklist/referencias/html/10-estado-finalizar-com-a-secao-f-falhando.html) |
| `queda-na-cadeia` | [T09/02-estado-queda-na-cadeia](../02-telas/T09-configurar-modulo/referencias/html/02-estado-queda-na-cadeia.html) · [T09/03-estado-recuperacao-ate-a-conexao-gravar](../02-telas/T09-configurar-modulo/referencias/html/03-estado-recuperacao-ate-a-conexao-gravar.html) |
| `reconectando` | [T05/19-estado-reconectando](../02-telas/T05-conectar-modulo/referencias/html/19-estado-reconectando.html) |
| `releitura-nao-confere` | [T10/10-estado-releitura-nao-confere](../02-telas/T10-calibracao/referencias/html/10-estado-releitura-nao-confere.html) |
| `sem-conexao-no-login` | [T01/14-estado-login-sem-conexao](../02-telas/T01-login/referencias/html/14-estado-login-sem-conexao.html) |
| `sem-conexao-no-menu` | [T04/15-estado-sem-conexao](../02-telas/T04-menu/referencias/html/15-estado-sem-conexao.html) |
| `sem-leitor` | [T14/12-estado-ativo-sem-leitor](../02-telas/T14-ciclo-dinamico/referencias/html/12-estado-ativo-sem-leitor.html) |
| `serial-nao-cadastrado` | [T07/02-estado-serial-nao-cadastrado](../02-telas/T07-diagnostico-do-modulo/referencias/html/02-estado-serial-nao-cadastrado.html) |
| `servidor-ainda-nao` | [T09/12-estado-o-modulo-ainda-nao-falou-com-o-servidor](../02-telas/T09-configurar-modulo/referencias/html/12-estado-o-modulo-ainda-nao-falou-com-o-servidor.html) |
| `sessao-interrompida` | [T16/06-estado-sessao-interrompida](../02-telas/T16-sessao/referencias/html/06-estado-sessao-interrompida.html) |
| `sync-falha-rede` | [T03/01-estado-falha-de-rede](../02-telas/T03-sincronizar/referencias/html/01-estado-falha-de-rede.html) |
| `teto-de-envios` | [T01/17-estado-teto-de-envios](../02-telas/T01-login/referencias/html/17-estado-teto-de-envios.html) |
| `uma-empresa` | [T02/00-tela](../02-telas/T02-selecionar-contexto/referencias/html/00-tela.html) · [T02/01-momento-escolhida](../02-telas/T02-selecionar-contexto/referencias/html/01-momento-escolhida.html) · [T02/08-estado-uma-empresa-ja-marcada](../02-telas/T02-selecionar-contexto/referencias/html/08-estado-uma-empresa-ja-marcada.html) · [T04/07-momento-folha-trocar-de-garagem](../02-telas/T04-menu/referencias/html/07-momento-folha-trocar-de-garagem.html) |
| `usuario-lembrado` | [T01/16-estado-usuario-lembrado](../02-telas/T01-login/referencias/html/16-estado-usuario-lembrado.html) |

## Condições que não são casos próprios

A rotação e a velocidade opcional do caminhão vêm de `calibracao.porModelo`; os quadros de calibração usam a semente do caminhão. O exemplo de uma empresa é `uma-empresa`; a entrada normal usa as três empresas do técnico. As referências sem chave de `casos` continuam montadas a partir dos dados que a ficha e a receita indicam.

O campo `caso` do índice é uma indicação de origem, não um mecanismo de navegação. Na T11/02 e 04 ele conserva a descrição histórica “diff-divergente, invertido”; o cenário que confere é `conferencia-confere`, e a divergência permanece na T11/00 e 03. Não confundir esses dois resultados.

Os casos conservados de etapas anteriores não recriam telas retiradas. Por exemplo, o antigo `can-fora-esperado` não produz um passo de movimento na T14 atual; ré, porta e comparação do cartão com cadastro saíram do ciclo. O técnico confere o número lido com o cartão impresso.

Para o dev, o [contrato de dados](../08-para-o-dev/contrato-de-dados.md) separa dados simulados de integrações reais, e [testes-prontos.md](../08-para-o-dev/testes-prontos.md) explica como reaproveitar os casos no aceite.
