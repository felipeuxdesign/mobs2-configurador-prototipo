# Gate C14 · No ar, e o fecho do projeto

**Estado: fechado (27/09).** O diretor mandou ir até o fim (27/09): o protótipo como projeto, pronto pra entregar ao dev.

## O censo

- **no ar desde 25/09:** https://configurador-mobs2-prototipo.vercel.app, publicado pelo push em `main` (o repositório `felipeuxdesign/configurador-mobs2-prototipo`), sem senha desde 26/09 (diretor) · a etiqueta do palco diz **C14 · 2026-09-27** (`app/src/palco/versao.js`)
- **os números:** 16 telas · 63 momentos · 68 estados · 107 histórias · 295 tokens · 131 peças no design system · 55 casos no mock · 147 referências
- **a régua do último ciclo (C13):** as 147 iguais à base, 41 em 0% do HTML e as 106 com o desvio nomeado; os textos, as 8 folhas e o palco sem diferença sem nome

## O que entrou

1. **o `README.md` na raiz:** o GIF do caminho do herói no topo, do login à cadeia gravada, gravado do protótipo rodando (`05-recursos/readme/caminho-do-heroi.gif`, 330 de largura, 25 s, 0,9 MB); o link do protótipo, sem senha; o que é o produto; o palco; os números; como foi feito; a pasta; rodar no computador; pro dev
2. **a gravação é da régua:** o `caminho.mjs` grava a tela com `GRAVA=<pasta>` (e `GRAVA_JANELA=1280x900`, o palco com a moldura) e o `scripts/gif.py` monta; o roteiro `readme.mjs` é o começo do caminho do herói no ritmo de quem olha, e passa no `caminho.mjs todos` como os outros · refazer: `05-recursos/README.md`
3. **o `LEIA-PRIMEIRO.md` aponta pro README** (a regra do arquiteto, 26/09); as pastas de 01 a 07 seguem a fonte
4. **a raiz arrumada pra quem chega de fora:** os relatórios pro arquiteto (`diferencas-para-o-arquiteto.md`, `para-o-arquiteto-*.md` e a pasta do palco) juntos em `06-prototipo/para-o-arquiteto/` (`diferencas.md`, `alinhamento.md`, `T13-checklist.md`, `ultima-entrega.md`, `palco/`); as referências vivas foram atualizadas, e as do `CHANGELOG.md` ficam como o registro de quando foram escritas
5. **a `08-produto-real/`, pelo critério** (o arquiteto e o diretor, 26/09: o que é útil ao dev e não está em outro lugar fica, como notas pro dev; o resto sai): os cinco arquivos ficam — o que é norma e o que é ilustração, o que o protótipo simula, o que não depende da stack, e os padrões adotados onde o produto ainda decide. Nenhum deles está em outro lugar do mesmo jeito. Saiu o jeito de *perguntas com o PM* (o diretor, 26/09: não se cobra nada do PM): as pendências viram *o que o produto ainda decide*, com o padrão do protótipo, e a stack *é do time que vai construí-lo*

## Está pronto quando

- [x] o link público abre (200), com a etiqueta **C14 · 2026-09-27** no build publicado
- [x] o README mostra o GIF, o link e como rodar, sem senha
- [x] o `LEIA-PRIMEIRO.md` aponta pro README
- [x] a raiz tem só o README, o LEIA-PRIMEIRO, a LEI (`CLAUDE.md`), o CHANGELOG, as oito pastas e os documentos do v1
- [x] `npm run checar`, `npm run build` e o gate do mock aprovam
