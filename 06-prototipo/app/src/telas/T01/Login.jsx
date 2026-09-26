// A T01 · Login (02-telas/T01-login): entrar com usuário e senha, e recuperar
// o acesso em três passos — o canal, o código, a senha nova. Um desenho só,
// quatro quadros (a entrada, o canal, o código, a senha), e por cima a folha
// "Não recebi o código" e o diálogo "Senha alterada". O estado muda o
// conteúdo; os blocos ficam onde estão (Lei 3).
//
// A interação mora aqui (useState), com o valor inicial derivado do momento
// ou do estado da referência. O cronômetro do código anda 1 s por segundo
// fora do print (T01·1); no print e num estado aberto pela coluna, fica parado.
// O prazo e o reenvio descem juntos, e a folha mostra o reenvio como contagem
// no lugar da seta, com as duas saídas desabilitadas até zerar (decisões 31 e
// 32). O contato aparece mascarado em todo o recuperar (regras.js).
//
// A entrada (a otimização do design): o Entrar diz o que falta — Digite o
// usuário, Digite a senha, Entrar —, e o usuário lembrado tem o xis dentro do
// campo (a variante `lembrado` do Campo). O palco começa na 00, sem ninguém
// lembrado; o Entrar com a caixa marcada guarda o usuário no estado único, e o
// login seguinte abre como a 16 — sem a caixa, como a 15, com os dois campos
// vazios (regras.js · entradaDoFluxo). A 15 e a 16 abrem pela coluna, pelo caso.
import { useEffect, useId, useState } from 'react'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import { minSeg } from '../../dados/formato.js'
import { filaDoMundo } from '../../estado/fila.js'
// a conta da fila do diálogo de sair do menu (T04/06), a mesma do diálogo da 18
import { naFila } from '../T04/dados.js'
import {
  BarraDoSistema, Rodape, Veu, Folha, Dialogo, Frase, LinhaDeOpcao, CartaoDeOpcoes,
  Marca, Campo, Codigo, Requisito, Requisitos, LinkConteudo, SoIcone, Checkbox, Segmentado, Aviso,
} from '../../ds/index.js'
import { TX } from './textos.js'
import {
  REC, LIM, PASSOS, segmentosDo, TELEFONE, EMAIL, contatoDo,
  PRAZO_CHEIO, REENVIO_CHEIO, PRAZO_NO_REENVIO_LIBERADO, restamEnvios, requisitosDa, senhaSalvavel,
  enviosDoTeto, liberaAs, depoisDoEnviar, outraSessaoAoEntrar, tecnicoDo,
  redeDoCaso, depoisDoEntrar, oQueFalta, CASO_PRIMEIRO_ACESSO, CASO_LEMBRADO, lembradoDoCaso,
  entradaDoLembrado, entradaDoFluxo, depoisDoXis, lembradoDepoisDoEntrar,
} from './regras.js'
import { CartaoCanal, CartaoDoCodigo, LinhaConferido, CampoSenhaNova } from './pecas.jsx'
import { usePresenca } from './presenca.js'
import './t01.css'

// as referências da pasta: o momento aonde se chega tocando, o estado pela coluna
export const REF = {
  senhaVisivel: '10-momento-senha-visivel', // tocar no olho: a senha por extenso e o olho riscado
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
  liberado: '11-momento-nao-recebi-reenvio-liberado', // a folha quando os 60 s do reenvio zeram
  reenviado: '12-momento-codigo-reenviado',           // Conferir e reenviar: outro código, pro mesmo contato
  noEmail: '13-momento-codigo-no-e-mail',             // Mandar para o e-mail: o código vai pro e-mail
  semConexao: '14-estado-login-sem-conexao',           // Entrar sem internet: o aviso, e os campos ficam (o mundo real)
  primeiroAcesso: '15-estado-primeiro-acesso',         // nada lembrado: os dois campos vazios, o foco no usuário (a otimização)
  lembrado: '16-estado-usuario-lembrado',              // o usuário lembrado, com o xis, a caixa marcada e o foco na senha
  teto: '17-estado-teto-de-envios',                    // os 3 envios da hora acabaram: o código enviado segue valendo (a última entrega)
  outroUsuario: '18-estado-outro-usuario-no-aparelho', // outro usuário entrou: o diálogo sobre as unidades da T02 (index.jsx, a última entrega)
}

// um código novo, com o prazo e o reenvio cheios. O primeiro envio chega com o
// código do mock preenchido (D-21, a 03); o reenvio chega com as células vazias
// e o cursor na primeira (a 12 e a 13)
const codigoNovo = (digitos = REC.codigo) => ({ digitos, erros: 0, erroVisivel: false, prazo: PRAZO_CHEIO, reenvio: REENVIO_CHEIO, folha: false })

