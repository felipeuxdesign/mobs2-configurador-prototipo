# T13 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · 31 itens |
| `01-momento-a-identificacao-aberta` | momento | tocar na seção | derivado do fluxo |
| `02-momento-b-montagem-aberta` | momento | tocar na seção | derivado do fluxo |
| `03-momento-c-hardware-aberta` | momento | tocar na seção | derivado do fluxo |
| `04-momento-d-configuracao-aberta` | momento | tocar na seção | derivado do fluxo |
| `05-momento-e-teste-dinamico-aberta` | momento | tocar na seção | derivado do fluxo |
| `06-momento-f-servidor-aberta` | momento | tocar na seção | derivado do fluxo |
| `07-momento-responder-item` | momento | tocar num item manual | `checklist.itens · B` |
| `08-momento-nao-conforme-com-justificativa` | momento | marcar não conforme | `checklist.itens · B` |
| `09-estado-item-reprovado` | estado | tocar na linha vermelha da Seção C (a 16): a leitura, a faixa e o que conferir  | `can-estatico-bateria` |
| `10-estado-finalizar-com-a-secao-f-falhando` | estado | `Finalizar` com a Seção F falhando | `secaoF` |
| `12-momento-b-com-ressalva` | momento | salvar um item como não conforme, com a justificativa | derivado do fluxo |
| `13-momento-e-resolvida` | momento | voltar do ciclo de testes com os seis passos feitos | derivado do fluxo |
| `15-momento-problema-fotografado` | momento | fotografar o problema depois de marcar Não está conforme | derivado do fluxo |
| `16-estado-secao-c-com-item-reprovado` | estado | um item automático reprova: o xis, a leitura e a seta pro detalhe (a 09) | `can-estatico-bateria` |
| `17-momento-foto-da-antena` | momento | o 2º item da Montagem · a frase da câmera vem do mock | o caminho feliz |
| `18-momento-foto-do-chicote` | momento | o 3º item da Montagem | o caminho feliz |
| `19-momento-foto-do-leitor` | momento | o 4º item da Montagem · só com leitor | o caminho feliz |
| `20-momento-foto-do-painel` | momento | o 5º item da Montagem · só quando houve calibração | o caminho feliz |
| `21-estado-secao-c-com-gps-reprovado` | estado | o GPS reprova: a linha vermelha, 4 satélites e a seta pro detalhe · *padrão até o PM decidir* | `gps-fraco` |
| `22-estado-gps-reprovado` | estado | tocar na linha vermelha do GPS: a régua dos satélites e o que conferir · *padrão até o PM decidir* | `gps-fraco` |
| `23-estado-secao-c-com-entradas-reprovadas` | estado | uma entrada não bate: a linha vermelha, ignição desligada e a seta · *padrão até o PM decidir* | `entrada-ignicao` |
| `24-estado-entradas-reprovadas` | estado | tocar na linha vermelha das entradas: qual não bate e o que conferir · *padrão até o PM decidir* | `entrada-ignicao` |
| `25-estado-secao-c-com-modem-reprovado` | estado | o modem sem sinal reprova: a linha vermelha e a seta · *padrão até o PM decidir* | `modem-sem-sinal` |
| `26-estado-modem-reprovado` | estado | tocar na linha vermelha do modem: sem sinal e o que conferir · *padrão até o PM decidir* | `modem-sem-sinal` |
| `29-momento-relendo-o-modulo` | momento | tocar em Reler o módulo, no detalhe de um item reprovado: o botão diz Relendo o módulo, ali mesmo | `can-estatico-bateria` |
| `30-momento-alimentacao-relida` | momento | releu e deu certo: 13,8 V dentro da faixa, relido às 14:42, e Voltar ao checklist | `can-estatico-bateria` |
| `31-momento-gps-relido` | momento | releu e deu certo: 9 satélites dentro da faixa | `gps-fraco` |
| `32-momento-entradas-relidas` | momento | releu e deu certo: ignição ligada, conforme | `entrada-ignicao` |
| `33-momento-modem-relido` | momento | releu e deu certo: na rede, sinal bom | `modem-sem-sinal` |
| `34-momento-alimentacao-nao-resolvida` | momento | releu e não resolveu: 11,4 V, relido às 14:41, ainda 0,6 V abaixo do mínimo | `can-estatico-bateria` |
| `35-momento-gps-nao-resolvido` | momento | releu e não resolveu: 5 satélites, ainda 1 abaixo do mínimo | `gps-fraco` |
| `36-momento-entradas-nao-resolvidas` | momento | releu e não resolveu: ignição ainda desligada | `entrada-ignicao` |
| `37-momento-modem-nao-resolvido` | momento | releu e não resolveu: ainda sem sinal | `modem-sem-sinal` |
| `11-momento-aguardando-autoteste` | momento | tocar em Finalizar: Checklist registrado, aguardando autoteste | `heroi` |
| `14-estado-aguardando-autoteste-sem-localizacao` | estado | finalizar sem a localização do celular: aguardando autoteste | `sem-localizacao` |
| `38-momento-secao-d-sendo-lida` | momento | abrir o checklist: a Seção D começa vazia e enche conforme lê | `heroi` |
| `39-momento-bip-tocando` | momento | tocar em Testar bip: o app aciona o buzzer por cerca de 1 segundo · o botão diz Tocando | `heroi` |
| `40-momento-bip-esperando-resposta` | momento | o bip tocou: Você ouviu o bip? Ouvi ou Não ouvi · o Testar bip continua, pra tocar de novo | `heroi` |
| `41-momento-bip-ouvido` | momento | tocar em Ouvi: o bip confere | `heroi` |
| `42-momento-bip-nao-ouvido` | momento | tocar em Não ouvi: não conforme, com o campo de justificativa | `heroi` |

