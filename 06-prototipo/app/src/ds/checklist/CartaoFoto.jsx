// O cartão de foto (folha 7, Seção B do checklist): o visor de 46 e o nome
// embaixo. Aguarda: o traço no visor. Tirada: o check lima surge no lugar do
// traço (opacidade, 150ms · T13 animacao.md) e o nome passa a secundário.
// Tocar responde o item (a foto, ou não conforme).
// desabilitado (C10 · T13/02, G11): o item que outra tela já resolveu (o
// Painel, que herda a foto da calibração, HU-T10-4) não se responde de novo —
// o mesmo desenho, sem toque, e desabilitado pro leitor.
import { Tocavel, Icone } from '../index.js'
import './CartaoFoto.css'

export function CartaoFoto({ nome, tirada = false, aoTocar, rotulo, desabilitado = false }) {
  return (
    <Tocavel rotulo={rotulo ?? nome} aoTocar={aoTocar} desabilitado={desabilitado} className={`ds-cartao-foto ${tirada ? 'ds-cartao-foto-tirada' : ''}`}>
      <span className="ds-cartao-foto-visor">
        <span className="ds-cartao-foto-traco" />
        <span className="ds-cartao-foto-feito"><Icone nome="check" tam={20} cor="lima" /></span>
      </span>
      <span className="ds-cartao-foto-nome">{nome}</span>
    </Tocavel>
  )
}
