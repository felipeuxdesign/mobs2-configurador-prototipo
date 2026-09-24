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
- **o `componentes.md`:** a tabela é a do design, com a *senha visível* nova. Embaixo, *No protótipo · o que o código mediu* tem as 78 linhas em que o protótipo mede diferente:
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
