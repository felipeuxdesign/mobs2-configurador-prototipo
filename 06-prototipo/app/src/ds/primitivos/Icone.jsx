// Os ícones que não são glifo de estado: as 10 ferramentas do menu e os de
// ação (fechar, chevron, olho, lupa, câmera…). Lucide, com o traço por classe
// (Lei 14): ferramenta e ação 1,8 · fechar e chevron 2,2 · check mini 2,6.
// No menu, os nomes da G5: settings, wrench, activity, list-checks, truck.
import {
  Radio, Truck, Activity, Settings, RefreshCcw, Gauge, Wrench, ListChecks, Upload, History,
  X, ChevronRight, ChevronDown, ChevronUp, RotateCw, Mail, UserRound, Search, Camera, Image, Check, ArrowUp,
} from 'lucide-react'
import './Icone.css'

// A exceção da Lei 14: o olho da senha não é o do Lucide. É desenhado no app — a
// amêndoa baixa e a pupila inteiras — e o riscado é o MESMO olho, com um risco
// diagonal por cima, que tem uma borda da cor do fundo do campo (o poço) pra
// cortar o contorno onde passa. O desenho é o do SVG da referência (T01/00 e 10)
// e o da folha 6. O traço é o das ações, pela classe (1,8).
function OlhoSenha() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z" /><circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function OlhoSenhaRiscado() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z" /><circle cx="12" cy="12" r="3" />
      <line className="ds-olho-corte" x1="3.5" y1="3.5" x2="20.5" y2="20.5" /><line x1="3.5" y1="3.5" x2="20.5" y2="20.5" />
    </svg>
  )
}

export const ICONES = {
  // ferramentas (folha 3)
  conectar: [Radio, 'acao'], ativo: [Truck, 'acao'], can: [Activity, 'acao'], configurar: [Settings, 'acao'],
  refazer: [RefreshCcw, 'acao'], calibracao: [Gauge, 'acao'], conferir: [Wrench, 'acao'],
  checklist: [ListChecks, 'acao'], fila: [Upload, 'acao'], instalacoes: [History, 'acao'],
  // ação
  fechar: [X, 'fechar'], avancar: [ChevronRight, 'fechar'], abrir: [ChevronDown, 'fechar'], recolher: [ChevronUp, 'fechar'],
  reenviar: [RotateCw, 'acao'], email: [Mail, 'acao'], gestor: [UserRound, 'acao'], olho: [OlhoSenha, 'acao'], 'olho-riscado': [OlhoSenhaRiscado, 'acao'],
  busca: [Search, 'acao'], camera: [Camera, 'acao'], foto: [Image, 'acao'], subir: [ArrowUp, 'acao'],
  // C11 · T15/01: a seta do SUBINDO AGORA, ao lado do rótulo — faz o papel do
  // glifo de estado do cartão (o xis do cartão que pede ação), com o traço dele, 2,2
  subindo: [ArrowUp, 'fechar'],
  check: [Check, 'fechar'], 'check-mini': [Check, 'mini'],
  // a entrega de 25/09 · T10/10: o xis solto do "não confere", na régua da
  // diferença — o vermelho da falha, de 14, com o traço 2,6 da referência
  'xis-mini': [X, 'mini'],
}

// tam: o lado do ícone, por token (--icone-*)
export function Icone({ nome, tam = 18, cor = 'secundaria', className = '' }) {
  const [Comp, classe] = ICONES[nome]
  return (
    <span aria-hidden="true" className={`ds-icone ds-icone-${classe} ds-icone-tam-${tam} ds-icone-cor-${cor} ${className}`}>
      <Comp absoluteStrokeWidth={false} />
    </span>
  )
}
