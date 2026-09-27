# O mapa das peças

Cada linha do `03-design-system/componentes.md` e o componente que a constrói, em `src/ds/`. Medido no fechamento do C2 (o censo independente); o espécime de cada uma está na vitrine (`?vitrine=1`), e a bancada (`node scripts/especime.mjs todos`) compara com a folha.

Quando uma peça nova entrar, a linha entra aqui e no `componentes.md` no mesmo ciclo.

## Folha 1 · fundamentos

| Peça | Componente |
|---|---|
| primário · normal | src/ds/primitivos/Primario.jsx (o que troca depois de montar, uma regra só: com o mesmo texto, acende por uma camada, `acende` · C12·8; com outro texto, o texto esmaece no lugar e o roxo troca direto, `trocaTexto` ou `acende` · C12·23, o conserto de 27/09) |
| primário · pressionado | src/ds/primitivos/Primario.jsx (forcaToque na vitrine; :active no app) |
| primário · desabilitado | src/ds/primitivos/Primario.jsx (desabilitado) |
| link · normal e pressionado | src/ds/primitivos/Link.jsx (registrado: o link depois do toque vira o registro do pedido, no mesmo lugar de 48, sem toque, com o relógio de 14 e o feito em --tinta-apagada — T14/06 · C10; desabilitado: em --tinta-apagada, sem o pressionado — a lei 17, o semear da T10) |
| linha tocável · normal e pressionada | src/ds/linhas/LinhaTocavel.jsx, sobre src/ds/primitivos/Tocavel.jsx (variante acao: a linha de ação de 50, sem poço — T06/02 · C8; a T13/07 a usou até a decisão 39, que trocou o cartão pela caixa do não conforme; registrado: a linha de ação depois do toque, o registro do pedido no mesmo cartão, sem toque, com o glifo de 14 no poço de 32 (o poço na linha · a entrega do checklist; era o de 24) e o feito sobre o que acontece agora — T06/07) |

## Folha 2 · chrome rodape folha dialogo

| Peça | Componente |
|---|---|
| barra do sistema | src/ds/chrome/BarraDoSistema.jsx (a do Android atual, lei 22 e decisão 43: a hora em --fonte-sistema, a Google Sans do @font-face do BarraDoSistema.css, lida de 05-recursos/fontes/GoogleSans-hora.woff e empacotada no build; o sinal em quatro cápsulas, o Wi-Fi em dois arcos e um ponto, a bateria cheia, com a geometria da ficha no SVG; o tamanho de cada ícone e o traço do Wi-Fi nos tokens --barra-sinal, --barra-sinal-altura, --barra-wifi, --barra-bateria, --barra-icone e --barra-wifi-traco; o recuo de 26 e 32 e os glifos 3px abaixo do centro, nos tokens --barra-sistema-*) |
| barra do sistema no menu | src/ds/chrome/BarraDoSistema.jsx (fundo tira) |
| barra do sistema sem sessão | src/ds/chrome/BarraDoSistema.jsx (fundo pagina) |
| faixa · sessão aberta | src/ds/chrome/Faixa.jsx (o ENCERRAR com o desenho de 44, --toque-desenho, e o toque de 48 crescendo só pra baixo, pelo ::after · decisão 38); semAtivo, a placa em --tinta-apagada ("sem ativo") · C6, C8 · acaoDesabilitada, o ENCERRAR desabilitado e em --tinta-apagada, sem o pressionado, onde o voltar não faz nada (a lei 17, diretor, 25/09: T08 relendo, T09 recuperação, T10 semear) |
| faixa · sem sessão | src/ds/chrome/Faixa.jsx (estado sem-sessao) |
| faixa · módulo com falha | src/ds/chrome/Faixa.jsx (estado falha: a linha vermelha de 2 nos mesmos 52, também no menu, com a borda de cima · a entrega do checklist, T04/03; saiu o tracoSobreposto do C5, G24; no menu, o ENCERRAR desce 1, a diferença entre a linha de 2 e a de 1 · decisão 38) |
| faixa · sem ação | src/ds/chrome/Faixa.jsx (sem acao, casca da T16 · DS-D5) |
| tira de contexto | src/ds/chrome/TiraDeContexto.jsx (+ Avatar.jsx, Camadas.jsx; a área de 48 da conta cresce só pra cima, e a caixa dela conta no toque: fica a 8 do ENCERRAR de 44 · decisão 38) |
| faixa no menu | src/ds/chrome/Faixa.jsx (lugar menu: os 52 de toda tela, com a borda de cima --borda-rodape e a linha de baixo · a entrega do checklist, T04/00; sem sessão, a do T04/01, 50 e a linha embaixo) |
| o topo do menu inteiro | src/ds/chrome/TopoDoMenu.jsx (sem linha embaixo: a linha é a de baixo da faixa · a entrega do checklist) |
| duas ações | src/ds/chrome/Rodape.jsx (com o link, ds-rodape-com-link: o alto de 13 (--rodape-alto-com-link) e o vão de 8, o link de 44 (--toque-desenho) que come 5 embaixo (--link-recuo), e o toque de 48 crescendo só pra baixo, pelo ::after · decisão 38; lugar login: o rodapé da T01, sem traço, 13 · 20 · 28; linkRegistrado: o link vira o registro, Link registrado — T14/06 · C10, com o desenho de antes, 14, o vão de 6 e os 48 que comem 4, como a referência desenha; linkDesabilitado: o link no lugar, desabilitado de verdade e em --tinta-apagada, sem o pressionado, enquanto o semear corre — T10, a decisão do diretor de 25/09 e a lei 17) |
| uma ação | src/ds/chrome/Rodape.jsx |
| processo correndo | src/ds/chrome/Rodape.jsx (primarioDesabilitado + explicacao; pe 'botao', o pé de 32 com a explicação da T05/10 · C6) |
| com legenda | src/ds/chrome/Rodape.jsx (legenda, a 6 + 8 do botão; legendaJunta, a legenda só com o vão, a 8 do botão — T13 · C10, decisão 38) |
| folha | src/ds/chrome/Folha.jsx + Veu.jsx (conteúdo: CartaoDaConta, PrazoDaConta, BotaoDaFolha; folga 12 e subtitulo na de trocar de unidade · C5, T04/07; aoTocarFora no Veu, o toque no véu fecha a folha, T04 · o cartão do que a sessão prendeu é peça da T04, pecas.jsx · a última entrega, lei 20: toda folha fecha no X, tocando fora, arrastando pra baixo e no voltar — a Folha se registra no Veu em volta (FechaPeloVeu) e o toque fora chama o aoFechar dela, sem a tela passar nada; o arraste é da Folha, por pointer events e só transform: acompanha o dedo depois de --folha-arraste-folga (8), fecha soltando depois de --folha-arraste-limite (56), no fechar de sempre (150), e volta antes, no subir (200); o toque que virou arraste não chega em nada; o voltar é da tela, useVoltar · T01/04 e 11, T04/05, 07, 10 e 11, scripts/caminhos/folhas.mjs) |
| diálogo | src/ds/chrome/Dialogo.jsx (+ Frase, Destaque; a saída a 8 do primário, com o desenho de 44 e o toque de 48 crescendo só pra baixo: a de sempre come 5 embaixo, T04/09, 13, T13/10, e a saidaDe44 come 4, T04/06 · decisão 38) |
| diálogo sem saída | src/ds/chrome/Dialogo.jsx (sem saida; margem 24, o aviso do acesso sobre o menu inteiro — T04/12, entrega de 25/09) |
| diálogo com ciência | src/ds/chrome/Dialogo.jsx (ciencia → primitivos/Checkbox.jsx) |
| folha com opções | src/ds/chrome/Folha.jsx + LinhaDeOpcao.jsx (CartaoDeOpcoes · fecha no xis, e como toda folha, lei 20 · a folha Outras ações da T11/03 leva a linha de opção com o efeito, LinhaDeOpcao variante 'efeito', e puxador={false}, a folha sem o puxador, como a T11/03 desenha — arrasta igual · a última entrega · o espécime f2-folha-outras-acoes, fora da bancada) |
| barra do sistema sob o véu | src/ds/chrome/BarraDoSistema.jsx (veu) |

## Folha 3 · glifos icones poco

