import React, { PropTypes } from 'react'

import List from '../List'

//TODO lift up
const sortByDate = (arr) => arr.sort((a, b) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.createdAt) - new Date(a.createdAt)
})

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
