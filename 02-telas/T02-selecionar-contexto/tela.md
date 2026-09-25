# T02 · Selecionar contexto

Dizer em que garagem o técnico está hoje — o pacote de dados que o app vai usar.

| | |
|---|---|
| **Elemento-assinatura** | a linha escolhida com o marcador lima e o pacote de cada garagem dizendo a idade dele |
| **Chrome** | sem faixa |
| **Semente no protótipo** | Viação Atlântico Sul · três garagens · Várzea com pacote de ontem |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 1 — ver `estados.md` |

## O que se toca

- tocar numa garagem → ela fica escolhida
- `Sincronizar Garagem X` → T03
- com **mais de 6 garagens**, o campo de busca aparece em cima e filtra por nome ou cidade · a lista rola por baixo do rodapé, que fica parado
- a linha de garagem diz a idade do pacote — *pacote de hoje*, *de ontem*, *de 4 dias* —, e vencida diz só a causa: *pacote vencido há 8 dias* · a ação de sincronizar mora na T03
- o voltar do sistema (no computador, o Esc) não faz nada: a tela não tem saída desenhada, e o `Sincronizar` é o ato, não a saída (`06-prototipo/logica.md` · O voltar do Android; a pergunta está em `08-produto-real/pendencias.md`)

No protótipo (entrega do design de 24/09): o 6 é o `limiteSemBusca` do caso `lista-longa-garagens`, e a busca aparece em qualquer mundo com mais garagens que ele — o do herói, com 3, não a tem; o estado 02 é o mundo do caso, com 9. A busca olha o nome da garagem e o campo `cidade` do caso, sem acento e sem caixa; o nome da região saiu da busca (muda o T02·7), e o vazio continua sem frase. A frase da idade sai de `idadeNaLinhaDaGaragem`, em `app/src/dados/formato.js` (muda o T02·6); a garagem que só o caso tem lê o limiar de 7 que os pacotes do mock declaram.

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema sem sessão
- uma ação
- escolha numa lista
- seção aberta do checklist
- seção recolhida
- linha do histórico
- a lista de garagens
- campo de busca
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

- primário · normal
- primário · pressionado
- primário · desabilitado
- linha tocável · normal e pressionada
- barra do sistema sem sessão
- uma ação
- escolha numa lista
- os glifos de estado
- os poços
- os marcadores
- campo de busca

Corrigida no C4 pelo medido (G10, T02-A3): saíram as 6 peças que nenhuma das três desenha (linha do histórico, a lista de garagens, segmentado, a marca no login, campo e campo focado) e entraram as que a tela usa e faltavam: o primário nos três estados, a linha tocável, os glifos, os poços e os marcadores. A lista das garagens daqui é a escolha numa lista, não a lista de garagens da folha (T02-A4). O que só a T02 desenha virou variante nomeada (G11): a linha de escolha escolhível, em que a garagem vencida também se escolhe, e a busca com a dica em texto.

## Histórias de usuário

- **HU-T02-1** — Vejo empresas/UC/UO que tenho permissão, com busca quando a lista for longa
- **HU-T02-2** — Troco de contexto a qualquer momento pelo cabeçalho; o contexto ativo fica sempre visível
- **HU-T02-3** — Trocar com módulo conectado avisa que a sessão de configuração encerra, e pede confirmação
- **HU-T02-4** — Trocar com envio em andamento é bloqueado até concluir ou abortar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
