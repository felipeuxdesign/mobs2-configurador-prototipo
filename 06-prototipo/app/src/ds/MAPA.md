# O mapa das peças

Cada linha do `03-design-system/componentes.md` e o componente que a constrói, em `src/ds/`. Medido no fechamento do C2 (o censo independente); o espécime de cada uma está na vitrine (`?vitrine=1`), e a bancada (`node scripts/especime.mjs todos`) compara com a folha.

Quando uma peça nova entrar, a linha entra aqui e no `componentes.md` no mesmo ciclo.

## Folha 1 · fundamentos

| Peça | Componente |
|---|---|
| primário · normal | src/ds/primitivos/Primario.jsx |
| primário · pressionado | src/ds/primitivos/Primario.jsx (forcaToque na vitrine; :active no app) |
| primário · desabilitado | src/ds/primitivos/Primario.jsx (desabilitado) |
| link · normal e pressionado | src/ds/primitivos/Link.jsx (registrado: o link depois do toque vira o registro do pedido, no mesmo lugar de 48, sem toque, com o relógio de 14 e o feito em --tinta-apagada — T14/06 · C10) |
| linha tocável · normal e pressionada | src/ds/linhas/LinhaTocavel.jsx, sobre src/ds/primitivos/Tocavel.jsx (variante acao: a linha de ação de 50, sem poço — T06/02 e T13/07 · C8; registrado: a linha de ação depois do toque, o registro do pedido no mesmo cartão, sem toque, com o glifo no poço de 24 e o feito sobre o que acontece agora — T06/07) |

## Folha 2 · chrome rodape folha dialogo

| Peça | Componente |
|---|---|
| barra do sistema | src/ds/chrome/BarraDoSistema.jsx |
| barra do sistema no menu | src/ds/chrome/BarraDoSistema.jsx (fundo tira) |
| barra do sistema sem sessão | src/ds/chrome/BarraDoSistema.jsx (fundo pagina) |
| faixa · sessão aberta | src/ds/chrome/Faixa.jsx; semAtivo, a placa em --tinta-apagada ("sem ativo") · C6, C8 |
| faixa · sem sessão | src/ds/chrome/Faixa.jsx (estado sem-sessao) |
| faixa · módulo com falha | src/ds/chrome/Faixa.jsx (estado falha; tracoSobreposto no menu: o traço sem roubar altura, G24 · C5, T04/03) |
| faixa · sem ação | src/ds/chrome/Faixa.jsx (sem acao, casca da T16 · DS-D5) |
| tira de contexto | src/ds/chrome/TiraDeContexto.jsx (+ Avatar.jsx, Camadas.jsx) |
| faixa no menu | src/ds/chrome/Faixa.jsx (lugar menu) |
| o topo do menu inteiro | src/ds/chrome/TopoDoMenu.jsx |
| duas ações | src/ds/chrome/Rodape.jsx (lugar login: o rodapé da T01, sem traço, 20 · 28; linkRegistrado: o link vira o registro, Link registrado — T14/06 · C10) |
| uma ação | src/ds/chrome/Rodape.jsx |
| processo correndo | src/ds/chrome/Rodape.jsx (primarioDesabilitado + explicacao; pe 'botao', o pé de 32 com a explicação da T05/10 · C6) |
| com legenda | src/ds/chrome/Rodape.jsx (legenda; legendaJunta, a legenda a 6 do botão — T13 · C10) |
| folha | src/ds/chrome/Folha.jsx + Veu.jsx (conteúdo: CartaoDaConta, PrazoDaConta, BotaoDaFolha; folga 12 e subtitulo na de trocar de garagem · C5, T04/07; aoTocarFora no Veu, o toque no véu fecha a folha, T04 · o cartão do que a sessão prendeu é peça da T04, pecas.jsx) |
| diálogo | src/ds/chrome/Dialogo.jsx (+ Frase, Destaque) |
| diálogo sem saída | src/ds/chrome/Dialogo.jsx (sem saida) |
| diálogo com ciência | src/ds/chrome/Dialogo.jsx (ciencia → primitivos/Checkbox.jsx) |
| folha com opções | src/ds/chrome/Folha.jsx + LinhaDeOpcao.jsx (CartaoDeOpcoes) |
| barra do sistema sob o véu | src/ds/chrome/BarraDoSistema.jsx (veu) |

## Folha 3 · glifos icones poco

