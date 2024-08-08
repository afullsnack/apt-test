import type { CollectionConfig } from 'payload'
import { formatSlug } from './utils'

export const Sections: CollectionConfig = {
  slug: 'sections',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Section name',
      type: 'text',
      index: true,
      required: true,
    },
    {
      name: 'quote',
      label: 'Section quote',
      type: 'text',
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
    {
      name: 'test',
      label: 'Test',
      type: 'relationship',
      relationTo: 'tests',
    },
  ],
}