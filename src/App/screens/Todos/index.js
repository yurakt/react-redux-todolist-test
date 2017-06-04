import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as actions from 'App/stores/resources/actions'
import { getChildEntities } from 'App/stores/resources'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import VisibilityFilter from './components/VisibilityFilter'

import { modes as visibilityModes } from 'App/utils/filterVisibility'

const Todos = ({ todos, addTodo, toggleTodo, params }) => {
  return (
    <section className='pa3 pa5-ns mw8 center'>
      <Link to='/'>
        <div className='fl ph3 pv3 pointer bg-animate hover-bg-light-gray'>
          Back to lists
        </div>
      </Link>
      <AddTodo onSubmit={({todo}, _, {reset}) => {
        addTodo(todo, params.listID)
        reset()
      }} />

      {/*<VisibilityFilter params={params.listID} mode={params.visibilityMode} />*/}
      <VisibilityFilter {...params} />

      <TodoList {...{ todos, toggleTodo, ...params }} />
    </section>
  )
}

Todos.propTypes = {
  todos: PropTypes.array,
  params: React.PropTypes.shape({
    listID: PropTypes.string.isRequired,
    visibilityMode: PropTypes.oneOf(visibilityModes)
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
