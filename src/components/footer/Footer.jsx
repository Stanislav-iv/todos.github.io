import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../tasksFilter/TasksFilter'
import './Footer.scss'

const Footer = ({ todoData, filter, setFilter, setTodoData }) => {
  const clearCompleted = () => {
    setTodoData([...todoData.filter((element) => !element.completed)])
  }

  const count = todoData.filter((el) => el.completed).length
  const todoCount = todoData.length - count

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter filter={filter} setFilter={setFilter} />
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
}

export default Footer
