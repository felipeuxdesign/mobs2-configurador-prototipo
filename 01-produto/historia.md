# A história do produto

## O problema

Não eram instalações que falhavam. Eram **instalações que se declaravam concluídas e não funcionavam**. Duas forças produziam isso, e o produto nasce do encontro delas.

**O equipamento mente.** Existem comandos que o módulo aceita, responde OK — e destroem a configuração em silêncio. A numeração de contadores tem lacunas e índices que variam por modelo; limpar o índice errado zera o script inteiro. E a letra do serial identifica a família, não a variante: uma letra cobre variantes que divergem justo no que decide a instalação. Nem o técnico mais cuidadoso tinha como saber.

**O pagamento premiava o resultado errado.** O técnico é terceirizado e **pago por instalação concluída** — e o checklist de conclusão era marcável à mão. O dinheiro estava atrelado a *declarar pronto*, não a *estar funcionando*.

## Como era antes

Um **roteiro impresso ou uma planilha**. O conhecimento de protocolo vivia num documento, e o técnico executava passos que não tinha como validar. O que fez virar prioridade foi um **incidente com cliente**: uma instalação declarada concluída que não tinha sido finalizada.

## A ordem de grandeza · confirmada pelo PM

| | |
|---|---|
| Instalações por mês | menos de 20 |
| Técnicos terceirizados | 5 a 15 |
| Tempo por instalação | 2h a 4h |
| Instalações que voltavam | 10% a 25% · não é medido |
| Precisavam de técnico sênior | 10% a 30% |
| Tempo até descobrir a falha | o mesmo dia |

Dois números organizam o produto inteiro:

- **De 1 a 4 instalações por técnico por mês.** Ninguém ganha fluência assim — ele instala, esquece, e semanas depois recomeça do zero. O roteiro não falhava por ser incompleto; falhava porque a repetição necessária não existe. E com volume baixo, **uma instalação ruim é 5%% da produção do mês**.
- **A falha era descoberta no mesmo dia** — mas depois de o técnico ir embora. O que faltava não era o sinal; era o sinal chegar **antes** de ele sair do pátio. O custo é a viagem repetida.

## A tese

> O app não foi feito para o técnico configurar melhor. Foi feito para que ninguém — nem ele — precise acreditar na palavra dele.

**Todo o design move a verificação para antes de o técnico sair do veículo.** O read-back em cada bloco gravado, o diagnóstico que confere o módulo antes de qualquer gravação, o ciclo dinâmico que prova o que só fecha andando, o evento de teste que prova que o servidor recebe, o autoteste que prova que a configuração sobreviveu ao desligar — e o checklist que só fecha com o que o sistema provou.

## A resposta de design

| Princípio | O que ataca |
|---|---|
| O técnico responde perguntas de **negócio**; o app fala protocolo | ele decidia o que não tinha como decidir |
| **O sistema decide**, o técnico executa | o improviso em campo, o conteúdo vindo de roteiro |
| **Comando aceito não é configuração gravada** — todo bloco é relido | o equipamento que responde OK e não grava |
| **Nenhuma etapa deixa estado inválido** | o módulo pela metade quando a sessão morre |
| **A evidência é gerada, não digitada** | o checklist marcável à mão |
