import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './NewTaskForm.scss'

const NewTaskForm = ({ setTodoData, todoData }) => {
  const [label, setLabel] = useState('')
  const [time, setTime] = useState({ min: '', sec: '' })

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

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onTimeChange = (e) => {
    setTime({ ...time, [e.target.name]: e.target.value })
    if (e.target.value > 59) {
      setTime({ min: '', sec: '' })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label.trim()) addItem(label, time.min, time.sec)
    setLabel('')
    setTime({ sec: '', min: '' })
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <button type="submit" />
        <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Min"
          name="min"
          onChange={onTimeChange}
          value={time.min}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Sec"
          name="sec"
          onChange={onTimeChange}
          value={time.sec}
        />
      </form>
    </header>
  )
}

export default NewTaskForm
