export const todoSchemaLiteral = {
  title: 'todo schema',
  description: 'todo list record',
  version: 1,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100, // <- the primary key must have set maxLength
    },
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    completion: {
      type: 'boolean',
    },
    createAt: {
      type: 'number',
    },
  },
  required: ['title', 'description', 'completion'],
  indexes: ['id', 'title', 'completion', 'createAt'],
} as const
