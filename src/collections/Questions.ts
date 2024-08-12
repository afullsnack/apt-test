import type { CollectionConfig } from 'payload'

export const Questions: CollectionConfig = {
  slug: 'questions',
  fields: [
    {
      name: 'serial-number',
      label: 'S/N',
      type: 'number',
      index: true,
      required: true,
    },
    {
      name: 'question',
      label: 'question',
      type: 'richText',
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
      name: 'solution',
      label: 'Solution',
      type: 'text',
      required: true,
    },
    {
      name: 'explanation',
      label: 'Explanation',
      type: 'richText',
    },
    {
      name: 'section',
      index: true,
      type: 'relationship',
      relationTo: 'sections',
    },
  ],
}
