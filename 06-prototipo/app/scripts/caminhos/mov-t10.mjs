// A entrada da T10 segue o ônibus do fluxo normal; os quadros do caminhão agora são consultas.
// O palco não oferece um percurso alternativo de calibração. Processos consultados ficam quietos.
const PARADA = [{ quieto: true }, { dorme: 2200 }, { quieto: true }]
const consultas = [
  ['00-tela', 'Hodômetro'],
  ['01-momento-hodometro-semeado', 'relido às 14:30'],
  ['05-momento-hodometro-digitado', 'Semear o hodômetro'],
  ['06-momento-gravando-no-modulo', 'Gravando no módulo'],
  ['07-momento-relendo', 'Relendo'],
  ['08-momento-horimetro', 'Horímetro'],
  ['09-momento-calibracao-completa', 'Calibração completa'],
]
export default [
  { abre: '?tela=T10' },
  { ve: 'Nada a calibrar' },
  { ve: 'RKT-8H42' },
  ...PARADA,
  { toca: 'Fazer o ciclo de testes' },
  { chega: 'T14' },
  ...consultas.flatMap(([estado, texto]) => [
    { abre: `?tela=T10&estado=${estado}` },
    { chega: 'T10', estado },
    { ve: 'KNB-5H39' },
    { ve: texto },
    ...PARADA,
    { naoToca: 'ENCERRAR' },
    { tecla: 'Escape' },
    { chega: 'T10', estado },
  ]),
]
