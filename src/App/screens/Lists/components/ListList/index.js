import React, { PropTypes } from 'react'

import List from '../List'
import sortByDate from 'App/utils/sortByDate'

// ridiculous name, just mirrors TodoList
const ListList = ({ lists }) => {
  const sortedLists = lists && lists[0] ? sortByDate(lists) : null

  return (
    <ul className='list pl0 ml0 center mw6 ba b--light-silver br2'>
      {sortedLists
        ? lists.map((list, i) =>
          <List
            key={i}
            {...list}
            isLast={(lists.length - 1) === i}
          />
        )
        : <p className='ph3 pv3 tc'>No lists found</p>
      }
    </ul>
  )
}

ListList.propTypes = {
  lists: PropTypes.array
}

export default ListList
