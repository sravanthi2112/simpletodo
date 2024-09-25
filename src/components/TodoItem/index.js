import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  constructor(props) {
    super(props)
    const {todoList} = props
    this.state = {
      isEditing: false,
      updatedTitle: todoList.title,
    }
  }

  toggleEdit = () => {
    this.setState(prevState => ({isEditing: !prevState.isEditing}))
  }

  handleChange = event => {
    this.setState({updatedTitle: event.target.value})
  }

  saveTodo = () => {
    const {updatedTitle} = this.state
    const {todoList, updateTodo} = this.props
    updateTodo(todoList.id, updatedTitle)
    this.toggleEdit()
  }

  render() {
    const {todoList, deleteItem} = this.props
    const {id, title} = todoList
    const {isEditing, updatedTitle} = this.state

    return (
      <li className="list-item">
        {isEditing ? (
          <input
            type="text"
            value={updatedTitle}
            onChange={this.handleChange}
            style={{flex: 1}}
          />
        ) : (
          <p className="title">{title}</p>
        )}
        <div>
          {isEditing ? (
            <button type="button" className="button" onClick={this.saveTodo}>
              Save
            </button>
          ) : (
            <button type="button" className="button" onClick={this.toggleEdit}>
              Edit
            </button>
          )}
          <button
            type="button"
            className="button"
            onClick={() => deleteItem(id)}
          >
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default TodoItem
