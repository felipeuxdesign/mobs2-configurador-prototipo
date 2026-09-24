# Gate C11 · Encerrar e consultar — T16, T15, T11 e T12

**Data:** 2026-09-24 · **Estado:** execução liberada pelo diretor, com os padrões do C0. Roda junto com o C10.

## O censo · o que existe no começo do ciclo

- **19 referências:**
  - **T16**, a sessão: o encerramento, o corte, a sessão encerrada, o encerrando sem homologar e o encerrada sem homologar, mais 2 estados;
  - **T15**, a fila de saída: a tela e 4 estados;
  - **T11**, conferir a configuração: a tela, tudo confere e 1 estado;
  - **T12**, as últimas instalações: a lista, o detalhe e 2 estados
- **O caminho do herói**, do login à T14 e à T13, construído nos ciclos anteriores
- **As decisões do C0 que valem aqui:** T16·1 a T16·6, T15·1 e T15·2, T11·1 e T11·2, T12·1 a T12·3, e as transversais (G22 e G23 em especial)

## Os achados deste ciclo

1. **O encerramento sem homologar** (G23) passa a valer no menu. Os primários dos diálogos de sair e de trocar de garagem, que no C5 iam direto ao destino, passam pelos 4 passos da T16.
2. **Faltam no mock:**
   - as 24 h da re-checagem (AC-15);
   - o corte dos grupos por idade (AC-16, o número é do diretor);
   - o par que confere (AC-17);
   - as instalações vazias (AC-21);
   - a fila com dois erros e a vazia (AC-22);
   - a fila sem erro, o caso que o estado T15/01 pede.
   Entram como acréscimos, com checagem.
3. **A assertiva Pontos de cerca** do herói se aplica pelo dado (T16·2), mas o texto dela não existe no `textos.md`. Fica como a referência, e o texto vai ao diretor.

## As decisões deste ciclo

- **C11·1 · Uma tela por agente, e um revisor por tela.** O agente da T16 pode mexer, só nos dois primários dos diálogos, na T04.
- **C11·2 · O caminho do herói inteiro** se testa no fechamento: do login ao encerramento, e de volta ao menu sem sessão.

## Entra

A T16, a T15, a T11 e a T12 inteiras · os acréscimos · o caminho do herói de ponta a ponta.

## Não entra

O movimento fino (C12).

## Está pronto quando

As 19 referências comparadas, com a diferença de cada uma explicada ou nomeada · os textos conferindo · o caminho do herói testado de ponta a ponta · o `npm run checar` e o `npm run build` aprovam · o commit do C11 está feito.
