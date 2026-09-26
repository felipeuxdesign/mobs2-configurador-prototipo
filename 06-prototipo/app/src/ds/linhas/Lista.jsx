// A lista em cartão (folha 4): o recipiente das linhas — pré-checagem,
// passos, assertivas, histórico, unidades. Quem monta a tela decide a
// divisória de cada linha (a última às vezes fica, às vezes sai: T05 mantém,
// T02 e T04 tiram), pela prop `divisoria` da linha.
// recheio: 'padrao' (0 · 12) ou 'passos' (2 · 12, a lista da T14).
// Numa lista de escolha (unidades), quem monta passa role="radiogroup" e o
// nome dela (aria-label): as linhas de escolha e de unidade são role="radio".
import './Lista.css'

export function Lista({ recheio = 'padrao', children, className = '', ...resto }) {
  return <div className={`ds-lista ${recheio === 'passos' ? 'ds-lista-passos' : ''} ${className}`} {...resto}>{children}</div>
}
