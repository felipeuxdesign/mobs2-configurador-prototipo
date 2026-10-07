// As ações da conferência (o pacote 2, decisão 53; logica.md · As ações da
// conferência · a rodada 2 do retorno do PM): a ação de cada bloco mora na linha dele —
// `Corrigir este bloco` no que diverge, `Enviar agora` no que espera revisão —, e o rodapé
// fica só com a saída, o `Outras ações`; a folha Outras ações (T11/03) tem as outras duas,
// cada uma com o efeito embaixo. A folha fecha no xis e dos outros três jeitos da
// lei 20, e a URL segue (o 03 com ela aberta). Com ela aberta, o ENCERRAR da faixa
// fica aceso e desabilitado. O Reenviar leva à cadeia inteira da T09, e o Apenas
// registrar volta ao menu. Na 00 o voltar não faz nada: o link é o Outras ações.
// Um bloco por vez (D2): o Corrigir este bloco das cercas abre a T09 na manutenção com as cercas
// escolhidas; reenviadas, a conferência reaberta pelo menu marca o leitor e os
// eventos pra revisar em seguida, cada um com o Enviar agora; depois deles, a rede do
// módulo, que ainda diverge; e no fim, tudo confere (02). O 01 e o 05 abrem só
// pela coluna, parados.
const volta = [{ prop: 'transform', ms: 200, em: 'ds-folha' }]
const fecha = [{ prop: 'transform', ms: 150, em: 'ds-folha' }, { prop: 'opacity', ms: 150, em: 'ds-veu' }]
const esc = { tecla: 'Escape' }
const abreAFolha = [
  { toca: 'Outras ações' },
  { chega: 'T11', momento: '03-momento-outras-acoes' },
  { ve: 'Mantém a rede do módulo. Apaga só a configuração.' },
  { ve: 'nada vai pro módulo · só o diagnóstico sobe' },
]
const ESCOLHER = '08-momento-manutencao-escolher-o-bloco'
// um bloco pela manutenção da T09: o escolher abre com ele escolhido, a cadeia curta o reenvia, e o menu leva de volta à conferência
const reenviaPelaT09 = (reenviar, primeira = false) => [
  { chega: 'T09', momento: ESCOLHER },
  { ve: 'MANUTENÇÃO' },
  { ve: reenviar },
  { toca: reenviar },
  { chega: 'T09', momento: '09-momento-manutencao-reenviando' },
  { toca: 'Voltar ao menu', ms: 6000 },
  { chega: 'T04' },
  // a primeira volta ao menu da sessão mostra o aviso do acesso
  ...(primeira ? [{ ve: 'Seu acesso vence em 2 dias' }, { toca: 'Entendi' }] : []),
  { toca: 'Conferir configuração' },
  { chega: 'T11' },
]
export default [
  // ── a 00, pela semente: as quatro linhas, cada uma com o Corrigir este bloco, e o rodapé só com o link ──
  { abre: '?tela=T11' },
  { chega: 'T11', momento: null },
  { ve: 'NÃO BATE COM O CADASTRO', ms: 5000 },
  { ve: '4 de 4' },
  { naoVe: 'Extended ID' },   // a rodada 2: cartão é assunto da plataforma web
  { ve: 'Rede do módulo\nno módulo · uma rede antiga\nno cadastro · a rede da Mobs2\nCorrigir este bloco' },
  { naoVe: 'm2m' },
  { ve: 'Corrigir este bloco' },
  { naoVe: 'Corrigir as cercas' },
  { naoVe: 'divergências' },
  { naoVe: 'VERSÃO' },
  { naoVe: 'Reenviar os 5 blocos' },
  { naoToca: 'Apenas registrar o diagnóstico' },
  // o voltar não faz nada: o link é o Outras ações, que não sai da tela
  esc,
  { fica: 'T11', ms: 500 },
  { chega: 'T11', momento: null },

  // ── a folha, e os quatro jeitos de fechar ──
  ...abreAFolha,
  { desligado: 'ENCERRAR' },            // a faixa acesa em cima do véu, sem toque
  { naoToca: 'Corrigir este bloco' },   // a conferência atrás do véu fica inerte
  { toca: 'Fechar' },
  { chega: 'T11', momento: null },
  { naoVe: 'nada vai pro módulo · só o diagnóstico sobe' },
  { toca: 'ENCERRAR' },                 // fechada a folha, o ENCERRAR responde de novo: o diálogo
  { ve: 'Encerrar antes de terminar?' },
  { toca: 'Continuar a instalação' },
  { naoVe: 'Encerrar antes de terminar?' },
  ...abreAFolha,
  { tocaFora: 'Outras ações', anima: fecha },
  { chega: 'T11', momento: null },
  { naoVe: 'nada vai pro módulo · só o diagnóstico sobe' },
  ...abreAFolha,
  // a folha não tem o puxador (a T11/03): o arraste começa numa linha, e não a toca
  { arrasta: 'Outras ações', de: 'Reenviar os 5 blocos', dy: 40, anima: volta },
  { fica: 'T11', ms: 300 },
  { chega: 'T11', momento: '03-momento-outras-acoes' },
  { arrasta: 'Outras ações', de: 'Apenas registrar o diagnóstico', dy: 120, anima: fecha },
  { chega: 'T11', momento: null },
  { fica: 'T11', ms: 300 },
  { naoVe: 'nada vai pro módulo · só o diagnóstico sobe' },
  ...abreAFolha,
  esc,
  { chega: 'T11', momento: null },
  { naoVe: 'nada vai pro módulo · só o diagnóstico sobe' },

  // ── as outras ações ──
  // Apenas registrar o diagnóstico: registra e volta ao menu
  ...abreAFolha,
  { toca: 'Apenas registrar o diagnóstico' },
  { chega: 'T04' },
  // Reenviar os 5 blocos: a cadeia inteira, pela T09 — o 03 pelo endereço, com a folha aberta
  { abre: '?tela=T11&momento=03-momento-outras-acoes' },
  { chega: 'T11', momento: '03-momento-outras-acoes' },
  { ve: 'Reenviar os 5 blocos' },
  { toca: 'Reenviar os 5 blocos' },
  // a T09 abre no que vai ser gravado (05), e o Gravar no módulo liga a cadeia inteira
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { toca: 'Gravar no módulo' },
  { chega: 'T09', momento: '04-momento-cadeia-concluida', ms: 12000 },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  { ve: 'Seu acesso vence em 2 dias' },
  { toca: 'Entendi' },
  // regravada a cadeia inteira, a mesma sessão confere (T11·2)
  { toca: 'Conferir configuração' },
  { chega: 'T11', momento: '02-momento-tudo-confere' },
  { ve: 'CONFERE COM O CADASTRO', ms: 5000 },
  { naoVe: 'Outras ações' },
  { toca: 'Voltar ao menu', ms: 5000 },
  { chega: 'T04' },

  // ── um bloco por vez (decisão 53, D2): as cercas, os eventos, o leitor e a rede do módulo ──
  { abre: '?tela=T11' },
  { toca: 'Corrigir este bloco: Cercas', ms: 5000 },
  ...reenviaPelaT09('Reenviar as cercas', true),
  // as cercas conferem; o leitor e os eventos ficam pra revisar em seguida, cada um com o Enviar agora, e a
  // rede do módulo ainda diverge
  { ve: 'NÃO BATE COM O CADASTRO', ms: 5000 },
  { ve: '1 de 4' },
  { ve: 'Eventos\nrevisar em seguida\ndependem das cercas, que acabaram de mudar\nEnviar agora' },
  { ve: 'Leitor\nrevisar em seguida\nusa as cercas, que acabaram de mudar\nEnviar agora' },
  { ve: 'Cercas\n4 regiões' },
  { ve: 'Outras ações' },
  // na ordem da cadeia: o leitor antes dos eventos — o leitor arrasta os eventos (M.cadeia.arraste), e
  // enviado depois deles, os marcaria de novo
  { toca: 'Enviar agora: Leitor', ms: 5000 },
  ...reenviaPelaT09('Reenviar o leitor'),
  { ve: 'Leitor\nleitor sem fio', ms: 5000 },
  { ve: 'Eventos\nrevisar em seguida' },
  { toca: 'Enviar agora: Eventos', ms: 5000 },
  ...reenviaPelaT09('Reenviar os eventos'),
  // só a rede do módulo diverge: o Corrigir dela
  { ve: '1 de 4', ms: 5000 },
  { naoVe: 'revisar em seguida' },
  { toca: 'Corrigir este bloco: Rede do módulo', ms: 5000 },
  ...reenviaPelaT09('Reenviar a conexão'),
  // tudo confere
  { chega: 'T11', momento: '02-momento-tudo-confere' },
  { ve: 'CONFERE COM O CADASTRO', ms: 5000 },
  { ve: '4 de 4' },
  { toca: 'Voltar ao menu', ms: 5000 },
  { chega: 'T04' },

  // ── tudo confere, pelo endereço: o voltar é o Voltar ao menu ──
  { abre: '?tela=T11&momento=02-momento-tudo-confere' },
  { ve: 'CONFERE COM O CADASTRO', ms: 5000 },
  esc,
  { chega: 'T04' },

  // ── o 01 e o 05, pela coluna: parados e sem toque ──
  { abre: '?tela=T11&estado=01-estado-conteudo-que-o-app-nao-reconhece' },
  { ve: 'Mantém a rede do módulo. Apaga só a configuração.' },
  { ve: 'Rede do módulo\na rede da Mobs2' },
  { naoToca: 'Reenviar os 5 blocos' },
  { naoToca: 'Apenas registrar o diagnóstico' },
  esc,
  { fica: 'T11', ms: 500 },
  { chega: 'T11', estado: '01-estado-conteudo-que-o-app-nao-reconhece' },
  { abre: '?tela=T11&estado=05-estado-revisar-em-seguida' },
  { ve: 'REVISAR EM SEGUIDA' },
  { ve: 'M2C-0417' },
  { naoToca: 'Enviar agora' },
  { naoToca: 'Voltar ao menu' },
  esc,
  { fica: 'T11', ms: 500 },
  { chega: 'T11', estado: '05-estado-revisar-em-seguida' },
]
