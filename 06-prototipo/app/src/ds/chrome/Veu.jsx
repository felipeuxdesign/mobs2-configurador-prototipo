// O véu (folha 2, por cima da tela): o fundo escuro atrás da folha e do
// diálogo. Ocupa o que sobra embaixo do topo (flex-grow) e põe a folha no pé
// ou o diálogo no meio. Esmaece junto: com a folha entra em 200ms, com o
// diálogo em 150ms, e sai em 150ms (movimento.md). A barra do sistema escurece
// junto pelo `veu` dela.
import './Veu.css'

// de: 'folha' (no pé) · 'dialogo' (no meio)
// `aoTocarFora` (T04/10 e 11, G11): tocar no véu, fora da folha, fecha a folha,
// como o X. Só o véu responde: o toque dentro da folha não chega aqui. Pro
// leitor de tela, quem fecha é o X da folha (e o voltar do sistema), e o véu
// continua sem papel. Sem ela, o véu de antes.
export function Veu({ de = 'folha', visivel = true, aoTocarFora, children }) {
  const fora = aoTocarFora ? (e) => { if (e.target === e.currentTarget) aoTocarFora() } : undefined
  return <div className={`ds-veu ds-veu-${de} ${visivel ? '' : 'ds-veu-oculto'}`} onClick={fora}>{children}</div>
}
