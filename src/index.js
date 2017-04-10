import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { combineReducers } from 'redux';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id)
        return state;
      return Object.assign({}, state, { completed: !state.completed });
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp);

class FilterLink extends Component {
  render() {
    if (this.props.currentFilter === this.props.filter) {
      return (
        <span>{this.props.children}</span>
      )
    }
    return (
      <a href=""
        onClick={
          e => {
            e.preventDefault();
            store.dispatch({
              type: 'SET_VISIBILITY_FILTER',
              filter: this.props.filter
            })
          }
        }>{this.props.children}</a>
    );
  }
}

class Todo extends Component {
  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={
          {
            textDecoration: this.props.completed ? 'line-through' : 'none'
          }
        }>{this.props.text}</li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo =>
          <Todo text={todo.text} completed={todo.completed} onClick={()=>this.props.onTodoClick(todo.id)}
          />
        )}
      </ul>
    );
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'COMPLETED':
      return todos.filter(t => t.completed);
    case 'UNCOMPLETE':
      return todos.filter(t => !t.completed); //interesting
    default:
      return todos;
  }
}
let todoID = 0;
class TodoApp extends Component {
  render() {
    const visibleTodos = getVisibleTodos(this.props.todos, this.props.visibilityFilter);
    return (
      <div>
        <input ref="input"/>
        <button
          onClick={() => {
            store.dispatch(
              {
                type: 'ADD_TODO',
                text: this.refs.input.value,
                id: todoID++
              }
            )
          }}>Add Todo</button>
        <div>
          Filters:{' '}
          <FilterLink filter="SHOW_ALL" currentFilter={this.props.visibilityFilter}>ALL</FilterLink>{' '}
          <FilterLink filter="COMPLETED" currentFilter={this.props.visibilityFilter}>Completed</FilterLink>{' '}
          <FilterLink filter="UNCOMPLETE" currentFilter={this.props.visibilityFilter}>Uncomplete</FilterLink>
        </div>
        <TodoList todos={visibleTodos} onTodoClick={id => {
            store.dispatch({
              type: 'TOGGLE_TODO',
              id: id
            })
          }}/>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState() } />,
    document.getElementById('root')
  )
}
store.subscribe(render);
render();