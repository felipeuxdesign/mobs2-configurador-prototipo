# T10 · Calibração

Fazer o módulo contar igual ao painel do ônibus — com a foto do painel como prova.

| | |
|---|---|
| **Elemento-assinatura** | o tambor que rola do número do módulo até o número do painel |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · hodômetro 184.320 no módulo, 482.317 no painel |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 6 · 4 — ver `estados.md` |

## O que se toca

- o campo do painel → tocar e digitar o que o painel mostra, com o teclado numérico
- `Fotografar o painel` → a câmera do próprio app, com o quadro e *Enquadre o hodômetro do painel* → `Tirar foto` → volta com o registro no lugar do cartão · sem galeria, e foto tirada fica tirada
- o botão só acende com o número digitado **e** a foto tirada, e sempre diz o que falta: *Digite o que o painel mostra* → *Fotografe o painel* → *Semear o hodômetro*
- `Semear o hodômetro` → grava e relê → semeado · se a releitura passar da tolerância, *não confere* e `Semear de novo` — a foto continua valendo
- `Calibrar o horímetro` → o 2 de 2, no mesmo fluxo do hodômetro — o digitado e o fotografado do horímetro são iguais aos do hodômetro, só muda o número → `Concluir a calibração` → o menu
- na rotação, o botão diz *Ligue o motor* até o módulo ler; depois, *Digite o que o conta-giros mostra*
- passo seguinte: o horímetro, ou a rotação e a velocidade no caminhão coletor. As grandezas e a ordem são as do cadastro do modelo do ativo, menos as que o módulo não mede (T10·1); o `Depois:` mostra só a próxima (T10·2)
- `Voltar ao menu` → T04, e a calibração volta de onde parou (no hodômetro semeado, o endereço volta a ser o da 01) · `ENCERRAR`, antes de homologar: a sessão abortada da T16 (G23); depois, o encerramento
- o voltar do sistema (no computador, o Esc) faz o `Voltar ao menu`, em todo passo (`06-prototipo/logica.md` · O voltar do Android)

Na entrega do design de 25/09 (decisão 33), a calibração passou a semear só com a prova: o número digitado e a foto tirada. Sai o que o C9 construiu antes dela — a foto e o semear independentes (T10·3), o cartão da foto tocável e o horímetro sem referência. Continuam a ordem das grandezas pelo cadastro (T10·1 e T10·2), a volta de onde parou e o voltar.

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- uma ação
- processo correndo
- com legenda
- segmentado
- foto · a tirar
- foto · tirada
- valor em poço
- régua da diferença
- o valor alvo
- o painel · vazio
- o que não se aplica

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

Medido nas 5 referências e construído no C9 (T10-V8, G1): as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- linha tocável · normal e pressionada
- barra do sistema
- faixa · sessão aberta
- duas ações
- os glifos de estado
- os marcadores
- segmentado
- foto · aguarda
- foto · tirada
- valor em poço
- régua da diferença
- o valor alvo
- o que não se aplica

No acerto do design system pelo medido (G10), a lista ficou só com os nomes das linhas do `componentes.md`, e as anotações viraram variante nomeada da peça (G11), declarada lá: o primário inerte no semear, com o mesmo desenho e o mesmo texto, e o rodapé que o leva; o segmentado com o passo atual já feito, alto e lima apagado (01); o valor em poço aceso depois de semear (01); a régua que confere, com o check solto (01, Lei 4 · exceção); o valor alvo cumprido, sem o traço lima (01); e o que não se aplica com a divisória na última linha (02). O cartão da foto é tocável inteiro, com o nome da ação (G14), e a variante também está lá. O primário desabilitado leva o nome da ação (02). Entraram as de toque da folha 1 (o primário nos três estados, o link e a linha tocável, que é o toque do cartão da foto) e os átomos da folha 3 (o check da régua e o LED da faixa). O número que rola no valor em poço é interno dele (`instrumentos/Tambor.jsx`), não a linha do tambor da T07. Na coluna do `componentes.md`, a T10 saiu das seis linhas que nenhuma das cinco desenha (faixa · sem ação, processo correndo, com legenda, a marca no login, campo e campo focado) e entrou na linha tocável.

## Histórias de usuário

- **HU-T10-1** — Vejo só as grandezas calibráveis para este ativo × módulo, com justificativa quando indisponível
- **HU-T10-2** — RPM/velocidade: informo o valor que leio no painel; o módulo calcula o fator
- **HU-T10-3** — Hodômetro/horímetro: digito o valor do painel e fotografo; o app converte a unidade
- **HU-T10-4** — A foto do painel satisfaz também a Seção B, com a origem visível na linha
- **HU-T10-5** — O read-back tolera granularidade + tempo decorrido, na unidade do reporte
- **HU-T10-6** — Releitura obrigatória antes do ciclo dinâmico
- **HU-T10-7** — Recalibrar em manutenção recalcula o offset, não acumula
- **HU-T10-8** — Quem escolhe pulso ou GPS é o cadastro do modelo de ativo, não eu

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
