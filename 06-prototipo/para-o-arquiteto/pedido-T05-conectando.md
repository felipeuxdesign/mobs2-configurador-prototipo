# Pedido ao arquiteto · a T05 sem retorno no Conectar

Vale junto com os dois pedidos da T14 (as decisões 1 a 9). Este traz as decisões 10 a 13. O diretor pediu pra revisar todas as telas com processo: a T14 e este caso são os únicos sem retorno.

## O que medi

Revi os processos de todas as telas no código:
- **T01, T03, T05 (a busca), T07, T09, T10, T11 e T16** mostram o que corre, pela lei 24.
- **O vínculo da T06, o `Finalizar instalação` da T13 e o reenviar da T15** só registram e mandam pra fila (o app funciona sem rede), então a resposta imediata está certa.

Sobra o **`Conectar ao …` da T05**:

- **Conectado:** o toque leva direto à T07, sem nenhum *Conectando…*. No protótipo, isso não chega a doer, porque a leitura da T07 começa na hora e já dá retorno. No aparelho, a conexão Bluetooth leva alguns segundos, e nesse tempo a tela não diz nada: nem o botão desliga.
- **O módulo não responde (a 04):** o *NÃO RESPONDEU* aparece no mesmo instante do toque. No aparelho, ele só viria depois do tempo de espera da conexão, também sem retorno.
- **O `Tentar de novo` da 04** tem o mesmo buraco.

É o mesmo caso do `Entrar` da T01, que ganhou o *Entrando…* (a 19, o pacote 5).

## As decisões (o padrão que eu adotaria entre parênteses)

10. **O `Conectar ao …` ganha um momento de espera.**
    - (O primário desliga e diz o que está acontecendo, no padrão do *Entrando…* da T01 e do *Gravando no módulo…* da T10: *Conectando ao M2C-0417…*, por exemplo.)
    - (O resto do quadro fica como está: o escolhido, os outros por perto e o `Procurar de novo` desligado.)
    - O texto é seu.
11. **Quanto tempo.**
    - (1,2 s, o mesmo da busca de novo e da espera do `Entrar`: `buscaMs` e `entrarEsperaMs`. Não entra número novo.)
    - No produto, é o tempo real da conexão.
12. **A falha chega depois da espera.**
    - (O *NÃO RESPONDEU* da 04 aparece depois do mesmo *Conectando…*, como a senha errada da T01/01 chega depois do *Entrando…*.)
13. **O `Tentar de novo` da 04 também passa pelo *Conectando…*.**
    - (Sim, com o mesmo texto e o mesmo tempo, sobre o quadro da 04.)

## O que o pacote traria

- **Uma referência nova, pela lei 24:** a `T05/06-momento-conectando`.
  - (A 00 com o M2C-0417 escolhido e o primário desligado com o texto da decisão 10.)
  - Se o *Tentar de novo* pedir desenho próprio, uma segunda: o quadro da 04 com o mesmo primário.
- **Os documentos da T05:**
  - `textos.md`: o texto do *Conectando…*;
  - `estados.md`, `tela.md` e `animacao.md`: o momento, a espera antes da T07 e da 04, e o ritmo;
  - o `indice.json`.
- **Nada muda** no mock, nos tokens nem nas peças. O ritmo só ganha o uso dos 1,2 s que já existem.

Construo igual às referências quando chegarem, junto com a T14, rodo a régua (as referências e os roteiros `mov-t05`, `busca`, `portas` e `heroi`) e devolvo o gate com as telas lado a lado.
