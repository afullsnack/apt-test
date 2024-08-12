import { CollectionConfig } from 'payload'

export const Metrics: CollectionConfig = {
  slug: 'metrics',
  fields: [
    {
      name: 'section-slug',
      label: 'Section',
      type: 'text',
    },
    {
      name: 'attempts',
      label: 'Attempts',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'score',
      label: 'Score',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'fail-count',
      label: 'Fail count',
      type: 'number',
    },
    {
      name: 'passed-count',
      label: 'Pass count',
      type: 'number',
    },
    {
      name: 'user',
      label: 'User',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
}
