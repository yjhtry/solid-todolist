import { For, type JSX, Show, mergeProps } from 'solid-js'

export type Columns<T> = Array<{
  title: JSX.Element
  dataIndex: keyof T
  render?: (value: T[keyof T], record: T) => JSX.Element
}>

interface TableProps<T> {
  title?: JSX.Element
  dataSource: T[]
  columns: Columns<T>
}

export function Table<T>(p: TableProps<T>) {
  const props = mergeProps({ dataSource: [], columns: [] }, p)
  const headers = props.columns.map(column => column.title)

  return (
    <section class="bg-gray-100 text-gray-600 antialiased">
      <div class="h-full flex flex-col justify-center">
        <div class="w-full border border-gray-200 rounded-sm bg-white shadow-lg">
          <Show when={props.title}>
            <header class="border-b border-gray-100 px-5 py-4">
              <h2 class="text-gray-800 font-semibold">{props.title}</h2>
            </header>
          </Show>
          <div class="p-3">
            <div class="overflow-x-auto">
              <table class="w-full table-auto">
                <thead class="bg-gray-50 text-xs text-gray-400 font-semibold">
                  <tr>
                    <For each={headers}>
                      {header => (
                        <th class="whitespace-nowrap p-2">
                          <div class="text-left font-semibold">{header}</div>
                        </th>
                      )}
                    </For>
                  </tr>
                </thead>
                <tbody class="text-sm divide-y divide-gray-100">
                  <For each={props.dataSource}>
                    {record => (
                      <tr>
                        <For each={props.columns}>
                          {(column) => {
                            const value = record[column.dataIndex]
                            const content = column.render ? column.render(value, record) : value as any
                            return (
                              <td class="whitespace-nowrap p-2">
                                <div class="flex items-center">
                                  <div class="text-gray-800 font-medium">{content}</div>
                                </div>
                              </td>
                            )
                          }}
                        </For>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
