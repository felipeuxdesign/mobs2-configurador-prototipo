// A nota (folha 4): a caixa tracejada com o rótulo em cima e uma frase. Não é
// aviso — não tem poço nem veredito. Dois tons:
//   explica · o que falta explicar (T05), tudo em --tinta-apagada
//   fato    · o fato declarado, com o nome dele em cima (T06, T16)
// antesDoRodape: a folga de 16 até o rodapé, quando a nota fecha o conteúdo.
import './caixas.css'
import './Nota.css'

// corpo (C4 · T03, G11): 'legenda' é a frase de 12 da folha; 'secundario' é a
// de 13, em 400 e mais aberta, da nota que diz o bloqueio (T03/04)
export function Nota({ tom = 'explica', titulo, frase, antesDoRodape = false, corpo = 'legenda' }) {
  return (
    <div className={`ds-nota ds-caixa-apagada ds-nota-${tom} ${antesDoRodape ? 'ds-nota-antes-do-rodape' : ''} ${corpo === 'secundario' ? 'ds-nota-corpo-secundario' : ''}`}>
      {titulo != null && <span className="ds-nota-titulo">{titulo}</span>}
      <span className="ds-nota-frase">{frase}</span>
    </div>
  )
}
