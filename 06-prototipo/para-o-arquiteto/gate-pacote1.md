# Gate do pacote 1 · o retorno do PM

Medido em 02/10. **Nada foi gravado no repositório.** Tudo foi medido numa cópia separada (um git worktree), com o pacote aplicado: os 50 arquivos apagados e os 180 copiados. O caminho de volta é o commit `b3138ab`, com a árvore limpa.

**Paramos no passo 2 e no passo 5 do LEIA-ME**, como ele manda:
- **Passo 2:** arquivos nossos têm o que os do pacote não têm (§3, item 1).
- **Passo 5:** um trecho do patch do mock não aplicou. Foram 3 de 13, todos pelo mesmo motivo: uma anotação nossa no contexto. São o `segPorItem: 6` dos pacotes, o AC-19 do firmware logo depois do `canal-aberto`, e a nota do C9 sobre a versão gravada.
  - Num merge de três vias (o nosso, a sua base 600 e o pacote), os três se resolvem sem perder nada.
  - O patch do gate aplica limpo. Já o gate completo do pacote foi montado de uma base antiga: tem 74 checagens, e o nosso tem 196. Por isso não serve pra trocar pelo nosso; o caminho é o patch.

## 1 · O censo, com o pacote aplicado

| | o pacote diz | medido | |
|---|---|---|---|
| referências | 145 | 145 | ✓ |
| telas | 15 | 15 | ✓ |
| momentos | 64 | 64 | ✓ |
| estados | 66 | 66 | ✓ |
| histórias | 105 | 105 | ✓ (HU distintas no `historias.md`) |
| casos no mock | 49 | 49 no seu mock · **55** no mesclado | os nossos 6 casos a mais (aditivos) ficam |
| peças | 107 | **108** | na tabela do design, saem 18 e entram 6 |
| decisões | 49 | 49 | ✓ |
| tokens | 96 (no `CLAUDE.md` e no README do design system) | **295** | o `tokens.css` não muda e é intocável |

As referências que mudam, entram e saem batem com a tabela do `MUDANCAS.md`, tela por tela, sempre com HTML e PNG aos pares.

**A última linha do gate.** Com o mock e o gate do pacote: `GATE APROVADO — todas as âncoras recomputadas conferem`, com 74 checagens.

Com o nosso gate mais o patch, sobre o mock mesclado, ele quebra na P·C1 com `TypeError`, porque lê casos que saem. Medindo checagem por checagem:
- **16 checagens nossas quebram ou reprovam:** 8 conferem um dado que sai junto e saem também; as outras se ajustam;
- **1 passa em falso.**

Mais três coisas no gate do pacote:
- ele não tem de onde recomputar `conexoes: 2` nem `eventos: 12`, porque não há coleção pra esses grupos;
- `cercas: 4` aparece em pacotes de unidades com 0 regiões (uo-02 e uo-03);
- "nenhum pacote leva cartões" é conferido procurando o texto `"cartoes":3` no JSON.

## 2 · O que muda no código, tela por tela

- **T05** (`src/telas/T05/index.jsx`, `dados.js`, `textos.js`):
  - sai a pré-checagem, com a lista, as travas, o firmware e o canal aberto, e saem as receitas dos 11 estados;
  - conectou: o app vai pra T07;
  - ficam os 4 estados.
- **T07** (`src/telas/T07/`, refeita):
  - `diagnostico.js` no lugar de `leitura.js`;
  - as 7 linhas acendendo a 600 ms cada, as 3 travas, o firmware com `Atualizar` e sem ele;
  - a linha que só informa, a caixa da CAN e a CAN lida, o `Ler de novo`, o 06 atualizando e o 10 relendo;
  - a lista que acende e o firmware vêm da T05 de hoje.
- **T08:** sai a pasta, a rota (`src/palco/rotas.js`, `telas.js`, `src/telas/index.jsx`) e as receitas.
- **T04** (`index.jsx`, `dados.js`, `t04.css`):
  - saem o Dados da CAN e o Refazer leitura, e entra o Diagnóstico do módulo;
  - o herói chega com rede, e o estado 15 mostra o menu sem rede;
  - a chave inteira no Conferir configuração;
  - a folha do ativo mostra o modelo;
  - o Finalizar com checklist ocupa a linha inteira.
- **T03** (`pacote.js`, `index.jsx`): cinco grupos e 31 itens, com a ordem e os nomes novos e os quadros 00 a 02.
- **T06** (`index.jsx`, `dados.js`, `t06.css`):
  - entra o *Confirmar o vínculo*, e saem os três estados de chassi;
  - entram os estados 10 e 11, montados pelos casos;
  - o vínculo entra no lugar do chassi nas checagens;
  - o `Desvincular e vincular aqui` segue pra T09.
- **T09** (`index.jsx`, `cadeia.js`, `textos.js`, `t09.css`):
  - o 05 é a entrada (o que vai ser gravado);
  - 06 e 07 são as travas do envio, e 08 e 09 a manutenção;
  - cada elo mostra o conteúdo de `CADEIA.conteudo`;
  - a limpeza aparece nas cinco telas da cadeia;
  - a concluída diz "6 blocos".
