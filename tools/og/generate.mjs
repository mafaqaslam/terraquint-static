/**
 * TerraQuint — automatic share cards + sitemap
 *
 * Run from the repo root:   node tools/og/generate.mjs [--force]
 * (runs automatically on GitHub when articles are pushed; see .github/workflows/share-cards.yml)
 *
 * For every article in /articles (except template.html):
 *   1. If og/articles/<slug>.jpg does not exist (or --force), render it from
 *      tools/og/card.html using the article's title, category, read time and
 *      <meta name="tq:region">.
 *   2. Point the article's og:image (and structured-data image) at that card.
 *   3. Fill any blank parts of the closing "Get in touch" box.
 *   4. Rebuild the article's "Related articles" links (same category first, then newest).
 * Then rebuild the Insights page article list (newest first) and sitemap.xml.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SITE = 'https://www.terraquint.com';
const REGIONS = ['americas', 'usa', 'north-america', 'gulf-of-mexico', 'middle-east', 'north-sea', 'asia', 'asia-pacific', 'africa'];
const force = process.argv.includes('--force');

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/<[^>]+>/g, '').trim();

function readArticle(slug) {
  const file = join(ROOT, 'articles', slug + '.html');
  const html = readFileSync(file, 'utf8');
  // values still in [brackets] (template placeholders) are treated as empty
  const pick = (re) => { const m = html.match(re); const v = m ? decode(m[1]) : ''; return /\[.*\]/.test(v) ? '' : v; };
  const title = pick(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const cat = pick(/class="article-category"[^>]*>([\s\S]*?)<\/span>/);
  // read time sits after the clock icon (was an emoji before Phase 6)
  const read = pick(/#clock"><\/use><\/svg>\s*([^<]+)</) || pick(/⏱️\s*([^<]+)</);
  const desc = pick(/<meta name="description" content="([^"]*)"/);
  const date = pick(/<meta property="article:published_time" content="([^"]*)"/);
  let region = pick(/<meta name="tq:region" content="([^"]+)"/) || 'americas';
  if (!REGIONS.includes(region)) { console.warn(`  ! ${slug}: unknown region "${region}", using americas`); region = 'americas'; }
  return { file, html, title, cat, read, region, desc, date };
}

async function renderCards(jobs) {
  if (!jobs.length) return;
  const { chromium } = await import('playwright-core');
  const executablePath = process.env.CHROME_PATH || ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser',
    'C:/Program Files/Google/Chrome/Application/chrome.exe'].find((p) => existsSync(p));
  const browser = await chromium.launch({ executablePath, args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  const cardUrl = pathToFileURL(join(ROOT, 'tools', 'og', 'card.html')).href;
  for (const j of jobs) {
    const qs = new URLSearchParams({ cat: j.cat, title: j.title, read: j.read, region: j.region });
    await page.goto(`${cardUrl}?${qs}`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => { const g = document.getElementById('globe'); return g.complete && g.naturalWidth > 0; }, null, { timeout: 15000 });
    await page.screenshot({ path: j.out, type: 'jpeg', quality: 84 });
    console.log('  card:', j.out.replace(ROOT, ''));
  }
  await browser.close();
}

// ---------- share cards ----------
mkdirSync(join(ROOT, 'og', 'articles'), { recursive: true });
const slugs = readdirSync(join(ROOT, 'articles')).filter((f) => f.endsWith('.html') && f !== 'template.html').map((f) => f.replace(/\.html$/, ''));
const jobs = [];
const articles = slugs.map((slug) => ({ slug, ...readArticle(slug) }));
for (const a of articles) {
  const out = join(ROOT, 'og', 'articles', a.slug + '.jpg');
  if (force || !existsSync(out)) {
    if (!a.title) { console.warn(`  ! ${a.slug}: no title in <h1> yet, card skipped`); continue; }
    jobs.push({ ...a, out });
  }
}
console.log(`Share cards: ${jobs.length} to create`);
await renderCards(jobs);

// Articles that are ready to list (title filled in), newest first
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthYear = (d) => { const m = /^(\d{4})-(\d{2})/.exec(d || ''); return m ? `${MONTHS[+m[2] - 1]} ${m[1]}` : ''; };
const published = articles.filter((a) => a.title)
  .sort((x, y) => (y.date || '').localeCompare(x.date || '') || x.slug.localeCompare(y.slug));

// "Related articles": two others, same category first, then the newest
function fillRelated(html, a) {
  if (!/<!-- RELATED:START[^>]*-->/.test(html)) return html;
  const others = published.filter((o) => o.slug !== a.slug);
  const pick = [...others.filter((o) => o.cat && o.cat === a.cat), ...others.filter((o) => !(o.cat && o.cat === a.cat))].slice(0, 2);
  const links = pick.map((o, i) => i === 0
    ? `        <a href="/articles/${o.slug}">← ${esc(o.title)}</a>`
    : `        <a href="/articles/${o.slug}">${esc(o.title)} →</a>`).join('\n');
  return html.replace(/(<!-- RELATED:START[^>]*-->)[\s\S]*?(<!-- RELATED:END -->)/, `$1\n${links}\n        $2`);
}

// Closing "Get in touch" box: any blank or [bracketed] part gets the standard text
const CTA_DEFAULT = {
  h3: 'Have a similar challenge?',
  p: 'Get in touch for a free initial assessment call.',
  href: '/contact#enquiry',
};
const unfilled = (v) => !v.replace(/<[^>]+>/g, '').trim() || /\[[^\]]*\]/.test(v);
function fillCta(html) {
  return html.replace(/<div class="article-cta">[\s\S]*?<\/div>/, (box) => box
    .replace(/(<h3>)([\s\S]*?)(<\/h3>)/, (m, a, v, b) => unfilled(v) ? a + CTA_DEFAULT.h3 + b : m)
    .replace(/(<p>)([\s\S]*?)(<\/p>)/, (m, a, v, b) => unfilled(v) ? a + CTA_DEFAULT.p + b : m)
    .replace(/href="\/contact\?service=([^"#]*)(#enquiry)?"/, (m, v) => unfilled(v) ? `href="${CTA_DEFAULT.href}"` : m));
}

// point og:image + JSON-LD image at the article's own card (once it exists), fill the CTA box
for (const a of articles) {
  let html = a.html;
  if (existsSync(join(ROOT, 'og', 'articles', a.slug + '.jpg'))) {
    const own = `${SITE}/og/articles/${a.slug}.jpg`;
    html = html
      .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${own}$2`)
      .replace(/("image":\s*")[^"]*(")/, `$1${own}$2`);
  }
  html = fillCta(html);
  html = fillRelated(html, a);
  if (html !== a.html) { writeFileSync(a.file, html); console.log('  updated:', a.slug); }
}

// ---------- Insights page list (newest first) ----------
function insightsCards() {
  const icon = (n) => `<svg class="i" aria-hidden="true"><use href="/assets/icons/sprite.svg#${n}"></use></svg>`;
  return published.map((a) => `
      <a href="/articles/${a.slug}" class="insight-card" data-category="${esc(a.cat)}">
        <div class="card-content">
          <span class="card-category">${esc(a.cat)}</span>
          <h2>${esc(a.title)}</h2>
          <p class="card-excerpt">${esc(a.desc)}</p>
          <div class="card-meta">
            <span>${icon('pen-line')} Afaq Aslam</span>${monthYear(a.date) ? `
            <span>${icon('calendar')} ${monthYear(a.date)}</span>` : ''}
          </div>
          <div class="read-more">Read full article <span>→</span></div>
        </div>
      </a>`).join('\n') + '\n      ';
}
const insPath = join(ROOT, 'insights.html');
if (existsSync(insPath)) {
  const ins = readFileSync(insPath, 'utf8');
  const out = ins.replace(/(<!-- INSIGHTS:START[^>]*-->)[\s\S]*?(<!-- INSIGHTS:END -->)/, (m, a, b) => a + insightsCards() + b);
  if (out !== ins) { writeFileSync(insPath, out); console.log('insights.html updated'); } else console.log('insights.html unchanged');
}

// ---------- sitemap ----------
const lastmod = (rel) => {
  try { const d = execSync(`git log -1 --format=%cs -- "${rel}"`, { cwd: ROOT }).toString().trim(); if (d) return d; } catch {}
  return new Date().toISOString().slice(0, 10);
};
const pages = [['index.html', '/'], ['services.html', '/services'], ['methodology.html', '/methodology'], ['about.html', '/about'],
  ['insights.html', '/insights'], ['videos.html', '/videos'], ['contact.html', '/contact']];
const urls = [...pages.filter(([f]) => existsSync(join(ROOT, f))).map(([f, p]) => [p, lastmod(f)]),
  ...slugs.map((s) => [`/articles/${s}`, lastmod(`articles/${s}.html`)])];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by tools/og/generate.mjs — do not edit by hand -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([p, d]) => `  <url>\n    <loc>${SITE}${p}</loc>\n    <lastmod>${d}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
const smPath = join(ROOT, 'sitemap.xml');
if (!existsSync(smPath) || readFileSync(smPath, 'utf8') !== xml) { writeFileSync(smPath, xml); console.log('sitemap.xml updated'); }
else console.log('sitemap.xml unchanged');
