# A lógica do protótipo navegável

## O estado único

Um objeto só guarda tudo o que o app sabe, e **toda tela lê dele**:

```
tecnico      Rafael Vieira · r.vieira
contexto     empresa · garagem · pacote e a idade dele
sessao       nenhuma | { modulo, ativo, aberta às 14:30, etapa }
etapas       o que já foi feito: pré-checagem, a CAN (lida · refeita), cadeia, calibração, ciclo, checklist
fila         os itens esperando envio
tela         onde o app está · momento ou estado aberto
```

**A sessão nasce na pré-checagem aprovada** — é aí que a faixa desce. E morre no encerramento, quando a faixa sobe.

## O começo

O protótipo abre no **login, às 14:30, com o Rafael Vieira**. O usuário vem preenchido; qualquer senha com 8 caracteres ou mais entra. Com menos, aparece o erro.

## O caminho do herói

```
login → garagem Várzea → sincroniza o pacote → menu
→ conectar: acha cinco módulos (o do herói e mais quatro), escolhe o M2C-0417, conecta, a pré-checagem acende as onze linhas → a faixa desce
→ o ônibus RKT-8H42 → os chassis batem → a CAN lida → a cadeia grava e relê os blocos → calibra o hodômetro
→ o ciclo dinâmico: os cinco passos sozinhos, o evento chega → o checklist fecha → ENCERRAR → a faixa sobe → menu sem sessão
```

## As sementes

Pular direto pra uma tela pelo painel monta o estado mínimo que ela precisa pra fazer sentido:

| Tela | Semente |
|---|---|
| T01 · Login | nenhuma sessão · usuário r.vieira preenchido |
| T02 · Selecionar contexto | Viação Atlântico Sul · três garagens · Várzea com pacote de ontem |
| T03 · Sincronizar | garagem Várzea · pacote pac-uo-01 |
| T04 · Menu | sessão M2C-0417 + RKT-8H42 · fila com 2 itens |
| T05 · Conectar módulo | cinco módulos por perto (situacao.porPerto) · M2C-0417 é o do herói · pelo menu, a tela abre na lista sem nada escolhido (01) |
| T06 · Selecionar ativo | sessão M2C-0417 · dez ônibus no pacote |
| T07 · Dados da CAN | sessão M2C-0417 + RKT-8H42 · doze sinais do mock |
| T08 · Refazer leitura da CAN | sessão M2C-0417 + RKT-8H42 · leitura feita |
| T09 · Configurar módulo | sessão M2C-0417 + RKT-8H42 · os blocos do mock |
| T10 · Calibração | sessão M2C-0417 + RKT-8H42 · hodômetro 184.320 no módulo, 482.317 no painel |
| T11 · Conferir configuração | M2C-0438 + ONK-8Q90 · caso diff-divergente |
| T12 · Últimas instalações | garagem Várzea · cinco instalações |
| T13 · Checklist | sessão M2C-0417 + RKT-8H42 · 31 itens |
| T14 · Ciclo dinâmico | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
| T15 · Fila de saída | fila com dois itens · um com erro |
| T16 · Sessão | sessão M2C-0417 + RKT-8H42 homologada |

## As portas naturais

Tocar num módulo ou ônibus da lista que é **caso do mock** abre o estado dele, igual ao que o técnico veria no mundo. Na T05, tocar no M2C-0999 abre o serial não cadastrado; na T06, tocar no KNB-5H39 abre o sem chassi na CAN. A coluna do palco sempre funciona também.

## ENCERRAR

- **depois de homologar:** os passos do encerramento, o corte de alimentação que o técnico faz, e o autoteste
- **antes de homologar:** a sessão abortada — **4 passos, sem confirmação**. Quem tocou no ENCERRAR da faixa já decidiu

## Os contadores do menu (T04·1, T04·2)

- **no cartão Fila de saída:** o que ainda não chegou ao servidor (tudo o que não foi recebido), só da garagem ativa — na Várzea, 2
- **no diálogo Sair da conta:** o que está na fila, de todas as garagens — 3. As duas contas são diferentes, e a diferença está com o diretor (T04·1)
- **no cartão Finalizar com checklist:** só depois que o checklist foi aberto uma vez na sessão; conta os itens das seções B e E, os que o técnico resolve, ainda não resolvidos — 10 na semente — e some ao homologar (T04·2)
- **a troca de garagem com evidência subindo** (T04/08) abre pela coluna do palco: no fluxo, a semente do menu não tem envio em curso, e a folha abre sem o aviso (T04·3)