| Peça | Componente |
|---|---|
| escolha numa lista | src/ds/linhas/LinhaEscolha.jsx (poço de 30 com o Quadrado · decisão 29; escolhivel: a vencida também se escolhe, T02·1 · C4) |
| os glifos de estado | src/ds/primitivos/Glifo.jsx (ESTADOS; fora da folha, fora de ESTADOS: traco-circulo, o não se aplica da assertiva da sessão · C11, T16/02 e 05) |
| os ícones de ferramenta | src/ds/primitivos/Icone.jsx (ICONES; subindo: a seta do SUBINDO AGORA, com o traço 2,2 do glifo · C11, T15/01) |
| os poços | src/ds/primitivos/Poco.jsx |
| os marcadores | src/ds/primitivos/Marcador.jsx (Quadrado: o marcador de escolha, um só, vazado ou lima de 11 · decisão 29; Led) |

## Folha 4 · linhas cartoes aviso

| Peça | Componente |
|---|---|
| aprovada | src/ds/linhas/LinhaChecagem.jsx |
| reprovada, com causa | src/ds/linhas/LinhaChecagem.jsx (causa) |
| não se aplica | src/ds/linhas/LinhaChecagem.jsx |
| parou aqui | src/ds/linhas/LinhaChecagem.jsx |
| ainda não | src/ds/linhas/LinhaChecagem.jsx (estado ainda-nao; com glifo trocado, o relógio apagado da T05/10 · C6) |
| pré-checagem | src/ds/linhas/LinhaChecagem.jsx (compacta; estado agora, a checagem que corre, e folgaFim 'pre-checagem', a última de 43 da T05/05 · C6) |
| pré-checagem com sessão | src/ds/linhas/LinhaChecagem.jsx (compacta) |
| passo do ciclo | src/ds/linhas/LinhaChecagem.jsx (variante passo; recheioCausa: o passo reprovado com a causa, 'largo' 8 no meio da lista e 'justo' 4 no teste do cartão, a causa na entrelinha do texto — T14/03 e 04 · C10) |
| assertiva da sessão | src/ds/linhas/LinhaChecagem.jsx (variante dupla; valorQuebra, o valor longo em duas linhas à direita, o recebimento de outra garagem · C11, T12·2; o nome aceso em todo estado, o não se aplica com o traco-circulo e o ainda não com o relógio em --tinta-secundaria, folgaFim 'assertiva', a última de 54, e lendo, a assertiva que ainda não acendeu · C11, T16) |
| linha de conferência | src/ds/linhas/LinhaChecagem.jsx (variante conferencia; estado diverge, o traço no poço e o valor em --tinta; folgaFim 'conferencia', a última de 72; lendo, o poço vazio enquanto a leitura não chega · C11, T11) |
| seção aberta do checklist | src/ds/linhas/CabecaSecao.jsx (aberta; estado aguarda, o relógio em --marca-limite, e legenda, F · não bloqueia — T13/01–06 · C10) |
| seção recolhida | src/ds/linhas/CabecaSecao.jsx (estado aguarda e legenda, como a aberta — T13/01–06 · C10) |
| passos com o prazo estourado | src/ds/linhas/Lista.jsx (recheio passos) + LinhaChecagem.jsx |
| disponível | src/ds/cartoes/CartaoFerramenta.jsx (+ GradeFerramentas.jsx) |
| decide agora | src/ds/cartoes/CartaoFerramenta.jsx (largo, estado decide; poço 30 com a sessão aberta · C5) |
| conectado | src/ds/cartoes/CartaoFerramenta.jsx (largo; com a sessão aberta, o toque abre a folha do que ela prendeu, T04/10 e 11 · o travado do C5 saiu, HU-T16-2) |
| com pendência | src/ds/cartoes/CartaoFerramenta.jsx + Contador.jsx |
| espera | src/ds/cartoes/CartaoFerramenta.jsx (estado espera; sem folga entre o poço e o nome, como a folha 4 desenha; largo, o ativo que espera o módulo · C5) |
| espera a rede | src/ds/cartoes/CartaoFerramenta.jsx (estado sem-rede) |
| falha | src/ds/cartoes/Aviso.jsx (tom falha; mudo, o glifo calado pro leitor, G15 · C4, T03/01 e 03; bloqueio, sem poço, 14 em volta, o rótulo de topo e a frase de duas orações, A HOMOLOGAÇÃO FICA BLOQUEADA, Lei 7 · exceção · C11, T16/05) |
| aviso | src/ds/cartoes/Aviso.jsx (tom neutro; semPoco no da folha de garagem, Lei 7 · C5, T04/08) |
| processo parado | src/ds/cartoes/Aviso.jsx (glifo xis) |
| com contagem | src/ds/cartoes/Aviso.jsx (numero, unidade; tom veredito, o que confere em lima, sem poço, 12 · 14 · C11, T11/02) |
| vazio declarado | src/ds/cartoes/Vazio.jsx |
| nota tracejada | src/ds/cartoes/Nota.jsx (tom explica; corpo secundario, a frase de 13 da T03/04 · C4; corpo pulado, a frase de 13 em --tinta-secundaria do NÃO RODARAM · C11, T16/04; corpo item, a frase de 13 em 400 do ISTO NÃO SE MARCA À MÃO · C10, T13/09) |
| nota com rótulo | src/ds/cartoes/Nota.jsx (tom fato; tom achado, o que a leitura achou e não classifica, com a borda do poço, 10 · 12 · C11, T11/01) |
| o par comparado | src/ds/cartoes/ParComparado.jsx (veredito: quando batem, NO CADASTRO em lima e a frase em 600 · C8, T06/01) |
| linha do histórico | src/ds/linhas/LinhaHistorico.jsx (tom do veredito: espera em --tinta, falha em --vermelho; detalheTam legenda, a linha de baixo em 12 quando diz há quantos dias; o veredito longo quebra em duas linhas · C11, T12) |
| linha da fila · esperando | src/ds/linhas/LinhaFilaEsperando.jsx (→ LinhaFila.jsx estado espera) |
| linha de garagem | src/ds/linhas/LinhaGaragem.jsx (estado espera: a troca espera o envio · C5, T04/08) |
| linha de garagem · a atual | src/ds/linhas/LinhaGaragem.jsx (estado atual) |
| a lista de garagens | src/ds/linhas/Lista.jsx + LinhaGaragem.jsx |

