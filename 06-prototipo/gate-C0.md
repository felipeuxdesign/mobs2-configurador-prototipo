# Gate C0 · Estudo da pasta inteira

**Ciclo:** C0 · **Data:** 2026-09-24 · **Estado:** entregue, **esperando o *vai*** · **Código escrito:** nenhum · **Arquivos alterados na pasta:** este e, a pedido do diretor em 24/09, os da cor da logo (ver `CHANGELOG.md`)

## Como este gate foi feito

- **Li a pasta inteira** na ordem do `PROMPT-DE-ABERTURA.md`: os 5 de `01-produto/`, o `03-design-system/` com as 8 folhas, o `04-dados/` com o `mocks.js` inteiro, o `06-prototipo/` com os 5 quadros do palco, os 28 de `07-decisoes/`, os 5 de `08-produto-real/` e as 16 pastas de `02-telas/`. O `_fontes-v1/` só foi consultado quando uma regra pedia contexto.
- **Abri as 105 referências de tela, uma a uma**: o PNG pra ver, o HTML pra medir. Cada tela teve um analista próprio, que registrou o que se vê em cada referência (bloco recolhido em cada tela, na parte 3). Um script conferiu a cobertura: 105/105.
- **Medi por programa o que dava pra medir**, sem confiar no olho:
  - o texto de cada HTML contra o `textos.md`;
  - toda cor e todo px das referências contra `tokens.css`;
  - o `indice.json` contra `estados.md` e `logica.md`;
  - as listas de peças contra o `componentes.md`;
  - e um **render das 105 referências no Chrome da máquina** (headless, 360 × 800, fonte de `05-recursos`), pra medir pé, alvo de toque, tamanho de texto, primários, lima, vermelho, faixa e transbordo.
- **Rodei o gate do mock** três vezes, em dois dias: a mesma saída todas as vezes. Ela está copiada na parte 2.
- **Cada item foi atacado por um segundo agente**, instruído a refutá-lo com os arquivos. Marcas: ✔ confirmado · ◐ parcial, com a correção do verificador logo abaixo · ✘ refutado (vai pro anexo B e sai das contas).
- **Um crítico de completude** procurou o que tinha ficado de fora e achou três lacunas: a cor da logo (resolvida em 24/09: decisão 28 e Lei 15), o voltar do sistema e o leitor de tela. Viraram as seções 4.7 a 4.9.
- **Nada foi instalado.** Rascunhos, scripts e medições ficaram fora da pasta. Além deste arquivo, só mudou o que o diretor pediu em 24/09 sobre a logo: o `fill` do `logo-mobs2.svg`, os dois PNG do login, a Lei 15, o `05-recursos/README.md`, a decisão 28 e o `CHANGELOG.md`.

**Os números do estudo:**
- 105/105 referências registradas;
- 16 telas com os 5 itens;
- **683 itens**: 529 das telas e 154 dos estudos transversais. Os 15 sobre a cor da logo saíram das contas, porque a decisão 28 os resolveu (4.7);
- **438 ✔ confirmados · 239 ◐ parciais · 6 ✘ refutados**;
- **gravidade**: alta impede construir fiel ou quebra regra; média pede decisão; baixa é documental e fica recolhida em blocos.

## Como ler

1. **O sumário, logo abaixo**: o que trava e o que eu preciso de você antes do C1.
2. **A parte 6**: as decisões numeradas, cada uma com o padrão que eu adotaria. É o que você responde.
3. **A parte 4.1**: os 24 achados transversais, que explicam de onde vêm as decisões.
4. O resto é consulta: cada tela (parte 3) e cada item com a prova (partes 4, 5 e 7).

## Sumário · o que eu preciso de você

**A pasta em uma frase:** o produto está desenhado de ponta a ponta e o mock é coerente consigo mesmo (o gate passa 68 de 68). Mas a referência, o mock e a documentação discordam entre si em centenas de pontos. Nada disso impede construir, desde que as decisões da parte 6 estejam tomadas, porque cada uma diz qual fonte ganha e onde a diferença fica registrada.

### Pra começar o C1, preciso de 9 respostas: G1 a G9

Um *vai* aceita os meus padrões nas nove.

| G | A pergunta | Meu padrão |
|---|---|---|
| G1 | Quando duas fontes discordam, quem ganha? | Cada uma no seu domínio: a referência na aparência, o `textos.md` no texto, o mock no valor. O documento que perde se corrige no mesmo ciclo, e a divergência vai pro CHANGELOG |
| G2 | A pasta não é repositório git, e o plano pede um commit por ciclo | `git init` na raiz no começo do C1, com o primeiro commit da pasta como está |
| G3 | Cerca de 30 medidas e 11 espaçamentos de letra das referências não têm token | O `tokens.css` é a norma; o `tokens.json` é corrigido (hoje guarda 0ms no movimento); os 3 duplicados saem; e os valores que faltam entram como bloco novo, **com o seu ok, porque o "95 tokens" muda** |
| G4 | Onde moram os ritmos dos processos, e quem define os 7 que faltam? | No `movimento.md` e num módulo só do app. Os que faltam eu proponho no gate do ciclo de cada tela |
| G5 | A lei manda Lucide, e os ícones aprovados são desenhados à mão | `lucide-react` com o traço dos tokens. Cada forma que muda (7 de 40) fica registrada como desvio |
| G6 | Qual cópia da fonte Barlow? | Os woff2 de `05-recursos`, os mesmos das referências |
| G7 | Como o app lê o mock? | Import direto de `04-dados/`, sem copiar, com o objeto congelado. Formatação de número sem `Intl`. O gate ganha 49 checagens novas |
| G8 | A tela mostra um número que o mock não tem | Campo **aditivo** no mock, no ciclo da tela, com o gate conferindo. São 22 acréscimos, que levam o mock de 33 a 39 casos |
| G9 | O mock tem um valor e a referência mostra outro | O mock ganha no valor (ex.: firmware 2.3.5, não o `v4.2.1` da T13), com desvio nomeado |

### O que trava de verdade

Sem essas decisões, eu paro:

1. **Não há caminho de volta.** A pasta não é repositório (G2).
2. **O gate aprova sem proteger 6 telas.** Ele não confere nada da T01, T09, T10, T14, T15 e T16 (TX-11 → G7).
3. **A referência quebra a própria lei em 15 das 16 telas**: Lei 3, R-03, Leis 1, 4, 5, 6, 7, 10 e 11 (TX-1). Meu padrão é construir fiel e escrever a exceção na lei (G12, G24).
4. **Pelo menos 24 dos 50 estados não têm como nascer do mock**, e 22 dados que as telas mostram não estão no mock (TX-9, TX-10 → G8, G21).
5. **O mock já dá o herói como instalado hoje às 11:47**, e o protótipo refaz a instalação às 14:30. Sem regra, a Seção F homologaria com a prova da manhã (TX-12 → G22).
6. **O `componentes.md` conta linhas, não peças.** O C2 constrói 54 peças, não 114, e primário, link e botão de ícone nem têm linha (TX-3 → G10).

### O que está com outras pessoas

A cor da logo já está resolvida: a logo foi alinhada ao `--lima`, entraram a decisão 28 e a Lei 15, e os dois PNG do login foram substituídos (4.7).


- **Com o PM:**
  - R1 e R2: a assertiva 8 e a 4 da homologação, que só o mock resolve, e em comentário (COERENCIA-A6, A7);
  - o voltar do Android (TX-20);
  - "Sincronizar renova o acesso" (COERENCIA-A11);
  - o destino de "Solicitar correção de cadastro";
  - a instalação i-06, 9 dias em re-checagem de 24 h.
- **Com o diretor, a lista de vocabulário proibido (R3):** "CAN-BT" e "SIM" estão nos textos aprovados (TX-24).

### O que eu mudaria no plano (parte 8)

1. Cada tela entra **com os seus estados**, em vez de deixar os 50 pro C11.
2. O mock cresce com cada tela.
3. O C1 cria o repositório e a ferramenta de print a 2×.
4. O C2 constrói 54 peças.
5. A T05 vira dois ciclos.

O total continua em 15 ciclos, C0 a C14.

### Os números da versão, medidos

| Escrito | Medido | |
|---|---|---|
| 16 telas · 39 momentos · 50 estados · 105 referências · 107 histórias | igual | ✔ |
| 114 peças | 114 linhas; as folhas desenham 120 espécimes e 35 átomos; o C2 constrói 54 | ✘ no sentido |
| 95 tokens | 95 nomes, 3 declarados duas vezes; o `tokens.json` guarda 0ms nos 3 tempos | ✔ no número, ✘ no arquivo |
| 33 casos | 33 em `M.casos`; o `casos.md` tem 33 linhas, e só 29 são casos | ✔ no número, ✘ na lista |
| "23 cores" | 25 | ✘ |

---

## 1 · O produto em minhas palavras

**O problema.** A instalação que volta não é a que falhou: é a que **se declarou pronta e não funcionava**. Duas forças se somam.
- **O equipamento mente.** Aceita o comando, responde OK e não grava. A numeração de contadores tem buraco e muda por modelo. A letra do serial diz a família, não a variante.
- **O pagamento premia o errado.** O técnico terceirizado ganha por instalação *declarada* concluída, num checklist que se marcava à mão.

Com 1 a 4 instalações por técnico por mês, ninguém pega prática. E a falha aparece no mesmo dia, mas depois que ele saiu do pátio: o custo é a viagem repetida.

**O usuário.** Um técnico de campo sem nenhum conhecimento de protocolo. Trabalha embaixo de um ônibus, com uma mão no módulo e outra num Android de entrada de 360 × 800, de luva, no sol, muitas vezes sem rede, e cada instalação é quase a primeira. Ele precisa de **menos decisão, não de mais informação**. Cada tela responde uma pergunta de negócio (*é este o ônibus? o evento chegou?*), e quando algo falha, a mesma linha diz o que fazer.

**A tese.** O app não existe pra ele configurar melhor; existe **pra ninguém precisar acreditar na palavra dele**. Toda verificação vem pra antes de ele sair do veículo:
- a pré-checagem aprova o módulo antes de qualquer gravação;
- cada bloco gravado é relido;
- o ciclo dinâmico prova o que só fecha andando;
- o evento de teste prova que o servidor recebe;
- o autoteste prova que a configuração sobreviveu ao desligar;
- e o checklist só fecha com o que o sistema provou.

**A evidência é gerada, nunca digitada.**

**O que isso pede do protótipo.** Quem aprova precisa **ver a evidência nascendo**: a pré-checagem acendendo linha a linha, a faixa da sessão descendo quando ela aprova, o tambor rolando de 184.320 a 482.317, o prazo drenando, o autoteste assertiva por assertiva. Por isso a troca de tela é quase invisível (150ms, só o conteúdo), e os processos andam no ritmo de apresentação. O palco é só a moldura: o celular sempre roda código, e um estado é o próprio app montado pelo caso do mock.

**O que o estudo me ensinou sobre a pasta.** Ela é rica e, em grande parte, medida. Mas foi escrita em camadas: o v1, as rodadas do mock, as decisões e as referências da versão 2. Nem toda camada seguiu a seguinte. Três exemplos:
- o domínio ainda fala o nome antigo de duas telas;
- a lista de peças das fichas é a coluna invertida de outra tabela;
- e algumas referências foram desenhadas antes da lei que hoje as proíbe.

O trabalho de construir é, antes de tudo, **decidir qual camada ganha em cada ponto e registrar a diferença**. A parte 6 é exatamente isso.

---

## 2 · O censo medido

Cada número abaixo saiu de um comando rodado nos arquivos, não do que a documentação diz. **Onde os dois divergem, o medido vence**, e a divergência está na parte 4.

| O quê | Escrito | Medido | De onde saiu | |
|---|---|---|---|---|
| Telas | 16 | **16** | `02-telas/indice.json` · `itens` com `tipo: "tela"`; 16 pastas de `T01` a `T16` | ✔ |
| Momentos | 39 | **39** | `indice.json` · `tipo: "momento"`. Batem o `estados.md` de cada tela, a linha "Momentos · estados" de cada `tela.md` e a tabela de `02-telas/README.md` | ✔ |
| Estados | 50 | **50** | idem, `tipo: "estado"` | ✔ |
| Referências | 105 | **105 HTML + 105 PNG** | `indice.json`: `referencias: 105`, `itens.length` 105, ids únicos 105. `find 02-telas -path '*/referencias/*'` dá 212 arquivos = 210 + 2 `.DS_Store`. Nenhum caminho do índice falta, nenhum arquivo sobra | ✔ |
| Referências por tela | README | igual | T01 1·6·3 · T02 1·1·1 · T03 1·1·3 · T04 1·5·4 · T05 1·4·11 · T06 1·1·5 · T07 1·0·3 · T08 1·2·0 · T09 1·1·3 · T10 1·1·3 · T11 1·1·1 · T12 1·1·2 · T13 1·9·2 · T14 1·2·3 · T15 1·0·4 · T16 1·4·2 (tela · momentos · estados) | ✔ |
| PNG de tela | 360 × 800 | **720 × 1600** (2×) | `sips`. O render headless dos 105 HTML dá 360 × 800 em todos | ✔ |
| Histórias de usuário | 107 | **107** | `01-produto/historias.md` tem 107 linhas `HU-T`, e `dominio.md` §5 tem 107 linhas de tabela. Cada `tela.md` lista exatamente as HUs da sua tela (16/16) | ✔ |
| Peças do design system | 114 | **114 linhas** | `componentes.md` · folha 1: 1 · 2: 20 · 3: 3 · 4: 29 · 5: 17 · 6: 22 · 7: 18 · 8: 4 | ✔ no número · ✘ no conteúdo (TX-3) |
| Soma das listas de peças das 16 `tela.md` | — | **374** | cada `tela.md` é a inversão exata da coluna "Telas que usam" de `componentes.md` (16/16 idênticas) | ✘ (TX-2) |
| Tokens | 95 | **95 nomes únicos · 98 declarações** | no `:root` do `tokens.css`, `--poco-24`, `--poco-32` e `--poco-44` estão declarados duas vezes (linhas 95–97 e 103–104). O `tokens.json` tem as 95 chaves | ✔ no número · ✘ no arquivo (TX-6) |
| Cores | "23 cores" (`03-design-system/README.md:13`) | **25 hex** | `tokens.css`: 6 fundos + 7 bordas + 4 tintas + 4 fora de texto + 4 ação | ✘ (TX-6) |
| Transparências | 6 | **6** | `tokens.css`, linhas 45–50 | ✔ |
| Tamanhos de letra | 17 | **17 valores** em 18 tokens | 11 `--t-*` + 7 `--n-*`; `--n-unidade-p` e `--t-legenda` valem os dois 12px | ✔ |
| Folhas do design system | 8 | **8 PNG + 8 HTML** | `03-design-system/referencias/` | ✔ |
| Quadros do palco | 5 | **5 PNG + 5 HTML** | `06-prototipo/palco/referencias/` | ✔ |
| Decisões | 27 | **28** | `07-decisoes/` de 01 a 28, mais o README. A 28, *o lima da marca*, entrou em 24/09 | ✔ |
| Casos no mock | 33 | **33** chaves em `M.casos` | `node` sobre `mocks.js` (`window.M2CF_MOCKS`, 33 chaves de topo) | ✔ |
| Linhas de `casos.md` | — | **33 linhas, 29 casos** | 4 linhas não são casos (`i-01`, `ma-02`, `pac-uo-02` e `pac-uo-03` são ids de dado), e 4 casos ficam de fora (`sinal-aguardando-ciclo`, `modulo-com-pendencias`, `can-estatico-hodometro`, `pronto-para-fechar`) | ✘ (TX-10) |
| Estados com caso próprio | — | **30 de 50** | 30 apontam uma chave de `M.casos`. 20 nascem de um dado de topo (`credenciais`, `pacotes`, `filaSaida`, `secaoF`, `modelosAtivo`, `calibracao`, `instalacoes`, `checklist`) ou são "derivado do fluxo" (`T02/02`, `T04/09`, `T09/03`) | — |
| Casos citados pelas referências | — | **29 de 33** | os 4 de cima não são citados por nenhuma referência, nem pelo `indice.json` | — |
| `indice.json` × `estados.md` × `logica.md` | — | **105/105 batem** | "como se chega" e "caso" são idênticos nas três fontes | ✔ |
| `textos.md` × HTML | — | **105/105 idênticos** | o texto de cada HTML (nós de texto, na ordem, sem `svg`) contra os itens entre crases de `textos.md` | ✔ |
| Cores das referências | — | **24 dos 25 hex + 6 rgba, nenhuma solta no estilo** | varredura dos 105 HTML. Só o `--roxo-pressionado` (#4A2A80) não aparece, porque nenhuma referência desenha o pressionado. No pixel havia também o `#B8F23D` da logo, alinhado ao `--lima` em 24/09 (4.7) | ✔ |
| Medidas das referências fora de token | — | **~30 px + 11 letter-spacing** | varredura dos estilos inline (M5) | ✘ (TX-5) |
| Arquivos da pasta | — | **371** (+ 7 `.DS_Store`) | `find . -type f`. `06-prototipo/app/` só tem o `README.md`. Nenhum arquivo mudou durante o estudo: o `mocks.js` tem o mesmo sha1 nos dois dias | — |
| Repositório git | "um commit por ciclo" (`ciclos.md:114`) | **não é repositório** | `ls -la` na raiz, sem `.git` | ✘ (TX-19) |

### O gate do mock · `node 04-dados/gate-cobertura.js`

Rodado três vezes, em 23 e 24/09, sempre com a mesma saída e `exit 0`: **68 checagens, 68 OK, 0 falha.** `mocks.js` tem sha1 `32f66559…c7f2`, e `gate-cobertura.js`, `d276ad1d…be3ff`.

```
OK     empresa/UC/UO = 1·2·3
OK     ativos = 24 — 24
OK     módulos cadastrados = 20 — 20
OK     ativos sem módulo = 4 — a-07,a-08,a-15,a-23
OK     seriais fora do cadastro = 2 — M2C-0999,M2C-1042
OK     modelo sem driver v1 = 1 (VC07)
OK     VL06 nas 4 variantes + VL08
OK     todo módulo vinculado a exatamente 1 ativo
OK     modelosAtivo ≥ 3 — 3
OK     1 modelo de ativo SEM mapa de contadores
OK     todo ativo referencia modeloAtivoId válido
OK     presetsEvento com intervaloRastreamentoSeg — pe-urbano=30s pe-rodoviario=60s pe-maquina=120s
OK     todo modeloAtivo referencia preset válido
OK     identificadores: cartões + índices alocados
OK     divergência de identificador: zeros à esquerda E prefixo — zeros à esquerda · prefixo
OK     1 firmware fora da matriz — M2C-0451@2.4.1
OK     instalações = 13 — 13
OK     aprovadas puras = 6 — 6
OK     aguardando validação puras = 2 — 2
OK     falha de recebimento reconhecida = 1
OK     aprovada após reprocessamento = 1
OK     reprovada = 1
OK     ressalvadas = 2 (1 aprovada + 1 aguardando) — i-03:aguardando-validacao · i-04:aprovada
OK     herói RKT-8H42 · VL06 CAN-BT · M2C-0417 · aprovado, história completa
OK     dias distintos com intervenção ≥ 12 — 13 dias: 0,1,2,4,6,9,13,17,22,27,33,39,44
OK     span ≥ 45 dias corridos — 45 (2026-01-27 → 2026-03-12)
OK     datas derivam do dia nominal (aritmética pura)
OK     pacotes em 3 idades = 1d · 4d · 8d — 1,4,8
OK     limiares no mock (aviso 3d · bloqueio 7d)
OK     fila: na fila = 3, tempos parados distintos — 14:28 · 14:12 · 11:30
OK     fila: enviando = 1 com progresso
OK     fila: recebidas = 4 com horário
OK     fila: erro-rede = 1, reenvio automático
OK     fila: erro-recusa = 1, reenvio manual com motivo
OK     Seção F em re-checagem é seção separada, não item
OK     ordem canônica dos 6 blocos — limpeza → ativo → cercas → leitor → eventos → conexao
OK     tabela de arraste do contrato
OK     cercas: 2 áreas × 2 = 4 regiões
OK     pool de índices esgotado nos DOIS limites
OK     caso: serial-nao-cadastrado
OK     caso: modelo-sem-driver
OK     caso: firmware-fora-matriz
OK     caso: conteudo-nao-cabe
OK     caso: pool-esgotado
OK     caso: ativo-fora-pacote
OK     caso: divergencia-chassi
OK     caso: conflito-pinos-resolvivel
OK     caso: conflito-pinos-sem-saida
OK     caso: can-fora-esperado
OK     caso: sinal-aguardando-ciclo
OK     caso: grandeza-indisponivel
OK     caso: diff-divergente
OK     caso: indice-nao-classificado
OK     caso: autoteste-falhando
OK     caso: sessao-interrompida
OK     caso: canal-aberto
OK     caso: identificador-divergente
OK     diff divergente cobre os 5 blocos
OK     casos apontam para ativos/módulos reais
OK     autoteste: 8 assertivas nomeadas
OK     C10: frota em todos os 24 ativos, únicas
OK     C10: chassiPelaCan declarado nos 3 modelos, 1 sim
OK     C10: leitor + leituraCan nos 3 modelos
OK     C10: casos de pinos com consumidores e meioAtual; ocupadoPor intacto
OK     C10: resolvível fala sem fio, sem saída não
OK     C10: divergência de chassi por dígitos transpostos, mesmo comprimento
OK     zero Math.random / Date.now / new Date no mocks.js (fora de comentário)
OK     zero hex no mocks.js (fora de comentário)

GATE APROVADO — todas as âncoras recomputadas conferem
```

O gate aprova o que ele confere, mas **não confere tudo que as telas leem**. Ficam de fora:
- as `credenciais` (T01);
- a cadeia e a calibração (T09, T10);
- o `M.ciclo` e o `evento-sem-resposta` (T14);
- a fila como a T15 mostra;
- o autoteste de encerramento (T16);
- e 5 dos casos da T05 (`busca-vazia`, `conexao-falha`, `link-perdido`, `modulo-em-repouso` e `modulo-com-pendencias`).

Ele não lê 13 das 33 chaves de topo e só confere 18 dos 33 casos (TX-11).

---

## 3 · As 16 telas

Pra cada tela, os cinco itens que o prompt pede:
1. o que ela faz, numa frase minha;
2. as peças do design system que ela usa de fato. Conferi nas referências, não na lista da ficha, que está contaminada (TX-2);
3. cada estado e momento, montado a partir do dado, com a fonte no mock e se o dado confere;
4. cada movimento da `animacao.md` e como eu faria, com ⚠ quando ele contradiz o `movimento.md`;
5. o que pode dar errado.

Em blocos recolhidos ficam as medidas reais lidas no HTML e o que se vê em cada referência. Esse segundo bloco é o registro de que as 105 foram abertas.

### T01 · Login

**1 · O que ela faz.** É a porta do app. O técnico entra com usuário e senha e, se esqueceu, recupera o acesso sozinho em três passos: escolhe telefone ou e-mail, digita o código de seis dígitos contra o prazo e as tentativas, e cria a senha nova vendo as seis regras marcarem. Termina num aviso que diz que os outros aparelhos saíram da conta.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema sem sessão* · *barra do sistema sob o véu* · *a marca no login* · *campo* · *campo focado* · *checkbox* · *duas ações* · *falha* · *segmentado* · *código · seis células* · *código errado* · *link dentro do conteúdo* · *folha* · *folha com opções* · *linha de opção* · *requisitos da senha* · *diálogo sem saída*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: diálogo (na folha é o Sair da conta, da T04) · diálogo com ciência (na folha é A Seção F não passou, da T13) · seção aberta do checklist · seção recolhida · linha do histórico · linha de garagem · linha de garagem · a atual · a lista de garagens · cadeia concluída · cadeia recusada · encerrando · pede o corte · sem homologar · lista com contagem.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - Botões só de ícone: o olho Mostrar a senha e o X Fechar. Estão desenhados na folha 6 com o rótulo 'botões só de ícone', mas não têm linha em componentes.md — *00, 01 (olho), 04 (X)* · 44×44; ícone 20; olho com traço 1.8 #6E6683, X com 2.2 #A9A2BC; margin-right −6 no olho e −10 no X
  - Primário e link com os estados de toque. A folha 1 desenha 'primário · normal / pressionado / desabilitado' e 'link · normal e pressionado', mas nada disso tem linha em componentes.md — *todas menos a 04* · primário 56, raio 4, #402070, texto 17/700 #AAEF00; pressionado #4A2A80 e scale 0.98; link 48, 15/500 …
  - Cartão de canal (MENSAGEM / E-MAIL): poço alto que cresce até ocupar a sobra, com rótulo e contato centrados e traço lima quando escolhido. O mais parecido é 'bloco escolhido' (T05), e não … — *02* · flex-grow, gap 10, sem padding, gap interno 6; rótulo 11/700 ls 1.4; valor 26/700 no telefone e 18/700 …
  - Cartão do prazo e das tentativas (VALE POR 9:41 · TENTATIVAS RESTANTES 2/0 · O CÓDIGO EXPIROU 0:00). Não é o 'cronômetro' da folha 5, que é outro desenho: cartão #1A1726, número de 62px e … — *03, 05, 06, 07* · poço com padding 16, gap 4; rótulo 10/700 ls 1.5; número 48/700 ls −1.6 lh 1 (--n-destaque); 98px de alto …
  - Linha 'Código conferido · 482913', com check solto e sem poço — *08* · 44 de alto, gap 10; check de 15px com traço 2.2 lima; texto 13/500 #867E9A; valor 14/700 #A9A2BC
  - Campo da senha nova sem rótulo e sem olho, com o texto à vista. Não é o 'campo' (54px, rótulo em cima) nem o 'campo focado' — *08* · 58 de alto, padding 0 14, texto 20/700, border-bottom 2px #AAEF00
  - Legendas soltas no conteúdo: 'O acesso vale por 7 dias…' e a linha dupla 'Vale por 10 minutos · resta 1 envio nesta hora'. Não são a peça 'com legenda' da folha 2, que fica dentro do … — *00, 01, 02, e 03/05/06/07 (Pode pedir…)* · 12px, #867E9A (a dupla tem o lado direito 12/700 #A9A2BC); ficam a 20 ou 22px do primário (padding 8 ou 6 + …

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | Semente sem sessão: campo = M.credenciais.usuario; senha = senha.length pontos; foco na senha; checkbox false; legenda com validadeDias; h1 oculto 'Entrar' para o leitor de tela. | M.credenciais.usuario ('r.vieira') · M.credenciais.senha.length (14 = 14 pontos, conferido com node) · M.situacao.sessaoAcesso.validadeDias (7) · … | confere |
| `01-estado-usuario-ou-senha-incorretos` | estado | Coluna do palco: o app da 00 com senha = '' e o aviso de falha ligado. Nasce da regra do Entrar (senha com menos de 8 caracteres, logica.md:20) aplicada a M.credenciais. Não tem chave em M.casos. | M.credenciais.usuario; a regra de 8 caracteres de logica.md:20 / tela.md:15; nenhum caso | confere |
| `02-momento-recuperar-escolher-canal` | momento | Telefone = M.credenciais.contato.telefone.numero passado pela máscara de M.ddis (+55); e-mail = contato.email; 10 = limites.validadeMin; 1 = tetoPorHora − reenviosNaHora; canal escolhido de entrada = telefone. | M.credenciais.contato.{email, telefone.ddi, telefone.numero} · M.ddis[+55].mascara '(##) #####-####' · … | confere |
| `03-momento-recuperar-digitar-codigo` | momento | Células = recuperacao.codigo, e a quantidade = codigo.length. Prazo e reenvio contam em estado de componente, a partir de validadeMin×60 e de reenvioSeg. | M.credenciais.recuperacao.{codigo '482913', limites.validadeMin 10, limites.reenvioSeg 60, limites.tetoPorHora 3, reenviosNaHora 2} | **não confere** — 9:41 e 44 s não estão no mock e não saem de regra nenhuma. 9:41 dá 19 s decorridos; 44 s dá 16 s. São dois relógios diferentes no mesmo instante. O '44' só escapou da … |
| `04-momento-nao-recebi-o-codigo` | momento | Folha com opções por cima da 03. Telefone e e-mail vêm do contato; os segundos vêm do mesmo estado de componente do reenvio. | M.credenciais.contato · M.ddis[+55].mascara · limites.reenvioSeg | **não confere** — Os 44 s são inventados, como na 03. Na área acima da folha o PNG só tem 2 cores (#08070C e #09070D): a 03 não aparece por baixo. Na T04/05-momento-folha-conta a mesma … |
| `05-momento-codigo-errado` | momento | Depois de 1 erro: tentativas − 1 = 2. As células mostram o que foi digitado, e o prazo segue do estado de componente. | M.credenciais.recuperacao.limites.tentativas (3) · recuperacao.codigo (para comparar) · a entrada do técnico (482911) | **não confere** — O 2 deriva. 9:28 (32 s decorridos) e 44 s não derivam, e o reenvio ficou parado em 44 s enquanto o prazo andou 13 s. O título vira a falha (R-03). Células 287→278 e … |
| `06-estado-codigo-expirado` | estado | Coluna do palco: prazo = 0 (validadeMin esgotado), células limpas, o primário vira o reenvio e o restante = teto − reenvios. | M.credenciais.recuperacao.limites.validadeMin · limites.tetoPorHora · recuperacao.reenviosNaHora | confere |
| `07-estado-tentativas-esgotadas` | estado | Coluna do palco: tentativas − 3 = 0, o código morre e o reenvio fica liberado. As células mostram o último código errado. | M.credenciais.recuperacao.limites.tentativas · limites.tetoPorHora · recuperacao.reenviosNaHora | **não confere** — O 0 e o 1 derivam. O código 482911 nas células não existe no mock, e aberto pela coluna ('parado e sem toque', palco.md:35) não há de onde tirar. 'Pode pedir outro … |
| `08-momento-recuperar-nova-senha` | momento | Código = recuperacao.codigo. Senha = recuperacao.novaSenha. Cada requisito é avaliado por regra sobre o texto; o sexto fica pendente, porque não dá pra conferir no aparelho (mocks.js:1036). | M.credenciais.recuperacao.{codigo, novaSenha 'Garagem!Ibura27'} · M.credenciais.usuario (para o requisito 5) | confere |
| `09-momento-senha-alterada` | momento | Diálogo sem saída por cima da 08, quando Salvar e entrar é aceito. | não usa dado (texto fixo de textos.md) | confere |

**4 · Cada movimento.**

- **campo em foco** — Um ::after absoluto de 2px em --lima sobre a borda de baixo, com transform-origin à esquerda e transform scaleX(0→1) em var(--mov-rapido) var(--mov-curva). Dispara no foco do … ⚠ Os tokens batem. Mas a referência faz o foco trocando a borda de 1px por 2px (00-tela.html, SENHA), e isso tira 1px da caixa; o traço tem que ficar sobreposto, não …
- **aviso de erro** — opacity 0→1 em var(--mov-rapido) var(--mov-curva) quando o Entrar recusa. O aviso entra na coluna dos campos e ocupa a sobra do bloco da marca (flex-grow), que não se move. ⚠ Nenhum. Provado por pixel entre 00 e 01: marca, campos e Entrar nas mesmas coordenadas.
- **célula do código** — A cada tecla, o dígito faz opacity 0→1. O traço lima sai da célula atual e acende na próxima por opacity, ou um traço único anda por translateX. Tudo sobre um input oculto com … ⚠ Os 100ms não são token (--mov-rapido é 150, --mov-padrao é 200) nem ritmo declarado de processo. movimento.md:24 só cita 100ms no 'solta' do pressionado, e também sem …
- **cronômetro do código** — Um intervalo de 1s em estado de componente; o texto troca no lugar, com tabular-nums e sem transição. Pausa quando a tela é aberta como estado na coluna. ⚠ O ritmo não está na tabela de processos de movimento.md:30-39, que não diz se 1s real vale 1s. Os valores de partida do PNG (9:41 e 44 s) não saem do mock (ver T01-V1).
- **requisitos da senha** — O check surge por opacity 0→1 em var(--mov-rapido) var(--mov-curva). O texto passa de --tinta-apagada para --tinta-secundaria por troca direta, ou por duas camadas cruzando a … ⚠ Viola movimento.md:43. 'Traço desenhado' é stroke-dashoffset e 'o texto clareia' é color, e nenhum dos dois é transform ou opacity. Além disso, 'o poço ganha o check' …
- **folha 'não recebi o código'** — O painel faz transform translateY(100%→0) em var(--mov-padrao) var(--mov-curva). O véu faz opacity 0→1 junto e cobre também a barra do sistema. Fecha em var(--mov-rapido). ⚠ Nenhum; bate com movimento.md:22.
- **diálogo 'senha alterada'** — opacity 0→1 e scale(0.98→1) em var(--mov-rapido) var(--mov-curva), com o véu junto. Dispara quando Salvar e entrar é aceito. ⚠ Nenhum; bate com movimento.md:23.

**5 · O que pode dar errado.**

- Remontagem herdada: o grupo das células e do cartão é centralizado na vertical (justify-content: center, 03-momento…html). Quando o cartão ganha uma linha na 05/07, tudo pula 9px. Fiel ao PNG, viola a Lei 3; 'corrigido', não …
- O executor copiar 9:41 e 44 s pro componente, porque o PNG mostra assim. São números inventados e inconsistentes entre si. O certo é contar a partir de validadeMin e reenvioSeg, em estado de componente, sem Date.now.
- O cronômetro seguir rodando num estado aberto pela coluna, que tem que ficar parado e sem toque. A 06 tem que montar direto em 0:00, sem contar até lá.
- Usar type=password: o navegador desenha os pontos com outra forma e outro espaçamento. A referência usa texto com letter-spacing de 2px. Além disso, o formulário de login pode acionar o autopreenchimento e o 'salvar senha' do …
- Focar a senha na abertura (00) abre o teclado virtual no modo de janela estreita (palco.md:41) e cobre o rodapé.
- Construir o foco como border-bottom de 2px, como está no HTML: mexe 1px no conteúdo e não deixa animar por scaleX.
- As células do código são spans na referência. Sem um input oculto de verdade, o toque e o teclado numérico não funcionam no celular, e o leitor de tela não lê o código.
- A folha 04 e o diálogo 09 vão mostrar a 03 e a 08 a 28% atrás do véu, e a referência mostra um fundo liso. A comparação de print vai acusar diferença, e a tentação é esconder a tela de baixo.
- lucide-react tem traçados diferentes dos ícones desenhados à mão nas referências (olho, girar, envelope, pessoa, X, check, chevron): diferença de pixel garantida.

<details><summary>Medidas reais lidas no HTML · 19 peças</summary>

| Peça | Medida |
|---|---|
| tela | 360×800, fundo #0F0D14 (--fundo-pagina), tabular-nums |
| barra do sistema | 30 de alto, padding 0 14 0 18, relógio 14/500 #F2F0F7 ls 0.1; sem fundo (a cor da … |
| conteúdo | no login, padding 0 20; na recuperação, padding 36 20 0 20 com gap 18 entre os blocos |
| marca | padding-top 177 (30 + 177 = 207 do topo); logo de 196px de largura; gap 18; CONFIGURADOR … |
| campo (USUÁRIO) | rótulo 11/700 ls 1.4 #A9A2BC, gap 6; poço de 54 (não 48), padding 0 14, texto 17/600; … |
| campo focado (SENHA) | rótulo #AAEF00; border-bottom 2px #AAEF00; 54 de alto; olho 44×44 com ícone 20 e traço … |
| checkbox | linha de 48 no mínimo; poço de 24; gap 12; texto 14/500 #C9C3DA lh 1.4 |
| legenda do login | 12/500 #867E9A, padding 14 em cima e 8 embaixo, centrada; fica a 22 do primário |
| rodapé | padding 14 20 28 20, gap 6; primário 56, raio 4, #402070, texto 17/700 #AAEF00; link 48 … |
| aviso de falha (01) | caixa de poço com padding 10 12, gap 12, border-bottom 2px #E06A5A, margin-bottom 4; … |
| cabeçalho de passo + segmentado | rótulo 11/700 ls 1.4; contador 13/700 com 'de 3' em #867E9A; segmentos: atual 8px … |
| título de processo | 28/700 ls −0.4 lh 1.15 (--t-titulo-proc) |
| cartões de canal | flex-grow, gap 10, poço; escolhido com border-bottom 2px lima e rótulo 11px lima; valor … |
| células do código | 6 com flex-grow, gap 6, 58 de alto, dígito 28/700; a ativa com border-bottom 2px lima; … |
| cartão do prazo/tentativas | poço com padding 16, gap 4; rótulo 10/700 ls 1.5; número 48/700 ls −1.6 lh 1; nas 05/07, … |
| link dentro do conteúdo | 44 de alto, 14/600 #C9C3DA, sublinhado #4A4166 com offset 4 |
| folha (04) | #16131D, borda de cima 1px #332C49, padding 18 16 32 16, gap 14; puxador 36×4 #3A3350 … |
| requisitos da senha (08) | linhas de 40, gap 10; check 16 com traço 2.2 lima, sem poço; texto 14/500 #A9A2BC quando … |
| diálogo (09) | #16131D, borda 1px #332C49, raio 4, padding 20 18 12 18, gap 12; título 20/700 sem ls; … |

</details>

<details><summary>O que se vê em cada uma das 10 referências</summary>

- `00-tela` — Login com a marca mobs2 lima presa no alto e CONFIGURADOR entre traços; USUÁRIO r.vieira; SENHA focada em lima com 14 pontos e o olho; Lembrar meu usuário desmarcado; a legenda dos 7 dias; Entrar (roxo com …
- `01-estado-usuario-ou-senha-incorretos` — O mesmo login com o aviso vermelho acima dos campos: poço com X, USUÁRIO OU SENHA INCORRETOS, 'Confira os dois e entre de novo.'. A senha está vazia e ainda focada. Marca e campos ficam nas mesmas coordenadas …
- `02-momento-recuperar-escolher-canal` — RECUPERAR ACESSO 1 de 3 com o primeiro segmento branco; título 'Para onde mandamos o código?'; dois cartões-poço altos, MENSAGEM (81) 98715-8675 escolhido com traço lima e E-MAIL r.vieira@atlsul.com.br …
- `03-momento-recuperar-digitar-codigo` — Passo 2 de 3 (1º segmento lima apagado, 2º branco); 'Mandamos para (81) 98715-8675'; 'Digite o código'; seis células 4 8 2 9 1 3 com o traço lima na sexta; cartão VALE POR 9:41; 'Pode pedir de novo em 44 s · …
- `04-momento-nao-recebi-o-codigo` — Folha 'Não recebi o código' presa ao pé, sobre véu escuro, com a barra do sistema escurecida; puxador e X; cartão com três linhas de opção: Conferir e reenviar ((81) 98715-8675 · pode pedir em 44 s), Mandar …
- `05-momento-codigo-errado` — Passo 2 com o título trocado para 'Código não confere'; células 4 8 2 9 1 1 com traço vermelho; cartão com TENTATIVAS RESTANTES em vermelho, 2 grande, 'na terceira, o código expira' e traço vermelho; 'Ainda …
- `06-estado-codigo-expirado` — Passo 2 com 'Digite o código'; células vazias com o traço lima ainda na sexta; cartão 'O CÓDIGO EXPIROU' com rótulo cinza e 0:00 vermelho; 'Peça um código novo · resta 1 envio nesta hora'; Enviar outro …
- `07-estado-tentativas-esgotadas` — Igual à 05, mas com 0 tentativas, 'o código expirou — peça um novo', 'Pode pedir outro agora · resta 1 envio nesta hora' e Enviar outro código. Título 'Código não confere'.
- `08-momento-recuperar-nova-senha` — Passo 3 de 3 (dois segmentos lima apagado, o 3º branco); 'Os seis itens marcam sozinhos'; 'Crie a nova senha'; linha 'Código conferido 482913' com check solto; campo sem rótulo, focado, com Garagem!Ibura27 à …
- `09-momento-senha-alterada` — Diálogo 'Senha alterada' centrado sobre o véu, com a barra do sistema escurecida; a frase dos outros aparelhos; um primário só, 'Entrar com a senha nova', e nenhum X. Atrás do véu não há nada.

</details>

**Histórias sem referência:** **HU-T01-2** — Nenhuma referência mostra 'com sessão válida e sem rede, abre direto na home'. É roteamento, e a semente abre sempre no login (logica.md:20), embora o mock nasça com sessaoAcesso aberta há 5 dias. · **HU-T01-3 (parcial)** — A 00/01 só mostra o checkbox desmarcado. Não há referência do marcado nem do 'limpável no campo' (não há X no campo de usuário). · **HU-T01-4** — Nenhuma referência mostra outro usuário descartando a sessão anterior e preservando a fila. · **HU-T01-5 (parcial)** — A 02 mostra a escolha do canal, mas nada mostra a 'validação local antes de gastar rede': os contatos já vêm do cadastro e não há o que validar. · **HU-T01-6** — Nenhuma referência tem seletor de DDI nem o aviso de máscara reaplicada. M.ddis, com 3 países, não é usado por nenhuma tela; só a máscara do +55 aparece aplicada. · **HU-T01-7 (parcial)** — Aparecem 6 dígitos, 10 min, 3 tentativas e o reenvio. Não há referência do teto por hora atingido (0 envios), que o mock deixa alcançável num toque (mocks.js:1032-1034). · **HU-T01-9 (parcial)** — A 08 mostra só o quadro final, com cinco regras cumpridas. Falta o início com as seis visíveis e nenhuma marcada. · **HU-T01-11** — Nenhuma referência da T01 mostra isso. O aviso dos 7 dias mora na T04/05-momento-folha-conta ('ACESSO VENCE EM 2 dias · RESTAM 2 DE 7 DIAS', T04/textos.md:27). · **HU-T01-12** — Nenhuma referência da T01 mostra isso. O Sair mora na T04/06-momento-folha-conta-sair-com-sessao-aberta, e lá é um diálogo, não uma 'tela própria' (T04/textos.md:31).

---

### T02 · Selecionar contexto

**1 · O que ela faz.** O técnico escolhe numa lista, agrupada por UC, a garagem em que trabalha hoje. Cada linha mostra a idade do pacote e quantos ativos a garagem tem. Com uma escolhida, o botão manda sincronizar o pacote dela na T03.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema sem sessão* · *escolha numa lista* · *uma ação* · *campo de busca*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: linha do histórico · a lista de garagens · segmentado · a marca no login · campo · campo focado.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - primário desabilitado ('Escolha uma garagem'). Está desenhado na folha-1 (estados de toque · primário · desabilitado), mas componentes.md não tem linha pra ele: a folha 1 só tem 'falha' — *00-tela e 02-estado · 00-tela.html:65* · 56 de altura · raio 4 · fundo #1A1726 · borda 1 #2B2540 · texto 17/700 #867E9A
  - cabeçalho de entrada: rótulo de topo com a empresa e título de procedimento. Não tem linha em componentes.md: o 'cabeçalho do conteúdo' da folha-6 existe só com contador — *00, 01, 02 · 00-tela.html:25-28* · rótulo 11/700, letra 1,4, #A9A2BC · gap 4 · h1 28/700, letra −0,4, #F2F0F7
  - rótulo do grupo por UC e cartão-lista com várias linhas separadas por divisória recuada. A folha-3 desenha 'escolha numa lista' com uma linha só, sem rótulo de grupo e sem segunda linha — *00, 01, 02 · 00-tela.html:29-62* · rótulo 10/700, letra 1,5, #867E9A · gap 6 · cartão #1A1726, borda 1 #2B2540, raio 4, padding 0 12 · …
  - linha de garagem vencida: glifo traço no poço e nome em --tinta-apagada. O 'traço' está na folha-3 (glifos por natureza · não se aplica · vazio), mas não tem linha em componentes.md. A … — *00, 01, 02 · Pátio Caruaru · 00-tela.html:54-59* · traço 10×1 #332C49 no poço 26 · nome 16/600 #867E9A · sublinha em 2 linhas
  - linha de 72 pressionada. Não está desenhada. A 'linha tocável · normal e pressionada' da folha-1 é outra peça: 54 de altura, cartão avulso, círculo de 16, nome 15px — *nenhuma referência da T02 · folha-1-fundamentos.html …* · folha-1: 54 de altura, fundo #1E1A29 no toque

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | empresa.nome em caixa alta no rótulo. uos agrupadas por ucId, na ordem de ucs. Cada linha lê pacotes[uoId] (diasAtras, hora, limiares) pra frase da idade e contem.ativos pra contagem. Escolhido = nenhum. Primário desabilitado. | M.empresa.nome · M.ucs[uc-01,uc-02].nome · M.uos[uo-01..03].nome/ucId · M.pacotes[pac-uo-01: diasAtras 1, hora 07:10, contem.ativos 10 \| pac-uo-02: … | confere |
| `01-momento-escolhida` | momento | Tocar na linha uo-01 → contexto.uoId = 'uo-01'. O marcador vira o de escolhido (12 lima), o nome passa de --tinta-forte pra --tinta, e o primário habilita com 'Sincronizar ' + uos['uo-01'].nome. | M.uos[0] {id:'uo-01', nome:'Garagem Várzea'} + os mesmos de 00 | confere |
| `02-estado-lista-longa-com-busca` | estado | Não nasce de dado. O mock tem 3 UOs e o gate trava 1·2·3, então nenhum limiar dispara. Só se monta forçando 'busca visível' pela coluna do palco, com as mesmas três UOs. | nenhum caso em M.casos · M.uos (3) + M.pacotes, como na 00 · a condição 'garagens demais' não existe no mock | confere |

**4 · Cada movimento.**

- **marcador de escolha** — No toque que confirma a linha (click/pointerup): o quadrado lima entra com opacity 0→1 e transform scale(0.8)→scale(1), em var(--mov-rapido), com var(--mov-curva). O contorno … ⚠ Nenhum na linha em si. Faltam: a saída do marcador anterior quando se troca de garagem, e a troca de cor do nome (--tinta-forte → --tinta), que não pode animar porque …
- **botão primário** — Duas camadas de texto sobrepostas no mesmo lugar. A antiga faz opacity 1→0 e a nova 0→1, em var(--mov-rapido) com var(--mov-curva), disparadas quando contexto.uoId muda. O fundo … ⚠ A coluna Curva diz 'esmaece', que não é curva: movimento.md:12 só declara --mov-curva ou linear. A linha anima só o texto, e a mudança mais visível (desabilitado → …
- **lista filtrada** — A cada entrada no campo: as linhas que saem ficam fora do fluxo, como fantasmas absolutos, e fazem opacity 1→0. As que ficam fazem FLIP, com translateY da posição antiga até 0, … ⚠ 'As que ficam sobem' é mudança de layout. O FLIP respeita a letra (só transform), mas a altura do cartão e o sumiço do grupo pulam, e movimento.md:43 proíbe 'mover o …

**5 · O que pode dar errado.**

- Montar a linha com 'a lista de garagens' (folha-4/T04: poço 30, marcador 11, gap 12, sublinha #A9A2BC, 'ATIVOS/10' empilhado) em vez de 'escolha numa lista' (folha-3/T02: poço 26, marcador 12, gap 10, sublinha #867E9A, '10 …
- Reservar espaço pra busca na 00 pra cumprir a Lei 3: isso redesenha a 00. Não reservar deixa a lista pular 62px: é a referência, mas quebra a lei.
- Animar o background-color do primário ao habilitar: fura 'só transform e opacity'.
- Deixar Pátio Caruaru inerte: a T03/04-estado-pacote-vencido e o 'Trocar de garagem' dela perdem a porta pelo fluxo.
- Ler M.contextoAtivo (uo-01) como estado inicial: a T02 abriria com Várzea escolhida, divergindo da 00.
- Aplicar ao pé da letra 'Sincronizar Garagem X' (tela.md:16): sai 'Sincronizar Garagem Pátio Caruaru'.
- Digitar as frases de idade ('de ontem', 'de há 4 dias', 'vencido') como strings por UO, em vez de derivar de diasAtras e limiares na hora de montar (contrato.md:22).
- Corrigir 'pacote de há 4 dias' por gosto: quebra textos.md, que é norma.
- Pôr caixa alta com CSS text-transform: o DOM fica 'RMR – Recife' e a conferência textual contra textos.md falha. Também não trocar o travessão U+2013 por hífen.

<details><summary>Medidas reais lidas no HTML · 16 peças</summary>

| Peça | Medida |
|---|---|
| tela | 360×800 · fundo #0F0D14 (--fundo-pagina) · coluna flex |
| barra do sistema sem sessão | altura 30 · fundo #0F0D14 · padding 0 14 0 18 · relógio 14/500 #F2F0F7, letra 0,1 · … |
| área de conteúdo | padding 28 16 16 16 · gap 14 · começa em y=30 · folga até o rodapé 16 (--respiro) |
| cabeçalho | rótulo 11/700, letra 1,4, #A9A2BC (--t-rotulo-topo, --tinta-secundaria) · gap 4 · h1 … |
| rótulo do grupo UC | 10/700, letra 1,5, #867E9A (--t-rotulo-bloco, --tinta-apagada) · gap 6 até o cartão |
| cartão-lista | fundo #1A1726 · borda 1 #2B2540 · raio 4 · padding 0 12 · RMR y 141–287 (2 linhas) · … |
| linha de garagem (escolha numa lista) | altura 72 (--linha-escolha) · gap 10 · divisória 1 #241F33 embaixo da 1ª linha do cartão … |
| poço da linha | 26×26 (--poco-26) · fundo #0B0910 · topo #06050A · baixo #332C49 · lados #14111C · x … |
| marcador vazio / escolhido / traço | vazio 11×11, borda 1 #4A4166 (--marca-vazia) · escolhido 12×12 #AAEF00 · traço 10×1 … |
| linha escolhida (o que muda no momento) | marcador 11 vazado → 12 lima · nome #C9C3DA → #F2F0F7 · nenhuma coordenada muda |
| linha vencida (Pátio Caruaru) | nome #867E9A (--tinta-apagada) · sublinha em 2 linhas ('…antes de' / 'usar') dentro dos 72 |
| rodapé uma ação | padding 14 16 32 16 · borda de cima 1 #221D2E (--borda-rodape) · gap 6 · y 697–800 · … |
| primário desabilitado (00, 02) | 56 (--alvo-primario) · raio 4 · fundo #1A1726 · borda 1 #2B2540 · texto 17/700 #867E9A |
| primário habilitado (01) | 56 · raio 4 · fundo #402070 (--roxo), sem borda · texto 17/700 #AAEF00 · border-box, … |
| campo de busca (02) | 48 (--alvo-min) · padding 0 12 · gap 10 · desenho de poço (fundo #0B0910, bordas … |
| deslocamento no estado 02 | tudo abaixo do título desce 62 = 48 + gap 14: cartão RMR 141→203, cartão Agreste 319→381 … |

</details>

<details><summary>O que se vê em cada uma das 3 referências</summary>

- `00-tela` — Tela limpa, sem faixa. VIAÇÃO ATLÂNTICO SUL em cima de 'Onde você está hoje?'. Dois grupos: RMR – RECIFE (Várzea e Ibura num cartão) e AGRESTE – CARUARU (Pátio Caruaru apagado, com traço no poço e a frase …
- `01-momento-escolhida` — A mesma tela, pixel a pixel no lugar (as colunas de cor em x=40 são idênticas às da 00). Várzea ganha o quadrado lima cheio e o nome fica branco. O primário vira roxo com 'Sincronizar Garagem Várzea' em lima.
- `02-estado-lista-longa-com-busca` — As mesmas três garagens, nada escolhido, primário desabilitado. Um campo de busca de 48 ('Buscar garagem ou cidade') entra entre o título e a lista. Tudo abaixo do título desce 62px. A 'lista longa' cabe …

</details>

**Histórias sem referência:** **HU-T02-1** — Parcial. A 00 mostra UC/UO e a 02 mostra a busca vazia. Nenhuma referência mostra a escolha de empresa: a empresa aparece só como rótulo, e M.empresa é um objeto, não uma lista. Nenhuma mostra o … · **HU-T02-2** — Nenhuma referência da T02. Aparece só na T04: a tira 'GARAGEM VÁRZEA ⌄' e T04/07-momento-folha-trocar-de-garagem. · **HU-T02-3** — Nenhuma referência da T02. Aparece só em T04/09-estado-folha-trocar-de-garagem-com-modulo-conectado (diálogo 'Encerrar a sessão e trocar'). · **HU-T02-4** — Nenhuma referência da T02. Aparece só em T04/08-estado-folha-trocar-de-garagem-envio-em-andamento (aviso 'UMA EVIDÊNCIA ESTÁ SUBINDO', Ibura e Caruaru com traço).

---

### T03 · Sincronizar

**1 · O que ela faz.** Baixa, item a item, o pacote da garagem que o técnico escolheu e diz se ele serve: em dia, libera o menu; com 3 a 7 dias, avisa e deixa seguir; com mais de 7, trava a garagem até sincronizar. Se a rede cai no meio, guarda o que já baixou.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema sem sessão* · *processo correndo* · *uma ação* · *duas ações* · *lista com contagem* · *ainda não* · *falha* · *aviso* · *nota tracejada*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: com legenda · processo parado (a 01 usa o desenho da 'falha', glifo sem sinal; o 'processo parado' da folha 4 tem glifo xis) · linha do histórico · a lista de garagens · cadeia concluída · cadeia recusada · encerrando · pede o corte · sem homologar · a marca no login · campo · campo focado · linha de opção.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - Instrumento de progresso do download: poço com rótulo da seção (ATIVOS), número 40 com 'de 10', barra de 18 com preenchido --lima-faixa, marcas em 25/50/75% e marcador branco de 3px, … — *00* · poço 328 × 151,5 em y 123; barra 294 × 18 em y 214
  - Instrumento de concluído: poço 'BAIXADO AGORA' em lima, número 40 com 'de 16' (17px), frase 'o pacote vale por 7 dias', traço lima de 2px embaixo, sem barra — *02* · poço 328 × 123 em y 123
  - A barra de idade do pacote — o elemento-assinatura da tela: poço 'CARREGADO HÁ', número 40 com 'dias', barra de 14 com preenchido proporcional e traço do limite a 87,5%, legenda '0 · O … — *03, 04* · poço 328 × 142 (03) / 143 (04) em y 123; barra 294 × 14 em y 210
  - Linha do pacote: versão e carimbo ('pacote pct-uo01-2026-03-11 · 11/03 07:10'), 12px/500 --tinta-apagada, solta abaixo do bloco — *00, 01, 02, 03, 04* · 328 × 14; y 484,5 (00) · 401,5 (01) · 455,5 (02) · 366,5 (03) · 381,5 (04)
  - Cabeçalho de procedimento: rótulo de topo 11px/700 (nome da UO em caixa alta) + título 28px/700. A folha 6 só tem o cabeçalho 'com contador' (título 22, sem rótulo de topo) — *00, 01, 02, 03, 04* · 328 × 50 em y 58; gap 4
  - Glifos de estado 'agora' (quadrado 12 --tinta), 'ok' lima, 'sem sinal' vermelho e 'pausa' — desenhados na folha 3 (OS GLIFOS POR NATUREZA) mas sem linha em componentes.md — *00/01 (agora, ok), 02 (ok), 01 (sem sinal), 03 (pausa)* · ícone 16 (quadrado 12) em poço 26

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | Semente contextoAtivo uo-01 → pac-uo-01; processo andando item a item (Modelos → Ativos → Cartões, a única ordem compatível com o quadro) e congelado no item 9 de 16 pra foto; rótulo = nome da UO em caixa alta; total = soma de … | M.contextoAtivo.uoId → M.uos[uo-01].nome 'Garagem Várzea'; M.pacotes[pac-uo-01].contem {ativos 10, modelosAtivo 3, cartoes 3} (16 = soma), .data … | **não confere** — 'de 10', '3 de 3', '16', '11/03 07:10' conferem. '6' e '9' são o quadro do processo, sem regra que diga onde parar. 'faltam ~40 s' não tem fonte e contradiz os 4 s do … |
| `01-estado-falha-de-rede` | estado | Caso sync-falha-rede: abre o pacote do caso, anda até o tick de falha, para, guarda os baixados; a falha ocupa o lugar do poço; rodapé duas ações. Parado e sem toque na coluna. | M.casos['sync-falha-rede'] = {pacoteId: 'pac-uo-03', falhaNoTick: 4, motivo: 'O que já baixou fica guardado.'} (mocks.js:544) + M.pacotes[pac-uo-03] | **não confere** — O caso aponta pac-uo-03 (Pátio Caruaru, 6+3+3 = 12, 04/03 07:30), mas o PNG mostra Várzea, 'de 10' e 'pct-uo01-2026-03-11 · 11/03 07:10', que são do pac-uo-01. Tick 4 … |
| `02-momento-concluido` | momento | Fim do processo: total = soma de contem; carimbo novo = DIA_NOMINAL + HORA_NOMINAL; validade = limiares.bloqueioDias; 'Ir para o menu' → T04/01-momento-sem-modulo. | M.pacotes[pac-uo-01].contem {10, 3, 3} e .limiares.bloqueioDias 7; M.DIA_NOMINAL 2026-03-12; M.HORA_NOMINAL 14:30 | **não confere** — Números e carimbo conferem. Só a versão 'pct-uo01-2026-03-12' não tem fonte no mock (regra 'pct-' + uoId + data não é declarada). O carimbo 14:30 é a hora da baixa, e a … |
| `03-estado-pacote-de-4-dias` | estado | Não é chave de M.casos: nasce de M.pacotes[pac-uo-02] com contexto uo-02. diasAtras 4 ≥ avisoDias 3 e ≤ bloqueioDias 7 → aviso; barra = diasAtras / (bloqueioDias + 1); limite em bloqueioDias / (bloqueioDias + 1) = 87,5%. | M.pacotes[pac-uo-02] {diasAtras 4, data 2026-03-08, hora 06:55, limiares {3, 7}}; M.uos[uo-02].nome 'Garagem Ibura' | confere |
| `04-estado-pacote-vencido` | estado | Não é chave de M.casos: nasce de M.pacotes[pac-uo-03] com contexto uo-03. diasAtras 8 > bloqueioDias 7 → bloqueio: rótulo, limite e traço em vermelho, preenchido 100%, nota com contem.ativos. | M.pacotes[pac-uo-03] {diasAtras 8, data 2026-03-04, hora 07:30, contem.ativos 6, limiares {3, 7}}; M.uos[uo-03].nome 'Pátio Caruaru' | **não confere** — 8, 7, 6, 04/03 07:30 e o nome conferem. 'pct-uo03-2026-03-04' não existe no mock. O '8' da escala coincide com diasAtras, mas a regra não é declarada (na 03 ele também … |

**4 · Cada movimento.**

- **barra de download (a sincronização correndo · 4s · linear · reduzir: salta pro …** — transform: scaleX(baixados/total) no preenchido, com transform-origin à esquerda e transição linear de 250ms por item (4s ÷ 16), disparada a cada item. A borda --lima-borda de … ⚠ Os 4s valem: é ritmo declarado de processo (movimento.md:39). Mas: (1) 'salta pro fim' contradiz movimento.md:47 (o processo continua no mesmo ritmo, só sem movimento) …
- **contagem (cada bloco baixado · o número troca no lugar)** — Troca de texto no lugar a cada item, sem transição: o número 40, o valor da linha e '9 de 16 no total'. tabular-nums (tokens.css:125) segura a largura. No fim, o valor passa de … ⚠ Não viola. Mas 'bloco' colide com o termo de domínio (os 5 blocos da cadeia, dominio.md:58), e 'faltam ~40 s' não tem regra pra trocar a cada item.
- **check de concluído (fim do download · o traço do check se desenha · 150ms · …** — opacity 0→1 em --mov-rapido (150ms) com --mov-curva, no poço da linha cuja seção termina (Ativos e Cartões; Modelos já vem marcado na 00). Com reduzir movimento, a duração vira 0 … ⚠ 'O traço se desenha' pede stroke-dashoffset, que não é transform nem opacity: viola a própria animacao.md:11 e a movimento.md:43. A movimento.md:9 diz 'o check …

**5 · O que pode dar errado.**

- A 01 não passa nas duas conferências ao mesmo tempo: montada pelo caso (pac-uo-03) dá Pátio Caruaru e 12 itens, e montada pelo PNG contradiz o caso. Uma das duas regras do CLAUDE.md do protótipo (2: o estado vem do caso · 3: …
- A 00 é um quadro no meio do processo (item 9 de 16, dura 250ms). A foto só bate se o construtor tiver um jeito determinístico de congelar a sincronização no item 9. Sem isso, a comparação falha.
- 'faltam ~40 s' digitado no componente vira número inventado. Recalculado no ritmo de 4s, mostra ~2 s e diverge do textos.md.
- A passagem 00→02 mexe no layout: a barra some, a lista sobe 29px, trocam título e rodapé. Com só transform e opacity não dá pra animar isso. O risco é animar height/top ou dar um salto seco sem regra.
- scaleX no preenchido estica a borda lima de 1px e deixa o marcador branco parado se ninguém separar as camadas.
- Implementar 'salta pro fim' ao pé da letra, com reduzir movimento, pula o quadro da 00 e o tick da falha.
- Versão do pacote: não há campo no mock. Inventar a regra 'pct-…' no componente é valor solto; seguir o textos.md dá dois formatos (a 03 com 'pac-uo-02').
- A escala 0–8 fixa estoura com um pacote de 9 dias ou mais, e o limite a 87,5% só vale pra bloqueioDias 7.
- Erro de um dia no bloqueio (> 7 ou ≥ 7), repetido em T02, T03 e na folha de trocar garagem da T04.

<details><summary>Medidas reais lidas no HTML · 17 peças</summary>

| Peça | Medida |
|---|---|
| barra do sistema sem sessão | 360 × 30 · fundo #0F0D14 (--fundo-pagina) · padding 0 14 0 18 · hora 14px/500, letra 0,1 |
| área de conteúdo | padding 28 16 16 16 · gap 14 entre blocos · de y 30 a 697 (00, 02) ou 659 (01, 03, 04) |
| cabeçalho | rótulo 11px/700, letra 1,4, --tinta-secundaria + h1 28px/700, letra −0,4 … |
| poço de progresso (00) | fundo --poco · borda 1px (topo --poco-fundo, base --borda-poco, lados --poco-lado) · … |
| número de progresso | 40px/700, letra −1, line-height 1 (--n-progresso) · unidade 'de 10' 18px/500 … |
| barra de download | 294 × 18 · preenchido 60% --lima-faixa com borda direita 1px --lima-borda · marcas 1px a … |
| legenda da barra | 12px/600 --tinta-apagada, espalhada: '9 de 16 no total' ↔ 'faltam ~40 s' · y 240,5 |
| lista com contagem | cartão --fundo-cartao, borda 1px --borda, raio 4, padding 0 12 · 3 linhas de 58 com … |
| linha do pacote | 12px/500 --tinta-apagada · topo em y 484,5 (00) · 401,5 (01) · 455,5 (02) · 366,5 (03) · … |
| rodapé · processo correndo (00) | borda de cima --borda-rodape · padding 14 16 32 16 · botão 328 × 56, fundo … |
| falha (01) | bloco poço com padding 10 12, gap 12 · poço 26 com wi-fi cortado --vermelho, traço 2,2 · … |
| rodapé · duas ações (01, 03, 04) | padding 14 16 24 16 · primário 328 × 56 --roxo com texto --lima 17/700 · link de 48 … |
| poço de concluído (02) | padding 18 16 · gap 8 · rótulo --lima · 40 + 'de 16' a 17px · frase 13px/500 … |
| poço de idade (03, 04) | padding 18 16 · gap 8 · 40 + 'dias' a 17px · barra 294 × 14, preenchido 50% #332C49 (03) … |
| aviso (03) | bloco poço com padding 10 12, gap 12 · poço 26 com pausa --tinta-secundaria · rótulo … |
| nota tracejada (04) | --fundo-apagado · borda 1px tracejada --divisoria · raio 4 · padding 12 · gap 4 · rótulo … |
| Lei 3 · o que remonta entre 00 e cada estado | 1º bloco: 151,5 (00) → 69 (01) → 142 (03) → 143 (04). 2º bloco: lista em y 289 (00) → … |

</details>

<details><summary>O que se vê em cada uma das 5 referências</summary>

- `00-tela` — GARAGEM VÁRZEA · 'Baixando o pacote'; poço ATIVOS 6 de 10 com barra lima a 60% e marcas em quartos, '9 de 16 no total · faltam ~40 s'; lista: Ativos (quadrado branco) 6 de 10, Modelos de ativo (check lima) 3 …
- `01-estado-falha-de-rede` — Mesmo cabeçalho; no lugar do poço de progresso, uma falha: poço com wi-fi cortado vermelho, 'A BAIXA PAROU ONDE ESTAVA' em vermelho, 'Nada se perdeu. Ao reconectar, continua de onde parou.', traço vermelho …
- `02-momento-concluido` — Título 'Pacote de hoje'; poço 'BAIXADO AGORA' em lima, 16 de 16, 'o pacote vale por 7 dias', traço lima embaixo, sem barra; lista com três checks lima: Ativos 10, Modelos de ativo 3, Cartões 3; 'pacote …
- `03-estado-pacote-de-4-dias` — GARAGEM IBURA · 'Sincronizar'; poço 'CARREGADO HÁ 4 dias' com barra de 14 preenchida até a metade (cinza) e traço do limite a 87,5%, legenda '0 · O LIMITE É 7 DIAS · 8'; aviso cinza com glifo pausa 'PACOTE DE …
- `04-estado-pacote-vencido` — PÁTIO CARUARU · 'Sincronizar'; poço com 'CARREGADO HÁ' em vermelho, 8 dias, barra toda em vermelho-faixa, limite a 87,5%, 'O LIMITE É 7 DIAS' em vermelho, traço vermelho embaixo; nota tracejada 'ENQUANTO NÃO …

</details>

**Histórias sem referência:** **HU-T03-3 — A versão do manifesto é gravada em toda evidência** — Nenhuma referência mostra evidência com a versão gravada. A T03 só mostra a linha do pacote, e 'pct-' não aparece em nenhuma outra tela (grep -rln 'pct-' só acha as referências e o textos.md da … · **HU-T03-1 — só a parte 'sincronização é incremental por versão'** — Progresso, volume (9 de 16) e tempo (faltam ~40 s) aparecem na 00. Mas nenhuma referência mostra o incremental: nada diz o que já estava em dia e não baixou de novo, e o mock não tem versão pra …

---

### T04 · Menu

**1 · O que ela faz.** O menu é uma grade de 10 cartões em que cada ferramenta mostra se já pode ser usada ou do que depende. Em cima fica a tira com a garagem e as iniciais da conta, e logo abaixo a faixa da sessão. Tocar na garagem ou nas iniciais abre uma folha; tocar em Sair da conta ou trocar de garagem com sessão aberta abre um diálogo que pede confirmação.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema no menu* · *tira de contexto* · *o topo do menu inteiro* · *faixa no menu* · *faixa · sem sessão* · *faixa · módulo com falha* · *conectado* · *decide agora* · *disponível* · *espera* · *espera a rede* · *com pendência* · *contador no menu* · *folha* · *diálogo* · *a lista de garagens* · *linha de garagem · a atual* · *linha de garagem*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sem ação — nenhuma referência da T04 tem a faixa com serial e sem ENCERRAR; o 01 usa a faixa · sem sessão, que não está na lista · diálogo sem saída — os dois diálogos da T04 (06 e 09) têm primário + Cancelar · diálogo com ciência — nenhum checkbox na T04 · linha do histórico — é peça da T12; não aparece na T04 · a marca no login — é peça da T01; não aparece na T04 · campo — não há campo na T04 · campo focado — não há campo na T04.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - Aviso do 08 sem poço e sem glifo: uma caixa com fundo de poço, só o rótulo e a frase. Nenhuma linha de componentes.md tem esse desenho, e a peça 'aviso' da folha 4 tem poço de 26 com ícone … — *08 …* · padding 12/12 · gap 2 · rótulo 10/700 ls 1.5 #A9A2BC · frase 13/500 #C9C3DA lh 1.4 · sem poço
  - Cartão largo em espera: 'ATIVO SELECIONADO · nenhum', tracejado, fundo apagado, traço no poço. A folha 4 só desenha 'espera' no formato do cartão pequeno — *01 (01-momento-sem-modulo.html:50)* · 328×64 · poço 34 · traço 10×1 #332C49 · rótulo e valor #867E9A
  - 'decide agora' com poço 30 e ícone 18 no cartão Ativo. A folha 4 e o 01 desenham a mesma peça com poço 34 e ícone 20 — *02 (Ativo selecionado)* · poço 30 · ícone 18 · borda 1 #AAEF00 · valor 16/700 #AAEF00
  - Botão 'Sair da conta' da folha Conta. Não é o primário (56), nem o link (48), nem o 'botão secundário' (que tem fundo --elevado e é da T15). Só existe dentro do desenho da folha — *05 (05-momento-folha-conta.html:63)* · altura 52 · fundo #1A1726 · borda 1 #2B2540 · raio 4 · 15/700 #F2F0F7
  - Prazo do acesso (ACESSO VENCE EM · 2 dias · barra drenando · escala 0–7). Não tem peça própria; só aparece dentro do desenho da folha. É parecido com o cronômetro e o prazo cheio da T14, … — *05 (05-momento-folha-conta.html:49–60)* · caixa com fundo de poço, padding 14 · número 26/700 + 'dias' 14/500 · barra 14 de alto, preenchida 29% com …
  - Avatar com as iniciais (círculo, o único caso junto com o LED). Existe só dentro da tira e da folha, sem peça própria — *00 a 09 (tira); 05 (cartão da conta)* · tira: 32×32 raio 16 borda #3A3350 11/700 ls 1.4 #C9C3DA dentro de um alvo 44×44 · folha: 52×52 raio 26 …
  - Subtítulo de folha (uma linha 13px embaixo do título). A 'folha' desenhada na folha 2 (Conta) não tem subtítulo — *07 (07-momento-folha-trocar-de-garagem.html, 'Trocar …* · 13/500 #A9A2BC lh 1.45

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | A semente de logica.md:40 põe no estado único a sessão {modulo M2C-0417, ativo a-01 RKT-8H42}; M.situacao.sessaoConfiguracao é null no mock. Garagem vem de M.uos[contextoAtivo.uoId], iniciais de M.tecnico.nome. O contador da … | M.contextoAtivo.uoId→M.uos[0].nome 'Garagem Várzea'; M.tecnico.nome; M.ativos[a-01].{placa RKT-8H42, moduloSerial M2C-0417}; M.filaSaida (contador); … | **não confere** — O '2' não sai de nenhuma regra declarada. Na-fila dá 3, não recebidas dão 6, e só erros (f-09, f-10) ou não recebidas da Várzea (f-01, f-04) dão 2. O 06 diz 3 no mesmo … |
| `01-momento-sem-modulo` | momento | Estado único com sessao = nenhuma. Os cartões que dependem de módulo e ativo ficam em espera, com a causa; Conectar vira 'decide agora' | M.situacao.sessaoConfiguracao = null (bate); M.filaSaida (6 não recebidas: o contador deveria aparecer); M.situacao.rede = 'conectada' | **não confere** — Não há contador na fila, mas o mock tem 6 itens não recebidos. 'espera conexão' com a rede conectada. A faixa tem as linhas trocadas: a borda da tira termina antes da … |
| `02-momento-modulo-sem-ativo` | momento | Estado único com a sessão {modulo M2C-0417, ativo null} (a sessão nasce na pré-checagem aprovada, logica.md:16). Os cartões que dependem do ativo dizem 'espera ativo' | M.modulos[M2C-0417]; M.filaSaida; M.situacao.rede | **não confere** — Mesmo problema do 01: contador ausente com a fila cheia e 'espera conexão' com a rede conectada. O poço do 'decide agora' é 30 aqui e 34 no 01 |
| `03-estado-faixa-modulo-com-falha` | estado | 00 com a faixa trocada para 'módulo com falha'. Do caso, só o fato de que o link caiu. O serial sai da faixa | M.casos['link-perdido'] = {moduloSerial:'M2C-0312', ativoId:'a-03', naChecagem:6}; a-03 = PCX-9A17 | **não confere** — O caso é de outro módulo e de outro ônibus (M2C-0312 / PCX-9A17) e de outro momento: a queda na 6ª checagem da pré-checagem (T05/14), quando a sessão ainda não nasceu. … |
| `04-estado-checklist-pendente` | estado | 00 + contador = itens do checklist ainda não resolvidos (seções B e E), a mesma conta da T13/00 'Faltam 10 itens' | M.checklist.itens (31: A4 B5 C4 D10 E5 F3) → B+E = 10. 'checklist' não é chave de M.casos: é dado de topo | **não confere** — O 10 deriva (B 5 + E 5 = 10), mas por uma regra que só a T13/00 deixa ver, sem declaração. Nada no mock separa o 00 (sem contador) do 04 (com 10): as duas usam a mesma … |
| `05-momento-folha-conta` | momento | Tocar em RV abre a folha sobre o menu. Restam = validadeDias − abertaDiasAtras; preenchido = restam/validade; fica vermelho porque abertaDiasAtras ≥ avisoNoDia | M.tecnico.nome; M.credenciais.usuario 'r.vieira'; M.empresa.nome; M.situacao.sessaoAcesso {abertaDiasAtras 5, validadeDias 7, avisoNoDia 5} → 2 de … | confere |
| `06-momento-folha-conta-sair-com-sessao-aberta` | momento | 'Sair da conta' na folha Conta, com sessão ou fila, abre o diálogo. O número = itens na-fila, a sessão = a do estado único | M.filaSaida estado 'na-fila' = 3 (f-01, f-02, f-03); herói M2C-0417 | confere |
| `07-momento-folha-trocar-de-garagem` | momento | Tocar no nome da garagem abre a folha. Uma linha por UO, atual = contextoAtivo.uoId. Idade e hora vêm do pacote; fica travada se diasAtras > bloqueioDias; ATIVOS = pacote.contem.ativos | M.uos (3); M.pacotes: pac-uo-01 diasAtras 1 às 07:10 com 10, pac-uo-02 com 4 e 8, pac-uo-03 com 8 e 6; limiares.bloqueioDias 7; confere com M.ativos … | confere |
| `08-estado-folha-trocar-de-garagem-envio-em-andamento` | estado | Folha aberta com a fila tendo 1 item 'enviando'. Toda garagem que não é a atual fica travada com 'espera o envio terminar'; Caruaru mantém o motivo do pacote | M.filaSaida estado 'enviando' = 1 (f-04, 'Evidências da instalação', 62%) → 'UMA EVIDÊNCIA'; M.uos; M.pacotes. 'filaSaida' não é chave de M.casos | confere |
| `09-estado-folha-trocar-de-garagem-com-modulo-conectado` | estado | Derivado do fluxo: com a sessão aberta, tocar noutra garagem na folha abre o diálogo. Não nasce de dado do mock: a sessão é da semente, no estado único | Nenhuma chave no mock; o M2C-0417 vem da sessão do estado único (herói do contrato.md:10) | confere |

**4 · Cada movimento.**

- **entre telas (animacao.md:3): o conteúdo esmaece 150ms, a barra e a faixa ficam …** — opacity 0→1 na camada de conteúdo, var(--mov-rapido) com var(--mov-curva), ao trocar de tela; barra e faixa fora da camada ⚠ Inviável na T04. Aqui a barra é #0B0910, a tira ocupa 30–82 e a faixa tem 50px em 82–132. Na T07 e na T15 a barra é #16131D e a faixa tem 52px em 30–82. Na troca T04 ↔ …
- **faixa de sessão · a sessão abre · desce de cima (translateY −100%→0) e o …** — transform translateY(−100%→0) na faixa, var(--mov-padrao) com var(--mov-curva); com reduzir movimento, aparece ⚠ Viola a regra. O gatilho (fim da pré-checagem) acontece na T05, não na T04. Na T04 a faixa existe sempre, no mesmo slot de 50 (o 01 mostra 'Sem sessão de …
- **contador da fila e do checklist · o número muda · troca no lugar, sem pular** — Troca do texto sem transição, dentro da caixa min-width 20 × 20 que não empurra nada (o poço fica à esquerda, com space-between) ⚠ Sem violação. Mas não há gatilho: o mock é estático (f-04 parado em 62%) e movimento.md não declara ritmo para a fila. Também não está definido o que acontece quando o …
- **folhas · tocar na garagem ou nas iniciais · o painel sobe de baixo e o véu …** — transform translateY(100%→0) no painel e opacity 0→1 no véu, var(--mov-padrao) com var(--mov-curva); fecha com translateY(0→100%) em var(--mov-rapido); com reduzir movimento, … ⚠ Conforme movimento.md:22. Falta a linha do diálogo (06 e 09), que movimento.md:23 cobre: esmaece e cresce de 98% a 100% em var(--mov-rapido). Se o envio terminar com a …
- **cartão liberado · o módulo conecta · o poço ganha cor e o texto de espera some …** — Duas camadas empilhadas no cartão (espera e disponível) com crossfade de opacity em var(--mov-rapido) e var(--mov-curva); com reduzir movimento, troca direta ⚠ Gatilho errado: quando o módulo conecta, só Conectar e Ativo mudam; os seis cartões seguem em 'espera ativo' (02) e só liberam quando o ativo é escolhido. Conectar e …

**5 · O que pode dar errado.**

- Digitar o '2' do contador como literal no componente: é número inventado, sem regra, e o gate de cobertura não confere a T04.
- Montar o T04/03 pelo caso link-perdido leva M2C-0312 / PCX-9A17 para a tela, e ela deixa de bater com o PNG. Montar com o herói ignora o caso.
- Copiar o border-bottom de 2px dentro dos 50px da faixa faz o conteúdo pular 1px no estado de falha, contra a Lei 3.
- O véu sobre o menu real mostra cartões e faixa a 28%. A comparação do C5 contra os PNGs 05–09, que têm véu sobre página vazia, vai acusar diferença.
- Implementar a 'faixa desce' no menu mexe o layout e anima a entrada; implementar o 'cartão liberado' ao voltar ao menu também anima a entrada.
- A transição T04 ↔ ferramenta não tem como deixar a faixa parada: ela troca de y (82→30), de altura (50→52) e a barra troca de cor.
- A folha de trocar de garagem, pelo dado, sempre cai no 08, porque f-04 está sempre enviando. O 07 e o 09 viram inalcançáveis, ou então se contradiz o mock.
- A T12 fica inalcançável pelo menu, porque o cartão Últimas instalações está travado em todas as referências.
- Faltam tokens para barra 30, tira 52, cartão 108, traço 9, marcador 3, marcas 5 e 8, folha 430, padding 18, letra 18 e letter-spacing. O executor tende a pôr valor solto (Lei 13) ou a usar um token de outra semântica (--poco-30, …

<details><summary>Medidas reais lidas no HTML · 17 peças</summary>

| Peça | Medida |
|---|---|
| tela | 360×800, fundo #0F0D14 (--fundo-pagina), coluna flex |
| barra do sistema no menu | altura 30 (sem token próprio), fundo #0B0910 (--poco, o mesmo da tira), padding 0 14 0 … |
| tira de contexto | altura 52 (sem token; coincide com --faixa-sessao), padding 0 12 0 16; botão da garagem … |
| faixa no menu | 50 (--faixa-sessao-menu), fundo #16131D, borda de cima 1 #221D2E, padding 0 16; LED 8 … |
| faixa · módulo com falha (onde o estado muda) | + border-bottom 2 #E06A5A dentro dos 50; LED #E06A5A; 'Módulo com falha' 16/700 ls 0.2 … |
| faixa · sem sessão (01) | 50, LED #4E475E, 'Sem sessão de configuração' 14/600 ls 0.2 #867E9A, sem ENCERRAR; fora … |
| grade | padding 14 16 24 16 · 2 colunas de 159 · gap 10 · começa em y 147; cartões em 147–211, … |
| cartão largo (conectado) | 328×64, fundo #1A1726, borda 1 #2B2540, raio 4, padding 14 12, gap 12; poço 30 com ícone … |
| decide agora / espera largo (01) | borda 1 #AAEF00 (decide) ou tracejada #241F33 com fundo #131019 (espera); poço 34 com … |
| cartão pequeno (disponível) | 159×108 (min-height 108, sem token), padding 12, gap 8, space-between; poço 30; nome … |
| cartão espera / espera a rede | fundo #131019 (--fundo-apagado), borda 1 #241F33 tracejada; poço com traço 10×1 #332C49 … |
| contador no menu / com pendência | min-width 20 × 20, padding 0 6, raio 4, fundo #3A3350 (--borda-neutra), 12/700 #F2F0F7, … |
| véu | rgba(6,5,10,.72) sobre a página vazia, cor medida #09070D; começa embaixo da tira (y … |
| folha Conta | fundo #16131D, borda de cima 1 #332C49, padding 18 16 32 16, gap 14, min-height 430 (sem … |
| diálogo | véu com padding 0 20, caixa #16131D, borda 1 #332C49, raio 4, padding 20 18 12 18, gap … |
| folha Trocar de garagem · a lista de garagens | gap 12 (a folha Conta usa 14); subtítulo 13/500 #A9A2BC; lista fundo #1A1726 borda … |
| aviso do 08 (onde o estado muda) | caixa com fundo de poço, padding 12 12, gap 2, rótulo 10/700 ls 1.5 #A9A2BC, frase … |

</details>

<details><summary>O que se vê em cada uma das 10 referências</summary>

- `00-tela` — Tira GARAGEM VÁRZEA ˅ + RV. Faixa com LED lima, M2C-0417 \| RKT-8H42 e ENCERRAR. Dois cartões largos conectados (M2C-0417, RKT-8H42) e oito pequenos: sete liberados com ícone lima, Últimas instalações apagada …
- `01-momento-sem-modulo` — Faixa com LED apagado e 'Sem sessão de configuração', sem ENCERRAR. Conectar módulo com borda lima e 'toque para procurar' em lima, poço 34. Ativo 'nenhum' tracejado. Seis ferramentas 'espera módulo e ativo', …
- `02-momento-modulo-sem-ativo` — Faixa com LED lima, M2C-0417 \| 'sem ativo' (#867E9A) e ENCERRAR. Conectar conectado com M2C-0417. Ativo em decide agora, 'toque para escolher' em lima, poço 30. Seis ferramentas 'espera ativo', Últimas …
- `03-estado-faixa-modulo-com-falha` — Idêntico ao 00, exceto a faixa: LED vermelho, 'Módulo com falha' em vermelho, traço vermelho de 2px embaixo e ENCERRAR. Os cartões continuam M2C-0417 / RKT-8H42, todos liberados, e a fila segue com 2
- `04-estado-checklist-pendente` — Idêntico ao 00, mais o contador '10' no canto do cartão Finalizar com checklist, no mesmo desenho do contador da fila
- `05-momento-folha-conta` — A tira fica acesa. Abaixo dela o véu cobre uma página vazia, sem faixa e sem cartões. A folha Conta tem puxador, título Conta e X; cartão com RV 52, Rafael Vieira e 'r.vieira · Viação Atlântico Sul'; poço …
- `06-momento-folha-conta-sair-com-sessao-aberta` — Véu sobre página vazia e diálogo 'Sair da conta': '3 itens continuam na fila e sobem no próximo login.' e 'A sessão de configuração do M2C-0417 é encerrada antes.' Primário roxo 'Encerrar a sessão e sair' com …
- `07-momento-folha-trocar-de-garagem` — Folha Trocar de garagem com o subtítulo 'Trocar recarrega os ativos e o pacote desta garagem.' e três linhas de 72: Várzea atual (quadrado lima), 'carregado ontem, 07:10', ATIVOS 10; Ibura (quadrado vazio), …
- `08-estado-folha-trocar-de-garagem-envio-em-andamento` — O 07 com a caixa 'UMA EVIDÊNCIA ESTÁ SUBINDO / Troque de garagem quando a fila terminar.' no lugar do subtítulo, sem poço nem glifo. Ibura travada (traço, apagada) com 'espera o envio terminar'. A folha …
- `09-estado-folha-trocar-de-garagem-com-modulo-conectado` — Véu sobre página vazia e diálogo 'Trocar de garagem': 'A sessão de configuração do M2C-0417 é encerrada antes da troca.' e 'O que já foi gravado fica no módulo.' Primário 'Encerrar a sessão e trocar', link …

</details>

**Histórias sem referência:** **HU-T04-4 — Checklist pendente aparece como aviso persistente** — O 04 mostra um contador '10' no canto do cartão (peça 'com pendência'), não um aviso. Pela Lei 7, aviso tem um formato só: poço, rótulo e uma frase. Nenhuma referência da T04 mostra aviso de checklist

---

### T05 · Conectar módulo

**1 · O que ela faz.** A tela acha os módulos que estão por perto. O técnico escolhe o que tem na mão e conecta. Aí o app roda sozinho as onze checagens, uma por linha. Se todas passam, a sessão nasce e a faixa desce. Se uma falha, a falha fica na linha dela, e a saída aparece no rodapé.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema* · *barra do sistema sem sessão* · *faixa · sessão aberta* · *duas ações* · *uma ação* · *com legenda* · *processo correndo* · *falha* · *aviso* · *nota tracejada* · *aprovada* · *reprovada, com causa* · *não se aplica* · *parou aqui* · *ainda não* · *pré-checagem* · *pré-checagem com sessão* · *com contador neutro* · *linha de módulo* · *bloco escolhido* · *escolhido com trava* · *tira de leituras*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sem ação · processo parado · linha do histórico · a lista de garagens · cadeia concluída · cadeia recusada · encerrando · pede o corte · sem homologar · com contador de falha · a marca no login · campo · campo focado · linha de opção · linha de ônibus · lista com contagem.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - Linha de módulo com marcador de escolha: poço 30 com quadrado vazio de 11 (#4A4166), serial 17/700 com letra 0.2, variante embaixo, e à direita o rótulo FIRMWARE 10/700 com a versão … — *01* · altura 72 (--linha-escolha), gap 12, cartão de y 133 a 499
  - Linha de módulo fora do cadastro, que não se toca: é <div> e não <a>, serial em #867E9A. Na 01 o poço traz um traço de 10×1 e a frase 'não está no cadastro desta empresa'. Na 00 e na 04 … — *00, 01, 04* · altura 56 na 00/04 (as outras linhas têm 50) e 76 na 01 (as outras têm 72). Nenhuma das duas é token de linha
  - Vazio da busca: poço grande sem traço lima, quadrado tracejado de 44 (1px dashed #332C49) com traço de 14 dentro, título 20/700 e frase 14/500. O 'vazio declarado' da folha 4 é tracejado e … — *03* · poço de y 98 a 615, padding 24 20, gap 12
  - Legenda solta embaixo do conteúdo ('A busca durou 8 s · primeira tentativa'), 12/500 #867E9A — *03* · y ≈ 632 a 640, margin-bottom 16
  - Rótulo de topo com serial · placa (ou serial · 'fora do cadastro') em cima do título, quando ainda não há faixa. É uso do token --t-rotulo-topo, mas não tem linha em componentes.md — *06, 07, 08, 09, 10, 11, 12, 14, 15* · 11/700 com letra 1.4 #A9A2BC (na 06: 12/700 com letra 1.2), gap 2 até o h1
  - Contador de veredito: o número aprovado em lima (#AAEF00) e 'de 11' em #867E9A — *05, 13* · 13/600
  - Faixa com sessão aberta e sem ativo: LED lima, serial, separador, 'sem ativo' em #867E9A, ENCERRAR, sem borda embaixo — *05, 13* · altura 52, y de 30 a 82, padding 0 16, LED 8, serial 16/700/0.3, 'sem ativo' 15/500, ENCERRAR 13/700/0.6 com …
  - Linha da pré-checagem correndo: quadrado branco 'agora' de 10×10 #F2F0F7 no poço 24, valor em #F2F0F7. O glifo 'agora' existe na folha 3, mas a linha não existe em nenhuma folha — *10* · linha de 38, valor 13/700
  - Linha 'parou aqui' neutra, para o repouso: lua #A9A2BC, título 14/600 #F2F0F7, valor 'em repouso' em #A9A2BC — *15* · linha de 38
  - Linha aprovada com nota neutra embaixo ('aberto desde 03/03 às 13:20' em #867E9A) e valor 'fechado' — *13* · min-height 42 com padding 8 0, cerca de 51 de altura
  - Linha reprovada sem causa: X vermelho, título 14/600 #F2F0F7, valor vermelho, e nenhuma linha de causa — *06* · linha de 38
  - Tira de leituras com número em destaque: '12' 13/700 #F2F0F7 seguido de '· 3 de diagnóstico' 500 #867E9A — *13* · mesma tira: padding 10 12, grid de 2 colunas, gap 12
  - Frase de abertura acima da lista ('Escolha o que está na sua mão.'), 15/500 #A9A2BC, lh 1.4 — *01* · y ≈ 103 a 114

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | O escolhido é o herói, M.modulos[M2C-0417], com modelo, variante e firmware do cadastro. Os outros quatro são uma lista fixa. A contagem é o tamanho da lista, e 'QUATRO' é esse tamanho menos um, por extenso | M.modulos[serial=M2C-0417] (vl06, CAN-BT, 2.3.5) · M.ativos[a-01].moduloSerial=M2C-0417 · M.modulos[M2C-0362, M2C-0394, M2C-0335] · … | **não confere** — Cada serial, variante e firmware bate com M.modulos. Mas o mock não tem lista de busca: o conjunto dos cinco, a ordem e o '5' não saem de campo nenhum. E a semente diz … |
| `01-momento-nenhum-escolhido` | momento | A mesma lista 'por perto', sem nada escolhido. O firmware de cada linha vem de M.modulos. O M2C-0999 vem de seriaisForaCadastro e se desenha sem toque | M.modulos[0417, 0362, 0394, 0335].firmware · M.seriaisForaCadastro[0] · a lista: sem campo | **não confere** — Os firmwares batem. A composição e o '5' não têm fonte. A linha do M2C-0999 é <div>, não se toca, e isso contradiz a porta natural de logica.md:56 |
| `02-momento-um-encontrado` | momento | A lista 'por perto' com só o herói: o bloco escolhido cresce e a nota tracejada toma o lugar da lista | M.modulos[M2C-0417] · 'só um por perto': sem campo nem gatilho | **não confere** — Nada no mock produz uma busca de um só. Como é momento, não entra na coluna (palco.md:24), e nenhum toque leva até ele. 08-produto-real/o-que-o-prototipo-simula.md:5 … |
| `03-estado-nenhum-encontrado` | estado | O caso busca-vazia: tentativa 1 vira 'primeira tentativa' por ordinal. A lista some e o poço vira o vazio | M.casos["busca-vazia"] = {tentativa: 1, motivo: 'O módulo leva alguns segundos para acordar depois de alimentado.'} | **não confere** — '8 s' não tem campo: o caso não traz duração. O motivo do mock não aparece, porque a frase da referência é outra. HU-T05-1 pede alimentação, cabo e distância, e a frase … |
| `04-estado-conexao-falhou` | estado | O caso conexao-falha põe o M2C-0301 no lugar do escolhido. Os três itens são texto fixo. A geometria é idêntica à 00: poço de 98 a 395, lista de 435 a 643 | M.casos["conexao-falha"].moduloSerial → M.modulos[M2C-0301] (vl06, FULL, 2.3.5) · a lista dos outros quatro: sem campo | **não confere** — Os dados do M2C-0301 batem. Os outros quatro e o '5' têm o mesmo problema da 00. O M2C-0301 não está na lista da 01, então este estado não tem porta natural. tentativa: … |
| `05-momento-pre-checagem` | momento | O herói conectado. Modelo e variante vêm do módulo. O firmware aparece na matriz CAN-BT. Espaço é conteudoRegistros do ma-01 contra capacidadeRegistros da CAN-BT. Cercas é o número de regiões do a-01 contra regioesMax. A … | M.modulos[M2C-0417] · M.modelos[vl06].nome · M.matrizCapacidades[vl06/CAN-BT] (firmwares [2.3.5], capacidadeRegistros 192, regioesMax 4) · … | confere |
| `06-estado-pre-checagem-serial-nao-cadastrado` | estado | O caso serial-nao-cadastrado. O serial está em seriaisForaCadastro, então tudo o que depende do cadastro vira 'não se aplica'. As checagens físicas passam. Contagem: 5 | M.casos["serial-nao-cadastrado"].serial=M2C-0999 ∈ M.seriaisForaCadastro | confere |
| `07-estado-pre-checagem-modelo-sem-driver` | estado | O caso modelo-sem-driver. O módulo é vc07/STD, e M.modelos[vc07].driverV1 é false, então a linha 1 reprova com causa e as dependentes viram 'não se aplica'. A placa vem do ativo do caso | M.casos["modelo-sem-driver"] (M2C-0497, a-21) → M.modulos[M2C-0497] (vc07, STD, 1.1.0) · M.modelos[vc07] (nome VC07, driverV1 false) · … | confere |
| `08-estado-pre-checagem-firmware-fora-da-matriz` | estado | O caso firmware-fora-matriz. O firmware do módulo (2.4.1) não está nos firmwares da matriz vl06/FULL, que se juntam com ' e '. As checagens que dependem do firmware viram 'não avaliada' | M.casos["firmware-fora-matriz"] (M2C-0451, a-18, firmwareDisponivel 2.3.5) → M.modulos[M2C-0451].firmware=2.4.1 · … | confere |
| `09-estado-firmware-fora-sem-rede-no-modulo` | estado | O caso firmware-fora-matriz, mais 'modem sem rede'. O modem troca o valor, e o rodapé troca 'Atualizar firmware' por 'Gravar a conexão' com legenda | M.casos["firmware-fora-matriz"] · 'modem sem rede': nenhum campo (grep -i 'modem\|semRede' no mock só acha checklist c-modem) | **não confere** — O estado não nasce de dado. Na mesma tela, 'sem rede' com check lima e 'Rede do módulo conectada'. O rodapé sobe (borda em 633) |
| `10-momento-atualizando-o-firmware` | momento | Nasce de tocar 'Atualizar firmware' na 08. A linha 2 mostra 'agora' e a porcentagem, as seguintes esperam. Ao terminar, a pré-checagem recomeça | M.casos["firmware-fora-matriz"] · '62%': sem campo (o único 62 do mock é filaSaida f-04.progresso, mocks.js:431, upload de evidência) | **não confere** — O 62% não tem fonte, e o ritmo da atualização não está em movimento.md. O relógio (#6E6683) é o glifo 'em andamento' da folha 3, e está nas linhas que ainda não … |
| `11-estado-pre-checagem-conteudo-nao-cabe` | estado | O caso conteudo-nao-cabe. A variante ECO tem can:false (CAN não se aplica), capacidadeRegistros 96 e regioesMax 2. O ma-01 pede 128. O a-10 tem 0 regiões. Contagem: 9, sem contar o CAN nem o Espaço | M.casos["conteudo-nao-cabe"] (a-10, M2C-0394, 128, 96) · M.modulos[M2C-0394] (ECO, 2.2.0) · M.matrizCapacidades[vl06/ECO] (can false, regioesMax 2) … | confere |
| `12-estado-pre-checagem-pool-de-cercas-esgotado` | estado | O caso pool-esgotado. Regiões usadas contra o máximo dão '4 de 4', e regiaoSolicitada é a causa. O módulo sai do ativo (o caso não traz serial) | M.casos["pool-esgotado"] (a-05, regioesUsadas 4, regioesMax 4, posicoesUsadas 8, posicoesMax 8, regiaoSolicitada) · … | confere |
| `13-estado-pre-checagem-canal-aberto-e-pendencias` | estado | O caso canal-aberto: data de sessaoAnterior (diasAntes(9)=2026-03-03) em DD/MM, mais a hora. Por cima, o caso modulo-com-pendencias (mesmo serial) para a tira. A pré-checagem aprova e a sessão nasce | M.casos["canal-aberto"] (M2C-0362, a-06, sessaoAnterior {data 2026-03-03, hora 13:20}) + M.casos["modulo-com-pendencias"] (mensagens 12, diagnostico … | confere |
| `14-estado-pre-checagem-link-perdido-na-6a` | estado | O caso link-perdido: naChecagem 6. As linhas 1 a 5 passam, a 6 para, e da 7 à 11 é 'ainda não'. O ordinal feminino vem de naChecagem (6 → 'sexta'). Contagem = naChecagem − 1 | M.casos["link-perdido"] (M2C-0312, a-03, naChecagem 6) · M.modulos[M2C-0312] (CAN-BT, 2.3.5) · M.ativos[a-03].placa=PCX-9A17 | confere |
| `15-estado-pre-checagem-modulo-em-repouso-na-9a` | estado | O caso modulo-em-repouso: naChecagem 9. Da 1 à 8 passam, a 9 fica em repouso (neutra), a 10 e a 11 esperam. 9 → 'nona' | M.casos["modulo-em-repouso"] (M2C-0335, a-04, naChecagem 9) · M.modulos[M2C-0335] (CAN-BT, 2.3.5) · M.ativos[a-04].placa=KHT-4B08 · ma-01 128 / … | confere |

**4 · Cada movimento.**

- **lista de módulos (a busca acha)** — Cada linha vai de opacity 0 a 1 em var(--mov-rapido) com var(--mov-curva), com animation-delay de i×80ms. O gatilho é o fim do processo de busca, não a montagem da tela. Com … ⚠ 80ms não é token (--mov-* são 150/200/300) e não está na tabela de processos de movimento.md. Nenhuma referência mostra a busca correndo, então, se a lista já nasce …
- **linha da pré-checagem (a checagem começa)** — O glifo do poço troca direto para o quadrado branco 'agora' (glifo da folha 3, 10×10 #F2F0F7 no poço 24), no tick do processo. Igual com reduzir movimento ⚠ Não viola regra. Mas nenhuma referência mostra a pré-checagem do herói correndo: o quadro de começo desse movimento não existe (animacao.md:14 diz que os quadros são as …
- **linha da pré-checagem (a checagem passa)** — Troca cruzada 'agora' → check lima por opacity, em var(--mov-rapido) com var(--mov-curva). A próxima linha começa 600ms depois (ritmo de movimento.md:32). Com reduzir movimento, … ⚠ Nenhum
- **linha que falha** — Glifo e cores (X, valor vermelho, título 600) trocam por opacity em var(--mov-rapido). A causa entra por opacity. O aviso, só onde a referência tem ⚠ 'a causa aparece embaixo' faz a linha crescer de 38 para cerca de 47 (07: y 98→145), e isso empurra o resto da lista: é layout, contra animacao.md:14 e movimento.md:43. …
- **faixa de sessão (a última linha passa)** — A faixa entra com translateY(-100%) → 0 em var(--mov-padrao) com var(--mov-curva), no aprovado da 11ª linha. Com reduzir movimento, ela aparece ⚠ A faixa ocupa 52px. A lista desce de y=97 (sem faixa) para 134 (05/13), 37px, e o rótulo de topo some. A barra do sistema muda de cor, de #0F0D14 para #16131D …
- **atualização de firmware** — O texto 'atualizando · N%' troca no lugar, sem transição. Ao fim, todas as linhas voltam a 'ainda não' e a pré-checagem recomeça no ritmo de 600ms ⚠ movimento.md não declara o ritmo da atualização (a tabela de processos não tem firmware), e 06-prototipo/CLAUDE.md, regra 8, manda usar só os tempos de lá. O quadro …

**5 · O que pode dar errado.**

- Montar a lista 'por perto' (0417/0301 + 0362, 0394, 0335, 0999) e o '5 encontrados' sem campo no mock. É número e composição digitados no componente, o que contrato.md:7 proíbe
- Contar errado o 'N de 11'. Pelas referências, a regra é: só a aprovada conta; 'não se aplica' e 'parou aqui' não contam (11: CAN sem CAN fica de fora → 9); 'sem rede' no modem conta (09 → 8). Nenhum documento declara essa regra
- O 13 montado só com canal-aberto mostra 'Mensagens pendentes nenhuma'. O '12 · 3 de diagnóstico' mora em casos['modulo-com-pendencias']
- Animar a altura da linha que ganha causa, ou empurrar a lista quando a faixa desce ou o aviso entra. Isso mexe layout, o que é proibido (movimento.md:43). Não animar dá salto de 9px, 37px e 65px na comparação
- Usar um componente único de rótulo de topo (11/1.4) e errar a 06 por 1px (12/1.2). Ou copiar as duas medidas e ter duas peças para a mesma coisa
- Usar a altura de token (38/50/72) nas últimas linhas e errar o print por 5 a 7px: 43, 45, 42+8, 56, 76 são alturas medidas que não são token. Copiar o número viola a Lei 13
- Ordinais 'sexta' e 'nona' e 'QUATRO' por extenso saem de número (naChecagem, tamanho da lista), e não há tabela de extenso declarada. Inventar a tabela no componente é texto fora de textos.md
- Momentos 02 e 10 inalcançáveis: a coluna não lista momento, e a 08 aberta pela coluna fica sem toque. O C6 fecha sem poder comparar essas duas referências
- Porta natural do M2C-0999: a referência não deixa tocar, logica.md:56 manda abrir a 06. Qualquer escolha diverge de um dos dois

<details><summary>Medidas reais lidas no HTML · 16 peças</summary>

| Peça | Medida |
|---|---|
| barra do sistema | altura 30 · padding 0 14 0 18 · hora 14/500, letra 0.1 · ícones 15×11, 15×11, 23×11, gap … |
| área de conteúdo (busca) | padding 28 16 0 16 · gap 14 · flex coluna, overflow hidden |
| área de conteúdo (pré-checagem) | padding 14 16 16 16 · gap 12 |
| título + contador | h1 22/700, letra −0.3 · contador 13/600 #A9A2BC com a palavra em #867E9A · alinhados … |
| bloco escolhido | flex-grow · fundo poço #0B0910 · bordas 1px (topo #06050A, lados #14111C) + 2px lima … |
| escolhido com trava (04) | a mesma caixa, com 2px vermelho embaixo · padding 16 · gap 10 · separador 1px #2E2840 … |
| rótulo 'OUTROS QUATRO POR PERTO' e lista de … | rótulo 10/700/1.5 #867E9A em y≈412 · cartão #1A1726, borda 1px #2B2540, raio 4, padding … |
| lista de escolha (01) | linhas de 72 com poço 30 e marcador de 11 (borda #4A4166) · gap 12 · serial 17/700/0.2 · … |
| rodapé | borda de cima 1px #221D2E · padding 14 16 24 (duas ações ou com legenda) / 14 16 32 (uma … |
| faixa (05/13) | altura 52 · fundo #16131D · sem borda embaixo · padding 0 16 · LED 8 com raio 4, lima · … |
| rótulo de topo sem faixa (06-12, 14, 15) | 11/700, letra 1.4, #A9A2BC (na 06: 12/700, letra 1.2) · gap 2 até o h1 |
| lista da pré-checagem | cartão com padding 0 12 · linhas de 38 · poço 24 · glifo 14 com traço 2.2 · gap 12 · … |
| posição da lista da pré-checagem (Lei 3) | topo: 98 (06), 97 (07-12, 10), 134 (05, 13), 162 (14), 161 (15) · pé: 525, 534, 517, … |
| tira de leituras | fundo #131019 · borda 1px tracejada #241F33 · raio 4 · padding 10 12 · grid de 2 … |
| aviso (14/15) | fundo poço · padding 10 12 · gap 12 · poço do glifo 24 com ícone 14 · rótulo 10/700/1.5 … |
| vazio da busca (03) e nota tracejada (02) | 03: poço 98→615, padding 24 20, gap 12, quadrado tracejado 44 com traço 14×1, título … |

</details>

<details><summary>O que se vê em cada uma das 16 referências</summary>

- `00-tela` — 'Conectar módulo' com '5 encontrados'. Poço grande com ESCOLHIDO em lima e M2C-0417 em 34px, 'VL06 · CAN-BT · firmware 2.3.5', traço lima embaixo. 'OUTROS QUATRO POR PERTO': M2C-0362, M2C-0394, M2C-0335 e …
- `01-momento-nenhum-escolhido` — '5 encontrados' e 'Escolha o que está na sua mão.'. Cartão com cinco linhas de 72 e marcador vazio: M2C-0417, 0362, 0394 e 0335, cada uma com FIRMWARE à direita (2.3.5, 2.3.5, 2.2.0, 2.3.5). M2C-0999 apagado, …
- `02-momento-um-encontrado` — '1 encontrado'. O escolhido M2C-0417 ocupa o poço até y=552. Embaixo, nota tracejada 'NENHUM OUTRO POR PERTO — Se não for este, aproxime o aparelho do módulo e procure de novo.'. Rodapé Conectar/Procurar
- `03-estado-nenhum-encontrado` — 'nenhum encontrado'. Poço vazio até y=615 com quadrado tracejado, 'Nenhum módulo respondeu' e 'Aproxime o aparelho do módulo e confira se ele está alimentado.'. Legenda 'A busca durou 8 s · primeira …
- `04-estado-conexao-falhou` — '5 encontrados'. O escolhido virou trava: 'NÃO RESPONDEU' em vermelho, M2C-0301, 'VL06 · FULL · firmware 2.3.5', separador, e três linhas: 1 · Cabo e conector, 2 · Alimentação, 3 · Cadastro. Traço vermelho …
- `05-momento-pre-checagem` — A faixa desceu: LED lima, M2C-0417, 'sem ativo', ENCERRAR, e a barra do sistema na cor da faixa. 'Pré-checagem' com '11 de 11' e o 11 em lima. Onze linhas com check lima: VL06 CAN-BT, 2.3.5, na faixa, antena …
- `06-estado-pre-checagem-serial-nao-cadastrado` — Sem faixa. Rótulo 'M2C-0999 · fora do cadastro' em cima de 'Pré-checagem', com '5 de 11'. 'Serial no cadastro' com X vermelho e o valor M2C-0999 em vermelho, sem causa. Firmware, Entradas, Espaço, Cercas e ID …
- `07-estado-pre-checagem-modelo-sem-driver` — 'M2C-0497 · OHL-6V07' e '5 de 11'. 'Serial no cadastro' reprovada, com 'não atendido nesta versão' em vermelho embaixo e o valor VC07 STD. O resto igual à 06 ('sem cadastro' nas dependentes). 'Procurar outro …
- `08-estado-pre-checagem-firmware-fora-da-matriz` — 'M2C-0451 · QTM-5S79' e '8 de 11'. Firmware reprovado: '2.4.1' em vermelho e 'homologadas 2.2.0 e 2.3.5' embaixo. Espaço no módulo e Espaço para cercas 'não avaliada'. O resto aprovado, com Modem 'na rede'. …
- `09-estado-firmware-fora-sem-rede-no-modulo` — Igual à 08, mas 'Modem, SIM e sinal' diz 'sem rede' e tem check lima. Na tira, 'Rede do módulo conectada'. O rodapé ganha a legenda 'Com a conexão gravada, o firmware atualiza pelo módulo.', o primário …
- `10-momento-atualizando-o-firmware` — 'M2C-0451 · QTM-5S79' e '1 de 11'. Serial aprovado. Firmware com o quadrado branco 'agora' e 'atualizando · 62%'. Nove linhas apagadas, com relógio e '—'. A tira continua com 'nenhuma' e 'conectada'. Rodapé …
- `11-estado-pre-checagem-conteudo-nao-cabe` — 'M2C-0394 · OCT-2J85' e '9 de 11'. VL06 ECO, 2.2.0. CAN com traço e 'sem CAN'. 'Espaço no módulo' reprovado: 'não cabe' em vermelho e '128 registros · cabem 96' embaixo. 'Espaço para cercas 0 de 2' aprovado. …
- `12-estado-pre-checagem-pool-de-cercas-esgotado` — 'M2C-0348 · OYS-7D93' e '10 de 11'. 'Espaço para cercas' reprovado: '4 de 4' em vermelho e 'Terminal Cosme e Damião não cabe' embaixo. O resto aprovado, com 128 de 192. Uma ação
- `13-estado-pre-checagem-canal-aberto-e-pendencias` — Faixa com M2C-0362 e 'sem ativo'. '11 de 11' com o 11 em lima. VL06 CAN, 2.3.5. 'Espaço para cercas 0 de 4'. 'Canal de programação' aprovado com 'fechado' e 'aberto desde 03/03 às 13:20' embaixo, em cinza. …
- `14-estado-pre-checagem-link-perdido-na-6a` — 'M2C-0312 · PCX-9A17' e '5 de 11'. Em cima da lista, um aviso de falha: wifi cortado vermelho, 'SEM RESPOSTA DO MÓDULO', 'Reconecte para seguir da sexta.' e traço vermelho. As cinco primeiras aprovadas. Modem …
- `15-estado-pre-checagem-modulo-em-repouso-na-9a` — 'M2C-0335 · KHT-4B08' e '8 de 11'. Aviso cinza com lua: 'MÓDULO EM REPOUSO', 'Acorde para seguir da nona.'. Oito aprovadas, com 128 de 192. 'Espaço para cercas' com lua e 'em repouso', sem vermelho. ID e …

</details>

**Histórias sem referência:** **HU-T05-1** — Parcial. Nenhuma referência mostra a busca correndo, nem a diferença entre sem fio e cabo conforme a variante: a lista mistura CAN e ECO (semFio false na matriz) com CAN-BT, sem dizer o meio. O … · **HU-T05-2** — Parcial. Só existe o fim (05, 11 de 11). A pré-checagem do herói rodando sozinha, linha por linha, não tem quadro: o 'agora' só aparece na 10, no firmware · **HU-T05-5** — Parcial. 08 (com rede → Atualizar) e 09 (sem rede → Gravar a conexão) existem. O depois de 'Gravar a conexão' (gravando, e então a oferta de atualizar) não tem referência, e nem a terceira saída da … · **HU-T05-6** — Nenhuma referência mostra o app relendo as capacidades nem a pré-checagem reiniciada depois da atualização. A 10 só promete ('A pré-checagem recomeça quando terminar')

---

### T06 · Selecionar ativo

**1 · O que ela faz.** Lista os ativos do pacote da garagem para o técnico tocar no que está à frente. Na confirmação, prova o vínculo: chassi lido igual ao do cadastro, ou confirmação marcada quando o modelo não manda chassi. Trava quando o ativo é de outra garagem, quando o chassi diverge ou quando os pinos conflitam.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema* · *faixa · sessão aberta* · *com contador neutro* · *campo de busca* · *linha de ônibus* · *duas ações* · *uma ação* · *com legenda* · *bloco escolhido* · *o par comparado* · *nota com rótulo* · *checkbox* · *escolhido com trava · T06*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sem ação · processo correndo · linha do histórico · a lista de garagens · cadeia concluída · cadeia recusada · encerrando · pede o corte · sem homologar · com contador de falha · a marca no login · campo · campo focado · linha de opção · cartão que pede ação · lista com contagem.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - faixa com 'sem ativo': LED lima, serial, separador 1×16, 'sem ativo' 15/500 #867E9A, ENCERRAR, sem borda de baixo. A folha 2 só tem a versão com a placa em #A9A2BC e com borda 1px #2E2840 — *00 a 06 (e T04/02, T05/05)* · 52 de altura · padding 0 16 · gap 10 · ENCERRAR com 48 de toque
  - linha de ação 'Solicitar correção de cadastro · anexa os dois': cartão #1A1726, borda #2B2540, raio 4, texto 14/600 à esquerda e 12/500 #867E9A à direita. Não está em nenhuma folha, e o … — *02 (02.html:55-57)* · 50 × 328 · padding 0 12 · margin-bottom 16 · PNG y 577–627
  - bloco escolhido neutro: ESCOLHIDO em #867E9A, sem o traço lima, padding 18 — *02 (02.html:38)* · 116 de altura (y 136–252), 9px a menos que na 01
  - o par comparado quando bate: NO CADASTRO em lima, frase 13/600, sem traço colorido, margin-bottom 16 — *01 (01.html:43-54)* · y 275–627 · padding 20 16 · gap 18
  - escolhido com trava neutro: rótulo #A9A2BC, traço 2px #3A3350 (--borda-neutra) — *05 (05.html:38)* · y 136–627
  - rodapé com primário desabilitado e sem legenda ('Usar este ativo' apagado + link) — *00 (00-tela.html:98-100)* · padding 14 16 24 16 · botão 56 em y 674–730
  - última linha de ônibus com 78 de altura e sem divisória — *00 (00-tela.html:85)* · 78 (não é token; as outras têm 72 = --linha-escolha)
  - o check que a animacao.md manda 'desenhar entre os dois' chassis. Não está na 01 (só as 3 svg da barra do sistema) nem em nenhuma folha — *animacao.md:7 · ausente em 01*
  - checkbox marcado. Só está desenhado como radio dentro de 'justificativa' (quadrado lima de 10 no poço de 24, folha 6) — *quadro de fim da 'confirmação manual' (animacao.md:8), sem …*

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | Sessão M2C-0417 sem ativo. Linhas = M.ativos com uoId === M.contextoAtivo.uoId, na ordem do mock, e o modelo sai do modeloAtivoId. Contador = pacote da UO → contem.ativos. | M.contextoAtivo.uoId (uo-01) · M.ativos a-01..a-10 · M.modelosAtivo[ma-01].nome · M.pacotes[pac-uo-01].contem.ativos = 10 | **não confere** — Placa, frota e modelo das 5 linhas batem com a-01..a-05. O '5' e as 5 linhas não batem: o pacote tem 10 (contem.ativos 10; 10 ativos em uo-01; a folha 3 diz 'Garagem … |
| `01-momento-confirmar-o-veiculo` | momento | Tocar na linha → ativo a-01. O modelo ma-01 tem chassiPelaCan true → par comparado. Lido = cadastro, porque não há caso de divergência para a-01 → NO CADASTRO em lima e primário aceso. | M.ativos[a-01].placa/frota/chassi · M.modelosAtivo[ma-01].nome/chassiPelaCan | confere |
| `02-estado-chassi-divergente` | estado | Caso divergencia-chassi → ativo a-17. Lido = chassiLido, cadastro = chassiCadastro. O vermelho vai do primeiro índice diferente (15) até o fim. A frase só vale quando o par é anagrama de mesmo tamanho com as duas últimas … | M.casos['divergencia-chassi'] {ativoId a-17, chassiLido 9BM384067GB120471, chassiCadastro 9BM384067GB120417} · M.ativos[a-17] | confere |
| `03-estado-sem-chassi-na-can` | estado | Ativo a-09 → modelo ma-02 com chassiPelaCan false → nota com rótulo + checkbox no lugar do par. Primário apagado até marcar; rodapé com legenda. | M.ativos[a-09] · M.modelosAtivo[ma-02].nome/chassiPelaCan=false (não é chave de M.casos) | confere |
| `04-estado-fora-do-pacote` | estado | Caso ativo-fora-pacote → ativo = caso.ativoId; garagem de origem = uos[ativo.uoId].nome. Sem saída de cadastro (HU-T06-4) → rodapé com uma ação. | M.casos['ativo-fora-pacote'] {ativoId a-24, pacoteId pac-uo-01, motivo 'Este ativo pertence ao Pátio Caruaru…'} · M.ativos[a-24] · M.uos[uo-03] | **não confere** — O caso aponta a-24 = KUD-4Y21 · frota 1072 · Pátio Caruaru, e o motivo diz 'Pátio Caruaru'. O PNG, a folha 6 e o textos.md mostram a-16 = ONK-8Q90 · frota 1048 · … |
| `05-estado-conflito-de-pinos-resolvivel` | estado | Caso conflito-pinos-resolvivel → ativo a-04 e sessão no M2C-0335 (vl06 CAN-BT, semFio true na matriz) → a saída sem fio é oferecida. Rótulo = 'CONFLITO NO ' + caso.fio, em caixa alta. | M.casos['conflito-pinos-resolvivel'] {ativoId a-04, moduloSerial M2C-0335, fio 'fio branco', ocupadoPor 'sensor de porta', saida} · M.ativos[a-04] · … | confere |
| `06-estado-conflito-de-pinos-sem-saida` | estado | Caso conflito-pinos-sem-saida → ativo a-11 e módulo M2C-0389 (vl06 CAN, semFio false) → sem saída: rótulo fixo e escalonamento ao gestor. Rodapé com uma ação. | M.casos['conflito-pinos-sem-saida'] · M.ativos[a-11] · M.modulos[M2C-0389] · M.matrizCapacidades[vl06/CAN].semFio=false | confere |

**4 · Cada movimento.**

- **par de chassis** — opacity 0→1 só no valor lido, em var(--mov-rapido) com var(--mov-curva), quando a leitura chega. O check, se existisse, entraria em opacity/scale dentro de um poço de 24. Com … ⚠ O gatilho não está definido: movimento.md §Os processos não tem ritmo para a 'leitura do chassi'. Se a leitura chega junto com o momento, vira entrada animada, que é …
- **confirmação manual** — O quadrado lima de 10 no poço de 24 entra em opacity 0→1 (+ scale 0.6→1), em var(--mov-rapido) com var(--mov-curva), no toque do checkbox. O botão vira por crossfade de opacity … ⚠ 'o botão acende' é troca de fundo, cor e borda, e movimento.md:43 só permite transform e opacity. O quadro de fim (checkbox marcado + botão aceso) não tem referência. A …

**5 · O que pode dar errado.**

- Montar a 04 pelo caso dá KUD-4Y21 / 1072 / Pátio Caruaru, e a comparação com o PNG falha em placa, frota e garagem.
- Com 10 linhas no container de overflow hidden da referência e sem rolagem desenhada, as 5 últimas somem — inclusive a porta natural KNB-5H39.
- A faixa trocar de serial ao abrir a 05 ou a 06 pela porta natural (M2C-0417 → M2C-0335), quando ela tem de ficar parada na sessão.
- A centralização vertical nos blocos flex-grow faz a placa andar entre 04, 05 e 06 (y 349, 330, 340): qualquer mudança de rodapé ou de texto desloca o conteúdo.
- Destaque do chassi escrito como 'os dois últimos' quebra com outra divergência. O certo é destacar do primeiro índice diferente, e a frase de transposição só vale quando o anagrama e as posições finais se confirmam.
- A confirmação manual precisa entrar no estado único (vínculo por confirmação, 14:30, técnico). Hoje a sessão só guarda módulo, ativo e etapa, e sem esse campo a Seção A da T13 (item a-chassi) não sabe como o chassi foi provado.
- Estado no palco é 'parado e sem toque', então a 03 marcada nunca aparece pela coluna — só pela porta natural, que hoje não está na lista desenhada.
- Botão acendendo por background fere a regra do movimento. Por crossfade, são duas camadas no mesmo lugar, com risco de alvo duplicado para o leitor de tela.
- Tirar a legenda ao marcar move o rodapé 26px.

<details><summary>Medidas reais lidas no HTML · 18 peças</summary>

| Peça | Medida |
|---|---|
| barra do sistema | 30 de altura · #16131D (sangra na faixa) · padding 0 14 0 18 · hora 14/500, letra 0.1 |
| faixa | 52 · #16131D · sem borda de baixo · padding 0 16 · gap 10 · LED 8×8 lima · serial … |
| área de conteúdo | padding 14 16 16 16 · gap 14 · overflow hidden |
| cabeçalho | título 22/700, letra −0.3 · contador 13/600 #A9A2BC + 'no pacote' #867E9A · de 01 a 06 o … |
| campo de busca | 48 · poço #0B0910 (bordas #06050A / #332C49 / #14111C) · padding 0 12 · gap 10 · lupa … |
| instrução | 15/500 #A9A2BC · line-height 1.4 |
| cartão da lista | #1A1726 · borda 1 #2B2540 · raio 4 · padding 0 12 · margin-bottom 16 · 368 de altura = 2 … |
| linha de ônibus | 72 (a última 78, sem divisória) · gap 12 · divisória #241F33 · poço 30 com marcador 11, … |
| rodapé duas ações | padding 14 16 24 16 · gap 6 · borda de cima #221D2E · primário 56, raio 4 (aceso #402070 … |
| bloco escolhido (01/03) | poço · padding 22 16 · gap 8 · traço de baixo 2px lima · rótulo 10/700, letra 1.5, lima … |
| bloco escolhido (02) | padding 18 16 · borda de baixo 1px #332C49 · rótulo #867E9A · 9px mais baixo |
| o par comparado | flex-grow · poço · padding 20 16 · gap 18 · rótulos 10/700, letra 1.5 · valores 20/700, … |
| linha 'Solicitar correção de cadastro' | 50 · #1A1726 · borda #2B2540 · raio 4 · padding 0 12 · 14/600 #F2F0F7 + 12/500 #867E9A · … |
| nota com rótulo | #131019 · borda 1 tracejada #241F33 · raio 4 · padding 12 · gap 4 · rótulo 10/700 … |
| checkbox | linha com mínimo 48 · gap 12 · poço 24 vazio · texto 14/500 #C9C3DA, line-height 1.4 |
| rodapé com legenda | legenda 12/600 #867E9A centrada + padding-bottom 6 (12 até o botão) · primário apagado … |
| escolhido com trava · T06 | flex-grow · margin-bottom 16 · padding 22 16 · gap 8 · traço 2px #E06A5A (04/06) ou … |
| rodapé uma ação | padding 14 16 32 16 · só o primário 56 |

</details>

<details><summary>O que se vê em cada uma das 7 referências</summary>

- `00-tela` — 'Selecionar ativo' com '5 no pacote', busca vazia, a frase 'Escolha o veículo…' e um cartão com 5 ônibus urbanos OF-1621 (RKT-8H42 1003 · QJF-2C61 1006 · PCX-9A17 1009 · KHT-4B08 1012 · OYS-7D93 1015), cada …
- `01-momento-confirmar-o-veiculo` — 'Confirmar o veículo'. Bloco ESCOLHIDO em lima com RKT-8H42 e 'frota 1003 · Ônibus urbano OF-1621', com traço lima. Embaixo, um poço alto com CHASSI LIDO 9BM384067GB120401, divisória, NO CADASTRO (lima) …
- `02-estado-chassi-divergente` — ESCOLHIDO cinza, sem traço lima e com o bloco 9px mais baixo: RDF-3R14 · frota 1051. No par, os dois últimos dígitos em vermelho (…1204 71 × …1204 17), traço vermelho e a frase de transposição. Linha …
- `03-estado-sem-chassi-na-can` — ESCOLHIDO em lima com KNB-5H39 · frota 1027 · Caminhão coletor 17.230. Nota tracejada SEM CHASSI NA CAN, checkbox vazio 'Confirmo que o KNB-5H39 é o veículo à minha frente', a legenda 'Confirme o veículo para …
- `04-estado-fora-do-pacote` — Um bloco só, alto, com traço vermelho: FORA DO PACOTE DESTA UO em vermelho, ONK-8Q90, 'frota 1048 · Caminhão coletor 17.230', divisória curta, 'Pertence a Garagem Ibura.' e 'Acione o cadastro no M2.'. Só o …
- `05-estado-conflito-de-pinos-resolvivel` — A faixa mostra M2C-0335. Bloco único com traço neutro: CONFLITO NO FIO BRANCO em cinza, KHT-4B08 · frota 1012 · Ônibus urbano OF-1621, 'O sensor de porta já ocupa o fio branco.' e 'Com o leitor sem fio, os …
- `06-estado-conflito-de-pinos-sem-saida` — A faixa mostra M2C-0389. Bloco único com traço vermelho: ERRO DE PROJETO DE INSTALAÇÃO, PGE-6K41 · frota 1033 · Ônibus urbano OF-1621. A frase longa quebra em duas linhas alinhadas à esquerda, e 'Acione o …

</details>

**Histórias sem referência:** **HU-T06-1** — Parcial. A 00 mostra a busca vazia e o modelo por linha, mas nenhuma referência mostra o módulo esperado (ativo.moduloSerial) nem a busca em uso (digitada, filtrada ou sem resultado). A linha de … · **HU-T06-7** — Parcial. Só 05 e 06 nomeiam uma linha (fio branco · sensor de porta). Nenhuma referência mostra as linhas do arnês nomeadas por cor e função. · **HU-T06-3** — Parcial. A 03 mostra a confirmação por marcar. A confirmação marcada (botão aceso) e o registro na evidência não têm referência. · **HU-T06-5** — Parcial. A 05 mostra o conflito resolvível, mas não há referência da matriz rodando. A ação desenhada é 'Usar leitor sem fio', não 'reconectar sem fio' como a HU diz.

---

### T07 · Dados da CAN

**1 · O que ela faz.** Com o ônibus parado e a chave ligada, a tela mostra cada sinal estático que a CAN entregou contra a faixa que o cadastro espera, acende o bloco que falhou com a causa provável e junta num resumo apagado os sinais que só se provam com o veículo andando.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema* · *faixa · sessão aberta* · *duas ações* · *com contador neutro* · *com contador de falha* · *leitura na faixa* · *fora da faixa* · *leitura pequena* · *leitura com mínimo* · *tambor* · *sinais liga-desliga* · *instrumentos apagados*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sem ação — a T07 tem sempre o ENCERRAR; a peça é da tela que a faixa abriu (componentes.md:21) · processo correndo — nenhuma referência mostra o primário dizendo o que acontece · com legenda — nenhum rodapé da T07 tem legenda · a marca no login — não há logo na T07 · campo — não há campo na T07 · campo focado — não há campo na T07 · cartão com barra — é o cartão da T13 (ALIMENTAÇÃO 18px, barra de 9px, folha-7); os cartões pequenos da T07 são a leitura pequena da folha-5 (22px, barra de 14px) · cartão de configuração — é o LIMPEZA · feita da Seção D da T13 (folha-7); não aparece na T07.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - leitura pequena sem faixa: cartão de meia largura com barra e marcador, mas sem faixa esperada, e 'sem faixa' embaixo (Nível 62 %). A folha-5 só desenha a leitura pequena com faixa … — *00, 01, 02, 03 · 00-tela.html:118-126* · 159×84 · padding 10 · gap 6 · barra 137×14 sem div de faixa · marcador 3×12 em left 62% · marcas de 5 e 8 em …
  - leitura sem leitura: borda 1px --vermelho, traço '—' vermelho no lugar do número, poço vazio com traço de 10×1 no centro, causa em vermelho no lugar do esperado. Nenhuma folha desenha. O … — *02 (Satélites, 02-estado-sem-leitura.html:105-106) · 03 …* · 159×84 · valor '—' 22/700 #E06A5A · poço 137×14 · traço 10×1 #332C49 · causa 12/600 #E06A5A

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | a-01 → ma-01.sinaisCan com o lido nominal; os 7 estáticos vão para as peças, os 5 dinâmicos para o resumo; contador = estáticos que passaram / total de sinais do modelo. | M.ativos[a-01] (RKT-8H42, M2C-0417, ma-01) · M.modelosAtivo[ma-01].sinaisCan (12 sinais: 7 estatico, 5 dinamico) · lido: 13,8 V, 184.320 km, 31 °C, … | confere |
| `01-estado-fora-da-faixa` | estado | caso can-estatico-isolado → a-02 (ma-01, M2C-0301); lidos.bateria 10,9 V e lidos.hodometro 201.115 km por cima do nominal; 10,9 < 12,0 reprova; a leitura existe, então a causa é 'veículo ou cadastro' (C11.8, mocks.js:621-625); … | M.casos["can-estatico-isolado"] = { ativoId: a-02, lidos: { bateria: '10,9 V', hodometro: '201.115 km' } } (mocks.js:643) · M.ativos[a-02] · … | confere |
| `02-estado-sem-leitura` | estado | caso can-estatico-ausente → a-03 (ma-01, M2C-0312); lidos.satelites null vira '—' e o poço fica vazio; no domínio GPS falta 1 sinal, então a causa é 'ligação' (mocks.js:623); lidos.hodometro 176.902 km. | M.casos["can-estatico-ausente"] = { ativoId: a-03, lidos: { satelites: null, hodometro: '176.902 km' } } (mocks.js:644) · M.ativos[a-03] · … | confere |
| `03-estado-dominio-mudo` | estado | Pelo caso a tela não fecha: a-16 é ma-02. Montada pelo caso, ela teria bateria 27,1 V em 24,0–29,0, hodômetro 96.410 (cinco rodinhas), Motor = Temperatura + Temperatura do óleo, os dois mudos, com causa 'barramento ou modelo', … | M.casos["can-estatico-dominio"] = { ativoId: a-16, semLeituraDominio: 'Motor' } (mocks.js:645) · M.ativos[a-16].modeloAtivoId = ma-02 (mocks.js:198) … | **não confere** — Não bate em nada que vem do modelo: bateria, faixa, escala, hodômetro, Satélites, Posição, Nível, a causa ('ligação' contra 'barramento ou modelo'), o resumo dos 5 … |

**4 · Cada movimento.**

- **marcador da barra** — transform: translateX num contêiner da largura do trilho (translateX em % mede o próprio marcador de 4px, não a barra), de 0 até o valor, em var(--mov-lento) com … ⚠ Se a leitura acontece ao abrir a tela, correr de zero é 'contar de zero ao abrir' (movimento.md:43). Nenhum processo de leitura da CAN tem ritmo na tabela de …
- **tambor do hodômetro** — cada rodinha é uma coluna de dígitos em transform: translateY, var(--mov-lento) e var(--mov-curva), da direita para a esquerda, com atraso de 40ms entre uma e outra; com reduzir … ⚠ O atraso de 40ms não é token (tokens.css:110-113 só tem 150/200/300) nem ritmo declarado de processo: é valor solto (Lei 13). Rolar a partir de zero ao abrir esbarra em …
- **contador do cabeçalho** — troca direta do texto no lugar, sem transição, a cada sinal estático que passa (1 de 12 … 7 de 12); nos estados, troca para 'N reprovado'. ⚠ 'Cada sinal que passa' supõe uma sequência com tempo, e o ritmo não existe em movimento.md. Nenhuma referência mostra um contador intermediário. Sem violação de token, …
- **sinal fora da faixa** — um contorno vermelho sobreposto (pseudo-elemento com borda --vermelho) e a linha da causa em opacity de 0 a 1, em var(--mov-rapido); com reduzir movimento, troca direta. ⚠ 'Ganha a borda vermelha' é troca de cor de borda, não transform nem opacity (movimento.md:43); só dá certo com o contorno sobreposto. No 01 'a causa aparece' acrescenta …
- **entre telas (cabeçalho do animacao.md)** — só o conteúdo esmaece por opacity em var(--mov-rapido); a barra do sistema e a faixa ficam fora da transição. ⚠ Nenhum, desde que a faixa tenha flex-shrink: 0: no HTML de referência ela encolhe para 51,4px no 01 (ver T07-V1).

**5 · O que pode dar errado.**

- Construir o 03 pelo caso (a-16, ma-02) dá uma tela que não bate com a referência nem com o textos.md:19. Construir como a referência é desenhar o estado na mão (casos.md:3). Qualquer caminho sai do ciclo com desvio.
- Só existe desenho para ma-01. a-09 KNB-5H39 (ma-02, Várzea, porta natural da T06/03, com o caso can-estatico-hodometro) e todo ma-03 caem numa T07 sem referência: Motor com dois estáticos, sem GPS, horímetro em vez de hodômetro.
- O mock não diz qual peça cada sinal usa, nem em que ordem aparecem: a ordem da tela (bateria, hodômetro, temperatura, satélites, nível, ignição+posição) não é a ordem do mock nem a dos domínios. Isso vira um mapa por id de sinal …
- A escala da barra grande (faixa ±1,0 V, que estica até o volt inteiro abaixo do lido), as marcas (a cada 0,5 V com maior no centro no 00; a cada 1 V sem maior no centro no 01) e a escala de satélites (0 a 12) não estão escritas. …
- A T13 desenha o mesmo 13,8 V em escala 10–16 (marcador em 63,3%) e a T07 em 11–16 (marcador em 56%). Um componente só não reproduz as duas referências.
- Copiar o HTML do 01 reproduz o bug: a faixa sem flex-shrink: 0 encolhe para 51,4px e os blocos descem 13,4px. Corrigir desvia da referência aprovada.
- Transformação de texto sem regra: 'Tensão do alternador' vira 'Alternador'; '12,0 a 15,0 V' vira '12,0 — 15,0'; '−40 a 120 °C' vira '−40 a 120'; '4 ou mais' vira 'mínimo 4'. Derivar do mock quebra o textos.md; copiar do …
- translateX em % se refere ao marcador de 4px, não ao trilho: animar direto no marcador não chega ao valor.
- Os números dos cartões pequenos em 22px só têm o token --t-titulo-tela ('um por tela'). As unidades em 11px (°C, %) e o km em 13px contradizem --n-unidade-p = 12px (tokens.css:72).

<details><summary>Medidas reais lidas no HTML · 14 peças</summary>

| Peça | Medida |
|---|---|
| barra do sistema | 360×30 · fundo #16131D (--fundo-faixa) · padding 0 14 0 18 · hora 14/500, letra 0,1 · … |
| faixa · sessão aberta | 360×52 (y 30–82) · borda de baixo 1 --separador · padding 0 16 · LED 8×8 raio 4 lima em … |
| conteúdo | y 82–659 (577) · padding 14 16 16 16 · coluna com gap 6 · overflow hidden |
| cabeçalho com contador | linha 328×26 em y96 · h1 22/700, letra −0,3 · contador 13/600 #A9A2BC + 'de 12' #867E9A; … |
| leitura na faixa (bateria) | 328×143,6 em y128 · padding 10 14 · gap 8 · rótulo 10/700, letra 1,5 · número 48/700, … |
| fora da faixa (01) | 328×157,6 (+14) · gap 6 (era 8) · número em y156,4 · trilho em y208 · faixa left 33,3%, … |
| tambor | 328×96 em y277,6 · padding 10 14 12 14 · gap 8 · 6 células de 42,3×52 com gap 2, 34/700, … |
| grade de meia largura | 2 colunas de 159 · gap 10 · linhas 379,6–463,6 e 473,6–557,6 (84 cada). No 01, y393 e … |
| leitura pequena · com mínimo · sem faixa | 159×84 · padding 10 · gap 6 · número 22/700, altura de linha 1 · unidade 11/500 #A9A2BC, … |
| sinais liga-desliga | 159×84 · padding 10 · gap 10 centrado · linhas de 17 em y488,1 e y526,1 · rótulo 12 … |
| instrumentos apagados | 328×56 em y571 · fundo --fundo-apagado · borda 1 tracejada --divisoria · padding 10 12 · … |
| rodapé · duas ações | 360×141 (y 659–800) · borda de cima 1 --borda-rodape · padding 14 16 24 16 · gap 6 · … |
| estados 02 e 03 contra o 00 (Lei 3) | Todos os blocos nas mesmas coordenadas do 00: faixa 52, bateria y128/143,6, tambor … |
| estado 01 contra o 00 (Lei 3) | faixa 52 → 51,4 · título y96 → 95,4 · bateria 143,6 → 157,6 · tambor 277,6 → 291 · grade … |

</details>

<details><summary>O que se vê em cada uma das 4 referências</summary>

- `00-tela` — Sessão M2C-0417 · RKT-8H42 com LED lima; 'Dados da CAN' com 7 de 12; bateria 13,8 V com o marcador branco no meio da faixa lima 12,0 — 15,0 (escala 11,0 a 16,0); hodômetro no tambor 1 8 4 3 2 0 km com o …
- `01-estado-fora-da-faixa` — Sessão M2C-0301 · QJF-2C61; '1 reprovado' em vermelho; o cartão da bateria com borda vermelha, 10,9 V em vermelho, marcador vermelho à esquerda da faixa, escala esticada de 10,0 a 16,0 e a linha '1,1 V abaixo …
- `02-estado-sem-leitura` — Sessão M2C-0312 · PCX-9A17; '1 reprovado'; o cartão Satélites com borda vermelha, traço vermelho no lugar do 9, poço vazio com um traço e 'sem leitura · ligação'; hodômetro 1 7 6 9 0 2; bateria 13,8 igual ao …
- `03-estado-dominio-mudo` — Sessão M2C-0438 · ONK-8Q90; '1 reprovado'; o cartão Temperatura com borda vermelha, traço vermelho, poço vazio e 'Motor mudo · ligação'; bateria 13,8 V em 12,0 — 15,0, hodômetro 184320, Satélites 9, Nível 62 …

</details>

**Histórias sem referência:** **HU-T07-1 (parte 'por domínio')** — Nenhuma referência mostra domínio: não há rótulo de Geral, Sistema elétrico, GPS, Motor ou Combustível. Ignição (Geral) e Posição (GPS) dividem um cartão, e Satélites (GPS) fica longe de Posição. … · **HU-T07-2 (causas 'barramento' e 'modelo incorreto')** — As referências mostram 'veículo ou cadastro' (01) e 'ligação' (02, 03). 'barramento ou modelo', a causa que o mock reserva para o domínio mudo (mocks.js:624), não aparece em referência nenhuma: o 03 … · **HU-T08-3 (toca a T07: 'me devolve a T07 com a leitura em branco')** — Não existe referência da T07 com a leitura em branco nem com o contador no começo; as 4 referências são quadros finais.

---

### T08 · Refazer leitura da CAN

**1 · O que ela faz.** Mostra os doze sinais que vão sumir e garante o que não se perde. No toque, apaga só o que o módulo leu do ônibus e relê sinal por sinal, no mesmo lugar, até os doze voltarem. Depois leva o técnico à T07.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema* · *faixa · sessão aberta* · *duas ações* · *uma ação* · *processo correndo* · *mostrador · apagado* · *mostrador · relendo* · *mostrador · aceso*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sem ação — a folha desenha só LED, serial e placa, sem ENCERRAR; as 3 referências têm o ENCERRAR (00-tela.html:31, 01:31, 02:31) · com legenda — nenhuma referência tem a linha de 12px acima do botão · a marca no login — ausente nas 3 · campo — ausente nas 3 · campo focado — ausente nas 3 (a caixa NADA SE PERDE lembra: rótulo lima e traço lima embaixo, mas não é campo, não tem entrada e mede 91, não 54) · cartões de foto — ausente: a T08 não tem visor de 46; só repete a grade de 3 colunas com gap 8.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - Caixa 'NADA SE PERDE': poço com a base em traço lima de 2px, rótulo em lima e uma frase alinhada à esquerda. A peça mais próxima é a 'prova da cadeia' da folha 7, mas ela centraliza o … — *00-tela.html:88-91 · PNG y 1100–1282* · 328×91 · padding 14 · rótulo 10/700 ls 1.5 #AAEF00 · frase 14/400 lh 1.55 #A9A2BC · topo 1 #06050A, lados 1 …
  - Placar da releitura 'LENDO O BARRAMENTO 5 de 12' / 'LEITURA REFEITA 12 de 12'. A peça mais próxima é 'com contagem' (folha 4), mas ela tem poço de 26 com glifo, rótulo de 10 e padding … — *01-momento-relendo.html:88-91 · …* · 328×54 no 01 (base 1px #332C49) · 328×55 no 02 (base 2px #AAEF00) · padding 14 · rótulo 11/700 ls 1.4, …
  - O primário (normal e pressionado), o primário desabilitado e o link. Estão desenhados na folha-1 HTML ('primário · normal', 'primário · desabilitado', 'link · normal e pressionado'), mas a … — *00:94-95 · 01:94 · 02:94-95* · primário 328×56 raio 4 #402070 texto #AAEF00 17/700 · desabilitado #1A1726 borda #2B2540 texto #867E9A · …
  - Cabeçalho com título e frase, sem contador. componentes.md só tem os cabeçalhos com contador (neutro e de falha, folha 6) — *00-tela.html:34-37 e o mesmo nas 3* · h1 22/700 ls −0.3 · frase 14/500 #A9A2BC lh 1.45 · gap 4
  - A grade 3×4 de mostradores, o elemento-assinatura. A folha desenha o mostrador sozinho, com 328 de largura — *00-tela.html:38 · PNG linha y=470: cartões em x 32–240, …* · 3 colunas minmax(0,1fr), gap 8 · cada uma 104×88 · y 160–536
  - Faixa de sessão com ENCERRAR e sem a linha de baixo, uma variante sem peça (a T06, a T11 e a T12 também a usam) — *00-tela.html:24 · PNG x=700: #16131D até y 164, sem a …* · 360×52 · sem border-bottom

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | Semente do herói: M2C-0417 + RKT-8H42 → a-01 → ma-01. A grade sai de ma-01.sinaisCan, os 12 em mostrador · apagado, na ordem 'estático antes do dinâmico dentro do domínio' (G3). 'doze' = sinaisCan.length por extenso. Rodapé: … | M.ativos[a-01] (modeloAtivoId ma-01, moduloSerial M2C-0417) → M.modelosAtivo[ma-01].sinaisCan[].rotulo (12 itens, mocks.js:587-600). A frase de NADA … | confere |
| `01-momento-relendo` | momento | Processo do fluxo, sem caso. A cada batida, o próximo sinal (na ordem da grade) passa de apagado a relendo. O valor vem de lido nos estáticos e de lidoDinamico nos dinâmicos. Placar = acesos de sinaisCan.length. A referência é o … | ma-01.sinaisCan: ignicao.lido 'ligada', hodometro.lido '184.320 km', bateria.lido '13,8 V' (mocks.js:587-589) · alternador.lidoDinamico '14,1 V' e … | confere |
| `02-momento-concluida` | momento | Fim do processo: os 12 em mostrador · aceso (padding 8/6), o placar vira veredito (rótulo e base em lima) e o rodapé volta a duas ações. 'Ver os dados da CAN' leva à T07 com os valores já no lugar (G10). | lido: satelites '9', posicao 'fixa', temperatura '31 °C', nivel '62 %' (mocks.js:593-598) · lidoDinamico: re 'acendeu', rotacao '1.180 rpm', consumo … | **não confere** — Rotação '980 rpm' e Consumo '24,8 L/h' não existem no mock: um grep por 980 e 24,8 em 04-dados/mocks.js não acha nada; o mock dá 1.180 rpm e 9,4 L/h. São números … |

**4 · Cada movimento.**

- **valores lidos → traço (animacao.md:7 · a releitura começa · 150ms · esmaece · …** — Duas camadas sobrepostas em cada mostrador, apagada e acesa, na mesma caixa. No toque em 'Refazer a leitura', os 12 juntos: a camada acesa vai de opacity 1 a 0 e a apagada de 0 a … ⚠ Não há quadro de começo. A 00-tela já mostra os doze em traço (00-tela.html:39-86), então não há valor pra esmaecer: com as referências como estão, a linha não faz …
- **valores novos (animacao.md:8 · cada leitura chega · 'como na T07: marcador …** — Na batida do processo (G5), cada sinal na ordem da grade: a camada acesa vai de opacity 0 a 1 em var(--mov-lento) com var(--mov-curva), e o placar troca o número no lugar, sem … ⚠ Inviável como está escrito. O mostrador da T08 não tem barra, então não tem marcador, e o hodômetro é texto de 17px ('184.320 km', 01-momento-relendo.html:44), não …

**5 · O que pode dar errado.**

- Montar a grade direto de sinaisCan, na ordem do mock, põe Rotação antes de Temperatura, e o print não bate com o PNG (A5).
- Ler Rotação e Consumo do mock imprime 1.180 rpm e 9,4 L/h, e o print diverge. Digitar 980 e 24,8 quebra o contrato. Não há saída limpa sem decisão (G1).
- Um ativo de 8 sinais chega na T08: o a-09 KNB-5H39 (ma-02, Várzea, M2C-0371), pela porta natural da T06. A grade fica 3+3+2, sem referência, e 'Os doze sinais' mente se o texto for fixo.
- O rodapé muda de altura (141 → 103 → 141) e o botão desce e sobe 38px sob o dedo. Se alguém animar essa troca, move layout, o que é proibido. E um toque no fim do processo pode cair em 'Ver os dados da CAN', que nasce em y …
- O nome do mostrador desce 1,2px quando o traço (22×1) vira valor (17×1,15). Com duas camadas em crossfade, o nome precisa ficar fora delas, senão aparece em dobro ou pula.
- Timers do processo: tem que ser cadeia determinística, sem Date.now, e cancelar ao sair (ENCERRAR, gesto de voltar, palco pulando de tela). Senão um sinal acende em outra tela ou a T08 volta pela metade.
- Pra comparar o print do 01 com a referência, o processo precisa congelar em '5 de 12'. Sem um jeito declarado de parar no quadro, o ciclo não fecha a comparação.
- A folga até o rodapé na 00-tela é de 18px (mínimo 16) e o conteúdo tem overflow hidden. Se a Barlow não carregar e a frase de NADA SE PERDE quebrar em 3 linhas, a caixa passa a ~112 e é cortada.
- A T07, aberta por 'Ver os dados da CAN', pode rodar o marcador de zero e o tambor, como na leitura dela. Isso seria 'contar de zero ao abrir', proibido.

<details><summary>Medidas reais lidas no HTML · 15 peças</summary>

| Peça | Medida |
|---|---|
| barra do sistema | 360×30 · #16131D (--fundo-faixa) · padding 0 14 0 18 · '14:30' 14/500 ls 0.1 #F2F0F7 · … |
| faixa de sessão | 360×52 · #16131D · padding 0 16 · LED 8×8 raio 4 #AAEF00 · gap 10 · serial 16/700 ls 0.3 … |
| área de conteúdo | y 82–659 · padding 14 16 16 16 · gap 14 · overflow hidden |
| cabeçalho | h1 22/700 ls −0.3 (--t-titulo-tela) · frase 14/500 #A9A2BC lh 1.45 · gap 4 · y 96–147 |
| grade de mostradores | 3 colunas, gap 8 · cada mostrador 104×88 · 4 linhas · y 160–536 · x 16–120, 128–232, … |
| mostrador · apagado | #131019 · borda 1 tracejada #241F33 · raio 4 · padding 8/8 · gap 4 · min-height 88 (sem … |
| mostrador · relendo | #1A1726 · borda 1 sólida #2B2540 · padding 8/8 (miolo 86) · valor 17/700 lh 1.15 #F2F0F7 … |
| mostrador · aceso | igual ao relendo, mas padding 8/6 (miolo 90) |
| onde o mostrador muda (Lei 3) | A caixa fica no mesmo lugar nas 3. O nome sobe 1px ao acender: y 408 → 406 no PNG 2×. … |
| caixa NADA SE PERDE (00) | 328×91 · y 550–641 · poço #0B0910, topo 1 #06050A, lados 1 #14111C, base 2 #AAEF00 · … |
| placar da releitura (01/02) | 328×54 (01) e 328×55 (02), topo fixo em y 550 · padding 14 · rótulo 11/700 ls 1.4 · … |
| rodapé duas ações (00, 02) | 360×141 · y 659–800 · topo 1 #221D2E · padding 14 16 24 16 · gap 6 · primário 328×56 em … |
| rodapé do relendo (01) | 360×103 · y 697–800 · padding 14 16 32 16 · botão 328×56 em y 712–768, #1A1726, borda … |
| folga até o rodapé | 00: 18px (641 → 659) · 01: 93px · 02: 54px · mínimo 16 cumprido |
| valores sem token | min-height 88 · line-height 1 / 1.15 / 1.3 / 1.45 / 1.55 (tokens.css não tem … |

</details>

<details><summary>O que se vê em cada uma das 3 referências</summary>

- `00-tela` — Faixa M2C-0417 · RKT-8H42 com ENCERRAR. Título 'Refazer leitura da CAN'. Grade 3×4 com doze mostradores tracejados, cada um com um traço no lugar do valor e o nome embaixo. Caixa-poço 'NADA SE PERDE' em lima, …
- `01-momento-relendo` — Título 'Lendo a CAN'. Os cinco primeiros mostradores acesos (ligada · 184.320 km · 13,8 V · 14,1 V · 38 km/h), os outros sete ainda em traço. Placar cinza 'LENDO O BARRAMENTO 5 de 12'. Rodapé mais baixo, com …
- `02-momento-concluida` — Título 'Leitura refeita' e 'Os doze sinais responderam.'. Os doze acesos: ligada, 184.320 km, 13,8 V, 14,1 V, 38 km/h, acendeu, 9, fixa, 31 °C, 980 rpm, 62 %, 24,8 L/h. Placar 'LEITURA REFEITA 12 de 12' em …

</details>

**Histórias sem referência:** **HU-T08-4 — Sem mapa declarado, a ferramenta fica indisponível com motivo** — Nenhuma referência mostra: a T08 tem 0 estados, e a T04 mostra 'Refazer leitura' sempre liberada com sessão (T04 textos.md:7, 19, 23). O dado existe (ma-03, mapaContadores.declarado false com … · **HU-T08-3 — Após o reset, o app relê e me devolve a T07 com a leitura em branco (parcial)** — O 01 e o 02 mostram a releitura. A volta à T07 'com a leitura em branco' não tem referência, e a pasta desenha o contrário: a T08 preenche os doze e 'Ver os dados da CAN' leva à 'T07 com a leitura …

---

### T09 · Configurar módulo

**1 · O que ela faz.** Grava no módulo os seis passos da cadeia, um de cada vez, sem nada pra escolher. Só passa pro próximo quando o módulo devolve o que foi escrito. Enquanto a Conexão não está gravada, o técnico não sai.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema* · *faixa · sessão aberta* · *processo correndo* · *duas ações* · *uma ação* · *a pré-condição dos pinos* · *cadeia recusada* · *cadeia concluída* · *processo parado* · *aviso* · *com contador neutro* · *prova da cadeia*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sem ação (as 5 referências têm o ENCERRAR, e essa peça é a do encerramento) · com legenda (a legenda vai em cima do botão; a frase da 00 embaixo do botão faz parte de 'processo correndo') · falha (o aviso vermelho com sem-sinal da folha 4. O 01 usa 'processo parado') · encerrando (a cadeia de 8 passos da T16) · pede o corte (T16) · sem homologar (T16) · com contador de falha · a marca no login · campo · campo focado.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - elo gravando: quadrado de agora dentro do poço, trilho do elo em --tinta, nome e valor `gravando` em --tinta. O glifo 'agora' está desenhado na folha 3, mas nenhuma peça de cadeia mostra o … — *00 · Leitor* · poço 34×34 · quadrado 14×14 #F2F0F7 · trilho 2×52 #F2F0F7 · valor 13px 700
  - elo pausado: glifo sem sinal neutro no poço, valor `pausado` em --tinta — *02, 03 · Leitor* · poço 34 · glifo 20 #A9A2BC traço 2.2 · linha 68
  - elo à espera: círculo --marca, nome e valor em --tinta-apagada, com a versão ainda não gravada à direita (E05, C03) — *00 · Eventos, Conexão* · glifo 20 #4E475E · trilho #241F33 · linha 86 (a última 38 → 55,2)
  - elo pendente com traço no poço e valor `—`, mantendo a descrição do bloco (é outro desenho: o da 'cadeia recusada' troca a descrição por `não foi alcançado`) — *02, 03 · Eventos, Conexão* · traço 10×1 #332C49 · valor 13px 700 #867E9A
  - a cadeia correndo inteira: nenhuma folha tem a cadeia no meio da gravação — *00* · linha min-height 86 · texto padding 4/0/14 · trilho 52
  - a cadeia pausada inteira (três feitos, um pausado, dois pendentes) — *02, 03* · linha min-height 68 · texto padding 4/0/12 · trilho 34
  - os glifos de estado ok, xis, traço, espera, sem sinal neutro, pausa e agora. Estão em 'os glifos por natureza' da folha 3, mas a tabela da folha 3 em componentes.md tem só 3 linhas … — *00, 01, 02, 03, 04* · 20px no elo, 16px no aviso, 14px nos pinos · traço 2.2

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | Sessão do herói. Os 6 elos vêm de cadeia.ordem, com o nome de cadeia.rotulos. O quadro tem 3 confirmados (limpeza, ativo, cercas) e o corrente é o leitor. Valor: `feita` na limpeza e cadeia.versoes[bloco] nos outros; `gravando` … | M.ativos[a-01] {placa RKT-8H42, moduloSerial M2C-0417} · M.cadeia.ordem · M.cadeia.rotulos · M.cadeia.versoes {ativo A12, cercas G07, eventos E05, … | confere |
| `01-estado-bloco-recusado` | estado | Caso bloco-recusado com o par a-02/M2C-0301. ordem.indexOf('cercas') = 2 dá 2 confirmados e o 3º recusado. Os 6−2−1 = 3 seguintes ficam não alcançados, e a frase é `Cercas foi recusado` (rotulos.cercas). | M.casos["bloco-recusado"] {ativoId a-02, moduloSerial M2C-0301, bloco cercas, motivo} · M.ativos[a-02].placa QJF-2C61 · … | **não confere** — A causa no PNG é `os pontos das áreas não voltaram` e o motivo do mock é `O módulo não confirmou os pontos das áreas.` (mocks.js:675). E a-02 tem 0 regiões em … |
| `02-estado-queda-na-cadeia` | estado | Caso queda-na-cadeia com o par a-03/M2C-0312. ordem.indexOf('leitor') = 3 dá 3 confirmados; contador 3 de ordem.length = 6; `três primeiros` = 3. O rótulo LEITOR vem de rotulos.leitor, em caixa alta. | M.casos["queda-na-cadeia"] {ativoId a-03, moduloSerial M2C-0312, noBloco leitor} · M.ativos[a-03].placa PCX-9A17 · M.cadeia.ordem/rotulos/versoes | confere |
| `03-estado-recuperacao-ate-a-conexao-gravar` | estado | M.casos["queda-na-cadeia"] mais uma marca 'tentou sair' no estado único. O `Conexão` do aviso é rotulos.conexao, o bloco que ainda não confirmou. | M.casos["queda-na-cadeia"]: não tem chave própria. estados.md:10 e logica.md:153 dizem 'derivado do fluxo' | confere |
| `04-momento-cadeia-concluida` | momento | Herói com os 6 confirmados. A string é cadeia.ordem sem a limpeza, trocada por cadeia.versoes e juntada com '.'. `seis blocos` = ordem.length. | M.cadeia.versoes · M.cadeia.ordem · M.ativos[a-01]. O índice diz 'caso cadeia', mas não é chave de M.casos: é a coleção de topo M.cadeia | confere |

**4 · Cada movimento.**

- **elo da cadeia · o bloco começa a gravar** — Troca direta, sem duração. No poço, o círculo de espera vira o quadrado de agora (14×14 --tinta), o trilho do elo vira --tinta, o nome vai pra --tinta e o valor vira `gravando`. … ⚠ Não viola nada. Mas a linha não declara o trilho branco nem a troca de tinta do nome e do valor que a 00 mostra: isso fica implícito.
- **elo da cadeia · o read-back confirma** — O check aparece por opacity 0→1 em cima do quadrado, que vai 1→0, com var(--mov-rapido) e var(--mov-curva). O valor troca direto pra cadeia.versoes[bloco]. O ritmo é 1s por … ⚠ Nenhum: 150ms é o token --mov-rapido e 1s é o ritmo declarado de processo (movimento.md:33).
- **trilho · um elo confirma** — Camada lima de 2px por cima do trilho branco, com transform scaleY(0→1), transform-origin top, var(--mov-lento) e var(--mov-curva). Dispara junto com o check. O próximo bloco … ⚠ Não viola nada, e 300ms é o --mov-lento. Fica em aberto se o próximo bloco espera o trilho terminar: ver decisões.
- **elo recusado · o módulo recusa** — O glifo X e a tinta vermelha do nome, do valor e da descrição trocam direto (cor não é transform nem opacity). O aviso entra com opacity 0→1 em var(--mov-rapido) e … ⚠ (1) 'esmaece' não é curva: movimento.md:12 só tem --mov-curva ou linear. (2) O aviso que surge empurra a cadeia 58,3px (topo em y 156,7 → 215) e baixa os elos de 86 → …

**5 · O que pode dar errado.**

- Copiar as referências ao pé da letra traz 5 alturas de elo (86, 70, 68, 68, 72). Na única transição que roda no fluxo, 00 → 04, as linhas pulam: Eventos vai de y 500,7 → 445,1 e Conexão de 586,7 → 517,1, sem movimento declarado
- Copiar o 01 leva a linha dos pinos pra fora do conteúdo: x=0, colada no rodapé em y 645–659
- A faixa sem flex-shrink:0 encolhe quando o conteúdo estoura (50,7 na 00, 51,1 na 04). O técnico vê a faixa 'mexer' entre telas, e o movimento.md:16 manda ela ficar parada
- O conteúdo tem overflow:hidden e o 01 é o quadro mais cheio (aviso de 2 linhas + duas ações). Qualquer crescimento de texto ou fonte (pendência da fonte aumentada) corta o último elo em silêncio
- Se o estado vier com key diferente ou outro componente, a cadeia se remonta, o timer reinicia e a Lei 3 quebra
- Timer da cadeia: sair da tela, abrir o 03 ou recomeçar precisa cancelar os timeouts. Voltar à T09 não pode dobrar a cadeia. Nada de Date.now
- Ler M.casos["bloco-recusado"].motivo põe na tela um texto diferente do textos.md
- Sem decisão sobre o ENCERRAR, o protótipo aborta a sessão (logica.md:61) com o módulo sem Conexão, o contrário da HU-T09-9
- Sem decisão sobre o `Calibrar`, o executor inventa texto (proibido) ou quebra o caminho T09 → T10 descrito em fluxos.md:10

<details><summary>Medidas reais lidas no HTML · 17 peças</summary>

| Peça | Medida |
|---|---|
| tela | 360×800, flex column, fundo #0F0D14 |
| barra do sistema | 30 de altura · #16131D · padding 0 14 0 18 · hora 14px 500 ls 0.1 · ícones 15×11, 15×11, … |
| faixa · sessão aberta | 52 declarado, mas 50,7 no render da 00 e 51,1 na 04 (sem flex-shrink:0). 52 no 01, 02 e … |
| conteúdo | padding 14 16 16 16 · gap 14 na 00 e 04, 12 no 01/02/03 · overflow hidden |
| título | h1 22px 700 ls −0.3 · caixa de 26 · y 94,7 na 00, 96 no 01/02/03, 95,1 na 04 |
| a pré-condição dos pinos | 12px 600 #A9A2BC · ícone 14 #AAEF00 traço 2.2 · gap 6 · margin-top −6 · caixa de 14 · y … |
| elo da cadeia · linha | min-height 86 (00), 70 (01), 68 (02/03), 72 (04) · coluna do poço 34 + gap 12 · texto … |
| poço do elo | 34×34 #0B0910 · borda de cima #06050A, de baixo #332C49, dos lados #14111C · glifo 20 … |
| trilho | 2px · lima #AAEF00 nos feitos, #F2F0F7 no que grava, #241F33 nos pendentes · comprimento … |
| texto do elo | nome 16px 600 (#F2F0F7 ou #867E9A) · valor 13px 700 #A9A2BC (tinta no corrente, vermelho … |
| aviso (01 · processo parado) | 69 de altura em y 134 · padding 10 12 · gap 12 · poço 26 · ícone 16 #E06A5A · rótulo … |
| aviso (02/03 · aviso) | 68 de altura em y 154 · mesmo desenho, rótulo #A9A2BC, ícone #A9A2BC, sem traço |
| contador neutro | 13px 600 #A9A2BC + `de 6` #867E9A, alinhado pela linha de base com o h1 |
| prova da cadeia | 89 de altura em y 586,3 · padding 12 14 · gap 6 · rótulo 10px 700 ls 1.5 #AAEF00 · … |
| rodapé · processo correndo (00) | y 659, 141 de altura · borda de cima 1px #221D2E · padding 14 16 24 16 · gap 6 · botão … |
| rodapé · duas ações (01/02) | y 659, 141 de altura · primário 56 #402070 com texto #AAEF00 17px 700 · link 48 margin … |
| rodapé · uma ação (03/04) | y 697, 103 de altura · padding 14 16 32 16 · primário 56 |

</details>

<details><summary>O que se vê em cada uma das 5 referências</summary>

- `00-tela` — Cadeia no meio. Limpeza, Ativo e Cercas estão com check e trilho lima. Leitor tem o quadrado branco, `gravando` e o trilho branco. Eventos e Conexão aparecem apagados, com círculo e E05/C03 em cinza. No pé, o …
- `01-estado-bloco-recusado` — No topo, o aviso vermelho `A CADEIA PAROU`. Limpeza e Ativo com check. Cercas com X vermelho, `recusado` e a causa em vermelho. Os três seguintes com traço no poço e `não foi alcançado`. A linha dos pinos …
- `02-estado-queda-na-cadeia` — `3 de 6` ao lado do título. Aviso cinza com o sem-sinal: `A CADEIA PAUSOU NO LEITOR`. Os três primeiros com check e a versão. Leitor com o sem-sinal no poço e `pausado`. Eventos e Conexão com traço no poço e …
- `03-estado-recuperacao-ate-a-conexao-gravar` — O mesmo quadro do 02 (M2C-0312, PCX-9A17, 3 de 6, Leitor pausado). O aviso muda para pausa `A CONEXÃO AINDA NÃO FOI GRAVADA`. O rodapé fica com um botão só, `Continuar a gravação`, sem saída. O ENCERRAR segue …
- `04-momento-cadeia-concluida` — Os seis elos com check lima e trilho lima, com A12 G07 L02 E05 C03 à direita. Embaixo, o cartão de prova `GRAVADO E RELIDO` com A12.G07.L02.E05.C03 e o traço lima. O único botão é o primário `Voltar ao menu`. …

</details>

**Histórias sem referência:** **HU-T09-7 — Ao final, read-back consolidado dos parâmetros críticos** — A 04 mostra só a string de versões e `o módulo devolveu os seis blocos`. Os parâmetros críticos do mock não aparecem em nenhuma referência da T09: M.cadeia.leituraFinal {redeDoModulo 'Mobs2 dados', … · **HU-T09-3 — O bloco 1 declara o escopo e o que apaga/preserva** — Só vale pela metade. O elo Limpeza diz `apaga a configuração anterior`, mas não nomeia o escopo ('de configuração' ou 'total') e nunca diz o que preserva (M.cadeia.escopos.*.mantem). O escopo total …

---

### T10 · Calibração

**1 · O que ela faz.** Põe o módulo para contar o mesmo que o painel do veículo. A tela mostra quanto o módulo conta hoje, quanto falta até o painel, o número que vai ser gravado e a foto que prova esse número. Ao tocar em semear, o número rola no lugar até o do painel e a releitura confirma que conferiu. As grandezas que este ativo × módulo não calibra aparecem como fato declarado.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema* · *faixa · sessão aberta* · *segmentado* · *valor em poço* · *régua da diferença* · *o valor alvo* · *foto · aguarda* · *foto · tirada* · *o que não se aplica* · *duas ações*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sem ação: a faixa das 5 referências sempre tem ENCERRAR (00-tela.html:31) · processo correndo: nenhum primário diz o que está acontecendo. O desabilitado da 02 diz a ação ('Calibrar a rotação') e não tem a linha de 40 embaixo · com legenda: nenhuma linha de legenda acima do primário · a marca no login: sem logo nem CONFIGURADOR · campo: nenhum poço de 48 com rótulo em cima · campo focado: não aparece como peça. 'o valor alvo' pega a gramática dele (rótulo lima + traço de baixo de 2px lima), mas é a peça da folha-8.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - O tambor da T10: as rodinhas rolando dentro do valor em poço, em texto de 22px e sem células. A peça 'tambor' de componentes.md:86 é outro desenho (T07 apenas): 6 células de 52px com … — *movimento 00→01 (animacao.md:7); nenhum quadro desenhado* · valor 22px/700/-0.3px, tabular; o ponto de milhar fica parado
  - Régua da diferença na variante 'confere': check lima fora de poço + texto em tinta — *01 (01-momento-hodometro-semeado.html:54)* · svg 15×15, traço 2.2, #AAEF00, gap 6; texto 13/700 #F2F0F7
  - Valor em poço aceso, o 'O MÓDULO CONTA AGORA' depois de semear — *01 (html:48-49)* · rótulo 10/700/1.5 #A9A2BC; número 22/700 #F2F0F7; unidade 12/500 #A9A2BC
  - O valor alvo já cumprido: sem traço lima e com rótulo apagado — *01 (html:58-59)* · borda de baixo 1px #332C49; rótulo #867E9A
  - Valor em poço e valor alvo vazios: traço no lugar do número, com a unidade ao lado — *02 (html:49, 60)* · '—' 22px #867E9A + 'rpm' 12px; '—' 48px #F2F0F7 + 'rpm' 18px
  - Primário desabilitado com o nome da ação e sem legenda. Não tem linha em componentes.md: a folha-1 desenha 'Gravando · não interrompa', que diz o que acontece, e a folha-2 desenha … — *02 (html:79)* · 56px, raio 4, #1A1726, borda 1px #2B2540, texto #867E9A 17/700, span sem ação
  - 'o que não se aplica' com o rótulo curto 'NÃO SE APLICAM', quando o motivo vem do módulo — *04 (html:73)* · 3 linhas de 26px, caixa y 511–627 (116px)

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | Semente a-01 + M2C-0417. porModelo['ma-01'].calibraveis = [hodometro, horimetro] dá o passo 1 de 2. Módulo = bruto/fatorEnvio. Diferença = painel − módulo. As linhas não aplicáveis vêm de porModelo['ma-01'].indisponiveis. O … | M.ativos a-01 (mocks.js:188) · M.modulos M2C-0417 CAN-BT (mocks.js:167) · M.calibracao.porModelo['ma-01'] (713) · .bruto['a-01'].hodometro 184320000 … | confere |
| `01-momento-hodometro-semeado` | momento | Parte da 00 depois do toque em Semear. Módulo = painel + tolerancia.hodometro.desvio de 120 m, que fica dentro de granularidade 100 + decorrido 40 = 140 e arredonda para 482.317 km, logo 'confere'. 'Seção B' vem de … | M.calibracao.painel['a-01'] (751) · .tolerancia.hodometro (743) · .itemChecklist.secao 'B' (771) · M.HORA_NOMINAL '14:30' | **não confere** — '14:31' não está no mock e contradiz o relógio congelado em 14:30, que é o que a própria barra do sistema deste quadro mostra (01 html:17 = 14:30). A foto aparece … |
| `02-estado-rotacao-caminhao-coletor` | estado | a-09 → ma-02. M2C-0371 é VL08 STD com pulsos:true, então a lista fica como no cadastro: [rotacao, velocidade, hodometro], 3 passos. O passo 1 é rotação, de natureza 'ajuste': 'O MÓDULO LÊ', unidade rpm, sem foto, sem leitura e … | M.ativos a-09 (mocks.js:190) · M.modulos M2C-0371 (157) · M.matrizCapacidades vl08 STD pulsos:true (147) · M.calibracao.porModelo['ma-02'] (716) · … | **não confere** — A barra desenha 2 segmentos para 3 passos: é a linha 41 da 00 copiada sem mudar. alvos.rotacao 1200 (mocks.js:726) não aparece. O 'rpm' aparece junto de traço, contra … |
| `03-estado-ja-semeado` | estado | a-09 com o passo atual forçado no hodômetro. Módulo = bruto/1000. Diferença = 87712 − 87604 = 108. ultimas['a-09'].hodometro = 27 dá 'semeado há 27 dias' e o primário 'Semear de novo' (HU-T10-7: recalcula sobre o bruto, não … | M.calibracao.bruto['a-09'].hodometro 87604000 (760) · .painel['a-09'] 87712 (752) · .ultimas['a-09'].hodometro 27 (766) · porModelo['ma-02'] (716). … | **não confere** — Os números batem. A posição não: pela ordem de porModelo['ma-02'] o hodômetro é o passo 3 de 3, e a 02 mostra o mesmo a-09 abrindo em Rotação. O mesmo dado não produz … |
| `04-estado-modulo-sem-pulsos` | estado | a-22 → ma-02 [rotacao, velocidade, hodometro]. M2C-0480 é VL06 CAN com pulsos:false, e o módulo derruba rotação e velocidade (mocks.js:721-723), o que dá [hodometro], 1 de 1. motivoSemPulsos vale para as duas derrubadas, e o … | M.ativos a-22 (mocks.js:205) · M.modulos M2C-0480 (169) · M.matrizCapacidades vl06 CAN pulsos:false (146) · M.calibracao.motivoSemPulsos (724) · … | confere |

**4 · Cada movimento.**

- **entre telas (abertura de animacao.md:3)** — opacity do contêiner de conteúdo 0→1 em var(--mov-rapido) com var(--mov-curva), disparada pela troca de tela. Barra do sistema e faixa ficam fora desse contêiner e não mexem. ⚠ Nenhum. Bate com movimento.md:16 e 07-decisoes/24.
- **tambor** — Cada dígito do valor em poço vira uma coluna 0–9 dentro de overflow:hidden, na altura da linha de 22px. Cada coluna vai por translateY até o dígito alvo em var(--mov-lento) com … ⚠ '600ms no total' não é token nem ritmo de processo declarado. movimento.md:11 dá à 'rodinha do tambor' o --mov-lento de 300ms, então os 600 só fecham com um …
- **régua da diferença** — Começa quando o tambor termina. O texto 'diferença de …' sai com opacity 1→0 e scaleX 1→0 em var(--mov-lento) com var(--mov-curva). Em seguida o check e 'relido às … · confere … ⚠ 'Encolhe até zero' não é o quadro final: a 01 nunca mostra zero, mostra outra frase. Se a leitura for contar 297.997 até 0, isso é texto mudando a cada quadro, fora de …
- **foto do painel** — Miniatura (câmera→imagem, fundo #14111C→#1A1726, borda #2E2840→#3A3350), legenda e situação ('aguarda'→'fotografada') trocam juntas por opacity em var(--mov-rapido) com … ⚠ 'A miniatura surge no lugar do aguarda' é impossível: a miniatura fica à esquerda (44px) e o 'aguarda' à direita. Na 01 não existe miniatura de foto, só o ícone de …

**5 · O que pode dar errado.**

- O valor alvo é flex-grow:1 (00-tela.html:58): a altura dele é a sobra da coluna. Qualquer diferença de métrica da Barlow ou de line-height move o número de 48px, e a comparação com o PNG falha em todos os estados. É preciso usar …
- Rodinhas por dígito com tabular-nums, letter-spacing -0.3px e o ponto de milhar: se a largura das colunas não for idêntica à do texto parado, o número pula ao trocar da animação para o texto final.
- Abrir o momento 01 pela URL (?tela=T10&estado=01-…) ou pelo palco não pode rolar o tambor: seria 'contar ao abrir'. O quadro final aparece parado.
- Hero a-01 com ultimas.hodometro = 0: se a regra do 'já semeado' ler só 'existe ultimas', a 00 vira 'semeado há 0 dias · Semear de novo' e diverge do gabarito.
- a-09 chega à T10 pelo fluxo pela porta natural da T06 (KNB-5H39). Aí cai na 02 interativa: primário desabilitado, sem valor para digitar e sem 'motor ligado' no mock. É beco sem saída.
- a-22 (estado 04) é de uma UO com pacote vencido (pac-uo-03, 8 dias). O palco precisa montar faixa, ativo e módulo desse caso sem contaminar o estado único do fluxo quando o usuário toca 'Voltar ao fluxo'.
- 'Calibrar o horímetro' não tem referência nem texto de destino. Se ele pular direto para a T14, a Seção D da T13 mostra 'HORÍMETRO 9.640 h' de uma calibração que não aconteceu.
- O cartão da foto é um div no gabarito. Torná-lo tocável (nome acessível e pressionado em --elevado) sem mudar nenhum pixel dele.
- Valores fora de token no gabarito: segmento vazio de 5px e letter-spacing 0.1/0.3/0.6/1.4/1.5/-0.3/-0.4/-1.6. Usar esses valores quebra 'nenhum valor solto'; não usar quebra a fidelidade.

<details><summary>Medidas reais lidas no HTML · 14 peças</summary>

| Peça | Medida |
|---|---|
| tela | 360×800, coluna flex, fundo #0F0D14 (--fundo-pagina), tabular-nums |
| barra do sistema | altura 30 (y 0–30), #16131D, padding 0 14 0 18; hora 14/500 letter 0.1px #F2F0F7; ícones … |
| faixa · sessão aberta | 52 (y 30–82), #16131D, borda de baixo 1px #2E2840, padding 0 16. LED 8×8 lima; gap 10; … |
| coluna de conteúdo | padding 14 16 16 16, gap 12, y 82–659. Folga do fim da caixa de não-aplicáveis (627) até … |
| segmentado | rótulo 11/700/1.4 #A9A2BC; contador 13/700 com 'de N' em #867E9A; barra de 8 com gap 2 … |
| título | h1 28/700, line-height 1.15, -0.4px (--t-titulo-proc); cerca de y 158–190, e 20px mais … |
| valor em poço | y 202–254 (52), e 182–234 na 04. Fundo #0B0910, bordas topo #06050A, baixo #332C49, … |
| régua da diferença | centro em y 274 (254 na 04); linhas 1px #241F33, gap 10, padding 0 2; texto 13/700 … |
| o valor alvo | flex-grow 1. y 294–440 (146) na 00/01; 294–551 (257) na 02; 294–466 (172) na 03; 274–414 … |
| foto · aguarda / foto · tirada | y 452–525 (73) na 00/01; 478–551 na 03; 426–499 na 04; ausente na 02. Padding 12, gap … |
| o que não se aplica | y 537–627 (90) com 2 linhas; 563–627 (64) com 1; 511–627 (116) com 3. Fundo #131019, 1px … |
| rodapé · duas ações | borda de cima 1px #221D2E em y 659; padding 14 16 24 16; gap 6. Primário 56 (y 674–730), … |
| primário desabilitado (02) | 56, raio 4, #1A1726, borda 1px #2B2540, texto #867E9A 17/700, span sem href. Varredura: … |
| Lei 3 · o que muda de lugar | 00 → 01: nenhum bloco se move (varreduras idênticas). 02: some a foto, o alvo cresce … |

</details>

<details><summary>O que se vê em cada uma das 5 referências</summary>

- `00-tela` — Faixa M2C-0417 \| RKT-8H42. CALIBRAÇÃO 1 de 2, primeiro segmento branco, 'Depois: Horímetro'. Título Hodômetro. O módulo conta 184.320 km, apagado. 'diferença de 297.997 km'. O painel mostra 482.317 km em …
- `01-momento-hodometro-semeado` — Os blocos no mesmo lugar da 00. O segmento 1 fica verde (lima-feito). 'O MÓDULO CONTA AGORA 482.317 km', aceso. Check lima com 'relido às 14:31 · confere com o painel'. O painel mostra 482.317, sem o traço …
- `02-estado-rotacao-caminhao-coletor` — Faixa M2C-0371 \| KNB-5H39. '1 de 3', mas a barra tem só 2 segmentos de 163px. 'Depois: Velocidade'. Título Rotação. 'O MÓDULO LÊ — rpm'. 'ligue o motor pra ele ler'. O painel mostra '— rpm' com rótulo e …
- `03-estado-ja-semeado` — Faixa M2C-0371 \| KNB-5H39. '1 de 3', 3 segmentos, 'Depois: Rotação · Velocidade'. Título Hodômetro. Módulo conta 87.604 km. 'diferença de 108 km · semeado há 27 dias'. O painel mostra 87.712 km, com lima. …
- `04-estado-modulo-sem-pulsos` — Faixa M2C-0480 \| RJP-1W48. '1 de 1', um segmento cheio, sem linha 'Depois'. Tudo sobe 20px. Título Hodômetro. Módulo conta 121.003 km. 'diferença de 477 km · semeado há 39 dias'. O painel mostra 121.480 km. …

</details>

**Histórias sem referência:** **HU-T10-5 — o read-back tolera granularidade + tempo decorrido** — Nenhuma referência mostra a tolerância trabalhando. Na 01, '482.317 = 482.317' com 'confere' fica igual a uma comparação estrita, porque o desvio de 120 m some na resolução de km. Não há read-back … · **HU-T10-6 — releitura obrigatória antes do ciclo dinâmico** — A 01 mostra que a releitura aconteceu ('relido às …'). Nenhuma referência mostra a obrigação: o que acontece se o técnico tentar ir ao ciclo sem reler, ou se a releitura não voltar. · **HU-T10-2 — rotação e velocidade: informo o valor lido no painel, o módulo calcula (parcial)** — Só a 02 aparece, vazia e com o primário desabilitado. Não há referência com o valor digitado, com o módulo lendo, com o fator calculado ou com o passo da velocidade. alvos (1200 rpm, 60 km/h, … · **HU-T10-3 — hodômetro e horímetro: digito e fotografo (parcial)** — O hodômetro está coberto por 00 e 01, com o valor pré-preenchido pelo mock. Não existe o passo do horímetro (2 de 2), nem o ato de digitar (campo e teclado), nem o toque 'Fotografar o painel'.

---

### T11 · Conferir configuração

**1 · O que ela faz.** Mostra, bloco a bloco, se os cinco blocos gravados no módulo batem com o cadastro, e deixa o técnico escolher entre regravar os cinco na ordem da cadeia ou só registrar o diagnóstico. Quando tudo bate, declara isso e mostra a versão lida.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema* · *faixa · sessão aberta* · *com contagem* · *linha de conferência* · *prova da cadeia* · *duas ações* · *uma ação*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sem ação (a T11 mostra o ENCERRAR em 00-tela.html:46, e a peça da folha não tem ENCERRAR) · processo correndo · com legenda (a legenda da T11 fica no conteúdo, em 00-tela.html:107, e não no rodapé a 12px do botão) · assertiva da sessão · linha do histórico · a lista de garagens · cadeia concluída · cadeia recusada · encerrando · pede o corte · sem homologar · a marca no login · campo · campo focado · linha de opção · lista com contagem.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - Cabeçalho de veredito lima 'CONFERE COM O CADASTRO' com contagem e sem poço. Não está desenhado em folha nenhuma: grep 'CONFERE COM O CADASTRO' só acha a T11 — *02-momento-tudo-confere.html:50-51* · padding 12 14 · rótulo 11px/700 ls 1.4 #AAEF00 · borda de baixo 2px #AAEF00 · '5' 20px/700 + 'de 5' 13px/500 …
  - Linha de conferência na variante 'diverge': traço no poço e valor em --tinta. A folha 4 só desenha a variante que confere — *00-tela.html:66-104 · 01* · linha 50 · poço 26 · traço 10×1 #332C49 · nome 74px 15/600 · valor 14/700 #F2F0F7 à direita
  - Nota tracejada com rótulo, borda #332C49. Todas as notas das folhas usam #241F33 ('nota com rótulo', 'nota tracejada', 'o que não se aplica', 'instrumentos apagados') — *01-estado-conteudo-que-o-app-nao-reconhece.html:106-109* · fundo #131019 · borda 1px dashed #332C49 · raio 4 · padding 10 12 · gap 2 · rótulo 10/700 ls 1.5 #A9A2BC · …
  - Legenda solta no conteúdo, embaixo da lista. Não é a 'com legenda' do rodapé — *00-tela.html:107 · 01* · 12px/500 #867E9A lh 1.45 · alinhada à esquerda · 12px abaixo da lista
  - Faixa com ENCERRAR e sem o traço de baixo. Não bate nem com 'faixa · sessão aberta' (tem border-bottom 1px #2E2840) nem com 'faixa · sem ação' (não tem ENCERRAR) — *00-tela.html:37 · 01 · 02* · 52px · fundo #16131D · padding 0 16 · sem border-bottom
  - Título da tela sem contador. As duas peças de cabeçalho da folha 6 trazem contador — *00-tela.html:49 · 01 · 02* · 22px/700 ls −0.3 · margin 0

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | A sessão vem de casos['diff-divergente'] (M2C-0438, ativo a-16, placa ONK-8Q90). As linhas são cadeia.ordem sem a limpeza, com cadeia.rotulos. O valor de cada linha é divergencias[i].noCadastro e o glifo é o traço. A contagem é … | M.casos['diff-divergente'].moduloSerial / .ativoId → M.ativos[a-16].placa · .divergencias[].noCadastro · M.cadeia.ordem e M.cadeia.rotulos | confere |
| `01-estado-conteudo-que-o-app-nao-reconhece` | estado | A 00 montada por diff-divergente, mais casos['indice-nao-classificado'] presente → a nota tracejada entra entre a lista e a legenda. posicao e motivo não aparecem na tela. | M.casos['diff-divergente'] (tudo o que vem da 00) + M.casos['indice-nao-classificado'] (só a existência; ativoId a-16 e moduloSerial M2C-0438 batem … | confere |
| `02-momento-tudo-confere` | momento | A sessão do herói vem do estado único. As linhas são cadeia.ordem sem a limpeza, com glifo check e valor em secundária. A versão é cadeia.versoes na ordem, unida por ponto. A contagem é 5 de 5 = 5 − 0 divergências. Rodapé 'uma … | Sessão: M.modulos M2C-0417 e M.ativos[a-01] (RKT-8H42) · valores: M.casos['diff-divergente'].divergencias[].noCadastro ('invertido', diz o índice) · … | **não confere** — A versão confere com M.cadeia.versoes. Mas 'tradução frota v2' é a traducaoCan de ma-02 (o a-16). O a-01 é ma-01, 'urbano v3'. 'leitor sem fio' também não é o leitor de … |

**4 · Cada movimento.**

- **linhas de conferência · o glifo no poço e o valor (animacao.md:7)** — Cada linha troca o glifo com opacity 0→1 em var(--mov-rapido) 150ms e var(--mov-curva), disparada em sequência a cada 400ms (ritmo declarado em movimento.md:34) enquanto a … ⚠ (1) 'Com reduzir movimento: aparecem juntas' contradiz movimento.md:47: o processo continua em ordem e no mesmo ritmo, só sem movimento. (2) Falta o quadro de começo. …
- **conteúdo entre telas (animacao.md:3)** — Ao entrar e ao sair da T11, só o bloco de conteúdo (do título ao rodapé) esmaece por opacity em var(--mov-rapido). Barra do sistema e faixa não se mexem. ⚠ A faixa da T11 não tem o traço de baixo das telas de fluxo (T07, T09, T10, T13–T16). Construída pela referência, a faixa muda 1px ao entrar e ao sair, contra 'ficam …

**5 · O que pode dar errado.**

- Construir a leitura animada sem quadro de começo obriga a inventar o cabeçalho sem veredito e o texto do 'processo correndo'. Nenhum dos dois está em textos.md.
- A semente M2C-0438 + ONK-8Q90 no contexto Várzea monta uma sessão que a T06 travaria ('FORA DO PACOTE DESTA UO', T06/04). Trocar para Ibura faz o menu mostrar o pacote de 4 dias (pac-uo-02), que é um aviso.
- No 02, se o executor derivar as linhas do cadastro do herói ('tradução urbano v3'), a comparação com o PNG falha. Se copiar o PNG, a tela mostra o dado do a-16 com a faixa do a-01.
- O 02 é momento e não entra na coluna do palco (palco.md:24). A semente do painel é divergente. Se a regra 'T11 aberta com a sessão do herói → tudo confere' não for escrita, o 02 fica inalcançável.
- Montar o estado 01 só com indice-nao-classificado não produz as linhas nem o '5 de 5'. Ele precisa da semente diff-divergente por baixo.
- Reusar a peça 'não se aplica' da folha 4 para a linha divergente sai errado: ela tem 38 de altura, poço 24 e valor em #867E9A. A linha da T11 tem 50, poço 26 e valor em --tinta.
- Um componente único para o cabeçalho 'com contagem', com uma prop de veredito, vai manter padding 10/12 e o poço. O 02 tem padding 12/14, rótulo 11px e nenhum poço: são 2px de diferença na lista inteira.
- A última linha tem 72 e as outras 50. Um componente de linha com altura fixa desloca 22px tudo o que vem embaixo.
- 'Só registrar o diagnóstico' não tem onde registrar: M.filaSaida não tem tipo 'diagnóstico'. Criar um item seria inventar dado. Não criar deixa a HU-T11-7 invisível.

<details><summary>Medidas reais lidas no HTML · 13 peças</summary>

| Peça | Medida |
|---|---|
| barra do sistema | altura 30 · fundo #16131D (--fundo-faixa, sangra na faixa) · padding 0 14 0 18 · hora … |
| faixa de sessão | altura 52 (--faixa-sessao) · padding 0 16 · gap 10 · LED 8×8 raio 4 #AAEF00 · serial … |
| área de conteúdo | padding 14 16 16 16 · gap 12 · flex-grow com overflow hidden |
| título | 22px/700 ls −0.3 (--t-titulo-tela) · y 96–122,4 |
| cabeçalho com contagem (00, 01) | fundo #0B0910 · bordas 1px (#06050A em cima, #14111C nos lados) · borda de baixo 2px … |
| cabeçalho no 02 (muda) | padding 12 14 · sem poço · rótulo 11px/700 ls 1.4 #AAEF00 · borda de baixo 2px #AAEF00 · … |
| lista de conferência | fundo #1A1726 · borda 1px #2B2540 · raio 4 · padding 0 12 · quatro linhas de 50 e a … |
| linha, o que muda no 02 | traço 10×1 #332C49 → check 16px #AAEF00, traço 2.2 · valor --tinta #F2F0F7 → #A9A2BC · … |
| legenda | 12px/500 #867E9A lh 1.45 · y 481,4 na 00 · y 547,6 na 01, 66px abaixo (PNG: centro em … |
| nota do estado 01 | fundo #131019 · borda 1px dashed #332C49 · raio 4 · padding 10 12 · gap 2 · rótulo … |
| prova da versão (02) | fundo #0B0910 com as bordas do poço · borda de baixo 2px #AAEF00 · padding 12 14 · … |
| rodapé duas ações (00, 01) | borda de cima 1px #221D2E · padding 14 16 24 16 · gap 6 · primário 56, raio 4, #402070, … |
| rodapé uma ação (02) | padding 14 16 32 16 · só o primário 56 'Voltar ao menu' · altura 103 · topo em y 697 … |

</details>

<details><summary>O que se vê em cada uma das 3 referências</summary>

- `00-tela` — Faixa M2C-0438 \| ONK-8Q90 com ENCERRAR. Título. Aviso vermelho 'NÃO BATE COM O CADASTRO' com X no poço e '5 de 5'. Cinco linhas com poço vazio (traço) e o valor do cadastro em branco; a linha de Conexão é …
- `01-estado-conteudo-que-o-app-nao-reconhece` — Idêntica à 00 até a lista. Entre a lista e a legenda aparece uma nota tracejada: 'HÁ CONTEÚDO QUE O APP NÃO RECONHECE · Fora de todos os blocos. Regravar limpa.' A legenda desce. O rodapé fica igual.
- `02-momento-tudo-confere` — Faixa M2C-0417 \| RKT-8H42 (a do herói). Cabeçalho lima 'CONFERE COM O CADASTRO', sem poço, com '5 de 5'. Cinco checks lima com o valor em cinza. Bloco da versão: 'VERSÃO LIDA NO MÓDULO · A12.G07.L02.E05.C03 …

</details>

**Histórias sem referência:** **HU-T11-4** — Nenhuma referência mostra o arraste. Com os cinco blocos divergindo, 'Regravar os cinco blocos' leva tudo, e o arraste parcial (M.cadeia.arraste) nunca aparece. O mock não tem caso com divergência … · **HU-T11-6** — Nenhuma referência declara o escopo 'limpeza de configuração'. A prova é só a ausência de uma opção de limpeza total. O escopo aparece depois, na T09, e não na T11. · **HU-T11-1 (parcial)** — O 02 mostra a versão lida. O caminho 'ausente ou ilegível → diff completo por conteúdo' não tem referência nem caso no mock. · **HU-T11-2 (parcial)** — 00 e 01 agrupam por bloco, mas cada linha mostra só o valor do cadastro. O que o módulo tem (divergencias[].noModulo) não aparece, e a divergência em si não se vê. · **HU-T11-3 (parcial)** — A HU pede 3 ações. As referências têm 2, porque a decisão 21 funde o 'Voltar ao menu' no 'Só registrar o diagnóstico'. A HU não foi atualizada. · **HU-T11-7 (parcial)** — O 02 declara 'CONFERE COM O CADASTRO'. Já 'o diff sobe mesmo sem reenvio' não tem rastro: não há item de fila de diagnóstico em M.filaSaida nem referência mostrando.

---

### T12 · Últimas instalações

**1 · O que ela faz.** Mostra as instalações feitas na garagem do contexto, agrupadas por idade, cada uma com o veredito. Tocar numa abre o relatório dela etapa por etapa. Sem rede, a mesma lista aparece como a última consulta, com a hora em que foi feita.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema* · *faixa · sessão aberta* · *faixa · sem sessão* · *com contador neutro* · *linha do histórico* · *aviso* · *vazio declarado* · *assertiva da sessão* · *uma ação*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sem ação · linha de conferência · a lista de garagens · cadeia concluída · cadeia recusada · encerrando · pede o corte · sem homologar · com contador de falha · a marca no login · campo · campo focado · linha de opção · linha de ônibus · lista com contagem.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - Rótulo de grupo por idade (HOJE · ONTEM · ESTE MÊS · MAIS DE UM MÊS) em cima de cada cartão. Nenhuma linha em componentes.md — *00 e 03 · 00-tela.html:39,52,65,86* · 10px/700, letter-spacing 1.5px, #867E9A, gap de 4 até o cartão
  - Cabeçalho do detalhe: placa como h1, veredito lima à direita e linha 'módulo · quando · técnico' embaixo. Não é o contador neutro nem o de falha — *01 · 01-momento-detalhe-da-instalacao.html:33* · h1 22px/700/-0.3 · veredito 13px/700 #AAEF00 · linha 13px/500 #A9A2BC · gap 4
  - Linha do histórico nas variantes 'aguardando validação' (relógio #A9A2BC, texto #F2F0F7) e 'falha reconhecida' (xis e texto #E06A5A). A folha 4 só desenha 'aprovada' — *00 e 03 · 00-tela.html:55-60 e 68-73* · veredito 12px/600 · glifo 19, traço 2.2
  - Cartão com duas linhas do histórico separadas por divisória. A folha só desenha o cartão de uma linha — *00 e 03, grupo ESTE MÊS · 00-tela.html:66-83* · divisória 1px #241F33 · cartão de 146 (2×72 + 2)
  - Faixa com ENCERRAR sem borda de baixo. Nenhuma folha desenha essa variante: 'sessão aberta' tem border-bottom 1px #2E2840, 'sem ação' não tem ENCERRAR — *00, 01, 03 · 00-tela.html:24* · 52px, sem borda
  - Glifos em poço: ok (check lima), xis (vermelho), relógio (cinza), sem sinal neutro (wi-fi cortado). Estão desenhados na folha 3, mas componentes.md (Folha 3) só tem as linhas 'escolha numa … — *00, 01, 03 · folha-3 'os glifos por natureza'* · poço 32 com glifo 19 (lista e detalhe) · poço 26 com ícone 16 (aviso)
  - Linha do histórico com a linha de baixo em 12px (linhas 3 a 5). A folha e as linhas 1 e 2 usam 11px — *00 e 03 · 00-tela.html:71,79,92 contra 45,58* · 12px/500 #867E9A contra 11px/500

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | Filtra M.instalacoes por ativos[ativoId].uoId === contextoAtivo.uoId (uo-01) e ordena por diasAtras. Cada linha: placa (M.ativos), moduloSerial e hora quando diasAtras ≤ 1, senão 'há N dias'; veredito e glifo saem do estado. O … | M.instalacoes i-01, i-02, i-06, i-08, i-10 × M.ativos a-01, a-03, a-06, a-02, a-09 .placa. M.contextoAtivo.uoId = uo-01. A faixa pede sessão … | **não confere** — Placa, serial, hora, dias, estado e contagem 5 batem com o mock (saída do node: uo-01 tem 5). Não batem: (1) ESTE MÊS agrupa 17 dias = 2026-02-23 (fevereiro) e MAIS DE … |
| `01-momento-detalhe-da-instalacao` | momento | Tocar na linha i-01 abre o detalhe. Monta de i-01.etapas: preChecagem passaram de checagens · cadeia.length com readBack confirmado · calibracao.grandeza e foto · cicloDinamico.confirmados de passos.length · checklist.concluidos … | M.instalacoes[i-01].etapas, M.ativos[a-01].placa, M.tecnico.nome | confere |
| `02-estado-nenhuma-instalacao` | estado | A mesma tela com a lista filtrada vazia: o contador vira 0, o vazio declarado ocupa o lugar dos grupos e a faixa fica sem sessão. Não há caso nem dado que produza a lista vazia. | nenhum. estados.md:9 e logica.md:158 apontam `instalacoes`, mas nenhuma UO tem zero: uo-01 5, uo-02 5, uo-03 3 (node). Só a faixa sem sessão nasce … | **não confere** — O estado não nasce do mock. Contradiz contrato.md:3 (todo estado nasce de um caso ou de um dado) e casos.md:3 (nunca desenhando o estado na mão). Muda também a sessão, … |
| `03-estado-sem-rede` | estado | Com M.situacao.rede = 'sem-conexao', o aviso nasce de casos['instalacoes-sem-rede'].consultadoAs (diasAtras 0, por isso sem data) e a lista é a mesma filtragem da 00. | M.casos['instalacoes-sem-rede'] = {consultadoAs:'11:47', diasAtras:0} (mocks.js:457), mais M.situacao.rede e M.instalacoes filtradas por uo-01 | confere |

**4 · Cada movimento.**

- **tela: o conteúdo entre a lista e o detalhe (animacao.md:7)** — No toque da linha do histórico, e no Voltar às instalações, só o nó de conteúdo abaixo da faixa troca: opacity 1→0→1 em var(--mov-rapido), curva var(--mov-curva). Barra do … ⚠ A linha em si não viola nada: token 150ms, só opacity, sem entrada animada, sem contagem, sem loop. Três ressalvas: 'esmaece' na coluna Curva não é curva (o token é …

**5 · O que pode dar errado.**

- Fixar no código os grupos HOJE/ONTEM/ESTE MÊS/MAIS DE UM MÊS, porque nenhuma regra os deriva de diasAtras. Com regra de calendário, a QJF-2C61 (17 dias, 23/02) sai de ESTE MÊS e a tela deixa de bater com a referência.
- Montar o estado 02 esvaziando a lista na mão: não há UO com zero instalações.
- Usar a 'linha de conferência' no detalhe, porque tela.md:28 a lista. A peça certa, medida, é a 'assertiva da sessão'.
- Construir a faixa com a borda de baixo da folha e divergir 1px das referências de T12, ou sem a borda e divergir das 34 referências que a têm.
- Semear T12 sem sessão, como logica.md:48, e a 00-tela sair com 'Sem sessão de configuração'.
- Tocar em PCX-9A17, RVM-1E54, QJF-2C61 ou KNB-5H39 e o detalhe quebrar ou inventar linhas: só i-01 tem `etapas`, as outras têm `resumo` com strings '6/6' e recebimento longo ('não confirmado — falha reconhecida pelo técnico').
- Escrever 'Rafael Vieira' como literal, ou pôr o técnico logado como autor de instalações de 27 dias atrás sem campo no dado.
- Pôr lima no 'aprovada' da lista (lá é --tinta-secundaria, só o check é lima) ou tirar o lima do 'aprovada' do detalhe.
- Animar a entrada do aviso na 03, ou contar o '5 nesta garagem' a partir de zero.

<details><summary>Medidas reais lidas no HTML · 16 peças</summary>

| Peça | Medida |
|---|---|
| tela | 360×800, fundo #0F0D14 (--fundo-pagina), coluna flex, números tabulares |
| barra do sistema | 30px de alto, fundo #16131D, padding 0 14 0 18, hora 14px/500 ls 0.1, ícones 15×11, … |
| faixa · sessão aberta (T12) | 52px (--faixa-sessao), fundo #16131D, padding 0 16, SEM borda de baixo. LED 8×8 raio 4 … |
| faixa · sem sessão | 52px, LED 8×8 #4E475E, texto 14px/600 ls 0.2 #867E9A, sem ENCERRAR |
| corpo | padding 14 16 16 16, gap 14 entre blocos, overflow hidden. Começa em y 82 |
| título com contador neutro | h1 22px/700 ls -0.3 · contador 13px/600 #A9A2BC mais 'nesta garagem' #867E9A · alinhado … |
| rótulo de grupo | 10px/700 ls 1.5 #867E9A · gap 4 até o cartão |
| cartão da lista | fundo #1A1726, borda 1px #2B2540, raio 4, padding 0 12. Topos em y 152 / 256 / 360 / 536 … |
| linha do histórico | 72 de alto (--linha-escolha), gap 12. Poço 32×32 com bordas #06050A (topo), #332C49 … |
| último grupo | margin-bottom 16. Na 00 o último cartão termina em y 610; o rodapé começa em 697 |
| rodapé · uma ação | padding 14 16 32 16, gap 6, borda de cima 1px #221D2E em y 697. Primário 56 de alto (y … |
| aviso (03) | poço corrido com bordas de poço, padding 10 12, gap 12, sem raio. Ícone em poço 26×26, … |
| lista na 03 (onde o estado muda) | Cartões em y 218 / 322 / 426 / 602, +66 contra a 00 (aviso de 52 mais gap de 14). O … |
| vazio declarado (02) | fundo #131019, borda 1px tracejada #241F33, raio 4, padding 22 18, gap 8. Título … |
| cabeçalho do detalhe (01) | corpo com gap 12. Bloco com gap 4: h1 22px/700 ls -0.3, veredito 13px/700 #AAEF00, linha … |
| assertiva da sessão (01) | cartão de y 154 a 506 (7×50 + 2). Linha de 50 (--linha-dupla), gap 10, poço 32 com glifo … |

</details>

<details><summary>O que se vê em cada uma das 4 referências</summary>

- `00-tela` — Faixa com sessão M2C-0417 \| RKT-8H42 e ENCERRAR. Título 'Últimas instalações' com '5 nesta garagem'. Cinco instalações em quatro grupos: HOJE RKT-8H42 aprovada, ONTEM PCX-9A17 aguardando validação (relógio, …
- `01-momento-detalhe-da-instalacao` — Mesma faixa. Título RKT-8H42 com 'aprovada' em lima. 'M2C-0417 · hoje, 11:47 · Rafael Vieira'. Cartão com sete linhas de 50 com check lima: Pré-checagem 12 de 12 · Configuração 6 blocos relidos · Calibração …
- `02-estado-nenhuma-instalacao` — Faixa 'Sem sessão de configuração' com LED apagado e sem ENCERRAR. Título com '0 nesta garagem'. Vazio declarado tracejado: 'Nenhuma instalação nesta garagem' e 'O que foi instalado em outra garagem aparece …
- `03-estado-sem-rede` — Igual à 00-tela, com um aviso cinza entre o título e a lista: poço com wi-fi cortado, 'SEM CONEXÃO' e 'Esta é a consulta das 11:47.'. A lista inteira desce 66px: HOJE em 218 (era 152) e MAIS DE UM MÊS termina …

</details>

**Histórias sem referência:** **HU-T12-1** — Parcial. A 00 mostra por ativo a última intervenção e o status geral. Posicionamento, eventos e viagens não aparecem em nenhuma das quatro referências. O mock tem os três em criteriosRegra.porEstado … · **HU-T12-2** — A janela de posicionamento (3 × intervalo + 2 min) não aparece em lugar nenhum. O dado existe: fatorJanela 3, folgaJanelaSeg 120 e intervalos 30/60/120 dos presets. · **HU-T12-3** — O teto de 10 min (criteriosRegra.tetoEsperaMin) não aparece em nenhuma referência. · **HU-T12-4** — Nenhuma referência mostra critério indisponível com motivo, e o mock não tem dado que o produza: todo preset tem intervaloRastreamentoSeg. · **HU-T12-6** — Parcial. A 00 mostra 'aguardando validação' (PCX-9A17, 22h25 atrás), mas nenhuma referência mostra a re-checagem nem o prazo de 24 h. E a RVM-1E54, em re-checagem no mock (secaoF.emRecheck), aparece …

---

### T13 · Checklist

**1 · O que ela faz.** O técnico vê, seção por seção, o que o app já provou sozinho e o que ainda falta ele provar: fotos na montagem, o ciclo no teste dinâmico. Abre cada seção para ver a prova e responde os itens manuais com foto ou com ressalva. Só finaliza quando o que bloqueia está resolvido. O servidor não bloqueia, mas se ele não passou o técnico assina a ciência.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema* · *faixa · sessão aberta* · *com contador neutro* · *placar da homologação* · *linha de seção do mapa* · *seção aberta do checklist* · *seção recolhida* · *a seção aberta inteira* · *cartões de valor* · *cartão com barra* · *cartão de configuração* · *cartões de foto* · *cartões que esperam o ciclo* · *segmentado* · *justificativa* · *campo focado* · *checkbox* · *diálogo com ciência* · *duas ações* · *com legenda* · *nota tracejada*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sem ação · processo correndo · diálogo · diálogo sem saída · linha do histórico · a lista de garagens · leitura pequena · leitura com mínimo · cadeia concluída · cadeia recusada · encerrando · pede o corte · sem homologar · com contador de falha · a marca no login · campo · linha de opção · lista com contagem.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - Cartão 'Não conforme · pede justificativa': texto à esquerda, dica à direita, sem ícone. Não é 'linha de opção' (essa tem ícone e 72) — *07* · 50 alto, borda 1px #2B2540, fundo #1A1726, raio 4, padding 0 12, margem inferior 16; texto 14/600 #F2F0F7, …
  - Visor da câmera do item manual: poço que cresce até o rodapé, ícone de câmera e a dica de enquadramento — *07, 08* · poço flex-grow, padding 16, gap 14, câmera 46 traço 1.8 #4E475E, dica 14/600 #A9A2BC; 327 de altura em 07 e …
  - Instrumento grande do item automático reprovado: poço com traço de baixo vermelho, rótulo LIDO NA CAN em vermelho, número 48 na tinta, barra 22, escala e frase. O 'fora da faixa' da folha … — *09* · poço flex-grow, padding 20 16, gap 12, border-bottom 2px #E06A5A; número 48/700 ls −1.6 + unidade 18/500; …
  - Cabeçalho de colunas SEÇÃO / RESOLVIDO sobre o mapa — *00, 11* · 10/700, letter-spacing 1.2px (valor sem token), #867E9A
  - Linha de seção do mapa com segunda linha (F · Servidor / não bloqueia). A folha 7 só desenha a de uma linha — *00, 11* · 60 alto, subtítulo 12/500 #867E9A, gap 2, sem traço de baixo (00-tela.html:97)
  - Variantes da linha do mapa: pendente (círculo #A9A2BC, contagem em #F2F0F7) e espera (relógio #6E6683, nome e contagem em #867E9A). A folha 7 só tem a aprovada. Na folha 3 o 'espera · … — *00, 11 (B e E)* · glifo 18 traço 2.2 em poço 32
  - Placar com veredito: cabeça HOMOLOGADA em lima e '12 evidências · 14:52' à direita. A folha 5 só desenha o placar em curso — *11* · linha baseline space-between, meta 12/600 #867E9A; o cartão fica 2px mais alto (11-momento-homologado.html:41)
  - Cartão com barra de faixa aberta (mínimo para cima, GPS). A folha 7 só desenha a faixa fechada (Alimentação) — *03* · barra 9 alto, faixa 37,5%→100%, marcador 3px a 56,3% (03-momento-c-hardware-aberta.html:82)

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | Semente a-01/M2C-0417. Agrupo checklist.itens (31) por secao. Resolvido = automático cuja fonte passa, ou manual com foto (ou herdada). E vem do ciclo, que não rodou na semente. Faltam = 31 − resolvidos. A barra fica em … | M.checklist.secoes, M.checklist.itens (31: A4 B5 C4 D10 E5 F3), M.ativos a-01, M.modulos M2C-0417, M.calibracao.painel['a-01'], … | **não confere** — 21, 31, 68% e Faltam 10 são aritmética (4+4+10+3). Dois erros. B deveria dar 1 de 5, porque b-painel-legivel herda a foto da calibração de a-01 (22 de 31, Faltam 9). F … |
| `01-momento-a-identificacao-aberta` | momento | Itens de A. serial = sessão; firmware = M.modulos['M2C-0417'].firmware; ativo = a-01.placa; chassi = 'confere' (ma-01.chassiPelaCan true, a-01 fora de divergencia-chassi) | M.modulos[M2C-0417] {firmware:'2.3.5'}, M.ativos a-01, M.modelosAtivo ma-01 | **não confere** — No mock o firmware é 2.3.5, e a T05 mostra 2.3.5. O v4.2.1 é inventado, e com prefixo 'v'. Ele também foi copiado para a folha 7 |
| `02-momento-b-montagem-aberta` | momento | Itens de B com foto:true. As condições leitor (ma-01.leitor existe) e calibracao (a-01 calibrou) se aplicam. b-painel-legivel vem marcado por herda:'calibracao' | M.checklist.itens b-* , M.calibracao.itemChecklist, M.modelosAtivo ma-01.leitor | **não confere** — O Painel está marcado, mas a contagem diz 0 de 5. A HU-T10-4 pede 'a origem visível na linha', e ela não aparece |
| `03-momento-c-hardware-aberta` | momento | alimentação = ma-01.sinaisCan.bateria (lido e esperado); gps = sinaisCan.satelites. Entradas e modem não têm fonte | M.modelosAtivo ma-01.sinaisCan bateria {13,8 V; 12,0 a 15,0 V}, satelites {9; 4 ou mais} | **não confere** — 13,8 e 9 batem. 4 de 4, −71 dBm e a faixa do modem não estão no mock. O marcador do GPS (56,3%, faixa a partir de 37,5%) não sai de escala nenhuma; a T07 põe o mesmo 9 … |
| `04-momento-d-configuracao-aberta` | momento | fonte bloco:x → M.cadeia.versoes[x]; conexão → leituraFinal.redeDoModulo; servidor → leituraFinal.servidor; versão → a string composta; cal:* → M.calibracao.painel['a-01'] | M.cadeia.versoes {A12,G07,L02,E05,C03}, M.cadeia.leituraFinal, M.identificadores (3), M.cercas.regioes (4 com ativoId a-01), M.calibracao.painel … | **não confere** — Batem A12, E05, Mobs2 dados, principal, 3 de 3, 482.317 km e 9.640 h. Não batem: 'sem cerca' (o mock tem 4 regiões de a-01, e a T09/04 mostra Cercas G07) e 'A12.G07', … |
| `05-momento-e-teste-dinamico-aberta` | momento | e-1..e-5 gerados de i-01.etapas.cicloDinamico.passos, com 'Movimento' encurtado por E_ENCURTA. Valor '—' porque o ciclo não rodou na semente | M.checklist.itens e-1..e-5, M.instalacoes i-01.etapas.cicloDinamico.passos | confere |
| `06-momento-f-servidor-aberta` | momento | f-evidencias e f-checklist saem de M.filaSaida por tipo e ativo a-01; f-plataforma sai de M.autotesteEncerramento.plataforma.valor | M.filaSaida f-05 (Evidências, a-01, recebida 09:14) e f-06 (Checklist, a-01, recebida 09:15); autotesteEncerramento.plataforma {valor:'na fila'} | **não confere** — O '12' não existe: a fila de a-01 tem uma evidência. 'CHECKLIST 31 de 31' já subiu com o checklist em 21 de 31. E 'na fila' conta como resolvido |
| `07-momento-responder-item` | momento | b-modulo: título = pergunta; Depois = pergunta do item seguinte (b-antena); posição = índice na seção; o 5º segmento vem feito pelo herda de b-painel-legivel | M.checklist.itens b-modulo, b-antena, b-painel-legivel | **não confere** — O título, o Depois e o 1 de 5 batem. 'INSTALAÇÃO FÍSICA' não é o rótulo do mock (secoes B = 'Montagem'), e a dica 'Enquadre o módulo…' não tem fonte |
| `08-momento-nao-conforme-com-justificativa` | momento | Estado local do item: naoConforme = true e a justificativa digitada. Salvar grava a ressalva, não bloqueia e marca a instalação como ressalvada | nenhum para o texto; M.instalacoes i-03.ressalva é outra frase | **não confere** — O texto que vem preenchido não está no mock. O próprio mock (D-21) diz que campo preenchido nasce de dado do mock |
| `09-estado-item-reprovado` | estado | O caso declarado é can-fora-esperado: a-02 (QJF-2C61/M2C-0301), velocidade 0 km/h, sinal dinâmico que não é item de C. Ele não produz esta tela. Quem produz bateria fora da faixa é can-estatico-isolado (a-02, 10,9 V) | M.casos['can-fora-esperado'] {ativoId:'a-02', sinal:'velocidade', lido:'0 km/h'}; M.casos['can-estatico-isolado'] {bateria:'10,9 V'}; … | **não confere** — 10,2 é inventado. 1,8 = 12,0 − 10,2 (sai do inventado). 10,0 e 16,0 são a escala da T07/01 (mesma convenção, sem regra escrita). A faixa mostra o herói, não a-02. E o 2 … |
| `10-estado-finalizar-com-a-secao-f-falhando` | estado | Nome = M.tecnico.nome, hora = M.HORA_NOMINAL. O caso declarado é secaoF, mas ele é a-06/i-06 em re-checagem, da T15. O caso criado para isto é pronto-para-fechar: a-09 KNB-5H39, M2C-0371, recebimento 'sem resposta' | M.tecnico {nome:'Rafael Vieira'}, M.HORA_NOMINAL '14:30', M.secaoF {ativoId:'a-06'}, M.casos['pronto-para-fechar'] {ativoId:'a-09'} | **não confere** — O nome e a hora batem. A faixa com M2C-0417/RKT-8H42 não bate com nenhum dos dois casos. O próprio mock diz que o herói 'fica com o outro caminho' |
| `11-momento-homologado` | momento | As 31 resolvidas pelo fluxo: fotos de B, ciclo de E na T14, F confirmado. Barra 100%, veredito aceso | M.checklist.itens (31); nada para '12' e '14:52' | **não confere** — 14:52 é depois do relógio congelado em 14:30. '12 evidências' não tem fonte. A cabeça do placar fica 2px mais alta e empurra a lista (PNG 476→480). O traço do rodapé … |

**4 · Cada movimento.**

- **placar** — Preenchido com largura 100% e transform: scaleX(resolvidos/31), transform-origin à esquerda. O marcador branco é uma camada à parte, com translateX em px calculado da largura … ⚠ A borda direita de 1px do preenchido escala junto e vira subpixel; ela precisa morar na camada que translada. O item conclui no nível do item (07) ou fora da tela …
- **miniatura da foto** — opacity 0→1 sobre o visor, em var(--mov-rapido), gatilho 'foto tirada'. Reduzir movimento: aparece ⚠ 'esmaece' não é curva de token; o movimento.md só tem --mov-curva e o linear. Não há quadro final: nenhuma referência mostra a foto tirada. Não há foto no mock nem em …
- **veredito** — Depois de o placar chegar a 100% (300ms), a linha HOMOLOGADA sai de opacity 0 para 1 em var(--mov-rapido). O espaço da meta fica reservado desde a 00 para não empurrar nada ⚠ A 11 muda o layout: a cabeça do placar cresce 2px e desloca a lista, e o rodapé perde a legenda, com o traço subindo 20px (639→659). Mexer no layout é proibido. O …

**5 · O que pode dar errado.**

- A faixa não tem flex-shrink:0 nas referências e se comprime quando o conteúdo transborda (49 em vez de 52 em 04/05). Construída igual, a faixa 'parada' pula entre momentos
- O conteúdo aberto de D e E passa do rodapé (Hodômetro, Horímetro e a linha F cortados, com overflow hidden). Sem regra de rolagem, o técnico não chega nesses cartões
- Montar 09 e 10 pelo caso declarado dá outra faixa, outros valores e outra posição. A comparação com o PNG falha, e 'diferença é bug seu' (06-prototipo/CLAUDE.md regra 3)
- Contagens copiadas do PNG (21, Faltam 10, B 0 de 5, F 3 de 3) em vez de derivadas do mock + sessão viram número solto e divergem no primeiro toque
- Semente × fluxo: no caminho do herói a T14 vem antes da T13, então E chega 5/5 e B tem o Painel herdado. Não há referência desse estado, nem do Finalizar habilitado
- A regra da Seção F não está escrita (quando passa, quando falha, quando fica pendente). Um erro aqui leva o herói sempre para a ciência, ou nunca
- O mapa (54/32/14) e o acordeão (44/30/13) são desenhos diferentes para o mesmo dado. É fácil fazer um componente só e quebrar um dos dois
- Acordeão sem regra: uma seção aberta por vez? Tocar na cabeça aberta fecha? Abrir não pode animar altura (seria mexer layout)
- Tirar foto não tem o que devolver: não há foto no mock nem em 05-recursos, e 'a câmera devolve a foto do mock' não tem arquivo

<details><summary>Medidas reais lidas no HTML · 22 peças</summary>

| Peça | Medida |
|---|---|
| tela | 360×800, coluna flex, fundo #0F0D14 (--fundo-pagina) |
| barra do sistema | 30 alto (sem token), padding 0 14 0 18, fundo #16131D; hora 14/500 ls 0.1; ícones 15×11 … |
| faixa · sessão aberta | 52 alto (--faixa-sessao), fundo #16131D, traço de baixo 1px #2E2840, padding 0 16; LED … |
| área de conteúdo | padding 14 16 16 16, gap 12, overflow hidden |
| título + contador | h1 22/700 ls −0.3 (--t-titulo-tela); contador 13/600 #A9A2BC com 'de 31' #867E9A |
| placar da homologação | cartão #1A1726, borda #2B2540, raio 4, padding 12 14, gap 8; rótulo 10/700 ls 1.5; barra … |
| cabeçalho SEÇÃO/RESOLVIDO | 10/700 ls 1.2 #867E9A; y≈235 na 00 e ≈237 na 11 |
| linha de seção do mapa | 54 alto (F 60), gap 12, traço 1px #241F33 (F sem traço); poço 32, glifo 18 traço 2.2; … |
| rodapé | padding 14 16 24 16, gap 6, borda de cima 1px #221D2E em y 639 (00–06) e 659 (07–11); … |
| primário desabilitado / ativo | desabilitado: fundo #1A1726, borda #2B2540, 17/700 #867E9A. Ativo: #402070, 17/700 … |
| acordeão (01–06) | cartão #1A1726 padding 0 12; linhas 44 (--linha-padrao), poço 30, gap 10, contagem … |
| cartão de valor / configuração | padding 10, gap 6; rótulo 10/700 ls 1.5 #867E9A lh 1.25; valor 18/700 lh 1 (18 só existe … |
| cartão com barra | barra 9 alto em poço; faixas de 33,3–83,3% (bateria, escala 10–16), 37,5–100% (GPS) e … |
| cartão de foto | padding 8, gap 6; visor 46 em poço; nome 12/600 (#F2F0F7; Painel #A9A2BC); check 20 … |
| cabeça do nível do item (segmentado) | rótulo 11/700 ls 1.4 #A9A2BC; contador 13/700; segmentos gap 2 em 8 de altura (atual 8 … |
| título do item | 28/700 lh 1.2 ls −0.4 (--t-titulo-proc); começa em y≈165 na 07 e ≈145 na 09 (sem a linha … |
| visor da câmera | poço flex-grow, padding 16, gap 14; câmera 46 traço 1.8; dica 14/600; y 237–564 na 07 e … |
| Não conforme (07) | 50 alto, borda #2B2540, fundo #1A1726, padding 0 12, margem de baixo 16; 14/600 + dica … |
| justificativa (08) | marcador 24 com quadrado 10 lima, 48 de toque, gap 12; rótulo 10/700 lima; campo min 48, … |
| instrumento do item reprovado (09) | poço flex-grow, padding 20 16, gap 12, traço de baixo 2px #E06A5A; rótulo 10 #E06A5A; … |
| nota tracejada (09) | fundo #131019, 1px dashed #241F33, raio 4, padding 12, gap 4; rótulo 10/700 #867E9A; … |
| diálogo com ciência (10) | véu rgba(6,5,10,.72) só abaixo da faixa, padding lateral 16 (na T04 é 20); caixa … |

</details>

<details><summary>O que se vê em cada uma das 12 referências</summary>

- `00-tela` — O mapa: Checklist 21 de 31. Placar HOMOLOGAÇÃO a 68% com 21 DE 31 CONFERIDOS em lima. Seis linhas: A, C, D e F com check lima; B com círculo, 0 de 5; E apagada, relógio, 0 de 5; F com 'não bloqueia'. Rodapé: …
- `01-momento-a-identificacao-aberta` — A aberta no acordeão com quatro cartões: SERIAL M2C-0417, FIRMWARE v4.2.1, ATIVO RKT-8H42, CHASSI confere. O placar e o cabeçalho SEÇÃO somem, e as outras seções ficam recolhidas num cartão
- `02-momento-b-montagem-aberta` — B aberta com cinco cartões de foto. Módulo, Antena GPS, Chicote e Leitor têm traço no visor. Painel tem check lima e o nome apagado. A cabeça diz 0 de 5
- `03-momento-c-hardware-aberta` — C aberta: ALIMENTAÇÃO 13,8 V com barra; GPS E ANTENA 9 sat com faixa aberta; ENTRADAS DIGITAIS 4 de 4 sem barra; MODEM E SINAL −71 dBm com barra
- `04-momento-d-configuracao-aberta` — D aberta: LIMPEZA feita, TRADUÇÃO DA CAN A12, PONTOS DE CERCA sem cerca, IDENTIFICADORES 3 de 3, EVENTOS E05, REDE DO MÓDULO Mobs2 dados, ENDEREÇO principal, VERSÃO GRAVADA A12.G07. HODÔMETRO e HORÍMETRO …
- `05-momento-e-teste-dinamico-aberta` — E aberta com cinco cartões em traço: IGNIÇÃO LIGADA, MOVIMENTO, RÉ ACIONADA, PORTA ABERTA, IGNIÇÃO DESLIGADA. F fica cortada pelo rodapé. Não há caminho para o ciclo
- `06-momento-f-servidor-aberta` — F aberta: EVIDÊNCIAS 12 subiram, CHECKLIST 31 de 31, ID NA PLATAFORMA na fila (com traço). A cabeça F diz 3 de 3, com check
- `07-momento-responder-item` — Nível do item: B · INSTALAÇÃO FÍSICA 1 de 5. Segmentado com o 1º atual branco e o 5º feito. 'Depois: Antena GPS posicionada e livre', título 'Módulo fixado e posicionado', visor com câmera, cartão 'Não …
- `08-momento-nao-conforme-com-justificativa` — O mesmo item com Não conforme marcado (quadrado lima), campo JUSTIFICATIVA focado com 'Suporte trincado; fixei com abraçadeira até a troca.', visor encolhido, Salvar com ressalva
- `09-estado-item-reprovado` — Item automático reprovado: C · SAÚDE DO HARDWARE 2 de 4, 2º segmento vermelho, 'Tensão da bateria na faixa'. Poço grande com LIDO NA CAN 10,2 V e escala 10,0 · 12,0—15,0 · 16,0, marcador vermelho, '1,8 V …
- `10-estado-finalizar-com-a-secao-f-falhando` — Diálogo 'A Seção F não passou' sobre o véu: checkbox vazio 'Estou ciente · Rafael Vieira, 14:30', Finalizar desabilitado, Cancelar. Embaixo do véu não há checklist nenhum. Barra e faixa continuam acesas
- `11-momento-homologado` — Mapa homologado: 31 de 31, placar cheio, HOMOLOGADA em lima e '12 evidências · 14:52'. As seis seções com check (B 5 de 5, E 5 de 5). Encerrar sessão e Voltar ao menu, sem legenda

</details>

**Histórias sem referência:** **HU-T13-7** — Nenhuma referência mostra o relatório de homologação (seriais, versões, fotos, geolocalização, técnico). A 11 só diz '12 evidências · 14:52' · **HU-T13-8** — A 05 abre a Seção E em traço, mas nenhuma referência mostra o item faltante devolvendo ao ciclo dinâmico: não há botão, link nem cartão tocável (os cartões de E são div, não link) · **HU-T13-1 (parte 'marcar todos')** — Nenhum item do mock é manual sem foto. pendencias.md tira o controle do protótipo. A parte 'automático não se marca à mão' aparece na 09 · **HU-T13-3 (parte 'por tipo')** — O placar é uma barra só, com o total. Nenhuma referência separa automático de manual; a separação só existe porque cada seção tem uma natureza · **HU-T13-4 (parte 'marca ressalvada')** — A 08 mostra a resposta com justificativa, mas nenhuma referência mostra o efeito: B ressalvada no mapa, placar ou veredito ressalvado · **HU-T13-5 (parte 'Finalizar habilitado')** — Só existe o Finalizar desabilitado (00–06) e o depois de finalizar (11). O quadro com tudo que bloqueia resolvido e o primário aceso não existe

---

### T14 · Ciclo dinâmico

**1 · O que ela faz.** Com o ônibus andando, o técnico espera a fila do módulo esvaziar e dispara o evento de teste. O prazo de 2:00 drena na barra até o servidor responder. Os passos do veículo acendem sozinhos, um por um, e a falha acende no bloco que falhou: no prazo, na linha do passo ou na linha do cartão.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema* · *faixa · sessão aberta* · *com contador neutro* · *cronômetro* · *prazo cheio* · *bloco do evento* · *passo do ciclo* · *passos com o prazo estourado* · *reprovada, com causa* · *duas ações* · *com legenda*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sem ação (a faixa da T14 tem ENCERRAR em todas as 6: é a 'sessão aberta') · processo correndo (o botão desabilitado do 01 é o 'com legenda'; 'Encerrando · não desconecte' não aparece) · cadeia concluída · cadeia recusada · segmentado · encerrando · pede o corte · sem homologar · com contador de falha (03 e 04 mantêm o contador neutro '1 de 5' / '2 de 6') · a marca no login · campo · campo focado.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - Cronômetro · prazo estourado: número em #E06A5A, barra sem preenchimento com o marcador branco em 0 e duas frases 12/500 lh 1.45 dentro do cartão — *02-estado-prazo-estourado.html:45,51,57* · cartão 130→318 (188px, contra 147 na 00): +41
  - Cronômetro · evento chegou: rótulo 'O EVENTO CHEGOU EM', número passa a ser o tempo decorrido, barra congelada no que restava (60%), escala 'disparado 14:30' — *05-momento-ciclo-concluido.html:41,45,48,55* · fill e marcador em left 60%; mesmo cartão de 147px
  - Bloco do evento · antes do disparo: traço 10×1 #6E6683 no lugar da hora, solto e sem poço — *01-momento-antes-do-disparo.html:61* · linha ~15,6px; cartão 100px (contra 101)
  - Bloco do evento · não chegou: linha 'recebido no servidor' 13/600 e 'não chegou' 13/700, os dois #E06A5A; 'campos conferidos' com traço — *02-estado-prazo-estourado.html:64-66* · cartão 326→427 (101px)
  - Bloco do evento · recebido: '14:30:48' e '6 de 6' em 14/700, rótulos passam a #A9A2BC — *05-momento-ciclo-concluido.html:64,67* · linhas 16,8 em vez de 16 → cartão 103px (+2) e cartão de passos desce 2px (394→396)
  - Passo do ciclo · aguardando: poço 24 com relógio #6E6683 (path M12 7.5V12l3 1.8), texto 14/600 #867E9A. A folha 4 só desenha o passo aprovado — *00-tela.html:79-89 e todos os quadros* · linha 38, poço 24, glifo 14
  - Passo do ciclo · reprovado com causa, em duas medidas diferentes: 03 com padding 8 (linha 50) e 04 com padding 4 (linha ~41), gap 10, sem valor à direita. A peça 'reprovada, com causa' da … — *03.html:75-77; 04.html:91-93; folha-4 'reprovada, com causa'* · 03: divisórias em 434→484 (50px); 04: 6ª linha 587→~628
  - Glifo relógio em dois desenhos: na T14 e na folha 7 é #6E6683 com path M12 7.5V12l3 1.8; na folha 3 ('relógio · em andamento') é #A9A2BC com path M12 7.5v5l3 2. Nenhuma linha de … — *00-tela.html:64,67,80; folha-3 'relógio'; folha-7 'bloco …* · 16×16 no bloco do evento, 14×14 no poço 24
  - Última linha de 40px em 'passos com o prazo estourado' (as linhas dos tokens são 38/44/50), e o cartão perde o margin-bottom de 16 — *02.html:69,86; folha-4 'passos com o prazo estourado'* · cartão 435→633 (198px, contra 196)

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | Sessão do herói com a fila drenada e o disparo às 14:30. É o quadro de 24s de prazo (120−24 = 96 = 1:36), antes do recebimento, com os passos 1 e 2 feitos. | M.ativos[a-01] (placa RKT-8H42, moduloSerial M2C-0417) · M.HORA_NOMINAL 14:30 · M.ciclo.prazoEventoSeg 120 · M.ciclo.evento.recebidoAosSeg 24 · … | confere |
| `01-momento-antes-do-disparo` | momento | Semente da T14: sessão do herói e fila guardada. O prazo fica parado em prazoEventoSeg, sem disparo, com 2 passos feitos. | M.ciclo.mensagensGuardadas {mensagens 6, diagnostico 2} · M.ciclo.prazoEventoSeg 120 · M.ativos[a-01] | confere |
| `02-estado-prazo-estourado` | estado | O caso evento-sem-resposta aponta para o ativo a-04 (KHT-4B08, M2C-0335). O quadro é o fim do prazo (120s = 30s reais), com todos os passos feitos. | M.casos['evento-sem-resposta'] {ativoId a-04, moduloSerial M2C-0335, tentativa 1} · M.ativos[a-04] · M.ciclo.prazoEventoSeg 120 · 'cinco' = … | confere |
| `03-estado-dinamico-fora-do-esperado` | estado | O caso can-fora-esperado aponta para a-02. O quadro é o mesmo da 00 (24s de prazo), com o passo 1 feito e o passo 2 reprovado pelo sinal velocidade (lido 0 km/h). | M.casos['can-fora-esperado'] {ativoId a-02, sinal velocidade, lido '0 km/h', esperado 'maior que zero com o motor ligado'} · M.ativos[a-02] … | **não confere** — 'devia passar de zero' não é o esperado do caso ('maior que zero com o motor ligado') nem o do sinal em ma-01 ('acima de 0 km/h'). O mock não liga o sinal 'velocidade' … |
| `04-estado-identificador-divergente` | estado | O caso identificador-divergente aponta para a-03 e cartaoId id-01, e usa exemplos[0] para o lido e o esperado. A lista é a dos passos do ciclo mais 1 linha do teste do cartão. | M.casos['identificador-divergente'].exemplos[0] {lido 9412857, esperado 0009412857} · M.identificadores.cartoes[id-01] {rotulo 'Cartão do motorista … | **não confere** — No mock o rótulo é 'Cartão do motorista 041'; o PNG mostra sem o 041. O '6' de 'de 6 passos' (5+1) não tem regra no mock. O herói a-01 é o mesmo ma-01, com o mesmo … |
| `05-momento-ciclo-concluido` | momento | Herói depois do recebimento e do 5º passo. O número vira o tempo decorrido até o recebimento; a barra fica no que restava (restante/120). | M.ciclo.evento.recebidoAosSeg 24 · M.ciclo.evento.conferidoAosSeg 33 · M.ciclo.prazoEventoSeg 120 · M.HORA_NOMINAL | **não confere** — O mock diz que o evento chega aos 24s (mocks.js:919, e 08-produto-real/o-que-o-prototipo-simula.md:11: 'chega aos 24s do prazo'). Pela regra, a tela seria 0:24, barra … |

**4 · Cada movimento.**

- **(cabeçalho de animacao.md) conteúdo entre telas** — Opacity 0→1 só no miolo, em var(--mov-rapido), com var(--mov-curva). A barra do sistema e a faixa ficam fora do nó que esmaece. ⚠ Nenhum na regra. Risco: a faixa da referência 01 tem 51px (sem flex-shrink:0); se o código copiar o HTML, a faixa 'mexe' entre 00 e 01.
- **barra do prazo** — Preenchimento de 100% de largura com transform: scaleX(restante/120) e transform-origin à esquerda. A borda lima de 1px e o marcador branco de 4px ficam em peças à parte, movidas … ⚠ 'contínuo' não é token, mas é o ritmo de processo declarado (movimento.md:38), então passa. Dois cuidados: o scaleX deforma a borda de 1px se ela ficar no mesmo nó; e o …
- **número do prazo** — Troca o texto no lugar a cada segundo de prazo, isto é, a cada 250ms reais. Sem transição; números tabulares. Nasce parado em 2:00 e só anda depois do toque no disparo. ⚠ A linha em si não viola nada. Falta uma virada que animacao.md e tela.md não descrevem: no recebimento, o número passa de restante para decorrido (05 mostra 0:48) e o …
- **passo do veículo** — A cada 3s, o relógio vira check no poço por troca de opacity entre duas camadas sobrepostas, em var(--mov-rapido) com var(--mov-curva). A tinta do texto (#867E9A→#F2F0F7) troca … ⚠ Tempo e curva são tokens e o ritmo de 3s está declarado. Animar a cor do texto violaria 'só transform e opacity'. E não está declarado quando a cadência começa (ver …
- **linha do evento** — O relógio vira o horário (e depois '6 de 6') por troca de opacity em var(--mov-rapido). A curva usada é var(--mov-curva), porque 'esmaece' não é curva. A linha precisa de altura … ⚠ 'esmaece' na coluna Curva não é token. A troca do svg de 16px pelo texto 14/700 (16,8px) aumenta cada linha em ~1px e empurra o cartão de passos 2px (medido: passos em …

**5 · O que pode dar errado.**

- Se a faixa for copiada do HTML (00-tela.html:24, sem flex-shrink:0), ela encolhe quando o conteúdo transborda, como no 01 (51px). Construindo 52 fixo, o print do 01 fica 1px abaixo do PNG em tudo o que está acima do rodapé.
- 01 e 04 transbordam 800: a folga passos→rodapé medida é 25px (01) e 28px (04), contra os 32 declarados (margem 16 + padding 16). A referência corta com overflow hidden; a decisão 14 manda rolar. Com rolagem, o 01 vira uma tela …
- O quadro 00 (1:36 com recebido pendente) cai no mesmo segundo em que o mock faz o evento chegar (24s). Se o recebimento for processado no mesmo tique que desenha 1:36, o 00 nunca aparece e o print não bate.
- Com o mock (24s), o 05 sai 0:24, barra 80% e 14:30:24. Com o PNG, sai 0:48, 60% e 14:30:48. Qualquer escolha deixa uma das fontes em desvio.
- '6 de 6' campos conferidos não tem dado: construir o 05 exige inventar um número ou mexer no mock.
- Os quadros 01 e 00 não saem da mesma linha do tempo nos ritmos declarados (3s por passo; 1s = 4s de prazo). Um dos dois prints vai divergir.
- A peça 'passo reprovado' tem duas medidas nas referências (padding 8 → 50px no 03; padding 4 → ~41px no 04) e uma terceira na folha (padding 6). Um componente único não bate nos dois PNGs.
- O estado 02 muda o desenho do cartão de passos: tira o margin-bottom e faz a última linha de 40. Com um componente único sem essa exceção, o print do 02 diverge 2px e a folga muda.
- Dois relógios no design system (o da folha 3 e o da T14/folha 7): um componente de glifo único vai errar num dos lados.

<details><summary>Medidas reais lidas no HTML · 17 peças</summary>

| Peça | Medida |
|---|---|
| tela | 360×800, coluna flex; fundo #0F0D14; tinta #F2F0F7; números tabulares |
| barra do sistema | 30px, #16131D, padding 0 14 0 18 (18 não é token de espaço); relógio 14/500 com letra … |
| faixa · sessão aberta | 52px, #16131D, divisória de baixo 1px #2E2840, padding 0 16, gap 10. LED 8×8 raio 4 … |
| miolo | padding 14 16 16 16, gap 8, overflow hidden; cabeçalho de 96 a ~122 |
| cabeçalho com contador neutro | h1 22/700 com letra −0.3px; contador 13/600 #A9A2BC e 'de 5 passos' em #867E9A; … |
| cronômetro | Cartão #1A1726, borda 1 #2B2540, raio 4, padding 12, gap 6. Rótulos 10/700 com letra … |
| cronômetro · 01 (prazo cheio) | + legenda 12/500 #A9A2BC; preenchimento 100%, marcador em right:0. Cartão de 129 a 296 … |
| cronômetro · 02 (estourado) | Número #E06A5A; sem preenchimento; marcador em left:0; duas frases 12/500 lh 1.45. … |
| cronômetro · 05 (chegou) | Rótulo 'O EVENTO CHEGOU EM'; preenchimento e marcador em 60%; escala 'disparado 14:30'; … |
| bloco do evento | Mesmo cartão, padding 10 12, gap 6. Rótulo 10/700. Linhas: texto 13/400 (#A9A2BC quando … |
| cartão de passos | Padding 2 12, margin-bottom 16. Linha 38, gap 10, divisória 1px #241F33; poço 24×24 … |
| passo reprovado · 03 | min-height 38 + padding 8 0 → linha de 50 com poço 24 (a lei 'Poço na linha' pede 32 … |
| passo reprovado · 04 (6ª linha) | min-height 38 + padding 4 0 → ~41px; a 5ª linha ganha divisória. Cartão de 394 a 631 (+41) |
| passos · 02 | Sem margin-bottom; última linha de 40px. Cartão de 435 a 633 (198px) |
| rodapé · duas ações | Padding 14 16 24 16, gap 6, divisória de cima 1px #221D2E. Primário 56, raio 4, #402070, … |
| rodapé · com legenda (01) | Legenda 12/600 #867E9A com padding-bottom 6 (12px até o botão). Botão desabilitado 56, … |
| folga passos→rodapé | 00: 69 · 01: 25 · 02: 26 (sem margem) · 03: 57 · 04: 28 · 05: 67. No 01 e no 04 o … |

</details>

<details><summary>O que se vê em cada uma das 6 referências</summary>

- `00-tela` — Herói M2C-0417/RKT-8H42 com LED lima. 'FILA DRENADA'. 1:36 grande em branco, barra lima até 80% com marcador branco, escala 0:00 · limite 2:00. Evento disparado 14:30; recebido e campos com relógio. Ignição …
- `01-momento-antes-do-disparo` — 'FILA DRENANDO'. 2:00 com a barra cheia e o marcador na ponta direita. Legenda '6 mensagens e 2 de diagnóstico saindo do módulo'. 'disparado pelo app' com traço. Mesmos 2 de 5 passos. Rodapé com a legenda …
- `02-estado-prazo-estourado` — M2C-0335/KHT-4B08. 0:00 em vermelho, barra vazia com o marcador branco em 0. 'A Seção F reprova. / Os cinco passos do veículo continuam valendo.' dentro do cartão. 'recebido no servidor · não chegou' em …
- `03-estado-dinamico-fora-do-esperado` — M2C-0301/QJF-2C61. 1:36 e o evento igual à 00. '1 de 5'. Movimento detectado com X vermelho no poço de 24 e 'velocidade 0 km/h · devia passar de zero' em vermelho, numa linha de 50. Os outros 3 pendentes …
- `04-estado-identificador-divergente` — M2C-0312/PCX-9A17. 1:36. '2 de 6 passos'. Aparece uma 6ª linha, 'Cartão do motorista', com X vermelho e 'leu 9412857 · o cadastro espera 0009412857' em vermelho. O link vira 'Solicitar correção de cadastro'. …
- `05-momento-ciclo-concluido` — Herói. 'O EVENTO CHEGOU EM' 0:48, barra congelada em 60% com o marcador. Escala 'disparado 14:30 · limite 2:00'. Recebido 14:30:48, campos conferidos 6 de 6. 5 de 5 passos com check. Rodapé com 'Voltar ao …

</details>

**Histórias sem referência:** **HU-T14-1 · um deslocamento alimenta 4 blocos: CAN dinâmica · Seção E · evento de teste · viagem** — Parcial. Aparecem a Seção E (os 5 passos) e o evento. A viagem (M.ciclo.viagem.distanciaKm 3) não aparece em quadro nenhum. A CAN dinâmica (lidoDinamico: 14,1 V, 38 km/h, acendeu, 1.180 rpm, 9,4 … · **HU-T14-2 · disparo o evento por botão, com o cronômetro dos 120s em destaque** — Parcial. O cronômetro de 62px aparece. O botão 'Disparar evento de teste' aceso (fila drenada, antes do disparo) não tem referência; só existe desabilitado, no 01. · **HU-T14-6 · divergindo, a tela oferece solicitar correção de cadastro já com os dois valores anexados** — Parcial. O 04 mostra o link. Nenhuma referência mostra o que acontece ao tocar, nem o anexo dos dois valores, e nenhum documento dá o destino. · **HU-T14-7 · vejo o tempo decorrido e o que ainda falta capturar; encerrar leva direto ao checklist** — Parcial. O que falta aparece (relógios nos passos) e existe o 'Encerrar o ciclo'. O tempo decorrido do ciclo não aparece em quadro nenhum: o cronômetro mostra o restante do prazo, e o 05 mostra só o … · **HU-T14-5 · código lido ao lado do esperado (caminho feliz)** — Só o divergente aparece (04). O teste do identificador que confere não tem referência: o herói, que tem leitor de cartão, aparece sem essa linha.

---

### T15 · Fila de saída

**1 · O que ela faz.** Mostra ao técnico, item por item, o que o aparelho ainda deve ao servidor. O que sobe sozinho, o que já chegou e o único erro que precisa da mão dele ficam separados, e a Seção F que espera o servidor aparece à parte, fora da fila.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema* · *faixa · sessão aberta* · *faixa · sem sessão* · *com contador neutro* · *cartão que pede ação* · *botão secundário* · *linha da fila · esperando* · *linha da fila* · *vazio declarado* · *linha da re-checagem* · *uma ação*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sem ação · o par comparado · linha do histórico · a lista de garagens · cadeia concluída · cadeia recusada · encerrando · pede o corte · sem homologar · com contador de falha · a marca no login · campo · campo focado · linha de opção · lista com contagem.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - Cartão 'SUBINDO AGORA'. Poço que cresce até o espaço livre, com traço lima de 2px embaixo, seta, rótulo, título, número de progresso com %, tamanho e legenda centrada — *01-estado-sem-erro.html:40-57* · y 134→465 · padding 20 16 · gap 18 · seta 20 #F2F0F7 · rótulo 11/700 ls 1.4 #A9A2BC · título 20/700 · número …
  - Barra de progresso do envio. Preenche da esquerda, com marcas e marcador branco. É parecida com o 'placar da homologação' da folha 5, mas não é a mesma — *01-estado-sem-erro.html:48-54* · 16 alto · topo #06050A, baixo #332C49, sem laterais · preenchido 62% rgba(170,239,0,.14) + borda direita …
  - Cartão de erro compacto com dois itens. A folha 6 só desenha o caso de um erro — *02-estado-dois-erros.html:41-58* · padding 18 16 · gap 16 · título 17/700 · causa 13/500 lh 1.4 · botão 46/15px · divisória 1px #2E2840 com …
  - Item com erro de rede dentro do cartão: relógio em poço, placa e a causa com a próxima tentativa — *02-estado-dois-erros.html:50-56* · poço 34 · relógio 18 #A9A2BC · título 16/700 #A9A2BC · sub 12/500 #867E9A · sem altura fixa
  - Legenda dentro do cartão ('Nada aqui precisa de você.' centrada; 'Só a primeira precisa de você…' alinhada à esquerda) — *01.html:56 · 02.html:57* · 13/600 #867E9A
  - Rótulo de seção da lista ('O RESTO ANDA SOZINHO', 'NA FILA E RECEBIDAS', 'EM RE-CHECAGEM · SEÇÃO F'). Só tipografia, sem linha em componentes.md — *00.html:49 · 01.html:59 · 04.html:40* · 10/700 ls 1.5 · #867E9A (00/01/02) mas #A9A2BC (04)
  - Contêiner da lista, sem peça própria. Só aparece dentro de 'a lista de garagens', 'lista com contagem' e 'linha do histórico' — *00.html:50* · #1A1726 · borda 1px #2B2540 · raio 4 · padding 0 12 · margin-bottom 16
  - Glifo de seta para cima do 'SUBINDO AGORA'. Não está no catálogo de glifos da folha 3, e o grep do path 'M12 19V5M7 10l5-5 5 5' não acha nada nas 8 folhas — *01.html:41* · 20px · traço 2.2 · fora de poço próprio
  - Linha recebida no meio da lista, em 50px com divisória e check lima. Combina a 'esperando' (50, círculo) com a 'linha da fila' (62, sem divisória), e nenhuma folha desenha essa combinação — *01.html:69-76* · 50 alto · divisória 1px #241F33 · poço 30 · check 17 #AAEF00

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | O conjunto são os itens da garagem. Os erro-recusa (manuais) vão no cartão; os demais vão na lista, na-fila antes de recebida. 'há N min' = 14:30 − criadoAs. A recebida mostra diasAtras + confirmadoAs. O contador é o tamanho do … | M.filaSaida f-10 (a-14 KJC-7N23, erro-recusa, motivo), f-02 (a-12 RSW-9L02, 'Foto de calibração', 14:12 → 18 min ✓), f-08 (a-12, recebida, … | **não confere** — 'ontem 10:05' não bate com f-08.diasAtras 2 (2026-03-10). '3 nesta garagem' só sai filtrando por Ibura (uo-02), mas a sessão é do RKT-8H42 (a-01, uo-01) e … |
| `01-estado-sem-erro` | estado | Conjunto sem erro. O cartão leva o item 'enviando' (progresso, tamanhoMb) e a lista leva na-fila e depois as recebidas, da mais recente para a mais antiga. O contador é o tamanho do conjunto. | M.filaSaida filtrado por uo-01 Várzea = f-01, f-04, f-05, f-06, f-07 → 5 ✓. f-04.progresso 62 ✓, f-04.tamanhoMb 8.4 ✓. Mas f-04.ativoId é a-09 = … | **não confere** — Placa do item enviando: mock KNB-5H39, PNG RKT-8H42. PCX-9A17 na fila no mock é f-01 'Evidências' criada 14:28 (há 2 min), no PNG é 'Checklist há 4 min'. As recebidas … |
| `02-estado-dois-erros` | estado | Conjunto com os dois erros. A recusa (manual) leva a causa prefixada por 'o servidor recusou ·' e o botão. O erro de rede (automático) mostra tentativas e proximaTentativaAs. 'DUAS' é a contagem de erros. A lista é igual à da 00. | f-10 (a-14 uo-02) + f-09 (a-19 KWX-2T36, uo-03, tentativas 3 ✓, proximaTentativaAs 14:32 ✓, reenvio automático) + f-02 + f-08. Não existe caso … | **não confere** — '4 nesta garagem' mistura garagens: f-09 é do Pátio Caruaru e os outros três são de Ibura. Nenhuma garagem do mock tem 4 itens (uo-01 5 · uo-02 3 · uo-03 2). Continua … |
| `03-estado-fila-vazia` | estado | Conjunto vazio, com sessão null. A frase leva o horário do último confirmadoAs. | Nenhum dado do mock produz esta tela. Nenhuma garagem tem 0 itens, o último confirmadoAs do mock é 09:15 (f-06) e '14:02' não existe em mocks.js. … | **não confere** — O contador se contradiz. Na 00 ele conta recebidas (2 pendentes + 1 recebida = 3); aqui mostra 0 mesmo existindo uma recebida às 14:02. A sessão fechada não está … |
| `04-estado-secao-f-em-re-checagem` | estado | A tela da 03 mais M.secaoF numa seção separada (não entra no contador). A placa vem de secaoF.ativoId. A sub encurta secaoF.motivo. O prazo sai da janela de 24 h. | M.secaoF {emRecheck:true, ativoId a-06 → RVM-1E54 ✓, instalacaoId i-06, motivo 'Confirmação de recebimento pendente…'}. i-06: diasAtras 9, … | **não confere** — '24' não é campo do mock. Pelo domínio §4.1, 24 h esgotadas viram 'Reprovada', e i-06 foi há 9 dias; a T12 mostra o mesmo RVM-1E54 como 'há 9 dias · falha reconhecida'. … |

**4 · Cada movimento.**

- **barra do item corrente (o envio corre, enche da esquerda, linear, contínuo, …** — Preenchido com transform: scaleX(progresso/100) e transform-origin à esquerda. A borda lima de 1px e o marcador de 3px ficam num elemento à parte, movido por translateX, para a … ⚠ 'contínuo' não é token nem ritmo declarado: movimento.md, na tabela 'Os processos', não tem linha para o envio da fila, e o mock não tem ritmo, embora …
- **item enviado (o envio termina, esmaece e a lista fecha o espaço, 150ms + …** — Opacity 1→0 em var(--mov-rapido) com var(--mov-curva) e depois o item sai do DOM. Fechar o espaço em var(--mov-padrao) só daria com translateY nos vizinhos (FLIP). ⚠ 'A lista fecha o espaço' é mover o layout, o que animacao.md:10 ('nada que mexa no layout') e movimento.md:43 proíbem. O cartão do topo cresce até o espaço livre, então …
- **entre telas (animacao.md:3: só o conteúdo esmaece em 150ms; a barra do sistema …** — Opacity do conteúdo 0→1 em var(--mov-rapido) na troca de tela. A barra do sistema e a faixa ficam fora do nó que esmaece. ⚠ Nenhum, dentro da regra. Só um cuidado: de 00/01/02 (sessão aberta) para 03/04 (sem sessão) a faixa troca de peça. Pela palco, isso é troca de estado, não transição, …

**5 · O que pode dar errado.**

- Montar 01/02/03 à mão: o mock não produz nenhum dos três (achados T15-A1 a A4). A tentação é digitar as placas e os horários no componente, o que contrato.md:7 proíbe.
- O cartão do topo cresce até o espaço livre: a altura dele sai do tamanho da lista (381px na 00, 331px na 01). Diferença de métrica da Barlow (@fontsource contra 05-recursos/fontes) desloca o conteúdo centrado e a comparação com …
- O cartão de erro tem dois desenhos (22/15/52 na 00, 17/13/46 na 02). Um só componente com os tamanhos da folha 6 quebra a fidelidade da 02; dois componentes quebram a Lei 3.
- A última linha da lista tem 62px por posição, não por estado (na 01 há uma recebida de 50 no meio). Quem seguir só a folha 7 vai dar 62 a toda recebida.
- Tempos relativos ('há 18 min', 'ontem') têm de sair de 14:30 e diasAtras, com aritmética pura. Usar Date ou toLocale quebra a regra 6 da raiz, e f-08 vai render 'há 2 dias', não 'ontem'.
- '8,4 MB' a partir de 8.4: a vírgula tem de sair de formatação determinística, não do Intl do navegador.
- O encurtamento do tipo e o prefixo 'o servidor recusou ·' não têm regra declarada. Um literal no componente vira texto sem fonte.
- O contador 'N nesta garagem' tem semântica diferente da do menu (T04 mostra 2 pendentes): a HU-T15-2 ('a home mantém o contador') fica visivelmente falsa no fluxo.
- 03/04 exigem sessão null. Ao voltar da coluna ('Voltar ao fluxo'), a sessão do herói tem de voltar intacta.

<details><summary>Medidas reais lidas no HTML · 18 peças</summary>

| Peça | Medida |
|---|---|
| tela | 360×800 · fundo #0F0D14 |
| barra do sistema | 30 alto · #16131D · padding 0 14 0 18 · hora 14/500 ls 0.1 |
| faixa · sessão aberta | 52 alto · #16131D · borda de baixo 1px #2E2840 · padding 0 16 · LED 8 #AAEF00 · serial … |
| área de conteúdo | padding 14 16 16 16 · coluna com gap 12 · começa em y 82 |
| cabeçalho com contador neutro | h1 22/700 ls −0.3 · contador 13/600 #A9A2BC + 'nesta garagem' #867E9A · alinhados na … |
| cartão que pede ação (00) | cresce até o espaço livre · y 134→515 (traço de 2px #E06A5A em 513-515) · fundo #0B0910 … |
| rótulo do cartão | xis 22 com traço 2.2 #E06A5A + 11/700 ls 1.4 #E06A5A · gap 10 |
| título e causa do cartão | 22/700 lh 1.2 · 15/500 #A9A2BC lh 1.4 · gap 6 |
| botão secundário (00) | 52 alto · raio 4 · #1E1A29 · borda 1px #3A3350 · 16/700 #F2F0F7 |
| rótulo de seção | 10/700 ls 1.5 #867E9A · y 530-537 |
| lista | #1A1726 · borda 1px #2B2540 · raio 4 · padding 0 12 · margin-bottom 16 · y 551→665 |
| linha da fila · esperando | 50 alto · divisória 1px #241F33 · gap 12 · poço 30 com glifo 17 (traço 2.2) · título … |
| linha da fila (última) | 62 alto · sem divisória · check 17 #AAEF00 |
| rodapé · uma ação | padding 14 16 32 16 · borda de cima 1px #221D2E (y 697) · primário 56, raio 4, #402070, … |
| 01 · o que muda | cartão y 134→465 com traço 2px #AAEF00 · seta 20 · título 20/700 · número 40/700 ls −1 + … |
| 02 · o que muda | cartão y 134→515 (igual à 00), mas padding 18 16 e gap 16 · título 17/700 · causa 13/500 … |
| 03 · o que muda | faixa · sem sessão com 52, sem borda, LED #4E475E, 14/600 ls 0.2 #867E9A · vazio y … |
| 04 · o que muda | vazio igual à 03 · bloco da re-checagem com gap 8 · rótulo 10/700 ls 1.5 #A9A2BC em y … |

</details>

<details><summary>O que se vê em cada uma das 5 referências</summary>

- `00-tela` — Sessão M2C-0417 · RKT-8H42 com ENCERRAR. 'Fila de saída 3 nesta garagem'. Um poço grande com traço vermelho: 'UM PRECISA DE VOCÊ', 'Evidências · KJC-7N23', 'instalação encerrada por outro usuário' e o botão …
- `01-estado-sem-erro` — Mesma faixa. '5 nesta garagem'. Poço com traço lima: seta 'SUBINDO AGORA', 'Evidências · RKT-8H42', '62% de 8,4 MB', barra cheia até 62% com marcador branco e 'Nada aqui precisa de você.'. Embaixo, 'NA FILA E …
- `02-estado-dois-erros` — '4 nesta garagem'. Poço vermelho 'DUAS COM ERRO': Evidências KJC-7N23, 'o servidor recusou · instalação encerrada por outro usuário', com o botão menor que na 00. Depois de uma divisória, relógio em poço com …
- `03-estado-fila-vazia` — Faixa 'Sem sessão de configuração' com LED apagado. '0 nesta garagem'. Vazio tracejado 'Nada esperando envio / O último item subiu às 14:02.'. Daí até o rodapé fica tudo vazio.
- `04-estado-secao-f-em-re-checagem` — Igual à 03, com uma seção a mais: 'EM RE-CHECAGEM · SEÇÃO F' e uma linha com relógio em poço, 'RVM-1E54 · recebimento pendente · confere em 24 h'.

</details>

**Histórias sem referência:** **HU-T15-1 (em parte)** — Tipo, ativo, tamanho e progresso do corrente aparecem (00, 01). 'item de checklist' não aparece em nenhuma das 5 referências, e o mock não tem campo para ele (M.filaSaida só tem id, tipo, ativoId, … · **HU-T15-2** — É comportamento: sair não interrompe o envio. Nenhuma referência da T15 mostra isso. A home mantém o contador só na T04 ('2' no cartão, T04/textos.md:7), e o número difere do '3 nesta garagem' da 00. · **HU-T15-6** — Nenhuma referência mostra a notificação local, e o mock não tem o limite de fila parada (grep 'limite\|notifica' em mocks.js não acha nada da fila).

---

### T16 · Sessão

**1 · O que ela faz.** Prova, passo a passo e com o valor relido do módulo, que a configuração continuou lá depois de desligar e religar. Se alguma prova não volta, a sessão fecha mesmo assim e só a homologação fica travada. Também devolve ao técnico a sessão que caiu no meio.

**2 · As peças.** Usa, conferido nas referências: *barra do sistema* · *faixa · sem ação* · *faixa · sem sessão* · *com contador neutro* · *encerrando* · *pede o corte* · *sem homologar* · *ainda não* · *processo correndo* · *uma ação* · *duas ações* · *prova da sessão* · *assertiva da sessão* · *aviso* · *nota com rótulo*.

- Estão na lista da `tela.md` e **não aparecem** em nenhuma referência: faixa · sessão aberta (o ENCERRAR se toca em outra tela; a T16 só tem a faixa sem ação e a sem sessão) · com legenda (a frase da T16 fica embaixo do botão, dentro de processo correndo; a peça com legenda põe a linha em cima, a 12px) · linha de conferência (a da T11: poço 26 e rótulo de 74; a T16 usa a assertiva da sessão) · linha do histórico · a lista de garagens · cadeia concluída (a cadeia do 06 é outro desenho: veja T16-V1) · cadeia recusada · segmentado · com contador de falha (o 05 tem uma falha e mesmo assim usa o contador neutro, 7 de 8) · a marca no login · campo · campo focado · linha de opção · lista com contagem.
- Desenhadas nas referências **sem linha** em `componentes.md`:
  - bloco de falha sem poço: A HOMOLOGAÇÃO FICA BLOQUEADA + causa. A peça falha da folha 4 tem poço 24 com glifo; este não tem — *05 (05-estado-assertiva-falhando.html:77-80)* · fundo de poço, borda de baixo 2px #E06A5A, padding 14, gap 6, rótulo 11/700 ls 1,4 vermelho, frase 13/500 …
  - cadeia da sessão interrompida: os 6 blocos da T09 no desenho da cadeia do encerramento, com glifo pausa e 'parou aqui'. Não é a cadeia concluída da folha 5 (que tem descrições) nem a queda … — *06* · linhas min-height 58, a última 34, poço 32, glifo 19, trilho 2px lima nos feitos e #241F33 nos pendentes
  - glifo 'não se aplica' em círculo com traço (círculo r9 + M8.5 12h7). Não está em nenhuma folha: a folha 3 e a folha 4 desenham 'não se aplica' como traço 10×1 — *02, 05 (Faixa de contadores, Pontos de cerca)* · 19px, traço 2,2, #4E475E
  - cabeçalho com subtítulo de 12px embaixo do título. componentes.md só tem com contador neutro/de falha, sem subtítulo — *03 (Sem homologar · só o que deixa o módulo seguro), 06 …* · 12/500 #867E9A; 03 com margin-top −8 depois do gap 14, 06 com bloco de gap 4
  - nota solta de 12px embaixo do cartão das assertivas — *02 (O ID na plataforma confirma quando a evidência subir.)* · 12/500 #867E9A lh 1,45, gap 12 do cartão

**3 · Cada estado e momento, montado do dado.**

| Referência | Tipo | Como monto | Fonte no mock | Dado |
|---|---|---|---|---|
| `00-tela` | tela | A semente da T16 (sessão do herói homologada) dispara os 8 passos a 600ms. A referência é o quadro com o passo 3 correndo e 2 feitos. | logica.md:52 (semente) · M.ativos[a-01] RKT-8H42 → moduloSerial M2C-0417 · M.modulos[M2C-0417].modeloId vl06 → … | confere |
| `01-momento-pede-o-corte-de-alimentacao` | momento | Sessão de um VL08 (a-09 / M2C-0371): o passo 2 lê reinicioPorComando=false e vira 'pede o corte'. Quadro parado no passo 2. | M.ativos[a-09].placa KNB-5H39 · M.modulos[M2C-0371].modeloId vl08 · M.modelos[vl08].reinicioPorComando=false (mocks.js:135) · o par a-09/M2C-0371 é … | confere |
| `02-momento-sessao-encerrada` | momento | M.autotesteEncerramento na ordem. Cada linha tira o valor da sua fonte (versão, contador, identificadores, faixa, cercas) ou usa o valor fixo. A prova compõe M.cadeia.versoes. | M.autotesteEncerramento (mocks.js:284-292) · versão = M.cadeia.versoes na ordem de M.cadeia.ordem, sem limpeza → A12.G07.L02.E05.C03 · Contadores = … | **não confere** — Pontos de cerca deveria aplicar, porque o a-01 tem 4 regiões e gravou Cercas G07. O índice aponta autotesteAssertivas, que é a lista da bancada. O motivo do 'não se … |
| `03-momento-encerrando-sem-homologar` | momento | ENCERRAR na faixa antes do checklist homologado: o estado único marca 'sem homologar', pula os passos 1–3 e 8 e corre os passos 4–7 a 600ms. Quadro no passo 5. | derivado do fluxo: estado.sessao (M2C-0417 + RKT-8H42) + etapas sem checklist homologado · dominio.md §4.2 'pula 1–3, executa 4–7' · nenhum campo do … | confere |
| `04-momento-encerrada-sem-homologar` | momento | Fim do encerramento abortado: os passos 4–7 nas linhas de assertiva, o aviso e a nota fixos, e a faixa troca pra sem sessão. | derivado do fluxo · os valores são texto (textos.md:23) · faixa sem sessão = estado.sessao nenhuma | confere |
| `05-estado-assertiva-falhando` | estado | O caso autoteste-falhando montado parado: a assertiva de noEncerramento.assertiva vira reprovada com o valor lido. A prova sai e a falha entra embaixo da lista. | M.casos['autoteste-falhando'] {ativoId a-14, noEncerramento {assertiva 'contadores', lido '0 km'}} + M.autotesteEncerramento · '7'/'8' = … | confere |
| `06-estado-sessao-interrompida` | estado | O caso sessao-interrompida montado parado: em M.cadeia.ordem, os 'confirmados' primeiros ficam feitos, o bloco seguinte fica parado e o resto apagado. O subtítulo junta placa, serial, dia e hora. | M.casos['sessao-interrompida'] {ativoId a-13, moduloSerial M2C-0411, diasAtras 0 → hoje, iniciadaAs 13:05, confirmados 3, pontoRetomada 'Bloco 4 de … | confere |

**4 · Cada movimento.**

- **conteúdo entre telas (parágrafo de abertura da animacao.md)** — opacity 0→1 só no miolo, em var(--mov-rapido) com var(--mov-curva), quando a tela muda. Barra do sistema e faixa ficam fora do nó que esmaece. ⚠ Nenhum. A troca 00→02 (Encerrar sessão → Sessão encerrada) acontece dentro da T16, então não tem regra própria. Uso esta.
- **passo do encerramento** — Um tick de processo a cada 600ms (movimento.md:35), contado pelo estado único, sem Date.now. No tick, o glifo agora vira ok lima com opacity 0→1 em var(--mov-rapido) e … ⚠ Duração e ritmo são tokens e estão declarados, tudo certo. Mas a legenda que passa de um passo pro outro muda a altura das linhas, então isso tem de ser troca seca. …
- **assertiva do autoteste** — Um tick a cada 400ms (movimento.md:36), na ordem de M.autotesteEncerramento. Em cada um, glifo e valor entram com opacity 0→1 em var(--mov-rapido) e var(--mov-curva). ⚠ Com reduzir movimento, 'aparecem juntas' viola movimento.md:47, onde os processos seguem no mesmo ritmo e a prova nasce em ordem. Não existe referência do quadro …
- **faixa de sessão** — transform translateY(0 → −100%) em var(--mov-padrao) na faixa sem ação, dentro de um slot de 52 com overflow hidden. A faixa sem sessão fica parada embaixo e aparece quando a … ⚠ 'acelera' não é token: movimento.md:12 e tokens.css:113 só têm --mov-curva, que desacelera. E 'some' contradiz 02/04/05/06, onde a faixa sem sessão ocupa o mesmo lugar.

**5 · O que pode dar errado.**

- Montar o 02 lendo M.autotesteAssertivas, porque estados.md:9 e indice.json:1213 mandam. Isso sai com Posição GPS válida, Ignição liga… e não com as 8 do PNG.
- O corte (01) nunca aparece no caminho do herói: VL06 reinicia por comando. Se forçado no herói, o dado mente.
- Contador do cabeçalho com regra única: ou a 00 e a 01 ficam uma casa à frente do que passou, ou a 03 fica uma casa atrás do PNG.
- Pontos de cerca do herói: derivar do mock dá 4 regiões, e o PNG diz 'não se aplica'. Escrever 'não se aplica' à mão é estado inventado.
- Ler o 7 de casos['autoteste-falhando'].passaram, que é a contagem da bancada (Ignição desliga), e misturar as duas listas que o mock separa (mocks.js:258-262).
- Construir um componente de cadeia só, com uma altura de linha: 62 e 58 convivem nas referências e na folha 5, e nenhum dos dois é token.
- Animar a altura das linhas quando a legenda muda de passo (proibido mexer no layout). Tem de ser troca seca, com fade só no glifo.
- A faixa 'sobe e some' deixar o slot de 52 vazio e empurrar o conteúdo pra cima. O PNG mantém a faixa sem sessão no lugar.
- Estado 05 e 06 abertos pela coluna animando assertivas ou passos do zero. No palco o estado é parado: o quadro final aparece direto, sem contar de zero.

<details><summary>Medidas reais lidas no HTML · 17 peças</summary>

| Peça | Medida |
|---|---|
| tela | 360 × 800, fundo #0F0D14, flex em coluna, números tabulares |
| barra do sistema | 30 de altura, #16131D, padding 0 14 0 18; hora 14/500 ls 0,1 #F2F0F7; ícones 15×11, … |
| faixa · sem ação | 52 de altura, #16131D, borda de baixo 1px #2E2840, padding 0 16, gap 10; LED 8×8 raio 4 … |
| faixa · sem sessão | 52 de altura, #16131D, sem borda; LED #4E475E; texto 14/600 ls 0,2 #867E9A |
| miolo | padding 14 16 16 16. gap 14 na 00, 01, 03 e 06; gap 12 na 02, 04 e 05 |
| cabeçalho | título 22/700 ls −0,3; contador 13/600 #A9A2BC + 'de N' #867E9A, alinhado na linha de base |
| passo da cadeia do encerramento | min-height 62 na 00, 58 na 01, 03 e 06, 34 na última; gap 12; coluna 32; poço 32 (topo … |
| posição dos passos (onde o momento e o … | base do poço, em y css. 00: 167·229·291·383·445·507·569·631. 01: … |
| rodapé processo correndo | topo em y=659, borda 1px #221D2E, padding 14 16 24 16, gap 6; botão 56, raio 4, #1A1726, … |
| rodapé uma ação | topo em y=697, padding 14 16 32 16; primário 56 #402070 com texto 17/700 #AAEF00 |
| rodapé duas ações | topo em y=659, padding 14 16 24 16; primário 56 + link de 48 com margin −4 0, 15/500 … |
| prova da sessão | fundo de poço, borda de baixo 2px #AAEF00, padding 12 14, gap 6, centrada; rótulo 10/700 … |
| cartão das assertivas | #1A1726, borda 1px #2B2540, raio 4, padding 0 12; linhas de 50 (a última de 54), gap 10, … |
| bloco de falha (05) | fundo de poço, borda de baixo 2px #E06A5A, padding 14, gap 6; rótulo 11/700 ls 1,4 … |
| aviso SEM HOMOLOGAR (04) | fundo de poço, padding 10 12, gap 12; poço 26 com pausa 16 #A9A2BC; rótulo 10/700 ls 1,5 … |
| nota NÃO RODARAM (04) | #131019, borda 1px tracejada #241F33, raio 4, padding 12, gap 4; rótulo 10/700 ls 1,5 … |
| subtítulo do cabeçalho | 12/500 #867E9A. Na 03 com margin-top −8 depois do gap 14 (6 de folga); na 06 num bloco … |

</details>

<details><summary>O que se vê em cada uma das 7 referências</summary>

- `00-tela` — Encerrar sessão, 3 de 8. Contadores gravados e Reinício voltou com check lima e trilho lima. Releitura relendo, com quadrado branco e a legenda de 3 linhas. Os 5 seguintes apagados, com —. Faixa com LED lima, …
- `01-momento-pede-o-corte-de-alimentacao` — Encerrar sessão, 2 de 8. Contadores gravados. Reinício do módulo com glifo de energia lima, 'é com você' e a legenda pedindo desligar e ligar a alimentação. O resto apagado. Faixa M2C-0371 \| KNB-5H39. Botão …
- `02-momento-sessao-encerrada` — Sessão encerrada e faixa 'Sem sessão de configuração'. Prova no poço: A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO em lima, A12.G07.L02.E05.C03 e traço lima. Cartão com as 8 assertivas: 5 com check lima e valor, 2 …
- `03-momento-encerrando-sem-homologar` — Encerrar sessão, 1 de 4, com o subtítulo 'Sem homologar · só o que deixa o módulo seguro'. Contadores, Reinício e Releitura com traço e 'pulado'. Repouso restaurado com check. Canal de programação correndo, …
- `04-momento-encerrada-sem-homologar` — Sessão encerrada e faixa sem sessão. Aviso cinza com pausa: SEM HOMOLOGAR, a instalação continua aberta. Cartão com os 4 passos feitos: Repouso restaurado, Canal fechado, Registro na fila, Desconexão feita. …
- `05-estado-assertiva-falhando` — Sessão encerrada, 7 de 8, sem a prova. O cartão das 8 assertivas sobe pro topo, com Contadores em xis vermelho e '0 km' em vermelho. O resto igual ao 02. Embaixo, bloco com traço vermelho: A HOMOLOGAÇÃO FICA …
- `06-estado-sessao-interrompida` — Sessão interrompida, 3 de 6, 'QAH-1M67 · M2C-0411 · iniciada hoje às 13:05'. Limpeza feita, Ativo A12 e Cercas G07 com check e trilho lima. Leitor com pausa, 'parou aqui' e 'a versão gravada até aqui é …

</details>

**Histórias sem referência:** **HU-T16-1** — Promete faixa com abertura, tempo decorrido e a única saída. Nenhuma das 105 referências mostra hora de abertura ou tempo decorrido (grep em textos.md). Na T16 a faixa aparece sem ação ou sem … · **HU-T16-2** — Canal reaberto sozinho, módulo e ativo travados e repouso inibido são comportamento enquanto a sessão vive. Nenhuma referência da T16 mostra isso. · **HU-T16-7** — O 06 só mostra o link Descartar. Nenhuma referência mostra o que acontece depois nem o registro do descarte, e o mock não tem campo pra ele. · **HU-T16-8** — Não aparece em nenhuma referência da T16. Só em T05/13-estado-pre-checagem-canal-aberto-e-pendencias (caso canal-aberto).

---


## 4 · Os achados

Tudo que contradiz outra parte da pasta, com a prova. A parte 4.1 junta os temas que aparecem em várias telas, e cada TX aponta os itens de prova. A 4.2 traz o que eu medi por programa. As seções 4.3 a 4.9 são os estudos transversais, e a 4.10, cada tela.

### 4.1 · Os achados transversais

**TX-1 · As referências quebram as leis que elas mesmas deveriam seguir.** É o achado central do C0: construir fiel ao PNG fere a lei, e seguir a lei diverge do PNG. Medido:
- **Lei 3 (nada se remonta).** 15 das 16 telas têm pelo menos um estado que move blocos: T01-A2, T02-A1, T03-A4, T04-A12, T05-A9, T06-A5, T07-A2, T09-A1, T10-A7, T11-A5, T12-V1, T13-V2, T14-A3, T15-A7, T16-A5. A T14/02, que a decisão 05 dá como *o exemplo* de nada se remonta, move 41px. A folha 5 já desenha a cadeia com duas alturas (T09-N1).
- **R-03 (o título nunca vira a falha).** T01/05 e T01/07 trocam o título por "Código não confere" (T01-A1).
- **Lei 4 (todo glifo vive num poço).** Há glifos soltos na T01/08, na T07, na T10, na T14 e em 4 espécimes das próprias folhas (DS-V5).
- **Lei 1 (lima só em veredito, escolhido e texto do primário).** Há lima também no campo focado, no "decide agora" do menu, na faixa esperada e em rótulos como "NO CADASTRO" e "O PAINEL MOSTRA" (M15, T04-N1, T01-N1). A logo não entra aqui: a Lei 15 põe a marca no `--lima` (4.7).
- **Leis 5 e 6 (barra só com faixa; o placar é a única que enche).** Há barras que enchem ou não têm faixa (T03-A9, T03-A10, T07-A3, T15-A8, T14-N4).
- **Lei 7 (o aviso tem um formato só).** Há avisos sem poço ou com duas frases (T04-A10, T16-A6, T03-V7).
- **Leis 10 e 11 (texto a partir de 12px, tinta a partir de `--tinta-apagada`).** Há unidades em 10–11px (M8) e traços em `--marca-limite` (M9).
- **Alvo de 48.** Botões de ícone, links e o Cancelar têm 44 (M7).

**TX-2 · A lista de peças das 16 `tela.md` é a coluna "Telas que usam" do `componentes.md` invertida, e está contaminada.**
- As 16 listas são idênticas à inversão da coluna (medido por script).
- Das 374 peças listadas, **192 (51%) não aparecem em nenhuma referência** da tela. A T01 lista "cadeia concluída" e "pede o corte"; na T11, 16 das 21 faltam.
- Faltam também peças usadas de verdade, como a faixa de sessão na T05 e na T12.
- A `tela.md:24` diz *"Medido nas referências"*, e não foi.
- Itens: T01-A10, T02-A3, T03-A3, T04-A8, T05-A14, T06-A6, T07-A14, T08-A4, T10-V8, T11-A13, T12-A1, T13-A15, T14-A4, T15-A13, T16-A16.

**TX-3 · O `componentes.md` conta linhas, não peças.**
- As 8 folhas desenham **120 espécimes com legenda e mais 35 átomos**: 12 glifos, 10 ícones de ferramenta, 8 poços e 5 marcadores.
- Das 114 linhas, 3 estão na folha errada: "falha" é da folha 4, não da 1; "ainda não" e "espera" são da 4, não da 3.
- Os 6 espécimes de toque (primário normal, pressionado e desabilitado, link, linha tocável) e os "botões só de ícone" não têm linha.
- Há 2 duplicatas e 3 composições.
- Na prática, **o C2 constrói 46 componentes mais 8 primitivos**, não 114 peças (DS-A1, DS-A3, DS-N2; tabela no anexo A).

**TX-4 · Ícones: a lei manda Lucide, e o desenho aprovado não é Lucide.**
- As folhas e as telas desenham os ícones à mão. Das 40 formas desenhadas: 9 iguais às do Lucide, 18 próximas, 7 com outra forma, 1 sem equivalente (Conferir configuração), 2 que nem são SVG e 3 da barra do Android.
- O anel dos glifos tem raio 9, contra 10 no Lucide: no mesmo tamanho, o do Lucide fica 11% maior.
- A folha 3 diz *"nunca desenhados à mão"* e desenha todos à mão (DS-N1, DS-N3; tabela Lucide no anexo A).
- O `LEIA-PRIMEIRO` promete ícones em `05-recursos/`, onde só há a marca e a fonte (T05-V12).

**TX-5 · Medidas sem token.**
- Nas referências há cerca de 30 valores em px e 11 letter-spacing que não existem em `tokens.css` (M5).
- Há ainda valores que só coincidem com um token de outro sentido:
  - o 18 é o `--n-unidade-g` usado como espaço;
  - a barra de 30 usa o `--poco-30`;
  - os números de instrumento saem em 22, que é o `--t-titulo-tela`, enquanto o `--n-cartao` de 26 quase não aparece;
  - o raio 34/26 do palco usa `--poco-34` e `--poco-26`.
- O peso de letra não tem token, e as telas chegam a usar 4 pesos no mesmo tamanho (DS-A10, DS-A12, T01-V8, T02-V8, PALCO tabela 6).

**TX-6 · Os tokens têm quatro defeitos.**
1. O `tokens.json` guarda `mov-rapido/padrao/lento = 0ms`, que é o valor do reduzir movimento. E o `08-produto-real/norma-e-ilustracao.md:7` manda o produto real ler o JSON (M1, COERENCIA-A1).
2. Três tokens de poço estão declarados duas vezes (M2).
3. O README diz 23 cores, e são 25 (M3).
4. O `--linha-precheck-sessao` tem três versões da mesma regra (DS-V7).

**TX-7 · O movimento contradiz o movimento.**
- Dos 52 movimentos descritos nos 16 `animacao.md`, 28 passam limpos e **23 contradizem o `movimento.md`**: 6 por duração, 8 por propriedade, 9 por mexer no layout e 3 pelo reduzir movimento.
- Há durações soltas: 100ms, 80ms, 40ms e 600ms.
- As curvas "esmaece" e "acelera" não são token e aparecem em 12 linhas.
- Sete processos não têm ritmo declarado: busca, firmware, leitura da CAN, chassi, releitura, drenagem da fila e envio.
- O próprio `movimento.md:24` manda o pressionado trocar de cor, e o `:43` proíbe animar cor.
- "Animar a entrada de tela" não está definido.

(COERENCIA-A2 a A5, N1 a N3; tabela das 52 linhas no anexo A.)

**TX-8 · A cor da logo · resolvida em 24/09.** O `logo-mobs2.svg` pintava `#B8F23D`, quase igual ao `--lima` (`#AAEF00`) e lado a lado com ele no login. A varredura do estilo não pegava essa cor porque ela mora dentro de um `<img>` (LAC1-V1). O diretor e o arquiteto decidiram:
- o SVG foi alinhado ao `--lima`: só o `fill` mudou;
- entraram a **Lei 15** (*a marca usa o `--lima`*) e a **decisão 28**;
- os dois PNG do login vieram refeitos do design e foram substituídos: só a logo mudou (4.7).

**TX-9 · Números que não existem no mock ou que o contradizem.** Exemplos, por tela:
- T01: `9:41`, `44 s`, `9:28` e o código errado `482911`. Os dois relógios nem saem do mesmo envio;
- T03: `~40 s` e a versão do pacote;
- T05: a lista de módulos "por perto", `8 s` e `62%`;
- T06: "5 no pacote", e o mock tem 10;
- T08: `980 rpm` e `24,8 L/h`, e o mock tem 1.180 e 9,4;
- T10: `14:31`, num relógio parado em 14:30;
- T13: `v4.2.1` (o mock e a T05 dizem 2.3.5), `−71 dBm`, `14:52` e `10,2 V`;
- T14: o evento chega aos `0:48` (o mock diz 24 s), e `6 de 6` campos;
- T15: `14:02` e `13:48`.

O estudo do mock propõe **22 acréscimos aditivos**, AC-01 a AC-22. Cada um tem o ciclo em que entra e a checagem nova do gate, e juntos levam o mock de 33 a 39 casos. O que muda um valor já existente fica fora dessa lista e vai pra decisão (anexo A, "Plano de acréscimos ao mock").

**TX-10 · Estados sem receita.**
- Pelo menos **24 dos 50 estados** não têm como nascer do mock hoje. 20 não têm chave em `M.casos`, e 4 apontam um caso que não produz a referência: T04/03, T07/03, T10/04 e T13/09.
- Entre os que não nascem de dado nenhum estão T02/02, T05/09, T12/02, T13/10 e T15/01 a 04.
- O `casos.md` tem 4 linhas que não são casos e deixa 4 casos de fora.
- O `estados.md` e o `logica.md` citam caminhos que não existem, como `recuperacao.limites.*` em vez de `credenciais.recuperacao.limites.*`.

(DADOS-A1, COERENCIA-A16, T01-A15.)

**TX-11 · O gate aprova sem proteger o que as telas mostram.**
- Ele não lê 13 das 33 chaves de topo e só confere 18 dos 33 casos.
- Não confere as credenciais (T01), a calibração (T10), o ciclo (T14), o autoteste de encerramento (T16) nem os números da fila como a T15 os mostra.
- O estudo do mock já deixou 56 checagens novas em rascunho: 49 passam hoje e 7 falham, e cada falha aponta uma decisão (DADOS-A2; anexo A, tabela 8).

**TX-12 · O mock já conta a instalação do herói como feita hoje às 11:47, e o protótipo a refaz às 14:30.** A i-01 está aprovada, f-05 e f-06 foram recebidos às 09:14 e 09:15, e o hodômetro já foi semeado hoje. Três consequências (DADOS-N1):
- a Seção F homologaria com a prova da manhã (DADOS-A6);
- a T10 abriria "já semeado" (T10-A5);
- a T12 mostra como encerrada a sessão que está aberta (T12-N1).

**TX-13 · O caminho do herói não anda sozinho.** Falta a lista de módulos "por perto". A T09/04 não oferece "Calibrar", só "Voltar ao menu" (T09-A3). A sessão não põe nada na fila, e a fila não tem ritmo. O estado único do `logica.md` tem 6 campos, e as telas pedem pelo menos 15: `sessao.meio`, `sessao.saude`, as etapas de ativo, CAN, conferência e encerramento, a homologação, os casos consumidos, a rede e a sessão de acesso (DADOS-A3, A5; anexo A, tabela 3).

**TX-14 · A faixa de sessão, que deveria ficar parada, muda entre as telas.**
- Tem borda de baixo em 34 referências e não tem em 22 (T12-V3).
- Encolhe para 49–51px em 6 referências (M10).
- A faixa "sem ativo" da T05 não está em nenhuma folha (T05-V3), e a "faixa · sem ação" da folha 2 está desenhada sem casca (DS-A9).
- Isso contraria o `movimento.md:16`.

**TX-15 · Conteúdo cortado onde a lei manda rolar.** Oito referências cortam de 4 a 140px de conteúdo abaixo do rodapé (M11). A decisão 14 manda o conteúdo rolar e o rodapé ficar, então o protótipo vai diferir desses 8 PNGs por construção.

**TX-16 · Números escritos que a medição desmente.**

| Onde | Escrito | Medido |
|---|---|---|
| `logica.md` e `o-que-o-prototipo-simula.md` | a busca acha quatro módulos | 5 |
| T06 | dez ônibus | o mock tem 10 ativos, com 1 caminhão; a referência lista 5 |
| T15 | dois itens, um com erro | só vale fora de Várzea |
| decisão 22 | três estados com o contador | 2 |
| README do design system | 23 cores | 25 |
| `dominio.md` | 52 telas | 16 |
| `palco.md` | a T08 no caminho e nas consultas | 17 entradas pra 16 telas |
| `i-01` no mock | 12 checagens e checklist 10 de 10 | as telas têm 11 e 31 |

**TX-17 · A documentação ficou atrás do design.**
- O `dominio.md` ainda chama duas telas de "Reset de leitura do ativo" e "Manutenção / diff".
- O `dominio.md` faz a sessão nascer na conexão, contra a decisão 07.
- R1, R2 e R3 continuam abertas no `dominio.md`, e só o mock as resolve, em comentário e contra o domínio (COERENCIA-A6 a A8, A10, V1, V2).
- A HU-T11-3 pede 3 ações, e a decisão 21 fixou duas (T11-A11).
- Os comentários do mock usam a numeração do v1 pra leis, decisões e ciclos (DADOS-V4), e o mock e o gate citam caminhos antigos (DADOS-V5).

**TX-18 · O palco desenhado não é o palco escrito.**
- O quadro 04 desenha o painel de dez etapas que a decisão 25 descartou, sem "O caminho", "As consultas" nem o "Recomeçar".
- A T08 está nas duas partes do painel.
- 34 dos 50 rótulos da coluna não existem em lugar nenhum, e 6 estados ficam fora da coluna nos quadros.
- "Um encontrado", que é momento, aparece na coluna.
- No celular, quem abre um estado por link não tem como sair dele.
- O quadrado está a 24 das bordas, não a 16; o celular está a 90%; e o painel empurra o celular em vez de passar por cima.
- A URL só dá endereço a 66 dos 105 lugares.

(PALCO-A1 a A18, V1 a V8, LAC2-V1.)

**TX-19 · O plano de ciclos promete o que a pasta não sustenta.**
- Promete um commit por ciclo, e a pasta **não é repositório git**.
- Promete prévia na Vercel a cada ciclo, e a Vercel só entra no C14.
- O C11 monta os 50 estados de uma vez, e 15 deles não têm caso que os produza.
- O C7 põe o tambor na T08, que não tem tambor.
- O C5 fala em "o diálogo de sair", e a T04 tem dois.
- Pede o print "fotografado em 360 × 800", mas os PNG são 720 × 1600, e nem a ferramenta de captura nem a escala estão declaradas.
- O plano manda usar `@fontsource/barlow`, e as referências usam os woff2 de `05-recursos`.

(COERENCIA tabela 5, A15 a A17, V4, V8.)

**TX-20 · A navegação não está fechada.**
- Nenhum documento diz o que faz o voltar do Android ou do navegador.
- 29 lugares não desenham saída pra trás, e 8 são processos que pedem "não saia".
- Nenhum tocável das 105 leva à T14.
- O ENCERRAR está em 57 referências, e só a `tela.md` da T16 o cita, justo onde ele não aparece.
- 44 das 71 saídas desenhadas não estão em nenhum "O que se toca".

(LAC2-A1 a A6, T04-V8, T06-V7, T09-A8.)

**TX-21 · O leitor de tela não ouve nenhum veredito.**
- Os 398 glifos de estado são `aria-hidden`, e não há nenhuma região viva.
- Em 107 das 367 linhas com glifo em poço, o texto sozinho não diz o veredito, ou diz o contrário: a T14 anuncia "Ré acionada" antes da ré.
- Os 4 diálogos não têm nome nem `aria-modal`.
- Os 4 nomes que as referências dão a tocáveis não estão em nenhum `textos.md`.
- O olho da senha tem dois estados e um nome só.

(LAC3-A1 a A18.)

**TX-22 · As portas naturais brigam com a referência e com o estado parado.**
- O `logica.md` diz que tocar no M2C-0999 abre o serial não cadastrado, mas na referência a linha dele não é tocável (T05-A7).
- O KNB-5H39 não está na lista desenhada da T06 (T06-A3).
- Pela lista da T05, só 7 dos 19 casos com par em Várzea são alcançáveis (DADOS-A7).
- A decisão 11 manda o estado abrir pelo toque, e a 23 manda o estado ficar parado e sem toque (PALCO-V1).

**TX-23 · Folhas e diálogos desenhados sobre uma página vazia.** T01/04, T01/09, T04/05 a 09 e T13/10 mostram o véu sobre o fundo, sem a tela de baixo. No protótipo, a tela vai aparecer atrás do véu, e isso diverge do PNG por construção (T01-V3, T04-V1, T13-A7).

**TX-24 · Vocabulário: três regras, três veredictos.**
- A lista do `dominio.md` §2.2 passa.
- O R3 aplicado (BLE, APN, iButton) passa.
- O fechamento proposto do R3 reprova "CAN-BT".
- O `CLAUDE.md` (*"mencionar tecnologia, protocolo ou código"*) reprova CAN (49 vezes, inclusive o nome oficial "Dados da CAN"), firmware, GPS, SIM e dBm.
- E o mesmo `CLAUDE.md` põe esses textos como norma, *"exatamente como estão"* (COERENCIA-A9).

### 4.2 · O que eu medi por programa

Os scripts rodaram sobre os 105 HTML e, no render, sobre o Chrome da máquina a 360 × 800, com a fonte de `05-recursos`.

- **M1 · O movimento no `tokens.json`.** O `tokens.json` guarda `mov-rapido`, `mov-padrao` e `mov-lento` = `"0ms"` (linhas 366–377), e o `tokens.css`, 150, 200 e 300ms (linhas 110–112). O JSON copiou o valor do `@media` do reduzir movimento. E o `08-produto-real/norma-e-ilustracao.md:7` diz que a norma dos tokens é o `tokens.json`.
- **M2 · Tokens duplicados.** O `tokens.css` declara `--poco-24`, `--poco-32` e `--poco-44` duas vezes (linhas 95–97 e 103–104). São 95 nomes únicos em 98 declarações no `:root`.
- **M3 · Cores da paleta.** O README do design system diz "as 23 cores estão na paleta", e o `tokens.css` tem 25 hex: 6 fundos, 7 bordas, 4 tintas, 4 fora de texto e 4 de ação. As referências usam 24; só o `--roxo-pressionado` (#4A2A80, "NOVO · validar no aparelho") não aparece em nenhuma.
- **M4 · Cores das referências.** Todo estilo inline das 105 referências usa cor de token: 24 hex e 6 rgba, nenhum solto. No pixel havia mais uma: o `#B8F23D` da logo, alinhado ao `--lima` em 24/09 (4.7); os PNG da T01 já vieram refeitos. Há ainda o traço da bateria da barra do sistema, em `#F2F0F7` a 0,45.
- **M5 · Medidas sem token.**
  - `height`: 5, 7, 9, 43, 45, 46, 54, 58, 60, 76 e 78;
  - `min-height`: 42, 54, 58, 68, 70, 86, 88, 108 e 430;
  - `width`: 3, 9, 74 e 196;
  - `padding-top` 177, `left` 3 e `border-radius` 16 e 26 (T04);
  - letter-spacing: 11 valores (0,1 · 0,2 · 0,3 · 0,4 · 0,6 · 1 · 1,2 · 1,4 · 1,5 · 1,6 · 2, mais os negativos), nenhum com token;
  - bordas de 1 e 2px: sem token.
- **M6 · `textos.md` × HTML.** Idênticos nas 105.
- **M7 · Alvos de toque abaixo de 48** (o `usuario.md` pede "alvo de toque de 48px"):
  - T01: "Mostrar a senha", 44×44 (00, 01), e "Não recebi o código", 121×44 (03, 05, 06, 07);
  - o X "Fechar" das folhas, 44×44 (T01/04, T04/05, T04/07, T04/08);
  - T04: "GARAGEM VÁRZEA", 135×44, e "Conta — Rafael Vieira", 44×44 (as 10 referências), e o "Cancelar" da T04/06, 282×44;
  - T15/02: "Ressincronizar e reenviar", 294×46.
- **M8 · Texto abaixo de 12px fora de caixa alta** (Lei 10). São todos unidades ou contagens junto de número:
  - T07: "%" em 11 (4 referências);
  - T08: "km", "km/h", "rpm", "%" e "L/h" em 11;
  - T13/03: "sat", "de 4" e "dBm" em 10; T13/04: "de 3", "km" e "h" em 10; T13/06: "de 31" em 10;
  - T04/05: "0" e "7" em 11.

  O token `--n-unidade-p` é 12px.
- **M9 · Texto abaixo do piso de tinta** (Lei 11). Na T08/00 (12 nós) e na T08/01 (7 nós), os traços "—" dos mostradores apagados estão em #6E6683. Esse é o `--marca-limite`, que o `tokens.css` marca como "só fora de texto (3:1)".
- **M10 · A faixa de sessão encolhe.** Ela é declarada com 52px e, com `flex-shrink` 1 e o conteúdo passando de 800, renderiza:

  | Referência | Altura |
  |---|---|
  | T07/01 | 51,4 |
  | T09/00 | 50,7 |
  | T09/04 | 51,1 |
  | T13/04 e T13/05 | 49 |
  | T14/01 | 51,3 |

  O título dessas referências fica 1 a 3px acima do das irmãs.
- **M11 · Conteúdo cortado.** O `overflow:hidden` corta conteúdo em 8 referências, e a lei é "o conteúdo rola e o rodapé fica":

  | Referência | Cortado |
  |---|---|
  | T07/01 | 6px |
  | T09/00 | 15px |
  | T09/04 | 10px |
  | T12/03 | 11px |
  | T13/04 | 140px |
  | T13/05 | 37px |
  | T14/01 | 7px |
  | T14/04 | 4px |
- **M12 · O link no fim do rodapé.** O padding do rodapé é 24, mas o link de 48 tem margem de −4px e termina a 20px do pé (56 referências). Na T01, o link termina a 24. É uma medida a replicar, não uma violação.
- **M13 · Um primário por tela.** Nenhuma referência tem dois. 31 não têm nenhum (listas, folhas, processo correndo). Todo primário mede 56.
- **M14 · A barra do sistema.** Mede 30px em todas. Não há token de 30 pra barra; o `--poco-30` existe com outro sentido. A cor dela sangra no primeiro andar em 105/105.
- **M15 · Lima em texto fora do primário: 22 textos.**
  - **Vereditos:** GRAVADO E RELIDO, HOMOLOGADA, LEITURA REFEITA, CONFERE COM O CADASTRO, A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO, aprovada, BAIXADO AGORA, 21 e 31 DE 31 CONFERIDOS, e os contadores 11 e 5.
  - **Escolhido:** ESCOLHIDO e MENSAGEM.
  - **Campo focado:** SENHA e JUSTIFICATIVA.
  - **Os que não cabem nas três categorias da Lei 1:** "toque para escolher" e "toque para procurar" (T04, peça "decide agora"), "12,0 — 15,0" (a faixa esperada, na T07 e na T13), "NO CADASTRO" (T06), "O PAINEL MOSTRA" (T10), "VERSÃO LIDA NO MÓDULO" (T11) e "NADA SE PERDE" (T08).
- **M16 · Vermelho.** Nenhuma referência passa de dois portadores de urgência. Na T14/02, são o cronômetro e a linha "recebido no servidor"; na T07, o contador e o cartão.
- **M17 · Tocável sem nome.** Na T01/08, o campo da senha nova não tem rótulo: há 0 `<label>` no HTML. O T01/01 que o render acusou é falso positivo, porque os dois campos têm `<label for>` (LAC3-V1).
- **M18 · O cursor.** As referências usam `cursor: pointer` em 336 tocáveis, e a lei do protótipo manda a seta dentro do celular. A referência é gabarito, não peça: isso não se copia.
- **M19 · Lei 3: o que se desloca entre a 00-tela e cada estado.**
  - na T10/04, o título sobe de 158 pra 138: 20px, porque o estado "1 de 1" não tem a linha "Depois:";
  - na T05, o título passa de 58 pra 59 ou 60 entre a busca e a pré-checagem;
  - o rodapé muda de altura quando passa de duas ações pra uma (659 ↔ 697) ou ganha legenda (633). Como ele é ancorado no pé, o conteúdo de cima não mexe.

### 4.3 · Design system · as oito folhas

*O que foi medido:* Li README, leis, movimento, componentes e tokens. Abri as 8 PNGs e medi os 8 HTML com um parser da biblioteca padrão do Python (scratchpad/tmp/ds/tree.py, medfolha.py). Comparei cada espécime com as 105 referências de tela (overlap.txt). Para ter a forma canônica dos ícones, baixei os SVG do lucide-static v1.47.0 no scratchpad, pelo jsDelivr. Não instalei nada. A comparação lado a lado ficou em scratchpad/tmp/ds/cmp.png. O que medi. As folhas desenham 120 espécimes com legenda, mais 35 átomos na folha 3: 12 glifos, 10 ferramentas, 8 poços e 5 marcadores. O componentes.md tem 114 linhas. Dessas, 111 estão na folha certa e a regra repete a legenda palavra por palavra. 3 estão na folha errada. Ficam sem linha 6 espécimes e os 35 átomos. Nas 114 há 1 duplicata e 4 composições. Por família, as 114 linhas cabem em 46 componentes. O C2 precisa de mais 8 primitivos sem linha: tipografia, poço, glifo, ícone, marcador, primário, só-ícone e superfície tocável. Link e secundário já têm linha e estão entre os 46. Ícones. Das 40 formas desenhadas, 9 são iguais às do Lucide e 18 são próximas, com outra proporção. 7 mudam de forma: sem sinal, sem sinal neutro, pausa, lua, CAN espelhado, Configurar que é um sol e checklist com 3 checks. 1 não tem equivalente (Conferir configuração). 2 nem são SVG (traço e agora) e 3 são da barra do Android. O anel dos glifos tem raio 9 e o do Lucide tem 10: com o mesmo tamanho, ele cresce 11%. Por isso Lucide e 'comparar com a folha' não fecham juntos (DS-N1). Fundamentos. A folha 1 mostra as 25 cores de tokens.css, sem nenhuma diferença (o README diz 23). As 6 transparências aparecem só como texto. Mostra 11 tamanhos de letra, com um peso por tamanho, e 5 números. O tambor só está desenhado parado, na folha 5, e não tem janela nem fita. A folha 8 não desenha tambor. Achei 16 achados novos na escala do design system, 9 divergências e 3 coisas que não fazem sentido. Onde o tema já estava nos itens das telas, cito o id.

- **DS-A1** · alta · ✔ As folhas desenham 120 espécimes com legenda e 35 átomos. As 114 linhas de componentes.md cobrem 111 na folha certa. Ficam de fora 6 espécimes sem linha, 3 linhas na folha errada e os 35 átomos.
  - *Prova:* tmp/ds/especimes.txt (F1 5 · F2 20 · F3 1 · F4 32 · F5 17 · F6 23 · F7 18 · F8 4 = 120) · casamento automático: 'FOLHA ERRADA' em componentes.md:9, :41, :42 · 'ESPÉCIME SEM LINHA': primário normal/pressionado/desabilitado, link, linha tocável (F1), botões só de ícone (F6) · folha-3:16 desenha 12+10+8+5 átomos sem nenhuma linha …
- **DS-A3** · media · ◐ Das 114 linhas, 'contador no menu' (F7) tem a mesma geometria de 'com pendência' (F4). 4 linhas são composições de outras. Três grupos só mudam de cor (barra ×3; aprovada, pré-checagem e ainda não; foto aguarda e tirada).
  - *Prova:* Jaccard de estilos por espécime, cor ignorada: (1.0) F4 com pendência × F7 contador no menu · (1.0) barra do sistema × no menu × sem sessão · (1.0) aprovada × pré-checagem × ainda não · (1.0) foto aguarda × tirada · subconjunto 1.0: faixa no menu ⊂ o topo do menu inteiro, linha de garagem ⊂ a lista de garagens, seção recolhida …
  - *Correção do verificador:* Um par só muda de cor: a barra ×3. Aprovada e pré-checagem são idênticas, nem a cor muda. Ainda não e foto tirada mudam o glifo, não só a cor. Com pendência × contador no menu: mesma geometria, ícone e número diferentes. Continência 1.0, mais que as 3 da prova: o topo do menu inteiro contém tira de contexto, faixa no menu e …
- **DS-A4** · media · ◐ O traço dos ícones nas folhas usa 2 e 2.4, que não são token e não aparecem em nenhuma tela. A Lei 14 não se cumpre nem nas folhas: o glifo de 13px leva 2.2, e não 2.6, e os de 22 e 26 levam 2.2, e não 1.8.
  - *Prova:* contagem de stroke-width por tamanho: DS (13, 2.2) ×1 · (22, 2.2) ×1 · (26, 2.2) ×1 · (16 e 20, '2') ×3 · (20, '2.4') ×1 · telas só 1.8 / 2.2 / 2.6 · leis.md:22 e tokens.css:105–107
  - *Correção do verificador:* Só o 13px fere a Lei 14 (leis.md:22, '2,6 abaixo de 14px'). A regra '1,8 nos de 22px ou mais' não é da Lei 14. Ela está em tokens.css:106 e na linha 'traço de ícone' da folha-1. A Lei 14 manda 2,2 nos glifos, e o 22 e o 26 são glifos de estado (xis e check). Aí as duas normas se contradizem. As telas repetem o caso: (22, 2.2) …
- **DS-A5** · media · ✔ Os ícones são desenhados em três grades (viewBox 24, 20 e 16). O Lucide só tem 24. Com o mesmo stroke-width, o traço que aparece muda: o check mini dá 1,95px contra 1,30px, e o chevron do acordeão 1,76 contra 1,47.
  - *Prova:* folha-5:100 viewBox 0 0 16 16, width 12, sw 2.6 · folha-2:64 e F4/F7 viewBox 0 0 20 20 · conta: 2,6×12/16 = 1,95 · 2,6×12/24 = 1,30 · 2,2×16/20 = 1,76 · 2,2×16/24 = 1,47
- **DS-A6** · media · ✔ O relógio do catálogo (F3) não é usado em lugar nenhum. O produto usa outro relógio, desenhado na F7, 42 vezes em 6 telas.
  - *Prova:* folha-3:16 'M12 7.5v5l3 2' → 0 ocorrências nas 105 · folha-7:156 'M12 7.5V12l3 1.8' → 42 (T05, T12, T13, T14, T15, T16) · mesmo tema de T14-A13, na escala da tela
- **DS-A7** · media · ◐ O poço 32 leva glifo de 20, 19 ou 18, conforme a folha. As ferramentas da F3 estão num poço de 36, que não é token e não é usado em nenhum outro lugar: o menu usa 30.
  - *Prova:* poço→glifo: DS (32,20) ×10 só na F3 · (32,19) ×20 F4/F5 · (32,18) ×1 F7 linha de seção do mapa · telas (32,19) ×51 · (32,18) ×12 · (36,18) ×10 só na F3 · menu F4 e T04 (30,18) · tokens.css:104 'ícone = 60%'
  - *Correção do verificador:* Nas telas, (32,19) = 61 (T12 ×17 · T16 ×44), não 51. A T12/00 e a T12/03 escrevem o poço sem espaço ('width:32px;height:32px;…'), 5 em cada, e a contagem da prova não pegou. (32,18) ×12 na T13 confere.
- **DS-A9** · media · ✔ A 'faixa · sem ação' da F2 está desenhada sem a casca: sem os 52, sem fundo, sem padding e sem borda. As telas que a usam desenham a faixa inteira.
  - *Prova:* folha-2:56–61: o espécime começa direto no div 'display: flex; align-items: center; gap: 10px' · T16/00-tela.html:25 'height: 52px; background: #16131D; border-bottom: 1px solid #2E2840; … padding: 0 16px' (T16/00, 01, 03)
- **DS-A10** · media · ◐ A folha 1 fixa um peso por tamanho de letra, mas as telas usam 2 ou 3 pesos no mesmo tamanho. O peso 400, que vem no pacote da fonte, nunca é usado. Nenhum token de peso existe.
  - *Prova:* F1: 13px → 500 · telas: 13px 700 ×320, 600 ×65, 500 ×42 · 14px 500 ×234, 600 ×130, 700 ×35 · 12px 500 ×144, 600 ×94, 700 ×8 · font-weight 400: 0 nas 105 · tokens.css:52 só em comentário
  - *Correção do verificador:* O 400 é usado. Nas telas, 35 textos de 12 a 14px não declaram peso nem herdam um, e saem em 400 (a Barlow 400 está em 05-recursos/fontes/barlow.css:1): 12px ×12, 13px ×22, 14px ×1. Exemplos: T14/00:67 'campos conferidos', T07/00:131 'Ignição', as 3 linhas numeradas da T05, p da T03, T08 e T13. Nas folhas são 49, entre eles os …

<details><summary>8 de gravidade baixa</summary>

- **DS-A2** · baixa · ✔ Em toda linha que casa, a regra de componentes.md é a legenda da folha palavra por palavra. A coluna de regra não traz informação que a folha não tenha.
  - *Prova:* comparação regra × legenda (span 12px #867E9A depois do espécime): 111/111 iguais, 0 'REGRA DIFERE'
- **DS-A8** · baixa · ✔ Três dos oito tokens de poço (22, 28 e 44) e o glifo 'ok cinza' estão desenhados e não têm nenhum uso. Já o círculo cinza, usado duas vezes nas folhas e nas telas, não está no catálogo.
  - *Prova:* contagem de caixas com fundo #0B0910 e borda #06050A nas 105 telas e nas folhas 1, 2 e 4–8: nenhuma com 22, 28 ou 44 · ok #A9A2BC: 0 nas telas · círculo #A9A2BC: F4 'seção recolhida' e 'linha da fila · esperando', telas com #A9A2BC
- **DS-A11** · baixa · ◐ Na folha 1, os espécimes de 20 e de 22 não têm o letter-spacing que a própria legenda deles pede. Nas telas, o 22 leva −0,3 em 64 de 97 usos, e o 20 leva −0,2 em só 1 de 21.
  - *Prova:* folha-1:16 espécimes '[20/700/ls-]' e '[22/700/ls-]' com legenda 'letra −0,2' e 'um por tela · letra −0,3' · contagem nas telas: 22 {−0.3: 64, sem: 32, 1: 1} · 20 {sem: 14, 1.4: 4, 1: 2, −0.2: 1}
  - *Correção do verificador:* Nas telas, contando o estilo sem espaço: 22px com −0,3 ×73, sem ×32, 1px ×1 (73 de 106, não 64 de 97). 20px sem ×15, −0,2 ×4, 1,4 ×4, 1 ×2 (4 de 25, não 1 de 21). O −0,2 está na T01/04 'Não recebi o código' e nos 3 h1 'Conta' da T04/05, escritos sem espaço. Os 32 de 22 sem letra são números e traços de mostrador (T07, T08, T10).
- **DS-A12** · baixa · ◐ O --n-cartao (26, 'valor em cartão') não aparece em nenhum número das 105 telas. Os cartões das folhas 5, 7 e 8 e 36 números das telas usam 22, que é o --t-titulo-tela.
  - *Prova:* span 22px só com número: telas 36, DS 4 · 26px com número: telas 0, DS 1 (o espécime da F1) · folha-5:60 '31' em 22 · folha-8:18 '184.320' em 22 · mesmo tema da decisão T07-D12
  - *Correção do verificador:* O --n-cartao aparece em número nas telas: T04/05:52 'ACESSO VENCE EM 2 dias' em 26/700, igual na folha-2:123. E T01/02:37, o telefone '(81) 98715-8675' em 26. Os '36 números' são 14 números + 22 traços. O que fica de pé: o valor de instrumento em cartão ou poço (T07, T10, F5, F8) sai em 22, o tamanho do --t-titulo-tela, e não …
- **DS-A13** · baixa · ✔ A unidade junto de um número de 40 não tem regra, e a folha usa 18. O 'km' do tambor mede 13, e o token da unidade é 12.
  - *Prova:* folha-1:16 '40px … −1px' com km em 18 · tokens.css:72–73 'junto de número até 34' e 'junto de 48 e 62' · folha-5:94 'km' em 13px (igual na T07)
- **DS-A14** · baixa · ✔ O quadro 'AS LEIS' da folha 1 não tem a Lei 14 (o ícone vem do Lucide) e traz no lugar dela 'nada encosta', que é lei de medida.
  - *Prova:* folha-1:16, 14 linhas: 'lima marca veredito' … 'valor vem de token', 'nada encosta' · leis.md:22 (Lei 14) e leis.md:31 (nada encosta, lei de medida)
- **DS-A15** · baixa · ◐ O mock dá ícone Lucide às grandezas da calibração (activity, gauge, map, clock), e nenhuma referência desenha esses ícones. Dois deles, activity e gauge, já são os ícones de 'Dados da CAN' e de 'Calibração'.
  - *Prova:* 04-dados/mocks.js:705–709 · nenhum SVG de map nas 105 · activity e gauge só na T04 (menu)
  - *Correção do verificador:* Nenhuma referência liga ícone a grandeza, mas 3 das 4 formas estão desenhadas. activity ('M3 12h4l3 8 4-16 3 8h4') e gauge ('M3.5 18a10 10 0 1117 0') só como ferramenta do menu, na T04/00, 03 e 04. clock é o relógio da F7, 42× em 6 telas. Só map não existe em lugar nenhum. O mock daria à Rotação o ícone da ferramenta CAN, à …
- **DS-A16** · baixa · ✔ As PNGs das folhas estão a 1× e as das telas a 2×. A foto da vitrine do C2 precisa sair a 1× e na mesma moldura de espécime (360 de largura, padding 16, ou 0 no chrome).
  - *Prova:* html × png: folha-1 4700 = 4700 · folha-3 1550 = 1550 · as 8 iguais, largura 1440 = viewport 1440 (folha-3:5) · a moldura de espécime é 'width: 360px; padding: 16px; border: 1px dashed #2B2540'

</details>

### 4.4 · O palco

*O que foi medido:* Li palco.md, logica.md, ciclos.md, publicar.md, a lei do protótipo, as decisões 06, 11, 13, 23, 24, 25 e 26, o README e o indice.json das telas. Abri os 5 quadros PNG e medi os 5 HTML de duas formas: pelo estilo inline e num render headless do Chrome a 1440×900 (getBoundingClientRect). Tirei a cor dos pixels pra conferir a moldura. Tirei as 4 imagens de dentro do celular e comparei com as 105 referências. Rodei também as 105 referências a 360×800 pra ver o que o quadrado cobre no modo estreito. Conclusões. As peças batem com o palco.md na coluna (230, a 40 do celular, linhas de 32) e no marcador (poço 24, quadrado lima 10). O resto diverge em quatro pontos: - o quadrado fica a 24 da borda, não a 16; - o celular está a 90%, mas moldura e raio não diminuíram junto: a moldura mede 9 de um lado e 7 do outro, e ele não fica centrado na vertical; - o painel empurra o celular 90px pra direita; - o painel do quadro 04 é o das "dez etapas", descartado na decisão 25: não tem "O caminho", "As consultas" nem o "Recomeçar do login". A T08 aparece duas vezes no palco.md; o quadro a põe no caminho. Na coluna faltam três coisas: - **Rótulos.** O indice.json não tem campo de rótulo nem de grupo, e só 16 dos 50 rótulos estão desenhados. - **Estados.** O quadro 00 tira a T01 e a T02 da coluna, e o 01 mostra só 2 dos 4 estados da T04. Com isso, 6 estados ficam sem porta. - **Parado.** Abrir um estado empurra a lista 48px pra baixo. O único caso de "mais de seis" é a T05, com 11. O quadro 03 põe nela um momento ("Um encontrado"). Dentro do celular, os quadros são prints: cada imagem é o PNG de referência. Nada de lima fora do marcador. No modo estreito: - não há coluna nem "Voltar ao fluxo", então um link de estado aberto no celular fica sem saída; - o quadrado a 16 cobre o relógio nas 105 referências, a identidade da sessão em 65 e o GARAGEM VÁRZEA nas 10 da T04; - entre 900 e ~964px de largura a coluna não cabe. A URL só endereça tela e estado, embora a logica.md diga que todo lugar tem endereço. Etiqueta de versão e Recomeçar não estão desenhados em nenhum quadro. Todas as cores do palco são token. Mas duas estão no uso errado: --marca-limite como texto, a 3,76:1, e --fundo-cartao como pressionado. Há 14 grupos de px sem token de sentido.

- **PALCO-A1** · alta · ✔ O quadro 04 desenha o painel que a decisão 25 descartou: dez etapas, sem 'O caminho' e 'As consultas', e sem o 'Recomeçar do login' no pé.
  - *Prova:* 04-painel-aberto.html:17-45 · 10 cabeçalhos (ENTRAR … ENVIAR E CONSULTAR); grep -c 'caminho\|consultas\|recome' = 0 nos 5 HTML · 07-decisoes/25-painel-duas-partes.md:7 'O que foi descartado. As dez etapas.'
- **PALCO-A2** · alta · ✔ A T08 está nas duas partes do palco.md (17 entradas pra 16 telas). O quadro 04 a põe só no caminho (LER A CAN), e as consultas ficam com três. O caminho do herói não passa pela T08.
  - *Prova:* palco.md:16 'T01 a T10' e :17 'T15, T11, T12 e T08' · 04-painel-aberto.html:31 T08 sob LER A CAN, :41 ENVIAR E CONSULTAR com T15, T11, T12 · logica.md:24-29 sem T08
- **PALCO-A3** · alta · ◐ A coluna não tem de onde tirar o rótulo nem o grupo. O indice.json, que é o que o palco lê, não tem esses campos, e só 16 dos 50 rótulos estão desenhados. Os outros 34 teriam de ser inventados.
  - *Prova:* 02-telas/README.md:34 · chaves do indice: id, tela, pasta, tipo, nome, titulo, como, caso, html, png · titulo 'T05 · pre-checagem · #9 pool de cercas esgotado' contra 'Pool esgotado' (03:19) · rótulos desenhados: T04 = 2, T05 = 11, T07 = 3
  - *Correção do verificador:* O rótulo confirma: o indice não tem o campo, e 34 dos 50 teriam de ser escritos. O grupo, não: só a T05 precisa de grupo. Os nomes estão em palco.md:25, e quem cai em cada grupo está desenhado no 03 (e no 00, que diverge, ver A7). Falta o campo no indice, não o desenho.
- **PALCO-A4** · alta · ✔ Seis dos 50 estados ficam fora da coluna nos quadros: T01 (3) e T02 (1), que o 00 diz que não mostram coluna, e T04/08 e T04/09, que o 01 não lista. O C11 promete os 50 pela coluna.
  - *Prova:* 00-componentes.html:15 'tela sem estado de condição · T01, T02 e T08 não mostram coluna' · 01-no-fluxo.html:19 (2 linhas) · indice: T01 3, T02 1, T04 4 estados · ciclos.md:87
- **PALCO-A5** · alta · ✔ No modo estreito não há coluna nem 'Voltar ao fluxo'. Um link de estado aberto no celular monta o app parado e sem toque, e o toque manda piscar um botão que não existe: a única saída é o painel.
  - *Prova:* palco.md:35 e :41 · publicar.md:19-20 (o link abre no celular, no modo estreito, com ?tela=T07&estado=…)
- **PALCO-A6** · media · ◐ Abrir um estado desloca a coluna: o 'Voltar ao fluxo' (34 + gap 14) empurra a lista 48px pra baixo. A linha clicada foge do cursor, e um segundo clique no mesmo ponto cai no 'Voltar ao fluxo'.
  - *Prova:* render headless: 01/04 lista em y=95; 02 botão em 95–129 e lista em y=143 (02-num-estado.html:19)
  - *Correção do verificador:* O deslocamento de 48 confirma. O segundo clique só cai no 'Voltar ao fluxo' na primeira linha, e com x ≤ 1060. Nas outras linhas, o centro da linha k cai no topo da linha k−1: abre outro estado. À direita de 1060, cai no vazio.
- **PALCO-A7** · media · ◐ O quadro 03 põe 'Um encontrado' (T05/02, momento no indice) no grupo ACHAR, contra palco.md:24 e R-04. O 00 não tem essa linha nem 'Firmware fora · sem rede' (T05/09): o 00 tem 10 linhas, o 03 tem 12 e o indice tem 11 estados. Os grupos só existem nos quadros.
  - *Prova:* 03-tela-com-muitos-estados.html:19 · 00-componentes.html:15 (coluna T05) · indice T05/02 tipo 'momento' · leis.md:43
  - *Correção do verificador:* Tudo confirma, menos 'os grupos só existem nos quadros'. Os três nomes estão em palco.md:25 ('na T05: achar, conectar, conferir'). Só nos quadros está qual estado cai em qual grupo.
- **PALCO-A8** · media · ✔ Nos quadros, o celular está a 90% (324×720), mas a moldura e o raio não diminuíram junto (8+1, 34/26). A imagem de 324 não cabe nos 322 da caixa, e a moldura sai com 9 de um lado e 7 do outro. A 1440×900 o tamanho real cabe, então o build sairá 10% maior que o quadro, e o topo em 50 não está no centro.
  - *Prova:* 01-no-fluxo.html:16 (340×736 border-box, recheio 8, borda 1, img 324×720) · PNG 01 y=400: borda x=550, tela 559–882, borda 889 · 00 'nos quadros, desenhado a 90%' · 816+50=866 ≤ 900 · sobra embaixo 900−786=114
- **PALCO-A9** · media · ◐ O quadrado está a 24 da borda nos quadros e a 16 no palco.md. O X do painel está a 16 e mede 36, não 44.
  - *Prova:* 01/02/03-*.html:15 'left: 24px; top: 24px' · palco.md:9 · 04-painel-aberto.html:16 X 36×36, render em 227–263 × 16–52
  - *Correção do verificador:* O quadrado confirma: 24 contra 16. O X confirma na medida (36, a 16), mas 'não 44' não tem fonte. palco.md:12 só diz 'fecha no X', e nenhum documento dá tamanho a ele. É medida sem norma, não divergência.
- **PALCO-A10** · media · ✔ No quadro 04, abrir o painel empurra o celular e a coluna 90px pra direita, contra 'por cima de tudo' e contra o próprio 00 ('CELULAR não se mexe quando o painel abre').
  - *Prova:* 04-painel-aberto.html:46 left 640 e :47 left 1020, contra 550/930 em 01-03 · palco.md:12 · 00-componentes.html:15 (MOVIMENTO · LEVE)
- **PALCO-A11** · media · ✔ Dentro do celular, os quadros mostram prints, não o app: cada imagem é o PNG de referência reduzido. Como gabarito isso vale, mas o C3 constrói telas vazias e não tem conteúdo pra comparar.
  - *Prova:* JPEG 648×1440 de cada quadro × referência reduzida: 01 = T04/00 (diferença média 1,38/255), 02 = T07/01 (1,86), 03 = T05/00 (1,36), 04 = T07/00 (1,56); com as outras telas ≥ 9,97 · 07-decisoes/23:3,5 · ciclos.md:39
- **PALCO-A12** · media · ✔ No modo estreito, o quadrado flutuando a 16 cobre o relógio nas 105 referências, a identidade da sessão na faixa em 65 e o tocável GARAGEM VÁRZEA nas 10 da T04.
  - *Prova:* render headless das 105 a 360×800, caixa 16–60: '14:30'@18,7 em 105; 'M2C-…'@34,46 em 65; botão GARAGEM VÁRZEA @16,34 135×44 em 10 · palco.md:41
- **PALCO-A13** · media · ✔ Entre 900 e ~964px de largura o palco não cabe: com o celular real no centro, a coluna termina em W/2+458. A 900, ela termina em 908. O 'escala inteiro pra caber' não diz se a coluna entra na conta.
  - *Prova:* 376/2 + 40 + 230 = 458 · W ≥ 916 sem margem; 948 com 16; 964 com 24 · palco.md:10-11 e :41
- **PALCO-A14** · media · ✔ A etiqueta de versão não está em quadro nenhum. Não tem canto (esquerdo ou direito), formato, tamanho, nem de onde vem a data, e ela não pode vir do relógio.
  - *Prova:* grep 'etiqueta\|versão\|C3' sem ocorrência nos 5 HTML · palco.md:42 · publicar.md:21 · CLAUDE.md raiz: 'zero new Date()'

<details><summary>4 de gravidade baixa</summary>

- **PALCO-A15** · baixa · ✔ Os rótulos de grupo da coluna (ACHAR, CONECTAR, CONFERIR) estão em --marca-limite, que é só fora de texto: 3,76:1 sobre o fundo do palco, abaixo do piso de 4,5. É o mesmo tema do M9, na escala do palco.
  - *Prova:* 03-tela-com-muitos-estados.html:19 'color: #6E6683' · tokens.css:33 · leis.md:19 · contraste calculado 3,76 sobre #06050A (#867E9A dá 5,29)
- **PALCO-A16** · baixa · ◐ Os três ícones do palco (grade, X, voltar) são desenhados à mão, com traço 2. A Lei 14 manda Lucide com 2,2 / 1,8 / 2,6. É o mesmo tema de T01-V9, T05-V12, T09-V7 e T16-V9.
  - *Prova:* 01:15 (4 rects 6,5) · 04:16 (path M6 6l12 12) · 02:19 (path M10 7l-5 5 5 5 …) · stroke-width='2' em todos · leis.md:22
  - *Correção do verificador:* A grade e o voltar são desenhados à mão. O layout-grid do Lucide tem 7×7 em 3/14 com rx 1, e o voltar não é o undo-2 nem o corner-up-left. O X, não: é o mesmo traçado do x do Lucide (m6 6 12 12 · M18 6 6 18), só que num path. O que os três erram é o traço 2, que não é nenhum dos três valores da Lei 14. Pra ferramenta seria …
- **PALCO-A17** · baixa · ◐ A lista do painel já estoura sem o pé: vai até 897 de 900, com o recheio de baixo cortado. Com o Recomeçar, a lista precisa rolar, e isso não está escrito.
  - *Prova:* render do 04: cabeçalho 0–69, primeiro rótulo em 73, T12 em 863–897; o recheio de 16 fica escondido pelo overflow · 16×34 + 10×28 + 69 + 4 = 897
  - *Correção do verificador:* A conta confirma, mas vale só pro quadro descartado (A1). Com as duas partes da decisão 25, são 2 cabeçalhos, não 10. 69 + 4 + 2×28 + 16×34 = 673, ou 707 com a T08 nas duas partes (A2). A 900, sobram de 177 a 211 pro pé com o Recomeçar. A lista só precisa rolar em janela mais baixa, e isso de fato não está escrito.
- **PALCO-A18** · baixa · ✔ O piscar do 'Voltar ao fluxo' não tem desenho, tempo nem alvo: não se diz se o toque na moldura conta, nem o que acontece com reduzir movimento, quando os tokens vão a 0ms.
  - *Prova:* 02-num-estado.html:19 (botão parado, sem variante) · palco.md:35 · 00 ESTADO 'tocar nele faz o Voltar ao fluxo piscar uma vez' · tokens.css:116-118

</details>

### 4.5 · O mock e o contrato de dado

*O que foi medido:* Li inteiros contrato.md, casos.md, mocks.js (1091 linhas), gate-cobertura.js, logica.md, o-que-o-prototipo-simula.md e pendencias.md. Medi tudo com node sobre o próprio mock. Nada foi escrito no projeto: os rascunhos estão em scratchpad/tmp/dados/. Sementes: 11 das 16 batem com o mock. T05 ('quatro módulos') não tem fonte. T08 ('leitura feita') não tem campo. T15 ('dois itens, um com erro') só vale para Ibura ou Caruaru: Várzea tem 2 pendentes e 0 erro. T16 ('homologada') é estado do app, não do mock. T01 esbarra na sessão de acesso aberta há 5 dias. O caminho do herói não anda sozinho. Faltam a lista 'por perto' e o meio de conexão. Falta a saída da T09 para a T10. A fila da sessão não existe: nenhum item novo nasce, e nada sobe sem um ritmo. E o mock já conta a instalação do herói como feita hoje às 11:47 (i-01, f-05, f-06, ultimas.hodometro 0). O protótipo refaz tudo às 14:30. Por isso a Seção F passaria com prova da manhã e a T10 abriria 'já semeado'. O estado único de logica.md guarda 6 campos. As telas pedem mais: sessao.meio, etapas de ativo, CAN (lida e refeita), conferência, homologada e encerramento, os casos já consumidos (a 1ª tentativa que falha), a rede e a sessão de acesso. Cobertura: 20 dos 50 estados não têm receita mecânica no indice.json. O gate não lê 13 das 33 chaves de topo nem 15 dos 33 casos. Escrevi em rascunho 56 checagens novas: 49 passam hoje e 7 falham. Cada uma das 7 que falham aponta uma decisão. Leitura no Vite, medida no Vite 8.0.13 disponível na máquina: o import de efeito colateral de fora da raiz funciona no dev sem server.fs.allow, e só um arquivo não importado leva 403. O build empacota o mock na ordem certa. O build só com a app/ quebra com UNRESOLVED_IMPORT, o que confirma publicar.md:33-35. O objeto do mock é mutável e compartilhado. structuredClone(M) falha por causa da função diasAntes. Determinismo: o mock é puro. Os riscos são três: o índice posicional splice(23), o toLocaleString() sem locale (dá 482,317 em en_US) e o mesmo fato guardado ora como texto formatado, ora como número. O limite de 24 h e o de 8 caracteres não estão no mock. Os ritmos vivem só em movimento.md, e 7 processos ainda não têm ritmo. Plano: 22 acréscimos aditivos (AC-01 a AC-22), cada um com o seu ciclo e com a checagem que o gate passa a recomputar. Somam 6 casos (33 → 39) e 2 chaves de topo.

- **DADOS-A1** · alta · ◐ 20 dos 50 estados não têm receita mecânica no indice.json: 30 apontam uma chave de M.casos, 9 apontam uma coleção inteira sem dizer qual recorte, 8 são prosa e 3 estão vazios.
  - *Prova:* node sobre 02-telas/indice.json × M: {caso: 30, path: 9, prosa: 8, vazio: 3}. As coleções: filaSaida ×4 (T04/08, T15/01-03), checklist, calibracao, instalacoes, secaoF, credenciais. A prosa: 'pacotes · pac-uo-02', 'firmware-fora-matriz + modem sem rede', 'recuperacao.limites.validadeMin'… É o mesmo tema de T15-A6, T02-A2, …
  - *Correção do verificador:* Pelo menos 24 dos 50 estados não têm receita que funcione. São 20 sem chave de M.casos (30/9/8/3 conferido) e mais 4 cuja chave aponta um caso que não produz a referência: T04/03, T07/03, T10/04 e T13/09. Entre os 9 de caminho, credenciais, calibracao e secaoF são objetos, não coleções. O de secaoF (T13/10) aponta o ativo …
- **DADOS-A2** · alta · ◐ O gate diz que recomputa todas as âncoras, mas não lê 13 das 33 chaves de topo nem 15 dos 33 casos.
  - *Prova:* gate-cobertura.js:4 diz 'Recomputa TODAS as âncoras'. node: sem leitura DIA_NOMINAL, HORA_NOMINAL, contextoAtivo, situacao, tecnico, credenciais, ddis, calibracao, checklist, autotesteEncerramento, criteriosRegra, ciclo, dominiosCan; casos sem leitura: instalacoes-sem-rede, sync-falha-rede, busca-vazia, conexao-falha, …
  - *Correção do verificador:* O gate não lê 13 das 33 chaves de topo. Dos 33 casos, só nomeia e confere 18. Os outros 15 são varridos em :44-48 atrás de exemplos, sem conferir que existem nem que apontam ativo ou módulo real. As âncoras do cabeçalho são recomputadas, a de dias distintos com folga (≥ 12 contra 13). O furo é de escopo: nada do que o mock …
- **DADOS-A3** · alta · ✔ O estado único de logica.md não tem onde guardar o que as telas escrevem: meio, as etapas de ativo, CAN, conferência e encerramento, a homologação, os casos já consumidos, a rede e a sessão de acesso.
  - *Prova:* logica.md:7-14 dá 6 campos, e 'etapas' cita só 5 (pré-checagem, cadeia, calibração, ciclo, checklist). O mock pede mais: 'a terceira é sessao.meio' (mocks.js:59-62); 'a 1ª tentativa… Tentar novamente conecta' (mocks.js:552-554), 'a 1ª tentativa estoura, a 2ª confirma' (mocks.js:968-970), 'Reconectar retoma do mesmo baixados' …
- **DADOS-A4** · media · ◐ O meio de conexão (sessao.meio, D-39) é a terceira fonte da matriz de pinos e não existe em lugar nenhum. Se o herói for achado por cabo, ele cai no mesmo conflito do a-04.
  - *Prova:* mocks.js:59-62 manda a matriz ler sessao.meio. Os casos de pinos usam meioAtual 'cabo' e consumidores ['leitor serial', 'cabo de programação'] (mocks.js:480-489). O a-01 é ma-01, com leitor 'cartao-serial' (mocks.js:85), o mesmo do a-04. situacao.sessaoConfiguracao não tem meio (mocks.js:1003-1005), e a lista da T05 não traz …
  - *Correção do verificador:* sessao.meio não existe: não há campo na sessão nem regra. Nas duas fontes do modelo, a-01 e a-04 são iguais. O que os separa seria o meio, que não existe, e o ocupadoPor, que só o caso tem. Então a ausência de conflito no herói não se deriva: ela é só a falta de um caso. Se o conflito do a-04 viria para o herói, depende de uma …
- **DADOS-A5** · alta · ◐ O caminho do herói não anda sozinho até o menu sem sessão: falta a lista por perto, falta a saída da T09 para a T10, e a sessão não gera itens na fila nem tem ritmo para subir.
  - *Prova:* Tabela 2. A busca não tem fonte (T05-A2). A T09/04 só oferece 'Voltar ao menu' (T09-A3). filaSaida tem 10 itens fixos e nenhum tipo 'Registro da sessão' (mocks.js:424-445; T16-V10). O-que-o-prototipo-simula.md:12 diz 'a fila sobe no ritmo do mock', e o mock não tem ritmo (mocks.js:904-906). Com isso a troca de garagem fica …
  - *Correção do verificador:* Pelo mock, o caminho do herói depende de dado inventado em dois pontos. Primeiro, a lista 'por perto' da T05, que não tem fonte. Segundo, os itens que a sessão deveria pôr na fila: 'Registro da sessão' e a evidência e o checklist desta instalação, sem modelo no mock. Ele também depende de um ritmo de fila que não mora nem no …
- **DADOS-A6** · alta · ✔ A Seção F do herói passaria com prova da manhã: os únicos itens do a-01 na fila são de 09:14 e 09:15, antes de a sessão abrir às 14:30.
  - *Prova:* f-05 e f-06 (a-01, 'recebida', confirmadoAs 09:14 e 09:15; mocks.js:432-433). As fontes de F são 'fila:Evidências da instalação' e 'fila:Checklist de homologação' (mocks.js:857-858). Nenhuma regra limita F aos itens criados na sessão. É o mesmo tema de T13-A9, T13-N3 e T12-A9, pela causa no dado
- **DADOS-A7** · media · ◐ A porta natural alcança 7 dos 19 casos que têm par em Várzea: só 3 módulos-caso estão entre os 5 da busca. E um mesmo ônibus carrega até 5 casos, sem regra de qual vale quando.
  - *Prova:* node: fora da busca ficam M2C-0301 (a-02: 4 casos), M2C-0312 (a-03: 5 casos), M2C-0348, M2C-0371. Na busca estão 0394, 0335 e 0362, com 6 casos, mais o M2C-0999. O mock já conta em cascata: 'M2C-0312 perde o link na checagem 6… e cai uma vez no bloco Leitor' (mocks.js:957-959). Mas esquece que o a-03 também é …
  - *Correção do verificador:* Pela lista da T05, a porta natural alcança 7 dos 19 casos. Pela lista da T06, mais casos que dependem só do ativo seriam alcançáveis, mas com o M2C-0417 na faixa, não com o par da referência. Nenhuma regra diz se um caso de ativo dispara com outro módulo em sessão, nem qual dos casos de um ônibus vale em cada tela (a-03 tem …
- **DADOS-A8** · media · ✔ A faixa esperada dos sinais é texto de exibição. Para tirar dela a barra, o veredito e a diferença, a tela teria de parsear três formatos.
  - *Prova:* O mock diz 'esperado: "12,0 a 15,0 V"', '"4 ou mais"', '"acima de 0 km/h"' (mocks.js:590-599). A tela mostra '12,0 — 15,0', 'mínimo 4', '1,1 V abaixo do mínimo' (textos T07:7 e :11). Não há min nem max numérico. É outro tema que o T07-A5, que trata das pontas da escala
- **DADOS-A9** · media · ◐ O mock é um objeto mutável e compartilhado, e não se clona inteiro: 'Recomeçar do login' só zera se o estado nunca escrever em M.
  - *Prova:* Teste ESM em scratchpad: depois de M.casos['busca-vazia'].tentativa = 99, um novo import devolve 99; Object.isFrozen(M) = false. structuredClone(M) → DataCloneError (diasAntes é função). Os itens de E do checklist apontam para os passos da i-01 (mocks.js:799-800, :869-872)
  - *Correção do verificador:* O mock é um objeto único, mutável e sem congelar. Se o estado escrever nele, o 'Recomeçar do login' não zera. Clonar é trivial: tudo menos diasAntes passa no structuredClone. Os itens de E são cópia feita no carregamento, não referência aos passos da i-01.
- **DADOS-A10** · media · ✔ O mock é determinístico, mas o app herda três riscos: o índice posicional do checklist, o número formatado pelo locale da máquina e o mesmo fato guardado ora como texto, ora como número.
  - *Prova:* CHECKLIST.itens.splice(23 + i) (mocks.js:870). Medido: (482317).toLocaleString() dá '482,317' com LANG=en_US e C, e '482.317' com pt_BR. O hodômetro do a-01 é '184.320 km' (mocks.js:589) e 184320000 (mocks.js:759). A higiene do gate só varre mocks.js (gate-cobertura.js:156-163)
- **DADOS-A11** · media · ✔ Dois limiares que as telas usam não estão no mock: as 24 h de re-checagem e os 8 caracteres da senha.
  - *Prova:* 24 h: dominio.md:177-180, historias.md:118 (HU-T12-6), textos T15:23 ('confere em 24 h'); nenhum campo em criteriosRegra (mocks.js:390-402). 8 caracteres: logica.md:20 e indice.json T01/01; credenciais só tem o par exato (mocks.js:1041-1042)

<details><summary>1 de gravidade baixa</summary>

- **DADOS-A12** · baixa · ✔ O import do mock de fora da app/ funciona no dev sem server.fs.allow e quebra no build só se a pasta de fora não viajar junto, que é o caso da Vercel com a opção desligada.
  - *Prova:* Medido com Vite 8.0.13 (projeto de teste em scratchpad/tmp/dados/exp): o arquivo importado dá 200; um arquivo de fora não importado dá 403 Restricted; o build contém RKT-8H42 e atribui antes de ler; o build só da app/ dá '[UNRESOLVED_IMPORT] Could not resolve ../../../../04-dados/mocks.js'. Confirma publicar.md:33-35. …

</details>

### 4.6 · Coerência entre os documentos

*O que foi medido:* Li a pasta pedida: LEIA-PRIMEIRO, CHANGELOG, os dois CLAUDE.md, 01-produto (5), 02-telas/README, 03-design-system (README, leis, movimento, tokens), 06-prototipo (ciclos, publicar, logica, palco, PROMPT), 07-decisoes (28), 08-produto-real (5), 05-recursos e os 16 animacao.md. Também li as 5 referências do palco. Medi com node, python e o Chrome headless da máquina. Nada foi escrito no projeto. 1. Os 16 animacao.md têm 52 linhas. 28 passam limpas: 20 sem ressalva, 6 só com curva fora de token, 2 só com processo sem ritmo declarado. 1 é ambígua (o marcador da T07 corre do zero ao abrir). 23 violam o movimento.md: 6 por duração, 8 por propriedade, 9 por layout, 3 pelo reduzir movimento, 0 por loop. As curvas 'esmaece' e 'acelera', que não são token, aparecem em 12 das 52 linhas. Nenhum ritmo de processo é token, e 8 processos citados não têm ritmo declarado. 2. O tokens.json é igual ao tokens.css em 92 das 95 chaves. As 3 que diferem são os mov-*, em 0ms no JSON. O JSON não tem nenhum dos 61 comentários do CSS nem o modo de reduzir movimento. Três documentos mandam o produto real ler o JSON; o CLAUDE.md manda ler o CSS. 3. R1, R2 e R3 continuam abertas no dominio.md. Não estão nas pendências nem em nenhuma decisão. Só o mock resolve R1 e R2, e só em comentário. Essa resolução tira as assertivas da Seção D e põe o autoteste depois do HOMOLOGADA. Há dois autotestes de 8 com o mesmo nome. O vocabulário tem três regras, e elas dão três veredictos para os mesmos textos aprovados: CAN aparece 49 vezes, e 'CAN-BT' traz de volta o BT que o R3 tirou. 4. 17 decisões têm lei em leis.md, 10 não têm. 14 leis não têm decisão. Dos números das decisões: dois não dá pra medir (a 04 no passado e as 13 telas da 18). Batem: 72, 207, 4 passos e 57/57 ENCERRAR em tinta secundária. Não batem hoje: 'três estados' têm o contador (medido 2), a referência do painel ainda tem as 'dez etapas' que a decisão 25 descartou, e a T14 que a decisão 05 dá de exemplo move 41px. 5. O plano promete coisas que a pasta não sustenta. Promete um commit por ciclo, e a pasta não é repositório. Promete prévia na Vercel a cada ciclo, mas só publica no C14. Promete uma etiqueta com data, sem ciclo nem desenho, e a data não pode vir de new Date(). E o C11 monta 50 estados pelo mock: 15 não têm caso que os produza, e nenhum ciclo muda o mock. 6. Três pendências travam a construção, cada uma com padrão proposto: T10/T07 Alternador contra o textos.md, a segunda falha da T14 sem desenho, e o Retomar da T16 com duas leituras.

- **COERENCIA-A1** · alta · ◐ O tokens.json guarda o movimento em 0ms, e três documentos mandam o produto real ler o JSON; só o CLAUDE.md aponta o CSS.
  - *Prova:* node, comparando os :root: 95 chaves no JSON, 95 nomes únicos no CSS; só diferem mov-rapido/padrao/lento (json 0ms × css 150/200/300) · tokens.json:366-377 × tokens.css:110-112, com o 0ms no @media reduce (tokens.css:116-118) · 08-produto-real/norma-e-ilustracao.md:7 ('tokens e medidas · tokens.json') · stack-a-definir.md:5 · …
  - *Correção do verificador:* Não é verdade que só o CLAUDE.md aponta o CSS. 06-prototipo/CLAUDE.md:12 e PROMPT-DE-ABERTURA.md:18 e :44 também apontam, mas valem só pro protótipo. E só dois documentos mandam ler o JSON (norma-e-ilustracao.md:7, stack-a-definir.md:5); o README.md:7 afirma que os dois são iguais, o que o node desmente. Pro produto real a …
- **COERENCIA-A2** · media · ✔ Nenhum ritmo de processo é token, e três documentos dão três lugares diferentes pro mesmo número.
  - *Prova:* movimento.md:30-39 (600ms, 1s, 400ms, 3s, 1s = 4s, 4s) · tokens.css e tokens.json: nenhum ritmo · CLAUDE.md:18 e 06-prototipo/CLAUDE.md:12 ('nenhum valor solto') · leis.md:21 (Lei 13) × mocks.js:904-906 ('a CADÊNCIA de simulação é constante declarada na tela, como TICK_MS em T03/T05'). Também ficam soltos os escalonamentos: …
- **COERENCIA-A3** · media · ◐ 23 das 52 linhas dos animacao.md contradizem o movimento.md, e o próprio rodapé que as 16 repetem ('só transform e opacity — nada que mexa no layout').
  - *Prova:* tabela 1: D 6 · P 8 · L 9 · R 3 · 1 ambígua · 28 limpas. As 16 terminam com a mesma frase (ex.: T05/animacao.md:14). O C12 promete 'cada linha de todos os animacao.md' e 'conferido contra a tabela da tela' (ciclos.md:93-95): não dá pra cumprir a tabela e a lei ao mesmo tempo. São novas nesta análise: T01:9 (100ms), T02:9 …
  - *Correção do verificador:* O 23 depende de critério e não se reproduz sem a tabela. O critério também não é coerente: T03:9 ('o traço do check se desenha') é a mesma propriedade de T06:7 e não aparece como nova, porque o T03-A12 já a levantou. A tabela ignora a curva: 11 linhas usam 'esmaece' e 1 usa 'acelera' (T16:9), e nenhuma das duas é token. Parte …
- **COERENCIA-A4** · media · ◐ Oito processos citados nos animacao.md e nas telas não têm ritmo em movimento.md, e o 'ritmo do mock' que o documento do produto real promete não existe.
  - *Prova:* movimento.md:30-39 declara 8 processos. Ficam sem ritmo: o cronômetro do código (T01/animacao.md:10), a busca (T05:7), a atualização de firmware (T05:12), a leitura do chassi (T06:7), a leitura da CAN (T07:7), a releitura (T08:8), o envio da fila (T15:7), a drenagem (T14/tela.md:15, sem linha) e o corte de alimentação (T16). …
  - *Correção do verificador:* O título diz oito e a lista traz nove. O cronômetro do código tem ritmo: T01/animacao.md:10 diz 'a cada segundo', e as durações estão no mock (mocks.js:1053, validadeMin 10 e reenvioSeg 60). É relógio, não processo. O corte da T16 é um passo do encerramento, que tem 600ms por passo (movimento.md:35); o que falta é quanto ele …
- **COERENCIA-A6** · alta · ✔ R1, R2 e R3 continuam abertas no domínio e não estão fechadas em nenhum documento; só o mock as resolve, em comentário.
  - *Prova:* dominio.md:82 ('[ABERTO R3]') e :423-432 ('bloqueiam craft de tela'; 'R1 e R2 podem esperar até o cycle que desenhar T13/T16 — mas não além dele') × CHANGELOG.md:3-7 (design fechado, T13/T16 desenhadas) · pendencias.md:5-17 não as lista · 07-decisoes/: nenhuma · grep fora de _fontes-v1: R1/R2 só em mocks.js:266-270, R3 só em …
- **COERENCIA-A7** · alta · ◐ A resolução implícita de R1 e R2 contradiz a HU-T13-5 e o domínio, e põe a homologação antes do autoteste.
  - *Prova:* R1: dominio.md:425 e HU-T13-5 (historias.md:126) põem a assertiva 8 na Seção D, que exige 100% · no mock, a D tem 10 itens sem nenhuma assertiva (mocks.js:846-855; T13/textos.md:7 'D · Configuração · 10 de 10') · 'ID na plataforma' está na F (mocks.js:859), e a F tem bloqueia:false (mocks.js:812) · o comentário de mocks.js:270 …
  - *Correção do verificador:* A HU-T13-5 (historias.md:126) não põe a assertiva 8 na Seção D. Ela só diz que A, C e D exigem 100%. Quem põe a 8 na D é o domínio (dominio.md:425) e a fonte v1 (requisitos-v1.md:1381). Tirar o autoteste do checklist não contradiz a HU-T13-5; contradiz o domínio. O resto confere: a resolução não está registrada, e o autoteste …
- **COERENCIA-A8** · media · ✔ Há dois autotestes de 8 com o mesmo nome. O domínio define um só, a T12 conta um e a T16 mostra o outro.
  - *Prova:* dominio.md:62-63 ('Reinício + releitura no encerramento. Prova 8 assertivas') × mocks.js:284-296 (AUTOTESTE_ENCERRAMENTO, T16) e mocks.js:298-308 (AUTOTESTE_ASSERTIVAS, 'as 8 canônicas (T13/T12)', de bancada) · T12/textos.md:11 'Autoteste · 8 de 8' conta a de bancada (mocks.js:333) · nenhuma das 8 de bancada aparece por nome …
- **COERENCIA-A9** · media · ◐ Três regras de vocabulário dão três veredictos para os mesmos textos aprovados.
  - *Prova:* tabela 2 · dominio.md:80 (lista): passa · o R3 aplicado (dominio.md:86-90): passa · o fechamento proposto (dominio.md:84): falha em 'CAN-BT', 9 vezes na T05 (variante do cadastro, mocks.js:145, cujo BT é o sem fio), e em 'SIM', 11 vezes na T05 · CLAUDE.md:32: falha em CAN (49 ocorrências em 37 referências, inclusive 'Dados da …
  - *Correção do verificador:* 'SIM' não cai no fechamento proposto (dominio.md:84): não é protocolo de rádio, nome de serviço de rede nem marca de componente. Ele falha só pela regra do CLAUDE.md:32. Firmware tem 24 ocorrências (maiúsculas e minúsculas) em 16 referências: o 16 é contagem de referências, enquanto o CAN foi contado por ocorrência. As três …
- **COERENCIA-A10** · media · ✔ O domínio faz a sessão de configuração nascer na conexão, e a decisão 07 descartou exatamente isso.
  - *Prova:* dominio.md:47 ('Abre ao conectar o módulo') × 07-decisoes/07-faixa-nasce.md:5,7 ('descartado: a faixa desde o início da conexão') · leis.md:44 (R-05) · logica.md:16 ('A sessão nasce na pré-checagem aprovada') · HU-T05-8 (historias.md:52 'Conexão bem-sucedida abre a sessão'), que serve às duas leituras.
- **COERENCIA-A11** · media · ✔ 'Sincronizar renova o acesso' é uma regra que só existe nos textos e mistura os dois relógios de 7 dias.
  - *Prova:* T01/textos.md:7,11 'O acesso vale por 7 dias sem sincronizar.' · T04/textos.md:27 'Sincronize para renovar o acesso.' × dominio.md:46 (a sessão de acesso encerra por Sair ou pelos 7 dias) · HU-T01-11 (historias.md:18) · decisão 27:9 ('o texto do login bate com a regra'). A fonte v1 (_fontes-v1/requisitos-v1.md:339) diz o …
- **COERENCIA-A12** · media · ✔ Onde mora a T08 tem quatro respostas, e o palco (C3) precisa de uma.
  - *Prova:* palco.md:16 'T01 a T10' (a T08 no caminho) × palco.md:17 (a T08 nas consultas), no mesmo arquivo · 06-prototipo/palco/referencias/html/04-painel-aberto.html:29-31 (T08 sob 'LER A CAN') · fluxos.md:17 (seta pontilhada sem 'consultas') × fluxos.md:20 (as consultas são três: fila, conferência e últimas) · dominio.md:414 (fluxo 4 …
- **COERENCIA-A13** · media · ✔ A referência do painel desenha as dez etapas que a decisão 25 descartou, e nenhuma referência do palco tem o 'Recomeçar do login'.
  - *Prova:* 04-painel-aberto.html:18-41 tem 10 rótulos de grupo: ENTRAR · O MENU E AS FOLHAS · CONECTAR O MÓDULO · ESCOLHER O ATIVO · LER A CAN · CONFIGURAR E CALIBRAR · CICLO DINÂMICO · HOMOLOGAR · ENCERRAR A SESSÃO · ENVIAR E CONSULTAR (PNG conferido) · grep -ci 'recome' nas 5 referências do palco = 0 × …
- **COERENCIA-A14** · media · ✔ A coluna desenhada no palco contradiz o índice e a regra 'só estados'.
  - *Prova:* 00-componentes.html:15 'T01, T02 e T08 não mostram coluna' × 02-telas/README.md:17-18 e indice.json (T01 tem 3 estados, T02 tem 1) · 03-tela-com-muitos-estados.html:19 lista 'Um encontrado', que é o T05/02-momento, contra palco.md:24 e leis.md:43 (R-04) · 01-no-fluxo.html:19 lista 2 dos 4 estados da T04 (faltam o 08 e o 09).
- **COERENCIA-A15** · alta · ◐ O plano promete um commit por ciclo e prévia na Vercel a cada ciclo numa pasta que não é repositório, e nenhum ciclo cria o repositório.
  - *Prova:* ciclos.md:114 ('um commit — todo ciclo tem caminho de volta') · publicar.md:7 ('Cada ciclo ganha um link de prévia próprio') e :25 ('O repositório é a pasta inteira') × `ls -la` sem .git e `git rev-parse` → 'fatal: not a git repository (or any of the parent directories)' · o C1 (ciclos.md:27) não cria o repositório · a Vercel …
  - *Correção do verificador:* São sete .DS_Store, não três: raiz, 02-telas, 06-prototipo, 02-telas/T01-login, T01-login/referencias, 02-telas/T16-sessao e T16-sessao/referencias. Todos foram criados entre 17:52 e 17:54 (stat), antes deste estudo. Todos entrariam no primeiro commit, e não existe .gitignore.
- **COERENCIA-A16** · alta · ✔ O C11 monta os 50 estados 'pelo caso do mock': 15 não têm caso que produza o desenho, e nenhum ciclo prevê mudar o mock.
  - *Prova:* ciclos.md:87-89 · 06-prototipo/CLAUDE.md:32 · decisão 23:5 · os 15, pelas telas: T02/02 (T02-A2), T04/03 (T04-A3), T04/04 (T04-A4), T05/09 (T05-A5), T06/04 (T06-A2), T07/03 (T07-A1), T10/02 ou 03 (T10-A2), T10/04 (T10-A3), T12/02 (T12-A3), T13/09 (T13-A1), T13/10 (T13-A2), T15/01 (T15-A1), T15/02 (T15-A3), T15/03 e T15/04 …
- **COERENCIA-A17** · media · ◐ O plano conta os estados duas vezes, e põe peças em ciclos anteriores ao comportamento delas.
  - *Prova:* C4 e C5 comparam 'as referências' da T01-T04 (ciclos.md:47,53), ou seja 3 + 1 + 3 + 4 = 11 estados × C6-C10 'não entra: estados' × C11 'os 50' (ciclos.md:87) · as portas M2C-0999 e KNB-5H39 (logica.md:56) estão nas listas do C6/C7, mas as portas só entram no C11 · a faixa com ENCERRAR desce no C6 (ciclos.md:57), e os …
  - *Correção do verificador:* O C6 não exclui 'estados': exclui 'os estados da pré-checagem' (ciclos.md:58). O T05/03 e o T05/04 não ficam nem dentro nem fora dele. O KNB-5H39 não está na lista desenhada da T06 (T06/textos.md:7: cinco placas, '5 no pacote'; T06-A3). Ele só aparece na lista que o protótipo monta do mock: a-09 em uo-01, e logica.md:42 fala …
- **COERENCIA-A18** · media · ◐ O mock e o gate ainda falam a numeração do v1: leis, decisões, ciclos e caminhos que não são os desta pasta.
  - *Prova:* mocks.js:1 'app/mocks.js' e gate-cobertura.js:1-3 'tools/gate-cobertura.js' (o arquivo mora em 04-dados/) · 'Lei 8' 4× como 'dado vive no mock' (mocks.js:4,389,1044) × leis.md:16 (Lei 8 = um primário por tela) · 'Lei 17' 2× (mocks.js:264,999), e leis.md só vai até 14 · 'D-21' 3× ('todo campo nasce preenchido') × 07-decisoes/21 …
  - *Correção do verificador:* São 28 ids de ciclo distintos, não 29. O 'C03' (mocks.js:657, 672) é a versão do bloco Conexão ('A12.G07.L02.E05.C03'), não um ciclo. Dos 28, 19 são ciclos de topo (C2 a C23) e 9 são subciclos (C4.1, C11.6 etc.). A Lei 17 também aparece em mocks.js:1 ('Lei 8/17'): a contagem incluiu essa linha pra Lei 8 e deixou de fora pra …
- **COERENCIA-A20** · media · ✔ O padrão da pendência 'T10' Alternador contradiz o textos.md aprovado da T07, e as duas coisas se dizem norma do protótipo.
  - *Prova:* pendencias.md:3 ('o protótipo segue o padrão ao lado') e :15 ('o nome do cadastro' = 'Tensão do alternador', mocks.js:591) × CLAUDE.md:17 ('Os textos, exatamente como estão') e T07/textos.md:7,11,15,19 'Alternador · Velocidade · Ré · Rotação · Consumo' · a pendência está na linha da T10 (T10-N5; T07-A7).
- **COERENCIA-A21** · media · ✔ O padrão da pendência da segunda falha da T14 exige um desenho e um lugar de texto que não existem.
  - *Prova:* pendencias.md:17 ('aparece na segunda falha') × nenhuma referência nem linha em T14/textos.md (T14-V12) · CLAUDE.md:25 (não inventar texto) · ciclos.md:88 ('nada novo de desenho').

<details><summary>3 de gravidade baixa</summary>

- **COERENCIA-A5** · baixa · ◐ A mesma peça, o tambor, tem três tempos em três animacao.md.
  - *Prova:* T07/animacao.md:8: '300ms por rodinha', '40ms entre elas' (≈ 300 + 5 × 40 = 500ms em 6 rodinhas) · T10/animacao.md:7: '600ms no total' · T08/animacao.md:8: 'como na T07' com '300ms'. componentes.md tem um tambor só. T10-N3 achou só o 600.
  - *Correção do verificador:* São dois tempos, não três. T08/animacao.md:8 diz 'como na T07: marcador corre, tambor rola', e os 300ms dela são o número da T07. Só há um terceiro tempo se esses 300ms forem lidos como total. A divergência que fica é 500 (T07) × 600 (T10). A T10 nem desenha rodinha (T10-A8).
- **COERENCIA-A19** · baixa · ✔ A decisão 22 diz que 'três estados já têm o contador'; medido, são dois.
  - *Prova:* 07-decisoes/22-pinos-linha.md:7 × T09/textos.md:15 (02) e :19 (03) com '3 · de 6'; o 01 não tem (T09-V2).
- **COERENCIA-A22** · baixa · ◐ A consequência da decisão 04 ('a falha sempre aparece onde aconteceu') não vale hoje em duas telas.
  - *Prova:* medido pelo título de cada uma das 105: T01/05 e T01/07 'Código não confere' (T01/textos.md:27,35) · T13/09 'Tensão da bateria na faixa' (T13/textos.md:43) · limítrofes: T13/10 'A Seção F não passou' (diálogo) e T16/06 'Sessão interrompida' × 00 'Encerrar sessão' · 07-decisoes/04:3,9 · leis.md:42 (R-03). T01-A1 e T13-N1 viram …
  - *Correção do verificador:* Pelo título, só a T01 quebra. O título da T13/09, 'Tensão da bateria na faixa' (T13/textos.md:43), é a pergunta do item. mocks.js:826-827 diz que a pergunta 'é o TÍTULO DO NÍVEL 2', e a T13/07 segue o mesmo padrão ('Módulo fixado e posicionado'). A falha está no elemento ('1,8 V abaixo do mínimo'). O que a T13/09 quebra é o …

</details>

### 4.7 · Lacuna 1 · a cor da logo

**Resolvida em 24/09: a logo passou pro `--lima`.** A logo `05-recursos/marca/logo-mobs2.svg` pintava `#B8F23D`, quase igual ao `--lima` (`#AAEF00`) e lado a lado com ele no login. A cor escapava da varredura porque mora dentro de um `<img>` (LAC1-V1). Por decisão do diretor e do arquiteto:

- o `fill` do SVG virou `#AAEF00`. É a única cor do arquivo, e o arquivo tem o mesmo tamanho. No render da T01, sobram 0 pixels de `#B8F23D`;
- os HTML das referências não mudam, porque carregam o SVG;
- os PNG `T01/00` e `T01/01` vieram refeitos do design e foram substituídos. Conferi pixel a pixel contra os antigos: nos dois, só mudaram 12.314 pixels, todos dentro da caixa da logo (x 164–555 · y 414–495 a 2×). Não sobra nenhum `#B8F23D`, e a logo inteira está em `#AAEF00`. Gerar os PNG aqui não serviria: o render local desenha a fonte com diferenças em 24 mil pixels fora da logo;
- entraram a **Lei 15** (`leis.md`), a **decisão 28** (`07-decisoes/28-lima-da-marca.md`), a linha da marca no `05-recursos/README.md` e o registro no `CHANGELOG.md`;
- o manifesto de procedência embutido no SVG deixou de conferir com o arquivo, porque o conteúdo mudou.

Os 15 itens que a lacuna levantou sobre a cor saem das contas deste gate. Fica uma medida útil pro C4: a marca está presa a 207px (topo da logo em y 207,0 a 1×, largura 196), o que confere a decisão 19.

### 4.8 · Lacuna 2 · o voltar do sistema

*O que foi medido:* Extraí com node os 336 tocáveis das 105 referências (<a>, <button>, role=checkbox/radio), com texto e aria-label. Bate com os 336 do M18. Marquei a saída pra trás de cada referência. 69 desenham uma: Voltar ao…, Fechar, Cancelar, Escolher outro, Procurar outro módulo ou Trocar de garagem. 36 não desenham nenhuma. Nenhum documento da pasta diz o que o voltar do sistema faz. Separei as 105 em seis famílias: raiz 7 · folha e diálogo 7 · Voltar desenhado 53 · processo que pede pra não sair 8 · sem saída pra trás 20 · depois de ato 10. Uma regra une as seis: o voltar só leva, nunca faz. Ele não registra, não descarta, não encerra e não entra. O número de lugares sem regra depende do corte. Fora de login e menu, são 29 lugares sem saída desenhada. São 26 se a T02 contar como raiz, que é o padrão que proponho. Duas medidas decidem o G-voltar: - A URL só dá endereço a 66 dos 105 lugares. Os 39 momentos não têm endereço (logica.md:65). - O único jeito declarado de remontar um lugar é a semente, e ela remonta outro mundo. `?tela=T04` volta com a sessão aberta. `?tela=T11` troca o módulo da faixa. `?tela=T16` reabre a sessão que acabou de fechar. Por isso o padrão é (b): o protótipo usa replaceState, e o voltar do navegador sai dele. A tabela vai pro PM como regra do produto. O custo fica nomeado. No celular de quem recebe o link, o primeiro gesto de voltar sai do protótipo (PALCO-A5), mas o link na conversa continua abrindo o mesmo lugar. Achados novos: - Nenhum tocável das 105 leva à T14. - Só a T09 desenha resposta a quem tenta sair de um processo. - 44 das 71 saídas pra trás desenhadas não estão em nenhum 'O que se toca'. - O ENCERRAR está em 57 referências e só a tela.md da T16 o cita, e na T16 ele não aparece.

- **LAC2-A1** · alta · ◐ Nenhum documento do projeto define o que o voltar do sistema faz, e 36 das 105 referências não desenham saída pra trás.
  - *Prova:* grep -rn -i 'gesto\|navegador\|histórico\|back\|pushState\|history\|popstate' em *.md/*.js/*.json fora de _fontes-v1: só leis.md:30 ('a barra de gestos do Android', sobre espaço) e componentes.md:72 ('linha do histórico', peça). Somem-se pendencias.md:23 (a navegação de três botões, como altura útil) e animacao.md (16×, 'entre …
  - *Correção do verificador:* O grep também devolve 07-decisoes/16-pe-32.md:3 e :9 (barra de gestos), 06-prototipo/CLAUDE.md:26 ('o que o navegador precisa servir'), 13 tela.md com 'linha do histórico', e dezenas de 'gestor' (porque 'gesto' casa com 'gestor'), 'read-back' e 'backend'. Nenhum desses define o voltar. O 36 é a contagem literal do …
- **LAC2-A2** · alta · ◐ A URL só dá endereço a 66 dos 105 lugares, e a semente, único jeito declarado de remontar um lugar, remonta outro mundo: o histórico do navegador não sabe devolver o técnico aonde ele estava.
  - *Prova:* logica.md:65 só tem ?tela= e &estado=. indice.json: 16 telas + 50 estados têm endereço; os 39 momentos não têm, entre eles as folhas T01/04, T04/05, T04/07 e os diálogos T01/09, T04/06. logica.md:33: a semente monta o estado mínimo. logica.md:40 (semente T04 = sessão M2C-0417 aberta) × logica.md:83 e T04/textos.md:11 (o …
  - *Correção do verificador:* A semente não é o 'único jeito declarado de remontar um lugar'. logica.md:33 prende a semente a 'Pular direto pra uma tela pelo painel', não à URL. O estado se monta pelo caso do mock: logica.md:117 e 06-prototipo/CLAUDE.md:32. E ele abre 'parado e sem toque' (palco.md:35). Nenhum documento diz que abrir a URL, ou voltar por …
- **LAC2-A3** · alta · ◐ Oito referências são processo que pede pra não sair. Só a T09 desenha o que acontece com quem tenta, e três delas deixam o ENCERRAR ativo.
  - *Prova:* rodapés: T03/00.html:63, T05/10:83, T08/01:94, T09/00:121-122, T09/03:41, T16/00:124-125, T16/01:124, T16/03:53. ENCERRAR ativo em T08/01:31, T09/00:31 e T09/03:31. A única regra de 'tentar sair' está em fluxos.md:36 e na HU-T09-9 (dominio.md:316), e leva à T09/03. O princípio 4 (dominio.md:30) diz que o app 'não volta pra …
  - *Correção do verificador:* T09/03:41 não é rodapé. É o aviso no conteúdo, 'A CONEXÃO AINDA NÃO FOI GRAVADA · Termine a gravação antes de sair.'; o rodapé da 03 é 'Continuar a gravação'. A T16/01:124-125 não pede pra ficar: diz 'Aguardando o módulo voltar' e 'A saída volta quando o autoteste terminar', ou seja, segura a saída. Então são 7 que pedem pra …
- **LAC2-A4** · media · ✔ 44 das 71 saídas pra trás desenhadas não estão em nenhum 'O que se toca'. O 'Voltar ao menu' está em 37 referências de 12 telas, e só 4 tela.md o citam.
  - *Prova:* node cruza.js. Ausentes: Voltar ao login 6, Fechar 4, Cancelar 3, Voltar ao contexto 1, Voltar ao checklist 4, Escolher outro veículo 1, e Voltar ao menu 25 (T05 3, T06 2, T07 1, T08 2, T09 3, T10 5, T13 8, T14 1). Citados só em T11/tela.md:17, T12:16-17, T15:16 e T16:17. Mesmo tema: T03-A8, T04-V8.
- **LAC2-A5** · media · ◐ O ENCERRAR aparece em 57 referências de 12 telas e só a tela.md da T16 o cita, justamente a tela onde ele não aparece (0 de 7).
  - *Prova:* classifica.js: 'com ENCERRAR: 57' (T04 4, T05 2, T06 7, T07 4, T08 3, T09 5, T10 5, T11 3, T12 3, T13 12, T14 6, T15 3). T16/tela.md:15,18. A única regra dele está em logica.md:58-61. Nas T07/01-03, ele e o Configurar módulo são as únicas saídas (T07-V6). Mesmo tema: T04-V8, T08-V8, T09-A8.
  - *Correção do verificador:* A regra do ENCERRAR não está só em logica.md:58-61. A mesma regra, antes e depois de homologar, está também em fluxos.md:39, na decisão 26 (07-decisoes/26-sessao-abortada.md:1-7), em T16/estados.md:10 e em logica.md:28 e :112. A decisão 03 (07-decisoes/03-lima-veredito.md:9) dá só a cor. É uma regra, espalhada em seis lugares, …
- **LAC2-A6** · media · ◐ Nenhum tocável das 105 referências leva à T14. Sem entrada, ela não tem pai: as saídas dela apontam pra T13 (5) e pro menu (1).
  - *Prova:* toc.json: a T04/00 tem 10 cartões (Conectar, Ativo, Dados da CAN, Configurar, Refazer leitura, Calibração, Conferir, Finalizar com checklist, Últimas instalações, Fila) e nenhum é o ciclo dinâmico. T10/00-04: ENCERRAR, semear ou calibrar, e Voltar ao menu. T13/05 (Seção E aberta): ENCERRAR e Voltar ao menu. Fora da T14, …
  - *Correção do verificador:* As saídas da T14 não são 5 pra T13 e 1 pro menu. Pra T13 são 8 tocáveis: 'Ir para o checklist' na 00, 01, 02 e 03; 'Encerrar o ciclo' na 00, 03 e 04, que T14/tela.md:18 manda pra T13; e 'Voltar ao checklist' na 05. Seriam 9 contando 'Solicitar correção de cadastro' na 04, que tem href #checklist e nenhum destino em …

<details><summary>2 de gravidade baixa</summary>

- **LAC2-A7** · baixa · ◐ Dois dos oito rodapés de espera são link, e seis são texto, com o mesmo desenho. O leitor de tela anunciaria 'não saia da tela' como algo que se toca.
  - *Prova:* <a href="#p"> em T03/00.html:63 ('Baixando · não saia da tela') e T08/01.html:94 ('Lendo · não saia da tela'). <span> em T09/00:121, T05/10:83, T16/00:124, T16/01:124, T16/03:53 e T14/01:94. Mesmo estilo nos oito: height 56, #1A1726, borda #2B2540, #867E9A. A peça é 'processo correndo' (componentes.md:27).
  - *Correção do verificador:* T14/01:94 é a legenda de 12px 'Espera a fila do módulo drenar', sem altura 56 e sem fundo. O bloco de 56 da T14/01 está na :95 e é o primário apagado 'Disparar evento de teste', não um rodapé de 'não saia'. Então os rodapés de espera são 7: 2 links e 5 textos. O desencontro é maior do que o achado diz. Esse mesmo estilo …
- **LAC2-A8** · baixa · ✔ Guardar o estado único em cada entrada do histórico, como pede o caminho (a), só funciona se o estado nunca guardar o próprio mock: history.pushState clona como o structuredClone, e o mock tem uma função.
  - *Prova:* node: structuredClone(M) → DataCloneError em M.diasAntes, a única função do mock (varredura recursiva). Sem ela, clona as 32 chaves. É a mesma condição que o DADOS-A9 põe pro 'Recomeçar do login'.

</details>

### 4.9 · Lacuna 3 · o leitor de tela

*O que foi medido:* Li as 105 referências de forma estática, direto no HTML. O Chrome headless passou de 90 s por página nesta máquina. A 'linha' de um poço é o ancestral mais próximo que tem texto fora dele. Nenhum arquivo do projeto foi alterado. Achei 367 poços com glifo de estado em 63 referências, e mais 31 glifos de estado fora de poço em 17 referências. São 398 no total, e todos são mudos: 300 são svg com aria-hidden, 67 são span sem texto (traço e agora). As 105 referências não têm região viva, aria-expanded, aria-disabled nem estado de escolhido. Em 107 das 367 linhas, o texto sozinho não diz o veredito: - 39 têm o mesmo texto com outro glifo em outra referência. Exemplos: Eventos e Conexão entre T09/00 e T09/04, as cinco linhas da T11, três passos da T14. - 23 têm só '—'. - 31 têm só um valor. - 14 dizem o contrário do glifo: 'Ré acionada' aparece antes de o ônibus dar ré. Os nomes acessíveis são 4, em 18 atributos: 'Conta — Rafael Vieira', 'Fechar', 'Mostrar a senha' e o alt 'Mobs2'. Nenhum deles está nos 16 textos.md. Já os 9 h1 escondidos ('Entrar', 'Menu') estão lá, sem marca de que ninguém os vê. O M17 é falso positivo: o T01/01 tem rótulo, e o campo sem nome é o T01/08. Os 4 diálogos não têm nome. Nos 14 processos que mudam a tela sem toque, o leitor não anuncia nada hoje. Onde só o glifo muda, nem quem toca a linha ouve a diferença. Pro G-leitor, a medição corrige o (b): - a folha 3 tem 12 legendas, não 8. Quatro glifos usados em 14 poços ficam sem palavra, e 'feito' não tem uso; - o traço carrega quatro sentidos; - o nome herda os glifos errados que já foram levantados (T11-N1, T05-A12, T09-V8, T03-V1, T16-V1). Padrão que adoto: (c). É o (b) com as 12 palavras, no componente de glifo, dentro ou fora de poço. Fica mudo em ferramenta, marcador e aviso, e o nome segue o glifo corrigido. A região viva vira pendência em stack-a-definir.md:14.

- **LAC3-A1** · alta · ◐ Os 398 glifos de estado das 105 referências são mudos, e nenhuma referência tem região viva.
  - *Prova:* tmp/leitor/sonda.py → 367 em poço (300 svg aria-hidden="true"; 67 span sem texto: 61 traço, 6 agora) + 31 fora de poço. grep de aria-live, role status/alert/progressbar/timer, aria-busy, aria-valuenow, aria-expanded, aria-selected, aria-disabled nas 105 → 0 arquivos. svg sem aria-hidden → 0.
  - *Correção do verificador:* Fora de poço são 32, não 31. Some o círculo vazio de T01/08:71. Total: 399 glifos mudos, não 398. O resto vale como está.
- **LAC3-A2** · alta · ✔ Em 107 das 367 linhas com glifo em poço, o texto sozinho não diz o veredito ou diz o contrário.
  - *Prova:* tmp/leitor/linhas.txt: [=] 39 · [—] 23 · [?] 31 · [≠] 14. Caso da tarefa: T09/00:94 espera «Eventos E05 o que o módulo reporta e quando» e T09/04:94 ok, mesmo texto; idem T09/00:107 × T09/04:107 «Conexão C03 para onde ele manda». Na T09/00, «Ativo A12» (ok, :55) lê igual a «Eventos E05» (espera, :94).
- **LAC3-A3** · alta · ✔ Na T14 o texto afirma o que ainda não aconteceu: o leitor diz 'Ré acionada' antes da ré.
  - *Prova:* T14/00, 01, 03, 04 :80,84,88 relógio «Ré acionada» · «Porta aberta» · «Ignição desligada» = T14/05:80–88 ok, mesmo texto. Fora de poço: T14/00:64 relógio «recebido no servidor» e :67 «campos conferidos», antes de o servidor receber. T14/03:76 xis «Movimento detectado · velocidade 0 km/h».
- **LAC3-A4** · media · ◐ A T11 é o T11-N1 em escala: as cinco linhas leem o mesmo no 'não bate' e no 'confere'.
  - *Prova:* T11/00:41,46,51,56,61 e T11/01:41–61 traço × T11/02:41–61 ok. Nos três, o texto é «Ativo tradução frota v2 · Cercas 4 regiões · Leitor leitor sem fio · Eventos intervalo 30 s · Conexão rede do módulo atual». Só o cabeçalho («NÃO BATE COM O CADASTRO 5 de 5», T11/00:36) separa os dois.
  - *Correção do verificador:* As cinco linhas não se distinguem entre si. A tela, sim: pelo cabeçalho e pelo bloco que vem depois da lista («igual à do cadastro, bloco a bloco» × «Regravar substitui os cinco»). O que se perde é qual linha diverge, não se a tela diverge.
- **LAC3-A5** · media · ✔ O travessão como valor carrega três vereditos em 37 poços.
  - *Prova:* espera 24 (T03/00–01, T05/14–15, T16/00, 01, 03, 06) · relógio 9 (T05/10:41–73) · traço 4 (T09/02–03:98,111). «Canal de programação —» sai com relógio em T05/10:73 e com espera em T05/14:88 e T16/00:83.
- **LAC3-A6** · media · ✔ Na falha, várias linhas mostram só o valor: quem ouve não sabe que reprovou.
  - *Prova:* T05/06:34 xis «Serial no cadastro M2C-0999» · T05/08:39 e T05/09:39 xis «Firmware homologadas 2.2.0 e 2.3.5 2.4.1» · T16/05:42 xis «Contadores 0 km» × T16/02:44 ok «Contadores 482.317 km · 9.640 h». Ao contrário: T05/09:59 ok «Modem, SIM e sinal sem rede» (T05-N1).
- **LAC3-A7** · media · ◐ A folha 3 tem 12 legendas, não 8. A lista do (b) deixa sem nome 4 glifos usados em 14 poços e 11 referências, e traz 'feito', que não tem uso.
  - *Prova:* folha-3-glifos-icones-poco.html:16: aprovado · feito · falha · não se aplica · ainda não · o link caiu · sem conexão · é com você · parou · em andamento · em repouso · o passo que corre. Fora do (b): sem sinal 3 (T03/01:30, T05/14:33,63) · sem sinal neutro 4 (T09/02:40,85, T09/03:85, T12/03:39) · energia 1 (T16/01:53) · agora …
  - *Correção do verificador:* Pela lacuna que eu tenho, a folha tem 12 legendas e a lista tem 7, não 8. A lista deixa de fora 5 legendas: as 4 usadas (14 poços, 11 referências) e 'feito, sem veredito', que não tem uso. 'Traz feito' só vale se o (b) original tiver 8 nomes, e esse (b) não chegou até mim. Falta também o traço em círculo (T16/02:54,59 e …
- **LAC3-A8** · media · ✔ O traço carrega quatro sentidos nas telas. Com uma palavra por glifo, 'não se aplica' seria dito errado em 14 poços e onde só se espera em 25.
  - *Prova:* 61 traços: não se aplica, pulado ou não avaliada 22 (T05, T09/01, T16/03) · bloqueado ou espera 25 (T04 cartões 18 + garagens 3, T02 3, T05/01 1; componentes.md:64 «espera a rede · traço no poço») · divergente 10 (T11/00–01) · vazio depois da queda 4 (T09/02–03, que a T16/06:81,91 desenha como espera).
- **LAC3-A9** · media · ✔ O nome do glifo herda os erros de glifo já levantados: sem decidir esses erros antes, o leitor fala errado em pelo menos 25 poços.
  - *Prova:* T11-N1: 10 traços viram 'não se aplica' (T11/00–01) · T05-A12: 9 relógios viram 'em andamento' (T05/10:41–73) · T09-V8: 'sem conexão' onde o link caiu (T09/02:85) · T03-V1: 'o passo que corre' numa linha parada (T03/01:35) · T16-V1: a mesma queda no Leitor sai 'não se aplica' na T09/02–03 e 'ainda não' na T16/06. Ainda por …
- **LAC3-A11** · media · ◐ Os 4 nomes que as referências já têm (18 atributos, 13 referências) não estão em nenhum textos.md. Os 9 textos escondidos só pro leitor estão, sem marca nenhuma.
  - *Prova:* aria-label «Conta — Rafael Vieira» T04/00…09:30 · «Fechar» T01/04:24, T04/05:40, T04/07:40, T04/08:40 · «Mostrar a senha» T01/00:44, T01/01:48 · alt «Mobs2» T01/00:27, T01/01:27. grep -F nos 16 textos.md → 0. Já os h1 com clip «Entrar» (T01/00–01:24) e «Menu» (7 da T04) aparecem em T01/textos.md:7,11 e T04/textos.md:11,31,43. …
  - *Correção do verificador:* 'Mobs2' aparece 1 vez nos textos.md (T13/textos.md:23), mas com outro sentido, como valor de rede. Na T01 ele não aparece. 'Menu' está em 7 linhas da T04/textos.md (7,11,15,19,23,31,43), não em 3.
- **LAC3-A12** · media · ◐ O olho da senha tem dois estados e um nome só. Dar nome ao segundo seria inventar texto.
  - *Prova:* T01/tela.md:19 «o olho do campo de senha mostra e esconde». As 2 referências só têm o estado escondido, com aria-label «Mostrar a senha» (T01/00:44, T01/01:48). 'Esconder' e 'Ocultar' → 0 ocorrências na pasta.
  - *Correção do verificador:* Na norma, 0. Na pasta, 1: o v1 (_fontes-v1/requisitos-v1.md:282) já nomeia o par 'ver/ocultar', mas é fonte só pra consulta (LEIA-PRIMEIRO.md:26). Dar nome ao segundo estado continua sendo texto novo, com precedente no v1.
- **LAC3-A13** · media · ✔ Os 4 diálogos não têm nome nem aria-modal, e as 4 folhas não têm papel nenhum.
  - *Prova:* role="dialog" sem aria-labelledby, aria-label ou aria-modal: T01/09:24, T04/06:35, T04/09:35, T13/10:33. Os títulos são visíveis: «Senha alterada» (h1), «Sair da conta», «Trocar de garagem», «A Seção F não passou» (h1). As folhas T01/04, T04/05, T04/07 e T04/08 têm só o botão «Fechar».
- **LAC3-A14** · media · ◐ O escolhido, o outro lima da Lei 1, também é mudo: nenhum marcador de escolha tem estado.
  - *Prova:* T02/00:33 marcador vazio 11×11 × T02/01:33 lima 12×12, mesmo texto «Garagem Várzea pacote de ontem, 07:10 10 ativos». T04/07–08:45 «a atual». aria-checked só aparece nos 4 checkbox e no radio da T13/08:52. As linhas de garagem são div: T04/07 tem 0 <a>.
  - *Correção do verificador:* «a atual» não é texto da referência: grep em T04/07–08 dá 0. É o nome da peça em componentes.md:75 («linha de garagem · a atual \| o marcador lima de 11px»). O que existe em T04/07:45 e T04/08:45 é o marcador lima 11×11, sem estado.

<details><summary>5 de gravidade baixa</summary>

- **LAC3-A10** · baixa · ◐ Duas folhas aprovadas dão palavras diferentes ao mesmo glifo na linha de checagem.
  - *Prova:* folha-4-linhas-cartoes-aviso.html, «A LINHA DE CHECAGEM»: aprovada · reprovada, com causa · não se aplica · parou aqui (glifo sem sinal, «Modem, SIM e sinal sem resposta») · ainda não. componentes.md:48–51 usa esses nomes. A folha 3 chama os mesmos glifos de aprovado, falha e o link caiu.
  - *Correção do verificador:* Das cinco palavras, só duas divergem de fato: xis ('falha' × 'reprovada, com causa') e sem sinal ('o link caiu' × 'parou aqui'). Aprovado × aprovada é só gênero. Não se aplica e ainda não são iguais nas duas folhas.
- **LAC3-A15** · baixa · ✔ A peça 'processo correndo' é link em 2 referências e texto parado em 5.
  - *Prova:* <a href="#p">: T03/00:63 «Baixando · não saia da tela», T08/01:94 «Lendo · não saia da tela». <span>: T05/10:83, T09/00:121, T16/00:124, T16/01:124, T16/03:53. O leitor anuncia uma ação que não existe em 2 delas (T03-V5 em escala).
- **LAC3-A16** · baixa · ✔ Nada nas referências marca o desabilitado, que a R-12 define: os 18 cartões em espera do menu são links vivos.
  - *Prova:* T04/01 (8), T04/02 (7), T04/00, 03, 04 (1 cada): poço com traço dentro de <a href>. disabled e aria-disabled → 0 nas 105. leis.md:51 (R-12): «normal, pressionado, desabilitado».
- **LAC3-A17** · baixa · ◐ A barra do sistema desenhada vai ser lida como conteúdo do app em toda tela.
  - *Prova:* 105/105 começam pela barra com «14:30» e 3 svg; todo textos.md começa em `14:30`. componentes.md:15: «desenho do Android · não é do app».
  - *Correção do verificador:* Vale para o protótipo. Lá o C2 constrói a barra como peça (componentes.md:15, ciclos.md:33), dentro do celular, e o «14:30» não é aria-hidden. No Android de verdade, quem desenha a barra é o sistema, e ela não é conteúdo do app.
- **LAC3-A18** · baixa · ◐ Os 42 relógios das telas não são o relógio da folha 3, que é de onde o componente de glifo sai.
  - *Prova:* folha-3:16, relógio d=M12 7.5v5l3 2 e traço #A9A2BC. As telas usam d=M12 7.5V12l3 1.8 nos 42 (34 em poço, 8 fora), 36 deles em #6E6683 (--marca-limite, «só fora de texto»). É o T14-A13 em seis telas: T05, T12, T13, T14, T15, T16.
  - *Correção do verificador:* O relógio das telas não é o da folha 3, mas tem folha. A folha-7 o desenha 3 vezes: 2 em #6E6683 no 'bloco do evento', que é o que a T14 usa em :64 e :67, e 1 em #A9A2BC na 'linha da re-checagem'. A divergência é folha 3 × folha 7, e não telas × folhas.

</details>


### 4.10 · Por tela

#### T01 · Login

- **T01-A1** · alta · ◐ A 05 e a 07 trocam o título da tela pela falha ('Código não confere'). Isso contraria R-03 e a decisão 04, e o textos.md, que também é norma, manda esse título.
  - *Prova:* 05 e 07 html, h1 'Código não confere', contra 'Digite o código' na 03/06; textos.md:27,35; leis.md:44 (R-03 'O título da tela nunca vira a falha'); 07-decisoes/04-falha-no-elemento.md ('O que foi descartado: o título virando a falha')
  - *Correção do verificador:* O achado se sustenta, mas a linha está errada: R-03 fica em leis.md:42. A linha 44 é a R-05. Vale citar também a Lei 2, em leis.md:10.
- **T01-A2** · alta · ✔ A 07 (estado) remonta em relação à 03, e a 05 também: o bloco das células e do cartão sobe 9px e o cartão cresce 19px.
  - *Prova:* Pixel na coluna x=100: na 03 e na 06, células em 287→345 e cartão em 365→463; na 05 e na 07, células em 278→336 e cartão em 356→473. A causa é justify-content: center no grupo (03 html) mais a frase extra no cartão. Viola a Lei 3 (leis.md:11), a decisão 05 e 'mover o …
- **T01-A3** · media · ✔ A regra do Entrar tem duas versões: a documentação aceita qualquer senha de 8 caracteres ou mais, o mock diz que só a combinação dele vale.
  - *Prova:* logica.md:20 'qualquer senha com 8 caracteres ou mais entra'; tela.md:15; contra mocks.js:1026-1028 'usuario/senha: a ÚNICA combinação válida; qualquer outra cai na MESMA mensagem'
- **T01-A4** · media · ✔ animacao.md fala de um poço nos requisitos que não existe, e a 08 tem glifos de estado soltos, contra a Lei 4.
  - *Prova:* animacao.md:11 'o poço ganha o check'; na 08 html o check fica num span de 20px sem fundo nem borda (6 requisitos + 'Código conferido'); a folha 6 'requisitos da senha' é igual; leis.md:12 'Todo glifo de estado vive num poço'
- **T01-A5** · media · ✔ componentes.md diz 'campo · poço de 48', mas o campo medido tem 54, na tela e na própria folha.
  - *Prova:* componentes.md:107; 00-tela.html input com height: 54px; folha-6 html, peça 'campo' com height: 54px e a legenda 'rótulo em cima · poço de 48'; PNG 429→483. O 54 não é token (--alvo-min 48, --alvo-primario 56).
- **T01-A6** · media · ✔ componentes.md põe a peça 'falha' na Folha 1, mas ela está desenhada na folha 4, e com poço 24 em vez do 26 que a T01 usa.
  - *Prova:* Na folha-1 html, 'falha' só aparece como legenda da cor --vermelho; os rótulos da folha-4 incluem 'falha' (poço 24, ícone 14); o aviso da 01 tem poço 26 e ícone 16, a medida do 'aviso' da folha 4. componentes.md:9
- **T01-A7** · media · ✔ A semente diz 'usuário preenchido', mas a 00 abre também com a senha preenchida (14 pontos) e o campo dela focado.
  - *Prova:* tela.md:9 e logica.md:37 'usuário r.vieira preenchido'; 00-tela.html s5 value com 14 '•', e node dá M.credenciais.senha.length = 14; o rótulo SENHA está em #AAEF00
- **T01-A8** · media · ◐ O mock diz que o contato aparece mascarado; as referências mostram o número e o e-mail inteiros.
  - *Prova:* mocks.js:1043-1045 '(mascarados em tela: r•••••@… · •••••-8675)'; contra textos.md:15,19,23 '(81) 98715-8675' e 'r.vieira@atlsul.com.br'
  - *Correção do verificador:* A divergência é real, mas a frase está em mocks.js:1046. O intervalo 1043-1045 é só o começo do comentário D-21.
- **T01-A9** · media · ◐ O gate aprova sem conferir nada da T01, embora o mock diga que o escopo das credenciais está fechado no gate.
  - *Prova:* grep -c 'credenciais\|ddis\|sessaoAcesso' 04-dados/gate-cobertura.js = 0; node 04-dados/gate-cobertura.js dá 68 OK e 0 FALHA, 'GATE APROVADO'; mocks.js:1024 'Escopo fechado no gate'
  - *Correção do verificador:* O fato procede: o gate não confere nada da T01. A contradição não procede. 'Escopo fechado no gate' diz que o escopo foi decidido no gate do ciclo C4, não que o gate-cobertura.js o confere. O achado certo: as credenciais e a recuperação não estão entre as âncoras …
- **T01-A10** · media · ✔ A lista de peças de tela.md está contaminada: 14 das 27 não aparecem em nenhuma referência, e faltam 4 peças que a tela usa, mais uma que nem tem linha.
  - *Prova:* tela.md:26-52. Nas 10 HTML não há 'garagem', 'RKT-', 'Identificação', 'Encerrando' nem 'M2C-' (o único 'Garagem' é a senha Garagem!Ibura27), e o único #1A1726 é o cartão da 04. Usadas e fora da lista: barra do sistema sem sessão, duas ações, falha, segmentado; e …
- **T01-A11** · media · ◐ O rodapé 'duas ações' da folha tem medidas diferentes das de todas as telas.
  - *Prova:* Na folha-2, 'duas ações' tem padding 14 16 24 16 e border-top 1px #221D2E; grep 'padding: 14px 20px 28px 20px' acha o rodapé das 16 telas (8 referências da T01), 20/28 e sem borda
  - *Correção do verificador:* Invertido. O rodapé da folha é igual ao das outras 15 telas. O que diverge é o rodapé da T01: 20/28 e sem borda, nas 8 referências. O achado certo: a T01 não usa a peça 'duas ações'. Vale também para o padding 20 do conteúdo e o gap 18, que também só existem na T01.
- **T01-A12** · media · ✔ Para onde leva o fim da recuperação está em conflito: tela.md manda de volta ao login, e os botões prometem entrar.
  - *Prova:* tela.md:17 '→ senha alterada → login'; contra 08 'Salvar e entrar' e 09 'Entrar com a senha nova' (textos.md:39,43)
- **T01-A13** · media · ◐ A semente 'nenhuma sessão' usa 'sessão' sozinho, e o mock nasce com a sessão de acesso aberta: pela HU-T01-2, o app pularia o login.
  - *Prova:* tela.md:9; dominio.md §2.1 'dois objetos distintos, nunca sessão sozinho'; M.situacao.sessaoAcesso = {abertaDiasAtras:5, validadeDias:7}; HU-T01-2
  - *Correção do verificador:* A ambiguidade existe: 'nenhuma sessão' é verdade para a de configuração e falso para a de acesso, aberta há 5 dias. Mas a HU-T01-2 não dispara: ela exige 'sem rede', e o mock nasce com rede 'conectada' (mocks.js:1016). O conflito certo é com a HU-T01-11: a sessão de …

<details><summary>3 de gravidade baixa</summary>

- **T01-A14** · baixa · ✔ A peça 'a marca no login' da folha 6 não desenha o logo.
  - *Prova:* grep -c '<img' nas 8 folhas = 0; o recorte do PNG da folha 6 mostra só CONFIGURADOR entre traços; a legenda diz 'o logo e CONFIGURADOR entre dois traços'
- **T01-A15** · baixa · ✔ estados.md e logica.md citam como caso um caminho que não existe no mock.
  - *Prova:* estados.md:13-14 e logica.md:122-123 citam 'recuperacao.limites.validadeMin' e '.tentativas'; node dá M.recuperacao = undefined; o caminho certo é M.credenciais.recuperacao.limites.*
- **T01-A16** · baixa · ✔ HU-T01-11 e HU-T01-12 estão na T01, mas só têm referência na T04, e o Sair lá é um diálogo, não uma 'tela própria'.
  - *Prova:* dominio.md §5 T01; T04/textos.md:27 (ACESSO VENCE EM 2 dias) e :31 (diálogo Sair da conta); mocks.js:1038-1039 'HU-T01-2/4/11 movidas para o C16'

</details>

#### T02 · Selecionar contexto

- **T02-A1** · alta · ✔ O estado 02 remonta a tela: entra um bloco novo (a busca) e a lista inteira desce 62px. Contradiz a Lei 3 e a regra do próprio estados.md.
  - *Prova:* leis.md:11 'Nada se remonta' · estados.md:11 'Os blocos ficam onde estão' · 07-decisoes/05 'Todo estado é a tela-base com outro conteúdo' × diff 00-tela.html/02-estado.html: +linha 29 (div de 48). PNG @2x x=40: cartão 1 282→406, cartão 2 638→762 (Δ124@2x = 62px)
- **T02-A2** · alta · ◐ O estado 02 não nasce de dado nenhum, e o gate impede que nasça.
  - *Prova:* contrato.md:3 'todo estado nasce de um caso ou de um dado dele' × indice.json caso '' e logica.md:124 'derivado do fluxo' × M.uos tem 3 e gate-cobertura.js:18 exige 'empresa/UC/UO = 1·2·3' × Object.keys(M.casos) sem nada de garagem ou contexto (node: só 'busca-vazia', …
  - *Correção do verificador:* A primeira metade vale: nenhum dado ou caso gera a lista longa. A segunda exagera. O gate só impede que M.uos cresça. Um caso novo em M.casos, com garagens a mais, passaria no gate, que não conta os casos. O que mudaria é o número '33 casos no mock' do CLAUDE.md, e …
- **T02-A3** · media · ✔ A lista de peças de tela.md está contaminada: 6 das 10 não aparecem em nenhuma referência da T02, apesar de tela.md:21 dizer 'Medido nas referências'.
  - *Prova:* grep nas 3 HTML: 'CONFIGURADOR' 0, '<input' 0, '<label' 0, 'ATIVOS' 0, 'M2C-' 0, 'RKT-' 0, 'border-bottom: 2px solid #AAEF00' 0, 'width: 30px; height: 30px' 0 · componentes.md:72, 76, 91, 106, 107, 108 dão T02 em 'Telas que usam' (linha do histórico, a lista de …
- **T02-A4** · media · ✔ 'A lista de garagens' (folha-4, T04) e 'escolha numa lista' (folha-3, T02) desenham a mesma lista de garagens de dois jeitos. O quadrado lima do escolhido aparece com três medidas na pasta.
  - *Prova:* T02 01-momento-escolhida.html:33 poço 26 + lima 12, gap 10, sublinha #867E9A · T04/07 HTML poço 30 + lima 11, gap 12, min-height 72 + padding 10, sublinha #A9A2BC · folha-3 MARCADORES 'escolhido · 11px' (11×11 #AAEF00) × 'escolha numa lista' da mesma folha com 12×12 · …
- **T02-A5** · media · ◐ O desenho de Pátio Caruaru diz que a linha não se escolhe (traço de 'não se aplica' no poço, nome apagado). Texto, fluxo e mock dizem que ela se escolhe e vai sincronizar.
  - *Prova:* 00-tela.html:54 traço 10×1 #332C49 = glifo 'traço · não se aplica · vazio' da folha-3 × textos.md:7 'sincronize antes de usar' × fluxos.md:30 'contexto · pacote de mais de 7 dias · bloqueia até sincronizar' × mocks.js:640 'a UO nem abre em T02 sem passar por T03' × …
  - *Correção do verificador:* O conflito entre desenho e texto existe. Dois apoios estão errados. tela.md:15 diz, de forma genérica, 'tocar numa garagem → ela fica escolhida', então cobre Caruaru. Não é verdade que 'não diz'. E fluxos.md:30 ('bloqueia até sincronizar') é neutro: serve para as duas …
- **T02-A6** · media · ✔ O mock já traz Várzea como contexto ativo, mas a entrada da T02 mostra nada escolhido. Nenhum documento diz qual vale.
  - *Prova:* mocks.js:993 contextoAtivo {ucId:'uc-01', uoId:'uo-01'} × 00-tela.html:33, 41 (dois marcadores vazios) e 00-tela.html:65 (primário desabilitado)
- **T02-A7** · media · ✔ O pressionado que vale pras linhas e pro primário da T02 anima cor e usa 100ms, que não é token.
  - *Prova:* movimento.md:24 'a linha tocável sobe pra --elevado … Solta em 100ms' × movimento.md:43 'transform e opacity' × tokens.css:110-112 só 150/200/300 × folha-1 'movimento: só transform e opacity · 150, 200 ou 300ms'

<details><summary>4 de gravidade baixa</summary>

- **T02-A8** · baixa · ✔ A curva 'esmaece' do botão primário não existe como curva.
  - *Prova:* animacao.md:8 coluna Curva = 'esmaece' × movimento.md:12 só --mov-curva ('a curva de tudo, menos do que é linear')
- **T02-A9** · baixa · ◐ O caso declarado do momento omite M.pacotes, e a linha lê idade, hora e contagem dele.
  - *Prova:* estados.md:8 e indice.json 'ucs · uos' × a linha mostra 'pacote de ontem, 07:10 · 10 ativos' = pacotes[pac-uo-01].diasAtras/hora/contem.ativos · T04/estados.md:13 aponta 'uos · pacotes' pra mesma lista
  - *Correção do verificador:* A linha certa na T04 é estados.md:14, não :13. A :13 é 06-momento-folha-conta-sair (filaSaida). Detalhe: a contagem também pode vir de M.ativos por uoId (ver V6). Só idade e hora saem necessariamente de M.pacotes.
- **T02-A10** · baixa · ✔ O único pressionado de linha de garagem desenhado contradiz o mock e a lei de altura.
  - *Prova:* folha-1-fundamentos.html (linha tocável) 'Garagem Ibura · 10 ativos' × M.pacotes pac-uo-02 contem.ativos 8 e 8 ativos com uoId uo-02 · a linha tem height 54px × folha-1 '38 compacta · 44 padrão · 50 dupla · 72 com escolha — sem exceção'
- **T02-A11** · baixa · ✔ O elemento-assinatura promete que cada garagem diz a idade do pacote, mas Caruaru não diz, enquanto a T04 diz.
  - *Prova:* tela.md:7 'o pacote de cada garagem dizendo a idade dele' × textos.md:7 'pacote vencido · sincronize antes de usar' (diasAtras 8, hora 07:30 fora da tela) × T04/textos.md:35 'carregado há 8 dias · o limite é 7'

</details>

#### T03 · Sincronizar

- **T03-A1** · alta · ✔ O caso sync-falha-rede aponta o pacote de Caruaru, mas a referência da falha mostra o pacote de Várzea
  - *Prova:* mocks.js:544 `CASOS["sync-falha-rede"] = { pacoteId: "pac-uo-03", falhaNoTick: 4 …}`; mocks.js:540-541 'a primeira sincronização do pacote BLOQUEADO (pac-uo-03, 8 dias) falha'. Contra: textos.md:11 e PNG 01 mostram 'GARAGEM VÁRZEA', '6 de 10', 'pacote …
- **T03-A2** · alta · ◐ 'faltam ~40 s' não vem do mock e contradiz o ritmo de 4s da sincronização
  - *Prova:* textos.md:7; 00-tela.html:60. O mock não tem tamanho, taxa nem estimativa por pacote (node: M.pacotes só tem id, uoId, diasAtras, hora, limiares, presetsEventoIds, contem, data). movimento.md:39 'sincronização do pacote · 4s no total' → no item 9 de 16 faltam 7 × …
  - *Correção do verificador:* A substância vale, mas a linha está errada: 'faltam ~40 s' fica em 00-tela.html:40. A explicação de por que o coordenador não pegou não dá pra verificar: o '40' literal de fato existe em mocks.js:743 (decorrido: 40) e em :597/:607/:608/:617 ('−40 a …'), mas isso é …
- **T03-A3** · alta · ✔ A lista de peças da tela.md está contaminada: 13 das 20 peças não aparecem em nenhuma referência da T03, e duas que aparecem ficaram de fora
  - *Prova:* tela.md:24-43 contra as 5 referências: não há campo, campo focado, marca no login, linha de opção, linha do histórico, lista de garagens, cadeias, encerrando, pede o corte, sem homologar, com legenda nem processo parado. Faltam 'nota tracejada' (04) e 'ainda não' …
- **T03-A4** · alta · ◐ A falha de rede remonta a tela: a barra some e a lista sobe 83px — exatamente o antipadrão que a decisão 05 proíbe
  - *Prova:* leis.md:11 (Lei 3); estados.md:13; 07-decisoes/05-nada-se-remonta.md:3 ('o número pulando de lugar, a barra sumindo'). PNG, coluna x=40: 00 poço 246–549 e lista 578–929; 01 falha 246–383 e lista 412–763. No diff 00×01, as linhas 46-61 (barra e legenda) são removidas.
  - *Correção do verificador:* O fato e a medida valem. A prova de diff está errada: não são 'linhas 46-61 (barra e legenda)'. O diff é 29,41c29,31: o poço inteiro da 00 (rótulo ATIVOS, número 6 de 10, barra e legenda, 00:29-41) vira o aviso de falha (01:29-31). Tem um contraponto que vale …
- **T03-A5** · alta · ◐ Os estados 03 e 04 não partem do desenho da 00 e nem são iguais entre si
  - *Prova:* 03/04 não têm a lista com contagem; o poço troca a barra de 18 (y 214) pela de 14 (y 210); o segundo bloco é aviso com poço na 03 (y 279–347) e nota tracejada sem poço na 04 (y 280–362); a linha do pacote fica em 366,5 e 381,5. Diff 03×04, linhas 58-68 contra 58-60.
  - *Correção do verificador:* As medidas estão certas. A citação do diff está errada: `diff 03 04` dá '40,42c40,42' (3 linhas contra 3), não 'linhas 58-68 contra 58-60'. Os arquivos 03 e 04 têm 52 linhas.
- **T03-A6** · media · ◐ A versão do pacote não existe no mock e aparece em dois formatos
  - *Prova:* grep -rln 'pct-' → só as 4 referências HTML da T03 e o textos.md. A 03 usa o id cru do mock, 'pac-uo-02' (textos.md:19). O mock não tem campo de manifesto ou versão do pacote (grep 'manifesto' em mocks.js = 0). A HU-T03-3 (tela.md:49) depende disso.
  - *Correção do verificador:* O achado principal vale: a string de versão não vem do mock e aparece em dois formatos. Mas 'a HU-T03-3 depende disso' exagera no protótipo. 08-produto-real/o-que-o-prototipo-simula.md:14 põe 'com a versão gravada em toda evidência' do lado do produto, e diz que no …
- **T03-A7** · media · ✔ A fronteira dos 7 dias se contradiz: o texto da 03 diz que bloqueia com 7, a HU diz com mais de 7
  - *Prova:* textos.md:19 'Com 7 ele bloqueia'. Contra: tela.md:50 e dominio.md:249 'Pacote > 7 dias bloqueia'; estados.md:10 'entre 3 e 7 dias'; fluxos.md:29 'pacote de 3 a 7 dias · avisa e deixa continuar'; _fontes-v1/requisitos-v1.md:332 'mais de 7 dias'; textos.md:15 'o pacote …
- **T03-A8** · media · ✔ A tela.md chama a ação da falha de 'Tentar de novo', mas a referência e a HU dizem 'Reconectar'; e 'Voltar ao contexto' não está nos toques
  - *Prova:* tela.md:16 '`Tentar de novo`'; textos.md:11 '`Reconectar` · `Voltar ao contexto`'; tela.md:48 e requisitos-v1.md:330 'Reconectar'.
- **T03-A9** · media · ◐ A barra de download é a barra do placar enchendo, e a lei diz que o placar é a única que enche
  - *Prova:* leis.md:13 (Lei 5: barra só onde há faixa · placar do checklist é a exceção declarada); folha-5 'placar da homologação · a única barra que enche'. 00-tela.html:46-56 repete o desenho do placar (folha-5: 18px, --lima-faixa, marcas 6/9/6, marcador 3px) sem faixa esperada.
  - *Correção do verificador:* A substância vale. As linhas estão erradas: a barra fica em 00-tela.html:32-38, não em 46-56. O desenho é quase idêntico ao do placar: a 00 não tem as bordas laterais do poço.
- **T03-A10** · media · ◐ A barra de idade enche com o tempo que passou — o contrário da Lei 6 e da barra de acesso da T04
  - *Prova:* leis.md:14 'Preenchido é o que resta: o tempo drena · a barra cheia de um prazo diria que sobra tempo'. 03: preenchido 50% = 4/8 (03.html:47); 04: 100% (04.html:47). Contra: T04/05-momento-folha-conta.html, 'RESTAM 2 DE 7 DIAS' com preenchido 29% = 2/7, que drena. É o …
  - *Correção do verificador:* O conflito com a Lei 6 vale. As linhas estão erradas: o preenchido está em 03.html:33 e 04.html:33, não na :47 (os arquivos têm 52 linhas).
- **T03-A11** · media · ◐ O elemento-assinatura e os instrumentos da tela não têm peça nem folha
  - *Prova:* componentes.md não tem linha com 'idade', 'download' ou 'progresso'. grep 'CARREGADO HÁ\|faltam\|no total\|BAIXADO\|ENQUANTO' nas 8 folhas só acha o texto 'carregado há' da linha de garagem (folha 4). Contradiz 03-design-system/README.md:13 ('todo desenho que se …
  - *Correção do verificador:* É falso que a componentes.md não tenha 'download': está na :66, e o pacote baixando está na :125. E a barra de download tem folha: é o desenho do placar (folha-5:484), como o próprio A9 mostra. O que realmente não tem peça nem folha é a barra de idade (03/04:32-35), o …
- **T03-A12** · media · ✔ A animacao.md pede um check que 'se desenha', e só transform e opacity podem se mover
  - *Prova:* animacao.md:9 'o traço do check se desenha' (stroke-dashoffset) contra animacao.md:11 e movimento.md:43 'transform e opacity'; movimento.md:9 '--mov-rapido … o check aparecer'.
- **T03-A13** · media · ✔ Com reduzir movimento, a barra 'salta pro fim', mas a lei manda o processo continuar no mesmo ritmo
  - *Prova:* animacao.md:7 'salta pro fim' contra movimento.md:47 'Os processos continuam andando no mesmo ritmo — a prova continua nascendo em ordem, só que sem movimento'.
- **T03-A14** · media · ◐ Da 00 pra 02 o layout muda, e a animacao.md não diz como sem mexer nele
  - *Prova:* PNG: lista em y 289 (00) → 260 (02), −29px; a barra e a legenda somem (diff 00×02, linhas 46-61); trocam título e rodapé. animacao.md:11 'nada que mexa no layout' e 'o movimento vai de uma referência parada à outra', mas nenhuma linha da tabela cobre essa passagem.
  - *Correção do verificador:* A substância vale. As linhas do diff estão erradas: é 29,41c29,32, não 46-61. E a legenda não só some: é trocada por uma linha nova (02:32 'o pacote vale por 7 dias').
- **T03-A15** · media · ◐ As linhas de 58 da lista com contagem quebram a regra 'sem exceção' da altura de linha e não têm token
  - *Prova:* 00-tela.html:64 'height: 58px' (e folha-6, lista com contagem). folha-1: 'altura de linha · 38 compacta · 44 padrão · 50 dupla · 72 com escolha — sem exceção'; tokens.css:82-85; leis.md:32 (poço na linha não cobre 58/26).
  - *Correção do verificador:* O achado vale. A linha está errada: o 58 fica em 00-tela.html:44/49/54, não na :64.
- **T03-A16** · media · ✔ A casos.md trata pac-uo-02 e pac-uo-03 como casos do mock, e eles não são chaves de M.casos
  - *Prova:* casos.md:33-34; node: das 33 linhas da casos.md, i-01, ma-02, pac-uo-02 e pac-uo-03 não estão em M.casos, e sinal-aguardando-ciclo, modulo-com-pendencias, can-estatico-hodometro e pronto-para-fechar estão em M.casos sem linha. pac-uo-* são ids de M.pacotes.
- **T03-A17** · media · ✔ 'falhaNoTick' depende de um TICK_MS que não existe na pasta
  - *Prova:* mocks.js:544 'falhaNoTick: 4'; mocks.js:906 é a única menção ('como TICK_MS em T03/T05'); grep 'TICK_MS' no resto da pasta e em _fontes-v1 = 0. Não há unidade pra saber quantos itens o tick 4 representa.
- **T03-A18** · media · ✔ O pacote novo da 02 não chega a lugar nenhum: a T04 continua dizendo 'carregado ontem, 07:10'
  - *Prova:* textos.md:15 'Pacote de hoje … 12/03 14:30' contra T04-menu/textos.md:35 'Garagem Várzea · carregado ontem, 07:10'; mocks.js:1000-1001 'T03 acabou de sincronizar (pacote de 1 dia)'; logica.md:9 (o estado único guarda o pacote e a idade dele).
- **T03-A19** · media · ✔ Os estados da T03 não têm porta natural, e o caminho que o mock desenhou pra falha é inalcançável
  - *Prova:* palco.md:35 (estado: parado e sem toque); logica.md:56 (portas naturais só na T05 e na T06); a PNG T02/01 mostra a Pátio Caruaru com glifo traço, não escolhível, mas mocks.js:640-641 diz 'a UO nem abre em T02 sem passar por T03'. Os toques da tela.md:16-18 nunca rodam …

<details><summary>4 de gravidade baixa</summary>

- **T03-A20** · baixa · ✔ O motivo do caso de falha não é o texto da tela
  - *Prova:* mocks.js:545 'O que já baixou fica guardado.' contra textos.md:11 'Nada se perdeu. Ao reconectar, continua de onde parou.'
- **T03-A21** · baixa · ✔ A componentes.md põe a peça 'falha' na folha 1, mas ela está desenhada na folha 4
  - *Prova:* componentes.md:9 (folha 1 · falha · traço vermelho embaixo). Na folha-1 só existe a amostra de cor '--vermelho · falha'; o desenho está na folha-4, 'O AVISO · UM FORMATO, QUATRO USOS · falha' (y 1844).
- **T03-A22** · baixa · ✔ A barra não tem quadro de começo nem de fim nas referências
  - *Prova:* animacao.md:11 'Os quadros de começo e fim de cada movimento são as referências'. A 00 mostra a barra a 60%, e a 02 não tem barra; nenhuma referência a mostra em 0% ou em 100%.
- **T03-A23** · baixa · ✔ A T04 manda 'sincronize no menu', mas o menu não tem sincronizar — a sincronização mora na T03
  - *Prova:* T04-menu/textos.md:35 'Sincronize no menu para liberar'; dominio.md:70 (as 10 ferramentas da home, sem sincronizar); textos.md:23 ('Sincronizar agora' na T03/04).

</details>

#### T04 · Menu

- **T04-A1** · alta · ✔ O contador da fila diz 2 no menu e o diálogo de sair diz 3 itens na fila, no mesmo mundo, e nenhuma regra declarada produz os dois
  - *Prova:* textos.md:7 ('2' · 'Fila de saída'); textos.md:31 ('3' · 'itens continuam na fila'); tela.md:9 ('fila com 2 itens'). Node sobre M.filaSaida: na-fila 3 (f-01, f-02, f-03), não recebidas 6, erros 2 (f-09, f-10), não recebidas da Várzea 2 (f-01, f-04). HU-T04-3 fala em …
- **T04-A2** · alta · ✔ Últimas instalações aparece 'sem conexão' (00, 03, 04) e 'espera conexão' (01, 02), mas o mock diz rede conectada e a barra do sistema desenha sinal e wi-fi cheios
  - *Prova:* 00-tela.html:118 (cartão tracejado 'sem conexão'); 00-tela.html:19–20 (sinal e wi-fi com fill #F2F0F7); M.situacao = {rede:'conectada'}; casos.md não tem caso de rede para a T04
- **T04-A3** · alta · ✔ O caso link-perdido não produz o T04/03: é outro módulo, outro ônibus e um momento anterior à sessão
  - *Prova:* M.casos['link-perdido'] = {moduloSerial:'M2C-0312', ativoId:'a-03', naChecagem:6}; a-03 = PCX-9A17; casos.md:29 põe o caso em T04/03 e em T05/14 ('link perdido na 6a'); logica.md:16 diz que a sessão nasce na pré-checagem aprovada. O PNG 03 mostra M2C-0417 / RKT-8H42 …
- **T04-A4** · media · ◐ O estado checklist pendente não tem caso, e o dado não separa o 00 do 04
  - *Prova:* estados.md:11 põe o caso `checklist`, mas `checklist` não é chave de M.casos: é M.checklist, de topo. O 10 = itens B(5) + E(5), e bate com T13/textos.md:7 ('Faltam 10 itens'). Só que a semente da T13 (sessão M2C-0417 + RKT-8H42) é a mesma do 00-tela, e o 00 não mostra …
  - *Correção do verificador:* A primeira metade não é achado: casos.md:41 declara que estado sem caso próprio nasce de um dado de topo do mock (outras telas fazem igual: T03 `pacotes · pac-uo-02`, T06 `modelosAtivo · ma-02`). O achado real é a segunda metade: com a mesma sessão, nada no dado …
- **T04-A5** · media · ✔ A HU-T04-4 promete aviso persistente, e a referência entrega um contador no cartão
  - *Prova:* tela.md:55 e dominio.md §5 HU-T04-4 ('aviso persistente'); 04-estado-checklist-pendente.html:110 (contador 20×20 '10'); leis.md:15 (Lei 7: aviso = poço, rótulo, uma frase)
- **T04-A6** · media · ✔ A ordem e os nomes das 10 ferramentas nas referências não batem com a 'ordem fixa' de dominio.md
  - *Prova:* dominio.md:70: '… Calibração · Manutenção / diff · Últimas instalações · Finalizar com checklist · Fila de saída'. textos.md:7: '… Calibração · Conferir configuração · Finalizar com checklist · Últimas instalações · Fila de saída'. Também 'Reset de leitura do ativo' …
- **T04-A8** · media · ✔ A lista de peças de tela.md está contaminada: sete peças não aparecem em nenhuma referência da T04, e falta a faixa · sem sessão, que o 01 usa
  - *Prova:* tela.md:25–48 lista faixa · sem ação, diálogo sem saída, diálogo com ciência, linha do histórico, a marca no login, campo e campo focado, que nenhuma das 10 referências mostra. O 01 usa 'Sem sessão de configuração' com LED #4E475E (01-momento-sem-modulo.html:33–35), e …
- **T04-A10** · media · ✔ O aviso do 08 não tem poço nem glifo, contra a Lei 7 e contra o desenho do aviso na folha 4
  - *Prova:* 08-estado-folha-trocar-de-garagem-envio-em-andamento.html:42 (só o rótulo e a frase). Na folha-4, a peça 'aviso' tem poço de 26 com ícone de 16 (padding 10 12, gap 12). leis.md:15
- **T04-A12** · media · ✔ No 08, a folha cresce 39px e o cabeçalho se move (Lei 3: o estado muda o conteúdo, nunca o desenho)
  - *Prova:* PNG 07: borda do topo da folha em y 864 @2x (432 css), título em 972. PNG 08: 786 (393), título em 894. A lista fica em 1100 nos dois
- **T04-A15** · media · ✔ O mesmo diálogo está desenhado de dois jeitos, e o Cancelar do 06 tem 44, contra o 'link com 48 de toque'
  - *Prova:* 06-momento-folha-conta-sair-com-sessao-aberta.html:38–40 (gap 4, margin-top 6, Cancelar height 44) × 09-estado-folha-trocar-de-garagem-com-modulo-conectado.html (gap 6, margin-top 4, Cancelar 48 com margin −4); componentes.md:25
- **T04-A17** · media · ◐ Com o mock como está, a folha de garagem cai sempre no 08, e o 07 e o 09 ficam inalcançáveis; a fila não tem ritmo declarado
  - *Prova:* M.filaSaida f-04 {estado:'enviando', progresso:62}, estático. estados.md:14–16. movimento.md:30–39 não lista a fila entre os processos. 08-produto-real/o-que-o-prototipo-simula.md:12 diz 'a fila sobe no ritmo do mock', mas o mock não tem ritmo
  - *Correção do verificador:* Não é verdade que o 07 e o 09 ficam inalcançáveis. O 09 é estado e abre pela coluna do palco (estados.md:3, palco.md:24). O-que-o-prototipo-simula.md:12 diz que a fila sobe, então o f-04 termina e o 07 volta a ser alcançável. O achado certo: falta declarar o ritmo da …
- **T04-A18** · media · ✔ A transição de tela promete a faixa parada, mas entre a T04 e as ferramentas a faixa muda de lugar e de altura, e a barra muda de cor
  - *Prova:* 00-tela.html:16,25,32: barra #0B0910, tira 30–82, faixa 50 em 82–132. T07/00-tela.html e T15/00-tela.html: barra 30 #16131D e faixa 52 logo abaixo, em 30–82. movimento.md:16; animacao.md:3
- **T04-A21** · media · ✔ As duas portas das folhas (garagem e avatar) e o X das folhas têm alvo de 44, abaixo de --alvo-min
  - *Prova:* 00-tela.html:26 (button height 44px) e :30 (44×44); 05-momento-folha-conta.html e 07 (X width 44 height 44); tokens.css:87 --alvo-min 48

<details><summary>10 de gravidade baixa</summary>

- **T04-A7** · baixa · ✔ componentes.md diz que 'espera a rede' tem borda sólida, mas a folha e a referência desenham tracejada
  - *Prova:* componentes.md:64 ('fundo apagado, borda sólida, traço no poço'); folha-4 HTML, bloco 'espera a rede': 'border-style: dashed'; 00-tela.html:118 'border-style: dashed'
- **T04-A9** · baixa · ✔ componentes.md põe a peça 'espera' na folha 3, mas o cartão tracejado está desenhado na folha 4
  - *Prova:* componentes.md:42 (folha 3 · espera · 'tracejado · a causa no lugar da ação'). Na folha-3 PNG, 'espera' é o glifo círculo 'ainda não'. O cartão tracejado 'Dados da CAN · espera módulo e ativo' está na folha-4, seção CARTÕES DE FERRAMENTA · O MENU
- **T04-A11** · baixa · ✔ No estado de falha, o conteúdo da faixa sobe 1px (Lei 3)
  - *Prova:* 03-estado-faixa-modulo-com-falha.html:32: border-bottom 2px dentro de height 50 com border-box. Pixel @2x: LED 208→206, ENCERRAR 207→205 em relação ao 00
- **T04-A13** · baixa · ✔ tela.md diz 'faixa de sessão quando há sessão', mas o 01 mostra a faixa sem sessão
  - *Prova:* tela.md:8; textos.md:11 ('Sem sessão de configuração'); 01-momento-sem-modulo.html:33
- **T04-A14** · baixa · ✔ A faixa do 01 tem as linhas trocadas: separador em cima e nada embaixo
  - *Prova:* 01-momento-sem-modulo.html:32–33 (o conjunto da tira fecha antes da faixa). PNG x=350 @2x: no 01, #2E2840 em 164–165 e #16131D em 264–265; no 00, 02 e 03, #221D2E em 164–165 e #2E2840 em 264–265
- **T04-A16** · baixa · ✔ A peça 'decide agora' tem dois tamanhos de poço
  - *Prova:* 01-momento-sem-modulo.html:43 (poço 34, ícone 20) e folha-4 'decide agora' (34) × 02-momento-modulo-sem-ativo.html, Ativo selecionado (poço 30, ícone 18)
- **T04-A19** · baixa · ◐ O C5 de ciclos.md fala em 'o diálogo de sair', mas a T04 tem dois diálogos
  - *Prova:* 06-prototipo/ciclos.md:51; referências 06 (Sair da conta) e 09 (Trocar de garagem)
  - *Correção do verificador:* O texto do escopo cita um diálogo só, mas o critério de pronto, ciclos.md:53 ('as referências da T04 comparadas'), cobre as 10 referências, inclusive o 09. É imprecisão de escrita, não buraco de escopo.
- **T04-A20** · baixa · ◐ animacao.md não tem linha para os diálogos e usa 'esmaece' como curva, que não é token
  - *Prova:* animacao.md:5–10 (4 linhas, nenhuma de diálogo; a linha do cartão liberado usa a curva 'esmaece'); movimento.md:12 (só --mov-curva) e :23 (diálogo)
  - *Correção do verificador:* A falta da linha de diálogo não é lacuna: animacao.md:3 diz 'Vale o 03-design-system/movimento.md', e movimento.md:23 define o diálogo (150ms, 98%→100%, véu junto). Só vale a segunda metade: 'esmaece' na coluna Curva não é token; o único é --mov-curva ('desacelera').
- **T04-A22** · baixa · ✔ Valores emprestados de tokens de outra semântica: letra 18 e padding 18 usam --n-unidade-g; 'dias' 14 junto de número 26
  - *Prova:* 05-momento-folha-conta.html:45 (font-size 18px 'Rafael Vieira'), :34 (padding 18px); 06:35 e 09:35 (padding 20px 18px). tokens.css:72–73 (--n-unidade-p 12 'junto de número até 34', --n-unidade-g 18 'junto de 48 e 62'); não há 18 nos tokens de tipo nem de espaço
- **T04-A23** · baixa · ◐ Sem mock nem regra, o botão 'Sair da conta' da folha tem 52 de alto e fundo de cartão: não é primário, link nem botão secundário
  - *Prova:* 05-momento-folha-conta.html:63 (height 52px, background #1A1726); componentes.md:25 (primário 56, link 48) e :123 (botão secundário com fundo --elevado)
  - *Correção do verificador:* Não é verdade que falta desenho: a peça 'folha' da folha-2 desenha esse mesmo botão (52, #1A1726, borda #2B2540, 'Sair da conta'). O que falta é peça com nome e regra; a altura 52 só existe no token de outra semântica (--faixa-sessao).

</details>

#### T05 · Conectar módulo

- **T05-A1** · alta · ✔ A busca acha 5 módulos, não 4
  - *Prova:* 00/01/04: '5 encontrados' e 'OUTROS QUATRO POR PERTO' (textos.md:7, 11, 23), ou seja, herói + 4. Contra isso: logica.md:26 ('acha quatro módulos, escolhe o M2C-0417') e 08-produto-real/o-que-o-prototipo-simula.md:5 ('a busca de módulos acha quatro, sempre'). A semente …
- **T05-A2** · alta · ✔ A lista 'por perto' e a contagem não existem no mock
  - *Prova:* grep -n -i -E 'perto\|busca\|encontr' 04-dados/mocks.js só acha comentários (549-551) e o caso busca-vazia. Nenhum campo lista 0362, 0394, 0335 e 0999 como vizinhos, nem a ordem. contrato.md:3 ('todo estado nasce de um caso ou de um dado') e contrato.md:7 ('nenhum …
- **T05-A3** · alta · ✔ 'A busca durou 8 s' é número inventado
  - *Prova:* 03 PNG/textos.md:19. M.casos['busca-vazia'] = {tentativa: 1, motivo: '...'} não tem duração. O '8' só existe no mock em outros assuntos. A conferência mecânica passou porque procurou o número literal
- **T05-A4** · alta · ◐ 'atualizando · 62%' não tem fonte, e o ritmo da atualização não está declarado
  - *Prova:* 10 PNG/textos.md:47. O único 62 do mock é filaSaida f-04.progresso (mocks.js:431), o upload de evidência do a-09. movimento.md:30-39 não tem a atualização de firmware, e 06-prototipo/CLAUDE.md, regra 8, manda usar só os tempos de movimento.md
  - *Correção do verificador:* O '62' não é só o da f-04: também existe em mocks.js:598 (nível de combustível da ma-01, "62 %"). O resto se sustenta: o progresso da atualização não tem fonte, e o ritmo dela não está declarado.
- **T05-A5** · alta · ✔ O estado 09 não nasce de dado nenhum
  - *Prova:* estados.md:16 e logica.md:137 dizem 'firmware-fora-matriz + modem sem rede'. Mas M.casos['firmware-fora-matriz'] = {moduloSerial, ativoId, firmwareDisponivel}, e grep -i 'modem\|semRede' mocks.js só acha checklist c-modem (mocks.js:844). M.situacao.rede é a rede do …
- **T05-A6** · alta · ✔ Os momentos 02 e 10 não têm como ser alcançados no protótipo
  - *Prova:* palco.md:24: a coluna 'lista só os estados — momento é fluxo e não entra'. palco.md:35: num estado, o app fica 'parado e sem toque'. A 02 ('só um módulo por perto') não tem gatilho no mock nem toque que leve até ela, e o-que-o-prototipo-simula.md:5 diz 'acha quatro, …
- **T05-A7** · media · ✔ A porta natural do M2C-0999 contradiz a referência
  - *Prova:* logica.md:56: 'Na T05, tocar no M2C-0999 abre o serial não cadastrado'. Nas 00/01/04, a linha do M2C-0999 é <div style=...>, e as outras são <a href="#m">. O serial está em #867E9A e, na 01, o marcador é o traço de 'não se aplica'. A referência não deixa tocar
- **T05-A8** · media · ✔ O estado 13 depende de um caso que estados.md e casos.md não citam
  - *Prova:* O '12 · 3 de diagnóstico' da 13 vem de M.casos['modulo-com-pendencias'] = {M2C-0362, a-06, 12, 3} (mocks.js:567). estados.md:20 e logica.md:140 só citam canal-aberto. casos.md tem 33 linhas, mas inclui i-01, ma-02, pac-uo-02 e pac-uo-03, que não são chaves de M.casos, …
- **T05-A9** · media · ✔ 14 e 15 remontam a tela (Lei 3): o aviso empurra a lista e a tira some
  - *Prova:* Varredura de pixel na x=20: nas 07 a 12, a lista começa em y=97. Na 14, o aviso ocupa 97→150 e a lista começa em 162; na 15, 97→149 e 161. A tira de leituras está em todas as pré-checagens de 05 a 13 e não existe na 14 nem na 15: textos.md:63 e :67 terminam em 'Canal …
- **T05-A10** · media · ◐ A linha de animacao.md para a falha contradiz as referências e movimento.md
  - *Prova:* animacao.md:10: 'a causa aparece embaixo, e o aviso surge'. As 06 a 12 falham sem aviso. Onde o aviso existe (14), ele entra em cima da lista. A causa faz a linha crescer de 38 para cerca de 47 (07: 'min-height: 38px; padding: 6px 0', y 98→145), o que empurra as …
  - *Correção do verificador:* A linha reprovada mede 48, não cerca de 47: vai de 98 a 146 com a divisória, que é como a normal mede 38. A contradição com animacao.md:14 e movimento.md:43 se sustenta.
- **T05-A11** · media · ✔ A faixa descendo mexe o layout e muda a cor da barra
  - *Prova:* Lista sem faixa em y=97 (07-12) e com faixa em y=134 (05/13): 37px. O rótulo de topo some. A barra do sistema vai de #0F0D14 (06 html) para #16131D (05 html), por leis.md:33. animacao.md:11 com :14 e movimento.md:43 só permitem transform e opacity
- **T05-A12** · media · ✔ A 10 usa o glifo de 'em andamento' onde deveria estar 'ainda não'
  - *Prova:* 10 html: 9 linhas com relógio stroke #6E6683 ('M12 7.5V12l3 1.8'). folha-3: 'relógio · em andamento' e 'espera · ainda não' (círculo #4E475E). 14/15 e a folha 4 'ainda não' usam o círculo. componentes.md:41: 'ainda não \| círculo apagado'
- **T05-A13** · media · ✔ O mock diz que o M2C-0371 está na lista da T05, e ele não está
  - *Prova:* mocks.js:130-131 ('M2C-0371 (a-09, Várzea, um toque na lista de T05)') e mocks.js:884 ('a-09 tem M2C-0371 sem fio na lista de T05 em Várzea'), que é o caminho do pronto-para-fechar. A lista da 01 tem 0417, 0362, 0394, 0335 e 0999

<details><summary>5 de gravidade baixa</summary>

- **T05-A14** · baixa · ✔ A lista de peças de tela.md é a coluna de componentes.md invertida, e 16 das 37 peças não aparecem em nenhuma referência da T05
  - *Prova:* diff entre as 37 linhas de componentes.md que citam T05 e tela.md:25-61: os mesmos itens, só em outra ordem. Ausentes nas 16 referências: cadeia, encerrando, pede o corte, marca no login, campo, linha de ônibus e outras. E falta a peça que a T05 usa de fato: 'faixa · …
- **T05-A15** · baixa · ✔ componentes.md põe a peça 'falha' na folha 1, mas ela está desenhada na folha 4
  - *Prova:* componentes.md:9. Na folha-1, 'falha' é só a legenda da amostra --vermelho #E06A5A. O aviso 'falha', com o texto exato da T05/14 ('SEM RESPOSTA DO MÓDULO · Reconecte para seguir da sexta.'), está na folha-4, seção 'O AVISO · UM FORMATO, QUATRO USOS'
- **T05-A16** · baixa · ✔ A regra de 'reprovada, com causa' fala em título vermelho, e o desenho não é
  - *Prova:* componentes.md:49: 'X, título e valor em vermelho'. Na folha-4 e nas 07/08/11/12, o título está em 'font-weight: 600; color: #F2F0F7'. Só a causa e o valor são #E06A5A
- **T05-A17** · baixa · ✔ O mock registra 12 checagens na pré-checagem do herói; a tela e a spec têm 11
  - *Prova:* mocks.js:321: i-01.etapas.preChecagem = {checagens: 12, passaram: 12}. As referências mostram 11 linhas ('de 11'), e a tabela de _fontes-v1/requisitos-v1.md (T05) tem 11 checagens + 2 leituras. doc-mestre-v1.md:262 também diz '12 itens'
- **T05-A18** · baixa · ✔ O gate não recomputa 5 dos casos que a T05 lê
  - *Prova:* gate-cobertura.js:120-125: OBRIGATORIOS não inclui busca-vazia, conexao-falha, link-perdido, modulo-em-repouso nem modulo-com-pendencias. A saída do gate não tem 'caso: busca-vazia' etc. (rodei node 04-dados/gate-cobertura.js → GATE APROVADO)

</details>

#### T06 · Selecionar ativo

- **T06-A1** · alta · ✔ O '5 no pacote' e as 5 linhas da 00 contradizem o mock, a semente e a folha 3: o pacote de Várzea tem 10 ativos
  - *Prova:* 00-tela.html:36 '5' · mock: pacotes[pac-uo-01].contem.ativos = 10 e M.ativos.filter(uoId==='uo-01').length = 10 (node) · tela.md:9 e logica.md:42 'dez ônibus no pacote' · folha-3 'escolha numa lista': 'Garagem Várzea … 10 ativos'. O mecânico não pegou porque o dígito …
- **T06-A2** · alta · ◐ A 04 foi desenhada com ONK-8Q90 / Garagem Ibura, mas o caso ativo-fora-pacote aponta a-24 KUD-4Y21 / Pátio Caruaru
  - *Prova:* mocks.js:468-469 {ativoId 'a-24', motivo 'Este ativo pertence ao Pátio Caruaru…'} · a-24 = KUD-4Y21, frota 1072, uo-03 Pátio Caruaru (node) · 04.html:39-45 e textos.md:23 'ONK-8Q90 · frota 1048 · Pertence a Garagem Ibura.' = a-16 (uo-02). A folha 6 repete o ONK-8Q90.
  - *Correção do verificador:* O conteúdo se sustenta, mas a linha citada está errada. O caso fica em mocks.js:471-472. As linhas 468-469 são o pool-esgotado.
- **T06-A3** · alta · ◐ A porta natural da T06 (tocar no KNB-5H39) não existe na lista desenhada
  - *Prova:* logica.md:56 'na T06, tocar no KNB-5H39 abre o sem chassi na CAN' · KNB-5H39 é o 9º ativo de uo-01 (node: posição 9) · 00-tela.html:40-96 desenha só 5 linhas, dentro de container com overflow hidden (00-tela.html:33). E a 03 no palco é 'parada e sem toque' …
  - *Correção do verificador:* É verdade que a lista desenhada não tem o KNB-5H39. Mas a pasta dá dois caminhos até ele: a busca (tela.md:18, 00-tela.html:38) e a rolagem do conteúdo (07-decisoes/14-tela-800.md:5 'o conteúdo rola e o rodapé fica'). Então a frase 'só é alcançável por essa porta' …
- **T06-A4** · alta · ✔ A animacao.md manda desenhar um check entre os chassis que o quadro de fim (01) não tem, e não existe o quadro de começo
  - *Prova:* animacao.md:7 'se bate, o check se desenha entre os dois' e animacao.md:10 'Os quadros de começo e fim … são as referências' · 01.html:43-54 só tem a divisória 1px; 01.html tem 3 <svg> (todas da barra do sistema, grep -c) · nenhuma referência mostra o valor lido vazio
- **T06-A5** · alta · ✔ Os estados remontam o momento 01, contra a Lei 3: blocos mudam de tamanho, se fundem e a placa anda até 164px
  - *Prova:* Varredura de coluna (x=20) e das faixas de tinta nos PNGs (scratchpad/tmp/t06/png.py). 01: escolhido y 136–261, par 275–627, placa y 185. 02: escolhido 136–252 (padding 18, 02.html:38), par 266–563, valor lido y 350 contra 398 (−48). 03: o par vira nota 275–355 + …
- **T06-A6** · media · ✔ A lista de peças do tela.md está contaminada: 16 das 27 não aparecem em nenhuma referência, a faixa listada é a errada e o bloco escolhido, que a tela usa, não está na lista
  - *Prova:* tela.md:26-52 (27 itens); ausentes nas 7 referências: faixa · sem ação, processo correndo, linha do histórico, a lista de garagens, cadeia concluída/recusada, encerrando, pede o corte, sem homologar, com contador de falha, a marca no login, campo, campo focado, linha …
- **T06-A7** · media · ◐ O 'cartão que pede ação' da folha 6 é o cartão da T15, não a linha 'Solicitar correção de cadastro' da 02
  - *Prova:* folha-6 'cartão que pede ação': glifo X de 22, 'UM PRECISA DE VOCÊ', 'Evidências · KJC-7N23' 22/700, botão secundário 52 · 02.html:55-57: linha de 50, 14/600 + 'anexa os dois' 12/500, sem glifo. Só a 02 tem esse desenho (grep 'anexa os dois' em 03-design-system não …
  - *Correção do verificador:* Está certo que a peça da folha é o cartão da T15, não a linha da 02. Mas é falso que só a 02 tem esse desenho. T13/07-momento-responder-item.html:52-55 tem a mesma linha, com estilo idêntico: height 50, borda #2B2540, fundo #1A1726, space-between, 'Não conforme' …
- **T06-A8** · media · ✔ Três fontes dizem coisas diferentes sobre por onde a busca filtra: módulo, identificador ou chassi
  - *Prova:* tela.md:18 e 00-tela.html:38 'placa, frota ou módulo' · dominio.md:279 e historias.md:57 (HU-T06-1) 'placa, frota ou identificador' · mocks.js:177-180 'IDENTIFICADOR = chassi … campo pesquisável'
- **T06-A9** · media · ✔ A HU-T06-1 promete ver o módulo esperado, e nenhuma referência o mostra
  - *Prova:* HU-T06-1 (dominio.md:279) 'vejo modelo do ativo e módulo esperado' · requisitos-v1.md:467 'Mostra modelo do ativo e módulo esperado' · o mock tem ativo.moduloSerial · a linha de ônibus (00-tela.html:41-51 e folha 6) mostra só placa, modelo e frota
- **T06-A10** · media · ◐ O serial da faixa muda conforme o caso, sem regra declarada: 05 e 06 trocam o módulo, 02, 03 e 04 ficam no M2C-0417 mesmo com ativos que esperam outro
  - *Prova:* 05.html:27 M2C-0335 e 06.html:27 M2C-0389 (caso.moduloSerial) · 02/03/04.html:27 M2C-0417, mas a-17 espera M2C-0445, a-09 espera M2C-0371 e a-24 espera M2C-0489 (node) · mocks.js:882-884: a jornada do a-09 é com o M2C-0371 · a semente de todos é 'sessão M2C-0417' …
  - *Correção do verificador:* Há uma regra derivável e as referências a seguem: casos.md:3 'O estado se monta pelo caso'. Quando o caso traz moduloSerial, a faixa usa esse módulo. Quando não traz, fica a semente da tela (logica.md:42, M2C-0417). Então dizer que a troca não tem regra exagera. O que …
- **T06-A11** · media · ◐ Os casos da 02 e da 06 usam ativos de Ibura, que não estão no pacote de Várzea: no mundo, eles dariam a 04
  - *Prova:* a-17 RDF-3R14 e a-11 PGE-6K41 têm uoId 'uo-02' (mocks.js:193, :199) · contextoAtivo.uoId = 'uo-01' · a trava de fora do pacote vem antes (dominio.md:160) · o gate não confere se o ativo pertence ao pacote (gate-cobertura.js:129-136, 150-153)
  - *Correção do verificador:* Os fatos se sustentam. Mas dominio.md:160 não diz que a trava de fora do pacote 'vem antes': a matriz não é ordenada, e essa ordem é inferência. Falta dizer também que o mock já usa a troca de UO em T02 como saída para ativos de Ibura (mocks.js:633-638, o caso do …
- **T06-A12** · media · ◐ A faixa da T06 não tem a borda de baixo que a folha e a T07 têm: ela muda de desenho entre telas da mesma sessão
  - *Prova:* 00-tela.html:24 sem border-bottom · folha 2 'faixa · sessão aberta' e T07/T09/T10 00-tela com border-bottom 1px #2E2840 (grep) · movimento.md:16 'A barra do sistema e a faixa da sessão ficam paradas'
  - *Correção do verificador:* Isso não é da T06: a borda da faixa vai e vem na pasta inteira. Some até dentro da mesma tela: T09/00 e 04 têm a borda, T09/01-03 não têm. T13/09 também não tem, e os outros momentos da T13 têm. É uma decisão só para a faixa em todas as telas, não um desvio da T06.
- **T06-A13** · media · ◐ A animação 'o botão acende' troca cor e fundo, e o movimento só permite transform e opacity
  - *Prova:* animacao.md:8 · o botão vai de #1A1726 / borda #2B2540 / texto #867E9A (03.html:48) para #402070 / texto lima (01.html:58) · movimento.md:43 e animacao.md:10 'Só propriedades de transform e opacity'
  - *Correção do verificador:* A linha certa é 01.html:57, não 58 (a 58 é o link 'Escolher outro'). E não há contradição necessária. A regra limita a propriedade animada, não os quadros de começo e fim. 'Acender' se faz trocando duas camadas por opacidade (apagado sai, aceso entra), só com opacity. …

<details><summary>1 de gravidade baixa</summary>

- **T06-A14** · baixa · ✔ Há espaços e fonte cujo valor não tem token dessa família, além do 78 que o mecânico já achou
  - *Prova:* padding 22 (01/03/04/05/06.html:38), padding 18 (02.html:38), gap 18 (01/02.html:43), placa 18px (00-tela.html:44) · a escala de espaço (tokens.css:76-78) não tem 18 nem 22; eles só coincidem com --poco-22, --t-titulo-tela e --n-unidade-g · leis.md:21 Lei 13

</details>

#### T07 · Dados da CAN

- **T07-A1** · alta · ✔ O 03-estado-dominio-mudo não nasce do caso: mostra o painel de um ma-01 com a identidade de a-16, que é ma-02.
  - *Prova:* mocks.js:645 can-estatico-dominio = { ativoId: 'a-16', semLeituraDominio: 'Motor' } · mocks.js:198 a-16 modeloAtivoId 'ma-02' · mocks.js:603-609 ma-02: hodômetro 96.410, bateria '24,0 a 29,0 V' com lido 27,1 V, Temperatura do óleo no Motor, nível 48 %, sem GPS · …
- **T07-A2** · alta · ✔ O 01 remonta a tela: a linha da causa faz o cartão crescer, empurra os blocos de baixo e encolhe a faixa da sessão.
  - *Prova:* render headless (Chrome, getBoundingClientRect) · 00: faixa 360×52, tambor y277,6, grade y379,6, resumo y571 · 01: faixa 360×51,4, tambor y291, grade y393, resumo y577, bateria 157,6 contra 143,6, gap 8 → 6 (01-estado-fora-da-faixa.html:43) · contradiz leis.md:11 (Lei …
- **T07-A3** · alta · ✔ O Nível tem barra sem faixa esperada, contra a Lei 5.
  - *Prova:* 00-tela.html:120-125: trilho com marcas e marcador em left 62%, sem div de faixa · 00-tela.html: texto 'sem faixa' · mocks.js:598 nivel esperado: null · leis.md:13: 'Barra só onde há faixa esperada. O placar do checklist é a exceção declarada' — o Nível não é exceção …
- **T07-A4** · alta · ✔ O check de Ignição e Posição está solto, fora de poço, contra a Lei 4.
  - *Prova:* 00-tela.html:132 e :137: svg 12×12 stroke #AAEF00 direto no span · leis.md:12: 'Todo glifo de estado vive num poço, até dentro de cartão' · a folha-5 desenha 'sinais liga-desliga' do mesmo jeito (folha-5 html, bloco 'sinais liga-desliga').
- **T07-A5** · media · ◐ A escala das barras usa números que não estão no mock nem têm regra escrita: 11,0, 16,0 e 10,0, a escala 0–12 dos satélites e o passo das marcas.
  - *Prova:* mocks.js:593 só tem '12,0 a 15,0 V' e mocks.js:594 só tem '4 ou mais' · 00-tela.html:50 faixa em left 20%, largura 60% → escala 11–16 · 00-tela.html:60 marcador em 56% = (13,8−11)/5 · 01-estado-fora-da-faixa.html:50 faixa em 33,3%/50% → escala 10–16 · 00-tela.html:106 …
  - *Correção do verificador:* A faixa da bateria está em mocks.js:590 ('12,0 a 15,0 V'), não na :593. A :594 (satélites '4 ou mais') está certa. O resto da afirmação vale: 11,0, 16,0 e 10,0 aparecem só nas referências, e não há regra escrita para a margem da escala, para a escala 0–12 nem para o …
- **T07-A6** · media · ◐ O mesmo sinal com o mesmo valor tem duas escalas: 11–16 na T07 e 10–16 na T13.
  - *Prova:* 00-tela.html:50/:60: faixa em 20%/60%, marcador em 56% para 13,8 V · T13-checklist/referencias/html/03-momento-c-hardware-aberta.html:114-116: ALIMENTAÇÃO 13,8 V com faixa em 33,3%/50% e marcador em 63,3% · a folha-7 'cartão com barra' repete a T13.
  - *Correção do verificador:* O ALIMENTAÇÃO da T13 está em 03-momento-c-hardware-aberta.html:66-68, não em :114-116. O fato vale: o mesmo 13,8 V aparece em escala 11–16 na T07 e 10–16 na T13 e na folha-7. É o mesmo tema do T13-A22 (o GPS), agora na bateria.
- **T07-A7** · media · ✔ 'Alternador' não existe no mock: o rótulo do sinal é 'Tensão do alternador'.
  - *Prova:* mocks.js:591 rotulo: 'Tensão do alternador' · textos.md:7 'Alternador · Velocidade · Ré · Rotação · Consumo' · os outros quatro batem com o rotulo (Velocidade, Ré, Rotação, Consumo).
- **T07-A8** · media · ✔ A regra da causa provável mora só num comentário do mock, e a HU lista outras causas.
  - *Prova:* mocks.js:621-625 (C11.8): isolado → 'VEÍCULO ou CADASTRO'; ausente com 1 no domínio → 'LIGAÇÃO'; domínio → 'BARRAMENTO ou MODELO' · dominio.md:292 HU-T07-2: 'ligação, barramento, modelo incorreto' · 'veículo' não está na HU · a regra não está em tela.md nem em …
- **T07-A9** · media · ◐ animacao.md diz que os quadros de começo de cada movimento são referências da pasta, mas a T07 só tem quadros de fim.
  - *Prova:* animacao.md:12 'Os quadros de começo e fim de cada movimento são as referências desta pasta' · referencias/png/ tem só 00, 01, 02, 03, todos com a leitura completa · nenhuma mostra o marcador em zero, o tambor parado ou o contador em '0 de 12'.
  - *Correção do verificador:* Faltam quadros de começo para três dos quatro movimentos: o marcador, o tambor e o contador. O quarto, 'sinal fora da faixa', tem começo (00) e fim (01). Só que os dois são de ativos diferentes (M2C-0417/RKT-8H42 contra M2C-0301/QJF-2C61), com outro hodômetro e outra …
- **T07-A10** · media · ✔ A leitura da CAN é um processo sem ritmo declarado.
  - *Prova:* animacao.md:9 'contador do cabeçalho · cada sinal que passa · 7 de 12 troca no lugar' · movimento.md:30-39 lista oito processos e nenhum é a leitura da CAN · animacao.md:8 '40ms entre elas' não é token (tokens.css:110-113).
- **T07-A11** · media · ✔ Os números dos cartões pequenos e as unidades usam tamanhos que os tokens destinam a outra coisa.
  - *Prova:* 00-tela.html:88/:103/:118: números em 22px = --t-titulo-tela, que tokens.css:63 marca como 'um por tela'; nenhum --n-* tem 22 · unidades °C e % em 11px e km em 13px (00-tela.html:79/:88) contra --n-unidade-p 12px 'junto de número até 34' (tokens.css:72).
- **T07-A12** · media · ✔ O casos.md não traz dois casos da T07 que estão no mock, e um deles é obrigatório no gate.
  - *Prova:* node: em M.casos e fora do casos.md → sinal-aguardando-ciclo, can-estatico-hodometro (e modulo-com-pendencias, pronto-para-fechar) · gate-cobertura.js:123 exige sinal-aguardando-ciclo · mocks.js:492 motivo 'Sinal dinâmico — só confirma durante o ciclo dinâmico.' não …

<details><summary>3 de gravidade baixa</summary>

- **T07-A13** · baixa · ✔ O 'O que se toca' da tela.md está incompleto.
  - *Prova:* tela.md:15-16 lista 'Configurar módulo' e 'Ler novamente' só no fora da faixa · textos.md:15 e :19: 'Ler novamente' também no 02 e no 03 · textos.md:7: 'Voltar ao menu' no 00, fora da lista · o destino de 'Ler novamente' não está escrito, e o HTML aponta as duas ações …
- **T07-A14** · baixa · ✔ A lista de peças da tela.md tem 8 peças que não aparecem em referência nenhuma da T07 — é a contaminação da coluna 'Telas que usam'.
  - *Prova:* tela.md:22-41 (20 peças) · ausentes: faixa · sem ação, processo correndo, com legenda, a marca no login, campo, campo focado, cartão com barra, cartão de configuração · componentes.md:106-108 põe marca, campo e campo focado em T01 a T16.
- **T07-A15** · baixa · ◐ A divisória entre Ignição e Posição usa o token de borda, não o de divisória.
  - *Prova:* 00-tela.html:134 height 1px, background #2B2540 (--borda) · tokens.css:21 --divisoria #241F33 'entre linhas' · a folha-5 repete o #2B2540.
  - *Correção do verificador:* --divisoria está em tokens.css:20, não em :21. A :21 é --separador #2E2840 'separador curto'. O fato vale: a linha entre Ignição e Posição usa --borda, e não um dos dois tokens de linha.

</details>

#### T08 · Refazer leitura da CAN

- **T08-A1** · alta · ✔ Rotação 980 rpm e Consumo 24,8 L/h da 02-momento-concluida são números inventados; o mock dá 1.180 rpm e 9,4 L/h.
  - *Prova:* 02-momento-concluida.html:76 ('980' rpm) e :84 ('24,8' L/h) · grep '980\\|24,8\\|24.8' em 04-dados/mocks.js → vazio · mocks.js:933 ma-01: rotacao '1.180 rpm', consumo '9,4 L/h' · contrato.md:7 'Nenhum número inventado'
- **T08-A2** · alta · ✔ A T08 lê e mostra os cinco sinais dinâmicos e fecha em '12 de 12'. A T07, a HU-T07-3 e o mock dizem que esses cinco só fecham andando.
  - *Prova:* T08 textos.md:15: alternador 14,1 V, velocidade 38 km/h, ré acendeu, rotação 980, consumo 24,8 · 'Os doze sinais responderam.' · T07 textos.md:7: '7 de 12' e 'SEM ENERGIA · 5 SINAIS · FECHAM ANDANDO · Alternador · Velocidade · Ré · Rotação · Consumo' · dominio.md:293 …
- **T08-A3** · media · ✔ A HU-T08-3 manda devolver a T07 'com a leitura em branco'; a própria tela.md manda para a 'T07 com a leitura nova'.
  - *Prova:* tela.md:40 e dominio.md:301 'me devolve a T07 com a leitura em branco' · _fontes-v1/requisitos-v1.md:548 'devolve o técnico a T07 com a leitura em branco' × tela.md:16 '`Ver os dados da CAN` → T07 com a leitura nova' e 02-momento-concluida com os 12 preenchidos
- **T08-A4** · media · ✔ A lista de peças de tela.md, que se diz 'medida nas referências', traz 6 peças que não aparecem e omite a faixa com ENCERRAR que aparece nas 3.
  - *Prova:* tela.md:20-34 · ausentes nas 3 referências: faixa · sem ação, com legenda, a marca no login, campo, campo focado, cartões de foto · ENCERRAR presente em 00:31, 01:31, 02:31 · componentes.md:18 ('faixa · sessão aberta' sem T08) e :21 ('faixa · sem ação' com T08) · …
- **T08-A5** · media · ✔ A ordem da grade não é a ordem do mock: a referência põe Temperatura antes de Rotação, e nenhum documento declara a regra.
  - *Prova:* 00-tela.html:73 'Temperatura' (9º) e :77 'Rotação' (10º) · mocks.js:596 rotacao antes de :597 temperatura · a regra 'estático antes do dinâmico dentro do domínio' reproduz a ordem do PNG nos 6 domínios, mas não está escrita em logica.md, tela.md nem contrato.md
- **T08-A6** · media · ◐ animacao.md e ciclos.md pedem marcador e tambor na T08; nenhuma referência tem barra nem rolete.
  - *Prova:* animacao.md:8 'como na T07: marcador corre, tambor rola' · ciclos.md:63 'T06, T07 e T08, com o tambor' × 01-momento-relendo.html:44 e 02:44, hodômetro em texto: '184.320' 17px + ' km' 11px, sem barra no mostrador (folha-7 'mostrador · aceso')
  - *Correção do verificador:* Só a animacao.md:8 pede marcador e tambor na T08. A ciclos.md:63 fala do escopo do C7, que inclui a T07. O tambor é peça da T07 (componentes.md:86 'tambor · T07'), e 'com o tambor' não diz que ele roda na T08. A contradição mora numa linha só.
- **T08-A7** · media · ✔ A linha 1 da animacao.md (valores lidos viram traço) não tem quadro de começo: a 00-tela já está toda em traço.
  - *Prova:* animacao.md:7 e :10 ('Os quadros de começo e fim… são as referências desta pasta') × 00-tela.html:39-86 (12 mostradores apagados) · 00-tela.png: doze tracejados com '—'
- **T08-A8** · media · ✔ A HU-T08-4 tem dado no mock, mas o dado não pode ser alcançado no protótipo, e nenhuma referência o mostra.
  - *Prova:* mocks.js:47 e :98-101 (ma-03 sem mapa, com motivo) · ativos ma-03: a-21 (uo-03, M2C-0497) e a-23 (uo-03, sem módulo) · uo-03 = Pátio Caruaru, pac-uo-03 com diasAtras 8 (bloqueado > 7) · casos['modelo-sem-driver'].moduloSerial = M2C-0497 · gate-cobertura.js:35 só conta …
- **T08-A9** · media · ◐ A faixa da T08 não tem a linha de baixo que a folha e a T07 têm: a faixa muda entre T07 e T08, e ela devia ficar parada.
  - *Prova:* 00-tela.html:24 (sem border-bottom) × folha-2 'faixa · sessão aberta' (border-bottom 1px #2E2840) e T07 00-tela.html (idem) · PNG x=700: T07 tem #2E2840 em y 162–164, T08 não · movimento.md:16 e 07-decisoes/24 'a barra e a faixa ficam paradas'
  - *Correção do verificador:* A linha vai de y 162 a 163 no PNG, não de 162 a 164. E o defeito não é da T08: a linha de baixo da faixa aparece e some em sete telas, mudando até dentro da T09 e da T16. No caminho do herói ela também muda na passagem T06 → T07. O achado é sistêmico: a faixa da folha …
- **T08-A10** · media · ✔ A assertiva 4 da T16 depende de a leitura ter sido refeita na sessão, mas o estado único não guarda que a T08 rodou, e não há valor nem referência da assertiva aplicável.
  - *Prova:* mocks.js:266-268 ('#4 é CONDICIONAL: só existe quando a leitura da CAN foi refeita') e :288-289 · logica.md:11 etapas = pré-checagem, cadeia, calibração, ciclo, checklist · T16 textos.md:15 e :27 'Faixa de contadores · não se aplica'

<details><summary>5 de gravidade baixa</summary>

- **T08-A11** · baixa · ✔ A unidade dos mostradores tem 11px em caixa baixa, abaixo do piso de texto e fora do token de unidade.
  - *Prova:* 01-momento-relendo.html:44-56 e 02:44-84 (8 unidades: km, V, V, km/h, °C, rpm, %, L/h em 11/500) × leis.md:18 Lei 10 (12px; 10/11 só em caixa alta) e tokens.css:72 --n-unidade-p 12px 'junto de número até 34'
- **T08-A12** · baixa · ✔ O domínio ainda chama a ferramenta de 'Reset de leitura do ativo'; a tela, o menu e o mock já usam 'Refazer leitura (da CAN)'.
  - *Prova:* dominio.md:66, :70, :295 × tela.md:1 'Refazer leitura da CAN' · T04 textos.md:7 'Refazer leitura' · mocks.js:99-100 ('Reset de leitura virou Refazer leitura da CAN, R3')
- **T08-A13** · baixa · ✔ A semente 'sessão com leitura feita' não nomeia módulo e ativo e não tem campo no estado único.
  - *Prova:* logica.md:44 × logica.md:43 e :45 (T07 e T09 nomeiam M2C-0417 + RKT-8H42) · logica.md:11 etapas sem 'leitura da CAN' · as 3 referências mostram M2C-0417 · RKT-8H42
- **T08-A14** · baixa · ✔ A matriz de bloqueio do domínio não tem a trava da T08 (sem mapa de contadores declarado).
  - *Prova:* dominio.md:149-164 (§3.4, sem linha T08) × dominio.md:302 HU-T08-4 e mocks.js:47
- **T08-A15** · baixa · ✔ A folha 1 de componentes.md não bate com a folha-1 HTML: o primário, o primário desabilitado e o link que a T08 usa estão desenhados, mas não têm linha.
  - *Prova:* componentes.md:5-9 (folha 1 = só 'falha') × folha-1-fundamentos.html: 'primário · normal', 'primário · pressionado', 'primário · desabilitado', 'link · normal e pressionado', 'linha tocável' · 'falha' está desenhada na folha-4 HTML · total medido nas folhas: 120 …

</details>

#### T09 · Configurar módulo

- **T09-A1** · alta · ✔ A Lei 3 quebra em todos os quadros: os blocos mudam de altura e de lugar entre a 00, cada estado e o momento, inclusive na transição do fluxo 00 → 04
  - *Prova:* leis.md:11 e estados.md:13 ('Os blocos ficam onde estão'). Render dos 5 HTML: a linha do elo mede 86 / 70 / 68 / 68 / 72. O poço do Leitor fica em y 414,7 / 425 / 438 / 438 / 373,1 e o topo da cadeia em 156,7 / 215 / 234 / 234 / 157,1. De 00 → 04 a Conexão sobe 69,6px …
- **T09-A2** · alta · ✔ No 01, a linha dos pinos sai de baixo do título e vai pro pé, fora do conteúdo, colada na borda e no rodapé
  - *Prova:* 01-estado-bloco-recusado.html: o <span> 'ocupação de pinos confere' vem depois do </div> do conteúdo, como filho da raiz. Render [0,645,360,14]: x=0 e embaixo exatamente em 659, o topo do rodapé. PNG 01 · y 1290-1320 a 2×, ícone na borda esquerda. Contradiz HU-T09-2 …
- **T09-A3** · alta · ✔ tela.md manda `Calibrar` → T10 na cadeia concluída, mas nenhuma referência tem esse texto: a 04 só oferece `Voltar ao menu`
  - *Prova:* tela.md:18. textos.md:23 termina em `Voltar ao menu`. grep 'Calibrar' em todos os .md: só tela.md:18 (a T10 tem `Calibrar o horímetro`/`Calibrar a rotação`, outra coisa). fluxos.md:10 e logica.md:27 põem T09 → T10 direto
- **T09-A4** · media · ✔ A faixa não é a mesma nos 5 quadros: na 00 e na 04 ela encolhe e tem borda, no 01/02/03 tem 52 e não tem borda
  - *Prova:* grep 'height: 52px' nos 5 HTML: a 00 e a 04 têm border-bottom 1px #2E2840 e não têm flex-shrink:0, e o render mede 50,7 e 51,1. O 01/02/03 têm flex-shrink:0 e não têm borda. A folha 2 'faixa · sessão aberta' tem a borda. movimento.md:16: a faixa fica parada
- **T09-A5** · media · ✔ O motivo da recusa no mock não é o texto da referência
  - *Prova:* mocks.js:675 motivo 'O módulo não confirmou os pontos das áreas.' × 01 PNG e textos.md:11 'os pontos das áreas não voltaram'. Se lê o mock, fura o texto. Se lê o texto, o motivo fica sem leitor
- **T09-A6** · media · ✔ O mock diz que a string composta de versão nunca vai pra tela, mas a 04 mostra essa string como prova
  - *Prova:* mocks.js:656-658: 'a tela compõe a string posicional A12.G07.L02.E05.C03 … e grava em sessao.cadeia.versaoGravada — nunca em tela' × 04 PNG e textos.md:23 `A12.G07.L02.E05.C03` (T16 textos.md:15 também mostra)
- **T09-A7** · media · ✔ O 03 não é 'derivado do fluxo': todo dado dele é do caso queda-na-cadeia
  - *Prova:* estados.md:10 e logica.md:153 dizem 'derivado do fluxo'. O PNG 03 mostra M2C-0312 · PCX-9A17 · `3 de 6` · Leitor `pausado`, igual a M.casos["queda-na-cadeia"] (mocks.js:676). O herói (M2C-0417) nunca chega nesse quadro
- **T09-A8** · media · ✔ ENCERRAR durante a cadeia tem duas regras que se contradizem
  - *Prova:* logica.md:61: 'antes de homologar: a sessão abortada — 4 passos, sem confirmação' × HU-T09-9 (dominio.md:316) e tela.md:19: 'tentar sair no meio → a recuperação, até a Conexão gravar'. O ENCERRAR está nas 5 referências, inclusive na 00, que diz `A saída volta quando a …
- **T09-A9** · media · ✔ HU-T09-7 tem dado no mock sem nenhuma tela da T09 que leia
  - *Prova:* mocks.js:659-662 e 673: CADEIA.leituraFinal {redeDoModulo 'Mobs2 dados', servidor 'principal'}, 'os dois parâmetros críticos'. textos.md da T09 não tem 'Mobs2' nem 'principal'. Só a T13 (textos.md:23) mostra
- **T09-A10** · media · ◐ O escopo da limpeza do herói sai diferente no domínio e no mock, e a tela não declara nenhum dos dois
  - *Prova:* dominio.md:143: nova instalação → Limpeza total. mocks.js:654-655: módulo cadastrado no mesmo ativo → configuração. M.ativos a-01.moduloSerial = M2C-0417, então o herói é 'configuração', e a-02/a-03 também. As referências só dizem `apaga a configuração anterior`. …
  - *Correção do verificador:* O desacordo entre domínio e mock é real. Mas 'a tela não declara nenhum dos dois' exagera: `apaga a configuração anterior` é exatamente o `apaga` do escopo configuracao do mock. Faltam duas coisas: o texto do escopo total, que apagaria cercas e identificadores, e o …
- **T09-A11** · media · ✔ A T13 contradiz o que a T09 grava pro herói: a versão e as cercas não batem
  - *Prova:* T13 textos.md:23 (04-momento-d-configuracao-aberta, M2C-0417): `VERSÃO GRAVADA` `A12.G07` e `PONTOS DE CERCA` `sem cerca` × T09 textos.md:23 `A12.G07.L02.E05.C03`, e M.cercas.regioes com 4 regiões de a-01 (mocks.js:234-237)

<details><summary>4 de gravidade baixa</summary>

- **T09-A12** · baixa · ◐ componentes.md põe peças na folha errada: 'falha' na Folha 1 e 'ainda não'/'espera' na Folha 3, mas as três estão desenhadas na folha 4
  - *Prova:* componentes.md:9 e 41-42. Na folha-1 HTML, 'falha' é só a legenda da amostra --vermelho. A peça com 'traço vermelho embaixo' e as peças 'ainda não' e 'espera' estão na folha-4 (grep dos rótulos das peças)
  - *Correção do verificador:* Para 'falha', o achado vale: o mesmo tema do T01-A6. Para 'ainda não' e 'espera', a folha 3 não está errada, porque tem um glifo com esses nomes. O que está só na folha 4 são as peças com a regra de componentes.md:41-42 ('valor em traço', 'tracejado · a causa no lugar …
- **T09-A13** · baixa · ✔ A curva 'esmaece' da linha 4 do animacao.md não existe
  - *Prova:* animacao.md:10 põe 'esmaece' na coluna Curva. movimento.md:12 só tem --mov-curva ('desacelera'), e o resto é linear
- **T09-A14** · baixa · ✔ O 04 põe uma saída em lima, e R-02 diz que saída nunca é lima
  - *Prova:* leis.md:41 (R-02) × 04-momento html: `Voltar ao menu` no primário, color #AAEF00. A folha 2 'uma ação' faz o mesmo, então a Lei 1 (texto do primário é lima) e a R-02 se chocam
- **T09-A15** · baixa · ✔ O caso de recusa de Cercas cai num ônibus sem cercas no mock
  - *Prova:* M.cercas.regioes.filter(r=>r.ativoId=='a-02').length = 0 (node), e o 01 diz `os pontos das áreas não voltaram`. a-03 também tem 0 regiões e o Cercas G07 sai confirmado no 02

</details>

#### T10 · Calibração

- **T10-A1** · alta · ✔ Na 02, o segmentado desenha 2 segmentos para '1 de 3': o componente não reproduz o gabarito sem desobedecer a regra da peça
  - *Prova:* 02 html:41 é a mesma linha da 00, com 2 spans. Varredura em y=122 no PNG 02: x 16–179 e 181–344 (163px cada). A 03, com o mesmo '1 de 3', tem 3 segmentos de 108px. componentes.md:91: 'segmentado · um segmento por passo'. porModelo['ma-02'].calibraveis tem 3 itens …
- **T10-A2** · alta · ✔ A 02 e a 03 são o mesmo ativo × módulo (a-09 / M2C-0371) e abrem em grandezas diferentes com o mesmo '1 de 3': o mock só produz uma delas
  - *Prova:* Faixa M2C-0371 \| KNB-5H39 nas duas (02 html:27-29, 03 html:27-29). 02: título Rotação. 03: título Hodômetro, 'Depois: Rotação · Velocidade'. Ordem do cadastro: ['rotacao','velocidade','hodometro'] (mocks.js:716), então o hodômetro é o passo 3 de 3. E …
- **T10-A3** · alta · ✔ A 04 não nasce do caso 'grandeza-indisponivel' que estados.md, logica.md e casos.md apontam
  - *Prova:* estados.md:11, logica.md:156, casos.md:24 → grandeza-indisponivel. O caso é {modeloAtivoId:'ma-02', grandeza:'horímetro', motivo:'A leitura desta linha não fornece horímetro. Use o valor do painel na próxima revisão.'} (mocks.js:494-495): não tem ativo, não tem …
- **T10-A4** · alta · ✔ 'relido às 14:31' é número fora do mock e contradiz o relógio congelado em 14:30
  - *Prova:* textos.md:11 e 01 html:54. HORA_NOMINAL = '14:30' (node: M.HORA_NOMINAL). CLAUDE.md: 'O relógio do produto é 14:30, congelado'. contrato.md:8. A barra do sistema do mesmo quadro mostra 14:30 (01 html:17). grep '14:31' fora do HTML: só textos.md:11.
- **T10-A5** · alta · ✔ O mock diz que o herói já semeou o hodômetro hoje, e a 00 mostra que nunca semeou
  - *Prova:* mocks.js:763-765: ultimas 'a-01': { hodometro: 0 } com a legenda '0 = hoje; ausente = nunca'. mocks.js:330: i-01 (hoje, 11:47) com calibracao hodômetro 482.317 km e foto. A 03/04 usam ultimas para 'semeado há N dias' + 'Semear de novo'. A 00 mostra só 'diferença de …
- **T10-A6** · media · ✔ A regra do 'Depois:' tem duas versões: só a próxima grandeza (02) ou todas as que faltam (03)
  - *Prova:* 02: 'Depois: Velocidade', que omite o hodômetro, 3º passo (textos.md:15). 03: 'Depois: Rotação · Velocidade' (textos.md:19). A folha-5 segmentado mostra só a próxima ('Depois: Antena GPS posicionada e livre' em 1 de 5).
- **T10-A7** · media · ✔ Os estados 02, 03 e 04 movem blocos em relação à 00, contra 'os blocos ficam onde estão'
  - *Prova:* estados.md:13, leis.md:11 (Lei 3). Varredura x=20: a 00 tem alvo 294–440, foto 452–525, caixa 537–627. 02: foto some, alvo 294–551, caixa 563. 03: alvo 294–466, foto 478–551, caixa 563. 04: poço 182 (era 202), régua 254 (274), alvo 274–414, foto 426, caixa 511–627. …
- **T10-A8** · media · ✔ O tambor é o elemento-assinatura da T10, mas a peça 'tambor' é só da T07 e nenhuma referência da T10 desenha rodinha
  - *Prova:* tela.md:7 ('o tambor que rola'), leis.md:48 (R-09), animacao.md:7, 07-decisoes/10-tambor.md:5. componentes.md:86: 'tambor · hodômetro é rolete · T07'. A lista de tela.md:23-38 não traz tambor. A folha-5 desenha 6 células de 52px com dígitos de 34px e o último em lima. …
- **T10-A9** · media · ✔ 'Fotografar o painel' é um toque sem texto e sem tocável no gabarito, e a 01, que se alcança só por 'Semear', já mostra a foto tirada
  - *Prova:* tela.md:15 lista 'Fotografar o painel'. O texto não existe em textos.md:7-23. O cartão da foto é um div sem href (00 html:64). logica.md:96 diz que a 01 vem de 'Semear o hodômetro', mas a 01 mostra 'fotografada' (textos.md:11). Nenhuma referência mostra a foto tirada …
- **T10-A10** · media · ✔ O passo do horímetro (2 de 2) não tem referência nem texto, e três fontes discordam se o herói passa por ele
  - *Prova:* 01: primário 'Calibrar o horímetro' (textos.md:11); ma-01 tem 2 calibráveis (mocks.js:713). A T13 04-momento-d mostra 'HORÍMETRO · 9.640 · h' (T13 textos.md:23). logica.md:27: 'calibra o hodômetro → o ciclo dinâmico'. i-01 só tem hodômetro (mocks.js:330). T12 mostra …
- **T10-A11** · media · ◐ O check do 'confere' vive fora de poço, contra a Lei 4, e a variante não está desenhada na folha-8
  - *Prova:* 01 html:54: svg 15×15 lima, traço 2.2, direto no texto da régua. leis.md:12: 'Todo glifo de estado vive num poço, até dentro de cartão'. folha-8 só descreve 'vira confere depois' e não desenha.
  - *Correção do verificador:* O check sem poço é verdade, e a variante 'confere' não está desenhada na folha-8. Só que o conflito com a Lei 4 não é da T10. O design system já aprovou esse mesmo formato em 'a pré-condição dos pinos' (folha-5, T09) e em 'sinais liga-desliga' (T07). A decisão é de …

<details><summary>4 de gravidade baixa</summary>

- **T10-A12** · baixa · ✔ 'rpm' aparece junto de traço na 02, contra a regra declarada no mock
  - *Prova:* mocks.js:687: 'rpm é a unidade — só aparece junto de número'. 02 html:49 ('—' + 'rpm') e html:60 ('—' + 'rpm'); textos.md:15.
- **T10-A13** · baixa · ✔ A mesma caixa de uma linha (Horímetro · sem horímetro) sai com divisória na 02 e sem divisória na 03
  - *Prova:* 02 html:69 mantém border-bottom 1px #221D2E na única linha, e o PNG 02 mostra o traço sob 'Horímetro'. 03 html: a linha que sobrou é a segunda da 00, sem borda. A folha-8, a 00 e a 04 não põem divisória depois da última linha.
- **T10-A14** · baixa · ✔ casos.md chama 'ma-02' de caso, e o estados.md da 03 não diz de que ativo nem de que campo ela nasce
  - *Prova:* casos.md:30: '`ma-02` → T06/03 · T10/02'. node: Object.keys(M.casos) tem 33 chaves e nenhuma é 'ma-02', que é id de M.modelosAtivo. estados.md:10 dá à 03 o caso '`calibracao`', sem 'a-09' nem 'ultimas'.
- **T10-A15** · baixa · ✔ O número do valor em poço usa o tamanho do título de tela, não um token de número de instrumento
  - *Prova:* 00 html:49 e folha-8: 22px/-0.3px = --t-titulo-tela, 'um por tela' (tokens.css:63). Os números de instrumento são --n-cartao 26 / 34 / 40 / 48 / 62 (tokens.css:67-71). A tela já tem título de 28px (h1, 00 html:45).

</details>

#### T11 · Conferir configuração

- **T11-A1** · alta · ◐ O momento 02 mostra a faixa do herói (a-01) com o cadastro do a-16: 'tradução frota v2' é de ma-02, e o a-01 é ma-01, 'urbano v3'.
  - *Prova:* 02-momento-tudo-confere.html:41,44 (M2C-0417, RKT-8H42) e :66 ('tradução frota v2') · node: M.ativos a-01 → modeloAtivoId ma-01 → traducaoCan 'urbano v3'; ma-02 → 'frota v2' · ma-01.leitor.tipo 'cartao-serial', e a tela diz 'leitor sem fio'
  - *Correção do verificador:* O conteúdo está certo, as linhas não. As linhas são :27, :29 e :43. As citadas (:41, :44 e :66) não batem com o arquivo, que tem 77 linhas. Nuance: das cinco linhas do 02, só Ativo e Leitor contradizem o cadastro do a-01. Cercas '4 regiões' e Eventos 'intervalo 30 s' …
- **T11-A2** · alta · ◐ A semente M2C-0438 + ONK-8Q90 é da Garagem Ibura, mas o contexto do herói é Várzea. Nesse contexto a própria T06 trava esse ônibus como fora do pacote.
  - *Prova:* mocks.js:198 a-16 uoId 'uo-02' · M.contextoAtivo.uoId 'uo-01' · T06/textos.md:23 'FORA DO PACOTE DESTA UO · ONK-8Q90 · Pertence a Garagem Ibura.' · logica.md:47 não troca o contexto · mocks.js:635-637 já avisava: 'a-16 é Ibura, então o domínio pede troca de UO em T02'
  - *Correção do verificador:* O fato está certo, mas a pasta não ignora o problema. O mock já declara o custo (mocks.js:635-638): o a-16 é Ibura e pede troca de UO na T02. O pacote de Ibura está no prazo (4 dias, bloqueia em 7). O que falta é a semente da T11 (logica.md:47) montar o contexto …
- **T11-A3** · media · ✔ diff-divergente.noCadastro contradiz o cadastro do próprio mock para o a-16 em três blocos, e o gate não confere isso.
  - *Prova:* Eventos: mocks.js:501 noCadastro 'intervalo 30 s' / noModulo '60 s', mas ma-02.presetEventoId 'pe-rodoviario' tem intervaloRastreamentoSeg 60 (mocks.js:121) · Leitor: noCadastro 'leitor sem fio', mas ma-02.leitor.tipo é 'chave-de-contato' · Cercas: '4 regiões', mas …
- **T11-A4** · media · ✔ Reduzir movimento na T11 contradiz a regra geral: animacao.md manda aparecer tudo junto, e movimento.md manda o processo seguir em ordem.
  - *Prova:* animacao.md:7 'aparecem juntas' × movimento.md:47 'Os processos continuam andando no mesmo ritmo — a prova continua nascendo em ordem, só que sem movimento'
- **T11-A5** · media · ◐ No estado 01 a legenda muda de lugar: a nota entra entre a lista e a legenda e empurra a legenda 66px para baixo.
  - *Prova:* 00-tela.html:107 legenda em y 481,4 · 01-estado…html:106-109 nota de ≈54,2 + gap 12 → legenda em y 547,6 · PNG: centro da legenda em 979 (00) contra 1111 (01) a 2× · estados.md:11 'Os blocos ficam onde estão' · leis.md:11
  - *Correção do verificador:* A medida e o deslocamento de ≈66px estão certos. As linhas citadas não existem: a legenda está em 00-tela.html:66 (não :107) e a nota em 01…html:66-69 (não :106-109).
- **T11-A6** · media · ◐ No 02 o cabeçalho muda de desenho e empurra a lista 2px. A variante lima não existe em folha, e a regra da peça ('quantos não bateram') inverte o sentido do '5 de 5'.
  - *Prova:* 00: padding 10 12, poço 26, rótulo 10px ls 1.5 (00-tela.html:50-60) · 02: padding 12 14, sem poço, rótulo 11px ls 1.4 (02…html:50-51) · lista em y 195,4 → 197,4 (PNG 390 → 395) · componentes.md:67 'com contagem · quantos não bateram, à direita' · grep 'CONFERE COM O …
  - *Correção do verificador:* O conteúdo está certo. As linhas certas são 00-tela.html:35-37 e 02…html:35-36, não :50-60 e :50-51. No PNG a borda da lista vai de 390 para 394, não para 395: 395 é a segunda fileira da borda.
- **T11-A7** · media · ◐ A linha de conferência tem 50 de altura e leva poço de 26. A lei manda poço de 32 em linha de 50, e o erro está na própria folha.
  - *Prova:* leis.md:32 '50 leva 32' · 00-tela.html:66-67 height 50 com poço 26×26 · folha-4 html, 'linha de conferência': poço 26 · na mesma folha, a 'assertiva da sessão' (também 'dupla · 50') usa poço 32
  - *Correção do verificador:* O conteúdo está certo. As linhas certas são 00-tela.html:40-41, não :66-67. O poço 26 existe como token (tokens.css:103), mas a lei de medida manda 32 em linha de 50.
- **T11-A8** · media · ◐ A última linha (Conexão) tem 72px. As outras quatro e a peça da folha têm 50.
  - *Prova:* 00-tela.html:98 'height: 72px' contra :66/:74/:82/:90 'height: 50px' · o mesmo nas três referências (grep: 4×50 e 1×72) · componentes.md:56 'linha de conferência \| dupla · 50' · PNG 00: a linha de Conexão visivelmente mais alta (centro em 866 contra passo de 100)
  - *Correção do verificador:* O conteúdo está certo. As linhas certas são 00-tela.html:60 para os 72px e :40/:45/:50/:55 para os 50px, não :98 e :66/:74/:82/:90. Contexto: 72 é o token --linha-escolha, e a última linha maior também aparece na T05/01 (76 contra 72) e na T06/00 (78 contra 72). …
- **T11-A9** · media · ◐ A faixa que a T11 desenha (com ENCERRAR, sem traço de baixo) não é nenhuma peça da folha 2. componentes.md põe a T11 na 'faixa · sem ação' e a deixa fora da 'faixa · sessão aberta'.
  - *Prova:* 00-tela.html:37 sem border-bottom; :46 ENCERRAR · folha-2 'faixa · sessão aberta' tem 'border-bottom: 1px solid #2E2840' · a 'faixa · sem ação' da folha-2 não tem ENCERRAR · componentes.md:18 (lista sem T11) e :21 (lista com T11)
  - *Correção do verificador:* O conteúdo está certo. As linhas certas são 00-tela.html:24 e :31, não :37 e :46. A faixa da T11 é a 'sessão aberta' sem o traço de baixo.

<details><summary>5 de gravidade baixa</summary>

- **T11-A10** · baixa · ◐ O comentário do mock diz que a versão composta nunca vai para a tela, mas a T11/02 mostra a versão (e a T09 e a T16 também).
  - *Prova:* mocks.js:656-658 'compõe a string posicional A12.G07.L02.E05.C03 … grava em sessao.cadeia.versaoGravada — nunca em tela' × T11/textos.md:15 'A12.G07.L02.E05.C03' · T09/textos.md:23 · T16/textos.md:15
  - *Correção do verificador:* A leitura literal contradiz a tela, mas a intenção provável é outra. Pelo padrão de mocks.js:111, 'nunca em tela' deve querer dizer 'nunca cravada no código da tela'. O design mostra a versão de propósito, com peça própria na folha-7. O achado real é um comentário …
- **T11-A11** · baixa · ◐ A HU-T11-3 ainda pede 3 ações, mas a decisão 21 fixou o rodapé em duas. A documentação não seguiu a decisão.
  - *Prova:* dominio.md:337 e tela.md:49 'Escolho entre 3 ações' · 07-decisoes/21-so-registrar.md:5-9 'entra no lugar do Voltar ao menu … O rodapé continua com duas ações' · 00-tela.html:110-111 mostra duas ações
  - *Correção do verificador:* O conteúdo está certo, mas a linha do HTML é :69-70, não :110-111. A HU também está em historias.md:105. O desvio não é silencioso: a decisão 21 cita a HU como contexto. Falta só a HU (nos três arquivos) apontar para a decisão, ou dizer 'duas'.
- **T11-A12** · baixa · ◐ O caso diff-divergente está ligado a referências diferentes em cada fonte.
  - *Prova:* casos.md:20 'diff-divergente → T11/02-momento-tudo-confere' (só) · estados.md:7 e logica.md:47 ligam ao 00-tela · indice.json: T11/00-tela com caso '' e T11/02 com 'diff-divergente, invertido'
  - *Correção do verificador:* Exagera. casos.md e indice.json seguem a mesma convenção: nenhuma 00-tela tem caso nos dois arquivos, nas 16 telas. Por isso as duas fontes concordam entre si. O próprio estados.md liga o caso às duas referências (:7 e :9), não só ao 00. O desvio real é menor: o caso …
- **T11-A13** · baixa · ◐ A coluna 'Telas que usam' de componentes.md mistura as peças. A linha de conferência só existe na T11, a assertiva só na T12 e na T16, e a prova da cadeia aparece na T11 embora a lista diga só T09.
  - *Prova:* componentes.md:55-56 dizem T11 T12 T16 para as duas · grep 'width: 74px' em 02-telas → só T11 · poço 32 em linha de 50: T12/01 (7), T16/02 (7), T16/05 (7), T11 (0) · componentes.md:146 'prova da cadeia \| T09' × 02…html:117-121 com o mesmo desenho
  - *Correção do verificador:* O conteúdo está certo, mas as linhas da caixa são 02…html:66-70, não :117-121. A contagem esquece a T16/04 (3 linhas com poço 32). O problema é maior do que o descrito: a coluna 'Telas que usam' põe a T11 em peças que ela não desenha, como 'a marca no login', 'campo', …
- **T11-A14** · baixa · ◐ A 'com legenda' está listada para a T11, mas a legenda da T11 fica no conteúdo, e a peça da folha fica no rodapé a 12px do botão.
  - *Prova:* componentes.md:28 · folha-2 'com legenda': 12px/600, centrada, padding-bottom 6, dentro do rodapé · 00-tela.html:107: 12px/500, à esquerda, no conteúdo, ~160px acima do botão
  - *Correção do verificador:* O conteúdo está certo. A linha é 00-tela.html:66, não :107. A distância está errada: são ≈175px até o botão; os ≈160px são até o topo do rodapé.

</details>

#### T12 · Últimas instalações

- **T12-A1** · media · ✔ Das 23 peças da lista de tela.md, 15 não aparecem em nenhuma das 4 referências. A 'faixa · sessão aberta', que está em 3 delas, não está na lista.
  - *Prova:* tela.md:23-45 contra as referências. Ausentes: faixa · sem ação, linha de conferência, a lista de garagens, cadeia concluída, cadeia recusada, encerrando, pede o corte, sem homologar, com contador de falha, a marca no login, campo, campo focado, linha de opção, linha …
- **T12-A2** · media · ✔ A semente da T12 não tem sessão, e o mock nasce sem sessão. A 00, a 01 e a 03 desenham a sessão M2C-0417 + RKT-8H42 aberta.
  - *Prova:* logica.md:48 e tela.md:9 dizem 'garagem Várzea · cinco instalações', sem sessão (compare com logica.md:43 da T07, que diz 'sessão M2C-0417 + RKT-8H42'). mocks.js:1016 tem situacao.sessaoConfiguracao: null. Mas 00-tela.html:26-31 desenha LED #AAEF00, M2C-0417, RKT-8H42 …
- **T12-A3** · alta · ✔ O estado 02 (nenhuma instalação) não nasce de nenhum dado do mock: nenhuma garagem tem zero instalações.
  - *Prova:* node, M.instalacoes por ativos.uoId: uo-01 Várzea 5, uo-02 Ibura 5, uo-03 Caruaru 3. estados.md:9 e logica.md:158 apontam o caso `instalacoes`. contrato.md:3 manda o estado nascer 'de um caso ou de um dado'; casos.md:3 proíbe 'desenhando o estado na mão'.
- **T12-A4** · alta · ✔ Os rótulos de grupo não derivam de nenhuma regra, e os dois cortes desenhados contradizem o calendário: 17 dias está em ESTE MÊS e 27 dias está em MAIS DE UM MÊS.
  - *Prova:* Com o dia nominal 2026-03-12 (mocks.js:20): i-08 diasAtras 17 = 2026-02-23 (fevereiro) está em ESTE MÊS; i-10 diasAtras 27 = 2026-02-13, menos de um mês, está em MAIS DE UM MÊS (00-tela.html:65, 79, 86, 92). Um grep por 'este mês' e 'mais de um mês' em toda a pasta só …
- **T12-A5** · media · ◐ O detalhe diz 'Pré-checagem 12 de 12'. A T05, onde a pré-checagem acontece, conta 11 e desenha 13 linhas.
  - *Prova:* 01 textos.md:11 '12 de 12' ← mocks.js:321 preChecagem {checagens:12, passaram:12}. T05 textos.md:27 tem '11' · 'de 11' e 13 rótulos (Serial no cadastro … Rede do módulo). T05 tela.md:7 e logica.md:26 dizem 'as onze linhas'.
  - *Correção do verificador:* A divergência 12 × 11 existe. Mas a T05 não desenha 13 linhas: desenha as 11 checagens, que batem com o contador, mais uma tira com 2 leituras. O textos.md:27 tem 13 rótulos porque conta as 2 leituras da tira. Versão certa: a T12 diz 12 checagens, e a T05 conta e …
- **T12-A6** · media · ✔ O detalhe diz 'Checklist 10 de 10', e o checklist do produto tem 31 itens.
  - *Prova:* 01 textos.md:11 '10 de 10' ← mocks.js:332 checklist {itens:10, concluidos:10}. node: M.checklist.itens.length = 31 (A4 B5 C4 D10 E5 F3). T13 tela.md:9 diz '31 itens'.
- **T12-A7** · media · ✔ O mock diz que a T12 não lê as etapas e criou os três critérios pra ela. A referência do detalhe faz o contrário: lê as etapas e não mostra nenhum critério.
  - *Prova:* mocks.js:316-320: 'preChecagem FICA DECLARADO, sem leitor… blocos 6/6, checklist 10/10 e autoteste 8/8, que T12 declara sem leitor desde o C22… Consumidor: a tela web do gestor.' mocks.js:376-403 cria CRITERIOS_REGRA pra T12 (posicionamento, eventos, viagens). O 01 …
- **T12-A8** · media · ✔ RVM-1E54 (i-06) aparece como 'falha reconhecida' há 9 dias, e o mock a mantém em re-checagem. A re-checagem dura 24 h.
  - *Prova:* mocks.js:446 SECAO_F {emRecheck:true, instalacaoId:'i-06'}; i-06 diasAtras 9. dominio.md:177-180: aguardando até 24 h, reprovada com as 24 h esgotadas. HU-T12-6 fala em re-checagem por 24 h. logica.md:168: a T15/04 mostra a mesma RVM-1E54 'em re-checagem'.
- **T12-A9** · media · ✔ A fila diz que a evidência e o checklist do herói foram recebidos às 09:14/09:15, antes da cadeia de i-01 começar (10:02). O detalhe mostra 'Recebimento confirmado 11:47'.
  - *Prova:* mocks.js:432-433: f-05 a-01 'Evidências da instalação' confirmadoAs 09:14 e f-06 a-01 'Checklist de homologação' 09:15. i-01.etapas.cadeia vai de 10:02 a 10:26, recebimento.hora 11:47. 01 textos.md:11 'confirmado 11:47'.
- **T12-A10** · media · ◐ O menu da T04 desenha 'Últimas instalações' sem conexão em todas as referências. O mock nasce com rede, e a T12/00 é online com a mesma sessão.
  - *Prova:* T04 textos.md:7, 11, 15, 19, 23: 'Últimas instalações' · 'sem conexão' ou 'espera conexão'. T04/00-tela.html: o card é <a> tracejado #131019 ('espera a rede', componentes.md:64). mocks.js:1016: rede 'conectada'. Pelo desenho da T04, tocar no card abriria a T12 sem …
  - *Correção do verificador:* 'Em todas as referências' exagera. O card aparece em 5 das 10 referências da T04 (00 a 04) e está sem rede em todas as 5. Nas outras 5 ele não é desenhado. O conflito com o mock e com a T12/00 continua de pé.

<details><summary>3 de gravidade baixa</summary>

- **T12-A11** · baixa · ✔ 'aguardando validação' tem dois sentidos: no domínio é Seção F não avaliada, no mock é espera pelo gestor.
  - *Prova:* dominio.md:177: 'finalizada sem rede, Seção F não avaliada · até 24 h'. mocks.js:380-381: 'aguardando → os três chegaram; o que falta em aguardando é o gestor, não o dado'. i-09 fica aguardando há 22 dias, e i-03 há 2.
- **T12-A12** · baixa · ◐ casos.md lista `i-01` como caso, mas i-01 não é chave de M.casos: é id de M.instalacoes.
  - *Prova:* casos.md:25 '\| `i-01` \| `T12/01-momento-detalhe-da-instalacao` \|'. node: 'i-01' in M.casos → false. Um script cruzando casos.md × M.casos acha no md, e não no mock: i-01, ma-02, pac-uo-02, pac-uo-03.
  - *Correção do verificador:* O fato é verdadeiro. Mas casos.md:41 já declara que a tabela mistura casos e dados do mock, com ma-02 de exemplo, e o i-01 segue o mesmo padrão. Então o achado é só de nomenclatura: a coluna 'Caso' tem ids de dado, e o texto da linha 41 fala em estados, enquanto o …
- **T12-A13** · baixa · ✔ O mock diz que o offline da T12 se alcança pelo 'Atualizar'. Nenhuma referência da T12 tem esse controle.
  - *Prova:* mocks.js:453-456: 'O offline se alcança por AÇÃO (o primeiro `Atualizar` não acha rede)'. textos.md das 4 referências: nenhum 'Atualizar'. tela.md:13-17 lista só: tocar numa instalação, Voltar às instalações, Voltar ao menu.

</details>

#### T13 · Checklist

- **T13-A1** · alta · ◐ O estado 09 não nasce do caso declarado: can-fora-esperado é velocidade 0 km/h em a-02, e o PNG mostra a bateria do herói em 10,2 V
  - *Prova:* estados.md:16 e logica.md:160 → caso can-fora-esperado; node: M.casos['can-fora-esperado'] = {ativoId:'a-02', sinal:'velocidade', lido:'0 km/h'} (mocks.js:490); 09-estado-item-reprovado.html:27,44 mostra M2C-0417 e 10,2. Com o mesmo caso, T14/textos.md:19 mostra …
  - *Correção do verificador:* Trocar 'mocks.js:633–634' por 'mocks.js:578–579' (repetido em 929–932). O resto da prova vale.
- **T13-A2** · alta · ✔ O estado 10 não nasce do caso declarado: secaoF é a-06 em re-checagem (da T15). O caso feito para Finalizar + ciência é pronto-para-fechar (a-09), que não aparece em nenhum documento
  - *Prova:* estados.md:17 → secaoF; node: M.secaoF = {emRecheck:true, ativoId:'a-06', instalacaoId:'i-06'}; mocks.js:880–899 cria CASOS['pronto-para-fechar'] = {ativoId:'a-09', moduloSerial:'M2C-0371', recebimento:'sem resposta'}, 'A secaoF e a i-06 ficam INTACTAS' e 'O herói …
- **T13-A3** · alta · ◐ O firmware do herói é inventado: v4.2.1 na tela, 2.3.5 no mock e na T05
  - *Prova:* 01-momento-a-identificacao-aberta.html:56 'v4.2.1'; mocks.js:162 { serial: 'M2C-0417', …, firmware: '2.3.5' } /* herói */; grep 4.2.1 mocks.js → nada; T05/textos.md 'Firmware · 2.3.5' ×5. A folha 7 repete v4.2.1 (folha-7 html:54)
  - *Correção do verificador:* Trocar 'folha-7 html:54' por 'folha-7 html:31 e 87'. O '×5' conta `Firmware` · `2.3.5` de vários módulos. O herói aparece com 2.3.5 em 4 referências da T05.
- **T13-A4** · alta · ✔ 'Pontos de cerca: sem cerca' contradiz o mock e a T09 da mesma sessão
  - *Prova:* 04-momento-d-configuracao-aberta.html:83 'sem cerca'; node M.cercas.regioes → rg-01..rg-04 com ativoId 'a-01' (mocks.js:234–237); T09/textos.md:23 (04-momento-cadeia-concluida, M2C-0417) 'Cercas · G07'
- **T13-A5** · alta · ✔ Números sem fonte no mock: −71 dBm, entradas 4 de 4, 12 subiram, 12 evidências, 14:52, 10,2 V. O próprio mock diz que item que precisa de número novo é item inventado
  - *Prova:* grep em mocks.js: nada de '71' além de seriais, nada de 14:52, 10,2, dBm, entradas com contagem; mocks.js:776–778 'nenhum valor lido é declarado… Item que precisasse de número novo seria item inventado'; 03:77,81; 06:91; 11:41; 09:44
- **T13-A6** · alta · ◐ B diz 0 de 5 com o Painel já marcado. Isso erra toda a aritmética da tela (21 de 31, Faltam 10, 68%)
  - *Prova:* 02-momento-b-montagem-aberta.html: Painel com check lima e 'B · Montagem 0 de 5'; mocks.js:833–839 b-painel-legivel herda:'calibracao' ('é por isso que T13 NÃO pede a foto de novo'); a-01 tem calibração (mocks.js:330 foto:true; 751 painel a-01); o 5º segmento feito em …
  - *Correção do verificador:* Trocar '07:46' por '07:41'. A aritmética certa, contando o Painel: 22/31, 71%, Faltam 9.
- **T13-A7** · alta · ◐ O estado 10 remonta a tela: embaixo do véu não existe a tela-base, só o fundo
  - *Prova:* 10-estado-finalizar-com-a-secao-f-falhando.html:33 o véu é o próprio conteúdo, sem título, placar, lista nem rodapé; estados.md:20 'Os blocos ficam onde estão'; leis.md:11 Lei 3; movimento.md:23 o diálogo vem 'por cima da tela'
  - *Correção do verificador:* Não é uma remontagem só da T13. É a convenção das 4 referências de diálogo (T01/09, T04/06, T04/09, T13/10), que omitem a tela-base. O que falta é uma regra escrita de que o diálogo cobre a tela-base, que continua montada.
- **T13-A8** · media · ✔ A versão gravada do herói aparece truncada (A12.G07), que é a versão de outra sessão
  - *Prova:* 04-momento-d-configuracao-aberta.html:104 'A12.G07'; mocks.js:532 sessao-interrompida versaoGravada 'A12.G07' (3 blocos); T09/textos.md:23 e folha-7 'prova da cadeia' 'A12.G07.L02.E05.C03' para o herói
- **T13-A9** · media · ✔ F aparece aprovada (3 de 3) com o ID na plataforma 'na fila', e o checklist 'subiu' 31 de 31 com a tela em 21 de 31
  - *Prova:* 00-tela.html:97–104 F com check e 3 de 3; 06 'ID NA PLATAFORMA · na fila', 'CHECKLIST · 31 de 31'; mocks.js:294 plataforma valor 'na fila', 'confirma quando a evidência subir'; dominio.md §4.1 Aprovada = 'tudo passou, incluindo Seção F'
- **T13-A10** · media · ✔ A faixa não fica parada entre as referências: comprimida em 04/05 e sem traço em 09
  - *Prova:* PNG coluna x=4: traço #2E2840 em y 162 em 00–03, 06–08, 10, 11, e em y 156 em 04 e 05; 09 não tem traço (164 direto); HTML linha 24 das 12 sem flex-shrink:0, exceto a 09, que tem mas perdeu o border-bottom; movimento.md:16 'ficam paradas'; tokens --faixa-sessao 52px
- **T13-A11** · media · ◐ A 09 põe a bateria como 2º item de C, e no mock ela é o 1º
  - *Prova:* 09-estado-item-reprovado.html:37 '2 de 4' e 2º segmento vermelho (09:41); node M.checklist.itens: c-alimentacao índice 9 (1º de C), c-gps 10
  - *Correção do verificador:* Trocar '09:41' por '09:39'. A 41 é o h1.
- **T13-A12** · media · ✔ O checklist tem 31 itens na T13 e 10 nas instalações que T12 e o gate leem
  - *Prova:* node M.checklist.itens.length = 31; mocks.js:332 i-01.etapas.checklist {itens:10, concluidos:10}; resumo 'checklist: 10/10' nas 13 instalações (mocks.js:338–373); gate-cobertura.js:80 confere só o 10/10
- **T13-A13** · media · ✔ O gatilho do homologado está escrito de três jeitos
  - *Prova:* tela.md:18 'Finalizar instalação → homologado'; animacao.md:9 'o último item passa → o placar completa e o veredito aparece'; estados.md:18 'tudo passa'. A 11 já traz 'Encerrar sessão', então é depois de finalizar
- **T13-A14** · media · ✔ A HU-T13-5 exige A, C, D e os manuais; o mock faz E bloquear e a tela conta E em 'Faltam 10'
  - *Prova:* tela.md:69 HU-T13-5; mocks.js:807 E bloqueia:true; 00 'Faltam 10 itens' = B5 + E5; requisitos-v1.md 'Finalizar exige 100% dos automáticos das seções A, C e D… e 100% dos manuais'
- **T13-A15** · media · ✔ A lista de peças de tela.md está contaminada: 18 das 38 não aparecem em nenhuma referência da T13
  - *Prova:* tela.md:24–61; ausentes: faixa · sem ação, processo correndo, diálogo, diálogo sem saída, linha do histórico, a lista de garagens, leitura pequena, leitura com mínimo, cadeia concluída, cadeia recusada, encerrando, pede o corte, sem homologar, com contador de falha, a …
- **T13-A16** · media · ◐ A 'linha de seção do mapa' da folha fica dentro de um cartão; na 00 as linhas estão soltas
  - *Prova:* folha-7 html:28 cartão #1A1726 padding 0 12 em volta da linha; 00-tela.html:56 contêiner sem fundo nem borda, linhas de 328 de largura
  - *Correção do verificador:* Trocar 'folha-7 html:28' por 'folha-7 html:16'. A 28 é um </div>.

<details><summary>7 de gravidade baixa</summary>

- **T13-A17** · baixa · ✔ A mesma seção tem dois nomes, e os longos não estão no mock
  - *Prova:* 07:38 'B · INSTALAÇÃO FÍSICA' × 00 'B · Montagem'; 09:36 'C · SAÚDE DO HARDWARE' × 'C · Hardware'; mocks.js:803–805 secoes.rotulo 'Montagem', 'Hardware'; os longos vêm de _fontes-v1/requisitos-v1.md:911,921
- **T13-A18** · baixa · ◐ Os três itens de F no mock não são os três critérios do servidor que a falha reconhecida registra
  - *Prova:* mocks.js:856–858 F = Evidências, Checklist, ID na plataforma; mocks.js criteriosRegra = posicionamento, eventos, viagens; requisitos-v1.md 'quais dos três critérios falharam'
  - *Correção do verificador:* Trocar 'mocks.js:856–858' por '857–859'. A 856 está vazia.
- **T13-A19** · baixa · ✔ A legenda do rodapé fica a 6px do botão; a peça 'com legenda' diz 12
  - *Prova:* 00-tela.html:109 sem padding-bottom, gap 6; folha-2 html:101 padding-bottom 6 + gap 6; componentes.md:28 'a 12px do botão'
- **T13-A20** · baixa · ◐ A unidade junto do número está em 10px; o token manda 12. O valor de 18px usa um tamanho que só existe como token de unidade
  - *Prova:* 03:70 'V' font-size 10px; tokens.css:72 --n-unidade-p 12px 'junto de número até 34'; tokens.css:73 18px = --n-unidade-g
  - *Correção do verificador:* Trocar '03:70' por '03:67'. A 70 abre o cartão do GPS.
- **T13-A21** · baixa · ◐ O comentário do mock põe o ID na plataforma na Seção D; o dado o põe na F
  - *Prova:* mocks.js:269 '#8 NÃO BLOQUEIA… É o que o C21 (T13, Seção D) consome'; mocks.js:858 f-plataforma secao 'F'
  - *Correção do verificador:* Trocar 'mocks.js:858' por '859'. A 858 é f-checklist.
- **T13-A22** · baixa · ◐ O GPS do cartão com barra não sai de escala nenhuma e diverge da T07 para o mesmo 9 sat
  - *Prova:* 03:82 faixa 37,5%, marcador 56,3%. Para 4→37,5% e 9→56,3% a escala seria de −6 a 20,7. T07/00-tela.html:106,110 faixa 33%, marcador 75% (escala 0–12)
  - *Correção do verificador:* Trocar '03:82' por '03:73'.
- **T13-A23** · baixa · ◐ O diálogo da T13 fica a 16 da borda; o da T04 e o da folha, a 20
  - *Prova:* 10:33 padding 0 16px; T04/06 html:34 padding 0 20px; folha-2 html:372 padding 20px
  - *Correção do verificador:* Citar folha-2 html:136/142. A divergência é 16 (T01/09, T13/10) × 20 (T04/06, T04/09, folha 2), não uma exceção só da T13.

</details>

#### T14 · Ciclo dinâmico

- **T14-A1** · alta · ✔ O momento 05 mostra o evento chegando aos 0:48 (14:30:48, barra 60%), mas o mock e o 08-produto-real dizem 24s
  - *Prova:* 05-momento-ciclo-concluido.html:45 '0:48', :48 'width: 60%', :64 '14:30:48' × mocks.js:919 'evento: { recebidoAosSeg: 24, conferidoAosSeg: 33 }' × 08-produto-real/o-que-o-prototipo-simula.md:11 'o evento de teste chega aos 24s do prazo'. Com 48, o conferidoAosSeg 33 …
- **T14-A2** · alta · ✔ '6 de 6' campos conferidos não tem dado no mock
  - *Prova:* 05.html:67 '6 de 6'. node: M.ciclo = {prazoEventoSeg, evento{recebidoAosSeg, conferidoAosSeg}, mensagensGuardadas, viagem}. grep 'campos\|6 de 6' em mocks.js não acha nenhum campo.
- **T14-A3** · alta · ✔ O estado 02, citado pela própria decisão 05 como o exemplo de 'nada se remonta', move os blocos 41px
  - *Prova:* 07-decisoes/05-nada-se-remonta.md:9 'o prazo estourado da T14 é o exemplo'. Scan PNG x=50: evento 285→326 e passos 394→435 da 00 para a 02, porque as duas frases entram no cronômetro (02.html:57). O 02 ainda tira o margin-bottom do cartão de passos (02.html:69) e faz …
- **T14-A4** · alta · ◐ tela.md diz que as 22 peças da lista foram 'medidas nas referências', mas 12 não aparecem em nenhuma das 6 referências da T14
  - *Prova:* tela.md:24 ('Medido nas referências: toda peça abaixo está desenhada') × 00–05: não há cadeia, segmentado, encerramento de 8 passos, marca do login, campo, faixa sem ação, processo correndo nem contador de falha. As 12 são a coluna 'Telas que usam' de …
  - *Correção do verificador:* A contagem está certa: 12 das 22 peças não aparecem em nenhuma das 6 referências. Mas a citação foi cortada. tela.md:24 diz 'toda peça abaixo está desenhada nas folhas de 03-design-system/', e isso vale para as 22 (todas estão em componentes.md). O que falha é o …
- **T14-A5** · media · ✔ '00-tela · a entrada da tela' contradiz a semente e o fluxo: a semente é o quadro 01 (fila drenando), e o 00 já tem o evento disparado e o prazo em 1:36
  - *Prova:* estados.md:7 e tela.md:9 (semente 'fila com 6 mensagens e 2 de diagnóstico' = 01.html:57) × tela.md:15-16 ('a fila drena → Disparar acende; disparado → o prazo começa') × 00.html:42 FILA DRENADA, :45 1:36, :61 disparado 14:30. Entrar direto no 00 exigiria o prazo já …
- **T14-A6** · media · ◐ O bloco do evento põe glifos de estado fora do poço, contra a Lei 4, na folha e nas 6 referências
  - *Prova:* leis.md:12 'Todo glifo de estado vive num poço, até dentro de cartão' × folha-7 html:156,159 e 00.html:64,67 (relógio 16px solto) e 01.html:61 / 02.html:66 (traço 10×1 solto). A mesma folha 7 põe o mesmo relógio num poço de 30 na 'linha da re-checagem'.
  - *Correção do verificador:* São 5 referências, não 6. A 00, a 01, a 03 e a 04 têm o relógio de 16 solto nas linhas 64 e 67. A 01 e a 02 têm o traço 10×1 solto (01.html:61, 02.html:66). A 05 não tem glifo no bloco: só texto (14:30, 14:30:48, 6 de 6).
- **T14-A7** · media · ✔ O rótulo do cartão no PNG é 'Cartão do motorista'; no mock é 'Cartão do motorista 041'
  - *Prova:* 04.html:93 × mocks.js:247 { id: 'id-01', rotulo: 'Cartão do motorista 041', codigoEsperado: '0009412857' }
- **T14-A8** · media · ✔ A causa do 03 ('devia passar de zero') não é o esperado do caso, e o mock não liga o sinal velocidade ao passo 'Movimento detectado'
  - *Prova:* 03.html:77 'velocidade 0 km/h · devia passar de zero' × mocks.js:490-491 esperado 'maior que zero com o motor ligado' × ma-01 sinal velocidade esperado 'acima de 0 km/h'. PASSOS_CICLO (mocks.js:799) são strings sem id de sinal.
- **T14-A9** · media · ✔ O herói e o a-03 são o mesmo modelo, com o mesmo leitor de cartão, mas um tem 5 passos e o outro 6; o mock não diz quando o teste do identificador vira passo
  - *Prova:* node: a-01 e a-03 com modeloAtivoId ma-01; ma-01.leitor.tipo 'cartao-serial'. 00/01/05 'de 5 passos' × 04.html:37 'de 6 passos'.
- **T14-A10** · media · ✔ 'A Seção F reprova.' não tem item da Seção F no mock que dependa do evento de teste
  - *Prova:* 02.html:57 × node M.checklist.itens seção F: f-evidencias, f-checklist e f-plataforma, todos com origem 'fila'. Nenhum item consome M.ciclo.evento.
- **T14-A11** · media · ✔ A linha de passo reprovado não segue a peça 'reprovada, com causa' nem a lei 'Poço na linha'
  - *Prova:* 03.html:75 padding 8 → linha de 50 com poço 24 (leis.md:32: '50 leva 32'). 04.html:91 padding 4 → ~41px, altura sem token. Folha 4 'reprovada, com causa': padding 6, gap 12, lh 1.35 e valor à direita. Divisórias medidas no 03: 434→484.
- **T14-A12** · media · ◐ A faixa · sessão aberta não tem flex-shrink:0 e encolhe para 51px no 01, embora a faixa deva ficar parada
  - *Prova:* 00.html:24 (sem flex-shrink) × :16 (a barra tem). A folha 2 'faixa · sem sessão' tem flex-shrink:0 e a 'sessão aberta' não. Scan PNG: divisória em 80–81 no 01 contra 81–82 na 00; LED 1px acima no 01 e meio px no 04. movimento.md:16: a faixa fica parada.
  - *Correção do verificador:* O deslocamento na 04 é de 1px (2px no PNG), igual ao do 01, e não meio px. No PNG, o LED e o ENCERRAR sobem 1px na 01 e na 04. A divisória só sobe na 01. É o mesmo tema do achado mecânico M10 (T14/01 com 51,3) e de T07-V1 e T09-A4.

<details><summary>3 de gravidade baixa</summary>

- **T14-A13** · baixa · ✔ O relógio da T14 não é o glifo 'relógio' da folha 3: o traço e a cor são outros
  - *Prova:* 00.html:64 stroke #6E6683, path 'M12 7.5V12l3 1.8' × folha-3 'relógio · em andamento' stroke #A9A2BC, path 'M12 7.5v5l3 2'
- **T14-A14** · baixa · ✔ Existe uma linha de 40px aprovada em 'passos com o prazo estourado', fora das alturas de linha dos tokens
  - *Prova:* 02.html:86 e folha-4 'passos com o prazo estourado' 'height: 40px' × tokens.css:82-85 (38/44/50/72)
- **T14-A15** · baixa · ◐ componentes.md atribui 'reprovada, com causa' só à T05, mas a T14 a usa no 03 e no 04
  - *Prova:* componentes.md:49 'reprovada, com causa … T05' × 03.html:75-77, 04.html:91-93
  - *Correção do verificador:* componentes.md:49 lista mesmo só a T05. Mas a T14 não usa a peça como ela está desenhada: o próprio A11 mostra outro gap, outro padding e nenhum valor à direita. O que a 03 e a 04 desenham é um 'passo do ciclo' reprovado, com a anatomia da peça (X no poço, causa …

</details>

#### T15 · Fila de saída

- **T15-A1** · alta · ◐ A 01-estado-sem-erro não sai do mock: só 62, 8,4 e o contador 5 conferem
  - *Prova:* node: f-04 (enviando, 62, 8.4) tem ativoId a-09 = KNB-5H39, mas o PNG diz 'Evidências · RKT-8H42'. PCX-9A17 na fila é f-01 'Evidências da instalação' 14:28 (há 2 min), mas o PNG diz 'Checklist · há 4 min'. As recebidas do RKT-8H42 são f-05 Evidências 09:14 e f-06 …
  - *Correção do verificador:* O 'só' exagera. Também conferem com o mock: o tipo 'Evidências' do item que sobe (f-04), 'PCX-9A17 · na fila' (f-01), 'RKT-8H42 · recebida' duas vezes (f-05/f-06) e o tipo 'Evidências' da linha 2 (f-05). Divergem a placa do item que sobe, o tipo e a idade da linha do …
- **T15-A2** · alta · ✔ A 00-tela lista só itens de Ibura sob uma sessão e um contexto de Várzea
  - *Prova:* f-10 é a-14 (uo-02), f-02 e f-08 são a-12 (uo-02); '3 nesta garagem' é o total de uo-02. A faixa mostra RKT-8H42 (a-01, uo-01), M.contextoAtivo.uoId é 'uo-01' e T04/textos.md:7 diz 'GARAGEM VÁRZEA'. Filtrando por uo-01 saem 5 itens e 0 erros, que é o quadro da 01. A …
- **T15-A3** · alta · ✔ '4 nesta garagem' da 02 cruza garagens
  - *Prova:* f-09 KWX-2T36 é a-19, uo-03 (Pátio Caruaru); f-10, f-02 e f-08 são de uo-02. Contagem por garagem no mock: uo-01 5 · uo-02 3 · uo-03 2. Nenhuma tem 4.
- **T15-A4** · alta · ✔ 03/04: '0 nesta garagem' e 'subiu às 14:02' não existem no mock, e o contador se contradiz
  - *Prova:* Nenhuma uo tem 0 itens. O último confirmadoAs do mock é f-06 09:15, e '14:02' não aparece em mocks.js. Na 00 o contador inclui a recebida (2 pendentes + f-08 = 3); na 03 dá 0 com uma recebida às 14:02 na mesma frase (textos.md:19).
- **T15-A5** · alta · ◐ 'confere em 24 h' contradiz a instalação de 9 dias atrás e a máquina de estado
  - *Prova:* M.secaoF.instalacaoId i-06: diasAtras 9, 2026-03-03 13:58, estado 'falha-recebimento-reconhecida'. dominio.md §4.1 (linhas 172-181): 'Reprovada · 24 h esgotadas'. T12/textos.md:7 mostra 'RVM-1E54 · M2C-0362 · há 9 dias · falha reconhecida'. O 24 não é campo do mock …
  - *Correção do verificador:* A contradição com os 9 dias se sustenta. O 24, porém, não é número inventado: é a janela de re-checagem do domínio (dominio.md:177-180, HU-T12-6 em historias.md:118). O que falta é um campo no mock para prazo ou restante, e uma regra para 'confere em' sobre uma …
- **T15-A6** · alta · ◐ Os estados da T15 não têm receita: três quadros diferentes apontam para o mesmo `filaSaida`
  - *Prova:* estados.md:8-10 e logica.md:165-167 dão `filaSaida` para 01, 02 e 03; nenhuma dessas chaves está em M.casos (33 chaves). casos.md:41 manda o estados.md dizer de onde vem cada estado sem caso, e o da T15 não diz. palco.md:35 exige 'o próprio app, montado pelo caso do …
  - *Correção do verificador:* O estados.md diz de onde vem: `filaSaida`, como T12/02 aponta para `instalacoes`. Falta a receita, que diria qual recorte do array monta cada quadro. Nenhum recorte por garagem dá a 01 com os valores dela (A1), e nenhum dá a 03 vazia, porque toda uo tem pelo menos 2 …
- **T15-A7** · alta · ✔ O cartão de erro muda de desenho entre 00 e 02 (Lei 3), e o botão da 02 fica abaixo do alvo de 48
  - *Prova:* 00-tela.html:40-46: padding 20, gap 18, título 22px, causa 15px, botão 52/16px. 02-estado-dois-erros.html:41-48: padding 18, gap 16, título 17px, causa 13px, botão 46/15px. No PNG da 02 o botão vai de y 297 a 343 (46). tokens.css:87 --alvo-min 48. A folha 6 (html:78) …
- **T15-A8** · media · ✔ A barra de envio da 01 enche, mas o placar da homologação é declarado 'a única barra que enche'
  - *Prova:* componentes.md:98 'placar da homologação \| a única barra que enche \| T13'; leis.md:13 (Lei 5: 'O placar do checklist é a exceção declarada'). 01.html:48-54 desenha uma barra de 62% com --lima-faixa, que tokens.css:45 define como 'a faixa esperada da barra', e não há …
- **T15-A9** · media · ✔ 'ontem 10:05' contradiz f-08.diasAtras 2
  - *Prova:* node: f-08 data 2026-03-10, confirmadoAs 10:05. No projeto, 'ontem' = diasAtras 1: T04/textos.md:39 'carregado ontem, 07:10' = pac-uo-01 diasAtras 1. O erro se repete em 00, 02 e na folha-7 html:161.
- **T15-A10** · media · ✔ A linha da fila põe poço de 30 em linha de 50, 62 e 54; a lei manda 32 em 50
  - *Prova:* leis.md:32 '50 leva 32'. Varredura dos 105 HTML: T15 é a única tela com 50/30 (4×), 62/30 (3×) e 54/30 (1×). T12 e T16 usam 50/32 (24×).
- **T15-A11** · media · ✔ O contador da T15 e o do menu contam coisas diferentes, contra a HU-T15-2
  - *Prova:* T04/textos.md:7 mostra '2 · Fila de saída' (pendentes de Várzea: f-01 e f-04). T15 00 mostra '3 nesta garagem' (conta a recebida). T04/textos.md:31 diz '3 itens continuam na fila' com a semente 'fila com 2 itens' (T04/tela.md:9).
- **T15-A13** · media · ✔ A lista de peças da tela.md está contaminada: 15 das 26 não aparecem em nenhuma referência
  - *Prova:* `diff` entre as linhas com T15 de componentes.md e a lista de tela.md:22-47 dá IGUAIS (26 = 26). Só 11 aparecem nas 5 referências. As outras são de login, cadeia, encerramento e garagem (lista em pecas_listadas_ausentes).

<details><summary>4 de gravidade baixa</summary>

- **T15-A12** · baixa · ✔ 'dois itens recusados' descreve errado a 02: só um é recusa, o outro é falta de rede
  - *Prova:* estados.md:9, logica.md:166 e indice.json ('como': 'dois itens recusados'). O PNG da 02 mostra 'o servidor recusou' e 'sem rede · 3 tentativas'. dominio.md §4.4 separa recusa (manual) de falha de rede (automático).
- **T15-A14** · baixa · ✔ O % ao lado do número de 40px tem 17px, e a escala só dá unidade de 12 ou 18
  - *Prova:* 01.html:45 '% font-size 17px'. tokens.css:72-73: --n-unidade-p 12 ('junto de número até 34'), --n-unidade-g 18 ('junto de 48 e 62'). 40 (--n-progresso) fica sem regra de unidade.
- **T15-A15** · baixa · ✔ O título do cartão usa --t-titulo-tela, que é 'um por tela', e a 00 fica com dois 22px
  - *Prova:* tokens.css:63 '--t-titulo-tela 22px /* um por tela */'. 00-tela.html:37 h1 22px e :43 título do cartão 22px.
- **T15-A16** · baixa · ✔ tela.md diz 'sem faixa ou com', mas toda referência tem faixa
  - *Prova:* tela.md:8. Na 03 e na 04 há 'faixa · sem sessão' (html:24-28), que é uma faixa de 52px.

</details>

#### T16 · Sessão

- **T16-A1** · alta · ◐ estados.md e indice.json dão o caso do mock errado pro 01 e pro 02.
  - *Prova:* estados.md:8-9 e indice.json:1201 e 1213: 01 = autotesteEncerramento e 02 = autotesteAssertivas. Mas o 02 mostra os 8 rótulos de M.autotesteEncerramento (mocks.js:284-292: Configuração… ID na plataforma) e nenhum dos 8 de M.autotesteAssertivas (mocks.js:299-308: …
  - *Correção do verificador:* O erro existe em estados.md e indice.json. A frase 'logica.md repete o mesmo par' é falsa: a tabela de momentos de logica.md não tem coluna de caso, e o coordenador não afirma isso em lugar nenhum. Os rótulos ficam em mocks.js:285-294, não em 284-292.
- **T16-A2** · alta · ✔ logica.md diz que todo encerramento depois de homologar tem o corte, mas o mock só pede o corte em VL08, e a semente da T16 é um VL06.
  - *Prova:* logica.md:60 'o corte de alimentação que o técnico faz' × mocks.js:126-135 (vl06 reinicioPorComando: true; vl08: false; 'o passo 2 pede o corte em M2C-0371'). A semente (logica.md:52, tela.md:9) é M2C-0417 = vl06 (node: a-01 … vl06 reinicioPorComando true). O próprio …
- **T16-A3** · alta · ✔ No 02 do herói, 'Pontos de cerca · não se aplica' contradiz o mock: o a-01 tem 4 regiões de cerca.
  - *Prova:* 02-momento-sessao-encerrada.html:60-61 e textos.md:15 × mocks.js:234-237 (rg-01..rg-04, todas com ativoId a-01). node: regioes a-01 = 4. mocks.js:224-225 'As telas leem só a CONTAGEM de regiões por ativo (T05, T13, T16)'. motivoSemCercas 'nenhuma cerca neste ativo' …
- **T16-A4** · alta · ✔ O contador do cabeçalho segue duas regras na mesma cadeia: passo que corre na 00 e na 01, passos feitos na 03 e na 06.
  - *Prova:* componentes.md:104: 'com contador neutro · o contador conta o que passou'. 00-tela.html:38 '3 de 8' com 2 feitos (poços 1-2 check, 3 = quadrado agora). 01…html:38 '2 de 8' com 1 feito. 03…html:38 '1 de 4' com 1 feito (Repouso), com o Canal correndo como 2º dos 4. …
- **T16-A5** · alta · ✔ O estado 05 remonta a tela em relação ao 02: a prova some, a lista sobe 103px e aparece um contador que o 02 não tem.
  - *Prova:* Lei 3 (leis.md:11) e 07-decisoes/05 ('Todo estado é a tela-base com outro conteúdo'). Borda #2B2540 medida no PNG: cartão em y=237–642 no 02 e y=134–539 no 05. A prova (02…html:32-36, y≈134–225) sai. '7 de 8' nasce ao lado do título (05…html:31-33). A nota de 12px …
- **T16-A6** · alta · ✔ O bloco de falha do 05 quebra a Lei 7: não tem poço, usa rótulo de topo e tem duas orações.
  - *Prova:* leis.md:15 'Aviso tem um formato só: poço, rótulo, uma frase'. 05…html:77-80: sem poço nem glifo, rótulo 11px ls 1,4 (--t-rotulo-topo, que a folha 1 reserva pra 'acima do título da tela'), frase de duas orações em #A9A2BC, padding 14. A peça falha da folha 4 tem poço …
- **T16-A7** · media · ◐ O estado 06 não é a tela-base com outro conteúdo: troca a cadeia, a altura das linhas, o cabeçalho e o rodapé.
  - *Prova:* 07-decisoes/05. Medido no PNG: o primeiro poço sai de y=136 (00) pra 154 (06), +18 pelo subtítulo. O passo cai de 62 pra 58. Os 8 passos viram os 6 blocos da T09. O rodapé processo correndo (00-tela.html:123) vira duas ações Retomar/Descartar (06…html:101-104).
  - *Correção do verificador:* A troca da cadeia, a altura de 62 para 58 e o subtítulo que empurra 18px se confirmam. O rodapé não prova remontagem: fica com a mesma altura (659 nas duas) e só troca o conteúdo, que é o que a M19 aceita.
- **T16-A8** · media · ✔ A altura dos passos muda entre momentos da mesma cadeia (62 × 58), e as linhas pulam 4px quando o corte termina.
  - *Prova:* min-height 62 em 00-tela.html:41-101; 58 em 01…html:41-101, 03…html:42-48 e 06…html:39-79. A folha 5 repete as duas alturas (62 no encerrando, 58 no pede o corte e no sem homologar). Poço-base 00 = 167,229,291…; 01 = 167,225,317… animacao.md:11 diz 'nada que mexa no …
- **T16-A9** · media · ✔ A curva 'acelera' da faixa não existe nos tokens.
  - *Prova:* animacao.md:9 'acelera' × movimento.md:12 e tokens.css:113, que só têm --mov-curva cubic-bezier(0.2,0.8,0.2,1) 'desacelera no fim · a curva de tudo, menos do que é linear'.
- **T16-A10** · media · ✔ 'A faixa sobe e some' contradiz as referências, que mantêm a faixa sem sessão no mesmo lugar.
  - *Prova:* animacao.md:9 × 02/04/05/06…html:24-27 (faixa de 52, #16131D, 'Sem sessão de configuração', em y=30–82 nos quatro PNGs).
- **T16-A11** · media · ✔ Com reduzir movimento, as assertivas 'aparecem juntas', contra a regra do app.
  - *Prova:* animacao.md:8 × movimento.md:47 'Os processos continuam andando no mesmo ritmo — a prova continua nascendo em ordem, só que sem movimento'.
- **T16-A12** · media · ◐ O mock diz que a versão composta nunca vai pra tela, e a T16 a mostra em destaque.
  - *Prova:* mocks.js:656-658 'compõe a string posicional A12.G07.L02.E05.C03 … grava em sessao.cadeia.versaoGravada — nunca em tela' × 02…html:34 'A12.G07.L02.E05.C03' e 06 'a versão gravada até aqui é A12.G07' (textos.md:31). A folha 7 tem prova da sessão e prova da cadeia com a …
  - *Correção do verificador:* É o mesmo tema do T11-A10. A contradição não é da T16: a string aparece na T09, T11, T13, T16 e em duas peças aprovadas da folha 7. O mais provável é que o comentário do mock esteja errado ou ambíguo, e não a T16.
- **T16-A13** · media · ✔ O mock manda mostrar 'não se aplica' com motivo, e o 02 e o 05 mostram sem motivo.
  - *Prova:* mocks.js:266-268 'Não aplicável aparece como `não se aplica` COM MOTIVO — nunca verde por omissão'. motivo 'a leitura da CAN não foi refeita' (mocks.js:289) e motivoSemCercas (mocks.js:291) não aparecem em textos.md:15 nem 27.
- **T16-A14** · media · ✔ A HU-T16-1 promete abertura e tempo decorrido na faixa, e nem a peça nem nenhuma referência mostram isso.
  - *Prova:* dominio.md:394 e historias.md:152 × componentes.md:18 ('faixa · sessão aberta · LED lima, serial, placa e o ENCERRAR'). grep 'decorrid\|aberta às' em 02-telas/*/textos.md só acha 'iniciada hoje às 13:05' da T16/06. mocks.js:525-526 promete 'o TEMPO DECORRIDO existir …
- **T16-A15** · media · ✔ tela.md não diz o que Retomar e Descartar fazem, e a HU-T16-7 pede que o descarte seja registrado.
  - *Prova:* tela.md:13-18 lista só ENCERRAR, o corte, Voltar ao menu e o ENCERRAR antes de homologar. O 06 tem Retomar e Descartar (06…html:102-103). Não há referência nem campo no mock pro registro do descarte.

<details><summary>3 de gravidade baixa</summary>

- **T16-A16** · baixa · ✔ A lista de peças da tela.md vem contaminada da coluna 'Telas que usam': 14 das 28 não aparecem na T16, e 'ainda não', que a T16 usa, falta.
  - *Prova:* componentes.md:93-95 dá encerrando, pede o corte e sem homologar a 11 telas, mas 'Contadores e estado' só existe em T16/textos.md (grep). componentes.md:106 dá a marca no login a T16, mas 'CONFIGURADOR' só está em T01/textos.md. componentes.md:41 dá 'ainda não' só à …
- **T16-A17** · baixa · ✔ componentes.md põe a peça falha na folha 1, mas ela está desenhada na folha 4.
  - *Prova:* componentes.md:9 (Folha 1 · falha · traço vermelho embaixo) × grep -c 'traço vermelho embaixo': folha-1-fundamentos.html 0, folha-4-linhas-cartoes-aviso.html 1.
- **T16-A18** · baixa · ◐ O gate aprova sem conferir nenhum dado que a T16 lê.
  - *Prova:* gate-cobertura.js:135-136 confere só M.autotesteAssertivas (bancada). Nenhuma linha fala de autotesteEncerramento, reinicioPorComando, noEncerramento ou dos campos do C16 em sessao-interrompida (grep vazio). Saída: 'GATE APROVADO — todas as âncoras recomputadas …
  - *Correção do verificador:* O gate confere a existência dos dois casos da T16 e que a-13 e M2C-0411 (que o 06 mostra) são reais. O que ele não confere: as 8 assertivas do encerramento, o reinicioPorComando, o noEncerramento e os campos do C16 em sessao-interrompida.

</details>


---

## 5 · As divergências

O que encontrei além do que estava descrito: situações que o mock ou o domínio criam e nenhuma referência desenha; dado sem leitor; regra que só existe num comentário; peça usada que nenhuma folha tem. Não chegam a contradizer outra parte da pasta, mas o construtor vai tropeçar nelas. As mais importantes já estão nos TX (4.1).

### 5.1 · Dos estudos transversais

#### Design system · as oito folhas

- **DS-V1** · media · ◐ Se o menu passar para o Lucide, 4 dos 10 ícones de ferramenta mudam de forma à vista: Configurar vira engrenagem no lugar do sol, a CAN sai do espelho, o checklist perde um check e o Conferir não tem equivalente.
  - *Prova:* tmp/ds/cmp.png, linhas 'Configurar · sun / settings', 'CAN · activity', 'Checklist · list-checks', 'Conferir · wrench / plug-zap' · folha-3:16
  - *Correção do verificador:* O Configurar desenhado já é o sun do Lucide (anel r3 × r4, raios de 3 × 2; no overlay quase coincide). Ele só vira engrenagem se alguém escolher 'settings'; isso é decisão de nome, não troca forçada. Pelo equivalente mais próximo, mudam à vista a CAN, o Checklist, o Conferir e o Ativo: a caixa do truck do Lucide vai de y4 a …
- **DS-V5** · media · ◐ As próprias folhas põem glifo fora de poço em 4 espécimes, contra a Lei 4: sinais liga-desliga, requisitos da senha, cartões de foto e bloco do evento.
  - *Prova:* folha-5:100 check mini sem poço · folha-6:36 e folha-7:68 check solto sem poço · folha-7:156 relógio sem poço · leis.md:12 · na escala das telas: T14-A6, T10-A11, T01-A4
  - *Correção do verificador:* A lista da prova não é a certa. Sem poço nenhum ficam 4: sinais liga-desliga, requisitos da senha, bloco do evento e a pré-condição dos pinos (folha-5:275), que a prova não lista. Os cartões de foto não estão soltos: o check mora num visor de 46 com o acabamento do poço (#0B0910, borda #06050A e #332C49). O mesmo vale pro xis …
- **DS-V9** · media · ◐ O tambor tem uma peça, mas dois desenhos e dois ritmos: célula 34/52 com 40ms entre as rodinhas na T07, e texto 22 no poço com 600ms no total na T10, que não tem folha.
  - *Prova:* folha-5:85–94 · T07 animacao.md:8 · T10 animacao.md:7 · componentes.md:86 lista só a T07 · T10-A8, T10-D8, T07-D8
  - *Correção do verificador:* O desenho da T10 tem folha: é o 'valor em poço' da folha-8:16–18 (22px −0,3 no poço, mesmo estilo da T10/00:47–49). O que falta é o nome e o movimento. A linha 'tambor' (componentes.md:86) não lista a T10, a linha 'valor em poço' (componentes.md:154) não diz que rola, e nenhuma folha desenha rodinha pra T10.

<details><summary>6 de gravidade baixa</summary>

- **DS-V2** · baixa · ✔ O 'Ativo selecionado' é um caminhão num app de ônibus. O Lucide tem bus e truck, e o desenho só bate com truck.
  - *Prova:* folha-3:16 'M3 6h11v9H3zM14 9h4l3 3v3h-7z' + rodas · cmp.png 'Ativo · truck' × 'Ativo x bus' · a T10/02 tem o caso 'caminhão coletor', então os dois servem
- **DS-V3** · baixa · ✔ O glifo 'agora' é um quadrado cheio e o 'traço' é um span, não SVG. A folha 3 manda 'nunca preenchidos' e 'vêm do Lucide'.
  - *Prova:* folha-3:16 '<span style="width: 12px; height: 12px; background: #F2F0F7">' e '<span style="width: 10px; height: 1px; background: #332C49">' · cabeçalho da folha-3:16 'nunca preenchidos' · Lucide square = contorno 18×18 com rx 2
- **DS-V4** · baixa · ◐ O glifo 'sem sinal' tem arcos inteiros e um ponto cheio, e o wifi-off do Lucide quebra os arcos em volta da diagonal. A Lei 14 cita justamente o wi-fi como exemplo de forma canônica.
  - *Prova:* folha-3:16 'M2 8.5a15 15 0 0120 0 … M3 3l18 18 … circle r=1.4 fill' × lucide wifi-off.svg (6 arcos partidos + 'm2 2 20 20' + 'M12 20h.01') · leis.md:22
  - *Correção do verificador:* O wifi-off do Lucide tem 5 arcos, não 6. O de dentro é inteiro ('M8.5 16.429a5 5 0 0 1 7 0'). Os dois de fora vêm partidos em volta da diagonal, 4 pedaços. Mais 'm2 2 20 20' e o ponto 'M12 20h.01'. Só os dois arcos de fora quebram.
- **DS-V6** · baixa · ◐ As telas usam 3 glifos que nenhuma folha desenha: círculo com traço, círculo de raio 8 e seta pra cima. O README diz que todo desenho que se repete está numa folha.
  - *Prova:* '<circle r=9><path d="M8.5 12h7">' ×4 (T16/02, T16/05) · '<circle r=8>' ×1 (T01/08) · 'M12 19V5M7 10l5-5 5 5' ×1 (T15) · README:13 · T16-V2, T15-V10, T01-A4
  - *Correção do verificador:* Os 3 conferem, mas só o círculo com traço se repete (4× em 2 referências). Só ele contradiz o README:13. O círculo r8 e a seta aparecem uma vez cada, e a frase do README não os cobre.
- **DS-V7** · baixa · ✔ A exceção da pré-checagem com sessão tem três versões: tokens.css diz 'exceção declarada', a folha 1 diz 'sem exceção' e a folha 4 diz 'a exceção acabou'. O valor é o mesmo 38.
  - *Prova:* tokens.css:86 · folha-1:16 'altura de linha … — sem exceção' · componentes.md:53 'a mesma 38 — a exceção acabou'
- **DS-V8** · baixa · ✔ Na folha 8, 'o que não se aplica' separa as linhas com --borda-rodape (o 'topo do rodapé') no lugar de --divisoria, em linhas de 26 que batem com token só no valor.
  - *Prova:* folha-8 espécime 'o que não se aplica': 'height: 26px; border-bottom: 1px solid #221D2E' · tokens.css:20 --divisoria #241F33 'entre linhas' · tokens.css:22 --borda-rodape

</details>

#### O palco

- **PALCO-V1** · media · ✔ A porta natural contra o estado sem toque. A decisão 11 abre o estado tocando, 'como o mundo'. A decisão 23 diz que o estado é parado e sem toque. Um estado aberto pela porta trava o fluxo no toque seguinte, e não está escrito em qual dos dois jeitos do celular a porta abre.
  - *Prova:* 07-decisoes/11:5,9 · 07-decisoes/23:5 · logica.md:56 e :117 · na escala da tela: T05-A7, T06-A3
- **PALCO-V2** · media · ✔ A URL só endereça tela e estado, mas a logica.md diz que todo lugar tem endereço. Momentos e folhas ficam sem endereço, e os momentos sem porta (T05/02, T05/10, T11/02) ficam sem caminho nenhum no palco.
  - *Prova:* logica.md:65 · publicar.md:20 · T05/02 'só um módulo por perto' (o herói tem 4 ou 5) · T05/10 vem do estado 08, que é sem toque · T11/02 'diff-divergente, invertido' contra a semente divergente · já medidos na tela: T05-A6, T11-V5, T11-V10

<details><summary>6 de gravidade baixa</summary>

- **PALCO-V3** · baixa · ◐ O pressionado do painel usa --fundo-cartao, mas o movimento.md manda a linha tocável ir pra --elevado. E a tela aberta usa o mesmo #1A1726: pressionado e aberta só se distinguem pelo traço e pelo negrito.
  - *Prova:* 00-componentes.html:15 (UMA TELA NO PAINEL: pressionado e aberta em #1A1726) · movimento.md:24
  - *Correção do verificador:* O pressionado fora do token confirma, e o fundo é o mesmo nos dois. Mas pressionado e aberta não se distinguem só pelo traço e pelo negrito. Na aberta, o código vai de #867E9A pra #A9A2BC e o nome de #C9C3DA pra #F2F0F7.
- **PALCO-V4** · baixa · ✔ Os rótulos de 10px do palco têm três espaçamentos de letra: 1,6, 1,5 e 1,4. O token diz 1,5.
  - *Prova:* 01:18 1.6 · 04:17 1.5 · 03:19 1.4 · tokens.css:54
- **PALCO-V5** · baixa · ✔ O cabeçalho do painel é declarado com 68 e renderiza 69: o quadro não usa border-box, e a borda de baixo soma. Contraria a lei da medida por dentro.
  - *Prova:* 04-painel-aberto.html:16 'height: 68px … border-bottom: 1px' · render 0–69 · leis.md:29 · 07-decisoes/15
- **PALCO-V6** · baixa · ✔ O painel chama a T08 de 'Refazer leitura'. O README chama de 'Refazer leitura da CAN'.
  - *Prova:* 04-painel-aberto.html:31 · 02-telas/README.md:24
- **PALCO-V7** · baixa · ◐ O movimento do palco só existe no quadro 00: palco.md e movimento.md não têm. E 'esmaece dentro do celular' colide com a decisão 24 (faixa parada) quando o caso troca a faixa: no 02, M2C-0301 · QJF-2C61 contra a semente M2C-0417 · RKT-8H42.
  - *Prova:* 00-componentes.html:15 (MOVIMENTO · LEVE) · movimento.md:17-19 · 07-decisoes/24:5 · print do 02 = T07/01
  - *Correção do verificador:* palco.md tem movimento (o deslizar e o piscar). Só no 00 estão os tempos, a curva, o celular parado e o reduzir. A troca de faixa confirma, mas a decisão 24 regula tela pra tela, não entrar num estado. É caso sem regra, não colisão.
- **PALCO-V8** · baixa · ◐ 'O marcador é o mesmo do app', mas o app tem três tamanhos de marcador, e componentes.md não dá a medida.
  - *Prova:* palco.md:26 · componentes.md:40,75,113 sem medida · já medidos: T04-V10 (poço 30 + quadrado 11), T02-A4, T06-V9
  - *Correção do verificador:* componentes.md dá medida em :75 (11px), e ela diverge dos 10 de palco.md:26. Os três tamanhos confirmam. 'O mesmo do app' não diz qual deles.

</details>

#### O mock e o contrato de dado

- **DADOS-V1** · media · ◐ Os ritmos dos processos têm três endereços que se contradizem: movimento.md, 'constante declarada na tela' no mock e 'o ritmo do mock' no documento do produto real.
  - *Prova:* movimento.md:30-39 (8 ritmos) · mocks.js:904-906 ('a CADÊNCIA de simulação… é constante declarada na tela, como TICK_MS… nada no mock depende de quanto tempo') · 08-produto-real/o-que-o-prototipo-simula.md:12 ('a fila sobe no ritmo do mock'). tokens.css:110-112 só tem as transições
  - *Correção do verificador:* Os ritmos moram em movimento.md, não viram token, e o mock manda declarar como constante na tela, contra a Lei 13. A fila não tem ritmo em lugar nenhum, e o-que-o-prototipo-simula.md:12 promete o 'ritmo do mock', que não existe. Mesmo tema de T04-A17 e T07-A10.
- **DADOS-V2** · media · ✔ Os pacotes de Várzea e de Ibura dizem trazer 3 modelos de ativo, mas as duas garagens usam 2, e os presets dos dois pacotes batem com 2.
  - *Prova:* node: uo-01 e uo-02 usam ma-01 e ma-02; pac-uo-01 e pac-uo-02 têm contem.modelosAtivo 3 (mocks.js:410, :414) e presetsEventoIds [pe-urbano, pe-rodoviario] (mocks.js:409, :413). ma-03 pede pe-maquina (mocks.js:104). Os textos da T03 leem '3 de 3' (textos T03:7). O gate não confere contem
- **DADOS-V4** · media · ✔ Os comentários do mock citam leis, decisões e ciclos de outra numeração: 'Lei 8/17', 'D-21/D-39/D-61' e C2–C23 colidem com leis.md, 07-decisoes e ciclos.md C0–C14.
  - *Prova:* 'Lei 8/17' (mocks.js:1, :264, :389, :999, :1044). Em leis.md:16 a Lei 8 é 'Um primário por tela', e não há Lei 17. 'D-21' (mocks.js:3, :746, :1043) quer dizer 'campo nasce preenchido', mas 07-decisoes/21 é 'Só registrar o diagnóstico'. grep: D-21, D-39 e D-61 não aparecem em nenhum .md da pasta. 'C8 · T05' e 'C10 (T06)' no …
- **DADOS-V6** · media · ✔ O documento do produto real promete três simulações que o mock não tem: a busca que acha quatro, a foto que a câmera devolve e a fila no ritmo do mock.
  - *Prova:* 08-produto-real/o-que-o-prototipo-simula.md:5, :9 e :12. O mock não tem lista por perto nem foto; 05-recursos tem só a logo e as fontes (find 05-recursos); o mock não tem ritmo (mocks.js:904-906). Mesmo tema de T05-A1 e T13-V5, no documento

<details><summary>2 de gravidade baixa</summary>

- **DADOS-V3** · baixa · ✔ No a-22 a T07 leria um hodômetro e a T10 outro para o mesmo módulo: 96.410 km contra 121.003 km.
  - *Prova:* O a-22 é ma-02, sem caso can-estatico, então lê o nominal '96.410 km' (mocks.js:603). calibracao.bruto a-22 = 121003000 (mocks.js:761), e a T10/04 mostra 'O MÓDULO CONTA 121.003' (textos T10:23). O próprio mock previu isso para o a-09 e corrigiu só ele (mocks.js:646-650)
- **DADOS-V5** · baixa · ✔ Os cabeçalhos do mock e do gate apontam caminhos que não existem mais: tools/ e app/mocks.js.
  - *Prova:* mocks.js:1 'app/mocks.js', mocks.js:24 'tools/gate-cobertura.js', gate-cobertura.js:1-3 'tools/gate-cobertura.js… app/mocks.js… node tools/gate-cobertura.js'. contrato.md:15 diz 'node 04-dados/gate-cobertura.js'

</details>

#### Coerência entre os documentos

- **COERENCIA-V1** · media · ✔ O domínio ainda conta '52 telas em 5 fluxos', o mapa dos 5 fluxos não tem a T04, e a fonte 'fechada' carrega [PROPOSTO] e [ABERTO].
  - *Prova:* dominio.md:214, :407, :417 ('52 sub-estados') × indice.json (16 telas + 39 momentos + 50 estados = 105) · dominio.md:409-415 (a T04 não está em nenhum fluxo) · fluxos.md tem um caminho, as consultas e os desvios, não cinco fluxos · dominio.md:9, :82, :405 × LEIA-PRIMEIRO.md:5 ('fechado e medido').
- **COERENCIA-V2** · media · ✔ Os nomes das telas não seguiram o renome: o domínio e a HU-T08-3 falam o nome antigo.
  - *Prova:* tabela 3a · dominio.md:66, :70, :295, :331 · historias.md:75 ('Após o reset') × T04/textos.md:7 · mocks.js:99 registra o renome · CLAUDE.md:11 ('Documentação segue o código'). T04-A6 e T08-A12 viram isso cada um na sua tela.
- **COERENCIA-V3** · media · ◐ O 'gate aprovando' que fecha cada ciclo não diz nada de seis telas, e o 'zero Date.now' só é conferido no mock.
  - *Prova:* `node 04-dados/gate-cobertura.js` → 'GATE APROVADO' · ciclos.md:29, :113 × T01-A9, T09-V10, T10-V2, T14-V7, T15-V3, T16-A18 · a checagem de CLAUDE.md:12 no gate é 'zero Math.random / Date.now / new Date no mocks.js'; nada confere o código do app.
  - *Correção do verificador:* 'Não diz nada de seis telas' é forte demais. O gate confere a fila, que é dado da T15 (gate-cobertura.js:97-106, inclusive 'enviando = 1 com progresso'), a ordem e o arraste da cadeia da T09 (:109-110), a foto da calibração do herói na T10 (:80), o caso identificador-divergente da T14 (:41, :125) e o autoteste de bancada …
- **COERENCIA-V4** · media · ✔ A regra de fidelidade não diz a escala nem a ferramenta, e não lista as diferenças que a própria pasta obriga.
  - *Prova:* 06-prototipo/CLAUDE.md:33 ('fotografado em 360 × 800 … Diferença é bug seu') × PNG de 720 × 1600 · a stack (06-prototipo/CLAUDE.md:9-14) não tem ferramenta de captura · M10/M11: 8 referências cortam conteúdo e a faixa encolhe; o app que seguir a decisão 14 ('o conteúdo rola') vai diferir desses PNG.
- **COERENCIA-V5** · media · ✔ 'Todo lugar do protótipo tem endereço', mas o endereço só tem tela e estado: os 39 momentos ficam sem, inclusive as folhas da T04.
  - *Prova:* logica.md:65 · publicar.md:20 (`?tela=T07&estado=…`) × indice.json (39 momentos) · palco.md:20 (as folhas são momentos da T04). T11-V10 achou um caso; aqui é o esquema inteiro.

<details><summary>7 de gravidade baixa</summary>

- **COERENCIA-V6** · baixa · ✔ O palco tem 'três peças e mais nada' em três lugares, quatro peças na tabela e uma etiqueta que nenhuma referência desenha.
  - *Prova:* palco.md:3 · decisão 13:9 · 00-componentes.html ('o quadrado, o celular e a coluna — nada mais') × palco.md:9-12 (4 linhas, com o painel) × palco.md:42, publicar.md:21 e ciclos.md:107 (a etiqueta).
- **COERENCIA-V7** · baixa · ✔ A janela estreita (abaixo de 900px) e a etiqueta não entram no 'entra' de nenhum ciclo; o C14 só as confere.
  - *Prova:* palco.md:41-42 × ciclos.md:39 (o C3) e :105-107 (o C14).
- **COERENCIA-V8** · baixa · ✔ Há duas cópias da Barlow no plano: a do npm, que o protótipo manda usar, e a de 05-recursos, que as referências usam.
  - *Prova:* 06-prototipo/CLAUDE.md:13 e publicar.md:13 (@fontsource/barlow) × 05-recursos/README.md:6 e 05-recursos/fontes/barlow.css (woff2 latin, font-display: block) · publicar.md:35 já proíbe duas cópias do mock ('um deles mente') · a quebra de linha depende da métrica (T02-V9).
- **COERENCIA-V9** · baixa · ✔ O tokens.css carrega regras globais de body que brigam com o fundo do palco na mesma página.
  - *Prova:* tokens.css:120-128 (body com background var(--fundo-pagina)) × palco.md:3 (o palco no fundo --poco-fundo) · 06-prototipo/CLAUDE.md:7 ('duas coisas separadas no código').
- **COERENCIA-V10** · baixa · ✔ 10 decisões não têm lei em leis.md, e 14 leis não têm decisão registrada.
  - *Prova:* tabela 4a · 07-decisoes/README.md:3 ('Uma decisão que não é registrada volta a ser discutida').
- **COERENCIA-V11** · baixa · ◐ Os 16 animacao.md prometem que os quadros de começo e fim são referências, e as telas acharam sete movimentos sem um deles.
  - *Prova:* a mesma frase na última linha dos 16 (ex.: T07/animacao.md:12) × T03-A22, T06-A4, T07-A9, T08-A7, T10-N1, T10-N2, T15-N2.
  - *Correção do verificador:* São mais de sete. Faltam o T11-V3 (não há referência da leitura correndo) e o T14-V3 (não há o quadro 'fila drenada, antes do disparo'). O refutado T05-N5 também aponta a falta do quadro '0 de 11'. E o T07-A9 sozinho cobre as quatro linhas da T07. São pelo menos nove itens, e mais de dez movimentos.
- **COERENCIA-V12** · baixa · ✔ A ordem de leitura muda entre o LEIA-PRIMEIRO e o prompt de abertura, e a do LEIA-PRIMEIRO não cobre 'a pasta inteira'.
  - *Prova:* CLAUDE.md:7 ('a pasta inteira na ordem do LEIA-PRIMEIRO') × LEIA-PRIMEIRO.md:11 (sem 05, 07 e 08; 02 antes de 03) × PROMPT-DE-ABERTURA.md:15-22 (03 → 04 → 06 → 07/08 → 02 por último).

</details>

#### Lacuna 2 · o voltar do sistema

- **LAC2-V1** · media · ✔ logica.md diz que todo lugar do protótipo tem endereço; medido, 66 dos 105 têm.
  - *Prova:* logica.md:65 'Todo lugar do protótipo tem endereço' × indice.json 16·39·50: os 39 momentos dividem o endereço da tela. publicar.md:39: 'os lugares moram na URL'. É o T11-V10 no projeto inteiro.
- **LAC2-V3** · media · ✔ O Cancelar dos dois diálogos da T04 não tem destino declarado, e o voltar herda a lacuna.
  - *Prova:* logica.md:86: o 06 nasce do 'Sair da conta', na folha da conta. logica.md:131: o 09 nasce ao trocar de garagem com a sessão aberta, na folha de trocar. tela.md:15-19 não diz pra onde vai o Cancelar. As referências desenham o véu sobre página vazia (T04-V1). T04-V8 cobre só o primário.

<details><summary>2 de gravidade baixa</summary>

- **LAC2-V2** · baixa · ✔ componentes.md dá o 'diálogo sem saída' a T01, T04 e T13, mas só a T01/09 é um: os outros três diálogos têm Cancelar.
  - *Prova:* componentes.md:31 × toc.json: T01/09 tem 1 tocável ('Entrar com a senha nova'); T04/06:40, T04/09:35 e T13/10:33 têm Cancelar. A HU-T01-10 (dominio.md:229) diz 'sem botão fechar'. É a única folha ou diálogo que o voltar não fecha. Mesmo tema: T01-A10.
- **LAC2-V4** · baixa · ✔ movimento.md declara o fechar da folha, mas não o do diálogo. O voltar que fecha um diálogo não tem movimento.
  - *Prova:* movimento.md:22: folha 'fecha em 150ms'. movimento.md:23: diálogo só 'esmaece e cresce de 98% a 100%'. T01/animacao.md:12-13 só abre a folha e o diálogo; T04/animacao.md:9 fecha só a folha. Diálogos que fecham: T04/06, T04/09, T13/10.

</details>

#### Lacuna 3 · o leitor de tela

- **LAC3-V1** · media · ✔ O M17 é falso positivo. O T01/01 tem rótulo, e o campo sem nome de verdade é o T01/08.
  - *Prova:* T01/01:45 <label for="s5">SENHA e :47 <input id="s5">, a mesma estrutura do T01/00:41,43 (diff sem estilos: só o value muda). T01/08:42 <input id="nsm" value="Garagem!Ibura27">, sem label e sem aria-label. O método do M17 (scratchpad/medir.js:25, semNome = !(aria-label‖textContent‖value‖aria-labelledby)) ignora label[for] e …

<details><summary>3 de gravidade baixa</summary>

- **LAC3-V2** · baixa · ◐ A tarefa cita stack-a-definir.md:11 pro textos.md como arquivo de tradução. A frase está na linha 6, e o leitor de tela está na linha 14.
  - *Prova:* 08-produto-real/stack-a-definir.md:6 «os textos estão em `textos.md`, prontos pra virar arquivo de tradução» · :14 «como a câmera, a notificação local e o leitor de tela entram» · :11 é o título «## O que a stack vai decidir».
  - *Correção do verificador:* O título está na linha 10, não na 11. A 11 está vazia.
- **LAC3-V3** · baixa · ◐ A definição de poço com glifo da tarefa (svg aria-hidden numa caixa de 24, 26, 30 ou 32) deixa de fora 99 dos 367 poços.
  - *Prova:* Há poço de 34 com glifo de estado em 32 casos: a cadeia da T09 (30), T04/01:43 e T15/02:51. E 67 poços não têm svg: o traço é span de 10×1 (61) e o agora é span de 12×12 #F2F0F7 (6), como na folha-3:16.
  - *Correção do verificador:* Ficam de fora 90 dos 367: 32 em poço de 34 + 67 spans − 9 de sobreposição. O poço de 34 citado é T04/01:50, não :43. O traço é 10×1 em 58 casos e 9×1 em 3. O agora é 12×12 em 4, 10×10 em T05/10:37 e 14×14 em T09/00:81.
- **LAC3-V4** · baixa · ◐ O custo do (b), 'uma propriedade no componente de glifo do C2', cai num componente que o componentes.md não lista.
  - *Prova:* grep de 'glifo' e 'poço' no componentes.md → só as linhas 60, 64, 107 e 154, que são outras peças. A seção Folha 3 (linhas 36–42) tem 3 peças: escolha numa lista, ainda não, espera. Nenhuma linha é 'glifo' ou 'poço'. O C2 (ciclos.md:33) entrega 'as 114 peças'.
  - *Correção do verificador:* O grep de 'glifo' também acha a linha 36, que é o título da seção e não uma peça. A conclusão se mantém.

</details>


### 5.2 · Por tela

#### T01 · Login

- **T01-V1** · media · ✔ Os 44 s e os 9:41 e 9:28 são números inventados e inconsistentes entre si; o 44 escapou da lista mecânica por coincidência.
  - *Prova:* '44' só existe no mock como diasAtras: 44 (mocks.js:371). Pela conta: 600 − 9:41 = 19 s decorridos e 60 − 44 = 16 s na 03; na 05, 9:28 = 32 s decorridos com o reenvio ainda em 44 s (textos.md:19,27). Os dois relógios não podem sair do mesmo envio.
- **T01-V2** · media · ✔ O 'resta 1 envio nesta hora' não cai depois do 'Enviar o código' da 02.
  - *Prova:* textos.md:15, 19, 31 e 35 dizem 'resta 1' antes e depois do envio; node dá tetoPorHora − reenviosNaHora = 1. Só fecha se o primeiro envio não conta como reenvio, e isso não está escrito.
- **T01-V3** · media · ◐ A folha 04 e o diálogo 09 estão desenhados sobre uma página vazia; no protótipo, a tela de baixo vai aparecer atrás do véu.
  - *Prova:* A área acima da folha no PNG 04 tem 2 cores (#08070C, #09070D); a do 09 é igual. Em T04/05-momento-folha-conta, a mesma área tem 56 cores, a tela aparece.
  - *Correção do verificador:* Na T01 a folha e o diálogo estão mesmo sobre página vazia, mas a comparação não se sustenta. Na T04/05 a tela de baixo também não aparece; o que aparece é o chrome (a tira), que fica acima do véu. É o padrão de todas as referências com véu, não um desvio da T01. Vira …
- **T01-V4** · media · ✔ A 07, aberta pela coluna, precisa mostrar um código errado (482911) que não existe no mock.
  - *Prova:* 07 html, células '482911'; palco.md:35 'montado pelo caso do mock, parado e sem toque'; o mock só tem codigo '482913'

<details><summary>9 de gravidade baixa</summary>

- **T01-V5** · baixa · ✔ Na 06 o traço lima fica na sexta célula vazia.
  - *Prova:* 06 html: a última célula tem border-bottom 2px #AAEF00 e as seis estão vazias; animacao.md:9 diz que o traço 'pula pra próxima célula'
- **T01-V6** · baixa · ✔ A 07 libera o reenvio dentro dos 60 s sem regra escrita.
  - *Prova:* textos.md:35 'Pode pedir outro agora'; na 05, um toque antes, 'pode pedir outro em 44 s'; a HU-T01-7 e o mock só falam de reenvioSeg: 60
- **T01-V7** · baixa · ◐ Os números de regra da senha e dos passos não têm campo no mock.
  - *Prova:* 08: '10 caracteres ou mais' e 'Diferente das 3 últimas'; o ≥10 só aparece no comentário (mocks.js:1045). 'de 3' é o número de passos. Não entraram na lista mecânica porque 10 e 3 existem no mock com outro sentido.
  - *Correção do verificador:* O comentário do ≥10 está em mocks.js:1047, não na 1045. E a ausência do '3 últimas' é deliberada e declarada em mocks.js:1036-1037. O achado vale para o '10' e para o 'de 3' dos passos.
- **T01-V8** · baixa · ✔ Há espaços e tamanhos fora de token que a lista mecânica não pegou, por coincidirem com o valor de outro token.
  - *Prova:* gap 18 em 00–08 e padding 18 em 04 e 09 (18 só existe como --n-unidade-g); fonte de 18px no e-mail da 02; linha de 40 nos requisitos (--e-40 é espaço, não linha); divisória #221D2E (--borda-rodape) entre requisitos em vez de --divisoria
- **T01-V9** · baixa · ◐ Os ícones das referências são desenhados à mão, não são os do Lucide.
  - *Prova:* Olho 'M2 12s3.6-6 10-6…', girar 'M20 11a8 8 0 10-2.3 5.7', envelope com rect rx=1, X 'M6 6l12 12…' (01, 04 e 08 html); leis.md:14 manda usar Lucide, e 06-prototipo/CLAUDE.md usa lucide-react
  - *Correção do verificador:* O X e o chevron têm a geometria do Lucide. Os desenhados à mão são o olho, o girar, o envelope, o usuário e o check. A lei está em leis.md:22 (Lei 14), não na linha 14. O olho está na 00 e na 01, não na 08.
- **T01-V10** · baixa · ✔ A 'linha de opção' da folha 6 tem dois cartões aninhados; a 04 tem um só.
  - *Prova:* folha-6 html, 'linha de opção': duas divs 'background: #1A1726; border: 1px solid #2B2540' uma dentro da outra; a borda dupla aparece no recorte do PNG
- **T01-V11** · baixa · ✔ Os dois cartões de canal têm alturas diferentes, e o tamanho do valor depende do canal.
  - *Prova:* PNG 02: 220→419 (199px) e 429→618 (189px); 02 html com valor 26px no telefone e 18px no e-mail, os dois em flex-grow
- **T01-V12** · baixa · ✔ Três tocáveis têm alvo de 44, abaixo de --alvo-min 48.
  - *Prova:* Olho 44×44 (00 html), X 44×44 (04 html), link 'Não recebi o código' com height: 44px (03 html). É do escopo da medição do coordenador.
- **T01-V13** · baixa · ✔ Três detalhes de medida não batem com os tokens ou com a folha.
  - *Prova:* O conteúdo usa padding 20, e tokens.css:79 diz que --respiro 16 é o 'padding do conteúdo' (a folha 04 usa 16). O título de 20px do 09 não tem o ls −0.2 de tokens.css:62 (o da 04 tem). O cabeçalho de passo usa gap 8, e o 'segmentado' da folha 5 usa 6.

</details>

#### T02 · Selecionar contexto

- **T02-V1** · media · ✔ O pressionado da linha de 72 dentro do cartão agrupado não está desenhado, e a geometria dele fica em aberto.
  - *Prova:* nenhuma das 3 referências nem das 8 folhas tem a linha de 72 com fundo #1E1A29 · o cartão tem padding 0 12 e a divisória é recuada (00-tela.html:31-32; PNG 00 divisória x 58–662 @2x)
- **T02-V2** · media · ◐ A passagem do primário de desabilitado pra habilitado (fundo, borda, cor do texto) não está em animacao.md, e o primário desabilitado não tem linha em componentes.md.
  - *Prova:* diff 00×01 linha 65: #1A1726+borda #2B2540+#867E9A → #402070+#AAEF00 × animacao.md:8 fala só do texto × componentes.md folha 1 só tem 'falha' (linha 9)
  - *Correção do verificador:* A primeira metade vale: a passagem de fundo, borda e cor não tem linha em animacao.md. A segunda exagera. O desenho do primário desabilitado está em componentes.md:27-28, dentro de 'processo correndo' e 'com legenda'. O que falta é uma linha própria para 'primário · …
- **T02-V4** · media · ✔ A busca não tem desenho digitada, filtrada, vazia nem focada, e 'cidade' não é campo do mock.
  - *Prova:* 02-estado só com a dica · textos.md:15 não tem frase de vazio · folha-6 'campo de busca' sem variante focada · M.uos {id, ucId, nome} sem cidade; a cidade só aparece dentro de M.ucs[].nome ('RMR – Recife', 'Agreste – Caruaru')
- **T02-V10** · media · ◐ HU-T02-4 contra o mock: a evidência f-04 fica 'enviando' pra sempre com o relógio parado, e a troca de garagem da T04 tende a ficar sempre bloqueada. Além disso, as HUs 2 a 4 só se constroem no C5.
  - *Prova:* M.filaSaida f-04 {estado:'enviando', criadoAs:'14:29', progresso:62} · movimento.md:30-39 não tem ritmo pra fila · T04/estados.md:13-14 (07 momento × 08 estado 'filaSaida') · ciclos.md:45-53 (C4 entra T01–T03; C5 entra T04 e as folhas)
  - *Correção do verificador:* As linhas da T04 estão erradas: são estados.md:14-15, não :13-14 (a :13 é 06-momento-folha-conta-sair). O argumento se sustenta: com f-04 enviando para sempre, o toque no nome da garagem sempre cai no 08, e o 07 fica inalcançável por dado.

<details><summary>7 de gravidade baixa</summary>

- **T02-V3** · baixa · ✔ O nome da garagem escolhida muda de cor (--tinta-forte → --tinta) sem linha de movimento. Cor não pode animar.
  - *Prova:* diff 00×01 linha 35: #C9C3DA → #F2F0F7 · movimento.md:43
- **T02-V5** · baixa · ◐ Há três redações para a idade do mesmo pacote, e nenhuma regra escrita que a derive de diasAtras.
  - *Prova:* T02 textos.md:7 'pacote de ontem, 07:10' / 'pacote de há 4 dias, 06:55' × T04 textos.md:35 'carregado ontem, 07:10' / 'carregado há 4 dias' (sem hora) × T03 textos.md:18 'CARREGADO HÁ · 4 · dias' · nenhum .md traz a regra ontem/há N/vencido
  - *Correção do verificador:* A linha do T03 está errada: é textos.md:19, não :18 (a :17 é o título '03-estado-pacote-de-4-dias' e a :18 está em branco). O resto confere.
- **T02-V6** · baixa · ✔ A contagem 'N ativos' tem duas fontes no mock, e o gate não confere uma contra a outra.
  - *Prova:* node: ativos.filter(uoId) = 10/8/6 e pacotes[].contem.ativos = 10/8/6 · grep 'contem' em gate-cobertura.js = 0 ocorrências
- **T02-V7** · baixa · ◐ O traço no poço usa --borda-poco (borda) em vez de --marca ('traço, poço vazio'), com contraste 1,51:1.
  - *Prova:* 00-tela.html:54 background #332C49 · tokens.css:18 --borda-poco 'borda de baixo do poço' × tokens.css:34 --marca #4E475E 'traço, poço vazio' · contraste calculado: #332C49/#0B0910 = 1,51 · #4E475E/#0B0910 = 2,25
  - *Correção do verificador:* Os valores estão certos, mas o desvio não é da T02. A T02 copia fiel o glifo canônico da folha-3. A contradição é do design system inteiro: o comentário de tokens.css:34 contra o traço desenhado nas folhas 3 e 4. Deve ser registrada ali, não como erro da tela.
- **T02-V8** · baixa · ◐ Há valores sem token semântico: não quebram a medição mecânica, mas ferem 'nenhum número solto' no sentido da Lei 13.
  - *Prova:* padding-left 18 da barra (a escala de espaço tokens.css:76-78 não tem 18; o 18 que existe é --n-unidade-g) · altura 30 da barra (só existe --poco-30) · marcadores 10/11/12 sem token · letter-spacing 0,1 / 1,4 / 1,5 / −0,4 só em comentário (tokens.css:54-64)
  - *Correção do verificador:* O letter-spacing 0,1 da hora (00-tela.html:17) não aparece nem em comentário de tokens.css. É número solto de vez, não 'só em comentário'. Os valores 18, 30 e 0,1 são todos da barra do sistema, que componentes.md:15 declara 'desenho do Android · não é do app'. Isso …
- **T02-V9** · baixa · ✔ A frase de Caruaru quebra deixando 'usar' sozinho, e isso depende das medidas da Barlow empacotada.
  - *Prova:* PNG 00: 'pacote vencido · sincronize antes de' em y≈722 e 'usar' em y≈750 @2x · 00-tela.html:7 carrega ../05-recursos/fontes/barlow.css
- **T02-V11** · baixa · ✔ HU-T02-1 fala de 'empresas' e 'permissão', e o mock não tem nenhum dos dois como dado.
  - *Prova:* mocks.js:983 empresa é objeto único · nenhum campo de permissão em M (33 chaves de topo, node) · 00-tela.html:26 empresa só como rótulo

</details>

#### T03 · Sincronizar

- **T03-V1** · media · ◐ Na falha, a linha Ativos continua com o glifo 'agora · o passo que corre', mesmo parada
  - *Prova:* 01-estado-falha-de-rede.html (igual à 00:66, quadrado 12 --tinta). A folha 3 tem 'pausa · parou, sem culpa' e 'sem sinal · o link caiu'. Pela Lei 2 (leis.md:10), a falha deveria morar no elemento que parou.
  - *Correção do verificador:* O achado vale. A linha está errada: o glifo está em 00-tela.html:45 e 01.html:35, não na 00:66.
- **T03-V2** · media · ◐ O padding de 18 do poço e a altura de 18 da barra ficam fora da escala de espaço
  - *Prova:* 00-tela.html:42 'padding: 18px 16px' (e 02/03/04:42), 00:46 'height: 18px'. tokens.css:76-78 e folha-1: espaço 'de 2 em 2 — 2 … 16 · 20 · 24'. O 18 só existe como --n-unidade-g (tipo), por isso a checagem por valor do coordenador não pegou.
  - *Correção do verificador:* As linhas estão erradas: é :29 e :32, não :42 e :46. E o achado é de escala do sistema, não um desvio da T03: o próprio design system desenha com 18 (a folha na folha-2 e o placar na folha-5).
- **T03-V10** · media · ◐ O fim da escala (8) não tem regra
  - *Prova:* 03.html:55 e 04.html:55 '8'. Com um pacote de 4 dias a escala também termina em 8. O 8 só coincide com pac-uo-03.diasAtras, ou seria bloqueioDias + 1 — nada declara.
  - *Correção do verificador:* O achado vale. A linha é a :37, não a :55.

<details><summary>12 de gravidade baixa</summary>

- **T03-V3** · baixa · ◐ A unidade ao lado do número de 40 tem dois tamanhos no mesmo bloco
  - *Prova:* 00:44 'de 10' a 18px; 02:44, 03:44 e 04:44 a 17px (17 é --t-botao). folha-1: 'unidade · 12 junto de número até 34 · 18 junto de 48 e 62' — o 40 não está coberto.
  - *Correção do verificador:* Os dois tamanhos no mesmo bloco são reais. Mas 'o 40 não está coberto' é falso: a folha-1 desenha o 40 com unidade de 18, então a 00 segue a folha e o 17 das 02/03/04 é que diverge. O padding-left também diverge: 6 na T03 contra 3 na folha. As linhas certas são :31, …
- **T03-V4** · baixa · ◐ O gap interno do poço muda de 10 pra 8 entre a 00 e as outras
  - *Prova:* 00-tela.html:42 'gap: 10px' contra 02/03/04:42 'gap: 8px'.
  - *Correção do verificador:* O fato vale. A linha é a :29, não a :42.
- **T03-V5** · baixa · ◐ O 'processo correndo' da 00 é um link tocável e não tem a linha de explicação da folha
  - *Prova:* 00-tela.html:98 '<a href="#p" …>Baixando · não saia da tela'; padding de baixo 32. A folha-2 desenha um <span> não tocável com a segunda linha 'A saída volta quando o autoteste terminar' e padding de baixo 24.
  - *Correção do verificador:* O que vale é o primário do processo ser um <a> tocável, na 00-tela.html:63 e não na :98. O pé de 32 não é defeito: leis.md:30 manda 'em botão, com 32', e a folha fecha com 24 porque termina numa linha de texto. A segunda linha é uma variante da folha. A regra da peça …
- **T03-V6** · baixa · ◐ A frase da nota tracejada da 04 não segue a folha
  - *Prova:* 04-estado-pacote-vencido.html:60 '13px; line-height: 1.55' contra folha-4, nota tracejada '12px … line-height: 1.45'. O 1,55 não é token.
  - *Correção do verificador:* O desvio vale. A linha é a 04.html:42, não a :60. E o tokens.css não tem token nenhum de line-height, então o 1,45 da folha também não é token.
- **T03-V7** · baixa · ◐ Os avisos da 01 e da 03 têm duas frases, e a Lei 7 pede uma
  - *Prova:* leis.md:15 'poço, rótulo, uma frase'; textos.md:11 'Nada se perdeu. Ao reconectar, continua de onde parou.'; textos.md:19 'Dá pra trabalhar. Com 7 ele bloqueia — …'.
  - *Correção do verificador:* É verdade que a 01 e a 03 têm duas frases. Mas a folha que é norma também desenha um aviso de duas frases. A ambiguidade é do sistema, se 'uma frase' é literal, e não um desvio só da T03.
- **T03-V8** · baixa · ✔ O número grande muda de sentido e repete a lista
  - *Prova:* Na 00, 'ATIVOS 6 de 10' conta a seção e repete a linha 'Ativos 6 de 10' (Lei 12, leis.md:20). Na 02, '16 de 16' conta o total. O mesmo bloco mostra grandezas diferentes.
- **T03-V9** · baixa · ◐ 'O LIMITE É 7 DIAS' fica centrado, longe do traço do limite, e a escala não tem unidade
  - *Prova:* 03.html:52-55 (três spans espalhados; o limite está a 87,5%, 03.html:49). '0' e '8' sem unidade, contra a folha-1 'voz · número sempre com unidade'.
  - *Correção do verificador:* As medidas valem. As linhas certas são :34 e :37, não :49 e :52-55. E a escala com rótulo central sem unidade é o padrão do design system (folha-5, placar), não uma invenção da T03.
- **T03-V11** · baixa · ✔ O volume baixado conta só 3 dos conteúdos do pacote
  - *Prova:* mock pacotes[].contem = {ativos, modelosAtivo, cartoes}. requisitos-v1.md:317-325 lista também módulos, blocos, presets, cercas e matriz de capacidades. O '16' é só desses três.
- **T03-V12** · baixa · ✔ O carimbo do pacote novo é a hora da baixa, não a do servidor
  - *Prova:* textos.md:15 '12/03 14:30' = HORA_NOMINAL; HU-T03-4 (tela.md:50) e requisitos-v1.md:338 'conta a partir do carimbo de geração do manifesto no servidor, não da data do download'.
- **T03-V13** · baixa · ◐ Lima fora de veredito na tela do download
  - *Prova:* 00:47 preenchido --lima-faixa com o download correndo; checks 'ok · aprovado · veredito' (folha 3) nas linhas baixadas, e a folha 3 tem 'ok cinza · feito, sem veredito' pra isso. Lei 1 (leis.md:9). Fica pra medição de lima do coordenador.
  - *Correção do verificador:* O achado vale como suspeita, e a medição de lima fica com o coordenador. A linha está errada: o preenchido está em 00.html:33, não na :47.
- **T03-V14** · baixa · ◐ O poço da falha tem 26 na T03 e 24 na folha
  - *Prova:* 01.html:43 poço 26 × 26; folha-4 'falha' poço 24 × 24; na mesma folha, 'aviso' e 'processo parado' usam 26.
  - *Correção do verificador:* O desvio vale. A linha é a 01.html:30, não a :43 (o arquivo tem 58 linhas).
- **T03-V15** · baixa · ✔ A 03 mostra ao técnico o id interno do mock
  - *Prova:* textos.md:19 'pacote pac-uo-02' é a chave do banco (M.pacotes[1].id). CLAUDE.md, proibidos: 'mencionar tecnologia, protocolo ou código pro técnico'.

</details>

#### T04 · Menu

- **T04-V1** · media · ✔ As cinco referências de folha e diálogo desenham o véu sobre uma página vazia, sem faixa nem cartões atrás, embora a semente tenha sessão aberta
  - *Prova:* PNG 05 a 09: cor em (360,400) = #09070D = véu .72 sobre #0F0D14. Nos HTML, a div do véu não tem nada atrás; o 06 cita M2C-0417 como sessão aberta
- **T04-V2** · media · ✔ No 01 e no 02 a Fila de saída não tem contador, embora o mock tenha itens esperando
  - *Prova:* textos.md:11 e :15 terminam em 'Fila de saída' sem número; M.filaSaida tem 6 não recebidas
- **T04-V4** · media · ◐ No 03, a falha fica só na faixa: os cartões que dependem do módulo seguem liberados, Conectar segue normal e não há Reconectar
  - *Prova:* 03-estado-faixa-modulo-com-falha.html: 9 ícones #AAEF00 (grep conta 9 lima além do LED vermelho). HU-T04-2 (dependentes desabilitadas com o motivo), leis.md:10 (Lei 2), HU-T05-9 (perda de link mostra Reconectar)
  - *Correção do verificador:* Lei 2 (leis.md:10) e estados.md:18 ('A falha mora no elemento que falhou') apoiam a referência, não o achado: a falha acende só na faixa. HU-T05-9 é da T05, e a T05/14 já tem Reconectar. Sobra só HU-T04-2 como argumento para desabilitar os dependentes, e isso é …
- **T04-V8** · media · ◐ 'O que se toca' de tela.md não cobre: ENCERRAR da faixa, o cartão Ativo (→T06), o cartão conectado com a sessão aberta, tocar em Ibura ou Caruaru na folha, e o destino dos primários dos diálogos
  - *Prova:* tela.md:15–19; logica.md:58–61 (ENCERRAR antes de homologar = 4 passos sem confirmação)
  - *Correção do verificador:* O ENCERRAR já está resolvido: logica.md:58–61, fluxos.md:39 e a decisão 26 definem os dois caminhos. O próprio logica.md:58–61 da prova é a solução. O Ativo selecionado é uma das 10 ferramentas (dominio.md:70), então cabe em 'cada ferramenta liberada → a tela dela' …

<details><summary>7 de gravidade baixa</summary>

- **T04-V3** · baixa · ◐ O pacote de Ibura, com 4 dias, está na faixa de aviso, mas a folha não avisa; e T02 e T04 dizem o mesmo dado de dois jeitos
  - *Prova:* M.pacotes pac-uo-02 diasAtras 4, limiares.avisoDias 3. T03/03 avisa. T02/textos.md:7 'pacote de ontem, 07:10' × T04 textos.md:35 'carregado ontem, 07:10'
  - *Correção do verificador:* A falta de aviso na lista não é achado: a T02/00 também lista Ibura sem aviso, e fluxos.md:29 põe o aviso na etapa seguinte, que é a T03/03 ao escolher. Vale só a segunda metade: o mesmo dado escrito de dois jeitos, e a T04 sem a hora de Ibura.
- **T04-V5** · baixa · ✔ As marcas da barra do prazo, em 25/50/75%, não caem em dia nenhum de uma escala de 7, e o dia do aviso (5º) não tem marca
  - *Prova:* 05-momento-folha-conta.html:56–59 (left 25%, 50%, 75%) = 1,75 · 3,5 · 5,25 dias; M.situacao.sessaoAcesso.avisoNoDia 5
- **T04-V6** · baixa · ✔ O cartão Refazer leitura tem um motivo de indisponível no mock (ma-03, sem mapa), mas nenhuma referência da T04 desenha esse cartão
  - *Prova:* M.modelosAtivo ma-03.mapaContadores = {declarado:false, motivo:'…Refazer leitura da CAN indisponível — acione o gestor.'}; HU-T08-4
- **T04-V7** · baixa · ◐ O pressionado dos cartões e das linhas de garagem não está desenhado, e o 'solta em 100ms' não é token
  - *Prova:* Nenhuma das 10 referências traz pressionado; movimento.md:24 ('Solta em 100ms'); tokens.css:110–112 (150/200/300)
  - *Correção do verificador:* O pressionado está desenhado de forma genérica: a folha-1 tem 'ESTADOS DE TOQUE · TODA PEÇA TOCÁVEL TEM OS TRÊS', com 'linha tocável · normal e pressionada', e movimento.md:24 dá a regra (a linha sobe pra --elevado). As linhas de garagem estão cobertas; os cartões do …
- **T04-V10** · baixa · ◐ palco.md diz que o marcador da coluna é o mesmo do app (poço 24, quadrado 10), mas o marcador do app na T04 é poço 30 com quadrado 11
  - *Prova:* palco.md:26; 07-momento-folha-trocar-de-garagem.html:44–45 (poço 30, quadrado 11×11 #AAEF00); folha-3 'escolhido · 11px'
  - *Correção do verificador:* O 24/10 do palco existe no app: é o marcador de rádio da peça 'justificativa' (folha-6, T13). O achado certo: o app tem três marcadores de escolhido (24/10 na T13, 26/12 na T02, 30/11 na T04), e 'o mesmo do app' em palco.md:26 não diz qual.
- **T04-V11** · baixa · ◐ As ferramentas liberadas não reportam estado nenhum (lida? gravada?): a HU-T04-5 só aparece nos motivos de espera
  - *Prova:* textos.md:7 (nomes sem estado, só o contador 2); textos.md:11 e :15 (motivos 'espera …')
  - *Correção do verificador:* O fato procede, mas é escolha declarada do design system: o cartão liberado mostra só o nome (componentes.md:60). A HU-T04-5 ('Não existe console de log… linguagem de campo') não exige estado no cartão do menu; pode valer dentro de cada ferramenta. É pergunta para o …
- **T04-V12** · baixa · ✔ 'Sair da conta' é diálogo no menu, e a HU-T01-12 promete 'tela própria'
  - *Prova:* dominio.md §5 HU-T01-12 ('Sair tem tela própria'); 06-momento-folha-conta-sair-com-sessao-aberta.html:35 (role=dialog)

</details>

#### T05 · Conectar módulo

- **T05-V1** · media · ✔ Últimas linhas com altura fora de token, e diferente entre estados
  - *Prova:* Última linha da pré-checagem: 43 (05), 45 (06-09, 11, 12, 14, 15), 38 (10), min-height 42 + padding 8 (13). Última linha de módulo: 56 (00/04, contra 50) e 76 (01, contra 72). A linha de 43/45 leva poço 24, e leis.md:32 diz '44 leva 30'. O cartão da pré-checagem muda …
- **T05-V3** · media · ✔ A faixa 'sem ativo' não está em nenhuma folha, e a faixa ganha borda entre T06 e T07
  - *Prova:* 05/13 html: 'height: 52px; background: #16131D;' sem border-bottom, com 'sem ativo' #867E9A. A 'faixa · sessão aberta' da folha-2 tem 'border-bottom: 1px solid #2E2840' e placa #A9A2BC. T06/00 não tem borda, T07/00 tem. movimento.md:16 diz que a faixa não muda entre …
- **T05-V4** · media · ✔ O contador lima não é peça, e o contador de falha nunca é usado
  - *Prova:* 05/13: '11' em #AAEF00. A folha-6 só desenha o neutro (#A9A2BC, '7 de 12') e o de falha (vermelho, '1 reprovado'). As 06 a 12, que têm reprovada, mostram o neutro 'N de 11'
- **T05-V5** · media · ✔ O pool esgotado mostra só um dos dois limites
  - *Prova:* 12: só '4 de 4' de regiões. O caso tem posicoesUsadas 8 e posicoesMax 8. dominio.md:157 ('dois limites'), requisitos-v1 T05 ('dois limites, não um') e o gate ('pool de índices esgotado nos DOIS limites')
- **T05-V8** · media · ✔ O cabeçalho das falhas mostra a placa antes de o ativo ser escolhido
  - *Prova:* 07-12, 14, 15: 'serial · placa' (ex.: 'M2C-0451 · QTM-5S79', de M.ativos[a-18]). 05/13 com faixa: 'sem ativo'. O cabeçalho do herói enquanto corre não tem referência
- **T05-V9** · media · ◐ Tocar num módulo (01 → 00) remonta a tela, e animacao.md não cobre essa troca
  - *Prova:* 01: cartão de linhas de 72, y 133→499. 00: bloco escolhido 98→395 + lista de 50 em 435→643. Nenhuma linha de animacao.md trata o 'tocar num módulo' nem o 'Conectar' que troca a busca pela pré-checagem
  - *Correção do verificador:* A 01 é momento e a 00 é tela: é fluxo, e a lei de não remontar vale para estado. O achado que se sustenta é outro: animacao.md não diz como a 01 vira a 00, nem como o Conectar vira a pré-checagem, e a mudança de desenho é grande.

<details><summary>8 de gravidade baixa</summary>

- **T05-V2** · baixa · ◐ O rótulo de topo muda de desenho entre estados
  - *Prova:* 06: 12px com letra 1.2 ('M2C-0999 · fora do cadastro'). 07-15: 11px com 1.4. A lista sobe 1px (98 contra 97). Nenhum dos dois letter-spacing é token
  - *Correção do verificador:* O 11/1.4 é o rótulo de topo declarado junto do token (tokens.css:55, folha-1). Só o 12/1.2 da 06 está fora. E o intervalo certo é '07-12, 14, 15', porque a 13 tem faixa e não tem rótulo.
- **T05-V6** · baixa · ✔ O aviso da 15 não é o desenho do 'aviso' da folha
  - *Prova:* 15 html: poço 24 com ícone 14. folha-4 'aviso' e 'processo parado': poço 26 com ícone 16. O 'falha' da folha usa 24/14. leis.md:15 diz 'Aviso tem um formato só'
- **T05-V7** · baixa · ◐ A falha do serial não tem causa escrita
  - *Prova:* 06: linha 1 com X e 'M2C-0999' em vermelho, sem a linha de causa. A 07 tem 'não atendido nesta versão'. dominio.md:153 diz 'nomeia pela letra, bloqueia, registra no M2', e o registro não aparece
  - *Correção do verificador:* A causa está escrita, só que no rótulo de topo ('fora do cadastro'), e não embaixo da linha, como pede a peça 'reprovada, com causa'. O registro no M2 também não aparece na 07 (dominio.md:154), e é um fato do servidor que talvez nem precise estar na tela. Não é só da …
- **T05-V10** · baixa · ✔ O vazio (03) remonta o desenho da 00
  - *Prova:* 03: poço 98→615 e lista ausente, contra 00: poço 98→395 e lista 435→643 (varredura na x=20)
- **T05-V12** · baixa · ◐ Os glifos não são Lucide, e não há pasta de ícones
  - *Prova:* 05 html: check 'circle r=9 + M8 12.3l2.6 2.6L16 9.5'. 14: wifi cortado desenhado em arcos. leis.md:22 e 06-prototipo/CLAUDE.md pedem Lucide. ls 05-recursos → fontes, marca. LEIA-PRIMEIRO diz 'a marca, a fonte e os ícones'
  - *Correção do verificador:* A falta de pasta de ícones é de propósito: 05-recursos/README.md:7 manda tirar os ícones do lucide-react, e é a isso que LEIA-PRIMEIRO.md:22 se refere. O achado real é outro: os glifos das referências foram desenhados à mão, então o protótipo com Lucide vai divergir …
- **T05-V13** · baixa · ◐ Três motivos e um campo do mock não são lidos pela tela
  - *Prova:* O motivo de busca-vazia e o de modelo-sem-driver são diferentes do texto das referências. firmwareDisponivel '2.3.5' 'tem leitor em T05' (mocks.js:463), mas não aparece em referência nenhuma
  - *Correção do verificador:* A prova só mostra dois motivos, não três. O terceiro só fecharia se contasse o canal-aberto.tratamento (mocks.js:535), que também não aparece na 13. A parte do campo se sustenta.
- **T05-V14** · baixa · ✔ O mesmo fato vem de duas fontes nos casos de espaço e de cercas
  - *Prova:* conteudo-nao-cabe guarda 128 e 96, que também saem de ma-01.conteudoRegistros e da matriz ECO. pool-esgotado guarda regioesMax 4, que também está na matriz FULL. O '4' do herói sai de M.cercas; o do a-05 sai do caso (M.cercas não tem região do a-05). Foi por isso que …
- **T05-V16** · baixa · ✔ Token de linha duplicado, com comentários que se contradizem
  - *Prova:* tokens.css:86: '--linha-precheck-sessao: 38px; exceção declarada'. componentes.md:53: 'a mesma 38 — a exceção acabou'. tokens.css:103-104 também redefine --poco-24, --poco-32 e --poco-44

</details>

#### T06 · Selecionar ativo

- **T06-V1** · media · ◐ Situações que o mock e o domínio criam na T06 e não têm referência: busca em uso, ativo sem módulo, módulo já vinculado a outro ativo, envio em andamento
  - *Prova:* a-07 PDZ-3F26 e a-08 QRA-8G70 (Várzea) sem módulo, 'exercitam a trava do princípio 5' (mocks.js:174-175) · 8 dos 10 de Várzea esperam módulo diferente do M2C-0417 (node), e requisitos-v1.md:474 diz 'Módulo já vinculado a outro ativo exige desvínculo consciente' · …
  - *Correção do verificador:* O número está errado. Em Várzea, 1 ativo espera o M2C-0417 (a-01), 7 esperam outro módulo (a-02 a a-06, a-09 e a-10) e 2 não têm módulo (a-07 e a-08). São 7, ou 9 contando os sem módulo, mas nunca 8. As quatro situações sem referência se confirmam.
- **T06-V2** · media · ✔ Não há referência de processo (leitura do chassi, matriz de pinos rodando) e a ordem das checagens não está declarada
  - *Prova:* 'processo correndo' listado em tela.md:30 e ausente nas 7 referências · movimento.md:30-39 não tem ritmo para o chassi · 05/06 não mostram o par, e o KHT-4B08 (ma-01) também teria o chassi lido
- **T06-V3** · media · ✔ O ESCOLHIDO perde o lima na 02 e fica lima na 03, as duas sem vínculo provado; a regra não está escrita
  - *Prova:* 02.html:39 rótulo #867E9A, sem traço lima, padding 18 · 03.html:38-39 rótulo lima, traço lima, padding 22 · leis.md:9 'Lima marca … escolhido'
- **T06-V4** · media · ✔ O mock afirma um conflito sem saída para a-06 na T06, mas não tem caso nem regra que o produza: a matriz de pinos só existe como dois casos
  - *Prova:* mocks.js:882-883 'a-06 … M2C-0362 só aparece por CABO e o arnês dele dá conflito sem saída em T06' · M.casos só tem conflito-pinos-resolvivel (a-04) e conflito-pinos-sem-saida (a-11) · M2C-0362 está na lista da T05 (T05 00-tela.html)

<details><summary>7 de gravidade baixa</summary>

- **T06-V5** · baixa · ✔ Variantes usadas nesta tela que nenhuma folha desenha
  - *Prova:* par que bate (01.html:43-54), escolhido neutro (02.html:38), escolhido com trava neutro (05.html:38, #3A3350), rodapé com primário apagado sem legenda (00-tela.html:98-100), faixa 'sem ativo' (00-tela.html:24-31) — comparadas com os HTML das folhas 2, 4 e 6
- **T06-V6** · baixa · ✔ Na 06, a frase longa quebra alinhada à esquerda, e a linha de baixo fica centrada
  - *Prova:* 06.html:43 span sem text-align, dentro de coluna com align-items center · PNG 06: 'O fio branco é do sensor…' começa em x≈33, e 'Acione o gestor.' aparece centrado em y≈479
- **T06-V7** · baixa · ◐ Várias ações não têm destino declarado
  - *Prova:* tela.md:15-20 não diz para onde vão 'Usar leitor sem fio' (05), 'Solicitar correção de cadastro' (02), 'Escolher outro veículo' (02) e 'Voltar ao menu' (00/02). O mock não tem dado para a solicitação de correção (grep 'correção' em mocks.js: nada)
  - *Correção do verificador:* O grep 'correção' em mocks.js não dá 'nada': acha as linhas 1000 e 1033 ('correção 1 do gate', 'correção 3 do gate'). São comentários sem relação com a tela. O achado continua de pé: não há dado para a solicitação de correção.
- **T06-V8** · baixa · ✔ A semente diz 'dez ônibus', mas o pacote tem 9 ônibus e 1 caminhão coletor
  - *Prova:* tela.md:9 · node: 10 ativos em uo-01, 9 com ma-01 · a-09 KNB-5H39 é ma-02 'Caminhão coletor 17.230'
- **T06-V9** · baixa · ✔ O marcador de escolha tem três tamanhos pela pasta, e a lei do poço na linha não cobre a linha de 72
  - *Prova:* linha de ônibus: poço 30 + marcador 11 (00-tela.html:42) · T02 'escolha numa lista' (folha 3): poço 26 + marcador 12 na mesma linha de 72 · palco.md:26 'poço de 24 com o quadrado lima de 10' · leis.md:32 só fala de 38/44/50
- **T06-V10** · baixa · ◐ O próprio movimento.md manda o pressionado trocar cor, contra a regra de só transform e opacity; as linhas e o botão da T06 herdam isso
  - *Prova:* movimento.md:24 'o primário vai pra --roxo-pressionado … a linha tocável sobe pra --elevado' × movimento.md:43 'transform e opacity'
  - *Correção do verificador:* A tensão está no texto, mas não é contradição forçada. O pressionado pode trocar de cor na hora, e troca instantânea não é movimento. O 'solta em 100ms' se faz com uma camada que esmaece por opacity, e o afundar de 2% já é transform. Vale uma linha de implementação, …
- **T06-V11** · baixa · ✔ A frase do par muda de peso entre a 01 e a 02 (600 → 500), então o estado mexe no desenho
  - *Prova:* 01.html:53 13/600 · 02.html:53 13/500 com line-height 1.4 (igual à folha 4)

</details>

#### T07 · Dados da CAN

- **T07-V1** · media · ✔ A faixa da sessão não tem flex-shrink: 0, nem na referência nem na folha: encolhe quando o conteúdo estoura.
  - *Prova:* 00-tela.html:25 (a barra do sistema na :16 tem flex-shrink: 0; a faixa não tem) · o mesmo no bloco 'faixa · sessão aberta' da folha-2 · render do 01: faixa com 51,4px
- **T07-V2** · media · ✔ A T07 só tem desenho para o modelo ma-01; o mock tem três modelos com sinais diferentes e nenhum campo diz qual peça cada sinal usa.
  - *Prova:* node: ma-01 com 12 sinais (7 estáticos), ma-02 com 8 (6), ma-03 com 6 (5) · ma-02 sem GPS e com Temperatura do óleo; ma-03 com Horímetro 4.812 h · a-09 KNB-5H39 (ma-02) está em Várzea e é porta natural da T06/03
- **T07-V3** · media · ✔ O tambor tem 6 rodinhas; o mock tem hodômetros de 5 dígitos e um horímetro.
  - *Prova:* mocks.js:603 '96.410 km' · mocks.js:650 '87.604 km' · mocks.js horímetro '4.812 h' em ma-03 · 00-tela.html:73-78: 6 células fixas

<details><summary>6 de gravidade baixa</summary>

- **T07-V4** · baixa · ✔ Lima fora de veredito, de escolhido e do texto do primário: o último dígito do tambor e o texto da faixa '12,0 — 15,0'.
  - *Prova:* 00-tela.html:78 dígito '0' color #AAEF00 · 00-tela.html:63 span color #AAEF00 · leis.md:9 (Lei 1) · componentes.md:82 declara 'faixa lima' para a barra, não para o texto nem para a rodinha · o coordenador confere no render
- **T07-V5** · baixa · ✔ O gap da grade de meia largura na tela (10) não é o das folhas (12).
  - *Prova:* 00-tela.html:83 gap: 10px · folha-5 html, quadros 'leitura pequena', 'leitura com mínimo' e 'sinais liga-desliga': grid gap 12px
- **T07-V6** · baixa · ✔ Os estados perdem o 'Voltar ao menu': 'Configurar módulo' vira link e sair da tela só se faz pelo ENCERRAR ou seguindo para a T09.
  - *Prova:* textos.md:11/:15/:19 terminam em 'Ler novamente · Configurar módulo' · textos.md:7 termina em 'Configurar módulo · Voltar ao menu'
- **T07-V7** · baixa · ✔ O marcador fica posicionado pela borda esquerda: o centro dele cai 2px (grande) ou 1,5px (pequeno) à direita do valor.
  - *Prova:* 00-tela.html:60 left: 56%, width: 4px · :110 left: 75%, width: 3px
- **T07-V8** · baixa · ◐ O traço do poço vazio usa a cor da borda do poço, não a de traço.
  - *Prova:* 02-estado-sem-leitura.html:105 e 03-estado-dominio-mudo.html:90: span 10×1 background #332C49 (--borda-poco) · tokens.css:34 --marca #4E475E 'traço, poço vazio'
  - *Correção do verificador:* Não é desvio da T07: a T07 segue o desenho da família e das folhas 3, 4 e 5, que fazem o traço do poço vazio em #332C49. O conflito é entre o comentário do --marca (tokens.css:34) e todas as folhas. Há ainda um segundo desenho, em #6E6683 (--marca-limite), na T14, na …
- **T07-V9** · baixa · ✔ O contador neutro conta os 5 dinâmicos no total: na T07 ele nunca passa de 7 de 12.
  - *Prova:* textos.md:7 '7 · de 12' · node: ma-01 com 12 sinais, 5 dinâmicos · HU-T07-3: 'não aprováveis aqui'

</details>

#### T08 · Refazer leitura da CAN

- **T08-V1** · media · ✔ O rodapé do relendo não segue o 'processo correndo' da folha: encolhe 38px e o botão desce 38px entre 00 → 01 → 02.
  - *Prova:* folha-2 'processo correndo': pé 24 + segunda linha de 40 = rodapé 141, igual ao de duas ações · 01-momento-relendo.html:93: pé 32, só o botão = 103 · PNG x=40: borda do rodapé em y 1318 (00) → 1394 (01) → 1318 (02); primário em 1348 → 1424 → 1348
- **T08-V2** · media · ◐ A caixa do meio troca de forma entre tela e momentos: 91 → 54 → 55 de altura, com o topo fixo em 550. Nenhuma das duas formas tem peça.
  - *Prova:* 00-tela.html:88 (coluna, rótulo 10, frase) × 01:88 e 02:88 (linha, rótulo 11, número 20) · PNG x=40: fecha em 1282, 1208 e 1210 (2×)
  - *Correção do verificador:* As alturas estão certas. Mas 'nenhuma das duas formas tem peça' exagera. A forma do 01/02 é a 'com contagem' da folha-4 sem o glifo, com rótulo de 11 em vez de 10 e padding 14 em vez de 10/12. A do 00 é da família 'aviso'/'processo parado' sem o poço do glifo. O …
- **T08-V5** · media · ✔ O ritmo da releitura, 'cada leitura chega', não está declarado em lugar nenhum.
  - *Prova:* movimento.md:30-39 (tabela dos processos sem T08) · 08-produto-real/o-que-o-prototipo-simula.md sem T08 · 06-prototipo/CLAUDE.md regra 8 'os tempos dos processos são os de movimento.md'
- **T08-V6** · media · ✔ Um ativo de 8 sinais chega na T08 pelo fluxo, e 'Os doze sinais' é texto fixo.
  - *Prova:* a-09 KNB-5H39, ma-02, uo-01, M2C-0371, sinaisCan.length = 8 (node sobre M.ativos) · porta natural na T06 (logica.md:56) · textos.md:7 'Os doze sinais apagam…' · nenhuma referência com 8 mostradores

<details><summary>7 de gravidade baixa</summary>

- **T08-V3** · baixa · ✔ O nome do mostrador sobe 1px quando o sinal acende.
  - *Prova:* traço 22px lh 1 (00-tela.html:40) × valor 17px lh 1.15 = 19,55 (01:40), conteúdo centrado em min-height 88 · PNG x=100: nome começa em y 408 (00) e 406 (01/02)
- **T08-V4** · baixa · ✔ 'mostrador · relendo' e 'mostrador · aceso' só diferem no padding horizontal (8 → 6), e o cartão muda de padding ao concluir, sem efeito visível.
  - *Prova:* 01-momento-relendo.html:39 'padding: 8px 8px' × 02-momento-concluida.html:39 'padding: 8px 6px' · folha-7 idem · valores centrados: nada se move no PNG
- **T08-V7** · baixa · ✔ Há valores fora de token além do 88 que a mecânica já apontou: todas as alturas de linha e três letter-spacing; e três tamanhos usam tokens de outro uso.
  - *Prova:* tokens.css sem line-height (1 / 1.15 / 1.3 / 1.45 / 1.55 nas 3 referências) · ls 0.1, 0.3 e 0.6 ausentes de tokens.css · 17px = --t-botao no valor, 22px = --t-titulo-tela no traço, 32 = --poco-32 no min-height do nome · leis.md:21 Lei 13
- **T08-V8** · baixa · ◐ O ENCERRAR segue ativo durante o relendo e nada diz o que ele faz no meio do processo.
  - *Prova:* 01-momento-relendo.html:31 (<a href='#encerrar'> #A9A2BC, igual ao 00) · rodapé diz 'Lendo · não saia da tela' · logica.md:58-61 só define ENCERRAR antes e depois de homologar
  - *Correção do verificador:* Não é verdade que nada diz o que o ENCERRAR faz: a logica.md:61 cobre qualquer toque antes de homologar, e isso inclui o meio da T08, que abre a sessão abortada. O que falta é só o destino da releitura interrompida (se ela para e o que fica apagado). O padrão também …
- **T08-V9** · baixa · ◐ A T13 tem um botão 'Refazer a leitura da CAN' que ninguém liga à T08, e a T08 só devolve ao menu.
  - *Prova:* T13 textos.md:43 ('Confira a alimentação e refaça a leitura da CAN.' · 'Refazer a leitura da CAN') · T13 tela.md 'item automático reprovado → a tela que corrige', sem nomear T08 · T08 textos.md:7 e :15: saída secundária só 'Voltar ao menu'
  - *Correção do verificador:* O botão da T13 não está ligado à T08 em nenhum documento: isso está certo. Mas 'a T08 só devolve ao menu' está errado. A concluída tem o primário para a T07. O que falta é voltar à T13, de onde o técnico veio.
- **T08-V10** · baixa · ✔ O botão apagado do relendo é um link na referência; na folha ele é inerte.
  - *Prova:* 01-momento-relendo.html:94 '<a href="#p"…>Lendo · não saia da tela</a>' × folha-2 'processo correndo' e folha-1 'primário · desabilitado' em <span>
- **T08-V11** · baixa · ◐ Há uma pendência de produto sobre a T08 que toca o estado da T13 e não tem referência.
  - *Prova:* 08-produto-real/pendencias.md:12 'refazer a leitura pode reprovar item do checklist que estava conforme? · não reprova'
  - *Correção do verificador:* A pendência existe e toca a T13. Mas não há buraco de referência: o padrão declarado é 'não reprova', e com ele a T13 não muda depois da releitura. Não há estado novo para desenhar. Só vira achado se o PM mudar o padrão.

</details>

#### T09 · Configurar módulo

- **T09-V1** · media · ✔ O bloco que ainda não gravou tem três desenhos diferentes
  - *Prova:* 00: círculo #4E475E + versão apagada (E05, C03) + descrição. 01: traço + valor vazio + `não foi alcançado`. 02/03: traço + `—` + descrição. Na folha 3, 'espera · ainda não' é o círculo e 'traço · não se aplica' o traço. No 02, Eventos e Conexão ainda vão gravar, então …
- **T09-V2** · media · ✔ O contador `x de 6` aparece no 02 e no 03, mas não na 00 com o mesmo progresso nem no 01
  - *Prova:* textos.md:15 e 19 têm `3` `de 6`. textos.md:7 (00, 3 feitos) e :11 (01, 2 feitos) não têm contador
- **T09-V3** · media · ◐ O trilho branco do elo que grava não está em animacao.md
  - *Prova:* 00-tela.html:130: trilho do Leitor background #F2F0F7. animacao.md:7-9 só falam do quadrado e do trilho que acende lima
  - *Correção do verificador:* A linha certa é 00-tela.html:82. O arquivo tem 126 linhas e não existe a :130. E animacao.md:9 diz 'acende', sem nomear o lima. O resto do achado vale.
- **T09-V4** · media · ✔ A folha 5 já desenha a mesma cadeia com duas alturas: 72 quando concluída, 70 quando recusada
  - *Prova:* folha-5 HTML: 'cadeia concluída' tem 5× min-height 72px com padding 4/0/14, e 'cadeia recusada' tem 5× min-height 70px com padding 4/0/12. A 00 inventa uma terceira (86) e o 02/03 uma quarta (68)

<details><summary>9 de gravidade baixa</summary>

- **T09-V5** · baixa · ✔ As alturas 86, 70 e 68 não são token, e 72 só bate por coincidência com o token de outra peça
  - *Prova:* tokens.css:85 --linha-escolha: 72px é a linha de escolha, não o elo. O arquivo mecânico lista 86, 70 e 68 fora de token
- **T09-V6** · baixa · ✔ Os feitos do 01 usam outra tinta na descrição
  - *Prova:* 01-estado html: descrição de Limpeza e Ativo em #A9A2BC. Na 00, 02, 03 e 04 é #867E9A, nos mesmos blocos feitos
- **T09-V7** · baixa · ✔ Os glifos das referências não são os do Lucide, e 05-recursos manda lucide-react
  - *Prova:* círculo r=9 (Lucide usa r=10), check 'M8 12.3l2.6 2.6L16 9.5' (Lucide 'm9 12 2 2 4-4'), wifi-off em arcos próprios com ponto preenchido (fill #A9A2BC), pausa em duas linhas. Os caminhos são idênticos aos da folha-3. leis.md:22 e 05-recursos/README.md:7: 'lucide-react …
- **T09-V8** · baixa · ✔ O 02 diz que o link caiu, mas usa o glifo neutro
  - *Prova:* 02 html: glifo stroke #A9A2BC. Na folha 3, 'sem sinal · o link caiu · falha' é o vermelho e 'sem sinal neutro · sem conexão · aviso' o cinza
- **T09-V9** · baixa · ✔ Os pares dos estados da T09 são chave de vários casos ao mesmo tempo
  - *Prova:* node: M2C-0301/a-02 aparece em can-fora-esperado, conexao-falha, can-estatico-isolado e bloco-recusado. M2C-0312/a-03 em sinal-aguardando-ciclo, identificador-divergente, link-perdido, can-estatico-ausente e queda-na-cadeia
- **T09-V10** · baixa · ✔ O gate aprova, mas não confere os campos da T09
  - *Prova:* node 04-dados/gate-cobertura.js: 68 OK, 'GATE APROVADO'. gate-cobertura.js:108-128 confere a ordem, o arraste e o diff, mas não versoes, escopos, leituraFinal nem se bloco/noBloco dos dois casos existe em ordem
- **T09-V11** · baixa · ✔ O letter-spacing não tem token nenhum
  - *Prova:* tokens.css não tem --letra-*. A T09 usa 0.1px (hora), 0.3px (serial), 0.6px (ENCERRAR), −0.3px (h1), 1.5px (rótulo) e 1px (string da prova, que nem aparece nos comentários de tokens.css)
- **T09-V12** · baixa · ✔ estados.md chama `cadeia` de caso do mock, e não é
  - *Prova:* estados.md:11 'Caso do mock: `cadeia`'. Object.keys(M.casos) (33) não tem 'cadeia': é M.cadeia, coleção de topo
- **T09-V13** · baixa · ✔ A transição 00 → 04 troca o rodapé e faz a prova aparecer, e nada disso tem movimento declarado
  - *Prova:* diff 00×04: some o 'processo correndo', entra 'uma ação' (padding de baixo 24 → 32, topo 659 → 697), aparece o bloco da prova. animacao.md:5-10 não cobre nenhuma das três coisas

</details>

#### T10 · Calibração

- **T10-V1** · media · ✔ Campos da calibração no mock sem nenhum leitor nas 5 referências
  - *Prova:* alvos rotação 1200 e velocidade 60 (mocks.js:726); tolerancia inteira (740-745); rotuloCampo 'Quilômetros no painel' e 'Horas no painel' (708, 710); grandezas[].icone (706-710); ultimas['a-09'].velocidade 12 (766); o motivo longo de casos['grandeza-indisponivel'] …
- **T10-V2** · media · ✔ O gate não recomputa nada da calibração: os 8 números derivados da T10 não estão protegidos
  - *Prova:* gate-cobertura.js:80 só confere heroi.etapas.calibracao.foto; :123 só confere que 'grandeza-indisponivel' existe. Nada sobre bruto, painel, ultimas ou porModelo. node 04-dados/gate-cobertura.js → 'GATE APROVADO'.
- **T10-V3** · media · ◐ Nenhum estado da T10 tem porta natural limpa: a-22 está numa UO bloqueada, e a porta do a-09 cai na 02, sem saída
  - *Prova:* a-22 é uo-03 (mocks.js:205). pac-uo-03 tem diasAtras 8 e bloqueioDias 7 (node M.pacotes). mocks.js:640: 'CARUARU … BLOQUEADO'. O 'Alcançável em a-22' de mocks.js:723 só vale depois da T03. a-09 é Várzea, e o fluxo o leva à 02, com o primário desabilitado e sem 'motor …
  - *Correção do verificador:* A parte da a-22 se confirma. Na a-09 a afirmação exagera: o mock tem, sim, a leitura de motor ligado da ma-02 (rotação 1.240 rpm, velocidade 31 km/h, mocks.js:934). Mas ela está declarada com a T14 como único leitor, e nenhuma referência ou gatilho da T10 liga o …
- **T10-V4** · media · ✔ A altura do valor alvo não é medida, é sobra da coluna
  - *Prova:* 00 html:58, flex-grow:1. Alturas medidas: 146 (00/01), 257 (02), 172 (03), 140 (04).
- **T10-V5** · media · ◐ Na passagem 00→01 mudam cinco coisas que o animacao.md não cobre
  - *Prova:* diff 00×01: segmento #F2F0F7→rgba(170,239,0,.5) (l.41); rótulo e cor do valor em poço (l.48-49); traço lima do alvo some e o rótulo vai a #867E9A (l.58-59); o check surge (l.54); o primário troca de texto (l.89). animacao.md:7-9 só fala de tambor, régua e foto.
  - *Correção do verificador:* São pelo menos sete, não cinco. Além das cinco citadas, o animacao.md também não cobre a legenda do alvo, que muda para 'o mesmo que o módulo agora conta' (l.61), nem a legenda da foto, que muda para 'Também vale no checklist, na Seção B' (l.68).

<details><summary>6 de gravidade baixa</summary>

- **T10-V6** · baixa · ◐ O rótulo da caixa de não-aplicáveis muda conforme de onde vem o motivo, e essa regra não está escrita
  - *Prova:* 00-03: 'NÃO SE APLICAM NESTE MODELO', com todos os motivos do cadastro. 04: 'NÃO SE APLICAM', com motivo do módulo (textos.md:23; 04 html:73).
  - *Correção do verificador:* É verdade que a regra não está escrita. Mas a caixa da 04 não tem só motivo do módulo: mistura dois do módulo com um do cadastro. A regra que se lê é outra: basta um motivo vir do módulo para o rótulo perder 'NESTE MODELO'.
- **T10-V7** · baixa · ◐ O primário desabilitado da 02 não tem linha em componentes.md
  - *Prova:* 02 html:79 (#1A1726, borda #2B2540, #867E9A). folha-1: 'primário · desabilitado — Gravando · não interrompa', que diz o que acontece. folha-2: 'Conectar' só dentro de 'com legenda'. componentes.md, folha 1 (l.9): só a linha 'falha'.
  - *Correção do verificador:* A 02 não tem peça própria em componentes.md, e contraria a regra da folha-1, porque diz a ação e não o que está acontecendo. Mas o primário desabilitado com o nome da ação, esperando uma condição, já tem linha: 'diálogo com ciência · o primário espera o check' …
- **T10-V8** · baixa · ✔ 6 das 16 peças da lista de tela.md não aparecem em nenhuma referência da T10: a lista é a coluna 'Telas que usam', contaminada
  - *Prova:* tela.md:24-32 × os 5 PNGs: faixa · sem ação, processo correndo, com legenda, a marca no login, campo e campo focado ausentes. componentes.md:106-108 põe 'a marca no login', 'campo' e 'campo focado' nas 16 telas.
- **T10-V9** · baixa · ◐ Os três poços da tela têm canto reto, e o token diz raio 4 em tudo
  - *Prova:* 00 html:47, 58 e 64: sem border-radius. A caixa de não-aplicáveis tem raio 4 (l.73). tokens.css:93: '--raio 4px; em tudo'. As folhas 7 e 8 desenham igual, reto.
  - *Correção do verificador:* É verdade, mas não é da T10. Todos os 159 poços desenhados nas 8 folhas do design system são retos. O conflito é entre o comentário do token ('em tudo') e o poço da família inteira, e a decisão cabe ao design system, não à tela.
- **T10-V10** · baixa · ◐ 'Semear de novo' grava o contador a cada toque, e o domínio limita escrita de contador a uma vez
  - *Prova:* dominio.md §4.2 passo 1: 'Gravar contadores … (uma vez — limite de ciclos de escrita)'. 03 e 04 oferecem 'Semear de novo' sem limite (textos.md:19, 23). §3.4 não tem trava da T10.
  - *Correção do verificador:* 'a cada toque' é inferência: nada diz que 'Semear de novo' repete dentro da sessão. O 'de novo' é em relação a uma calibração anterior (ultimas). A tensão real é outra: a T10 grava e relê o contador na hora de semear (01), e o §4.2 põe 'gravar contadores', uma vez, …
- **T10-V11** · baixa · ✔ O mesmo item de checklist tem dois textos no mock
  - *Prova:* calibracao.itemChecklist.rotulo = 'Painel do ativo com hodômetro e horímetro legíveis' (mocks.js:771-772) × checklist b-painel-legivel.pergunta = 'Painel com hodômetro e horímetro legíveis' (mocks.js:837-838), com o mesmo id.

</details>

#### T11 · Conferir configuração

- **T11-V1** · media · ✔ O valor no módulo (noModulo) dos cinco blocos não aparece em nenhuma referência. É dado sem leitor.
  - *Prova:* mocks.js:497-502 noModulo 'tradução frota v1', '3 regiões', 'leitor no fio branco', 'intervalo 60 s', 'rede do módulo antiga' · nenhum desses textos em T11/textos.md · o próprio mock diz, em mocks.js:891-896, que dado sem leitor é armadilha
- **T11-V2** · media · ◐ O estado 01 depende de dois casos (a semente diff-divergente e o indice-nao-classificado), e a composição não está declarada.
  - *Prova:* indice-nao-classificado = {ativoId, moduloSerial, posicao: 7, motivo}: não traz blocos nem contagem · o PNG 01 mostra '5 de 5' e os cinco traços, que só vêm de diff-divergente · estados.md:8 cita só 'indice-nao-classificado'
  - *Correção do verificador:* A composição está declarada em forma de regra geral: a decisão 05 diz que o estado é a tela-base mais o conteúdo do caso. Assim, o 01 é a base diff-divergente mais o indice-nao-classificado, e os dois são do mesmo a-16/M2C-0438 (mocks.js:496 e :504). Falta só deixar …
- **T11-V3** · media · ◐ Não há referência da leitura correndo nem do 'processo correndo', e o cabeçalho já nasce com o veredito.
  - *Prova:* tela.md:27 lista 'processo correndo' · as 3 referências não o mostram · animacao.md:7 'a leitura corre' · 00-tela.html:60 veredito já presente · textos.md sem texto de leitura em andamento
  - *Correção do verificador:* O achado se sustenta, mas a linha do veredito é 00-tela.html:35-37, não :60. A prova mais fraca é tela.md:27: aquela lista de peças é genérica e inclui peças que a T11 não usa ('a marca no login', 'campo'). A prova forte é animacao.md:9, que pede um quadro de começo …
- **T11-V4** · media · ◐ 'Só registrar o diagnóstico' não tem dado onde registrar.
  - *Prova:* tela.md:16 'registra e volta ao menu' · M.filaSaida tem só os tipos 'Evidências da instalação', 'Foto de calibração' e 'Checklist de homologação' · HU-T11-7 'o diff sobe mesmo sem reenvio'
  - *Correção do verificador:* Em parte a pasta já cobre isso: o protótipo declara que 'nada é salvo', então não precisa guardar o diagnóstico. O que fica em aberto é o efeito visível. Se o diagnóstico entra na fila, a fila (T15) e o contador do menu (T04) mudariam, e não há tipo de item nem regra …
- **T11-V5** · media · ✔ Não está escrito como se chega ao momento 02 no fluxo. O painel abre divergente, e a coluna do palco não lista momentos.
  - *Prova:* logica.md:97 diz só 'nada diverge' · logica.md:47 semente diff-divergente · palco.md:24 'lista só os estados' · fluxos.md:15 'T04 -.consultas.-> T11' · só a faixa do PNG 02 (a do herói) sugere o caminho
- **T11-V6** · media · ✔ A faixa muda 1px entre telas: umas têm o traço de baixo e outras não. Isso contradiz 'a faixa fica parada'.
  - *Prova:* grep nas 00-tela: com border-bottom #2E2840 em T07 T09 T10 T13 T14 T15 T16; sem em T06 T08 T11 T12 · movimento.md:16 'A barra do sistema e a faixa da sessão ficam paradas'

<details><summary>4 de gravidade baixa</summary>

- **T11-V7** · baixa · ✔ indice-nao-classificado.posicao e .motivo não aparecem na tela. O texto da nota vem do textos.md.
  - *Prova:* mocks.js:504-505 motivo 'Conteúdo gravado que o app não reconhece — não pertence a nenhum bloco.' × textos.md:11 'Fora de todos os blocos. Regravar limpa.' · a posição 7 corretamente não aparece (índice de memória é vocabulário proibido, dominio.md:80)
- **T11-V8** · baixa · ◐ A nota do 01 não bate com nenhuma nota das folhas: borda, padding, gap e cor do texto diferem.
  - *Prova:* 01…html:107 borda dashed #332C49, padding 10 12, gap 2, texto #A9A2BC lh 1.4 · folha-4 'nota com rótulo': dashed #241F33, padding 12, gap 4, texto #C9C3DA lh 1.45 · grep: a borda dashed #332C49 com padding 10 12 só existe no T11/01
  - *Correção do verificador:* O conteúdo está certo. A linha é 01…html:66-68, não :107.
- **T11-V9** · baixa · ◐ line-height, letter-spacing e a coluna de nome de 74px não têm token.
  - *Prova:* 00-tela.html:107 lh 1.45 · 01 nota lh 1.4 · :71 width 74px · letter-spacing 0.1 / 0.3 / 0.6 / 1.5 / −0.3 / 1.4 / 1 (arquivo mecânico T11.md) · tokens.css não tem line-height nem letter-spacing · leis.md:21
  - *Correção do verificador:* Exagera no espaçamento de letra. O 1.5, o 1.4 e o −0.3 estão declarados nos comentários de tokens.css (:54, :55, :63). Sem declaração nenhuma ficam 0.1, 0.3 e 0.6. O 1px da versão contradiz o −0.2 declarado para o tamanho 20 (:62). line-height e 74px não têm token, …
- **T11-V10** · baixa · ✔ A URL só endereça estado, e o momento 02 não tem endereço.
  - *Prova:* logica.md:65 '?tela=T07&estado=…' · não existe parâmetro de momento

</details>

#### T12 · Últimas instalações

- **T12-V1** · media · ◐ Na 03 o estado remonta a lista: o aviso entra entre o título e a lista, e todos os cartões descem 66px. Isso contraria a Lei 3.
  - *Prova:* PNG, coluna x=40, bordas #2B2540 (÷2). Na 00, cartões em 152, 256, 360 e 536. Na 03, aviso em 136–188 e cartões em 218, 322, 426 e 602. Diff 00 × 03 do HTML: só o bloco em 03-estado-sem-rede.html:37-40. estados.md:12: 'Os blocos ficam onde estão'; leis.md:11.
  - *Correção do verificador:* As medidas e o deslocamento de 66px se reproduzem exatamente. Só a linha está errada: o bloco do aviso fica em 03-estado-sem-rede.html:38-41, não em :37-40.
- **T12-V2** · media · ◐ A mesma peça usa dois tamanhos na mesma tela: a linha de baixo da linha do histórico tem 11px nas duas primeiras linhas e 12px nas três últimas. O 11px, que é o da folha, fica abaixo do piso da Lei 10.
  - *Prova:* 00-tela.html:45, 58 'font-size:11px' e :71, 79, 92 'font-size: 12px'. O mesmo vale na 03 (linha 17 com 11px). A folha 4 usa 11px. leis.md:10: texto informa a partir de 12px, e 10 ou 11 só pra rótulo em caixa alta.
  - *Correção do verificador:* O fato procede. Mas a prova da 03 cita a 'linha 17', que é a hora da barra do sistema, com 14px. O certo: na 03, o 11px está nas linhas 49 e 62. E a Lei 10 fica em leis.md:18, não em :10.

<details><summary>7 de gravidade baixa</summary>

- **T12-V3** · baixa · ◐ A faixa com ENCERRAR da T12 não tem a borda de baixo de 1px #2E2840 que a folha desenha. No projeto, 34 referências têm a borda e 22 não têm.
  - *Prova:* folha-2 html 'faixa · sessão aberta': 'height: 52px; background: #16131D; border-bottom: 1px solid #2E2840'. 00-tela.html:24 não tem borda. grep: 34 HTML com a borda (T07, T09/00, T10, T13/00…), 22 sem (T05 2, T06 7, T08 3, T09 3, T11 3, T12 3, T13 1).
  - *Correção do verificador:* O 34 mistura peças: inclui 3 'faixas · sem ação' da T16. Pra peça 'faixa · sessão aberta', o certo é 31 com a borda e 22 sem.
- **T12-V4** · baixa · ✔ Na lista, 'aguardando validação' sai em --tinta, mais forte que 'aprovada' em --tinta-secundaria. As variantes aguardando e falha da linha do histórico não estão na folha.
  - *Prova:* 00-tela.html:47 #A9A2BC, :60 #F2F0F7, :73 #E06A5A. A folha 4 só desenha 'aprovada' #A9A2BC.
- **T12-V5** · baixa · ✔ O detalhe atribui a instalação a 'Rafael Vieira', e o registro da instalação não diz quem instalou.
  - *Prova:* 01 textos.md:11 '· Rafael Vieira'. mocks.js i-01 não tem campo de técnico; o único nome é M.tecnico.nome (o usuário logado).
- **T12-V6** · baixa · ✔ O corpo não tem rolagem. Na 03 sobram 21px até o rodapé; qualquer lista maior corta sem aviso.
  - *Prova:* 00-tela.html:33 'overflow:hidden'. PNG 03: último cartão termina em 676, rodapé em 697 (÷2).
- **T12-V7** · baixa · ✔ A HU-T12-5 pede a data da consulta, e a 03 mostra só a hora. Não há formato pra consulta de outro dia.
  - *Prova:* 03 textos.md:19 'Esta é a consulta das 11:47.'; casos['instalacoes-sem-rede'].diasAtras = 0 (mocks.js:457). HU-T12-5 em dominio.md.
- **T12-V8** · baixa · ✔ A lei 'poço na linha' não cobre a linha de 72, e a linha do histórico usa poço 32 sem regra declarada.
  - *Prova:* leis.md:32 só cobre 38/24, 44/30 e 50/32. 00-tela.html:41-42: linha 72 com poço 32.
- **T12-V9** · baixa · ✔ tokens.css declara duas vezes --poco-24, --poco-32 e --poco-44, e o poço 32 é o que a T12 usa.
  - *Prova:* tokens.css:95-97 e :103-104.

</details>

#### T13 · Checklist

- **T13-V1** · media · ◐ O veredito mexe o layout: na 11 a lista desce 2px e o rodapé sobe 20px
  - *Prova:* PNG x=40: borda do placar 438→442, SEÇÃO 469→473, poço A 534→538; PNG x=4: rodapé 1278 (00) → 1318 (11); 11:41 cabeça em linha com meta de 12px; movimento.md:43 proíbe mover o layout
  - *Correção do verificador:* Fica o deslocamento de 2px da lista. O traço do rodapé desce 20px (639→659), não sobe, e é o caso ancorado já registrado em M19.
- **T13-V2** · media · ◐ Abrir uma seção remonta a tela: o placar e o cabeçalho somem, e a lista muda de peça e de medida
  - *Prova:* 00: linhas 54, poço 32, gap 12, contagem 14 soltas (00:57); 01–06: cartão, linhas 44, poço 30, gap 10, contagem 13 (01:39–45); o poço de A vai de y 267 (00) para ≈143 (01)
  - *Correção do verificador:* É troca de peça entre momentos, desenhada nas folhas, não violação da Lei 3. O que falta é a regra da transição, o movimento entre o mapa e o acordeão.
- **T13-V3** · media · ◐ D e E abertos passam do rodapé, e a rolagem não está especificada
  - *Prova:* PNG 04: HODÔMETRO/HORÍMETRO cortados em y 639; PNG 05: F cortada; HTML overflow:hidden (04:34)
  - *Correção do verificador:* A regra de rolagem existe (decisão 14). O achado real é que as referências cortam o conteúdo com overflow:hidden em vez de mostrar a rolagem, e isso já está em M11.
- **T13-V4** · media · ✔ O fluxo chega na T13 com E feita, e nenhuma referência mostra esse estado
  - *Prova:* palco.md:16 'T01 a T10, depois T14, T13 e T16'; logica.md:28; T14/textos.md:27 herói 5 de 5; a 00 (semente) tem E 0 de 5; nenhuma referência com E 5/5 e B pendente, nem com Finalizar habilitado
- **T13-V5** · media · ◐ Não há foto em lugar nenhum para a câmera devolver
  - *Prova:* 08-produto-real/o-que-o-prototipo-simula.md 'a câmera devolve a foto do mock'; grep foto mocks.js → só booleanos; ls 05-recursos → fontes e marca
  - *Correção do verificador:* Não existe foto em bitmap, mas a pasta já desenha a foto tirada como glifo (folha 7 'foto · tirada'). O que falta é o quadro da miniatura na T13, da animacao.md:8.
- **T13-V6** · media · ✔ Só dois itens têm texto de nível do item; os outros exigiriam texto inventado
  - *Prova:* textos.md:35–43 só b-modulo ('Enquadre o módulo…') e c-alimentacao ('Tensão da bateria na faixa'); o mock só tem pergunta em B e E, sem dica nem título dos automáticos

<details><summary>10 de gravidade baixa</summary>

- **T13-V7** · baixa · ✔ Entre 07 e 08 o visor encolhe e o Não conforme troca de peça
  - *Prova:* PNG x=40: visor 474–1128 (07) × 474–980 (08); 07:53 cartão de 50 × 08:52 marcador role=radio da peça justificativa
- **T13-V8** · baixa · ◐ O Não conforme é um toggle único marcado como rádio
  - *Prova:* 08:52 role='radio' aria-checked='true'; folha-6 html:181 igual; o checkbox da folha é role='checkbox' (folha-6 html:154)
  - *Correção do verificador:* Trocar 'folha-6 html:181' e 'html:154' por 'folha-6 html:39' (as duas peças).
- **T13-V9** · baixa · ✔ O véu da 10 deixa barra e faixa acesas; o da T04 escurece o topo
  - *Prova:* PNG 10: faixa #16131D até y 162; T04/06 PNG: tira escura; leis.md:33 'sob o véu, escurece junto'; peça 'barra do sistema sob o véu' (componentes.md:34)
- **T13-V10** · baixa · ✔ E muda de cara sem mudar de dado; os glifos de B e E não são os da folha 3
  - *Prova:* 00:92 E em #867E9A × 01:98 E em tinta; B círculo #A9A2BC traço 2.2 × folha 3 'espera · ainda não' #4E475E traço 2; E relógio #6E6683 'M12 7.5V12l3 1.8' × folha 3 relógio #A9A2BC 'M12 7.5v5l3 2'; #6E6683 é --marca-limite, a cor dos limites da faixa
- **T13-V11** · baixa · ✔ A 09 não tem a linha 'Depois:' do segmentado, e o título sobe 20px em relação à 07
  - *Prova:* 07:42 'Depois:' × 09 sem ela; PNG x=40 título 331 (07) × 291 (09); poço 474 × 368
- **T13-V12** · baixa · ◐ A nota da 09 é a 'nota tracejada' com o texto maior
  - *Prova:* 09:60–61 texto 13px lh 1.5; folha-4 html:587 12px lh 1.45; componentes.md:69 nota tracejada só T05
  - *Correção do verificador:* Trocar 'folha-4 html:587' por 'folha-4 html:146'. O peso também diverge: 400 na 09 × 500 na folha.
- **T13-V13** · baixa · ✔ O traço de 12×1 embaixo de alguns valores não tem regra
  - *Prova:* aparece em serial, firmware, ativo (01), sem cerca (04), na fila (06), cartões de E (05); não aparece em chassi, limpeza, A12 e outros (04)
- **T13-V14** · baixa · ✔ Palavras viram unidade: 'Mobs2 dados' partido em valor + unidade, 'subiram' como unidade
  - *Prova:* 04:96 'Mobs2' + span 'dados'; mocks.js:673 redeDoModulo 'Mobs2 dados' é uma string só; 06:91 '12' + 'subiram'
- **T13-V15** · baixa · ◐ O veredito diz HOMOLOGADA; a máquina de estados diz Aprovada
  - *Prova:* 11:41 'HOMOLOGADA'; dominio.md §4.1 'Aprovada'
  - *Correção do verificador:* Não há contradição com a máquina de estados. HOMOLOGADA é o veredito do checklist, e Aprovada é o estado da instalação, que depende do servidor. O que falta é escrever a relação entre as duas palavras.
- **T13-V16** · baixa · ✔ 'Faltam N itens' não tem forma de singular
  - *Prova:* textos.md:7 'Faltam 10 itens'; nenhum texto para 1

</details>

#### T14 · Ciclo dinâmico

- **T14-V1** · media · ◐ 01 e 04 não cabem em 800: o conteúdo transborda, a referência corta, e a decisão 14 manda rolar
  - *Prova:* Folga passos→rodapé medida: 25 (01) e 28 (04), contra 32 (margin-bottom 16 + padding 16 em 00.html:34,70); 69 na 00. 07-decisoes/14-tela-800.md: 'abaixo disso, o conteúdo rola'. 00.html:34 overflow: hidden.
  - *Correção do verificador:* Os números estão certos, mas 'não cabem' exagera. O que transborda é só o margin-bottom de 16 do cartão de passos. O cartão visível termina a 25 (01) e 28 (04) do rodapé, acima dos 16 mínimos (leis.md:34). A decisão 14 manda rolar abaixo de 800, não em 800. O risco …
- **T14-V2** · media · ✔ O fluxo remonta a tela: do 01 para a 00, as legendas somem e os cartões sobem 18px; da 00 para o 05, os passos descem 2px
  - *Prova:* Scan PNG: cronômetro 167→147, evento 304→285, passos 412→394; 00→05: passos 394→396. animacao.md:12 'nada que mexa no layout'.
- **T14-V3** · media · ✔ Não há referência do quadro 'fila drenada, antes do disparo', com o 'Disparar evento de teste' aceso
  - *Prova:* tela.md:15 'a fila do módulo drena → Disparar evento de teste acende'. Os 6 PNGs só mostram o botão desabilitado (01) ou já trocado por 'Encerrar o ciclo' (00).
- **T14-V4** · media · ✔ A drenagem da fila não tem ritmo declarado
  - *Prova:* movimento.md:30-39 lista 8 ritmos de processo e nenhum é da fila do módulo. animacao.md também não tem linha para ela.
- **T14-V5** · media · ✔ No 05 o número muda de sentido (de restante para decorrido) enquanto a barra continua no restante; ninguém descreve essa virada
  - *Prova:* 05.html:41 'O EVENTO CHEGOU EM', :45 '0:48', :48 'width: 60%' (o restante), :55 'disparado 14:30'. tela.md e animacao.md não falam disso.
- **T14-V6** · media · ✔ Os estados 03 e 04 não têm porta natural: M2C-0301 e M2C-0312 não aparecem na busca da T05
  - *Prova:* T05 textos.md:7: M2C-0417, 0362, 0394, 0335, 0999. M.casos: can-fora-esperado → a-02 (M2C-0301), identificador-divergente → a-03 (M2C-0312). Só o a-04 (M2C-0335, estado 02) é alcançável, e passa antes por modulo-em-repouso e conflito-pinos-resolvivel.

<details><summary>6 de gravidade baixa</summary>

- **T14-V7** · baixa · ◐ O gate não cobre a T14: não confere M.ciclo nem o caso evento-sem-resposta
  - *Prova:* gate-cobertura.js:121-126: a lista OBRIGATORIOS não tem evento-sem-resposta e o arquivo não tem nenhum chk sobre M.ciclo. node 04-dados/gate-cobertura.js → 'GATE APROVADO', mesmo com o conflito da A1.
  - *Correção do verificador:* O título exagera. O gate cobre dois dos três estados da T14: can-fora-esperado (gate-cobertura.js:122) e identificador-divergente (:125, e :41 lê o caso). Falta o evento-sem-resposta, e não há nenhum chk sobre M.ciclo. É o mesmo padrão de T05-A18, T09-V10 e T15-V3.
- **T14-V8** · baixa · ✔ casos.md e M.casos têm 33 cada, mas não são os mesmos 33; e o modulo-com-pendencias (12+3), que sobrepõe a drenagem da T14, não está documentado
  - *Prova:* node Object.keys(M.casos) × casos.md. casos.md tem i-01, ma-02, pac-uo-02 e pac-uo-03, que não são chaves de M.casos, e omite can-estatico-hodometro, modulo-com-pendencias, pronto-para-fechar e sinal-aguardando-ciclo. mocks.js:910-913: 'modulo-com-pendencias … …
- **T14-V9** · baixa · ◐ Dados que o mock reserva para a T14 não têm leitor em nenhuma referência dela
  - *Prova:* mocks.js:917-935: lidoDinamico ('um campo, um consumidor (T14)'), viagem.distanciaKm 3, evento.conferidoAosSeg 33, e 'tentativa' do caso evento-sem-resposta. Nenhum desses valores aparece nos textos.md da T14.
  - *Correção do verificador:* A afirmação vale, mas a linha está errada. A 'tentativa' do evento-sem-resposta fica em mocks.js:976, fora do intervalo 917-935 citado. O comentário 'Um campo, um consumidor (T14)' está em mocks.js:928-929. Vale somar que a HU-T14-1 promete 'CAN dinâmica' e 'viagem', …
- **T14-V10** · baixa · ✔ 'Solicitar correção de cadastro' não tem destino em lugar nenhum da pasta
  - *Prova:* grep em 01-produto, 02-telas, 07-decisoes e 08-produto-real: só tela.md:20, T06 tela.md:20, fluxos.md:33 e as HUs. Nenhum documento diz para onde o toque leva nem o que registra.
- **T14-V11** · baixa · ✔ O caso can-fora-esperado é declarado para o T13/09, mas o T13/09 mostra outra falha no herói
  - *Prova:* casos.md:14 atribui o caso a T13/09 e T14/03. T13 textos.md:43 mostra M2C-0417 com tensão da bateria 10,2 V; o caso é do a-02, velocidade 0 km/h.
- **T14-V12** · baixa · ✔ A segunda falha do evento ('confira a conexão do módulo') não tem referência nem texto
  - *Prova:* 08-produto-real/pendencias.md:17 'aparece na segunda falha' × textos.md da T14 (6 referências): a frase não aparece.

</details>

#### T15 · Fila de saída

- **T15-V1** · media · ✔ 03/04 fecham a sessão, e isso não está declarado
  - *Prova:* 00/01/02 têm faixa M2C-0417 · RKT-8H42 e 03/04 têm 'Sem sessão de configuração' (03.html:24-28). estados.md:10-11 não cita a sessão. O estado no palco precisa montar sessao = null.
- **T15-V2** · media · ✔ A linha de 62 é regra de posição (a última da lista), não de estado
  - *Prova:* Na 01, a linha 2 é recebida com 50px e divisória (01.html:69); a linha 3 é recebida com 62px (01.html:77). A folha 7 chama a de 62 de 'linha da fila'; a folha 4 chama a de 50 de 'linha da fila · esperando'.
- **T15-V3** · media · ◐ O gate aprova, mas não cobre nada do que a T15 mostra
  - *Prova:* `node 04-dados/gate-cobertura.js` → 'GATE APROVADO'. As checagens de fila (gate-cobertura.js:100-106) só contam os estados (3 na-fila, 1 enviando, 4 recebidas, 1 de rede, 1 de recusa) e secaoF.emRecheck. Não conferem placa, garagem, contador nem a janela de 24 h.
  - *Correção do verificador:* 'Não cobre nada' exagera. O gate cobre o vocabulário de estados que a T15 mostra: o erro de rede automático e a recusa manual (HU-T15-3) e a Seção F separada (HU-T15-5). Não cobre o que diverge: placa, garagem, contador, horas e prazo.
- **T15-V4** · media · ✔ O tipo aparece encurtado, sem regra declarada
  - *Prova:* mock 'Evidências da instalação' → tela 'Evidências'; 'Foto de calibração' → 'Calibração'; 'Checklist de homologação' → 'Checklist' (textos.md:7-15). Há precedente no mock: E_ENCURTA em mocks.js:868.
- **T15-V6** · media · ◐ O mock tem, ao mesmo tempo, envio corrente e dois erros, e nenhuma referência mostra os dois juntos
  - *Prova:* M.filaSaida: f-04 'enviando' + f-09 'erro-rede' + f-10 'erro-recusa'. O espaço do cartão só foi desenhado com o envio (01) ou só com erros (00/02).
  - *Correção do verificador:* A colisão só existe no array inteiro. Recortado por garagem, como o contador 'nesta garagem' pede, não acontece: uo-01 tem envio e zero erro, uo-02 tem uma recusa e nenhum envio, uo-03 tem erro de rede e nenhum envio. A divergência depende do recorte, que a própria 02 …
- **T15-V7** · media · ✔ 'Ressincronizar e reenviar' não tem resultado desenhado
  - *Prova:* tela.md:15 é o único toque de conteúdo. estados.md:5-11 tem 0 momentos. Nenhuma referência mostra o item depois do toque.

<details><summary>5 de gravidade baixa</summary>

- **T15-V5** · baixa · ◐ O prefixo 'o servidor recusou ·' só aparece na 02, e o comentário do mock cita uma coluna que não existe
  - *Prova:* 00 'instalação encerrada por outro usuário' contra 02 'o servidor recusou · instalação…'. mocks.js:436-439 justifica o corte porque 'a coluna da direita já diz em `recusado`', e nenhuma das 5 referências tem essa coluna.
  - *Correção do verificador:* O comentário está em mocks.js:438-442, e não em 436-439 (a 436 é f-09). No resto, a afirmação se sustenta.
- **T15-V8** · baixa · ◐ A linha do tempo do mock se contradiz entre fila e instalações
  - *Prova:* f-05/f-06 (Evidências e Checklist do RKT-8H42) são confirmados às 09:14/09:15, antes de a cadeia de i-01 começar (10:02) e do recebimento às 11:47. f-09 (Evidências do KWX-2T36) está pendente hoje, mas i-04 do KWX-2T36 está 'aprovada' desde 08/03, e a Seção F exige as …
  - *Correção do verificador:* A metade de f-05/f-06 se sustenta. A de f-09 não é contradição direta: o item da fila não tem instalacaoId, e f-09 nasce 4 dias depois de i-04. É evidência órfã, sem instalação de hoje para a-19 em M.instalacoes, e não evidência de i-04.
- **T15-V9** · baixa · ✔ O rótulo da seção de re-checagem tem outra cor e outro espaçamento
  - *Prova:* 04.html:40: #A9A2BC e gap 8 até a lista. 00.html:49 e 01.html:59: #867E9A e gap 12.
- **T15-V10** · baixa · ✔ A seta do 'SUBINDO AGORA' não é glifo do catálogo
  - *Prova:* O grep do path 'M12 19V5M7 10l5-5 5 5' nas 8 folhas dá 0. A folha 3 cataloga ok, ok cinza, xis, traço, espera, sem sinal, energia, pausa, relógio, lua e agora.
- **T15-V11** · baixa · ✔ Há valores de espaço fora da escala que escapam da checagem por valor
  - *Prova:* gap 18 (00.html:40), padding 18 (02.html:41 e vazio 03.html:36), padding 22 (03.html:36), linha 62, botão 52. Todos batem por acaso com tokens de outra família (--n-unidade-g, --poco-22, --n-cronometro, --faixa-sessao), mas a escala de espaço (tokens.css:76-78) não …

</details>

#### T16 · Sessão

- **T16-V1** · media · ◐ A cadeia do 06 é um desenho híbrido que nenhuma folha tem, e a mesma queda no Leitor aparece de dois jeitos no app.
  - *Prova:* 06: linhas de 58, sem descrição, glifo pausa #A9A2BC (folha 3 'pausa · parou, sem culpa'), valor 'parou aqui' em #F2F0F7. T09/02-estado-queda-na-cadeia.png: linhas de ~68 com descrição, glifo sem sinal e 'pausado'. A peça 'parou aqui' da folha 4 é outra: sem sinal …
  - *Correção do verificador:* O Leitor do 06 tem uma linha embaixo: 'a versão gravada até aqui é A12.G07' (html:75). O que falta são as descrições de bloco da T09. O glifo da T09/02 é o 'sem sinal neutro', não o vermelho.
- **T16-V9** · media · ✔ Os glifos das referências não parecem ser os do Lucide, e a Lei 14 e a stack mandam Lucide.
  - *Prova:* paths nas referências: círculo r=9, check 'M8 12.3l2.6 2.6L16 9.5', energia 'M12 3v8 · M6.3 6.8a8 8 0 1011.4 0', pausa em duas linhas 'M9.5 7.5v9M14.5 7.5v9'. leis.md:22 e 06-prototipo/CLAUDE.md:13 (lucide-react). O relógio da T16 'M12 7.5V12l3 1.8' não é o da folha 3 …

<details><summary>12 de gravidade baixa</summary>

- **T16-V2** · baixa · ✔ O glifo 'não se aplica' em círculo só existe no 02 e no 05.
  - *Prova:* grep 'M8.5 12h7' acha só T16/02 e T16/05. folha-3 'traço · não se aplica' e folha-4 'não se aplica' usam <span 10×1 #332C49>.
- **T16-V3** · baixa · ◐ O traço do 'pulado' tem duas cores no design system.
  - *Prova:* 03…html usa 10×1 #6E6683 (--marca-limite) 4 vezes. folha-3 desenha o traço em #332C49. folha-5 usa os dois (3× #332C49, 4× #6E6683), e o resto do app usa #332C49.
  - *Correção do verificador:* O 'pulado' tem uma cor só, #6E6683, e o T16/03 bate com a peça da folha 5. Quem tem duas cores é o traço como glifo: #332C49 na folha 3/4 e em 'não foi alcançado', #6E6683 no 'pulado' e na T14. 'O resto do app usa #332C49' é falso por causa da T14.
- **T16-V4** · baixa · ✔ O mesmo subtítulo é montado de dois jeitos e fica 2px diferente.
  - *Prova:* 03…html:40 margin-top −8 depois do gap 14 → lista em y=156. 06…html:30-36 bloco com gap 4 → lista em y=154 (medido no PNG).
- **T16-V5** · baixa · ◐ Há medidas que só batem com token no valor, sem o papel: a lista mecânica pegou 58 e 54, mas não pegou estas.
  - *Prova:* passo de 62 = --n-cronometro (letra); última linha de 34 = --poco-34; padding-left 18 da barra = --n-unidade-g; a versão da prova em 22px (--t-titulo-tela, 'um por tela', tokens.css:63) com letter-spacing +1, a segunda letra de 22 no 02 (02…html:34); glifo 19 (60% do …
  - *Correção do verificador:* Duas das cinco não se sustentam. A barra do sistema é 'desenho do Android · não é do app' (componentes.md:15), então o 18 dela não precisa ser token do app. O glifo 19 segue a regra declarada 'ícone = 60%' (tokens.css:104). O 22 da versão também está na peça aprovada …
- **T16-V6** · baixa · ✔ O gap do miolo muda entre as duas metades da tela.
  - *Prova:* gap 14 em 00/01/03/06…html (linha 35 ou 30) × gap 12 em 02/04/05…html:30.
- **T16-V7** · baixa · ✔ A causa do mock tem outra redação que a da tela, e o campo fica sem leitor.
  - *Prova:* mocks.js:515 causa 'o módulo voltou com a leitura zerada' × textos.md:27 'Os contadores voltaram zerados — o módulo perdeu a leitura no reinício.'
- **T16-V8** · baixa · ✔ Os estados 05 e 06 são de ativos de outra garagem, e o 05 aponta pra uma instalação de 6 dias atrás.
  - *Prova:* node: a-14 e a-13 com uoId uo-02 (Ibura); contextoAtivo uo-01 Várzea (mocks.js:993). casos['autoteste-falhando'].instalacaoId i-05: diasAtras 6, reprovada pela bancada ('Ignição desliga'). Retomar o 06 no contexto Várzea pede troca de garagem.
- **T16-V10** · baixa · ◐ 'Registro da sessão · na fila' e 'ID na plataforma · na fila' sugerem itens de fila que o mock não tem.
  - *Prova:* textos.md:15 e 23 × M.filaSaida (mocks.js FILA_SAIDA: só 'Evidências da instalação', 'Foto de calibração' e 'Checklist de homologação').
  - *Correção do verificador:* 'ID na plataforma · na fila' é o valor fixo do mock e aponta para a evidência, que é um tipo da fila. Só o 'Registro da sessão' (passo 6, o log) não tem tipo em FILA_SAIDA. Um adendo: os itens do a-01 na fila já estão 'recebida' (f-05, f-06).
- **T16-V11** · baixa · ✔ O ponto de retomada tem duas leituras entre a pendência e o mock.
  - *Prova:* pendencias.md:14 'do último passo confirmado' × mocks.js:530-532 pontoRetomada 'Bloco 4 de 6 — Leitor', que é o bloco depois do último confirmado (cercas).
- **T16-V12** · baixa · ✔ Não está dito se o trilho da cadeia do encerramento anda.
  - *Prova:* movimento.md:11 dá --mov-lento ao 'trilho da cadeia'; a animacao.md da T16 não cita o trilho.
- **T16-V13** · baixa · ✔ O comentário do mock diz que a assertiva 8 alimenta a Seção D, mas o item está na Seção F.
  - *Prova:* mocks.js:270 'É o que o C21 (T13, Seção D) consome' × mocks.js:859 f-plataforma, secao F.
- **T16-V14** · baixa · ✔ A nota NÃO RODARAM do 04 mistura duas peças da folha 4.
  - *Prova:* 04…html:58-60: rótulo #867E9A (da nota tracejada) e frase 13/#A9A2BC. A nota tracejada tem frase 12/#867E9A; a nota com rótulo tem rótulo #A9A2BC e frase 13/#C9C3DA.

</details>


---

## 6 · As decisões numeradas

Cada dúvida vem com o padrão que eu adotaria. **Você responde só onde discordar**: "vai" aceita todos os padrões; "vai, mas G7 é (b)" ajusta um. Os analistas propuseram **347 decisões**, e todas têm destino: **29 transversais** (G), **72 por tela** e **11 descartadas**, com o motivo (a pasta já decidia, ou seria redesenho). O campo *absorve* diz quais propostas cada G resolve.

**A regra de desempate que apliquei em todas** vem do `LEIA-PRIMEIRO.md`: a referência ganha na aparência, o mock ganha no dado, o `textos.md` ganha no texto, e **a divergência é nomeada no CHANGELOG, nunca resolvida em silêncio**. Nada de redesenho. Onde dá pra cumprir a lei e a referência sem mudar o desenho, cumpro as duas: por exemplo, alvo de 48 por uma área invisível sobre um desenho de 44.

### 6.1 · As transversais, na ordem em que os ciclos precisam delas

Os ciclos citados são os do plano revisado (parte 8). Em todas, **o meu padrão é a opção (a)**; a coluna da direita resume o que ela diz.

| G | Precisa estar decidida em | A pergunta | Meu padrão, em resumo |
|---|---|---|---|
| **G1** | C1 | Quando um documento contradiz a referência, o texto ou o mock, quem ganha, e o que muda? | cada fonte ganha no seu domínio: a aparência é da referência, o texto de interface é do textos.md, o valor é do mock, e o comportamento é de tela.md e estados.md onde a … |
| **G2** | C1 | Qual é o caminho de volta de cada ciclo, se a pasta não é repositório? | git init na raiz no começo do C1, .gitignore com node_modules, dist e .DS_Store, e o primeiro commit com a pasta como está (o C0); remoto e Vercel no C14 |
| **G3** | C1 | Onde mora todo valor visual: qual arquivo é a norma, e o que se faz com o valor que a referência usa e que não tem token? | o tokens.css é a norma. O tokens.json sai dele e o gate confere: os 3 mov-* voltam a 150/200/300, e o 0ms fica só no reduzir. Os 3 duplicados saem. Todo valor sem token … |
| **G4** | C1 | Onde moram os ritmos dos processos, e quem dá os que faltam? | em movimento.md e num módulo só do app (ritmos.js) que espelha a tabela, com a linha de onde vem cada valor, fora do tokens.css e fora do reduzir. A cadência de … |
| **G5** | C1 | Os ícones vêm do Lucide ou do desenho das folhas? E com que traço e que tamanho? | lucide-react, com absoluteStrokeWidth desligado e o traço dos tokens por classe: glifo de estado 2.2 em todo tamanho, ferramenta e ação 1.8, fechar e chevrons 2.2, … |
| **G6** | C1 | A fonte vem dos woff2 de 05-recursos, como estão, mesmo onde a regra escrita diz @fontsource? | sim: a Barlow vem dos woff2 de 05-recursos/fontes, lida de fora da app como o mock, com o desvio contra o @fontsource (06-prototipo/CLAUDE.md:13, publicar.md:13) … |
| **G7** | C1 | Como o app lê o mock sem mexer nele, e quando o gate cresce? | dados/mock.js importa o 04-dados/mocks.js de fora da app e faz deepFreeze de M. O estado único copia explicitamente o que muda (fila, sessão). Número, hora e caixa alta … |
| **G8** | C1 (a regra e o gate); o dado entra no ciclo de cada tela | A tela mostra um número ou um fato que o mock não tem: campo aditivo, caso novo, ou tirar do texto? | o valor entra no mock como campo ou caso aditivo, no ciclo da tela que o lê, com o gate recomputando e o vai do diretor, e a tela lê na hora de montar. São eles: a … |
| **G9** | C1 (a regra); aplicada no ciclo de cada tela | O mock tem o valor, e a referência mostra outro: quem ganha? | o mock ganha no valor: placa, serial, garagem, número, contagem, rede, firmware, versão, e a hora, que é sempre HORA_NOMINAL. O PNG e o textos.md que mostram outro … |
| **G10** | C2 | O que entra no C2, e o componentes.md muda junto? | 46 componentes que cobrem as 114 linhas, mais 8 primitivos sem linha e 4 composições só na vitrine. O componentes.md ganha as linhas que faltam (primário ×3, link, … |
| **G11** | C2 | A mesma peça aparece com dois desenhos, da tela contra a folha ou de duas referências entre si: qual vale? | cada tela como a referência desenha. A peça ganha variante ou propriedade nomeada (margem, folga, altura, tamanho do poço, regra do contador), declarada uma vez em … |
| **G12** | C2 | A referência fura uma lei visual (Leis 1, 4, 5, 6, 7, 10 e 11, R-03, poço na linha, barra sob o véu): construir fiel ou obedecer à lei? | construir como a referência e escrever a exceção na lei. Cada caso vira uma linha proposta pra leis.md. Lei 1: campo focado, faixa esperada, 'decide agora', NADA SE … |
| **G13** | C2 (a peça); o movimento no C5, no C6 e no C11 | A faixa de sessão é uma peça só? E como ela nasce, fica e morre? | uma peça só, a 'faixa · sessão aberta' da folha 2: 52 (--faixa-sessao), flex-shrink 0 e borda de baixo --separador, igual em toda tela com sessão. A 'sem ativo' fica em … |
| **G14** | C2 | Como o toque responde: o alvo abaixo de 48 e o pressionado que a folha não desenha? | o alvo de 48 (--alvo-min) vem de uma área invisível em volta do desenho de 44 ou 46, sem mexer em pixel e sem invadir o alvo vizinho. O cartão que a referência desenha … |
| **G15** | C2 | Como o protótipo dá voz aos tocáveis, aos glifos e aos diálogos sem inventar texto? | nome em todo tocável. Os 4 nomes que só o HTML tem ficam declarados no textos.md, numa linha 'para o leitor', junto dos 9 h1 escondidos. O componente de glifo leva como … |
| **G16** | C2 | Quando o conteúdo passa de 800, o que rola e o que fica? | o miolo inteiro rola, entre a faixa e o rodapé. Barra, faixa e rodapé ficam. A folga de 16 até o rodapé é padding do miolo. A foto sai na rolagem 0 |
| **G17** | C2 | Como se fotografa pra comparar com a referência? | as telas em 360 × 800 a 2× (720 × 1600, o tamanho dos PNG), com o Chrome headless da máquina e a fonte de 05-recursos, na rolagem 0. As folhas a 1×, numa vitrine que … |
| **G18** | C3 | O que o painel e a coluna do palco listam, e de onde vêm os rótulos? | o painel em duas partes: O CAMINHO (T01 a T07, T09, T10, T14, T13, T16) e AS CONSULTAS (T15, T11, T12, T08), com os títulos no estilo do rótulo do painel. O 'Recomeçar … |
| **G19** | C3 | No palco, quem ganha quando o palco.md e os quadros discordam? E como ficam o celular, o quadrado, o modo estreito e a etiqueta? | onde o palco.md diz, ele ganha dos quadros; onde cala, vale o quadro. O celular fica centrado nos dois eixos, com escala = min(1, (altura − 48)/816, largura que sobra … |
| **G20** | C3 | A URL endereça momento? E o que faz o voltar? | ?tela=…&estado=… e ?tela=…&momento=… pros 39 momentos, folhas incluídas. O momento abre no fluxo, interativo, montado pela semente mais os toques que levam lá. A URL … |
| **G21** | C3 | Como se monta o que o palco abre: a semente de cada tela e a receita de cada estado? | em app/src/estado/sementes.js e receitas.js, feitos só de ids e valores lidos de M, com um teste em node que resolve 16 de 16 sementes e 50 de 50 receitas. A semente … |
| **G22** | C3 (nas sementes); usada no C9, no C10 e no C11 | A sessão das 14:30 é uma reconfiguração do herói, que já foi instalado às 11:47? | sim, e o logica.md declara isso. A Seção F só conta os itens da fila com criadoAs ≥ sessao.abertaAs. O 'semeado há N dias · Semear de novo' só aparece com 1 dia ou … |
| **G23** | C3 | O que faz o ENCERRAR, e as saídas que encerram, fora do caminho feliz, e antes de existir o ciclo que o entrega? | em toda tela com sessão, antes de homologar, é a sessão abortada: 4 passos, sem confirmação, que cancelam o processo que corre (T08) e seguem pro destino. 'Encerrar a … |
| **G24** | C4 | Quando o estado remonta a tela-base na referência (Lei 3, decisão 05), construir fiel ou reservar o lugar? | construir cada estado como a referência desenha, com o desvio da Lei 3 nomeado no CHANGELOG, um por referência, e levar ao diretor a proposta de reservar lugar. Onde dá … |
| **G25** | C4 | O fluxo pede um quadro, um fundo, um texto ou um resultado que nenhuma referência desenha: o que se constrói? | só peças e textos já aprovados, sem desenho nem texto novo. Atrás do véu fica a tela real de onde a folha ou o diálogo nasceu. O quadro sem referência junta peças que … |
| **G26** | C4 (vale desde a T01); a conferência linha a linha é o C12 | Quando uma linha de animacao.md pede o que movimento.md proíbe (cor, traço desenhado, layout, curva sem token, reduzir diferente), quem vence? | movimento.md vence, e a animacao.md se corrige no mesmo ciclo. A cor que muda troca por duas camadas em opacity quando a animacao.md pede o movimento (o botão que … |
| **G27** | C4 | Quando uma tela abre, o processo dela corre, ou ela já nasce no fim? | o processo só corre quando o fato acontece agora, depois da troca de 150ms, a partir do quadro que a semente declara. A T03 sempre baixa no fluxo, e a 03 e a 04 são … |
| **G28** | C4 (a T02 e a T03); vale até o C11 | Quando o toque numa linha abre o estado (porta natural)? | só onde a referência desenha a linha tocável e o caso cabe no contexto e na sessão: o pacote da garagem e o par módulo × ativo da faixa. O resto abre só pela coluna. O … |
| **G29** | C8 | O tambor é uma peça só? E com que tempo? | um primitivo, a roda de dígito: janela com overflow hidden, fita 0–9 duas vezes, translateY em múltiplos da altura, sempre pra frente, da unidade pra esquerda. Uma … |

#### G1 · Quando um documento contradiz a referência, o texto ou o mock, quem ganha, e o que muda?

*Precisa estar decidida em: C1.*

- **Opções:** (a) cada fonte ganha no seu domínio: a aparência é da referência, o texto de interface é do textos.md, o valor é do mock, e o comportamento é de tela.md e estados.md onde a referência não o desmente. O documento que perde (tela.md, estados.md, logica.md, dominio.md, animacao.md, a lista de peças, o README, o comentário do mock) se corrige no mesmo ciclo, com linha no CHANGELOG. HU e número da versão só mudam com o vai. Contradição de produto num texto aprovado fica como está e vira linha em pendencias.md, com o padrão. Na revisão de texto vale o vocabulário de dominio.md §2.2 mais BLE, APN e iButton, e o textos.md vence ('CAN-BT' e 'SIM' vão ao PM) · ou (b) o código segue o documento escrito, e a referência desvia
- **Meu padrão:** (a)
- **Por quê:** LEIA-PRIMEIRO.md:31 dá o dono de cada coisa, CLAUDE.md:16-21 diz o que é norma e CLAUDE.md:11 manda a documentação seguir no mesmo ciclo. O comentário do mock não é dado: a regra do Entrar está em logica.md:20, o contato inteiro está nas referências (T01-D1, T01-D12), e 'rpm só junto de número' é comentário (mocks.js:687). Mudar texto aprovado é redesenho, então 'SEM ENERGIA', o 'sem rede' aprovado da T05/09 e o '12 de 12' da T08 vão ao PM com o texto como está, como manda pendencias.md:3. O README diz 23 cores e são 25 (M3). A T05 acha 5 módulos, e logica.md:26 diz quatro.
- *Absorve:* T01-D1, T01-D12, T04-D5, T04-D17, T05-D1, T05-D16, T07-D14, T08-D2, T09-D4, T10-D15, T11-D14, COERENCIA-D9, COERENCIA-D10, COERENCIA-D11, COERENCIA-D22

#### G2 · Qual é o caminho de volta de cada ciclo, se a pasta não é repositório?

*Precisa estar decidida em: C1.*

- **Opções:** (a) git init na raiz no começo do C1, .gitignore com node_modules, dist e .DS_Store, e o primeiro commit com a pasta como está (o C0); remoto e Vercel no C14 · ou (b) uma cópia da pasta por ciclo
- **Meu padrão:** (a)
- **Por quê:** ciclos.md:114 pede um commit por ciclo ('todo ciclo tem caminho de volta'), e a raiz não tem .git (medido com ls -a). publicar.md:25 diz que o repositório é a pasta inteira. A prévia por ciclo (publicar.md:7) só existe depois da Vercel. Cópia de pasta não mostra diferença nem volta um arquivo só.
- *Absorve:* COERENCIA-D16

#### G3 · Onde mora todo valor visual: qual arquivo é a norma, e o que se faz com o valor que a referência usa e que não tem token?

*Precisa estar decidida em: C1.*

- **Opções:** (a) o tokens.css é a norma. O tokens.json sai dele e o gate confere: os 3 mov-* voltam a 150/200/300, e o 0ms fica só no reduzir. Os 3 duplicados saem. Todo valor sem token das referências entra num bloco novo do tokens.css, com nome pelo papel, proposto uma vez só no gate do C1: as medidas de M5, os 11 espaçamentos de letra, as bordas de 1 e 2, a barra de 30, as últimas linhas de 78 e 62, os 100ms do soltar e da célula, e os escalonamentos de 80 e 40. O 95 muda no CLAUDE.md, no README e no CHANGELOG junto, com o vai. O tamanho de letra usa o token de mesmo valor: o 22 dos números é --t-titulo-tela, e o --n-cartao fica sem uso. O peso fica como propriedade, só 500, 600 e 700, e o token de peso vai como proposta · ou (b) compor com calc, ou arredondar pro token vizinho · ou (c) valor solto, com o desvio no CHANGELOG
- **Meu padrão:** (a)
- **Por quê:** CLAUDE.md:18 e :26: a norma é o tokens.css, e tamanho fora dele é proibido. O JSON difere justo nos 3 valores que mudam o comportamento (M1). Só o tokens.css tem o @media do reduzir (tokens.css:116-118), e o que precisa zerar com ele tem de ser token: com reduzir, a busca 'aparece junta' e o tambor 'mostra o número' (T05/animacao.md:7, T07/animacao.md:8). Arredondar muda o desenho, então T05-D13 e T06-D3 viram fiéis. Calc por coincidência é o primeiro número a divergir (T08-D14), então o T06-D14 vira token. Criar token sem o vai é proibido (DS-D9), por isso é um bloco só no C1, e não um pedido por tela. norma-e-ilustracao.md:7 e stack-a-definir.md:5 passam a apontar o CSS.
- *Absorve:* COERENCIA-D1, DS-D9, DS-D10, T01-D17, T01-D19, T05-D13, T05-D14, T06-D3, T06-D14, T07-D12, T08-D14, T09-D14, T10-D14, T15-D8, T16-D7

#### G4 · Onde moram os ritmos dos processos, e quem dá os que faltam?

*Precisa estar decidida em: C1.*

- **Opções:** (a) em movimento.md e num módulo só do app (ritmos.js) que espelha a tabela, com a linha de onde vem cada valor, fora do tokens.css e fora do reduzir. A cadência de simulação de cada tela mora no mesmo módulo: o tick de 250ms da T03, os +9/+12/+15 s da T14, o quadro de 62% do firmware. Os processos que não têm ritmo (busca, leitura da CAN, chassi, firmware, envio e drenagem da fila, corte, releitura) vêm propostos no gate do ciclo da tela e entram em movimento.md no mesmo ciclo, depois do vai. As propostas de hoje: releitura 600ms, drenagem 3 s, corte 3 s, chassi junto com o momento, barra da fila parada · ou (b) tokens --ritmo-* no tokens.css · ou (c) uma constante por tela
- **Meu padrão:** (a)
- **Por quê:** A tabela está em movimento.md:30-39, e o mock diz que a cadência não é fato de negócio e mora na tela (mocks.js:904-907). Com reduzir, o processo segue no mesmo ritmo (movimento.md:47), mas o tokens.css zera tudo no @media (tokens.css:116-118): ritmo não pode ser token. Inventar número é proibido (CLAUDE.md:25). Os escalonamentos de 80 e 40 zeram no reduzir, então vão pro G3, e isso corrige o COERENCIA-D2.
- *Absorve:* COERENCIA-D2, COERENCIA-D3, DADOS-D1, T05-D4, T06-D11, T08-D5, T14-D11, T15-D13, T16-D11

#### G5 · Os ícones vêm do Lucide ou do desenho das folhas? E com que traço e que tamanho?

*Precisa estar decidida em: C1.*

- **Opções:** (a) lucide-react, com absoluteStrokeWidth desligado e o traço dos tokens por classe: glifo de estado 2.2 em todo tamanho, ferramenta e ação 1.8, fechar e chevrons 2.2, check mini 2.6. Os 2 e 2.4 das folhas viram 2.2, e a Lei 14 se reescreve com essas classes. O glifo segue a tabela de poço da folha 3 (22→13, 24→14, 26→16, 28→17, 30→18, 32→19, 34→20, 44→26). No menu: settings, wrench (o Conferir vai ao diretor), activity, list-checks e truck. O C2 compara caixa, cor e tamanho, não o caminho, e cada forma diferente vai pro CHANGELOG · ou (b) copiar os 40 SVG das folhas num módulo próprio · ou (c) Lucide com o tamanho corrigido pra manter o diâmetro do anel
- **Meu padrão:** (a)
- **Por quê:** Aqui a referência e a lei concordam. A própria folha 3 diz 'Os ícones vêm do Lucide — nunca desenhados à mão' (texto de folha-3-glifos-icones-poco.html), e a Lei 14 (leis.md:22), o 05-recursos/README.md:7 e o 06-prototipo/CLAUDE.md:13 dizem o mesmo. Quem diverge é o traço feito à mão. As 105 telas só usam 1.8, 2.2 e 2.6 (DS-D4). A tabela de poço é a única que a pasta tem e bate com os 60% de tokens.css:104, e a (c) cria tamanhos fora dela. O sol do menu quer dizer brilho. O ativo pode ser caminhão coletor (T10/02).
- *Absorve:* DS-D1, DS-D2, DS-D3, DS-D4, T09-D13

#### G6 · A fonte vem dos woff2 de 05-recursos, como estão, mesmo onde a regra escrita diz @fontsource?

*Precisa estar decidida em: C1.*

- **Opções:** (a) sim: a Barlow vem dos woff2 de 05-recursos/fontes, lida de fora da app como o mock, com o desvio contra o @fontsource (06-prototipo/CLAUDE.md:13, publicar.md:13) nomeado no CHANGELOG · ou (b) @fontsource/barlow, com a quebra de linha conferida contra os PNG
- **Meu padrão:** (a)
- **Por quê:** As referências usam esses woff2 (05-recursos/README.md:6), a quebra de linha depende da métrica (T02-V9), e publicar.md:35 proíbe duas cópias do que mora fora da app. **A cor da logo saiu desta decisão:** foi resolvida em 24/09, com a logo no --lima, a decisão 28 e a Lei 15 (4.7).
- *Absorve:* COERENCIA-D21 · a parte da logo (LAC1-D1 a D3) foi resolvida pela decisão 28 (4.7)

#### G7 · Como o app lê o mock sem mexer nele, e quando o gate cresce?

*Precisa estar decidida em: C1.*

- **Opções:** (a) dados/mock.js importa o 04-dados/mocks.js de fora da app e faz deepFreeze de M. O estado único copia explicitamente o que muda (fila, sessão). Número, hora e caixa alta saem de funções puras em dados/formato.js (milhar, vírgula, 'há N min', 'ontem', idade, numeral por extenso, toUpperCase('pt-BR') no dado), sem Intl nem toLocaleString. A higiene do gate passa a varrer app/src. No C1 entram as 49 checagens novas que passam hoje; as 7 que falham entram no ciclo da decisão que as resolve. Os blocos novos do mock levam o prefixo 'P·Cn'. No C1 só se corrigem os comentários errados, e o hash de JSON.stringify(M) prova que o dado não mudou · ou (b) usar M direto, toLocaleString('pt-BR') e text-transform no CSS, com todas as checagens no C11
- **Meu padrão:** (a)
- **Por quê:** Medido no DADOS-D12: a escrita em M vaza entre telas, e structuredClone(M) falha. Sem locale explícito, o número muda com a máquina de quem abre o link (DADOS-D13), contra CLAUDE.md:12. O gate roda em todo ciclo que toca no mock (contrato.md:18), e hoje não confere nada da T01, T09, T10, T14, T15 e T16 (TX-11). Com toUpperCase no dado, o DOM fica igual ao textos.md ('RMR – RECIFE'). C8, C10 e C14 já têm outro sentido em ciclos.md, daí o prefixo novo.
- *Absorve:* DADOS-D10, DADOS-D12, DADOS-D13, DADOS-D14, T02-D15

#### G8 · A tela mostra um número ou um fato que o mock não tem: campo aditivo, caso novo, ou tirar do texto?

*Precisa estar decidida em: C1 (a regra e o gate); o dado entra no ciclo de cada tela.*

- **Opções:** (a) o valor entra no mock como campo ou caso aditivo, no ciclo da tela que o lê, com o gate recomputando e o vai do diretor, e a tela lê na hora de montar. São eles: a lista por perto com o meio (situacao.porPerto, 5 seriais, herói sem fio), a duração da busca vazia, a estimativa de '~40 s', o código errado da T01/07, o rótulo curto 'Alternador', a faixa {min, max} dos sinais, os 6 campos do evento, o passo afetado e a frase da T14/03, as 12 evidências, as entradas digitais e o modem da T13, os títulos longos das seções, a justificativa preenchida, o mapa de encurtamento da fila e o hodômetro estático do a-22. O que vale pra todos entra como regra, e não como campo de um caso (criteriosRegra.recheckHoras 24) · ou (b) um ciclo só de mock antes do C4 · ou (c) tirar o número do texto
- **Meu padrão:** (a)
- **Por quê:** contrato.md:7: valor que falta 'é um achado do gate — nunca um número digitado no componente'. O textos.md é norma (CLAUDE.md:17), então a (c) é redesenho. O dado de uma tela se prova com a tela, e o mock já cresce assim, aditivo por ciclo (mocks.js:546-548). As 24 h são regra de estado (dominio.md:177-180), e não campo da Seção F: isso resolve o choque entre DADOS-D11 e T15-D5. A i-06, há 9 dias em re-checagem, vai ao PM.
- *Absorve:* T01-D9, T03-D3, T05-D2, T05-D3, T07-D5, T13-D7, T13-D9, T13-D12, T13-D17, T14-D4, T14-D6, T15-D5, T15-D10, DADOS-D2, DADOS-D7, DADOS-D9, DADOS-D11, COERENCIA-D17, COERENCIA-D24

#### G9 · O mock tem o valor, e a referência mostra outro: quem ganha?

*Precisa estar decidida em: C1 (a regra); aplicada no ciclo de cada tela.*

- **Opções:** (a) o mock ganha no valor: placa, serial, garagem, número, contagem, rede, firmware, versão, e a hora, que é sempre HORA_NOMINAL. O PNG e o textos.md que mostram outro valor ganham desvio nomeado no CHANGELOG. A frase de interface (causa, motivo, rótulo) é texto e vem do textos.md; o campo do mock que diverge fica sem leitor, e o comentário se acerta. Alinhar o valor de um caso à referência é proposta ao diretor, só com o vai, e só quando o valor não tem outro leitor · ou (b) alinhar o caso à referência por padrão, mudando o mock
- **Meu padrão:** (a)
- **Por quê:** LEIA-PRIMEIRO.md:31: 'o mock ganha sobre o dado, a referência ganha sobre a aparência'. Isso muda o padrão de T03-D1, T04-D2, T06-D4 e T11-D2, que alinhavam a tela à referência. O mock desenhou de propósito a primeira sincronização de Caruaru falhando (mocks.js:540-545), e levar a falha pra Várzea poria a queda no caminho do herói, que é o C4. O a-16 é o ativo da T11 (mocks.js:633-636), a rede nasce conectada (mocks.js:1016), e o herói tem cadastro próprio. O T15-D6 ('ontem' no f-08) fica como a proposta de alinhar, porque o valor não tem outro leitor. contrato.md:8 fixa a hora.
- *Absorve:* T03-D1, T04-D2, T06-D1, T06-D4, T08-D1, T09-D10, T10-D1, T10-D4, T11-D2, T12-D8, T13-D5, T13-D6, T13-D8, T13-D10, T14-D3, T14-D5, T15-D6

#### G10 · O que entra no C2, e o componentes.md muda junto?

*Precisa estar decidida em: C2.*

- **Opções:** (a) 46 componentes que cobrem as 114 linhas, mais 8 primitivos sem linha e 4 composições só na vitrine. O componentes.md ganha as linhas que faltam (primário ×3, link, linha tocável, botões só de ícone) e as peças que só a tela desenha (o instrumento e a linha do pacote da T03; o NADA SE PERDE e o placar da T08). A 'falha', o 'ainda não' e o 'espera' passam pra folha 4, e o 'contador no menu' fica marcado como igual ao 'com pendência'. O que está desenhado e não tem uso (poços 22, 28 e 44, 'ok cinza', o ícone ativo de Últimas instalações) se constrói e se marca 'sem uso nas 105'. A lista de peças de cada tela.md e a coluna 'Telas que usam' se corrigem pelo medido, no ciclo da tela. O 114 muda pelo censo do C2, com o vai · ou (b) um componente por linha (114), e as listas como estão
- **Meu padrão:** (a)
- **Por quê:** A (b) duplica o 'contador no menu' e deixa de fora o primário, o link, a linha tocável e o botão só de ícone, que estão em quase toda tela: 74 das 105 têm primário (M13). As listas das 16 tela.md são a coluna 'Telas que usam' invertida e trazem peças que a tela não usa (13 de 20 na T03, T03-A3). A 'falha' está desenhada na folha 4, não na 1 (T01-A6, T03-A21, T09-A12). O DS-D7 fala em 120, mas T03-D15 e T08-D15 trazem mais peças: o número sai da soma. O 114 é número da versão (CLAUDE.md:36).
- *Absorve:* DS-D6, DS-D7, DS-D12, T03-D14, T03-D15, T08-D15

#### G11 · A mesma peça aparece com dois desenhos, da tela contra a folha ou de duas referências entre si: qual vale?

*Precisa estar decidida em: C2.*

- **Opções:** (a) cada tela como a referência desenha. A peça ganha variante ou propriedade nomeada (margem, folga, altura, tamanho do poço, regra do contador), declarada uma vez em src/ds e em componentes.md. A unificação vai ao diretor como proposta, uma linha por caso. O nome pro leitor segue o estado do dado, não o desenho (G15). A exceção é o chrome, que precisa ficar parado entre telas (G13) · ou (b) unificar pela folha, pela maioria ou pela lei, com desvio nomeado nas referências que perdem
- **Meu padrão:** (a)
- **Por quê:** A referência ganha sobre a aparência (LEIA-PRIMEIRO.md:31), a folha foi recortada da tela (componentes.md:3), e o C13 compara com o PNG da tela (ciclos.md:99-101). Unificar é corrigir por conta (CLAUDE.md:3). Isso muda o padrão de seis decisões que unificavam: T05-D12 (o relógio da 10 fica, e o leitor diz 'ainda não'), T09-D2 (os pinos do 01 ficam no pé), T10-D16 (a divisória da 02 fica), T13-D18 (a legenda a 6, não a 12), T13-D20 (o diálogo a 16, não a 20) e T16-D3 (as duas regras do contador).
- *Absorve:* T01-D18, T04-D20, T05-D12, T08-D7, T09-D2, T09-D11, T09-D12, T10-D16, T11-D4, T11-D6, T11-D12, T13-D18, T13-D20, T14-D12, T15-D7, T16-D3, T16-D14

#### G12 · A referência fura uma lei visual (Leis 1, 4, 5, 6, 7, 10 e 11, R-03, poço na linha, barra sob o véu): construir fiel ou obedecer à lei?

*Precisa estar decidida em: C2.*

- **Opções:** (a) construir como a referência e escrever a exceção na lei. Cada caso vira uma linha proposta pra leis.md. Lei 1: campo focado, faixa esperada, 'decide agora', NADA SE PERDE, o traço lima da T15/01 e os rótulos de prova (M15, 22 textos). Lei 4: o check fora de poço da T07, da T10 e do bloco do evento da T14. Lei 5: o nível da T07. Lei 6: a idade do pacote da T03. Lei 7: a falha da T16/05. Lei 10: a unidade junto de número a 10 e 11px (M8). Lei 11: o traço dos mostradores apagados da T08 (M9). R-03: o título da T01/05 e 07. Poço na linha: 26 e 30 em linha de 50 (T11, T15). Sob o véu: a T13/10 com barra e faixa acesas. O desvio vai pro CHANGELOG · ou (b) obedecer à lei e mudar o desenho
- **Meu padrão:** (a)
- **Por quê:** A LEI é construir o que está desenhado e propor (CLAUDE.md:3), e as leis já aceitam exceção declarada: a Lei 5 tem o placar (leis.md:13), e a linha de pré-checagem tem o token dela (tokens.css:86). Isso muda o padrão de T08-D13 e T12-D7, que subiam a unidade pra 12: o 11 tem token (--t-rotulo-topo, tokens.css:55), então a fidelidade não cria número solto. Na T12, a lista mistura 11 e 12 na mesma peça, e as duas ficam como estão desenhadas.
- *Absorve:* T01-D3, T03-D6, T07-D11, T08-D13, T08-D16, T11-D7, T12-D7, T13-D4, T14-D13, T15-D9, T15-D16, T16-D13

#### G13 · A faixa de sessão é uma peça só? E como ela nasce, fica e morre?

*Precisa estar decidida em: C2 (a peça); o movimento no C5, no C6 e no C11.*

- **Opções:** (a) uma peça só, a 'faixa · sessão aberta' da folha 2: 52 (--faixa-sessao), flex-shrink 0 e borda de baixo --separador, igual em toda tela com sessão. A 'sem ativo' fica em --tinta-apagada. A 'sem ação' leva a casca da T16 (52, --fundo-faixa, padding 16, borda de baixo). A do menu usa --faixa-sessao-menu. Entre telas, a faixa não se mexe. Ao nascer (T05), desce por translateY em --mov-padrao, o conteúdo de baixo acompanha por transform, e a geometria troca no fim. Ao morrer (T16), a faixa sem ação sobe e revela a faixa sem sessão, parada. Entre o menu e as ferramentas, onde ela muda de lugar e de altura (82↔30, 50↔52), tira e faixa entram no conteúdo que esmaece, e a barra troca de cor sem animar · ou (b) copiar cada referência, com e sem borda, encolhendo onde ela encolhe
- **Meu padrão:** (a), com o desvio de 1px nomeado nas 22 referências sem borda
- **Por quê:** Medido: das 63 referências com a faixa de 52 em --fundo-faixa, nenhuma das 34 com borda de baixo tem flex-shrink 0, e todas as 29 sem borda têm (grep do estilo inline nos HTML de 02-telas/*/referencias/html). Com ENCERRAR, são 31 com borda e 22 sem, e a T09 troca de faixa entre a 00/04 e a 01/02/03. Nenhuma escolha é fiel a todas. A folha 2 é a definição da peça, e movimento.md:16 e a Lei 3 pedem um desenho só. O encolhimento vem do conteúdo que passa de 800 (M10), não do desenho. Sem casca, a 'sem ação' pula 52px (DS-D5).
- *Absorve:* DS-D5, T04-D14, T04-D15, T05-D10, T06-D16, T08-D6, T09-D3, T11-D5, T12-D6, T14-D8, T16-D8

#### G14 · Como o toque responde: o alvo abaixo de 48 e o pressionado que a folha não desenha?

*Precisa estar decidida em: C2.*

- **Opções:** (a) o alvo de 48 (--alvo-min) vem de uma área invisível em volta do desenho de 44 ou 46, sem mexer em pixel e sem invadir o alvo vizinho. O cartão que a referência desenha sem botão vira tocável inteiro, com nome (o 'Fotografar o painel' da T10). O pressionado é uma camada por cima da área como está desenhada, sem sangrar: --elevado na linha e no cartão, --roxo-pressionado no primário, --tinta no link. Ela entra por opacity no toque e sai em 100ms (o token novo do G3), e o primário afunda 2% por scale · ou (b) copiar os 44, e trocar a cor do pressionado direto, sem transição
- **Meu padrão:** (a)
- **Por quê:** É o exemplo que a própria regra do gate dá: 48 invisível sobre 44 cumpre as duas sem mudar o desenho. Os alvos de 44 e 46 estão medidos em M7, e a T04/09 já faz o Cancelar com 48 e margem −4. movimento.md:24 dá as três cores e o 'solta em 100ms', e movimento.md:43 só deixa animar opacity e transform: a cor entra como camada, e o 100 vira token.
- *Absorve:* T02-D12, T02-D13, T04-D19, T04-D21, T10-D7

#### G15 · Como o protótipo dá voz aos tocáveis, aos glifos e aos diálogos sem inventar texto?

*Precisa estar decidida em: C2.*

- **Opções:** (a) nome em todo tocável. Os 4 nomes que só o HTML tem ficam declarados no textos.md, numa linha 'para o leitor', junto dos 9 h1 escondidos. O componente de glifo leva como nome uma das 12 legendas da folha 3, dentro ou fora de poço, pela palavra do estado do dado, nunca pelo desenho que a referência usou. Ficam mudos o poço de ferramenta, o marcador de escolha e o glifo de aviso. Vale um dicionário só, o da folha 3. O olho da senha fica 'Mostrar a senha', com aria-pressed. O campo da T01/08, os 4 diálogos e as 4 folhas ganham aria-labelledby no título que já se vê, e aria-modal. Levam aria-checked o marcador, disabled os 18 cartões em espera e o processo correndo, aria-expanded as seções da T13, e aria-hidden a barra do sistema. Sem região viva: fica pro produto real (stack-a-definir.md:14) · ou (b) só a letra: nome nos tocáveis e glifos mudos, como nas referências
- **Meu padrão:** (a)
- **Por quê:** 06-prototipo/CLAUDE.md:36 manda nome em todo tocável, e o campo da T01/08 não tem rótulo (M17). As 12 palavras vêm de uma referência aprovada (a folha 3), então nada se inventa, e um dicionário só dá mesma entrada, mesma saída. O nome segue o estado porque o G11 mantém glifos com outro sentido, como o relógio da T05/10: pelo desenho, o leitor diria 'em andamento' em nove linhas paradas. Isso ajusta o 'o nome segue o glifo' do LAC3-D1. Numa região viva, o prazo e o cronômetro falariam a cada segundo.
- *Absorve:* LAC3-D1, LAC3-D2, LAC3-D3, LAC3-D4, LAC3-D5, LAC3-D6

#### G16 · Quando o conteúdo passa de 800, o que rola e o que fica?

*Precisa estar decidida em: C2.*

- **Opções:** (a) o miolo inteiro rola, entre a faixa e o rodapé. Barra, faixa e rodapé ficam. A folga de 16 até o rodapé é padding do miolo. A foto sai na rolagem 0 · ou (b) só a lista rola dentro do cartão, com cabeçalho e busca parados · ou (c) overflow hidden, como a referência
- **Meu padrão:** (a)
- **Por quê:** Decisão 14: 'abaixo disso, o conteúdo rola e o rodapé fica' (07-decisoes/14-tela-800.md:5), repetida em stack-a-definir.md:15. Oito referências cortam conteúdo com overflow hidden (M11), e é por isso que a faixa encolhe (M10). 'O conteúdo' é o miolo. Rolar só a lista (T06-D2) é um desenho que nenhuma referência tem, e o KNB-5H39, 9º da lista, fica alcançável do mesmo jeito.
- *Absorve:* T06-D2, T14-D9

#### G17 · Como se fotografa pra comparar com a referência?

*Precisa estar decidida em: C2.*

- **Opções:** (a) as telas em 360 × 800 a 2× (720 × 1600, o tamanho dos PNG), com o Chrome headless da máquina e a fonte de 05-recursos, na rolagem 0. As folhas a 1×, numa vitrine que reproduz a moldura de espécime (360 de largura, padding 16, ou 0 no chrome) em canvas de 1440, com os valores da vitrine fora da auditoria de token. A lista fixa de desvios conhecidos (M10 faixa que encolhe, M11 conteúdo cortado, M18 cursor) entra no CHANGELOG antes do C4 · ou (b) tudo a 1× · ou (c) tudo a 2×
- **Meu padrão:** (a)
- **Por quê:** Os PNG de tela são 720 × 1600, e o render dos HTML dá 360 × 800 (censo). Os PNG das folhas estão a 1× (html = png nas 8, DS-D11). A regra 'o conteúdo rola' diverge de 8 PNG por construção, e a faixa travada em 52 difere onde a referência encolhe. Se esses desvios não estiverem escritos antes da primeira comparação, cada foto do C4 em diante vira discussão.
- *Absorve:* DS-D11, COERENCIA-D20

#### G18 · O que o painel e a coluna do palco listam, e de onde vêm os rótulos?

*Precisa estar decidida em: C3.*

- **Opções:** (a) o painel em duas partes: O CAMINHO (T01 a T07, T09, T10, T14, T13, T16) e AS CONSULTAS (T15, T11, T12, T08), com os títulos no estilo do rótulo do painel. O 'Recomeçar do login' fica num pé fixo (linha de 34, borda de cima --borda-rodape), sem confirmação: fecha o painel, zera o estado único e deixa a URL em ?tela=T01. A coluna lista os 50 estados do indice.json, que ganha dois campos aditivos, rotulo e grupo: os 16 rótulos dos quadros entram como estão, os 34 que faltam vêm propostos no gate do C3, e grupo só na T05 · ou (b) as dez etapas do quadro 04, com o rótulo derivado do nome do arquivo
- **Meu padrão:** (a)
- **Por quê:** A decisão 25 descartou as dez etapas por escrito. O palco.md:16 põe a T08 no caminho ('T01 a T10'), e o palco.md:17 a põe nas consultas. A T08 sai do menu (fluxos.md:17), e o herói não passa por ela. O indice.json já é o que o palco lê, e rótulo e grupo são aditivos; a receita de cada estado mora no app (G21), não nele. Rótulo derivado do nome é texto inventado. Um toque, sem confirmar, como na decisão 26.
- *Absorve:* PALCO-D1, PALCO-D2, PALCO-D14, COERENCIA-D12

#### G19 · No palco, quem ganha quando o palco.md e os quadros discordam? E como ficam o celular, o quadrado, o modo estreito e a etiqueta?

*Precisa estar decidida em: C3.*

- **Opções:** (a) onde o palco.md diz, ele ganha dos quadros; onde cala, vale o quadro. O celular fica centrado nos dois eixos, com escala = min(1, (altura − 48)/816, largura que sobra com a coluna), moldura de 8 contando a borda (376 × 816), e 100% a 1440 × 900. O quadrado fica a 16. Quando aparece o 'Voltar ao fluxo', a lista desce como nos quadros. Num estado, o toque não chega ao app (inert na raiz do app, e um ouvinte no celular inteiro, moldura incluída). O 'Voltar ao fluxo' pisca uma vez (opacidade 1 → 0,4 → 1 em --mov-lento com --mov-curva, recomeçando a cada toque, e sem piscar com reduzir) e volta ao instante de antes, ou à semente se o estado veio pela URL. A porta natural abre o estado no fluxo: interativo, moldura --borda. No modo estreito, o quadrado fica em cima à esquerda a 16, o app fica fluido e rola abaixo de 800, e o 'Voltar ao fluxo' vai pro topo do painel. A etiqueta 'C<n> · <data do CHANGELOG>' fica numa constante escrita à mão no commit do ciclo, em 12px e --tinta-apagada, embaixo à esquerda a 16 (no estreito, no pé do painel). Os valores do palco sem token (230, 280, 68, linhas de 32 e 34, moldura 8, raios 34/26, corte 900) vão num palco-tokens.css apoiado nos tokens do app · ou (b) os quadros ganham sempre: 90%, topo 50, quadrado a 24 · ou (c) o palco.md ganha, e onde ele cala decide o uso: a lista não se move e o espaço fica reservado
- **Meu padrão:** (a), e o PALCO-D6 muda: a lista desce, como nos quadros
- **Por quê:** Os quadros são anteriores ao texto: o quadro 04 desenha as dez etapas que a decisão 25 descartou. O palco.md diz 'o app em tamanho real', 'no centro' e 'a 16px das bordas' (palco.md:9-10). O quadro 01 mede o celular a 90% (340 × 736, tela 324 × 720), no topo 50, e o quadrado a 24: isso vira desvio nomeado. Sobre a lista, o palco.md só diz que 'aparece Voltar ao fluxo no topo da coluna' (palco.md:27), então vale o quadro. O palco é ilustração (norma-e-ilustracao.md:18), então os 95 tokens do app não mudam. A etiqueta não pode vir do relógio (CLAUDE.md:12).
- *Absorve:* PALCO-D6, PALCO-D7, PALCO-D8, PALCO-D9, PALCO-D10, PALCO-D11, PALCO-D12, PALCO-D13, PALCO-D16, COERENCIA-D15

#### G20 · A URL endereça momento? E o que faz o voltar?

*Precisa estar decidida em: C3.*

- **Opções:** (a) ?tela=…&estado=… e ?tela=…&momento=… pros 39 momentos, folhas incluídas. O momento abre no fluxo, interativo, montado pela semente mais os toques que levam lá. A URL muda por replaceState, e o voltar do navegador sai do protótipo. Parâmetro inválido abre a tela na semente. O voltar do Android vira pergunta ao PM em pendencias.md, com o padrão 'o voltar só leva, nunca faz' nas seis famílias da tabela do C0. Num processo que pede pra não sair, o voltar não muda nada · ou (b) só tela e estado, com os momentos sem porta listados na coluna (T05-D6) · ou (c) pushState em cada troca, com o popstate aplicando a tabela
- **Meu padrão:** (a)
- **Por quê:** logica.md:65 promete endereço pra 'todo lugar', e a T05/02, a T05/10 e a T11/02 só se alcançam assim (T05-A6, T11-V10). A coluna não lista momento (palco.md:24; R-04, leis.md:43), então o T05-D6 muda. O estado único não se reconstrói da URL, e 39 dos 105 lugares não têm endereço (LAC2-A2). As oito referências de processo já dizem 'não saia da tela' ou 'não interrompa', e inventar texto é proibido. 53 referências desenham o próprio Voltar, e o do sistema faz o mesmo.
- *Absorve:* PALCO-D5, COERENCIA-D23, LAC2-D1, LAC2-D2, LAC2-D3, T05-D6

#### G21 · Como se monta o que o palco abre: a semente de cada tela e a receita de cada estado?

*Precisa estar decidida em: C3.*

- **Opções:** (a) em app/src/estado/sementes.js e receitas.js, feitos só de ids e valores lidos de M, com um teste em node que resolve 16 de 16 sementes e 50 de 50 receitas. A semente reproduz a 00 da referência, e o logica.md segue: a senha com 14 pontos na T01, nada escolhido na T02, o herói na T08, Ibura na T11, a sessão aberta na T12, a seleção [f-10, f-02, f-08] na T15. A receita diz o caso, o recorte, a sobreposição (T05/13, T11/01) ou a condição de apresentação (T02/02: a busca aparece), e usa do caso só o que o estado mostra (T04/03: só 'o link caiu'). Onde nada no mock produz o estado, entra um caso aditivo, um por estado (T05/09, T12/02, T15/01, T15/02, T15/03 e 04). Onde o caso escrito não produz o PNG, vale o caso certo (T09/03 queda-na-cadeia, T10/04 o a-22, T13/09 can-estatico-isolado, T13/10 pronto-para-fechar, T16/01 e 02 trocados). indice.json e estados.md mudam só com o vai. Cada caso vale uma vez por sessão, na tela dele (casosConsumidos). Pular pelo painel troca o estado único inteiro pela semente; se a faixa muda, o celular esmaece em --mov-rapido. Cada estado entra no ciclo da sua tela, e a coluna e as portas entram com cada tela (parte 8) · ou (b) a prosa de logica.md como semente, um campo 'receita' no indice.json, e os 50 estados no C11
- **Meu padrão:** (a)
- **Por quê:** O estado nasce do caso (contrato.md:3, casos.md:3, 06-prototipo/CLAUDE.md:32), e só 30 dos 50 estados têm caso próprio (censo). A semente escrita contradiz a 00 na T01, na T12 e na T15 (T01-A7, T12-A2, T15-A2), e a referência ganha na aparência. O mock fala em '1ª tentativa' e 'cai uma vez' (mocks.js:542, :552-554): com todos os casos sempre ativos, o a-03 falharia em 4 telas seguidas. Deixar os 50 estados pro C11 do plano atual é o maior risco do plano, e 11 já estão no C4 e no C5 (COERENCIA-D18).
- *Absorve:* DADOS-D4, DADOS-D5, DADOS-D6, PALCO-D15, COERENCIA-D18, T01-D2, T02-D3, T02-D8, T04-D3, T05-D5, T05-D8, T08-D18, T09-D8, T10-D12, T11-D3, T11-D10, T12-D1, T12-D3, T13-D1, T13-D2, T15-D1, T15-D2, T15-D3, T15-D4, T16-D1

#### G22 · A sessão das 14:30 é uma reconfiguração do herói, que já foi instalado às 11:47?

*Precisa estar decidida em: C3 (nas sementes); usada no C9, no C10 e no C11.*

- **Opções:** (a) sim, e o logica.md declara isso. A Seção F só conta os itens da fila com criadoAs ≥ sessao.abertaAs. O 'semeado há N dias · Semear de novo' só aparece com 1 dia ou mais, porque o 0 do herói é desta sessão. A lista da T12 mostra a i-01 às 11:47 ao lado da sessão aberta · ou (b) mover i-01, f-05, f-06 e ultimas pra ontem, mexendo em âncora e em texto aprovado
- **Meu padrão:** (a)
- **Por quê:** O escopo que o mock deriva pro herói já é 'configuracao': 'módulo cadastrado neste mesmo ativo → configuracao' (mocks.js:653-655). Assim a T10/00 fica fiel ('nunca semeou', T10-A5), a sessão convive com a instalação de hoje (T12-N1), e nenhuma âncora do gate muda.
- *Absorve:* DADOS-D3, T10-D5

#### G23 · O que faz o ENCERRAR, e as saídas que encerram, fora do caminho feliz, e antes de existir o ciclo que o entrega?

*Precisa estar decidida em: C3.*

- **Opções:** (a) em toda tela com sessão, antes de homologar, é a sessão abortada: 4 passos, sem confirmação, que cancelam o processo que corre (T08) e seguem pro destino. 'Encerrar a sessão e sair' leva à T01 com a fila preservada; o primário do T04/09 leva à T03 da garagem nova. A exceção escrita é a T09 enquanto a Conexão não gravou: o ENCERRAR e o 'Voltar ao menu' levam à recuperação (T09/03), onde o ENCERRAR não faz nada, e o logica.md:61 ganha essa exceção. Antes do C11, o ENCERRAR leva à T16 vazia, só com o nome, como no C3; a porta natural que ainda não existe fica inerte, com desvio nomeado · ou (b) ENCERRAR desabilitado durante processo, e escondido até o ciclo que o entrega
- **Meu padrão:** (a)
- **Por quê:** logica.md:61 e a decisão 26 definem o aborto de 4 passos sem diálogo, e o princípio 4 fecha o canal sempre (dominio.md §4.2). A HU-T09-9 e o tela.md:19 são a regra própria da T09, e o princípio 4 proíbe deixar o módulo sem Conexão. Na T08 relendo, a referência mostra o ENCERRAR normal. Esconder muda o desenho (Lei 3), e o C3 já prevê telas vazias com o nome (ciclos.md:40).
- *Absorve:* COERENCIA-D19, T04-D8, T08-D17, T09-D5, T09-D9

#### G24 · Quando o estado remonta a tela-base na referência (Lei 3, decisão 05), construir fiel ou reservar o lugar?

*Precisa estar decidida em: C4.*

- **Opções:** (a) construir cada estado como a referência desenha, com o desvio da Lei 3 nomeado no CHANGELOG, um por referência, e levar ao diretor a proposta de reservar lugar. Onde dá pra cumprir as duas sem mudar o desenho, cumprir: a faixa travada em 52 (T07/01) e o traço vermelho de 2px da faixa de falha sem roubar altura (T04/03) · ou (b) reservar em toda a tela o lugar do bloco que entra, mudando a 00 · ou (c) unificar as alturas dos quadros (o elo da T09 em 70)
- **Meu padrão:** (a)
- **Por quê:** A Lei 3 (leis.md:11), a decisão 05 e o CLAUDE.md:30 proíbem o remonte, e as referências aprovadas remontam (M19 e os itens A de 13 telas). A LEI é construir o que está desenhado e propor (CLAUDE.md:3), e a (b) redesenha a 00. Isso muda o padrão do T09-D1, que unificava o elo em 70 e mudava a 00 (86): cada quadro fica como está. As duas exceções não mudam o desenho: a faixa encolhe porque o conteúdo passa de 800 (M10), e o 1px da T04/03 é o border-bottom dentro dos 50.
- *Absorve:* T01-D4, T02-D4, T03-D16, T04-D11, T04-D12, T05-D9, T06-D19, T07-D2, T09-D1, T12-D5, T13-D13, T14-D7, T16-D6

#### G25 · O fluxo pede um quadro, um fundo, um texto ou um resultado que nenhuma referência desenha: o que se constrói?

*Precisa estar decidida em: C4.*

- **Opções:** (a) só peças e textos já aprovados, sem desenho nem texto novo. Atrás do véu fica a tela real de onde a folha ou o diálogo nasceu. O quadro sem referência junta peças que existem: a fila drenada antes do disparo, o cabeçalho do herói com a pré-checagem correndo, o começo da conferência da T11. O que pede texto que não existe (o teto de envios, o passo 2 do horímetro, o vazio da busca) fica sem o texto, com o primário desabilitado e o mesmo rótulo, ou com o cartão vazio, e o texto vai ao diretor no gate do ciclo. O toque sem resultado desenhado e sem dado ('Solicitar correção de cadastro', 'Ressincronizar e reenviar', 'Só registrar o diagnóstico') dá o pressionado e só faz o que o texto promete, sem criar item no mock, e vira pendência do PM. A HU sem referência fica escrita como tal no CHANGELOG. A segunda falha da T14 não se constrói · ou (b) esperar a referência ou o texto antes de construir o fluxo
- **Meu padrão:** (a)
- **Por quê:** CLAUDE.md:25 proíbe inventar número ou texto, e contrato.md:7 proíbe dado no componente. A referência não desenha o que fica por baixo do véu (T04-V1, T01-V3), e movimento.md:22 põe o véu 'sobre a tela': mostrar página vazia seria remontar. A decisão 21 diz que o 'Só registrar' 'também leva de volta'. Sem o quadro da fila drenada, o fluxo da T14 não anda (T14-V3).
- *Absorve:* T01-D7, T04-D13, T05-D15, T06-D18, T10-D11, T11-D8, T11-D11, T13-D3, T14-D15, T14-D16, T15-D15, COERENCIA-D25

#### G26 · Quando uma linha de animacao.md pede o que movimento.md proíbe (cor, traço desenhado, layout, curva sem token, reduzir diferente), quem vence?

*Precisa estar decidida em: C4 (vale desde a T01); a conferência linha a linha é o C12.*

- **Opções:** (a) movimento.md vence, e a animacao.md se corrige no mesmo ciclo. A cor que muda troca por duas camadas em opacity quando a animacao.md pede o movimento (o botão que acende na T06), e troca direto quando não pede (o fundo do primário na T02, onde só o texto esmaece). O traço que se desenha vira o glifo surgindo por opacity em --mov-rapido. A linha que nenhuma referência sustenta não roda: o check entre os chassis, os valores virando traço e o tambor da T08. O que sobe ou fecha espaço, onde a animacao.md pede (a lista filtrada da T02, a fila da T15), sobe por translateY (FLIP), e a altura do contêiner troca direto. A mudança de desenho entre dois quadros do fluxo que a animacao.md não cobre (T03 00→02, T05 01→00, T10 00→01, T14 01→00) esmaece o conteúdo em --mov-rapido, como entre telas. A causa que entra numa linha entra por opacity, e a altura salta. 'esmaece' e 'acelera' são --mov-curva. Com reduzir, toda duração é zero, e o processo segue no mesmo ritmo, em ordem · ou (b) a linha da tela vence
- **Meu padrão:** (a)
- **Por quê:** movimento.md:43 e CLAUDE.md:29 são proibição geral, e as 16 animacao.md fecham com 'só transform e opacity — nada que mexa no layout' (ex.: T02/animacao.md:11). A T02 pede 'as que ficam sobem juntas' na mesma folha, e só o FLIP cumpre as duas coisas: por isso o T15-D14 muda pra FLIP. A decisão 24 descartou o corte seco ('deixa dúvida se o toque pegou'). movimento.md:12 faz do --mov-curva a curva de tudo, e movimento.md:47 vale pro app inteiro.
- *Absorve:* COERENCIA-D4, T01-D16, T02-D5, T02-D16, T03-D9, T03-D10, T03-D11, T04-D16, T05-D11, T06-D12, T06-D13, T07-D9, T08-D8, T08-D9, T10-D9, T11-D9, T15-D14, T16-D9

#### G27 · Quando uma tela abre, o processo dela corre, ou ela já nasce no fim?

*Precisa estar decidida em: C4.*

- **Opções:** (a) o processo só corre quando o fato acontece agora, depois da troca de 150ms, a partir do quadro que a semente declara. A T03 sempre baixa no fluxo, e a 03 e a 04 são estados da coluna. A T07 lê ao chegar da T06, e abre já lida pelo menu, pelo painel e depois da T08. A T09 entra no quadro da 00 e anda Leitor → Eventos → Conexão. A T11 lê ao abrir, a partir do desenho da 00. A T14 abre no quadro 01, com a fila drenando. A T16 pelo painel abre com o encerramento correndo desde o passo 1 e passa pela 00 no tick 3. Num estado da coluna, tudo nasce no valor final, parado. Fora disso, nada anima ao abrir · ou (b) toda tela abre no valor final, sem processo
- **Meu padrão:** (a)
- **Por quê:** movimento.md:3 faz da evidência nascendo o centro do app, e CLAUDE.md:29 proíbe contar de zero ao abrir: o processo só corre quando o fato é agora. T07-D7 e T08-D10 se contradiziam na volta da T08: um relia, o outro abria já lido. A T08 acabou de ler, então a T07 abre lida. T02-D17 e T03-D12 se contradiziam na entrada da T03: a T02 já pediu 'Sincronizar', então a T03 baixa. A decisão 23 diz que, num estado, o app fica parado.
- *Absorve:* COERENCIA-D7, COERENCIA-D8, T03-D12, T07-D7, T08-D10, T09-D6, T14-D1, T16-D15

#### G28 · Quando o toque numa linha abre o estado (porta natural)?

*Precisa estar decidida em: C4 (a T02 e a T03); vale até o C11.*

- **Opções:** (a) só onde a referência desenha a linha tocável e o caso cabe no contexto e na sessão: o pacote da garagem e o par módulo × ativo da faixa. O resto abre só pela coluna. O exemplo de logica.md:56 troca o M2C-0999, que não tem link na referência, por um que tem (M2C-0394 → T05/11). A garagem não é porta: escolher e sincronizar sempre baixa, e a falha da T03/01 aparece porque o mock desenhou a primeira sincronização de Caruaru caindo no tick 4 · ou (b) toda linha que é caso abre o estado, e a garagem escolhe o estado da T03 (Ibura → 03, Caruaru → 04)
- **Meu padrão:** (a)
- **Por quê:** R-11 e a decisão 11 falam de 'um módulo ou ônibus da lista' (leis.md:50, 07-decisoes/11-porta-natural.md:5). A T05 desenha o M2C-0999 sem link (T05-A7), e os ativos de Ibura não estão no pacote de Várzea (T06-A11). A faixa não muda dentro da sessão (movimento.md:16), então quem decide é o par (T06-D6). E o mock já dá a porta da T03/01: 'a primeira sincronização do pacote BLOQUEADO (pac-uo-03, 8 dias) falha no tick declarado' (mocks.js:540-545).
- *Absorve:* T02-D17, T05-D7, T06-D5, T06-D6

#### G29 · O tambor é uma peça só? E com que tempo?

*Precisa estar decidida em: C8.*

- **Opções:** (a) um primitivo, a roda de dígito: janela com overflow hidden, fita 0–9 duas vezes, translateY em múltiplos da altura, sempre pra frente, da unidade pra esquerda. Uma rodinha por dígito do lido, sem zero à esquerda. 300ms por rodinha (--mov-lento) e 40ms entre elas, num token novo do G3 que zera no reduzir. Duas peles: a célula de 34/52 na T07 e o texto de 22 no poço na T10. Na T10, o total dá 500ms, e o '600ms no total' vira desvio nomeado. A T08 não tem tambor · ou (b) duas peças, com 60ms na T10 pra fechar em 600 · ou (c) 6 rodinhas fixas, com zero à esquerda
- **Meu padrão:** (a)
- **Por quê:** R-09 e a decisão 10 dizem 'o tambor', no singular (leis.md:48). A T07 declara 300ms por rodinha e 40ms entre elas (T07/animacao.md:8), e a T10, '600ms no total' (T10/animacao.md:7). Com 6 rodinhas, 5 × 40 + 300 = 500, e fechar em 600 pede 60: são dois números pra mesma peça. O escalonamento zera no reduzir ('mostra o número'), então é token, e não ritmo: isso acerta o COERENCIA-D2 e segue o DS-D8. O zero à esquerda seria um dígito que o mock não tem.
- *Absorve:* DS-D8, COERENCIA-D6, T07-D8, T07-D13, T10-D8

### 6.2 · As decisões de cada tela

Só o que é da tela e não cabe numa G. A numeração é `T05·1`; entre parênteses, o id da proposta original.

#### T01

- **T01·1** · Onde começam o prazo e o reenvio quando se chega na 03? — (a) em validadeMin (10:00) e reenvioSeg (60 s), andando 1 s real por segundo · ou (b) congelados em 9:41 e 44 s, como o PNG → **(a), com o 9:41 e o 44 do PNG como desvio nomeado** — 9:41 e 44 s não saem do mock e não batem entre si (T01-V1). O mock ganha sobre o dado (G9), e o 1 s por segundo vai pro módulo de ritmos (G4). *(T01-D5)*
- **T01·2** · O envio da 02 conta no teto por hora? — (a) não, só o reenvio conta: a 03 mostra 'resta 1', e 'Enviar outro código' leva a 0 · ou (b) todo envio conta, e a 03 mostra 'resta 0' → **(a)** — Bate com as quatro referências e com o reenviosNaHora, que nasce em 2 pra o teto de 3 caber num toque (mocks.js:1033). *(T01-D6)*
- **T01·3** · Pra onde vão as três saídas da folha 04? — (a) 'Conferir e reenviar' fica desabilitada enquanto o reenvio corre e depois reenvia pro mesmo telefone, voltando à 03 com o prazo cheio. 'Mandar para o e-mail' volta à 03 com o e-mail e gasta um envio. 'Pedir ajuda ao gestor' só fecha a folha, com desvio nomeado · ou (b) as três só fecham a folha → **(a)** — Cumpre a HU-T01-8 com o dado que existe. Do gestor não há dado nem referência, e o toque sem resultado segue o G25. *(T01-D8)*
- **T01·4** · Esgotar as tentativas libera o reenvio na hora? — (a) sim: o código morreu e o reenvio fica livre, como a 07 mostra · ou (b) não, e vale o reenvioSeg → **(a), com a regra escrita em tela.md no mesmo ciclo** — É o que a referência e o texto da 07 dizem (T01-V6), e a documentação segue (G1). *(T01-D10)*
- **T01·5** · Qual canal vem escolhido? E o valor muda de tamanho com a escolha? — (a) o telefone. O tamanho é do canal (26 no telefone, 18 no e-mail), e só o traço e o rótulo lima trocam · ou (b) o escolhido ganha 26 → **(a)** — A (b) mexe no layout ao escolher (CLAUDE.md:29), e um e-mail de 26 quase não cabe em 320. *(T01-D11)*
- **T01·6** · Os primários ficam desabilitados enquanto falta dado? — (a) Confirmar fica desabilitado abaixo de codigo.length; 'Salvar e entrar' fica habilitado quando as cinco regras verificáveis passam · ou (b) sempre habilitados, com o erro depois → **(a)** — A 08 mostra 'Salvar' ativo com a sexta regra pendente, e o primário desabilitado já está na folha 1. *(T01-D14)*
- **T01·7** · Pra onde leva 'Entrar com a senha nova'? — (a) direto pra T02 · ou (b) de volta à 00, com o usuário preenchido e a senha vazia e focada → **(b), com o texto do botão levado ao diretor** — O tela.md:17 é norma de comportamento, e a referência não o desmente (G1). O botão promete entrar, e esse conflito é do diretor (T01-A12). *(T01-D15)*

#### T02

- **T02·1** · O Pátio Caruaru (pacote vencido) se escolhe na T02? E pra onde leva? — (a) sim. O toque põe o quadrado lima no poço, no lugar do traço, e o primário vira 'Sincronizar Pátio Caruaru'. A T03 baixa o pac-uo-03, que cai na falha de rede no tick 4 da primeira tentativa (T03/01), e o Reconectar completa · ou (b) sim, e leva direto à T03/04-estado-pacote-vencido · ou (c) não: a linha fica inerte → **(a); o analista propôs a (b), e a prova do mock muda o destino** — O fluxos.md:30 ('bloqueia até sincronizar') pede o toque, e o mock desenhou exatamente esse caminho: 'a primeira sincronização do pacote BLOQUEADO (pac-uo-03, 8 dias) falha no tick declarado; Reconectar retoma' (mocks.js:540-545). É a porta que faltava pra T03/01 (T03-A19). A T03/04 fica na coluna (G27). *(T02-D1 (destino revisto por mocks.js:540-545))*
- **T02·2** · Qual é o texto do primário? — (a) 'Sincronizar ' + uo.nome · ou (b) o literal 'Sincronizar Garagem X' de tela.md:16 → **(a)** — Reproduz o 'Sincronizar Garagem Várzea' da referência, e não produz 'Sincronizar Garagem Pátio Caruaru' (T02-N2). *(T02-D2)*
- **T02·3** · Nas trocas seguintes de garagem (Várzea → Ibura), o que anima? — (a) o marcador anterior some direto, o novo surge em 150ms, e o texto do primário esmaece a cada troca · ou (b) só a primeira escolha anima → **(a)** — O movimento conta o que mudou (movimento.md:3), e o texto muda a cada troca. Mesmo token, nenhum movimento novo. *(T02-D6)*
- **T02·4** · Tocar de novo na garagem já escolhida desmarca? — (a) não: continua escolhida, como rádio · ou (b) desmarca, e o primário volta a desabilitado → **(a)** — A escolha é uma só, e um toque acidental não pode apagar o passo. *(T02-D7)*
- **T02·5** · De onde vem o 'N ativos' da linha? — (a) de M.pacotes[uo].contem.ativos · ou (b) de M.ativos filtrados por uoId → **(a), com o gate cruzando as duas fontes** — A linha fala do pacote, e o app sem rede só tem o que o pacote trouxe. É a mesma fonte que a T03 conta (T02-V6). *(T02-D9)*
- **T02·6** · Qual é a regra da frase de idade do pacote? — (a) derivar na hora, em dados/formato.js: diasAtras > bloqueioDias → 'pacote vencido · sincronize antes de usar'; 1 → 'pacote de ontem, HH:MM'; senão, 'pacote de há N dias, HH:MM' · ou (b) texto fixo por UO → **(a)** — contrato.md:22 manda ler o mock na hora de montar, a HU-T03-4 diz que só o '> 7' bloqueia, e a regra reproduz os três textos exatos (G7). *(T02-D10)*
- **T02·7** · O que a busca filtra, e o que mostra quando não acha nada? — (a) filtra por uo.nome e uc.nome, sem acento e sem caixa; grupo sem linha some; o vazio fica sem frase até o diretor dar o texto · ou (b) inventar uma frase de vazio → **(a)** — O mock não tem campo cidade (a cidade vem do nome da UC), e texto fora do textos.md é proibido (G25). *(T02-D11)*

#### T03

- **T03·1** · O que é um tick da sincronização, e em que ordem o pacote baixa? — (a) um tick é um item: 4 s ÷ total de itens (250ms em Várzea, com 16 itens), na ordem Modelos → Ativos → Cartões, numa constante do módulo de ritmos · ou (b) tick fixo de 1 s, na ordem da lista → **(a)** — É a única leitura que produz o quadro da 00 (Modelos 3/3, Ativos 6/10, Cartões 0, '9 de 16') dentro dos 4 s de movimento.md:39. A cadência mora com os ritmos (G4). *(T03-D2)*
- **T03·2** · Como se escreve a versão do pacote? — (a) uma regra só, 'pct-uoNN-AAAA-MM-DD', nas 5 referências, e a 03 passa de 'pac-uo-02' a 'pct-uo02-2026-03-08' · ou (b) como cada referência: a versão deriva do dado sem campo novo ('pct-' + uoId sem hífen + '-' + pacotes[].data, o que dá pct-uo01-2026-03-11, pct-uo01-2026-03-12 e pct-uo03-2026-03-04), e a 03 mostra o id do pacote, como está desenhado → **(b), com a (a) proposta ao diretor** — Medido: o pacotes[].data já existe no mock (2026-03-11, 2026-03-08, 2026-03-04), então não precisa de campo novo. A 03 é a única que mostra o id interno (T03-V15), contra CLAUDE.md:32: é lei contra referência, e o G12 manda construir fiel e propor. Mudar o texto da 03 é decisão do diretor. *(T03-D4 (padrão revisto pelo G12; a versão deriva de pacotes[].data))*
- **T03·3** · Com exatamente 7 dias, o pacote bloqueia? — (a) não: bloqueia com diasAtras > bloqueioDias e avisa com diasAtras ≥ avisoDias. O texto da 03 fica como está, e a contradição vai ao diretor · ou (b) sim, com ≥ 7, como diz o texto da 03 → **(a)** — A HU, a v1, o fluxos.md:30, o estados.md e 'o pacote vale por 7 dias' dizem > 7. Só o texto da 03 destoa (T03-A7). *(T03-D5)*
- **T03·4** · Qual é o fim da escala de idade? — (a) bloqueioDias + 1 (8), com o preenchido travado em 100% pro pacote mais velho · ou (b) o maior diasAtras entre os pacotes → **(a)** — Lê o limiar do dado, põe o limite em 87,5%, e não depende de qual pacote existe (T03-V10). *(T03-D7)*
- **T03·5** · O que o poço de progresso acompanha? — (a) fica fixo em ATIVOS: o rótulo nunca muda, e a barra é ativos baixados ÷ ativos (6/10 = 60%) · ou (b) segue a seção que está baixando, e zera a cada seção → **(a)** — Bate com a referência e não troca rótulo nem volta a barra pra trás (Lei 3). *(T03-D8)*
- **T03·6** · Pra onde vão os links da T03? — (a) 'Voltar ao contexto' e 'Trocar de garagem' → T02; 'Continuar com este pacote' → T04/01 no contexto de Ibura; 'Ir para o menu' → T04/01-momento-sem-modulo · ou (b) 'Trocar de garagem' → a folha de garagem da T04 → **(a)** — Com o pacote vencido, o menu não abre, e a T04/01 é 'o menu antes de conectar' (logica.md:83). *(T03-D13)*
- **T03·7** · Depois de sincronizar, o que a T04 diz do pacote? — (a) o estado único guarda o pacote novo só pra T03/02, e a folha da T04 continua lendo M.pacotes ('ontem, 07:10'), com o desvio nomeado · ou (b) a T04 passa a dizer 'carregado hoje, 14:30', um texto que não está no textos.md → **(a)** — O texto é norma, e o mock ganha sobre o dado. A incoerência fica escrita pro diretor (T03-A18). *(T03-D17)*
- **T03·8** · O pacote traz 3 ou 2 modelos de ativo? — (a) declarar a regra: o pacote traz o catálogo de modelos da empresa (3) e só os presets em uso, e nada muda · ou (b) presets = catálogo, acrescentando o pe-maquina no pac-uo-01 e no pac-uo-02 · ou (c) modelos = os usados (2), e a T03 deixa de dizer '3 de 3' → **(a)** — Mantém o texto e a referência da T03, e não muda valor nenhum. O gate passa a conferir a regra declarada. *(DADOS-D8)*

#### T04

- **T04·1** · Que regra dá o número do contador da fila (2) e o do diálogo de sair (3)? — (a) uma regra só nos dois lugares, e o 06 passa a dizer 2 · ou (b) duas regras escritas em logica.md: o menu conta as não recebidas da garagem ativa (f-01, f-04 = 2); o diálogo conta as na fila de todas as garagens (3) → **(b), com a contradição levada ao diretor, junto do '3 nesta garagem' da T15 (T15·2)** — Texto e referência são norma, e as duas contas saem do mock sem número digitado (T04-A1). *(T04-D1)*
- **T04·2** · O que separa o 00 (sem contador) do 04 (contador 10)? — (a) o contador aparece sempre que há item aberto: na semente dá 10, e o 00 deixa de bater · ou (b) o contador só aparece depois que o checklist foi aberto uma vez (etapas.checklist, no estado único); o número é B + E não resolvidos = 10 → **(b)** — Mantém os dois PNG sem inventar número, e cabe em 'etapas' do estado único (logica.md:11). *(T04-D4)*
- **T04·3** · Com a semente, tocar na garagem abre o 07 ou o 08? — (a) no fluxo, o 07; o 08 só pela coluna · ou (b) pelo dado: o f-04 está enviando, então abre o 08 → **(a), com o f-04 fora da semente da T04, registrado** — O estados.md faz do 07 um momento de toque e do 08 um estado do mundo, e a semente não declara envio em curso (T04-A17). *(T04-D6)*
- **T04·4** · Com a sessão aberta, tocar em Garagem Ibura na folha abre o 09? — (a) sim, como porta natural: o primário roda o encerramento sem homologar (T16/03 → 04) e segue pra T03 da garagem nova · ou (b) o 09 só pela coluna → **(a)** — A HU-T02-3 manda avisar e confirmar, o logica.md:61 define o aborto, e o texto do 07 diz que a troca recarrega o pacote. O aborto segue o G23. *(T04-D7)*
- **T04·5** · Sair da conta sem sessão e sem fila, ou com só uma delas? — (a) sem nenhuma, sai direto pra T01; com uma, o diálogo mostra só o parágrafo que se aplica, com os textos do 06 · ou (b) sempre o diálogo inteiro → **(a)** — O tela.md:19 diz 'diálogo, se houver sessão ou fila', e a (a) não cria texto. *(T04-D9)*
- **T04·6** · 'Sincronize no menu para liberar' e 'Sincronize para renovar o acesso' apontam pra uma ação que o menu não tem. O que fazer? — (a) manter os textos, deixar o Pátio Caruaru sem toque na folha, e levar o achado ao diretor · ou (b) tocar em Caruaru abre a T03 de Caruaru → **(a)** — A (b) cria um caminho que nenhuma referência da T04 declara (T04-N4). A regra que falta vai pro dominio.md e pro PM (G1, COERENCIA-D22). *(T04-D10)*
- **T04·7** · Com a sessão aberta, os cartões CONECTAR MÓDULO e ATIVO navegam? — (a) não: mostram o que está travado na sessão · ou (b) abrem a T05 e a T06 → **(a)** — A HU-T16-2 trava módulo e ativo enquanto a sessão vive, e trocar é trabalho do ENCERRAR. *(T04-D18)*
- **T04·8** · O Cancelar dos diálogos da T04 (06 e 09), e o voltar, levam pra onde? — (a) à folha de onde o diálogo nasceu (T04/05 ou T04/07) · ou (b) ao menu → **(a)** — É o degrau mais perto, e desfaz só o último toque. A referência não desenha o que fica por baixo (T04-V1), então ela não decide. *(LAC2-D6)*

#### T05

Nenhuma própria: as 16 propostas da tela entraram nas transversais (G1, G3, G4, G8, G11, G13, G20, G21, G24, G25, G26, G28).

#### T06

- **T06·1** · Na 00, tocar na linha navega ou marca? — (a) vai direto à 01, e 'Usar este ativo' fica sempre apagado na 00 · ou (b) marca a linha com o quadrado lima e acende o primário, que leva à 01 → **(a)** — O tela.md:15 diz 'tocar num ônibus → confirmar o veículo', e nenhuma referência desenha a linha marcada. O T06-N3 vai ao diretor. *(T06-D7)*
- **T06·2** · O que acontece ao tocar num ônibus que não é caso (QJF-2C61, PCX-9A17, OYS-7D93, RVM-1E54, OCT-2J85, PDZ-3F26, QRA-8G70)? — (a) abre a 01 com os dados dele (lido = cadastro), sem trava, e a lacuna vai pro CHANGELOG · ou (b) inventar uma trava pra esses casos → **(a)** — Não há referência nem texto pras travas de módulo esperado, de módulo já vinculado ou de sem módulo (T06-V1). *(T06-D8)*
- **T06·3** · Em que ordem a tela checa? — (a) pacote → pinos → chassi: a 05 e a 06 vêm antes do par, e depois de resolvido o conflito vem a 01 · ou (b) chassi antes dos pinos → **(a)** — A 05 e a 06 não mostram o par, e o requisito resolve a ocupação de pinos antes de qualquer escrita (requisitos-v1.md:490). *(T06-D9)*
- **T06·4** · Pra onde vai 'Usar leitor sem fio'? — (a) resolve no lugar: a sessão passa a sem fio e segue pra 01 do KHT-4B08 · ou (b) volta pra T05 pra reconectar → **(a), com a contradição de domínio (T06-N1) em pendencias.md** — A HU-T06-5 diz 'no lugar'. O domínio diz que a saída é reconectar o módulo sem fio, e isso é pergunta de produto (G1). *(T06-D10)*
- **T06·5** · Como a busca se comporta? — (a) filtra ao digitar por placa, frota, módulo esperado e chassi; placa de outro pacote abre a 04; sem resultado, o cartão fica vazio e sem texto; sem desenho de foco · ou (b) busca inerte até existir referência → **(a)** — O tela.md:18 declara o filtro, a HU e o mock pedem o identificador (T06-A8), e foco desenhado e lima fora de veredito são proibidos (CLAUDE.md:28, :31). *(T06-D15)*

#### T07

- **T07·1** · Como montar o 03-estado-dominio-mudo? — (a) pelo caso (a-16, ma-02), pedindo uma referência nova do 03 pra ma-02; até ela chegar, o estado fica fora do ciclo, com desvio no CHANGELOG · ou (b) como a referência: dados de ma-01 com a placa do a-16 → **(a)** — contrato.md:3 e casos.md:3: o estado se monta pelo caso, nunca na mão. O próprio mock explica por que o domínio com ma-01 repete o 02 (mocks.js:626-634). *(T07-D1)*
- **T07·2** · De onde vêm o 11,0, o 16,0, o 10,0, a escala 0–12 dos satélites e o passo das marcas? — (a) da regra medida, escrita no tela.md e aprovada antes: faixa ±1,0; fora dela, a escala estica até o inteiro que contém o lido; marcas a cada 10%, com as maiores nas bordas e no centro da faixa; satélites 0–12; nível 0–100 · ou (b) de uma tabela por sinal no código → **(a)** — Reproduz as 4 referências sem número escondido no componente, usando a faixa {min, max} do mock (G8). *(T07-D3)*
- **T07·3** · A T07 (11–16) e a T13 (10–16) desenham o mesmo 13,8 V em escalas diferentes. Uma regra ou duas? — (a) uma regra só, a da T07, e a T13 desvia · ou (b) duas peças, duas regras, cada uma fiel à sua referência → **(b)** — São peças diferentes, em folhas diferentes, e a (a) quebra uma referência aprovada (G11). A regra da T13 é a T13·5. *(T07-D4)*
- **T07·4** · Como a tela decide em que peça vai cada sinal? — (a) por uma regra pela forma do esperado (faixa → barra; 'n ou mais' → mínimo; null + km → tambor; null + % → barra sem faixa; texto → liga-desliga) · ou (b) por um mapa por id de sinal só pra ma-01, com ma-02 e ma-03 como lacuna → **(b)** — Só o ma-01 tem referência. A (a) inventaria o desenho de ma-02 e ma-03 e ainda pediria a regra do cartão grande (T07-V2). *(T07-D6)*
- **T07·5** · Pra onde vai 'Ler novamente'? — (a) relê no lugar, na própria T07 · ou (b) leva à T08 → **(a)** — A T08 apaga os valores (HU-T08-1) e tem tela própria, e 'Ler novamente' não promete apagar nada. *(T07-D10)*

#### T08

- **T08·1** · Em que ordem a grade monta os sinais? — (a) na ordem dos domínios e, dentro do domínio, estático antes de dinâmico, com a regra escrita em logica.md · ou (b) reordenar o sinaisCan no mock → **(a)** — Reproduz o PNG nos 6 domínios sem tocar no mock que outras telas leem (T08-A5). *(T08-D3)*
- **T08·2** · 'Os doze sinais' e o 'de 12' são fixos ou derivados? — (a) texto fixo do textos.md · ou (b) o numeral por extenso de sinaisCan.length ('doze' no herói, 'oito' no KNB-5H39), em dados/formato.js, e a grade monta quantos sinais houver → **(b)** — No herói, sai idêntico à referência. Com o ma-02, o texto fixo mostraria um número falso ao lado de 8 mostradores (T08-V6). *(T08-D4)*
- **T08·3** · A T08 marca algo no estado único pra assertiva 4 da T16? — (a) grava leituraRefeita: true, a T16 continua 'não se aplica' como nas referências, e vai uma pendência ao PM · ou (b) a T16 mostra a assertiva 4 aplicável, com valor derivado → **(a)** — Não há valor no mock nem referência da assertiva aplicável (T08-A10), e o mock já fez da 4 uma assertiva condicional (COERENCIA-D9, no G1). *(T08-D11)*

#### T09

- **T09·1** · O próximo bloco espera o trilho terminar? — (a) começa no instante em que o anterior confirma, com o trilho de 300ms correndo junto, a 1 s por bloco · ou (b) começa depois dos 300ms do trilho → **(a)** — O ritmo declarado é 1 s por bloco (movimento.md:33), e com reduzir ele não muda. Com a (b), cada bloco levaria 1,3 s. *(T09-D7)*

#### T10

- **T10·1** · Em que grandeza o a-09 abre, e o que fazer com a 03? — (a) no fluxo, na ordem de porModelo (Rotação, como a 02); a 03 se monta no palco com o passo atual no hodômetro, fiel ao PNG, e o desvio de ordem fica nomeado · ou (b) a 03 segue o mock e vira 'Hodômetro · 3 de 3' → **(a)** — A ordem é dado, e o mock ganha no fluxo. A 03 é estado parado e gabarito aprovado (T10-A2). *(T10-D2)*
- **T10·2** · O que o 'Depois:' mostra? — (a) só a próxima grandeza, como a 02 e a folha 5, e a 03 mantém o texto dela como estado semeado · ou (b) todas as que faltam, como a 03 → **(a)** — É a regra desenhada na peça segmentado. A divergência da 03 vai pro CHANGELOG até o diretor decidir (T10-A6). *(T10-D3)*
- **T10·3** · Foto e semear dependem uma da outra? — (a) não: 'Semear' funciona com a foto aguardando, e a 01 exata é foto + semear · ou (b) 'Semear' também marca a foto → **(a)** — A 00 mostra o primário habilitado com 'aguarda', e marcar a foto sem fotografar mentiria sobre a evidência (princípio 6). *(T10-D6)*
- **T10·4** · Em que ordem acontece o semear? — (a) em sequência: o tambor, depois a régua em 300ms; o primário fica inerte, com o mesmo texto, e no fim troca pra 'Calibrar o horímetro' · ou (b) tambor e régua juntos → **(a)** — O read-back vem depois da escrita (princípio 3), e não há texto de 'processo correndo' pra essa espera (G25). O tempo do tambor é o do G29. *(T10-D10)*
- **T10·5** · Qual é a regra do rótulo da caixa de não-aplicáveis? — (a) 'NÃO SE APLICAM NESTE MODELO' quando todo motivo vem do cadastro, e 'NÃO SE APLICAM' quando algum vem do módulo, com a regra escrita em estados.md · ou (b) texto fixo por estado → **(a)** — É a única regra que produz a 00, a 02, a 03 e a 04 a partir do dado (T10-V6). *(T10-D13)*

#### T11

- **T11·1** · Como se chega ao momento 02 ('tudo confere') no fluxo? — (a) a T11 aberta pelo menu com a sessão do herói (M2C-0417 + RKT-8H42): nada diverge, e ela vai pro 02; a semente do painel (M2C-0438, diff-divergente) vai pro 00 · ou (b) o 02 só depois de Regravar → T09 → T11, com a M2C-0438 → **(a), escrito em logica.md no mesmo ciclo** — A faixa do PNG 02 é a do herói, o C11 fecha a T11 no caminho do herói, e a T11 é consulta do menu (fluxos.md:15). O endereço do 02 é o G20. *(T11-D1)*
- **T11·2** · Depois de regravar pela T09, o que a T11 mostra ao reabrir com a mesma sessão? — (a) o estado único registra a cadeia concluída, e a T11 abre em 'tudo confere' · ou (b) continua divergente, porque o caso é estático → **(a)** — Com a (b), a tela desmente a regravação que acabou de passar. É derivado do fluxo, sem dado novo, e o caso vale uma vez (G21). *(T11-D15)*

#### T12

- **T12·1** · Como os grupos por idade saem de diasAtras? — (a) manter os textos e declarar um corte nomeado que reproduz a referência (0 HOJE · 1 ONTEM · de 2 até o corte, ESTE MÊS · acima, MAIS DE UM MÊS; o corte fica entre 17 e 26), aditivo no mock, com o gate, e com o número escolhido pelo diretor · ou (b) regra de calendário, que tira o QJF-2C61 do grupo e muda referência e textos.md → **(a)** — Os textos são norma, e a (b) reescreve cópia aprovada. O corte é um número que não existe, então é do diretor (T12-A4). *(T12-D2)*
- **T12·2** · O que abre o toque nas quatro instalações que não são a i-01? — (a) o mesmo detalhe, só com as linhas que o resumo sustenta (Configuração, Checklist, Autoteste, Recebimento), com desvio no CHANGELOG · ou (b) só a i-01 abre → **(a)** — O tela.md:15 é norma: tocar numa instalação abre o detalhe. Omitir linha não inventa número. *(T12-D4)*
- **T12·3** · Que texto e que glifo usam os estados sem referência (reprovada, aprovada após reprocessamento, ressalvada) quando o técnico troca de garagem? — (a) o estado de M.instalacoes, com o nome da máquina de estado de dominio.md:174-181, em caixa baixa como os três desenhados, e o glifo pela natureza da folha 3 (xis pra reprovada, ok pra reprocessada), com desvio no CHANGELOG · ou (b) bloquear a T12 fora de Várzea até ter referência → **(a)** — O estado vem do mock (medido: i-05 'reprovada', i-07 'aprovada-reprocessamento'), e o nome vem de um documento da pasta. Bloquear quebraria a consulta. *(T12-D9)*

#### T13

- **T13·1** · Como cabe a versão gravada inteira (A12.G07.L02.E05.C03)? — (a) num cartão que ocupa as duas colunas, com o desvio nomeado · ou (b) truncada em A12.G07, como o PNG → **(a)** — O valor do mock ganha (G9) e não cabe na meia coluna. É o 'faça o possível e escreva o desvio' (CLAUDE.md:10), com a menor mudança possível. *(T13-D11)*
- **T13·2** · Pra onde leva 'Refazer a leitura da CAN' (09)? — (a) T08 · ou (b) T07, a origem 'can' do mock → **(a), com o comentário do mock acertado** — O texto do botão é norma, e a T08 devolve à T07 depois de reler (HU-T08-3). *(T13-D14)*
- **T13·3** · O que dispara o homologado? — (a) o toque em 'Finalizar instalação', habilitado quando o que bloqueia fecha; o veredito aparece depois do toque · ou (b) o último item passando, sozinho → **(a), com a animacao.md corrigida (G1)** — O tela.md e a 11, que já tem 'Encerrar sessão', dizem Finalizar (T13-A13). *(T13-D15)*
- **T13·4** · Como a Seção E devolve ao ciclo dinâmico? — (a) tocar num cartão de E que falta abre a T14, sem desenho novo · ou (b) tocar na linha E vai direto à T14 → **(a)** — Mantém a 05 como está e cumpre a HU-T13-8 com uma porta. *(T13-D16)*
- **T13·5** · De onde sai a escala do cartão com barra? — (a) de uma regra escrita que reproduz as referências da T13 (bateria 10–16, satélites 0–12), com as posições calculadas; o marcador do GPS, que não sai de conta nenhuma, vira desvio · ou (b) copiar as posições do PNG → **(a)** — Posição copiada é número solto (Lei 13). A T13 tem regra própria (T07·3), e o GPS do PNG diverge da T07 pro mesmo 9 sat (T13-A22). *(T13-D19)*
- **T13·6** · Numa seção aberta do checklist (T13/01 a 06), o voltar fecha a seção ou faz o 'Voltar ao menu' desenhado? — (a) faz o 'Voltar ao menu', como a referência · ou (b) fecha a seção e volta à T13/00 → **(a), como linha de pendencias.md (G20)** — Seção aberta é conteúdo, não lugar (decisão 05). A saída desenhada é a norma, e a (b) inventaria uma saída. *(LAC2-D7)*

#### T14

- **T14·1** · Quando os passos do veículo começam a correr? — (a) a semente traz 2 passos feitos, e os passos 3 a 5 acendem a +9, +12 e +15 s do disparo, com a constante no módulo de ritmos · ou (b) os passos partem do zero no disparo, a cada 3 s, e o 01 mostraria 0 de 5 → **(a)** — É a única leitura que reproduz o 01, o 00 e o 05 e mantém o textos.md. É cadência de simulação, como manda mocks.js:904-907 (G4). *(T14-D2)*
- **T14·2** · Na 00, 'Encerrar o ciclo' e 'Ir para o checklist' levam os dois à T13. O que difere? — (a) 'Encerrar o ciclo' fecha a captura, e os pendentes ficam pendentes na Seção E; 'Ir para o checklist' sai com o ciclo aberto, e o item que falta devolve à T14 (HU-T13-8) · ou (b) os dois fazem o mesmo → **(a)** — Duas saídas iguais seriam a pergunta sem resposta que a Lei 8 proíbe (leis.md:16), e a (a) não cria texto. *(T14-D10)*
- **T14·3** · Pra quem entra a linha do teste do cartão? — (a) só quando há caso de identificador, e o herói fica com 5 passos · ou (b) pra todo ativo com leitor, e o herói passa a 6, quebrando 00, 01 e 05 → **(a)** — Preserva as três referências do herói. A exceção mora no caso, como diz mocks.js:949-951. *(T14-D14)*
- **T14·4** · Quem é o pai da T14, se nenhum toque leva até ela? — (a) o menu, como o 'Voltar ao menu' da T14/05 e de outras 11 telas · ou (b) o checklist → **(a), como linha de pendencias.md; a porta de entrada da T14 fica com o diretor** — No caminho do herói, o checklist vem depois da T14 (T14-N3), e a volta à T14 é pelo item que falta na Seção E (T13·4). *(LAC2-D4)*

#### T15

- **T15·1** · Quando aparece o prefixo 'o servidor recusou ·'? — (a) só quando o cartão tem mais de um erro, como nas referências, com a regra escrita em estados.md · ou (b) sempre → **(a)** — Reproduz a 00 e a 02 sem inventar texto (T15-V5). *(T15-D11)*
- **T15·2** · O que o '3 nesta garagem' conta? — (a) todos os itens mostrados, pendentes e recebidos, como na 00, na 01 e na 02 · ou (b) só os pendentes, como o contador do menu → **(a), com a diferença pro menu (2) levada ao diretor junto da T04·1** — Três referências contam as recebidas, e a HU-T15-2 pede o mesmo número nos dois lugares (T15-A11). *(T15-D12)*

#### T16

- **T16·1** · Como se chega ao corte (01), se a semente da T16 é o herói VL06? — (a) o passo 2 deriva de reinicioPorComando: o herói reinicia por comando, e o corte só aparece na sessão do a-09 / M2C-0371, que é a que a referência 01 mostra (KNB-5H39 · M2C-0371). O logica.md:60 passa a dizer 'quando o driver não reinicia por comando'. Como o M2C-0371 não está na lista da T05, o 01 se alcança pelo endereço de momento (G20), com essa sessão declarada em sementes.js · ou (b) forçar o corte no herói → **(a)** — A (b) faz o dado mentir sobre o VL06 (mocks.js:126-135). Medido: a T05/00 e a T05/01 listam M2C-0417, 0362, 0394, 0335 e 0999, sem o 0371 (T05-A13). Então o 'um toque na lista de T05' do comentário do mock (mocks.js:130) e do T16-D2 não existe. *(T16-D2 (caminho revisto: o M2C-0371 não está na lista da T05))*
- **T16·2** · No encerramento do herói, a assertiva Pontos de cerca se aplica ou não? — (a) derivar do mock: o a-01 tem 4 regiões, então a assertiva se aplica e mostra o lido no molde de 'Identificadores 3 de 3' · ou (b) manter o 'não se aplica' do PNG, sem dado que o sustente → **(a), com o texto proposto no gate do C11; sem o vai, essa linha não fecha no C11** — O estado nasce do dado (G9), e o a-01 tem 4 regiões (T16-A3). Mas o texto da assertiva aplicada não está no textos.md, e texto novo é do diretor (G25). *(T16-D4)*
- **T16·3** · De onde sai o '7 de 8' do 05? — (a) total = M.autotesteEncerramento.length, e 7 = total − reprovadas, com a regra em estados.md · ou (b) casos['autoteste-falhando'].passaram → **(a)** — A (b) lê a contagem da bancada numa tela que o mock separa dela (mocks.js:258-262). O '7 de 8' com só 4 checks lima vai ao diretor (T16-N1). *(T16-D5)*
- **T16·4** · Em que tela o autoteste acende? — (a) os passos 1 a 7 correm em 'Encerrar sessão'; ao fechar o 7, a faixa sobe e a tela passa pra 'Sessão encerrada', onde as 8 assertivas acendem a 400ms; a prova e o 'Voltar ao menu' só entram quando chega a última · ou (b) os 8 passos correm na primeira tela, e a tela de encerrada já abre pronta → **(a)** — 'A saída volta quando o autoteste terminar' pede a (a). Na (b), o acender viraria animação de entrada (CLAUDE.md:29). *(T16-D10)*
- **T16·5** · O que fazem Retomar e Descartar (06)? — (a) Retomar reabre a T09 no bloco 'parou aqui' (o Leitor, que é o bloco depois do último confirmado); Descartar volta ao menu sem sessão e não cria item de fila; na coluna, o estado fica parado · ou (b) não ligar nada até o PM decidir → **(a)** — As duas leituras (pendencias.md:14 e HU-T09-6) coincidem no Leitor, e o mock dá o ponto de retomada. O registro do descarte não tem dado, e não se inventa (G25). *(T16-D12, COERENCIA-D26)*
- **T16·6** · Na sessão interrompida (T16/06), o que faz o voltar? — (a) nada: Retomar e Descartar são atos, e o voltar não escolhe no lugar do técnico · ou (b) sai do app, e a oferta volta na próxima abertura · ou (c) vai ao menu → **(a), como linha de pendencias.md (G20)** — A HU-T16-6 pede que a sessão seja 'oferecida de volta, não perdida em silêncio'. A (b) e a (c) pedem uma regra que a pasta não tem. *(LAC2-D5)*

### 6.3 · As descartadas, com o motivo

- T01-D13 · o seletor de DDI da HU-T01-6: nenhuma referência o desenha, e desenhar é redesenho (CLAUDE.md:3). A máscara pelo M.ddis é o que o mock já dá. A HU fica registrada como HU sem referência no CHANGELOG (G25).
- T02-D14 · a busca da T02 muda quando está focada? A folha 6 não desenha busca focada, e foco de teclado desenhado e lima fora das três categorias são proibidos (CLAUDE.md:28, :31). Não sobra opção a decidir.
- T06-D17 · a frase longa da 06, alinhada à esquerda: construir o que está desenhado é a LEI (CLAUDE.md:3), e centrar é redesenho. O achado (T06-V6) vai ao diretor como achado, não como decisão.
- T08-D12 · a HU-T08-4 entra no protótipo? A alternativa é desenhar um estado que não existe, e o dado nem se alcança: nenhum ma-03 abre sessão (Caruaru bloqueado, M2C-0497 sem driver). Fica como HU sem referência (G25).
- T10-D17 · o valor alvo é editável? Nenhuma referência desenha teclado nem digitação, e o valor nasce do mock (D-21). A (b) é redesenho.
- T11-D13 · a linha divergente mostra o valor do módulo? É redesenho da linha aprovada. A HU-T11-2 parcial e o noModulo sem leitor vão pro CHANGELOG pela regra do G1.
- PALCO-D3 · a coluna mostra os 50 estados, também na T01, na T02 e na T04? Já está decidido em palco.md:24, em ciclos.md:87 ('os 50 estados pela coluna') e no indice.json. Os quadros 00 e 01, com 44, viram desvio pelo G19.
- PALCO-D4 · o 'Um encontrado' (T05/02) entra na coluna? É momento no indice.json, e palco.md:24 e a R-04 (leis.md:43) já dizem que momento não entra. O endereço dele é o G20.
- COERENCIA-D5 · as curvas 'esmaece' e 'acelera': movimento.md:12 já diz que o --mov-curva é 'a curva de tudo, menos do que é linear', e criar curva seria token novo que ninguém pediu. Corrigir as linhas é a documentação seguindo (G1, G26).
- COERENCIA-D13 · o painel em dez etapas ou em duas partes: a decisão 25 já escolheu e descartou as dez etapas por escrito (07-decisoes/25-painel-duas-partes.md:5-7). O que sobra, o lugar da T08, é o COERENCIA-D12, no G18.
- COERENCIA-D14 · a coluna com os 50 estados e nenhum momento: é o mesmo que o PALCO-D3, já decidido em palco.md:24, na R-04 e em ciclos.md:87.

---

## 7 · O que não faz sentido

Onde eu discordo da pasta, sempre com a prova. Primeiro, as oito discordâncias que mais pesam, com a minha posição. Depois, cada item levantado.

1. **A pasta se diz "fechada e medida", e as referências quebram as leis dela em 15 das 16 telas** (TX-1). Uma das duas precisa ceder. Eu não redesenho: construo fiel e escrevo a exceção na lei (G12, G24). Mas a lei que ninguém cumpre deixa de ser lei. O diretor precisa escolher, lei por lei, se ela vale daqui pra frente ou se vira exceção declarada.

2. **O `CLAUDE.md` proíbe "mencionar tecnologia, protocolo ou código", e põe como norma textos com CAN 49 vezes, firmware, GPS, SIM e dBm** (TX-24). As duas regras não fecham. Proponho fechar a lista enumerada do `dominio.md` §2.2 mais BLE, APN e iButton (o R3), com o `textos.md` vencendo. "CAN-BT" e "SIM" vão ao PM (G1).

3. **O plano deixa os 50 estados pro C11, e 15 deles não têm caso no mock** (TX-10, TX-19). Construir a tela sem os estados dela obriga a refazê-la depois, e 50 estados de uma vez é o maior risco do plano. Proponho que cada estado entre com a sua tela (parte 8).

4. **O "114 peças" conta linhas de tabela, não peças.** O primário, o link e o botão de ícone, que estão em quase toda tela, não têm linha. Ao mesmo tempo há duplicatas e composições (TX-3). O C2 constrói 54 peças.

5. **O produto real deve ler o `tokens.json`, e ele guarda 0ms nos três tempos de movimento** (TX-6). Um produto que seguir a norma nasce com o reduzir movimento sempre ligado. Proponho que o `tokens.css` seja a norma e que o JSON seja gerado dele (G3).

6. **A decisão 05 usa como exemplo de "nada se remonta" a T14/02, que move 41px** (T14-A3). O exemplo da regra quebra a regra.

7. **A pasta conta com o leitor de tela** (o `CLAUDE.md` proíbe desenhar foco porque *"o leitor de tela do sistema desenha o dele"*), **mas deixa mudos todos os 398 vereditos** (TX-21). Proponho dar voz aos glifos com as 12 legendas da folha 3, sem inventar texto (G15).

8. **O mock conta a instalação do herói como feita às 11:47 de hoje, e o protótipo inteiro é refazê-la às 14:30** (TX-12). Sem uma regra, a prova da manhã homologa a sessão da tarde. Proponho tratar a sessão como reconfiguração e fazer a Seção F contar só o que a sessão produziu (G22).

### 7.1 · Dos estudos transversais

#### Design system · as oito folhas

- **DS-N1** · alta · ◐ A Lei 14 e a folha 3 mandam Lucide, e a norma diz que a referência manda na aparência. O C2 está pronto quando cada peça, fotografada, bate com a folha. Com Lucide, toda peça com glifo fica diferente da folha. Sem Lucide, fere a Lei 14. As duas normas não fecham juntas.
  - *Prova:* leis.md:22 · 05-recursos/README.md:7 · folha-3:16 'Os ícones vêm do Lucide — nunca desenhados à mão' · 08-produto-real/norma-e-ilustracao.md:11 · LEIA-PRIMEIRO ('a referência ganha sobre a aparência') · 06-prototipo/ciclos.md:35 · cmp.png: anel r9 × r10 e 7 formas diferentes
  - *Correção do verificador:* O conflito existe, mas a regra de desempate já está escrita. LEIA-PRIMEIRO.md:31: 'a referência ganha sobre a aparência — e a divergência é nomeada'. Por ela, o C2 segue o desenho das folhas, e a Lei 14, o 05-recursos:7 e o texto da folha-3 viram desvio nomeado no CHANGELOG. O que não fecha é a folha 3 sozinha: é referência, …
- **DS-N2** · media · ◐ O contrato do C2 ('as 114 peças como componentes') conta linhas, não peças. Ele levaria a construir uma duplicata e 4 composições, e deixaria de fora o primário, o link, a linha tocável e o botão só de ícone.
  - *Prova:* 06-prototipo/ciclos.md:33 · DS-A1 e DS-A3 · M13 (74 referências com primário)
  - *Correção do verificador:* Duplicatas são 2, não 1. 'Contador no menu' tem a geometria de 'com pendência', e 'pré-checagem' é o mesmo HTML de 'aprovada', byte a byte (folha-4:16 e :36). Composições demonstradas são 3: o topo do menu inteiro, a lista de garagens, a seção aberta inteira; a 4ª não sai da prova. Ficam de fora os 6 espécimes (primário nos 3 …

<details><summary>1 de gravidade baixa</summary>

- **DS-N3** · baixa · ◐ A folha 3 diz 'nunca desenhados à mão' e desenha à mão todas as 40 formas. A frase que seria a regra é justamente o que a folha não cumpre.
  - *Prova:* folha-3:16, cabeçalho e os 38 SVG + 2 spans · T01-V9 e T05-V12 viram o mesmo nas telas
  - *Correção do verificador:* A folha-3 tem 28 SVG, não 38: 10 glifos + 10 ferramentas + 8 poços (grep '<svg' = 28). Com os 2 spans ('traço' e 'agora'), são 30 formas, não 40. Desenhos distintos são 18: o check se repete nos 8 poços e no 'ok cinza', e o 'sem sinal' aparece em duas cores.

</details>

#### O palco

- **PALCO-N1** · media · ◐ A divisão entre momento e estado põe condições do mundo como momento: 'só um módulo por perto' (T05/02) e 'nada diverge' (T11/02) dependem do módulo, assim como 'nenhum encontrado' (T05/03), que é estado. Por isso o quadro 03 teve de pôr T05/02 na coluna. É o mesmo padrão de T04-N2.
  - *Prova:* 02-telas/README.md:13 'Estado depende do mundo — módulo, ônibus, rede' · indice T05/02 e T11/02 tipo momento · T05/03 tipo estado
  - *Correção do verificador:* A classificação torta confirma. O 'por isso' não se sustenta: o 00, do mesmo palco, desenha a coluna da T05 sem o T05/02. O 03 não precisava pôr o momento; é divergência entre quadros (A7).
- **PALCO-N2** · media · ✔ 'Tela sem estado de condição' é um conceito que só existe no quadro 00. É ele que tira a T01 e a T02 da coluna, e nenhum documento o define.
  - *Prova:* 00-componentes.html:15 · sem ocorrência em palco.md, README, estados.md e leis.md

<details><summary>1 de gravidade baixa</summary>

- **PALCO-N3** · baixa · ◐ O estado é 'o próprio app, parado', mas o C3 constrói telas vazias. O jeito 'num estado' não tem o que mostrar antes do C11, e o 'pronto quando' do C3 pede 'abrir um estado vazio'.
  - *Prova:* ciclos.md:39-41 e :85-89 · palco.md:35 · 07-decisoes/23:5
  - *Correção do verificador:* O C3 é coerente: 'abrir um estado vazio' é a tela vazia com o nome, parada. Também não é verdade que o jeito 'num estado' não tem o que mostrar antes do C11. O C4 e o C5 comparam todas as referências de T01 a T04, e elas incluem 11 estados (T01 3, T02 1, T03 3, T04 4). O que não fecha é o C11 prometer os 50.

</details>

#### O mock e o contrato de dado

- **DADOS-N1** · alta · ✔ O mock conta a instalação do herói como feita hoje às 11:47, e o protótipo inteiro refaz a mesma instalação às 14:30, com o mesmo par.
  - *Prova:* i-01 do a-01 com M2C-0417: 'aprovada', 11:47, cadeia das 10:02 às 10:26 (mocks.js:314-335); calibracao.ultimas a-01.hodometro 0 (mocks.js:765); f-05 e f-06 recebidos de manhã (mocks.js:432-433). A sessão abre às 14:30 (logica.md:10). A mesma raiz aparece em T10-A5, T12-N1, T13-A9 e T09-N4

<details><summary>2 de gravidade baixa</summary>

- **DADOS-N2** · baixa · ✔ sinal-aguardando-ciclo é obrigatório no gate, mas não tem leitor, e o que ele diz já deriva de fase:'dinamico' nos 5 sinais dinâmicos.
  - *Prova:* gate-cobertura.js:123. mocks.js:492-493. grep 'só confirma' em 02-telas: 0 resultados. textos T07:7 mostra 'SEM ENERGIA · 5 SINAIS · FECHAM ANDANDO', que sai de fase. É o 5º caso do a-03
- **DADOS-N3** · baixa · ◐ O hodômetro do herói é o nominal do modelo inteiro: 15 ônibus ma-01 leem 184.320 km na T07.
  - *Prova:* node: sem caso de hodômetro, KHT-4B08, OYS-7D93, RVM-1E54, PDZ-3F26, QRA-8G70, OCT-2J85 e mais 8 leem sinaisCan ma-01 hodometro '184.320 km' (mocks.js:589). Hodômetro é fato do veículo, não do modelo
  - *Correção do verificador:* No dado, 15 ônibus ma-01 dividem o hodômetro nominal: é fato do veículo guardado no modelo. Na T07 isso aparece em poucos: a-01, a-04, a-12, a-13 e a-14, e a-18 se o firmware for atualizado. Três dos 15 nem têm módulo.

</details>

#### Coerência entre os documentos

- **COERENCIA-N1** · media · ✔ A pasta manda esmaecer a troca de tela em 150ms e proíbe animar a entrada de tela, sem dizer o que é 'entrada'.
  - *Prova:* movimento.md:16 e decisão 24:5 (descartado: 'a troca instantânea') × movimento.md:43 e CLAUDE.md:29 ('animar a entrada de tela'). A lista da T05 que 'surge esmaecendo, uma depois da outra' (T05/animacao.md:7) cai no meio das duas.
- **COERENCIA-N2** · media · ✔ 'Contar de zero ao abrir' é proibido, e a T07 manda o marcador correr do zero quando a leitura chega, que é ao abrir.
  - *Prova:* CLAUDE.md:29 · movimento.md:43 × T07/animacao.md:7 ('corre de zero até o valor') e :8 (o tambor rola, de um ponto que não diz) · movimento.md:3 celebra 'o tambor rolando' · decisão 23:5 diz que o estado é 'parado'. Falta a linha entre a evidência nascendo e o contar ao abrir.
- **COERENCIA-N3** · media · ◐ O movimento.md dá um token pra a faixa descer e, no mesmo arquivo, manda a faixa ficar parada e proíbe mover o layout.
  - *Prova:* movimento.md:10 ('a faixa da sessão descer ou subir') × :16 ('a faixa da sessão ficam paradas') e :43 ('mover o layout'). Uma faixa de 52px descendo no topo empurra o conteúdo; é o que diz T04/animacao.md:7 ('o conteúdo desce junto'; T04-N3, T05-A11).
  - *Correção do verificador:* movimento.md:16 não manda a faixa ficar parada sempre. A linha está na seção 'Entre telas' e fala das telas de uma sessão aberta. Com :10 não há contradição, porque aí a faixa nasce ou some. A contradição real é só entre :10 e :43: a faixa de 52px que desce empurra o conteúdo.

<details><summary>1 de gravidade baixa</summary>

- **COERENCIA-N4** · baixa · ✔ A decisão 20 põe na tela um fim ('A Seção F reprova.') que a pendência deixa aberto (disparos sem limite).
  - *Prova:* 07-decisoes/20:5 e T14/02 ('A Seção F reprova.' + 'Disparar outro evento') × pendencias.md:10 ('sem limite') · HU-T13-6 (a F não bloqueia) · T14-A10.

</details>

#### Lacuna 2 · o voltar do sistema

- **LAC2-N1** · media · ◐ A T16/06 oferece a sessão de volta, mas não tem saída pra trás e as duas ações são atos. Nada diz onde a oferta fica se o técnico não escolher agora.
  - *Prova:* T16/06: tocáveis 'Retomar' (html:102) e 'Descartar' (html:103), faixa 'Sem sessão de configuração' (textos.md:31). HU-T16-6 (dominio.md:399). requisitos-v1.md:1112: 'oferecida de volta, não perdida em silêncio'. requisitos-v1.md:1270: o descarte fica registrado.
  - *Correção do verificador:* O v1 diz mais do que o achado admite. requisitos-v1.md:1111 põe a oferta 'ao reabrir o app'. E a tabela de Notificações (§8, requisitos-v1.md:1188) tem 'Sessão de configuração interrompida por encerramento do app → Abrir T16 — retomar ou descartar': existe uma segunda porta pra oferta. O que falta é outra coisa: essa …

<details><summary>1 de gravidade baixa</summary>

- **LAC2-N2** · baixa · ✔ Nas T09/01 e T09/02, o 'Voltar ao menu' não pode levar ao menu: com a Conexão por gravar, ele cai na T09/03, que tem o mesmo par e o mesmo progresso da 02.
  - *Prova:* T09/textos.md:15 (02: M2C-0312 · PCX-9A17 · 3 de 6 · Conexão —) × :19 (03: o mesmo par, o mesmo 3 de 6, 'Termine a gravação antes de sair.'). A 01 tem a Conexão 'não foi alcançado' (html:115). Princípio 4 (dominio.md:30). Já decidido na T09-G9; aqui só pra dizer que o voltar do sistema herda a mesma regra.

</details>

#### Lacuna 3 · o leitor de tela

- **LAC3-N1** · media · ◐ A pasta conta com o leitor de tela, mas a única regra que ela escreve pra ele não alcança o veredito.
  - *Prova:* CLAUDE.md:28 proíbe o foco desenhado porque 'o leitor de tela do sistema desenha o dele'. A Lei 1 (leis.md:9) faz do veredito a informação central. A única regra pro leitor é 'Nome em todo tocável' (06-prototipo/CLAUDE.md:36), e nenhuma linha das listas de processo é tocável: T05/05–15, T09, T11, T14 e T16 não têm <a> nas …
  - *Correção do verificador:* A âncora mais precisa é a Lei 4 (leis.md:12, «o poço é o lugar onde se lê o veredito»), não a Lei 1 (leis.md:9, que fala do lima). E o total herda o LAC3-A1: são 399, não 398.
- **LAC3-N2** · media · ✔ O único passo em que o técnico age é o que o app nunca anuncia.
  - *Prova:* componentes.md:94 «pede o corte \| é com você · o único passo em que ele age». T16/01:53 energia «Desligue e ligue a alimentação do módulo…». O rodapé é <span> «Aguardando o módulo voltar» (T16/01:124). Sem região viva e sem mudar o foco, o pedido só existe pra quem está olhando, e o usuario.md:5 descreve 'uma mão no módulo, …


### 7.2 · Por tela

#### T01 · Login

- **T01-N1** · media · ✔ O campo focado pinta rótulo e traço de lima, mas foco não é veredito nem escolhido. A lei precisa de uma exceção declarada, ou a peça muda.
  - *Prova:* 00-tela.html: label SENHA #AAEF00 e border-bottom 2px #AAEF00 (também na 01 e na 08); leis.md:9; CLAUDE.md, proibidos: 'lima fora de veredito, de escolhido e do texto do botão primário'
- **T01-N2** · media · ✔ A 01 e a 07 são tratadas como estados, mas nascem da entrada do técnico, não do mundo. Pela definição da pasta, são fluxo.
  - *Prova:* estados.md:3: 'Estado depende do mundo — do módulo, do ônibus, da rede'; a 01 nasce de 'Entrar com senha de menos de 8' e a 07 do 'terceiro código errado' (estados.md:8,14). Só a 06, que depende do tempo, cabe na definição.
- **T01-N3** · media · ◐ A animacao.md pede para os requisitos um movimento que movimento.md proíbe; não dá para cumprir as duas.
  - *Prova:* animacao.md:11 'traço desenhado' (stroke-dashoffset) e 'o texto clareia' (color); movimento.md:43 'transform e opacity'; animacao.md:15 repete 'Só propriedades de transform e opacity'
  - *Correção do verificador:* A tensão existe, mas 'não dá para cumprir as duas' exagera. O texto pode clarear trocando duas camadas por opacity, e o traço pode nascer sob uma máscara revelada por transform (scaleX). O achado certo: o texto de animacao.md:11 é ambíguo e precisa dizer como se faz …

<details><summary>2 de gravidade baixa</summary>

- **T01-N4** · baixa · ◐ O usuário aparece preenchido com 'Lembrar meu usuário' desmarcado, o que contradiz a HU-T01-3. É conveniência do protótipo e precisa ser declarada como tal.
  - *Prova:* 00 PNG: r.vieira no campo e checkbox com aria-checked=false; HU-T01-3 'desmarcado por padrão, guarda só o identificador'; tela.md:9
  - *Correção do verificador:* O preenchimento já está declarado como convenção do protótipo (D-21, mocks.js:3-4; logica.md:20). O que falta é conciliar com o checkbox desmarcado: pela HU-T01-3, usuário lembrado implica caixa marcada.
- **T01-N5** · baixa · ◐ Na 06 a falha acende de um jeito e na 05/07 de outro, no mesmo cartão.
  - *Prova:* 06 html: rótulo 'O CÓDIGO EXPIROU' em #867E9A, sem traço vermelho, só o 0:00 em #E06A5A; 05/07 html: rótulo em #E06A5A e border-bottom 2px #E06A5A; leis.md:7 (Lei 7, aviso de um formato só) e componentes.md 'falha · traço vermelho embaixo'
  - *Correção do verificador:* A incoerência é real, mas a Lei 7 está em leis.md:15, e ela trata do formato do aviso (poço, rótulo, frase), que este cartão não é. A lei que se aplica é a Lei 2 (leis.md:10), junto com a regra 'falha · traço vermelho embaixo' de componentes.md:9.

</details>

#### T02 · Selecionar contexto

- **T02-N1** · media · ✔ O estado 'lista longa' mostra uma lista curta: três garagens que cabem com folga.
  - *Prova:* indice.json 'a empresa tem garagens demais pra uma tela' × PNG 02: o último cartão termina em y=455 e o rodapé começa em y=697, sobram 242px · M.uos.length = 3

<details><summary>3 de gravidade baixa</summary>

- **T02-N2** · baixa · ✔ O padrão literal 'Sincronizar Garagem X' não serve pra uma UO que não se chama 'Garagem …'.
  - *Prova:* tela.md:16 × M.uos[2].nome = 'Pátio Caruaru' → 'Sincronizar Garagem Pátio Caruaru'
- **T02-N3** · baixa · ✔ O primário desabilitado da T02 dá instrução ('Escolha uma garagem'), mas a folha diz que o desabilitado diz o que está acontecendo, e a instrução é papel da legenda. São dois padrões pra mesma situação.
  - *Prova:* folha-1 'primário · desabilitado · sem roxo · diz o que está acontecendo' ('Gravando · não interrompa') × folha-2 'com legenda': 'Escolha um módulo para continuar' em cima de 'Conectar' desabilitado × 00-tela.html:65
- **T02-N4** · baixa · ✔ Três das quatro histórias da T02 (2, 3 e 4) são desenhadas e construídas na T04. Na T02 não têm referência nem toque.
  - *Prova:* tela.md:37-39 × referências T04/07, T04/08, T04/09 × tela.md:13-17 (nenhum toque de troca) × ciclos.md:45-53 (T04 entra só no C5)

</details>

#### T03 · Sincronizar

- **T03-N1** · media · ✔ A referência da tela (00) é um instante de 250ms no meio de um processo, e nenhuma semente diz qual
  - *Prova:* logica.md:39 dá como semente só 'garagem Várzea · pacote pac-uo-01'; o PNG 00 é o item 9 de 16. Pra foto bater, o construtor precisa de um congelamento que a pasta não declara.
- **T03-N2** · media · ✔ 'faltam ~40 s' num download que acaba em 1,75 s
  - *Prova:* textos.md:7 contra movimento.md:39 (4s no total). Quem assiste o protótipo lê 40 segundos e vê o fim logo depois.
- **T03-N3** · media · ✔ O elemento-assinatura só aparece em estados que ninguém alcança navegando
  - *Prova:* tela.md:7 ('a barra de idade … bloqueia pela régua, não por texto'): ela existe só na 03 e na 04, que abrem pela coluna, paradas (palco.md:35). E a 04 bloqueia também por texto (nota 'Os 6 ativos … ficam indisponíveis').
- **T03-N4** · media · ✔ Duas barras de 7 dias no mesmo produto, com sentidos opostos
  - *Prova:* T03/03-04 enche com a idade; T04/05 'RESTAM 2 DE 7 DIAS' drena. requisitos-v1.md:339 diz que as duas validades usam 7 dias — o técnico lê as duas do mesmo jeito.

<details><summary>2 de gravidade baixa</summary>

- **T03-N5** · baixa · ◐ O aviso de 4 dias usa o glifo 'pausa · parou' e manda sincronizar 'quando tiver rede' ao lado de 'Sincronizar agora'
  - *Prova:* 03.html:60-61 (glifo pausa; folha 3: 'parou, sem culpa'); textos.md:19. Nada parou, e o primário diz que dá pra sincronizar já.
  - *Correção do verificador:* O achado vale. A linha é a 03.html:41-42, não a :60-61 (o arquivo tem 52 linhas).
- **T03-N6** · baixa · ◐ O download parado não usa a peça que a componentes.md reserva pra ele
  - *Prova:* componentes.md:66 'processo parado · o veredito de uma cadeia ou de um download' (glifo xis, folha 4), mas a 01 usa o desenho da 'falha' (glifo sem sinal). Ou a regra da peça muda, ou a referência.
  - *Correção do verificador:* Não é bem que a 01 'não usa a peça reservada': a componentes.md reserva as duas peças pra T03 (falha na :9, processo parado na :66). A contradição está na regra da componentes.md ('ou de um download'), não só na referência. Uma das duas regras precisa dizer qual peça …

</details>

#### T04 · Menu

- **T04-N1** · media · ✔ O lima do menu vai além dos três usos da Lei 1: ícones das 9 ferramentas, borda e texto do 'decide agora'
  - *Prova:* 00-tela.html: 10 ocorrências de #AAEF00 (LED + 9 ícones de ferramenta); 01-momento-sem-modulo.html: borda 1 #AAEF00 e 'toque para procurar' em #AAEF00. leis.md:9 ('Nunca enfeite'); CLAUDE.md, proibidos: 'lima fora de veredito, de escolhido e do texto do botão …
- **T04-N2** · media · ✔ O 09 está como estado, mas nasce de um toque, e a condição dele (sessão aberta) é a própria semente da tela; o 06, que é equivalente, está como momento
  - *Prova:* estados.md:13 (06 momento, 'Sair da conta com sessão ou fila') × estados.md:16 (09 estado, 'trocar com a sessão aberta', derivado do fluxo); leis.md:43 (R-04: momento é fluxo); tela.md:9 (semente com sessão)
- **T04-N3** · media · ✔ A linha 'faixa de sessão desce… e o conteúdo desce junto' não cabe na T04 e se contradiz
  - *Prova:* animacao.md:7 × animacao.md:12 ('nada que mexa no layout') e movimento.md:43. O 01 já tem faixa de 50 no mesmo lugar (01-momento-sem-modulo.html:33). O gatilho, fim da pré-checagem, é da T05 (R-05, leis.md:44)
- **T04-N4** · alta · ◐ O app manda sincronizar 'no menu', e o menu não tem sincronizar
  - *Prova:* textos.md:27 ('Sincronize para renovar o acesso.'), textos.md:35 ('Sincronize no menu para liberar'). Os 10 cartões de textos.md:7 e dominio.md:70 não incluem sincronizar, e a tira só tem garagem e conta. dominio.md:46: a sessão de acesso encerra só por Sair ou pelos …
  - *Correção do verificador:* O núcleo procede: o menu não tem sincronizar e nenhuma regra diz que sincronizar renova o acesso. Mas dominio.md:46 não diz 'sem renovação': diz só 'encerra por Sair ou pelos 7 dias' e não fala de renovação. O achado é regra só no texto, sem lastro, e não contradição …
- **T04-N5** · alta · ◐ O menu tranca Últimas instalações por falta de rede, mas a T12 foi desenhada justamente para funcionar sem rede
  - *Prova:* 00-tela.html:118 ('sem conexão', cartão desabilitado); T12/textos.md:19 (00-tela da T12: 'SEM CONEXÃO · Esta é a consulta das 11:47.'); HU-T12-5 ('Offline mostro o último resultado conhecido'); fluxos.md:20 ('consultas: abrem a qualquer hora pelo menu')
  - *Correção do verificador:* A referência está errada: T12/textos.md:19 é o `03-estado-sem-rede`, não o 00-tela da T12 (o 00, na :7, não tem SEM CONEXÃO). O conflito vale: a T12 tem estado próprio sem rede, e o menu tranca a porta dela.
- **T04-N6** · media · ◐ 'sobem no próximo login' contradiz a regra de que a fila continua subindo
  - *Prova:* textos.md:31 × dominio.md §5 HU-T01-4 ('a fila do anterior é preservada e continua subindo') e HU-T15-2; 08-produto-real/o-que-o-prototipo-simula.md:12 ('o envio real, que continua fora da tela')
  - *Correção do verificador:* Duas das três provas não tratam de sair da conta: HU-T15-2 e simula.md:12 falam de sair da tela T15. A HU-T01-4 é compatível com 'sobem no próximo login': a fila fica preservada e volta a subir quando outro usuário entra. O achado certo: nenhuma regra diz se a fila …

#### T05 · Conectar módulo

- **T05-N1** · media · ✔ Na 09, o modem 'sem rede' passa com check lima e, na mesma tela, a tira diz 'Rede do módulo conectada'
  - *Prova:* 09 PNG: 'Modem, SIM e sinal · sem rede' com check #AAEF00 e, na tira, 'Rede do módulo · conectada'. _fontes-v1/requisitos-v1.md, T05: o Modem 'trava quando sem SIM lido, sem attach, ou sinal insuficiente', e a leitura informativa é o 'Estado do modem do módulo'. …
- **T05-N2** · media · ✔ O mesmo '4 de 4' passa na 05 e reprova na 12
  - *Prova:* 05: 'Espaço para cercas 4 de 4' com check. 12: '4 de 4' em vermelho com 'Terminal Cosme e Damião não cabe'. Na 12, o pedido é de 5 regiões para 4 lugares, e o número mostrado não diz isso. O técnico lê o mesmo número com veredito oposto
- **T05-N3** · media · ✔ A faixa diz 'sem ativo', mas a pré-checagem já mediu o ativo
  - *Prova:* 05: 'Espaço no módulo 128 de 192' (128 = ma-01 do a-01) e 'Espaço para cercas 4 de 4' (as 4 regiões do a-01, M.cercas). Os estados de falha escrevem a placa no topo (ex.: 'M2C-0335 · KHT-4B08'). Mesmo assim, a faixa diz 'sem ativo' e o primário manda 'Selecionar ativo'
- **T05-N4** · media · ◐ A 06 conecta a um módulo que a lista não deixa escolher
  - *Prova:* 01: M2C-0999 com marcador de traço, em #867E9A, sem <a>, e 'não está no cadastro desta empresa'. 06: a pré-checagem do M2C-0999 rodou (5 de 11). Não tem caminho de toque entre as duas
  - *Correção do verificador:* Pela pasta, o caminho de toque existe (a porta natural). O que diverge é a referência, que desenha a linha como não tocável: é o mesmo achado do T05-A7. O que este item acrescenta é a lógica. Se a lista já sabe, antes de conectar, que o serial está fora do cadastro, o …

#### T06 · Selecionar ativo

- **T06-N1** · alta · ◐ 'Usar leitor sem fio' e 'O sensor de porta já ocupa o fio branco' contradizem o domínio e o mock: a saída é reconectar o módulo sem fio, e sensor de porta e par serial são linhas diferentes
  - *Prova:* HU-T06-5 (dominio.md:283) e dominio.md:159 'oferece reconectar sem fio' · requisitos-v1.md:494 'Reconectar por BLE' e :1383 'renomear … para Reconectar sem fio' · mocks.js:475-479 'ocupadoPor sensor de porta é ENTRADA DIGITAL; consumidores é o PAR SERIAL … não fundir' …
  - *Correção do verificador:* Duas coisas estão erradas. A citação 'requisitos-v1.md:494' é a linha 496. E o mock não contradiz a tela nos campos literais: mocks.js:482 saida 'oferecer leitor sem fio', e fio e ocupadoPor dizem exatamente 'fio branco' e 'sensor de porta'. O próprio mock usa 'leitor …
- **T06-N2** · media · ◐ 'Solicitar correção de cadastro' abre um pedido no M2 pelo app, que é o mesmo tipo de caminho de improviso que o requisito recusa, e não tem dado nem destino
  - *Prova:* requisitos-v1.md:479 'abrir pedido de cadastro pelo app criaria um caminho de improviso … e um objeto novo no M2 para sustentar' · dominio.md:31 princípio 5 · 02.html:55 · nenhum dado no mock (grep 'correç' em mocks.js: só comentários do gate)
  - *Correção do verificador:* A linha certa é requisitos-v1.md:477, não 479 (a 479 é a regra do arnês). A recusa do requisito é específica do ativo fora do pacote, e requisitos-v1.md:472 aceita 'cadastro errado no M2' como resolução da divergência. E a pasta declara essa saída em fluxos.md:33. …
- **T06-N3** · media · ✔ Na 00, 'Usar este ativo' nunca acende e as linhas têm marcador de escolha, mas tocar nelas leva a outra vista
  - *Prova:* 00-tela.html:99 primário desabilitado · tela.md:15 'tocar num ônibus → confirmar o veículo' · 00-tela.html:42 marcador vazio de 11 em cada linha · não há referência de linha marcada

<details><summary>1 de gravidade baixa</summary>

- **T06-N4** · baixa · ✔ 'Pertence a Garagem Ibura.' está sem crase
  - *Prova:* textos.md:23 e 04.html:44 — o certo é 'Pertence à Garagem Ibura.'; o texto é norma e será copiado assim

</details>

#### T07 · Dados da CAN

- **T07-N1** · media · ✔ 'SEM ENERGIA' contradiz a própria tela: a fase estática é com a chave ligada, e a mesma tela mostra 'Ignição ligada ✓'.
  - *Prova:* 00-tela.html:144 'SEM ENERGIA · 5 SINAIS · FECHAM ANDANDO' e :132 'ligada' com check · mocks.js:571 'estático = chave ligada, motor desligado' · requisitos-v1.md:519 pede listar os dinâmicos 'como aguardando o ciclo dinâmico, com a indicação de que a validação …
- **T07-N2** · media · ✔ Do jeito que está desenhado, o estado 'domínio mudo' não ensina nada novo: é o 'sem leitura' com outro cartão.
  - *Prova:* 03-estado-dominio-mudo.png: um cartão mudo, causa 'ligação' · 02-estado-sem-leitura.png: um cartão mudo, causa 'ligação' · no ma-01 o Motor tem um estático só (mocks.js:596-597: Rotação é dinâmica, Temperatura é estática) · mocks.js:626-631 descarta exatamente esse …

#### T08 · Refazer leitura da CAN

- **T08-N1** · alta · ◐ A releitura mostra o ônibus a 38 km/h, com alternador carregando e motor a 980 rpm, enquanto o técnico está parado na tela, na leitura parada.
  - *Prova:* 01/02: 'Velocidade 38 km/h', 'Tensão do alternador 14,1 V', 'Rotação 980 rpm' · botão '#p' 'Lendo · não saia da tela' (01-momento-relendo.html:94) · mocks.js:571-575 (estático = chave ligada, motor desligado; dinâmico = motor ligado / em movimento) · T07 textos.md:7 …
  - *Correção do verificador:* Os 980 rpm só aparecem no 02. O 01 só tem alternador e velocidade. A T08 não diz em lugar nenhum que o ônibus está parado: a premissa vem da T07 e da fase estática do mock. O 'não saia da tela' fala do aparelho, não do veículo. É o mesmo achado do T08-A2, contado pelo …
- **T08-N2** · media · ✔ O técnico vê '12 de 12' na T08 e, um toque depois, '7 de 12' na T07, para o mesmo ônibus e a mesma leitura.
  - *Prova:* 02-momento-concluida.html:89-90 'LEITURA REFEITA 12 de 12' → tela.md:16 'Ver os dados da CAN → T07' · T07 textos.md:7 '7 · de 12' e os 5 em 'SEM ENERGIA'
- **T08-N3** · media · ✔ O lima de 'NADA SE PERDE' marca uma promessa, não um veredito: nada foi julgado ainda.
  - *Prova:* 00-tela.html:88-89 (rótulo #AAEF00 e border-bottom 2px #AAEF00) antes do toque em 'Refazer a leitura' · leis.md:9 Lei 1 · 07-decisoes/03 'Lima em três lugares só: o que foi julgado, o que foi escolhido, e o texto do botão primário' · no 02 o mesmo desenho marca …

<details><summary>2 de gravidade baixa</summary>

- **T08-N4** · baixa · ✔ O placar da concluída diz três vezes o mesmo fato.
  - *Prova:* 02-momento-concluida: título 'Leitura refeita' (:35) + frase 'Os doze sinais responderam.' (:36) + placar 'LEITURA REFEITA 12 de 12' (:89-90) · leis.md:20 Lei 12 'Prova só quando diz algo novo'
- **T08-N5** · baixa · ◐ O elemento-assinatura promete que o técnico 'sabe o que perde', mas a 00-tela só mostra nomes em traço, não os valores que vão sumir, e a lista fica embaixo, não 'ao lado'.
  - *Prova:* tela.md:7 'a lista do que apaga ao lado do que fica — o técnico sabe o que perde antes de tocar' × 00-tela.png: 12 mostradores com '—' e só o nome, caixa NADA SE PERDE abaixo da grade (y 550)
  - *Correção do verificador:* O que se mede está certo: a 00 não mostra os valores que vão sumir, e a caixa do que fica está embaixo da grade. Mas 'ao lado' pode ser figurado, no sentido de 'junto'. E a grade nomeia os 12 sinais que apagam, então o técnico sabe quais leituras perde, só não vê os …

</details>

#### T09 · Configurar módulo

- **T09-N1** · alta · ✔ O design system já desenha a remontagem que a Lei 3 proíbe
  - *Prova:* folha-5: a mesma cadeia tem linha de 72 quando concluída e de 70 quando recusada. A 00 usa 86 e o 02/03 usam 68. Não existe altura única do elo para o componente respeitar leis.md:11
- **T09-N2** · media · ✔ A prova da cadeia na 04 repete o que a tela já mostra logo acima
  - *Prova:* leis.md:20 (Lei 12: 'a frase que repete o que a tela já mostra é ruído'). A string A12.G07.L02.E05.C03 é só os cinco valores das linhas de cima (A12, G07, L02, E05, C03) juntados com ponto. E o mocks.js:658 diz que ela é 'nunca em tela'. O que seria novo, os …
- **T09-N3** · media · ✔ A 00 diz que não há saída, mas mostra o ENCERRAR ativo
  - *Prova:* 00 PNG: `A saída volta quando a cadeia fechar` no rodapé e `ENCERRAR` (48 de toque) na faixa, no mesmo quadro
- **T09-N4** · media · ✔ A recuperação 'de nova instalação' é aplicada a um ônibus que, pela regra do próprio mock, é reconfiguração
  - *Prova:* HU-T09-9 (dominio.md:316) fala de nova instalação. A regra do mock (mocks.js:654-655) dá 'configuração' pra a-03, que tem o M2C-0312 cadastrado nele, e o 03 é justamente o a-03. O herói também sai 'configuração', embora o fluxo seja de nova instalação (dominio.md:412)

<details><summary>2 de gravidade baixa</summary>

- **T09-N5** · baixa · ✔ A linha 4 do animacao.md descreve um movimento que o protótipo nunca vai mostrar
  - *Prova:* animacao.md:10 (elo recusado). O 01 é estado: abre pela coluna, parado e sem toque (estados.md:3, palco.md:35). No fluxo, o herói nunca tem bloco recusado, e nenhuma porta natural leva ao M2C-0301 na T09
- **T09-N6** · baixa · ✔ A 04 diz 'seis blocos', e o domínio diz que são 5 blocos em 6 passos
  - *Prova:* textos.md:23 `o módulo devolveu os seis blocos`, e o 02 conta a limpeza entre os 'três primeiros blocos'. dominio.md:58: 'Os 5 blocos … A cadeia tem 6 passos (limpeza é o 1)'. HU-T09-8: 'A versão dos 5 blocos'

</details>

#### T10 · Calibração

- **T10-N1** · media · ✔ 'A miniatura surge no lugar do aguarda' não descreve nada que o gabarito tenha
  - *Prova:* animacao.md:9. Na 01 a miniatura fica à esquerda (44px) e o 'aguarda' virou 'fotografada' à direita (01 html:65-70). A miniatura é o ícone de imagem, não uma foto. O mock e 05-recursos não têm imagem nenhuma: ls 05-recursos mostra só fontes/ e marca/.
- **T10-N2** · media · ◐ 'A diferença encolhe até zero' não tem quadro final
  - *Prova:* animacao.md:8. O fim do movimento é a 01, que troca a frase por 'relido às 14:31 · confere com o painel' (01 html:54), sem zero nenhum. Contar até zero é texto mudando, fora de 'só transform e opacity' (movimento.md:43).
  - *Correção do verificador:* O título se confirma: não há quadro com zero. O segundo argumento só vale se o zero for contado como troca de texto. Rolado em roletes, como o tambor, seria transform. A pasta não diz como se faz, e isso é outra lacuna, não uma violação certa.
- **T10-N4** · media · ✔ O mock diz que o desvio torna a tolerância visível, e nenhuma tela a mostra
  - *Prova:* mocks.js:730-731: 'desvio … a ficção que torna a tolerância visível em vez de decorativa'. Os 120 m somem na resolução de km: a 01 mostra 482.317 = 482.317. Nenhuma referência mostra granularidade, decorrido ou uma releitura fora da tolerância.

<details><summary>2 de gravidade baixa</summary>

- **T10-N3** · baixa · ✔ '600ms no total' para o tambor não é token nem ritmo de processo
  - *Prova:* animacao.md:7 × movimento.md:11 (--mov-lento 300ms = 'a rodinha do tambor') e movimento.md:30-39, onde 600ms só aparece para pré-checagem e encerramento. O escalonamento que fecharia a conta não está declarado.
- **T10-N5** · baixa · ✔ A pendência marcada como T10 não é da T10
  - *Prova:* pendencias.md:15: 'T10 \| os sinais podem se chamar Bateria e Alternador no cadastro?'. Nenhum texto da T10 fala de bateria ou alternador (textos.md:7-23). 'TENSÃO DA BATERIA' é da T07 (T07 textos.md:7).

</details>

#### T11 · Conferir configuração

- **T11-N1** · media · ◐ O veredito 'diverge' de cada linha é um traço, e o traço, na folha, quer dizer 'não se aplica'. Com 'NÃO BATE 5 de 5', as cinco linhas parecem não avaliadas.
  - *Prova:* folha-4, 'não se aplica': poço com traço 10×1 #332C49 · 'traço · depende de outra que reprovou' · 00-tela.html:68-100 usa o mesmo traço nas cinco linhas · leis.md:12: o poço é onde se lê o veredito
  - *Correção do verificador:* O achado se sustenta. As linhas são 00-tela.html:40-63, não :68-100. Faltou dizer que a folha não tem a variante divergente da linha de conferência (só a do check lima). Não há norma que diga como a linha divergente se desenha.
- **T11-N2** · media · ◐ A linha divergente mostra o valor do cadastro (o alvo), e não o que está no módulo. O técnico 'vê as divergências' sem ver a divergência.
  - *Prova:* 00-tela.html:72 'tradução frota v2' = noCadastro · o noModulo 'tradução frota v1' não aparece · HU-T11-2 · o DS já tem 'o par comparado · lido × cadastro' (componentes.md:71)
  - *Correção do verificador:* O conteúdo está certo. A linha é 00-tela.html:43, não :72.
- **T11-N3** · alta · ◐ 'diff-divergente, invertido' não pode ser o caso de um momento com a faixa do herói. Inverter o caso do a-16 dá M2C-0438 + ONK-8Q90, não M2C-0417 + RKT-8H42.
  - *Prova:* indice.json T11/02 caso 'diff-divergente, invertido' · mocks.js:496 ativoId a-16, moduloSerial M2C-0438 · 02…html:41,44 M2C-0417 e RKT-8H42
  - *Correção do verificador:* É verdadeiro, mas é o mesmo achado do T11-A1 visto por outro lado: o 02 junta a faixa do herói com os valores do caso do a-16. As linhas são 02…html:27 e :29, não :41 e :44. Deve virar um achado só.

#### T12 · Últimas instalações

- **T12-N1** · media · ✔ A sessão aberta agora com M2C-0417 + RKT-8H42 convive com a lista, que mostra essa mesma dupla já instalada e aprovada hoje às 11:47. O trabalho em curso aparece como encerrado há quase três horas.
  - *Prova:* 00-tela: faixa M2C-0417 \| RKT-8H42 com ENCERRAR, e a primeira linha RKT-8H42 · M2C-0417 · 11:47 · aprovada. O 01 mostra 'Recebimento confirmado 11:47'. logica.md:10: sessão 'aberta às 14:30'. logica.md:24-29: o herói configura RKT-8H42 nesta sessão. mocks.js:316: …

<details><summary>2 de gravidade baixa</summary>

- **T12-N2** · baixa · ◐ O estado 02 muda dois fatos do mundo de uma vez, a garagem e a sessão. A causa declarada é só a garagem sem instalações.
  - *Prova:* estados.md:9: 'a garagem não tem instalações'. 02-estado-nenhuma-instalacao.html:11-14 troca a faixa pra sem sessão. Isso só se explica se a garagem vazia for outra UO (trocar de garagem com sessão aberta é bloqueado, logica.md:131), e essa UO não existe no mock.
  - *Correção do verificador:* A faixa fica em 02:24-29, não em :11-14. E trocar de garagem com sessão aberta não é bloqueado: a T04/09 encerra a sessão antes da troca. Então, se a garagem vazia for outra, estar sem sessão é coerente com o fluxo. O que sobra: o estados.md:9 não diz que é outra …
- **T12-N3** · baixa · ✔ O domínio diz que o produto não tem histórico de intervenções pro técnico, e o detalhe da T12 é o relatório de etapas que o mock diz ser da tela web do gestor.
  - *Prova:* dominio.md:446: 'Não tem histórico de intervenções para o técnico (é tela web do gestor)'. mocks.js:319-320: 'etapa é o relatório. Consumidor: a tela web do gestor.' O 01 desenha as sete etapas de i-01.

</details>

#### T13 · Checklist

- **T13-N1** · alta · ✔ O item reprovado virou outra tela, em vez de acender no mapa
  - *Prova:* Lei 2 (leis.md:10): 'O bloco que falhou acende; o título da tela fica'. HU-T13-2 e requisitos: 'a linha da seção leva direto à tela que corrige'. A 09 é uma tela intermediária de item, e nenhuma referência mostra C falhando no mapa. A peça 'com contador de falha', que …
- **T13-N2** · media · ✔ O elemento-assinatura descrito não é o que está desenhado
  - *Prova:* tela.md:7 'o placar por seção — automático e manual separados'; 00-tela.html:42–48 uma barra só, com o total 21/31. As marcas ficam em 25/50/75%, e as divisas das seções cairiam em 12,9/29/41,9/74,2/90,3%
- **T13-N3** · media · ◐ A Seção F aprovada antes de qualquer envio é uma ordem de fatos impossível
  - *Prova:* 06: 'CHECKLIST 31 de 31' subiu com a tela em 21 de 31, e o ID 'na fila' conta como resolvido. Se F só passa depois do envio, todo Finalizar cai na ciência (requisitos: 'falhando ou pendente'), o que contradiz o mock ('o herói fica com o outro caminho')
  - *Correção do verificador:* A ordem impossível é só a dos itens de F no mock, que dependem da fila (Checklist subido antes de finalizar). Pelos critérios da requisitos e pela T14, F pode passar antes do Finalizar.
- **T13-N4** · media · ✔ Hora futura num relógio congelado
  - *Prova:* 11:41 '14:52' ao lado da barra do sistema em 14:30; CLAUDE.md 'O relógio do produto é 14:30, congelado'; contrato.md 'a hora é HORA_NOMINAL'

<details><summary>1 de gravidade baixa</summary>

- **T13-N5** · baixa · ◐ '−71 dBm' é unidade de rádio na tela de quem lê negócio
  - *Prova:* 03:81 '−71' + 'dBm'; CLAUDE.md 'mencionar tecnologia, protocolo ou código pro técnico' está proibido; dominio.md princípio 1. A T07 fala em 'Satélites 9', sem unidade técnica
  - *Correção do verificador:* 'dBm' é jargão técnico e destoa da T05, mas enquadrar como proibido é leitura, não regra escrita. O certo é propor a decisão, junto com a lacuna R3 do dominio.md.

</details>

#### T14 · Ciclo dinâmico

- **T14-N1** · alta · ✔ Os quadros 01 e 00 não cabem na mesma linha do tempo com os ritmos declarados
  - *Prova:* animacao.md:9 e movimento.md:37 (3s por passo); movimento.md:38 (1s real = 4s de prazo). O 01 tem 2 de 5 antes do disparo. O 00 tem 2 de 5 a 1:36, isto é, 24s de prazo = 6s reais depois do disparo. Se os passos correm desde a entrada, o 01 está em t ∈ [6,9)s, a fila …
- **T14-N2** · media · ◐ Na 00, as duas ações do rodapé levam ao mesmo lugar, e a primária encerra o ciclo com o evento ainda no ar
  - *Prova:* tela.md:18 '`Encerrar o ciclo` → T13'; 00.html:94-95 (#encerrar-ciclo e #checklist). O link 'Ir para o checklist' não aparece em 'O que se toca'. leis.md:16: duas opções sem diferença são uma pergunta que o técnico não sabe responder.
  - *Correção do verificador:* Os fatos estão certos: as duas ações vão para a T13, 'Ir para o checklist' não aparece em 'O que se toca' e 'Encerrar o ciclo' é o primário com o evento no ar. Mas a lei foi mal citada. leis.md:16 (Lei 8) diz 'duas opções de igual peso', e aqui os pesos são diferentes …

<details><summary>2 de gravidade baixa</summary>

- **T14-N3** · baixa · ✔ 'Voltar ao checklist' como primário do 05 fala de uma tela onde o técnico do caminho do herói ainda não esteve
  - *Prova:* fluxos.md:11 'T10 --> T14 --> T13'; palco.md:16 'T01 a T10, depois T14, T13 e T16'; 05.html:94 'Voltar ao checklist'. Na primeira passada, ele vem da calibração.
- **T14-N4** · baixa · ◐ O cronômetro é uma barra tingida com o token da faixa esperada sem ter faixa esperada; a Lei 5 só declara o placar como exceção
  - *Prova:* leis.md:13 'Barra só onde há faixa esperada. O placar do checklist é a exceção declarada' × 00.html:48, que usa rgba(170,239,0,0.14) = --lima-faixa ('a faixa esperada da barra', tokens.css:45) para o tempo que resta.
  - *Correção do verificador:* A leitura literal está certa: a Lei 5 só declara o placar como exceção, e o cronômetro pinta o tempo restante com --lima-faixa. Mas a Lei 6 (leis.md:14, 'o tempo drena, o placar enche') já admite a barra do prazo. O que falta é a Lei 5 declarar o cronômetro como a …

</details>

#### T15 · Fila de saída

- **T15-N1** · media · ✔ A própria animacao.md se contradiz: 'a lista fecha o espaço' é mover o layout
  - *Prova:* animacao.md:8 ('esmaece e a lista fecha o espaço') contra animacao.md:10 ('Só propriedades de transform e opacity — nada que mexa no layout') e movimento.md:43 ('Proibido: … mover o layout'). Com o cartão crescendo até o espaço livre (00.html:40), tirar um item da …
- **T15-N2** · media · ✔ Os dois movimentos da tela não têm onde acontecer nem quadro final
  - *Prova:* A 00 (fluxo) só tem itens de Ibura: f-10, f-02 e f-08, nenhum 'enviando'. A 01 é estado, 'parado e sem toque' (palco.md:35). Nenhuma referência mostra 100% nem a lista depois de o item sair, embora animacao.md:10 diga que 'os quadros de começo e fim são as referências …

<details><summary>1 de gravidade baixa</summary>

- **T15-N3** · baixa · ◐ A 01 fecha o cartão com traço lima enquanto o envio ainda corre, sem veredito
  - *Prova:* 01.html:40 'border-bottom: 2px solid #AAEF00' com o item em 62%. leis.md:9 (Lei 1: lima marca veredito e escolhido). Nas folhas, o traço lima embaixo significa 'gravado e relido' ou 'escolhido' (folha-7 html:161, prova da cadeia; componentes.md:119). Aqui nada foi …
  - *Correção do verificador:* A prova da cadeia está em folha-7:168, e não em :161 (a :161 é a 'linha da fila'). Os sentidos do traço lima também são mais que dois: somam campo focado (folha-6:31) e o valor alvo (folha-8:23). O núcleo se sustenta: na 01 nada foi julgado ainda.

</details>

#### T16 · Sessão

- **T16-N1** · media · ✔ '7 de 8' com só 4 checks lima é o 'OK agregado' que a própria tela promete não mostrar.
  - *Prova:* No 05 passam de fato 4 (Configuração, Identificadores, Canal, Repouso): 1 xis, 2 'não se aplica', 1 'na fila'. Pra chegar a 7, o contador conta 'não se aplica' e 'na fila' como passou: é o 'verde por omissão' de mocks.js:266-268 e o 'OK agregado' da HU-T16-4. E o 02, …
- **T16-N2** · media · ✔ O autoteste que bloqueia a homologação roda depois de a homologação ser dada.
  - *Prova:* T13/11-momento-homologado já diz 'HOMOLOGADA', e o primário 'Encerrar sessão' leva à T16 (T13 textos.md:51). fluxos.md:12 'T13 -- homologado --> T16'. A semente da T16 é 'homologada' (tela.md:9). Depois disso, o 05 diz 'A HOMOLOGAÇÃO FICA BLOQUEADA' (HU-T16-5).
- **T16-N3** · media · ◐ O corte está em 'O que se toca', mas o 01 não tem nada que se toque e ninguém declarou quanto o passo espera.
  - *Prova:* tela.md:16 'no passo do corte: o técnico desliga e religa a alimentação' × 01: só o botão apagado 'Aguardando o módulo voltar'. movimento.md:28-39 não tem ritmo pro corte, e 08-produto-real/o-que-o-prototipo-simula.md não o cita. Sem decisão (G11), o protótipo para no …
  - *Correção do verificador:* O ritmo existe no genérico (600ms por passo do encerramento). O que ninguém declarou é se o passo do corte espera um gesto ou anda sozinho no protótipo, e quanto tempo fica em 'é com você'.


---

## 8 · O plano de ciclos revisado

O `ciclos.md` como eu o executaria. A espinha fica igual: um ciclo por vez, gate no começo, prints comparados e CHANGELOG no fim. Mudam cinco coisas:

| # | O que muda | Por quê |
|---|---|---|
| 1 | **Cada tela entra com os seus estados**, e o antigo C11 deixa de existir | O estado é a tela com outro conteúdo (decisão 05). Construir a peça sem os estados dela obriga a refazê-la depois. 15 estados não têm caso hoje (TX-10), e 50 de uma vez é o maior risco do plano. O C4 e o C5 já comparam 11 estados |
| 2 | **Cada ciclo de tela traz os acréscimos do mock das suas telas**, e o gate cresce junto | Nenhum ciclo prevê mudar `04-dados/` (COERENCIA-A16), e as telas precisam de 22 acréscimos (TX-9). O dado de uma tela se prova com a tela |
| 3 | **O C1 cria o repositório e a ferramenta de print** | Sem git não há "caminho de volta" (TX-19). Sem ferramenta de captura a 2×, nenhum ciclo fecha "comparado com o PNG" |
| 4 | **O C2 constrói 46 componentes e 8 primitivos**, não "114 peças" | O `componentes.md` conta linhas (TX-3). Primário, link, linha tocável e botão de ícone estão em quase toda tela e não têm linha |
| 5 | **A T05 vira dois ciclos** | Com 16 referências, 11 estados e a faixa nascendo, ela sozinha é maior que T01, T02 e T03 juntas |

### Os ciclos

**C0 · Estudo.** É este gate.
- **Pronto quando:** você disser *vai* e as decisões que o C1 precisa (G1 a G9) estiverem respondidas ou aceitas.

**C1 · Fundação.**
- **Entra:**
  - o `git init` na raiz, com `.gitignore` (`node_modules`, `dist`, `.DS_Store`), e o primeiro commit com a pasta como está;
  - o projeto Vite + React 18 em `06-prototipo/app`, com as versões fixadas;
  - os tokens pela G3: o `tokens.css` como norma, os 3 duplicados fora, o `tokens.json` corrigido e o bloco de tokens novos, com o seu ok;
  - a fonte pela G6;
  - `lucide-react`;
  - a ponte do mock pela G7: import de efeito colateral, `M` congelado e cópia explícita no estado;
  - `formato.js` sem `Intl`, `ritmos.js` espelhando o `movimento.md`, e o estado único vazio, já com a forma completa (TX-13);
  - as 49 checagens novas do gate que passam hoje, e a higiene do gate varrendo também `app/src`;
  - **a ferramenta de print**: Chrome headless a 360 × 800 com escala 2, e um script que compara o print com o PNG da referência.
- **Não entra:** nenhuma tela, nenhuma peça.
- **Pronto quando:**
  - `npm run dev` abre o celular vazio em 360 × 800;
  - o print do celular vazio sai em 720 × 1600;
  - o gate aprova com as checagens novas;
  - o primeiro commit está feito.

**C2 · Design system.**
- **Entra:**
  - os 8 primitivos: tipografia, poço, glifo, ícone, marcador, primário nos três estados, botão só de ícone e superfície tocável;
  - depois, as 7 famílias, na ordem da tabela do anexo A, com o tambor por último;
  - a vitrine, reproduzindo a moldura de espécime das folhas, a 1×;
  - o `componentes.md` corrigido no mesmo ciclo: linhas novas, a folha certa de cada peça, a coluna "Telas que usam" medida, e as listas das 16 `tela.md` regeneradas a partir da medição deste gate (G10).
- **Não entra:** nenhuma tela montada.
- **Pronto quando:** cada espécime estiver fotografado ao lado da folha, com os desvios de ícone já nomeados no CHANGELOG (G5).

**C3 · O palco.**
- **Entra:**
  - o quadrado;
  - o painel em duas partes, com a T08 nas consultas;
  - a coluna com os 50 estados, com rótulo e grupo;
  - os dois jeitos do celular;
  - o "Voltar ao fluxo";
  - a URL de tela, estado e momento;
  - o modo estreito, a etiqueta de versão e o Recomeçar (G18 a G20);
  - `sementes.js` e `receitas.js`, com teste em node: todo id resolve no mock, e os 50 estados têm receita, mesmo que ainda vazia (G21).
- **Não entra:** as telas continuam vazias, só com o nome.
- **Pronto quando:**
  - as 16 telas, os 50 estados e os 39 momentos abrem pela URL;
  - as larguras de 899, 900, 948 e 964 foram testadas;
  - o painel e a coluna foram comparados com os quadros, com os desvios de 90%, do quadrado e do painel nomeados.

**C4 · Entrar.** T01, T02 e T03, com os seus 7 estados, e os acréscimos AC-01 a AC-05.
- **Pronto quando:** as 18 referências estiverem comparadas. Os PNG da T01 já trazem a logo no `--lima`.

**C5 · O menu e as folhas.** T04, com as 3 folhas, os 2 diálogos e os 4 estados. Entram também a regra do contador da fila e o ritmo da fila, ou fila parada, se for essa a decisão.
- **Pronto quando:** as 10 referências estiverem comparadas.

**C6 · Conectar: a busca e o caminho feliz.** T05 00, 01, 02, 05 e 10:
- a busca e a lista "por perto" (AC-06);
- a conexão;
- a pré-checagem acendendo no ritmo de 600ms;
- a faixa descendo sem mexer no layout (G13);
- a atualização de firmware.

**Pronto quando:** o caminho feliz estiver animado e as 5 referências, comparadas.

**C7 · Conectar: os estados.** Os 9 estados da pré-checagem, mais os 2 da busca e da conexão (T05/03 e T05/04), com os acréscimos AC-18 a AC-20 e as portas naturais da T05 (G28).
- **Pronto quando:** as 11 referências estiverem comparadas.

**C8 · O ônibus e a CAN.** T06, T07 e T08, com os seus 8 estados. O tambor entra só na T07 (G29). Entram também a faixa esperada numérica (AC-07) e o hodômetro do a-22 (AC-08).
- **Pronto quando:** as 14 referências estiverem comparadas.

**C9 · Configurar e calibrar.** T09 e T10, com os seus 6 estados:
- a cadeia, no ritmo de 1s por bloco;
- o tambor, de 184.320 a 482.317;
- a saída da T09 pra T10.

**Pronto quando:** as 10 referências estiverem comparadas.

**C10 · O ciclo e o checklist.** T14 e T13, com os seus 5 estados e os acréscimos AC-09 a AC-14. A Seção F conta só os itens da sessão (G22).
- **Pronto quando:** as 18 referências estiverem comparadas.

**C11 · Encerrar e consultar.** T16, T15, T11 e T12, com os seus 9 estados e os acréscimos AC-15 a AC-17, AC-21 e AC-22.
- **Pronto quando:** as 19 referências estiverem comparadas e o caminho do herói rodar inteiro, do login ao menu sem sessão.

**C12 · Movimento fino.** As 52 linhas dos `animacao.md`, já com as 23 contradições decididas (G26), e o reduzir movimento.
- **Pronto quando:** cada linha tiver sido conferida contra a regra decidida.

**C13 · Auditoria de fidelidade.** As 105 referências, as 8 folhas e os 5 quadros fotografados, com a lista de desvios nomeados fechada.
- **Pronto quando:** não restar nenhuma diferença sem desvio nomeado.

**C14 · No ar.** O build, a prévia local e a Vercel.
- **Antes, com o seu ok:** o repositório remoto e o projeto na Vercel são publicação, e isso é decisão sua.
- A opção "Include files outside the Root Directory" precisa estar ligada: medido, com ela desligada o build quebra.
- **Pronto quando:** o link público abrir no computador e no celular, com a etiqueta.

### O que vale em todo ciclo

- o gate do ciclo parte do que este C0 já mediu das telas dele, sem reestudar;
- o gate do mock roda sempre que o mock mudar, e o `CLAUDE.md` e o `casos.md` sobem a contagem de casos no mesmo ciclo;
- a documentação da tela (`tela.md`, `estados.md`, `casos.md`, `componentes.md`) é corrigida no ciclo em que a tela entra;
- o print sai a 2× e é comparado com o PNG. Cada diferença é bug ou vira desvio no CHANGELOG;
- o ciclo fecha com um commit e com o CHANGELOG.

### As contas

- **As 105 referências:** 18 (C4) + 10 (C5) + 5 (C6) + 11 (C7) + 14 (C8) + 10 (C9) + 18 (C10) + 19 (C11).
- **Os 50 estados:** 11 no C4 e no C5, 11 no C7, 8 no C8, 6 no C9, 5 no C10 e 9 no C11.
- **Os ciclos continuam 15, de C0 a C14:** o antigo C11 sai, e a T05 ganha dois ciclos.
- **O mapa do plano antigo pro novo:** o antigo C6 vira o C6 e o C7 novos; os antigos C7 a C10 viram C8 a C11; C12, C13 e C14 ficam iguais.

---

## Anexos

### Anexo A · As tabelas de medição dos estudos transversais

Inventários e medições que os ciclos vão usar: as peças por folha, os glifos contra o Lucide, as sementes contra o mock, o estado único, o plano de acréscimos ao mock, as 52 linhas de movimento, a navegação das 105 referências e o leitor de tela.

### Design system · as oito folhas

<details><summary>1 · Inventário por folha × componentes.md · 11 linhas</summary>

- Folha \| O que desenha com legenda \| Linhas em componentes.md \| Casam \| Fora
- F1 fundamentos \| 25 cores · 11 tamanhos de letra · 5 números · 5 espécimes de toque (primário normal · pressionado · desabilitado · link normal e pressionado · linha tocável normal e pressionada) · tabela de 16 tokens · 14 leis \| 1 (:9 'falha') \| 0 \| 'falha' está na F4 (T01-A6) · os 5 espécimes de toque sem linha (T08-A15, T02-V2)
- F2 chrome \| 20: barra do sistema ×4 (normal, no menu, sem sessão, sob o véu) · faixa ×5 (sessão aberta, sem sessão, módulo com falha, sem ação, no menu) · tira de contexto · o topo do menu inteiro · rodapé ×4 · folha ×2 · diálogo ×3 \| 20 (:15–34) \| 20 · nome e regra = legenda \| —
- F3 glifos \| 12 glifos (ok, ok cinza, xis, traço, espera, sem sinal, sem sinal neutro, energia, pausa, relógio, lua, agora) · 10 ferramentas (Conectar módulo, Ativo selecionado, Dados da CAN, Configurar módulo, Refazer leitura, Calibração, Conferir configuração, Finalizar com checklist, Fila de saída, Últimas instalações) · 8 poços (22 24 26 28 30 32 34 44) · 5 marcadores (não escolhido 11, escolhido 11, LED viva, LED sem sessão, LED falha) · 1 espécime (escolha numa lista) = 36 \| 3 (:40–42) \| 1 (escolha numa lista) \| 'ainda não' e 'espera' estão desenhados na F4 (T04-A9, T09-A12) · 35 átomos sem linha
- F4 linhas \| 32: linha de checagem ×5 · família da linha de lista ×8 · cartões de ferramenta ×6 · aviso ×4 · vazio, comparação e histórico ×9 \| 29 (:48–76) + 3 listadas em outra folha (:9, :41, :42) \| 32 \| —
- F5 instrumentos \| 17: leituras ×7 · processo ×4 · encerramento ×3 · tempo e placar ×3 \| 17 (:82–98) \| 17 \| —
- F6 entrada \| 23: cabeçalho ×2 · marca · digitar ×11 · escolher ×7 · leituras em lista ×2 \| 22 (:104–125) \| 22 \| 'botões só de ícone' sem linha
- F7 checklist \| 18: checklist ×6 · evidência ×6 · processo e prova ×6 \| 18 (:131–148) \| 18 \| 'contador no menu' tem a mesma geometria de 'com pendência' da F4
- F8 calibração \| 4 \| 4 (:154–157) \| 4 \| —
- TOTAL \| 120 espécimes com legenda + 35 átomos da F3 (as 25 cores e os 16 tamanhos da F1 são token, não peça) \| 114 \| 111 na folha certa, com regra idêntica à legenda \| 3 na folha errada · 6 espécimes sem linha · 35 átomos sem linha · 1 duplicata · 4 composições (o topo do menu inteiro, a seção aberta inteira, a lista de garagens, passos com o prazo estourado)
- Prova: tmp/ds/especimes.txt e o casamento automático (nome da linha = nome do espécime, regra = legenda de 12px #867E9A) → 'FOLHA ERRADA' em :9, :41, :42 · 'ESPÉCIME SEM LINHA' ×6 · '121 especimes 114 linhas' (1 é o rótulo de grupo da paleta)

</details>

<details><summary>2 · Glifos e ícones → Lucide (lucide-static v1.47.0) · traço em unidades do viewBox · 38 linhas</summary>

- Desenho (folha) \| Lucide mais próximo \| stroke-width no HTML \| Diverge? \| Uso nas 105 telas
- ok (F3) \| circle-check \| 2.2 \| próximo: anel r9 × r10 · check M8 12.3l2.6 2.6L16 9.5 × m16 9-5.5 5.5L8 12 \| 202
- ok cinza (F3) \| circle-check \| 2.2 \| próximo · mesmo desenho, #A9A2BC \| 0 (nem nas outras folhas)
- xis (F3) \| circle-x \| 2.2 \| próximo: só o anel (r9 × r10), o X é igual \| 18
- traço (F3) \| minus \| sem SVG: span 10×1 em #332C49 \| não é SVG (T02-V7: cor) \| —
- espera (F3) \| circle \| 2 (fora de token) \| próximo: r9 × r10 · as telas usam 2.2 \| 36 (em #4E475E e #A9A2BC)
- sem sinal / sem sinal neutro (F3) \| wifi-off \| 2.2 \| forma: arcos inteiros cortados pela diagonal 3→21; Lucide quebra os arcos e usa 2→22 · ponto cheio r1.4 × ponto de ponta redonda (M12 20h.01) \| 7
- energia (F3) \| power \| 2.2 \| próximo: haste 3→11 e arco r8 × 2→12 e r9 \| 1
- pausa (F3) \| pause \| 2.4 (fora de token) \| forma: duas linhas de 9 × dois retângulos 5×18 com raio 1 · as telas usam 2.2 \| 4
- relógio (F3) \| clock \| 2.2 \| próximo: M12 7.5v5l3 2 × M12 6v6l4 2 \| 0
- relógio (F7 bloco do evento, re-checagem) \| clock \| 2.2 \| próximo: M12 7.5V12l3 1.8 — é outro desenho que o da F3 \| 42
- lua (F3) \| moon \| 2.2 \| forma: crescente de dois arcos r8 × arco r9 com mordida r6 \| 2
- agora (F3) \| square \| sem SVG: quadrado cheio 12×12 #F2F0F7 \| forma: Lucide é contorno 18×18 com raio 2; a folha diz 'nunca preenchidos' \| 4
- Conectar módulo \| radio \| 1.8 \| igual \| 5
- Ativo selecionado \| truck (bus, se for ônibus) \| 1.8 \| próximo: caminhão de quinas vivas, rodas soltas da caixa \| 4
- Dados da CAN \| activity \| 1.8 \| forma: espelhado na vertical (desce primeiro: 7,12→10,20→14,4; Lucide sobe primeiro) \| 3
- Configurar módulo \| sun (desenho) · settings (sentido) \| 1.8 \| forma: é o sol do Lucide (círculo r3 e 8 raios), não engrenagem \| 3
- Refazer leitura \| refresh-ccw \| 1.8 \| próximo: pontas das setas deslocadas \| 3
- Calibração \| gauge \| 1.8 \| igual \| 3
- Conferir configuração \| SEM EQUIVALENTE (a silhueta mais perto é wrench) \| 1.8 \| M14.5 5.5a4 4 0 105 5l-9 9-5-5 9-9z: cabeça de arco e cabo a 45° · não bate com wrench, plug-zap nem check \| 3
- Finalizar com checklist \| list-checks \| 1.8 \| forma: três checks × dois checks e a 3ª linha sem check \| 3
- Fila de saída \| upload \| 1.8 \| próximo: haste 16→4 × 15→3, bandeja menor \| 5
- Últimas instalações \| history \| 1.8 \| próximo \| 0 (o cartão aparece sempre em espera · T04-A2)
- Fechar (F2 folha, F6) \| x \| 2.2 \| igual \| 4
- Chevron → (F2, F6 linha de opção) \| chevron-right \| 2.2 \| igual \| 3
- Chevron ∨ (F2 tira) \| chevron-down \| 2.2 no grid 20 \| forma igual · traço renderizado 1,54px × 1,28px no Lucide a 14px \| 10
- Chevron ∧ e → do acordeão (F4, F7) \| chevron-up · chevron-right \| 2.2 no grid 20 \| forma igual · traço 1,76px × 1,47px \| 48
- Reenviar (F2, F6) \| rotate-cw \| 1.8 \| próximo \| 1
- E-mail (F2, F6) \| mail \| 1.8 \| próximo: retângulo 18×14 com raio 1 × 20×16 com raio 2 \| 1
- Gestor (F2, F6) \| user-round \| 1.8 \| próximo: cabeça r4 × r5 \| 1
- Mostrar a senha (F6) \| eye \| 1.8 \| próximo (forma do eye antigo) \| 2
- Lupa (F6) \| search \| 1.8 \| próximo: anel r6,5 × r8 \| 2
- Foto · aguarda (F7) \| camera \| 1.8 \| próximo \| 5
- Foto · tirada (F7) \| image \| 1.8 \| próximo: retângulo 17×14 × 18×18 \| 1
- Check solto (F6 requisitos, F7 cartões de foto) \| check \| 2.2 \| igual · fora de poço \| 7
- Check mini (F5 sinais liga-desliga) \| check \| 2.6 no grid 16, 12px \| forma igual · traço renderizado 1,95px × 1,30px no Lucide \| 8
- Sinal, wi-fi e bateria (F2) \| sem equivalente (desenho do Android, preenchido) \| sem traço \| não é do app \| 105 cada
- RESUMO \| 40 formas: 9 iguais · 18 próximas · 7 mudam de forma · 1 sem equivalente · 2 fora de SVG · 3 do sistema \| 1.8 / 2.2 / 2.6, mais 2 e 2.4 só nas folhas \| anel r9 × r10: +11% de diâmetro com o mesmo tamanho \| Prova: tmp/ds/lucide/*.svg e cmp.png (folha × Lucide × sobreposição)

</details>

<details><summary>3 · Fundamentos (folha 1) × tokens.css · 14 linhas</summary>

- O quê \| A folha mostra \| tokens.css \| Veredito
- Cores \| 25 amostras com hex e nome (fundos 6 · bordas e elevação 7 · tinta 4 · só fora de texto 4 · ação e veredito 4) \| 25 hex (:10–42) \| iguais, 0 diferenças · README:13 diz 23 (M3)
- Transparências \| 6, só como texto na tabela TOKENS ('--lima-faixa .14 · … · --veu .72') · nenhuma amostra \| 6 rgba (:45–50) \| iguais · sem amostra visual
- Letra \| 11 tamanhos (10 11 12 13 14 15 16 17 20 22 28), um peso por tamanho (10/11/17/20/22/28 em 700 · 12–15 em 500 · 16 em 600) \| 11 --t-* (:54–64), sem peso \| tamanho igual · peso não é token · os espécimes de 20 e 22 não têm o letter-spacing da própria legenda (−0,2 e −0,3)
- Números \| 5 (26 34 40 48 62), com letter-spacing −0,4 / −0,6 / −1 / −1,6 / −2 · unidade 12 no 26 e no 34, 18 no 40, 48 e 62 \| 5 --n-* + 2 unidades (:67–73) \| a unidade junto de 40 não tem regra (o token diz 'até 34' e '48 e 62')
- Espaço \| texto: 'de 2 em 2 — 2 · 4 · … · 24 · e 28, 36, 40 nos rodapés' \| 13 --e-* + --respiro (:76–79) \| valores iguais · 'de 2 em 2' não vale acima de 16
- Altura \| texto: '38 · 44 · 50 · 72 — sem exceção' · alvo 48/56 · faixa 52/50 \| :82–90 \| tokens.css:86 ainda diz 'exceção declarada' para --linha-precheck-sessao (38); a F4 diz 'a exceção acabou'
- Poço \| texto: 38→24 · 44→30 · 50→32 \| 8 tamanhos (:94–104), 3 duplicados (M2) \| a F1 não mostra os 8; só a F3 mostra
- Traço \| texto: 2,2 glifos · 1,8 ferramentas e 22px ou mais · 2,6 abaixo de 14px \| :105–107 \| igual no texto; as folhas não seguem (ver DS-A4)
- Movimento \| texto: 'só transform e opacity · 150, 200 ou 300ms · desacelera no fim' \| :110–113 \| falta a curva · falta o 100ms do soltar (movimento.md:24, T02-A7)
- Raio, tela, pé, fonte, caixa, alvo, respiro, voz \| texto \| :93, :98–102, :53 \| iguais
- Estados de toque \| 5 espécimes · primário pressionado = #4A2A80 + scale(0.98) · desabilitado = --fundo-cartao, borda --borda, texto --tinta-apagada · link #A9A2BC→#F2F0F7 · linha tocável #1A1726→#1E1A29 \| --roxo-pressionado (:41) \| batem com movimento.md:24 · a linha tocável tem 54 (T02-A10)
- Leis \| 14 linhas: Leis 1–13 + 'nada encosta' \| leis.md: 14 leis visuais \| falta a Lei 14 (Lucide) · 'nada encosta' é lei de medida (leis.md:31)
- Contagem \| 25 cores · 6 transparências · 16 tamanhos (+ unidade 18 = 17 distintos) \| 25 · 6 · 18 tokens, 17 valores \| README '23 cores' é o único número errado · '17 tamanhos' confere

</details>

<details><summary>4 · Medidas das folhas fora de token, e peças que a folha mede diferente da tela (só o que as telas não disseram, ou o mesmo tema na escala da folha) · 17 linhas</summary>

- Peça \| Na folha \| Na tela / no token \| Situação
- faixa · sem ação (F2) \| sem casca: só a fileira do LED, sem 52, sem --fundo-faixa, sem padding 16, sem borda (folha-2:56–61) \| T16/00, 01, 03: height 52 · #16131D · borda de baixo 1px #2E2840 · padding 0 16 (T16/00-tela.html:25) \| NOVO · a folha mede diferente
- glifo espera \| stroke-width 2 (F1 linha tocável, F3) \| 2.2 nos 36 círculos das telas \| NOVO
- glifo pausa \| 2.4 (F3) \| 2.2 nas 4 telas (T03, T09, T16) \| NOVO
- relógio \| caminho da F3 \| as telas usam o da F7 (42×), a F3 fica com 0 \| escala DS de T14-A13
- poço da ferramenta \| 36×36 com ícone de 18 (F3, 10×) · não é token de poço \| 30 na F4 e na T04 \| NOVO
- glifo no poço 32 \| 20 (F3, 10×) · 19 (F4 e F5, 20×) · 18 (F7 linha de seção do mapa) \| telas: 19 ×51, 18 ×12 · 'ícone = 60%' (tokens.css:104) dá 19,2 \| NOVO na escala DS · o poço 30 leva 18 (×69) ou 17 (×7, linha da fila, T15-A10)
- poços 22, 28, 44 \| só na linha de tamanhos da F3 \| 0 usos nas 105 telas e nas outras 7 folhas \| NOVO
- número de cartão \| 22 na F5 (leitura pequena), na F7 (cartão com barra) e na F8 (valor em poço) \| --n-cartao 26 não aparece em nenhum número das telas · 36 números usam 22 \| escala DS de T07-D12
- unidade do tambor 'km' \| 13/700 (F5:94 e T07) \| --n-unidade-p 12 \| NOVO · passou na mecânica porque 13 é --t-secundario
- barras \| 13 (leitura na faixa) · 18 (placar, borda de fora) · 5/7/9 \| 13 e 18 batem com token só no valor (--t-secundario, --n-unidade-g) · 5/7/9 = M5 \| 13 e 18 NOVOS
- o que não se aplica (F8) \| linhas de 26 (= --poco-26 só no valor) · divisória em #221D2E (--borda-rodape, 'topo do rodapé') \| --divisoria #241F33 é a de 'entre linhas' \| NOVO
- a marca · botões só de ícone (F6) \| traços de 22×1 · margin −10 e −6 · botões 44×44 \| M7 (alvo 44) \| margens NOVAS
- padding e gap \| 18 (barra do sistema, diálogo, folha) · 22 (vazio declarado, escolhido com trava T06) · gap 18 (par comparado, cartão que pede ação) · margin −13 (F7 seção aberta inteira) \| sem token de espaço \| T04-A22 pegou o 18 da T04; o resto é NOVO
- alturas de linha \| 54 (F1, F6 campo, F7 seção do mapa, re-checagem) · 58 · 62 · 70 · 40 · 88 · 108 · 430 · 46 \| M5, T03-A15, T16-A8, T09-V4, T14-A14, T01-A5 \| já dito
- raio do avatar \| 16 e 26 \| círculo sem 50% \| M5
- três grades de desenho \| viewBox 24 (a maioria) · 20 (chevrons) · 16 (check mini) \| o Lucide só tem 24 \| NOVO · o traço renderizado muda (ver tabela 2)

</details>

<details><summary>5 · O tambor (folhas 5 e 8) · 12 linhas</summary>

- Aspecto \| Medido \| Prova
- Onde está desenhado \| só na F5, espécime 'tambor', igual às 4 referências da T07 (8/8 estilos) · a F8 não tem tambor · a T10 não tem rodinha \| folha-5:85–94 · overlap.txt 'tambor 8/8 melhor T07/01' · T10-A8
- Rodinhas \| 6, flex-grow 1 · cada uma ≈42,33 × 52 (298 de conteúdo − 32 do km − 6 vãos de 2 = 254 ÷ 6) · vão de 2 \| cartão com padding 10 14 12 14 e borda 1 dentro de 328
- Dígito \| 34/700/−0,6 (--n-identidade) · um só visível, centrado · sem vizinho acima ou abaixo \| folha-5:88–94
- Casca da rodinha \| fundo --poco · borda de cima --poco-fundo · de baixo --borda-poco · sem laterais · a última tem fundo --fundo-apagado e dígito lima (T07-V4) \| folha-5:94
- Máscara \| nenhuma: sem overflow:hidden, sem gradiente · sem separador de milhar (a T10 escreve '184.320') \| idem
- Unidade \| 'km' 13/700 em caixa 32×52 · rótulo 'SEM FAIXA' (Lei 5) \| folha-5:85, 94
- Estados desenhados \| só em repouso · T07 00–03 sempre com 6 dígitos · nenhum quadro de começo do rolar \| dígitos das 4 T07: 184320 · 201115 · 176902 · 184320
- Construção só com transform e opacity \| janela = a própria rodinha com overflow:hidden (recorta na caixa de padding e as bordas ficam) · fita absoluta de dígitos em células de 50 (52 − 2 de borda), line-height 50 · translateY(−n×50px) · 'sempre pra frente' pede a fita 0–9 duas vezes (20 células) · da direita pra esquerda · reduzir movimento: 0ms e o número final \| movimento.md:43, 47 · T07 animacao.md:8 · T10-D8
- 184.320 → 482.317 por rodinha, pra frente \| 1→4 (3) · 8→8 (0) · 4→2 (8) · 3→3 (0) · 2→1 (9) · 0→7 (7): até 9 células (450px) em 300ms \| ciclos.md:71
- Ritmo \| T07: 300ms por rodinha + 40ms entre elas (500ms no total) · T10: 600ms no total (60ms entre elas, T10-D8) · dois escalonamentos para a mesma peça \| T07 animacao.md:8 · T10 animacao.md:7 · T07-D8
- Duas peles \| célula 34/52 (T07) e texto 22 dentro do poço (T10, que não tem desenho) · a peça 'tambor' só lista T07 (componentes.md:86) \| T10-A8 · T10-D8

</details>

<details><summary>6 · O C2 de verdade · componentes por família, na ordem de construção · 10 linhas</summary>

- # \| Família \| Componentes \| Linhas de componentes.md que cobre \| Depende de
- 1 \| Primitivos (sem linha) \| tipografia (texto e número com unidade) · poço (superfície e quadrado) · glifo (10 formas + traço + agora) · ícone (casca do Lucide) · marcador (quadrado 11 e LED 8) · botão primário (normal/pressionado/desabilitado/processo) · botão só de ícone · superfície tocável \| 0 (6 espécimes da F1/F6 + 35 átomos) \| tokens (C1), DS-D1, DS-D3, DS-D4
- 2 \| Ações \| link (rodapé e dentro do conteúdo) · botão secundário \| 2 \| 1
- 3 \| Chrome \| barra do sistema · faixa da sessão · tira de contexto · rodapé · folha + véu · diálogo \| 19 + 1 composição (o topo do menu) = 20 \| 1, 2, linha de opção
- 4 \| Linhas \| linha de lista 38/50 (checagem, pré-checagem, passo, assertiva, conferência, pré-condição) · cabeça de seção · linha do histórico · linha da fila · linha de garagem · linha de escolha 72 · linha de opção · lista com contagem \| 25 + 3 composições = 28 \| 1
- 5 \| Cartões e avisos \| aviso (4 usos) · nota (vazio, tracejada, com rótulo, instrumentos apagados, o que não se aplica) · cartão de ferramenta (7, com o 'contador no menu') · par comparado · bloco escolhido · cartão que pede ação · tira de leituras · cartão de valor · cartão de foto · foto · mostrador · bloco do evento · prova \| 34 \| 1, 4
- 6 \| Instrumentos \| leitura com faixa (5, com o cartão com barra) · segmentado · placar · prazo · cadeia · cadeia do encerramento · sinais liga-desliga · tambor (roda de dígito) · valor em poço · régua · valor alvo \| 19 \| 1, DS-D8
- 7 \| Entrada \| cabeçalho · marca · campo (campo, focado, busca, justificativa) · requisitos da senha · código · checkbox \| 11 \| 1, 2
- — \| TOTAL \| 46 componentes cobrem as 114 linhas · + 8 primitivos · + 4 composições só de vitrine = 54 a construir \| 114 \| —
- — \| Vitrine \| 120 espécimes na moldura da folha (360 de largura, padding 16, ou 0 no chrome) · + 35 átomos da F3 · fotografados a 1× (a PNG da folha é 1440 por 1440 de layout; as telas são 2×) \| — \| DS-D11

</details>

<details><summary>Notas para os ciclos · Design system · as oito folhas</summary>

- C1: carregar a Barlow em 500, 600 e 700. O 400 aparece 0 vezes nas 105 referências; decidir se entra no pacote. O lucide-react vai com absoluteStrokeWidth desligado, para o traço seguir o grid 24 como nas folhas.
- C1: a divergência tokens.json × tokens.css dos tempos de movimento (M1) precisa estar resolvida antes do C2, porque a roda de dígito e o pressionado leem --mov-*.
- C2, ordem de construção: primitivos (tipografia, poço, glifo, ícone, marcador, superfície tocável, primário, só-ícone) → link e secundário → linha de lista 38/50 (a de maior reuso: 176 poços de 24) → chrome → cartões e aviso → instrumentos (o tambor por último, porque depende de DS-D8) → entrada → as 4 composições.
- C2: construir a 'faixa · sem ação' pela T16 (DS-D5), e não pela folha. A faixa no menu e a 'módulo com falha' têm 50 e borda de cima #221D2E. A 'módulo com falha' ainda tem borda de baixo de 2px vermelha.
- C2: na vitrine, os 35 átomos da folha 3 ganham uma seção própria, sem linha em componentes.md até o DS-D7.
- C5 (menu): se o DS-D2 trocar Configurar e Checklist, as referências da T04 deixam de bater nesses 2 ícones. Registrar no CHANGELOG antes de comparar.
- C7/C8: o tambor não tem quadro de começo na T07 (as 4 referências mostram dígitos). A T07-D7 limita o rolar à chegada da leitura. Na T10, o começo é 184.320 e o fim 482.317, em texto no poço (T10-D8).
- Para o diretor ver: /private/tmp/claude-501/-Users-luizfelipesilvacorreia-Downloads-app-configurador/feef562c-65d3-40bd-8160-061b85e3c9c5/scratchpad/tmp/ds/cmp.png põe lado a lado o desenho da folha, o Lucide e os dois sobrepostos, para 30 ícones.
- Os scripts de medida ficam no scratchpad em tmp/ds/ (tree.py, medfolha.py, overlap.txt, especimes.txt) e podem ser rodados de novo no gate do C2.

</details>

### O palco

<details><summary>1 · As peças: palco.md × quadro medido (HTML inline + render headless 1440×900 + pixel do PNG) · 14 linhas</summary>

- peça \| palco.md \| medido \| veredito
- quadrado \| 44×44 a 16 das bordas (palco.md:9) \| 44×44 em left/top 24 (01..03 linha 15; PNG y=46: borda em x=24 e x=67) \| diverge: 24 × 16
- ícone do quadrado \| — \| 18×18, 4 rects de 6,5, traço 2, desenhado à mão \| fora da Lei 14
- celular \| 360×800, moldura 8, 376×816, raio 34/26 (palco.md:10) \| caixa 340×736 border-box (borda 1 + recheio 8), tela 324×720 = 90%, raio 34/26 sem escala (01:16) \| 90% declarado no 00; moldura e raio não diminuem junto
- moldura no PNG \| 8 \| esquerda/topo 9 (borda x=550, tela a partir de 559); direita/baixo 7 (tela até 882, 6 de poço, borda 889): a imagem de 324 não cabe nos 322 da caixa \| assimétrica
- posição do celular \| no centro \| centro x = 720 ✓; topo 50, sobra 114 embaixo (786→900) \| fora do centro vertical
- moldura por jeito \| --borda / --borda-neutra (palco.md:34-35) \| traço de 1px #2B2540 (01) / #3A3350 (02); corpo da moldura #0B0910 nos dois \| ✓, só o traço muda
- coluna \| 230, 40 à direita, no topo, linhas de 32 (palco.md:11) \| left 930 = 890+40, top 50, largura 230, linhas 32; cabeçalho 31 + gap 14; lista em y=95 \| ✓
- coluna num estado \| Voltar ao fluxo no topo (palco.md:27) \| botão 34 (95–129) + gap 14: a lista vai de y=95 pra y=143 (02:19) \| a coluna mexe 48px
- marcador \| poço 24 + quadrado lima 10 (palco.md:26) \| poço 24 com bordas --poco-fundo/--borda-poco/--poco-lado; quadrado 10 #AAEF00 em 937,154 dentro de 930,147 \| ✓ no palco; o app tem outras medidas (T04-V10)
- painel \| 280, da esquerda, por cima de tudo (palco.md:12) \| 280, fundo #16131D, borda direita #2B2540, cabeçalho 68 declarado e 69 renderizado, linhas 34, X 36×36 a 16 das bordas (227–263 × 16–52) \| celular e coluna andam +90 (04:46-47: 550→640, 930→1020)
- fundo \| --poco-fundo (palco.md:3) \| #06050A no body e na raiz, 01–04 (o 00 usa #0F0D14) \| ✓
- etiqueta de versão \| canto de baixo, data e ciclo (palco.md:42) \| ausente nos 5 quadros \| não desenhada
- Recomeçar do login \| pé do painel (palco.md:18) \| ausente; a lista já ocupa 73–897 de 900 \| não desenhado

</details>

<details><summary>2 · O painel: quadro 04 na ordem × palco.md · 13 linhas</summary>

- ENTRAR: T01 Login · T02 Selecionar contexto · T03 Sincronizar
- O MENU E AS FOLHAS: T04 Menu
- CONECTAR O MÓDULO: T05 Conectar módulo
- ESCOLHER O ATIVO: T06 Selecionar ativo
- LER A CAN: T07 Dados da CAN · T08 Refazer leitura
- CONFIGURAR E CALIBRAR: T09 Configurar módulo · T10 Calibração
- CICLO DINÂMICO: T14 Ciclo dinâmico
- HOMOLOGAR: T13 Checklist
- ENCERRAR A SESSÃO: T16 Sessão
- ENVIAR E CONSULTAR: T15 Fila de saída · T11 Conferir configuração · T12 Últimas instalações
- total do quadro: 10 cabeçalhos de etapa, 16 telas, T08 uma vez (no caminho), consultas com 3, sem pé
- palco.md:16-17: caminho T01–T10 + T14, T13, T16 (13) · consultas T15, T11, T12, T08 (4) = 17 entradas pra 16 telas, com T08 nas duas
- caminho do herói (logica.md:24-29): T01→T02→T03→T04→T05→T06→T07→T09→T10→T14→T13→T16, sem T08

</details>

<details><summary>3 · A coluna da T05 e o limite de seis · 5 linhas</summary>

- indice.json: 11 estados (03, 04, 06, 07, 08, 09, 11, 12, 13, 14, 15)
- quadro 03 (12 linhas): ACHAR = Um encontrado (T05/02, que é MOMENTO), Nenhum encontrado · CONECTAR = Conexão falhou · CONFERIR = Serial não cadastrado, Modelo sem driver, Firmware fora, Firmware fora · sem rede, Conteúdo não cabe, Pool esgotado, Canal aberto, Link perdido, Em repouso
- quadro 00 (10 linhas): sem Um encontrado e sem Firmware fora · sem rede (T05/09)
- telas com mais de seis estados: só a T05 (11). Depois vêm T06 (5), T04 (4), T15 (4). Nenhuma outra precisa de grupo
- se contassem momentos, como fez o 03: T13 = 11, T01 = 9, T04 = 9. Nenhuma tem grupo definido

</details>

<details><summary>4 · Coluna por tela: indice × quadros · 6 linhas</summary>

- T01: 3 estados · o 00 diz que não mostra coluna
- T02: 1 estado · o 00 diz que não mostra coluna
- T04: 4 estados · o quadro 01 lista 2 (Módulo com falha, Checklist pendente); faltam 08 e 09, os da folha
- T08: 0 estados · sem coluna ✓
- rótulos desenhados: T04 = 2, T05 = 11, T07 = 3 → 16 de 50. Os outros 34 não têm texto em lugar nenhum
- títulos do indice: sem acento e com outra forma ('T05 · pre-checagem · #9 pool de cercas esgotado' contra 'Pool esgotado')

</details>

<details><summary>5 · Quadrado flutuando no modo estreito (render das 105 a 360×800, caixa 16–60) · 5 linhas</summary>

- 105/105: cobre o relógio 14:30 (texto em 18,7)
- 65/105: cobre o LED e o começo da identidade da sessão na faixa (M2C-… em x=34, y=46)
- 10/10 da T04: cobre o tocável GARAGEM VÁRZEA (16,34 · 135×44), a porta da folha de garagem
- 20 referências: encosta no título ou no cabeçalho (Conectar módulo em 16,58; Pré-checagem; Sem sessão de configuração)
- a 24 (medida do quadro): os mesmos 10 tocáveis

</details>

<details><summary>6 · Px e cor do palco × tokens · 9 linhas</summary>

- cores: 15 hex nos quadros 01–04, todas token (--tinta-apagada, --poco-lado, --poco-fundo, --poco, --borda-poco, --tinta-forte, --tinta, --tinta-secundaria, --borda, --marca-limite, --fundo-faixa, --borda-neutra, --lima, --borda-rodape, --fundo-cartao)
- uso fora do sentido: #6E6683 --marca-limite ('só fora de texto', tokens.css:33) como texto em ACHAR/CONECTAR/CONFERIR: 3,76:1 sobre #06050A
- uso fora do sentido: #1A1726 --fundo-cartao como pressionado do painel; movimento.md:24 manda a linha tocável ir pra --elevado #1E1A29
- px sem token nenhum: 230 (coluna) · 280 (painel) · 68 (cabeçalho do painel) · 3 (gap do cabeçalho da coluna) · 340×736 e 324×720 (celular a 90%) · 900 (corte do modo estreito)
- px que só coincidem com token de outro sentido: 50 (topo; --linha-dupla) · raio 34 e 26 (--poco-34/--poco-26; --raio é 4 'em tudo', tokens.css:93) · linhas 32 e 34 e X 36 (--poco-32/--poco-34/--e-36; não há token de linha) · quadrado lima 10 (--e-10 é espaço)
- derivável: 376×816 = --tela-largura/--tela-altura + 2 × --e-8
- letter-spacing em rótulos de 10px: 1,6 (cabeçalhos), 1,5 (painel), 1,4 (grupos da coluna); o token --t-rotulo-bloco diz 1,5 (tokens.css:54)
- traços: borda 1 · traço branco inset 2 · foco outline 2 + offset 2 · ícones 18/16/14 com traço 2 (Lei 14: 2,2 / 1,8 / 2,6)
- tempo: painel 200ms = --mov-padrao + --mov-curva ✓ · estado 150ms = --mov-rapido ✓ · piscar: sem valor escrito

</details>

<details><summary>Notas para os ciclos · O palco</summary>

- C3 · entra também o que o ciclos.md não lista e o palco precisa: rótulo e grupo da coluna (G2), a estrutura das 16 sementes no estado/ (G15), o modo estreito, a etiqueta (G13) e o Recomeçar com o pé fixo (G14).
- C3 · o 'pronto quando' ganha estes testes: as 16 telas e os 50 estados pela URL, mais os 39 momentos se G5 for sim · parâmetro inválido cai na semente · larguras 899, 900, 948 e 964 · alturas 720, 768 e 900 · o painel com a lista rolando e o Recomeçar à vista · o piscar uma vez só, também com reduzir movimento · a coluna parada ao abrir um estado (G6) · a etiqueta no computador e no celular.
- C3 · a tela vazia precisa de conteúdo definido: o nome da tela e, num estado, o rótulo do estado, com tokens do app. Senão 'abrir um estado vazio' não prova nada além da moldura --borda-neutra.
- C3 · só dá pra comparar com os quadros a moldura, a coluna, o painel e o quadrado: dentro do celular, os quadros são prints (A11). A 1440×900 o celular sai a 100%, e o quadro está a 90% (A8). Ou se registra o desvio, ou a foto de comparação sai com a escala forçada a 0,9.
- C3 · o palco lê o 02-telas/indice.json de fora da app/, como faz com o mock. Vale o mesmo cuidado da Vercel (publicar.md:33-35): nunca copiar o arquivo pra dentro.
- C3 · num estado, inert na raiz do app bloqueia toque e foco, mas o leitor de tela também deixa de ler o conteúdo. Isso tem de ser aceito no gate.
- C3 · o palco pode ter foco de teclado (00: anel #C9C3DA, 2px, afastado 2). Esc fecha o painel e o foco volta ao quadrado. No palco, só :active, nenhum :hover. A mãozinha aparece só no quadrado, nos itens do painel, nas linhas da coluna, no Voltar ao fluxo e no Recomeçar; dentro do celular é seta, também num estado.
- C3 · clicar fora do painel só fecha o painel; o clique não passa pro app. O quadro 04 não tem véu.
- C4 a C10 · cada tela precisa montar parada num instante dado: processos, cronômetro e fila congelados. É isso que o palco usa pra mostrar estados no meio de um processo (T05/14, T05/15, T09/02, T14/02). É um contrato de entrada que cada tela recebe.
- C11 · a promessa dos '50 comparados' depende de G3. Com os quadros como estão, só 44 abrem pela coluna.
- C13 · os 5 quadros do palco entram na auditoria de fidelidade com os desvios de G1, G4, G6, G10 e G11 já nomeados no CHANGELOG.

</details>

### O mock e o contrato de dado

<details><summary>1 · As sementes de logica.md × o mock (medido) · 16 linhas</summary>

- T01 · 'nenhuma sessão · r.vieira preenchido' \| mock: credenciais.usuario 'r.vieira' (mocks.js:1041); sessaoConfiguracao null; sessaoAcesso aberta há 5 dias (mocks.js:1016-1017) \| bate em parte. 'Nenhuma sessão' vale só para a de configuração (T01-A13). 'Qualquer senha ≥8' (logica.md:20) contradiz o par único do mock (T01-A3)
- T02 · 'Viação Atlântico Sul · três garagens · Várzea com pacote de ontem' \| mock: empresa ok; 3 uos; pac-uo-01 diasAtras 1 = 2026-03-11 07:10 \| bate. contextoAtivo já nasce uo-01 (T02-A6)
- T03 · 'garagem Várzea · pac-uo-01' \| mock: pac-uo-01 existe, 1 dia, contem {10, 3, 3} \| bate. contem.modelosAtivo diz 3, mas Várzea usa 2 modelos (DADOS-V2). Falta a versão (T03-A6)
- T04 · 'sessão M2C-0417 + RKT-8H42 · fila com 2 itens' \| mock: o par a-01↔M2C-0417 é real; a sessão nasce null e a semente a constrói; pendentes de Várzea = f-01 na-fila + f-04 enviando = 2 \| bate com a regra 'pendentes da garagem ativa' (T04-D1). O aparelho tem 6 pendentes, 3 deles na-fila
- T05 · 'quatro módulos por perto' \| mock: não há lista; Várzea tem 8 módulos vinculados; a referência mostra 5 \| não bate (T05-A1, T05-A2)
- T06 · 'dez ônibus no pacote' \| mock: uo-01 = 10 ativos = contem.ativos 10; são 9 ma-01 e 1 ma-02 (caminhão); 2 sem módulo \| a contagem bate; 'ônibus' não (T06-V8); a referência mostra 5 (T06-A1)
- T07 · 'doze sinais do mock' \| mock: ma-01.sinaisCan = 12 (7 estáticos, 5 dinâmicos, 6 domínios) \| bate. O '7 de 12' deriva
- T08 · 'sessão com leitura feita' \| mock: nenhum campo guarda que a leitura foi feita, nem no mock nem no estado de logica.md \| sem fonte (T08-A13)
- T09 · 'os blocos do mock' \| mock: cadeia.ordem com 6 blocos; versoes com 5 → A12.G07.L02.E05.C03; o escopo do herói deriva 'configuracao' (mocks.js:653-655) \| bate. O escopo diz que é reconfiguração (T09-N4)
- T10 · '184.320 no módulo, 482.317 no painel' \| mock: bruto a-01 184320000 m ÷ 1000 = 184.320; painel 482317; a diferença 297.997 é a mesma do textos.md \| bate. Mas ultimas a-01.hodometro = 0: já semeado hoje (T10-A5)
- T11 · 'M2C-0438 + ONK-8Q90 · diff-divergente' \| mock: o par a-16↔M2C-0438 é real e o caso existe; a-16 é da Garagem Ibura \| o par bate. Fica fora do contexto Várzea (T11-A2); noCadastro contradiz o cadastro (T11-A3)
- T12 · 'garagem Várzea · cinco instalações' \| mock: i-01, i-02, i-06, i-08, i-10 = 5 \| bate
- T13 · '31 itens' \| mock: 4+5+4+10+5+3 = 31 \| bate. A i-01 registra 10/10 (T13-A12)
- T14 · '6 mensagens e 2 de diagnóstico' \| mock: ciclo.mensagensGuardadas {6, 2}; M2C-0417 não é o módulo de modulo-com-pendencias \| bate
- T15 · 'fila com dois itens · um com erro' \| mock: Várzea tem 2 pendentes e 0 erro; Ibura tem 2 (f-02, f-10) com 1 erro; Caruaru tem 2 (f-03, f-09) com 1 erro; o aparelho tem 6 pendentes e 2 erros \| só bate fora de Várzea (T15-A2)
- T16 · 'sessão M2C-0417 + RKT-8H42 homologada' \| mock: nenhum campo 'homologada'; i-01 'aprovada' é histórico; VL06 tem reinicioPorComando true; contadores 482.317 km · 9.640 h = calibracao.painel a-01 \| os valores batem. 'Homologada' é estado do app. Não há corte (T16-A2)

</details>

<details><summary>2 · O caminho do herói passo a passo no mock · 13 linhas</summary>

- 1 Login (T01) \| tem: credenciais e tecnico \| falta: a regra dos 8 caracteres (T01-A3); a sessão de acesso aberta pularia o login (T01-A13) \| o estado escreve: tecnico {nome, usuario}
- 2 Garagem Várzea (T02) \| tem: uos e pacote de ontem \| o contexto já nasce escolhido (T02-A6) \| escreve: contexto.uoId
- 3 Sincroniza (T03) \| tem: pac-uo-01 \| falta: versão (T03-A6), a estimativa '~40 s' (T03-A2), o tique (T03-A17) \| escreve: contexto.pacote {diasAtras 0, hora 14:30}. Sem isso a T04 segue dizendo 'ontem, 07:10' (T03-A18)
- 4 Menu sem módulo (T04/01) \| tem: 2 pendentes em Várzea, rede conectada \| o desenho diz 'sem conexão' (T04-A2) \| só lê
- 5 Conectar (T05) \| tem: modulos, matriz, conteúdo 128/192, cercas 4/4 \| falta: a lista 'por perto' (T05-A2), o meio de cada módulo, e a regra 'sem caso → leitura nominal' para 'na faixa', 'antena ok', 'na rede' \| escreve: sessao {moduloSerial, ativoId null, saude ok, abertaAs 14:30, meio} e etapas.preChecagem
- 6 Ônibus (T06) \| tem: 10 ativos, chassiPelaCan true, leitor cartão-serial \| falta: sessao.meio. Se o herói vier por cabo, cai no mesmo conflito de pinos do a-04 (DADOS-A4) \| escreve: sessao.ativoId a-01 e etapas.ativo
- 7 CAN (T07) \| tem: 12 sinais \| falta: o ritmo da leitura (T07-A10) \| escreve: etapas.can.lida
- 8 Cadeia (T09) \| tem: ordem, versões, escopo, 1 s por bloco \| a 04 não oferece 'Calibrar' (T09-A3): o caminho quebra aqui \| escreve: etapas.cadeia {confirmados 6, versaoGravada A12.G07.L02.E05.C03}
- 9 Calibra (T10) \| tem: painel, bruto, tolerância \| ultimas = 0 abre 'já semeado' (T10-A5); o mock não tem foto (T13-V5); o horímetro 2 de 2 não tem referência (T10-A10) \| escreve: etapas.calibracao {hodometro 482317, foto}
- 10 Ciclo (T14) \| tem: prazo 120, evento aos 24 e 33 s, 6+2 mensagens, 5 passos, lidoDinamico \| falta: o ritmo da drenagem (T14-V4); 01 e 00 não cabem na mesma linha do tempo (T14-N1) \| escreve: etapas.ciclo {passos, evento, tentativas}
- 11 Checklist (T13) \| tem: 31 itens e as fontes \| a fila não tem item da sessão. Os únicos do a-01 (f-05 e f-06, 09:14 e 09:15) fariam a Seção F passar com prova da manhã (T13-A9, T13-N3) \| escreve: etapas.checklist {respostas, ciência, homologada}; fila recebe Evidências e Checklist do a-01
- 12 ENCERRAR (T16) \| tem: 8 assertivas, versão, contadores, identificadores 3 \| sem corte para VL06 (T16-A2); as cercas do a-01 são 4, e o desenho diz 'não se aplica' (T16-A3); o tipo 'Registro da sessão' não existe na fila (T16-V10) \| escreve: sessao null, fila recebe o Registro, tela T04
- 13 Menu sem sessão (T04/01) \| a fila fica com 5 pendentes em Várzea e nada sobe sem ritmo, então 'Trocar de garagem' fica travado para sempre (T04-A17, T02-V10) \| só lê

</details>

<details><summary>3 · O estado único: quem escreve, quem lê, o que falta · 18 linhas</summary>

- tecnico {nome, usuario} \| escreve T01 \| lê T04 (folha), T13 (ciência 'Rafael Vieira, 14:30'), T12 (detalhe) \| no mock: tecnico + credenciais.usuario \| ok
- contexto {uoId, pacote {id, diasAtras, hora, versao}} \| escreve T02, T03 e a folha da T04 \| lê T03, T04, T06 (ativos do pacote), T12, T15 ('nesta garagem') \| falta: versao, e a regra que sobrescreve a idade depois de baixar
- sessao {moduloSerial, ativoId, saude, abertaAs} \| escreve T05 (nasce), T06 (ativo), T04/03 (saúde em falha), T16 (morre) \| lê todas as telas com faixa \| a forma já está no mock (mocks.js:1003-1005)
- sessao.meio \| escreve T05, a partir da lista por perto \| lê T06 (matriz de pinos, mocks.js:59-62) \| falta no mock e em logica.md
- sessao.etapa \| logica.md:10 cita, mas nenhuma tela define o valor \| falta: definir ou tirar
- etapas.preChecagem \| escreve T05 \| lê T04 (cartão) e T13 A \| ok
- etapas.ativo {chassi lido \| confirmado pelo técnico} \| escreve T06 \| lê T13 A e T04 \| fora da lista de logica.md:11
- etapas.can {lida, refeita} \| escreve T07 e T08 \| lê T04, T13 C e T16 assertiva 4 (T08-A10) \| fora da lista
- etapas.cadeia {confirmados, versaoGravada} \| escreve T09 \| lê T13 D, T16, T11 (T11-D15) e T04 \| ok
- etapas.conferencia \| escreve T11 ('Só registrar') \| lê T04 \| fora da lista
- etapas.calibracao \| escreve T10 \| lê T13 B (a foto herdada), T13 D, T16 (contadores), T14 (distanciaKm) \| ok
- etapas.ciclo \| escreve T14 \| lê T13 E e T04 \| ok
- etapas.checklist {respostas, ciência, homologada} \| escreve T13 \| lê T04/04 (T04-D4) e T16 (qual encerramento) \| 'homologada' não está nomeada
- etapas.encerramento {passo, assertivas} \| escreve T16 \| lê T16 \| fora da lista
- fila (cópia de M.filaSaida + os itens da sessão) \| escreve T13 (Finalizar), T16 (Registro), T11 (diagnóstico), T15 (reenviar) \| lê T04, T04/06, T04/08, T13 F, T15, T16 assertiva 8 \| falta: os tipos novos e o ritmo
- tela {id, momento \| estado, folha} \| escreve o palco e o app \| lê a URL \| ok
- situacao {rede, sessaoAcesso} \| escreve T12 ('Atualizar' sem rede, mocks.js:453-456) \| lê T04, T12, T01 \| fora do estado de logica.md
- casosConsumidos {conexao-falha, busca-vazia, evento-sem-resposta, sync-falha-rede…} \| escreve T03, T05, T14 \| lê as mesmas telas: a 2ª tentativa tem de acertar \| fora do estado

</details>

<details><summary>4 · Os 4 casos que casos.md não cita · 4 linhas</summary>

- sinal-aguardando-ciclo (mocks.js:492-493) · a-03 · ré · 'só confirma durante o ciclo' \| serve para provar que sinal dinâmico não reprova na fase parada. Hoje isso deriva de fase:'dinamico' \| leitor: nenhum; o motivo não está em textos.md algum \| T07 (o grupo 'fecham andando') e T13 E poderiam ler \| é obrigatório no gate (gate-cobertura.js:123)
- modulo-com-pendencias (mocks.js:567) · M2C-0362 · a-06 · 12 + 3 \| serve para a leitura que informa sem travar \| T05/13, junto com canal-aberto: textos T05:59 mostra '12 · 3 de diagnóstico' (T05-A8). Também sobrepõe a drenagem da T14 (mocks.js:909-913), mas a-06 não passa da T06 (mocks.js:881-883): na T14 nunca aparece pelo fluxo
- can-estatico-hodometro (mocks.js:650) · a-09 · 87.604 km \| é coerência, não estado. Faz a T07 do a-09 bater com a T10/02-03 (87.604 · 87.712 · diferença 108) \| T07 no fluxo do a-09. Nenhuma referência desenha isso
- pronto-para-fechar (mocks.js:899-900) · a-09 · M2C-0371 · 'sem resposta' \| é o único ativo que chega a Finalizar com a Seção F falhando e a um VL08 que pede o corte \| T13/10 (a referência desenha o herói, T13-A2) e T16/01 (reinicioPorComando false, mocks.js:130-131). M2C-0371 não está na busca da T05 (T05-A13)

</details>

<details><summary>5 · Como o app lê o mock (medido no Vite 8.0.13 do disco, projeto de teste em scratchpad) · 10 linhas</summary>

- import de efeito colateral '../../../../04-dados/mocks.js' e depois window.M2CF_MOCKS \| dev: 200 em /@fs/…/04-dados/mocks.js, sem server.fs.allow
- arquivo de fora da raiz NÃO importado, pedido por URL \| dev: 403 Restricted. server.fs.allow só é preciso se algo for buscado por fetch (por exemplo o indice.json). Importar o JSON dá 200
- asset de 05-recursos importado (logo) \| dev: 200 no módulo e 200 no arquivo
- vite build com a pasta inteira \| ok: o bundle contém RKT-8H42; a atribuição window.M2CF_MOCKS= vem antes da leitura
- vite build só com a app/ (a Vercel com a opção desligada) \| falha: UNRESOLVED_IMPORT '../../../../04-dados/mocks.js' — publicar.md:33-35 está certo
- mocks.js em modo estrito, como ESM \| roda: 33 chaves e 33 casos
- mutação \| um segundo import devolve o mesmo objeto; mudar M vaza para todas as telas; Object.isFrozen(M) = false
- clone \| structuredClone(M) → DataCloneError (diasAntes é função); JSON.parse(JSON.stringify(M)) perde diasAntes
- caminhos antigos \| mocks.js:1 'app/mocks.js', :24 'tools/gate-cobertura.js'; gate:1-3 'tools/…' e 'app/mocks.js'. contrato.md:15 está certo: 'node 04-dados/gate-cobertura.js'
- o gate a partir da app \| 'node ../../04-dados/gate-cobertura.js' roda em CJS porque não há package.json acima de 04-dados. Um package.json na raiz com type:module quebraria o require

</details>

<details><summary>6 · Determinismo, limiares e ritmos · 8 linhas</summary>

- relógio e acaso no mock \| zero Date, Math.random e new Date (o gate confere, gate:156-163). A higiene só varre mocks.js: nada confere a app/src
- ordem de objeto \| nenhuma tela depende dela. A ordem que importa mora em arrays (sinaisCan, dominiosCan, cadeia.ordem, checklist.itens). O checklist é posicional: splice(23 + i) (mocks.js:870). Um item novo em A–D desloca a Seção E sem aviso
- locale \| o mock não usa toLocaleString nem Intl. Medido: (482317).toLocaleString() dá '482.317' em pt_BR e '482,317' em en_US e C; com 'pt-BR' explícito é estável
- duas formas do mesmo fato \| o hodômetro do a-01 é '184.320 km' (texto, sinaisCan) e 184320000 (número, bruto). O painel é número (482317). Cercas, i-01.valorPainel e '482.317 km' também se repetem
- limiares no mock \| 3 d e 7 d (pacotes[].limiares, 3 cópias) · 7 d com aviso no 5º (situacao.sessaoAcesso) · 120 s de prazo (ciclo) e outros 120 s de folga da janela (criteriosRegra) · 10 min do código e 10 min de teto de espera · 60 s de reenvio · 3 tentativas · teto 3 por hora
- limiares fora do mock \| 24 h de re-checagem (dominio.md:177-180, HU-T12-6, textos da T15 'confere em 24 h') · 8 caracteres da senha (logica.md:20)
- ritmos declarados em movimento.md:30-39 \| pré-checagem 600ms · cadeia 1 s · T11 400ms · encerramento 600ms · autoteste 400ms · ciclo 3 s · prazo 1 s = 4 s · sincronização 4 s no total (sem tique, T03-A17)
- ritmos que faltam \| busca (80ms por linha proposto, T05-D14) · firmware (T05-D4) · leitura da CAN (T07-A10) · releitura T08 (600ms proposto, T08-D5) · drenagem T14 (3 s proposto, T14-D11) · envio da fila (T15-D13, T04-A17) · corte T16 (3 s proposto, T16-D11)

</details>

<details><summary>7 · Plano de acréscimos ao mock (lista fechada, tudo ADITIVO, bloco comentado no padrão C8/C10/C16/C22) · 23 linhas</summary>

- AC-01 · C4 · credenciais.recuperacao.codigoErrado '482911' · T01/05, T01/07 (T01-V4, T01-D9) · gate: 6 dígitos, diferente de codigo
- AC-02 · C4 · credenciais.recuperacao.pedidoHaSeg N, de onde derivam o reenvio (60 − N) e a validade (600 − N) · T01/03-05 (T01-V1) · gate: 0 < N < reenvioSeg. Prova: 44 s ⇒ N=16 ⇒ 9:44; 9:41 ⇒ N=19 ⇒ 41 s. Nenhum N reproduz o PNG: desvio nomeado
- AC-03 · C4 · credenciais.requisitosSenha, os 6 com o mínimo 10 · T01/08 (T01-V7) · gate: novaSenha cumpre os verificáveis (passa hoje no rascunho)
- AC-04 · C4 · pacotes[].versao 'pct-uo01-2026-03-11' · T03/00-02 (T03-A6, T03-D4) · gate: versao = 'pct-' + uoId sem hífen + '-' + data
- AC-05 · C4 · pacotes[].segPorItem 6 → '~40 s' · T03/00 (T03-A2, T03-D3) · gate: 7 restantes × 6 = 42, arredonda para 40
- AC-06 · C6 · situacao.porPerto [{serial, meio}] na ordem da referência: 0417 sem fio · 0362 cabo · 0394 cabo · 0335 cabo · 0999 (meio a decidir) · T05/00-01 e T06 pinos (T05-D1, T05-D2, DADOS-A4) · gate: o herói primeiro; os seriais ∈ modulos ∪ seriaisForaCadastro; variante sem semFio ⇒ cabo; conflito-pinos-resolvivel.meioAtual = o meio do seu serial; o herói sem fio
- AC-07 · C7 · sinaisCan[].faixa {min, max} e rotuloCurto ('Alternador') · T07, T13/09 (DADOS-A6, T07-D5) · gate: a faixa bate com o esperado; o nominal fica dentro, os casos fora; '1,1 V abaixo' = min − lido
- AC-08 · C7 · casos['can-estatico-hodometro-a22'] {a-22, hodometro '121.003 km'} · T07×T10 (DADOS-V3) · gate: hodômetro da CAN = bruto ÷ fator em todo ativo de calibracao.bruto (hoje falha no a-22)
- AC-09 · C9 · ciclo.evento.campos 6 · T14/05 (T14-A2, T14-D4) · gate: maior que 0
- AC-10 · C9 · ciclo.passoDoSinal {velocidade: 'Movimento detectado', re: 'Ré acionada'} · T14/03 (T14-A8, T14-D6) · gate: as chaves são sinais dinâmicos; os valores são passos da i-01
- AC-11 · C9 · checklist.secoes[].titulo (INSTALAÇÃO FÍSICA, SAÚDE DO HARDWARE…) e itens[B].instrucao · T13/03, T13/07-09 (T13-D12, T13-V6, T13-A17) · gate: 6 títulos; todo item de B com instrução
- AC-12 · C9 · checklist.exemploJustificativa 'Suporte trincado; fixei com abraçadeira até a troca.' · T13/08 (T13-D17) · gate: não vazio
- AC-13 · C9 · leituraNominalModulo {entradasUsadas 4, entradasTotal 4, modemDbm −71} · T13/03 (T13-A5, T13-D9; depende de T13-N5) · gate: usadas ≤ total
- AC-14 · C9 · tiposFila [{tipo, rotuloCurto}], com 'Registro da sessão' e 'Diagnóstico' · T13 F, T15, T16/04, T11 (T15-D10, T16-V10, T11-D11) · gate: todo filaSaida.tipo e toda fonte 'fila:<tipo>' estão em tiposFila
- AC-15 · C10 · criteriosRegra.recheckHoras 24 · T15/04 e T12 (T15-A5, T15-D5, dominio.md:177-180) · gate: > 0. A contradição da i-06 (9 dias em re-checagem) vai ao PM; o gate não aprova as duas
- AC-16 · C10 · criteriosRegra.gruposIdade {hoje 0, ontem 1, esteMesAte N} · T12/00 (T12-A4, T12-D2) · gate: 17 ≤ N < 27, o corte que reproduz a referência
- AC-17 · C10 · casos['conferencia-confere'] {a-01, M2C-0417}, sem valor declarado · T11/02 (T11-D2, T11-N3) · gate: par real
- AC-18 · C11 · casos['busca-vazia'].duracaoSeg 8 · T05/03 (T05-A3, T05-D3) · gate: maior que 0
- AC-19 · C11 · casos['firmware-fora-matriz'].atualizacao {quadroPct 62} · T05/10 (T05-A4, T05-D4) · gate: 0 < pct < 100
- AC-20 · C11 · casos['firmware-fora-sem-rede'] {M2C-0451, a-18, modem 'sem rede'} · T05/09 (T05-A5, T05-D5) · gate: o mesmo par de firmware-fora-matriz
- AC-21 · C11 · casos['instalacoes-vazia'] · T12/02 (T12-A3, T12-D3) · gate: as 13 instalações ficam intocadas
- AC-22 · C11 · casos['fila-dois-erros'] {itens [f-10, f-09, f-02, f-08]} e casos['fila-vazia'] {ultimoEnvioAs '14:02'} · T15/02-03 (T15-D3, T15-D4) · gate: todo id existe em filaSaida
- Soma: 6 casos novos (33 → 39) e 2 chaves de topo (tiposFila, leituraNominalModulo). Fica FORA da lista, porque muda valor que já existe: sync-falha-rede.pacoteId (T03-D1), f-08.diasAtras (T15-D6), recebidoAosSeg 24→48 (T14-D3), preChecagem 12 (T05-A17), checklist da i-01 10 (T13-A12), diff-divergente.noCadastro (T11-A3), pacote modelos e presets (DADOS-V2)

</details>

<details><summary>8 · O que o gate passa a recomputar (rascunho de 56 checagens, rodado em scratchpad/tmp/dados/gate-extra.js) · 3 linhas</summary>

- passam hoje, entram no C1 (49): credenciais (usuário ~ técnico, código de 6 dígitos, novaSenha, dígitos da máscara do DDI, reenvios < teto) · aviso de acesso · calibração (bruto para cada painel, diferenças 297.997 · 1.100 · 108 · 477, calibráveis ∩ indisponíveis = ∅, horímetro no limite 3 = 1+2, itemChecklist) · checklist (31 = soma, E = passos da i-01, fontes da fila) · ciclo (24 < 33 < 120) · autoteste do encerramento (8, 1 condicional, 1 não bloqueia) · criteriosRegra (cobre os 5 estados, exceção real) · os 12 casos sem gate com par ativo↔módulo real · blocos na ordem · sessão interrompida coerente · pendências = módulo do canal aberto · pacotes: ativos, presets e cartões
- falham hoje e entram com a decisão (7): T07×T10 hodômetro do a-22 (96.410 × 121.003) → AC-08 · checklist da i-01 10 × 31 → decisão (T13-A12) · bloco-recusado cai no a-02, que tem 0 cercas → decisão (T09-A15) · contem.modelosAtivo 3 × 2 em pac-uo-01 e pac-uo-02 → D8 · casos.md × M.casos (4 que faltam, 4 que sobram) → acerto do documento · indice.json com 11 de 50 estados sem caminho resolvível → D5
- higiene nova: varrer app/src por Date, Math.random, performance.now e toLocaleString sem locale → C1

</details>

<details><summary>Notas para os ciclos · O mock e o contrato de dado</summary>

- C1 · A ponte app/src/dados/mock.js faz o import de efeito colateral de '../../../../04-dados/mocks.js' e congela M. Não precisa de server.fs.allow (medido no Vite 8.0.13); fixe a versão do Vite. Se o palco ler 02-telas/indice.json, importe o JSON; nunca use fetch, que dá 403.
- C1 · O estado único vazio já nasce com a forma completa da tabela 3: sessao.meio, as 9 etapas, casosConsumidos e situacao. Assim nenhuma tela depois inventa um campo.
- C1 · Acertar só os comentários de mocks.js e do gate (caminhos, Lei, D) com o hash de JSON.stringify(M) igual antes e depois. Somar ao gate as 49 checagens que passam e a higiene de app/src.
- C1 · Um script 'gate' no package.json da app: 'node ../../04-dados/gate-cobertura.js'. Não pôr package.json com type:module na raiz.
- C3 · sementes.js e receitas.js com teste em node: todo id resolve no mock, e os 50 estados têm receita.
- Todo ciclo que acrescenta caso atualiza, no mesmo ciclo, o '33 casos no mock' do CLAUDE.md, o casos.md e o estados.md da tela. O plano leva a 39 casos.
- Blocos novos no mock com o rótulo 'P·Cn' e a frase 'Tudo ADITIVO: âncoras intactas', como C8, C10, C16 e C22.
- C9 · A Seção F só conta itens da fila criados na sessão (D3). Sem isso o herói homologa com a prova da manhã.
- C10 · O caminho do herói só fecha até o menu sem sessão se a T09/04 levar à T10 (T09-A3) e se a fila tiver ritmo ou ficar parada por decisão declarada.
- C14 · Na Vercel, 'Include files outside the Root Directory' ligado. Medido: desligado, o build falha com UNRESOLVED_IMPORT.
- Rascunhos desta medição, fora do projeto: scratchpad/tmp/dados/medir.js, gate-extra.js e exp/ (o teste de Vite).

</details>

### Coerência entre os documentos

<details><summary>1 · movimento.md × os 16 animacao.md — as 52 linhas (arquivo:linha · elemento · tempo · curva · reduzir · veredito) · 55 linhas</summary>

- legenda: D duração fora de token (150/200/300) e de ritmo declarado · P propriedade fora de transform/opacity · L mexe no layout · R reduzir contradiz 'duração zero, processo segue' (movimento.md:47) · E? entrada ou zero ao abrir, ambíguo · C curva que não é token · Q processo sem ritmo em movimento.md:30-39 · limpa = sem D, P, L, R, E
- T01:7 · campo em foco · 150 · desacelera · aparece aceso · limpa
- T01:8 · aviso de erro · 150 · desacelera · aparece · limpa (medido headless: marca y=207 e USUÁRIO y=410 na 00 e na 01)
- T01:9 · célula do código · 100ms · desacelera · troca direta · D — 100ms não é token (novo nesta tela)
- T01:10 · cronômetro do código · — · — · igual · limpa · Q — 'a cada segundo' não está na tabela de processos
- T01:11 · requisitos da senha · 150 · desacelera · troca direta · P — 'traço desenhado' e 'o texto clareia' (T01-N3)
- T01:12 · folha · 200 · desacelera · aparece · limpa (não diz o fechar de 150, movimento.md:22)
- T01:13 · diálogo · 150 · desacelera · aparece · limpa
- T02:7 · marcador de escolha · 150 · desacelera · aparece · limpa
- T02:8 · botão primário · 150 · esmaece · troca direta · limpa · C (T02-A8)
- T02:9 · lista filtrada · 150 · desacelera · troca direta · L — 'as que ficam sobem juntas' (o tema de T15-N1, aqui na T02)
- T03:7 · barra de download · 4s · linear · salta pro fim · R (T03-A13)
- T03:8 · contagem · — · — · igual · limpa
- T03:9 · check de concluído · 150 · desacelera · aparece · P — 'o traço se desenha' (T03-A12)
- T04:7 · faixa de sessão · 200 · desacelera · aparece · L — 'o conteúdo desce junto' (T04-N3)
- T04:8 · contador · — · — · igual · limpa
- T04:9 · folhas · 200/150 · desacelera · aparece · limpa
- T04:10 · cartão liberado · 150 · esmaece · troca direta · P — 'o poço ganha cor' (tema de T06-A13, novo aqui) · C
- T05:7 · lista de módulos · 150 · 80ms entre elas · desacelera · aparecem juntas · D — 80ms não é token nem ritmo · Q — a busca não tem ritmo (T05-A3)
- T05:8 · pré-checagem começa · — · — · igual · limpa
- T05:9 · pré-checagem passa · 150 · ritmo 600ms · desacelera · troca direta, mesmo ritmo · limpa — é o modelo de reduzir
- T05:10 · linha que falha · 150 · esmaece · troca direta · P (fica vermelha) · L (causa e aviso entram embaixo) (T05-A10) · C
- T05:11 · faixa de sessão · 200 · desacelera · aparece · L (T05-A11)
- T05:12 · atualização de firmware · — · — · igual · limpa · Q (T05-A4)
- T06:7 · par de chassis · 150 · desacelera · aparece · P — 'o check se desenha entre os dois' · Q — leitura do chassi sem ritmo (T06-V2)
- T06:8 · confirmação manual · 150 · desacelera · troca direta · P — 'o botão acende' (T06-A13)
- T07:7 · marcador da barra · 300 · desacelera · aparece no valor · E? — 'corre de zero até o valor' quando a leitura chega ao abrir a T07 · Q (T07-A10)
- T07:8 · tambor do hodômetro · 300ms por rodinha, 40ms entre elas · desacelera · mostra o número · D — 40ms não é token · E? — não diz de onde rola
- T07:9 · contador do cabeçalho · — · — · igual · limpa
- T07:10 · sinal fora da faixa · 150 · esmaece · troca direta · P (borda vermelha) · L (a causa aparece; T07-A2) · C
- T08:7 · valores lidos viram traço · 150 · esmaece · troca direta · limpa · C
- T08:8 · valores novos · 300 · desacelera · aparece · D — 'como na T07' herda os 40ms e contradiz o total da T07 · Q (T08-V5)
- T09:7 · elo começa · — · — · igual · limpa
- T09:8 · elo confirma · 150 · ritmo 1s · desacelera · troca direta, mesmo ritmo · limpa
- T09:9 · trilho · 300 · desacelera · aparece aceso · limpa
- T09:10 · elo recusado · 150 · esmaece · troca direta · P (fica vermelho) · L (o aviso surge; T09-A1) · C (T09-A13)
- T10:7 · tambor · 600ms no total · desacelera · mostra o número final · D (T10-N3)
- T10:8 · régua da diferença · 300 · desacelera · troca direta · limpa (sem quadro final, T10-N2)
- T10:9 · foto do painel · 150 · esmaece · aparece · limpa · C (T10-N1)
- T11:7 · linhas de conferência · 150 · ritmo 400ms · desacelera · aparecem juntas · R (T11-A4)
- T12:7 · tela (abrir o detalhe) · 150 · esmaece · troca direta · limpa · C
- T13:7 · placar · 300 · desacelera · salta pro valor · limpa
- T13:8 · miniatura da foto · 150 · esmaece · aparece · limpa · C
- T13:9 · veredito · 150 · esmaece · aparece · L — na referência a lista desce 2px e o rodapé sobe 20px (T13-V1) · C
- T14:7 · barra do prazo · contínuo, 1s = 4s · linear · o número troca, a barra salta · limpa (o processo segue)
- T14:8 · número do prazo · — · — · igual · limpa
- T14:9 · passo do veículo · 150 · ritmo 3s · desacelera · troca direta · limpa
- T14:10 · linha do evento · 150 · esmaece · troca direta · limpa · C
- T15:7 · barra do item corrente · contínuo · linear · salta · D — o envio não tem ritmo declarado (T04-A17) · 'salta' não diz se o envio continua
- T15:8 · item enviado · 150 + 200 · desacelera · some · L — 'a lista fecha o espaço' (T15-N1)
- T16:7 · passo do encerramento · 150 · ritmo 600ms · desacelera · troca direta · limpa
- T16:8 · assertiva do autoteste · 150 · ritmo 400ms · desacelera · aparecem juntas · R (T16-A11)
- T16:9 · faixa de sessão · 200 · acelera · some · L — as referências mantêm a faixa no lugar (T16-A10) · C (T16-A9)
- TOTAL · 52 linhas · 28 limpas (20 sem ressalva · 6 só com C · 2 só com Q) · 1 ambígua (T07:7) · 23 violam · D 6 · P 8 · L 9 · R 3 (+ T15:7 ambígua) · loop 0 · 3 linhas somam P e L (T05:10, T07:10, T09:10)
- Fora da tabela: não há linha pra drenagem da fila (T14, tela.md:15), diálogos da T04 e da T13/10, primário que acende na T02 nem corte de alimentação da T16

</details>

<details><summary>2 · Vocabulário: as três regras × os 16 textos.md (só texto de tela; cabeçalhos de seção fora) · 5 linhas</summary>

- regra A · dominio.md:80 (lista enumerada): baudrate 0 · IN/OUT 0 · índice 0 · script 0 · 'contador(es)' 10 ocorrências em T08 e T16, sempre como palavra genérica, não como nome de contador → passa
- regra B · R3 aplicado (dominio.md:86-90): BLE 0 · APN 0 · iButton 0 → passa
- regra B' · fechamento proposto do R3 (dominio.md:84: protocolo de rádio, serviço de rede, marca de componente): 'CAN-BT' 9 ocorrências em 7 referências da T05 — o BT é o sem fio que o R3 tirou, e vem do cadastro (mocks.js:145) · 'Modem, SIM e sinal' 11 ocorrências na T05 → não passa
- regra C · CLAUDE.md:32 ('tecnologia, protocolo ou código'): CAN 49 ocorrências em 37 referências de 8 telas (inclusive o nome oficial 'Dados da CAN', dominio.md:70) · firmware 16 (T05) · GPS 15 (T05, T13) · Serial 12 (T05) · VL06 22 (T05) · Canal de programação 17 (T05, T16) · ID na plataforma 3 (T16) · dBm 1 (T13/03; T13-N5) → não passa
- e CLAUDE.md:17 põe esses mesmos textos como norma, 'exatamente como estão'

</details>

<details><summary>4a · Decisões × leis.md · 4 linhas</summary>

- com lei: 02→R-01 · 03→Lei 1, R-02 · 04→Lei 2, R-03 · 05→Lei 3 · 06→R-04 · 07→R-05 · 08→R-07 · 09→Lei 7, R-08 · 10→R-09 · 11→R-11 · 12→R-12 · 13→R-13 · 14→'A tela' · 15→'Toda medida é por dentro' · 16→'Nada visível a menos de 32px' · 17→'Nada encosta' · 18→'A barra sangra' = 17
- sem lei em leis.md (10): 01 só no princípio 6 (dominio.md:32) · 19 T01/tela.md:7 · 20 T14/tela.md:19 · 21 T11/tela.md:16 · 22 T09/tela.md:8 · 23 06-prototipo/CLAUDE.md:32,37 · 24 movimento.md:14-16 · 25 palco.md:14-18 · 26 logica.md:61 · 27 HU-T01-11
- leis sem decisão (14): Lei 4, 5, 6, 8, 9, 10, 11, 12, 13, 14 · Poço na linha · Folga até o rodapé · R-06 · R-10 — e é justamente nas Leis 5, 6, 10 e 14 que as telas mais batem (T03-A9, T03-A10, T15-A8, M8, T01-V9)
- nenhum documento cita uma decisão pelo número (grep por 'decisão NN' e '07-decisoes/NN' fora de _fontes-v1: 0)

</details>

<details><summary>4b · Os números das decisões, medidos hoje · 11 linhas</summary>

- 04 'Três telas trocavam o título' · o passado não se mede · hoje: T01/05 e T01/07 = 'Código não confere' (T01-A1); T13/09 = 'Tensão da bateria na faixa' (T13-N1); limítrofes T13/10 'A Seção F não passou' (diálogo) e T16/06 'Sessão interrompida' × 00 'Encerrar sessão' · a consequência não vale em 2 telas
- 05 'o prazo estourado da T14 é o exemplo' · move 41px (T14-A3) · não bate
- 15 '74 e 93 → as duas têm 72' · headless: T02/00 linhas de 72 (y 142, 214) e T04/07 72 (min-height 72, renderiza 72) · bate
- 18 'Treze telas tinham a barra de uma cor' · não se mede: não há referência v1 na pasta (_fontes-v1 só tem .md) · hoje 105/105 sangram (M14)
- 19 'presa a 207px' · headless: logo y=207 em T01/00 e T01/01 · bate (207 = 30 + padding 177, sem token)
- 22 'três estados já têm o contador' · medido 2: T09/02 e T09/03 com '3 · de 6' (T09/textos.md:15,19) · não bate
- 25 'Dez etapas... descartado' · 06-prototipo/palco/referencias/html/04-painel-aberto.html:18-41 ainda tem as 10 etapas · não bate
- 26 '4 passos' · T16/03 '1 de 4', com 4 passos não pulados · bate
- 27 '7 dias, aviso no quinto' · T04/05 'RESTAM 2 DE 7 DIAS', sessaoAcesso.abertaDiasAtras 5 (mocks.js:1017) · bate — mas o texto acrescenta 'sem sincronizar' (A11)
- 03 'ENCERRAR usa a tinta secundária' · 57/57 ENCERRAR em #A9A2BC · bate
- 20 'Os cinco passos' · T14/02 '5 de 5 passos' · bate (o a-03 tem 6, T14-A9)

</details>

<details><summary>3a · O nome de cada tela nos documentos · 9 linhas</summary>

- T02 · dominio.md:233 'Seleção de contexto' · resto 'Selecionar contexto'
- T04 · dominio.md:251 'Menu de ferramentas (home)' · HU-T01-2 e HU-T15-2 'home' · tela e README 'Menu'
- T06 · dominio.md:275 'Seleção do ativo' · tela 'Selecionar ativo' · cartão 'ATIVO SELECIONADO'
- T08 · dominio.md:66,70,295 'Reset de leitura do ativo' · historias.md:75 'Após o reset' · tela, README e fluxos 'Refazer leitura da CAN' · cartão da T04 e palco 'Refazer leitura' · mocks.js:99 registra o renome, e o domínio não o seguiu (CLAUDE.md:11)
- T11 · dominio.md:70 'Manutenção / diff' · :331 'Manutenção e diff' · :413 fluxo 'Manutenção' · resto 'Conferir configuração'
- T12 · dominio.md:343 'Últimas instalações e manutenções' · resto 'Últimas instalações'
- T13 · dominio.md:354 'Checklist de homologação' · cartão 'Finalizar com checklist' · tela 'Checklist'
- T16 · dominio.md:390 'Sessão de configuração' · README e palco 'Sessão' · título 'Encerrar sessão'
- ordem · dominio.md:70 '… Últimas instalações · Finalizar com checklist …' × T04/textos.md:7 '… Finalizar com checklist · Últimas instalações …' (T04-A6)

</details>

<details><summary>5 · O plano de ciclos × o que a pasta sustenta · 16 linhas</summary>

- 'um commit — todo ciclo tem caminho de volta' (ciclos.md:114) × a pasta não é repositório: ls -la sem .git; git rev-parse → 'fatal: not a git repository'; nenhum 'entra' cria o repositório
- 'Cada ciclo ganha um link de prévia próprio' (publicar.md:7) × a Vercel só entra no C14 (ciclos.md:103-107), e não há repositório nem projeto
- etiqueta com data e ciclo (palco.md:42 · publicar.md:21 · ciclos.md:107) × não está no 'entra' do C3 (ciclos.md:39) · não está desenhada em nenhuma referência do palco · 'nada mais' (00-componentes.html) · a data não pode vir de new Date() (CLAUDE.md:12)
- janela estreita abaixo de 900px (palco.md:41) × nenhum ciclo a coloca no 'entra'
- C2 'cada peça comparada com a folha dela' (ciclos.md:35) × componentes.md põe peças na folha errada (T01-A6, T03-A21, T04-A9, T09-A12, T16-A17), e a folha 1 tem peças sem linha (T08-A15)
- C4 e C5 comparam 'as referências' da T01-T04 (ciclos.md:47,53) = 11 estados × C11 'os 50 estados' (ciclos.md:87-89)
- C5 'o diálogo de sair' × a T04 tem dois diálogos (T04-A19)
- C6 e C7 constroem as listas com M2C-0999 e KNB-5H39 (logica.md:56) × as portas naturais só entram no C11
- a faixa com ENCERRAR desce no C6 × o encerramento só existe no C10
- C7 'com o tambor' na T08 × nenhuma referência da T08 tem tambor (T08-A6)
- C11 'cada um montado pelo caso do mock' × 15 estados sem caso que produza o desenho, e nenhum ciclo tem '04-dados' no 'entra'
- C12 'cada movimento conferido contra a tabela' × 23 das 52 linhas contradizem movimento.md
- 'gate do mock aprovando' em todo ciclo (ciclos.md:29,113) × o gate aprova sem cobrir T01, T09, T10, T14, T15, T16 (T01-A9, T09-V10, T10-V2, T14-V7, T15-V3, T16-A18)
- 'fotografado em 360 × 800 e comparado com o PNG' (06-prototipo/CLAUDE.md:33) × os PNG têm 720 × 1600; a escala 2 e a ferramenta de captura não estão declaradas
- as sementes (logica.md:31-52) × nenhum ciclo as nomeia no 'entra'
- @fontsource/barlow (06-prototipo/CLAUDE.md:13, publicar.md:13) × as referências usam 05-recursos/fontes (05-recursos/README.md:6)

</details>

<details><summary>6 · Pendências (08-produto-real/pendencias.md) × o que travam · 12 linhas</summary>

- :9 T09 Tentar de novo → 'do bloco recusado' · coerente com HU-T09-5/6 e fluxos.md:35 · não trava
- :10 T14 disparos → 'sem limite' · coerente com 'Disparar outro evento' · o 'A Seção F reprova.' da decisão 20 afirma um fim que a pendência deixa aberto (N4)
- :11 T13 foto ruim → 'fica tirada' · não trava · mas 'a câmera devolve a foto do mock' (o-que-o-prototipo-simula.md:9) não tem foto: o mock só tem foto:true (mocks.js:330, 829-839) (T13-V5)
- :12 T08 → 'não reprova' · não trava o checklist · trava a assertiva 4 da T16: o estado único não guarda a releitura (logica.md:11; T08-A10)
- :13 T12 falha reconhecida → 'só registro' · coerente · não trava
- :14 T16 retomada → 'do último passo confirmado' × HU-T09-6 'do mesmo bloco' × T16/06 'parou aqui' no Leitor, com 3 de 6 · trava o destino do Retomar; o Descartar 'registrado' (HU-T16-7) não tem dado (T16-A15, T16-V11)
- :15 'T10' Bateria e Alternador → 'o nome do cadastro' = 'Tensão do alternador' (mocks.js:591) × T07/textos.md:7-19 'Alternador · Velocidade …' em 4 referências · trava o texto da T07 (T07-A7, T10-N5)
- :16 fonte aumentada → 'trava o tamanho' · para o produto é decisão de stack (stack-a-definir.md:16) · não trava o protótipo
- :17 T14 segunda falha → 'aparece na segunda falha' · não há referência nem linha em textos.md (T14-V12) · trava se for construída
- :21-23 validar no aparelho · não travam; a altura útil de três botões pesa na regra 'o conteúdo rola' (decisão 14) e nas 8 referências cortadas (M11)
- :27 'marcar todos' fora · HU-T13-1 fica sem tela, contra CHANGELOG.md:8 ('toda história que pede tela tem tela')
- ausentes: R1, R2 e R3 (dominio.md:423-427) — 'critério de entrada em campo', que _fontes-v1/kickoff-v1.md:29 põe com o PM — não estão na lista

</details>

<details><summary>Notas para os ciclos · Coerência entre os documentos</summary>

- Medição headless funciona sem instalar nada. O Chrome está em /Applications/Google Chrome.app. Copiar o HTML pro scratchpad com <base href='file://<pasta da referência>/'>, injetar um script que grava getBoundingClientRect num <pre> e rodar --headless=new --window-size=360,800 --allow-file-access-from-files --dump-dom. O script está em scratchpad/tmp/coerencia/render.sh. Pra comparar com os PNG, capturar com --force-device-scale-factor=2.
- Não medido, só risco pro C1. O Vite, com a raiz em 06-prototipo/app, tende a bloquear no modo dev os arquivos de ../../04-dados e ../../05-recursos (lista server.fs.allow). Conferir no gate do C1, antes de prometer 'os arquivos continuam onde estão' (publicar.md:35).
- O mocks.js é um script que grava window.M2CF_MOCKS (mocks.js:978), não um módulo com export. No app, entra por import de efeito colateral; no node, com global.window={}.
- Os ids de ciclo dentro do mocks.js (C2…C23) são do plano v1. Ao ler 'C16' ou 'C21' num comentário, não é o C16 do ciclos.md, que termina no C14.
- React 18 precisa ser fixado à mão (06-prototipo/CLAUDE.md:11). Conferir a versão que o gerador do Vite traz no dia.
- O tokens.css tem regras globais (body e a, linhas 120-128). O palco sobrescreve o fundo; isso não é valor solto, mas vale nomear.
- A linha T15:7 ('salta') não diz se o envio continua. Tratar como o T14:7: o número troca e a barra salta a cada passo, e o processo segue.
- Omissões dos animacao.md que o C12 vai encontrar: a drenagem da fila (T14), os diálogos da T04 e da T13/10, o primário que acende na T02 (T02-V2), o trilho branco (T09-V3) e a espera do corte (T16-N3).
- Os pares de tabelas 4a/4b e 3a/2 servem de base pra atualizar dominio.md e leis.md no ciclo em que cada tela entra (CLAUDE.md:11).
- Arquivos temporários desta análise: scratchpad/tmp/coerencia/ (render.sh, measure.js, os JSON de medida e os PNG reduzidos do palco). Nada foi escrito no projeto.

</details>

### Lacuna 2 · o voltar do sistema

<details><summary>O padrão por família · as 105 referências · 7 linhas</summary>

- raiz · 7 · T01/00-01, T04/00-04 → sai do app e vai pro segundo plano. A sessão e a fila seguem (HU-T15-2).
- folha e diálogo · 7 · T01/04, T04/05-09, T13/10 → fecha, igual ao X ou ao Cancelar, e volta ao que estava por baixo. A exceção é a T01/09, que não fecha.
- Voltar desenhado · 53 → faz o mesmo que ele. Com dois na tela, vale o degrau mais perto (T06/02 → a lista). T09/01-02 seguem o T09-G9: a recuperação, enquanto a Conexão não gravou.
- processo que pede pra não sair · 8 · T03/00, T05/10, T08/01, T09/00, T09/03, T16/00, T16/01, T16/03 → não faz nada, e nada novo aparece: o rodapé já diz por quê. A exceção é a T09/00, que abre a T09/03 (fluxos.md:36, HU-T09-9).
- sem saída pra trás · 20 · T02/00-02, T03/02-03, T05/00-02, T05/04, T07/01-03, T11/00-01, T14/00-04, T16/06 → vai ao pai. O pai é o lugar que o Voltar das irmãs aponta: T03/01, T05/03, T07/00, T11/02. A T02 não tem pai e age como raiz. O pai da T14 vai à decisão LAC2-D4. A T16/06 não faz nada (LAC2-D5).
- depois de ato · 10 · T01/09, T05/05, T05/13, T08/02, T09/04, T13/11, T14/05, T16/02, T16/04, T16/05 → faz o Voltar ao menu desenhado e nunca volta pra dentro do processo nem da sessão que fechou. A T01/09 não faz nada.
- regra das seis · o voltar só leva, nunca faz: não registra (T11), não retoma nem descarta (T16/06), não encerra a sessão, não entra (T01/09), não finaliza (T13/10).

</details>

<details><summary>As 105 referências · tocáveis · saída pra trás desenhada · família → o que o voltar do sistema faz · 105 linhas</summary>

- T01/00 tela · 4 toc. · trás — · raiz → sai do app
- T01/01 estado-usuario-ou-senha-incorretos · 4 toc. · trás — · raiz → sai do app
- T01/02 momento-recuperar-escolher-canal · 4 toc. · trás Voltar ao login · Voltar desenhado → Voltar ao login → T01/00
- T01/03 momento-recuperar-digitar-codigo · 3 toc. · trás Voltar ao login · Voltar desenhado → Voltar ao login → T01/00 (não volta ao canal)
- T01/04 momento-nao-recebi-o-codigo · 4 toc. · trás [Fechar] · folha/diálogo → fecha a folha → T01/03
- T01/05 momento-codigo-errado · 3 toc. · trás Voltar ao login · Voltar desenhado → Voltar ao login
- T01/06 estado-codigo-expirado · 3 toc. · trás Voltar ao login · Voltar desenhado → Voltar ao login
- T01/07 estado-tentativas-esgotadas · 3 toc. · trás Voltar ao login · Voltar desenhado → Voltar ao login
- T01/08 momento-recuperar-nova-senha · 2 toc. · trás Voltar ao login · Voltar desenhado → Voltar ao login
- T01/09 momento-senha-alterada · 1 toc. · trás — · depois de ato → não faz nada: diálogo sem saída (HU-T01-10); nunca volta à 08
- T02/00 tela · 1 toc. · trás — · sem saída pra trás → sem pai: age como raiz, sai do app (HU-T01-2)
- T02/01 momento-escolhida · 1 toc. · trás — · sem saída pra trás → sai do app; não desfaz a escolha
- T02/02 estado-lista-longa-com-busca · 1 toc. · trás — · sem saída pra trás → sai do app
- T03/00 tela · 1 toc. · trás — · processo não saia → nada; o técnico vê "Baixando · não saia da tela"
- T03/01 estado-falha-de-rede · 2 toc. · trás Voltar ao contexto · Voltar desenhado → Voltar ao contexto → T02
- T03/02 momento-concluido · 1 toc. · trás — · sem saída pra trás → pai T02 (como a 01); nunca refaz a baixa
- T03/03 estado-pacote-de-4-dias · 2 toc. · trás — · sem saída pra trás → pai T02 (como a 01)
- T03/04 estado-pacote-vencido · 2 toc. · trás Trocar de garagem · Voltar desenhado → Trocar de garagem → T02
- T04/00 tela · 13 toc. · trás — · raiz → sai do app; sessão e fila seguem (HU-T15-2)
- T04/01 momento-sem-modulo · 12 toc. · trás — · raiz → sai do app
- T04/02 momento-modulo-sem-ativo · 13 toc. · trás — · raiz → sai do app; sessão segue
- T04/03 estado-faixa-modulo-com-falha · 13 toc. · trás — · raiz → sai do app; sessão segue
- T04/04 estado-checklist-pendente · 13 toc. · trás — · raiz → sai do app; sessão segue
- T04/05 momento-folha-conta · 4 toc. · trás [Fechar] · folha/diálogo → fecha a folha → menu
- T04/06 momento-folha-conta-sair-com-sessao-aberta · 4 toc. · trás Cancelar · folha/diálogo → Cancelar → folha da conta (T04/05)
- T04/07 momento-folha-trocar-de-garagem · 3 toc. · trás [Fechar] · folha/diálogo → fecha a folha → menu
- T04/08 estado-folha-trocar-de-garagem-envio-em-andamento · 3 toc. · trás [Fechar] · folha/diálogo → fecha a folha → menu
- T04/09 estado-folha-trocar-de-garagem-com-modulo-conectado · 4 toc. · trás Cancelar · folha/diálogo → Cancelar → folha de trocar (T04/07)
- T05/00 tela · 5 toc. · trás — · sem saída pra trás → pai menu (como a 03)
- T05/01 momento-nenhum-escolhido · 5 toc. · trás — · sem saída pra trás → pai menu
- T05/02 momento-um-encontrado · 2 toc. · trás — · sem saída pra trás → pai menu
- T05/03 estado-nenhum-encontrado · 2 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T05/04 estado-conexao-falhou · 5 toc. · trás — · sem saída pra trás → pai menu; a conexão não fica aberta
- T05/05 momento-pre-checagem · 3 toc. · trás Voltar ao menu · depois de ato → Voltar ao menu, sessão aberta; nunca refaz a pré-checagem
- T05/06 estado-pre-checagem-serial-nao-cadastrado · 1 toc. · trás Procurar outro módulo · Voltar desenhado → Procurar outro módulo → a busca
- T05/07 estado-pre-checagem-modelo-sem-driver · 1 toc. · trás Procurar outro módulo · Voltar desenhado → Procurar outro módulo
- T05/08 estado-pre-checagem-firmware-fora-da-matriz · 2 toc. · trás Procurar outro módulo · Voltar desenhado → Procurar outro módulo
- T05/09 estado-firmware-fora-sem-rede-no-modulo · 2 toc. · trás Procurar outro módulo · Voltar desenhado → Procurar outro módulo
- T05/10 momento-atualizando-o-firmware · 0 toc. · trás — · processo não saia → nada; vê "Atualizando · não desconecte"
- T05/11 estado-pre-checagem-conteudo-nao-cabe · 1 toc. · trás Procurar outro módulo · Voltar desenhado → Procurar outro módulo
- T05/12 estado-pre-checagem-pool-de-cercas-esgotado · 1 toc. · trás Procurar outro módulo · Voltar desenhado → Procurar outro módulo
- T05/13 estado-pre-checagem-canal-aberto-e-pendencias · 3 toc. · trás Voltar ao menu · depois de ato → Voltar ao menu, sessão aberta
- T05/14 estado-pre-checagem-link-perdido-na-6a · 2 toc. · trás Procurar outro módulo · Voltar desenhado → Procurar outro módulo
- T05/15 estado-pre-checagem-modulo-em-repouso-na-9a · 2 toc. · trás Procurar outro módulo · Voltar desenhado → Procurar outro módulo
- T06/00 tela · 8 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu (T04/02)
- T06/01 momento-confirmar-o-veiculo · 3 toc. · trás Escolher outro · Voltar desenhado → Escolher outro → a lista
- T06/02 estado-chassi-divergente · 4 toc. · trás Escolher outro veículo + Voltar ao menu · Voltar desenhado → Escolher outro veículo → a lista (o degrau mais perto)
- T06/03 estado-sem-chassi-na-can · 3 toc. · trás Escolher outro · Voltar desenhado → Escolher outro
- T06/04 estado-fora-do-pacote · 2 toc. · trás Escolher outro · Voltar desenhado → Escolher outro
- T06/05 estado-conflito-de-pinos-resolvivel · 3 toc. · trás Escolher outro · Voltar desenhado → Escolher outro
- T06/06 estado-conflito-de-pinos-sem-saida · 2 toc. · trás Escolher outro · Voltar desenhado → Escolher outro
- T07/00 tela · 3 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T07/01 estado-fora-da-faixa · 3 toc. · trás — · sem saída pra trás → pai menu (como a 00) · T07-V6
- T07/02 estado-sem-leitura · 3 toc. · trás — · sem saída pra trás → pai menu · T07-V6
- T07/03 estado-dominio-mudo · 3 toc. · trás — · sem saída pra trás → pai menu · T07-V6
- T08/00 tela · 3 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T08/01 momento-relendo · 2 toc. · trás — · processo não saia → nada; vê "Lendo · não saia da tela" · ENCERRAR ativo (T08-V8)
- T08/02 momento-concluida · 3 toc. · trás Voltar ao menu · depois de ato → Voltar ao menu; nunca volta ao relendo
- T09/00 tela · 1 toc. · trás — · processo não saia → abre a recuperação T09/03 (fluxos.md:36, HU-T09-9) · T09-N3
- T09/01 estado-bloco-recusado · 3 toc. · trás Voltar ao menu · Voltar desenhado → o que o Voltar ao menu faz: a recuperação enquanto a Conexão não gravou (T09-G9)
- T09/02 estado-queda-na-cadeia · 3 toc. · trás Voltar ao menu · Voltar desenhado → a recuperação T09/03 (mesmo par, mesmo 3 de 6)
- T09/03 estado-recuperacao-ate-a-conexao-gravar · 2 toc. · trás — · processo não saia → nada; vê "Termine a gravação antes de sair."
- T09/04 momento-cadeia-concluida · 2 toc. · trás Voltar ao menu · depois de ato → Voltar ao menu; nunca volta à cadeia
- T10/00 tela · 3 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T10/01 momento-hodometro-semeado · 3 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T10/02 estado-rotacao-caminhao-coletor · 2 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T10/03 estado-ja-semeado · 3 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T10/04 estado-modulo-sem-pulsos · 3 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T11/00 tela · 3 toc. · trás — · sem saída pra trás → pai menu (como a 02), sem registrar
- T11/01 estado-conteudo-que-o-app-nao-reconhece · 3 toc. · trás — · sem saída pra trás → pai menu, sem registrar
- T11/02 momento-tudo-confere · 2 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T12/00 tela · 7 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T12/01 momento-detalhe-da-instalacao · 2 toc. · trás Voltar às instalações · Voltar desenhado → Voltar às instalações → T12/00
- T12/02 estado-nenhuma-instalacao · 1 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T12/03 estado-sem-rede · 7 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T13/00 tela · 8 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T13/01 momento-a-identificacao-aberta · 2 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu, não só fecha a seção (LAC2-D7)
- T13/02 momento-b-montagem-aberta · 7 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T13/03 momento-c-hardware-aberta · 2 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T13/04 momento-d-configuracao-aberta · 2 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T13/05 momento-e-teste-dinamico-aberta · 2 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T13/06 momento-f-servidor-aberta · 2 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T13/07 momento-responder-item · 4 toc. · trás Voltar ao checklist · Voltar desenhado → Voltar ao checklist
- T13/08 momento-nao-conforme-com-justificativa · 4 toc. · trás Voltar ao checklist · Voltar desenhado → Voltar ao checklist
- T13/09 estado-item-reprovado · 3 toc. · trás Voltar ao checklist · Voltar desenhado → Voltar ao checklist
- T13/10 estado-finalizar-com-a-secao-f-falhando · 3 toc. · trás Cancelar · folha/diálogo → Cancelar → o checklist, sem a ciência
- T13/11 momento-homologado · 9 toc. · trás Voltar ao menu · depois de ato → Voltar ao menu; nunca volta ao checklist aberto
- T14/00 tela · 3 toc. · trás — · sem saída pra trás → pai a decidir (LAC2-D4); padrão menu, o ciclo segue aberto como no Ir para o checklist (T14-D10)
- T14/01 momento-antes-do-disparo · 2 toc. · trás — · sem saída pra trás → padrão menu, o ciclo segue aberto
- T14/02 estado-prazo-estourado · 3 toc. · trás — · sem saída pra trás → padrão menu, o ciclo segue aberto
- T14/03 estado-dinamico-fora-do-esperado · 3 toc. · trás — · sem saída pra trás → padrão menu, o ciclo segue aberto
- T14/04 estado-identificador-divergente · 3 toc. · trás — · sem saída pra trás → padrão menu, o ciclo segue aberto
- T14/05 momento-ciclo-concluido · 3 toc. · trás Voltar ao checklist + Voltar ao menu · depois de ato → Voltar ao menu (o link); nunca volta ao prazo
- T15/00 tela · 3 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu; o envio segue (HU-T15-2)
- T15/01 estado-sem-erro · 2 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T15/02 estado-dois-erros · 3 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T15/03 estado-fila-vazia · 1 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T15/04 estado-secao-f-em-re-checagem · 1 toc. · trás Voltar ao menu · Voltar desenhado → Voltar ao menu
- T16/00 tela · 0 toc. · trás — · processo não saia → nada; vê "Encerrando · não desconecte · A saída volta quando o autoteste terminar"
- T16/01 momento-pede-o-corte-de-alimentacao · 0 toc. · trás — · processo não saia → nada; vê "Aguardando o módulo voltar"
- T16/02 momento-sessao-encerrada · 1 toc. · trás Voltar ao menu · depois de ato → Voltar ao menu sem sessão; nunca volta ao encerramento
- T16/03 momento-encerrando-sem-homologar · 0 toc. · trás — · processo não saia → nada; vê "Encerrando · não desconecte · A saída volta quando o módulo desconectar"
- T16/04 momento-encerrada-sem-homologar · 1 toc. · trás Voltar ao menu · depois de ato → Voltar ao menu
- T16/05 estado-assertiva-falhando · 1 toc. · trás Voltar ao menu · depois de ato → Voltar ao menu
- T16/06 estado-sessao-interrompida · 2 toc. · trás — · sem saída pra trás → nada: o voltar não escolhe Retomar nem Descartar (LAC2-D5)

</details>

<details><summary>Saídas pra trás desenhadas × 'O que se toca' de cada tela.md · 17 linhas</summary>

- T01 · Voltar ao login (02,03,05,06,07,08) AUSENTE · Fechar (04) AUSENTE
- T02 · nenhuma saída pra trás desenhada
- T03 · Voltar ao contexto (01) AUSENTE (T03-A8) · Trocar de garagem (04) citado
- T04 · Fechar (05,07,08) AUSENTE · Cancelar (06,09) AUSENTE · ENCERRAR em 4 refs, não citado (T04-V8)
- T05 · Voltar ao menu (03,05,13) AUSENTE · Procurar outro módulo (8 refs) citado
- T06 · Voltar ao menu (00,02) AUSENTE · Escolher outro (5 refs) citado · Escolher outro veículo (02) AUSENTE
- T07 · Voltar ao menu (00) AUSENTE
- T08 · Voltar ao menu (00,02) AUSENTE
- T09 · Voltar ao menu (01,02,04) AUSENTE
- T10 · Voltar ao menu (00-04) AUSENTE
- T11 · Voltar ao menu (02) citado
- T12 · Voltar ao menu (00,02,03) e Voltar às instalações (01) citados
- T13 · Voltar ao menu (00-06, 11) AUSENTE · Voltar ao checklist (07-09) AUSENTE · Cancelar (10) AUSENTE
- T14 · Voltar ao checklist e Voltar ao menu (05) AUSENTES
- T15 · Voltar ao menu (00-04) citado
- T16 · Voltar ao menu (02,04,05) citado · o ENCERRAR é citado (tela.md:15,18), mas não aparece em nenhuma das 7 referências
- total · 71 saídas pra trás em 69 referências · 44 ausentes · 27 citadas

</details>

<details><summary>Os oito processos que pedem pra não sair · 8 linhas</summary>

- T03/00 · "Baixando · não saia da tela", um <a href="#p"> (html:63) · 1 tocável · sem ENCERRAR
- T05/10 · "Atualizando · não desconecte" · "A pré-checagem recomeça quando terminar" · 0 tocáveis
- T08/01 · "Lendo · não saia da tela", um <a href="#p"> (html:94) · ENCERRAR ativo (html:31)
- T09/00 · "Gravando · não interrompa" · "A saída volta quando a cadeia fechar" (html:121-122) · ENCERRAR ativo (html:31)
- T09/03 · aviso "Termine a gravação antes de sair." (html:41) · "Continuar a gravação" · ENCERRAR ativo (html:31)
- T16/00 · "Encerrando · não desconecte" · "A saída volta quando o autoteste terminar" (html:124-125) · 0 tocáveis
- T16/01 · "Aguardando o módulo voltar" · "A saída volta quando o autoteste terminar" · 0 tocáveis
- T16/03 · "Encerrando · não desconecte" · "A saída volta quando o módulo desconectar" (html:53) · 0 tocáveis

</details>

<details><summary>G-voltar · o que cada caminho faz nos casos medidos · 7 linhas</summary>

- no menu, depois da T16/02, o técnico volta · (a) remonta ?tela=T16 pela semente 'sessão homologada' (logica.md:52): a sessão encerrada volta e 'Encerrando · não desconecte' roda de novo · (b) sai do protótipo
- na T09/04, Voltar ao menu e depois voltar · (a) remonta ?tela=T09 pela semente: a cadeia 'Gravando · não interrompa' grava de novo · (b) sai
- qualquer volta pra ?tela=T04 no primeiro menu (T04/01, sem módulo) · (a) a semente abre M2C-0417 (logica.md:40): a faixa aparece sem pré-checagem · (b) nunca se remonta
- com a sessão M2C-0417, o técnico vai da T11 à T12 e volta · (a) ?tela=T11 remonta pela semente M2C-0438 + ONK-8Q90 (logica.md:47): a faixa troca de módulo · (b) sai
- folha da conta aberta (momento, sem endereço), e o técnico volta · (a) vai pra entrada anterior do histórico e não fecha a folha · (b) sai
- link de estado aberto no celular, no modo estreito (PALCO-A5), e o gesto de voltar · (a) e (b): saem os dois do protótipo e voltam à conversa; o link reabre o mesmo estado
- depois de andar pelo painel a partir de um link, o gesto de voltar · (a) volta ao lugar do link, remontado por caso ou semente · (b) sai; o link na conversa continua valendo

</details>

<details><summary>Notas para os ciclos · Lacuna 2 · o voltar do sistema</summary>

- C3 (palco): o G-voltar tem que voltar do gate antes do C3. 'navegar por URL' (ciclos.md:41) não diz se a troca empilha no histórico.
- Com (b): toda escrita de URL é replaceState — fluxo, painel, coluna, 'Voltar ao fluxo' e 'Recomeçar do login'. A URL só é lida na carga da página. logica.md ganha essa linha em 'A URL' no mesmo ciclo, porque a documentação segue o código.
- Em qualquer caminho, o estado único nunca escreve em M (DADOS-A9), e estado aberto pela coluna se monta do caso sem mexer no fluxo guardado.
- Pendência nova pra 08-produto-real/pendencias.md, 'Com o PM': o que o voltar do Android faz em cada tela, com a tabela das 105 e as seis famílias como padrão. Não escrevi: este ciclo é só leitura.
- O '26 lugares' da tarefa: medi 36 referências sem saída desenhada, 29 fora de login e menu, e 26 se a T02 contar como raiz, que é o padrão proposto.
- O executor constrói o Voltar desenhado das 44 saídas que não estão em nenhum 'O que se toca' pela referência. A tela.md não lista essas saídas (LAC2-A4).
- Os 336 tocáveis extraídos batem com os 336 do M18. O inventário está em /private/tmp/claude-501/-Users-luizfelipesilvacorreia-Downloads-app-configurador/feef562c-65d3-40bd-8160-061b85e3c9c5/scratchpad/tmp/voltar/ (toc.json, rows.json, tabela.txt e os scripts extrai.js, classifica.js, cruza.js, tabela.js).
- PALCO-A5 e DADOS-A9 não estão no itens-telas.md. Li os textos no journal do workflow, só pra citar.

</details>

### Lacuna 3 · o leitor de tela

<details><summary>(1) Poços com glifo de estado · 367 em 63 referências · glifo «texto visível da linha» [marca] · 60 linhas</summary>

- Legenda: [=] o mesmo texto aparece com outro glifo em outra referência · [—] o valor é só travessão · [?] só um valor, sem palavra de veredito · [≠] o texto diz o contrário do glifo · sem marca = o texto já diz. relógio* = traço de relógio da tela, não o da folha 3. Fonte: tmp/leitor/sonda.py → sonda.json, linhas.txt
- T01/01 · poço 26 · xis «USUÁRIO OU SENHA INCORRETOS Confira os dois e …»
- T02/00 · poço 26 · traço «Pátio Caruaru pacote vencido · sincronize ante…»
- T02/01 · poço 26 · traço «Pátio Caruaru pacote vencido · sincronize ante…»
- T02/02 · poço 26 · traço «Pátio Caruaru pacote vencido · sincronize ante…»
- T03/00 · poço 26 · agora «Ativos 6 de 10» · ok «Modelos de ativo 3 de 3» · espera «Cartões —» [—]
- T03/01 · poço 26 · semsinal «A BAIXA PAROU ONDE ESTAVA …» · agora «Ativos 6 de 10» · ok «Modelos de ativo 3 de 3» · espera «Cartões —» [—]
- T03/02 · poço 26 · ok «Ativos 10» [?] · ok «Modelos de ativo 3» [?] · ok «Cartões 3» [?]
- T03/03 · poço 26 · pausa «PACOTE DE 4 DIAS Dá pra trabalhar. …»
- T04/00 · poço 30 · traço «Últimas instalações sem conexão»
- T04/01 · poço 30/34 · traço «ATIVO SELECIONADO nenhum» · traço «Dados da CAN espera módulo e ativo» · traço «Configurar módulo espera módulo e ativo» · traço «Refazer leitura espera módulo e ativo» · traço «Calibração espera módulo e ativo» · traço «Conferir configuração espera módulo e ativo» · traço «Finalizar com checklist espera módulo e ativo» · traço «Últimas instalações espera conexão»
- T04/02 · poço 30 · traço «Dados da CAN espera ativo» · traço «Configurar módulo espera ativo» · traço «Refazer leitura espera ativo» · traço «Calibração espera ativo» · traço «Conferir configuração espera ativo» · traço «Finalizar com checklist espera ativo» · traço «Últimas instalações espera conexão»
- T04/03 · poço 30 · traço «Últimas instalações sem conexão»
- T04/04 · poço 30 · traço «Últimas instalações sem conexão»
- T04/07 · poço 30 · traço «Pátio Caruaru carregado há 8 dias · o limite é…»
- T04/08 · poço 30 · traço «Garagem Ibura espera o envio terminar ATIVOS 8» · traço «Pátio Caruaru carregado há 8 dias …»
- T05/01 · poço 30 · traço «M2C-0999 não está no cadastro desta empresa»
- T05/05 · poço 24 · ok «Serial no cadastro VL06 CAN-BT» · ok «Firmware 2.3.5» · ok «Alimentação e bateria na faixa» · ok «GPS e antena antena ok» · ok «Entradas digitais conforme» · ok «Modem, SIM e sinal na rede» · ok «CAN sem erros» · ok «Espaço no módulo 128 de 192» · ok «Espaço para cercas 4 de 4» · ok «ID no destino registrado» · ok «Canal de programação livre»
- T05/06 · poço 24 · xis «Serial no cadastro M2C-0999» [?] · traço «Firmware sem cadastro» · ok «Alimentação e bateria na faixa» · ok «GPS e antena antena ok» · traço «Entradas digitais sem cadastro» · ok «Modem, SIM e sinal na rede» · ok «CAN sem erros» · traço «Espaço no módulo sem cadastro» · traço «Espaço para cercas sem cadastro» · traço «ID no destino sem cadastro» · ok «Canal de programação livre»
- T05/07 · poço 24 · xis «Serial no cadastro não atendido nesta versão V…» · traço «Firmware sem cadastro» · ok «Alimentação e bateria na faixa» · ok «GPS e antena antena ok» · traço «Entradas digitais sem cadastro» · ok «Modem, SIM e sinal na rede» · ok «CAN sem erros» · traço «Espaço no módulo sem cadastro» · traço «Espaço para cercas sem cadastro» · traço «ID no destino sem cadastro» · ok «Canal de programação livre»
- T05/08 · poço 24 · ok «Serial no cadastro VL06 FULL» · xis «Firmware homologadas 2.2.0 e 2.3.5 2.4.1» [?] · ok «Alimentação e bateria na faixa» · ok «GPS e antena antena ok» · ok «Entradas digitais conforme» · ok «Modem, SIM e sinal na rede» · ok «CAN sem erros» · traço «Espaço no módulo não avaliada» · traço «Espaço para cercas não avaliada» · ok «ID no destino registrado» · ok «Canal de programação livre»
- T05/09 · poço 24 · ok «Serial no cadastro VL06 FULL» · xis «Firmware homologadas 2.2.0 e 2.3.5 2.4.1» [?] · ok «Alimentação e bateria na faixa» · ok «GPS e antena antena ok» · ok «Entradas digitais conforme» · ok «Modem, SIM e sinal sem rede» [≠] · ok «CAN sem erros» · traço «Espaço no módulo não avaliada» · traço «Espaço para cercas não avaliada» · ok «ID no destino registrado» · ok «Canal de programação livre»
- T05/10 · poço 24 · ok «Serial no cadastro VL06 FULL» · agora «Firmware atualizando · 62%» · relógio* «Alimentação e bateria —» [—] · relógio* «GPS e antena —» [—] · relógio* «Entradas digitais —» [—] · relógio* «Modem, SIM e sinal —» [—] · relógio* «CAN —» [=] · relógio* «Espaço no módulo —» [=] · relógio* «Espaço para cercas —» [=] · relógio* «ID no destino —» [=] · relógio* «Canal de programação —» [=]
- T05/11 · poço 24 · ok ×6 (Serial VL06 ECO · Firmware 2.2.0 · Alimentação na faixa · GPS antena ok · Entradas conforme · Modem na rede) · traço «CAN sem CAN» · xis «Espaço no módulo 128 registros · cabem 96 não …» · ok «Espaço para cercas 0 de 2» · ok «ID no destino registrado» · ok «Canal de programação livre»
- T05/12 · poço 24 · ok ×8 (Serial VL06 FULL … Espaço no módulo 128 de 192) · xis «Espaço para cercas Terminal Cosme e Damião não…» · ok «ID no destino registrado» · ok «Canal de programação livre»
- T05/13 · poço 24 · ok ×10 (Serial VL06 CAN … ID no destino registrado) · ok «Canal de programação aberto desde 03/03 às 13:…»
- T05/14 · poço 24 · semsinal «SEM RESPOSTA DO MÓDULO Reconecte para seguir d…» · ok ×5 (Serial … Entradas digitais conforme) · semsinal «Modem, SIM e sinal sem resposta» · espera «CAN —» [=] · espera «Espaço no módulo —» [=] · espera «Espaço para cercas —» [=] · espera «ID no destino —» [=] · espera «Canal de programação —» [=]
- T05/15 · poço 24 · lua «MÓDULO EM REPOUSO Acorde para seguir da nona.» · ok ×8 (Serial … Espaço no módulo 128 de 192) · lua «Espaço para cercas em repouso» · espera «ID no destino —» [=] · espera «Canal de programação —» [=]
- T09/00 · poço 34 · ok «Limpeza feita apaga a configuração anterior» · ok «Ativo A12 quem é o veículo e a tradução da CAN» [?] · ok «Cercas G07 as regiões geográficas» [?] · agora «Leitor gravando como o cartão do motorista é l…» · espera «Eventos E05 o que o módulo reporta e quando» [=] · espera «Conexão C03 para onde ele manda» [=]
- T09/01 · poço 26/34 · xis «A CADEIA PAROU Cercas foi recusado. …» · ok «Limpeza feita …» · ok «Ativo A12 …» [?] · xis «Cercas recusado os pontos das áreas não voltaram» · traço «Leitor não foi alcançado» · traço «Eventos não foi alcançado» · traço «Conexão não foi alcançado»
- T09/02 · poço 26/34 · semsinal-neutro «A CADEIA PAUSOU NO LEITOR O link caiu. …» · ok «Limpeza feita …» · ok «Ativo A12 …» [?] · ok «Cercas G07 …» [?] · semsinal-neutro «Leitor pausado como o cartão do motorista é lido» · traço «Eventos — o que o módulo reporta e quando» [—] · traço «Conexão — para onde ele manda» [—]
- T09/03 · poço 26/34 · pausa «A CONEXÃO AINDA NÃO FOI GRAVADA …» · ok «Limpeza feita …» · ok «Ativo A12 …» [?] · ok «Cercas G07 …» [?] · semsinal-neutro «Leitor pausado …» · traço «Eventos — …» [—] · traço «Conexão — …» [—]
- T09/04 · poço 34 · ok «Limpeza feita …» · ok «Ativo A12 …» · ok «Cercas G07 …» · ok «Leitor L02 como o cartão do motorista é lido» · ok «Eventos E05 o que o módulo reporta e quando» [=] · ok «Conexão C03 para onde ele manda» [=]
- T11/00 · poço 26 · xis «NÃO BATE COM O CADASTRO» · traço «Ativo tradução frota v2» [=] · traço «Cercas 4 regiões» [=] · traço «Leitor leitor sem fio» [=] · traço «Eventos intervalo 30 s» [=] · traço «Conexão rede do módulo atual» [=]
- T11/01 · poço 26 · xis «NÃO BATE COM O CADASTRO» · as mesmas 5 linhas de traço da 00 [=]
- T11/02 · poço 26 · ok «Ativo tradução frota v2» [=] · ok «Cercas 4 regiões» [=] · ok «Leitor leitor sem fio» [=] · ok «Eventos intervalo 30 s» [=] · ok «Conexão rede do módulo atual» [=]
- T12/00 · poço 32 · ok «RKT-8H42 M2C-0417 · 11:47 aprovada» · relógio* «PCX-9A17 M2C-0312 · 16:05 aguardando validação» · xis «RVM-1E54 M2C-0362 · há 9 dias falha reconhecida» · ok «QJF-2C61 … aprovada» · ok «KNB-5H39 … aprovada»
- T12/01 · poço 32 · ok «Pré-checagem 12 de 12» · ok «Configuração 6 blocos relidos» · ok «Calibração hodômetro · com foto» [?] · ok «Ciclo dinâmico 5 de 5» · ok «Checklist 10 de 10» · ok «Autoteste 8 de 8» · ok «Recebimento confirmado 11:47»
- T12/03 · poço 26/32 · semsinal-neutro «SEM CONEXÃO Esta é a consulta das 11:47.» · as mesmas 5 linhas do histórico da 00
- T13/00 · poço 32 · ok «A · Identificação 4 de 4» · espera «B · Montagem 0 de 5» [?] · ok «C · Hardware 4 de 4» · ok «D · Configuração 10 de 10» · relógio* «E · Teste dinâmico 0 de 5» [?] · ok «F · Servidor não bloqueia 3 de 3»
- T13/01 a T13/06 · poço 30 · as mesmas 6 seções da 00, com as mesmas marcas: B espera [?] e E relógio* [?]
- T13/11 · poço 32 · ok nas 6 seções (A 4 de 4 · B 5 de 5 · C 4 de 4 · D 10 de 10 · E 5 de 5 · F 3 de 3)
- T14/00 · poço 24 · ok «Ignição ligada» · ok «Movimento detectado» · relógio* «Ré acionada» [≠] · relógio* «Porta aberta» [≠] · relógio* «Ignição desligada» [≠]
- T14/01 · poço 24 · igual à 00: ok, ok, relógio* ×3 [≠]
- T14/02 · poço 24 · ok «Ignição ligada» · ok «Movimento detectado» · ok «Ré acionada» [=] · ok «Porta aberta» [=] · ok «Ignição desligada» [=]
- T14/03 · poço 24 · ok «Ignição ligada» · xis «Movimento detectado velocidade 0 km/h · devia …» [≠] · relógio* «Ré acionada» [≠] · relógio* «Porta aberta» [≠] · relógio* «Ignição desligada» [≠]
- T14/04 · poço 24 · ok, ok, relógio* ×3 [≠] · xis «Cartão do motorista leu 9412857 · o cadastro e…»
- T14/05 · poço 24 · ok ×5, as mesmas cinco linhas da 00 [=] em Ré, Porta, Ignição desligada
- T15/00 · poço 30 · espera «Calibração RSW-9L02 · na fila há 18 min» · ok «Evidências RSW-9L02 · recebida ontem 10:05»
- T15/01 · poço 30 · espera «Checklist PCX-9A17 · na fila há 4 min» · ok «Evidências RKT-8H42 · recebida 14:02» · ok «Calibração RKT-8H42 · recebida 13:48»
- T15/02 · poço 30/34 · relógio* «Evidências · KWX-2T36 sem rede · 3 tentativas …» · espera «Calibração RSW-9L02 · na fila há 18 min» · ok «Evidências RSW-9L02 · recebida ontem 10:05»
- T15/04 · poço 30 · relógio* «RVM-1E54 recebimento pendente confere em 24 h»
- T16/00 · poço 32 · ok «Contadores e estado gravados» · ok «Reinício do módulo voltou» · agora «Releitura completa Ele lê de volta … relendo» [?] · espera «Repouso do módulo —» [—] · espera «Canal de programação —» [=] · espera «Registro da sessão —» [—] · espera «Desconexão —» [—] · espera «Autoteste —» [—]
- T16/01 · poço 32 · ok «Contadores e estado gravados» · energia «Reinício do módulo Desligue e ligue a alimenta… é com você» · espera «Releitura completa —» [—] · espera «Repouso do módulo —» [—] · espera «Canal de programação —» [=] · espera «Registro da sessão —» [—] · espera «Desconexão —» [—] · espera «Autoteste —» [—]
- T16/02 · poço 32 · ok «Configuração confere» · ok «Contadores 482.317 km · 9.640 h» [?] · ok «Identificadores 3 de 3» · traço-em-círculo «Faixa de contadores não se aplica» · traço-em-círculo «Pontos de cerca não se aplica» · ok «Canal de programação fechado» · ok «Repouso do módulo restaurado» · relógio* «ID na plataforma na fila»
- T16/03 · poço 32 · traço «Contadores e estado pulado» · traço «Reinício do módulo pulado» · traço «Releitura completa pulado» · ok «Repouso do módulo restaurado» · agora «Canal de programação … fechando» · espera «Registro da sessão —» [—] · espera «Desconexão —» [—] · traço «Autoteste pulado»
- T16/04 · poço 26/32 · pausa «SEM HOMOLOGAR A instalação continua aberta. …» · ok «Repouso do módulo restaurado» · ok «Canal de programação fechado» · ok «Registro da sessão na fila» · ok «Desconexão feita»
- T16/05 · poço 32 · ok «Configuração confere» · xis «Contadores 0 km» [?] · ok «Identificadores 3 de 3» · traço-em-círculo ×2 «… não se aplica» · ok «Canal de programação fechado» · ok «Repouso do módulo restaurado» · relógio* «ID na plataforma na fila»
- T16/06 · poço 32 · ok «Limpeza feita» · ok «Ativo A12» · ok «Cercas G07» · pausa «Leitor a versão gravada até aqui é A12.G07 parou aqui» · espera «Eventos —» [—] · espera «Conexão —» [—]
- Total: 367 poços (24px 154 · 26px 37 · 30px 65 · 32px 79 · 34px 32) · diz 260 · [=] 39 · [?] 31 · [—] 23 · [≠] 14

</details>

<details><summary>(1b) Glifos de estado fora de poço · 31 em 17 referências · também mudos · 6 linhas</summary>

- T01/08 · 6 checks lima sem círculo (d=M4 12.5l5 5L20 6.5) e 1 círculo r=8 #4E475E · «Código conferido 482913», os 5 requisitos cumpridos e «Diferente das 3 últimas · confere ao salvar» · o leitor lê as regras sem dizer quais valem (T01-A4 em escala)
- T07/00–03 · 2 checks lima sem círculo cada (d=M3 8.5l3.2 3.2L13 4.8) · «Ignição ligada» · «Posição fixa» · o texto diz o fato
- T09/00, 02, 03, 04:38 e T09/01:120 · ok 14px · «ocupação de pinos confere» · o texto diz
- T10/01:54 · ok 15px · «relido às 14:31 · confere com o painel» · o texto diz
- T14/00, 01, 03, 04 :64 e :67 · relógio 16px #6E6683 · «recebido no servidor» · «campos conferidos» · [≠]: o texto afirma o que ainda não aconteceu
- T15/00:41 · T15/02:42 · xis 22px · «UM PRECISA DE VOCÊ» · «DUAS COM ERRO» · o rótulo diz

</details>

<details><summary>(1c) As 107 linhas em que o texto sozinho não diz o veredito, por padrão · 5 linhas</summary>

- [=] 39 poços · 16 textos iguais com glifos diferentes (tmp/leitor/ambiguos.txt) · T09/00:94,107 espera × T09/04:94,107 ok (Eventos E05 · Conexão C03) · T11/00–01:41–61 traço × T11/02:41–61 ok, as 5 linhas (T11-N1) · T14/02,05 ok × T14/00,01,03,04 relógio (Ré acionada · Porta aberta · Ignição desligada) · T05/10 relógio × T05/14–15 espera × T16/00–01 espera (CAN — · Espaço no módulo — · Espaço para cercas — · ID no destino — · Canal de programação —)
- [—] 23 poços, ou 37 contando os que também são [=] · o travessão carrega três vereditos: ainda não 24 (T03, T05/14–15, T16/00–01–03–06) · em andamento 9 (T05/10:41–73) · não se aplica 4 (T09/02–03:98,111)
- [?] 31 poços · só um valor · T09/00–03 «Ativo A12» e «Cercas G07» (ok) leem igual a «Eventos E05» (espera) na mesma tela · T13/00–06 «B · Montagem 0 de 5» (espera) e «E · Teste dinâmico 0 de 5» (relógio) · T05/06:34 xis «Serial no cadastro M2C-0999» · T05/08–09:39 xis «Firmware homologadas 2.2.0 e 2.3.5 2.4.1» · T16/05:42 xis «Contadores 0 km» × T16/02:44 ok «Contadores 482.317 km · 9.640 h» · T03/02 «Ativos 10» · T12/01:42 «Calibração hodômetro · com foto» · T16/00:63 «Releitura completa …»
- [≠] 14 poços · o texto diz o contrário · T14/00,01,03,04:80,84,88 relógio, passos que ainda não aconteceram (12) · T14/03:76 xis «Movimento detectado · velocidade 0 km/h» · T05/09:59 ok «Modem, SIM e sinal sem rede» (T05-N1)
- Diz: 260 poços · o texto já carrega o veredito: feita, recusado, pausado, não foi alcançado, na fila, aprovada, não se aplica, pulado, os avisos com rótulo

</details>

<details><summary>(2) aria-label e alt nas 105 referências × os 16 textos.md · 6 linhas</summary>

- aria-label «Conta — Rafael Vieira» · <button> das iniciais RV · T04/00…09:30 (10) · ausente do T04/textos.md, que só lista «RV» · o nome vem de M.tecnico.nome (mocks.js)
- aria-label «Fechar» · <button> X da folha · T01/04:24 · T04/05:40 · T04/07:40 · T04/08:40 (4) · ausente dos textos.md da T01 e da T04
- aria-label «Mostrar a senha» · <button> olho · T01/00:44 · T01/01:48 (2) · ausente · o outro estado (T01/tela.md:19 «o olho do campo de senha mostra e esconde») não tem nome em lugar nenhum
- alt «Mobs2» · <img logo-mobs2.svg> · T01/00:27 · T01/01:27 (2) · ausente; o T01/textos.md:7 vai de «14:30 · Entrar · CONFIGURADOR»; «Mobs2» só existe no T13/textos.md:23 como rede do módulo
- Total: 4 nomes · 18 atributos · 13 referências · 0 nos 16 textos.md (grep -F nos 16)
- Pra comparar: 9 h1 visualmente escondidos (clip) só pro leitor: «Entrar» T01/00–01:24 e «Menu» em 7 da T04 · os 9 estão nos textos.md (T01:7,11; T04:11,31,43…) sem marca de que ninguém os vê

</details>

<details><summary>(2b) O que fica sem nome ou sem estado se o executor copiar a referência · 8 linhas</summary>

- Campo da nova senha · T01/08:42 <input id="nsm"> · sem label e sem aria-label · título visível «Crie a nova senha» · o M17 não pegou
- 4 role="dialog" sem nome e sem aria-modal · T01/09:24 «Senha alterada» (h1) · T04/06:35 «Sair da conta» · T04/09:35 «Trocar de garagem» · T13/10:33 «A Seção F não passou» (h1) · pelo ARIA, diálogo não tira nome do conteúdo
- 4 folhas sem papel nenhum · T01/04 «Não recebi o código» · T04/05 «Conta» · T04/07–08 «Trocar de garagem» · o véu não prende o leitor
- Escolhido sem estado · T02/01:33 lima 12×12 × T02/00:33 vazio 11×11, mesmo texto · T04/07–08:45 «a atual» · 0 aria-checked ou aria-selected em marcador · as linhas de garagem da T02 e da T04/07 nem são tocáveis (div)
- Desabilitado sem estado · os 18 cartões do menu com traço são <a href> (T04/00–04) · 0 disabled e 0 aria-disabled nas 105
- Processo correndo · <a href="#p"> em T03/00:63 e T08/01:94 × <span> em T05/10:83, T09/00:121, T16/00:124, T16/01:124, T16/03:53 (T03-V5 em escala)
- Acordeão da T13 · 0 aria-expanded · contadores lidos sem sentido: «2 Fila de saída» (T04/00:128) · «10 Finalizar com checklist» (T04/04:108)
- Barra do sistema desenhada · 105/105 · «14:30» é o primeiro texto de todo textos.md · o leitor lê como conteúdo do app, além da barra real do Android (componentes.md:15 «não é do app»)

</details>

<details><summary>(3) Processos que mudam a tela sem toque · o que o leitor anuncia hoje (referência traduzida 1:1: glifo aria-hidden, nenhuma região viva, foco parado) · 14 linhas</summary>

- Pré-checagem · T05 · 600ms por linha (movimento.md:32) · o poço vai de agora a check, o valor sai de «—» pra «na faixa»; na falha, linha vermelha, causa e aviso; no fim, a faixa desce (T05/animacao.md:8–11) · HOJE: nada. Quem tocar a linha ouve «Alimentação e bateria, na faixa», sem 'aprovado'; na falha, «Serial no cadastro, M2C-0999» (T05/06:34). A sessão nasce (R-05) em silêncio
- Cadeia · T09 · 1s por bloco (movimento.md:33) · agora vira check, o trilho acende; na recusa, elo vermelho e aviso; no fim, o rodapé troca e a prova «GRAVADO E RELIDO» aparece · HOJE: nada. Só o elo que grava muda de texto («gravando» → «L02»); Eventos e Conexão leem «E05» e «C03» antes e depois (T09/00:94,107 × T09/04:94,107)
- Passos do ciclo · T14 · 3s por passo (movimento.md:37 · R-10) · relógio vira check; o contador vai de «2 de 5 passos» a «5 de 5 passos» · HOJE: nada. O texto das 5 linhas é o mesmo em T14/00 e T14/05; tocando, ouve-se «Ré acionada» antes da ré (T14/00:80)
- Prazo do evento · T14 · 1s real vale 4s (movimento.md:38) · o número troca a cada segundo e a barra drena; no estouro: «0:00», «A Seção F reprova.», «não chegou» (T14/02) · HOJE: nada, nem no estouro. A linha «recebido no servidor» lê igual antes e depois (relógio fora de poço, T14/00:64) até ganhar «14:30:48» (T14/05)
- Encerramento · T16 · 600ms por passo (movimento.md:35) · agora vira check, os valores saem de «—» pra «gravados», «voltou»; o passo «é com você» pede o corte (T16/01:53) · HOJE: nada. O rodapé «Aguardando o módulo voltar» é span (T16/01:124); o único passo em que o técnico age (componentes.md:94) não é anunciado
- Assertivas do autoteste · T16 · 400ms cada (movimento.md:36) · cada linha acende com o valor lido; na falha, «0 km» e o aviso «A HOMOLOGAÇÃO FICA BLOQUEADA» (T16/05) · HOJE: nada. Tocando, ouve-se «Contadores, 0 km», sem 'falha' (T16/05:42)
- Conferência · T11 · 400ms por linha (movimento.md:34) · as linhas acendem · HOJE: nada; as 5 linhas leem igual no 'não bate' e no 'confere' (T11/00:41–61 × T11/02:41–61)
- Sincronização · T03 · 4s (movimento.md:39) · a barra enche, «6 de 10» vira «10», o título vira «Pacote de hoje» · HOJE: nada; o rodapé «Baixando · não saia da tela» é link (T03/00:63)
- Releitura da CAN · T08 · os sinais voltam, o título vai de «Lendo a CAN» a «Leitura refeita», «5 de 12» vira «12 de 12» · HOJE: nada; o rodapé «Lendo · não saia da tela» é link (T08/01:94)
- Firmware · T05/10 · «atualizando · 62%» troca no lugar, e no fim a pré-checagem recomeça (T05/animacao.md:12) · HOJE: nada
- Tambor · T10 · as rodinhas rolam de 184.320 a 482.317 e aparece «relido às 14:31 · confere com o painel» (T10/01:54); nasce de um toque, mas o resultado chega depois · HOJE: nada
- Cronômetro do código · T01 · «VALE POR 9:41» troca a cada segundo (T01/animacao.md:10) · HOJE: nada; aqui uma região viva falaria a cada segundo
- Fila de saída · T15 · a barra do item enche e o item enviado some (T15/animacao.md) · HOJE: nada
- Faixa de sessão sobe e some (T16/animacao.md) · cartão liberado no menu (T04/animacao.md) · HOJE: nada

</details>

<details><summary>(4) G-leitor · os 12 glifos da folha 3 (folha-3-glifos-icones-poco.html:16) nas telas · 14 linhas</summary>

- ok · «aprovado · veredito» · 196 poços em 47 refs · está no (b) · a folha 4 chama «aprovada»
- ok cinza · «feito, sem veredito» · 0 usos · está no (b) · palavra sem uso; toda linha «feita» usa o ok lima (T09/00:42, T16/04:53)
- xis · «falha» · 16 em 15 · está no (b) · a folha 4 chama «reprovada, com causa»
- traço · «não se aplica · vazio» · 61 em 22 · está no (b) · quatro sentidos: não se aplica ou pulado 22 · bloqueado ou espera 25 (T02 3, T04 21, T05/01 1) · divergente 10 (T11) · vazio depois da queda 4 (T09/02–03)
- espera · «ainda não» · 36 em 19 · está no (b)
- sem sinal · «o link caiu · falha» · 3 em 2 (T03/01, T05/14) · FORA do (b) · a folha 4 pinta o mesmo glifo como «parou aqui»
- sem sinal neutro · «sem conexão · aviso» · 4 em 3 (T09/02, T09/03, T12/03) · FORA do (b) · T09-V8: no T09/02 o link caiu, com o glifo neutro
- energia · «é com você · decide agora» · 1 em 1 (T16/01:53) · FORA do (b) · o texto da linha já diz «é com você»
- pausa · «parou, sem culpa» · 4 em 4 · está no (b)
- relógio · «em andamento» · 34 em 18 + 8 fora de poço · está no (b) · os 42 usam d=M12 7.5V12l3 1.8, não o d=M12 7.5v5l3 2 da folha · T05-A12: os 9 da T05/10 deviam ser «ainda não»
- lua · «em repouso · não é falha» · 2 em 1 (T05/15) · está no (b)
- agora · «o passo que corre» · 6 em 6 · FORA do (b) · T03-V1: no T03/01 ele corre parado
- Variantes sem legenda: traço em círculo 4 (T16/02, T16/05 · T16-V2) · check sem círculo 14 e círculo r=8 1 (T01/08, T07, fora de poço)
- Soma: 367 em poço · o (b) de 8 palavras deixa sem nome 14 poços em 11 refs e traz 1 palavra sem uso

</details>

<details><summary>Notas para os ciclos · Lacuna 3 · o leitor de tela</summary>

- C2 · o glifo com poço vira componente de base, que o componentes.md não lista (LAC3-V4). Ele recebe a propriedade de nome com os 12 valores da folha 3, e serve também aos glifos fora de poço: requisitos da T01/08, sinais da T07, pinos da T09, régua da T10, linha do evento da T14.
- C2 · o relógio do componente vai sair diferente das telas se for tirado da folha 3: 42 de 42 relógios das telas usam outro desenho (LAC3-A18, T14-A13). A comparação de print vai acusar.
- C4 · T01/08: o campo 'nsm' ganha nome pelo título. O olho usa aria-pressed. O M17 sai do gate, trocado pelo LAC3-V1.
- C5 · T04: 'Conta — ' + M.tecnico.nome · 'Fechar' nas 4 folhas · diálogos e folhas com aria-labelledby e aria-modal · cartões em espera com disabled · contadores ('2', '10') lidos sem o que contam: fica pra decidir se entram no nome do cartão.
- C6, C8, C9 e C10 · os processos seguem sem região viva. Se o G-leitor sair (c), anota no CHANGELOG que o anúncio automático é pendência do produto real, não desvio.
- Antes do ciclo de cada tela: decidir os glifos que o nome vai repetir: T11-N1, T05-A12, T09-V8, T03-V1, T16-V1 e T13-V10.
- Método: o Chrome headless passou de 90s por página (3 tentativas), então medi pelo HTML estático. A 'linha' é o ancestral mais próximo do poço que tem texto, e o nome acessível é uma aproximação do accname, com diálogo tirando nome do conteúdo corrigido à mão. Arquivos em /private/tmp/claude-501/-Users-luizfelipesilvacorreia-Downloads-app-configurador/feef562c-65d3-40bd-8160-061b85e3c9c5/scratchpad/tmp/leitor/: sonda.py, sonda.json, pocos.txt, linhas.txt, ambiguos.txt, tabela1.json. Nenhum …

</details>

### Anexo B · Os 6 itens refutados

Saíram das contas, e ficam aqui pra ninguém levantá-los de novo.

- **T04-V9** — Os casos `tecnico` e `uos · pacotes` de estados.md não são chaves de M.casos: são dados de topo *Refutado:* A pasta já resolve: casos.md:41 diz que 'Os estados sem caso próprio nascem de um dado do mock' e que o estados.md de cada tela diz de onde vem cada um. A coluna aceita dado de topo, como em T03 `pacotes · pac-uo-02` e T06 `modelosAtivo · ma-02`. E 05 e 07 são momentos, não estados.
- **T05-V11** — A 10 mostra leituras preenchidas enquanto nada foi lido *Refutado:* Não é verdade que nada foi lido: o Serial passou, e a tira vem da conexão, a mesma da 08. A incoerência que existe é a da tira sumir nas 14/15 (ver T05-A9).
- **T05-V15** — A spec pede 'Desconectar' depois de conectar, e nenhuma referência tem *Refutado:* A pasta já resolve. A desconexão é um passo do encerramento na T16, e o v1 perde para a pasta quando os dois discordam. Não é um achado.
- **T05-N5** — A 10 diz que a pré-checagem 'recomeça do zero', mas mantém o Serial aprovado *Refutado:* Não há contradição. A 10 é o quadro de durante, e a própria legenda dela diz que o recomeço vem depois. O Serial aprovado durante a gravação não diz nada sobre o recomeço. O que falta de fato é a referência do quadro seguinte ('0 de 11'), que animacao.md:14 exige para o fim do movimento.
- **T06-N5** — A HU-T06-6 diz que o conflito é nomeado como 'incompatibilidade'; a tela escreve 'ERRO DE PROJETO DE INSTALAÇÃO' *Refutado:* Não há divergência. A fonte (requisitos-v1.md:497) diz as duas coisas juntas: o caso se chama erro de projeto de instalação, e a tela nomeia a incompatibilidade, isto é, descreve o que briga. A 06 faz as duas: o rótulo 'ERRO DE PROJETO DE INSTALAÇÃO' e a frase 'O fio branco é do sensor de porta, e este módulo não tem leitor sem fio.' A HU só resumiu a fonte.
- **T11-N4** — animacao.md diz que o movimento vai de uma referência parada à outra, mas de 00 a 02 mudam a sessão, o cabeçalho (+2px), o bloco sob a lista e o rodapé (topo 659 → 697). Isso é mover o layout, que é proibido. *Refutado:* Nenhum movimento vai do 00 ao 02: um ou outro aparece no fim da leitura. Então não há layout sendo animado, e movimento.md:43 não é violado. As diferenças reais entre 00 e 02 já estão cobertas por outros itens: a do cabeçalho no T11-A6 e a falta do quadro de começo no T11-V3.

### Anexo C · Como refazer as medições

Os scripts ficaram fora da pasta e se perderam quando a sessão reiniciou. O método é curto e se refaz no gate do C1, já como ferramenta do projeto:

- **O mock no node:** `node -e 'global.window={};require("./04-dados/mocks.js");const M=window.M2CF_MOCKS; …'`.
- **Os textos:** extrair do HTML os nós de texto (sem `head`, `style` e `svg`), na ordem, e comparar com os itens entre crases de cada seção do `textos.md`.
- **Cores e px:** varrer os atributos `style` dos 105 HTML e comparar cada hex, rgba e px com os valores do `:root` do `tokens.css`.
- **O render:**
  1. copiar o HTML pra fora da pasta, trocando `../../../../05-recursos/` pelo caminho absoluto;
  2. injetar um script que grava `getBoundingClientRect` e `getComputedStyle` num `<pre>`;
  3. rodar o Chrome da máquina com `--headless=new --window-size=360,800 --allow-file-access-from-files --dump-dom`.

  Pro print comparável ao PNG, usar `--screenshot --force-device-scale-factor=2`. Atenção: o render local desenha a fonte com pequenas diferenças em relação aos PNG do design. Então a comparação do ciclo precisa de tolerância, ou de uma captura feita com a mesma ferramenta do design.
- **Pixel a pixel:** converter o PNG em BMP com `sips -s format bmp` e contar em python3, sem pacote nenhum. Foi assim que conferi os PNG novos do login.

### Anexo D · O que ficou fora deste estudo

- **O Figma e as ferramentas de design:** a pasta não aponta pra nenhum arquivo de design vivo, então as referências foram tratadas como a fonte única da aparência.
- **O `_fontes-v1/`:** foi lido só onde uma regra atual pedia o contexto. Ele perde pra pasta quando os dois discordam (`_fontes-v1/README.md`).
- **O aparelho de verdade:** o roxo pressionado, o contraste no sol e a altura útil com a navegação de três botões continuam em `08-produto-real/pendencias.md`, "validar no aparelho".
- **O produto real:** a stack, o Bluetooth, a câmera e a notificação local. O `08-produto-real/` foi lido pra saber o que é norma e o que é ilustração, e nada além disso.
