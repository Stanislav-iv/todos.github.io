import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

export default class TaskList extends Component {
  static defaultProps = {
    todos: [],
  }
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func.isRequired,
    onTextComplet: PropTypes.func.isRequired,
    onEditeItem: PropTypes.func.isRequired,
  }
  render() {
    const { todos, onDeleted, onTextComplet, onEditeItem } = this.props

    const elements = todos.map((item) => {
      const { id, ...itemProps } = item
      return (
        <Task
          {...itemProps}
          key={id}
          todo={item}
          onEditeItem={onEditeItem}
          onDeleted={() => onDeleted(id)}
          onTextComplet={() => onTextComplet(id)}
        />
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
}
