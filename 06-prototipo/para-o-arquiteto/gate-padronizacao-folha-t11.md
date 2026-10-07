# Gate · padronização da folha Outras ações

## Censo e achados

15 telas, 191 HTMLs e 191 PNGs de referência, 295 tokens distintos. A folha da T01/04 tem 269px de altura e duas opções de 72px. A T11/03 tem 249px e opções renderizadas de 66 e 58px. O protótipo reproduz essas medidas das referências.

A casca é idêntica: recheio 18/16/32, puxador 36×4, vão 14, cabeçalho 44, título 20 e cartão com 12 dos lados. A diferença é interna: T01 usa recheio 10, vão 12, poço 30/ícone 18, título 16 e detalhe 13; T11 usava recheio 8, vão 10, poço 32/ícone 16, título 15 e detalhe 12.

## Decisões e autorização

1. Adotar em Outras ações a densidade da folha Não recebi o código: mínimo 72, recheio vertical 10, vão horizontal 12, poço 30/ícone 18, título 16/600 e efeito 13/500. Usar tokens existentes.
2. Preservar integralmente os textos, a seta de 16 em tinta secundária, o puxador, as margens externas e o comportamento. O efeito quebra linha e a opção pode crescer acima de 72. A variante efeito identifica esse conteúdo; não oferece densidade compacta.
3. Alinhar HTML e PNG normativos, componente, espécimes e documentação corrente. Entregar prompt e referência para a IA do design atualizar sua fonte.
4. Committar e dar push, conforme pedido. O GIF não passa por T11 e fica como está.

Autorizado diretamente na conversa após a comparação medida: “vc consegue ajustar pra mim”, “quero deixar sem isso de compacto”, “ajusta no prototipo navegavel” e “só da push”. O pedido posterior confirma a entrega do prompt e da referência visual.

## Divergências e limites

A diferença compacta estava formalizada como variante, sem justificativa de produto encontrada. Esta revisão substitui essa regra por decisão do usuário. A folha continua podendo crescer para mostrar efeitos longos, sem cortar texto. Nenhum dado, fluxo, tela, momento, estado ou token foi acrescentado. Gates e pacotes antigos são registros históricos e não mudam.

## Validação

- App e referência em 360 × 800: folha de 270px, opções de 73 e 72px, mínimo 72, recheio 10 e vão 12. Os dois títulos ficam em uma linha a 16/600, os dois efeitos em duas a 13/500, completos e sem overflow. Coluna de texto de 232px e seta fixa de 16px. Casca, cabeçalho e cartão têm as mesmas caixas no app e na referência. A T01 continua com duas opções de 72 e folha de 269px.
- Comparação final T11/03: 2,00% contra HTML/PNG e 0,00% estrutural; só a região da folha tem 0,01% (32 pixels de desenho dos ícones). O fundo vazio atrás do véu na referência e a conferência visível no app são um desvio anterior, já registrado na ficha, preservado neste ciclo.
- `checar` aprovado, incluindo 213 conferências do mock e igualdade tokens.json/CSS; build aprovado, com o aviso anterior do tamanho do bundle. `conferencia` aprovado, 173 passos: abrir, fechar no X, tocar fora, arrastar, voltar, registrar e reenviar também a cadeia concluída.
- T01/04 e T01/11 reconferidas visualmente; os dois espécimes da variante efeito medidos com a mesma densidade. Detector visual sem achados nos arquivos alterados e revisão independente sem regressão. Não foi rodada a suíte completa de 191 referências/114 espécimes neste ajuste.
- Medidas, comparações, print do app e prompt para a IA do design em `padronizacao-folha-t11/`. Nenhum arquivo do GIF mudou.
