# Gate · pacote 31 — o claro neutro frio, o logo e o palco

Gate sem espera. Por cima do 30 (51170a6).

## 1 · Censo

**201 referências** — 15 telas, **82 estados, 104 momentos** · **10 folhas** · **113 peças** no catálogo (entrou a linha *logo*; o pacote não cita o número, e os censos foram atualizados) · **300 tokens** (entrou o `--logo`) · 109 histórias · 63 casos · nenhum fluxo, texto ou dado do mock mudou.

O pacote trouxe 30 arquivos. Os 20 de referência (os pares da T01/00, 01, 10, 14, 15, 16 e 19, das folhas 1 e 10 e da cena 04 do palco) entraram inteiros. O `tokens.css`, o `tokens.json`, as leis, o catálogo, o README do design system, o `palco.md`, a `logica.md`, a decisão 25 e o CHANGELOG vieram de cópias antigas: entraram só as linhas deste pacote. O `08-produto-real/norma-e-ilustracao.md` é de uma pasta que virou `08-para-o-dev` em 27/09: a mudança dele entrou no `08-para-o-dev/README.md`, que é onde a norma mora hoje (o pacote dizia *nenhum entra*, e a pasta antiga não foi recriada). **A última linha do gate:** nenhuma divergência bloqueou — o commit foi feito.

## 2 · O escuro igual

A bancada das 201 contra a base do pacote 30 (`linha-de-base-30.json`): **iguais, uma por uma** — 38 em 0%, nenhuma com erro, nenhuma melhor nem pior. A T01 (os 7 estados com o logo e os traços) continua em 0% contra as referências novas: o logo desenhado inline pelo token sai igual à imagem, e os traços em `--borda-neutra` são os da referência.

## 3 · O claro novo, de ponta a ponta

O roteiro [`claro`](../app/scripts/caminhos/claro.mjs), **424 passos, aprovado**: liga o *Modo claro* na folha da Conta, desliga, liga, recarrega (o login claro) e percorre as 201 referências no claro. Em cada uma, a varredura das cores calculadas reprova:

- qualquer cor que só o escuro tem;
- **qualquer cor do claro do 30** (o lilás: as 18 cores dele que o neutro frio não repete) — **nenhuma sobrou**;
- texto ou ícone branco fora do botão principal;

e confere, com o esperado lido do `tokens.css`: as barras do sistema em `--tinta`, o véu a 32%, o primário roxo com o texto branco, o confere em roxo, **o logo roxo** (`--logo`, a cor e o preenchimento do desenho, nos 7 estados do login), **os traços do CONFIGURADOR** em `--borda-neutra`, e **o poço rebaixado com a borda de baixo cinza** (`--borda-poco`, `#E6E7EC`, visível sobre o cartão branco).

## 4 · O palco

O roteiro novo [`palco-claro`](../app/scripts/caminhos/palco-claro.mjs), **32 passos, aprovado**: o interruptor do pé da sidebar **troca só o celular** — o palco e a moldura continuam escuros, sem `data-tema` acima do celular · **ligado no palco, a Conta mostra ligado**, com a bolinha branca dentro do celular claro · **desligado na Conta, o palco mostra desligado** · ligado no palco e **recarregado, a escolha volta**, no app e no palco · no palco, a bolinha ligada é a lima do `--texto-primario` do escuro. A bancada do palco: a peça do painel aberto de 0,27% a **0,17%** contra a cena 04 redesenhada; as 47 conferências da moldura batem.

## 5 · A varredura de cor

Nenhuma cor escrita direto no código do protótipo (o `checar` reprova hex, rgb, rgba, hsl e hsla em `app/src`): **o claro neutro frio entrou sem nenhuma troca no app**, só pelos valores do bloco. **Nenhuma imagem com cor de marca gravada dentro:** o app só tinha uma, o logo, e ela trocou — o mesmo arquivo de `05-recursos/marca` agora entra inline, com o preenchimento em `currentColor` e a cor do `--logo`. O que trocou, então:

1. o logo: de imagem com o lima gravado a desenho pintado pelo `--logo`;
2. os traços do CONFIGURADOR: de `--borda-poco` a `--borda-neutra`.

O arquivo do logo continua com o lima, porque as referências HTML o mostram como imagem (`<img>`); o app nunca usa essa cor. As outras imagens do app são as barras do sistema, que já trocavam de cor pela `--tinta` desde o 30.

**A vitrine** (114 espécimes) igual à do pacote 30: a mesma única piora, o relógio da rechecagem (o desvio nomeado do 30). **Roteiros:** os 48 (`todos`): 38 aprovados — o `claro` 424 passos, o `palco-claro` 32, o `heroi` 239, o `mov-t04` 283, o `mov-t09` 240, o `reenvio` 73, entre outros — e os mesmos 10 parados nos mesmos passos de antes do pacote 29 (`empresa` 453, `mov-faixa` 62, `mov-listas` 77, `mov-porcima` 97, `mov-t02` 4, `mov-t03` 45, `recarregar` 16, `reler` 2, `teclado` 63, `voltar` 52) · o `palco-claro` parou uma vez na suíte, no passo 23, porque tocava o interruptor com a sidebar ainda deslizando: ganhou a espera dela abrir e passou duas vezes seguidas. `checar` e build aprovados.

## O que entrou além do prompt, e por quê

1. **A data do pé do painel** (`app/src/palco/versao.js`) estava parada em 09/10: os pacotes 29c e 30 não a atualizaram. Agora 12/10.
2. **A `logica.md` ganhou a seção *O tema*** (o 30 não a tinha escrito): o estado único, o palco escuro, o armazenamento limpo em cada roteiro.
3. **O roteiro `claro` lê o esperado dos tokens**, em vez das cores escritas à mão — sem isso, ele reprovaria a paleta nova.
4. **A pedido, durante o pacote:** nenhum GIF do claro nem do palco — o do 30 saiu do repositório e do README, com o roteiro que o gravava (`readme-claro`) · os READMEs sem gate e sem PM, com as frases reescritas mantendo a regra · por isso o prompt (*regrave o GIF do modo claro, grave um do palco*) não foi seguido nesse ponto.
5. **O GIF do topo** (o caminho feliz, no escuro) não foi regravado: no escuro, a única mudança que ele mostraria são os traços do login, quase iguais.

## Desvios nomeados

1. O `08-produto-real/norma-e-ilustracao.md` do pacote não foi criado: a norma mora no `08-para-o-dev/README.md` desde 27/09.
2. O arquivo do logo em `05-recursos/marca` continua com o lima gravado: as referências o usam como imagem. A regra *nunca com a cor dentro do arquivo* vale pra como o app o desenha.
3. A peça *logo* entrou no catálogo, e ele passa a 113 peças, número que o pacote não citou.
