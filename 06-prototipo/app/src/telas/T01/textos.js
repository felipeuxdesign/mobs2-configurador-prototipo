// Os textos da T01, copiados do 02-telas/T01-login/textos.md — nunca
// redigitados. Onde o texto traz um dado (o telefone, os minutos, o que resta),
// a função monta com o valor do mock que a tela passa; o resto é a letra da
// referência. Os nomes pro leitor de tela que só o HTML tem (o h1 escondido
// 'Entrar', 'Mostrar a senha', 'Fechar', o alt 'Mobs2') vêm das referências.
export const TX = {
  // o login · 00 e 01
  entrar: 'Entrar',
  configurador: 'CONFIGURADOR',
  logo: 'Mobs2',
  usuario: 'USUÁRIO',
  senha: 'SENHA',
  mostrarSenha: 'Mostrar a senha',
  ocultarSenha: 'Ocultar a senha',
  lembrar: 'Lembrar meu usuário',
  esqueci: 'Esqueci a senha',
  erroTitulo: 'USUÁRIO OU SENHA INCORRETOS',
  erroFrase: 'Confira os dois e entre de novo.',

  // a recuperação · o cabeçalho do passo
  recuperar: 'RECUPERAR ACESSO',
  de: (total) => `de ${total}`,
  voltarLogin: 'Voltar ao login',

  // 02 · o canal
  depois: 'Depois: o código · a nova senha',
  tituloCanal: ['Para onde mandamos', 'o código?'],
  mensagem: 'MENSAGEM',
  email: 'E-MAIL',
  valePorMinutos: (min) => `Vale por ${min} minutos`,
  restaEnvio: (n) => `resta ${n} envio nesta hora`,
  enviarCodigo: 'Enviar o código',

  // 03 · 05 · 06 · 07 · 12 · 13 · o código
  mandamos: (contato) => `Mandamos para ${contato}`,
  mandamosOutro: (contato) => `Mandamos outro para ${contato}`,
  digite: 'Digite o código',
  naoConfere: 'Código não confere',
  valePor: 'VALE POR',
  tentativasRestantes: 'TENTATIVAS RESTANTES',
  naTerceira: 'na terceira, o código expira',
  expirouFrase: 'o código expirou — peça um novo',
  expirou: 'O CÓDIGO EXPIROU',
  // a espera do reenvio, no resto do recuperar, se chama "reenviar em" (decisão 31)
  reenviarEm: (seg, n) => `Reenviar em ${seg} s · resta ${n} envio nesta hora`,
  reenviarEmUltimo: (seg) => `Reenviar em ${seg} s · este foi o último envio desta hora`,
  reenvioLiberado: (n) => `Reenvio liberado · resta ${n} envio nesta hora`,
  aindaVale: (tempo) => `Ainda vale por ${tempo}`,
  aindaValeEReenvio: (tempo, seg) => `Ainda vale por ${tempo} · reenviar em ${seg} s`,
  pecaNovo: (n) => `Peça um código novo · resta ${n} envio nesta hora`,
  naoRecebi: 'Não recebi o código',
  confirmar: 'Confirmar',
  tentarDeNovo: 'Tentar de novo',
  enviarOutro: 'Enviar outro código',

  // 04 · 11 · a folha: duas saídas (decisão 32). A espera é a contagem no
  // lugar da seta (o minSeg do reenvio), não mais texto na linha (decisão 31)
  fechar: 'Fechar',
  conferirReenviar: 'Conferir e reenviar',
  mandarEmail: 'Mandar para o e-mail',

  // 08 · a senha nova
  seisItens: 'Os seis itens marcam sozinhos',
  crieSenha: 'Crie a nova senha',
  codigoConferido: 'Código conferido',
  requisitos: {
    tamanho: (r) => `${r.minimo} caracteres ou mais`,
    caixas: () => 'Maiúscula e minúscula',
    numero: () => 'Um número',
    simbolo: () => 'Um símbolo (!@#$…)',
    'sem-usuario-nem-sequencia': () => 'Sem seu usuário nem sequências',
    'diferente-das-ultimas': (r) => `Diferente das ${r.ultimas} últimas`,
  },
  confereAoSalvar: 'confere ao salvar',
  salvarEntrar: 'Salvar e entrar',

  // 09 · o diálogo
  senhaAlterada: 'Senha alterada',
  senhaAlteradaFrase: 'A senha nova já vale. Os outros aparelhos saíram da sua conta.',
  entrarComNova: 'Entrar com a senha nova',
}
