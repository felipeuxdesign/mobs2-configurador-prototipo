# Gate C9 · Configurar e calibrar — T09 e T10

**Data:** 2026-09-24 · **Estado:** fechado em 2026-09-24 — os quadros comparados e explicados, os textos conferidos com os desvios nomeados no CHANGELOG, `checar` e `build` aprovando. Roda junto com o C7.

## O censo · o que existe no começo do ciclo

- **10 referências:**
  - **T09**, a cadeia: a tela, 3 estados (bloco recusado, queda, recuperação) e o momento da cadeia concluída;
  - **T10**, a calibração: a tela, o hodômetro semeado e 3 estados (a rotação no caminhão coletor, o já semeado, o módulo sem pulsos)
- **As peças do C2:** a cadeia, a pré-condição dos pinos, o segmentado, os valores em poço, a régua da diferença, o valor alvo, a foto e o tambor
- **As decisões do C0 que valem aqui:** T09·1, T10·1 a T10·5, e as transversais (G22 e G23 em especial)

## Os achados deste ciclo

1. **O hodômetro estático do a-22 não bate entre a CAN e a calibração** (AC-08). Entra como caso aditivo, com a checagem do bruto ÷ fator.
2. **O caso do bloco recusado cai num ônibus sem cercas** no mock (T09-A15). Monta-se pelo caso, com o texto aprovado, e a incoerência vai ao PM.
3. **A cadeia anda a 1 s por bloco,** com o trilho de 300 ms correndo junto (T09·1).

## As decisões deste ciclo

- **C9·1 · Uma tela por agente, e um revisor por tela.**
- **C9·2 · O tambor da T10 troca o valor.** O movimento dele rolando é do C12.

## Entra

A T09 e a T10 inteiras · o acréscimo AC-08.

## Não entra

O movimento fino (C12).

## Está pronto quando

As 10 referências comparadas, com a diferença de cada uma explicada ou nomeada · os textos conferindo · o `npm run checar` e o `npm run build` aprovam · o commit do C9 está feito.
