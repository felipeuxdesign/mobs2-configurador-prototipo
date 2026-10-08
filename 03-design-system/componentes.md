# Os componentes

Cada peça abaixo está **desenhada numa folha** de `referencias/` e foi **recortada da tela onde foi aprovada**. Construa cada uma como componente, uma vez, e use em todas as telas da lista.

**Cobertura revista em 08/10/2026:** toda folha usa `--veu` sobre o fundo inteiro do app, inclusive tira, faixa e fundo da barra de status; a hora e os ícones oficiais ficam legíveis. Os diálogos do menu da T04 compartilham essa cobertura para preservar o véu nas trocas. A geometria de folhas e caixas não muda. Esta revisão não altera os diálogos fora da T04. [Gate do véu integral](../06-prototipo/para-o-arquiteto/gate-veu-integral.md).

## Folha 1 · fundamentos · `referencias/png/folha-1-fundamentos.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| falha | traço vermelho embaixo | T01 |

## Folha 2 · chrome rodape folha dialogo · `referencias/png/folha-2-chrome-rodape-folha-dialogo.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| barra do sistema | não é do app · cenário fixo: a barra oficial do Android, com o 9:30 · o espaço da câmera reservado, sem desenhar | T06 T07 T09 T10 T11 T12 T13 T14 T15 T16 |
| barra do sistema no menu | sobre o fundo da tira | T04 |
| barra do sistema sem sessão | a cor da página — ela sangra no que vem embaixo | T01 T02 T03 T07 |
| faixa · sessão aberta | LED lima, serial, placa e o ENCERRAR | T06 T07 T09 T10 T11 T12 T13 T14 T15 |
| faixa · sem sessão | LED apagado · só o fato | T12 T15 T16 |
| faixa · módulo com falha | o serial sai · LED vermelho | T04 |
| faixa · sem ação | na tela que ela abriu — o encerramento | T04 T06 T07 T09 T10 T11 T12 T13 T14 T15 T16 |
| tira de contexto | só no menu · a unidade e a conta | T04 |
| faixa no menu | 50 em vez de 52 · embaixo da tira | T04 |
| o topo do menu inteiro | tira e faixa juntas | T04 |
| duas ações | primário 56 · link com 48 de toque | T02 T03 T05 T06 T07 T09 T10 T11 T13 T14 T16 |
| uma ação | quando só existe um caminho | T06 T09 T11 T12 T15 |
| processo correndo | o primário diz o que acontece | T09 T16 |
| com legenda | uma linha que explica a ação, a 12px do botão | T01 T05 T06 T10 T13 |
| folha | sobe do rodapé · puxador · X · véu sobre todo o fundo do app, incluindo tira, faixa e fundo da barra de status | T04 |
| diálogo | só pra ação que encerra trabalho | T04 |
| diálogo sem saída | quando o que aconteceu já está feito · uma ação só | T01 T04 |
| diálogo com ciência | o técnico assina a decisão · o primário espera o check | T01 T13 T14 |
| folha com opções | cada saída numa linha, com o que ela faz · o véu cobre todo o fundo do app | T01 T04 T11 |
| barra do sistema sob o véu | escurece o fundo; mantém os ícones legíveis · com folha aberta, também no menu e sobre a faixa de sessão | T01 T04 T11 |

## Folha 3 · glifos icones poco · `referencias/png/folha-3-glifos-icones-poco.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| escolha numa lista | o quadrado lima cheio é o escolhido | T01 T02 T05 T09 |
| ainda não | círculo apagado · valor em traço | T07 |
| espera | tracejado · a causa no lugar da ação | T04 |

## Folha 4 · linhas cartoes aviso · `referencias/png/folha-4-linhas-cartoes-aviso.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| aprovada | check lima · valor em --tinta-secundaria | T07 |
| reprovada, com causa | X, título e valor em vermelho · a causa embaixo | T07 |
| não se aplica | traço · a assertiva que não vale pra este ativo | T11 T12 T13 T16 |
| só informa | i cinza · o valor à direita · a frase diz que dá pra seguir | T07 |
| lista longa | média · 44 · a CAN e o checklist | T07 |
| passo do ciclo | compacta · 38 | T14 |
| assertiva da sessão | dupla · 50 | T11 T12 T13 T16 |
| linha de conferência | dupla · 50 | T11 T12 T13 T16 |
| passos com o prazo estourado | a lista inteira da T14 | T14 |
| disponível | ícone em poço · nome embaixo | T04 |
| decide agora | borda lima · o próximo passo | T04 |
| conectado | o cartão largo com o serial | T04 |
| com pendência | o contador no canto, igual ao da fila | T04 |
| espera a rede | sem conexão · fundo apagado, borda sólida, traço no poço | T04 |
| aviso | o mesmo desenho, cinza, sem traço | T03 T06 T09 T12 T16 |
| processo parado | o veredito de uma cadeia ou de um download | T03 T07 T09 |
| com contagem | quantos não bateram, à direita | T11 |
| vazio declarado | tracejado · título e uma frase · sem ícone | T02 T06 T12 T15 |
| nota tracejada | o que falta explicar, sem ser aviso | T05 |
| nota com rótulo | o fato declarado, com o nome dele em cima | T07 T10 |
| os dados do modelo | rótulo em cima, valor grande · o fabricante e o modelo | T06 |
| linha do histórico | placa, módulo e hora · o veredito à direita | T07 T11 T12 T15 T16 |
| linha da fila · esperando | o que ainda não subiu | T15 |
| linha de unidade | na folha · o pacote e a contagem | T01 T04 |
| linha de unidade · a atual | o marcador lima de 11px | T01 T04 |
| a lista de unidades | na folha, com as três | T01 T02 T03 T04 T05 T06 T11 T12 T13 T15 T16 |

## Folha 5 · processo, tempo e placar · `referencias/png/folha-5-instrumentos-cadeia-processo.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| cadeia concluída | trilho lima | T09 |
| cadeia recusada | o elo que falhou acende | T09 |
| cadeia antes de gravar | o relógio em cada elo · a limpeza diz o que apaga e o que preserva | T09 |
| segmentado | um segmento por passo · **só onde se percorre** — nas fotos da Montagem sim, no detalhe de um item automático não | T01 T10 T13 |
| a pré-condição dos pinos | a primeira linha da configuração, embaixo do título | T09 |
| encerrando | a legenda só no passo que corre | T16 |
| reiniciando | o reinício é automático · o técnico não faz nada, e a conexão que cai diz reconectando | T16 |
| sem homologar | só os quatro que deixam o módulo seguro · os pulados com traço | T16 |
| a barra do checklist | o que já passou, em lima · o número fica no título | T13 |
| cronômetro | o prazo drena | T14 |
| prazo cheio | antes do disparo · a fila drenando | T14 |

## Folha 6 · entrada escolha cabecalho · `referencias/png/folha-6-entrada-escolha-cabecalho.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| com contador | o contador conta o que passou · lima quando completo | T05 T06 T07 T09 T12 T13 T14 T15 T16 |
| a marca no login | o logo e CONFIGURADOR entre dois traços | T01 |
| campo | rótulo em cima · poço de 48 | T01 |
| campo focado | rótulo e traço de baixo em lima | T01 |
| senha visível | o olho riscado esconde de novo · o nome muda pra Ocultar a senha | T01 |
| requisitos da senha | cada regra vira check quando a senha cumpre | T01 |
| código · seis células | uma célula por dígito | T01 |
| código errado | as células ficam vermelhas | T01 |
| link dentro do conteúdo | sublinhado · ação sobre o que está perto | T01 |
| checkbox | o marcador de escolha: poço de 24 com o vazado de 11, e o texto do que se confirma | T01 T13 |
| checkbox marcado | o mesmo poço, com o vazado virando lima de 11 · surge em 150ms | T01 T13 |
| usuário lembrado | o xis no lugar do olho · limpa o campo e esquece o usuário | T01 |
| campo de busca | lupa e dica · quando a lista é longa | T02 T06 |
| justificativa | o não conforme com o porquê | T13 |
| linha de opção | o ícone, o que faz, e pra onde | T01 T05 T06 T07 T09 T15 |
| linha de módulo | serial e variante · T05 | T05 |
| linha de ônibus | placa, modelo e frota · T06 | T05 T06 |
| bloco escolhido | traço lima embaixo = o escolhido, na hora de confirmar o vínculo | T06 |
| escolhido com trava · T06 | a placa com o motivo embaixo | T06 |
| cartão que pede ação | o erro que precisa dele | T15 |
| o que conferir | as causas de uma falha, numeradas, antes de tentar de novo · nome da causa em negrito, o que conferir depois | T05 T13 |
| botão secundário | fundo --elevado · a ação da linha | T15 |
| lista com contagem | o pacote baixando | T03 T07 T09 T16 |

