# T04 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| faixa de sessão | a sessão abre (fim da pré-checagem, na T05) (C12·24) | no menu, nada se move: a faixa desce na T05, onde a sessão nasce, e o menu já chega com ela (C12·24) | — | — | igual |
| contador da fila e do checklist | o número muda | troca no lugar, sem pular | — | — | igual |
| folhas | tocar na unidade ou nas iniciais | o painel sobe de baixo e o véu esmaece; fechar desce | 200ms · fecha em 150ms | desacelera | aparece |
| folha que vira diálogo (C12·27, C12·43) | tocar em Sair da conta, numa unidade com a sessão aberta, em Trocar de empresa ou em Encerrar a sessão; e o Cancelar | o véu fica aceso, parado: a folha desce enquanto o diálogo esmaece e cresce de 98% a 100%; no Cancelar, o diálogo esmaece enquanto a folha sobe de novo; onde o véu passa a cobrir a faixa (o 13), só o pedaço novo, em cima, esmaece | 150ms · a folha que volta sobe em 200ms | desacelera | troca direta |
| cartão liberado | o módulo conecta (na T05) (C12·26) | no menu, nada se move: os cartões chegam liberados, com o esmaecer entre telas (C12·26) | — | — | igual |

- no protótipo · a nossa versão da linha *folhas*, antes desta entrega: | folhas | tocar na unidade ou nas iniciais · com a sessão aberta, no cartão do módulo ou do ativo | o painel sobe de baixo e o véu esmaece; fechar desce | 200ms · fecha em 150ms | desacelera | aparece |

No protótipo: o diálogo *Encerrar sem homologar?* (13) se move como todo diálogo (`movimento.md`): a caixa esmaece e cresce de 98% a 100% em 150ms, o véu esmaece junto, e fecha do mesmo jeito; com reduzir movimento, aparece. Aberto pelo endereço, nasce aberto, parado. É a mesma peça em toda tela com a faixa.

No protótipo (lei 20, a última entrega): toda folha do menu também se arrasta — o painel acompanha o dedo pra baixo, só por transform; soltando depois de 56, desce de onde parou e fecha em 150ms, e o véu esmaece junto; antes, volta ao lugar em 200ms. É o arraste de toda folha (`movimento.md` · folha · o arraste, proposta do protótipo); com reduzir movimento, o painel segue o dedo e a volta ou o fecho é direto.

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