## A escolha do ativo (T06·1 a T06·5)

- **a lista:** os ônibus do pacote da garagem do contexto, na ordem do mock — na Várzea, os 10, com "10 no pacote" (G9). O conteúdo rola; o KNB-5H39 é o nono
- **a ordem das checagens:** ao tocar num ônibus, a confirmação checa o pacote, depois os pinos, depois o chassi (T06·3). O conflito de pinos vale quando o módulo da faixa, o ônibus e o meio da sessão são os do caso; o chassi lido é o do caso de divergência, e nos outros é o do cadastro (T06·2)
- **o que fica gravado:** `Usar este ativo` põe o ativo na sessão e anota em `etapas.ativo` como o vínculo foi provado — `chassi` ou `confirmacao` do técnico — e a hora, 14:30. `Usar leitor sem fio` passa a sessão a sem fio, e o conflito some (T06·4)
- **os casos não se consomem:** a divergência do chassi e o ônibus de outra garagem são fato do cadastro, e valem toda vez que o ônibus é tocado

## A releitura da CAN (T08·1, T08·2, T08·3)

- **a ordem da grade:** a dos domínios do mock (`dominiosCan`) e, dentro do domínio, o sinal estático antes do dinâmico; no mais, a ordem de `sinaisCan`. No herói, o Motor põe a Temperatura antes da Rotação, como as referências desenham
- **quantos sinais:** a grade monta os sinais do modelo do ativo da sessão. "doze" e "de 12" são `sinaisCan.length`, por extenso no texto: 12 no herói, 8 num ônibus do ma-02
- **o ritmo:** um sinal responde a cada 600ms, na ordem da grade (`movimento.md`, `ritmos.js`). O valor que volta é o `lido` do sinal estático e o `lidoDinamico` do dinâmico. Quando o ônibus tem caso estático no mock, vale o lido do caso que passa, como na T07 (o hodômetro do QJF-2C61, do PCX-9A17 e do KNB-5H39); a falha que o caso trazia dá lugar ao nominal, porque a releitura é leitura nova e o caso vale uma vez por sessão (G21, como o `Ler novamente` da T07). Ao terminar, o caso fica consumido, e a T07 que abre depois mostra a mesma leitura
- **o que fica gravado:** ao terminar, `etapas.can` fica com `lida` e `refeita`. A T07 aberta por `Ver os dados da CAN` já abre lida (G27). A T16 continua sem a assertiva 4, como as referências desenham (T08·3)
- **ENCERRAR no meio da releitura:** a sessão abortada, como em qualquer tela antes de homologar; a releitura para ali

## A URL

Todo lugar do protótipo tem endereço: `?tela=T07` abre a tela · `?tela=T07&estado=01-estado-fora-da-faixa` abre o estado. Um link mandado pra alguém abre exatamente o que se quis mostrar.

## O que é provisório

Pendências que não são de desenho seguem um padrão até o PM decidir — a lista e o padrão de cada uma estão em `08-produto-real/pendencias.md`. Se o padrão mudar, é uma linha.

## Como se chega em cada momento

