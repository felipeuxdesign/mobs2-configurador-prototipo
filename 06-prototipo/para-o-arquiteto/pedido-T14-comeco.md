# Complemento ao pedido da T14 · o começo da tela também fica sem retorno

Vale junto com o *pedido-T14-passo-da-vez* (as decisões 1 a 6). Este traz as decisões 7 a 9. O diretor pediu pra medir o começo da tela.

Medi no fluxo (T10 → `Fazer o ciclo de testes` → T14), lendo a tela a cada 300 ms:

| tempo | o que a tela mostra |
|---|---|
| 0 a 3 s | **a fila drenando.** O `Disparar evento de teste` fica desligado, e a única pista é a frase *6 mensagens e 2 de diagnóstico saindo do módulo* e o *FILA DRENANDO*, em letra pequena. Nada se move por 3 s: o `animacao.md` diz *"a fila do módulo drena por 3s, linear"*, mas não há peça que drene. No protótipo, a tela espera 3 s sem desenho nenhum, e aí o quadro troca. |
| no toque do `Disparar` | **o botão vira `Encerrar o ciclo` na hora, aceso e no mesmo lugar** (a 00 desenha assim). O retorno do disparo é só o *14:30* pequeno, no *disparado pelo app*, e o prazo começando a descer. Não há um *disparando* nem um *disparado*. E quem tocar duas vezes encerra o ciclo sem querer. |
| 0 a 6,6 s depois | só o prazo desce (1 s vale 4 s de prazo). |
| 6,6 s | *O EVENTO CHEGOU EM 0:24* e o horário do recebido. |
| 8,7 s | *campos conferidos 6 de 6*. |
| 9,3 · 12,3 · 15,3 · 18,3 s | os passos viram check, sem passo da vez (acima). |

### As decisões do começo (o padrão que eu adotaria entre parênteses)

7. **A fila que drena se vê.**
   - (Embaixo da frase da fila, a barra do envio, que já existe: a `Escala` de envio da T15/01, `--escala-envio`. Ela esvazia em 3 s, linear, só por transform.)
   - Isso é o que o `animacao.md` já pede e nenhuma referência desenha. Pela lei 24, pede quadro: a 01 com a barra.
8. **O toque no `Disparar` dá retorno e não arma o encerrar.**
   - (O primário fica desligado e diz o que está acontecendo, como nas outras listas da lei 24: *Aguardando o evento*, por exemplo. O `Encerrar o ciclo` só acende quando o evento chega ou o prazo estoura.)
   - Assim o duplo toque não encerra, e o técnico vê que o disparo foi.
   - O texto é seu. A 00 muda: hoje ela desenha o `Encerrar o ciclo` aceso com o prazo em 1:36.
9. **A linha *disparado pelo app* chega com destaque.** (O horário entra esmaecendo em 150 ms, como o *recebido no servidor* já entra. Sem peça nova.)

## O que entra no mesmo pacote

- **As referências:**
  - a `01` com a barra da fila (decisão 7);
  - a `00` com o rodapé que espera o evento (decisão 8), junto com o passo da vez do primeiro pedido.
- **Os documentos da T14:**
  - `textos.md`: o texto do rodapé que espera o evento;
  - `animacao.md`: as linhas da fila, do disparo e do *disparado pelo app*;
  - `tela.md`: o `Encerrar o ciclo` só depois do evento ou do prazo.
- **Nada muda** no mock, nos tokens, nas peças nem no ritmo (a fila em 3 s, o prazo de 2:00, os passos a +9, +12, +15 e +18 s).
