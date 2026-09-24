// A T01 · Login (02-telas/T01-login): entrar com usuário e senha, e recuperar
// o acesso em três passos — o canal, o código, a senha nova. Um desenho só,
// quatro quadros (a entrada, o canal, o código, a senha), e por cima a folha
// "Não recebi o código" e o diálogo "Senha alterada". O estado muda o
// conteúdo; os blocos ficam onde estão (Lei 3).
//
// A interação mora aqui (useState), com o valor inicial derivado do momento
// ou do estado da referência. O cronômetro do código anda 1 s por segundo
// fora do print (T01·1); no print e num estado aberto pela coluna, fica parado.
import { useEffect, useId, useState } from 'react'
import { useEstado } from '../../estado/estado.jsx'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import { minSeg } from '../../dados/formato.js'
import {
  BarraDoSistema, Rodape, Veu, Folha, Dialogo, Frase, LinhaDeOpcao, CartaoDeOpcoes,
  Marca, Campo, Codigo, Requisito, Requisitos, LinkConteudo, SoIcone, Checkbox, Segmentado, Aviso,
} from '../../ds/index.js'
import { TX } from './textos.js'
import {
  REC, LIM, PASSOS, segmentosDo, entra, TELEFONE, EMAIL, contatoDo,
  PRAZO_CHEIO, REENVIO_CHEIO, restamEnvios, requisitosDa, senhaSalvavel,
} from './regras.js'
import { CartaoCanal, CartaoDoCodigo, LinhaConferido, CampoSenhaNova } from './pecas.jsx'
import { usePresenca } from './presenca.js'
import './t01.css'

// as referências da pasta: o momento aonde se chega tocando, o estado pela coluna
export const REF = {
  entrada: '00-tela',
  incorretos: '01-estado-usuario-ou-senha-incorretos',
  canal: '02-momento-recuperar-escolher-canal',
  codigo: '03-momento-recuperar-digitar-codigo',
  naoRecebi: '04-momento-nao-recebi-o-codigo',
  errado: '05-momento-codigo-errado',
  expirado: '06-estado-codigo-expirado',
  esgotado: '07-estado-tentativas-esgotadas',
  senha: '08-momento-recuperar-nova-senha',
  alterada: '09-momento-senha-alterada',
}

// um código novo: o do mock, que chega preenchido (D-21), com o prazo e o reenvio cheios
const codigoNovo = () => ({ digitos: REC.codigo, erros: 0, erroVisivel: false, prazo: PRAZO_CHEIO, reenvio: REENVIO_CHEIO, folha: false })

// o quadro de cada referência, montado do mock
export function inicial(momento, estado, usuario) {
  const base = {
    quadro: 'entrada',
    usuario, senha: M.credenciais.senha, mostrar: false, lembrar: false, foco: 'senha', erroEntrada: false,
    canal: 'telefone', envios: REC.reenviosNaHora,
    ...codigoNovo(),
    novaSenha: REC.novaSenha, dialogo: false,
  }
  switch (estado ?? momento) {
    case REF.incorretos: return { ...base, senha: '', erroEntrada: true }
    case REF.canal: return { ...base, quadro: 'canal' }
    case REF.codigo: return { ...base, quadro: 'codigo' }
    case REF.naoRecebi: return { ...base, quadro: 'codigo', folha: true }
    // depois de um código errado
    case REF.errado: return { ...base, quadro: 'codigo', digitos: REC.codigoErrado, erros: 1, erroVisivel: true }
    // o prazo passou: as células limpas; o reenvio, livre há muito
    case REF.expirado: return { ...base, quadro: 'codigo', digitos: '', prazo: 0, reenvio: 0 }
    // o terceiro código errado: o código morre e o reenvio fica livre na hora (T01·4)
    case REF.esgotado: return { ...base, quadro: 'codigo', digitos: REC.codigoErrado, erros: LIM.tentativas, erroVisivel: true, reenvio: 0 }
    case REF.senha: return { ...base, quadro: 'senha' }
    case REF.alterada: return { ...base, quadro: 'senha', dialogo: true }
    default: return base
  }
}

