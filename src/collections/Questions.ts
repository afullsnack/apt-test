import type { CollectionConfig } from 'payload'

export const Questions: CollectionConfig = {
  slug: 'questions',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'questionImage',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'options',
      label: 'Options',
      type: 'array',
      fields: [
        {
          name: 'option',
          type: 'text',
        },
      ],
    },
    {
      name: 'section',
      index: true,
      type: 'relationship',
      relationTo: 'sections',
    },
  ],
}
