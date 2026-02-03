# Tanushree — Portfolio

This repository contains a personal portfolio website for Tanushree. Changes made by the assistant include:

- Theme toggle (light/dark) with preference saved in `localStorage`.
- Animated hero using a Lottie animation.
- Project filters (client-side filtering by tags).
- Accessibility improvement: skip-to-content link and basic meta tags for SEO.
- Micro-interactions: button ripple and project card tilt.

How to run locally:

```bash
cd /home/lokesh-yadav/Desktop/Portfolio
python3 -m http.server 8000
# Open http://localhost:8000
```

Deployment:
- You can deploy to GitHub Pages, Netlify, or Vercel. A sample GitHub Actions workflow is included in `.github/workflows/deploy.yml` to publish to `gh-pages` branch.

Notes:
- The contact form currently uses a simulated JS handler. To receive real emails, plug in Formspree/EmailJS or another backend and update the form `action` and/or the JS submission logic.
- Replace the placeholder Lottie URL if you prefer a different animation.

If you want, I can now:
- Wire the contact form to Formspree (I can add the exact `action` if you provide the Formspree form id),
- Replace the Lottie animation with a chosen file, or
- Add CI/CD for Netlify/Vercel instead of gh-pages.
# Tanushree_Portfolio
