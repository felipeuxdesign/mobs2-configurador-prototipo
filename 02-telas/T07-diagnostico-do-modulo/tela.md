# T07 · Diagnóstico do módulo

Ver o que o módulo informa e o que a CAN do modelo lê — logo depois da conexão, e de novo depois da configuração.

| | |
|---|---|
| **Elemento-assinatura** | as linhas do módulo e da CAN, cada uma com o seu estado no poço: o que trava em vermelho, o que só informa em cinza |
| **Chrome** | faixa de sessão · nas travas, o módulo em cima do título, sem faixa — a faixa não aparece |
| **Semente no protótipo** | sessão M2C-0417, sem ativo · o módulo do herói, com os oito itens que contam certos e mensagens só informativas |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 4 · 9 — ver `estados.md` |

## Regra vigente · retorno do PM de 06/10/2026

O módulo tem **nove linhas lidas**, das quais **oito contam**: número do chip incluído; mensagens no módulo só informam. A CAN do herói tem seis linhas, das quais cinco contam; o alternador só informa. A soma atual é **13**. A alimentação confronta a faixa do modelo do módulo (VL06: 9,0 a 32,0 V), e o GPS confere pela antena; os satélites são informativos. O caso de alimentação baixa declara 8,4 V, não 10,9 V. A leitura percorre `M.diagnostico.modulo` a cada 600 ms; `etapas.preChecagem` guarda a contagem calculada de oito, sem número fixo de sete. A sessão nasce na conexão da T05; a faixa aparece aqui depois da leitura sem trava.

Fontes: `04-dados/mocks.js`, `06-prototipo/app/src/telas/T07/diagnostico.js`, `index.jsx` e referências atuais `00`, `01`, `11` e `12`.

## Histórico de construção · ações dos pacotes anteriores

As notas abaixo conservam as medições e as divergências de cada entrega. Sete linhas no módulo, alimentação de 10,9 V e contadores de sete descrevem o diagnóstico anterior; o retorno do PM e a regra vigente acima os substituem.

- **a alimentação abaixo da faixa só informa**, como o modem sem sinal: a linha diz *dá pra seguir · o checklist registra*, e o *Selecionar ativo* continua aceso · o checklist reprova o item *Alimentação* da Seção C (a T13/16)
  - no protótipo · o pacote 10: o caso `can-estatico-bateria` muda a linha da Alimentação do M2C-0301, como o `modem-sem-sinal` muda a do Modem — *informa*, com o 10,9 V do caso e *dá pra seguir · o checklist registra*; o contador fica em 6 de 7, a faixa desce e o `Selecionar ativo` acende · o M2C-0301 não está entre os que a busca acha, e a 12 abre só pela coluna, parada
- as linhas do módulo são a linha de conferência, de 50px; as da CAN, a lista longa, de 44 (lei 23) · nas travas sem saída escrita — o serial fora do cadastro e o modelo sem suporte —, **o aviso abre a tela com o porquê**, e o botão é a saída · o topo só identifica o módulo, sem repetir a trava
  - no protótipo · o módulo é a `LinhaChecagem` na variante `diagnostico` — a medida da linha de conferência: 50, o poço de 32, o glifo de 16, a 10 —, com a tinta da checagem: o título aprovado em --tinta-forte, o que espera apagado, o que reprova e o que informa em --tinta, como as onze referências e as quatro peças de estado da folha 4 desenham (a T11 acende o nome em todo estado, e por isso a variante é outra); a CAN e o *Conferido na conexão*, a variante `longa` — 44, o poço de 30, o glifo de 16, a 12. Nas duas, o rótulo em 15/600 e o valor em 14; com a causa, 6 em cima e embaixo, nunca menos que a altura da linha (D3); o quadrado de agora fica em 10 nos dois poços (06, 10). O aviso é o `Aviso` de falha (o xis no poço de 26), entre o cabeçalho e *O MÓDULO*, a 12 dos dois, como as referências: o serial e o nome do modelo (o modelo e a variante, os mesmos do valor da linha) vêm do cadastro do mock, e a moldura, do `textos.md`. Ele acompanha a trava: quando a leitura termina nela. No fluxo (o M2C-0999 da T05/01), aparece quando a sétima linha fecha, esmaecendo no lugar (`Aviso` · `surge`, 150), e o espaço abre direto, como nas travas da T09 (o bloco do módulo desce: a lei 3 do aviso); aberto já na trava (a URL, a coluna, o print), parado. O rótulo de cima diz só o serial do módulo fora do cadastro também enquanto ele lê