| Referência | Como se chega |
|---|---|
| `T01/02-momento-recuperar-escolher-canal` | `Esqueci a senha` |
| `T01/03-momento-recuperar-digitar-codigo` | escolher o canal |
| `T01/04-momento-nao-recebi-o-codigo` | `Não recebi o código` |
| `T01/05-momento-codigo-errado` | digitar um código diferente de 482913 |
| `T01/08-momento-recuperar-nova-senha` | o código certo |
| `T01/09-momento-senha-alterada` | a nova senha cumpre os seis requisitos |
| `T02/01-momento-escolhida` | tocar numa garagem |
| `T03/02-momento-concluido` | o download termina |
| `T04/01-momento-sem-modulo` | o menu antes de conectar |
| `T04/02-momento-modulo-sem-ativo` | módulo conectado, ônibus ainda não escolhido |
| `T04/05-momento-folha-conta` | tocar nas iniciais |
| `T04/06-momento-folha-conta-sair-com-sessao-aberta` | `Sair da conta` com sessão ou fila |
| `T04/07-momento-folha-trocar-de-garagem` | tocar no nome da garagem |
| `T05/01-momento-nenhum-escolhido` | a busca achou, nada tocado ainda |
| `T05/02-momento-um-encontrado` | só um módulo por perto |
| `T05/05-momento-pre-checagem` | conectado |
| `T05/10-momento-atualizando-o-firmware` | `Atualizar firmware` |
| `T06/01-momento-confirmar-o-veiculo` | tocar num ônibus |
| `T08/01-momento-relendo` | `Refazer a leitura` |
| `T08/02-momento-concluida` | a releitura termina |
| `T09/04-momento-cadeia-concluida` | o último bloco relido |
| `T10/01-momento-hodometro-semeado` | `Semear o hodômetro` |
| `T11/02-momento-tudo-confere` | nada diverge |
| `T12/01-momento-detalhe-da-instalacao` | tocar numa instalação |
| `T13/01-momento-a-identificacao-aberta` | tocar na seção |
| `T13/02-momento-b-montagem-aberta` | tocar na seção |
| `T13/03-momento-c-hardware-aberta` | tocar na seção |
| `T13/04-momento-d-configuracao-aberta` | tocar na seção |
| `T13/05-momento-e-teste-dinamico-aberta` | tocar na seção |
| `T13/06-momento-f-servidor-aberta` | tocar na seção |
| `T13/07-momento-responder-item` | tocar num item manual |
| `T13/08-momento-nao-conforme-com-justificativa` | marcar não conforme |
| `T13/11-momento-homologado` | tudo passa |
| `T14/01-momento-antes-do-disparo` | a fila do módulo ainda drenando |
| `T14/05-momento-ciclo-concluido` | os cinco passos e o evento |
| `T16/01-momento-pede-o-corte-de-alimentacao` | o passo do corte |
| `T16/02-momento-sessao-encerrada` | o autoteste passa |
| `T16/03-momento-encerrando-sem-homologar` | ENCERRAR antes de homologar |
| `T16/04-momento-encerrada-sem-homologar` | os 4 passos terminam |

## O que causa cada estado

**Todo estado abre pela coluna do palco**, montado pelo caso do mock. Os que têm porta natural abrem também tocando.

