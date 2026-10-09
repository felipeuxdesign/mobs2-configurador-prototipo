// A folha de confirmação do reenvio (o retorno do PM de 09/10 · T09/13, 17 e 18, e a T11/06):
// antes de enviar um bloco que tem dependente, ela nomeia a consequência — o título, a frase —,
// e o técnico confirma ou cancela. Nenhuma peça nova: a folha (folha 2), com a frase e as duas
// ações do diálogo (o primário e a saída de 44, a 8 dele). A das cercas é do mock
// (M.consequenciaReenvio); a do ativo e a do leitor, a letra das referências (textos.js).
// Sobe e desce como toda folha (200 e 150, o véu esmaece junto), e fecha no X, tocando fora,
// arrastando e no Cancelar (lei 20). Quem mostra é a tela: ela põe a folha no véu dela.
import { Folha, Frase, Primario, Link } from '../../ds/index.js'
import { M } from '../../dados/mock.js'
import { T } from './textos.js'
import './FolhaDeConfirmacao.css'

export const consequenciaDe = (bloco) => M.consequenciaReenvio[bloco] ?? T.consequencia[bloco] ?? null

export function FolhaDeConfirmacao({ bloco, aberta, aoConfirmar, aoFechar }) {
  const c = consequenciaDe(bloco)
  if (!c) return null
  return (
    <Folha titulo={c.titulo} rotuloFechar={T.fechar} aoFechar={aoFechar} aberta={aberta}>
      <Frase>{c.texto}</Frase>
      <div className="ds-dialogo-acoes">
        <Primario aoTocar={aoConfirmar}>{T.reenviar[bloco]}</Primario>
        <Link aoTocar={aoFechar}>{T.cancelar}</Link>
      </div>
    </Folha>
  )
}
