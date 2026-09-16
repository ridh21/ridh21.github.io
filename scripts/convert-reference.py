from pathlib import Path
from html.parser import HTMLParser
import re,json,html
base=Path('/tmp/shed-reference');dest=Path('src/components/pages');dest.mkdir(parents=True,exist_ok=True)
void={'img','input','br','hr','meta','link','source','wbr','area','embed','col'}
class Node:
 def __init__(self,t='root',a=[]):self.t=t;self.a=dict(a);self.children=[]
class Parser(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=True);self.root=Node();self.stack=[self.root]
 def handle_starttag(self,t,a):
  n=Node(t,a);self.stack[-1].children.append(n)
  if t not in void:self.stack.append(n)
 def handle_startendtag(self,t,a):self.handle_starttag(t,a);self.handle_endtag(t) if t not in void else None
 def handle_endtag(self,t):
  if t in void:return
  for i in range(len(self.stack)-1,0,-1):
   if self.stack[i].t==t:self.stack=self.stack[:i];break
 def handle_data(self,s):self.stack[-1].children.append(s)
attrs={'class':'className','for':'htmlFor','tabindex':'tabIndex','viewbox':'viewBox','pathlength':'pathLength','playsinline':'playsInline','autoplay':'autoPlay','crossorigin':'crossOrigin','srcset':'srcSet','contenteditable':'contentEditable','spellcheck':'spellCheck','fetchpriority':'fetchPriority','colspan':'colSpan','rowspan':'rowSpan'}
bools={'hidden','disabled','muted','loop','autoplay','playsinline','checked','multiple','required','readonly','controls'}
def camel(s):return re.sub(r'-([a-z])',lambda m:m[1].upper(),s)
def cleanurl(s):return s.replace('https://shedsgns.me/','/').replace('https://shedsgns.me','/').split('?dpl=')[0]
def render(n,depth=0):
 if isinstance(n,str):return '{'+json.dumps(n,ensure_ascii=False)+'}' if n else ''
 if n.t in ['script','link'] or (n.t=='div' and 'hidden' in n.a):return ''
 if n.t=='root':return '\n'.join(render(c,depth) for c in n.children)
 a=[]
 for k,v in n.a.items():
  if k.startswith('on') or k=='data-nimg':continue
  name=attrs.get(k,camel(k) if not k.startswith(('data-','aria-','--')) else k)
  if k=='style':
   obj={}
   for prop in v.split(';'):
    if ':' not in prop:continue
    key,val=prop.split(':',1);obj[key if key.startswith('--') else camel(key)]=val
   a.append('style={'+json.dumps(obj,ensure_ascii=False)+' as CSSProperties}');continue
  if k in bools:a.append(({'readonly':'readOnly','checked':'defaultChecked'}.get(k,name))+'={true}');continue
  if k=='value' and n.t=='input':name='defaultValue'
  if k in ['src','href','poster','data-source-image']:v=cleanurl(v)
  if k=='draggable':a.append('draggable={false}');continue
  if v is not None:a.append(name+'={'+json.dumps(v,ensure_ascii=False)+'}')
 prefix='<'+n.t+(' '+' '.join(a) if a else '')
 if n.t in void:return prefix+' />'
 return prefix+'>'+''.join(render(c,depth+1) for c in n.children)+'</'+n.t+'>\n'
for route in ['home','alloca','makeugc','cv','infinity','27','radius','taste','overconsumption']:
 s=(base/(route+'.html')).read_text().split('<body')[1].split('>',1)[1].split('<script')[0]
 p=Parser();p.feed(s);name='Page'+route.title()
 (dest/(name+'.tsx')).write_text('/* Reference markup transcribed to editable React components. */\nimport type { CSSProperties } from "react";\nexport default function '+name+'() { return <>\n'+render(p.root)+'</>; }\n')
# Preserve exact reference styles without retaining framework runtime or analytics.
css=Path('src/styles');css.mkdir(exist_ok=True)
for p in base.glob('*.css'):
 if p.name.startswith(('styles-','index-')):continue
 s=p.read_text();s=re.sub(r'/\*# sourceMappingURL=.*?\*/','',s)
 (css/p.name).write_text(s)
imports=['@import "tailwindcss";','@import "../styles/0s7i10jin_pkl.css";']
imports += ['@import "../styles/'+p.name+'";' for p in css.glob('*.css') if p.name!='0s7i10jin_pkl.css']
Path('src/app/globals.css').write_text('\n'.join(imports)+'\n')
