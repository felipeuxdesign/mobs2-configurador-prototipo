// A pré-condição (folha 5 · a pré-condição dos pinos): a primeira linha da
// configuração, embaixo do título (T09, HU-T09-2). O glifo de 14 solto e a
// frase. Ela sobe 6 pra dentro do respiro do título, como a folha a põe.
import { Glifo } from '../index.js'
import './Precondicao.css'

export function Precondicao({ estado = 'ok', nomeGlifo, children }) {
  return (
    <span className="ds-precondicao">
      <Glifo estado={estado} poco={24} nome={nomeGlifo} />
      {children}
    </span>
  )
}
