# T04 · Menu

O painel das ferramentas: o que está pronto pra usar, o que espera o quê.

| | |
|---|---|
| **Elemento-assinatura** | a grade de dez cartões em que cada ferramenta diz, no próprio cartão, o que falta pra ela funcionar |
| **Chrome** | tira de contexto (unidade) + faixa de sessão quando há sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · fila com 2 itens |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 8 · 6 — ver `estados.md` |

- no protótipo · a nossa versão da linha *Chrome*, antes desta entrega: | **Chrome** | tira de contexto (unidade) + faixa de sessão · sem sessão, a faixa diz só o fato (01) |

## O que se toca

- o título *Menu* existe escondido em todas as telas do menu, pra leitura de tela
  - no protótipo (a última entrega): o h1 *Menu* escondido não fica mais inerte atrás do véu — existe pro leitor com a folha ou o diálogo por cima ou não. Ele não se toca, e o que é tocável atrás do véu continua inerte. As referências das folhas (`05`, `07`, `08`, `10`, `11`, `14`) e os `textos.md` delas ainda não trazem o *Menu*, e a régua dos textos acusa *sobra* nas seis: desvio nomeado, pro arquiteto (a resposta de 26/09 diz que ele vale em todas); nos diálogos (`06`, `09`), que já o traziam, a régua agora confere
- o diálogo do ENCERRAR, fora do menu, abre sobre a própria tela, e o `Continuar a instalação` deixa o técnico nela
- o ENCERRAR antes de homologar abre o diálogo *Encerrar sem homologar?* · `Continuar a instalação` fecha e volta pra tela · `Encerrar sem homologar` → o encerramento sem homologar da T16 · depois de homologar, o ENCERRAR vai direto, sem diálogo
  - no protótipo (decisão 36, construída): o diálogo é o momento `13`, com endereço — a URL abre e fecha, e o `Continuar a instalação` volta ao quadro do menu (00, 01 ou 02). O véu cobre a tira e a faixa, como no aviso do acesso, e a caixa tem o ar de 24 que a `13` desenha; o menu inteiro fica atrás dele, inerte. O voltar faz o `Continuar a instalação`. Aberto pelo endereço, o aviso do acesso espera o diálogo fechar, como espera a folha. Depois de homologar, o ENCERRAR do menu vai direto pros passos do encerramento — antes, ele ia pra sessão abortada mesmo com o checklist homologado. A peça é uma só pra toda tela com a faixa (`app/src/estado/encerrar.jsx`, `06-prototipo/logica.md` · ENCERRAR): nas outras telas, o mesmo diálogo abre por cima da própria tela, sem endereço
- o `Encerrar a sessão` das folhas do módulo e do ativo abre o mesmo diálogo, antes de homologar · as folhas de sair da conta e de trocar de unidade já são a confirmação delas, e avisam: *é encerrada antes, sem homologar* — nenhum caminho pergunta duas vezes
  - no protótipo: o `Encerrar a sessão` fecha a folha na hora, sem dois véus, e abre o `13` por cima do menu; o `Continuar a instalação` volta ao menu, sem a folha. Os diálogos de sair e de trocar vão direto pros 4 passos, sem passar pelo *Encerrar sem homologar?*
- com mais de uma empresa, a folha de trocar de unidade tem `Trocar de empresa` no fim · com módulo conectado, trocar de empresa pede a mesma confirmação de trocar de unidade — a sessão encerra antes (HU-T02-3)
  - no protótipo: o `14` abre pela coluna e pelo endereço, montado pelo mundo do herói (`M.empresas`, a otimização 400), parado e sem toque. O que o toque faz se prova no node (`app/scripts/testar-trocar-empresa.mjs`, nas funções da tela), e se anda no roteiro `empresa.mjs`. Com a sessão aberta, o diálogo de trocar com *Trocar de empresa* no título, *é encerrada antes da troca, sem homologar.* e `Encerrar a sessão e trocar` — os textos que o arquiteto confirmou em 26/09 —, os 4 passos da T16, e depois a T02. O link é o de 48, a 6 do cartão das unidades, comendo 4 em cima e embaixo, como a `14` desenha
  - no protótipo (a última entrega, a resposta do arquiteto de 26/09): o `Trocar de empresa` leva à **T02/07**, a lista das empresas com a atual marcada — sem sessão, direto; com ela, depois dos 4 passos (MUDA: ia ao `05`, sem nada escolhido). E a folha do fluxo tem o link no mundo do herói, que tem três empresas desde a otimização 400: o mundo vai no estado único junto da unidade (`contexto.empresas`) até o menu — a folha de trocar de unidade (o `07`, com o endereço dele) mostra o `Trocar de empresa` como a `14` desenha. De uma empresa só — o `07` aberto pelo endereço, o caso `uma-empresa`, e a lista longa —, a folha segue sem o link, como a `07` desenha. Trocar de unidade leva o mundo junto. O roteiro `empresa.mjs` anda os dois caminhos, sem e com a sessão (o `Cancelar` do diálogo volta à folha)
