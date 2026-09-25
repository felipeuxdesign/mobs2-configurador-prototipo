# T13 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · 31 itens |
| `01-momento-a-identificacao-aberta` | momento | tocar na seção | `checklist.secoes` |
| `02-momento-b-montagem-aberta` | momento | tocar na seção | `checklist.secoes` |
| `03-momento-c-hardware-aberta` | momento | tocar na seção | `checklist.secoes` |
| `04-momento-d-configuracao-aberta` | momento | tocar na seção | `checklist.secoes` |
| `05-momento-e-teste-dinamico-aberta` | momento | tocar na seção | `checklist.secoes` |
| `06-momento-f-servidor-aberta` | momento | tocar na seção | `checklist.secoes` |
| `07-momento-responder-item` | momento | tocar num item manual | `checklist.itens · B` |
| `08-momento-nao-conforme-com-justificativa` | momento | marcar não conforme | `checklist.itens · B` |
| `09-estado-item-reprovado` | estado | um item automático reprova — a bateria abaixo do mínimo, na CAN | `can-estatico-isolado` (C10, T13-A1) |
| `10-estado-finalizar-com-a-secao-f-falhando` | estado | `Finalizar` com a Seção F falhando — o servidor não respondeu | `pronto-para-fechar` (C10, T13-A2) |
| `11-momento-homologado` | momento | tocar em `Finalizar instalação`, com o que bloqueia resolvido (T13·3) | `checklist` |
| `12-momento-b-com-ressalva` | momento | salvar um item como não conforme, com a justificativa | derivado do fluxo |
| `13-momento-e-resolvida` | momento | voltar do ciclo dinâmico com os cinco passos feitos | derivado do fluxo |
| `14-estado-homologado-sem-localizacao` | estado | finalizar com a localização negada | `localizacao-negada` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
