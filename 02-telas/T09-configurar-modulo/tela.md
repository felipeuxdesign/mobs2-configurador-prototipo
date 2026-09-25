# T09 · Configurar módulo

Gravar os blocos no módulo, um de cada vez, cada um relido antes do próximo.

| | |
|---|---|
| **Elemento-assinatura** | a cadeia: o trilho que liga os blocos e só avança com o read-back confirmado |
| **Chrome** | faixa de sessão · a linha dos pinos embaixo do título |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · os blocos do mock |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 3 — ver `estados.md` |

## O que se toca

- a cadeia corre sozinha, um bloco por segundo: o próximo começa no instante em que o anterior confirma (T09·1). A tela entra no quadro da `00` — três relidos, o Leitor gravando — e anda Leitor → Eventos → Conexão; nada conta de zero ao abrir (C9 · G27)
- bloco recusado: `Tentar de novo`, do bloco recusado
- queda: `Reconectar e seguir`, do mesmo bloco
- cadeia concluída: `Voltar ao menu` → T04, de onde a Calibração segue. A 04 não desenha um `Calibrar`, e texto novo não entra (C9 · T09-A3, G1, G25)
- tentar sair no meio — o `ENCERRAR`, ou o `Voltar ao menu` com a cadeia parada — → a recuperação, até a Conexão gravar; nela, o `ENCERRAR` fica **desabilitado e em tinta apagada**, como o voltar do Android, que ali não faz nada (a lei 17, decisão do diretor de 25/09 — no lugar do aceso que não fazia nada, G23), e `Continuar a gravação` retoma do mesmo bloco. Depois da Conexão, o `ENCERRAR` é o de toda tela com sessão
- o voltar do sistema (no computador, o Esc) é o mesmo tentar sair: antes de a Conexão gravar, abre a recuperação; na recuperação, não faz nada; na cadeia concluída, faz o `Voltar ao menu` (`06-prototipo/logica.md` · O voltar do Android)

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- uma ação
- processo correndo
- com legenda
- falha
- aviso
- processo parado
- cadeia concluída
- cadeia recusada
- a pré-condição dos pinos
- com contador neutro
- com contador de falha
- prova da cadeia

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

Medido nas 5 referências e construído no C9 (G1): as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- uma ação
- processo correndo
- os glifos de estado
- os poços
- os marcadores
- aviso
- processo parado
- cadeia concluída
- cadeia recusada
- a pré-condição dos pinos
- com contador neutro
- prova da cadeia

No acerto do design system pelo medido (G10), a lista ficou só com os nomes das linhas do `componentes.md`, e as anotações viraram variante nomeada da peça (G11), declarada lá, na linha da cadeia recusada: a cadeia correndo, gravando com o elo de 86 (00), e a pausada, parada com o contador e o aviso, com o elo de 68 (02 e 03). Entraram as de toque da folha 1 (o primário nos três estados e o link) e os átomos da folha 3 (os glifos da cadeia, do aviso e dos pinos, os poços deles e o LED da faixa). A linha dos pinos no pé do 01 é o lugar que a referência dá a ela na tela, não variante da peça (T09-D2). Na coluna do `componentes.md`, a T09 saiu das dez linhas que nenhuma das cinco desenha (faixa · sem ação, com legenda, falha, encerrando, pede o corte, sem homologar, com contador de falha, a marca no login, campo e campo focado): o aviso vermelho do 01 é o processo parado, e o 00 explica embaixo do primário, sem legenda em cima.

## Histórias de usuário

- **HU-T09-1** — Disparo e acompanho; não escolho conteúdo nem bloco
- **HU-T09-2** — A pré-condição de ocupação de pinos é a primeira linha da tela
- **HU-T09-3** — O bloco 1 declara o escopo e o que apaga/preserva. Sem confirmação em dois passos
- **HU-T09-4** — Cada bloco só inicia com o anterior confirmado por read-back
- **HU-T09-5** — Falha interrompe, nomeia a etapa em linguagem de campo e oferece repetir a etapa
- **HU-T09-6** — Queda no meio: retomo do mesmo bloco, de forma idempotente
- **HU-T09-7** — Ao final, read-back consolidado dos parâmetros críticos
- **HU-T09-8** — A versão dos 5 blocos é gravada como string composta após o read-back de cada bloco
- **HU-T09-9** — Nova instalação é transação inteira — abortar mantém na tela de recuperação até Conexão gravar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
