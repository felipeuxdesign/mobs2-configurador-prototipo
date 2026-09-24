# Gate C3 · Palco

**Data:** 2026-09-24 · **Estado:** execução liberada pelo diretor, com os padrões do C0.

## O censo · o que existe no começo do ciclo

- **O palco:** o `palco.md`, com três peças (o quadrado, o celular e a coluna) e mais o painel, e 5 quadros em `palco/referencias/` (componentes, no fluxo, num estado, muitos estados, painel aberto)
- **As decisões do C0 que valem aqui:** G18 (o painel em duas partes), G19 (quem ganha entre o `palco.md` e os quadros), G20 (a URL) e G21 (as sementes e as receitas)
- **O índice:** 16 telas, 39 momentos e 50 estados em `02-telas/indice.json`. Só 16 estados têm nome escrito num quadro; os outros 34 não têm

## Os achados deste ciclo

1. **Os quadros desenham o celular a 90%.** A caixa mede 340 × 736, fica no topo a 50, e o quadrado está a 24 das bordas. O `palco.md` diz tamanho real, no centro e a 16. Pela G19, o texto ganha onde fala: o celular sai a 100% em 1440 × 900, centrado, e o quadrado a 16.
2. **O quadro 03 põe "Um encontrado" na coluna,** e isso é um momento, não um estado. O `palco.md` diz que momento não entra na coluna, então a coluna da T05 fica com 11 estados.
3. **Os 34 estados sem nome num quadro** ganharam um rótulo proposto no `indice.json`. O campo `rotuloOrigem` diz qual é qual: 16 são `quadro` e 34 são `proposto`.
4. **O que é "Voltar ao fluxo".** O palco guarda o instante antes do primeiro estado aberto. Trocar de estado não troca esse instante, e voltar o devolve. Quando o estado veio pela URL, não há instante guardado, e voltar monta a semente da tela.

## As decisões deste ciclo

- **C3·1 · Pular de tela pelo painel monta a semente** do `logica.md`. As sementes só guardam ids e leem o resto do mock. Onde a semente não pede estado, porque a tela só mostra o mock, ela fica vazia (T01, T02).
- **C3·2 · No modo estreito, tocar no app parado pisca o quadrado.** A coluna não existe nesse modo, e o quadrado é a porta pro "Voltar ao fluxo", que fica no topo do painel. O `palco.md` não fala disso; é um **desvio nomeado**.
- **C3·3 · As receitas dizem de que caso ou dado do mock cada um dos 50 estados nasce.** 5 esperam um caso aditivo no ciclo da tela deles (G8): T05/09, T12/02 e T15/01, 02 e 03.
- **C3·4 · O `npm run checar` passa a rodar o teste das sementes e das receitas:** os 50 estados com receita, e todo id no mock.

## Entra

O quadrado, o painel em duas partes, a coluna com os 50 estados (a T05 em três grupos), o celular nos dois jeitos, a URL (tela, estado, momento, painel), o modo estreito, a etiqueta e o Recomeçar · as sementes e as receitas, com o teste.

## Não entra

Nenhuma tela montada: o celular mostra o código, o nome e o rótulo do estado.

## Está pronto quando

Os 5 quadros fotografados e comparados, com o desvio da G19 escrito · o `npm run checar` e o `npm run build` aprovam · o commit do C3 está feito.
