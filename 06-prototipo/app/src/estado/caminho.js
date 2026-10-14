// O caminho feliz (o diretor, 13/10): no palco, quem escolhe outro módulo ou outro ativo segue
// o mesmo caminho do herói. O par escolhido dá os nomes — o serial, a placa —, e o que o mock
// guarda de diferente pra ele (o serial fora do cadastro na T07, a configuração que não cabe e
// as cercas demais na T09, a calibração na T10, o ciclo que estoura e o motor desligado na T14,
// a Seção F que reprova na T13, a homologação bloqueada na T16) só se vê na coluna *Estados
// desta tela*, parado.
// A sessão que o técnico abre no caminho (o módulo que ele conecta na T05) e o ativo que ele
// vincula (T06) levam `caminho`. As sementes da fotografia, do endereço, do pulo do palco e da
// coluna não levam: decidem pelo próprio par, e as referências ficam como são.
import { HEROI } from './sementes.js'

// o par com que a tela decide: no caminho, o do herói; fora dele, o próprio
export const parQueDecide = (par, sessao) =>
  sessao?.caminho ? { ...par, moduloSerial: HEROI.moduloSerial, ativoId: HEROI.ativoId } : par

export const noCaminho = (sessao) => Boolean(sessao?.caminho)