- no 5º dia da sessão de acesso, o diálogo *Seu acesso vence em 2 dias* aparece na primeira chegada ao menu · `Entendi` fecha, e ele volta no dia seguinte até o técnico entrar de novo com rede
  - no protótipo, com o relógio parado, ele aparece uma vez só: o `Entendi` grava no estado único que ele foi visto, e o `Recomeçar do login` do palco mostra de novo. Os dias saem do mock (`situacao.sessaoAcesso`)
  - a chegada é a do menu sem nada por cima, com a sessão ou sem ela: a do herói, depois da sincronização, e a semente — o pulo do palco pro menu também mostra o aviso. O endereço de uma folha abre a folha, e o aviso espera o menu ficar sem nada por cima
  - o `Entendi` é o único jeito de fechar, e o voltar faz o mesmo que ele. O véu cobre o menu inteiro, a tira e a faixa também (12) · no print, o aviso só aparece no 12 (`logica.md` · O aviso do acesso)
- `Conectar módulo` → T05
- `Ativo selecionado` → T06, com o módulo conectado e o ônibus ainda não escolhido
- cada ferramenta liberada → a tela dela
- `ENCERRAR` → a sessão abortada, na T16 (`logica.md` · ENCERRAR)
  - no protótipo: antes de homologar, pelo diálogo `13`; depois, os passos do encerramento (T16/00)
- o nome da unidade na tira → folha Trocar de unidade
  - no protótipo: pro leitor de tela, a tira diz o que faz e qual é a unidade — *Trocar de unidade — Garagem Várzea*, como a conta diz *Conta — Rafael Vieira*; a lista das unidades, *Trocar de unidade*
- outra unidade na folha → com a sessão aberta, o diálogo de trocar (T04·4); sem ela, a sincronização da unidade escolhida. O Pátio Caruaru, com o pacote vencido, não se toca (T04·6), e diz só a causa, *pacote vencido há 8 dias*, como na T02 (a entrega do checklist)
- as iniciais RV → folha Conta
- `Sair da conta` → diálogo, se houver sessão ou fila; sem as duas, direto pro login, e o diálogo mostra só a frase que vale (T04·5)
- com a sessão aberta, o cartão do módulo → folha Módulo conectado · o do ativo → folha Ativo da sessão · os dois ficam travados: a folha diz isso e oferece `Encerrar a sessão`
  - no protótipo · a nossa versão desta linha, antes desta entrega: com a sessão aberta, o cartão do módulo → folha Módulo conectado (10) · o do ativo → folha Ativo da sessão (11) · os dois ficam travados (HU-T16-2): a folha diz isso e oferece `Encerrar a sessão`, que leva ao mesmo destino do `ENCERRAR` da faixa. Com o módulo sem ativo (02), o cartão do módulo já abre a folha dele. Substitui a T04·7 do C0, em que os dois cartões não se tocavam
- cartão de ferramenta em espera é desabilitado de verdade: o toque não faz nada, e o motivo já está escrito nele
  - no protótipo · a nossa versão desta linha, antes desta entrega: cartão de ferramenta em espera é desabilitado de verdade: o toque não faz nada, o motivo já está escrito nele, e pro leitor de tela ele é desabilitado (`logica.md` · Os cartões em espera)
- o `Cancelar` dos dois diálogos volta à folha de onde ele nasceu (T04·8)
- `Encerrar a sessão e sair` → login, com a fila preservada · `Encerrar a sessão e trocar` → a sincronização da unidade nova. Os dois passam pelo encerramento sem homologar da T16 quando ele existir (C11); até lá, seguem direto (G23)
  - **no protótipo** (desde o C11, e a decisão 36): a T16 existe, e o *até lá* ficou pra trás — os dois rodam os 4 passos da sessão abortada e só depois seguem pro destino (`06-prototipo/logica.md` · ENCERRAR). Eles já são a confirmação: não passam pelo *Encerrar sem homologar?*, e nenhum caminho pergunta duas vezes
- com a folha ou o diálogo aberto, o menu não se toca — nem o que fica atrás do véu, nem a tira, que fica acesa em cima dele. Nas folhas do módulo e do ativo, o véu começa embaixo da faixa, e a faixa também fica acesa, sem se tocar. No aviso do acesso, o véu começa embaixo da barra do sistema, e a tira e a faixa ficam atrás dele (12)
- a folha fecha pelo X, tocando no véu, fora dela, e pelo voltar do sistema (no computador, o Esc); o diálogo, pelo `Cancelar` e pelo voltar, que faz o mesmo que ele (`logica.md` · O voltar do Android); o aviso do acesso, pelo `Entendi` e pelo voltar. No menu, sem folha nem diálogo, o voltar não faz nada: ele não tem saída desenhada (`08-produto-real/pendencias.md`)
  - no protótipo (lei 20, a última entrega): toda folha do menu também fecha arrastando pra baixo — o painel acompanha o dedo e, soltando depois de 56, fecha; antes, volta. O arraste que começa numa linha tocável não toca nela: a unidade não troca, o `Encerrar a sessão` não encerra, o `Sair da conta` não abre o diálogo. O toque fora agora é da peça, e o diálogo não fecha no toque fora (`06-prototipo/logica.md` · A folha que fecha)

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema no menu
- faixa · módulo com falha
- faixa · sem ação
- tira de contexto
- faixa no menu
- o topo do menu inteiro
- folha
- diálogo
- diálogo sem saída
- diálogo com ciência
- folha com opções
- disponível
- decide agora
- espera
- conectado
- com pendência
- espera a rede
- nota com rótulo
- linha do histórico
- linha de garagem
- linha de garagem · a atual
- a lista de garagens
- cadeia concluída
- cadeia recusada
- linha da fila
- linha da re-checagem
- contador no menu

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

