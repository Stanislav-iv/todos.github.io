import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import times from 'date-fns/locale/en-AU'
import './Task.scss'

const Task = ({ label, onDeleted, onTextComplet, completed, date, timerTask, time, stopTimer, todo, onEditeItem }) => {
  const [editing, setEditing] = useState(false)
  const [labelTask, setLabelTask] = useState('')

  const onLabelChange = (e) => {
    setLabelTask(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    onEditeItem(todo.id, labelTask)

    setLabelTask('')
    setEditing(false)
  }

  return (
    <li className={completed ? 'completed' : editing ? 'editing' : null}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onTextComplet} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={timerTask}></button>
            <button className="icon icon-pause" onClick={stopTimer}></button>
            <span className="icon-timer">{time}</span>
          </span>
          <span className="created description">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: times,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => {
            setEditing(!editing)
            setLabelTask(todo.label)
          }}
        />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>

      {editing && (
        <form onSubmit={onSubmit}>
          <input type="text" className="edit" value={labelTask} onChange={onLabelChange} />
        </form>
      )}
    </li>
  )
}
Task.DefaultProps = {
  date: new Date(),
}
Task.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onTextComplet: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date),
}

export default Task
