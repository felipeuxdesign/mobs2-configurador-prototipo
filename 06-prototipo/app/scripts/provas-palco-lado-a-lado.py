#!/usr/bin/env python3
# O lado a lado do palco, pro arquiteto: a referência à esquerda, o protótipo à
# direita, com um título curto em cima de cada lado. Lê as fotos que o
# scripts/provas-palco.mjs tirou (prints/provas-palco/) e as medidas dele
# (prints/provas-palco/medidas.json), e grava em ../para-o-arquiteto/palco/:
#   01-no-fluxo.png · 02-num-estado.png · 03-tela-com-muitos-estados.png ·
#   04-painel-aberto.png — o quadro da referência (1440 × 900, 1×) contra o palco
#   rodando na mesma janela, a 1×, sem reescalar;
#   00-componentes.png — a folha contra as peças do palco, fotografadas a 1× e
#   postas no lugar de cada espécime da folha, com as medidas do palco rodando no
#   lugar da tabela.
# As cores e a letra são as do app (03-design-system/tokens.css e a Barlow de
# 05-recursos/fontes): é ferramenta do ciclo, não do app.
# Uso: python3 scripts/provas-palco-lado-a-lado.py (o provas-palco.mjs chama no fim)
import json
import os
from PIL import Image, ImageDraw, ImageFont

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAIZ = os.path.normpath(os.path.join(APP, '..', '..'))
REF = os.path.join(RAIZ, '06-prototipo', 'palco', 'referencias', 'png')
FOTOS = os.path.join(APP, 'prints', 'provas-palco')
SAIDA = os.path.join(RAIZ, '06-prototipo', 'para-o-arquiteto', 'palco')
FONTES = os.path.join(RAIZ, '05-recursos', 'fontes')
os.makedirs(SAIDA, exist_ok=True)

MED = json.load(open(os.path.join(FOTOS, 'medidas.json'), encoding='utf-8'))

# os tokens (tokens.css): o fundo da página, a faixa, a borda, as tintas
FUNDO = '#0F0D14'      # --fundo-pagina
FAIXA = '#16131D'      # --fundo-faixa
BORDA = '#2B2540'      # --borda
TRACEJADO = '#221D2E'  # --borda-rodape (a moldura tracejada da folha)
TINTA = '#F2F0F7'      # --tinta
SECUNDARIA = '#A9A2BC' # --tinta-secundaria
FORTE = '#C9C3DA'      # --tinta-forte
APAGADA = '#867E9A'    # --tinta-apagada
PALCO = '#16131D'      # --fundo-faixa (o pacote 4)


def fonte(peso, tam):
    return ImageFont.truetype(os.path.join(FONTES, f'barlow-latin-{peso}-normal.woff2'), tam)


def texto(d, xy, s, f, cor, espaco=0.0):
    """o texto, com a letra espaçada (o letter-spacing dos rótulos) quando pedem"""
    x, y = xy
    if not espaco:
        d.text((x, y), s, font=f, fill=cor)
        return d.textlength(s, font=f)
    x0 = x
    for ch in s:
        d.text((x, y), ch, font=f, fill=cor)
        x += d.textlength(ch, font=f) + espaco
    return x - x0


def quebra(d, s, f, largura):
    """as linhas do texto que cabem na largura"""
    linhas, atual = [], ''
    for p in s.split(' '):
        tenta = (atual + ' ' + p).strip()
        if d.textlength(tenta, font=f) <= largura or not atual:
            atual = tenta
        else:
            linhas.append(atual)
            atual = p
    if atual:
        linhas.append(atual)
    return linhas


def paragrafo(d, xy, s, f, cor, largura, entrelinha=1.4):
    x, y = xy
    alt = f.size * entrelinha
    for l in quebra(d, s, f, largura):
        d.text((x, y), l, font=f, fill=cor)
        y += alt
    return y


def cabecalho(d, x, y, largura, titulo, sub):
    """o título curto de um lado: a linha forte e a linha de baixo, quebrada na largura"""
    texto(d, (x, y), titulo, fonte(700, 26), TINTA)
    return paragrafo(d, (x, y + 38), sub, fonte(500, 17), SECUNDARIA, largura, 1.35)


