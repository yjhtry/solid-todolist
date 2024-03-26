import { createSignal, } from 'solid-js';

const App = () => {
  const [count, setCount] = createSignal(0);
  const [func, setFunc] = createSignal(() => {
    console.log('func');
  })


  return (
    <div class='max-w-3xl mx-auto center flex-col mt-10'>
      <Counter count={count()} />

      <div class='mt-4 flex gap-4'>
        <button onClick={() => {
          setCount(c => c + 1);
          setFunc(() => () => {
            console.log('func22');
          })
        }} class='btn'>increase</button>
        <button onClick={() => setCount(c => c - 1)} class='btn'>decrease</button>
      </div>
    </div>
  );
};

function Counter(props: { count: number }) {
  console.log('Counter', props);
  return <div>{props.count}</div>
}


export default App;