// o quadro de cada referência, montado do mock. `situacao` é o que o celular
// sabe, no fluxo (o estado único): no começo do palco, a entrada abre na T01/00,
// com os dois campos preenchidos (o palco anda num toque); depois do primeiro
// Entrar, com o usuário lembrado, como a 16, e sem ele, como a 15 (entradaDoFluxo)
export function inicial(momento, estado, usuario, situacao = null) {
  const base = {
    quadro: 'entrada',
    usuario, senha: M.credenciais.senha, mostrar: false, lembrar: false, lembrado: false, foco: 'senha', erroEntrada: false, semConexao: false,
    // canal: o do cartão escolhido no 02; canalDoCodigo: pra onde foi o último código (o teto o mostra de volta)
    canal: 'telefone', canalDoCodigo: 'telefone', envios: REC.reenviosNaHora,
    // outro: o último envio foi pro mesmo contato ("Mandamos outro para", a 12);
    // momentoCodigo: o momento do quadro do código, pra onde a folha volta
    outro: false, momentoCodigo: REF.codigo,
    ...codigoNovo(),
    novaSenha: REC.novaSenha, dialogo: false,
  }
  switch (estado ?? momento) {
    case REF.incorretos: return { ...base, senha: '', erroEntrada: true }
    // o Entrar sem internet: o aviso, com os campos como estavam, de onde o caso diz (a 14)
    case REF.semConexao: { const d = depoisDoEntrar(base, redeDoCaso()); return d === 'T02' ? base : d }
    case REF.canal: return { ...base, quadro: 'canal' }
    case REF.codigo: return { ...base, quadro: 'codigo' }
    case REF.naoRecebi: return { ...base, quadro: 'codigo', folha: true }
    // os 60 s do reenvio zeraram com a folha aberta: o prazo andou o mesmo tanto (9:00, atrás do véu)
    case REF.liberado: return { ...base, quadro: 'codigo', folha: true, reenvio: 0, prazo: PRAZO_NO_REENVIO_LIBERADO }
    // o reenvio gastou um envio da hora: o prazo e o reenvio cheios, as células vazias
    case REF.reenviado: return { ...base, quadro: 'codigo', ...codigoNovo(''), envios: base.envios + 1, outro: true, momentoCodigo: REF.reenviado }
    case REF.noEmail: return { ...base, quadro: 'codigo', ...codigoNovo(''), canal: 'email', canalDoCodigo: 'email', envios: base.envios + 1, momentoCodigo: REF.noEmail }
    // os 3 envios da hora acabaram (o caso teto-de-envios): o código do mock enviado,
    // que segue valendo, e o reenvio já zerado — a linha diz até quando (a 17)
    case REF.teto: return { ...base, quadro: 'codigo', envios: enviosDoTeto(), reenvio: 0 }
    // depois de um código errado
    case REF.errado: return { ...base, quadro: 'codigo', digitos: REC.codigoErrado, erros: 1, erroVisivel: true }
    // o prazo passou: as células limpas; o reenvio, livre há muito
    case REF.expirado: return { ...base, quadro: 'codigo', digitos: '', prazo: 0, reenvio: 0 }
    // o terceiro código errado: o código morre e o reenvio fica livre na hora (T01·4)
    case REF.esgotado: return { ...base, quadro: 'codigo', digitos: REC.codigoErrado, erros: LIM.tentativas, erroVisivel: true, reenvio: 0 }
    case REF.senha: return { ...base, quadro: 'senha' }
    case REF.alterada: return { ...base, quadro: 'senha', dialogo: true }
    case REF.senhaVisivel: return { ...base, mostrar: true }
    // quem abre o app (a otimização do design): nada lembrado (a 15) ou o usuário lembrado (a 16), do caso
    case REF.primeiroAcesso: return entradaDoLembrado(base, lembradoDoCaso(CASO_PRIMEIRO_ACESSO))
    case REF.lembrado: return entradaDoLembrado(base, lembradoDoCaso(CASO_LEMBRADO))
    default: return !estado && !momento ? entradaDoFluxo(base, situacao) : base
  }
}

