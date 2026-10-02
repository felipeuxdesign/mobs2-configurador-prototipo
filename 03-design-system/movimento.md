# O movimento

**O movimento conta o que mudou. Ele nunca chama atenção pra si.** O que impressiona neste app é a evidência nascendo na frente de quem olha — o diagnóstico acendendo, o tambor rolando, o prazo drenando. A transição entre telas é quase invisível justamente pra esses momentos aparecerem.

## O vocabulário do app (C12)

Quem usa o app está de luva, dentro do ônibus, com pressa, às vezes no sol. O movimento é curto e é sempre o mesmo. Nada decora: tudo informa ou confirma.

- **O pressionado responde no dedo, sempre igual.** Entra no toque e solta em 100ms.
- **O estado troca no lugar.** O texto, o número e a cor mudam onde estão. Nada muda de lugar nem de altura.
- **O que é novo esmaece no lugar, em 150ms.** O check, o aviso, a causa, o texto novo do botão. O espaço abre direto.
- **O processo acende em ordem**, no ritmo da tabela dos processos, embaixo. Com reduzir movimento, no mesmo ritmo.
- **O veredito assenta no fim, no lugar já reservado, sem vão.** A caixa já está lá, neutra, contando a prova. A palavra e a cor entram com a última linha.
- **A folha e o diálogo sobem e descem com o mesmo peso**, sempre do mesmo jeito. O véu não pisca.
- **A troca entre telas é curta e discreta.** Só o conteúdo esmaece, em 150ms.
- **A volta é o mesmo movimento ao contrário**, no mesmo tempo.

## Os tokens

| Token | Valor | Uso |
|---|---|---|
| `--mov-rapido` | 150ms | esmaecer, pressionar, trocar de tela, o check aparecer · **(C12)** a troca de quadro, o aviso que surge, o texto novo do primário e a camada do primário que acende, o diálogo, a folha que fecha, o traço do campo em foco, o marcador de escolha, a palavra do veredito, a lista que se reorganiza |
| `--mov-padrao` | 200ms | a folha subir, a faixa da sessão descer ou subir · **(C12)** a folha que volta ao lugar depois do arraste ou do `Cancelar`, a seção do checklist que abre e fecha, e os itens dela |
| `--mov-lento` | 300ms | o marcador correr na barra, a rodinha do tambor, o trilho da cadeia · **(C12)** a barra do checklist que avança, a diferença da régua que encolhe, o indicador de rolagem que some |
| `--mov-curva` | cubic-bezier(0.2, 0.8, 0.2, 1) | desacelera no fim · a curva de tudo, menos do que é linear · **(C12)** o *esmaece* e o *acelera* das tabelas das telas também são ela (C12·5); linear, só a barra que segue um processo |
| `--mov-solta` | 100ms | **(C12)** o pressionado solta · o dígito do código aparece na célula (T01) · zera no reduzir |
| `--mov-escalonar-lista` | 80ms | **(C12)** entre as linhas da cascata, quando a busca da T05 acha (C12·28) · zera no reduzir |
| `--mov-escalonar-tambor` | 40ms | **(C12)** entre as rodinhas do tambor, a unidade primeiro (T10 · G29) · zera no reduzir |
| `--mov-fator` | 1 · 0 no reduzir | **novo (C12·15, C12·40)** · o trecho da barra que segue um processo dura o passo do processo vezes ele: com reduzir, a barra salta pro valor de cada passo, e o processo segue no mesmo ritmo · a baixa da T03, o prazo da T14 |
| `--escala-toque` | 0.98 | **(C12)** o primário e o secundário afundam 2% no toque |
| `--escala-dialogo` | 0.98 | **(C12)** o diálogo nasce de 98% e cresce a 100% |
| `--escala-surge` | 0.8 | **(C12)** o que surge no lugar parte de 80%: o quadrado do checkbox e o marcador de escolha |
| `--toque-apagado` | 0.7 | **(C12·17)** o botão sem fundo apaga no toque: o só-ícone (o olho, o xis) e o avatar da tira |
| `--rolagem-espera` | 900ms | **(C12)** quanto o indicador de rolagem fica depois que a rolagem para · não é movimento: não zera no reduzir |
| `--folha-arraste-folga` · `--folha-arraste-limite` | 8px · 56px | **(C12)** o arraste da folha, na linha *folha · o arraste*, embaixo · não zeram no reduzir |

