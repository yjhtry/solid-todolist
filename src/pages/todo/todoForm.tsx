import type { RouteSectionProps } from '@solidjs/router'
import type { Component } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Checkbox } from '~/components/Checkbox'
import { Input } from '~/components/Input'
import { Textarea } from '~/components/Textarea'
import type { TodoItem } from '~/services/todo'

const TodoForm: Component<RouteSectionProps> = (_props) => {
  const [state, setState] = createStore<TodoItem>({} as any)

  const onChange = (value: any, key: keyof TodoItem) => {
    setState(key, value)
  }

  const onSubmit = () => {
    // todo validation and insert to db
  }

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