| Peça | Componente |
|---|---|
| escolha numa lista | src/ds/linhas/LinhaEscolha.jsx (poço de 30 com o Quadrado · decisão 29; escolhivel: a vencida também se escolhe, T02·1 · C4; sem o `valor`, nada à direita: a linha da empresa, o nome e a contagem de unidades — T02/05 e 07, a otimização do design, e T02/08, a já marcada, a otimização 400; a vencida que se escolhe guarda o quadrado no poço por cima do traço, e o lima surge no toque como em toda escolha, e some na volta — parada, a mesma linha · C12·20) |
| os glifos de estado | src/ds/primitivos/Glifo.jsx (ESTADOS; fora da folha, fora de ESTADOS: traco-circulo, o não se aplica da assertiva da sessão · C11, T16/02 e 05; sem-conexao, o Wi-Fi inteiro com o risco, riscado(Wifi) de primitivos/Riscado.jsx, cinza, no SEM CONEXÃO do login · a última entrega, lei 21, T01/14 — o sem-sinal e o sem-sinal-neutro dos doze levam o mesmo riscado(Wifi) desde a revisão de 26/09 (lei 21, o WifiOff saiu; as referências deles desenham o risco sem o fio escuro, pro arquiteto); info, o Info do Lucide, cinza e sem nome — mudo pro leitor, aria-hidden —, na linha de condição da versão ilegível · a última entrega, T11/04) |
| os ícones de ferramenta | src/ds/primitivos/Icone.jsx (ICONES; subindo: a seta do SUBINDO AGORA, com o traço 2,2 do glifo · C11, T15/01; xis-mini: o xis solto de 14 do não confere, traço 2,6 · a entrega de 25/09, T10/10; bluetooth-desligado: o Bluetooth riscado de 22 no poço de 44, traço 1,8 · o mundo real, T05/16 e 17; camera-negada: a câmera riscada de 46 no visor da câmera sem a permissão, traço 1,8 · o mundo real, T10/11 — os dois, desde a última entrega (lei 21), o ícone inteiro do Lucide com o Risco (primitivos/Riscado.jsx: riscado(Bluetooth), riscado(Camera)), e não mais o BluetoothOff e o CameraOff; o olho-riscado leva o mesmo Risco; diagnostico: o file-text do Lucide no poço de 32 da folha Outras ações · a última entrega, T11/03) |
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
| passo do ciclo | src/ds/linhas/LinhaChecagem.jsx (variante passo; recheioCausa: o passo reprovado com a causa, 'largo' 8 no meio da lista e 'justo' 4 no teste do cartão, a causa na entrelinha normal, e não na --entrelinha-detalhe — T14/03 e 04 · C10) |
| assertiva da sessão | src/ds/linhas/LinhaChecagem.jsx (variante dupla; valorQuebra, o valor longo em duas linhas à direita · C11, T12·2 — sem uso nas telas desde a última entrega, o detalhe da T12 passou à variante recebimento; o nome aceso em todo estado, o não se aplica com o traco-circulo e o ainda não com o relógio em --tinta-secundaria, folgaFim 'assertiva', a última de 54, e lendo, a assertiva que ainda não acendeu · C11, T16; variante recebimento, o que o servidor recebeu, um critério por linha: o porquê embaixo do título (porque), o veredito à direita, 58 com 8 em cima e embaixo (--linha-com-porque), estados aprovada, indisponivel (o traço em --marca-limite, o veredito apagado), pendente (o relógio de 16, o veredito em --tinta-secundaria) e reprovada, o glifo mudo · a última entrega, T12/01, 04 e 05, decisão 41 · espécimes f4-recebimento e f4-recebimento-pendente, fora da bancada) |
| linha de conferência | src/ds/linhas/LinhaChecagem.jsx (variante conferencia: o poço de 32 com o glifo de 16, a Conexão com os 50 das outras; estado diverge, o xis vermelho, e par, no módulo em vermelho e no cadastro em --tinta-secundaria embaixo do nome, a 3, com 10 em cima e embaixo; valorAceso, o valor em --tinta, T11/01; lendo, o relógio no poço e a linha do módulo esperando; acende, o glifo e a linha do módulo esmaecem em 150 · a entrega do checklist, T11) |
| seção aberta do checklist | src/ds/checklist/SecaoDoChecklist.jsx (aberta, com os itens de leitura — a mesma peça da seção aberta · de leitura da folha 7 · a entrega do checklist, decisão 34; a CabecaSecao do C10 saiu) |
| seção recolhida | src/ds/checklist/SecaoDoChecklist.jsx (fechada — a mesma peça da seção fechada da folha 7 · a entrega do checklist) |
| passos com o prazo estourado | src/ds/linhas/Lista.jsx (recheio passos) + LinhaChecagem.jsx |
| disponível | src/ds/cartoes/CartaoFerramenta.jsx (+ GradeFerramentas.jsx) |
| decide agora | src/ds/cartoes/CartaoFerramenta.jsx (largo, estado decide; poço 30 com a sessão aberta · C5) |
| conectado | src/ds/cartoes/CartaoFerramenta.jsx (largo; com a sessão aberta, o toque abre a folha do que ela prendeu, T04/10 e 11 · o travado do C5 saiu, HU-T16-2) |
| com pendência | src/ds/cartoes/CartaoFerramenta.jsx + Contador.jsx |
| espera | src/ds/cartoes/CartaoFerramenta.jsx (estado espera; sem folga entre o poço e o nome, como a folha 4 desenha; largo, o ativo que espera o módulo · C5) |
| espera a rede | src/ds/cartoes/CartaoFerramenta.jsx (estado sem-rede) |
| falha | src/ds/cartoes/Aviso.jsx (tom falha; mudo, o glifo calado pro leitor, G15 · C4, T03/01 e 03; bloqueio, sem poço, 14 em volta, o rótulo de topo e a frase de duas orações, A HOMOLOGAÇÃO FICA BLOQUEADA, Lei 7 · exceção · C11, T16/05) |
| aviso | src/ds/cartoes/Aviso.jsx (tom neutro; semPoco no da folha de trocar de unidade, Lei 7 · C5, T04/08; traco, o traço cinza embaixo, na cor do rótulo, do SEM CONEXÃO do login · o mundo real, T01/14) |
| processo parado | src/ds/cartoes/Aviso.jsx (glifo xis) |
| com contagem | src/ds/cartoes/Aviso.jsx (numero, unidade: o poço de 32 com o glifo de 16, a folha 4 nova · a entrega do checklist, T11/00 e 01; tom veredito, o que confere em lima, sem poço, 12 · 14 · C11, T11/02) |
| vazio declarado | src/ds/cartoes/Vazio.jsx (também a busca sem resultado, com o termo no título — T02/03, T06/08 · entrega de 25/09) |
| nota tracejada | src/ds/cartoes/Nota.jsx (tom explica; corpo secundario, a frase de 13 da T03/04 · C4; corpo pulado, a frase de 13 em --tinta-secundaria · C11, T16/04 — desde a otimizacao300000000, uma peça só: a caixa em bloco com a frase em linha, sem o rótulo, e o text-wrap: balance na caixa; corpo item, a frase de 13 em 400 do ISTO NÃO SE MARCA À MÃO · C10, T13/09) |
| nota com rótulo | src/ds/cartoes/Nota.jsx (tom fato; tom achado, o que a leitura achou e não classifica, com a borda do poço, 10 · 12 · C11, T11/01) |
| o par comparado | src/ds/cartoes/ParComparado.jsx (veredito: quando batem, NO CADASTRO em lima e a frase em 600 · C8, T06/01) |
| linha do histórico | src/ds/linhas/LinhaHistorico.jsx (tom do veredito: espera em --tinta, falha em --vermelho; detalheTam legenda, a linha de baixo em 12 quando diz há quantos dias; o veredito longo quebra em duas linhas · C11, T12) |
| linha da fila · esperando | src/ds/linhas/LinhaFilaEsperando.jsx (→ LinhaFila.jsx estado espera: 50, com o poço de 32 · o poço na linha, a entrega do checklist) |
| linha de unidade | src/ds/linhas/LinhaGaragem.jsx (o nome interno fica, decisão 37; o espécime f4-garagem, com o rótulo da folha 4, *linha de garagem*; estado espera: a troca espera o envio · C5, T04/08; a vencida diz só a causa, no lugar do pacote, e saiu o `aviso`, o que fazer embaixo · a entrega do checklist, T04/07 e 08, folha 4) |
| linha de unidade · a atual | src/ds/linhas/LinhaGaragem.jsx (estado atual) |
| a lista de unidades | src/ds/linhas/Lista.jsx + LinhaGaragem.jsx |

