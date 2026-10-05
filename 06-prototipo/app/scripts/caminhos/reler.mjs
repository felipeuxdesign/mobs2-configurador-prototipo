// T13 · o Reler o módulo (o pacote 13 e o 23): o detalhe de um item reprovado relê o
// módulo ali mesmo, sem ir à T07, e o mock vem em sequência — a 1ª releitura ainda
// reprova, a 2ª passa. O endereço do 29 é o 1º toque no Reler da Alimentação (nos
// estados da coluna o app está parado, decisão 43, e no fluxo nenhum módulo da busca
// chega na Seção C reprovada): o botão diz Relendo o módulo…, desligado, com o link e o
// ENCERRAR apagados · 1 s depois (RITMOS.relerModuloMs), o não resolvido (34): 11,4 V,
// ainda vermelho, o xis com o relido e o que ainda falta, o O que conferir e o Reler de
// novo · o 2º toque: Relendo de novo, com o xis ainda na tela, e o relido (30): 13,8 V,
// o check e um botão só · o Voltar ao checklist volta à C do mesmo ônibus, toda
// atualizada, e o que passou é leitura, sem seta. O GPS, do não resolvido (35) pelo
// endereço: um toque e o relido (31); o voltar do Android faz o Voltar ao checklist.
export default [
  { abre: '?tela=T13&momento=29-momento-relendo-o-modulo' },
  { chega: 'T13', momento: '29-momento-relendo-o-modulo' },
  { desligado: 'Relendo o módulo…' },
  { desligado: 'Voltar ao checklist' },
  { desligado: 'ENCERRAR' },
  { ve: '10,9' },
  { ve: 'O QUE CONFERIR' },
  { chega: 'T13', momento: '34-momento-alimentacao-nao-resolvida' },
  { ve: '11,4' },
  { ve: 'relido às 14:30 · ainda 0,6 V abaixo do mínimo' },
  { ouve: 'falha' },
  { ve: 'O QUE CONFERIR' },
  { toca: 'Reler o módulo' },
  { desligado: 'Relendo o módulo…' },
  { ve: 'relido às 14:30 · ainda 0,6 V abaixo do mínimo' },
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
  { abre: '?tela=T13&momento=35-momento-gps-nao-resolvido' },
  { chega: 'T13', momento: '35-momento-gps-nao-resolvido' },
  { ve: 'relido às 14:30 · ainda 1 abaixo do mínimo' },
  { toca: 'Reler o módulo' },
  { chega: 'T13', momento: '31-momento-gps-relido' },
  { ve: 'relido às 14:30 · dentro da faixa' },
  { naoVe: 'O QUE CONFERIR' },
  { tecla: 'Escape' },
  { chega: 'T13', momento: '03-momento-c-hardware-aberta' },
  { ve: 'RKT-8H42' },
  { ve: '9 satélites' },
  { naoToca: 'GPS e antena' },
]