- `Gravar a conexão` (firmware fora da lista, módulo sem rede) → grava só a conexão, isolada, e o firmware atualiza por ela
  - no protótipo · o `Gravar a conexão` (05) consome o `firmware-sem-rede-no-modulo` — o modem ganha rede — e leva direto à 06, a atualização: o quadro de gravando a conexão não tem referência (G25), e nada se grava no estado além do caso consumido. A atualização (D4, construída): o quadro dos 62% (`CASOS["firmware-fora-matriz"].atualizacao.quadroPct`) fica `RITMOS.cadeiaBlocoMs` (1 s, o ritmo de uma gravação no módulo), e o diagnóstico recomeça das sete, com o firmware disponível do caso (`firmwareDisponivel`, 2.3.5, o caso consumido); passando, a faixa desce. Durante, o voltar não faz nada e não há ENCERRAR (a faixa não desceu). O 06 pela URL abre nos 62% e segue dali; no print, para. O `movimento.md` (Sem ritmo declarado, fica parado) e a `logica.md` (a atualização do firmware) ainda dizem que o quadro fica parado: a D4 aprovada os supera, e a frase espera quem cuida dos dois
- `Procurar outro módulo` → T05/01, a lista sem nada escolhido
  - no protótipo · a sessão que nasceu no Conectar e não chegou a aparecer (a faixa não desce na trava) se desfaz, sem registro e sem fila — `sessao` e `etapas.preChecagem` voltam a nada —, e a T05 abre na 01. O voltar do sistema faz o mesmo nas travas (02 a 05)
- logo depois de conectar: as sete linhas do módulo, e a CAN aguardando a configuração do ativo
  - no protótipo · as sete acendem uma a cada `RITMOS.diagnosticoLinhaMs` (600, `movimento.md` · diagnóstico), depois dos 150 da troca entre telas (C12·35), só quando o Conectar da T05 traz a sessão sem ativo e sem o diagnóstico deste módulo; pela URL, pelo palco, num estado e no print, a tela abre parada, no quadro da referência. A leitura é a 11 (o pacote 5): a linha que lê com o quadrado de agora e *lendo*, as que esperam com o relógio apagado e o traço — o título delas aceso, como a 11 desenha —, a contagem ao lado do título, a barra já no fundo da faixa, nada em cima do título, e o rodapé só com *Lendo · não saia da tela*, desabilitado, fechando em 24 (o voltar não faz nada); pela URL, a 11 abre parada nas Entradas digitais (*4 de 7*). Quando a leitura acaba numa trava, o módulo aparece em cima do título, pela regra das travas: o serial e a placa do ativo que o cadastro prevê (*M2C-0417 · RKT-8H42*, decisão 46), ou só o serial, fora do cadastro (o pacote 3: a trava fica com o aviso); o módulo do cadastro sem ativo previsto, que nenhuma referência desenha, diz *sem ativo*. A 06 e a 10, os outros processos da tela, seguem com o título das que esperam apagado e o rodapé em 32, como elas desenham (o desvio vai no gate do pacote 5). Passando sem trava, a faixa desce (Faixa `ausente`, C12·24), o rótulo de cima sai, e o rodapé vira o da 00 — o primário com o texto novo esmaecendo no lugar (C12·23); o rodapé, que passa de uma ação a duas, sobe com a faixa, só por deslocamento. Fica gravado `etapas.preChecagem` com o nome de hoje, porque a T13 e a T12 leem assim (o gate do pacote 1, item 2): `{ checagens: 7, passaram: 7 }`, e mais `aprovadas` (o contador) e `moduloSerial` (o módulo que passou). Num pulo do palco pra uma tela de depois, com o ativo na sessão, o módulo conta como já conferido e a tela abre parada
- `Selecionar ativo` → T06, o vínculo
  - no protótipo · com o ativo já na sessão e antes da cadeia (o menu depois da T06), a 00 mostra a placa na faixa e o rodapé só com `Voltar ao menu`: o `Selecionar ativo` não cabe com o ativo preso na sessão, e nenhuma referência desenha esse quadro (gate do pacote 1, NOVA-5)
