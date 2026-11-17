# Faithfully

Landing page for Faithfully, an AI consulting idea for small faith-based nonprofits: churches, Christian schools, rescue missions.

**Live:** https://faithfullyai.netlify.app/

## Why it exists

Small ministries spend staff hours rewriting the same announcements, newsletters and donor thank-yous for different audiences. The offer on this page is a communications workflow audit plus a starter kit of prompts and templates matched to the organization's voice.

## How it works

- Static site: one HTML page, two stylesheets, one script. No build step.
- GSAP ScrollTrigger choreography per section: hero parallax, staggered cards, an SVG checkmark that draws on scroll, a line that fills through the "how it works" steps, and count-up stats.
- Respects `prefers-reduced-motion`: particles and scroll animations are skipped and content shows immediately.
- The contact form posts with `fetch` and swaps in a success message without a page reload.

## Stack

HTML, CSS, vanilla JS, GSAP 3.12 with ScrollTrigger, Lucide icons, Google Fonts (Inter, Cormorant Garamond). Hosted on Netlify, which deploys from `main`.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Status

Paused. The form's Formspree endpoint is still a placeholder (`YOUR_FORM_ID`), so submissions don't go anywhere.

## Credits

Display font: Findel Display by Horizon Type (commercial font).
Built with Claude Code.
