# Os componentes

Cada peça abaixo está **desenhada numa folha** de `referencias/` e foi **recortada da tela onde foi aprovada**. Construa cada uma como componente, uma vez, e use em todas as telas da lista.

Cada linha é um espécime de moldura das folhas (121), e a folha 3 soma quatro linhas pros seus 35 átomos: **125 linhas**. No protótipo, o mapa de cada linha pro componente que a constrói está em `06-prototipo/app/src/ds/MAPA.md`. A coluna *Telas que usam* se corrige pelo medido no ciclo de cada tela (G10).

## Folha 1 · fundamentos · `referencias/png/folha-1-fundamentos.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| primário · normal | roxo com o texto lima · 56 | T01 T02 T03 T04 T05 T06 T07 T08 T09 T10 T11 T12 T13 T14 T15 T16 |
| primário · pressionado | o roxo clareia e afunda 2% | T01 T02 T03 T04 T05 T06 T07 T08 T09 T10 T11 T12 T13 T14 T15 T16 · no toque |
| primário · desabilitado | sem roxo · diz o que está acontecendo | T01 T02 T03 T05 T06 T08 T09 T10 T13 T14 T16 |
| link · normal e pressionado | o cinza vira branco no toque · 48 de toque | T01 T03 T04 T05 T06 T07 T08 T09 T10 T11 T13 T14 T16 |
| linha tocável · normal e pressionada | a base de toda linha que se toca · o pressionado acende o fundo | T01 T02 T04 T05 T06 T11 T12 T13 T15 T16 |

## Folha 2 · chrome rodape folha dialogo · `referencias/png/folha-2-chrome-rodape-folha-dialogo.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| barra do sistema | desenho do Android · não é do app | T05 T06 T07 T08 T09 T10 T11 T12 T13 T14 T15 T16 |
| barra do sistema no menu | sobre o fundo da tira | T04 |
| barra do sistema sem sessão | a cor da página — ela sangra no que vem embaixo | T01 T02 T03 T05 |
| faixa · sessão aberta | LED lima, serial, placa e o ENCERRAR | T07 T09 T10 T13 T14 T15 T16 |
| faixa · sem sessão | LED apagado · só o fato | T04 T12 T15 T16 |
| faixa · módulo com falha | o serial sai · LED vermelho · variante: no menu, o traço vermelho por cima, sem roubar altura (T04) | T04 |
| faixa · sem ação | na tela que ela abriu — o encerramento | T05 T06 T07 T08 T09 T10 T11 T12 T13 T14 T15 T16 |
| tira de contexto | só no menu · a garagem e a conta | T04 |
| faixa no menu | 50 em vez de 52 · embaixo da tira | T04 |
| o topo do menu inteiro | tira e faixa juntas | T04 |
| duas ações | primário 56 · link com 48 de toque · variante: o rodapé do login, sem o traço em cima, 20 dos lados e 28 no pé (T01) | T01 T03 T05 T06 T07 T08 T09 T10 T11 T13 T14 T16 |
| uma ação | quando só existe um caminho | T02 T03 T05 T06 T08 T09 T11 T12 T15 T16 |
| processo correndo | o primário diz o que acontece | T03 T05 T06 T07 T08 T09 T10 T11 T13 T14 T16 |
| com legenda | uma linha que explica a ação, a 12px do botão | T05 T06 T07 T08 T09 T10 T11 T13 T14 T16 |
| folha | sobe do rodapé · puxador · X · variante: folga 12 e uma frase embaixo do título, a de trocar de garagem (T04) | T01 T04 |
| diálogo | só pra ação que encerra trabalho | T04 T13 |
| diálogo sem saída | quando o que aconteceu já está feito · uma ação só | T01 T13 |
| diálogo com ciência | o técnico assina a decisão · o primário espera o check | T13 |
| folha com opções | cada saída numa linha, com o que ela faz | T01 |
| barra do sistema sob o véu | escurece junto quando não há tira | T01 |

## Folha 3 · glifos icones poco · `referencias/png/folha-3-glifos-icones-poco.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| escolha numa lista | o quadrado lima cheio é o escolhido · variante: escolhível, a garagem vencida também se escolhe (T02) | T02 |
| os glifos de estado | doze, um por natureza · com o nome pro leitor de tela | todas, dentro das peças · sem uso nas 105: ok cinza |
| os ícones de ferramenta | dez, do Lucide, no traço dos tokens | T04 e as telas das ferramentas · sem uso nas 105: o ativo de Últimas instalações |
| os poços | oito tamanhos, de 22 a 44 | todas, dentro das peças · sem uso nas 105: 22, 28 e 44 |
| os marcadores | o quadrado do escolhido e os LEDs | T02 T04 T05 T06 T07 T09 T10 T13 T14 T15 T16 |

