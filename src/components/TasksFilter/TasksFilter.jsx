import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

export default class TaskFilter extends Component {
  static defaultProps = {
    filter: 'all',
  }
  static propTypes = {
    filter: PropTypes.string,
    filterChang: PropTypes.func.isRequired,
  }
  render() {
    const { filter, filterChang } = this.props
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
}
