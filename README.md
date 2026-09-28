# App Configurador Mobs2

<p align="center">
  <img src="05-recursos/readme/caminho-do-heroi.gif" alt="O caminho do técnico no protótipo: o login, a empresa e a unidade, o pacote do dia, o menu, a conexão com o módulo, a pré-checagem, o ônibus confirmado, a leitura da CAN e a configuração gravada e relida" width="330">
</p>

<p align="center"><b><a href="https://configurador-mobs2-prototipo.vercel.app">Abrir o protótipo navegável →</a></b></p>

O app que o técnico de campo usa pra **instalar e homologar rastreadores em ônibus**: conectar o módulo, gravar a configuração, calibrar, rodar o ciclo dinâmico e fechar o checklist. **A evidência é gerada pelo sistema e nunca digitada.** O técnico trabalha de luva, dentro do ônibus, com pressa e às vezes no sol, e cada tela foi desenhada pra esse lugar.

Este repositório tem o **design fechado e medido** e o **protótipo navegável** construído a partir dele, tela por tela, contra o gabarito.

## O protótipo

No computador, o celular aparece na moldura, em tamanho real quando a janela cabe, e anda só por toque, do login ao encerramento da sessão. No celular, o app ocupa a tela inteira. Em volta dele fica o palco:

- **as telas:** o quadrado no canto de cima abre o painel, e qualquer uma das 16 telas abre direto por ele;
- **os estados:** a coluna ao lado do celular lista os estados da tela aberta (sem rede, pacote vencido, módulo que não responde…). Cada um abre montado pelo caso do mock, parado, como a referência desenha, e o `Voltar ao fluxo` devolve o instante de antes;
- **o endereço:** cada tela, momento e estado tem o seu link (`?tela=T05&estado=…`), e o link aberto de novo mostra o mesmo quadro;
- **o recomeço:** recarregar a página volta ao login.

## Os números desta versão

| telas | momentos | estados | histórias de usuário | tokens | peças no design system | casos no mock |
|---|---|---|---|---|---|---|
| 16 | 63 | 68 | 107 | 295 | 132 | 55 |

As **147 referências** (16 telas, 63 momentos e 68 estados) têm, cada uma, um HTML e um PNG. O protótipo é medido contra elas, pixel a pixel. Toda diferença que sobra tem um desvio nomeado, com o porquê.

## Como foi feito

- **O design decide, e o protótipo constrói.** O comportamento de cada tela está no `tela.md` e no `estados.md` dela, os textos exatos no `textos.md`, os valores no `tokens.css`, as leis no `leis.md` e o movimento no `movimento.md`. O código não inventa número, texto nem cor.
- **Medir antes de afirmar.** Cada ciclo abriu com um gate (o censo, os achados, as decisões numeradas com o padrão adotado) e fechou com a régua: as fotos contra as referências, os textos, os espécimes das oito folhas do design system, os 42 roteiros que andam o app por toque e o gate do mock.
- **As leis do toque.** O técnico toca, e o que responde é o pressionado. Não há hover. O estado muda o conteúdo, nunca o desenho. O que está desabilitado aparece em tinta apagada. Só transform e opacity se movem: nada anima a entrada de uma tela, e nada fica em loop.
- **Mesma entrada, mesma saída.** O relógio do produto está parado às 14:30, e não há nada aleatório no código.

## A pasta

```
01-produto/          por que existe, pra quem, as regras de negócio, as histórias e os fluxos
02-telas/            uma pasta por tela: ficha, estados, animação, textos e o gabarito visual
03-design-system/    tokens, leis, movimento, componentes e as oito folhas desenhadas
04-dados/            o mock (o contrato de dado) e o gate que prova que ele não mente
05-recursos/         a marca, a fonte e os ícones
06-prototipo/        o protótipo navegável, o palco, os ciclos e a régua
07-decisoes/         o porquê de cada escolha, com o que foi descartado
08-produto-real/     notas pro dev do produto real: o que é norma, o que o protótipo simula
```

As pastas de 01 a 07 são a fonte do produto. A ordem de leitura de cada perfil está no [`LEIA-PRIMEIRO.md`](LEIA-PRIMEIRO.md), e o registro de tudo o que mudou, no [`CHANGELOG.md`](CHANGELOG.md).

## Rodar no computador

```bash
cd 06-prototipo/app
npm install
npm run dev
```

O protótipo abre em `http://localhost:5173`. A régua fica em `06-prototipo/app`: `npm run checar`, `npm run build` e `npm run gate`, e, com os fotógrafos no ar (`npm run fotografo` e `npm run fotografo:1`), `node scripts/tela.mjs todas`, `node scripts/textos.mjs T01` e `node scripts/caminho.mjs todos`. O cabeçalho de cada script explica o que ele mede.

## Pro dev do produto real

O protótipo é **uma forma de consumir esta pasta**, não a especificação. O produto se constrói a partir das mesmas fontes, na stack que o time escolher. A pasta [`08-produto-real/`](08-produto-real/) separa o que é regra do produto do que o protótipo só finge: o mock, os tempos dos processos, o relógio parado e o palco.
