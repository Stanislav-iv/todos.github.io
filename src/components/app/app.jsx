import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import TaskList from '../TaskList/TaskList'
import './app.css'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('all')

  const creatTodoItem = (value, min, sec) => {
    return {
      label: value,
      completed: false,
      editing: false,
      id: uuidv4(),
      date: new Date(),
      min: min,
      sec: sec,
      time: `${min < 1 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`,
      timerStop: false,
      countDown: null,
    }
  }

  const addItem = (text, min, sec) => {
    const newItem = creatTodoItem(text, min, sec)
    setTodoData([...todoData, newItem])
  }

  const timerTask = (idx) => {
    setTodoData([
      ...todoData.map((el) => {
        if (el.id === idx) {
          el.timerStop = true
        }

        clearInterval(el.countDown)

        const sumSeconds = Number(el.min) * 60 + Number(el.sec)

        const currentTime = Date.now()
        const endTime = currentTime + sumSeconds * 1000

        el.countDown = setInterval(() => {
          if (el.timerStop) {
            const secondLeft = Math.round((endTime - Date.now()) / 1000)
            if (secondLeft < 0) {
              clearInterval(el.countDown)
              return
            }
            displayTimer(secondLeft, idx)
          }
        }, 1000)

        return el
      }),
    ])
  }

  const displayTimer = (seconds, id) => {
    setTodoData([
      ...todoData.map((el) => {
        if (el.id === id) {
          el.min = Math.floor(seconds / 60)
          el.sec = seconds % 60
          el.time = `${el.min}:${el.sec < 10 ? '0' : ''}${el.sec}`
        }

        return el
      }),
    ])
  }

  const stopTimer = (id) => {
    setTodoData([
      ...todoData.map((el) => {
        if (el.id === id) {
          clearInterval(el.countDown)
          el.timerStop = false
        }

        return el
      }),
    ])
  }

  const onEditeItem = (idx, text) => {
    setTodoData([
      ...todoData.map((el) => {
        if (el.id === idx) el.label = text

        return el
      }),
    ])
  }

  const deleteItem = (idx) => {
    setTodoData([...todoData.filter(({ id }) => id !== idx)])
  }

  const onTextComplet = (id) => {
    setTodoData([...todoData.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo }))])
  }

  const clearCompleted = () => {
    setTodoData([...todoData.filter((element) => !element.completed)])
  }

  const filterItem = (items, filter) => {
    switch (filter) {
      case 'all':
        return items

      case 'active':
        return items.filter((elem) => !elem.completed)

      case 'completed':
        return items.filter((elem) => elem.completed)

      default:
        return items
    }
  }

  const filterChang = (filter) => {
    setFilter(filter)
  }

  const visItem = filterItem(todoData, filter)
  const count = todoData.filter((el) => el.completed).length
  const todoCount = todoData.length - count

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <section className="main">
        <TaskList
          stopTimer={stopTimer}
          timerTask={timerTask}
          onEditeItem={onEditeItem}
          todos={visItem}
          onDeleted={deleteItem}
          onTextComplet={onTextComplet}
        />
        <Footer todoCount={todoCount} filter={filter} filterChang={filterChang} clearCompleted={clearCompleted} />
      </section>
    </section>
  )
}

export default App