## Folha 5 · instrumentos cadeia processo

| Peça | Componente |
|---|---|
| leitura na faixa | src/ds/instrumentos/Leitura.jsx (+ Escala.jsx; corre: a leitura que chega leva o marcador de onde estava até o valor, em --mov-lento, desacelerando — montar não anima · C12·30) |
| fora da faixa | src/ds/instrumentos/Leitura.jsx (fora; a falha que chega depois de montar: a camada da borda vermelha e a causa esmaecem em --mov-rapido, e o lugar da causa abre direto, G24 · C12) |
| leitura pequena | src/ds/instrumentos/LeituraPequena.jsx (+ GradeLeituras; folga 10 na T07 · sem faixa, o nível, sem a faixa na escala · semLeitura, o sinal que não chegou, T07/02 · C8) |
| leitura com mínimo | src/ds/instrumentos/LeituraPequena.jsx (faixa aberta) |
| tambor | src/ds/instrumentos/LeituraTambor.jsx (+ Tambor.jsx, RodaDigito.jsx; rola na troca de valor — a chegada da T07, das rodinhas na casa 0 até o lido —, nunca ao montar; `de`, só pra peça que nasce no meio do movimento · C12·30) |
| sinais liga-desliga | src/ds/instrumentos/Sinais.jsx (o check do sinal que chega depois de montar esmaece em --mov-rapido · C12·30) |
| instrumentos apagados | src/ds/instrumentos/Declarado.jsx (texto) |
| cadeia concluída | src/ds/instrumentos/Cadeia.jsx (+ Trilho.jsx) |
| cadeia recusada | src/ds/instrumentos/Cadeia.jsx (justa; altura correndo, a cadeia gravando com o quadrado de agora e os que esperam com a versão apagada, elo de 86, T09/00 · altura pausada, a cadeia parada com o contador e o aviso, o elo pausado e os pendentes em traço, elo de 68, T09/02 e 03 · C9) |
| segmentado | src/ds/instrumentos/Segmentado.jsx (folga 8 na recuperação da T01; segmento atual-falha, o passo atual reprovado em vermelho — T13/09 · C10) |
| a pré-condição dos pinos | src/ds/instrumentos/Precondicao.jsx (estado info: a linha de condição da conferência, a versão que não se lê — o i no círculo, cinza e mudo · a última entrega, T11/04) |
| encerrando | src/ds/instrumentos/Encerramento.jsx (+ Trilho.jsx; estado pausa, o bloco em que a sessão interrompida parou, com o nome e o 'parou aqui' em --tinta e o trilho na divisória · C11, T16/06) |
| pede o corte | src/ds/instrumentos/Encerramento.jsx (justo, energia) |
| sem homologar | src/ds/instrumentos/Encerramento.jsx (pulado, o traço solto da folha 5 · no espécime f5-sem-homologar e na T16/03, o passo que o encerrar sem homologar pula — o 'não se aplica' é só da assertiva do autoteste, otimizacao300000000 · o traço do pulado é mudo pro leitor, aria-hidden, e a situação diz 'pulado') |
| cronômetro | src/ds/instrumentos/Prazo.jsx (falha: o prazo estourado, o número em vermelho e a escala sem o preenchido; detalhe em lista: as frases do estado, uma por linha, na entrelinha da legenda — T14/02 · C10; segue: o tique do prazo, e a barra drena contínua, um trecho linear por tique — C12·40) |
| prazo cheio | src/ds/instrumentos/Prazo.jsx (detalhe) |
| a barra do checklist | src/ds/instrumentos/BarraDoChecklist.jsx (o lima do que passou por scaleX, e o número fica no título; no lugar do placar da homologação, que saiu com a entrega do checklist — T13/00 a 14; de: a volta do nível do item, que nasce no que tinha e avança em --mov-lento — C12·36) |

