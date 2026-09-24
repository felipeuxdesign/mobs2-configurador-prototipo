// O registro das telas: T01 a T16. Tela ainda não construída cai na Vazia.
import { Vazia } from './Vazia.jsx'

const TELAS = {} // cada ciclo de tela acrescenta a sua

export function telaDe(id) { return TELAS[id] ?? ((p) => <Vazia tela={id} {...p} />) }
