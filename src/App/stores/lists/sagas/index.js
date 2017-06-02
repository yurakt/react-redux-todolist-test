import { put, fork, call, take } from 'redux-saga/effects'

import { normalize } from 'normalizr'

import api from 'config/api'

import * as actions from 'App/stores/resources/actions'
import t from 'App/stores/resources/actions/constants'

import * as schema from '../schema'

/*
 * Subroutines
 */

function* receiveResponse (response) {
  if (response.ok) {
    const list = normalize(response.data.list, schema.list)

    yield put(actions.setEntity(list, {type: 'lists'}))
  } else {
    const error = response.data.error

    yield put(actions.requestFailure(error, {type: 'lists'}))
  }
}

export function* addList () {
  while (true) {
    const action = yield take(t.SUBMIT_ENTITY)
    if (action.meta && action.meta.type === 'lists') {
      const todo = {
        ...action.payload
      }

      const response = yield call(api.post, '/lists', {...todo})

      yield fork(receiveResponse, response)
    }
  }
}


/*
 * Watchers
 */

export default function* watchLists () {
  // in case of adding new sagas
  yield [
    fork(addList)
  ]
}
