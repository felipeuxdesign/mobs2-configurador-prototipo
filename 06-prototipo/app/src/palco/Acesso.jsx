// A senha do protótipo publicado (diretor, 25/09): uma porta simples na frente do
// palco, pra quem recebe o link por acaso. Não é segurança — a senha está no
// código que o navegador baixa —, é só pra o link não abrir pra qualquer um. Ela
// é do palco, fora do app: só existe fora da máquina local, então o localhost, o
// print e as réguas nunca a veem. Digitada uma vez, o navegador lembra.
import { useState } from 'react'
import './acesso.css'

const SENHA = 'configurador'
const GUARDA = 'm2cf-acesso'
const LOCAL = ['localhost', '127.0.0.1', '']

const lembrado = () => { try { return localStorage.getItem(GUARDA) === '1' } catch { return false } }
const lembrar = () => { try { localStorage.setItem(GUARDA, '1') } catch { /* sem guarda: pede de novo na próxima vez */ } }

export const precisaDeSenha = () => !LOCAL.includes(window.location.hostname) && !lembrado()

export function Acesso({ aoEntrar }) {
  const [senha, setSenha] = useState('')
  const [errou, setErrou] = useState(false)
  function entrar(e) {
    e.preventDefault()
    if (senha.trim().toLowerCase() === SENHA) { lembrar(); aoEntrar() } else { setErrou(true); setSenha('') }
  }
  return (
    <main className="acesso">
      <form className="acesso-caixa" onSubmit={entrar}>
        <span className="palco-rotulo">PROTÓTIPO</span>
        <h1 className="acesso-titulo">Configurador Mobs2</h1>
        <label className="acesso-rotulo" htmlFor="acesso-senha">Senha</label>
        <input id="acesso-senha" className="acesso-campo" type="password" autoComplete="off" autoFocus value={senha}
          onChange={(e) => { setSenha(e.target.value); setErrou(false) }} aria-invalid={errou || undefined} aria-describedby={errou ? 'acesso-erro' : undefined} />
        {errou && <p id="acesso-erro" className="acesso-erro" role="alert">A senha não confere.</p>}
        <button type="submit" className="acesso-botao" disabled={!senha}>Entrar</button>
      </form>
    </main>
  )
}