- **só três coisas travam**: serial não cadastrado, modelo sem suporte e firmware fora da lista — sinal, GPS e alimentação só informam, e o checklist registra
  - no protótipo · as três travas são fatos do cadastro e valem toda vez que o módulo conecta: o serial fora de `M.modulos` (02), o modelo sem `driverV1` (03) e o firmware fora da lista da variante (04, de `matrizCapacidades.firmwares`). Com o serial travado, o firmware e as entradas ficam *sem cadastro*, com o relógio apagado. O serial e o firmware vêm do cadastro do módulo conectado; a alimentação, o GPS, as entradas, o modem e o SIM, do `heroi` de `M.diagnostico.modulo` (o único conjunto do mock, que as referências 02 a 05 repetem). O que só informa é o estado `informa` da linha de checagem (a peça nova da folha 4): o modem sem sinal (07, pela linha marcada com `informa` no mock) e o modem sem rede do 05. No fluxo, só as travas acontecem, pelo serial (o M2C-0999 da T05/01 é a porta, a errata); o modem sem sinal e os sinais da CAN caem no par do herói e abrem só pela coluna (D1). O `motivo` do `modelo-sem-driver` fica sem leitor: o texto é o do `textos.md`. O link que cai no meio da leitura não tem caso no mock desde que a pré-checagem saiu: não se constrói
- no firmware fora da lista: `Atualizar firmware` · com o módulo sem rede, `Gravar a conexão` primeiro
- depois da configuração, o módulo vira uma linha — *Conferido na conexão* — e a tela fica pra CAN do modelo
  - no protótipo · a CAN aparece lida (01) quando a cadeia já passou do bloco do ativo (`etapas.cadeia.confirmados` ≥ 2, D2), na manutenção com o vínculo feito (`etapas.ativo.modo` ou `sessao.modo`) ou depois de lida aqui pro mesmo ativo; o herói chega pelo `Diagnóstico do módulo` do menu, e o endereço passa a dizer a 01. Fica gravado `etapas.can` `{ lida: true, reprovados }`, com o nome de hoje, e mais o `ativoId`. A linha do módulo diz o que a conexão conferiu (*7 de 7*), e o contador soma os dois: 7 + os sinais. A caixa *Aguardando* nunca dá lugar às linhas na frente do técnico: a T07 volta já lida. A 01 e a 10 pela URL põem na sessão o ativo previsto do módulo (o RKT-8H42), pra faixa e o menu dizerem o mesmo
- a lista da CAN vem do modelo do ativo: rotação, hodômetro e horímetro, quando o modelo tem, e os sinais que ele traz a mais · a velocidade nunca aparece aqui: só como opcional da T10
  - no protótipo · a lista é a de `M.diagnostico.can`, do modelo `ma-01`, a única que uma referência desenha; o ativo de outro modelo não tem lista no mock, e a caixa fica no lugar (a lacuna vai ao arquiteto). Os estados da CAN mudam o sinal do caso: *sem leitura · ligação* com o traço (08, `can-estatico-ausente`) e *fora do esperado · −40 a 120* com o lido do caso (09, `can-estatico-isolado`)
- `Ler de novo` → relendo → a CAN lida de novo · no lugar da antiga Refazer leitura
  - no protótipo · relê só a CAN (a 10 mantém o módulo *Conferido*), uma linha a cada `RITMOS.diagnosticoLinhaMs`, no lugar, sem troca de quadro, e volta à 01; o caso da CAN, se houver, fica consumido (G21). Relendo, o voltar não faz nada e o ENCERRAR fica apagado e desabilitado (a lei 17 e a `logica.md`, gate do pacote 1, NOVA-9): o PNG da 10 o desenha aceso, e essa é a diferença nomeada. A 10 pela URL abre no quadro dela (a temperatura lendo) e segue dali
- se o link cair no meio da leitura → T05, conexão falhou
  - no protótipo · sem caso no mock (o `link-perdido` era da pré-checagem de onze linhas): não se constrói neste pacote

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- barra do sistema sem sessão
- faixa · sessão aberta
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- uma ação
- com legenda
- aprovada
- reprovada, com causa
- só informa
- ainda não
- lista longa
- processo parado
- nota com rótulo
- linha do histórico
- a lista de garagens
- encerrando
- reiniciando
- sem homologar
- com contador
- linha de opção
- lista com contagem
- item feito
- linha da fila
- linha da re-checagem

## Histórias de usuário

