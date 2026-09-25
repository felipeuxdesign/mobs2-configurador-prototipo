// As regras da T01, todas lidas do mock (M.credenciais): o Entrar, o contato
// com a máscara do DDI, os passos da recuperação e os seis requisitos da senha
// nova. Funções puras: mesma entrada, mesma saída.
import { M } from '../../dados/mock.js'
import { mascararTelefone, mascararEmail } from '../../dados/formato.js'

export const CRED = M.credenciais
export const REC = CRED.recuperacao
export const LIM = REC.limites

// os três passos da recuperação: o contador ('1 de 3') conta daqui
export const PASSOS = ['canal', 'codigo', 'senha']
export const segmentosDo = (passo) => PASSOS.map((p, i) => {
  const k = PASSOS.indexOf(passo)
  return i < k ? 'feito' : i === k ? 'atual' : 'pendente'
})

// Entrar: qualquer senha com o mínimo do mock entra (tela.md, logica.md:20)
export const entra = (senha) => senha.length >= CRED.minimoEntrar

// O login sem conexão (logica.md · O mundo real, o caso sem-conexao-no-login):
// o login precisa de internet. A rede é a do aparelho, a do estado único
// (situacao.rede: 'conectada' ou 'sem-conexao'); o estado 14 a tira do caso.
export const CASO_SEM_CONEXAO = 'sem-conexao-no-login'
export const redeDoCaso = () => (M.casos[CASO_SEM_CONEXAO].rede ? 'conectada' : 'sem-conexao')

// O toque do Entrar, puro: o quadro de depois (os campos, o aviso), ou 'T02'.
// · sem internet, o aviso SEM CONEXÃO, e os campos ficam como estão — a senha
//   não estava errada — e o Entrar segue aceso: tocar de novo tenta de novo
// · com ela, a regra da senha: com o mínimo, entra; com menos, o erro, com a
//   senha apagada e o cursor nela, e o usuário fica
// Testado no node (scripts/testar-login-e-bluetooth.mjs): o estado 14 abre pela
// coluna, parado e sem toque, e nenhum gatilho do mock tira a rede no fluxo.
export function depoisDoEntrar(s, rede) {
  if (rede !== 'conectada') return { ...s, semConexao: true, erroEntrada: false }
  if (entra(s.senha)) return 'T02'
  return { ...s, senha: '', erroEntrada: true, semConexao: false, foco: 'senha', mostrar: false }
}
// no erro, o Entrar fica apagado, dizendo Digite a senha, até a senha ter um
// caractere (a entrega de 25/09); sem conexão, nunca: a senha está lá
export const entrarApagado = (s) => s.erroEntrada && !s.senha

// o contato, mascarado em todo o recuperar acesso (decisão 31): o telefone pela
// máscara do DDI dele (HU-T01-6), o e-mail pela primeira letra e o domínio.
// Derivados do contato do mock, nunca digitados (formato.js)
const ddi = M.ddis.find((d) => d.codigo === CRED.contato.telefone.ddi)
export const TELEFONE = mascararTelefone(ddi.mascara, CRED.contato.telefone.numero)
export const EMAIL = mascararEmail(CRED.contato.email)
export const contatoDo = (canal) => (canal === 'telefone' ? TELEFONE : EMAIL)

// os limites em segundos (a tela conta a partir daqui, sem relógio: T01·1)
export const PRAZO_CHEIO = LIM.validadeMin * 60
export const REENVIO_CHEIO = LIM.reenvioSeg
// o que resta de envio na hora: só o reenvio conta (T01·2)
export const restamEnvios = (envios) => Math.max(0, LIM.tetoPorHora - envios)
// o quadro em que o reenvio zera (T01/11): os 60 s do reenvio passaram, e o
// prazo andou o mesmo tanto — 10:00 − 60 s = 9:00, atrás do véu
export const PRAZO_NO_REENVIO_LIBERADO = PRAZO_CHEIO - REENVIO_CHEIO

// Os requisitos da senha nova, na ordem do mock. O trecho (mocks.js,
// "sem-usuario-nem-sequencia") é o tamanho que conta como sequência — abc,
// 321, aaa — e como pedaço do usuário. O sexto não se confere no aparelho.
function temSequencia(s, n) {
  const c = [...s.toLowerCase()].map((x) => x.codePointAt(0))
  for (let i = 0; i + n <= c.length; i++) {
    const passo = c[i + 1] - c[i]
    if (Math.abs(passo) > 1) continue
    let seguido = true
    for (let j = i + 1; j < i + n; j++) if (c[j] - c[j - 1] !== passo) { seguido = false; break }
    if (seguido) return true
  }
  return false
}
function temPedacoDoUsuario(s, usuario, n) {
  const a = s.toLowerCase(), u = usuario.toLowerCase()
  for (let i = 0; i + n <= u.length; i++) if (a.includes(u.slice(i, i + n))) return true
  return false
}
const REGRA = {
  tamanho: (s, r) => [...s].length >= r.minimo,
  caixas: (s) => /\p{Ll}/u.test(s) && /\p{Lu}/u.test(s),
  numero: (s) => /\p{Nd}/u.test(s),
  simbolo: (s) => /[^\p{L}\p{N}\s]/u.test(s),
  'sem-usuario-nem-sequencia': (s, r) => !temSequencia(s, r.trecho) && !temPedacoDoUsuario(s, CRED.usuario, r.trecho),
  'diferente-das-ultimas': () => false,
}
export const requisitosDa = (senha) => CRED.requisitosSenha.map((r) => ({
  ...r,
  cumprido: r.verificavelNoAparelho === false ? false : REGRA[r.id](senha, r),
}))
// Salvar e entrar fica habilitado quando os verificáveis passam (T01·6)
export const senhaSalvavel = (lista) => lista.every((r) => r.verificavelNoAparelho === false || r.cumprido)
