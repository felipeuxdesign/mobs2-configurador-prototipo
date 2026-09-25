# T05 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | cinco módulos por perto (`situacao.porPerto`: o do herói e outros quatro) · M2C-0417 é o do herói |
| `01-momento-nenhum-escolhido` | momento | a busca achou, nada tocado ainda | `situacao.porPerto` · `modulos` |
| `02-momento-um-encontrado` | momento | só um módulo por perto · no protótipo, só pelo endereço | `situacao.porPerto` (só o do herói) · `modulos` |
| `03-estado-nenhum-encontrado` | estado | nenhum módulo responde | `busca-vazia` (com a duração, AC-18) |
| `04-estado-conexao-falhou` | estado | o módulo não responde ao conectar | `conexao-falha` |
| `05-momento-pre-checagem` | momento | conectado | `matrizCapacidades` |
| `06-estado-pre-checagem-serial-nao-cadastrado` | estado | o serial não está no cadastro | `serial-nao-cadastrado` |
| `07-estado-pre-checagem-modelo-sem-driver` | estado | o modelo não tem driver | `modelo-sem-driver` |
| `08-estado-pre-checagem-firmware-fora-da-matriz` | estado | o firmware não é homologado | `firmware-fora-matriz` |
| `09-estado-firmware-fora-sem-rede-no-modulo` | estado | firmware fora e o módulo sem rede | `firmware-fora-matriz` + `firmware-fora-sem-rede` (o modem sem rede, AC-20) |
| `10-momento-atualizando-o-firmware` | momento | `Atualizar firmware` | `firmware-fora-matriz` (`.atualizacao`, o quadro de 62%) |
| `11-estado-pre-checagem-conteudo-nao-cabe` | estado | a configuração não cabe no módulo | `conteudo-nao-cabe` |
| `12-estado-pre-checagem-pool-de-cercas-esgotado` | estado | as cercas passam do limite | `pool-esgotado` |
| `13-estado-pre-checagem-canal-aberto-e-pendencias` | estado | o módulo tem canal de sessão anterior — o app fecha antes de começar | `canal-aberto` + `modulo-com-pendencias` (as mensagens da tira) |
| `14-estado-pre-checagem-link-perdido-na-6a` | estado | o link cai na sexta checagem | `link-perdido` |
| `15-estado-pre-checagem-modulo-em-repouso-na-9a` | estado | o módulo dorme na nona checagem — não é erro | `modulo-em-repouso` |
| `16-estado-bluetooth-desligado` | estado | o Bluetooth do celular está desligado | `bluetooth-desligado` |
| `17-estado-bluetooth-sem-permissao` | estado | o técnico negou a permissão do Bluetooth | `bluetooth-sem-permissao` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
