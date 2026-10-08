# O que o produto ainda decide

Conferido em **08/10/2026** contra as fichas de [02-telas](../02-telas/), o [mock](../04-dados/mocks.js) e a implementação do [protótipo](../06-prototipo/app/src/telas/). Esta página separa perguntas de produto, decisões já aprovadas e limites da demonstração. O comportamento simulado ao lado de uma pergunta não fecha a decisão do produto.

As notas de pacotes anteriores explicam a construção; as regras vigentes nas fichas e o retorno do PM de 06/10 as substituem. Resolver uma pergunta pode exigir dados, integração, comportamento e documentação: não é necessariamente trocar uma linha ou uma tela.

## Já definido

| Onde | Regra vigente | Fonte |
|---|---|---|
| T05 · T06 · T09 | A configuração é só sem fio. Não há opção de conexão por cabo; conflito de pinos é erro de projeto de instalação, bloqueia e deve ser escalonado. Trocar o leitor em campo não resolve a trava. | [Integrações](integracoes.md#o-módulo-sem-fio), [T06](../02-telas/T06-selecionar-ativo/tela.md) |
| T01 | Celular e e-mail do cadastro não aparecem antes do login, nem mascarados. O técnico informa o dado e o servidor confere. `Usar outro dado` volta à primeira etapa; o novo envio respeita a espera de 60 s e a contagem de reenvios. | [T01](../02-telas/T01-login/tela.md), [histórias de T01](../01-produto/historias.md) |
| T07 · T13 | O GPS confere pelo estado da antena: conectada, em curto ou desconectada. Satélites só informam; não há mínimo de satélites que aprove o item. | [T07](../02-telas/T07-diagnostico-do-modulo/tela.md), [T13](../02-telas/T13-checklist/tela.md) |
| T13 · T14 · T15 | O técnico confere o código lido com o número impresso no cartão. O app não compara com cadastro de cartões e não oferece pedido de correção de cadastro. `Não confere` vira não conforme, com justificativa no checklist. | [T14](../02-telas/T14-ciclo-dinamico/tela.md), [T13](../02-telas/T13-checklist/tela.md) |
| T13 · T14 | O ciclo tem até quatro passos aplicáveis: ignição ligada, rotação, cartão e ignição desligada. Ré, porta e velocidade saíram do ciclo; o bip do leitor é testado e respondido na T13. | [T14](../02-telas/T14-ciclo-dinamico/tela.md), [histórias de T14](../01-produto/historias.md) |
| T14 | No concluído, `Ir para o checklist` é a ação principal e `Voltar ao menu` é a secundária. Os botões preservam os resultados; nenhum homologa ou encerra a sessão. Mantidos na revisão de 08/10. | [T14](../02-telas/T14-ciclo-dinamico/tela.md), [fluxos](../01-produto/fluxos.md) |
| T13 · T16 | A T13 registra o checklist e aguarda autoteste. A T16 homologa depois do reinício automático e da releitura sem falha. O evento do cartão pode ficar pendente por até 24 h sem impedir a homologação. | [T13](../02-telas/T13-checklist/tela.md), [T16](../02-telas/T16-sessao/tela.md) |
| T02 | Nas unidades de quem tem mais de uma empresa, o voltar do sistema faz o mesmo que `Trocar de empresa`; na lista de empresas, não escolhe uma saída. Resposta do arquiteto de 26/09. | [T02](../02-telas/T02-selecionar-contexto/tela.md) |

## As perguntas abertas

| Onde | A pergunta | Comportamento ou exemplo atual do protótipo |
|---|---|---|
| T09 | `Tentar de novo` regrava a cadeia inteira ou do bloco recusado para a frente? | Retoma do bloco recusado. A política real de falha e retomada precisa ser aprovada. |
| T14 | Quantas vezes pode disparar o evento antes de a Seção F reprovar de vez? | Permite disparar outro evento sem limite; a segunda falha também tem a referência parada `09`. |
| T14 | Qual orientação e ação devem existir depois de o evento falhar novamente? | A referência `09` orienta conferir a conexão do módulo. O quadro não define um limite de tentativas para o produto. |
| T14 | Os passos de uma visita valem para outra? Por quanto tempo? | Resultados do mesmo par ativo/módulo são preservados em memória, sem prazo. Não é uma política de validade entre visitas reais. |
| T13 | Como trocar uma foto ruim de um item já respondido? | Foto tirada fica como registro, sem opção de substituir. |
| T13 | O voltar do Android numa seção aberta fecha a seção ou sai da tela? | Faz o `Voltar ao menu` desenhado. |
| T07 · T13 | Ler a CAN de novo pode reprovar um item do checklist que estava conforme? | A releitura simulada não cria uma nova reprovação. Falta definir o efeito de uma leitura real que volte diferente. |
| T12 | A falha reconhecida tem ação ou é só registro? | Só registro. |
| T11 | Como o diagnóstico registrado chega à plataforma, e quais são as confirmações, falhas e regras de reenvio? | `Apenas registrar o diagnóstico` guarda o resultado em `etapas.conferencia` e volta ao menu. `tiposFila` já declara `Diagnóstico`; o protótipo não cria um item desse tipo nem envia o registro. |
| T16 | De que ponto a sessão interrompida retoma, e como esse ponto é persistido no aparelho? | O exemplo `sessao-interrompida` guarda os blocos confirmados e reabre a T09 no bloco seguinte, o Leitor. Não há armazenamento durável. |
| T16 | O voltar do Android na sessão interrompida faz o quê? | Nada: não escolhe entre `Retomar` e `Descartar` no lugar do técnico. |
| T16 | Onde fica registrado o `Descartar` da sessão interrompida, exigido pela HU-T16-7? | Volta ao menu sem sessão; não cria registro de descarte nem item de fila. |
| T01 · T04 | O voltar do Android no login e no menu fecha o app, como na primeira tela do Android? | Nada: essas telas não oferecem saída desenhada, e o protótipo não inventa uma. A regra da T02 já está respondida acima. |
| T05 | O voltar do Android na busca, quando o rodapé só oferece `Procurar de novo`, faz o quê? | Nada: o link não sai da tela. |
| todas | O app respeita a fonte aumentada do Android? | Os tamanhos são fixos na demonstração; o comportamento acessível no aparelho precisa ser validado. |
| T01 | Qual é o tempo limite do login real, e o que a tela diz quando ele estoura? | Com rede, espera 1,2 s. Senha com menos de oito caracteres gera erro; a simulação aceita a que atinge o mínimo do mock. Sem rede, mostra o aviso sem essa espera. Não há servidor nem tempo limite real. |
| T05 | Quanto tempo a conexão real espera o módulo responder antes de `não respondeu`? | O pacote 7 descreveu 15 s; o protótipo simula 1,2 s. Confirmar o limite da integração. |
| T01 | Qual é o texto definitivo da mensagem única para código errado ou vencido? | O PM pediu a mesma mensagem. O exemplo adotado é `Código inválido ou vencido`; não inventar outra mensagem na implementação. |
| T01 | As pistas de tempo devem continuar ao redor da mensagem única? | O errado mostra o prazo restante; o vencido mostra 0:00. Se a intenção for não distinguir as situações, essa apresentação precisa de decisão do PM. |
| T15 | Depois de quanto tempo a fila parada vira notificação local? | O exemplo usa 30 min; o aviso sobre o menu é a referência T04/16. O protótipo não implementa uma notificação do Android. |
| T06 | A frase `Pertence a {unidade}.` deve receber o artigo da unidade, como `à Garagem` e `ao Pátio`? | Mantém o texto aprovado com o nome da unidade do mock, sem ajustar a gramática por conta própria. |
| T13 | Qual é o critério real de cada entrada digital? | O exemplo da ignição espera a chave ligada, como nas referências `23` e `24`. Validar as demais entradas com o equipamento. |
| T13 | Quais causas devem aparecer em `O que conferir` para cada falha da Seção C? | As causas aprovadas estão no [textos.md da T13](../02-telas/T13-checklist/textos.md). Alimentação confere o fio do equipamento; GPS confere a antena. Validar causas e ações reais sem trocar os textos por conta própria. |
| T07 · T13 | Qual é a faixa de tensão do VL06 comprovada na bancada? | 9,0 a 32,0 V é exemplo autorizado pelo PM, ainda sujeito à confirmação no equipamento. |
| T13 | Quanto dura o pulso real do bip? | Cerca de 1 segundo é exemplo até a bancada. |
| T15 | Quais causas reais de recusa do servidor exigem cada ação? | O exemplo `o pacote de sincronização venceu` é a recusa que `Ressincronizar e reenviar` resolve. O PM pediu combinar a regra com o produto. |
| T11 | Que conteúdo de negócio deve identificar a rede do módulo na conferência? | Os exemplos aprovados são `uma rede antiga` e `a rede da Mobs2`; o PM pediu substituir os endereços. O significado real desses valores precisa do cadastro e da integração. |

## Limitações e simulações do protótipo

- **Diagnóstico da T11:** o tipo `Diagnóstico` existe no [mock](../04-dados/mocks.js), mas [registrar](../06-prototipo/app/src/telas/T11/index.jsx) só altera `etapas.conferencia`. Não há item na fila, upload nem confirmação do servidor. A ausência de envio não se explica pela ausência do tipo.
- **Ciclo aberto ou fechado:** a [T14](../06-prototipo/app/src/telas/T14/index.jsx) grava `fechado: true` ao encerrar o ciclo e `fechado: false` ao sair para o checklist. A retomada lê os passos e `concluido`, mas não lê `fechado`; não há diferença implementada entre captura aberta e fechada. Preserva os resultados do mesmo par e, se ainda não concluiu, prepara um novo disparo. [Ficha da T14](../02-telas/T14-ciclo-dinamico/tela.md).
- **Login simulado:** [regras.js](../06-prototipo/app/src/telas/T01/regras.js) verifica o mínimo de oito caracteres do mock; não valida credenciais num servidor. O `Entrar` pode mostrar erro e não entra sempre. A espera com rede é fixa em 1,2 s.
- **Recuperação de senha · autorizado em 08/10:** depois de salvar e tocar em `Entrar com a senha nova`, [Login.jsx](../06-prototipo/app/src/telas/T01/Login.jsx) volta ao login com `M.credenciais.senha` preenchida e ocultada. Não salva a senha nova digitada nem altera a credencial do mock. É uma facilidade de demonstração solicitada pelo usuário, não uma regra de autenticação do produto.
- **Consultas do palco:** exemplos especiais ficam parados em `Estados desta tela`, com retorno ao fluxo anterior. Eles não criam percursos alternativos de demonstração; os estados reais do produto continuam descritos nas fichas. [Regra do palco](../06-prototipo/palco.md).
- **Persistência e integração:** estado e resultados ficam em memória; não há gravação durável, comunicação real com o módulo ou envio ao servidor. Os limites de produto precisam ser tratados pelas [integrações](integracoes.md).
- **Marcar todos:** nenhum item do mock é manual sem foto; a ação não tem onde aparecer nesta demonstração. A HU-T13-1 continua descrevendo a condição de produto em que ela se aplica.

## Validar no aparelho

- O roxo pressionado `#4A2A80`.
- O contraste da tinta apagada em campo.
- A altura útil com a navegação de três botões, que tira mais espaço que a barra de gestos.

As decisões já aprovadas não voltam a ser perguntas por aparecerem em uma nota antiga. As questões desta página também não autorizam redesenhar, mudar um texto ou inventar uma resposta antes da decisão correspondente.