## Folha 4 · linhas cartoes aviso · `referencias/png/folha-4-linhas-cartoes-aviso.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| aprovada | check lima · valor em --tinta-secundaria | T05 |
| reprovada, com causa | X, título e valor em vermelho · a causa embaixo | T05 |
| não se aplica | traço · depende de outra que reprovou | T05 |
| parou aqui | o processo caiu nesta | T05 |
| ainda não | círculo apagado · valor em traço | T05 |
| pré-checagem | compacta · 38 | T05 |
| pré-checagem com sessão | a mesma 38 — a exceção acabou | T05 |
| passo do ciclo | compacta · 38 | T14 |
| assertiva da sessão | dupla · 50 | T11 T12 T16 |
| linha de conferência | dupla · 50 | T11 T12 T16 |
| seção aberta do checklist | a cabeça do acordeão | T13 |
| seção recolhida | as outras, embaixo da aberta | T13 |
| passos com o prazo estourado | a lista inteira da T14 | T14 |
| disponível | ícone em poço · nome embaixo · variante: a grade com 10 entre os cartões, no menu (T04) | T04 |
| decide agora | borda lima · o próximo passo · variante: poço 30 com a sessão aberta (T04) | T04 |
| conectado | o cartão largo com o serial · variante: travado, com a sessão aberta mostra o que ela prendeu e não se toca (T04) | T04 |
| com pendência | o contador no canto, igual ao da fila | T04 |
| espera | tracejado · a causa no lugar da ação · variante: o cartão largo, o ativo que espera o módulo (T04) | T04 |
| espera a rede | sem conexão · fundo apagado, borda sólida, traço no poço | T04 |
| falha | traço vermelho embaixo · variante: o glifo calado pro leitor de tela, o rótulo e a frase já dizem (T03) | T01 T03 T05 T09 |
| aviso | o mesmo desenho, cinza, sem traço · variante: sem poço, só o rótulo e a frase, na folha de trocar de garagem (T04) | T03 T04 T05 T09 T12 T16 |
| processo parado | o veredito de uma cadeia ou de um download | T05 T09 |
| com contagem | quantos não bateram, à direita | T11 |
| vazio declarado | tracejado · título e uma frase · sem ícone | T12 T15 |
| nota tracejada | o que falta explicar, sem ser aviso · variante: a frase em 13, mais aberta, a que diz o bloqueio do pacote (T03) | T03 T05 |
| nota com rótulo | o fato declarado, com o nome dele em cima | T06 T16 |
| o par comparado | lido × cadastro | T06 T15 |
| linha do histórico | placa, módulo e hora · o veredito à direita | T05 T06 T11 T12 T13 T15 T16 |
| linha da fila · esperando | o que ainda não subiu | T15 |
| linha de garagem | na folha · o pacote e a contagem · variante: em espera, não se escolhe até o envio terminar, o traço e o que ela espera no lugar do pacote (T04) | T04 |
| linha de garagem · a atual | o marcador lima de 11px | T04 |
| a lista de garagens | na folha, com as três | T04 T05 T06 T11 T12 T13 T15 T16 |

## Folha 5 · instrumentos cadeia processo · `referencias/png/folha-5-instrumentos-cadeia-processo.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| leitura na faixa | número grande · faixa lima · marcador branco | T07 |
| fora da faixa | borda vermelha · a escala estica | T07 |
| leitura pequena | meia largura | T07 T13 |
| leitura com mínimo | a faixa aberta pra cima | T07 T13 |
| tambor | hodômetro é rolete | T07 |
| sinais liga-desliga | o fato e o check, sem barra | T07 |
| instrumentos apagados | o resumo do que só fecha andando | T07 |
| cadeia concluída | trilho lima | T05 T06 T09 T11 T12 T13 T14 T15 T16 |
| cadeia recusada | o elo que falhou acende | T05 T06 T09 T11 T12 T13 T14 T15 T16 |
| segmentado | um segmento por passo · variante: folga 8, a da recuperação do acesso (T01) | T01 T10 T13 T14 T16 |
| a pré-condição dos pinos | a primeira linha da configuração, embaixo do título | T09 |
| encerrando | a legenda só no passo que corre | T05 T06 T09 T11 T12 T13 T14 T15 T16 |
| pede o corte | é com você · o único passo em que ele age | T05 T06 T09 T11 T12 T13 T14 T15 T16 |
| sem homologar | só os quatro que deixam o módulo seguro · os pulados com traço | T05 T06 T09 T11 T12 T13 T14 T15 T16 |
| cronômetro | o prazo drena | T14 |
| prazo cheio | antes do disparo · a fila drenando | T14 |
| placar da homologação | a única barra que enche · variante: a barra sem as bordas dos lados, no download do pacote (T03) | T13 |

