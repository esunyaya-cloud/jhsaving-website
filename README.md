# SAVING Industry Website

A modern, SEO-optimized English website for Jinhua Saving Industry and Trade Co., Ltd. — a leading manufacturer of household storage products since 2017.

## Quick Start

This is a static website. To preview locally:

```bash
# Option 1: Python
cd website
python -m http.server 8080

# Option 2: Node.js
npx http-server -p 8080

# Option 3: PHP
php -S localhost:8080
```

Then open http://localhost:8080 in your browser.

## File Structure

```
website/
├── index.html          # Home page (hero, categories, products, why-us, scenarios, certs, CTA)
├── products.html       # Product catalog (filterable, 13 products with schema markup)
├── about.html          # Company intro, factory tour, advantages, process, certs, partners
├── contact.html        # Contact form, info, OpenStreetMap, FAQ (12 Q&As)
├── css/
│   └── style.css       # Modern responsive stylesheet
├── js/
│   └── main.js         # Interactions: menu, smooth scroll, animations, form, filter
├── images/
│   ├── products/       # 13 product photos
│   ├── factory/        # 17 factory/workshop photos
│   ├── scenarios/      # 5 application scenario photos
│   ├── certificates/   # 5 certification images
│   ├── packaging/      # 8 packaging/shipping photos
│   └── banners/        # 2 hero banner photos
├── robots.txt          # Search engine + AI crawler rules
├── sitemap.xml         # XML sitemap with hreflang
└── .htaccess           # Apache config (HTTPS, caching, compression)
```

## SEO Features

### On-Page SEO
- Unique `<title>` and `<meta description>` on every page
- Keyword-optimized H1-H6 hierarchy
- Semantic HTML5 markup (header, main, article, section, footer)
- Open Graph + Twitter Card meta tags
- Canonical URLs to prevent duplicate content
- Hreflang tags for international SEO
- Geo meta tags (geo.region, geo.placename, geo.position, ICBM) for local SEO
- Image alt text with keywords
- Lazy loading for all images
- Responsive images with width/height attributes

### Structured Data (JSON-LD)
- Organization schema (logo, contact, social)
- WebSite schema with SearchAction
- LocalBusiness schema (NAP, geo coordinates, hours)
- Product schema on each product card
- ItemList schema on products page
- AboutPage schema
- ContactPage schema
- BreadcrumbList on sub-pages
- FAQPage schema (12 Q&As)

### Technical SEO
- Mobile-first responsive design
- Fast page load (minimal CSS/JS, lazy images)
- HTTPS ready (.htaccess)
- Gzip compression
- Browser caching
- Clean URL structure
- XML sitemap
- Robots.txt with explicit AI crawler permissions

### GEO Targeting
- Geo meta tags set to Jinhua, Zhejiang (CN-ZJ)
- OpenStreetMap embed on contact page
- LocalBusiness schema with coordinates
- Working hours specified
- Country-specific content (export markets highlighted)

## Conversion Optimization

- WhatsApp floating button (always visible)
- Multiple CTA placements (hero, banners, after sections)
- Pre-filled inquiry form
- Anti-spam honeypot in form
- Form auto-fills from "Get Quote" buttons
- 24-hour response guarantee messaging
- Trust signals (stats, certifications, brand partners)

## Customization Guide

### Update Company Info
Edit these files to update company details:
- Footer in all HTML files
- JSON-LD blocks in `<head>` of each page
- Hero stats in `index.html`

### Connect Real Form Backend
Edit `js/main.js` → `contactForm` submit handler. Replace the setTimeout simulation with:

```javascript
fetch('https://your-api.com/inquiry', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
})
```

### Add Google Analytics / Search Console
Add to `<head>` of each HTML file before `</head>`:
- Google Analytics 4 gtag.js
- Google Search Console verification meta tag
- Bing Webmaster verification

### Replace OpenStreetMap with Google Maps
In `contact.html`, replace the iframe `src` with a Google Maps embed URL.

### Add More Products
1. Copy an existing `<article class="product-card">` block in `products.html`
2. Update `data-cat` to match a filter button
3. Update image, title, description, MOQ

## Brand

- **Company**: Jinhua Saving Industry and Trade Co., Ltd. (金华市赛福盈工贸有限公司)
- **Brand Name**: SAVING
- **Tagline**: Smart Storage, Neat & Simple
- **Primary Color**: #1a3a52 (Deep Navy)
- **Accent Color**: #c89b5b (Warm Gold)

## Deployment

Upload all files in the `website/` directory to your web host root. Recommended:
- Cloudflare Pages (free, fast, global CDN)
- Netlify (free tier available)
- Vercel (free tier available)
- Traditional cPanel/Apache hosting (uses .htaccess included)

After deployment:
1. Submit sitemap to Google Search Console: https://search.google.com/search-console
2. Submit sitemap to Bing Webmaster Tools: https://www.bing.com/webmasters
3. Verify the site in Google Business Profile (if applicable)
4. Set up Google Analytics 4
5. Monitor indexing and rankings

## Support

For questions or modifications, contact the developer.
