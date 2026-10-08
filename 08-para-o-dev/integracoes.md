# As integrações

O protótipo simula as respostas; o produto conecta as mesmas telas às operações reais. Este mapa foi conferido em 08/10/2026 contra as fichas vigentes, o [mock](../04-dados/mocks.js) e o [código das telas](../06-prototipo/app/src/telas/). Os tempos fixos de [ritmos.js](../06-prototipo/app/src/estado/ritmos.js) são cadências de demonstração, não limites automáticos da integração.

## O módulo, sem fio

| No protótipo | No produto |
|---|---|
| a lista nominal tem cinco módulos, do `situacao.porPerto`; um módulo fora do cadastro anuncia suas informações por `naBuscaForaCadastro` | busca sem fio; o anúncio vem do módulo, e a T07 confere o cadastro e o suporte depois |
| `Procurar de novo` mostra a busca por 1,2 s e devolve a lista simulada | a busca usa o tempo real do rádio e pode encontrar outros módulos |
| `conexao-falha` monta o módulo que não respondeu | tratar a falha real e apresentar a causa e as verificações da T05 |
| Bluetooth desligado e permissão negada são casos | consultar o Android, solicitar a permissão e oferecer `Abrir as configurações` quando não puder pedir de novo |
| `pareando` e `reconectando` são consultas paradas | parear na primeira conexão com VL06; VL08 não precisa. Reconexão por inatividade é espera neutra, conforme a [T05](../02-telas/T05-conectar-modulo/tela.md) |

**Nenhuma tela oferece conexão por cabo.** O mock ainda guarda metadados antigos de meio de conexão, mas eles não habilitam uma opção de cabo no produto. “Cabo e conector”, no que conferir, refere-se à alimentação do equipamento. A ligação com CAN acontece através do módulo, não por uma alternativa de conexão oferecida ao técnico.

## O diagnóstico e a CAN

| No protótipo | No produto |
|---|---|
| a leitura percorre nove linhas do módulo, uma a cada 600 ms; oito contam, e mensagens pendentes só informam | ler serial, firmware, alimentação, GPS, entradas, modem, SIM e número do chip; informar as mensagens guardadas sem criar trava |
| serial, modelo e firmware travam pelos casos e pelo cadastro | conferir o serial, o driver e a lista de firmware da variante contra cadastro e matriz de capacidades |
| atualização e releitura usam esperas fixas | atualizar e reler com a resposta real do módulo; se ele estiver sem rede, gravar a conexão isoladamente antes da atualização |
| a CAN usa dados determinísticos do modelo e aparece depois que o bloco Ativo foi conferido | usar a tradução da CAN do ativo e suas leituras reais; número novo troca no lugar, sem transição |
| `Reler o módulo` no item reprovado usa a sequência `releituras` do caso | ler alimentação, antena GPS, entradas e modem novamente; atualizar a Seção C com o que voltou e conservar em falha o que não passou |

O GPS é aprovado pelo estado da **antena** (conectada, em curto ou desconectada); satélites são informação. A alimentação é a tensão lida no fio do equipamento, contra a faixa do módulo — a faixa VL06 de 9,0 a 32,0 V ainda é exemplo autorizado para conferir na bancada. No mock atual, a releitura de alimentação vai de **8,8 V** para **24,3 V**; a de GPS conserva a antena desconectada e depois a conecta. [T07](../02-telas/T07-diagnostico-do-modulo/tela.md), [T13](../02-telas/T13-checklist/tela.md).

## A gravação no módulo

| No protótipo | No produto |
|---|---|
| a cadeia grava e relê um bloco por segundo: Limpeza, Ativo, Cercas, Leitor, Eventos e Conexão | gravar na ordem especificada e conferir o read-back de cada bloco |
| recusa e queda de conexão vêm dos casos | mostrar o bloco onde parou e executar a política de retomada aprovada; a política de falha continua em [pendências](o-que-o-produto-ainda-decide.md) |
| contadores vêm de `conteudoRegistros` e `capacidadeRegistros`; cercas, do total de pontos e `pontosCercaMax` | conferir as duas capacidades reais do módulo antes de começar; regiões organizam as cercas, não substituem o limite de pontos |
| depois da Conexão, a T09 simula a prova de comunicação com o servidor | obter do módulo a confirmação de que falou com o servidor, distinta do recebimento posterior do evento de teste |

Instalação nova grava a cadeia; manutenção permite escolher um bloco, com limpeza limitada ao escopo dele. A [T11](../02-telas/T11-conferir-configuracao/tela.md) compara o conteúdo lido com o cadastro e oferece a correção por bloco. As consultas paradas do palco não mudam essas regras do produto.

## A calibração e o ciclo de testes

