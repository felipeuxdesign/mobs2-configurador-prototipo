# Monta o GIF do README (C14) a partir de uma gravação do caminho.mjs (GRAVA=<pasta>).
# Os quadros do screencast chegam só quando a página muda, cada um com a hora dele: aqui
# eles viram um filme de ritmo fixo (cada instante mostra o último quadro que chegou),
# recortado no celular com a moldura, acelerado e com uma paleta só pro filme inteiro.
#
# Uso (da pasta app): python3 scripts/gif.py <pasta-da-gravação> <saída.gif> [--fps 12] [--vel 1.5] [--larg 330] [--desde 1.6]
import json, sys, os
from PIL import Image, ImageStat

args = sys.argv[1:]
def opcao(nome, padrao):
    if nome in args: i = args.index(nome); v = args[i + 1]; del args[i:i + 2]; return type(padrao)(v)
    return padrao
FPS = opcao('--fps', 12); VEL = opcao('--vel', 1.5); LARG = opcao('--larg', 330); FOLGA = opcao('--folga', 24); DESDE = opcao('--desde', 0.0)
pasta, saida = args[0], args[1]
ind = json.load(open(os.path.join(pasta, 'indice.json')))
q = ind['quadros']; c = ind['celular']
# o recorte: o celular com a moldura, e uma folga em volta, no fundo do palco
caixa = (max(0, int(c['left']) - FOLGA), max(0, int(c['top']) - FOLGA),
         int(c['right']) + FOLGA, int(c['bottom']) + FOLGA)
# o filme começa no primeiro quadro com o app desenhado: antes dele, o palco ainda sem o
# celular (a capa do GIF no GitHub é o primeiro quadro, e ele tem de ser o login)
def desenhado(n):
    im = Image.open(os.path.join(pasta, f'q{n:05d}.jpg')).convert('L').crop(caixa)
    return ImageStat.Stat(im).stddev[0] > 15
while len(q) > 1 and not desenhado(q[0]['n']): q = q[1:]
# e, com --desde, alguns segundos depois: a fonte e a marca ainda carregando não entram
q = [x for x in q if x['t'] >= q[0]['t'] + DESDE] or q
t0, t1 = q[0]['t'], q[-1]['t']
passo = VEL / FPS            # segundos de gravação por quadro do GIF
quadros, k, t = [], 0, t0
while t <= t1:
    while k + 1 < len(q) and q[k + 1]['t'] <= t: k += 1
    quadros.append(q[k]['n']); t += passo
# quadros repetidos viram um quadro só, mais longo
filme = []
for n in quadros:
    if filme and filme[-1][0] == n: filme[-1][1] += 1
    else: filme.append([n, 1])
def abre(n):
    im = Image.open(os.path.join(pasta, f'q{n:05d}.jpg')).convert('RGB').crop(caixa)
    alt = round(im.height * LARG / im.width)
    return im.resize((LARG, alt), Image.LANCZOS)
imgs = [abre(n) for n, _ in filme]
# uma paleta só, tirada de uma amostra do filme inteiro: as cores do app não tremem de um quadro pro outro
amostra = Image.new('RGB', (LARG, imgs[0].height * min(len(imgs), 12)))
for i, im in enumerate(imgs[:: max(1, len(imgs) // 12)][:12]): amostra.paste(im, (0, i * imgs[0].height))
paleta = amostra.quantize(colors=128, method=Image.MEDIANCUT)
pals = [im.quantize(palette=paleta, dither=Image.NONE) for im in imgs]
dur = [round(1000 * v / FPS) for _, v in filme]
dur[-1] += 1500   # o último quadro fica um pouco antes de o GIF recomeçar
pals[0].save(saida, save_all=True, append_images=pals[1:], duration=dur, loop=0, optimize=True, disposal=1)
tam = os.path.getsize(saida) / 1e6
print(f'{saida}: {len(pals)} quadros, {sum(dur) / 1000:.1f} s, {pals[0].width}×{pals[0].height}, {tam:.1f} MB')
