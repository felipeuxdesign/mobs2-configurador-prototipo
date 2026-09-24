# Gate C10 · O ciclo e o checklist — T14 e T13

**Data:** 2026-09-24 · **Estado:** fechado em 2026-09-24 — os 19 quadros comparados e explicados, os textos conferidos com os desvios nomeados no CHANGELOG, `checar` e `build` aprovando. Roda junto com o C11.

## O censo · o que existe no começo do ciclo

- **18 referências:**
  - **T14**, o ciclo dinâmico: a tela, o antes do disparo, 3 estados (prazo estourado, dinâmico fora do esperado, identificador divergente) e o ciclo concluído;
  - **T13**, o checklist: o mapa, as seis seções abertas, responder um item, o não conforme com justificativa, o item reprovado, o finalizar com a Seção F falhando e o homologado
- **As telas T05 a T10,** que já gravam no estado único o que o checklist lê: a pré-checagem, o ativo, a CAN, a cadeia e a calibração
- **As decisões do C0 que valem aqui:** T14·1 a T14·4, T13·1 a T13·6, e as transversais (G22 em especial: a Seção F só conta o que é desta sessão)

## Os achados deste ciclo

1. **Faltam no mock:**
   - os seis campos do evento (AC-09) e o passo afetado da T14/03 (AC-10);
   - os títulos das seções e a instrução dos itens de B (AC-11);
   - a justificativa de exemplo (AC-12);
   - a leitura nominal da Seção C (AC-13);
   - os tipos da fila (AC-14).
   Entram como acréscimos, com checagem.
2. **Os passos do veículo:** a semente traz 2 feitos, e os passos 3 a 5 acendem a +9, +12 e +15 s do disparo (T14·1).
3. **O homologado vem do toque em "Finalizar instalação"** (T13·3), e o contador do checklist no menu passa a descontar o que foi resolvido.

## As decisões deste ciclo

- **C10·1 · Uma tela por agente, e um revisor por tela.** O checklist lê o que as telas anteriores gravaram, sem número digitado.

## Entra

A T14 e a T13 inteiras · os acréscimos AC-09 a AC-14.

## Não entra

O movimento fino (C12).

## Está pronto quando

As 18 referências comparadas, com a diferença de cada uma explicada ou nomeada · os textos conferindo · o `npm run checar` e o `npm run build` aprovam · o commit do C10 está feito.
