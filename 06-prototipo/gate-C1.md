# Gate C1 · Fundação

**Data:** 2026-09-24 · **Estado:** o diretor liberou a execução dos ciclos em sequência, com os padrões do C0, até a cota acabar. Este gate registra o que eu medi e decidi; construo logo depois, sem esperar o *vai*.

## O censo · o que existe hoje

- **Na pasta:** o que o C0 mediu, mais os ajustes de 24/09 (a logo no `--lima`, o login sem a frase dos 7 dias, o checkbox com as margens, o checkbox marcado na folha 6, a Lei 15 e a decisão 28). As referências continuam 105; os `textos.md` batem com o HTML nas 105; o `indice.json` resolve os 210 caminhos; o gate do mock passa 68 de 68.
- **Em `06-prototipo/app/`:** só o `README.md`. Não há projeto nem código.
- **Git:** não existe repositório.
- **Na máquina:** node 24.16, npm 11.13 e o Chrome, com acesso ao registro de pacotes. As versões que eu vou fixar: vite 8.3.0, @vitejs/plugin-react 6.1.1, react e react-dom 18.3.1, lucide-react 1.47.0.

## Os achados deste ciclo

1. **`componentes.md` tem 115 peças, e os números da versão dizem 114.** A linha "checkbox marcado" entrou em 24/09. Atualizo os números da versão no fim do ciclo, pelo medido.
2. **O `leis.md` diz "botão a 8px de qualquer vizinho"**, e o arquiteto disse que a lei vale pra todo tocável. A lei muda neste ciclo.
3. **O bloco de tokens novos não fecha de uma vez.** Muitos valores sem token só ganham nome quando a peça que os usa é construída (as linhas de 43, 45, 58, 62, 70 e 78, os pesos de letra). Entram agora os que têm papel claro; o resto entra no C2, peça a peça, com o papel escrito.

## As decisões deste ciclo

Adoto os padrões do gate C0, liberados pelo diretor: **G1 a G9, todos com a opção (a)**, e as respostas dele a G12 e G24 (a lei se ajusta às telas). No detalhe:

- **C1·1 · A norma é o `tokens.css`** (G3). Saem os 3 duplicados (`--poco-24`, `--poco-32` e `--poco-44`, na linha 103–104). O `tokens.json` passa a ser gerado do CSS por script, com os tempos em 150, 200 e 300ms, e o script `checar` confere que os dois batem.
- **C1·2 · Os tokens novos com papel claro**, num bloco próprio do `tokens.css`: a barra do sistema (30), o campo (54), os traços de 1 e 2, a marca no login (207 do topo, 196 de largura), os espaçamentos de letra (os 10 que o próprio `tokens.css` já descrevia em comentário, mais os 5 medidos: 0,1 da hora da barra, 0,3 da identidade na faixa, 0,6 do ENCERRAR, 1,2 do CONFIGURADOR e 2 dos pontos da senha), e os tempos que o `movimento.md` e as telas pedem (100ms do soltar, 80ms entre as linhas da busca, 40ms entre as rodinhas do tambor), que zeram no reduzir movimento.
- **C1·3 · A fonte vem dos woff2 de `05-recursos`** (G6), lidos de fora da app. O `06-prototipo/CLAUDE.md` e o `publicar.md` passam a dizer isso.
- **C1·4 · O mock entra por import de efeito colateral**, congelado, numa ponte em `src/dados/` (G7). O gate ganha as checagens do que as telas leem e passa a varrer `app/src` atrás de relógio e acaso.
- **C1·5 · A ferramenta de print** é o Chrome da máquina, headless, a 360 × 800 com escala 2, e o protótipo tem um modo `?print=1`, que mostra só o celular, sem palco. A comparação com o PNG usa `pngjs` e `pixelmatch`, como dependências de desenvolvimento.
- **C1·6 · As leis se reescrevem pelas telas** (resposta do diretor ao G12 e ao G24). A Lei 3 passa a descrever o que as telas fazem; as Leis 1, 4, 5, 6, 7, R-03 e o "nada encosta" ganham as exceções declaradas; as leis de ergonomia (toque de 48, texto de 12, tinta mínima) ficam, com as exceções nomeadas. As linhas novas levam a marca "para revisão do arquiteto".

## Entra

O repositório git e o primeiro commit (a pasta como o C0 a deixou) · o projeto Vite + React 18 em `06-prototipo/app`, com a estrutura de `06-prototipo/CLAUDE.md` (`src/ds`, `src/telas`, `src/estado`, `src/palco`, `src/dados`) · os tokens, a fonte e os ícones · a ponte do mock, o `formato.js` e o `ritmos.js` · o estado único vazio, com a forma completa · o celular de 360 × 800 vazio · a ferramenta de print e o script `checar` · as leis reescritas · os números da versão pelo medido.

## Não entra

Nenhuma tela, nenhuma peça do design system, o palco (só o celular vazio, no centro).

## Está pronto quando

`npm run dev` abre o celular vazio em 360 × 800 · o print sai em 720 × 1600 · `npm run checar` aprova (gate do mock, tokens, higiene) · o commit do C1 está feito.
