import type { JSX } from 'solid-js'
import { Show, createSignal, mergeProps, splitProps } from 'solid-js'

interface CheckboxProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string
  value: boolean
  layout?: 'horizontal' | 'vertical'
  onChange: (value: boolean) => void
}

export function Checkbox(p: CheckboxProps) {
  const props = mergeProps({ layout: 'horizontal' }, p)
  const [omit, rest] = splitProps(props, ['onChange', 'value', 'layout', 'label'])
  const [value, setValue] = createSignal(!!omit.value)

  const onChange = () => {
    const c = setValue(v => !v)
    omit.onChange(c)
  }

  return (
    <div class="w-full flex items-center" classList={{ 'flex-col !items-start mb-1': omit.layout === 'vertical' }}>
      <Show when={omit.label}>
        <label onClick={onChange}class="mr-1 cursor-pointer select-none">{`${omit.label}:`}</label>
      </Show>
      <input checked={value()} {...rest} type="checkbox" onChange={onChange} />
    </div>
  )
}
