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

  creatTodoItem(value) {
    return {
      label: value,
      completed: false,
      editing: false,
      id: uuidv4(),
      date: new Date(),
    }
  }

  addItem = (text) => {
    const newItem = this.creatTodoItem(text)
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return { todoData: newArr }
    })
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
