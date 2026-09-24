// A linha de seção do mapa do checklist (folha 7, T13): o veredito no poço
// de 32, o nome da seção, a contagem e o chevron. Tocar abre a seção.
// Vive na Lista da família linhas (o cartão da lista, recheio lateral 12).
// estado — o mesmo vocabulário da CabecaSecao (linhas), e o que ele muda na
// linha é conteúdo, não lugar (Lei 3):
//   aprovada  → check lima
//   pendente  → o círculo cinza, e a contagem em --tinta: é o que falta fazer
//   aguarda   → o relógio apagado, nome e contagem apagados: espera outra tela
//   reprovada → o X vermelho
// legenda: a linha abaixo do nome (F · não bloqueia), numa linha de 60.
import { Tocavel, Poco, Glifo, Icone } from '../index.js'
import './LinhaSecaoMapa.css'

const GLIFO = { aprovada: 'ok', pendente: 'espera', aguarda: 'relogio', reprovada: 'xis' }

export function LinhaSecaoMapa({ estado = 'aprovada', titulo, legenda, contagem, divisoria = true, aoTocar, rotulo }) {
  const classes = ['ds-linha-secao-mapa', `ds-linha-secao-mapa-${estado}`]
  if (legenda) classes.push('ds-linha-secao-mapa-com-legenda')
  if (!divisoria) classes.push('ds-linha-secao-mapa-sem-divisoria')
  return (
    <Tocavel rotulo={rotulo ?? [titulo, legenda, contagem].filter(Boolean).join(', ')} aoTocar={aoTocar} className={classes.join(' ')}>
      <Poco tam={32}><Glifo estado={GLIFO[estado]} poco={30} className="ds-linha-secao-mapa-glifo" /></Poco>
      <span className="ds-linha-secao-mapa-texto">
        <span className="ds-linha-secao-mapa-titulo">{titulo}</span>
        {legenda && <span className="ds-linha-secao-mapa-legenda">{legenda}</span>}
      </span>
      <span className="ds-linha-secao-mapa-contagem">{contagem}</span>
      <Icone nome="avancar" tam={16} cor="marca" />
    </Tocavel>
  )
}
