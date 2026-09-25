# T07 · Dados da CAN

Ver os sinais que o ônibus manda parado — e saber o que só fecha andando.

| | |
|---|---|
| **Elemento-assinatura** | o tambor do hodômetro e as barras com a faixa esperada: o painel do ônibus, lido pela CAN |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · doze sinais do mock |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 0 · 3 — ver `estados.md` |

## O que se toca

- com tudo aprovado (00): `Configurar módulo` → T09 · `Voltar ao menu` → T04
- com um sinal reprovado (fora da faixa ou sem leitura, 01 e 02): `Ler novamente` relê no lugar (T07·5 a) · `Configurar módulo` → T09
- `ENCERRAR`, antes de homologar: a sessão abortada da T16 (G23) · depois de homologar (a tela segue aberta pelo menu): os passos do encerramento, a T16 (`logica.md`, como a T08)
- o voltar do sistema (no computador, o Esc): com tudo aprovado, o `Voltar ao menu`. Com um sinal reprovado, o link do rodapé é o `Configurar módulo`, que avança pra gravação e não é saída: ele não faz nada (`06-prototipo/logica.md` · O voltar do Android; a pergunta está em `08-produto-real/pendencias.md`)

Corrigido no C8 pelas referências (G1, T07-A13): o `Voltar ao menu` da 00 e o `Ler novamente` também no sem leitura. O caso vale uma vez por sessão (G21): o `Ler novamente` o consome, e a releitura traz o nominal do sinal que falhou; o que o caso lê e passa (o hodômetro do ativo) é do veículo e fica. Voltar do menu mostra a última leitura.

## Como a leitura se monta (C8)

Tudo sai de `sinaisCan` do modelo do ativo da sessão, no mock: o lido, a faixa `{min, max}` e o rótulo curto (AC-07). No protótipo, a tela abre já lida (G27, C8·2); o ritmo da leitura, o marcador que corre e o tambor que rola são do C12.

- **A peça de cada sinal** (T07·4 b), por um mapa por id, na ordem da tela: bateria → leitura na faixa · hodômetro → tambor · temperatura, satélites e nível → leitura pequena · ignição e posição → sinais liga-desliga. Só o ma-01 tem referência: o ma-02 e o ma-03 montam pelo mesmo mapa o que ele conhece, e o sinal que ele não conhece (o óleo, o horímetro) fica de fora até ter desenho.
- **A escala da leitura grande** (T07·2 a): a faixa com 1,0 de cada lado; se o lido cai fora, a escala estica até o inteiro que o contém (10,9 → 10,0). As marcas a cada 0,5, ou a cada 1 quando 0,5 daria mais de 10 divisões; as maiores nas bordas da faixa e no meio dela, quando o meio cai numa marca. As legendas têm as casas do lido (11,0 · 12,0 — 15,0 · 16,0).
- **A escala da leitura pequena** (T07·2 a): 4 divisões, com a maior no meio. Com a faixa inteira, a escala é a própria faixa (−40 a 120); com a faixa aberta pra cima, satélites de 0 a 12 e a legenda `mínimo 4`; sem faixa, nível de 0 a 100 e a legenda `sem faixa`. A posição vai ao % inteiro, como as referências desenham.
- **O veredito**: com faixa, o lido dentro dela; sem faixa (esperado null), a leitura chegou; com texto, o lido igual ao esperado. O contador diz os estáticos que passaram de todos os sinais do modelo (`7 de 12`); com um reprovado, `1 reprovado`, em vermelho.
- **A causa provável** (C11.8, no mock): lido fora da faixa → `veículo ou cadastro`, com a diferença até o mínimo (`1,1 V abaixo do mínimo`); sem leitura, sozinho no domínio → `sem leitura · ligação`.
- **O resumo apagado**: os dinâmicos do modelo, contados e pelo rótulo curto quando há (`Alternador`).
- **O domínio mudo (03) fica fora do ciclo** (T07·1 a): a referência desenha o ma-01 com a placa do a-16, que é ma-02. Até chegar a referência nova, a coluna abre a tela com o nome, e no fluxo o caso não se aplica.

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- processo correndo
- com legenda
- leitura na faixa
- fora da faixa
- leitura pequena
- leitura com mínimo
- tambor
- sinais liga-desliga
- instrumentos apagados
- com contador neutro
- com contador de falha

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

- primário · normal
- primário · pressionado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- os glifos de estado
- os marcadores
- com contador neutro
- com contador de falha
- leitura na faixa
- fora da faixa
- leitura pequena
- leitura com mínimo
- tambor
- sinais liga-desliga
- instrumentos apagados

Corrigida no C8 pelas referências (G1, G10, T07-A14): saíram as 8 peças que nenhuma das quatro desenha (faixa · sem ação, processo correndo, com legenda, a marca no login, campo, campo focado, cartão com barra, cartão de configuração) e entraram as de toque da folha 1. No acerto do design system pelo medido (G10), entraram os átomos da folha 3 que a tela usa: o glifo é o check solto dos liga-desliga (Lei 4 · exceção), e o marcador é o LED da faixa. O que só a T07 desenha virou variante nomeada da leitura pequena (G11), declarada no `componentes.md`: **sem faixa** (o nível, Lei 5 · exceção), **sem leitura** (o satélites do 02: borda vermelha, traço no lugar do número, a escala vazia com o traço no meio e a causa embaixo) e a grade das leituras a 10, e não a 12 da folha (T07-V5).

## Histórias de usuário

- **HU-T07-1** — Vejo sinais por domínio, cada um com valor lido · esperado · semáforo
- **HU-T07-2** — Sinal fora do esperado traz causa provável: ligação, barramento, modelo incorreto
- **HU-T07-3** — Sinais dinâmicos aparecem como *aguardando o ciclo dinâmico* — não aprováveis aqui

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
