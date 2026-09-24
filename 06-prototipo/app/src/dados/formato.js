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

/** O contato mascarado do recuperar acesso (decisão 31): ele aparece antes do
 *  login, e quem digitou o usuário não vê o celular nem o e-mail inteiros.
 *  Derivado do contato do mock, nunca digitado. Mesma entrada, mesma saída.
 *
 *  O telefone, pela máscara do DDI dele (HU-T01-6): o primeiro e o último grupo
 *  de # ficam, os do meio viram •, um por dígito, e a pontuação fica —
 *  ("(##) #####-####", "81987158675") → "(81) •••••-8675" */
export function mascararTelefone(masc, digitos) {
  const grupos = masc.match(/#+/g) ?? []
  let g = -1; let i = 0
  return masc.replace(/#+|[^#]+/g, (parte) => {
    if (parte[0] !== '#') return parte
    g += 1
    const trecho = digitos.slice(i, i + parte.length); i += parte.length
    return g === 0 || g === grupos.length - 1 ? trecho : '•'.repeat(parte.length)
  })
}

/** o e-mail: a primeira letra do nome, os pontos e o domínio inteiro. Os pontos
 *  são sempre PONTOS_DO_EMAIL, como a referência desenha, pra não dizer o
 *  tamanho do nome — ("r.vieira@atlsul.com.br") → "r•••••@atlsul.com.br" */
export const PONTOS_DO_EMAIL = 5
export function mascararEmail(email) {
  const arroba = email.lastIndexOf('@')
  return email.slice(0, 1) + '•'.repeat(PONTOS_DO_EMAIL) + email.slice(arroba)
}

/** caixa alta estável, sem depender do locale da máquina */
export function caixaAlta(s) {
  return String(s).toUpperCase()
}

/** C4 · T02·6 — a idade passou do limiar de bloqueio (mais de 7 dias, HU-T03-4) */
export function passouDoBloqueio(dias, bloqueioDias) {
  return dias > bloqueioDias
}

/** C4 · T02·6 — o mesmo, lido de um pacote do mock (a T04 usa) */
export function pacotePassouDoBloqueio(p) {
  return passouDoBloqueio(p.diasAtras, p.limiares.bloqueioDias)
}

/** A idade do pacote na linha da garagem (T02, entrega do design de 24/09, que
 *  muda o T02·6), derivada do dado na hora de montar:
 *  0 → "pacote de hoje, 06:15" · 1 → "pacote de ontem, 07:10" ·
 *  n → "pacote de 4 dias, 06:55" · passou do bloqueio, só a causa, sem a hora
 *  e sem a ação (D-41: causa ou ação, nunca as duas) → "pacote vencido há 8 dias".
 *  A ação de sincronizar mora na T03. */
export function idadeNaLinhaDaGaragem(dias, hora, bloqueioDias) {
  if (passouDoBloqueio(dias, bloqueioDias)) return `pacote vencido há ${dias} dias`
  if (dias === 0) return `pacote de hoje, ${hora}`
  if (dias === 1) return `pacote de ontem, ${hora}`
  return `pacote de ${dias} dias, ${hora}`
}

/** C4 · T02·7 — a chave de busca: sem acento e sem caixa ("Várzea" → "varzea") */
export function chaveDeBusca(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

/** C8 · T08·2 — a contagem por extenso, no masculino, de 0 a 99, sem Intl:
 *  12 → "doze" (o herói, ma-01) · 8 → "oito" (o ma-02). Fora disso, o algarismo. */
const EXTENSO_ATE_19 = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
  'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove']
const EXTENSO_DEZENAS = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
export function porExtenso(n) {
  if (!Number.isInteger(n) || n < 0 || n > 99) return String(n)
  if (n < 20) return EXTENSO_ATE_19[n]
  const dezena = EXTENSO_DEZENAS[Math.floor(n / 10)]; const resto = n % 10
  return resto ? `${dezena} e ${EXTENSO_ATE_19[resto]}` : dezena
}
