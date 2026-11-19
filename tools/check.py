from pathlib import Path
from html.parser import HTMLParser
class Checker(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.local=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag in ('script','link'):
            u=a.get('src',a.get('href',''))
            if u.startswith('./'): self.local.append(u)
p=Path(__file__).resolve().parents[1]/'site'
c=Checker(); c.feed((p/'index.html').read_text())
assert len(c.ids)==len(set(c.ids)), 'Duplicate IDs'
for u in c.local: assert (p/u).is_file(),u
for f in ('index.html','styles.css','app.js'): assert (p/f).stat().st_size>0,f
print('PASS: local assets, unique IDs, required files. Browser behavior NOT tested.')