- no protótipo · antes desta entrega, o 11 era o checklist homologado (tocar em `Finalizar instalação`, com o que bloqueia resolvido, T13·3, do `checklist`) · a rodada 1 do retorno do PM o trocou pelo registrado, aguardando autoteste, e o 14 mudou de nome com ele

- no protótipo · a nossa versão da linha *10-estado-finalizar-com-a-secao-f-falhando*, antes desta entrega: | `10-estado-finalizar-com-a-secao-f-falhando` | estado | `Finalizar` com a Seção F falhando — o servidor não respondeu | `pronto-para-fechar` (C10, T13-A2) |

- no protótipo · a nossa versão da linha *09-estado-item-reprovado*, antes desta entrega: | `09-estado-item-reprovado` | estado | um item automático reprova — a bateria abaixo do mínimo, na CAN | `can-estatico-isolado` (C10, T13-A1) |

- no protótipo · o pacote 2 · a linha *09-estado-item-reprovado* diz o caso `can-fora-esperado`, e ele é a velocidade do a-02 a 0 km/h — não monta a bateria a 10,9 V que a referência desenha. O 09 segue montado pelo `can-estatico-bateria` (a bateria do a-02 abaixo do mínimo, lida no módulo), o acréscimo nomeado do pacote 1 (pro arquiteto: ou o caso da linha vira esse, ou o `can-fora-esperado` passa a declarar a bateria) · **resolvido no pacote 10**: o caso é o `can-estatico-bateria`, que baixa a alimentação do M2C-0301 (10,9 V), e o mesmo caso monta a T07/12, a 16 e a 09

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

**No protótipo** (anotação de construção): o 08 e o 15 são o mesmo item manual com a caixa *Não está conforme* marcada — o 08 antes da foto do problema, o 15 depois (decisão 39). Pela URL, o 08 abre com o texto de exemplo (`checklist.exemploJustificativa`) e o 15, com ele e o problema fotografado às 14:30, no primeiro item de B por fazer; no fluxo, `Fotografar o problema` leva do 08 ao 15, e desmarcar a caixa volta ao 07. Sem o texto, o 08 e o 15 continuam no mesmo endereço: muda o botão, *Conte o que aconteceu*, apagado, no 15. A câmera sem a permissão, com ou sem a caixa marcada, não tem referência, e a URL sai do momento. O 09 segue o caso do mock (o QJF-2C61, o M2C-0301, 10,9 V), como a referência nova; o título é *Alimentação*, o `rotulo` do item, como a referência corrigida no pacote 10 desenha; desde o pacote 11, o detalhe diz só a seção, sem a barrinha e sem a posição, e o *O que conferir* tem as três causas do `textos.md`, na peça da T05/04 sem o traço vermelho. **O pacote 10:** o 16 é a Seção C aberta pelo mesmo caso, com a Alimentação reprovada — o xis, 10,9 V em vermelho e a seta, que abre o 09; o 17 ao 20 são as outras quatro fotos da B pela URL, com as de antes fotografadas, como o `Tirar foto` do item anterior as deixa (no fluxo, o `Tirar foto` leva de uma à outra pela URL); o não conforme delas não tem referência, e a URL sai do momento. **O 16 e o mock (o pacote 11):** a referência do pacote 10 desenhava o QJF-2C61 calibrado, com os números do herói; a do pacote 11 traz os do ônibus da bateria, os que o protótipo já calculava pelo mock — sem o painel do a-02, não houve calibração: *0 de 4*, *8 de 10*, *14 de 30* e *Faltam 13 itens*. O desvio do pacote 10 saiu. **Na coluna do palco**, o 09 vem logo depois do 16 (`depoisDe`).
