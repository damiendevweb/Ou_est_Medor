import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset: dataset || 'production',
      apiVersion: '2026-01-01',
      useCdn: true,
      token: import.meta.env.VITE_SANITY_READ_TOKEN,
    })
  : null
