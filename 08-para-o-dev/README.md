# Pro dev

Esta pasta orienta a construção do App Configurador no produto. O [protótipo navegável](https://configurador-mobs2-prototipo.vercel.app) permite experimentar o uso; comportamento, textos, medidas e referências estão nas fontes deste repositório. A stack fica a cargo do time.

Censo conferido em 09/10/2026: **15 telas · 199 referências** (15 entradas, 103 momentos e 81 estados) · **109 histórias · 295 tokens · 106 peças de design · 54 decisões · 63 casos de mock**. A bancada do protótipo tem 114 espécimes, incluindo variantes. Os 45 roteiros existentes têm o estado de validação descrito em [testes-prontos.md](testes-prontos.md).

## Por onde começar, pela tarefa

| Vai… | Leia, nesta ordem |
|---|---|
| **entender o produto** | [história](../01-produto/historia.md) → [usuário](../01-produto/usuario.md) → [domínio](../01-produto/dominio.md) → [109 histórias](../01-produto/historias.md) → [fluxos](../01-produto/fluxos.md) |
| **construir uma tela** | a pasta dela em [02-telas](../02-telas/) (`tela.md`, `estados.md`, `animacao.md`, `textos.md`) → cada HTML e PNG da tela → [componentes](../03-design-system/componentes.md) → [contrato de dados](contrato-de-dados.md) |
| **montar o design system** | [tokens.css](../03-design-system/tokens.css) → [tokens.json](../03-design-system/tokens.json), gerado do CSS → [leis](../03-design-system/leis.md) → [componentes](../03-design-system/componentes.md) → [movimento](../03-design-system/movimento.md) → [oito folhas de referência](../03-design-system/referencias/) |
| **integrar módulo, CAN e servidor** | [integrações](integracoes.md) → [mock](../04-dados/mocks.js) → [gate do contrato](../04-dados/gate-cobertura.js) |
| **testar** | [testes prontos](testes-prontos.md) → [conferir contra o design](conferir-contra-o-design.md) |
| **entender uma escolha** | [54 decisões](../07-decisoes/README.md), observando as notas de decisões revistas ou superadas |
| **conferir o que falta decidir** | [pendências e decisões já resolvidas](o-que-o-produto-ainda-decide.md) |

## O que é norma

- Comportamento de cada tela, momento e estado: `tela.md` e `estados.md` em [02-telas](../02-telas/).
- Textos exatos: o `textos.md` de cada tela. O que está entre crases é texto da interface.
- Medidas, cores e tamanhos: [tokens.css](../03-design-system/tokens.css), sem valores soltos.
- Leis visuais e de produto: [leis.md](../03-design-system/leis.md).
- Movimento: [movimento.md](../03-design-system/movimento.md) e cada `animacao.md`.
- Regras e histórias: [domínio](../01-produto/dominio.md) e [histórias](../01-produto/historias.md).
- Aparência: os 199 pares HTML/PNG listados no [índice](../02-telas/indice.json).

Os documentos preservam o histórico das rodadas. Para implementar, observe as revisões do PM de 06/10 e as notas vigentes no início das fichas: seis passos antigos com ré e porta, calibração obrigatória no ônibus e comparação do cartão com cadastro foram substituídos. As regras atuais estão resumidas em [integrações](integracoes.md) e em [decisões já resolvidas](o-que-o-produto-ainda-decide.md#já-definido).

## O que é só do protótipo

- Pessoas, placas, seriais e números do mock: seus formatos e relações orientam o contrato; os valores são exemplos.
- Cadências simuladas de processos. No produto, leituras e respostas vêm das integrações reais.
- Relógio do produto congelado em 14:30; o 9:30 da barra é arte do Android.
- Barras do sistema desenhadas: o aparelho apresenta as suas, conforme a lei 22.
- Palco, painel, moldura do celular, sementes, coluna de consultas e `Recomeçar do login`.
- Login com a senha de exemplo preenchida ao terminar a recuperação, para seguir a demonstração; não salva a nova senha.
- Estado mantido em memória durante a navegação. O protótipo não implementa armazenamento durável nem envio real.

No palco, o painel abre o contexto do caminho normal; exemplos especiais ficam em **Estados desta tela**, parados. Isso facilita a inspeção e não remove os estados que o produto precisa implementar quando a condição real acontecer. [Gate e validação dessa organização](../06-prototipo/para-o-arquiteto/gate-consultas-paradas.md).

## A stack

Os tokens, textos e referências usam CSS, JSON, Markdown, HTML e PNG; o comportamento é descrito em linguagem de produto. A implementação real ainda precisa conectar essas fontes ao módulo, ao servidor, às permissões e ao armazenamento do aparelho. Veja [integrações](integracoes.md) e [pendências](o-que-o-produto-ainda-decide.md).
