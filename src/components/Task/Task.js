import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import times from 'date-fns/locale/en-AU'
import './Task.css'

export default class Task extends Component {
  static defaultProps = {
    date: new Date(),
  }
  static propTypes = {
    label: PropTypes.string.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onTextComplet: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date),
  }
  state = {
    editing: false,
    label: '',
  }
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {
      onEditeItem,
      todo: { id },
    } = this.props
    onEditeItem(id, this.state.label)

    this.setState({ label: '' })
    this.setState({ editing: false })
  }

  render() {
    const { label, onDeleted, onTextComplet, completed, date } = this.props

    return (
      <li className={completed ? 'completed' : this.state.editing ? 'editing' : null}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onTextComplet} />
          <label>
            <span className="description">{label}</span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                locale: times,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() =>
              this.setState(({ editing }) => ({
                editing: !editing,
                label: this.props.todo.label,
              }))
            }
          />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>

        {this.state.editing && (
          <form onSubmit={this.onSubmit}>
            <input type="text" className="edit" value={this.state.label} onChange={this.onLabelChange} />
          </form>
        )}
      </li>
    )
  }
}
