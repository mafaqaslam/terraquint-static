# TerraQuint website

The source files for **https://www.terraquint.com**: a static website (plain HTML, CSS and JavaScript, no build step), hosted on **Vercel**. The domain's DNS is on **Cloudflare**.

This README is not published on the website.

---

## How changes go live

1. Files are edited in the master copy on the PC: `D:\muham\Documents\terraquint-static`.
2. The same changes are pushed to the **`preview`** branch on GitHub. Vercel builds a private preview. Open it in Vercel → Deployments → the latest *preview* → **Visit**.
3. When the preview looks right, `preview` is merged into **`main`**. Vercel then publishes terraquint.com automatically, usually within a minute.
4. If something goes wrong, use Vercel → Deployments → an older deployment → **Instant Rollback**.

Every push also runs a small GitHub automation (see [What happens automatically](#what-happens-automatically)).

---

## Folder map

| Path | What it is |
|---|---|
| `index.html`, `services.html`, `methodology.html`, `about.html`, `insights.html`, `videos.html`, `contact.html` | The main pages |
| `404.html` | "Page not found" page |
| `thank-you.html` | Shown after the contact form is sent (hidden from Google) |
| `articles/*.html` | One file per article. `articles/template.html` is the starting point for new ones (not published). |
| `styles.css` | Site-wide styles and colours |
| `components.js` | Menu, footer, back-to-top button, phone action bar, skip link. Shared by every page. |
| `assets/css/article.css`, `assets/js/article.js` | Styles and share buttons shared by all articles |
| `assets/js/service-cards.js` | The 9 expandable service cards shown on Home and Services. Edit once, both pages update. |
| `assets/icons/sprite.svg` | All icons (line icons from Lucide, plus LinkedIn / YouTube / WhatsApp / X logos) |
| `assets/js/hero-globe.js`, `assets/js/three-globe.min.js`, `assets/globe/` | The 3D globe on the home page and its still image |
| `videos-data.js` | The list of videos on the Media page |
| `og/` | Share-card images (pages, articles, regions). Article cards are made automatically. |
| `sitemap.xml` | Rebuilt automatically, so don't edit it by hand |
| `robots.txt`, favicons, `site.webmanifest` | Search engine and browser icon files |
| `vercel.json` | Clean addresses (`/services` not `/services.html`) and the `terraquint.com` → `www` redirect |
| `.vercelignore` | Files kept in the repo but **not** published (template, README, tools) |
| `tools/og/` | The share-card generator used by the GitHub automation |
| `.github/workflows/share-cards.yml` | The GitHub automation itself |

`Text reference files/` exists only on the PC. It's excluded from GitHub by `.gitignore`.

---

## Adding a new article

The template's instructions (at the top of `articles/template.html`) say the same thing in short.

1. **Copy** `articles/template.html` to `articles/your-article-name.html`. Use lowercase with hyphens, e.g. `waterflood-surveillance.html`. The file name becomes the address: `terraquint.com/articles/waterflood-surveillance`.
2. **Fill in** these (search the file for `[` to find them):
   - **Description:** one or two sentences, under 160 characters. Used by Google, share previews **and** as the summary on the Insights page.
   - **Publish date** (`article:published_time`, `YYYY-MM-DD`)
   - **Region** for the share-card globe (`tq:region`): `americas`, `usa`, `north-america`, `gulf-of-mexico`, `middle-east`, `north-sea`, `asia`, `asia-pacific` or `africa`
   - **Category:** `CASE STUDY`, `TECHNICAL BRIEF`, `INDUSTRY INSIGHT` or `WHITEPAPER`. These match the Insights filters.
   - **Title:** the main heading in the article header, ideally under 60 characters
   - **The article text.** The template shows headings, lists, a quote and a table. Keep the `table-wrap` box around every table so it scrolls sideways on phones.
   - **Closing "Get in touch" box** (optional): a question, one sentence and a service to pre-select. Blank parts become *"Have a similar challenge?"* / *"Get in touch for a free initial assessment call."* with the general form. The service names are listed in the template.
3. **Leave everything else in `[brackets]`.** These fill themselves in from the fields above:
   - page title, share title, description and address
   - structured data, the canonical address
   - the date shown under the title
   - the read time (about 130 words a minute)
   
   If you type your own value into any of them, e.g. a shorter browser title, it's kept.
4. **Push.** Within about a minute or two of the push, GitHub automatically:
   - creates the article's own share card
   - fills everything from step 3
   - adds the article to the **Insights** page (newest first)
   - picks the **Related articles** links on every article (same category first, then newest)
   - adds it to `sitemap.xml`

   GitHub saves these as a commit named **"Auto: …"**. **Pull or re-sync the PC folder afterwards** so it matches GitHub again. Until then the page itself already shows the right date, read time and closing box.

**Drafts:** an article whose title is still `[Article Title]` is treated as a draft. It isn't listed on Insights, in related links or in the sitemap.

There's no need to edit `insights.html`, other articles, or `sitemap.xml` by hand.

---

## Adding a video (Media page)

1. Upload the video to YouTube (channel **@afaqaslamm**) and copy its ID. In `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, the ID is `dQw4w9WgXcQ`.
2. In `videos-data.js`, add an entry inside `const videosData = [ ... ];`, newest first:

```js
{
  youtubeId: "dQw4w9WgXcQ",
  title: "Decline Curve Analysis in 10 Minutes",
  description: "A quick walkthrough of Arps, Duong and SEPD for tight wells.",
  category: "PRODUCTION FORECASTING",   // see the category list in the file
  date: "Jan 2027",
  duration: "10:24",
  views: 0
},
```

The Media page shows it automatically. While the list is empty, the page shows "Coming Soon".

---

## Common edits

- **Service cards on Home and Services:** `assets/js/service-cards.js`. Each card has a title, short text, expanded text, software list and an `icon` name.
- **Detailed service sections** (the 20 on the Services page): `services.html`.
- **Menu or footer** (links, phone, email, locations): `components.js`.
- **Colours:** the variables at the top of `styles.css`: `--accent` (brand blue `#006EA8`), `--accent-on-dark` (logo blue `#6EB2FA` for text on black), `--gray-500`, etc. These were chosen to pass readability (contrast) standards.
- **Icons:** use `<svg class="i" aria-hidden="true"><use href="/assets/icons/sprite.svg#NAME"></use></svg>`, where `NAME` is a symbol id in `sprite.svg` (e.g. `layers`, `gauge`, `waves`, `phone`, `mail`, `map-pin`). To add a new icon, copy its drawing from lucide.dev into `sprite.svg` as a new `<symbol>`.
- **Card layout:** icon on the left of the title: `<div class="card-head"><span class="tq-tile">ICON</span><h3>Title</h3></div>`.

---

## Contact form

The form on `/contact` is TerraQuint's own, but every enquiry goes into the **existing Google Form** (its responses / Google Sheet), exactly as before. The service the visitor picked is added at the start of their message, e.g. `[Decline Curve Analysis & RTA] …`.

- Turn on **Responses → ⋮ → Get email notifications for new responses** in Google Forms to get each enquiry by email.
- Buttons can pre-select a service by linking to `/contact?service=SERVICE-NAME#enquiry`.
- After sending, visitors see `/thank-you`. Visits to that page in Cloudflare Analytics count your enquiries.
- Phone, email and WhatsApp: **+1 (918) 625-2549**, `afaqaslam@terraquint.com`, `wa.me/19186252549`.

---

## Search engines, sharing and analytics

- Every page has its title, description, share image and structured data between `<!-- SEO:START -->` and `<!-- SEO:END -->` near the top.
- **Google Search Console** and **Bing Webmaster Tools** are set up. The sitemap is `https://www.terraquint.com/sitemap.xml`.
- **Analytics:** Cloudflare Web Analytics (cookie-free, no cookie banner needed). The small script sits at the bottom of every page, and the article template includes it.

---

## What happens automatically

`.github/workflows/share-cards.yml` runs on every push to `main` or `preview` that changes an article, a page or `tools/og/`. It runs `node tools/og/generate.mjs`, which:

1. creates missing article share cards (`og/articles/<name>.jpg`)
2. points each article's share image at its card
3. fills blank parts of each article's closing box
4. rebuilds each article's Related articles links
5. rebuilds the article list on the Insights page
6. rebuilds `sitemap.xml`

If anything changed, it commits the result as **"Auto: share cards, Insights list and sitemap"**. To re-create every share card (e.g. after changing the card design), run `node tools/og/generate.mjs --force`.

---

## Notes

- With clean addresses, double-clicking an HTML file on the PC opens it, but links between pages won't work there. Use the preview or live site to check pages.
- Credits: icons from Lucide (ISC licence); 3D globe built with Three.js (MIT licence); font Inter (OFL).