export function Login({ momento, estado, irMomento }) {
  const { estado: unico, despachar } = useEstado()
  const [s, setS] = useState(() => inicial(momento, estado, unico.tecnico.usuario, unico.situacao))
  const muda = (parcial) => setS((x) => ({ ...x, ...parcial }))
  const idTitulo = useId()
  // no erro do login, a senha é apagada e o cursor vai pra ela; o usuário fica (tela.md, estados.md).
  // O cursor vai no toque do Entrar, não ao abrir o estado 01 (no print, um cursor piscando mudaria a foto)
  const idSenha = useId()
  const idUsuario = useId()

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

  // a folha diz o momento dela: esperando o reenvio, a 04; quando ele zera, a 11.
  // Com o teto da hora atingido, as saídas não liberam, e ela fica na 04 (G25)
  const liberada = s.reenvio <= 0 && restam > 0
  const folhaAberta = s.folha && s.quadro === 'codigo'
  useEffect(() => {
    if (estado || !folhaAberta) return
    const m = liberada ? REF.liberado : REF.naoRecebi
    if (momento !== m) irMomento(m)
  }, [estado, folhaAberta, liberada, momento, irMomento])

  // o que vem por cima: a folha sobe em 200 e sai em 150; o diálogo, 150 e 150
  const folha = usePresenca(folhaAberta)
  const dialogo = usePresenca(s.dialogo && s.quadro === 'senha')
  const veu = folha.visivel ? 'folha' : dialogo.visivel ? 'dialogo' : null

  // ── os toques ──
  const aoLogin = () => { muda({ quadro: 'entrada', folha: false, dialogo: false }); irMomento(null) }
  // o que o celular sabe do login, no estado único: o usuário que ele lembra
  // (situacao.usuarioLembrado, HU-T01-3) e se o Entrar já entrou (situacao.jaEntrou)
  const noCelular = (parcial) => despachar({ tipo: 'mesclar', parcial: { situacao: { ...unico.situacao, ...parcial } } })
  // o Entrar (regras.js · depoisDoEntrar): sem internet, o aviso SEM CONEXÃO e os
  // campos ficam, e tocar de novo tenta de novo; com ela, a regra da senha. A rede
  // é a do aparelho, no estado único (logica.md · O mundo real). O Entrar que entra
  // guarda o usuário lembrado: com a caixa marcada, o identificador; sem ela, nada.
  // Dali em diante, o login só traz o que o celular lembra (a 16, ou a 15)
  // Com outro usuário depois de uma sessão neste aparelho (HU-T01-4, a 18), a sessão
  // dele é encerrada e a fila dele continua subindo: o diálogo abre sobre as unidades
  // da T02, que o lê da situação do celular (situacao.outraSessao) e o fecha no Entendi.
  // O técnico passa a ser quem entrou (regras.js · tecnicoDo)
  const entrar = () => {
    const depois = depoisDoEntrar(s, unico.situacao.rede)
    if (depois === 'T02') {
      const outra = outraSessaoAoEntrar(unico.situacao, unico.tecnico.usuario, s.usuario, naFila(filaDoMundo(unico)))
      despachar({ tipo: 'mesclar', parcial: { tecnico: tecnicoDo(s.usuario) } })
      noCelular({ usuarioLembrado: lembradoDepoisDoEntrar(s), jaEntrou: true, outraSessao: outra })
      despachar({ tipo: 'ir', tela: 'T02' }); return
    }
    setS(depois)
    if (depois.erroEntrada) setTimeout(() => document.getElementById(idSenha)?.focus(), 0)
  }
  // o xis do usuário lembrado: limpa o campo e esquece o usuário; a caixa fica
  // como o técnico deixou, e o cursor vai pro usuário, o primeiro campo vazio
  const limpar = () => {
    setS((x) => depoisDoXis(x)); noCelular({ usuarioLembrado: null })
    setTimeout(() => document.getElementById(idUsuario)?.focus(), 0)
  }
  const esqueci = () => { muda({ quadro: 'canal', canal: 'telefone' }); irMomento(REF.canal) }
  // o primeiro envio não conta no teto; só o reenvio conta (T01·2). Sem envio na
  // hora, nada vai: volta o código que já foi, com o teto na linha (regras.js · depoisDoEnviar, a 17)
  const enviarCodigo = () => { setS((x) => ({ ...depoisDoEnviar(x, { ...codigoNovo(), canalDoCodigo: x.canal }), momentoCodigo: REF.codigo })); irMomento(REF.codigo) }
  // o reenvio fecha a folha e volta pro código: o prazo em 10:00, as células vazias
  // e o cursor na primeira. Pro mesmo contato, "Mandamos outro para" (a 12); pro
  // e-mail, "Mandamos para" o e-mail (a 13). "Enviar outro código" (06, 07) é o
  // mesmo reenvio, pro mesmo contato
  const reenviar = (canal = s.canal) => {
    const outro = canal === s.canal
    const m = outro ? REF.reenviado : REF.noEmail
    setS((x) => ({ ...x, ...codigoNovo(''), canal, canalDoCodigo: canal, envios: x.envios + 1, outro, momentoCodigo: m }))
    irMomento(m)
  }
  const digitar = (digitos) => { muda({ digitos, erroVisivel: false }); if (s.erroVisivel) irMomento(s.momentoCodigo) }
  const confirmar = () => {
    if (s.digitos === REC.codigo) { muda({ quadro: 'senha', novaSenha: REC.novaSenha, folha: false }); irMomento(REF.senha); return }
    const erros = s.erros + 1
    muda({ erros, erroVisivel: true, ...(erros >= LIM.tentativas ? { reenvio: 0 } : {}) })
    irMomento(REF.errado)
  }
  const tentarDeNovo = () => { muda({ digitos: '', erroVisivel: false }); irMomento(s.momentoCodigo) }
  // abrir a folha: o momento dela (04 ou 11) vem do reenvio, no efeito acima
  const abrirFolha = () => muda({ folha: true })
  const fecharFolha = () => { muda({ folha: false }); irMomento(errado || esgotado ? REF.errado : s.momentoCodigo) }
  const salvar = () => { muda({ dialogo: true }); irMomento(REF.alterada) }
  // de volta à entrada, com o usuário e a senha vazia (T01·7 b)
  const entrarComNova = () => { muda({ quadro: 'entrada', dialogo: false, senha: '', erroEntrada: false, semConexao: false, foco: 'senha', mostrar: false }); irMomento(null) }

  // ── os quadros ──
  const cabecaDoPasso = (passo, legenda) => (
    <Segmentado folga={8} rotulo={TX.recuperar} contagem={PASSOS.indexOf(passo) + 1} total={TX.de(PASSOS.length)}
      segmentos={segmentosDo(passo)} legenda={legenda} />
  )

  function Entrada() {
    // o Entrar diz o que falta enquanto o técnico apaga e digita: Digite o
    // usuário (a 15) → Digite a senha (a 01 e a 16) → Entrar, apagado e
    // desabilitado de verdade enquanto falta (a lei 17). Sem conexão, aceso: os
    // dois estão lá, e o toque tenta de novo (a 14)
    const falta = oQueFalta(s)
    const primario = falta === 'usuario' ? TX.digiteUsuario : falta === 'senha' ? TX.digiteSenha : TX.entrar
    return (
      <>
        <h1 className="t01-titulo-oculto">{TX.entrar}</h1>
        <div className="tela-miolo t01-miolo t01-miolo-entrada">
          <div className="t01-marca"><Marca nome={TX.configurador} rotuloLogo={TX.logo} /></div>
          <div className="t01-campos">
            {/* o aviso mora no mesmo lugar: o erro da senha (01) ou a falta de internet (14) */}
            {s.erroEntrada && (
              <div className="t01-aviso"><Aviso tom="falha" glifo="xis" poco={26} titulo={TX.erroTitulo} frase={TX.erroFrase} /></div>
            )}
            {!s.erroEntrada && s.semConexao && (
              <div className="t01-aviso"><Aviso tom="neutro" traco glifo="sem-conexao" poco={26} titulo={TX.semConexao} frase={TX.semConexaoFrase} /></div>
            )}
            {/* o usuário lembrado tem o xis dentro do campo (a 16): a variante do campo */}
            <Campo rotulo={TX.usuario} valor={s.usuario} aoMudar={(v) => muda({ usuario: v })} focado={s.foco === 'usuario'}
              onFocus={() => muda({ foco: 'usuario' })} autoComplete="username" autoCapitalize="none" spellCheck={false}
              id={idUsuario} lembrado={s.lembrado} rotuloLimpar={TX.limparUsuario} aoLimpar={limpar} />
            <Campo rotulo={TX.senha} valor={s.senha} aoMudar={(v) => muda({ senha: v })} oculto={!s.mostrar} focado={s.foco === 'senha'}
              onFocus={() => muda({ foco: 'senha' })} autoComplete="current-password" autoCapitalize="none" spellCheck={false}
              id={idSenha}
              acao={<SoIcone icone={s.mostrar ? 'olho-riscado' : 'olho'} rotulo={s.mostrar ? TX.ocultarSenha : TX.mostrarSenha} cor="marca-limite" aoTocar={() => { muda({ mostrar: !s.mostrar }); irMomento(s.mostrar ? null : REF.senhaVisivel) }} />} />
          </div>
          <div className="t01-lembrar">
            <Checkbox marcado={s.lembrar} aoMudar={(v) => muda({ lembrar: v })}>{TX.lembrar}</Checkbox>
          </div>
        </div>
        <Rodape lugar="login" primario={primario} primarioDesabilitado={falta !== null}
          aoPrimario={entrar} link={TX.esqueci} aoLink={esqueci} />
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
    // sem envio na hora, a linha do reenvio diz que os envios acabaram e até
    // quando (a 17, a última entrega); o código enviado segue valendo
    const teto = TX.acabaram(LIM.tetoPorHora, liberaAs())
    if (esgotado) {
      cartao = <CartaoDoCodigo falha rotulo={TX.tentativasRestantes} numero={LIM.tentativas - s.erros} frase={TX.expirouFrase} />
      legenda = restam ? TX.reenvioLiberado(restam) : teto
      primario = TX.enviarOutro; aoPrimario = () => reenviar(); primarioDesabilitado = !restam
    } else if (expirado) {
      cartao = <CartaoDoCodigo numeroFalha rotulo={TX.expirou} numero={minSeg(s.prazo)} />
      legenda = restam ? TX.pecaNovo(restam) : teto
      primario = TX.enviarOutro; aoPrimario = () => reenviar(); primarioDesabilitado = !restam
    } else if (errado) {
      cartao = <CartaoDoCodigo falha rotulo={TX.tentativasRestantes} numero={LIM.tentativas - s.erros} frase={TX.naTerceira} />
      legenda = s.reenvio && restam ? TX.aindaValeEReenvio(minSeg(s.prazo), s.reenvio) : TX.aindaVale(minSeg(s.prazo))
      primario = TX.tentarDeNovo; aoPrimario = tentarDeNovo
    } else {
      cartao = <CartaoDoCodigo rotulo={TX.valePor} numero={minSeg(s.prazo)} />
      // depois do último envio da hora, a espera ainda corre (a 12 e a 13); zerada, o teto (a 17)
      legenda = s.reenvio ? (restam ? TX.reenviarEm(s.reenvio, restam) : TX.reenviarEmUltimo(s.reenvio)) : restam ? TX.reenvioLiberado(restam) : teto
      // o Confirmar diz o que falta enquanto o código não tem os seis dígitos, apagado e
      // desabilitado de verdade (a lei 17): Digite o código, como a 12 e a 13 desenham
      const incompleto = s.digitos.length < REC.codigo.length
      primario = incompleto ? TX.digiteCodigo : TX.confirmar; aoPrimario = confirmar; primarioDesabilitado = incompleto
    }
    return (
      <>
        <div className="tela-miolo t01-miolo t01-miolo-passo">
          {cabecaDoPasso('codigo', <span className="t01-destino">{(s.outro ? TX.mandamosOutro : TX.mandamos)(contatoDo(s.canal))}</span>)}
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
    // as duas saídas (decisão 32) esperam o mesmo reenvio: qualquer envio novo
    // espera os 60 s (pendencias.md). Até zerar, a contagem no lugar da seta e a
    // linha desabilitada de verdade (a 04); zerou, a seta e a linha acesa (a 11).
    // Com o teto da hora atingido, a contagem para em 0:00 e as saídas não
    // liberam — não há texto nem desenho pro teto (G25)
    const espera = liberada ? null : minSeg(s.reenvio)
    // no canal e-mail, a folha inverte (a última entrega): conferir o e-mail, e trocar
    // pro celular. A segunda linha não tem texto no textos.md — nenhuma referência
    // desenha a folha do e-mail —, e fica fora até ele chegar (pro arquiteto): o
    // cartão fica com a primeira, Conferir e reenviar, com o e-mail
    const noEmail = s.canal === 'email'
    return (
      <div className="t01-sobre">
        <Veu de="folha" visivel={folha.visivel}>
          <Folha titulo={TX.naoRecebi} rotuloFechar={TX.fechar} aoFechar={fecharFolha} aberta={folha.visivel}>
            <CartaoDeOpcoes>
              <LinhaDeOpcao icone="reenviar" titulo={TX.conferirReenviar} detalhe={contatoDo(s.canal)} espera={espera} aoTocar={() => reenviar()} />
              {!noEmail && <LinhaDeOpcao icone="email" titulo={TX.mandarEmail} detalhe={EMAIL} espera={espera} aoTocar={() => reenviar('email')} />}
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

  // O voltar do Android (logica.md): o link de saída de cada passo do recuperar,
  // o Voltar ao login; na folha Não recebi o código, o X. Na entrada, que não tem
  // saída desenhada (pendencias.md), e no diálogo Senha alterada, que não tem X
  // nem Cancelar (HU-T01-10), não faz nada; nem com a folha descendo
  useVoltar(folhaAberta ? fecharFolha : porCima || s.quadro === 'entrada' ? null : aoLogin)
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
