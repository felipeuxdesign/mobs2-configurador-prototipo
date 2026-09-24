# As leis

Cada lei tem o porquê. Uma lei sem motivo vira gosto, e gosto se discute; lei com motivo se aplica.

## Leis visuais

| # | Lei | Por quê |
|---|---|---|
| 1 | **Lima marca veredito e escolhido** — e o texto do botão primário. Nunca enfeite | se o lima aparece em todo lugar, ele para de dizer *passou* |
| 2 | **A falha mora no elemento.** O bloco que falhou acende; o título da tela fica | o técnico olha onde deu errado, não lê a tela de novo |
| 3 | **Nada se remonta.** O estado muda o conteúdo, não o desenho | a tela que muda de forma parece outra tela, e ele se perde |
| 4 | **Todo glifo de estado vive num poço**, até dentro de cartão | o poço é o lugar onde se lê o veredito, sempre o mesmo lugar |
| 5 | **Barra só onde há faixa esperada.** O placar do checklist é a exceção declarada | barra sem faixa é decoração |
| 6 | **Preenchido é o que resta:** o tempo drena, o placar enche | a barra cheia de um prazo diria que sobra tempo |
| 7 | **Aviso tem um formato só:** poço, rótulo, uma frase. Quatro usos — falha, aviso, processo parado, com contagem | um aviso de cada jeito ensina nada |
| 8 | **Um primário por tela.** Rodapé com no máximo duas ações | duas opções de igual peso são uma pergunta que o técnico não sabe responder |
| 9 | **Dois portadores de urgência, no máximo** | três vermelhos são um só barulho |
| 10 | **Texto informa a partir de 12px**; rótulo em caixa alta pode ter 10 ou 11 | sol, luva e pressa |
| 11 | **Tinta mínima de texto: `--tinta-apagada`**, com contraste AA medido no fundo real | abaixo disso, some no sol |
| 12 | **Prova só quando diz algo novo** | a frase que repete o que a tela já mostra é ruído |
| 13 | **Valor vem de token.** Nenhum número solto | o número solto é o primeiro a divergir |
| 14 | **Ícone vem do Lucide**, com o traço dos tokens: 2,2 nos glifos, 1,8 nas ferramentas, 2,6 abaixo de 14px | ícone de sistema tem forma canônica — o wi-fi tem o ponto |
| 15 | **A marca usa o `--lima`.** A logo foi alinhada ao `#AAEF00`, o lima de produto da Mobs2 — o mesmo do Vídeo Telemetria, ao lado do roxo institucional `#402070` | o arquivo antigo tinha `#B8F23D`: quase igual ao sistema, e quase igual parece erro |

## Leis de medida

| Lei | Valor | Por quê |
|---|---|---|
| **A tela** | 360 × 800 | o Android de entrada que o técnico usa |
| **Toda medida é por dentro** | `box-sizing: border-box` em tudo | o número escrito é o tamanho que aparece |
| **Nada visível a menos de 32px do pé** | rodapé que termina em link fecha com 24; em botão, com 32 | a barra de gestos do Android, e o polegar |
| **Nada encosta** | botão a 8px de qualquer vizinho · poço a 6px da divisória · texto a 6px da borda · caixa a 6px da caixa vizinha | peça encostada lê como uma peça só |
| **Poço na linha** | linha de 38 leva poço de 24 · 44 leva 30 · 50 leva 32 — sempre no centro | o poço é da linha, não da divisória |
| **A barra do sistema sangra no primeiro andar** | a cor dela é a do que está logo embaixo; sob o véu, escurece junto | a tela começa na borda, não embaixo de uma faixa |
| **Folga até o rodapé** | 16px no mínimo, em toda tela | o conteúdo não pode encostar nas ações |

## Leis de produto

| # | Lei |
|---|---|
| R-01 | **Só o tema escuro.** O claro é outro projeto, se um dia existir |
| R-02 | Nome, saída e estado normal **nunca são lima** |
| R-03 | O título da tela **nunca vira a falha** |
| R-04 | **Momento é fluxo; estado é coluna do palco** |
| R-05 | A T05 não tem faixa de sessão: **a faixa aparece** quando a pré-checagem aprova — é ali que a sessão nasce |
| R-06 | `Sair da conta` mora na folha da conta, nunca na faixa |
| R-07 | A pré-checagem é **lista, na ordem da especificação**, porque é processo: o link cai *na sexta* |
| R-08 | O processo que para é **aviso**, no formato único |
| R-09 | A calibração mostra o número **rolando no lugar** — o tambor —, sem remontar a tela |
| R-10 | No protótipo, os passos do ciclo dinâmico **acontecem sozinhos**, um a cada 3 segundos |
| R-11 | Tocar num módulo ou ônibus que é caso do mock **abre o estado dele** — a porta natural |
| R-12 | Estados de toque: **normal, pressionado, desabilitado.** Sem hover. Sem foco de teclado no app |
| R-13 | O palco fica **fora do app**. Comparar com a referência é trabalho do ciclo, não do palco |
