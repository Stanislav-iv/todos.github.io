import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import TaskList from '../TaskList/TaskList'
import './app.css'

export default class App extends Component {
  state = {
    todoData: [],
    filter: 'all',
  }

  creatTodoItem(value, min, sec) {
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

  addItem = (text, min, sec) => {
    const newItem = this.creatTodoItem(text, min, sec)
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return { todoData: newArr }
    })
  }
  timerTask = (idx) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((el) => {
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
            this.displayTimer(secondLeft, idx)
          }
        }, 1000)

        return el
      }),
    }))
  }

  displayTimer = (seconds, id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((el) => {
        if (el.id === id) {
          el.min = Math.floor(seconds / 60)
          el.sec = seconds % 60
          el.time = `${el.min}:${el.sec < 10 ? '0' : ''}${el.sec}`
        }

        return el
      }),
    }))
  }
  stopTimer = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((el) => {
        if (el.id === id) {
          clearInterval(el.countDown)
          el.timerStop = false
        }

        return el
      }),
    }))
  }
  onEditeItem = (idx, text) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((el) => {
        if (el.id === idx) el.label = text

        return el
      }),
    }))
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.map((el) => {
      if (el.id === id) el = { ...el, [propName]: !el[propName] }
      return el
    })
    return idx
  }

  deleteItem = (idx) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter(({ id }) => id !== idx),
    }))
  }

  onTextComplet = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'completed'),
    }))
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((element) => !element.completed),
    }))
  }

  filterItem(items, filter) {
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

  filterChang = (filter) => {
    this.setState({ filter })
  }

  render() {
    const { todoData, filter } = this.state
    const visItem = this.filterItem(todoData, filter)
    const count = todoData.filter((el) => el.completed).length
    const todoCount = todoData.length - count

    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            stopTimer={this.stopTimer}
            timerTask={this.timerTask}
            onEditeItem={this.onEditeItem}
            todos={visItem}
            onDeleted={this.deleteItem}
            onTextComplet={this.onTextComplet}
          />
          <Footer
            todoCount={todoCount}
            filter={filter}
            filterChang={this.filterChang}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}
