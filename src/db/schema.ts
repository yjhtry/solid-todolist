export const todoSchemaLiteral = {
  title: 'todo schema',
  description: 'todo list record',
  version: 0,
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
  },
  required: ['title', 'description', 'completion'],
  indexes: ['id', 'title', 'completion'],
} as const