- **T16** (`index.jsx`, `dados.js`, `textos.js`): o encerramento diz "6 blocos", e a sessão interrompida diz o que já foi gravado.
- **T12** (`dados.js`, `textos.js`), só o resumo: *Diagnóstico · 7 de 7* e *Checklist · 31 de 31*.
- **O palco** (`src/palco/Coluna.jsx`, `telas.js`): a T07 em dois grupos na coluna, e o painel com a T07 no caminho.
- **O mock e o gate:** o merge de três vias e as nossas checagens ajustadas (§1).

## 3 · As divergências

1. **Os documentos do pacote apagam anotações nossas que continuam valendo.** O pacote parece ter saído da sua cópia, que não tem as nossas notas:
   - `indice.json`: o `rotulo`, o `rotuloOrigem` e o `grupo` dos 68 estados. A coluna do palco tira os nomes daqui, e o `testar-estado` confere esses campos;
   - `logica.md`: 46 anotações, cerca de 65 KB;
   - `componentes.md`: as seções *No protótipo* (o mapa das 132 peças e o movimento do C12);
   - `leis.md`: os ◆, a R-14 e a R-15 do diretor, e a regra do ENCERRAR apagado onde o voltar não faz nada (lei 17, 25/09);
   - `movimento.md`: 12 notas do C12;
   - `palco.md`: 10;
   - `ciclos.md`: 8. A numeração dos ciclos ali também contradiz o git: o C8 foi o da T06, T07 e T08 (`d3a9e19`);
   - `CLAUDE.md`: 295 tokens, 132 peças e 55 casos;
   - `LEIA-PRIMEIRO.md`: o apontador pro README;
   - as notas *no protótipo* das fichas da T06, T09, T12 e T16;
   - na `08-produto-real/`: 7 notas no `o-que-o-prototipo-simula.md` e 10 no `pendencias.md`.

   **Padrão:** como nas junções de antes. O seu texto vale; as anotações nossas que continuam valendo voltam pra baixo dele, e as que falavam do que sai, saem. Na 08, a nossa fica, só com as trocas de fato, porque a decisão sobre ela é do fim.
2. **As telas intocáveis quebram com o mock novo.**
   - Sem o `CADEIA.versoes`, a T11 (`conferencia.js`) dá erro ao carregar, e o app não monta.
   - A T13 lê `etapas.preChecagem` e `etapas.can`, e navega pra T08 (`T13/checklist.js:254` e `index.jsx:311`).

   **Padrão:**
   - o `CADEIA.versoes` fica no mock como acréscimo nomeado até o pacote 2;
   - a T07 grava `etapas.preChecagem` (7 de 7) e `etapas.can` com os nomes de hoje;
   - as duas rotas da T13 pra T08 passam a apontar pra T07. São duas linhas numa tela intocável, então **preciso do seu OK.**
3. **Os `textos.md` da T10 à T15 já trazem textos do pacote 2.** São 138 textos que não estão nos HTML dessas telas, e a régua dos textos reprovaria as telas que não podem mudar. **Padrão:** a régua dessas telas roda contra os textos de hoje até o pacote 2.
4. **Onde a sessão nasce.**
   - A `logica.md:17`, a decisão 44 e o prompt dizem que é na conexão, com a faixa.
   - Mas a ficha da T07 (`tela.md:8`) diz que nas travas ela não abre, e as referências T07/02 a 06 não têm faixa (a 00 e a 07 têm).
   - E a `T04/animacao.md` diz que a faixa desce no menu.

   **Padrão:** a sessão nasce na conexão, e a faixa desce na T07, quando as 7 linhas passam sem trava. É o que as referências desenham.
5. **O herói já está vinculado no cadastro.** O `a-01` tem `moduloSerial: M2C-0417` (`mocks.js:188`). É o mesmo par do caso `modulo-ja-deste-ativo` (`:838`). Pela regra da decisão 46, o herói seria manutenção. **Padrão:** o D1 como está, e os casos do vínculo, o `modem-sem-sinal` e os da CAN abrem só pela coluna, nunca pelo serial no fluxo.
6. **O "faltam ~40 s" da T03/00.**
   - Com 25 itens a baixar, o `segPorItem: 6` (campo nosso, que o seu mock não tem) dá cerca de 150 s.
   - O tempo total também diverge: o seu `movimento.md` diz 4 s no total, e a `animacao.md` da T03 diz 250 ms por item, o que com 31 itens daria 7,75 s.

   **Padrão:** `segPorItem: 1.6`, que dá ~40 s, e 4 s no total.
