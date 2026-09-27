# App Configurador Mobs2 · leia primeiro

O app que técnicos de campo usam para **instalar e homologar rastreadores em ônibus** — conectar o módulo, gravar a configuração, calibrar, rodar o ciclo dinâmico e fechar o checklist, com **a evidência gerada pelo sistema, nunca digitada**.

Esta pasta é a fonte única do produto. O design está **fechado e medido**: 16 telas, 63 momentos e 68 estados, um design system que cobre todo desenho que se repete, e o gabarito visual de cada um.

## Quem é você

| Se você vai… | Leia, nesta ordem |
|---|---|
| **construir o protótipo navegável** | `CLAUDE.md` → `06-prototipo/CLAUDE.md` → `01-produto/` → `02-telas/` inteira → `03-design-system/` → `04-dados/` → `06-prototipo/` |
| **construir o produto real** | `CLAUDE.md` → `08-produto-real/` → `01-produto/` → `02-telas/` → `03-design-system/` → `04-dados/` → `07-decisoes/` |
| **entender o projeto** | `01-produto/historia.md` → `01-produto/usuario.md` → `07-decisoes/` → `02-telas/` |

## O mapa

```
01-produto/          por que existe, pra quem, as regras de negócio, as histórias e os fluxos
02-telas/            uma pasta por tela: ficha, estados, animação, textos e o gabarito visual
03-design-system/    tokens, leis, movimento, componentes e as oito folhas desenhadas
04-dados/            o mock — o contrato de dado — e o gate que prova que ele não mente
05-recursos/         a marca, a fonte e os ícones
06-prototipo/        como construir o protótipo navegável e o palco em volta dele
07-decisoes/         o porquê de cada escolha, com o que foi descartado
08-produto-real/     o que o dev precisa saber: norma, simulação, stack e pendências
_fontes-v1/          os documentos do v1, intocados, só pra consulta
```

## As três fontes, e quem ganha

**A referência diz como parece. O mock diz o que aparece. A documentação diz por quê.** Quando duas discordam, **o mock ganha** sobre o dado, **a referência ganha** sobre a aparência — e a divergência é nomeada, nunca resolvida em silêncio.
