const saveSchema = {
  name: 'save',
  title: 'Save',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'reference',
      to: { type: 'user' },
    },
  ],
}

export default saveSchema
