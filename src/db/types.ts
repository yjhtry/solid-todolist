import type {
  ExtractDocumentTypeFromTypedRxJsonSchema,

  RxCollection,

  RxDatabase,

  RxDocument,

  RxJsonSchema,
} from 'rxdb'
import {
  toTypedRxJsonSchema,
} from 'rxdb'
import { todoSchemaLiteral } from './schema'

const schemaTyped = toTypedRxJsonSchema(todoSchemaLiteral)

// aggregate the document type from the schema
export type TodoDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>

export const todoSchema: RxJsonSchema<TodoDocType> = todoSchemaLiteral

interface TodoDocMethods {}

export type TodoDocument = RxDocument<TodoDocType, TodoDocMethods>

interface TodoCollectionMethods {}

export type TodoCollection = RxCollection<TodoDocType, TodoDocMethods, TodoCollectionMethods>

export interface MyDatabaseCollections {
  todos: TodoCollection
}

export type MyDatabase = RxDatabase<MyDatabaseCollections>
