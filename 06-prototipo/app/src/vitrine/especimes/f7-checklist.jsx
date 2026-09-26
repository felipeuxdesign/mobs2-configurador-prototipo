// Folha 7 · checklist, evidência e processo. Os textos são os da folha.
// O checklist numa estrutura só (a entrega do checklist, decisão 34): a seção
// é uma peça, fechada e aberta — de leitura ou de tocar —, os quatro tipos de
// item, o veredito e a ação da seção. Os três mostradores são uma peça com
// três estados; a foto, uma peça com dois; a câmera do app, uma peça só.
// As peças de outra família entram compostas: a Lista (linhas, folha 4) e o
// cartão de ferramenta com o contador (cartões, folha 4).
import {
  SecaoDoChecklist, ItemDoChecklist, VereditoDoChecklist, FotoProva, VisorCamera,
  Mostrador, BlocoEvento, LinhaFila, LinhaRechecagem, Prova,
} from '../../ds/checklist/index.js'
import { Lista } from '../../ds/linhas/index.js'
import { CartaoFerramenta, GradeFerramentas } from '../../ds/cartoes/index.js'

// as seções como a folha desenha: a A aberta, de leitura; a B fechada e aberta, de tocar
const leituraDaA = [['Serial do módulo', 'M2C-0417'], ['Firmware', '2.3.5'], ['Ativo vinculado', 'RKT-8H42'], ['Chassi', 'confere']]
export const secaoALeitura = () => (
  <SecaoDoChecklist estado="aprovada" titulo="A · Identificação" quemAge="o app confere sozinho" feitos={4} de="de 4" aberta>
    {leituraDaA.map(([nome, valor], i) => <ItemDoChecklist key={nome} nome={nome} valor={valor} divisoria={i < leituraDaA.length - 1} />)}
  </SecaoDoChecklist>
)
export const secaoBFechada = () => <SecaoDoChecklist estado="pendente" titulo="B · Montagem" quemAge="você fotografa 4 itens" feitos={1} de="de 5" />
const secaoBTocar = () => (
  <SecaoDoChecklist estado="pendente" titulo="B · Montagem" quemAge="você fotografa 4 itens" feitos={1} de="de 5" aberta>
    {['Módulo', 'Antena GPS', 'Chicote', 'Leitor'].map((nome) => <ItemDoChecklist key={nome} tipo="tocar" icone="camera" nome={nome} legenda="foto a tirar" aoTocar={() => {}} />)}
    <ItemDoChecklist tipo="feito" nome="Painel" legenda="fotografado na calibração, às 14:30" divisoria={false} />
  </SecaoDoChecklist>
)

