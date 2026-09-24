// A nota (folha 4): a caixa tracejada com o rótulo em cima e uma frase. Não é
// aviso — não tem poço nem veredito. Dois tons:
//   explica · o que falta explicar (T05), tudo em --tinta-apagada
//   fato    · o fato declarado, com o nome dele em cima (T06, T16)
//   achado  · C11 (G11): o que a leitura achou e não classifica (T11/01) — a
//             borda do poço, 10 · 12, 2 entre o rótulo e a frase, os dois em
//             --tinta-secundaria, a frase de 13 a 1,4
// antesDoRodape: a folga de 16 até o rodapé, quando a nota fecha o conteúdo.
import './caixas.css'
import './Nota.css'

// corpo (C4 · T03, G11): 'legenda' é a frase de 12 da folha; 'secundario' é a
// de 13, em 400 e mais aberta, da nota que diz o bloqueio (T03/04); 'item'
// (C10 · T13/09, G11) é a de 13, em 400, na entrelinha da frase da caixa
// apagada, da nota do item que não se marca à mão
// C11 · T16/04 (G11): 'pulado' é a de 13, em 500 e --tinta-secundaria, da nota
// que diz o que não rodou (NÃO RODARAM), embaixo do rótulo apagado do tom explica
export function Nota({ tom = 'explica', titulo, frase, antesDoRodape = false, corpo = 'legenda' }) {
  return (
    <div className={`ds-nota ds-caixa-apagada ds-nota-${tom} ${antesDoRodape ? 'ds-nota-antes-do-rodape' : ''} ${corpo === 'secundario' ? 'ds-nota-corpo-secundario' : ''} ${corpo === 'item' ? 'ds-nota-corpo-item' : ''} ${corpo === 'pulado' ? 'ds-nota-corpo-pulado' : ''}`}>
      {titulo != null && <span className="ds-nota-titulo">{titulo}</span>}
      <span className="ds-nota-frase">{frase}</span>
    </div>
  )
}
