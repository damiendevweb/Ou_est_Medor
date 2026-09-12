import { defineType, defineField } from 'sanity'

export const footerLink = defineType({
  name: 'footerLink',
  title: 'Lien',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label du lien', type: 'string' }),
    defineField({ name: 'href', title: 'Lien', type: 'string' }),
  ],
})

export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Colonne',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({
      name: 'links',
      title: 'Liens',
      type: 'array',
      of: [{ type: 'footerLink' }],
    }),
  ],
})

export const footerSocial = defineType({
  name: 'footerSocial',
  title: 'Réseau social',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Nom', type: 'string' }),
    defineField({ name: 'url', title: 'URL', type: 'url' }),
  ],
})

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({ name: 'copyright', title: 'Copyright', type: 'string' }),
    defineField({ name: 'colonne1', title: 'Colonne 1', type: 'footerColumn' }),
    defineField({ name: 'colonne2', title: 'Colonne 2', type: 'footerColumn' }),
    defineField({ name: 'colonne3', title: 'Colonne 3', type: 'footerColumn' }),
    defineField({
      name: 'socials',
      title: 'Réseaux sociaux',
      type: 'array',
      of: [{ type: 'footerSocial' }],
    }),
  ],
})