export const especimes = [
  // ── o checklist
  { id: 'f7-secao-fechada', folha: 7, rotulo: 'seção fechada', legenda: 'quem age · a contagem · a seta', render: secaoBFechada },
  { id: 'f7-secao-aberta-leitura', folha: 7, rotulo: 'seção aberta · de leitura', legenda: 'o cartão cresce no lugar · as leituras sem seta', render: secaoALeitura },
  { id: 'f7-secao-aberta-tocar', folha: 7, rotulo: 'seção aberta · de tocar', legenda: 'cada item com a câmera e a seta', render: secaoBTocar },
  { id: 'f7-item-leitura', folha: 7, rotulo: 'item de leitura', legenda: 'sem seta · não toca',
    render: () => <Lista><ItemDoChecklist nome="Firmware" valor="2.3.5" /></Lista> },
  { id: 'f7-item-tocar', folha: 7, rotulo: 'item de tocar', legenda: 'a câmera e a seta · abre a foto',
    render: () => <Lista><ItemDoChecklist tipo="tocar" icone="camera" nome="Chicote" legenda="foto a tirar" aoTocar={() => {}} /></Lista> },
  { id: 'f7-item-feito', folha: 7, rotulo: 'item feito', legenda: 'o check e de onde veio · sem seta',
    render: () => <Lista><ItemDoChecklist tipo="feito" nome="Painel" legenda="fotografado na calibração, às 14:30" divisoria={false} /></Lista> },
  { id: 'f7-item-ressalva', folha: 7, rotulo: 'item com ressalva', legenda: 'passou, mas diz a ressalva embaixo',
    render: () => <Lista><ItemDoChecklist tipo="ressalva" estado="ressalva" nome="Módulo" legenda="com ressalva · suporte trincado" /></Lista> },
  { id: 'f7-veredito', folha: 7, rotulo: 'o veredito', legenda: 'o topo do checklist homologado · o relatório embaixo',
    render: () => <VereditoDoChecklist titulo="Instalação homologada às 14:30" relatorio="o relatório leva 12 evidências, o local e o seu nome" /> },

  // ── evidência
  // a entrega de 25/09 (decisão 33): a que se tira é o cartão tocável, com a câmera e a seta; a tirada, o registro no lugar
  { id: 'f7-foto-a-tirar', folha: 7, rotulo: 'foto · a tirar', legenda: 'tocável, com a câmera · a legenda diz pra que ela serve',
    render: () => <FotoProva titulo="Fotografar o painel" legenda="é a prova do número — vale no checklist" aoTocar={() => {}} /> },
  { id: 'f7-foto-tirada', folha: 7, rotulo: 'foto · tirada', legenda: 'vira o registro no lugar, e deixa de ser tocável · diz onde mais ela vale',
    render: () => <FotoProva tirada titulo="Painel fotografado às 14:30" legenda="vale também no checklist, na Seção B" /> },
  // a câmera do app (T10/06 e 11, T13/07 e 08): a entrega do checklist a pôs na
  // folha 7, e ela entra na bancada. As duas sem a permissão seguem fora da
  // folha (semBancada): a do item não tem referência nem estado na coluna, e é
  // aqui que ela se vê
  { id: 'f7-visor-camera', folha: 7, rotulo: 'a câmera do app', legenda: 'a mesma na calibração e no checklist · o quadro diz o que enquadrar',
    render: () => <VisorCamera frase="Enquadre o hodômetro do painel" /> },
  { id: 'f7-visor-sem-permissao', folha: 7, rotulo: 'a câmera do app · sem a permissão', semBancada: true, legenda: 'fora da folha · a câmera riscada, o que falta e a explicação apagada (T10/11)',
    render: () => <VisorCamera semPermissao frase="O app precisa da câmera pra fotografar o painel" explicacao="Sem a foto, a calibração não semeia." /> },
  { id: 'f7-visor-sem-permissao-item', folha: 7, rotulo: 'a câmera do item · sem a permissão', semBancada: true, legenda: 'fora da folha · no checklist, sem texto aprovado: só a câmera riscada (G25)',
    render: () => <VisorCamera semPermissao /> },
  { id: 'f7-mostrador-apagado', folha: 7, rotulo: 'mostrador · apagado', legenda: 'tracejado · o traço no lugar do valor',
    render: () => <Mostrador estado="apagado" valor="—" nome="Ignição" /> },
  { id: 'f7-mostrador-relendo', folha: 7, rotulo: 'mostrador · relendo', legenda: 'acende quando o sinal responde',
    render: () => <Mostrador estado="relendo" valor="ligada" nome="Ignição" /> },
  { id: 'f7-mostrador-aceso', folha: 7, rotulo: 'mostrador · aceso', legenda: 'o nome com altura de duas linhas',
    render: () => <Mostrador estado="aceso" valor="ligada" nome="Ignição" /> },
  { id: 'f7-acao-secao', folha: 7, rotulo: 'a ação da seção', legenda: 'uma linha só com seta · o resto da seção é leitura',
    render: () => <Lista><ItemDoChecklist tipo="tocar" icone="ciclo" nome="Fazer o ciclo dinâmico" legenda="os 5 passos, com o ônibus em movimento" aoTocar={() => {}} /></Lista> },

  // ── processo e prova
  { id: 'f7-bloco-evento', folha: 7, rotulo: 'bloco do evento', legenda: 'o que foi disparado e recebido',
    render: () => (
      <BlocoEvento rotulo="EVENTO DE TESTE" linhas={[
        { texto: 'disparado pelo app', estado: 'feito', valor: '14:30' },
        { texto: 'recebido no servidor', estado: 'aguarda' },
        { texto: 'campos conferidos', estado: 'aguarda' },
      ]} />
    ) },
  { id: 'f7-linha-fila', folha: 7, rotulo: 'linha da fila', legenda: 'o que sobe e quando',
    render: () => <LinhaFila estado="ok" titulo="Evidências" legenda="RSW-9L02 · recebida" quando="10/03, 10:05" /> },
  { id: 'f7-linha-rechecagem', folha: 7, rotulo: 'linha da re-checagem', legenda: 'a Seção F esperando o servidor',
    render: () => <LinhaRechecagem titulo="RVM-1E54" legenda="recebimento pendente" prazo="confere em 24 h" /> },
  // na T09 a prova é o último bloco antes do rodapé: a folga de 16 vem junto (folha 7)
  { id: 'f7-prova-cadeia', folha: 7, rotulo: 'prova da cadeia', legenda: 'a versão gravada e relida',
    render: () => <Prova tipo="cadeia" rotulo="GRAVADO E RELIDO" versao="A12.G07.L02.E05.C03" legenda="o módulo devolveu os seis blocos" style={{ marginBottom: 'var(--respiro)' }} /> },
  { id: 'f7-prova-sessao', folha: 7, rotulo: 'prova da sessão', legenda: 'o que sobreviveu ao reinício',
    render: () => <Prova tipo="sessao" rotulo="A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO" versao="A12.G07.L02.E05.C03" legenda="relido do módulo depois de desligar e ligar" /> },
  { id: 'f7-contador-menu', folha: 7, rotulo: 'contador no menu', legenda: 'itens na fila, no canto do cartão',
    render: () => <GradeFerramentas><CartaoFerramenta icone="fila" titulo="Fila de saída" contagem={2} /></GradeFerramentas> },
]
