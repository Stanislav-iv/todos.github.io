import React from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.scss'

const TaskFilter = ({ filter, filterChang }) => {
  const arr = ['all', 'active', 'completed']
  const newArr = arr.map((el, index) => {
    return (
      <li key={index}>
        <button onClick={() => filterChang(el)} className={filter === el ? 'selected' : null}>
          {el}
        </button>
      </li>
    )
  })

  return <ul className="filters">{newArr}</ul>
}
TaskFilter.defaultProps = {
  filter: 'all',
}
TaskFilter.propTypes = {
  filter: PropTypes.string,
  filterChang: PropTypes.func.isRequired,
}

export default TaskFilter
