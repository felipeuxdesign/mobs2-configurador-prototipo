# O que o protótipo simula

| No protótipo | No produto |
|---|---|
| a busca de módulos acha cinco, sempre — o do herói e mais quatro (situacao.porPerto) | busca por Bluetooth ou cabo, conforme a variante |
| a busca de novo mostra o quadro da busca da T05/00 por 1,2 s e a lista volta igual (o ritmo do arquiteto, 26/09: 400ms passaria sem o técnico ver que buscou; até ali, o 400 era proposta do protótipo) | a busca leva o tempo do rádio, e pode achar módulo novo |
| o diagnóstico acende uma linha a cada 600ms | cada linha lê o módulo de verdade |
| a CAN chega com os valores do mock | leitura dos sinais do ônibus pelo módulo |
| a cadeia grava e relê um bloco por segundo | gravação real, com read-back de cada bloco |
| a câmera devolve a foto do mock | a câmera do aparelho, com a foto guardada como evidência |
| os passos do ciclo acontecem sozinhos | o ônibus anda de verdade, e o módulo reporta |
| o evento de teste chega aos 24s do prazo | o servidor recebe, ou não |
| o que o servidor recebeu (T12) — posicionamento, eventos e viagens — sai de `instalacoes[].recebimento` do mock, ou do recebimento do caso nos estados 04 e 05; a instalação sem ele leva o veredito da regra do mock, sem o porquê | o app consulta o servidor, que diz o que recebeu de cada critério |
| o critério pendente diz *confere por 24 h*, mas com o relógio parado em 14:30 nunca confere de novo, e fica pendente | o app confere de novo por 24 h (decisão 41) — nunca reprova por rede |
| a fila sobe no ritmo do mock | o envio real, que continua fora da tela e sem rede espera |
| a fila do aparelho é a fila do mock inteira, e as referências da T15 mostram só o topo dela | a fila que o aparelho guarda, que continua subindo quando outro usuário entra (decisão 42) |
| o código de recuperação é 482913 · o teto de 3 envios libera às 15:12, a hora do caso `teto-de-envios`, também no fluxo, porque o relógio fica em 14:30 | e-mail ou SMS, com validade, tentativas e teto por hora |
| o login deixa entrar qualquer usuário com uma senha de 8 ou mais; o mock só conhece dois técnicos, o r.vieira e o m.souza (o caso `outro-usuario`), e a sessão anterior do aparelho é a do último `Entrar` desde o começo do palco | o usuário e a senha conferem de verdade, e o aparelho sabe quem entrou antes dele (HU-T01-4) |
| o pacote tem a idade que o mock diz | o pacote baixado da plataforma, com a versão gravada em toda evidência |
| o autoteste passa ou falha pelo caso | o módulo religa e as assertivas são lidas nele |
| nada é salvo | tudo que é evidência persiste, e sobe quando houver rede |