**Tempo e curva só saem destes tokens (C12).** Nenhum tempo solto no código. O ritmo de um processo não é token: mora em `src/estado/ritmos.js`, espelho da tabela dos processos.

## Entre telas

Só **o conteúdo** esmaece, em 150ms. **A barra do sistema e a faixa da sessão ficam paradas** — elas não mudam entre as telas de uma sessão, e o técnico sente que continua no mesmo trabalho. Nada desliza de lado.

**Como é, no protótipo (C12·2):**

- **O conteúdo** é o miolo, o rodapé e o que estiver solto no fluxo. O conteúdo novo vai de 0 a 1; o velho sai de uma vez.
- **Só um toque dispara:** o do técnico, e o voltar do Android (no computador, o Esc), que faz o mesmo que a saída do rodapé.
- **Não dispara** no pulo do palco, num estado da coluna, no `Voltar ao fluxo`, no `Recomeçar`, no recarregar, na primeira abertura, no print, nem no endereço que a tela só acerta. O processo que leva sozinho a outra tela também troca direto (os 4 passos da T16).
- **O que vem por cima fica de fora**, como o topo: o véu, a folha, o diálogo e o indicador de rolagem. O diálogo que nasce aberto com a tela nova aparece direto, e o conteúdo esmaece embaixo dele.
- **A exceção do menu (C12·3).** Quando o topo muda — a ida e a volta do menu, a T03 à T04, a T04 à T05, a T15 sem sessão —, a barra, a tira e a faixa trocam direto. O topo do menu é outro desenho, e não a mesma faixa se mexendo.
- **Uma troca no meio de outra** recomeça do 0.
- **O processo que só pode começar depois da troca espera ela acabar** (C12·35): o diagnóstico da T07, a cadeia da T09 e a conferência da T11. Chegando por um toque, o primeiro passo vem depois dos 150ms da troca; pelo endereço e com reduzir, logo.
- **Com reduzir movimento**, a troca é direta.

## O quadro que troca inteiro (C12·4)

Quando o título ou o rodapé trocam inteiros dentro da mesma tela, o conteúdo esmaece em 150ms, **como entre telas** — por um toque ou pelo processo. Pro técnico, é outra página.

| Tela | Os quadros |
|---|---|
| T01 | a entrada, o canal, o código e a senha nova do recuperar acesso |
| T02 | as empresas e as unidades (`Ver as unidades`, `Trocar de empresa`) |
| T03 | a baixa, a parada e a sincronização concluída (00 → 02, 00 → 01, 01 → 00) |
| T05 | a lista (01) e o escolhido (00, 02, 04) · a busca de novo, 01 → 00 → 01 (C12·41) |
| T06 | a lista e o *Confirmar o vínculo* |
| T10 | a câmera do app, ao entrar e ao voltar · o `Calibrar o horímetro` |
| T12 | a lista e o detalhe da instalação |
| T13 | as seções e o item aberto · o próximo item depois do `Tirar foto` e do `Salvar com ressalva` · a volta |
| T14 | a fila que drena antes do disparo (01 → 00), o prazo estourado, o `Disparar outro evento` e o ciclo concluído |
| T16 | o encerramento, a sessão encerrada, os 4 sem homologar, a encerrada sem homologar e a interrompida |

- **O que nasce com o quadro não esmaece de novo por dentro dele:** o rodapé e o texto do primário, o último passo, o check das fotos na volta do item, o registro da foto na volta da câmera. Entre quadros, só a troca esmaece.
- **O estado que só muda o que está escrito, ou uma peça no lugar, move só a peça:** o `Ler de novo` da T07, a recuperação da T09, abrir e fechar uma seção da T13.

## No lugar (C12)

