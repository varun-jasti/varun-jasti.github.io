# Viswanadh Jasti — Portfolio

Personal portfolio site for **Viswanadh Jasti** — Front-End Developer & AI/ML Researcher — built with plain HTML, CSS, and JavaScript, and deployed via GitHub Pages.

**Live site:** [varun-jasti.github.io](https://varun-jasti.github.io)

## Overview

A single-page portfolio covering:

- **Hero** — intro, profile photo, animated code-window snippet, quick stats
- **About** — bio and education
- **Experience** — work history timeline
- **Projects** — featured project cards with links to source/docs
- **Skills** — categorized tech stack tags
- **Contact** — email, GitHub, LinkedIn

## Tech Stack

- **HTML5** — semantic, single-page structure
- **CSS3** — custom properties (theming), CSS Grid/Flexbox, mobile-first responsive design
- **Vanilla JavaScript** — no frameworks or build step

No build tools, package manager, or dependencies — open `index.html` and it runs.

## Features

- 🌓 **Light/dark theme toggle**, persisted via `localStorage`
- 📱 **Mobile-first responsive layout** — base styles target phones, with breakpoints at 481px / 601px / 769px / 969px / 1201px progressively enhancing the layout for larger screens
- 🍔 Mobile hamburger navigation with outside-click and link-click dismissal
- 🖱️ Smooth-scroll navigation with scroll-spy active-link highlighting
- 🎬 Scroll-triggered fade-in animations via `IntersectionObserver`
- 📊 Animated stat counters and a scroll-progress bar
- ⌨️ Typewriter-style animation for the hero code window
- 📋 Click-to-copy tooltip on the email link

## Project Structure

```
.
├── index.html         # Page structure and content
├── style.css           # Theming, layout, and mobile-first responsive rules
├── script.js            # Theme toggle, nav, animations, interactions
├── profile-photo.jpg    # Hero section profile photo
├── .github/workflows/pages.yml  # GitHub Actions deployment workflow
└── README.md
```

## Running Locally

No build step required. Either:

- Open `index.html` directly in a browser, or
- Serve it locally for a closer-to-production experience:

  ```bash
  # Python
  python -m http.server 8080

  # Node
  npx serve .
  ```

  Then visit `http://localhost:8080`.

## Customization

- **Content**: edit the relevant `<section>` in `index.html` (About, Experience, Projects, Skills, Contact).
- **Theme colors**: adjust the CSS custom properties in `:root` and `[data-theme="dark"]` at the top of `style.css`.
- **Profile photo**: replace `profile-photo.jpg` with a same-named file, or update the `src` in the `.profile-photo-container` block in `index.html`.

## Deployment

Hosted on **GitHub Pages**, currently configured to deploy from the `main` branch on every push (Settings → Pages → Source: *Deploy from a branch* → `main` / `/(root)`).

The repo also includes a GitHub Actions workflow at `.github/workflows/pages.yml` that builds and deploys via `actions/deploy-pages`, with an automatic retry if the first deploy attempt times out. To use it instead of branch-based deployment, switch **Settings → Pages → Source** to **GitHub Actions**.

## Contact

- Email: [varunjasti3@gmail.com](mailto:varunjasti3@gmail.com)
- GitHub: [github.com/varun-jasti](https://github.com/varun-jasti)
- LinkedIn: [linkedin.com/in/varun-kumar-jasti](https://www.linkedin.com/in/varun-kumar-jasti)
