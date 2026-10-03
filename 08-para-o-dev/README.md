# Pro dev

Esta pasta é pra quem vai construir o App Configurador de verdade. O protótipo em `06-prototipo/` é **uma forma de consumir as fontes deste repositório**, não a especificação: o produto se constrói das mesmas fontes, na stack que o time escolher. Aqui ninguém copia o que mora nas outras pastas — esta pasta aponta.

## Por onde começar, pela tarefa

| Vai… | Leia, nesta ordem |
|---|---|
| **entender o produto** | `01-produto/historia.md` → `usuario.md` → `dominio.md` → `historias.md` (105 histórias) → `fluxos.md` |
| **construir uma tela** | a ficha da tela em `02-telas/<tela>/` (`tela.md`, `estados.md`, `animacao.md`, `textos.md`) → as referências HTML e PNG dela → as peças que ela usa em `03-design-system/componentes.md` → `contrato-de-dados.md`, nesta pasta |
| **montar o design system** | `03-design-system/tokens.css` (295 tokens; o `tokens.json` é gerado dele, em formato neutro) → `leis.md` (24 leis) → `componentes.md` (105 peças) → `movimento.md` → as oito folhas em `referencias/` |
| **integrar com o módulo, a CAN e o servidor** | `integracoes.md`, nesta pasta → `04-dados/mocks.js` (o formato que cada integração tem que entregar) |
| **testar** | `testes-prontos.md` e `conferir-contra-o-design.md`, nesta pasta |
| **saber o porquê de uma escolha** | `07-decisoes/` (54 decisões, com o que foi descartado) |
| **saber o que ainda está aberto** | `o-que-o-produto-ainda-decide.md`, nesta pasta |

## O que é norma, e o que é só do protótipo

**É norma — o produto faz igual:**
- o comportamento de cada tela, momento e estado · `02-telas/*/tela.md` e `estados.md`
- os textos, exatos · `02-telas/*/textos.md` (o que está entre crases é o texto da tela; prontos pra virar arquivo de tradução)
- os valores · `03-design-system/tokens.css` — nenhum valor solto
- as leis visuais, de medida e de produto · `03-design-system/leis.md`
- o movimento · `03-design-system/movimento.md` e cada `animacao.md`
- as regras de negócio e as histórias · `01-produto/dominio.md` e `historias.md`
- a aparência de cada tela · as 153 referências em `02-telas/*/referencias/`

**É só do protótipo — não leve pro produto:**
- os dados do mock: pessoas, placas, seriais, números (o **formato** é contrato; os **valores**, não)
- os tempos dos processos: no produto, é o tempo real do módulo, da CAN e do servidor
- o relógio parado em 14:30 (e o 9:30 da barra, que é desenho do Android)
- as duas barras do sistema: são cenário, o aparelho desenha as dele (lei 22)
- o palco inteiro: o quadrado, o painel, a coluna dos estados, a moldura do celular, as sementes e o `Recomeçar do login`

## A stack

É do time que vai construir. **Nada do que está neste repositório depende dela:** os tokens, os textos e as referências são formato neutro (CSS, Markdown, HTML e PNG), e o comportamento está escrito em linguagem de produto. O que ela decide está em `integracoes.md`.