## Folha 6 · entrada escolha cabecalho · `referencias/png/folha-6-entrada-escolha-cabecalho.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| com contador neutro | o contador conta o que passou | T05 T06 T07 T09 T12 T13 T14 T15 T16 |
| com contador de falha | quantos reprovaram, em vermelho | T05 T06 T07 T09 T12 T13 T14 T15 T16 |
| a marca no login | o logo e CONFIGURADOR entre dois traços | T01 T05 T06 T07 T08 T09 T10 T11 T12 T13 T14 T15 T16 |
| campo | rótulo em cima · poço de 48 | T01 T05 T06 T07 T08 T09 T10 T11 T12 T13 T14 T15 T16 |
| campo focado | rótulo e traço de baixo em lima | T01 T05 T06 T07 T08 T09 T10 T11 T12 T13 T14 T15 T16 |
| requisitos da senha | cada regra vira check quando a senha cumpre | T01 |
| código · seis células | uma célula por dígito · variante: o foco numa célula dada, fora do próximo dígito, como no código expirado (T01) | T01 |
| código errado | as células ficam vermelhas | T01 |
| link dentro do conteúdo | sublinhado · ação sobre o que está perto | T01 |
| botões só de ícone | fechar e mostrar a senha · 44 de desenho, 48 de toque · com nome pro leitor de tela | T01 T04 |
| checkbox | o marcador de escolha, com o texto do que se confirma | T01 T06 T13 |
| checkbox marcado | o mesmo poço com o quadrado lima de 10 · surge em 150ms | T01 T06 T13 · ao marcar |
| campo de busca | lupa e dica · quando a lista é longa · variante: a dica é texto sobre o campo vazio (T02) | T02 T06 |
| justificativa | o não conforme com o porquê | T13 |
| linha de opção | o ícone, o que faz, e pra onde · variante: desabilitada, a saída que ainda não vale, sem toque (T01) | T01 T05 T06 T11 T12 T13 T15 T16 |
| linha de módulo | serial e variante · T05 | T05 |
| linha de ônibus | placa, modelo e frota · T06 | T05 T06 T12 |
| bloco escolhido | traço lima embaixo = escolhido | T05 |
| escolhido com trava | a falha mora no escolhido · T05 | T05 |
| escolhido com trava · T06 | a placa com o motivo embaixo | T06 |
| cartão que pede ação | o erro que precisa dele | T06 T15 |
| botão secundário | fundo --elevado · a ação da linha | T15 |
| tira de leituras | duas colunas · rótulo em cima | T05 |
| lista com contagem | o pacote baixando · variante: o nome pro leitor segue o dado, na baixa que parou a linha diz que parou (T03) | T03 T05 T06 T11 T12 T13 T15 T16 |

## Folha 7 · checklist evidencia · `referencias/png/folha-7-checklist-evidencia.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| linha de seção do mapa | o veredito · a contagem · o chevron | T13 |
| cartões de valor | o valor que veio de outra tela | T13 |
| cartão com barra | o instrumento em meia largura | T07 T13 |
| cartão de configuração | Seção D · o valor que veio da cadeia | T07 T13 |
| cartões de foto | visor de 46 · o nome embaixo | T08 T13 |
| a seção aberta inteira | a cabeça e os cartões, como abrem no acordeão | T13 |
| foto · aguarda | a legenda diz pra que ela serve | T10 |
| foto · tirada | e onde mais ela vale | T10 |
| mostrador · apagado | tracejado · o traço no lugar do valor | T08 |
| mostrador · relendo | acende quando o sinal responde | T08 |
| mostrador · aceso | o nome com altura de duas linhas | T08 |
| cartões que esperam o ciclo | Seção E · o traço até o veículo andar | T13 |
| bloco do evento | o que foi disparado e recebido | T14 |
| linha da fila | o que sobe e quando | T15 |
| linha da re-checagem | a Seção F esperando o servidor | T15 |
| prova da cadeia | a versão gravada e relida | T09 |
| prova da sessão | o que sobreviveu ao reinício | T16 |
| contador no menu | itens na fila, no canto do cartão · a mesma peça do *com pendência* da folha 4 | T04 |

## Folha 8 · calibracao · `referencias/png/folha-8-calibracao.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| valor em poço | o que o módulo conta hoje | T10 |
| régua da diferença | a distância entre os dois · vira "confere" depois | T10 |
| o valor alvo | o número do painel, o que vai pro módulo | T10 |
| o que não se aplica | fato declarado, sem vermelho | T10 |
