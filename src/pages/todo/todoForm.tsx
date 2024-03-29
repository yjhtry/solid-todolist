import { type RouteSectionProps, useNavigate, useParams } from '@solidjs/router'
import { type Component, createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Checkbox } from '~/components/Checkbox'
import { Input } from '~/components/Input'
import { message } from '~/components/Message'
import { Textarea } from '~/components/Textarea'
import { getDb } from '~/db'
import type { TodoItem } from '~/services/todo'

const TodoForm: Component<RouteSectionProps> = (_props) => {
  const [state, setState] = createStore<TodoItem>({} as any)
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()

  const isEdit = params.id !== undefined

  const onChange = (value: any, key: keyof TodoItem) => {
    setState(key, value)
  }

  const onAdd = async () => {
    const db = await getDb()
    await db.todos.insert(state)

    message.success({ message: 'Todo added successfully!' })
  }

  const onEdit = async () => {
    const db = await getDb()
    const todo = await db.todos.findOne().where('id').eq(params.id).exec()
    await todo.update({ $set: { ...state } })

    message.success({ message: 'Todo updated successfully!' })
  }

  const onSubmit = async () => {
    try {
      if (isEdit)
        await onEdit()
      else
        await onAdd()

      navigate('/todo')
    }
    catch (error) {
      console.error(error)
      message.error({ message: `${(message as any).message}` })
    }
  }

  createEffect(() => {
    if (params.id) {
      (async function () {
        const db = await getDb()
        const todo = await db.todos.findOne().where('id').eq(params.id).exec()
        setState(todo._data)
      }())
    }
  })

  return (
    <div class="m-auto mt-10 max-w-xl">
      <div class="m-x-auto max-w-sm flex flex-col items-start gap-6">
        <Input
          layout="vertical"
          label="Title"
          class="w-full border border-gray-300 rounded px-2 py-2"
          value={state.title}
          onChange={v => onChange(v, 'title')}
        />
        <Textarea
          layout="vertical"
          label="Description"
          class="block w-full border border-gray-300 rounded px-2 py-2"
          value={state.description}
          onChange={v => onChange(v, 'description')}
        />
        <Checkbox
          label="Completion"
          value={state.completion}
          onChange={v => onChange(v, 'completion')}
        />

        <div class="w-full flex justify-end">
          <button class="btn" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoForm
