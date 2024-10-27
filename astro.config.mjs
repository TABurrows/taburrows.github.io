// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import fuse from 'astro-fuse';



// https://astro.build/config
export default defineConfig({
    site: 'https://taburrows.github.io',
    // base: '/',
    // Enable experimental asset support for images
    // experimental: { assets: true },
    // Enable React to support React JSX components.
    integrations: [ react(), mdx(),
      fuse(['content','frontmatter.title','slug'],{
      basedOn: 'source',
    }) ],
    // redirects: { '/': '/blog', '/post/[slug]': '/blog/[slug]' },  
    // robotsTxt({
    //   host: 'taburrows.github.io',
    //   policy: [
    //     {
    //       allow: '/',
    //       disallow: ['/about', '/about/'],
    //       userAgent: '*',
    //     },
    //   ],
    // }),
    // integrations: [react(), remarkEleventyImage()],
    //   vite: {
    //     ssr: {
    //       external: ["@11ty/eleventy-img"],
    //     },
    // },
    // markdown: {
      // Can be 'shiki' (default), 'prism' or false to disable highlighting
      // syntaxHighlight: 'prism',
    // },


    markdown: {
      shikiConfig: {
        // Choose from Shiki's built-in themes (or add your own)
        // https://shiki.style/themes
        // theme: 'one-light',
        // theme: 'monokai',
        // theme: 'solarized-light',
        theme: 'github-light',
        // theme: 'material-theme-lighter',
        // theme: 'min-light',
        // Alternatively, provide multiple themes
        // See note below for using dual light/dark themes
      //   themes: {
          // light: 'github-light',
          // dark: 'github-dark',
      //   },
        // Disable the default colors
        // https://shiki.style/guide/dual-themes#without-default-color
        // (Added in v4.12.0)
      //   defaultColor: false,
        // Add custom languages
        // Note: Shiki has countless langs built-in, including .astro!
        // https://shiki.style/languages
      //   langs: [],
        // Enable word wrap to prevent horizontal scrolling
        wrap: true,
        // Add custom transformers: https://shiki.style/guide/transformers
        // Find common transformers: https://shiki.style/packages/transformers
      //   transformers: [],
      },
    }

});