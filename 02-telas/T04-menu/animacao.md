# T04 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| faixa de sessão | a sessão abre (fim da pré-checagem) | desce de cima (translateY -100%→0) e o conteúdo desce junto | 200ms | desacelera | aparece |
| contador da fila e do checklist | o número muda | troca no lugar, sem pular | — | — | igual |
| folhas | tocar na unidade ou nas iniciais | o painel sobe de baixo e o véu esmaece; fechar desce | 200ms · fecha em 150ms | desacelera | aparece |
| cartão liberado | o módulo conecta | o poço ganha cor e o texto de espera some | 150ms | esmaece | troca direta |

- no protótipo · a nossa versão da linha *folhas*, antes desta entrega: | folhas | tocar na unidade ou nas iniciais · com a sessão aberta, no cartão do módulo ou do ativo | o painel sobe de baixo e o véu esmaece; fechar desce | 200ms · fecha em 150ms | desacelera | aparece |

No protótipo: o diálogo *Encerrar sem homologar?* (13) se move como todo diálogo (`movimento.md`): a caixa esmaece e cresce de 98% a 100% em 150ms, o véu esmaece junto, e fecha do mesmo jeito; com reduzir movimento, aparece. Aberto pelo endereço, nasce aberto, parado. É a mesma peça em toda tela com a faixa.

No protótipo (lei 20, a última entrega): toda folha do menu também se arrasta — o painel acompanha o dedo pra baixo, só por transform; soltando depois de 56, desce de onde parou e fecha em 150ms, e o véu esmaece junto; antes, volta ao lugar em 200ms. É o arraste de toda folha (`movimento.md` · folha · o arraste, proposta do protótipo); com reduzir movimento, o painel segue o dedo e a volta ou o fecho é direto.

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