## Folha 7 · checklist evidencia · `referencias/png/folha-7-checklist-evidencia.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| seção fechada | um cartão por seção · quem age, a contagem e a seta | T13 |
| seção aberta · de leitura | o cartão cresce no lugar · as leituras sem seta | T13 T15 |
| seção aberta · de tocar | cada item com a câmera e a seta | T13 |
| item de leitura | sem seta · não toca | T13 |
| item de tocar | a câmera e a seta · abre a foto | T13 |
| item feito | o check e de onde veio · sem seta | T11 T12 T13 T15 |
| item com ressalva | passou, mas diz a ressalva embaixo | T11 T12 T13 T16 |
| o veredito | o topo do checklist registrado, aguardando autoteste · o próximo passo embaixo | T13 |
| a ação da seção | uma linha só com seta · o resto é leitura | T13 |
| a câmera do app | no checklist; a câmera saiu da calibração (decisão 52) | T13 |
| foto · tirada | vira o registro no lugar, e deixa de ser tocável · diz onde mais ela vale | T13 |
| bloco do evento | o que foi disparado e recebido | T14 |
| linha da fila | o que sobe e quando | T15 |
| linha da re-checagem | a Seção F esperando o servidor | T15 |
| prova da cadeia | os seis blocos, gravados e relidos | T09 |
| prova da sessão | o que sobreviveu ao reinício | T16 |
| contador no menu | itens na fila, no canto do cartão | T04 |

## Folha 8 · calibracao · `referencias/png/folha-8-calibracao.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| valor em poço | o que o módulo conta hoje | T10 |
| régua da diferença | a distância entre os dois · vira "confere" depois | T10 |
| o valor alvo | o número do painel, o que vai pro módulo | T10 |
| o painel · vazio | antes de digitar · o traço em tinta apagada, sem o lima | T10 |
| o que não se aplica | fato declarado, sem vermelho | T10 |

## No protótipo · o que o código mediu

Anotação de construção. A tabela de cima é a do design; esta diz, só nas linhas em que o protótipo mediu diferente, o que o código usa — a regra com as variantes nomeadas (G11) e as telas que usam, corrigidas pelo medido no ciclo de cada tela (G10). A diferença vai pro arquiteto.

O catálogo normativo acima contém **106 peças**, contadas linha a linha nas oito tabelas. A vitrine do protótipo contém **114 espécimes comparáveis**: os estados, variantes e grupos de átomos são registrados separadamente para a bancada, e não representam 114 componentes independentes. As notas abaixo documentam as diferenças medidas e o histórico das variantes; o mapa de cada peça para o componente está em [MAPA.md](../06-prototipo/app/src/ds/MAPA.md). As contagens antigas de 107/119 pertencem aos ciclos anteriores e não são o censo atual.

- **peça nova no protótipo:** a folha desenha, e o design ainda não tem linha
- **em outra folha:** o espécime está desenhado nesta folha, e não na que o design diz

### Folha 1 · fundamentos

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| primário · normal | roxo com o texto lima · 56 · **peça nova no protótipo** | T01 T02 T03 T04 T05 T06 T07 T09 T10 T11 T12 T13 T14 T15 T16 |
| primário · pressionado | o roxo clareia e afunda 2% · **peça nova no protótipo** | T01 T02 T03 T04 T05 T06 T07 T09 T10 T11 T12 T13 T14 T15 T16 · no toque |
| primário · desabilitado | sem roxo · diz o que está acontecendo · **peça nova no protótipo** | T01 T02 T03 T05 T06 T09 T10 T13 T14 T16 |
| link · normal e pressionado | o cinza vira branco no toque · 48 de toque · no rodapé e no diálogo, o desenho de 44, a 8 do primário, e o toque de 48 cresce só pra baixo (decisão 38; ver *duas ações* e *diálogo*, na folha 2) · variante: registrado, depois do toque o pedido feito no mesmo lugar de 48, sem toque, o relógio de 14 e o texto em --tinta-apagada, a 8 um do outro (T14) · variante: desabilitado, no mesmo lugar, em --tinta-apagada e sem o pressionado, o `Voltar ao menu` enquanto o semear corre (T10, a lei 17) · **peça nova no protótipo** | T01 T03 T04 T05 T06 T07 T09 T10 T11 T13 T14 T16 |
| linha tocável · normal e pressionada | a base de toda linha que se toca · o pressionado acende o fundo · **peça nova no protótipo** | T01 T02 T04 T05 T06 T10 T12 T13 |

