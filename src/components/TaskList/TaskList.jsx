import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/Task'
import './TaskList.scss'

const TaskList = ({ todos, onDeleted, onTextComplet, onEditeItem, timerTask, stopTimer }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        {...itemProps}
        key={id}
        stopTimer={() => stopTimer(id)}
        timerTask={() => timerTask(id)}
        todo={item}
        onEditeItem={onEditeItem}
        onDeleted={() => onDeleted(id)}
        onTextComplet={() => onTextComplet(id)}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}
TaskList.DefaultProps = {
  todos: [],
}
TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func.isRequired,
  onTextComplet: PropTypes.func.isRequired,
  onEditeItem: PropTypes.func.isRequired,
}
export default TaskList
