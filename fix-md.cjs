const fs = require('fs'); const dir = './src/content/blog'; fs.readdirSync(dir).forEach(f => { if(f.endsWith('.md')){ const p = dir + '/' + f; let c = fs.readFileSync(p, 'utf8'); if(c.includes('\n')){ fs.writeFileSync(p, c.replace(/\n/g, '
')); console.log('Fixed ' + f); } } });