### Folha 2 · chrome rodape folha dialogo

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| barra do sistema sem sessão | a cor da página — ela sangra no que vem embaixo | T01 T02 T03 T05 |
| faixa · sessão aberta | LED lima, serial, placa e o ENCERRAR · 52 com a linha embaixo, em toda tela (a faixa é uma peça só) · o ENCERRAR com o desenho de 44, e não 48: no menu, a caixa fica a 8 da conta; o toque de 48 cresce só pra baixo, dentro da faixa (decisão 38) · variante: sem ativo, a placa apagada até o ônibus entrar na sessão (T06, e a T07/00 e 07) · variante: o ENCERRAR apagado, desabilitado de verdade, em --tinta-apagada e sem o pressionado, onde o voltar do Android não faz nada — a recuperação (T09/03) e o semear (T10), a lei 17 · a faixa nasce na T07, quando as oito verificações do módulo passam sem trava; a linha de mensagens só informa (a R-05 no protótipo): a T05 não tem faixa, e as travas da T07 (02 a 06) também não | T06 T07 T09 T10 T11 T12 T13 T14 T15 |
| faixa · sem sessão | LED apagado · só o fato | T04 T12 T15 T16 |
| faixa · módulo com falha | o serial sai · LED vermelho · a linha vermelha de 2 embaixo, nos mesmos 52 da faixa, também no menu, com a borda de cima (T04/03 · a entrega do checklist: saiu o traço por cima do C5) · no menu, o ENCERRAR de 44 desce 1, a diferença entre a linha de 2 e a de 1, e fica no mesmo lugar da faixa sem falha (T04/03, folha 2 · decisão 38) | T04 |
| tira de contexto | só no menu · a unidade e a conta · a área de 48 da conta cresce só pra cima e pro lado: com o ENCERRAR de 44 logo embaixo, a caixa dela já fica a 8 dele, e saiu o recuo de 5 pra dentro do avatar, que o ENCERRAR de 48 pedia (decisão 38) | T04 |
| faixa no menu | os 52 de toda tela, e não 50: embaixo da tira, com a borda de cima e a linha embaixo (a faixa é uma peça só, T04/00, 02 a 12) · variante: sem sessão, os 50 da T04/01, com a linha embaixo, como nas outras telas — a referência desenha as duas linhas em cima, também no pacote 1, que só mudou a grade (G13) | T04 |
| faixa · sem ação | na tela que ela abriu — o encerramento | T16 |
| duas ações | primário 56 · o link a 8 dele, com o desenho de 44 que come 5 embaixo, e o toque de 48 crescendo só pra baixo, pro lado livre · o alto do rodapé 13 e o vão 8: 13 + 56 + 8 + 44 − 5 + 24, a altura de antes (decisão 38) · variante: o rodapé do login, sem o traço em cima, 13 em cima, 20 dos lados e 28 no pé (T01) · variante: o link registrado, o pedido feito no lugar do link, sem toque — com o desenho de antes, o alto de 14, o vão de 6 e os 48 que comem 4 de cada lado, como a T14/06 desenha (T14) · variante: o link desabilitado, no lugar e em --tinta-apagada, enquanto o semear corre (T10) | T01 T02 T03 T05 T06 T07 T09 T10 T11 T13 T14 T16 |
| uma ação | quando só existe um caminho · sem o link, o rodapé segue com o alto de 14 e o vão de 6 (a decisão 38 não o mudou) | T02 T03 T05 T06 T09 T10 T11 T12 T15 T16 |
| processo correndo | o primário diz o que acontece · variante: o pé de 32 com a explicação embaixo, a atualização do firmware — o mesmo desenho, que passou da T05 pra T07/06 no pacote 1, *O diagnóstico recomeça quando terminar* · o semear da calibração, *Gravando no módulo…* e *Relendo…* no primário desabilitado, com o link desabilitado ao lado, em --tinta-apagada (T10) | T03 T07 T09 T10 T16 |
| com legenda | uma linha que explica a ação, a 6 + 8 = 14 do botão, e não a 12: o vão do rodapé com o link passou a 8 (decisão 38; T05/01, T14/01 e T07/05) · variante: junta, a legenda só com o vão do rodapé, a 8 do botão (T13) | T05 T07 T13 T14 |
| folha | sobe do rodapé · puxador · X · variante: folga 12 e uma frase embaixo do título, a de trocar de unidade (T04) · toda folha fecha no X, tocando no véu, fora dela, arrastando pra baixo e no voltar (lei 20, a última entrega): o toque fora e o arraste moram na peça, e chamam o mesmo fechar do X — o painel acompanha o dedo, só por transform, depois de 8 (`--folha-arraste-folga`); soltando depois de 56 (`--folha-arraste-limite`), desce de onde está e fecha, em 150; antes, volta ao lugar, em 200; o toque que virou arraste não chega na linha em que começou · o voltar é da tela que abriu a folha (T01/04 e 11, T04/05, 07, 10 e 11) · os dois números são proposta do protótipo | T01 T04 |
| folha com opções | cada saída numa linha, com o que ela faz · fecha no xis, e como toda folha (lei 20) · a folha *Outras ações* usa o mesmo puxador da T01 e da T04 desde a rodada 3, e a mesma densidade da *Não recebi o código* (T01/04 e 11), por padronização solicitada pelo diretor: 72 no mínimo, 10 em cima e embaixo e 12 entre as partes · o painel arrasta de qualquer ponto; o puxador e as margens externas seguem a peça | T01 T11 |
| diálogo | só pra ação que encerra trabalho · a saída a 8 do primário, com o desenho de 44 e o toque de 48 crescendo só pra baixo (decisão 38): a de sempre é o link do rodapé, que come 5 embaixo (T04/09, 13, T13/10), e a de 44 come 4, com as ações a 6 do texto (T04/06) · a confirmação fecha no `Cancelar` e no voltar; o toque no véu, fora da caixa, não fecha — o toque fora e o arraste da lei 20 são da folha (proposta do protótipo, pro arquiteto) | T04 |
| diálogo sem saída | quando o que aconteceu já está feito · uma ação só · variante: margem 24, o ar em volta da caixa; no menu da T04, o véu cobre todo o fundo, incluindo tira, faixa e fundo da barra de status, mantendo a caixa no mesmo lugar | T01 T04 |
| diálogo com ciência | o técnico assina a decisão · o primário espera o check | T13 |

### Folha 3 · glifos icones poco

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| escolha numa lista | o marcador de escolha no poço de 30: o vazado de 11, e o quadrado lima cheio de 11 é o escolhido · variante: escolhível, a unidade vencida também se escolhe (T02) · variante: sem o valor à direita, a linha da empresa — o nome e a contagem de unidades (T02/05) | T02 |
| os glifos de estado | doze, um por natureza · com o nome pro leitor de tela · variante: o círculo com o traço, fora dos doze, o não se aplica da assertiva da sessão, apagado e com o nome 'não se aplica' (T16) — desde o pacote 1, a folha 4 o desenha, na linha *não se aplica* · variante: o Wi-Fi riscado, fora dos doze, o ícone inteiro com o risco por cima e o fio escuro (lei 21), cinza, no *SEM CONEXÃO* do login (T01/14) — o *sem sinal* e o *sem sinal neutro* dos doze levam o mesmo Wi-Fi riscado (a revisão de 26/09, lei 21: a versão *-off* saiu); as referências deles (T03/01, T09/02 e 03, T12/03, folhas 3 e 4) desenham o risco sem o fio escuro (pro arquiteto) · variante: o i no círculo, fora dos doze, cinza e mudo pro leitor (a frase ao lado já diz), na linha de condição da versão ilegível (T11/04, a última entrega) — desde o pacote 1, a folha 4 o desenha, na linha *só informa* · **peça nova no protótipo** | todas, dentro das peças · sem uso nas 105: ok cinza |
| os ícones de ferramenta | dez, do Lucide, no traço dos tokens · variante: subindo, fora das dez, a seta do SUBINDO AGORA, com o traço 2,2 do glifo (T15) · variante: xis-mini, o xis solto de 14 do não confere, com traço 2,6 (T10) · variante: ciclo, fora das dez, o route do Lucide no poço de 32 da ação da Seção E, traço 1,8 (T13/05) · variante: riscado, o ícone inteiro com o risco por cima e um fio escuro da cor do poço separando (lei 21, a última entrega) — o Bluetooth da busca que não começa (T05/16, 17) e a câmera sem a permissão (o item do checklist; a T10/11 saiu com a decisão 52), no lugar da versão *-off* do Lucide; o olho da senha leva o mesmo risco (T01/10) · variante: diagnóstico, o file-text do Lucide de 18 no poço de 30 da folha *Outras ações* (T11/03, a mesma medida das opções da T01) · no checklist, o automático que falta leva o ícone da ferramenta da tela que resolve (T13) · **peça nova no protótipo** | T04 T10 T13 T15 e as telas das ferramentas · sem uso nas 105: o ativo de Últimas instalações |
| os poços | oito tamanhos, de 22 a 44 · **peça nova no protótipo** | todas, dentro das peças · sem uso nas 105: 22, 28 e 44 · o de 44 entrou na T04 (10 e 11) e na T10 (a foto, que passou ao checklist com a decisão 52) |
| os marcadores | o marcador de escolha, um só: o quadrado vazado de 11 no desmarcado e o lima de 11 no escolhido · e os LEDs · **peça nova no protótipo** | T01 T02 T04 T05 T06 T07 T09 T10 T11 T12 T13 T14 T15 T16 |