## Folha 6 · entrada escolha cabecalho

| Peça | Componente |
|---|---|
| com contador neutro | src/ds/entrada/CabecalhoConteudo.jsx; o contador do veredito, em lima quando tudo aprova (11 de 11) · C6; forte, o contador em 700, o veredito da instalação no detalhe (T12/01) · C11; subtitulo, a linha de 12 embaixo do título, a 4 (T16/03 e 06, desde a resposta de 26/09; o folgaSubtitulo 6 ficou sem uso) · C11 |
| com contador de falha | src/ds/entrada/CabecalhoConteudo.jsx (tom falha) |
| a marca no login | src/ds/entrada/Marca.jsx (a assinatura da otimização do design: o nome com a largura da logo, `--marca-largura`, os fios crescendo até as bordas dela e o rótulo sem o espaço do letter-spacing depois do último R — nas seis telas do login, de 82 a 278) |
| campo | src/ds/entrada/Campo.jsx |
| campo focado | src/ds/entrada/Campo.jsx (focado, + TracoFoco.css) |
| senha visível | src/ds/entrada/Campo.jsx (sem oculto: a senha por extenso, e a troca esmaece no lugar em --mov-rapido) + primitivos/SoIcone.jsx (olho-riscado, o olho do Icone com o risco; o nome Ocultar a senha vem da tela — a entrega de 24/09, T01/10) |
| usuário lembrado | src/ds/entrada/Campo.jsx (lembrado: o xis de limpar no lugar do olho, o `limpar` do Icone, de 18, em --tinta-secundaria e com o traço --traco-limpar, no poço sem o recheio da direita; rotuloLimpar e aoLimpar vêm da tela — a otimização do design, T01/16) |
| requisitos da senha | src/ds/entrada/Requisito.jsx (+ Requisitos) |
| código · seis células | src/ds/entrada/Codigo.jsx (focoEm: o traço fora do próximo dígito, T01/06) |
| código errado | src/ds/entrada/Codigo.jsx (errado) |
| link dentro do conteúdo | src/ds/entrada/LinkConteudo.jsx |
| botões só de ícone | src/ds/primitivos/SoIcone.jsx |
| checkbox | src/ds/primitivos/Checkbox.jsx (Poco de 24 com o Quadrado vazado · decisão 29; legenda: o título em 14/600 e a linha de baixo em 12 --tinta-secundaria, a 2 — o nome pro leitor é o título, e a linha é a descrição · a última entrega, a caixa do não conforme, decisão 39; o pressionado: a camada --elevado na área de 48, por baixo do poço e do texto, que solta em --mov-solta, como a linha tocável · C12·17, G14 a) |
| checkbox marcado | src/ds/primitivos/Checkbox.jsx (marcado: o Quadrado lima de 11) |
| campo de busca | src/ds/entrada/Busca.jsx (a dica é texto por cima do campo vazio, não placeholder · C4; focado: em foco, o traço de baixo vira 2 de lima e acende como o campo focado, TracoFoco.css, e o termo sai com os números tabulares — T02/03, T06/08 · entrega de 25/09; a lista que ela filtra se reorganiza pelo useReorganiza, ao lado da Lista · C12·10) |
| justificativa | src/ds/entrada/Justificativa.jsx (+ CampoTexto.jsx; a caixa do não conforme nas duas telas do item, com o título e a linha de baixo, `legenda`, que o Checkbox desenha, e o rótulo O QUE ACONTECEU, que vem da tela · a última entrega, decisão 39, folha 6, T13/07, 08 e 15 · o espécime da desmarcada, f6-justificativa-desmarcada, fora da bancada) |
| linha de opção | src/ds/chrome/LinhaDeOpcao.jsx (+ CartaoDeOpcoes · variante 'efeito', a linha da ação com o efeito embaixo: 58 com 8 em cima e embaixo (--linha-com-porque), 10 entre as partes, o ícone de 16 no poço de 32, o que faz em 15 e o efeito em 12, a seta em --tinta-secundaria · a última entrega, a folha Outras ações, T11/03, decisão 40 · o espécime f6-linha-opcao-efeito, fora da bancada · o detalhe numa linha só, com reticências, pelas folhas 2 e 6 de 24/09 · `espera`, T01/04 e 11: a saída que espera o reenvio, apagada e desabilitada de verdade, com a contagem no lugar da seta — `--n-espera`, no tokens.css —; ao liberar, a seta entra e a linha acende, duas camadas trocando por opacity em --mov-rapido (a cópia apagada do texto é um span vazio com aria-hidden que o CSS preenche, como no Link: o leitor lê cada texto uma vez) · a `desabilitado` do C4 saiu, trocada pela `espera`) |
| linha de módulo | src/ds/entrada/LinhaModulo.jsx (fim: a última de 56 da T05/00; escolha: o marcador de escolha e o firmware, 72 e a última de 76, da T05/01 · C6) |
| linha de ônibus | src/ds/entrada/LinhaOnibus.jsx (a última da lista com 72, como as outras, só sem a divisória · a entrega do checklist, T06/00; o `fim` de 78 do C8 saiu) |
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
| seção fechada | src/ds/checklist/SecaoDoChecklist.jsx (o cartão de 58: o veredito no poço de 32, o nome, quem age, a contagem e a seta; estado aprovada, pendente, aguarda e reprovada; sem quem age, só o nome — G25 · a entrega do checklist, T13) |
| seção aberta · de leitura | src/ds/checklist/SecaoDoChecklist.jsx (aberta: a seta vira pra cima e os itens entram embaixo da cabeça, atrás da divisória; aberta por um toque, os itens esmaecem) + SecoesDoChecklist.jsx (a lista das seis, a 8: as de baixo descem por transform) |
| seção aberta · de tocar | src/ds/checklist/SecaoDoChecklist.jsx (aberta, com os itens de tocar e o feito) |
| item de leitura | src/ds/checklist/ItemDoChecklist.jsx (tipo leitura: 44, o poço de 30; apagado, o valor que ainda não veio, 'a fazer' e 'espera o envio'; o glifo pelo dado — ok, pendente, aguarda, reprovado, nsa) |
| item de tocar | src/ds/checklist/ItemDoChecklist.jsx (tipo tocar: 50, o ícone no poço de 32 e a seta; sem desenho na entrega, o automático que falta, com o ícone da ferramenta e 'a fazer', e o reprovado, com o X e a leitura — T13) |
| item feito | src/ds/checklist/ItemDoChecklist.jsx (tipo feito: 50, o check no poço de 32, sem seta e sem toque; sem legenda, a foto tirada aqui — G25; estado nsa, o traço no lugar do check, a foto que não se aplica e o Painel sem calibração na sessão) |
| item com ressalva | src/ds/checklist/ItemDoChecklist.jsx (tipo ressalva: o desenho do feito, com a ressalva na legenda) |
| o veredito | src/ds/checklist/VereditoDoChecklist.jsx (surge: o que nasce do toque no Finalizar esmaece em --mov-rapido — T13/11, 14) |
| foto · a tirar | src/ds/checklist/FotoProva.jsx (o cartão tocável inteiro, com a câmera no poço de 44 e a seta · a entrega de 25/09, decisão 33) |
| foto · tirada | src/ds/checklist/FotoProva.jsx (tirada: o registro no lugar do cartão, o check lima, sem seta e sem toque · na T13/15, o registro do problema no lugar da câmera do item, decisão 39; sem movimento próprio: o registro que nasce de um toque entra com o que esmaece em volta dele — na T10, a troca da volta da câmera; na T13/15, a lista que se reorganiza — e nada esmaece duas vezes · C12·42) |
| mostrador · apagado | src/ds/checklist/Mostrador.jsx (apagado) |
| mostrador · relendo | src/ds/checklist/Mostrador.jsx (relendo; unidade junto do valor · C8, T08/01) |
| mostrador · aceso | src/ds/checklist/Mostrador.jsx (aceso; unidade junto do valor · C8, T08/02) |
| a ação da seção | src/ds/checklist/ItemDoChecklist.jsx (tipo tocar, com o ícone do ciclo — Fazer o ciclo dinâmico, a única da Seção E, T13/05) |
| a câmera do app | src/ds/checklist/VisorCamera.jsx (a do painel, T10/06, e a do item manual, T13/07 e 08; semPermissao, a câmera riscada, a frase do que falta e a explicação apagada — T10/11; na T13, só a câmera riscada, G25 · o mundo real) |
| bloco do evento | src/ds/checklist/BlocoEvento.jsx (nome: o nome do relógio pro leitor, pelo dado — 'ainda não' antes do disparo; feito, o relógio fica no lugar e mudo — T14 · C10, G15) |
| linha da fila | src/ds/linhas/LinhaFila.jsx (reexportada por checklist/LinhaFila.jsx; posicao: a altura pela posição na lista, 'meio' 50 e 'fim' 62, em qualquer estado · C11, T15/01, T15-V2; o poço pela altura, 32 na de 50 e 30 na de 62 · o poço na linha, a entrega do checklist) |
| linha da re-checagem | src/ds/checklist/LinhaRechecagem.jsx |
| prova da cadeia | src/ds/checklist/Prova.jsx (tipo cadeia; também a versão lida no módulo, T11/02 · C11; legendaMuda, a legenda que espera a última linha da conferência, muda pro leitor — T11/02, a decisão do diretor de 25/09; surge: a prova que aparece depois de a tela abrir, sem lugar reservado, esmaece no lugar em --mov-rapido — a cadeia concluída ao vivo, T09 · C12·9) |
| prova da sessão | src/ds/checklist/Prova.jsx (tipo sessao) |
| contador no menu | src/ds/cartoes/Contador.jsx (+ CartaoFerramenta.jsx) |

