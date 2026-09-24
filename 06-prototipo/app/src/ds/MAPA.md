# O mapa das peças

Cada linha do `03-design-system/componentes.md` e o componente que a constrói, em `src/ds/`. Medido no fechamento do C2 (o censo independente); o espécime de cada uma está na vitrine (`?vitrine=1`), e a bancada (`node scripts/especime.mjs todos`) compara com a folha.

Quando uma peça nova entrar, a linha entra aqui e no `componentes.md` no mesmo ciclo.

## Folha 1 · fundamentos

| Peça | Componente |
|---|---|
| primário · normal | src/ds/primitivos/Primario.jsx |
| primário · pressionado | src/ds/primitivos/Primario.jsx (forcaToque na vitrine; :active no app) |
| primário · desabilitado | src/ds/primitivos/Primario.jsx (desabilitado) |
| link · normal e pressionado | src/ds/primitivos/Link.jsx |
| linha tocável · normal e pressionada | src/ds/linhas/LinhaTocavel.jsx, sobre src/ds/primitivos/Tocavel.jsx |

## Folha 2 · chrome rodape folha dialogo

| Peça | Componente |
|---|---|
| barra do sistema | src/ds/chrome/BarraDoSistema.jsx |
| barra do sistema no menu | src/ds/chrome/BarraDoSistema.jsx (fundo tira) |
| barra do sistema sem sessão | src/ds/chrome/BarraDoSistema.jsx (fundo pagina) |
| faixa · sessão aberta | src/ds/chrome/Faixa.jsx |
| faixa · sem sessão | src/ds/chrome/Faixa.jsx (estado sem-sessao) |
| faixa · módulo com falha | src/ds/chrome/Faixa.jsx (estado falha) |
| faixa · sem ação | src/ds/chrome/Faixa.jsx (sem acao, casca da T16 · DS-D5) |
| tira de contexto | src/ds/chrome/TiraDeContexto.jsx (+ Avatar.jsx, Camadas.jsx) |
| faixa no menu | src/ds/chrome/Faixa.jsx (lugar menu) |
| o topo do menu inteiro | src/ds/chrome/TopoDoMenu.jsx |
| duas ações | src/ds/chrome/Rodape.jsx |
| uma ação | src/ds/chrome/Rodape.jsx |
| processo correndo | src/ds/chrome/Rodape.jsx (primarioDesabilitado + explicacao) |
| com legenda | src/ds/chrome/Rodape.jsx (legenda) |
| folha | src/ds/chrome/Folha.jsx + Veu.jsx (conteúdo: CartaoDaConta, PrazoDaConta, BotaoDaFolha) |
| diálogo | src/ds/chrome/Dialogo.jsx (+ Frase, Destaque) |
| diálogo sem saída | src/ds/chrome/Dialogo.jsx (sem saida) |
| diálogo com ciência | src/ds/chrome/Dialogo.jsx (ciencia → primitivos/Checkbox.jsx) |
| folha com opções | src/ds/chrome/Folha.jsx + LinhaDeOpcao.jsx (CartaoDeOpcoes) |
| barra do sistema sob o véu | src/ds/chrome/BarraDoSistema.jsx (veu) |

## Folha 3 · glifos icones poco

| Peça | Componente |
|---|---|
| escolha numa lista | src/ds/linhas/LinhaEscolha.jsx |
| os glifos de estado | src/ds/primitivos/Glifo.jsx (ESTADOS) |
| os ícones de ferramenta | src/ds/primitivos/Icone.jsx (ICONES) |
| os poços | src/ds/primitivos/Poco.jsx |
| os marcadores | src/ds/primitivos/Marcador.jsx (Quadrado, Led) |

## Folha 4 · linhas cartoes aviso

