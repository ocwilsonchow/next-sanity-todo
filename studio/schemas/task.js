export default {
  name: "task",
  title: "Task",
  type: "document",
  fields: [
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}]
    },
    {
      name: "details",
      title: "Details",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: 'highlighted',
      title: 'Highlighted',
      type: 'boolean',
      initialValue: false
    }
  ],
};
