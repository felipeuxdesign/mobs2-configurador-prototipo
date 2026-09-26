# app/

O protótipo navegável do App Configurador Mobs2 — Vite + React 18, em JavaScript. A estrutura e as regras estão em `../CLAUDE.md`; os ciclos, em `../ciclos.md`.

## Rodar

```
npm install        # uma vez
npm run dev        # http://localhost:5173 — o palco com o celular
npm run build      # a versão de produção, em dist/
npm run preview    # abre o build em http://localhost:4173
```

## Conferir

```
npm run checar     # o gate do mock, tokens.json = tokens.css, as sementes e as receitas, as contas do teclado e do retrato, os toques do login sem conexão, do Bluetooth e da câmera sem a permissão, e a higiene do código
npm run gate       # só o gate do mock
npm run tokens     # regenera 03-design-system/tokens.json a partir do tokens.css
npm run print -- "http://localhost:5173/?print=1" prints/x.png      # 360 × 800 a 2×
npm run comparar -- prints/x.png ../../02-telas/T01-login/referencias/png/00-tela.png
node scripts/caminho.mjs todos    # os roteiros de scripts/caminhos/, tocando como o técnico (o teclado e o retrato também)
node scripts/aceso.mjs            # a régua do botão aceso que não faz nada (regra 12), em cada tela e momento, e nos lugares que nascem de um toque
node scripts/provas-palco.mjs     # as provas da decisão 43 no protótipo rodando: a barra de status (30, e o que vem embaixo em y = 30) e a hora na Google Sans nas 145, a moldura, o centro e a coluna a 1440 × 900 e 1920 × 1080, o vão da T16 e a folga antes do rodapé da T06 e da T12 · e os quatro modos do palco (e a folha 00) lado a lado com os quadros, em ../../para-o-arquiteto-palco/ (o scripts/provas-palco-lado-a-lado.py, com a PIL) · grava prints/tmp/relatorios/palco-provas.json e .txt
```

`?print=1` mostra só a tela do app, sem o palco — é o que se compara com o PNG de referência.

## De fora da app

O mock (`04-dados/mocks.js`), os tokens (`03-design-system/tokens.css`), a fonte e a marca (`05-recursos/`) são lidos de onde estão — nunca copiados pra cá (`../publicar.md`). Na Vercel, "Include files outside the Root Directory" precisa estar ligado.