| No protótipo | No produto |
|---|---|
| o ônibus do caminho normal mostra `Nada a calibrar neste ativo` | respeitar `calibracao.porModelo`: hodômetro que já vem da CAN não é digitado nem semeado |
| o caminhão é exemplo de calibração; gravação e releitura têm 1 s cada | aplicar as grandezas do modelo: hodômetro e rotação obrigatórios nesse exemplo; velocidade com tacógrafo digital e horímetro opcionais, fora da contagem dos obrigatórios |
| o técnico digita o painel; a calibração não abre câmera | gravar e reler o valor/fator correspondente; a foto do Painel é evidência da Seção B quando houve calibração |
| a fila do módulo drena em 3 s antes de habilitar o disparo | esperar a drenagem real antes do evento de teste |
| a T14 do herói tem ignição ligada, rotação, cartão e ignição desligada; o cartão exige resposta do técnico | comprovar os passos aplicáveis com o veículo parado; **ré e porta não fazem parte do ciclo** |
| o módulo simula o número lido do cartão, e o técnico toca `Confere com o cartão` ou `Não confere` | exibir o número efetivamente lido; o técnico compara com o número impresso. `Não confere` gera não conformidade e justificativa na T13, sem pedido de correção de cadastro |
| a T13 simula o pulso de 1 s e espera `Ouvi` ou `Não ouvi` | acionar o buzzer e registrar a resposta; o bip é item da Seção E, separado dos passos da T14 |
| o prazo é 2:00; no exemplo, o evento chega aos 24 s e os campos conferem aos 33 s, com o relógio acelerado 4× | respeitar o prazo especificado e usar recebimento/conferência reais; 24 s e 33 s são resultados do exemplo |

Os quatro passos do herói não são uma quantidade fixa para todo ativo: rotação e cartão dependem das capacidades; sem leitor, o exemplo tem três passos. A velocidade fica como opcional da T10 na revisão final do PM. [T10](../02-telas/T10-calibracao/tela.md), [T14](../02-telas/T14-ciclo-dinamico/tela.md), [T13](../02-telas/T13-checklist/tela.md).

## O servidor, a fila e a evidência

| No protótipo | No produto |
|---|---|
| o histórico da T12 lê `instalacoes[].recebimento` | consultar recebimento de posicionamento e eventos; a viagem saiu dos critérios |
| pendência diz que confere novamente por 24 h, mas não há consulta real | conferir novamente durante a janela definida, sem reprovar a instalação apenas por falta de rede |
| fila é o mock mais os registros criados em memória nesta navegação | persistir os envios e enviá-los fora da tela; sem rede, aguardar. A fila é do aparelho e continua quando outra conta entra |
| câmera devolve a imagem de exemplo | usar a câmera do aparelho e guardar a evidência e seus metadados |
| respostas, fotos e etapas existem no estado da sessão até recarregar | guardar evidências e progresso de forma durável, com envio posterior quando houver rede |
| `Apenas registrar o diagnóstico` da T11 guarda `etapas.conferencia` e volta ao menu | integrar o envio do diagnóstico; `tiposFila` já declara `Diagnóstico`, mas a ação ainda não o enfileira no protótipo |

O checklist termina como **registrado, aguardando autoteste**. A homologação ocorre na **T16**, depois do reinício e das sete assertivas, apresentadas em aprovadas, não se aplicam e pendentes. No herói, são 28 itens de checklist; o total depende das condições do catálogo, não do total de itens do pacote. [Contrato](contrato-de-dados.md).

## O acesso

| No protótipo | No produto |
|---|---|
| qualquer usuário entra com senha de 8 caracteres ou mais após 1,2 s | autenticar no servidor; definir tempo limite e a resposta à falta de retorno |
| após salvar a recuperação, Entrar com a senha nova devolve o login com `M.credenciais.senha` preenchida e escondida, sem guardar a nova senha | autenticar com a senha alterada real; o preenchimento do mock é conveniência de demonstração autorizada em 08/10 |
| código, validade, tentativas e teto são determinísticos do mock | enviar por SMS/e-mail e conferir validade e limites no servidor |
| recuperação recebe o dado digitado e sempre responde `Se houver conta com este dado, o código foi enviado.` | manter a mesma resposta exista a conta ou não, sem revelar contato cadastrado |
| o pacote tem a idade e o conteúdo do mock | baixar a versão da unidade e vinculá-la à evidência da sessão |

## O que a implementação ainda precisa definir

- Transporte, comandos e respostas do módulo sem fio e das leituras da CAN.
- Armazenamento sem rede, retomada depois de reinício do app e envio sem duplicação.
- Integrações com câmera, localização, notificação local e leitor de tela.
- Política de timeout, tentativas e descarte, conforme as [perguntas abertas](o-que-o-produto-ainda-decide.md).
- Validação em aparelhos menores: o conteúdo rola e o rodapé fica; conferir também a navegação de três botões.
- Suporte à fonte aumentada do Android, ainda pendente.
