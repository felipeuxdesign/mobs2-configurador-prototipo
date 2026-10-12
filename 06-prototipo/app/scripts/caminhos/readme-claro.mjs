// O pacote 30 · o GIF do modo claro (05-recursos/readme/modo-claro.gif): o mesmo caminho do README
// (readme.mjs), do login ao menu no escuro — o app nasce escuro (R-16) —, e na chegada ao menu a folha
// da Conta, o *Modo claro* ligando (a bolinha desliza, 200) e o app trocando as cores no lugar com a
// folha aberta (300) · a folha fecha, e a volta pelas telas principais segue no claro: conectar, o
// diagnóstico, o vínculo, a cadeia gravada, a CAN ao vivo e a instalação homologada. Grava como o do
// README: GRAVA=… GRAVA_JANELA=1280x900 node scripts/caminho.mjs readme-claro, e o scripts/gif.py monta.
import readme from './readme.mjs'

const olha = (ms = 900) => ({ dorme: ms })
const i = readme.findIndex((p) => p.toca === 'Entendi')
const MODO_CLARO = [
  olha(),
  { toca: 'Conta — Rafael Vieira' },
  { ve: 'Modo claro' },
  olha(1400),
  { toca: 'Modo claro', anima: [{ prop: 'transform', ms: 200, em: 'ds-interruptor-bolinha' }, { prop: 'background-color', ms: 300 }] },
  { executa: `return document.querySelector('.app').dataset.tema === 'claro' ? true : 'o claro não ligou'` },
  olha(1800),
  { toca: 'Fechar' },
  { naoVe: 'Sair da conta' },
]
export default [...readme.slice(0, i + 1), ...MODO_CLARO, ...readme.slice(i + 1)]