### Folha 4 · linhas cartoes aviso

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| vazio declarado | tracejado · título e uma frase · sem ícone · também a busca sem resultado, com o termo no título (T02/03, T06/08) | T02 T06 T12 T15 |
| ainda não | círculo apagado · valor em traço · variante: o relógio apagado no lugar do círculo, na linha que espera — a atualização do firmware (T07/06) e a releitura da CAN (T07/10), com o valor em traço, e o que o serial travado deixa sem cadastro (T07/02 e 03), com o valor escrito · o relógio passou da T05 pra T07 no pacote 1 · **em outra folha: o design a põe na Folha 3** | T07 |
| passo do ciclo | compacta · 38 · variante: com a causa, o passo reprovado cresce com a causa na entrelinha normal, e não na de 1,35 da causa, 8 em cima e embaixo no meio da lista e 4 no teste do cartão, o último (T14) | T14 |
| assertiva da sessão | dupla · 50 · variante: recebimento, o que o servidor recebeu, um critério por linha (T12/01, 04, 05 · decisão 41): o glifo no poço de 32, o título em 14/600, o porquê embaixo em 12 e o veredito à direita em 13/700, 58 com 8 em cima e embaixo — conforme com o check lima e o veredito em --tinta, indisponível com o traço em --marca-limite e o veredito apagado, pendente com o relógio de 16 e o veredito em --tinta-secundaria; o glifo fica mudo, o veredito já está escrito · variante: o nome aceso em todo estado, o não se aplica com o círculo com o traço e o valor apagado, e o ainda não com o relógio e o valor em --tinta-secundaria (T16) · variante: a última de 54, com a folga do pé do cartão (T16) · variante: lendo, a assertiva que ainda não acendeu, o poço vazio (T16) · variante: o valor que quebra, o título numa linha só e o valor longo em duas, à direita, na mesma altura — sem uso nas telas desde a última entrega: o detalhe da T12 passou ao recebimento (decisão 41), e a peça guarda a variante | T12 T16 |
| linha de conferência | dupla · 50, e o glifo de 16 no poço de 32 (o poço na linha) · variante: diverge, o bloco que não bate, o xis vermelho no poço e o par embaixo do nome, a 3 dele — *no módulo* em vermelho e *no cadastro* em --tinta-secundaria —, com 10 em cima e embaixo (T11/00) · variante: o valor aceso, em --tinta, nos blocos que conferem do conteúdo não reconhecido (T11/01) · variante: lendo, o relógio no poço e a linha do módulo esperando a leitura chegar no bloco; ao chegar, o glifo e a linha do módulo esmaecem em 150 (T11) · saiu a última de 72 · com o pacote 2 (decisão 53), as linhas são Cercas, APN, Extended ID, Eventos e Leitor, e a Conexão sai · a medir no ciclo do pacote 2: a variante só leitura, o Extended ID com o ícone de informação e fora da contagem (T11/00 a 02 e 05), e a variante revisar em seguida (T11/05) | T11 |
| só informa | i cinza · o valor à direita · a frase diz que dá pra seguir · o i no poço de 24, na linha do diagnóstico, que cresce dos 38 com a frase embaixo do nome, 6 em cima e embaixo | T07 (05, 07) |
| seção aberta do checklist | o cartão de 58 aberto, com os itens de leitura embaixo da cabeça · a mesma peça da *seção aberta · de leitura* da folha 7 · a folha 4 nova desenha, e a tabela dela não tem · **peça nova no protótipo** | T13 |
| seção recolhida | o cartão de 58 fechado · a mesma peça da *seção fechada* da folha 7 · a folha 4 nova desenha, e a tabela dela não tem · **peça nova no protótipo** | T13 |
| disponível | ícone em poço · nome embaixo · variante: a grade com 10 entre os cartões, no menu (T04) | T04 |
| decide agora | borda lima · o próximo passo · variante: poço 30 com a sessão aberta (T04) | T04 |
| espera | tracejado · a causa no lugar da ação · variante: o cartão largo, o ativo que espera o módulo (T04) · **em outra folha: o design a põe na Folha 3** | T04 |
| falha | traço vermelho embaixo · variante: o glifo calado pro leitor de tela, o rótulo e a frase já dizem (T03) · variante: bloqueio, sem poço, 14 em volta, o rótulo de topo e a frase de duas orações em --tinta-secundaria, A HOMOLOGAÇÃO FICA BLOQUEADA (T16) · **em outra folha: o design a põe na Folha 1** | T01 T03 T05 T16 |
| aviso | o mesmo desenho, cinza, sem traço · variante: sem poço, só o rótulo e a frase, na folha de trocar de unidade (T04) | T03 T04 T05 T09 T12 T16 |
| processo parado | o veredito de uma cadeia ou de um download | T09 |
| com contagem | quantos não bateram, à direita · o glifo de 16 no poço de 32 (T11/00 e 01) · variante: veredito, o que confere, sem poço, 12 · 14 em volta, o rótulo de topo em lima e o traço lima de 2 embaixo (T11/02) · o cabeçalho espera a última linha da conferência e entra esmaecendo no lugar (a decisão do diretor de 25/09) · a medir no ciclo do pacote 2: o cabeçalho cinza do *REVISAR EM SEGUIDA* (T11/05, decisão 53) | T11 |
| nota tracejada | o que falta explicar, sem ser aviso · variante: a frase em 13, mais aberta, a que diz o bloqueio do pacote (T03) · variante: a frase de 13 em 400, na entrelinha da caixa apagada, a do item que não se marca à mão (T13 · sem uso desde o pacote 11, que trocou o recado pelo *O que conferir*) · variante: pulado, o que não rodou (T16/04), uma peça só desde a otimizacao300000000 — a frase de 13 em 500 e --tinta-secundaria, sem o rótulo, e as duas linhas equilibradas pelo balance na caixa | T03 T05 T13 T16 |
| nota com rótulo | o fato declarado, com o nome dele em cima · variante: achado, o que a leitura achou e não classifica, com a borda do poço, 10 · 12 em volta, e o rótulo e a frase em --tinta-secundaria (T11) · o uso da T06 era o *sem chassi na CAN*, que saiu · variante: aguarda, a CAN que espera o bloco do ativo — 10 · 12 em volta, o rótulo e a frase em --tinta-apagada, a frase de 12 em 400 — e é ela que a folha 4 do pacote 1 desenha (T07/00, 02 a 07) · o fato declarado fica no TRAVADO NA SESSÃO do menu (T04) · o design acrescenta a T10 no pacote 2, a medir no ciclo que o constrói | T04 T07 T11 |
| os dados do modelo | rótulo em cima, valor grande · o fabricante e o modelo · no bloco embaixo do escolhido, no lugar do chassi, com a frase do vínculo embaixo · a folha 4 rotula *no vínculo* | T06 (01, 10, 11) |
| linha do histórico | placa, módulo e hora · o veredito à direita · variante: o tom do veredito pela natureza do estado, o que espera em --tinta e a falha em --vermelho (T12) · variante: a linha de baixo em 12, quando diz há quantos dias (T12) · variante: o veredito longo quebra em duas linhas, à direita, e a placa e a linha de baixo não quebram (T12) | T12 |
| linha de unidade | na folha · o pacote e a contagem · a folha 4 ainda rotula *linha de garagem*, e o espécime da vitrine segue o rótulo dela pra bancada, com o nome daqui (a lei 18) · a vencida diz só a causa, no lugar do pacote, sem o que fazer embaixo (T04/07 e 08) · variante: em espera, não se escolhe até o envio terminar, o traço e o que ela espera no lugar do pacote (T04) | T04 |
| linha de unidade · a atual | o marcador lima de 11px | T04 |
| a lista de unidades | na folha, com as três | T04 |

### Folha 5 · processo, tempo e placar

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| cadeia concluída | trilho lima | T09 |
| cadeia recusada | o elo que falhou acende · variante: correndo, a cadeia gravando, o quadrado de agora e os que esperam com o conteúdo apagado, elo de 86 (T09 · o conteúdo no lugar da versão, decisão 49: a referência do pacote 1 mantém os 86) · variante: pausada, a cadeia parada com o contador e o aviso, o elo pausado aceso e os pendentes em traço, elo de 68 (T09) | T09 |
| cadeia antes de gravar | o relógio em cada elo · a limpeza diz o que apaga e o que preserva · a limpeza primeiro, e as duas pré-condições em cima, os pinos e o espaço · na T09/05 a 07, o último elo sem o fecho de baixo, a cadeia que fecha o miolo; a folha desenha o último com os 70 dos outros | T09 (05, 06, 07) |
| a pré-condição dos pinos | a primeira linha da configuração, embaixo do título · a variante da linha de condição da conferência saiu com a T11/04 (decisão 53) | T09 |
| segmentado | um segmento por passo · **só onde se percorre** — nas fotos da Montagem sim, no detalhe de um item automático não · variante: folga 8, a da recuperação do acesso (T01) · variante: o passo atual já feito, alto como o atual e lima apagado (T10) · variante: o atual com falha, o passo atual reprovado, alto como o atual e em vermelho (T13 · sem uso desde o pacote 11: o detalhe do item automático perdeu a barrinha) · variante: só o cabeçalho, com o rótulo, sem o contador e sem os segmentos (T13/09, o pacote 11) | T01 T10 T13 |
| encerrando | a legenda só no passo que corre · variante: pausa, o bloco em que a sessão interrompida parou, a pausa no poço, o nome e o 'parou aqui' em --tinta, e o trilho de baixo na divisória (T16) | T16 |
| reiniciando | o reinício é automático · o técnico não faz nada, e a conexão que cai diz reconectando | T16 |
| sem homologar | só os quatro que deixam o módulo seguro · os pulados com traço, o desenho da folha 5 (o espécime f5-sem-homologar e a T16/03) · o *pulado* é o passo que o encerrar sem homologar pula, e não o *não se aplica*, que é só da assertiva do autoteste (T16/02 e 05), nem o traço *—* do passo que ainda não chegou (T16/00 e 01) — otimizacao300000000 · pro leitor de tela, o traço do pulado fica mudo (`aria-hidden`, como na T16/03, que não dá nome a ele), e a situação ao lado diz *pulado* | T16 |
| cronômetro | o prazo drena · variante: estourado, o número em vermelho, e sem o que resta a escala fica sem o preenchido, com o marcador no zero (T14) · variante: o detalhe em lista, as frases do estado uma por linha, na entrelinha da legenda (T14) · variante: uma frase em falha, em --vermelho e 700, a segunda falha do evento (T14/09, o pacote 12) | T14 |
| a barra do checklist | o que já passou, em lima · o número fica no título · 6 de altura, o lima em 55% (`--lima-barra-checklist`, a 7ª transparência com nome), calada pro leitor de tela, que lê o título · quando um item passa, o lima avança por transform em 300 (T13) | T13 |