def tracejado(d, caixa, cor=TRACEJADO, passo=3):
    x0, y0, x1, y1 = [round(v) for v in caixa]
    for x in range(x0, x1, passo * 2):
        d.line([(x, y0), (min(x + passo - 1, x1), y0)], fill=cor)
        d.line([(x, y1), (min(x + passo - 1, x1), y1)], fill=cor)
    for y in range(y0, y1, passo * 2):
        d.line([(x0, y), (x0, min(y + passo - 1, y1))], fill=cor)
        d.line([(x1, y), (x1, min(y + passo - 1, y1))], fill=cor)


def lado_a_lado(esq, dir_, tit_esq, sub_esq, tit_dir, sub_dir, saida):
    """a referência à esquerda, o protótipo à direita, no mesmo tamanho, com o título em cima de cada um"""
    M, VAO = 32, 32
    w, h = esq.size
    assert dir_.size == esq.size, f'tamanhos diferentes: {esq.size} e {dir_.size}'
    rascunho = ImageDraw.Draw(Image.new('RGB', (10, 10)))
    alt_tit = max(len(quebra(rascunho, sub_esq, fonte(500, 17), w)), len(quebra(rascunho, sub_dir, fonte(500, 17), w))) * 17 * 1.35 + 38 + 24
    alt_tit = int(alt_tit)
    tela = Image.new('RGB', (M + w + VAO + w + M, M + alt_tit + h + M), FUNDO)
    d = ImageDraw.Draw(tela)
    xs = [M, M + w + VAO]
    for x, tit, sub in ((xs[0], tit_esq, sub_esq), (xs[1], tit_dir, sub_dir)):
        cabecalho(d, x, M, w, tit, sub)
    for x, img in ((xs[0], esq), (xs[1], dir_)):
        tela.paste(img.convert('RGB'), (x, M + alt_tit))
        d.rectangle([x - 1, M + alt_tit - 1, x + w, M + alt_tit + h], outline=BORDA)
    tela.save(saida, optimize=True)
    print('gravado', os.path.relpath(saida, RAIZ), f'{tela.size[0]} × {tela.size[1]}')


def num(v):
    return ('%g' % round(v, 2)).replace('.', ',')


# ─── os quatro modos ─────────────────────────────────────────────────────────
linhas = {(l['janela'][0], l['modo']): l for l in MED['palco']['linhas'] if 'janela' in l}
quadros = {q['quadro']: q for q in MED['palco']['quadrosA90']}
MODOS = [
    ('01-no-fluxo', '?tela=T04', 'no fluxo, a T04',
     'O quadro lista 4 dos 7 estados da T04; a coluna do palco lista todos os do índice (PALCO-A4). Foto depois do Entendi: na chegada ao menu, a semente mostra o aviso do acesso (T04 tela.md). O quadro traz a T04/00, sem rede (Últimas instalações sem conexão); o fluxo do palco tem rede.'),
    ('02-num-estado', '?tela=T07&estado=04-estado-firmware-nao-homologado', 'num estado, a T07 em Firmware não homologado',
     'A mesma moldura do fluxo; o que avisa que está parado é o Voltar ao fluxo.'),
    ('03-tela-com-muitos-estados', '?tela=T07', 'a T07, com os estados em grupos',
     'O MÓDULO e A CAN, os grupos do índice (a regra dos seis); o nome do grupo na tinta e na letra do rótulo de 10 (lei 11, PALCO-A15).'),
    ('04-painel-aberto', '?tela=T07&painel=1', 'o painel aberto, na T07',
     'O quadro anda o celular e a coluna 90 à direita; no palco o painel passa por cima e nada se mexe (palco.md, o quadro 00: não se mexe quando o painel abre). O quadro desenha a coluna da T07 sem os grupos; o palco agrupa, como o 02 e o 03.'),
]
for ref, url, o_que, nota in MODOS:
    foto = os.path.join(FOTOS, ref + '-app.png')
    if not os.path.exists(foto):
        print('sem a foto', ref)
        continue
    q, l = quadros[ref], linhas[(1440, ref)]
    c, co = q['celular'], q['coluna']
    sub_ref = (f'1440 × 900 a 1× · o celular desenhado a 90%: {num(c[2])} × {num(c[3])}, no {num(c[0])}, {num(c[1])} · '
               f'borda {q["borda"]}, canto {q["cantos"][0]} e {q["cantos"][1]}'
               + (f' · a coluna a {num(co["distancia"])}, com {num(co["altura"])} de altura, {co["estados"]} estados' if co else ''))
    lc, lk = l['celular'], l['coluna']
    sub_app = (f'a mesma janela, 1440 × 900 a 1×, sem reescalar · o celular em tamanho real (a escala é 1): {num(lc[2])} × {num(lc[3])}, no {num(lc[0])}, {num(lc[1])} · '
               f'a silhueta: borda 8, canto 36 e 28'
               + (f' · a coluna a {num(lk[0] - lc[0] - lc[2])}, com {num(lk[3])} de altura, {l["folha"]["estados"]} estados' if lk else '')
               + f' · {nota}')
    lado_a_lado(Image.open(os.path.join(REF, ref + '.png')), Image.open(foto),
                f'REFERÊNCIA · palco/referencias/png/{ref}.png', sub_ref,
                f'PROTÓTIPO · {url} · {o_que}', sub_app, os.path.join(SAIDA, ref + '.png'))

