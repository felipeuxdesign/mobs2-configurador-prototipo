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

// `pe` (C6 · T05, G11): 'botao' fecha em 32 mesmo com a explicação embaixo
// (o processo correndo da T05/10, como a referência desenha); sem ele, o pé
// segue a regra de cima.
// `primarioInerte` (C9 · T10·4): o primário fica parado um instante, com o mesmo
// desenho e o mesmo texto, sem responder (Primario inerte).
// `linkRegistrado` (C10 · T14/06): depois do toque, o link vira o registro do
// pedido, no mesmo lugar (Link registrado) — o `link` passa a ser o que ficou feito.
// `legendaJunta` (C10 · T13, G11): a legenda a 6 do botão, só o vão do rodapé,
// como as referências da T13 desenham (T13-A19); sem ela, a 12 da folha 2.
export function Rodape({ primario, aoPrimario, primarioDesabilitado = false, primarioInerte = false, rotuloPrimario, link, aoLink, rotuloLink, linkRegistrado = false, legenda, legendaJunta = false, explicacao, lugar = 'tela', pe }) {
  const fechaNoBotao = pe ? pe === 'botao' : !link && !explicacao
  return (
    <div className={`ds-rodape ${fechaNoBotao ? 'ds-rodape-fecha-botao' : ''} ${lugar === 'login' ? 'ds-rodape-login' : ''}`}>
      {legenda && <span className={`ds-rodape-legenda ${legendaJunta ? 'ds-rodape-legenda-junta' : ''}`}>{legenda}</span>}
      <Primario desabilitado={primarioDesabilitado} inerte={primarioInerte} aoTocar={aoPrimario} rotulo={rotuloPrimario}>{primario}</Primario>
      {link && <Link className="ds-rodape-link" aoTocar={aoLink} rotulo={rotuloLink} registrado={linkRegistrado}>{link}</Link>}
      {explicacao && <span className="ds-rodape-explicacao">{explicacao}</span>}
    </div>
  )
}
