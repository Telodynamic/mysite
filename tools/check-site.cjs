// Dependency-free release checks: run locally and on every GitHub PR/push.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),origin='https://telodynamic.com';
const pages=['index.html','services/index.html','products/index.html','about/index.html','contact/index.html','image-credits/index.html'];
const errors=[],titles=new Set();
function assert(v,m){if(!v)errors.push(m)}
for(const file of pages){const html=fs.readFileSync(path.join(root,file),'utf8'),route=file==='index.html'?'/':'/'+file.replace('index.html',''),url=origin+route;
const title=html.match(/<title>([^<]+)<\/title>/)?.[1];assert(title&&!titles.has(title),file+': missing or duplicate title');titles.add(title);
assert((html.match(/<h1(?:\s|>)/g)||[]).length===1,file+': expected one h1');
assert(/<meta name="description" content="[^\"]+"/.test(html),file+': missing description');
assert(html.includes(`rel="canonical" href="${url}"`),file+': canonical mismatch');
assert(!/<meta name="robots" content="[^\"]*noindex/.test(html),file+': production noindex');
for(const key of ['og:image','og:title','og:description','og:url'])assert(html.includes(`property="${key}"`),file+': missing '+key);
const blocks=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];assert(blocks.length===1,file+': missing/duplicate schema');
for(const b of blocks){try{const json=JSON.parse(b[1]);assert(json['@graph']?.some(x=>x.url===url),file+': missing page schema')}catch{errors.push(file+': invalid JSON-LD')}}
for(const m of html.matchAll(/(?:href|src)="([^\"]+)"/g)){const raw=m[1];if(/^(https?:|mailto:|tel:|data:)/.test(raw))continue;const u=new URL(raw,url);if(u.origin!==origin)continue;const rel=decodeURIComponent(u.pathname).replace(/^\//,'');let target=path.join(root,rel);if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');assert(fs.existsSync(target),file+': missing '+raw);if(u.hash&&fs.existsSync(target)&&target.endsWith('.html')){const body=fs.readFileSync(target,'utf8');assert(body.includes(`id="${decodeURIComponent(u.hash.slice(1))}"`),file+': missing anchor '+raw)}}
}
const contact=fs.readFileSync(path.join(root,'contact/index.html'),'utf8');assert(contact.includes('action="https://formspree.io/f/xzddeqqj"'), 'Form endpoint changed');assert(contact.includes('name="_replyto"'),'Reply email missing');assert(contact.includes('name="_gotcha"'),'Spam trap missing');
assert(fs.readFileSync(path.join(root,'CNAME'),'utf8').trim()==='telodynamic.com','Production domain changed');
const robots=fs.readFileSync(path.join(root,'robots.txt'),'utf8');assert(!/Disallow:\s*\/\s*(?:\n|$)/.test(robots),'Production robots blocks crawling');
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');for(const file of pages.slice(0,5)){const r=file==='index.html'?'/':'/'+file.replace('index.html','');assert(sitemap.includes(`<loc>${origin}${r}</loc>`),'Missing sitemap route '+r)}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`PASS: ${pages.length} pages; metadata, structured data, internal links/anchors, contact endpoint, domain and crawlability.`);
