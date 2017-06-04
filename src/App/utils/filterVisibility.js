const ALL = 'all'
const ACTIVE = 'active'
const COMPLETED = 'completed'

export const modes = [ALL, ACTIVE, COMPLETED]
export const defaultMode = ALL

export const filter = (todos, mode) => {
  return todos.filter(
    (todo) => {
      console.log('todo', todo, mode, mode === ALL, mode === ACTIVE, mode === COMPLETED)
      if (mode === undefined) return todo
      if (mode === ALL) return todo
      if (mode === ACTIVE && !todo.completed) return todo
      if (mode === COMPLETED && todo.completed) return todo
    })
}
