import { type Accessor, createEffect } from 'solid-js'

type ChangeElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export default function model(el: Element, value: Accessor<[() => any, (value: any) => any]>) {
  const [field, setField] = value()

  const onClick = (e: Event) => {
    setField((e.target as ChangeElement).value)
  }

  createEffect(() => (el as ChangeElement).value = field())

  el.addEventListener('change', onClick)
}