### Folha 6 · entrada escolha cabecalho

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| com contador | o contador conta o que passou · lima quando completo (o pacote 1 juntou o *neutro* e o *de falha*, e o veredito em lima da pré-checagem aprovada passou à regra) · variante: só a palavra, a unidade sem a contagem, quando a busca não acha nada (T05) · variante: forte, o contador em 700, o veredito de uma coisa só, como o aprovada em lima do detalhe (T12) · variante: com subtítulo, a linha de 12 em --tinta-apagada embaixo do título, no bloco dele, a 4 (T16/03 e 06, como as duas referências desenham desde a otimizacao300000000; a folga de 6 da T16/03 ficou sem uso) · variante: de falha, quantos reprovaram, em vermelho (T12) | T05 T06 T07 T09 T11 T12 T13 T14 T15 T16 |
| a marca no login | o logo e CONFIGURADOR entre dois traços | T01 |
| campo | rótulo em cima · poço de 48 | T01 |
| campo focado | rótulo e traço de baixo em lima | T01 T13 |
| código · seis células | uma célula por dígito · variante: o foco numa célula dada, fora do próximo dígito, como no código expirado (T01) | T01 |
| botões só de ícone | fechar e mostrar a senha · 44 de desenho, 48 de toque · com nome pro leitor de tela · **peça nova no protótipo** | T01 T04 |
| campo de busca | lupa e dica · quando a lista é longa · variante: a dica é texto sobre o campo vazio (T02) · variante: focado, o traço de baixo em 2 de lima, aceso parado enquanto a busca não acha nada, e o termo em números tabulares (T02/03, T06/08) | T02 T06 |
| linha de opção | o ícone, o que faz, e pra onde · densidade comum: 72 no mínimo, 10 em cima e embaixo e 12 entre as partes, o ícone de 18 no poço de 30, o que faz em 16/600 e o detalhe em 13/500, a 2 do título (T01 e T11) · variante: em espera, a saída que espera o reenvio, apagada e desabilitada, com a contagem no lugar da seta; ao liberar, a seta entra e a linha acende (T01) · variante: com o efeito, a ação da folha *Outras ações*, com o título e o efeito completos, quebrando em linhas quando preciso, sem reticências, e a seta de 16 em --tinta-secundaria; cresce com o conteúdo sem diminuir a densidade comum (T11/03 · decisão 40, superada pela 53: a folha fica; a padronização solicitada pelo diretor remove a compactação) | T01 T11 |
| justificativa | o não conforme com o porquê · a caixa, nas duas telas do item (decisão 39): o checkbox com o título *Não está conforme* em 14/600 e a linha de baixo em 12 --tinta-secundaria, a 2 — desmarcada, *marque e conte o que aconteceu* (T13/07); marcada, *conte embaixo o que aconteceu* e o campo *O QUE ACONTECEU* (T13/08, 15) · é a variante do checkbox com a linha de baixo · antes, um cartão virava a caixa no toque | T13 |
| linha de módulo | serial e variante · T05 · variante: a última da lista, 56 (T05) · variante: a lista de escolha, o marcador vazado de 11 no poço de 30, o serial em cima da variante e o firmware à direita, 72, todas com a divisória, a última também (T05/01, a errata do pacote 1; a última de 76 saiu) | T05 |
| linha de ônibus | placa, modelo e frota · T06 · a última da lista com os 72 das outras, só sem a divisória (T06/00 · a entrega do checklist: saiu a de 78) · variante: escolha, tocar marca o quadrado lima e o primário avança, e o leitor de tela lê a escolha (T06) | T06 |
| bloco escolhido | traço lima embaixo = escolhido · variante: justo, não cresce e fica em cima dos dados do modelo, 22 em cima e embaixo — antes, em cima do chassi; a T06/01 do pacote 1 mantém os 22 (T06) | T06 |
| | **o pacote 7 e o 8** · a T05 deixou de usar o bloco escolhido e o escolhido com trava (a lista marcada); o pacote 8 devolveu o bloco escolhido à folha 6 como peça da T06, a confirmação do vínculo (o recorte do RKT-8H42) · 105 peças | T06 |
| escolhido com trava · T06 | a placa com o motivo embaixo · variante: neutro, a trava que tem saída, o rótulo cinza e o traço neutro (T06) | T06 |
| cartão que pede ação | o erro que precisa dele · variante: compacto, com mais de um erro, o título de 17, a causa de 13 e o botão compacto num bloco com a divisória embaixo, e depois dele o que a tela põe (T15) | T15 |
| o que conferir | as causas de uma falha, numeradas, antes de tentar de novo · a caixa de poço, o rótulo de 10 e as causas de 13, o nome da causa em 700 e --tinta, o que conferir em --tinta-secundaria · variante: com falha, o traço vermelho de 2 embaixo (T05/04, a conexão que falhou); sem ele, a caixa de poço comum (T13/09, o item reprovado, que já leva a falha na régua) · `src/ds/entrada/OQueConferir.jsx` (o complemento do pacote 11) | T05 T13 |
| botão secundário | fundo --elevado · a ação da linha · variante: compacto, 46 de desenho e 15 de letra, com o toque de 48 por fora (T15) | T15 |
| lista com contagem | o pacote baixando · os cinco grupos do pacote 1, com a divisória entre as linhas e nenhuma depois da última, a regra da peça — a folha 6 desenha só a dos Ativos (o desvio A da T03, na tela.md dela) · variante: o nome pro leitor segue o dado, na baixa que parou a linha diz que parou (T03) | T03 |

