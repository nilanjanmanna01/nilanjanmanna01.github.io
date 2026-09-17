# nilanjanmanna01.github.io

Personal blog — software/hardware projects, starting with wearable HRV/PPG
data engineering, broadening from there. Built with [Jekyll][jekyll] and a
hand-written custom theme (see `_layouts/`, `_includes/`, `assets/css/`,
`assets/js/`), deployed via GitHub Actions to GitHub Pages.

## Adding a new post

See [`POSTING.md`](POSTING.md) — a new article only requires adding a
Markdown file and pushing to `main`; no build tooling changes are needed.

## Local development

```bash
bundle install
bundle exec jekyll serve --livereload
```

Then open `http://127.0.0.1:4000`.

## Deployment

Every push to `main` triggers `.github/workflows/pages.yml`, which builds
the site with Jekyll and deploys it to GitHub Pages automatically.

## License

The site content (posts, images, and this README) is © Nilanjan Manna, all
rights reserved unless a post states otherwise. The theme code (layouts,
includes, Sass, and JS) is original to this repository.

[jekyll]: https://jekyllrb.com/
