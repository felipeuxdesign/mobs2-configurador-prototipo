// A escala (folha 5): a barra em poço. A faixa diz onde o valor deveria
// estar, o marcador diz onde ele está (Lei 5). Tudo se posiciona pela conta
// do valor na escala — min, max, a faixa e os riscos —, nunca por % copiado.
// A faixa só tem borda do lado que fica dentro da escala: a faixa aberta pra
// cima não tem a da direita, e a que cobre a escala inteira não tem nenhuma.
// No prazo e no placar a faixa é o preenchido (de min até o valor, Lei 6).
// O marcador para na borda: no fim da escala ele encosta por dentro.
// Com `corre`, o marcador corre de zero até o valor (T07 · animacao.md), só
// por transform; com reduzir movimento, aparece no valor.
import './Escala.css'

const noIntervalo = (v, a, b) => Math.min(b, Math.max(a, v))
const perto = (a, b) => Math.abs(a - b) < 1e-9

export function Escala({
  min, max, valor, faixa, pctInteiro,
  divisoes, marcas, fortes = [],
  tam = 'leitura', falha = false, corre = false,
  semLados = false, // C4 · T03 (G11): a barra do download, o desenho do placar sem as bordas dos lados
  vazia = false,    // C8 · T07 (G11): o poço vazio do sinal que não chegou — só o traço no meio (T07/02)
}) {
  if (vazia) {
    return (
      <div className={`ds-escala ds-escala-${tam} ds-escala-vazia`} aria-hidden="true">
        <span className="ds-escala-vazia-traco" />
      </div>
    )
  }
  // pctInteiro: a posição arredondada ao % inteiro, como a folha desenha o placar (21 de 31 → 68%)
  const pct = (v) => { const p = (100 * (noIntervalo(v, min, max) - min)) / (max - min); return pctInteiro ? Math.round(p) : p }
  // os riscos: n divisões iguais da escala, ou os valores dados
  const riscos = divisoes
    ? Array.from({ length: divisoes - 1 }, (_, i) => min + ((i + 1) * (max - min)) / divisoes)
    : marcas ?? []
  const de = faixa ? (faixa.de ?? min) : null
  const ate = faixa ? (faixa.ate ?? max) : null
  return (
    <div className={`ds-escala ds-escala-${tam} ${falha ? 'ds-escala-falha' : ''} ${semLados ? 'ds-escala-sem-lados' : ''}`} aria-hidden="true">
      {faixa && (
        <div
          className={`ds-escala-faixa ${de > min ? 'ds-escala-faixa-de' : ''} ${ate < max ? 'ds-escala-faixa-ate' : ''}`}
          style={{ '--de': pct(de), '--ate': pct(ate) }}
        />
      )}
      {riscos.map((r) => (
        <span
          key={r}
          className={`ds-escala-risco ${fortes.some((f) => perto(f, r)) ? 'ds-escala-risco-forte' : ''}`}
          style={{ '--p': pct(r) }}
        />
      ))}
      {valor != null && (
        <div className={`ds-escala-agulha ${corre ? 'ds-escala-corre' : ''}`} style={{ '--pos': pct(valor) }}>
          <div className="ds-escala-marcador" />
        </div>
      )}
    </div>
  )
}
