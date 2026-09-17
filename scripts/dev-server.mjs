/* The local dev server.
   ─────────────────────────────────────────────────────────────────────
   Serves the pages and the /api/plan endpoint from one port, so the
   prototype behaves locally exactly as it will deployed.

     node --env-file=.env.local scripts/dev-server.mjs

   Why this exists rather than `vercel dev`: that command runs the
   function in an environment that did not pick up .env.local here, so
   the endpoint answered {configured:false} and every page quietly fell
   back to its offline engine. The alternative was uploading the key to
   Vercel just to develop locally, which is a worse trade for a
   prototype. This also replaces the old python static server, which
   cannot read its own working directory under this sandbox.

   It is a development tool. No caching, no compression, no security. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import handler from '../api/plan.mjs';

const ROOT = process.cwd();
const PORT = Number(process.env.PORT || 8797);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
};

/* The serverless handler expects Vercel's req.body already parsed and a
   res with chainable status().json(). Node gives neither, so adapt. */
function adapt(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (body) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(body));
    return res;
  };
  return res;
}

async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return {}; }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/api/plan') {
    req.body = await readBody(req);
    try {
      await handler(req, adapt(res));
    } catch (e) {
      adapt(res).status(500).json({ error: 'the handler threw', detail: String(e.message) });
    }
    return;
  }

  /* Never serve outside the repo, however the path is spelled. */
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(ROOT, rel);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('no'); }

  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
  }
});

/* A taken port is the commonest way to start this twice, and the raw
   EADDRINUSE stack says nothing useful about what to do next. */
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error('Port ' + PORT + ' is already in use, so something is already serving this.');
    console.error('Either open http://localhost:' + PORT + ' and use that one, or free the port:');
    console.error('  lsof -ti:' + PORT + ' | xargs kill');
    console.error('Or run this one somewhere else:  PORT=8798 npm run dev:local');
    process.exit(1);
  }
  throw e;
});

server.listen(PORT, () => {
  const keyed = !!process.env.ANTHROPIC_API_KEY;
  console.log('serving ' + ROOT + ' on http://localhost:' + PORT);
  console.log(keyed
    ? 'ANTHROPIC_API_KEY found, Collab AI is live'
    : 'no ANTHROPIC_API_KEY, the pages will fall back to their offline engine.\n' +
      'start with: node --env-file=.env.local scripts/dev-server.mjs');
});
