// A grade dos cartões (folha 7): os cartões em duas ou três colunas, a 8.
// Era a grade dos cartões de valor e de foto da seção aberta do checklist do
// C10; esses cartões saíram do design com a entrega do checklist (decisão 34),
// e a grade fica porque a T08 põe nela os mostradores da releitura da CAN
// (T08/00 a 02, três colunas). O CSS é o mesmo, pixel por pixel.
import './GradeCartoes.css'

export function GradeCartoes({ colunas = 2, children }) {
  return <div className={`ds-grade-cartoes ds-grade-cartoes-${colunas}`}>{children}</div>
}
