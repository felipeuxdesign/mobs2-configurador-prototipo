// Os ícones que não são glifo de estado: as 10 ferramentas do menu e os de
// ação (fechar, chevron, olho, lupa, câmera…). Lucide, com o traço por classe
// (Lei 14): ferramenta e ação 1,8 · fechar e chevron 2,2 · check mini 2,6.
// No menu, os nomes da G5: settings, wrench, activity, list-checks, truck.
import {
  Radio, Truck, Activity, Settings, RefreshCcw, Gauge, Wrench, ListChecks, Upload, History,
  X, ChevronRight, ChevronDown, ChevronUp, RotateCw, Mail, UserRound, Eye, Search, Camera, Image, Check, ArrowUp,
} from 'lucide-react'
import './Icone.css'

export const ICONES = {
  // ferramentas (folha 3)
  conectar: [Radio, 'acao'], ativo: [Truck, 'acao'], can: [Activity, 'acao'], configurar: [Settings, 'acao'],
  refazer: [RefreshCcw, 'acao'], calibracao: [Gauge, 'acao'], conferir: [Wrench, 'acao'],
  checklist: [ListChecks, 'acao'], fila: [Upload, 'acao'], instalacoes: [History, 'acao'],
  // ação
  fechar: [X, 'fechar'], avancar: [ChevronRight, 'fechar'], abrir: [ChevronDown, 'fechar'], recolher: [ChevronUp, 'fechar'],
  reenviar: [RotateCw, 'acao'], email: [Mail, 'acao'], gestor: [UserRound, 'acao'], olho: [Eye, 'acao'],
  busca: [Search, 'acao'], camera: [Camera, 'acao'], foto: [Image, 'acao'], subir: [ArrowUp, 'acao'],
  check: [Check, 'fechar'], 'check-mini': [Check, 'mini'],
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
