// A entrega de 25/09 · a busca sem resultado, na T02 e na T06 (tela.md das duas):
// o vazio declarado diz o termo digitado no título, e o primário espera. A URL
// diz o momento enquanto a busca não acha nada; a busca que volta a achar o tira.
export default [
  // ── T02 · o 03 abre pelo endereço, no mundo do caso lista-longa-garagens ──
  { abre: '?tela=T02&momento=03-momento-busca-sem-resultado' },
  { chega: 'T02', momento: '03-momento-busca-sem-resultado' },
  { ve: 'Nada com “Recreio”' },
  { ve: 'Confira o nome, ou busque pela cidade.' },
  { desligado: 'Escolha uma garagem' },
  { naoVe: 'Garagem Boa Viagem' },
  // o voltar do sistema não faz nada: a tela não tem saída desenhada (logica.md)
  { tecla: 'Escape' },
  { fica: 'T02', ms: 500 },
  { chega: 'T02', momento: '03-momento-busca-sem-resultado' },
  // a busca que acha: as garagens do caso, e o 03 sai da URL
  { digita: 'Recife', em: 'Buscar garagem ou cidade' },
  { chega: 'T02', momento: null },
  { naoVe: 'Nada com' },
  { ve: 'Garagem Boa Viagem' },
  { naoVe: 'Pátio Caruaru' },
  // outro nome que não existe: o vazio diz o termo novo
  { digita: 'Paulista', em: 'Buscar garagem ou cidade' },
  { chega: 'T02', momento: '03-momento-busca-sem-resultado' },
  { ve: 'Nada com “Paulista”' },
  { desligado: 'Escolha uma garagem' },
  // a escolha e o primário (R-14): a Várzea, que o mundo do herói também tem, sincroniza
  { digita: 'Várzea', em: 'Buscar garagem ou cidade' },
  { chega: 'T02', momento: null },
  { marca: 'Garagem Várzea' },
  { fica: 'T02', ms: 400 },
  { chega: 'T02', momento: null },
  { ve: 'Sincronizar Garagem Várzea' },
  // a busca sem resultado esconde a escolha, e o primário espera; a que volta a achar a devolve
  { digita: 'Recreio', em: 'Buscar garagem ou cidade' },
  { chega: 'T02', momento: '03-momento-busca-sem-resultado' },
  { desligado: 'Escolha uma garagem' },
  { digita: 'varzea', em: 'Buscar garagem ou cidade' },
  { chega: 'T02', momento: null },
  { ve: 'Sincronizar Garagem Várzea' },
  { toca: 'Sincronizar Garagem Várzea' },
  { chega: 'T03' },

  // ── T06 · o 08 no fluxo: a placa que não existe no pacote ──
  { abre: '?tela=T06' },
  { chega: 'T06', momento: null },
  { ve: 'Escolha o veículo que está na sua frente.' },
  { marca: 'RKT-8H42' },
  { fica: 'T06', ms: 400 },
  { digita: 'ABC-1234', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: '08-momento-busca-sem-resultado' },
  { ve: 'Nada com “ABC-1234”' },
  { ve: 'Confira a placa, ou busque pela frota.' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  { desligado: 'Usar este ativo' },
  // a busca que acha: a lista volta com o ônibus marcado, e o 08 sai da URL
  { digita: 'rkt8h42', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: null },
  { naoVe: 'Nada com' },
  { ve: 'Escolha o veículo que está na sua frente.' },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'Os dois batem — é este veículo.' },
  // Escolher outro volta à lista com a busca como estava; outra placa que não existe
  { toca: 'Escolher outro' },
  { chega: 'T06', momento: null },
  { digita: 'ABC-1234', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: '08-momento-busca-sem-resultado' },
  // o voltar do sistema faz o Voltar ao menu, o link de saída da lista (logica.md)
  { tecla: 'Escape' },
  { chega: 'T04' },

  // ── T06 · o 08 pelo endereço: o termo da referência digitado ──
  { abre: '?tela=T06&momento=08-momento-busca-sem-resultado' },
  { chega: 'T06', momento: '08-momento-busca-sem-resultado' },
  { ve: 'Nada com “ABC-1234”' },
  { desligado: 'Usar este ativo' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
]
