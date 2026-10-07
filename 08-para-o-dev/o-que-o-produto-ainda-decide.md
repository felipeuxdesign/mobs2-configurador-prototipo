# O que o produto ainda decide

O que **não é de desenho** e o produto ainda decide. O protótipo seguiu o padrão ao lado de cada linha, e mudar é uma linha. Desde o pacote 12, o que tinha tela está desenhado com o padrão (*desenhado: …*): se o PM reprovar, muda uma tela.

## As perguntas abertas

| Onde | A pergunta | Enquanto isso |
|---|---|---|
| T09 | `Tentar de novo` regrava a cadeia inteira ou do bloco recusado pra frente? | do bloco recusado |
| T14 | quantas vezes pode disparar o evento antes de a Seção F reprovar de vez? | sem limite |
| T13 | como trocar uma foto ruim de um item já respondido? | foto tirada fica tirada |
| T13 | o voltar do Android numa seção aberta do checklist fecha a seção ou sai da tela? | faz o `Voltar ao menu` desenhado (T13·6, G20) |
| T07 | ler a CAN de novo pode reprovar item do checklist que estava conforme? | não reprova |
| T12 | a *falha reconhecida* tem ação, ou é só registro? | só registro |
| T11 | `Só registrar o diagnóstico` registra onde, e o diagnóstico sobe pra plataforma como, se a fila não tem esse tipo de envio (HU-T11-7, T11-V4)? | fica na sessão, com os blocos que não bateram e a hora, e volta ao menu; nenhum item entra na fila (G25) · **em parte, pela decisão 40 (26/09):** a ação agora é `Apenas registrar o diagnóstico`, e o efeito escrito embaixo dela é *nada é gravado · só o diagnóstico sobe*; como ele sobe, se a fila não tem esse tipo de envio, segue aberto |
| T16 | de que ponto a sessão interrompida retoma? | do último passo confirmado: o `Retomar` reabre a cadeia no bloco seguinte a ele, o que parou (o Leitor, `Bloco 4 de 6`, T16·5) |
| T16 | o voltar do Android na sessão interrompida faz o quê? | nada: `Retomar` e `Descartar` são atos, e o voltar não escolhe no lugar do técnico (T16·6, G20) |
| T01 · T02 · T04 | o voltar do Android no login, na escolha da unidade e no menu, que não têm saída desenhada, faz o quê — fecha o app, como o Android faz na primeira tela? | nada: a tela não oferece o caminho, e o voltar não inventa (`06-prototipo/logica.md` · O voltar do Android, G25) · **na T02, respondida pelo arquiteto (26/09):** o que o protótipo propôs — nas unidades de quem tem mais de uma empresa (`06`), o mesmo que o `Trocar de empresa`; nas empresas (`05`), nada |
| T05 | o voltar do Android na busca (00, 01, 02, 04), em que o rodapé só oferece o `Procurar de novo` e nenhuma saída pro menu, faz o quê? | nada: o link não sai da tela (G25) |
| T16 | o `Descartar` da sessão interrompida fica registrado onde (HU-T16-7)? | em lugar nenhum: volta ao menu sem sessão e sem item de fila, porque o registro do descarte não tem dado (T16·5, G25) |
| todas | o app respeita a fonte aumentada do Android? | trava o tamanho |
| T14 | se o evento falhar de novo: *confira a conexão do módulo* | aparece na segunda falha · desenhado: T14/09 (o pacote 12) |
| T06 | no conflito de pinos com saída, `Usar leitor sem fio` resolve ali, ou a saída é reconectar o módulo sem fio? | **decidido no retorno do PM (06/10)**: a configuração é só sem fio, e o conflito é sempre erro de projeto de instalação — o estado com saída saiu (a rodada 2) |
| T01 | o `Entrar` espera o servidor: qual é o tempo limite, e o que a tela diz quando ele estoura? | o protótipo espera 1,2 s (*Entrando…*, o primário desabilitado, como o semear da T10) e entra sempre; sem tempo limite, porque o servidor é de mentira (decisão do diretor, 27/09) |
| T05 | o tempo-limite da conexão: quanto o app espera o módulo responder antes do *não respondeu*? | 15 s (o pacote 7) · o protótipo simula 1,2 s (*Conectando ao …*, o primário desligado) |
| T01 | o celular e o e-mail do técnico aparecem mascarados antes do login? | mascarados: `(81) •••••-8675` e `r•••••@atlsul.com.br` |
| T01 | a espera de 60 s do reenvio vale também pra trocar de canal? | vale: qualquer envio novo espera |
| T15 | depois de quanto tempo a fila parada vira notificação? | 30 min · desenhado: o aviso sobre o menu, T04/16 (o pacote 12) |
| T06 | a frase da trava de fora do pacote é `Pertence a {unidade}.`: com a unidade do mock sai `Pertence a Pátio Caruaru.`, e a da referência já vinha sem crase (`a Garagem Ibura`, T06-N4). A frase leva o artigo da unidade (`à Garagem`, `ao Pátio`)? | o texto como está, com o nome da unidade do mock |
| T13 | o mínimo de satélites do GPS | **decidido no retorno do PM (06/10)**: o critério é a antena (conectada, em curto, desconectada) · os satélites são informação |
| T13 | o critério de cada entrada digital | a ignição ligada, com a chave virada · desenhado: T13/23 e 24 |
| T13 | as causas de cada falha da Seção C, no *O que conferir* | as desenhadas: bateria, cabo, ponto de ligação · antena, céu aberto, cabo da antena · chip, antena do modem, cobertura · chave, fio da ignição, fusível |
| T13 · T15 | o pedido de correção de cadastro aparece na fila e no checklist? | **decidido no retorno do PM (06/10)**: a correção saiu · o técnico confere o cartão com o número impresso |
| T13 | dá pra finalizar com o pedido de correção aberto? | **decidido no retorno do PM (06/10)**: a correção saiu · a ciência do técnico é só da Seção F |
| T14 | depois da correção do cadastro, o que o técnico refaz? | **decidido no retorno do PM (06/10)**: a correção saiu · Não confere vira não conforme, com justificativa |
| T07 · T13 | a faixa de tensão do VL06 | **exemplo até a bancada**: 9,0 a 32,0 V (o PM autorizou valor de exemplo) |
| T13 | o tempo do pulso do bip | **exemplo até a bancada**: cerca de 1 segundo |
| T14 | os passos de uma visita valem pra outra? por quanto tempo? | valem, sem prazo |
| T15 | a causa do *servidor recusou* | **leitura nossa**: *o pacote de sincronização venceu*, a única que o *Ressincronizar e reenviar* resolve · o PM pediu pra combinar com o produto |
| T11 | o valor da *rede do módulo* | **leitura nossa**: *uma rede antiga* e *a rede da Mobs2* · o PM mandou trocar os endereços sem dizer por quê |

## Validar no aparelho

- o roxo pressionado `#4A2A80`
- o contraste da tinta apagada em campo
- a altura útil com a navegação de três botões, que tira mais espaço que a barra de gestos

## Fora do protótipo

- o **"marcar todos"** do checklist: nenhum item do mock é manual sem foto, então ele não tem onde aparecer. Nasce quando existir esse tipo de item
