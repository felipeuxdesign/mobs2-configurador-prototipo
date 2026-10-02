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
| `09-estado-item-reprovado` | estado | um item automático reprova | `can-fora-esperado` |
| `10-estado-finalizar-com-a-secao-f-falhando` | estado | `Finalizar` com a Seção F falhando | `secaoF` |
| `11-momento-homologado` | momento | tudo passa | `checklist` |
| `12-momento-b-com-ressalva` | momento | salvar um item como não conforme, com a justificativa | derivado do fluxo |
| `13-momento-e-resolvida` | momento | voltar do ciclo dinâmico com os cinco passos feitos | derivado do fluxo |
| `14-estado-homologado-sem-localizacao` | estado | finalizar com a localização negada | `localizacao-negada` |
| `15-momento-problema-fotografado` | momento | fotografar o problema depois de marcar Não está conforme | derivado do fluxo |

- no protótipo · a nossa versão da linha *11-momento-homologado*, antes desta entrega: | `11-momento-homologado` | momento | tocar em `Finalizar instalação`, com o que bloqueia resolvido (T13·3) | `checklist` |

- no protótipo · a nossa versão da linha *10-estado-finalizar-com-a-secao-f-falhando*, antes desta entrega: | `10-estado-finalizar-com-a-secao-f-falhando` | estado | `Finalizar` com a Seção F falhando — o servidor não respondeu | `pronto-para-fechar` (C10, T13-A2) |

- no protótipo · a nossa versão da linha *09-estado-item-reprovado*, antes desta entrega: | `09-estado-item-reprovado` | estado | um item automático reprova — a bateria abaixo do mínimo, na CAN | `can-estatico-isolado` (C10, T13-A1) |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

**No protótipo** (anotação de construção): o 08 e o 15 são o mesmo item manual com a caixa *Não está conforme* marcada — o 08 antes da foto do problema, o 15 depois (decisão 39). Pela URL, o 08 abre com o texto de exemplo (`checklist.exemploJustificativa`) e o 15, com ele e o problema fotografado às 14:30, no primeiro item de B por fazer; no fluxo, `Fotografar o problema` leva do 08 ao 15, e desmarcar a caixa volta ao 07. Sem o texto, o 08 e o 15 continuam no mesmo endereço: muda o botão, *Conte o que aconteceu*, apagado, no 15. A câmera sem a permissão, com ou sem a caixa marcada, não tem referência, e a URL sai do momento. O 09 segue o caso do mock (o QJF-2C61, o M2C-0301, 10,9 V), como a referência nova; a posição do item fica *1 de 4*, porque a Alimentação é o primeiro item da C no mock e na T13/03, e a referência desenha *2 de 4* (G9, pro arquiteto).
