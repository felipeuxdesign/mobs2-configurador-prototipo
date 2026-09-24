// Folha 6 · o checkbox, nos dois estados (um componente só).
import { Checkbox } from '../../ds/index.js'

export const especimes = [
  { id: 'f6-checkbox', folha: 6, rotulo: 'checkbox', legenda: 'o marcador de escolha, com o texto do que se confirma', render: () => <Checkbox>Lembrar meu usuário</Checkbox> },
  { id: 'f6-checkbox-marcado', folha: 6, rotulo: 'checkbox marcado', legenda: 'o mesmo poço com o quadrado lima de 10 · surge em 150ms', render: () => <Checkbox marcado>Lembrar meu usuário</Checkbox> },
]
