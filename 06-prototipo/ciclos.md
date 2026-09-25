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

Revisado no C0 (`gate-C0.md`, parte 8): cada tela entra **com os seus estados**, o mock cresce com a tela que o lê, o C1 cria o repositório e a ferramenta de print, o C2 constrói as peças que as folhas desenham (não as linhas da tabela), e a T05 ocupa dois ciclos. Continuam 15 ciclos.

### C0 · Estudo
- **entra:** ler a pasta inteira, abrir as 133 referências e devolver o gate de entendimento
- **está pronto quando:** `gate-C0.md`, com as oito partes

### C1 · Fundação
- **entra:** o repositório git, o projeto Vite, os tokens (`tokens.css` como norma, o JSON gerado dele), a fonte de `05-recursos`, os ícones, a ponte do mock, o estado único vazio com a forma completa, o celular de 360 × 800, a ferramenta de print (`?print=1`) e o `npm run checar`
- **não entra:** nenhuma tela, nenhuma peça
- **está pronto quando:** `npm run dev` abre o celular vazio · o print sai em 720 × 1600 · `npm run checar` aprova

### C2 · Design system
- **entra:** os 8 primitivos (tipografia, poço, glifo, ícone, marcador, primário, só-ícone, superfície tocável) e as 7 famílias de peças, numa vitrine; o `componentes.md` e as listas de peças das telas corrigidos pelo medido
- **não entra:** nenhuma tela montada
- **está pronto quando:** cada espécime fotografado e comparado com a folha dele

### C3 · O palco
- **entra:** o quadrado, o painel em duas partes, a coluna com os 50 estados, os dois jeitos do celular, a URL de tela, estado e momento, o modo estreito, a etiqueta e o Recomeçar; as sementes e as receitas, com teste
- **não entra:** as telas são vazias com o nome
- **está pronto quando:** os 16 lugares, os 50 estados e os 54 momentos abrem pela URL

### C4 · Entrar — T01, T02 e T03 com os 7 estados · 18 referências comparadas
### C5 · O menu e as folhas — T04 com as folhas, os dois diálogos e os 4 estados · 10 referências
### C6 · Conectar: a busca e o caminho feliz — T05 00, 01, 02, 05 e 10, a faixa nascendo · 5 referências
### C7 · Conectar: os estados — os 11 estados da T05 e as portas naturais dela · 11 referências
### C8 · O ônibus e a CAN — T06, T07 e T08 com os 8 estados, o tambor na T07 · 14 referências
### C9 · Configurar e calibrar — T09 e T10 com os 6 estados, a cadeia e o tambor · 10 referências
### C10 · O ciclo e o checklist — T14 e T13 com os 5 estados · 18 referências
### C11 · Encerrar e consultar — T16, T15, T11 e T12 com os 9 estados · 19 referências · o caminho do herói inteiro

Em cada ciclo de tela entram também os acréscimos do mock que as telas dele leem (gate C0, anexo A), com o gate do mock crescendo junto.

### C12 · Movimento fino
- **entra:** cada linha de todos os `animacao.md`, com as contradições decididas, e o reduzir movimento
- **está pronto quando:** cada movimento conferido contra a regra

### C13 · Auditoria de fidelidade
- **entra:** as 133 referências, as 8 folhas e os 5 quadros fotografados, com o relatório de diferenças
- **está pronto quando:** zero diferença sem desvio nomeado

### C14 · No ar
- **entra:** o build de produção, a prévia local e a publicação na Vercel — **com o ok do diretor**, porque é publicação
- **está pronto quando:** o link público abrindo no computador e no celular, com a etiqueta da versão

## Ao fim de cada ciclo

- os prints das telas do ciclo, lado a lado com o PNG da referência
- o `CHANGELOG.md` com o que entrou e cada desvio nomeado
- o gate do mock aprovando
- um commit — **todo ciclo tem caminho de volta**
