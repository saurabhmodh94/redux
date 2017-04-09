import React from 'react';
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

const { Component } = React;
const store = createStore(todoApp);

let todoID = 0;
class TodoApp extends Component {
  render() {
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
        <ul>
          {this.props.todos.map(todo => 
            <li>{todo.text}</li>
          )}
        </ul>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos} />,
    document.getElementById('root')
  )
}
store.subscribe(render);
render();