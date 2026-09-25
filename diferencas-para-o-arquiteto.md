# As entregas do design, organizadas · o que o protótipo manteve e as cópias do design ainda não têm

As quatro pastas (`atualizacao/`, `atualizacao2/`, `atualizacao33/` e `atualizacao98/`) entraram no lugar, sem perder o que o protótipo e o diretor mudaram. Onde o design e o protótipo mudaram o mesmo arquivo, os dois foram juntados, e o que era só do protótipo ficou. **Pra próxima entrega não apagar nada, parta destes arquivos, e não da cópia antiga.**

As listas de peças e as referências são do design, como o pacote pede. A anotação de construção foi pra uma seção separada.

## Os números

| | o design diz | o protótipo mede | por quê |
|---|---|---|---|
| referências | 113 | 113 | igual · 16 telas, 47 momentos, 50 estados |
| tokens | 95 | **274** | o `tokens.css` tem também os tokens das peças, que o C2 e os ciclos de tela pediram (G3) |
| peças | 116 | **126** | as 116 do design, e mais 10 linhas que as folhas desenham e o design ainda não lista: o primário nos três estados, o link, a linha tocável, os glifos, os ícones de ferramenta, os poços, os marcadores e os botões só de ícone |
| cores | 23 | **25** | medido no C1 |
| casos no mock | 34 | **41** | os 7 acréscimos dos ciclos, só aditivos: `conferencia-confere`, `firmware-fora-sem-rede`, `can-estatico-hodometro-a22`, `instalacoes-vazia`, `fila-sem-erro`, `fila-dois-erros` e `fila-vazia` |

## Arquivo por arquivo

- **as listas de peças, da T03 à T10:** a seção *Peças do design system que esta tela usa* é a do design. A lista que o código usa, medida em cada ciclo, foi pra *No protótipo · as peças que o código usa*, logo embaixo. **Pra olhar:** várias listas do design têm peças que nenhuma referência da tela desenha. Na T01 e na T02, por exemplo, aparecem a justificativa, a linha da fila, a linha da re-checagem e as seções do checklist. Parece o gerador reconhecendo um bloco genérico
- **o `componentes.md`:** a tabela é a do design, com a *senha visível* nova. Embaixo, *No protótipo · o que o código mediu* tem as 91 linhas em que o protótipo mede diferente:
  - as 10 peças novas;
  - a *falha*, o *ainda não* e o *espera*, que estão desenhados na folha 4, e não na 1 e na 3;
  - as variantes nomeadas (G11) na regra;
  - as telas que usam cada peça, corrigidas pelo medido (G10)
- **as `leis.md`:** entraram a exceção do olho da senha na lei 14 e a área de toque na *nada encosta*. Ficaram as marcas ◆ do C1, a regra do traço por classe de ícone, e as leis do diretor R-14 (escolher marca, o botão avança) e R-15 (sem barra de rolagem do navegador)
- **o `logica.md`:** entraram as quatro linhas dos momentos novos da T01. Ficaram as seções que os ciclos escreveram (os contadores do menu, a escolha do ativo, a releitura, a cadeia, a conferência, o ciclo dinâmico e o checklist), o que se consome uma vez por sessão na T05, o encerramento, e o voltar do Android na T16. A linha do estado da lista longa da T02 foi pro caso novo `lista-longa-garagens`, como o `estados.md`
- **o `ciclos.md`:** fica o plano revisado no C0 e no C1, com os números novos (113 referências, 47 momentos)
- **o `pendencias.md`:** entraram as duas perguntas novas da T01. Ficaram as respostas que os ciclos deram (T06, T13, T14 e T16)
- **o `mocks.js` e o `casos.md`:** o caso novo entrou por cima dos 7 acréscimos, e o gate aprova, com 191 checagens
- **o `indice.json`:** as 113 referências do design, com os campos que o palco lê (`rotulo`, `rotuloOrigem` e `grupo`)
- **o `CLAUDE.md` da raiz, o `LEIA-PRIMEIRO.md`, os `README.md` e o `PROMPT-DE-ABERTURA.md`:** os números do design, com os do protótipo onde ele mede diferente (a tabela de cima)
- **entraram como vieram:** as referências novas e refeitas da T01 e da T02, as folhas 2 e 6, o `estados.md`, o `textos.md` e a `animacao.md` da T01, o `estados.md` e o `textos.md` da T02, as `historias.md`, e as decisões 31 e 32

