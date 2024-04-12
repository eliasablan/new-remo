import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

import { sanityIntegration } from '@sanity/astro'
import react from '@astrojs/react'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    tailwind(),
    sanityIntegration({
      projectId,
      dataset,
      // Set useCdn to false if you're building statically.
      useCdn: false,
      // Access the Studio on your.url/admin
      studioBasePath: '/admin'
    }),
    react()
  ]
})
