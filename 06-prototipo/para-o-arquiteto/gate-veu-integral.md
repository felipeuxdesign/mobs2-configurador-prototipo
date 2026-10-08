# Gate · véu integral das folhas

## Censo e achados

15 telas, 191 referências (97 momentos e 79 estados), 109 histórias, 295 tokens, 106 peças normativas e 62 casos. São três telas com folhas funcionais: T01, T04 e T11. A T01 já escurece o fundo da barra de status; T04 e T11 deixavam tira/faixa iluminadas, mesmo com ações bloqueadas. Foram abertas as referências T04/05–14 e 16 pertinentes, T11/03 e a folha 2 do design system antes da alteração.

A auditoria identificou 12 referências afetadas: seis folhas da T04 (05, 07, 08, 10, 11, 14), cinco diálogos que compartilham a camada do menu (06, 09, 12, 13, 16) e a folha T11/03. A legenda do espécime da barra sob o véu na folha 2 também precisa acompanhar a regra. Os painéis e caixas têm posições aprovadas: aumentar a área do fundo escuro não deve mudar o lugar deles.

## Decisões autorizadas

1. Toda folha cobre visualmente todo o fundo do app: conteúdo, tira e faixa, mais o fundo da barra de status. O SVG oficial da barra fica legível acima da camada do fundo, como na T01. Usar a cor e opacidade existentes de `--veu`.
2. Conservar conteúdo, tamanho, posição e movimentos das folhas e caixas. Ampliar só a área pintada do véu acima da região original. Não criar token ou redesenhar barras.
3. As folhas e os diálogos da T04 compartilham o mesmo fundo escuro integral. A troca entre eles conserva o véu aceso, sem acrescentar uma segunda camada ou piscar no topo. T02, T13 e os diálogos compartilhados de outras telas não entram neste ajuste de folhas.
4. Topo coberto continua bloqueado ao toque e ao leitor. Preservar X, toque fora, arraste e voltar. A pintura estendida acima da folha também é área de toque fora.
5. Atualizar HTML/PNG, design system, documentação e roteiros afetados; medir a geometria e a diferença fora do topo. Registrar rasterização técnica quando a fotografia atual diferir dos PNGs antigos. Validar, committar e dar push. O GIF inclui o aviso T04/12: regravá-lo para refletir o fundo da barra escurecido, mantendo o mesmo percurso.

Autorização direta do usuário em 08/10: “sim e melhor e é o correto ne? bora fazer isso”, depois da proposta de escurecer todo o fundo, incluindo faixa e barra de status. Esse é o *vai* para o ajuste visual; não exige outra confirmação.

## Medidas e limites

O fundo original das folhas começa em y=83 nas folhas de Conta/Unidade da T04 (inclui a borda de 1), y=134 nas folhas de Módulo/Ativo e y=82 na T11. A barra de status mede 30. As posições das folhas e caixas devem continuar iguais. Os diálogos T04/12, 13 e 16 já cobrem o chrome abaixo da barra; neles só falta escurecer o fundo dos 30 superiores.

O produto usa as barras reais do sistema; o desenho do protótipo conserva os ícones oficiais. Nenhum fluxo, caso, texto do app ou classificação de referência muda.

## Validação

- `npm run checar` aprovado, incluindo 213 conferências do mock e a higiene de tokens, cores, medidas, relógio e acaso. Build aprovado; permanece o aviso anterior do bundle acima de 500 kB.
- Navegação aprovada: `mov-t04`, **283 passos**; `folhas`, **154**; `mov-t11`, **132**; `conferencia`, **100**; `readme`, **65**. Sem animações proibidas nos registros desses roteiros. Na T04, a troca folha↔diálogo mantém o véu parado e não cria um trecho superior novo; X, toque fora, arraste, Esc e movimento reduzido continuam funcionando. [Resumo dos roteiros](veu-integral/roteiros.json).
- Verificação do topo em **seis quadros**: pintura da folha começa exatamente no fim da barra de status, y=30; fundo da barra escuro com SVG legível; tira/faixa inertes. Tocar no véu superior fecha as folhas sem acionar os controles atrás. O diálogo continua aberto ao tocar fora; a consulta T11/03 permanece parada. [Medidas e resultado](veu-integral/topo-validacao.json).
- As **12 referências** conservam todos os retângulos de elementos e os textos; comparação de capturas frescas antes/depois tem **zero pixels alterados abaixo do complemento superior**. A folha 2 mantém a geometria de 272 elementos, e sua alteração fresca é só a legenda do espécime. [Prova das referências](veu-integral/referencias-validacao.json).
- Comparação do app com as 12 referências atualizadas e três controles (T01/00, T04/00, T11/02) **sem piora contra a base anterior**. Os resíduos anteriores continuam: conteúdo real atrás do véu onde a referência tem fundo vazio (G25), glifos e diferenças nomeadas de textos/rodapés. T01/00 permanece em 0% contra HTML. [Comparações atuais](veu-integral/comparacoes.json), [base anterior](veu-integral/comparacao-base.json). Prints inspecionados: [T04 · Módulo conectado](veu-integral/T04-modulo-conectado.png) e [T11 · Outras ações](veu-integral/T11-outras-acoes.png).
- **Desvio técnico nomeado:** os PNGs antigos da T04 e da folha 2 tinham rasterização subpixel de texto; a captura atual do Chrome usa suavização em cinza. Eles foram regenerados no tamanho original, 720×1600 nas telas e 1440×4100 no design system. A prova de alteração restrita ao topo usa capturas frescas do mesmo HTML antes/depois, separando essa diferença do gerador.
- GIF regravado pelo mesmo roteiro: **150 quadros, 330×672, 36,07 s armazenados**, incluindo o aviso T04/12 com o fundo da barra escurecido. O screencast saiu a 2×, enquanto o retângulo do celular era em pixels CSS: o conversor agora calcula a escala do recorte a partir da imagem e da janela gravada. A primeira conversão recortou o lugar errado e foi descartada antes do commit; a versão final foi inspecionada. [Metadados do GIF](veu-integral/gif-validacao.json).
- O `logica.md` recuperou os rótulos e a descrição já vigente da câmera (`Abrir as configurações`, `Conte o que aconteceu`), ausentes ou sem a marcação esperada no HEAD. A checagem documental da câmera voltou a passar; nenhuma regra da T13 foi alterada.
- Mock, tokens, textos do app, índice, classificação e censos permanecem iguais. Links locais dos documentos revisados e `git diff --check` conferidos. Não foram executados todos os 45 roteiros nem comparadas todas as 191 referências. `mov-porcima` recebeu somente as expectativas novas do véu; suas entradas sintéticas históricas continuam fora do aceite atual.
