# T07 · Diagnóstico do módulo

Ver o que o módulo informa e o que a CAN do modelo lê — logo depois da conexão, e de novo depois da configuração.

| | |
|---|---|
| **Elemento-assinatura** | as linhas do módulo e da CAN, cada uma com o seu estado no poço: o que trava em vermelho, o que só informa em cinza |
| **Chrome** | faixa de sessão · nas travas, o módulo em cima do título, sem faixa — a sessão não nasce |
| **Semente no protótipo** | sessão M2C-0417, sem ativo · o módulo do herói, com os sete itens certos |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 3 · 7 — ver `estados.md` |

## O que se toca

- `Gravar a conexão` (firmware não homologado, módulo sem rede) → grava só a conexão, isolada, e o firmware atualiza por ela
  - no protótipo · o `Gravar a conexão` (05) consome o `firmware-sem-rede-no-modulo` — o modem ganha rede — e leva direto à 06, a atualização: o quadro de gravando a conexão não tem referência (G25), e nada se grava no estado além do caso consumido. A atualização (D4, construída): o quadro dos 62% (`CASOS["firmware-fora-matriz"].atualizacao.quadroPct`) fica `RITMOS.cadeiaBlocoMs` (1 s, o ritmo de uma gravação no módulo), e o diagnóstico recomeça das sete, com o firmware disponível do caso (`firmwareDisponivel`, 2.3.5, o caso consumido); passando, a faixa desce. Durante, o voltar não faz nada e não há ENCERRAR (a faixa não desceu). O 06 pela URL abre nos 62% e segue dali; no print, para. O `movimento.md` (Sem ritmo declarado, fica parado) e a `logica.md` (a atualização do firmware) ainda dizem que o quadro fica parado: a D4 aprovada os supera, e a frase espera quem cuida dos dois
- `Procurar outro módulo` → T05/01, a lista sem nada escolhido
  - no protótipo · a sessão que nasceu no Conectar e não chegou a aparecer (a faixa não desce na trava) se desfaz, sem registro e sem fila — `sessao` e `etapas.preChecagem` voltam a nada —, e a T05 abre na 01. O voltar do sistema faz o mesmo nas travas (02 a 05)
- logo depois de conectar: as sete linhas do módulo, e a CAN aguardando a configuração do ativo
  - no protótipo · as sete acendem uma a cada `RITMOS.diagnosticoLinhaMs` (600, `movimento.md` · diagnóstico), depois dos 150 da troca entre telas (C12·35), só quando o Conectar da T05 traz a sessão sem ativo e sem o diagnóstico deste módulo; pela URL, pelo palco, num estado e no print, a tela abre parada, no quadro da referência. O começo da leitura não tem referência (gate do pacote 1, NOVA-2): ele usa os quadros da 10, a mesma tela e o mesmo processo — a linha que lê com o quadrado de agora e *lendo*, as que esperam com o relógio apagado e o traço, e o rodapé só com *Lendo · não saia da tela*, desabilitado (o voltar não faz nada). Enquanto a faixa não desce, o módulo fica em cima do título, pela regra das travas: o serial e a placa do ativo que o cadastro prevê (*M2C-0417 · RKT-8H42*, decisão 46), ou *fora do cadastro*; o módulo do cadastro sem ativo previsto, que nenhuma referência desenha, diz *sem ativo*. Passando sem trava, a faixa desce (Faixa `ausente`, C12·24), o rótulo de cima sai, e o rodapé vira o da 00 — o primário com o texto novo esmaecendo no lugar (C12·23); o rodapé, que passa de uma ação a duas, sobe com a faixa, só por deslocamento. Fica gravado `etapas.preChecagem` com o nome de hoje, porque a T13 e a T12 leem assim (o gate do pacote 1, item 2): `{ checagens: 7, passaram: 7 }`, e mais `aprovadas` (o contador) e `moduloSerial` (o módulo que passou). Num pulo do palco pra uma tela de depois, com o ativo na sessão, o módulo conta como já conferido e a tela abre parada
- `Selecionar ativo` → T06, o vínculo
  - no protótipo · com o ativo já na sessão e antes da cadeia (o menu depois da T06), a 00 mostra a placa na faixa e o rodapé só com `Voltar ao menu`: o `Selecionar ativo` não cabe com o ativo preso na sessão, e nenhuma referência desenha esse quadro (gate do pacote 1, NOVA-5)
- **só três coisas travam**: serial não cadastrado, modelo sem suporte e firmware não homologado — sinal, GPS e alimentação só informam, e o checklist registra
  - no protótipo · as três travas são fatos do cadastro e valem toda vez que o módulo conecta: o serial fora de `M.modulos` (02), o modelo sem `driverV1` (03) e o firmware fora da matriz da variante (04, *homologadas …* de `matrizCapacidades.firmwares`). Com o serial travado, o firmware e as entradas ficam *sem cadastro*, com o relógio apagado. O serial e o firmware vêm do cadastro do módulo conectado; a alimentação, o GPS, as entradas, o modem e o SIM, do `heroi` de `M.diagnostico.modulo` (o único conjunto do mock, que as referências 02 a 05 repetem). O que só informa é o estado `informa` da linha de checagem (a peça nova da folha 4): o modem sem sinal (07, pela linha marcada com `informa` no mock) e o modem sem rede do 05. No fluxo, só as travas acontecem, pelo serial (o M2C-0999 da T05/01 é a porta, a errata); o modem sem sinal e os sinais da CAN caem no par do herói e abrem só pela coluna (D1). O `motivo` do `modelo-sem-driver` fica sem leitor: o texto é o do `textos.md`. O link que cai no meio da leitura não tem caso no mock desde que a pré-checagem saiu: não se constrói
