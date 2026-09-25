# Pro arquiteto · os problemas do checklist (T13)

Oi, aqui é o Claude, que constrói o protótipo. O diretor me pediu pra levantar o que atrapalha na T13, no visual e no fluxo. A tela está construída pelas suas 12 referências e funciona de ponta a ponta: o caminho do herói passa por ela e homologa. Mas, usando, aparecem os pontos abaixo.

Cada ponto diz o que acontece e por que atrapalha. Os de desenho são seus: **arrume no design ou investigue e me traga a solução, que eu construo.** Os poucos que são defeito meu estão no fim, e eu mesmo corrijo.

## O fluxo

1. **O ciclo dinâmico só se abre pelo checklist.** O menu tem cartão pra Calibração, pra Configurar módulo e pra Dados da CAN, mas não pro ciclo. Quem pensa "agora vou fazer o teste em movimento" procura no menu e não acha. Ele está dentro de *Finalizar com checklist*, um nome que sugere o fim, não um passo do meio. **Proposta:** um cartão *Ciclo dinâmico* no menu, esperando as pré-condições como os outros, mantendo também a entrada pela Seção E.
2. **Depois da calibração, nada aponta o próximo passo.** O *Concluir a calibração* volta ao menu, e o menu não diz "agora o ciclo" nem "agora o checklist". O contador do checklist só aparece depois que ele foi aberto uma vez (T04·2).
3. **O checklist mostra o que falta, mas nem sempre leva até lá.** Só levam à tela que resolve: a foto que falta (B), o passo que falta ou que reprovou (E, à T14) e a leitura reprovada (C, à T08). Se a Seção D ou a A estiver pendente (o técnico abriu o checklist antes de configurar), os cartões delas não se tocam, e ele tem de voltar ao menu e achar a ferramenta sozinho. **Proposta:** o item pendente da D abrir a T09, e o da A, a tela que o produz, como a E já faz com a T14.
4. **Os cinco cartões da Seção E abrem o mesmo ciclo.** Cada cartão é um passo (ignição, movimento, ré, porta, ignição desligada), mas tocar em qualquer um abre a T14 inteira. O cartão sugere "resolver este passo", e o que acontece é "fazer o ciclo todo".
5. **O item reprovado (09) e o diálogo da ciência (10) não têm porta no caminho do herói.** Só se abrem pela coluna do palco, com o ônibus de outro caso. Quem apresenta o fluxo não vê o checklist reprovando nem a ciência acontecendo.

## O visual

6. **A Seção E parece desligada, e ela é o próximo passo.** No mapa, a E e a F ficam apagadas, com o relógio, como a F, que espera o servidor. Só que a F espera sozinha, e a E espera o técnico. O desenho iguala as duas, e a E lê como "ainda não disponível".
7. **Os cartões da E não parecem tocáveis.** Abertos, são cartões de valor com um traço (—), sem seta, sem ação escrita. Não há nada dizendo "toque pra fazer o ciclo". O técnico vê uma grade vazia e não sabe o que fazer com ela.
8. **O círculo vazio e o relógio não se explicam.** Na B aparece o círculo vazio; na E e na F, o relógio. A diferença (falta você fazer, contra espera outra coisa) não está dita em lugar nenhum da tela.
9. **O mesmo número aparece duas vezes.** *19 de 31* no título e *19 DE 31 CONFERIDOS* no placar, logo embaixo.
10. **A ressalva não se vê.** O item da montagem salvo como não conforme, com a justificativa, aparece com o mesmo check da foto tirada. Quem olha o checklist não distingue o que passou do que passou com ressalva (HU-T13-4).
11. **O Painel herdado da calibração não diz de onde veio.** Ele aparece resolvido, igual às fotos tiradas ali (HU-T10-4).
12. **A Seção E feita não tem desenho.** Depois do ciclo, cada passo aprovado mostra *confere*, a palavra que o chassi já usava. Nenhuma referência desenha a E resolvida, e a palavra foi escolha minha (G25).
13. **O placar em lima antes da homologação.** O *19 DE 31 CONFERIDOS* está em lima com a instalação ainda aberta. A Lei 1 guarda o lima pro veredito e pro escolhido. Confirme se o placar conta como veredito.
14. **dBm na tela do técnico.** A leitura do modem, na Seção C, mostra *−71 dBm*. A lei do projeto diz pra não falar tecnologia com o técnico.

## O que falta desenhar

15. **O relatório de homologação** (HU-T13-7): o *Finalizar* gera o relatório, e ele não tem tela. Pela entrega do mundo real, é nele que a linha *sem localização* aparece, quando a localização foi negada. Hoje não há onde mostrar.
16. **A câmera do checklist sem permissão:** a entrega do mundo real diz que vale igual à da T10, mas a T13 não tem referência própria. Construí igual à T10/11.
17. **A câmera do app é a mesma nas duas telas** (T10/06 e T13/07): o mesmo desenho, construído duas vezes. **Proposta:** virar uma peça na folha 7.
18. **O *marcar todos*** (HU-T13-1) segue fora, pelo `pendencias.md`.

## Os números das suas referências

19. **As referências da T13 não batem com o mock**, e o app mostra o mock (G9):
    - 19 de 31 e 61% no placar, e não 21 e 68%;
    - *Faltam 9*, e não 10;
    - o firmware 2.3.5, e não v4.2.1;
    - a cerca G07, e não *sem cerca*;
    - o GPS com a faixa em 33% e o 9 em 75%: os 56% da referência não saem de conta nenhuma;
    - o homologado às 14:30, e não 14:52.

    **Proposta:** redesenhar com os números do mock, e eles passam a bater pixel a pixel.
20. **A faixa da sessão encolhe** nas referências da D e da E (quando o conteúdo passa de 800), e perde a linha de baixo no item reprovado. No protótipo ela fica sempre com 52 e a linha (G13). **Proposta:** a faixa sem encolher e com a linha em todos os HTML.

## Os que são meus, e eu corrijo

- **O contador do checklist no menu não desconta o que já foi resolvido.** Ele conta os 10 itens de B e E até homologar, mesmo depois de o técnico tirar as fotos. A T13 já gravava o valor certo, e o menu não lia. **Já corrigi:** agora ele desconta (9 na semente, 8 depois de uma foto).

Obrigado. Se você mudar o desenho de algum desses, manda como nas outras entregas, que eu organizo e construo.
