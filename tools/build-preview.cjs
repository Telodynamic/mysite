// Stage only public site assets. Never include the production CNAME or Git metadata.
const fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '..'), output = path.join(root, '_preview');
fs.mkdirSync(output, { recursive: true });
const files = ['index.html', '404.html', 'services.html', 'products.html', 'style.css', 'sitemap.xml'];
for (const dir of ['about', 'contact', 'products', 'services', 'image-credits', 'assets']) {
  function walk(base) { for (const e of fs.readdirSync(path.join(root, base), { withFileTypes: true })) { const rel = path.join(base, e.name); if (e.isDirectory()) walk(rel); else files.push(rel); } }
  walk(dir);
}
if (fs.existsSync(path.join(output, 'CNAME'))) throw new Error('Preview directory contains CNAME. Use a fresh preview directory.');
for (const file of files) {
  let content = fs.readFileSync(path.join(root, file));
  if (file.endsWith('.html')) content = content.toString('utf8').replace('</head>', '<meta name="robots" content="noindex, nofollow"></head>');
  fs.mkdirSync(path.dirname(path.join(output, file)), { recursive: true });
  fs.writeFileSync(path.join(output, file), content);
}
fs.writeFileSync(path.join(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
fs.writeFileSync(path.join(output, 'vercel.json'), JSON.stringify({headers:[{source:'/(.*)',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow'},{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'}]}]}, null, 2));
console.log('Safe preview staged in _preview; CNAME excluded and indexing disabled.');
