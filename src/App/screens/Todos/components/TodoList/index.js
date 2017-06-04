import React, { PropTypes } from 'react'

import Todo from '../Todo'

import sortByDate from 'App/utils/sortByDate'
import { filter, modes as visibilityModes } from 'App/utils/filterVisibility'


const TodoList = ({ todos, toggleTodo, visibilityMode }) => {
  const sortedTodos = todos && todos[0] ? sortByDate(filter(todos, visibilityMode)) : null

  return (
    <ul className='list pl0 ml0 center mw6 ba b--light-silver br2'>
      {sortedTodos
        ? sortedTodos
            .map((todo, i) =>
            <Todo
              key={i}
              {...todo}
              toggle={() => toggleTodo(todo, !todo.completed)}
              isLast={(sortedTodos.length - 1) === i}
            />
        )
        : <p className='ph3 pv3 tc'>No todos found</p>
      }
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  visibilityMode: PropTypes.oneOf(visibilityModes)
}

export default TodoList
