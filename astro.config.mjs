// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import fuse from 'astro-fuse';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), fuse()]
});