## Folha 5 · instrumentos cadeia processo

| Peça | Componente |
|---|---|
| leitura na faixa | src/ds/instrumentos/Leitura.jsx (+ Escala.jsx) |
| fora da faixa | src/ds/instrumentos/Leitura.jsx (fora) |
| leitura pequena | src/ds/instrumentos/LeituraPequena.jsx (+ GradeLeituras; folga 10 na T07 · sem faixa, o nível, sem a faixa na escala · semLeitura, o sinal que não chegou, T07/02 · C8) |
| leitura com mínimo | src/ds/instrumentos/LeituraPequena.jsx (faixa aberta) |
| tambor | src/ds/instrumentos/LeituraTambor.jsx (+ Tambor.jsx, RodaDigito.jsx) |
| sinais liga-desliga | src/ds/instrumentos/Sinais.jsx |
| instrumentos apagados | src/ds/instrumentos/Declarado.jsx (texto) |
| cadeia concluída | src/ds/instrumentos/Cadeia.jsx (+ Trilho.jsx) |
| cadeia recusada | src/ds/instrumentos/Cadeia.jsx (justa; altura correndo, a cadeia gravando com o quadrado de agora e os que esperam com a versão apagada, elo de 86, T09/00 · altura pausada, a cadeia parada com o contador e o aviso, o elo pausado e os pendentes em traço, elo de 68, T09/02 e 03 · C9) |
| segmentado | src/ds/instrumentos/Segmentado.jsx (folga 8 na recuperação da T01; segmento atual-falha, o passo atual reprovado em vermelho — T13/09 · C10) |
| a pré-condição dos pinos | src/ds/instrumentos/Precondicao.jsx |
| encerrando | src/ds/instrumentos/Encerramento.jsx (+ Trilho.jsx; estado pausa, o bloco em que a sessão interrompida parou, com o nome e o 'parou aqui' em --tinta e o trilho na divisória · C11, T16/06) |
| pede o corte | src/ds/instrumentos/Encerramento.jsx (justo, energia) |
| sem homologar | src/ds/instrumentos/Encerramento.jsx (pulado) |
| cronômetro | src/ds/instrumentos/Prazo.jsx (falha: o prazo estourado, o número em vermelho e a escala sem o preenchido; detalhe em lista: as frases do estado, uma por linha, na entrelinha da legenda — T14/02 · C10) |
| prazo cheio | src/ds/instrumentos/Prazo.jsx (detalhe) |
| placar da homologação | src/ds/instrumentos/Placar.jsx (veredito + meta: HOMOLOGADA em lima e '12 evidências · 14:30' na linha de base — T13/11 · C10) |