export function Login({ momento, estado, irMomento }) {
  const { estado: unico, despachar } = useEstado()
  const [s, setS] = useState(() => inicial(momento, estado, unico.tecnico.usuario))
  const muda = (parcial) => setS((x) => ({ ...x, ...parcial }))
  const idTitulo = useId()
  // no erro do login, a senha é apagada e o cursor vai pra ela; o usuário fica (tela.md, estados.md).
  // O cursor vai no toque do Entrar, não ao abrir o estado 01 (no print, um cursor piscando mudaria a foto)
  const idSenha = useId()

  // o código: vivo, errado, expirado ou morto pelas tentativas
  const esgotado = s.erros >= LIM.tentativas
  const expirado = !esgotado && s.prazo <= 0
  const errado = !esgotado && !expirado && s.erroVisivel
  const vivo = !esgotado && !expirado
  const restam = restamEnvios(s.envios)

  // o cronômetro: o prazo e o reenvio descem juntos, 1 s por segundo (T01·1)
  const corre = !EM_QUADRO && !estado && s.quadro === 'codigo'
  useEffect(() => {
    if (!corre) return undefined
    const t = setInterval(() => setS((x) => {
      const morto = x.erros >= LIM.tentativas || x.prazo <= 0
      const prazo = morto ? x.prazo : x.prazo - 1
      const reenvio = Math.max(0, x.reenvio - 1)
      return prazo === x.prazo && reenvio === x.reenvio ? x : { ...x, prazo, reenvio }
    }), RITMOS.cronometroCodigoMs)
    return () => clearInterval(t)
  }, [corre])

  // o que vem por cima: a folha sobe em 200 e sai em 150; o diálogo, 150 e 150
  const folha = usePresenca(s.folha && s.quadro === 'codigo')
  const dialogo = usePresenca(s.dialogo && s.quadro === 'senha')
  const veu = folha.visivel ? 'folha' : dialogo.visivel ? 'dialogo' : null

  // ── os toques ──
  const aoLogin = () => { muda({ quadro: 'entrada', folha: false, dialogo: false }); irMomento(null) }
  const entrar = () => {
    if (entra(s.senha)) { despachar({ tipo: 'ir', tela: 'T02' }); return }
    muda({ senha: '', erroEntrada: true, foco: 'senha', mostrar: false })
    setTimeout(() => document.getElementById(idSenha)?.focus(), 0)
  }
  const esqueci = () => { muda({ quadro: 'canal', canal: 'telefone' }); irMomento(REF.canal) }
  // o primeiro envio não conta no teto; só o reenvio conta (T01·2)
  const enviarCodigo = () => { muda({ quadro: 'codigo', ...codigoNovo() }); irMomento(REF.codigo) }
  const reenviar = (canal) => { setS((x) => ({ ...x, ...codigoNovo(), canal: canal ?? x.canal, envios: x.envios + 1 })); irMomento(REF.codigo) }
  const digitar = (digitos) => { muda({ digitos, erroVisivel: false }); if (s.erroVisivel) irMomento(REF.codigo) }
  const confirmar = () => {
    if (s.digitos === REC.codigo) { muda({ quadro: 'senha', novaSenha: REC.novaSenha, folha: false }); irMomento(REF.senha); return }
    const erros = s.erros + 1
    muda({ erros, erroVisivel: true, ...(erros >= LIM.tentativas ? { reenvio: 0 } : {}) })
    irMomento(REF.errado)
  }
  const tentarDeNovo = () => { muda({ digitos: '', erroVisivel: false }); irMomento(REF.codigo) }
  const abrirFolha = () => { muda({ folha: true }); irMomento(REF.naoRecebi) }
  const fecharFolha = () => { muda({ folha: false }); irMomento(errado || esgotado ? REF.errado : REF.codigo) }
  const salvar = () => { muda({ dialogo: true }); irMomento(REF.alterada) }
  // de volta à entrada, com o usuário e a senha vazia (T01·7 b)
  const entrarComNova = () => { muda({ quadro: 'entrada', dialogo: false, senha: '', erroEntrada: false, foco: 'senha', mostrar: false }); irMomento(null) }

  // ── os quadros ──
  const cabecaDoPasso = (passo, legenda) => (
    <Segmentado folga={8} rotulo={TX.recuperar} contagem={PASSOS.indexOf(passo) + 1} total={TX.de(PASSOS.length)}
      segmentos={segmentosDo(passo)} legenda={legenda} />
  )

  function Entrada() {
    return (
      <>
        <h1 className="t01-titulo-oculto">{TX.entrar}</h1>
        <div className="tela-miolo t01-miolo t01-miolo-entrada">
          <div className="t01-marca"><Marca nome={TX.configurador} rotuloLogo={TX.logo} /></div>
          <div className="t01-campos">
            {s.erroEntrada && (
              <div className="t01-aviso"><Aviso tom="falha" glifo="xis" poco={26} titulo={TX.erroTitulo} frase={TX.erroFrase} /></div>
            )}
            <Campo rotulo={TX.usuario} valor={s.usuario} aoMudar={(v) => muda({ usuario: v })} focado={s.foco === 'usuario'}
              onFocus={() => muda({ foco: 'usuario' })} autoComplete="username" autoCapitalize="none" spellCheck={false} />
            <Campo rotulo={TX.senha} valor={s.senha} aoMudar={(v) => muda({ senha: v })} oculto={!s.mostrar} focado={s.foco === 'senha'}
              onFocus={() => muda({ foco: 'senha' })} autoComplete="current-password" autoCapitalize="none" spellCheck={false}
              id={idSenha}
              acao={<SoIcone icone={s.mostrar ? 'olho-riscado' : 'olho'} rotulo={s.mostrar ? TX.ocultarSenha : TX.mostrarSenha} cor="marca-limite" aoTocar={() => muda({ mostrar: !s.mostrar })} />} />
          </div>
          <div className="t01-lembrar">
            <Checkbox marcado={s.lembrar} aoMudar={(v) => muda({ lembrar: v })}>{TX.lembrar}</Checkbox>
          </div>
        </div>
        <Rodape lugar="login" primario={TX.entrar} aoPrimario={entrar} link={TX.esqueci} aoLink={esqueci} />
      </>
    )
  }

  function Canal() {
    return (
      <>
        <div className="tela-miolo t01-miolo t01-miolo-passo">
          {cabecaDoPasso('canal', TX.depois)}
          <h1 id={idTitulo} className="t01-titulo">{TX.tituloCanal[0]}<br />{TX.tituloCanal[1]}</h1>
          <div className="t01-canais" role="radiogroup" aria-labelledby={idTitulo}>
            <CartaoCanal tipo="telefone" rotulo={TX.mensagem} contato={TELEFONE} escolhido={s.canal === 'telefone'} aoTocar={() => muda({ canal: 'telefone' })} />
            <CartaoCanal tipo="email" rotulo={TX.email} contato={EMAIL} escolhido={s.canal === 'email'} aoTocar={() => muda({ canal: 'email' })} />
          </div>
          <div className="t01-legenda-dupla">
            <span className="t01-legenda-dupla-fato">{TX.valePorMinutos(LIM.validadeMin)}</span>
            {/* sem envio na hora não há texto aprovado: o lado fica vazio (G25) */}
            <span className="t01-legenda-dupla-resta">{restam ? TX.restaEnvio(restam) : ''}</span>
          </div>
        </div>
        <Rodape lugar="login" primario={TX.enviarCodigo} aoPrimario={enviarCodigo} link={TX.voltarLogin} aoLink={aoLogin} />
      </>
    )
  }

  function PassoCodigo() {
    // o título diz a falha do código (R-03, a exceção declarada da T01); o expirado não
    const titulo = errado || esgotado ? TX.naoConfere : TX.digite
    let cartao, legenda, primario, aoPrimario, primarioDesabilitado = false
    if (esgotado) {
      cartao = <CartaoDoCodigo falha rotulo={TX.tentativasRestantes} numero={LIM.tentativas - s.erros} frase={TX.expirouFrase} />
      legenda = restam ? TX.podePedirAgora(restam) : ''
      primario = TX.enviarOutro; aoPrimario = () => reenviar(); primarioDesabilitado = !restam
    } else if (expirado) {
      cartao = <CartaoDoCodigo numeroFalha rotulo={TX.expirou} numero={minSeg(s.prazo)} />
      legenda = restam ? TX.pecaNovo(restam) : ''
      primario = TX.enviarOutro; aoPrimario = () => reenviar(); primarioDesabilitado = !restam
    } else if (errado) {
      cartao = <CartaoDoCodigo falha rotulo={TX.tentativasRestantes} numero={LIM.tentativas - s.erros} frase={TX.naTerceira} />
      legenda = s.reenvio && restam ? TX.aindaValeEReenvio(minSeg(s.prazo), s.reenvio) : TX.aindaVale(minSeg(s.prazo))
      primario = TX.tentarDeNovo; aoPrimario = tentarDeNovo
    } else {
      cartao = <CartaoDoCodigo rotulo={TX.valePor} numero={minSeg(s.prazo)} />
      legenda = !restam ? '' : s.reenvio ? TX.podePedirDeNovo(s.reenvio, restam) : TX.podePedirAgora(restam)
      primario = TX.confirmar; aoPrimario = confirmar; primarioDesabilitado = s.digitos.length < REC.codigo.length
    }
    return (
      <>
        <div className="tela-miolo t01-miolo t01-miolo-passo">
          {cabecaDoPasso('codigo', TX.mandamos(contatoDo(s.canal)))}
          <h1 className="t01-titulo">{titulo}</h1>
          <div className="t01-codigo-grupo">
            <Codigo celulas={REC.codigo.length} digitos={expirado ? '' : s.digitos} focado={vivo && !errado} errado={!vivo ? esgotado : errado}
              focoEm={expirado ? REC.codigo.length - 1 : undefined} rotulo={titulo} aoDigitar={vivo ? digitar : undefined} />
            {cartao}
          </div>
          <span className="t01-legenda">{legenda}</span>
          <LinkConteudo aoTocar={abrirFolha}>{TX.naoRecebi}</LinkConteudo>
        </div>
        <Rodape lugar="login" primario={primario} aoPrimario={aoPrimario} primarioDesabilitado={primarioDesabilitado}
          link={TX.voltarLogin} aoLink={aoLogin} />
      </>
    )
  }

  function NaoRecebi() {
    const contato = contatoDo(s.canal)
    return (
      <div className="t01-sobre">
        <Veu de="folha" visivel={folha.visivel}>
          <Folha titulo={TX.naoRecebi} rotuloFechar={TX.fechar} aoFechar={fecharFolha} aberta={folha.visivel}>
            <CartaoDeOpcoes>
              {/* reenvia pro mesmo canal quando o reenvio libera (T01·3) */}
              <LinhaDeOpcao icone="reenviar" titulo={TX.conferirReenviar} detalhe={s.reenvio ? TX.contatoEReenvio(contato, s.reenvio) : contato}
                desabilitado={s.reenvio > 0 || !restam} aoTocar={() => reenviar()} />
              {/* trocar pro e-mail não espera o reenvio (T01·3); se o código já foi
                  pro e-mail, é o mesmo reenvio, e espera os 60 s (HU-T01-7) */}
              <LinhaDeOpcao icone="email" titulo={TX.mandarEmail} detalhe={EMAIL}
                desabilitado={!restam || (s.canal === 'email' && s.reenvio > 0)} aoTocar={() => reenviar('email')} />
              {/* do gestor não há dado nem referência: só fecha a folha (T01·3, G25) */}
              <LinhaDeOpcao icone="gestor" titulo={TX.pedirGestor} detalhe={TX.gestorDetalhe} aoTocar={fecharFolha} />
            </CartaoDeOpcoes>
          </Folha>
        </Veu>
      </div>
    )
  }

  function PassoSenha() {
    const lista = requisitosDa(s.novaSenha)
    return (
      <>
        <div className="tela-miolo t01-miolo t01-miolo-passo">
          {cabecaDoPasso('senha', TX.seisItens)}
          <h1 id={idTitulo} className="t01-titulo">{TX.crieSenha}</h1>
          <LinhaConferido texto={TX.codigoConferido} valor={REC.codigo} />
          <CampoSenhaNova valor={s.novaSenha} aoMudar={(v) => muda({ novaSenha: v })} rotuladoPor={idTitulo} />
          <div className="t01-requisitos">
            <Requisitos>
              {lista.map((r) => (
                <Requisito key={r.id} texto={TX.requisitos[r.id](r)} cumprido={r.cumprido}
                  nota={r.verificavelNoAparelho === false ? TX.confereAoSalvar : undefined} />
              ))}
            </Requisitos>
          </div>
        </div>
        <Rodape lugar="login" primario={TX.salvarEntrar} aoPrimario={salvar} primarioDesabilitado={!senhaSalvavel(lista)}
          link={TX.voltarLogin} aoLink={aoLogin} />
      </>
    )
  }

  function SenhaAlterada() {
    return (
      <div className="t01-sobre">
        <Veu de="dialogo" visivel={dialogo.visivel}>
          <Dialogo titulo={TX.senhaAlterada} primario={TX.entrarComNova} aoPrimario={entrarComNova} margem={16} aberto={dialogo.visivel}>
            <Frase>{TX.senhaAlteradaFrase}</Frase>
          </Dialogo>
        </Veu>
      </div>
    )
  }

  // a tela de onde a folha ou o diálogo nasceu fica atrás do véu (G25) e, como
  // eles são modais (aria-modal, G15), inerte: nem o toque nem o leitor chegam nela
  const porCima = folha.montado || dialogo.montado
  return (
    <div className="t01">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="pagina" veu={veu} />
      <div className="t01-fundo" inert={porCima ? '' : undefined}>
        {s.quadro === 'entrada' && Entrada()}
        {s.quadro === 'canal' && Canal()}
        {s.quadro === 'codigo' && PassoCodigo()}
        {s.quadro === 'senha' && PassoSenha()}
      </div>
      {folha.montado && NaoRecebi()}
      {dialogo.montado && SenhaAlterada()}
    </div>
  )
}
