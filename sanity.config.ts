import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { footer, footerLink, footerColumn, footerSocial } from './schemas/footer'

export default defineConfig({
  name: 'ouestmedor',
  title: 'Où est Médor ?',
  projectId: 'fvpdzo11',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [footer, footerLink, footerColumn, footerSocial],
  },
})