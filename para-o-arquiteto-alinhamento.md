# Pro arquiteto · decisões do diretor pra alinhar no design

Oi, aqui é o Claude, que constrói o protótipo. Recebi a entrega do checklist (`atualizacao56565`) e estou organizando. Obrigado pelas respostas ponto a ponto.

O diretor respondeu mais algumas perguntas que estavam abertas, e várias mudam o que as referências desenham. Eu já construo pela decisão dele. Pra desenho e protótipo não ficarem diferentes, **veja se você concorda e, se sim, coloque no design**: corrija os `.md` e, onde faltar quadro, desenhe as telas novas. Se discordar de algum ponto, me diga o porquê, que eu levo ao diretor.

## Muda o desenho

1. **Botão aceso que não faz nada** (a regra 12, *nunca um botão que não faz nada*). As referências desenham estes três acesos, e hoje eles não fazem nada no protótipo. A solução muda caso a caso, porque dois deles fazem alguma coisa no produto real:
   - **T02, a lista longa:** o *Sincronizar* das seis garagens sem pacote. No produto toda garagem tem pacote; o que falta é dado no mock. **Proposta:** o mock dar pacote a elas, e o botão passa a funcionar.
   - **T05/01:** o *Procurar de novo* busca de novo e acha a mesma lista, porque o mock é fixo. No produto ele pode achar módulo novo. **Proposta:** mostrar a busca correndo por um instante antes de a lista voltar. Preciso do quadro, ou me diga se a busca da T05/00 serve.
   - **T09/03, a recuperação:** o *ENCERRAR* da faixa não faz nada ali (G23), e é regra de produto: não se encerra antes de a Conexão gravar. **Proposta:** desabilitado de verdade com o mesmo desenho, como os cartões em espera do menu. A faixa continua igual em toda tela, e a recuperação já diz o porquê.
2. **T02 e T06 · a busca que esconde a escolha feita.** Quando o técnico escolhe uma garagem (ou um ônibus) e depois digita uma busca que esconde ela, o primário continua aceso e confirma algo que não está na lista. Na T06, o *Usar este ativo* confirma um ônibus invisível. **Decisão:** o primário espera enquanto a escolha está escondida, e acende de novo quando ela volta. Hoje só a busca sem resultado (a T02/03 e a T06/08) desenha o primário esperando. **Preciso de:** o quadro da busca que acha outra coisa, com o primário esperando.
3. **T11 · o veredito espera a prova** (C12·35). A conferência acende as cinco linhas, uma a cada 400 ms, mas o *CONFERE COM O CADASTRO · 5 de 5* e o *igual à do cadastro* já aparecem desde o começo. A tela dá a conclusão antes de terminar a prova. **Decisão:** o veredito espera a última linha acender e entra esmaecendo no lugar, sem mudar nada de posição. Entra na `animacao.md` da T11, e vale também pra conferência da sua entrega nova (o relógio que vira check ou xis).

## Muda só o comportamento

4. **T10 · o semear não para.** No meio do *Gravando no módulo…* e do *Relendo…* (2 s), o *Voltar ao menu* e o voltar do Android não fazem nada, como na releitura da T08. É uma gravação no módulo, e parar no meio deixaria o valor pela metade. Nem a decisão 33 nem o `tela.md` diziam isso: **coloque no `tela.md` da T10 e no `logica.md`**, na lista dos processos que não podem parar.
5. **O celular deitado** (regra 11, o app não gira). No palco, com a janela mais larga que alta, o celular de 360 × 800 fica no centro, sem girar. É o que já está construído, e fica.

## Pra próxima entrega

- **Uma entrega só com tudo isso** é o mais rápido pra mim: organizo, construo e comparo com os PNGs novos de uma vez.
- **Se der, parta dos arquivos atuais do projeto**, e não das suas cópias anteriores. Os `tela.md`, o `logica.md`, as leis e o `componentes.md` ganharam, nos ciclos, anotações do protótipo e decisões do diretor. Hoje boa parte do meu trabalho em cada entrega é juntar sem perder nada. O `diferencas-para-o-arquiteto.md`, na raiz, diz arquivo por arquivo o que o protótipo mudou.

Obrigado.
