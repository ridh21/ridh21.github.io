"""Import the explicitly requested reference's public design assets and page markup."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote,quote,urljoin
import urllib.request,concurrent.futures,re,json
base=Path('/tmp/shed-reference');public=Path('public');assets=set()
# The CV links to a second case study.
for route in ['makeugc']:
 data=urllib.request.urlopen('https://shedsgns.me/'+route).read();(base/(route+'.html')).write_bytes(data)
class Scan(HTMLParser):
 def handle_starttag(self,t,a):
  d=dict(a)
  for key in ['src','poster','data-source-image']:
   if d.get(key,'').startswith('/'):assets.add(d[key].split('?')[0])
  if t=='link' and (d.get('rel') in ['stylesheet','preload','icon']):
   u=d.get('href','')
   if u.startswith('/') and not u.endswith('.js'):assets.add(u.split('?')[0])
  if t=='a' and '.pdf' in d.get('href',''):assets.add(d['href'])
for p in base.glob('*.html'):Scan().feed(p.read_text())
for p in list(base.glob('*.js'))+list(base.glob('*.css')):
 s=p.read_text()
 for u in re.findall(r'["\x27`](/[^"\x27`<>]+?\.(?:png|webp|svg|jpg|jpeg|mp4|webm|woff2|pdf|mp3|ogg|wav))(?:\?[^"\x27`]*)?["\x27`]',s):assets.add(u)
 for u in re.findall(r'url\(["\x27]?([^\)"\x27]+)',s):
  if u.startswith('/'):assets.add(u)
assets.update(['/sign.svg','/assets/arrow.svg','/Telegram Icon.svg','/GitHub Icon.svg','/X Icon.svg'])
def get(u):
 try:
  path=unquote(urlsplit(u).path);dest=public/path.lstrip('/');dest.parent.mkdir(parents=True,exist_ok=True)
  if not dest.exists():dest.write_bytes(urllib.request.urlopen('https://shedsgns.me'+quote(path,safe='/'),timeout=40).read())
  return None
 except Exception as e:return (u,str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
 results=list(pool.map(get,assets))
print('Assets:',len(assets),'Failures:',[x for x in results if x])
(base/'asset-manifest.json').write_text(json.dumps(sorted(assets),indent=2))