| Referência | O que causa | Caso do mock |
|---|---|---|
| `T01/01-estado-usuario-ou-senha-incorretos` | Entrar com senha de menos de 8 caracteres | `credenciais` |
| `T01/06-estado-codigo-expirado` | o código passa de 10 minutos | `recuperacao.limites.validadeMin` |
| `T01/07-estado-tentativas-esgotadas` | o terceiro código errado | `recuperacao.limites.tentativas` |
| `T02/02-estado-lista-longa-com-busca` | a empresa tem garagens demais pra uma tela | derivado do fluxo |
| `T03/01-estado-falha-de-rede` | a rede cai no meio do download | `sync-falha-rede` |
| `T03/03-estado-pacote-de-4-dias` | o pacote tem entre 3 e 7 dias | `pacotes · pac-uo-02` |
| `T03/04-estado-pacote-vencido` | o pacote passou de 7 dias | `pacotes · pac-uo-03` |
| `T04/03-estado-faixa-modulo-com-falha` | o módulo da sessão perde o link | `link-perdido` |
| `T04/04-estado-checklist-pendente` | o checklist tem itens abertos | `checklist` |
| `T04/08-estado-folha-trocar-de-garagem-envio-em-andamento` | trocar com evidência subindo | `filaSaida` |
| `T04/09-estado-folha-trocar-de-garagem-com-modulo-conectado` | trocar com a sessão aberta | derivado do fluxo |
| `T05/03-estado-nenhum-encontrado` | nenhum módulo responde | `busca-vazia` |
| `T05/04-estado-conexao-falhou` | o módulo não responde ao conectar | `conexao-falha` |
| `T05/06-estado-pre-checagem-serial-nao-cadastrado` | o serial não está no cadastro | `serial-nao-cadastrado` |
| `T05/07-estado-pre-checagem-modelo-sem-driver` | o modelo não tem driver | `modelo-sem-driver` |
| `T05/08-estado-pre-checagem-firmware-fora-da-matriz` | o firmware não é homologado | `firmware-fora-matriz` |
| `T05/09-estado-firmware-fora-sem-rede-no-modulo` | firmware fora e o módulo sem rede | `firmware-fora-matriz + modem sem rede` |
| `T05/11-estado-pre-checagem-conteudo-nao-cabe` | a configuração não cabe no módulo | `conteudo-nao-cabe` |
| `T05/12-estado-pre-checagem-pool-de-cercas-esgotado` | as cercas passam do limite | `pool-esgotado` |
| `T05/13-estado-pre-checagem-canal-aberto-e-pendencias` | o módulo tem canal de sessão anterior — o app fecha antes de começar | `canal-aberto` |
| `T05/14-estado-pre-checagem-link-perdido-na-6a` | o link cai na sexta checagem | `link-perdido` |
| `T05/15-estado-pre-checagem-modulo-em-repouso-na-9a` | o módulo dorme na nona checagem — não é erro | `modulo-em-repouso` |
| `T06/02-estado-chassi-divergente` | o chassi lido não bate | `divergencia-chassi` |
| `T06/03-estado-sem-chassi-na-can` | o modelo não manda chassi | `modelosAtivo · ma-02 · chassiPelaCan: false` |
| `T06/04-estado-fora-do-pacote` | o ônibus não está no pacote | `ativo-fora-pacote` |
| `T06/05-estado-conflito-de-pinos-resolvivel` | pinos ocupados, com saída | `conflito-pinos-resolvivel` |
| `T06/06-estado-conflito-de-pinos-sem-saida` | pinos ocupados, sem saída | `conflito-pinos-sem-saida` |
| `T07/01-estado-fora-da-faixa` | um sinal fora do esperado | `can-estatico-isolado` |
| `T07/02-estado-sem-leitura` | um sinal não chega | `can-estatico-ausente` |
| `T07/03-estado-dominio-mudo` | um domínio inteiro calado | `can-estatico-dominio` |
| `T09/01-estado-bloco-recusado` | o módulo recusa um bloco | `bloco-recusado` |
| `T09/02-estado-queda-na-cadeia` | o link cai no meio da cadeia | `queda-na-cadeia` |
| `T09/03-estado-recuperacao-ate-a-conexao-gravar` | tentar sair antes da Conexão gravar | derivado do fluxo |
| `T10/02-estado-rotacao-caminhao-coletor` | o modelo calibra rotação e velocidade | `calibracao.porModelo · ma-02 · KNB-5H39` |
| `T10/03-estado-ja-semeado` | o hodômetro já foi semeado antes | `calibracao` |
| `T10/04-estado-modulo-sem-pulsos` | o módulo não recebe pulsos | `grandeza-indisponivel` |
| `T11/01-estado-conteudo-que-o-app-nao-reconhece` | índice que o app não classifica | `indice-nao-classificado` |
| `T12/02-estado-nenhuma-instalacao` | a garagem não tem instalações | `instalacoes` |
| `T12/03-estado-sem-rede` | a consulta sem rede | `instalacoes-sem-rede` |
| `T13/09-estado-item-reprovado` | um item automático reprova | `can-fora-esperado` |
| `T13/10-estado-finalizar-com-a-secao-f-falhando` | `Finalizar` com a Seção F falhando | `secaoF` |
| `T14/02-estado-prazo-estourado` | o evento não chega em 2:00 | `evento-sem-resposta` |
| `T14/03-estado-dinamico-fora-do-esperado` | um sinal andando fora do esperado | `can-fora-esperado` |
| `T14/04-estado-identificador-divergente` | o cartão lido não bate | `identificador-divergente` |
| `T15/01-estado-sem-erro` | a fila sem erros | `filaSaida` |
| `T15/02-estado-dois-erros` | dois itens recusados | `filaSaida` |
| `T15/03-estado-fila-vazia` | nada esperando envio | `filaSaida` |
| `T15/04-estado-secao-f-em-re-checagem` | a Seção F esperando o servidor | `secaoF · RVM-1E54` |
| `T16/05-estado-assertiva-falhando` | uma assertiva falha | `autoteste-falhando` |
| `T16/06-estado-sessao-interrompida` | a sessão caiu e volta oferecida | `sessao-interrompida` |
