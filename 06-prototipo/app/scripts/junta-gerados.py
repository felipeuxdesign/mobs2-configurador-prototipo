# Junta os documentos gerados das telas que o arquiteto manda inteiros (02-telas/*/tela.md,
# estados.md, textos.md, animacao.md, o README e o indice.json) nos nossos, pela regra que ele
# aprovou nas entregas de 26/09: entra tudo o que é dele, exatamente; as nossas anotações ficam
# no lugar; nos textos.md que só diferem em linha em branco, fica o dele; no índice, ficam os
# nossos campos (rotulo, rotuloOrigem, grupo).
#
# Uso (da raiz): python3 06-prototipo/app/scripts/junta-gerados.py <pasta-do-pacote> [--grava]
#   A pasta é a do pacote na raiz (ex.: otimizacao400000000). Sem --grava, só diz o que faria.
#   Antes, copie as entregas antigas da Lixeira pra 06-prototipo/app/prints/tmp/lixeira/ (o
#   Python não lê a Lixeira do macOS): cp -R ~/.Trash/entregas-do-arquiteto-* 06-prototipo/app/prints/tmp/lixeira/
#
# Como separa o que é do design do que é nosso: o universo D das linhas do design é o C0
# (6466d8f), as cópias antigas do design na lixeira e os blocos de todas as entregas em trechos.
# Linha só nossa que está em D e não está no pacote = design antigo que ele trocou ou tirou: sai.
# Linha só nossa fora de D = anotação nossa: fica, no mesmo lugar. Linha nossa que começa com uma
# linha dele (a dele + a nossa emenda): fica a nossa, que contém a dele. As seções "## No
# protótipo…" são nossas e nada sai delas. A seção das peças do design é a dele, inteira. A linha
# de tabela com a mesma chave que uma linha nova dele: a dele na tabela, e a nossa numa nota logo
# depois da tabela, se dizia mais que três palavras a mais — e vai pra lista "pra ver".
import os, re, sys, json, glob, difflib, subprocess
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
PACOTE = sys.argv[1]; P = f'{R}/{PACOTE}/arquivos'
GRAVA = '--grava' in sys.argv
LIXEIRA = f'{R}/06-prototipo/app/prints/tmp/lixeira'
PECAS = '## Peças do design system que esta tela usa'
RELATORIO = f'{R}/06-prototipo/app/prints/tmp/relatorios/juncao-{PACOTE}.json'

def git_show(ref, f):
    try: return subprocess.run(['git', '-C', R, 'show', f'{ref}:{f}'], capture_output=True, text=True, check=True).stdout
    except Exception: return ''

blocos_de = lambda m: re.findall(r'^```[a-z]*\n(.*?)\n```', open(m, encoding='utf-8').read(), flags=re.S | re.M)
depois = set()
for m in glob.glob(f'{LIXEIRA}/**/MUDANCAS.md', recursive=True) + glob.glob(f'{R}/otimizacao*/MUDANCAS.md'):
    for b in blocos_de(m):
        for l in b.split('\n'): depois.add(l)

# linhas do design que a gente sabe que são dele e não estão em lugar nenhum acima (quando a Lixeira
# não está legível): uma por linha, em prints/tmp/lixeira/design-extra.txt
EXTRA = set()
if os.path.exists(f'{LIXEIRA}/design-extra.txt'): EXTRA = set(open(f'{LIXEIRA}/design-extra.txt', encoding='utf-8').read().split('\n'))

def universo(f):
    D = set(git_show('6466d8f', f).split('\n')) | EXTRA
    for c in glob.glob(f'{LIXEIRA}/**/{f}', recursive=True): D |= set(open(c, encoding='utf-8').read().split('\n'))
    return D | depois

def secao_pecas(ls):
    try: i = ls.index(PECAS)
    except ValueError: return None
    j = next((k for k in range(i + 1, len(ls)) if ls[k].startswith('## ')), len(ls))
    return i, j

