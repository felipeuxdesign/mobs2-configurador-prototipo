# Gate C2 · Design system

**Data:** 2026-09-24 · **Estado:** fechado em 2026-09-24 — 121 espécimes comparados (73 em 0%, 46 só no glifo, 2 desvios nomeados), `checar` e `build` aprovando, commit do C2.

## O censo · o que existe no começo do ciclo

- **O C1 pronto:** o projeto, os tokens (119 no começo do ciclo), a fonte, a ponte do mock, o estado único, o celular vazio, o `checar` e o `print`.
- **As folhas:** 8, com **121 espécimes em moldura** (os 120 do C0 mais o checkbox marcado de 24/09) e os **35 átomos da folha 3** (12 glifos, 10 ícones de ferramenta, 8 poços e 5 marcadores), que não têm moldura. O `componentes.md` tem 115 linhas.
- **Por folha:** 5 · 20 · 1 · 32 · 17 · 24 · 18 · 4 espécimes.

## Os achados deste ciclo

1. **A bancada muda a régua do C2.** Comparar a vitrine com o PNG da folha mediria a diferença de fonte entre dois geradores. Por isso a bancada renderiza o **HTML da folha** e a vitrine no **mesmo Chrome**, a 1×, e recorta os dois espécimes pela moldura. Com os dois no mesmo renderizador, a diferença que sobra é de desenho, e a meta vira **0%**. Os primeiros cinco espécimes (os três estados do primário, o link e o checkbox nos dois estados) deram 0%.
2. **O Chrome headless trava com instâncias em paralelo** nesta máquina, como já tinha acontecido no C0. A bancada ganhou uma trava que põe as fotos em fila: vários agentes podem construir ao mesmo tempo, e só a foto espera a vez.
3. **O reset global pesava mais que a peça.** O `.vitrine button` apagava o fundo do primário. Os resets passaram a `:where()`, que tem peso zero.
4. **O checkbox é primitivo.** Ele entra em três famílias (o diálogo com ciência, a justificativa e o login), e o arquiteto pediu um componente só, com os dois estados.

## As decisões deste ciclo

- **C2·1 · A meta de cada espécime é 0% contra o HTML da folha.** A única diferença aceita vem do glifo do Lucide (G5), que a folha desenha à mão, e fica nomeada.
- **C2·2 · Uma família por agente, seis em paralelo:** chrome (folha 2, mais a linha de opção), linhas (folha 4, mais a linha tocável e a escolha numa lista), cartões e avisos (folha 4), instrumentos (folhas 5 e 8), entrada (folha 6) e checklist (folha 7). Cada agente só escreve na própria pasta. Os primitivos, os tokens e a vitrine ficam comigo.
- **C2·3 · Token novo entra com o papel escrito.** Cada família propõe os seus num `tokens-propostos.css`; o revisor unifica os nomes, e eu passo tudo pro `tokens.css`, com o `tokens.json` regenerado.
- **C2·4 · O tambor é um primitivo de roda de dígito** (G29), construído pela família dos instrumentos.

## Entra

Os 10 primitivos · as 6 famílias · a vitrine com os 121 espécimes e os átomos · o `componentes.md` corrigido pelo medido (linhas novas, a folha certa de cada peça).

## Não entra

Nenhuma tela montada.

## Está pronto quando

Cada espécime comparado com a folha dele, com a diferença registrada · `npm run checar` e `npm run build` aprovam · o commit do C2 está feito.
