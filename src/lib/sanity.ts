import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2026-01-01',
  useCdn: true,
  token: import.meta.env.VITE_SANITY_READ_TOKEN,
})