| Peça | Componente |
|---|---|
| aprovada | src/ds/linhas/LinhaChecagem.jsx |
| reprovada, com causa | src/ds/linhas/LinhaChecagem.jsx (causa) |
| não se aplica | src/ds/linhas/LinhaChecagem.jsx |
| parou aqui | src/ds/linhas/LinhaChecagem.jsx |
| ainda não | src/ds/linhas/LinhaChecagem.jsx (estado ainda-nao) |
| pré-checagem | src/ds/linhas/LinhaChecagem.jsx (compacta) |
| pré-checagem com sessão | src/ds/linhas/LinhaChecagem.jsx (compacta) |
| passo do ciclo | src/ds/linhas/LinhaChecagem.jsx (variante passo) |
| assertiva da sessão | src/ds/linhas/LinhaChecagem.jsx (variante dupla) |
| linha de conferência | src/ds/linhas/LinhaChecagem.jsx (variante conferencia) |
| seção aberta do checklist | src/ds/linhas/CabecaSecao.jsx (aberta) |
| seção recolhida | src/ds/linhas/CabecaSecao.jsx |
| passos com o prazo estourado | src/ds/linhas/Lista.jsx (recheio passos) + LinhaChecagem.jsx |
| disponível | src/ds/cartoes/CartaoFerramenta.jsx (+ GradeFerramentas.jsx) |
| decide agora | src/ds/cartoes/CartaoFerramenta.jsx (largo, estado decide) |
| conectado | src/ds/cartoes/CartaoFerramenta.jsx (largo) |
| com pendência | src/ds/cartoes/CartaoFerramenta.jsx + Contador.jsx |
| espera | src/ds/cartoes/CartaoFerramenta.jsx (estado espera) |
| espera a rede | src/ds/cartoes/CartaoFerramenta.jsx (estado sem-rede) |
| falha | src/ds/cartoes/Aviso.jsx (tom falha) |
| aviso | src/ds/cartoes/Aviso.jsx (tom neutro) |
| processo parado | src/ds/cartoes/Aviso.jsx (glifo xis) |
| com contagem | src/ds/cartoes/Aviso.jsx (numero, unidade) |
| vazio declarado | src/ds/cartoes/Vazio.jsx |
| nota tracejada | src/ds/cartoes/Nota.jsx (tom explica) |
| nota com rótulo | src/ds/cartoes/Nota.jsx (tom fato) |
| o par comparado | src/ds/cartoes/ParComparado.jsx |
| linha do histórico | src/ds/linhas/LinhaHistorico.jsx |
| linha da fila · esperando | src/ds/linhas/LinhaFilaEsperando.jsx (→ LinhaFila.jsx estado espera) |
| linha de garagem | src/ds/linhas/LinhaGaragem.jsx |
| linha de garagem · a atual | src/ds/linhas/LinhaGaragem.jsx (estado atual) |
| a lista de garagens | src/ds/linhas/Lista.jsx + LinhaGaragem.jsx |

## Folha 5 · instrumentos cadeia processo

| Peça | Componente |
|---|---|
| leitura na faixa | src/ds/instrumentos/Leitura.jsx (+ Escala.jsx) |
| fora da faixa | src/ds/instrumentos/Leitura.jsx (fora) |
| leitura pequena | src/ds/instrumentos/LeituraPequena.jsx (+ GradeLeituras) |
| leitura com mínimo | src/ds/instrumentos/LeituraPequena.jsx (faixa aberta) |
| tambor | src/ds/instrumentos/LeituraTambor.jsx (+ Tambor.jsx, RodaDigito.jsx) |
| sinais liga-desliga | src/ds/instrumentos/Sinais.jsx |
| instrumentos apagados | src/ds/instrumentos/Declarado.jsx (texto) |
| cadeia concluída | src/ds/instrumentos/Cadeia.jsx (+ Trilho.jsx) |
| cadeia recusada | src/ds/instrumentos/Cadeia.jsx (justa) |
| segmentado | src/ds/instrumentos/Segmentado.jsx |
| a pré-condição dos pinos | src/ds/instrumentos/Precondicao.jsx |
| encerrando | src/ds/instrumentos/Encerramento.jsx (+ Trilho.jsx) |
| pede o corte | src/ds/instrumentos/Encerramento.jsx (justo, energia) |
| sem homologar | src/ds/instrumentos/Encerramento.jsx (pulado) |
| cronômetro | src/ds/instrumentos/Prazo.jsx |
| prazo cheio | src/ds/instrumentos/Prazo.jsx (detalhe) |
| placar da homologação | src/ds/instrumentos/Placar.jsx |

## Folha 6 · entrada escolha cabecalho

