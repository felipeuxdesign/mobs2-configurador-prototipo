// Os ícones que não são glifo de estado: as 10 ferramentas do menu e os de
// ação (fechar, chevron, olho, lupa, câmera…). Lucide, com o traço por classe
// (Lei 14): ferramenta e ação 1,8 · fechar e chevron 2,2 · check mini 2,6 · e o
// xis de limpar do usuário lembrado, 2, que a T01/16 e a folha 6 desenham fora
// das classes da lei (desvio nomeado, pro arquiteto).
// No menu, os nomes da G5: settings, wrench, activity, list-checks, truck.
import {
  Radio, Truck, Activity, Settings, RefreshCcw, Gauge, Wrench, ListChecks, Upload, History,
  X, ChevronRight, ChevronDown, ChevronUp, RotateCw, Mail, UserRound, Search, Camera, Image, Check, ArrowUp,
  Bluetooth, Route, FileText,
} from 'lucide-react'
import { Risco, riscado } from './Riscado.jsx'
import './Icone.css'

// A exceção da Lei 14: o olho da senha não é o do Lucide. É desenhado no app — a
// amêndoa baixa e a pupila inteiras — e o riscado é o MESMO olho, com o Risco
// por cima (lei 21, Riscado.jsx: o corte da cor do poço abre o fio escuro no
// contorno onde o risco passa). O desenho é o do SVG da referência (T01/00 e 10)
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
      <Risco />
    </svg>
  )
}

// a rodada 3 do retorno do PM · T01/04 e 11: a seta que volta, do *Usar outro dado*
// (volta pra primeira etapa) — o desenho da referência, traço 1,8
function VoltarEtapa() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 6l-6 6 6 6" /><path d="M4 12h12a4 4 0 0 1 4 4v2" />
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
  // o mundo real · T05/16 e 17: o Bluetooth riscado, no poço de 44 do bloco da
  // busca que não começa — o desligado e o sem permissão, o mesmo desenho. A
  // última entrega (lei 21): o Bluetooth inteiro com o Risco, e não mais o
  // BluetoothOff do Lucide
  'bluetooth-desligado': [riscado(Bluetooth), 'acao'],
  // o mundo real · T10/11: a câmera riscada, no visor da câmera do app sem a
  // permissão — a da T10 e a do item manual da T13 (VisorCamera). A última
  // entrega (lei 21): a câmera inteira, a mesma do `camera`, com o Risco, e
  // não mais o CameraOff do Lucide
  'camera-negada': [riscado(Camera), 'acao'],
  // a última entrega · T11/03: o registrar o diagnóstico, na folha Outras
  // ações, no poço de 30 da linha de opção com o efeito — o file-text de 18 do
  // Lucide, traço 1,8 (o Reenviar os 5 blocos usa o `reenviar`)
  diagnostico: [FileText, 'acao'],
  // a entrega do checklist · T13/05: o ciclo dinâmico, no poço de 32 da ação
  // da Seção E (Fazer o ciclo dinâmico) — o route do Lucide, traço 1,8
  ciclo: [Route, 'acao'],
  // a otimização do design · T01/16 e a folha 6: o xis de limpar do usuário
  // lembrado, de 18, com o traço 2 da referência (--traco-limpar)
  limpar: [X, 'limpar'],
  'voltar-etapa': [VoltarEtapa, 'acao'],
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
