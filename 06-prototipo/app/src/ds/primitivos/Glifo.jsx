// O glifo de estado (folha 3). A cor carrega a natureza: lima é veredito,
// vermelho é falha, cinza é fato. Ícones do Lucide (G5), com o traço do
// token por classe. O nome pro leitor de tela é a legenda da folha 3 (G15).
// 'traco' e 'agora' não são ícones: são marcas (DS-V3).
import { CircleCheck, CircleX, Circle, Wifi, Power, Pause, Clock, Moon, CircleMinus, Info } from 'lucide-react'
import { riscado } from './Riscado.jsx'
import './Glifo.css'

// C11 · T16 (G11): os glifos que as telas desenham e a folha 3 não tem. Ficam
// fora de ESTADOS, que é a linha de glifos da folha (o espécime f3 a percorre).
// · 'traco-circulo' — o não se aplica da assertiva da sessão: o círculo com o
//   traço, apagado (T16/02 e 05, Faixa de contadores e Pontos de cerca). O nome
//   é o do traço da folha 3: 'não se aplica' (G15).
// · 'sem-conexao' — a última entrega (lei 21): o Wi-Fi inteiro com o Risco, no
//   aviso SEM CONEXÃO do login (T01/14), cinza. O 'sem-sinal' e o
//   'sem-sinal-neutro' da folha 3 usam o mesmo riscado(Wifi) (a revisão, 26/09):
//   a lei 21 proíbe a versão -off, e as referências deles (T03/01, T05/14, T09/02
//   e 03, T12/03, folhas 3 e 4) desenham o Wi-Fi inteiro com o risco por cima —
//   só sem o fio escuro, o desvio que vai ao arquiteto (ultima-conserto, padrão 1).
// · 'info' — a última entrega (T11/04, G11): o i no círculo da linha de condição
//   embaixo do título, cinza, na pré-condição (Precondicao) — a versão que não se
//   lê. Sem nome (null): a frase ao lado já diz tudo, e o glifo fica mudo pro
//   leitor (aria-hidden), em vez de um nome que nenhuma legenda da folha 3 dá.
const FORA_DA_FOLHA = {
  'traco-circulo':  { Icone: CircleMinus, cor: 'marca',     nome: 'não se aplica' },
  'sem-conexao':    { Icone: riscado(Wifi), cor: 'secundaria', nome: 'sem conexão' },
  info:             { Icone: Info,        cor: 'secundaria', nome: null },
}

export const ESTADOS = {
  ok:               { Icone: CircleCheck, cor: 'lima',      nome: 'aprovado' },
  'ok-cinza':       { Icone: CircleCheck, cor: 'secundaria', nome: 'feito' },
  xis:              { Icone: CircleX,     cor: 'vermelho',  nome: 'falha' },
  traco:            { marca: 'traco',                        nome: 'não se aplica' },
  espera:           { Icone: Circle,      cor: 'marca',     nome: 'ainda não' },
  'sem-sinal':      { Icone: riscado(Wifi), cor: 'vermelho',  nome: 'o link caiu' },
  'sem-sinal-neutro': { Icone: riscado(Wifi), cor: 'secundaria', nome: 'sem conexão' },
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
  // o glifo sem nome é só desenho: mudo pro leitor (o 'info')
  const papel = rotulo == null ? { 'aria-hidden': 'true' } : { role: 'img', 'aria-label': rotulo }
  return (
    <span {...papel} className={`ds-glifo ds-glifo-cor-${e.cor} ds-glifo-${poco} ${className}`}>
      <Icone aria-hidden="true" absoluteStrokeWidth={false} />
    </span>
  )
}