| O quê | Como |
|---|---|
| **o check que nasce** (C12·12, C12·7) | o glifo novo esmaece no poço em 150ms · o que chega com a leitura esmaece junto: o valor, a causa, a nota · o título, a cor e a altura trocam direto · só quando troca depois de a tela abrir |
| **o número que conta** | troca no lugar, sem animar: a contagem do cabeçalho, o placar, o contador do menu |
| **o aviso que surge** (C12·9) | esmaece no lugar em 150ms, só quando aparece depois de a tela abrir · o espaço abre direto, e nada desliza |
| **a prova que chega** (C12·9) | a prova sem lugar reservado (a cadeia concluída da T09) esmaece no lugar, inteira, em 150ms |
| **a cor que muda** (C12·8) | onde a linha pede o movimento, a cor nova entra por uma camada, em 150ms: o traço do veredito · a cor de um valor ou de um número troca direto |
| **o primário que acende** (C12·8, C12·23) | uma regra só, no toque e no fim de um processo · **com o mesmo texto**, acende por uma camada em 150ms · **com outro texto**, o texto novo esmaece no lugar em 150ms e o roxo troca direto · o que se desabilita troca direto (C12·18) |
| **o campo em foco** (C12·21, C12·22) | um foco só: o que a tela diz, ou o do próprio campo, nunca o de dentro do poço · o traço de 2 é desenhado por cima da borda de 1: a capa dele encolhe da esquerda pra direita em 150ms (só `scaleX`), e o rótulo troca a cor direto · nada sai do lugar |
| **o marcador de escolha** (C12·20) | o quadrado lima surge no poço, de 80% a 100% e esmaecendo, em 150ms · o que perde a marca faz o contrário · em toda escolha |
| **o semeado e o não confere** (C12·34) | o tambor rola até o relido (500ms); quando para, a diferença encolhe e esmaece em 300ms; aí o veredito entra em 150ms, com o poço, o alvo, o segmento e o primário no mesmo quadro, aos ~800ms da releitura |

**A animação que acaba não fica viva** (C12·19): sem preenchimento onde não há atraso.

## O veredito que espera a prova (C12·35, C12·44)

Vale pra todo veredito que espera a prova: a conferência da T11 e o autoteste da T16.

- **A caixa do veredito está no lugar desde o começo**, com o desenho do quadro final. Nada muda de lugar nem de altura entre o começo e o fim.
- **Enquanto a prova corre, a caixa fica neutra:** o traço no cinza, o poço vazio, o lugar da palavra guardado.
- **A contagem acompanha a prova** no lugar do número (*1 de 5* … *5 de 5*), em `--tinta`, com a unidade em `--tinta-secundaria`. Começa com a primeira linha e troca no lugar.
- **Na última linha, o veredito entra em 150ms:** a palavra, já na cor dela, a cor do traço por uma camada, e o xis ou o check no poço. O primário que esperava acende por uma camada.
- **O leitor de tela só ouve o veredito no fim.**
- **Com reduzir movimento**, a prova e a contagem andam no mesmo ritmo, e a palavra e a cor entram direto.
- **Nascido pronto** (no print, na coluna, pelo endereço), o veredito já está lá, parado.

O homologado da T13 chega no `Finalizar instalação`: a barra completa em 300ms e o veredito esmaece em 150ms no lugar. O espaço dele abre direto.

## O que muda de lugar (C12)

O layout vai direto pro quadro final. O que muda de lugar na mesma vista vai do lugar antigo ao novo **só por deslocamento**. Nenhuma altura anima.

| O quê | Como |
|---|---|
| **a lista que se reorganiza** (C12·10) | o que fica desliza em 150ms · o que sai esmaece por cima, numa cópia muda, no lugar dele · o que volta esmaece no lugar · o cartão corta o que passa da borda · a busca da T02 e da T06, o `Ressincronizar e reenviar` da T15, a caixa do não conforme da T13 (C12·47) |
| **a cascata** (C12·28, C12·41) | só quando a busca acha: cada linha esmaece em 150ms, 80ms depois da anterior · ao abrir e ao marcar, parada · com reduzir, juntas |
| **a seção do checklist** (T13·1, C12·46) | abre: as de baixo descem em 200ms, a seta gira e os itens esmaecem junto · fecha: o contrário, e os itens saem com o cartão, que corta o que passa da borda |
| **o que abre espaço em cima de uma lista que se move** (C12·9) | abre direto · só a peça que abre ou fecha move as vizinhas |

## A faixa (C12·24, C12·25)

