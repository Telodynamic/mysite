// Refresh technical metadata from the existing page copy; do not rewrite client content.
const fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '..'), base = 'https://telodynamic.com';
const pages = [['index.html',''],['services/index.html','services/'],['products/index.html','products/'],['about/index.html','about/'],['contact/index.html','contact/'],['image-credits/index.html','image-credits/']];
const clean = s => s.replace(/&amp;/g,'&').replace(/&quot;/g,'"');
const attr = s => s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
for (const [file,route] of pages) {
  const full = path.join(root,file); let html = fs.readFileSync(full,'utf8');
  const title = clean(html.match(/<title>([^<]+)<\/title>/)[1]);
  const description = clean(html.match(/<meta name="description" content="([^\"]+)"/)[1]);
  const url = `${base}/${route}`, label = route ? title.split(' | ')[0] : 'Home';
  const graph = [{ '@type': route==='contact/'?'ContactPage':route==='about/'?'AboutPage':'WebPage', '@id':url+'#webpage',url,name:title,description,inLanguage:'en',isPartOf:{'@id':base+'/#website'},about:{'@id':base+'/#organization'}}];
  if (!route) graph.push({'@type':'Organization','@id':base+'/#organization',name:'Telodynamic Solutions',url:base+'/',email:'contact@telodynamic.com',telephone:'+1-587-778-4978',logo:{'@type':'ImageObject',url:base+'/assets/img/brand-mark.png',width:256,height:256}}, {'@type':'WebSite','@id':base+'/#website',url:base+'/',name:'Telodynamic Solutions',publisher:{'@id':base+'/#organization'},inLanguage:'en'});
  else graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:base+'/'},{'@type':'ListItem',position:2,name:label,item:url}]});
  html=html.replace(/<!-- Technical SEO -->[\s\S]*?<!-- \/Technical SEO -->\s*/g,'').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'').replace(/<meta (?:property="og:[^\"]+"|name="twitter:[^\"]+")[^>]*>/g,'');
  const image = `${base}/assets/img/social-card.png`;
  const meta = `<!-- Technical SEO -->\n<meta property="og:site_name" content="Telodynamic Solutions"><meta property="og:locale" content="en_CA"><meta property="og:type" content="website"><meta property="og:title" content="${attr(title)}"><meta property="og:description" content="${attr(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${image}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Telodynamic Solutions — remote handling, hot cells and shielding">\n<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${attr(title)}"><meta name="twitter:description" content="${attr(description)}"><meta name="twitter:image" content="${image}"><meta name="twitter:image:alt" content="Telodynamic Solutions — remote handling, hot cells and shielding">\n<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')}</script>\n<!-- /Technical SEO -->\n`;
  html=html.replace('</head>',meta+'</head>');fs.writeFileSync(full,html);
}
console.log('Updated social metadata and structured data from existing page copy.');
