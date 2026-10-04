// O pacote 2 (D1) · o caminho do herói sem o horímetro: o mesmo do heroi.mjs, do login às 14:30 ao
// encerramento, mas na calibração, semeado o hodômetro, o técnico toca Pular o horímetro — a
// calibração fica concluída e segue pro ciclo de testes; no checklist, a Seção D diz o Horímetro
// não calibrado, conta como resolvido e não bloqueia (a T13 lê etapas.calibracao.puladas).
export default [
  { abre: '' },
  { chega: 'T01', momento: null },
  { ouve: '9:30 · Wi-Fi, sinal e bateria' }, // pacote 4: a hora vem desenhada na barra oficial
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  // a empresa vem sempre antes da unidade (decisão 37, revista em 26/09): o herói tem
  // três empresas, e escolhe a dele — o 05, o 07, as unidades (o quadro do 06) e o 09
  { chega: 'T02', momento: null },
  { ve: 'Pra qual empresa hoje?' },
  { marca: 'Viação Atlântico Sul' },
  { chega: 'T02', momento: '07-momento-empresa-escolhida' },
  { toca: 'Ver as unidades' },
  { chega: 'T02', momento: null },
  { ve: 'Onde você está hoje?' },
  { marca: 'Garagem Várzea' },
  { chega: 'T02', momento: '09-momento-unidade-escolhida-com-trocar-empresa' },
  { fica: 'T02', ms: 600 },
  { toca: 'Sincronizar Garagem Várzea' },
  { chega: 'T03' },
  { chega: 'T03', momento: '02-momento-concluido', entre: [3000, 6000] },
  { ve: 'Pacote de hoje' },
  { ve: 'de 31' },   // os 31 itens do pacote, em cinco grupos
  { toca: 'Ir para o menu' },
  { chega: 'T04' },
  { ve: 'Sem sessão de configuração' },
  // o herói está no 5º dia do acesso: o aviso na primeira chegada ao menu, uma vez (T04/12)
  { ve: 'Seu acesso vence em 2 dias' },
  { dorme: 200 },
  { quieto: true },   // nasce aberto, com o menu: a chegada não anima
  { ve: 'Depois disso, ele pede a senha de novo — e pra isso precisa de rede.' },
  { naoToca: 'CONECTAR MÓDULO' },   // o menu atrás do véu não se toca
  { toca: 'Entendi', anima: [{ prop: 'opacity', ms: 150, em: 'ds-dialogo' }, { prop: 'opacity', ms: 150, em: 'ds-veu' }] },
  { naoVe: 'Seu acesso vence em 2 dias' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  // conectar: a lista, marcar o do herói e o botão (R-14); a T05 só conecta (pacote 1)
  { toca: 'CONECTAR MÓDULO' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { ve: 'Escolha o que está na sua mão.' },
  { marca: 'M2C-0417' },
  { fica: 'T05', ms: 600 },
  { toca: 'Conectar ao M2C-0417' },
  // o diagnóstico do módulo (T07): as sete linhas acendem, uma a cada 600 ms; passando sem
  // trava, a faixa desce, e o primário diz Selecionar ativo
  { chega: 'T07', momento: null },
  { naoVe: 'M2C-0417 · RKT-8H42' },   // a leitura (a 11, o pacote 5): nada em cima do título
  { naoVe: 'ENCERRAR' },
  { ve: 'Diagnóstico do módulo' },
  { desligado: 'Lendo · não saia da tela' },
  { ve: 'ENCERRAR', entre: [3500, 6500] },
  { ve: '7 de 7' },
  { ve: 'M2C-0417' },   // o serial na faixa: o rótulo de cima sai quando ela desce
  { ve: 'sem ativo' },
  { naoVe: 'M2C-0417 · RKT-8H42' },
  { ve: 'Serial no cadastro' },
  { ve: 'VL06 CAN-BT' },
  { ve: '2.3.5' },
  { ve: '13,8 V' },
  { ve: 'fixo · 9 satélites' },
  { ve: 'ignição ligada' },
  { ve: 'na rede' },
  { ve: 'AGUARDANDO A CONFIGURAÇÃO DO ATIVO' },
  { ve: 'A CAN aparece depois que o bloco do ativo for gravado.' },
  { toca: 'Selecionar ativo' },
  { chega: 'T06', momento: null },
  { ve: 'M2C-0417' },
  // o ônibus: marcar o RKT-8H42 e o botão (R-14); a confirmação do vínculo
  { marca: 'RKT-8H42' },
  { fica: 'T06', ms: 600 },
  { naoVe: 'Confirmar o vínculo', ms: 300 },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'Confirmar o vínculo' },
  { ve: 'ESCOLHIDO' },
  { ve: 'frota 1003' },
  { ve: 'Mercedes-Benz' },
  { ve: 'OF-1621 · ônibus urbano' },
  { ve: 'O M2C-0417 fica neste ativo, na Viação Atlântico Sul.' },
  { toca: 'Vincular o módulo' },
  // o que vai ser gravado (T09/05): a tela abre parada, e nada grava antes do toque
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { ve: 'RKT-8H42' },
  { ve: 'ocupação de pinos confere' },
  { ve: 'cabe no módulo · 128 de 192 registros' },
  { ve: 'OF-1621' },
  { ve: '4 regiões' },
  { ve: 'sem fio' },
  { ve: 'intervalo 30 s' },
  { ve: 'm2m.mobs2.br' },
  { fica: 'T09', ms: 600 },
  { naoVe: 'gravando' },
  // a cadeia grava e relê os seis blocos, um por segundo, da Limpeza à Conexão
  { toca: 'Gravar no módulo' },
  { chega: 'T09', momento: null },
  { desligado: 'Gravando · não interrompa' },
  { chega: 'T09', momento: '04-momento-cadeia-concluida', entre: [5000, 8500] },
  { ve: 'GRAVADO E RELIDO' },
  { ve: '6 blocos' },
  { ve: 'o módulo devolveu os seis blocos' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  // a CAN lida (D2): depois da cadeia, o Diagnóstico do módulo abre na 01, parado; é ele
  // que dá ao checklist a alimentação e o GPS
  { toca: 'Diagnóstico do módulo' },
  { chega: 'T07', momento: '01-momento-can-lida' },
  { ve: 'RKT-8H42' },
  { ve: 'Conferido na conexão' },
  { ve: '15 de 15' },
  { ve: 'A CAN · ÔNIBUS URBANO OF-1621' },
  { ve: '980 rpm' },
  { ve: '184.320 km' },
  { ve: 'Ler de novo' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  // a calibração (decisão 52, o pacote 2): o número do painel digitado acende o Semear — a foto
  // do painel é da Seção B do checklist. O hodômetro, e depois o horímetro, opcional, até a
  // calibração completa, que aponta o ciclo de testes (decisão 35)
  { toca: 'Calibração' },
  { chega: 'T10', momento: null },
  { ve: 'O MÓDULO CONTA' },
  { ve: '184.320' },
  { ve: 'lido do módulo às 14:30' },   // o relógio parado, como as referências (a entrega do checklist)
  { ve: 'Depois: Horímetro, opcional' },
  { desligado: 'Digite o que o painel mostra' },
  { digita: '482317', em: 'O PAINEL MOSTRA' },   // calibracao.painel · a-01 · hodômetro
  { chega: 'T10', momento: '05-momento-hodometro-digitado' },
  { ve: 'diferença de 297.997 km' },
  { ve: 'é este que vai para o módulo' },
  { naoVe: 'Fotografar o painel' },   // decisão 52: a foto é da Seção B
  { toca: 'Semear o hodômetro' },
  { desligado: 'Gravando no módulo…' },
  { desligado: 'Voltar ao menu' },   // o semear não para (a decisão do diretor de 25/09)
  { desligado: 'ENCERRAR' },   // e o ENCERRAR faz o mesmo que o voltar: apagado (a lei 17)
  { desligado: 'Relendo…', entre: [500, 1500] },
  { chega: 'T10', momento: '01-momento-hodometro-semeado', entre: [700, 1500] },
  { ve: 'O MÓDULO CONTA AGORA' },
  { ve: 'relido às 14:30 · confere com o painel' },
  // D1: o horímetro é opcional — pular segue pro ciclo, sem a calibração completa
  { ve: 'Pular o horímetro' },
  { ve: 'Calibrar o horímetro' },
  { toca: 'Pular o horímetro' },
  // o ciclo de testes (decisão 54): seis passos, com o ônibus parado; a fila do módulo drena em 3 s,
  // e o disparo acende
  { chega: 'T14' },
  { ve: 'Ciclo de testes' },
  { ve: 'FILA DRENANDO' },
  { ve: '6 mensagens e 2 de diagnóstico saindo do módulo' },
  { ve: '2 de 6 passos' },   // a semente traz 2 feitos (cicloPassosNaEntrada)
  { ve: 'Ignição ligada\nRotação\nRé acionada\nPorta aberta\nCartão do motorista\nIgnição desligada' },
  { naoVe: 'Velocidade' },   // o herói não tem tacógrafo digital (D3)
  { toca: 'Disparar evento de teste', entre: [2000, 4500] },
  // disparado (1 s real vale 4 s de prazo): o evento chega aos 24 s do prazo (6 s reais) e os
  // campos conferem aos 33 (8,25 s); os passos 3 a 6 acendem a +9, +12, +15 e +18 s (T14·1)
  { ve: 'O EVENTO CHEGOU EM', entre: [5000, 7500] },
  { ve: '0:24' },
  { ve: '6 de 6', entre: [1000, 3500] },
  { ve: '3 de 6 passos', entre: [0, 1800] },
  { ve: '4 de 6 passos', entre: [2400, 3600] },
  { ve: '5 de 6 passos', entre: [2400, 3600] },
  { chega: 'T14', momento: '05-momento-ciclo-concluido', entre: [2400, 3600] },
  { ve: '6 de 6 passos' },
  { ve: '14:30:24' },
  // o checklist numa estrutura só (decisão 34): o título com a contagem, a barra e os seis cartões.
  // Depois do ciclo, 23 de 31: a E resolvida, e as cinco fotos de B por fazer (o Painel é foto a
  // tirar, decisão 52)
  { toca: 'Ir para o checklist' },
  { chega: 'T13', momento: null },
  { ve: '23' },
  { ve: 'de 31' },
  { ve: 'o ciclo passou' },
  { ve: 'você fotografa 5 itens' },
  { ve: 'Faltam 5 itens' },   // as cinco fotos: o horímetro pulado não falta
  { desligado: 'Finalizar instalação' },
  // a E aberta: os seis passos dizem confere, e não há ação (13); tocar de novo fecha
  { toca: 'E · Ciclo de testes' },
  { chega: 'T13', momento: '13-momento-e-resolvida' },
  { ve: 'confere' },
  { ve: 'Ignição desligada' },
  { naoToca: 'Fazer o ciclo de testes' },
  { naoToca: 'Ignição ligada' },   // sem seta, é leitura (Lei 16)
  { toca: 'E · Ciclo de testes' },
  { chega: 'T13', momento: null },
  // a D: o hodômetro calibrado, e o horímetro pulado — não calibrado, resolvido, sem bloquear (D1)
  { ve: '10 de 10' },   // a D inteira resolvida, com o horímetro pulado
  { toca: 'D · Configuração' },
  { chega: 'T13' },
  { ve: '482.317 km' },
  { ve: 'Horímetro\nnão calibrado' },
  { naoVe: '9.640 h' },
  { naoToca: 'Horímetro' },   // sem seta, é leitura (Lei 16)
  { toca: 'D · Configuração' },
  { chega: 'T13', momento: null },
  { dorme: 250 },
  // a B cresce no lugar: os itens esmaecem, e as seções de baixo descem (transform)
  { toca: 'B · Montagem', anima: [{ prop: 'opacity', ms: 200, em: 'ds-secao-ck-corpo' }, { prop: 'transform', ms: 200, em: 'ds-secao-ck' }] },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { naoVe: 'fotografado na calibração' },   // o Painel é foto a tirar, como os outros quatro
  { toca: 'Módulo' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  { ve: 'B · MONTAGEM' },
  { ve: 'Módulo fixado e posicionado' },
  { ve: 'Depois: Antena GPS posicionada e livre' },
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: '17-momento-foto-da-antena' },
  { ve: 'Antena GPS posicionada e livre' },
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: '18-momento-foto-do-chicote' },
  { ve: 'Chicote e emendas protegidos' },
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: '19-momento-foto-do-leitor' },
  { ve: 'Leitor posicionado' },
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: '20-momento-foto-do-painel' },
  { ve: 'Painel com hodômetro e horímetro legíveis' },
  { toca: 'Tirar foto' },
  // sem próximo por fazer, volta à Seção B aberta: 5 de 5, e as fotos tiradas
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { ve: 'B · Montagem' },
  { ve: '5 de 5' },
  { ve: '5 fotos tiradas' },
  { naoToca: 'Módulo' },   // a foto tirada fica tirada: sem seta, não se toca
  { naoToca: 'Painel' },
  { naoVe: 'Faltam' },
  { toca: 'Finalizar instalação' },
  // o homologado: o veredito e o relatório no topo, e o servidor confirmou
  { chega: 'T13', momento: '11-momento-homologado' },
  { ve: 'Instalação homologada às 14:30' },
  { ve: 'o relatório leva 12 evidências, o local e o seu nome' },
  { ve: 'o app conferiu' },
  { ve: 'o servidor confirmou' },
  { ve: 'RKT-8H42' },
  // ENCERRAR, depois de homologar: direto, sem o diálogo (decisão 36) — os sete passos,
  // um a cada 600 ms, e o autoteste
  { toca: 'ENCERRAR' },
  { chega: 'T16', momento: null },
  { naoVe: 'Encerrar sem homologar?' },
  { ve: 'Encerrar sessão' },
  { ve: 'Encerrando · não desconecte' },
  { ve: 'Contadores e estado' },
  { ve: 'Autoteste' },
  // cada passo que corre diz o que faz, embaixo do nome (as 8 legendas do tela.md, a entrega de 25/09)
  { ve: 'Grava os contadores e o estado no módulo, pra nada se perder no reinício.' },
  // o herói reinicia por comando: o passo 2 corre sem pedir o corte (T16·1, T16·7)
  { naoVe: 'Grava os contadores e o estado no módulo', entre: [0, 1000] },
  { naoVe: 'Desligue e ligue a alimentação do módulo.' },
  { ve: 'Ele lê de volta o que ficou gravado. É isto que prova que a configuração sobreviveu ao reinício.' },
  { ve: 'Devolve o módulo ao repouso que ele tinha antes da sessão.' },
  { ve: 'Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar.' },
  { ve: 'Guarda o que foi feito aqui, pra ir ao servidor junto com a instalação.' },
  { ve: 'Solta o Bluetooth. O módulo fica livre pra outro aparelho.' },
  // fechado o sétimo passo, a faixa sobe e a tela passa pra Sessão encerrada
  { chega: 'T16', momento: '07-momento-autoteste-correndo', entre: [100, 1500] },
  { ve: 'Sem sessão de configuração' },
  { naoVe: 'ENCERRAR' },
  { ve: 'Sessão encerrada' },
  // o autoteste correndo (07, o pacote 5): as oito assertivas acendem a 400 ms, sem o veredito, e o
  // Voltar ao menu desligado; com a última, o quadro troca pro fim (02): a prova e o Voltar ao menu aceso
  { naoVe: 'A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO' },
  { desligado: 'Voltar ao menu' },
  { ve: 'A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO', entre: [2000, 5000] },
  { chega: 'T16', momento: '02-momento-sessao-encerrada' },
  { ve: 'O ID na plataforma confirma quando a evidência subir.' },
  { ve: '6 blocos' },
  { ve: 'relido do módulo depois de desligar e ligar' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  { ve: 'Sem sessão de configuração' },
  { naoVe: 'ENCERRAR' },
  { naoVe: 'RKT-8H42' },
  { ve: 'toque para procurar' },
  { naoVe: 'Seu acesso vence em 2 dias' },   // o aviso já foi visto: não volta no mesmo dia
  { fica: 'T04', ms: 600 },
]