- **A faixa que nasce** (T07, quando as sete linhas do módulo passam sem trava — a sessão nasce na conexão; o padrão aprovado no gate do pacote 1, a R-05 no protótipo) desce de cima em 200ms, por baixo da barra do sistema. O que ela empurra vai de onde estava ao lugar novo só por deslocamento, no mesmo tempo.
- **A faixa que encerra** (T16) sobe em 200ms e revela, embaixo, a faixa sem sessão, que já está no lugar. Nada do layout se move.
- **A barra do sistema é do aparelho**: não se move, a cor troca direto, e ela fica por cima de tudo o que o app desenha.
- **O ENCERRAR que se apaga** (lei 17) troca de tinta direto.
- **Com reduzir movimento**, a faixa aparece e some direto.

## Por cima da tela

| O quê | Como |
|---|---|
| **folha** | o painel sobe de baixo (translateY 100% → 0) em 200ms e o véu esmaece junto · fecha em 150ms |
| **folha · o arraste** | **proposta do protótipo, espera o arquiteto** (lei 20): o painel acompanha o dedo pra baixo, só por transform, depois de 8 (`--folha-arraste-folga`) · soltando depois de 56 (`--folha-arraste-limite`), desce de onde parou e fecha em 150ms, e o véu esmaece junto · soltando antes, volta ao lugar em 200ms · só a posição decide, nunca a velocidade |
| **diálogo** | esmaece e cresce de 98% a 100% em 150ms · o véu esmaece junto |
| **pressionado** | no toque — no computador, no clique. O primário vai pra `--roxo-pressionado` e afunda 2%; a linha tocável sobe pra `--elevado`; o link vai pra `--tinta`. Solta em 100ms |
| **pressionado · o só-ícone** (C12·17) | o olho, o xis e o avatar da tira apagam a 0,7 (`--toque-apagado`) · solta em 100ms |
| **pressionado · o checkbox** (C12·17) | a área de 48 sobe pra `--elevado`, por baixo do poço e do texto, como a linha tocável · solta em 100ms · parado, nada muda |
| **pressionado · o resto** (C12) | o secundário afunda 2% · o ENCERRAR e a unidade da tira vão pra `--tinta` · no arraste da folha, o pressionado some |
| **pressionado · o desabilitado** (C12·18) | o que se desabilita no próprio toque não mostra o pressionado: a camada sai direto · no primário, só o afundar solta, em 100ms |
| **a folha que vira diálogo** (C12·27, C12·43) | o véu fica aceso, parado · a folha desce em 150ms enquanto o diálogo nasce em 150ms · no `Cancelar`, o diálogo some em 150ms enquanto a folha sobe de novo em 200ms · onde o véu passa a cobrir a faixa, só o pedaço novo esmaece · no `Continuar a instalação`, o diálogo e o véu saem juntos |
| **a presença** (C12) | toda folha e todo diálogo do app nascem e somem pela mesma peça · o que sai continua desenhado, mudo e sem toque, até acabar de sair · aberto desde o começo (pelo endereço, na coluna, no print), parado |

## A volta (C12·6)

**A volta é o mesmo movimento ao contrário, no mesmo tempo.** O campo que perde o foco, o requisito que deixa de ser cumprido, a marca que sai, o diálogo que fecha, a seção que fecha, a caixa do não conforme desmarcada. A folha continua fechando em 150ms.

## Os processos

Mudam **no lugar**. O ritmo do protótipo é de apresentação: rápido o bastante pra não cansar, devagar o bastante pra acompanhar cada prova.

