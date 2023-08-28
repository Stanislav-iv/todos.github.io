import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

export default class Footer extends Component {
  static defaultProps = {
    todoCount: 0,
    filter: 'all',
  }
  static propTypes = {
    todoCount: PropTypes.number,
    filter: PropTypes.string,
    filterChang: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
  }
  render() {
    const { todoCount, filter, filterChang, clearCompleted } = this.props
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
}
