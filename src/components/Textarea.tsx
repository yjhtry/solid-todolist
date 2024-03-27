import type { JSX } from 'solid-js'
import { Show, createSignal, mergeProps, splitProps } from 'solid-js'
import model from '~/directives/model'

const _model = model

interface TextareaProps extends Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
  label?: string
  value: string
  layout?: 'horizontal' | 'vertical'
  onChange: (value: string) => void
}

export function Textarea(p: TextareaProps) {
  const props = mergeProps({ layout: 'horizontal' }, p)
  const [omit, rest] = splitProps(props, ['onChange', 'value', 'layout', 'label'])
  const [value, setValue] = createSignal(omit.value || '')

  const onChange = (v: any) => {
    setValue(v)
    omit.onChange(v)
  }

  return (
    <div class="w-full flex items-center" classList={{ 'flex-col !items-start mb-1': omit.layout === 'vertical' }}>
      <Show when={omit.label}>
        <label class="mr-1">{`${omit.label}:`}</label>
      </Show>
      <textarea {...rest} use:model={[value, onChange]} />
    </div>
  )
}