| Processo | Ritmo no protótipo |
|---|---|
| diagnóstico · cada linha | 600ms |
| cadeia · cada bloco, gravado e relido | 1s |
| conferência da T11 · cada linha | 400ms |
| encerramento · cada passo | 600ms |
| autoteste · cada assertiva | 400ms |
| ciclo de testes · cada passo | 3s |
| ciclo de testes · no protótipo | 3s · a semente traz 2 feitos, e o passo k acende a k × 3s do disparo (T14·1) · os +9, +12 e +15s de antes eram os do ciclo de cinco passos; com os seis do pacote 2 (decisão 54), se medem no ciclo que o constrói |
| ciclo de testes · a fila do módulo drenando, antes do disparo | 3s no total · depois, o `Disparar evento de teste` acende (T14-D11) |
| prazo do evento | 1s real vale 4s de prazo |
| sincronização do pacote | 4s no total |
| cronômetro do código (T01) | 1s real vale 1s · o prazo e o reenvio abrem cheios, como o mock diz (T01·1) |
| semear da calibração (T10) · gravando e relendo | 1s + 1s · o botão diz *Gravando no módulo…* e depois *Relendo…*; aí o tambor e a régua (a `animacao.md` da T10) |
| espera do Entrar da T01 (C12 · decisão do diretor, 27/09) | 1,2s · no protótipo, a resposta do servidor ao `Entrar`: o primário diz *Entrando…*, desabilitado, sem indicador girando (o padrão do *Gravando no módulo…* da T10, e a lei do loop fica sem exceção); a T02 chega com a troca entre telas, como a resposta do toque (`Troca.jsx` · `respostaDoToque`) · no aparelho, o tempo é o do servidor |
| busca da T05 · a busca de novo | 1,2s · o número do arquiteto (a última entrega, o `animacao.md` da T05): 400ms passaria sem o técnico ver que buscou · no protótipo, o quadro da busca da T05/00 fica na tela, e a lista volta sem nada escolhido (a T05/01) — o *Procurando…* do `animacao.md` não está em referência nem em `textos.md`, e fica de fora (pergunta ao arquiteto) |

**Como o processo se move (C12):**

- **A barra que segue um processo** (C12·15, C12·40) anda num trecho linear por passo, o passo vezes `--mov-fator`, só por transform: a baixa da T03 (250ms por item, na janela dos ativos) e o prazo da T14 (250ms por tique). Com reduzir, salta pro valor de cada passo, no mesmo ritmo.
- **O tambor** (G29, C12·33) rola na troca de valor: 300ms por rodinha, 40ms entre elas, a unidade primeiro, 500ms no total. Nunca ao abrir.
- **O trilho da cadeia** (C12·32) acende de cima pra baixo em 300ms, só na cadeia da T09. No encerramento da T16, o trilho troca direto.
- **A barra do checklist** (C12·36), na volta do item às seções, parte do valor de quando o item abriu e avança em 300ms. No `Finalizar instalação`, completa em 300ms.
- **Sem ritmo declarado, fica parado** (C12·14): o envio da fila da T15. O firmware da T07/06 já tem ritmo: o quadro dos 62% por 1 s (`RITMOS.cadeiaBlocoMs`), e o diagnóstico relê (a D4, aprovada no gate do pacote 1).

## Só isto se move

`transform` e `opacity`. **Proibido:** animar a entrada de uma tela, contar de zero ao abrir, mover o layout, animar em loop, e qualquer coisa que reaja ao mouse passando por cima.

**Abre parada (C12).** A tela que abre pelo endereço, pelo palco, num estado da coluna, no `Voltar ao fluxo`, no recarregar ou no print abre no quadro da referência, sem nada se mexendo. Nada conta de zero ao abrir, fora dos processos que a G27 declara, que acontecem agora (a baixa da T03 e o encerramento da T16). **No print, nada se move:** a tela nasce no quadro da referência.

**O indicador de rolagem (C12)** é do sistema, como a barra: aparece enquanto a tela rola e some em 300ms, 900ms depois de a rolagem parar.

## Reduzir movimento

Com `prefers-reduced-motion`, **toda duração vira zero**: a troca é direta. Os processos continuam andando no mesmo ritmo — a prova continua nascendo em ordem, só que sem movimento.

**No protótipo (C12):**

- zeram `--mov-rapido`, `--mov-padrao`, `--mov-lento`, `--mov-solta`, `--mov-escalonar-lista` e `--mov-escalonar-tambor`, e o `--mov-fator` vai a 0;
- a barra que segue um processo salta pro valor de cada passo, e o processo segue no mesmo ritmo;
- as linhas de um processo acendem em ordem, no mesmo ritmo, sem esmaecer — também as assertivas da T16 (C12·38);
- a troca entre telas e entre quadros, a folha, o diálogo, a faixa e o veredito que assenta são diretos;
- o `--rolagem-espera` e o arraste da folha não são movimento, e ficam.

Cada tela diz o que se move nela em `02-telas/<tela>/animacao.md`.

**A régua (C12):** `app/scripts/caminho.mjs` toca pelo nome e grava o que animou depois de cada toque. Os roteiros de movimento são os `app/scripts/caminhos/mov-*.mjs`, um por tela e um por peça.
