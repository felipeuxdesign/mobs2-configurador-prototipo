# Gate · pacote 34 — o claro, polido

Gate sem espera. Por cima do 33 (4c252a1) e da linha embaixo da barra (122af70).

## 1 · Censo

- 201 referências · 15 telas · 82 estados · 104 momentos · 10 folhas.
- O pacote diz que 106 arquivos mudam. **47 mudam de fato**: 42 referências (24 PNG e 18 HTML de tela, mais 5 folhas), o `tokens.css`, o `tokens.json`, o `leis.md`, o `componentes.md` e o `CHANGELOG.md`. Os outros 59 são iguais ao projeto: são os do tracejado, que já entraram no 33.
- O `tokens.css`, o `tokens.json`, o `leis.md`, o `componentes.md` e o `CHANGELOG.md` do pacote vieram de cópias antigas. Por isso entraram só as linhas novas:
  - os dois tokens do botão, nos dois temas;
  - as cinco cores do claro;
  - o novo papel do `--elevado`;
  - a linha do contraste;
  - a linha do botão secundário no catálogo;
  - a entrada do registro.

  O `tokens.json` do pacote trazia o `--mov-rapido`, o `--mov-padrao` e o `--mov-lento` em 0ms (o bloco de *reduzir movimento*, lido como valor). Essa parte não entrou: o JSON sai do `tokens.css` pelo `npm run tokens`.
- Última linha do gate do mock: **GATE APROVADO — todas as âncoras recomputadas conferem**.

## 2 · O botão secundário

Conferido nos dois temas, na captura do navegador:

| Onde | Botões |
|---|---|
| Folha da Conta (T04/05) | *Sair da conta* |
| Fila (T15/00) | *Ressincronizar e reenviar*, o *um precisa de você* |
| Bip do checklist (T13/40) | *Testar bip*, *Ouvi*, *Não ouvi* |
| Bip tocando (T13/39) | *Tocando…*, desligado |
| Cartão do ciclo (T14/08) | *Confere com o cartão*, *Não confere* |
| Divergências (T11/00) | *Corrigir este bloco* |
| Manutenção (T09/14) | *Reenviar os eventos* |

- **Ligados:** todos com o fill `--fundo-botao` e a borda `--borda-botao`. No escuro, as cores medidas no app são as da referência, pixel a pixel: `#241F33`, `#3A3350` e `#F2F0F7`.
- **Desligado:** sem fill, com fundo e borda de cartão e o texto apagado (o *Tocando…* da T13/39, igual à referência). Fica diferente dos ligados.
- **Desvio nomeado (T04):** nas referências, o *Sair da conta* e o *Encerrar a sessão* da T04 (05, 10, 11) e da folha 2 continuam com fundo e borda de cartão (`#1A1726` e `#2B2540`). No HTML delas, só um espaço mudou no estilo. O pacote põe esses botões no desenho do secundário, e o código segue o pacote. A bancada não acusa, porque a diferença fica abaixo da tolerância de cor dela. **Para o arquiteto:** refazer essas quatro referências.
- **Desvio nomeado (T09):** o *Reenviar* desligado de cada dependente da T09 (10, 14, 15) segue a referência, que o pacote não mudou: o fundo da folha, a borda da divisória e o texto em `--marca`. É um segundo desenho de desligado. **Para o arquiteto:** decidir se ele passa ao desligado do catálogo.

## 3 · O tracejado, que veio do 33

O menu sem módulo (T04/01) e as últimas instalações vazias (T12/02), nos dois temas: o tracejado aparece em `--borda-neutra`, sutil nos dois.

## 4 · O poço no claro

No checklist (T13/00) e no menu (T04/00), o poço parece afundado: a sombra em cima e a luz branca embaixo. Os textos e os ícones de dentro leem bem.

A tabela de contraste foi recomputada e bate com a da folha 1 refeita:

| Cor no claro | página · cartão · poço |
|---|---|
| texto apagado | 5,4 · 5,8 · 4,7 |
| marcador vazio | 2,5 · 2,7 · 2,2 |
| traço de limite | 4,5 · 4,8 · 3,9 |

As nove cores passam, e nenhum marcador fica mais fraco que no escuro. O botão tem o mesmo degrau nos dois temas: fill 1,1:1 e borda 1,48:1 sobre o cartão.

**Um efeito da luz branca do poço, e a decisão padrão:** no claro, três peças usavam essa luz emprestada e sumiriam no branco:
- o trilho da cadeia antes de gravar (T09/05 a 07);
- o tracinho do vazio da busca (T05/02, 03);
- a borda do diálogo.

Cada uma ganhou o token do seu papel, no padrão do `--folha-topo` do pacote 32: `--trilho-antes`, `--traco-vazio-busca` e `--borda-dialogo`. Elas ficam iguais no escuro (`#332C49`) e, no claro, com o valor que já tinham (`#E6E7EC`). Nada muda no que se vê; agora são 306 tokens. **Para o arquiteto:** escolher o valor de cada uma no claro, e pôr nas folhas se quiser.

## 5 · A varredura

- Nenhum botão tem fundo `--elevado` ou `--divisoria`. O `--elevado` ficou só nas camadas de pressionado (`Tocavel`, `Checkbox`) e no palco.
- Todo botão secundário do app passa por um dos três componentes (`BotaoSecundario`, `BotaoDaLinha`, `BotaoDaFolha`), e os três usam `--fundo-botao` e `--borda-botao`.

## Bancada

As 201 referências contra a base do 33:
- **42 em 0%** (eram 34), nenhuma com erro.
- **Pioraram:**
  - T07/06, já conhecida do 33;
  - T13/05, 40 e 43, de 0,1 a 0,2 ponto: o deslocamento de 1 a 2px que a seção aberta já tinha, agora com a borda do botão mais visível. As cores dos botões são as da referência.
- **Melhorou:** T15/00, de 3,64% a 3,44%.
