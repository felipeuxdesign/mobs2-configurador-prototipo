# Pedido ao arquiteto · a T14 diz "Voltar ao checklist" pra quem nunca esteve lá

## O que medi

A T14 tem duas entradas:
- **pela calibração:** T10/09, `Fazer o ciclo de testes` (decisão 35: calibra, faz o ciclo, confere o checklist);
- **pelo checklist:** T13, a Seção E, `Fazer o ciclo de testes`.

O rodapé não sabe de onde o técnico veio:
- durante o ciclo, o link é `Ir para o checklist`, e o `Encerrar o ciclo` leva à T13: correto nas duas entradas;
- **no ciclo concluído (a `05`), o primário é `Voltar ao checklist`.** Vindo da T10, o técnico nunca abriu o checklist: o *voltar* promete um lugar onde ele não esteve.

O destino está certo nas duas entradas, porque o próximo passo é sempre o checklist (decisão 35). O que erra é o verbo.

## As decisões (o padrão que eu adotaria entre parênteses)

1. **O primário do ciclo concluído.**
   - (Um texto que vale pras duas entradas: `Ir para o checklist`, o mesmo do link durante o ciclo. Sem guardar de onde o técnico veio, e o destino continua a T13.)
   - A alternativa é o texto mudar pela origem: `Ir para o checklist` vindo da T10 e `Voltar ao checklist` vindo da T13. Custa uma regra de estado e não muda o destino. Eu não recomendo.
2. **O link `Voltar ao menu` da 05.** (Fica. É volta de verdade nas duas entradas, porque as duas nascem do menu.)
3. **O voltar do Android.** (Fica como está: faz o mesmo que o link de saída do rodapé. Durante o ciclo, `Ir para o checklist`; no concluído, `Voltar ao menu`.)

## O que o pacote traria

- **A referência:** a `T14/05-momento-ciclo-concluido` com o primário novo.
- **Os documentos da T14:** `textos.md` (o texto da 05) e `tela.md` (a linha *ciclo concluído →*).
- **Nada muda** no mock, nos tokens, nas peças nem nos ritmos.
