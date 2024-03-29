import { A, type RouteSectionProps, useNavigate } from '@solidjs/router'
import { type Component, createResource, onCleanup, onMount } from 'solid-js'
import { message } from '~/components/Message'
import type { Columns } from '~/components/Table'
import { Table } from '~/components/Table'
import { getDb } from '~/db'
import type { TodoDocType } from '~/db/types'

async function fetcher() {
  const db = await getDb()
  const todoDocs = await db.todos.find().sort({ createAt: 'desc' }).exec()

  return todoDocs.map(todo => todo._data)
}

const TodoList: Component<RouteSectionProps> = (_props) => {
  const navigate = useNavigate()

  const subscribes = [] as Array<{ unsubscribe: () => void }>

  const [data, { refetch }] = createResource(fetcher)

  onMount(async () => {
    const db = await getDb()
    const todos = db.todos
    subscribes.push(todos.insert$.subscribe(() => refetch()))
    subscribes.push(todos.update$.subscribe(() => refetch()))
    subscribes.push(todos.remove$.subscribe(() => refetch()))
  })

  onCleanup(() => {
    subscribes.forEach(subscribe => subscribe.unsubscribe())
  })

  const onDelete = async (id: string) => {
    try {
      const db = await getDb()
      const todo = await db.todos.findOne().where('id').eq(id).exec()
      await todo.remove()

      message.success({ message: 'Todo deleted successfully!' })
    }
    catch (error) {
      message.error({ message: `${(message as any).message}` })
    }
  }

  const onAdd = () => {
    navigate('/todo/add')
  }

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
      title: 'completion',
      dataIndex: 'completion',
      render: (value: boolean) => value ? 'Yes' : 'No',
    },
    {
      title: 'Operation',
      render: (_, record) => (
        <div class="flex gap-4 text-blue">
          <A href={`/todo/${record.id}`}>Detail</A>
          <A href={`/todo/edit/${record.id}`}>Edit</A>
          <a class="cursor-pointer" onClick={[onDelete, record.id]}>Delete</a>
        </div>
      ),
    },
  ] as Columns<TodoDocType>

  return (
    <div class="p-4">
      <div class="mb-4 flex justify-end">
        <button onClick={onAdd} class="btn">Add</button>
      </div>
      <Table<TodoDocType> dataSource={data.latest} columns={columns} />
    </div>
  )
}

export default TodoList
