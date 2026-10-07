// eslint-disable-next-line id-length
import db from '../db/Database.js';

// http://localhost:8080/bilhete/novo
// endpoint

export async function createBilhete(req, res) {
  const body = await readBody(req);

  const { data } = JSON.parse(body);

  const stmt = db.prepare('INSERT INTO bilhete (texto, acessos, tempo) VALUES (?,?,?)');

  const ret = stmt.run(data);

  console.log(ret);

  res.writeHead(201, {
    'Content-Type': 'application/json',
  });
  res.end();
}


export async function getBilheteById(req, res) {
  const url = new URL(req.url, `http://localhost:8080`);
    const id = url.searchParams.get('id')
  // statement = declaração / comando
  const stmt = db.prepare('SELECT * FROM bilhete WHERE id = ?'); //id n é pego

  const row = stmt.get(id);

  const texto = row['texto'];

  const acessosRestantes = row['acessos'] - 1;

  db.prepare('UPDATE bilhete SET acessos=acessos-1 WHERE id=?').run(id);

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify({texto, acessosRestantes}));

  
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => body += chunk);
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}