### Folha 7 · checklist evidencia

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| bloco do evento | o que foi disparado e recebido · variante: o nome do relógio segue o dado, ainda não antes do disparo, e na linha feita o relógio fica no lugar, mudo (T14) | T14 |
| linha da fila | o que sobe e quando · variante: pela posição, a altura vem do lugar na lista, 50 com a divisória no meio e 62 na última, em qualquer estado (T15) · o poço pela altura: 32 na de 50 (o poço na linha) e 30 na de 62, que a lei não mede, como as referências 00 a 02 desenham (T15) | T15 |
| prova da cadeia | os seis blocos, gravados e relidos, na T09 (decisão 49) · a variante da conferência, o *igual à do cadastro* da T11/02, sai com o pacote 2: a conferência compara o conteúdo, sem a versão (decisão 53) | T09 |
| foto · tirada | vira o registro no lugar, e deixa de ser tocável · diz onde mais ela vale · o check lima no poço de 44, sem seta, e não é botão pro leitor de tela · variante: o registro do problema, no lugar da câmera do item, *Problema fotografado às 14:30* e *vai junto com a ressalva, pro gestor* (T13/15, decisão 39) — é o espécime da folha 7 do pacote 2 · o uso da T10 saiu com a decisão 52 | T13 |
| contador no menu | itens na fila, no canto do cartão · a mesma peça do *com pendência* da folha 4 | T04 |
| seção fechada | um cartão por seção · quem age, a contagem e a seta · o cartão de 58, a 8 um do outro, com o veredito no poço de 32: o check lima, o círculo do que o técnico resolve, o relógio da F que espera e o X vermelho da que tem um item reprovado, com o nome do glifo pelo estado do dado · variante: sem quem age, só o nome, com 1 foto por fazer ou 1 tirada, porque o singular não existe no `textos.md` (T13, G25) | T13 |
| seção aberta · de leitura | o cartão cresce no lugar · as leituras sem seta · a seta vira pra cima e os itens entram embaixo da cabeça, atrás da divisória · aberta por um toque, os itens esmaecem em 200 e as seções de baixo descem por transform; nascer aberta (a URL, a coluna, o print) não anima (T13) | T13 |
| item de leitura | sem seta · não toca · 44, o glifo no poço de 30 · variante: apagado, o valor que ainda não veio em --tinta-apagada, *a fazer* e *espera o envio* (T13) · variante: não se aplica, o traço no poço e o valor em traço, apagado (T13) · variante: reprovado, o X vermelho no poço, o valor em --vermelho e a seta, e a linha toca e abre o nível do item (T13/16, o pacote 10) · variante: com as linhas do porquê, embaixo do nome, a primeira em --vermelho, e a linha cresce, a 6 em cima e embaixo (o cartão com a correção pedida, T13/27 · o pacote 12) | T13 |
| item de tocar | a câmera e a seta · abre a foto · 50, o ícone no poço de 32, o nome e a legenda empilhados, e o item inteiro é o toque · variante: o automático que falta, com o ícone da ferramenta da tela que resolve, *a fazer* e a seta pro `origem` do mock (T13) · variante: o reprovado sem leitura, com o X vermelho no poço e a seta pra tela que resolve (T13) · as duas sem desenho na entrega (G25) · o reprovado com a leitura é o item de leitura (o pacote 10) | T13 |
| item feito | o check e de onde veio · sem seta · 50, o check no poço de 32 · variante: sem legenda, a foto tirada no checklist, só com o nome — nenhum texto diz de onde ela veio (T13, G25) · variante: não se aplica, o traço no poço no lugar do check — a foto de uma condição que o ativo não tem (T13) · o Painel sem calibração não aparece, e a B fica com 4 (decisão 52, a D4 do pacote 2) | T13 |
| item com ressalva | passou, mas diz a ressalva embaixo · *com ressalva · a causa*, e a causa é a primeira oração da justificativa, com a minúscula (T13/12) | T13 |
| o veredito | o topo do checklist registrado, aguardando autoteste · o próximo passo embaixo (a rodada 1 do retorno do PM) · o cartão de 58, o check lima no poço de 32 · variante: surge, o que nasce do toque no `Finalizar instalação` esmaece no lugar em 150; aberto já homologado, parado (T13/11 e 14) | T13 |
| a câmera do app | a do checklist · a folha 7 do pacote 2 desenha o quadro com *Enquadre o módulo e o ponto de fixação* · variante: sem a permissão, só a câmera riscada, porque o `textos.md` não tem a frase do item (T13, G25) · a da calibração e a variante com a frase do que falta (T10/06 e 11) saíram com a decisão 52 | T13 |

### Folha 8 · calibracao

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| valor em poço | o que o módulo conta hoje · variante: aceso, depois de semear e reler, o que o módulo conta agora em --tinta (T10) · variante: falha, a releitura que não confere, com o número em vermelho (T10/10) | T10 |
| régua da diferença | a distância entre os dois · vira "confere" depois · variante: o confere desenhado, o check lima solto, sem poço, no lugar da diferença (T10) · variante: falha, o xis-mini solto de 14 e a frase em vermelho, o não confere (T10/10) | T10 |
| o valor alvo | o número do painel, o que vai pro módulo · variante: cumprido, o número fora do foco ou semeado, sem o traço lima e com o rótulo apagado (T10/01, 09, 10) · variante: foco, o lima de volta por cima (T10/05) · variante: campo, o input numérico invisível por cima do poço, com o rótulo como nome (T10) | T10 |
| o painel · vazio | antes de digitar · o traço e o rótulo em --marca-limite, sem o lima · a folha 8 escreve *tinta apagada* e desenha --marca-limite: o código segue o desenho | T10 |
| o que não se aplica | fato declarado, sem vermelho · variante: a divisória também embaixo da última linha, no passo da rotação (T10) | T10 |

## A barra de status

É **do sistema, não do app** — desenhada como a de um Android atual, pra separar o celular do que é nosso. A barra tem **30px**, em todas as telas; nada do que vem embaixo depende dela.

| Parte | Como é |
|---|---|
| a hora | **vem desenhada na barra oficial** — o 9:30 do kit, em `05-recursos/sistema/barra-de-status-android.svg` · a Google Sans sai da barra; o token `--fonte-sistema` e o recorte `GoogleSans-hora.woff` ficam, sem uso |
| o sinal | 4 cápsulas de 2,1 de largura, a cada 4,2 · alturas 4,3 · 6,1 · 8,5 · 9,7, alinhadas embaixo |
| o Wi-Fi | 12,8 de largura · dois arcos de traço 2,3 com ponta redonda, e um ponto de 2,4 embaixo |
| a bateria | corpo de 18,3 × 10,4 com canto de 3,1 · o pininho de 1,3 × 4,2 separado · **cheia e branca**, sem porcentagem |
| os espaços | 5 entre o sinal e o Wi-Fi · 5,5 entre o Wi-Fi e a bateria |
| o lugar | **o do desenho oficial** — a barra inteira escalada pra 360 e cortada em 30 (`viewBox="0 12.90 412 34.33"`) · nada recolocado à mão |
| a cor | **o branco do desenho oficial**, sobre o fundo da tela |

**As barras são fixas** (lei 22): em cima, a barra oficial do Android, do kit do Material — o 9:30, o Wi-Fi, o sinal e a bateria —, escalada pra 360 de largura e cortada na altura de 30; o espaço da câmera fica reservado, sem desenhar. Embaixo, a navegação por gestos do Material — a pílula de 94×3,5px a 9px do pé — nas 191 referências de tela da versão atual, por cima de tudo, inclusive das folhas. O fundo das duas é o da tela. No componente, nenhuma propriedade.

Nunca na fonte do app, e nunca com ícone de notificação, operadora ou porcentagem — cada detalhe a mais é um que envelhece.

**Os dois estados da barra** (lei 22, o pacote 2) saíram no pacote 4: a barra virou cenário fixo, o desenho oficial do Android, igual em toda tela · no protótipo, o componente não tem mais as propriedades `bluetooth` e `semRede` (`app/src/ds/chrome/BarraDoSistema.jsx`), e a navegação por gestos é a `NavegacaoPorGestos`, montada uma vez no `app/src/App.jsx`

**No protótipo** · `06-prototipo/app/src/ds/chrome/BarraDoSistema.jsx`, a mesma peça nos três fundos (a faixa, a tira do menu e a página) e sob o véu · a hora em `var(--fonte-sistema)`, `var(--t-secundario)`, peso 500 e `var(--tinta)` · a fonte não vai embutida em cada tela: o `@font-face` do `BarraDoSistema.css` lê o `05-recursos/fontes/GoogleSans-hora.woff`, como a Barlow, e o build empacota o arquivo (com 3,7KB, ele entra no próprio CSS), com o aviso da licença nos metadados dele · a geometria de dentro dos três ícones fica no SVG (as cápsulas, os arcos, o corpo e o pininho), na cor `currentColor`; o resto é token, com a decisão 43: `--barra-sistema-recuo` 26, `--barra-sistema-recuo-direita` 32, `--barra-sistema-desce` 6, `--barra-sistema-espaco-wifi` 5 e `--barra-sistema-espaco-bateria` 5,5 · o tamanho de cada ícone, o do próprio desenho, também: `--barra-sinal` 14,7 × `--barra-sinal-altura` 9,7, `--barra-wifi` 12,8 e `--barra-bateria` 20,4, os dois com `--barra-icone` 10,4 de altura, e o traço dos arcos, `--barra-wifi-traco` 2,3 (os três da barra velha com valor novo, e três novos) · medido na otimizacao300000000, nas 68 referências de então da T01, T04, T05 e T13 e numa de cada uma das outras 12: a barra sai igual ao HTML, byte a byte, a 2×, e nada abaixo de y=30 mudou · no celular de verdade, a barra desenhada sai (`06-prototipo/palco.md`) · os dois estados da lei 22 (`bluetooth` e `semRede`) entram na peça no ciclo que constrói o pacote 2

## O poço numa leitura em andamento (lei 24)

