# Ciclo C0 · Estudo da pasta inteira

## Neste ciclo você NÃO

- escreve código, cria o projeto Vite ou instala qualquer pacote
- cria ou altera arquivo fora de `06-prototipo/gate-C0.md`
- resume por cima, estima contagem ou pula referência — **cada número sai de medição**

## Quem você é aqui

O executor de um projeto cujo design está **fechado, medido e aprovado**. Você vai construir o protótipo navegável do App Configurador Mobs2 — mas não agora. Agora você **estuda, mede e devolve o que entendeu**, e só começa quando eu disser *vai*.

## O que ler, nesta ordem, inteiro

1. `LEIA-PRIMEIRO.md` e `CLAUDE.md`
2. `06-prototipo/CLAUDE.md`
3. `01-produto/` — os cinco arquivos, **o `dominio.md` inteiro**
4. `03-design-system/` — `README.md`, `leis.md`, `movimento.md`, `componentes.md`, `tokens.css`, e **as oito folhas em `referencias/png/`, olhando cada uma**
5. `04-dados/` — `contrato.md`, `casos.md`, e o `mocks.js` inteiro
6. `06-prototipo/` — `logica.md`, `palco.md`, `ciclos.md`, `publicar.md`, e os cinco quadros em `palco/referencias/png/`
7. `07-decisoes/` e `08-para-o-dev/`
8. **`02-telas/`, tela por tela** — o passo mais importante, descrito abaixo

## As 15 telas, uma por uma

Pra **cada uma** das 15 pastas de `02-telas/`:

- leia `tela.md`, `estados.md`, `animacao.md` e `textos.md`
- **abra cada PNG de `referencias/png/`** — todas as 153 referências, sem exceção — e olhe a tela como o técnico olharia
- abra o HTML da `00-tela` e **leia as medidas reais** das peças principais
- confira se cada estado tem um caso do mock que o produz, abrindo o caso em `mocks.js`

E escreva, pra cada tela:

1. **o que ela faz**, em uma frase sua — não a da ficha
2. **as peças do design system** que você vai usar, e qualquer peça que você não encontrou nas folhas
3. **cada estado e momento**: como você vai montá-lo a partir do dado, em uma linha
4. **cada movimento** da `animacao.md` e como você pretende fazer, em uma linha
5. **o que pode dar errado** na construção dela

## Rode e meça

- `node 04-dados/gate-cobertura.js` — e copie o resultado
- conte, **a partir dos arquivos** e não dos textos: as telas, os momentos e os estados pelo `02-telas/indice.json`; as peças em `componentes.md`; os casos em `mocks.js`; os tokens em `tokens.css`. **Se algum número divergir do que a documentação diz, o medido vence** — e isso é um achado

## O que você devolve · `06-prototipo/gate-C0.md`

1. **O produto em suas palavras** — o problema, o usuário, a tese. Meia página
2. **O censo medido** — cada contagem, com de onde saiu
3. **As 15 telas** — os cinco itens de cada uma
4. **Os achados** — tudo que contradiz outra parte da pasta, com a prova: arquivo e linha, ou referência e o que se vê nela
5. **As divergências** — o que você encontrou além do que estava descrito
6. **As decisões numeradas** — cada dúvida já com o padrão que você adotaria: *G1: (a) ou (b); vou de (a) porque…*
7. **O que não faz sentido** — com o motivo. Você pode discordar da pasta, **desde que prove**
8. **O plano de ciclos revisado** — o `ciclos.md` como você o executaria, com o que mudaria e por quê

## Está pronto quando

- o `gate-C0.md` existe, com as oito partes
- as 15 telas estão analisadas, cada uma com os cinco itens
- o censo bate com o `indice.json`, ou a divergência está explicada
- o gate do mock está copiado com o resultado

Depois de entregar, **pare e espere o *vai***. A partir daí, cada ciclo começa com o gate dele e termina com os prints comparados às referências.
