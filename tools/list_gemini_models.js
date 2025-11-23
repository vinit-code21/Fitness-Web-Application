const fs = require('fs');
const path = require('path');
const fetch = globalThis.fetch || require('node-fetch');

function loadEnv(envPath){
  if(!fs.existsSync(envPath)) return {};
  const s = fs.readFileSync(envPath,'utf8');
  const lines = s.split(/\r?\n/).filter(Boolean);
  const out = {};
  for(const l of lines){
    const idx = l.indexOf('=');
    if(idx>0){
      const k = l.slice(0,idx).trim();
      const v = l.slice(idx+1).trim();
      out[k]=v;
    }
  }
  return out;
}

(async()=>{
  try{
    const root = path.resolve(__dirname,'..');
    const envPath = path.join(root,'.env');
    const envLocal = path.join(root,'.env.local');
    const env = Object.assign({}, loadEnv(envPath), loadEnv(envLocal));
    const key = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if(!key){
      console.error('No GEMINI_API_KEY found in .env or process.env');
      process.exit(2);
    }

    console.log('Using GEMINI_API_KEY:', key.slice(0,8) + '...');

    const endpoints = [
      {name:'v1', url:`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(key)}`},
      {name:'v1beta', url:`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`},
      {name:'v1beta2', url:`https://generativelanguage.googleapis.com/v1beta2/models?key=${encodeURIComponent(key)}`},
    ];

    for(const e of endpoints){
      try{
        console.log('\nQuerying', e.name, e.url);
        const r = await fetch(e.url);
        const text = await r.text();
        console.log('HTTP', r.status);
        try{ console.log(JSON.stringify(JSON.parse(text), null, 2)) } catch(_) { console.log(text.slice(0,1000)) }
      }catch(err){
        console.error('Error querying', e.name, err.message||err);
      }
    }
  }catch(err){
    console.error('Fatal error', err);
    process.exit(1);
  }
})();
