# Gate C7 · Conectar: os estados — T05

**Data:** 2026-09-24 · **Estado:** fechado em 2026-09-24 — os quadros comparados e explicados, os textos conferidos com os desvios nomeados no CHANGELOG, `checar` e `build` aprovando. Roda junto com o C9.

## O censo · o que existe no começo do ciclo

- **11 estados da T05**, em três grupos na coluna do palco:
  - **achar:** nenhum encontrado;
  - **conectar:** conexão falhou;
  - **conferir:** as nove falhas da pré-checagem;
- **o caminho feliz do C6,** já construído, com os seus 5 quadros

## Os achados deste ciclo

1. **Dois dados do mock faltam** e entram como acréscimo, com checagem:
   - a duração da busca vazia (AC-18);
   - o caso do firmware fora com o módulo sem rede (AC-20, o único estado da T05 sem caso).
2. **As portas naturais (G28):** tocar num módulo da lista que é caso do mock abre o estado dele no fluxo. O `logica.md` troca o M2C-0999, que não tem linha tocável na referência, pelo M2C-0394, que abre o 11.

## As decisões deste ciclo

- **C7·1 · O agente continua a T05 do C6,** sem quebrar os 5 quadros dele, e um revisor confere e corrige.
- **C7·2 · A falha mora na linha que falhou (Lei 3),** e a pré-checagem para onde o caso diz.

## Entra

Os 11 estados, as ações dos avisos e as portas naturais · os acréscimos AC-18 e AC-20.

## Não entra

O movimento fino (C12).

## Está pronto quando

As 11 referências comparadas, com os 5 do C6 iguais ao que eram, e a diferença de cada uma explicada ou nomeada · os textos conferindo · o `npm run checar` e o `npm run build` aprovam · o commit do C7 está feito.
