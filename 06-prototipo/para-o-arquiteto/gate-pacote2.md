# Gate do pacote 2 e do complemento

Medido em 02/10, com os dois aplicados e construídos, em commit local. Sem push: o push vai junto, no fim.

## 1 · O censo

| | o pacote diz | medido |
|---|---|---|
| referências | 142 | 142 ✓ |
| telas · momentos · estados | 15 · 62 · 65 | 15 · 62 · 65 ✓ |
| histórias | 109 | 109 ✓ |
| peças | 107 | 107 ✓ (sai a *foto · a tirar*, da folha 7) |
| decisões | 54 | 54 ✓ |
| casos no mock | os seus mais os nossos | 56 (os seus 49 e 7 nossos; o `can-estatico-bateria` fica, como o complemento disse) |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`, com 205 checagens.

- **Saíram do mock:** o `CADEIA.versoes` e o `chassiPelaCan`.
- **Duas sobras do merge, acertadas no mock, como o pacote pede:**
  - o `CICLO.passoDoSinal` ainda ligava a velocidade ao *Movimento detectado* e não tinha a rotação, e a T14/03 não achava o passo dela;
  - a *Foto de calibração* ainda estava nos tipos da fila (§7).

## 2 · O que mudou no código

- **T10:** a câmera e a foto saíram. O botão acende com o número digitado, entram o horímetro opcional e o `Pular o horímetro`, e o fim vai pro `Fazer o ciclo de testes`.
  - Pela D1, a calibração grava `puladas: ['horimetro']`, e a T13 mostra *não calibrado* sem bloquear.
  - As 9 referências medem de 0% a 0,16% contra o HTML.
- **T11:** as cinco linhas, com o Extended ID só leitura e fora da contagem. `Corrigir` vai no primeiro bloco que diverge, e os que dependem ficam *revisar em seguida*. Entra a 05, e a 04 sai.
  - A D2 roda inteira no fluxo. Pra isso, a T09 teve uma mudança mínima, nomeada: ela lê o bloco escolhido do estado.
  - Medem 0,03% contra o HTML (o glifo do Lucide), e a 03 fica em 2,13% (o véu, já nomeado).
- **T13:** a A com 3, o Painel a tirar na B (some sem calibração, pela D4), a D nova e a E com 6.
  - Medem de 0,04% a 0,45%. A 10 fica em 1,74%, por um desvio que já tinha nome.
- **T14:** o Ciclo de testes, com seis passos, e a 03 pelo `motor-desligado-no-ciclo`.
  - A velocidade entra só com `tacografoDigital` (D3). O roteiro prova isso no ma-02.
  - Medem de 0,05% a 0,10%.
- **T12:** a viagem saiu, e o resumo é o novo. **T15:** sem mudança de código, porque o mock já traz o checklist de homologação.
- **A barra do sistema:** o `bluetooth` e o `semRede` no componente, e o estado passa num lugar só, o `App.jsx`. A única tela tocada foi a T03, numa linha.
  - Nos 30 px de cima, 133 das 142 referências dão 0 px de diferença.
  - O Bluetooth entra quando a conexão se completa e sai com a sessão (D6).
- **O complemento:**
  - a T05/00 e a 04 com o M2C-0999 tocável, em 0% contra o HTML;
  - a T07/01, 08, 09 e 10, de 0,07% a 0,15%;
  - a cena 04 com os grupos.
- **O painel:** a T14 se chama *Ciclo de testes*.

## 3 · As divergências (nenhuma parou a construção; cada uma tem o padrão que adotei)

1. **A T16/06 mostra *nenhuma* no elo das cercas, não *4 regiões*.**
   - A sessão interrompida é do a-13 (QAH-1M67), que não tem região em `CERCAS.regioes`.
   - Escrever 4 seria inventar o número, ou usar o do herói, o que a decisão 49 proíbe.
   - **Proposta:** dar quatro regiões ao a-13 no mock. Aí o elo diz *4 regiões* sozinho, sem mexer no código.
2. **O mesmo vale pra T09/02 e 03:** o caso da queda (a-03) não tem região, e as referências desenham *4 regiões*.
3. **A coluna da T04.**
   - O protótipo lista os 7 estados do `indice.json`, e a cena 01 mostra 4.
   - Os 3 que ficam de fora são as folhas de trocar (08, 09 e 14). Nenhum campo do índice marca o que é "estado de condição".
   - **Proposta:** marcar no `indice.json` os estados que entram na coluna. Separar só pelo nome "folha" funciona na T04, mas a mesma regra tiraria a coluna da T01, e aí o critério tem que ser seu.
4. **A T04/04 desenha 10 no *Finalizar com checklist*, e o mock dá 11** (os 5 da B mais os 6 da E). O protótipo segue o mock.
5. **A barra de progresso da T13.** Nas referências 00 a 06, 12 e 13, a barra ainda pinta 19, 20 e 24 de 31, e o título já diz 17, 18 e 23. Na 07, 08 e 15, o 5º segmento (o Painel) aparece como feito. O protótipo segue o título e deixa o Painel pendente.
6. **A seção E do checklist** se chama *Teste dinâmico* no mock, no rótulo e no título, e *Ciclo de testes* na referência. A tela usa o texto da referência.
7. **O Extended ID do herói não está declarado no mock.** O *3 cartões · 1 iButton* da T11/02 e da T13/04 vem do `diff-divergente`, que é o caso do a-16.
   - **Proposta:** declarar `leituraNominalModulo.extendedId` no mock.
8. **O caso da T13/09.** A ficha, o índice e o `casos.md` dizem `can-fora-esperado`, mas esse caso é a velocidade do a-02 a 0 km/h e não monta a bateria a 10,9 V. Mantive o `can-estatico-bateria`.
9. **Ainda no mock, sem leitor:**
   - a `calibracao.foto` e a `grandeza` da i-01 (e a sua âncora ainda confere a `foto`);
   - o `calibracao.itemChecklist`;
   - as `viagens` na i-01 e nos dois casos de critério.
10. **O token `--conferencia-nome` mede 74, e a folha 4 e as referências medem 96.** Os tokens são intocáveis, então o nome fica do tamanho dele, e o pixel sai igual. O token passa a 96?
11. **A barra com o Bluetooth em 9 referências que não foram refotografadas:** a T04/05, 06, 07, 08, 09 e 14, e a T16/00, 01 e 03.
    - O módulo está conectado, então o protótipo segue a lei 22 e mostra o Bluetooth.
    - Se você quiser essas telas sem, é uma linha no `App.jsx`.
12. **As folhas.** O MUDANCAS diz que mudam a 4, a 5 e a 7, e o pacote trouxe a 2, a 4 e a 7. Não veio folha 5 nova.
13. **O texto da T13** diz *você fotografa 4 itens*, e a referência 00 desenha 5 (*0 de 5*).
14. **O *fotografado às 14:31*** do item feito da folha 7 fica fora do relógio parado (14:30). Na tela, a foto tirada mostra só o nome.

## A régua

- **as 142 referências:** sem erro, 34 em 0% contra o HTML. Tudo o que passa de 1% tem nome, e já tinha antes do pacote: os três textos da T01, as folhas da T04 com o menu atrás (G25), o véu da T11/03, os dois critérios da T12, a T13/10 e o recorte da T15/01 · a base nova é `prints/linha-de-base-pacote2.json`
- **os roteiros:** 41 dos 43 de primeira, e os outros dois sozinhos (um por tempo, e o `mov-t05`, que acompanhou o complemento) · o herói com o horímetro, 243 passos · o herói sem o horímetro (`Pular o horímetro`), 231 passos: a D mostra *não calibrado*, e nada bloqueia
- **o palco:** 38 de 38 na moldura, 0 peças com erro e 0 textos falhando · as provas da barra, 142 de 142
- **o `checar`:** APROVADO
