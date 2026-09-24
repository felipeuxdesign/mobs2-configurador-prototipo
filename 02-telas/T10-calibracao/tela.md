# T10 · Calibração

Fazer o módulo contar igual ao painel do ônibus — com a foto do painel como prova.

| | |
|---|---|
| **Elemento-assinatura** | o tambor que rola do número do módulo até o número do painel |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · hodômetro 184.320 no módulo, 482.317 no painel |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 3 — ver `estados.md` |

## O que se toca

- `Fotografar o painel` → a foto entra e vale também na Seção B. O toque é no cartão da foto inteiro, que a referência desenha sem botão (G14); a foto fica gravada na calibração da sessão e o checklist a lê no item do painel (HU-T10-4). Tirada a foto, o cartão fica como está e não responde mais
- `Semear o hodômetro` → semeado (a 01), em sequência (T10·4): o número do módulo troca pelo do painel, depois a releitura confere e a régua vira `confere`; enquanto isso o botão fica parado, com o mesmo texto, e no fim troca pra `Calibrar o horímetro`. Foto e semear não dependem uma da outra: dá pra semear com a foto aguardando (T10·3)
- passo seguinte: o horímetro, ou a rotação e a velocidade no caminhão coletor. As grandezas e a ordem são as do cadastro do modelo do ativo, menos as que o módulo não mede (T10·1); o `Depois:` mostra só a próxima (T10·2)
- o passo do horímetro não tem referência nem o texto do semear: monta-se com as peças e os textos que existem, com o botão desabilitado e o mesmo rótulo, `Calibrar o horímetro` (G25). A rotação do caminhão coletor (a 02) fica igual: `Calibrar a rotação` desabilitado, porque o módulo só lê com o motor ligado (HU-T10-2). Semeado o último passo (o hodômetro do ônibus de um passo só), nada está desenhado depois: o botão fica desabilitado, com o mesmo rótulo (G25)
- `Voltar ao menu` → T04, e a calibração volta de onde parou (no hodômetro semeado, o endereço volta a ser o da 01) · `ENCERRAR`, antes de homologar: a sessão abortada da T16 (G23); depois, o encerramento

Corrigido no C9 pelas referências e pelas decisões do C0 (G1): o toque do cartão da foto, a sequência do semear e o passo sem referência. O tambor troca o valor; o movimento dele rolando é do C12 (C9·2).

## Peças do design system que esta tela usa

Medido nas 5 referências e construído no C9 (T10-V8, G1): as peças que a tela usa de fato. Saíram as seis que nenhuma referência da T10 desenha — faixa · sem ação, processo correndo, com legenda, a marca no login, campo e campo focado. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- duas ações
- primário · normal, pressionado e desabilitado — o desabilitado com o nome da ação (a 02)
- segmentado — e o passo atual já feito, alto e lima apagado (a 01, G11)
- valor em poço — apagado antes de semear, aceso depois (a 01)
- régua da diferença — e o `confere`, com o check solto (a 01, Lei 4 · exceção)
- o valor alvo — e o cumprido, sem o traço lima (a 01, G11)
- foto · aguarda
- foto · tirada
- o que não se aplica — e a divisória na última linha (a 02, G11)

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
