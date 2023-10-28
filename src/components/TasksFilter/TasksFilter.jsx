import React from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

const TaskFilter = ({ filter, filterChang }) => {
  return (
    <ul className="filters">
      <li>
        <button onClick={() => filterChang('all')} className={filter === 'all' ? 'selected' : null}>
          All
        </button>
      </li>
      <li>
        <button onClick={() => filterChang('active')} className={filter === 'active' ? 'selected' : null}>
          Active
        </button>
      </li>
      <li>
        <button onClick={() => filterChang('completed')} className={filter === 'completed' ? 'selected' : null}>
          Completed
        </button>
      </li>
    </ul>
  )
}
TaskFilter.defaultProps = {
  filter: 'all',
}
TaskFilter.propTypes = {
  filter: PropTypes.string,
  filterChang: PropTypes.func.isRequired,
}

export default TaskFilter
