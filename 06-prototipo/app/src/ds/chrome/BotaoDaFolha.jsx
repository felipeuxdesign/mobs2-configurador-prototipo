// O botão de saída da folha (folha 2, o Sair da conta · T04/05): 52 de alto,
// fundo de cartão com a borda, texto 15/700 em --tinta. Tocável inteiro: no
// toque, a camada --elevado por cima, sem sangrar (G14). Não é o secundário
// da folha 6 (--elevado com borda neutra, 16px): é o desenho da folha da conta.
import { Tocavel } from '../primitivos/Tocavel.jsx'
import './BotaoDaFolha.css'

export function BotaoDaFolha({ children, aoTocar, rotulo, forcaToque = false }) {
  return (
    <Tocavel className={`ds-botao-folha ${forcaToque ? 'ds-forca-toque' : ''}`} rotulo={rotulo} aoTocar={aoTocar}>
      <span>{children}</span>
    </Tocavel>
  )
}
