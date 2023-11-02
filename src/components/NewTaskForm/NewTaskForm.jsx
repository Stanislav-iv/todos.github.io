import React, { useState } from 'react'

import './NewTaskForm.scss'

const NewTaskForm = ({ addItem }) => {
  const [label, setLabel] = useState('')
  const [time, setTime] = useState({ min: '', sec: '' })

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
