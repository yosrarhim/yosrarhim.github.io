// Build step: inject the server-rendered page into dist/index.html so the
// published HTML contains the full content (SEO, link previews, no-JS readers),
// exactly like the former static site. The browser then hydrates it.
import { readFile, rm, writeFile } from 'node:fs/promises';

const PLACEHOLDER = '<!--app-html-->';
const indexUrl = new URL('../dist/index.html', import.meta.url);
const ssrDir = new URL('../dist-ssr/', import.meta.url);

const { render } = await import(new URL('entry-server.js', ssrDir).href);
const template = await readFile(indexUrl, 'utf8');

if (!template.includes(PLACEHOLDER)) {
  throw new Error(`prerender: ${PLACEHOLDER} not found in dist/index.html`);
}

const appHtml = render();
await writeFile(indexUrl, template.replace(PLACEHOLDER, () => appHtml));
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: dist/index.html (${(appHtml.length / 1024).toFixed(1)} kB of HTML)`);
