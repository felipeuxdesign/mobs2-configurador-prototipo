# Os testes que já estão prontos

Os casos, roteiros e comparações do protótipo ajudam a preparar o aceite do produto. A existência de um roteiro não significa que ele foi executado na última versão.

## Os casos do mock

São **62 casos** em [mocks.js](../04-dados/mocks.js). Cada caso descreve uma condição de exemplo, e [casos.md](../04-dados/casos.md) relaciona as referências e receitas que a usam. O [índice](../02-telas/indice.json) lista **191 referências**, com sua classificação e os casos associados. Algumas condições complementares vêm das [receitas](../06-prototipo/app/src/estado/receitas.js); nem toda referência nasce de um caso exclusivo.

No produto, monte a condição real correspondente, abra a tela e confira os dados, ações e aparência. O palco deixa as consultas paradas para inspeção; isso não dispensa implementar a reação da tela à condição real.

## Os roteiros de navegação

Existem **45 arquivos** em [scripts/caminhos](../06-prototipo/app/scripts/caminhos/). Os passos tocam pelos nomes acessíveis e verificam telas, textos, ações, movimento e tempo dos processos.

| Roteiro ou verificação | Cobertura e estado de validação |
|---|---|
| `heroi.mjs` | Caminho principal do login ao menu sem sessão, com ônibus sem calibração, ciclo de quatro passos, checklist registrado e homologação na T16. **239 passos aprovados** no ciclo de consultas paradas. |
| `heroi-sem-horimetro.mjs` | Conserva o nome histórico; hoje verifica entrar no ciclo pela Seção E do checklist depois de voltar da calibração ao menu. O ônibus atual não tem horímetro a pular. Não foi executado no ciclo de consultas paradas. |
| `conferencia.mjs` | **100 passos aprovados** naquele ciclo: fechar a folha por quatro caminhos, registrar, reenviar e inspecionar as consultas bloqueadas. |
| `mov-t11.mjs`, `mov-t10.mjs` | **132 e 78 passos aprovados**, respectivamente, naquele ciclo. |
| `familias.mjs` | **28 passos aprovados** naquele ciclo, conferindo a organização e os acessos da coluna. |
| [testar-consultas.mjs](../06-prototipo/app/scripts/testar-consultas.mjs) | Aprova 15 consultas pela coluna e URL, inércia após toque/Esc/tempo, cinco retornos e três entradas normais do painel. |
| `portas.mjs`, `abortada.mjs`, `lembrar.mjs`, `recuperar.mjs`, `mov-<tela>.mjs` e os demais | Cenários reutilizáveis, com resultados de suas rodadas nos gates. Não têm aceite coletivo na versão atual apenas por estarem nesta pasta. |

A evidência dessa rodada está no [gate de consultas paradas](../06-prototipo/para-o-arquiteto/gate-consultas-paradas.md). O ciclo atual de documentação e retorno do login tem a validação registrada no [gate atual](../06-prototipo/para-o-arquiteto/gate-documentacao-atual.md).

**Antes de rodar o lote completo**, migre os trechos que ainda usam entradas sintéticas para navegar exemplos hoje parados. Isso inclui `empresa`, `voltar`, `teclado`, `reler`, `mov-t02`, `mov-t03`, `mov-listas`, `mov-faixa` e `mov-porcima`. A regra de produto continua nas fichas; os acessos antigos desses testes não constituem um fluxo alternativo aprovado.

## O gate de dados e as checagens locais

[gate-cobertura.js](../04-dados/gate-cobertura.js) confere relações e âncoras específicas do mock. `npm run checar` acrescenta sincronização dos tokens, cobertura das receitas, regras puras das telas e higiene do código. Esses testes não substituem uma integração nem a navegação no navegador.

Para validar dados reais, adapte a entrada do gate e preserve as relações pertinentes; placas e contagens do exemplo não são exigências de todo pacote real.

## Rodar

Na pasta `06-prototipo/app`:

```bash
npm install
npm run checar
npm run build
npm run dev
```

Em outro terminal, na mesma pasta:

```bash
npm run fotografo
node scripts/caminho.mjs heroi
node scripts/testar-consultas.mjs
```

`caminho.mjs` usa uma aba própria do Chrome do fotógrafo, ou abre um Chrome próprio quando ele não está disponível. Para os scripts de comparação que pedem escala 1×, use também `npm run fotografo:1`. `node scripts/caminho.mjs todos` executa os 45 arquivos, com as limitações de migração descritas acima. Os comandos e saídas de comparação estão em [conferir-contra-o-design.md](conferir-contra-o-design.md).