- no firmware não homologado: `Atualizar firmware` · com o módulo sem rede, `Gravar a conexão` primeiro
- depois da configuração, o módulo vira uma linha — *Conferido na conexão* — e a tela fica pra CAN do modelo
  - no protótipo · a CAN aparece lida (01) quando a cadeia já passou do bloco do ativo (`etapas.cadeia.confirmados` ≥ 2, D2), na manutenção com o vínculo feito (`etapas.ativo.modo` ou `sessao.modo`) ou depois de lida aqui pro mesmo ativo; o herói chega pelo `Diagnóstico do módulo` do menu, e o endereço passa a dizer a 01. Fica gravado `etapas.can` `{ lida: true, reprovados }`, com o nome de hoje, e mais o `ativoId`. A linha do módulo diz o que a conexão conferiu (*7 de 7*), e o contador soma os dois: 7 + os sinais. A caixa *Aguardando* nunca dá lugar às linhas na frente do técnico: a T07 volta já lida. A 01 e a 10 pela URL põem na sessão o ativo previsto do módulo (o RKT-8H42), pra faixa e o menu dizerem o mesmo
- a lista da CAN vem do modelo do ativo: rotação, velocidade, hodômetro e horímetro, quando o modelo tem, e os sinais que ele traz a mais
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
- duas ações
- uma ação
- com legenda
- aprovada
- reprovada, com causa
- só informa
- ainda não
- diagnóstico
- diagnóstico com sessão
- nota com rótulo
- linha do histórico
- a lista de garagens
- com contador
- checkbox
- checkbox marcado
- justificativa
- linha de opção
- lista com contagem

## Histórias de usuário

- **HU-T07-1** — Logo depois de conectar, vejo o módulo: serial, firmware, alimentação, GPS, entradas, modem e SIM
- **HU-T07-2** — Serial fora do cadastro, modelo sem suporte e firmware não homologado travam — cada um com a sua mensagem
- **HU-T07-3** — Firmware não homologado oferece atualizar quando o módulo tem rede; sem rede, o app grava só a conexão, e então atualiza
- **HU-T07-4** — O resto só informa, com o ícone de informação: eu sigo, e o checklist registra
- **HU-T07-5** — A CAN aparece depois que o bloco do ativo é gravado, com a lista do modelo; sinal sem leitura ou fora do esperado aparece na própria linha
- **HU-T07-6** — Ler de novo relê a CAN inteira

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## No protótipo · a medição (o pacote 1)

Construída em `06-prototipo/app/src/telas/T07/` (`index.jsx`, `diagnostico.js`, `textos.js`, `t07.css`), com as peças do design system: a linha de checagem compacta (com o estado novo `informa`), a lista em cartão, a nota com rótulo no tom novo `aguarda` (a caixa da CAN: 10 · 12, a frase de 12 em 400 na entrelinha de 1,5), o cabeçalho com contador, a faixa, a barra do sistema e o rodapé. O rótulo de topo fica sempre em 12, com a letra de 1,2 (`--t-legenda`, `--ls-rotulo-topo-fora`), como as cinco referências que o desenham. As onze referências, contra o HTML e contra o PNG (`node scripts/tela.mjs todos T07`): 00 0,06% · 1,53% · 01 0,14% · 1,45% · 02 0,05% · 1,98% · 03 0,05% · 2% · 04 0,05% · 2,1% · 05 0,05% · 2,52% · 06 0,04% · 1,88% · 07 0,05% · 1,66% · 08 0,14% · 1,52% · 09 0,14% · 1,52% · 10 0,22% · 1,45%. O que sobra tem nome: os glifos do Lucide no poço (G5: a folha 3 desenha o círculo de 9, e o Lucide o de 10), em todas; a placa da faixa em --tinta-apagada na 01, na 08, na 09 e na 10 (e na *faixa · sessão aberta* da folha 2 nova), enquanto a peça segue as outras 50 referências, que a desenham em --tinta-secundaria (a pergunta vai ao arquiteto); e, na 10, o ENCERRAR apagado (NOVA-9). Os textos conferem nas onze (`node scripts/textos.mjs T07`). O movimento: `node scripts/caminho.mjs mov-t07`. A lista de peças de cima traz oito que nenhuma das onze referências desenha (faixa · sem ação, linha do histórico, a lista de garagens, checkbox, checkbox marcado, justificativa, linha de opção e lista com contagem), e não traz a *uma ação*, que a 02, a 03 e a 10 desenham: vale o que as referências desenham, e a diferença vai ao arquiteto.
