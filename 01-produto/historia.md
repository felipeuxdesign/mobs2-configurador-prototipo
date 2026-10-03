# A história do produto

A fonte desta página é o documento de requisitos do PM, *App Configurador — Requisitos v1* (19 a 21/08/2026). As decisões que vieram depois dele, no retorno do PM, estão em `07-decisoes/` (44 a 54).

## O problema

O técnico de campo é **terceirizado, sem conhecimento prévio da lógica de programação do módulo**. Instala em pátio, obra e zona rural, muitas vezes sem rede, às vezes embaixo do ônibus. E o equipamento não avisa quando algo sai errado.

**Sucesso de comando não é sucesso de configuração.** O módulo aceita um bloco e ele não funciona. Uma faixa de contadores mal declarada não falha: apaga em silêncio, e o sintoma aparece dias depois, como um script que parou de reagir. A numeração de contadores tem lacunas e índices de efeito colateral que variam por modelo — no VL08, limpar um índice que não existe zera todas as flags do script, sem mensagem de erro. E a letra do serial identifica a família, não a variante: no VL06, a mesma letra cobre quatro variantes que divergem justamente no que decide a instalação.

**O checklist não provava nada.** Era uma lista de 30 itens marcáveis à mão, com um *marcar todos* que permitia homologar sem verificar.

## A tese

**A verificação acontece enquanto o técnico ainda está no veículo**, em vez de a falha ser descoberta no relatório dias depois. O read-back de cada bloco gravado, o diagnóstico que confere o módulo antes de qualquer gravação, o ciclo de testes, o evento de teste que prova que o servidor recebe, o autoteste — um reinício e uma releitura — que prova que a configuração, a semente e os identificadores sobreviveram, e o checklist que só fecha com o que o sistema provou.

## Os princípios

Do §1 dos requisitos. Eles resolvem empates de decisão em todo o produto.

| Princípio | O que ataca |
|---|---|
| **O técnico responde perguntas de negócio; o app fala protocolo.** Nenhuma tela expõe comando, sintaxe ou nome de variável | ele decidia o que não tinha como decidir |
| **O sistema decide, o técnico executa.** Todo conteúdo de configuração vem do cadastro | o técnico escolhendo script, parâmetro, índice ou faixa |
| **Sucesso de comando não é sucesso de configuração.** Todo envio é confirmado por releitura do módulo | o equipamento que responde OK e não grava |
| **Nenhuma etapa deixa o módulo em estado inválido.** O que é destrutivo é transacional: se não termina, o app retoma ou reverte | o módulo pela metade quando a sessão cai |
| **Sem cadastro prévio, o app trava.** Não existe caminho de improviso em campo | a configuração inventada no pátio |
| **A evidência é gerada pelo app, não digitada pelo técnico.** O que o app pode comprovar, o técnico não marca à mão | o checklist marcável à mão |
