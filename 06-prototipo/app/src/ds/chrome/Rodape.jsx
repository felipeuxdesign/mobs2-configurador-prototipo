// O rodapé (folha 2): no máximo duas ações (Lei 8) — o primário de 56 e, se
// houver, o link com 48 de toque. Dois acréscimos que o estado pode trazer:
// a `legenda` em cima, que explica a ação e fica a 12 do botão, e a
// `explicacao` embaixo do primário desabilitado, enquanto o processo corre.
// O pé: fecha em 24 quando termina em link ou em texto, e em 32 quando
// termina no botão (leis de medida · nada visível a menos de 32 do pé).
// `lugar`: 'tela' (a folha 2 e as outras 15 telas) ou 'login' — o rodapé da
// T01, como as oito referências dela desenham (G11, T01-A11): sem o traço em
// cima, 20 dos lados e 28 no pé.
import { Primario } from '../primitivos/Primario.jsx'
import { Link } from '../primitivos/Link.jsx'
import './Rodape.css'

export function Rodape({ primario, aoPrimario, primarioDesabilitado = false, rotuloPrimario, link, aoLink, rotuloLink, legenda, explicacao, lugar = 'tela' }) {
  const fechaNoBotao = !link && !explicacao
  return (
    <div className={`ds-rodape ${fechaNoBotao ? 'ds-rodape-fecha-botao' : ''} ${lugar === 'login' ? 'ds-rodape-login' : ''}`}>
      {legenda && <span className="ds-rodape-legenda">{legenda}</span>}
      <Primario desabilitado={primarioDesabilitado} aoTocar={aoPrimario} rotulo={rotuloPrimario}>{primario}</Primario>
      {link && <Link className="ds-rodape-link" aoTocar={aoLink} rotulo={rotuloLink}>{link}</Link>}
      {explicacao && <span className="ds-rodape-explicacao">{explicacao}</span>}
    </div>
  )
}
