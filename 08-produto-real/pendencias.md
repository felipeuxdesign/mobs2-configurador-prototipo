# As pendências

O que **não é de desenho** e o produto ainda decide. O protótipo seguiu o padrão ao lado de cada linha, e mudar é uma linha.

## O que o produto ainda decide

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
| T10 | os sinais podem se chamar Bateria e Alternador no cadastro? | o nome do cadastro |
| todas | o app respeita a fonte aumentada do Android? | trava o tamanho |
| T14 | se o evento falhar de novo: *confira a conexão do módulo* | aparece na segunda falha |
| T06 | no conflito de pinos com saída, `Usar leitor sem fio` resolve ali, ou a saída é reconectar o módulo sem fio, como a HU-T06-5 e o domínio dizem (T06-N1)? | resolve ali: a sessão passa a sem fio e o mesmo ônibus segue pra confirmação (T06·4) |
| T01 | o celular e o e-mail do técnico aparecem mascarados antes do login? | mascarados: `(81) •••••-8675` e `r•••••@atlsul.com.br` |
| T01 | a espera de 60 s do reenvio vale também pra trocar de canal? | vale: qualquer envio novo espera |
| T15 | depois de quanto tempo a fila parada vira notificação? | 30 min |
| T06 | a frase da trava de fora do pacote é `Pertence a {unidade}.`: com a unidade do mock sai `Pertence a Pátio Caruaru.`, e a da referência já vinha sem crase (`a Garagem Ibura`, T06-N4). A frase leva o artigo da unidade (`à Garagem`, `ao Pátio`)? | o texto como está, com o nome da unidade do mock |

## Validar no aparelho

- o roxo pressionado `#4A2A80`
- o contraste da tinta apagada no sol
- a altura útil com a navegação de três botões, que tira mais espaço que a barra de gestos

## Fora do protótipo

- o **"marcar todos"** do checklist: nenhum item do mock é manual sem foto, então ele não tem onde aparecer. Nasce quando existir esse tipo de item
