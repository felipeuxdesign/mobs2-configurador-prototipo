# Os testes que já estão prontos

O protótipo deixou três coisas que viram teste do produto quase sem trabalho.

## 1 · Os casos do mock são os dados de teste

Cada estado de tela nasce de **um caso** — uma condição do mundo que o técnico encontra no campo: o módulo fora do cadastro, a rede que cai na sincronização, o ônibus fora do pacote, o servidor que não responde. São 56 casos em `04-dados/mocks.js` (`casos`), e o `04-dados/casos.md` diz que caso monta que estado. Cada um vira um teste: monte o mundo do caso, abra a tela, confira o estado da referência.

O `02-telas/indice.json` lista as 153 referências com o caso de cada uma (`caso`), e se o estado nasce de uma condição (`coluna`).

## 2 · Os roteiros são os cenários de aceite

Em `06-prototipo/app/scripts/caminhos/` estão 43 roteiros que andam o app pelo toque, como o técnico, pelo nome que o leitor de tela lê. Os mais importantes:

| Roteiro | O que prova |
|---|---|
| `heroi.mjs` | o caminho inteiro, do login ao encerramento: empresa, unidade, sincronização, menu, conexão, diagnóstico, vínculo, o que vai ser gravado, a cadeia, a CAN lida, a calibração com o horímetro, o ciclo de testes, o checklist e o encerramento (245 passos) |
| `heroi-sem-horimetro.mjs` | o mesmo caminho, pulando o horímetro (233 passos) |
| `portas.mjs` | as portas naturais: escolher um módulo ou ônibus que é caso do mock abre o estado dele |
| `voltar.mjs` | o voltar do Android em cada tela |
| `abortada.mjs` | a sessão encerrada sem homologar |
| `teclado.mjs` | o teclado nunca esconde o campo nem o botão (regra 10) |
| `mov-<tela>.mjs` | o movimento de cada tela, contra `movimento.md` e o `animacao.md` dela |

Os passos estão escritos em linguagem de produto (*toca "Conectar ao M2C-0417"*, *chega na T07*, *vê "7 de 7"*): servem de roteiro de aceite em qualquer ferramenta de teste.

## 3 · O gate do mock é o teste do contrato

O `04-dados/gate-cobertura.js` recomputa as âncoras do mock — as contagens, as relações entre coleções, os casos obrigatórios. Rodado contra os dados de verdade (um pacote baixado, uma resposta do servidor), ele diz se o contrato continua de pé.

## Rodar

```bash
cd 06-prototipo/app
npm install
npm run dev
```

E, com os fotógrafos no ar (`npm run fotografo` e `npm run fotografo:1`): `node scripts/caminho.mjs heroi`, `node scripts/caminho.mjs todos`. O `npm run checar` junta as checagens que não precisam de navegador, e o gate do mock roda com `node 04-dados/gate-cobertura.js`.