# ─── a folha 00: as peças do palco no lugar dos espécimes ────────────────────
P = MED['fotos']['pecas']
F = P.get('folha')
ref00 = os.path.join(REF, '00-componentes.png')
if F and os.path.exists(ref00):
    folha = Image.open(ref00).convert('RGB')
    W, H = folha.size
    pal = Image.new('RGB', (W, H + 800), FUNDO)  # cortada no fim, na altura do que coube
    d = ImageDraw.Draw(pal)
    rot = fonte(700, 10)
    leg = fonte(500, 12)

    # o título da folha e os rótulos das partes, no mesmo lugar
    t = F['titulo']
    texto(d, (t[0]['caixa'][0], t[0]['caixa'][1]), 'PALCO DO PROTÓTIPO · AS PEÇAS RODANDO', rot, APAGADA, 1.6)
    texto(d, (t[1]['caixa'][0], t[1]['caixa'][1]), 'O palco de revisão, no protótipo', fonte(700, 30), TINTA)
    texto(d, (t[2]['caixa'][0], t[2]['caixa'][1]), 'Cada peça fotografada no palco rodando, a 1×, e posta no lugar do espécime da folha. Embaixo, o que se mediu.', fonte(400, 15), SECUNDARIA)
    # os rótulos das partes de cima; os das tabelas vão depois, que a coluna da T04 do palco é mais alta que a da folha
    y_tabelas = min(t_[1] for t_ in F['tabelas']) if F['tabelas'] else H
    for r in F['rotulos'][1:]:
        if r['caixa'][1] < y_tabelas - 40:
            texto(d, (r['caixa'][0], r['caixa'][1]), r['texto'], rot, APAGADA, 1.6)

    def cola(nome, x, y, margem=0):
        p = P.get(nome, {})
        if not p.get('foto'):
            paragrafo(d, (x, y), f'{nome}: {p.get("erro", "sem foto")}', leg, APAGADA, 260)
            return None
        img = Image.open(os.path.join(APP, p['foto'])).convert('RGB')
        pal.paste(img, (round(x) - margem, round(y) - margem))
        return img.size

    def legenda(x, y, s, largura):
        return paragrafo(d, (x, y), s, leg, APAGADA, largura)

    # o quadrado: normal, pressionado e com o foco do teclado (as fotos têm 4, 4 e 6 de folga em volta)
    for (nome, margem, largura, s), caixa in zip([
            ('quadrado-normal', 4, 150, 'o quadrado · ?tela=T04'),
            ('quadrado-pressionado', 4, 150, 'pressionado · o botão apertado em cima dele'),
            ('quadrado-foco', 6, 170, 'o foco do Tab' + ('' if 'NÃO' not in P.get('quadrado-foco', {}).get('como', '') else ' (o foco não ficou nele)'))],
            F['quadrados']):
        cola(nome, caixa[0], caixa[1], margem)
        legenda(caixa[0], caixa[1] + caixa[3] + 10, s, largura)

    # o celular em miniatura (o palco numa janela de 369: a escala dá os 321 da folha) e o que se mediu
    c = F['celular']
    tam = cola('celular', c[0], c[1], 2)
    xs = c[0] + c[2] + 28
    y = c[1] + 4
    l1440 = [l for l in MED['palco']['linhas'] if l.get('janela') == [1440, 900] and l.get('modo') == '01-no-fluxo'][0]
    b = MED.get('barra') or {}
    for s, cor in [
        ('?tela=T04 numa janela de 1440 × 369 · a escala (321/816) põe o celular na altura da miniatura, com o app dentro', FORTE),
        (f'medido a 1440 × 900 e a 1920 × 1080: {l1440["conf"]["c_porFora"]["medido"][0]} × {l1440["conf"]["c_porFora"]["medido"][1]} por fora · a borda de 8 quase-preta · canto 36 por fora e 28 na tela · o fio de luz, o contorno e a sombra · a mesma moldura no fluxo e num estado', APAGADA),
        (f'as barras oficiais do Android, em cima e embaixo: {b.get("a_desenhoOficialEmCima", "—")} e {b.get("a_navegacaoOficial", "—")} telas medidas', APAGADA),
    ]:
        y = paragrafo(d, (xs, y), s, leg, cor, 360, 1.45) + 10

    # a linha do painel: normal, pressionada e a da tela aberta
    for (nome, s), caixa in zip([
            ('linha-normal', 'normal · ?tela=T04&painel=1, a linha da T07'),
            ('linha-pressionada', 'pressionada · o botão apertado em cima dela'),
            ('linha-aberta', 'a tela aberta · ?tela=T07&painel=1')], F['linhas']):
        tam = cola(nome, caixa[0], caixa[1])
        legenda(caixa[0], caixa[1] + (tam[1] if tam else caixa[3]) + 10, s, 280)

    # a coluna: no fluxo e num estado (a T04), a da T07 e a tela sem estados — o conteúdo no lugar do conteúdo da folha,
    # com a moldura tracejada da folha em volta, do tamanho do que o palco desenha
    fundo_colunas = 0
    for (nome, s), tr in zip([
            ('coluna-no-fluxo', 'no fluxo · ?tela=T04, com os 7 do índice'),
            ('coluna-num-estado', 'num estado · ?tela=T04&estado=03-estado-faixa-modulo-com-falha'),
            ('coluna-T07', 'a T07 · os estados em grupos, O módulo e A CAN'),
            ('sem-coluna', '')], F['tracejadas']):
        bx = tr['caixa']
        if nome == 'sem-coluna':
            tam = cola(nome, bx[0], bx[1])
            tracejado(d, (bx[0], bx[1], bx[0] + (tam[0] if tam else bx[2]) - 1, bx[1] + (tam[1] if tam else bx[3]) - 1))
            sc = P.get('semColuna', {})
            s = (f'?tela=T01, o lugar da coluna · desde que a T08 saiu (pacote 1), nenhuma tela fica sem estado · a folha diz que a T01 e a T02 não mostram coluna, '
                 f'mas a T01 {sc.get("T01", "—")} e a T02 {sc.get("T02", "—")}: as duas têm estados no índice (palco.md; PALCO-N2 do C0)')
            fundo_colunas = max(fundo_colunas, legenda(bx[0], bx[1] + (tam[1] if tam else bx[3]) + 10, s, 262))
            continue
        x, y = tr['conteudo'][0], tr['conteudo'][1]
        tam = cola(nome, x, y)
        alto = (tam[1] if tam else 200) + 32
        tracejado(d, (bx[0], bx[1], bx[0] + bx[2] - 1, bx[1] + alto + 1))
        fundo_colunas = max(fundo_colunas, legenda(bx[0], bx[1] + alto + 12, s, 262))

    # as tabelas: o que se mediu no palco rodando, no lugar das MEDIDAS E CORES e do MOVIMENTO
    fo = l1440['folha']
    l04 = [l for l in MED['palco']['linhas'] if l.get('janela') == [1440, 900] and l.get('modo') == '04-painel-aberto'][0]
    mexe = [l for l in MED['palco']['linhas'] if l.get('janela') == [1440, 900] and l.get('modo') == 'o painel não mexe'][0]
    medidas = [
        ('PALCO', f'fundo {fo["fundo"]} (#16131D, --fundo-faixa)'),
        ('COLUNA', f'{num(fo["colunaLargura"])} de largura, {l1440["conf"]["e_colunaA40"]["medido"]} à direita do celular, com a altura dele ({num(l1440["coluna"][3])}), o conteúdo no meio · linhas de {num(fo["linhaDaColuna"])}'),
        ('PAINEL', f'{num(l04["folha"]["painel"]["largura"])} de largura · fundo {l04["folha"]["painel"]["fundo"]} (#16131D) · cabeçalho {num(l04["folha"]["painel"]["cabeca"])} · linhas de {num(l04["folha"]["painel"]["linha"])}'),
        ('CELULAR', f'o app em tamanho real, 360 × 800 · 376 × 816 por fora · a silhueta: borda 8, canto 36 e 28 · no centro da janela ({l1440["conf"]["d_centroHorizontal"]["medido"]} dos lados, {l1440["conf"]["d_centroVertical"]["medido"]} em cima e embaixo) · escala 1 a 1440 × 900 e a 1920 × 1080'),
        ('ESTADO', 'a mesma moldura do fluxo, medida igual nos quatro modos · o app parado, sem toque'),
    ]
    movimento = [
        ('PAINEL', f'transition: {l04["folha"]["painel"]["transicao"]}'),
        ('CELULAR', f'não se mexe quando o painel abre: {"no mesmo lugar" if mexe["passa"] else "SE MEXE"} com e sem o painel ({", ".join(num(v) for v in mexe["medido"]["semPainel"])})'),
    ]
    # as tabelas descem o que as colunas cresceram (a folha lista 3 dos 7 estados da T04)
    desce = max(0, fundo_colunas + 44 - (y_tabelas - 26))
    for r in F['rotulos'][1:]:
        if r['caixa'][1] >= y_tabelas - 40:
            texto(d, (r['caixa'][0], r['caixa'][1] + desce), r['texto'] + (f'  ·  {round(desce)} mais embaixo que na folha: a coluna da T04 é mais alta' if desce and r['texto'].startswith('MEDIDAS') else ''), rot, APAGADA, 1.6)
    fim = 0
    for (x, y, w, h), linhas_ in zip(F['tabelas'], (medidas, movimento)):
        y += desce
        caixa_w = 640
        yy = y
        alturas = []
        for k, v in linhas_:
            alturas.append(max(40, len(quebra(d, v, fonte(400, 13), caixa_w - 32 - 100)) * 13 * 1.45 + 20))
        d.rounded_rectangle([x, y, x + caixa_w, y + sum(alturas)], radius=4, fill=FAIXA, outline=BORDA)
        fim = max(fim, y + sum(alturas))
        for i, ((k, v), a) in enumerate(zip(linhas_, alturas)):
            texto(d, (x + 16, yy + 12), k, fonte(700, 12), SECUNDARIA, 1)
            paragrafo(d, (x + 16 + 100, yy + 11), v, fonte(400, 13), FORTE, caixa_w - 32 - 100, 1.45)
            yy += a
            if i < len(linhas_) - 1:
                d.line([(x + 16, yy), (x + caixa_w - 16, yy)], fill=TRACEJADO)

    # a altura: a da folha, ou o que as peças do palco pediram a mais (a folha ganha o mesmo fundo embaixo)
    alto = max(H, int(fim) + 56)
    pal = pal.crop((0, 0, W, alto))
    if alto > H:
        maior = Image.new('RGB', (W, alto), FUNDO)
        maior.paste(folha, (0, 0))
        folha = maior
    lado_a_lado(folha, pal,
                'REFERÊNCIA · palco/referencias/png/00-componentes.png',
                '1440 × 1760 a 1× · atenção: a tabela MEDIDAS E CORES ainda traz a moldura velha — CELULAR "moldura de 8px, 376 × 816 por fora, raio 34 por fora, 26 por dentro" e ESTADO "moldura #3A3350" —, que o O CELULAR da mesma folha e a decisão 43 trocaram',
                'PROTÓTIPO · as peças do palco rodando, no lugar da folha',
                'cada peça fotografada a 1× no palco (as colunas e as linhas na janela de 1440 × 900; o celular na de 1440 × 369, pra escala dar a miniatura) · os rótulos das partes são os da folha; as legendas e as tabelas dizem de onde veio cada peça e o que se mediu',
                os.path.join(SAIDA, '00-componentes.png'))
else:
    print('sem a folha 00 medida: rode node scripts/provas-palco.mjs fotos')
