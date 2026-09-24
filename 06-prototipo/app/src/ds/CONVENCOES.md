# As convenções do design system

O que vale pra toda peça em `src/ds/`. Vem das leis (`03-design-system/leis.md`) e do gate C0.

## Onde mora

- **Primitivos** em `src/ds/primitivos/`: `Poco`, `Glifo`, `Icone`, `Quadrado` e `Led` (marcadores), `Tocavel`, `Primario`, `SoIcone`, `Link`, `Checkbox`. Importe de `src/ds/index.js`.
- **Cada família** em `src/ds/<familia>/`: um `.jsx` e um `.css` por peça, e um `index.js` da família. Classes com prefixo `ds-`.
- **Os espécimes da vitrine** em `src/vitrine/especimes/f<folha>-<familia>.jsx`, exportando `especimes = [{ id, folha, rotulo, legenda, chrome?, render }]`. O `rotulo` é o texto exato do rótulo do espécime na folha. `chrome: true` quando a moldura da folha tem recheio 0.

## O CSS

- **Só tokens.** Todo tamanho, cor e tempo vem de `var(--…)` de `03-design-system/tokens.css` (há `calc()` com tokens). Nenhum hex, nenhum px solto. Se falta um token, ele entra **com o papel escrito** (nunca pelo valor) e com quem usa, num `tokens-propostos.css` na pasta de quem pede (a família em `src/ds/<família>/`, ou a tela em `src/telas/Tnn/`), importado por ela; no fechamento do ciclo, o coordenador passa pro `tokens.css` e apaga o arquivo. Antes de criar, procure no `tokens.css` um token com o mesmo papel: mesmo valor e mesmo papel é o mesmo nome. (No C2, os 96 das famílias entraram no bloco *C2 · as peças* do `tokens.css`.)
- **Medida por dentro** (`box-sizing` já é global). **Números tabulares** (já na base).
- **Sem hover. Sem foco desenhado.** O que responde é o pressionado, com `:active` — por `Tocavel` (camada `--elevado`), `Primario` (roxo pressionado e escala), `Link` (duas camadas). Pra fotografar o pressionado parado, a classe `ds-forca-toque`.
- **Só transform e opacity se movem.** Cor não anima: duas camadas, e a de cima entra por opacity. Tempos: `--mov-rapido` 150 · `--mov-padrao` 200 · `--mov-lento` 300 · `--mov-solta` 100, curva `--mov-curva`. O reduzir movimento zera os tempos sozinho.
- **O marcador de escolha é um só, o `Quadrado`** (decisão 29): vazado de 11 no desmarcado, lima de 11 no marcado, que surge por opacidade e escala. Quem escolhe — o `Checkbox`, as linhas de escolha, a coluna do palco — põe o `Quadrado` num `Poco`: 24 no checkbox e na coluna, 30 na linha de lista. Nenhum poço de escolha fica vazio.
- **Glifo sempre pelo `Glifo`** (Lucide, com o nome pro leitor de tela), dentro de um `Poco` do tamanho da linha: 38 → 24, 44 → 30, 50 → 32. **Ícone pelo `Icone`**.

## A peça

- **Recebe o dado por props** — texto, número, estado. Nenhum texto das telas escrito dentro da peça: quem monta a tela passa o texto do `textos.md`.
- **Todo tocável tem nome** pro leitor de tela (o texto visível ou `rotulo`).
- **O estado muda o conteúdo** (Lei 3): as variantes da peça mudam o que ela diz, não o lugar das coisas.

## A bancada

Com `npm run dev` rodando: `node scripts/especime.mjs compara <folha> "<rótulo>" <id>`. Ela renderiza o espécime da folha e o da vitrine no mesmo Chrome, a 1×, e dá a diferença em %. Antes da foto, a moldura da folha vai pro pixel inteiro (a posição fracionária dela rasterizava o texto meio pixel deslocado), e a vitrine mede depois das fontes. `node scripts/especime.mjs todos` roda todos, folha a folha, e grava `prints/especimes/relatorio.json`. **A meta é 0%.** A exceção é o glifo desenhado à mão na folha, que o Lucide desenha um pouco diferente (G5): aí a diferença fica só no glifo, e isso se confirma olhando o `prints/especimes/<id>-diff.png`.
