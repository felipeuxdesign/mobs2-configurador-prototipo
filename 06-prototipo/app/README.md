# O protótipo navegável

Vite + React 18, em JavaScript. As regras estão em [CLAUDE.md](../CLAUDE.md), a navegação em [logica.md](../logica.md) e os acessos de apresentação em [palco.md](../palco.md). Para implementar o produto com serviços e equipamento reais, comece pelo [guia do dev](../../08-para-o-dev/README.md).

## Rodar

Execute nesta pasta:

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview    # http://localhost:4173
```

## Verificação local

```bash
npm run checar     # mock, tokens, receitas, regras locais e higiene do app
npm run gate       # somente o contrato do mock
npm run tokens     # gera tokens.json a partir do CSS normativo
```

Com o servidor na porta 5173 e `npm run fotografo` aberto em outro terminal:

```bash
node scripts/caminho.mjs heroi
node scripts/caminho.mjs conferencia
node scripts/caminho.mjs familias
node scripts/testar-consultas.mjs
```

O último script verifica os 15 exemplos especiais parados, os retornos ao percurso guardado e as três entradas normais do painel. Ele usa o Chrome do fotógrafo na escala 2. Os resultados do último aceite de navegação estão no [gate de consultas](../para-o-arquiteto/gate-consultas-paradas.md).

Há 45 roteiros em `scripts/caminhos`. Alguns roteiros históricos ainda usam acessos sintéticos que foram substituídos por consultas paradas. Antes de usar `node scripts/caminho.mjs todos` como aceite, leia [testes-prontos.md](../../08-para-o-dev/testes-prontos.md); a última rodada não executou o lote inteiro.

## Comparar o desenho

Mantenha o servidor e os dois fotógrafos em terminais separados: `npm run fotografo` (escala 2) e `npm run fotografo:1` (escala 1). Reutilize processos já abertos.

```bash
node scripts/tela.mjs todos T11       # somente as referências da T11
node scripts/tela.mjs todas           # 199 referências das 15 telas
node scripts/especime.mjs todos       # 114 espécimes comparáveis da vitrine
npm run print -- "http://localhost:5173/?tela=T01&print=1" prints/x.png
npm run comparar -- prints/x.png ../../02-telas/T01-login/referencias/png/00-tela.png
```

`?print=1` abre a referência congelada, sem o palco. O [guia de comparação](../../08-para-o-dev/conferir-contra-o-design.md) explica a diferença entre comparação com HTML e PNG e os desvios registrados. As ferramentas `aceso.mjs` e `provas-palco.mjs` continuam no repositório; seus pressupostos históricos devem ser conferidos antes de usá-las em novos acessos.

## Fontes e publicação

O [mock](../../04-dados/mocks.js), os [tokens](../../03-design-system/tokens.css), as fontes e a marca em `05-recursos/` são consumidos das pastas de origem. A configuração de publicação está em [publicar.md](../publicar.md); na Vercel, incluir arquivos fora da Root Directory é obrigatório.

Nenhuma integração real acontece aqui. Dados, leituras, envio, câmera e persistência são simulados; o palco, suas sementes e os tempos de apresentação não devem ser levados para o produto.
