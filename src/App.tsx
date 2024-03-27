import { Route, Router } from '@solidjs/router'
import Home from './pages/index'
import TodoList from './pages/todo/todoList'
import Todo from './pages/todo/todo'
import TodoForm from './pages/todo/todoForm'

function App() {
  return (
    <Router root={Home}>
      <Route path="/todo">
        <Route path="/" component={TodoList} />
        <Route path={['add', 'edit']} component={TodoForm} />
        <Route path="/:id" component={Todo} />
      </Route>
    </Router>
  )
}

export default App
