// T13 · o Reler o módulo (o pacote 13): o detalhe de um item reprovado relê o módulo
// ali mesmo, sem ir à T07. O endereço do 29 é o toque no Reler da Alimentação (nos
// estados da coluna o app está parado, decisão 43): o botão diz Relendo o módulo…,
// desligado, com o link e o ENCERRAR apagados e o voltar sem fazer nada, e o O que
// conferir ainda na tela · 1 s depois (RITMOS.relerModuloMs), a mesma tela positiva
// (30): 13,8 V, o relido e o veredito, sem o O que conferir e com um botão só · o
// Voltar ao checklist volta à C do mesmo ônibus, toda atualizada (a releitura lê o
// módulo inteiro), e o que passou é leitura, sem seta. O GPS relido (31), pelo
// endereço: o voltar do Android faz o Voltar ao checklist.
export default [
  { abre: '?tela=T13&momento=29-momento-relendo-o-modulo' },
  { chega: 'T13', momento: '29-momento-relendo-o-modulo' },
  { desligado: 'Relendo o módulo…' },
  { desligado: 'Voltar ao checklist' },
  { desligado: 'ENCERRAR' },
  { ve: '10,9' },
  { ve: 'O QUE CONFERIR' },
  { chega: 'T13', momento: '30-momento-alimentacao-relida' },
  { ve: '13,8' },
  { ve: 'relido às 14:30 · dentro da faixa' },
  { naoVe: 'O QUE CONFERIR' },
  { naoToca: 'Reler o módulo' },
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: '03-momento-c-hardware-aberta' },
  { ve: 'M2C-0301' },
  { ve: '13,8 V' },
  { naoToca: 'Alimentação' },
  { abre: '?tela=T13&momento=31-momento-gps-relido' },
  { chega: 'T13', momento: '31-momento-gps-relido' },
  { ve: 'relido às 14:30 · dentro da faixa' },
  { naoVe: 'O QUE CONFERIR' },
  { tecla: 'Escape' },
  { chega: 'T13', momento: '03-momento-c-hardware-aberta' },
  { ve: 'RKT-8H42' },
  { ve: '9 satélites' },
  { naoToca: 'GPS e antena' },
]
