import React, { Component } from 'react'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addItem(this.state.label)
    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </form>
    )
  }
}
