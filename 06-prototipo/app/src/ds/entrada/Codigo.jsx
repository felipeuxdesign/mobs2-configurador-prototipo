// O código de recuperação (folha 6, T01): uma célula por dígito, 58 de alto,
// 6 entre elas, todas da mesma largura (a célula vazia não encolhe). Em foco,
// o traço lima marca a célula do próximo dígito — com os seis digitados, a
// última. Errado: as seis ficam com o traço vermelho (a falha mora no
// elemento, Lei 2). Cada dígito surge em 100ms e o traço pula pra próxima
// (T01 animacao.md). Com `aoDigitar`, uma entrada invisível por cima recebe
// o teclado numérico.
import './Codigo.css'

export function Codigo({ digitos = '', celulas = 6, focado = false, errado = false, rotulo, aoDigitar }) {
  const foco = focado && !errado ? Math.min(digitos.length, celulas - 1) : -1
  return (
    <div className={`ds-codigo ${errado ? 'ds-codigo-errado' : ''}`} role={aoDigitar ? undefined : 'group'} aria-label={aoDigitar ? undefined : rotulo}>
      {Array.from({ length: celulas }, (_, i) => {
        const d = digitos[i] ?? ''
        return (
          <span key={i} className={`ds-codigo-celula ${i === foco ? 'ds-codigo-foco' : ''}`} aria-hidden={aoDigitar ? true : undefined}>
            <span className={`ds-codigo-digito ${d ? 'ds-codigo-cheio' : ''}`}>{d}</span>
          </span>
        )
      })}
      {aoDigitar && (
        <input
          className="ds-codigo-entrada"
          value={digitos}
          onChange={(e) => aoDigitar(e.target.value.replace(/\D/g, '').slice(0, celulas))}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={celulas}
          aria-label={rotulo}
        />
      )}
    </div>
  )
}
