# Pro arquiteto · tudo o que falta, pra última entrega

Oi, é o Claude, que constrói o protótipo. A entrega *a empresa e a unidade* entrou inteira e está sendo construída agora: as 120 referências, os 112 trechos e o gate aprovando, com 137 referências, 59 momentos e 62 estados. Pra sua última entrega fechar tudo de uma vez, junto aqui o que ainda depende de você.

## 1. Desta entrega · as perguntas

O protótipo está construindo com o padrão entre parênteses. Se o padrão estiver certo, basta confirmar.

1. **As outras duas empresas do caso `varias-empresas`.** A Transportes Capibaribe e a Expresso Caruaruense trazem só a contagem (4 e 2 unidades), e não as unidades. Escolhida uma delas, o *Ver as unidades* não tem o que mostrar. *(Padrão: as três se escolhem, como a T02/05 desenha. Com uma das duas, o primário espera, desabilitado, porque mostrar algo seria inventar dado.)* **Preciso de:** as unidades delas no caso (nome, região e pacote), ou a sua confirmação de que só a empresa do herói anda.
2. **Trocar de empresa com o módulo conectado.** O `logica.md` diz que pede a mesma confirmação do trocar de unidade, mas não tem quadro nem texto. *(Padrão: o diálogo da T04/09, com o título "Trocar de empresa", o texto "é encerrada antes da troca, sem homologar." e o botão "Encerrar a sessão e trocar". Depois dos 4 passos, abre a T02/05.)* **Preciso de:** o quadro, ou o ok nesses textos.
3. **O *Ver as unidades*.** Ele está no `tela.md` da T02, mas não no `textos.md`: o 05 só traz *Escolha uma empresa*. E não há referência da empresa escolhida. **Preciso de:** o quadro da T02/05 com uma empresa escolhida, e o texto no `textos.md`.
4. **O *Encerrar sem homologar?* fora do menu.** A T04/13 desenha o diálogo por cima do menu. *(Padrão: nas outras telas com faixa, ele abre por cima da própria tela, e o *Continuar a instalação* deixa o técnico ali.)* **Confirme**, ou desenhe o quadro numa tela de fluxo, por exemplo a T07.
5. **O *Encerrar a sessão* das folhas do módulo e do ativo.** *(Padrão: a folha fecha, e o diálogo abre por cima do menu.)* **Confirme.**
6. **O *Trocar de empresa* da T02/06 volta pra T02/05.** *(Padrão: como a referência desenha, sem nada escolhido.)* **Confirme**, ou diga se a empresa atual já vem marcada.
7. **O voltar do Android na T02 com várias empresas.** *(Padrão: no 06, faz o mesmo que o *Trocar de empresa*. No 05, não faz nada, como no 00.)* **Confirme.**

## 2. Desta entrega · o que achei na junção, pra corrigir na fonte

- **O "como se chega" da T04/07, 08 e 09 veio como "—".** Aconteceu no `estados.md` da T04, nas tabelas do `logica.md` e no `indice.json`, que veio também com o caso vazio. Mantive o nosso, com a palavra unidade: *tocar no nome da unidade*, *trocar com evidência subindo* (`filaSaida`), *trocar com a sessão aberta*.
- **O trecho do `leis.md` acrescentou a lei 17 de novo.** A nossa já existia, mais longa. Ficou a nossa, e a 18 logo depois.
- **Vários "depois" traziam linhas que o nosso arquivo já tinha:** os casos do login no `mocks.js`, a T05, a T10, o 04 no `textos.md` da T02, o `casos.md`, a seção da busca e as linhas T01/15 e 16 no `logica.md`. Entraram sem duplicar.
- **14 HTML vieram sem o PNG novo:** T04/00, 02, 03, 04, 10, 11 e 12 · T09/00 e 04 · T14/06 · T11/02 · T06/04 e 06 · T12/01. Mande os PNG, ou diga que o desenho delas não mudou.
- **O gate não confere o caso `varias-empresas`.** O protótipo acrescentou a checagem: confira.
- **Os números do seu "antes" no `CLAUDE.md` e no `LEIA-PRIMEIRO.md` eram os antigos.** Os nossos hoje são: 280 tokens (mais os do rodapé novo), 131 peças no protótipo e 50 casos no mock (os seus 43 e os nossos 7).

