// A nota (folha 4): a caixa tracejada com o rótulo em cima e uma frase. Não é
// aviso — não tem poço nem veredito. Dois tons:
//   explica · o que falta explicar (T05), tudo em --tinta-apagada
//   fato    · o fato declarado, com o nome dele em cima (T06, T16)
// antesDoRodape: a folga de 16 até o rodapé, quando a nota fecha o conteúdo.
import './caixas.css'
import './Nota.css'

export function Nota({ tom = 'explica', titulo, frase, antesDoRodape = false }) {
  return (
    <div className={`ds-nota ds-caixa-apagada ds-nota-${tom} ${antesDoRodape ? 'ds-nota-antes-do-rodape' : ''}`}>
      {titulo != null && <span className="ds-nota-titulo">{titulo}</span>}
      <span className="ds-nota-frase">{frase}</span>
    </div>
  )
}
