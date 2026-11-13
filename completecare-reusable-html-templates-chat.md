# Reusable HTML Templates for the Complete Care Website

**Date:** 13 November 2026

## User

[GitHub project](https://github.com/SSK010/completecarehomoeo) is my
project. It has HTML files wherein the menu, footer, etc. are repeated
over and over in each file. How do I make one file, HTML, or template so
that whenever the same elements need to be introduced, they can be
linked, called, or referenced like JavaScript or CSS? The main body can
be different in each HTML file, but the template remains the same. Hope
you get what I mean.

## Assistant

Yes, I understand exactly what you're trying to achieve. You want a
**common website layout/template with reusable components**, where every
page automatically shares the same menu, header, footer, navigation,
etc., while only the main content changes.

This is commonly called **HTML templating, partials, or component-based
architecture**.

For the Complete Care website, this is a good improvement:

-   Change the navigation menu once → it updates across every page.
-   Change the footer once → it updates across every page.
-   Change the header or announcement bar once → it updates across every
    page.
-   Each individual HTML file contains only its unique content.

### 1. Current project

Repository:
[SSK010/completecarehomoeo](https://github.com/SSK010/completecarehomoeo)

The website uses a conventional multi-page static structure, with pages
such as:

-   `index.html`
-   `about.html`
-   `treatments.html`
-   `faq.html`
-   `contact.html`
-   Individual condition pages such as `vitiligo.html`,
    `psoriasis.html`, and others.
-   `assets/css/style.css`
-   `assets/js/main.js`

The navigation, footer, and floating WhatsApp button are repeated across
pages. These are ideal candidates for reusable components.

### 2. Implementation options

  -----------------------------------------------------------------------
  Method                  How it works            Assessment
  ----------------------- ----------------------- -----------------------
  JavaScript includes     Loads header/footer     Easiest
                          HTML files dynamically  

  PHP includes            Server inserts common   Requires PHP hosting
                          HTML                    

  Static site generator   Combines templates and  Best long-term
                          page content into HTML  
                          during building         
  -----------------------------------------------------------------------

A suitable static site generator is [Eleventy
(11ty)](https://www.11ty.dev/). It uses Nunjucks templates, supports
reusable components, and generates ordinary HTML files.

This fits the existing GitHub + Netlify + Cloudflare setup. There is no
need to move to React, Angular, or Vue.

### 3. Recommended approach: Eleventy with Nunjucks

The existing HTML content, CSS, JavaScript, images, and URLs can be
retained. The main change is how the pages are organised and generated.

#### Proposed folder structure

``` text
completecarehomoeo/
├── src/
│   ├── _includes/
│   │   ├── base.njk
│   │   └── components/
│   │       ├── header.njk
│   │       ├── footer.njk
│   │       └── whatsapp.njk
│   └── pages/
│       ├── index.njk
│       ├── about.njk
│       ├── treatments.njk
│       ├── vitiligo.njk
│       ├── psoriasis.njk
│       └── ...
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── _site/                 # Generated website
├── eleventy.config.js
└── package.json
```

#### Master template: `base.njk`

The master template contains the common HTML structure and calls the
reusable components.

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <title>{{ title }} | Complete Care</title>
  <meta name="description" content="{{ description }}">

  <link rel="stylesheet"
        href="/assets/css/style.css">
</head>

<body>

  {% include "components/header.njk" %}

  <main>
    {{ content | safe }}
  </main>

  {% include "components/footer.njk" %}

  {% include "components/whatsapp.njk" %}

  <script src="/assets/js/main.js"></script>

</body>
</html>
```

`{{ content | safe }}` is where the unique content of each page gets
inserted.

#### Example individual page: `about.njk`

``` html
---
layout: base.njk
title: About
description: Learn more about Complete Care and Dr. Shrinidhi.
permalink: /about.html
---

<section>
  <div class="container">

    <h1>About Dr. Shrinidhi S. Kulkarni</h1>

    <p>
      Personalized homoeopathic care rooted
      in clinical understanding and compassion.
    </p>

    <!-- Rest of your About page content -->

  </div>
</section>
```

Similarly, `vitiligo.njk` would contain only the Vitiligo page content
and its own page metadata.

Neither page needs to maintain its own header, footer, or WhatsApp
button.

#### Reusable components

-   `header.njk`: contains the complete navigation markup.
-   `footer.njk`: contains the complete footer markup.
-   `whatsapp.njk`: contains the floating WhatsApp button and SVG.

The master template calls them using:

``` njk
{% include "components/header.njk" %}
{% include "components/footer.njk" %}
{% include "components/whatsapp.njk" %}
```

Each component is maintained in one place.

### 4. Netlify deployment

Eleventy generates normal HTML files before deployment.

``` text
GitHub repository
  Templates + components + page content
            |
            v
Eleventy build process
  Combines reusable components
            |
            v
Generated _site folder
  Complete, individual HTML pages
            |
            v
Netlify deployment
  Live website
```

Suggested Netlify settings:

  Setting             Value
  ------------------- ----------------------
  Build command       `npx @11ty/eleventy`
  Publish directory   `_site`

Netlify automatically rebuilds the website when changes are pushed to
the connected GitHub branch.

Benefits:

-   Search engines receive complete HTML.
-   No JavaScript loading delay for the header or footer.
-   Existing URLs can be retained.
-   Deployment remains automated through GitHub and Netlify.

### 5. Important items to preserve

This is a refactoring exercise, not a website redesign. Preserve:

-   Individual SEO metadata: titles, descriptions, canonical URLs, and
    Open Graph information.
-   Google Analytics and Microsoft Clarity.
-   Existing navigation links and mobile menu functionality.
-   Existing `main.js` functionality.
-   `robots.txt`, `sitemap.xml`, and `404.html`.
-   Existing image and CSS paths.

The master template can handle the common metadata structure, while each
individual page supplies its own values.

### 6. Suggested migration sequence

Convert the website incrementally rather than changing every page at
once:

1.  Set up Eleventy on Fedora.
2.  Create the master template and reusable components.
3.  Convert `about.html` first as a pilot.
4.  Test locally and compare it against the existing live page.
5.  Convert the remaining pages.
6.  Configure Netlify to build and publish `_site`.
7.  Test SEO, navigation, mobile responsiveness, and all existing URLs
    before merging into `main`.

**Recommendation:** Keep the existing HTML/CSS/JS approach but introduce
Eleventy + Nunjucks. It provides reusable templates without
unnecessarily complicating the website.

## User's follow-up

Export this chat as `.md`.
