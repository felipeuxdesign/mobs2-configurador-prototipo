// O palco · as famílias na coluna (o pacote 23, palco.md): o que nasce de outro quadro vem
// recuado embaixo dele, e a ordem conta a história — na T13, o detalhe, o não resolvido e o
// relido de cada falha da Seção C, com os nomes curtos; na T02, a busca embaixo da lista
// longa, a empresa escolhida embaixo do escolher a empresa, e a unidade escolhida embaixo das
// unidades com trocar. O momento da família abre pela coluna, parado, e o endereço que a
// coluna escreve reabre o mesmo quadro.
export default [
  { abre: '?tela=T13&estado=22-estado-gps-reprovado' },
  { janela: [1440, 900] },
  { chega: 'T13', estado: '22-estado-gps-reprovado' },
  { palco: 'Alimentação não resolvida' },
  { chega: 'T13', estado: '34-momento-alimentacao-nao-resolvida' },
  { ve: 'relido às 14:30 · ainda 0,6 V abaixo do mínimo' },
  { palco: 'Modem relido' },
  { chega: 'T13', estado: '33-momento-modem-relido' },
  { ve: 'relido às 14:30 · sinal bom' },
  { palco: 'Seção E · correção pedida' },
  { chega: 'T13', estado: '27-estado-secao-e-com-correcao-solicitada' },
  { abre: '?tela=T13&estado=35-momento-gps-nao-resolvido' },
  { chega: 'T13', estado: '35-momento-gps-nao-resolvido' },
  { ve: 'relido às 14:30 · ainda 1 abaixo do mínimo' },
  { abre: '?tela=T02&estado=02-estado-lista-longa-com-busca' },
  { chega: 'T02', estado: '02-estado-lista-longa-com-busca' },
  { palco: 'Busca sem resultado' },
  { chega: 'T02', estado: '03-momento-busca-sem-resultado' },
  { ve: 'Nada com “Recreio”' },
  { palco: 'Empresa escolhida' },
  { chega: 'T02', estado: '07-momento-empresa-escolhida' },
  { ve: 'Pra qual empresa hoje?' },
  { palco: 'Unidade escolhida' },
  { chega: 'T02', estado: '09-momento-unidade-escolhida-com-trocar-empresa' },
  { ve: 'Onde você está hoje?' },
  // o Voltar ao fluxo devolve o instante de antes do primeiro estado aberto pela coluna: o 02, que veio pelo endereço
  { palco: 'Voltar ao fluxo' },
  { chega: 'T02', estado: '02-estado-lista-longa-com-busca' },
]