palavras = lambda s: re.findall(r'\w+', s)
def junta(f):
    O = open(f'{R}/{f}', encoding='utf-8').read(); T = open(f'{P}/{f}', encoding='utf-8').read()
    if O == T: return None
    if f.endswith('textos.md') and O.split() == T.split(): return {'arquivo': f, 'modo': 'textos: o dele (só linha em branco)'}, T
    o, t = O.split('\n'), T.split('\n'); D = universo(f)
    rel = {'arquivo': f, 'novas_dele': 0, 'emendas_nossas': 0, 'anotacoes': 0, 'sairam_do_design': [], 'pra_ver': []}
    prot = set(); dentro = False
    for k, l in enumerate(o):
        if l.startswith('## '): dentro = l.startswith('## No protótipo')
        if dentro: prot.add(k)
    so_o, tset = set(o), set(t)
    for k, tl in enumerate(t):
        if tl in so_o or len(tl.strip()) <= 12: continue
        cands = [ol for ol in o if ol not in tset and ol.startswith(tl.rstrip()) and len(ol) > len(tl.rstrip())]
        if cands: t[k] = max(cands, key=len); rel['emendas_nossas'] += 1
    out = []; notas_tabela = []
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(a=o, b=t, autojunk=False).get_opcodes():
        ob, tb = o[i1:i2], t[j1:j2]
        if tag == 'equal': out += tb; continue
        rel['novas_dele'] += sum(1 for x in tb if x.strip() and x not in o)
        novas = [x for x in tb if x.strip() and x not in D and x not in o]
        anot = []
        for q, ol in enumerate(ob):
            idx = i1 + q
            if not ol.strip(): anot.append(ol); continue
            if idx in prot: anot.append(ol); continue
            if ol in D or ol.strip() in {x.strip() for x in tb}:
                if ol not in t: rel['sairam_do_design'].append(ol[:200])
                continue
            if ol.startswith('|'):
                chave = ol.split('|')[1].strip()
                par = next((x for x in t if x.startswith('|') and x.split('|')[1].strip() == chave and x not in o), None)
                if par:
                    extra = [w for w in palavras(ol) if w not in palavras(par)]
                    if len(extra) <= 3: rel['sairam_do_design'].append('(a versão de antes) ' + ol[:200]); continue
                    notas_tabela.append((par, ol)); rel['pra_ver'].append({'nossa': ol[:300], 'a_linha_nova_dele': par[:200], 'como_ficou': 'a dele na tabela, a nossa numa nota logo depois da tabela'}); continue
            if ol.lstrip().startswith('- '):
                par = max(novas, key=lambda x: difflib.SequenceMatcher(a=ol, b=x).ratio(), default=None)
                if par and difflib.SequenceMatcher(a=ol, b=par).ratio() >= 0.72:
                    extra = [w for w in palavras(ol) if w not in palavras(par)]
                    if len(extra) <= 3: rel['sairam_do_design'].append('(a versão de antes) ' + ol[:200]); continue
                    anot.append('  - no protótipo (a nossa versão desta linha, antes desta entrega): ' + ol.lstrip()[2:]); rel['pra_ver'].append({'nossa': ol[:300], 'a_linha_nova_dele': par[:200], 'como_ficou': 'a dele, e a nossa como nota embaixo'}); continue
            anot.append(ol); rel['anotacoes'] += 1
            if novas: rel['pra_ver'].append({'nossa': ol[:300], 'perto_das_linhas_novas_dele': [x[:200] for x in novas]})
        out += tb + anot
    so, st = secao_pecas(out), secao_pecas(t)
    if so and st:
        dele = t[st[0]:st[1]]
        for l in out[so[0]:so[1]]:
            if l.strip() and l not in dele: rel['sairam_do_design'].append('(peças) ' + l)
        out = out[:so[0]] + dele + out[so[1]:]
    for par, ol in notas_tabela:
        if par not in out: continue
        k = out.index(par)
        while k + 1 < len(out) and out[k + 1].startswith('|'): k += 1
        out.insert(k + 1, '\n- no protótipo · a nossa versão da linha *' + par.split('|')[1].strip().strip('*`') + '*, antes desta entrega: ' + ol)
    res = re.sub(r'\n{3,}', '\n\n', '\n'.join(out))
    linhas_res = res.split('\n')
    rel['faltam_do_pacote'] = [l for l in T.split('\n') if l.strip() and l not in linhas_res and not any(x.startswith(l.rstrip()) for x in linhas_res)]
    return rel, res

arquivos = sorted(os.path.relpath(p, P) for p in glob.glob(f'{P}/02-telas/**/*.md', recursive=True))
resultados = []
for f in arquivos:
    r = junta(f)
    if r is None: resultados.append({'arquivo': f, 'modo': 'igual'}); continue
    rel, res = r; resultados.append(rel)
    if GRAVA: open(f'{R}/{f}', 'w', encoding='utf-8').write(res)
indice = None
if os.path.exists(f'{P}/02-telas/indice.json'):
    a = json.load(open(f'{P}/02-telas/indice.json', encoding='utf-8')); b = json.load(open(f'{R}/02-telas/indice.json', encoding='utf-8'))
    nb = {x['id']: x for x in b['itens']}; poe = 0; sem = []
    for x in a['itens']:
        y = nb.get(x['id'])
        if y is None: sem.append(x['id']); continue
        for k in ('rotulo', 'rotuloOrigem', 'grupo'):
            if k in y: x[k] = y[k]; poe += 1
    outros = [(x['id'], k) for x in a['itens'] for k in set(nb.get(x['id'], {})) - set(x)]
    indice = {'referencias': a.get('referencias'), 'itens': len(a['itens']), 'campos_nossos_mantidos': poe, 'novas_sem_rotulo': sem, 'outros_campos_nossos_que_sairiam': outros}
    if GRAVA: open(f'{R}/02-telas/indice.json', 'w', encoding='utf-8').write(json.dumps(a, ensure_ascii=False, indent=1) + '\n')
os.makedirs(os.path.dirname(RELATORIO), exist_ok=True)
json.dump({'pacote': PACOTE, 'por_arquivo': resultados, 'indice': indice}, open(RELATORIO, 'w'), ensure_ascii=False, indent=1)
for r in resultados:
    if 'modo' in r: print(f"{r['arquivo']:52s} {r['modo']}"); continue
    print(f"{r['arquivo']:52s} novas dele {r['novas_dele']:2d} · emendas nossas {r['emendas_nossas']:2d} · anotações {r['anotacoes']:2d} · saíram {len(r['sairam_do_design']):2d} · pra ver {len(r['pra_ver']):2d} · faltam do pacote {len(r['faltam_do_pacote'])}")
if indice: print('índice:', indice)
print('relatório:', RELATORIO); print('gravado' if GRAVA else '(simulação — --grava grava)')