Toda lista que lê, confere ou grava **uma linha por vez** — a T07, a T09, a T11, a T14 e a T16 — fala com três estados no poço:

| Estado | O poço | O valor |
|---|---|---|
| **esperando** | o relógio | um traço |
| **agora** | o quadrado branco — 12px no poço de 32, 14px no de 34 | o verbo: *lendo*, *conferindo*, *gravando* · na T14, a ação do técnico: *passe o cartão* |
| **pronto** | o check, o xis ou o *i* da linha que só informa | o resultado |

**A contagem do andamento mora onde mora a do resultado:** ao lado do título na T07 e na T16; dentro do veredito, neutro, na T11. Enquanto a leitura corre, o rodapé fica desligado e diz o que está acontecendo. **Na T14, o *agora* é uma ordem pro técnico:** o passo da vez diz o que ele tem que fazer no ônibus. Antes do disparo e na falha da rotação, sem quadrado.

**No protótipo** · a fila que drena da T14/01 é a propriedade `fila` do `Prazo` (`{ resta, ms }`): a linha de `--e-4` sobre o `--poco`, o que resta em `--lima-barra-checklist`, esvaziando por `scaleX`, linear, em `RITMOS.filaDrenagemMs` vezes `--mov-fator`.

## Ícone em linha com o texto

O ícone que abre uma linha de texto — *ocupação de pinos confere* na T09, *relido às 14:30* na T10 — é **da família do poço**, com o círculo: o check, o xis ou o *i* · **14px no texto de 12, 15px no de 13** · e **desce até o meio das minúsculas**: `position: relative; top: 2px` no texto de 12, `top: 1px` no de 13. A Barlow reserva espaço em cima das letras, e o centro da caixa do texto fica acima delas — centralizado pela caixa, o ícone parece alto.

**No protótipo** · o `Precondicao` desce o glifo `--e-2` (o texto de 12), e a régua da diferença (`Calibracao`), `--traco-borda` (o de 13), os dois com `position: relative` · o não confere da T10/10 usa o glifo `xis` de `--glifo-confere`, o mesmo tamanho do check.

## Duas ideias numa linha

Um rótulo com duas ideias separadas por **·** — *sem rede · 3 tentativas feitas* — fica numa linha só quando cabe. **Quando não cabe, quebra no ·, em duas linhas de verdade**, uma ideia em cada, e o · sai: *Checklist registrado* / *aguardando autoteste* na T13, *o servidor recusou* / *o pacote de sincronização venceu* na T15. Nunca deixar o navegador decidir a quebra: ele parte a ideia no meio e deixa palavra sozinha. Rótulo não leva ponto final; frase completa, como os avisos, leva.

**No protótipo** · o texto com duas ideias vem como lista, uma por item, e a peça quebra entre elas com `emLinhas` (`06-prototipo/app/src/ds/primitivos/linhas.jsx`) · na Cadeia (a descrição da Limpeza) e no CartaoAcao (a recusa da T15/02).

**No protótipo** · o traço que se desenha (o pacote 9, `movimento.md`) é uma peça só, `06-prototipo/app/src/ds/primitivos/Traco.css` (`ds-traco-desenha`: `scaleX` de 0 a 1 em `--mov-lento`), reaproveitada na linha de módulo (`confirmada`, T05/07) e na prova (`desenha`, T16/02), onde ela vem por uma camada sobre a borda, que fica no cinza do poço · o marcador branco do prazo segue o tempo pela propriedade `marcador` do `Prazo` (T14).

**No protótipo** · o RV no centro do círculo, medido na tela (o diretor, 04/10): o avatar da tira (32) leva 1 de recheio embaixo, e não os 2 do pacote 5, que deixavam as letras 1 px altas na tela; o da folha da conta (52) leva a própria letra à esquerda (1) e 1,5 embaixo · medido no print a 2x: o da tira no centro exato, e o da conta a 0,25 px · `app/src/ds/chrome/Avatar.css`.

## Item reprovado ganha a seta

Numa lista de leituras que o app confere sozinho, **o que passou é leitura**: o check, o valor, e nada mais, sem seta — a linha já diz tudo. **O que reprovou fica vermelho e ganha a seta**: o xis, o valor em vermelho, e o toque abre o detalhe, com o que conferir. A seção do item ganha o xis e a contagem cai. Na T13, a Seção C com a Alimentação, o GPS, as entradas ou o modem reprovados (a 16, 21, 23 e 25).

**No protótipo** · já era assim desde o pacote 10: o reprovado é a linha de leitura do `ItemDoChecklist` com o valor em `--vermelho` (`ds-item-ck-valor-falha`) e a seta, e só ela toca; a que passou fica sem `aoTocar`.

## Reler no lugar

Quando o técnico relê alguma coisa depois de consertar, **a releitura acontece na própria tela**: o botão `Reler…` vira *Relendo…*, desligado, e o resultado fica ali mesmo, com **relido às 14:42** e o veredito, ao lado do check pequeno. Deu certo, sai o que estava vermelho e fica um botão pra seguir; não deu, fica o valor novo, ainda vermelho, e no lugar da frase de baixo **o xis pequeno com *relido às 14:41* e o que ainda falta** — sem ele, o técnico vê a mesma tela e não sabe se o app releu; o que estava pra conferir continua, e o botão volta a ser `Reler…`. **Sem toast, e nada muda de tela sozinho**: quem decide seguir é o técnico. Na calibração (T10) e no detalhe de um item reprovado da Seção C (T13/29 a 37).

**No protótipo** · a T13 usa as peças que existem: o `Rodape` com o `primarioTrocaTexto` (o texto troca no lugar) e o `linkDesabilitado`, e o instrumento do item com a variante `relido` (`app/src/telas/T13/pecas.jsx`): sem a falha no poço, o rótulo em `--tinta-secundaria`, a marca branca da `Escala`, e o check de `--glifo-confere` com o texto de 13 em 700, descido `--traco-borda`, como o `ReguaDiferenca` confere da T10 · o relido e o não resolvido dizem a hora do relógio parado, *14:30*, como a T10 · o não resolvido (o pacote 23) é a variante `naoResolvido` do mesmo instrumento: o poço em falha, como antes, e o xis de `--glifo-confere` com o texto de 13 em 700, em `--vermelho`, como o `ReguaDiferenca` não confere da T10/10 · o rodapé de um botão só fecha em `--rodape-pe-com-botao` (32), a regra da peça: as referências 30 a 33 deixaram o pé de 24 do rodapé com link (pro arquiteto) · o tempo do *Relendo o módulo…* é o do *Relendo…* da T10, 1 s (`RITMOS.relerModuloMs`).

## No protótipo · as variantes da rodada 1 do retorno do PM

Nenhuma peça nova no design system, e nenhum token. As telas da rodada pediram cinco variantes de peças que já existem, e uma peça das telas — as seis vão ao arquiteto, pra entrarem nas folhas:

- **o item do checklist** (`ItemDoChecklist`): o estado `lendo`, com o quadrado de agora e o valor em `--tinta` (a Seção D lida, T13/38) · `acao`, o que o técnico toca na própria linha, no lugar do valor (o `Testar bip`) · `embaixo`, o que a linha abre embaixo dela, a 40 da esquerda e 12 no pé, com o traço do bloco inteiro (a pergunta do bip, T13/40; o campo do que aconteceu, T13/42)
- **o cartão da seção** (`SecaoDoChecklist`): o estado `lendo`, com o quadrado de agora (T13/38)
- **o campo de texto** (`CampoTexto`): `placeholder`, o que o campo vazio pede, em `--marca-limite` (*Conte o que aconteceu*, T13/42)
- **a cadeia** (`Cadeia`): `extra` no elo, a linha que ele confere depois de gravado, embaixo da descrição — o traço da divisória em cima, a 8, o nome em 13/600 `--tinta-forte` e o valor em 13/700 (*O módulo falou com o servidor*, T09/04, 11 e 12)
- **o encerramento** (`Encerramento`): o reinício automático usa o `agora` de sempre, com a legenda; o `energia` (o *é com você* do corte) ficou sem uso
- **o botão de dentro da linha**, peça das telas (`app/src/telas/comum/BotaoDaLinha.jsx`): a resposta do técnico na própria linha — 40 de alto, os dois lado a lado a 8 (o `Confere com o cartão` e o `Não confere`, T14/08, em 13; o `Ouvi` e o `Não ouvi`, T13/40, em 14), e 30, do tamanho do texto (o `Testar bip`) · o fundo `--divisoria`, a borda `--borda-poco`, o texto `--tinta` em 700 · no toque afunda, como o secundário

