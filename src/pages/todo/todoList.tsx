import type { RouteSectionProps } from '@solidjs/router'
import { type Component, createResource } from 'solid-js'
import type { Columns } from '~/components/Table'
import { Table } from '~/components/Table'
import { getDb } from '~/db'
import type { TodoDocType } from '~/db/types'

async function fetcher() {
  const db = await getDb()
  const todos = await db.todos.find().exec()

  return todos.map(todo => todo._data)
}

const TodoList: Component<RouteSectionProps> = (_props) => {
  const [data] = createResource(fetcher)

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      render: (value: boolean) => value ? 'Yes' : 'No',
    },
  ] as Columns<TodoDocType>

  return (
    <div>
      <Table<TodoDocType> dataSource={data.latest} columns={columns} />
    </div>
  )
}

export default TodoList
