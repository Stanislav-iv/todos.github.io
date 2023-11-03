import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/Task'
import './TaskList.scss'

const TaskList = ({ todoData, filter, setTodoData }) => {
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
          if (el.timerStop && !el.completed) {
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
    stopTimer(id)
    setTodoData([
      ...todoData.map((el) => {
        if (el.id === id && !el.completed) el.completed = true
        else if (el.id === id && el.completed) el.completed = false
        return el
      }),
    ])
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

  const visItem = filterItem(todoData, filter)

  const elements = visItem.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        {...itemProps}
        key={id}
        stopTimer={() => stopTimer(id)}
        timerTask={() => timerTask(id)}
        todo={item}
        onEditeItem={onEditeItem}
        onDeleted={() => deleteItem(id)}
        onTextComplet={() => onTextComplet(id)}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}
TaskList.DefaultProps = {
  visItem: [],
}
TaskList.propTypes = {
  visItem: PropTypes.arrayOf(PropTypes.object),
}
export default TaskList
