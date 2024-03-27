import { A } from '@solidjs/router'
import { For } from 'solid-js'

const links = [
  {
    href: '/',
    title: 'Home',
  },
  {
    href: '/todo',
    title: 'Todo List',
  },
]
export function TheNav() {
  return (
    <div class="flex border-b border-b-gray-300 border-b-solid px-4 py-3">
      <div class="mr-auto font-700">
        SolidJS Todo
      </div>
      <ul class="flex items-center gap-4 text-center text-gray-600">
        <For each={links}>
          {({ href, title }) => (
            <li>
              <A end activeClass="text-blue" href={href}>{title}</A>
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}
