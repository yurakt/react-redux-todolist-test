import { put, fork, call, take } from 'redux-saga/effects'

import { normalize } from 'normalizr'

import api from 'config/api'

import * as actions from 'App/stores/resources/actions'
import t from 'App/stores/resources/actions/constants'

import * as schema from '../schema'

/*
 * Subroutines
 */

function* receiveResponse (response, meta) {
  if (response.ok) {
    const todo = normalize(response.data.todo, schema.todo)

    yield put(actions.setEntity(todo, meta))
  } else {
    const error = response.data.error

    yield put(actions.requestFailure(error, meta))
  }
}

function* addTodo () {
  while (true) {
    const action = yield take(t.SUBMIT_ENTITY)
    if (action.meta && action.meta.type === 'todos') {
      const todo = {
        ...action.payload
      }

      const response = yield call(api.post, '/todos', {...todo})

      yield fork(receiveResponse, response, action.meta)
    }
  }
}

function* toggleTodo () {
  while (true) {
    const action = yield take(t.UPDATE_ENTITY)
    if (action.meta && action.meta.type === 'todos') {
      const todo = action.payload
      const response = yield call(api.put, `/todos/${todo.id}`, {...todo})

      yield fork(receiveResponse, response, action.meta)
    }
  }
}

/*
 * Watchers
 */

export default function* watchTodos () {
  yield [
    fork(addTodo),
    fork(toggleTodo)
  ]
}
