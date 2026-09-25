# As leis

Cada lei tem o porquê. Uma lei sem motivo vira gosto, e gosto se discute; lei com motivo se aplica.

**◆ Ajustada no C1 pelas telas.** Em 24/09 o diretor decidiu que, onde a lei e as referências aprovadas discordam, as telas mandam e a lei passa a descrever o que elas fazem (gate C0, TX-1, G12 e G24). As linhas com ◆ foram reescritas assim, com cada exceção nomeada — **para revisão do arquiteto**. As leis de ergonomia (toque, tamanho de texto, tinta) ficam, e a tela que as fura ganha exceção declarada, sem baixar o mínimo.

## Leis visuais

| # | Lei | Por quê |
|---|---|---|
| 1 ◆ | **Lima marca veredito e escolhido** — e o texto do botão primário. Contam como escolhido: o campo em foco (rótulo e traço), o próximo passo do menu (*decide agora*), a faixa esperada de uma leitura e o rótulo de uma prova (*NO CADASTRO*, *O PAINEL MOSTRA*, *VERSÃO LIDA NO MÓDULO*, *NADA SE PERDE*). E a marca (lei 15). Nunca enfeite | se o lima aparece em todo lugar, ele para de dizer *passou* |
| 2 | **A falha mora no elemento.** O bloco que falhou acende; o título da tela fica | o técnico olha onde deu errado, não lê a tela de novo |
| 3 ◆ | **O estado muda o conteúdo.** O desenho só abre espaço pro que o estado acrescenta — um aviso, uma causa, uma busca, uma linha que some por não se aplicar. Título, faixa e rodapé ficam no lugar | a tela que muda de forma parece outra tela, e ele se perde |
| 4 ◆ | **Todo glifo de estado vive num poço**, até dentro de cartão. Exceções declaradas: o check dos sinais liga-desliga (T07), dos requisitos da senha (T01) e do *confere* da calibração (T10), e os glifos do bloco do evento (T14), que vivem soltos ao lado do texto | o poço é o lugar onde se lê o veredito, sempre o mesmo lugar |
| 5 ◆ | **Barra só onde há faixa esperada.** Exceções declaradas: o placar do checklist, o nível sem faixa (T07), o progresso da sincronização (T03) e o do envio da fila (T15) | barra sem faixa é decoração |
| 6 ◆ | **Preenchido é o que resta:** o tempo drena, o placar enche. O que baixa ou sobe (sincronização, envio) enche com o que já foi; a idade do pacote (T03) enche com o tempo que passou, até o limite | a barra cheia de um prazo diria que sobra tempo |
| 7 ◆ | **Aviso tem um formato só:** poço, rótulo, uma frase. Quatro usos — falha, aviso, processo parado, com contagem. Exceções declaradas: a falha do autoteste (T16), com rótulo de topo e duas orações, e o aviso da folha de garagem (T04), sem poço | um aviso de cada jeito ensina nada |
| 8 | **Um primário por tela.** Rodapé com no máximo duas ações | duas opções de igual peso são uma pergunta que o técnico não sabe responder |
| 9 | **Dois portadores de urgência, no máximo** | três vermelhos são um só barulho |
| 10 ◆ | **Texto informa a partir de 12px**; rótulo em caixa alta pode ter 10 ou 11, e a unidade ou a contagem junto de um número também (*km*, *%*, *de 4*) | sol, luva e pressa |
| 11 ◆ | **Tinta mínima de texto: `--tinta-apagada`**, com contraste AA medido no fundo real. O traço de vazio (—) não é texto e pode usar `--marca-limite` | abaixo disso, some no sol |
| 12 | **Prova só quando diz algo novo** | a frase que repete o que a tela já mostra é ruído |
| 13 | **Valor vem de token.** Nenhum número solto | o número solto é o primeiro a divergir |
| 14 ◆ | **Ícone vem do Lucide**, com o traço dos tokens por classe: glifo de estado 2,2 em todo tamanho · ferramenta e ícone de ação 1,8 · fechar e chevron 2,2 · check abaixo de 14px 2,6 · **exceção: o olho da senha**, desenhado no app, com a amêndoa baixa — e o riscado é o mesmo olho, inteiro, com um risco que corta o contorno onde passa | ícone de sistema tem forma canônica — o wi-fi tem o ponto · o eye-off do Lucide tem outro desenho e parece um olho quebrado ao lado do nosso |
| 15 | **A marca usa o `--lima`.** A logo foi alinhada ao `#AAEF00`, o lima de produto da Mobs2 — o mesmo do Vídeo Telemetria, ao lado do roxo institucional `#402070` | o arquivo antigo tinha `#B8F23D`: quase igual ao sistema, e quase igual parece erro |
| 16 | **Tem seta, toca; sem seta, é leitura.** Todo tocável de lista tem a seta; leitura, feito e espera não têm | no checklist, o que se tocava e o que só se lia tinham a mesma cara |
| 17 | **Desabilitado é tinta apagada.** Cartão, botão ou ação da faixa que não pode agir agora fica em `--tinta-apagada` (#867E9A), desabilitado de verdade, e o motivo está escrito na tela · nos processos, o `ENCERRAR` da faixa faz o mesmo que o voltar do Android: onde o voltar não faz nada, ele fica apagado | um tocável aceso que não responde parece defeito · decisão do diretor, 25/09 |

## Leis de medida

| Lei | Valor | Por quê |
|---|---|---|
| **A tela** | 360 × 800 | o Android de entrada que o técnico usa |
| **Toda medida é por dentro** | `box-sizing: border-box` em tudo | o número escrito é o tamanho que aparece |
| **Nada visível a menos de 32px do pé** | rodapé que termina em link fecha com 24; em botão, com 32 | a barra de gestos do Android, e o polegar |
| **Toque de 48** ◆ | todo tocável tem 48 de toque, e o primário 56. O desenho pode ser menor (o olho, o X, o link de 44): a área de toque cresce por fora, sem mudar o desenho | luva, sol e o polegar |
| **Nada encosta** ◆ | todo tocável — botão, checkbox, rádio, campo — a 8px de qualquer vizinho · poço a 6px da divisória · texto a 6px da borda · caixa a 6px da caixa vizinha · **área de toque a 8px de qualquer outra**: quando o desenho não deixa esse espaço, a área cresce só pro lado livre — o link do rodapé, pra baixo; o avatar da conta, pra cima — e o que se vê não muda | peça encostada lê como uma peça só, e toque encostado cai no vizinho |
| **Poço na linha** ◆ | linha de 38 leva poço de 24 · 44 leva 30 · 50 leva 32 — sempre no centro | o poço é da linha, não da divisória · vale pra linha de lista e pro cartão que age como linha; **não vale pro aviso**, que tem o poço dele |
| **A barra do sistema sangra no primeiro andar** | a cor dela é a do que está logo embaixo; sob o véu, escurece junto | a tela começa na borda, não embaixo de uma faixa |
| **Folga até o rodapé** | 16px no mínimo, em toda tela | o conteúdo não pode encostar nas ações |
| **O marcador de escolha é um só** | poço de 24 no checkbox e na coluna do palco, 30 na linha de lista · quadrado vazado de 11, com borda `#4A4166`, no desmarcado · lima cheio de 11 no marcado | quatro versões do mesmo marcador liam como quatro peças diferentes |
| **A faixa da sessão é uma peça só** | 52px com a linha de baixo, em toda tela · nunca encolhe quando o conteúdo passa da tela · no módulo em falha, a linha é vermelha, de 2px, nos mesmos 52 | desenhada de três jeitos, ela mudava de tamanho de uma tela pra outra |

## Leis de produto

| # | Lei |
|---|---|
| R-01 | **Só o tema escuro.** O claro é outro projeto, se um dia existir |
| R-02 | Nome, saída e estado normal **nunca são lima** |
| R-03 ◆ | O título da tela **nunca vira a falha**. Exceção declarada: no código de recuperação (T01), o título diz *Código não confere* |
| R-04 | **Momento é fluxo; estado é coluna do palco** |
| R-05 | A T05 não tem faixa de sessão: **a faixa aparece** quando a pré-checagem aprova — é ali que a sessão nasce |
| R-06 | `Sair da conta` mora na folha da conta, nunca na faixa |
| R-07 | A pré-checagem é **lista, na ordem da especificação**, porque é processo: o link cai *na sexta* |
| R-08 | O processo que para é **aviso**, no formato único |
| R-09 | A calibração mostra o número **rolando no lugar** — o tambor —, sem remontar a tela |
| R-10 | No protótipo, os passos do ciclo dinâmico **acontecem sozinhos**, um a cada 3 segundos |
| R-11 ◆ | Escolher e seguir com um módulo ou ônibus que é caso do mock **abre o estado dele** — a porta natural. Com a R-14, o estado aparece quando o técnico aperta o botão, não no toque da linha |
| R-12 | Estados de toque: **normal, pressionado, desabilitado.** Sem hover. Sem foco de teclado no app |
| R-13 | O palco fica **fora do app**. Comparar com a referência é trabalho do ciclo, não do palco |
| R-14 ◆ | **Escolher numa lista marca; quem avança é o botão.** Tocar numa linha que tem o marcador de escolha (o quadrado) só marca — o quadrado lima surge — e acende o primário; é o primário que segue. Tocar em outra linha troca a marca. A linha com chevron (uma opção, uma consulta) age no toque. *Decisão do diretor, 24/09* |
| R-15 ◆ | **O celular não mostra a barra de rolagem do navegador.** O que rola mostra o indicador do sistema: fino, por cima do conteúdo, sem ocupar lugar, enquanto rola, e some depois. *Decisão do diretor, 24/09* |