- **HU-T07-1** — Logo depois de conectar, vejo o módulo: serial, firmware, alimentação, GPS, entradas, modem e SIM
- **HU-T07-2** — Serial fora do cadastro, modelo sem suporte e firmware fora da lista travam — cada um com a sua mensagem
- **HU-T07-3** — Firmware fora da lista oferece atualizar quando o módulo tem rede; sem rede, o app grava só a conexão, e então atualiza
- **HU-T07-4** — O resto só informa, com o ícone de informação: eu sigo, e o checklist registra
- **HU-T07-5** — A CAN aparece depois que o bloco do ativo é gravado, com a lista do modelo; sinal sem leitura ou fora do esperado aparece na própria linha
- **HU-T07-6** — Ler de novo relê a CAN inteira

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## O diagnóstico (retorno do PM, 06/10)

- **o módulo tem 8 linhas que contam**: serial, firmware, alimentação, GPS, entradas, modem, SIM e o **número do chip**, que o técnico confere com o impresso no chip · e **as mensagens no módulo**, só informação, que não contam nem bloqueiam: *12 mensagens ainda não enviadas*
- **a alimentação é a do equipamento**: o valor lido pelo módulo, com a faixa de operação do modelo embaixo (*faixa 9,0 a 32,0 V*, exemplo até a bancada) · sem bateria interna
- **o GPS é a antena**: *conectada*, *em curto* ou *desconectada* · os satélites ficam como informação
- **a CAN tem 5 sinais que contam** · o alternador fica, só como leitura informativa · **a ré e a velocidade saíram**: a velocidade só aparece como item opcional da T10 (a lista final do PM) · o total é 13
- **a sessão anterior mal encerrada** (a 13): quando o canal de programação é encontrado aberto, *O app fechou o acesso que ficou aberto. Pode seguir.*
- o firmware que trava é o **fora da lista** (a 04)

## No protótipo · a medição (o pacote 3)

Construída em `06-prototipo/app/src/telas/T07/` (`index.jsx`, `diagnostico.js`, `textos.js`, `t07.css`), com as peças do design system: a linha de checagem nas variantes `diagnostico` (o módulo, 50) e `longa` (a CAN, 44 · lei 23, o pacote 3), com o estado `informa`; o aviso de falha nas travas do serial e do modelo; a lista em cartão, a nota com rótulo no tom `aguarda` (a caixa da CAN: 10 · 12, a frase de 12 em 400 na entrelinha de 1,5), o cabeçalho com contador, a faixa, a barra do sistema e o rodapé. O rótulo de topo fica sempre em 12, com a letra de 1,2 (`--t-legenda`, `--ls-rotulo-topo-fora`), como as cinco referências que o desenham. As onze referências, contra o HTML e contra o PNG (`node scripts/tela.mjs todos T07`): 00 0,04% · 1,35% · 01 0,05% · 1,26% · 02 0,04% · 1,96% · 03 0,04% · 1,98% · 04 0,04% · 1,93% · 05 0,04% · 2,35% · 06 0,03% · 1,7% · 07 0,04% · 1,53% · 08 0,05% · 1,33% · 09 0,05% · 1,37% · 10 0,13% · 1,23%. O que sobra tem nome: os glifos do Lucide no poço (G5: a folha 3 desenha o círculo de 9, e o Lucide o de 10), em todas, e no poço do aviso da 02 e da 03; e, na 10, o ENCERRAR apagado (NOVA-9). Os textos conferem nas onze (`node scripts/textos.mjs T07`). O movimento: `node scripts/caminho.mjs mov-t07`.

O aviso das travas (02, 03) é o desenho do *processo parado* da lista de peças — o mesmo `Aviso` de falha. A lista traz peças que nenhuma das onze referências desenha (o topo do menu inteiro, faixa · sem ação, linha do histórico, a lista de garagens, encerrando, pede o corte, sem homologar, linha de opção, lista com contagem, item feito, linha da fila, linha da re-checagem): vale o que as referências desenham, e a diferença vai ao arquiteto.
- **no protótipo · a rodada 2:** a leitura passa pelas 9 linhas, um por tique, e o contador conta as 8 que contam (*8 de 8*) · a frase embaixo do nome é a `nota` da linha (a faixa do modelo, os satélites, *só informação*, as mensagens), antes da causa · as mensagens e o alternador levam o i no poço · a alimentação e as mensagens têm 54, e o GPS, 50, como as referências desenham · o caso `modulo-com-pendencias` (o M2C-0362) monta a 13: o aviso neutro em cima, quando a leitura termina, e as 12 mensagens na linha delas · o firmware que trava diz *na lista: …*