- primário · normal
- primário · pressionado
- link · normal e pressionado
- linha tocável · normal e pressionada
- barra do sistema no menu
- faixa · sem sessão
- faixa · módulo com falha
- tira de contexto
- faixa no menu
- o topo do menu inteiro
- folha
- diálogo
- diálogo sem saída
- os glifos de estado
- os ícones de ferramenta
- os poços
- os marcadores
- disponível
- decide agora
- conectado
- com pendência
- espera
- espera a rede
- aviso
- nota com rótulo
- linha de unidade
- linha de unidade · a atual
- a lista de unidades
- botões só de ícone
- contador no menu

Corrigida no C5 pelas referências (G1, G10, T04-A8): saíram as sete peças que nenhuma das dez desenha (faixa · sem ação, diálogo sem saída, diálogo com ciência, linha do histórico, a marca no login, campo e campo focado) e entraram a faixa · sem sessão do 01 e o aviso do 08. O que só a T04 desenha virou variante nomeada da peça (G11): o cartão largo em espera e o 'decide agora' com poço 30 (CartaoFerramenta), o aviso sem poço (Aviso), a folha com folga 12 e subtítulo (Folha), a linha de unidade que espera o envio (LinhaGaragem) e o traço da falha por cima da faixa do menu (Faixa). O cartão da conta, o prazo do acesso e o Sair da conta são as peças da folha 2 que moram dentro da folha. No acerto do design system pelo medido (G10), entraram as peças de toque da folha 1 (o primário e o link dos diálogos, e a linha tocável), os átomos da folha 3 (glifos, ícones de ferramenta, poços e marcadores) e o X das folhas; e entraram como variante também a grade com 10 entre os cartões e o cartão travado com a sessão aberta. Com as folhas do módulo e do ativo (10, 11), o cartão travado saiu, do DS e da linha do conectado no `componentes.md`: com a sessão aberta, o cartão largo é o de sempre e abre a folha. As folhas usam a folha com o X, a nota com rótulo (TRAVADO NA SESSÃO) e o botão da folha, embaixo da tira e da faixa do menu; o cartão do que a sessão prendeu (o ícone de ferramenta num poço de 44, a identidade e o detalhe) só elas desenham, e é peça da tela (`pecas.jsx`), montada com os poços e os ícones da folha 3. O véu ganhou o toque fora da folha, declarado como variante da folha (G11). No acerto pelo medido depois das duas folhas (G10), a T04 entrou na coluna da nota com rótulo, e saíram da lista as quatro que a junção da atualização tinha trazido de volta e que nenhuma das doze desenha nem o código usa: diálogo sem saída, diálogo com ciência, folha com opções e linha do histórico. Com o aviso do acesso (12, a entrega de 25/09), o diálogo sem saída voltou: o `Entendi` é a única ação, e a variante nomeada (G11) é o ar de 24 em volta da caixa, com o véu começando embaixo da barra do sistema e cobrindo a tira e a faixa. Com a entrega do checklist (a faixa da sessão é uma peça só): a faixa no menu tem os 52 de toda tela, com a borda de cima embaixo da tira e a linha de baixo, que agora é dela e não do topo do menu; em falha, a linha vermelha de 2 nos mesmos 52 — saiu a variante do traço por cima da faixa do menu (C5, G24). A faixa sem sessão do `01`, cuja referência não mudou, fica com os 50 e a linha embaixo. Na folha de trocar de unidade, o Pátio Caruaru diz só a causa, *pacote vencido há 8 dias*, pela mesma função da T02, e a linha de unidade vencida não leva mais o que fazer. Com a otimização do design (a empresa e a unidade, o ENCERRAR com confirmação): o diálogo do ENCERRAR (13) é o diálogo, com o ar de 24 do aviso do acesso e o véu cobrindo a tira e a faixa; o `Trocar de empresa` da folha de trocar de unidade (14) é o link · normal e pressionado, com o desenho de 48 que a `14` desenha, e não o de 44 do rodapé (decisão 38), porque a referência o manteve.

## Histórias de usuário

- **HU-T04-1** — Vejo o semáforo do módulo no topo e a faixa de sessão acima dele
- **HU-T04-2** — Vejo 10 ferramentas; as que dependem de módulo ou ativo ficam desabilitadas com o motivo
- **HU-T04-3** — A fila mostra o contador de pendentes no próprio cartão, sem abrir
- **HU-T04-4** — Checklist pendente aparece como aviso persistente
- **HU-T04-5** — Não existe console de log. Cada ferramenta reporta estado em linguagem de campo

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
