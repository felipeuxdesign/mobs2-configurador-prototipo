# Gate · pacote 37 · o claro mais leve, e os ícones são os nossos

Gate sem espera. Por cima do 36 (ec85d2a). As três perguntas do item 7 pedem resposta definitiva; o resto é registro.

## 1 · Censo

- 201 referências · 15 telas · 41 ícones no jogo (`03-design-system/icones/`) · 26 amostras do claro (`03-design-system/claro-amostras/`).
- Última linha do gate do mock: **GATE APROVADO — todas as âncoras recomputadas conferem**. O gate ganhou uma checagem: os 41 desenhos do jogo, cada um com o traço em `currentColor`.
- O `tokens.css`, o `tokens.json`, o `leis.md`, o `componentes.md`, os READMEs, o `LEIA-PRIMEIRO.md` e o `CHANGELOG.md` do pacote vieram de cópias antigas de novo. Entrou só o que é novo:
  - os oito tokens, nos dois temas;
  - as duas cores do claro (`--tinta-apagada` e `--borda-botao`);
  - a lei 14 e as regras R-20 a R-24;
  - as linhas do catálogo e as duas seções novas (as superfícies rebaixadas e o poço; o andamento);
  - a decisão 55 e a entrada do registro.

  O `tokens.json` do pacote trazia de novo o `--mov-*` em 0ms; o nosso sai do `tokens.css` pelo `npm run tokens`.
- **316 tokens** (eram 306): os oito do pacote, o `--traco-fino` e o `--borda-achado` (item 6). O bloco do claro tem 50.

## 2 · As 26 amostras

Cada amostra contra o app no claro, na mesma tela: as 26 batem, todas a menos de 0,5 ponto da diferença que a mesma tela tem no escuro contra a referência dela. A conferência fina (só as áreas lisas, com tolerância 6) achou duas:

- **T05/16, o Bluetooth desligado:** o quadrado grande do vazio estava no poço, e a amostra o desenha rebaixado. Agora é rebaixado, igual à amostra.
- **T01/03, o código da recuperação:** a contagem diz *10:00*, e a amostra e a referência dizem *9:41*. Já era assim nos dois temas, e fica: é a decisão registrada na ficha da T01 (`tela.md`). As horas da recuperação nas referências são a foto de um instante; o protótipo abre o código com o prazo cheio, e o arquiteto confirmou que vale o relógio. A cor bate com a amostra.

## 3 · O escuro, antes e depois

As 201 telas fotografadas antes e depois, no mesmo Chrome da bancada, a 2×, pixel a pixel e sem tolerância (`scripts/fotos.mjs`).

- **Depois das cores (a parte 1):** 201 comparadas, **nenhuma diferença**.
- **Depois dos ícones (a parte 2):** 145 telas mudaram, e cada mudança fica na caixa dos ícones. Uma passa um pouco dela:
  - **T01/22, o seletor de país:** a lupa agora tem 16px, como a referência. Com isso, o *Buscar país* andou 2px pra esquerda e ficou onde a referência o desenha (x 55).
- **Depois das duas correções do fim** (a moldura da T11/01 e a camada do aviso, item 6): a T11 inteira fotografada de novo. No escuro, **nenhuma diferença**; no claro, só a moldura da T11/01, que agora aparece.

## 4 · Os ícones

- **O `lucide-react` saiu:** não está no `package.json` nem no `package-lock.json`, e nenhum arquivo de `src/` importa dele.
- **997 ícones no app, nas 201 telas:** 968 trocados pelo desenho do jogo e 29 que já eram o mesmo desenho. Os 41 desenhos do jogo estão em uso.
- **Por tela**, o conjunto de ícones do app (desenho, tamanho e traço) é o da referência em **194 das 201**. As sete restantes não são de ícone, são de conteúdo:
  - T09/02, 03, T12/04, 05 e T15/01: as perguntas do item 7;
  - **T13/43:** dois ícones diferentes, mas em linhas escondidas atrás do cabeçalho e do rodapé (y 35 e 704). É a rolagem da tela; nada visível muda;
  - **T13/10:** o fundo da referência é uma imagem da tela, sem ícones; o app desenha a tela de verdade embaixo do diálogo.
