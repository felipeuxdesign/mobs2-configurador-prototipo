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
| `11-momento-homologado` | momento | tudo passa | `checklist` |
| `12-momento-b-com-ressalva` | momento | salvar um item como não conforme, com a justificativa | derivado do fluxo |
| `13-momento-e-resolvida` | momento | voltar do ciclo de testes com os seis passos feitos | derivado do fluxo |
| `14-estado-homologado-sem-localizacao` | estado | finalizar com a localização negada | `localizacao-negada` |
| `15-momento-problema-fotografado` | momento | fotografar o problema depois de marcar Não está conforme | derivado do fluxo |
| `16-estado-secao-c-com-item-reprovado` | estado | um item automático reprova: o xis, a leitura e a seta pro detalhe (a 09) | `can-estatico-bateria` |
| `17-momento-foto-da-antena` | momento | o 2º item da Montagem · a frase da câmera vem do mock | o caminho feliz |
| `18-momento-foto-do-chicote` | momento | o 3º item da Montagem | o caminho feliz |
| `19-momento-foto-do-leitor` | momento | o 4º item da Montagem · só com leitor | o caminho feliz |
| `20-momento-foto-do-painel` | momento | o 5º item da Montagem · só quando houve calibração | o caminho feliz |

- no protótipo · a nossa versão da linha *11-momento-homologado*, antes desta entrega: | `11-momento-homologado` | momento | tocar em `Finalizar instalação`, com o que bloqueia resolvido (T13·3) | `checklist` |

- no protótipo · a nossa versão da linha *10-estado-finalizar-com-a-secao-f-falhando*, antes desta entrega: | `10-estado-finalizar-com-a-secao-f-falhando` | estado | `Finalizar` com a Seção F falhando — o servidor não respondeu | `pronto-para-fechar` (C10, T13-A2) |

- no protótipo · a nossa versão da linha *09-estado-item-reprovado*, antes desta entrega: | `09-estado-item-reprovado` | estado | um item automático reprova — a bateria abaixo do mínimo, na CAN | `can-estatico-isolado` (C10, T13-A1) |

- no protótipo · o pacote 2 · a linha *09-estado-item-reprovado* diz o caso `can-fora-esperado`, e ele é a velocidade do a-02 a 0 km/h — não monta a bateria a 10,9 V que a referência desenha. O 09 segue montado pelo `can-estatico-bateria` (a bateria do a-02 abaixo do mínimo, lida no módulo), o acréscimo nomeado do pacote 1 (pro arquiteto: ou o caso da linha vira esse, ou o `can-fora-esperado` passa a declarar a bateria) · **resolvido no pacote 10**: o caso é o `can-estatico-bateria`, que baixa a alimentação do M2C-0301 (10,9 V), e o mesmo caso monta a T07/12, a 16 e a 09

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

**No protótipo** (anotação de construção): o 08 e o 15 são o mesmo item manual com a caixa *Não está conforme* marcada — o 08 antes da foto do problema, o 15 depois (decisão 39). Pela URL, o 08 abre com o texto de exemplo (`checklist.exemploJustificativa`) e o 15, com ele e o problema fotografado às 14:30, no primeiro item de B por fazer; no fluxo, `Fotografar o problema` leva do 08 ao 15, e desmarcar a caixa volta ao 07. Sem o texto, o 08 e o 15 continuam no mesmo endereço: muda o botão, *Conte o que aconteceu*, apagado, no 15. A câmera sem a permissão, com ou sem a caixa marcada, não tem referência, e a URL sai do momento. O 09 segue o caso do mock (o QJF-2C61, o M2C-0301, 10,9 V), como a referência nova; o título é *Alimentação*, o `rotulo` do item, como a referência corrigida no pacote 10 desenha; desde o pacote 11, o detalhe diz só a seção, sem a barrinha e sem a posição, e o *O que conferir* tem as três causas do `textos.md`, na peça da T05/04 sem o traço vermelho. **O pacote 10:** o 16 é a Seção C aberta pelo mesmo caso, com a Alimentação reprovada — o xis, 10,9 V em vermelho e a seta, que abre o 09; o 17 ao 20 são as outras quatro fotos da B pela URL, com as de antes fotografadas, como o `Tirar foto` do item anterior as deixa (no fluxo, o `Tirar foto` leva de uma à outra pela URL); o não conforme delas não tem referência, e a URL sai do momento. **O 16 e o mock (o pacote 11):** a referência do pacote 10 desenhava o QJF-2C61 calibrado, com os números do herói; a do pacote 11 traz os do ônibus da bateria, os que o protótipo já calculava pelo mock — sem o painel do a-02, não houve calibração: *0 de 4*, *8 de 10*, *14 de 30* e *Faltam 13 itens*. O desvio do pacote 10 saiu. **Na coluna do palco**, o 09 vem logo depois do 16 (`depoisDe`).
