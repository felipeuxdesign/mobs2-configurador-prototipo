# O plano de ciclos

Cada ciclo é **um contrato**: o que entra, o que não entra, e como se prova que ficou pronto. **Todo ciclo começa com o gate e só constrói depois do vai.**

## O gate de cada ciclo

Antes de construir, você devolve:

1. **o censo** — o que existe hoje, medido: arquivos, componentes, telas, casos
2. **os achados** — o que contradiz a premissa do ciclo, com a prova
3. **as divergências** — o que você encontrou além do pedido
4. **as decisões numeradas, com o padrão que você adota** — *G3: (a) ou (b); vou de (a) porque…*
5. **o que não faz sentido** — com o motivo

E espera o *vai*.

## Os ciclos

### C0 · Estudo

- **entra:** ler a pasta inteira, abrir as 105 referências e devolver o gate de entendimento
- **não entra:** nenhum código
- **está pronto quando:** o documento do gate: o produto em suas palavras, o censo das telas, peças e casos, os achados, as dúvidas numeradas com padrão, e o plano dos ciclos revisado

### C1 · Fundação

- **entra:** o projeto Vite, os tokens, a fonte, os ícones, o estado único vazio e o celular de 360 × 800
- **não entra:** nenhuma tela
- **está pronto quando:** `npm run dev` abre o celular vazio no tamanho certo · tokens carregados · gate do mock aprovando

### C2 · Design system

- **entra:** as 114 peças como componentes, numa página de vitrine só pra conferir
- **não entra:** nenhuma tela montada
- **está pronto quando:** cada peça fotografada e comparada com a folha dela

### C3 · O palco

- **entra:** o quadrado, o painel em duas partes, a coluna, os dois jeitos do celular, a URL e o recomeçar
- **não entra:** as telas são vazias com o nome
- **está pronto quando:** navegar por URL, abrir e fechar o painel, abrir um estado vazio, recomeçar

### C4 · Entrar

- **entra:** T01 a T03, com a recuperação de acesso inteira
- **não entra:** o resto do app
- **está pronto quando:** as referências da T01, T02 e T03 comparadas

### C5 · O menu e as folhas

- **entra:** T04, as folhas e o diálogo de sair
- **não entra:** as ferramentas por dentro
- **está pronto quando:** as referências da T04 comparadas

### C6 · Conectar

- **entra:** T05 com a busca, a conexão, a pré-checagem acendendo e a faixa descendo
- **não entra:** os estados da pré-checagem
- **está pronto quando:** o caminho feliz da T05 animado, e a faixa nascendo

### C7 · O ônibus e a CAN

- **entra:** T06, T07 e T08, com o tambor
- **não entra:** estados
- **está pronto quando:** as telas-base e os momentos comparados

### C8 · Configurar e calibrar

- **entra:** T09 com a cadeia e a T10 com o tambor rolando
- **não entra:** estados
- **está pronto quando:** a cadeia no ritmo de 1s por bloco · o tambor de 184.320 a 482.317

### C9 · O ciclo e o checklist

- **entra:** T14 com os passos sozinhos e o prazo, e a T13 com o placar
- **não entra:** estados
- **está pronto quando:** o ciclo inteiro e o checklist fechando em homologado

### C10 · Encerrar e consultar

- **entra:** T16 com os dois encerramentos, e T15, T11 e T12
- **não entra:** estados
- **está pronto quando:** o caminho do herói inteiro, do login ao menu sem sessão

### C11 · Todos os estados

- **entra:** os 50 estados pela coluna, cada um montado pelo caso do mock, e as portas naturais
- **não entra:** nada novo de desenho
- **está pronto quando:** os 50 comparados com o PNG

### C12 · Movimento fino

- **entra:** cada linha de todos os `animacao.md`, e o reduzir movimento
- **não entra:** nada novo
- **está pronto quando:** cada movimento conferido contra a tabela da tela

### C13 · Auditoria de fidelidade

- **entra:** as 105 referências fotografadas e comparadas, com o relatório de diferenças
- **não entra:** correção fora do relatório
- **está pronto quando:** zero diferença sem desvio nomeado

### C14 · No ar

- **entra:** o build de produção, a prévia local e a publicação na Vercel
- **não entra:** mudança de desenho
- **está pronto quando:** o link público abrindo no computador e no celular, com a etiqueta da versão

## Ao fim de cada ciclo

- os prints das telas do ciclo, lado a lado com o PNG da referência
- o `CHANGELOG.md` com o que entrou e cada desvio nomeado
- o gate do mock aprovando
- um commit — **todo ciclo tem caminho de volta**
