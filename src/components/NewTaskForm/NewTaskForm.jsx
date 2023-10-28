import React, { useState } from 'react'

import './NewTaskForm.css'

const NewTaskForm = ({ addItem }) => {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }
  const onMinChange = (e) => {
    setMin(e.target.value)
  }
  const onSecChange = (e) => {
    setSec(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (label.trim()) addItem(label, min, sec)
    setLabel('')
    setMin('')
    setSec('')
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <button type="submit" />
        <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
        <input className="new-todo-form__timer" placeholder="Min" onChange={onMinChange} value={min} />
        <input className="new-todo-form__timer" placeholder="Sec" onChange={onSecChange} value={sec} />
      </form>
    </header>
  )
}

export default NewTaskForm
