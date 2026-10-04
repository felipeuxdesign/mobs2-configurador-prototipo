// A etiqueta do palco: o ciclo e a data do CHANGELOG, escritos à mão no
// commit de cada ciclo (G19). Nunca do relógio (CLAUDE.md: zero new Date()).
export const VERSAO = { ciclo: 'pacote 11', data: '2026-10-04' }
// o pé do painel diz a data da última atualização, como se lê no Brasil (o diretor, 04/10): 04/10/2026
export const atualizadoEm = () => VERSAO.data.split('-').reverse().join('/')
