// O rodapé (folha 2): no máximo duas ações (Lei 8) — o primário de 56 e, se
// houver, o link com 48 de toque. Dois acréscimos que o estado pode trazer:
// a `legenda` em cima, que explica a ação, e a `explicacao` embaixo do
// primário desabilitado, enquanto o processo corre.
// O pé: fecha em 24 quando termina em link ou em texto, e em 32 quando
// termina no botão (leis de medida · nada visível a menos de 32 do pé).
// `lugar`: 'tela' (a folha 2 e as outras 15 telas) ou 'login' — o rodapé da
// T01, como as oito referências dela desenham (G11, T01-A11): sem o traço em
// cima, 20 dos lados e 28 no pé.
// O toque do rodapé (decisão 38, a otimização do design): com o link, o alto
// é 13 e o vão, 8 — o link fica a 8 do primário, com o desenho de 44 que come
// 5 embaixo, e o toque de 48 cresce só pra baixo, pro lado livre; a altura do
// rodapé é a de antes. A legenda fica a 6 + 8 do botão (era 12), e a junta, a 8.
// Sem o link (uma ação, a explicação) e com o link registrado, que não é
// tocável (T14/06), o rodapé segue com o alto de 14 e o vão de 6, como as
// referências desenham.
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
// `legendaJunta` (C10 · T13, G11): a legenda só com o vão do rodapé, a 8 do
// botão (decisão 38), como as referências da T13 desenham (T13-A19); sem ela,
// a 6 + 8 da folha 2.
// `linkDesabilitado` (a entrega do checklist · T10, a decisão do diretor de
// 25/09): o link que não faz nada enquanto um processo que não pode parar
// corre — o semear da calibração — fica no lugar, desabilitado de verdade e em
// --tinta-apagada (a lei 17, Link): o toque não faz nada, e o leitor ouve
// desabilitado (a regra 12).
// `primarioAcende` e `primarioTrocaTexto` (C12 · o movimento fino): passam ao
// Primario o acender por camada (C12·8) e o texto que esmaece no lugar (C12·23);
// quem liga é a tela, onde a linha dela pede. Sem eles, o primário troca direto.
export function Rodape({ primario, aoPrimario, primarioDesabilitado = false, primarioInerte = false, rotuloPrimario, primarioAcende = false, primarioTrocaTexto = false, link, aoLink, rotuloLink, linkRegistrado = false, linkDesabilitado = false, legenda, legendaJunta = false, explicacao, lugar = 'tela', pe }) {
  const fechaNoBotao = pe ? pe === 'botao' : !link && !explicacao
  // o link tocável (o desabilitado também: ele fica no lugar) leva o toque da decisão 38
  const comLink = Boolean(link) && !linkRegistrado
  return (
    <div className={`ds-rodape ${fechaNoBotao ? 'ds-rodape-fecha-botao' : ''} ${lugar === 'login' ? 'ds-rodape-login' : ''} ${comLink ? 'ds-rodape-com-link' : ''}`}>
      {legenda && <span className={`ds-rodape-legenda ${legendaJunta ? 'ds-rodape-legenda-junta' : ''}`}>{legenda}</span>}
      <Primario desabilitado={primarioDesabilitado} inerte={primarioInerte} aoTocar={aoPrimario} rotulo={rotuloPrimario}
        acende={primarioAcende} trocaTexto={primarioTrocaTexto}>{primario}</Primario>
      {link && <Link className="ds-rodape-link" aoTocar={aoLink} rotulo={rotuloLink} registrado={linkRegistrado} desabilitado={linkDesabilitado}>{link}</Link>}
      {explicacao && <span className="ds-rodape-explicacao">{explicacao}</span>}
    </div>
  )
}