- **Por lugar** (cada ícone da referência com o do app no mesmo lugar): 912 iguais em desenho, tamanho e traço. Entre eles estão os 14 da seta da seção da T13, que gira −90° (a animação dela): girada, ela é exatamente a ˄ da referência.

## 5 · As varreduras, no claro, nas 201 telas

| O que a lei pede | Medido |
|---|---|
| Nenhuma superfície grande no `--poco` | **Nenhuma.** O poço ficou no quadradinho (933, de 24 a 44px) e nos trilhos que o pacote deixa no poço (21: a régua, a idade do pacote, a barra do prazo da conta, a fila do prazo e o interruptor). O rebaixado pinta 251 superfícies. |
| Nenhum andamento na cor do texto | **Nenhum.** O andamento é `--andamento`, e `--andamento-alerta` dentro da barra de alerta. |
| Nenhum secundário sobre o rebaixado com `--fundo-botao` | **Nenhum.** São 35 secundários: 33 sobre o cartão (dois desligados, com o fundo do cartão, como o catálogo diz) e 2 sobre o rebaixado com `--fundo-botao-no-rebaixado` (o *Ressincronizar e reenviar* da T15/00 e 02). |
| A barra na cor da superfície de baixo | **200 das 201.** A exceção é a T07/11 (item 8). Nas 22 com folha ou diálogo, a medida olha embaixo do véu. Nos três diálogos da T04 (12, 13 e 16), conferida no pixel: a barra e a faixa do topo saem no mesmo tom, escurecidas juntas pelo véu. |
| Nenhuma cor fora dos tokens | **Nenhuma.** O `checar` passa: zero hex, rgb, rgba ou hsl em `app/src`. |

**O contraste no claro:** nove textos ficam abaixo de 4,5:1, e nenhum é texto apagado. O `--tinta-apagada` novo passa em todo lugar (o mais baixo é 4,8, sobre o rebaixado). Os nove são marcadores e um desligado:
- o *—* do valor-alvo da T10 (00, 02, 03, 04, 08), em `--marca-limite`: 4,36 sobre o rebaixado. No poço, onde ele morava, era 3,9;
- o *—* da lista da T16/07, em `--marca`: 3,13;
- o *Reenviar os eventos* desligado da T09/10: 3,13 (é o segundo desenho de desligado, registrado no 34).

## 6 · Decidi sozinho, pelo padrão do projeto

- **O quadrado do vazio da T05/16 é rebaixado**, como a amostra desenha (item 2).
- **Um token novo, `--traco-fino` (2):** o traço dos ícones pequenos que a referência desenha com 2, e não com 2,2 ou 1,8 (o relógio do recebimento da T12/05 e a lupa de 16px da busca do país). Assim o CSS não tem número solto.
- **O risco dos ícones riscados agora é o do jogo:** o olho riscado e o Bluetooth desligado têm o vão pintado na cor da superfície onde moram (o poço, por padrão; o campo, que é rebaixado, diz o dele). A máscara do 29c saiu.
- **Os quatro ícones do palco** (a grade, o X, a volta e o sol) não estão no jogo, porque o palco não é o app. São o desenho exato do Lucide (ISC), copiado em `src/palco/icones.jsx`. A licença está no README.
- **T11/01, a moldura tracejada do *Há conteúdo que o app não reconhece*:** ela sumia no claro, porque usava emprestada a luz do poço, que é branca desde o 34. É o mesmo caso das três peças do 34. Ganhou o token do papel dela, `--borda-achado`: igual no escuro (`#332C49`) e, no claro, o tracejado do vazio (`--borda-neutra`), como as outras notas tracejadas desde o 33. **Para o arquiteto:** o escuro dela tem uma pendência (item 8).
- **A camada do veredito que chega** (a caixa que dizia *CONFERINDO*, T11/04): ela cobre o traço de baixo da caixa, que agora é a luz do rebaixado, e passou a usar esse mesmo token. Os valores são iguais nos dois temas; nada muda no que se vê.
- **A hora da barra continua 9:30**, como nas referências, e a contagem do código da T01/03 continua 10:00 (item 2).

