# How to publish a new post

Plain instructions for adding a new article — no agent or extra tooling required, just editing files and running `git push`.

## 1. Create the post file

Copy the template and rename it:

```bash
cp _drafts/example-post-template.md _posts/2026-03-01-my-post-slug.md
```

- The filename **must** start with the date `YYYY-MM-DD-` followed by a URL slug (lowercase, hyphenated), and end in `.md`. The date in the filename does not have to match the `date:` front matter exactly, but keep them consistent.
- Files in `_posts/` are published; files in `_drafts/` are not (they're skipped unless you explicitly run `jekyll build --drafts`).

## 2. Fill in the front matter

At minimum:

```yaml
---
title: "Your Post Title"
date: 2026-03-01 09:00:00 -0500   # publish date/time, with UTC offset
categories: [Category, Subcategory]  # up to 2, title case
tags: [tag-one, tag-two]             # any number, lowercase-hyphenated
math: true       # only if the post uses $...$ or $$...$$ math (MathJax)
image:
  path: /assets/images/my-post-slug/cover.png
  alt: "Short description of the cover image"
---
```

Omit `math:` entirely if the post has no formulas — it's not needed otherwise. Omit the whole `image:` block if there's no cover image.

Other optional front-matter flags (see `_drafts/example-post-template.md` for a live example of most of these): `pin: true` (pins the post to the top of the home page), `toc: false` (hides the right-hand table of contents for this post), `comments: false`, `mermaid: true` (enables Mermaid diagram blocks).

## 3. Add images

Put every image for this post under `assets/images/<post-slug>/` (same slug as the filename, date stripped) — see `assets/images/README.md`. Reference them in the body as:

```markdown
![Alt text](/assets/images/my-post-slug/chart.png)
```

## 4. Write the body

Standard Markdown. Fenced code blocks (` ```python `, ` ```bash `, etc.) get syntax highlighting automatically. Math needs `math: true` in front matter (see step 2) — then `$inline$` and:

```markdown
$$
\text{block equation}
$$
```

both render via MathJax.

## 5. Preview locally

```bash
bundle exec jekyll serve --livereload
```

Then open `http://127.0.0.1:4000` in a browser. `--livereload` auto-refreshes the page as you edit and save the post file. Draft posts (in `_drafts/`) are not shown unless you add `--drafts` to the command.

If this is a fresh clone or `bundle install` hasn't been run yet:

```bash
bundle install
```

## 6. Publish

Commit and push to `main` — the GitHub Actions workflow (`.github/workflows/pages.yml`) builds and deploys automatically on every push to `main`:

```bash
git add _posts/2026-03-01-my-post-slug.md assets/images/my-post-slug/
git commit -m "Add post: my post slug"
git push origin main
```

Check the deploy status under the repo's **Actions** tab on GitHub, or with `gh run list`. The live site updates a minute or two after the workflow finishes, at `https://nilanjanmanna01.github.io`.

## Editing an existing post

Just edit the file in `_posts/`, commit, and push — same deploy flow as above.
