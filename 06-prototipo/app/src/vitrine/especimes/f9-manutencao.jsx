// Folha 9 · a manutenção e o rodapé (o 29c, 10/10): as peças do reenvio sem arraste — a folha de
// confirmação, o cartão dos dependentes nos três momentos (a pergunta, o fica para depois e o
// confere), a linha revisar em seguida —, o botão secundário com a área de toque, e o rodapé com
// traço no app e sem traço no login. Cada espécime é a peça em uso nas telas (T09, T11, T13), com
// o texto delas. A régua dos espécimes (scripts/especime.mjs) não lê a moldura desta folha — o
// rótulo de 1,5 e a borda sólida, onde as outras oito têm 1,4 e o tracejado —, então eles ficam
// fora da bancada (semBancada), conferidos pelas telas que os usam (T09/10, 13, 19, 20, T13/43).
import { Veu, Rodape, ItemDoChecklist } from '../../ds/index.js'
import { FolhaDeConfirmacao } from '../../telas/T09/FolhaDeConfirmacao.jsx'
import { Pergunta } from '../../telas/T09/Pergunta.jsx'
import { BotaoDaLinha } from '../../telas/comum/BotaoDaLinha.jsx'

const nada = () => {}
const LEITOR = { bloco: 'leitor', rotulo: 'Leitor', motivo: 'usa os cartões que as cercas apagaram' }
const EVENTOS = { bloco: 'eventos', rotulo: 'Eventos', motivo: 'usam as cercas e o leitor' }
const pergunta = (leitor) => (
  <Pergunta aoReenviar={nada} aoDeixar={nada} itens={[
    { ...LEITOR, decisao: leitor, liberado: true },
    { ...EVENTOS, motivo: leitor ? EVENTOS.motivo : `${EVENTOS.motivo} · libera depois do leitor`, decisao: null, liberado: !!leitor },
  ]} />
)
const revisar = (nome, motivo) => (
  <ItemDoChecklist estado="revisar" nome={nome} nomeGlifo="ainda não"
    linhas={[{ texto: 'revisar em seguida', tom: 'forte' }, { texto: motivo }]}
    acao={<BotaoDaLinha tam="teste" letra="secundario" aoTocar={nada}>Reenviar</BotaoDaLinha>} />
)

export const especimes = [
  { id: 'f9-folha-confirmacao', folha: 9, chrome: true, semBancada: true, rotulo: 'a folha de confirmação · T09/13',
    legenda: 'antes de reenviar um bloco que tem dependente · a consequência, o Reenviar e o Cancelar',
    render: () => <Veu de="folha"><FolhaDeConfirmacao bloco="cercas" aoConfirmar={nada} aoFechar={nada} /></Veu> },
  { id: 'f9-pergunta', folha: 9, semBancada: true, rotulo: 'a pergunta · T09/10',
    legenda: 'um item por dependente, na ordem do script · o Reenviar dos eventos só liga depois do leitor', render: () => pergunta(null) },
  { id: 'f9-fica-para-depois', folha: 9, semBancada: true, rotulo: 'fica para depois · T09/19',
    legenda: 'o link vira fica para depois, e o Reenviar continua ao lado', render: () => pergunta('depois') },
  { id: 'f9-confere', folha: 9, semBancada: true, rotulo: 'confere · T09/20',
    legenda: 'as ações dão lugar ao check e a confere · reenviado', render: () => pergunta('reenviado') },
  { id: 'f9-revisar', folha: 9, semBancada: true, rotulo: 'a linha revisar em seguida · T13/43',
    legenda: 'o relógio, o nome, revisar em seguida, o motivo e o Reenviar · enquanto existir, o Finalizar fica desligado',
    render: () => (
      <div>
        <ItemDoChecklist estado="ok" nome="Cercas" valor="confere" nomeGlifo="aprovado" />
        {revisar('Leitor', 'usa os cartões que as cercas apagaram')}
        {revisar('Eventos', 'usam as cercas e o leitor')}
        <ItemDoChecklist estado="espera" nome="Autoteste" valor="roda ao encerrar" nomeGlifo="ainda não" divisoria={false} />
      </div>
    ) },
  { id: 'f9-botao-secundario', folha: 9, semBancada: true, rotulo: 'o botão secundário · aceso, desligado, dentro da linha',
    legenda: '36 no cartão dos dependentes, 30 dentro de uma linha · a área de toque cresce até 48 sem aparecer',
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--e-20)', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 'var(--e-12)' }}>
          <BotaoDaLinha tam="pergunta" aoTocar={nada}>Reenviar o leitor</BotaoDaLinha>
          <BotaoDaLinha tam="pergunta" desabilitado>Reenviar os eventos</BotaoDaLinha>
        </div>
        <BotaoDaLinha tam="teste" letra="secundario" aoTocar={nada}>Reenviar</BotaoDaLinha>
      </div>
    ) },
  { id: 'f9-rodape-app', folha: 9, chrome: true, semBancada: true, rotulo: 'o rodapé · dentro do app, com traço',
    legenda: 'o traço separa o rodapé fixo do conteúdo que pode rolar por trás · o link com 44 de desenho e 48 de toque, a 8 do botão',
    render: () => <Rodape primario="Selecionar ativo" aoPrimario={nada} link="Voltar ao menu" aoLink={nada} /> },
  { id: 'f9-rodape-login', folha: 9, chrome: true, semBancada: true, rotulo: 'o rodapé · no login, sem traço',
    legenda: 'no login o botão é o fim do formulário: nada rola por trás, e o traço partiria o formulário',
    render: () => <Rodape lugar="login" primario="Entrar" aoPrimario={nada} link="Esqueci a senha" aoLink={nada} /> },
]
