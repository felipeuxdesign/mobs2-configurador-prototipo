// Folha 8 · a calibração (T10): o que o módulo conta, a distância até o
// painel, o número que vai e o que não se aplica. Texto exato da folha.
import { ValorEmPoco, ReguaDiferenca, ValorAlvo, Declarado } from '../../ds/instrumentos/index.js'

export const especimes = [
  { id: 'f8-valor-em-poco', folha: 8, rotulo: 'valor em poço', legenda: 'o que o módulo conta hoje',
    render: () => <ValorEmPoco rotulo="O MÓDULO CONTA" valor="184.320" unidade="km" /> },
  { id: 'f8-regua-da-diferenca', folha: 8, rotulo: 'régua da diferença', legenda: 'a distância entre os dois · vira "confere" depois',
    render: () => <ReguaDiferenca>diferença de 297.997 km</ReguaDiferenca> },
  { id: 'f8-valor-alvo', folha: 8, rotulo: 'o valor alvo', legenda: 'o número do painel, o que vai pro módulo',
    render: () => <ValorAlvo rotulo="O PAINEL MOSTRA" valor="482.317" unidade="km" legenda="é este que vai para o módulo" /> },
  { id: 'f8-nao-se-aplica', folha: 8, rotulo: 'o que não se aplica', legenda: 'fato declarado, sem vermelho',
    render: () => (
      <Declarado aoPe rotulo="NÃO SE APLICAM NESTE MODELO"
        linhas={[{ nome: 'Rotação', motivo: 'já vem da CAN' }, { nome: 'Velocidade', motivo: 'não precisa' }]} />
    ) },
]
