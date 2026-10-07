# Gate do complemento da rodada 3 · Montagem e Outras ações

Fechado em 07/10/2026, sobre a rodada 3 (`629a879`). O diretor autorizou finalizar a `comp3`, validar, commitar e dar push. A data fixa de 08/10 do pacote foi preservada nas referências, no CHANGELOG e na etiqueta.

## 1 · O censo

Medido nos arquivos: 15 pastas de tela, 191 HTML e 191 PNG; o índice tem 15 telas, 79 estados e 97 momentos. São 295 tokens distintos e 62 casos no mock. A bancada tem 114 espécimes.

A `comp3/arquivos` trouxe 12 arquivos: seis referências (três pares HTML/PNG), as duas fichas, os dois textos, a lógica e o CHANGELOG. Nenhuma referência entrou ou saiu. Na retomada havia 22 arquivos rastreados modificados, nenhum staged. O fechamento acrescenta a etiqueta e as provas deste gate. Nenhuma peça nem token novo.

As referências e os dois `textos.md` ficaram iguais aos recebidos. As fichas guardam o conteúdo do pacote e acrescentam as notas de construção. `comp3/` permanece como a entrega original local; as fontes aplicadas são as pastas normativas do projeto.

## 2 · Os achados e as correções

- **O reenvio depois de tudo confere não reenviava:** a T11 conservava os seis passos confirmados, e a T09 abria diretamente na concluída. O roteiro estendido falhou no passo 84, esperando a T09/05 e encontrando a T09/04. O reenvio agora limpa apenas o avanço da cadeia, preserva a sessão e o modo do vínculo, e começa pelo *Gravar no módulo*. O percurso corrigido passa.
- **O rodapé se deslocava ao acender:** medição direta da primeira implementação encontrou o primário em y=666 na leitura e y=665 no fim; a explicação era de 40, e o link final, de 44. No caso que confere, a leitura agora usa o mesmo link desabilitado da 02. O primário fica em y=665, altura 56, e o link em y=729, altura 44, nos dois quadros. As medidas estão em `complemento-rodada3/geometria-rodape.json`.
- **A nota de tipos sem uso era ampla demais:** `tocar` continua nos pendentes e reprovados das outras seções. A nota do design system agora diz que os três tipos empilhados deixaram de ser usados na Montagem.
- **A etiqueta ainda identificava a rodada 1:** agora identifica o complemento da rodada 3, com a data fixa do pacote.

## 3 · A conferência

As 191 referências foram fotografadas: zero erro, 38 em 0% contra o HTML, nenhuma piora contra a base local da retomada. Depois da correção do rodapé, as seis referências da T11 foram conferidas novamente; a diferença da 04 ficou nomeada abaixo. Os 114 espécimes ficaram idênticos à base local.

| quadro | contra o HTML | estrutural | contra o PNG |
|---|---|---|---|
| T11/02 · tudo confere | 0,63% | 0,17% | 1,46% |
| T11/04 · conferindo | 0,55% | 0,15% | 1,44% |
| T13/02 · Montagem aberta | 0,05% | 0,03% | 1,91% |
| T13/12 · com ressalva | 0,06% | 0,04% | 1,95% |

As quatro folhas lado a lado estão em `complemento-rodada3/`: referência HTML e app fotografados no mesmo Chrome, sem reescalar.

`npm run checar` aprovado, incluindo 213 conferências do mock; `npm run build` aprovado. Os seis roteiros do fechamento passaram: `mov-t11` (151 passos), `checklist` (155), `mov-t13` (340), `conferencia` (173), `heroi` (239) e `readme` (65). O resumo está em `complemento-rodada3/roteiros.json`. Não é uma nova corrida dos 45 roteiros: foram executados os afetados e os dois percursos completos relevantes ao fechamento.

## 4 · As divergências nomeadas

1. **O dado da T11/02:** o mock fornece *o servidor da Mobs2* em `conexoes.exibir`, onde a referência diz *a rede da Mobs2*. O mock vence sobre o dado. Esta divergência já constava do gate da rodada 2.
2. **O toque do rodapé da T11/02:** a referência usa alto 14 e vão 6; a peça aprovada usa alto 13 e vão 8, pela decisão 38 e pela lei de ergonomia. Na referência, o primário começa em y=667; no app, y=665. O link começa em y=729, com altura 44, nos dois. A peça global foi preservada.
3. **A leitura T11/04:** a referência desenha uma explicação de 40, em y=728 e `--marca`; o app usa o link de 44, em y=729 e `--tinta-apagada`, desabilitado conforme a lei 17. O primário da referência começa em y=666, e o do app em y=665. Esta escolha mantém as duas ações nas mesmas posições da 02, como o complemento exige.
4. **A folha sobre a T11/02:** não tem referência própria. É a mesma folha da 03 sobre o quadro de onde nasceu; a URL continua na 02. Fechar ou voltar deixa o técnico ali.
5. **Os resíduos da Montagem:** os 0,05% e 0,06% contra o HTML ficam no desenho dos glifos e na rasterização das bordas; as linhas usam as medidas e os tokens da peça de leitura existente. As diferenças contra o PNG incluem a rasterização do gerador da referência.

## 5 · As decisões do fechamento

- **C3-1:** construir a Montagem com a leitura existente de 44, câmera e seta no pendente, e estado à direita. A causa da ressalva continua no detalhe.
- **C3-2:** manter *Outras ações* na 02, abrir a folha existente sobre ela e testar o reenvio real depois da cadeia concluída.
- **C3-3:** manter o link desabilitado durante a leitura que confere, com as caixas medidas diretamente. O teste `mesmoLugar` sozinho não prova nós que foram substituídos.
- **C3-4:** manter o GIF: ele foi regravado em `629a879`, e o arquivo local é o mesmo blob (`6e5df01f428d1e0d4ece748a2041eb1de574d59f`). Foi inspecionado com diagnóstico 8 de 8, cadeia 6 passos, CAN 13 de 13 sem velocidade e os três contadores da homologação. A rota `readme` não passa pela T11 nem pela T13 e passou novamente.
- **C3-5:** commit próprio do complemento, pois a rodada 3 já estava no GitHub, confirmado na rede; push autorizado pelo diretor nesta retomada.

## 6 · O que não faz sentido

- Regravar o GIF sem nenhuma cena afetada acrescentaria um arquivo binário sem mudança de conteúdo.
- Alterar o rodapé global para reproduzir o vão de 6 da referência contrariaria a área de toque aprovada.
- Considerar o reenvio validado apenas porque a folha abre e fecha deixaria passar a cadeia antiga sendo apresentada como um novo envio.

Fechamento aprovado com os desvios acima documentados no CHANGELOG.
