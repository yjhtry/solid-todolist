import type { JSX } from 'solid-js'
import { Show, createEffect, createSignal, mergeProps, splitProps } from 'solid-js'
import model from '~/directives/model'

const _model = model

interface InputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string
  value: string
  layout?: 'horizontal' | 'vertical'
  onChange: (value: string) => void
}

export function Input(p: InputProps) {
  const props = mergeProps({ layout: 'horizontal' }, p)
  const [omit, rest] = splitProps(props, ['onChange', 'value', 'layout', 'label'])
  const [value, setValue] = createSignal('')

  createEffect(() => {
    setValue(omit.value || '')
  })

  const onChange = (v: any) => {
    setValue(v)
    omit.onChange(v)
  }

  return (
    <div class="w-full flex items-center" classList={{ 'flex-col !items-start mb-1': omit.layout === 'vertical' }}>
      <Show when={omit.label}>
        <label class="mr-1">{`${omit.label}:`}</label>
      </Show>
      <input {...rest} use:model={[value, onChange]} />
    </div>
  )
}