7. **A regra dos seis, como está escrita, agrupa também a T01 (8 estados) e a T04 (7).** O prompt diz "as outras soltas", e a cena 01 desenha a T04 solta. **Padrão:** só a T07 se agrupa, como exceção escrita no `palco.md`.
8. **O painel.** O `palco.md:16-17` põe a T07 no caminho e também nas consultas, e a cena 04 a põe só no caminho. **Padrão:** a cena.
9. **"Cercas · 4 áreas" no `CADEIA.conteudo`.**
   - O mock tem 2 áreas e 4 regiões.
   - Na T09/06, o M2C-0394 é ECO, que guarda 2 regiões, e o elo mostra 4 áreas sem trava, enquanto a 07 trava 5 contra 4.

   **Pergunta:** qual é o número, e qual é o nome?
10. **O `m2m.mobs2.br` no elo da Conexão** é endereço de rede. O próprio mock diz "nunca APN", e o `CLAUDE.md` proíbe falar de protocolo com o técnico. **Pergunta:** fica?
11. **O `Procurar outro módulo` não diz pra onde vai,** nem na T07 (02 a 05) nem na T09 (06 e 07). **Padrão:** na T07, a T05/01, a lista sem nada escolhido. Na T09, com a sessão aberta, o diálogo *Encerrar sem homologar?*.
12. **A R-11 do pacote contradiz a R-14 do diretor (24/09).** A R-11 diz que tocar num caso abre o estado. A R-14 diz que escolher só marca, e quem avança é o botão. **Padrão:** a R-14.
13. **O diff permitido é estreito demais pro que o pacote pede.** Sem esses arquivos, o build quebra (o `mov-faixa.jsx` importa o que sai), e a régua não roda:
    - `src/ds`: as 3 peças novas (a linha que só informa, os dados do modelo, a cadeia antes de gravar), e 8 componentes que ficam sem tela e saem (Leitura, LeituraPequena, LeituraTambor, Sinais, Mostrador, GradeCartoes, TiraLeituras, ParComparado);
    - `src/vitrine`: os espécimes das folhas 1 a 7;
    - `src/estado`: `estado.jsx` (o modo e o fato do desvínculo), `ritmos.js` e `receitas.js`;
    - `src/palco/versao.js`: a etiqueta;
    - `scripts/`: 20 dos 43 roteiros passam pela pré-checagem, pela T07 antiga ou pela T08, e o `testar-estado`, o `palco.mjs` e o `provas-palco.mjs` também mudam.

    **Proposta:** ampliar o diff permitido com esses, só pra acompanhar o pacote.
14. **Erros de digitação ou de geração do pacote:**
    - as peças (108, não 107) e os tokens (295, não 96);
    - em 12 linhas do `componentes.md`, a coluna *Telas que usam* repete uma lista de 11 telas (a cadeia aparece na T01, por exemplo);
    - as "cenas 31, 32 e 33" não existem: são as 00 a 04;
    - a linha "fo, fo, fo…" da tabela do `MUDANCAS.md` saiu cortada;
    - a decisão 49 tira a HU-T09-10, mas a versão composta é a HU-T09-8;
    - o `ciclos.md` diz "119 peças" e "50 estados";
    - os títulos das folhas 2 e 6 estão trocados no HTML.

## 4 · As decisões

- **D1:** de acordo, com a condição do item 5.
- **D2:** de acordo. A T07/01 se alcança pelo menu, porque a T09/04 só tem `Voltar ao menu`. Na manutenção, a CAN aparece lida logo depois do vínculo.
- **D3:** de acordo. O fato do desvínculo precisa de um campo no estado (`src/estado/estado.jsx`, item 13).
- **D4:** de acordo no comportamento, mas falta o ritmo. Nem o `movimento.md` nem a `animacao.md` da T07 dizem quanto tempo leva, e a referência mostra 62%. **Padrão:** o quadro de 62% por um bloco de gravação (1 s, um ritmo que já existe), depois a releitura. Se você preferir declarar outro tempo, é uma linha.
- **D5: não há campo.** Procurei no `indice.json` do pacote, no `estados.md` da T07 e no mock, e nenhum tem esse campo. Como você pediu, aviso antes de inventar.
  - **Proposta:** o nosso campo `grupo` no `indice.json`, que a T05 já usava: *o módulo* nos estados 02, 03, 04, 05 e 07, e *a CAN* nos 08 e 09.

## 5 · O que não faz sentido

- **Gravar a conexão (T07/05) antes de haver sessão e ativo.** A Conexão é o 6º bloco da cadeia, que só roda na T09.
- **"A caixa da CAN dá lugar às linhas"** (`T07/animacao.md:10`) nunca acontece na frente do técnico: a T07 volta já lida, e a entrada de tela não anima.
- ***Identificadores 3 de 3* no encerramento (T16/02)**, se a v1 não grava cartões (decisão 45).
- **O M2C-0999 aparece na lista como "não está no cadastro"** antes de conectar, e não é tocável na T05/01. Mas a `logica.md:59` manda conectar nele e travar no diagnóstico.

## Depois do OK

Aplico o pacote parte por parte, na ordem do fluxo: a T05 e o roteador, a T07, a T04 e a T03, a T06, a T09, a T16 e a T12, e o palco. Cada parte vai num commit local, sem push, e roda a régua rápida. No fim, a régua completa e os prints de cada referência nova ou mudada, lado a lado.
