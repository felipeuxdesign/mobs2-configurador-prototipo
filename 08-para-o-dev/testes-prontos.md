# Os testes que já estão prontos

Os casos, roteiros e comparações do protótipo ajudam a preparar o aceite do produto. A existência de um roteiro não significa que ele foi executado na última versão.

## Os casos do mock

São **63 casos** em [mocks.js](../04-dados/mocks.js). Cada caso descreve uma condição de exemplo, e [casos.md](../04-dados/casos.md) relaciona as referências e receitas que a usam. O [índice](../02-telas/indice.json) lista **199 referências**, com sua classificação e os casos associados. Algumas condições complementares vêm das [receitas](../06-prototipo/app/src/estado/receitas.js); nem toda referência nasce de um caso exclusivo.

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

A evidência dessa rodada está no [gate de consultas paradas](../06-prototipo/para-o-arquiteto/gate-consultas-paradas.md). A documentação e o retorno do login têm a validação registrada no [gate da recuperação](../06-prototipo/para-o-arquiteto/gate-documentacao-atual.md).

O ajuste do véu integral das folhas foi conferido com `mov-t04` (283 passos), `folhas` (154), `mov-t11` (132) e `conferencia` (100), além da cobertura e do toque no topo em seis quadros. As 12 referências afetadas e três controles visuais não pioraram contra a base anterior. O roteiro `readme` foi usado para regravar o GIF. Resultados e limites no [gate do véu integral](../06-prototipo/para-o-arquiteto/gate-veu-integral.md); não houve execução coletiva dos 45 roteiros.

O retorno do PM de 09/10 (a ordem do script) rodou a suíte inteira, 46 roteiros: 36 aprovados (o registro desta rodada dizia 37 por um erro de conta, corrigido no 29c), entre eles o novo `reenvio` (64 passos), que percorre o fluxo das cercas na manutenção — a folha de confirmação, o envio, a pergunta pelos dependentes, o Deixar para depois e o Finalizar travado no checklist. Os 10 que param (`empresa`, `mov-faixa`, `mov-listas`, `mov-porcima`, `mov-t02`, `mov-t03`, `recarregar`, `reler`, `teclado`, `voltar`) param no mesmo passo no commit anterior: usam exemplos que abrem parados desde 07/10. A vitrine passou inteira (114 espécimes, nenhum pior que a base). [Gate](../06-prototipo/para-o-arquiteto/gate-ordem-do-script.md).

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

`caminho.mjs` usa uma aba própria do Chrome do fotógrafo, ou abre um Chrome próprio quando ele não está disponível. Para os scripts de comparação que pedem escala 1×, use também `npm run fotografo:1`. `node scripts/caminho.mjs todos` executa os 48 roteiros, com as limitações de migração descritas acima.

Para a comparação visual, com os fotógrafos nas escalas 2 e 1 (`npm run fotografo` e `npm run fotografo:1`, um terminal por processo), `node scripts/tela.mjs todas` compara as 201 referências. Os comandos e saídas de comparação estão em [conferir-contra-o-design.md](conferir-contra-o-design.md).

O pacote 29c (11/10) rodou de novo os 46: 36 aprovados — o `reenvio` com o *Deixar para depois* acontecendo (73 passos) e o `mov-t09` com a cadeia concluída no topo (240) —, e os mesmos 10 param nos mesmos passos. A bancada das 201 referências e a vitrine (114 espécimes) não pioraram. [Gate](../06-prototipo/para-o-arquiteto/gate-29c.md).

O pacote 30 (12/10, o modo claro e as correções finas) rodou os 48: 38 aprovados, e os mesmos 10 param nos mesmos passos. Entraram dois roteiros: o **`claro`** (424 passos) liga o *Modo claro* na folha da Conta — a bolinha desliza em 200 e o app troca as cores no lugar em 300 —, desliga, liga de novo, recarrega e confere o login no claro, e percorre as 201 referências no claro: em cada uma, a varredura das cores que o navegador calculou reprova qualquer cor que só o escuro tem e qualquer texto ou ícone branco fora do botão principal, e confere as barras do sistema na cor do texto, o véu preto a 32%, o primário roxo com o texto branco e o confere em roxo (a mesma varredura, rodada no escuro, reprova — a prova de que ela pega). O **`readme-claro`** é o caminho do GIF do modo claro. Todo roteiro começa agora com o armazenamento do navegador limpo: o app nasce escuro em cada um. O `npm run checar` passou a reprovar também rgb, rgba, hsl e hsla escritos direto no código do app.

O pacote 31 (12/10, o claro neutro frio, o logo e o palco) trocou o `readme-claro`, que só gravava o GIF do claro (o GIF saiu), pelo **`palco-claro`** (32 passos): o interruptor da sidebar do palco troca só o celular de tema, a folha da Conta mostra o mesmo estado e o contrário, e recarregar devolve a escolha. O **`claro`** passou a reprovar também as cores do claro do 30 (o lilás) e a conferir o logo roxo, os traços do CONFIGURADOR e a luz de baixo do poço, com o esperado lido dos tokens. Continuam 48 roteiros.
