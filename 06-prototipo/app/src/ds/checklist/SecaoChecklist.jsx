// A seção do checklist no acordeão (folha 7, "a seção aberta inteira"): a
// cabeça é a CabecaSecao da família linhas (folha 4); aberta, o corpo com os
// cartões (GradeCartoes de CartaoValor ou CartaoFoto) sangra até a borda do
// cartão da lista. Recolhida, só a cabeça, com o chevron de avançar.
// Vive na Lista da família linhas. Tocar na cabeça abre ou fecha.
// C10 · T13 (G11): `legenda` e `nomeGlifo` passam pra cabeça (F · não
// bloqueia; o nome do glifo pelo estado do dado, G15), e `divisoria` false
// tira o traço de baixo da última seção do acordeão, como a referência desenha
// (quem monta a lista decide a divisória, como nas linhas da Lista).
import { CabecaSecao } from '../linhas/index.js'
import './SecaoChecklist.css'

export function SecaoChecklist({ estado = 'aprovada', titulo, legenda, contagem, aberta = false, aoTocar, rotulo, nomeGlifo, divisoria = true, children }) {
  return (
    <div className={`ds-secao ${aberta ? 'ds-secao-aberta' : ''} ${divisoria ? '' : 'ds-secao-sem-divisoria'}`}>
      <CabecaSecao estado={estado} titulo={titulo} legenda={legenda} contagem={contagem} aberta={aberta} aoTocar={aoTocar} nomeGlifo={nomeGlifo}
        rotulo={rotulo ?? [titulo, legenda, contagem].filter(Boolean).join(', ')} />
      {aberta && <div className="ds-secao-corpo">{children}</div>}
    </div>
  )
}
