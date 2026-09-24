// O glifo de estado (folha 3). A cor carrega a natureza: lima é veredito,
// vermelho é falha, cinza é fato. Ícones do Lucide (G5), com o traço do
// token por classe. O nome pro leitor de tela é a legenda da folha 3 (G15).
// 'traco' e 'agora' não são ícones: são marcas (DS-V3).
import { CircleCheck, CircleX, Circle, WifiOff, Power, Pause, Clock, Moon, CircleMinus } from 'lucide-react'
import './Glifo.css'

// C11 · T16 (G11): os glifos que as telas desenham e a folha 3 não tem. Ficam
// fora de ESTADOS, que é a linha de glifos da folha (o espécime f3 a percorre).
// · 'traco-circulo' — o não se aplica da assertiva da sessão: o círculo com o
//   traço, apagado (T16/02 e 05, Faixa de contadores e Pontos de cerca). O nome
//   é o do traço da folha 3: 'não se aplica' (G15).
const FORA_DA_FOLHA = {
  'traco-circulo':  { Icone: CircleMinus, cor: 'marca',     nome: 'não se aplica' },
}

export const ESTADOS = {
  ok:               { Icone: CircleCheck, cor: 'lima',      nome: 'aprovado' },
  'ok-cinza':       { Icone: CircleCheck, cor: 'secundaria', nome: 'feito' },
  xis:              { Icone: CircleX,     cor: 'vermelho',  nome: 'falha' },
  traco:            { marca: 'traco',                        nome: 'não se aplica' },
  espera:           { Icone: Circle,      cor: 'marca',     nome: 'ainda não' },
  'sem-sinal':      { Icone: WifiOff,     cor: 'vermelho',  nome: 'o link caiu' },
  'sem-sinal-neutro': { Icone: WifiOff,   cor: 'secundaria', nome: 'sem conexão' },
  energia:          { Icone: Power,       cor: 'lima',      nome: 'é com você' },
  pausa:            { Icone: Pause,       cor: 'secundaria', nome: 'parou' },
  relogio:          { Icone: Clock,       cor: 'secundaria', nome: 'em andamento' },
  lua:              { Icone: Moon,        cor: 'secundaria', nome: 'em repouso' },
  agora:            { marca: 'agora',                        nome: 'o passo que corre' },
}

// o tamanho do glifo vem do poço: --glifo-<poço> (a linha de tamanhos da folha 3, G5)
export function Glifo({ estado = 'ok', poco = 24, nome, className = '' }) {
  const e = ESTADOS[estado] ?? FORA_DA_FOLHA[estado]
  const rotulo = nome ?? e.nome
  if (e.marca) return <span role="img" aria-label={rotulo} className={`ds-glifo-marca ds-glifo-${e.marca} ${className}`} />
  const { Icone } = e
  return (
    <span role="img" aria-label={rotulo} className={`ds-glifo ds-glifo-cor-${e.cor} ds-glifo-${poco} ${className}`}>
      <Icone aria-hidden="true" absoluteStrokeWidth={false} />
    </span>
  )
}
