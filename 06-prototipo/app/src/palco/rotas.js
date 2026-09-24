// A URL: todo lugar do protótipo tem endereço (logica.md, G20).
// ?tela=T07 · ?tela=T07&estado=01-estado-fora-da-faixa · ?tela=T05&momento=02-momento-um-encontrado
// A troca usa replaceState: o voltar do navegador sai do protótipo (G20).
import { NOMES, REFERENCIAS } from './telas.js'

export function lerUrl() {
  const q = new URLSearchParams(window.location.search)
  const tela = NOMES[q.get('tela')] ? q.get('tela') : 'T01'
  const valido = (tipo, nome) => nome && REFERENCIAS.some((r) => r.tela === tela && r.tipo === tipo && r.nome === nome)
  return {
    tela,
    estado: valido('estado', q.get('estado')) ? q.get('estado') : null,
    momento: valido('momento', q.get('momento')) ? q.get('momento') : null,
    print: q.get('print') === '1',
    textos: q.get('textos') === '1',
  }
}

export function escreverUrl({ tela, estado, momento }) {
  const q = new URLSearchParams(window.location.search)
  q.set('tela', tela)
  estado ? q.set('estado', estado) : q.delete('estado')
  momento ? q.set('momento', momento) : q.delete('momento')
  window.history.replaceState(null, '', '?' + q.toString())
}