## Folha 6 · entrada escolha cabecalho

| Peça | Componente |
|---|---|
| com contador neutro | src/ds/entrada/CabecalhoConteudo.jsx; o contador do veredito, em lima quando tudo aprova (11 de 11) · C6; forte, o contador em 700, o veredito da instalação no detalhe (T12/01) · C11; subtitulo, a linha de 12 embaixo do título, com folgaSubtitulo 4 (T16/06) ou 6 (T16/03) · C11 |
| com contador de falha | src/ds/entrada/CabecalhoConteudo.jsx (tom falha) |
| a marca no login | src/ds/entrada/Marca.jsx |
| campo | src/ds/entrada/Campo.jsx |
| campo focado | src/ds/entrada/Campo.jsx (focado, + TracoFoco.css) |
| requisitos da senha | src/ds/entrada/Requisito.jsx (+ Requisitos) |
| código · seis células | src/ds/entrada/Codigo.jsx (focoEm: o traço fora do próximo dígito, T01/06) |
| código errado | src/ds/entrada/Codigo.jsx (errado) |
| link dentro do conteúdo | src/ds/entrada/LinkConteudo.jsx |
| botões só de ícone | src/ds/primitivos/SoIcone.jsx |
| checkbox | src/ds/primitivos/Checkbox.jsx (Poco de 24 com o Quadrado vazado · decisão 29) |
| checkbox marcado | src/ds/primitivos/Checkbox.jsx (marcado: o Quadrado lima de 11) |
| campo de busca | src/ds/entrada/Busca.jsx (a dica é texto por cima do campo vazio, não placeholder · C4) |
| justificativa | src/ds/entrada/Justificativa.jsx (+ CampoTexto.jsx) |
| linha de opção | src/ds/chrome/LinhaDeOpcao.jsx (+ CartaoDeOpcoes · o detalhe numa linha só, com reticências, pelas folhas 2 e 6 de 24/09 · `espera`, T01/04 e 11: a saída que espera o reenvio, apagada e desabilitada de verdade, com a contagem no lugar da seta — `--n-espera`, no tokens.css —; ao liberar, a seta entra e a linha acende, duas camadas trocando por opacity em --mov-rapido (a cópia apagada do texto é um span vazio com aria-hidden que o CSS preenche, como no Link: o leitor lê cada texto uma vez) · a `desabilitado` do C4 saiu, trocada pela `espera`) |
| linha de módulo | src/ds/entrada/LinhaModulo.jsx (fim: a última de 56 da T05/00; escolha: o marcador de escolha e o firmware, 72 e a última de 76, da T05/01 · C6) |
| linha de ônibus | src/ds/entrada/LinhaOnibus.jsx (fim: a última da lista, 78, como o fim da linha de módulo · C8, T06/00) |
| bloco escolhido | src/ds/entrada/BlocoEscolhido.jsx (justo: não cresce, 22; tom apagado quando o chassi diverge, 18 · C8, T06/01–03) |
| escolhido com trava | src/ds/entrada/BlocoEscolhido.jsx (falha, passos) |
| escolhido com trava · T06 | src/ds/entrada/BlocoEscolhido.jsx (falha, motivo; tom neutro na trava com saída · C8, T06/05) |
| cartão que pede ação | src/ds/entrada/CartaoAcao.jsx (+ BotaoSecundario.jsx; compacto: com mais de um erro, o título de 17, a causa de 13, o botão compacto e a divisória, e o que a tela põe depois — o erro que reenvia sozinho e a legenda, peças da T15 · C11, T15/02) |
| botão secundário | src/ds/entrada/BotaoSecundario.jsx (compacto: 46 de desenho e 15 de letra, o toque de 48 por fora, G14 · C11, T15/02) |
| tira de leituras | src/ds/entrada/TiraLeituras.jsx |
| lista com contagem | src/ds/entrada/LinhaContagem.jsx (+ linhas/Lista.jsx; nomeGlifo, o nome pelo estado do dado · C4) |

## Folha 7 · checklist evidencia

