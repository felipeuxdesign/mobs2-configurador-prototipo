# O que espera o diretor

As perguntas que os ciclos deixaram, cada uma com o padrão que o protótipo adotou enquanto a resposta não vem. Nenhuma trava o protótipo: ele roda com o padrão, e a resposta muda o que está escrito aqui e no código. As perguntas de produto, pro PM, ficam em `08-produto-real/pendencias.md`; as do desenho, pro arquiteto, em `diferencas-para-o-arquiteto.md`, na raiz.

## Respondidas pelo diretor (25/09)

- **T11 · o veredito antes da prova (C12·35): (b).** O *CONFERE COM O CADASTRO · 5 de 5* e o *igual à do cadastro* esperam a última linha acender, e entram esmaecendo no lugar
- **os botões acesos que não fazem nada (regra 12): (b).** O *Sincronizar* das garagens sem pacote na lista longa da T02, o *Procurar de novo* da T05/01 que acha a mesma lista e o *ENCERRAR* na recuperação da T09 ficam desabilitados de verdade. Vai ao arquiteto, pra ele desenhar o desabilitado nas referências e ficar alinhado
- **T02 e T06 · a busca que esconde a escolha feita: (b).** Enquanto a busca esconde o item escolhido, o primário espera; ele acende de novo quando o item volta a aparecer
- **T10 · o voltar no meio do semear: (b).** O semear grava no módulo e não para: nos 2 s de *Gravando no módulo…* e *Relendo…*, o *Voltar ao menu* e o voltar do Android não fazem nada, como a releitura da T08
- **o celular deitado (regra 11): (a).** O celular de 360 × 800 no centro, sem girar
- **o zoom do celular no palco:** depois de o protótipo subir na Vercel
- **as outras perguntas** ficam no padrão (a), até o diretor dizer outra coisa · o que muda desenho vai ao arquiteto (para-o-arquiteto-alinhamento.md, na raiz)

## Publicar

- **O C14 põe o protótipo no ar,** na Vercel, a partir de um repositório no GitHub. É publicação: precisa da sua conta e do seu ok. O build e a prévia local ficam prontos antes.

## O palco

- **O zoom do celular:** hoje o celular fica em 360 × 800, e cresce só até caber na janela. Você quis rever isso no fim (C13 ou C14).
- **O celular deitado (regra 11, o app não gira):** no modo estreito com a janela mais larga que alta, o palco põe o celular de 360 × 800 no centro, com a moldura e em escala pra caber, como no palco largo. Num celular deitado ele fica pequeno (a escala dá uns 0,4), mas o desenho é o das referências e o toque funciona. A alternativa é o app com 360 de largura e a altura da janela, rolando: maior pro dedo, com o miolo apertado entre a barra e o rodapé. Fica o celular em escala, que é o mais simples e não mexe no desenho.

## As telas