## 7 · Três perguntas, pra resposta definitiva

As imagens estão em [`pacote-37/`](pacote-37/), cada uma com a referência à esquerda e o app à direita. As três já eram assim antes deste pacote, nos dois temas.

**1 · T15/01, a fila sem erro: quatro ou cinco envios?** ([imagem](pacote-37/T15-01-referencia-x-app.png))
- A referência diz *5 neste aparelho* no título, mas desenha quatro: o que está subindo e três linhas.
- O caso do mock (`fila-sem-erro`) tem cinco: o que sobe (f-04), um na fila (f-01) e três recebidas (f-05, f-06, f-07). O app mostra os cinco; a quinta linha é *Checklist · PCX-9A17 · recebida · ontem 16:40* (a f-07).
- O bloco do que está subindo é mais alto na referência só porque ocupa o espaço que sobra; com uma linha a mais, ele encolhe.
- **Padrão que eu adoto:** o app fica como está, com cinco, que é o que o título e o mock dizem. A referência ganha a quinta linha. A outra saída é tirar a f-07 do caso, e o título passa a dizer 4.

**2 · T12/04 e 05, o detalhe da PCX-9A17: a instalação inteira ou só o resumo?** ([04](pacote-37/T12-04-referencia-x-app.png), [05](pacote-37/T12-05-referencia-x-app.png))
- A referência desenha seis linhas em *A instalação*: Diagnóstico *8 de 8*, Configuração *6 passos*, Calibração *nada a calibrar*, Ciclo de testes *4 de 4*, Checklist *27 de 27* e Autoteste *5 aprovadas · 1 não se aplica · 1 pendente*. Na linha de baixo da placa, ela põe o técnico: *M2C-0312 · ontem, 16:05 · Rafael Vieira*.
- No mock, a instalação dessa placa (a i-02) só tem o `resumo`, que sustenta três linhas (Configuração, Checklist e Autoteste) e não diz quem instalou. O app mostra essas três, sem o nome, e não inventa o resto. Este desvio já estava nomeado desde o ciclo da T12.
- **Padrão que eu adoto:** a referência vence. A i-02 ganha no mock as `etapas`, com os números que a referência desenha, e o detalhe passa a mostrar as seis linhas e o nome, como a i-01 já faz. O mock é seu: preciso do seu ok, ou da sua entrega, pra mexer nele.

**3 · T09/02 e 03, a cadeia pausada: os blocos que ainda vão gravar levam o traço ou o círculo vazio?** ([02](pacote-37/T09-02-referencia-x-app.png), [03](pacote-37/T09-03-referencia-x-app.png))
- Na cadeia pausada (a queda, 02, e a recuperação, 03), a referência desenha o *—* no poço do Eventos e da Conexão, que esperam. O app desenha o círculo vazio.
- O círculo vazio é o que a cadeia correndo (00) desenha nos blocos que esperam. O traço é o que a cadeia recusada (01) desenha nos que não foram alcançados.
- O próprio código diz as duas coisas: o comentário de cima pede o traço na pausada, e a regra embaixo dá o círculo.
- **Padrão que eu adoto:** a referência vence. Na pausada, o traço, como na recusada: com a cadeia parada, o bloco não está na fila de ninguém.

## 8 · Para registrar (não precisa de resposta pra seguir)

