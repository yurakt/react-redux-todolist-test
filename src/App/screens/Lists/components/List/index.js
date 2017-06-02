import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const List = ({ name, id }) => {
  const classes = 'ph3 pv3 pointer bg-animate hover-bg-light-gray'
  const to = `/${id}/`

  return (
    <li className={classes}>
      <Link to={to}>{name}</Link>
    </li>
  )
}

List.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired

}

export default List