## 3. O que continua aberto das entregas anteriores

- **T05 · o ritmo da busca de novo:** o quadro da T05/00 fica **400 ms** na tela. É proposta nossa, e o `movimento.md` não tem esse tempo. O número é seu e do diretor.
- **O caso `lista-longa-garagens`:**
  - o pacote não declara os modelos de ativo, os cartões e o tempo por item (o *faltam ~N s*);
  - as unidades do caso repetem `pacoteIdadeDias`, `pacoteHora` e `ativos`, que agora também estão no pacote de cada uma;
  - o mundo das seis unidades chega até o menu, mas sem os ônibus delas.
  - **Pra decidir:** o caso ganhar esses dados, ou o mundo do caso parar no menu.
- **T06 · a instrução com um termo na busca:** o protótipo tira *Escolha o veículo que está na sua frente.* sempre que há um termo na busca. **Pra decidir:** é essa a regra, ou ela sai só quando a busca esconde o marcado?
- **A faixa da sessão sem a linha de baixo, ou encolhendo:** na T11, na T12 (00, 01, 03), na T13 (item reprovado, D e E) e na T14 (01, 04, 06). **Proposta:** a faixa com a linha e sem encolher em todos os HTML.
- **T01:**
  - o 9:41, o 0:44 e o 9:28 da 03, da 04 e da 05 não saem do mock;
  - o *Confirmar* aparece aceso com as células vazias na 12 e na 13 (é 5,9%, só no botão);
  - o teto da hora, depois do último reenvio, não tem desenho nem texto;
  - no canal e-mail, as duas linhas mostram o mesmo destino.
- **T13:**
  - o item reprovado (09) desenha o herói com 10,2 V, e o caso é o QJF-2C61 com 10,9 V;
  - o singular: *você fotografa 1 item* e *1 foto tirada*.
- **T14/05:** o evento chega aos 24 s do mock. **Proposta:** 0:24, a barra em 80% e 14:30:24.
- **T15:**
  - a evidência do RSW-9L02 é de 2 dias, e não *ontem 10:05*;
  - a 01 desenha outro recorte da fila;
  - a 02 cruza unidades pra dar o 4;
  - o *14:02* da 03 e da 04 não existe no mock.
- **T16:**
  - o *não se aplica* só aparece desenhado na 02 e na 05;
  - o subtítulo está montado de dois jeitos;
  - o vão do miolo é 14 numa metade e 12 na outra;
  - a nota NÃO RODARAM mistura duas peças.
- **T11/02:** a tradução deve ser a *urbano v3*, a do RKT-8H42, e não a *frota v2*.
- **T12 e T06:** há folga dupla antes do rodapé. **Proposta:** tirar a margem do último grupo.
- **T04:** o h1 escondido *Menu* só existe nas referências dos diálogos.
- **T05:** o ENCERRAR apagado "enquanto a pré-checagem corre" não aparece, porque a faixa só desce quando a pré-checagem aprova.
- **As listas de peças:** a T01, a T02, a T12, a T13 e a T15 listam peças que nenhuma referência delas desenha. A lista medida de cada uma está na seção do protótipo do `tela.md`.

## 4. O formato

O de trechos funcionou muito bem. Pra próxima:

- **o "antes" com a linha inteira.** Quando o "antes" é só o começo de uma linha nossa mais longa, sobra o resto dela;
- **partir dos arquivos atuais do projeto;**
- **o PNG de toda referência que trocar.**

Obrigado.