| Tela | A pergunta | O padrão adotado |
|---|---|---|
| T01 | o Confirmar do código fica apagado com as células vazias (T01·6), e as referências novas 12 e 13 desenham ele aceso | apagado até o sexto dígito |
| T01 | o teto da hora (o último reenvio usado) não tem desenho nem texto | a folha desce até 0:00 e as duas saídas ficam desabilitadas |
| T02 | a garagem tocada se perde quando se abre o estado da coluna e se volta ao fluxo | fica como está (a Várzea do mock); as propostas são gravar a escolha no toque, ou o palco guardar o instante |
| T02 · T06 | o mesmo com o termo da busca sem resultado (a entrega de 25/09): digitado outro termo, abrir o estado da coluna e voltar ao fluxo reabre o `03` com *Recreio* e o `08` com *ABC-1234*, os termos da referência; e o mundo da lista longa, com uma busca que acha, volta ao do herói | fica como está (o quadro da referência); as mesmas duas propostas |
| T02 | no mundo do caso `lista-longa-garagens`, aberto pelo `03`, seis das nove garagens não têm pacote no mock (`M.pacotes`), e a T03 não teria o que baixar. É um botão aceso que não faz nada, contra a regra 12 da lei de construir (a entrega do mundo real) | **respondida (b);** a otimização do design respondeu com o pacote das seis garagens no mock (o `Sincronizar` funciona em todas), e espera a construção dela: até lá, o `Sincronizar` delas fica aceso e não faz nada, com a nota na régua |
| T02 · T06 | a busca que acha alguma coisa, mas esconde a escolha feita antes: o primário fica aceso. Na T02 ele diz o nome (*Sincronizar Garagem Olinda*); na T06, *Usar este ativo* confirma um ônibus que não está na lista | **respondida (b), construída:** o primário espera enquanto a escolha não aparece, e acende quando ela volta (`logica.md` · A escolha do ativo; o `busca.mjs` prova) |
| T05 | na lista sem nada escolhido (T05/01), o `Procurar de novo` busca de novo, como o `tela.md` manda, e a busca acha a mesma lista na hora: nada muda na tela. É um tocável aceso que não faz nada à vista, contra a regra 12 da lei de construir (achado pela régua `aceso.mjs`, a entrega do mundo real) | **respondida (b);** a otimização do design respondeu com o `Procurar de novo` que volta à busca da T05/00, e espera a construção dela: até lá, fica como o `tela.md` mandava, com a nota na régua |
| T05 | o caso `bluetooth-sem-permissao` traz a resposta *negada* (a entrega do mundo real), e nem o comentário do caso nem o `tela.md` dizem se é a primeira recusa ou a que marcou *não perguntar de novo* | é a que marcou: o `Permitir` pergunta de novo, a resposta é *negada*, o Android não deixa perguntar mais, e o botão vira `Abrir as configurações` no mesmo quadro — como o Android faz a partir da versão 11, e como a câmera (T10/11). A alternativa é ler a *negada* como a primeira recusa: o `Permitir` pergunta de novo, e o botão só vira quando o Android responder com o *não perguntar de novo*, que o mock não traz — o caso ganharia um campo pra isso |
| T09 | na recuperação (T09/03), o `ENCERRAR` da faixa fica aceso, como a referência desenha, e não faz nada (G23, o `tela.md` da T09). É um botão aceso que não faz nada, contra a regra 12 da lei de construir (a entrega do mundo real) | **respondida (b), construída:** o `ENCERRAR` fica desabilitado de verdade e em tinta apagada (a lei 17), como a referência nova da T09/03 desenha (`logica.md` · O voltar do Android) |
| T10 | o `Voltar ao menu` e o voltar do sistema no meio do semear (*Gravando no módulo…*, *Relendo…*, a entrega de 25/09): nem a decisão 33 nem o `tela.md` dizem o que acontece nesses dois quadros | **respondida (b), construída:** o semear não para — nos 2 s, o `Voltar ao menu` fica desabilitado de verdade e em tinta apagada, o voltar do sistema não faz nada, e o `ENCERRAR` fica apagado, como na releitura da T08 (a lei 17; `logica.md` · O voltar do Android; o `voltar.mjs` e o `heroi.mjs` provam) |
| T12 | o corte dos grupos por idade (*este mês até N dias*) | 17, o menor que reproduz a referência |
| T12 | os vereditos sem referência (*aprovada após reprocessamento*, *reprovada*) e o *quando* do detalhe de outro dia | construídos com o nome do estado; o *quando* repete a linha da lista |
| T12 | a ressalva não aparece em lugar nenhum | não aparece |
| T12 | depois de homologar, a lista não mostra a instalação nova | não mostra (nenhum dado nem referência a desenha) |
| T13 | a ressalva da Seção B, a origem do Painel herdado, o relatório de homologação | o mesmo check da foto; sem origem; o relatório vai pra fila |
| T14 | os blocos mudam de lugar entre os quadros (Lei 3) | como as referências desenham; a proposta é reservar os lugares |
| T15 | a evidência do RSW-9L02: o mock diz 2 dias, a referência diz ontem | o mock (2 dias); a proposta é alinhar o mock |
| T15 | o traço lima e a barra lima do *Subindo agora*, com o envio ainda correndo (Lei 1) | como a referência; são duas exceções à lei |
| T15 | o item que a sessão acabou de criar aparece *há 0 min*, sem texto pra *agora* | *há 0 min* |
| T15 | o contador da T15 conta os recebidos (3), e o do menu só os pendentes (2) | os dois como estão |
| T15 | o que o envio que recomeça mostra, depois do `Ressincronizar e reenviar` | o cartão sai e o item entra na lista como *na fila*; nenhum vira o *Subindo agora*, porque o progresso e o tamanho só existem no f-04 do mock. A espera passa de uma hora sem texto pra horas: *há 145 min*, pela forma *há N min* |
| T16 | os textos que faltam: a assertiva Pontos de cerca aplicada, a palavra da direita enquanto correm os passos 1, 2, 4, 6 e 7, o *feito* da releitura, o registro do Descarte | como as referências; a de cerca fica *não se aplica*, e o passo fica sem a palavra |
| T16 | a legenda do passo 2 manda desligar a alimentação, e o herói reinicia por comando (T16·1) | no herói, o passo 2 corre sem legenda; a dele só aparece no corte (T16·7) |
| T16 | o *7 de 8* com só 4 checks lima; o autoteste que bloqueia rodando depois de a homologação ser dada | como as referências |
| T11 | o estado 02 aponta pro caso *diff-divergente, invertido*, que não produz a faixa do herói | a proposta é o caso `conferencia-confere` |
| T11 | a HU-T11-3 pede 3 ações, e a decisão 21 fixou 2 | 2 |