| Peça | Componente |
|---|---|
| linha de seção do mapa | src/ds/checklist/LinhaSecaoMapa.jsx (nomeGlifo, o nome pelo estado do dado; recolhida, aria-expanded false — T13 · C10) |
| cartões de valor | src/ds/checklist/CartaoValor.jsx (+ GradeCartoes, que preenche o buraco do cartão largo; unidadeTexto, a palavra de 12 junto do valor; larga, as duas colunas, a versão gravada inteira; aoTocar, o cartão que leva a outra tela — T13 · C10) |
| cartão com barra | src/ds/checklist/CartaoValor.jsx (medida objeto) |
| cartão de configuração | src/ds/checklist/CartaoValor.jsx (sem medida) |
| cartões de foto | src/ds/checklist/CartaoFoto.jsx (+ GradeCartoes; desabilitado, o item já resolvido ou herdado — T13/02 · C10) |
| a seção aberta inteira | src/ds/checklist/SecaoChecklist.jsx (+ linhas/CabecaSecao.jsx; legenda, nomeGlifo e divisoria, a última do acordeão sem traço — T13 · C10) |
| foto · aguarda | src/ds/checklist/FotoProva.jsx |
| foto · tirada | src/ds/checklist/FotoProva.jsx (tirada) |
| mostrador · apagado | src/ds/checklist/Mostrador.jsx (apagado) |
| mostrador · relendo | src/ds/checklist/Mostrador.jsx (relendo; unidade junto do valor · C8, T08/01) |
| mostrador · aceso | src/ds/checklist/Mostrador.jsx (aceso; unidade junto do valor · C8, T08/02) |
| cartões que esperam o ciclo | src/ds/checklist/CartaoValor.jsx (aguarda) |
| bloco do evento | src/ds/checklist/BlocoEvento.jsx (nome: o nome do relógio pro leitor, pelo dado — 'ainda não' antes do disparo; feito, o relógio fica no lugar e mudo — T14 · C10, G15) |
| linha da fila | src/ds/linhas/LinhaFila.jsx (reexportada por checklist/LinhaFila.jsx; posicao: a altura pela posição na lista, 'meio' 50 e 'fim' 62, em qualquer estado · C11, T15/01, T15-V2) |
| linha da re-checagem | src/ds/checklist/LinhaRechecagem.jsx |
| prova da cadeia | src/ds/checklist/Prova.jsx (tipo cadeia; também a versão lida no módulo, T11/02 · C11) |
| prova da sessão | src/ds/checklist/Prova.jsx (tipo sessao) |
| contador no menu | src/ds/cartoes/Contador.jsx (+ CartaoFerramenta.jsx) |

## Folha 8 · calibracao

| Peça | Componente |
|---|---|
| valor em poço | src/ds/instrumentos/Calibracao.jsx · ValorEmPoco (+ Tambor.jsx) |
| régua da diferença | src/ds/instrumentos/Calibracao.jsx · ReguaDiferenca |
| o valor alvo | src/ds/instrumentos/Calibracao.jsx · ValorAlvo |
| o que não se aplica | src/ds/instrumentos/Declarado.jsx (linhas) |

## Peças internas, sem linha própria

- chrome/CartaoDaConta.jsx, PrazoDaConta.jsx e BotaoDaFolha.jsx, o conteúdo da 'folha' da conta, T04/05
- chrome/Avatar.jsx, na tira e no cartão da conta
- chrome/Veu.jsx, o véu da folha e do diálogo
- chrome/Camadas.jsx, interna (a camada do toque repete a frase por CSS, como o Link · C5)
- chrome/Dialogo.jsx · Frase, Destaque; chrome/LinhaDeOpcao.jsx · CartaoDeOpcoes
- linhas/Lista.jsx, o cartão de lista de todas as linhas
- cartoes/GradeFerramentas.jsx (folga 10 no menu da T04 · C5)
- entrada/CampoTexto.jsx, o campo longo da justificativa; entrada/Requisito.jsx · Requisitos, a lista
- instrumentos/Escala.jsx (semLados: a barra do download da T03, o placar sem as bordas dos lados · C4; vazia: o poço do sinal que não chegou, só o traço no meio · C8, T07/02; tam envio: a barra de 16 do item que sobe, com os riscos e o marcador da barra pequena · C11, T15/01; tam item: a barra de 22 do instrumento do item reprovado · C10, T13/09), Trilho.jsx, Tambor.jsx, RodaDigito.jsx (G29) e LeituraPequena.jsx · GradeLeituras
- checklist/CartaoValor.jsx · GradeCartoes
