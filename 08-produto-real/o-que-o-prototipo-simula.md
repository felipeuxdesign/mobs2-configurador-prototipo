# O que o protótipo simula

| No protótipo | No produto |
|---|---|
| a busca de módulos acha cinco, sempre — o do herói e mais quatro (situacao.porPerto) | busca por Bluetooth ou cabo, conforme a variante |
| a busca de novo mostra o quadro da busca da T05/00 por 400ms e a lista volta igual (o ritmo é proposta do protótipo) | a busca leva o tempo do rádio, e pode achar módulo novo |
| a pré-checagem acende uma linha a cada 600ms | cada checagem lê o módulo de verdade |
| a CAN chega com os valores do mock | leitura dos sinais do ônibus pelo módulo |
| a cadeia grava e relê um bloco por segundo | gravação real, com read-back de cada bloco |
| a câmera devolve a foto do mock | a câmera do aparelho, com a foto guardada como evidência |
| os passos do ciclo acontecem sozinhos | o ônibus anda de verdade, e o módulo reporta |
| o evento de teste chega aos 24s do prazo | o servidor recebe, ou não |
| a fila sobe no ritmo do mock | o envio real, que continua fora da tela e sem rede espera |
| o código de recuperação é 482913 | e-mail ou SMS, com validade, tentativas e teto por hora |
| o pacote tem a idade que o mock diz | o pacote baixado da plataforma, com a versão gravada em toda evidência |
| o autoteste passa ou falha pelo caso | o módulo religa e as assertivas são lidas nele |
| nada é salvo | tudo que é evidência persiste, e sobe quando houver rede |