1. **As três setas das linhas** (›, ˄, ˅) não estão no jogo de 41. O app usa o desenho exato das referências: a › em 126 lugares, a ˄ em 18 e a ˅ em 17, na caixa de 20. **Para o arquiteto:** pôr as três no jogo.
2. **Quatro desenhos que nenhuma das 201 telas usa** e por isso não estão no jogo: a energia e a lua (folhas 3 e 5), o e-mail (folhas 2 e 6) e a câmera sem a permissão. Os três primeiros são o desenho das folhas; a câmera é a do visor com o risco do jogo. **Para o arquiteto:** pôr os quatro no jogo.
3. **O `sem-rede.svg` grava a cor do ponto** (o cinza). Em toda referência o ponto tem a cor do traço (o vermelho da T03/01, o cinza das outras); no app, ele segue a cor do ícone. **Para o arquiteto:** trocar o cinza do arquivo por `currentColor`.
4. **A barra da T07/11 (lendo):** a referência pinta a barra na cor da faixa, e não na da página que fica embaixo dela, contra a R-23. Não mexi, porque o escuro não pode mudar. **Para o arquiteto:** decidir.
5. **As cópias antigas** (item 1): entrou só o que é novo; nada nosso se perdeu.
6. **O tracejado da T11/01 no escuro:** a referência, refeita no 33, desenha a moldura em `--borda-neutra` (`#3A3350`), e o app ficou no cinza de antes (`#332C49`). A varredura do 33 procurou os tracejados pela declaração e não viu esta, que troca só a cor. Medido no pixel da T11/01, na referência e no app. Não mexi, porque o escuro não pode mudar neste pacote (R-24). **Para o arquiteto:** autorizar a troca no escuro. Aí a nota volta à cor da caixa apagada, e o `--borda-achado` sai.
7. **A régua de idade da T03/03 no claro:** o preenchido (`--idade-preenchido`) é a luz do poço, branca no claro desde o 34, e lê como o vazio sobre o trilho cinza. Nenhuma amostra desenha a T03/03. **Para o arquiteto:** dar o valor do claro.

## Bancada

- **As 201 telas, contra a base do 33:** **94 em 0%** contra o HTML (eram 42), nenhuma com erro, e a diferença média cai de 0,493% a 0,472%. 102 melhoraram, todas pelos ícones, que agora são o desenho exato da referência (na T01/22, também o texto da busca, que andou com a lupa). No escuro, os ícones são a única coisa que mudou (item 3). Pioraram só as quatro já conhecidas do 34: a T07/06 (1,61% → 1,73%) e a T13/05, 40 e 43 (de 0,1 a 0,2 ponto, o deslocamento da seção aberta).
- **Os 51 roteiros:** 41 aprovados. Os outros dez são os de antes do pacote, parados no mesmo passo: `empresa` (456), `mov-faixa` (62), `mov-listas` (77), `mov-porcima` (97), `mov-t02` (4), `mov-t03` (45), `recarregar` (16), `reler` (2), `teclado` (63) e `voltar` (52). O `mov-porcima` foi rodado também no código do 36: para no mesmo passo, com a mesma mensagem.
  - **As janelas de tempo:** com a máquina carregada (o Spotlight e a Siri reindexando, carga de 13 a 45), alguns roteiros param numa janela de tempo, quando a animação ou o passo do processo atrasa. Uma primeira rodada parou sete assim (`mov-t01`, `mov-t05`, `mov-t07`, `mov-t09`, `mov-t14`, `recuperar` e `sessao`), e nesta os sete passam. Nesta parou o `mov-t06`, que passa inteiro rodado de novo.
- **A régua do palco:** as 25 peças sem erro, as 47 conferências da moldura batendo e os seis textos sem falha (os cinco de diferença explicada são os de antes). Os quatro ícones do palco são o mesmo desenho.
- **A vitrine:** 114 espécimes, **96 em 0%** contra as folhas. O código do 36, rodado agora pra comparar, dá 59. Nenhum piorou, e 49 melhoraram, pelos ícones.
- **A checagem, o gate do mock e o build** aprovados.
