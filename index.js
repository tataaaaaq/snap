import { startServer, registerHandler, registerFilter } from './web/server.js';

import health from './handlers/health.js';
import log from './filters/log.js';
import auth from './filters/auth.js';
import cors from './filters/cors.js';
import { createBilhete, getBilheteById } from './handlers/bilhete.js';
import { teste } from './handlers/teste.js';

registerFilter(cors);
registerFilter(log);
registerFilter(auth, 'authentication');

registerHandler({
  method: 'POST',
  path: '/bilhete/create',
  accept: ['application/json'],
}, createBilhete);

registerHandler({
  method: 'GET',
  path: '/health',
  accept: ['text/plain', 'application/json', 'application/xml', 'text/html'],
}, health);

registerHandler({
  method: 'GET',
  path: '/teste',
  accept: ['text/plain'],
}, teste);

registerHandler({
  method: 'GET',
  path: '/bilhete/busca', //esse :id pode estar errado
  accept: ['application/json'],
}, getBilheteById);

const port = 8080;

startServer(port).then(() => { // resolve
  console.log(`Server running at http://localhost:${port}`);
}).catch((error) => { // reject
  console.error('Server cannot start: ', error);
});
