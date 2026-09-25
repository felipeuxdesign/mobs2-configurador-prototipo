# T16 · Sessão

Encerrar a sessão de configuração provando que a configuração sobreviveu ao desligar.

| | |
|---|---|
| **Elemento-assinatura** | a cadeia do encerramento e o autoteste assertiva por assertiva, com o valor lido |
| **Chrome** | faixa de sessão, até ela subir no fim |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 homologada |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 4 · 2 — ver `estados.md` |

## O que se toca

- a legenda de cada passo, enquanto ele corre: *Contadores e estado* — Grava os contadores e o estado no módulo, pra nada se perder no reinício · *Reinício do módulo* — Desligue e ligue a alimentação do módulo. Ele volta sozinho em alguns segundos · *Releitura completa* — Ele lê de volta o que ficou gravado. É isto que prova que a configuração sobreviveu ao reinício · *Repouso do módulo* — Devolve o módulo ao repouso que ele tinha antes da sessão · *Canal de programação* — Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar · *Registro da sessão* — Guarda o que foi feito aqui, pra ir ao servidor junto com a instalação · *Desconexão* — Solta o Bluetooth. O módulo fica livre pra outro aparelho · *Autoteste* — Confere as assertivas uma por uma, cada uma com o valor lido
  - **no protótipo:** cada legenda aparece embaixo do nome do passo que corre, no lugar que a peça do encerramento tem (a folha 5 · *a legenda só no passo que corre*), com o ponto final das três que as referências desenham (`00`, `01`, `03`); nos 4 passos da sessão abortada, as dos quatro que rodam. O passo 2 só leva a legenda no corte (T16·1): ela manda desligar a alimentação, e o módulo que reinicia por comando não pede isso — no herói, o passo 2 corre sem legenda, e o texto do reinício por comando vai ao arquiteto (T16·7). A do *Autoteste* fica no dado e não aparece: o passo 8 é a *Sessão encerrada* (T16·4). A palavra da direita enquanto corre (como *relendo* e *fechando*) continua sem texto nos passos 1, 2, 4, 6 e 7 (G25)
- `ENCERRAR` na faixa → o encerramento corre: com a sessão homologada, os passos 1 a 7, um a cada 600 ms; ao fechar o 7, a faixa fica sem sessão e a tela passa pra *Sessão encerrada*, onde as 8 assertivas acendem a 400 ms, e a prova e o `Voltar ao menu` entram com a última (T16·4)
- no passo do corte, só quando o driver não reinicia por comando (T16·1): o técnico desliga e religa a alimentação; no protótipo, o módulo volta sozinho no ritmo do passo
- encerrada: `Voltar ao menu` → o menu sem sessão; o voltar faz o mesmo
- ENCERRAR antes de homologar → os 4 passos da sessão abortada, sem confirmação, e a *Sessão encerrada* sem homologar. Pelos diálogos do menu (`Encerrar a sessão e sair`, `Encerrar a sessão e trocar`), os 4 passos seguem pro destino deles (G23)
- sessão interrompida: `Retomar` → a cadeia da T09, no bloco que parou; `Descartar` → o menu sem sessão, sem item de fila (T16·5); o voltar não faz nada (T16·6)
- no encerramento e no autoteste, o voltar não faz nada

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- faixa · sem ação
- duas ações
- uma ação
- processo correndo
- com legenda
- assertiva da sessão
- linha de conferência
- aviso
- nota com rótulo
- linha do histórico
- a lista de garagens
- encerrando
- pede o corte
- sem homologar
- com contador neutro
- com contador de falha
- linha de opção
- lista com contagem
- prova da sessão

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sem sessão
- faixa · sem ação
- duas ações
- uma ação
- processo correndo
- os glifos de estado
- os poços
- os marcadores
- assertiva da sessão
- falha
- aviso
- nota tracejada
- encerrando
- pede o corte
- sem homologar
- com contador neutro
- prova da sessão

Medido nas referências e no código do C11, no fechamento (G10), com os nomes das linhas do `componentes.md`. Saíram as nove que o código não usa: a faixa · sessão aberta (enquanto a sessão fecha, a faixa é a sem ação, e depois a sem sessão), a com legenda (quem explica o primário apagado é a explicação embaixo dele, a do processo correndo), a linha de conferência, a nota com rótulo (o NÃO RODARAM é a nota tracejada), a linha do histórico, a lista de garagens, o com contador de falha (a sessão que falha conta em neutro as que passaram, T16·3), a linha de opção e a lista com contagem. Entraram as de toque da folha 1 (o primário nos três estados, apagado enquanto o encerramento corre, e o link do `Descartar`), os átomos da folha 3 (os glifos e os poços do encerramento e das assertivas, e o LED da faixa), a falha (A HOMOLOGAÇÃO FICA BLOQUEADA, `05`) e a nota tracejada (`04`). As diferenças da tela contra a folha viraram variante nomeada da peça (G11), declarada lá: a assertiva da sessão com o nome aceso em todo estado, o círculo com o traço no não se aplica (o glifo de fora da folha 3) e o relógio no ainda não, a última de 54 e a que ainda não acendeu; a falha em bloqueio, sem poço (Lei 7 · exceção); a nota tracejada do que não rodou; o encerramento em pausa, a sessão interrompida (`06`); e o cabeçalho com o subtítulo (`03` e `06`).

## Histórias de usuário

- **HU-T16-1** — A faixa fica no topo de toda tela: abertura, módulo, tempo decorrido e a única saída
- **HU-T16-2** — Enquanto a sessão vive: canal reaberto sozinho, módulo e ativo travados, repouso inibido
- **HU-T16-3** — O encerramento executa 8 passos e mostra cada um
- **HU-T16-4** — Vejo o autoteste assertiva por assertiva, com o valor lido — nunca um "OK" agregado
- **HU-T16-5** — Falha do autoteste bloqueia a homologação, não o encerramento
- **HU-T16-6** — Sessão interrompida é oferecida de volta, com o ponto de retomada
- **HU-T16-7** — Descartar não desfaz o que foi gravado — descarta a intenção, e isso é registrado
- **HU-T16-8** — Canal aberto por sessão anterior é anomalia: o app fecha antes de começar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
