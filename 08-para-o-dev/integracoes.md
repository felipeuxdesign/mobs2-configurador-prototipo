# As integrações

O que o protótipo finge, e o produto faz de verdade. Pra cada integração, a tela já diz o que espera e o que faz quando falha — a coluna da direita é o que o time de produto constrói.

## O módulo, por Bluetooth ou cabo

| No protótipo | No produto |
|---|---|
| a busca acha cinco módulos, sempre — o do herói e mais quatro (`situacao.porPerto`); o M2C-0999, fora do cadastro, informa o que ele é (`naBuscaForaCadastro`) | a busca por Bluetooth ou cabo, conforme a variante do módulo; o que o módulo informa na busca é o que ele mesmo diz, e o cadastro confere depois |
| a busca de novo mostra o quadro da busca por 1,2 s e volta igual | a busca leva o tempo do rádio, e pode achar módulo novo |
| a conexão falha pelo caso `conexao-falha` | a conexão falha de verdade (sem resposta, senha divergente) — a tela é a mesma, com as três coisas a checar |
| o Bluetooth desligado e sem permissão vêm dos casos | o Android responde: ligar o Bluetooth, pedir a permissão, e o `Abrir as configurações` quando ele não deixa perguntar de novo (regra 12) |
| o link que cai é o caso `link-perdido` | o módulo some no meio da sessão — o menu mostra a faixa de falha |

## O diagnóstico e a CAN

| No protótipo | No produto |
|---|---|
| as sete linhas acendem uma a cada 600 ms | cada linha lê o módulo de verdade: serial no cadastro, firmware, alimentação, GPS, entradas, modem e SIM |
| as três travas (serial, modelo, firmware) vêm dos casos | a trava sai do que o módulo responde contra o cadastro e a matriz de capacidades |
| o firmware atualiza em 1 s (o quadro de 62%) e relê | a atualização real, com o tempo do módulo — e, sem rede no módulo, primeiro grava a conexão, isolada, pra ele ganhar rede |
| a CAN chega com os valores do mock, depois que o bloco do ativo é gravado | a leitura dos sinais do ônibus pelo módulo, com a tradução da CAN do modelo |
| o `Reler o módulo` do item reprovado no checklist espera 1 s e devolve a próxima das `releituras` do caso: a 1ª ainda reprova (11,4 V, 5 satélites, ignição desligada, sem sinal), a 2ª passa (13,8 V, 9 satélites, ignição ligada, na rede) | o módulo é lido de novo inteiro — alimentação, GPS, entradas e modem —, e todo item da Seção C se atualiza com o que voltou; o que não passou continua vermelho |

## A gravação no módulo (a cadeia)

| No protótipo | No produto |
|---|---|
| a cadeia grava e relê um bloco por segundo — limpeza, ativo, cercas, leitor, eventos e conexão | a gravação real, com o read-back de cada bloco: o que volta do módulo tem de ser o conteúdo que foi |
| o bloco recusado e a queda vêm dos casos | o módulo recusa ou a conexão cai; a tela mostra onde parou e retoma dali |
| o espaço e as cercas se conferem pelo mock (`conteudoRegistros`, `regioesMax`) | a capacidade real do modelo do módulo |

## A calibração e o ciclo de testes

| No protótipo | No produto |
|---|---|
| o técnico digita o que o painel mostra, e o semear é imediato | o módulo grava o valor de partida do hodômetro e do horímetro (o horímetro é opcional) |
| os passos do ciclo acontecem sozinhos, a +9, +12, +15 e +18 s | o técnico liga o motor, engata a ré, abre a porta, passa o cartão — com o ônibus parado — e o módulo reporta cada um |
| o evento de teste chega aos 24 s do prazo | o servidor recebe, ou não |

## O servidor, a fila e a evidência

| No protótipo | No produto |
|---|---|
| o que o servidor recebeu (T12) — posicionamento e eventos — sai de `instalacoes[].recebimento` do mock | o app consulta o servidor, que diz o que recebeu de cada critério |
| o critério pendente diz *confere por 24 h*, mas com o relógio parado nunca confere de novo | o app confere de novo por 24 h (decisão 41) — nunca reprova por rede |
| a fila sobe no ritmo do mock, e a do aparelho é a fila do mock inteira | o envio real, que continua fora da tela; sem rede, espera; e continua subindo quando outro usuário entra (decisão 42) |
| a câmera do checklist devolve a foto do mock | a câmera do aparelho, com a foto guardada como evidência |
| nada é salvo | tudo que é evidência persiste no aparelho, e sobe quando houver rede |

## O acesso

| No protótipo | No produto |
|---|---|
| o login deixa entrar qualquer usuário com uma senha de 8 ou mais, depois de 1,2 s (*Entrando…*) | o usuário e a senha conferem no servidor, com o tempo dele (e um tempo limite — veja `o-que-o-produto-ainda-decide.md`) |
| o código de recuperação é 482913 · o teto de 3 envios libera às 15:12 | e-mail ou SMS, com validade, tentativas e teto por hora |
| o pacote tem a idade que o mock diz | o pacote baixado da plataforma, com a versão gravada em toda evidência |

## O que a stack vai decidir

- como falar com o módulo — Bluetooth e cabo — e com a CAN
- como guardar a evidência sem rede e subir depois
- como a câmera, a notificação local e o leitor de tela entram
- como o app se comporta em telas abaixo de 800 de altura: a regra é **o conteúdo rola e o rodapé fica**
- se o app respeita a fonte aumentada do Android
