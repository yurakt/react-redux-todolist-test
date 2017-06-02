import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getChildEntities } from 'App/stores/resources'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

const Todos = ({ todos, addTodo, toggleTodo, params }) => {
  return (
    <section className='pa3 pa5-ns'>
      <AddTodo onSubmit={({todo}, _, {reset}) => {
        addTodo(todo, params.listID)
        reset()
      }} />

      <h1 className='f4 bold center mw6'>All Todos</h1>

      <TodoList {...{ todos, toggleTodo }} />
    </section>
  )
}

Todos.propTypes = {
  todos: PropTypes.array,
  params: React.PropTypes.shape({
    listID: PropTypes.string.isRequired
  })
}

export default connect(
  (state, ownProps) => ({
    todos: getChildEntities('todos', 'lists', ownProps.params.listID)(state)
  }),
  dispatch => ({
    addTodo: (text, listID) => dispatch(actions.submitEntity({ text, listID },
      { type: 'todos', parentType: 'lists', parentId: listID })),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'}))
  })
)(Todos)
