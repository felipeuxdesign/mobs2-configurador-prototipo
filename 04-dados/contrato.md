# O contrato de dado

`mocks.js` é **o contrato**. Toda tela mostra só o que ele tem, e todo estado nasce de um caso ou de um dado dele.

## As regras

- **Nenhum número inventado.** Se uma tela precisa de um valor que o mock não tem, isso é um achado do gate — nunca um número digitado no componente
- **Mesma entrada, mesma saída.** Zero `Math.random`, zero `Date.now`, zero `new Date()`. O dia é `DIA_NOMINAL` e a hora é `HORA_NOMINAL`, 14:30
- **Nenhuma cor no dado.** Cor é do design system
- **O herói do protótipo:** Rafael Vieira · unidade Várzea · módulo M2C-0417 · ônibus RKT-8H42

## O gate

```
node 04-dados/gate-cobertura.js
```

Recomputa as âncoras do mock e prova que ele não mente. **Roda em todo ciclo que tocar no mock.** Se não aprovar, o ciclo não fecha.

## Como o app lê

O mock define `window.M2CF_MOCKS`. No protótipo, importe como módulo e **não copie valores dele pra dentro dos componentes** — leia na hora de montar a tela.
