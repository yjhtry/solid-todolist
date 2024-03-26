import { createSignal } from 'solid-js'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <div class="mx-auto mt-10 max-w-3xl center flex-col">
      <Counter count={count()} />

      <div class="mt-4 flex gap-4">
        <button
          onClick={() => {
            setCount(c => c + 1)
          }}
          class="btn"
        >
          increase
        </button>
        <button onClick={() => setCount(c => c - 1)} class="btn">decrease</button>
      </div>
    </div>
  )
}

function Counter(props: { count: number }) {
  return <div>{props.count}</div>
}

export default App
