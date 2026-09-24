// Números e horas saem daqui — funções puras, sem Intl nem toLocaleString,
// pra dar o mesmo resultado em qualquer máquina (G7). Mesma entrada, mesma saída.

/** 184320 → "184.320" */
export function milhar(n) {
  const sinal = n < 0 ? '−' : ''
  const s = String(Math.abs(Math.trunc(n)))
  return sinal + s.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/** (13.8, 1) → "13,8" · (1180) → "1.180" */
export function decimal(n, casas = 0) {
  const sinal = n < 0 ? '−' : ''
  const fixo = Math.abs(n).toFixed(casas)
  const [int, dec] = fixo.split('.')
  return sinal + milhar(Number(int)) + (dec ? ',' + dec : '')
}

/** 125 segundos → "2:05" */
export function minSeg(seg) {
  const s = Math.max(0, Math.round(seg))
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0')
}

/** aplica uma máscara de # a uma sequência de dígitos: ("(##) #####-####", "81987158675") */
export function mascara(masc, digitos) {
  let i = 0
  return masc.replace(/#/g, () => digitos[i++] ?? '')
}

/** caixa alta estável, sem depender do locale da máquina */
export function caixaAlta(s) {
  return String(s).toUpperCase()
}
