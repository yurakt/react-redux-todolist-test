import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import classNames from 'classnames'

import { modes, defaultMode } from 'App/utils/filterVisibility'

const VisibilityFilter = ({ listID, visibilityMode }) => {
  return (
    <div>
      <h1 className='f4 bold center mw6'>Show:
      {modes
        .map((mode, i) => {
            let active = visibilityMode ? mode === visibilityMode : mode === defaultMode
            let classes = classNames(
              'ph3 pv3 pointer bg-animate hover-bg-light-gray',
              {
                'bb bw1 b--light-silver': active
              }
            )
            return (
              <Link to={`/${listID}/${mode}`} key={i}>
                <span key={i} className={classes}>
                  {mode}
                </span>
              </Link>
            )
          }
        )
      }
      </h1>
    </div>
  )
}

VisibilityFilter.propTypes = {
  mode: PropTypes.oneOf(modes)
}

export default VisibilityFilter
