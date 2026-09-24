# Gate C4 · Entrar — T01, T02 e T03

**Data:** 2026-09-24 · **Estado:** fechado em 2026-09-24 — os quadros comparados e explicados, os textos conferidos com os desvios nomeados no CHANGELOG, `checar` e `build` aprovando.

## O censo · o que existe no começo do ciclo

- **18 referências:** T01 tem 10 (6 momentos e 3 estados), T02 tem 3 (1 momento e 1 estado), T03 tem 5 (1 momento e 3 estados) · 7 estados ao todo
- **O design system do C2** e o palco do C3, com as sementes e as receitas destas três telas
- **As decisões do C0 que valem aqui:** T01·1 a T01·7, T02·1 a T02·7, T03·1 a T03·8, e as transversais G1, G8, G9, G12, G15, G16, G17, G20, G21 e G25

## Os achados deste ciclo

1. **O mock tinha 3 dos 5 valores que as telas leem.** Entraram o código errado da T01/05 e da T01/07 (AC-01), os seis requisitos da senha nova com o mínimo 10 (AC-03), o mínimo de 8 do Entrar (DADOS-A11) e os 6 s por item da estimativa da T03 (AC-05). **O gate foi de 90 pra 95**, e o acréscimo é só aditivo: fora os campos novos, o JSON do mock é o mesmo, byte a byte.
2. **Dois acréscimos do plano saíram,** porque as decisões de tela já os cobrem:
   - **AC-02** (o `pedidoHaSeg`): pela T01·1, o prazo começa cheio, em 10:00 e 60 s;
   - **AC-04** (a versão do pacote): pela T03·2, ela deriva de `uoId` e `data`, que já estão no mock.
3. **A régua das telas é a mesma do C2.** O HTML da referência e o app são fotografados no mesmo Chrome, a 2×, e a meta é 0%. Medido: entre o HTML e o PNG da T01/00, a diferença é de 0,29%, então o HTML serve de gabarito. A bancada dá as duas diferenças.
4. **Uma régua de texto.** O `scripts/textos.mjs` lê o que o app escreve em cada referência, na ordem, e confere com o `textos.md`.
5. **Os processos no print.** A T03/00 é um quadro no meio da sincronização (9 de 16). No `?print=1`, todo processo para no quadro que a referência desenha (`estado/quadro.js`). Fora do print, ele corre no ritmo de `ritmos.js`.

## As decisões deste ciclo

- **C4·1 · Uma tela por agente, três em paralelo.** Cada um escreve só em `src/telas/Tnn/`, e o registro acha as telas sozinho. Se uma peça do design system precisar de ajuste, o agente ajusta e prova que o espécime continua em 0% na bancada do C2.
- **C4·2 · Tela, momento e estado.** A tela recebe `momento` e `estado` e abre no quadro da referência. Os toques andam pelo fluxo, e ao chegar num momento a URL passa a dizer qual é. O estado é montado pela receita.
- **C4·3 · Os desvios das decisões de tela** ficam escritos no CHANGELOG. O prazo do código abre em 10:00 e 60 s, e não em 9:41 e 44 s (T01·1). A 03 mostra o id do pacote, como está desenhado (T03·2).

## Entra

T01, T02 e T03 inteiras: os 18 quadros, os toques do `tela.md`, a sincronização correndo em 4 s · o mock com os acréscimos · as duas réguas.

## Não entra

O movimento de cada tela (C12), além do que as peças do C2 já fazem · a T04, que por enquanto é a tela vazia.

## Está pronto quando

Os 18 quadros comparados, com a diferença de cada um explicada ou nomeada · os textos conferindo · o `npm run checar` e o `npm run build` aprovam · o commit do C4 está feito.
