# 37 · O contexto é empresa e unidade

**O contexto.** O app chamava toda UO de *garagem* — porque as do herói se chamam *Garagem Várzea* e *Garagem Ibura* —, e o domínio nunca usa essa palavra: ele fala de Empresa, UC e UO. E o nível da empresa não existia desenhado, porque o mock tinha uma só, mas a HU-T02-1 diz *vejo empresas, UC e UO*. Técnico terceirizado atende várias.

**A decisão.** A interface chama a UO de **unidade** — o termo completo, *unidade organizacional*, fica nos documentos. *Garagem* só aparece quando é o nome da unidade. Com mais de uma empresa, a lista delas vem antes das unidades, e *Trocar de empresa* fica no rodapé da lista das unidades e na folha de trocar.

**O que foi descartado.** *Unidade organizacional* por extenso nos botões e títulos: pesa, e *unidade* não confunde com nada no app. E mexer nos nomes internos, como o caso `lista-longa-garagens`: o técnico nunca vê, e o código do protótipo usa.

**A consequência.** 16 telas com o termo trocado, três estados novos, o caso `varias-empresas` e a lei *a palavra é unidade*.
