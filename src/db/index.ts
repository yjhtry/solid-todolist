import { v4 as uuidV4 } from 'uuid'
import type {
  RxDatabase,
  RxJsonSchema,
} from 'rxdb'
import {
  addRxPlugin,
  createRxDatabase,
} from 'rxdb'
import {
  getRxStorageDexie,
} from 'rxdb/plugins/storage-dexie'
import { RxDBCleanupPlugin } from 'rxdb/plugins/cleanup'

import {
  todoSchemaLiteral,
} from './schema'
import type { MyDatabaseCollections, TodoDocType } from './types'

addRxPlugin(RxDBCleanupPlugin)

let dbPromise = null as Promise<RxDatabase<MyDatabaseCollections, any, any, unknown>>

async function _create() {
  const db = await createRxDatabase<MyDatabaseCollections>({
    name: 'myDB',
    storage: getRxStorageDexie(),
    cleanupPolicy: {
      minimumDeletedTime: 1000 * 60 * 60 * 24 * 5,
    },
  })

  await db.addCollections({
    todos: {
      schema: todoSchemaLiteral as RxJsonSchema<TodoDocType>,
    },
  })

  db.todos.preInsert((data) => {
    data.id = uuidV4()
  }, false)

  return db
}

export function getDb() {
  if (!dbPromise)
    dbPromise = _create()

  return dbPromise
}