## Folha 8 · calibracao

| Peça | Componente |
|---|---|
| valor em poço | src/ds/instrumentos/Calibracao.jsx · ValorEmPoco (+ Tambor.jsx; tom falha: a releitura que não confere, o número em vermelho · T10/10) |
| régua da diferença | src/ds/instrumentos/Calibracao.jsx · ReguaDiferenca (confere; falha: o xis solto e a frase em vermelho · T10/10; o veredito que chega depois de montar: a diferença encolhe e esmaece em --mov-lento, e o veredito entra em --mov-rapido · C12·34) |
| o valor alvo | src/ds/instrumentos/Calibracao.jsx · ValorAlvo (o lima é o campo em foco, T10/05; cumprido: o número fora do foco, sem o lima, T10/01, 07, 09, 10; foco; campo: o input numérico por cima do poço, sem desenho) |
| o painel · vazio | src/ds/instrumentos/Calibracao.jsx · ValorAlvo (vazio: o traço em --marca-limite, sem o lima · a entrega de 25/09) |
| o que não se aplica | src/ds/instrumentos/Declarado.jsx (linhas) |

## Peças internas, sem linha própria

- chrome/CartaoDaConta.jsx, PrazoDaConta.jsx e BotaoDaFolha.jsx, o conteúdo da 'folha' da conta, T04/05
- chrome/Avatar.jsx, na tira e no cartão da conta
- chrome/Veu.jsx, o véu da folha e do diálogo (FechaPeloVeu: a folha que mora nele se registra, e o toque no véu a fecha · lei 20; troca e corte: na troca do PorCima, o véu fica aceso e parado, e onde ele cresce só o pedaço novo esmaece em --mov-rapido · C12·27, C12·43)
- chrome/Troca.jsx, a troca, sem desenho próprio (C12): `RaizDaTroca` e `emToque` no App — entre telas, só o conteúdo (o miolo, o rodapé e o que está solto no fluxo) esmaece em --mov-rapido, e só num toque ou no voltar · C12·2, C12·3; `useTrocaDeQuadro(chave)` e `<TrocaDeQuadro chave>`, o mesmo esmaecer quando o quadro troca inteiro dentro da tela · C12·4 — o quadro que troca inteiro dá ao miolo e ao rodapé a chave dele, pra nascerem com ele, e o texto do primário não esmaecer de novo por dentro da troca (a T05; a T02, as empresas e as unidades, no fechamento da otimização 400); `useFimDaTroca()`, a espera do processo que só começa depois da troca (T07, T09, T11) · C12·35 · espécimes mov-troca e mov-troca-quadro
- chrome/PorCima.jsx, a presença, sem desenho próprio (C12): `usePresenca` (uma coisa por cima: a folha ou o diálogo nascem fechados e abrem no mesmo quadro, e o que sai fica desenhado até acabar de sair) e `usePorCima` + `<PorCima>` (a folha e o diálogo que se revezam no mesmo véu, parado · C12·27, C12·43) — T01, T02, T04, T11, T13 e o Encerrar sem homologar? de toda tela (src/estado/encerrar.jsx) · o src/telas/T01/presenca.js saiu · espécime mov-porcima
- chrome/Faixa.jsx · `ausente` (a faixa que ainda não nasceu: quando a pré-checagem aprova, desce em --mov-padrao por baixo da barra, e o que ela empurra acompanha por deslocamento · T05, C12·24) e `revela` (a sem sessão que chega no lugar da aberta, que sobe em --mov-padrao · T16, C12·25) · a barra do sistema fica por cima do app (--camada-sistema) e troca a cor direto · espécimes mov-faixa-nasce, mov-faixa-encerra e mov-faixa-encerrar
- entrada/foco.js · `useFocoDoCampo`, um foco só: o que a tela diz, ou o do próprio campo, nunca o do que está dentro do poço (o olho, o xis) · o Campo, a Busca, o CampoTexto e o ValorAlvo · C12·21 · o traço de 2 por cima da borda de 1, a capa em scaleX (TracoFoco.css) · C12·22, C12·45
- o movimento que as peças de linha já têm (C12): o `Glifo` esmaece o glifo que troca depois de montar (`esmaece`, `chave`), e quem liga é a LinhaChecagem, a LinhaContagem, o Trilho e o Aviso · C12·12; o `Aviso` ganhou `surge` (o aviso que aparece depois de a tela abrir) e `aguarda` + `aguardaUnidade` (o veredito que espera a prova, com a contagem · T11, T16/05 · C12·35, C12·44); a `Prova` ganhou `aguarda` ('legenda', ou a contagem no lugar da versão · T11/02, T16/02); a `Justificativa` esmaece o campo que abre e deixa o que fecha sair esmaecendo por cima · C12·47, C12·6; o `Encerramento` esmaece a legenda que passa ao passo que corre · C12·9; o `Tocavel` e o `Primario` não soltam o pressionado no que se desabilita no próprio toque · C12·18 · espécimes mov-check-* (mov-check.jsx)
- primitivos/Riscado.jsx, o ícone riscado (lei 21): `riscado(IconeDoLucide)` e o `Risco` — o ícone inteiro, e por cima o risco de 3,5 a 20,5 com o corte da cor do poço por baixo (--risco-corte, que era --olho-corte) · o Wi-Fi (Glifo sem-conexao, T01/14), o Bluetooth (Icone bluetooth-desligado, T05/16 e 17), a câmera (Icone camera-negada, T10/11 e o item do checklist) e o olho da senha (Icone olho-riscado, T01/10) · o espécime f3-riscados, fora da bancada
- chrome/Camadas.jsx, interna (a camada do toque repete a frase por CSS, como o Link · C5)
- chrome/Dialogo.jsx · Frase, Destaque; chrome/LinhaDeOpcao.jsx · CartaoDeOpcoes
- linhas/Lista.jsx, o cartão de lista de todas as linhas (surge: a cascata da lista que a busca acha, uma linha a cada --mov-escalonar-lista, 150 cada — a T05/01 que volta da busca de novo, C12·28 e C12·41; ao abrir, parada)
- linhas/Reorganiza.js · useReorganiza(chave), a lista que se reorganiza: o layout vai direto pro fim, o que fica desliza do lugar antigo ao novo por transform, o que sai esmaece por cima numa cópia muda, o que volta esmaece no lugar, em --mov-rapido; o cartão corta o que passa da borda e nenhuma altura anima — a busca da T02 e da T06, a fila da T15 · C12·10
- cartoes/GradeFerramentas.jsx (folga 10 no menu da T04 · C5)
- entrada/CampoTexto.jsx, o campo longo da justificativa; entrada/Requisito.jsx · Requisitos, a lista
- instrumentos/Escala.jsx (semLados: a barra do download da T03, o desenho do placar do C10 sem as bordas dos lados · C4; vazia: o poço do sinal que não chegou, só o traço no meio · C8, T07/02; tam envio: a barra de 16 do item que sobe, com os riscos e o marcador da barra pequena · C11, T15/01; tam item: a barra de 22 do instrumento do item reprovado · C10, T13/09; segue (ms): o processo em passos, o marcador e o preenchido lineares, um trecho por passo vezes o --mov-fator · C12·15; corre: a leitura que chega, em --mov-lento · C12·30 — montar nunca anima), Trilho.jsx, Tambor.jsx, RodaDigito.jsx (G29) e LeituraPequena.jsx · GradeLeituras
- checklist/GradeCartoes.jsx, a grade de duas ou três colunas, a 8: era a dos cartões de valor e de foto do checklist do C10, que saíram com a entrega do checklist; fica pelos mostradores da T08
- a câmera do app tem linha na folha 7 desde a entrega do checklist, e o espécime dela entrou na bancada (f7-visor-camera); os dois sem a permissão seguem na vitrine, fora da bancada (f7-visor-sem-permissao, f7-visor-sem-permissao-item)
