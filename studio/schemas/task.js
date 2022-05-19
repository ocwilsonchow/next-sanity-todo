export default {
  name: 'task',
  title: 'Task',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'string'
    },
    {
      name: 'done',
      title: 'Done',
      type: 'boolean',
      initialValue: false
    }
  ]
}
