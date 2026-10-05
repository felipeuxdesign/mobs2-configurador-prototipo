// T13 · a peça que só o nível do item desenha e que não tem linha no
// componentes.md (gate C0, T13 · 2): o instrumento do item automático
// reprovado. Montada com os primitivos do DS (Escala, a caixa de poço) — nada
// redesenhado. O visor da câmera do item manual, que era daqui, é o mesmo
// desenho da câmera da T10: virou uma peça só, ds/checklist/VisorCamera (o
// mundo real).
import { Escala, Glifo } from '../../ds/index.js'
import './pecas.css'

// O instrumento do item reprovado (T13/09): o poço com o traço de baixo
// vermelho (a falha mora no elemento, Lei 2), o rótulo em vermelho, o número
// de 48 na tinta, a barra de 22 com a faixa esperada, as três marcas e a frase.
// O que não é número (o pacote 12 · as entradas e o modem, T13/24 e 26): o rótulo, o
// valor escrito de 48, centrado, que quebra em duas linhas se precisar, e o porquê — sem régua.
// Relido e dentro (o pacote 13, T13/30 a 33 · a regra *reler no lugar* do componentes.md): o
// mesmo instrumento sem a falha — o traço de baixo do poço, o rótulo na tinta secundária, a marca
// branca — e, no lugar da frase, o check pequeno com *relido às · o veredito*, como o relido da T10.
export function InstrumentoDoItem({ rotulo, valor, unidade, escala, legendas, frase, texto, relido }) {
  const caixa = `t13-instrumento ds-caixa-poco ${relido ? '' : 'ds-caixa-falha'}`
  const pe = relido
    ? <span className="t13-instrumento-relido"><Glifo estado="ok" poco={24} />{relido}</span>
    : frase && <span className="t13-instrumento-frase">{frase}</span>
  const rot = <span className={`t13-instrumento-rotulo ${relido ? 't13-instrumento-rotulo-relido' : ''}`}>{rotulo}</span>
  if (texto != null) {
    return (
      <div className={caixa}>
        {rot}
        <span className="t13-instrumento-numero t13-instrumento-texto">{texto}</span>
        {pe}
      </div>
    )
  }
  return (
    <div className={caixa}>
      {rot}
      <span className="t13-instrumento-numero">{valor}{unidade && <span className="t13-instrumento-unidade">{unidade}</span>}</span>
      <Escala {...escala} tam="item" semLados falha={!relido} />
      <div className="t13-instrumento-legendas">
        <span>{legendas.min}</span><span className="t13-instrumento-faixa">{legendas.faixa}</span><span>{legendas.max}</span>
      </div>
      {pe}
    </div>
  )
}
