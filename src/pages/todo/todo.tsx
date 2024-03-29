import { type RouteSectionProps, useParams } from '@solidjs/router'
import { type Component, Show, createSignal, onCleanup, onMount } from 'solid-js'
import { getDb } from '~/db'
import type { TodoDocType } from '~/db/types'

const Todo: Component<RouteSectionProps> = () => {
  const params = useParams()
  const [todo, setTodo] = createSignal<TodoDocType>({} as any)
  let subscribe = null as { unsubscribe: () => void }

  onMount(async () => {
    if (params.id) {
      const db = await getDb()
      const todo = await db.todos.findOne().where('id').eq(params.id)

      subscribe = todo.$.subscribe(todo => setTodo(todo._data))
    }
  })

  onCleanup(() => {
    subscribe?.unsubscribe()
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
