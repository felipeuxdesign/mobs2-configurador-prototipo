// A entrega de 25/09 · a busca sem resultado, na T02 e na T06 (tela.md das duas):
// o vazio declarado diz o termo digitado no título, e o primário espera. A URL
// diz o momento enquanto a busca não acha nada; a busca que volta a achar o tira.
// A decisão do diretor de 25/09 (b): a busca que acha outros e esconde a escolha
// feita também faz o primário esperar, e ele acende de novo quando ela volta.
// A otimização do design: a URL diz esse quadro também (o 04 da T02, o 09 da T06),
// e o endereço dele abre a tela nele; o Sincronizar das unidades que só o caso da
// lista longa tem baixa o pacote dele; e o Procurar de novo da T05 mostra o
// *Procurando…* (T05/05, o pacote 5) antes de a lista voltar.
const ESCONDE_T02 = '04-momento-busca-esconde-a-escolha'
const ESCONDE_T06 = '09-momento-busca-esconde-a-escolha'
export default [
  // ── T02 · o 03 abre pelo endereço, no mundo do caso lista-longa-garagens ──
  { abre: '?tela=T02&momento=03-momento-busca-sem-resultado' },
  { chega: 'T02', momento: '03-momento-busca-sem-resultado' },
  { ve: 'Nada com “Recreio”' },
  { ve: 'Confira o nome, ou busque pela cidade.' },
  { desligado: 'Escolha uma unidade' },
  { naoVe: 'Garagem Boa Viagem' },
  // o voltar do sistema não faz nada: a tela não tem saída desenhada (logica.md)
  { tecla: 'Escape' },
  { fica: 'T02', ms: 500 },
  { chega: 'T02', momento: '03-momento-busca-sem-resultado' },
  // a busca que acha: as unidades do caso, e o 03 sai da URL
  { digita: 'Recife', em: 'Buscar unidade ou cidade' },
  { chega: 'T02', momento: null },
  { naoVe: 'Nada com' },
  { ve: 'Garagem Boa Viagem' },
  { naoVe: 'Pátio Caruaru' },
  // outro nome que não existe: o vazio diz o termo novo
  { digita: 'Paulista', em: 'Buscar unidade ou cidade' },
  { chega: 'T02', momento: '03-momento-busca-sem-resultado' },
  { ve: 'Nada com “Paulista”' },
  { desligado: 'Escolha uma unidade' },
  // a escolha e o primário (R-14): a Várzea, que o mundo do herói também tem, sincroniza
  { digita: 'Várzea', em: 'Buscar unidade ou cidade' },
  { chega: 'T02', momento: null },
  { marca: 'Garagem Várzea' },
  { fica: 'T02', ms: 400 },
  { chega: 'T02', momento: null },
  { ve: 'Sincronizar Garagem Várzea' },
  // a busca que acha outra unidade esconde a escolha: o primário espera (decisão do diretor, 25/09, b),
  // e a URL diz o 04 (a otimização do design)
  { digita: 'Olinda', em: 'Buscar unidade ou cidade' },
  { ve: 'Garagem Olinda' },
  { naoVe: 'Garagem Várzea' },
  { chega: 'T02', momento: ESCONDE_T02 },
  { desligado: 'Escolha uma unidade' },
  { naoVe: 'Sincronizar' },
  // a busca que devolve a escolha: ele acende de novo, com o nome dela, e o 04 sai da URL
  { digita: 'Recife', em: 'Buscar unidade ou cidade' },
  { ve: 'Garagem Boa Viagem' },
  { ve: 'Sincronizar Garagem Várzea' },
  { naoVe: 'Escolha uma unidade' },
  { chega: 'T02', momento: null },
  // a busca sem resultado esconde a escolha, e o primário espera; a que volta a achar a devolve
  { digita: 'Recreio', em: 'Buscar unidade ou cidade' },
  { chega: 'T02', momento: '03-momento-busca-sem-resultado' },
  { desligado: 'Escolha uma unidade' },
  { digita: 'varzea', em: 'Buscar unidade ou cidade' },
  { chega: 'T02', momento: null },
  { ve: 'Sincronizar Garagem Várzea' },
  { toca: 'Sincronizar Garagem Várzea' },
  { chega: 'T03' },

  // ── T02 · o 04 pelo endereço: a Várzea escolhida, e Olin digitado a esconde ──
  { abre: `?tela=T02&momento=${ESCONDE_T02}` },
  { chega: 'T02', momento: ESCONDE_T02 },
  { ve: 'Garagem Olinda' },
  { ve: 'pacote de hoje, 06:15' },
  { ve: '12 ativos' },
  { naoVe: 'Garagem Várzea' },
  { desligado: 'Escolha uma unidade' },
  // a busca que devolve a Várzea: ela volta marcada, e o 04 sai da URL
  { digita: 'Recife', em: 'Buscar unidade ou cidade' },
  { chega: 'T02', momento: null },
  { ve: 'Sincronizar Garagem Várzea' },
  { digita: 'Olin', em: 'Buscar unidade ou cidade' },
  { chega: 'T02', momento: ESCONDE_T02 },
  // ── T02 → T03 · a unidade que só o caso tem sincroniza o pacote dele (pac-uo-12) ──
  { marca: 'Garagem Olinda' },
  { chega: 'T02', momento: null },
  { ve: 'Sincronizar Garagem Olinda' },
  { toca: 'Sincronizar Garagem Olinda' },
  { chega: 'T03' },
  { ve: 'GARAGEM OLINDA' },
  { ve: 'de 12' },
  { ve: 'pacote pct-uo12-2026-03-12 · 12/03 06:15' },
  { chega: 'T03', momento: '02-momento-concluido' },
  { ve: 'Pacote de hoje' },
  { ve: 'o pacote vale por 7 dias' },
  { ve: 'pacote pct-uo12-2026-03-12 · 12/03 14:30' },
  { toca: 'Ir para o menu' },
  { chega: 'T04' },
  { toca: 'Entendi' },
  { ve: 'GARAGEM OLINDA' },

  // ── T06 · o 08 no fluxo: a placa que não existe no pacote ──
  { abre: '?tela=T06' },
  { chega: 'T06', momento: null },
  { ve: 'Escolha o veículo que está na sua frente.' },
  { marca: 'RKT-8H42' },
  { fica: 'T06', ms: 400 },
  // a busca que acha outro ônibus esconde o marcado: o primário espera (decisão do diretor, 25/09, b)
  // e a URL diz o 09 (a otimização do design); com um termo na busca, a instrução sai, como a 09 desenha
  { digita: '1006', em: 'Buscar placa, frota ou módulo' },
  { ve: 'QJF-2C61' },
  { naoVe: 'RKT-8H42' },
  { chega: 'T06', momento: ESCONDE_T06 },
  { desligado: 'Usar este ativo' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  // a busca que devolve o marcado, junto com outros (as frotas 1003, 1006 e 1009): ele acende
  // de novo, o 09 sai da URL, e o primário leva à confirmação do marcado, e não de um dos outros
  { digita: '100', em: 'Buscar placa, frota ou módulo' },
  { ve: 'QJF-2C61' },
  { ve: 'PCX-9A17' },
  { ve: 'RKT-8H42' },
  { chega: 'T06', momento: null },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'RKT-8H42' },
  { toca: 'Escolher outro' },
  { chega: 'T06', momento: null },
  { marca: 'RKT-8H42' },
  { fica: 'T06', ms: 400 },
  { digita: 'ABC-1234', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: '08-momento-busca-sem-resultado' },
  { ve: 'Nada com “ABC-1234”' },
  { ve: 'Confira a placa, ou busque pela frota.' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  { desligado: 'Usar este ativo' },
  // a busca que acha: a lista volta com o ônibus marcado, e o 08 sai da URL; com o termo, sem a instrução
  { digita: 'rkt8h42', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: null },
  { naoVe: 'Nada com' },
  { ve: 'RKT-8H42' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'O M2C-0417 fica neste ativo, na Viação Atlântico Sul.' },   // o vínculo (pacote 1, a T06 sem o chassi)
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
  // a instrução sai com qualquer termo na busca (a última entrega): também na que acha, sem nada marcado
  { digita: 'QJF', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: null },
  { ve: 'QJF-2C61' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },

  // ── T06 · o 09 pelo endereço: o RKT-8H42 marcado, e PCX digitado o esconde ──
  { abre: `?tela=T06&momento=${ESCONDE_T06}` },
  { chega: 'T06', momento: ESCONDE_T06 },
  { ve: 'PCX-9A17' },
  { naoVe: 'RKT-8H42' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  { desligado: 'Usar este ativo' },
  // a busca que devolve o marcado: ele acende de novo, e leva à confirmação dele
  { digita: 'RKT', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: null },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'RKT-8H42' },
  { ve: 'O M2C-0417 fica neste ativo, na Viação Atlântico Sul.' },   // o vínculo (pacote 1, a T06 sem o chassi)

  // ── T05 · o Procurar de novo: a lista some, o *Procurando…* (05), e a lista volta (o pacote 5) ──
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { ve: 'Escolha o que está na sua mão.' },
  { toca: 'Procurar de novo' },
  // o *Procurando…*, com a URL dizendo a 05, no ritmo da busca (ritmos.js · buscaMs):
  // 1,2 s — 600 ms depois, ele ainda está na tela
  { chega: 'T05', momento: '05-momento-procurando' },
  { ve: 'Procurando…' },
  { ve: 'segunda tentativa' },
  { desligado: 'Procurar de novo' },
  { naoVe: 'Escolha o que está na sua mão.' },
  { dorme: 600 },
  { chega: 'T05', momento: '05-momento-procurando' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido', entre: [50, 1000] },
  { ve: 'Escolha o que está na sua mão.' },
  { naoVe: 'Procurando…' },
  { desligado: 'Conectar' },
  // da 00 também: o *Procurando…*, e a lista sem nada escolhido
  { abre: '?tela=T05' },
  { ve: 'ESCOLHIDO' },
  { toca: 'Procurar de novo' },
  { chega: 'T05', momento: '05-momento-procurando' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { desligado: 'Conectar' },
  // a terceira busca: o *Procurando…* sem a legenda — o textos.md só escreve as duas primeiras (G25)
  { toca: 'Procurar de novo' },
  { chega: 'T05', momento: '05-momento-procurando' },
  { naoVe: 'segunda tentativa' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  // pela URL, a 05 fica parada
  { abre: '?tela=T05&momento=05-momento-procurando' },
  { fica: 'T05', ms: 1600 },
  { chega: 'T05', momento: '05-momento-procurando' },
  { ve: 'Procurando…' },
]
