import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../tasksFilterr/TasksFilter'
import './Footer.scss'

const Footer = ({ todoCount, filter, filterChang, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter filter={filter} filterChang={filterChang} />
      <button onClick={() => clearCompleted()} className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}
Footer.DefaultProps = {
  todoCount: 0,
  filter: 'all',
}
Footer.propTypes = {
  todoCount: PropTypes.number,
  filter: PropTypes.string,
  filterChang: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}

export default Footer
