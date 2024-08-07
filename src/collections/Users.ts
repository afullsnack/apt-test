import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'access-code',
      label: 'Access cdoe',
      type: 'text',
      maxLength: 6,
      minLength: 6,
      unique: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'full-name',
      label: 'Full Name',
      type: 'text',
      minLength: 3,
    },
    {
      name: 'is-admin',
      label: 'Is Admin',
      type: 'checkbox',
      defaultValue: false,
      hooks: {
        beforeChange: [
          ({ field, operation, data, value }) => {
            if (operation === 'create') {
              return value !== 'miraclef60@gmail.com' ? false : true
            }
          },
        ],
      },
    },
  ],
  hooks: {
    // send email to new user email after name or email change
    afterChange: [async ({ operation, doc }) => {}],
  },
}
