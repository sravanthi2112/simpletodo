import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening'},
  {id: 2, title: 'Rent the movie for tomorrow movie night'},
  {id: 3, title: 'Confirm the slot for the yoga session tomorrow morning'},
  {id: 4, title: 'Drop the parcel at Bloomingdale'},
  {id: 5, title: 'Order fruits on Big Basket'},
  {id: 6, title: 'Fix the production issue'},
  {id: 7, title: 'Confirm my slot for Saturday Night'},
  {id: 8, title: 'Get essentials for Sunday car wash'},
]

class SimpleTodos extends Component {
  state = {
    todoDetailsList: initialTodosList,
    newTodo: '',
  }

  deleteItem = id => {
    const {todoDetailsList} = this.state
    const filteredTodoData = todoDetailsList.filter(each => each.id !== id)
    this.setState({todoDetailsList: filteredTodoData})
  }

  addItem = event => {
    event.preventDefault() // Prevents the form from refreshing the page
    const {newTodo, todoDetailsList} = this.state
    if (newTodo.trim() === '') {
      return // Prevents adding empty todos
    }

    const numberMatch = newTodo.match(/\d+$/)
    const number = numberMatch ? parseInt(numberMatch[0], 10) : 1
    const baseTitle = newTodo.replace(/\d+$/, '').trim()

    const newTodos = Array.from({length: number}, (_, index) => ({
      id: todoDetailsList.length + index + 1,
      title: `${baseTitle}${number > 1 ? ` ${index + 1}` : ''}`,
    }))

    this.setState({
      todoDetailsList: [...todoDetailsList, ...newTodos],
      newTodo: '',
    })
  }

  handleInputChange = event => {
    this.setState({newTodo: event.target.value})
  }

  updateTodo = (id, newTitle) => {
    const {todoDetailsList} = this.state
    const updatedTodos = todoDetailsList.map(todo =>
      todo.id === id ? {...todo, title: newTitle} : todo,
    )
    this.setState({todoDetailsList: updatedTodos})
  }

  render() {
    const {todoDetailsList, newTodo} = this.state
    return (
      <div className="container">
        <div className="small-container">
          <h1 className="heading">Simple Todos</h1>
          <form className="form-container" onSubmit={this.addItem}>
            <input
              type="text"
              value={newTodo}
              onChange={this.handleInputChange}
              placeholder="Enter todo"
              className="input"
            />
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <ul className="list-container">
            {todoDetailsList.map(eachList => (
              <TodoItem
                todoList={eachList}
                key={eachList.id}
                deleteItem={this.deleteItem}
                updateTodo={this.updateTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
