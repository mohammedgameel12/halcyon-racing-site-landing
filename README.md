# Halcyon Racing — Website Setup Guide

A fast, three-page static website (Home, About, Contact). No database, no plugins, no build step. Edit the files in any text editor and upload.

```
index.html      Landing page
about.html      Story, mission, upcoming horses
contact.html    Enquiry form
styles.css      All styling (brand colours at the very top)
script.js       Mobile menu, scroll fade-in, form handling
robots.txt / sitemap.xml   SEO files
images/         Logo, favicon and photos
```

---

## 1. Make it yours (10 minutes)

**Brand name:** use find-and-replace across all files: `Halcyon Racing` → your syndicate name.

**Logo:** replace `images/logo.svg` with your logo (SVG preferred, PNG works; if PNG, change `logo.svg` to `logo.png` in the HTML). The footer automatically shows a white version.

**Brand colours:** open `styles.css`, edit the block at the top (`--accent`, `--ink`, etc.). Everything updates site-wide.
- `--accent` = your main brand colour (buttons, highlights)
- `--ink` = dark colour used for text and dark sections
- `--on-accent` = text colour on buttons (use white or dark, whichever is readable)

**Photos:** replace the placeholder files and keep the same names, or edit the `src` in the HTML.

| File | Where | Recommended size |
|---|---|---|
| `images/hero.jpg` | Home page top banner | 2400×1350, landscape, horse(s) in action |
| `images/story.jpg` | Home + About | 800×1000, portrait |
| `images/horse-1/2/3.jpg` | About, horse cards | 600×750, portrait |
| `images/og-image.jpg` | Link previews (WhatsApp, social) | 1200×630 |

Placeholders are `.svg`; after adding a `.jpg`, change the extension in the HTML (e.g. `images/hero.svg` → `images/hero.jpg`). **Always update the `alt=""` text** to describe the photo. This helps SEO and accessibility.

**Text:** open any `.html` file and edit the words between the tags. Anything in `[square brackets]` is a placeholder to replace. To add another horse, copy one `<article class="horse">…</article>` block.

**Legal footer:** add your registration, regulatory and privacy policy details where marked. Racing syndicates are regulated or have disclosure requirements in many countries, so confirm yours.

---

## 2. Replace the domain placeholders

Search all files for `yourdomain.com` and replace with your real domain (canonical tags, social tags, sitemap, robots, email address).

---

## 3. Route enquiries to your inbox (5 minutes)

The form uses **Formspree** (free tier is plenty for a new syndicate):

1. Sign up at formspree.io, then **New Form**, and enter the inbox where you want enquiries delivered.
2. Copy your form ID (the code at the end of the form URL, e.g. `xyzabcde`).
3. In `contact.html`, replace `YOUR_FORM_ID` in the form `action`.
4. Confirm your email with Formspree, submit a test enquiry, and check it arrives.

Spam protection (hidden honeypot) is built in. Alternatives that work with no code changes beyond `action`: Basin, Getform. If hosting on Netlify, you can use Netlify Forms instead.

---

## 4. Go live (free, fast hosting)

**Easiest: Netlify** — log in, go to *Sites → Add new site → Deploy manually*, and drag the whole folder in. It's live in seconds, with free HTTPS. Add your custom domain under *Domain settings*.
Other good options: Cloudflare Pages, GitHub Pages, or any ordinary web host (upload the files via FTP/cPanel to `public_html`).

---

## 5. Search & speed checklist

- [ ] Compress photos before uploading (squoosh.app, aim for under 300 KB each; WebP/AVIF are even smaller).
- [ ] Unique `<title>` and `<meta name="description">` per page are already set — tweak wording to match your name and location.
- [ ] Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.
- [ ] Create a Google Business Profile if you have a physical base.
- [ ] Add analytics if wanted (Plausible/Fathom are privacy-friendly; Google Analytics needs a cookie notice in many regions).
- [ ] Test at pagespeed.web.dev. The site is built to score 95+ on mobile out of the box.

Built-in: semantic HTML, one H1 per page, lazy-loaded images with set dimensions, structured data (Organization), canonical and Open Graph tags, accessible navigation, and reduced-motion support.

---

## Palette preview tool (temporary)

A floating palette button (bottom-right) opens a drawer with 6 colour palettes so you can compare them live on every page. Your pick is remembered in the browser.

**Applying the winner permanently:** open `palettes.css`, copy the values of the winning palette into the `:root` block at the top of `styles.css`.

**Removing the palette switcher before launch:** in each of the 3 HTML files delete the three lines marked `PALETTE-PREVIEW` (the `palettes.css` link, the small inline script, and the `palette-switcher.js` script), then delete `palettes.css` and `palette-switcher.js`.

Note: the placeholder logo is an image, so it keeps its own colours when you switch palettes. Your real logo will behave the same way.
# halcyon-racing-site-landing