| Peça | Componente |
|---|---|
| com contador neutro | src/ds/entrada/CabecalhoConteudo.jsx |
| com contador de falha | src/ds/entrada/CabecalhoConteudo.jsx (tom falha) |
| a marca no login | src/ds/entrada/Marca.jsx |
| campo | src/ds/entrada/Campo.jsx |
| campo focado | src/ds/entrada/Campo.jsx (focado, + TracoFoco.css) |
| requisitos da senha | src/ds/entrada/Requisito.jsx (+ Requisitos) |
| código · seis células | src/ds/entrada/Codigo.jsx |
| código errado | src/ds/entrada/Codigo.jsx (errado) |
| link dentro do conteúdo | src/ds/entrada/LinkConteudo.jsx |
| botões só de ícone | src/ds/primitivos/SoIcone.jsx |
| checkbox | src/ds/primitivos/Checkbox.jsx |
| checkbox marcado | src/ds/primitivos/Checkbox.jsx (marcado) |
| campo de busca | src/ds/entrada/Busca.jsx |
| justificativa | src/ds/entrada/Justificativa.jsx (+ CampoTexto.jsx) |
| linha de opção | src/ds/chrome/LinhaDeOpcao.jsx (+ CartaoDeOpcoes) |
| linha de módulo | src/ds/entrada/LinhaModulo.jsx |
| linha de ônibus | src/ds/entrada/LinhaOnibus.jsx |
| bloco escolhido | src/ds/entrada/BlocoEscolhido.jsx |
| escolhido com trava | src/ds/entrada/BlocoEscolhido.jsx (falha, passos) |
| escolhido com trava · T06 | src/ds/entrada/BlocoEscolhido.jsx (falha, motivo) |
| cartão que pede ação | src/ds/entrada/CartaoAcao.jsx (+ BotaoSecundario.jsx) |
| botão secundário | src/ds/entrada/BotaoSecundario.jsx |
| tira de leituras | src/ds/entrada/TiraLeituras.jsx |
| lista com contagem | src/ds/entrada/LinhaContagem.jsx (+ linhas/Lista.jsx) |

## Folha 7 · checklist evidencia

| Peça | Componente |
|---|---|
| linha de seção do mapa | src/ds/checklist/LinhaSecaoMapa.jsx |
| cartões de valor | src/ds/checklist/CartaoValor.jsx (+ GradeCartoes) |
| cartão com barra | src/ds/checklist/CartaoValor.jsx (medida objeto) |
| cartão de configuração | src/ds/checklist/CartaoValor.jsx (sem medida) |
| cartões de foto | src/ds/checklist/CartaoFoto.jsx (+ GradeCartoes) |
| a seção aberta inteira | src/ds/checklist/SecaoChecklist.jsx (+ linhas/CabecaSecao.jsx) |
| foto · aguarda | src/ds/checklist/FotoProva.jsx |
| foto · tirada | src/ds/checklist/FotoProva.jsx (tirada) |
| mostrador · apagado | src/ds/checklist/Mostrador.jsx (apagado) |
| mostrador · relendo | src/ds/checklist/Mostrador.jsx (relendo) |
| mostrador · aceso | src/ds/checklist/Mostrador.jsx (aceso) |
| cartões que esperam o ciclo | src/ds/checklist/CartaoValor.jsx (aguarda) |
| bloco do evento | src/ds/checklist/BlocoEvento.jsx |
| linha da fila | src/ds/linhas/LinhaFila.jsx (reexportada por checklist/LinhaFila.jsx) |
| linha da re-checagem | src/ds/checklist/LinhaRechecagem.jsx |
| prova da cadeia | src/ds/checklist/Prova.jsx (tipo cadeia) |
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
- chrome/Camadas.jsx, interna
- chrome/Dialogo.jsx · Frase, Destaque; chrome/LinhaDeOpcao.jsx · CartaoDeOpcoes
- linhas/Lista.jsx, o cartão de lista de todas as linhas
- cartoes/GradeFerramentas.jsx
- entrada/CampoTexto.jsx, o campo longo da justificativa; entrada/Requisito.jsx · Requisitos, a lista
- instrumentos/Escala.jsx, Trilho.jsx, Tambor.jsx, RodaDigito.jsx (G29) e LeituraPequena.jsx · GradeLeituras
- checklist/CartaoValor.jsx · GradeCartoes
