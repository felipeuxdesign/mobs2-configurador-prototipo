# T04 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · fila com 2 itens |
| `01-momento-sem-modulo` | momento | o menu antes de conectar | derivado do fluxo |
| `02-momento-modulo-sem-ativo` | momento | módulo conectado, ônibus ainda não escolhido | derivado do fluxo |
| `03-estado-faixa-modulo-com-falha` | estado | o módulo da sessão perde o link | `link-perdido` |
| `04-estado-checklist-pendente` | estado | o checklist tem itens abertos | `checklist` |
| `05-momento-folha-conta` | momento | tocar nas iniciais | `tecnico` |
| `06-momento-folha-conta-sair-com-sessao-aberta` | momento | `Sair da conta` com sessão ou fila | `filaSaida` |
| `07-momento-folha-trocar-de-garagem` | momento | tocar no nome da unidade, com uma empresa só | `uma-empresa` |
| `08-estado-folha-trocar-de-garagem-envio-em-andamento` | estado | trocar com evidência subindo | `filaSaida` |
| `09-estado-folha-trocar-de-garagem-com-modulo-conectado` | estado | trocar com a sessão aberta | derivado do fluxo |
| `10-momento-folha-modulo-conectado` | momento | tocar no cartão do módulo com a sessão aberta | `modulos · M2C-0417` |
| `11-momento-folha-ativo-da-sessao` | momento | tocar no cartão do ativo com a sessão aberta | `ativos · a-01` |
| `12-estado-acesso-vencendo` | estado | a sessão de acesso chega ao 5º dia: o diálogo aparece uma vez por dia, na primeira chegada ao menu | `situacao.sessaoAcesso` |
| `13-momento-encerrar-antes-de-homologar` | momento | tocar no ENCERRAR antes de homologar | derivado do fluxo |
| `14-estado-folha-trocar-de-unidade-com-empresa` | estado | tocar no nome da unidade, pra quem tem várias empresas — o herói | `empresas · uos · pacotes` |
| `15-estado-sem-conexao` | estado | o aparelho sem rede — o Últimas instalações espera a conexão | `sem-conexao-no-menu` |

No protótipo: o `13` abre pelo toque no ENCERRAR, antes de homologar — no menu, e pelo `Encerrar a sessão` das folhas do módulo e do ativo —, e pelo endereço, como os outros momentos · o `14` abre pela coluna e pelo endereço, montado pelo mundo do herói (`M.empresas`, a otimização 400), parado e sem toque. No fluxo, o quadro do `14` é a folha do herói: tocar no nome da unidade abre a folha com o `Trocar de empresa` no fim — a URL diz o `07`, o momento de tocar no nome da unidade —, e ele leva à T02/07 com a atual marcada (`06-prototipo/logica.md` · A empresa e a unidade). O `07` aberto pelo endereço é o app vivo no mundo dele, o de uma empresa só (o caso `uma-empresa`): a folha sem o `Trocar de empresa`, como a referência; e, no fluxo, a de quem sincronizou uma unidade de uma empresa só (a T02/01, a lista longa). O menu escreve o mundo no estado único ao montar, quando ele não está lá (`app/src/telas/T04/dados.js` · `mundoDoMenu`): o `07` pelo endereço, o de uma empresa só; o resto, o do herói, a semente da T04. Por isso o endereço copiado com a folha do herói aberta (`?tela=T04&momento=07-momento-folha-trocar-de-garagem`) reabre a folha sem o `Trocar de empresa` (desvio nomeado, pro arquiteto: `06-prototipo/palco.md` · O link publicado).

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
