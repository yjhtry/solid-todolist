import { type RouteSectionProps, useParams } from '@solidjs/router'
import { type Component, Show, createEffect, createSignal } from 'solid-js'
import { getDb } from '~/db'
import type { TodoDocType } from '~/db/types'

const Todo: Component<RouteSectionProps> = () => {
  const params = useParams()
  const [todo, setTodo] = createSignal<TodoDocType>({} as any)

  createEffect(() => {
    if (params.id) {
      (async function () {
        const db = await getDb()
        const todo = await db.todos.findOne().where('id').eq(params.id).exec()
        setTodo(todo._data)
      }())
    }
  })
  return (
    <div class="mx-auto mt-8 flex flex-col gap-4 border border-b-gray-300 rounded-md p-4 text-left container">
      <h2 class="text-xl font-bold">{todo().title}</h2>
      <p>{todo().description}</p>
      <Show when={todo().completion} fallback={<div>未完成</div>}>
        <div>已完成</div>
      </Show>
    </div>
  )
}

export default Todo