## O que o pacote repetia

O `_changelog-para-colar.md` da `atualizacao33/` traz, embaixo da senha visível, as linhas da primeira entrega (a logo no lima, o *Lembrar meu usuário*, o checkbox marcado), que já estavam no registro. Entraram uma vez só. A `atualizacao98/` repete os itens 1 a 4 e o 7 da quarta entrega, que o protótipo já estava construindo.

## O que as referências pedem ao design · medido no C10, no C11 e nas entregas 4 e 5

Nenhuma referência foi mexida: o protótipo mede e propõe, e a correção é na fonte. Cada item diz o que muda e, quando medido, quanto a diferença cai.

- **a faixa da sessão, em toda tela com sessão:** várias referências desenham a faixa sem a linha de baixo da folha 2 (T11, T12 00/01/03, T13 no item reprovado) ou deixam ela encolher quando o conteúdo passa de 800 (T13 D e E, T14 01/04/06). O protótipo trava a faixa em 52, com a linha (G13). **Proposta:** a faixa com a linha e sem encolher em todos os HTML. Medido na T14: a 01 cai de 1,77% pra 0,05%, a 04 de 0,72% pra 0,06% e a 06 de 0,73% pra 0,06%
- **T01:**
  - a 03, a 04 e a 05 desenham 9:41, 0:44 e 9:28, que não saem do mock e não batem entre si. **Proposta:** o quadro da chegada, com 10:00, 60 s e 1:00 (T01·1);
  - a 12 e a 13 desenham o Confirmar aceso com as células vazias; no protótipo ele fica apagado até o sexto dígito (T01·6). É 5,9%, só no botão;
  - o teto da hora (o último reenvio usado) não tem desenho nem texto;
  - no canal e-mail, as duas linhas da folha mostram o mesmo destino, e não há texto pra *mandar pro telefone*
- **T13:** os números da referência contra o mock: 19 de 31, 61% no placar, B em 1 de 5, F esperando com *0 de 3*, *Faltam 9*, o firmware 2.3.5, a cerca G07, a versão inteira em duas colunas, o GPS com a faixa em 33% e o 9 em 75%, e o item reprovado do QJF-2C61 com 10,9 V
- **T14/05:** o evento chega aos 24 s do mock. **Proposta:** 0:24, a barra em 80% e 14:30:24. A 05 cai de 0,87% pra 0,04%, e os textos passam a conferir
- **T15:** a evidência do RSW-9L02 é de 2 dias, e não *ontem 10:05*. A 01 desenha outro recorte da fila, com 4 itens e o contador 5. A 02 cruza garagens pra dar o 4. O *14:02* da 03 e da 04 não existe no mock
- **T16:** o círculo com traço do *não se aplica* só aparece na 02 e na 05; o subtítulo é montado de dois jeitos (2 px entre a 03 e a 06); o miolo tem vão de 14 numa metade e 12 na outra; a nota NÃO RODARAM mistura duas peças; os glifos são desenhados à mão
- **T11/02:** junta a faixa do herói com a *tradução frota v2* do a-16. **Proposta:** *tradução urbano v3*, a do RKT-8H42
- **T12 e T06:** a margem do último grupo mais o recheio do miolo somam folga dupla antes do rodapé. **Proposta:** tirar a margem. Não muda nenhum pixel na rolagem 0
- **T04:** o h1 escondido *Menu* só existe nas referências dos diálogos, e não nas das folhas
- **as listas de peças do design:** a T01, a T02, a T12, a T13 e a T15 listam peças que nenhuma referência delas desenha. A lista medida de cada uma está na seção do protótipo
