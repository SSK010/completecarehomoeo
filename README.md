# Complete Care Homoeo website

The existing site pages remain static HTML. Blog posts are authored as Markdown and Eleventy generates complete HTML pages with a shared Nunjucks blog layout.

## Add a blog post

1. Create a Markdown file in `src/blog/`, such as `new-topic.md`.
2. Add front matter for the post metadata and the single layout line:

   ```yaml
   ---
   layout: layouts/blog.njk
   title: "Your post title"
   description: "A short summary for search and sharing."
   date: "2026-11-13"
   image: assets/images/your-image.webp
   imageAlt: "A short image description"
   permalink: /your-post.html
   ---
   ```

3. Write the post below the closing `---` using Markdown.
4. Build and preview the generated site with `npm install`, `npm run build`, and `npm run serve`.

The shared blog layout is `src/_includes/layouts/blog.njk`. It uses the common header, footer, and WhatsApp button in `src/_includes/components/`. Blog HTML is generated into `_site`; assets and the existing root HTML pages are copied into that folder as well. `netlify.toml` configures Netlify to run `npm run build` and publish `_site`.

The sample post is `src/blog/vitiligo.md`, and its permalink remains `/vitiligo-blog.html`. It is based on current medical sources and includes an educational-use note. Existing root pages are not yet converted to Eleventy layouts.
