import React, { useState } from 'react'

import NewTaskForm from '../newTaskForm/NewTaskForm'
import Footer from '../footer/Footer'
import TaskList from '../taskList/TaskList'
import './App.scss'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('all')

  return (
    <section className="todoapp">
      <NewTaskForm setTodoData={setTodoData} todoData={todoData} />
      <section className="main">
        <TaskList todoData={todoData} filter={filter} setTodoData={setTodoData} />
        <Footer setFilter={setFilter} todoData={todoData} filter={filter} setTodoData={setTodoData} />
      </section>
    </section>
  )
}
export default App
