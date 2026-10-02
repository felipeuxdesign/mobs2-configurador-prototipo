// Folha 7 · checklist, evidência e processo. Os textos são os da folha.
// O checklist numa estrutura só (a entrega do checklist, decisão 34): a seção
// é uma peça, fechada e aberta — de leitura ou de tocar —, os quatro tipos de
// item, o veredito e a ação da seção. A foto é uma peça com dois estados; a
// câmera do app, uma peça só. O pacote 1 tirou da folha o mostrador (a T08) e
// trocou a versão das provas pelos blocos: o módulo não guarda versão (decisão 49).
// O pacote 2: a A com 3 (o chassi saiu), o Painel foto a tirar na B (decisão 52), a
// foto tirada é o registro do problema, a ação da seção é o Fazer o ciclo de testes
// (decisão 54), e a foto a tirar saiu da folha (a calibração não fotografa mais).
// As peças de outra família entram compostas: a Lista (linhas, folha 4) e o
// cartão de ferramenta com o contador (cartões, folha 4).
import {
  SecaoDoChecklist, ItemDoChecklist, VereditoDoChecklist, FotoProva, VisorCamera,
  BlocoEvento, LinhaFila, LinhaRechecagem, Prova,
} from '../../ds/checklist/index.js'
import { Lista } from '../../ds/linhas/index.js'
import { CartaoFerramenta, GradeFerramentas } from '../../ds/cartoes/index.js'
import { blocosRelidos } from '../../telas/T16/dados.js'

// as seções como a folha desenha: a A aberta, de leitura; a B fechada e aberta, de tocar
const leituraDaA = [['Serial do módulo', 'M2C-0417'], ['Firmware', '2.3.5'], ['Ativo vinculado', 'RKT-8H42']]
export const secaoALeitura = () => (
  <SecaoDoChecklist estado="aprovada" titulo="A · Identificação" quemAge="o app confere sozinho" feitos={3} de="de 3" aberta>
    {leituraDaA.map(([nome, valor], i) => <ItemDoChecklist key={nome} nome={nome} valor={valor} divisoria={i < leituraDaA.length - 1} />)}
  </SecaoDoChecklist>
)
export const secaoBFechada = () => <SecaoDoChecklist estado="pendente" titulo="B · Montagem" quemAge="você fotografa 5 itens" feitos={0} de="de 5" />
const fotosDaB = ['Módulo', 'Antena GPS', 'Chicote', 'Leitor', 'Painel']
const secaoBTocar = () => (
  <SecaoDoChecklist estado="pendente" titulo="B · Montagem" quemAge="você fotografa 5 itens" feitos={0} de="de 5" aberta>
    {fotosDaB.map((nome, i) => <ItemDoChecklist key={nome} tipo="tocar" icone="camera" nome={nome} legenda="foto a tirar" divisoria={i < fotosDaB.length - 1} aoTocar={() => {}} />)}
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
    render: () => <Lista><ItemDoChecklist tipo="feito" nome="Módulo" legenda="fotografado às 14:31" divisoria={false} /></Lista> },
  { id: 'f7-item-ressalva', folha: 7, rotulo: 'item com ressalva', legenda: 'passou, mas diz a ressalva embaixo',
    render: () => <Lista><ItemDoChecklist tipo="ressalva" estado="ressalva" nome="Módulo" legenda="com ressalva · suporte trincado" /></Lista> },
  { id: 'f7-veredito', folha: 7, rotulo: 'o veredito', legenda: 'o topo do checklist homologado · o relatório embaixo',
    render: () => <VereditoDoChecklist titulo="Instalação homologada às 14:30" relatorio="o relatório leva 12 evidências, o local e o seu nome" /> },

  // ── evidência
  // a tirada é o registro no lugar (o problema fotografado, T13/15); a a tirar saiu da folha no pacote 2
  { id: 'f7-foto-tirada', folha: 7, rotulo: 'foto · tirada', legenda: 'vira o registro no lugar, e deixa de ser tocável · diz onde mais ela vale',
    render: () => <FotoProva tirada titulo="Problema fotografado às 14:30" legenda="vai junto com a ressalva, pro gestor" /> },
  // a câmera do app (T10/06 e 11, T13/07 e 08): a entrega do checklist a pôs na
  // folha 7, e ela entra na bancada. As duas sem a permissão seguem fora da
  // folha (semBancada): a do item não tem referência nem estado na coluna, e é
  // aqui que ela se vê
  { id: 'f7-visor-camera', folha: 7, rotulo: 'a câmera do app', legenda: 'a mesma na calibração e no checklist · o quadro diz o que enquadrar',
    render: () => <VisorCamera frase="Enquadre o módulo e o ponto de fixação" /> },
  { id: 'f7-visor-sem-permissao', folha: 7, rotulo: 'a câmera do app · sem a permissão', semBancada: true, legenda: 'fora da folha · a câmera riscada, o que falta e a explicação apagada (T10/11)',
    render: () => <VisorCamera semPermissao frase="O app precisa da câmera pra fotografar o painel" explicacao="Sem a foto, a calibração não semeia." /> },
  { id: 'f7-visor-sem-permissao-item', folha: 7, rotulo: 'a câmera do item · sem a permissão', semBancada: true, legenda: 'fora da folha · no checklist, sem texto aprovado: só a câmera riscada (G25)',
    render: () => <VisorCamera semPermissao /> },
  { id: 'f7-acao-secao', folha: 7, rotulo: 'a ação da seção', legenda: 'uma linha só com seta · o resto da seção é leitura',
    render: () => <Lista><ItemDoChecklist tipo="tocar" icone="ciclo" nome="Fazer o ciclo de testes" legenda="os 6 passos, com o ônibus parado" aoTocar={() => {}} /></Lista> },

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
  { id: 'f7-prova-cadeia', folha: 7, rotulo: 'prova da cadeia', legenda: 'os seis blocos, gravados e relidos',
    render: () => <Prova tipo="cadeia" rotulo="GRAVADO E RELIDO" versao={blocosRelidos()} legenda="o módulo devolveu os seis blocos" style={{ marginBottom: 'var(--respiro)' }} /> },
  { id: 'f7-prova-sessao', folha: 7, rotulo: 'prova da sessão', legenda: 'o que sobreviveu ao reinício',
    render: () => <Prova tipo="sessao" rotulo="A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO" versao={blocosRelidos()} legenda="relido do módulo depois de desligar e ligar" /> },
  { id: 'f7-contador-menu', folha: 7, rotulo: 'contador no menu', legenda: 'itens na fila, no canto do cartão',
    render: () => <GradeFerramentas><CartaoFerramenta icone="fila" titulo="Fila de saída" contagem={2} /></GradeFerramentas> },
]
