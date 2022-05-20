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
      name: "details",
      title: "Details",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
  ],
};
