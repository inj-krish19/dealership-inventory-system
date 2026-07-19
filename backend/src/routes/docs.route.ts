import { Router, Request, Response } from 'express';
import { apiDocs } from '../docs/apiDocs.js';

const router = Router();

function renderHtml(): string {
  const rows = apiDocs
    .map(
      (d) => `
      <tr>
        <td><span class="method ${d.method.toLowerCase()}">${d.method}</span></td>
        <td><code>${d.path}</code></td>
        <td>${d.description}</td>
        <td>${d.auth}</td>
        <td>${d.body ? `<code>${d.body}</code>` : '—'}</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
<title>AutoLot API Docs</title>
<style>
  body { font-family: -apple-system, sans-serif; background: #0f0f12; color: #f2f2f4; margin: 0; padding: 40px; }
  h1 { font-weight: 600; }
  p { color: #a1a1aa; }
  table { width: 100%; border-collapse: collapse; margin-top: 24px; }
  th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #27272a; font-size: 14px; }
  th { color: #a1a1aa; font-weight: 500; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
  code { background: #1a1a1f; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
  .method { padding: 3px 8px; border-radius: 4px; font-weight: 600; font-size: 12px; }
  .get { background: #1e3a2f; color: #4ade80; }
  .post { background: #1e2f3a; color: #60a5fa; }
  .put { background: #3a331e; color: #fbbf24; }
  .delete { background: #3a1e1e; color: #f87171; }
</style>
</head>
<body>
  <h1>AutoLot API Reference</h1>
  <p>Car Dealership Inventory System — REST API endpoints. JSON version available at <code>/docs.json</code>.</p>
  <table>
    <thead><tr><th>Method</th><th>Path</th><th>Description</th><th>Auth</th><th>Body</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;
}

router.get('/', (req: Request, res: Response) => {
  res.status(200).send(renderHtml());
});

router.get('/json', (req: Request, res: Response) => {
  res.status(200).json({ name: 'AutoLot API', endpoints: apiDocs });
});

export default router;