## No protótipo · as variantes da rodada 2 do retorno do PM

Nenhuma peça nova, e nenhum token. Duas variantes e um ajuste, que vão ao arquiteto pras folhas:

- **a linha de checagem** (`LinhaChecagem`): `embaixo`, a ação do técnico na própria linha, embaixo do par — a 6 dele, alinhada ao nome, com o poço no meio do bloco inteiro e 10 em cima e embaixo (*Corrigir este bloco* e *Enviar agora*, T11/00 e 05, com o botão de dentro da linha da rodada 1)
- **o rodapé** (`Rodape`): sem o primário, só com o link — as ações moram nas linhas, e o rodapé fica com a saída (T11/00 e 05)
- **a legenda do rodapé**: 4 de margem por cima do vão, no app inteiro — a 6 + 4 + 8 do botão com o link (T05/01, T07/05), e a 4 + 8 na junta (o checklist) · as referências mediam 4 a mais que a peça


## No protótipo · a rodada 3 do retorno do PM

Nenhuma peça nova, nenhuma variante, nenhum token. A primeira etapa da recuperação (T01/02, 20, 21, 22) é montada com peças da própria T01 (`telas/T01/pecas.jsx`: a aba do canal, o seletor de país, o campo do dado, a linha do país) sobre as do design system (a caixa de poço, a `Folha`, a `Busca`, o cartão de opções). O ícone `voltar-etapa` entrou no `Icone`, o desenho da referência do *Usar outro dado* (T01/04 e 11). O autoteste da T12 usa a variante `recebimento` da linha de checagem, a do porquê embaixo do nome.
## No protótipo · o complemento da rodada 3

Nenhuma peça nova, e nenhum token. Duas variantes da leitura do item do checklist (`ItemDoChecklist`), pela Montagem no formato das outras seções (T13/02 e 12, lei 23), que vão ao arquiteto pra folha 7:

- **`icone` na leitura:** o ícone no poço de 30, no lugar do glifo (a câmera da *foto a tirar*), com a seta, porque a linha abre a câmera
- **`valorDeEstado`:** o valor à direita é o estado do item, não um dado lido — em `--t-secundario` (13) e `--tinta-secundaria`, como a referência desenha (*foto a tirar*, *com ressalva*)

Os tipos `tocar`, `feito` e `ressalva` (os de 50, empilhados) deixaram de ser usados na Montagem; os espécimes da folha 7 na vitrine ainda os mostram. O `tocar` continua nos itens pendentes e reprovados das outras seções.

## No protótipo · o movimento das peças (C12)

Anotação de construção do C12. O movimento é da peça, e vale onde ela está: a tela só liga o gatilho. As regras do app inteiro estão no `movimento.md`; o mapa de cada peça pro arquivo está no `06-prototipo/app/src/ds/MAPA.md`. Nenhuma peça nova de desenho: as quatro de baixo sem desenho próprio moram no chrome e nas linhas.

| Peça | O movimento | Telas que usam, medido |
|---|---|---|
| a troca (sem desenho, folha 2) | entre telas e entre quadros, só o conteúdo esmaece em 150ms, e só num toque ou no voltar · o processo que espera a troca (C12·2, C12·4, C12·35) | as 15 · o quadro que troca inteiro: T01 T02 T03 T05 T06 T10 T12 T13 T14 T16 |
| a presença (sem desenho, folha 2) | a folha e o diálogo nascem e somem sempre do mesmo jeito · no mesmo véu, a folha e o diálogo se revezam com o véu parado (C12·27, C12·43) | T01 T02 T04 T11 T13 e o *Encerrar antes de terminar?* de toda tela |
| a lista que se reorganiza (sem desenho, folha 4) | o que fica desliza em 150ms, o que sai esmaece por cima, o que volta esmaece no lugar, e nenhuma altura anima (C12·10) | T02 T06 T13 T15 |
| o foco do campo (sem desenho, folha 6) | um foco só · o traço de 2 por cima da borda de 1, a capa em 150ms, e nada sai do lugar (C12·21, C12·22) | T01 T02 T06 T10 T13 |
| primário | com o mesmo texto, acende por uma camada em 150ms · com outro texto, o texto esmaece no lugar e o roxo troca direto · o que se desabilita não mostra o roxo, e só o afundar solta (C12·8, C12·23, C12·18) | as 15 |
| checkbox | **o pressionado:** a área de 48 sobe pra `--elevado`, por baixo do poço e do texto, e solta em 100ms, como a linha tocável · a folha desenha só o normal e o marcado (C12·17, G14) | T01 T06 T13 |
| linha tocável | o que se desabilita no próprio toque solta a camada de uma vez (C12·18) | T01 e toda linha |
| glifo · o check que nasce | o glifo que troca depois de montar esmaece no poço em 150ms, com o que chega junto (C12·12) · o da T05 era a pré-checagem, que passa pro diagnóstico da T07 | T03 T07 T09 T11 T12 T14 T16 |
| aviso | **surge:** o aviso que aparece depois de a tela abrir esmaece em 150ms · **aguarda:** o veredito que espera a prova, na caixa neutra com a contagem — com `aguardaTitulo`, ela diz o que corre (*CONFERINDO*, a T11/04, o pacote 5); na última linha, a palavra e a cor entram em 150ms (C12·9, C12·35) | T01 T03 T05 T09 T11 |
| prova | **surge:** a prova sem lugar reservado esmaece em 150ms · **aguarda:** a legenda, ou a prova inteira com a contagem no lugar da versão (C12·9, C12·35) · a T16 deixou de usar: o autoteste correndo não tem veredito (a T16/07, o pacote 5) | T09 T11 |
| faixa | **ausente:** a faixa que nasce desce em 200ms, e o que ela empurra acompanha — na T07, quando as oito verificações do módulo passam sem trava; a linha de mensagens só informa (a R-05 no protótipo; antes do pacote 1, na T05) · **revela:** a aberta sobe em 200ms e revela a sem sessão (C12·24, C12·25) | T07 T16 |
| escala | **segue:** um trecho linear por passo do processo, vezes `--mov-fator` · montar nunca anima (C12·15, C12·40) · o *corre*, a leitura que chegava na T07, saiu com ela | T03 T13 T14 |
| tambor | rola na troca de valor: 300ms por rodinha, 40ms entre elas, a unidade primeiro · nunca ao montar (G29) · a peça saiu do design com a T07 antiga; o tambor fica dentro do *valor em poço* da calibração (folha 8) | T10 |
| trilho | **acende:** o trilho do elo relido acende de cima pra baixo em 300ms, só na cadeia (C12·32) | T09 |
| barra do checklist | **de:** na volta do item, avança em 300ms do valor de quando o item abriu (C12·36) | T13 |
| régua da diferença | o veredito que chega: a diferença encolhe e esmaece em 300ms, e o veredito entra em 150ms, depois do tambor (C12·34) | T10 |
| lista · a cascata | só quando a busca acha: cada linha esmaece em 150ms, 80ms depois da anterior (C12·28) | T05 |
| justificativa | o campo que abre esmaece em 150ms, e o que fecha sai esmaecendo por cima (C12·47, C12·6) | T13 |
| encerramento | a legenda que passa ao passo que corre esmaece em 150ms; o espaço muda direto (C12·9) | T16 |

Os espécimes de movimento, tocáveis, ficam na vitrine, fora da bancada: `mov-troca`, `mov-troca-quadro`, `mov-porcima`, `mov-listas-*`, `mov-check-*`, `mov-faixa-*` e os dos instrumentos (`mov-escala-baixa`, `mov-prazo-drena`, `mov-semear`, `mov-barra-checklist`) · o `mov-leitura-chega`, o `mov-leitura-fora` e o `mov-mostrador` saem com as peças. O movimento que não tem porta no palco se prova neles (C12·13).
