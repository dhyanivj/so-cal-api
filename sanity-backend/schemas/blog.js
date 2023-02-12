// schemas/pet.js
export default {
    name: 'blog',
    type: 'document',
      title: 'blog',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'title'
      },
      {
        name: 'content',
        type: 'string',
        title: 'content'
      },
      {
        name: 'launchAt',
        type: 'datetime',
        title: 'Scheduled at'
      }
    ]
  }