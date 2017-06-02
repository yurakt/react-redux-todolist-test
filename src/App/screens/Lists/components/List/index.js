import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import classNames from 'classnames'

const List = ({ name, id, isLast }) => {
  const listClass = classNames(
    'ph3 pv3 pointer bg-animate hover-bg-light-gray',
    {
      'bb b--light-silver': !isLast
    }
  )
  const to = `/${id}/`

  return (
      <Link to={to}>
        <div className={listClass}>{name}</div>
      </Link>
  )
}

List.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired

}

export default List
