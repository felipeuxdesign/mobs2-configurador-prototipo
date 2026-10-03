# T07 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417, sem ativo · o módulo do herói, com os sete itens certos |
| `01-momento-can-lida` | momento | a configuração do ativo gravada, voltando ao diagnóstico | derivado do fluxo |
| `02-estado-serial-nao-cadastrado` | estado | o serial não está no cadastro | `serial-nao-cadastrado` |
| `03-estado-modelo-sem-suporte` | estado | o modelo do módulo sem suporte nesta versão | `modelo-sem-driver` |
| `04-estado-firmware-nao-homologado` | estado | o firmware não é homologado | `firmware-fora-matriz` |
| `05-estado-firmware-sem-rede-no-modulo` | estado | o firmware não é homologado e o módulo está sem rede | `firmware-sem-rede-no-modulo` |
| `06-momento-atualizando-o-firmware` | momento | `Atualizar firmware` | `firmware-fora-matriz` |
| `07-estado-modem-sem-sinal` | estado | o modem sem sinal — só informa | `modem-sem-sinal` |
| `08-estado-sinal-da-can-sem-leitura` | estado | um sinal da CAN não chega | `can-estatico-ausente` |
| `09-estado-sinal-da-can-fora-do-esperado` | estado | um sinal da CAN fora do esperado | `can-estatico-isolado` |
| `10-momento-relendo-a-can` | momento | `Ler de novo` | derivado do fluxo |
| `11-momento-lendo` | momento | a leitura correndo · 600ms por linha | derivado do fluxo |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
