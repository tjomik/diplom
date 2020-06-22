from json import load

def loc(nb):
    cells = load(open(nb))['cells']
    return sum(len(c['source']) for c in cells if c['cell_type'] == 'code')

def run(ipynb_files):
    return sum(loc(nb) for nb in ipynb_files)

print(run(['collect_images.ipynb', 'compare_distances.ipynb', 'Parser.ipynb', 'prepare_data_for_recommendation.ipynb', 'refactor_dataset.ipynb', 'recommend.ipynb']))
