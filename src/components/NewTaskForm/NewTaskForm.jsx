import React, { Component } from 'react'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }
  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }
  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.label.trim()) this.props.addItem(this.state.label, this.state.min, this.state.sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <button type="submit" />
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onMinChange}
            value={this.state.min}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onSecChange}
            value={this.state.sec}
          />
        </form>
      </header>
    )
  }
}
