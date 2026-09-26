// O teclado nunca esconde o que importa (06-prototipo/CLAUDE.md, regra 10;
// logica.md, O teclado): em cada campo do app, o foco e o teclado abrindo — a
// janela encolhe de 800 pra 480, como no Chrome do Android com o
// interactive-widget=resizes-content do index.html. O app encolhe junto, o
// miolo traz o campo em foco com o rótulo, e o rodapé sobe: o botão principal
// fica acima do teclado. O teclado fechando, o app volta aos 800. O campo do
// painel da T10 e o código da T01 abrem o teclado numérico. E o teclado aberto
// num celular baixo (a janela mais larga que alta) não deita o app (regra 11).
// No fim, o Safari do iPhone, onde o teclado cobre a página sem encolhê-la: só
// a janela que se vê encolhe (o { sobreposto } da régua), e a peça encolhe o app.
const abre = (janela = [360, 480]) => [{ janela }, { app: janela }]
const fecha = [{ janela: [360, 800] }, { app: [360, 800] }]

export default [
  // ── T01 · a entrada: o usuário e a senha, com o Entrar e o Esqueci a senha ──
  { abre: '?tela=T01' },
  { app: [360, 800] },
  { foca: 'SENHA', teclado: 'texto' },
  ...abre(),
  { aVista: 'SENHA' },
  { aVista: 'Entrar' },
  { aVista: 'Esqueci a senha' },
  // outro campo, com o teclado aberto
  { foca: 'USUÁRIO', teclado: 'texto' },
  { aVista: 'USUÁRIO' },
  { aVista: 'Entrar' },
  ...fecha,
  // ── o celular baixo: o teclado deixa a janela mais larga que alta, e o app não deita ──
  { foca: 'SENHA' },
  ...abre([360, 300]),
  { aVista: 'SENHA' },
  { aVista: 'Entrar' },
  ...fecha,
  // com o teclado aberto, o Entrar segue: a T02, na mesma janela
  { foca: 'SENHA' },
  ...abre(),
  { toca: 'Entrar' },
  { chega: 'T02' },
  { app: [360, 480] },
  ...fecha,

  // ── T01 · o código: o teclado numérico, e o Confirmar ──
  { abre: '?tela=T01&momento=03-momento-recuperar-digitar-codigo' },
  { foca: 'Digite o código', teclado: 'numerico' },
  ...abre(),
  { aVista: 'Digite o código' },
  { aVista: 'Confirmar' },
  ...fecha,
  // ── T01 · a senha nova, e o Salvar e entrar ──
  { abre: '?tela=T01&momento=08-momento-recuperar-nova-senha' },
  { foca: 'Crie a nova senha', teclado: 'texto' },
  ...abre(),
  { aVista: 'Crie a nova senha' },
  { aVista: 'Salvar e entrar' },
  ...fecha,

  // ── T02 · a busca, no mundo da lista longa ──
  { abre: '?tela=T02&momento=03-momento-busca-sem-resultado' },
  { foca: 'Buscar unidade ou cidade', teclado: 'texto' },
  ...abre(),
  { aVista: 'Buscar unidade ou cidade' },
  { aVista: 'Escolha uma unidade' },
  ...fecha,

  // ── T06 · a busca do pacote, com o Usar este ativo e o Voltar ao menu ──
  { abre: '?tela=T06' },
  { foca: 'Buscar placa, frota ou módulo', teclado: 'texto' },
  ...abre(),
  { aVista: 'Buscar placa, frota ou módulo' },
  { aVista: 'Usar este ativo' },
  { aVista: 'Voltar ao menu' },
  ...fecha,

  // ── T10 · o campo do painel: o teclado numérico, e o botão que diz o que falta ──
  { abre: '?tela=T10' },
  { foca: 'O PAINEL MOSTRA', teclado: 'numerico' },
  ...abre(),
  { aVista: 'O PAINEL MOSTRA' },
  { aVista: 'Digite o que o painel mostra' },
  { digita: '482317', em: 'O PAINEL MOSTRA' },   // calibracao.painel · a-01 · hodômetro
  { aVista: 'O PAINEL MOSTRA' },
  { aVista: 'Fotografe o painel' },
  { aVista: 'Voltar ao menu' },
  ...fecha,

  // ── T13 · o que aconteceu no não conforme, e o primário acima do teclado (a decisão 39, a
  //    última entrega: o campo é O QUE ACONTECEU, e na 08 o primário é o Fotografar o problema) ──
  { abre: '?tela=T13&momento=08-momento-nao-conforme-com-justificativa' },
  { foca: 'O QUE ACONTECEU', teclado: 'texto' },
  ...abre(),
  { aVista: 'O QUE ACONTECEU' },
  { aVista: 'Fotografar o problema' },
  { digita: 'Suporte trincado; fixei com abraçadeira até a troca.', em: 'O QUE ACONTECEU' },   // checklist.exemploJustificativa (AC-12)
  { aVista: 'O QUE ACONTECEU' },
  { aVista: 'Fotografar o problema' },
  { aVista: 'Voltar ao checklist' },
  ...fecha,

  // ── o Safari do iPhone: o teclado por cima da página, que não encolhe — a peça mede o que sobra ──
  { abre: '?tela=T01' },
  { foca: 'SENHA' },
  { sobreposto: 320 },
  { app: [360, 480] },
  { aVista: 'SENHA' },
  { aVista: 'Entrar' },
  // o navegador rolou a página 120 pra mostrar o campo: o app desce junto, e segue inteiro no que se vê
  { sobreposto: 320, rolou: 120 },
  { app: [360, 480] },
  { aVista: 'SENHA' },
  { aVista: 'Entrar' },
  { sobreposto: 0 },
  { app: [360, 800] },
  { abre: '?tela=T10' },
  { foca: 'O PAINEL MOSTRA', teclado: 'numerico' },
  { sobreposto: 320 },
  { app: [360, 480] },
  { aVista: 'O PAINEL MOSTRA' },
  { aVista: 'Digite o que o painel mostra' },
  { sobreposto: 0 },
  { app: [360, 800] },
  // no palco largo (um tablet), o teclado cobre o pé do celular: o app encolhe até o que sobra, dentro da moldura
  { janela: [1440, 900] },
  { abre: '?tela=T13&momento=08-momento-nao-conforme-com-justificativa' },
  { foca: 'O QUE ACONTECEU' },
  { sobreposto: 400 },
  { app: [360, 450] },
  { aVista: 'O QUE ACONTECEU' },
  { aVista: 'Fotografar o problema' },
  { sobreposto: 0 },
  { app: [360, 800] },
  // o Chrome de um tablet Android: o teclado encolhe a página, e o celular não encolhe junto (retrato.js,
  // alturaDoPalco) — fica do tamanho que tinha, e o app encolhe até o que sobra, como no Safari.
  // Na escala de 1280 × 800 (0,91, a moldura da decisão 43: 752 / 826), os 450 que sobram são 494 do app
  { janela: [1280, 800] },
  { abre: '?tela=T13&momento=08-momento-nao-conforme-com-justificativa' },
  { foca: 'O QUE ACONTECEU' },
  { janela: [1280, 450] },
  { app: [360, 494] },
  { aVista: 'O QUE ACONTECEU' },
  { aVista: 'Fotografar o problema' },
  { janela: [1280, 800] },
  { app: [360, 800], centrado: true },
  // o celular deitado, com o teclado: o app segue em pé, na escala de antes (0,38: 312 / 826), e não encolhe pra caber
  // nos 160 que sobram; o app encolhe até eles (424 do app), com o campo e o Entrar à vista
  { janela: [800, 360] },
  { abre: '?tela=T01' },
  { app: [360, 800], centrado: true },
  { foca: 'SENHA' },
  { janela: [800, 160] },
  { app: [360, 424] },
  { aVista: 'SENHA' },
  { aVista: 'Entrar' },
  { janela: [800, 360] },
  { app: [360, 800], centrado: true },
  { janela: [360, 800] },
  { app: [360, 800] },
]
